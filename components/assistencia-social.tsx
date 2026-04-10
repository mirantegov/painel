"use client"

import * as React from "react"
import {
  Alert02Icon,
  AlertCircleIcon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  BankIcon,
  BulbIcon,
  Calendar01Icon,
  ChartLineData02Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  InformationCircleIcon,
  MoneyReceiveSquareIcon,
  SecurityCheckIcon,
  Target01Icon,
  UserMultipleIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { KpiCard } from "@/components/ui/kpi-card"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)

const formatNumber = (value: number) => new Intl.NumberFormat("pt-BR").format(value)

const greenPalette = {
  1: "#166534",
  2: "#15803d",
  3: "#16a34a",
  4: "#22c55e",
  5: "#4ade80",
}

const resumo = {
  orcamentoAtualizado: 18_450_000,
  execucaoPct: 86.4,
  saldoFontes: 3_280_000,
  familiasAcompanhadas: 12_480,
}

const execucaoMensal = [
  { mes: "Jan", empenhado: 1_120_000, pago: 980_000 },
  { mes: "Fev", empenhado: 1_280_000, pago: 1_140_000 },
  { mes: "Mar", empenhado: 1_360_000, pago: 1_220_000 },
  { mes: "Abr", empenhado: 1_410_000, pago: 1_290_000 },
  { mes: "Mai", empenhado: 1_520_000, pago: 1_380_000 },
  { mes: "Jun", empenhado: 1_610_000, pago: 1_470_000 },
  { mes: "Jul", empenhado: 1_720_000, pago: 1_540_000 },
  { mes: "Ago", empenhado: 1_920_000, pago: 1_760_000 },
]

const chartExecucao = {
  empenhado: { label: "Empenhado", color: greenPalette[1] },
  pago: { label: "Pago", color: greenPalette[3] },
} satisfies ChartConfig

const fontesRecursos = [
  { nome: "FNAS / Proteção Social Básica", valor: 4_820_000, fill: greenPalette[1] },
  { nome: "Tesouro Municipal", valor: 6_240_000, fill: greenPalette[2] },
  { nome: "Bolsa Família / IGD", valor: 1_340_000, fill: greenPalette[3] },
  { nome: "Benefícios Eventuais", valor: 2_160_000, fill: greenPalette[4] },
  { nome: "Habitação e Convênios", valor: 3_890_000, fill: greenPalette[5] },
]

const chartFontes = {
  "FNAS / Proteção Social Básica": { label: "FNAS / PSB", color: greenPalette[1] },
  "Tesouro Municipal": { label: "Tesouro Municipal", color: greenPalette[2] },
  "Bolsa Família / IGD": { label: "Bolsa Família / IGD", color: greenPalette[3] },
  "Benefícios Eventuais": { label: "Benefícios Eventuais", color: greenPalette[4] },
  "Habitação e Convênios": { label: "Habitação e Convênios", color: greenPalette[5] },
} satisfies ChartConfig

const programas = [
  { programa: "CadÚnico", familias: 14_820, cobertura: 92, controle: "Atualização cadastral", status: "Bom" },
  { programa: "Bolsa Família", familias: 6_430, cobertura: 88, controle: "Condicionalidades", status: "Atenção" },
  { programa: "BPC", familias: 1_284, cobertura: 94, controle: "Revisão de elegibilidade", status: "Bom" },
  { programa: "PETI", familias: 186, cobertura: 81, controle: "Busca ativa", status: "Atenção" },
  { programa: "PAA", familias: 420, cobertura: 76, controle: "Entrega e compra local", status: "Atenção" },
  { programa: "SCFV", familias: 2_160, cobertura: 85, controle: "Frequência dos grupos", status: "Bom" },
  { programa: "Habitação/Regularização", familias: 1_120, cobertura: 73, controle: "Títulos e dossiês", status: "Crítico" },
]

const chartProgramas = {
  indicador: { label: "Desempenho (%)", color: greenPalette[2] },
} satisfies ChartConfig

const desempenhoProgramas = programas.map((item) => ({
  programa: item.programa === "Habitação/Regularização" ? "Habitação" : item.programa,
  indicador: item.cobertura,
}))

const contasBancarias = [
  { conta: "BB 12.458-9", finalidade: "FMAS - Movimento", saldo: 1_180_000, conciliacao: 98 },
  { conta: "BB 18.225-4", finalidade: "Bloco PSB", saldo: 840_000, conciliacao: 100 },
  { conta: "CEF 45.771-2", finalidade: "Bolsa Família / IGD", saldo: 420_000, conciliacao: 96 },
  { conta: "BB 22.943-1", finalidade: "Habitação / Convênios", saldo: 840_000, conciliacao: 89 },
]

const alertas = [
  {
    tipo: "warning" as const,
    titulo: "Habitação e regularização fundiária abaixo da meta",
    badge: "Prioridade",
    descricao: "O avanço do programa está em 73% e demanda reforço documental e operacional.",
  },
  {
    tipo: "info" as const,
    titulo: "CadÚnico mantém alta cobertura cadastral",
    badge: "CadÚnico",
    descricao: "O monitoramento territorial dos CRAS sustenta 92% de cobertura no período.",
  },
  {
    tipo: "success" as const,
    titulo: "Conciliação bancária do FMAS está estabilizada",
    badge: "Financeiro",
    descricao: "As principais contas vinculadas permanecem acima de 95% de conciliação.",
  },
]

const detalhamentoDespesa = [
  { grupo: "Proteção Social Básica", autorizado: 6_420_000, empenhado: 5_980_000, liquidado: 5_640_000, pago: 5_480_000 },
  { grupo: "Proteção Social Especial", autorizado: 3_280_000, empenhado: 2_940_000, liquidado: 2_760_000, pago: 2_590_000 },
  { grupo: "Benefícios Eventuais", autorizado: 2_360_000, empenhado: 2_140_000, liquidado: 1_980_000, pago: 1_920_000 },
  { grupo: "Gestão do SUAS e CadÚnico", autorizado: 2_140_000, empenhado: 1_940_000, liquidado: 1_880_000, pago: 1_810_000 },
  { grupo: "Habitação e Regularização", autorizado: 4_250_000, empenhado: 2_940_000, liquidado: 2_020_000, pago: 1_880_000 },
]

const receitasPorOrigem = [
  { origem: "Transferências FNAS", previsto: 5_100_000, arrecadado: 4_820_000 },
  { origem: "Tesouro Municipal", previsto: 6_500_000, arrecadado: 6_240_000 },
  { origem: "IGD Bolsa Família / CadÚnico", previsto: 1_420_000, arrecadado: 1_340_000 },
  { origem: "Convênios Habitacionais", previsto: 4_200_000, arrecadado: 3_890_000 },
]

const chartReceitasOrigem = {
  previsto: { label: "Previsto", color: greenPalette[4] },
  arrecadado: { label: "Arrecadado", color: greenPalette[1] },
} satisfies ChartConfig

