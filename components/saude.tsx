"use client";

import * as React from "react";
import {
  HeartCheckIcon,
  Hospital01Icon,
  UserMultipleIcon,
  MedicineBottle02Icon,
  Stethoscope02Icon,
  Calendar01Icon,
  ChartLineData02Icon,
  Wallet01Icon,
  MoneyReceiveSquareIcon,
  BankIcon,
  Invoice01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  FilterIcon,
  RefreshIcon,
  Alert02Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  BulbIcon,
  Target01Icon,
  Flag01Icon,
  AlertCircleIcon,
  Calculator01Icon,
  SecurityCheckIcon,
  Activity01Icon,
  FirstAidKitIcon,
  Clock01Icon,
  UserAdd01Icon,
  SearchIcon,
  ShoppingCart01Icon,
  Analytics01Icon,
  FileValidationIcon,
  CoinsSwapIcon,
  PercentSquareIcon,
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
  Area,
  AreaChart,
} from "recharts";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Separator } from "@/components/ui/separator";
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

const saudeResumo = {
  orcamentoTotal: 52_400_000,
  orcamentoEmpenhado: 49_800_000,
  orcamentoPago: 46_200_000,
  receitaTotal: 54_100_000,
  populacaoAtendida: 142_850,
  unidadesSaude: 28,
  profissionaisSaude: 1_240,
  atendimentosMes: 18_450,
};

const despesasSaude = [
  {
    categoria: "Pessoal e Encargos",
    valor: 32_800_000,
    percentual: 65.9,
    fill: greenPalette[1],
  },
  {
    categoria: "Medicamentos",
    valor: 8_400_000,
    percentual: 16.9,
    fill: greenPalette[2],
  },
  {
    categoria: "Serviços Terceirizados",
    valor: 4_200_000,
    percentual: 8.4,
    fill: greenPalette[3],
  },
  {
    categoria: "Equipamentos e Manutenção",
    valor: 2_800_000,
    percentual: 5.6,
    fill: greenPalette[4],
  },
  {
    categoria: "Outras Despesas",
    valor: 1_600_000,
    percentual: 3.2,
    fill: greenPalette[5],
  },
];

const chartConfigDespesas = {
  "Pessoal e Encargos": { label: "Pessoal e Encargos", color: greenPalette[1] },
  Medicamentos: { label: "Medicamentos", color: greenPalette[2] },
  "Serviços Terceirizados": {
    label: "Serviços Terceirizados",
    color: greenPalette[3],
  },
  "Equipamentos e Manutenção": {
    label: "Equipamentos e Manutenção",
    color: greenPalette[4],
  },
  "Outras Despesas": { label: "Outras Despesas", color: greenPalette[5] },
} satisfies ChartConfig;

const receitasSaude = [
  { fonte: "Transferências SUS", valor: 38_200_000, percentual: 70.6 },
  { fonte: "Recursos Próprios", valor: 12_400_000, percentual: 22.9 },
  { fonte: "Convênios Estaduais", valor: 2_100_000, percentual: 3.9 },
  { fonte: "Convênios Federais", valor: 1_400_000, percentual: 2.6 },
];

const fontesRecursos = [
  {
    codigo: "1.500",
    nome: "Recursos Próprios",
    saldo: 2_840_000,
    empenhado: 9_560_000,
    disponivel: 2_840_000,
  },
  {
    codigo: "1.600",
    nome: "SUS - Atenção Básica",
    saldo: 1_240_000,
    empenhado: 18_960_000,
    disponivel: 1_240_000,
  },
  {
    codigo: "1.601",
    nome: "SUS - MAC",
    saldo: 890_000,
    empenhado: 14_800_000,
    disponivel: 890_000,
  },
  {
    codigo: "1.602",
    nome: "SUS - Vigilância em Saúde",
    saldo: 420_000,
    empenhado: 3_840_000,
    disponivel: 420_000,
  },
  {
    codigo: "1.700",
    nome: "Convênio Estadual - SESA",
    saldo: 180_000,
    empenhado: 1_920_000,
    disponivel: 180_000,
  },
  {
    codigo: "1.750",
    nome: "Convênio Federal - Ministério",
    saldo: 95_000,
    empenhado: 1_305_000,
    disponivel: 95_000,
  },
];

const contasBancarias = [
  {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12345-6",
    tipo: "Recursos Próprios",
    saldo: 2_840_000,
  },
  {
    banco: "Caixa Econômica",
    agencia: "0987",
    conta: "00123-4",
    tipo: "SUS - Atenção Básica",
    saldo: 1_240_000,
  },
  {
    banco: "Caixa Econômica",
    agencia: "0987",
    conta: "00124-2",
    tipo: "SUS - MAC",
    saldo: 890_000,
  },
  {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12346-4",
    tipo: "Vigilância em Saúde",
    saldo: 420_000,
  },
  {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12347-2",
    tipo: "Convênios",
    saldo: 275_000,
  },
];

const evolucaoOrcamentaria = [
  { mes: "Jan", orcado: 6_000_000, empenhado: 5_800_000, pago: 5_400_000 },
  { mes: "Fev", orcado: 6_100_000, empenhado: 5_950_000, pago: 5_600_000 },
  { mes: "Mar", orcado: 6_200_000, empenhado: 6_100_000, pago: 5_750_000 },
  { mes: "Abr", orcado: 6_300_000, empenhado: 6_200_000, pago: 5_900_000 },
  { mes: "Mai", orcado: 6_400_000, empenhado: 6_300_000, pago: 5_950_000 },
  { mes: "Jun", orcado: 6_500_000, empenhado: 6_400_000, pago: 6_100_000 },
  { mes: "Jul", orcado: 6_550_000, empenhado: 6_450_000, pago: 6_200_000 },
  { mes: "Ago", orcado: 6_550_000, empenhado: 6_400_000, pago: 6_300_000 },
];

const chartConfigEvolucao = {
  orcado: { label: "Orçado", color: greenPalette[5] },
  empenhado: { label: "Empenhado", color: greenPalette[3] },
  pago: { label: "Pago", color: greenPalette[1] },
} satisfies ChartConfig;

const kpisSaude = [
  {
    indicador: "Cobertura ESF",
    valor: 87.4,
    meta: 85.0,
    unidade: "%",
    status: "atingido",
  },
  {
    indicador: "Vacinação em Dia",
    valor: 92.1,
    meta: 95.0,
    unidade: "%",
    status: "atencao",
  },
  {
    indicador: "Pré-natal (7+ consultas)",
    valor: 78.5,
    meta: 80.0,
    unidade: "%",
    status: "atencao",
  },
  {
    indicador: "Tempo Médio Espera",
    valor: 18,
    meta: 15,
    unidade: "dias",
    status: "atencao",
  },
  {
    indicador: "Taxa Ocupação Leitos",
    valor: 82.3,
    meta: 85.0,
    unidade: "%",
    status: "atingido",
  },
  {
    indicador: "Resolutividade APS",
    valor: 91.2,
    meta: 90.0,
    unidade: "%",
    status: "atingido",
  },
];

const atendimentosPorUnidade = [
  {
    unidade: "UBS Centro",
    atendimentos: 4_240,
    capacidade: 5_000,
    ocupacao: 84.8,
    profissionais: 28,
  },
  {
    unidade: "UBS Norte",
    atendimentos: 3_890,
    capacidade: 4_500,
    ocupacao: 86.4,
    profissionais: 24,
  },
  {
    unidade: "UBS Sul",
    atendimentos: 3_420,
    capacidade: 4_000,
    ocupacao: 85.5,
    profissionais: 22,
  },
  {
    unidade: "UBS Leste",
    atendimentos: 2_980,
    capacidade: 3_500,
    ocupacao: 85.1,
    profissionais: 18,
  },
  {
    unidade: "UPA 24h",
    atendimentos: 2_840,
    capacidade: 3_000,
    ocupacao: 94.7,
    profissionais: 42,
  },
  {
    unidade: "Hospital Municipal",
    atendimentos: 1_080,
    capacidade: 1_200,
    ocupacao: 90.0,
    profissionais: 86,
  },
];

const produtividadeProfissionais = [
  {
    categoria: "Médicos",
    quantidade: 124,
    atendimentos: 8_940,
    mediaDia: 12.1,
  },
  {
    categoria: "Enfermeiros",
    quantidade: 186,
    atendimentos: 12_480,
    mediaDia: 11.2,
  },
  {
    categoria: "Técnicos Enfermagem",
    quantidade: 342,
    atendimentos: 18_450,
    mediaDia: 9.0,
  },
  {
    categoria: "Dentistas",
    quantidade: 48,
    atendimentos: 3_240,
    mediaDia: 11.3,
  },
  {
    categoria: "Farmacêuticos",
    quantidade: 24,
    atendimentos: 14_820,
    mediaDia: 103.2,
  },
  {
    categoria: "Agentes Comunitários",
    quantidade: 516,
    visitas: 28_940,
    mediaDia: 9.4,
  },
];

