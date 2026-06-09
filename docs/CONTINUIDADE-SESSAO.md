# Contexto de continuidade — Backend v2 (Fase 1 → Release v2.0.0)

> Handoff para retomar em outra sessão. Estado em 2026-06-08. Branch padrão: `main`.
> Planos detalhados: `docs/plano-fase-backend-v2.md` e `docs/clickhouse-epico5-design.md`.

## ✅ STATUS: Épico 3 FECHADO · Release v2.0.0 PUBLICADA (2026-06-08)
Toda a fila abaixo foi concluída e mergeada. Issues fechadas: **#65** (Financeiro #73, Tributos #74, Compras #75, RH #76), **#32** (Contas Públicas #77), **#58** (docs #78: README + `ARCHITECTURE.md` + `docs/banco-de-dados.md`), **#64** (seed `mod_*`). Tag/release **`v2.0.0`** em `main`. Módulos de entrega (despesa, receita, orçamento, financeiro, tributação, compras, RH, contas públicas, painel de licitações) leem do Postgres.
**Aberto (pós-v2.0.0):** **#33** (3.7 long-tail) — `processos` migrado p/ snapshot (#99); restam 10: saúde, educação, obras, frotas, patrimônio, previdência, saneamento, legislativo, assistência, defesa civil.

### Épico 5 — Armazém canônico SIM-AM no ClickHouse (ENTREGUE 2026-06-08)
`infra/clickhouse/` (#100 + #101 mergeados). Formato canônico SIM-AM 2026/TCE-PR gerado do PDF (848 págs) via `tools/parse_layout.py`→`gen_ddl.py`→`apply_batches.py`. **224 tabelas canônicas (`simam`) + 224 raw (`simam_raw`) + 115 domínio (106 populadas, ~2,5k linhas), 0 falhas.** ClickHouse Docker (HTTP 8123, nativo **9100** — 9000 é do MinIO), dados em volume `./data`. Pipeline `MinIO→simam_raw→ETL→simam`. Extração ~99,9% limpa; resíduos via `tools/overrides.json`. Plano/pendências: `docs/plano-simam-clickhouse.md` (ligar exportador Go→raw, materializar ETL raw→simam, sync simam→Postgres). Ver memória [[simam-clickhouse]].
A seção "FILA RESTANTE" abaixo é histórica (já cumprida) — mantida para referência do padrão.

## Objetivo da fase
Sair do mock e servir dados do **Supabase self-hosted (Postgres)**, multi-tenant por schema, com auth custom e ACL. Pipeline real (Go→Parquet→MinIO→ClickHouse→Postgres) e scrapers TCE/SICONFI são Épicos 4–6 (depois do v2.0.0).

## Como rodar (dev — Supabase CLI)
```
npm run db:start        # sobe Postgres/Studio/REST via Docker (CLI)
npm run db:reset        # aplica supabase/migrations/
npm run db:import-ibge  # importa 5571 municípios → public.dim_municipio
npm run db:seed-demo    # provisiona mun_4117107 + seed + usuário demo
npm run dev             # Next em localhost:3000
```
`.env.local` (não versionado): `DATABASE_URL` (postgres local 54322), `JWT_SECRET`, `AUTH_COOKIE_NAME`.

### Login demo (Nova Londrina)
- Cliente (IBGE): `4117107` · Usuário (CPF): `00000000000` · Senha: `Dx7$kP2w-Ra9mLZ`
- Prefeito, acesso total (ACL 21 módulos + 20 submódulos).

## Arquitetura atual (decisões fixas)
- **Auth custom** (NÃO GoTrue): `lib/auth/{jwt(jose),password(bcrypt),session}`. Cookie httpOnly `mp_session`. Middleware valida JWT. Login = Cliente(IBGE)+CPF+senha (`app/login/page.tsx` + `app/api/auth/login|logout`).
- **Multi-tenant por schema**: dados em `mun_<id_ibge>` (ex.: `mun_4117107`); global em `public` (`dim_municipio`, `modulos`, `submodulos`, `usuarios`, `usuario_modulos`, `usuario_submodulos`). Função `public.provision_municipio(p_ibge)` cria o template (dim_entidade, fato_despesa, fato_receita, e `mod_*` jsonb incluindo `mod_despesa`/`mod_receita`).
- **Acesso a dados**: `lib/db.ts` → `tenantQuery(ibge, sql, params)` fixa `search_path to mun_<ibge>, public`. Município SEMPRE da sessão (JWT), nunca do cliente.
- **Leitura por módulo (display)**: snapshot `jsonb` em `mod_<slug>.dados`. `lib/data/modules.ts` `getModuloDados(slug, municipio, ano, chave?)` (allowlist `MODULE_TABLES`). Route handler genérico `app/api/data/[modulo]/route.ts`.
- **fato_despesa/fato_receita** (colunar, normalizado) = SSoT do pipeline (Épico 5); o display hoje lê dos snapshots `mod_despesa`/`mod_receita`.
- **Seletor de ano**: `components/year-provider.tsx` (`useYear`: ano, setAno, anos, refreshNonce, refresh). Faixa de cabeçalho `components/module-header.tsx` (título+subtítulo de `MODULE_HEADERS` em `lib/modules-config.ts` + seletor de ano + refresh) renderizada por `app/page.tsx`→`components/dashboard.tsx`.
- **KPIs monetários**: `lib/format.ts` `fmtBRL` (compacto R$ X.XM / R$ XXK).
- **Menu default**: `lib/modules-config.ts` `DEFAULT_ENABLED_MODULE_IDS` (9 de entrega) visíveis; resto oculto por padrão via `components/module-visibility-provider.tsx` (localStorage respeita escolha do usuário).

## Padrão para migrar um módulo (snapshot) — PROVADO
1. Extrair os consts de dados do componente → `lib/demo-<slug>.ts` (prefixar `export`); criar `export const <SLUG>_SNAPSHOT = { ...nomes }` SÓ com dados serializáveis (sem funções/JSX).
2. Componente: remover bloco de dados; `import { useSnapshot } from "@/components/use-snapshot"` + `import { <SLUG>_SNAPSHOT }`; no topo da função `const { ...nomes } = useSnapshot("<slug>", <SLUG>_SNAPSHOT);`. Helpers de formatação ficam no componente. Consts COMPUTADAS que dependem dos dados também entram no destructure (já calculadas no snapshot) ou recalculadas dentro do componente.
3. `lib/data/modules.ts`: garantir `<slug> → mod_<slug>` no `MODULE_TABLES`.
4. `scripts/seed-demo.ts`: `import { <SLUG>_SNAPSHOT }` (caminho relativo `../lib/...`) + `insert into mod_<slug> (entidade_id, ano, dados) values (...)` (search_path já é o tenant no seed).
5. Verificar: `npm run typecheck`; `db:reset`+`import-ibge`+`seed-demo`; `/api/data/<slug>?ano=2026` retorna o snapshot; KPIs compactos.
Exemplos já feitos: `orcamento`(numérico via computeOrcamento), `despesa`, `receita`, `licitacoes-painel`.

⚠️ Gotchas:
- `for n in $VAR` no zsh NÃO faz word-split — usar lista explícita no loop.
- `awk` que insere import após o 1º `import ` quebra import multi-linha — conferir e mover p/ depois do bloco.
- Snapshot é `JSON.stringify` → jsonb: NÃO incluir funções (ex.: receita `calcularTotais` ficou fora).
- Em remoções por `sed 'A,Bd'` conferir off-by-one do wrapper `<div className="space-y-8">` (quebrou frotas uma vez).

## Workflow (obrigatório por tarefa)
branch `govtech42/...` → implementar → `npm run typecheck`/`lint` → verificar no browser (mcp Claude_Preview) → commit → push → `gh pr create` → revisão por subagent `caveman:cavecrew-reviewer` → corrigir se reprovar (3 falhas → chamar usuário) → `gh pr merge --squash --delete-branch` → fechar issue. Commits/PRs co-autoria: `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

## FILA RESTANTE p/ fechar Épico 3 → Release v2.0.0
Issues abertas (GitHub `mirantegov/painel`):
- **#65 (3.14)** — migrar p/ snapshot (extração inline, GRANDES): `financeiro-municipal` (~2471), `tributacao-municipal` (~3714), `compras-municipais` (~1743), `rh-municipal` (~2796). Tabelas `mod_*` já existem; seguir o padrão acima. (Painel Licitações já feito — parcial mergeada.)
- **#32 (3.6)** — `prestacao-contas` (Contas Públicas, ~3302): MISTO. Já importa de `lib/demo-agenda-obrigacoes`, `lib/demo-msc`, `lib/demo-certidao`; falta extrair os dados inline de CAUC/TCE e unificar num `CONTAS_SNAPSHOT` (ou seedar por `chave`). Gating de submódulos já existe (useSubmoduleAccess).
- **#58 (3.9)** — Documentação parcial (Fase 1): `README.md` (setup/login/scripts), `ARCHITECTURE.md` (3 camadas + multi-tenant + modelo de dados + auth/ACL), docs de schema/seed/fluxo.
- **Limpeza de warnings** de lint (imports/estado órfãos dos componentes tocados; ~0 erros, só warnings) — combinar com a migração de cada módulo.
- **Release `v2.0.0`** ao fechar Épico 3; depois CHAMAR o usuário para detalhar o Épico 4.

## Fases seguintes (pós v2.0.0) — já com issues/milestones
- **Épico 4** — Exportador Go → Parquet → MinIO (`infra/docker-compose.minio.yml` placeholder). Usuário quer dar detalhes ANTES de iniciar.
- **Épico 5** — ClickHouse SSoT + ETL + sync→Postgres (design pronto em `docs/clickhouse-epico5-design.md`; database `mun_<ibge>` espelhando o schema).
- **Épico 6** — Scrapers Python TCE/PR (Agenda, Certidão, Contas) + SICONFI (CAUC, MSC) → Contas Públicas.
- **Épico 7 (#59 / 3.10)** — docker-compose self-hosted próprio do Supabase (produção, sem CLI), a partir do `supabase/docker` oficial. Dev segue na CLI até produção.

## Convenções do projeto (CLAUDE.md)
- Planos/docs sempre em `docs/`. Slack → canal `#analytics` (C0B18NPV886). Ícones `@hugeicons/react`. `next.config.mjs` ignora erros de build, mas rodar `npm run typecheck`.
