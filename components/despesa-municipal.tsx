"use client"

import * as React from "react"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
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
  ResponsiveContainer,
  Treemap,
  XAxis,
  YAxis,
  Cell,
} from "recharts"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowUp01Icon,
  ArrowDown01Icon,
  Wallet01Icon,
  MoneyReceiveSquareIcon,
  Invoice01Icon,
  Calendar01Icon,
  Building06Icon,
  GridViewIcon,
  Analytics01Icon,
  FilterIcon,
  Download01Icon,
  RefreshIcon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  BulbIcon,
  Target01Icon,
  ChartLineData02Icon,
  PieChart02Icon,
  UserMultipleIcon,
  Building04Icon,
  GraduationScrollIcon,
  HeartCheckIcon,
  Clock01Icon,
  Flag01Icon,
  StarIcon,
  Alert02Icon,
  SecurityCheckIcon,
} from "@hugeicons/core-free-icons"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Dados fictícios para demonstração
const dadosOrgaos = [
  { 
    codigo: "01", 
    nome: "Gabinete do Prefeito", 
    atualizada: 2850000, 
    empenhada: 2234500, 
    aEmpenhar: 615500, 
    pago: 1890000, 
    aPagar: 344500 
  },
  { 
    codigo: "02", 
    nome: "Secretaria de Administração", 
    atualizada: 5420000, 
    empenhada: 4890000, 
    aEmpenhar: 530000, 
    pago: 4120000, 
    aPagar: 770000 
  },
  { 
    codigo: "03", 
    nome: "Secretaria de Fazenda", 
    atualizada: 3180000, 
    empenhada: 2950000, 
    aEmpenhar: 230000, 
    pago: 2680000, 
    aPagar: 270000 
  },
  { 
    codigo: "04", 
    nome: "Secretaria de Educação", 
    atualizada: 45600000, 
    empenhada: 42300000, 
    aEmpenhar: 3300000, 
    pago: 38900000, 
    aPagar: 3400000 
  },
  { 
    codigo: "05", 
    nome: "Secretaria de Saúde", 
    atualizada: 52400000, 
    empenhada: 49800000, 
    aEmpenhar: 2600000, 
    pago: 46200000, 
    aPagar: 3600000 
  },
  { 
    codigo: "06", 
    nome: "Secretaria de Infraestrutura", 
    atualizada: 18900000, 
    empenhada: 16200000, 
    aEmpenhar: 2700000, 
    pago: 13500000, 
    aPagar: 2700000 
  },
  { 
    codigo: "07", 
    nome: "Secretaria de Assistência Social", 
    atualizada: 8750000, 
    empenhada: 7890000, 
    aEmpenhar: 860000, 
    pago: 6950000, 
    aPagar: 940000 
  },
  { 
    codigo: "08", 
    nome: "Secretaria de Meio Ambiente", 
    atualizada: 2340000, 
    empenhada: 1980000, 
    aEmpenhar: 360000, 
    pago: 1720000, 
    aPagar: 260000 
  },
]

const dadosUnidades = [
  { codigo: "04.01", nome: "Gabinete do Secretário de Educação", atualizada: 1200000, empenhada: 1100000, aEmpenhar: 100000, pago: 980000, aPagar: 120000 },
  { codigo: "04.02", nome: "Departamento de Ensino Fundamental", atualizada: 18500000, empenhada: 17200000, aEmpenhar: 1300000, pago: 15800000, aPagar: 1400000 },
  { codigo: "04.03", nome: "Departamento de Ensino Infantil", atualizada: 12400000, empenhada: 11600000, aEmpenhar: 800000, pago: 10700000, aPagar: 900000 },
  { codigo: "04.04", nome: "Departamento de Merenda Escolar", atualizada: 8900000, empenhada: 8200000, aEmpenhar: 700000, pago: 7500000, aPagar: 700000 },
  { codigo: "04.05", nome: "Departamento de Transporte Escolar", atualizada: 4600000, empenhada: 4200000, aEmpenhar: 400000, pago: 3920000, aPagar: 280000 },
]

const dadosFuncaoSubfuncao = [
  { funcao: "12", subfuncao: "361", nome: "Educação / Ensino Fundamental", atualizada: 32000000, empenhada: 29500000, aEmpenhar: 2500000, pago: 27200000, aPagar: 2300000 },
  { funcao: "12", subfuncao: "365", nome: "Educação / Ensino Infantil", atualizada: 13600000, empenhada: 12800000, aEmpenhar: 800000, pago: 11700000, aPagar: 1100000 },
  { funcao: "10", subfuncao: "301", nome: "Saúde / Atenção Básica", atualizada: 28500000, empenhada: 27100000, aEmpenhar: 1400000, pago: 25200000, aPagar: 1900000 },
  { funcao: "10", subfuncao: "302", nome: "Saúde / Assistência Hospitalar", atualizada: 23900000, empenhada: 22700000, aEmpenhar: 1200000, pago: 21000000, aPagar: 1700000 },
  { funcao: "08", subfuncao: "244", nome: "Assistência Social / Assistência Comunitária", atualizada: 8750000, empenhada: 7890000, aEmpenhar: 860000, pago: 6950000, aPagar: 940000 },
  { funcao: "15", subfuncao: "451", nome: "Urbanismo / Infraestrutura Urbana", atualizada: 14200000, empenhada: 12100000, aEmpenhar: 2100000, pago: 10200000, aPagar: 1900000 },
  { funcao: "04", subfuncao: "122", nome: "Administração / Administração Geral", atualizada: 8270000, empenhada: 7840000, aEmpenhar: 430000, pago: 6800000, aPagar: 1040000 },
]

