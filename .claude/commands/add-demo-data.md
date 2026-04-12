---
description: Cria ou estende um arquivo de dados demo em lib/demo-*.ts para um módulo do dashboard
---

Crie ou estende um arquivo de dados mock em `lib/` para o módulo indicado, seguindo o padrão dos arquivos existentes (`lib/demo-legislativo.ts`, `lib/demo-previdencia.ts`, `lib/demo-saneamento.ts`).

## Informações necessárias

Se não fornecidas pelo usuário, pergunte:
1. **Módulo de destino** — ex: `meio-ambiente` → gerará `lib/demo-meio-ambiente.ts`
2. **Entidades principais** — quais objetos/indicadores o módulo gerencia (ex: "licenças ambientais, áreas verdes, resíduos sólidos")
3. **Finalidade** — dados para quais seções? (KPIs, gráficos de série temporal, tabelas, análises)

## Diagnóstico inicial

Antes de criar:
1. Verifique se `lib/demo-[modulo].ts` já existe — se sim, pergunte se é para estender ou substituir
2. Leia o componente `components/[modulo].tsx` (ou equivalente) para entender quais dados são esperados
3. Identifique as exportações que o componente já importa de `lib/`

## Estrutura padrão do arquivo

```ts
// lib/demo-[modulo].ts
// Dados mock para o módulo [Nome Módulo]

// ─── Constantes de KPIs ────────────────────────────────────────────────────
export const TOTAL_[ENTIDADE_PRINCIPAL] = 0
export const PERCENTUAL_[INDICADOR] = 0.0
// ... outras constantes escalares

// ─── Interfaces ───────────────────────────────────────────────────────────
export interface [Entidade] {
  id: number
  nome: string
  // ... campos relevantes
}

// ─── Dados de série temporal (para gráficos de linha/área/barra) ──────────
export const SERIE_MENSAL_[NOME]: { mes: string; [campo]: number }[] = [
  { mes: "Jan", [campo]: 0 },
  // ... 12 meses
]

// ─── Dados tabulares ──────────────────────────────────────────────────────
export const DATA_[ENTIDADES]: [Entidade][] = [
  // ... 8–15 registros realistas para uma prefeitura média brasileira
]

// ─── Dados para gráficos de distribuição (pie/donut) ─────────────────────
export const DISTRIBUICAO_[NOME]: { categoria: string; valor: number; fill: string }[] = [
  { categoria: "...", valor: 0, fill: "var(--chart-1)" },
  // ...
]
```

## Regras para os dados mock

- **Realismo**: valores plausíveis para uma prefeitura de médio porte brasileira (50k–200k habitantes)
- **Consistência**: totais e percentuais devem bater (ex: soma das partes = total)
- **Série temporal**: usar meses em PT-BR (Jan, Fev, Mar, Abr, Mai, Jun, Jul, Ago, Set, Out, Nov, Dez)
- **Cores**: usar `var(--chart-1)` a `var(--chart-5)` para dados visuais
- **Tipagem**: todos os arrays com tipo explícito; evitar `any`
- **Exportações nomeadas**: sem `export default` — apenas `export const` e `export interface`
- **Sem dependências externas**: apenas TypeScript puro, sem imports

## Exemplo de referência

Consulte `lib/demo-legislativo.ts` para ver o padrão completo de:
- Constantes escalares no topo
- Interfaces antes dos dados
- Arrays de série temporal
- Arrays de entidades com múltiplos campos

## Pós-criação

Se o componente correspondente existir, verifique se os imports em `components/[modulo].tsx` (ou equivalente) precisam ser atualizados para usar as novas exportações.
