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
import { ScrollArea } from "@/components/ui/scroll-area";
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
  CheckmarkCircle02Icon,
  Target01Icon,
  ChartLineData02Icon,
  PieChart02Icon,
  Clock01Icon,
  StarIcon,
  Alert02Icon,
  MoneyAdd01Icon,
  MoneySend01Icon,
  BankIcon,
  Building04Icon,
  Home01Icon,
  CreditCardIcon,
  CoinsSwapIcon,
  FolderCheckIcon,
  UserMultipleIcon,
  Coins01Icon,
  MoneyExchange01Icon,
} from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { KpiCard } from "@/components/ui/kpi-card";

// Formatadores
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatMillions = (value: number) => {
  return `R$ ${(value / 1000000).toFixed(1)}M`;
};

const calcPercent = (value: number, total: number) => {
  return ((value / total) * 100).toFixed(1);
};

// Dados de fontes de recursos
const fontesRecursos = [
  {
    codigo: "100",
    nome: "Recursos Ordinários",
    saldoInicial: 12500000,
    entradas: 45800000,
    saidas: 42300000,
    saldoAtual: 16000000,
  },
  {
    codigo: "101",
    nome: "Receitas de Impostos - Educação",
    saldoInicial: 4200000,
    entradas: 18900000,
    saidas: 17800000,
    saldoAtual: 5300000,
  },
  {
    codigo: "102",
    nome: "Receitas de Impostos - Saúde",
    saldoInicial: 3800000,
    entradas: 22400000,
    saidas: 21600000,
    saldoAtual: 4600000,
  },
  {
    codigo: "114",
    nome: "FUNDEB",
    saldoInicial: 2100000,
    entradas: 28500000,
    saidas: 27200000,
    saldoAtual: 3400000,
  },
  {
    codigo: "115",
    nome: "Transferências SUS",
    saldoInicial: 1800000,
    entradas: 15600000,
    saidas: 14900000,
    saldoAtual: 2500000,
  },
  {
    codigo: "159",
    nome: "Convênios Federais",
    saldoInicial: 850000,
    entradas: 4200000,
    saidas: 3100000,
    saldoAtual: 1950000,
  },
  {
    codigo: "259",
    nome: "Convênios Estaduais",
    saldoInicial: 620000,
    entradas: 2800000,
    saidas: 2400000,
    saldoAtual: 1020000,
  },
];

// Dados de contas bancárias
const contasBancarias = [
  {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12345-6",
    tipo: "Movimento",
    fonte: "100",
    saldo: 8500000,
    status: "conciliada",
  },
  {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12346-7",
    tipo: "Vinculada Educação",
    fonte: "101",
    saldo: 3200000,
    status: "conciliada",
  },
  {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12347-8",
    tipo: "Vinculada Saúde",
    fonte: "102",
    saldo: 2800000,
    status: "pendente",
  },
  {
    banco: "Caixa Econômica",
    agencia: "0567",
    conta: "98765-4",
    tipo: "FUNDEB",
    fonte: "114",
    saldo: 3400000,
    status: "conciliada",
  },
  {
    banco: "Caixa Econômica",
    agencia: "0567",
    conta: "98766-5",
    tipo: "Convênios",
    fonte: "159",
    saldo: 1950000,
    status: "divergente",
  },
  {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12348-9",
    tipo: "Aplicações",
    fonte: "100",
    saldo: 5200000,
    status: "conciliada",
  },
];

// Dados de receitas lançadas
const receitasLancadas = [
  {
    data: "29/11/2024",
    documento: "DAM-2024-15678",
    contribuinte: "Empresa Alpha Ltda",
    tipo: "ISS",
    valor: 45800,
    status: "pago",
  },
  {
    data: "28/11/2024",
    documento: "DAM-2024-15677",
    contribuinte: "Comercio Beta SA",
    tipo: "ISS",
    valor: 32500,
    status: "pago",
  },
  {
    data: "28/11/2024",
    documento: "IPTU-2024-8901",
    contribuinte: "Maria Silva",
    tipo: "IPTU",
    valor: 2800,
    status: "pendente",
  },
  {
    data: "27/11/2024",
    documento: "ITBI-2024-456",
    contribuinte: "Joao Santos",
    tipo: "ITBI",
    valor: 18500,
    status: "pago",
  },
  {
    data: "27/11/2024",
    documento: "DAM-2024-15676",
    contribuinte: "Servicos Gama",
    tipo: "ISS",
    valor: 28900,
    status: "vencido",
  },
  {
    data: "26/11/2024",
    documento: "TAXA-2024-789",
    contribuinte: "Restaurante Delta",
    tipo: "Taxa",
    valor: 1200,
    status: "pago",
  },
];

// Dados de aplicacoes financeiras
const aplicacoesFinanceiras = [
  {
    instituicao: "Banco do Brasil",
    tipo: "CDB",
    dataAplicacao: "01/01/2024",
    valorAplicado: 3000000,
    rendimento: 285000,
    saldoAtual: 3285000,
    taxa: "102% CDI",
  },
  {
    instituicao: "Caixa Economica",
    tipo: "Fundo RF",
    dataAplicacao: "15/03/2024",
    valorAplicado: 1500000,
    rendimento: 98500,
    saldoAtual: 1598500,
    taxa: "98% CDI",
  },
  {
    instituicao: "Banco do Brasil",
    tipo: "Poupanca",
    dataAplicacao: "01/06/2024",
    valorAplicado: 800000,
    rendimento: 32000,
    saldoAtual: 832000,
    taxa: "TR + 0.5%",
  },
];

