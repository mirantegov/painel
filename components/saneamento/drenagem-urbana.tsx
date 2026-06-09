"use client";

import { useSaneamentoSnapshot } from "./snapshot-context";
import * as React from "react";
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
  TableFooter,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CloudIcon,
  AlertCircleIcon,
  MapsLocation01Icon,
  Building06Icon,
} from "@hugeicons/core-free-icons";

function EventosMensaisChart() {
  const { DATA_DRENAGEM_EVENTOS } = useSaneamentoSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eventos por Mês</CardTitle>
        <CardDescription>Alagamentos e inundações registrados</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              alagamentos: { label: "Alagamentos", color: "var(--chart-2)" },
              inundacoes: { label: "Inundações", color: "var(--chart-4)" },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <BarChart
            data={DATA_DRENAGEM_EVENTOS}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="alagamentos"
              fill="var(--color-alagamentos)"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="inundacoes"
              fill="var(--color-inundacoes)"
              radius={[2, 2, 0, 0]}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function EstatisticasEventos() {
  const { DATA_DRENAGEM_EVENTOS } = useSaneamentoSnapshot();

  const totalEventos = DATA_DRENAGEM_EVENTOS.reduce(
    (s, d) => s + d.alagamentos + d.inundacoes,
    0,
  );
  const mediaMensal = totalEventos / DATA_DRENAGEM_EVENTOS.length;

  const mesMaisCritico = DATA_DRENAGEM_EVENTOS.reduce((max, d) =>
    d.alagamentos + d.inundacoes > max.alagamentos + max.inundacoes ? d : max,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estatísticas dos Eventos</CardTitle>
        <CardDescription>Resumo anual dos eventos de drenagem</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-foreground">{totalEventos}</p>
            <p className="text-xs text-muted-foreground">Total de Eventos</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-amber-600">
              {mediaMensal.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">Média Mensal</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-red-600">
              {mesMaisCritico.mes}
            </p>
            <p className="text-xs text-muted-foreground">Mês Mais Crítico</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-emerald-600">
              {mesMaisCritico.alagamentos + mesMaisCritico.inundacoes}
            </p>
            <p className="text-xs text-muted-foreground">
              Eventos em {mesMaisCritico.mes}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RiscosPorBairroChart() {
  const { DATA_PONTOS_CRITICOS } = useSaneamentoSnapshot();

  const riscoPorBairro = DATA_PONTOS_CRITICOS.reduce(
    (acc, p) => {
      acc[p.bairro] = (acc[p.bairro] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = Object.entries(riscoPorBairro).map(([bairro, pontos]) => ({
    bairro: bairro.length > 10 ? bairro.substring(0, 10) + "..." : bairro,
    pontos,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pontos Críticos por Bairro</CardTitle>
        <CardDescription>
          Distribuição geográfica dos pontos de risco
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              pontos: { label: "Pontos Críticos", color: "var(--chart-3)" },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="bairro"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [value, "Pontos Críticos"]}
                />
              }
            />
            <Bar
              dataKey="pontos"
              fill="var(--color-pontos)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function ProgressoIntervencoesChart() {
  const { DATA_PONTOS_CRITICOS } = useSaneamentoSnapshot();

  const statusCount = DATA_PONTOS_CRITICOS.reduce(
    (acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = [
    {
      status: "Concluída",
      value: statusCount["Concluída"] || 0,
      fill: "var(--chart-1)",
    },
    {
      status: "Em Obra",
      value: statusCount["Em Obra"] || 0,
      fill: "var(--chart-3)",
    },
    {
      status: "Planejada",
      value: statusCount["Planejada"] || 0,
      fill: "var(--chart-5)",
    },
  ];

  const total = chartData.reduce((s, d) => s + d.value, 0);
  const concluidas = statusCount["Concluída"] || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status das Intervenções</CardTitle>
        <CardDescription>
          {concluidas} de {total} pontos com intervenção concluída
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              Concluída: { label: "Concluída", color: "var(--chart-1)" },
              "Em Obra": { label: "Em Obra", color: "var(--chart-3)" },
              Planejada: { label: "Planejada", color: "var(--chart-5)" },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `${value} ponto${Number(value) !== 1 ? "s" : ""}`,
                    name,
                  ]}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {chartData.map((entry) => (
                <Cell key={entry.status} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="status" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function TabelaPontosCriticosDetalhada() {
  const { DATA_PONTOS_CRITICOS } = useSaneamentoSnapshot();

  const [riscoFilter, setRiscoFilter] = React.useState("todos");
  const [bairroFilter, setBairroFilter] = React.useState("todos");

  const filteredPontos = DATA_PONTOS_CRITICOS.filter((p) => {
    const riscoMatch = riscoFilter === "todos" || p.risco === riscoFilter;
    const bairroMatch = bairroFilter === "todos" || p.bairro === bairroFilter;
    return riscoMatch && bairroMatch;
  });

  const totalEventos = filteredPontos.reduce((s, p) => s + p.eventosAno, 0);
  const pontosAltoRisco = filteredPontos.filter(
    (p) => p.risco === "Alto",
  ).length;

  const bairrosUnicos = [...new Set(DATA_PONTOS_CRITICOS.map((p) => p.bairro))];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pontos Críticos Detalhados</CardTitle>
        <CardDescription>
          {filteredPontos.length} pontos{" "}
          {riscoFilter !== "todos" ? `(${riscoFilter})` : ""}{" "}
          {bairroFilter !== "todos" ? `em ${bairroFilter}` : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Select value={riscoFilter} onValueChange={setRiscoFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Risco" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="Alto">Alto</SelectItem>
              <SelectItem value="Médio">Médio</SelectItem>
              <SelectItem value="Baixo">Baixo</SelectItem>
            </SelectContent>
          </Select>
          <Select value={bairroFilter} onValueChange={setBairroFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Bairro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os bairros</SelectItem>
              {bairrosUnicos.map((bairro) => (
                <SelectItem key={bairro} value={bairro}>
                  {bairro}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Local</TableHead>
              <TableHead>Bairro</TableHead>
              <TableHead>Risco</TableHead>
              <TableHead className="text-right">Eventos/Ano</TableHead>
              <TableHead>Intervenção</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPontos.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.local}</TableCell>
                <TableCell className="text-muted-foreground">
                  {p.bairro}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      p.risco === "Alto"
                        ? "destructive"
                        : p.risco === "Médio"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {p.risco}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {p.eventosAno}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-48">
                  {p.intervencao}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={p.status === "Concluída" ? "default" : "secondary"}
                    className={p.status === "Concluída" ? "bg-emerald-600" : ""}
                  >
                    {p.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="font-bold">
                Total {riscoFilter !== "todos" ? `(${riscoFilter})` : ""}
              </TableCell>
              <TableCell className="text-right font-bold">
                {totalEventos}
              </TableCell>
              <TableCell className="text-left font-bold">
                {pontosAltoRisco} de alto risco
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}

export function DrenagemUrbana() {
  const {
    BACIAS_MONITORADAS,
    PONTOS_CRITICOS_DRENAGEM,
    VOLUME_DRENAGEM_DESTINADO_M3,
    OBRAS_MACRODRENAGEM,
    DATA_DRENAGEM_EVENTOS,
    DATA_PONTOS_CRITICOS,
  } = useSaneamentoSnapshot();

  const totalEventos = DATA_DRENAGEM_EVENTOS.reduce(
    (s, d) => s + d.alagamentos + d.inundacoes,
    0,
  );
  const pontosAltoRisco = DATA_PONTOS_CRITICOS.filter(
    (p) => p.risco === "Alto",
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">Drenagem Urbana</h2>
        <Badge variant="secondary">Macrodrenagem e Microdrenagem</Badge>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Bacias Monitoradas"
          icon={CloudIcon}
          value={String(BACIAS_MONITORADAS)}
          borderColor="border-l-emerald-600"
          footer={
            <p className="text-xs text-muted-foreground">
              Monitoramento hidrológico
            </p>
          }
        />
        <KpiCard
          title="Pontos Críticos"
          icon={AlertCircleIcon}
          value={String(PONTOS_CRITICOS_DRENAGEM)}
          valueClassName="text-amber-600"
          borderColor="border-l-amber-500"
          footer={
            <p className="text-xs text-amber-600">
              {pontosAltoRisco} de alto risco
            </p>
          }
        />
        <KpiCard
          title="Volume Destinado"
          icon={MapsLocation01Icon}
          value={`${(VOLUME_DRENAGEM_DESTINADO_M3 / 1_000_000).toFixed(1)}M m³`}
          borderColor="border-l-emerald-600"
          footer={
            <p className="text-xs text-muted-foreground">
              Capacidade anual do sistema
            </p>
          }
        />
        <KpiCard
          title="Obras Macrodrenagem"
          icon={Building06Icon}
          value={String(OBRAS_MACRODRENAGEM)}
          borderColor="border-l-emerald-600"
          footer={
            <p className="text-xs text-muted-foreground">
              {totalEventos} eventos registrados no ano
            </p>
          }
        />
      </div>

      {/* Estatísticas resumidas */}
      <EstatisticasEventos />

      {/* Gráfico de eventos mensais */}
      <EventosMensaisChart />

      {/* Distribuição geográfica + status das intervenções */}
      <div className="grid gap-4 md:grid-cols-2">
        <RiscosPorBairroChart />
        <ProgressoIntervencoesChart />
      </div>

      {/* Tabela detalhada com filtros funcionais */}
      <TabelaPontosCriticosDetalhada />

      {/* Leitura Executiva */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Leitura Executiva</CardTitle>
          <CardDescription>Drenagem Urbana</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-muted/50 p-4">
              <h4 className="font-semibold text-sm mb-2">Eventos Climáticos</h4>
              <p className="text-sm text-muted-foreground">
                Foram registrados {totalEventos} eventos de alagamento/inundação
                no ano, concentrados nos meses de verão (Out-Mar). O sistema
                monitora {BACIAS_MONITORADAS} bacias hidrográficas com{" "}
                {PONTOS_CRITICOS_DRENAGEM} pontos críticos mapeados.
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <h4 className="font-semibold text-sm mb-2">Intervenções</h4>
              <p className="text-sm text-muted-foreground">
                Dos {DATA_PONTOS_CRITICOS.length} pontos críticos,{" "}
                {pontosAltoRisco} são de alto risco. As {OBRAS_MACRODRENAGEM}{" "}
                obras de macrodrenagem em andamento visam reduzir a
                vulnerabilidade nas áreas mais afetadas. Recomenda-se concluir a
                galeria pluvial da Av. Brasil antes do próximo período chuvoso.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