const dadosProgramas = [
  { codigo: "0001", nome: "Gestão e Manutenção Administrativa", atualizada: 12500000, empenhada: 11800000, aEmpenhar: 700000, pago: 10500000, aPagar: 1300000 },
  { codigo: "0010", nome: "Educação de Qualidade para Todos", atualizada: 45600000, empenhada: 42300000, aEmpenhar: 3300000, pago: 38900000, aPagar: 3400000 },
  { codigo: "0020", nome: "Saúde para a Comunidade", atualizada: 52400000, empenhada: 49800000, aEmpenhar: 2600000, pago: 46200000, aPagar: 3600000 },
  { codigo: "0030", nome: "Assistência Social Integral", atualizada: 8750000, empenhada: 7890000, aEmpenhar: 860000, pago: 6950000, aPagar: 940000 },
  { codigo: "0040", nome: "Cidade Sustentável", atualizada: 18900000, empenhada: 16200000, aEmpenhar: 2700000, pago: 13500000, aPagar: 2700000 },
  { codigo: "0050", nome: "Meio Ambiente Preservado", atualizada: 2340000, empenhada: 1980000, aEmpenhar: 360000, pago: 1720000, aPagar: 260000 },
]

const dadosAcoes = [
  { codigo: "2001", tipo: "Atividade", nome: "Manutenção das Atividades Administrativas", atualizada: 8500000, empenhada: 8100000, aEmpenhar: 400000, pago: 7200000, aPagar: 900000 },
  { codigo: "2010", tipo: "Atividade", nome: "Manutenção do Ensino Fundamental", atualizada: 28000000, empenhada: 26200000, aEmpenhar: 1800000, pago: 24100000, aPagar: 2100000 },
  { codigo: "2011", tipo: "Atividade", nome: "Manutenção do Ensino Infantil", atualizada: 12400000, empenhada: 11600000, aEmpenhar: 800000, pago: 10700000, aPagar: 900000 },
  { codigo: "1001", tipo: "Projeto", nome: "Construção de Escola Municipal", atualizada: 3200000, empenhada: 2800000, aEmpenhar: 400000, pago: 2400000, aPagar: 400000 },
  { codigo: "2020", tipo: "Atividade", nome: "Manutenção da Atenção Básica", atualizada: 28500000, empenhada: 27100000, aEmpenhar: 1400000, pago: 25200000, aPagar: 1900000 },
  { codigo: "2021", tipo: "Atividade", nome: "Manutenção Hospitalar", atualizada: 23900000, empenhada: 22700000, aEmpenhar: 1200000, pago: 21000000, aPagar: 1700000 },
  { codigo: "1010", tipo: "Projeto", nome: "Ampliação da UBS Central", atualizada: 1800000, empenhada: 1500000, aEmpenhar: 300000, pago: 1200000, aPagar: 300000 },
  { codigo: "2030", tipo: "Atividade", nome: "Pavimentação de Vias Urbanas", atualizada: 8500000, empenhada: 7200000, aEmpenhar: 1300000, pago: 5800000, aPagar: 1400000 },
]

const dadosSecretarias = [
  { nome: "Secretaria de Educação", sigla: "SEMED", atualizada: 45600000, empenhada: 42300000, aEmpenhar: 3300000, pago: 38900000, aPagar: 3400000 },
  { nome: "Secretaria de Saúde", sigla: "SEMSA", atualizada: 52400000, empenhada: 49800000, aEmpenhar: 2600000, pago: 46200000, aPagar: 3600000 },
  { nome: "Secretaria de Infraestrutura", sigla: "SEMINF", atualizada: 18900000, empenhada: 16200000, aEmpenhar: 2700000, pago: 13500000, aPagar: 2700000 },
  { nome: "Secretaria de Assistência Social", sigla: "SEMAS", atualizada: 8750000, empenhada: 7890000, aEmpenhar: 860000, pago: 6950000, aPagar: 940000 },
  { nome: "Secretaria de Administração", sigla: "SEMAD", atualizada: 5420000, empenhada: 4890000, aEmpenhar: 530000, pago: 4120000, aPagar: 770000 },
  { nome: "Secretaria de Fazenda", sigla: "SEMFAZ", atualizada: 3180000, empenhada: 2950000, aEmpenhar: 230000, pago: 2680000, aPagar: 270000 },
  { nome: "Gabinete do Prefeito", sigla: "GAB", atualizada: 2850000, empenhada: 2234500, aEmpenhar: 615500, pago: 1890000, aPagar: 344500 },
  { nome: "Secretaria de Meio Ambiente", sigla: "SEMMA", atualizada: 2340000, empenhada: 1980000, aEmpenhar: 360000, pago: 1720000, aPagar: 260000 },
]