// Últimos pagamentos
const ultimosPagamentos = [
  {
    data: "29/11/2024",
    empenho: "2024NE003456",
    credor: "Construtora Silva",
    valor: 185000,
    fonte: "159",
    tipo: "Obra",
  },
  {
    data: "29/11/2024",
    empenho: "2024NE003455",
    credor: "Distribuidora de Medicamentos",
    valor: 89500,
    fonte: "102",
    tipo: "Material",
  },
  {
    data: "28/11/2024",
    empenho: "2024NE003450",
    credor: "Merenda Escolar Ltda",
    valor: 156000,
    fonte: "101",
    tipo: "Alimentacao",
  },
  {
    data: "28/11/2024",
    empenho: "2024NE003448",
    credor: "Combustíveis XYZ",
    valor: 45800,
    fonte: "100",
    tipo: "Combustível",
  },
  {
    data: "27/11/2024",
    empenho: "2024NE003445",
    credor: "Empresa de Limpeza",
    valor: 78900,
    fonte: "100",
    tipo: "Servico",
  },
];

// Maiores fornecedores/credores
const maioresFornecedores = [
  {
    nome: "Construtora Silva & Associados",
    cnpj: "12.345.678/0001-90",
    totalPago: 8500000,
    aPagar: 2100000,
    contratos: 3,
  },
  {
    nome: "Distribuidora de Medicamentos ABC",
    cnpj: "23.456.789/0001-01",
    totalPago: 5200000,
    aPagar: 890000,
    contratos: 2,
  },
  {
    nome: "Merenda Escolar Ltda",
    cnpj: "34.567.890/0001-12",
    totalPago: 4800000,
    aPagar: 650000,
    contratos: 1,
  },
  {
    nome: "Transporte Urbano SA",
    cnpj: "45.678.901/0001-23",
    totalPago: 3900000,
    aPagar: 420000,
    contratos: 1,
  },
  {
    nome: "Tecnologia Municipal",
    cnpj: "56.789.012/0001-34",
    totalPago: 2100000,
    aPagar: 180000,
    contratos: 4,
  },
];

// Maiores contribuintes
const maioresContribuintes = [
  {
    nome: "Supermercados Uniao SA",
    cnpj: "11.222.333/0001-44",
    arrecadado: 1850000,
    tributo: "ISS",
    regularidade: "regular",
  },
  {
    nome: "Banco Nacional SA",
    cnpj: "22.333.444/0001-55",
    arrecadado: 1420000,
    tributo: "ISS",
    regularidade: "regular",
  },
  {
    nome: "Shopping Center Norte",
    cnpj: "33.444.555/0001-66",
    arrecadado: 980000,
    tributo: "ISS/IPTU",
    regularidade: "regular",
  },
  {
    nome: "Construtora Omega",
    cnpj: "44.555.666/0001-77",
    arrecadado: 750000,
    tributo: "ITBI",
    regularidade: "irregular",
  },
  {
    nome: "Indústria Metalúrgica Beta",
    cnpj: "55.666.777/0001-88",
    arrecadado: 620000,
    tributo: "ISS",
    regularidade: "regular",
  },
];

// Saldos a pagar por vencimento
const saldosAPagar = [
  { vencimento: "Vencidos", quantidade: 45, valor: 1250000, percentual: 8 },
  { vencimento: "Até 7 dias", quantidade: 89, valor: 3200000, percentual: 21 },
  { vencimento: "8-15 dias", quantidade: 67, valor: 2800000, percentual: 18 },
  { vencimento: "16-30 dias", quantidade: 124, valor: 4500000, percentual: 29 },
  {
    vencimento: "Acima 30 dias",
    quantidade: 98,
    valor: 3650000,
    percentual: 24,
  },
];

// Saldos a receber
const saldosAReceber = [
  { tipo: "IPTU", vencido: 2800000, aVencer: 4200000, total: 7000000 },
  { tipo: "ISS", vencido: 850000, aVencer: 1200000, total: 2050000 },
  { tipo: "ITBI", vencido: 120000, aVencer: 380000, total: 500000 },
  { tipo: "Taxas", vencido: 450000, aVencer: 680000, total: 1130000 },
  { tipo: "Dívida Ativa", vencido: 12500000, aVencer: 0, total: 12500000 },
];

// Eventos por tipo
const eventosEmpenhos = [
  {
    data: "29/11/2024",
    hora: "16:45",
    descricao: "Empenho 2024NE003458 - Material de escritório",
    valor: 12500,
  },
  {
    data: "29/11/2024",
    hora: "14:30",
    descricao: "Empenho 2024NE003457 - Serviços de manutenção",
    valor: 45800,
  },
  {
    data: "29/11/2024",
    hora: "11:20",
    descricao: "Empenho 2024NE003456 - Obra pavimentação",
    valor: 185000,
  },
  {
    data: "28/11/2024",
    hora: "17:15",
    descricao: "Empenho 2024NE003455 - Medicamentos",
    valor: 89500,
  },
  {
    data: "28/11/2024",
    hora: "09:45",
    descricao: "Empenho 2024NE003454 - Combustível",
    valor: 32000,
  },
];

const eventosLiquidacoes = [
  {
    data: "29/11/2024",
    hora: "17:00",
    descricao: "Liquidação 2024NL002890 - Construtora Silva",
    valor: 185000,
  },
  {
    data: "29/11/2024",
    hora: "15:30",
    descricao: "Liquidação 2024NL002889 - Distribuidora ABC",
    valor: 89500,
  },
  {
    data: "28/11/2024",
    hora: "16:45",
    descricao: "Liquidação 2024NL002888 - Merenda Escolar",
    valor: 156000,
  },
  {
    data: "28/11/2024",
    hora: "14:20",
    descricao: "Liquidação 2024NL002887 - Combustíveis XYZ",
    valor: 45800,
  },
  {
    data: "27/11/2024",
    hora: "11:30",
    descricao: "Liquidação 2024NL002886 - Empresa Limpeza",
    valor: 78900,
  },
];

