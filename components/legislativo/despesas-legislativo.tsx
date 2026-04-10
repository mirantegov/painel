"use client";

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
  ORCAMENTO_LEGISLATIVO,
  DESPESA_EMPENHADA_LEGISLATIVO,
  TOTAL_DIARIAS_LEGISLATIVO,
  QUANTIDADE_DIARIAS,
  MEDIA_DIARIAS,
  GASTO_PESSOAL_PORCENTO,
  LIMITE_GASTO_PESSOAL,
  formatCurrency,
} from "@/lib/demo-legislativo";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BankIcon,
  InvoiceIcon,
  TrendingUp,
  UserMultipleIcon,
  CalendarIcon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

function DespesasKpis() {
  const executado =
    (DESPESA_EMPENHADA_LEGISLATIVO / ORCAMENTO_LEGISLATIVO) * 100;
  const saldo = ORCAMENTO_LEGISLATIVO - DESPESA_EMPENHADA_LEGISLATIVO;
  const restam = LIMITE_GASTO_PESSOAL - GASTO_PESSOAL_PORCENTO;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Orçamento do Legislativo"
        icon={BankIcon}
        value={formatCurrency(ORCAMENTO_LEGISLATIVO)}
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
        value={formatCurrency(DESPESA_EMPENHADA_LEGISLATIVO)}
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
        value={formatCurrency(TOTAL_DIARIAS_LEGISLATIVO)}
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
  const categorias = [
    {
      nome: "Pessoal e Encargos",
      valor: DESPESA_EMPENHADA_LEGISLATIVO * 0.65,
      porcento: 65,
    },
    {
      nome: "Diárias e Locomoção",
      valor: TOTAL_DIARIAS_LEGISLATIVO,
      porcento: 0.5,
    },
    { nome: "Material de Consumo", valor: 180000, porcento: 2 },
    { nome: "Serviços de Terceiros", valor: 450000, porcento: 5 },
    { nome: "Investimentos", valor: 280000, porcento: 3 },
    { nome: "Outras Despesas", valor: 200000, porcento: 2.2 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Composição das Despesas</CardTitle>
        <CardDescription>Execução orçamentária por categoria</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categorias.map(({ nome, valor, porcento }) => (
            <div key={nome}>
              <div className="flex justify-between text-sm mb-1">
                <span>{nome}</span>
                <span className="font-medium">{formatCurrency(valor)}</span>
              </div>
              <Progress value={porcento} className="h-2" />
            </div>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between">
          <span className="font-semibold">Total Empenhado</span>
          <span className="font-bold">
            {formatCurrency(DESPESA_EMPENHADA_LEGISLATIVO)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function DiariasPorMesChart() {
  const meses = [
    { mes: "Jan", valor: 3500 },
    { mes: "Fev", valor: 4200 },
    { mes: "Mar", valor: 3800 },
    { mes: "Abr", valor: 5100 },
    { mes: "Mai", valor: 4500 },
    { mes: "Jun", valor: 4000 },
    { mes: "Jul", valor: 3200 },
    { mes: "Ago", valor: 3800 },
    { mes: "Set", valor: 4200 },
    { mes: "Out", valor: 3500 },
    { mes: "Nov", valor: 2800 },
    { mes: "Dez", valor: 2400 },
  ];

  const maxValor = Math.max(...meses.map((m) => m.valor));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Diárias por Mês</CardTitle>
        <CardDescription>Valores pagos em diárias em 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2 h-[200px]">
          {meses.map(({ mes, valor }) => (
            <div key={mes} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-orange-500 rounded-t transition-all"
                style={{ height: `${(valor / maxValor) * 160}px` }}
              />
              <span className="text-xs text-muted-foreground">{mes}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AlertaLimite() {
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
      <CardContent className="space-y-4">
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

      <PainelExecutivoFinanceiro />
    </div>
  );
}
