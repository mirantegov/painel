"use client";

import { useLegislativoSnapshot } from "./snapshot-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fmtBRL } from "@/lib/format";
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
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/demo-legislativo";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BankIcon,
  InvoiceIcon,
  UserMultipleIcon,
  CalendarIcon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

function DespesasKpis() {
  const {
    ORCAMENTO_LEGISLATIVO,
    DESPESA_EMPENHADA_LEGISLATIVO,
    TOTAL_DIARIAS_LEGISLATIVO,
    QUANTIDADE_DIARIAS,
    MEDIA_DIARIAS,
    GASTO_PESSOAL_PORCENTO,
    LIMITE_GASTO_PESSOAL,
  } = useLegislativoSnapshot();

  const executado =
    (DESPESA_EMPENHADA_LEGISLATIVO / ORCAMENTO_LEGISLATIVO) * 100;
  const saldo = ORCAMENTO_LEGISLATIVO - DESPESA_EMPENHADA_LEGISLATIVO;
  const restam = LIMITE_GASTO_PESSOAL - GASTO_PESSOAL_PORCENTO;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Orçamento do Legislativo"
        icon={BankIcon}
        value={fmtBRL(ORCAMENTO_LEGISLATIVO)}
        borderColor="border-l-slate-500"
        footer={
          <>
            <div className="flex justify-between text-xs">
              <span>Execução orçamentária</span>
              <span>{executado.toFixed(1)}%</span>
            </div>
            <Progress value={executado} className="h-2" />
          </>
        }
      />
      <KpiCard
        title="Despesa Empenhada"
        icon={InvoiceIcon}
        value={fmtBRL(DESPESA_EMPENHADA_LEGISLATIVO)}
        borderColor="border-l-blue-500"
        footer={
          <p className="text-xs text-muted-foreground">
            Saldo disponível de {formatCurrency(saldo)}
          </p>
        }
      />
      <KpiCard
        title="Diárias Concedidas"
        icon={CalendarIcon}
        value={fmtBRL(TOTAL_DIARIAS_LEGISLATIVO)}
        borderColor="border-l-amber-500"
        footer={
          <p className="text-xs text-muted-foreground">
            {QUANTIDADE_DIARIAS} concessões com média de{" "}
            {formatCurrency(MEDIA_DIARIAS)}
          </p>
        }
      />
      <KpiCard
        title="Gasto com Pessoal"
        icon={UserMultipleIcon}
        value={`${GASTO_PESSOAL_PORCENTO}%`}
        borderColor="border-l-violet-500"
        footer={
          <>
            <div className="flex justify-between text-xs">
              <span>Limite constitucional</span>
              <span>{LIMITE_GASTO_PESSOAL}%</span>
            </div>
            <Progress
              value={(GASTO_PESSOAL_PORCENTO / LIMITE_GASTO_PESSOAL) * 100}
              className="h-2"
            />
            <p className="text-xs text-muted-foreground">
              Margem remanescente de {restam.toFixed(1)} ponto(s) percentuais
            </p>
          </>
        }
      />
    </div>
  );
}

