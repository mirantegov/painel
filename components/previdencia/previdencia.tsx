"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GestaoBeneficios } from "./gestao-beneficios";
import { AnaliseFinanceira } from "./analise-financeira";
import { ControleBeneficios } from "./controle-beneficios";
import { BalancoAtuarial } from "./balanco-atuarial";
import { useSubmoduleAccess } from "@/components/submodule-access";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserIcon,
  ChartIcon,
  FolderOpenIcon,
  JusticeScale01Icon,
} from "@hugeicons/core-free-icons";

const TAB_ORDER = [
  "gestao-beneficios",
  "analise-financeira",
  "controle-beneficios",
  "balanco-atuarial",
];

export function Previdencia() {
  const canSee = useSubmoduleAccess("previdencia");
  const [activeTab, setActiveTab] = useState(
    () => TAB_ORDER.find(canSee) ?? TAB_ORDER[0],
  );

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
        <TabsList className="flex w-full flex-wrap h-auto p-1 bg-muted/50 rounded-lg">
          {canSee("gestao-beneficios") && (
            <TabsTrigger
              value="gestao-beneficios"
              className="flex flex-1 items-center gap-2 py-2.5"
            >
              <HugeiconsIcon icon={UserIcon} className="h-4 w-4" />
              <span className="hidden sm:inline">Gestão</span>
            </TabsTrigger>
          )}
          {canSee("analise-financeira") && (
            <TabsTrigger
              value="analise-financeira"
              className="flex flex-1 items-center gap-2 py-2.5"
            >
              <HugeiconsIcon icon={ChartIcon} className="h-4 w-4" />
              <span className="hidden sm:inline">Financeiro</span>
            </TabsTrigger>
          )}
          {canSee("controle-beneficios") && (
            <TabsTrigger
              value="controle-beneficios"
              className="flex flex-1 items-center gap-2 py-2.5"
            >
              <HugeiconsIcon icon={FolderOpenIcon} className="h-4 w-4" />
              <span className="hidden sm:inline">Controle</span>
            </TabsTrigger>
          )}
          {canSee("balanco-atuarial") && (
            <TabsTrigger
              value="balanco-atuarial"
              className="flex flex-1 items-center gap-2 py-2.5"
            >
              <HugeiconsIcon icon={JusticeScale01Icon} className="h-4 w-4" />
              <span className="hidden sm:inline">Atuarial</span>
            </TabsTrigger>
          )}
        </TabsList>

        {canSee("gestao-beneficios") && (
          <TabsContent value="gestao-beneficios" className="mt-6">
            <GestaoBeneficios />
          </TabsContent>
        )}
        {canSee("analise-financeira") && (
          <TabsContent value="analise-financeira" className="mt-6">
            <AnaliseFinanceira />
          </TabsContent>
        )}
        {canSee("controle-beneficios") && (
          <TabsContent value="controle-beneficios" className="mt-6">
            <ControleBeneficios />
          </TabsContent>
        )}
        {canSee("balanco-atuarial") && (
          <TabsContent value="balanco-atuarial" className="mt-6">
            <BalancoAtuarial />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
