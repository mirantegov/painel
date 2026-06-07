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
  BulbIcon,
  Flag01Icon,
  Alert02Icon,
  ChartLineData02Icon,
} from "@hugeicons/core-free-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { KpiCard } from "@/components/ui/kpi-card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
                  {prestacaoContas.irregulares > 1 ? "es" : ""}
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
              className="mx-auto aspect-auto h-[280px] w-full"
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
                <ChartLegend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  content={
                    <ChartPieValueLegend
                      nameKey="nome"
                      valueKey="valor"
                      valueFormatter={formatMillions}
                    />
                  }
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resumo dos Módulos */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Compras */}
        <KpiCard
          title="Compras e Licitações"
          icon={ShoppingCartIcon}
          value={formatNumber(compras.contratosAtivos)}
          borderColor="border-l-[var(--chart-1)]"
          footer={
            <>
              <p className="text-xs text-muted-foreground">contratos ativos</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">
                    Valor contratado
                  </span>
                  <span className="font-medium">
                    {formatMillions(compras.valorContratado)}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Economia obtida</span>
                  <span className="font-medium text-green-600">
                    {formatMillions(compras.economiaPeriodo)}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
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
            </>
          }
        />

        {/* RH */}
        <KpiCard
          title="Recursos Humanos"
          icon={UserMultipleIcon}
          value={formatNumber(rh.totalFuncionarios)}
          borderColor="border-l-[var(--chart-2)]"
          footer={
            <>
              <p className="text-xs text-muted-foreground">servidores</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Folha mensal</span>
                  <span className="font-medium">
                    {formatMillions(rh.folhaPagamento)}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Horas extras</span>
                  <span className="font-medium text-amber-600">
                    {formatCurrency(rh.horasExtras)}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
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
            </>
          }
        />

        {/* Tributos */}
        <KpiCard
          title="Tributos"
          icon={Invoice01Icon}
          value={formatMillions(tributacao.receitaTributaria)}
          borderColor="border-l-[var(--chart-3)]"
          footer={
            <>
              <p className="text-xs text-muted-foreground">arrecadado</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">IPTU</span>
                  <span className="font-medium">
                    {formatMillions(tributacao.iptu)}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">ISS</span>
                  <span className="font-medium">
                    {formatMillions(tributacao.iss)}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
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
            </>
          }
        />
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
        <KpiCard
          title="Aplicações Financeiras"
          icon={BankIcon}
          value={formatMillions(financeiro.aplicacoes)}
          borderColor="border-l-indigo-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Rendimento acumulado: R$ 415,5K
            </p>
          }
        />

        <KpiCard
          title="Valor Contratado"
          icon={ShoppingCartIcon}
          value={formatMillions(compras.valorContratado)}
          borderColor="border-l-cyan-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                strokeWidth={2}
                className="size-3 text-green-600"
              />
              <span className="text-green-600">-{compras.taxaEconomia}%</span>
              <span>economia</span>
            </div>
          }
        />

        <KpiCard
          title="Dívida Ativa"
          icon={Clock01Icon}
          value={formatMillions(tributacao.dividaAtiva)}
          borderColor="border-l-red-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Inadimplência: {tributacao.inadimplencia}%
            </p>
          }
        />

        <KpiCard
          title="Aprovação TCE"
          icon={SecurityCheckIcon}
          value={`${prestacaoContas.taxaAprovacaoTCE}%`}
          borderColor="border-l-emerald-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Contas julgadas regulares
            </p>
          }
        />
      </div>

      {/* ======================================================= */}
      {/* SEPARADOR ANÁLISES                                       */}
      {/* ======================================================= */}
      <div className="relative py-4">
        <Separator />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-muted px-4 dark:bg-background">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Análises
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Análise Inteligente */}
        <Card className="border-l-4 border-l-primary bg-gradient-to-br from-primary/5 via-background to-background">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <HugeiconsIcon
                  icon={BulbIcon}
                  strokeWidth={2}
                  className="size-5 text-primary"
                />
              </div>
              <div>
                <CardTitle>Análise Inteligente — Visão Consolidada</CardTitle>
                <CardDescription>
                  Insights gerados com base nos indicadores consolidados do município
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Visão Geral */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-foreground leading-relaxed">
                O município apresenta{" "}
                <strong>desempenho fiscal equilibrado</strong> no exercício de
                2025, com arrecadação de{" "}
                <strong>{receita.percentual}%</strong> da receita prevista e
                execução orçamentária de{" "}
                <strong>{despesa.percentualExecucao}%</strong>. O gasto com
                pessoal de <strong>{despesa.percentualPessoalRCL}% da RCL</strong>{" "}
                mantém-se dentro do limite prudencial de 51,3% (LRF), e a
                conformidade CAUC de{" "}
                <strong>{prestacaoContas.conformidade}%</strong> assegura
                habilitação para celebração de convênios federais.
              </p>
            </div>

            <Separator />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="destaques">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Flag01Icon}
                      strokeWidth={2}
                      className="size-4 text-green-600"
                    />
                    <span>Pontos de Destaque Positivo</span>
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
                          Alta execução em Saúde e Educação:
                        </strong>{" "}
                        As funções de Saúde (25,2%) e Educação (30,5%)
                        concentram 55,7% das despesas, com taxas de execução
                        acima de 90%, refletindo priorização das áreas
                        essenciais ao cidadão.
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
                          Economia nas contratações ({compras.taxaEconomia}%):
                        </strong>{" "}
                        O processo de licitações gerou economia de{" "}
                        {formatMillions(compras.economiaPeriodo)} no período,
                        demonstrando eficiência na gestão de compras e
                        contratos, com {compras.licitacoesAndamento} processos
                        em andamento.
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
                          Saldo disponível positivo:
                        </strong>{" "}
                        A disponibilidade financeira de{" "}
                        {formatMillions(financeiro.saldoTotal)} cobre mais de
                        dois meses de despesas correntes, demonstrando
                        liquidez adequada para honrar compromissos imediatos.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="atencao">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={AlertCircleIcon}
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
                          Arrecadação de IPTU abaixo da meta:
                        </strong>{" "}
                        O IPTU ({formatMillions(tributacao.iptu)}) representa o
                        maior tributo próprio, mas a inadimplência de{" "}
                        {tributacao.inadimplencia}% e a dívida ativa de{" "}
                        {formatMillions(tributacao.dividaAtiva)} indicam
                        necessidade de intensificação da cobrança.
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
                          Absenteísmo e horas extras acima do ideal:
                        </strong>{" "}
                        O absenteísmo de {rh.absenteismo}% e as horas extras de{" "}
                        {formatMillions(rh.horasExtras)} sinalizam pressão sobre
                        a folha de pagamento ({formatMillions(rh.folhaPagamento)}
                        /mês) e a necessidade de revisão da gestão de pessoal.
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
                          Conformidade CAUC com pendências:
                        </strong>{" "}
                        Os {prestacaoContas.irregulares} item irregular e{" "}
                        {prestacaoContas.aComprovar} itens a comprovar no CAUC
                        precisam ser regularizados com prioridade para não
                        comprometer o acesso a transferências voluntárias federais.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="recomendacoes">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={BulbIcon}
                      strokeWidth={2}
                      className="size-4 text-blue-600"
                    />
                    <span>Recomendações Estratégicas</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-6">
                    <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        1. Regularizar pendências no CAUC
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Priorizar a regularização do item irregular e dos{" "}
                        {prestacaoContas.aComprovar} itens a comprovar no CAUC
                        para garantir plena habilitação ao recebimento de
                        transferências voluntárias da União.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        2. Intensificar recuperação da dívida ativa
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Com {formatMillions(tributacao.dividaAtiva)} em dívida
                        ativa, expandir o programa REFIS e fortalecer a
                        cobrança administrativa e judicial para recuperar
                        receitas próprias e reduzir a inadimplência tributária.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        3. Controlar horas extras e absenteísmo em RH
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Implementar política de gestão de presença e revisão
                        de escalas para reduzir o absenteísmo ({rh.absenteismo}%)
                        e o gasto com horas extras, otimizando o custo de
                        pessoal.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        4. Manter ritmo de execução orçamentária
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Com execução de {despesa.percentualExecucao}%, garantir
                        que as secretarias com menor desempenho acelerem os
                        processos licitatórios pendentes para encerrar o
                        exercício com execução superior a 95%.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="projecoes">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={ChartLineData02Icon}
                      strokeWidth={2}
                      className="size-4 text-purple-600"
                    />
                    <span>Projeções e Cenários</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-6">
                    <p className="text-sm text-muted-foreground">
                      Com base na tendência histórica de arrecadação e execução,
                      projeta-se para o encerramento do exercício:
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-2xl font-bold text-green-600">97%</p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Otimista
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Execução Final
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 text-center bg-primary/5">
                        <p className="text-2xl font-bold text-primary">94%</p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Provável
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Execução Final
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-2xl font-bold text-amber-600">90%</p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Conservador
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Execução Final
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      * Projeções baseadas no histórico consolidado dos últimos
                      3 exercícios e no ritmo atual de execução das secretarias.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator />

            {/* Conclusão */}
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex gap-3">
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  strokeWidth={2}
                  className="size-5 text-primary shrink-0 mt-0.5"
                />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Conclusão da Análise
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    O município demonstra gestão fiscal responsável, com
                    receita arrecadada de {receita.percentual}% da previsão,
                    execução orçamentária de {despesa.percentualExecucao}% e
                    gastos de pessoal ({despesa.percentualPessoalRCL}% da RCL)
                    dentro dos limites legais. As ações prioritárias
                    concentram-se na regularização do CAUC, recuperação da
                    dívida ativa e controle de horas extras. Com as medidas
                    recomendadas, o município tem condições de encerrar o
                    exercício com indicadores de saúde fiscal acima de 94%,
                    mantendo o padrão de qualidade na gestão dos recursos
                    públicos municipais.
                  </p>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Análise gerada em {new Date().toLocaleDateString("pt-BR")} às{" "}
                    {new Date().toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    | Visão Geral Consolidada — Exercício 2025
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo Analítico */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo Analítico</CardTitle>
            <CardDescription>
              Indicadores consolidados de desempenho municipal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Execução Orçamentária
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {despesa.percentualExecucao}%
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    <HugeiconsIcon
                      icon={ArrowUp01Icon}
                      strokeWidth={2}
                      className="size-3"
                    />
                    +4.1%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Do orçamento atualizado empenhado
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Arrecadação / Previsão
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {receita.percentual}%
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    <HugeiconsIcon
                      icon={ArrowUp01Icon}
                      strokeWidth={2}
                      className="size-3"
                    />
                    +1.8%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Da receita prevista arrecadada
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Conformidade CAUC
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {prestacaoContas.conformidade}%
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs text-amber-600 border-amber-300"
                  >
                    {prestacaoContas.irregulares} irregular
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {prestacaoContas.regulares} itens regulares de 26
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Pessoal / RCL
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {despesa.percentualPessoalRCL}%
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    Limite: 54%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Dentro do limite prudencial da LRF
                </p>
              </div>
            </div>
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
