# ClickHouse — design do Épico 5 (SSoT + ETL + sync → Postgres)

> Design capturado para execução no Épico 5. Espelha o multi-tenant do Postgres:
> **1 database `mun_<ibge>` por município** (igual ao schema Postgres `mun_<ibge>`).
> Engines `MergeTree`/`ReplacingMergeTree`. Em CH evita-se `Nullable` na chave de
> ordenação → `mes` usa `0` (= agregado anual) e `data` usa sentinela.

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

```sql
INSERT INTO mun_4117107.fato_despesa
SELECT * EXCEPT (ingested_at), now() AS ingested_at
FROM s3('http://minio:9000/mirante-parquet/4117107/despesa/ano=2026/*.parquet',
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
