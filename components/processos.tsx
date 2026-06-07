"use client";

import * as React from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
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
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CourtLawIcon,
  FileValidationIcon,
  Clock01Icon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  ChartLineData02Icon,
  PieChart02Icon,
  Target01Icon,
  UserMultipleIcon,
  Calendar01Icon,
  FilterIcon,
  RefreshIcon,
  Building01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { KpiCard } from "@/components/ui/kpi-card";
import { cn } from "@/lib/utils";

const formatNumber = (num: number) => num.toLocaleString("pt-BR");
const formatPercent = (num: number) => `${num.toFixed(1)}%`;

const tiposProcesso = [
  { tipo: "Alvará de Funcionamento", area: "Urbanismo", sla: 15, qtd: 45 },
  { tipo: "Habite-se", area: "Urbanismo", sla: 30, qtd: 23 },
  { tipo: "Pedido LAI/e-SIC", area: "Controle Interno", sla: 20, qtd: 67 },
  { tipo: "Ouvidoria - Reclamação", area: "Gabinete", sla: 10, qtd: 89 },
  { tipo: "Certidão Negativa", area: "Tributação", sla: 5, qtd: 134 },
  { tipo: "Parcelamento Tributário", area: "Tributação", sla: 15, qtd: 56 },
  { tipo: "Solicitação RH - Férias", area: "RH", sla: 7, qtd: 78 },
  { tipo: "Admissão/Posse", area: "RH", sla: 30, qtd: 12 },
  { tipo: "PAD/Sindicância", area: "RH", sla: 60, qtd: 3 },
  { tipo: "Parecer Jurídico", area: "Procuradoria", sla: 10, qtd: 45 },
  { tipo: "Minuta Contratual", area: "Procuradoria", sla: 15, qtd: 28 },
  { tipo: "Requisição Compras", area: "Compras", sla: 10, qtd: 98 },
  { tipo: "Termo de Referência", area: "Compras", sla: 20, qtd: 34 },
  { tipo: "Aditivo Contratual", area: "Contratos", sla: 15, qtd: 41 },
  { tipo: "Prestação Contas Convênio", area: "Contratos", sla: 30, qtd: 19 },
  {
    tipo: "Abertura Crédito Adicional",
    area: "Contabilidade",
    sla: 20,
    qtd: 8,
  },
  { tipo: "Licença Ambiental", area: "Meio Ambiente", sla: 45, qtd: 15 },
  { tipo: "Auto de Infração", area: "Fiscalização", sla: 30, qtd: 27 },
  { tipo: "Baixa Patrimonial", area: "Patrimônio", sla: 15, qtd: 22 },
  { tipo: "Auditoria Interna", area: "Controle Interno", sla: 60, qtd: 5 },
];

const kpiData = {
  solicitacoesAbertas: 892,
  variacaoSolicitacoes: 8.3,
  processosEmTramitacao: 456,
  dentroDoPrazo: 78.4,
  atrasados: 98,
  tempoMedioAtraso: 12,
  tempoMedioConclusao: 8.5,
};

const entradasVsConclusoes = [
  { mes: "Jan", entradas: 245, conclusoes: 198 },
  { mes: "Fev", entradas: 289, conclusoes: 267 },
  { mes: "Mar", entradas: 312, conclusoes: 289 },
  { mes: "Abr", entradas: 298, conclusoes: 301 },
  { mes: "Mai", entradas: 334, conclusoes: 318 },
  { mes: "Jun", entradas: 356, conclusoes: 342 },
  { mes: "Jul", entradas: 378, conclusoes: 365 },
  { mes: "Ago", entradas: 401, conclusoes: 389 },
  { mes: "Set", entradas: 423, conclusoes: 412 },
  { mes: "Out", entradas: 445, conclusoes: 438 },
  { mes: "Nov", entradas: 467, conclusoes: 451 },
  { mes: "Dez", entradas: 489, conclusoes: 476 },
];

const backlogPorStatus = [
  { status: "Aberto", quantidade: 156 },
  { status: "Em Análise", quantidade: 189 },
  { status: "Pendência", quantidade: 67 },
  { status: "Encaminhado", quantidade: 44 },
];

const tempoMedioPorTipo = [
  { tipo: "Certidão", dias: 2.3 },
  { tipo: "Alvará", dias: 12.5 },
  { tipo: "Habite-se", dias: 18.7 },
  { tipo: "LAI/e-SIC", dias: 15.2 },
  { tipo: "Parecer Jurídico", dias: 8.9 },
  { tipo: "Ouvidoria", dias: 6.4 },
];

