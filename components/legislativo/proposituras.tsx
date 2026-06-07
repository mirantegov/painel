"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiCard } from "@/components/ui/kpi-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  DATA_PROPOSITURAS,
  type Propositura,
  type TipoPropositura,
  type SituacaoPropositura,
} from "@/lib/demo-legislativo";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FileValidationIcon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  ArchiveIcon,
  Cancel01Icon,
  ArrowDown01Icon,
  JusticeScale01Icon,
} from "@hugeicons/core-free-icons";

function TipoBadge({ tipo }: { tipo: TipoPropositura }) {
  const colors: Record<TipoPropositura, string> = {
    "Projeto de Lei": "bg-blue-500 text-white",
    "Projeto de Resolução": "bg-green-500 text-white",
    "Projeto de Decreto": "bg-teal-500 text-white",
    Indicação: "bg-yellow-500 text-black",
    Moção: "bg-purple-500 text-white",
    Requerimento: "bg-orange-500 text-white",
  };
  return (
    <Badge className={colors[tipo] || "bg-gray-500 text-white"}>{tipo}</Badge>
  );
}

function SituacaoBadge({ situacao }: { situacao: SituacaoPropositura }) {
  const configs: Record<string, { icon: React.ReactNode; color: string }> = {
    Aprovada: {
      icon: (
        <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-3 w-3 mr-1" />
      ),
      color: "bg-green-500 text-white",
    },
    "Em Tramitação": {
      icon: <HugeiconsIcon icon={Clock01Icon} className="h-3 w-3 mr-1" />,
      color: "bg-blue-500 text-white",
    },
    Arquivada: {
      icon: <HugeiconsIcon icon={ArchiveIcon} className="h-3 w-3 mr-1" />,
      color: "bg-gray-500 text-white",
    },
    Rejeitada: {
      icon: <HugeiconsIcon icon={Cancel01Icon} className="h-3 w-3 mr-1" />,
      color: "bg-red-500 text-white",
    },
    "Retirada de Pauta": {
      icon: <HugeiconsIcon icon={ArrowDown01Icon} className="h-3 w-3 mr-1" />,
      color: "bg-yellow-500 text-black",
    },
    "Sanção Positiva": {
      icon: (
        <HugeiconsIcon icon={JusticeScale01Icon} className="h-3 w-3 mr-1" />
      ),
      color: "bg-emerald-500 text-white",
    },
    "Veto Total": {
      icon: <HugeiconsIcon icon={Cancel01Icon} className="h-3 w-3 mr-1" />,
      color: "bg-red-700 text-white",
    },
    "Encaminhada ao Executivo": {
      icon: <HugeiconsIcon icon={ArrowDown01Icon} className="h-3 w-3 mr-1" />,
      color: "bg-blue-500 text-white",
    },
    Respondido: {
      icon: (
        <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-3 w-3 mr-1" />
      ),
      color: "bg-green-500 text-white",
    },
  };
  const config = configs[situacao] || {
    icon: null,
    color: "bg-gray-500 text-white",
  };
  return (
    <Badge className={config.color}>
      {config.icon}
      {situacao}
    </Badge>
  );
}

function PropositurasTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Proposituras</CardTitle>
        <CardDescription>
          Projetos de Lei, Resoluções, Indicações e outros
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Tipo</TableHead>
              <TableHead className="w-[100px]">Número</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Ementa</TableHead>
              <TableHead>Situação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DATA_PROPOSITURAS.map((prop) => (
              <TableRow key={prop.id}>
                <TableCell>
                  <TipoBadge tipo={prop.tipo} />
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {prop.numero}/{prop.ano}
                </TableCell>
                <TableCell className="text-sm">{prop.autor}</TableCell>
                <TableCell className="max-w-[300px]">
                  <p className="truncate text-sm" title={prop.ementa}>
                    {prop.ementa}
                  </p>
                </TableCell>
                <TableCell>
                  <SituacaoBadge situacao={prop.situacao} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function PropositurasStats() {
  const total = DATA_PROPOSITURAS.length;
  const aprovadas = DATA_PROPOSITURAS.filter(
    (p) => p.situacao === "Aprovada" || p.situacao === "Sanção Positiva",
  ).length;
  const emTramitacao = DATA_PROPOSITURAS.filter(
    (p) => p.situacao === "Em Tramitação",
  ).length;
  const arquivadas = DATA_PROPOSITURAS.filter(
    (p) => p.situacao === "Arquivada",
  ).length;
  const rejeitadas = DATA_PROPOSITURAS.filter(
    (p) => p.situacao === "Rejeitada",
  ).length;
  const taxaAprovacao = Math.round((aprovadas / total) * 100);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Total Apresentado"
        icon={FileValidationIcon}
        value={total}
        borderColor="border-l-slate-500"
        footer={
          <p className="text-xs text-muted-foreground">
            Proposituras protocoladas no exercício
          </p>
        }
      />
      <KpiCard
        title="Taxa de Aprovação"
        icon={CheckmarkCircle02Icon}
        value={`${taxaAprovacao}%`}
        borderColor="border-l-emerald-500"
        footer={
          <p className="text-xs text-muted-foreground">
            {aprovadas} matérias aprovadas ou sancionadas
          </p>
        }
      />
      <KpiCard
        title="Em Tramitação"
        icon={Clock01Icon}
        value={emTramitacao}
        borderColor="border-l-blue-500"
        footer={
          <p className="text-xs text-muted-foreground">
            Matérias aguardando deliberação das comissões ou do plenário
          </p>
        }
      />
      <KpiCard
        title="Encerradas"
        icon={ArchiveIcon}
        value={arquivadas + rejeitadas}
        borderColor="border-l-amber-500"
        footer={
          <p className="text-xs text-muted-foreground">
            Processos arquivados ou rejeitados
          </p>
        }
      />
    </div>
  );
}

function LeituraTramitacaoCard() {
  const total = DATA_PROPOSITURAS.length;
  const comParecer = DATA_PROPOSITURAS.filter(
    (item) => item.comissaoParecer,
  ).length;
  const encaminhadasExecutivo = DATA_PROPOSITURAS.filter(
    (item) =>
      item.situacao === "Encaminhada ao Executivo" ||
      item.situacao === "Sanção Positiva",
  ).length;
  const projetosLei = DATA_PROPOSITURAS.filter(
    (item) => item.tipo === "Projeto de Lei",
  ).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Leitura de Tramitação</CardTitle>
        <CardDescription>Visão executiva do fluxo legislativo</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-sm font-medium text-emerald-800">
            Produção normativa
          </p>
          <p className="text-sm text-emerald-700">
            Projetos de lei representam{" "}
            {Math.round((projetosLei / total) * 100)}% da produção do período,
            concentrando o núcleo decisório da Câmara.
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm font-medium">Capacidade de instrução</p>
          <p className="text-sm text-muted-foreground">
            {comParecer} matérias já passaram por comissão e{" "}
            {encaminhadasExecutivo} chegaram à etapa de encaminhamento ao
            Executivo ou sanção.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function DistribuicaoTipoChart() {
  const tipoCount = DATA_PROPOSITURAS.reduce(
    (acc, p) => {
      acc[p.tipo] = (acc[p.tipo] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const data = Object.entries(tipoCount)
    .map(([tipo, count]) => ({ tipo, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Por Tipo</CardTitle>
        <CardDescription>Distribuição das proposituras</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              count: { label: "Proposituras", color: "var(--chart-1)" },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 12, right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis
              dataKey="tipo"
              type="category"
              tickLine={false}
              axisLine={false}
              width={140}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="count"
              fill="var(--color-count)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function DistribuicaoSituacaoChart() {
  const situacaoCount = DATA_PROPOSITURAS.reduce(
    (acc, p) => {
      const situacao =
        p.situacao === "Sanção Positiva" ? "Aprovada" : p.situacao;
      acc[situacao] = (acc[situacao] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const cores: Record<string, string> = {
    Aprovada: "bg-green-500",
    "Em Tramitação": "bg-blue-500",
    Arquivada: "bg-gray-500",
    Rejeitada: "bg-red-500",
    "Encaminhada ao Executivo": "bg-indigo-500",
    Respondido: "bg-teal-500",
    "Retirada de Pauta": "bg-yellow-500",
  };

  const data = Object.entries(situacaoCount).map(([situacao, count]) => ({
    situacao,
    count,
    color: cores[situacao] || "bg-gray-400",
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Por Situação</CardTitle>
        <CardDescription>Status atual das proposituras</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map(({ situacao, count, color }) => (
            <div key={situacao} className="flex items-center gap-3">
              <div className="w-24 text-sm font-medium">{situacao}</div>
              <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                <div
                  className={`h-full ${color} rounded-full`}
                  style={{
                    width: `${(count / DATA_PROPOSITURAS.length) * 100}%`,
                  }}
                />
              </div>
              <div className="w-8 text-sm text-muted-foreground text-right">
                {count}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RankingProdutividade() {
  const autores = DATA_PROPOSITURAS.reduce(
    (acc, p) => {
      acc[p.autor] = (acc[p.autor] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const ranking = Object.entries(autores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  const max = ranking[0]?.[1] || 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ranking de Produtividade</CardTitle>
        <CardDescription>Proposituras por autor no exercício</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {ranking.map(([autor, count], i) => (
            <div key={autor} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                {i + 1}
              </div>
              <div className="w-40 text-sm font-medium truncate">{autor}</div>
              <div className="flex-1 bg-muted rounded-full h-5 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </div>
              <div className="w-6 text-sm text-muted-foreground text-right">
                {count}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function Proposituras() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Proposituras</h2>
        <Badge variant="outline" className="ml-2">
          {DATA_PROPOSITURAS.length} proposituras
        </Badge>
      </div>

      <PropositurasStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <DistribuicaoTipoChart />
        <DistribuicaoSituacaoChart />
      </div>

      <RankingProdutividade />

      <LeituraTramitacaoCard />

      <PropositurasTable />
    </div>
  );
}
