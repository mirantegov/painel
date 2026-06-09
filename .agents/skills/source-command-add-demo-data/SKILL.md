---
name: "source-command-add-demo-data"
description: "Cria ou estende um arquivo de dados demo/snapshot em lib/demo-*.ts para um módulo do dashboard"
---

# source-command-add-demo-data

Use this skill when the user asks to run the migrated source command `add-demo-data`.

## Command Template

Crie ou estenda um arquivo de dados demo em `lib/` para o módulo indicado, seguindo o padrão de snapshot serializável servido por `mod_<slug>.dados`.

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
4. Verifique se o módulo já possui entrada em `lib/data/modules.ts` e seed em `scripts/seed-demo.ts`

## Estrutura padrão do arquivo

```ts
// lib/demo-[modulo].ts
// Dados demo do módulo [Nome Módulo].
// Snapshot serializável servido de mod_[slug] (jsonb). Sem funções/JSX.

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

export const [SLUG]_SNAPSHOT = {
  TOTAL_[ENTIDADE_PRINCIPAL],
  SERIE_MENSAL_[NOME],
  DATA_[ENTIDADES],
  DISTRIBUICAO_[NOME],
}
```

## Regras para os dados demo/snapshot

- **Realismo**: valores plausíveis para uma prefeitura de médio porte brasileira (50k–200k habitantes)
- **Consistência**: totais e percentuais devem bater (ex: soma das partes = total)
- **Série temporal**: usar meses em PT-BR (Jan, Fev, Mar, Abr, Mai, Jun, Jul, Ago, Set, Out, Nov, Dez)
- **Cores**: usar `var(--chart-1)` a `var(--chart-5)` para dados visuais
- **Tipagem**: todos os arrays com tipo explícito; evitar `any`
- **Exportações nomeadas**: sem `export default` — apenas `export const` e `export interface`
- **Sem dependências externas**: apenas TypeScript puro, sem imports
- **Serialização**: não incluir funções, JSX, objetos de ícones, classes, symbols, bigint ou valores que `JSON.stringify` descarte
- **Snapshot**: sempre exportar `<SLUG>_SNAPSHOT` reunindo todos os dados usados pela UI

## Exemplo de referência

Consulte `lib/demo-legislativo.ts` para ver o padrão completo de:
- Constantes escalares no topo
- Interfaces antes dos dados
- Arrays de série temporal
- Arrays de entidades com múltiplos campos

## Pós-criação

Se o componente correspondente existir, atualize:

1. Componente simples: `useSnapshot("<slug>", <SLUG>_SNAPSHOT)`
2. Módulo complexo: provider/context no componente principal e sub-tabs consumindo o context
3. `scripts/seed-demo.ts`: `delete/insert` em `mod_<slug>`
4. `lib/data/modules.ts`: allowlist `<slug> → mod_<slug>` se ainda faltar
