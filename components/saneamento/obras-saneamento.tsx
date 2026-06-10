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
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Building06Icon,
  MoneyBag02Icon,
  CheckmarkCircle01Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import {
  formatCurrency,
  formatCurrencyCompact,
  formatPercent,
} from "@/lib/demo-saneamento";
import { cn } from "@/lib/utils";

function InvestimentoPorTipoChart() {
  const { INVESTIMENTO_OBRAS, DATA_OBRAS_SANEAMENTO } = useSaneamentoSnapshot();

  const tipoMap = new Map<string, number>();
  for (const o of DATA_OBRAS_SANEAMENTO) {
    tipoMap.set(o.tipo, (tipoMap.get(o.tipo) || 0) + o.valorTotal);
  }
  const chartData = Array.from(tipoMap.entries()).map(([tipo, valor]) => ({
    tipo,
    valor,
    percentual: (valor / INVESTIMENTO_OBRAS) * 100,
  }));

  const colors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investimento por Tipo</CardTitle>
        <CardDescription>Distribuição por categoria de obra</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartData.reduce((config, item, index) => {
            config[item.tipo.toLowerCase().replace(/\s+/g, "")] = {
              label: item.tipo,
              color: colors[index % colors.length],
            };
            return config;
          }, {} as ChartConfig)}
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
              data={chartData.map((item, index) => ({
                ...item,
                fill: colors[index % colors.length],
              }))}
              dataKey="valor"
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
            <ChartLegend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              content={
                <ChartPieValueLegend
                  nameKey="tipo"
                  valueKey="valor"
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

function ProgressoObrasChart() {
  const { DATA_OBRAS_SANEAMENTO } = useSaneamentoSnapshot();

  const chartData = DATA_OBRAS_SANEAMENTO.filter(
    (o) => o.status !== "Licitação",
  ).map((o) => ({
    nome: o.nome.length > 22 ? o.nome.substring(0, 22) + "…" : o.nome,
    executado: o.percentualExecucao,
    restante: 100 - o.percentualExecucao,
    status: o.status,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progresso das Obras</CardTitle>
        <CardDescription>
          % de execução física por obra (obras em andamento)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              executado: { label: "Executado", color: "var(--chart-2)" },
              restante: { label: "A Executar", color: "var(--chart-4)" },
            } satisfies ChartConfig
          }
          className="h-[300px] w-full"
        >
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 150, right: 40 }}
          >
            <CartesianGrid horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              dataKey="nome"
              type="category"
              tickLine={false}
              axisLine={false}
              width={145}
              style={{ fontSize: "11px" }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent formatter={(value) => [`${value}%`, ""]} />
              }
            />
            <Bar
              dataKey="executado"
              fill="var(--color-executado)"
              stackId="a"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="restante"
              fill="var(--color-restante)"
              stackId="a"
              radius={[0, 4, 4, 0]}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function TabelaObrasDetalhada() {
  const { DATA_OBRAS_SANEAMENTO } = useSaneamentoSnapshot();

  const [statusFilter, setStatusFilter] = React.useState("todos");
  const [tipoFilter, setTipoFilter] = React.useState("todos");

  const filteredObras = DATA_OBRAS_SANEAMENTO.filter((obra) => {
    const statusMatch =
      statusFilter === "todos" || obra.status === statusFilter;
    const tipoMatch = tipoFilter === "todos" || obra.tipo === tipoFilter;
    return statusMatch && tipoMatch;
  });

  const totalValor = filteredObras.reduce((s, o) => s + o.valorTotal, 0);
  const totalExecutado = filteredObras.reduce(
    (s, o) => s + o.valorExecutado,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Obras de Saneamento Detalhadas</CardTitle>
        <CardDescription>
          {filteredObras.length} obras{" "}
          {statusFilter !== "todos" ? `com status ${statusFilter}` : ""}
          {tipoFilter !== "todos" ? ` do tipo ${tipoFilter}` : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="Em Execução">Em Execução</SelectItem>
              <SelectItem value="Concluída">Concluída</SelectItem>
              <SelectItem value="Paralisada">Paralisada</SelectItem>
              <SelectItem value="Licitação">Licitação</SelectItem>
            </SelectContent>
          </Select>
          <Select value={tipoFilter} onValueChange={setTipoFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os tipos</SelectItem>
              <SelectItem value="Rede de Água">Rede de Água</SelectItem>
              <SelectItem value="Rede de Esgoto">Rede de Esgoto</SelectItem>
              <SelectItem value="ETA">ETA</SelectItem>
              <SelectItem value="ETE">ETE</SelectItem>
              <SelectItem value="Reservatório">Reservatório</SelectItem>
              <SelectItem value="Macrodrenagem">Macrodrenagem</SelectItem>
              <SelectItem value="Microdrenagem">Microdrenagem</SelectItem>
              <SelectItem value="Estação Elevatória">
                Estação Elevatória
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Obra</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Valor Total</TableHead>
              <TableHead className="text-right">Executado</TableHead>
              <TableHead className="text-center">Execução</TableHead>
              <TableHead>Prazo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredObras.map((o) => (
              <TableRow key={o.id}>
                <TableCell>
                  <div>
                    <span className="font-medium">{o.nome}</span>
                    <p className="text-xs text-muted-foreground">{o.bairro}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{o.tipo}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      o.status === "Concluída"
                        ? "default"
                        : o.status === "Paralisada"
                          ? "destructive"
                          : "secondary"
                    }
                    className={o.status === "Concluída" ? "bg-emerald-600" : ""}
                  >
                    {o.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {formatCurrencyCompact(o.valorTotal)}
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {formatCurrencyCompact(o.valorExecutado)}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Progress
                      value={o.percentualExecucao}
                      className={cn(
                        "w-16 h-2",
                        o.status === "Paralisada"
                          ? "[&>div]:bg-red-500"
                          : o.percentualExecucao === 100
                            ? "[&>div]:bg-emerald-500"
                            : "[&>div]:bg-green-500",
                      )}
                    />
                    <span className="w-10 text-right text-xs font-medium">
                      {o.percentualExecucao}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {o.mesInicio} — {o.mesPrevisto}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="font-bold">
                Total {statusFilter !== "todos" ? `(${statusFilter})` : ""}
              </TableCell>
              <TableCell className="text-right font-mono font-bold">
                {formatCurrencyCompact(totalValor)}
              </TableCell>
              <TableCell className="text-right font-mono font-bold">
                {formatCurrencyCompact(totalExecutado)}
              </TableCell>
              <TableCell className="text-center font-bold">
                {totalValor > 0
                  ? ((totalExecutado / totalValor) * 100).toFixed(1)
                  : 0}
                %
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}

export function ObrasSaneamento() {
  const { INVESTIMENTO_OBRAS, DATA_OBRAS_SANEAMENTO } = useSaneamentoSnapshot();

  const totalValor = DATA_OBRAS_SANEAMENTO.reduce(
    (s, o) => s + o.valorTotal,
    0,
  );
  const totalExecutado = DATA_OBRAS_SANEAMENTO.reduce(
    (s, o) => s + o.valorExecutado,
    0,
  );
  const emExecucao = DATA_OBRAS_SANEAMENTO.filter(
    (o) => o.status === "Em Execução",
  ).length;
  const concluidas = DATA_OBRAS_SANEAMENTO.filter(
    (o) => o.status === "Concluída",
  ).length;
  const paralisadas = DATA_OBRAS_SANEAMENTO.filter(
    (o) => o.status === "Paralisada",
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Obras</h2>
        <p className="text-muted-foreground">
          Investimentos e andamento de obras de saneamento
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Em Execução"
          icon={Building06Icon}
          value={String(emExecucao)}
          borderColor="border-l-green-500"
          footer={
            <p className="text-xs text-muted-foreground">Obras em andamento</p>
          }
        />
        <KpiCard
          title="Investimento Total"
          icon={MoneyBag02Icon}
          value={formatCurrencyCompact(INVESTIMENTO_OBRAS)}
          borderColor="border-l-emerald-600"
          footer={
            <p className="text-xs text-muted-foreground">
              {formatPercent((totalExecutado / totalValor) * 100)} executado
            </p>
          }
        />
        <KpiCard
          title="Concluídas"
          icon={CheckmarkCircle01Icon}
          value={String(concluidas)}
          borderColor="border-l-emerald-600"
          footer={<p className="text-xs text-emerald-600">Obras finalizadas</p>}
        />
        <KpiCard
          title="Paralisadas"
          icon={AlertCircleIcon}
          value={String(paralisadas)}
          valueClassName={paralisadas > 0 ? "text-red-600" : ""}
          borderColor="border-l-red-500"
          footer={
            <p className="text-xs text-red-600">
              {paralisadas > 0 ? "Atenção necessária" : "Nenhuma"}
            </p>
          }
        />
      </div>

      {/* Alertas */}
      {paralisadas > 0 && (
        <Alert>
          <HugeiconsIcon
            icon={AlertCircleIcon}
            strokeWidth={2}
            className="h-4 w-4"
          />
          <AlertTitle>Atenção: Obras Paralisadas</AlertTitle>
          <AlertDescription>
            Existem {paralisadas} obra{paralisadas > 1 ? "s" : ""} paralisada
            {paralisadas > 1 ? "s" : ""}. Recomenda-se revisão dos contratos e
            retomada das atividades.
          </AlertDescription>
        </Alert>
      )}

      {/* Gráficos */}
      <div className="grid gap-4 lg:grid-cols-2">
        <InvestimentoPorTipoChart />
        <ProgressoObrasChart />
      </div>

      {/* Tabela Detalhada */}
      <TabelaObrasDetalhada />
    </div>
  );
}
