"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Wallet01Icon,
  Analytics01Icon,
  Stethoscope02Icon,
} from "@hugeicons/core-free-icons";
import { AudienciasPlanejamento } from "./audiencias-planejamento";
import { AudienciasQuadrimestral } from "./audiencias-quadrimestral";
import { AudienciasSaudeContas } from "./audiencias-saude-contas";

export function AudienciasPublicas() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Audiências Públicas
        </h2>
        <p className="text-base text-muted-foreground">
          Audiências públicas obrigatórias do Executivo Municipal — PPA, LDO,
          LOA, Prestação de Contas Quadrimestral e Saúde.
        </p>
      </div>

      <Tabs defaultValue="planejamento" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="planejamento" className="gap-2">
            <HugeiconsIcon
              icon={Wallet01Icon}
              strokeWidth={2}
              className="size-4"
            />
            Planejamento
          </TabsTrigger>
          <TabsTrigger value="quadrimestral" className="gap-2">
            <HugeiconsIcon
              icon={Analytics01Icon}
              strokeWidth={2}
              className="size-4"
            />
            Quadrimestral
          </TabsTrigger>
          <TabsTrigger value="saude" className="gap-2">
            <HugeiconsIcon
              icon={Stethoscope02Icon}
              strokeWidth={2}
              className="size-4"
            />
            Saúde
          </TabsTrigger>
        </TabsList>

        <TabsContent value="planejamento">
          <AudienciasPlanejamento />
        </TabsContent>

        <TabsContent value="quadrimestral">
          <AudienciasQuadrimestral />
        </TabsContent>

        <TabsContent value="saude">
          <AudienciasSaudeContas />
        </TabsContent>
      </Tabs>
    </div>
  );
}
