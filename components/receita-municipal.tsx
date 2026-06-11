"use client";

import * as React from "react";
import { useSnapshot } from "@/components/use-snapshot";
import { useYear } from "@/components/year-provider";
import { RECEITA_SNAPSHOT } from "@/lib/demo-receita";
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
  ArrowDown01Icon,
  Wallet01Icon,
  Calendar01Icon,
  Building06Icon,
  CheckmarkCircle02Icon,
  Target01Icon,
  ChartLineData02Icon,
  PieChart02Icon,
  Clock01Icon,
  StarIcon,
  Alert02Icon,
  MoneyAdd01Icon,
  BankIcon,
  Building04Icon,
  Home01Icon,
  Store04Icon,
} from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { KpiCard } from "@/components/ui/kpi-card";

// Formatadores
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

const formatMillions = (value: number) => {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)}K`;
  }
  return formatCurrency(value);
};

const calcPercent = (value: number, total: number) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(1);
};

// Dados de receitas proprias

export function ReceitaMunicipal() {
  const { ano } = useYear();
  const {
    receitasProprias,
    receitasEstaduais,
    receitasFederais,
    outrasReceitas,
    evolucaoMensal,
    comparativoAnual,
    totaisProprias,
    totaisEstaduais,
    totaisFederais,
    totaisOutras,
    totaisGerais,
    distribuicaoOrigem,
    topContribuintes,
    eventosReceita,
    metasArrecadacao,
    inadimplencia,
    totalInadimplencia,
    totalLancado,
    taxaInadimplenciaGeral,
    sazonalidadeData,
    receitaCorrenteCapital,
    receitaCorrenteCapitalChart,
    projecaoReceita,
    totalProjetado,
    benchmarkMunicipios,
  } = useSnapshot("receita", RECEITA_SNAPSHOT);

  // Variação ano-a-ano (derivada de comparativoAnual) — substitui % hardcoded.
  const yoyPct = (campo: "prevista" | "arrecadada") => {
    const cur = comparativoAnual?.find((e) => Number(e.ano) === ano)?.[campo];
    const prev = comparativoAnual?.find((e) => Number(e.ano) === ano - 1)?.[campo];
    if (!cur || !prev) return null;
    return ((cur - prev) / prev) * 100;
  };
  const varPrevista = yoyPct("prevista");
  const varArrecadada = yoyPct("arrecadada");

  return (
    <div className="space-y-8">
      {/* KPIs Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Receita Prevista"
          icon={Target01Icon}
          value={formatMillions(totaisGerais.prevista)}
          borderColor="border-l-blue-500"
          footer={
            varPrevista === null ? (
              <p className="text-xs text-muted-foreground">vs {ano - 1}</p>
            ) : (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <HugeiconsIcon
                  icon={varPrevista >= 0 ? ArrowUp01Icon : ArrowDown01Icon}
                  strokeWidth={2}
                  className={`size-3 ${varPrevista >= 0 ? "text-green-600" : "text-red-600"}`}
                />
                <span className={varPrevista >= 0 ? "text-green-600" : "text-red-600"}>
                  {varPrevista >= 0 ? "+" : ""}
                  {varPrevista.toFixed(1)}%
                </span>
                <span>vs {ano - 1}</span>
              </div>
            )
          }
        />
        <KpiCard
          title="Receita Arrecadada"
          icon={MoneyAdd01Icon}
          value={formatMillions(totaisGerais.arrecadada)}
          borderColor="border-l-green-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="font-medium">
                {calcPercent(totaisGerais.arrecadada, totaisGerais.prevista)}%
              </span>
              <span>da previsão</span>
              {varArrecadada !== null && (
                <>
                  <HugeiconsIcon
                    icon={varArrecadada >= 0 ? ArrowUp01Icon : ArrowDown01Icon}
                    strokeWidth={2}
                    className={`size-3 ml-1 ${varArrecadada >= 0 ? "text-green-600" : "text-red-600"}`}
                  />
                  <span className={varArrecadada >= 0 ? "text-green-600" : "text-red-600"}>
                    {varArrecadada >= 0 ? "+" : ""}
                    {varArrecadada.toFixed(1)}%
                  </span>
                </>
              )}
            </div>
          }
        />
        <KpiCard
          title="A Arrecadar"
          icon={Clock01Icon}
          value={formatMillions(Math.max(0, totaisGerais.aArrecadar))}
          borderColor="border-l-amber-500"
          footer={
            <p className="text-xs text-muted-foreground">
              {calcPercent(
                Math.max(0, totaisGerais.aArrecadar),
                totaisGerais.prevista,
              )}
              % pendente
            </p>
          }
        />
        <KpiCard
          title="Superávit/Déficit"
          icon={totaisGerais.aArrecadar <= 0 ? ArrowUp01Icon : ArrowDown01Icon}
          value={`${totaisGerais.aArrecadar <= 0 ? "+" : "-"}${formatMillions(Math.abs(totaisGerais.aArrecadar))}`}
          valueClassName={
            totaisGerais.aArrecadar <= 0 ? "text-green-600" : "text-red-600"
          }
          borderColor={
            totaisGerais.aArrecadar <= 0
              ? "border-l-green-500"
              : "border-l-red-500"
          }
          footer={
            <p className="text-xs text-muted-foreground">
              {totaisGerais.aArrecadar <= 0
                ? "Acima da previsão"
                : "Abaixo da previsão"}
            </p>
          }
        />
      </div>

      {/* Graficos Principais */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Evolução Mensal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Evolução Mensal
            </CardTitle>
            <CardDescription>
              Comparativo previsto vs arrecadado por mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  prevista: { label: "Prevista", color: "var(--chart-3)" },
                  arrecadada: { label: "Arrecadada", color: "var(--chart-1)" },
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
                  dataKey="prevista"
                  type="monotone"
                  fill="var(--color-prevista)"
                  fillOpacity={0.2}
                  stroke="var(--color-prevista)"
                  strokeDasharray="5 5"
                />
                <Area
                  dataKey="arrecadada"
                  type="monotone"
                  fill="var(--color-arrecadada)"
                  fillOpacity={0.4}
                  stroke="var(--color-arrecadada)"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Origem */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={PieChart02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Composição da Receita
            </CardTitle>
            <CardDescription>
              Distribuição por origem dos recursos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  proprias: {
                    label: "Receitas Próprias",
                    color: "var(--chart-1)",
                  },
                  estaduais: {
                    label: "Transferencias Estaduais",
                    color: "var(--chart-2)",
                  },
                  federais: {
                    label: "Transferencias Federais",
                    color: "var(--chart-3)",
                  },
                  outras: { label: "Outras Receitas", color: "var(--chart-4)" },
                } satisfies ChartConfig
              }
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
                  data={distribuicaoOrigem}
                  dataKey="valor"
                  nameKey="nome"
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

      {/* Cards de Resumo por Origem */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Receitas Próprias"
          icon={Home01Icon}
          value={formatMillions(totaisProprias.arrecadada)}
          borderColor="border-l-[var(--chart-1)]"
          footer={
            <>
              <Progress
                value={Number(
                  calcPercent(
                    totaisProprias.arrecadada,
                    totaisProprias.prevista,
                  ),
                )}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {calcPercent(
                  totaisProprias.arrecadada,
                  totaisProprias.prevista,
                )}
                % de {formatMillions(totaisProprias.prevista)}
              </p>
            </>
          }
        />

        <KpiCard
          title="Transf. Estaduais"
          icon={Building06Icon}
          value={formatMillions(totaisEstaduais.arrecadada)}
          borderColor="border-l-[var(--chart-2)]"
          footer={
            <>
              <Progress
                value={Number(
                  calcPercent(
                    totaisEstaduais.arrecadada,
                    totaisEstaduais.prevista,
                  ),
                )}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {calcPercent(
                  totaisEstaduais.arrecadada,
                  totaisEstaduais.prevista,
                )}
                % de {formatMillions(totaisEstaduais.prevista)}
              </p>
            </>
          }
        />

        <KpiCard
          title="Transf. Federais"
          icon={BankIcon}
          value={formatMillions(totaisFederais.arrecadada)}
          borderColor="border-l-[var(--chart-3)]"
          footer={
            <>
              <Progress
                value={Number(
                  calcPercent(
                    totaisFederais.arrecadada,
                    totaisFederais.prevista,
                  ),
                )}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {calcPercent(
                  totaisFederais.arrecadada,
                  totaisFederais.prevista,
                )}
                % de {formatMillions(totaisFederais.prevista)}
              </p>
            </>
          }
        />

        <KpiCard
          title="Outras Receitas"
          icon={Wallet01Icon}
          value={formatMillions(totaisOutras.arrecadada)}
          borderColor="border-l-[var(--chart-4)]"
          footer={
            <>
              <Progress
                value={Number(
                  calcPercent(totaisOutras.arrecadada, totaisOutras.prevista),
                )}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {calcPercent(totaisOutras.arrecadada, totaisOutras.prevista)}%
                de {formatMillions(totaisOutras.prevista)}
              </p>
            </>
          }
        />
      </div>

      {/* Tabelas Detalhadas por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento por Categoria</CardTitle>
          <CardDescription>
            Receitas agrupadas por origem e tipo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="proprias" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="proprias">Próprias</TabsTrigger>
              <TabsTrigger value="estaduais">Estaduais</TabsTrigger>
              <TabsTrigger value="federais">Federais</TabsTrigger>
              <TabsTrigger value="outras">Outras</TabsTrigger>
            </TabsList>

            <TabsContent value="proprias" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Codigo</TableHead>
                    <TableHead>Receita</TableHead>
                    <TableHead className="text-right">Prevista</TableHead>
                    <TableHead className="text-right">Arrecadada</TableHead>
                    <TableHead className="text-right">%</TableHead>
                    <TableHead className="text-right">Diferenca</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receitasProprias.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-sm">
                        {item.codigo}
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.prevista)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.arrecadada)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            Number(
                              calcPercent(item.arrecadada, item.prevista),
                            ) >= 100
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {calcPercent(item.arrecadada, item.prevista)}%
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right ${item.aArrecadar <= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {item.aArrecadar <= 0 ? "+" : ""}
                        {formatCurrency(Math.abs(item.aArrecadar))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold">
                      Total Receitas Próprias
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totaisProprias.prevista)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totaisProprias.arrecadada)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {calcPercent(
                        totaisProprias.arrecadada,
                        totaisProprias.prevista,
                      )}
                      %
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold ${totaisProprias.aArrecadar <= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatCurrency(Math.abs(totaisProprias.aArrecadar))}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TabsContent>

            <TabsContent value="estaduais" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Codigo</TableHead>
                    <TableHead>Receita</TableHead>
                    <TableHead className="text-right">Prevista</TableHead>
                    <TableHead className="text-right">Arrecadada</TableHead>
                    <TableHead className="text-right">%</TableHead>
                    <TableHead className="text-right">Diferenca</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receitasEstaduais.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-sm">
                        {item.codigo}
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.prevista)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.arrecadada)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            Number(
                              calcPercent(item.arrecadada, item.prevista),
                            ) >= 100
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {calcPercent(item.arrecadada, item.prevista)}%
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right ${item.aArrecadar <= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {item.aArrecadar <= 0 ? "+" : ""}
                        {formatCurrency(Math.abs(item.aArrecadar))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold">
                      Total Transf. Estaduais
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totaisEstaduais.prevista)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totaisEstaduais.arrecadada)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {calcPercent(
                        totaisEstaduais.arrecadada,
                        totaisEstaduais.prevista,
                      )}
                      %
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold ${totaisEstaduais.aArrecadar <= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatCurrency(Math.abs(totaisEstaduais.aArrecadar))}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TabsContent>

            <TabsContent value="federais" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Codigo</TableHead>
                    <TableHead>Receita</TableHead>
                    <TableHead className="text-right">Prevista</TableHead>
                    <TableHead className="text-right">Arrecadada</TableHead>
                    <TableHead className="text-right">%</TableHead>
                    <TableHead className="text-right">Diferenca</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receitasFederais.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-sm">
                        {item.codigo}
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.prevista)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.arrecadada)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            Number(
                              calcPercent(item.arrecadada, item.prevista),
                            ) >= 100
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {calcPercent(item.arrecadada, item.prevista)}%
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right ${item.aArrecadar <= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {item.aArrecadar <= 0 ? "+" : ""}
                        {formatCurrency(Math.abs(item.aArrecadar))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold">
                      Total Transf. Federais
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totaisFederais.prevista)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totaisFederais.arrecadada)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {calcPercent(
                        totaisFederais.arrecadada,
                        totaisFederais.prevista,
                      )}
                      %
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold ${totaisFederais.aArrecadar <= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatCurrency(Math.abs(totaisFederais.aArrecadar))}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TabsContent>

            <TabsContent value="outras" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Codigo</TableHead>
                    <TableHead>Receita</TableHead>
                    <TableHead className="text-right">Prevista</TableHead>
                    <TableHead className="text-right">Arrecadada</TableHead>
                    <TableHead className="text-right">%</TableHead>
                    <TableHead className="text-right">Diferenca</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outrasReceitas.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-sm">
                        {item.codigo}
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.prevista)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.arrecadada)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            Number(
                              calcPercent(item.arrecadada, item.prevista),
                            ) >= 100
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {calcPercent(item.arrecadada, item.prevista)}%
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right ${item.aArrecadar <= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {item.aArrecadar <= 0 ? "+" : ""}
                        {formatCurrency(Math.abs(item.aArrecadar))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold">
                      Total Outras Receitas
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totaisOutras.prevista)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totaisOutras.arrecadada)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {calcPercent(
                        totaisOutras.arrecadada,
                        totaisOutras.prevista,
                      )}
                      %
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold ${totaisOutras.aArrecadar <= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatCurrency(Math.abs(totaisOutras.aArrecadar))}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Comparativo Anual e Top Contribuintes */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Historico Anual */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Histórico de Arrecadação (5 anos)
            </CardTitle>
            <CardDescription>Evolução da arrecadação anual</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  prevista: { label: "Prevista", color: "var(--chart-3)" },
                  arrecadada: { label: "Arrecadada", color: "var(--chart-1)" },
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
                  dataKey="prevista"
                  fill="var(--color-prevista)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="arrecadada"
                  fill="var(--color-arrecadada)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Contribuintes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Store04Icon}
                strokeWidth={2}
                className="size-5"
              />
              Maiores Contribuintes
            </CardTitle>
            <CardDescription>
              Top 5 contribuintes por arrecadacao
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topContribuintes.map((contribuinte, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar size="sm">
                    <AvatarFallback>{index + 1}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate max-w-[200px]">
                        {contribuinte.nome}
                      </p>
                      <span className="text-sm font-semibold">
                        {formatCurrency(contribuinte.valor)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {contribuinte.cnpj}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {contribuinte.tipo}
                      </Badge>
                    </div>
                    <Progress
                      value={
                        (contribuinte.valor / topContribuintes[0].valor) * 100
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

      {/* Metas de Arrecadação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Target01Icon}
              strokeWidth={2}
              className="size-5"
            />
            Metas de Arrecadação
          </CardTitle>
          <CardDescription>
            Acompanhamento dos indicadores de desempenho
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metasArrecadacao.map((meta, index) => (
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

      {/* Inadimplencia por Tributo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Alert02Icon}
              strokeWidth={2}
              className="size-5"
            />
            Inadimplência por Tributo
          </CardTitle>
          <CardDescription>
            Taxa geral de inadimplência:{" "}
            <strong className="text-red-600">{taxaInadimplenciaGeral}%</strong>{" "}
            — Total inadimplente:{" "}
            <strong>{formatCurrency(totalInadimplencia)}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tributo</TableHead>
                <TableHead className="text-right">Lançado</TableHead>
                <TableHead className="text-right">Arrecadado</TableHead>
                <TableHead className="text-right">Inadimplente</TableHead>
                <TableHead className="text-right">% Inadimpl.</TableHead>
                <TableHead className="text-right">Contribuintes</TableHead>
                <TableHead className="text-center">Risco</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inadimplencia.map((item) => (
                <TableRow key={item.tributo}>
                  <TableCell className="font-medium">{item.tributo}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.lancado)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.arrecadado)}
                  </TableCell>
                  <TableCell className="text-right text-red-600 font-medium">
                    {item.inadimplente > 0
                      ? formatCurrency(item.inadimplente)
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.percentual > 0 ? (
                      <Badge
                        variant={
                          item.percentual > 15
                            ? "destructive"
                            : item.percentual > 10
                              ? "outline"
                              : "secondary"
                        }
                        className={
                          item.percentual > 15
                            ? ""
                            : item.percentual > 10
                              ? "text-amber-600"
                              : "text-green-600"
                        }
                      >
                        {item.percentual}%
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-green-600">
                        0%
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.contribuintes > 0
                      ? item.contribuintes.toLocaleString("pt-BR")
                      : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.percentual > 15 ? (
                      <div className="flex items-center justify-center gap-1">
                        <div className="size-2 rounded-full bg-red-500" />
                        <span className="text-xs text-red-600">Alto</span>
                      </div>
                    ) : item.percentual > 10 ? (
                      <div className="flex items-center justify-center gap-1">
                        <div className="size-2 rounded-full bg-amber-500" />
                        <span className="text-xs text-amber-600">Medio</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <div className="size-2 rounded-full bg-green-500" />
                        <span className="text-xs text-green-600">Baixo</span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">
                  {formatCurrency(totalLancado)}
                </TableCell>
                <TableCell className="text-right font-bold">
                  {formatCurrency(totalLancado - totalInadimplencia)}
                </TableCell>
                <TableCell className="text-right font-bold text-red-600">
                  {formatCurrency(totalInadimplencia)}
                </TableCell>
                <TableCell className="text-right font-bold">
                  {taxaInadimplenciaGeral}%
                </TableCell>
                <TableCell className="text-right font-bold">
                  {inadimplencia
                    .reduce((acc, i) => acc + i.contribuintes, 0)
                    .toLocaleString("pt-BR")}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      {/* Sazonalidade e Receita Corrente vs Capital */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Sazonalidade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Calendar01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Sazonalidade da Arrecadação
            </CardTitle>
            <CardDescription>
              Distribuição mensal por origem dos recursos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  proprias: { label: "Próprias", color: "var(--chart-1)" },
                  estaduais: { label: "Estaduais", color: "var(--chart-2)" },
                  federais: { label: "Federais", color: "var(--chart-3)" },
                  outras: { label: "Outras", color: "var(--chart-4)" },
                } satisfies ChartConfig
              }
              className="h-[280px] w-full"
            >
              <BarChart data={sazonalidadeData} margin={{ left: 0, right: 12 }}>
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
                  tickFormatter={(v: number) => `${(v / 1000000).toFixed(0)}M`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  }
                />
                <Bar
                  dataKey="proprias"
                  stackId="a"
                  fill="var(--color-proprias)"
                />
                <Bar
                  dataKey="estaduais"
                  stackId="a"
                  fill="var(--color-estaduais)"
                />
                <Bar
                  dataKey="federais"
                  stackId="a"
                  fill="var(--color-federais)"
                />
                <Bar
                  dataKey="outras"
                  stackId="a"
                  fill="var(--color-outras)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Receita Corrente vs Capital */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={PieChart02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Receita Corrente vs Capital
            </CardTitle>
            <CardDescription>
              Composicao por categoria economica
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
                    data={receitaCorrenteCapitalChart}
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
                {receitaCorrenteCapital.map((cat) => (
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
      </div>

      {/* Projecao de Receita e Benchmark */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Projecao de Receita */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Projeção de Receita
            </CardTitle>
            <CardDescription>
              Realizado + projeção para encerramento — Projetado total:{" "}
              <strong>{formatCurrency(totalProjetado)}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  real: { label: "Realizado", color: "var(--chart-1)" },
                  projetado: { label: "Projetado", color: "var(--chart-5)" },
                } satisfies ChartConfig
              }
              className="h-[280px] w-full"
            >
              <LineChart data={projecaoReceita} margin={{ left: 0, right: 12 }}>
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
                  tickFormatter={(v: number) => `${(v / 1000000).toFixed(0)}M`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) =>
                        value ? formatCurrency(Number(value)) : "-"
                      }
                    />
                  }
                />
                <Line
                  dataKey="real"
                  type="monotone"
                  stroke="var(--color-real)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  connectNulls={false}
                />
                <Line
                  dataKey="projetado"
                  type="monotone"
                  stroke="var(--color-projetado)"
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  dot={{ r: 3, strokeDasharray: "0" }}
                  connectNulls={false}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg border p-3 text-center">
                <p className="text-xs text-muted-foreground">
                  Realizado (Jan-Nov)
                </p>
                <p className="text-sm font-bold">
                  {formatMillions(
                    projecaoReceita
                      .filter((m) => m.real)
                      .reduce((acc, m) => acc + (m.real || 0), 0),
                  )}
                </p>
              </div>
              <div className="rounded-lg border p-3 text-center bg-primary/5">
                <p className="text-xs text-muted-foreground">Projecao Dez</p>
                <p className="text-sm font-bold">{formatMillions(23400000)}</p>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <p className="text-xs text-muted-foreground">Total Projetado</p>
                <p className="text-sm font-bold text-green-600">
                  {formatMillions(totalProjetado)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benchmark com Municipios Similares */}
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
                  <TableHead className="text-right">Rec. Per Capita</TableHead>
                  <TableHead className="text-right">Autonomia</TableHead>
                  <TableHead className="text-right">Realizacao</TableHead>
                  <TableHead className="text-right">Inadimpl.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {benchmarkMunicipios.map((mun) => (
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
                      R$ {mun.receitaPerCapita.toLocaleString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-right">
                      {mun.autonomia}%
                    </TableCell>
                    <TableCell className="text-right">
                      {mun.realizacao}%
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          mun.inadimplencia > 12
                            ? "destructive"
                            : mun.inadimplencia > 9
                              ? "outline"
                              : "secondary"
                        }
                        className={
                          mun.inadimplencia > 12
                            ? ""
                            : mun.inadimplencia > 9
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
                  Posicao no Ranking
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">2o</span>
                  <span className="text-xs text-muted-foreground">
                    de 5 municípios
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Acima da media regional em 3 de 4 indicadores
                </p>
              </div>
              <div className="rounded-lg border p-3 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Destaque Positivo
                </p>
                <p className="text-sm font-medium text-green-600">
                  Menor inadimplencia
                </p>
                <p className="text-xs text-muted-foreground">
                  7.6% vs 11.0% da media regional — melhor entre os comparados
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
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
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventosReceita.map((evento, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`size-2.5 rounded-full ${
                      evento.tipo === "credito" ? "bg-green-500" : "bg-blue-500"
                    }`}
                  />
                  {index < eventosReceita.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-xs text-muted-foreground">{evento.data}</p>
                  <p className="text-sm">{evento.evento}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {evento.origem}
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
