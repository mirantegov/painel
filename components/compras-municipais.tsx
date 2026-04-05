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
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  ShoppingCartIcon, 
  ContactIcon, 
  TrendingUp,
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  Building01Icon,
  CalendarIcon,
  DollarSign,
  UserIcon,
  ScaleIcon,
  WaveIcon
} from "@hugeicons/core-free-icons"

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
} satisfies ChartConfig

const chartConfigSecretarias = {
  contratos: {
    label: "Contratos",
    color: "#22c55e",
  },
  valor: {
    label: "Valor (R$)",
    color: "#16a34a",
  },
} satisfies ChartConfig

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

// Dados simulados para demonstração
const kpiData = [
  { 
    title: "Total Contratos Ativos", 
    value: "1.247", 
    change: "+12%", 
    trend: "up",
    icon: ContactIcon,
    description: "Contratos vigentes este mês"
  },
  { 
    title: "Valor Total Contratado", 
    value: "R$ 45.2M", 
    change: "+8%", 
    trend: "up",
    icon: DollarSign,
    description: "Valor acumulado dos contratos"
  },
  { 
    title: "Licitações em Andamento", 
    value: "38", 
    change: "-5%", 
    trend: "down",
    icon: WaveIcon,
    description: "Processos licitatórios ativos"
  },
  { 
    title: "Economia Obtida", 
    value: "R$ 3.8M", 
    change: "+23%", 
    trend: "up",
    icon: TrendingUp,
    description: "Economia sobre valor estimado"
  },
]

const monthlyData = [
  { month: "Jan", licitacoes: 12, contratos: 8, valor: 2800000, economia: 120000 },
  { month: "Fev", licitacoes: 15, contratos: 12, valor: 3200000, economia: 180000 },
  { month: "Mar", licitacoes: 18, contratos: 14, valor: 4100000, economia: 220000 },
  { month: "Abr", licitacoes: 14, contratos: 10, valor: 3500000, economia: 150000 },
  { month: "Mai", licitacoes: 22, contratos: 16, valor: 5200000, economia: 380000 },
  { month: "Jun", licitacoes: 25, contratos: 18, valor: 5800000, economia: 420000 },
]

const secretariaData = [
  { name: "Saúde", contratos: 342, valor: 15600000, percent: 28 },
  { name: "Educação", contratos: 287, valor: 12300000, percent: 22 },
  { name: "Obras", contratos: 198, valor: 8900000, percent: 16 },
  { name: "Segurança", contratos: 156, valor: 6700000, percent: 12 },
  { name: "Transporte", contratos: 134, valor: 5400000, percent: 10 },
  { name: "Outros", contratos: 130, valor: 6300000, percent: 12 },
]

const modalidadeData = [
  { name: "Pregão Eletrônico", value: 45, color: "#0088FE" },
  { name: "Tomada de Preços", value: 25, color: "#00C49F" },
  { name: "Concorrência", value: 20, color: "#FFBB28" },
  { name: "Dispensa", value: 7, color: "#FF8042" },
  { name: "Inexigibilidade", value: 3, color: "#8884D8" },
]

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
    progress: 75
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
    progress: 60
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
    progress: 45
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
    progress: 80
  },
]

const ongoingBids = [
  { 
    id: "LIC-2024-0089", 
    modalidade: "Pregão Eletrônico", 
    objeto: "Material de escritório", 
    valorEstimado: 450000, 
    status: "aberto",
    dataAbertura: "2024-06-15",
    prazo: "15 dias",
    participantes: 12
  },
  { 
    id: "LIC-2024-0088", 
    modalidade: "Concorrência", 
    objeto: "Serviços de TI", 
    valorEstimado: 2800000, 
    status: "em-analise",
    dataAbertura: "2024-06-10",
    prazo: "30 dias",
    participantes: 8
  },
  { 
    id: "LIC-2024-0087", 
    modalidade: "Tomada de Preços", 
    objeto: "Equipamentos de segurança", 
    valorEstimado: 1200000, 
    status: "aberto",
    dataAbertura: "2024-06-12",
    prazo: "20 dias",
    participantes: 15
  },
]

