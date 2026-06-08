"use client";

import * as React from "react";
import {
  Alert02Icon,
  AlertCircleIcon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  BankIcon,
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
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
} from "recharts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartPieValueLegend,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { KpiCard } from "@/components/ui/kpi-card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

const formatNumber = (value: number) =>
  new Intl.NumberFormat("pt-BR").format(value);

const greenPalette = {
  1: "#166534",
  2: "#15803d",
  3: "#16a34a",
  4: "#22c55e",
  5: "#4ade80",
};

const resumo = {
  orcamentoAtualizado: 18_450_000,
  execucaoPct: 86.4,
  saldoFontes: 3_280_000,
  familiasAcompanhadas: 12_480,
};

const execucaoMensal = [
  { mes: "Jan", empenhado: 1_120_000, pago: 980_000 },
  { mes: "Fev", empenhado: 1_280_000, pago: 1_140_000 },
  { mes: "Mar", empenhado: 1_360_000, pago: 1_220_000 },
  { mes: "Abr", empenhado: 1_410_000, pago: 1_290_000 },
  { mes: "Mai", empenhado: 1_520_000, pago: 1_380_000 },
  { mes: "Jun", empenhado: 1_610_000, pago: 1_470_000 },
  { mes: "Jul", empenhado: 1_720_000, pago: 1_540_000 },
  { mes: "Ago", empenhado: 1_920_000, pago: 1_760_000 },
];

const chartExecucao = {
  empenhado: { label: "Empenhado", color: greenPalette[1] },
  pago: { label: "Pago", color: greenPalette[3] },
} satisfies ChartConfig;

const fontesRecursos = [
  {
    nome: "FNAS / Proteção Social Básica",
    valor: 4_820_000,
    fill: greenPalette[1],
  },
  { nome: "Tesouro Municipal", valor: 6_240_000, fill: greenPalette[2] },
  { nome: "Bolsa Família / IGD", valor: 1_340_000, fill: greenPalette[3] },
  { nome: "Benefícios Eventuais", valor: 2_160_000, fill: greenPalette[4] },
  { nome: "Habitação e Convênios", valor: 3_890_000, fill: greenPalette[5] },
];

const chartFontes = {
  "FNAS / Proteção Social Básica": {
    label: "FNAS / PSB",
    color: greenPalette[1],
  },
  "Tesouro Municipal": { label: "Tesouro Municipal", color: greenPalette[2] },
  "Bolsa Família / IGD": {
    label: "Bolsa Família / IGD",
    color: greenPalette[3],
  },
  "Benefícios Eventuais": {
    label: "Benefícios Eventuais",
    color: greenPalette[4],
  },
  "Habitação e Convênios": {
    label: "Habitação e Convênios",
    color: greenPalette[5],
  },
} satisfies ChartConfig;

const programas = [
  {
    programa: "CadÚnico",
    familias: 14_820,
    cobertura: 92,
    controle: "Atualização cadastral",
    status: "Bom",
  },
  {
    programa: "Bolsa Família",
    familias: 6_430,
    cobertura: 88,
    controle: "Condicionalidades",
    status: "Atenção",
  },
  {
    programa: "BPC",
    familias: 1_284,
    cobertura: 94,
    controle: "Revisão de elegibilidade",
    status: "Bom",
  },
  {
    programa: "PETI",
    familias: 186,
    cobertura: 81,
    controle: "Busca ativa",
    status: "Atenção",
  },
  {
    programa: "PAA",
    familias: 420,
    cobertura: 76,
    controle: "Entrega e compra local",
    status: "Atenção",
  },
  {
    programa: "SCFV",
    familias: 2_160,
    cobertura: 85,
    controle: "Frequência dos grupos",
    status: "Bom",
  },
  {
    programa: "Habitação/Regularização",
    familias: 1_120,
    cobertura: 73,
    controle: "Títulos e dossiês",
    status: "Crítico",
  },
];

const chartProgramas = {
  indicador: { label: "Desempenho (%)", color: greenPalette[2] },
} satisfies ChartConfig;

const desempenhoProgramas = programas.map((item) => ({
  programa:
    item.programa === "Habitação/Regularização" ? "Habitação" : item.programa,
  indicador: item.cobertura,
}));

const contasBancarias = [
  {
    conta: "BB 12.458-9",
    finalidade: "FMAS - Movimento",
    saldo: 1_180_000,
    conciliacao: 98,
  },
  {
    conta: "BB 18.225-4",
    finalidade: "Bloco PSB",
    saldo: 840_000,
    conciliacao: 100,
  },
  {
    conta: "CEF 45.771-2",
    finalidade: "Bolsa Família / IGD",
    saldo: 420_000,
    conciliacao: 96,
  },
  {
    conta: "BB 22.943-1",
    finalidade: "Habitação / Convênios",
    saldo: 840_000,
    conciliacao: 89,
  },
];

const alertas = [
  {
    tipo: "warning" as const,
    titulo: "Habitação e regularização fundiária abaixo da meta",
    badge: "Prioridade",
    descricao:
      "O avanço do programa está em 73% e demanda reforço documental e operacional.",
  },
  {
    tipo: "info" as const,
    titulo: "CadÚnico mantém alta cobertura cadastral",
    badge: "CadÚnico",
    descricao:
      "O monitoramento territorial dos CRAS sustenta 92% de cobertura no período.",
  },
  {
    tipo: "success" as const,
    titulo: "Conciliação bancária do FMAS está estabilizada",
    badge: "Financeiro",
    descricao:
      "As principais contas vinculadas permanecem acima de 95% de conciliação.",
  },
];

const detalhamentoDespesa = [
  {
    grupo: "Proteção Social Básica",
    autorizado: 6_420_000,
    empenhado: 5_980_000,
    liquidado: 5_640_000,
    pago: 5_480_000,
  },
  {
    grupo: "Proteção Social Especial",
    autorizado: 3_280_000,
    empenhado: 2_940_000,
    liquidado: 2_760_000,
    pago: 2_590_000,
  },
  {
    grupo: "Benefícios Eventuais",
    autorizado: 2_360_000,
    empenhado: 2_140_000,
    liquidado: 1_980_000,
    pago: 1_920_000,
  },
  {
    grupo: "Gestão do SUAS e CadÚnico",
    autorizado: 2_140_000,
    empenhado: 1_940_000,
    liquidado: 1_880_000,
    pago: 1_810_000,
  },
  {
    grupo: "Habitação e Regularização",
    autorizado: 4_250_000,
    empenhado: 2_940_000,
    liquidado: 2_020_000,
    pago: 1_880_000,
  },
];

const receitasPorOrigem = [
  { origem: "Transferências FNAS", previsto: 5_100_000, arrecadado: 4_820_000 },
  { origem: "Tesouro Municipal", previsto: 6_500_000, arrecadado: 6_240_000 },
  {
    origem: "IGD Bolsa Família / CadÚnico",
    previsto: 1_420_000,
    arrecadado: 1_340_000,
  },
  {
    origem: "Convênios Habitacionais",
    previsto: 4_200_000,
    arrecadado: 3_890_000,
  },
];

const chartReceitasOrigem = {
  previsto: { label: "Previsto", color: greenPalette[4] },
  arrecadado: { label: "Arrecadado", color: greenPalette[1] },
} satisfies ChartConfig;

const controleFontes = [
  {
    codigo: "1660",
    descricao: "FNAS - Proteção Social Básica",
    saldo: 840_000,
    comprometido: 690_000,
    disponibilidade: 150_000,
    situacao: "Regular",
  },
  {
    codigo: "1661",
    descricao: "FNAS - Proteção Social Especial",
    saldo: 590_000,
    comprometido: 520_000,
    disponibilidade: 70_000,
    situacao: "Atenção",
  },
  {
    codigo: "1669",
    descricao: "IGD Bolsa Família / CadÚnico",
    saldo: 420_000,
    comprometido: 280_000,
    disponibilidade: 140_000,
    situacao: "Regular",
  },
  {
    codigo: "1750",
    descricao: "Tesouro Municipal Vinculado",
    saldo: 1_430_000,
    comprometido: 990_000,
    disponibilidade: 440_000,
    situacao: "Regular",
  },
  {
    codigo: "1701",
    descricao: "Convênio Habitação",
    saldo: 840_000,
    comprometido: 760_000,
    disponibilidade: 80_000,
    situacao: "Atenção",
  },
];

const indicadoresRede = [
  { indicador: "CRAS com equipe mínima completa", valor: 83, meta: 100 },
  { indicador: "PAIF com prontuário atualizado", valor: 87, meta: 95 },
  {
    indicador: "Visitas domiciliares prioritárias realizadas",
    valor: 79,
    meta: 90,
  },
  {
    indicador: "Benefícios eventuais concedidos no prazo",
    valor: 91,
    meta: 95,
  },
];

