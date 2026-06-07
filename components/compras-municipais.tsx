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
  Cell,
  ResponsiveContainer,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingCart01Icon,
  ContactIcon,
  Alert02Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Building01Icon,
  Calendar01Icon,
  DollarCircleIcon,
  UserIcon,
  WaveIcon,
  Target01Icon,
  BulbIcon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  InformationCircleIcon,
  Flag01Icon,
  ChartLineData02Icon,
  PieChart02Icon,
  SecurityCheckIcon,
  UserMultipleIcon,
  Store04Icon,
  FilterIcon,
  Download01Icon,
  RefreshIcon,
  CoinsDollarIcon,
} from "@hugeicons/core-free-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { KpiCard } from "@/components/ui/kpi-card";

const chartConfig = {
  valor: {
    label: "Valor (R$)",
    color: "hsl(var(--chart-1))",
  },
  contratos: {
    label: "Contratos",
    color: "hsl(var(--chart-2))",
  },
  licitacoes: {
    label: "Licitações",
    color: "hsl(var(--chart-3))",
  },
  economia: {
    label: "Economia",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const chartConfigSecretarias = {
  contratos: {
    label: "Contratos",
    color: "#22c55e",
  },
  valor: {
    label: "Valor (R$)",
    color: "#16a34a",
  },
} satisfies ChartConfig;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// Dados simulados para demonstração
const kpiData = [
  {
    title: "Total Contratos Ativos",
    value: "1.247",
    change: "+12%",
    trend: "up",
    icon: ContactIcon,
    description: "Contratos vigentes este mês",
    borderClass: "border-l-4 border-l-blue-500",
  },
  {
    title: "Valor Total Contratado",
    value: "R$ 45.2M",
    change: "+8%",
    trend: "up",
    icon: CoinsDollarIcon,
    description: "Valor acumulado dos contratos",
    borderClass: "border-l-4 border-l-green-500",
  },
  {
    title: "Licitações em Andamento",
    value: "38",
    change: "-5%",
    trend: "down",
    icon: WaveIcon,
    description: "Processos licitatórios ativos",
    borderClass: "border-l-4 border-l-amber-500",
  },
  {
    title: "Economia Obtida",
    value: "R$ 3.8M",
    change: "+23%",
    trend: "up",
    icon: ArrowUp01Icon,
    description: "Economia sobre valor estimado",
    borderClass: "border-l-4 border-l-purple-500",
  },
];

const monthlyData = [
  {
    month: "Jan",
    licitacoes: 12,
    contratos: 8,
    valor: 2800000,
    economia: 120000,
  },
  {
    month: "Fev",
    licitacoes: 15,
    contratos: 12,
    valor: 3200000,
    economia: 180000,
  },
  {
    month: "Mar",
    licitacoes: 18,
    contratos: 14,
    valor: 4100000,
    economia: 220000,
  },
  {
    month: "Abr",
    licitacoes: 14,
    contratos: 10,
    valor: 3500000,
    economia: 150000,
  },
  {
    month: "Mai",
    licitacoes: 22,
    contratos: 16,
    valor: 5200000,
    economia: 380000,
  },
  {
    month: "Jun",
    licitacoes: 25,
    contratos: 18,
    valor: 5800000,
    economia: 420000,
  },
];

const secretariaData = [
  { name: "Saúde", contratos: 342, valor: 15600000, percent: 28 },
  { name: "Educação", contratos: 287, valor: 12300000, percent: 22 },
  { name: "Obras", contratos: 198, valor: 8900000, percent: 16 },
  { name: "Segurança", contratos: 156, valor: 6700000, percent: 12 },
  { name: "Transporte", contratos: 134, valor: 5400000, percent: 10 },
  { name: "Outros", contratos: 130, valor: 6300000, percent: 12 },
];

const modalidadeData = [
  { name: "Pregão Eletrônico", value: 45, color: "#0088FE" },
  { name: "Tomada de Preços", value: 25, color: "#00C49F" },
  { name: "Concorrência", value: 20, color: "#FFBB28" },
  { name: "Dispensa", value: 7, color: "#FF8042" },
  { name: "Inexigibilidade", value: 3, color: "#8884D8" },
];

const recentContracts = [
  {
    id: "CONT-2024-0147",
    secretaria: "Saúde",
    fornecedor: "MedEquipamentos S.A.",
    objeto: "Aparelhos de UTI",
    valor: 2450000,
    status: "ativo",
    dataInicio: "2024-01-15",
    dataFim: "2024-12-31",
    progress: 75,
  },
  {
    id: "CONT-2024-0146",
    secretaria: "Educação",
    fornecedor: "EduTech Ltda.",
    objeto: "Computadores para escolas",
    valor: 890000,
    status: "ativo",
    dataInicio: "2024-02-01",
    dataFim: "2024-11-30",
    progress: 60,
  },
  {
    id: "CONT-2024-0145",
    secretaria: "Obras",
    fornecedor: "ConstruCity S.A.",
    objeto: "Reforma de praças",
    valor: 3200000,
    status: "em-andamento",
    dataInicio: "2024-03-10",
    dataFim: "2024-10-15",
    progress: 45,
  },
  {
    id: "CONT-2024-0144",
    secretaria: "Transporte",
    fornecedor: "BusTransporte",
    objeto: "Manutenção de frota",
    valor: 1560000,
    status: "ativo",
    dataInicio: "2024-01-20",
    dataFim: "2024-12-20",
    progress: 80,
  },
];

const ongoingBids = [
  {
    id: "LIC-2024-0089",
    modalidade: "Pregão Eletrônico",
    objeto: "Material de escritório",
    valorEstimado: 450000,
    status: "aberto",
    dataAbertura: "2024-06-15",
    prazo: "15 dias",
    participantes: 12,
  },
  {
    id: "LIC-2024-0088",
    modalidade: "Concorrência",
    objeto: "Serviços de TI",
    valorEstimado: 2800000,
    status: "em-analise",
    dataAbertura: "2024-06-10",
    prazo: "30 dias",
    participantes: 8,
  },
  {
    id: "LIC-2024-0087",
    modalidade: "Tomada de Preços",
    objeto: "Equipamentos de segurança",
    valorEstimado: 1200000,
    status: "aberto",
    dataAbertura: "2024-06-12",
    prazo: "20 dias",
    participantes: 15,
  },
];

// Dados para Resumo Analítico e Análise Inteligente
const totaisCompras = {
  contratosAtivos: 1247,
  valorContratado: 45200000,
  valorEstimado: 49000000,
  economiaTotal: 3800000,
  licitacoesAndamento: 38,
  licitacoesConcluidas: 156,
  taxaEconomia: 8.4,
  contratosVencendo30Dias: 45,
  contratosVencidos: 12,
};

// Top fornecedores
const topFornecedores = [
  {
    nome: "MedEquipamentos S.A.",
    cnpj: "12.345.678/0001-90",
    valor: 4250000,
    contratos: 15,
    percentual: 9.4,
  },
  {
    nome: "ConstruCity S.A.",
    cnpj: "23.456.789/0001-01",
    valor: 3890000,
    contratos: 8,
    percentual: 8.6,
  },
  {
    nome: "EduTech Ltda.",
    cnpj: "34.567.890/0001-12",
    valor: 3120000,
    contratos: 22,
    percentual: 6.9,
  },
  {
    nome: "BusTransporte",
    cnpj: "45.678.901/0001-23",
    valor: 2780000,
    contratos: 5,
    percentual: 6.2,
  },
  {
    nome: "TecnoGov Ltda.",
    cnpj: "56.789.012/0001-34",
    valor: 2340000,
    contratos: 12,
    percentual: 5.2,
  },
];

// Alertas de gestão de compras
const alertasCompras = [
  {
    tipo: "warning",
    titulo: "Contratos próximos do vencimento",
    descricao:
      "45 contratos vencem nos próximos 30 dias, totalizando R$ 2.8M. Recomenda-se iniciar processos de renovação ou nova licitação.",
    categoria: "CONTRATOS",
  },
  {
    tipo: "info",
    titulo: "Concentração de fornecedores",
    descricao:
      "Os 5 principais fornecedores concentram 36.3% do valor contratado. Considere diversificar a base de fornecedores.",
    categoria: "FORNECEDORES",
  },
  {
    tipo: "success",
    titulo: "Economia acima da meta",
    descricao:
      "A taxa de economia de 8.4% supera a meta de 5% estabelecida, representando economia de R$ 3.8M para os cofres públicos.",
    categoria: "ECONOMIA",
  },
];

// Timeline de eventos
const eventosCompras = [
  {
    data: "15/06/2024",
    evento: "Homologação do Pregão 089 - Material de escritório",
    tipo: "homologacao",
    valor: 450000,
  },
  {
    data: "12/06/2024",
    evento: "Assinatura do Contrato CONT-2024-0147 - Equipamentos UTI",
    tipo: "contrato",
    valor: 2450000,
  },
  {
    data: "10/06/2024",
    evento: "Abertura da Concorrência 088 - Serviços de TI",
    tipo: "licitacao",
    valor: 2800000,
  },
  {
    data: "08/06/2024",
    evento: "Encerramento do Contrato CONT-2023-0098",
    tipo: "encerramento",
    valor: 0,
  },
  {
    data: "05/06/2024",
    evento: "Aditivo contratual - Manutenção de frota (+R$ 320K)",
    tipo: "aditivo",
    valor: 320000,
  },
];

// Comparativo anual
const comparativoAnual = [
  {
    ano: "2020",
    contratos: 892,
    valor: 32500000,
    economia: 1850000,
    taxaEconomia: 5.7,
  },
  {
    ano: "2021",
    contratos: 1024,
    valor: 36800000,
    economia: 2100000,
    taxaEconomia: 5.7,
  },
  {
    ano: "2022",
    contratos: 1156,
    valor: 40200000,
    economia: 2650000,
    taxaEconomia: 6.6,
  },
  {
    ano: "2023",
    contratos: 1289,
    valor: 43800000,
    economia: 3200000,
    taxaEconomia: 7.3,
  },
  {
    ano: "2024",
    contratos: 1247,
    valor: 45200000,
    economia: 3800000,
    taxaEconomia: 8.4,
  },
];

// Metas de compras
const metasCompras = [
  {
    meta: "Economia em Licitações",
    previsto: 5,
    realizado: 8.4,
    unidade: "%",
    status: "atingido",
  },
  {
    meta: "Prazo Médio de Contratação",
    previsto: 45,
    realizado: 38,
    unidade: "dias",
    status: "atingido",
  },
  {
    meta: "Participação MPE",
    previsto: 25,
    realizado: 22,
    unidade: "%",
    status: "atencao",
  },
  {
    meta: "Contratos com Aditivos",
    previsto: 15,
    realizado: 12,
    unidade: "%",
    status: "atingido",
  },
];

// Prazo Medio por Etapa de Contratacao
const prazoMedioPorEtapa = [
  { etapa: "Publicação Edital", prazoMedio: 5, meta: 7, status: "atingido" },
  {
    etapa: "Recebimento Propostas",
    prazoMedio: 15,
    meta: 15,
    status: "atingido",
  },
  {
    etapa: "Análise e Julgamento",
    prazoMedio: 8,
    meta: 10,
    status: "atingido",
  },
  { etapa: "Recursos", prazoMedio: 5, meta: 5, status: "atingido" },
  { etapa: "Homologação", prazoMedio: 3, meta: 3, status: "atingido" },
  { etapa: "Assinatura Contrato", prazoMedio: 2, meta: 5, status: "atingido" },
];
const prazoTotalMedio = prazoMedioPorEtapa.reduce(
  (a, b) => a + b.prazoMedio,
  0,
);
const prazoTotalMeta = prazoMedioPorEtapa.reduce((a, b) => a + b.meta, 0);

// Aditivos Contratuais
const aditivosContratuais = [
  { tipo: "Prazo", quantidade: 45, valor: 0, percentual: 30 },
  {
    tipo: "Valor (Acrescimo)",
    quantidade: 28,
    valor: 3200000,
    percentual: 18.7,
  },
  { tipo: "Valor (Supressao)", quantidade: 12, valor: -850000, percentual: 8 },
  { tipo: "Objeto", quantidade: 8, valor: 1200000, percentual: 5.3 },
  { tipo: "Prazo + Valor", quantidade: 57, valor: 4800000, percentual: 38 },
];
const totalAditivos = aditivosContratuais.reduce((a, b) => a + b.quantidade, 0);
const percentualContratosComAditivo =
  (totalAditivos / totaisCompras.contratosAtivos) * 100;
const valorTotalAditivos = aditivosContratuais.reduce((a, b) => a + b.valor, 0);

// Participacao de MPEs (Micro e Pequenas Empresas)
const participacaoMPE = [
  {
    ano: "2020",
    percentualMPE: 18,
    percentualGrande: 82,
    valorMPE: 5850000,
    meta: 25,
  },
  {
    ano: "2021",
    percentualMPE: 20,
    percentualGrande: 80,
    valorMPE: 7360000,
    meta: 25,
  },
  {
    ano: "2022",
    percentualMPE: 19,
    percentualGrande: 81,
    valorMPE: 7638000,
    meta: 25,
  },
  {
    ano: "2023",
    percentualMPE: 21,
    percentualGrande: 79,
    valorMPE: 9198000,
    meta: 25,
  },
  {
    ano: "2024",
    percentualMPE: 22,
    percentualGrande: 78,
    valorMPE: 9944000,
    meta: 25,
  },
];

// Faixas de vencimento dos contratos
const agingContratos = [
  { faixa: "Vencidos", quantidade: 12, valor: 980000, risco: "critico" },
  { faixa: "Até 30 dias", quantidade: 45, valor: 2800000, risco: "alto" },
  { faixa: "31-60 dias", quantidade: 67, valor: 4200000, risco: "medio" },
  { faixa: "61-90 dias", quantidade: 89, valor: 5600000, risco: "baixo" },
  { faixa: "91-180 dias", quantidade: 234, valor: 12800000, risco: "normal" },
  {
    faixa: "Acima 180 dias",
    quantidade: 800,
    valor: 18820000,
    risco: "normal",
  },
];

// Benchmark de Compras Municipal
const benchmarkCompras = [
  {
    municipio: "Município Atual",
    economia: 8.4,
    prazo: 38,
    mpe: 22,
    aditivos: 12,
    concentracao: 36.3,
    destaque: true,
  },
  {
    municipio: "Município A (Similar)",
    economia: 6.2,
    prazo: 52,
    mpe: 28,
    aditivos: 18,
    concentracao: 42.1,
    destaque: false,
  },
  {
    municipio: "Município B (Similar)",
    economia: 7.8,
    prazo: 45,
    mpe: 24,
    aditivos: 15,
    concentracao: 38.5,
    destaque: false,
  },
  {
    municipio: "Município C (Similar)",
    economia: 5.1,
    prazo: 60,
    mpe: 30,
    aditivos: 22,
    concentracao: 45.8,
    destaque: false,
  },
  {
    municipio: "Média Regional",
    economia: 6.4,
    prazo: 49,
    mpe: 26,
    aditivos: 17,
    concentracao: 40.5,
    destaque: false,
  },
];

export function ComprasMunicipais() {
  const [selectedPeriod, setSelectedPeriod] = React.useState("6m");
  const [selectedSecretaria, setSelectedSecretaria] = React.useState("all");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCompactCurrency = (value: number) => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}K`;
    }
    return `R$ ${value}`;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { className: string; text: string }> = {
      ativo: {
        className:
          "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700",
        text: "Ativo",
      },
      "em-andamento": {
        className:
          "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700",
        text: "Em Andamento",
      },
      aberto: {
        className:
          "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700",
        text: "Aberto",
      },
      "em-analise": {
        className:
          "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-100 dark:border-purple-700",
        text: "Em Análise",
      },
      suspenso: {
        className:
          "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-100 dark:border-red-700",
        text: "Suspenso",
      },
    };
    const config = statusConfig[status] || {
      className:
        "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600",
      text: status,
    };
    return <Badge className={config.className}>{config.text}</Badge>;
  };

  return (
    <div className="space-y-8">
      {/* Header com Filtros */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Compras e Licitações
          </h2>
          <p className="text-sm text-muted-foreground">
            Gestão de contratos e processos licitatórios
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6m">6 meses</SelectItem>
              <SelectItem value="12m">12 meses</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <HugeiconsIcon
              icon={FilterIcon}
              strokeWidth={2}
              className="mr-2 size-4"
            />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <HugeiconsIcon
              icon={Download01Icon}
              strokeWidth={2}
              className="mr-2 size-4"
            />
            Exportar
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

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <KpiCard
            key={index}
            title={kpi.title}
            icon={kpi.icon}
            value={kpi.value}
            borderColor={kpi.borderClass.replace("border-l-4 ", "")}
            footer={
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  {kpi.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <HugeiconsIcon
                    icon={kpi.trend === "up" ? ArrowUp01Icon : ArrowDown01Icon}
                    strokeWidth={2}
                    className={`size-3 ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  />
                  <span
                    className={
                      kpi.trend === "up" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {kpi.change}
                  </span>
                  <span>vs. mês anterior</span>
                </div>
              </div>
            }
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução Mensal</CardTitle>
            <CardDescription>
              Licitações, contratos e valores dos últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="licitacoes"
                    stroke="var(--color-licitacoes)"
                    strokeWidth={2}
                    name="Licitações"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="contratos"
                    stroke="var(--color-contratos)"
                    strokeWidth={2}
                    name="Contratos"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="valor"
                    stroke="var(--color-valor)"
                    strokeWidth={2}
                    name="Valor (R$)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Contracts by Secretariat */}
        <Card>
          <CardHeader>
            <CardTitle>Contratos por Secretaria</CardTitle>
            <CardDescription>
              Distribuição de contratos e valores por órgão
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigSecretarias}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={secretariaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    yAxisId="left"
                    dataKey="contratos"
                    fill="var(--color-contratos)"
                    name="Contratos"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="valor"
                    fill="var(--color-valor)"
                    name="Valor (R$)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bid Modalities */}
        <Card>
          <CardHeader>
            <CardTitle>Modalidades de Licitação</CardTitle>
            <CardDescription>Distribuição por tipo de processo</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={modalidadeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {modalidadeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Economy Analysis */}
        <KpiCard
          title="Análise de Economia"
          icon={CoinsDollarIcon}
          value="R$ 3.8M"
          valueClassName="text-green-600"
          borderColor="border-l-green-500"
          footer={
            <>
              <p className="text-xs text-muted-foreground">
                Economia obtida vs valor estimado
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Média mensal</span>
                  <span>R$ 633K</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">
                    Percentual economia
                  </span>
                  <span className="text-green-600">8.4%</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Maior economia</span>
                  <span>R$ 420K (Jun)</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Contratos com economia
                  </span>
                  <span>324 de 1.247</span>
                </div>
                <Progress value={26} className="h-2" />
              </div>
            </>
          }
        />

        {/* Contract Status */}
        <KpiCard
          title="Status dos Contratos"
          icon={SecurityCheckIcon}
          value="1.247"
          borderColor="border-l-blue-500"
          footer={
            <>
              <p className="text-xs text-muted-foreground">
                Distribuição por situação atual
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-green-500" />
                    <span className="text-sm">Ativos</span>
                  </div>
                  <span className="font-medium">892 (71.5%)</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-yellow-500" />
                    <span className="text-sm">Em Andamento</span>
                  </div>
                  <span className="font-medium">245 (19.6%)</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-blue-500" />
                    <span className="text-sm">Aguardando Início</span>
                  </div>
                  <span className="font-medium">78 (6.3%)</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-red-500" />
                    <span className="text-sm">Suspensos</span>
                  </div>
                  <span className="font-medium">32 (2.6%)</span>
                </div>
              </div>
              <Separator />
              <p className="text-xs text-muted-foreground">
                Total de Contratos
              </p>
            </>
          }
        />
      </div>

      {/* Tables Section */}
      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contracts">Contratos Recentes</TabsTrigger>
          <TabsTrigger value="bids">Licitações em Andamento</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle>Contratos Recentes</CardTitle>
              <CardDescription>
                Últimos contratos registrados no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Secretaria</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Objeto</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progresso</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">
                        {contract.id}
                      </TableCell>
                      <TableCell>{contract.secretaria}</TableCell>
                      <TableCell>{contract.fornecedor}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {contract.objeto}
                      </TableCell>
                      <TableCell>
                        {formatCompactCurrency(contract.valor)}
                      </TableCell>
                      <TableCell>{getStatusBadge(contract.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={contract.progress}
                            className="w-16 h-2"
                          />
                          <span className="text-xs text-muted-foreground">
                            {contract.progress}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bids">
          <Card>
            <CardHeader>
              <CardTitle>Licitações em Andamento</CardTitle>
              <CardDescription>
                Processos licitatórios atualmente ativos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Modalidade</TableHead>
                    <TableHead>Objeto</TableHead>
                    <TableHead>Valor Estimado</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Participantes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ongoingBids.map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell className="font-medium">{bid.id}</TableCell>
                      <TableCell>{bid.modalidade}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {bid.objeto}
                      </TableCell>
                      <TableCell>
                        {formatCompactCurrency(bid.valorEstimado)}
                      </TableCell>
                      <TableCell>{getStatusBadge(bid.status)}</TableCell>
                      <TableCell>{bid.prazo}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <HugeiconsIcon
                            icon={UserIcon}
                            strokeWidth={2}
                            className="size-4 text-muted-foreground"
                          />
                          <span>{bid.participantes}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Comparativo Anual e Top Fornecedores */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Histórico de Compras */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Evolução Histórica (5 anos)
            </CardTitle>
            <CardDescription>
              Comparativo anual de contratos e economia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  valor: { label: "Valor Contratado", color: "var(--chart-1)" },
                  economia: { label: "Economia", color: "var(--chart-2)" },
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
                  dataKey="valor"
                  fill="var(--color-valor)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="economia"
                  fill="var(--color-economia)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Fornecedores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Store04Icon}
                strokeWidth={2}
                className="size-5"
              />
              Principais Fornecedores
            </CardTitle>
            <CardDescription>
              Top 5 fornecedores por valor contratado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topFornecedores.map((fornecedor, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>{index + 1}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate max-w-[200px]">
                        {fornecedor.nome}
                      </p>
                      <span className="text-sm font-semibold">
                        {formatCompactCurrency(fornecedor.valor)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {fornecedor.cnpj}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {fornecedor.contratos} contratos
                      </Badge>
                    </div>
                    <Progress
                      value={fornecedor.percentual * 10}
                      className="h-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metas e Timeline */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Metas de Compras */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Target01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Metas de Desempenho
            </CardTitle>
            <CardDescription>Indicadores de gestão de compras</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {metasCompras.map((meta, index) => (
                <div key={index} className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{meta.meta}</p>
                    <Badge
                      variant={
                        meta.status === "atingido" ? "default" : "secondary"
                      }
                      className={
                        meta.status === "atingido"
                          ? "bg-green-600"
                          : "bg-amber-600"
                      }
                    >
                      {meta.status === "atingido" ? "Atingido" : "Atenção"}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Meta: {meta.previsto}
                        {meta.unidade}
                      </span>
                      <span className="font-medium">
                        {meta.realizado}
                        {meta.unidade}
                      </span>
                    </div>
                    <Progress
                      value={(meta.realizado / meta.previsto) * 100}
                      className={`h-2 ${meta.status === "atingido" ? "" : "[&>div]:bg-amber-500"}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline de Eventos */}
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
              Últimas movimentações de compras e licitações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventosCompras.map((evento, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`size-2.5 rounded-full ${
                        evento.tipo === "homologacao"
                          ? "bg-green-500"
                          : evento.tipo === "contrato"
                            ? "bg-blue-500"
                            : evento.tipo === "licitacao"
                              ? "bg-amber-500"
                              : evento.tipo === "aditivo"
                                ? "bg-purple-500"
                                : "bg-gray-500"
                      }`}
                    />
                    {index < eventosCompras.length - 1 && (
                      <div className="w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-xs text-muted-foreground">
                      {evento.data}
                    </p>
                    <p className="text-sm">{evento.evento}</p>
                    {evento.valor > 0 && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        {formatCompactCurrency(evento.valor)}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prazo Medio por Etapa e Aditivos Contratuais */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Prazo Medio por Etapa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Clock01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Prazo Médio por Etapa
            </CardTitle>
            <CardDescription>
              Prazo total médio:{" "}
              <strong
                className={
                  prazoTotalMedio <= prazoTotalMeta
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {prazoTotalMedio} dias
              </strong>{" "}
              (meta: {prazoTotalMeta} dias)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {prazoMedioPorEtapa.map((etapa) => (
                <div key={etapa.etapa} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{etapa.etapa}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {etapa.prazoMedio} dias
                      </span>
                      <Badge
                        variant={
                          etapa.prazoMedio <= etapa.meta
                            ? "secondary"
                            : "destructive"
                        }
                        className={
                          etapa.prazoMedio <= etapa.meta
                            ? "text-green-600 text-xs"
                            : "text-xs"
                        }
                      >
                        meta: {etapa.meta}d
                      </Badge>
                    </div>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`absolute h-full rounded-full transition-all ${etapa.prazoMedio <= etapa.meta ? "bg-green-500" : "bg-red-500"}`}
                      style={{
                        width: `${Math.min((etapa.prazoMedio / etapa.meta) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
              <Separator />
              <div className="flex items-center justify-between text-sm font-bold">
                <span>Total</span>
                <div className="flex items-center gap-2">
                  <span>{prazoTotalMedio} dias</span>
                  <Badge variant="secondary" className="text-green-600 text-xs">
                    {prazoTotalMeta - prazoTotalMedio} dias abaixo da meta
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aditivos Contratuais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ContactIcon}
                strokeWidth={2}
                className="size-5"
              />
              Aditivos Contratuais
            </CardTitle>
            <CardDescription>
              {totalAditivos} aditivos (
              {percentualContratosComAditivo.toFixed(1)}% dos contratos) — Valor
              liquido:{" "}
              <strong
                className={
                  valorTotalAditivos >= 0 ? "text-amber-600" : "text-green-600"
                }
              >
                {formatCurrency(valorTotalAditivos)}
              </strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aditivosContratuais.map((aditivo) => (
                <div
                  key={aditivo.tipo}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {aditivo.tipo}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {aditivo.quantidade} aditivos
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <Progress
                        value={aditivo.percentual}
                        className="h-1.5 flex-1 mr-3"
                      />
                      <span className="text-xs text-muted-foreground">
                        {aditivo.percentual}%
                      </span>
                    </div>
                  </div>
                  {aditivo.valor !== 0 && (
                    <span
                      className={`ml-3 text-sm font-medium ${aditivo.valor > 0 ? "text-red-600" : "text-green-600"}`}
                    >
                      {aditivo.valor > 0 ? "+" : ""}
                      {formatCompactCurrency(aditivo.valor)}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3">
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Alert02Icon}
                  strokeWidth={2}
                  className="size-4 text-amber-600"
                />
                <p className="text-sm">
                  <strong className="text-amber-600">
                    Monitoramento recomendado.
                  </strong>{" "}
                  <span className="text-muted-foreground">
                    38% dos aditivos combinam prazo e valor, sugerindo
                    necessidade de melhor planejamento inicial.
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Participacao de MPEs e Aging de Contratos */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Participacao de MPEs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Store04Icon}
                strokeWidth={2}
                className="size-5"
              />
              Participação de MPEs
            </CardTitle>
            <CardDescription>
              Evolução da participação de Micro e Pequenas Empresas (meta: 25%)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  percentualMPE: { label: "MPE (%)", color: "var(--chart-1)" },
                  meta: { label: "Meta (%)", color: "var(--chart-3)" },
                } satisfies ChartConfig
              }
              className="h-[200px] w-full"
            >
              <BarChart data={participacaoMPE} margin={{ left: 0, right: 12 }}>
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
                  domain={[0, 35]}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="percentualMPE"
                  fill="var(--color-percentualMPE)"
                  radius={[4, 4, 0, 0]}
                  name="MPE (%)"
                />
                <Line
                  type="monotone"
                  dataKey="meta"
                  stroke="var(--color-meta)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Meta (%)"
                />
              </BarChart>
            </ChartContainer>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="rounded-lg border p-2 text-center">
                <p className="text-xs text-muted-foreground">Atual</p>
                <p className="text-lg font-bold text-amber-600">22%</p>
              </div>
              <div className="rounded-lg border p-2 text-center">
                <p className="text-xs text-muted-foreground">Meta</p>
                <p className="text-lg font-bold">25%</p>
              </div>
              <div className="rounded-lg border p-2 text-center">
                <p className="text-xs text-muted-foreground">Gap</p>
                <p className="text-lg font-bold text-red-600">-3pp</p>
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Tendencia positiva:</strong>{" "}
                A participacao de MPEs cresceu de 18% (2020) para 22% (2024).
                Para atingir a meta, considere ampliar programas de capacitacao
                e reservar cotas em licitacoes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Aging de Contratos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Calendar01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Faixas de vencimento dos contratos
            </CardTitle>
            <CardDescription>
              Distribuição de contratos por prazo de vencimento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {agingContratos.map((faixa) => {
                const riscoColor =
                  faixa.risco === "critico"
                    ? "bg-red-500"
                    : faixa.risco === "alto"
                      ? "bg-orange-500"
                      : faixa.risco === "medio"
                        ? "bg-amber-500"
                        : faixa.risco === "baixo"
                          ? "bg-blue-500"
                          : "bg-green-500";
                const riscoText =
                  faixa.risco === "critico"
                    ? "text-red-600"
                    : faixa.risco === "alto"
                      ? "text-orange-600"
                      : faixa.risco === "medio"
                        ? "text-amber-600"
                        : faixa.risco === "baixo"
                          ? "text-blue-600"
                          : "text-green-600";
                return (
                  <div key={faixa.faixa} className="flex items-center gap-3">
                    <div
                      className={`size-3 rounded-full ${riscoColor} shrink-0`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {faixa.faixa}
                        </span>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            {faixa.quantidade} contratos
                          </Badge>
                          <span className={`font-medium ${riscoText}`}>
                            {formatCompactCurrency(faixa.valor)}
                          </span>
                        </div>
                      </div>
                      <div className="relative mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={`absolute h-full rounded-full ${riscoColor} transition-all`}
                          style={{
                            width: `${(faixa.quantidade / totaisCompras.contratosAtivos) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Separator className="my-3" />
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-red-200 dark:border-red-800 p-3 text-center">
                <p className="text-xs text-muted-foreground">
                  Atenção Imediata
                </p>
                <p className="text-lg font-bold text-red-600">57</p>
                <p className="text-xs text-muted-foreground">
                  Vencidos + 30 dias
                </p>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <p className="text-xs text-muted-foreground">Valor em Risco</p>
                <p className="text-lg font-bold text-amber-600">
                  {formatCompactCurrency(980000 + 2800000)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Renovacao urgente
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benchmark de Compras Municipal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={ChartLineData02Icon}
              strokeWidth={2}
              className="size-5"
            />
            Comparativo de compras municipal
          </CardTitle>
          <CardDescription>
            Comparação de indicadores de compras com municípios de porte similar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Município</TableHead>
                <TableHead className="text-right">Economia</TableHead>
                <TableHead className="text-right">Prazo (dias)</TableHead>
                <TableHead className="text-right">MPE</TableHead>
                <TableHead className="text-right">Aditivos</TableHead>
                <TableHead className="text-right">Concentração</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {benchmarkCompras.map((mun) => (
                <TableRow
                  key={mun.municipio}
                  className={mun.destaque ? "bg-primary/5 font-medium" : ""}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {mun.destaque && (
                        <HugeiconsIcon
                          icon={Flag01Icon}
                          strokeWidth={2}
                          className="size-3.5 text-amber-500"
                        />
                      )}
                      {mun.municipio}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        mun.economia >= 8
                          ? "secondary"
                          : mun.economia >= 6
                            ? "outline"
                            : "destructive"
                      }
                      className={
                        mun.economia >= 8
                          ? "text-green-600"
                          : mun.economia >= 6
                            ? "text-amber-600"
                            : ""
                      }
                    >
                      {mun.economia}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        mun.prazo <= 40
                          ? "secondary"
                          : mun.prazo <= 50
                            ? "outline"
                            : "destructive"
                      }
                      className={
                        mun.prazo <= 40
                          ? "text-green-600"
                          : mun.prazo <= 50
                            ? "text-amber-600"
                            : ""
                      }
                    >
                      {mun.prazo}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{mun.mpe}%</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        mun.aditivos <= 12
                          ? "secondary"
                          : mun.aditivos <= 18
                            ? "outline"
                            : "destructive"
                      }
                      className={
                        mun.aditivos <= 12
                          ? "text-green-600"
                          : mun.aditivos <= 18
                            ? "text-amber-600"
                            : ""
                      }
                    >
                      {mun.aditivos}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {mun.concentracao}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg border p-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Destaques Positivos
              </p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-green-600">
                  Melhor economia (8.4%)
                </p>
                <p className="text-sm font-medium text-green-600">
                  Menor prazo (38 dias)
                </p>
                <p className="text-sm font-medium text-green-600">
                  Menor taxa de aditivos (12%)
                </p>
              </div>
            </div>
            <div className="rounded-lg border p-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Pontos de Melhoria
              </p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-amber-600">
                  Participação MPE: 22% vs. 30% do melhor
                </p>
                <p className="text-xs text-muted-foreground">
                  Ampliar programas de incentivo a MPEs para atingir a meta de
                  25%
                </p>
              </div>
            </div>
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
              Indicadores consolidados da gestão de compras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Taxa de Economia
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {totaisCompras.taxaEconomia}%
                  </span>
                  <Badge variant="secondary" className="text-xs bg-green-600">
                    <HugeiconsIcon
                      icon={ArrowUp01Icon}
                      strokeWidth={2}
                      className="size-3"
                    />
                    +1.1%
                  </Badge>
                </div>
                <Progress
                  value={totaisCompras.taxaEconomia * 10}
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  Meta: 5% | Atual: 8.4%
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Valor Economizado
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {formatCompactCurrency(totaisCompras.economiaTotal)}
                  </span>
                </div>
                <Progress
                  value={
                    (totaisCompras.economiaTotal /
                      totaisCompras.valorEstimado) *
                    100
                  }
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  Sobre valor estimado de{" "}
                  {formatCompactCurrency(totaisCompras.valorEstimado)}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Contratos Ativos
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {totaisCompras.contratosAtivos}
                  </span>
                </div>
                <Progress
                  value={(totaisCompras.contratosAtivos / 1500) * 100}
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  Valor total:{" "}
                  {formatCompactCurrency(totaisCompras.valorContratado)}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Contratos a Vencer
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-amber-600">
                    {totaisCompras.contratosVencendo30Dias}
                  </span>
                </div>
                <Progress
                  value={
                    (totaisCompras.contratosVencendo30Dias /
                      totaisCompras.contratosAtivos) *
                    100
                  }
                  className="h-2 [&>div]:bg-amber-500"
                />
                <p className="text-xs text-muted-foreground">
                  Nos próximos 30 dias
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
                <CardTitle>Análise Inteligente de Compras</CardTitle>
                <CardDescription>
                  Insights sobre a gestão de compras e contratos municipais
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Visão Geral */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-foreground leading-relaxed">
                A análise da gestão de compras do município no exercício de{" "}
                {selectedPeriod} demonstra
                <strong> desempenho positivo</strong> com taxa de economia de{" "}
                <strong>{totaisCompras.taxaEconomia}%</strong>, superando a meta
                estabelecida de 5% e representando economia de{" "}
                <strong>
                  {formatCompactCurrency(totaisCompras.economiaTotal)}
                </strong>
                para os cofres públicos. O valor total contratado de{" "}
                <strong>
                  {formatCompactCurrency(totaisCompras.valorContratado)}
                </strong>
                está distribuído em{" "}
                <strong>{totaisCompras.contratosAtivos}</strong> contratos
                ativos, com destaque para as áreas de Saúde e Educação que
                concentram 50% das contratações.
              </p>
            </div>

            <Separator />

            {/* Acordeão de Análises */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="economia">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={ArrowUp01Icon}
                      strokeWidth={2}
                      className="size-4 text-green-600"
                    />
                    <span>Análise de Economia em Licitações</span>
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
                          Taxa de economia acima da meta:
                        </strong>{" "}
                        A economia de 8.4% supera em 68% a meta de 5%
                        estabelecida, demonstrando eficiência nos processos
                        licitatórios e competitividade entre fornecedores.
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
                          Economia acumulada expressiva:
                        </strong>{" "}
                        O total de
                        {formatCompactCurrency(
                          totaisCompras.economiaTotal,
                        )}{" "}
                        economizado representa recursos que podem ser
                        redirecionados para outras áreas prioritárias da
                        administração.
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
                          Tendência de melhoria:
                        </strong>{" "}
                        A taxa de economia cresceu de 5.7% em 2020 para 8.4% em
                        2024, indicando aprimoramento contínuo dos processos de
                        aquisição.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contratos">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={ContactIcon}
                      strokeWidth={2}
                      className="size-4 text-blue-600"
                    />
                    <span>Gestão de Contratos</span>
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
                          Prazo médio de contratação otimizado:
                        </strong>{" "}
                        O prazo médio de 38 dias está abaixo da meta de 45 dias,
                        demonstrando agilidade nos processos de aquisição.
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
                          Contratos próximos do vencimento:
                        </strong>{" "}
                        {totaisCompras.contratosVencendo30Dias} contratos vencem
                        nos próximos 30 dias, totalizando R$ 2.8M. É necessário
                        iniciar processos de renovação ou nova licitação com
                        antecedência.
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
                          Baixo índice de aditivos:
                        </strong>{" "}
                        Apenas 12% dos contratos possuem aditivos, abaixo do
                        limite de 15%, indicando bom planejamento das
                        contratações.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fornecedores">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={UserMultipleIcon}
                      strokeWidth={2}
                      className="size-4 text-purple-600"
                    />
                    <span>Análise de Fornecedores</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-6">
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-amber-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Concentração de fornecedores:
                        </strong>{" "}
                        Os 5 principais fornecedores concentram 36.3% do valor
                        contratado. Recomenda-se diversificação para reduzir
                        riscos de dependência.
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
                          Participação de MPEs:
                        </strong>{" "}
                        A participação de Micro e Pequenas Empresas está em 22%,
                        abaixo da meta de 25%. Considere ações para incentivar a
                        participação de empresas locais.
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
                          Fornecedores regulares:
                        </strong>{" "}
                        A maioria dos fornecedores principais possui histórico
                        de entregas dentro do prazo e conformidade contratual,
                        garantindo qualidade nos serviços.
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
                        1. Planejar renovações contratuais
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Iniciar com antecedência mínima de 60 dias os processos
                        de licitação para os
                        {totaisCompras.contratosVencendo30Dias} contratos que
                        vencem em breve, evitando interrupção de serviços
                        essenciais.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-amber-50/50 dark:bg-amber-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        2. Diversificar base de fornecedores
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Implementar programa de capacitação e incentivo à
                        participação de novos fornecedores em licitações,
                        especialmente MPEs locais, para atingir a meta de 25%.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-amber-50/50 dark:bg-amber-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        3. Manter eficiência em licitações
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Documentar e compartilhar as melhores práticas que
                        resultaram na taxa de economia de 8.4%, garantindo a
                        manutenção do desempenho nos próximos exercícios.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-green-50/50 dark:bg-green-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        4. Fortalecer gestão de contratos
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Implementar sistema de alertas automáticos para
                        vencimentos e entregas, otimizando o acompanhamento e
                        garantindo conformidade contratual.
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
                      projeta-se para o encerramento do exercício:
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-2xl font-bold text-green-600">
                          R$ 52M
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Otimista
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Valor Contratado
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 text-center bg-primary/5">
                        <p className="text-2xl font-bold text-primary">
                          R$ 48M
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Provável
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Valor Contratado
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-2xl font-bold text-amber-600">
                          R$ 45M
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Conservador
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Valor Contratado
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      * Projeções consideram as licitações em andamento e
                      contratos a vencer.
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
                    A gestão de compras municipais apresenta desempenho
                    satisfatório, com destaque para a taxa de economia de{" "}
                    {totaisCompras.taxaEconomia}% que supera a meta
                    estabelecida. Os pontos de atenção identificados referem-se
                    à concentração de fornecedores e aos contratos próximos do
                    vencimento. Com as ações recomendadas, o município tem
                    condições de manter a qualidade na gestão de compras,
                    ampliar a participação de MPEs e garantir a continuidade dos
                    serviços essenciais.
                  </p>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Análise gerada em {new Date().toLocaleDateString("pt-BR")}{" "}
                    às{" "}
                    {new Date().toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    | Dados referentes ao período de {selectedPeriod}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
              Indicadores consolidados da gestão de compras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Economia Gerada
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-600">
                    {totaisCompras.taxaEconomia}%
                  </span>
                </div>
                <Progress
                  value={(totaisCompras.taxaEconomia / 10) * 100}
                  className="h-2 [&>div]:bg-green-500"
                />
                <p className="text-xs text-muted-foreground">
                  {formatCompactCurrency(totaisCompras.economiaTotal)}{" "}
                  economizados — meta: 5%
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Prazo Médio Processo
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-600">
                    {prazoTotalMedio}d
                  </span>
                </div>
                <Progress
                  value={(prazoTotalMedio / prazoTotalMeta) * 100}
                  className="h-2 [&>div]:bg-green-500"
                />
                <p className="text-xs text-muted-foreground">
                  Meta: {prazoTotalMeta} dias — {prazoTotalMedio} dias
                  realizados
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Participação MPE
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-amber-600">
                    {participacaoMPE[participacaoMPE.length - 1].percentualMPE}%
                  </span>
                </div>
                <Progress
                  value={
                    participacaoMPE[participacaoMPE.length - 1].percentualMPE
                  }
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  Meta: 25% — abaixo da meta em 3 p.p.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Contratos Ativos
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {totaisCompras.contratosAtivos.toLocaleString("pt-BR")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-amber-600 font-medium">
                    {totaisCompras.contratosVencendo30Dias} vencendo
                  </span>{" "}
                  em 30 dias ·{" "}
                  <span className="text-red-600 font-medium">
                    {totaisCompras.contratosVencidos} vencidos
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alertas e Notificações */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            Alertas e Notificações
          </h3>
          {alertasCompras.map((alerta, index) => (
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
