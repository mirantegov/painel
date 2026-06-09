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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartPieValueLegend,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MoneyReceiveSquareIcon,
  MoneySendSquareIcon,
  InvoiceIcon,
  AlertCircleIcon,
  InformationCircleIcon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";
import {
  formatCurrency,
  formatCurrencyCompact,
  formatPercent,
} from "@/lib/demo-saneamento";
import { cn } from "@/lib/utils";

function ReceitasVsDespesasChart() {
  const { DATA_RECEITAS_MENSAIS } = useSaneamentoSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receitas vs Despesas</CardTitle>
        <CardDescription>Comparativo mensal — Saneamento</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              receita: { label: "Receita", color: "var(--chart-1)" },
              despesa: { label: "Despesa", color: "var(--chart-4)" },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <AreaChart
            data={DATA_RECEITAS_MENSAIS}
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
              tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => formatCurrency(Number(value))}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="receita"
              fill="var(--color-receita)"
              fillOpacity={0.3}
              stroke="var(--color-receita)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="despesa"
              fill="var(--color-despesa)"
              fillOpacity={0.3}
              stroke="var(--color-despesa)"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function InadimplenciaMensalChart() {
  const { DATA_INADIMPLENCIA_MENSAL } = useSaneamentoSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inadimplência Mensal</CardTitle>
        <CardDescription>
          Evolução do % de inadimplência — meta: abaixo de 15%
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              inadimplencia: {
                label: "Inadimplência (%)",
                color: "var(--chart-3)",
              },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <LineChart
            data={DATA_INADIMPLENCIA_MENSAL}
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
              tickFormatter={(v) => `${v}%`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [`${value}%`, "Inadimplência"]}
                />
              }
            />
            <Line
              type="monotone"
              dataKey="valor"
              stroke="var(--color-inadimplencia)"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function AgingContasReceberChart() {
  const { DATA_CONTAS_RECEBER } = useSaneamentoSnapshot();

  const ultimo = DATA_CONTAS_RECEBER[DATA_CONTAS_RECEBER.length - 1];
  const colors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-5)",
  ];

  const chartData = [
    { name: "Até 30 dias", value: ultimo.ate30, fill: colors[0] },
    { name: "31-60 dias", value: ultimo.de31a60, fill: colors[1] },
    { name: "61-90 dias", value: ultimo.de61a90, fill: colors[2] },
    { name: "Acima 90 dias", value: ultimo.acima90, fill: colors[3] },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aging — Contas a Receber</CardTitle>
        <CardDescription>
          Composição por faixa de atraso — {ultimo.mes}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              ate30: { label: "Até 30 dias", color: "var(--chart-1)" },
              de31a60: { label: "31-60 dias", color: "var(--chart-2)" },
              de61a90: { label: "61-90 dias", color: "var(--chart-3)" },
              acima90: { label: "Acima 90 dias", color: "var(--chart-5)" },
            } satisfies ChartConfig
          }
          className="mx-auto aspect-auto h-[300px] w-full"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => formatCurrency(Number(value))}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <ChartLegend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              content={
                <ChartPieValueLegend
                  nameKey="name"
                  valueKey="value"
                  valueFormatter={formatCurrencyCompact}
                />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function AgingEvolucaoChart() {
  const { DATA_CONTAS_RECEBER } = useSaneamentoSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução das Contas a Receber</CardTitle>
        <CardDescription>
          Total mensal por faixa de vencimento (R$)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              ate30: { label: "Até 30 dias", color: "var(--chart-1)" },
              de31a60: { label: "31-60 dias", color: "var(--chart-2)" },
              de61a90: { label: "61-90 dias", color: "var(--chart-3)" },
              acima90: { label: "Acima 90 dias", color: "var(--chart-5)" },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <AreaChart
            data={DATA_CONTAS_RECEBER}
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
                  formatter={(value) => formatCurrency(Number(value))}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="ate30"
              fill="var(--color-ate30)"
              fillOpacity={0.3}
              stroke="var(--color-ate30)"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              type="monotone"
              dataKey="de31a60"
              fill="var(--color-de31a60)"
              fillOpacity={0.3}
              stroke="var(--color-de31a60)"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              type="monotone"
              dataKey="de61a90"
              fill="var(--color-de61a90)"
              fillOpacity={0.3}
              stroke="var(--color-de61a90)"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              type="monotone"
              dataKey="acima90"
              fill="var(--color-acima90)"
              fillOpacity={0.3}
              stroke="var(--color-acima90)"
              strokeWidth={2}
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function DespesasPorCategoriaChart() {
  const { DATA_DESPESAS_CATEGORIAS_SANEAMENTO } = useSaneamentoSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Despesas por Categoria</CardTitle>
        <CardDescription>Execução financeira por categoria</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              empenhado: { label: "Empenhado", color: "var(--chart-3)" },
              liquidado: { label: "Liquidado", color: "var(--chart-2)" },
              pago: { label: "Pago", color: "var(--chart-1)" },
            } satisfies ChartConfig
          }
          className="h-[300px] w-full"
        >
          <BarChart
            data={DATA_DESPESAS_CATEGORIAS_SANEAMENTO}
            layout="vertical"
            margin={{ left: 60, right: 12 }}
          >
            <CartesianGrid horizontal={false} />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
            />
            <YAxis
              dataKey="categoria"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={80}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => formatCurrency(Number(value))}
                />
              }
            />
            <Bar
              dataKey="empenhado"
              fill="var(--color-empenhado)"
              radius={[0, 2, 2, 0]}
            />
            <Bar
              dataKey="liquidado"
              fill="var(--color-liquidado)"
              radius={[0, 2, 2, 0]}
            />
            <Bar
              dataKey="pago"
              fill="var(--color-pago)"
              radius={[0, 4, 4, 0]}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function TabelaDespesasDetalhada() {
  const { DATA_DESPESAS_CATEGORIAS_SANEAMENTO } = useSaneamentoSnapshot();

  const totalEmpenhado = DATA_DESPESAS_CATEGORIAS_SANEAMENTO.reduce(
    (s, d) => s + d.empenhado,
    0,
  );
  const totalLiquidado = DATA_DESPESAS_CATEGORIAS_SANEAMENTO.reduce(
    (s, d) => s + d.liquidado,
    0,
  );
  const totalPago = DATA_DESPESAS_CATEGORIAS_SANEAMENTO.reduce(
    (s, d) => s + d.pago,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Despesas por Categoria Detalhadas</CardTitle>
        <CardDescription>Execução orçamentária por categoria</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Empenhado</TableHead>
              <TableHead className="text-right">Liquidado</TableHead>
              <TableHead className="text-right">Pago</TableHead>
              <TableHead className="text-center">Execução (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DATA_DESPESAS_CATEGORIAS_SANEAMENTO.map((d) => {
              const execPct = (d.pago / d.empenhado) * 100;
              return (
                <TableRow key={d.categoria}>
                  <TableCell className="font-medium">{d.categoria}</TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatCurrencyCompact(d.empenhado)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatCurrencyCompact(d.liquidado)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatCurrencyCompact(d.pago)}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Progress
                        value={execPct}
                        className="w-16 h-2 [&>div]:bg-emerald-500"
                      />
                      <span className="w-10 text-right text-xs font-medium">
                        {execPct.toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="text-right font-mono font-bold">
                {formatCurrencyCompact(totalEmpenhado)}
              </TableCell>
              <TableCell className="text-right font-mono font-bold">
                {formatCurrencyCompact(totalLiquidado)}
              </TableCell>
              <TableCell className="text-right font-mono font-bold">
                {formatCurrencyCompact(totalPago)}
              </TableCell>
              <TableCell className="text-center font-bold">
                {((totalPago / totalEmpenhado) * 100).toFixed(1)}%
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}

export function FinanceiroSaneamento() {
  const {
    VOLUME_FATURADO_M3,
    RECEITA_TOTAL_SANEAMENTO,
    DESPESA_OPERACIONAL_SANEAMENTO,
    CONTAS_RECEBER,
    INADIMPLENCIA_PCT,
  } = useSaneamentoSnapshot();

  const superavit = RECEITA_TOTAL_SANEAMENTO - DESPESA_OPERACIONAL_SANEAMENTO;
  const tarifaMedia = RECEITA_TOTAL_SANEAMENTO / VOLUME_FATURADO_M3;
  const indiceAutoSuficiencia =
    (RECEITA_TOTAL_SANEAMENTO / DESPESA_OPERACIONAL_SANEAMENTO) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Financeiro</h2>
        <p className="text-muted-foreground">
          Receitas, despesas e contas a receber
        </p>
      </div>

      {/* KPIs principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Receita Total"
          icon={MoneyReceiveSquareIcon}
          value={formatCurrencyCompact(RECEITA_TOTAL_SANEAMENTO)}
          borderColor="border-l-emerald-600"
          footer={
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-emerald-600">
                Superávit: {formatCurrencyCompact(superavit)}
              </span>
            </div>
          }
        />
        <KpiCard
          title="Despesa Operacional"
          icon={MoneySendSquareIcon}
          value={formatCurrencyCompact(DESPESA_OPERACIONAL_SANEAMENTO)}
          borderColor="border-l-red-500"
          footer={
            <div className="text-xs text-muted-foreground">
              {(
                (DESPESA_OPERACIONAL_SANEAMENTO / RECEITA_TOTAL_SANEAMENTO) *
                100
              ).toFixed(1)}
              % da receita
            </div>
          }
        />
        <KpiCard
          title="Contas a Receber"
          icon={InvoiceIcon}
          value={formatCurrencyCompact(CONTAS_RECEBER)}
          borderColor="border-l-amber-500"
          footer={<div className="text-xs text-amber-600">Aging acumulado</div>}
        />
        <KpiCard
          title="Inadimplência"
          icon={AlertCircleIcon}
          value={formatPercent(INADIMPLENCIA_PCT)}
          valueClassName={
            INADIMPLENCIA_PCT > 15 ? "text-red-600" : "text-emerald-600"
          }
          borderColor={
            INADIMPLENCIA_PCT > 15 ? "border-l-red-500" : "border-l-emerald-600"
          }
          footer={
            <p
              className={cn(
                "text-xs",
                INADIMPLENCIA_PCT > 15 ? "text-red-600" : "text-emerald-600",
              )}
            >
              Meta: abaixo de 15%
            </p>
          }
        />
      </div>

      {/* KPIs calculados */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <KpiCard
          title="Tarifa Média"
          icon={CheckmarkCircle01Icon}
          value={`R$ ${tarifaMedia.toFixed(2)}/m³`}
          borderColor="border-l-emerald-600"
          footer={
            <p className="text-xs text-muted-foreground">
              Receita / Volume Faturado (
              {(VOLUME_FATURADO_M3 / 1_000_000).toFixed(1)}M m³)
            </p>
          }
        />
        <KpiCard
          title="Índice de Autossuficiência"
          icon={MoneyReceiveSquareIcon}
          value={`${indiceAutoSuficiencia.toFixed(1)}%`}
          valueClassName={
            indiceAutoSuficiencia >= 100 ? "text-emerald-600" : "text-red-600"
          }
          borderColor={
            indiceAutoSuficiencia >= 100
              ? "border-l-emerald-600"
              : "border-l-red-500"
          }
          footer={
            <p className="text-xs text-emerald-600">
              Receita cobre {indiceAutoSuficiencia.toFixed(0)}% das despesas
            </p>
          }
        />
      </div>

      {/* Alertas */}
      {INADIMPLENCIA_PCT > 15 && (
        <Alert>
          <HugeiconsIcon
            icon={AlertCircleIcon}
            strokeWidth={2}
            className="h-4 w-4"
          />
          <AlertTitle>Atenção: Inadimplência Elevada</AlertTitle>
          <AlertDescription>
            A inadimplência de {formatPercent(INADIMPLENCIA_PCT)} está acima da
            meta de 15%. Recomenda-se intensificar a cobrança administrativa e
            campanhas de conscientização.
          </AlertDescription>
        </Alert>
      )}

      {/* Gráficos Principais */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ReceitasVsDespesasChart />
        <InadimplenciaMensalChart />
      </div>

      {/* Aging */}
      <div className="grid gap-4 lg:grid-cols-2">
        <AgingContasReceberChart />
        <AgingEvolucaoChart />
      </div>

      {/* Despesas */}
      <DespesasPorCategoriaChart />

      {/* Tabela Detalhada */}
      <TabelaDespesasDetalhada />

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
          <CardDescription>Financeiro do Saneamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-muted/50 p-4">
              <h4 className="font-semibold text-sm mb-2">Receita e Despesa</h4>
              <p className="text-sm text-muted-foreground">
                A receita total de{" "}
                {formatCurrencyCompact(RECEITA_TOTAL_SANEAMENTO)} gera superávit
                de {formatCurrencyCompact(superavit)}, com índice de
                autossuficiência de {indiceAutoSuficiencia.toFixed(0)}%. A
                tarifa média é de R$ {tarifaMedia.toFixed(2)}/m³. Energia
                elétrica e pessoal concentram as maiores rubricas de despesa.
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <h4 className="font-semibold text-sm mb-2">Inadimplência</h4>
              <p className="text-sm text-muted-foreground">
                A inadimplência de {formatPercent(INADIMPLENCIA_PCT)} está acima
                da meta de 15%. O contas a receber acumula{" "}
                {formatCurrencyCompact(CONTAS_RECEBER)}, com maior concentração
                nas faixas até 30 dias. Recomenda-se intensificar a cobrança
                administrativa e renegociação de débitos acima de 90 dias.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