const eventosPagamentos = [
  {
    data: "29/11/2024",
    hora: "17:30",
    descricao: "OB 2024OB004567 - Construtora Silva",
    valor: 185000,
  },
  {
    data: "29/11/2024",
    hora: "16:00",
    descricao: "OB 2024OB004566 - Distribuidora ABC",
    valor: 89500,
  },
  {
    data: "28/11/2024",
    hora: "17:00",
    descricao: "OB 2024OB004565 - Merenda Escolar",
    valor: 156000,
  },
  {
    data: "28/11/2024",
    hora: "15:30",
    descricao: "OB 2024OB004564 - Combustíveis XYZ",
    valor: 45800,
  },
  {
    data: "27/11/2024",
    hora: "14:00",
    descricao: "OB 2024OB004563 - Empresa Limpeza",
    valor: 78900,
  },
];

const eventosArrecadacao = [
  {
    data: "29/11/2024",
    hora: "18:00",
    descricao: "Credito FPM - Cota Decendial",
    valor: 2850000,
  },
  {
    data: "29/11/2024",
    hora: "12:30",
    descricao: "Arrecadação ISS - Empresas diversas",
    valor: 185000,
  },
  {
    data: "28/11/2024",
    hora: "18:00",
    descricao: "Credito ICMS - Cota Parte",
    valor: 1200000,
  },
  {
    data: "28/11/2024",
    hora: "14:45",
    descricao: "Arrecadação IPTU - Guias diversas",
    valor: 89000,
  },
  {
    data: "27/11/2024",
    hora: "16:30",
    descricao: "Credito FUNDEB - Complementacao",
    valor: 420000,
  },
];

const eventosTransferencias = [
  {
    data: "29/11/2024",
    hora: "15:00",
    descricao: "Transf. Conta Movimento para Aplicacao",
    valor: 500000,
  },
  {
    data: "28/11/2024",
    hora: "11:00",
    descricao: "Resgate Aplicacao para Pagamentos",
    valor: 350000,
  },
  {
    data: "27/11/2024",
    hora: "14:30",
    descricao: "Transf. entre fontes - Remanejamento",
    valor: 120000,
  },
  {
    data: "26/11/2024",
    hora: "16:00",
    descricao: "Aplicação de recursos do FUNDEB",
    valor: 280000,
  },
  {
    data: "25/11/2024",
    hora: "10:30",
    descricao: "Transf. Conta Vinculada Saúde",
    valor: 450000,
  },
];

// Conciliações bancárias
const conciliacoesBancarias = [
  {
    conta: "12345-6",
    banco: "BB",
    competencia: "Nov/2024",
    saldoBanco: 8500000,
    saldoContabil: 8500000,
    diferenca: 0,
    status: "conciliada",
  },
  {
    conta: "12346-7",
    banco: "BB",
    competencia: "Nov/2024",
    saldoBanco: 3200000,
    saldoContabil: 3200000,
    diferenca: 0,
    status: "conciliada",
  },
  {
    conta: "12347-8",
    banco: "BB",
    competencia: "Nov/2024",
    saldoBanco: 2850000,
    saldoContabil: 2800000,
    diferenca: 50000,
    status: "pendente",
  },
  {
    conta: "98765-4",
    banco: "CEF",
    competencia: "Nov/2024",
    saldoBanco: 3400000,
    saldoContabil: 3400000,
    diferenca: 0,
    status: "conciliada",
  },
  {
    conta: "98766-5",
    banco: "CEF",
    competencia: "Nov/2024",
    saldoBanco: 1980000,
    saldoContabil: 1950000,
    diferenca: 30000,
    status: "divergente",
  },
];

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
];

// Totais gerais
const totaisFinanceiros = {
  saldoTotal: 34770000,
  totalEntradas: 138400000,
  totalSaidas: 131500000,
  aplicacoes: 5715500,
  aPagar: 15400000,
  aReceber: 23180000,
};

// Metas financeiras
const metasFinanceiro = [
  {
    indicador: "Liquidez Imediata",
    meta: 1.5,
    realizado: 2.26,
    unidade: "",
    status: "atingido",
    descricao: "Disponível / A Pagar",
  },
  {
    indicador: "Contas Conciliadas",
    meta: 95,
    realizado: 80,
    unidade: "%",
    status: "atencao",
    descricao: "Atualizadas mensalmente",
  },
  {
    indicador: "Aplicações Financeiras",
    meta: 5000000,
    realizado: 5715500,
    unidade: "R$",
    status: "atingido",
    descricao: "Meta de investimento superada",
  },
  {
    indicador: "Pagamentos em Dia",
    meta: 98,
    realizado: 96,
    unidade: "%",
    status: "atencao",
    descricao: "Pontualidade nos pagamentos",
  },
  {
    indicador: "Receita em Conta",
    meta: 90,
    realizado: 92,
    unidade: "%",
    descricao: "Arrecadação disponível vs total",
  },
  {
    indicador: "Provisão Mensal",
    meta: 15000000,
    realizado: 15400000,
    unidade: "R$",
    status: "atingido",
    descricao: "Reserva para pagamentos",
  },
];

// Disponibilidade por Fonte de Recurso (chart)
const disponibilidadePorFonte = [
  { nome: "Recursos Ordinários", valor: 16000000, fill: "var(--chart-1)" },
  { nome: "Educação", valor: 5300000, fill: "var(--chart-2)" },
  { nome: "Saúde", valor: 4600000, fill: "var(--chart-3)" },
  { nome: "FUNDEB", valor: 3400000, fill: "var(--chart-4)" },
  { nome: "SUS", valor: 2500000, fill: "var(--chart-5)" },
  { nome: "Convênios", valor: 2970000, fill: "var(--chart-6)" },
];