// Dados para evolução mensal
const evolucaoMensal = [
  { mes: "Jan", empenhado: 11500000, pago: 9800000 },
  { mes: "Fev", empenhado: 12200000, pago: 10500000 },
  { mes: "Mar", empenhado: 13100000, pago: 11200000 },
  { mes: "Abr", empenhado: 11800000, pago: 10800000 },
  { mes: "Mai", empenhado: 12600000, pago: 11500000 },
  { mes: "Jun", empenhado: 13400000, pago: 12100000 },
  { mes: "Jul", empenhado: 12900000, pago: 11800000 },
  { mes: "Ago", empenhado: 13800000, pago: 12500000 },
  { mes: "Set", empenhado: 14200000, pago: 13100000 },
  { mes: "Out", empenhado: 13600000, pago: 12800000 },
  { mes: "Nov", empenhado: 14500000, pago: 13200000 },
  { mes: "Dez", empenhado: 4644500, pago: 3560000 },
]

// Totais gerais
const totais = {
  atualizada: 139440000,
  empenhada: 128244500,
  aEmpenhar: 11195500,
  pago: 115960000,
  aPagar: 12284500,
}

// Dados para comparativo anual
const comparativoAnual = [
  { ano: "2020", atualizada: 98500000, empenhada: 89200000, pago: 82100000 },
  { ano: "2021", atualizada: 108900000, empenhada: 99800000, pago: 91500000 },
  { ano: "2022", atualizada: 121300000, empenhada: 112500000, pago: 103200000 },
  { ano: "2023", atualizada: 132800000, empenhada: 122100000, pago: 112800000 },
  { ano: "2024", atualizada: 139440000, empenhada: 128244500, pago: 115960000 },
]

// Dados para treemap de despesas
const treemapData = [
  { name: "Pessoal e Encargos", value: 68500000, fill: "var(--chart-1)" },
  { name: "Outras Despesas Correntes", value: 42300000, fill: "var(--chart-2)" },
  { name: "Investimentos", value: 14200000, fill: "var(--chart-3)" },
  { name: "Inversoes Financeiras", value: 2100000, fill: "var(--chart-4)" },
  { name: "Amortizacao da Divida", value: 1144500, fill: "var(--chart-5)" },
]

// Dados de empenhos por modalidade
const modalidadeLicitacao = [
  { modalidade: "Dispensa", quantidade: 342, valor: 8500000 },
  { modalidade: "Pregao Eletronico", quantidade: 156, valor: 45200000 },
  { modalidade: "Pregao Presencial", quantidade: 48, valor: 12800000 },
  { modalidade: "Inexigibilidade", quantidade: 89, valor: 18900000 },
  { modalidade: "Tomada de Precos", quantidade: 12, valor: 8200000 },
  { modalidade: "Concorrencia", quantidade: 5, valor: 34644500 },
]

// Dados de fornecedores principais
const topFornecedores = [
  { nome: "Construtora Silva & Associados", cnpj: "12.345.678/0001-90", valor: 18500000, percentual: 14.4 },
  { nome: "Distribuidora de Medicamentos ABC", cnpj: "23.456.789/0001-01", valor: 12800000, percentual: 10.0 },
  { nome: "Merenda Escolar Ltda", cnpj: "34.567.890/0001-12", valor: 8900000, percentual: 6.9 },
  { nome: "Transporte Urbano SA", cnpj: "45.678.901/0001-23", valor: 7200000, percentual: 5.6 },
  { nome: "Tecnologia Municipal Ltda", cnpj: "56.789.012/0001-34", valor: 5400000, percentual: 4.2 },
]

// Metas e indicadores
const metasODS = [
  { ods: "ODS 3", titulo: "Saude e Bem-estar", meta: 52400000, realizado: 49800000, percentual: 95 },
  { ods: "ODS 4", titulo: "Educacao de Qualidade", meta: 45600000, realizado: 42300000, percentual: 93 },
  { ods: "ODS 11", titulo: "Cidades Sustentaveis", meta: 18900000, realizado: 16200000, percentual: 86 },
  { ods: "ODS 1", titulo: "Erradicacao da Pobreza", meta: 8750000, realizado: 7890000, percentual: 90 },
]

// Alertas e recomendacoes
const alertasGestao = [
  { tipo: "warning", titulo: "Baixa Execucao em Infraestrutura", descricao: "A Secretaria de Infraestrutura apresenta execucao de apenas 86% do orcamento, abaixo da media municipal.", orgao: "SEMINF" },
  { tipo: "info", titulo: "Aumento de Restos a Pagar", descricao: "Observado aumento de 8% nos restos a pagar em relacao ao mes anterior na area de saude.", orgao: "SEMSA" },
  { tipo: "success", titulo: "Meta de Educacao Atingida", descricao: "A Secretaria de Educacao atingiu 93% da meta de execucao orcamentaria prevista para o periodo.", orgao: "SEMED" },
]

// Timeline de eventos
const eventosRecentes = [
  { data: "28/11/2024", evento: "Empenho de R$ 2.5M para merenda escolar", tipo: "empenho", secretaria: "SEMED" },
  { data: "25/11/2024", evento: "Pagamento de R$ 1.8M para obras de pavimentacao", tipo: "pagamento", secretaria: "SEMINF" },
  { data: "22/11/2024", evento: "Abertura de licitacao para aquisicao de medicamentos", tipo: "licitacao", secretaria: "SEMSA" },
  { data: "20/11/2024", evento: "Liquidacao de R$ 3.2M em contratos diversos", tipo: "liquidacao", secretaria: "SEMAD" },
  { data: "18/11/2024", evento: "Suplementacao orcamentaria de R$ 1.5M", tipo: "credito", secretaria: "SEMFAZ" },
]

