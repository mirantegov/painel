"use client";

import * as React from "react";
import { fmtBRL } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Cell,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp01Icon,
  ArrowDown01Icon,
  ConstructionIcon,
  Calendar01Icon,
  Building04Icon,
  FilterIcon,
  Download01Icon,
  RefreshIcon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  Target01Icon,
  ChartLineData02Icon,
  PieChart02Icon,
  Clock01Icon,
  Flag01Icon,
  CoinsDollarIcon,
  MoneySend01Icon,
  FileValidationIcon,
  SecurityCheckIcon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useSnapshot } from "@/components/use-snapshot";
import { OBRAS_SNAPSHOT } from "@/lib/demo-obras";
import { KpiCard } from "@/components/ui/kpi-card";

// Formatadores
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

const formatPercent = (value: number) => `${value.toFixed(1)}%`;

// ── Dados mock ──────────────────────────────────────────────────────────────

type StatusObra =
  | "em_andamento"
  | "concluida"
  | "paralisada"
  | "nao_iniciada"
  | "atrasada";

type Obra = {
  id: string;
  nome: string;
  tipo: string;
  secretaria: string;
  construtora: string;
  contrato: string;
  valorContratado: number;
  valorMedido: number;
  valorPago: number;
  execucaoFisica: number;
  execucaoFinanceira: number;
  prazoInicial: string;
  prazoAtual: string;
  status: StatusObra;
  fonte: string;
  bairro: string;
  aditivos: number;
};

// Status helpers
function statusLabel(s: StatusObra) {
  const map: Record<StatusObra, string> = {
    em_andamento: "Em Andamento",
    concluida: "Concluída",
    paralisada: "Paralisada",
    nao_iniciada: "Não Iniciada",
    atrasada: "Atrasada",
  };
  return map[s];
}

function statusVariant(s: StatusObra) {
  const map: Record<StatusObra, "secondary" | "outline" | "destructive"> = {
    em_andamento: "secondary",
    concluida: "secondary",
    paralisada: "destructive",
    nao_iniciada: "outline",
    atrasada: "destructive",
  };
  return map[s];
}

function statusColor(s: StatusObra) {
  const map: Record<StatusObra, string> = {
    em_andamento: "text-blue-600",
    concluida: "text-green-600",
    paralisada: "text-red-600",
    nao_iniciada: "text-muted-foreground",
    atrasada: "text-amber-600",
  };
  return map[s];
}

// ── Componente ──────────────────────────────────────────────────────────────