const familiasPorTerritorio = [
  {
    territorio: "Norte",
    cadunico: 3_420,
    bolsaFamilia: 1_560,
    scfv: 420,
    bpc: 280,
  },
  {
    territorio: "Sul",
    cadunico: 2_980,
    bolsaFamilia: 1_340,
    scfv: 390,
    bpc: 250,
  },
  {
    territorio: "Leste",
    cadunico: 3_110,
    bolsaFamilia: 1_420,
    scfv: 460,
    bpc: 270,
  },
  {
    territorio: "Oeste",
    cadunico: 2_760,
    bolsaFamilia: 1_180,
    scfv: 340,
    bpc: 220,
  },
  {
    territorio: "Centro",
    cadunico: 2_550,
    bolsaFamilia: 930,
    scfv: 550,
    bpc: 264,
  },
];

const chartTerritorio = {
  cadunico: { label: "CadÚnico", color: greenPalette[1] },
  bolsaFamilia: { label: "Bolsa Família", color: greenPalette[3] },
} satisfies ChartConfig;

const agendaGestao = [
  {
    item: "Prestação de contas do cofinanciamento estadual",
    prazo: "15/09/2026",
    responsavel: "FMAS",
    status: "Em andamento",
  },
  {
    item: "Fechamento da conciliação bancária mensal",
    prazo: "20/09/2026",
    responsavel: "Tesouraria FMAS",
    status: "No prazo",
  },
  {
    item: "Revisão cadastral de famílias unipessoais",
    prazo: "30/09/2026",
    responsavel: "CadÚnico",
    status: "Atenção",
  },
  {
    item: "Mutirão de dossiês da regularização fundiária",
    prazo: "10/10/2026",
    responsavel: "Habitação",
    status: "Prioritário",
  },
];

const patrimonioResumo = {
  bensAtivos: 1284,
  valorAtualizado: 8_640_000,
  termosAtualizadosPct: 88.6,
  manutencaoPreventivaPct: 79.4,
};

const unidadesPatrimoniais = [
  {
    unidade: "CRAS Norte",
    bens: 184,
    valor: 1_240_000,
    inventario: 96,
    criticidade: "Regular",
  },
  {
    unidade: "CRAS Sul",
    bens: 162,
    valor: 1_080_000,
    inventario: 91,
    criticidade: "Regular",
  },
  {
    unidade: "CRAS Leste",
    bens: 176,
    valor: 1_190_000,
    inventario: 89,
    criticidade: "Atenção",
  },
  {
    unidade: "CREAS Central",
    bens: 138,
    valor: 1_420_000,
    inventario: 94,
    criticidade: "Regular",
  },
  {
    unidade: "Centro POP",
    bens: 92,
    valor: 760_000,
    inventario: 86,
    criticidade: "Atenção",
  },
  {
    unidade: "Habitação Social",
    bens: 124,
    valor: 1_310_000,
    inventario: 78,
    criticidade: "Crítico",
  },
];

const manutencaoPatrimonial = [
  {
    categoria: "Veículos de atendimento",
    total: 12,
    preventivaEmDia: 9,
    corretivaAberta: 2,
    status: "Atenção",
  },
  {
    categoria: "Equipamentos de informática",
    total: 248,
    preventivaEmDia: 201,
    corretivaAberta: 18,
    status: "Regular",
  },
  {
    categoria: "Mobiliário de unidades",
    total: 614,
    preventivaEmDia: 502,
    corretivaAberta: 36,
    status: "Regular",
  },
  {
    categoria: "Equipamentos do SCFV",
    total: 146,
    preventivaEmDia: 98,
    corretivaAberta: 19,
    status: "Atenção",
  },
  {
    categoria: "Equipamentos da habitação",
    total: 74,
    preventivaEmDia: 43,
    corretivaAberta: 11,
    status: "Crítico",
  },
];

const movimentacoesPatrimoniais = [
  { tipo: "Incorporações", quantidade: 86, valor: 1_180_000 },
  { tipo: "Transferências internas", quantidade: 54, valor: 420_000 },
  { tipo: "Baixas", quantidade: 18, valor: 96_000 },
  { tipo: "Bens em regularização", quantidade: 27, valor: 184_000 },
];

const chartMovimentacoesPatrimoniais = {
  valor: { label: "Valor", color: greenPalette[2] },
} satisfies ChartConfig;

const termosResponsabilidade = [
  { setor: "CRAS", total: 22, atualizados: 21, vencendo: 1 },
  { setor: "CREAS", total: 11, atualizados: 10, vencendo: 1 },
  { setor: "Centro POP", total: 6, atualizados: 5, vencendo: 1 },
  { setor: "SCFV", total: 14, atualizados: 11, vencendo: 3 },
  { setor: "Habitação", total: 9, atualizados: 6, vencendo: 3 },
];

// ── Vigilância Socioassistencial ──────────────────────────────────────

const vigilanciaResumo = {
  familiasVulneraveis: 4_860,
  taxaVulnerabilidade: 32.8,
  demandaReprimida: 1_240,
  situacoesRisco: 386,
};

const vulnerabilidadeTerritorial = [
  {
    territorio: "Norte",
    extremaPobreza: 1_420,
    pobreza: 2_180,
    risco: 124,
    indice: 38.2,
  },
  {
    territorio: "Sul",
    extremaPobreza: 980,
    pobreza: 1_640,
    risco: 86,
    indice: 29.4,
  },
  {
    territorio: "Leste",
    extremaPobreza: 1_280,
    pobreza: 1_960,
    risco: 108,
    indice: 35.6,
  },
  {
    territorio: "Oeste",
    extremaPobreza: 740,
    pobreza: 1_380,
    risco: 48,
    indice: 24.1,
  },
  {
    territorio: "Centro",
    extremaPobreza: 440,
    pobreza: 920,
    risco: 20,
    indice: 17.8,
  },
];

const demandaCapacidade = [
  {
    servico: "PAIF (CRAS)",
    demanda: 3_840,
    capacidade: 3_200,
    fila: 640,
    cobertura: 83,
  },
  {
    servico: "PAEFI (CREAS)",
    demanda: 1_260,
    capacidade: 980,
    fila: 280,
    cobertura: 78,
  },
  {
    servico: "SCFV",
    demanda: 2_840,
    capacidade: 2_160,
    fila: 680,
    cobertura: 76,
  },
  {
    servico: "Abordagem Social",
    demanda: 420,
    capacidade: 320,
    fila: 100,
    cobertura: 76,
  },
  {
    servico: "Acolhimento Institucional",
    demanda: 86,
    capacidade: 72,
    fila: 14,
    cobertura: 84,
  },
  { servico: "República", demanda: 24, capacidade: 18, fila: 6, cobertura: 75 },
];

const violacoesDireitos = [
  {
    tipo: "Negligência/abandono de crianças",
    casos: 142,
    tendencia: "estavel",
  },
  { tipo: "Violência doméstica", casos: 98, tendencia: "alta" },
  { tipo: "Trabalho infantil", casos: 64, tendencia: "queda" },
  { tipo: "Situação de rua", casos: 52, tendencia: "alta" },
  { tipo: "Abuso/exploração sexual", casos: 38, tendencia: "estavel" },
  { tipo: "Violência contra idosos", casos: 34, tendencia: "alta" },
];

const chartVulnerabilidade = {
  extremaPobreza: { label: "Extrema Pobreza", color: greenPalette[1] },
  pobreza: { label: "Pobreza", color: greenPalette[3] },
} satisfies ChartConfig;

const evolucaoDemanda = [
  { mes: "Jan", novos: 320, atendidos: 280, pendentes: 840 },
  { mes: "Fev", novos: 290, atendidos: 310, pendentes: 820 },
  { mes: "Mar", novos: 340, atendidos: 300, pendentes: 860 },
  { mes: "Abr", novos: 380, atendidos: 350, pendentes: 890 },
  { mes: "Mai", novos: 310, atendidos: 360, pendentes: 840 },
  { mes: "Jun", novos: 360, atendidos: 340, pendentes: 860 },
  { mes: "Jul", novos: 420, atendidos: 380, pendentes: 900 },
  { mes: "Ago", novos: 350, atendidos: 390, pendentes: 860 },
];

const chartEvolucaoDemanda = {
  novos: { label: "Novos casos", color: greenPalette[1] },
  atendidos: { label: "Atendidos", color: greenPalette[3] },
  pendentes: { label: "Pendentes", color: greenPalette[5] },
} satisfies ChartConfig;

// ── Proteção Especial, Benefícios e Equipes ──────────────────────────

const protecaoEspecialResumo = {
  familiasAcompanhadasCreas: 980,
  pessoasSituacaoRua: 164,
  adolescentesMse: 72,
  beneficiosEventuaisConcedidos: 2_340,
};

const creas = [
  {
    unidade: "CREAS Central",
    familias: 480,
    paefi: 340,
    mse: 42,
    abordagem: 86,
    equipeCompleta: true,
  },
  {
    unidade: "CREAS Regional Norte",
    familias: 320,
    paefi: 240,
    mse: 18,
    abordagem: 52,
    equipeCompleta: false,
  },
  {
    unidade: "CREAS Regional Sul",
    familias: 180,
    paefi: 128,
    mse: 12,
    abordagem: 26,
    equipeCompleta: true,
  },
];

