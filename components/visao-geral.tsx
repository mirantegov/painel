"use client";

import * as React from "react";
import { useSnapshot } from "@/components/use-snapshot";
import { VISAO_GERAL_SNAPSHOT } from "@/lib/demo-visao-geral";
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
  CartesianGrid,
  Pie,
  PieChart,
  XAxis,
  YAxis,
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
} from "@hugeicons/core-free-icons";
import { KpiCard } from "@/components/ui/kpi-card";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );

const formatMillions = (value: number) =>
  `R$ ${(value / 1_000_000).toFixed(1)}M`;

const formatNumber = (value: number) =>
  new Intl.NumberFormat("pt-BR").format(value);

export function VisaoGeral() {
  const {
    receita,
    despesa,
    financeiro,
    compras,
    rh,
    tributacao,
    prestacaoContas,
    evolucaoConsolidada,
    composicaoReceita,
    despesaPorFuncao,
    indicadoresChave,
  } = useSnapshot("visao-geral", VISAO_GERAL_SNAPSHOT);

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
    </div>
  );
}