const controleFontes = [
  { codigo: "1660", descricao: "FNAS - Proteção Social Básica", saldo: 840_000, comprometido: 690_000, disponibilidade: 150_000, situacao: "Regular" },
  { codigo: "1661", descricao: "FNAS - Proteção Social Especial", saldo: 590_000, comprometido: 520_000, disponibilidade: 70_000, situacao: "Atenção" },
  { codigo: "1669", descricao: "IGD Bolsa Família / CadÚnico", saldo: 420_000, comprometido: 280_000, disponibilidade: 140_000, situacao: "Regular" },
  { codigo: "1750", descricao: "Tesouro Municipal Vinculado", saldo: 1_430_000, comprometido: 990_000, disponibilidade: 440_000, situacao: "Regular" },
  { codigo: "1701", descricao: "Convênio Habitação", saldo: 840_000, comprometido: 760_000, disponibilidade: 80_000, situacao: "Atenção" },
]

const indicadoresRede = [
  { indicador: "CRAS com equipe mínima completa", valor: 83, meta: 100 },
  { indicador: "PAIF com prontuário atualizado", valor: 87, meta: 95 },
  { indicador: "Visitas domiciliares prioritárias realizadas", valor: 79, meta: 90 },
  { indicador: "Benefícios eventuais concedidos no prazo", valor: 91, meta: 95 },
]

const familiasPorTerritorio = [
  { territorio: "Norte", cadunico: 3_420, bolsaFamilia: 1_560, scfv: 420, bpc: 280 },
  { territorio: "Sul", cadunico: 2_980, bolsaFamilia: 1_340, scfv: 390, bpc: 250 },
  { territorio: "Leste", cadunico: 3_110, bolsaFamilia: 1_420, scfv: 460, bpc: 270 },
  { territorio: "Oeste", cadunico: 2_760, bolsaFamilia: 1_180, scfv: 340, bpc: 220 },
  { territorio: "Centro", cadunico: 2_550, bolsaFamilia: 930, scfv: 550, bpc: 264 },
]

const chartTerritorio = {
  cadunico: { label: "CadÚnico", color: greenPalette[1] },
  bolsaFamilia: { label: "Bolsa Família", color: greenPalette[3] },
} satisfies ChartConfig

const agendaGestao = [
  { item: "Prestação de contas do cofinanciamento estadual", prazo: "15/09/2026", responsavel: "FMAS", status: "Em andamento" },
  { item: "Fechamento da conciliação bancária mensal", prazo: "20/09/2026", responsavel: "Tesouraria FMAS", status: "No prazo" },
  { item: "Revisão cadastral de famílias unipessoais", prazo: "30/09/2026", responsavel: "CadÚnico", status: "Atenção" },
  { item: "Mutirão de dossiês da regularização fundiária", prazo: "10/10/2026", responsavel: "Habitação", status: "Prioritário" },
]

const analiseExecutiva = {
  coberturaMedia: 84.1,
  conciliacaoBancaria: 95.8,
  execucaoFinanceira: 86.4,
  indiceTerritorializacao: 81.7,
}

const patrimonioResumo = {
  bensAtivos: 1284,
  valorAtualizado: 8_640_000,
  termosAtualizadosPct: 88.6,
  manutencaoPreventivaPct: 79.4,
}

const unidadesPatrimoniais = [
  { unidade: "CRAS Norte", bens: 184, valor: 1_240_000, inventario: 96, criticidade: "Regular" },
  { unidade: "CRAS Sul", bens: 162, valor: 1_080_000, inventario: 91, criticidade: "Regular" },
  { unidade: "CRAS Leste", bens: 176, valor: 1_190_000, inventario: 89, criticidade: "Atenção" },
  { unidade: "CREAS Central", bens: 138, valor: 1_420_000, inventario: 94, criticidade: "Regular" },
  { unidade: "Centro POP", bens: 92, valor: 760_000, inventario: 86, criticidade: "Atenção" },
  { unidade: "Habitação Social", bens: 124, valor: 1_310_000, inventario: 78, criticidade: "Crítico" },
]

const manutencaoPatrimonial = [
  { categoria: "Veículos de atendimento", total: 12, preventivaEmDia: 9, corretivaAberta: 2, status: "Atenção" },
  { categoria: "Equipamentos de informática", total: 248, preventivaEmDia: 201, corretivaAberta: 18, status: "Regular" },
  { categoria: "Mobiliário de unidades", total: 614, preventivaEmDia: 502, corretivaAberta: 36, status: "Regular" },
  { categoria: "Equipamentos do SCFV", total: 146, preventivaEmDia: 98, corretivaAberta: 19, status: "Atenção" },
  { categoria: "Equipamentos da habitação", total: 74, preventivaEmDia: 43, corretivaAberta: 11, status: "Crítico" },
]

const movimentacoesPatrimoniais = [
  { tipo: "Incorporações", quantidade: 86, valor: 1_180_000 },
  { tipo: "Transferências internas", quantidade: 54, valor: 420_000 },
  { tipo: "Baixas", quantidade: 18, valor: 96_000 },
  { tipo: "Bens em regularização", quantidade: 27, valor: 184_000 },
]

const chartMovimentacoesPatrimoniais = {
  valor: { label: "Valor", color: greenPalette[2] },
} satisfies ChartConfig

const termosResponsabilidade = [
  { setor: "CRAS", total: 22, atualizados: 21, vencendo: 1 },
  { setor: "CREAS", total: 11, atualizados: 10, vencendo: 1 },
  { setor: "Centro POP", total: 6, atualizados: 5, vencendo: 1 },
  { setor: "SCFV", total: 14, atualizados: 11, vencendo: 3 },
  { setor: "Habitação", total: 9, atualizados: 6, vencendo: 3 },
]

const alertasAnalise = [
  {
    tipo: "warning" as const,
    titulo: "Inventário patrimonial da Habitação está abaixo do padrão mínimo",
    badge: "Patrimônio",
    descricao: "A unidade de Habitação Social está com 78% de inventário conciliado e demanda conferência física, etiquetagem e atualização de responsáveis.",
  },
  {
    tipo: "info" as const,
    titulo: "Rede CRAS mantém boa regularidade de termos de responsabilidade",
    badge: "Controle interno",
    descricao: "Os CRAS concentram a maior parte dos termos atualizados, favorecendo a rastreabilidade dos bens permanentes utilizados no atendimento.",
  },
  {
    tipo: "success" as const,
    titulo: "Saldo patrimonial líquido do exercício permanece positivo",
    badge: "Gestão patrimonial",
    descricao: "As incorporações superam as baixas patrimoniais, indicando renovação moderada do acervo da rede socioassistencial.",
  },
]

// ── Vigilância Socioassistencial ──────────────────────────────────────

const vigilanciaResumo = {
  familiasVulneraveis: 4_860,
  taxaVulnerabilidade: 32.8,
  demandaReprimida: 1_240,
  situacoesRisco: 386,
}

const vulnerabilidadeTerritorial = [
  { territorio: "Norte", extremaPobreza: 1_420, pobreza: 2_180, risco: 124, indice: 38.2 },
  { territorio: "Sul", extremaPobreza: 980, pobreza: 1_640, risco: 86, indice: 29.4 },
  { territorio: "Leste", extremaPobreza: 1_280, pobreza: 1_960, risco: 108, indice: 35.6 },
  { territorio: "Oeste", extremaPobreza: 740, pobreza: 1_380, risco: 48, indice: 24.1 },
  { territorio: "Centro", extremaPobreza: 440, pobreza: 920, risco: 20, indice: 17.8 },
]

