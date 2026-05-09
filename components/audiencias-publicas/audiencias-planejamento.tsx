"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Wallet01Icon,
  Analytics01Icon,
  Target01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { AudienciasLoaCarousel } from "./audiencias-loa-carousel";

function PlaceholderPlanejamento({
  sigla,
  titulo,
  descricao,
  prazo,
  base,
  icon,
}: {
  sigla: string;
  titulo: string;
  descricao: string;
  prazo: string;
  base: string;
  icon: React.ComponentProps<typeof HugeiconsIcon>["icon"];
}) {
  return (
    <div className="flex items-center justify-center py-16">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <HugeiconsIcon icon={icon} strokeWidth={1.5} className="size-8" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="text-base px-3 py-1">
              {sigla}
            </Badge>
            <Badge variant="secondary">Em breve</Badge>
          </div>
          <CardTitle className="text-2xl mt-2">{titulo}</CardTitle>
          <CardDescription className="text-base">{descricao}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Base legal</span>
              <span className="font-medium">{base}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Prazo / vigência</span>
              <span className="font-medium">{prazo}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
            <HugeiconsIcon
              icon={InformationCircleIcon}
              strokeWidth={2}
              className="size-4 flex-none"
            />
            O conteúdo desta aba será implementado futuramente com dados e
            visualizações específicas do instrumento.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AudienciasPlanejamento() {
  return (
    <Tabs defaultValue="loa" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="ppa" className="gap-2">
          <HugeiconsIcon
            icon={Target01Icon}
            strokeWidth={2}
            className="size-4"
          />
          PPA
        </TabsTrigger>
        <TabsTrigger value="ldo" className="gap-2">
          <HugeiconsIcon
            icon={Analytics01Icon}
            strokeWidth={2}
            className="size-4"
          />
          LDO
        </TabsTrigger>
        <TabsTrigger value="loa" className="gap-2">
          <HugeiconsIcon
            icon={Wallet01Icon}
            strokeWidth={2}
            className="size-4"
          />
          LOA
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ppa">
        <PlaceholderPlanejamento
          sigla="PPA"
          titulo="Plano Plurianual"
          descricao="Instrumento de planejamento de médio prazo que orienta as ações governamentais por um período de quatro anos, estabelecendo programas, metas e recursos."
          prazo="4 anos (2022–2025)"
          base="Art. 165 §1º CF/88 · Lei Municipal do PPA"
          icon={Target01Icon}
        />
      </TabsContent>

      <TabsContent value="ldo">
        <PlaceholderPlanejamento
          sigla="LDO"
          titulo="Lei de Diretrizes Orçamentárias"
          descricao="Define as metas e prioridades da administração pública para o exercício financeiro seguinte, orientando a elaboração da Lei Orçamentária Anual."
          prazo="Exercício 2025 — enviada até 15/04/2024"
          base="Art. 165 §2º CF/88 · Art. 4º LRF"
          icon={Analytics01Icon}
        />
      </TabsContent>

      <TabsContent value="loa">
        <AudienciasLoaCarousel />
      </TabsContent>
    </Tabs>
  );
}
