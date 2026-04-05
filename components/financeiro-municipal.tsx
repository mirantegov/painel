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
import { ScrollArea } from '@/components/ui/scroll-area'
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
  Clock01Icon,
  Flag01Icon,
  StarIcon,
  Alert02Icon,
  MoneyAdd01Icon,
  MoneySend01Icon,
  BankIcon,
  Building04Icon,
  Home01Icon,
  CreditCardIcon,
  CoinsSwapIcon,
  Calculator01Icon,
  FolderCheckIcon,
  UserMultipleIcon,
  Coins01Icon,
  MoneyExchange01Icon,
} from "@hugeicons/core-free-icons"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Formatadores
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

const formatMillions = (value: number) => {
  return `R$ ${(value / 1000000).toFixed(1)}M`
}

const calcPercent = (value: number, total: number) => {
  return ((value / total) * 100).toFixed(1)
}

// Dados de fontes de recursos
const fontesRecursos = [
  { codigo: "100", nome: "Recursos Ordinarios", saldoInicial: 12500000, entradas: 45800000, saidas: 42300000, saldoAtual: 16000000 },
  { codigo: "101", nome: "Receitas de Impostos - Educacao", saldoInicial: 4200000, entradas: 18900000, saidas: 17800000, saldoAtual: 5300000 },
  { codigo: "102", nome: "Receitas de Impostos - Saude", saldoInicial: 3800000, entradas: 22400000, saidas: 21600000, saldoAtual: 4600000 },
  { codigo: "114", nome: "FUNDEB", saldoInicial: 2100000, entradas: 28500000, saidas: 27200000, saldoAtual: 3400000 },
  { codigo: "115", nome: "Transferencias SUS", saldoInicial: 1800000, entradas: 15600000, saidas: 14900000, saldoAtual: 2500000 },
  { codigo: "159", nome: "Convenios Federais", saldoInicial: 850000, entradas: 4200000, saidas: 3100000, saldoAtual: 1950000 },
  { codigo: "259", nome: "Convenios Estaduais", saldoInicial: 620000, entradas: 2800000, saidas: 2400000, saldoAtual: 1020000 },
]

// Dados de contas bancarias
const contasBancarias = [
  { banco: "Banco do Brasil", agencia: "1234-5", conta: "12345-6", tipo: "Movimento", fonte: "100", saldo: 8500000, status: "conciliada" },
  { banco: "Banco do Brasil", agencia: "1234-5", conta: "12346-7", tipo: "Vinculada Educacao", fonte: "101", saldo: 3200000, status: "conciliada" },
  { banco: "Banco do Brasil", agencia: "1234-5", conta: "12347-8", tipo: "Vinculada Saude", fonte: "102", saldo: 2800000, status: "pendente" },
  { banco: "Caixa Economica", agencia: "0567", conta: "98765-4", tipo: "FUNDEB", fonte: "114", saldo: 3400000, status: "conciliada" },
  { banco: "Caixa Economica", agencia: "0567", conta: "98766-5", tipo: "Convenios", fonte: "159", saldo: 1950000, status: "divergente" },
  { banco: "Banco do Brasil", agencia: "1234-5", conta: "12348-9", tipo: "Aplicacoes", fonte: "100", saldo: 5200000, status: "conciliada" },
]

// Dados de receitas lancadas
const receitasLancadas = [
  { data: "29/11/2024", documento: "DAM-2024-15678", contribuinte: "Empresa Alpha Ltda", tipo: "ISS", valor: 45800, status: "pago" },
  { data: "28/11/2024", documento: "DAM-2024-15677", contribuinte: "Comercio Beta SA", tipo: "ISS", valor: 32500, status: "pago" },
  { data: "28/11/2024", documento: "IPTU-2024-8901", contribuinte: "Maria Silva", tipo: "IPTU", valor: 2800, status: "pendente" },
  { data: "27/11/2024", documento: "ITBI-2024-456", contribuinte: "Joao Santos", tipo: "ITBI", valor: 18500, status: "pago" },
  { data: "27/11/2024", documento: "DAM-2024-15676", contribuinte: "Servicos Gama", tipo: "ISS", valor: 28900, status: "vencido" },
  { data: "26/11/2024", documento: "TAXA-2024-789", contribuinte: "Restaurante Delta", tipo: "Taxa", valor: 1200, status: "pago" },
]

// Dados de aplicacoes financeiras
const aplicacoesFinanceiras = [
  { instituicao: "Banco do Brasil", tipo: "CDB", dataAplicacao: "01/01/2024", valorAplicado: 3000000, rendimento: 285000, saldoAtual: 3285000, taxa: "102% CDI" },
  { instituicao: "Caixa Economica", tipo: "Fundo RF", dataAplicacao: "15/03/2024", valorAplicado: 1500000, rendimento: 98500, saldoAtual: 1598500, taxa: "98% CDI" },
  { instituicao: "Banco do Brasil", tipo: "Poupanca", dataAplicacao: "01/06/2024", valorAplicado: 800000, rendimento: 32000, saldoAtual: 832000, taxa: "TR + 0.5%" },
]

