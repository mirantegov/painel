# Exportador (raw → Parquet → MinIO)

Módulo Go que **dumpa fielmente** tabelas do Postgres de origem (o "ERP") em **Parquet** e sobe pro **MinIO**. É a camada de ingestão do pipeline (Épico 4).

> **Raw, sem transformação.** O exportador espelha a origem (tipos e NULLs preservados) — **não** mapeia para SIM-AM nem agrega. A canonicalização para o leiaute **SIM-AM** e todo o tratamento acontecem no **ClickHouse (Épico 5)**.

## O que exporta — manifest

Dirigido por **`export.yaml`** (editável). Cada ERP pode ter o seu manifest. Cada entrada:

```yaml
bucket: mirante-parquet
tables:
  - source: public.dim_municipio   # [schema.]tabela
    scope: global                  # global=public · tenant=mun_<ibge>
  - source: fato_despesa
    scope: tenant
    partition_by_ano: true         # filtra WHERE ano=<ano> e particiona ano=<ano>/
    # columns: [entidade_id, ano, valor_pago]   # subconjunto (omitido = todas)
    # filters: { entidade: 42, exercicio: 2025 } # WHERE col=$ AND … (recorta 1 cliente)
```

`filters` gera `WHERE coluna = $ AND …` **parametrizado** (valores nunca interpolados; colunas validadas). Valor **escalar** → `= $`; valor **lista** → `IN ($,$,…)`. Usado p/ recortar dados quando o ERP separa por coluna (ex.: Elotech: `entidade IN (...)` p/ todas as entidades do município), não por schema.

**Placeholders `--var`:** o manifest pode ter tokens `__KEY__` resolvidos em runtime por `--var KEY=VALUE` (repetível) — mantém o manifest reusável por cliente/ano. Ex.: `filters: { entidade: __ENTIDADE__ }` + `--var ENTIDADE=1 --var EXERCICIO=2026`. Falta um `--var` → erro claro.

`columns` ausente = **todas** as colunas (raw fiel). Para incluir tabelas auxiliares/dimensões (contexto p/ o ETL do ClickHouse), basta adicioná-las aqui — **sem recompilar**.

**Schema de origem (`--schema`):** `scope: tenant` lê do schema passado em `--schema` (ERP real, ex.: um schema por cliente no Elotech). Sem `--schema`, usa `mun_<ibge>` (nosso demo). `scope: global` lê do schema **explícito** no `source` (ex.: `public.x`), senão `public`. O `--municipio` (id IBGE) é usado só no **path do MinIO** — independe do nome físico do schema. Ex.: `--municipio 4106902 --schema contabil_pmcuritiba`. Integração Elotech: ver [`docs/epico4-elotech.md`](../docs/epico4-elotech.md).

## Layout no MinIO

| Caso | Path |
|---|---|
| sem ano | `<ibge>/<schema>/<tabela>.parquet` |
| com ano (`partition_by_ano`) | `<ibge>/<schema>/<tabela>/ano=<ano>/<tabela>.parquet` |

**Tudo fica sob o município (`<ibge>/`)** — não há mais `_global/`. Mesmo tabelas de referência (`scope: global`) ficam sob `<ibge>/`, cada município com sua própria cópia (sem risco de sobrescrita entre municípios). O `scope` agora só define o schema-default (`global` → `public`).

O **schema físico** entra no path (ex.: `4117107/siscop/entidade.parquet`) — evita colisão entre schemas homônimos (ex.: `aise.entidade` vs `siscop.entidade`) e o arquivo nomeado pela tabela facilita o ETL.

Idempotente: path determinístico (1 arquivo por schema/tabela/ano) → re-run sobrescreve.

## Mapeamento de tipos (fiel à origem)

`bool→boolean` · `int2/int4→int32` · `int8→int64` · `float4→float` · `float8→double` · **`numeric→string` (decimal exato, lossless)** · `uuid/date/timestamptz/json/jsonb/text→string`. Todas as colunas são `optional` (NULLs preservados). O ClickHouse re-tipa no Épico 5.

## Uso

```bash
# pré-requisitos: Postgres demo no ar (npm run db:start + db:seed-demo) e MinIO no ar
docker compose -f ../infra/docker-compose.minio.yml up -d   # MinIO + bucket

cd exporter
go run . --municipio 4117107 --ano 2026               # usa export.yaml
go run . --municipio 4117107 --ano 2026 --manifest outro.yaml
```

Env (com defaults p/ o stack local):

| Var | Default |
|---|---|
| `DATABASE_URL` | `postgresql://postgres:postgres@127.0.0.1:54322/postgres` |
| `S3_ENDPOINT` | `http://127.0.0.1:9000` |
| `S3_ACCESS_KEY` / `S3_SECRET_KEY` | `minioadmin` / `minioadmin` |
| `S3_BUCKET` | (override opcional do `bucket` do manifest) |

## Inspecionar um Parquet

`cmd/inspect` lê um `.parquet` e imprime contagem/colunas/valores:

```bash
mc cp local/mirante-parquet/4117107/siscop/empenho.parquet /tmp/x.parquet
go run ./cmd/inspect /tmp/x.parquet
```

## Build para o cliente (Windows)

Sem cgo → cross-compile limpo (de macOS/Linux):

```bash
make windows                 # → dist/exporter-windows-amd64.exe
# ou: CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -trimpath -ldflags "-s -w" -o exporter.exe .
make dist                    # windows + linux + mac
```

### Rodar no cliente (Windows → MinIO via ngrok)

No PC do cliente, com 3 arquivos na mesma pasta: `exporter-windows-amd64.exe`, `export.yaml` e um `.env`/variáveis. O cliente roda o exportador contra o **Postgres do ERP dele** e sobe pro **nosso MinIO** (URL pública do ngrok).

PowerShell:

```powershell
$env:DATABASE_URL = "postgresql://USER:SENHA@HOST_DO_ERP:5432/BANCO"
$env:S3_ENDPOINT  = "https://<sua-url>.ngrok-free.dev"   # túnel S3 do nosso MinIO
$env:S3_ACCESS_KEY = "minioadmin"
$env:S3_SECRET_KEY = "minioadmin"
$env:S3_BUCKET     = "mirante-parquet"
.\exporter-windows-amd64.exe --municipio 4117107 --ano 2026
```

> **Manifest por ERP:** o `export.yaml` default lista as tabelas do **schema demo** (`mun_<ibge>`/`fato_*`). Para o ERP real (Elotech/Betha/IPM/Equiplano/Sysmmar), edite o `export.yaml` com as **tabelas nativas daquele ERP** (issue #83). Para um primeiro teste de conectividade, aponte para qualquer tabela existente no banco do cliente.
>
> **Endpoint:** use a URL **https** do túnel S3 (o exportador resolve path-style automaticamente). Não exponha a senha do banco do ERP em logs/prints.

## Expor o MinIO via ngrok (testes de importação)

Veja `infra/ngrok.yml` e `docs/epico4-exportador.md`. Resumo:

```bash
ngrok config add-authtoken <SEU_TOKEN>
ngrok start --all --config ../infra/ngrok.yml   # túneis p/ 9000 (S3) e 9001 (console)
```

O exportador local fala com `127.0.0.1:9000`; o ngrok é p/ consumidores **externos** (ex.: ClickHouse remoto lendo o Parquet).
