# HANDOFF — Situação do projeto (Deploy VPS + Pipeline de dados) — atualizado 2026-06-10

Status: **homologação no ar com HTTPS válido em produção** + **pipeline de dados em curso**. `https://painel.mirantegov.cloud` responde, login demo OK end-to-end. Exportador Elotech→MinIO funcionando no Windows; ClickHouse multi-tenant (`raw_<ibge>`/`sim_<ibge>`) provisionado e RAW importado p/ Nova Londrina. Coletando APICE/AISE.

> Arquivo de controle da situação do projeto. Acessos: `docs/ACESSOS.local.md` (gitignored).

## Infra (E1 — OpenTofu / AWS EC2)

- Módulo: [`infra/tofu/`](../infra/tofu/). Provisiona EC2 + EIP + SG + key pair + registro A na Cloudflare.
- Instância: `i-0b1ead4d8a108ae47` (t3.xlarge, Ubuntu 24.04, gp3 160GB), região **us-east-1**.
- IP fixo: **`52.55.147.97`** = `painel.mirantegov.cloud` (Cloudflare A, proxied=false).
- Acesso: `ssh -i ~/.ssh/marin_aws deploy@52.55.147.97`.
- Bootstrap (cloud-init): Docker + Compose, swap 4G, usuário `deploy`, dirs `/opt/mirante`, clone do repo.
- **Firewall (SG):** 80/443 público; SSH(22) + portas de auditoria (5432/8123/9100/9000/9001/54323) só pelos CIDRs de `allowed_ingress_cidrs`.

> ⚠️ **IP dinâmico:** o allowlist hoje tem 2 IPs do dev. Quando o IP muda, SSH/bancos bloqueiam. Decisão pendente de fix durável (SSM, ou separar SSH de auditoria com 22 key-only aberto).

## Stack (E2 — Docker Compose + Traefik)

- Compose: [`docker-compose.prod.yml`](../docker-compose.prod.yml). Serviços: traefik, app, postgres, minio(+init), clickhouse.
- Subir: `docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build` (em `/opt/mirante/painel`).
- **Traefik via file provider** ([`infra/traefik/dynamic/app.yml`](../infra/traefik/dynamic/app.yml)) — sem `docker.sock`.
  - Motivo: Docker 29 (daemon min API 1.40) recusa o cliente docker do Traefik (negocia em 1.24). File provider contorna e é mais seguro.
- HTTPS: Let's Encrypt **produção** (HTTP-01), cert válido (CN=YR2, ~90 dias). Redirect 80→443. Cutover de staging→prod feito limpando `acme.json` no volume `traefik-acme`.
- Middlewares: HSTS/headers de segurança; rate-limit em `/api/auth/login` (average 5 / burst 10).
- Cookie `mp_session`: `Secure; HttpOnly; SameSite=lax` (8h) — `TRUST_PROXY=1` + X-Forwarded-Proto do Traefik.
- **Dashboard Traefik adiado** (`api.dashboard=false`). Reativar via file provider + `usersFile` (htpasswd) quando necessário.

## Banco (E3 — migrations + seed)

- Migrations: [`scripts/db-migrate-prod.sh`](../scripts/db-migrate-prod.sh) — idempotente (`public.schema_migrations`, transação por arquivo). 7 migrations aplicadas.
- Seed: rodado via container node one-off (`npm ci` + `npx tsx scripts/import-ibge.ts` + `scripts/seed-demo.ts`) na rede `mirante-painel_mirante`, com `--env-file .env.production -e NODE_ENV=development` (devDeps p/ tsx).
- Resultado: 5571 municípios em `dim_municipio`; município demo `4117107` (Nova Londrina/PR), usuário Prefeito, 21 módulos, fatos 2026.
- Readiness: `GET /api/health?db=1` → `{"status":"ok","db":"ok"}`.

## Pipeline de dados (E6 exportador + E7 ClickHouse) — atualizado 2026-06-10

