"use client";

import { usePrevidenciaSnapshot } from "./snapshot-context";
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
import { Separator } from "@/components/ui/separator";
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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency, formatCurrencyCompact } from "@/lib/demo-previdencia";
import {
  MoneySendSquareIcon,
  MoneyReceiveSquareIcon,
  TrendingUp,
  PiggyBankIcon,
} from "@hugeicons/core-free-icons";

function ReceitasVsDespesasChart() {
  const { DATA_EVOLUCAO_BENEFICIARIOS } = usePrevidenciaSnapshot();

  const max = Math.max(
    ...DATA_EVOLUCAO_BENEFICIARIOS.map((d) => Math.max(d.receitas, d.despesas)),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Receitas vs Despesas</CardTitle>
        <CardDescription>Comparativo mensal de 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {DATA_EVOLUCAO_BENEFICIARIOS.map(({ mes, receitas, despesas }) => (
            <div key={mes} className="flex items-center gap-4">
              <div className="w-10 text-sm text-muted-foreground">{mes}</div>
              <div className="flex-1 flex gap-2">
                <div
                  className="h-6 bg-emerald-500 rounded"
                  style={{ width: `${(receitas / max) * 100}%` }}
                />
                <div
                  className="h-6 bg-red-400 rounded"
                  style={{ width: `${(despesas / max) * 100}%` }}
                />
              </div>
              <div className="w-24 text-right text-xs">
                <span className="text-emerald-600">
                  {formatCurrencyCompact(receitas)}
                </span>
              </div>
              <div className="w-24 text-right text-xs">
                <span className="text-red-500">
                  {formatCurrencyCompact(despesas)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded" />
            <span className="text-xs text-muted-foreground">Receitas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded" />
            <span className="text-xs text-muted-foreground">Despesas</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ComposicaoReceitas() {
  const { RECEITA_CONTRIBUICOES, RECEITA_INVESTIMENTOS, RECEITA_TOTAL } =
    usePrevidenciaSnapshot();

  const total = RECEITA_TOTAL;
  const contribPct = (RECEITA_CONTRIBUICOES / total) * 100;
  const investPct = (RECEITA_INVESTIMENTOS / total) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Composição das Receitas</CardTitle>
        <CardDescription>Fontes de receita do RPPS</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Contribuições</span>
              <span className="font-medium">
                {formatCurrency(RECEITA_CONTRIBUICOES)}
              </span>
            </div>
            <Progress
              value={contribPct}
              className="h-4 [&>div]:bg-emerald-600"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {contribPct.toFixed(1)}% do total
            </p>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Investimentos</span>
              <span className="font-medium">
                {formatCurrency(RECEITA_INVESTIMENTOS)}
              </span>
            </div>
            <Progress
              value={investPct}
              className="h-4 [&>div]:bg-emerald-500"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {investPct.toFixed(1)}% do total
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-bold">{formatCurrency(total)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function DespesasSeparadas() {
  const {
    DESPESA_BENEFICIOS,
    DESPESA_APOSENTADORIAS,
    DESPESA_PENSOES,
    DESPESA_AUXILIOS,
    DESPESA_ADMINISTRATIVA,
  } = usePrevidenciaSnapshot();

  const totalDespesas = DESPESA_BENEFICIOS + DESPESA_ADMINISTRATIVA;
  const benefPct = (DESPESA_BENEFICIOS / totalDespesas) * 100;
  const adminPct = (DESPESA_ADMINISTRATIVA / totalDespesas) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Despesas do RPPS</CardTitle>
        <CardDescription>Benefícios vs Administrativas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <p className="text-sm text-emerald-800 font-medium">
              Benefícios Pagos
            </p>
            <p className="text-xl font-bold text-emerald-600">
              {formatCurrency(DESPESA_BENEFICIOS)}
            </p>
            <p className="text-xs text-emerald-600">
              {benefPct.toFixed(0)}% do total
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <p className="text-sm text-slate-600 font-medium">Despesas Admin</p>
            <p className="text-xl font-bold text-slate-600">
              {formatCurrency(DESPESA_ADMINISTRATIVA)}
            </p>
            <p className="text-xs text-slate-500">
              {adminPct.toFixed(0)}% do total
            </p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Aposentadorias</span>
            <span className="font-medium">
              {formatCurrency(DESPESA_APOSENTADORIAS)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Pensões</span>
            <span className="font-medium">
              {formatCurrency(DESPESA_PENSOES)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Auxílios</span>
            <span className="font-medium">
              {formatCurrency(DESPESA_AUXILIOS)}
            </span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between font-semibold">
          <span>Total de Despesas</span>
          <span className="text-red-600">{formatCurrency(totalDespesas)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function RentabilidadeChart() {
  const { RENTABILIDADE_ACUMULADA, META_ATUARIAL } = usePrevidenciaSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Rentabilidade x Meta</CardTitle>
        <CardDescription>Comparativo de rendimentos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-8 py-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600">
              {RENTABILIDADE_ACUMULADA}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">Rentabilidade</p>
            <p className="text-xs text-emerald-600">Acumulada</p>
          </div>
          <div className="h-16 w-px bg-border" />
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-600">
              {META_ATUARIAL}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">Meta</p>
            <p className="text-xs text-slate-500">Atuarial</p>
          </div>
          <div className="h-16 w-px bg-border" />
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600">
              +{(RENTABILIDADE_ACUMULADA - META_ATUARIAL).toFixed(1)}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">Superávit</p>
            <p className="text-xs text-emerald-600">vs Meta</p>
          </div>
        </div>
        <Progress
          value={(RENTABILIDADE_ACUMULADA / META_ATUARIAL) * 100}
          className="h-3 [&>div]:bg-emerald-600"
        />
        <p className="text-xs text-center text-muted-foreground mt-2">
          Rentabilidade{" "}
          {((RENTABILIDADE_ACUMULADA / META_ATUARIAL) * 100 - 100).toFixed(0)}%
          acima da meta
        </p>
      </CardContent>
    </Card>
  );
}

function ContribuicoesPorOrgao() {
  const { DATA_ORGAOS } = usePrevidenciaSnapshot();

  const maxContrib = Math.max(...DATA_ORGAOS.map((o) => o.contribuicao));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Contribuições por Órgão</CardTitle>
        <CardDescription>Arrecadação por secretaria</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {DATA_ORGAOS.map(({ orgao, participantes, contribuicao }) => (
            <div key={orgao}>
              <div className="flex justify-between text-sm mb-1">
                <span className="truncate pr-2">{orgao}</span>
                <span className="font-medium whitespace-nowrap">
                  {formatCurrency(contribuicao)}
                </span>
              </div>
              <Progress
                value={(contribuicao / maxContrib) * 100}
                className="h-2 [&>div]:bg-emerald-500"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {participantes} participantes
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DemonstrativoReceitas() {
  const { DATA_RECEITAS_MENSAL } = usePrevidenciaSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Receitas Mensais</CardTitle>
        <CardDescription>Contribuições e investimentos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {DATA_RECEITAS_MENSAL.map(({ mes, contribuicoes, investimentos }) => (
            <div
              key={mes}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-muted-foreground w-10">{mes}</span>
              <div className="flex-1 bg-emerald-100 rounded h-6 relative">
                <div
                  className="absolute left-0 top-0 h-full bg-emerald-500 rounded-l"
                  style={{
                    width: `${(contribuicoes / (contribuicoes + investimentos)) * 100}%`,
                  }}
                />
              </div>
              <span className="w-20 text-right font-medium">
                {formatCurrencyCompact(contribuicoes + investimentos)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ReceitasMensaisAreaChart() {
  const { DATA_RECEITAS_MENSAL } = usePrevidenciaSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Evolução das Receitas</CardTitle>
        <CardDescription>
          Contribuições e investimentos ao longo de 2025
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              contribuicoes: {
                label: "Contribuições",
                color: "var(--chart-1)",
              },
              investimentos: {
                label: "Investimentos",
                color: "var(--chart-2)",
              },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <AreaChart
            data={DATA_RECEITAS_MENSAL}
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
              tickFormatter={(v) => formatCurrencyCompact(Number(v))}
              width={70}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="contribuicoes"
              type="monotone"
              stackId="1"
              fill="var(--color-contribuicoes)"
              fillOpacity={0.4}
              stroke="var(--color-contribuicoes)"
            />
            <Area
              dataKey="investimentos"
              type="monotone"
              stackId="1"
              fill="var(--color-investimentos)"
              fillOpacity={0.4}
              stroke="var(--color-investimentos)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const CARTEIRA_CORES = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

function CarteiraInvestimentosDonut() {
  const { DATA_CARTEIRA_INVESTIMENTOS } = usePrevidenciaSnapshot();

  const carteiraConfig = DATA_CARTEIRA_INVESTIMENTOS.reduce(
    (acc, item, index) => {
      acc[item.classe] = {
        label: item.classe,
        color: CARTEIRA_CORES[index % CARTEIRA_CORES.length],
      };
      return acc;
    },
    {} as ChartConfig,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Alocação da Carteira</CardTitle>
        <CardDescription>Distribuição por classe de ativo</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={carteiraConfig}
          className="mx-auto aspect-auto h-[300px] w-full"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => formatCurrencyCompact(Number(value))}
                  hideLabel
                />
              }
            />
            <Pie
              data={DATA_CARTEIRA_INVESTIMENTOS}
              dataKey="valor"
              nameKey="classe"
              innerRadius={60}
              outerRadius={100}
              strokeWidth={4}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {DATA_CARTEIRA_INVESTIMENTOS.map((item, index) => (
                <Cell
                  key={item.classe}
                  fill={CARTEIRA_CORES[index % CARTEIRA_CORES.length]}
                />
              ))}
            </Pie>
            <ChartLegend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              content={
                <ChartPieValueLegend
                  nameKey="classe"
                  valueKey="valor"
                  valueFormatter={formatCurrencyCompact}
                />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function CarteiraInvestimentos() {
  const { DATA_CARTEIRA_INVESTIMENTOS } = usePrevidenciaSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Carteira de Investimentos</CardTitle>
        <CardDescription>Alocação por classe de ativo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {DATA_CARTEIRA_INVESTIMENTOS.map(
            ({ classe, valor, percentual, meta, benchmarkAnual }) => (
              <div key={classe}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{classe}</span>
                  <span className="font-medium">
                    {formatCurrencyCompact(valor)}
                  </span>
                </div>
                <Progress
                  value={percentual}
                  className="h-3 [&>div]:bg-emerald-500"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>
                    Alocação: {percentual}% (meta: {meta}%)
                  </span>
                  <span>Benchmark: {benchmarkAnual}% a.a.</span>
                </div>
              </div>
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function EquilibrioFinanceiroCard() {
  const { RECEITA_INVESTIMENTOS, RECEITA_TOTAL, DESPESA_TOTAL } =
    usePrevidenciaSnapshot();

  const saldoMensal = RECEITA_TOTAL - DESPESA_TOTAL;
  const dependenciaInvestimentos =
    (RECEITA_INVESTIMENTOS / RECEITA_TOTAL) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Leitura do Equilíbrio Financeiro
        </CardTitle>
        <CardDescription>
          Separação entre custeio assistencial e administrativo
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2">
        <div
          className={`rounded-lg border p-3 ${saldoMensal >= 0 ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}
        >
          <p
            className={`text-sm font-medium ${saldoMensal >= 0 ? "text-emerald-800" : "text-red-800"}`}
          >
            Resultado do período
          </p>
          <p
            className={`text-sm ${saldoMensal >= 0 ? "text-emerald-700" : "text-red-700"}`}
          >
            O RPPS apresenta resultado de {formatCurrency(saldoMensal)} entre
            receitas e despesas, com a despesa administrativa mantida apartada
            da despesa com beneficiários.
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm font-medium">Dependência de investimentos</p>
          <p className="text-sm text-muted-foreground">
            {dependenciaInvestimentos.toFixed(1)}% da receita total vem de
            investimentos, o que exige monitoramento da volatilidade para
            sustentar o fluxo mensal.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function AnaliseFinanceira() {
  const {
    RECEITA_TOTAL,
    DESPESA_TOTAL,
    SALDO_FUNDO,
    RENTABILIDADE_ACUMULADA,
    META_ATUARIAL,
  } = usePrevidenciaSnapshot();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Análise Financeira
        </h2>
        <Badge variant="outline" className="ml-2">
          Exercício 2025
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Receita Total"
          value={formatCurrencyCompact(RECEITA_TOTAL)}
          icon={MoneyReceiveSquareIcon}
          borderColor="border-l-emerald-600"
          footer={
            <>
              <p className="text-xs text-emerald-600">
                Alta de 8,2% vs. exercício anterior
              </p>
              <p className="text-xs text-muted-foreground">
                Arrecadação consolidada do RPPS
              </p>
            </>
          }
        />
        <KpiCard
          title="Despesa Total"
          value={formatCurrencyCompact(DESPESA_TOTAL)}
          icon={MoneySendSquareIcon}
          borderColor="border-l-red-500"
          footer={
            <>
              <p className="text-xs text-red-600">
                Alta de 3,1% vs. exercício anterior
              </p>
              <p className="text-xs text-muted-foreground">
                Benefícios e despesas administrativas
              </p>
            </>
          }
        />
        <KpiCard
          title="Saldo do Fundo"
          value={formatCurrencyCompact(SALDO_FUNDO)}
          icon={PiggyBankIcon}
          borderColor="border-l-green-700"
          footer={
            <>
              <p className="text-xs text-emerald-600">
                Alta de 12,5% vs. exercício anterior
              </p>
              <p className="text-xs text-muted-foreground">
                Disponibilidade acumulada do fundo
              </p>
            </>
          }
        />
        <KpiCard
          title="Rentabilidade"
          value={`${RENTABILIDADE_ACUMULADA}%`}
          icon={TrendingUp}
          borderColor="border-l-lime-500"
          footer={
            <>
              <p className="text-xs text-emerald-600">
                +{(RENTABILIDADE_ACUMULADA - META_ATUARIAL).toFixed(1)} ponto(s)
                vs. meta atuarial
              </p>
              <p className="text-xs text-muted-foreground">
                Acumulado dos últimos 12 meses
              </p>
            </>
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ReceitasVsDespesasChart />
        <ComposicaoReceitas />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DespesasSeparadas />
        <RentabilidadeChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ReceitasMensaisAreaChart />
        <CarteiraInvestimentosDonut />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ContribuicoesPorOrgao />
        <DemonstrativoReceitas />
      </div>

      <CarteiraInvestimentos />

      <EquilibrioFinanceiroCard />
    </div>
  );
}
