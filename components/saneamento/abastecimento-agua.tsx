"use client";

import { useSaneamentoSnapshot } from "./snapshot-context";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiCard } from "@/components/ui/kpi-card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  ReferenceLine,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DropletIcon,
  DashboardSpeed02Icon,
  AlertCircleIcon,
  CheckmarkCircle01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { formatNumber, formatPercent } from "@/lib/demo-saneamento";
import { cn } from "@/lib/utils";

function EvolucaoPerdaChart() {
  const { DATA_PERDA_AGUA_MENSAL } = useSaneamentoSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Índice de Perda de Água</CardTitle>
        <CardDescription>Evolução mensal — meta: abaixo de 25%</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              perda: { label: "Índice de Perda (%)", color: "var(--chart-3)" },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <LineChart
            data={DATA_PERDA_AGUA_MENSAL}
            margin={{ left: 12, right: 12 }}
          >
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
              tickFormatter={(v) => `${v}%`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [`${value}%`, "Índice de Perda"]}
                />
              }
            />
            <ReferenceLine
              y={25}
              stroke="var(--chart-5)"
              strokeDasharray="4 4"
              label={{
                value: "Meta 25%",
                position: "insideTopRight",
                fontSize: 11,
              }}
            />
            <Line
              type="monotone"
              dataKey="valor"
              stroke="var(--color-perda)"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function QualidadeAguaChart() {
  const { DATA_QUALIDADE_AGUA } = useSaneamentoSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Qualidade da Água</CardTitle>
        <CardDescription>
          % de conformidade mensal — Portaria GM/MS 888
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              conformidade: {
                label: "Conformidade (%)",
                color: "var(--chart-2)",
              },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <AreaChart
            data={DATA_QUALIDADE_AGUA}
            margin={{ left: 12, right: 12 }}
          >
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
              domain={[95, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [`${value}%`, "Conformidade"]}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="valor"
              stroke="var(--color-conformidade)"
              fill="var(--color-conformidade)"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function ConsumoPercaptaChart() {
  const { DATA_CONSUMO_PERCAPITA_MENSAL } = useSaneamentoSnapshot();

  const media =
    DATA_CONSUMO_PERCAPITA_MENSAL.reduce((s, d) => s + d.valor, 0) /
    DATA_CONSUMO_PERCAPITA_MENSAL.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consumo Per Capita</CardTitle>
        <CardDescription>
          L/hab/dia — média anual:{" "}
          <span className="font-semibold text-emerald-600">
            {media.toFixed(0)} L/hab/dia
          </span>{" "}
          vs benchmark SNIS 220 L/hab/dia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              valor: { label: "Consumo (L/hab/dia)", color: "var(--chart-1)" },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <LineChart
            data={DATA_CONSUMO_PERCAPITA_MENSAL}
            margin={{ left: 12, right: 12 }}
          >
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
              tickFormatter={(v) => `${v}`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [
                    `${value} L/hab/dia`,
                    "Consumo Per Capita",
                  ]}
                />
              }
            />
            <ReferenceLine
              y={220}
              stroke="var(--chart-4)"
              strokeDasharray="4 4"
              label={{
                value: "SNIS 220",
                position: "insideBottomRight",
                fontSize: 11,
              }}
            />
            <Line
              type="monotone"
              dataKey="valor"
              stroke="var(--color-valor)"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function PontosCaptacaoChart() {
  const { DATA_PONTOS_CAPTACAO } = useSaneamentoSnapshot();

  const chartData = DATA_PONTOS_CAPTACAO.map((p) => ({
    nome: p.nome.split(" ")[0],
    vazao: p.vazaoLS,
    capacidade: p.capacidadeLS,
    qualidade: p.qualidade,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pontos de Captação</CardTitle>
        <CardDescription>Vazão vs Capacidade por fonte (L/s)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              capacidade: {
                label: "Capacidade (L/s)",
                color: "var(--chart-3)",
              },
              vazao: { label: "Vazão Atual (L/s)", color: "var(--chart-1)" },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="nome"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="capacidade"
              fill="var(--color-capacidade)"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="vazao"
              fill="var(--color-vazao)"
              radius={[2, 2, 0, 0]}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function DistribuicaoLigacoesChart() {
  const { DATA_DISTRIBUICAO_LIGACOES } = useSaneamentoSnapshot();

  const colors = ["var(--chart-1)", "var(--chart-3)", "var(--chart-5)"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Ligações</CardTitle>
        <CardDescription>Por categoria de consumo</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              residencial: { label: "Residencial", color: "var(--chart-1)" },
              comercial: { label: "Comercial", color: "var(--chart-3)" },
              industrial: { label: "Industrial", color: "var(--chart-5)" },
            } satisfies ChartConfig
          }
          className="mx-auto aspect-square h-[280px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [
                    formatNumber(Number(value)),
                    "Ligações",
                  ]}
                />
              }
            />
            <Pie
              data={DATA_DISTRIBUICAO_LIGACOES.map((l, i) => ({
                name: l.tipo,
                value: l.quantidade,
                fill: colors[i],
              }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {DATA_DISTRIBUICAO_LIGACOES.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function TabelaParametros() {
  const { DATA_PARAMETROS_AGUA } = useSaneamentoSnapshot();

  const conformes = DATA_PARAMETROS_AGUA.filter((p) => p.conforme).length;
  const total = DATA_PARAMETROS_AGUA.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parâmetros de Potabilidade</CardTitle>
        <CardDescription>
          Última análise laboratorial — {conformes}/{total} parâmetros conformes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parâmetro</TableHead>
              <TableHead className="text-right">Medido</TableHead>
              <TableHead className="text-right">Limite</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Conforme</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DATA_PARAMETROS_AGUA.map((p) => (
              <TableRow key={p.parametro}>
                <TableCell className="font-medium">{p.parametro}</TableCell>
                <TableCell className="text-right font-mono">
                  {p.valorMedido} {p.unidade}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {p.limiteMin}–{p.limiteMax} {p.unidade}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={p.conforme ? "default" : "destructive"}
                    className={p.conforme ? "bg-emerald-600" : ""}
                  >
                    {p.conforme ? "Conforme" : "Não Conforme"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  {p.conforme ? (
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      className="h-5 w-5 text-emerald-600 mx-auto"
                    />
                  ) : (
                    <HugeiconsIcon
                      icon={AlertCircleIcon}
                      className="h-5 w-5 text-red-600 mx-auto"
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-right font-medium">
                Taxa de Conformidade
              </TableCell>
              <TableCell className="text-center font-bold text-emerald-600">
                {formatPercent((conformes / total) * 100)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}

function ComparativoSNISCard() {
  const {
    COBERTURA_AGUA_PCT,
    INDICE_PERDA_AGUA_PCT,
    LIGACOES_ATIVAS_AGUA,
    DATA_CONSUMO_PERCAPITA_MENSAL,
  } = useSaneamentoSnapshot();

  const consumoMedio = Math.round(
    DATA_CONSUMO_PERCAPITA_MENSAL.reduce((s, d) => s + d.valor, 0) /
      DATA_CONSUMO_PERCAPITA_MENSAL.length,
  );

  const indicadores = [
    {
      label: "Cobertura de Água",
      valor: formatPercent(COBERTURA_AGUA_PCT),
      snis: "90,0%",
      melhor: COBERTURA_AGUA_PCT >= 90,
    },
    {
      label: "Índice de Perda",
      valor: formatPercent(INDICE_PERDA_AGUA_PCT),
      snis: "40,1%",
      melhor: INDICE_PERDA_AGUA_PCT < 40.1,
    },
    {
      label: "Consumo Per Capita",
      valor: `${consumoMedio} L/hab/dia`,
      snis: "220 L/hab/dia",
      melhor: false,
    },
    {
      label: "Ligações Ativas",
      valor: formatNumber(LIGACOES_ATIVAS_AGUA),
      snis: "—",
      melhor: true,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HugeiconsIcon
            icon={InformationCircleIcon}
            strokeWidth={2}
            className="h-5 w-5"
          />
          Comparativo SNIS
        </CardTitle>
        <CardDescription>
          Indicadores locais vs médias nacionais (SNIS 2023)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {indicadores.map((ind) => (
            <div key={ind.label} className="rounded-lg border p-4 space-y-1">
              <p className="text-xs text-muted-foreground font-medium">
                {ind.label}
              </p>
              <p
                className={cn(
                  "text-xl font-bold",
                  ind.melhor ? "text-emerald-600" : "text-amber-600",
                )}
              >
                {ind.valor}
              </p>
              {ind.snis !== "—" && (
                <p className="text-xs text-muted-foreground">
                  SNIS: {ind.snis}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function AbastecimentoAgua() {
  const {
    POPULACAO_ATENDIDA_AGUA,
    COBERTURA_AGUA_PCT,
    VOLUME_PRODUZIDO_M3,
    VOLUME_FATURADO_M3,
    INDICE_PERDA_AGUA_PCT,
    ETA_CAPACIDADE_LS,
    ETA_PRODUCAO_ATUAL_LS,
    LIGACOES_ATIVAS_AGUA,
  } = useSaneamentoSnapshot();

  const etaPct = (ETA_PRODUCAO_ATUAL_LS / ETA_CAPACIDADE_LS) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Abastecimento de Água</h2>
        <p className="text-muted-foreground">
          Produção, tratamento e distribuição
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="População Atendida"
          icon={DropletIcon}
          value={`${formatNumber(POPULACAO_ATENDIDA_AGUA)} hab`}
          borderColor="border-l-emerald-600"
          footer={
            <div className="flex items-center gap-2">
              <Progress
                value={COBERTURA_AGUA_PCT}
                className="h-2 flex-1 [&>div]:bg-emerald-500"
              />
              <span className="text-xs font-medium">
                {formatPercent(COBERTURA_AGUA_PCT)}
              </span>
            </div>
          }
        />
        <KpiCard
          title="Volume Produzido"
          icon={DashboardSpeed02Icon}
          value={`${(VOLUME_PRODUZIDO_M3 / 1_000_000).toFixed(1)}M m³`}
          borderColor="border-l-green-500"
          footer={
            <div className="text-xs text-muted-foreground">
              ETA: {ETA_PRODUCAO_ATUAL_LS} L/s de {ETA_CAPACIDADE_LS} L/s (
              {etaPct.toFixed(0)}%)
            </div>
          }
        />
        <KpiCard
          title="Volume Faturado"
          icon={CheckmarkCircle01Icon}
          value={`${(VOLUME_FATURADO_M3 / 1_000_000).toFixed(1)}M m³`}
          borderColor="border-l-emerald-600"
          footer={
            <p className="text-xs text-muted-foreground">
              {formatPercent((VOLUME_FATURADO_M3 / VOLUME_PRODUZIDO_M3) * 100)}{" "}
              do volume produzido
            </p>
          }
        />
        <KpiCard
          title="Índice de Perda"
          icon={AlertCircleIcon}
          value={formatPercent(INDICE_PERDA_AGUA_PCT)}
          valueClassName={
            INDICE_PERDA_AGUA_PCT > 25 ? "text-amber-600" : "text-emerald-600"
          }
          borderColor={
            INDICE_PERDA_AGUA_PCT > 25
              ? "border-l-amber-500"
              : "border-l-emerald-600"
          }
          footer={
            <p
              className={cn(
                "text-xs",
                INDICE_PERDA_AGUA_PCT > 25
                  ? "text-amber-600"
                  : "text-emerald-600",
              )}
            >
              Meta: abaixo de 25%
            </p>
          }
        />
      </div>

      {/* Alertas */}
      {INDICE_PERDA_AGUA_PCT > 25 && (
        <Alert>
          <HugeiconsIcon
            icon={AlertCircleIcon}
            strokeWidth={2}
            className="h-4 w-4"
          />
          <AlertTitle>Atenção: Índice de Perda Elevado</AlertTitle>
          <AlertDescription>
            O índice de perda de água está acima da meta estabelecida (25%).
            Recomenda-se intensificar ações de redução de perdas reais e
            setorização da rede.
          </AlertDescription>
        </Alert>
      )}

      {/* Gráficos Principais */}
      <div className="grid gap-4 lg:grid-cols-2">
        <EvolucaoPerdaChart />
        <QualidadeAguaChart />
      </div>

      {/* Consumo Per Capita */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ConsumoPercaptaChart />
        <PontosCaptacaoChart />
      </div>

      {/* Gráficos Secundários */}
      <div className="grid gap-4 lg:grid-cols-2">
        <DistribuicaoLigacoesChart />
        <ComparativoSNISCard />
      </div>

      {/* Tabela Detalhada */}
      <TabelaParametros />

      {/* Leitura Executiva */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={InformationCircleIcon}
              strokeWidth={2}
              className="h-5 w-5"
            />
            Leitura Executiva
          </CardTitle>
          <CardDescription>Abastecimento de Água Potável</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-muted/50 p-4">
              <h4 className="font-semibold text-sm mb-2">
                Cobertura e Qualidade
              </h4>
              <p className="text-sm text-muted-foreground">
                O sistema de abastecimento atende{" "}
                {formatPercent(COBERTURA_AGUA_PCT)} da população, com{" "}
                {formatNumber(LIGACOES_ATIVAS_AGUA)} ligações ativas. A
                qualidade da água mantém conformidade média acima de 98% nos
                parâmetros de potabilidade da Portaria GM/MS 888, com todos os
                parâmetros dentro dos limites estabelecidos.
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <h4 className="font-semibold text-sm mb-2">
                Perdas e Eficiência
              </h4>
              <p className="text-sm text-muted-foreground">
                O índice de perda de {formatPercent(INDICE_PERDA_AGUA_PCT)} está
                abaixo da média nacional (40,1% SNIS), mas ainda acima da meta
                de 25%. A ETA opera a {etaPct.toFixed(0)}% da capacidade, com
                folga para atender o crescimento projetado. Prioridade: redução
                de perdas reais via setorização e controle de pressão.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
