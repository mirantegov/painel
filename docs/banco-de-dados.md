# Banco de dados — schema, seed e fluxo (Fase 1)

> Complementa [`ARCHITECTURE.md`](../ARCHITECTURE.md). Cobre o **schema** (dimensões, fatos, `mod_*`, auth/ACL), o **seed** demo e o **fluxo de dados** de leitura. Postgres provido pela **Supabase CLI** em dev (`npm run db:start`).

## Migrations

Em `supabase/migrations/` (aplicadas por `npm run db:reset`), em ordem:

| Migration | O que cria |
| --- | --- |
| `…_dimensoes.sql` | `public.dim_municipio`, `public.dim_entidade` (modelo antigo, depois movido p/ tenant) |
| `…_fatos.sql` | `fato_despesa`, `fato_receita` (modelo antigo em `public`) |
| `…_modulos.sql` | `public.modulos`, `public.submodulos` (catálogo) |
| `…_auth_acl.sql` | `public.usuarios`, `usuario_modulos`, `usuario_submodulos` + RLS |
| `…_fato_mes_nullable.sql` | Torna `mes` opcional nos fatos (agregados anuais) |
| `…_multitenant_schemas.sql` | Move tabelas tenant p/ `mun_<ibge>`; cria `provision_municipio()` |
| `…_mod_despesa_receita.sql` | Adiciona `mod_despesa`/`mod_receita` ao template do tenant |

## Schema global (`public`)

Compartilhado por todos os municípios.

### `dim_municipio`
Referência IBGE. `id_ibge char(7)` é a **chave de município em todo o sistema**.

| Coluna | Tipo | Notas |
| --- | --- | --- |
| `id_ibge` | `char(7)` PK | 7 dígitos |
| `nome`, `uf` | `text`, `char(2)` | |
| `codigo_uf`, `regiao` | `smallint`, `text` | |

Populada por `npm run db:import-ibge` (API de localidades do IBGE, upsert por `id_ibge` — idempotente).

### `modulos` / `submodulos`
Catálogo de módulos e sub-tabs. `modulos.id` = slug igual ao `id` em `lib/modules-config.ts` (ex.: `despesa`). `submodulos` referencia `modulo_id` e tem `slug` (value da sub-tab).

### `usuarios`
Cadastro de acesso. Único por `(municipio_id_ibge, cpf)`.

| Coluna | Tipo | Notas |
| --- | --- | --- |
| `id_user` | `uuid` PK | |
| `municipio_id_ibge` | `char(7)` FK → `dim_municipio` | |
| `cpf` | `char(11)` | só dígitos (`^[0-9]{11}$`) |
| `nome`, `cargo`, `secretaria` | `text` | `secretaria` opcional |
| `senha_hash` | `text` | **bcrypt** (hash gerado na app) |
| `ativo` | `boolean` | |

### ACL — `usuario_modulos` / `usuario_submodulos`
Quais módulos/submódulos cada usuário enxerga (PK composta usuário + módulo/submódulo).

## Schema por município (`mun_<id_ibge>`)

Criado por `public.provision_municipio(p_ibge)` a partir de um template. Valida `id_ibge` (7 dígitos) antes de criar.

### `dim_entidade`
Entes do município (`Prefeitura`, `Câmara`, `Autarquia`, `RPPS`, `Fundo`). Sem `municipio_id_ibge` — o schema já é o município.

### `fato_despesa` / `fato_receita`
Fatos **normalizados (colunares)** — destino do pipeline (Épico 5) e SSoT de despesa/receita. Granularidade por `entidade_id + ano + mes` (mes opcional p/ agregados anuais). Despesa tem valores `atualizada/empenhada/liquidada/pago/a_empenhar/a_pagar`; receita tem `prevista/arrecadada/a_arrecadar`, além de dimensões textuais (órgão, função, programa, fonte etc.).

### `mod_*` (um por módulo) — snapshot de exibição
Tabela genérica de **snapshot `jsonb`** lida pelo app:

