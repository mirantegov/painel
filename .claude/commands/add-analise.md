---
description: Adiciona a seção padrão de Análises (Análise Inteligente + Resumo Analítico + Alertas) a um módulo existente
---

Adicione a seção de **Análises** ao módulo indicado, seguindo o padrão já implementado nos demais módulos do dashboard Dash.

Consulte `docs/plano-implementacao-analises.md` para histórico dos módulos já tratados.

## Informações necessárias

Se não fornecidas pelo usuário, pergunte:
1. **Nome do módulo-alvo** — ex: `visao-geral`, `legislativo`, `previdencia`
2. **Arquivo principal** — ex: `components/visao-geral.tsx` ou `components/legislativo/legislativo.tsx`

## Diagnóstico inicial

Antes de implementar:
1. Leia o arquivo do módulo-alvo
2. Verifique se já existe `Separator` + `"Análises"` + `Accordion` → se sim, informe o usuário e pare
3. Identifique a estratégia correta:

| Critério | Estratégia |
|---|---|
| Módulo simples (arquivo único, sem sub-tabs complexas) | **Inline** — inserir diretamente no arquivo |
| Módulo complexo (pasta própria, sub-tabs com `<Tabs>` internas) | **Sub-componente** — criar novo arquivo + nova aba |

## Estratégia A — Inline (módulos simples)

### Imports a adicionar (se ausentes)
```tsx
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Analytics01Icon, BulbIcon, Alert02Icon, ChartLineData02Icon } from "@hugeicons/core-free-icons"
```

### Bloco a inserir — antes da seção de Alertas já existente (ou no final do JSX principal)
```tsx
{/* ── Análises ── */}
<Separator />
<div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
  <HugeiconsIcon icon={Analytics01Icon} strokeWidth={2} className="size-4" />
  Análises
</div>

<Card className="border bg-gradient-to-br from-background to-muted/30">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <HugeiconsIcon icon={BulbIcon} strokeWidth={2} className="size-5 text-primary" />
      Análise Inteligente
    </CardTitle>
    <CardDescription>Síntese executiva baseada nos indicadores do módulo</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <p className="text-sm text-muted-foreground">
      {/* Parágrafo de visão geral usando dados reais do módulo */}
    </p>
    <Accordion type="multiple" className="space-y-2">
      <AccordionItem value="destaques">
        <AccordionTrigger className="text-sm font-medium">Pontos de Destaque</AccordionTrigger>
        <AccordionContent className="space-y-2 text-sm text-muted-foreground">
          {/* Lista de pontos positivos com dados numéricos do módulo */}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="atencao">
        <AccordionTrigger className="text-sm font-medium">Pontos de Atenção</AccordionTrigger>
        <AccordionContent className="space-y-2 text-sm text-muted-foreground">
          {/* Lista de riscos ou desvios identificados */}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="recomendacoes">
        <AccordionTrigger className="text-sm font-medium">Recomendações Estratégicas</AccordionTrigger>
        <AccordionContent className="space-y-2 text-sm text-muted-foreground">
          {/* Ações concretas com responsável e prazo sugerido */}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="projecoes">
        <AccordionTrigger className="text-sm font-medium">Projeções e Cenários</AccordionTrigger>
        <AccordionContent className="space-y-2 text-sm text-muted-foreground">
          {/* Cenário otimista / base / pessimista */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    <Separator />
    <p className="text-sm font-medium">
      {/* Conclusão executiva de 1–2 frases */}
    </p>
  </CardContent>
</Card>

{/* Resumo Analítico */}
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <HugeiconsIcon icon={ChartLineData02Icon} strokeWidth={2} className="size-5" />
      Resumo Analítico
    </CardTitle>
    <CardDescription>Indicadores-chave de desempenho do módulo</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {/* 4–8 cards de KPI com label + valor + variação */}
    </div>
  </CardContent>
</Card>
```

## Estratégia B — Sub-componente (módulos complexos)

### 1. Criar `components/[modulo]/analise-[modulo].tsx`

Estrutura do arquivo:
```tsx
"use client"

import * as React from "react"
// imports shadcn/ui, recharts, hugeicons, KpiCard, cn
// import dados de @/lib/demo-[modulo] se disponível

export function Analise[Modulo]() {
  return (
    <div className="space-y-6">
      {/* Análise Inteligente (Card + Accordion 4 seções) */}
      {/* Resumo Analítico (grid de KPIs) */}
      {/* Alertas e Notificações (lista de <Alert>) */}
    </div>
  )
}
```

### 2. Modificar `components/[modulo]/[modulo].tsx`

a) Adicionar import do novo componente
b) Adicionar import de `Analytics01Icon`
c) Aumentar `grid-cols-N` → `grid-cols-{N+1}` no `<TabsList>`
d) Inserir novo `<TabsTrigger value="analise" className="gap-2">` com ícone
e) Inserir `<TabsContent value="analise"><Analise[Modulo] /></TabsContent>`

## Conteúdo das Análises

Ao escrever o conteúdo, use dados reais do módulo:
- Referencie constantes e valores do `lib/demo-*.ts` ou dados inline do componente
- Cada seção do Accordion deve ter 3–5 itens com números concretos
- Alertas devem ter `tipo: "success" | "info" | "warning" | "destructive"`, `badge` (categoria) e `descricao`

## Verificação final

```bash
npm run typecheck
```
