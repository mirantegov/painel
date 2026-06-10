# Auditoria de módulos — baseline (Gate.5 / MIR-26)

> Gerado por `scripts/audit-modules.mjs` (folder-aware) a partir de `lib/modules-config.ts`.
> Regenerar: `node scripts/audit-modules.mjs --write`. Invariante (CI): `--check`.
> É um **baseline** de consistência, não um gate bloqueante (salvo o invariante de snapshot).

Legenda: ✅ presente · ❌ ausente · ⚠️ parcial · `— (alt)` layout alternativo aceito · `(n)` nº de AccordionItem.
Detecção **agrega todos os `.tsx` da pasta** do módulo (módulos complexos não são subreportados).

*Gerado em: 2026-06-10*

| Módulo | Arq. | Ativo | KpiCard | Gráficos | Sub-tabs | Análises | Accordion | Resumo | Alertas | Snapshot |
|---|---|---|---|---|---|---|---|---|---|---|
| visao-geral | 1 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌(0) | ❌ | ❌ | ✅ |
| despesa | 1 | ✅ | ✅ | ✅ | ✅ | ❌ | ❌(0) | ❌ | ❌ | ✅ |
| receita | 1 | ✅ | ✅ | ✅ | ✅ | ❌ | ❌(0) | ❌ | ❌ | ✅ |
| financeiro | 1 | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌(0) | ❌ | ✅ | ✅ |
| tributacao | 1 | ✅ | ✅ | ✅ | ✅ | ❌ | ❌(0) | ❌ | ✅ | ✅ |
| orcamento | 1 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌(0) | ❌ | ❌ | ✅ |
| prestacao-contas | 1 | ✅ | ✅ | ✅ | ✅ | ⚠️ | ⚠️(1) | ❌ | ✅ | ✅ |
| compras | 1 | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌(0) | ❌ | ❌ | ✅ |
| rh | 1 | ✅ | ✅ | ✅ | ✅ | ⚠️ | ⚠️(2) | ❌ | ✅ | ✅ |
| saude | 1 | — | ✅ | ✅ | ✅ | ❌ | ❌(0) | ❌ | ✅ | ✅ |
| educacao | 1 | — | ✅ | ✅ | ✅ | ⚠️ | ❌(0) | ❌ | ✅ | ✅ |
| assistencia-social | 1 | — | ✅ | ✅ | ✅ | ❌ | ❌(0) | ❌ | ✅ | ✅ |
| defesa-civil | 1 | — | ✅ | ✅ | ✅ | ⚠️ | ❌(0) | ❌ | ✅ | ✅ |
| obras | 1 | — | ✅ | ✅ | ✅ | ⚠️ | ❌(0) | ❌ | ❌ | ✅ |
| frotas | 1 | — | ✅ | ✅ | ✅ | ❌ | ❌(0) | ❌ | ❌ | ✅ |
| patrimonio | 1 | — | ✅ | ✅ | ✅ | ❌ | ❌(0) | ❌ | ✅ | ✅ |
| processos | 1 | — | ✅ | ✅ | ❌ | ⚠️ | ❌(0) | ❌ | ❌ | ✅ |
| previdencia | 6 | — | ✅ | ✅ | ✅ | ⚠️ | ❌(0) | ❌ | ❌ | ✅ |
| saneamento | 7 | — | ✅ | ✅ | ✅ | ❌ | ❌(0) | ❌ | ✅ | ✅ |
| legislativo | 8 | — | ✅ | ✅ | ✅ | ❌ | ❌(0) | ❌ | ❌ | ✅ |
| licitacoes-painel | 1 | ✅ | — *(alt)* | — *(alt)* | ❌ | ❌ | ❌(0) | ❌ | ❌ | ✅ |

**Totais (21 módulos ativos):** Snapshot 21/21 · KpiCard 20/21 · Gráficos 20/21 · Sub-tabs 17/21 · Análises(seção) 0/21 · Resumo 0/21 · Alertas 10/21.

## Como ler

- **Snapshot** é o **invariante** (camada de dados): todo módulo ativo deve ter `useSnapshot`/`lib/demo-*`. Protegido por `--check` no CI.
- **Layouts alternativos aceitos** (`— (alt)`): `licitacoes-painel` (tabela executiva). Não contam como pendência de KPI/gráfico.
- **Análises**: ✅ = seção padrão (`Análise Inteligente`, via `/add-analise`); ⚠️ = só menção avulsa de "Análise"; ❌ = ausente.

## Backlog de qualidade (E5 — não bloqueia a fase de pipeline)

- **Seção "Análises" padrão ausente:** visao-geral, despesa, receita, financeiro, tributacao, orcamento, prestacao-contas, compras, rh, saude, educacao, assistencia-social, defesa-civil, obras, frotas, patrimonio, processos, previdencia, saneamento, legislativo. Usar `/add-analise`.
- **"Resumo Analítico"**: padrão ainda não adotado (0/21) — decidir se entra no design.
- **Alertas**: avaliar caso a caso (nem todo módulo precisa de `<Alert>`).
