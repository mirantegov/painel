"use client";

import * as React from "react";
import { useSnapshot } from "@/components/use-snapshot";
import { DESPESA_SNAPSHOT } from "@/lib/demo-despesa";
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
  ChartPieValueLegend,
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
  ArrowUp01Icon,
  Wallet01Icon,
  MoneyReceiveSquareIcon,
  Invoice01Icon,
  Calendar01Icon,
  Building06Icon,
  Target01Icon,
  ChartLineData02Icon,
  PieChart02Icon,
  UserMultipleIcon,
  Building04Icon,
  GraduationScrollIcon,
  HeartCheckIcon,
  Clock01Icon,
  StarIcon,
  Alert02Icon,
  SecurityCheckIcon,
} from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { KpiCard } from "@/components/ui/kpi-card";

// Dados fictícios para demonstração
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

// Função para calcular percentual
function calcPercent(value: number, total: number): number {
  return Math.round((value / total) * 100);
}

export function DespesaMunicipal() {
  const [, setViewMode] = React.useState("orgao");
  const {
    dadosÓrgãos,
    dadosUnidades,
    dadosFuncaoSubfuncao,
    dadosProgramas,
    dadosAcoes,
    dadosSecretarias,
    evolucaoMensal,
    totais,
    comparativoAnual,
    treemapData,
    modalidadeLicitacao,
    topFornecedores,
    metasODS,
    rigidezOrcamentaria,
    totalObrigatoria,
    totalDiscricionaria,
    percentualRigidez,
    receitaCorrenteLiquida,
    despesaPessoalTotal,
    percentualPessoalRCL,
    limitePrudencial,
    limiteMaximo,
    evolucaoPessoalRCL,
    despesaCorrenteCapital,
    despesaCorrenteCapitalChart,
    restosAPagarAging,
    totalRestosProcessados,
    totalRestosNaoProcessados,
    totalRestosGeral,
    projecaoExecucao,
    benchmarkDespesa,
    eventosRecentes,
  } = useSnapshot("despesa", DESPESA_SNAPSHOT);

  // Pie "Despesa por Secretaria": derivado de dadosSecretarias (empenhada),
  // top 4 + rollup "Outros" — sem valores hardcoded.
  const secretariaPieChart = React.useMemo(() => {
    const ordenadas = [...(dadosSecretarias ?? [])].sort(
      (a, b) => b.empenhada - a.empenhada,
    );
    const top = ordenadas.slice(0, 4).map((s, i) => ({
      name: s.sigla || s.nome,
      value: s.empenhada,
      fill: `var(--chart-${i + 1})`,
    }));
    const restante = ordenadas.slice(4).reduce((acc, s) => acc + s.empenhada, 0);
    return restante > 0
      ? [...top, { name: "Outros", value: restante, fill: "var(--chart-5)" }]
      : top;
  }, [dadosSecretarias]);

  return (
    <div className="space-y-8">
      {/* KPIs Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          title="Despesa Atualizada"
          icon={Wallet01Icon}
          value={fmtBRL(totais.atualizada)}
          borderColor="border-l-blue-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Orçamento atualizado do exercício
            </p>
          }
        />
        <KpiCard
          title="Despesa Empenhada"
          icon={Invoice01Icon}
          value={fmtBRL(totais.empenhada)}
          borderColor="border-l-green-500"
          footer={
            <div className="flex items-center gap-2">
              <Progress
                value={calcPercent(totais.empenhada, totais.atualizada)}
                className="h-2 flex-1"
              />
              <span className="text-xs font-medium">
                {calcPercent(totais.empenhada, totais.atualizada)}%
              </span>
            </div>
          }
        />
        <KpiCard
          title="A Empenhar"
          icon={Calendar01Icon}
          value={fmtBRL(totais.aEmpenhar)}
          borderColor="border-l-amber-500"
          footer={
            <p className="text-xs text-muted-foreground">
              {calcPercent(totais.aEmpenhar, totais.atualizada)}% do orçamento
              disponível
            </p>
          }
        />
        <KpiCard
          title="Pago"
          icon={MoneyReceiveSquareIcon}
          value={fmtBRL(totais.pago)}
          borderColor="border-l-red-500"
          footer={
            <div className="flex items-center gap-2">
              <Progress
                value={calcPercent(totais.pago, totais.empenhada)}
                className="h-2 flex-1"
              />
              <span className="text-xs font-medium">
                {calcPercent(totais.pago, totais.empenhada)}%
              </span>
            </div>
          }
        />
        <KpiCard
          title="A Pagar"
          icon={Building06Icon}
          value={fmtBRL(totais.aPagar)}
          borderColor="border-l-orange-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-amber-600"
              />
              <span className="text-amber-600">
                {calcPercent(totais.aPagar, totais.empenhada)}% pendente
              </span>
            </div>
          }
        />
      </div>

      {/* Gráficos de Visão Geral */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Evolução Mensal */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução Mensal da Execução</CardTitle>
            <CardDescription>Empenhado vs Pago por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  empenhado: { label: "Empenhado", color: "var(--chart-1)" },
                  pago: { label: "Pago", color: "var(--chart-2)" },
                } satisfies ChartConfig
              }
              className="h-[280px] w-full"
            >
              <AreaChart data={evolucaoMensal} margin={{ left: 0, right: 12 }}>
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
                  dataKey="empenhado"
                  fill="var(--color-empenhado)"
                  fillOpacity={0.3}
                  stroke="var(--color-empenhado)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="pago"
                  fill="var(--color-pago)"
                  fillOpacity={0.3}
                  stroke="var(--color-pago)"
                  strokeWidth={2}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Secretaria */}
        <Card>
          <CardHeader>
            <CardTitle>Despesa por Secretaria</CardTitle>
            <CardDescription>Distribuição da despesa empenhada</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{} satisfies ChartConfig}
              className="mx-auto aspect-auto h-[300px] w-full"
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
                  data={secretariaPieChart}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                />
                <ChartLegend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  content={
                    <ChartPieValueLegend
                      nameKey="name"
                      valueKey="value"
                      valueFormatter={formatMillions}
                    />
                  }
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabelas por Classificação */}
      <Tabs defaultValue="orgao" className="w-full" onValueChange={setViewMode}>
        <TabsList variant="line" className="w-full justify-start">
          <TabsTrigger value="orgao">Por Órgão</TabsTrigger>
          <TabsTrigger value="unidade">Por Unidade</TabsTrigger>
          <TabsTrigger value="funcao">Função/Subfunção</TabsTrigger>
          <TabsTrigger value="programa">Por Programa</TabsTrigger>
          <TabsTrigger value="acao">Por Ação</TabsTrigger>
          <TabsTrigger value="secretaria">Por Secretaria</TabsTrigger>
        </TabsList>

        {/* Tabela por Órgão */}
        <TabsContent value="orgao" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Execução por Órgão</CardTitle>
              <CardDescription>
                Despesa orçamentária por órgão da administração
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Código</TableHead>
                    <TableHead>Órgão</TableHead>
                    <TableHead className="text-right">Atualizada</TableHead>
                    <TableHead className="text-right">Empenhada</TableHead>
                    <TableHead className="text-right">A Empenhar</TableHead>
                    <TableHead className="text-right">Pago</TableHead>
                    <TableHead className="text-right">A Pagar</TableHead>
                    <TableHead className="w-32">Execução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosÓrgãos.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-xs">
                        {item.codigo}
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.atualizada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.empenhada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-muted-foreground">
                        {formatCurrency(item.aEmpenhar)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.pago)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-amber-600">
                        {formatCurrency(item.aPagar)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={calcPercent(item.empenhada, item.atualizada)}
                            className="h-2 flex-1"
                          />
                          <span className="w-10 text-right text-xs">
                            {calcPercent(item.empenhada, item.atualizada)}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold">
                      Total Geral
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold">
                      {formatCurrency(totais.atualizada)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold">
                      {formatCurrency(totais.empenhada)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold">
                      {formatCurrency(totais.aEmpenhar)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold">
                      {formatCurrency(totais.pago)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold">
                      {formatCurrency(totais.aPagar)}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tabela por Unidade */}
        <TabsContent value="unidade" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Execução por Unidade Orçamentária</CardTitle>
              <CardDescription>
                Despesa orcamentaria por unidade (Educacao)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Codigo</TableHead>
                    <TableHead>Unidade</TableHead>
                    <TableHead className="text-right">Atualizada</TableHead>
                    <TableHead className="text-right">Empenhada</TableHead>
                    <TableHead className="text-right">A Empenhar</TableHead>
                    <TableHead className="text-right">Pago</TableHead>
                    <TableHead className="text-right">A Pagar</TableHead>
                    <TableHead className="w-32">Execução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosUnidades.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-xs">
                        {item.codigo}
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.atualizada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.empenhada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-muted-foreground">
                        {formatCurrency(item.aEmpenhar)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.pago)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-amber-600">
                        {formatCurrency(item.aPagar)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={calcPercent(item.empenhada, item.atualizada)}
                            className="h-2 flex-1"
                          />
                          <span className="w-10 text-right text-xs">
                            {calcPercent(item.empenhada, item.atualizada)}%
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

        {/* Tabela por Funcao/Subfuncao */}
        <TabsContent value="funcao" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Execução por Função/Subfunção</CardTitle>
              <CardDescription>
                Classificação funcional da despesa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Funcao</TableHead>
                    <TableHead className="w-24">Subfuncao</TableHead>
                    <TableHead>Descricao</TableHead>
                    <TableHead className="text-right">Atualizada</TableHead>
                    <TableHead className="text-right">Empenhada</TableHead>
                    <TableHead className="text-right">Pago</TableHead>
                    <TableHead className="w-32">Execução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosFuncaoSubfuncao.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-xs">
                        {item.funcao}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {item.subfuncao}
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.atualizada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.empenhada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.pago)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={calcPercent(item.empenhada, item.atualizada)}
                            className="h-2 flex-1"
                          />
                          <span className="w-10 text-right text-xs">
                            {calcPercent(item.empenhada, item.atualizada)}%
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

        {/* Tabela por Programa */}
        <TabsContent value="programa" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Execução por Programa</CardTitle>
              <CardDescription>Despesa por programa de governo</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Codigo</TableHead>
                    <TableHead>Programa</TableHead>
                    <TableHead className="text-right">Atualizada</TableHead>
                    <TableHead className="text-right">Empenhada</TableHead>
                    <TableHead className="text-right">A Empenhar</TableHead>
                    <TableHead className="text-right">Pago</TableHead>
                    <TableHead className="text-right">A Pagar</TableHead>
                    <TableHead className="w-32">Execução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosProgramas.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-xs">
                        {item.codigo}
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.atualizada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.empenhada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-muted-foreground">
                        {formatCurrency(item.aEmpenhar)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.pago)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-amber-600">
                        {formatCurrency(item.aPagar)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={calcPercent(item.empenhada, item.atualizada)}
                            className="h-2 flex-1"
                          />
                          <span className="w-10 text-right text-xs">
                            {calcPercent(item.empenhada, item.atualizada)}%
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

        {/* Tabela por Acao */}
        <TabsContent value="acao" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Execução por Ação</CardTitle>
              <CardDescription>
                Projetos e atividades orcamentarias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Codigo</TableHead>
                    <TableHead className="w-24">Tipo</TableHead>
                    <TableHead>Acao</TableHead>
                    <TableHead className="text-right">Atualizada</TableHead>
                    <TableHead className="text-right">Empenhada</TableHead>
                    <TableHead className="text-right">Pago</TableHead>
                    <TableHead className="w-32">Execução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosAcoes.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-xs">
                        {item.codigo}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.tipo === "Projeto" ? "default" : "secondary"
                          }
                          className="text-xs"
                        >
                          {item.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.atualizada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.empenhada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.pago)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={calcPercent(item.empenhada, item.atualizada)}
                            className="h-2 flex-1"
                          />
                          <span className="w-10 text-right text-xs">
                            {calcPercent(item.empenhada, item.atualizada)}%
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

        {/* Tabela por Secretaria */}
        <TabsContent value="secretaria" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Execução por Secretaria</CardTitle>
              <CardDescription>
                Visao consolidada por secretaria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Sigla</TableHead>
                    <TableHead>Secretaria</TableHead>
                    <TableHead className="text-right">Atualizada</TableHead>
                    <TableHead className="text-right">Empenhada</TableHead>
                    <TableHead className="text-right">A Empenhar</TableHead>
                    <TableHead className="text-right">Pago</TableHead>
                    <TableHead className="text-right">A Pagar</TableHead>
                    <TableHead className="w-32">Execução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosSecretarias.map((item) => (
                    <TableRow key={item.sigla}>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-xs">
                          {item.sigla}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.atualizada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.empenhada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-muted-foreground">
                        {formatCurrency(item.aEmpenhar)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.pago)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-amber-600">
                        {formatCurrency(item.aPagar)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={calcPercent(item.empenhada, item.atualizada)}
                            className="h-2 flex-1"
                          />
                          <span className="w-10 text-right text-xs">
                            {calcPercent(item.empenhada, item.atualizada)}%
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
      </Tabs>

      {/* Gráficos Adicionais */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Comparativo de Execução */}
        <Card>
          <CardHeader>
            <CardTitle>Comparativo de Execução por Secretaria</CardTitle>
            <CardDescription>Empenhado vs Pago por secretaria</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  empenhada: { label: "Empenhada", color: "var(--chart-1)" },
                  pago: { label: "Pago", color: "var(--chart-2)" },
                } satisfies ChartConfig
              }
              className="h-[300px] w-full"
            >
              <BarChart
                data={dadosSecretarias.slice(0, 5).map((s) => ({
                  sigla: s.sigla,
                  empenhada: s.empenhada,
                  pago: s.pago,
                }))}
                layout="vertical"
                margin={{ left: 60, right: 12 }}
              >
                <CartesianGrid horizontal={false} />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                />
                <YAxis
                  dataKey="sigla"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  }
                />
                <Bar
                  dataKey="empenhada"
                  fill="var(--color-empenhada)"
                  radius={[0, 4, 4, 0]}
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

        {/* Indicadores de Alerta */}
        <Card>
          <CardHeader>
            <CardTitle>Indicadores de Atenção</CardTitle>
            <CardDescription>Órgãos com execução abaixo de 90%</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dadosÓrgãos
              .filter((o) => calcPercent(o.empenhada, o.atualizada) < 90)
              .sort(
                (a, b) =>
                  calcPercent(a.empenhada, a.atualizada) -
                  calcPercent(b.empenhada, b.atualizada),
              )
              .map((item) => (
                <div key={item.codigo} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {item.codigo}
                      </Badge>
                      <span className="text-sm font-medium">{item.nome}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {calcPercent(item.empenhada, item.atualizada)}%
                    </span>
                  </div>
                  <Progress
                    value={calcPercent(item.empenhada, item.atualizada)}
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Empenhado: {formatCurrency(item.empenhada)}</span>
                    <span>Saldo: {formatCurrency(item.aEmpenhar)}</span>
                  </div>
                  <Separator />
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      {/* Comparativo Anual e Categorias de Despesa */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Evolução Histórica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Evolução Histórica (5 anos)
            </CardTitle>
            <CardDescription>
              Comparativo da execução orçamentária anual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  atualizada: { label: "Orçamento", color: "var(--chart-3)" },
                  empenhada: { label: "Empenhado", color: "var(--chart-1)" },
                  pago: { label: "Pago", color: "var(--chart-2)" },
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
                  dataKey="atualizada"
                  fill="var(--color-atualizada)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="empenhada"
                  fill="var(--color-empenhada)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="pago"
                  fill="var(--color-pago)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Categoria Economica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={PieChart02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Despesa por Categoria Economica
            </CardTitle>
            <CardDescription>
              Distribuicao por natureza da despesa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {treemapData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(item.value / totais.empenhada) * 100}%`,
                        backgroundColor: item.fill
                          .replace("var(--", "var(--color-")
                          .replace(")", ")")
                          .replace("--color-chart", "--chart"),
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">
                    {calcPercent(item.value, totais.empenhada)}% do total
                    empenhado
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Licitacoes e Top Fornecedores */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Modalidades de Licitacao */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={SecurityCheckIcon}
                strokeWidth={2}
                className="size-5"
              />
              Despesas por Modalidade de Licitação
            </CardTitle>
            <CardDescription>
              Quantidade e valores por modalidade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Modalidade</TableHead>
                  <TableHead className="text-center">Qtd</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-right">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modalidadeLicitacao.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.modalidade}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{item.quantidade}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.valor)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {calcPercent(item.valor, totais.empenhada)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Principais Fornecedores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={UserMultipleIcon}
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
                  <Avatar size="sm">
                    <AvatarFallback>{index + 1}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{fornecedor.nome}</p>
                      <span className="text-sm font-semibold">
                        {formatCurrency(fornecedor.valor)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {fornecedor.cnpj}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {fornecedor.percentual}%
                      </Badge>
                    </div>
                    <Progress
                      value={fornecedor.percentual * 5}
                      className="h-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metas ODS */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Target01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Alinhamento com Objetivos de Desenvolvimento Sustentavel
            </CardTitle>
            <CardDescription>
              Execução orçamentária vinculada aos ODS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {metasODS.map((meta, index) => (
                <div key={index} className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <HugeiconsIcon
                        icon={
                          meta.ods === "ODS 3"
                            ? HeartCheckIcon
                            : meta.ods === "ODS 4"
                              ? GraduationScrollIcon
                              : meta.ods === "ODS 11"
                                ? Building04Icon
                                : StarIcon
                        }
                        strokeWidth={2}
                        className="size-5 text-primary"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{meta.ods}</p>
                      <p className="text-xs text-muted-foreground">
                        {meta.titulo}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Meta: {formatCurrency(meta.meta)}</span>
                      <span className="font-medium">{meta.percentual}%</span>
                    </div>
                    <Progress value={meta.percentual} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Realizado: {formatCurrency(meta.realizado)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rigidez Orçamentária e Limite de Pessoal LRF */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Rigidez Orçamentária */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={SecurityCheckIcon}
                strokeWidth={2}
                className="size-5"
              />
              Rigidez Orçamentária
            </CardTitle>
            <CardDescription>
              Índice de rigidez:{" "}
              <strong
                className={
                  Number(percentualRigidez) > 70
                    ? "text-red-600"
                    : "text-amber-600"
                }
              >
                {percentualRigidez}%
              </strong>{" "}
              — Despesas obrigatorias sobre o total empenhado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-xs text-muted-foreground">Obrigatorias</p>
                  <p className="text-lg font-bold text-red-600">
                    {formatMillions(totalObrigatoria)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {percentualRigidez}%
                  </p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-xs text-muted-foreground">
                    Discricionarias
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {formatMillions(totalDiscricionaria)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(100 - Number(percentualRigidez)).toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {rigidezOrcamentaria.map((item) => (
                  <div
                    key={item.categoria}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`size-2 rounded-full ${item.tipo === "obrigatoria" ? "bg-red-500" : "bg-green-500"}`}
                      />
                      <span className="text-muted-foreground">
                        {item.categoria}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {formatMillions(item.valor)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {((item.valor / totais.empenhada) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Limite de Pessoal - LRF */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={UserMultipleIcon}
                strokeWidth={2}
                className="size-5"
              />
              Limite de Pessoal (LRF)
            </CardTitle>
            <CardDescription>
              Despesa com pessoal:{" "}
              <strong className="text-green-600">
                {percentualPessoalRCL}%
              </strong>{" "}
              da RCL — Limite maximo: {limiteMaximo}%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Atual ({percentualPessoalRCL}%)
                  </span>
                  <span className="text-muted-foreground">
                    Limite Prudencial ({limitePrudencial}%)
                  </span>
                  <span className="text-muted-foreground">
                    Maximo ({limiteMaximo}%)
                  </span>
                </div>
                <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="absolute h-full rounded-full bg-green-500 transition-all"
                    style={{
                      width: `${(Number(percentualPessoalRCL) / limiteMaximo) * 100}%`,
                    }}
                  />
                  <div
                    className="absolute h-full w-px bg-amber-500"
                    style={{
                      left: `${(limitePrudencial / limiteMaximo) * 100}%`,
                    }}
                  />
                  <div
                    className="absolute h-full w-px bg-red-500"
                    style={{ left: "100%" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>
                    Margem:{" "}
                    {(limiteMaximo - Number(percentualPessoalRCL)).toFixed(1)}{" "}
                    p.p.
                  </span>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-xs text-muted-foreground">Desp. Pessoal</p>
                  <p className="text-sm font-bold">
                    {formatMillions(despesaPessoalTotal)}
                  </p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-xs text-muted-foreground">RCL</p>
                  <p className="text-sm font-bold">
                    {formatMillions(receitaCorrenteLiquida)}
                  </p>
                </div>
                <div className="rounded-lg border p-3 text-center bg-green-50 dark:bg-green-950/20">
                  <p className="text-xs text-muted-foreground">Situacao</p>
                  <p className="text-sm font-bold text-green-600">Adequado</p>
                </div>
              </div>
              <ChartContainer
                config={
                  {
                    pessoal: {
                      label: "% Pessoal/RCL",
                      color: "var(--chart-1)",
                    },
                  } satisfies ChartConfig
                }
                className="h-[140px] w-full"
              >
                <LineChart
                  data={evolucaoPessoalRCL}
                  margin={{ left: 0, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="periodo"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    domain={[28, 56]}
                    tickFormatter={(v: number) => `${v}%`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent formatter={(value) => `${value}%`} />
                    }
                  />
                  <Line
                    dataKey="pessoal"
                    type="monotone"
                    stroke="var(--color-pessoal)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Despesa Corrente vs Capital e Restos a Pagar Aging */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Despesa Corrente vs Capital */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={PieChart02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Despesa Corrente vs Capital
            </CardTitle>
            <CardDescription>
              Composição por categoria econômica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <ChartContainer
                config={
                  {
                    correntes: { label: "Correntes", color: "var(--chart-1)" },
                    capital: { label: "Capital", color: "var(--chart-3)" },
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
                    data={despesaCorrenteCapitalChart}
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
              <div className="space-y-3">
                {despesaCorrenteCapital.map((cat) => (
                  <div key={cat.tipo} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{cat.tipo}</p>
                      <Badge variant="outline">{cat.percentual}%</Badge>
                    </div>
                    <p className="text-lg font-bold">
                      {formatMillions(cat.valor)}
                    </p>
                    <div className="space-y-1">
                      {cat.subcategorias.map((sub) => (
                        <div
                          key={sub.nome}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-muted-foreground">
                            {sub.nome}
                          </span>
                          <span className="font-medium">
                            {formatMillions(sub.valor)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Restos a Pagar - Faixas de Vencimento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Clock01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Restos a Pagar — Faixas de vencimento
            </CardTitle>
            <CardDescription>
              Total: <strong>{formatCurrency(totalRestosGeral)}</strong> —
              Processados: {formatMillions(totalRestosProcessados)} | Não
              processados: {formatMillions(totalRestosNaoProcessados)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Faixa</TableHead>
                  <TableHead className="text-right">Processados</TableHead>
                  <TableHead className="text-right">Não Proc.</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Risco</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {restosAPagarAging.map((item) => (
                  <TableRow key={item.faixa}>
                    <TableCell className="font-medium">{item.faixa}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.processados)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.naoProcessados)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(item.total)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          item.risco === "critico"
                            ? "destructive"
                            : item.risco === "alto"
                              ? "destructive"
                              : item.risco === "medio"
                                ? "outline"
                                : "secondary"
                        }
                        className={
                          item.risco === "critico"
                            ? ""
                            : item.risco === "alto"
                              ? ""
                              : item.risco === "medio"
                                ? "text-amber-600"
                                : "text-green-600"
                        }
                      >
                        {item.risco.charAt(0).toUpperCase() +
                          item.risco.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(totalRestosProcessados)}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(totalRestosNaoProcessados)}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(totalRestosGeral)}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Projecao de Execucao e Benchmark */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Projecao de Execucao por Secretaria */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Projeção de Execução
            </CardTitle>
            <CardDescription>
              Execução atual e projetada por secretaria — Meta: 95%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projecaoExecucao.map((item) => (
                <div key={item.secretaria} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {item.secretaria}
                      </Badge>
                      {item.status === "critico" && (
                        <HugeiconsIcon
                          icon={Alert02Icon}
                          strokeWidth={2}
                          className="size-3.5 text-red-500"
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">
                        Atual: {item.atual}%
                      </span>
                      <span className="font-medium">
                        → Proj: {item.projetado}%
                      </span>
                      <Badge
                        variant={
                          item.status === "atingido"
                            ? "secondary"
                            : item.status === "atencao"
                              ? "outline"
                              : "destructive"
                        }
                        className={
                          item.status === "atingido"
                            ? "text-green-600"
                            : item.status === "atencao"
                              ? "text-amber-600"
                              : ""
                        }
                      >
                        {item.status === "atingido"
                          ? "OK"
                          : item.status === "atencao"
                            ? "Atenção"
                            : "Crítico"}
                      </Badge>
                    </div>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`absolute h-full rounded-full transition-all ${
                        item.status === "atingido"
                          ? "bg-green-500"
                          : item.status === "atencao"
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${item.atual}%` }}
                    />
                    <div
                      className="absolute h-full rounded-full bg-primary/20"
                      style={{
                        left: `${item.atual}%`,
                        width: `${item.projetado - item.atual}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benchmark Municipal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Building04Icon}
                strokeWidth={2}
                className="size-5"
              />
              Benchmark Municipal
            </CardTitle>
            <CardDescription>
              Comparação com municípios de porte similar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Município</TableHead>
                  <TableHead className="text-right">Execução</TableHead>
                  <TableHead className="text-right">Pessoal/RCL</TableHead>
                  <TableHead className="text-right">Investim.</TableHead>
                  <TableHead className="text-right">Restos AP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {benchmarkDespesa.map((mun) => (
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
                      {mun.execucao}%
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          mun.pessoalRCL > 40 ? "destructive" : "secondary"
                        }
                        className={mun.pessoalRCL > 40 ? "" : "text-green-600"}
                      >
                        {mun.pessoalRCL}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {mun.investimento}%
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          mun.restosAPagar > 15
                            ? "destructive"
                            : mun.restosAPagar > 10
                              ? "outline"
                              : "secondary"
                        }
                        className={
                          mun.restosAPagar > 15
                            ? ""
                            : mun.restosAPagar > 10
                              ? "text-amber-600"
                              : "text-green-600"
                        }
                      >
                        {mun.restosAPagar}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border p-3 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Posicao Geral
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">2o</span>
                  <span className="text-xs text-muted-foreground">
                    de 5 municípios
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Destaque em controle de pessoal e restos a pagar
                </p>
              </div>
              <div className="rounded-lg border p-3 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Ponto de Melhoria
                </p>
                <p className="text-sm font-medium text-amber-600">
                  Investimentos
                </p>
                <p className="text-xs text-muted-foreground">
                  12.6% vs 14.8% do melhor comparado — oportunidade de ampliacao
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
          <CardDescription>Ultimas movimentacoes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventosRecentes.map((evento, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`size-2.5 rounded-full ${
                      evento.tipo === "empenho"
                        ? "bg-blue-500"
                        : evento.tipo === "pagamento"
                          ? "bg-green-500"
                          : evento.tipo === "licitacao"
                            ? "bg-amber-500"
                            : evento.tipo === "liquidacao"
                              ? "bg-purple-500"
                              : "bg-gray-500"
                    }`}
                  />
                  {index < eventosRecentes.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-xs text-muted-foreground">{evento.data}</p>
                  <p className="text-sm">{evento.evento}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {evento.secretaria}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