| Coluna | Tipo | Notas |
| --- | --- | --- |
| `id` | `bigint` PK identity | |
| `entidade_id` | `uuid` FK → `dim_entidade`, **null-ável** | muitos módulos são municipais |
| `ano` | `smallint` | chave de leitura |
| `mes` | `smallint` | opcional |
| `chave` | `text` | filtra um sub-dataset, quando aplicável |
| `dados` | `jsonb` | o snapshot serializável do módulo |
| `criado_em` | `timestamptz` | |

Tabelas: `mod_visao_geral`, `mod_financeiro`, `mod_tributacao`, `mod_orcamento`, `mod_prestacao_contas`, `mod_compras`, `mod_rh`, `mod_saude`, `mod_educacao`, `mod_assistencia_social`, `mod_defesa_civil`, `mod_obras`, `mod_frotas`, `mod_patrimonio`, `mod_processos`, `mod_previdencia`, `mod_saneamento`, `mod_legislativo`, `mod_licitacoes_painel`, `mod_despesa`, `mod_receita`.

## Seed demo (`scripts/seed-demo.ts`)

`npm run db:seed-demo` — **idempotente**. Município **Nova Londrina/PR** (`4117107`), ano `2026`. Passos (em transação):

1. Garante o município em `public.dim_municipio`.
2. `select public.provision_municipio('4117107')` e `set search_path to mun_4117107, public`.
3. Entidades (`Prefeitura`, `Câmara`) em `dim_entidade`.
4. Catálogo `public.modulos` + `public.submodulos` (espelha `lib/modules-config.ts`).
5. Usuário demo em `public.usuarios` (CPF `00000000000`, cargo Prefeito, senha bcrypt — `DEMO_PASSWORD` ou default de dev) e ACL total (`usuario_modulos`/`usuario_submodulos`).
6. Amostra de `fato_despesa` / `fato_receita` (agregado anual) para verificação.
7. Snapshots `mod_*` a partir dos `*_SNAPSHOT` em `lib/demo-*.ts` (`insert into mod_<slug> (entidade_id, ano, dados) …`).

> Para trocar a senha do demo: `DEMO_PASSWORD="…" npm run db:seed-demo`.

## Fluxo de dados (leitura)

```
componente <modulo>.tsx
  └─ useSnapshot("<slug>", <SLUG>_SNAPSHOT)        # components/use-snapshot.ts
        └─ fetch GET /api/data/<slug>?ano=YYYY      # cookie httpOnly mp_session
              └─ app/api/data/[modulo]/route.ts
                    ├─ getSession() → municipio (claim do JWT)   # lib/auth/session.ts
                    └─ getModuloDados(slug, municipio, ano, chave?)  # lib/data/modules.ts
                          ├─ MODULE_TABLES[slug] → "mod_<slug>"  (allowlist)
                          └─ tenantQuery(ibge, "select dados from mod_<slug> where ano=…")
                                └─ set search_path to mun_<ibge>, public   # lib/db.ts
  ↩ { dados }  →  useSnapshot atualiza o estado (fallback bundlado enquanto carrega/erro)
```

Pontos-chave:

- **Município sempre da sessão** (JWT), nunca do cliente — impede leitura cruzada entre municípios.
- **Allowlist** (`MODULE_TABLES`) resolve o nome da tabela — sem SQL dinâmico inseguro.
- **Fallback bundlado:** `lib/demo-*.ts` é importado no bundle e usado enquanto o fetch não retorna (ou em erro), então a UI nunca quebra por ausência de dado.
- **Reatividade:** `useSnapshot` reage ao seletor de ano (`year-provider`) e ao refresh.

## Inspeção rápida

```bash
npm run db:status                      # portas do stack local (Studio, REST, DB)
# Studio:  http://127.0.0.1:54323

# Exemplo: conferir um snapshot seedado
psql "postgresql://postgres:postgres@127.0.0.1:54322/postgres" \
  -c "set search_path to mun_4117107, public;
      select ano, jsonb_typeof(dados) from mod_financeiro;"
```