// Ultimos pagamentos
const ultimosPagamentos = [
  { data: "29/11/2024", empenho: "2024NE003456", credor: "Construtora Silva", valor: 185000, fonte: "159", tipo: "Obra" },
  { data: "29/11/2024", empenho: "2024NE003455", credor: "Distribuidora de Medicamentos", valor: 89500, fonte: "102", tipo: "Material" },
  { data: "28/11/2024", empenho: "2024NE003450", credor: "Merenda Escolar Ltda", valor: 156000, fonte: "101", tipo: "Alimentacao" },
  { data: "28/11/2024", empenho: "2024NE003448", credor: "Combustiveis XYZ", valor: 45800, fonte: "100", tipo: "Combustivel" },
  { data: "27/11/2024", empenho: "2024NE003445", credor: "Empresa de Limpeza", valor: 78900, fonte: "100", tipo: "Servico" },
]

// Maiores fornecedores/credores
const maioresFornecedores = [
  { nome: "Construtora Silva & Associados", cnpj: "12.345.678/0001-90", totalPago: 8500000, aPagar: 2100000, contratos: 3 },
  { nome: "Distribuidora de Medicamentos ABC", cnpj: "23.456.789/0001-01", totalPago: 5200000, aPagar: 890000, contratos: 2 },
  { nome: "Merenda Escolar Ltda", cnpj: "34.567.890/0001-12", totalPago: 4800000, aPagar: 650000, contratos: 1 },
  { nome: "Transporte Urbano SA", cnpj: "45.678.901/0001-23", totalPago: 3900000, aPagar: 420000, contratos: 1 },
  { nome: "Tecnologia Municipal", cnpj: "56.789.012/0001-34", totalPago: 2100000, aPagar: 180000, contratos: 4 },
]

// Maiores contribuintes
const maioresContribuintes = [
  { nome: "Supermercados Uniao SA", cnpj: "11.222.333/0001-44", arrecadado: 1850000, tributo: "ISS", regularidade: "regular" },
  { nome: "Banco Nacional SA", cnpj: "22.333.444/0001-55", arrecadado: 1420000, tributo: "ISS", regularidade: "regular" },
  { nome: "Shopping Center Norte", cnpj: "33.444.555/0001-66", arrecadado: 980000, tributo: "ISS/IPTU", regularidade: "regular" },
  { nome: "Construtora Omega", cnpj: "44.555.666/0001-77", arrecadado: 750000, tributo: "ITBI", regularidade: "irregular" },
  { nome: "Industria Metalurgica Beta", cnpj: "55.666.777/0001-88", arrecadado: 620000, tributo: "ISS", regularidade: "regular" },
]

// Saldos a pagar por vencimento
const saldosAPagar = [
  { vencimento: "Vencidos", quantidade: 45, valor: 1250000, percentual: 8 },
  { vencimento: "Ate 7 dias", quantidade: 89, valor: 3200000, percentual: 21 },
  { vencimento: "8-15 dias", quantidade: 67, valor: 2800000, percentual: 18 },
  { vencimento: "16-30 dias", quantidade: 124, valor: 4500000, percentual: 29 },
  { vencimento: "Acima 30 dias", quantidade: 98, valor: 3650000, percentual: 24 },
]

// Saldos a receber
const saldosAReceber = [
  { tipo: "IPTU", vencido: 2800000, aVencer: 4200000, total: 7000000 },
  { tipo: "ISS", vencido: 850000, aVencer: 1200000, total: 2050000 },
  { tipo: "ITBI", vencido: 120000, aVencer: 380000, total: 500000 },
  { tipo: "Taxas", vencido: 450000, aVencer: 680000, total: 1130000 },
  { tipo: "Divida Ativa", vencido: 12500000, aVencer: 0, total: 12500000 },
]

// Eventos por tipo
const eventosEmpenhos = [
  { data: "29/11/2024", hora: "16:45", descricao: "Empenho 2024NE003458 - Material de escritorio", valor: 12500 },
  { data: "29/11/2024", hora: "14:30", descricao: "Empenho 2024NE003457 - Servicos de manutencao", valor: 45800 },
  { data: "29/11/2024", hora: "11:20", descricao: "Empenho 2024NE003456 - Obra pavimentacao", valor: 185000 },
  { data: "28/11/2024", hora: "17:15", descricao: "Empenho 2024NE003455 - Medicamentos", valor: 89500 },
  { data: "28/11/2024", hora: "09:45", descricao: "Empenho 2024NE003454 - Combustivel", valor: 32000 },
]

const eventosLiquidacoes = [
  { data: "29/11/2024", hora: "17:00", descricao: "Liquidacao 2024NL002890 - Construtora Silva", valor: 185000 },
  { data: "29/11/2024", hora: "15:30", descricao: "Liquidacao 2024NL002889 - Distribuidora ABC", valor: 89500 },
  { data: "28/11/2024", hora: "16:45", descricao: "Liquidacao 2024NL002888 - Merenda Escolar", valor: 156000 },
  { data: "28/11/2024", hora: "14:20", descricao: "Liquidacao 2024NL002887 - Combustiveis XYZ", valor: 45800 },
  { data: "27/11/2024", hora: "11:30", descricao: "Liquidacao 2024NL002886 - Empresa Limpeza", valor: 78900 },
]