const estoqueMedicamentos = [
  {
    medicamento: "Paracetamol 500mg",
    estoque: 48_000,
    consumoMedio: 12_400,
    cobertura: 116,
    criticidade: "adequado",
  },
  {
    medicamento: "Dipirona 500mg",
    estoque: 36_000,
    consumoMedio: 9_800,
    cobertura: 110,
    criticidade: "adequado",
  },
  {
    medicamento: "Amoxicilina 500mg",
    estoque: 8_400,
    consumoMedio: 4_200,
    cobertura: 60,
    criticidade: "atencao",
  },
  {
    medicamento: "Losartana 50mg",
    estoque: 24_000,
    consumoMedio: 8_100,
    cobertura: 89,
    criticidade: "adequado",
  },
  {
    medicamento: "Metformina 850mg",
    estoque: 18_000,
    consumoMedio: 6_800,
    cobertura: 79,
    criticidade: "atencao",
  },
  {
    medicamento: "Insulina NPH",
    estoque: 840,
    consumoMedio: 620,
    cobertura: 41,
    criticidade: "critico",
  },
];

const programasSaude = [
  {
    programa: "Saúde da Família",
    beneficiarios: 124_800,
    cobertura: 87.4,
    investimento: 18_200_000,
  },
  {
    programa: "Saúde Bucal",
    beneficiarios: 89_400,
    cobertura: 62.6,
    investimento: 3_840_000,
  },
  {
    programa: "Saúde da Mulher",
    beneficiarios: 42_100,
    cobertura: 58.9,
    investimento: 2_940_000,
  },
  {
    programa: "Saúde da Criança",
    beneficiarios: 28_400,
    cobertura: 94.2,
    investimento: 4_280_000,
  },
  {
    programa: "Hiperdia",
    beneficiarios: 18_900,
    cobertura: 72.1,
    investimento: 1_840_000,
  },
  {
    programa: "Saúde Mental",
    beneficiarios: 3_240,
    cobertura: 48.2,
    investimento: 1_680_000,
  },
];

const alertasSaude = [
  {
    tipo: "warning" as const,
    titulo: "Estoque crítico de insulina NPH",
    badge: "Medicamentos",
    descricao:
      "Cobertura de apenas 41 dias. Necessário processo emergencial de aquisição para atender pacientes diabéticos.",
  },
  {
    tipo: "warning" as const,
    titulo: "Tempo de espera acima da meta",
    badge: "Atendimento",
    descricao:
      "Tempo médio de 18 dias está 20% acima da meta de 15 dias. Concentrado em especialidades de cardiologia e ortopedia.",
  },
  {
    tipo: "info" as const,
    titulo: "Cobertura ESF supera meta estabelecida",
    badge: "Atenção Básica",
    descricao:
      "87,4% da população coberta pela Estratégia Saúde da Família, superando a meta de 85% e a média nacional de 75%.",
  },
  {
    tipo: "success" as const,
    titulo: "Resolutividade da APS acima de 90%",
    badge: "Qualidade",
    descricao:
      "91,2% dos casos resolvidos na Atenção Primária, reduzindo sobrecarga no hospital e na UPA.",
  },
];

const alertasAnalise = [
  {
    tipo: "warning" as const,
    titulo: "Execução orçamentária abaixo do esperado",
    badge: "Orçamento",
    descricao:
      "Com 95% de execução, há risco de devolução de recursos federais vinculados ao SUS se não houver empenho até novembro.",
  },
  {
    tipo: "warning" as const,
    titulo: "Déficit de profissionais em saúde mental",
    badge: "Recursos Humanos",
    descricao:
      "Apenas 48,2% de cobertura no programa de saúde mental, com necessidade de contratação de 3 psicólogos e 2 psiquiatras.",
  },
  {
    tipo: "info" as const,
    titulo: "Aumento de 12% nos atendimentos de urgência",
    badge: "Demanda",
    descricao:
      "UPA 24h operando com 94,7% de ocupação. Recomenda-se reforço na atenção básica para desafogar urgências.",
  },
  {
    tipo: "success" as const,
    titulo: "Vacinação infantil mantém índices elevados",
    badge: "Imunização",
    descricao:
      "Cobertura de 94,2% no programa Saúde da Criança, próximo da meta de 95% e acima da média estadual de 88%.",
  },
  {
    tipo: "warning" as const,
    titulo: "Pré-natal com 7+ consultas abaixo da meta",
    badge: "Saúde Materna",
    descricao:
      "78,5% das gestantes com 7 ou mais consultas, abaixo da meta de 80%. Necessário intensificar busca ativa.",
  },
  {
    tipo: "info" as const,
    titulo: "Renovação de equipamentos hospitalares prevista",
    badge: "Investimentos",
    descricao:
      "Convênio federal de R$ 1,4 milhão aprovado para aquisição de 2 tomógrafos e modernização do centro cirúrgico.",
  },
];

// ─── ASPS Compliance (EC 29 / LC 141) ─────────────────────────────────
const aspsCompliance = {
  receitaImpostos: 248_600_000,
  minimoConstitucional: 0.15,
  aplicadoSaude: 49_800_000,
  percentualAplicado: 20.02,
  minimoExigido: 37_290_000,
  superavit: 12_510_000,
};

// ─── Mortality & Morbidity Indicators ──────────────────────────────────
const indicadoresMortalidade = {
  mortalidadeInfantil: 9.8,
  mortalidadeInfantilMeta: 12.0,
  mortalidadeMaterna: 42.5,
  mortalidadeMaternaMeta: 50.0,
  mortalidadeNeonatal: 6.2,
  icsap: 28.4,
  icsapMeta: 30.0,
  mortalidadePrematura: 312.8,
};

// ─── Epidemiological Surveillance ──────────────────────────────────────
const vigilanciaDoencas = [
  {
    doenca: "Dengue",
    casosConfirmados: 342,
    casosSuspeitos: 518,
    obitos: 1,
    incidencia: 209.4,
    tendencia: "alta",
  },
  {
    doenca: "COVID-19",
    casosConfirmados: 89,
    casosSuspeitos: 145,
    obitos: 0,
    incidencia: 54.5,
    tendencia: "estavel",
  },
  {
    doenca: "Tuberculose",
    casosConfirmados: 28,
    casosSuspeitos: 42,
    obitos: 1,
    incidencia: 17.1,
    tendencia: "estavel",
  },
  {
    doenca: "Hanseníase",
    casosConfirmados: 12,
    casosSuspeitos: 18,
    obitos: 0,
    incidencia: 7.3,
    tendencia: "queda",
  },
  {
    doenca: "Sífilis Congênita",
    casosConfirmados: 6,
    casosSuspeitos: 9,
    obitos: 0,
    incidencia: 3.7,
    tendencia: "alta",
  },
  {
    doenca: "HIV/AIDS",
    casosConfirmados: 15,
    casosSuspeitos: 24,
    obitos: 0,
    incidencia: 9.2,
    tendencia: "estavel",
  },
  {
    doenca: "Hepatites Virais",
    casosConfirmados: 8,
    casosSuspeitos: 14,
    obitos: 0,
    incidencia: 4.9,
    tendencia: "queda",
  },
  {
    doenca: "Leishmaniose",
    casosConfirmados: 4,
    casosSuspeitos: 11,
    obitos: 0,
    incidencia: 2.4,
    tendencia: "estavel",
  },
];

const notificacoesSINAN = [
  { mes: "Jan", notificacoes: 142, confirmados: 68 },
  { mes: "Fev", notificacoes: 168, confirmados: 82 },
  { mes: "Mar", notificacoes: 245, confirmados: 128 },
  { mes: "Abr", notificacoes: 312, confirmados: 156 },
  { mes: "Mai", notificacoes: 284, confirmados: 134 },
  { mes: "Jun", notificacoes: 198, confirmados: 92 },
  { mes: "Jul", notificacoes: 156, confirmados: 74 },
  { mes: "Ago", notificacoes: 178, confirmados: 86 },
];

const chartConfigNotificacoes = {
  notificacoes: { label: "Notificações", color: greenPalette[4] },
  confirmados: { label: "Confirmados", color: greenPalette[1] },
} satisfies ChartConfig;

