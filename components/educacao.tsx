"use client";

import * as React from "react";
import { fmtBRL } from "@/lib/format";
import {
  Alert02Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  BankIcon,
  BookOpen02Icon,
  Calendar01Icon,
  ChartLineData02Icon,
  FilterIcon,
  Flag01Icon,
  AlertCircleIcon,
  InformationCircleIcon,
  Invoice01Icon,
  MoneyReceiveSquareIcon,
  RefreshIcon,
  Target01Icon,
  UserMultipleIcon,
  Wallet01Icon,
  Search01Icon,
  Clock01Icon,
  Building01Icon,
  AnalyticsUpIcon,
  TaskDaily01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

// ── Dados Orçamentários e Financeiros ──────────────────────────────

const educacaoResumo = {
  orcamentoTotal: 45_600_000,
  orcamentoEmpenhado: 42_300_000,
  orcamentoPago: 38_900_000,
  receitaTotal: 47_200_000,
  alunosMatriculados: 18_420,
  escolas: 42,
  profissionaisEducacao: 1_680,
  fundeRecebido: 32_400_000,
};

const despesasEducacao = [
  {
    categoria: "Pessoal e Encargos",
    valor: 28_600_000,
    percentual: 67.6,
    fill: greenPalette[1],
  },
  {
    categoria: "Alimentação Escolar",
    valor: 4_800_000,
    percentual: 11.3,
    fill: greenPalette[2],
  },
  {
    categoria: "Transporte Escolar",
    valor: 3_900_000,
    percentual: 9.2,
    fill: greenPalette[3],
  },
  {
    categoria: "Material Didático",
    valor: 2_800_000,
    percentual: 6.6,
    fill: greenPalette[4],
  },
  {
    categoria: "Manutenção e Infraestrutura",
    valor: 2_200_000,
    percentual: 5.2,
    fill: greenPalette[5],
  },
];

const chartConfigDespesas = {
  "Pessoal e Encargos": { label: "Pessoal e Encargos", color: greenPalette[1] },
  "Alimentação Escolar": {
    label: "Alimentação Escolar",
    color: greenPalette[2],
  },
  "Transporte Escolar": { label: "Transporte Escolar", color: greenPalette[3] },
  "Material Didático": { label: "Material Didático", color: greenPalette[4] },
  "Manutenção e Infraestrutura": {
    label: "Manutenção e Infraestrutura",
    color: greenPalette[5],
  },
} satisfies ChartConfig;

const receitasEducacao = [
  { fonte: "FUNDEB", valor: 32_400_000, percentual: 68.6 },
  { fonte: "Recursos Próprios (MDE)", valor: 8_200_000, percentual: 17.4 },
  { fonte: "Salário-Educação (FNDE)", valor: 3_400_000, percentual: 7.2 },
  { fonte: "PNAE (Alimentação)", valor: 1_840_000, percentual: 3.9 },
  { fonte: "PNATE (Transporte)", valor: 1_360_000, percentual: 2.9 },
];

const fontesRecursos = [
  {
    codigo: "1.540",
    nome: "FUNDEB 70% - Magistério",
    saldo: 1_840_000,
    empenhado: 22_680_000,
    disponivel: 1_840_000,
  },
  {
    codigo: "1.541",
    nome: "FUNDEB 30% - Outros",
    saldo: 960_000,
    empenhado: 9_720_000,
    disponivel: 960_000,
  },
  {
    codigo: "1.550",
    nome: "MDE - Recursos Próprios",
    saldo: 680_000,
    empenhado: 7_520_000,
    disponivel: 680_000,
  },
  {
    codigo: "1.553",
    nome: "Salário-Educação / FNDE",
    saldo: 420_000,
    empenhado: 2_980_000,
    disponivel: 420_000,
  },
  {
    codigo: "1.560",
    nome: "PNAE - Alimentação",
    saldo: 240_000,
    empenhado: 1_600_000,
    disponivel: 240_000,
  },
  {
    codigo: "1.561",
    nome: "PNATE - Transporte",
    saldo: 180_000,
    empenhado: 1_180_000,
    disponivel: 180_000,
  },
];

const contasBancarias = [
  {
    banco: "Banco do Brasil",
    agencia: "2345-6",
    conta: "23456-7",
    tipo: "FUNDEB 70%",
    saldo: 1_840_000,
  },
  {
    banco: "Banco do Brasil",
    agencia: "2345-6",
    conta: "23457-5",
    tipo: "FUNDEB 30%",
    saldo: 960_000,
  },
  {
    banco: "Caixa Econômica",
    agencia: "1234",
    conta: "00234-5",
    tipo: "MDE - Próprios",
    saldo: 680_000,
  },
  {
    banco: "Banco do Brasil",
    agencia: "2345-6",
    conta: "23458-3",
    tipo: "Salário-Educação",
    saldo: 420_000,
  },
  {
    banco: "Caixa Econômica",
    agencia: "1234",
    conta: "00235-3",
    tipo: "PNAE",
    saldo: 240_000,
  },
  {
    banco: "Caixa Econômica",
    agencia: "1234",
    conta: "00236-1",
    tipo: "PNATE",
    saldo: 180_000,
  },
];

const evolucaoOrcamentaria = [
  { mes: "Jan", orcado: 5_200_000, empenhado: 5_000_000, pago: 4_600_000 },
  { mes: "Fev", orcado: 5_300_000, empenhado: 5_150_000, pago: 4_800_000 },
  { mes: "Mar", orcado: 5_400_000, empenhado: 5_280_000, pago: 4_900_000 },
  { mes: "Abr", orcado: 5_500_000, empenhado: 5_400_000, pago: 5_050_000 },
  { mes: "Mai", orcado: 5_600_000, empenhado: 5_500_000, pago: 5_100_000 },
  { mes: "Jun", orcado: 5_700_000, empenhado: 5_580_000, pago: 5_250_000 },
  { mes: "Jul", orcado: 5_750_000, empenhado: 5_620_000, pago: 5_300_000 },
  { mes: "Ago", orcado: 5_800_000, empenhado: 5_700_000, pago: 5_400_000 },
];

const chartConfigEvolucao = {
  orcado: { label: "Orçado", color: greenPalette[5] },
  empenhado: { label: "Empenhado", color: greenPalette[3] },
  pago: { label: "Pago", color: greenPalette[1] },
} satisfies ChartConfig;

const detalhamentoDespesa = [
  {
    grupo: "Ensino Fundamental",
    autorizado: 22_400_000,
    empenhado: 21_200_000,
    liquidado: 20_100_000,
    pago: 19_400_000,
  },
  {
    grupo: "Educação Infantil",
    autorizado: 12_800_000,
    empenhado: 11_900_000,
    liquidado: 11_200_000,
    pago: 10_600_000,
  },
  {
    grupo: "Transporte Escolar",
    autorizado: 4_200_000,
    empenhado: 3_900_000,
    liquidado: 3_600_000,
    pago: 3_500_000,
  },
  {
    grupo: "Alimentação Escolar",
    autorizado: 3_600_000,
    empenhado: 3_400_000,
    liquidado: 3_200_000,
    pago: 3_100_000,
  },
  {
    grupo: "Gestão e Administração",
    autorizado: 2_600_000,
    empenhado: 1_900_000,
    liquidado: 1_800_000,
    pago: 2_300_000,
  },
];

const chartReceitasOrigem = {
  previsto: { label: "Previsto", color: greenPalette[4] },
  arrecadado: { label: "Arrecadado", color: greenPalette[1] },
} satisfies ChartConfig;

const receitasPorOrigem = [
  { origem: "FUNDEB", previsto: 33_800_000, arrecadado: 32_400_000 },
  { origem: "MDE Próprio", previsto: 8_600_000, arrecadado: 8_200_000 },
  { origem: "Sal.-Educação", previsto: 3_600_000, arrecadado: 3_400_000 },
  { origem: "PNAE/PNATE", previsto: 3_400_000, arrecadado: 3_200_000 },
];

// ── Dados da Gestão da Educação ────────────────────────────────────

const kpisEducacao = [
  {
    indicador: "IDEB Anos Iniciais",
    valor: 6.2,
    meta: 6.0,
    unidade: "",
    status: "atingido",
  },
  {
    indicador: "IDEB Anos Finais",
    valor: 5.1,
    meta: 5.5,
    unidade: "",
    status: "atencao",
  },
  {
    indicador: "Taxa de Aprovação",
    valor: 94.8,
    meta: 95.0,
    unidade: "%",
    status: "atencao",
  },
  {
    indicador: "Taxa de Evasão",
    valor: 1.8,
    meta: 2.0,
    unidade: "%",
    status: "atingido",
  },
  {
    indicador: "Distorção Idade-Série",
    valor: 8.4,
    meta: 7.0,
    unidade: "%",
    status: "atencao",
  },
  {
    indicador: "Alfabetização (2º ano)",
    valor: 78.5,
    meta: 80.0,
    unidade: "%",
    status: "atencao",
  },
];

const escolasPorModalidade = [
  {
    modalidade: "CMEI (Creche e Pré-escola)",
    unidades: 14,
    alunos: 3_240,
    capacidade: 3_600,
    ocupacao: 90.0,
    profissionais: 280,
  },
  {
    modalidade: "EMEF (Fundamental I)",
    unidades: 12,
    alunos: 6_480,
    capacidade: 7_200,
    ocupacao: 90.0,
    profissionais: 420,
  },
  {
    modalidade: "EMEF (Fundamental II)",
    unidades: 8,
    alunos: 5_120,
    capacidade: 5_600,
    ocupacao: 91.4,
    profissionais: 380,
  },
  {
    modalidade: "EJA (Jovens e Adultos)",
    unidades: 4,
    alunos: 1_840,
    capacidade: 2_400,
    ocupacao: 76.7,
    profissionais: 120,
  },
  {
    modalidade: "Educação Especial/AEE",
    unidades: 2,
    alunos: 480,
    capacidade: 600,
    ocupacao: 80.0,
    profissionais: 86,
  },
  {
    modalidade: "Escola Rural",
    unidades: 2,
    alunos: 1_260,
    capacidade: 1_400,
    ocupacao: 90.0,
    profissionais: 94,
  },
];

const matriculasPorAno = [
  {
    ano: "2020",
    infantil: 2_840,
    fundamental: 10_200,
    eja: 1_620,
    especial: 340,
  },
  {
    ano: "2021",
    infantil: 2_920,
    fundamental: 10_400,
    eja: 1_580,
    especial: 360,
  },
  {
    ano: "2022",
    infantil: 3_040,
    fundamental: 10_800,
    eja: 1_720,
    especial: 400,
  },
  {
    ano: "2023",
    infantil: 3_140,
    fundamental: 11_200,
    eja: 1_780,
    especial: 440,
  },
  {
    ano: "2024",
    infantil: 3_240,
    fundamental: 11_600,
    eja: 1_840,
    especial: 480,
  },
];

const chartMatriculas = {
  infantil: { label: "Ed. Infantil", color: greenPalette[1] },
  fundamental: { label: "Fundamental", color: greenPalette[3] },
  eja: { label: "EJA", color: greenPalette[4] },
  especial: { label: "Ed. Especial", color: greenPalette[5] },
} satisfies ChartConfig;

const profissionaisEducacao = [
  {
    categoria: "Professores Efetivos",
    quantidade: 680,
    formacaoSuperior: 94.2,
    mediaSalarial: 5_840,
  },
  {
    categoria: "Professores Contratados",
    quantidade: 240,
    formacaoSuperior: 82.5,
    mediaSalarial: 3_200,
  },
  {
    categoria: "Coordenadores Pedagógicos",
    quantidade: 48,
    formacaoSuperior: 100,
    mediaSalarial: 7_200,
  },
  {
    categoria: "Diretores Escolares",
    quantidade: 42,
    formacaoSuperior: 100,
    mediaSalarial: 8_400,
  },
  {
    categoria: "Apoio Pedagógico (AEE)",
    quantidade: 86,
    formacaoSuperior: 91.9,
    mediaSalarial: 4_600,
  },
  {
    categoria: "Auxiliares e Administrativos",
    quantidade: 584,
    formacaoSuperior: 42.1,
    mediaSalarial: 2_200,
  },
];

const transporteEscolar = [
  { rota: "Rural Norte", veiculos: 4, alunos: 480, kmDia: 186, custo: 84_000 },
  { rota: "Rural Sul", veiculos: 3, alunos: 360, kmDia: 142, custo: 68_000 },
  {
    rota: "Urbano Periferia",
    veiculos: 6,
    alunos: 1_240,
    kmDia: 210,
    custo: 96_000,
  },
  { rota: "Distritos", veiculos: 2, alunos: 280, kmDia: 124, custo: 52_000 },
  {
    rota: "Educação Especial",
    veiculos: 2,
    alunos: 120,
    kmDia: 98,
    custo: 44_000,
  },
];

const alimentacaoEscolar = [
  {
    programa: "PNAE - Creche",
    refeicoesDia: 3_240,
    custoAluno: 1.07,
    cobertura: 100,
  },
  {
    programa: "PNAE - Pré-escola",
    refeicoesDia: 2_480,
    custoAluno: 0.53,
    cobertura: 100,
  },
  {
    programa: "PNAE - Fundamental",
    refeicoesDia: 11_600,
    custoAluno: 0.36,
    cobertura: 98.4,
  },
  {
    programa: "PNAE - EJA",
    refeicoesDia: 1_420,
    custoAluno: 0.32,
    cobertura: 77.2,
  },
  {
    programa: "Agricultura Familiar (30%)",
    refeicoesDia: 0,
    custoAluno: 0,
    cobertura: 42.8,
  },
];

const programasEducacionais = [
  {
    programa: "PDDE (Dinheiro Direto)",
    escolas: 42,
    valor: 840_000,
    execucao: 91.4,
  },
  {
    programa: "PNAE (Alimentação)",
    escolas: 42,
    valor: 1_840_000,
    execucao: 96.2,
  },
  {
    programa: "PNATE (Transporte)",
    escolas: 28,
    valor: 1_360_000,
    execucao: 88.5,
  },
  { programa: "Mais Educação", escolas: 18, valor: 640_000, execucao: 82.4 },
  {
    programa: "Brasil Alfabetizado",
    escolas: 8,
    valor: 280_000,
    execucao: 74.2,
  },
  {
    programa: "Educação Conectada",
    escolas: 32,
    valor: 420_000,
    execucao: 68.9,
  },
];

const desempenhoEscolar = [
  {
    escola: "EMEF Monteiro Lobato",
    ideb: 6.8,
    aprovacao: 97.2,
    evasao: 0.8,
    distorcao: 4.2,
  },
  {
    escola: "EMEF Machado de Assis",
    ideb: 6.4,
    aprovacao: 96.1,
    evasao: 1.2,
    distorcao: 5.8,
  },
  {
    escola: "EMEF Castro Alves",
    ideb: 5.9,
    aprovacao: 94.8,
    evasao: 1.6,
    distorcao: 7.4,
  },
  {
    escola: "EMEF Cecília Meireles",
    ideb: 5.6,
    aprovacao: 93.4,
    evasao: 2.1,
    distorcao: 9.2,
  },
  {
    escola: "EMEF Paulo Freire",
    ideb: 5.2,
    aprovacao: 92.8,
    evasao: 2.4,
    distorcao: 11.6,
  },
  {
    escola: "EMEF Anísio Teixeira",
    ideb: 4.8,
    aprovacao: 91.2,
    evasao: 3.2,
    distorcao: 14.8,
  },
];

// ── Dados do Censo e Matrículas ───────────────────────────────────

const listaEsperaCreche = [
  {
    faixaEtaria: "0 a 1 ano",
    inscritos: 342,
    vagasDisponiveis: 180,
    deficit: 162,
    tempoMedioEspera: "8 meses",
  },
  {
    faixaEtaria: "1 a 2 anos",
    inscritos: 298,
    vagasDisponiveis: 220,
    deficit: 78,
    tempoMedioEspera: "5 meses",
  },
  {
    faixaEtaria: "2 a 3 anos",
    inscritos: 264,
    vagasDisponiveis: 240,
    deficit: 24,
    tempoMedioEspera: "2 meses",
  },
  {
    faixaEtaria: "3 a 4 anos (pré-escola)",
    inscritos: 186,
    vagasDisponiveis: 210,
    deficit: 0,
    tempoMedioEspera: "—",
  },
];

const fluxoEscolar = [
  {
    etapa: "1º ao 3º ano (Ciclo Alfab.)",
    matriculas: 3420,
    aprovados: 3318,
    reprovados: 34,
    abandonos: 68,
    aprovacao: 97.0,
    reprovacao: 1.0,
    abandono: 2.0,
  },
  {
    etapa: "4º e 5º ano",
    matriculas: 3060,
    aprovados: 2938,
    reprovados: 92,
    abandonos: 30,
    aprovacao: 96.0,
    reprovacao: 3.0,
    abandono: 1.0,
  },
  {
    etapa: "6º e 7º ano",
    matriculas: 2680,
    aprovados: 2493,
    reprovados: 134,
    abandonos: 53,
    aprovacao: 93.0,
    reprovacao: 5.0,
    abandono: 2.0,
  },
  {
    etapa: "8º e 9º ano",
    matriculas: 2440,
    aprovados: 2220,
    reprovados: 147,
    abandonos: 73,
    aprovacao: 91.0,
    reprovacao: 6.0,
    abandono: 3.0,
  },
  {
    etapa: "EJA - Fundamental",
    matriculas: 1840,
    aprovados: 1527,
    reprovados: 92,
    abandonos: 221,
    aprovacao: 83.0,
    reprovacao: 5.0,
    abandono: 12.0,
  },
];

// ── Dados de Frequência e Busca Ativa ─────────────────────────────

const frequenciaEscolar = [
  {
    escola: "EMEF Monteiro Lobato",
    totalAlunos: 840,
    frequenciaMedia: 94.2,
    infrequentes: 28,
    criticos: 8,
    ficaiEmitidos: 12,
  },
  {
    escola: "EMEF Machado de Assis",
    totalAlunos: 720,
    frequenciaMedia: 92.8,
    infrequentes: 34,
    criticos: 12,
    ficaiEmitidos: 18,
  },
  {
    escola: "EMEF Castro Alves",
    totalAlunos: 680,
    frequenciaMedia: 91.4,
    infrequentes: 42,
    criticos: 15,
    ficaiEmitidos: 22,
  },
  {
    escola: "EMEF Cecília Meireles",
    totalAlunos: 620,
    frequenciaMedia: 89.6,
    infrequentes: 48,
    criticos: 18,
    ficaiEmitidos: 28,
  },
  {
    escola: "EMEF Paulo Freire",
    totalAlunos: 580,
    frequenciaMedia: 88.2,
    infrequentes: 52,
    criticos: 22,
    ficaiEmitidos: 34,
  },
  {
    escola: "EMEF Anísio Teixeira",
    totalAlunos: 540,
    frequenciaMedia: 86.8,
    infrequentes: 58,
    criticos: 26,
    ficaiEmitidos: 42,
  },
];

const buscaAtivaEscolar = {
  alunosIdentificados: 284,
  visitasRealizadas: 412,
  alunosRetornaram: 198,
  alunosEmAcompanhamento: 62,
  encaminhamentosConselhoTutelar: 24,
  taxaRetorno: 69.7,
};

const motivosInfrequencia = [
  {
    motivo: "Vulnerabilidade socioeconômica",
    quantidade: 86,
    percentual: 30.3,
  },
  { motivo: "Trabalho infantil", quantidade: 42, percentual: 14.8 },
  { motivo: "Problemas de saúde", quantidade: 38, percentual: 13.4 },
  { motivo: "Dificuldade de transporte", quantidade: 34, percentual: 12.0 },
  { motivo: "Desinteresse/desmotivação", quantidade: 32, percentual: 11.3 },
  { motivo: "Gravidez na adolescência", quantidade: 18, percentual: 6.3 },
  { motivo: "Mudança de município", quantidade: 22, percentual: 7.7 },
  { motivo: "Outros", quantidade: 12, percentual: 4.2 },
];

// ── Dados do PME, Infraestrutura e Formação ───────────────────────

const metasPME = [
  {
    meta: 1,
    descricao: "Universalizar Ed. Infantil (4-5 anos)",
    indicador: 96.4,
    metaValor: 100,
    prazo: "2025",
    status: "em andamento",
  },
  {
    meta: 2,
    descricao: "Universalizar Ensino Fundamental (6-14 anos)",
    indicador: 98.2,
    metaValor: 100,
    prazo: "2025",
    status: "em andamento",
  },
  {
    meta: 3,
    descricao: "Atender 50% das crianças de 0-3 anos em creches",
    indicador: 38.4,
    metaValor: 50,
    prazo: "2025",
    status: "atrasado",
  },
  {
    meta: 5,
    descricao: "Alfabetizar todas as crianças até o 3º ano",
    indicador: 78.5,
    metaValor: 100,
    prazo: "2025",
    status: "atrasado",
  },
  {
    meta: 6,
    descricao: "Oferecer educação integral em 50% das escolas",
    indicador: 42.9,
    metaValor: 50,
    prazo: "2025",
    status: "em andamento",
  },
  {
    meta: 7,
    descricao: "Atingir média 6.0 no IDEB (anos iniciais)",
    indicador: 6.2,
    metaValor: 6.0,
    prazo: "2025",
    status: "atingido",
  },
  {
    meta: 8,
    descricao: "Elevar escolaridade média (EJA)",
    indicador: 7.2,
    metaValor: 9.5,
    prazo: "2025",
    status: "atrasado",
  },
  {
    meta: 15,
    descricao: "Garantir pós-graduação para 50% dos professores",
    indicador: 42.0,
    metaValor: 50,
    prazo: "2025",
    status: "em andamento",
  },
  {
    meta: 17,
    descricao: "Valorizar profissionais do magistério (piso)",
    indicador: 100,
    metaValor: 100,
    prazo: "2024",
    status: "atingido",
  },
  {
    meta: 19,
    descricao: "Assegurar plano de carreira para profissionais",
    indicador: 100,
    metaValor: 100,
    prazo: "2024",
    status: "atingido",
  },
];

const infraestruturaEscolar = [
  {
    item: "Acessibilidade (rampas/banheiros)",
    escolasAdequadas: 28,
    totalEscolas: 42,
    percentual: 66.7,
  },
  {
    item: "Biblioteca/Sala de Leitura",
    escolasAdequadas: 34,
    totalEscolas: 42,
    percentual: 81.0,
  },
  {
    item: "Laboratório de Informática",
    escolasAdequadas: 26,
    totalEscolas: 42,
    percentual: 61.9,
  },
  {
    item: "Internet Banda Larga",
    escolasAdequadas: 32,
    totalEscolas: 42,
    percentual: 76.2,
  },
  {
    item: "Quadra Poliesportiva",
    escolasAdequadas: 22,
    totalEscolas: 42,
    percentual: 52.4,
  },
  {
    item: "Cozinha Adequada (PNAE)",
    escolasAdequadas: 38,
    totalEscolas: 42,
    percentual: 90.5,
  },
  {
    item: "Parque Infantil (CMEIs)",
    escolasAdequadas: 11,
    totalEscolas: 14,
    percentual: 78.6,
  },
  {
    item: "Sala de AEE/Recursos",
    escolasAdequadas: 18,
    totalEscolas: 42,
    percentual: 42.9,
  },
];

const formacaoContinuada = [
  {
    programa: "PNAIC - Alfabetização",
    profissionais: 180,
    cargaHoraria: 120,
    execucao: 92.4,
    modalidade: "Presencial",
  },
  {
    programa: "Educação Inclusiva/AEE",
    profissionais: 86,
    cargaHoraria: 80,
    execucao: 88.6,
    modalidade: "Híbrido",
  },
  {
    programa: "Tecnologias Educacionais",
    profissionais: 240,
    cargaHoraria: 60,
    execucao: 74.2,
    modalidade: "EaD",
  },
  {
    programa: "BNCC na Prática",
    profissionais: 920,
    cargaHoraria: 40,
    execucao: 96.8,
    modalidade: "Presencial",
  },
  {
    programa: "Gestão Escolar",
    profissionais: 90,
    cargaHoraria: 100,
    execucao: 82.0,
    modalidade: "Híbrido",
  },
  {
    programa: "Educação Socioemocional",
    profissionais: 320,
    cargaHoraria: 30,
    execucao: 68.4,
    modalidade: "EaD",
  },
];

// ── Dados de Análise ───────────────────────────────────────────────

const alertasEducacao = [
  {
    tipo: "warning" as const,
    titulo: "IDEB dos anos finais abaixo da meta",
    badge: "Qualidade",
    descricao:
      "IDEB de 5,1 nos anos finais está 0,4 pontos abaixo da meta de 5,5. Necessário reforço em Língua Portuguesa e Matemática.",
  },
  {
    tipo: "warning" as const,
    titulo: "Compra da agricultura familiar abaixo de 30%",
    badge: "Alimentação",
    descricao:
      "Apenas 42,8% da meta de 30% do PNAE está sendo cumprida com agricultura familiar. Risco de descumprimento legal.",
  },
  {
    tipo: "info" as const,
    titulo: "IDEB dos anos iniciais supera meta nacional",
    badge: "Desempenho",
    descricao:
      "6,2 nos anos iniciais supera a meta de 6,0 e posiciona o município acima da média estadual de 5,8.",
  },
  {
    tipo: "success" as const,
    titulo: "Taxa de evasão abaixo da meta estabelecida",
    badge: "Permanência",
    descricao:
      "1,8% de evasão, abaixo da meta de 2,0%, demonstrando efetividade das políticas de busca ativa e permanência escolar.",
  },
];

// ── Componente Principal ───────────────────────────────────────────

export function Educacao() {
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024");
  const [modalidadeSelecionada, setModalidadeSelecionada] =
    React.useState("todas");

  return (
    <div className="space-y-8">

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Alunos Matriculados"
          icon={UserMultipleIcon}
          value={formatNumber(educacaoResumo.alunosMatriculados)}
          borderColor="border-l-emerald-700"
          footer={
            <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-4"
              />
              Crescimento de 3,2% em relação ao ano anterior
            </div>
          }
        />
        <KpiCard
          title="Unidades Escolares"
          icon={BookOpen02Icon}
          value={formatNumber(educacaoResumo.escolas)}
          borderColor="border-l-emerald-700"
          footer={
            <p className="text-sm text-muted-foreground">
              14 CMEIs, 20 EMEFs, 4 EJA e 4 especializadas
            </p>
          }
        />
        <KpiCard
          title="Profissionais da Educação"
          icon={UserMultipleIcon}
          value={formatNumber(educacaoResumo.profissionaisEducacao)}
          borderColor="border-l-emerald-700"
          footer={
            <p className="text-sm text-muted-foreground">
              920 professores, 48 coordenadores e 42 diretores
            </p>
          }
        />
        <KpiCard
          title="FUNDEB Recebido"
          icon={Wallet01Icon}
          value={fmtBRL(educacaoResumo.fundeRecebido)}
          borderColor="border-l-emerald-700"
          footer={
            <>
              <Progress
                value={
                  (educacaoResumo.fundeRecebido /
                    educacaoResumo.orcamentoTotal) *
                  100
                }
                className="h-2"
              />
              <p className="text-sm text-muted-foreground">
                71% do orçamento total da educação
              </p>
            </>
          }
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Painel Executivo da Educação
            </CardTitle>
            <CardDescription>
              Situação consolidada dos principais indicadores da educação
              pública municipal.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Orçamento Executado
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {(
                  (educacaoResumo.orcamentoEmpenhado /
                    educacaoResumo.orcamentoTotal) *
                  100
                ).toFixed(1)}
                %
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {formatCurrency(educacaoResumo.orcamentoEmpenhado)} de{" "}
                {formatCurrency(educacaoResumo.orcamentoTotal)}
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">Aplicação em MDE</p>
              <p className="mt-2 text-3xl font-semibold">27,4%</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Mínimo constitucional de 25% atendido
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                IDEB Médio Municipal
              </p>
              <p className="mt-2 text-3xl font-semibold">5,65</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Acima da média estadual de 5,3
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
              Alertas de Gestão
            </CardTitle>
            <CardDescription>
              Pontos que merecem acompanhamento dos gestores da educação.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alertasEducacao.map((alerta) => (
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

      <Tabs defaultValue="orcamento" className="w-full">
        <TabsList className="flex h-auto w-full flex-wrap gap-2 rounded-2xl p-2">
          <TabsTrigger value="orcamento">Orçamento e Finanças</TabsTrigger>
          <TabsTrigger value="censo">Censo e Matrículas</TabsTrigger>
          <TabsTrigger value="frequencia">Frequência e Busca Ativa</TabsTrigger>
          <TabsTrigger value="gestao">Gestão da Educação</TabsTrigger>
        </TabsList>

        {/* ── Tab: Orçamento e Finanças ── */}
        <TabsContent value="orcamento" className="mt-6 space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Wallet01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Composição das Despesas
                </CardTitle>
                <CardDescription>
                  Distribuição do orçamento da educação por categoria de
                  despesa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfigDespesas}
                  className="mx-auto aspect-auto h-[320px] w-full"
                >
                  <PieChart>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          nameKey="categoria"
                          formatter={(value) => formatCurrency(Number(value))}
                          hideLabel
                        />
                      }
                    />
                    <Pie
                      data={despesasEducacao}
                      dataKey="valor"
                      nameKey="categoria"
                      innerRadius={70}
                      outerRadius={110}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {despesasEducacao.map((item) => (
                        <Cell key={item.categoria} fill={item.fill} />
                      ))}
                    </Pie>
                    <ChartLegend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      content={
                        <ChartPieValueLegend
                          nameKey="categoria"
                          valueKey="valor"
                          valueFormatter={formatCurrency}
                        />
                      }
                    />
                  </PieChart>
                </ChartContainer>
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
                  Evolução Orçamentária
                </CardTitle>
                <CardDescription>
                  Acompanhamento mensal do orçamento: orçado, empenhado e pago.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfigEvolucao}>
                  <LineChart
                    data={evolucaoOrcamentaria}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `R$ ${(Number(value) / 1_000_000).toFixed(0)}M`
                      }
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatCurrency(Number(value))}
                        />
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="orcado"
                      stroke={greenPalette[5]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="empenhado"
                      stroke={greenPalette[3]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="pago"
                      stroke={greenPalette[1]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                  </LineChart>
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
                  da educação.
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
                    icon={MoneyReceiveSquareIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Receitas por Fonte
                </CardTitle>
                <CardDescription>
                  Origem dos recursos financeiros da secretaria de educação.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fonte</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="text-right">%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {receitasEducacao.map((item) => (
                      <TableRow key={item.fonte}>
                        <TableCell className="font-medium">
                          {item.fonte}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.valor)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.percentual.toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Invoice01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Fontes de Recursos
                </CardTitle>
                <CardDescription>
                  Controle de fontes vinculadas e saldos disponíveis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead className="text-right">Empenhado</TableHead>
                      <TableHead className="text-right">Disponível</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fontesRecursos.map((item) => (
                      <TableRow key={item.codigo}>
                        <TableCell className="font-mono text-sm">
                          {item.codigo}
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.nome}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.empenhado)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.disponivel)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalhamento da Despesa por Bloco</CardTitle>
                <CardDescription>
                  Execução por grandes grupos da política de educação.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Grupo</TableHead>
                      <TableHead className="text-right">Autorizado</TableHead>
                      <TableHead className="text-right">Empenhado</TableHead>
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
                          {formatCurrency(item.pago)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                Contas bancárias da secretaria de educação por tipo de recurso.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Banco</TableHead>
                    <TableHead>Agência</TableHead>
                    <TableHead>Conta</TableHead>
                    <TableHead>Tipo de Recurso</TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contasBancarias.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">
                        {item.banco}
                      </TableCell>
                      <TableCell>{item.agencia}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {item.conta}
                      </TableCell>
                      <TableCell>{item.tipo}</TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(item.saldo)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab: Censo e Matrículas ── */}
        <TabsContent value="censo" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Total de Matrículas 2024"
              icon={UserMultipleIcon}
              value={formatNumber(18_420)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  3.240 infantil, 11.600 fundamental, 1.840 EJA, 480 especial
                </p>
              }
            />
            <KpiCard
              title="Lista de Espera Creche"
              icon={Clock01Icon}
              value="264 crianças"
              borderColor="border-l-emerald-700"
              footer={
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <HugeiconsIcon
                    icon={Alert02Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  Deficit total de vagas (0-3 anos)
                </div>
              }
            />
            <KpiCard
              title="Taxa de Cobertura 4-5 anos"
              icon={AnalyticsUpIcon}
              value="96,4%"
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress value={96.4} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Meta: universalização (100%)
                  </p>
                </>
              }
            />
            <KpiCard
              title="Taxa de Cobertura 6-14 anos"
              icon={AnalyticsUpIcon}
              value="98,2%"
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress value={98.2} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Meta: universalização (100%)
                  </p>
                </>
              }
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Lista de Espera — Creche (Lei 12.796/2013)
              </CardTitle>
              <CardDescription>
                Demanda por vagas em creche por faixa etária. Deficit indica
                necessidade de expansão da rede.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Faixa Etária</TableHead>
                    <TableHead className="text-right">Inscritos</TableHead>
                    <TableHead className="text-right">
                      Vagas Disponíveis
                    </TableHead>
                    <TableHead className="text-right">Deficit</TableHead>
                    <TableHead className="text-right">
                      Tempo Médio de Espera
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listaEsperaCreche.map((item) => (
                    <TableRow key={item.faixaEtaria}>
                      <TableCell className="font-medium">
                        {item.faixaEtaria}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.inscritos)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.vagasDisponiveis)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.deficit > 0
                              ? "font-semibold text-amber-600"
                              : "text-emerald-600"
                          }
                        >
                          {item.deficit > 0 ? item.deficit : "—"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.tempoMedioEspera}
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
                  icon={TaskDaily01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Fluxo Escolar por Etapa
              </CardTitle>
              <CardDescription>
                Taxas de aprovação, reprovação e abandono por etapa do ensino
                fundamental e EJA.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Etapa</TableHead>
                    <TableHead className="text-right">Matrículas</TableHead>
                    <TableHead className="text-right">Aprovados</TableHead>
                    <TableHead className="text-right">Reprovados</TableHead>
                    <TableHead className="text-right">Abandonos</TableHead>
                    <TableHead className="text-right">% Aprovação</TableHead>
                    <TableHead className="text-right">% Abandono</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fluxoEscolar.map((item) => (
                    <TableRow key={item.etapa}>
                      <TableCell className="font-medium">
                        {item.etapa}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.matriculas)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.aprovados)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.reprovados)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.abandonos)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.aprovacao >= 95
                              ? "text-emerald-600 font-semibold"
                              : ""
                          }
                        >
                          {item.aprovacao.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.abandono >= 5
                              ? "font-semibold text-amber-600"
                              : ""
                          }
                        >
                          {item.abandono.toFixed(1)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={BookOpen02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Escolas por Modalidade
                </CardTitle>
                <CardDescription>
                  Unidades escolares, matrículas e taxa de ocupação por
                  modalidade de ensino.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Modalidade</TableHead>
                      <TableHead className="text-right">Unidades</TableHead>
                      <TableHead className="text-right">Alunos</TableHead>
                      <TableHead className="text-right">Ocupação</TableHead>
                      <TableHead className="text-right">
                        Profissionais
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {escolasPorModalidade.map((item) => (
                      <TableRow key={item.modalidade}>
                        <TableCell className="font-medium">
                          {item.modalidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.unidades}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.alunos)}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              item.ocupacao > 90
                                ? "font-semibold text-amber-600"
                                : ""
                            }
                          >
                            {item.ocupacao.toFixed(1)}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.profissionais}
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
                  Evolução de Matrículas
                </CardTitle>
                <CardDescription>
                  Acompanhamento histórico de matrículas por modalidade de
                  ensino.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartMatriculas}
                  className="h-[320px] w-full"
                >
                  <BarChart
                    data={matriculasPorAno}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="ano" tickLine={false} axisLine={false} />
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
                      dataKey="infantil"
                      fill="var(--color-infantil)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="fundamental"
                      fill="var(--color-fundamental)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="eja"
                      fill="var(--color-eja)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="especial"
                      fill="var(--color-especial)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Tab: Frequência e Busca Ativa ── */}
        <TabsContent value="frequencia" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Alunos Infrequentes"
              icon={Alert02Icon}
              value={formatNumber(262)}
              borderColor="border-l-emerald-700"
              footer={
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <HugeiconsIcon
                    icon={ArrowUp01Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  Soma de alunos com frequência abaixo de 75%
                </div>
              }
            />
            <KpiCard
              title="Alunos em Situação Crítica"
              icon={AlertCircleIcon}
              value={formatNumber(101)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Frequência abaixo de 50% ou mais de 15 faltas consecutivas
                </p>
              }
            />
            <KpiCard
              title="FICAI Emitidos"
              icon={Invoice01Icon}
              value={formatNumber(156)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Fichas de Comunicação de Aluno Infrequente
                </p>
              }
            />
            <KpiCard
              title="Taxa de Retorno (Busca Ativa)"
              icon={Search01Icon}
              value="69,7%"
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress value={69.7} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    198 de 284 alunos retornaram às aulas
                  </p>
                </>
              }
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Building01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Frequência por Escola
              </CardTitle>
              <CardDescription>
                Monitoramento da frequência escolar, alunos infrequentes e FICAI
                emitidos por unidade.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Escola</TableHead>
                    <TableHead className="text-right">Total Alunos</TableHead>
                    <TableHead className="text-right">Freq. Média</TableHead>
                    <TableHead className="text-right">Infrequentes</TableHead>
                    <TableHead className="text-right">Críticos</TableHead>
                    <TableHead className="text-right">FICAI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {frequenciaEscolar.map((item) => (
                    <TableRow key={item.escola}>
                      <TableCell className="font-medium">
                        {item.escola}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.totalAlunos)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.frequenciaMedia < 90
                              ? "font-semibold text-amber-600"
                              : "text-emerald-600"
                          }
                        >
                          {item.frequenciaMedia.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.infrequentes}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.criticos > 15
                              ? "font-semibold text-amber-600"
                              : ""
                          }
                        >
                          {item.criticos}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.ficaiEmitidos}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Busca Ativa Escolar
                </CardTitle>
                <CardDescription>
                  Programa de identificação e recuperação de alunos em situação
                  de infrequência e evasão.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Alunos Identificados
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                      {buscaAtivaEscolar.alunosIdentificados}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Visitas Realizadas
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                      {buscaAtivaEscolar.visitasRealizadas}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Alunos Retornaram
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-emerald-600">
                      {buscaAtivaEscolar.alunosRetornaram}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Em Acompanhamento
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                      {buscaAtivaEscolar.alunosEmAcompanhamento}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Encaminhados ao Conselho Tutelar
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-amber-600">
                      {buscaAtivaEscolar.encaminhamentosConselhoTutelar}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Taxa de Retorno
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-emerald-600">
                      {buscaAtivaEscolar.taxaRetorno}%
                    </p>
                  </div>
                </div>
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
                  Motivos de Infrequência
                </CardTitle>
                <CardDescription>
                  Principais causas identificadas para infrequência escolar no
                  município.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Motivo</TableHead>
                      <TableHead className="text-right">Quantidade</TableHead>
                      <TableHead className="text-right">%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {motivosInfrequencia.map((item) => (
                      <TableRow key={item.motivo}>
                        <TableCell className="font-medium">
                          {item.motivo}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.quantidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.percentual.toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              Alertas de Frequência
            </h3>
            <div className="grid gap-3 lg:grid-cols-3">
              <Alert variant="destructive">
                <HugeiconsIcon
                  icon={Alert02Icon}
                  strokeWidth={2}
                  className="size-4"
                />
                <AlertTitle>Faltas Consecutivas</AlertTitle>
                <AlertDescription>
                  42 alunos com mais de 15 faltas consecutivas
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <HugeiconsIcon
                  icon={Alert02Icon}
                  strokeWidth={2}
                  className="size-4"
                />
                <AlertTitle>Frequência Baixa</AlertTitle>
                <AlertDescription>
                  3 escolas com frequência média abaixo de 90%
                </AlertDescription>
              </Alert>
              <Alert>
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  strokeWidth={2}
                  className="size-4"
                />
                <AlertTitle>Busca Ativa</AlertTitle>
                <AlertDescription>
                  Programa de Busca Ativa recuperou 198 alunos no semestre
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </TabsContent>

        {/* ── Tab: Gestão da Educação ── */}
        <TabsContent value="gestao" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Flag01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Plano Municipal de Educação (PME) — Metas
              </CardTitle>
              <CardDescription>
                Acompanhamento das metas do PME com indicadores de execução e
                prazo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">Meta</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Indicador</TableHead>
                    <TableHead className="text-right">Meta</TableHead>
                    <TableHead className="text-right">Prazo</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="w-[120px]">Progresso</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metasPME.map((item) => (
                    <TableRow key={item.meta}>
                      <TableCell className="font-mono font-semibold">
                        {item.meta}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.descricao}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.indicador}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.metaValor}
                      </TableCell>
                      <TableCell className="text-right">{item.prazo}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            item.status === "atingido"
                              ? "default"
                              : item.status === "em andamento"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {item.status === "atingido"
                            ? "Atingido"
                            : item.status === "em andamento"
                              ? "Em andamento"
                              : "Atrasado"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Progress
                          value={Math.min(
                            (item.indicador / item.metaValor) * 100,
                            100,
                          )}
                          className="h-2"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Building01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Infraestrutura Escolar
                </CardTitle>
                <CardDescription>
                  Adequação das escolas municipais quanto a itens de
                  infraestrutura essencial.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Adequadas</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {infraestruturaEscolar.map((item) => (
                      <TableRow key={item.item}>
                        <TableCell className="font-medium">
                          {item.item}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.escolasAdequadas}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.totalEscolas}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              item.percentual < 50
                                ? "font-semibold text-amber-600"
                                : item.percentual >= 80
                                  ? "font-semibold text-emerald-600"
                                  : ""
                            }
                          >
                            {item.percentual.toFixed(1)}%
                          </span>
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
                    icon={BookOpen02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Formação Continuada
                </CardTitle>
                <CardDescription>
                  Programas de capacitação e formação dos profissionais da
                  educação.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formacaoContinuada.map((item) => (
                    <div key={item.programa} className="rounded-2xl border p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="font-medium">{item.programa}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.profissionais} profissionais •{" "}
                            {item.cargaHoraria}h • {item.modalidade}
                          </p>
                        </div>
                        <Badge
                          variant={
                            item.execucao >= 90
                              ? "default"
                              : item.execucao >= 75
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {item.execucao.toFixed(1)}% execução
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Execução do programa</span>
                          <span>{item.execucao.toFixed(1)}%</span>
                        </div>
                        <Progress value={item.execucao} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kpisEducacao.map((kpi) => (
              <KpiCard
                key={kpi.indicador}
                title={kpi.indicador}
                value={
                  <>
                    {kpi.valor}
                    {kpi.unidade}
                  </>
                }
                borderColor="border-l-emerald-700"
                footer={
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Meta: {kpi.meta}
                        {kpi.unidade}
                      </span>
                      <Badge
                        variant={
                          kpi.status === "atingido" ? "default" : "secondary"
                        }
                      >
                        {kpi.status === "atingido" ? "Atingido" : "Atenção"}
                      </Badge>
                    </div>
                    <Progress
                      value={
                        kpi.indicador === "Taxa de Evasão" ||
                        kpi.indicador === "Distorção Idade-Série"
                          ? Math.min((kpi.meta / kpi.valor) * 100, 100)
                          : (kpi.valor / kpi.meta) * 100
                      }
                      className="h-2"
                    />
                  </div>
                }
              />
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Target01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Desempenho por Escola
              </CardTitle>
              <CardDescription>
                Ranking das escolas municipais com indicadores de qualidade e
                fluxo escolar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Escola</TableHead>
                    <TableHead className="text-right">IDEB</TableHead>
                    <TableHead className="text-right">Aprovação</TableHead>
                    <TableHead className="text-right">Evasão</TableHead>
                    <TableHead className="text-right">Distorção I-S</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {desempenhoEscolar.map((item) => (
                    <TableRow key={item.escola}>
                      <TableCell className="font-medium">
                        {item.escola}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.ideb >= 6.0
                              ? "font-semibold text-emerald-600"
                              : item.ideb < 5.0
                                ? "font-semibold text-amber-600"
                                : ""
                          }
                        >
                          {item.ideb.toFixed(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.aprovacao.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.evasao > 2.0
                              ? "font-semibold text-amber-600"
                              : ""
                          }
                        >
                          {item.evasao.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.distorcao > 10
                              ? "font-semibold text-amber-600"
                              : ""
                          }
                        >
                          {item.distorcao.toFixed(1)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Profissionais da Educação
                </CardTitle>
                <CardDescription>
                  Quadro de profissionais por categoria, formação e remuneração
                  média.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Categoria</TableHead>
                      <TableHead className="text-right">Qtd</TableHead>
                      <TableHead className="text-right">
                        Formação Sup.
                      </TableHead>
                      <TableHead className="text-right">
                        Média Salarial
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profissionaisEducacao.map((item) => (
                      <TableRow key={item.categoria}>
                        <TableCell className="font-medium">
                          {item.categoria}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.quantidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.formacaoSuperior.toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.mediaSalarial)}
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
                    icon={Target01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Programas Educacionais
                </CardTitle>
                <CardDescription>
                  Execução dos programas federais e estaduais vinculados à
                  educação.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programasEducacionais.map((item) => (
                    <div key={item.programa} className="rounded-2xl border p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="font-medium">{item.programa}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.escolas} escolas • Investimento:{" "}
                            {formatCurrency(item.valor)}
                          </p>
                        </div>
                        <Badge
                          variant={
                            item.execucao >= 90
                              ? "default"
                              : item.execucao >= 75
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {item.execucao.toFixed(1)}% execução
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Execução financeira</span>
                          <span>{item.execucao.toFixed(1)}%</span>
                        </div>
                        <Progress value={item.execucao} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Transporte Escolar</CardTitle>
                <CardDescription>
                  Monitoramento das rotas de transporte escolar municipal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rota</TableHead>
                      <TableHead className="text-right">Veículos</TableHead>
                      <TableHead className="text-right">Alunos</TableHead>
                      <TableHead className="text-right">Km/Dia</TableHead>
                      <TableHead className="text-right">Custo/Mês</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transporteEscolar.map((item) => (
                      <TableRow key={item.rota}>
                        <TableCell className="font-medium">
                          {item.rota}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.veiculos}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.alunos)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.kmDia}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.custo)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alimentação Escolar</CardTitle>
                <CardDescription>
                  Controle do Programa Nacional de Alimentação Escolar (PNAE).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Programa</TableHead>
                      <TableHead className="text-right">
                        Refeições/Dia
                      </TableHead>
                      <TableHead className="text-right">Custo/Aluno</TableHead>
                      <TableHead className="text-right">Cobertura</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alimentacaoEscolar.map((item) => (
                      <TableRow key={item.programa}>
                        <TableCell className="font-medium">
                          {item.programa}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.refeicoesDia > 0
                            ? formatNumber(item.refeicoesDia)
                            : "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.custoAluno > 0
                            ? `R$ ${item.custoAluno.toFixed(2)}`
                            : "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              item.cobertura < 50
                                ? "font-semibold text-amber-600"
                                : ""
                            }
                          >
                            {item.cobertura.toFixed(1)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Tab: Análises ── */}
      </Tabs>
    </div>
  );
}