const eventosPagamentos = [
  { data: "29/11/2024", hora: "17:30", descricao: "OB 2024OB004567 - Construtora Silva", valor: 185000 },
  { data: "29/11/2024", hora: "16:00", descricao: "OB 2024OB004566 - Distribuidora ABC", valor: 89500 },
  { data: "28/11/2024", hora: "17:00", descricao: "OB 2024OB004565 - Merenda Escolar", valor: 156000 },
  { data: "28/11/2024", hora: "15:30", descricao: "OB 2024OB004564 - Combustiveis XYZ", valor: 45800 },
  { data: "27/11/2024", hora: "14:00", descricao: "OB 2024OB004563 - Empresa Limpeza", valor: 78900 },
]

const eventosArrecadacao = [
  { data: "29/11/2024", hora: "18:00", descricao: "Credito FPM - Cota Decendial", valor: 2850000 },
  { data: "29/11/2024", hora: "12:30", descricao: "Arrecadacao ISS - Empresas diversas", valor: 185000 },
  { data: "28/11/2024", hora: "18:00", descricao: "Credito ICMS - Cota Parte", valor: 1200000 },
  { data: "28/11/2024", hora: "14:45", descricao: "Arrecadacao IPTU - Guias diversas", valor: 89000 },
  { data: "27/11/2024", hora: "16:30", descricao: "Credito FUNDEB - Complementacao", valor: 420000 },
]

const eventosTransferencias = [
  { data: "29/11/2024", hora: "15:00", descricao: "Transf. Conta Movimento para Aplicacao", valor: 500000 },
  { data: "28/11/2024", hora: "11:00", descricao: "Resgate Aplicacao para Pagamentos", valor: 350000 },
  { data: "27/11/2024", hora: "14:30", descricao: "Transf. entre fontes - Remanejamento", valor: 120000 },
  { data: "26/11/2024", hora: "16:00", descricao: "Aplicacao recursos FUNDEB", valor: 280000 },
  { data: "25/11/2024", hora: "10:30", descricao: "Transf. Conta Vinculada Saude", valor: 450000 },
]

// Conciliacoes bancarias
const conciliacoesBancarias = [
  { conta: "12345-6", banco: "BB", competencia: "Nov/2024", saldoBanco: 8500000, saldoContabil: 8500000, diferenca: 0, status: "conciliada" },
  { conta: "12346-7", banco: "BB", competencia: "Nov/2024", saldoBanco: 3200000, saldoContabil: 3200000, diferenca: 0, status: "conciliada" },
  { conta: "12347-8", banco: "BB", competencia: "Nov/2024", saldoBanco: 2850000, saldoContabil: 2800000, diferenca: 50000, status: "pendente" },
  { conta: "98765-4", banco: "CEF", competencia: "Nov/2024", saldoBanco: 3400000, saldoContabil: 3400000, diferenca: 0, status: "conciliada" },
  { conta: "98766-5", banco: "CEF", competencia: "Nov/2024", saldoBanco: 1980000, saldoContabil: 1950000, diferenca: 30000, status: "divergente" },
]

// Fluxo de caixa mensal
const fluxoCaixaMensal = [
  { mes: "Jan", entradas: 11200000, saidas: 10800000, saldo: 400000 },
  { mes: "Fev", entradas: 10800000, saidas: 10500000, saldo: 300000 },
  { mes: "Mar", entradas: 12500000, saidas: 11800000, saldo: 700000 },
  { mes: "Abr", entradas: 11800000, saidas: 11200000, saldo: 600000 },
  { mes: "Mai", entradas: 12200000, saidas: 11500000, saldo: 700000 },
  { mes: "Jun", entradas: 13500000, saidas: 12800000, saldo: 700000 },
  { mes: "Jul", entradas: 12800000, saidas: 12200000, saldo: 600000 },
  { mes: "Ago", entradas: 13200000, saidas: 12500000, saldo: 700000 },
  { mes: "Set", entradas: 12500000, saidas: 12000000, saldo: 500000 },
  { mes: "Out", entradas: 13800000, saidas: 13200000, saldo: 600000 },
  { mes: "Nov", entradas: 14200000, saidas: 13500000, saldo: 700000 },
]

// Totais gerais
const totaisFinanceiros = {
  saldoTotal: 34770000,
  totalEntradas: 138400000,
  totalSaidas: 131500000,
  aplicacoes: 5715500,
  aPagar: 15400000,
  aReceber: 23180000,
}

// Alertas
const alertasFinanceiros = [
  { tipo: "warning", titulo: "Conta com divergencia", descricao: "A conta 98766-5 apresenta divergencia de R$ 30.000 na conciliacao bancaria de novembro.", conta: "CEF 98766-5" },
  { tipo: "warning", titulo: "Saldo baixo em conta vinculada", descricao: "A conta de Convenios apresenta saldo abaixo do minimo recomendado para honrar compromissos.", conta: "CEF 98765-4" },
  { tipo: "info", titulo: "Vencimentos proximos", descricao: "Existem 89 empenhos com vencimento nos proximos 7 dias totalizando R$ 3,2 milhoes.", valor: "R$ 3,2M" },
  { tipo: "success", titulo: "Conciliacao em dia", descricao: "4 de 5 contas bancarias estao com a conciliacao atualizada e sem divergencias.", percentual: "80%" },
]

