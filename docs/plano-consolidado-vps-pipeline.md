# Plano Consolidado VPS e Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Organizar a continuidade do Mirante Painel em uma VPS, com domínio/DNS, stack Docker completo, banco multi-tenant, pipeline MinIO/ClickHouse/Postgres, exportadores, scrapers e governança por épicos/tarefas.

**Architecture:** O produto passa a operar como um stack self-hosted: proxy HTTPS na borda, Next.js como app, Postgres/Supabase como serving, MinIO como landing raw, ClickHouse como SSoT analítica e jobs de ingestão/sync. O desenvolvimento continua no servidor com Git, Docker Compose, backups, observabilidade e releases versionados.

**Tech Stack:** Next.js 16, React 19, TypeScript, PostgreSQL/Supabase self-hosted, ClickHouse 25.3, MinIO, Docker Compose, Go exporter, Python scrapers, **Traefik para TLS** (decidido em `docs/adr-proxy-tls.md`), Linear (execução) + GitHub Milestones/Issues (release/changelog) para gestão. Imagens de produção devem usar base Debian/Bookworm quando houver tag oficial compatível; imagens customizadas devem partir de Debian slim para facilitar shell interno, auditoria e troubleshooting.

---

## Estado Atual Em 2026-06-09

- App Next.js com build standalone via `Dockerfile` (base `node:22-slim`).
- `docker-compose.yml` atual sobe apenas o serviço `app`, **sem** `DATABASE_URL`/`JWT_SECRET` nem Postgres — quebrado para produção; serve só como atalho local.
- Release `v2.0.0` já publicada em `main` (Épico 3 do plano legado fechado). `package.json` ainda em `0.0.1` — sincronizar.
- Auth custom entregue: login por cliente IBGE + CPF + senha, JWT HS256 em cookie `mp_session`.
- Postgres multi-tenant entregue em migrations Supabase: `public.*` global e schemas `mun_<id_ibge>` por município.
- Leitura de módulos entregue via snapshots `mod_*` e rota `GET /api/data/[modulo]`. 19 de 21 módulos já usam `useSnapshot`.
- **Long tail (#33) está em WIP local, não mergeado**: working tree tem `lib/demo-*.ts` novos e `snapshot-context.tsx` em legislativo/previdência/saneamento. Merge é gate antes do Épico 1.
- **`visao-geral` e `orcamento` continuam fora do padrão snapshot** (`visao-geral` com dados inline sem `lib/demo-visao-geral.ts`; `orcamento` usa `ORCAMENTO_BASE` + `computeOrcamento()` direto). Ambos no gate de código.
- `scripts/seed-demo.ts` provisiona Nova Londrina/PR (`4117107`), usuário demo, ACL total, fatos demo e snapshots.
- Catálogo de módulos centralizado em `lib/modules-config.ts`; dados de módulo em `lib/data/modules.ts`. `DEFAULT_ENABLED_MODULE_IDS` ainda lista 9 módulos — revisar pós long-tail.
- ClickHouse SIM-AM já tem infra em `infra/clickhouse/`: 224 tabelas canônicas, 224 raw e 115 domínios. ETL/sync ainda não implementados.
- MinIO já tem compose separado em `infra/docker-compose.minio.yml`. Convenção de paths divergente entre exportador, template ETL e design doc — Épico 6/7 deve unificar.
- Exportador Go existe em `exporter/`, com manifest padrão e manifest Elotech eloweb.
- Já existem scripts VPS legados em `setup-vps.sh` (porta 3000 exposta) e `setup/vps/` (Nginx + Certbot no host) — divergem do plano (path `/opt/app` vs `/opt/mirante/painel`, sem Postgres, sem `.env.production`). Decisão de reaproveitar ou substituir vem após ADR do proxy.
- Plano de Análises está historicamente concluído; só deve voltar se auditoria apontar regressão.

## Mapa De Numeração De Épicos (legado → consolidado)

Para não confundir agents que ainda leem `docs/plano-fase-backend-v2.md`:

| Plano backend v2 (histórico) | Plano consolidado VPS |
| --- | --- |
| Épicos 1–3 (App + Auth + Snapshots → `v2.0.0`) | Base já entregue |
| Épico 4 (Exportador Go + MinIO) | **Épico 6** |
| Épico 5 (ClickHouse SSoT + ETL) | **Épico 7** (+ sync = **Épico 8**) |
| Épico 6 (Scrapers TCE/PR + SICONFI) | **Épico 9** |
| Épico 7 (Supabase self-hosted produção) | **Épico 3** |
| — | Épicos 0, 1, 2, 4, 5, 10, 11 são novos (governança, VPS, compose, hardening, qualidade, ops, release) |

## Mapa Linear ↔ Plano

Projeto Linear: **[Mirante Painel — VPS Pipeline v2.x](https://linear.app/code42dev/project/mirante-painel-vps-pipeline-v2x-937f65e421e8)** (time `mirante`, key `MIR`).

| Épico | Linear | GitHub Milestone |
| --- | --- | --- |
| E0 · Governança | [MIR-2](https://linear.app/code42dev/issue/MIR-2) | [#9 E0 Governança](https://github.com/mirantegov/painel/milestone/9) |
| Gate de código | [MIR-3](https://linear.app/code42dev/issue/MIR-3) | [#10 Gate de código](https://github.com/mirantegov/painel/milestone/10) |
| E1 · VPS, DNS, segurança | [MIR-4](https://linear.app/code42dev/issue/MIR-4) | [#11 E1 VPS, DNS, segurança](https://github.com/mirantegov/painel/milestone/11) |
| E2 · Compose + Traefik | [MIR-5](https://linear.app/code42dev/issue/MIR-5) | [#12 E2 Compose+TLS (Traefik)](https://github.com/mirantegov/painel/milestone/12) |
| E3 · Postgres prod | [MIR-6](https://linear.app/code42dev/issue/MIR-6) | [#13 E3 Postgres produção](https://github.com/mirantegov/painel/milestone/13) |
| E4 · Hardening auth/ACL | [MIR-7](https://linear.app/code42dev/issue/MIR-7) | [#14 E4 Hardening auth/ACL](https://github.com/mirantegov/painel/milestone/14) |
| E5 · Qualidade módulos | [MIR-8](https://linear.app/code42dev/issue/MIR-8) | [#15 E5 Qualidade módulos](https://github.com/mirantegov/painel/milestone/15) |
| E6 · MinIO + exportador | [MIR-9](https://linear.app/code42dev/issue/MIR-9) | [#16 E6 MinIO+exportador](https://github.com/mirantegov/painel/milestone/16) |
| E7 · ClickHouse ETL | [MIR-10](https://linear.app/code42dev/issue/MIR-10) | [#17 E7 ClickHouse ETL](https://github.com/mirantegov/painel/milestone/17) |
| E8 · Sync CH→PG | [MIR-11](https://linear.app/code42dev/issue/MIR-11) | [#18 E8 Sync CH→PG](https://github.com/mirantegov/painel/milestone/18) |
| E9 · Scrapers | [MIR-12](https://linear.app/code42dev/issue/MIR-12) | [#19 E9 Scrapers TCE/SICONFI](https://github.com/mirantegov/painel/milestone/19) |
| E10 · Observabilidade/backup | [MIR-13](https://linear.app/code42dev/issue/MIR-13) | [#20 E10 Observabilidade/backup](https://github.com/mirantegov/painel/milestone/20) |
| E11 · Releases | [MIR-14](https://linear.app/code42dev/issue/MIR-14) | [#21 v2.1.0](https://github.com/mirantegov/painel/milestone/21) · [#22 v2.2.0](https://github.com/mirantegov/painel/milestone/22) · [#23 v2.3.0](https://github.com/mirantegov/painel/milestone/23) |

Fluxo de status Linear (regra `linear-workflow.mdc`): Backlog → To Do → In Progress → In Review → Done. Subtarefas com prefixo `E<n>.<t>` ficam como sub-issues quando começarem.

## Decisão De Operação

Continuar o desenvolvimento direto em uma VPS, com o mesmo ambiente servindo para homologação contínua. A VPS deve ser tratada como ambiente controlado, não como máquina manual:

- Todo serviço sobe por Docker Compose.
- Todo segredo fica em `.env.production` fora do Git.
- Todo deploy passa por branch, pull/rebase, build e healthcheck.
- Domínio aponta para a VPS via DNS.
- HTTPS é obrigatório antes de expor login real.
- Supabase Studio, Postgres e ClickHouse terão portas externas liberadas para auditoria via DataGrip/IDE, com firewall, senhas fortes e, sempre que possível, allowlist de IP ou VPN.
- Contêineres próprios do projeto devem usar base Debian slim; serviços oficiais devem usar tags Debian/Bookworm quando disponíveis, evitando distroless/alpine em serviços que possam exigir shell interno.
- Backups e restore testado entram antes de qualquer uso com dados reais.

## Arquitetura Alvo

```mermaid
flowchart TD
  DNS["DNS painel.mirantegov.cloud"] --> Proxy["Traefik HTTPS (ACME)"]
  Proxy --> App["Next.js app :3000"]
  App --> PG["Postgres/Supabase serving"]
  App --> Cookie["JWT httpOnly mp_session"]

  ERP["ERP cliente"] --> Exporter["Exportador Go raw"]
  Exporter --> MinIO["MinIO bucket mirante-parquet"]
  Scrapers["Scrapers TCE/PR + SICONFI"] --> MinIO
  MinIO --> CHRaw["ClickHouse simam_raw"]
  CHRaw --> CHSimam["ClickHouse simam"]
  CHSimam --> Marts["Marts por município/ano"]
  Marts --> PG
```

## Milestones / Épicos

### Épico 0 · Governança, Branches E Gestão (Linear + GitHub)

**Objetivo:** garantir que o trabalho prossiga com rastreabilidade e sem perder o estado atual. Linear é a fonte de execução; GitHub guarda milestones e releases para changelog público.

**Tarefas:**

- [ ] Criar épico no Linear para cada épico 1–11 deste plano, com prefixo `E<n>` no nome (ex.: `E1 · VPS, Domínio, DNS e Segurança Base`).
- [ ] Criar issue no Linear uma por tarefa, com prefixo `E<n>.<tarefa>` no título.
- [ ] Seguir o fluxo de status Linear: Backlog → To Do → In Progress → In Review → Done (regra `linear-workflow.mdc`).
- [ ] Espelhar no GitHub uma Milestone por épico, e abrir issues apenas quando a tarefa virar PR aberto (não duplicar Backlog).
- [ ] Manter tabela `E<n>.<t> ↔ LINEAR-id ↔ GH milestone` em `docs/plano-consolidado-vps-pipeline.md` ou anexo.
- [ ] Definir branch padrão de trabalho na VPS: `govtech42/<epico>-<slug>`.
- [ ] Manter `docs/CONTINUIDADE-SESSAO.md` e `docs/HANDOFF-2026-06-09.md` como referências históricas, sem substituir este plano.
- [ ] Cross-linkar `docs/plano-fase-backend-v2.md` para o mapa de numeração acima.
- [ ] Atualizar README/AGENTS/CLAUDE quando cada épico mudar comandos, infraestrutura ou fluxo operacional.
- [ ] Padronizar checklist de conclusão por tarefa: `npm run typecheck`, `npm run lint`, `npm run build`, teste funcional e registro planejado-vs-feito na issue Linear (e PR GitHub quando houver código).
- [ ] Criar CI gate em `.github/workflows/ci.yml`: roda `typecheck` + `lint` + `build` em todo PR, bloqueando merge se falhar (evita levar WIP quebrado para `main`/VPS, já que o quality-check hoje é manual).

**Critério de aceite:** épicos no Linear com issues E<n>.<t>, milestones GitHub espelhadas, mapa publicado neste documento.

---

### Gate De Código · Fechar Long Tail Antes Da VPS

**Objetivo:** evitar levar WIP local e divergências de snapshot para o ambiente de homologação na VPS.

**Tarefas:**

- [ ] Commit/PR do WIP de `#33` (long-tail snapshot): `defesa-civil`, `frotas`, `patrimonio`, `obras`, `educacao`, `saude`, `assistencia-social`, `previdencia`, `saneamento`, `legislativo` — todos seguindo o padrão `useSnapshot` + `lib/demo-<slug>.ts` + seed.
- [ ] Migrar `components/visao-geral.tsx` para `useSnapshot("visao-geral", VISAO_GERAL_SNAPSHOT)` com dados em `lib/demo-visao-geral.ts` e seed `mod_visao_geral`.
- [ ] Migrar `components/orcamento-municipal.tsx` para `useSnapshot("orcamento", ORCAMENTO_SNAPSHOT)` — `ORCAMENTO_BASE` vira o snapshot serializável; `computeOrcamento` continua como helper no componente.
- [ ] Sincronizar `package.json` `version` com a release (`2.0.x` mínimo).
- [ ] Rodar auditoria estrutural via skill `.agents/skills/source-command-audit-modules` e registrar baseline em `docs/auditoria-modulos.md` (ou anexo da issue Linear).
- [ ] Executar `.agents/skills/source-command-quality-check` (typecheck, lint, format).
- [ ] Decidir se `DEFAULT_ENABLED_MODULE_IDS` passa a incluir long-tail por padrão após snapshots OK.

**Critério de aceite:** `main` tem 21/21 módulos lendo snapshot, audit-modules sem regressão, working tree limpo.

---

### Épico 1 · VPS, Domínio, DNS E Segurança Base

**Objetivo:** preparar a VPS como ambiente de desenvolvimento/homologação permanente.

**Tarefas:**

- [ ] Hostname principal definido: **`painel.mirantegov.cloud`** (ADR em `docs/adr-proxy-tls.md`).
- [ ] Criar registros DNS `A` e, se aplicável, `AAAA` para `painel.mirantegov.cloud` apontando para a VPS.
- [ ] Reservar subdomínios `traefik.`, `studio.`, `minio.`, `clickhouse.` em `mirantegov.cloud` para uso futuro (Traefik faz o roteamento por host). **Atenção:** ACME HTTP-01 exige registro `A` real apontando para a VPS no momento de emitir o cert — criar o registro DNS junto com a publicação de cada subdomínio (ou usar DNS-01 wildcard `*.mirantegov.cloud` se preferir emitir tudo de uma vez).
- [ ] Criar usuário Linux não-root para deploy.
- [ ] Configurar SSH por chave e desabilitar login por senha.
- [ ] Configurar firewall liberando `22`, `80`, `443` e as portas externas de auditoria autorizadas.
- [ ] Definir portas externas padronizadas:
  - Supabase Studio: `54323` ou subdomínio protegido `studio.<dominio>`
  - Postgres: `5432` ou porta alternativa documentada
  - ClickHouse HTTP: `8123`
  - ClickHouse nativo: `9100` (mapeado a partir do `9000` interno do ClickHouse para **evitar colisão com a porta `9000` do MinIO** no mesmo host; não é arbitrário)
- [ ] Restringir portas de banco por allowlist de IP do time/dev ou VPN sempre que a VPS/provedor permitir.
- [ ] Documentar perfil de acesso DataGrip para Postgres e ClickHouse em `docs/runbook-vps.md`.
- [ ] Instalar Docker Engine e Docker Compose plugin.
- [ ] Criar diretórios persistentes:
  - `/opt/mirante/painel`
  - `/opt/mirante/data/postgres`
  - `/opt/mirante/data/minio`
  - `/opt/mirante/data/clickhouse`
  - `/opt/mirante/backups`
- [ ] Clonar o repositório em `/opt/mirante/painel`.
- [ ] Criar `.env.production` com `DATABASE_URL`, `JWT_SECRET`, `AUTH_COOKIE_NAME`, `S3_*`, senhas do Postgres, ClickHouse e MinIO.
- [ ] Restringir o arquivo: `chown deploy-user:deploy-user .env.production && chmod 600 .env.production` — segredo não pode ser world-readable na VPS.
- [ ] Documentar o runbook de acesso em `docs/runbook-vps.md`.

**Arquivos prováveis:**

- Criar `docs/runbook-vps.md`
- Criar ou modificar `.env.example`
- Criar `infra/vps/README.md`

**Comandos de validação:**

```bash
docker version
docker compose version
curl -I http://painel.mirantegov.cloud
```

**Critério de aceite:** VPS acessível por domínio, Docker funcionando, portas web abertas e portas de auditoria acessíveis somente conforme regra definida de firewall/allowlist.

---

### Épico 2 · Compose De Produção E Proxy HTTPS

**Objetivo:** substituir o compose mínimo por um stack self-hosted consistente.

#### E2.0 · ADR proxy TLS (DECIDIDO)

Decisão registrada em `docs/adr-proxy-tls.md` em 2026-06-09: **Traefik no Docker Compose**, domínio principal **`painel.mirantegov.cloud`**.

Impacto:

- `setup/vps/1-install.sh` e `setup/vps/2-build.sh` deixam de instalar Nginx + Certbot — apenas Docker/UFW/swap; Traefik sobe via compose.
- `setup-vps.sh` (porta 3000 exposta direto) fica deprecado.
- Subdomínios de auditoria (`studio.`, `minio.`, `clickhouse.`) entram por labels no Traefik conforme demanda, sem editar configs no host.

#### E2.1 · Tarefas (após ADR)

- [ ] Criar `docker-compose.prod.yml` com redes internas (`mirante`) e volumes nomeados.
- [ ] Incluir serviço `app` com build do `Dockerfile`, env production e healthcheck HTTP em `/api/health`.
- [ ] Ordenar boot com `depends_on: { postgres: { condition: service_healthy } }` para o `app` só subir após Postgres saudável.
- [ ] Auditar a base de cada imagem do stack e registrar no compose/runbook: `app` em `node:<versao>-slim` Debian, Postgres em tag Debian/Bookworm, serviços customizados em Debian slim.
- [ ] Para serviço oficial sem imagem Debian adequada, documentar a exceção e incluir container auxiliar Debian na mesma rede/volume para inspeção operacional.
- [ ] Subir serviço Traefik no `docker-compose.prod.yml` com volume `traefik-acme`, expor portas 80 e 443.
- [ ] Configurar resolver ACME/Let's Encrypt (HTTP-01) com `TRAEFIK_ACME_EMAIL`.
- [ ] Configurar redirect global `web` (80) → `websecure` (443) no entrypoint do Traefik.
- [ ] Criar middleware de segurança (HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) aplicado ao router do `app`.
- [ ] Criar middleware de rate-limit no Traefik para `/api/auth/login` (mitigar brute-force antes do app).
- [ ] Roteamento por labels no serviço `app`: `Host(\`painel.mirantegov.cloud\`)` → `http://app:3000`.
- [ ] Habilitar dashboard Traefik em `traefik.mirantegov.cloud` protegido por basic-auth (`TRAEFIK_DASHBOARD_AUTH`).
- [ ] Expor Postgres e ClickHouse para auditoria externa conforme decisão do projeto, com portas documentadas, senhas fortes e restrição por firewall/allowlist quando possível.
- [ ] Expor Supabase Studio para auditoria do dev, preferindo subdomínio HTTPS com autenticação/proteção adicional; se usar porta direta, documentar risco e regra de firewall.
- [ ] Manter MinIO privado por padrão; expor console/API apenas quando necessário para exportador ou auditoria, com credenciais fortes.
- [ ] Garantir que serviços com necessidade de shell interno usem imagens base Debian/Bookworm ou tenham exceção documentada com alternativa de shell interno.
- [ ] Adicionar profile opcional para expor consoles administrativos somente via túnel SSH ou rede privada.
- [ ] Reaproveitar/evoluir `setup/vps/2-build.sh` em vez de criar `scripts/deploy-vps.sh` do zero — incluir migrations, leitura de `.env.production`, healthcheck real. ADR decidiu Traefik no compose: deprecar `setup-vps.sh` (porta 3000 exposta) e marcar `setup/vps/` como apenas instalação base do SO (Docker/UFW/swap, **sem** Nginx/Certbot).
- [ ] Alinhar diretório padrão em **um único valor** (`/opt/mirante/painel` no plano vs `/opt/app` nos scripts atuais) — escolher e refatorar referências.
- [ ] Documentar rollback simples: voltar commit anterior, rebuild e restaurar backup se banco tiver mudado.

**Arquivos prováveis:**

- Criar `docker-compose.prod.yml`
- Criar `docs/adr-proxy-tls.md`
- Criar `infra/traefik/` (config estática: entrypoints web/websecure, resolver ACME, redirect 80→443, middlewares de segurança)
- Evoluir `setup/vps/2-build.sh` ou criar `scripts/deploy-vps.sh`
- Criar `.env.production.example`
- Atualizar `README.md`

**Comandos de validação:**

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml config
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
curl -I https://painel.mirantegov.cloud/login
curl -fsS https://painel.mirantegov.cloud/api/health
nc -vz painel.mirantegov.cloud 5432
curl -s http://painel.mirantegov.cloud:8123/ --data "SELECT 1"
```

**Critério de aceite:** `https://painel.mirantegov.cloud/login` responde com cookie `Secure`; `https://painel.mirantegov.cloud/api/health` retorna `{status:"ok"}`; Postgres e ClickHouse aceitam conexão externa autorizada para DataGrip; Supabase Studio abre pelo endpoint definido.

---

### Épico 3 · Postgres/Supabase Self-Hosted De Produção

**Objetivo:** levar o banco de serving para o stack da VPS, sem depender da Supabase CLI em produção.

**Tarefas:**

- [ ] Decidir o modo de produção: **Postgres puro com migrations SQL (`supabase/migrations/*.sql`) para Fase 1** (sem dependência da Supabase CLI em produção), Studio opcional como serviço separado. Stack Supabase self-hosted completo fica para fase futura.
- [ ] Gerar `.env.production.example` com todas as vars necessárias: `DATABASE_URL`, `JWT_SECRET` forte, `AUTH_COOKIE_NAME`, `S3_*`, senhas Postgres/ClickHouse/MinIO, `DEMO_PASSWORD`, `APP_URL`, `TRUST_PROXY=1` quando atrás de proxy externo.
- [ ] Criar serviço Postgres 15+ persistente no compose de produção.
- [ ] Publicar Postgres externamente para DataGrip com porta documentada e credencial exclusiva de auditoria/leitura quando aplicável.
- [ ] Criar usuário Postgres de auditoria com permissões controladas para inspeção de `public` e schemas `mun_*`.
- [ ] Se usar Supabase Studio, publicar o Studio no compose com rota/porta externa e proteção de acesso.
- [ ] Criar usuário/senha fortes e `DATABASE_URL` interna para o app.
- [ ] Criar job ou script para aplicar migrations `supabase/migrations/*.sql` no Postgres da VPS.
- [ ] Tornar `db-migrate-prod.sh` idempotente: tabela de controle `public.schema_migrations` (versão = nome do arquivo) para não reaplicar migrations já rodadas; aplicar em ordem lexical e em transação.
- [ ] Backup `pg_dump` automático **antes** de aplicar migrations em banco com dados (gate do próprio script).
- [ ] Executar migrations em banco limpo.
- [ ] Executar `scripts/import-ibge.ts`.
- [ ] Executar `scripts/seed-demo.ts` com `DEMO_PASSWORD` forte.
- [ ] Validar schemas `public` e `mun_4117107`.
- [ ] Criar rotina de backup com `pg_dump` diário e retenção.
- [ ] Criar procedimento de restore testado em banco temporário.

**Arquivos prováveis:**

- Criar `scripts/db-migrate-prod.sh`
- Criar `scripts/backup-postgres.sh`
- Criar `scripts/restore-postgres.sh`
- Atualizar `docs/banco-de-dados.md`
- Atualizar `supabase/migrations/20260608134208_multitenant_schemas.sql` se novos módulos entrarem no template

**Comandos de validação:**

```bash
psql "$DATABASE_URL" -c "select count(*) from public.dim_municipio"
psql "$DATABASE_URL" -c "select public.provision_municipio('4117107')"
psql "$DATABASE_URL" -c "select count(*) from public.usuarios"
psql "postgresql://AUDIT_USER:AUDIT_PASSWORD@painel.mirantegov.cloud:5432/postgres" -c "select current_database(), current_user"
```

**Critério de aceite:** app autentica via banco da VPS, retorna snapshots por `/api/data/<slug>?ano=2026` e DataGrip conecta no Postgres com usuário de auditoria.

---

### Épico 4 · Hardening Do App, Auth E ACL

**Objetivo:** transformar a base demo em aplicação operável para múltiplos municípios e usuários.

**Tarefas:**

- [ ] Criar tela ou script administrativo para criar município, entidades, usuário e ACL.
- [ ] Validar `JWT_SECRET` obrigatório em produção; falhar boot se usar segredo dev.
- [ ] Revisar `secure`, `sameSite`, domínio do cookie e tempo de sessão. Multi-tenant futuro é **path-based** (`painel.mirantegov.cloud/{entidade}`): manter cookie no host apex **sem** setar `domain` explícito (não usar `.mirantegov.cloud`, que vazaria sessão para subdomínios de auditoria `studio.`/`minio.`/`clickhouse.`).
- [ ] Criar endpoint ou utilitário para troca de senha.
- [ ] Expandir ACL para todos os módulos/submódulos complexos, não só os já conectados.
- [ ] Criar logs de login sem registrar senha ou token.
- [ ] Criar auditoria de `MODULES` versus `public.modulos` e `MODULE_TABLES`.
- [ ] Revisar `DEFAULT_ENABLED_MODULE_IDS` após snapshots long tail: decidir se módulos antes ocultos entram no menu por padrão.
- [ ] Adicionar testes de API para login, logout, sessão inválida e módulo inválido.

**Arquivos prováveis:**

- `app/api/auth/login/route.ts`
- `app/api/auth/logout/route.ts`
- `lib/auth/jwt.ts`
- `lib/auth/session.ts`
- `lib/data/acl.ts`
- `lib/modules-config.ts`
- `scripts/seed-demo.ts`
- Criar `scripts/provision-tenant.ts`

**Comandos de validação:**

```bash
npm run typecheck
npm run lint
npm run build
```

**Critério de aceite:** usuário de um município não consegue acessar dados de outro, nem ativar módulo fora da ACL.

---

### Épico 5 · Qualidade Dos Módulos E Snapshots

**Objetivo:** manter todos os módulos consistentes, serializáveis e prontos para dados reais.

**Tarefas:**

- [ ] Rodar auditoria estrutural dos módulos ativos via `.agents/skills/source-command-audit-modules`.
- [ ] Garantir que todo módulo em `MODULES` tenha entrada em `MODULE_TABLES`, fallback em `lib/demo-*.ts` e seed em `scripts/seed-demo.ts`.
- [ ] Corrigir migration `provision_municipio()` se algum `mod_*` novo existir no código e não no template.
- [ ] Criar teste/script de serialização dos `*_SNAPSHOT`.
- [ ] Criar teste/script que consulta todos os slugs em `/api/data/<slug>?ano=2026` com sessão válida.
- [ ] Revisar módulos complexos (`legislativo`, `previdencia`, `saneamento`) para garantir provider/context de snapshot em todas as sub-abas.
- [ ] Atualizar documentação dos módulos no README quando o menu padrão mudar.

**Arquivos prováveis:**

- `lib/demo-*.ts`
- `components/**/*.tsx`
- `components/*/snapshot-context.tsx`
- `lib/data/modules.ts`
- `scripts/seed-demo.ts`
- Criar `scripts/audit-snapshots.ts`
- Criar `scripts/check-api-modules.ts`

**Comandos de validação:**

```bash
npm run typecheck
npm run lint
npm run db:seed-demo
npm run build
```

**Critério de aceite:** todos os módulos ativos têm snapshot válido em Postgres e fallback bundlado equivalente.

---

### Épico 6 · MinIO E Exportador Go Em Produção

**Objetivo:** operacionalizar a ingestão raw ERP → Parquet → MinIO na VPS.

#### E6.0 · Contrato de paths MinIO (BLOQUEANTE)

Hoje há três convenções divergentes:
- `exporter/README.md`: `<ibge>/<tabela>/[ano=<ano>/]part-0.parquet` em bucket `mirante-parquet`.
- `infra/clickhouse/schema/etl/README-pipeline.sql`: `mirante/eloweb/<ibge>/<exercicio>/<Tabela>.parquet`.
- `docs/clickhouse-epico5-design.md`: `mirante-parquet/<ibge>/<tabela>/ano=<ano>/*.parquet`.

**Convenção canônica adotada:** seguir o exportador.

```
s3://mirante-parquet/<ibge>/<tabela>/[ano=<ano>/]part-0.parquet         # tenant
s3://mirante-parquet/_global/<tabela>/part-0.parquet                    # global
```

- [ ] Atualizar `infra/clickhouse/schema/etl/README-pipeline.sql` e `docs/clickhouse-epico5-design.md` para refletir esta convenção.
- [ ] Documentar a convenção em `docs/runbook-exportador.md`.

#### E6.1 · Tarefas

- [ ] Integrar `infra/docker-compose.minio.yml` ao compose de produção, na rede `mirante`.
- [ ] Configurar bucket `mirante-parquet`, credenciais fortes e política privada.
- [ ] Definir se o exportador roda no cliente, na VPS via VPN/túnel ou em job manual.
- [ ] Versionar manifests por ERP em `exporter/manifests/`.
- [ ] Validar manifest Elotech eloweb com placeholders `__ENTIDADE__` e `__EXERCICIO__`.
- [ ] Criar pacote de distribuição do exportador para Windows e Linux.
- [ ] Criar procedimento seguro para receber credenciais do ERP sem commitar segredos.
- [ ] Criar smoke test que exporta `dim_entidade`, `fato_despesa` e `fato_receita` demo para MinIO.
- [ ] Criar verificação de contagem de linhas antes/depois no Parquet.

**Arquivos prováveis:**

- `infra/docker-compose.minio.yml`
- `exporter/README.md`
- `exporter/manifests/elotech-eloweb.yaml`
- `exporter/internal/exporter/*.go`
- Criar `docs/runbook-exportador.md`

**Comandos de validação:**

```bash
docker compose -f infra/docker-compose.minio.yml up -d
cd exporter && go test ./...
cd exporter && go run . --municipio 4117107 --ano 2026
```

**Critério de aceite:** arquivos Parquet aparecem em `mirante-parquet/<ibge>/...` com contagem compatível com a origem.

---

### Épico 7 · ClickHouse SIM-AM, ETL E Marts

**Objetivo:** transformar o raw do MinIO em modelo canônico SIM-AM e marts consumíveis.

**Tarefas:**

- [ ] Integrar `infra/clickhouse/docker-compose.yml` ao stack de produção ou criar compose dedicado com rede compartilhada.
- [ ] Externalizar senhas ClickHouse em env, removendo credenciais demo de produção.
- [ ] Publicar ClickHouse para DataGrip: HTTP `8123` e/ou nativo `9100`, conforme driver escolhido.
- [ ] Criar usuário ClickHouse de auditoria com senha forte e permissões de leitura nos bancos `simam` e `simam_raw`.
- [ ] Validar que a imagem ClickHouse escolhida permite shell interno ou documentar imagem auxiliar Debian na mesma rede para troubleshooting.
- [ ] Montar volumes persistentes para `data` e `logs`.
- [ ] Aplicar schema `simam`, `simam_raw` e seeds de domínio no ClickHouse da VPS.
- [ ] Corrigir glitches conhecidos em `infra/clickhouse/tools/overrides.json`.
- [ ] Refinar chaves de ordenação das tabelas críticas: Empenho, Receita, Liquidação, Pagamento.
- [ ] Implementar ETL MinIO → `simam_raw` → `simam` para Contábil mínimo: despesa e receita.
- [ ] Implementar marts anuais para `fato_despesa`, `fato_receita`, `mod_despesa`, `mod_receita` e `mod_visao_geral`.
- [ ] Criar jobs idempotentes por município/ano.
- [ ] Criar métricas de ingestão: linhas lidas, linhas gravadas, falhas de cast e timestamp.

**Arquivos prováveis:**

- `infra/clickhouse/schema/etl/*.sql`
- `infra/clickhouse/tools/*.py`
- Criar `infra/clickhouse/jobs/`
- Criar `docs/runbook-clickhouse.md`

**Comandos de validação:**

```bash
cd infra/clickhouse && docker compose up -d
python3 tools/apply_batches.py schema/simam
python3 tools/apply_batches.py schema/raw
python3 tools/apply_batches.py schema/seeds
curl -s localhost:8123/ --data "SELECT count() FROM system.tables WHERE database='simam'"
curl -s http://painel.mirantegov.cloud:8123/ --data "SELECT currentUser()"
```

**Critério de aceite:** ClickHouse da VPS consegue ler Parquet do MinIO, materializar marts de despesa/receita para um município/ano e aceitar conexão externa autorizada via DataGrip.

---

### Épico 8 · Sync ClickHouse → Postgres Serving

**Objetivo:** entregar dados tratados do ClickHouse para o Postgres que o app já lê.

**Tarefas:**

- [ ] Definir contrato de sync por tabela: `fato_*` colunares e `mod_*` snapshots.
- [ ] Implementar sync idempotente por município/ano com `DELETE WHERE ano = $ano` ou staging + swap.
- [ ] Usar função `postgresql()` do ClickHouse ou job externo Node/Python, escolhendo uma estratégia única.
- [ ] Garantir que `mun_<ibge>` exista no Postgres antes do sync.
- [ ] Sincronizar `dim_entidade`.
- [ ] Sincronizar `fato_despesa` e `fato_receita`.
- [ ] Sincronizar snapshots mínimos: `mod_despesa`, `mod_receita`, `mod_financeiro`, `mod_visao_geral`.
- [ ] Registrar auditoria de sync: origem, destino, município, ano, linhas, duração e status.
- [ ] Criar endpoint ou comando de refresh manual controlado.

**Arquivos prováveis:**

- Criar `scripts/sync-clickhouse-postgres.ts` ou `infra/clickhouse/jobs/sync_*.sql`
- `lib/data/modules.ts`
- `docs/banco-de-dados.md`
- `docs/runbook-clickhouse.md`

**Comandos de validação:**

```bash
psql "$DATABASE_URL" -c "set search_path to mun_4117107, public; select count(*) from fato_despesa"
psql "$DATABASE_URL" -c "set search_path to mun_4117107, public; select ano, jsonb_typeof(dados) from mod_visao_geral"
```

**Critério de aceite:** app exibe dados derivados do pipeline, sem depender do seed demo para os módulos sincronizados.

---

### Épico 9 · Scrapers TCE/PR E SICONFI

**Objetivo:** alimentar Contas Públicas com fontes externas oficiais.

**Tarefas:**

- [ ] Criar projeto `scrapers/` com Python, dependências e Dockerfile.
- [ ] Implementar coleta TCE/PR: agenda de obrigações, certidão liberatória e contas.
- [ ] Implementar coleta SICONFI: CAUC e MSC.
- [ ] Persistir raw no MinIO com path por fonte, município, ano e data de coleta.
- [ ] Criar tabelas raw no ClickHouse para `raw_tce_agenda`, `raw_tce_certidao`, `raw_tce_contas`, `raw_siconfi_cauc`, `raw_siconfi_msc`.
- [ ] Transformar raw externo em `mod_prestacao_contas` com `chave` em `agenda`, `certidao`, `tce`, `cauc`, `msc`.
- [ ] Criar agendamento diário/semanal via cron container ou serviço equivalente.
- [ ] Criar tolerância a falhas e cache para fontes instáveis.

**Arquivos prováveis:**

- Criar `scrapers/`
- Criar `infra/scrapers/`
- `infra/clickhouse/schema/etl/*.sql`
- `lib/demo-prestacao-contas.ts`
- `scripts/seed-demo.ts`

**Comandos de validação:**

```bash
docker compose -f docker-compose.prod.yml run --rm scrapers python -m scrapers.tce --municipio 4117107 --ano 2026
```

**Critério de aceite:** Contas Públicas deixa de depender apenas do snapshot demo para ao menos uma fonte externa.

---

### Épico 10 · Observabilidade, Backup E Operação

**Objetivo:** tornar a VPS operável com segurança.

**Tarefas:**

- [ ] Configurar logs com rotação para app, proxy, Postgres, MinIO, ClickHouse e jobs.
- [ ] Criar healthchecks Docker para todos os serviços.
- [ ] Monitorar portas externas de auditoria: Supabase Studio, Postgres e ClickHouse.
- [ ] Registrar acessos administrativos a Postgres/ClickHouse quando possível.
- [ ] Criar endpoint `/api/health` no app (liveness simples + ping opcional ao Postgres) — antecipar como parte do Épico 11 parcial para que healthchecks Docker e proxy possam apontar para ele.
- [ ] Criar backups diários de Postgres.
- [ ] Criar backup/snapshot dos volumes MinIO e ClickHouse, ou política clara de reconstrução a partir do raw.
- [ ] Testar restore completo em ambiente paralelo, com **cadência definida** (ex.: mensal + após toda mudança de schema) e registro da data/resultado do último drill em `docs/runbook-operacao.md` — backup não testado não conta.
- [ ] Criar alerta simples para disco acima de 80%, container parado e falha de backup.
- [ ] Criar runbook de incidente: queda do app, banco indisponível, certificado expirado, disco cheio.

**Arquivos prováveis:**

- Criar `docs/runbook-operacao.md`
- Criar `scripts/backup-postgres.sh`
- Criar `scripts/check-health.sh`
- `docker-compose.prod.yml`

**Comandos de validação:**

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs --tail=100 app
```

**Critério de aceite:** existe backup restaurável e forma documentada de diagnosticar queda.

---

### Épico 11 · Release E Primeira Homologação Real

**Objetivo:** consolidar versões publicáveis do painel em domínio real, evoluindo a partir da `v2.0.0` já tageada.

**Marcos de release (substituem o `v2.0.0-rc.1` original do plano, pois `v2.0.0` já existe):**

| Marco | Tag | Escopo |
| --- | --- | --- |
| Homolog HTTPS + Postgres VPS | `v2.1.0-rc.1` → `v2.1.0` | Épicos 1–5 + smoke E11 parcial |
| Pipeline contábil mínimo | `v2.2.0-rc.1` → `v2.2.0` | Épicos 6–8 |
| Release operacional | `v2.3.0` | Épicos 9–10 + E11 final |

**Tarefas:**

- [ ] Criar release candidate `v2.1.0-rc.1` ao final dos épicos 1–5.
- [ ] Rodar pipeline completo: typecheck, lint, build, seed, API smoke (`/api/health` + `/api/data/<slug>?ano=YYYY`) e login no domínio.
- [ ] Criar `scripts/smoke-prod.sh` que automatiza os `curl` de homologação (HTTPS `/login`, `/api/health`, `/api/data/<slug>`) e retorna exit code != 0 em falha — usável no CI e pós-deploy.
- [ ] Criar usuário demo com senha forte e registrar credenciais fora do Git.
- [ ] Validar todos os módulos habilitados no menu.
- [ ] Validar responsividade desktop/notebook.
- [ ] Validar HTTPS, cookie Secure e logout.
- [ ] Criar changelog do que entrou na Fase 1.
- [ ] Marcar pendências pós-release: novos ERPs, scrapers completos, marts adicionais e multiusuário administrativo.

**Comandos de validação:**

```bash
npm run typecheck
npm run lint
npm run build
curl -I https://painel.mirantegov.cloud/login
curl -fsS https://painel.mirantegov.cloud/api/health
```

**Critério de aceite:** domínio HTTPS acessível, login funcionando, módulos carregando dados do Postgres da VPS e release documentada.

## Ordem Recomendada De Execução

1. Épico 0: governança Linear + GitHub.
2. **Gate de código**: long-tail + visão geral + orçamento.
3. Épico 1: VPS, DNS e segurança base.
4. **E2.0**: ADR proxy TLS.
5. Épico 2: compose produção e HTTPS (depende do E2.0).
6. Épico 3: Postgres produção, migrations, seed e backup.
7. Épico 4: hardening de auth/ACL (pode rodar em paralelo a 8).
8. Épico 5: qualidade dos módulos e snapshots.
9. Épico 11 parcial: primeira homologação do app em domínio (`v2.1.0`).
10. **E6.0**: contrato de paths MinIO.
11. Épico 6: MinIO e exportador.
12. Épico 7: ClickHouse/ETL.
13. Épico 8: sync para Postgres.
14. Épico 9: scrapers.
15. Épico 10: operação contínua e alertas.
16. Épico 11 final: release `v2.3.0`.

## Definição De Pronto Por Tarefa

Uma tarefa só deve ser marcada como concluída quando:

- [ ] Código/documentação foi alterado apenas nos arquivos do escopo.
- [ ] Variáveis novas foram documentadas em `.env.example`.
- [ ] `npm run typecheck` passou.
- [ ] `npm run lint` foi executado; warnings conhecidos foram registrados.
- [ ] `npm run build` passou quando a tarefa afeta app, infra ou deploy.
- [ ] Comando funcional específico da tarefa foi executado.
- [ ] Logs/prints relevantes foram anexados na Issue.
- [ ] README, AGENTS, CLAUDE ou docs foram atualizados quando o fluxo mudou.

## Riscos E Mitigações

| Risco | Mitigação |
| --- | --- |
| VPS virar ambiente manual e irreprodutível | Tudo via Docker Compose, scripts e runbooks versionados |
| Segredos vazarem no Git | `.env.production` fora do Git, `.env.example` sem segredos reais |
| Banco perder dados em deploy | Backup antes de migrations e restore testado |
| ClickHouse consumir disco demais | Volumes separados, retenção, alertas de disco e marts por ano |
| MinIO público indevidamente | Bucket privado, acesso via rede interna ou túnel autenticado |
| Postgres/ClickHouse expostos à internet | Senhas fortes, usuários de auditoria com menor privilégio, firewall com allowlist/VPN, logs e rotação de credenciais |
| Supabase Studio exposto sem proteção | Preferir subdomínio HTTPS com autenticação/proteção adicional ou restringir por IP |
| Imagem sem shell dificulta auditoria | Preferir imagens Debian slim para serviços próprios e documentar container auxiliar Debian para inspeção |
| Dados de ERP virem shape acoplado ao app | Exportador permanece raw; canonicalização fica no ClickHouse/SIM-AM |
| Snapshots divergirem dos módulos | Auditoria automática `MODULES` + `MODULE_TABLES` + seed + API smoke |
| HTTPS/cookie falhar em produção | Proxy TLS obrigatório antes de login real; validar cookie `Secure` |

## Convenções De Issues

Use este formato para cada Issue:

```markdown
## Objetivo
[resultado verificável da tarefa]

## Escopo
- Arquivos/serviços afetados
- Fora de escopo

## Passos
- [ ] ...

## Critério de aceite
- [ ] comando X passou
- [ ] endpoint Y respondeu
- [ ] documentação Z atualizada

## Evidências
- logs/comandos/prints adicionados ao finalizar
```

## Primeiro Lote Sugerido

Para iniciar na VPS sem atropelar o pipeline:

- [ ] E0.1 Criar épicos no Linear + milestones espelho no GitHub.
- [ ] **Gate-1** Commit/PR do WIP long-tail (#33).
- [ ] **Gate-2** Migrar `visao-geral` e `orcamento` para `useSnapshot` + seed `mod_visao_geral`.
- [ ] **Gate-3** Rodar audit-modules + quality-check; sincronizar `package.json` version.
- [ ] E2.0 Registrar ADR de proxy TLS.
- [ ] E1.1 Preparar VPS, usuário, SSH, firewall e Docker.
- [ ] E1.2 Apontar DNS do domínio para a VPS.
- [ ] E1.3 Liberar portas externas de auditoria para Supabase Studio, Postgres e ClickHouse com regra de segurança.
- [ ] E2.1 Criar `docker-compose.prod.yml` com app + proxy escolhido + portas de auditoria.
- [ ] E3.1 Subir Postgres produção e aplicar migrations.
- [ ] E3.2 Rodar import IBGE e seed demo com `DEMO_PASSWORD` forte.
- [ ] E10.1/E11.0 Adicionar `/api/health` ao app antes do smoke.
- [ ] E11.1 Fazer smoke test público em HTTPS.

Depois disso, seguir para MinIO/exportador e ClickHouse.
