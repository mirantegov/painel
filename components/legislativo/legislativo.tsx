"use client";

import { useState } from "react";
import { useSnapshot } from "@/components/use-snapshot";
import { LEGISLATIVO_SNAPSHOT } from "@/lib/demo-legislativo";
import { LegislativoSnapshotContext } from "./snapshot-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Vereadores } from "./vereadores";
import { Sessoes } from "./sessoes";
import { Proposituras } from "./proposituras";
import { Comissoes } from "./comissoes";
import { Presencas } from "./presencas";
import { DespesasLegislativo } from "./despesas-legislativo";
import { useSubmoduleAccess } from "@/components/submodule-access";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserMultipleIcon,
  CalendarIcon,
  FileValidationIcon,
  ShieldIcon,
  UserCheckIcon,
  InvoiceIcon,
} from "@hugeicons/core-free-icons";

const TAB_ORDER = [
  "vereadores",
  "sessoes",
  "proposituras",
  "comissoes",
  "presencas",
  "despesas",
];

export function Legislativo() {
  const snapshot = useSnapshot("legislativo", LEGISLATIVO_SNAPSHOT);
  const canSee = useSubmoduleAccess("legislativo");
  const [activeTab, setActiveTab] = useState(
    () => TAB_ORDER.find(canSee) ?? TAB_ORDER[0],
  );

  return (
    <LegislativoSnapshotContext.Provider value={snapshot}>
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex w-full flex-wrap h-auto p-1 bg-muted/50 rounded-lg">
            {canSee("vereadores") && (
              <TabsTrigger
                value="vereadores"
                className="flex flex-1 items-center gap-2 py-2.5"
              >
                <HugeiconsIcon icon={UserMultipleIcon} className="h-4 w-4" />
                <span className="hidden sm:inline">Vereadores</span>
              </TabsTrigger>
            )}
            {canSee("sessoes") && (
              <TabsTrigger
                value="sessoes"
                className="flex flex-1 items-center gap-2 py-2.5"
              >
                <HugeiconsIcon icon={CalendarIcon} className="h-4 w-4" />
                <span className="hidden sm:inline">Sessões</span>
              </TabsTrigger>
            )}
            {canSee("proposituras") && (
              <TabsTrigger
                value="proposituras"
                className="flex flex-1 items-center gap-2 py-2.5"
              >
                <HugeiconsIcon icon={FileValidationIcon} className="h-4 w-4" />
                <span className="hidden sm:inline">Proposituras</span>
              </TabsTrigger>
            )}
            {canSee("comissoes") && (
              <TabsTrigger
                value="comissoes"
                className="flex flex-1 items-center gap-2 py-2.5"
              >
                <HugeiconsIcon icon={ShieldIcon} className="h-4 w-4" />
                <span className="hidden sm:inline">Comissões</span>
              </TabsTrigger>
            )}
            {canSee("presencas") && (
              <TabsTrigger
                value="presencas"
                className="flex flex-1 items-center gap-2 py-2.5"
              >
                <HugeiconsIcon icon={UserCheckIcon} className="h-4 w-4" />
                <span className="hidden sm:inline">Presenças</span>
              </TabsTrigger>
            )}
            {canSee("despesas") && (
              <TabsTrigger
                value="despesas"
                className="flex flex-1 items-center gap-2 py-2.5"
              >
                <HugeiconsIcon icon={InvoiceIcon} className="h-4 w-4" />
                <span className="hidden sm:inline">Despesas</span>
              </TabsTrigger>
            )}
          </TabsList>

          {canSee("vereadores") && (
            <TabsContent value="vereadores" className="mt-6">
              <Vereadores />
            </TabsContent>
          )}
          {canSee("sessoes") && (
            <TabsContent value="sessoes" className="mt-6">
              <Sessoes />
            </TabsContent>
          )}
          {canSee("proposituras") && (
            <TabsContent value="proposituras" className="mt-6">
              <Proposituras />
            </TabsContent>
          )}
          {canSee("comissoes") && (
            <TabsContent value="comissoes" className="mt-6">
              <Comissoes />
            </TabsContent>
          )}
          {canSee("presencas") && (
            <TabsContent value="presencas" className="mt-6">
              <Presencas />
            </TabsContent>
          )}
          {canSee("despesas") && (
            <TabsContent value="despesas" className="mt-6">
              <DespesasLegislativo />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </LegislativoSnapshotContext.Provider>
  );
}