const demandaCapacidade = [
  { servico: "PAIF (CRAS)", demanda: 3_840, capacidade: 3_200, fila: 640, cobertura: 83 },
  { servico: "PAEFI (CREAS)", demanda: 1_260, capacidade: 980, fila: 280, cobertura: 78 },
  { servico: "SCFV", demanda: 2_840, capacidade: 2_160, fila: 680, cobertura: 76 },
  { servico: "Abordagem Social", demanda: 420, capacidade: 320, fila: 100, cobertura: 76 },
  { servico: "Acolhimento Institucional", demanda: 86, capacidade: 72, fila: 14, cobertura: 84 },
  { servico: "República", demanda: 24, capacidade: 18, fila: 6, cobertura: 75 },
]

const violacoesDireitos = [
  { tipo: "Negligência/abandono de crianças", casos: 142, tendencia: "estavel" },
  { tipo: "Violência doméstica", casos: 98, tendencia: "alta" },
  { tipo: "Trabalho infantil", casos: 64, tendencia: "queda" },
  { tipo: "Situação de rua", casos: 52, tendencia: "alta" },
  { tipo: "Abuso/exploração sexual", casos: 38, tendencia: "estavel" },
  { tipo: "Violência contra idosos", casos: 34, tendencia: "alta" },
]

const chartVulnerabilidade = {
  extremaPobreza: { label: "Extrema Pobreza", color: greenPalette[1] },
  pobreza: { label: "Pobreza", color: greenPalette[3] },
} satisfies ChartConfig

const evolucaoDemanda = [
  { mes: "Jan", novos: 320, atendidos: 280, pendentes: 840 },
  { mes: "Fev", novos: 290, atendidos: 310, pendentes: 820 },
  { mes: "Mar", novos: 340, atendidos: 300, pendentes: 860 },
  { mes: "Abr", novos: 380, atendidos: 350, pendentes: 890 },
  { mes: "Mai", novos: 310, atendidos: 360, pendentes: 840 },
  { mes: "Jun", novos: 360, atendidos: 340, pendentes: 860 },
  { mes: "Jul", novos: 420, atendidos: 380, pendentes: 900 },
  { mes: "Ago", novos: 350, atendidos: 390, pendentes: 860 },
]

const chartEvolucaoDemanda = {
  novos: { label: "Novos casos", color: greenPalette[1] },
  atendidos: { label: "Atendidos", color: greenPalette[3] },
  pendentes: { label: "Pendentes", color: greenPalette[5] },
} satisfies ChartConfig

// ── Proteção Especial, Benefícios e Equipes ──────────────────────────

const protecaoEspecialResumo = {
  familiasAcompanhadasCreas: 980,
  pessoasSituacaoRua: 164,
  adolescentesMse: 72,
  beneficiosEventuaisConcedidos: 2_340,
}

const creas = [
  { unidade: "CREAS Central", familias: 480, paefi: 340, mse: 42, abordagem: 86, equipeCompleta: true },
  { unidade: "CREAS Regional Norte", familias: 320, paefi: 240, mse: 18, abordagem: 52, equipeCompleta: false },
  { unidade: "CREAS Regional Sul", familias: 180, paefi: 128, mse: 12, abordagem: 26, equipeCompleta: true },
]

const centroPop = {
  capacidade: 80,
  ocupacao: 64,
  atendimentosMes: 420,
  encaminhamentos: 86,
  reinsercaoFamiliar: 12,
  desligamentos: 8,
}

const medidasSocioeducativas = [
  { medida: "Prestação de Serviços à Comunidade (PSC)", adolescentes: 28, cumprimento: 82, evasao: 12 },
  { medida: "Liberdade Assistida (LA)", adolescentes: 34, cumprimento: 76, evasao: 18 },
  { medida: "Semiliberdade", adolescentes: 6, cumprimento: 88, evasao: 8 },
  { medida: "Internação", adolescentes: 4, cumprimento: 92, evasao: 0 },
]

const beneficiosEventuais = [
  { tipo: "Auxílio natalidade", concedidos: 380, valorMedio: 450, tempoMedio: 5 },
  { tipo: "Auxílio funeral", concedidos: 142, valorMedio: 1_200, tempoMedio: 2 },
  { tipo: "Vulnerabilidade temporária", concedidos: 1_240, valorMedio: 280, tempoMedio: 7 },
  { tipo: "Calamidade pública", concedidos: 86, valorMedio: 520, tempoMedio: 3 },
  { tipo: "Cesta básica emergencial", concedidos: 492, valorMedio: 180, tempoMedio: 4 },
]

const equipesRh = [
  { unidade: "CRAS Norte", tecnicos: 6, exigido: 8, nobRh: false, capacitados: 5 },
  { unidade: "CRAS Sul", tecnicos: 7, exigido: 8, nobRh: false, capacitados: 6 },
  { unidade: "CRAS Leste", tecnicos: 8, exigido: 8, nobRh: true, capacitados: 7 },
  { unidade: "CRAS Oeste", tecnicos: 5, exigido: 8, nobRh: false, capacitados: 4 },
  { unidade: "CRAS Centro", tecnicos: 8, exigido: 8, nobRh: true, capacitados: 8 },
  { unidade: "CREAS Central", tecnicos: 10, exigido: 10, nobRh: true, capacitados: 9 },
  { unidade: "CREAS Norte", tecnicos: 6, exigido: 8, nobRh: false, capacitados: 4 },
  { unidade: "Centro POP", tecnicos: 4, exigido: 6, nobRh: false, capacitados: 3 },
]

const capacitacao = [
  { tema: "Atualização SUAS e NOB-RH", participantes: 42, cargaHoraria: 40, status: "Concluído" },
  { tema: "Abordagem a pessoas em situação de rua", participantes: 18, cargaHoraria: 20, status: "Em andamento" },
  { tema: "Trabalho com famílias (PAIF/PAEFI)", participantes: 36, cargaHoraria: 32, status: "Concluído" },
  { tema: "Prevenção à violência contra crianças", participantes: 28, cargaHoraria: 16, status: "Programado" },
  { tema: "Registro e prontuário eletrônico", participantes: 52, cargaHoraria: 8, status: "Concluído" },
]

const conselhoCmas = [
  { item: "Reuniões ordinárias realizadas", valor: "8/10", status: "Regular" },
  { item: "Deliberações do exercício", valor: "24", status: "Bom" },
  { item: "Resoluções publicadas no D.O.", valor: "18/24", status: "Atenção" },
  { item: "Inscrição de entidades atualizada", valor: "92%", status: "Bom" },
  { item: "Conferência Municipal realizada", valor: "Sim", status: "Bom" },
  { item: "Plano de Ação aprovado", valor: "Sim", status: "Bom" },
]

function badgeVariant(status: string) {
  if (status === "Crítico") return "destructive" as const
  if (status === "Atenção") return "secondary" as const
  return "default" as const
}

