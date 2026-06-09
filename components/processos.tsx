"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CourtLawIcon,
  FileValidationIcon,
  Clock01Icon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  ChartLineData02Icon,
  PieChart02Icon,
  Target01Icon,
  UserMultipleIcon,
  Building01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { KpiCard } from "@/components/ui/kpi-card";
import { cn } from "@/lib/utils";
import { useSnapshot } from "@/components/use-snapshot";
import { PROCESSOS_SNAPSHOT } from "@/lib/demo-processos";

const formatNumber = (num: number) => num.toLocaleString("pt-BR");
const formatPercent = (num: number) => `${num.toFixed(1)}%`;

const chartConfig = {
  entradas: { label: "Entradas", color: "var(--chart-1)" },
  conclusoes: { label: "Conclusões", color: "var(--chart-2)" },
  quantidade: { label: "Quantidade", color: "var(--chart-1)" },
  dias: { label: "Dias", color: "var(--chart-1)" },
} satisfies ChartConfig;

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function Processos() {
  const {
    tiposProcesso,
    kpiData,
    entradasVsConclusoes,
    backlogPorStatus,
    tempoMedioPorTipo,
    distribuicaoPorArea,
    movimentacoesRecentes,
    eventosRecentes,
    backlogPorArea,
  } = useSnapshot("processos", PROCESSOS_SNAPSHOT);

  return (
    <div className="space-y-8">

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Solicitações Abertas (Mês)"
          icon={FileValidationIcon}
          value={formatNumber(kpiData.solicitacoesAbertas)}
          borderColor="border-l-green-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-green-600"
              />
              <span className="text-green-600">
                +{formatPercent(kpiData.variacaoSolicitacoes)}
              </span>
              <span>vs mês anterior</span>
            </div>
          }
        />
        <KpiCard
          title="Processos em Tramitação"
          icon={CourtLawIcon}
          value={formatNumber(kpiData.processosEmTramitacao)}
          borderColor="border-l-blue-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Estoque atual em andamento
            </p>
          }
        />
        <KpiCard
          title="Dentro do SLA"
          icon={CheckmarkCircle02Icon}
          value={formatPercent(kpiData.dentroDoPrazo)}
          borderColor="border-l-green-500"
          footer={
            <div className="flex items-center gap-2">
              <Progress value={kpiData.dentroDoPrazo} className="h-2 flex-1" />
              <span className="text-xs font-medium">
                {formatPercent(kpiData.dentroDoPrazo)}
              </span>
            </div>
          }
        />
        <KpiCard
          title="Atrasados"
          icon={Alert02Icon}
          value={formatNumber(kpiData.atrasados)}
          borderColor="border-l-red-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Média {kpiData.tempoMedioAtraso} dias em atraso
            </p>
          }
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Tempo Médio de Conclusão"
          icon={Clock01Icon}
          value={`${kpiData.tempoMedioConclusao} dias`}
          borderColor="border-l-purple-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                strokeWidth={2}
                className="size-3 text-green-600"
              />
              <span className="text-green-600">-12%</span>
              <span>vs período anterior</span>
            </div>
          }
        />
        <KpiCard
          title="Taxa de Conversão"
          icon={Target01Icon}
          value="34.2%"
          borderColor="border-l-amber-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Solicitação → Processo
            </p>
          }
        />
        <KpiCard
          title="Produtividade (Mês)"
          icon={UserMultipleIcon}
          value="23.4"
          borderColor="border-l-blue-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Processos concluídos/servidor
            </p>
          }
        />
        <KpiCard
          title="Reaberturas"
          icon={InformationCircleIcon}
          value="18"
          borderColor="border-l-amber-500"
          footer={
            <p className="text-xs text-muted-foreground">
              2.0% de retrabalho no período
            </p>
          }
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Entradas vs Conclusões
            </CardTitle>
            <CardDescription>
              Evolução mensal de processos abertos e concluídos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={entradasVsConclusoes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="mes"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="entradas"
                  stroke="var(--chart-1)"
                  fill="var(--chart-1)"
                  fillOpacity={0.3}
                  name="Entradas"
                />
                <Area
                  type="monotone"
                  dataKey="conclusoes"
                  stroke="var(--chart-2)"
                  fill="var(--chart-2)"
                  fillOpacity={0.3}
                  name="Conclusões"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Target01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Backlog por Status
            </CardTitle>
            <CardDescription>
              Distribuição atual dos processos em tramitação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={backlogPorStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="status"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="quantidade"
                  fill="var(--chart-1)"
                  radius={[4, 4, 0, 0]}
                  name="Quantidade"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Clock01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Tempo Médio por Tipo
            </CardTitle>
            <CardDescription>
              Tempo médio de conclusão em dias úteis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={tempoMedioPorTipo} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                  dataKey="tipo"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={100}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="dias"
                  fill="var(--chart-1)"
                  radius={[0, 4, 4, 0]}
                  name="Dias"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={PieChart02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Distribuição por Área
            </CardTitle>
            <CardDescription>
              Processos em tramitação por secretaria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <PieChart>
                <Pie
                  data={distribuicaoPorArea}
                  dataKey="quantidade"
                  nameKey="area"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {distribuicaoPorArea.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={FileValidationIcon}
                strokeWidth={2}
                className="size-5"
              />
              Movimentações Recentes
            </CardTitle>
            <CardDescription>
              Últimas ações registradas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Protocolo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movimentacoesRecentes.map((mov, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs">
                      {mov.data}
                      <br />
                      <span className="text-muted-foreground">{mov.hora}</span>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {mov.protocolo}
                    </TableCell>
                    <TableCell className="text-xs">{mov.tipo}</TableCell>
                    <TableCell className="text-xs">{mov.acao}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          mov.statusPrazo === "concluido"
                            ? "default"
                            : mov.statusPrazo === "atrasado"
                              ? "destructive"
                              : mov.statusPrazo === "atencao"
                                ? "outline"
                                : "secondary"
                        }
                        className={cn(
                          "text-xs",
                          mov.statusPrazo === "concluido" &&
                            "bg-green-500 hover:bg-green-600",
                          mov.statusPrazo === "atencao" &&
                            "border-amber-500 text-amber-600",
                        )}
                      >
                        {mov.statusPrazo === "concluido"
                          ? "Concluído"
                          : mov.statusPrazo === "atrasado"
                            ? "Atrasado"
                            : mov.statusPrazo === "atencao"
                              ? "Atenção"
                              : "No Prazo"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Clock01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Eventos Recentes
            </CardTitle>
            <CardDescription>
              Timeline de movimentações no módulo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eventosRecentes.map((evento, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "size-2.5 rounded-full",
                        evento.tipo === "concluido"
                          ? "bg-green-500"
                          : evento.tipo === "encaminhado" ||
                              evento.tipo === "criado"
                            ? "bg-blue-500"
                            : evento.tipo === "analise"
                              ? "bg-blue-400"
                              : evento.tipo === "pendencia"
                                ? "bg-amber-500"
                                : "bg-red-500",
                      )}
                    />
                    {index < eventosRecentes.length - 1 && (
                      <div className="w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {evento.data} — {evento.hora}
                      </p>
                      <Badge
                        variant={
                          evento.tipo === "atrasado"
                            ? "destructive"
                            : "secondary"
                        }
                        className={cn(
                          "text-xs",
                          evento.tipo === "concluido" &&
                            "bg-green-500 hover:bg-green-600 text-white",
                        )}
                      >
                        {evento.tipo === "concluido"
                          ? "Concluído"
                          : evento.tipo === "atrasado"
                            ? "Atrasado"
                            : evento.tipo === "pendencia"
                              ? "Pendência"
                              : evento.tipo === "analise"
                                ? "Em Análise"
                                : "Movimentação"}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm">{evento.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Building01Icon}
              strokeWidth={2}
              className="size-5"
            />
            Backlog por Área
          </CardTitle>
          <CardDescription>
            Processos em andamento por secretaria e status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Área/Secretaria</TableHead>
                <TableHead className="text-right">Abertos</TableHead>
                <TableHead className="text-right">Em Análise</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">% do Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backlogPorArea.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.area}</TableCell>
                  <TableCell className="text-right">
                    {formatNumber(item.abertos)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(item.emAnalise)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatNumber(item.total)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPercent(
                      (item.total / kpiData.processosEmTramitacao) * 100,
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={InformationCircleIcon}
              strokeWidth={2}
              className="size-5"
            />
            Tipos de Processos Controlados
          </CardTitle>
          <CardDescription>
            Catálogo de processos e solicitações gerenciados pelo sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Urbanismo",
              "Tributação",
              "RH",
              "Procuradoria",
              "Compras",
              "Contratos",
            ].map((area) => (
              <Card key={area} className="border-l-4 border-l-green-500">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">{area}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {tiposProcesso
                      .filter((t) => t.area === area)
                      .map((tipo, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>{tipo.tipo}</span>
                          <Badge variant="outline" className="text-xs">
                            {tipo.qtd}
                          </Badge>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
