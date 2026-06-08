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
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp01Icon,
  Wallet01Icon,
  MoneyReceiveSquareIcon,
  Invoice01Icon,
  Building06Icon,
  CheckmarkCircle02Icon,
  Target01Icon,
  ChartLineData02Icon,
  PieChart02Icon,
  Clock01Icon,
  StarIcon,
  Alert02Icon,
  MoneyAdd01Icon,
  MoneySend01Icon,
  BankIcon,
  Building04Icon,
  CreditCardIcon,
  CoinsSwapIcon,
  FolderCheckIcon,
  UserMultipleIcon,
  Coins01Icon,
} from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { KpiCard } from "@/components/ui/kpi-card";
import { useSnapshot } from "@/components/use-snapshot";
import { FINANCEIRO_SNAPSHOT } from "@/lib/demo-financeiro";

// Formatadores
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatMillions = (value: number) => {
  return `R$ ${(value / 1000000).toFixed(1)}M`;
};

export function FinanceiroMunicipal() {
  const {
    fontesRecursos,
    contasBancarias,
    receitasLancadas,
    aplicacoesFinanceiras,
    ultimosPagamentos,
    maioresFornecedores,
    maioresContribuintes,
    saldosAPagar,
    saldosAReceber,
    eventosEmpenhos,
    eventosLiquidacoes,
    eventosPagamentos,
    eventosArrecadacao,
    eventosTransferencias,
    conciliacoesBancarias,
    fluxoCaixaMensal,
    totaisFinanceiros,
    metasFinanceiro,
    disponibilidadePorFonte,
    projecaoFluxoCaixa,
    saldoAcumuladoProjetado,
    mesesCobertura,
    coberturaComPromissos,
    concentracaoFornecedores,
    hhi,
    riscoConcentracao,
    benchmarkFinanceiro,
  } = useSnapshot("financeiro", FINANCEIRO_SNAPSHOT);
  const [abaSelecionada, setAbaSelecionada] = React.useState("fontes");

  return (
    <div className="space-y-8">
      {/* KPIs Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Saldo Total em Contas"
          icon={Wallet01Icon}
          value={fmtBRL(totaisFinanceiros.saldoTotal)}
          borderColor="border-l-blue-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-green-600"
              />
              <span className="text-green-600">+2.3%</span>
              <span>vs. mês anterior</span>
            </div>
          }
        />
        <KpiCard
          title="Total Entradas (Ano)"
          icon={MoneyAdd01Icon}
          value={fmtBRL(totaisFinanceiros.totalEntradas)}
          borderColor="border-l-green-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-green-600"
              />
              <span className="text-green-600">+8.5%</span>
              <span>vs. ano anterior</span>
            </div>
          }
        />
        <KpiCard
          title="Total Saídas (Ano)"
          icon={MoneySend01Icon}
          value={fmtBRL(totaisFinanceiros.totalSaidas)}
          borderColor="border-l-red-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-amber-600"
              />
              <span className="text-amber-600">+6.2%</span>
              <span>vs. ano anterior</span>
            </div>
          }
        />
        <KpiCard
          title="Aplicações Financeiras"
          icon={CoinsSwapIcon}
          value={fmtBRL(totaisFinanceiros.aplicacoes)}
          borderColor="border-l-purple-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Rendimento acumulado:</span>
              <span className="text-green-600 font-medium">R$ 415,5K</span>
            </div>
          }
        />
      </div>

      {/* Fluxo de Caixa */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={ChartLineData02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Fluxo de Caixa Mensal
              </CardTitle>
              <CardDescription>
                Entradas, saídas e saldo acumulado
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-green-600">
              Superávit:{" "}
              {formatCurrency(
                totaisFinanceiros.totalEntradas - totaisFinanceiros.totalSaidas,
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={
              {
                entradas: { label: "Entradas", color: "var(--chart-2)" },
                saidas: { label: "Saídas", color: "var(--chart-1)" },
                saldo: { label: "Saldo", color: "var(--chart-4)" },
              } satisfies ChartConfig
            }
            className="h-[300px] w-full"
          >
            <AreaChart data={fluxoCaixaMensal} margin={{ left: 0, right: 12 }}>
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
                tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
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
                dataKey="entradas"
                fill="var(--color-entradas)"
                fillOpacity={0.3}
                stroke="var(--color-entradas)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="saidas"
                fill="var(--color-saidas)"
                fillOpacity={0.3}
                stroke="var(--color-saidas)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="saldo"
                stroke="var(--color-saldo)"
                strokeWidth={2}
                dot={false}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Metas de Gestão Financeira */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Target01Icon}
              strokeWidth={2}
              className="size-5"
            />
            Metas de Gestão Financeira
          </CardTitle>
          <CardDescription>
            Acompanhamento dos indicadores de desempenho
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metasFinanceiro.map((meta, index) => (
              <div key={index} className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{meta.indicador}</p>
                  <Badge
                    variant={
                      meta.status === "atingido" ? "secondary" : "outline"
                    }
                    className={
                      meta.status === "atingido"
                        ? "text-green-600"
                        : "text-amber-600"
                    }
                  >
                    {meta.status === "atingido" ? "Atingido" : "Atenção"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Meta:{" "}
                      {meta.unidade === "R$"
                        ? formatCurrency(meta.meta)
                        : `${meta.meta}${meta.unidade}`}
                    </span>
                    <span className="font-medium">
                      {meta.status === "atingido" ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <HugeiconsIcon
                            icon={CheckmarkCircle02Icon}
                            strokeWidth={2}
                            className="size-3"
                          />
                          {meta.unidade === "R$"
                            ? formatCurrency(meta.realizado)
                            : `${meta.realizado}${meta.unidade}`}
                        </span>
                      ) : (
                        <span className="text-amber-600">
                          {meta.unidade === "R$"
                            ? formatCurrency(meta.realizado)
                            : `${meta.realizado}${meta.unidade}`}
                        </span>
                      )}
                    </span>
                  </div>
                  <Progress
                    value={(meta.realizado / meta.meta) * 100}
                    className={`h-2 ${meta.status === "atingido" ? "[&>div]:bg-green-500" : ""}`}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {meta.descricao}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Controles Detalhados em Tabs */}
      <Tabs
        value={abaSelecionada}
        onValueChange={setAbaSelecionada}
        className="w-full"
      >
        <TabsList className="flex w-full flex-wrap h-auto gap-1">
          <TabsTrigger value="fontes" className="text-xs">
            Fontes
          </TabsTrigger>
          <TabsTrigger value="contas" className="text-xs">
            Contas
          </TabsTrigger>
          <TabsTrigger value="receitas" className="text-xs">
            Receitas
          </TabsTrigger>
          <TabsTrigger value="aplicacoes" className="text-xs">
            Aplicações
          </TabsTrigger>
          <TabsTrigger value="pagamentos" className="text-xs">
            Pagamentos
          </TabsTrigger>
          <TabsTrigger value="conciliacao" className="text-xs">
            Conciliação
          </TabsTrigger>
        </TabsList>

        {/* Fontes de Recursos */}
        <TabsContent value="fontes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Building06Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Controle por Fonte de Recursos
              </CardTitle>
              <CardDescription>
                Movimentação financeira por fonte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Fonte</TableHead>
                    <TableHead className="text-right">Saldo Inicial</TableHead>
                    <TableHead className="text-right">Entradas</TableHead>
                    <TableHead className="text-right">Saidas</TableHead>
                    <TableHead className="text-right">Saldo Atual</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fontesRecursos.map((fonte) => (
                    <TableRow key={fonte.codigo}>
                      <TableCell>
                        <Badge variant="outline">{fonte.codigo}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {fonte.nome}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(fonte.saldoInicial)}
                      </TableCell>
                      <TableCell className="text-right text-green-600">
                        {formatCurrency(fonte.entradas)}
                      </TableCell>
                      <TableCell className="text-right text-red-600">
                        {formatCurrency(fonte.saidas)}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(fonte.saldoAtual)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(
                        fontesRecursos.reduce((a, b) => a + b.saldoInicial, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-600">
                      {formatCurrency(
                        fontesRecursos.reduce((a, b) => a + b.entradas, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold text-red-600">
                      {formatCurrency(
                        fontesRecursos.reduce((a, b) => a + b.saidas, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(
                        fontesRecursos.reduce((a, b) => a + b.saldoAtual, 0),
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contas Bancárias */}
        <TabsContent value="contas" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={BankIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Controle por Conta Bancária
              </CardTitle>
              <CardDescription>Saldo e status das contas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {contasBancarias.map((conta, index) => (
                  <Card
                    key={index}
                    className={cn(
                      "relative overflow-hidden border-l-4",
                      conta.status === "conciliada"
                        ? "border-l-green-500"
                        : conta.status === "pendente"
                          ? "border-l-amber-500"
                          : "border-l-red-500",
                    )}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardDescription className="font-medium">
                          {conta.banco}
                        </CardDescription>
                        <Badge
                          variant={
                            conta.status === "conciliada"
                              ? "secondary"
                              : conta.status === "pendente"
                                ? "outline"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {conta.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{conta.tipo}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Ag: {conta.agencia} / CC: {conta.conta}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs text-muted-foreground">
                            Fonte {conta.fonte}
                          </span>
                          <span className="text-xl font-bold">
                            {formatCurrency(conta.saldo)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Receitas Lançadas */}
        <TabsContent value="receitas" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Invoice01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Receitas Lançadas
              </CardTitle>
              <CardDescription>Últimos lançamentos de receitas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Contribuinte</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receitasLancadas.map((receita, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-muted-foreground">
                        {receita.data}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {receita.documento}
                      </TableCell>
                      <TableCell className="font-medium">
                        {receita.contribuinte}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{receita.tipo}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(receita.valor)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            receita.status === "pago"
                              ? "secondary"
                              : receita.status === "pendente"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {receita.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aplicações Financeiras */}
        <TabsContent value="aplicacoes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Coins01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Aplicações Financeiras
              </CardTitle>
              <CardDescription>Investimentos e rendimentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aplicacoesFinanceiras.map((app, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <HugeiconsIcon
                            icon={BankIcon}
                            strokeWidth={2}
                            className="size-4 text-muted-foreground"
                          />
                          <span className="font-medium">{app.instituicao}</span>
                          <Badge variant="secondary">{app.tipo}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Aplicado em: {app.dataAplicacao} | Taxa: {app.taxa}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Aplicado
                          </p>
                          <p className="font-semibold">
                            {formatCurrency(app.valorAplicado)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Rendimento
                          </p>
                          <p className="font-semibold text-green-600">
                            +{formatCurrency(app.rendimento)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Saldo Atual
                          </p>
                          <p className="font-bold">
                            {formatCurrency(app.saldoAtual)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Progress
                      value={(app.rendimento / app.valorAplicado) * 100}
                      className="mt-3 h-1.5"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-muted p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total em Aplicações</span>
                  <span className="text-xl font-bold">
                    {formatCurrency(
                      aplicacoesFinanceiras.reduce(
                        (a, b) => a + b.saldoAtual,
                        0,
                      ),
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pagamentos */}
        <TabsContent value="pagamentos" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={CreditCardIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Controle de Pagamentos
              </CardTitle>
              <CardDescription>Últimos pagamentos realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Empenho</TableHead>
                    <TableHead>Credor</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fonte</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ultimosPagamentos.map((pag, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-muted-foreground">
                        {pag.data}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {pag.empenho}
                      </TableCell>
                      <TableCell className="font-medium">
                        {pag.credor}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{pag.tipo}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{pag.fonte}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(pag.valor)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conciliação */}
        <TabsContent value="conciliacao" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={FolderCheckIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Conciliações Bancárias
              </CardTitle>
              <CardDescription>
                Status das conciliações do período
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Conta</TableHead>
                    <TableHead>Banco</TableHead>
                    <TableHead>Competência</TableHead>
                    <TableHead className="text-right">Saldo Banco</TableHead>
                    <TableHead className="text-right">Saldo Contábil</TableHead>
                    <TableHead className="text-right">Diferença</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conciliacoesBancarias.map((conc, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{conc.conta}</TableCell>
                      <TableCell>{conc.banco}</TableCell>
                      <TableCell>{conc.competencia}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(conc.saldoBanco)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(conc.saldoContabil)}
                      </TableCell>
                      <TableCell
                        className={`text-right ${conc.diferenca > 0 ? "text-red-600 font-medium" : ""}`}
                      >
                        {formatCurrency(conc.diferenca)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            conc.status === "conciliada"
                              ? "secondary"
                              : conc.status === "pendente"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {conc.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Maiores Fornecedores e Contribuintes lado a lado */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Maiores Fornecedores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Building04Icon}
                strokeWidth={2}
                className="size-5"
              />
              Maiores Fornecedores/Credores
            </CardTitle>
            <CardDescription>Top 5 por valor total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maioresFornecedores.map((forn, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar size="sm">
                    <AvatarFallback className="text-xs">
                      {index + 1}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate max-w-[180px]">
                        {forn.nome}
                      </p>
                      <span className="text-sm font-semibold">
                        {formatCurrency(forn.totalPago)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{forn.cnpj}</span>
                      <Badge variant="outline" className="text-xs">
                        A pagar: {formatCurrency(forn.aPagar)}
                      </Badge>
                    </div>
                    <Progress
                      value={
                        (forn.totalPago / maioresFornecedores[0].totalPago) *
                        100
                      }
                      className="h-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Maiores Contribuintes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={UserMultipleIcon}
                strokeWidth={2}
                className="size-5"
              />
              Maiores Contribuintes
            </CardTitle>
            <CardDescription>Top 5 por arrecadacao</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maioresContribuintes.map((cont, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar size="sm">
                    <AvatarFallback className="text-xs">
                      {index + 1}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate max-w-[180px]">
                        {cont.nome}
                      </p>
                      <span className="text-sm font-semibold text-green-600">
                        {formatCurrency(cont.arrecadado)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{cont.cnpj}</span>
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">
                          {cont.tributo}
                        </Badge>
                        <Badge
                          variant={
                            cont.regularidade === "regular"
                              ? "secondary"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {cont.regularidade}
                        </Badge>
                      </div>
                    </div>
                    <Progress
                      value={
                        (cont.arrecadado / maioresContribuintes[0].arrecadado) *
                        100
                      }
                      className="h-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saldos a Pagar e a Receber */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Saldos a Pagar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={MoneySend01Icon}
                strokeWidth={2}
                className="size-5 text-red-600"
              />
              Saldos a Pagar por Vencimento
            </CardTitle>
            <CardDescription>
              Total: {formatCurrency(totaisFinanceiros.aPagar)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {saldosAPagar.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-medium ${item.vencimento === "Vencidos" ? "text-red-600" : ""}`}
                      >
                        {item.vencimento}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {item.quantidade}
                      </Badge>
                    </div>
                    <span className="font-semibold">
                      {formatCurrency(item.valor)}
                    </span>
                  </div>
                  <Progress
                    value={item.percentual}
                    className={`h-2 ${item.vencimento === "Vencidos" ? "[&>div]:bg-red-500" : ""}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Saldos a Receber */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={MoneyReceiveSquareIcon}
                strokeWidth={2}
                className="size-5 text-green-600"
              />
              Saldos a Receber por Tipo
            </CardTitle>
            <CardDescription>
              Total: {formatCurrency(totaisFinanceiros.aReceber)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Vencido</TableHead>
                  <TableHead className="text-right">A Vencer</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {saldosAReceber.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.tipo}</TableCell>
                    <TableCell className="text-right text-red-600">
                      {formatCurrency(item.vencido)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatCurrency(item.aVencer)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(item.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right font-bold text-red-600">
                    {formatCurrency(
                      saldosAReceber.reduce((a, b) => a + b.vencido, 0),
                    )}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(
                      saldosAReceber.reduce((a, b) => a + b.aVencer, 0),
                    )}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(
                      saldosAReceber.reduce((a, b) => a + b.total, 0),
                    )}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Eventos Recentes por Tipo - Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Clock01Icon}
              strokeWidth={2}
              className="size-5"
            />
            Eventos Recentes por Tipo
          </CardTitle>
          <CardDescription>
            Últimas movimentações do sistema financeiro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="empenhos" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="empenhos" className="text-xs">
                Empenhos
              </TabsTrigger>
              <TabsTrigger value="liquidacoes" className="text-xs">
                Liquidações
              </TabsTrigger>
              <TabsTrigger value="pagamentos" className="text-xs">
                Pagamentos
              </TabsTrigger>
              <TabsTrigger value="arrecadacao" className="text-xs">
                Arrecadação
              </TabsTrigger>
              <TabsTrigger value="transferencias" className="text-xs">
                Transf.
              </TabsTrigger>
            </TabsList>

            <TabsContent value="empenhos" className="mt-4">
              <div className="space-y-3">
                {eventosEmpenhos.map((evento, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2.5 rounded-full bg-blue-500" />
                      {index < eventosEmpenhos.length - 1 && (
                        <div className="w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {evento.data} - {evento.hora}
                        </p>
                        <Badge variant="secondary">
                          {formatCurrency(evento.valor)}
                        </Badge>
                      </div>
                      <p className="text-sm">{evento.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="liquidacoes" className="mt-4">
              <div className="space-y-3">
                {eventosLiquidacoes.map((evento, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2.5 rounded-full bg-purple-500" />
                      {index < eventosLiquidacoes.length - 1 && (
                        <div className="w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {evento.data} - {evento.hora}
                        </p>
                        <Badge variant="secondary">
                          {formatCurrency(evento.valor)}
                        </Badge>
                      </div>
                      <p className="text-sm">{evento.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pagamentos" className="mt-4">
              <div className="space-y-3">
                {eventosPagamentos.map((evento, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2.5 rounded-full bg-red-500" />
                      {index < eventosPagamentos.length - 1 && (
                        <div className="w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {evento.data} - {evento.hora}
                        </p>
                        <Badge variant="secondary">
                          {formatCurrency(evento.valor)}
                        </Badge>
                      </div>
                      <p className="text-sm">{evento.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="arrecadacao" className="mt-4">
              <div className="space-y-3">
                {eventosArrecadacao.map((evento, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2.5 rounded-full bg-green-500" />
                      {index < eventosArrecadacao.length - 1 && (
                        <div className="w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {evento.data} - {evento.hora}
                        </p>
                        <Badge variant="secondary" className="text-green-600">
                          {formatCurrency(evento.valor)}
                        </Badge>
                      </div>
                      <p className="text-sm">{evento.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="transferencias" className="mt-4">
              <div className="space-y-3">
                {eventosTransferencias.map((evento, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2.5 rounded-full bg-amber-500" />
                      {index < eventosTransferencias.length - 1 && (
                        <div className="w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {evento.data} - {evento.hora}
                        </p>
                        <Badge variant="outline">
                          {formatCurrency(evento.valor)}
                        </Badge>
                      </div>
                      <p className="text-sm">{evento.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Disponibilidade por Fonte e Projeção de Fluxo de Caixa */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Disponibilidade por Fonte */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={PieChart02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Disponibilidade por Fonte
            </CardTitle>
            <CardDescription>
              Distribuição do saldo disponível por fonte de recurso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <ChartContainer
                config={
                  {
                    ordinarios: {
                      label: "Ordinários",
                      color: "var(--chart-1)",
                    },
                    educacao: { label: "Educação", color: "var(--chart-2)" },
                    saude: { label: "Saúde", color: "var(--chart-3)" },
                    fundeb: { label: "FUNDEB", color: "var(--chart-4)" },
                    sus: { label: "SUS", color: "var(--chart-5)" },
                    convenios: { label: "Convênios", color: "var(--chart-6)" },
                  } satisfies ChartConfig
                }
                className="mx-auto aspect-square h-[180px]"
              >
                <PieChart>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCurrency(Number(value))}
                        hideLabel
                      />
                    }
                  />
                  <Pie
                    data={disponibilidadePorFonte}
                    dataKey="valor"
                    nameKey="nome"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    label={({ percent }: { percent: number }) =>
                      `${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  />
                  <ChartLegend
                    content={<ChartLegendContent nameKey="nome" />}
                  />
                </PieChart>
              </ChartContainer>
              <div className="space-y-2">
                {disponibilidadePorFonte.map((fonte) => (
                  <div
                    key={fonte.nome}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">{fonte.nome}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {formatMillions(fonte.valor)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {(
                          (fonte.valor / totaisFinanceiros.saldoTotal) *
                          100
                        ).toFixed(1)}
                        %
                      </Badge>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex items-center justify-between text-sm font-bold">
                  <span>Total Disponível</span>
                  <span>{formatCurrency(totaisFinanceiros.saldoTotal)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projeção de Fluxo de Caixa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Projeção de Fluxo de Caixa
            </CardTitle>
            <CardDescription>
              Saldo projetado ao final:{" "}
              <strong
                className={
                  saldoAcumuladoProjetado > 0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {formatCurrency(saldoAcumuladoProjetado)}
              </strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projecaoFluxoCaixa.map((item) => (
                <div key={item.mes} className="rounded-lg border p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {item.mes}
                      </Badge>
                      <Badge
                        variant={
                          item.confianca === "alta"
                            ? "secondary"
                            : item.confianca === "media"
                              ? "outline"
                              : "destructive"
                        }
                        className={`text-xs ${item.confianca === "alta" ? "text-green-600" : item.confianca === "media" ? "text-amber-600" : ""}`}
                      >
                        Conf. {item.confianca}
                      </Badge>
                    </div>
                    <span
                      className={`text-sm font-bold ${item.saldoProjetado >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {item.saldoProjetado >= 0 ? "+" : ""}
                      {formatCurrency(item.saldoProjetado)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Entradas</span>
                      <span className="text-green-600 font-medium">
                        {formatMillions(item.entradasPrevistas)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Saidas</span>
                      <span className="text-red-600 font-medium">
                        {formatMillions(item.saidasPrevistas)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Alert
              className="mt-3"
              variant={
                projecaoFluxoCaixa[0].saldoProjetado < 0
                  ? "destructive"
                  : "default"
              }
            >
              <HugeiconsIcon
                icon={Alert02Icon}
                strokeWidth={2}
                className="size-4"
              />
              <AlertTitle>Atenção: Dezembro com déficit projetado</AlertTitle>
              <AlertDescription>
                Saídas elevadas previstas para dezembro (13º salário +
                fornecedores). Saldo disponível e suficiente para cobertura.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Cobertura de Compromissos e Concentração de Fornecedores */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Cobertura de Compromissos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Wallet01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Cobertura de Compromissos
            </CardTitle>
            <CardDescription>
              O saldo atual cobre{" "}
              <strong className="text-green-600">
                {mesesCobertura.toFixed(1)} meses
              </strong>{" "}
              de saídas médias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative h-6 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="absolute h-full rounded-full bg-green-500 transition-all"
                  style={{
                    width: `${Math.min((mesesCobertura / 4) * 100, 100)}%`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                  {mesesCobertura.toFixed(1)} meses de cobertura
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {coberturaComPromissos.map((item) => (
                  <div
                    key={item.indicador}
                    className="rounded-lg border p-3 text-center"
                  >
                    <p className="text-xs text-muted-foreground">
                      {item.indicador}
                    </p>
                    <p className="text-sm font-bold mt-1">{item.formatado}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    strokeWidth={2}
                    className="size-4 text-green-600"
                  />
                  <p className="text-sm">
                    <strong className="text-green-600">
                      Situação adequada.
                    </strong>{" "}
                    <span className="text-muted-foreground">
                      O município possui liquidez para honrar compromissos dos
                      próximos {mesesCobertura.toFixed(0)} meses sem novas
                      entradas.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Concentração de Fornecedores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Building04Icon}
                strokeWidth={2}
                className="size-5"
              />
              Concentração de Fornecedores
            </CardTitle>
            <CardDescription>
              Índice HHI: <strong>{hhi.toFixed(0)}</strong> — Risco:{" "}
              <Badge
                variant={
                  riscoConcentracao === "alto"
                    ? "destructive"
                    : riscoConcentracao === "moderado"
                      ? "outline"
                      : "secondary"
                }
                className={
                  riscoConcentracao === "alto"
                    ? ""
                    : riscoConcentracao === "moderado"
                      ? "text-amber-600"
                      : "text-green-600"
                }
              >
                {riscoConcentracao.charAt(0).toUpperCase() +
                  riscoConcentracao.slice(1)}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {concentracaoFornecedores.map((forn, index) => (
                <div key={forn.cnpj} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="text-xs w-6 justify-center"
                      >
                        {index + 1}
                      </Badge>
                      <span className="text-muted-foreground truncate max-w-[180px]">
                        {forn.nome}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {formatMillions(forn.totalPago)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {forn.percentual}%
                      </Badge>
                    </div>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="absolute h-full rounded-full bg-primary transition-all"
                      style={{ width: `${forn.percentual}%` }}
                    />
                    <div
                      className="absolute h-full rounded-full bg-amber-300/40"
                      style={{ width: `${forn.acumulado}%` }}
                    />
                  </div>
                  <div className="flex justify-end text-xs text-muted-foreground">
                    Acumulado: {forn.acumulado}%
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Análise de Pareto:</strong>{" "}
                Os 5 maiores fornecedores concentram <strong>100%</strong> dos
                pagamentos analisados. O índice HHI de {hhi.toFixed(0)} indica
                concentração{" "}
                {riscoConcentracao === "alto"
                  ? "alta — recomenda-se diversificar"
                  : riscoConcentracao === "moderado"
                    ? "moderada — monitorar"
                    : "baixa — adequado"}
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benchmark Financeiro Municipal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={StarIcon} strokeWidth={2} className="size-5" />
            Comparativo financeiro municipal
          </CardTitle>
          <CardDescription>
            Comparação de indicadores financeiros com municípios de porte
            similar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Município</TableHead>
                <TableHead className="text-right">Liquidez</TableHead>
                <TableHead className="text-right">Conciliação</TableHead>
                <TableHead className="text-right">Rendimento</TableHead>
                <TableHead className="text-right">Cobertura</TableHead>
                <TableHead className="text-right">Inadimpl.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {benchmarkFinanceiro.map((mun) => (
                <TableRow
                  key={mun.municipio}
                  className={mun.destaque ? "bg-primary/5 font-medium" : ""}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {mun.destaque && (
                        <HugeiconsIcon
                          icon={StarIcon}
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
                        mun.liquidez >= 2
                          ? "secondary"
                          : mun.liquidez >= 1.5
                            ? "outline"
                            : "destructive"
                      }
                      className={
                        mun.liquidez >= 2
                          ? "text-green-600"
                          : mun.liquidez >= 1.5
                            ? "text-amber-600"
                            : ""
                      }
                    >
                      {mun.liquidez}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {mun.conciliacao}%
                  </TableCell>
                  <TableCell className="text-right">
                    {mun.rendimento}%
                  </TableCell>
                  <TableCell className="text-right">
                    {mun.cobertura} meses
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        mun.inadimplencia > 30
                          ? "destructive"
                          : mun.inadimplencia > 20
                            ? "outline"
                            : "secondary"
                      }
                      className={
                        mun.inadimplencia > 30
                          ? ""
                          : mun.inadimplencia > 20
                            ? "text-amber-600"
                            : "text-green-600"
                      }
                    >
                      {mun.inadimplencia}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg border p-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Posição geral
              </p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-600">1o</span>
                <span className="text-xs text-muted-foreground">
                  de 5 municípios
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Destaque em liquidez e rendimento de aplicações
              </p>
            </div>
            <div className="rounded-lg border p-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Ponto de Melhoria
              </p>
              <p className="text-sm font-medium text-amber-600">
                Conciliação Bancária
              </p>
              <p className="text-xs text-muted-foreground">
                80% vs 92% do melhor comparado — regularizar contas pendentes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
