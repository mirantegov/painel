# Importador raw — MinIO → ClickHouse `raw_<ibge>`

Ferramenta Go que ingere os Parquet exportados pra o MinIO (`<ibge>/<schema>/<tabela>.parquet`) no ClickHouse, criando **1 tabela por arquivo** em `raw_<ibge>.<schema>_<tabela>` (ex.: `raw_4117107.siscop_empenho`), com o schema **inferido** do Parquet — estrutura idêntica à origem (Eloweb). O prefixo `<schema>_` evita colisão entre schemas com tabelas homônimas (`aise.entidade` vs `siscop.entidade`).

Sucessor em Go do antigo `tools/import_raw.sh`. Ganhos:

- **Manifest-driven**: o conjunto de tabelas esperadas vem de `manifests/elotech-raw.yaml` (gerado por inferência dos manifests do exportador). Detecta tabela **faltando** (no manifest, ausente no MinIO) e **sobrando** (no MinIO, fora do manifest).
- **Contagem como verificação**: após criar cada tabela, faz `count()` no ClickHouse.
- **Reconciliação origem × destino**: lê as contagens publicadas pelo exportador em `<ibge>/_export/counts-*.json` no MinIO e compara linha a linha (`ok` / `divergente` / `sem_contagem_origem`).
- **Tipar o que a inferência não alcança**: o exportador grava `numeric`/`date`/`timestamp` como **String** no Parquet (texto lossless), então a inferência os mantém String. O bloco `types:` por tabela (derivado do **DDL real da origem**) re-tipa essas colunas via `SELECT * REPLACE(<cast> AS col)` — mantendo a inferência nas demais. Casts `*OrNull` (valor sujo → NULL, não derruba a tabela): `accurateCastOrNull` p/ Decimal/Int (preserva a precisão exata do DDL e aceita String ou numérico), `toDate32OrNull` p/ datas, `parseDateTime64BestEffortOrNull` p/ timestamps (o RFC3339 com `Z` quebra o cast estrito).
- **Log estruturado**: `log/import_<ibge>_<datahora>.log` + `.json` (sidecar p/ automação).
- **Robustez**: preflight de ClickHouse e MinIO (falha cedo e claro), retentativa em erro transitório, tabelas pesadas (`defer: true`) por último.

## Uso

```bash
make build            # binário ./importer (ou `make linux` p/ a VPS)

export CLICKHOUSE_URL=http://<host>:8123/
export CLICKHOUSE_USER=default CLICKHOUSE_PASSWORD=<senha>
export S3_ACCESS_KEY=<minio> S3_SECRET_KEY=<minio>
export MINIO_ENDPOINT=http://<host>:9000     # endpoint p/ o IMPORTADOR listar/ler
export S3_INTERNAL=http://minio:9000         # endpoint que o CLICKHOUSE usa p/ ler (rede docker)

./importer --ibge 4117107
```

Flags: `--manifest` (default `manifests/elotech-raw.yaml`), `--no-recon` (pula a reconciliação contra a origem). Sai com código ≠ 0 em qualquer falha de tabela ou divergência de reconciliação.

## Manifest

```bash
make manifests-gen DUMP=../../../tmp/eloweb.dump   # (re)gera com tipos do DDL
make manifests-check                               # confere o CONJUNTO; sai 1 se drift (CI)
```

`elotech-raw.yaml` é **gerado** (`cmd/genmanifest`): o **conjunto** de tabelas vem dos manifests do exportador; os **tipos** (`types:`) vêm do DDL real da origem (`pg_dump`, gitignored — passe via `DUMP=`). `manifests-check` valida só o conjunto (não precisa do dump → roda no CI). Cada entrada:

```yaml
tables:
  - raw_table: siscop_empenho
    object: siscop/empenho.parquet
    types:                       # derivado do DDL; só numeric/date/timestamp
      data: "DateTime64(6)"
      idcontrato: "Int64"
      aliquotaiss: "Decimal(15,2)"
```

## Reconciliação

O **exportador** publica `<ibge>/_export/counts-<datahora>.json` no MinIO ao fim de cada execução. O importador faz merge de todos esses JSONs (runs por schema não se sobrescrevem; vence o `generated_at` mais recente por tabela) e compara com a contagem materializada no ClickHouse. Divergência sinaliza problema de ingestão. Veja `internal/importer/counts.go` (formato espelhado em `exporter/internal/exporter/counts.go`).
