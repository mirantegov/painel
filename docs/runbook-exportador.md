# Runbook — Exportador (Windows, ERP Elotech → MinIO)

Roda nos **servidores Windows** onde está o Postgres do ERP (Elotech eloweb, schema `siscop`). Dumpa as tabelas RAW em Parquet e sobe pro MinIO da VPS via HTTPS.

> Binário: `exporter-windows-amd64.exe` (sem dependências, não precisa instalar nada). Pacote: `exporter-win.zip` (exe + inspect + os 3 manifests `siscop`/`aise`/`apice` + smoke + run.bat + este runbook). Gerado por `make package`.

## Pré-requisitos

- Postgres do ERP acessível **da própria máquina** (normalmente `localhost:5432`).
- Saída HTTPS para `https://minio.mirantegov.cloud` liberada no firewall do cliente.
- Credenciais MinIO (S3) — ver arquivo de acessos (fora do Git).

## 1. Configurar (PowerShell ou run.bat)

Variáveis de ambiente:

| Var | Valor |
|---|---|
| `DATABASE_URL` | `postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO` |
| `S3_ENDPOINT` | `https://minio.mirantegov.cloud` |
| `S3_ACCESS_KEY` | (MinIO access key) |
| `S3_SECRET_KEY` | (MinIO secret key) |
| `S3_BUCKET` | `mirante-parquet` |

PowerShell:
```powershell
$env:DATABASE_URL="postgresql://siscop:SENHA@localhost:5432/eloweb"
$env:S3_ENDPOINT="https://minio.mirantegov.cloud"
$env:S3_ACCESS_KEY="..."; $env:S3_SECRET_KEY="..."; $env:S3_BUCKET="mirante-parquet"
```

## 2. Descobrir as entidades do município

A Elotech tem várias entidades por município (prefeitura, câmara, RPPS…). Liste com (DBeaver/psql):
```sql
select e.entidade, e.nome, e.tipoentidade
  from siscop.entidade e
  left join siscop.cidade c            on upper(e.cidade)=upper(c.descricao)
  left join siscop.unidadefederacao u  on c.unidadefederacao=u.unidadefederacao
 where u.codigoibge||c.ibge = '4117107';   -- IBGE do município alvo
```
Anote a lista de `entidade` (ex.: `1, 2, 3`) e os exercícios (anos) a exportar.

## 3. Smoke test (valida conexão + upload, volume mínimo)

Usa `export-smoke.yaml` (só `siscop.banco` global + `siscop.entidade` filtrada):
```powershell
.\exporter-windows-amd64.exe --municipio 4117107 --ano 2026 --schema siscop `
  --manifest export-smoke.yaml --var ENTIDADES="1, 2, 3"
```
Esperado: linhas `ok ... → ... part-0.parquet` e `concluído.`

## 4. Exportação completa (Elotech) — 3 schemas

Rode os 3 manifests (o `--schema` não é preciso: cada manifest traz o schema no `source`):

```powershell
# 1) Contábil (siscop)
.\exporter-windows-amd64.exe --municipio 4117107 --ano 2026 `
  --manifest elotech-eloweb.yaml `
  --var ENTIDADES="1, 2, 3" --var EXERCICIOS="2024, 2025, 2026"

# 2) Tributos + RH (aise) — dump full (sem --var: não filtra entidade nem ano)
.\exporter-windows-amd64.exe --municipio 4117107 --ano 2026 `
  --manifest elotech-aise.yaml

# 3) Licitações + Contratos (apice) — EXERCICIOS a partir de 2000
.\exporter-windows-amd64.exe --municipio 4117107 --ano 2026 `
  --manifest elotech-apice.yaml `
  --var ENTIDADES="1, 2, 3" --var EXERCICIOS="2000, 2001, ... , 2025, 2026"
```
- `--municipio` = IBGE (só path no MinIO). O schema vem do `source` de cada manifest.
- `--var ENTIDADES` = todas as entidades do município. `--var EXERCICIOS` = anos.
- **APICE: EXERCICIOS começa em 2000** (não 2004) — contratos antigos em andamento referenciam licitações antigas. (`run.bat` já traz a lista pronta em `EXERCICIOS_LIC`.)
- Blobs `bytea` (editais, brasões, anexos, atas) **não são exportados** (`exclude_columns` no manifest) — só os metadados.
- `--ano` é irrelevante p/ Elotech (o filtro de ano é `EXERCICIOS`).

## 5. Verificar

- Saída do exportador: contagem de linhas por tabela.
- Conferir no MinIO (pela equipe da VPS): objetos em `mirante-parquet/4117107/...`.
- Inspecionar um Parquet local (se baixado): `inspect-windows-amd64.exe arquivo.parquet`.

## 6. Logs e tempo de execução

Cada execução cria (se não existir) a pasta **`log/`** ao lado do exe e grava **`log/export_<ibge>_<AAAAMMDD_HHMMSS>.log`** (ex.: `log/export_4117107_20260610_041500.log`) com:

- município, ano, schema, bucket
- **início**, **fim** e **duração** da exportação
- **status** (`OK` / `FALHA`; em falha, a tabela que quebrou)
- lista de **arquivos exportados** (origem → objeto, linhas, bytes) + totais

A duração também aparece no fim da saída (`concluído em 1m23s (45 arquivos).`). Use os logs p/ monitorar volume gerado e detectar falha/lentidão ao longo do tempo.

### Contagens publicadas (reconciliação)

Ao fim de cada execução o exportador publica, **no próprio MinIO**, um JSON com a contagem de linhas por tabela em **`<ibge>/_export/counts-<AAAAMMDD_HHMMSS>.json`** (e grava uma cópia local em `log/export_<ibge>_<datahora>.json`). Cada run gera um arquivo datado — os três schemas (siscop/aise/apice) **não** se sobrescrevem. O importador na VPS (`infra/clickhouse/importer`) lê esses JSONs e **reconcilia** a contagem da origem com a materializada no ClickHouse raw, sinalizando divergências de ingestão. Nada a fazer no Windows além de rodar normalmente.

## Troubleshooting

| Sintoma | Causa provável |
|---|---|
| `connection refused` / timeout no DB | `DATABASE_URL` errado ou Postgres não local |
| `403 AccessDenied` no upload | `S3_ACCESS_KEY/SECRET` errados |
| `no such host` minio | firewall do cliente bloqueia saída HTTPS |
| `--var KEY não resolvido` | faltou um `--var` exigido pelo manifest |
| `relation siscop.X does not exist` | versão do ERP sem a tabela — remover do manifest |

> RAW fiel: o exportador **não** transforma (tipos/NULLs preservados). Canonicalização SIM-AM é no ClickHouse (E7).
