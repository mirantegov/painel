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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import {
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
  ResponsiveContainer,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ContactIcon,
  Alert02Icon,
  Clock01Icon,
  Calendar01Icon,
  UserIcon,
  WaveIcon,
  Target01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  Flag01Icon,
  ChartLineData02Icon,
  SecurityCheckIcon,
  Store04Icon,
  CoinsDollarIcon,
} from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { KpiCard } from "@/components/ui/kpi-card";
import { useSnapshot } from "@/components/use-snapshot";
import { COMPRAS_SNAPSHOT } from "@/lib/demo-compras";

const chartConfig = {
  valor: {
    label: "Valor (R$)",
    color: "hsl(var(--chart-1))",
  },
  contratos: {
    label: "Contratos",
    color: "hsl(var(--chart-2))",
  },
  licitacoes: {
    label: "Licitações",
    color: "hsl(var(--chart-3))",
  },
  economia: {
    label: "Economia",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const chartConfigSecretarias = {
  contratos: {
    label: "Contratos",
    color: "#22c55e",
  },
  valor: {
    label: "Valor (R$)",
    color: "#16a34a",
  },
} satisfies ChartConfig;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// Dados simulados para demonstração
const kpiData = [
  {
    title: "Total Contratos Ativos",
    value: "1.247",
    change: "+12%",
    trend: "up",
    icon: ContactIcon,
    description: "Contratos vigentes este mês",
    borderClass: "border-l-4 border-l-blue-500",
  },
  {
    title: "Valor Total Contratado",
    value: "R$ 45.2M",
    change: "+8%",
    trend: "up",
    icon: CoinsDollarIcon,
    description: "Valor acumulado dos contratos",
    borderClass: "border-l-4 border-l-green-500",
  },
  {
    title: "Licitações em Andamento",
    value: "38",
    change: "-5%",
    trend: "down",
    icon: WaveIcon,
    description: "Processos licitatórios ativos",
    borderClass: "border-l-4 border-l-amber-500",
  },
  {
    title: "Economia Obtida",
    value: "R$ 3.8M",
    change: "+23%",
    trend: "up",
    icon: ArrowUp01Icon,
    description: "Economia sobre valor estimado",
    borderClass: "border-l-4 border-l-purple-500",
  },
];

export function ComprasMunicipais() {
  const {
    monthlyData,
    secretariaData,
    modalidadeData,
    recentContracts,
    ongoingBids,
    totaisCompras,
    topFornecedores,
    eventosCompras,
    comparativoAnual,
    metasCompras,
    prazoMedioPorEtapa,
    prazoTotalMedio,
    prazoTotalMeta,
    aditivosContratuais,
    totalAditivos,
    percentualContratosComAditivo,
    valorTotalAditivos,
    participacaoMPE,
    agingContratos,
    benchmarkCompras,
  } = useSnapshot("compras", COMPRAS_SNAPSHOT);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCompactCurrency = (value: number) => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}K`;
    }
    return `R$ ${value}`;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { className: string; text: string }> = {
      ativo: {
        className:
          "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700",
        text: "Ativo",
      },
      "em-andamento": {
        className:
          "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700",
        text: "Em Andamento",
      },
      aberto: {
        className:
          "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700",
        text: "Aberto",
      },
      "em-analise": {
        className:
          "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-100 dark:border-purple-700",
        text: "Em Análise",
      },
      suspenso: {
        className:
          "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-100 dark:border-red-700",
        text: "Suspenso",
      },
    };
    const config = statusConfig[status] || {
      className:
        "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600",
      text: status,
    };
    return <Badge className={config.className}>{config.text}</Badge>;
  };

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <KpiCard
            key={index}
            title={kpi.title}
            icon={kpi.icon}
            value={kpi.value}
            borderColor={kpi.borderClass.replace("border-l-4 ", "")}
            footer={
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  {kpi.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <HugeiconsIcon
                    icon={kpi.trend === "up" ? ArrowUp01Icon : ArrowDown01Icon}
                    strokeWidth={2}
                    className={`size-3 ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  />
                  <span
                    className={
                      kpi.trend === "up" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {kpi.change}
                  </span>
                  <span>vs. mês anterior</span>
                </div>
              </div>
            }
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução Mensal</CardTitle>
            <CardDescription>
              Licitações, contratos e valores dos últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="licitacoes"
                    stroke="var(--color-licitacoes)"
                    strokeWidth={2}
                    name="Licitações"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="contratos"
                    stroke="var(--color-contratos)"
                    strokeWidth={2}
                    name="Contratos"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="valor"
                    stroke="var(--color-valor)"
                    strokeWidth={2}
                    name="Valor (R$)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Contracts by Secretariat */}
        <Card>
          <CardHeader>
            <CardTitle>Contratos por Secretaria</CardTitle>
            <CardDescription>
              Distribuição de contratos e valores por órgão
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigSecretarias}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={secretariaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    yAxisId="left"
                    dataKey="contratos"
                    fill="var(--color-contratos)"
                    name="Contratos"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="valor"
                    fill="var(--color-valor)"
                    name="Valor (R$)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bid Modalities */}
        <Card>
          <CardHeader>
            <CardTitle>Modalidades de Licitação</CardTitle>
            <CardDescription>Distribuição por tipo de processo</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={modalidadeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {modalidadeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Economy Analysis */}
        <KpiCard
          title="Análise de Economia"
          icon={CoinsDollarIcon}
          value="R$ 3.8M"
          valueClassName="text-green-600"
          borderColor="border-l-green-500"
          footer={
            <>
              <p className="text-xs text-muted-foreground">
                Economia obtida vs valor estimado
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Média mensal</span>
                  <span>R$ 633K</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">
                    Percentual economia
                  </span>
                  <span className="text-green-600">8.4%</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Maior economia</span>
                  <span>R$ 420K (Jun)</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Contratos com economia
                  </span>
                  <span>324 de 1.247</span>
                </div>
                <Progress value={26} className="h-2" />
              </div>
            </>
          }
        />

        {/* Contract Status */}
        <KpiCard
          title="Status dos Contratos"
          icon={SecurityCheckIcon}
          value="1.247"
          borderColor="border-l-blue-500"
          footer={
            <>
              <p className="text-xs text-muted-foreground">
                Distribuição por situação atual
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-green-500" />
                    <span className="text-sm">Ativos</span>
                  </div>
                  <span className="font-medium">892 (71.5%)</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-yellow-500" />
                    <span className="text-sm">Em Andamento</span>
                  </div>
                  <span className="font-medium">245 (19.6%)</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-blue-500" />
                    <span className="text-sm">Aguardando Início</span>
                  </div>
                  <span className="font-medium">78 (6.3%)</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-red-500" />
                    <span className="text-sm">Suspensos</span>
                  </div>
                  <span className="font-medium">32 (2.6%)</span>
                </div>
              </div>
              <Separator />
              <p className="text-xs text-muted-foreground">
                Total de Contratos
              </p>
            </>
          }
        />
      </div>

      {/* Tables Section */}
      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contracts">Contratos Recentes</TabsTrigger>
          <TabsTrigger value="bids">Licitações em Andamento</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle>Contratos Recentes</CardTitle>
              <CardDescription>
                Últimos contratos registrados no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Secretaria</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Objeto</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progresso</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">
                        {contract.id}
                      </TableCell>
                      <TableCell>{contract.secretaria}</TableCell>
                      <TableCell>{contract.fornecedor}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {contract.objeto}
                      </TableCell>
                      <TableCell>
                        {formatCompactCurrency(contract.valor)}
                      </TableCell>
                      <TableCell>{getStatusBadge(contract.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={contract.progress}
                            className="w-16 h-2"
                          />
                          <span className="text-xs text-muted-foreground">
                            {contract.progress}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bids">
          <Card>
            <CardHeader>
              <CardTitle>Licitações em Andamento</CardTitle>
              <CardDescription>
                Processos licitatórios atualmente ativos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Modalidade</TableHead>
                    <TableHead>Objeto</TableHead>
                    <TableHead>Valor Estimado</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Participantes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ongoingBids.map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell className="font-medium">{bid.id}</TableCell>
                      <TableCell>{bid.modalidade}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {bid.objeto}
                      </TableCell>
                      <TableCell>
                        {formatCompactCurrency(bid.valorEstimado)}
                      </TableCell>
                      <TableCell>{getStatusBadge(bid.status)}</TableCell>
                      <TableCell>{bid.prazo}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <HugeiconsIcon
                            icon={UserIcon}
                            strokeWidth={2}
                            className="size-4 text-muted-foreground"
                          />
                          <span>{bid.participantes}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Comparativo Anual e Top Fornecedores */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Histórico de Compras */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Evolução Histórica (5 anos)
            </CardTitle>
            <CardDescription>
              Comparativo anual de contratos e economia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  valor: { label: "Valor Contratado", color: "var(--chart-1)" },
                  economia: { label: "Economia", color: "var(--chart-2)" },
                } satisfies ChartConfig
              }
              className="h-[280px] w-full"
            >
              <BarChart data={comparativoAnual} margin={{ left: 0, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="ano"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  }
                />
                <Bar
                  dataKey="valor"
                  fill="var(--color-valor)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="economia"
                  fill="var(--color-economia)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Fornecedores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Store04Icon}
                strokeWidth={2}
                className="size-5"
              />
              Principais Fornecedores
            </CardTitle>
            <CardDescription>
              Top 5 fornecedores por valor contratado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topFornecedores.map((fornecedor, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>{index + 1}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate max-w-[200px]">
                        {fornecedor.nome}
                      </p>
                      <span className="text-sm font-semibold">
                        {formatCompactCurrency(fornecedor.valor)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {fornecedor.cnpj}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {fornecedor.contratos} contratos
                      </Badge>
                    </div>
                    <Progress
                      value={fornecedor.percentual * 10}
                      className="h-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metas e Timeline */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Metas de Compras */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Target01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Metas de Desempenho
            </CardTitle>
            <CardDescription>Indicadores de gestão de compras</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {metasCompras.map((meta, index) => (
                <div key={index} className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{meta.meta}</p>
                    <Badge
                      variant={
                        meta.status === "atingido" ? "default" : "secondary"
                      }
                      className={
                        meta.status === "atingido"
                          ? "bg-green-600"
                          : "bg-amber-600"
                      }
                    >
                      {meta.status === "atingido" ? "Atingido" : "Atenção"}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Meta: {meta.previsto}
                        {meta.unidade}
                      </span>
                      <span className="font-medium">
                        {meta.realizado}
                        {meta.unidade}
                      </span>
                    </div>
                    <Progress
                      value={(meta.realizado / meta.previsto) * 100}
                      className={`h-2 ${meta.status === "atingido" ? "" : "[&>div]:bg-amber-500"}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline de Eventos */}
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
              Últimas movimentações de compras e licitações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventosCompras.map((evento, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`size-2.5 rounded-full ${
                        evento.tipo === "homologacao"
                          ? "bg-green-500"
                          : evento.tipo === "contrato"
                            ? "bg-blue-500"
                            : evento.tipo === "licitacao"
                              ? "bg-amber-500"
                              : evento.tipo === "aditivo"
                                ? "bg-purple-500"
                                : "bg-gray-500"
                      }`}
                    />
                    {index < eventosCompras.length - 1 && (
                      <div className="w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-xs text-muted-foreground">
                      {evento.data}
                    </p>
                    <p className="text-sm">{evento.evento}</p>
                    {evento.valor > 0 && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        {formatCompactCurrency(evento.valor)}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prazo Medio por Etapa e Aditivos Contratuais */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Prazo Medio por Etapa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Clock01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Prazo Médio por Etapa
            </CardTitle>
            <CardDescription>
              Prazo total médio:{" "}
              <strong
                className={
                  prazoTotalMedio <= prazoTotalMeta
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {prazoTotalMedio} dias
              </strong>{" "}
              (meta: {prazoTotalMeta} dias)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {prazoMedioPorEtapa.map((etapa) => (
                <div key={etapa.etapa} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{etapa.etapa}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {etapa.prazoMedio} dias
                      </span>
                      <Badge
                        variant={
                          etapa.prazoMedio <= etapa.meta
                            ? "secondary"
                            : "destructive"
                        }
                        className={
                          etapa.prazoMedio <= etapa.meta
                            ? "text-green-600 text-xs"
                            : "text-xs"
                        }
                      >
                        meta: {etapa.meta}d
                      </Badge>
                    </div>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`absolute h-full rounded-full transition-all ${etapa.prazoMedio <= etapa.meta ? "bg-green-500" : "bg-red-500"}`}
                      style={{
                        width: `${Math.min((etapa.prazoMedio / etapa.meta) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
              <Separator />
              <div className="flex items-center justify-between text-sm font-bold">
                <span>Total</span>
                <div className="flex items-center gap-2">
                  <span>{prazoTotalMedio} dias</span>
                  <Badge variant="secondary" className="text-green-600 text-xs">
                    {prazoTotalMeta - prazoTotalMedio} dias abaixo da meta
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aditivos Contratuais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ContactIcon}
                strokeWidth={2}
                className="size-5"
              />
              Aditivos Contratuais
            </CardTitle>
            <CardDescription>
              {totalAditivos} aditivos (
              {percentualContratosComAditivo.toFixed(1)}% dos contratos) — Valor
              liquido:{" "}
              <strong
                className={
                  valorTotalAditivos >= 0 ? "text-amber-600" : "text-green-600"
                }
              >
                {formatCurrency(valorTotalAditivos)}
              </strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aditivosContratuais.map((aditivo) => (
                <div
                  key={aditivo.tipo}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {aditivo.tipo}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {aditivo.quantidade} aditivos
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <Progress
                        value={aditivo.percentual}
                        className="h-1.5 flex-1 mr-3"
                      />
                      <span className="text-xs text-muted-foreground">
                        {aditivo.percentual}%
                      </span>
                    </div>
                  </div>
                  {aditivo.valor !== 0 && (
                    <span
                      className={`ml-3 text-sm font-medium ${aditivo.valor > 0 ? "text-red-600" : "text-green-600"}`}
                    >
                      {aditivo.valor > 0 ? "+" : ""}
                      {formatCompactCurrency(aditivo.valor)}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3">
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Alert02Icon}
                  strokeWidth={2}
                  className="size-4 text-amber-600"
                />
                <p className="text-sm">
                  <strong className="text-amber-600">
                    Monitoramento recomendado.
                  </strong>{" "}
                  <span className="text-muted-foreground">
                    38% dos aditivos combinam prazo e valor, sugerindo
                    necessidade de melhor planejamento inicial.
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Participacao de MPEs e Aging de Contratos */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Participacao de MPEs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Store04Icon}
                strokeWidth={2}
                className="size-5"
              />
              Participação de MPEs
            </CardTitle>
            <CardDescription>
              Evolução da participação de Micro e Pequenas Empresas (meta: 25%)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  percentualMPE: { label: "MPE (%)", color: "var(--chart-1)" },
                  meta: { label: "Meta (%)", color: "var(--chart-3)" },
                } satisfies ChartConfig
              }
              className="h-[200px] w-full"
            >
              <BarChart data={participacaoMPE} margin={{ left: 0, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="ano"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[0, 35]}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="percentualMPE"
                  fill="var(--color-percentualMPE)"
                  radius={[4, 4, 0, 0]}
                  name="MPE (%)"
                />
                <Line
                  type="monotone"
                  dataKey="meta"
                  stroke="var(--color-meta)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Meta (%)"
                />
              </BarChart>
            </ChartContainer>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="rounded-lg border p-2 text-center">
                <p className="text-xs text-muted-foreground">Atual</p>
                <p className="text-lg font-bold text-amber-600">22%</p>
              </div>
              <div className="rounded-lg border p-2 text-center">
                <p className="text-xs text-muted-foreground">Meta</p>
                <p className="text-lg font-bold">25%</p>
              </div>
              <div className="rounded-lg border p-2 text-center">
                <p className="text-xs text-muted-foreground">Gap</p>
                <p className="text-lg font-bold text-red-600">-3pp</p>
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Tendencia positiva:</strong>{" "}
                A participacao de MPEs cresceu de 18% (2020) para 22% (2024).
                Para atingir a meta, considere ampliar programas de capacitacao
                e reservar cotas em licitacoes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Aging de Contratos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Calendar01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Faixas de vencimento dos contratos
            </CardTitle>
            <CardDescription>
              Distribuição de contratos por prazo de vencimento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {agingContratos.map((faixa) => {
                const riscoColor =
                  faixa.risco === "critico"
                    ? "bg-red-500"
                    : faixa.risco === "alto"
                      ? "bg-orange-500"
                      : faixa.risco === "medio"
                        ? "bg-amber-500"
                        : faixa.risco === "baixo"
                          ? "bg-blue-500"
                          : "bg-green-500";
                const riscoText =
                  faixa.risco === "critico"
                    ? "text-red-600"
                    : faixa.risco === "alto"
                      ? "text-orange-600"
                      : faixa.risco === "medio"
                        ? "text-amber-600"
                        : faixa.risco === "baixo"
                          ? "text-blue-600"
                          : "text-green-600";
                return (
                  <div key={faixa.faixa} className="flex items-center gap-3">
                    <div
                      className={`size-3 rounded-full ${riscoColor} shrink-0`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {faixa.faixa}
                        </span>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            {faixa.quantidade} contratos
                          </Badge>
                          <span className={`font-medium ${riscoText}`}>
                            {formatCompactCurrency(faixa.valor)}
                          </span>
                        </div>
                      </div>
                      <div className="relative mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={`absolute h-full rounded-full ${riscoColor} transition-all`}
                          style={{
                            width: `${(faixa.quantidade / totaisCompras.contratosAtivos) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Separator className="my-3" />
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-red-200 dark:border-red-800 p-3 text-center">
                <p className="text-xs text-muted-foreground">
                  Atenção Imediata
                </p>
                <p className="text-lg font-bold text-red-600">57</p>
                <p className="text-xs text-muted-foreground">
                  Vencidos + 30 dias
                </p>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <p className="text-xs text-muted-foreground">Valor em Risco</p>
                <p className="text-lg font-bold text-amber-600">
                  {formatCompactCurrency(980000 + 2800000)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Renovacao urgente
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benchmark de Compras Municipal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={ChartLineData02Icon}
              strokeWidth={2}
              className="size-5"
            />
            Comparativo de compras municipal
          </CardTitle>
          <CardDescription>
            Comparação de indicadores de compras com municípios de porte similar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Município</TableHead>
                <TableHead className="text-right">Economia</TableHead>
                <TableHead className="text-right">Prazo (dias)</TableHead>
                <TableHead className="text-right">MPE</TableHead>
                <TableHead className="text-right">Aditivos</TableHead>
                <TableHead className="text-right">Concentração</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {benchmarkCompras.map((mun) => (
                <TableRow
                  key={mun.municipio}
                  className={mun.destaque ? "bg-primary/5 font-medium" : ""}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {mun.destaque && (
                        <HugeiconsIcon
                          icon={Flag01Icon}
                          strokeWidth={2}
                          className="size-3.5 text-amber-500"
                        />
                      )}
                      {mun.municipio}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        mun.economia >= 8
                          ? "secondary"
                          : mun.economia >= 6
                            ? "outline"
                            : "destructive"
                      }
                      className={
                        mun.economia >= 8
                          ? "text-green-600"
                          : mun.economia >= 6
                            ? "text-amber-600"
                            : ""
                      }
                    >
                      {mun.economia}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        mun.prazo <= 40
                          ? "secondary"
                          : mun.prazo <= 50
                            ? "outline"
                            : "destructive"
                      }
                      className={
                        mun.prazo <= 40
                          ? "text-green-600"
                          : mun.prazo <= 50
                            ? "text-amber-600"
                            : ""
                      }
                    >
                      {mun.prazo}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{mun.mpe}%</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        mun.aditivos <= 12
                          ? "secondary"
                          : mun.aditivos <= 18
                            ? "outline"
                            : "destructive"
                      }
                      className={
                        mun.aditivos <= 12
                          ? "text-green-600"
                          : mun.aditivos <= 18
                            ? "text-amber-600"
                            : ""
                      }
                    >
                      {mun.aditivos}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {mun.concentracao}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg border p-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Destaques Positivos
              </p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-green-600">
                  Melhor economia (8.4%)
                </p>
                <p className="text-sm font-medium text-green-600">
                  Menor prazo (38 dias)
                </p>
                <p className="text-sm font-medium text-green-600">
                  Menor taxa de aditivos (12%)
                </p>
              </div>
            </div>
            <div className="rounded-lg border p-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Pontos de Melhoria
              </p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-amber-600">
                  Participação MPE: 22% vs. 30% do melhor
                </p>
                <p className="text-xs text-muted-foreground">
                  Ampliar programas de incentivo a MPEs para atingir a meta de
                  25%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
