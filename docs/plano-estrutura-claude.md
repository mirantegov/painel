# Estrutura `.claude/` — Dash Municipal Dashboard

Plano completo para a pasta `.claude/` do projeto Dash, otimizada para uso com Claude Code CLI + Windsurf IDE, cobrindo automação de tarefas recorrentes, proteção de arquivos críticos e padronização entre os 19 módulos.

---

## Estrutura de Arquivos

```
.claude/
├── settings.json                  # Permissões, regras e hooks do Claude Code
├── commands/
│   ├── new-module.md              # /new-module — Cria módulo completo do zero
│   ├── add-analise.md             # /add-analise — Adiciona seção Análises a módulo existente
│   ├── add-demo-data.md           # /add-demo-data — Cria/estende lib/demo-*.ts
│   ├── audit-modules.md           # /audit-modules — Audita consistência dos 19 módulos
│   └── quality-check.md           # /quality-check — Typecheck + lint + format
└── hooks/
    └── guard-ui-components.sh     # Avisa quando components/ui/ é modificado
```

---

## Detalhamento dos Arquivos

### `settings.json`
Configurações centrais do Claude Code para o projeto:
- **`permissions.allow`**: comandos npm seguros (`npm run dev`, `build`, `lint`, `typecheck`, `format`, `docker compose`)
- **`permissions.deny`**: operações destrutivas (`rm -rf`, `git push --force`, `git reset --hard`)
- **`hooks.PostToolUse`**: aciona `guard-ui-components.sh` após qualquer Write/Edit/MultiEdit para detectar modificações em `components/ui/`

### `commands/new-module.md` → `/new-module`
Comando guiado para criar um módulo governamental completo:
1. Solicita: nome do módulo (ex: `meio-ambiente`), label PT-BR, ícone HugeIcons, cor do tema
2. Cria `components/[nome].tsx` com estrutura padrão: 4× `KpiCard`, gráficos Recharts, `<Tabs>` internas (5 sub-abas), seção `Análises` completa, `Alertas`
3. Cria `lib/demo-[nome].ts` com dados mock estruturados
4. Adiciona `<TabsTrigger>` + `<TabsContent>` em `app/page.tsx` na posição correta do `TAB_ORDER`
5. Verifica com `npm run typecheck`

### `commands/add-analise.md` → `/add-analise`
Implementa a seção Análises em módulos existentes (padrão documentado em `docs/plano-implementacao-analises.md`):
1. Solicita: nome do módulo-alvo
2. Identifica estratégia: inline (módulo simples) ou novo sub-componente + nova aba (módulos com `<Tabs>` internas)
3. Adiciona: `Separator` → `AnaliseInteligente` (card + `Accordion` 4 seções) → `ResumoAnalitico` (grid de KPIs) → `Alertas`
4. Para módulos complexos: cria `components/[modulo]/analise-[modulo].tsx`, atualiza `grid-cols-N` no `TabsList`

### `commands/add-demo-data.md` → `/add-demo-data`
Cria ou estende arquivos de dados demo:
1. Solicita: módulo de destino, entidades principais
2. Gera `lib/demo-[modulo].ts` com: constantes de KPIs, arrays de dados para gráficos, dados de tabelas, todos tipados com `as const` ou interfaces TypeScript
3. Exporta no padrão dos arquivos existentes (`demo-legislativo.ts`, `demo-previdencia.ts`)

### `commands/audit-modules.md` → `/audit-modules`
Auditoria de consistência estrutural:
1. Lê `app/page.tsx` para obter lista de módulos do `TAB_ORDER`
2. Para cada módulo, verifica presença de: seção Análises, `KpiCard`, `Separator`, `Accordion`, `Alert`
3. Produz tabela Markdown: módulo × feature × status (✅/❌)
4. Identifica módulos pendentes (como os 4 do `docs/plano-implementacao-analises.md`)

### `commands/quality-check.md` → `/quality-check`
Pipeline de qualidade em sequência:
1. `npm run typecheck` — captura erros TypeScript
2. `npm run lint` — ESLint
3. `npm run format` — Prettier (`.ts`/`.tsx`)
4. Exibe resumo com contagem de erros por etapa

### `hooks/guard-ui-components.sh`
Script PostToolUse que:
- Detecta se o arquivo editado está em `components/ui/`
- Emite aviso no stderr: `⚠️ ATENÇÃO: components/ui/ contém primitivos shadcn — não modifique sem necessidade explícita`
- Não bloqueia a operação (apenas alerta)

---

## Regras de Projeto (complementam o CLAUDE.md)

As seguintes regras serão referenciadas nos comandos e no `settings.json`:

| Área | Regra |
|---|---|
| `components/ui/` | Nunca modificar — são primitivos shadcn/ui |
| Dados | Sempre mock/estático — zero chamadas de API reais |
| Ícones | Exclusivamente `@hugeicons/react` + `@hugeicons/core-free-icons` |
| Estilização | Tailwind CSS v4 + `cn()` de `lib/utils.ts` |
| Gráficos | Recharts via wrapper `components/ui/chart.tsx` |
| Tema | Sempre incluir variantes `dark:` |
| Imports | Sempre no topo do arquivo |
| Módulos novos | Devem seguir estrutura dos existentes (KPIs → Gráficos → Sub-tabs → Análises → Alertas) |

---

## Prioridade de Implementação

1. `settings.json` — base para tudo
2. `hooks/guard-ui-components.sh` — proteção imediata
3. `commands/new-module.md` — maior impacto no fluxo de desenvolvimento
4. `commands/add-analise.md` — resolve pendências documentadas
5. `commands/audit-modules.md` + `commands/quality-check.md` — manutenção
6. `commands/add-demo-data.md` — suporte aos demais comandos
