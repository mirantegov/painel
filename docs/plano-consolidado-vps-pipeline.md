# Plano Consolidado VPS e Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Organizar a continuidade do Mirante Painel em uma VPS, com domínio/DNS, stack Docker completo, banco multi-tenant, pipeline MinIO/ClickHouse/Postgres, exportadores, scrapers e governança por épicos/tarefas.

**Architecture:** O produto passa a operar como um stack self-hosted: proxy HTTPS na borda, Next.js como app, Postgres/Supabase como serving, MinIO como landing raw, ClickHouse como SSoT analítica e jobs de ingestão/sync. O desenvolvimento continua no servidor com Git, Docker Compose, backups, observabilidade e releases versionados.

**Tech Stack:** Next.js 16, React 19, TypeScript, PostgreSQL/Supabase self-hosted, ClickHouse 25.3, MinIO, Docker Compose, Go exporter, Python scrapers, Caddy ou Traefik para TLS, GitHub Issues/Milestones para gestão. Imagens de produção devem usar base Debian/Bookworm quando houver tag oficial compatível; imagens customizadas devem partir de Debian slim para facilitar shell interno, auditoria e troubleshooting.

---

## Estado Atual Em 2026-06-09

- App Next.js com build standalone via `Dockerfile`.
- `docker-compose.yml` atual sobe apenas o serviço `app`.
- Auth custom entregue: login por cliente IBGE + CPF + senha, JWT HS256 em cookie `mp_session`.
- Postgres multi-tenant entregue em migrations Supabase: `public.*` global e schemas `mun_<id_ibge>` por município.
- Leitura de módulos entregue via snapshots `mod_*` e rota `GET /api/data/[modulo]`.
- `scripts/seed-demo.ts` provisiona Nova Londrina/PR (`4117107`), usuário demo, ACL total, fatos demo e snapshots.
- Catálogo de módulos centralizado em `lib/modules-config.ts`; dados de módulo em `lib/data/modules.ts`.
- Long tail de snapshots foi consolidado para os módulos remanescentes.
- ClickHouse SIM-AM já tem infra em `infra/clickhouse/`: 224 tabelas canônicas, 224 raw e 115 domínios.
- MinIO já tem compose separado em `infra/docker-compose.minio.yml`.
- Exportador Go existe em `exporter/`, com manifest padrão e manifest Elotech eloweb.
- Plano de Análises está historicamente concluído; só deve voltar se auditoria apontar regressão.

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
  DNS["DNS do domínio"] --> Proxy["Caddy/Traefik HTTPS"]
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

### Épico 0 · Governança, Branches E Gestão

**Objetivo:** garantir que o trabalho prossiga com rastreabilidade e sem perder o estado atual.

**Tarefas:**

- [ ] Criar Milestones no GitHub para os épicos 1 a 11 deste plano.
- [ ] Criar Issues uma por tarefa, com prefixo `E<n>.<tarefa>`.
- [ ] Definir branch padrão de trabalho na VPS: `govtech42/<epico>-<slug>`.
- [ ] Manter `docs/CONTINUIDADE-SESSAO.md` e `docs/HANDOFF-2026-06-09.md` como referências históricas, sem substituir este plano.
- [ ] Atualizar README/AGENTS/CLAUDE quando cada épico mudar comandos, infraestrutura ou fluxo operacional.
- [ ] Padronizar checklist de conclusão por tarefa: `npm run typecheck`, `npm run lint`, `npm run build`, teste funcional e registro planejado-vs-feito na Issue.

**Critério de aceite:** Milestones e Issues criadas, cada tarefa com escopo, critério de aceite e ordem de execução.

---

### Épico 1 · VPS, Domínio, DNS E Segurança Base

**Objetivo:** preparar a VPS como ambiente de desenvolvimento/homologação permanente.

**Tarefas:**