const coberturaVacinal = [
  { vacina: "BCG", cobertura: 96.8, meta: 90.0, publicoAlvo: "Recém-nascidos" },
  {
    vacina: "Pentavalente",
    cobertura: 88.4,
    meta: 95.0,
    publicoAlvo: "< 1 ano",
  },
  {
    vacina: "VIP/VOP (Polio)",
    cobertura: 91.2,
    meta: 95.0,
    publicoAlvo: "< 1 ano",
  },
  {
    vacina: "Tríplice Viral",
    cobertura: 89.6,
    meta: 95.0,
    publicoAlvo: "12 meses",
  },
  {
    vacina: "Influenza",
    cobertura: 72.4,
    meta: 90.0,
    publicoAlvo: "Grupos prioritários",
  },
  {
    vacina: "COVID-19 (Bivalente)",
    cobertura: 62.8,
    meta: 80.0,
    publicoAlvo: "Adultos 60+",
  },
];

const alertasVigilancia = [
  {
    tipo: "warning" as const,
    titulo: "Surto de dengue na região Norte",
    badge: "Arboviroses",
    descricao:
      "Aumento de 180% nos casos de dengue no bairro Jardim Esperança. LIRAa indica 4,2% de infestação predial, acima do limite de 3,9%.",
  },
  {
    tipo: "warning" as const,
    titulo: "Sífilis congênita acima do aceitável",
    badge: "IST",
    descricao:
      "6 casos confirmados no semestre, acima da meta de eliminação (0,5/1.000 NV). Necessário fortalecer pré-natal e testagem rápida.",
  },
  {
    tipo: "info" as const,
    titulo: "Campanha de vacinação contra Influenza",
    badge: "Imunização",
    descricao:
      "Cobertura vacinal de 72,4% para influenza. Meta de 90% requer intensificação da busca ativa em idosos e gestantes.",
  },
  {
    tipo: "success" as const,
    titulo: "Hanseníase em tendência de queda",
    badge: "Doenças Crônicas",
    descricao:
      "Redução de 25% nos casos novos em relação ao mesmo período do ano anterior. Manter vigilância de contatos.",
  },
];

// ─── Regulation & Queue Management ─────────────────────────────────────
const filasEspecialidades = [
  {
    especialidade: "Cardiologia",
    aguardando: 284,
    tempoMedio: 42,
    atendidosMes: 120,
    meta: 30,
    prioridade: "alta",
  },
  {
    especialidade: "Ortopedia",
    aguardando: 312,
    tempoMedio: 56,
    atendidosMes: 95,
    meta: 30,
    prioridade: "alta",
  },
  {
    especialidade: "Oftalmologia",
    aguardando: 198,
    tempoMedio: 38,
    atendidosMes: 80,
    meta: 30,
    prioridade: "media",
  },
  {
    especialidade: "Neurologia",
    aguardando: 145,
    tempoMedio: 64,
    atendidosMes: 45,
    meta: 45,
    prioridade: "alta",
  },
  {
    especialidade: "Dermatologia",
    aguardando: 89,
    tempoMedio: 28,
    atendidosMes: 60,
    meta: 30,
    prioridade: "baixa",
  },
  {
    especialidade: "Endocrinologia",
    aguardando: 124,
    tempoMedio: 48,
    atendidosMes: 50,
    meta: 30,
    prioridade: "media",
  },
  {
    especialidade: "Psiquiatria",
    aguardando: 168,
    tempoMedio: 72,
    atendidosMes: 35,
    meta: 30,
    prioridade: "alta",
  },
  {
    especialidade: "Urologia",
    aguardando: 76,
    tempoMedio: 32,
    atendidosMes: 55,
    meta: 30,
    prioridade: "baixa",
  },
];

const filasExames = [
  { exame: "Ressonância Magnética", aguardando: 186, tempoMedio: 45, meta: 30 },
  { exame: "Tomografia", aguardando: 124, tempoMedio: 28, meta: 15 },
  { exame: "Ultrassonografia", aguardando: 98, tempoMedio: 18, meta: 15 },
  { exame: "Endoscopia", aguardando: 142, tempoMedio: 35, meta: 20 },
  { exame: "Mamografia", aguardando: 64, tempoMedio: 12, meta: 15 },
  { exame: "Eletrocardiograma", aguardando: 28, tempoMedio: 5, meta: 7 },
];

const regulacaoResumo = {
  totalFilaConsultas: 1_396,
  totalFilaExames: 642,
  tfdAtivos: 18,
  tfdCustoMensal: 124_500,
  encaminhamentosEmAberto: 2_038,
  taxaAbsenteismo: 14.2,
  metaAbsenteismo: 10.0,
};

const evolucaoFilas = [
  { mes: "Jan", consultas: 1_680, exames: 820 },
  { mes: "Fev", consultas: 1_620, exames: 780 },
  { mes: "Mar", consultas: 1_540, exames: 740 },
  { mes: "Abr", consultas: 1_480, exames: 700 },
  { mes: "Mai", consultas: 1_440, exames: 680 },
  { mes: "Jun", consultas: 1_420, exames: 660 },
  { mes: "Jul", consultas: 1_410, exames: 650 },
  { mes: "Ago", consultas: 1_396, exames: 642 },
];

const chartConfigFilas = {
  consultas: { label: "Fila Consultas", color: greenPalette[3] },
  exames: { label: "Fila Exames", color: greenPalette[1] },
} satisfies ChartConfig;

// ─── Enhanced Professionals Data ───────────────────────────────────────
const quadroProfissionais = [
  {
    categoria: "Médicos",
    previsto: 148,
    ocupado: 124,
    vago: 24,
    taxaVacancia: 16.2,
    rotatividade: 18.4,
    razao: "0,76/1.000 hab",
  },
  {
    categoria: "Enfermeiros",
    previsto: 200,
    ocupado: 186,
    vago: 14,
    taxaVacancia: 7.0,
    rotatividade: 8.2,
    razao: "1,14/1.000 hab",
  },
  {
    categoria: "Téc. Enfermagem",
    previsto: 380,
    ocupado: 342,
    vago: 38,
    taxaVacancia: 10.0,
    rotatividade: 12.6,
    razao: "2,09/1.000 hab",
  },
  {
    categoria: "Dentistas",
    previsto: 56,
    ocupado: 48,
    vago: 8,
    taxaVacancia: 14.3,
    rotatividade: 10.8,
    razao: "0,29/1.000 hab",
  },
  {
    categoria: "Farmacêuticos",
    previsto: 28,
    ocupado: 24,
    vago: 4,
    taxaVacancia: 14.3,
    rotatividade: 6.4,
    razao: "0,15/1.000 hab",
  },
  {
    categoria: "ACS",
    previsto: 560,
    ocupado: 516,
    vago: 44,
    taxaVacancia: 7.9,
    rotatividade: 4.2,
    razao: "3,16/1.000 hab",
  },
  {
    categoria: "Psicólogos",
    previsto: 18,
    ocupado: 8,
    vago: 10,
    taxaVacancia: 55.6,
    rotatividade: 22.0,
    razao: "0,05/1.000 hab",
  },
  {
    categoria: "Psiquiatras",
    previsto: 6,
    ocupado: 2,
    vago: 4,
    taxaVacancia: 66.7,
    rotatividade: 28.0,
    razao: "0,01/1.000 hab",
  },
];

const capacitacoes = [
  {
    nome: "Urgência e Emergência (ATLS)",
    profissionais: 42,
    cargaHoraria: 40,
    conclusao: 88,
  },
  {
    nome: "Atenção Básica (AIDPI)",
    profissionais: 86,
    cargaHoraria: 60,
    conclusao: 72,
  },
  {
    nome: "Saúde Mental (Acolhimento)",
    profissionais: 24,
    cargaHoraria: 32,
    conclusao: 95,
  },
  {
    nome: "Imunização (Atualização PNI)",
    profissionais: 128,
    cargaHoraria: 20,
    conclusao: 84,
  },
  {
    nome: "Vigilância Epidemiológica",
    profissionais: 36,
    cargaHoraria: 24,
    conclusao: 68,
  },
];

// ─── Enhanced Medication Data ──────────────────────────────────────────
const consumoMedicamentosMensal = [
  { mes: "Jan", dispensacoes: 42_800, custoTotal: 680_000 },
  { mes: "Fev", dispensacoes: 44_200, custoTotal: 695_000 },
  { mes: "Mar", dispensacoes: 46_800, custoTotal: 720_000 },
  { mes: "Abr", dispensacoes: 48_400, custoTotal: 745_000 },
  { mes: "Mai", dispensacoes: 47_200, custoTotal: 738_000 },
  { mes: "Jun", dispensacoes: 45_600, custoTotal: 712_000 },
  { mes: "Jul", dispensacoes: 44_800, custoTotal: 698_000 },
  { mes: "Ago", dispensacoes: 46_200, custoTotal: 725_000 },
];

