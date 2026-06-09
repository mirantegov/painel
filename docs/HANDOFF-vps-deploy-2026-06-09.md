# HANDOFF — Deploy VPS (E1 + E2 + E3) — 2026-06-09

Status: **homologação no ar com HTTPS válido em produção.** `https://painel.mirantegov.cloud` responde, login do usuário demo funciona end-to-end.

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

## Segredos

- `/opt/mirante/painel/.env.production` (chmod 600, gitignored). Gerados fortes no deploy.
- Lista de acessos (endpoints/portas/usuários) entregue ao dev fora do Git. **Não** versionar.
- `.env.production.example` documenta o conjunto de variáveis (na raiz; note que `.env*` é gitignored).

## Pendências (próximos passos)

- **E3.4** criar usuário Postgres `auditor` read-only (hoje a auditoria usaria `mirante`).
- **E1.3** reservar/criar subdomínios `traefik.`/`studio.`/`minio.`/`clickhouse.` quando expostos.
- **E2** deprecar `setup/vps/` e `setup-vps.sh` (legado Nginx/Certbot); documentar rollback.
- **E4** hardening (provision-tenant, validação JWT no boot, troca de senha, testes de API).
- **E7/E8** ClickHouse: schema SIM-AM + ETL + sync (container CH no ar, `simam` vazio).
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
