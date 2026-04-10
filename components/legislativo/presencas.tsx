"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { KpiCard } from "@/components/ui/kpi-card";
import {
  DATA_VEREADORES,
  calcularPresencaVereador,
  calcularPresencaGeral,
} from "@/lib/demo-legislativo";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserCheckIcon,
  UserMultipleIcon,
  TrendingUp,
} from "@hugeicons/core-free-icons";

function getInitials(nome: string) {
  return nome
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

function VereadorPresencaCard({
  vereadorId,
  nome,
}: {
  vereadorId: string;
  nome: string;
}) {
  const presenca = calcularPresencaVereador(vereadorId);
  const initials = getInitials(nome);

  const getColor = (pct: number) => {
    if (pct >= 90) return "text-green-500";
    if (pct >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">{nome}</p>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={presenca} className="h-2 flex-1" />
              <span className={`text-sm font-medium ${getColor(presenca)}`}>
                {presenca}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PresencaStats() {
  const presencaGeral = calcularPresencaGeral();
  const presencasPorVereador = DATA_VEREADORES.map((v) => ({
    id: v.id,
    nome: v.nome,
    presenca: calcularPresencaVereador(v.id),
  }));

  const media = Math.round(
    presencasPorVereador.reduce((acc, p) => acc + p.presenca, 0) /
      presencasPorVereador.length,
  );

  const acima90 = presencasPorVereador.filter((p) => p.presenca >= 90).length;
  const entre70e89 = presencasPorVereador.filter(
    (p) => p.presenca >= 70 && p.presenca < 90,
  ).length;
  const abaixo70 = presencasPorVereador.filter((p) => p.presenca < 70).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        title="Presença Geral"
        icon={UserCheckIcon}
        value={`${presencaGeral}%`}
        borderColor="border-l-emerald-500"
        footer={
          <>
            <Progress value={presencaGeral} className="mt-1 h-2" />
            <p className="text-xs text-muted-foreground">
              Indicador consolidado de comparecimento
            </p>
          </>
        }
      />
      <KpiCard
        title="Média Individual"
        icon={TrendingUp}
        value={`${media}%`}
        borderColor="border-l-blue-500"
        footer={
          <p className="text-xs text-muted-foreground">
            Desempenho médio dos parlamentares no período
          </p>
        }
      />
      <KpiCard
        title="Faixa de Excelência"
        icon={UserCheckIcon}
        value={acima90}
        borderColor="border-l-green-500"
        footer={
          <p className="text-xs text-muted-foreground">
            Parlamentares com presença acima de 90%
          </p>
        }
      />
      <KpiCard
        title="Risco de Quórum"
        icon={UserMultipleIcon}
        value={abaixo70}
        borderColor="border-l-red-500"
        footer={
          <p className="text-xs text-muted-foreground">
            Parlamentares abaixo de 70% de presença
          </p>
        }
      />
    </div>
  );
}

function QuorumCard() {
  const presencasPorVereador = DATA_VEREADORES.map((vereador) => ({
    id: vereador.id,
    nome: vereador.nome,
    presenca: calcularPresencaVereador(vereador.id),
  }));

  const acima90 = presencasPorVereador.filter((item) => item.presenca >= 90);
  const entre70e89 = presencasPorVereador.filter(
    (item) => item.presenca >= 70 && item.presenca < 90,
  );
  const abaixoMeta = presencasPorVereador.filter((item) => item.presenca < 70);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Leitura de Quórum</CardTitle>
        <CardDescription>Indicadores para coordenação da pauta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-sm font-medium text-emerald-800">Faixa estável</p>
          <p className="text-sm text-emerald-700">
            {entre70e89.length} parlamentares estão em faixa regular e{" "}
            {acima90.length} mantêm padrão de excelência, o que favorece
            previsibilidade de deliberação.
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm font-medium">Ponto de atenção</p>
          <p className="text-sm text-muted-foreground">
            {abaixoMeta.length > 0
              ? `${abaixoMeta.map((item) => item.nome.split(" ")[0]).join(", ")} exige(m) acompanhamento da secretaria para reduzir risco de ausência em votações críticas.`
              : "Não há parlamentares em situação crítica de presença neste recorte."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function PresencaDistribuicao() {
  const presencasPorVereador = DATA_VEREADORES.map((v) => ({
    id: v.id,
    nome: v.nome,
    partido: v.partido,
    presenca: calcularPresencaVereador(v.id),
  })).sort((a, b) => b.presenca - a.presenca);

  const getBarColor = (pct: number) => {
    if (pct >= 90) return "bg-green-500";
    if (pct >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Presença por Vereador</CardTitle>
        <CardDescription>Índice de comparecimento às sessões</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {presencasPorVereador.map(({ id, nome, presenca }) => (
            <div key={id} className="flex items-center gap-3">
              <div className="w-40 text-sm font-medium truncate">{nome}</div>
              <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                <div
                  className={`h-full ${getBarColor(presenca)} rounded-full transition-all`}
                  style={{ width: `${presenca}%` }}
                />
              </div>
              <div className="w-12 text-sm text-right font-medium">
                {presenca}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function VereadoresPresencaGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {DATA_VEREADORES.map((v) => (
        <VereadorPresencaCard key={v.id} vereadorId={v.id} nome={v.nome} />
      ))}
    </div>
  );
}

export function Presencas() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Presenças</h2>
        <Badge variant="outline" className="ml-2">
          Registro de Frequência
        </Badge>
      </div>

      <PresencaStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <PresencaDistribuicao />
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Legenda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-green-500" />
              <span className="text-sm">Acima de 90% - Excelente</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-yellow-500" />
              <span className="text-sm">70% a 90% - Bom</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-red-500" />
              <span className="text-sm">Abaixo de 70% - Atenção</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <VereadoresPresencaGrid />

      <QuorumCard />
    </div>
  );
}
