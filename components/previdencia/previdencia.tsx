"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GestaoBeneficios } from "./gestao-beneficios";
import { AnaliseFinanceira } from "./analise-financeira";
import { ControleBeneficios } from "./controle-beneficios";
import { BalancoAtuarial } from "./balanco-atuarial";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserIcon,
  ChartIcon,
  FolderOpenIcon,
  JusticeScale01Icon,
} from "@hugeicons/core-free-icons";

export function Previdencia() {
  const [activeTab, setActiveTab] = useState("gestao-beneficios");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Previdência Municipal
          </h1>
          <p className="text-muted-foreground mt-1">
            RPPS - Regime Próprio de Previdência Social
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          2025
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/50 rounded-lg">
          <TabsTrigger
            value="gestao-beneficios"
            className="flex items-center gap-2 py-2.5"
          >
            <HugeiconsIcon icon={UserIcon} className="h-4 w-4" />
            <span className="hidden sm:inline">Gestão</span>
          </TabsTrigger>
          <TabsTrigger
            value="analise-financeira"
            className="flex items-center gap-2 py-2.5"
          >
            <HugeiconsIcon icon={ChartIcon} className="h-4 w-4" />
            <span className="hidden sm:inline">Financeiro</span>
          </TabsTrigger>
          <TabsTrigger
            value="controle-beneficios"
            className="flex items-center gap-2 py-2.5"
          >
            <HugeiconsIcon icon={FolderOpenIcon} className="h-4 w-4" />
            <span className="hidden sm:inline">Controle</span>
          </TabsTrigger>
          <TabsTrigger
            value="balanco-atuarial"
            className="flex items-center gap-2 py-2.5"
          >
            <HugeiconsIcon icon={JusticeScale01Icon} className="h-4 w-4" />
            <span className="hidden sm:inline">Atuarial</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gestao-beneficios" className="mt-6">
          <GestaoBeneficios />
        </TabsContent>

        <TabsContent value="analise-financeira" className="mt-6">
          <AnaliseFinanceira />
        </TabsContent>

        <TabsContent value="controle-beneficios" className="mt-6">
          <ControleBeneficios />
        </TabsContent>

        <TabsContent value="balanco-atuarial" className="mt-6">
          <BalancoAtuarial />
        </TabsContent>
      </Tabs>
    </div>
  );
}