export function ComprasMunicipais() {
  const [selectedPeriod, setSelectedPeriod] = React.useState("6m")
  const [selectedSecretaria, setSelectedSecretaria] = React.useState("all")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatCompactCurrency = (value: number) => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}K`
    }
    return `R$ ${value}`
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { className: string; text: string }> = {
      "ativo": { 
        className: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700", 
        text: "Ativo" 
      },
      "em-andamento": { 
        className: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700", 
        text: "Em Andamento" 
      },
      "aberto": { 
        className: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700", 
        text: "Aberto" 
      },
      "em-analise": { 
        className: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-100 dark:border-purple-700", 
        text: "Em Análise" 
      },
      "suspenso": { 
        className: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-100 dark:border-red-700", 
        text: "Suspenso" 
      },
    }
    const config = statusConfig[status] || { 
      className: "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600", 
      text: status 
    }
    return <Badge className={config.className}>{config.text}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <HugeiconsIcon icon={kpi.icon} className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.description}</p>
              <div className="flex items-center pt-1">
                <Badge 
                  variant={kpi.trend === "up" ? "default" : "destructive"}
                  className="text-xs"
                >
                  {kpi.change}
                </Badge>
                <span className="text-xs text-muted-foreground ml-2">vs mês anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução Mensal</CardTitle>
            <CardDescription>Licitações, contratos e valores dos últimos 6 meses</CardDescription>
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
            <CardDescription>Distribuição de contratos e valores por órgão</CardDescription>
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
                  <Bar yAxisId="left" dataKey="contratos" fill="var(--color-contratos)" name="Contratos" />
                  <Bar yAxisId="right" dataKey="valor" fill="var(--color-valor)" name="Valor (R$)" />
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
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {modalidadeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Economy Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Análise de Economia</CardTitle>
            <CardDescription>Economia obtida vs valor estimado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Economizado</span>
                <span className="text-2xl font-bold text-green-600">R$ 3.8M</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Média mensal</span>
                  <span>R$ 633K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Percentual economia</span>
                  <span className="text-green-600">8.4%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Maior economia</span>
                  <span>R$ 420K (Jun)</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Contratos com economia</span>
                  <span>324 de 1.247</span>
                </div>
                <Progress value={26} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contract Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status dos Contratos</CardTitle>
            <CardDescription>Distribuição por situação atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Ativos</span>
                </div>
                <span className="font-medium">892 (71.5%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Em Andamento</span>
                </div>
                <span className="font-medium">245 (19.6%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Aguardando Início</span>
                </div>
                <span className="font-medium">78 (6.3%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Suspensos</span>
                </div>
                <span className="font-medium">32 (2.6%)</span>
              </div>
              <Separator />
              <div className="text-center">
                <div className="text-2xl font-bold">1.247</div>
                <div className="text-sm text-muted-foreground">Total de Contratos</div>
              </div>
            </div>
          </CardContent>
        </Card>
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
              <CardDescription>Últimos contratos registrados no sistema</CardDescription>
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
                      <TableCell className="font-medium">{contract.id}</TableCell>
                      <TableCell>{contract.secretaria}</TableCell>
                      <TableCell>{contract.fornecedor}</TableCell>
                      <TableCell className="max-w-xs truncate">{contract.objeto}</TableCell>
                      <TableCell>{formatCompactCurrency(contract.valor)}</TableCell>
                      <TableCell>{getStatusBadge(contract.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={contract.progress} className="w-16 h-2" />
                          <span className="text-xs text-muted-foreground">{contract.progress}%</span>
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
              <CardDescription>Processos licitatórios atualmente ativos</CardDescription>
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
                      <TableCell className="max-w-xs truncate">{bid.objeto}</TableCell>
                      <TableCell>{formatCompactCurrency(bid.valorEstimado)}</TableCell>
                      <TableCell>{getStatusBadge(bid.status)}</TableCell>
                      <TableCell>{bid.prazo}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4 text-muted-foreground" />
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
    </div>
  )
}