const centroPop = {
  capacidade: 80,
  ocupacao: 64,
  atendimentosMes: 420,
  encaminhamentos: 86,
  reinsercaoFamiliar: 12,
  desligamentos: 8,
};

const medidasSocioeducativas = [
  {
    medida: "Prestação de Serviços à Comunidade (PSC)",
    adolescentes: 28,
    cumprimento: 82,
    evasao: 12,
  },
  {
    medida: "Liberdade Assistida (LA)",
    adolescentes: 34,
    cumprimento: 76,
    evasao: 18,
  },
  { medida: "Semiliberdade", adolescentes: 6, cumprimento: 88, evasao: 8 },
  { medida: "Internação", adolescentes: 4, cumprimento: 92, evasao: 0 },
];

const beneficiosEventuais = [
  {
    tipo: "Auxílio natalidade",
    concedidos: 380,
    valorMedio: 450,
    tempoMedio: 5,
  },
  {
    tipo: "Auxílio funeral",
    concedidos: 142,
    valorMedio: 1_200,
    tempoMedio: 2,
  },
  {
    tipo: "Vulnerabilidade temporária",
    concedidos: 1_240,
    valorMedio: 280,
    tempoMedio: 7,
  },
  {
    tipo: "Calamidade pública",
    concedidos: 86,
    valorMedio: 520,
    tempoMedio: 3,
  },
  {
    tipo: "Cesta básica emergencial",
    concedidos: 492,
    valorMedio: 180,
    tempoMedio: 4,
  },
];

const equipesRh = [
  {
    unidade: "CRAS Norte",
    tecnicos: 6,
    exigido: 8,
    nobRh: false,
    capacitados: 5,
  },
  {
    unidade: "CRAS Sul",
    tecnicos: 7,
    exigido: 8,
    nobRh: false,
    capacitados: 6,
  },
  {
    unidade: "CRAS Leste",
    tecnicos: 8,
    exigido: 8,
    nobRh: true,
    capacitados: 7,
  },
  {
    unidade: "CRAS Oeste",
    tecnicos: 5,
    exigido: 8,
    nobRh: false,
    capacitados: 4,
  },
  {
    unidade: "CRAS Centro",
    tecnicos: 8,
    exigido: 8,
    nobRh: true,
    capacitados: 8,
  },
  {
    unidade: "CREAS Central",
    tecnicos: 10,
    exigido: 10,
    nobRh: true,
    capacitados: 9,
  },
  {
    unidade: "CREAS Norte",
    tecnicos: 6,
    exigido: 8,
    nobRh: false,
    capacitados: 4,
  },
  {
    unidade: "Centro POP",
    tecnicos: 4,
    exigido: 6,
    nobRh: false,
    capacitados: 3,
  },
];

const capacitacao = [
  {
    tema: "Atualização SUAS e NOB-RH",
    participantes: 42,
    cargaHoraria: 40,
    status: "Concluído",
  },
  {
    tema: "Abordagem a pessoas em situação de rua",
    participantes: 18,
    cargaHoraria: 20,
    status: "Em andamento",
  },
  {
    tema: "Trabalho com famílias (PAIF/PAEFI)",
    participantes: 36,
    cargaHoraria: 32,
    status: "Concluído",
  },
  {
    tema: "Prevenção à violência contra crianças",
    participantes: 28,
    cargaHoraria: 16,
    status: "Programado",
  },
  {
    tema: "Registro e prontuário eletrônico",
    participantes: 52,
    cargaHoraria: 8,
    status: "Concluído",
  },
];

const conselhoCmas = [
  { item: "Reuniões ordinárias realizadas", valor: "8/10", status: "Regular" },
  { item: "Deliberações do exercício", valor: "24", status: "Bom" },
  { item: "Resoluções publicadas no D.O.", valor: "18/24", status: "Atenção" },
  { item: "Inscrição de entidades atualizada", valor: "92%", status: "Bom" },
  { item: "Conferência Municipal realizada", valor: "Sim", status: "Bom" },
  { item: "Plano de Ação aprovado", valor: "Sim", status: "Bom" },
];

// ── Proteção Social Básica (CRAS / PAIF) ─────────────────────────────

const protecaoBasicaResumo = {
  crasEmFuncionamento: 5,
  crasReferenciados: 5,
  familiasPaif: 3_840,
  metaPaif: 4_200,
  taxaAcompanhamentoPaif: 91.4,
  visitasDomiciliares: 2_680,
};

const crasFuncionamento = [
  {
    unidade: "CRAS Norte",
    familias: 820,
    paif: 680,
    buscaAtiva: 142,
    oficinas: 12,
    acolhidas: 384,
    referenciamento: 3420,
    equipeMinima: true,
  },
  {
    unidade: "CRAS Sul",
    familias: 740,
    paif: 620,
    buscaAtiva: 118,
    oficinas: 10,
    acolhidas: 356,
    referenciamento: 2980,
    equipeMinima: true,
  },
  {
    unidade: "CRAS Leste",
    familias: 860,
    paif: 710,
    buscaAtiva: 156,
    oficinas: 14,
    acolhidas: 412,
    referenciamento: 3110,
    equipeMinima: true,
  },
  {
    unidade: "CRAS Oeste",
    familias: 680,
    paif: 540,
    buscaAtiva: 98,
    oficinas: 8,
    acolhidas: 298,
    referenciamento: 2760,
    equipeMinima: false,
  },
  {
    unidade: "CRAS Centro",
    familias: 740,
    paif: 590,
    buscaAtiva: 126,
    oficinas: 11,
    acolhidas: 372,
    referenciamento: 2550,
    equipeMinima: true,
  },
];

const chartPaifPerformance = {
  paif: { label: "Famílias PAIF", color: greenPalette[1] },
  buscaAtiva: { label: "Busca Ativa", color: greenPalette[3] },
} satisfies ChartConfig;

const paifPerformanceData = crasFuncionamento.map((item) => ({
  unidade: item.unidade.replace("CRAS ", ""),
  paif: item.paif,
  buscaAtiva: item.buscaAtiva,
}));

const indicadoresProtecaoBasica = [
  { indicador: "Famílias com Plano de Acompanhamento", valor: 88, meta: 95 },
  { indicador: "Encaminhamentos para rede com retorno", valor: 72, meta: 85 },
  { indicador: "Oficinas com frequência acima de 75%", valor: 83, meta: 90 },
  { indicador: "Prontuários SUAS atualizados", valor: 91, meta: 100 },
  { indicador: "Busca ativa com localização efetiva", valor: 67, meta: 80 },
];

const scfvFaixaEtaria = [
  {
    faixaEtaria: "0-6 anos",
    inscritos: 340,
    frequentes: 286,
    vagas: 400,
    ocupacao: 85,
  },
  {
    faixaEtaria: "7-14 anos",
    inscritos: 620,
    frequentes: 518,
    vagas: 700,
    ocupacao: 89,
  },
  {
    faixaEtaria: "15-17 anos",
    inscritos: 280,
    frequentes: 214,
    vagas: 350,
    ocupacao: 80,
  },
  {
    faixaEtaria: "18-59 anos",
    inscritos: 460,
    frequentes: 372,
    vagas: 500,
    ocupacao: 92,
  },
  {
    faixaEtaria: "60+ anos",
    inscritos: 460,
    frequentes: 408,
    vagas: 500,
    ocupacao: 92,
  },
];

// ── Transferência de Renda ────────────────────────────────────────────

const transferenciaRendaResumo = {
  familiasCadunico: 14_820,
  cadastrosAtualizados: 87.6,
  familiasBolsaFamilia: 6_430,
  igdm: 0.82,
};

const qualidadeCadastral = [
  { mes: "Jan", atualizados: 82, inconsistentes: 12, pendentes: 6 },
  { mes: "Fev", atualizados: 83, inconsistentes: 11, pendentes: 6 },
  { mes: "Mar", atualizados: 84, inconsistentes: 10, pendentes: 6 },
  { mes: "Abr", atualizados: 85, inconsistentes: 10, pendentes: 5 },
  { mes: "Mai", atualizados: 86, inconsistentes: 9, pendentes: 5 },
  { mes: "Jun", atualizados: 86, inconsistentes: 9, pendentes: 5 },
  { mes: "Jul", atualizados: 87, inconsistentes: 8, pendentes: 5 },
  { mes: "Ago", atualizados: 88, inconsistentes: 8, pendentes: 4 },
];

const chartQualidadeCadastral = {
  atualizados: { label: "Atualizados (%)", color: greenPalette[1] },
  inconsistentes: { label: "Inconsistentes (%)", color: greenPalette[3] },
  pendentes: { label: "Pendentes (%)", color: greenPalette[5] },
} satisfies ChartConfig;

