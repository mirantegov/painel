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
  Stethoscope02Icon,
  Calendar01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";

export function AudienciasSaudeContas() {
  const semestres = [
    {
      periodo: "1º Semestre",
      prazo: "Até 31 de agosto",
      status: "Realizada",
    },
    {
      periodo: "2º Semestre",
      prazo: "Até 28 de fevereiro",
      status: "Pendente",
    },
  ];

  return (
    <div className="flex items-center justify-center py-16">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <HugeiconsIcon
              icon={Stethoscope02Icon}
              strokeWidth={1.5}
              className="size-8"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="text-base px-3 py-1">
              Saúde
            </Badge>
            <Badge variant="secondary">Em breve</Badge>
          </div>
          <CardTitle className="text-2xl mt-2">
            Audiência Pública de Prestação de Contas da Saúde
          </CardTitle>
          <CardDescription className="text-base">
            Apresentação semestral à população e ao Conselho Municipal de Saúde
            sobre a aplicação dos recursos em Ações e Serviços Públicos de Saúde
            (ASPS).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Base legal</span>
              <span className="font-medium">Art. 36 LC 141/2012</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Frequência</span>
              <span className="font-medium">2 vezes ao ano (semestral)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Mínimo aplicado</span>
              <span className="font-medium text-green-600">
                15% da RCL (ASPS)
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Prazos do exercício 2025
            </p>
            {semestres.map((s, i) => (
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
                    <p className="font-medium">{s.periodo}</p>
                    <p className="text-xs text-muted-foreground">{s.prazo}</p>
                  </div>
                </div>
                <Badge
                  variant={s.status === "Realizada" ? "default" : "outline"}
                  className="text-xs"
                >
                  {s.status}
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
            visualizações sobre a aplicação de recursos em saúde.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
