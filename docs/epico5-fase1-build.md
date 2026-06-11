# Épico 5 — Fase 1 (analítico): build status — Despesa & Receita

> Fase 1 = facts analíticos **com valores** em `sim_<ibge>`, a partir do raw Elotech
> (`raw_<ibge>.siscop_*`), usando o BI antigo (`ctb_reg_*`) só como **referência de lógica**.
> Objetivo: fazer o dashboard funcionar agora (ERP Elotech). Fase 2 = popular SIM-AM fiel
> (fonte definitiva, ERP-agnóstica) e migrar a fonte. Ver [[bi-antigo-import-query]] e
> `epico5-pipeline-despesa-receita-pesquisa.md`.

## Entregue (validado em 4117107 / Nova Londrina)

### Tabelas novas em `sim_<ibge>`
- **`fato_despesa_movimento`** — 1 linha/movimento, `vlMovimento` assinado, dims da `programatica`
  (órgão/unidade/função/subfunção/programa/ação/categoria/grupo/modalidade/elemento/natureza).
  Estágios: 16 empenho (161/162/163), 17 liquidação (171/172), 18 pagamento (181/182).
- **`fato_receita_movimento`** — 1 linha/item, `vlMovimento` assinado por `grupoevento`.
  Estágio 26 (261/262/263/264). Código de receita parseado por SUBSTRING.

Medidas do dashboard = `SUM(vlMovimento)` filtrando `cdEstagio`:
`empenhada=16 · liquidada=17 · paga=18 · arrecadada=26`.

- **`fato_despesa_orcamento`** — estágio 10: 111 orçado(+) · 112 suplementação(+) · 113 redução(-).
  `atualizada = SUM(vlMovimento)`. Fontes: `siscop_orcdespesa`/`orcversaoorcamento` (versão vigente) e
  `siscop_decreto`/`itemdecreto`.
- **`fato_receita_orcamento`** — estágio 10: 101 previsto(+) · 102 dedução(valor já negativo no source).
  `prevista_líquida = SUM(vlMovimento)`. Fontes: `siscop_orcreceita` ⋈ `orcreceita_fontetce` (rateio por %).

### Arquivos (versionados)
- `infra/clickhouse/schema/etl/10_despesa_movimento.sql`
- `infra/clickhouse/schema/etl/11_receita_movimento.sql`
- `infra/clickhouse/schema/etl/12_despesa_orcamento.sql`
- `infra/clickhouse/schema/etl/13_receita_orcamento.sql`
- `infra/clickhouse/tools/run_etl.py` — runner: substitui `simam_raw.`→`raw_<ibge>`, `simam.`→`sim_<ibge>`,
  executa por statement. Uso: `CLICKHOUSE_URL/USER/PASSWORD … python3 run_etl.py <ibge> <arquivo.sql>`.

## Validação (todos os anos, raw × fato)
| Medida | raw (linhas / R$) | fato (linhas / R$) | nota |
|---|---|---|---|
| Empenho 161 | 21.671 / 261.904.926 | 21.671 / 261.904.914 | 100% (Δ R$12 = arred. por-linha) |
| Liquidação 171 | 25.323 / 256.961.601 | 25.133 / 256.027.621 | −0,75% linhas = restos de empenho < 2024 |
| Pagamento 181 | 25.173 / 215.351.653 | 24.738 / 213.430.533 | −1,7% linhas = idem (raw só tem empenho 2024+) |
| Receita líquida | net_raw 258.166.691,19 | net_fato 258.166.691,19 | **exato** |

> A perda em liq/pag é **cobertura de dados** (raw exportou só empenhos 2024-2026; pagamentos de
> restos de anos anteriores não acham o empenho-pai p/ resolver dimensão), não bug. Empenho 100%.

### Consolidado despesa × receita (2024-2026)
| Ano | atualizada | empenhada | paga | prev. líquida | arrecadada |
|---|---|---|---|---|---|
| 2024 | 131,76M | 99,50M | 87,12M | 92,49M | 103,55M |
| 2025 | 133,75M | 107,07M | 90,03M | 107,21M | 108,97M |
| 2026 | 140,12M | 48,65M | 33,56M | 109,68M | 45,65M |

> **Cross-check de equilíbrio LOA:** receita prevista líquida == despesa orçada inicial (111),
> exato em 2024 (92.491.190,38) e 2025 (107.208.951) — confirma os dois ETLs de orçamento.

## Medidas do grupo A: COMPLETAS ✅ (atualizada/empenhada/liquidada/paga · prevista/arrecadada)

## Módulo PLANEJAMENTO (orcamento) — data-driven ✅ (Nova Londrina)
O módulo `orcamento` (tab "Planejamento") é agregação dos fatos — **não precisou de novo ETL raw→sim**.
- **Builder (hop sim→mod):** `infra/clickhouse/tools/build_mod_orcamento.mjs` — lê `sim_<ibge>` (CH),
  resolve nomes de dimensão do raw siscop (órgão/função via `despesa`⋈`niveismodelodespesa` +
  `convertCharset` latin1→utf8; fonte via `fonterecurso`), agrega no shape do snapshot e grava
  `mun_<ibge>.mod_orcamento` no Postgres, **particionado por chave fina** (12 chaves: desp-loa,
  rec-loa, execucao, metas, desp-{funcao,secretaria,fonte,natureza}, rec-{origem-natureza,fonte},
  {desp,rec}-evolucao). Uso: `CLICKHOUSE_* DATABASE_URL node build_mod_orcamento.mjs <ibge> <anos…>`.
- **Frontend:** `lib/demo-orcamento.ts` (tipo `OrcamentoBase` expandido com tabelas/evolução opcionais)
  + `components/orcamento-municipal.tsx` (consts hardcoded viraram `*_DEMO`; componente lê
  `base.<campo> ?? *_DEMO` — data-driven com fallback). Verificado no preview: 2026 receita prevista
  R$120,9M / orçada R$109,7M; tabela por função SAÚDE/EDUCAÇÃO com valores reais; 0 erros.
- **Pendências:** `receitaAlterada` (créditos adicionais receita — `orc_reg_receita_alterada`),
  chaves `rec-entidade`/`rec-origem` (ainda no demo), caption estático "LOA 2024" no card.

## Pendências Fase 1 (próximos)
- [ ] **Lookups de nome** das dimensões (órgão/função/programa/ação/natureza/fonte).
- [ ] **164/165** cancelamento de restos (poucas linhas; empenho de ano anterior).
- [ ] **Lookups de nome** das dimensões (órgão/função/programa/ação/natureza/fonte) — derivar de
  `siscop_despesa`+`niveismodelodespesa` (parse `programatica`) p/ exibir descrições no dashboard.
- [ ] **Hop `sim_` → `mun_`**: agregar os fatos no shape do `DESPESA_SNAPSHOT`/`RECEITA_SNAPSHOT`
  (por chave: `execucao` primeiro) → `mun_<ibge>.mod_despesa`/`mod_receita` (jsonb) via `postgresql()`.
- [ ] Generalizar o runner p/ loop de municípios (ETL único, todos os clientes Elotech).

## Como rodar (reaplicar)
```
export CLICKHOUSE_URL=http://<host>:8123/ CLICKHOUSE_USER=default CLICKHOUSE_PASSWORD=***
python3 infra/clickhouse/tools/run_etl.py 4117107 \
  infra/clickhouse/schema/etl/10_despesa_movimento.sql \
  infra/clickhouse/schema/etl/11_receita_movimento.sql
```
