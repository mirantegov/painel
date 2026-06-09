# Baseline · Auditoria de Módulos — Mirante Painel

*Gerado em: 2026-06-09 · Fonte: skill `source-command-audit-modules` · Branch: `govtech42/istanbul` · Commit base: `c6ab4dd`*

Este relatório congela o estado estrutural dos 21 módulos do dashboard no fechamento do gate MIR-3 (long-tail completo). Vira referência anti-regressão para mudanças subsequentes (Épicos 1–11 do plano VPS Pipeline v2.x).

Legenda: ✅ presente · ❌ ausente · ⚠️ parcial · ✱ via sub-componentes (módulo complexo) · § via `snapshot-context`

## Mapeamento módulo → arquivo

| Módulo (slug) | Arquivo principal |
|---|---|
| visao-geral | `components/visao-geral.tsx` |
| despesa | `components/despesa-municipal.tsx` |
| receita | `components/receita-municipal.tsx` |
| financeiro | `components/financeiro-municipal.tsx` |
| tributacao | `components/tributacao-municipal.tsx` |
| orcamento | `components/orcamento-municipal.tsx` |
| prestacao-contas | `components/prestacao-contas.tsx` |
| compras | `components/compras-municipais.tsx` |
| rh | `components/rh-municipal.tsx` |
| saude | `components/saude.tsx` |
| educacao | `components/educacao.tsx` |
| assistencia-social | `components/assistencia-social.tsx` |
| defesa-civil | `components/defesa-civil.tsx` |
| obras | `components/obras.tsx` |
| frotas | `components/frotas.tsx` |
| patrimonio | `components/patrimonio.tsx` |
| processos | `components/processos.tsx` |
| previdencia | `components/previdencia/previdencia.tsx` |
| saneamento | `components/saneamento/saneamento.tsx` |
| legislativo | `components/legislativo/legislativo.tsx` |
| licitacoes-painel | `components/licitacoes-painel.tsx` |

## Tabela de features

| Módulo | KpiCard | Gráficos | Sub-tabs | Análises | Accordion (4) | Resumo | Alertas | Demo lib/ | Snapshot |
|---|---|---|---|---|---|---|---|---|---|
| visao-geral | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| despesa | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| receita | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| financeiro | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| tributacao | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| orcamento | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| prestacao-contas | ✅ | ✅ | ✅ | ❌ | ✅ | ⚠️ | ✅ | ✅ | ✅ |
| compras | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| rh | ✅ | ✅ | ✅ | ❌ | ✅ | ⚠️ | ✅ | ✅ | ✅ |
| saude | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| educacao | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ |
| assistencia-social | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| defesa-civil | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| obras | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| frotas | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| patrimonio | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| processos | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| previdencia | ✱ | ✱ | ✅ | ⚠️✱ | ❌ | ❌ | ❌ | § | ✅ |
| saneamento | ✱ | ✱ | ✅ | ❌ | ❌ | ❌ | ✱ | § | ✅ |
| legislativo | ✱ | ✱ | ✅ | ❌ | ❌ | ❌ | ❌ | § | ✅ |
| licitacoes-painel | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |

## Métricas agregadas

| Feature | Cobertura | Observação |
|---|---|---|
| KpiCard | 20/21 (95%) | `licitacoes-painel` é painel especializado, não usa padrão de KPIs |
| Gráficos Recharts | 20/21 (95%) | idem |
| Sub-tabs internas | 17/21 (81%) | módulos simples (visao-geral, orcamento, processos, licitacoes-painel) não exigem |
| Seção Análises (separator + título) | 1/21 (5%) | **pendência alta** — só `educacao` segue o padrão |
| Accordion 4 seções | 2/21 (10%) | `prestacao-contas` e `rh` — padrão antigo |
| Resumo Analítico (grid pós-Accordion) | 0/21 (0%) | parcial em `prestacao-contas`/`rh` |
| Alertas (`<Alert>`) | 10/21 (48%) | distribuição irregular |
| Dados demo (`lib/demo-*.ts`) | 21/21 (100%) | módulos complexos via `snapshot-context.tsx` |
| Snapshot (`useSnapshot(...)`) | 21/21 (100%) | **critério crítico do gate atingido** |

## Pendências identificadas (não bloqueiam o gate)

Estas pendências são **estruturais** e ficam para épicos pós-VPS, não para o gate atual.

### 1. Seção Análises ausente em 20 módulos
Apenas `educacao` segue o padrão `Separator + "Análises"` documentado no template. Para padronizar, usar skill `add-analise` em cada módulo. Prioridade: módulos de entrega (`DEFAULT_ENABLED_MODULE_IDS`) primeiro.

### 2. Accordion 4 seções + Resumo Analítico ausente em 19 módulos
Apenas `prestacao-contas` e `rh` têm Accordion (com Resumo parcial). Padrão histórico — não bloqueante.

### 3. Alertas ausente em 11 módulos
Implementar `<Alert>` em: visao-geral, despesa, receita, orcamento, compras, obras, frotas, processos, previdencia (main), legislativo (main), licitacoes-painel.

### 4. `licitacoes-painel` sem KpiCard/Gráficos
Por desenho — é painel especializado com card list. Aceito como exceção; documentar no módulo.

## Critério de aceite MIR-3 — status

| Critério | Status |
|---|---|
| `main` com 21/21 módulos lendo snapshot | ✅ |
| audit-modules sem regressão (este relatório vira baseline) | ✅ |
| Working tree limpo após commits do gate | (verificar pós-PR) |

## Próximos passos sugeridos

1. Pós-merge gate: rodar `add-analise` em batches (E5 do plano)
2. Padronizar `<Alert>` em módulos default-enabled (parte do E5)
3. Manter este baseline atualizado a cada PR que altere estrutura de módulo
