# Runbook — Exportador (Windows, ERP Elotech → MinIO)

Roda nos **servidores Windows** onde está o Postgres do ERP (Elotech eloweb, schema `siscop`). Dumpa as tabelas RAW em Parquet e sobe pro MinIO da VPS via HTTPS.

> Binário: `exporter-windows-amd64.exe` (sem dependências, não precisa instalar nada). Pacote: `exporter-win.zip` (exe + inspect + manifests + run.bat).

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

## 4. Exportação completa (Elotech)

```powershell
.\exporter-windows-amd64.exe --municipio 4117107 --ano 2026 --schema siscop `
  --manifest elotech-eloweb.yaml `
  --var ENTIDADES="1, 2, 3" --var EXERCICIOS="2024, 2025, 2026"
```
- `--municipio` = IBGE (só path no MinIO). `--schema siscop` = schema de origem.
- `--var ENTIDADES` = todas as entidades do município. `--var EXERCICIOS` = anos.
- `--ano` é irrelevante p/ Elotech (o filtro de ano é `EXERCICIOS`).

## 5. Verificar

- Saída do exportador: contagem de linhas por tabela.
- Conferir no MinIO (pela equipe da VPS): objetos em `mirante-parquet/4117107/...`.
- Inspecionar um Parquet local (se baixado): `inspect-windows-amd64.exe arquivo.parquet`.

## 6. Logs e tempo de execução

Cada execução cria (se não existir) a pasta **`log/`** ao lado do exe e grava **`log/exporter_<AAAAMMDD_HHMMSS>.log`** com:

- município, ano, schema, bucket
- **início**, **fim** e **duração** da exportação
- **status** (`OK` / `FALHA`; em falha, a tabela que quebrou)
- lista de **arquivos exportados** (origem → objeto, linhas, bytes) + totais

A duração também aparece no fim da saída (`concluído em 1m23s (45 arquivos).`). Use os logs p/ monitorar volume gerado e detectar falha/lentidão ao longo do tempo.

## Troubleshooting

| Sintoma | Causa provável |
|---|---|
| `connection refused` / timeout no DB | `DATABASE_URL` errado ou Postgres não local |
| `403 AccessDenied` no upload | `S3_ACCESS_KEY/SECRET` errados |
| `no such host` minio | firewall do cliente bloqueia saída HTTPS |
| `--var KEY não resolvido` | faltou um `--var` exigido pelo manifest |
| `relation siscop.X does not exist` | versão do ERP sem a tabela — remover do manifest |

> RAW fiel: o exportador **não** transforma (tipos/NULLs preservados). Canonicalização SIM-AM é no ClickHouse (E7).