export function FinanceiroMunicipal() {
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024")
  const [abaSelecionada, setAbaSelecionada] = React.useState("fontes")

  return (
    <div className="space-y-6">
      {/* Header com filtros */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestao Financeira</h2>
          <p className="text-sm text-muted-foreground">Controle de tesouraria e fluxo de caixa</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <HugeiconsIcon icon={FilterIcon} strokeWidth={2} className="mr-2 size-4" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <HugeiconsIcon icon={Download01Icon} strokeWidth={2} className="mr-2 size-4" />
            Exportar
          </Button>
          <Button variant="outline" size="icon" className="size-8">
            <HugeiconsIcon icon={RefreshIcon} strokeWidth={2} className="size-4" />
          </Button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <HugeiconsIcon icon={Wallet01Icon} strokeWidth={2} className="size-4" />
              Saldo Total em Contas
            </CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(totaisFinanceiros.saldoTotal)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-3 text-green-600" />
              <span className="text-green-600">+2.3%</span>
              <span>vs. mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <HugeiconsIcon icon={MoneyAdd01Icon} strokeWidth={2} className="size-4" />
              Total Entradas (Ano)
            </CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(totaisFinanceiros.totalEntradas)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-3 text-green-600" />
              <span className="text-green-600">+8.5%</span>
              <span>vs. ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <HugeiconsIcon icon={MoneySend01Icon} strokeWidth={2} className="size-4" />
              Total Saidas (Ano)
            </CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(totaisFinanceiros.totalSaidas)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-3 text-amber-600" />
              <span className="text-amber-600">+6.2%</span>
              <span>vs. ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <HugeiconsIcon icon={CoinsSwapIcon} strokeWidth={2} className="size-4" />
              Aplicacoes Financeiras
            </CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(totaisFinanceiros.aplicacoes)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Rendimento acumulado:</span>
              <span className="text-green-600 font-medium">R$ 415,5K</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fluxo de Caixa */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon icon={ChartLineData02Icon} strokeWidth={2} className="size-5" />
                Fluxo de Caixa Mensal
              </CardTitle>
              <CardDescription>Entradas, saidas e saldo acumulado</CardDescription>
            </div>
            <Badge variant="secondary" className="text-green-600">
              Superavit: {formatCurrency(totaisFinanceiros.totalEntradas - totaisFinanceiros.totalSaidas)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              entradas: { label: "Entradas", color: "var(--chart-2)" },
              saidas: { label: "Saidas", color: "var(--chart-1)" },
              saldo: { label: "Saldo", color: "var(--chart-4)" },
            } satisfies ChartConfig}
            className="h-[300px] w-full"
          >
            <AreaChart data={fluxoCaixaMensal} margin={{ left: 0, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => `${(v/1000000).toFixed(0)}M`} />
              <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
              <Area type="monotone" dataKey="entradas" fill="var(--color-entradas)" fillOpacity={0.3} stroke="var(--color-entradas)" strokeWidth={2} />
              <Area type="monotone" dataKey="saidas" fill="var(--color-saidas)" fillOpacity={0.3} stroke="var(--color-saidas)" strokeWidth={2} />
              <Line type="monotone" dataKey="saldo" stroke="var(--color-saldo)" strokeWidth={2} dot={false} />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Alertas Financeiros */}
      <div className="grid gap-3 lg:grid-cols-2">
        {alertasFinanceiros.map((alerta, index) => (
          <Alert key={index} variant={alerta.tipo === "warning" ? "destructive" : "default"}>
            <HugeiconsIcon 
              icon={alerta.tipo === "warning" ? Alert02Icon : alerta.tipo === "success" ? CheckmarkCircle02Icon : InformationCircleIcon} 
              strokeWidth={2} 
              className="size-4" 
            />
            <AlertTitle className="flex items-center gap-2">
              {alerta.titulo}
              {alerta.conta && <Badge variant="outline" className="text-xs">{alerta.conta}</Badge>}
            </AlertTitle>
            <AlertDescription>{alerta.descricao}</AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Controles Detalhados em Tabs */}
      <Tabs value={abaSelecionada} onValueChange={setAbaSelecionada} className="w-full">
        <TabsList className="flex w-full flex-wrap h-auto gap-1">
          <TabsTrigger value="fontes" className="text-xs">Fontes</TabsTrigger>
          <TabsTrigger value="contas" className="text-xs">Contas</TabsTrigger>
          <TabsTrigger value="receitas" className="text-xs">Receitas</TabsTrigger>
          <TabsTrigger value="aplicacoes" className="text-xs">Aplicacoes</TabsTrigger>
          <TabsTrigger value="pagamentos" className="text-xs">Pagamentos</TabsTrigger>
          <TabsTrigger value="conciliacao" className="text-xs">Conciliacao</TabsTrigger>
        </TabsList>

        {/* Fontes de Recursos */}
        <TabsContent value="fontes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon icon={Building06Icon} strokeWidth={2} className="size-5" />
                Controle por Fonte de Recursos
              </CardTitle>
              <CardDescription>Movimentacao financeira por fonte</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Codigo</TableHead>
                    <TableHead>Fonte</TableHead>
                    <TableHead className="text-right">Saldo Inicial</TableHead>
                    <TableHead className="text-right">Entradas</TableHead>
                    <TableHead className="text-right">Saidas</TableHead>
                    <TableHead className="text-right">Saldo Atual</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fontesRecursos.map((fonte) => (
                    <TableRow key={fonte.codigo}>
                      <TableCell><Badge variant="outline">{fonte.codigo}</Badge></TableCell>
                      <TableCell className="font-medium">{fonte.nome}</TableCell>
                      <TableCell className="text-right">{formatCurrency(fonte.saldoInicial)}</TableCell>
                      <TableCell className="text-right text-green-600">{formatCurrency(fonte.entradas)}</TableCell>
                      <TableCell className="text-right text-red-600">{formatCurrency(fonte.saidas)}</TableCell>
                      <TableCell className="text-right font-semibold">{formatCurrency(fonte.saldoAtual)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right font-bold">{formatCurrency(fontesRecursos.reduce((a, b) => a + b.saldoInicial, 0))}</TableCell>
                    <TableCell className="text-right font-bold text-green-600">{formatCurrency(fontesRecursos.reduce((a, b) => a + b.entradas, 0))}</TableCell>
                    <TableCell className="text-right font-bold text-red-600">{formatCurrency(fontesRecursos.reduce((a, b) => a + b.saidas, 0))}</TableCell>
                    <TableCell className="text-right font-bold">{formatCurrency(fontesRecursos.reduce((a, b) => a + b.saldoAtual, 0))}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contas Bancarias */}
        <TabsContent value="contas" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon icon={BankIcon} strokeWidth={2} className="size-5" />
                Controle por Conta Bancaria
              </CardTitle>
              <CardDescription>Saldo e status das contas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {contasBancarias.map((conta, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-1 h-full ${
                      conta.status === "conciliada" ? "bg-green-500" :
                      conta.status === "pendente" ? "bg-amber-500" : "bg-red-500"
                    }`} />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardDescription className="font-medium">{conta.banco}</CardDescription>
                        <Badge variant={conta.status === "conciliada" ? "secondary" : conta.status === "pendente" ? "outline" : "destructive"} className="text-xs">
                          {conta.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{conta.tipo}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Ag: {conta.agencia} / CC: {conta.conta}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs text-muted-foreground">Fonte {conta.fonte}</span>
                          <span className="text-xl font-bold">{formatCurrency(conta.saldo)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Receitas Lancadas */}
        <TabsContent value="receitas" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon icon={Invoice01Icon} strokeWidth={2} className="size-5" />
                Receitas Lancadas
              </CardTitle>
              <CardDescription>Ultimos lancamentos de receitas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Contribuinte</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receitasLancadas.map((receita, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-muted-foreground">{receita.data}</TableCell>
                      <TableCell className="font-mono text-xs">{receita.documento}</TableCell>
                      <TableCell className="font-medium">{receita.contribuinte}</TableCell>
                      <TableCell><Badge variant="outline">{receita.tipo}</Badge></TableCell>
                      <TableCell className="text-right">{formatCurrency(receita.valor)}</TableCell>
                      <TableCell>
                        <Badge variant={receita.status === "pago" ? "secondary" : receita.status === "pendente" ? "outline" : "destructive"}>
                          {receita.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aplicacoes Financeiras */}
        <TabsContent value="aplicacoes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon icon={Coins01Icon} strokeWidth={2} className="size-5" />
                Aplicacoes Financeiras
              </CardTitle>
              <CardDescription>Investimentos e rendimentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aplicacoesFinanceiras.map((app, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <HugeiconsIcon icon={BankIcon} strokeWidth={2} className="size-4 text-muted-foreground" />
                          <span className="font-medium">{app.instituicao}</span>
                          <Badge variant="secondary">{app.tipo}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Aplicado em: {app.dataAplicacao} | Taxa: {app.taxa}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xs text-muted-foreground">Aplicado</p>
                          <p className="font-semibold">{formatCurrency(app.valorAplicado)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Rendimento</p>
                          <p className="font-semibold text-green-600">+{formatCurrency(app.rendimento)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Saldo Atual</p>
                          <p className="font-bold">{formatCurrency(app.saldoAtual)}</p>
                        </div>
                      </div>
                    </div>
                    <Progress value={(app.rendimento / app.valorAplicado) * 100} className="mt-3 h-1.5" />
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-muted p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total em Aplicacoes</span>
                  <span className="text-xl font-bold">{formatCurrency(aplicacoesFinanceiras.reduce((a, b) => a + b.saldoAtual, 0))}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pagamentos */}
        <TabsContent value="pagamentos" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} className="size-5" />
                Controle de Pagamentos
              </CardTitle>
              <CardDescription>Ultimos pagamentos realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Empenho</TableHead>
                    <TableHead>Credor</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fonte</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ultimosPagamentos.map((pag, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-muted-foreground">{pag.data}</TableCell>
                      <TableCell className="font-mono text-xs">{pag.empenho}</TableCell>
                      <TableCell className="font-medium">{pag.credor}</TableCell>
                      <TableCell><Badge variant="outline">{pag.tipo}</Badge></TableCell>
                      <TableCell><Badge variant="secondary">{pag.fonte}</Badge></TableCell>
                      <TableCell className="text-right font-semibold">{formatCurrency(pag.valor)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conciliacao */}
        <TabsContent value="conciliacao" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon icon={FolderCheckIcon} strokeWidth={2} className="size-5" />
                Conciliacoes Bancarias
              </CardTitle>
              <CardDescription>Status das conciliacoes do periodo</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Conta</TableHead>
                    <TableHead>Banco</TableHead>
                    <TableHead>Competencia</TableHead>
                    <TableHead className="text-right">Saldo Banco</TableHead>
                    <TableHead className="text-right">Saldo Contabil</TableHead>
                    <TableHead className="text-right">Diferenca</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conciliacoesBancarias.map((conc, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{conc.conta}</TableCell>
                      <TableCell>{conc.banco}</TableCell>
                      <TableCell>{conc.competencia}</TableCell>
                      <TableCell className="text-right">{formatCurrency(conc.saldoBanco)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(conc.saldoContabil)}</TableCell>
                      <TableCell className={`text-right ${conc.diferenca > 0 ? "text-red-600 font-medium" : ""}`}>
                        {formatCurrency(conc.diferenca)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={conc.status === "conciliada" ? "secondary" : conc.status === "pendente" ? "outline" : "destructive"}>
                          {conc.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Maiores Fornecedores e Contribuintes lado a lado */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Maiores Fornecedores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={Building04Icon} strokeWidth={2} className="size-5" />
              Maiores Fornecedores/Credores
            </CardTitle>
            <CardDescription>Top 5 por valor total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maioresFornecedores.map((forn, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar size="sm">
                    <AvatarFallback className="text-xs">{index + 1}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate max-w-[180px]">{forn.nome}</p>
                      <span className="text-sm font-semibold">{formatCurrency(forn.totalPago)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{forn.cnpj}</span>
                      <Badge variant="outline" className="text-xs">A pagar: {formatCurrency(forn.aPagar)}</Badge>
                    </div>
                    <Progress value={(forn.totalPago / maioresFornecedores[0].totalPago) * 100} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Maiores Contribuintes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={UserMultipleIcon} strokeWidth={2} className="size-5" />
              Maiores Contribuintes
            </CardTitle>
            <CardDescription>Top 5 por arrecadacao</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maioresContribuintes.map((cont, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar size="sm">
                    <AvatarFallback className="text-xs">{index + 1}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate max-w-[180px]">{cont.nome}</p>
                      <span className="text-sm font-semibold text-green-600">{formatCurrency(cont.arrecadado)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{cont.cnpj}</span>
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">{cont.tributo}</Badge>
                        <Badge variant={cont.regularidade === "regular" ? "secondary" : "destructive"} className="text-xs">
                          {cont.regularidade}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={(cont.arrecadado / maioresContribuintes[0].arrecadado) * 100} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saldos a Pagar e a Receber */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Saldos a Pagar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={MoneySend01Icon} strokeWidth={2} className="size-5 text-red-600" />
              Saldos a Pagar por Vencimento
            </CardTitle>
            <CardDescription>Total: {formatCurrency(totaisFinanceiros.aPagar)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {saldosAPagar.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${item.vencimento === "Vencidos" ? "text-red-600" : ""}`}>
                        {item.vencimento}
                      </span>
                      <Badge variant="secondary" className="text-xs">{item.quantidade}</Badge>
                    </div>
                    <span className="font-semibold">{formatCurrency(item.valor)}</span>
                  </div>
                  <Progress value={item.percentual} className={`h-2 ${item.vencimento === "Vencidos" ? "[&>div]:bg-red-500" : ""}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Saldos a Receber */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={MoneyReceiveSquareIcon} strokeWidth={2} className="size-5 text-green-600" />
              Saldos a Receber por Tipo
            </CardTitle>
            <CardDescription>Total: {formatCurrency(totaisFinanceiros.aReceber)}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Vencido</TableHead>
                  <TableHead className="text-right">A Vencer</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {saldosAReceber.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.tipo}</TableCell>
                    <TableCell className="text-right text-red-600">{formatCurrency(item.vencido)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{formatCurrency(item.aVencer)}</TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(item.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right font-bold text-red-600">
                    {formatCurrency(saldosAReceber.reduce((a, b) => a + b.vencido, 0))}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(saldosAReceber.reduce((a, b) => a + b.aVencer, 0))}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(saldosAReceber.reduce((a, b) => a + b.total, 0))}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Eventos Recentes por Tipo - Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} className="size-5" />
            Eventos Recentes por Tipo
          </CardTitle>
          <CardDescription>Ultimas movimentacoes do sistema financeiro</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="empenhos" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="empenhos" className="text-xs">Empenhos</TabsTrigger>
              <TabsTrigger value="liquidacoes" className="text-xs">Liquidacoes</TabsTrigger>
              <TabsTrigger value="pagamentos" className="text-xs">Pagamentos</TabsTrigger>
              <TabsTrigger value="arrecadacao" className="text-xs">Arrecadacao</TabsTrigger>
              <TabsTrigger value="transferencias" className="text-xs">Transf.</TabsTrigger>
            </TabsList>

            <TabsContent value="empenhos" className="mt-4">
              <div className="space-y-3">
                {eventosEmpenhos.map((evento, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2.5 rounded-full bg-blue-500" />
                      {index < eventosEmpenhos.length - 1 && <div className="w-px flex-1 bg-border" />}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{evento.data} - {evento.hora}</p>
                        <Badge variant="secondary">{formatCurrency(evento.valor)}</Badge>
                      </div>
                      <p className="text-sm">{evento.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="liquidacoes" className="mt-4">
              <div className="space-y-3">
                {eventosLiquidacoes.map((evento, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2.5 rounded-full bg-purple-500" />
                      {index < eventosLiquidacoes.length - 1 && <div className="w-px flex-1 bg-border" />}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{evento.data} - {evento.hora}</p>
                        <Badge variant="secondary">{formatCurrency(evento.valor)}</Badge>
                      </div>
                      <p className="text-sm">{evento.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pagamentos" className="mt-4">
              <div className="space-y-3">
                {eventosPagamentos.map((evento, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2.5 rounded-full bg-red-500" />
                      {index < eventosPagamentos.length - 1 && <div className="w-px flex-1 bg-border" />}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{evento.data} - {evento.hora}</p>
                        <Badge variant="secondary">{formatCurrency(evento.valor)}</Badge>
                      </div>
                      <p className="text-sm">{evento.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="arrecadacao" className="mt-4">
              <div className="space-y-3">
                {eventosArrecadacao.map((evento, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2.5 rounded-full bg-green-500" />
                      {index < eventosArrecadacao.length - 1 && <div className="w-px flex-1 bg-border" />}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{evento.data} - {evento.hora}</p>
                        <Badge variant="secondary" className="text-green-600">{formatCurrency(evento.valor)}</Badge>
                      </div>
                      <p className="text-sm">{evento.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="transferencias" className="mt-4">
              <div className="space-y-3">
                {eventosTransferencias.map((evento, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2.5 rounded-full bg-amber-500" />
                      {index < eventosTransferencias.length - 1 && <div className="w-px flex-1 bg-border" />}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{evento.data} - {evento.hora}</p>
                        <Badge variant="outline">{formatCurrency(evento.valor)}</Badge>
                      </div>
                      <p className="text-sm">{evento.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Resumo Analitico */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={Calculator01Icon} strokeWidth={2} className="size-5" />
            Resumo Analitico Financeiro
          </CardTitle>
          <CardDescription>Indicadores de saude financeira</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2 text-center p-4 rounded-lg bg-muted/50">
              <p className="text-sm font-medium text-muted-foreground">Indice de Liquidez</p>
              <p className="text-3xl font-bold text-green-600">2.26</p>
              <p className="text-xs text-muted-foreground">Saldo / A Pagar</p>
              <Badge variant="secondary" className="text-green-600">Excelente</Badge>
            </div>
            <div className="space-y-2 text-center p-4 rounded-lg bg-muted/50">
              <p className="text-sm font-medium text-muted-foreground">Taxa de Conciliacao</p>
              <p className="text-3xl font-bold">80%</p>
              <p className="text-xs text-muted-foreground">4 de 5 contas</p>
              <Badge variant="outline">Boa</Badge>
            </div>
            <div className="space-y-2 text-center p-4 rounded-lg bg-muted/50">
              <p className="text-sm font-medium text-muted-foreground">Rendimento Aplicacoes</p>
              <p className="text-3xl font-bold text-green-600">7.8%</p>
              <p className="text-xs text-muted-foreground">Acumulado no ano</p>
              <Badge variant="secondary" className="text-green-600">Acima CDI</Badge>
            </div>
            <div className="space-y-2 text-center p-4 rounded-lg bg-muted/50">
              <p className="text-sm font-medium text-muted-foreground">Superavit Financeiro</p>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(totaisFinanceiros.totalEntradas - totaisFinanceiros.totalSaidas)}</p>
              <p className="text-xs text-muted-foreground">Entradas - Saidas</p>
              <Badge variant="secondary" className="text-green-600">Positivo</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analise Inteligente */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <HugeiconsIcon icon={BulbIcon} strokeWidth={2} className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle>Analise Inteligente da Gestao Financeira</CardTitle>
              <CardDescription>Insights gerados com base nos dados do periodo</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Visao Geral */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-foreground leading-relaxed">
              A analise da gestao financeira do municipio para o exercicio de {periodoSelecionado} revela um{" "}
              <strong>cenario positivo de liquidez e controle</strong>. Com saldo total de{" "}
              <strong>{formatCurrency(totaisFinanceiros.saldoTotal)}</strong> em contas bancarias e um{" "}
              <strong>superavit financeiro de {formatCurrency(totaisFinanceiros.totalEntradas - totaisFinanceiros.totalSaidas)}</strong>,
              o municipio demonstra capacidade de honrar seus compromissos. O indice de liquidez de <strong>2.26</strong>{" "}
              indica que para cada R$ 1,00 a pagar, existem R$ 2,26 disponiveis em caixa.
            </p>
          </div>

          <Separator />

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="pontos-fortes">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={Flag01Icon} strokeWidth={2} className="size-4 text-green-600" />
                  <span>Pontos Fortes da Gestao</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pl-6">
                  <div className="flex gap-2">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-4 mt-0.5 text-green-600 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Alta liquidez:</strong> O indice de liquidez de 2.26 esta bem acima 
                      do recomendado (1.0), garantindo folga para pagamentos e imprevistos.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-4 mt-0.5 text-green-600 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Rendimento das aplicacoes:</strong> Com taxa de 7.8% acumulada, 
                      os investimentos superam o CDI, maximizando os recursos ociosos.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-4 mt-0.5 text-green-600 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Controle por fonte:</strong> A segregacao por fonte de recursos 
                      esta adequada, com todas as fontes vinculadas apresentando saldos compativeis com suas destinacoes.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pontos-atencao">
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
                      <strong className="text-foreground">Divergencias em conciliacao:</strong> A conta 98766-5 apresenta 
                      divergencia de R$ 30.000, necessitando ajuste imediato para manter a integridade contabil.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-4 mt-0.5 text-amber-600 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Divida ativa elevada:</strong> Com R$ 12,5 milhoes em divida ativa, 
                      recomenda-se intensificar acoes de cobranca e programas de parcelamento.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-4 mt-0.5 text-amber-600 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Empenhos vencidos:</strong> Existem 45 empenhos vencidos totalizando 
                      R$ 1,25 milhao que demandam regularizacao prioritaria.
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
                    <p className="text-sm font-medium text-foreground mb-1">1. Regularizar Conciliacoes</p>
                    <p className="text-xs text-muted-foreground">
                      Priorizar a identificacao e correcao das divergencias bancarias, especialmente 
                      na conta de convenios que apresenta diferenca de R$ 30.000.
                    </p>
                  </div>
                  <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                    <p className="text-sm font-medium text-foreground mb-1">2. Intensificar Cobranca</p>
                    <p className="text-xs text-muted-foreground">
                      Implementar campanha de recuperacao de creditos tributarios, focando nos R$ 12,5 milhoes 
                      em divida ativa com oferecimento de condicoes especiais de parcelamento.
                    </p>
                  </div>
                  <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                    <p className="text-sm font-medium text-foreground mb-1">3. Otimizar Aplicacoes</p>
                    <p className="text-xs text-muted-foreground">
                      Avaliar migracao de recursos em poupanca (rendimento inferior) para CDBs ou 
                      fundos com melhor rentabilidade, respeitando prazos de liquidez necessarios.
                    </p>
                  </div>
                  <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                    <p className="text-sm font-medium text-foreground mb-1">4. Fluxo de Caixa Projetado</p>
                    <p className="text-xs text-muted-foreground">
                      Elaborar projecao detalhada para dezembro considerando folha de 13o salario, 
                      ferias e outros compromissos de final de exercicio.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="projecoes">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={ChartLineData02Icon} strokeWidth={2} className="size-4 text-purple-600" />
                  <span>Projecoes para Encerramento</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pl-6">
                  <p className="text-sm text-muted-foreground">
                    Com base no fluxo de caixa historico e compromissos previstos para dezembro:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-xs text-muted-foreground">Entradas Previstas</p>
                      <p className="text-xl font-bold text-green-600">R$ 15,2M</p>
                      <p className="text-xs text-muted-foreground">FPM, ICMS, Tributos</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-xs text-muted-foreground">Saidas Previstas</p>
                      <p className="text-xl font-bold text-red-600">R$ 18,5M</p>
                      <p className="text-xs text-muted-foreground">13o, Ferias, Fornecedores</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center bg-primary/5">
                      <p className="text-xs text-muted-foreground">Saldo Projetado 31/12</p>
                      <p className="text-xl font-bold text-primary">R$ 31,5M</p>
                      <p className="text-xs text-muted-foreground">Adequado para virada</p>
                    </div>
                  </div>
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
                <p className="text-sm font-medium text-foreground">Conclusao Analitica</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A gestao financeira municipal apresenta <strong>indicadores solidos de saude financeira</strong>, 
                  com destaque para o alto indice de liquidez e o superavit acumulado. Os pontos de atencao identificados 
                  - divergencias em conciliacao e divida ativa elevada - sao gerenciaveis com as acoes propostas. 
                  A projecao para encerramento do exercicio indica que o municipio tera recursos suficientes para 
                  honrar todos os compromissos de final de ano, mantendo saldo adequado para inicio do proximo exercicio. 
                  Recomenda-se especial atencao ao fluxo de caixa de dezembro devido aos pagamentos extraordinarios 
                  de 13o salario e ferias.
                </p>
                <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                  Analise gerada em {new Date().toLocaleDateString('pt-BR')} as {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} 
                  {" "}| Dados financeiros atualizados em tempo real
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
