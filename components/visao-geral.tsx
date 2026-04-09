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
  ChartLegend,
  ChartLegendContent,
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
  MoneyAdd01Icon,
  Analytics01Icon,
  BankIcon,
  ShoppingCartIcon,
  UserMultipleIcon,
  Invoice01Icon,
  SecurityCheckIcon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  Target01Icon,
  Wallet01Icon,
  Clock01Icon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { KpiCard } from "@/components/ui/kpi-card";

// --- DADOS CONSOLIDADOS ---

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );

const formatMillions = (value: number) =>
  `R$ ${(value / 1_000_000).toFixed(1)}M`;

const formatNumber = (value: number) =>
  new Intl.NumberFormat("pt-BR").format(value);

// Receita
const receita = {
  prevista: 243900000,
  arrecadada: 228500000,
  percentual: 93.7,
};

// Despesa
const despesa = {
  atualizada: 139440000,
  empenhada: 128244500,
  paga: 115960000,
  percentualExecucao: 92.0,
  percentualPessoalRCL: 42,
};

// Financeiro
const financeiro = {
  saldoTotal: 34770000,
  entradas: 228500000,
  saidas: 193730000,
  aplicacoes: 18500000,
};

// Compras
const compras = {
  contratosAtivos: 1247,
  valorContratado: 45200000,
  licitacoesAndamento: 38,
  economiaPeriodo: 3800000,
  taxaEconomia: 8.4,
};

// RH
const rh = {
  totalFuncionarios: 1130,
  folhaPagamento: 10500000,
  horasExtras: 767000,
  absenteismo: 4.3,
  turnover: 8.5,
};

// Tributação
const tributacao = {
  receitaTributaria: 62800000,
  iptu: 28500000,
  iss: 22400000,
  itbi: 4200000,
  dividaAtiva: 45200000,
  inadimplencia: 12.8,
};

// Prestação de Contas (CAUC)
const prestacaoContas = {
  regulares: 22,
  aComprovar: 3,
  irregulares: 1,
  conformidade: 84.6,
  taxaAprovacaoTCE: 91.7,
};

// Evolução mensal consolidada (Receita vs Despesa)
const evolucaoConsolidada = [
  { mes: "Jan", receita: 18200000, despesa: 15800000 },
  { mes: "Fev", receita: 17500000, despesa: 15200000 },
  { mes: "Mar", receita: 21300000, despesa: 18900000 },
  { mes: "Abr", receita: 19800000, despesa: 17600000 },
  { mes: "Mai", receita: 20100000, despesa: 18100000 },
  { mes: "Jun", receita: 22400000, despesa: 19500000 },
  { mes: "Jul", receita: 19600000, despesa: 17400000 },
  { mes: "Ago", receita: 20800000, despesa: 18800000 },
  { mes: "Set", receita: 21200000, despesa: 19200000 },
  { mes: "Out", receita: 23100000, despesa: 20500000 },
  { mes: "Nov", receita: 22500000, despesa: 19800000 },
  { mes: "Dez", receita: 21500000, despesa: 19100000 },
];

// Composição de Receita por Origem
const composicaoReceita = [
  { nome: "Receitas Próprias", valor: 62800000, fill: "var(--chart-1)" },
  { nome: "Transf. Estaduais", valor: 58200000, fill: "var(--chart-2)" },
  { nome: "Transf. Federais", valor: 95400000, fill: "var(--chart-3)" },
  { nome: "Outras Receitas", valor: 12100000, fill: "var(--chart-4)" },
];

// Despesa por Função
const despesaPorFuncao = [
  { funcao: "Educação", valor: 42500000, percentual: 30.5 },
  { funcao: "Saúde", valor: 35200000, percentual: 25.2 },
  { funcao: "Administração", valor: 18700000, percentual: 13.4 },
  { funcao: "Transporte", valor: 12800000, percentual: 9.2 },
  { funcao: "Assistência Social", valor: 8900000, percentual: 6.4 },
  { funcao: "Outros", valor: 21340000, percentual: 15.3 },
];

