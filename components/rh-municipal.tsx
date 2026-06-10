"use client";

import * as React from "react";
import { fmtBRL } from "@/lib/format";
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
  TableFooter,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
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
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserMultipleIcon,
  Wallet01Icon,
  AddMoneyCircleIcon,
  Clock01Icon,
  ArrowUp01Icon,
  Building04Icon,
  GraduationScrollIcon,
  HeartCheckIcon,
  UserIcon,
  Analytics01Icon,
  PieChart02Icon,
  ChartLineData02Icon,
  Calendar01Icon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  Target01Icon,
  BulbIcon,
  SecurityCheckIcon,
  UserBlockIcon,
  TimeQuarterPassIcon,
  CoinsDollarIcon,
  PercentSquareIcon,
  GroupIcon,
  UserAdd01Icon,
  UserRemove01Icon,
} from "@hugeicons/core-free-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { KpiCard } from "@/components/ui/kpi-card";
import { useSnapshot } from "@/components/use-snapshot";
import { RH_SNAPSHOT } from "@/lib/demo-rh";

// Função para formatar valores em reais
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Função para formatar valores em milhões
function formatMillions(value: number): string {
  return `R$ ${(value / 1000000).toFixed(1)}M`;
}

// Configuração dos gráficos
const chartConfig = {
  funcionarios: {
    label: "Funcionários",
    color: "var(--chart-1)",
  },
  salario: {
    label: "Salários",
    color: "var(--chart-1)",
  },
  extras: {
    label: "Horas Extras",
    color: "var(--chart-2)",
  },
  beneficios: {
    label: "Benefícios",
    color: "var(--chart-3)",
  },
  adicionais: {
    label: "Adicionais",
    color: "var(--chart-4)",
  },
  absenteismo: {
    label: "Absenteísmo",
    color: "var(--chart-5)",
  },
  admissoes: {
    label: "Admissões",
    color: "var(--chart-1)",
  },
  demissoes: {
    label: "Demissões",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function RHMunicipal() {
  const {
    dadosSecretarias,
    dadosFolha,
    evolucaoFolha,
    absenteismoMensal,
    turnoverMensal,
    distribuicaoCargo,
    verbasProventos,
    metasRH,
    peopleAnalytics,
    eventosRH,
    limitePessoalLRF,
    custoPorFuncionario,
    projecaoAposentadorias,
    totalAposentadorias5Anos,
    percentualQuadro,
    benchmarkRH,
    capacitacaoDesenvolvimento,
    totalHorasCapacitacao,
    totalInvestimentoCapacitacao,
    totalParticipantes,
  } = useSnapshot("rh", RH_SNAPSHOT);
  const [periodoSelecionado] = React.useState("2024");
  const [abaSelecionada, setAbaSelecionada] = React.useState("folha");

  // Cálculos totais
  const totalFuncionarios = dadosSecretarias.reduce(
    (acc, s) => acc + s.funcionarios,
    0,
  );
  const totalSalarios = dadosSecretarias.reduce(
    (acc, s) => acc + s.salarioTotal,
    0,
  );
  const totalHorasExtras = dadosSecretarias.reduce(
    (acc, s) => acc + s.horasExtras,
    0,
  );
  const totalVagas = dadosSecretarias.reduce((acc, s) => acc + s.vagas, 0);

  return (
    <div className="space-y-8">
      {/* KPIs Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total de Funcionários"
          icon={UserMultipleIcon}
          value={totalFuncionarios.toLocaleString("pt-BR")}
          borderColor="border-l-blue-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-green-600"
              />
              <span className="text-green-600">+3.2%</span>
              <span>vs {Number(periodoSelecionado) - 1}</span>
            </div>
          }
        />
        <KpiCard
          title="Folha de Pagamento"
          icon={Wallet01Icon}
          value={formatMillions(
            dadosFolha.salarioBase +
              dadosFolha.horasExtras +
              dadosFolha.adicionais,
          )}
          borderColor="border-l-green-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-green-600"
              />
              <span className="text-green-600">+5.8%</span>
              <span>vs. mês anterior</span>
            </div>
          }
        />
        <KpiCard
          title="Horas Extras"
          icon={Clock01Icon}
          value={fmtBRL(dadosFolha.horasExtras)}
          borderColor="border-l-amber-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="text-amber-600 font-medium">127.8%</span>
              <span>do limite</span>
            </div>
          }
        />
        <KpiCard
          title="Absenteísmo"
          icon={PercentSquareIcon}
          value="4.3%"
          borderColor="border-l-purple-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-red-600"
              />
              <span className="text-red-600">+0.3pp</span>
              <span>acima da meta</span>
            </div>
          }
        />
      </div>

      {/* KPIs Secundários */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Educação"
          icon={GraduationScrollIcon}
          value="298"
          borderColor="border-l-blue-500"
          footer={
            <p className="text-xs text-muted-foreground">26.4% do quadro</p>
          }
        />
        <KpiCard
          title="Saúde"
          icon={HeartCheckIcon}
          value="195"
          borderColor="border-l-green-500"
          footer={
            <p className="text-xs text-muted-foreground">17.3% do quadro</p>
          }
        />
        <KpiCard
          title="Admissões (Mês)"
          icon={UserAdd01Icon}
          value="9"
          borderColor="border-l-emerald-500"
          footer={
            <p className="text-xs text-muted-foreground">+3 saldo líquido</p>
          }
        />
        <KpiCard
          title="Turnover"
          icon={UserRemove01Icon}
          value="8.5%"
          borderColor="border-l-purple-500"
          footer={
            <p className="text-xs text-muted-foreground">Meta: 10% a.a.</p>
          }
        />
      </div>

      {/* Gráficos e Tabelas */}
      <Tabs
        value={abaSelecionada}
        onValueChange={setAbaSelecionada}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="folha">Folha de Pagamento</TabsTrigger>
          <TabsTrigger value="secretarias">Secretarias</TabsTrigger>
          <TabsTrigger value="indicadores">Indicadores</TabsTrigger>
          <TabsTrigger value="verbas">Verbas</TabsTrigger>
          <TabsTrigger value="analytics">Análise de Pessoas</TabsTrigger>
        </TabsList>

        {/* Tab Folha de Pagamento */}
        <TabsContent value="folha" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Evolução da Folha */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={ChartLineData02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Evolução da Folha de Pagamento
                </CardTitle>
                <CardDescription>Valores mensais em R$</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[300px] w-full"
                >
                  <AreaChart data={evolucaoFolha}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="mes"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        `${(value / 1000000).toFixed(1)}M`
                      }
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="salario"
                      stackId="1"
                      stroke="var(--chart-1)"
                      fill="var(--chart-1)"
                      fillOpacity={0.6}
                      name="Salários"
                    />
                    <Area
                      type="monotone"
                      dataKey="extras"
                      stackId="1"
                      stroke="var(--chart-2)"
                      fill="var(--chart-2)"
                      fillOpacity={0.6}
                      name="Horas Extras"
                    />
                    <Area
                      type="monotone"
                      dataKey="beneficios"
                      stackId="1"
                      stroke="var(--chart-3)"
                      fill="var(--chart-3)"
                      fillOpacity={0.6}
                      name="Benefícios"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Composição da Folha */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={PieChart02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Composição da Folha
                </CardTitle>
                <CardDescription>Distribuição dos componentes</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[300px] w-full"
                >
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Salário Base",
                          value: dadosFolha.salarioBase,
                          fill: "var(--chart-1)",
                        },
                        {
                          name: "Horas Extras",
                          value: dadosFolha.horasExtras,
                          fill: "var(--chart-2)",
                        },
                        {
                          name: "Adicionais",
                          value: dadosFolha.adicionais,
                          fill: "var(--chart-3)",
                        },
                        {
                          name: "Benefícios",
                          value: dadosFolha.beneficios,
                          fill: "var(--chart-4)",
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-[var(--chart-1)]" />
                    <span>
                      Salário Base: {formatMillions(dadosFolha.salarioBase)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-[var(--chart-2)]" />
                    <span>
                      Horas Extras: {formatCurrency(dadosFolha.horasExtras)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-[var(--chart-3)]" />
                    <span>
                      Adicionais: {formatCurrency(dadosFolha.adicionais)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-[var(--chart-4)]" />
                    <span>
                      Benefícios: {formatCurrency(dadosFolha.beneficios)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo Financeiro */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={AddMoneyCircleIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Resumo Financeiro da Folha
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600 dark:text-green-400">
                    Proventos
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Salário Base
                      </span>
                      <span>{formatCurrency(dadosFolha.salarioBase)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Horas Extras
                      </span>
                      <span>{formatCurrency(dadosFolha.horasExtras)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Adicionais</span>
                      <span>{formatCurrency(dadosFolha.adicionais)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Benefícios</span>
                      <span>{formatCurrency(dadosFolha.beneficios)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total Bruto</span>
                      <span>
                        {formatCurrency(
                          dadosFolha.salarioBase +
                            dadosFolha.horasExtras +
                            dadosFolha.adicionais +
                            dadosFolha.beneficios,
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-red-600 dark:text-red-400">
                    Descontos
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">INSS</span>
                      <span>{formatCurrency(dadosFolha.inss)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IRRF</span>
                      <span>{formatCurrency(dadosFolha.irrf)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Outros</span>
                      <span>{formatCurrency(dadosFolha.outrosDescontos)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total Descontos</span>
                      <span>{formatCurrency(dadosFolha.descontos)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                    Líquido
                  </h4>
                  <div className="text-3xl font-bold">
                    {formatCurrency(dadosFolha.salarioLiquido)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Valor líquido a pagar
                  </p>
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">
                      Salário médio por funcionário:
                    </p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(
                        Math.round(
                          dadosFolha.salarioLiquido /
                            dadosFolha.totalFuncionarios,
                        ),
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Secretarias */}
        <TabsContent value="secretarias" className="space-y-4">
          {/* Gráfico de Distribuição */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Building04Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Funcionários por Secretaria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[300px] w-full"
                >
                  <BarChart
                    data={dadosSecretarias.slice(0, 6)}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      dataKey="nome"
                      type="category"
                      width={120}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="funcionarios"
                      fill="var(--chart-1)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
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
                  Horas Extras por Secretaria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[300px] w-full"
                >
                  <BarChart
                    data={dadosSecretarias.slice(0, 6)}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <YAxis
                      dataKey="nome"
                      type="category"
                      width={120}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="horasExtras"
                      fill="var(--chart-2)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Secretarias */}
          <Card>
            <CardHeader>
              <CardTitle>Detalhamento por Secretaria</CardTitle>
              <CardDescription>
                Visão geral de recursos humanos por órgão
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Secretaria</TableHead>
                    <TableHead className="text-right">Funcionários</TableHead>
                    <TableHead className="text-right">Folha</TableHead>
                    <TableHead className="text-right">H.Extras</TableHead>
                    <TableHead className="text-right">Absenteísmo</TableHead>
                    <TableHead className="text-right">Turnover</TableHead>
                    <TableHead className="text-right">Vagas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosSecretarias.map((secretaria) => (
                    <TableRow key={secretaria.codigo}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="size-3 rounded-full"
                            style={{ backgroundColor: secretaria.cor }}
                          />
                          <div>
                            <p className="font-medium">{secretaria.nome}</p>
                            <p className="text-xs text-muted-foreground">
                              {secretaria.codigo}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {secretaria.funcionarios}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(secretaria.salarioTotal)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(secretaria.horasExtras)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            secretaria.absenteismo > 5
                              ? "destructive"
                              : secretaria.absenteismo > 4
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {secretaria.absenteismo}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            secretaria.turnover > 10
                              ? "destructive"
                              : secretaria.turnover > 8
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {secretaria.turnover}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {secretaria.vagas > 0 ? (
                          <Badge
                            variant="outline"
                            className="bg-amber-50 dark:bg-amber-950/30"
                          >
                            {secretaria.vagas} vagas
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      {totalFuncionarios}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totalSalarios)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totalHorasExtras)}
                    </TableCell>
                    <TableCell className="text-right font-bold">4.3%</TableCell>
                    <TableCell className="text-right font-bold">8.5%</TableCell>
                    <TableCell className="text-right font-bold">
                      {totalVagas} vagas
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Indicadores */}
        <TabsContent value="indicadores" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Absenteísmo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={UserBlockIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Evolução do Absenteísmo
                </CardTitle>
                <CardDescription>
                  Taxa mensal de faltas e ausências
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[250px] w-full"
                >
                  <LineChart data={absenteismoMensal}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="mes"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      domain={[0, 8]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="taxa"
                      stroke="var(--chart-1)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ChartContainer>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Média:</span>
                    <span className="ml-1 font-semibold">4.3%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Meta:</span>
                    <span className="ml-1 font-semibold text-green-600">
                      4.0%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Turnover */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={GroupIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Movimentação de Pessoal
                </CardTitle>
                <CardDescription>Admissões e demissões mensais</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[250px] w-full"
                >
                  <BarChart data={turnoverMensal}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="mes"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="admissoes"
                      fill="var(--chart-1)"
                      radius={[4, 4, 0, 0]}
                      name="Admissões"
                    />
                    <Bar
                      dataKey="demissoes"
                      fill="var(--chart-2)"
                      radius={[4, 4, 0, 0]}
                      name="Demissões"
                    />
                  </BarChart>
                </ChartContainer>
                <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-center">
                  <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded">
                    <p className="text-muted-foreground">Admissões</p>
                    <p className="font-bold text-green-600">133</p>
                  </div>
                  <div className="p-2 bg-red-50 dark:bg-red-950/30 rounded">
                    <p className="text-muted-foreground">Demissões</p>
                    <p className="font-bold text-red-600">96</p>
                  </div>
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded">
                    <p className="text-muted-foreground">Saldo</p>
                    <p className="font-bold text-blue-600">+37</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Metas e Indicadores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Target01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Metas e Indicadores de RH
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Indicador</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Meta</TableHead>
                    <TableHead className="text-right">Realizado</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metasRH.map((meta, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {meta.indicador}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {meta.descricao}
                      </TableCell>
                      <TableCell className="text-right">
                        {meta.unidade === "R$"
                          ? formatCurrency(meta.meta)
                          : `${meta.meta}${meta.unidade}`}
                      </TableCell>
                      <TableCell className="text-right">
                        {meta.unidade === "R$"
                          ? formatCurrency(meta.realizado)
                          : `${meta.realizado}${meta.unidade}`}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            meta.status === "atingido" ? "default" : "secondary"
                          }
                          className={
                            meta.status === "atingido" ? "bg-green-600" : ""
                          }
                        >
                          {meta.status === "atingido" ? "Atingido" : "Atenção"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Verbas */}
        <TabsContent value="verbas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={CoinsDollarIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Verbas e Proventos
              </CardTitle>
              <CardDescription>
                Detalhamento dos componentes da folha de pagamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verbasProventos.map((verba) => (
                    <TableRow key={verba.codigo}>
                      <TableCell className="font-mono">
                        {verba.codigo}
                      </TableCell>
                      <TableCell>{verba.descricao}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            verba.tipo === "provento"
                              ? "default"
                              : "destructive"
                          }
                          className={
                            verba.tipo === "provento" ? "bg-green-600" : ""
                          }
                        >
                          {verba.tipo === "provento" ? "Provento" : "Desconto"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(verba.valor)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="font-bold">
                      Total Proventos
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-600">
                      {formatCurrency(
                        verbasProventos
                          .filter((v) => v.tipo === "provento")
                          .reduce((acc, v) => acc + v.valor, 0),
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} className="font-bold">
                      Total Descontos
                    </TableCell>
                    <TableCell className="text-right font-bold text-red-600">
                      {formatCurrency(
                        verbasProventos
                          .filter((v) => v.tipo === "desconto")
                          .reduce((acc, v) => acc + v.valor, 0),
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          {/* Distribuição por Cargo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={UserIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Distribuição por Cargo/Função
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cargo</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead className="text-right">Percentual</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {distribuicaoCargo.map((cargo) => (
                    <TableRow key={cargo.cargo}>
                      <TableCell>{cargo.cargo}</TableCell>
                      <TableCell className="text-right">
                        {cargo.quantidade}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Progress
                            value={cargo.percentual}
                            className="w-16 h-2"
                          />
                          <span className="w-12 text-right">
                            {cargo.percentual}%
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

        {/* Tab People Analytics */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Analytics01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                People Analytics
              </CardTitle>
              <CardDescription>
                Análise de diversidade e perfil do quadro funcional
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Distribuição por Sexo */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Distribuição por Sexo</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[200px] w-full"
                >
                  <PieChart>
                    <Pie
                      data={peopleAnalytics.sexo.map((item, index) => ({
                        name: item.sexo,
                        value: item.quantidade,
                        fill: index === 0 ? "var(--chart-1)" : "var(--chart-2)",
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  {peopleAnalytics.sexo.map((item, index) => (
                    <div
                      key={item.sexo}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="size-3 rounded-full"
                          style={{
                            backgroundColor:
                              index === 0 ? "var(--chart-1)" : "var(--chart-2)",
                          }}
                        />
                        <span>{item.sexo}</span>
                      </div>
                      <span className="font-semibold">
                        {item.quantidade} ({item.percentual}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Distribuição por Raça/Cor */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Distribuição por Raça/Cor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[200px] w-full"
                >
                  <PieChart>
                    <Pie
                      data={peopleAnalytics.racaCor
                        .slice(0, 4)
                        .map((item, index) => ({
                          name: item.raca,
                          value: item.quantidade,
                          fill: `var(--chart-${index + 1})`,
                        }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="mt-4 space-y-1">
                  {peopleAnalytics.racaCor.map((item, index) => (
                    <div
                      key={item.raca}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="size-2 rounded-full"
                          style={{
                            backgroundColor: `var(--chart-${(index % 5) + 1})`,
                          }}
                        />
                        <span className="text-xs">{item.raca}</span>
                      </div>
                      <span className="text-xs font-semibold">
                        {item.percentual}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Faixa Etária */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Faixa Etária</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[200px] w-full"
                >
                  <BarChart
                    data={peopleAnalytics.faixaEtaria}
                    layout="vertical"
                  >
                    <XAxis type="number" />
                    <YAxis
                      dataKey="faixa"
                      type="category"
                      width={70}
                      tick={{ fontSize: 10 }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="quantidade"
                      fill="var(--chart-3)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Escolaridade */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Escolaridade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {peopleAnalytics.escolaridade.map((item) => (
                    <div key={item.nivel} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-xs">{item.nivel}</span>
                        <span className="text-xs font-semibold">
                          {item.percentual}%
                        </span>
                      </div>
                      <Progress value={item.percentual} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tempo de Serviço */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tempo de Serviço</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[200px] w-full"
                >
                  <BarChart data={peopleAnalytics.tempoServico}>
                    <XAxis
                      dataKey="faixa"
                      tick={{ fontSize: 9 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="quantidade"
                      fill="var(--chart-4)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Tipo de Vínculo */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tipo de Vínculo</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[200px] w-full"
                >
                  <PieChart>
                    <Pie
                      data={peopleAnalytics.tipoVinculo.map((item, index) => ({
                        name: item.tipo,
                        value: item.quantidade,
                        fill: `var(--chart-${index + 1})`,
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="mt-4 space-y-1">
                  {peopleAnalytics.tipoVinculo.map((item, index) => (
                    <div
                      key={item.tipo}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="size-2 rounded-full"
                          style={{
                            backgroundColor: `var(--chart-${index + 1}))`,
                          }}
                        />
                        <span className="text-xs">{item.tipo}</span>
                      </div>
                      <span className="text-xs font-semibold">
                        {item.percentual}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* PCD e Diversidade */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={SecurityCheckIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Inclusão e Diversidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">
                    Pessoas com Deficiência (PCD)
                  </h4>
                  <div className="text-3xl font-bold text-blue-600">45</div>
                  <p className="text-sm text-muted-foreground">
                    4.0% do quadro (Meta: 5%)
                  </p>
                  <Progress value={80} className="mt-2 h-2" />
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">
                    Mulheres em Cargo de Liderança
                  </h4>
                  <div className="text-3xl font-bold text-purple-600">38%</div>
                  <p className="text-sm text-muted-foreground">
                    42 de 111 cargos de chefia
                  </p>
                  <Progress value={38} className="mt-2 h-2" />
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">
                    Autodeclarados Negros/Pardos
                  </h4>
                  <div className="text-3xl font-bold text-amber-600">58.4%</div>
                  <p className="text-sm text-muted-foreground">
                    660 funcionários
                  </p>
                  <Progress value={58.4} className="mt-2 h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações de Diversidade */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={BulbIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Ações e Recomendações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="diversidade">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                        className="size-4 text-green-600"
                      />
                      <span>Metas de Diversidade Atingidas</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pl-6">
                      <div className="flex gap-2">
                        <HugeiconsIcon
                          icon={CheckmarkCircle02Icon}
                          strokeWidth={2}
                          className="size-4 mt-0.5 text-green-600 shrink-0"
                        />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">
                            Paridade de gênero:
                          </strong>{" "}
                          54.2% de mulheres no quadro funcional, superando meta
                          de 50%.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <HugeiconsIcon
                          icon={CheckmarkCircle02Icon}
                          strokeWidth={2}
                          className="size-4 mt-0.5 text-green-600 shrink-0"
                        />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">
                            Representatividade racial:
                          </strong>{" "}
                          58.4% de autodeclarados negros/pardos, compatível com
                          demografia local.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="atencao">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        strokeWidth={2}
                        className="size-4 text-amber-600"
                      />
                      <span>Pontos de Atenção</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pl-6">
                      <div className="flex gap-2">
                        <HugeiconsIcon
                          icon={Alert02Icon}
                          strokeWidth={2}
                          className="size-4 mt-0.5 text-amber-600 shrink-0"
                        />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">
                            Cotas PCD:
                          </strong>{" "}
                          Atualmente em 4%, abaixo da meta legal de 5%.
                          Necessário reforçar recrutamento inclusivo.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <HugeiconsIcon
                          icon={Alert02Icon}
                          strokeWidth={2}
                          className="size-4 mt-0.5 text-amber-600 shrink-0"
                        />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">
                            Liderança feminina:
                          </strong>{" "}
                          38% de mulheres em cargos de chefia. Recomenda-se
                          programa de desenvolvimento de lideranças.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <HugeiconsIcon
                          icon={Alert02Icon}
                          strokeWidth={2}
                          className="size-4 mt-0.5 text-amber-600 shrink-0"
                        />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Sucessão:</strong>{" "}
                          20.1% do quadro com mais de 15 anos de serviço.
                          Planejamento de sucessão recomendado.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Limite de Pessoal (LRF) + Custo por Funcionario */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={SecurityCheckIcon}
                strokeWidth={2}
                className="size-5"
              />
              Limite de Pessoal (LRF)
            </CardTitle>
            <CardDescription>
              Despesa com pessoal:{" "}
              <strong
                className={
                  limitePessoalLRF.percentualAtual <= 48.6
                    ? "text-green-600"
                    : limitePessoalLRF.percentualAtual <= 51.3
                      ? "text-amber-600"
                      : "text-red-600"
                }
              >
                {limitePessoalLRF.percentualAtual}%
              </strong>{" "}
              da RCL (Limite: 54%)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Despesa Atual</span>
                <span className="font-semibold">
                  {formatMillions(limitePessoalLRF.despesaPessoal)} (
                  {limitePessoalLRF.percentualAtual}%)
                </span>
              </div>
              <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="absolute h-full bg-blue-500 rounded-full"
                  style={{
                    width: `${(limitePessoalLRF.percentualAtual / 54) * 100}%`,
                  }}
                />
                <div
                  className="absolute h-full w-0.5 bg-amber-500"
                  style={{ left: `${(48.6 / 54) * 100}%` }}
                  title="Limite de Alerta (48.6%)"
                />
                <div
                  className="absolute h-full w-0.5 bg-red-500"
                  style={{ left: `${(51.3 / 54) * 100}%` }}
                  title="Limite Prudencial (51.3%)"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span className="text-amber-600">Alerta 48.6%</span>
                <span className="text-red-600">Prudencial 51.3%</span>
                <span>Limite 54%</span>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">RCL</p>
                <p className="text-sm font-bold">
                  {formatMillions(limitePessoalLRF.receitaCorrenteLiquida)}
                </p>
              </div>
              <div className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">
                  Margem Disponivel
                </p>
                <p className="text-sm font-bold text-green-600">
                  {formatMillions(
                    limitePessoalLRF.limiteMaximo -
                      limitePessoalLRF.despesaPessoal,
                  )}
                </p>
              </div>
              <div className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">Até Alerta</p>
                <p className="text-sm font-bold text-amber-600">
                  {formatMillions(
                    limitePessoalLRF.limiteAlerta -
                      limitePessoalLRF.despesaPessoal,
                  )}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Evolução Trimestral
              </p>
              <ChartContainer config={chartConfig} className="h-[150px] w-full">
                <LineChart data={limitePessoalLRF.evolucaoTrimestral}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="trimestre"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[42, 55]}
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fontSize: 10 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="percentual"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="% RCL"
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={CoinsDollarIcon}
                strokeWidth={2}
                className="size-5"
              />
              Custo por Funcionário
            </CardTitle>
            <CardDescription>
              Custo médio mensal por secretaria (salário + horas extras)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {custoPorFuncionario.slice(0, 8).map((item) => (
              <div key={item.secretaria} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate max-w-[140px]">
                      {item.nome}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {item.funcionarios} func.
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {formatCurrency(item.custoMedio)}
                    </span>
                    <Badge
                      variant={
                        Number(item.percentualHE) > 10
                          ? "destructive"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      HE: {item.percentualHE}%
                    </Badge>
                  </div>
                </div>
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{
                      width: `${(item.custoMedio / custoPorFuncionario[0].custoMedio) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}

            <Separator />

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">
                  Custo Médio Geral
                </p>
                <p className="text-lg font-bold">
                  {formatCurrency(
                    Math.round(totalSalarios / totalFuncionarios),
                  )}
                </p>
              </div>
              <div className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">HE Médio/Func.</p>
                <p className="text-lg font-bold text-amber-600">
                  {formatCurrency(
                    Math.round(totalHorasExtras / totalFuncionarios),
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projeção de Aposentadorias + Capacitação e Desenvolvimento */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={TimeQuarterPassIcon}
                strokeWidth={2}
                className="size-5"
              />
              Projeção de Aposentadorias
            </CardTitle>
            <CardDescription>
              Próximos 5 anos:{" "}
              <strong className="text-amber-600">
                {totalAposentadorias5Anos} servidores
              </strong>{" "}
              ({percentualQuadro}% do quadro)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <BarChart data={projecaoAposentadorias}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="ano"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="quantidade"
                  fill="var(--chart-4)"
                  radius={[4, 4, 0, 0]}
                  name="Aposentadorias"
                />
              </BarChart>
            </ChartContainer>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ano</TableHead>
                  <TableHead className="text-right">Qtd.</TableHead>
                  <TableHead className="text-right">Impacto Folha</TableHead>
                  <TableHead>Cargos Principais</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projecaoAposentadorias.map((item) => (
                  <TableRow key={item.ano}>
                    <TableCell className="font-medium">{item.ano}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">{item.quantidade}</Badge>
                    </TableCell>
                    <TableCell className="text-right text-amber-600 font-medium">
                      {formatMillions(item.impactoFolha)}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                      {item.cargos}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">
                    {totalAposentadorias5Anos}
                  </TableCell>
                  <TableCell className="text-right font-bold text-amber-600">
                    {formatMillions(
                      projecaoAposentadorias.reduce(
                        (a, b) => a + b.impactoFolha,
                        0,
                      ),
                    )}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={GraduationScrollIcon}
                strokeWidth={2}
                className="size-5"
              />
              Capacitação e Desenvolvimento
            </CardTitle>
            <CardDescription>
              Total: <strong>{totalHorasCapacitacao}h</strong> em{" "}
              {capacitacaoDesenvolvimento.length} programas | Investimento:{" "}
              <strong>{formatCurrency(totalInvestimentoCapacitacao)}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {capacitacaoDesenvolvimento.map((programa) => (
              <div key={programa.programa} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{programa.programa}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {programa.participantes} part.
                    </Badge>
                    <Badge
                      variant={
                        programa.conclusao >= 90 ? "default" : "secondary"
                      }
                      className={programa.conclusao >= 90 ? "bg-green-600" : ""}
                    >
                      {programa.conclusao}%
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{programa.horas}h</span>
                  <span>{formatCurrency(programa.investimento)}</span>
                  <span>
                    R${" "}
                    {Math.round(programa.investimento / programa.participantes)}
                    /part.
                  </span>
                </div>
                <Progress value={programa.conclusao} className="h-1.5" />
              </div>
            ))}

            <Separator />

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">Participantes</p>
                <p className="text-lg font-bold">{totalParticipantes}</p>
                <p className="text-xs text-muted-foreground">
                  {((totalParticipantes / totalFuncionarios) * 100).toFixed(0)}%
                  do quadro
                </p>
              </div>
              <div className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">h/funcionário</p>
                <p className="text-lg font-bold">
                  {(totalHorasCapacitacao / totalFuncionarios).toFixed(1)}h
                </p>
                <p className="text-xs text-muted-foreground">Meta: 40h/ano</p>
              </div>
              <div className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">
                  Investimento/Func.
                </p>
                <p className="text-lg font-bold">
                  {formatCurrency(
                    Math.round(
                      totalInvestimentoCapacitacao / totalFuncionarios,
                    ),
                  )}
                </p>
                <p className="text-xs text-muted-foreground">anual</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benchmark de RH Municipal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={ChartLineData02Icon}
              strokeWidth={2}
              className="size-5"
            />
            Comparativo de RH municipal
          </CardTitle>
          <CardDescription>
            Comparativo com municípios de porte similar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Município</TableHead>
                <TableHead className="text-right">Custo Médio</TableHead>
                <TableHead className="text-right">Absenteísmo</TableHead>
                <TableHead className="text-right">Turnover</TableHead>
                <TableHead className="text-right">% H.Extras</TableHead>
                <TableHead className="text-right">Capacitação (h)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {benchmarkRH.map((item) => (
                <TableRow
                  key={item.municipio}
                  className={
                    item.destaque
                      ? "bg-blue-50/50 dark:bg-blue-950/20 font-medium"
                      : ""
                  }
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {item.destaque && (
                        <Badge className="bg-blue-600 text-xs">Atual</Badge>
                      )}
                      <span className={item.destaque ? "font-semibold" : ""}>
                        {item.municipio}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={item.custoMedio <= 9800 ? "default" : "outline"}
                      className={item.custoMedio <= 9800 ? "bg-green-600" : ""}
                    >
                      {formatCurrency(item.custoMedio)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={item.absenteismo <= 4.3 ? "default" : "outline"}
                      className={item.absenteismo <= 4.3 ? "bg-green-600" : ""}
                    >
                      {item.absenteismo}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={item.turnover <= 8.5 ? "default" : "outline"}
                      className={item.turnover <= 8.5 ? "bg-green-600" : ""}
                    >
                      {item.turnover}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={item.hePercent <= 7.3 ? "default" : "outline"}
                      className={item.hePercent <= 7.3 ? "bg-green-600" : ""}
                    >
                      {item.hePercent}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={item.capacitacao >= 38 ? "default" : "outline"}
                      className={item.capacitacao >= 38 ? "bg-green-600" : ""}
                    >
                      {item.capacitacao}h
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
            {(() => {
              const mediaRegional = benchmarkRH.find(
                (b) => b.municipio === "Média Regional",
              )!;
              const atual = benchmarkRH.find((b) => b.destaque)!;
              const indicadores = [
                {
                  nome: "Custo Medio",
                  melhor: atual.custoMedio <= mediaRegional.custoMedio,
                },
                {
                  nome: "Absenteismo",
                  melhor: atual.absenteismo <= mediaRegional.absenteismo,
                },
                {
                  nome: "Turnover",
                  melhor: atual.turnover <= mediaRegional.turnover,
                },
                {
                  nome: "H.Extras",
                  melhor: atual.hePercent <= mediaRegional.hePercent,
                },
                {
                  nome: "Capacitacao",
                  melhor: atual.capacitacao >= mediaRegional.capacitacao,
                },
              ];
              return indicadores.map((ind) => (
                <div
                  key={ind.nome}
                  className={`rounded-lg border p-2 text-center ${ind.melhor ? "border-green-300 bg-green-50 dark:bg-green-950/20" : "border-red-300 bg-red-50 dark:bg-red-950/20"}`}
                >
                  <p className="text-xs text-muted-foreground">{ind.nome}</p>
                  <Badge
                    variant={ind.melhor ? "default" : "destructive"}
                    className={`mt-1 ${ind.melhor ? "bg-green-600" : ""}`}
                  >
                    {ind.melhor ? "Acima da Media" : "Abaixo da Media"}
                  </Badge>
                </div>
              ));
            })()}
          </div>
        </CardContent>
      </Card>

      {/* Eventos Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Calendar01Icon}
              strokeWidth={2}
              className="size-5"
            />
            Eventos Recentes de RH
          </CardTitle>
          <CardDescription>
            Últimas movimentações e ações de pessoal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {eventosRH.map((evento, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg border"
              >
                <div
                  className={`size-8 rounded-full flex items-center justify-center ${
                    evento.tipo === "concurso"
                      ? "bg-blue-100 dark:bg-blue-900/30"
                      : evento.tipo === "treinamento"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : evento.tipo === "admissao"
                          ? "bg-purple-100 dark:bg-purple-900/30"
                          : evento.tipo === "avaliacao"
                            ? "bg-amber-100 dark:bg-amber-900/30"
                            : "bg-gray-100 dark:bg-gray-900/30"
                  }`}
                >
                  <HugeiconsIcon
                    icon={
                      evento.tipo === "concurso"
                        ? GraduationScrollIcon
                        : evento.tipo === "treinamento"
                          ? BulbIcon
                          : evento.tipo === "admissao"
                            ? UserAdd01Icon
                            : evento.tipo === "avaliacao"
                              ? Target01Icon
                              : TimeQuarterPassIcon
                    }
                    strokeWidth={2}
                    className="size-4"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{evento.evento}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {evento.data}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {evento.detalhe}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
