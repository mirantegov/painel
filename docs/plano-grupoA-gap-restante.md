# Grupo A (Despesas · Receitas · Planejamento) — estado real e gap restante

> **Correção importante (2026-06-11):** a primeira auditoria concluiu que faltava o sync
> `fato_* → mod_*`. Isso estava **errado** — o sync **já existe e foi validado** (#171). Este
> documento substitui os antigos `plano-grupoA-item1-dimensoes.md` e `-item2-orcamento.md`
> (removidos por premissa incorreta). Ver [`epico5-fase1-build.md`](epico5-fase1-build.md).

## 1. O que JÁ vem da base do cliente (pronto e validado)

Pipeline completo: `raw_<ibge>.siscop_*` → ETL (`schema/etl/10..13`) → `sim_<ibge>.fato_*`
→ **builders** `infra/clickhouse/tools/build_mod_{despesa,receita,orcamento}.mjs`
→ `mun_<ibge>.mod_*` (jsonb por `chave`) → API → componente.

Os builders **resolvem os nomes de dimensão inline do raw** (órgão/unidade/função/subfunção/
programa/ação via `siscop_despesa`⋈`niveismodelodespesa`; fonte via `siscop_fonterecurso`;
receita via `siscop_receita`; `convertCharset` latin1→utf8). **Não há tabelas `dim_*` materializadas
— e não precisa.** Validado para Nova Londrina (`4117107`, 2024–2026).

| Módulo | Campos já data-driven (base) |
|---|---|
| **Despesa** (`execucao`) | `totais` (incl. `aPagar=empenhada−pago`), `evolucaoMensal`, `comparativoAnual`, `dadosÓrgãos/Unidades/FuncaoSubfuncao/Programas/Acoes` (com `tipo`), `dadosSecretarias` (com `sigla/nome`), `treemapData`, `despesaCorrenteCapital(+Chart)` |
| **Receita** (`execucao`) | `totaisGerais/Proprias/Estaduais/Federais/Outras`, `receitasProprias/Estaduais/Federais/outrasReceitas` (com nome + classificação de origem), `distribuicaoOrigem`, `evolucaoMensal`, `comparativoAnual` |
| **Planejamento** (12 chaves) | escalares `desp-loa`/`rec-loa`/`execucao`, `despesaPorFuncao/Secretaria/Fonte/Natureza`, `receitaPorOrigemNatureza`, `receitaPorFonte`, `evolucaoDespesa/Receita` |

Como rodar (por tenant, pós-ETL):
```
CLICKHOUSE_URL/USER/PASSWORD … DATABASE_URL … \
  node infra/clickhouse/tools/build_mod_despesa.mjs  <ibge> <anos…>
  node infra/clickhouse/tools/build_mod_receita.mjs  <ibge> <anos…>
  node infra/clickhouse/tools/build_mod_orcamento.mjs <ibge> <anos…>
```

---

## 2. Gap restante — Lote A: **derivável da base do grupo A** (só estender builder/componente)

Estes campos têm fonte no próprio fato/raw já ingerido; o builder simplesmente ainda não os calcula.
**Sem fonte nova.** Status: implementado em 2026-06-11 (falta rodar builders em prod + verificar no preview).

| # | Módulo | Campo / componente | Onde | Status |
|---|---|---|---|---|
| A1 | Planejamento | `receitaPorEntidade` (chave `rec-entidade`) | `build_mod_orcamento.mjs` | ✅ código (⋈ `siscop_entidade`) |
| A2 | Planejamento | `receitaPorOrigem` (chave `rec-origem`) | idem | ✅ código (reusa `bucket()`) |
| A3 | Despesa | Pie "Despesa por Secretaria" (era hardcoded `:308-334`) | `despesa-municipal.tsx` | ✅ usa `dadosSecretarias` (top4+Outros) |
| A4 | Despesa | `topFornecedores` (nome/cnpj/valor/percentual) | `build_mod_despesa.mjs` | ✅ código (⋈ `siscop_fornecedor`) |
| A5 | Despesa | `despesaPessoalTotal` (base do card LRF) | idem | ⏸️ **adiado** — depende da RCL (Lote B); evita % real×demo |
| A6 | Receita | `receitaCorrenteCapital` + `receitaCorrenteCapitalChart` | `build_mod_receita.mjs` | ✅ código (categoria 1/2 + subcat origem) |
| A7 | Receita | `sazonalidadeData` (mês × origem) | idem | ✅ código (`nrMes`×`bucket()`) |
| A8 | Planejamento | 2 literais JSX (`:600`, `:962`) | `orcamento-municipal.tsx` | ✅ `receitaEntidade[0]?.nome` / `despesaNatureza[0]?.nome` |
| A9 | Receita | footers de variação (era `+4.9%`/`+2.1%`) | `receita-municipal.tsx` | ✅ YoY de `comparativoAnual` (com sinal/cor) |

> **Pendências de verificação:** (1) os builders assumem colunas `siscop_entidade(entidade,nome)` e
> `siscop_fornecedor(fornecedor,nome,identificacao)` — confirmar contra `raw_4117107`; (2) rodar os 3
> builders p/ regravar `mod_*` (escreve em **produção**) e conferir no preview.

> A2/A7 dependem do split Estaduais×Federais — `build_mod_receita.mjs` já tem a regra
> (`bucket()`: origem `7`+espécie `1`=federais, `7`+`2`=estaduais, cat1+origem1-6=próprias).
> Reaproveitar a mesma função.

---

## 3. Gap restante — Lote B: **precisa de fonte fora do grupo A** (ETL/ingestão nova ou regra de gestão)

| Módulo | Campo / bloco | Fonte necessária |
|---|---|---|
| Despesa | `restosAPagarAging` | `siscop_cancelamentorestos` / `siscop_fichaempenho` (RAP; TODO 164/165 já marcado em `10_despesa_movimento.sql:146`) |
| Despesa | `modalidadeLicitacao` | licitações/compras (`siscop_licitacao`) — novo ETL |
| Despesa | `rigidezOrcamentaria` (classif. obrigatória×discricionária) | regra de negócio fiscal (definir) |
| Despesa | LRF: `receitaCorrenteLiquida` + `evolucaoPessoalRCL` | série RCL (cruzar com Receita) — regra/cálculo |
| Despesa | `metasODS` | De-Para programa/ação→ODS (cadastro manual) |
| Despesa | `projecaoExecucao`, `eventosRecentes`, `benchmarkDespesa` | projeção (modelo) · narrativa · dados intermunicipais |
| Receita | `topContribuintes`, `inadimplencia` | tributos/dívida ativa (export **AISE** eloweb) |
| Receita | `metasArrecadacao` | metas fiscais (LDO) ou config do tenant |
| Receita | `projecaoReceita`, `eventosReceita`, `benchmarkMunicipios` | projeção · narrativa · TCE consolidado + população IBGE |
| Planejamento | `receitaAlterada` (atualmente `0`) | créditos adicionais de receita (`orc_reg_receita_alterada`) — novo procedimento no ETL 13 |

---

## 4. Recomendação

Atacar o **Lote A** (A1→A9): tudo deriva do que já está ingerido, é alteração localizada nos
3 builders + 2 componentes, e fecha praticamente todos os blocos restantes dos três dashboards
que são “mockados mas derivam da base”. O **Lote B** entra como backlog dependente de novas
fontes (AISE/tributos, licitações, LDO) ou de regras de gestão (ODS, rigidez, projeções, benchmark).