// Alertas consolidados
const alertasConsolidados = [
  {
    modulo: "Receita",
    tipo: "warning" as const,
    titulo: "Arrecadação de IPTU abaixo da meta",
    descricao:
      "A arrecadação de IPTU está 8.2% abaixo da previsão para o período. Recomenda-se intensificar a cobrança administrativa.",
  },
  {
    modulo: "Despesa",
    tipo: "warning" as const,
    titulo: "Restos a Pagar em crescimento",
    descricao:
      "O volume de restos a pagar não processados cresceu 12% no trimestre, totalizando R$ 6,5M.",
  },
  {
    modulo: "Financeiro",
    tipo: "info" as const,
    titulo: "Disponibilidade financeira estável",
    descricao:
      "O saldo em caixa cobre 2,26 meses de despesas correntes. Situação dentro da normalidade.",
  },
  {
    modulo: "RH",
    tipo: "warning" as const,
    titulo: "Horas extras acima do limite",
    descricao:
      "O gasto com horas extras atingiu 127,8% do limite orçamentário previsto para o período.",
  },
  {
    modulo: "Tributos",
    tipo: "info" as const,
    titulo: "Dívida ativa: recuperação em alta",
    descricao:
      "A recuperação de dívida ativa cresceu 15% com o programa REFIS, totalizando R$ 4,2M no semestre.",
  },
  {
    modulo: "CAUC",
    tipo: "success" as const,
    titulo: "Conformidade CAUC em 84,6%",
    descricao:
      "22 dos 26 itens estão regulares. Há 1 item irregular que precisa de atenção imediata.",
  },
];

// Indicadores chave para radar
const indicadoresChave = [
  {
    indicador: "Execução Orçamentária",
    valor: 92.0,
    meta: 95,
    status: "atencao",
  },
  { indicador: "Pessoal / RCL", valor: 42, meta: 54, status: "atingido" },
  {
    indicador: "Arrecadação / Previsão",
    valor: 93.7,
    meta: 95,
    status: "atencao",
  },
  { indicador: "Conformidade CAUC", valor: 84.6, meta: 100, status: "atencao" },
  {
    indicador: "Taxa de Economia (Compras)",
    valor: 8.4,
    meta: 5,
    status: "atingido",
  },
  { indicador: "Absenteísmo", valor: 4.3, meta: 3.5, status: "atencao" },
];