// Projeção de Fluxo de Caixa (próximos meses)
const projecaoFluxoCaixa = [
  {
    mes: "Dez/24",
    entradasPrevistas: 15200000,
    saidasPrevistas: 16800000,
    saldoProjetado: -1600000,
    confianca: "alta",
  },
  {
    mes: "Jan/25",
    entradasPrevistas: 10500000,
    saidasPrevistas: 11200000,
    saldoProjetado: -700000,
    confianca: "média",
  },
  {
    mes: "Fev/25",
    entradasPrevistas: 11800000,
    saidasPrevistas: 10900000,
    saldoProjetado: 900000,
    confianca: "média",
  },
  {
    mes: "Mar/25",
    entradasPrevistas: 13200000,
    saidasPrevistas: 12100000,
    saldoProjetado: 1100000,
    confianca: "baixa",
  },
];

const saldoAcumuladoProjetado = projecaoFluxoCaixa.reduce((acc, item) => {
  const novoSaldo = acc + item.saldoProjetado;
  return novoSaldo;
}, totaisFinanceiros.saldoTotal);

// Cobertura de Compromissos
const mediaSaidasMensal = totaisFinanceiros.totalSaidas / 11; // 11 meses até novembro
const mesesCobertura = totaisFinanceiros.saldoTotal / mediaSaidasMensal;
const coberturaComPromissos = [
  {
    indicador: "Saldo Disponível",
    valor: totaisFinanceiros.saldoTotal,
    formatado: formatCurrency(totaisFinanceiros.saldoTotal),
  },
  {
    indicador: "Média Mensal de Saídas",
    valor: mediaSaidasMensal,
    formatado: formatCurrency(mediaSaidasMensal),
  },
  {
    indicador: "Meses de Cobertura",
    valor: mesesCobertura,
    formatado: `${mesesCobertura.toFixed(1)} meses`,
  },
  {
    indicador: "Compromissos Vencidos",
    valor: 1250000,
    formatado: formatCurrency(1250000),
  },
  {
    indicador: "Compromissos Próx. 30 dias",
    valor: 6000000,
    formatado: formatCurrency(6000000),
  },
  {
    indicador: "Compromissos Próx. 60 dias",
    valor: 10500000,
    formatado: formatCurrency(10500000),
  },
];

// Concentração de Fornecedores (Análise de Pareto / HHI)
const totalPagoFornecedores = maioresFornecedores.reduce(
  (a, b) => a + b.totalPago,
  0,
);
const concentracaoFornecedores = maioresFornecedores.map((forn, index) => {
  const percentual = (forn.totalPago / totalPagoFornecedores) * 100;
  const acumulado =
    (maioresFornecedores
      .slice(0, index + 1)
      .reduce((a, b) => a + b.totalPago, 0) /
      totalPagoFornecedores) *
    100;
  return {
    ...forn,
    percentual: Number(percentual.toFixed(1)),
    acumulado: Number(acumulado.toFixed(1)),
  };
});
const hhi = maioresFornecedores.reduce((acc, forn) => {
  const share = (forn.totalPago / totalPagoFornecedores) * 100;
  return acc + share * share;
}, 0);
const riscoConcentracao =
  hhi > 2500 ? "alto" : hhi > 1500 ? "moderado" : "baixo";

// Benchmark Financeiro Municipal
const benchmarkFinanceiro = [
  {
    municipio: "Município Atual",
    liquidez: 2.26,
    conciliacao: 80,
    rendimento: 7.8,
    cobertura: Number(mesesCobertura.toFixed(1)),
    inadimplencia: 24.2,
    destaque: true,
  },
  {
    municipio: "Município A (Similar)",
    liquidez: 1.85,
    conciliacao: 92,
    rendimento: 6.5,
    cobertura: 2.1,
    inadimplencia: 18.5,
    destaque: false,
  },
  {
    municipio: "Município B (Similar)",
    liquidez: 1.42,
    conciliacao: 88,
    rendimento: 7.2,
    cobertura: 1.8,
    inadimplencia: 32.1,
    destaque: false,
  },
  {
    municipio: "Município C (Similar)",
    liquidez: 2.58,
    conciliacao: 75,
    rendimento: 5.9,
    cobertura: 3.5,
    inadimplencia: 28.7,
    destaque: false,
  },
  {
    municipio: "Média Regional",
    liquidez: 1.92,
    conciliacao: 84,
    rendimento: 6.5,
    cobertura: 2.4,
    inadimplencia: 25.8,
    destaque: false,
  },
];