const condicionalidadesBF = [
  {
    condicionalidade: "Frequência escolar (6-17 anos)",
    acompanhamento: 94.2,
    descumprimento: 3.8,
    advertencia: 128,
    bloqueio: 42,
    suspensao: 14,
  },
  {
    condicionalidade: "Vacinação (0-6 anos)",
    acompanhamento: 91.8,
    descumprimento: 5.4,
    advertencia: 86,
    bloqueio: 28,
    suspensao: 8,
  },
  {
    condicionalidade: "Pré-natal (gestantes)",
    acompanhamento: 96.1,
    descumprimento: 2.1,
    advertencia: 12,
    bloqueio: 4,
    suspensao: 1,
  },
  {
    condicionalidade: "Nutriz (acomp. nutricional)",
    acompanhamento: 93.4,
    descumprimento: 4.2,
    advertencia: 24,
    bloqueio: 8,
    suspensao: 2,
  },
];

const averiguacaoCadastral = {
  familiasConvocadas: 1_840,
  atualizadasNoPrazo: 1_420,
  semResposta: 280,
  canceladas: 140,
};

const igdmDecomposicao = [
  {
    componente: "Taxa de Atualização Cadastral (TAC)",
    valor: 0.88,
    peso: "25%",
    status: "Bom",
  },
  {
    componente: "Taxa de Qualificação Cadastral (TQC)",
    valor: 0.79,
    peso: "25%",
    status: "Atenção",
  },
  {
    componente: "Taxa de Acompan. Freq. Escolar (TAFE)",
    valor: 0.84,
    peso: "12,5%",
    status: "Bom",
  },
  {
    componente: "Taxa de Acompan. Agenda Saúde (TAAS)",
    valor: 0.76,
    peso: "12,5%",
    status: "Atenção",
  },
  {
    componente: "Fator de Adesão ao SUAS",
    valor: 1.0,
    peso: "Multiplicador",
    status: "Bom",
  },
  {
    componente: "Fator de Informação da Apresentação (SICON)",
    valor: 0.92,
    peso: "Multiplicador",
    status: "Bom",
  },
];

// ── Primeira Infância e SAN ───────────────────────────────────────────

const primeiraInfanciaResumo = {
  criancasPcf: 1_240,
  gestantesAcompanhadas: 286,
  familiasInsegurancaAlimentar: 2_180,
  equipamentosSan: 4,
};

const programaCriancaFeliz = [
  {
    territorio: "Norte",
    criancas: 320,
    gestantes: 72,
    visitadores: 4,
    visitasMes: 480,
    metaVisitas: 540,
    cobertura: 89,
  },
  {
    territorio: "Sul",
    criancas: 260,
    gestantes: 58,
    visitadores: 3,
    visitasMes: 380,
    metaVisitas: 420,
    cobertura: 90,
  },
  {
    territorio: "Leste",
    criancas: 310,
    gestantes: 68,
    visitadores: 4,
    visitasMes: 460,
    metaVisitas: 520,
    cobertura: 88,
  },
  {
    territorio: "Oeste",
    criancas: 180,
    gestantes: 46,
    visitadores: 2,
    visitasMes: 270,
    metaVisitas: 340,
    cobertura: 79,
  },
  {
    territorio: "Centro",
    criancas: 170,
    gestantes: 42,
    visitadores: 2,
    visitasMes: 260,
    metaVisitas: 310,
    cobertura: 84,
  },
];

const evolucaoVisitasPcf = [
  { mes: "Jan", realizadas: 1680, previstas: 1900 },
  { mes: "Fev", realizadas: 1720, previstas: 1900 },
  { mes: "Mar", realizadas: 1780, previstas: 1920 },
  { mes: "Abr", realizadas: 1810, previstas: 1920 },
  { mes: "Mai", realizadas: 1850, previstas: 1940 },
  { mes: "Jun", realizadas: 1820, previstas: 1940 },
  { mes: "Jul", realizadas: 1900, previstas: 1960 },
  { mes: "Ago", realizadas: 1850, previstas: 1960 },
];

const chartVisitasPcf = {
  realizadas: { label: "Realizadas", color: greenPalette[1] },
  previstas: { label: "Previstas", color: greenPalette[4] },
} satisfies ChartConfig;

const segurancaAlimentar = [
  {
    equipamento: "Cozinha Comunitária Vila Norte",
    capacidade: 300,
    refeicoesDia: 268,
    ocupacao: 89,
    status: "Ativo",
  },
  {
    equipamento: "Banco de Alimentos Municipal",
    capacidade: 500,
    refeicoesDia: 420,
    ocupacao: 84,
    status: "Ativo",
  },
  {
    equipamento: "Restaurante Popular Centro",
    capacidade: 400,
    refeicoesDia: 372,
    ocupacao: 93,
    status: "Ativo",
  },
  {
    equipamento: "Horta Comunitária Leste",
    capacidade: 80,
    refeicoesDia: 62,
    ocupacao: 78,
    status: "Ativo",
  },
];

const insegurancaAlimentarTerritorio = [
  { territorio: "Norte", grave: 380, moderada: 520, leve: 340 },
  { territorio: "Sul", grave: 240, moderada: 380, leve: 280 },
  { territorio: "Leste", grave: 320, moderada: 460, leve: 310 },
  { territorio: "Oeste", grave: 180, moderada: 290, leve: 220 },
  { territorio: "Centro", grave: 120, moderada: 180, leve: 160 },
];

const chartInsegurancaAlimentar = {
  grave: { label: "Grave", color: greenPalette[1] },
  moderada: { label: "Moderada", color: greenPalette[3] },
  leve: { label: "Leve", color: greenPalette[5] },
} satisfies ChartConfig;

// ── Enhancements: Vigilância Socioassistencial ────────────────────────

const censoSuas = [
  { item: "Censo CRAS preenchido", valor: "5/5", status: "Bom" },
  { item: "Censo CREAS preenchido", valor: "3/3", status: "Bom" },
  { item: "Censo Centro POP preenchido", valor: "1/1", status: "Bom" },
  { item: "Censo Gestão Municipal preenchido", valor: "Sim", status: "Bom" },
  { item: "RMA CRAS em dia", valor: "4/5", status: "Atenção" },
  { item: "RMA CREAS em dia", valor: "3/3", status: "Bom" },
];

const buscaAtivaQualificada = [
  {
    acao: "Cruzamento CadÚnico x frequência escolar",
    familias: 420,
    localizadas: 340,
    inseridas: 280,
    pendentes: 60,
  },
  {
    acao: "Famílias com cadastro desatualizado > 48 meses",
    familias: 680,
    localizadas: 520,
    inseridas: 0,
    pendentes: 520,
  },
  {
    acao: "Beneficiários BPC sem acompanhamento CRAS",
    familias: 186,
    localizadas: 142,
    inseridas: 118,
    pendentes: 24,
  },
  {
    acao: "Famílias com crianças fora da escola (CadÚnico)",
    familias: 94,
    localizadas: 78,
    inseridas: 62,
    pendentes: 16,
  },
  {
    acao: "Gestantes sem pré-natal identificadas no CadÚnico",
    familias: 42,
    localizadas: 38,
    inseridas: 36,
    pendentes: 2,
  },
];

// ── Enhancements: Proteção Especial ───────────────────────────────────

const acolhimentoInstitucional = [
  {
    unidade: "Abrigo Infantil Municipal",
    tipo: "Crianças/Adolescentes",
    capacidade: 20,
    acolhidos: 16,
    tempoMedioPermanencia: 8,
    reintegracoes: 6,
    piaAtualizado: 14,
  },
  {
    unidade: "Casa de Passagem Feminina",
    tipo: "Mulheres em situação de violência",
    capacidade: 15,
    acolhidos: 11,
    tempoMedioPermanencia: 4,
    reintegracoes: 8,
    piaAtualizado: 10,
  },
  {
    unidade: "ILPI Municipal",
    tipo: "Idosos",
    capacidade: 40,
    acolhidos: 36,
    tempoMedioPermanencia: 24,
    reintegracoes: 2,
    piaAtualizado: 32,
  },
  {
    unidade: "República Jovem",
    tipo: "Jovens 18-21 anos",
    capacidade: 12,
    acolhidos: 8,
    tempoMedioPermanencia: 6,
    reintegracoes: 4,
    piaAtualizado: 7,
  },
];

const piaResumo = {
  totalPias: 71,
  atualizados: 63,
  vencidos: 8,
  taxaAtualizacao: 88.7,
};

function badgeVariant(status: string) {
  if (status === "Crítico") return "destructive" as const;
  if (status === "Atenção") return "secondary" as const;
  return "default" as const;
}