export function AssistenciaSocial() {
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024")

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Assistência Social</h2>
          <p className="text-muted-foreground">
            Gestão orçamentária, financeira e monitoramento dos programas socioassistenciais.
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
          <Button variant="outline" size="sm">Atualizar painel</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Orçamento Atualizado"
          icon={Wallet01Icon}
          value={formatCurrency(resumo.orcamentoAtualizado)}
          borderColor="border-l-emerald-700"
          footer={<p className="text-sm text-muted-foreground">Dotação da secretaria e fundos vinculados</p>}
        />
        <KpiCard
          title="Execução Orçamentária"
          icon={Target01Icon}
          value={`${resumo.execucaoPct}%`}
          borderColor="border-l-emerald-700"
          footer={
            <>
              <Progress value={resumo.execucaoPct} className="h-2" />
              <p className="text-sm text-muted-foreground">Empenho e liquidação em linha com o cronograma anual</p>
            </>
          }
        />
        <KpiCard
          title="Saldo em Fontes Vinculadas"
          icon={BankIcon}
          value={formatCurrency(resumo.saldoFontes)}
          borderColor="border-l-emerald-700"
          footer={<p className="text-sm text-muted-foreground">Disponibilidade financeira para execução pactuada</p>}
        />
        <KpiCard
          title="Famílias Acompanhadas"
          icon={UserMultipleIcon}
          value={formatNumber(resumo.familiasAcompanhadas)}
          borderColor="border-l-emerald-700"
          footer={
            <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
              <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-4" />
              Crescimento de 6,8% frente ao ciclo anterior
            </div>
          }
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={MoneyReceiveSquareIcon} strokeWidth={2} className="size-5" />
              Gestão Orçamentária e Financeira
            </CardTitle>
            <CardDescription>
              Acompanhamento da execução da despesa, fontes de recursos e contas bancárias vinculadas.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">Receitas vinculadas realizadas</p>
              <p className="mt-2 text-3xl font-semibold">{formatCurrency(11_920_000)}</p>
              <p className="mt-2 text-sm text-muted-foreground">Transferências e cofinanciamento do período.</p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">Despesas liquidadas</p>
              <p className="mt-2 text-3xl font-semibold">{formatCurrency(14_280_000)}</p>
              <p className="mt-2 text-sm text-muted-foreground">Serviços, benefícios eventuais e manutenção da rede.</p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">Conciliação média bancária</p>
              <p className="mt-2 text-3xl font-semibold">95,8%</p>
              <p className="mt-2 text-sm text-muted-foreground">Baixa incidência de divergências nas contas vinculadas.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} className="size-5" />
              Alertas da Secretaria
            </CardTitle>
            <CardDescription>Focos prioritários para gestão financeira e programas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alertas.map((alerta) => (
              <Alert key={alerta.titulo} variant={alerta.tipo === "warning" ? "destructive" : "default"}>
                <AlertTitle className="flex flex-wrap items-center gap-2">
                  {alerta.titulo}
                  <Badge variant="outline">{alerta.badge}</Badge>
                </AlertTitle>
                <AlertDescription>{alerta.descricao}</AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orcamentaria" className="w-full">
        <TabsList className="flex h-auto w-full flex-wrap gap-2 rounded-2xl p-2">
          <TabsTrigger value="orcamentaria">Gestão Orçamentária</TabsTrigger>
          <TabsTrigger value="programas">Programas Sociais</TabsTrigger>
          <TabsTrigger value="vigilancia">Vigilância Socioassistencial</TabsTrigger>
          <TabsTrigger value="protecao">Proteção Especial e Equipes</TabsTrigger>
          <TabsTrigger value="patrimonio">Controle Patrimonial</TabsTrigger>
          <TabsTrigger value="analises">Análises</TabsTrigger>
        </TabsList>

        <TabsContent value="orcamentaria" className="mt-6 space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={ChartLineData02Icon} strokeWidth={2} className="size-5" />
                  Evolução da Execução
                </CardTitle>
                <CardDescription>Empenhado e pago ao longo do exercício.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartExecucao} className="h-[300px] w-full">
                  <AreaChart data={execucaoMensal} margin={{ left: 0, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `${Number(v) / 1_000_000}M`} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Area type="monotone" dataKey="empenhado" stroke="var(--color-empenhado)" fill="var(--color-empenhado)" fillOpacity={0.24} strokeWidth={2.5} />
                    <Area type="monotone" dataKey="pago" stroke="var(--color-pago)" fill="var(--color-pago)" fillOpacity={0.18} strokeWidth={2.5} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Composição das Fontes</CardTitle>
                <CardDescription>Distribuição das fontes que financiam a política socioassistencial.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartFontes} className="mx-auto aspect-square max-h-[320px]">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="nome" formatter={(value) => formatCurrency(Number(value))} />} />
                    <Pie data={fontesRecursos} dataKey="valor" nameKey="nome" innerRadius={70} outerRadius={110}>
                      {fontesRecursos.map((item) => (
                        <Cell key={item.nome} fill={item.fill} />
                      ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent nameKey="nome" />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={MoneyReceiveSquareIcon} strokeWidth={2} className="size-5" />
                  Receitas por Origem
                </CardTitle>
                <CardDescription>Comparativo entre previsão e arrecadação das principais fontes da assistência social.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartReceitasOrigem} className="h-[320px] w-full">
                  <BarChart data={receitasPorOrigem} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="origem" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `R$ ${(Number(value) / 1_000_000).toFixed(1)}M`} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="previsto" fill="var(--color-previsto)" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="arrecadado" fill="var(--color-arrecadado)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={Target01Icon} strokeWidth={2} className="size-5" />
                  Indicadores da Rede
                </CardTitle>
                <CardDescription>Monitoramento operacional da execução socioassistencial.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {indicadoresRede.map((item) => (
                  <div key={item.indicador} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.indicador}</p>
                        <p className="text-sm text-muted-foreground">Meta: {item.meta}%</p>
                      </div>
                      <Badge variant={item.valor >= item.meta ? "default" : "secondary"}>{item.valor}%</Badge>
                    </div>
                    <Progress value={item.valor} className="mt-4 h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={BankIcon} strokeWidth={2} className="size-5" />
                  Controle de Fontes de Recursos
                </CardTitle>
                <CardDescription>Saldo, comprometimento e disponibilidade por fonte vinculada.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Fonte</TableHead>
                      <TableHead className="text-right">Saldo</TableHead>
                      <TableHead className="text-right">Comprometido</TableHead>
                      <TableHead className="text-right">Disponível</TableHead>
                      <TableHead>Situação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {controleFontes.map((fonte) => (
                      <TableRow key={fonte.codigo}>
                        <TableCell className="font-medium">{fonte.codigo}</TableCell>
                        <TableCell>{fonte.descricao}</TableCell>
                        <TableCell className="text-right">{formatCurrency(fonte.saldo)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(fonte.comprometido)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(fonte.disponibilidade)}</TableCell>
                        <TableCell>
                          <Badge variant={fonte.situacao === "Atenção" ? "secondary" : "outline"}>{fonte.situacao}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agenda de Gestão</CardTitle>
                <CardDescription>Compromissos críticos para manter a execução, controle e prestação de contas.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {agendaGestao.map((item) => (
                  <div key={item.item} className="rounded-2xl border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium">{item.item}</p>
                      <Badge variant={item.status === "Prioritário" ? "destructive" : item.status === "Atenção" ? "secondary" : "outline"}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>Prazo: {item.prazo}</span>
                      <span>Responsável: {item.responsavel}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon icon={BankIcon} strokeWidth={2} className="size-5" />
                Contas Bancárias Vinculadas
              </CardTitle>
              <CardDescription>Monitoramento da movimentação financeira e da conciliação.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Conta</TableHead>
                    <TableHead>Finalidade</TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                    <TableHead className="text-right">Conciliação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contasBancarias.map((conta) => (
                    <TableRow key={conta.conta}>
                      <TableCell className="font-medium">{conta.conta}</TableCell>
                      <TableCell>{conta.finalidade}</TableCell>
                      <TableCell className="text-right">{formatCurrency(conta.saldo)}</TableCell>
                      <TableCell className="text-right">{conta.conciliacao}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programas" className="mt-6 space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={UserMultipleIcon} strokeWidth={2} className="size-5" />
                  Programas Prioritários
                </CardTitle>
                <CardDescription>KPIs operacionais e controles mínimos dos programas monitorados.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Programa</TableHead>
                      <TableHead className="text-right">Famílias</TableHead>
                      <TableHead className="text-right">Cobertura</TableHead>
                      <TableHead>Controle principal</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programas.map((item) => (
                      <TableRow key={item.programa}>
                        <TableCell className="font-medium">{item.programa}</TableCell>
                        <TableCell className="text-right">{formatNumber(item.familias)}</TableCell>
                        <TableCell className="text-right">{item.cobertura}%</TableCell>
                        <TableCell>{item.controle}</TableCell>
                        <TableCell>
                          <Badge variant={badgeVariant(item.status)}>{item.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Desempenho dos Programas</CardTitle>
                <CardDescription>Índice sintético de cobertura e acompanhamento por programa.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartProgramas} className="min-h-[340px]">
                  <BarChart data={desempenhoProgramas} layout="vertical" margin={{ left: 12, right: 12 }}>
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis type="category" dataKey="programa" width={110} tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => `${value}%`} />} />
                    <Bar dataKey="indicador" radius={8} fill="var(--color-indicador)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={UserMultipleIcon} strokeWidth={2} className="size-5" />
                  Famílias por Território
                </CardTitle>
                <CardDescription>Concentração territorial das famílias em acompanhamento e beneficiárias.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartTerritorio} className="h-[320px] w-full">
                  <BarChart data={familiasPorTerritorio} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="territorio" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatNumber(Number(value))} />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="cadunico" fill="var(--color-cadunico)" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="bolsaFamilia" fill="var(--color-bolsaFamilia)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalhamento da Despesa por Bloco</CardTitle>
                <CardDescription>Execução por grandes grupos da política de assistência social.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Grupo</TableHead>
                      <TableHead className="text-right">Autorizado</TableHead>
                      <TableHead className="text-right">Empenhado</TableHead>
                      <TableHead className="text-right">Liquidado</TableHead>
                      <TableHead className="text-right">Pago</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {detalhamentoDespesa.map((item) => (
                      <TableRow key={item.grupo}>
                        <TableCell className="font-medium">{item.grupo}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.autorizado)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.empenhado)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.liquidado)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.pago)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vigilancia" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiCard
              title="Famílias em Vulnerabilidade"
              icon={AlertCircleIcon}
              value={formatNumber(vigilanciaResumo.familiasVulneraveis)}
              borderColor="border-l-emerald-700"
              footer={<p className="text-sm text-muted-foreground">Identificadas via CadÚnico e busca ativa territorial</p>}
            />
            <KpiCard
              title="Taxa de Vulnerabilidade"
              icon={Target01Icon}
              value={`${vigilanciaResumo.taxaVulnerabilidade}%`}
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress value={vigilanciaResumo.taxaVulnerabilidade} className="h-2" />
                  <p className="text-sm text-muted-foreground">Proporção sobre total de famílias cadastradas</p>
                </>
              }
            />
            <KpiCard
              title="Demanda Reprimida"
              icon={Clock01Icon}
              value={formatNumber(vigilanciaResumo.demandaReprimida)}
              borderColor="border-l-emerald-700"
              footer={
                <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                  <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-4" />
                  Famílias aguardando inclusão em serviços
                </div>
              }
            />
            <KpiCard
              title="Situações de Risco"
              icon={Alert02Icon}
              value={formatNumber(vigilanciaResumo.situacoesRisco)}
              borderColor="border-l-emerald-700"
              footer={<p className="text-sm text-muted-foreground">Ocorrências de violação de direitos no período</p>}
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={SecurityCheckIcon} strokeWidth={2} className="size-5" />
                  Mapa de Vulnerabilidade por Território
                </CardTitle>
                <CardDescription>Distribuição territorial de famílias em extrema pobreza, pobreza e risco social.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartVulnerabilidade} className="h-[320px] w-full">
                  <BarChart data={vulnerabilidadeTerritorial} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="territorio" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatNumber(Number(value))} />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="extremaPobreza" fill="var(--color-extremaPobreza)" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="pobreza" fill="var(--color-pobreza)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={Target01Icon} strokeWidth={2} className="size-5" />
                  Índice de Vulnerabilidade Territorial
                </CardTitle>
                <CardDescription>Indicador composto de risco social por região de abrangência dos CRAS.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {vulnerabilidadeTerritorial.map((item) => (
                  <div key={item.territorio} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.territorio}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatNumber(item.risco)} situações de risco identificadas
                        </p>
                      </div>
                      <Badge variant={item.indice > 35 ? "destructive" : item.indice > 25 ? "secondary" : "default"}>
                        {item.indice}%
                      </Badge>
                    </div>
                    <Progress value={item.indice} className="mt-4 h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={UserMultipleIcon} strokeWidth={2} className="size-5" />
                  Demanda vs. Capacidade Instalada
                </CardTitle>
                <CardDescription>Relação entre demanda identificada, capacidade de atendimento e fila de espera por serviço.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Serviço</TableHead>
                      <TableHead className="text-right">Demanda</TableHead>
                      <TableHead className="text-right">Capacidade</TableHead>
                      <TableHead className="text-right">Fila</TableHead>
                      <TableHead className="text-right">Cobertura</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demandaCapacidade.map((item) => (
                      <TableRow key={item.servico}>
                        <TableCell className="font-medium">{item.servico}</TableCell>
                        <TableCell className="text-right">{formatNumber(item.demanda)}</TableCell>
                        <TableCell className="text-right">{formatNumber(item.capacidade)}</TableCell>
                        <TableCell className="text-right">{formatNumber(item.fila)}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={item.cobertura >= 80 ? "default" : "secondary"}>{item.cobertura}%</Badge>
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
                  <HugeiconsIcon icon={ChartLineData02Icon} strokeWidth={2} className="size-5" />
                  Evolução da Demanda
                </CardTitle>
                <CardDescription>Fluxo mensal de novos casos, atendimentos e pendências acumuladas.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartEvolucaoDemanda} className="h-[320px] w-full">
                  <AreaChart data={evolucaoDemanda} margin={{ left: 0, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatNumber(Number(value))} />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Area type="monotone" dataKey="pendentes" stroke="var(--color-pendentes)" fill="var(--color-pendentes)" fillOpacity={0.12} strokeWidth={2} />
                    <Area type="monotone" dataKey="novos" stroke="var(--color-novos)" fill="var(--color-novos)" fillOpacity={0.2} strokeWidth={2.5} />
                    <Area type="monotone" dataKey="atendidos" stroke="var(--color-atendidos)" fill="var(--color-atendidos)" fillOpacity={0.18} strokeWidth={2.5} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-5" />
                Violações de Direitos Identificadas
              </CardTitle>
              <CardDescription>Tipologia das situações de risco e violação de direitos registradas pela rede socioassistencial.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo de Violação</TableHead>
                    <TableHead className="text-right">Casos</TableHead>
                    <TableHead>Tendência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {violacoesDireitos.map((item) => (
                    <TableRow key={item.tipo}>
                      <TableCell className="font-medium">{item.tipo}</TableCell>
                      <TableCell className="text-right">{item.casos}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {item.tendencia === "alta" && (
                            <>
                              <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-4 text-red-500" />
                              <span className="text-sm text-red-500">Em alta</span>
                            </>
                          )}
                          {item.tendencia === "queda" && (
                            <>
                              <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} className="size-4 text-emerald-600" />
                              <span className="text-sm text-emerald-600">Em queda</span>
                            </>
                          )}
                          {item.tendencia === "estavel" && (
                            <span className="text-sm text-muted-foreground">Estável</span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protecao" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiCard
              title="Famílias no CREAS"
              icon={UserMultipleIcon}
              value={formatNumber(protecaoEspecialResumo.familiasAcompanhadasCreas)}
              borderColor="border-l-emerald-700"
              footer={<p className="text-sm text-muted-foreground">Acompanhamento PAEFI em toda a rede</p>}
            />
            <KpiCard
              title="Pessoas em Situação de Rua"
              icon={AlertCircleIcon}
              value={formatNumber(protecaoEspecialResumo.pessoasSituacaoRua)}
              borderColor="border-l-emerald-700"
              footer={<p className="text-sm text-muted-foreground">Identificadas pela Abordagem Social e Centro POP</p>}
            />
            <KpiCard
              title="Adolescentes em MSE"
              icon={SecurityCheckIcon}
              value={formatNumber(protecaoEspecialResumo.adolescentesMse)}
              borderColor="border-l-emerald-700"
              footer={<p className="text-sm text-muted-foreground">Medidas Socioeducativas em meio aberto</p>}
            />
            <KpiCard
              title="Benefícios Eventuais"
              icon={MoneyReceiveSquareIcon}
              value={formatNumber(protecaoEspecialResumo.beneficiosEventuaisConcedidos)}
              borderColor="border-l-emerald-700"
              footer={
                <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                  <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-4" />
                  Concedidos no período
                </div>
              }
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={SecurityCheckIcon} strokeWidth={2} className="size-5" />
                  Unidades CREAS
                </CardTitle>
                <CardDescription>Desempenho operacional das unidades de Proteção Social Especial de Média Complexidade.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unidade</TableHead>
                      <TableHead className="text-right">Famílias</TableHead>
                      <TableHead className="text-right">PAEFI</TableHead>
                      <TableHead className="text-right">MSE</TableHead>
                      <TableHead className="text-right">Abordagem</TableHead>
                      <TableHead>Equipe</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {creas.map((item) => (
                      <TableRow key={item.unidade}>
                        <TableCell className="font-medium">{item.unidade}</TableCell>
                        <TableCell className="text-right">{formatNumber(item.familias)}</TableCell>
                        <TableCell className="text-right">{formatNumber(item.paefi)}</TableCell>
                        <TableCell className="text-right">{item.mse}</TableCell>
                        <TableCell className="text-right">{item.abordagem}</TableCell>
                        <TableCell>
                          <Badge variant={item.equipeCompleta ? "default" : "secondary"}>
                            {item.equipeCompleta ? "Completa" : "Incompleta"}
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
                  <HugeiconsIcon icon={UserMultipleIcon} strokeWidth={2} className="size-5" />
                  Centro POP
                </CardTitle>
                <CardDescription>Indicadores da unidade de acolhimento e atendimento à população em situação de rua.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">Ocupação</p>
                    <p className="mt-2 text-2xl font-semibold">{centroPop.ocupacao}/{centroPop.capacidade}</p>
                    <Progress value={(centroPop.ocupacao / centroPop.capacidade) * 100} className="mt-2 h-2" />
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">Atendimentos/mês</p>
                    <p className="mt-2 text-2xl font-semibold">{formatNumber(centroPop.atendimentosMes)}</p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">Encaminhamentos</p>
                    <p className="mt-2 text-2xl font-semibold">{centroPop.encaminhamentos}</p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">Reinserção familiar</p>
                    <p className="mt-2 text-2xl font-semibold">{centroPop.reinsercaoFamiliar}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={SecurityCheckIcon} strokeWidth={2} className="size-5" />
                  Medidas Socioeducativas em Meio Aberto
                </CardTitle>
                <CardDescription>Acompanhamento das MSE sob responsabilidade municipal (ECA Art. 112).</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medida</TableHead>
                      <TableHead className="text-right">Adolescentes</TableHead>
                      <TableHead className="text-right">Cumprimento</TableHead>
                      <TableHead className="text-right">Evasão</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medidasSocioeducativas.map((item) => (
                      <TableRow key={item.medida}>
                        <TableCell className="font-medium">{item.medida}</TableCell>
                        <TableCell className="text-right">{item.adolescentes}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={item.cumprimento >= 80 ? "default" : "secondary"}>{item.cumprimento}%</Badge>
                        </TableCell>
                        <TableCell className="text-right">{item.evasao}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={MoneyReceiveSquareIcon} strokeWidth={2} className="size-5" />
                  Benefícios Eventuais Concedidos
                </CardTitle>
                <CardDescription>Regulamentação municipal (Lei 8.742/93, Art. 22) — concessão, valores médios e tempo de processamento.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Concedidos</TableHead>
                      <TableHead className="text-right">Valor Médio</TableHead>
                      <TableHead className="text-right">Tempo (dias)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {beneficiosEventuais.map((item) => (
                      <TableRow key={item.tipo}>
                        <TableCell className="font-medium">{item.tipo}</TableCell>
                        <TableCell className="text-right">{formatNumber(item.concedidos)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.valorMedio)}</TableCell>
                        <TableCell className="text-right">{item.tempoMedio}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={UserMultipleIcon} strokeWidth={2} className="size-5" />
                  Gestão de Equipes (NOB-RH/SUAS)
                </CardTitle>
                <CardDescription>Conformidade das equipes de referência com a Norma Operacional Básica de Recursos Humanos do SUAS.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unidade</TableHead>
                      <TableHead className="text-right">Técnicos</TableHead>
                      <TableHead className="text-right">Exigido</TableHead>
                      <TableHead>NOB-RH</TableHead>
                      <TableHead className="text-right">Capacitados</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipesRh.map((item) => (
                      <TableRow key={item.unidade}>
                        <TableCell className="font-medium">{item.unidade}</TableCell>
                        <TableCell className="text-right">{item.tecnicos}</TableCell>
                        <TableCell className="text-right">{item.exigido}</TableCell>
                        <TableCell>
                          <Badge variant={item.nobRh ? "default" : "destructive"}>
                            {item.nobRh ? "Conforme" : "Irregular"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{item.capacitados}/{item.tecnicos}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} className="size-5" />
                  Capacitação e Educação Permanente
                </CardTitle>
                <CardDescription>Plano de formação continuada dos trabalhadores do SUAS no exercício.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {capacitacao.map((item) => (
                  <div key={item.tema} className="rounded-2xl border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium">{item.tema}</p>
                      <Badge variant={item.status === "Concluído" ? "default" : item.status === "Em andamento" ? "secondary" : "outline"}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>{item.participantes} participantes</span>
                      <span>{item.cargaHoraria}h</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon icon={BankIcon} strokeWidth={2} className="size-5" />
                Conselho Municipal de Assistência Social (CMAS)
              </CardTitle>
              <CardDescription>Acompanhamento das atividades do controle social e deliberações do CMAS.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {conselhoCmas.map((item) => (
                  <div key={item.item} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm text-muted-foreground">{item.item}</p>
                      <Badge variant={item.status === "Bom" ? "default" : item.status === "Regular" ? "outline" : "secondary"}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-2xl font-semibold">{item.valor}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patrimonio" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiCard
              title="Bens Ativos da Rede"
              icon={Wallet01Icon}
              value={formatNumber(patrimonioResumo.bensAtivos)}
              borderColor="border-l-emerald-700"
              footer={<p className="text-sm text-muted-foreground">Equipamentos, mobiliário, veículos e bens permanentes da assistência social</p>}
            />
            <KpiCard
              title="Valor Patrimonial Atualizado"
              icon={BankIcon}
              value={formatCurrency(patrimonioResumo.valorAtualizado)}
              borderColor="border-l-emerald-700"
              footer={<p className="text-sm text-muted-foreground">Base patrimonial das unidades e equipamentos vinculados</p>}
            />
            <KpiCard
              title="Termos Atualizados"
              icon={Target01Icon}
              value={`${patrimonioResumo.termosAtualizadosPct}%`}
              borderColor="border-l-emerald-700"
              footer={<Progress value={patrimonioResumo.termosAtualizadosPct} className="h-2" />}
            />
            <KpiCard
              title="Manutenção Preventiva"
              icon={ChartLineData02Icon}
              value={`${patrimonioResumo.manutencaoPreventivaPct}%`}
              borderColor="border-l-emerald-700"
              footer={<p className="text-sm text-muted-foreground">Cobertura dos itens críticos com revisão periódica</p>}
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} className="size-5" />
                  Inventário por Unidade Socioassistencial
                </CardTitle>
                <CardDescription>Conciliação patrimonial, criticidade e valor do acervo por unidade.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unidade</TableHead>
                      <TableHead className="text-right">Bens</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="text-right">Inventário</TableHead>
                      <TableHead>Criticidade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unidadesPatrimoniais.map((item) => (
                      <TableRow key={item.unidade}>
                        <TableCell className="font-medium">{item.unidade}</TableCell>
                        <TableCell className="text-right">{formatNumber(item.bens)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.valor)}</TableCell>
                        <TableCell className="text-right">{item.inventario}%</TableCell>
                        <TableCell>
                          <Badge variant={badgeVariant(item.criticidade)}>{item.criticidade}</Badge>
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
                  <HugeiconsIcon icon={ChartLineData02Icon} strokeWidth={2} className="size-5" />
                  Movimentações Patrimoniais
                </CardTitle>
                <CardDescription>Incorporações, transferências, baixas e pendências de regularização do exercício.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartMovimentacoesPatrimoniais} className="h-[320px] w-full">
                  <BarChart data={movimentacoesPatrimoniais} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="tipo" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `R$ ${(Number(value) / 1000).toFixed(0)}k`} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                    <Bar dataKey="valor" fill="var(--color-valor)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Controle de Manutenção de Ativos</CardTitle>
                <CardDescription>Acompanhamento da manutenção preventiva e corretiva dos bens utilizados na oferta de serviços.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {manutencaoPatrimonial.map((item) => (
                  <div key={item.categoria} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.categoria}</p>
                        <p className="text-sm text-muted-foreground">Total: {item.total} itens | Corretivas abertas: {item.corretivaAberta}</p>
                      </div>
                      <Badge variant={badgeVariant(item.status)}>{item.status}</Badge>
                    </div>
                    <Progress value={(item.preventivaEmDia / item.total) * 100} className="mt-4 h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Termos de Responsabilidade</CardTitle>
                <CardDescription>Regularidade dos termos vinculados aos bens permanentes da rede socioassistencial.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Setor</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Atualizados</TableHead>
                      <TableHead className="text-right">Vencendo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {termosResponsabilidade.map((item) => (
                      <TableRow key={item.setor}>
                        <TableCell className="font-medium">{item.setor}</TableCell>
                        <TableCell className="text-right">{item.total}</TableCell>
                        <TableCell className="text-right">{item.atualizados}</TableCell>
                        <TableCell className="text-right">{item.vencendo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analises" className="mt-6 space-y-6">
          <div className="relative py-4">
            <Separator />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-muted px-4 dark:bg-background">
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Análises</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumo Analítico</CardTitle>
              <CardDescription>Indicadores consolidados de execução, cobertura e controle patrimonial da assistência social.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Cobertura média</p>
                  <p className="text-3xl font-bold">{analiseExecutiva.coberturaMedia.toFixed(1)}%</p>
                  <Badge variant="outline">Estável</Badge>
                </div>
                <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Conciliação bancária</p>
                  <p className="text-3xl font-bold">{analiseExecutiva.conciliacaoBancaria.toFixed(1)}%</p>
                  <Badge variant="secondary" className="text-green-700">Boa</Badge>
                </div>
                <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Execução financeira</p>
                  <p className="text-3xl font-bold">{analiseExecutiva.execucaoFinanceira.toFixed(1)}%</p>
                  <Badge variant="outline">Dentro da meta</Badge>
                </div>
                <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Índice de territorialização</p>
                  <p className="text-3xl font-bold">{analiseExecutiva.indiceTerritorializacao.toFixed(1)}%</p>
                  <Badge variant="secondary">Expansão orientada</Badge>
                </div>
                <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-center lg:col-span-4 xl:col-span-1">
                  <p className="text-sm font-medium text-muted-foreground">Termos patrimoniais atualizados</p>
                  <p className="text-3xl font-bold">{patrimonioResumo.termosAtualizadosPct}%</p>
                  <Badge variant="outline">Controle em evolução</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={ChartLineData02Icon} strokeWidth={2} className="size-5" />
                  Leitura Executiva da Política
                </CardTitle>
                <CardDescription>Principais relações entre orçamento, capacidade de entrega e cobertura socioassistencial.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border bg-muted/40 p-4">
                  <p className="text-sm font-medium text-foreground">1. Execução com governança financeira adequada</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A secretaria mantém execução financeira de <strong className="text-foreground">{analiseExecutiva.execucaoFinanceira.toFixed(1)}%</strong> e conciliação bancária de <strong className="text-foreground">{analiseExecutiva.conciliacaoBancaria.toFixed(1)}%</strong>, indicando boa aderência entre planejamento, despesa e controle das contas vinculadas.
                  </p>
                </div>
                <div className="rounded-2xl border bg-muted/40 p-4">
                  <p className="text-sm font-medium text-foreground">2. Programas estruturantes sustentam a cobertura média</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    CadÚnico, BPC e SCFV concentram os melhores resultados operacionais e ajudam a manter a cobertura média em <strong className="text-foreground">{analiseExecutiva.coberturaMedia.toFixed(1)}%</strong>, com potencial de melhoria por maior integração entre CRAS e gestão de benefícios.
                  </p>
                </div>
                <div className="rounded-2xl border bg-muted/40 p-4">
                  <p className="text-sm font-medium text-foreground">3. Habitação exige aceleração técnico-documental</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    O bloco de habitação e regularização apresenta menor ritmo de liquidação e pagamento, pressionando metas finalísticas e exigindo priorização dos processos documentais, sociais e jurídicos.
                  </p>
                </div>
                <div className="rounded-2xl border bg-muted/40 p-4">
                  <p className="text-sm font-medium text-foreground">4. Controle patrimonial influencia a continuidade dos serviços</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A rede socioassistencial depende de bens permanentes em bom estado, com inventário conciliado, termos atualizados e manutenção preventiva em dia. As maiores fragilidades concentram-se em Habitação Social e em parte dos equipamentos do SCFV.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={Target01Icon} strokeWidth={2} className="size-5" />
                  Prioridades Gerenciais
                </CardTitle>
                <CardDescription>Agenda recomendada para ampliar efetividade e reduzir risco de subexecução.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">Regularização fundiária e habitação</p>
                    <Badge variant="destructive">Alta prioridade</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Reforçar triagem documental, vistorias e integração com cadastro imobiliário e jurídico.</p>
                </div>
                <div className="rounded-2xl border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">Busca ativa do PETI e do PAA</p>
                    <Badge variant="secondary">Monitoramento</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Cruzamento territorial com educação, saúde e visitas domiciliares para elevar cobertura.</p>
                </div>
                <div className="rounded-2xl border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">Execução por fonte vinculada</p>
                    <Badge variant="outline">Controle mensal</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Monitorar fonte, objeto financiado, saldo disponível e cronograma de execução física e financeira.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-l-4 border-l-primary bg-gradient-to-br from-primary/5 via-background to-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon icon={BulbIcon} strokeWidth={2} className="size-5 text-primary" />
                Análise Inteligente
              </CardTitle>
              <CardDescription>Interpretação gerencial com foco em execução, cobertura social e integridade patrimonial da rede.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                A secretaria apresenta <strong className="text-foreground">boa consistência entre execução orçamentária, conciliação financeira e cobertura dos principais programas</strong>. CadÚnico, BPC e SCFV sustentam desempenho satisfatório, enquanto <strong className="text-foreground">Habitação/Regularização</strong> e <strong className="text-foreground">PAA</strong> requerem reforço operacional. Do ponto de vista patrimonial, o cenário é de <strong className="text-foreground">controle moderadamente maduro, porém com fragilidades localizadas</strong> em inventário físico, termos de responsabilidade e manutenção preventiva de ativos críticos da rede.
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="fortes">
                  <AccordionTrigger>Pontos Fortes</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>- Cobertura robusta do CadÚnico.</p>
                      <p>- BPC com acompanhamento elevado.</p>
                      <p>- Contas vinculadas com conciliação estável.</p>
                      <p>- Rede CRAS com inventário patrimonial acima de 90% em boa parte das unidades.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="atencao">
                  <AccordionTrigger>Pontos de Atenção</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>- Habitação abaixo da meta anual.</p>
                      <p>- PETI e PAA exigem intensificação de busca ativa.</p>
                      <p>- Parte do saldo vinculado depende de instrução processual célere.</p>
                      <p>- A unidade de Habitação Social e parte do SCFV exigem saneamento patrimonial e reforço na manutenção de bens.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="recomendacoes">
                  <AccordionTrigger>Recomendações Estratégicas</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div className="rounded-lg border bg-emerald-50/50 p-3 dark:bg-emerald-950/20">
                        <p className="text-sm font-medium text-foreground">1. Implantar rotina semanal de sala de situação</p>
                        <p className="text-xs text-muted-foreground">Cruzar execução financeira, agenda crítica e cobertura territorial para decisões rápidas da gestão.</p>
                      </div>
                      <div className="rounded-lg border bg-emerald-50/50 p-3 dark:bg-emerald-950/20">
                        <p className="text-sm font-medium text-foreground">2. Concentrar esforço técnico em Habitação</p>
                        <p className="text-xs text-muted-foreground">Formar força-tarefa documental e jurídica para acelerar dossiês e metas da regularização fundiária.</p>
                      </div>
                      <div className="rounded-lg border bg-emerald-50/50 p-3 dark:bg-emerald-950/20">
                        <p className="text-sm font-medium text-foreground">3. Usar territorialização para priorizar busca ativa</p>
                        <p className="text-xs text-muted-foreground">Direcionar ações nos territórios Norte e Leste, que concentram mais famílias do CadÚnico e do Bolsa Família.</p>
                      </div>
                      <div className="rounded-lg border bg-emerald-50/50 p-3 dark:bg-emerald-950/20">
                        <p className="text-sm font-medium text-foreground">4. Implantar rotina patrimonial por unidade</p>
                        <p className="text-xs text-muted-foreground">Monitorar inventário, movimentações, manutenção e termos de responsabilidade de cada CRAS, CREAS e unidade vinculada.</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="projecoes">
                  <AccordionTrigger>Projeções e Cenários</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-xs text-muted-foreground">Cobertura média projetada</p>
                        <p className="text-xl font-bold">86,2%</p>
                        <p className="text-xs text-muted-foreground">Com reforço em PETI, PAA e Habitação</p>
                      </div>
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-xs text-muted-foreground">Inventário patrimonial projetado</p>
                        <p className="text-xl font-bold text-green-600">92,5%</p>
                        <p className="text-xs text-muted-foreground">Com mutirão nas unidades críticas</p>
                      </div>
                      <div className="rounded-lg border bg-primary/5 p-3 text-center">
                        <p className="text-xs text-muted-foreground">Termos atualizados projetados</p>
                        <p className="text-xl font-bold text-primary">94,0%</p>
                        <p className="text-xs text-muted-foreground">Após revisão dos responsáveis</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="flex gap-3">
                  <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Conclusão Analítica</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      O cenário da Assistência Social é de <strong className="text-foreground">estabilidade com capacidade de expansão qualificada</strong>. O principal desafio não está apenas no controle financeiro, mas na transformação do saldo disponível em entregas finalísticas mais rápidas e no fortalecimento da <strong className="text-foreground">governança patrimonial da rede</strong>. Com gestão territorial ativa, priorização documental, inventário físico recorrente e manutenção preventiva dos bens permanentes, a secretaria tende a encerrar o exercício com melhor cobertura, maior efetividade social e menor risco de ressalvas pelos órgãos de controle.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Alertas e Notificações</h3>
            <div className="grid gap-3 lg:grid-cols-2">
              {alertasAnalise.map((alerta) => (
                <Alert key={`${alerta.badge}-${alerta.titulo}`} variant={alerta.tipo === "warning" ? "destructive" : "default"}>
                  <HugeiconsIcon
                    icon={alerta.tipo === "warning" ? Alert02Icon : alerta.tipo === "success" ? CheckmarkCircle02Icon : InformationCircleIcon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  <AlertTitle className="flex items-center gap-2">
                    {alerta.titulo}
                    <Badge variant="outline" className="text-xs">{alerta.badge}</Badge>
                  </AlertTitle>
                  <AlertDescription>{alerta.descricao}</AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