function ResumoDespesas() {
  const { DATA_DESPESAS_CATEGORIAS } = useLegislativoSnapshot();

  const totalEmpenhado = DATA_DESPESAS_CATEGORIAS.reduce(
    (acc, c) => acc + c.empenhado,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Composição das Despesas</CardTitle>
        <CardDescription>
          Execução orçamentária por categoria — Empenhado / Liquidado / Pago
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {DATA_DESPESAS_CATEGORIAS.map(
            ({ nome, empenhado, liquidado, pago }) => (
              <div key={nome}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{nome}</span>
                  <span className="font-medium">
                    {formatCurrency(empenhado)}
                  </span>
                </div>
                <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-muted">
                  <div
                    className="bg-blue-500 rounded-l"
                    style={{ width: `${(empenhado / totalEmpenhado) * 100}%` }}
                    title={`Empenhado: ${formatCurrency(empenhado)}`}
                  />
                </div>
                <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                  <span>Emp. {formatCurrency(empenhado)}</span>
                  <span>Liq. {formatCurrency(liquidado)}</span>
                  <span>Pago {formatCurrency(pago)}</span>
                </div>
              </div>
            ),
          )}
        </div>
        <Separator className="my-4" />
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="font-semibold">Total Empenhado</span>
            <span className="font-bold">{formatCurrency(totalEmpenhado)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Total Liquidado</span>
            <span>
              {formatCurrency(
                DATA_DESPESAS_CATEGORIAS.reduce(
                  (acc, c) => acc + c.liquidado,
                  0,
                ),
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Total Pago</span>
            <span>
              {formatCurrency(
                DATA_DESPESAS_CATEGORIAS.reduce((acc, c) => acc + c.pago, 0),
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DiariasPorMesChart() {
  const { DATA_DIARIAS_MES } = useLegislativoSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Diárias por Mês</CardTitle>
        <CardDescription>Valores pagos em diárias em 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              valor: { label: "Diárias", color: "var(--chart-3)" },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <AreaChart data={DATA_DIARIAS_MES} margin={{ left: 12, right: 12 }}>
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
              width={56}
              tickFormatter={(v) => formatCurrency(v as number)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => formatCurrency(value as number)}
                />
              }
            />
            <Area
              dataKey="valor"
              type="monotone"
              fill="var(--color-valor)"
              fillOpacity={0.2}
              stroke="var(--color-valor)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function DespesasPorCategoriaChart() {
  const { DATA_DESPESAS_CATEGORIAS } = useLegislativoSnapshot();

  const data = DATA_DESPESAS_CATEGORIAS.map((c) => ({
    categoria: c.nome,
    empenhado: c.empenhado,
    pago: c.pago,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Empenhado x Pago por Categoria
        </CardTitle>
        <CardDescription>
          Comparativo da execução orçamentária por categoria de despesa
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              empenhado: { label: "Empenhado", color: "var(--chart-1)" },
              pago: { label: "Pago", color: "var(--chart-2)" },
            } satisfies ChartConfig
          }
          className="h-[300px] w-full"
        >
          <BarChart data={data} margin={{ left: 12, right: 12, bottom: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="categoria"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={56}
              tickFormatter={(v) => formatCurrency(v as number)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => formatCurrency(value as number)}
                />
              }
            />
            <Bar
              dataKey="empenhado"
              fill="var(--color-empenhado)"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="pago"
              fill="var(--color-pago)"
              radius={[2, 2, 0, 0]}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function AlertaLimite() {
  const { GASTO_PESSOAL_PORCENTO, LIMITE_GASTO_PESSOAL } =
    useLegislativoSnapshot();

  const restam = LIMITE_GASTO_PESSOAL - GASTO_PESSOAL_PORCENTO;

  if (GASTO_PESSOAL_PORCENTO >= 60) {
    return (
      <Card className="border-yellow-500">
        <CardContent className="pt-4">
          <div className="flex items-center gap-3">
            <HugeiconsIcon
              icon={AlertCircleIcon}
              className="h-8 w-8 text-yellow-500"
            />
            <div>
              <p className="font-medium">Atenção: Gasto com Pessoal</p>
              <p className="text-sm text-muted-foreground">
                O legislativo está utilizando {GASTO_PESSOAL_PORCENTO}% do
                limite constitucional de {LIMITE_GASTO_PESSOAL}%. Restam apenas{" "}
                {restam.toFixed(1)}% para atingir o teto.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-500">
      <CardContent className="pt-4">
        <div className="flex items-center gap-3">
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            className="h-8 w-8 text-green-500"
          />
          <div>
            <p className="font-medium">Gasto com Pessoal Adequado</p>
            <p className="text-sm text-muted-foreground">
              O legislativo está dentro dos limites constitucionais para gastos
              com pessoal.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PainelExecutivoFinanceiro() {
  const { DESPESA_EMPENHADA_LEGISLATIVO, TOTAL_DIARIAS_LEGISLATIVO } =
    useLegislativoSnapshot();

  const percentualDiarias =
    (TOTAL_DIARIAS_LEGISLATIVO / DESPESA_EMPENHADA_LEGISLATIVO) * 100;
  const gastoPessoalValor = DESPESA_EMPENHADA_LEGISLATIVO * 0.65;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Leitura Executiva Financeira</CardTitle>
        <CardDescription>
          Separação do orçamento próprio do Legislativo
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-sm font-medium text-emerald-800">
            Estrutura de gasto
          </p>
          <p className="text-sm text-emerald-700">
            A despesa com pessoal responde por aproximadamente{" "}
            {formatCurrency(gastoPessoalValor)}, preservando a maior parcela da
            execução da Câmara.
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm font-medium">Diárias em controle</p>
          <p className="text-sm text-muted-foreground">
            As diárias representam {percentualDiarias.toFixed(2)}% da despesa
            empenhada, mantendo baixa pressão sobre o custeio administrativo.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function DespesasLegislativo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Despesas do Legislativo
        </h2>
        <Badge variant="outline" className="ml-2">
          Orçamento Separado
        </Badge>
      </div>

      <DespesasKpis />

      <AlertaLimite />

      <div className="grid gap-6 lg:grid-cols-2">
        <ResumoDespesas />
        <DiariasPorMesChart />
      </div>

      <DespesasPorCategoriaChart />

      <PainelExecutivoFinanceiro />
    </div>
  );
}
