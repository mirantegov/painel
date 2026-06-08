"use client";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { RefreshIcon } from "@hugeicons/core-free-icons";
import { YearSelector } from "@/components/year-selector";
import { useYear } from "@/components/year-provider";

/**
 * Faixa padrão de cabeçalho de módulo, abaixo do menu principal:
 * título + subtítulo (esquerda) · seletor de ano + refresh (direita).
 */
export function ModuleHeader({
  titulo,
  subtitulo,
}: {
  titulo: string;
  subtitulo: string;
}) {
  const { refresh } = useYear();
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-foreground">{titulo}</h2>
        <p className="text-sm text-muted-foreground">{subtitulo}</p>
      </div>
      <div className="flex items-center gap-2">
        <YearSelector />
        <Button
          variant="outline"
          size="icon"
          className="size-9"
          aria-label="Atualizar dados"
          onClick={refresh}
        >
          <HugeiconsIcon icon={RefreshIcon} strokeWidth={2} className="size-4" />
        </Button>
      </div>
    </div>
  );
}
