"use client";

import * as React from "react";
import { fmtBRL } from "@/lib/format";
import { useSnapshot } from "@/components/use-snapshot";
import { PATRIMONIO_SNAPSHOT } from "@/lib/demo-patrimonio";
import {
  Archive02Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  Building04Icon,
  Calendar01Icon,
  ChartLineData02Icon,
  CheckmarkCircle02Icon,
  FileValidationIcon,
  AlertCircleIcon,
  SecurityCheckIcon,
  Target01Icon,
  Home09Icon,
  TreesIcon,
  Chair01Icon,
  Recycle01Icon,
  ArrowMoveDownLeftIcon,
  FilterIcon,
  RefreshIcon,
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
} from "recharts";

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

const formatArea = (value: number) =>
  `${new Intl.NumberFormat("pt-BR").format(value)} m²`;

function badgeVariantForRisk(risk: string) {
  if (risk === "Alto") return "destructive" as const;
  if (risk === "Médio") return "secondary" as const;
  return "default" as const;
}

function badgeClassForCriticality(level: string) {
  if (level === "alta")
    return "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100";
  if (level === "media")
    return "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200";
  return "";
}

export function Patrimonio() {
  const {
    patrimonioResumo,
    composicaoPatrimonio,
    chartConfigComposicao,
    evolucaoPatrimonio,
    chartConfigEvolucao,
    patrimonioPorFinalidade,
    chartConfigFinalidade,
    condicaoAtivos,
    chartConfigCondicao,
    imoveisEstrategicos,
    estoquesCriticos,
    areasPublicas,
    depreciacaoAtivos,
    chartConfigDepreciacao,
    evolucaoDepreciacao,
    chartConfigEvolDepreciacao,
    movimentacoes,
    resumoMovimentacoes,
    termosResponsabilidade,
  } = useSnapshot("patrimonio", PATRIMONIO_SNAPSHOT);
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024");
  const [categoriaSelecionada, setCategoriaSelecionada] =
    React.useState("todas");

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Valor Patrimonial"
          icon={Archive02Icon}
          value={fmtBRL(patrimonioResumo.valorTotal)}
          borderColor="border-l-[var(--chart-1)]"
          footer={
            <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-4"
              />
              Crescimento de 3,5% no exercício
            </div>
          }
        />
        <KpiCard
          title="Inventário Conciliado"
          icon={CheckmarkCircle02Icon}
          value={`${patrimonioResumo.inventarioConciliadoPct.toFixed(1)}%`}
          borderColor="border-l-[var(--chart-2)]"
          footer={
            <>
              <Progress
                value={patrimonioResumo.inventarioConciliadoPct}
                className="h-2"
              />
              <p className="text-sm text-muted-foreground">
                5.842 bens conferidos de 6.201 cadastrados
              </p>
            </>
          }
        />
        <KpiCard
          title="Imóveis Regularizados"
          icon={FileValidationIcon}
          value={`${patrimonioResumo.regularizacaoImoveisPct.toFixed(1)}%`}
          borderColor="border-l-[var(--chart-3)]"
          footer={
            <p className="text-sm text-muted-foreground">
              77 de 88 imóveis com matrícula, averbação e uso conciliados
            </p>
          }
        />
        <KpiCard
          title="Conservação Geral"
          icon={Target01Icon}
          value={`${patrimonioResumo.indiceConservacaoPct.toFixed(1)}%`}
          borderColor="border-l-[var(--chart-4)]"
          footer={
            <>
              <Progress
                value={patrimonioResumo.indiceConservacaoPct}
                className="h-2"
              />
              <p className="text-sm text-muted-foreground">
                Meta institucional de 85% até dezembro
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
              Painel Executivo do Patrimônio
            </CardTitle>
            <CardDescription>
              Situação consolidada dos ativos patrimoniais, da conservação
              física e das pendências de regularização.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Bens sem plaqueta ou vínculo
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {formatNumber(patrimonioResumo.bensSemPlaqueta)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Prioridade em educação, saúde e almoxarifado central.
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Itens em estoque crítico
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {formatNumber(patrimonioResumo.itensEstoqueCritico)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Cobertura média de 19 dias nos grupos essenciais.
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Áreas públicas monitoradas
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {formatNumber(patrimonioResumo.areasPublicasMonitoradas)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                19 frentes de manutenção preventiva já programadas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="visao-geral" className="w-full">
        <TabsList className="flex h-auto w-full flex-wrap gap-2 rounded-2xl p-2">
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="finalidade">Por Finalidade</TabsTrigger>
          <TabsTrigger value="ativos-criticos">Ativos Críticos</TabsTrigger>
          <TabsTrigger value="depreciacao">Depreciação e Vida Útil</TabsTrigger>
          <TabsTrigger value="movimentacao">
            Movimentação Patrimonial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visao-geral" className="mt-6 space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Archive02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Composição do Patrimônio
                </CardTitle>
                <CardDescription>
                  Distribuição do valor patrimonial por grandes grupos de
                  ativos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfigComposicao}
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
                      data={composicaoPatrimonio}
                      dataKey="valor"
                      nameKey="categoria"
                      innerRadius={70}
                      outerRadius={110}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {composicaoPatrimonio.map((item) => (
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
                  Evolução do Patrimônio
                </CardTitle>
                <CardDescription>
                  Crescimento do ativo incorporado e melhoria do índice de
                  conservação ao longo do exercício.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfigEvolucao}>
                  <LineChart
                    data={evolucaoPatrimonio}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                    <YAxis
                      yAxisId="valor"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `R$ ${(Number(value) / 1_000_000).toFixed(0)}M`
                      }
                    />
                    <YAxis
                      yAxisId="pct"
                      orientation="right"
                      tickLine={false}
                      axisLine={false}
                      domain={[70, 90]}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value, name) =>
                            name === "conservacao"
                              ? [`${Number(value).toFixed(1)}%`, "Conservação"]
                              : [
                                  formatCurrency(Number(value)),
                                  "Valor patrimonial",
                                ]
                          }
                        />
                      }
                    />
                    <Line
                      yAxisId="valor"
                      type="monotone"
                      dataKey="incorporado"
                      stroke="var(--chart-1)"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                    />
                    <Line
                      yAxisId="pct"
                      type="monotone"
                      dataKey="conservacao"
                      stroke="var(--chart-3)"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={SecurityCheckIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Condição dos Ativos
                </CardTitle>
                <CardDescription>
                  Percentual de ativos em condição adequada, atenção e crítica
                  por grupo patrimonial.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfigCondicao}
                  className="min-h-[320px]"
                >
                  <BarChart
                    data={condicaoAtivos}
                    layout="vertical"
                    margin={{ left: 10, right: 10 }}
                  >
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis
                      type="category"
                      dataKey="grupo"
                      tickLine={false}
                      axisLine={false}
                      width={90}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="adequado"
                      stackId="condicao"
                      fill="var(--chart-1)"
                      radius={[6, 0, 0, 6]}
                    />
                    <Bar
                      dataKey="atencao"
                      stackId="condicao"
                      fill="var(--chart-3)"
                    />
                    <Bar
                      dataKey="critico"
                      stackId="condicao"
                      fill="var(--chart-4)"
                      radius={[0, 6, 6, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={TreesIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Frentes de Cuidado
                </CardTitle>
                <CardDescription>
                  Prioridades patrimoniais para manutenção, regularização e
                  reposição.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">Prédios essenciais</p>
                      <p className="text-sm text-muted-foreground">
                        Saúde e obras concentram as maiores necessidades
                        corretivas.
                      </p>
                    </div>
                    <Badge variant="secondary">12 unidades</Badge>
                  </div>
                  <Progress value={68} className="mt-4 h-2" />
                </div>
                <div className="rounded-2xl border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">Bens sem rastreabilidade</p>
                      <p className="text-sm text-muted-foreground">
                        Necessitam plaqueta, termo de responsabilidade ou baixa
                        formal.
                      </p>
                    </div>
                    <Badge variant="secondary">218 itens</Badge>
                  </div>
                  <Progress value={42} className="mt-4 h-2" />
                </div>
                <div className="rounded-2xl border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">
                        Áreas públicas com risco médio/alto
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Praças, parques e corredores verdes com manutenção
                        pendente.
                      </p>
                    </div>
                    <Badge variant="secondary">37 áreas</Badge>
                  </div>
                  <Progress value={59} className="mt-4 h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="finalidade" className="mt-6 space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Building04Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Patrimônio por Finalidade
                </CardTitle>
                <CardDescription>
                  Valor patrimonial alocado nas principais áreas finalísticas e
                  de apoio do município.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfigFinalidade}
                  className="min-h-[340px]"
                >
                  <BarChart
                    data={patrimonioPorFinalidade}
                    margin={{ left: 10, right: 10 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="finalidade"
                      tickLine={false}
                      axisLine={false}
                      angle={-18}
                      textAnchor="end"
                      height={80}
                    />
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
                          formatter={(value, name) =>
                            name === "conservacao"
                              ? [`${Number(value).toFixed(1)}%`, "Conservação"]
                              : [
                                  formatCurrency(Number(value)),
                                  "Valor patrimonial",
                                ]
                          }
                        />
                      }
                    />
                    <Bar
                      dataKey="valor"
                      fill="var(--chart-1)"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
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
                  Desempenho por Área
                </CardTitle>
                <CardDescription>
                  Comparativo de conservação, regularização e pendências
                  operacionais.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {patrimonioPorFinalidade.map((item) => (
                  <div key={item.finalidade} className="rounded-2xl border p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="font-medium">{item.finalidade}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.imoveis} imóveis,{" "}
                          {formatNumber(item.equipamentos)} equipamentos,{" "}
                          {item.areas} áreas públicas.
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {formatCurrency(item.valor)}
                      </Badge>
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Conservação</span>
                          <span>{item.conservacao}%</span>
                        </div>
                        <Progress value={item.conservacao} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Regularização</span>
                          <span>{item.regularizacao}%</span>
                        </div>
                        <Progress value={item.regularizacao} className="h-2" />
                      </div>
                      <div className="rounded-xl bg-muted/40 p-3 text-sm">
                        <p className="text-muted-foreground">
                          Pendências abertas
                        </p>
                        <p className="mt-1 text-xl font-semibold">
                          {item.pendencias}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Chair01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Matriz Resumida por Finalidade
              </CardTitle>
              <CardDescription>
                Base de apoio para alocação de recursos, cronograma de
                manutenção e priorização de regularização.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Finalidade</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Imóveis</TableHead>
                    <TableHead className="text-right">Equipamentos</TableHead>
                    <TableHead className="text-right">Estoques</TableHead>
                    <TableHead className="text-right">Conservação</TableHead>
                    <TableHead className="text-right">Regularização</TableHead>
                    <TableHead className="text-right">Pendências</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patrimonioPorFinalidade.map((item) => (
                    <TableRow key={item.finalidade}>
                      <TableCell className="font-medium">
                        {item.finalidade}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.valor)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.imoveis)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.equipamentos)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.estoque)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.conservacao}%
                      </TableCell>
                      <TableCell className="text-right">
                        {item.regularizacao}%
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.pendencias)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ativos-criticos" className="mt-6 space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Home09Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Imóveis Estruturantes
                </CardTitle>
                <CardDescription>
                  Unidades com maior impacto operacional para o município e
                  respectivas frentes de manutenção.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unidade</TableHead>
                      <TableHead>Finalidade</TableHead>
                      <TableHead className="text-right">Área</TableHead>
                      <TableHead className="text-right">Conservação</TableHead>
                      <TableHead>Regularização</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {imoveisEstrategicos.map((item) => (
                      <TableRow key={item.unidade}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.unidade}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.manutencao}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{item.finalidade}</TableCell>
                        <TableCell className="text-right">
                          {formatArea(item.area)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.conservacao}%
                        </TableCell>
                        <TableCell>{item.regularizacao}</TableCell>
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
                    icon={Archive02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Estoques e Bens Sensíveis
                </CardTitle>
                <CardDescription>
                  Itens com cobertura reduzida ou dependentes de reposição para
                  continuidade dos serviços.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Finalidade</TableHead>
                      <TableHead className="text-right">Saldo</TableHead>
                      <TableHead className="text-right">Cobertura</TableHead>
                      <TableHead>Criticidade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estoquesCriticos.map((item) => (
                      <TableRow key={item.item}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.item}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.acao}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{item.finalidade}</TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.saldo)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.coberturaDias} dias
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={badgeClassForCriticality(
                              item.criticidade,
                            )}
                          >
                            {item.criticidade === "alta" ? "Alta" : "Média"}
                          </Badge>
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
                  icon={TreesIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Áreas Públicas que Exigem Cuidado
              </CardTitle>
              <CardDescription>
                Monitoramento de praças, parques, corredores verdes e
                equipamentos de lazer sob responsabilidade municipal.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {areasPublicas.map((item) => (
                <div key={item.area} className="rounded-2xl border p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-medium">{item.area}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.tipo} • {item.finalidade} •{" "}
                        {formatArea(item.extensao)}
                      </p>
                    </div>
                    <Badge variant={badgeVariantForRisk(item.risco)}>
                      {item.risco}
                    </Badge>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Nível de cuidado executado</span>
                        <span>{item.cuidadoPct}%</span>
                      </div>
                      <Progress value={item.cuidadoPct} className="h-2" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.frente}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={AlertCircleIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Recomendações de Curto Prazo
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border p-4">
                <p className="font-medium">Regularização patrimonial</p>
                <Separator className="my-3" />
                <p className="text-sm text-muted-foreground">
                  Concluir averbação dos imóveis de saúde e desmembramento do
                  pátio operacional para reduzir riscos jurídicos e contábeis.
                </p>
              </div>
              <div className="rounded-2xl border p-4">
                <p className="font-medium">Plano de conservação</p>
                <Separator className="my-3" />
                <p className="text-sm text-muted-foreground">
                  Priorizar telhados, climatização e drenagem em prédios
                  essenciais com conservação abaixo de 80%.
                </p>
              </div>
              <div className="rounded-2xl border p-4">
                <p className="font-medium">Reposição e rastreabilidade</p>
                <Separator className="my-3" />
                <p className="text-sm text-muted-foreground">
                  Integrar almoxarifado, patrimônio e termos de responsabilidade
                  para reduzir bens sem plaqueta e rupturas de estoque.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Depreciação e Vida Útil ──────────────────────────── */}
        <TabsContent value="depreciacao" className="mt-6 space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Recycle01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Depreciação por Categoria de Ativo
                </CardTitle>
                <CardDescription>
                  Valor original, depreciação acumulada e valor contábil líquido
                  de cada grupo patrimonial.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfigDepreciacao}
                  className="min-h-[320px]"
                >
                  <BarChart
                    data={depreciacaoAtivos}
                    layout="vertical"
                    margin={{ left: 10, right: 10 }}
                  >
                    <CartesianGrid horizontal={false} />
                    <XAxis
                      type="number"
                      tickFormatter={(value) =>
                        `R$ ${(Number(value) / 1_000_000).toFixed(0)}M`
                      }
                    />
                    <YAxis
                      type="category"
                      dataKey="categoria"
                      tickLine={false}
                      axisLine={false}
                      width={120}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value, name) => [
                            formatCurrency(Number(value)),
                            name === "valorLiquido"
                              ? "Valor líquido"
                              : "Depreciação acumulada",
                          ]}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="valorLiquido"
                      stackId="dep"
                      fill="var(--chart-1)"
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="depreciacaoAcumulada"
                      stackId="dep"
                      fill="var(--chart-4)"
                      radius={[0, 6, 6, 0]}
                    />
                  </BarChart>
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
                  Evolução da Depreciação no Exercício
                </CardTitle>
                <CardDescription>
                  Depreciação mensal acumulada e valor contábil líquido do
                  acervo patrimonial.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfigEvolDepreciacao}>
                  <LineChart
                    data={evolucaoDepreciacao}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                    <YAxis
                      yAxisId="valor"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `R$ ${(Number(value) / 1_000_000).toFixed(0)}M`
                      }
                    />
                    <YAxis
                      yAxisId="dep"
                      orientation="right"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `R$ ${(Number(value) / 1_000_000).toFixed(1)}M`
                      }
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value, name) => [
                            formatCurrency(Number(value)),
                            name === "valorContabil"
                              ? "Valor contábil líquido"
                              : "Depreciação mensal",
                          ]}
                        />
                      }
                    />
                    <Line
                      yAxisId="valor"
                      type="monotone"
                      dataKey="valorContabil"
                      stroke="var(--chart-1)"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                    />
                    <Line
                      yAxisId="dep"
                      type="monotone"
                      dataKey="depreciacaoMensal"
                      stroke="var(--chart-4)"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Archive02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Detalhamento da Depreciação e Vida Útil
              </CardTitle>
              <CardDescription>
                Taxas anuais, vida útil remanescente e projeção de reposição por
                categoria de ativo conforme NBCASP.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Valor Original</TableHead>
                    <TableHead className="text-right">
                      Deprec. Acumulada
                    </TableHead>
                    <TableHead className="text-right">Valor Líquido</TableHead>
                    <TableHead className="text-right">Taxa Anual</TableHead>
                    <TableHead className="text-right">Vida Útil</TableHead>
                    <TableHead className="text-right">Restante</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {depreciacaoAtivos.map((item) => (
                    <TableRow key={item.categoria}>
                      <TableCell className="font-medium">
                        {item.categoria}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.valorOriginal)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.depreciacaoAcumulada)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.valorLiquido)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.taxaAnual}%
                      </TableCell>
                      <TableCell className="text-right">
                        {item.vidaUtilAnos} anos
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            item.vidaUtilRestante <= 2
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {item.vidaUtilRestante} anos
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border p-4">
              <p className="font-medium">Depreciação acumulada total</p>
              <Separator className="my-3" />
              <p className="text-3xl font-bold">
                {formatCurrency(
                  depreciacaoAtivos.reduce(
                    (acc, i) => acc + i.depreciacaoAcumulada,
                    0,
                  ),
                )}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Representa{" "}
                {(
                  (depreciacaoAtivos.reduce(
                    (acc, i) => acc + i.depreciacaoAcumulada,
                    0,
                  ) /
                    depreciacaoAtivos.reduce(
                      (acc, i) => acc + i.valorOriginal,
                      0,
                    )) *
                  100
                ).toFixed(1)}
                % do valor original dos ativos.
              </p>
            </div>
            <div className="rounded-2xl border p-4">
              <p className="font-medium">Ativos próximos do fim da vida útil</p>
              <Separator className="my-3" />
              <p className="text-3xl font-bold">
                {
                  depreciacaoAtivos.filter((i) => i.vidaUtilRestante <= 2)
                    .length
                }{" "}
                categorias
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Veículos e equipamentos de TI demandam planejamento de reposição
                nos próximos 24 meses.
              </p>
            </div>
            <div className="rounded-2xl border p-4">
              <p className="font-medium">Valor contábil líquido total</p>
              <Separator className="my-3" />
              <p className="text-3xl font-bold">
                {formatCurrency(
                  depreciacaoAtivos.reduce((acc, i) => acc + i.valorLiquido, 0),
                )}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Valor patrimonial após aplicação das taxas de depreciação
                acumulada.
              </p>
            </div>
          </div>
        </TabsContent>

        {/* ── Movimentação Patrimonial ─────────────────────────── */}
        <TabsContent value="movimentacao" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            <div className="rounded-2xl border bg-muted/40 p-4 text-center">
              <p className="text-sm text-muted-foreground">Transferências</p>
              <p className="mt-2 text-2xl font-semibold">
                {resumoMovimentacoes.transferencias}
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4 text-center">
              <p className="text-sm text-muted-foreground">Cessões</p>
              <p className="mt-2 text-2xl font-semibold">
                {resumoMovimentacoes.cessoes}
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4 text-center">
              <p className="text-sm text-muted-foreground">Baixas</p>
              <p className="mt-2 text-2xl font-semibold">
                {resumoMovimentacoes.baixas}
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4 text-center">
              <p className="text-sm text-muted-foreground">Incorporações</p>
              <p className="mt-2 text-2xl font-semibold">
                {resumoMovimentacoes.incorporacoes}
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4 text-center">
              <p className="text-sm text-muted-foreground">Doações recebidas</p>
              <p className="mt-2 text-2xl font-semibold">
                {resumoMovimentacoes.doacoes}
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4 text-center">
              <p className="text-sm text-muted-foreground">Reavaliações</p>
              <p className="mt-2 text-2xl font-semibold">
                {resumoMovimentacoes.reavaliacoes}
              </p>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={ArrowMoveDownLeftIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Últimas Movimentações
                </CardTitle>
                <CardDescription>
                  Registro de transferências, cessões, baixas, incorporações e
                  reavaliações patrimoniais.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead>Destino</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movimentacoes.map((mov) => (
                      <TableRow key={`${mov.data}-${mov.descricao}`}>
                        <TableCell className="whitespace-nowrap">
                          {mov.data}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{mov.tipo}</Badge>
                        </TableCell>
                        <TableCell className="max-w-[220px] truncate">
                          {mov.descricao}
                        </TableCell>
                        <TableCell className="text-sm">{mov.origem}</TableCell>
                        <TableCell className="text-sm">{mov.destino}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(mov.valor)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              mov.status === "Concluída"
                                ? "secondary"
                                : mov.status === "Aprovada"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {mov.status}
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
                    icon={FileValidationIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Termos de Responsabilidade
                </CardTitle>
                <CardDescription>
                  Acompanhamento da cobertura de termos de guarda e
                  responsabilidade por secretaria.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {termosResponsabilidade.map((tr) => (
                  <div key={tr.secretaria} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{tr.secretaria}</p>
                        <p className="text-sm text-muted-foreground">
                          {tr.atualizados} de {tr.totalTermos} termos
                          atualizados • {tr.pendentes} pendentes
                        </p>
                      </div>
                      <Badge
                        variant={
                          tr.coberturaPct >= 90 ? "secondary" : "destructive"
                        }
                      >
                        {tr.coberturaPct}%
                      </Badge>
                    </div>
                    <Progress value={tr.coberturaPct} className="mt-3 h-2" />
                    <p className="mt-2 text-xs text-muted-foreground">
                      Última atualização: {tr.ultimaAtualizacao}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border p-4">
              <p className="font-medium">Valor incorporado no exercício</p>
              <Separator className="my-3" />
              <p className="text-3xl font-bold text-emerald-600">
                {formatCurrency(resumoMovimentacoes.valorIncorporado)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {resumoMovimentacoes.incorporacoes} incorporações e{" "}
                {resumoMovimentacoes.doacoes} doações recebidas.
              </p>
            </div>
            <div className="rounded-2xl border p-4">
              <p className="font-medium">Valor transferido entre setores</p>
              <Separator className="my-3" />
              <p className="text-3xl font-bold">
                {formatCurrency(resumoMovimentacoes.valorTransferido)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {resumoMovimentacoes.transferencias} transferências e{" "}
                {resumoMovimentacoes.cessoes} cessões de uso.
              </p>
            </div>
            <div className="rounded-2xl border p-4">
              <p className="font-medium">Valor baixado no exercício</p>
              <Separator className="my-3" />
              <p className="text-3xl font-bold text-red-600">
                {formatCurrency(resumoMovimentacoes.valorBaixado)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {resumoMovimentacoes.baixas} baixas por inservibilidade,
                obsolescência ou sinistro.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
