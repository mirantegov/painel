"use client";

import { useState } from "react";
import { useSnapshot } from "@/components/use-snapshot";
import { SANEAMENTO_SNAPSHOT } from "@/lib/demo-saneamento";
import { SaneamentoSnapshotContext } from "./snapshot-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AbastecimentoAgua } from "./abastecimento-agua";
import { Esgoto } from "./esgoto";
import { FinanceiroSaneamento } from "./financeiro-saneamento";
import { ObrasSaneamento } from "./obras-saneamento";
import { DrenagemUrbana } from "./drenagem-urbana";
import { useSubmoduleAccess } from "@/components/submodule-access";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DropletIcon,
  WaterfallDown01Icon,
  MoneyBag02Icon,
  Building06Icon,
  CloudIcon,
} from "@hugeicons/core-free-icons";

const TAB_ORDER = [
  "abastecimento",
  "esgoto",
  "financeiro",
  "obras",
  "drenagem",
];

export function Saneamento() {
  const snapshot = useSnapshot("saneamento", SANEAMENTO_SNAPSHOT);
  const canSee = useSubmoduleAccess("saneamento");
  const [activeTab, setActiveTab] = useState(
    () => TAB_ORDER.find(canSee) ?? TAB_ORDER[0],
  );

  return (
    <SaneamentoSnapshotContext.Provider value={snapshot}>
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex w-full flex-wrap h-auto p-1 bg-muted/50 rounded-lg">
            {canSee("abastecimento") && (
              <TabsTrigger
                value="abastecimento"
                className="flex flex-1 items-center gap-2 py-2.5"
              >
                <HugeiconsIcon icon={DropletIcon} className="h-4 w-4" />
                <span className="hidden sm:inline">Água</span>
              </TabsTrigger>
            )}
            {canSee("esgoto") && (
              <TabsTrigger
                value="esgoto"
                className="flex flex-1 items-center gap-2 py-2.5"
              >
                <HugeiconsIcon icon={WaterfallDown01Icon} className="h-4 w-4" />
                <span className="hidden sm:inline">Esgoto</span>
              </TabsTrigger>
            )}
            {canSee("financeiro") && (
              <TabsTrigger
                value="financeiro"
                className="flex flex-1 items-center gap-2 py-2.5"
              >
                <HugeiconsIcon icon={MoneyBag02Icon} className="h-4 w-4" />
                <span className="hidden sm:inline">Financeiro</span>
              </TabsTrigger>
            )}
            {canSee("obras") && (
              <TabsTrigger
                value="obras"
                className="flex flex-1 items-center gap-2 py-2.5"
              >
                <HugeiconsIcon icon={Building06Icon} className="h-4 w-4" />
                <span className="hidden sm:inline">Obras</span>
              </TabsTrigger>
            )}
            {canSee("drenagem") && (
              <TabsTrigger
                value="drenagem"
                className="flex flex-1 items-center gap-2 py-2.5"
              >
                <HugeiconsIcon icon={CloudIcon} className="h-4 w-4" />
                <span className="hidden sm:inline">Drenagem</span>
              </TabsTrigger>
            )}
          </TabsList>

          {canSee("abastecimento") && (
            <TabsContent value="abastecimento" className="mt-6">
              <AbastecimentoAgua />
            </TabsContent>
          )}
          {canSee("esgoto") && (
            <TabsContent value="esgoto" className="mt-6">
              <Esgoto />
            </TabsContent>
          )}
          {canSee("financeiro") && (
            <TabsContent value="financeiro" className="mt-6">
              <FinanceiroSaneamento />
            </TabsContent>
          )}
          {canSee("obras") && (
            <TabsContent value="obras" className="mt-6">
              <ObrasSaneamento />
            </TabsContent>
          )}
          {canSee("drenagem") && (
            <TabsContent value="drenagem" className="mt-6">
              <DrenagemUrbana />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </SaneamentoSnapshotContext.Provider>
  );
}
