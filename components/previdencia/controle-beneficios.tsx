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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  DATA_BENEFICIOS_ANALISE,
  formatCurrency,
} from "@/lib/demo-previdencia";
import {
  CheckmarkCircle02Icon,
  ClockIcon,
  Cancel01Icon,
  TrendingUp,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function StatusBadge({ status }: { status: string }) {
  const configs: Record<
    string,
    { color: string; bgColor: string; icon: React.ReactNode }
  > = {
    "Em Análise": {
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 border-yellow-200",
      icon: <HugeiconsIcon icon={ClockIcon} className="h-3 w-3 mr-1" />,
    },
    Deferido: {
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 border-emerald-200",
      icon: (
        <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-3 w-3 mr-1" />
      ),
    },
    Indeferido: {
      color: "text-red-600",
      bgColor: "bg-red-50 border-red-200",
      icon: <HugeiconsIcon icon={Cancel01Icon} className="h-3 w-3 mr-1" />,
    },
  };
  const config = configs[status] || configs["Em Análise"];
  return (
    <Badge className={`${config.bgColor} ${config.color} border`}>
      {config.icon}
      {status}
    </Badge>
  );
}

function BeneficiariosEmAnaliseTable() {
  const emAnalise = DATA_BENEFICIOS_ANALISE.filter(
    (b) => b.situacao === "Em Análise",
  );
  const deferidos = DATA_BENEFICIOS_ANALISE.filter(
    (b) => b.situacao === "Deferido",
  );
  const indeferidos = DATA_BENEFICIOS_ANALISE.filter(
    (b) => b.situacao === "Indeferido",
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Benefícios em Análise</CardTitle>
        <CardDescription>Requisições pendentes e recentes</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Dias</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DATA_BENEFICIOS_ANALISE.map((b) => (
              <TableRow key={b.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{b.tipo}</p>
                    <p className="text-xs text-muted-foreground">{b.subtipo}</p>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{b.nome}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(b.valor)}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {b.dataRequisicao}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${b.tempoAnalise > 20 ? "text-red-600" : b.tempoAnalise > 10 ? "text-yellow-600" : "text-emerald-600"}`}
                    >
                      {b.tempoAnalise}
                    </span>
                    {b.tempoAnalise > 20 && (
                      <Progress
                        value={100}
                        className="h-1 w-8 [&>div]:bg-red-500"
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={b.situacao} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ResumoAnalises() {
  const emAnalise = DATA_BENEFICIOS_ANALISE.filter(
    (b) => b.situacao === "Em Análise",
  ).length;
  const deferidos = DATA_BENEFICIOS_ANALISE.filter(
    (b) => b.situacao === "Deferido",
  ).length;
  const indeferidos = DATA_BENEFICIOS_ANALISE.filter(
    (b) => b.situacao === "Indeferido",
  ).length;
  const total = DATA_BENEFICIOS_ANALISE.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Resumo de Análises</CardTitle>
        <CardDescription>Status das requisições</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-yellow-50 border border-yellow-200">
            <div className="text-3xl font-bold text-yellow-600">
              {emAnalise}
            </div>
            <p className="text-sm text-yellow-700">Em Análise</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div className="text-3xl font-bold text-emerald-600">
              {deferidos}
            </div>
            <p className="text-sm text-emerald-700">Deferidos</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-red-50 border border-red-200">
            <div className="text-3xl font-bold text-red-600">{indeferidos}</div>
            <p className="text-sm text-red-700">Indeferidos</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Taxa de Aprovação</span>
            <span className="font-medium text-emerald-600">
              {((deferidos / total) * 100).toFixed(0)}%
            </span>
          </div>
          <Progress
            value={(deferidos / total) * 100}
            className="h-2 [&>div]:bg-emerald-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Taxa de Indeferimento</span>
            <span className="font-medium text-red-600">
              {((indeferidos / total) * 100).toFixed(0)}%
            </span>
          </div>
          <Progress
            value={(indeferidos / total) * 100}
            className="h-2 [&>div]:bg-red-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Em Análise</span>
            <span className="font-medium text-yellow-600">
              {((emAnalise / total) * 100).toFixed(0)}%
            </span>
          </div>
          <Progress
            value={(emAnalise / total) * 100}
            className="h-2 [&>div]:bg-yellow-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function TempoMedioAnalise() {
  const tempoMedio =
    DATA_BENEFICIOS_ANALISE.reduce((acc, b) => acc + b.tempoAnalise, 0) /
    DATA_BENEFICIOS_ANALISE.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tempo Médio de Análise</CardTitle>
        <CardDescription>Dias para conclusão</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6">
          <div className="text-5xl font-bold text-emerald-600">
            {tempoMedio.toFixed(0)}
          </div>
          <p className="text-muted-foreground mt-2">dias em média</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Meta</span>
            <span className="font-medium">15 dias</span>
          </div>
          <Progress
            value={(15 / tempoMedio) * 100}
            className="h-3 [&>div]:bg-emerald-500"
          />
        </div>
        <p className="text-xs text-center text-emerald-600 mt-2">
          Dentro do prazo legal
        </p>
      </CardContent>
    </Card>
  );
}

function TopBeneficosRecentes() {
  const recentes = DATA_BENEFICIOS_ANALISE.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Benefícios Recentes</CardTitle>
        <CardDescription>Últimas requisições</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentes.map((b, i) => (
            <div
              key={b.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{b.nome}</p>
                <p className="text-xs text-muted-foreground">
                  {b.tipo} - {b.subtipo}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">{formatCurrency(b.valor)}</p>
                <p className="text-xs text-muted-foreground">
                  {b.tempoAnalise} dias
                </p>
              </div>
              <StatusBadge status={b.situacao} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CriteriosIndeferimento() {
  const criterios = [
    { motivo: "Falta de documentação", quantidade: 45, pct: 38 },
    { motivo: "Não cumprimento de carência", quantidade: 28, pct: 24 },
    { motivo: "Incompatibilidade de dados", quantidade: 19, pct: 16 },
    { motivo: "Benefício já concedido", quantidade: 15, pct: 13 },
    { motivo: "Outros", quantidade: 11, pct: 9 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Principais Motivos de Indeferimento
        </CardTitle>
        <CardDescription>Análise de casos negados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {criterios.map(({ motivo, quantidade, pct }) => (
            <div key={motivo}>
              <div className="flex justify-between text-sm mb-1">
                <span>{motivo}</span>
                <span className="font-medium">
                  {quantidade} ({pct}%)
                </span>
              </div>
              <Progress value={pct} className="h-2 [&>div]:bg-red-400" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PainelOperacionalCard() {
  const emAnalise = DATA_BENEFICIOS_ANALISE.filter(
    (item) => item.situacao === "Em Análise",
  );
  const foraSla = emAnalise.filter((item) => item.tempoAnalise > 15).length;
  const maiorFila = [...emAnalise].sort(
    (a, b) => b.tempoAnalise - a.tempoAnalise,
  )[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Leitura Operacional</CardTitle>
        <CardDescription>
          Fila, prazo e criticidade das análises
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-sm font-medium text-emerald-800">
            Controle de SLA
          </p>
          <p className="text-sm text-emerald-700">
            {foraSla} processo(s) em análise já superam a meta operacional de 15
            dias, demandando reforço de conferência documental e despacho
            técnico.
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm font-medium">Maior espera atual</p>
          <p className="text-sm text-muted-foreground">
            {maiorFila
              ? `${maiorFila.nome} aguarda há ${maiorFila.tempoAnalise} dias na fila de ${maiorFila.tipo.toLowerCase()}.`
              : "Não há processos pendentes no momento."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function ControleBeneficios() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Controle de Benefícios
        </h2>
        <Badge variant="outline" className="ml-2">
          Requisições 2025
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Em Análise"
          value={DATA_BENEFICIOS_ANALISE.filter(
            (b) => b.situacao === "Em Análise",
          ).length.toString()}
          icon={ClockIcon}
          borderColor="border-l-amber-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Processos pendentes de análise técnica
            </p>
          }
        />
        <KpiCard
          title="Deferidos"
          value={DATA_BENEFICIOS_ANALISE.filter(
            (b) => b.situacao === "Deferido",
          ).length.toString()}
          icon={CheckmarkCircle02Icon}
          borderColor="border-l-emerald-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Concessões aprovadas no recorte recente
            </p>
          }
        />
        <KpiCard
          title="Indeferidos"
          value={DATA_BENEFICIOS_ANALISE.filter(
            (b) => b.situacao === "Indeferido",
          ).length.toString()}
          icon={Cancel01Icon}
          borderColor="border-l-red-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Requisições recusadas no período analisado
            </p>
          }
        />
        <KpiCard
          title="Valor Total"
          value={formatCurrency(
            DATA_BENEFICIOS_ANALISE.reduce((acc, b) => acc + b.valor, 0),
          )}
          icon={TrendingUp}
          borderColor="border-l-green-700"
          footer={
            <p className="text-xs text-muted-foreground">
              Valor potencial das solicitações em processamento
            </p>
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ResumoAnalises />
        <TempoMedioAnalise />
        <TopBeneficosRecentes />
      </div>

      <BeneficiariosEmAnaliseTable />

      <div className="grid gap-6 lg:grid-cols-2">
        <CriteriosIndeferimento />
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Prazos Legais</CardTitle>
            <CardDescription>Tempo máximo por tipo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <div>
                  <p className="font-medium text-sm">Aposentadoria</p>
                  <p className="text-xs text-muted-foreground">
                    Processo completo
                  </p>
                </div>
                <span className="font-bold text-emerald-600">30 dias</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <div>
                  <p className="font-medium text-sm">Pensão por Morte</p>
                  <p className="text-xs text-muted-foreground">Após óbito</p>
                </div>
                <span className="font-bold text-emerald-600">60 dias</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <div>
                  <p className="font-medium text-sm">Auxílio Doença</p>
                  <p className="text-xs text-muted-foreground">
                    Perícia médica
                  </p>
                </div>
                <span className="font-bold text-yellow-600">45 dias</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <div>
                  <p className="font-medium text-sm">Auxílio Maternidade</p>
                  <p className="text-xs text-muted-foreground">
                    Após nascimento
                  </p>
                </div>
                <span className="font-bold text-yellow-600">30 dias</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <PainelOperacionalCard />
    </div>
  );
}