- [ ] Escolher o hostname principal, por exemplo `painel.seudominio.com.br`.
- [ ] Criar registros DNS `A` e, se aplicável, `AAAA` apontando para a VPS.
- [ ] Criar usuário Linux não-root para deploy.
- [ ] Configurar SSH por chave e desabilitar login por senha.
- [ ] Configurar firewall liberando `22`, `80`, `443` e as portas externas de auditoria autorizadas.
- [ ] Definir portas externas padronizadas:
  - Supabase Studio: `54323` ou subdomínio protegido `studio.<dominio>`
  - Postgres: `5432` ou porta alternativa documentada
  - ClickHouse HTTP: `8123`
  - ClickHouse nativo: `9100` ou porta alternativa documentada
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
- [ ] Documentar o runbook de acesso em `docs/runbook-vps.md`.

**Arquivos prováveis:**

- Criar `docs/runbook-vps.md`
- Criar ou modificar `.env.example`
- Criar `infra/vps/README.md`

**Comandos de validação:**

```bash
docker version
docker compose version
curl -I http://painel.seudominio.com.br
```

**Critério de aceite:** VPS acessível por domínio, Docker funcionando, portas web abertas e portas de auditoria acessíveis somente conforme regra definida de firewall/allowlist.

---

### Épico 2 · Compose De Produção E Proxy HTTPS

**Objetivo:** substituir o compose mínimo por um stack self-hosted consistente.

**Tarefas:**

- [ ] Criar `docker-compose.prod.yml` com redes internas e volumes nomeados.
- [ ] Incluir serviço `app` com build do `Dockerfile`, env production e healthcheck HTTP.
- [ ] Auditar a base de cada imagem do stack e registrar no compose/runbook: `app` em `node:<versao>-slim` Debian, Postgres em tag Debian/Bookworm, serviços customizados em Debian slim.
- [ ] Para serviço oficial sem imagem Debian adequada, documentar a exceção e incluir container auxiliar Debian na mesma rede/volume para inspeção operacional.
- [ ] Incluir proxy HTTPS com Caddy ou Traefik.
- [ ] Configurar certificados TLS automáticos para o domínio.
- [ ] Expor Postgres e ClickHouse para auditoria externa conforme decisão do projeto, com portas documentadas, senhas fortes e restrição por firewall/allowlist quando possível.
- [ ] Expor Supabase Studio para auditoria do dev, preferindo subdomínio HTTPS com autenticação/proteção adicional; se usar porta direta, documentar risco e regra de firewall.
- [ ] Manter MinIO privado por padrão; expor console/API apenas quando necessário para exportador ou auditoria, com credenciais fortes.
- [ ] Garantir que serviços com necessidade de shell interno usem imagens base Debian/Bookworm ou tenham exceção documentada com alternativa de shell interno.
- [ ] Adicionar profile opcional para expor consoles administrativos somente via túnel SSH ou rede privada.
- [ ] Criar script `scripts/deploy-vps.sh` para pull, build, up, migrations, seed opcional e healthcheck.
- [ ] Documentar rollback simples: voltar commit anterior, rebuild e restaurar backup se banco tiver mudado.

**Arquivos prováveis:**

- Criar `docker-compose.prod.yml`
- Criar `infra/caddy/Caddyfile` ou `infra/traefik/`
- Criar `scripts/deploy-vps.sh`
- Atualizar `README.md`

**Comandos de validação:**

```bash
docker compose -f docker-compose.prod.yml config
docker compose -f docker-compose.prod.yml up -d --build
curl -I https://painel.seudominio.com.br/login
nc -vz painel.seudominio.com.br 5432
curl -s http://painel.seudominio.com.br:8123/ --data "SELECT 1"
```

**Critério de aceite:** `/login` responde em HTTPS com cookie `Secure` em produção; Postgres e ClickHouse aceitam conexão externa autorizada para DataGrip; Supabase Studio abre pelo endpoint definido.

---

### Épico 3 · Postgres/Supabase Self-Hosted De Produção

**Objetivo:** levar o banco de serving para o stack da VPS, sem depender da Supabase CLI em produção.

**Tarefas:**