export function AssistenciaSocial() {
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024");

  return (
    <div className="space-y-8">

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Orçamento Atualizado"
          icon={Wallet01Icon}
          value={formatCurrency(resumo.orcamentoAtualizado)}
          borderColor="border-l-emerald-700"
          footer={
            <p className="text-sm text-muted-foreground">
              Dotação da secretaria e fundos vinculados
            </p>
          }
        />
        <KpiCard
          title="Execução Orçamentária"
          icon={Target01Icon}
          value={`${resumo.execucaoPct}%`}
          borderColor="border-l-emerald-700"
          footer={
            <>
              <Progress value={resumo.execucaoPct} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Empenho e liquidação em linha com o cronograma anual
              </p>
            </>
          }
        />
        <KpiCard
          title="Saldo em Fontes Vinculadas"
          icon={BankIcon}
          value={formatCurrency(resumo.saldoFontes)}
          borderColor="border-l-emerald-700"
          footer={
            <p className="text-sm text-muted-foreground">
              Disponibilidade financeira para execução pactuada
            </p>
          }
        />
        <KpiCard
          title="Famílias Acompanhadas"
          icon={UserMultipleIcon}
          value={formatNumber(resumo.familiasAcompanhadas)}
          borderColor="border-l-emerald-700"
          footer={
            <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-4"
              />
              Crescimento de 6,8% frente ao ciclo anterior
            </div>
          }
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={MoneyReceiveSquareIcon}
                strokeWidth={2}
                className="size-5"
              />
              Gestão Orçamentária e Financeira
            </CardTitle>
            <CardDescription>
              Acompanhamento da execução da despesa, fontes de recursos e contas
              bancárias vinculadas.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Receitas vinculadas realizadas
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {formatCurrency(11_920_000)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Transferências e cofinanciamento do período.
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Despesas liquidadas
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {formatCurrency(14_280_000)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Serviços, benefícios eventuais e manutenção da rede.
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Conciliação média bancária
              </p>
              <p className="mt-2 text-3xl font-semibold">95,8%</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Baixa incidência de divergências nas contas vinculadas.
              </p>
            </div>
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
              Alertas da Secretaria
            </CardTitle>
            <CardDescription>
              Focos prioritários para gestão financeira e programas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alertas.map((alerta) => (
              <Alert
                key={alerta.titulo}
                variant={alerta.tipo === "warning" ? "destructive" : "default"}
              >
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
          <TabsTrigger value="protecao-basica">
            Proteção Social Básica
          </TabsTrigger>
          <TabsTrigger value="programas">Programas Sociais</TabsTrigger>
          <TabsTrigger value="transferencia-renda">
            Transferência de Renda
          </TabsTrigger>
          <TabsTrigger value="primeira-infancia">
            Primeira Infância e SAN
          </TabsTrigger>
          <TabsTrigger value="vigilancia">
            Vigilância Socioassistencial
          </TabsTrigger>
          <TabsTrigger value="protecao">
            Proteção Especial e Equipes
          </TabsTrigger>
          <TabsTrigger value="patrimonio">Controle Patrimonial</TabsTrigger>
        </TabsList>

        <TabsContent value="orcamentaria" className="mt-6 space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={ChartLineData02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Evolução da Execução
                </CardTitle>
                <CardDescription>
                  Empenhado e pago ao longo do exercício.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartExecucao}
                  className="h-[300px] w-full"
                >
                  <AreaChart
                    data={execucaoMensal}
                    margin={{ left: 0, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${Number(v) / 1_000_000}M`}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatCurrency(Number(value))}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Area
                      type="monotone"
                      dataKey="empenhado"
                      stroke="var(--color-empenhado)"
                      fill="var(--color-empenhado)"
                      fillOpacity={0.24}
                      strokeWidth={2.5}
                    />
                    <Area
                      type="monotone"
                      dataKey="pago"
                      stroke="var(--color-pago)"
                      fill="var(--color-pago)"
                      fillOpacity={0.18}
                      strokeWidth={2.5}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Composição das Fontes</CardTitle>
                <CardDescription>
                  Distribuição das fontes que financiam a política
                  socioassistencial.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartFontes}
                  className="mx-auto aspect-auto h-[320px] w-full"
                >
                  <PieChart>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          nameKey="nome"
                          formatter={(value) => formatCurrency(Number(value))}
                        />
                      }
                    />
                    <Pie
                      data={fontesRecursos}
                      dataKey="valor"
                      nameKey="nome"
                      innerRadius={70}
                      outerRadius={110}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {fontesRecursos.map((item) => (
                        <Cell key={item.nome} fill={item.fill} />
                      ))}
                    </Pie>
                    <ChartLegend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      content={
                        <ChartPieValueLegend
                          nameKey="nome"
                          valueKey="valor"
                          valueFormatter={formatCurrency}
                        />
                      }
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={MoneyReceiveSquareIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Receitas por Origem
                </CardTitle>
                <CardDescription>
                  Comparativo entre previsão e arrecadação das principais fontes
                  da assistência social.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartReceitasOrigem}
                  className="h-[320px] w-full"
                >
                  <BarChart
                    data={receitasPorOrigem}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="origem"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `R$ ${(Number(value) / 1_000_000).toFixed(1)}M`
                      }
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatCurrency(Number(value))}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="previsto"
                      fill="var(--color-previsto)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="arrecadado"
                      fill="var(--color-arrecadado)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
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
                  Indicadores da Rede
                </CardTitle>
                <CardDescription>
                  Monitoramento operacional da execução socioassistencial.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {indicadoresRede.map((item) => (
                  <div key={item.indicador} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.indicador}</p>
                        <p className="text-sm text-muted-foreground">
                          Meta: {item.meta}%
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.valor >= item.meta ? "default" : "secondary"
                        }
                      >
                        {item.valor}%
                      </Badge>
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
                  <HugeiconsIcon
                    icon={BankIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Controle de Fontes de Recursos
                </CardTitle>
                <CardDescription>
                  Saldo, comprometimento e disponibilidade por fonte vinculada.
                </CardDescription>
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
                        <TableCell className="font-medium">
                          {fonte.codigo}
                        </TableCell>
                        <TableCell>{fonte.descricao}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(fonte.saldo)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(fonte.comprometido)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(fonte.disponibilidade)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              fonte.situacao === "Atenção"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {fonte.situacao}
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
                <CardTitle>Agenda de Gestão</CardTitle>
                <CardDescription>
                  Compromissos críticos para manter a execução, controle e
                  prestação de contas.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {agendaGestao.map((item) => (
                  <div key={item.item} className="rounded-2xl border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium">{item.item}</p>
                      <Badge
                        variant={
                          item.status === "Prioritário"
                            ? "destructive"
                            : item.status === "Atenção"
                              ? "secondary"
                              : "outline"
                        }
                      >
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
                <HugeiconsIcon
                  icon={BankIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Contas Bancárias Vinculadas
              </CardTitle>
              <CardDescription>
                Monitoramento da movimentação financeira e da conciliação.
              </CardDescription>
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
                      <TableCell className="font-medium">
                        {conta.conta}
                      </TableCell>
                      <TableCell>{conta.finalidade}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(conta.saldo)}
                      </TableCell>
                      <TableCell className="text-right">
                        {conta.conciliacao}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protecao-basica" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="CRAS em Funcionamento"
              icon={BankIcon}
              value={`${protecaoBasicaResumo.crasEmFuncionamento} de ${protecaoBasicaResumo.crasReferenciados}`}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Unidades referenciadas em pleno funcionamento
                </p>
              }
            />
            <KpiCard
              title="Famílias no PAIF"
              icon={UserMultipleIcon}
              value={formatNumber(protecaoBasicaResumo.familiasPaif)}
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress
                    value={
                      (protecaoBasicaResumo.familiasPaif /
                        protecaoBasicaResumo.metaPaif) *
                      100
                    }
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Meta: {formatNumber(protecaoBasicaResumo.metaPaif)} famílias
                  </p>
                </>
              }
            />
            <KpiCard
              title="Taxa de Acompanhamento PAIF"
              icon={Target01Icon}
              value={`${protecaoBasicaResumo.taxaAcompanhamentoPaif}%`}
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress
                    value={protecaoBasicaResumo.taxaAcompanhamentoPaif}
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Famílias com acompanhamento regular
                  </p>
                </>
              }
            />
            <KpiCard
              title="Visitas Domiciliares"
              icon={CheckmarkCircle02Icon}
              value={formatNumber(protecaoBasicaResumo.visitasDomiciliares)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Realizadas no período pela equipe PAIF
                </p>
              }
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={BankIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Operação das Unidades CRAS
                </CardTitle>
                <CardDescription>
                  Desempenho operacional por CRAS: famílias, busca ativa,
                  oficinas e referenciamento.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unidade</TableHead>
                      <TableHead className="text-right">
                        Famílias PAIF
                      </TableHead>
                      <TableHead className="text-right">Busca Ativa</TableHead>
                      <TableHead className="text-right">Oficinas/mês</TableHead>
                      <TableHead className="text-right">Acolhidas</TableHead>
                      <TableHead className="text-right">
                        Referenciamento
                      </TableHead>
                      <TableHead>Equipe</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {crasFuncionamento.map((item) => (
                      <TableRow key={item.unidade}>
                        <TableCell className="font-medium">
                          {item.unidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.paif)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.buscaAtiva}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.oficinas}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.acolhidas}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.referenciamento)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.equipeMinima ? "default" : "destructive"
                            }
                          >
                            {item.equipeMinima ? "Completa" : "Incompleta"}
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
                    icon={ChartLineData02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Desempenho PAIF por CRAS
                </CardTitle>
                <CardDescription>
                  Famílias acompanhadas no PAIF e ações de busca ativa por
                  unidade.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartPaifPerformance}
                  className="h-[320px] w-full"
                >
                  <BarChart
                    data={paifPerformanceData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="unidade"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatNumber(Number(value))}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="paif"
                      fill="var(--color-paif)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="buscaAtiva"
                      fill="var(--color-buscaAtiva)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Target01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Indicadores de Proteção Básica
                </CardTitle>
                <CardDescription>
                  Metas operacionais de qualidade dos serviços de Proteção
                  Social Básica.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {indicadoresProtecaoBasica.map((item) => (
                  <div key={item.indicador} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.indicador}</p>
                        <p className="text-sm text-muted-foreground">
                          Meta: {item.meta}%
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.valor >= item.meta ? "default" : "secondary"
                        }
                      >
                        {item.valor}%
                      </Badge>
                    </div>
                    <Progress value={item.valor} className="mt-4 h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  SCFV por Faixa Etária
                </CardTitle>
                <CardDescription>
                  Serviço de Convivência e Fortalecimento de Vínculos —
                  inscritos, frequentes e ocupação.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Faixa Etária</TableHead>
                      <TableHead className="text-right">Inscritos</TableHead>
                      <TableHead className="text-right">Frequentes</TableHead>
                      <TableHead className="text-right">Vagas</TableHead>
                      <TableHead className="text-right">Ocupação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scfvFaixaEtaria.map((item) => (
                      <TableRow key={item.faixaEtaria}>
                        <TableCell className="font-medium">
                          {item.faixaEtaria}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.inscritos)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.frequentes)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.vagas)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              item.ocupacao >= 85 ? "default" : "secondary"
                            }
                          >
                            {item.ocupacao}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="programas" className="mt-6 space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Programas Prioritários
                </CardTitle>
                <CardDescription>
                  KPIs operacionais e controles mínimos dos programas
                  monitorados.
                </CardDescription>
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
                        <TableCell className="font-medium">
                          {item.programa}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.familias)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.cobertura}%
                        </TableCell>
                        <TableCell>{item.controle}</TableCell>
                        <TableCell>
                          <Badge variant={badgeVariant(item.status)}>
                            {item.status}
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
                <CardTitle>Desempenho dos Programas</CardTitle>
                <CardDescription>
                  Índice sintético de cobertura e acompanhamento por programa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartProgramas}
                  className="min-h-[340px]"
                >
                  <BarChart
                    data={desempenhoProgramas}
                    layout="vertical"
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis
                      type="category"
                      dataKey="programa"
                      width={110}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => `${value}%`}
                        />
                      }
                    />
                    <Bar
                      dataKey="indicador"
                      radius={8}
                      fill="var(--color-indicador)"
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Famílias por Território
                </CardTitle>
                <CardDescription>
                  Concentração territorial das famílias em acompanhamento e
                  beneficiárias.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartTerritorio}
                  className="h-[320px] w-full"
                >
                  <BarChart
                    data={familiasPorTerritorio}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="territorio"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatNumber(Number(value))}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="cadunico"
                      fill="var(--color-cadunico)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="bolsaFamilia"
                      fill="var(--color-bolsaFamilia)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalhamento da Despesa por Bloco</CardTitle>
                <CardDescription>
                  Execução por grandes grupos da política de assistência social.
                </CardDescription>
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
                        <TableCell className="font-medium">
                          {item.grupo}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.autorizado)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.empenhado)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.liquidado)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.pago)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transferencia-renda" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Famílias no CadÚnico"
              icon={UserMultipleIcon}
              value={formatNumber(transferenciaRendaResumo.familiasCadunico)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Total de famílias cadastradas no Cadastro Único
                </p>
              }
            />
            <KpiCard
              title="Cadastros Atualizados (< 2 anos)"
              icon={CheckmarkCircle02Icon}
              value={`${transferenciaRendaResumo.cadastrosAtualizados}%`}
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress
                    value={transferenciaRendaResumo.cadastrosAtualizados}
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Proporção de cadastros dentro da validade
                  </p>
                </>
              }
            />
            <KpiCard
              title="Famílias Bolsa Família"
              icon={MoneyReceiveSquareIcon}
              value={formatNumber(
                transferenciaRendaResumo.familiasBolsaFamilia,
              )}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Famílias beneficiárias do programa
                </p>
              }
            />
            <KpiCard
              title="IGD-M"
              icon={Target01Icon}
              value={transferenciaRendaResumo.igdm.toFixed(2)}
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress
                    value={transferenciaRendaResumo.igdm * 100}
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Índice de Gestão Descentralizada Municipal
                  </p>
                </>
              }
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={ChartLineData02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Qualidade Cadastral CadÚnico
                </CardTitle>
                <CardDescription>
                  Evolução mensal da proporção de cadastros atualizados,
                  inconsistentes e pendentes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartQualidadeCadastral}
                  className="h-[320px] w-full"
                >
                  <AreaChart
                    data={qualidadeCadastral}
                    margin={{ left: 0, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${v}%`}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => `${value}%`}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Area
                      type="monotone"
                      dataKey="atualizados"
                      stroke="var(--color-atualizados)"
                      fill="var(--color-atualizados)"
                      fillOpacity={0.24}
                      strokeWidth={2.5}
                    />
                    <Area
                      type="monotone"
                      dataKey="inconsistentes"
                      stroke="var(--color-inconsistentes)"
                      fill="var(--color-inconsistentes)"
                      fillOpacity={0.18}
                      strokeWidth={2.5}
                    />
                    <Area
                      type="monotone"
                      dataKey="pendentes"
                      stroke="var(--color-pendentes)"
                      fill="var(--color-pendentes)"
                      fillOpacity={0.12}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={SecurityCheckIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Condicionalidades Bolsa Família
                </CardTitle>
                <CardDescription>
                  Acompanhamento de condicionalidades e efeitos sobre o
                  benefício.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Condicionalidade</TableHead>
                      <TableHead className="text-right">Acomp. (%)</TableHead>
                      <TableHead className="text-right">
                        Descumpr. (%)
                      </TableHead>
                      <TableHead className="text-right">Advertência</TableHead>
                      <TableHead className="text-right">Bloqueio</TableHead>
                      <TableHead className="text-right">Suspensão</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {condicionalidadesBF.map((item) => (
                      <TableRow key={item.condicionalidade}>
                        <TableCell className="font-medium">
                          {item.condicionalidade}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              item.acompanhamento >= 93
                                ? "default"
                                : "secondary"
                            }
                          >
                            {item.acompanhamento}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.descumprimento}%
                        </TableCell>
                        <TableCell className="text-right">
                          {item.advertencia}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.bloqueio}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.suspensao}
                        </TableCell>
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
                  <HugeiconsIcon
                    icon={Alert02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Averiguação Cadastral
                </CardTitle>
                <CardDescription>
                  Situação das famílias convocadas para atualização cadastral
                  obrigatória.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Famílias Convocadas
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {formatNumber(averiguacaoCadastral.familiasConvocadas)}
                    </p>
                    <Badge variant="outline" className="mt-2">
                      Total
                    </Badge>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Atualizadas no Prazo
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {formatNumber(averiguacaoCadastral.atualizadasNoPrazo)}
                    </p>
                    <Badge variant="default" className="mt-2">
                      Regular
                    </Badge>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Sem Resposta
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {formatNumber(averiguacaoCadastral.semResposta)}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      Atenção
                    </Badge>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">Canceladas</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {formatNumber(averiguacaoCadastral.canceladas)}
                    </p>
                    <Badge variant="destructive" className="mt-2">
                      Cancelado
                    </Badge>
                  </div>
                </div>
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
                  Decomposição IGD-M
                </CardTitle>
                <CardDescription>
                  Componentes que formam o Índice de Gestão Descentralizada
                  Municipal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {igdmDecomposicao.map((item) => (
                  <div key={item.componente} className="rounded-2xl border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-medium">{item.componente}</p>
                        <p className="text-sm text-muted-foreground">
                          Peso: {item.peso}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">
                          {item.valor.toFixed(2)}
                        </span>
                        <Badge
                          variant={
                            item.status === "Bom" ? "default" : "secondary"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={item.valor * 100} className="mt-3 h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="primeira-infancia" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Crianças no PCF (Criança Feliz)"
              icon={UserMultipleIcon}
              value={formatNumber(primeiraInfanciaResumo.criancasPcf)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Crianças acompanhadas pelo programa
                </p>
              }
            />
            <KpiCard
              title="Gestantes Acompanhadas"
              icon={UserMultipleIcon}
              value={formatNumber(primeiraInfanciaResumo.gestantesAcompanhadas)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Gestantes com visitas domiciliares regulares
                </p>
              }
            />
            <KpiCard
              title="Famílias com Inseg. Alimentar"
              icon={Alert02Icon}
              value={formatNumber(
                primeiraInfanciaResumo.familiasInsegurancaAlimentar,
              )}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Identificadas nos territórios de abrangência
                </p>
              }
            />
            <KpiCard
              title="Equipamentos de SAN Ativos"
              icon={BankIcon}
              value={primeiraInfanciaResumo.equipamentosSan.toString()}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Unidades de Segurança Alimentar e Nutricional
                </p>
              }
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Programa Criança Feliz
                </CardTitle>
                <CardDescription>
                  Cobertura territorial de visitas domiciliares a crianças e
                  gestantes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Território</TableHead>
                      <TableHead className="text-right">Crianças</TableHead>
                      <TableHead className="text-right">Gestantes</TableHead>
                      <TableHead className="text-right">Visitadores</TableHead>
                      <TableHead className="text-right">Visitas/mês</TableHead>
                      <TableHead className="text-right">Meta</TableHead>
                      <TableHead className="text-right">Cobertura</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programaCriancaFeliz.map((item) => (
                      <TableRow key={item.territorio}>
                        <TableCell className="font-medium">
                          {item.territorio}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.criancas)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.gestantes}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.visitadores}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.visitasMes)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.metaVisitas)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              item.cobertura >= 85 ? "default" : "secondary"
                            }
                          >
                            {item.cobertura}%
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
                    icon={ChartLineData02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Evolução de Visitas PCF
                </CardTitle>
                <CardDescription>
                  Comparativo mensal entre visitas realizadas e previstas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartVisitasPcf}
                  className="h-[320px] w-full"
                >
                  <AreaChart
                    data={evolucaoVisitasPcf}
                    margin={{ left: 0, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatNumber(Number(value))}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Area
                      type="monotone"
                      dataKey="previstas"
                      stroke="var(--color-previstas)"
                      fill="var(--color-previstas)"
                      fillOpacity={0.12}
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="realizadas"
                      stroke="var(--color-realizadas)"
                      fill="var(--color-realizadas)"
                      fillOpacity={0.24}
                      strokeWidth={2.5}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={BankIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Segurança Alimentar e Nutricional
                </CardTitle>
                <CardDescription>
                  Equipamentos de SAN ativos, capacidade e taxa de ocupação.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equipamento</TableHead>
                      <TableHead className="text-right">Capacidade</TableHead>
                      <TableHead className="text-right">
                        Refeições/dia
                      </TableHead>
                      <TableHead className="text-right">Ocupação</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {segurancaAlimentar.map((item) => (
                      <TableRow key={item.equipamento}>
                        <TableCell className="font-medium">
                          {item.equipamento}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.capacidade)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.refeicoesDia)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.ocupacao}%
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">{item.status}</Badge>
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
                    icon={Alert02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Insegurança Alimentar por Território
                </CardTitle>
                <CardDescription>
                  Distribuição por grau de insegurança alimentar nos territórios
                  de referência.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartInsegurancaAlimentar}
                  className="h-[320px] w-full"
                >
                  <BarChart
                    data={insegurancaAlimentarTerritorio}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="territorio"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatNumber(Number(value))}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="grave"
                      fill="var(--color-grave)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="moderada"
                      fill="var(--color-moderada)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="leve"
                      fill="var(--color-leve)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vigilancia" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Famílias em Vulnerabilidade"
              icon={AlertCircleIcon}
              value={formatNumber(vigilanciaResumo.familiasVulneraveis)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Identificadas via CadÚnico e busca ativa territorial
                </p>
              }
            />
            <KpiCard
              title="Taxa de Vulnerabilidade"
              icon={Target01Icon}
              value={`${vigilanciaResumo.taxaVulnerabilidade}%`}
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress
                    value={vigilanciaResumo.taxaVulnerabilidade}
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Proporção sobre total de famílias cadastradas
                  </p>
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
                  <HugeiconsIcon
                    icon={ArrowUp01Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  Famílias aguardando inclusão em serviços
                </div>
              }
            />
            <KpiCard
              title="Situações de Risco"
              icon={Alert02Icon}
              value={formatNumber(vigilanciaResumo.situacoesRisco)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Ocorrências de violação de direitos no período
                </p>
              }
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={SecurityCheckIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Mapa de Vulnerabilidade por Território
                </CardTitle>
                <CardDescription>
                  Distribuição territorial de famílias em extrema pobreza,
                  pobreza e risco social.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartVulnerabilidade}
                  className="h-[320px] w-full"
                >
                  <BarChart
                    data={vulnerabilidadeTerritorial}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="territorio"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatNumber(Number(value))}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="extremaPobreza"
                      fill="var(--color-extremaPobreza)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="pobreza"
                      fill="var(--color-pobreza)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
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
                  Índice de Vulnerabilidade Territorial
                </CardTitle>
                <CardDescription>
                  Indicador composto de risco social por região de abrangência
                  dos CRAS.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {vulnerabilidadeTerritorial.map((item) => (
                  <div key={item.territorio} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.territorio}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatNumber(item.risco)} situações de risco
                          identificadas
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.indice > 35
                            ? "destructive"
                            : item.indice > 25
                              ? "secondary"
                              : "default"
                        }
                      >
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
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Demanda vs. Capacidade Instalada
                </CardTitle>
                <CardDescription>
                  Relação entre demanda identificada, capacidade de atendimento
                  e fila de espera por serviço.
                </CardDescription>
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
                        <TableCell className="font-medium">
                          {item.servico}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.demanda)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.capacidade)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.fila)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              item.cobertura >= 80 ? "default" : "secondary"
                            }
                          >
                            {item.cobertura}%
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
                    icon={ChartLineData02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Evolução da Demanda
                </CardTitle>
                <CardDescription>
                  Fluxo mensal de novos casos, atendimentos e pendências
                  acumuladas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartEvolucaoDemanda}
                  className="h-[320px] w-full"
                >
                  <AreaChart
                    data={evolucaoDemanda}
                    margin={{ left: 0, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatNumber(Number(value))}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Area
                      type="monotone"
                      dataKey="pendentes"
                      stroke="var(--color-pendentes)"
                      fill="var(--color-pendentes)"
                      fillOpacity={0.12}
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="novos"
                      stroke="var(--color-novos)"
                      fill="var(--color-novos)"
                      fillOpacity={0.2}
                      strokeWidth={2.5}
                    />
                    <Area
                      type="monotone"
                      dataKey="atendidos"
                      stroke="var(--color-atendidos)"
                      fill="var(--color-atendidos)"
                      fillOpacity={0.18}
                      strokeWidth={2.5}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Alert02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Violações de Direitos Identificadas
              </CardTitle>
              <CardDescription>
                Tipologia das situações de risco e violação de direitos
                registradas pela rede socioassistencial.
              </CardDescription>
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
                              <HugeiconsIcon
                                icon={ArrowUp01Icon}
                                strokeWidth={2}
                                className="size-4 text-red-500"
                              />
                              <span className="text-sm text-red-500">
                                Em alta
                              </span>
                            </>
                          )}
                          {item.tendencia === "queda" && (
                            <>
                              <HugeiconsIcon
                                icon={ArrowDown01Icon}
                                strokeWidth={2}
                                className="size-4 text-emerald-600"
                              />
                              <span className="text-sm text-emerald-600">
                                Em queda
                              </span>
                            </>
                          )}
                          {item.tendencia === "estavel" && (
                            <span className="text-sm text-muted-foreground">
                              Estável
                            </span>
                          )}
                        </div>
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
                  icon={CheckmarkCircle02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Censo SUAS — Compliance
              </CardTitle>
              <CardDescription>
                Preenchimento do Censo SUAS e Registros Mensais de Atendimento
                (RMA) por unidade.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {censoSuas.map((item) => (
                  <div key={item.item} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm text-muted-foreground">
                        {item.item}
                      </p>
                      <Badge
                        variant={
                          item.status === "Bom"
                            ? "default"
                            : item.status === "Regular"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-2xl font-semibold">{item.valor}</p>
                  </div>
                ))}
              </div>
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
                Busca Ativa Qualificada
              </CardTitle>
              <CardDescription>
                Ações de cruzamento de bases e localização de famílias para
                inserção em serviços e benefícios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ação</TableHead>
                    <TableHead className="text-right">Famílias</TableHead>
                    <TableHead className="text-right">Localizadas</TableHead>
                    <TableHead className="text-right">Inseridas</TableHead>
                    <TableHead className="text-right">Pendentes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buscaAtivaQualificada.map((item) => (
                    <TableRow key={item.acao}>
                      <TableCell className="font-medium">{item.acao}</TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.familias)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.localizadas)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.inseridas)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            item.pendentes > 100 ? "secondary" : "outline"
                          }
                        >
                          {formatNumber(item.pendentes)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protecao" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Famílias no CREAS"
              icon={UserMultipleIcon}
              value={formatNumber(
                protecaoEspecialResumo.familiasAcompanhadasCreas,
              )}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Acompanhamento PAEFI em toda a rede
                </p>
              }
            />
            <KpiCard
              title="Pessoas em Situação de Rua"
              icon={AlertCircleIcon}
              value={formatNumber(protecaoEspecialResumo.pessoasSituacaoRua)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Identificadas pela Abordagem Social e Centro POP
                </p>
              }
            />
            <KpiCard
              title="Adolescentes em MSE"
              icon={SecurityCheckIcon}
              value={formatNumber(protecaoEspecialResumo.adolescentesMse)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Medidas Socioeducativas em meio aberto
                </p>
              }
            />
            <KpiCard
              title="Benefícios Eventuais"
              icon={MoneyReceiveSquareIcon}
              value={formatNumber(
                protecaoEspecialResumo.beneficiosEventuaisConcedidos,
              )}
              borderColor="border-l-emerald-700"
              footer={
                <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                  <HugeiconsIcon
                    icon={ArrowUp01Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  Concedidos no período
                </div>
              }
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={SecurityCheckIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Unidades CREAS
                </CardTitle>
                <CardDescription>
                  Desempenho operacional das unidades de Proteção Social
                  Especial de Média Complexidade.
                </CardDescription>
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
                        <TableCell className="font-medium">
                          {item.unidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.familias)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.paefi)}
                        </TableCell>
                        <TableCell className="text-right">{item.mse}</TableCell>
                        <TableCell className="text-right">
                          {item.abordagem}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.equipeCompleta ? "default" : "secondary"
                            }
                          >
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
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Centro POP
                </CardTitle>
                <CardDescription>
                  Indicadores da unidade de acolhimento e atendimento à
                  população em situação de rua.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">Ocupação</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {centroPop.ocupacao}/{centroPop.capacidade}
                    </p>
                    <Progress
                      value={(centroPop.ocupacao / centroPop.capacidade) * 100}
                      className="mt-2 h-2"
                    />
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Atendimentos/mês
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {formatNumber(centroPop.atendimentosMes)}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Encaminhamentos
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {centroPop.encaminhamentos}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Reinserção familiar
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {centroPop.reinsercaoFamiliar}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={BankIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Acolhimento Institucional
                </CardTitle>
                <CardDescription>
                  Unidades de acolhimento, ocupação, tempo médio de permanência
                  e reintegrações.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unidade</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Capacidade</TableHead>
                      <TableHead className="text-right">Acolhidos</TableHead>
                      <TableHead className="text-right">
                        Tempo Médio (meses)
                      </TableHead>
                      <TableHead className="text-right">
                        Reintegrações
                      </TableHead>
                      <TableHead className="text-right">
                        PIA Atualizado
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {acolhimentoInstitucional.map((item) => (
                      <TableRow key={item.unidade}>
                        <TableCell className="font-medium">
                          {item.unidade}
                        </TableCell>
                        <TableCell>{item.tipo}</TableCell>
                        <TableCell className="text-right">
                          {item.capacidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.acolhidos}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.tempoMedioPermanencia}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.reintegracoes}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.piaAtualizado}/{item.acolhidos}
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
                    icon={SecurityCheckIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Plano Individual de Atendimento (PIA)
                </CardTitle>
                <CardDescription>
                  Consolidação dos PIAs nas unidades de acolhimento
                  institucional.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Total de PIAs
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {piaResumo.totalPias}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">Atualizados</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {piaResumo.atualizados}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">Vencidos</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {piaResumo.vencidos}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      Atenção
                    </Badge>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Taxa de Atualização
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {piaResumo.taxaAtualizacao}%
                    </p>
                    <Progress
                      value={piaResumo.taxaAtualizacao}
                      className="mt-2 h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={SecurityCheckIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Medidas Socioeducativas em Meio Aberto
                </CardTitle>
                <CardDescription>
                  Acompanhamento das MSE sob responsabilidade municipal (ECA
                  Art. 112).
                </CardDescription>
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
                        <TableCell className="font-medium">
                          {item.medida}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.adolescentes}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              item.cumprimento >= 80 ? "default" : "secondary"
                            }
                          >
                            {item.cumprimento}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.evasao}%
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
                    icon={MoneyReceiveSquareIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Benefícios Eventuais Concedidos
                </CardTitle>
                <CardDescription>
                  Regulamentação municipal (Lei 8.742/93, Art. 22) — concessão,
                  valores médios e tempo de processamento.
                </CardDescription>
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
                        <TableCell className="font-medium">
                          {item.tipo}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.concedidos)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.valorMedio)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.tempoMedio}
                        </TableCell>
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
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Gestão de Equipes (NOB-RH/SUAS)
                </CardTitle>
                <CardDescription>
                  Conformidade das equipes de referência com a Norma Operacional
                  Básica de Recursos Humanos do SUAS.
                </CardDescription>
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
                        <TableCell className="font-medium">
                          {item.unidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.tecnicos}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.exigido}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={item.nobRh ? "default" : "destructive"}
                          >
                            {item.nobRh ? "Conforme" : "Irregular"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.capacitados}/{item.tecnicos}
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
                    icon={Calendar01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Capacitação e Educação Permanente
                </CardTitle>
                <CardDescription>
                  Plano de formação continuada dos trabalhadores do SUAS no
                  exercício.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {capacitacao.map((item) => (
                  <div key={item.tema} className="rounded-2xl border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium">{item.tema}</p>
                      <Badge
                        variant={
                          item.status === "Concluído"
                            ? "default"
                            : item.status === "Em andamento"
                              ? "secondary"
                              : "outline"
                        }
                      >
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
                <HugeiconsIcon
                  icon={BankIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Conselho Municipal de Assistência Social (CMAS)
              </CardTitle>
              <CardDescription>
                Acompanhamento das atividades do controle social e deliberações
                do CMAS.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {conselhoCmas.map((item) => (
                  <div key={item.item} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm text-muted-foreground">
                        {item.item}
                      </p>
                      <Badge
                        variant={
                          item.status === "Bom"
                            ? "default"
                            : item.status === "Regular"
                              ? "outline"
                              : "secondary"
                        }
                      >
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Bens Ativos da Rede"
              icon={Wallet01Icon}
              value={formatNumber(patrimonioResumo.bensAtivos)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Equipamentos, mobiliário, veículos e bens permanentes da
                  assistência social
                </p>
              }
            />
            <KpiCard
              title="Valor Patrimonial Atualizado"
              icon={BankIcon}
              value={formatCurrency(patrimonioResumo.valorAtualizado)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Base patrimonial das unidades e equipamentos vinculados
                </p>
              }
            />
            <KpiCard
              title="Termos Atualizados"
              icon={Target01Icon}
              value={`${patrimonioResumo.termosAtualizadosPct}%`}
              borderColor="border-l-emerald-700"
              footer={
                <Progress
                  value={patrimonioResumo.termosAtualizadosPct}
                  className="h-2"
                />
              }
            />
            <KpiCard
              title="Manutenção Preventiva"
              icon={ChartLineData02Icon}
              value={`${patrimonioResumo.manutencaoPreventivaPct}%`}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Cobertura dos itens críticos com revisão periódica
                </p>
              }
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={InformationCircleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Inventário por Unidade Socioassistencial
                </CardTitle>
                <CardDescription>
                  Conciliação patrimonial, criticidade e valor do acervo por
                  unidade.
                </CardDescription>
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
                        <TableCell className="font-medium">
                          {item.unidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.bens)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.valor)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.inventario}%
                        </TableCell>
                        <TableCell>
                          <Badge variant={badgeVariant(item.criticidade)}>
                            {item.criticidade}
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
                    icon={ChartLineData02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Movimentações Patrimoniais
                </CardTitle>
                <CardDescription>
                  Incorporações, transferências, baixas e pendências de
                  regularização do exercício.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartMovimentacoesPatrimoniais}
                  className="h-[320px] w-full"
                >
                  <BarChart
                    data={movimentacoesPatrimoniais}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="tipo" tickLine={false} axisLine={false} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `R$ ${(Number(value) / 1000).toFixed(0)}k`
                      }
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
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Controle de Manutenção de Ativos</CardTitle>
                <CardDescription>
                  Acompanhamento da manutenção preventiva e corretiva dos bens
                  utilizados na oferta de serviços.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {manutencaoPatrimonial.map((item) => (
                  <div key={item.categoria} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.categoria}</p>
                        <p className="text-sm text-muted-foreground">
                          Total: {item.total} itens | Corretivas abertas:{" "}
                          {item.corretivaAberta}
                        </p>
                      </div>
                      <Badge variant={badgeVariant(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    <Progress
                      value={(item.preventivaEmDia / item.total) * 100}
                      className="mt-4 h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Termos de Responsabilidade</CardTitle>
                <CardDescription>
                  Regularidade dos termos vinculados aos bens permanentes da
                  rede socioassistencial.
                </CardDescription>
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
                        <TableCell className="font-medium">
                          {item.setor}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.total}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.atualizados}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.vencendo}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