const distribuicaoPorArea = [
  { area: "Urbanismo", quantidade: 98, percentual: 21.5 },
  { area: "Tributação", quantidade: 134, percentual: 29.4 },
  { area: "RH", quantidade: 93, percentual: 20.4 },
  { area: "Procuradoria", quantidade: 73, percentual: 16.0 },
  { area: "Outros", quantidade: 58, percentual: 12.7 },
];

const movimentacoesRecentes = [
  {
    data: "15/12/2024",
    hora: "14:30",
    protocolo: "2024/12345",
    tipo: "Alvará de Funcionamento",
    origem: "Protocolo",
    destino: "Urbanismo",
    acao: "Encaminhado",
    responsavel: "Maria Silva",
    prazo: "30/12/2024",
    statusPrazo: "no-prazo",
  },
  {
    data: "15/12/2024",
    hora: "13:15",
    protocolo: "2024/12344",
    tipo: "Pedido LAI",
    origem: "e-SIC",
    destino: "Controle Interno",
    acao: "Criado",
    responsavel: "Sistema",
    prazo: "04/01/2025",
    statusPrazo: "no-prazo",
  },
  {
    data: "15/12/2024",
    hora: "11:45",
    protocolo: "2024/12343",
    tipo: "Parecer Jurídico",
    origem: "Compras",
    destino: "Procuradoria",
    acao: "Solicitado",
    responsavel: "João Santos",
    prazo: "20/12/2024",
    statusPrazo: "atencao",
  },
  {
    data: "15/12/2024",
    hora: "10:20",
    protocolo: "2024/12342",
    tipo: "Certidão Negativa",
    origem: "Tributação",
    destino: "Arquivo",
    acao: "Deferido",
    responsavel: "Ana Costa",
    prazo: "16/12/2024",
    statusPrazo: "concluido",
  },
  {
    data: "14/12/2024",
    hora: "16:50",
    protocolo: "2024/12341",
    tipo: "Habite-se",
    origem: "Urbanismo",
    destino: "Requerente",
    acao: "Pendência Documental",
    responsavel: "Carlos Mendes",
    prazo: "10/12/2024",
    statusPrazo: "atrasado",
  },
  {
    data: "14/12/2024",
    hora: "15:30",
    protocolo: "2024/12340",
    tipo: "Aditivo Contratual",
    origem: "Secretaria Saúde",
    destino: "Procuradoria",
    acao: "Em Análise",
    responsavel: "Paula Oliveira",
    prazo: "28/12/2024",
    statusPrazo: "no-prazo",
  },
];

const eventosRecentes = [
  {
    data: "15/12/2024",
    hora: "14:30",
    descricao: "Alvará 2024/12345 encaminhado para Urbanismo",
    tipo: "encaminhado",
  },
  {
    data: "15/12/2024",
    hora: "13:15",
    descricao: "Pedido LAI 2024/12344 criado via e-SIC",
    tipo: "criado",
  },
  {
    data: "15/12/2024",
    hora: "11:45",
    descricao: "Parecer Jurídico 2024/12343 solicitado por Compras",
    tipo: "pendencia",
  },
  {
    data: "15/12/2024",
    hora: "10:20",
    descricao: "Certidão Negativa 2024/12342 deferida",
    tipo: "concluido",
  },
  {
    data: "14/12/2024",
    hora: "16:50",
    descricao: "Habite-se 2024/12341 com pendência documental (ATRASADO)",
    tipo: "atrasado",
  },
  {
    data: "14/12/2024",
    hora: "15:30",
    descricao: "Aditivo 2024/12340 em análise na Procuradoria",
    tipo: "analise",
  },
];

const backlogPorArea = [
  { area: "Tributação", abertos: 89, emAnalise: 45, total: 134 },
  { area: "Urbanismo", abertos: 56, emAnalise: 42, total: 98 },
  { area: "RH", abertos: 48, emAnalise: 45, total: 93 },
  { area: "Procuradoria", abertos: 38, emAnalise: 35, total: 73 },
  { area: "Controle Interno", abertos: 42, emAnalise: 30, total: 72 },
];