**E6 — Exportador Go → MinIO (FUNCIONANDO em produção, no servidor Windows do cliente)**
- Binário Windows (`exporter/dist/exporter-windows-amd64.exe`, build via `make windows`; pacote `exporter-win.zip`). Runbook: [`docs/runbook-exportador.md`](runbook-exportador.md).
- MinIO exposto via Traefik: **`https://minio.mirantegov.cloud`** (router em `infra/traefik/dynamic/minio.yml`, DNS Cloudflare). Console segue por túnel SSH.
- Layout MinIO: **`<ibge>/<schema>/<tabela>.parquet`** (ex.: `4117107/siscop/empenho.parquet`). **Sem `_global/`** — tudo sob o município (evita colisão entre municípios).
- Parquet **preserva a ordem das colunas da origem** (fix `orderedGroup` no parquet-go; teste em `writer_order_test.go`).
- Elotech eloweb = schema `siscop`. Já exportado p/ Nova Londrina (59 tabelas siscop).

**E7 — ClickHouse multi-tenant por IBGE**
- Databases por município: **`raw_<ibge>`** (landing, espelha o MinIO/Eloweb) e **`sim_<ibge>`** (canônico SIM-AM). Postgres serving permanece `mun_<ibge>`.
- Provisionar: `bash scripts/provision-cliente.sh <ibge>` (cria `raw_<ibge>` vazio + `sim_<ibge>` com schema SIM-AM 339 tab + domínio). Tool: `infra/clickhouse/tools/provision_municipio.py`.
- Importar RAW do MinIO: `bash infra/clickhouse/tools/import_raw.sh <ibge>` — cria `raw_<ibge>.<schema>_<tabela>` (ex.: `siscop_empenho`) por inferência do Parquet, idêntico à origem. Difere as tabelas pesadas p/ o fim; preflight com erro claro.
- **Nova Londrina (4117107) provisionada e importada:** `raw_4117107` (59 tab `siscop_*`, com dados) + `sim_4117107` (339).
- CLI no mac: `clickhouse client` (config `~/.clickhouse-client/config.xml` → `sim_4117107`). DataGrip via HTTP 8123.

**Em andamento — coleta APICE (licitações/contratos)**
- 19 SQLs analisados → **63 tabelas + 3 views** do schema `apice` levantadas (lista no histórico da sessão). **Ainda NÃO adicionadas ao exportador.** Decisão pendente: exportar as 3 views direto vs base.
- **Falta:** SQLs de **tributos e RH (schema AISE)**. Depois consolidar manifests por schema.
- Backlog registrado: após RH+tributos, gap analysis Marts × dados coletados (ver memória).

**Próximo do pipeline:** ETL `raw_<ibge>.siscop_*` → `sim_<ibge>.*` (mapeamento Elotech→SIM-AM, ver `docs/epico5-elotech-queries.md` + template `infra/clickhouse/schema/etl/README-pipeline.sql`). Depois sync `sim_<ibge>` → Postgres `mun_<ibge>` (E8).

## Segredos

- `/opt/mirante/painel/.env.production` (chmod 600, gitignored). Gerados fortes no deploy.
- Lista de acessos completa em **`docs/ACESSOS.local.md`** (gitignored, chmod 600 — **não** versionar). Também em `~/mirante-painel-acessos.md`.
- `.env.production.example` documenta o conjunto de variáveis (na raiz; note que `.env*` é gitignored).

## Pendências (próximos passos)

- **E3.4** criar usuário Postgres `auditor` read-only (hoje a auditoria usaria `mirante`).
- **E1.3** reservar/criar subdomínios `traefik.`/`studio.`/`minio.`/`clickhouse.` quando expostos.
- **E2** deprecar `setup/vps/` e `setup-vps.sh` (legado Nginx/Certbot); documentar rollback.
- **E4** hardening (provision-tenant, validação JWT no boot, troca de senha, testes de API).
- **E6/E7 em curso:** exportador→MinIO OK; `raw_<ibge>`/`sim_<ibge>` provisionados e RAW importado (Nova Londrina). **Falta:** coleta APICE (63 tab + 3 views levantadas, não no exportador) + AISE (tributos/RH); ETL `raw_<ibge>`→`sim_<ibge>`; sync→Postgres (E8).
- **Fix IP dinâmico** do allowlist SSH.
- **Backups** Postgres (E10) — ainda não configurados.

## Comandos úteis

```bash
ssh -i ~/.ssh/marin_aws deploy@52.55.147.97
cd /opt/mirante/painel
docker compose --env-file .env.production -f docker-compose.prod.yml ps
docker compose --env-file .env.production -f docker-compose.prod.yml logs -f app
bash scripts/db-migrate-prod.sh           # reaplicar migrations (idempotente)
curl -s https://painel.mirantegov.cloud/api/health?db=1
```