const chartConfigConsumo = {
  dispensacoes: { label: "Dispensações", color: greenPalette[3] },
  custoTotal: { label: "Custo (R$)", color: greenPalette[1] },
} satisfies ChartConfig;

const aquisicoesPipeline = [
  {
    item: "Insulina NPH (emergencial)",
    modalidade: "Dispensa de Licitação",
    valor: 245_000,
    status: "em_andamento",
    previsao: "Set/2024",
  },
  {
    item: "Medicamentos Atenção Básica",
    modalidade: "Pregão Eletrônico",
    valor: 1_840_000,
    status: "publicado",
    previsao: "Out/2024",
  },
  {
    item: "Insumos Hospitalares",
    modalidade: "Pregão Eletrônico",
    valor: 680_000,
    status: "em_elaboracao",
    previsao: "Nov/2024",
  },
  {
    item: "Medicamentos Saúde Mental",
    modalidade: "Ata de Registro de Preços",
    valor: 320_000,
    status: "concluido",
    previsao: "Ago/2024",
  },
  {
    item: "Vacinas (complementar PNI)",
    modalidade: "Adesão ARP",
    valor: 480_000,
    status: "em_andamento",
    previsao: "Set/2024",
  },
];

const curvaABC = [
  {
    classe: "A",
    itens: 42,
    percentualItens: 14,
    percentualValor: 72,
    valor: 6_048_000,
  },
  {
    classe: "B",
    itens: 84,
    percentualItens: 28,
    percentualValor: 20,
    valor: 1_680_000,
  },
  {
    classe: "C",
    itens: 174,
    percentualItens: 58,
    percentualValor: 8,
    valor: 672_000,
  },
];

// ─── Previne Brasil Indicators ─────────────────────────────────────────
const previneBrasil = {
  pap: {
    nome: "Pagamento por Ações Públicas (PAP)",
    valor: 2_840_000,
    capitacao: 1_680_000,
    desempenho: 1_160_000,
  },
  indicadores: [
    {
      indicador: "Proporção de gestantes com 6+ consultas pré-natal",
      valor: 72.4,
      meta: 60.0,
      peso: 1,
      status: "atingido",
    },
    {
      indicador: "Proporção de gestantes com teste HIV e sífilis",
      valor: 84.2,
      meta: 60.0,
      peso: 1,
      status: "atingido",
    },
    {
      indicador: "Proporção de gestantes com atendimento odontológico",
      valor: 48.6,
      meta: 60.0,
      peso: 1,
      status: "atencao",
    },
    {
      indicador: "Cobertura de exame citopatológico (25-64 anos)",
      valor: 42.8,
      meta: 40.0,
      peso: 1,
      status: "atingido",
    },
    {
      indicador: "Cobertura vacinal de Polio e Penta (< 1 ano)",
      valor: 88.4,
      meta: 95.0,
      peso: 1,
      status: "atencao",
    },
    {
      indicador: "Percentual de HAS com PA aferida a cada semestre",
      valor: 68.4,
      meta: 50.0,
      peso: 1,
      status: "atingido",
    },
    {
      indicador: "Percentual de DM com hemoglobina glicada solicitada",
      valor: 58.2,
      meta: 50.0,
      peso: 1,
      status: "atingido",
    },
  ],
  isf: {
    nota: 8.2,
    classificacao: "Bom",
    componentes: [
      { componente: "Processo de trabalho", nota: 8.8 },
      { componente: "Satisfação do usuário", nota: 7.6 },
      { componente: "Resultado de indicadores", nota: 8.2 },
    ],
  },
};

// ─── Monthly visit trends ──────────────────────────────────────────────
const atendimentosTendencia = [
  { mes: "Jan", ubs: 12_400, upa: 2_680, hospital: 980 },
  { mes: "Fev", ubs: 12_800, upa: 2_720, hospital: 1_020 },
  { mes: "Mar", ubs: 13_200, upa: 2_840, hospital: 1_060 },
  { mes: "Abr", ubs: 13_600, upa: 2_900, hospital: 1_040 },
  { mes: "Mai", ubs: 14_100, upa: 2_780, hospital: 1_080 },
  { mes: "Jun", ubs: 14_530, upa: 2_840, hospital: 1_080 },
  { mes: "Jul", ubs: 14_200, upa: 2_760, hospital: 1_060 },
  { mes: "Ago", ubs: 14_530, upa: 2_840, hospital: 1_080 },
];

const chartConfigAtendimentos = {
  ubs: { label: "UBS", color: greenPalette[3] },
  upa: { label: "UPA", color: greenPalette[1] },
  hospital: { label: "Hospital", color: greenPalette[5] },
} satisfies ChartConfig;