export function Obras() {
  const {
    obras,
    totalContratado,
    totalMedido,
    totalPago,
    obrasAndamento,
    obrasConcluidas,
    obrasParalisadas,
    obrasAtrasadas,
    obrasNaoIniciadas,
    execucaoFisicaMedia,
    obrasPorTipo,
    chartConfigTipo,
    obrasPorStatus,
    chartConfigStatus,
    execucaoMensal,
    chartConfigExecucao,
    medicoes,
    aditivos,
    fiscalizacoes,
    obrasPorFonte,
    chartConfigFonte,
    metasObras,
    eventosRecentes,
    rankingConstrutoras,
  } = useSnapshot("obras", OBRAS_SNAPSHOT);
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024");
  const [abaSelecionada, setAbaSelecionada] = React.useState("portfolio");

  return (
    <div className="space-y-8">
      {/* KPIs Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total de Obras"
          icon={ConstructionIcon}
          value={`${obras.length} obras`}
          borderColor="border-l-blue-500"
          footer={
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-xs text-green-600">
                {obrasConcluidas} concluídas
              </Badge>
              <Badge variant="outline" className="text-xs">
                {obrasAndamento} em andamento
              </Badge>
            </div>
          }
        />
        <KpiCard
          title="Valor Total Contratado"
          icon={CoinsDollarIcon}
          value={fmtBRL(totalContratado)}
          borderColor="border-l-green-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Pago:</span>
              <span className="font-medium">{formatCurrency(totalPago)}</span>
              <span>({((totalPago / totalContratado) * 100).toFixed(1)}%)</span>
            </div>
          }
        />
        <KpiCard
          title="Execução Física Média"
          icon={Target01Icon}
          value={formatPercent(execucaoFisicaMedia)}
          borderColor="border-l-amber-500"
          footer={
            <div className="w-full space-y-1">
              <Progress value={execucaoFisicaMedia} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Obras ativas (excl. não iniciadas)
              </p>
            </div>
          }
        />
        <KpiCard
          title="Obras em Alerta"
          icon={AlertCircleIcon}
          value={`${obrasAtrasadas + obrasParalisadas}`}
          valueClassName="text-red-600"
          borderColor="border-l-red-500"
          footer={
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="destructive" className="text-xs">
                {obrasAtrasadas} atrasadas
              </Badge>
              <Badge variant="destructive" className="text-xs">
                {obrasParalisadas} paralisadas
              </Badge>
            </div>
          }
        />
      </div>

      {/* Curva S — Execução acumulada */}
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
                Curva S — Execução Acumulada
              </CardTitle>
              <CardDescription>
                Avanço físico e financeiro consolidado de todas as obras
              </CardDescription>
            </div>
            <Badge variant="secondary">
              Físico:{" "}
              {formatPercent(
                execucaoMensal[execucaoMensal.length - 1].acumuladoFisico,
              )}{" "}
              | Financeiro:{" "}
              {formatPercent(
                execucaoMensal[execucaoMensal.length - 1].acumuladoFinanceiro,
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfigExecucao}
            className="h-[300px] w-full"
          >
            <AreaChart data={execucaoMensal} margin={{ left: 0, right: 12 }}>
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
                domain={[0, 100]}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => `${Number(value).toFixed(1)}%`}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="acumuladoFisico"
                fill="var(--color-acumuladoFisico)"
                fillOpacity={0.3}
                stroke="var(--color-acumuladoFisico)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="acumuladoFinanceiro"
                fill="var(--color-acumuladoFinanceiro)"
                fillOpacity={0.15}
                stroke="var(--color-acumuladoFinanceiro)"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Metas de Gestão de Obras */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Target01Icon}
              strokeWidth={2}
              className="size-5"
            />
            Metas de Gestão de Obras
          </CardTitle>
          <CardDescription>
            Acompanhamento dos indicadores de desempenho
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metasObras.map((meta, index) => (
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
                      Meta: {`${meta.meta}${meta.unidade}`}
                    </span>
                    <span className="font-medium">
                      {meta.status === "atingido" ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <HugeiconsIcon
                            icon={CheckmarkCircle02Icon}
                            strokeWidth={2}
                            className="size-3"
                          />
                          {`${meta.realizado}${meta.unidade}`}
                        </span>
                      ) : (
                        <span className="text-amber-600">
                          {`${meta.realizado}${meta.unidade}`}
                        </span>
                      )}
                    </span>
                  </div>
                  <Progress
                    value={Math.min((meta.realizado / meta.meta) * 100, 100)}
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
          <TabsTrigger value="portfolio" className="text-xs">
            Portfólio
          </TabsTrigger>
          <TabsTrigger value="medicoes" className="text-xs">
            Medições
          </TabsTrigger>
          <TabsTrigger value="aditivos" className="text-xs">
            Aditivos
          </TabsTrigger>
          <TabsTrigger value="fiscalizacao" className="text-xs">
            Fiscalização
          </TabsTrigger>
          <TabsTrigger value="construtoras" className="text-xs">
            Construtoras
          </TabsTrigger>
        </TabsList>

        {/* Portfólio de Obras */}
        <TabsContent value="portfolio" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={ConstructionIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Portfólio de Obras
              </CardTitle>
              <CardDescription>
                Cadastro e situação de todas as obras do exercício
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Obra</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Construtora</TableHead>
                    <TableHead className="text-right">Contratado</TableHead>
                    <TableHead className="text-center">Físico</TableHead>
                    <TableHead className="text-center">Financeiro</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {obras.map((obra) => (
                    <TableRow key={obra.id}>
                      <TableCell className="font-mono text-xs">
                        {obra.id}
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <p className="font-medium truncate">{obra.nome}</p>
                        <p className="text-xs text-muted-foreground">
                          {obra.bairro} — {obra.fonte}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{obra.tipo}</Badge>
                      </TableCell>
                      <TableCell className="text-sm max-w-[150px] truncate">
                        {obra.construtora}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(obra.valorContratado)}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <span className="text-sm font-medium">
                            {formatPercent(obra.execucaoFisica)}
                          </span>
                          <Progress
                            value={obra.execucaoFisica}
                            className="h-1.5"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <span className="text-sm font-medium">
                            {formatPercent(obra.execucaoFinanceira)}
                          </span>
                          <Progress
                            value={obra.execucaoFinanceira}
                            className="h-1.5"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {obra.prazoAtual}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={statusVariant(obra.status)}
                          className={statusColor(obra.status)}
                        >
                          {statusLabel(obra.status)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>
                      Total — {obras.length} obras
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totalContratado)}
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      {formatPercent(execucaoFisicaMedia)}
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      {formatPercent((totalPago / totalContratado) * 100)}
                    </TableCell>
                    <TableCell colSpan={2} />
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medições */}
        <TabsContent value="medicoes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={FileValidationIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Boletins de Medição
              </CardTitle>
              <CardDescription>
                Medições realizadas e status de aprovação
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Obra</TableHead>
                    <TableHead className="text-center">Nº</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead className="text-right">Valor Medido</TableHead>
                    <TableHead className="text-right">Acumulado</TableHead>
                    <TableHead className="text-center">Físico</TableHead>
                    <TableHead>Fiscal</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicoes.map((med, index) => (
                    <TableRow key={index}>
                      <TableCell className="max-w-[180px]">
                        <p className="font-medium truncate">{med.nomeObra}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {med.obra}
                        </p>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{med.medicao}ª</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{med.periodo}</TableCell>
                      <TableCell className="text-right font-semibold">
                        {med.valorMedido > 0
                          ? formatCurrency(med.valorMedido)
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(med.valorAcumulado)}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <span className="text-sm">
                            {formatPercent(med.percentualFisico)}
                          </span>
                          <Progress
                            value={med.percentualFisico}
                            className="h-1.5"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{med.fiscal}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            med.status === "aprovada"
                              ? "secondary"
                              : med.status === "em_analise"
                                ? "outline"
                                : "destructive"
                          }
                          className={
                            med.status === "aprovada"
                              ? "text-green-600"
                              : med.status === "em_analise"
                                ? "text-blue-600"
                                : med.status === "reprovada"
                                  ? "text-red-600"
                                  : "text-muted-foreground"
                          }
                        >
                          {med.status === "aprovada"
                            ? "Aprovada"
                            : med.status === "em_analise"
                              ? "Em Análise"
                              : med.status === "reprovada"
                                ? "Reprovada"
                                : "Paralisada"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aditivos */}
        <TabsContent value="aditivos" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Flag01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Termos Aditivos
              </CardTitle>
              <CardDescription>
                Aditivos de prazo e valor aos contratos de obra
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Obra</TableHead>
                    <TableHead className="text-center">Nº</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Justificativa</TableHead>
                    <TableHead className="text-center">Prazo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Aprovação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aditivos.map((ad, index) => (
                    <TableRow key={index}>
                      <TableCell className="max-w-[160px]">
                        <p className="font-medium truncate">{ad.nomeObra}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {ad.obra}
                        </p>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{ad.numero}º</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            ad.tipoAditivo === "Prazo"
                              ? "outline"
                              : ad.tipoAditivo === "Valor"
                                ? "secondary"
                                : "secondary"
                          }
                          className={
                            ad.tipoAditivo === "Valor"
                              ? "text-amber-600"
                              : ad.tipoAditivo === "Valor e Prazo"
                                ? "text-red-600"
                                : ""
                          }
                        >
                          {ad.tipoAditivo}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[220px] text-sm">
                        <p className="truncate">{ad.justificativa}</p>
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        {ad.diasAcrescidos > 0
                          ? `+${ad.diasAcrescidos} dias`
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {ad.valorAcrescido > 0
                          ? formatCurrency(ad.valorAcrescido)
                          : "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {ad.dataAprovacao}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>
                      Total — {aditivos.length} aditivos
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      +{aditivos.reduce((a, b) => a + b.diasAcrescidos, 0)} dias
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(
                        aditivos.reduce((a, b) => a + b.valorAcrescido, 0),
                      )}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fiscalização */}
        <TabsContent value="fiscalizacao" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={SecurityCheckIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Relatórios de Fiscalização
              </CardTitle>
              <CardDescription>
                Vistorias de campo e pareceres técnicos
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Obra</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Fiscal</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-center">Conf.</TableHead>
                    <TableHead className="text-center">Não Conf.</TableHead>
                    <TableHead>Parecer</TableHead>
                    <TableHead>Observação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fiscalizacoes.map((fisc, index) => (
                    <TableRow key={index}>
                      <TableCell className="max-w-[160px]">
                        <p className="font-medium truncate">{fisc.nomeObra}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {fisc.obra}
                        </p>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {fisc.data}
                      </TableCell>
                      <TableCell className="text-sm">{fisc.fiscal}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{fisc.tipo}</Badge>
                      </TableCell>
                      <TableCell className="text-center font-medium text-green-600">
                        {fisc.conformidades}
                      </TableCell>
                      <TableCell className="text-center font-medium text-red-600">
                        {fisc.naoConformidades}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            fisc.parecer === "conforme"
                              ? "secondary"
                              : fisc.parecer === "conforme_com_ressalvas"
                                ? "outline"
                                : "destructive"
                          }
                          className={
                            fisc.parecer === "conforme"
                              ? "text-green-600"
                              : fisc.parecer === "conforme_com_ressalvas"
                                ? "text-amber-600"
                                : "text-red-600"
                          }
                        >
                          {fisc.parecer === "conforme"
                            ? "Conforme"
                            : fisc.parecer === "conforme_com_ressalvas"
                              ? "Com Ressalvas"
                              : fisc.parecer === "nao_conforme"
                                ? "Não Conforme"
                                : "Paralisada"}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] text-xs text-muted-foreground">
                        <p className="truncate">{fisc.observacao}</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Construtoras */}
        <TabsContent value="construtoras" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Building04Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Ranking de Construtoras
              </CardTitle>
              <CardDescription>
                Desempenho das empresas contratadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rankingConstrutoras.map((emp, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Avatar size="sm">
                      <AvatarFallback className="text-xs">
                        {index + 1}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate max-w-[220px]">
                          {emp.nome}
                        </p>
                        <span className="text-sm font-semibold">
                          {formatCurrency(emp.valorTotal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{emp.cnpj}</span>
                        <div className="flex gap-1">
                          <Badge variant="outline" className="text-xs">
                            {emp.obrasAtivas} ativas
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {emp.aditivosTotal} aditivos
                          </Badge>
                          <Badge
                            variant={
                              emp.conformidade >= 90
                                ? "secondary"
                                : emp.conformidade >= 75
                                  ? "outline"
                                  : "destructive"
                            }
                            className={cn(
                              "text-xs",
                              emp.conformidade >= 90
                                ? "text-green-600"
                                : emp.conformidade >= 75
                                  ? "text-amber-600"
                                  : "text-red-600",
                            )}
                          >
                            {emp.conformidade}% conf.
                          </Badge>
                        </div>
                      </div>
                      <Progress value={emp.execucaoMedia} className="h-1.5" />
                      <p className="text-xs text-muted-foreground">
                        Execução média: {formatPercent(emp.execucaoMedia)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Gráficos lado a lado: Obras por Tipo (Pie) + Obras por Fonte (Bar) */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Obras por Tipo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={PieChart02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Obras por Tipo
            </CardTitle>
            <CardDescription>
              Distribuição por categoria de obra
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfigTipo}
              className="mx-auto aspect-square max-h-[280px]"
            >
              <PieChart>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name, entry) => {
                        const item = obrasPorTipo.find(
                          (t) => t.tipo === entry.payload.tipo,
                        );
                        return `${value} obra(s) — ${item ? formatCurrency(item.valor) : ""}`;
                      }}
                    />
                  }
                />
                <Pie
                  data={obrasPorTipo}
                  dataKey="quantidade"
                  nameKey="tipo"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={3}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                />
                <ChartLegend content={<ChartLegendContent nameKey="tipo" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Obras por Fonte de Recurso */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={CoinsDollarIcon}
                strokeWidth={2}
                className="size-5"
              />
              Valor por Fonte de Recurso
            </CardTitle>
            <CardDescription>
              Investimento por origem dos recursos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfigFonte}
              className="h-[280px] w-full"
            >
              <BarChart
                data={obrasPorFonte}
                layout="vertical"
                margin={{ left: 0, right: 12 }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="fonte"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
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
                  dataKey="valor"
                  fill="var(--chart-1)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Obras por Status (Pie) + Execução Física vs Financeira (Bar) */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Obras por Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={PieChart02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Situação das Obras
            </CardTitle>
            <CardDescription>Distribuição por status atual</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfigStatus}
              className="mx-auto aspect-square max-h-[280px]"
            >
              <PieChart>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `${value} obra(s)`}
                    />
                  }
                />
                <Pie
                  data={obrasPorStatus}
                  dataKey="quantidade"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={3}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                />
                <ChartLegend
                  content={<ChartLegendContent nameKey="status" />}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Execução Física vs Financeira por obra */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Execução Física × Financeira
            </CardTitle>
            <CardDescription>Comparativo por obra ativa</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  execucaoFisica: {
                    label: "Físico (%)",
                    color: "var(--chart-1)",
                  },
                  execucaoFinanceira: {
                    label: "Financeiro (%)",
                    color: "var(--chart-3)",
                  },
                } satisfies ChartConfig
              }
              className="h-[280px] w-full"
            >
              <BarChart
                data={obras
                  .filter((o) => o.status !== "nao_iniciada")
                  .map((o) => ({
                    nome: o.id,
                    execucaoFisica: o.execucaoFisica,
                    execucaoFinanceira: o.execucaoFinanceira,
                  }))}
                margin={{ left: 0, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="nome"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(v) => `${v}%`}
                  domain={[0, 100]}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `${Number(value).toFixed(1)}%`}
                    />
                  }
                />
                <Bar
                  dataKey="execucaoFisica"
                  fill="var(--color-execucaoFisica)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="execucaoFinanceira"
                  fill="var(--color-execucaoFinanceira)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Eventos Recentes — Timeline */}
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
          <CardDescription>
            Últimas movimentações no módulo de obras
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {eventosRecentes.map((evento, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "size-2.5 rounded-full",
                      evento.tipo === "fiscalizacao"
                        ? "bg-blue-500"
                        : evento.tipo === "medicao"
                          ? "bg-green-500"
                          : evento.tipo === "aditivo"
                            ? "bg-amber-500"
                            : evento.tipo === "alerta"
                              ? "bg-red-500"
                              : "bg-purple-500",
                    )}
                  />
                  {index < eventosRecentes.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {evento.data} — {evento.hora}
                    </p>
                    <Badge
                      variant={
                        evento.tipo === "alerta" ? "destructive" : "secondary"
                      }
                      className="text-xs"
                    >
                      {evento.tipo === "fiscalizacao"
                        ? "Fiscalização"
                        : evento.tipo === "medicao"
                          ? "Medição"
                          : evento.tipo === "aditivo"
                            ? "Aditivo"
                            : evento.tipo === "alerta"
                              ? "Alerta"
                              : "Ordem"}
                    </Badge>
                  </div>
                  <p className="text-sm">{evento.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
