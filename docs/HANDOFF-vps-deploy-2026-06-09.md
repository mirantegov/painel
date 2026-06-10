# HANDOFF — Situação do projeto (Deploy VPS + Pipeline de dados) — atualizado 2026-06-10

Status: **homologação no ar com HTTPS válido em produção** + **pipeline de dados em curso**. `https://painel.mirantegov.cloud` responde, login demo OK end-to-end. Exportador Elotech→MinIO funcionando no Windows; ClickHouse multi-tenant (`raw_<ibge>`/`sim_<ibge>`) provisionado e RAW siscop importado p/ Nova Londrina. **Coleta concluída** (siscop+aise+apice): 3 manifests prontos com filtros DDL-derivados + gerador versionado. **Próximo:** rodar aise/apice no Windows → importar RAW → ETL `raw→sim`.

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
- Binário Windows (`exporter/dist/exporter-windows-amd64.exe`). **Pacote reprodutível via `make package`** → `dist/exporter-win.zip` (exe + inspect + os **3 manifests** + smoke + run.bat + RUNBOOK). `dist/` é gitignored (artefato fica local). Runbook: [`docs/runbook-exportador.md`](runbook-exportador.md).
- Log de cada run: **`log/export_<ibge>_<AAAAMMDD_HHMMSS>.log`** (ao lado do exe).
- MinIO exposto via Traefik: **`https://minio.mirantegov.cloud`** (router em `infra/traefik/dynamic/minio.yml`, DNS Cloudflare). Console segue por túnel SSH.
- Layout MinIO: **`<ibge>/<schema>/<tabela>.parquet`** (ex.: `4117107/siscop/empenho.parquet`). **Sem `_global/`** — tudo sob o município (evita colisão entre municípios).
- Parquet **preserva a ordem das colunas da origem** (fix `orderedGroup` no parquet-go; teste em `writer_order_test.go`).
- **3 manifests por schema** (decisão (b) — só tabelas-base; lógica das views vai pro ETL):
  - `manifests/elotech-eloweb.yaml` — **siscop** (59 tab, contábil). Já exportado p/ Nova Londrina.
  - `manifests/elotech-aise.yaml` — **aise** (122 tab, RH + Tributos no mesmo schema). **Dump FULL** (sem filtro de `entidade`/`exercicio` — por decisão; recorte fica no ETL; dispensa `--var`).
  - `manifests/elotech-apice.yaml` — **apice** (53 tab, licitações/contratos).
- **Filtros (siscop + apice) DERIVADOS dos DDLs reais** (`tmp/eloweb.dump`, gitignored): `entidade` onde a coluna existe; `+ano` (anocompetencia→exercicio→exerciciopagamento→exerciciobloqueto) onde existe; full nas demais. Filtro com coluna inexistente aborta o run, então todos foram conferidos contra a coluna real. **`aise` não filtra** (full).
  - Views detectadas no dump foram REMOVIDAS dos manifests: `aise.endereco` (1) e as 10 `apice.*arquivo` + 3 views derivadas.
  - **APICE: piso de ano = 2000** (não 2004 como a contabilidade) — contratos antigos em andamento referenciam licitações antigas. Passar `--var EXERCICIOS` começando em 2000.
- **Blobs `bytea` excluídos** via campo `exclude_columns:` no manifest (resolve as colunas reais por `information_schema` em runtime, preservando a ordem; só pesavam o dump). 12 tabelas afetadas (siscop 2, aise 4, apice 6 — ex.: `apice.arquivo.arquivo`, `aise.entidade.brasao`, `apice.cllicitacao.docedital`). Reconferido contra o dump (0 divergências).
- **Gerador versionado** [`exporter/tools/gen_manifests.py`](../exporter/tools/gen_manifests.py) (doc: [`docs/gerador-manifests.md`](gerador-manifests.md)): (re)gera `scope`/`exclude_columns`/`filters` dos DDLs. Política por schema (`POLICY` no topo): `siscop=keep`, `aise=none`, `apice=derive`. `make manifests-check DUMP=../tmp/eloweb.dump` (CI, exit 1 se drift) · `make manifests-gen` (aplica). Idempotente no estado atual.
- Coleta documentada: [`docs/coleta-rh-tabelas.md`](coleta-rh-tabelas.md), [`docs/coleta-tributos-tabelas.md`](coleta-tributos-tabelas.md), [`docs/coleta-apice-tabelas.md`](coleta-apice-tabelas.md).

