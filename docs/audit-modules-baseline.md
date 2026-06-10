# Auditoria de módulos — baseline (Gate.5 / MIR-26)

> Gerado em 2026-06-10 por detecção estrutural (grep de features no componente de
> cada módulo ativo de `lib/modules-config.ts`). É um **baseline** de consistência —
> não um gate bloqueante. Itens ausentes viram backlog de qualidade (E5).

Legenda: ✅ presente · ❌ ausente · ⚠️ parcial · `(n)` = nº de `AccordionItem`.

| Módulo | Arquivo | KpiCard | Gráficos | Sub-tabs | Análises | Accordion(4) | Resumo | Alertas | Demo/Snapshot |
|---|---|---|---|---|---|---|---|---|---|
| visao-geral | visao-geral.tsx | ✅ | ✅ | ❌ | ❌ | ❌(0) | ❌ | ❌ | ✅ |
| despesa | despesa-municipal.tsx | ✅ | ✅ | ✅ | ❌ | ❌(0) | ❌ | ❌ | ✅ |
| receita | receita-municipal.tsx | ✅ | ✅ | ✅ | ❌ | ❌(0) | ❌ | ❌ | ✅ |
| financeiro | financeiro-municipal.tsx | ✅ | ✅ | ✅ | ✅ | ❌(0) | ❌ | ✅ | ✅ |
| tributacao | tributacao-municipal.tsx | ✅ | ✅ | ✅ | ❌ | ❌(0) | ❌ | ✅ | ✅ |
| orcamento | orcamento-municipal.tsx | ✅ | ✅ | ❌ | ❌ | ❌(0) | ❌ | ❌ | ✅ |
| prestacao-contas | prestacao-contas.tsx | ✅ | ✅ | ✅ | ✅ | ⚠️(1) | ❌ | ✅ | ✅ |
| compras | compras-municipais.tsx | ✅ | ✅ | ✅ | ✅ | ❌(0) | ❌ | ❌ | ✅ |
| rh | rh-municipal.tsx | ✅ | ✅ | ✅ | ✅ | ⚠️(2) | ❌ | ✅ | ✅ |
| licitacoes-painel | licitacoes-painel.tsx | ❌ | ❌ | ❌ | ❌ | ❌(0) | ❌ | ❌ | ✅ |
| saude | saude.tsx | ✅ | ✅ | ✅ | ❌ | ❌(0) | ❌ | ✅ | ✅ |
| educacao | educacao.tsx | ✅ | ✅ | ✅ | ✅ | ❌(0) | ❌ | ✅ | ✅ |
| assistencia-social | assistencia-social.tsx | ✅ | ✅ | ✅ | ❌ | ❌(0) | ❌ | ✅ | ✅ |
| defesa-civil | defesa-civil.tsx | ✅ | ✅ | ✅ | ✅ | ❌(0) | ❌ | ✅ | ✅ |
| obras | obras.tsx | ✅ | ✅ | ✅ | ✅ | ❌(0) | ❌ | ❌ | ✅ |
| frotas | frotas.tsx | ✅ | ✅ | ✅ | ❌ | ❌(0) | ❌ | ❌ | ✅ |
| patrimonio | patrimonio.tsx | ✅ | ✅ | ✅ | ❌ | ❌(0) | ❌ | ✅ | ✅ |
| processos | processos.tsx | ✅ | ✅ | ❌ | ✅ | ❌(0) | ❌ | ❌ | ✅ |
| previdencia | previdencia/previdencia.tsx | ⚠️ | ⚠️ | ✅ | ❌ | ❌(0) | ❌ | ❌ | ✅ |
| saneamento | saneamento/saneamento.tsx | ⚠️ | ⚠️ | ✅ | ❌ | ❌(0) | ❌ | ❌ | ✅ |
| legislativo | legislativo/legislativo.tsx | ⚠️ | ⚠️ | ✅ | ❌ | ❌(0) | ❌ | ❌ | ✅ |

**Totais:** KpiCard 17/21 · Gráficos 17/21 · Sub-tabs 17/21 · Análises 8/21 · Resumo Analítico 0/21 · Alertas 9/21 · **Demo/Snapshot 21/21 ✅**.

## Caveats da detecção

- **Módulos complexos** (`previdencia`, `saneamento`, `legislativo`): a detecção roda no
  arquivo de topo, mas KPIs/gráficos vivem nos **sub-componentes** dessas pastas →
  marcados ⚠️ (têm as features, em arquivos filhos). Não são pendência real de KPI/gráfico.
- **`licitacoes-painel`**: painel executivo baseado em **tabela/lista** (sem KpiCard/Recharts
  por design) — layout alternativo aceito.
- **Demo/Snapshot 21/21**: todos os módulos têm fallback (`useSnapshot`/`lib/demo-*`) —
  consistência da camada de dados OK.

## Pendências de qualidade (backlog E5 — não bloqueiam o Gate)

- **Seção "Análises" ausente (13)**: visao-geral, despesa, receita, tributacao, orcamento,
  saude, assistencia-social, frotas, patrimonio (+ os 3 complexos e licitacoes). Usar `/add-analise`.
- **"Resumo Analítico" 0/21**: padrão ainda não adotado em nenhum módulo — decidir se entra no padrão.
- **Alertas ausentes (12)**: avaliar caso a caso (nem todo módulo precisa de `<Alert>`).

> Este baseline serve de referência para o **E5 (qualidade dos módulos)**. O Gate apenas
> registra o estado atual; a evolução é incremental e não bloqueia a fase de VPS/pipeline.
