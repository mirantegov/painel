"use client";

import * as React from "react";
import { useSnapshot } from "@/components/use-snapshot";
import { SAUDE_SNAPSHOT } from "@/lib/demo-saude";
import {
  HeartCheckIcon,
  Hospital01Icon,
  UserMultipleIcon,
  MedicineBottle02Icon,
  Stethoscope02Icon,
  Calendar01Icon,
  ChartLineData02Icon,
  Wallet01Icon,
  MoneyReceiveSquareIcon,
  BankIcon,
  Invoice01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  FilterIcon,
  RefreshIcon,
  Alert02Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Target01Icon,
  AlertCircleIcon,
  SecurityCheckIcon,
  Activity01Icon,
  FirstAidKitIcon,
  Clock01Icon,
  UserAdd01Icon,
  SearchIcon,
  ShoppingCart01Icon,
  Analytics01Icon,
  FileValidationIcon,
  CoinsSwapIcon,
  PercentSquareIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
  Area,
  AreaChart,
} from "recharts";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartPieValueLegend,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { KpiCard } from "@/components/ui/kpi-card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

const formatNumber = (value: number) =>
  new Intl.NumberFormat("pt-BR").format(value);

export function Saude() {
  const {
    greenPalette,
    saudeResumo,
    despesasSaude,
    chartConfigDespesas,
    receitasSaude,
    fontesRecursos,
    contasBancarias,
    evolucaoOrcamentaria,
    chartConfigEvolucao,
    kpisSaude,
    atendimentosPorUnidade,
    produtividadeProfissionais,
    estoqueMedicamentos,
    programasSaude,
    alertasSaude,
    aspsCompliance,
    indicadoresMortalidade,
    vigilanciaDoencas,
    notificacoesSINAN,
    chartConfigNotificacoes,
    coberturaVacinal,
    alertasVigilancia,
    filasEspecialidades,
    filasExames,
    regulacaoResumo,
    evolucaoFilas,
    chartConfigFilas,
    quadroProfissionais,
    capacitacoes,
    consumoMedicamentosMensal,
    chartConfigConsumo,
    aquisicoesPipeline,
    curvaABC,
    previneBrasil,
    atendimentosTendencia,
    chartConfigAtendimentos,
  } = useSnapshot("saude", SAUDE_SNAPSHOT);
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024");
  const [unidadeSelecionada, setUnidadeSelecionada] = React.useState("todas");

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="População Atendida"
          icon={UserMultipleIcon}
          value={formatNumber(saudeResumo.populacaoAtendida)}
          borderColor="border-l-emerald-700"
          footer={
            <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-4"
              />
              Cobertura de 87,4% pela ESF
            </div>
          }
        />
        <KpiCard
          title="Unidades de Saúde"
          icon={Hospital01Icon}
          value={formatNumber(saudeResumo.unidadesSaude)}
          borderColor="border-l-emerald-700"
          footer={
            <p className="text-sm text-muted-foreground">
              4 UBS, 1 UPA, 1 Hospital e 22 ESF
            </p>
          }
        />
        <KpiCard
          title="Profissionais de Saúde"
          icon={Stethoscope02Icon}
          value={formatNumber(saudeResumo.profissionaisSaude)}
          borderColor="border-l-emerald-700"
          footer={
            <p className="text-sm text-muted-foreground">
              124 médicos, 186 enfermeiros e outros
            </p>
          }
        />
        <KpiCard
          title="Atendimentos/Mês"
          icon={Activity01Icon}
          value={formatNumber(saudeResumo.atendimentosMes)}
          borderColor="border-l-emerald-700"
          footer={
            <>
              <Progress value={85} className="h-2" />
              <p className="text-sm text-muted-foreground">
                85% da capacidade instalada
              </p>
            </>
          }
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Painel Executivo da Saúde
            </CardTitle>
            <CardDescription>
              Situação consolidada dos principais indicadores de saúde pública
              municipal.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Orçamento Executado
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {(
                  (saudeResumo.orcamentoEmpenhado /
                    saudeResumo.orcamentoTotal) *
                  100
                ).toFixed(1)}
                %
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {formatCurrency(saudeResumo.orcamentoEmpenhado)} de{" "}
                {formatCurrency(saudeResumo.orcamentoTotal)}
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Receitas Arrecadadas
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {formatCurrency(saudeResumo.receitaTotal)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                70,6% de transferências SUS
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Taxa de Ocupação Média
              </p>
              <p className="mt-2 text-3xl font-semibold">86,4%</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Capacidade bem utilizada nas unidades
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Mortalidade Infantil
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {indicadoresMortalidade.mortalidadeInfantil}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                por 1.000 NV (meta:{" "}
                {indicadoresMortalidade.mortalidadeInfantilMeta})
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">ICSAP</p>
              <p className="mt-2 text-3xl font-semibold">
                {indicadoresMortalidade.icsap}%
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Internações por condições sensíveis à APS
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Fila de Espera Total
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {formatNumber(regulacaoResumo.encaminhamentosEmAberto)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Consultas + exames aguardando
              </p>
            </div>
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
              Alertas de Gestão
            </CardTitle>
            <CardDescription>
              Pontos que merecem acompanhamento dos gestores de saúde.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alertasSaude.map((alerta) => (
              <Alert key={alerta.titulo}>
                <AlertTitle className="flex flex-wrap items-center gap-2">
                  {alerta.titulo}
                  <Badge variant="secondary">{alerta.badge}</Badge>
                </AlertTitle>
                <AlertDescription>{alerta.descricao}</AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ASPS Compliance - EC 29 / LC 141/2012 */}
      <Card className="border-l-4 border-l-emerald-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={SecurityCheckIcon}
              strokeWidth={2}
              className="size-5"
            />
            Cumprimento do Mínimo Constitucional em Saúde (ASPS)
          </CardTitle>
          <CardDescription>
            EC 29/2000 e LC 141/2012 — Mínimo de 15% da receita de impostos
            aplicados em ações e serviços públicos de saúde.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Receita de Impostos
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {formatCurrency(aspsCompliance.receitaImpostos)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Base de cálculo (impostos + transferências constitucionais)
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Mínimo Exigido (15%)
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {formatCurrency(aspsCompliance.minimoExigido)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Valor mínimo que deve ser aplicado em ASPS
              </p>
            </div>
            <div className="rounded-2xl border bg-emerald-50/50 p-4 dark:bg-emerald-950/20">
              <p className="text-sm text-muted-foreground">Aplicado em Saúde</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-700 dark:text-emerald-400">
                {formatCurrency(aspsCompliance.aplicadoSaude)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {aspsCompliance.percentualAplicado.toFixed(2)}% da receita de
                impostos
              </p>
            </div>
            <div className="rounded-2xl border bg-emerald-50/50 p-4 dark:bg-emerald-950/20">
              <p className="text-sm text-muted-foreground">
                Superávit sobre o Mínimo
              </p>
              <p className="mt-2 text-2xl font-semibold text-emerald-700 dark:text-emerald-400">
                {formatCurrency(aspsCompliance.superavit)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                +{(aspsCompliance.percentualAplicado - 15).toFixed(2)} p.p.
                acima do mínimo
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>
                Aplicação em ASPS:{" "}
                {aspsCompliance.percentualAplicado.toFixed(2)}%
              </span>
              <span className="text-muted-foreground">Mínimo: 15,00%</span>
            </div>
            <div className="relative">
              <Progress
                value={aspsCompliance.percentualAplicado * (100 / 25)}
                className="h-3"
              />
              <div
                className="absolute top-0 left-[60%] h-3 w-0.5 bg-red-500"
                title="Mínimo constitucional (15%)"
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Escala: 0% a 25% da receita de impostos. Linha vermelha = mínimo
              constitucional de 15%.
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="orcamento" className="w-full">
        <TabsList className="flex h-auto w-full flex-wrap gap-2 rounded-2xl p-2">
          <TabsTrigger value="orcamento">Orçamento e Finanças</TabsTrigger>
          <TabsTrigger value="atendimento">Atendimento</TabsTrigger>
          <TabsTrigger value="regulacao">Regulação e Filas</TabsTrigger>
          <TabsTrigger value="vigilancia">
            Vigilância Epidemiológica
          </TabsTrigger>
          <TabsTrigger value="profissionais">Profissionais</TabsTrigger>
          <TabsTrigger value="medicamentos">Medicamentos</TabsTrigger>
          <TabsTrigger value="programas">
            Programas e Previne Brasil
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orcamento" className="mt-6 space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Wallet01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Composição das Despesas
                </CardTitle>
                <CardDescription>
                  Distribuição do orçamento da saúde por categoria de despesa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfigDespesas}
                  className="mx-auto aspect-auto h-[320px] w-full"
                >
                  <PieChart>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          nameKey="categoria"
                          formatter={(value) => formatCurrency(Number(value))}
                          hideLabel
                        />
                      }
                    />
                    <Pie
                      data={despesasSaude}
                      dataKey="valor"
                      nameKey="categoria"
                      innerRadius={70}
                      outerRadius={110}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {despesasSaude.map((item) => (
                        <Cell key={item.categoria} fill={item.fill} />
                      ))}
                    </Pie>
                    <ChartLegend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      content={
                        <ChartPieValueLegend
                          nameKey="categoria"
                          valueKey="valor"
                          valueFormatter={formatCurrency}
                        />
                      }
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Calendar01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Evolução Orçamentária
                </CardTitle>
                <CardDescription>
                  Acompanhamento mensal do orçamento: orçado, empenhado e pago.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfigEvolucao}>
                  <LineChart
                    data={evolucaoOrcamentaria}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `R$ ${(Number(value) / 1_000_000).toFixed(0)}M`
                      }
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatCurrency(Number(value))}
                        />
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="orcado"
                      stroke={greenPalette[5]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="empenhado"
                      stroke={greenPalette[3]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="pago"
                      stroke={greenPalette[1]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={MoneyReceiveSquareIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Receitas por Fonte
                </CardTitle>
                <CardDescription>
                  Origem dos recursos financeiros da secretaria de saúde.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fonte</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="text-right">%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {receitasSaude.map((item) => (
                      <TableRow key={item.fonte}>
                        <TableCell className="font-medium">
                          {item.fonte}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.valor)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.percentual.toFixed(1)}%
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
                    icon={Invoice01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Fontes de Recursos
                </CardTitle>
                <CardDescription>
                  Controle de fontes vinculadas e saldos disponíveis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead className="text-right">Empenhado</TableHead>
                      <TableHead className="text-right">Disponível</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fontesRecursos.map((item) => (
                      <TableRow key={item.codigo}>
                        <TableCell className="font-mono text-sm">
                          {item.codigo}
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.nome}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.empenhado)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.disponivel)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={BankIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Contas Bancárias Vinculadas
              </CardTitle>
              <CardDescription>
                Contas bancárias da secretaria de saúde por tipo de recurso.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Banco</TableHead>
                    <TableHead>Agência</TableHead>
                    <TableHead>Conta</TableHead>
                    <TableHead>Tipo de Recurso</TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contasBancarias.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">
                        {item.banco}
                      </TableCell>
                      <TableCell>{item.agencia}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {item.conta}
                      </TableCell>
                      <TableCell>{item.tipo}</TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(item.saldo)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="atendimento" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kpisSaude.map((kpi) => (
              <KpiCard
                key={kpi.indicador}
                title={kpi.indicador}
                value={
                  <>
                    {kpi.valor}
                    {kpi.unidade}
                  </>
                }
                borderColor="border-l-emerald-700"
                footer={
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Meta: {kpi.meta}
                        {kpi.unidade}
                      </span>
                      <Badge
                        variant={
                          kpi.status === "atingido" ? "default" : "secondary"
                        }
                      >
                        {kpi.status === "atingido" ? "Atingido" : "Atenção"}
                      </Badge>
                    </div>
                    <Progress
                      value={(kpi.valor / kpi.meta) * 100}
                      className="h-2"
                    />
                  </div>
                }
              />
            ))}
          </div>

          {/* Mortality & ICSAP Indicators */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Mortalidade Infantil"
              icon={HeartCheckIcon}
              value={<>{indicadoresMortalidade.mortalidadeInfantil}/1.000 NV</>}
              borderColor="border-l-emerald-700"
              footer={
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Meta: {indicadoresMortalidade.mortalidadeInfantilMeta}/1.000
                    NV
                  </p>
                  <Badge variant="default">Abaixo da meta</Badge>
                </div>
              }
            />
            <KpiCard
              title="Mortalidade Materna"
              icon={HeartCheckIcon}
              value={
                <>{indicadoresMortalidade.mortalidadeMaterna}/100.000 NV</>
              }
              borderColor="border-l-emerald-700"
              footer={
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Meta: {indicadoresMortalidade.mortalidadeMaternaMeta}
                    /100.000 NV
                  </p>
                  <Badge variant="default">Abaixo da meta</Badge>
                </div>
              }
            />
            <KpiCard
              title="ICSAP (Internações Cond. Sensíveis)"
              icon={Activity01Icon}
              value={<>{indicadoresMortalidade.icsap}%</>}
              borderColor="border-l-emerald-700"
              footer={
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Meta: &lt;{indicadoresMortalidade.icsapMeta}% das
                    internações
                  </p>
                  <Badge variant="default">Adequado</Badge>
                </div>
              }
            />
            <KpiCard
              title="Mortalidade Prematura (DCNT)"
              icon={Activity01Icon}
              value={<>{indicadoresMortalidade.mortalidadePrematura}/100.000</>}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Por doenças crônicas não transmissíveis (30-69 anos)
                </p>
              }
            />
          </div>

          {/* Monthly Visit Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={ChartLineData02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Tendência de Atendimentos por Tipo de Unidade
              </CardTitle>
              <CardDescription>
                Evolução mensal dos atendimentos por UBS, UPA e Hospital.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigAtendimentos}>
                <AreaChart
                  data={atendimentosTendencia}
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) =>
                      `${(Number(value) / 1_000).toFixed(0)}k`
                    }
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatNumber(Number(value))}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="ubs"
                    stackId="1"
                    stroke={greenPalette[3]}
                    fill={greenPalette[3]}
                    fillOpacity={0.4}
                  />
                  <Area
                    type="monotone"
                    dataKey="upa"
                    stackId="1"
                    stroke={greenPalette[1]}
                    fill={greenPalette[1]}
                    fillOpacity={0.4}
                  />
                  <Area
                    type="monotone"
                    dataKey="hospital"
                    stackId="1"
                    stroke={greenPalette[5]}
                    fill={greenPalette[5]}
                    fillOpacity={0.4}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Hospital01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Atendimentos por Unidade
              </CardTitle>
              <CardDescription>
                Produtividade e taxa de ocupação das unidades de saúde.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unidade</TableHead>
                    <TableHead className="text-right">Atendimentos</TableHead>
                    <TableHead className="text-right">Capacidade</TableHead>
                    <TableHead className="text-right">Ocupação</TableHead>
                    <TableHead className="text-right">Profissionais</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {atendimentosPorUnidade.map((item) => (
                    <TableRow key={item.unidade}>
                      <TableCell className="font-medium">
                        {item.unidade}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.atendimentos)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.capacidade)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.ocupacao > 90
                              ? "font-semibold text-amber-600"
                              : ""
                          }
                        >
                          {item.ocupacao.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.profissionais}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NEW TAB: Regulação e Filas */}
        <TabsContent value="regulacao" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Fila de Consultas"
              icon={Clock01Icon}
              value={formatNumber(regulacaoResumo.totalFilaConsultas)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Pacientes aguardando especialidades
                </p>
              }
            />
            <KpiCard
              title="Fila de Exames"
              icon={SearchIcon}
              value={formatNumber(regulacaoResumo.totalFilaExames)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Exames complementares pendentes
                </p>
              }
            />
            <KpiCard
              title="TFD Ativos"
              icon={CoinsSwapIcon}
              value={regulacaoResumo.tfdAtivos.toString()}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Custo mensal: {formatCurrency(regulacaoResumo.tfdCustoMensal)}
                </p>
              }
            />
            <KpiCard
              title="Absenteísmo"
              icon={Alert02Icon}
              value={<>{regulacaoResumo.taxaAbsenteismo}%</>}
              borderColor="border-l-amber-600"
              footer={
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Meta: {regulacaoResumo.metaAbsenteismo}%
                  </p>
                  <Badge variant="secondary">Acima da meta</Badge>
                </div>
              }
            />
          </div>

          {/* Queue Evolution Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={ChartLineData02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Evolução das Filas de Espera
              </CardTitle>
              <CardDescription>
                Acompanhamento mensal do volume de pacientes aguardando
                consultas e exames.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigFilas}>
                <LineChart
                  data={evolucaoFilas}
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatNumber(Number(value))}
                      />
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="consultas"
                    stroke={greenPalette[3]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="exames"
                    stroke={greenPalette[1]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            {/* Specialty Queues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Stethoscope02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Filas por Especialidade
                </CardTitle>
                <CardDescription>
                  Tempo de espera e volume de pacientes por especialidade
                  médica.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Especialidade</TableHead>
                      <TableHead className="text-right">Aguardando</TableHead>
                      <TableHead className="text-right">Tempo Médio</TableHead>
                      <TableHead className="text-right">Atend./Mês</TableHead>
                      <TableHead>Prioridade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filasEspecialidades.map((item) => (
                      <TableRow key={item.especialidade}>
                        <TableCell className="font-medium">
                          {item.especialidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.aguardando)}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              item.tempoMedio > item.meta
                                ? "font-semibold text-amber-600"
                                : ""
                            }
                          >
                            {item.tempoMedio} dias
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.atendidosMes)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.prioridade === "alta"
                                ? "destructive"
                                : item.prioridade === "media"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {item.prioridade === "alta"
                              ? "Alta"
                              : item.prioridade === "media"
                                ? "Média"
                                : "Baixa"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Exam Queues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={FileValidationIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Filas de Exames
                </CardTitle>
                <CardDescription>
                  Pacientes aguardando exames diagnósticos e de imagem.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Exame</TableHead>
                      <TableHead className="text-right">Aguardando</TableHead>
                      <TableHead className="text-right">Tempo Médio</TableHead>
                      <TableHead className="text-right">Meta</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filasExames.map((item) => (
                      <TableRow key={item.exame}>
                        <TableCell className="font-medium">
                          {item.exame}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.aguardando)}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              item.tempoMedio > item.meta
                                ? "font-semibold text-amber-600"
                                : ""
                            }
                          >
                            {item.tempoMedio} dias
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.meta} dias
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.tempoMedio > item.meta
                                ? "destructive"
                                : "default"
                            }
                          >
                            {item.tempoMedio > item.meta ? "Acima" : "Adequado"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* NEW TAB: Vigilância Epidemiológica */}
        <TabsContent value="vigilancia" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Notificações SINAN"
              icon={Alert02Icon}
              value={formatNumber(
                notificacoesSINAN.reduce((acc, m) => acc + m.notificacoes, 0),
              )}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Total de notificações compulsórias no período
                </p>
              }
            />
            <KpiCard
              title="Casos Confirmados"
              icon={AlertCircleIcon}
              value={formatNumber(
                vigilanciaDoencas.reduce(
                  (acc, d) => acc + d.casosConfirmados,
                  0,
                ),
              )}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Em {vigilanciaDoencas.length} doenças de notificação
                </p>
              }
            />
            <KpiCard
              title="Óbitos por Doenças Notif."
              icon={HeartCheckIcon}
              value={vigilanciaDoencas
                .reduce((acc, d) => acc + d.obitos, 0)
                .toString()}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  No período acumulado
                </p>
              }
            />
            <KpiCard
              title="Cobertura Vacinal Geral"
              icon={FirstAidKitIcon}
              value={
                <>
                  {(
                    coberturaVacinal.reduce((acc, v) => acc + v.cobertura, 0) /
                    coberturaVacinal.length
                  ).toFixed(1)}
                  %
                </>
              }
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Média das vacinas do calendário
                </p>
              }
            />
          </div>

          {/* SINAN Notifications Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Analytics01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Notificações Compulsórias (SINAN)
              </CardTitle>
              <CardDescription>
                Evolução mensal das notificações e casos confirmados no Sistema
                de Informação de Agravos de Notificação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigNotificacoes}>
                <BarChart
                  data={notificacoesSINAN}
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="notificacoes"
                    fill={greenPalette[4]}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="confirmados"
                    fill={greenPalette[1]}
                    radius={[4, 4, 0, 0]}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            {/* Disease Tracking Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Activity01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Painel de Doenças de Notificação
                </CardTitle>
                <CardDescription>
                  Situação epidemiológica das principais doenças de notificação
                  compulsória.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doença</TableHead>
                      <TableHead className="text-right">Confirmados</TableHead>
                      <TableHead className="text-right">Suspeitos</TableHead>
                      <TableHead className="text-right">Óbitos</TableHead>
                      <TableHead className="text-right">Incidência</TableHead>
                      <TableHead>Tendência</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vigilanciaDoencas.map((item) => (
                      <TableRow key={item.doenca}>
                        <TableCell className="font-medium">
                          {item.doenca}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.casosConfirmados)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.casosSuspeitos)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.obitos}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.incidencia.toFixed(1)}/100mil
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.tendencia === "alta"
                                ? "destructive"
                                : item.tendencia === "queda"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {item.tendencia === "alta"
                              ? "Alta"
                              : item.tendencia === "queda"
                                ? "Queda"
                                : "Estável"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Vaccine Coverage Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={FirstAidKitIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Cobertura Vacinal
                </CardTitle>
                <CardDescription>
                  Cobertura vacinal por imunobiológico em relação às metas do
                  PNI.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {coberturaVacinal.map((item) => (
                    <div key={item.vacina} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-medium">{item.vacina}</span>
                          <span className="ml-2 text-muted-foreground">
                            ({item.publicoAlvo})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={
                              item.cobertura >= item.meta
                                ? "text-emerald-600"
                                : "text-amber-600"
                            }
                          >
                            {item.cobertura}%
                          </span>
                          <span className="text-muted-foreground">
                            / {item.meta}%
                          </span>
                        </div>
                      </div>
                      <Progress value={item.cobertura} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vigilância Alerts */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              Alertas Epidemiológicos
            </h3>
            <div className="grid gap-3 lg:grid-cols-2">
              {alertasVigilancia.map((alerta, index) => (
                <Alert
                  key={index}
                  variant={
                    alerta.tipo === "warning" ? "destructive" : "default"
                  }
                >
                  <HugeiconsIcon
                    icon={
                      alerta.tipo === "warning"
                        ? Alert02Icon
                        : alerta.tipo === "success"
                          ? CheckmarkCircle02Icon
                          : InformationCircleIcon
                    }
                    strokeWidth={2}
                    className="size-4"
                  />
                  <AlertTitle className="flex items-center gap-2">
                    {alerta.titulo}
                    <Badge variant="outline" className="text-xs">
                      {alerta.badge}
                    </Badge>
                  </AlertTitle>
                  <AlertDescription>{alerta.descricao}</AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="profissionais" className="mt-6 space-y-6">
          {/* Workforce Summary KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Total de Profissionais"
              icon={Stethoscope02Icon}
              value={formatNumber(saudeResumo.profissionaisSaude)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Ativos no quadro da secretaria de saúde
                </p>
              }
            />
            <KpiCard
              title="Vagas Ociosas"
              icon={UserAdd01Icon}
              value={formatNumber(
                quadroProfissionais.reduce((acc, p) => acc + p.vago, 0),
              )}
              borderColor="border-l-amber-600"
              footer={
                <p className="text-sm text-muted-foreground">
                  Vagas previstas não preenchidas
                </p>
              }
            />
            <KpiCard
              title="Taxa de Vacância Média"
              icon={Alert02Icon}
              value={
                <>
                  {(
                    quadroProfissionais.reduce(
                      (acc, p) => acc + p.taxaVacancia,
                      0,
                    ) / quadroProfissionais.length
                  ).toFixed(1)}
                  %
                </>
              }
              borderColor="border-l-amber-600"
              footer={
                <p className="text-sm text-muted-foreground">
                  Percentual médio de vagas não preenchidas
                </p>
              }
            />
            <KpiCard
              title="Rotatividade Média"
              icon={CoinsSwapIcon}
              value={
                <>
                  {(
                    quadroProfissionais.reduce(
                      (acc, p) => acc + p.rotatividade,
                      0,
                    ) / quadroProfissionais.length
                  ).toFixed(1)}
                  %
                </>
              }
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Turnover anual por categoria
                </p>
              }
            />
          </div>

          {/* Vacancy and Workforce Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={UserAdd01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Quadro de Pessoal e Vacância
              </CardTitle>
              <CardDescription>
                Dimensionamento da força de trabalho: vagas previstas, ocupadas,
                taxa de vacância e rotatividade.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Previsto</TableHead>
                    <TableHead className="text-right">Ocupado</TableHead>
                    <TableHead className="text-right">Vago</TableHead>
                    <TableHead className="text-right">Vacância</TableHead>
                    <TableHead className="text-right">Rotatividade</TableHead>
                    <TableHead className="text-right">Razão/Pop.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quadroProfissionais.map((item) => (
                    <TableRow key={item.categoria}>
                      <TableCell className="font-medium">
                        {item.categoria}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.previsto)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.ocupado)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.vago > 10 ? "font-semibold text-amber-600" : ""
                          }
                        >
                          {item.vago}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            item.taxaVacancia > 20
                              ? "destructive"
                              : item.taxaVacancia > 10
                                ? "secondary"
                                : "default"
                          }
                        >
                          {item.taxaVacancia.toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.rotatividade.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs">
                        {item.razao}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Productivity Table (existing, preserved) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Stethoscope02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Produtividade dos Profissionais
              </CardTitle>
              <CardDescription>
                Quantidade de profissionais e média de atendimentos por
                categoria.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead className="text-right">
                      Atendimentos/Mês
                    </TableHead>
                    <TableHead className="text-right">Média/Dia</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produtividadeProfissionais.map((item) => (
                    <TableRow key={item.categoria}>
                      <TableCell className="font-medium">
                        {item.categoria}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.quantidade)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.atendimentos || item.visitas || 0)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.mediaDia.toFixed(1)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Training & Development */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Target01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Capacitação e Educação Permanente
              </CardTitle>
              <CardDescription>
                Programas de capacitação em andamento e taxa de conclusão.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {capacitacoes.map((item) => (
                  <div key={item.nome} className="rounded-2xl border p-4">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-medium">{item.nome}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.profissionais} profissionais inscritos •{" "}
                          {item.cargaHoraria}h de carga horária
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.conclusao >= 90
                            ? "default"
                            : item.conclusao >= 70
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {item.conclusao}% concluído
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <Progress value={item.conclusao} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medicamentos" className="mt-6 space-y-6">
          {/* Medication Consumption Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={ChartLineData02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Evolução Mensal de Dispensações e Custos
              </CardTitle>
              <CardDescription>
                Acompanhamento do volume de dispensações e custo total da
                assistência farmacêutica.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigConsumo}>
                <BarChart
                  data={consumoMedicamentosMensal}
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) =>
                      `${(Number(value) / 1_000).toFixed(0)}k`
                    }
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatNumber(Number(value))}
                      />
                    }
                  />
                  <Bar
                    dataKey="dispensacoes"
                    fill={greenPalette[3]}
                    radius={[4, 4, 0, 0]}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            {/* ABC Curve Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={PercentSquareIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Curva ABC de Medicamentos
                </CardTitle>
                <CardDescription>
                  Classificação por valor de consumo: itens classe A representam
                  maior impacto financeiro.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Classe</TableHead>
                      <TableHead className="text-right">Itens</TableHead>
                      <TableHead className="text-right">% Itens</TableHead>
                      <TableHead className="text-right">% Valor</TableHead>
                      <TableHead className="text-right">Valor Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {curvaABC.map((item) => (
                      <TableRow key={item.classe}>
                        <TableCell>
                          <Badge
                            variant={
                              item.classe === "A"
                                ? "destructive"
                                : item.classe === "B"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            Classe {item.classe}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.itens}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.percentualItens}%
                        </TableCell>
                        <TableCell className="text-right">
                          {item.percentualValor}%
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(item.valor)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 space-y-2">
                  {curvaABC.map((item) => (
                    <div key={item.classe} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>
                          Classe {item.classe} ({item.percentualItens}% dos
                          itens)
                        </span>
                        <span>{item.percentualValor}% do valor</span>
                      </div>
                      <Progress value={item.percentualValor} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Procurement Pipeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={ShoppingCart01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Pipeline de Aquisições
                </CardTitle>
                <CardDescription>
                  Processos de compra de medicamentos e insumos em andamento.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aquisicoesPipeline.map((item) => (
                    <div key={item.item} className="rounded-2xl border p-3">
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-sm font-medium">{item.item}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.modalidade} • Previsão: {item.previsao}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">
                            {formatCurrency(item.valor)}
                          </span>
                          <Badge
                            variant={
                              item.status === "concluido"
                                ? "default"
                                : item.status === "em_andamento"
                                  ? "secondary"
                                  : item.status === "publicado"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {item.status === "concluido"
                              ? "Concluído"
                              : item.status === "em_andamento"
                                ? "Em Andamento"
                                : item.status === "publicado"
                                  ? "Publicado"
                                  : "Em Elaboração"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Existing Medication Stock Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={MedicineBottle02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Estoque de Medicamentos
              </CardTitle>
              <CardDescription>
                Controle de estoque e cobertura dos principais medicamentos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicamento</TableHead>
                    <TableHead className="text-right">Estoque</TableHead>
                    <TableHead className="text-right">
                      Consumo Médio/Mês
                    </TableHead>
                    <TableHead className="text-right">
                      Cobertura (dias)
                    </TableHead>
                    <TableHead>Criticidade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {estoqueMedicamentos.map((item) => (
                    <TableRow key={item.medicamento}>
                      <TableCell className="font-medium">
                        {item.medicamento}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.estoque)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.consumoMedio)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.cobertura} dias
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.criticidade === "critico"
                              ? "destructive"
                              : item.criticidade === "atencao"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {item.criticidade === "critico"
                            ? "Crítico"
                            : item.criticidade === "atencao"
                              ? "Atenção"
                              : "Adequado"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programas" className="mt-6 space-y-6">
          {/* Previne Brasil Summary */}
          <Card className="border-l-4 border-l-emerald-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Target01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Previne Brasil — Financiamento da Atenção Primária
              </CardTitle>
              <CardDescription>
                Programa federal de financiamento da APS baseado em capitação
                ponderada, pagamento por desempenho e incentivos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* PAP Summary */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">
                    Capitação Ponderada
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatCurrency(previneBrasil.pap.capitacao)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Baseado na população cadastrada no e-SUS
                  </p>
                </div>
                <div className="rounded-2xl border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">
                    Pagamento por Desempenho
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatCurrency(previneBrasil.pap.desempenho)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Vinculado ao alcance dos indicadores
                  </p>
                </div>
                <div className="rounded-2xl border bg-emerald-50/50 p-4 dark:bg-emerald-950/20">
                  <p className="text-sm text-muted-foreground">
                    Receita Total PAP
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-emerald-700 dark:text-emerald-400">
                    {formatCurrency(previneBrasil.pap.valor)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Transferência federal para APS
                  </p>
                </div>
              </div>

              {/* Previne Indicators Table */}
              <div>
                <h4 className="mb-3 text-sm font-semibold">
                  Indicadores de Desempenho (7 indicadores vinculantes)
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Indicador</TableHead>
                      <TableHead className="text-right">Resultado</TableHead>
                      <TableHead className="text-right">Meta</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previneBrasil.indicadores.map((item) => (
                      <TableRow key={item.indicador}>
                        <TableCell className="font-medium text-sm">
                          {item.indicador}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.valor.toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-right">
                          {item.meta.toFixed(1)}%
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "atingido"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {item.status === "atingido"
                              ? "Atingido"
                              : "Atenção"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Separator />

              {/* ISF - Índice Sintético Final */}
              <div>
                <h4 className="mb-3 text-sm font-semibold">
                  ISF — Índice Sintético Final
                </h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-2xl border bg-emerald-50/50 p-4 text-center dark:bg-emerald-950/20">
                    <p className="text-sm text-muted-foreground">Nota ISF</p>
                    <p className="mt-2 text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                      {previneBrasil.isf.nota}
                    </p>
                    <Badge variant="default" className="mt-2">
                      {previneBrasil.isf.classificacao}
                    </Badge>
                  </div>
                  {previneBrasil.isf.componentes.map((comp) => (
                    <div
                      key={comp.componente}
                      className="rounded-2xl border bg-muted/40 p-4 text-center"
                    >
                      <p className="text-sm text-muted-foreground">
                        {comp.componente}
                      </p>
                      <p className="mt-2 text-2xl font-semibold">{comp.nota}</p>
                      <Progress value={comp.nota * 10} className="mt-2 h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Existing Programs Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={HeartCheckIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Programas de Saúde
              </CardTitle>
              <CardDescription>
                Cobertura e investimento nos principais programas de saúde
                pública.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {programasSaude.map((item) => (
                  <div key={item.programa} className="rounded-2xl border p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="font-medium">{item.programa}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatNumber(item.beneficiarios)} beneficiários •
                          Investimento: {formatCurrency(item.investimento)}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {item.cobertura.toFixed(1)}% cobertura
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Cobertura populacional</span>
                        <span>{item.cobertura.toFixed(1)}%</span>
                      </div>
                      <Progress value={item.cobertura} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
