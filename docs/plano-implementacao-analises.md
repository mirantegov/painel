# Plano de Implementação: Seção de Análises nos Módulos Pendentes

## Contexto

Todos os módulos do dashboard possuem uma seção de **Análises** ao final da página, composta por:

1. **Separador visual** com rótulo "Análises"
2. **Análise Inteligente** — card com borda e gradiente, contendo:
   - Visão geral textual com dados dinâmicos
   - Accordion com 4 seções colapsáveis: Pontos de Destaque, Pontos de Atenção, Recomendações Estratégicas, Projeções e Cenários
   - Conclusão da Análise
3. **Resumo Analítico** — card com KPIs de desempenho em grid
4. **Alertas e Notificações** — lista de `<Alert>` com ícones e badges por categoria

Após auditoria dos 18 módulos ativos, foram identificados **4 módulos** sem essa seção:

| Módulo | Arquivo | Estratégia |
|---|---|---|
| Visão Geral | `components/visao-geral.tsx` | Inserir inline (antes dos Alertas existentes) |
| Legislativo | `components/legislativo/legislativo.tsx` | Novo sub-componente + nova aba |
| Previdência | `components/previdencia/previdencia.tsx` | Novo sub-componente + nova aba |
| Saneamento | `components/saneamento/saneamento.tsx` | Novo sub-componente + nova aba |

---

## Módulo 1: Visão Geral

**Arquivo modificado:** `components/visao-geral.tsx`

**Alterações:**
- Adicionar imports: `Separator`, `Accordion*`, `BulbIcon`, `Flag01Icon`, `Alert02Icon`, `ChartLineData02Icon`
- Inserir bloco de Análises entre os KPIs consolidados e o Card de Alertas já existente
- O Card de Alertas já existente serve como seção de "Alertas e Notificações"

**Dados usados:**
- `receita.percentual` — taxa de arrecadação (93.7%)
- `despesa.percentualExecucao` — execução orçamentária (92.0%)
- `prestacaoContas.conformidade` — conformidade CAUC (84.6%)
- `despesa.percentualPessoalRCL` — pessoal/RCL (42%)
- `compras.taxaEconomia` — economia em compras (8.4%)
- `tributacao.inadimplencia` — inadimplência tributária (12.8%)

---

## Módulo 2: Legislativo

**Arquivos:**
- Novo: `components/legislativo/analise-legislativo.tsx`
- Modificado: `components/legislativo/legislativo.tsx`

**Alterações em `legislativo.tsx`:**
- Importar `AnaliseLesgislativo` do novo arquivo
- Importar `Analytics01Icon` de `@hugeicons/core-free-icons`
- Alterar `grid-cols-6` → `grid-cols-7` no `TabsList`
- Adicionar `<TabsTrigger value="analise">` com ícone `Analytics01Icon`
- Adicionar `<TabsContent value="analise">` com `<AnaliseLesgislativo />`

**Dados usados (de `@/lib/demo-legislativo`):**
- `ORCAMENTO_LEGISLATIVO` = R$ 12.000.000
- `DESPESA_EMPENHADA_LEGISLATIVO` = R$ 9.840.000 (82% execução)
- `GASTO_PESSOAL_PORCENTO` = 68.5% (limite legal 70%)
- `DATA_VEREADORES.length` = 17 vereadores
- `QUANTIDADE_DIARIAS` = 127 diárias | `TOTAL_DIARIAS_LEGISLATIVO` = R$ 45.000

---

## Módulo 3: Previdência

**Arquivos:**
- Novo: `components/previdencia/analise-previdencia.tsx`
- Modificado: `components/previdencia/previdencia.tsx`

**Alterações em `previdencia.tsx`:**
- Importar `AnalisePrevidencia` do novo arquivo
- Importar `Analytics01Icon` de `@hugeicons/core-free-icons`
- Alterar `grid-cols-4` → `grid-cols-5` no `TabsList`
- Adicionar `<TabsTrigger value="analise">` com ícone `Analytics01Icon`
- Adicionar `<TabsContent value="analise">` com `<AnalisePrevidencia />`

**Dados usados (de `@/lib/demo-previdencia`):**
- `TOTAL_PARTICIPANTES_ATIVOS` = 1.247 servidores
- `TOTAL_BENEFICIARIOS` = 631 (aposentados + pensionistas + auxílios)
- `RECEITA_TOTAL` = R$ 4.340.000
- `DESPESA_TOTAL` = R$ 5.230.000 (déficit operacional)
- `SALDO_FUNDO` = R$ 45.600.000
- `INDICE_SOLVENCIA` = 86.5% (abaixo do ideal 100%)
- `RENTABILIDADE_ACUMULADA` = 12.5% (acima da meta atuarial de 6.0%)

---

## Módulo 4: Saneamento

**Arquivos:**
- Novo: `components/saneamento/analise-saneamento.tsx`
- Modificado: `components/saneamento/saneamento.tsx`

**Alterações em `saneamento.tsx`:**
- Importar `AnaliseSaneamento` do novo arquivo
- Importar `Analytics01Icon` de `@hugeicons/core-free-icons`
- Alterar `grid-cols-5` → `grid-cols-6` no `TabsList`
- Adicionar `<TabsTrigger value="analise">` com ícone `Analytics01Icon`
- Adicionar `<TabsContent value="analise">` com `<AnaliseSaneamento />`

**Dados usados (de `@/lib/demo-saneamento`):**
- `COBERTURA_AGUA_PCT` = 93.3%
- `COBERTURA_ESGOTO_PCT` = 73.8%
- `INDICE_PERDA_AGUA_PCT` = 32.5% (acima do limite SNIS de 25%)
- `INADIMPLENCIA_PCT` = 18.7%
- `PONTOS_CRITICOS_DRENAGEM` = 14
- `RECEITA_TOTAL_SANEAMENTO` = R$ 8.950.000
- `DESPESA_OPERACIONAL_SANEAMENTO` = R$ 6.320.000

---

## Arquivos alterados / criados

| Ação | Arquivo |
|---|---|
| Modificado | `components/visao-geral.tsx` |
| Criado | `components/legislativo/analise-legislativo.tsx` |
| Modificado | `components/legislativo/legislativo.tsx` |
| Criado | `components/previdencia/analise-previdencia.tsx` |
| Modificado | `components/previdencia/previdencia.tsx` |
| Criado | `components/saneamento/analise-saneamento.tsx` |
| Modificado | `components/saneamento/saneamento.tsx` |