const chartConfig = {
  entradas: { label: "Entradas", color: "var(--chart-1)" },
  conclusoes: { label: "Conclusões", color: "var(--chart-2)" },
  quantidade: { label: "Quantidade", color: "var(--chart-1)" },
  dias: { label: "Dias", color: "var(--chart-1)" },
} satisfies ChartConfig;

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function Processos() {
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024");
  const [areaSelecionada, setAreaSelecionada] = React.useState("todas");
  const [tipoSelecionado, setTipoSelecionado] = React.useState("todos");

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Gestão de Processos
          </h2>
          <p className="text-muted-foreground">
            Controle de solicitações e processos administrativos municipais
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select
            value={periodoSelecionado}
            onValueChange={setPeriodoSelecionado}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Select value={areaSelecionada} onValueChange={setAreaSelecionada}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as Áreas</SelectItem>
              <SelectItem value="urbanismo">Urbanismo</SelectItem>
              <SelectItem value="tributacao">Tributação</SelectItem>
              <SelectItem value="rh">RH</SelectItem>
              <SelectItem value="procuradoria">Procuradoria</SelectItem>
              <SelectItem value="controle">Controle Interno</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="size-8">
            <HugeiconsIcon
              icon={FilterIcon}
              strokeWidth={2}
              className="size-4"
            />
          </Button>
          <Button variant="outline" size="icon" className="size-8">
            <HugeiconsIcon
              icon={RefreshIcon}
              strokeWidth={2}
              className="size-4"
            />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Solicitações Abertas (Mês)"
          icon={FileValidationIcon}
          value={formatNumber(kpiData.solicitacoesAbertas)}
          borderColor="border-l-green-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-green-600"
              />
              <span className="text-green-600">
                +{formatPercent(kpiData.variacaoSolicitacoes)}
              </span>
              <span>vs mês anterior</span>
            </div>
          }
        />
        <KpiCard
          title="Processos em Tramitação"
          icon={CourtLawIcon}
          value={formatNumber(kpiData.processosEmTramitacao)}
          borderColor="border-l-blue-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Estoque atual em andamento
            </p>
          }
        />
        <KpiCard
          title="Dentro do SLA"
          icon={CheckmarkCircle02Icon}
          value={formatPercent(kpiData.dentroDoPrazo)}
          borderColor="border-l-green-500"
          footer={
            <div className="flex items-center gap-2">
              <Progress value={kpiData.dentroDoPrazo} className="h-2 flex-1" />
              <span className="text-xs font-medium">
                {formatPercent(kpiData.dentroDoPrazo)}
              </span>
            </div>
          }
        />
        <KpiCard
          title="Atrasados"
          icon={Alert02Icon}
          value={formatNumber(kpiData.atrasados)}
          borderColor="border-l-red-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Média {kpiData.tempoMedioAtraso} dias em atraso
            </p>
          }
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Tempo Médio de Conclusão"
          icon={Clock01Icon}
          value={`${kpiData.tempoMedioConclusao} dias`}
          borderColor="border-l-purple-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                strokeWidth={2}
                className="size-3 text-green-600"
              />
              <span className="text-green-600">-12%</span>
              <span>vs período anterior</span>
            </div>
          }
        />
        <KpiCard
          title="Taxa de Conversão"
          icon={Target01Icon}
          value="34.2%"
          borderColor="border-l-amber-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Solicitação → Processo
            </p>
          }
        />
        <KpiCard
          title="Produtividade (Mês)"
          icon={UserMultipleIcon}
          value="23.4"
          borderColor="border-l-blue-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Processos concluídos/servidor
            </p>
          }
        />
        <KpiCard
          title="Reaberturas"
          icon={InformationCircleIcon}
          value="18"
          borderColor="border-l-amber-500"
          footer={
            <p className="text-xs text-muted-foreground">
              2.0% de retrabalho no período
            </p>
          }
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Entradas vs Conclusões
            </CardTitle>
            <CardDescription>
              Evolução mensal de processos abertos e concluídos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={entradasVsConclusoes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="mes"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="entradas"
                  stroke="var(--chart-1)"
                  fill="var(--chart-1)"
                  fillOpacity={0.3}
                  name="Entradas"
                />
                <Area
                  type="monotone"
                  dataKey="conclusoes"
                  stroke="var(--chart-2)"
                  fill="var(--chart-2)"
                  fillOpacity={0.3}
                  name="Conclusões"
                />
              </AreaChart>
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
              Backlog por Status
            </CardTitle>
            <CardDescription>
              Distribuição atual dos processos em tramitação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={backlogPorStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="status"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="quantidade"
                  fill="var(--chart-1)"
                  radius={[4, 4, 0, 0]}
                  name="Quantidade"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Clock01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Tempo Médio por Tipo
            </CardTitle>
            <CardDescription>
              Tempo médio de conclusão em dias úteis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={tempoMedioPorTipo} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                  dataKey="tipo"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={100}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="dias"
                  fill="var(--chart-1)"
                  radius={[0, 4, 4, 0]}
                  name="Dias"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={PieChart02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Distribuição por Área
            </CardTitle>
            <CardDescription>
              Processos em tramitação por secretaria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <PieChart>
                <Pie
                  data={distribuicaoPorArea}
                  dataKey="quantidade"
                  nameKey="area"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {distribuicaoPorArea.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={FileValidationIcon}
                strokeWidth={2}
                className="size-5"
              />
              Movimentações Recentes
            </CardTitle>
            <CardDescription>
              Últimas ações registradas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Protocolo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movimentacoesRecentes.map((mov, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs">
                      {mov.data}
                      <br />
                      <span className="text-muted-foreground">{mov.hora}</span>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {mov.protocolo}
                    </TableCell>
                    <TableCell className="text-xs">{mov.tipo}</TableCell>
                    <TableCell className="text-xs">{mov.acao}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          mov.statusPrazo === "concluido"
                            ? "default"
                            : mov.statusPrazo === "atrasado"
                              ? "destructive"
                              : mov.statusPrazo === "atencao"
                                ? "outline"
                                : "secondary"
                        }
                        className={cn(
                          "text-xs",
                          mov.statusPrazo === "concluido" &&
                            "bg-green-500 hover:bg-green-600",
                          mov.statusPrazo === "atencao" &&
                            "border-amber-500 text-amber-600",
                        )}
                      >
                        {mov.statusPrazo === "concluido"
                          ? "Concluído"
                          : mov.statusPrazo === "atrasado"
                            ? "Atrasado"
                            : mov.statusPrazo === "atencao"
                              ? "Atenção"
                              : "No Prazo"}
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
                icon={Clock01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Eventos Recentes
            </CardTitle>
            <CardDescription>
              Timeline de movimentações no módulo
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
                        evento.tipo === "concluido"
                          ? "bg-green-500"
                          : evento.tipo === "encaminhado" ||
                              evento.tipo === "criado"
                            ? "bg-blue-500"
                            : evento.tipo === "analise"
                              ? "bg-blue-400"
                              : evento.tipo === "pendencia"
                                ? "bg-amber-500"
                                : "bg-red-500",
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
                          evento.tipo === "atrasado"
                            ? "destructive"
                            : "secondary"
                        }
                        className={cn(
                          "text-xs",
                          evento.tipo === "concluido" &&
                            "bg-green-500 hover:bg-green-600 text-white",
                        )}
                      >
                        {evento.tipo === "concluido"
                          ? "Concluído"
                          : evento.tipo === "atrasado"
                            ? "Atrasado"
                            : evento.tipo === "pendencia"
                              ? "Pendência"
                              : evento.tipo === "analise"
                                ? "Em Análise"
                                : "Movimentação"}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm">{evento.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Building01Icon}
              strokeWidth={2}
              className="size-5"
            />
            Backlog por Área
          </CardTitle>
          <CardDescription>
            Processos em andamento por secretaria e status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Área/Secretaria</TableHead>
                <TableHead className="text-right">Abertos</TableHead>
                <TableHead className="text-right">Em Análise</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">% do Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backlogPorArea.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.area}</TableCell>
                  <TableCell className="text-right">
                    {formatNumber(item.abertos)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(item.emAnalise)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatNumber(item.total)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPercent(
                      (item.total / kpiData.processosEmTramitacao) * 100,
                    )}
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
              icon={InformationCircleIcon}
              strokeWidth={2}
              className="size-5"
            />
            Tipos de Processos Controlados
          </CardTitle>
          <CardDescription>
            Catálogo de processos e solicitações gerenciados pelo sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Urbanismo",
              "Tributação",
              "RH",
              "Procuradoria",
              "Compras",
              "Contratos",
            ].map((area) => (
              <Card key={area} className="border-l-4 border-l-green-500">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">{area}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {tiposProcesso
                      .filter((t) => t.area === area)
                      .map((tipo, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>{tipo.tipo}</span>
                          <Badge variant="outline" className="text-xs">
                            {tipo.qtd}
                          </Badge>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