// Função para formatar valores em reais
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// Função para formatar valores em milhões
function formatMillions(value: number): string {
  return `R$ ${(value / 1000000).toFixed(1)}M`
}

// Função para calcular percentual
function calcPercent(value: number, total: number): number {
  return Math.round((value / total) * 100)
}

export function DespesaMunicipal() {
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024")
  const [viewMode, setViewMode] = React.useState("orgao")

  return (
    <div className="space-y-6">
      {/* Header com filtros */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Despesa Municipal</h2>
          <p className="text-muted-foreground">Execucao orcamentaria do municipio</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <HugeiconsIcon icon={FilterIcon} strokeWidth={2} data-icon="inline-start" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <HugeiconsIcon icon={Download01Icon} strokeWidth={2} data-icon="inline-start" />
            Exportar
          </Button>
          <Button variant="outline" size="icon-sm">
            <HugeiconsIcon icon={RefreshIcon} strokeWidth={2} />
          </Button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <HugeiconsIcon icon={Wallet01Icon} strokeWidth={2} className="size-4" />
              Despesa Atualizada
            </CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(totais.atualizada)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Orcamento atualizado do exercicio</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <HugeiconsIcon icon={Invoice01Icon} strokeWidth={2} className="size-4" />
              Despesa Empenhada
            </CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(totais.empenhada)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Progress value={calcPercent(totais.empenhada, totais.atualizada)} className="h-2 flex-1" />
              <span className="text-xs font-medium">{calcPercent(totais.empenhada, totais.atualizada)}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} className="size-4" />
              A Empenhar
            </CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(totais.aEmpenhar)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>{calcPercent(totais.aEmpenhar, totais.atualizada)}% do orcamento disponivel</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <HugeiconsIcon icon={MoneyReceiveSquareIcon} strokeWidth={2} className="size-4" />
              Pago
            </CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(totais.pago)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Progress value={calcPercent(totais.pago, totais.empenhada)} className="h-2 flex-1" />
              <span className="text-xs font-medium">{calcPercent(totais.pago, totais.empenhada)}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <HugeiconsIcon icon={Building06Icon} strokeWidth={2} className="size-4" />
              A Pagar
            </CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(totais.aPagar)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs">
              <Badge variant="outline" className="text-amber-600">
                <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-3" />
                {calcPercent(totais.aPagar, totais.empenhada)}% pendente
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graficos de Visao Geral */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Evolucao Mensal */}
        <Card>
          <CardHeader>
            <CardTitle>Evolucao Mensal da Execucao</CardTitle>
            <CardDescription>Empenhado vs Pago por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                empenhado: { label: "Empenhado", color: "var(--chart-1)" },
                pago: { label: "Pago", color: "var(--chart-2)" },
              } satisfies ChartConfig}
              className="h-[280px] w-full"
            >
              <AreaChart data={evolucaoMensal} margin={{ left: 0, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => `${(v/1000000).toFixed(0)}M`} />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                <Area type="monotone" dataKey="empenhado" fill="var(--color-empenhado)" fillOpacity={0.3} stroke="var(--color-empenhado)" strokeWidth={2} />
                <Area type="monotone" dataKey="pago" fill="var(--color-pago)" fillOpacity={0.3} stroke="var(--color-pago)" strokeWidth={2} />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Distribuicao por Secretaria */}
        <Card>
          <CardHeader>
            <CardTitle>Despesa por Secretaria</CardTitle>
            <CardDescription>Distribuicao da despesa empenhada</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                SEMSA: { label: "Saude", color: "var(--chart-1)" },
                SEMED: { label: "Educacao", color: "var(--chart-2)" },
                SEMINF: { label: "Infraestrutura", color: "var(--chart-3)" },
                SEMAS: { label: "Assistencia Social", color: "var(--chart-4)" },
                outros: { label: "Outros", color: "var(--chart-5)" },
              } satisfies ChartConfig}
              className="mx-auto aspect-square h-[280px]"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} hideLabel />} />
                <Pie
                  data={[
                    { name: "SEMSA", value: 49800000, fill: "var(--color-SEMSA)" },
                    { name: "SEMED", value: 42300000, fill: "var(--color-SEMED)" },
                    { name: "SEMINF", value: 16200000, fill: "var(--color-SEMINF)" },
                    { name: "SEMAS", value: 7890000, fill: "var(--color-SEMAS)" },
                    { name: "outros", value: 12054500, fill: "var(--color-outros)" },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                />
                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabelas por Classificacao */}
      <Tabs defaultValue="orgao" className="w-full" onValueChange={setViewMode}>
        <TabsList variant="line" className="w-full justify-start">
          <TabsTrigger value="orgao">Por Orgao</TabsTrigger>
          <TabsTrigger value="unidade">Por Unidade</TabsTrigger>
          <TabsTrigger value="funcao">Funcao/Subfuncao</TabsTrigger>
          <TabsTrigger value="programa">Por Programa</TabsTrigger>
          <TabsTrigger value="acao">Por Acao</TabsTrigger>
          <TabsTrigger value="secretaria">Por Secretaria</TabsTrigger>
        </TabsList>

        {/* Tabela por Orgao */}
        <TabsContent value="orgao" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Execucao por Orgao</CardTitle>
              <CardDescription>Despesa orcamentaria por orgao da administracao</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Codigo</TableHead>
                    <TableHead>Orgao</TableHead>
                    <TableHead className="text-right">Atualizada</TableHead>
                    <TableHead className="text-right">Empenhada</TableHead>
                    <TableHead className="text-right">A Empenhar</TableHead>
                    <TableHead className="text-right">Pago</TableHead>
                    <TableHead className="text-right">A Pagar</TableHead>
                    <TableHead className="w-32">Execucao</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosOrgaos.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-xs">{item.codigo}</TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.atualizada)}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.empenhada)}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-muted-foreground">{formatCurrency(item.aEmpenhar)}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.pago)}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-amber-600">{formatCurrency(item.aPagar)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={calcPercent(item.empenhada, item.atualizada)} className="h-2 flex-1" />
                          <span className="w-10 text-right text-xs">{calcPercent(item.empenhada, item.atualizada)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold">Total Geral</TableCell>
                    <TableCell className="text-right font-mono font-bold">{formatCurrency(totais.atualizada)}</TableCell>
                    <TableCell className="text-right font-mono font-bold">{formatCurrency(totais.empenhada)}</TableCell>
                    <TableCell className="text-right font-mono font-bold">{formatCurrency(totais.aEmpenhar)}</TableCell>
                    <TableCell className="text-right font-mono font-bold">{formatCurrency(totais.pago)}</TableCell>
                    <TableCell className="text-right font-mono font-bold">{formatCurrency(totais.aPagar)}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tabela por Unidade */}
        <TabsContent value="unidade" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Execucao por Unidade Orcamentaria</CardTitle>
              <CardDescription>Despesa orcamentaria por unidade (Educacao)</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Codigo</TableHead>
                    <TableHead>Unidade</TableHead>
                    <TableHead className="text-right">Atualizada</TableHead>
                    <TableHead className="text-right">Empenhada</TableHead>
                    <TableHead className="text-right">A Empenhar</TableHead>
                    <TableHead className="text-right">Pago</TableHead>
                    <TableHead className="text-right">A Pagar</TableHead>
                    <TableHead className="w-32">Execucao</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosUnidades.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-xs">{item.codigo}</TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.atualizada)}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.empenhada)}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-muted-foreground">{formatCurrency(item.aEmpenhar)}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.pago)}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-amber-600">{formatCurrency(item.aPagar)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={calcPercent(item.empenhada, item.atualizada)} className="h-2 flex-1" />
                          <span className="w-10 text-right text-xs">{calcPercent(item.empenhada, item.atualizada)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tabela por Funcao/Subfuncao */}
        <TabsContent value="funcao" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Execucao por Funcao/Subfuncao</CardTitle>
              <CardDescription>Classificacao funcional da despesa</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Funcao</TableHead>
                    <TableHead className="w-24">Subfuncao</TableHead>
                    <TableHead>Descricao</TableHead>
                    <TableHead className="text-right">Atualizada</TableHead>
                    <TableHead className="text-right">Empenhada</TableHead>
                    <TableHead className="text-right">Pago</TableHead>
                    <TableHead className="w-32">Execucao</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosFuncaoSubfuncao.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-xs">{item.funcao}</TableCell>
                      <TableCell className="font-mono text-xs">{item.subfuncao}</TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.atualizada)}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.empenhada)}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.pago)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={calcPercent(item.empenhada, item.atualizada)} className="h-2 flex-1" />
                          <span className="w-10 text-right text-xs">{calcPercent(item.empenhada, item.atualizada)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tabela por Programa */}
        <TabsContent value="programa" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Execucao por Programa</CardTitle>
              <CardDescription>Despesa por programa de governo</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Codigo</TableHead>
                    <TableHead>Programa</TableHead>
                    <TableHead className="text-right">Atualizada</TableHead>
                    <TableHead className="text-right">Empenhada</TableHead>
                    <TableHead className="text-right">A Empenhar</TableHead>
                    <TableHead className="text-right">Pago</TableHead>
                    <TableHead className="text-right">A Pagar</TableHead>
                    <TableHead className="w-32">Execucao</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosProgramas.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-xs">{item.codigo}</TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.atualizada)}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.empenhada)}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-muted-foreground">{formatCurrency(item.aEmpenhar)}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.pago)}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-amber-600">{formatCurrency(item.aPagar)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={calcPercent(item.empenhada, item.atualizada)} className="h-2 flex-1" />
                          <span className="w-10 text-right text-xs">{calcPercent(item.empenhada, item.atualizada)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tabela por Acao */}
        <TabsContent value="acao" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Execucao por Acao</CardTitle>
              <CardDescription>Projetos e atividades orcamentarias</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Codigo</TableHead>
                    <TableHead className="w-24">Tipo</TableHead>
                    <TableHead>Acao</TableHead>
                    <TableHead className="text-right">Atualizada</TableHead>
                    <TableHead className="text-right">Empenhada</TableHead>
                    <TableHead className="text-right">Pago</TableHead>
                    <TableHead className="w-32">Execucao</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosAcoes.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-xs">{item.codigo}</TableCell>
                      <TableCell>
                        <Badge variant={item.tipo === "Projeto" ? "default" : "secondary"} className="text-xs">
                          {item.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.atualizada)}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.empenhada)}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.pago)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={calcPercent(item.empenhada, item.atualizada)} className="h-2 flex-1" />
                          <span className="w-10 text-right text-xs">{calcPercent(item.empenhada, item.atualizada)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tabela por Secretaria */}
        <TabsContent value="secretaria" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Execucao por Secretaria</CardTitle>
              <CardDescription>Visao consolidada por secretaria</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Sigla</TableHead>
                    <TableHead>Secretaria</TableHead>
                    <TableHead className="text-right">Atualizada</TableHead>
                    <TableHead className="text-right">Empenhada</TableHead>
                    <TableHead className="text-right">A Empenhar</TableHead>
                    <TableHead className="text-right">Pago</TableHead>
                    <TableHead className="text-right">A Pagar</TableHead>
                    <TableHead className="w-32">Execucao</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosSecretarias.map((item) => (
                    <TableRow key={item.sigla}>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-xs">{item.sigla}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.atualizada)}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.empenhada)}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-muted-foreground">{formatCurrency(item.aEmpenhar)}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.pago)}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-amber-600">{formatCurrency(item.aPagar)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={calcPercent(item.empenhada, item.atualizada)} className="h-2 flex-1" />
                          <span className="w-10 text-right text-xs">{calcPercent(item.empenhada, item.atualizada)}%</span>
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

      {/* Graficos Adicionais */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Comparativo de Execucao */}
        <Card>
          <CardHeader>
            <CardTitle>Comparativo de Execucao por Secretaria</CardTitle>
            <CardDescription>Empenhado vs Pago por secretaria</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                empenhada: { label: "Empenhada", color: "var(--chart-1)" },
                pago: { label: "Pago", color: "var(--chart-2)" },
              } satisfies ChartConfig}
              className="h-[300px] w-full"
            >
              <BarChart
                data={dadosSecretarias.slice(0, 5).map(s => ({
                  sigla: s.sigla,
                  empenhada: s.empenhada,
                  pago: s.pago,
                }))}
                layout="vertical"
                margin={{ left: 60, right: 12 }}
              >
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(v) => `${(v/1000000).toFixed(0)}M`} />
                <YAxis dataKey="sigla" type="category" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                <Bar dataKey="empenhada" fill="var(--color-empenhada)" radius={[0, 4, 4, 0]} />
                <Bar dataKey="pago" fill="var(--color-pago)" radius={[0, 4, 4, 0]} />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Indicadores de Alerta */}
        <Card>
          <CardHeader>
            <CardTitle>Indicadores de Atencao</CardTitle>
            <CardDescription>Orgaos com execucao abaixo de 90%</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dadosOrgaos
              .filter(o => calcPercent(o.empenhada, o.atualizada) < 90)
              .sort((a, b) => calcPercent(a.empenhada, a.atualizada) - calcPercent(b.empenhada, b.atualizada))
              .map((item) => (
                <div key={item.codigo} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">{item.codigo}</Badge>
                      <span className="text-sm font-medium">{item.nome}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {calcPercent(item.empenhada, item.atualizada)}%
                    </span>
                  </div>
                  <Progress 
                    value={calcPercent(item.empenhada, item.atualizada)} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Empenhado: {formatCurrency(item.empenhada)}</span>
                    <span>Saldo: {formatCurrency(item.aEmpenhar)}</span>
                  </div>
                  <Separator />
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      {/* Resumo Analitico */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Analitico</CardTitle>
          <CardDescription>Indicadores de desempenho da execucao orcamentaria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Taxa de Execucao</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{calcPercent(totais.empenhada, totais.atualizada)}%</span>
                <Badge variant="secondary" className="text-xs">
                  <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-3" />
                  +5.2%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Comparado ao mesmo periodo do ano anterior</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Taxa de Pagamento</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{calcPercent(totais.pago, totais.empenhada)}%</span>
                <Badge variant="secondary" className="text-xs">
                  <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-3" />
                  +2.8%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Do total empenhado foi efetivamente pago</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Restos a Pagar</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{formatMillions(totais.aPagar)}</span>
                <Badge variant="outline" className="text-xs text-amber-600">
                  <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} className="size-3" />
                  -12%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Reducao em relacao ao ano anterior</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Saldo Disponivel</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{formatMillions(totais.aEmpenhar)}</span>
              </div>
              <p className="text-xs text-muted-foreground">{calcPercent(totais.aEmpenhar, totais.atualizada)}% do orcamento ainda disponivel</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alertas de Gestao */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Alertas e Notificacoes</h3>
        {alertasGestao.map((alerta, index) => (
          <Alert key={index} variant={alerta.tipo === "warning" ? "destructive" : "default"}>
            <HugeiconsIcon 
              icon={alerta.tipo === "warning" ? Alert02Icon : alerta.tipo === "success" ? CheckmarkCircle02Icon : InformationCircleIcon} 
              strokeWidth={2} 
              className="size-4" 
            />
            <AlertTitle className="flex items-center gap-2">
              {alerta.titulo}
              <Badge variant="outline" className="text-xs">{alerta.orgao}</Badge>
            </AlertTitle>
            <AlertDescription>{alerta.descricao}</AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Comparativo Anual e Categorias de Despesa */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Evolucao Historica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-5" />
              Evolucao Historica (5 anos)
            </CardTitle>
            <CardDescription>Comparativo da execucao orcamentaria anual</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                atualizada: { label: "Orcamento", color: "var(--chart-3)" },
                empenhada: { label: "Empenhado", color: "var(--chart-1)" },
                pago: { label: "Pago", color: "var(--chart-2)" },
              } satisfies ChartConfig}
              className="h-[280px] w-full"
            >
              <BarChart data={comparativoAnual} margin={{ left: 0, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="ano" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => `${(v/1000000).toFixed(0)}M`} />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                <Bar dataKey="atualizada" fill="var(--color-atualizada)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="empenhada" fill="var(--color-empenhada)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pago" fill="var(--color-pago)" radius={[4, 4, 0, 0]} />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Categoria Economica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={PieChart02Icon} strokeWidth={2} className="size-5" />
              Despesa por Categoria Economica
            </CardTitle>
            <CardDescription>Distribuicao por natureza da despesa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {treemapData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground">{formatCurrency(item.value)}</span>
                  </div>
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
                    <div 
                      className="h-full rounded-full transition-all" 
                      style={{ 
                        width: `${(item.value / totais.empenhada) * 100}%`,
                        backgroundColor: item.fill.replace('var(--', 'var(--color-').replace(')', ')').replace('--color-chart', '--chart')
                      }} 
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">
                    {calcPercent(item.value, totais.empenhada)}% do total empenhado
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Licitacoes e Top Fornecedores */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Modalidades de Licitacao */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={SecurityCheckIcon} strokeWidth={2} className="size-5" />
              Despesas por Modalidade de Licitacao
            </CardTitle>
            <CardDescription>Quantidade e valores por modalidade</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Modalidade</TableHead>
                  <TableHead className="text-center">Qtd</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-right">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modalidadeLicitacao.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.modalidade}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{item.quantidade}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(item.valor)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {calcPercent(item.valor, totais.empenhada)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Principais Fornecedores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={UserMultipleIcon} strokeWidth={2} className="size-5" />
              Principais Fornecedores
            </CardTitle>
            <CardDescription>Top 5 fornecedores por valor contratado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topFornecedores.map((fornecedor, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar size="sm">
                    <AvatarFallback>{index + 1}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{fornecedor.nome}</p>
                      <span className="text-sm font-semibold">{formatCurrency(fornecedor.valor)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{fornecedor.cnpj}</p>
                      <Badge variant="outline" className="text-xs">{fornecedor.percentual}%</Badge>
                    </div>
                    <Progress value={fornecedor.percentual * 5} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metas ODS e Timeline */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Metas ODS */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={Target01Icon} strokeWidth={2} className="size-5" />
              Alinhamento com Objetivos de Desenvolvimento Sustentavel
            </CardTitle>
            <CardDescription>Execucao orcamentaria vinculada aos ODS</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {metasODS.map((meta, index) => (
                <div key={index} className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <HugeiconsIcon 
                        icon={meta.ods === "ODS 3" ? HeartCheckIcon : meta.ods === "ODS 4" ? GraduationScrollIcon : meta.ods === "ODS 11" ? Building04Icon : StarIcon} 
                        strokeWidth={2} 
                        className="size-5 text-primary" 
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{meta.ods}</p>
                      <p className="text-xs text-muted-foreground">{meta.titulo}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Meta: {formatCurrency(meta.meta)}</span>
                      <span className="font-medium">{meta.percentual}%</span>
                    </div>
                    <Progress value={meta.percentual} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Realizado: {formatCurrency(meta.realizado)}
                    </p>
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
              <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} className="size-5" />
              Eventos Recentes
            </CardTitle>
            <CardDescription>Ultimas movimentacoes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventosRecentes.map((evento, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`size-2.5 rounded-full ${
                      evento.tipo === "empenho" ? "bg-blue-500" :
                      evento.tipo === "pagamento" ? "bg-green-500" :
                      evento.tipo === "licitacao" ? "bg-amber-500" :
                      evento.tipo === "liquidacao" ? "bg-purple-500" : "bg-gray-500"
                    }`} />
                    {index < eventosRecentes.length - 1 && (
                      <div className="w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-xs text-muted-foreground">{evento.data}</p>
                    <p className="text-sm">{evento.evento}</p>
                    <Badge variant="outline" className="mt-1 text-xs">{evento.secretaria}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secao de Analise Inteligente - Estilo IA */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <HugeiconsIcon icon={BulbIcon} strokeWidth={2} className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle>Analise Inteligente da Execucao Orcamentaria</CardTitle>
              <CardDescription>Insights gerados com base nos dados do periodo</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Visao Geral */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-foreground leading-relaxed">
              Analisando os dados de execucao orcamentaria do municipio para o exercicio de {periodoSelecionado}, 
              observa-se um <strong>desempenho satisfatorio</strong> na gestao fiscal, com taxa de execucao de{" "}
              <strong>{calcPercent(totais.empenhada, totais.atualizada)}%</strong> do orcamento atualizado de{" "}
              <strong>{formatCurrency(totais.atualizada)}</strong>. A relacao entre valores empenhados e pagos 
              demonstra boa capacidade de liquidacao, com <strong>{calcPercent(totais.pago, totais.empenhada)}%</strong>{" "}
              dos empenhos ja efetivamente pagos.
            </p>
          </div>

          <Separator />

          {/* Pontos de Destaque */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="destaques">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={Flag01Icon} strokeWidth={2} className="size-4 text-green-600" />
                  <span>Pontos de Destaque Positivo</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pl-6">
                  <div className="flex gap-2">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-4 mt-0.5 text-green-600 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Saude e Educacao com alta execucao:</strong> As secretarias de Saude (SEMSA) 
                      e Educacao (SEMED) apresentam as maiores taxas de execucao orcamentaria, ambas acima de 90%, 
                      demonstrando prioridade nas areas essenciais de atendimento a populacao.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-4 mt-0.5 text-green-600 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Reducao de Restos a Pagar:</strong> Houve diminuicao de 12% nos 
                      restos a pagar em comparacao ao ano anterior, indicando melhor planejamento financeiro e 
                      maior capacidade de liquidacao das despesas empenhadas.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-4 mt-0.5 text-green-600 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Crescimento sustentavel:</strong> O orcamento municipal apresenta 
                      crescimento medio de 9% ao ano nos ultimos 5 anos, com manutencao proporcional da capacidade 
                      de execucao.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="atencao">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} className="size-4 text-amber-600" />
                  <span>Pontos de Atencao</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pl-6">
                  <div className="flex gap-2">
                    <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-4 mt-0.5 text-amber-600 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Infraestrutura com execucao abaixo da media:</strong> A Secretaria 
                      de Infraestrutura (SEMINF) apresenta execucao de 86%, inferior a media municipal. Recomenda-se 
                      avaliacao dos processos licitatorios em andamento e possivel reprogramacao de cronogramas.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-4 mt-0.5 text-amber-600 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Concentracao de fornecedores:</strong> Os 5 principais fornecedores 
                      concentram aproximadamente 41% do valor total empenhado. Sugere-se diversificacao da base de 
                      fornecedores para reduzir riscos e aumentar a competitividade.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-4 mt-0.5 text-amber-600 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Saldo significativo a empenhar:</strong> Ainda restam{" "}
                      {formatCurrency(totais.aEmpenhar)} ({calcPercent(totais.aEmpenhar, totais.atualizada)}%) do 
                      orcamento a ser executado. Considerando o encerramento do exercicio, e necessario acelerar 
                      os processos de contratacao pendentes.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="recomendacoes">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={BulbIcon} strokeWidth={2} className="size-4 text-blue-600" />
                  <span>Recomendacoes Estrategicas</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pl-6">
                  <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                    <p className="text-sm font-medium text-foreground mb-1">1. Aceleracao da Execucao em Infraestrutura</p>
                    <p className="text-xs text-muted-foreground">
                      Implementar forca-tarefa para destravar processos licitatorios pendentes na SEMINF, 
                      priorizando obras com maior impacto social e cronograma viavel ate o final do exercicio.
                    </p>
                  </div>
                  <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                    <p className="text-sm font-medium text-foreground mb-1">2. Planejamento de Restos a Pagar</p>
                    <p className="text-xs text-muted-foreground">
                      Elaborar cronograma de liquidacao prioritaria para os {formatCurrency(totais.aPagar)} em 
                      restos a pagar, evitando acumulo excessivo para o proximo exercicio e garantindo 
                      conformidade com a LRF.
                    </p>
                  </div>
                  <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                    <p className="text-sm font-medium text-foreground mb-1">3. Ampliacao da Base de Fornecedores</p>
                    <p className="text-xs text-muted-foreground">
                      Desenvolver programa de fomento a participacao de micro e pequenas empresas locais em 
                      licitacoes, visando maior competitividade e desenvolvimento economico regional.
                    </p>
                  </div>
                  <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                    <p className="text-sm font-medium text-foreground mb-1">4. Monitoramento Continuo ODS</p>
                    <p className="text-xs text-muted-foreground">
                      Fortalecer o alinhamento das despesas aos Objetivos de Desenvolvimento Sustentavel, 
                      especialmente ODS 11 (Cidades Sustentaveis) que apresenta a menor taxa de execucao (86%).
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="projecoes">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={ChartLineData02Icon} strokeWidth={2} className="size-4 text-purple-600" />
                  <span>Projecoes e Cenarios</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pl-6">
                  <p className="text-sm text-muted-foreground">
                    Com base na tendencia historica e no ritmo atual de execucao, projeta-se para o 
                    encerramento do exercicio:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-2xl font-bold text-green-600">94%</p>
                      <p className="text-xs text-muted-foreground">Cenario Otimista</p>
                      <p className="text-xs text-muted-foreground">Execucao Final</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center bg-primary/5">
                      <p className="text-2xl font-bold text-primary">91%</p>
                      <p className="text-xs text-muted-foreground">Cenario Provavel</p>
                      <p className="text-xs text-muted-foreground">Execucao Final</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-2xl font-bold text-amber-600">88%</p>
                      <p className="text-xs text-muted-foreground">Cenario Conservador</p>
                      <p className="text-xs text-muted-foreground">Execucao Final</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    * Projecoes baseadas na media historica de execucao do ultimo trimestre dos exercicios 
                    anteriores e no saldo atual disponivel para empenho.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator />

          {/* Conclusao */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex gap-3">
              <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} className="size-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Conclusao da Analise</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A execucao orcamentaria do municipio encontra-se em patamar adequado para o periodo, 
                  com indicadores que demonstram responsabilidade fiscal e foco nas areas prioritarias 
                  de saude e educacao. Os pontos de atencao identificados sao gerenciaveis e, com as 
                  acoes recomendadas, o municipio tem condicoes de encerrar o exercicio com execucao 
                  superior a 90%, mantendo o padrao de qualidade na gestao dos recursos publicos.
                </p>
                <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                  Analise gerada em {new Date().toLocaleDateString('pt-BR')} as {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} 
                  {" "}| Dados referentes ao exercicio de {periodoSelecionado}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