export function FinanceiroMunicipal() {
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024");
  const [abaSelecionada, setAbaSelecionada] = React.useState("fontes");

  return (
    <div className="space-y-8">
      {/* KPIs Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Saldo Total em Contas"
          icon={Wallet01Icon}
          value={formatCurrency(totaisFinanceiros.saldoTotal)}
          borderColor="border-l-blue-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-green-600"
              />
              <span className="text-green-600">+2.3%</span>
              <span>vs. mês anterior</span>
            </div>
          }
        />
        <KpiCard
          title="Total Entradas (Ano)"
          icon={MoneyAdd01Icon}
          value={formatCurrency(totaisFinanceiros.totalEntradas)}
          borderColor="border-l-green-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-green-600"
              />
              <span className="text-green-600">+8.5%</span>
              <span>vs. ano anterior</span>
            </div>
          }
        />
        <KpiCard
          title="Total Saídas (Ano)"
          icon={MoneySend01Icon}
          value={formatCurrency(totaisFinanceiros.totalSaidas)}
          borderColor="border-l-red-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-amber-600"
              />
              <span className="text-amber-600">+6.2%</span>
              <span>vs. ano anterior</span>
            </div>
          }
        />
        <KpiCard
          title="Aplicações Financeiras"
          icon={CoinsSwapIcon}
          value={formatCurrency(totaisFinanceiros.aplicacoes)}
          borderColor="border-l-purple-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Rendimento acumulado:</span>
              <span className="text-green-600 font-medium">R$ 415,5K</span>
            </div>
          }
        />
      </div>

      {/* Fluxo de Caixa */}
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
                Fluxo de Caixa Mensal
              </CardTitle>
              <CardDescription>
                Entradas, saídas e saldo acumulado
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-green-600">
              Superávit:{" "}
              {formatCurrency(
                totaisFinanceiros.totalEntradas - totaisFinanceiros.totalSaidas,
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={
              {
                entradas: { label: "Entradas", color: "var(--chart-2)" },
                saidas: { label: "Saídas", color: "var(--chart-1)" },
                saldo: { label: "Saldo", color: "var(--chart-4)" },
              } satisfies ChartConfig
            }
            className="h-[300px] w-full"
          >
            <AreaChart data={fluxoCaixaMensal} margin={{ left: 0, right: 12 }}>
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
                tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => formatCurrency(Number(value))}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="entradas"
                fill="var(--color-entradas)"
                fillOpacity={0.3}
                stroke="var(--color-entradas)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="saidas"
                fill="var(--color-saidas)"
                fillOpacity={0.3}
                stroke="var(--color-saidas)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="saldo"
                stroke="var(--color-saldo)"
                strokeWidth={2}
                dot={false}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Metas de Gestão Financeira */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Target01Icon}
              strokeWidth={2}
              className="size-5"
            />
            Metas de Gestão Financeira
          </CardTitle>
          <CardDescription>
            Acompanhamento dos indicadores de desempenho
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metasFinanceiro.map((meta, index) => (
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
                      Meta:{" "}
                      {meta.unidade === "R$"
                        ? formatCurrency(meta.meta)
                        : `${meta.meta}${meta.unidade}`}
                    </span>
                    <span className="font-medium">
                      {meta.status === "atingido" ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <HugeiconsIcon
                            icon={CheckmarkCircle02Icon}
                            strokeWidth={2}
                            className="size-3"
                          />
                          {meta.unidade === "R$"
                            ? formatCurrency(meta.realizado)
                            : `${meta.realizado}${meta.unidade}`}
                        </span>
                      ) : (
                        <span className="text-amber-600">
                          {meta.unidade === "R$"
                            ? formatCurrency(meta.realizado)
                            : `${meta.realizado}${meta.unidade}`}
                        </span>
                      )}
                    </span>
                  </div>
                  <Progress
                    value={(meta.realizado / meta.meta) * 100}
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
          <TabsTrigger value="fontes" className="text-xs">
            Fontes
          </TabsTrigger>
          <TabsTrigger value="contas" className="text-xs">
            Contas
          </TabsTrigger>
          <TabsTrigger value="receitas" className="text-xs">
            Receitas
          </TabsTrigger>
          <TabsTrigger value="aplicacoes" className="text-xs">
            Aplicações
          </TabsTrigger>
          <TabsTrigger value="pagamentos" className="text-xs">
            Pagamentos
          </TabsTrigger>
          <TabsTrigger value="conciliacao" className="text-xs">
            Conciliação
          </TabsTrigger>
        </TabsList>

        {/* Fontes de Recursos */}
        <TabsContent value="fontes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Building06Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Controle por Fonte de Recursos
              </CardTitle>
              <CardDescription>
                Movimentação financeira por fonte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
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
                      <TableCell>
                        <Badge variant="outline">{fonte.codigo}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {fonte.nome}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(fonte.saldoInicial)}
                      </TableCell>
                      <TableCell className="text-right text-green-600">
                        {formatCurrency(fonte.entradas)}
                      </TableCell>
                      <TableCell className="text-right text-red-600">
                        {formatCurrency(fonte.saidas)}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(fonte.saldoAtual)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(
                        fontesRecursos.reduce((a, b) => a + b.saldoInicial, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-600">
                      {formatCurrency(
                        fontesRecursos.reduce((a, b) => a + b.entradas, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold text-red-600">
                      {formatCurrency(
                        fontesRecursos.reduce((a, b) => a + b.saidas, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(
                        fontesRecursos.reduce((a, b) => a + b.saldoAtual, 0),
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contas Bancárias */}
        <TabsContent value="contas" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={BankIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Controle por Conta Bancária
              </CardTitle>
              <CardDescription>Saldo e status das contas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {contasBancarias.map((conta, index) => (
                  <Card
                    key={index}
                    className={cn(
                      "relative overflow-hidden border-l-4",
                      conta.status === "conciliada"
                        ? "border-l-green-500"
                        : conta.status === "pendente"
                          ? "border-l-amber-500"
                          : "border-l-red-500",
                    )}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardDescription className="font-medium">
                          {conta.banco}
                        </CardDescription>
                        <Badge
                          variant={
                            conta.status === "conciliada"
                              ? "secondary"
                              : conta.status === "pendente"
                                ? "outline"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {conta.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{conta.tipo}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Ag: {conta.agencia} / CC: {conta.conta}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs text-muted-foreground">
                            Fonte {conta.fonte}
                          </span>
                          <span className="text-xl font-bold">
                            {formatCurrency(conta.saldo)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Receitas Lançadas */}
        <TabsContent value="receitas" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Invoice01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Receitas Lançadas
              </CardTitle>
              <CardDescription>Últimos lançamentos de receitas</CardDescription>
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
                      <TableCell className="text-muted-foreground">
                        {receita.data}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {receita.documento}
                      </TableCell>
                      <TableCell className="font-medium">
                        {receita.contribuinte}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{receita.tipo}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(receita.valor)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            receita.status === "pago"
                              ? "secondary"
                              : receita.status === "pendente"
                                ? "outline"
                                : "destructive"
                          }
                        >
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

        {/* Aplicações Financeiras */}
        <TabsContent value="aplicacoes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Coins01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Aplicações Financeiras
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
                          <HugeiconsIcon
                            icon={BankIcon}
                            strokeWidth={2}
                            className="size-4 text-muted-foreground"
                          />
                          <span className="font-medium">{app.instituicao}</span>
                          <Badge variant="secondary">{app.tipo}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Aplicado em: {app.dataAplicacao} | Taxa: {app.taxa}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Aplicado
                          </p>
                          <p className="font-semibold">
                            {formatCurrency(app.valorAplicado)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Rendimento
                          </p>
                          <p className="font-semibold text-green-600">
                            +{formatCurrency(app.rendimento)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Saldo Atual
                          </p>
                          <p className="font-bold">
                            {formatCurrency(app.saldoAtual)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Progress
                      value={(app.rendimento / app.valorAplicado) * 100}
                      className="mt-3 h-1.5"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-muted p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total em Aplicações</span>
                  <span className="text-xl font-bold">
                    {formatCurrency(
                      aplicacoesFinanceiras.reduce(
                        (a, b) => a + b.saldoAtual,
                        0,
                      ),
                    )}
                  </span>
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
                <HugeiconsIcon
                  icon={CreditCardIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Controle de Pagamentos
              </CardTitle>
              <CardDescription>Últimos pagamentos realizados</CardDescription>
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
                      <TableCell className="text-muted-foreground">
                        {pag.data}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {pag.empenho}
                      </TableCell>
                      <TableCell className="font-medium">
                        {pag.credor}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{pag.tipo}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{pag.fonte}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(pag.valor)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conciliação */}
        <TabsContent value="conciliacao" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={FolderCheckIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Conciliações Bancárias
              </CardTitle>
              <CardDescription>
                Status das conciliações do período
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Conta</TableHead>
                    <TableHead>Banco</TableHead>
                    <TableHead>Competência</TableHead>
                    <TableHead className="text-right">Saldo Banco</TableHead>
                    <TableHead className="text-right">Saldo Contábil</TableHead>
                    <TableHead className="text-right">Diferença</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conciliacoesBancarias.map((conc, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{conc.conta}</TableCell>
                      <TableCell>{conc.banco}</TableCell>
                      <TableCell>{conc.competencia}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(conc.saldoBanco)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(conc.saldoContabil)}
                      </TableCell>
                      <TableCell
                        className={`text-right ${conc.diferenca > 0 ? "text-red-600 font-medium" : ""}`}
                      >
                        {formatCurrency(conc.diferenca)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            conc.status === "conciliada"
                              ? "secondary"
                              : conc.status === "pendente"
                                ? "outline"
                                : "destructive"
                          }
                        >
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
              <HugeiconsIcon
                icon={Building04Icon}
                strokeWidth={2}
                className="size-5"
              />
              Maiores Fornecedores/Credores
            </CardTitle>
            <CardDescription>Top 5 por valor total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maioresFornecedores.map((forn, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar size="sm">
                    <AvatarFallback className="text-xs">
                      {index + 1}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate max-w-[180px]">
                        {forn.nome}
                      </p>
                      <span className="text-sm font-semibold">
                        {formatCurrency(forn.totalPago)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{forn.cnpj}</span>
                      <Badge variant="outline" className="text-xs">
                        A pagar: {formatCurrency(forn.aPagar)}
                      </Badge>
                    </div>
                    <Progress
                      value={
                        (forn.totalPago / maioresFornecedores[0].totalPago) *
                        100
                      }
                      className="h-1.5"
                    />
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
              <HugeiconsIcon
                icon={UserMultipleIcon}
                strokeWidth={2}
                className="size-5"
              />
              Maiores Contribuintes
            </CardTitle>
            <CardDescription>Top 5 por arrecadacao</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maioresContribuintes.map((cont, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar size="sm">
                    <AvatarFallback className="text-xs">
                      {index + 1}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate max-w-[180px]">
                        {cont.nome}
                      </p>
                      <span className="text-sm font-semibold text-green-600">
                        {formatCurrency(cont.arrecadado)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{cont.cnpj}</span>
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">
                          {cont.tributo}
                        </Badge>
                        <Badge
                          variant={
                            cont.regularidade === "regular"
                              ? "secondary"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {cont.regularidade}
                        </Badge>
                      </div>
                    </div>
                    <Progress
                      value={
                        (cont.arrecadado / maioresContribuintes[0].arrecadado) *
                        100
                      }
                      className="h-1.5"
                    />
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
              <HugeiconsIcon
                icon={MoneySend01Icon}
                strokeWidth={2}
                className="size-5 text-red-600"
              />
              Saldos a Pagar por Vencimento
            </CardTitle>
            <CardDescription>
              Total: {formatCurrency(totaisFinanceiros.aPagar)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {saldosAPagar.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-medium ${item.vencimento === "Vencidos" ? "text-red-600" : ""}`}
                      >
                        {item.vencimento}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {item.quantidade}
                      </Badge>
                    </div>
                    <span className="font-semibold">
                      {formatCurrency(item.valor)}
                    </span>
                  </div>
                  <Progress
                    value={item.percentual}
                    className={`h-2 ${item.vencimento === "Vencidos" ? "[&>div]:bg-red-500" : ""}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Saldos a Receber */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={MoneyReceiveSquareIcon}
                strokeWidth={2}
                className="size-5 text-green-600"
              />
              Saldos a Receber por Tipo
            </CardTitle>
            <CardDescription>
              Total: {formatCurrency(totaisFinanceiros.aReceber)}
            </CardDescription>
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
                    <TableCell className="text-right text-red-600">
                      {formatCurrency(item.vencido)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatCurrency(item.aVencer)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(item.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right font-bold text-red-600">
                    {formatCurrency(
                      saldosAReceber.reduce((a, b) => a + b.vencido, 0),
                    )}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(
                      saldosAReceber.reduce((a, b) => a + b.aVencer, 0),
                    )}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(
                      saldosAReceber.reduce((a, b) => a + b.total, 0),
                    )}
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
            <HugeiconsIcon
              icon={Clock01Icon}
              strokeWidth={2}
              className="size-5"
            />
            Eventos Recentes por Tipo
          </CardTitle>
          <CardDescription>
            Últimas movimentações do sistema financeiro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="empenhos" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="empenhos" className="text-xs">
                Empenhos
              </TabsTrigger>
              <TabsTrigger value="liquidacoes" className="text-xs">
                Liquidações
              </TabsTrigger>
              <TabsTrigger value="pagamentos" className="text-xs">
                Pagamentos
              </TabsTrigger>
              <TabsTrigger value="arrecadacao" className="text-xs">
                Arrecadação
              </TabsTrigger>
              <TabsTrigger value="transferencias" className="text-xs">
                Transf.
              </TabsTrigger>
            </TabsList>

            <TabsContent value="empenhos" className="mt-4">
              <div className="space-y-3">
                {eventosEmpenhos.map((evento, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2.5 rounded-full bg-blue-500" />
                      {index < eventosEmpenhos.length - 1 && (
                        <div className="w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {evento.data} - {evento.hora}
                        </p>
                        <Badge variant="secondary">
                          {formatCurrency(evento.valor)}
                        </Badge>
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
                      {index < eventosLiquidacoes.length - 1 && (
                        <div className="w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {evento.data} - {evento.hora}
                        </p>
                        <Badge variant="secondary">
                          {formatCurrency(evento.valor)}
                        </Badge>
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
                      {index < eventosPagamentos.length - 1 && (
                        <div className="w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {evento.data} - {evento.hora}
                        </p>
                        <Badge variant="secondary">
                          {formatCurrency(evento.valor)}
                        </Badge>
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
                      {index < eventosArrecadacao.length - 1 && (
                        <div className="w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {evento.data} - {evento.hora}
                        </p>
                        <Badge variant="secondary" className="text-green-600">
                          {formatCurrency(evento.valor)}
                        </Badge>
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
                      {index < eventosTransferencias.length - 1 && (
                        <div className="w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {evento.data} - {evento.hora}
                        </p>
                        <Badge variant="outline">
                          {formatCurrency(evento.valor)}
                        </Badge>
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

      {/* Disponibilidade por Fonte e Projeção de Fluxo de Caixa */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Disponibilidade por Fonte */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={PieChart02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Disponibilidade por Fonte
            </CardTitle>
            <CardDescription>
              Distribuição do saldo disponível por fonte de recurso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <ChartContainer
                config={
                  {
                    ordinarios: {
                      label: "Ordinários",
                      color: "var(--chart-1)",
                    },
                    educacao: { label: "Educação", color: "var(--chart-2)" },
                    saude: { label: "Saúde", color: "var(--chart-3)" },
                    fundeb: { label: "FUNDEB", color: "var(--chart-4)" },
                    sus: { label: "SUS", color: "var(--chart-5)" },
                    convenios: { label: "Convênios", color: "var(--chart-6)" },
                  } satisfies ChartConfig
                }
                className="mx-auto aspect-square h-[180px]"
              >
                <PieChart>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCurrency(Number(value))}
                        hideLabel
                      />
                    }
                  />
                  <Pie
                    data={disponibilidadePorFonte}
                    dataKey="valor"
                    nameKey="nome"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    label={({ percent }: { percent: number }) =>
                      `${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  />
                  <ChartLegend
                    content={<ChartLegendContent nameKey="nome" />}
                  />
                </PieChart>
              </ChartContainer>
              <div className="space-y-2">
                {disponibilidadePorFonte.map((fonte) => (
                  <div
                    key={fonte.nome}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">{fonte.nome}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {formatMillions(fonte.valor)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {(
                          (fonte.valor / totaisFinanceiros.saldoTotal) *
                          100
                        ).toFixed(1)}
                        %
                      </Badge>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex items-center justify-between text-sm font-bold">
                  <span>Total Disponível</span>
                  <span>{formatCurrency(totaisFinanceiros.saldoTotal)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projeção de Fluxo de Caixa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Projeção de Fluxo de Caixa
            </CardTitle>
            <CardDescription>
              Saldo projetado ao final:{" "}
              <strong
                className={
                  saldoAcumuladoProjetado > 0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {formatCurrency(saldoAcumuladoProjetado)}
              </strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projecaoFluxoCaixa.map((item) => (
                <div key={item.mes} className="rounded-lg border p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {item.mes}
                      </Badge>
                      <Badge
                        variant={
                          item.confianca === "alta"
                            ? "secondary"
                            : item.confianca === "media"
                              ? "outline"
                              : "destructive"
                        }
                        className={`text-xs ${item.confianca === "alta" ? "text-green-600" : item.confianca === "media" ? "text-amber-600" : ""}`}
                      >
                        Conf. {item.confianca}
                      </Badge>
                    </div>
                    <span
                      className={`text-sm font-bold ${item.saldoProjetado >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {item.saldoProjetado >= 0 ? "+" : ""}
                      {formatCurrency(item.saldoProjetado)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Entradas</span>
                      <span className="text-green-600 font-medium">
                        {formatMillions(item.entradasPrevistas)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Saidas</span>
                      <span className="text-red-600 font-medium">
                        {formatMillions(item.saidasPrevistas)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Alert
              className="mt-3"
              variant={
                projecaoFluxoCaixa[0].saldoProjetado < 0
                  ? "destructive"
                  : "default"
              }
            >
              <HugeiconsIcon
                icon={Alert02Icon}
                strokeWidth={2}
                className="size-4"
              />
              <AlertTitle>Atenção: Dezembro com déficit projetado</AlertTitle>
              <AlertDescription>
                Saídas elevadas previstas para dezembro (13º salário +
                fornecedores). Saldo disponível e suficiente para cobertura.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Cobertura de Compromissos e Concentração de Fornecedores */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Cobertura de Compromissos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Wallet01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Cobertura de Compromissos
            </CardTitle>
            <CardDescription>
              O saldo atual cobre{" "}
              <strong className="text-green-600">
                {mesesCobertura.toFixed(1)} meses
              </strong>{" "}
              de saídas médias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative h-6 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="absolute h-full rounded-full bg-green-500 transition-all"
                  style={{
                    width: `${Math.min((mesesCobertura / 4) * 100, 100)}%`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                  {mesesCobertura.toFixed(1)} meses de cobertura
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {coberturaComPromissos.map((item) => (
                  <div
                    key={item.indicador}
                    className="rounded-lg border p-3 text-center"
                  >
                    <p className="text-xs text-muted-foreground">
                      {item.indicador}
                    </p>
                    <p className="text-sm font-bold mt-1">{item.formatado}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    strokeWidth={2}
                    className="size-4 text-green-600"
                  />
                  <p className="text-sm">
                    <strong className="text-green-600">
                      Situação adequada.
                    </strong>{" "}
                    <span className="text-muted-foreground">
                      O município possui liquidez para honrar compromissos dos
                      próximos {mesesCobertura.toFixed(0)} meses sem novas
                      entradas.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Concentração de Fornecedores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Building04Icon}
                strokeWidth={2}
                className="size-5"
              />
              Concentração de Fornecedores
            </CardTitle>
            <CardDescription>
              Índice HHI: <strong>{hhi.toFixed(0)}</strong> — Risco:{" "}
              <Badge
                variant={
                  riscoConcentracao === "alto"
                    ? "destructive"
                    : riscoConcentracao === "moderado"
                      ? "outline"
                      : "secondary"
                }
                className={
                  riscoConcentracao === "alto"
                    ? ""
                    : riscoConcentracao === "moderado"
                      ? "text-amber-600"
                      : "text-green-600"
                }
              >
                {riscoConcentracao.charAt(0).toUpperCase() +
                  riscoConcentracao.slice(1)}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {concentracaoFornecedores.map((forn, index) => (
                <div key={forn.cnpj} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="text-xs w-6 justify-center"
                      >
                        {index + 1}
                      </Badge>
                      <span className="text-muted-foreground truncate max-w-[180px]">
                        {forn.nome}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {formatMillions(forn.totalPago)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {forn.percentual}%
                      </Badge>
                    </div>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="absolute h-full rounded-full bg-primary transition-all"
                      style={{ width: `${forn.percentual}%` }}
                    />
                    <div
                      className="absolute h-full rounded-full bg-amber-300/40"
                      style={{ width: `${forn.acumulado}%` }}
                    />
                  </div>
                  <div className="flex justify-end text-xs text-muted-foreground">
                    Acumulado: {forn.acumulado}%
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Análise de Pareto:</strong>{" "}
                Os 5 maiores fornecedores concentram <strong>100%</strong> dos
                pagamentos analisados. O índice HHI de {hhi.toFixed(0)} indica
                concentração{" "}
                {riscoConcentracao === "alto"
                  ? "alta — recomenda-se diversificar"
                  : riscoConcentracao === "moderado"
                    ? "moderada — monitorar"
                    : "baixa — adequado"}
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benchmark Financeiro Municipal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={StarIcon} strokeWidth={2} className="size-5" />
            Comparativo financeiro municipal
          </CardTitle>
          <CardDescription>
            Comparação de indicadores financeiros com municípios de porte
            similar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Município</TableHead>
                <TableHead className="text-right">Liquidez</TableHead>
                <TableHead className="text-right">Conciliação</TableHead>
                <TableHead className="text-right">Rendimento</TableHead>
                <TableHead className="text-right">Cobertura</TableHead>
                <TableHead className="text-right">Inadimpl.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {benchmarkFinanceiro.map((mun) => (
                <TableRow
                  key={mun.municipio}
                  className={mun.destaque ? "bg-primary/5 font-medium" : ""}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {mun.destaque && (
                        <HugeiconsIcon
                          icon={StarIcon}
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
                        mun.liquidez >= 2
                          ? "secondary"
                          : mun.liquidez >= 1.5
                            ? "outline"
                            : "destructive"
                      }
                      className={
                        mun.liquidez >= 2
                          ? "text-green-600"
                          : mun.liquidez >= 1.5
                            ? "text-amber-600"
                            : ""
                      }
                    >
                      {mun.liquidez}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {mun.conciliacao}%
                  </TableCell>
                  <TableCell className="text-right">
                    {mun.rendimento}%
                  </TableCell>
                  <TableCell className="text-right">
                    {mun.cobertura} meses
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        mun.inadimplencia > 30
                          ? "destructive"
                          : mun.inadimplencia > 20
                            ? "outline"
                            : "secondary"
                      }
                      className={
                        mun.inadimplencia > 30
                          ? ""
                          : mun.inadimplencia > 20
                            ? "text-amber-600"
                            : "text-green-600"
                      }
                    >
                      {mun.inadimplencia}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg border p-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Posição geral
              </p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-600">1o</span>
                <span className="text-xs text-muted-foreground">
                  de 5 municípios
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Destaque em liquidez e rendimento de aplicações
              </p>
            </div>
            <div className="rounded-lg border p-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Ponto de Melhoria
              </p>
              <p className="text-sm font-medium text-amber-600">
                Conciliação Bancária
              </p>
              <p className="text-xs text-muted-foreground">
                80% vs 92% do melhor comparado — regularizar contas pendentes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
