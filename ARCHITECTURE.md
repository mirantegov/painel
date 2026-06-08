# Arquitetura — Mirante Painel

> **Escopo:** este documento descreve a arquitetura entregue na **Fase 1** (banco + autenticação + ACL + app de exibição). O pipeline real de ingestão de dados (exportador, ClickHouse, scrapers TCE/SICONFI) é entregue nas fases seguintes e está esboçado em [Camadas](#camadas) e em [`docs/clickhouse-epico5-design.md`](docs/clickhouse-epico5-design.md). Para schema, seed e fluxo de dados em detalhe, veja [`docs/banco-de-dados.md`](docs/banco-de-dados.md).

## Visão geral

O Mirante Painel é um dashboard **Next.js (App Router)** que serve indicadores de gestão pública municipal. Os dados são lidos de um **PostgreSQL** (Supabase self-hosted), isolados **por município** e protegidos por **autenticação própria** com **ACL por módulo/submódulo**.

```
┌──────────────────────────────────────────────────────────────┐
│  Browser (React, App Router)                                  │
│  components/<modulo>.tsx → useSnapshot("<slug>", FALLBACK)    │
└───────────────┬──────────────────────────────────────────────┘
                │ fetch /api/data/<slug>?ano=YYYY   (cookie mp_session)
┌───────────────▼──────────────────────────────────────────────┐
│  Next server (route handlers + middleware)                    │
│  middleware.ts: verifica JWT → libera "/" e "/login"          │
│  /api/auth/login|logout · /api/data/[modulo]                  │
│  lib/auth (jose/bcrypt) · lib/db (pool pg) · lib/data/modules │
└───────────────┬──────────────────────────────────────────────┘
                │ tenantQuery(ibge, sql)  → set search_path mun_<ibge>, public
┌───────────────▼──────────────────────────────────────────────┐
│  PostgreSQL (Supabase self-hosted)                            │
│  public.*  : dim_municipio, modulos, submodulos, usuarios,    │
│              usuario_modulos, usuario_submodulos              │
│  mun_<ibge>: dim_entidade, fato_despesa, fato_receita, mod_*  │
└──────────────────────────────────────────────────────────────┘
```

## Camadas

O alvo do produto são **três camadas**; a Fase 1 entrega apenas a de **serving**:

1. **Ingestão** *(Épicos 4 e 6 — futuro)* — exportador Go → Parquet → MinIO e scrapers Python (TCE/PR, SICONFI) que coletam despesa, receita, contas, certidões etc.
2. **SSoT analítica** *(Épico 5 — futuro)* — **ClickHouse** como fonte da verdade colunar (um database `mun_<ibge>` por município), com ETL e sincronização para o Postgres.
3. **Serving** *(Fase 1 — entregue)* — **PostgreSQL** servindo a leitura do app: fatos normalizados (`fato_despesa`/`fato_receita`) como destino do pipeline e **snapshots `jsonb`** (`mod_*`) para exibição rápida por módulo.

Enquanto o pipeline não existe, os snapshots `mod_*` e uma amostra de `fato_*` são populados pelo **seed demo** (`scripts/seed-demo.ts`).

## Multi-tenant por schema

O isolamento entre municípios é **por schema**, espelhando o modelo database-por-município do ClickHouse:

- **Global (`public`):** `dim_municipio`, `modulos`, `submodulos`, `usuarios`, `usuario_modulos`, `usuario_submodulos`.
- **Por município (`mun_<id_ibge>`):** `dim_entidade`, `fato_despesa`, `fato_receita` e os snapshots `mod_*` (um por módulo).

A função `public.provision_municipio(p_ibge char(7))` cria o schema do tenant e todas as suas tabelas a partir de um template (valida `id_ibge` como 7 dígitos antes de criar). O `id_ibge` é a **chave de município em todo o sistema**.

O acesso é feito por **`tenantQuery(ibge, sql, params)`** (`lib/db.ts`): pega uma conexão do pool, fixa `search_path to mun_<ibge>, public`, executa e **reseta o search_path** antes de devolver a conexão ao pool. Tabelas de dados resolvem no schema do tenant; objetos globais são referenciados com prefixo `public.*`.

> **O município sempre vem da sessão (claim do JWT), nunca do cliente.** Isso evita que um usuário leia dados de outro município manipulando a requisição.

## Autenticação e ACL

Autenticação **própria** — não usa o GoTrue do Supabase.

- **Login** = `cliente (id_ibge) + usuário (CPF) + senha`. A rota `POST /api/auth/login` valida contra `public.usuarios` (`municipio_id_ibge + cpf + ativo`), confere a senha com **bcrypt** (`lib/auth/password.ts`) e, se ok, emite a sessão.
- **Sessão** = **JWT HS256** (`jose`, compatível com o Edge runtime do middleware), assinado com `JWT_SECRET`, validade **8 horas**, gravado no cookie **httpOnly `mp_session`**. Claims: `id_user`, `municipio` (id_ibge), `nome`, `cargo` (`lib/auth/jwt.ts`).
- **Guarda de rotas** = `middleware.ts` verifica o JWT e controla o acesso a `/` e `/login`. A leitura de sessão no servidor é feita por `getSession()` (`lib/auth/session.ts`).
- **ACL** = `usuario_modulos` e `usuario_submodulos` definem quais módulos/submódulos cada usuário enxerga. No app, o gating de submódulos usa `useSubmoduleAccess` (ex.: Contas Públicas). O usuário demo recebe acesso total no seed.

**Defesa em profundidade:** RLS é habilitado nas tabelas (sem políticas para `anon`/`authenticated`), de modo que a Data API do Supabase nega acesso; as queries do app usam uma conexão privilegiada (`postgres`) via pool e o isolamento é aplicado na camada de aplicação (search_path + claim do JWT).

## Leitura de dados por módulo (display)

Cada módulo de exibição lê um **snapshot `jsonb`** da tabela `mod_<slug>` do tenant:

- **`lib/data/modules.ts`** — `getModuloDados(slug, municipio, ano, chave?)` resolve o nome da tabela por uma **allowlist** (`MODULE_TABLES`), evitando SQL dinâmico inseguro, e retorna a coluna `dados` (jsonb).
- **`app/api/data/[modulo]/route.ts`** — route handler genérico: pega o município da sessão, o `ano` da query, chama `getModuloDados` e devolve `{ dados }`.
- **`components/use-snapshot.ts`** — hook client-side `useSnapshot(slug, fallback)`: faz `fetch(/api/data/<slug>?ano=…)`, reage ao seletor de ano e ao refresh, e usa o **fallback bundlado** (`lib/demo-*.ts`) enquanto carrega ou em caso de erro.

`fato_despesa`/`fato_receita` são o destino normalizado (colunar) do pipeline; a exibição de Despesa/Receita hoje lê dos snapshots `mod_despesa`/`mod_receita` (uniformidade de leitura entre módulos).

### Padrão de migração de um módulo para snapshot

1. Extrair os consts de dados do componente para `lib/demo-<slug>.ts` e exportar `<SLUG>_SNAPSHOT` apenas com dados **serializáveis** (sem funções, JSX ou refs de ícone).
2. No componente, consumir via `const { … } = useSnapshot("<slug>", <SLUG>_SNAPSHOT)`. Helpers de formatação, `chartConfig` e dados com ícones permanecem no componente (apresentação).
3. Garantir o mapeamento `<slug> → mod_<slug>` em `MODULE_TABLES`.
4. Seedar em `scripts/seed-demo.ts` (`insert into mod_<slug> …`).

Módulos já no padrão: visão-geral, despesa, receita, orçamento, financeiro, tributação, compras, RH, contas públicas (prestação de contas) e painel de licitações.

## Componentes de servidor relevantes

| Arquivo | Responsabilidade |
| --- | --- |
| [`middleware.ts`](middleware.ts) | Verifica o JWT do cookie e protege `/` e `/login` |
| [`lib/auth/jwt.ts`](lib/auth/jwt.ts) | Assinatura/verificação do JWT (HS256, `jose`) |
| [`lib/auth/password.ts`](lib/auth/password.ts) | Hash/verificação de senha (bcrypt) |
| [`lib/auth/session.ts`](lib/auth/session.ts) | Leitura da sessão no servidor |
| [`lib/db.ts`](lib/db.ts) | Pool `pg` singleton + `tenantQuery` (search_path) |
| [`lib/data/modules.ts`](lib/data/modules.ts) | `getModuloDados` + allowlist `MODULE_TABLES` |
| [`app/api/auth/login/route.ts`](app/api/auth/login/route.ts) | Login (valida usuário, emite JWT) |
| [`app/api/data/[modulo]/route.ts`](app/api/data/[modulo]/route.ts) | Snapshot do módulo por município/ano |

## Variáveis de ambiente

| Variável | Uso |
| --- | --- |
| `DATABASE_URL` | Conexão Postgres (dev: `postgresql://postgres:postgres@127.0.0.1:54322/postgres`) |
| `JWT_SECRET` | Segredo de assinatura do JWT de sessão (obrigatório) |
| `AUTH_COOKIE_NAME` | Nome do cookie de sessão (default `mp_session`) |
| `DEMO_PASSWORD` | (Opcional, só seed) sobrescreve a senha do usuário demo |

## Fases seguintes (pós v2.0.0)

- **Épico 4** — Exportador Go → Parquet → MinIO.
- **Épico 5** — ClickHouse SSoT + ETL + sync → Postgres ([design](docs/clickhouse-epico5-design.md)).
- **Épico 6** — Scrapers Python TCE/PR e SICONFI (Agenda, Certidão, Contas, CAUC, MSC).
- **Épico 7** — docker-compose self-hosted próprio do Supabase para produção (sem CLI).
