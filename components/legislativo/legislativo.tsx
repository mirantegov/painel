"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Vereadores } from "./vereadores";
import { Sessoes } from "./sessoes";
import { Proposituras } from "./proposituras";
import { Comissoes } from "./comissoes";
import { Presencas } from "./presencas";
import { DespesasLegislativo } from "./despesas-legislativo";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserMultipleIcon,
  CalendarIcon,
  FileValidationIcon,
  ShieldIcon,
  UserCheckIcon,
  InvoiceIcon,
} from "@hugeicons/core-free-icons";

export function Legislativo() {
  const [activeTab, setActiveTab] = useState("vereadores");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Legislativo Municipal
          </h1>
          <p className="text-muted-foreground mt-1">
            Câmara Municipal - Gestão 2025-2028
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          9 Vereadores
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 h-auto p-1 bg-muted/50 rounded-lg">
          <TabsTrigger
            value="vereadores"
            className="flex items-center gap-2 py-2.5"
          >
            <HugeiconsIcon icon={UserMultipleIcon} className="h-4 w-4" />
            <span className="hidden sm:inline">Vereadores</span>
          </TabsTrigger>
          <TabsTrigger
            value="sessoes"
            className="flex items-center gap-2 py-2.5"
          >
            <HugeiconsIcon icon={CalendarIcon} className="h-4 w-4" />
            <span className="hidden sm:inline">Sessões</span>
          </TabsTrigger>
          <TabsTrigger
            value="proposituras"
            className="flex items-center gap-2 py-2.5"
          >
            <HugeiconsIcon icon={FileValidationIcon} className="h-4 w-4" />
            <span className="hidden sm:inline">Proposituras</span>
          </TabsTrigger>
          <TabsTrigger
            value="comissoes"
            className="flex items-center gap-2 py-2.5"
          >
            <HugeiconsIcon icon={ShieldIcon} className="h-4 w-4" />
            <span className="hidden sm:inline">Comissões</span>
          </TabsTrigger>
          <TabsTrigger
            value="presencas"
            className="flex items-center gap-2 py-2.5"
          >
            <HugeiconsIcon icon={UserCheckIcon} className="h-4 w-4" />
            <span className="hidden sm:inline">Presenças</span>
          </TabsTrigger>
          <TabsTrigger
            value="despesas"
            className="flex items-center gap-2 py-2.5"
          >
            <HugeiconsIcon icon={InvoiceIcon} className="h-4 w-4" />
            <span className="hidden sm:inline">Despesas</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vereadores" className="mt-6">
          <Vereadores />
        </TabsContent>

        <TabsContent value="sessoes" className="mt-6">
          <Sessoes />
        </TabsContent>

        <TabsContent value="proposituras" className="mt-6">
          <Proposituras />
        </TabsContent>

        <TabsContent value="comissoes" className="mt-6">
          <Comissoes />
        </TabsContent>

        <TabsContent value="presencas" className="mt-6">
          <Presencas />
        </TabsContent>

        <TabsContent value="despesas" className="mt-6">
          <DespesasLegislativo />
        </TabsContent>
      </Tabs>
    </div>
  );
}
