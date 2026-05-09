"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Analytics01Icon,
  Calendar01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";

export function AudienciasQuadrimestral() {
  const bimestres = [
    { periodo: "1º Quadrimestre", prazo: "Até 31 de maio", status: "Realizada" },
    { periodo: "2º Quadrimestre", prazo: "Até 30 de setembro", status: "Realizada" },
    { periodo: "3º Quadrimestre", prazo: "Até 31 de janeiro", status: "Pendente" },
  ];

  return (
    <div className="flex items-center justify-center py-16">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <HugeiconsIcon
              icon={Analytics01Icon}
              strokeWidth={1.5}
              className="size-8"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="text-base px-3 py-1">
              Quadrimestral
            </Badge>
            <Badge variant="secondary">Em breve</Badge>
          </div>
          <CardTitle className="text-2xl mt-2">
            Audiência Pública Quadrimestral
          </CardTitle>
          <CardDescription className="text-base">
            Prestação de contas quadrimestral da execução orçamentária e
            financeira do município, conforme determinação da Lei de
            Responsabilidade Fiscal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Base legal</span>
              <span className="font-medium">Art. 9º §4º LC 101/2000 (LRF)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Frequência</span>
              <span className="font-medium">3 vezes ao ano</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Prazos do exercício 2025
            </p>
            {bimestres.map((b, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
              >
                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Calendar01Icon}
                    strokeWidth={2}
                    className="size-4 text-muted-foreground"
                  />
                  <div>
                    <p className="font-medium">{b.periodo}</p>
                    <p className="text-xs text-muted-foreground">{b.prazo}</p>
                  </div>
                </div>
                <Badge
                  variant={b.status === "Realizada" ? "default" : "outline"}
                  className="text-xs"
                >
                  {b.status}
                </Badge>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
            <HugeiconsIcon
              icon={InformationCircleIcon}
              strokeWidth={2}
              className="size-4 flex-none"
            />
            O conteúdo desta aba será implementado futuramente com dados e
            visualizações da execução orçamentária quadrimestral.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