export function VisaoGeral() {
  return (
    <div className="space-y-8">
      {/* KPIs Macro */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Receita Arrecadada"
          icon={MoneyAdd01Icon}
          value={formatMillions(receita.arrecadada)}
          borderColor="border-l-green-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-green-600"
              />
              <span className="text-green-600">{receita.percentual}%</span>
              <span>da previsão</span>
            </div>
          }
        />
        <KpiCard
          title="Despesa Empenhada"
          icon={Analytics01Icon}
          value={formatMillions(despesa.empenhada)}
          borderColor="border-l-blue-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="font-medium">{despesa.percentualExecucao}%</span>
              <span>executado</span>
            </div>
          }
        />
        <KpiCard
          title="Saldo Financeiro"
          icon={BankIcon}
          value={formatMillions(financeiro.saldoTotal)}
          borderColor="border-l-purple-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Superávit:{" "}
              {formatMillions(financeiro.entradas - financeiro.saidas)}
            </p>
          }
        />
        <KpiCard
          title="Conformidade CAUC"
          icon={SecurityCheckIcon}
          value={`${prestacaoContas.conformidade}%`}
          borderColor="border-l-amber-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">
                {prestacaoContas.regulares} regulares
              </span>
              {prestacaoContas.irregulares > 0 && (
                <span className="text-red-600 font-medium">
                  {prestacaoContas.irregulares} irregular
                </span>
              )}
            </div>
          }
        />
      </div>

      {/* Receita vs Despesa (Evolução) + Composição Receita */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Target01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Receita vs Despesa — Evolução Mensal
            </CardTitle>
            <CardDescription>
              Comparativo de arrecadação e execução de despesa ao longo do ano
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  receita: { label: "Receita", color: "var(--chart-1)" },
                  despesa: { label: "Despesa", color: "var(--chart-2)" },
                } satisfies ChartConfig
              }
              className="h-[280px] w-full"
            >
              <AreaChart
                data={evolucaoConsolidada}
                margin={{ left: 0, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="mes"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`}
                  tickLine={false}
                  axisLine={false}
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
                  fill="var(--chart-1)"
                  fillOpacity={0.2}
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="despesa"
                  fill="var(--chart-2)"
                  fillOpacity={0.2}
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Composição da Receita</CardTitle>
            <CardDescription>Distribuição por origem</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  valor: { label: "Valor" },
                  "Receitas Próprias": {
                    label: "Próprias",
                    color: "var(--chart-1)",
                  },
                  "Transf. Estaduais": {
                    label: "Estaduais",
                    color: "var(--chart-2)",
                  },
                  "Transf. Federais": {
                    label: "Federais",
                    color: "var(--chart-3)",
                  },
                  "Outras Receitas": {
                    label: "Outras",
                    color: "var(--chart-4)",
                  },
                } satisfies ChartConfig
              }
              className="mx-auto aspect-square h-[240px]"
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
                  data={composicaoReceita}
                  dataKey="valor"
                  nameKey="nome"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                />
                <ChartLegend content={<ChartLegendContent nameKey="nome" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resumo dos Módulos */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Compras */}
        <Card className="border-l-4 border-l-[var(--chart-1)]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <HugeiconsIcon
                icon={ShoppingCartIcon}
                strokeWidth={2}
                className="size-4"
              />
              Compras e Licitações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">
                {formatNumber(compras.contratosAtivos)}
              </span>
              <span className="text-xs text-muted-foreground">
                contratos ativos
              </span>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valor contratado</span>
                <span className="font-medium">
                  {formatMillions(compras.valorContratado)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Economia obtida</span>
                <span className="font-medium text-green-600">
                  {formatMillions(compras.economiaPeriodo)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Licitações em andamento
                </span>
                <span className="font-medium">
                  {compras.licitacoesAndamento}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={compras.taxaEconomia * 10} className="h-2" />
              <span className="text-xs font-medium">
                {compras.taxaEconomia}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Taxa de economia acima da meta de 5%
            </p>
          </CardContent>
        </Card>

        {/* RH */}
        <Card className="border-l-4 border-l-[var(--chart-2)]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <HugeiconsIcon
                icon={UserMultipleIcon}
                strokeWidth={2}
                className="size-4"
              />
              Recursos Humanos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">
                {formatNumber(rh.totalFuncionarios)}
              </span>
              <span className="text-xs text-muted-foreground">servidores</span>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Folha mensal</span>
                <span className="font-medium">
                  {formatMillions(rh.folhaPagamento)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Horas extras</span>
                <span className="font-medium text-amber-600">
                  {formatCurrency(rh.horasExtras)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pessoal / RCL</span>
                <span className="font-medium">
                  {despesa.percentualPessoalRCL}%
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 rounded-lg border p-2 text-center text-xs">
              <div>
                <div className="font-semibold">{rh.absenteismo}%</div>
                <div className="text-muted-foreground">Absenteísmo</div>
              </div>
              <div>
                <div className="font-semibold">{rh.turnover}%</div>
                <div className="text-muted-foreground">Turnover</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tributos */}
        <Card className="border-l-4 border-l-[var(--chart-3)]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <HugeiconsIcon
                icon={Invoice01Icon}
                strokeWidth={2}
                className="size-4"
              />
              Tributos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">
                {formatMillions(tributacao.receitaTributaria)}
              </span>
              <span className="text-xs text-muted-foreground">arrecadado</span>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">IPTU</span>
                <span className="font-medium">
                  {formatMillions(tributacao.iptu)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ISS</span>
                <span className="font-medium">
                  {formatMillions(tributacao.iss)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dívida ativa</span>
                <span className="font-medium text-red-600">
                  {formatMillions(tributacao.dividaAtiva)}
                </span>
              </div>
            </div>
            <div className="rounded-lg border p-2 text-center text-xs">
              <div className="font-semibold text-amber-600">
                {tributacao.inadimplencia}%
              </div>
              <div className="text-muted-foreground">Inadimplência geral</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Despesa por Função + Indicadores Chave */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Wallet01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Despesa por Função
            </CardTitle>
            <CardDescription>
              Maiores áreas de gasto do município
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {despesaPorFuncao.map((item) => (
                <div key={item.funcao} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.funcao}</span>
                    <span className="text-muted-foreground">
                      {formatMillions(item.valor)} ({item.percentual}%)
                    </span>
                  </div>
                  <Progress value={item.percentual} className="h-2" />
                </div>
              ))}
            </div>
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
              Indicadores-Chave de Gestão
            </CardTitle>
            <CardDescription>
              Acompanhamento das metas municipais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Indicador</TableHead>
                  <TableHead className="text-right">Realizado</TableHead>
                  <TableHead className="text-right">Meta</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {indicadoresChave.map((ind) => (
                  <TableRow key={ind.indicador}>
                    <TableCell className="font-medium">
                      {ind.indicador}
                    </TableCell>
                    <TableCell className="text-right">{ind.valor}%</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {ind.meta}%
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          ind.status === "atingido" ? "secondary" : "outline"
                        }
                        className={
                          ind.status === "atingido"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        }
                      >
                        {ind.status === "atingido" ? "Atingido" : "Atenção"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Resumo Financeiro Rápido */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Aplicações Financeiras
            </CardTitle>
            <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/30">
              <HugeiconsIcon
                icon={BankIcon}
                strokeWidth={2}
                className="size-4 text-indigo-600"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatMillions(financeiro.aplicacoes)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Rendimento acumulado: R$ 415,5K
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valor Contratado
            </CardTitle>
            <div className="rounded-full bg-cyan-100 p-2 dark:bg-cyan-900/30">
              <HugeiconsIcon
                icon={ShoppingCartIcon}
                strokeWidth={2}
                className="size-4 text-cyan-600"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatMillions(compras.valorContratado)}
            </div>
            <div className="mt-1 flex items-center gap-1">
              <Badge
                variant="outline"
                className="bg-green-50 text-xs dark:bg-green-950/30"
              >
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  strokeWidth={2}
                  className="mr-1 size-3"
                />
                -{compras.taxaEconomia}%
              </Badge>
              <span className="text-xs text-muted-foreground">economia</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Dívida Ativa
            </CardTitle>
            <div className="rounded-full bg-red-100 p-2 dark:bg-red-900/30">
              <HugeiconsIcon
                icon={Clock01Icon}
                strokeWidth={2}
                className="size-4 text-red-600"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatMillions(tributacao.dividaAtiva)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Inadimplência: {tributacao.inadimplencia}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Aprovação TCE
            </CardTitle>
            <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/30">
              <HugeiconsIcon
                icon={SecurityCheckIcon}
                strokeWidth={2}
                className="size-4 text-emerald-600"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {prestacaoContas.taxaAprovacaoTCE}%
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Contas julgadas regulares
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Consolidados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={AlertCircleIcon}
              strokeWidth={2}
              className="size-5"
            />
            Alertas e Notificações
          </CardTitle>
          <CardDescription>
            Principais pontos de atenção de todos os módulos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {alertasConsolidados.map((alerta, index) => (
            <Alert
              key={index}
              variant={alerta.tipo === "warning" ? "destructive" : "default"}
            >
              {alerta.tipo === "warning" ? (
                <HugeiconsIcon
                  icon={AlertCircleIcon}
                  strokeWidth={2}
                  className="size-4"
                />
              ) : alerta.tipo === "success" ? (
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  strokeWidth={2}
                  className="size-4"
                />
              ) : (
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  strokeWidth={2}
                  className="size-4"
                />
              )}
              <AlertTitle className="flex items-center gap-2">
                {alerta.titulo}
                <Badge variant="outline" className="text-xs">
                  {alerta.modulo}
                </Badge>
              </AlertTitle>
              <AlertDescription>{alerta.descricao}</AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