**E7 — ClickHouse multi-tenant por IBGE**
- Databases por município: **`raw_<ibge>`** (landing, espelha o MinIO/Eloweb) e **`sim_<ibge>`** (canônico SIM-AM). Postgres serving permanece `mun_<ibge>`.
- Provisionar: `bash scripts/provision-cliente.sh <ibge>` (cria `raw_<ibge>` vazio + `sim_<ibge>` com schema SIM-AM 339 tab + domínio). Tool: `infra/clickhouse/tools/provision_municipio.py`.
- Importar RAW do MinIO: importador Go `infra/clickhouse/importer` (`make build && ./importer --ibge <ibge>`; sucessor do `import_raw.sh`) — cria `raw_<ibge>.<schema>_<tabela>` (ex.: `siscop_empenho`) por inferência do Parquet, idêntico à origem. **Manifest-driven** (detecta tabela faltando/sobrando), **conta linhas** e **reconcilia** contra `<ibge>/_export/counts-*.json` publicado pelo exportador. Difere as pesadas; preflight com erro claro; log `import_<ibge>_<datahora>.log`+`.json`.
- **Nova Londrina (4117107) provisionada e importada:** `raw_4117107` (59 tab `siscop_*`, com dados) + `sim_4117107` (339).
- CLI no mac: `clickhouse client` (config `~/.clickhouse-client/config.xml` → `sim_4117107`). DataGrip via HTTP 8123.

**Coleta concluída (siscop + aise + apice)** — decisão (b) fechada (só tabelas-base; views = lógica de ETL). Manifests prontos e validados (parse + colunas reais). Backlog registrado: após coleta, gap analysis Marts × dados coletados (ver memória).

**Próximo do pipeline (RETOMAR AQUI):**

1. **Rodar `aise` e `apice` no Windows do cliente** (siscop já foi). Descobrir as entidades do município com o SQL do runbook §2; preencher `run.bat` (DB local + chaves MinIO + IBGE/ENTIDADES). Comandos:
   ```
   # aise — dump full, SEM --var
   exporter-windows-amd64.exe --municipio <ibge> --ano 2026 --manifest elotech-aise.yaml
   # apice — EXERCICIOS a partir de 2000 (run.bat já traz EXERCICIOS_LIC pronto)
   exporter-windows-amd64.exe --municipio <ibge> --ano 2026 --manifest elotech-apice.yaml --var ENTIDADES="1, 2, 3" --var EXERCICIOS="2000, ... , 2026"
   ```
   O 1º run valida os filtros na prática (se uma tabela abortar por coluna, ajustar o manifest e reconferir com `make manifests-check`).
2. **Importar p/ `raw_<ibge>`** (`aise_*`, `apice_*`): `cd infra/clickhouse/importer && make build`, `export CLICKHOUSE_URL/USER/PASSWORD + S3_ACCESS_KEY/SECRET + MINIO_ENDPOINT + S3_INTERNAL` (ver `docs/ACESSOS.local.md`) e `./importer --ibge <ibge>`. Confira o relatório de reconciliação no log (origem × raw).
3. **ETL `raw_<ibge>.{siscop,aise,apice}_*` → `sim_<ibge>.*`** (Elotech→SIM-AM; **reimplementar a lógica das views** da Elotech — referência em `docs/coleta-*.md` + `docs/epico5-elotech-queries.md`). Depois sync `sim_<ibge>` → Postgres `mun_<ibge>` (E8).
4. **Gap analysis** Marts (componentes visuais) × dados coletados (backlog na memória) — antes/junto do ETL.

## Segredos

- `/opt/mirante/painel/.env.production` (chmod 600, gitignored). Gerados fortes no deploy.
- Lista de acessos completa em **`docs/ACESSOS.local.md`** (gitignored, chmod 600 — **não** versionar). Também em `~/mirante-painel-acessos.md`.
- `.env.production.example` documenta o conjunto de variáveis (na raiz; note que `.env*` é gitignored).

## Pendências (próximos passos)

- **E3.4** criar usuário Postgres `auditor` read-only (hoje a auditoria usaria `mirante`).
- **E1.3** reservar/criar subdomínios `traefik.`/`studio.`/`minio.`/`clickhouse.` quando expostos.
- **E2** deprecar `setup/vps/` e `setup-vps.sh` (legado Nginx/Certbot); documentar rollback.
- **E4** hardening (provision-tenant, validação JWT no boot, troca de senha, testes de API).
- **E6/E7 em curso:** exportador→MinIO OK; `raw_<ibge>`/`sim_<ibge>` provisionados, RAW siscop importado (Nova Londrina). **Coleta concluída** — 3 manifests (siscop/aise/apice, filtros DDL-derivados; aise=full; bytea excluído) + gerador versionado (`gen_manifests.py`) + pacote `make package`. **Falta:** rodar `aise`+`apice` no Windows → importar p/ `raw_<ibge>`; ETL `raw_<ibge>`→`sim_<ibge>` (reimplementar lógica das views); sync→Postgres (E8); gap analysis Marts×dados.
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
