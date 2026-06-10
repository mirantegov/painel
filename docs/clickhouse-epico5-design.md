# ClickHouse — design do Épico 5 (SSoT + ETL + sync → Postgres)

> Design capturado para execução no Épico 5. Espelha o multi-tenant do Postgres:
> **databases por município**, nomeados por IBGE — `sim_<ibge>` (canônico) e
> `raw_<ibge>` (landing) — espelhando o schema Postgres `mun_<ibge>`.
> Provisionar um novo município: `bash scripts/provision-cliente.sh <ibge>`
> (cria os databases; aplica o schema SIM-AM em `sim_<ibge>`; `raw_<ibge>` fica vazio).
> **`raw_<ibge>` ESPELHA a origem do MinIO** (Eloweb): 1 tabela por Parquet,
> nomeada `<schema>_<tabela>` (ex.: `siscop_empenho`, `aise_entidade` — prefixo
> evita colisão), schema inferido do Parquet. Ingestão: `import_raw.sh <ibge>`.
> A canonicalização (Elotech→SIM-AM) é o ETL `raw_<ibge>` → `sim_<ibge>`.
> Engines `MergeTree`/`ReplacingMergeTree`. Em CH evita-se `Nullable` na chave de
> ordenação → `mes` usa `0` (= agregado anual) e `data` usa sentinela.

## Canonicalização: SIM-AM (decisão)

O **formato canônico** do pipeline é o **SIM-AM** (Sistema de Informações Municipais —
Acompanhamento Mensal, **TCE-PR**): submissão mensal, leiaute XML/XSD com registros de
empenho, liquidação, pagamento, receita, notas fiscais+itens, cheques, despesa
extra-orçamentária, saldos, + Plano de Contas SIM-AM.
Leiaute: <https://www1.tce.pr.gov.br/conteudo/sim-am-download-de-programas-e-documentacao/32/area/249>.

**Onde a normalização acontece:** o produto exporta de vários ERPs (Elotech, Betha, IPM,
Equiplano, Sysmmar, …). O **exportador (Épico 4) é raw** — só espelha a origem pro MinIO,
**sem** mapear para SIM-AM. A **normalização ERP → SIM-AM é feita aqui, no passo
MinIO → ClickHouse**: cada ERP tem sua transformação raw→SIM-AM; daí pra frente
(marts, sync → Postgres) tudo é SIM-AM, ERP-agnóstico. O sync final ClickHouse → Postgres
entrega o shape idêntico ao que a API serve.

**Separação por IBGE (não por entidade):** MinIO (`<ibge>/...`) e ClickHouse (database
`mun_<ibge>`) separam por **município**. Um município tem **várias entidades** (prefeitura,
câmara, RPPS, autarquias, fundos) — a `entidade` (código do ERP) é **coluna/dimensão** dentro
do município, não um nível de partição física. O exportador dumpa todas as entidades do
município (`entidade IN (...)`) num só conjunto por IBGE.

## Provisionamento `mun_<ibge>` (gerado por script: loop nos 19 slugs + municípios)

