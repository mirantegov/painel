# Épico 4 — Exportador (raw → Parquet → MinIO)

> Camada de **ingestão** do pipeline. Código em [`exporter/`](../exporter). Complementa [`ARCHITECTURE.md`](../ARCHITECTURE.md) e [`docs/clickhouse-epico5-design.md`](clickhouse-epico5-design.md).

## Princípio: MinIO = RAW

```
[Postgres do cliente / ERP]
        │  exportador Go (este épico) — RAW, sem transformação
        ▼
   Parquet  ──►  MinIO (bucket mirante-parquet)  ──[ngrok]──►  consumidores externos
        │                                                       (ex.: ClickHouse remoto)
        └─────► (Épico 5) ClickHouse lê via s3(): normaliza p/ SIM-AM, trata, dedup
                          └─► (ETL) sync p/ Postgres = shape final idêntico à API
```

- **Exportador = raw nativo.** Espelha as tabelas de origem fielmente (tipos e NULLs preservados). **Não** mapeia para SIM-AM nem agrega.
- **MinIO = bronze.** Cada ERP na sua forma original.
- **Tratamento + canonicalização SIM-AM = ClickHouse (Épico 5).** É lá que os vários ERPs (Elotech, Betha, IPM, Equiplano, Sysmmar, …) convergem para o canônico **SIM-AM** (leiaute TCE-PR).

## Dirigido por manifest

`exporter/export.yaml` lista as tabelas a dumpar. Um manifest por ERP. Adicionar tabela/coluna = editar o YAML (sem recompilar). Ver detalhes de schema/escopos/colunas no [README do exportador](../exporter/README.md).

## Layout no MinIO

- global: `_global/<tabela>/part-0.parquet`
- tenant: `<ibge>/<tabela>/part-0.parquet`
- tenant + ano: `<ibge>/<tabela>/ano=<ano>/part-0.parquet`

Idempotente (path determinístico → overwrite).

## Mapeamento de tipos

Fiel à origem; `numeric→string` (decimal exato lossless), `uuid/date/timestamptz/jsonb→string`, demais nativos; tudo `optional` (NULL preservado). O ClickHouse re-tipa.

## Rodar (local)

```bash
# 1) Postgres demo + MinIO
npm run db:start && npm run db:seed-demo                       # (na raiz do repo)
docker compose -f infra/docker-compose.minio.yml up -d        # MinIO :9000/:9001 + bucket

# 2) Exportar
cd exporter && go run . --municipio 4117107 --ano 2026

# 3) Conferir
mc alias set local http://127.0.0.1:9000 minioadmin minioadmin
mc ls -r local/mirante-parquet
```

Saída esperada (demo): `_global/dim_municipio` (5571), `4117107/dim_entidade` (2), `4117107/fato_despesa/ano=2026` (8), `4117107/fato_receita/ano=2026` (7) — contagens idênticas ao Poststgres.

## Expor o MinIO via ngrok (testes de importação)

Para um consumidor externo (ERP remoto, ou um ClickHouse fora desta máquina) acessar o MinIO local:

```bash
ngrok config add-authtoken <SEU_TOKEN>           # uma vez (conta grátis em ngrok.com)
ngrok start --all --config infra/ngrok.yml        # abre 2 túneis: 9000 (S3) e 9001 (console)
```

O ngrok imprime as URLs públicas (uma p/ a API S3, outra p/ o console). Notas:
- O **exportador local** usa `http://127.0.0.1:9000` — não precisa de ngrok. O túnel é só p/ acesso **externo**.
- Cliente S3 externo: usar a **URL https do túnel da API** como endpoint, **path-style**, mesmas chaves (`minioadmin`/`minioadmin` no demo).
- Para o **console** (9001) funcionar bem de fora, setar `MINIO_BROWSER_REDIRECT_URL=<url-do-console>` no MinIO; para **presigned URLs** da API, `MINIO_SERVER_URL=<url-da-api>` (vars já comentadas em `infra/docker-compose.minio.yml`).

## Limitações do MVP

- Fonte = Postgres demo (como "ERP"). Manifests de ERPs reais entram incrementais.
- **SIM-AM não é deste épico** — é a canonicalização no ClickHouse (Épico 5).
- 1 município/ano por execução; sem cron; full overwrite (sem incremental).
