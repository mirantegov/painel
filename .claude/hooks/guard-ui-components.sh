#!/bin/bash
# PostToolUse hook: warn when files inside components/ui/ are modified.
# Claude Code passes tool input via stdin as JSON.

INPUT=$(cat)

if echo "$INPUT" | grep -qE '"(file_path|path)"\s*:\s*"[^"]*components/ui/'; then
  echo "" >&2
  echo "⚠️  ATENÇÃO — components/ui/ contém primitivos shadcn/ui" >&2
  echo "   Estes arquivos NÃO devem ser modificados sem necessidade explícita e documentada." >&2
  echo "   Se precisar customizar comportamento, prefira wrappers ou variantes via Tailwind." >&2
  echo "" >&2
fi
