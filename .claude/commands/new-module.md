---
description: Cria um novo módulo governamental completo no dashboard Dash (componente, dados demo e registro em page.tsx)
---

Crie um novo módulo governamental completo no projeto Dash seguindo rigorosamente o padrão dos módulos existentes (ex: `components/frotas.tsx`, `components/obras.tsx`).

## Informações necessárias

Se não fornecidas pelo usuário, pergunte antes de começar:

1. **Nome técnico** (kebab-case) — ex: `meio-ambiente`
2. **Label PT-BR** para o tab — ex: `Meio Ambiente`
3. **Ícone HugeIcons** — ex: `Tree01Icon` (de `@hugeicons/core-free-icons`)
4. **Contexto temático** — quais indicadores/KPIs fazem sentido para o módulo
5. **Posição no TAB_ORDER** — após qual módulo existente deve aparecer

## Passos de implementação

### Passo 1 — Criar dados demo `lib/demo-[nome].ts`

Crie o arquivo com:
- Constantes de KPIs (valores numéricos usados em múltiplos lugares)
- Arrays de dados para cada gráfico (6–12 pontos cada)
- Arrays de dados para tabelas (8–15 registros)
- Tipagem explícita com interfaces TypeScript ou `as const`

Siga o padrão de `lib/demo-legislativo.ts` e `lib/demo-previdencia.ts`.

### Passo 2 — Criar componente `components/[nome].tsx`

O arquivo deve seguir esta estrutura exata, na ordem:

```
"use client"

// 1. Imports React
// 2. Imports shadcn/ui (Badge, Button, Card, Progress, ScrollArea, Separator, Switch, Tabs, Table, Alert, Accordion)
// 3. Imports ChartContainer, ChartTooltip, ChartLegend, ChartConfig de components/ui/chart
// 4. Imports Recharts (Area, AreaChart, Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis, YAxis, Cell, ResponsiveContainer)
// 5. Imports HugeiconsIcon de @hugeicons/react
// 6. Imports ícones de @hugeicons/core-free-icons (incluir Analytics01Icon, BulbIcon, Alert02Icon)
// 7. Imports KpiCard de components/ui/kpi-card
// 8. Imports cn de lib/utils
// 9. Import de lib/demo-[nome] se necessário

// 10. Helpers de formatação (formatCurrency, formatNumber, formatPercent)
// 11. Dados estáticos (alertas, chartConfig, arrays de dados)

// 12. Componente principal exportado
export function NomeModulo() {
  // Estado para filtro de período e aba ativa
  const [periodo, setPeriodo] = React.useState("12m")
  const [abaAtiva, setAbaAtiva] = React.useState("aba1")

  return (
    <div className="space-y-6">
      {/* KPIs — grid de 4 cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard ... /> {/* x4 */}
      </div>

      {/* Gráfico principal */}
      <Card>...</Card>

      {/* Sub-tabs com 5 abas */}
      <Tabs value={abaAtiva} onValueChange={setAbaAtiva}>
        <TabsList className="grid w-full grid-cols-5">...</TabsList>
        <TabsContent value="aba1">...</TabsContent>
        {/* ... */}
      </Tabs>

      {/* ── Análises ── */}
      <Separator />
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <HugeiconsIcon icon={Analytics01Icon} strokeWidth={2} className="size-4" />
        Análises
      </div>

      {/* Análise Inteligente */}
      <Card className="border bg-gradient-to-br from-background to-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={BulbIcon} strokeWidth={2} className="size-5 text-primary" />
            Análise Inteligente
          </CardTitle>
          <CardDescription>Visão geral com dados dinâmicos do período</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">[Parágrafo de visão geral com dados reais]</p>
          <Accordion type="multiple" className="space-y-2">
            <AccordionItem value="destaques">
              <AccordionTrigger>Pontos de Destaque</AccordionTrigger>
              <AccordionContent>...</AccordionContent>
            </AccordionItem>
            <AccordionItem value="atencao">
              <AccordionTrigger>Pontos de Atenção</AccordionTrigger>
              <AccordionContent>...</AccordionContent>
            </AccordionItem>
            <AccordionItem value="recomendacoes">
              <AccordionTrigger>Recomendações Estratégicas</AccordionTrigger>
              <AccordionContent>...</AccordionContent>
            </AccordionItem>
            <AccordionItem value="projecoes">
              <AccordionTrigger>Projeções e Cenários</AccordionTrigger>
              <AccordionContent>...</AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator />
          <p className="text-sm font-medium">[Conclusão da análise]</p>
        </CardContent>
      </Card>

      {/* Resumo Analítico */}
      <Card>
        <CardHeader>...</CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {/* KPIs de desempenho */}
          </div>
        </CardContent>
      </Card>

      {/* Alertas e Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-5" />
            Alertas e Notificações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alertas.map((alerta, i) => (
            <Alert key={i} variant={alerta.tipo === "warning" ? "destructive" : "default"}>
              ...
            </Alert>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
```

**Regras obrigatórias:**
- Todos os ícones via `<HugeiconsIcon icon={X} strokeWidth={2} className="size-4" />`
- Estilização exclusivamente com classes Tailwind CSS v4; usar `cn()` para condicionais
- Gráficos via `<ChartContainer config={chartConfig}>` + componentes Recharts
- Sempre incluir variantes `dark:` nas classes relevantes
- Zero chamadas a APIs externas — apenas dados do `lib/demo-*.ts` ou inline
- Respeitar `components/ui/` — nunca modificar esses arquivos

### Passo 3 — Registrar em `app/page.tsx`

1. Adicionar import: `import { NomeModulo } from "@/components/[nome]"`
2. Adicionar ícone ao import de `@hugeicons/core-free-icons`
3. Inserir `"[nome]"` no `TAB_ORDER` na posição correta
4. Adicionar `<TabsTrigger value="[nome]" className="gap-2">` no `TabsList`
5. Adicionar `<TabsContent value="[nome]"><NomeModulo /></TabsContent>`

### Passo 4 — Verificar

Execute e corrija eventuais erros:
```bash
npm run typecheck
```
