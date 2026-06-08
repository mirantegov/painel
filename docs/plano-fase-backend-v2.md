# Plano Fase Backend — v2.0.0

> Plano acessório de execução. Épicos = Milestones no GitHub; Tarefas = Issues.
> Fase 1 (entrega → Release `v2.0.0`) = Épicos 1–3. Épicos 4–6 são fases seguintes (detalhar após v2.0.0).

## Contexto

Sair do mock (dados estáticos em `lib/demo-*.ts` + consts inline; auth `admin/admin`) e montar backend real:

```
[Cliente ERP]                              [TCE/PR + SICONFI]
   │ exportador Go                              │ scrapers Python
   ▼                                            ▼
Parquet → MinIO (S3) ──────► ClickHouse (SSoT: raw + transform + marts)
                                          │ sync de marts curados
                                          ▼
                          Supabase self-hosted (Postgres) ◄── Next.js (read)
                          + auth custom (usuarios) + ACL
```

Decisões validadas: auth = tabela custom + JWT em cookie; S3 = MinIO self-hosted; 1ª entrega = DB+Auth+ACL+app; scrapers = Python (Scrapy/Playwright).

## Modelo de dados (Postgres / serving)

- `municipio` = `id_ibge` (7 dígitos) em todas as tabelas. Importar tabela oficial IBGE como referência.
- **Regra universal:** toda tabela de fato/módulo carrega `municipio, entidade, ano, mes`. Toda tela tem filtro de **ano** (já) e **mês** (futuro, onde fizer sentido).
- Dimensões: `dim_municipio`, `dim_entidade`.
- Fatos: `fato_despesa` (municipio, entidade, ano, mes, data, lancamento, programatica, orgao, unidade, secretaria + valores); `fato_receita` (municipio, entidade, ano, mes, data, lancamento, receita + valores).
- Demais 19 módulos: tabelas keyed `municipio, entidade, ano, mes`.
- Auth/ACL: `usuarios` (id_user, municipio_id_ibge, cpf, nome, cargo, secretaria?, senha_hash, ativo), `modulos`, `submodulos`, `usuario_modulos`, `usuario_submodulos`.

Demo: município Nova Londrina `4117453`; usuário `00000000000` (Prefeito, acesso total).

## Workflow de execução (por tarefa)

1. Issue na Milestone do épico (descrição + plano de implementação detalhado).
2. Branch `govtech42/<épico>-<tarefa>`; implementar.
3. Ao concluir: comentar na Issue feedback **planejado-vs-feito**.
4. `quality-check` (typecheck/lint/format).
5. Commit + push + PR.
6. Revisão por outro agent/skill (`/code-review` ou subagent reviewer).
7. Aprovado → merge, fecha Issue → próxima. Reprovado → corrige e re-revisa.
8. 3ª reprovação na mesma tarefa → parar e chamar o usuário.
9. Issues do épico fechadas e verificadas → fechar Milestone.
10. Fase 1 (Épicos 1–3) concluída → Release `v2.0.0` → chamar usuário para planejar fases seguintes.

## Épicos e Tarefas

### Épico 1 · Infra & Schema Supabase
- 1.1 docker-compose Supabase self-hosted (+ placeholder MinIO) e `.env`.
- 1.2 Migrations: dimensões (`dim_municipio`, `dim_entidade`).
- 1.3 Migrations: `fato_despesa` + `fato_receita`.
- 1.4 Migrations: 19 tabelas por módulo.
- 1.5 Migrations: auth/ACL.
- 1.6 Import IBGE → `dim_municipio`.
- 1.7 `scripts/seed-from-demo.ts`: seed Nova Londrina + usuário demo.

### Épico 2 · Auth multi-tenant + ACL
- 2.1 `lib/auth/{jwt,password}.ts`.
- 2.2 `app/api/auth/login|logout/route.ts`.
- 2.3 `middleware.ts` valida JWT.
- 2.4 `app/login/page.tsx` 3 campos (Cliente IBGE + CPF + senha).
- 2.5 util de sessão server (claims → municipio).
- 2.6 modules-config registra submódulos; `app/page.tsx` filtra por `usuario_modulos`.
- 2.7 Gating de submódulos nos módulos complexos.

### Épico 3 · Migração mock → Postgres + filtros
- 3.1 `lib/supabase/{server,client}.ts`.
- 3.2 `lib/data/*.ts` + seletor de ano global.
- 3.3 Despesa lê do Postgres.
- 3.4 Receita lê do Postgres.
- 3.5 Financeiro, Tributos, Planejamento.
- 3.6 Contas Públicas.
- 3.7 Módulos restantes (incremental).
- 3.8 Ajustar `ModuleVisibilityProvider`.

### Fases seguintes (pós v2.0.0)
- Épico 4 · Exportador Go + MinIO.
- Épico 5 · ClickHouse SSoT + ETL + sync→Postgres.
- Épico 6 · Scrapers TCE/PR + SICONFI.