- [ ] Decidir o modo de produção: Postgres puro com migrations SQL ou stack Supabase self-hosted completo.
- [ ] Criar serviço Postgres 15+ persistente no compose de produção.
- [ ] Publicar Postgres externamente para DataGrip com porta documentada e credencial exclusiva de auditoria/leitura quando aplicável.
- [ ] Criar usuário Postgres de auditoria com permissões controladas para inspeção de `public` e schemas `mun_*`.
- [ ] Se usar Supabase Studio, publicar o Studio no compose com rota/porta externa e proteção de acesso.
- [ ] Criar usuário/senha fortes e `DATABASE_URL` interna para o app.
- [ ] Criar job ou script para aplicar migrations `supabase/migrations/*.sql` no Postgres da VPS.
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
psql "postgresql://AUDIT_USER:AUDIT_PASSWORD@painel.seudominio.com.br:5432/postgres" -c "select current_database(), current_user"
```

**Critério de aceite:** app autentica via banco da VPS, retorna snapshots por `/api/data/<slug>?ano=2026` e DataGrip conecta no Postgres com usuário de auditoria.

---

### Épico 4 · Hardening Do App, Auth E ACL

**Objetivo:** transformar a base demo em aplicação operável para múltiplos municípios e usuários.

**Tarefas:**

- [ ] Criar tela ou script administrativo para criar município, entidades, usuário e ACL.
- [ ] Validar `JWT_SECRET` obrigatório em produção; falhar boot se usar segredo dev.
- [ ] Revisar `secure`, `sameSite`, domínio do cookie e tempo de sessão.
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

**Tarefas:**

- [ ] Integrar `infra/docker-compose.minio.yml` ao compose de produção.
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
curl -s http://painel.seudominio.com.br:8123/ --data "SELECT currentUser()"
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
- [ ] Criar página ou endpoint interno de saúde do app.
- [ ] Criar backups diários de Postgres.
- [ ] Criar backup/snapshot dos volumes MinIO e ClickHouse, ou política clara de reconstrução a partir do raw.
- [ ] Testar restore completo em ambiente paralelo.
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

### Épico 11 · Release V2 E Primeira Homologação Real

**Objetivo:** consolidar uma versão publicável do painel em domínio real.

**Tarefas:**

- [ ] Criar release candidate `v2.0.0-rc.1`.
- [ ] Rodar pipeline completo: typecheck, lint, build, seed, API smoke e login no domínio.
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
curl -I https://painel.seudominio.com.br/login
```

**Critério de aceite:** domínio HTTPS acessível, login funcionando, módulos carregando dados do Postgres da VPS e release documentada.

## Ordem Recomendada De Execução

1. Épico 0: gestão e issues.
2. Épico 1: VPS, DNS e segurança base.
3. Épico 2: compose produção e HTTPS.
4. Épico 3: Postgres produção, migrations, seed e backup.
5. Épico 4: hardening de auth/ACL.
6. Épico 5: qualidade dos módulos e snapshots.
7. Épico 11 parcial: primeira homologação do app em domínio.
8. Épico 6: MinIO e exportador.
9. Épico 7: ClickHouse/ETL.
10. Épico 8: sync para Postgres.
11. Épico 9: scrapers.
12. Épico 10: operação contínua e alertas.
13. Épico 11 final: release `v2.0.0`.

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

- [ ] E0.1 Criar milestones e issues deste plano.
- [ ] E1.1 Preparar VPS, usuário, SSH, firewall e Docker.
- [ ] E1.2 Apontar DNS do domínio para a VPS.
- [ ] E1.3 Liberar portas externas de auditoria para Supabase Studio, Postgres e ClickHouse com regra de segurança.
- [ ] E2.1 Criar `docker-compose.prod.yml` com app + proxy HTTPS e portas de auditoria.
- [ ] E3.1 Subir Postgres produção e aplicar migrations.
- [ ] E3.2 Rodar import IBGE e seed demo com senha forte.
- [ ] E11.1 Fazer smoke test público em HTTPS.

Depois disso, seguir para MinIO/exportador e ClickHouse.
