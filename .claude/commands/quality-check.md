---
description: Executa o pipeline completo de qualidade do projeto (typecheck → lint → format) e reporta os resultados
---

Execute o pipeline de qualidade do projeto Dash na seguinte sequência e reporte os resultados consolidados.

## Passo 1 — TypeScript

```bash
npm run typecheck
```

Analise a saída:
- Registre o número de erros encontrados
- Se houver erros, liste os arquivos afetados e os tipos de erro mais frequentes
- Erros em `components/ui/` devem ser apenas mencionados, **nunca corrigidos diretamente**

## Passo 2 — ESLint

```bash
npm run lint
```

Analise a saída:
- Registre warnings e errors separadamente
- Identifique regras violadas mais frequentes
- Note se há problemas em arquivos críticos (`app/page.tsx`, `middleware.ts`)

## Passo 3 — Prettier (formato)

```bash
npm run format
```

Este comando aplica formatação automaticamente. Note quais arquivos foram alterados.

## Passo 4 — Relatório consolidado

Produza um resumo no formato:

```
## Resultado — Quality Check
*Executado em: [data/hora]*

### TypeScript
- Status: ✅ OK | ⚠️ N warnings | ❌ N errors
- Arquivos com erros: [lista se houver]

### ESLint
- Status: ✅ OK | ⚠️ N warnings | ❌ N errors
- Regras mais violadas: [lista se houver]

### Prettier
- Status: ✅ OK | 🔧 N arquivos formatados
- Arquivos alterados: [lista se houver]

### Próximos passos recomendados
[Lista de ações prioritárias, se houver pendências]
```

## Notas importantes

- `next.config.mjs` tem `ignoreBuildErrors: true` — TypeScript errors não impedem o build, mas **devem** ser corrigidos
- Para erros TypeScript em módulos de feature (`components/*.tsx`), corrija diretamente
- Para erros em `components/ui/`, consulte o usuário antes de qualquer modificação
- O comando `format` altera arquivos no disco — isso é esperado e desejado
