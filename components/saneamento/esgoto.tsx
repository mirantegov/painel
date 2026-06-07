"use client";

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
import { Progress } from "@/components/ui/progress";
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
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  WaterfallDown01Icon,
  DashboardSpeed02Icon,
  CheckmarkCircle01Icon,
  Building06Icon,
  InformationCircleIcon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import {
  POPULACAO_TOTAL,
  POPULACAO_ATENDIDA_ESGOTO,
  COBERTURA_ESGOTO_PCT,
  LIGACOES_ATIVAS_ESGOTO,
  ETES_ATIVAS,
  VOLUME_ESGOTO_COLETADO_M3,
  VOLUME_ESGOTO_TRATADO_M3,
  DATA_ESGOTO_TRATAMENTO,
  DATA_SISTEMAS_TRATAMENTO,
  formatNumber,
  formatPercent,
  formatCurrencyCompact,
} from "@/lib/demo-saneamento";
import { cn } from "@/lib/utils";

function ColetaVsTratamentoChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Coleta vs Tratamento</CardTitle>
        <CardDescription>Volume mensal em m³</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              coletado: { label: "Coletado", color: "var(--chart-1)" },
              tratado: { label: "Tratado", color: "var(--chart-3)" },
              lancado: { label: "Lançado s/ Trat.", color: "var(--chart-5)" },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <AreaChart
            data={DATA_ESGOTO_TRATAMENTO}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [
                    `${formatNumber(Number(value))} m³`,
                    "",
                  ]}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="coletado"
              fill="var(--color-coletado)"
              fillOpacity={0.3}
              stroke="var(--color-coletado)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="tratado"
              fill="var(--color-tratado)"
              fillOpacity={0.3}
              stroke="var(--color-tratado)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="lancado"
              fill="var(--color-lancado)"
              fillOpacity={0.3}
              stroke="var(--color-lancado)"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function CapacidadePorTecnologiaChart() {
  const capacidadePorTipo = DATA_SISTEMAS_TRATAMENTO.reduce(
    (acc, s) => {
      acc[s.tipo] = (acc[s.tipo] || 0) + s.capacidadeM3Dia;
      return acc;
    },
    {} as Record<string, number>,
  );

  const totalCapacidade = Object.values(capacidadePorTipo).reduce(
    (a, b) => a + b,
    0,
  );

  const chartData = Object.entries(capacidadePorTipo).map(
    ([tipo, capacidade]) => ({
      tipo,
      capacidade,
      percentual: (capacidade / totalCapacidade) * 100,
    }),
  );

  const colors = ["var(--chart-1)", "var(--chart-3)", "var(--chart-5)"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Capacidade por Tecnologia</CardTitle>
        <CardDescription>
          Distribuição das ETEs por tipo de tratamento (m³/dia)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              uasb: { label: "UASB", color: "var(--chart-1)" },
              lagoa: { label: "Lagoa", color: "var(--chart-3)" },
              lodoativado: { label: "Lodo Ativado", color: "var(--chart-5)" },
            } satisfies ChartConfig
          }
          className="mx-auto aspect-square h-[280px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [
                    `${formatNumber(Number(value))} m³/dia`,
                    "Capacidade",
                  ]}
                />
              }
            />
            <Pie
              data={chartData.map((item, index) => ({
                ...item,
                fill: colors[index % colors.length],
              }))}
              dataKey="capacidade"
              nameKey="tipo"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function EficienciaETEsChart() {
  const chartData = DATA_SISTEMAS_TRATAMENTO.map((s) => ({
    nome: s.nome.replace(/^ETE\s+/, ""),
    eficiencia: s.eficiencia,
    operacao: s.operacaoM3Dia,
    capacidade: s.capacidadeM3Dia,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eficiência das ETEs</CardTitle>
        <CardDescription>
          Operação vs Capacidade e Eficiência de Tratamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              capacidade: {
                label: "Capacidade (m³/dia)",
                color: "var(--chart-3)",
              },
              operacao: { label: "Operação (m³/dia)", color: "var(--chart-1)" },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="nome"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="capacidade"
              fill="var(--color-capacidade)"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="operacao"
              fill="var(--color-operacao)"
              radius={[2, 2, 0, 0]}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
          {chartData.map((ete) => (
            <div key={ete.nome} className="text-center">
              <p className="text-lg font-bold text-emerald-600">
                {ete.eficiencia}%
              </p>
              <p className="text-xs text-muted-foreground">{ete.nome}</p>
              <p className="text-xs text-muted-foreground">eficiência</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DeficitCoberturaCard() {
  const semColeta = POPULACAO_TOTAL - POPULACAO_ATENDIDA_ESGOTO;
  const pctSemColeta = 100 - COBERTURA_ESGOTO_PCT;
  const metaMarco = 90;
  const faltaParaMeta = metaMarco - COBERTURA_ESGOTO_PCT;
  const habitantesMeta = Math.round((faltaParaMeta / 100) * POPULACAO_TOTAL);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HugeiconsIcon
            icon={AlertCircleIcon}
            strokeWidth={2}
            className="h-5 w-5 text-amber-600"
          />
          Déficit de Cobertura
        </CardTitle>
        <CardDescription>
          Novo Marco do Saneamento — meta 90% até 2033
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <p className="text-3xl font-bold text-amber-600">
                {formatNumber(semColeta)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Habitantes sem coleta
              </p>
              <p className="text-xs font-medium text-amber-600">
                {formatPercent(pctSemColeta)} da população
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <p className="text-3xl font-bold text-emerald-600">
                {formatNumber(habitantesMeta)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Hab. a conectar até 2033
              </p>
              <p className="text-xs font-medium text-emerald-600">
                Meta: +{formatPercent(faltaParaMeta)} cobertura
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cobertura atual</span>
              <span className="font-medium">
                {formatPercent(COBERTURA_ESGOTO_PCT)}
              </span>
            </div>
            <Progress
              value={COBERTURA_ESGOTO_PCT}
              className="h-3 [&>div]:bg-emerald-500"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span className="text-amber-600 font-medium">
                Meta 2033: {metaMarco}%
              </span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SistemasTratamentoDetalhada() {
  const [tipoFilter, setTipoFilter] = React.useState("todos");

  const filteredSistemas = DATA_SISTEMAS_TRATAMENTO.filter(
    (s) => tipoFilter === "todos" || s.tipo === tipoFilter,
  );

  const totalCapacidade = filteredSistemas.reduce(
    (s, t) => s + t.capacidadeM3Dia,
    0,
  );
  const totalOperacao = filteredSistemas.reduce(
    (s, t) => s + t.operacaoM3Dia,
    0,
  );
  const eficienciaMedia =
    filteredSistemas.length > 0
      ? filteredSistemas.reduce((s, t) => s + t.eficiencia, 0) /
        filteredSistemas.length
      : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sistemas de Tratamento Detalhados</CardTitle>
        <CardDescription>
          {filteredSistemas.length} ETE
          {filteredSistemas.length !== 1 ? "s" : ""}{" "}
          {tipoFilter !== "todos" ? `(${tipoFilter})` : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Select value={tipoFilter} onValueChange={setTipoFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tecnologia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas</SelectItem>
              <SelectItem value="UASB">UASB</SelectItem>
              <SelectItem value="Lagoa">Lagoa</SelectItem>
              <SelectItem value="Lodo Ativado">Lodo Ativado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ETE</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Capacidade</TableHead>
              <TableHead className="text-right">Operação</TableHead>
              <TableHead className="text-center">Utilização</TableHead>
              <TableHead className="text-right">Eficiência</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSistemas.map((s) => {
              const utilizacao = (s.operacaoM3Dia / s.capacidadeM3Dia) * 100;
              return (
                <TableRow key={s.id}>
                  <TableCell>
                    <div>
                      <span className="font-medium">{s.nome}</span>
                      <p className="text-xs text-muted-foreground">
                        {s.bairrosAtendidos.join(", ")}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{s.tipo}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatNumber(s.capacidadeM3Dia)} m³/dia
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatNumber(s.operacaoM3Dia)} m³/dia
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Progress
                        value={utilizacao}
                        className={cn(
                          "w-16 h-2",
                          utilizacao > 85
                            ? "[&>div]:bg-amber-500"
                            : "[&>div]:bg-emerald-500",
                        )}
                      />
                      <span className="w-10 text-right text-xs font-medium">
                        {utilizacao.toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {s.eficiencia}%
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-bold">
                Total {tipoFilter !== "todos" ? `(${tipoFilter})` : ""}
              </TableCell>
              <TableCell className="text-right font-mono font-bold">
                {formatNumber(totalCapacidade)} m³/dia
              </TableCell>
              <TableCell className="text-right font-mono font-bold">
                {formatNumber(totalOperacao)} m³/dia
              </TableCell>
              <TableCell className="text-center font-bold">
                {totalCapacidade > 0
                  ? ((totalOperacao / totalCapacidade) * 100).toFixed(1)
                  : 0}
                %
              </TableCell>
              <TableCell className="text-right font-bold">
                {eficienciaMedia.toFixed(1)}%
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}

export function Esgoto() {
  const eficienciaTratamento =
    (VOLUME_ESGOTO_TRATADO_M3 / VOLUME_ESGOTO_COLETADO_M3) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">Esgotamento Sanitário</h2>
        <Badge variant="secondary">Coleta e Tratamento</Badge>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="População com Coleta"
          icon={WaterfallDown01Icon}
          value={`${formatNumber(POPULACAO_ATENDIDA_ESGOTO)} hab`}
          borderColor="border-l-emerald-600"
          footer={
            <p className="text-xs text-emerald-600">
              Cobertura: {formatPercent(COBERTURA_ESGOTO_PCT)}
            </p>
          }
        />
        <KpiCard
          title="Volume Coletado"
          icon={DashboardSpeed02Icon}
          value={`${(VOLUME_ESGOTO_COLETADO_M3 / 1_000_000).toFixed(1)}M m³`}
          borderColor="border-l-green-500"
          footer={
            <p className="text-xs text-muted-foreground">Anual acumulado</p>
          }
        />
        <KpiCard
          title="Volume Tratado"
          icon={CheckmarkCircle01Icon}
          value={`${(VOLUME_ESGOTO_TRATADO_M3 / 1_000_000).toFixed(1)}M m³`}
          borderColor="border-l-emerald-600"
          footer={
            <p className="text-xs text-emerald-600">
              Eficiência: {eficienciaTratamento.toFixed(1)}%
            </p>
          }
        />
        <KpiCard
          title="ETEs Ativas"
          icon={Building06Icon}
          value={String(ETES_ATIVAS)}
          borderColor="border-l-emerald-600"
          footer={
            <p className="text-xs text-muted-foreground">
              {formatNumber(LIGACOES_ATIVAS_ESGOTO)} ligações
            </p>
          }
        />
      </div>

      {/* Déficit de Cobertura */}
      <DeficitCoberturaCard />

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ColetaVsTratamentoChart />
        <CapacidadePorTecnologiaChart />
      </div>

      {/* Eficiência ETEs */}
      <EficienciaETEsChart />

      {/* Table */}
      <SistemasTratamentoDetalhada />

      {/* Leitura Executiva */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={InformationCircleIcon}
              strokeWidth={2}
              className="h-5 w-5"
            />
            Leitura Executiva
          </CardTitle>
          <CardDescription>Esgotamento Sanitário</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-muted/50 p-4">
              <h4 className="font-semibold text-sm mb-2">Cobertura</h4>
              <p className="text-sm text-muted-foreground">
                O sistema de coleta atende {formatPercent(COBERTURA_ESGOTO_PCT)}{" "}
                da população ({formatNumber(POPULACAO_ATENDIDA_ESGOTO)} hab),
                com {formatNumber(LIGACOES_ATIVAS_ESGOTO)} ligações ativas.{" "}
                {formatNumber(POPULACAO_TOTAL - POPULACAO_ATENDIDA_ESGOTO)}{" "}
                habitantes ainda sem coleta. A meta do Novo Marco do Saneamento
                é alcançar 90% até 2033.
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <h4 className="font-semibold text-sm mb-2">Tratamento</h4>
              <p className="text-sm text-muted-foreground">
                As {ETES_ATIVAS} ETEs operam com eficiência média de{" "}
                {eficienciaTratamento.toFixed(1)}% de tratamento do esgoto
                coletado. A ETE Central (Lodo Ativado) concentra a maior
                capacidade. Prioridade: ampliação da ETE Sul e universalização
                da coleta nos bairros periféricos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