export function Saude() {
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024");
  const [unidadeSelecionada, setUnidadeSelecionada] = React.useState("todas");

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestão de Saúde</h2>
          <p className="text-muted-foreground">
            Controle e monitoramento da saúde pública municipal
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
          <Select
            value={unidadeSelecionada}
            onValueChange={setUnidadeSelecionada}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as Unidades</SelectItem>
              <SelectItem value="ubs">UBS</SelectItem>
              <SelectItem value="upa">UPA</SelectItem>
              <SelectItem value="hospital">Hospital</SelectItem>
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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="População Atendida"
          icon={UserMultipleIcon}
          value={formatNumber(saudeResumo.populacaoAtendida)}
          borderColor="border-l-emerald-700"
          footer={
            <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-4"
              />
              Cobertura de 87,4% pela ESF
            </div>
          }
        />
        <KpiCard
          title="Unidades de Saúde"
          icon={Hospital01Icon}
          value={formatNumber(saudeResumo.unidadesSaude)}
          borderColor="border-l-emerald-700"
          footer={
            <p className="text-sm text-muted-foreground">
              4 UBS, 1 UPA, 1 Hospital e 22 ESF
            </p>
          }
        />
        <KpiCard
          title="Profissionais de Saúde"
          icon={Stethoscope02Icon}
          value={formatNumber(saudeResumo.profissionaisSaude)}
          borderColor="border-l-emerald-700"
          footer={
            <p className="text-sm text-muted-foreground">
              124 médicos, 186 enfermeiros e outros
            </p>
          }
        />
        <KpiCard
          title="Atendimentos/Mês"
          icon={Activity01Icon}
          value={formatNumber(saudeResumo.atendimentosMes)}
          borderColor="border-l-emerald-700"
          footer={
            <>
              <Progress value={85} className="h-2" />
              <p className="text-sm text-muted-foreground">
                85% da capacidade instalada
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
              Painel Executivo da Saúde
            </CardTitle>
            <CardDescription>
              Situação consolidada dos principais indicadores de saúde pública
              municipal.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Orçamento Executado
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {(
                  (saudeResumo.orcamentoEmpenhado /
                    saudeResumo.orcamentoTotal) *
                  100
                ).toFixed(1)}
                %
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {formatCurrency(saudeResumo.orcamentoEmpenhado)} de{" "}
                {formatCurrency(saudeResumo.orcamentoTotal)}
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Receitas Arrecadadas
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {formatCurrency(saudeResumo.receitaTotal)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                70,6% de transferências SUS
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Taxa de Ocupação Média
              </p>
              <p className="mt-2 text-3xl font-semibold">86,4%</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Capacidade bem utilizada nas unidades
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Mortalidade Infantil
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {indicadoresMortalidade.mortalidadeInfantil}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                por 1.000 NV (meta:{" "}
                {indicadoresMortalidade.mortalidadeInfantilMeta})
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">ICSAP</p>
              <p className="mt-2 text-3xl font-semibold">
                {indicadoresMortalidade.icsap}%
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Internações por condições sensíveis à APS
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Fila de Espera Total
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {formatNumber(regulacaoResumo.encaminhamentosEmAberto)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Consultas + exames aguardando
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
              Pontos que merecem acompanhamento dos gestores de saúde.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alertasSaude.map((alerta) => (
              <Alert key={alerta.titulo}>
                <AlertTitle className="flex flex-wrap items-center gap-2">
                  {alerta.titulo}
                  <Badge variant="secondary">{alerta.badge}</Badge>
                </AlertTitle>
                <AlertDescription>{alerta.descricao}</AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ASPS Compliance - EC 29 / LC 141/2012 */}
      <Card className="border-l-4 border-l-emerald-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={SecurityCheckIcon}
              strokeWidth={2}
              className="size-5"
            />
            Cumprimento do Mínimo Constitucional em Saúde (ASPS)
          </CardTitle>
          <CardDescription>
            EC 29/2000 e LC 141/2012 — Mínimo de 15% da receita de impostos
            aplicados em ações e serviços públicos de saúde.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Receita de Impostos
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {formatCurrency(aspsCompliance.receitaImpostos)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Base de cálculo (impostos + transferências constitucionais)
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Mínimo Exigido (15%)
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {formatCurrency(aspsCompliance.minimoExigido)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Valor mínimo que deve ser aplicado em ASPS
              </p>
            </div>
            <div className="rounded-2xl border bg-emerald-50/50 p-4 dark:bg-emerald-950/20">
              <p className="text-sm text-muted-foreground">Aplicado em Saúde</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-700 dark:text-emerald-400">
                {formatCurrency(aspsCompliance.aplicadoSaude)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {aspsCompliance.percentualAplicado.toFixed(2)}% da receita de
                impostos
              </p>
            </div>
            <div className="rounded-2xl border bg-emerald-50/50 p-4 dark:bg-emerald-950/20">
              <p className="text-sm text-muted-foreground">
                Superávit sobre o Mínimo
              </p>
              <p className="mt-2 text-2xl font-semibold text-emerald-700 dark:text-emerald-400">
                {formatCurrency(aspsCompliance.superavit)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                +{(aspsCompliance.percentualAplicado - 15).toFixed(2)} p.p.
                acima do mínimo
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>
                Aplicação em ASPS:{" "}
                {aspsCompliance.percentualAplicado.toFixed(2)}%
              </span>
              <span className="text-muted-foreground">Mínimo: 15,00%</span>
            </div>
            <div className="relative">
              <Progress
                value={aspsCompliance.percentualAplicado * (100 / 25)}
                className="h-3"
              />
              <div
                className="absolute top-0 left-[60%] h-3 w-0.5 bg-red-500"
                title="Mínimo constitucional (15%)"
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Escala: 0% a 25% da receita de impostos. Linha vermelha = mínimo
              constitucional de 15%.
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="orcamento" className="w-full">
        <TabsList className="flex h-auto w-full flex-wrap gap-2 rounded-2xl p-2">
          <TabsTrigger value="orcamento">Orçamento e Finanças</TabsTrigger>
          <TabsTrigger value="atendimento">Atendimento</TabsTrigger>
          <TabsTrigger value="regulacao">Regulação e Filas</TabsTrigger>
          <TabsTrigger value="vigilancia">
            Vigilância Epidemiológica
          </TabsTrigger>
          <TabsTrigger value="profissionais">Profissionais</TabsTrigger>
          <TabsTrigger value="medicamentos">Medicamentos</TabsTrigger>
          <TabsTrigger value="programas">
            Programas e Previne Brasil
          </TabsTrigger>
        </TabsList>

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
                  Distribuição do orçamento da saúde por categoria de despesa.
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
                      data={despesasSaude}
                      dataKey="valor"
                      nameKey="categoria"
                      innerRadius={70}
                      outerRadius={110}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {despesasSaude.map((item) => (
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

          <div className="grid gap-6 xl:grid-cols-2">
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
                  Origem dos recursos financeiros da secretaria de saúde.
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
                    {receitasSaude.map((item) => (
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
                Contas bancárias da secretaria de saúde por tipo de recurso.
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

        <TabsContent value="atendimento" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {kpisSaude.map((kpi) => (
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
                      value={(kpi.valor / kpi.meta) * 100}
                      className="h-2"
                    />
                  </div>
                }
              />
            ))}
          </div>

          {/* Mortality & ICSAP Indicators */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Mortalidade Infantil"
              icon={HeartCheckIcon}
              value={<>{indicadoresMortalidade.mortalidadeInfantil}/1.000 NV</>}
              borderColor="border-l-emerald-700"
              footer={
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Meta: {indicadoresMortalidade.mortalidadeInfantilMeta}/1.000
                    NV
                  </p>
                  <Badge variant="default">Abaixo da meta</Badge>
                </div>
              }
            />
            <KpiCard
              title="Mortalidade Materna"
              icon={HeartCheckIcon}
              value={
                <>{indicadoresMortalidade.mortalidadeMaterna}/100.000 NV</>
              }
              borderColor="border-l-emerald-700"
              footer={
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Meta: {indicadoresMortalidade.mortalidadeMaternaMeta}
                    /100.000 NV
                  </p>
                  <Badge variant="default">Abaixo da meta</Badge>
                </div>
              }
            />
            <KpiCard
              title="ICSAP (Internações Cond. Sensíveis)"
              icon={Activity01Icon}
              value={<>{indicadoresMortalidade.icsap}%</>}
              borderColor="border-l-emerald-700"
              footer={
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Meta: &lt;{indicadoresMortalidade.icsapMeta}% das
                    internações
                  </p>
                  <Badge variant="default">Adequado</Badge>
                </div>
              }
            />
            <KpiCard
              title="Mortalidade Prematura (DCNT)"
              icon={Activity01Icon}
              value={<>{indicadoresMortalidade.mortalidadePrematura}/100.000</>}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Por doenças crônicas não transmissíveis (30-69 anos)
                </p>
              }
            />
          </div>

          {/* Monthly Visit Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={ChartLineData02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Tendência de Atendimentos por Tipo de Unidade
              </CardTitle>
              <CardDescription>
                Evolução mensal dos atendimentos por UBS, UPA e Hospital.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigAtendimentos}>
                <AreaChart
                  data={atendimentosTendencia}
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) =>
                      `${(Number(value) / 1_000).toFixed(0)}k`
                    }
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatNumber(Number(value))}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="ubs"
                    stackId="1"
                    stroke={greenPalette[3]}
                    fill={greenPalette[3]}
                    fillOpacity={0.4}
                  />
                  <Area
                    type="monotone"
                    dataKey="upa"
                    stackId="1"
                    stroke={greenPalette[1]}
                    fill={greenPalette[1]}
                    fillOpacity={0.4}
                  />
                  <Area
                    type="monotone"
                    dataKey="hospital"
                    stackId="1"
                    stroke={greenPalette[5]}
                    fill={greenPalette[5]}
                    fillOpacity={0.4}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Hospital01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Atendimentos por Unidade
              </CardTitle>
              <CardDescription>
                Produtividade e taxa de ocupação das unidades de saúde.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unidade</TableHead>
                    <TableHead className="text-right">Atendimentos</TableHead>
                    <TableHead className="text-right">Capacidade</TableHead>
                    <TableHead className="text-right">Ocupação</TableHead>
                    <TableHead className="text-right">Profissionais</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {atendimentosPorUnidade.map((item) => (
                    <TableRow key={item.unidade}>
                      <TableCell className="font-medium">
                        {item.unidade}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.atendimentos)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.capacidade)}
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
        </TabsContent>

        {/* NEW TAB: Regulação e Filas */}
        <TabsContent value="regulacao" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Fila de Consultas"
              icon={Clock01Icon}
              value={formatNumber(regulacaoResumo.totalFilaConsultas)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Pacientes aguardando especialidades
                </p>
              }
            />
            <KpiCard
              title="Fila de Exames"
              icon={SearchIcon}
              value={formatNumber(regulacaoResumo.totalFilaExames)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Exames complementares pendentes
                </p>
              }
            />
            <KpiCard
              title="TFD Ativos"
              icon={CoinsSwapIcon}
              value={regulacaoResumo.tfdAtivos.toString()}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Custo mensal: {formatCurrency(regulacaoResumo.tfdCustoMensal)}
                </p>
              }
            />
            <KpiCard
              title="Absenteísmo"
              icon={Alert02Icon}
              value={<>{regulacaoResumo.taxaAbsenteismo}%</>}
              borderColor="border-l-amber-600"
              footer={
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Meta: {regulacaoResumo.metaAbsenteismo}%
                  </p>
                  <Badge variant="secondary">Acima da meta</Badge>
                </div>
              }
            />
          </div>

          {/* Queue Evolution Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={ChartLineData02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Evolução das Filas de Espera
              </CardTitle>
              <CardDescription>
                Acompanhamento mensal do volume de pacientes aguardando
                consultas e exames.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigFilas}>
                <LineChart
                  data={evolucaoFilas}
                  margin={{ left: 12, right: 12 }}
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
                  <Line
                    type="monotone"
                    dataKey="consultas"
                    stroke={greenPalette[3]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="exames"
                    stroke={greenPalette[1]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            {/* Specialty Queues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Stethoscope02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Filas por Especialidade
                </CardTitle>
                <CardDescription>
                  Tempo de espera e volume de pacientes por especialidade
                  médica.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Especialidade</TableHead>
                      <TableHead className="text-right">Aguardando</TableHead>
                      <TableHead className="text-right">Tempo Médio</TableHead>
                      <TableHead className="text-right">Atend./Mês</TableHead>
                      <TableHead>Prioridade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filasEspecialidades.map((item) => (
                      <TableRow key={item.especialidade}>
                        <TableCell className="font-medium">
                          {item.especialidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.aguardando)}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              item.tempoMedio > item.meta
                                ? "font-semibold text-amber-600"
                                : ""
                            }
                          >
                            {item.tempoMedio} dias
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.atendidosMes)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.prioridade === "alta"
                                ? "destructive"
                                : item.prioridade === "media"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {item.prioridade === "alta"
                              ? "Alta"
                              : item.prioridade === "media"
                                ? "Média"
                                : "Baixa"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Exam Queues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={FileValidationIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Filas de Exames
                </CardTitle>
                <CardDescription>
                  Pacientes aguardando exames diagnósticos e de imagem.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Exame</TableHead>
                      <TableHead className="text-right">Aguardando</TableHead>
                      <TableHead className="text-right">Tempo Médio</TableHead>
                      <TableHead className="text-right">Meta</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filasExames.map((item) => (
                      <TableRow key={item.exame}>
                        <TableCell className="font-medium">
                          {item.exame}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.aguardando)}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              item.tempoMedio > item.meta
                                ? "font-semibold text-amber-600"
                                : ""
                            }
                          >
                            {item.tempoMedio} dias
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.meta} dias
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.tempoMedio > item.meta
                                ? "destructive"
                                : "default"
                            }
                          >
                            {item.tempoMedio > item.meta ? "Acima" : "Adequado"}
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

        {/* NEW TAB: Vigilância Epidemiológica */}
        <TabsContent value="vigilancia" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Notificações SINAN"
              icon={Alert02Icon}
              value={formatNumber(
                notificacoesSINAN.reduce((acc, m) => acc + m.notificacoes, 0),
              )}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Total de notificações compulsórias no período
                </p>
              }
            />
            <KpiCard
              title="Casos Confirmados"
              icon={AlertCircleIcon}
              value={formatNumber(
                vigilanciaDoencas.reduce(
                  (acc, d) => acc + d.casosConfirmados,
                  0,
                ),
              )}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Em {vigilanciaDoencas.length} doenças de notificação
                </p>
              }
            />
            <KpiCard
              title="Óbitos por Doenças Notif."
              icon={HeartCheckIcon}
              value={vigilanciaDoencas
                .reduce((acc, d) => acc + d.obitos, 0)
                .toString()}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  No período acumulado
                </p>
              }
            />
            <KpiCard
              title="Cobertura Vacinal Geral"
              icon={FirstAidKitIcon}
              value={
                <>
                  {(
                    coberturaVacinal.reduce((acc, v) => acc + v.cobertura, 0) /
                    coberturaVacinal.length
                  ).toFixed(1)}
                  %
                </>
              }
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Média das vacinas do calendário
                </p>
              }
            />
          </div>

          {/* SINAN Notifications Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Analytics01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Notificações Compulsórias (SINAN)
              </CardTitle>
              <CardDescription>
                Evolução mensal das notificações e casos confirmados no Sistema
                de Informação de Agravos de Notificação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigNotificacoes}>
                <BarChart
                  data={notificacoesSINAN}
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="notificacoes"
                    fill={greenPalette[4]}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="confirmados"
                    fill={greenPalette[1]}
                    radius={[4, 4, 0, 0]}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            {/* Disease Tracking Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Activity01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Painel de Doenças de Notificação
                </CardTitle>
                <CardDescription>
                  Situação epidemiológica das principais doenças de notificação
                  compulsória.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doença</TableHead>
                      <TableHead className="text-right">Confirmados</TableHead>
                      <TableHead className="text-right">Suspeitos</TableHead>
                      <TableHead className="text-right">Óbitos</TableHead>
                      <TableHead className="text-right">Incidência</TableHead>
                      <TableHead>Tendência</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vigilanciaDoencas.map((item) => (
                      <TableRow key={item.doenca}>
                        <TableCell className="font-medium">
                          {item.doenca}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.casosConfirmados)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.casosSuspeitos)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.obitos}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.incidencia.toFixed(1)}/100mil
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.tendencia === "alta"
                                ? "destructive"
                                : item.tendencia === "queda"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {item.tendencia === "alta"
                              ? "Alta"
                              : item.tendencia === "queda"
                                ? "Queda"
                                : "Estável"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Vaccine Coverage Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={FirstAidKitIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Cobertura Vacinal
                </CardTitle>
                <CardDescription>
                  Cobertura vacinal por imunobiológico em relação às metas do
                  PNI.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {coberturaVacinal.map((item) => (
                    <div key={item.vacina} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-medium">{item.vacina}</span>
                          <span className="ml-2 text-muted-foreground">
                            ({item.publicoAlvo})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={
                              item.cobertura >= item.meta
                                ? "text-emerald-600"
                                : "text-amber-600"
                            }
                          >
                            {item.cobertura}%
                          </span>
                          <span className="text-muted-foreground">
                            / {item.meta}%
                          </span>
                        </div>
                      </div>
                      <Progress value={item.cobertura} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vigilância Alerts */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              Alertas Epidemiológicos
            </h3>
            <div className="grid gap-3 lg:grid-cols-2">
              {alertasVigilancia.map((alerta, index) => (
                <Alert
                  key={index}
                  variant={
                    alerta.tipo === "warning" ? "destructive" : "default"
                  }
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
                      {alerta.badge}
                    </Badge>
                  </AlertTitle>
                  <AlertDescription>{alerta.descricao}</AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="profissionais" className="mt-6 space-y-6">
          {/* Workforce Summary KPIs */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Total de Profissionais"
              icon={Stethoscope02Icon}
              value={formatNumber(saudeResumo.profissionaisSaude)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Ativos no quadro da secretaria de saúde
                </p>
              }
            />
            <KpiCard
              title="Vagas Ociosas"
              icon={UserAdd01Icon}
              value={formatNumber(
                quadroProfissionais.reduce((acc, p) => acc + p.vago, 0),
              )}
              borderColor="border-l-amber-600"
              footer={
                <p className="text-sm text-muted-foreground">
                  Vagas previstas não preenchidas
                </p>
              }
            />
            <KpiCard
              title="Taxa de Vacância Média"
              icon={Alert02Icon}
              value={
                <>
                  {(
                    quadroProfissionais.reduce(
                      (acc, p) => acc + p.taxaVacancia,
                      0,
                    ) / quadroProfissionais.length
                  ).toFixed(1)}
                  %
                </>
              }
              borderColor="border-l-amber-600"
              footer={
                <p className="text-sm text-muted-foreground">
                  Percentual médio de vagas não preenchidas
                </p>
              }
            />
            <KpiCard
              title="Rotatividade Média"
              icon={CoinsSwapIcon}
              value={
                <>
                  {(
                    quadroProfissionais.reduce(
                      (acc, p) => acc + p.rotatividade,
                      0,
                    ) / quadroProfissionais.length
                  ).toFixed(1)}
                  %
                </>
              }
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Turnover anual por categoria
                </p>
              }
            />
          </div>

          {/* Vacancy and Workforce Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={UserAdd01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Quadro de Pessoal e Vacância
              </CardTitle>
              <CardDescription>
                Dimensionamento da força de trabalho: vagas previstas, ocupadas,
                taxa de vacância e rotatividade.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Previsto</TableHead>
                    <TableHead className="text-right">Ocupado</TableHead>
                    <TableHead className="text-right">Vago</TableHead>
                    <TableHead className="text-right">Vacância</TableHead>
                    <TableHead className="text-right">Rotatividade</TableHead>
                    <TableHead className="text-right">Razão/Pop.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quadroProfissionais.map((item) => (
                    <TableRow key={item.categoria}>
                      <TableCell className="font-medium">
                        {item.categoria}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.previsto)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.ocupado)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.vago > 10 ? "font-semibold text-amber-600" : ""
                          }
                        >
                          {item.vago}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            item.taxaVacancia > 20
                              ? "destructive"
                              : item.taxaVacancia > 10
                                ? "secondary"
                                : "default"
                          }
                        >
                          {item.taxaVacancia.toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.rotatividade.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs">
                        {item.razao}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Productivity Table (existing, preserved) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Stethoscope02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Produtividade dos Profissionais
              </CardTitle>
              <CardDescription>
                Quantidade de profissionais e média de atendimentos por
                categoria.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead className="text-right">
                      Atendimentos/Mês
                    </TableHead>
                    <TableHead className="text-right">Média/Dia</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produtividadeProfissionais.map((item) => (
                    <TableRow key={item.categoria}>
                      <TableCell className="font-medium">
                        {item.categoria}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.quantidade)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.atendimentos || item.visitas || 0)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.mediaDia.toFixed(1)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Training & Development */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Target01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Capacitação e Educação Permanente
              </CardTitle>
              <CardDescription>
                Programas de capacitação em andamento e taxa de conclusão.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {capacitacoes.map((item) => (
                  <div key={item.nome} className="rounded-2xl border p-4">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-medium">{item.nome}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.profissionais} profissionais inscritos •{" "}
                          {item.cargaHoraria}h de carga horária
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.conclusao >= 90
                            ? "default"
                            : item.conclusao >= 70
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {item.conclusao}% concluído
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <Progress value={item.conclusao} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medicamentos" className="mt-6 space-y-6">
          {/* Medication Consumption Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={ChartLineData02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Evolução Mensal de Dispensações e Custos
              </CardTitle>
              <CardDescription>
                Acompanhamento do volume de dispensações e custo total da
                assistência farmacêutica.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigConsumo}>
                <BarChart
                  data={consumoMedicamentosMensal}
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) =>
                      `${(Number(value) / 1_000).toFixed(0)}k`
                    }
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatNumber(Number(value))}
                      />
                    }
                  />
                  <Bar
                    dataKey="dispensacoes"
                    fill={greenPalette[3]}
                    radius={[4, 4, 0, 0]}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            {/* ABC Curve Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={PercentSquareIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Curva ABC de Medicamentos
                </CardTitle>
                <CardDescription>
                  Classificação por valor de consumo: itens classe A representam
                  maior impacto financeiro.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Classe</TableHead>
                      <TableHead className="text-right">Itens</TableHead>
                      <TableHead className="text-right">% Itens</TableHead>
                      <TableHead className="text-right">% Valor</TableHead>
                      <TableHead className="text-right">Valor Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {curvaABC.map((item) => (
                      <TableRow key={item.classe}>
                        <TableCell>
                          <Badge
                            variant={
                              item.classe === "A"
                                ? "destructive"
                                : item.classe === "B"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            Classe {item.classe}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.itens}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.percentualItens}%
                        </TableCell>
                        <TableCell className="text-right">
                          {item.percentualValor}%
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(item.valor)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 space-y-2">
                  {curvaABC.map((item) => (
                    <div key={item.classe} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>
                          Classe {item.classe} ({item.percentualItens}% dos
                          itens)
                        </span>
                        <span>{item.percentualValor}% do valor</span>
                      </div>
                      <Progress value={item.percentualValor} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Procurement Pipeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={ShoppingCart01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Pipeline de Aquisições
                </CardTitle>
                <CardDescription>
                  Processos de compra de medicamentos e insumos em andamento.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aquisicoesPipeline.map((item) => (
                    <div key={item.item} className="rounded-2xl border p-3">
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-sm font-medium">{item.item}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.modalidade} • Previsão: {item.previsao}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">
                            {formatCurrency(item.valor)}
                          </span>
                          <Badge
                            variant={
                              item.status === "concluido"
                                ? "default"
                                : item.status === "em_andamento"
                                  ? "secondary"
                                  : item.status === "publicado"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {item.status === "concluido"
                              ? "Concluído"
                              : item.status === "em_andamento"
                                ? "Em Andamento"
                                : item.status === "publicado"
                                  ? "Publicado"
                                  : "Em Elaboração"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Existing Medication Stock Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={MedicineBottle02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Estoque de Medicamentos
              </CardTitle>
              <CardDescription>
                Controle de estoque e cobertura dos principais medicamentos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicamento</TableHead>
                    <TableHead className="text-right">Estoque</TableHead>
                    <TableHead className="text-right">
                      Consumo Médio/Mês
                    </TableHead>
                    <TableHead className="text-right">
                      Cobertura (dias)
                    </TableHead>
                    <TableHead>Criticidade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {estoqueMedicamentos.map((item) => (
                    <TableRow key={item.medicamento}>
                      <TableCell className="font-medium">
                        {item.medicamento}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.estoque)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.consumoMedio)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.cobertura} dias
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.criticidade === "critico"
                              ? "destructive"
                              : item.criticidade === "atencao"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {item.criticidade === "critico"
                            ? "Crítico"
                            : item.criticidade === "atencao"
                              ? "Atenção"
                              : "Adequado"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programas" className="mt-6 space-y-6">
          {/* Previne Brasil Summary */}
          <Card className="border-l-4 border-l-emerald-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Target01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Previne Brasil — Financiamento da Atenção Primária
              </CardTitle>
              <CardDescription>
                Programa federal de financiamento da APS baseado em capitação
                ponderada, pagamento por desempenho e incentivos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* PAP Summary */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">
                    Capitação Ponderada
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatCurrency(previneBrasil.pap.capitacao)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Baseado na população cadastrada no e-SUS
                  </p>
                </div>
                <div className="rounded-2xl border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">
                    Pagamento por Desempenho
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatCurrency(previneBrasil.pap.desempenho)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Vinculado ao alcance dos indicadores
                  </p>
                </div>
                <div className="rounded-2xl border bg-emerald-50/50 p-4 dark:bg-emerald-950/20">
                  <p className="text-sm text-muted-foreground">
                    Receita Total PAP
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-emerald-700 dark:text-emerald-400">
                    {formatCurrency(previneBrasil.pap.valor)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Transferência federal para APS
                  </p>
                </div>
              </div>

              {/* Previne Indicators Table */}
              <div>
                <h4 className="mb-3 text-sm font-semibold">
                  Indicadores de Desempenho (7 indicadores vinculantes)
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Indicador</TableHead>
                      <TableHead className="text-right">Resultado</TableHead>
                      <TableHead className="text-right">Meta</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previneBrasil.indicadores.map((item) => (
                      <TableRow key={item.indicador}>
                        <TableCell className="font-medium text-sm">
                          {item.indicador}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.valor.toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-right">
                          {item.meta.toFixed(1)}%
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "atingido"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {item.status === "atingido"
                              ? "Atingido"
                              : "Atenção"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Separator />

              {/* ISF - Índice Sintético Final */}
              <div>
                <h4 className="mb-3 text-sm font-semibold">
                  ISF — Índice Sintético Final
                </h4>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="rounded-2xl border bg-emerald-50/50 p-4 text-center dark:bg-emerald-950/20">
                    <p className="text-sm text-muted-foreground">Nota ISF</p>
                    <p className="mt-2 text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                      {previneBrasil.isf.nota}
                    </p>
                    <Badge variant="default" className="mt-2">
                      {previneBrasil.isf.classificacao}
                    </Badge>
                  </div>
                  {previneBrasil.isf.componentes.map((comp) => (
                    <div
                      key={comp.componente}
                      className="rounded-2xl border bg-muted/40 p-4 text-center"
                    >
                      <p className="text-sm text-muted-foreground">
                        {comp.componente}
                      </p>
                      <p className="mt-2 text-2xl font-semibold">{comp.nota}</p>
                      <Progress value={comp.nota * 10} className="mt-2 h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Existing Programs Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={HeartCheckIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Programas de Saúde
              </CardTitle>
              <CardDescription>
                Cobertura e investimento nos principais programas de saúde
                pública.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {programasSaude.map((item) => (
                  <div key={item.programa} className="rounded-2xl border p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="font-medium">{item.programa}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatNumber(item.beneficiarios)} beneficiários •
                          Investimento: {formatCurrency(item.investimento)}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {item.cobertura.toFixed(1)}% cobertura
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Cobertura populacional</span>
                        <span>{item.cobertura.toFixed(1)}%</span>
                      </div>
                      <Progress value={item.cobertura} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Calculator01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Resumo Analítico da Saúde
            </CardTitle>
            <CardDescription>
              Indicadores consolidados de gestão e qualidade da saúde pública
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Execução Orçamentária
                </p>
                <p className="text-3xl font-bold">
                  {(
                    (saudeResumo.orcamentoEmpenhado /
                      saudeResumo.orcamentoTotal) *
                    100
                  ).toFixed(1)}
                  %
                </p>
                <p className="text-xs text-muted-foreground">
                  Meta: 98% até dez/2024
                </p>
                <Badge variant="outline">Atenção</Badge>
              </div>
              <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Cobertura ESF
                </p>
                <p className="text-3xl font-bold">87,4%</p>
                <p className="text-xs text-muted-foreground">
                  Meta: 85% — superada
                </p>
                <Badge variant="secondary" className="text-emerald-600">
                  Excelente
                </Badge>
              </div>
              <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Resolutividade APS
                </p>
                <p className="text-3xl font-bold">91,2%</p>
                <p className="text-xs text-muted-foreground">
                  Acima da média nacional (85%)
                </p>
                <Badge variant="secondary" className="text-emerald-600">
                  Ótimo
                </Badge>
              </div>
              <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Taxa Ocupação Média
                </p>
                <p className="text-3xl font-bold">86,4%</p>
                <p className="text-xs text-muted-foreground">
                  Capacidade bem utilizada
                </p>
                <Badge variant="outline">Adequado</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <CardTitle>Análise Inteligente da Gestão de Saúde</CardTitle>
                <CardDescription>
                  Insights gerados com base nos dados do exercício corrente
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="leading-relaxed text-foreground">
                A gestão de saúde municipal apresenta{" "}
                <strong>
                  desempenho sólido nos indicadores de atenção básica
                </strong>
                . A cobertura da Estratégia Saúde da Família alcança{" "}
                <strong>87,4%</strong>, superando a meta de 85% e a média
                nacional de 75%. A resolutividade da APS está em{" "}
                <strong>91,2%</strong>, demonstrando eficiência no primeiro
                nível de atenção. O orçamento totaliza{" "}
                <strong>{formatCurrency(saudeResumo.orcamentoTotal)}</strong>,
                com execução de <strong>95%</strong>. Pontos de atenção incluem
                o tempo médio de espera (18 dias, acima da meta de 15), estoque
                crítico de insulina NPH (41 dias de cobertura) e déficit de
                profissionais em saúde mental (48,2% de cobertura).
              </p>
            </div>

            <Separator />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="pontos-fortes">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Flag01Icon}
                      strokeWidth={2}
                      className="size-4 text-emerald-600"
                    />
                    <span>Pontos Fortes da Gestão de Saúde</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-6">
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                        className="mt-0.5 size-4 shrink-0 text-emerald-600"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Cobertura ESF acima da meta:
                        </strong>{" "}
                        Com 87,4% da população coberta, o município supera a
                        meta de 85% e está 12 pontos percentuais acima da média
                        nacional (75%), demonstrando forte presença da atenção
                        básica.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                        className="mt-0.5 size-4 shrink-0 text-emerald-600"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Alta resolutividade na APS:
                        </strong>{" "}
                        91,2% dos casos resolvidos na Atenção Primária reduzem a
                        sobrecarga no hospital e na UPA, otimizando recursos e
                        melhorando a experiência do usuário.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                        className="mt-0.5 size-4 shrink-0 text-emerald-600"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Vacinação infantil próxima da meta:
                        </strong>{" "}
                        94,2% de cobertura no programa Saúde da Criança, apenas
                        0,8 pontos abaixo da meta de 95% e acima da média
                        estadual de 88%.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                        className="mt-0.5 size-4 shrink-0 text-emerald-600"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Boa utilização da capacidade instalada:
                        </strong>{" "}
                        Taxa média de ocupação de 86,4% indica equilíbrio entre
                        demanda e oferta, sem ociosidade nem sobrecarga
                        excessiva.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pontos-atencao">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={AlertCircleIcon}
                      strokeWidth={2}
                      className="size-4 text-amber-600"
                    />
                    <span>Pontos de Atenção</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-6">
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        strokeWidth={2}
                        className="mt-0.5 size-4 shrink-0 text-amber-600"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Estoque crítico de insulina NPH:
                        </strong>{" "}
                        Apenas 41 dias de cobertura, abaixo do mínimo
                        recomendado de 60 dias. Necessário processo emergencial
                        para atender pacientes diabéticos sem ruptura.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        strokeWidth={2}
                        className="mt-0.5 size-4 shrink-0 text-amber-600"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Tempo de espera acima da meta:
                        </strong>{" "}
                        18 dias de tempo médio, 20% acima da meta de 15 dias.
                        Concentrado em cardiologia e ortopedia, demandando
                        ampliação de oferta ou regulação mais eficiente.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        strokeWidth={2}
                        className="mt-0.5 size-4 shrink-0 text-amber-600"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Déficit em saúde mental:
                        </strong>{" "}
                        Cobertura de apenas 48,2% no programa, com necessidade
                        de contratação de 3 psicólogos e 2 psiquiatras para
                        atender a demanda reprimida.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        strokeWidth={2}
                        className="mt-0.5 size-4 shrink-0 text-amber-600"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Pré-natal abaixo da meta:
                        </strong>{" "}
                        78,5% das gestantes com 7+ consultas, abaixo da meta de
                        80%. Intensificar busca ativa e acompanhamento das
                        gestantes de risco.
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
                      className="size-4 text-blue-600"
                    />
                    <span>Recomendações Estratégicas</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-6">
                    <div className="rounded-lg border bg-blue-50/50 p-3 dark:bg-blue-950/20">
                      <p className="mb-1 text-sm font-medium text-foreground">
                        1. Aquisição Emergencial de Insulina
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Iniciar processo de dispensa de licitação para aquisição
                        de insulina NPH, garantindo cobertura mínima de 90 dias
                        e evitando desabastecimento para pacientes diabéticos.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-50/50 p-3 dark:bg-blue-950/20">
                      <p className="mb-1 text-sm font-medium text-foreground">
                        2. Ampliação da Saúde Mental
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Realizar concurso público ou processo seletivo para
                        contratação de 3 psicólogos e 2 psiquiatras, elevando a
                        cobertura do programa de 48,2% para pelo menos 70% até o
                        final do exercício.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-50/50 p-3 dark:bg-blue-950/20">
                      <p className="mb-1 text-sm font-medium text-foreground">
                        3. Redução do Tempo de Espera
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Implementar mutirões em cardiologia e ortopedia,
                        negociar credenciamento de prestadores privados ou
                        ampliar carga horária dos especialistas para reduzir
                        fila de 18 para 15 dias.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-50/50 p-3 dark:bg-blue-950/20">
                      <p className="mb-1 text-sm font-medium text-foreground">
                        4. Intensificação do Pré-natal
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Capacitar agentes comunitários para busca ativa de
                        gestantes, implementar sistema de lembretes via
                        SMS/WhatsApp e oferecer transporte para gestantes de
                        área rural.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-50/50 p-3 dark:bg-blue-950/20">
                      <p className="mb-1 text-sm font-medium text-foreground">
                        5. Execução Orçamentária
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Acelerar empenho dos 5% restantes do orçamento (R$ 2,6
                        milhões) até novembro para evitar devolução de recursos
                        federais vinculados ao SUS e garantir aplicação do
                        mínimo constitucional.
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
                      className="size-4 text-violet-600"
                    />
                    <span>Projeções e Cenários</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-6">
                    <div className="rounded-lg border bg-violet-50/50 p-3 dark:bg-violet-950/20">
                      <p className="mb-1 text-sm font-medium text-foreground">
                        Cenário Base — Manutenção da Trajetória
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Mantida a cobertura ESF atual e a execução orçamentária
                        em ritmo de 92%, projeta-se o cumprimento do mínimo
                        constitucional (15% da receita) ao fim do exercício, com
                        resolutividade da APS estável acima de 90%.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-emerald-50/50 p-3 dark:bg-emerald-950/20">
                      <p className="mb-1 text-sm font-medium text-foreground">
                        Cenário Otimista — Aceleração das Especialidades
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Com mutirões em cardiologia e ortopedia e credenciamento
                        de prestadores, a fila de espera pode recuar de 18 para
                        12 dias e a cobertura de saúde mental ultrapassar 70%,
                        elevando a satisfação do usuário SUS.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-amber-50/50 p-3 dark:bg-amber-950/20">
                      <p className="mb-1 text-sm font-medium text-foreground">
                        Cenário de Risco — Desabastecimento e Subexecução
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Persistindo o risco de desabastecimento de insulina e a
                        subexecução dos 5% restantes do orçamento, há exposição
                        à devolução de recursos federais vinculados e à
                        descontinuidade de tratamentos crônicos.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator />

            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex gap-3">
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  strokeWidth={2}
                  className="mt-0.5 size-5 shrink-0 text-primary"
                />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Conclusão Analítica
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    A gestão de saúde municipal demonstra{" "}
                    <strong>excelência na atenção básica</strong>, com cobertura
                    ESF e resolutividade da APS acima das médias nacional e
                    estadual. Os principais desafios concentram-se na{" "}
                    <strong>
                      redução do tempo de espera para especialidades
                    </strong>{" "}
                    (cardiologia e ortopedia),{" "}
                    <strong>ampliação da saúde mental</strong> (déficit de 52%
                    na cobertura) e{" "}
                    <strong>gestão de estoque de medicamentos críticos</strong>{" "}
                    (insulina NPH). A adoção das recomendações propostas —
                    especialmente a aquisição emergencial de insulina,
                    contratação de profissionais de saúde mental e mutirões de
                    especialidades — pode elevar ainda mais a qualidade do
                    atendimento e garantir o cumprimento das metas
                    constitucionais e pactuadas.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            Alertas e Notificações
          </h3>
          <div className="grid gap-3 lg:grid-cols-2">
            {alertasAnalise.map((alerta, index) => (
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
                    {alerta.badge}
                  </Badge>
                </AlertTitle>
                <AlertDescription>{alerta.descricao}</AlertDescription>
              </Alert>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