```sql
CREATE DATABASE IF NOT EXISTS mun_4117107;

CREATE TABLE IF NOT EXISTS mun_4117107.dim_entidade (
  id UUID, nome String,
  tipo Enum8('Prefeitura'=1,'Câmara'=2,'Autarquia'=3,'RPPS'=4,'Fundo'=5),
  criado_em DateTime DEFAULT now()
) ENGINE = ReplacingMergeTree(criado_em) ORDER BY (id);

CREATE TABLE IF NOT EXISTS mun_4117107.fato_despesa (
  entidade_id UUID, ano UInt16, mes UInt8 DEFAULT 0,
  data Date DEFAULT toDate('1970-01-01'),
  lancamento String DEFAULT '', programatica String DEFAULT '',
  orgao String DEFAULT '', unidade String DEFAULT '', secretaria String DEFAULT '',
  funcao String DEFAULT '', subfuncao String DEFAULT '', programa String DEFAULT '',
  acao String DEFAULT '', fonte_recurso String DEFAULT '',
  valor_atualizada Decimal(18,2) DEFAULT 0, valor_empenhada Decimal(18,2) DEFAULT 0,
  valor_liquidada Decimal(18,2) DEFAULT 0, valor_pago Decimal(18,2) DEFAULT 0,
  valor_a_empenhar Decimal(18,2) DEFAULT 0, valor_a_pagar Decimal(18,2) DEFAULT 0,
  ingested_at DateTime DEFAULT now()
) ENGINE = ReplacingMergeTree(ingested_at) PARTITION BY ano
  ORDER BY (ano, entidade_id, orgao, unidade, secretaria, programatica, mes, data, lancamento);

CREATE TABLE IF NOT EXISTS mun_4117107.fato_receita (
  entidade_id UUID, ano UInt16, mes UInt8 DEFAULT 0,
  data Date DEFAULT toDate('1970-01-01'),
  lancamento String DEFAULT '', receita String DEFAULT '', codigo String DEFAULT '',
  categoria String DEFAULT '',
  valor_prevista Decimal(18,2) DEFAULT 0, valor_arrecadada Decimal(18,2) DEFAULT 0,
  valor_a_arrecadar Decimal(18,2) DEFAULT 0, ingested_at DateTime DEFAULT now()
) ENGINE = ReplacingMergeTree(ingested_at) PARTITION BY ano
  ORDER BY (ano, entidade_id, categoria, codigo, mes, data, lancamento);

-- mod_<slug> (template; 19 tabelas) — payload jsonb-equivalente
CREATE TABLE IF NOT EXISTS mun_4117107.mod_saneamento (
  entidade_id Nullable(UUID), ano UInt16, mes UInt8 DEFAULT 0,
  chave String DEFAULT '', dados String, ingested_at DateTime DEFAULT now()
) ENGINE = ReplacingMergeTree(ingested_at) PARTITION BY ano
  ORDER BY (ano, chave, mes) SETTINGS allow_nullable_key = 1;
```

## Ingestão raw (exportador Go → Parquet → MinIO → CH)

> **Convenção canônica de paths MinIO (Épico 6.0):** `s3://mirante-parquet/<ibge>/<schema>/<tabela>.parquet` (ou `<ibge>/<schema>/<tabela>/ano=<ano>/<tabela>.parquet` quando particionado por ano). **Tudo fica sob o município (`<ibge>/`) — não há `_global/`**; tabelas de referência também ficam por município (cópia por IBGE). O **schema físico** entra no path para evitar colisão entre schemas homônimos (ex.: `aise.entidade` vs `siscop.entidade`). Mantido sincronizado com `exporter/README.md` e `infra/clickhouse/schema/etl/README-pipeline.sql`.

```sql
INSERT INTO mun_4117107.fato_despesa
SELECT * EXCEPT (ingested_at), now() AS ingested_at
FROM s3('http://mirante-minio:9000/mirante-parquet/4117107/fato_despesa/ano=2026/*.parquet',
        'minioadmin','minioadmin','Parquet');
-- FINAL na leitura (ou OPTIMIZE ... FINAL agendado) p/ aplicar o dedup.
```

## Scrapers (TCE/PR + SICONFI → Contas Públicas)

- Tabelas raw por fonte: `mun_<ibge>.raw_tce_agenda`, `raw_tce_certidao`,
  `raw_tce_contas`, `raw_siconfi_cauc`, `raw_siconfi_msc` (MergeTree, `coletado_em DateTime`).
- Transform (SQL/MV) → mart `mod_prestacao_contas` com `chave ∈ {agenda,certidao,tce,cauc,msc}` e `dados` JSON.

## Sync ClickHouse → Postgres (marts curados)

Function `postgresql()` do ClickHouse escreve direto no schema tenant do Postgres
(nomes de schema CH e PG idênticos → 1:1). Job idempotente: `TRUNCATE`/`DELETE WHERE ano=`
no Postgres antes do INSERT (ou staging + swap).

```sql
INSERT INTO FUNCTION
  postgresql('postgres:5432','postgres','fato_despesa','postgres','postgres','mun_4117107')
SELECT entidade_id, ano, mes, data, lancamento, programatica, orgao, unidade,
       secretaria, funcao, subfuncao, programa, acao, fonte_recurso,
       valor_atualizada, valor_empenhada, valor_liquidada, valor_pago,
       valor_a_empenhar, valor_a_pagar
FROM mun_4117107.fato_despesa FINAL WHERE ano = 2026;
```

## Fluxo

```
Go → Parquet → MinIO ─┐
                      ├─► CH mun_<ibge> (raw → ReplacingMergeTree → marts)
scrapers Python ──────┘                         │ postgresql() / job idempotente
                                                ▼
                                   Postgres mun_<ibge> (serving) → app
```
