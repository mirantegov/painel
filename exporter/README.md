# Exportador (raw → Parquet → MinIO)

Módulo Go que **dumpa fielmente** tabelas do Postgres de origem (o "ERP") em **Parquet** e sobe pro **MinIO**. É a camada de ingestão do pipeline (E6).

> **Raw, sem transformação.** O exportador espelha a origem (tipos e NULLs preservados) — **não** mapeia para SIM-AM nem agrega. A canonicalização para o leiaute **SIM-AM** e todo o tratamento acontecem no **ClickHouse (E7)**.

> **Estado atual (Elotech eloweb):** 3 manifests prontos em [`manifests/`](manifests/) — `elotech-eloweb.yaml` (**siscop**, contábil), `elotech-aise.yaml` (**aise**, tributos+RH), `elotech-apice.yaml` (**apice**, licitações/contratos). Filtros derivados dos DDLs reais; blobs `bytea` excluídos; (re)geração reprodutível via [`tools/gen_manifests.py`](tools/gen_manifests.py) ([doc](../docs/gerador-manifests.md)). Operação no cliente: [`docs/runbook-exportador.md`](../docs/runbook-exportador.md). Situação do projeto: [`docs/HANDOFF-vps-deploy-2026-06-09.md`](../docs/HANDOFF-vps-deploy-2026-06-09.md).

## O que exporta — manifest

Dirigido por um **manifest YAML** (`--manifest`; os do Elotech estão em [`manifests/`](manifests/) — um por schema). Cada ERP/schema tem o seu. Cada entrada:

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

**`exclude_columns`:** lista de colunas a **não** exportar (ex.: blobs `bytea` — editais, brasões, anexos: só pesam o dump). Quando `columns` está vazio, o exportador resolve as colunas reais via `information_schema` (preservando a ordem da origem) e remove as excluídas. Seguro mesmo se a coluna não existir.

**Gerador de manifests:** os blocos `scope`/`exclude_columns`/`filters` dos manifests Elotech são derivados dos DDLs por [`tools/gen_manifests.py`](tools/gen_manifests.py) (política por schema: `siscop=keep`, `aise=none`, `apice=derive`). `make manifests-check DUMP=../tmp/eloweb.dump` confere (exit 1 se drift); `make manifests-gen` aplica. Ver [`docs/gerador-manifests.md`](../docs/gerador-manifests.md).

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
cd exporter
# Elotech (ERP real) — schema vem do prefixo no source de cada manifest:
go run . --municipio 4117107 --ano 2026 --manifest manifests/elotech-eloweb.yaml --var ENTIDADES="1, 2, 3" --var EXERCICIOS="2024, 2025, 2026"
go run . --municipio 4117107 --ano 2026 --manifest manifests/elotech-aise.yaml     # aise = dump full, sem --var
go run . --municipio 4117107 --ano 2026 --manifest manifests/elotech-apice.yaml --var ENTIDADES="1, 2, 3" --var EXERCICIOS="2000, ... , 2026"  # apice ≥ 2000
```

Cada execução grava **`log/export_<ibge>_<AAAAMMDD_HHMMSS>.log`** (início/fim, duração, status, arquivos).

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
make dist                    # windows + linux + mac
make package                 # → dist/exporter-win.zip (exe + inspect + 3 manifests + smoke + run.bat + RUNBOOK)
```

`make package` é o jeito recomendado de gerar o entregável do cliente — reprodutível, com os 3 manifests atualizados. `dist/` é gitignored.

### Rodar no cliente (Windows → MinIO via Traefik)

Descompacte `exporter-win.zip` no servidor Windows do ERP, preencha o `run.bat` (DB local + chaves MinIO + IBGE/entidades) e rode. O MinIO de produção é exposto por HTTPS em **`https://minio.mirantegov.cloud`** (Traefik). Passo a passo completo: [`docs/runbook-exportador.md`](../docs/runbook-exportador.md).

PowerShell (resumo):

```powershell
$env:DATABASE_URL  = "postgresql://USER:SENHA@localhost:5432/eloweb"
$env:S3_ENDPOINT   = "https://minio.mirantegov.cloud"
$env:S3_ACCESS_KEY = "..."; $env:S3_SECRET_KEY = "..."; $env:S3_BUCKET = "mirante-parquet"
.\exporter-windows-amd64.exe --municipio 4117107 --ano 2026 --manifest elotech-aise.yaml
```

> Não exponha a senha do banco do ERP em logs/prints. As credenciais MinIO estão em `docs/ACESSOS.local.md` (gitignored).
