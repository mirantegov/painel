"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AbastecimentoAgua } from "./abastecimento-agua";
import { Esgoto } from "./esgoto";
import { FinanceiroSaneamento } from "./financeiro-saneamento";
import { ObrasSaneamento } from "./obras-saneamento";
import { DrenagemUrbana } from "./drenagem-urbana";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DropletIcon,
  WaterfallDown01Icon,
  MoneyBag02Icon,
  Building06Icon,
  CloudIcon,
} from "@hugeicons/core-free-icons";

export function Saneamento() {
  const [activeTab, setActiveTab] = useState("abastecimento");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Saneamento Básico
          </h1>
          <p className="text-muted-foreground mt-1">
            Água, Esgoto e Drenagem Urbana
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          2025
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-muted/50 rounded-lg">
          <TabsTrigger
            value="abastecimento"
            className="flex items-center gap-2 py-2.5"
          >
            <HugeiconsIcon icon={DropletIcon} className="h-4 w-4" />
            <span className="hidden sm:inline">Água</span>
          </TabsTrigger>
          <TabsTrigger
            value="esgoto"
            className="flex items-center gap-2 py-2.5"
          >
            <HugeiconsIcon icon={WaterfallDown01Icon} className="h-4 w-4" />
            <span className="hidden sm:inline">Esgoto</span>
          </TabsTrigger>
          <TabsTrigger
            value="financeiro"
            className="flex items-center gap-2 py-2.5"
          >
            <HugeiconsIcon icon={MoneyBag02Icon} className="h-4 w-4" />
            <span className="hidden sm:inline">Financeiro</span>
          </TabsTrigger>
          <TabsTrigger value="obras" className="flex items-center gap-2 py-2.5">
            <HugeiconsIcon icon={Building06Icon} className="h-4 w-4" />
            <span className="hidden sm:inline">Obras</span>
          </TabsTrigger>
          <TabsTrigger
            value="drenagem"
            className="flex items-center gap-2 py-2.5"
          >
            <HugeiconsIcon icon={CloudIcon} className="h-4 w-4" />
            <span className="hidden sm:inline">Drenagem</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="abastecimento" className="mt-6">
          <AbastecimentoAgua />
        </TabsContent>

        <TabsContent value="esgoto" className="mt-6">
          <Esgoto />
        </TabsContent>

        <TabsContent value="financeiro" className="mt-6">
          <FinanceiroSaneamento />
        </TabsContent>

        <TabsContent value="obras" className="mt-6">
          <ObrasSaneamento />
        </TabsContent>

        <TabsContent value="drenagem" className="mt-6">
          <DrenagemUrbana />
        </TabsContent>
      </Tabs>
    </div>
  );
}
