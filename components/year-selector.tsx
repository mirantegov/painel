"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar01Icon } from "@hugeicons/core-free-icons";
import { useYear } from "@/components/year-provider";

export function YearSelector() {
  const { ano, setAno, anos } = useYear();
  return (
    <Select value={String(ano)} onValueChange={(v) => setAno(Number(v))}>
      <SelectTrigger className="w-[110px]" aria-label="Ano de referência">
        <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} className="size-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {anos.map((a) => (
          <SelectItem key={a} value={String(a)}>
            {a}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
