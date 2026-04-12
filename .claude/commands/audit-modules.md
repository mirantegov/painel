---
description: Audita consistência estrutural dos 19 módulos do dashboard, verificando presença de KPIs, gráficos, seção Análises e Alertas
---

Realize uma auditoria completa de consistência estrutural em todos os módulos ativos do dashboard Dash.

## Passo 1 — Obter lista de módulos

Leia `app/page.tsx` e extraia a constante `TAB_ORDER` para obter a lista oficial de módulos ativos.

Mapeie cada valor do `TAB_ORDER` para seu arquivo de componente:
- Módulos simples: `components/[nome].tsx`
- Módulos complexos (com pasta própria): `components/[nome]/[nome].tsx`
  - `legislativo` → `components/legislativo/legislativo.tsx`
  - `orcamento` → `components/orcamento-municipal.tsx` (verificar)
  - `previdencia` → `components/previdencia/previdencia.tsx`
  - `saneamento` → `components/saneamento/saneamento.tsx`

## Passo 2 — Verificar cada módulo

Para cada arquivo de módulo, verifique a presença das seguintes features:

| Feature | Como detectar |
|---|---|
| **KpiCard** | Import de `@/components/ui/kpi-card` + uso de `<KpiCard` |
| **Gráfico principal** | Import de componentes Recharts (`BarChart`, `AreaChart`, `LineChart`, `PieChart`) |
| **Sub-tabs internas** | `<Tabs` dentro do retorno do componente (não conta o tab externo de `page.tsx`) |
| **Seção Análises** | `Separator` seguido de texto `"Análises"` ou label equivalente |
| **Accordion 4 seções** | `<Accordion` com pelo menos 4 `<AccordionItem` |
| **Resumo Analítico** | Card com grid de KPIs numéricos após o Accordion |
| **Alertas** | `<Alert` (de `@/components/ui/alert`) |
| **Dados demo em lib/** | Import de `@/lib/demo-[modulo]` |

## Passo 3 — Gerar relatório

Produza uma tabela Markdown no formato:

```markdown
## Relatório de Auditoria — Módulos Dash
*Gerado em: [data]*

| Módulo | Arquivo | KpiCard | Gráficos | Sub-tabs | Análises | Accordion (4) | Resumo | Alertas | Demo lib/ |
|---|---|---|---|---|---|---|---|---|---|
| visao-geral | visao-geral.tsx | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ |
| ...         | ...             | ...| ...| ...| ...| ...           | ...    | ...     | ...       |
```

Legenda: ✅ presente | ❌ ausente | ⚠️ parcial

## Passo 4 — Identificar pendências

Após a tabela, liste:

### Módulos com seção Análises ausente
> Prioridade alta — consulte `docs/plano-implementacao-analises.md` para o plano de implementação

### Módulos sem KpiCard
> Verificar se usam KPIs em formato alternativo (aceito) ou se estão faltando (pendência)

### Módulos sem dados demo em lib/
> Apenas módulos com datasets grandes precisam de arquivo separado — inline é aceitável para módulos pequenos

## Passo 5 — Sugerir próximos passos

Com base na auditoria, sugira uma ordem de prioridade para resolver as pendências, considerando:
1. Seção Análises ausente → usar comando `/add-analise`
2. Estrutura incompleta (sem KPIs ou gráficos) → investigar manualmente
3. Dados demo ausentes para módulos grandes → usar comando `/add-demo-data`
