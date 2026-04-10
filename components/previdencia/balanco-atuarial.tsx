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
  SALDO_FUNDO,
  PATRIMONIO_LIQUIDO,
  PROVISOES_MATEMATICAS,
  INDICE_SOLVENCIA,
  RENTABILIDADE_ACUMULADA,
  META_ATUARIAL,
  DATA_PROJECAO_ATUARIAL,
  DATA_SOLVENCIA,
  formatCurrency,
  formatCurrencyCompact,
} from "@/lib/demo-previdencia";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  TrendingUp,
  WalletIcon,
  ChartBarIncreasingIcon,
  ShieldIcon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

function ProjecaoAtuarialChart() {
  const maxAtivo = Math.max(...DATA_PROJECAO_ATUARIAL.map((d) => d.ativo));
  const maxPassivo = Math.max(...DATA_PROJECAO_ATUARIAL.map((d) => d.passivo));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Projeção Atuarial</CardTitle>
        <CardDescription>Ativo vs Passivo 2025-2032</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {DATA_PROJECAO_ATUARIAL.map(({ ano, ativo, passivo, resultado }) => (
            <div key={ano} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{ano}</span>
                <div className="flex gap-4">
                  <span className="text-emerald-600">
                    Ativo: {formatCurrencyCompact(ativo)}
                  </span>
                  <span className="text-red-500">
                    Passivo: {formatCurrencyCompact(passivo)}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <div
                  className="h-6 bg-emerald-500 rounded-l"
                  style={{ width: `${(ativo / (ativo + passivo)) * 100}%` }}
                />
                <div
                  className="h-6 bg-red-400 rounded-r"
                  style={{ width: `${(passivo / (ativo + passivo)) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Cobertura: {((ativo / passivo) * 100).toFixed(1)}%</span>
                <span
                  className={
                    resultado >= 0 ? "text-emerald-600" : "text-red-600"
                  }
                >
                  {resultado >= 0 ? "Superávit" : "Déficit"}:{" "}
                  {formatCurrencyCompact(Math.abs(resultado))}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded" />
            <span className="text-xs text-muted-foreground">Ativo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded" />
            <span className="text-xs text-muted-foreground">Passivo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function IndiceSolvencia() {
  const resultado = PATRIMONIO_LIQUIDO - PROVISOES_MATEMATICAS;
  const cobertura = (PATRIMONIO_LIQUIDO / PROVISOES_MATEMATICAS) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Índice de Solvência</CardTitle>
        <CardDescription>Cobertura das provisões</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-4">
          <div className="text-5xl font-bold text-emerald-600">
            {INDICE_SOLVENCIA}%
          </div>
          <p className="text-muted-foreground mt-2">Índice de Cobertura</p>
        </div>
        <Progress
          value={INDICE_SOLVENCIA}
          className="h-4 [&>div]:bg-emerald-500"
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center p-3 rounded-lg bg-emerald-50">
            <p className="text-lg font-bold text-emerald-600">
              {formatCurrencyCompact(PATRIMONIO_LIQUIDO)}
            </p>
            <p className="text-xs text-emerald-700">Ativo Real</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-red-50">
            <p className="text-lg font-bold text-red-600">
              {formatCurrencyCompact(PROVISOES_MATEMATICAS)}
            </p>
            <p className="text-xs text-red-700">Provisões</p>
          </div>
        </div>
        {resultado >= 0 ? (
          <div className="flex items-center justify-center gap-2 mt-4 text-emerald-600">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-4 w-4" />
            <span className="text-sm font-medium">
              Superávit de {formatCurrencyCompact(resultado)}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 mt-4 text-red-600">
            <HugeiconsIcon icon={AlertCircleIcon} className="h-4 w-4" />
            <span className="text-sm font-medium">
              Déficit de {formatCurrencyCompact(Math.abs(resultado))}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function EvoluacaoSolvencia() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Evolução do Índice de Solvência
        </CardTitle>
        <CardDescription>Projeção 2025-2032</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2 h-[200px]">
          {DATA_SOLVENCIA.map(({ ano, indice }) => {
            return (
              <div
                key={ano}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  className={`w-full rounded-t transition-all ${indice >= 100 ? "bg-emerald-500" : "bg-yellow-500"}`}
                  style={{ height: `${Math.min(indice - 80, 100)}px` }}
                />
                <span className="text-xs text-muted-foreground">{ano}</span>
                <span
                  className={`text-xs font-medium ${indice >= 100 ? "text-emerald-600" : "text-yellow-600"}`}
                >
                  {indice}%
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-4 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded" />
            <span className="text-xs text-muted-foreground">
              Solvente (≥100%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded" />
            <span className="text-xs text-muted-foreground">
              Atenção (&lt;100%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DemonstrativoAtuarial() {
  const ativo = PATRIMONIO_LIQUIDO;
  const passivo = PROVISOES_MATEMATICAS;
  const resultado = ativo - passivo;
  const resultadoPct = (resultado / passivo) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Demonstrativo Atuarial</CardTitle>
        <CardDescription>Balanço do RPPS</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <p className="text-sm text-emerald-800 font-medium mb-2">
              Ativo Real Líquido
            </p>
            <p className="text-2xl font-bold text-emerald-600">
              {formatCurrency(ativo)}
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Provisões Matemáticas
            </p>
            <div className="space-y-1 pl-4 border-l-2 border-muted">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Aposentadorias</span>
                <span className="font-medium">R$ 32.500.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pensões</span>
                <span className="font-medium">R$ 14.200.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Auxílios</span>
                <span className="font-medium">R$ 2.200.000</span>
              </div>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Total Provisões</span>
              <span className="text-red-600">{formatCurrency(passivo)}</span>
            </div>
          </div>

          <Separator />

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <p className="text-sm text-slate-600 font-medium mb-1">
              {resultado >= 0 ? "Superávit Atuarial" : "Déficit Atuarial"}
            </p>
            <p
              className={`text-2xl font-bold ${resultado >= 0 ? "text-emerald-600" : "text-red-600"}`}
            >
              {formatCurrency(Math.abs(resultado))}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {resultadoPct.toFixed(2)}% do total de provisões
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function VariaveisAtuariais() {
  const variaveis = [
    { nome: "Taxa de Juros Atuarial", valor: "4,5%", status: "ok" },
    { nome: "Tábua de Mortalidade", valor: "AT-2000", status: "ok" },
    { nome: "Tábua de Entrada em Invalidez", valor: "AU-1989", status: "ok" },
    { nome: "Rotatividade", valor: "3,0%", status: "ok" },
    { nome: "Composição Familiar", valor: "75% casados", status: "ok" },
    { nome: "Idade Média Aposentados", valor: "72 anos", status: "ok" },
    { nome: "Idade Média Pensionistas", valor: "58 anos", status: "ok" },
    { nome: "Expectativa Sobrevida", valor: "18 anos", status: "ok" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Variáveis Atuariais</CardTitle>
        <CardDescription>Parâmetros do cálculo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {variaveis.map(({ nome, valor, status }) => (
            <div
              key={nome}
              className="flex items-center justify-between p-2 rounded hover:bg-muted/50"
            >
              <span className="text-sm">{nome}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{valor}</span>
                {status === "ok" && (
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    className="h-4 w-4 text-emerald-600"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RentabilidadeMeta() {
  const superavit = RENTABILIDADE_ACUMULADA - META_ATUARIAL;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Rentabilidade vs Meta</CardTitle>
        <CardDescription>Desempenho dos investimentos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-8 py-6">
          <div className="text-center">
            <div
              className={`text-4xl font-bold ${RENTABILIDADE_ACUMULADA >= META_ATUARIAL ? "text-emerald-600" : "text-red-600"}`}
            >
              {RENTABILIDADE_ACUMULADA}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">Rentabilidade</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-600">
              {META_ATUARIAL}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">Meta</p>
          </div>
        </div>
        <Progress
          value={(RENTABILIDADE_ACUMULADA / META_ATUARIAL) * 100}
          className="h-4 [&>div]:bg-emerald-500"
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-muted-foreground">
            Cobertura da meta
          </span>
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
            {superavit >= 0 ? "+" : ""}
            {superavit.toFixed(1)}% acima
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function AlertaSolvencia() {
  if (INDICE_SOLVENCIA >= 100) {
    return (
      <Card className="border-emerald-500">
        <CardContent className="pt-4">
          <div className="flex items-center gap-3">
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              className="h-8 w-8 text-emerald-500"
            />
            <div>
              <p className="font-medium text-emerald-700">RPPS Solvente</p>
              <p className="text-sm text-emerald-600">
                O Regime possui cobertura suficiente para arcar com suas
                obrigações futuras. Índice de solvência de {INDICE_SOLVENCIA}%
                está acima do mínimo legal de 100%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-yellow-500">
      <CardContent className="pt-4">
        <div className="flex items-center gap-3">
          <HugeiconsIcon
            icon={AlertCircleIcon}
            className="h-8 w-8 text-yellow-500"
          />
          <div>
            <p className="font-medium text-yellow-700">
              Atenção: RPPS em Risco
            </p>
            <p className="text-sm text-yellow-600">
              O Regime precisa de atenção especial. Recomenda-se revisão do
              plano de custeio e possível aumento de alíquotas de contribuição.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RiscoAtuarialCard() {
  const deficit = PROVISOES_MATEMATICAS - PATRIMONIO_LIQUIDO;
  const anoEquilibrio = DATA_PROJECAO_ATUARIAL.find(
    (item) => item.resultado >= 0,
  )?.ano;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Painel de Risco Atuarial</CardTitle>
        <CardDescription>
          Déficit corrente e horizonte de recuperação
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
          <p className="text-sm font-medium text-yellow-800">Exposição atual</p>
          <p className="text-sm text-yellow-700">
            O déficit atuarial estimado é de {formatCurrency(deficit)}, com
            índice de solvência ainda abaixo do patamar de 100%.
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm font-medium">Horizonte de recomposição</p>
          <p className="text-sm text-muted-foreground">
            Mantidas as premissas do cenário, o equilíbrio projetado surge a
            partir de {anoEquilibrio ?? "ano não estimado"}, exigindo disciplina
            no plano de custeio e na política de investimentos.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function BalancoAtuarial() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Balanço Atuarial</h2>
        <Badge variant="outline" className="ml-2">
          Avaliação 2025
        </Badge>
      </div>

      <AlertaSolvencia />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Ativo Real Líquido"
          value={formatCurrencyCompact(PATRIMONIO_LIQUIDO)}
          icon={WalletIcon}
          borderColor="border-l-emerald-600"
          footer={
            <>
              <p className="text-xs text-emerald-600">
                Alta de 8,5% vs. exercício anterior
              </p>
              <p className="text-xs text-muted-foreground">
                Patrimônio disponível para cobertura futura
              </p>
            </>
          }
        />
        <KpiCard
          title="Provisões Matemáticas"
          value={formatCurrencyCompact(PROVISOES_MATEMATICAS)}
          icon={ChartBarIncreasingIcon}
          borderColor="border-l-red-500"
          footer={
            <>
              <p className="text-xs text-red-600">
                Alta de 5,2% vs. exercício anterior
              </p>
              <p className="text-xs text-muted-foreground">
                Passivo atuarial projetado do regime
              </p>
            </>
          }
        />
        <KpiCard
          title="Índice de Solvência"
          value={`${INDICE_SOLVENCIA}%`}
          icon={ShieldIcon}
          borderColor={
            INDICE_SOLVENCIA >= 100
              ? "border-l-emerald-500"
              : "border-l-yellow-500"
          }
          footer={
            <>
              <p
                className={`text-xs ${INDICE_SOLVENCIA >= 100 ? "text-emerald-600" : "text-yellow-700"}`}
              >
                {INDICE_SOLVENCIA >= 100
                  ? "Cobertura dentro do limite"
                  : "Cobertura abaixo do mínimo recomendado"}
              </p>
              <p className="text-xs text-muted-foreground">
                Grau de cobertura das obrigações futuras
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
                acima da meta
              </p>
              <p className="text-xs text-muted-foreground">
                Desempenho acumulado em 12 meses
              </p>
            </>
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProjecaoAtuarialChart />
        <EvoluacaoSolvencia />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DemonstrativoAtuarial />
        <div className="space-y-6">
          <IndiceSolvencia />
          <RentabilidadeMeta />
        </div>
      </div>

      <RiscoAtuarialCard />

      <VariaveisAtuariais />
    </div>
  );
}
