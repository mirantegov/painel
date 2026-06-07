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
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BulbIcon } from "@hugeicons/core-free-icons";

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
  { tipo: "Abertura Crédito Adicional", area: "Contabilidade", sla: 20, qtd: 8 },
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

const alertasProcessos = [
  {
    tipo: "warning",
    titulo: "Processos atrasados acima da meta",
    descricao:
      "98 processos estão atrasados (21.5% do total em tramitação), superando a meta de 15%. É necessário revisar a alocação de recursos e priorizar processos críticos.",
    categoria: "SLA",
  },
  {
    tipo: "warning",
    titulo: "Habite-se com tempo médio elevado",
    descricao:
      "O tempo médio de conclusão de processos de Habite-se está em 18.7 dias, acima do SLA de 30 dias mas próximo do limite. Recomenda-se monitoramento próximo.",
    categoria: "URBANISMO",
  },
  {
    tipo: "info",
    titulo: "Aumento de solicitações LAI/e-SIC",
    descricao:
      "Houve aumento de 23% nas solicitações de acesso à informação (LAI/e-SIC) no último trimestre. Considere reforço na equipe de Controle Interno.",
    categoria: "TRANSPARÊNCIA",
  },
  {
    tipo: "success",
    titulo: "Taxa de conversão estável",
    descricao:
      "A taxa de conversão de Solicitação para Processo está em 34.2%, dentro da faixa esperada de 30-40%, indicando triagem adequada.",
    categoria: "GESTÃO",
  },
  {
    tipo: "info",
    titulo: "Backlog concentrado em Tributação",
    descricao:
      "A área de Tributação concentra 29.4% dos processos em tramitação. Avaliar necessidade de redistribuição de demandas ou reforço de equipe.",
    categoria: "RECURSOS",
  },
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
          <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
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
                            "border-amber-500 text-amber-600"
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
                                : "bg-red-500"
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
                          evento.tipo === "atrasado" ? "destructive" : "secondary"
                        }
                        className={cn(
                          "text-xs",
                          evento.tipo === "concluido" &&
                            "bg-green-500 hover:bg-green-600 text-white"
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
                    {formatPercent((item.total / kpiData.processosEmTramitacao) * 100)}
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

      {/* ======================================================= */}
      {/* SEPARADOR ANÁLISES                                       */}
      {/* ======================================================= */}
      <div className="relative py-4">
        <Separator />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-muted px-4 dark:bg-background">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Análises
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Resumo Analítico */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Target01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Resumo Analítico
            </CardTitle>
            <CardDescription>
              Indicadores consolidados da gestão de processos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Conformidade SLA
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-600">
                    {formatPercent(kpiData.dentroDoPrazo)}
                  </span>
                  <Badge variant="secondary" className="text-xs bg-green-600">
                    <HugeiconsIcon
                      icon={ArrowUp01Icon}
                      strokeWidth={2}
                      className="size-3"
                    />
                    +3.2%
                  </Badge>
                </div>
                <Progress value={kpiData.dentroDoPrazo} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Meta: 85% | Atual: {formatPercent(kpiData.dentroDoPrazo)}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Tempo Médio Conclusão
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-600">
                    {kpiData.tempoMedioConclusao}d
                  </span>
                </div>
                <Progress
                  value={(kpiData.tempoMedioConclusao / 15) * 100}
                  className="h-2 [&>div]:bg-green-500"
                />
                <p className="text-xs text-muted-foreground">
                  Meta: 10 dias | Atual: {kpiData.tempoMedioConclusao} dias
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Produtividade
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">23.4</span>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Processos concluídos/servidor/mês
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Taxa de Retrabalho
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-600">2.0%</span>
                </div>
                <Progress value={8} className="h-2 [&>div]:bg-green-500" />
                <p className="text-xs text-muted-foreground">
                  18 reaberturas — meta: &lt;5%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Análise Inteligente */}
        <Card className="border-l-4 border-l-primary bg-gradient-to-br from-primary/5 via-background to-background">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <HugeiconsIcon
                  icon={BulbIcon}
                  strokeWidth={2}
                  className="size-5 text-primary"
                />
              </div>
              <div>
                <CardTitle>Análise Inteligente de Processos</CardTitle>
                <CardDescription>
                  Insights sobre a gestão de processos e solicitações municipais
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Visão Geral */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-foreground leading-relaxed">
                A análise da gestão de processos do município no exercício de{" "}
                {periodoSelecionado} demonstra
                <strong> desempenho satisfatório</strong> com{" "}
                <strong>{formatPercent(kpiData.dentroDoPrazo)}</strong> dos
                processos dentro do SLA, próximo à meta de 85%. O tempo médio de
                conclusão de <strong>{kpiData.tempoMedioConclusao} dias</strong>{" "}
                está abaixo da meta de 10 dias, indicando eficiência operacional.
                Foram abertas <strong>{formatNumber(kpiData.solicitacoesAbertas)}</strong>{" "}
                solicitações no mês, com{" "}
                <strong>{formatNumber(kpiData.processosEmTramitacao)}</strong>{" "}
                processos em tramitação. A área de Tributação concentra a maior
                parte das demandas (29.4%), seguida por Urbanismo (21.5%).
              </p>
            </div>

            <Separator />

            {/* Acordeão de Análises */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="sla">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Clock01Icon}
                      strokeWidth={2}
                      className="size-4 text-green-600"
                    />
                    <span>Análise de Prazos e SLA</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-6">
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-green-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Conformidade próxima à meta:
                        </strong>{" "}
                        A taxa de {formatPercent(kpiData.dentroDoPrazo)} de
                        processos dentro do SLA está próxima da meta de 85%,
                        demonstrando boa gestão de prazos na maioria das áreas.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-amber-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Processos atrasados requerem atenção:
                        </strong>{" "}
                        {kpiData.atrasados} processos estão atrasados (21.5% do
                        total), com tempo médio de atraso de{" "}
                        {kpiData.tempoMedioAtraso} dias. É necessário priorizar
                        esses casos e revisar gargalos.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-green-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Tempo médio otimizado:
                        </strong>{" "}
                        O tempo médio de conclusão de{" "}
                        {kpiData.tempoMedioConclusao} dias está 15% abaixo da
                        meta, indicando eficiência nos processos mais simples
                        (certidões, pareceres rápidos).
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="areas">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Building01Icon}
                      strokeWidth={2}
                      className="size-4 text-blue-600"
                    />
                    <span>Análise por Área/Secretaria</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-6">
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={InformationCircleIcon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-blue-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Tributação concentra maior volume:
                        </strong>{" "}
                        A área de Tributação responde por 29.4% dos processos em
                        tramitação (134 processos), principalmente certidões e
                        parcelamentos. Considerar reforço de equipe ou automação.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={InformationCircleIcon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-blue-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Urbanismo com processos complexos:
                        </strong>{" "}
                        Urbanismo (21.5% do total) possui processos com maior
                        tempo médio (Habite-se: 18.7 dias, Alvará: 12.5 dias),
                        devido à complexidade técnica e vistorias necessárias.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-green-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          RH e Procuradoria com bom desempenho:
                        </strong>{" "}
                        As áreas de RH (20.4%) e Procuradoria (16.0%) mantêm
                        prazos médios adequados e baixo índice de retrabalho.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="transparencia">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={InformationCircleIcon}
                      strokeWidth={2}
                      className="size-4 text-purple-600"
                    />
                    <span>Transparência e Controle</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-6">
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={ArrowUp01Icon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-amber-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Aumento de pedidos LAI/e-SIC:
                        </strong>{" "}
                        Houve crescimento de 23% nas solicitações de acesso à
                        informação no último trimestre (67 processos ativos),
                        refletindo maior engajamento da sociedade.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-green-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Ouvidoria com alta demanda:
                        </strong>{" "}
                        89 processos de Ouvidoria (reclamações/denúncias) estão
                        em andamento, com tempo médio de resposta de 6.4 dias,
                        dentro do SLA de 10 dias.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={InformationCircleIcon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-blue-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Controle Interno ativo:
                        </strong>{" "}
                        5 auditorias internas em andamento (SLA de 60 dias),
                        demonstrando atuação preventiva e de conformidade.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="recomendacoes">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={BulbIcon}
                      strokeWidth={2}
                      className="size-4 text-amber-600"
                    />
                    <span>Recomendações Estratégicas</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-6">
                    <div className="rounded-lg border bg-amber-50/50 dark:bg-amber-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        1. Priorizar processos atrasados
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Criar força-tarefa para reduzir o estoque de{" "}
                        {kpiData.atrasados} processos atrasados, priorizando
                        aqueles com maior impacto social (Habite-se, alvarás,
                        certidões).
                      </p>
                    </div>
                    <div className="rounded-lg border bg-amber-50/50 dark:bg-amber-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        2. Redistribuir demandas de Tributação
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Avaliar automação de certidões negativas e parcelamentos
                        simples, liberando equipe para processos mais complexos.
                        Considerar portal de autoatendimento.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-green-50/50 dark:bg-green-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        3. Reforçar equipe de Controle Interno
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Diante do aumento de 23% em pedidos LAI/e-SIC, alocar
                        mais recursos para garantir atendimento dentro do prazo
                        legal de 20 dias.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-green-50/50 dark:bg-green-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        4. Implementar sistema de alertas
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Criar notificações automáticas para processos próximos do
                        vencimento do SLA (5 dias antes), permitindo ação
                        preventiva e reduzindo atrasos.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="projecoes">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={ChartLineData02Icon}
                      strokeWidth={2}
                      className="size-4 text-purple-600"
                    />
                    <span>Projeções para o Próximo Período</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-6">
                    <p className="text-sm text-muted-foreground">
                      Com base na tendência histórica e no desempenho atual,
                      projeta-se para o próximo trimestre:
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-2xl font-bold text-green-600">
                          2.850
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Otimista
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Solicitações/mês
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 text-center bg-primary/5">
                        <p className="text-2xl font-bold text-primary">2.680</p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Provável
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Solicitações/mês
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-2xl font-bold text-amber-600">
                          2.400
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Conservador
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Solicitações/mês
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      * Projeções consideram sazonalidade e tendência de
                      crescimento de 8.3% ao mês.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator />

            {/* Conclusão */}
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex gap-3">
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  strokeWidth={2}
                  className="size-5 text-primary shrink-0 mt-0.5"
                />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Conclusão da Análise
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A gestão de processos municipais apresenta desempenho
                    satisfatório, com {formatPercent(kpiData.dentroDoPrazo)} de
                    conformidade ao SLA e tempo médio de conclusão de{" "}
                    {kpiData.tempoMedioConclusao} dias. Os pontos de atenção
                    identificados referem-se aos {kpiData.atrasados} processos
                    atrasados e à concentração de demandas em Tributação (29.4%).
                    Com as ações recomendadas — priorização de atrasados,
                    automação de processos simples e reforço em áreas críticas —
                    o município tem condições de elevar a conformidade para 85% e
                    reduzir o tempo médio para 7 dias, garantindo melhor
                    atendimento ao cidadão e maior eficiência administrativa.
                  </p>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Análise gerada em {new Date().toLocaleDateString("pt-BR")} às{" "}
                    {new Date().toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    | Dados referentes ao período de {periodoSelecionado}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alertas e Notificações */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            Alertas e Notificações
          </h3>
          {alertasProcessos.map((alerta, index) => (
            <Alert
              key={index}
              variant={alerta.tipo === "warning" ? "destructive" : "default"}
            >
              <HugeiconsIcon
                icon={
                  alerta.tipo === "warning"
                    ? Alert02Icon
                    : alerta.tipo === "success"
                      ? CheckmarkCircle02Icon
                      : InformationCircleIcon
                }
                strokeWidth={2}
                className="size-4"
              />
              <AlertTitle className="flex items-center gap-2">
                {alerta.titulo}
                <Badge variant="outline" className="text-xs">
                  {alerta.categoria}
                </Badge>
              </AlertTitle>
              <AlertDescription>{alerta.descricao}</AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
    </div>
  );
}
