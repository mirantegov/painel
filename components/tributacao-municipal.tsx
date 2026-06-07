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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
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
  Store04Icon,
  Invoice02Icon,
  Search01Icon,
  UserMultipleIcon,
  Cancel01Icon,
  FileValidationIcon,
  SecurityCheckIcon,
  Calculator01Icon,
  CourtLawIcon,
  FileAttachmentIcon,
  DocumentValidationIcon,
  Analytics01Icon,
  Activity01Icon,
} from "@hugeicons/core-free-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { KpiCard } from "@/components/ui/kpi-card";

// ==========================================
// FORMATADORES
// ==========================================

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

const formatMillions = (value: number) => {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)}K`;
  }
  return formatCurrency(value);
};

const calcPercent = (value: number, total: number) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(1);
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("pt-BR").format(value);
};

// ==========================================
// DADOS - TRIBUTOS MUNICIPAIS
// ==========================================

// IPTU - Imposto Predial e Territorial Urbano
const dadosIPTU = {
  lancado: 22800000,
  arrecadado: 16800000,
  desconto: 2100000,
  isencoes: 1450000,
  inadimplente: 2450000,
  dividaAtiva: 8900000,
  imoveisTotal: 42580,
  imoveisTributados: 38200,
  imoveisIsentos: 4380,
  aliquotaResidencial: 0.8,
  aliquotaComercial: 1.5,
  aliquotaTerritorial: 3.0,
  parcelasEmitidas: 152800,
  parcelasPagas: 128400,
};

// ISS - Imposto Sobre Serviços
const dadosISS = {
  lancado: 28500000,
  arrecadado: 26500000,
  retidoFonte: 8200000,
  declarado: 18300000,
  fiscalizado: 3800000,
  autoLancamento: 22100000,
  notasFiscaisEmitidas: 285400,
  empresasCadastradas: 4850,
  empresasAtivas: 3920,
  meiCadastrados: 2180,
  aliquotaMedia: 3.5,
};

// ITBI - Imposto sobre Transmissão de Bens Imóveis
const dadosITBI = {
  lancado: 9200000,
  arrecadado: 7200000,
  transacoesAvaliadas: 1840,
  transacoesConcluidas: 1520,
  valorVenalMedio: 285000,
  aliquota: 2.0,
};

// Taxas e Contribuições
const dadosTaxas = {
  taxaLixo: { lancado: 4200000, arrecadado: 3650000 },
  taxaAlvara: { lancado: 1800000, arrecadado: 1580000 },
  taxaVigilancia: { lancado: 980000, arrecadado: 820000 },
  taxaPublicidade: { lancado: 450000, arrecadado: 380000 },
  cosip: { lancado: 4100000, arrecadado: 3850000 },
  contribMelhoria: { lancado: 1400000, arrecadado: 890000 },
};

// Dívida Ativa
const dividaAtiva = {
  estoqueTotal: 48500000,
  iptu: 28200000,
  iss: 12500000,
  itbi: 2800000,
  taxas: 5000000,
  inscricoesAno: 3200000,
  recuperadoAno: 4800000,
  ajuizadas: 18500000,
  protestadas: 8200000,
  parcelamentos: 6800000,
  parcelamentosAtivos: 2450,
  parcelamentosInadimplentes: 380,
  prescricaoRisco: 5200000,
};

// Cadastro Imobiliário
const cadastroImobiliario = [
  {
    tipo: "Residencial",
    quantidade: 28400,
    percentual: 66.7,
    valorVenal: 4200000000,
  },
  {
    tipo: "Comercial",
    quantidade: 6800,
    percentual: 16.0,
    valorVenal: 2100000000,
  },
  {
    tipo: "Industrial",
    quantidade: 1200,
    percentual: 2.8,
    valorVenal: 980000000,
  },
  {
    tipo: "Terrenos",
    quantidade: 4580,
    percentual: 10.8,
    valorVenal: 650000000,
  },
  { tipo: "Outros", quantidade: 1600, percentual: 3.7, valorVenal: 280000000 },
];

// Cadastro Econômico (ISS)
const cadastroEconomico = [
  {
    setor: "Serviços Profissionais",
    empresas: 1280,
    arrecadacao: 8500000,
    percentual: 32.1,
  },
  {
    setor: "Construção Civil",
    empresas: 420,
    arrecadacao: 5200000,
    percentual: 19.6,
  },
  { setor: "Saúde", empresas: 380, arrecadacao: 3800000, percentual: 14.3 },
  { setor: "Educação", empresas: 210, arrecadacao: 2400000, percentual: 9.1 },
  {
    setor: "Tecnologia",
    empresas: 350,
    arrecadacao: 2800000,
    percentual: 10.6,
  },
  { setor: "Transporte", empresas: 180, arrecadacao: 1600000, percentual: 6.0 },
  {
    setor: "Outros Serviços",
    empresas: 1100,
    arrecadacao: 2200000,
    percentual: 8.3,
  },
];

// Evolução Mensal da Arrecadação Tributária
const evolucaoMensalTributos = [
  { mes: "Jan", iptu: 4200000, iss: 2050000, itbi: 580000, taxas: 420000 },
  { mes: "Fev", iptu: 3800000, iss: 2180000, itbi: 620000, taxas: 380000 },
  { mes: "Mar", iptu: 2100000, iss: 2350000, itbi: 710000, taxas: 450000 },
  { mes: "Abr", iptu: 1200000, iss: 2280000, itbi: 650000, taxas: 410000 },
  { mes: "Mai", iptu: 950000, iss: 2420000, itbi: 580000, taxas: 520000 },
  { mes: "Jun", iptu: 780000, iss: 2150000, itbi: 620000, taxas: 480000 },
  { mes: "Jul", iptu: 650000, iss: 2380000, itbi: 540000, taxas: 390000 },
  { mes: "Ago", iptu: 580000, iss: 2520000, itbi: 680000, taxas: 450000 },
  { mes: "Set", iptu: 520000, iss: 2180000, itbi: 590000, taxas: 410000 },
  { mes: "Out", iptu: 480000, iss: 2350000, itbi: 620000, taxas: 520000 },
  { mes: "Nov", iptu: 540000, iss: 2640000, itbi: 710000, taxas: 450000 },
];

// Comparativo Anual
const comparativoAnual = [
  {
    ano: "2022",
    iptu: 14200000,
    iss: 22800000,
    itbi: 6200000,
    taxas: 10500000,
    total: 53700000,
  },
  {
    ano: "2023",
    iptu: 15600000,
    iss: 24500000,
    itbi: 6800000,
    taxas: 11200000,
    total: 58100000,
  },
  {
    ano: "2024",
    iptu: 16800000,
    iss: 26500000,
    itbi: 7200000,
    taxas: 12050000,
    total: 62550000,
  },
];

// Fiscalização Tributária
const fiscalizacao = {
  autosInfracao: 245,
  valorAutuado: 3800000,
  valorRecuperado: 2100000,
  empresasFiscalizadas: 520,
  diligenciasRealizadas: 1280,
  denunciasRecebidas: 85,
  denunciasApuradas: 62,
  operacoesEspeciais: 8,
  issRetidoRecuperado: 1500000,
  notificacoesPrevias: 380,
};

// Certidões e Atendimento
const certidoes = {
  negativas: 12800,
  positivas: 3200,
  positivasEfeitoNegativa: 1850,
  tempoMedioEmissao: 2.5,
  atendimentosPresenciais: 18500,
  atendimentosDigitais: 42800,
  percentualDigital: 69.8,
  reclamacoesRecebidas: 320,
  reclamacoesResolvidas: 285,
};

// Renúncia Fiscal
const renunciaFiscal = {
  total: 8500000,
  isencoesIPTU: 3200000,
  isencoesISS: 1800000,
  incentivosEmpresariais: 2500000,
  imunidades: 1000000,
  beneficiariosIPTU: 4380,
  beneficiariosISS: 280,
  empresasIncentivadas: 45,
};

// Maiores Contribuintes
const maioresContribuintes = [
  {
    nome: "Hospital Regional São José",
    tributo: "ISS",
    valor: 1850000,
    situacao: "Regular" as const,
  },
  {
    nome: "Construtora Alpha Ltda",
    tributo: "ISS/ITBI",
    valor: 1420000,
    situacao: "Regular" as const,
  },
  {
    nome: "Shopping Center Municipal",
    tributo: "IPTU/ISS",
    valor: 1280000,
    situacao: "Regular" as const,
  },
  {
    nome: "Universidade Paranaense",
    tributo: "ISS",
    valor: 980000,
    situacao: "Regular" as const,
  },
  {
    nome: "Supermercado Bom Preço S/A",
    tributo: "ISS/IPTU",
    valor: 850000,
    situacao: "Parcelado" as const,
  },
  {
    nome: "Metalúrgica Progresso",
    tributo: "IPTU/ISS",
    valor: 720000,
    situacao: "Regular" as const,
  },
  {
    nome: "Colégio São Francisco",
    tributo: "ISS",
    valor: 680000,
    situacao: "Imune" as const,
  },
  {
    nome: "Clínica Saúde Total",
    tributo: "ISS",
    valor: 620000,
    situacao: "Regular" as const,
  },
  {
    nome: "TechSoft Sistemas",
    tributo: "ISS",
    valor: 580000,
    situacao: "Regular" as const,
  },
  {
    nome: "Transportadora Sul Ltda",
    tributo: "ISS/IPTU",
    valor: 520000,
    situacao: "Inadimplente" as const,
  },
];

// Comparativo Mensal 2024 vs 2023
const comparativoMensal2024vs2023 = [
  { mes: "Jan", atual: 7250000, anterior: 6420000 },
  { mes: "Fev", atual: 6980000, anterior: 6180000 },
  { mes: "Mar", atual: 5610000, anterior: 5320000 },
  { mes: "Abr", atual: 4540000, anterior: 4280000 },
  { mes: "Mai", atual: 4470000, anterior: 4120000 },
  { mes: "Jun", atual: 4030000, anterior: 3750000 },
  { mes: "Jul", atual: 3960000, anterior: 3680000 },
  { mes: "Ago", atual: 4230000, anterior: 3920000 },
  { mes: "Set", atual: 3700000, anterior: 3480000 },
  { mes: "Out", atual: 3970000, anterior: 3650000 },
  { mes: "Nov", atual: 4340000, anterior: 3980000 },
];

// Comparativo por Tributo — 2024 vs 2023
const comparativoTributo2024vs2023 = [
  { tributo: "IPTU", atual: 16800000, anterior: 15600000 },
  { tributo: "ISS", atual: 26500000, anterior: 24500000 },
  { tributo: "ITBI", atual: 7200000, anterior: 6800000 },
  { tributo: "Taxas", atual: 12050000, anterior: 11200000 },
];

// Maiores Devedores (Dívida Ativa + Exercício)
const maioresDevedores = [
  {
    nome: "Auto Peças Nacional Ltda",
    tributo: "ISS/IPTU",
    valorDevido: 2850000,
    origem: "Dívida Ativa",
    situacao: "Ajuizada" as const,
    tempoInadimplencia: "4 anos",
  },
  {
    nome: "Construtora Beta Engenharia",
    tributo: "ISS/ITBI",
    valorDevido: 2200000,
    origem: "Dívida Ativa",
    situacao: "Protestada" as const,
    tempoInadimplencia: "3 anos",
  },
  {
    nome: "Frigorífico Santa Clara S/A",
    tributo: "ISS/IPTU",
    valorDevido: 1680000,
    origem: "Dívida Ativa",
    situacao: "Ajuizada" as const,
    tempoInadimplencia: "5 anos",
  },
  {
    nome: "Rede de Postos Combustível XYZ",
    tributo: "ISS/IPTU",
    valorDevido: 1450000,
    origem: "Dívida Ativa",
    situacao: "Parcelada" as const,
    tempoInadimplencia: "2 anos",
  },
  {
    nome: "Hotel Fazenda Bela Vista",
    tributo: "IPTU/ISS",
    valorDevido: 1120000,
    origem: "Dívida Ativa",
    situacao: "Protestada" as const,
    tempoInadimplencia: "3 anos",
  },
  {
    nome: "Madeireira Sul Ltda",
    tributo: "ISS",
    valorDevido: 980000,
    origem: "Dívida Ativa",
    situacao: "Inscrita" as const,
    tempoInadimplencia: "2 anos",
  },
  {
    nome: "Transportes Rodoviários PR",
    tributo: "ISS/IPTU",
    valorDevido: 850000,
    origem: "Exercício",
    situacao: "Notificada" as const,
    tempoInadimplencia: "1 ano",
  },
  {
    nome: "Shopping Popular Center",
    tributo: "IPTU",
    valorDevido: 720000,
    origem: "Dívida Ativa",
    situacao: "Parcelada" as const,
    tempoInadimplencia: "4 anos",
  },
  {
    nome: "Cerâmica Progresso Indústria",
    tributo: "IPTU/ISS",
    valorDevido: 650000,
    origem: "Exercício",
    situacao: "Notificada" as const,
    tempoInadimplencia: "1 ano",
  },
  {
    nome: "Clínica Odonto Premium",
    tributo: "ISS",
    valorDevido: 480000,
    origem: "Dívida Ativa",
    situacao: "Inscrita" as const,
    tempoInadimplencia: "2 anos",
  },
];

// Chart Configs
const chartConfigComparativoMensal = {
  atual: { label: "2024", color: "var(--chart-1)" },
  anterior: { label: "2023", color: "var(--chart-2)" },
} satisfies ChartConfig;

const chartConfigTributos = {
  atual: { label: "2024", color: "var(--chart-1)" },
  anterior: { label: "2023", color: "var(--chart-3)" },
} satisfies ChartConfig;

const chartConfigEvolucao = {
  iptu: { label: "IPTU", color: "var(--chart-1)" },
  iss: { label: "ISS", color: "var(--chart-2)" },
  itbi: { label: "ITBI", color: "var(--chart-3)" },
  taxas: { label: "Taxas", color: "var(--chart-4)" },
} satisfies ChartConfig;

const chartConfigDividaAtivaPie = {
  iptu: { label: "IPTU", color: "var(--chart-1)" },
  iss: { label: "ISS", color: "var(--chart-2)" },
  itbi: { label: "ITBI", color: "var(--chart-3)" },
  taxas: { label: "Taxas", color: "var(--chart-4)" },
} satisfies ChartConfig;

// Metas de Arrecadação
const metasArrecadacao = [
  { tributo: "IPTU", meta: 22800000, realizado: 16800000, percentual: 73.7 },
  { tributo: "ISS", meta: 28500000, realizado: 26500000, percentual: 93.0 },
  { tributo: "ITBI", meta: 9200000, realizado: 7200000, percentual: 78.3 },
  {
    tributo: "Taxas e Contribuições",
    meta: 12930000,
    realizado: 11170000,
    percentual: 86.4,
  },
  {
    tributo: "Dívida Ativa (Recuperação)",
    meta: 6000000,
    realizado: 4800000,
    percentual: 80.0,
  },
];

// ==========================================
// NOVOS DADOS — NFS-e e Nota Fiscal
// ==========================================

const dadosNFSe = {
  totalEmitidas: 285400,
  totalCanceladas: 3420,
  totalSubstituidas: 1850,
  valorTotalServicos: 756000000,
  issGerado: 26460000,
  mediaNotasDia: 870,
  empresasEmissoras: 3280,
  empresasSemEmissao30dias: 640,
  evolucaoMensal: [
    { mes: "Jan", notas: 24200, valor: 64000000, iss: 2240000 },
    { mes: "Fev", notas: 22800, valor: 60500000, iss: 2118000 },
    { mes: "Mar", notas: 26500, valor: 71200000, iss: 2492000 },
    { mes: "Abr", notas: 25100, valor: 67800000, iss: 2373000 },
    { mes: "Mai", notas: 27300, valor: 73500000, iss: 2573000 },
    { mes: "Jun", notas: 24800, valor: 65200000, iss: 2282000 },
    { mes: "Jul", notas: 26900, valor: 72100000, iss: 2524000 },
    { mes: "Ago", notas: 28100, valor: 74800000, iss: 2618000 },
    { mes: "Set", notas: 25600, valor: 68200000, iss: 2387000 },
    { mes: "Out", notas: 27400, valor: 73800000, iss: 2583000 },
    { mes: "Nov", notas: 26700, valor: 64900000, iss: 2270000 },
  ],
  rankingCNAE: [
    {
      cnae: "6201-5/01",
      descricao: "Desenvolvimento de software",
      notas: 42500,
      valor: 128000000,
      iss: 4480000,
      percentual: 16.9,
    },
    {
      cnae: "4120-4/00",
      descricao: "Construção de edifícios",
      notas: 18200,
      valor: 98000000,
      iss: 3430000,
      percentual: 13.0,
    },
    {
      cnae: "8610-1/01",
      descricao: "Atividades de atendimento hospitalar",
      notas: 15800,
      valor: 85000000,
      iss: 2975000,
      percentual: 11.2,
    },
    {
      cnae: "6911-7/01",
      descricao: "Serviços advocatícios",
      notas: 28400,
      valor: 62000000,
      iss: 2170000,
      percentual: 8.2,
    },
    {
      cnae: "8630-5/03",
      descricao: "Atividade médica ambulatorial",
      notas: 22100,
      valor: 58000000,
      iss: 2030000,
      percentual: 7.7,
    },
    {
      cnae: "7020-4/00",
      descricao: "Consultoria em gestão empresarial",
      notas: 19800,
      valor: 52000000,
      iss: 1820000,
      percentual: 6.9,
    },
    {
      cnae: "4930-2/02",
      descricao: "Transporte rodoviário de carga",
      notas: 12400,
      valor: 45000000,
      iss: 1575000,
      percentual: 6.0,
    },
    {
      cnae: "6190-6/99",
      descricao: "Outras ativ. telecomunicações",
      notas: 8200,
      valor: 38000000,
      iss: 1330000,
      percentual: 5.0,
    },
  ],
  alertasNFSe: [
    {
      tipo: "critico" as const,
      descricao:
        "640 empresas ativas não emitiram NFS-e nos últimos 30 dias — possível omissão de receita",
    },
    {
      tipo: "alerta" as const,
      descricao:
        "3.420 notas canceladas no exercício (1,2% do total) — avaliar padrões de cancelamento",
    },
    {
      tipo: "info" as const,
      descricao:
        "Setor de Tecnologia apresentou crescimento de 18,5% no volume de NFS-e em relação ao exercício anterior",
    },
  ],
};

// ==========================================
// NOVOS DADOS — Transferências Constitucionais
// ==========================================

const transferenciasConstitucionais = {
  fpm: {
    previsto: 42000000,
    recebido: 38500000,
    percentual: 91.7,
    evolucaoMensal: [
      { mes: "Jan", valor: 3200000 },
      { mes: "Fev", valor: 3100000 },
      { mes: "Mar", valor: 3800000 },
      { mes: "Abr", valor: 3400000 },
      { mes: "Mai", valor: 3600000 },
      { mes: "Jun", valor: 3200000 },
      { mes: "Jul", valor: 3500000 },
      { mes: "Ago", valor: 3800000 },
      { mes: "Set", valor: 3400000 },
      { mes: "Out", valor: 3700000 },
      { mes: "Nov", valor: 3300000 },
    ],
  },
  icms: {
    previsto: 28000000,
    recebido: 25200000,
    percentual: 90.0,
    indicePM: 0.4285,
    rankingEstadual: 42,
    totalMunicipios: 399,
  },
  ipva: {
    previsto: 12000000,
    recebido: 10800000,
    percentual: 90.0,
    veiculosMunicipio: 48500,
  },
  fundeb: {
    recebido: 18500000,
    complementacaoUniao: 4200000,
    alunosRede: 12800,
    valorAlunoAno: 1445.31,
  },
  itr: {
    previsto: 850000,
    recebido: 720000,
    percentual: 84.7,
    conveniado: true,
    percentualRetencao: 100,
  },
  totalPrevisto: 82850000,
  totalRecebido: 75220000,
  comparativoAnual: [
    {
      ano: "2022",
      fpm: 35800000,
      icms: 22400000,
      ipva: 9800000,
      fundeb: 15200000,
      itr: 620000,
      total: 83820000,
    },
    {
      ano: "2023",
      fpm: 38200000,
      icms: 23800000,
      ipva: 10200000,
      fundeb: 16800000,
      itr: 680000,
      total: 89680000,
    },
    {
      ano: "2024",
      fpm: 38500000,
      icms: 25200000,
      ipva: 10800000,
      fundeb: 18500000,
      itr: 720000,
      total: 93720000,
    },
  ],
};

// ==========================================
// NOVOS DADOS — Processos Administrativos Fiscais (PAF)
// ==========================================

const processosAdmFiscais = {
  totalProcessos: 845,
  emTramitacao: 320,
  julgados: 425,
  arquivados: 100,
  valorDiscutido: 12800000,
  valorJulgadoProcedente: 8200000,
  valorJulgadoImprocedente: 3100000,
  valorPendente: 5600000,
  tempoMedioJulgamento: 145,
  impugnacoes: {
    recebidas: 285,
    deferidas: 68,
    indeferidas: 142,
    parcialmenteDeferidas: 45,
    pendentes: 30,
  },
  recursos: {
    interpostos: 180,
    providos: 32,
    improvidos: 98,
    parcialmenteProvidos: 25,
    pendentes: 25,
  },
  porTributo: [
    { tributo: "IPTU", processos: 280, valor: 4200000, percentual: 33.1 },
    { tributo: "ISS", processos: 320, valor: 5800000, percentual: 37.9 },
    { tributo: "ITBI", processos: 85, valor: 1200000, percentual: 10.1 },
    { tributo: "Taxas", processos: 120, valor: 980000, percentual: 14.2 },
    { tributo: "Dívida Ativa", processos: 40, valor: 620000, percentual: 4.7 },
  ],
  prazosVencendo: [
    {
      processo: "PAF 2024/0342",
      contribuinte: "Construtora Beta Engenharia",
      tributo: "ISS",
      valor: 380000,
      prazo: "15/01/2025",
      tipo: "Impugnação",
    },
    {
      processo: "PAF 2024/0285",
      contribuinte: "Rede de Postos XYZ",
      tributo: "IPTU/ISS",
      valor: 520000,
      prazo: "22/01/2025",
      tipo: "Recurso",
    },
    {
      processo: "PAF 2024/0198",
      contribuinte: "Hotel Fazenda Bela Vista",
      tributo: "IPTU",
      valor: 280000,
      prazo: "05/02/2025",
      tipo: "Impugnação",
    },
    {
      processo: "PAF 2024/0421",
      contribuinte: "Cerâmica Progresso Ind.",
      tributo: "ISS",
      valor: 195000,
      prazo: "12/02/2025",
      tipo: "Recurso",
    },
    {
      processo: "PAF 2024/0389",
      contribuinte: "TechSoft Sistemas",
      tributo: "ISS",
      valor: 145000,
      prazo: "28/02/2025",
      tipo: "Impugnação",
    },
  ],
};

// ==========================================
// NOVOS DADOS — Indicadores de Esforço Fiscal
// ==========================================

const esforcoFiscal = {
  populacao: 125000,
  receitaTributariaPerCapita: 0, // calculado dinamicamente
  iptuPerCapita: 0,
  issPerCapita: 0,
  dividaAtivaPerCapita: 0,
  pibMunicipal: 3200000000,
  cargaTributariaLocal: 0, // calculado
  comparativoRegional: [
    {
      municipio: "Município Atual",
      populacao: 125000,
      recTribPerCapita: 0,
      iptuPerCapita: 0,
      issPerCapita: 0,
      indiceEsforco: 0,
    },
    {
      municipio: "Município A (similar)",
      populacao: 118000,
      recTribPerCapita: 520.0,
      iptuPerCapita: 145.0,
      issPerCapita: 195.0,
      indiceEsforco: 82.5,
    },
    {
      municipio: "Município B (similar)",
      populacao: 132000,
      recTribPerCapita: 480.0,
      iptuPerCapita: 125.0,
      issPerCapita: 210.0,
      indiceEsforco: 78.2,
    },
    {
      municipio: "Município C (similar)",
      populacao: 110000,
      recTribPerCapita: 560.0,
      iptuPerCapita: 160.0,
      issPerCapita: 220.0,
      indiceEsforco: 88.4,
    },
    {
      municipio: "Média Estadual",
      populacao: 0,
      recTribPerCapita: 495.0,
      iptuPerCapita: 138.0,
      issPerCapita: 198.0,
      indiceEsforco: 80.0,
    },
  ],
};

// ==========================================
// NOVOS DADOS — Planta Genérica de Valores (PGV)
// ==========================================

const plantaGenericaValores = {
  ultimaAtualizacao: "2019",
  anoAtual: "2024",
  anosDefasagem: 5,
  valorVenalTotal: 8210000000,
  valorMercadoEstimado: 12800000000,
  defasagemPercentual: 35.9,
  potencialIPTUAdicional: 3800000,
  zonasFiscais: [
    {
      zona: "Zona Central",
      imoveis: 8200,
      valorVenalMedio: 320000,
      valorMercadoMedio: 520000,
      defasagem: 38.5,
    },
    {
      zona: "Zona Comercial Norte",
      imoveis: 4500,
      valorVenalMedio: 280000,
      valorMercadoMedio: 430000,
      defasagem: 34.9,
    },
    {
      zona: "Zona Residencial Leste",
      imoveis: 12800,
      valorVenalMedio: 180000,
      valorMercadoMedio: 285000,
      defasagem: 36.8,
    },
    {
      zona: "Zona Residencial Sul",
      imoveis: 9200,
      valorVenalMedio: 220000,
      valorMercadoMedio: 340000,
      defasagem: 35.3,
    },
    {
      zona: "Zona Industrial",
      imoveis: 1200,
      valorVenalMedio: 450000,
      valorMercadoMedio: 680000,
      defasagem: 33.8,
    },
    {
      zona: "Zona Periférica Oeste",
      imoveis: 6680,
      valorVenalMedio: 95000,
      valorMercadoMedio: 145000,
      defasagem: 34.5,
    },
  ],
};

// ==========================================
// NOVOS DADOS — Envelhecimento da Dívida Ativa
// ==========================================

const envelhecimentoDivida = [
  {
    faixa: "Até 1 ano",
    valor: 4200000,
    percentual: 8.7,
    processos: 1850,
    cor: "var(--chart-1)",
  },
  {
    faixa: "1 a 2 anos",
    valor: 7800000,
    percentual: 16.1,
    processos: 3200,
    cor: "var(--chart-2)",
  },
  {
    faixa: "2 a 3 anos",
    valor: 10200000,
    percentual: 21.0,
    processos: 4100,
    cor: "var(--chart-3)",
  },
  {
    faixa: "3 a 4 anos",
    valor: 12500000,
    percentual: 25.8,
    processos: 4800,
    cor: "var(--chart-4)",
  },
  {
    faixa: "4 a 5 anos (prescrição)",
    valor: 8600000,
    percentual: 17.7,
    processos: 3200,
    cor: "var(--chart-5)",
  },
  {
    faixa: "Acima de 5 anos",
    valor: 5200000,
    percentual: 10.7,
    processos: 1850,
    cor: "hsl(0, 70%, 50%)",
  },
];

// Chart configs para novos gráficos
const chartConfigNFSe = {
  notas: { label: "Notas Emitidas", color: "var(--chart-1)" },
  iss: { label: "ISS Gerado", color: "var(--chart-2)" },
} satisfies ChartConfig;

const chartConfigTransferencias = {
  fpm: { label: "FPM", color: "var(--chart-1)" },
  icms: { label: "ICMS", color: "var(--chart-2)" },
  ipva: { label: "IPVA", color: "var(--chart-3)" },
  fundeb: { label: "FUNDEB", color: "var(--chart-4)" },
  itr: { label: "ITR", color: "var(--chart-5)" },
} satisfies ChartConfig;

const chartConfigEnvelhecimento = {
  valor: { label: "Valor", color: "var(--chart-1)" },
} satisfies ChartConfig;

// Alertas Tributários
const alertasTributarios = [
  {
    tipo: "critico" as const,
    titulo: "Inadimplência IPTU Acima da Meta",
    descricao:
      "A taxa de inadimplência do IPTU está em 10.7%, acima da meta de 8%. São R$ 2,45M em valores não pagos no exercício corrente. Considerar intensificar cobrança administrativa.",
    setor: "IPTU",
  },
  {
    tipo: "critico" as const,
    titulo: "Risco de Prescrição — Dívida Ativa",
    descricao:
      "Aproximadamente R$ 5,2M em créditos inscritos em dívida ativa estão com risco de prescrição nos próximos 12 meses. Necessário priorizar ajuizamento ou protesto.",
    setor: "Dívida Ativa",
  },
  {
    tipo: "alerta" as const,
    titulo: "Contribuição de Melhoria com Baixa Arrecadação",
    descricao:
      "A Contribuição de Melhoria atingiu apenas 63,6% da meta lançada (R$ 890K de R$ 1,4M). Revisar a política de cobrança e avaliar se os lançamentos estão adequados.",
    setor: "Taxas",
  },
  {
    tipo: "alerta" as const,
    titulo: "Parcelamentos Inadimplentes",
    descricao:
      "380 parcelamentos de dívida ativa estão inadimplentes (15,5% do total). Avaliar cancelamento dos benefícios e retomada da cobrança integral conforme legislação.",
    setor: "Dívida Ativa",
  },
  {
    tipo: "info" as const,
    titulo: "ISS Superando Projeção",
    descricao:
      "A arrecadação de ISS já atingiu 93% da meta anual até novembro, projetando superávit de aproximadamente R$ 2,3M até dezembro. Destaque para o setor de Serviços Profissionais.",
    setor: "ISS",
  },
  {
    tipo: "info" as const,
    titulo: "Digitalização do Atendimento em Progresso",
    descricao:
      "69,8% dos atendimentos ao contribuinte já são realizados por canais digitais. Meta de 75% até o final do exercício requer ampliação dos serviços online.",
    setor: "Atendimento",
  },
  {
    tipo: "critico" as const,
    titulo: "PGV Desatualizada — 5 Anos de Defasagem",
    descricao:
      "A Planta Genérica de Valores não é atualizada desde 2019. A defasagem estimada de 35,9% representa potencial adicional de R$ 3,8M/ano em IPTU. Recomenda-se iniciar processo legislativo para atualização.",
    setor: "Cadastro",
  },
  {
    tipo: "alerta" as const,
    titulo: "Queda no Índice de Participação do ICMS",
    descricao:
      "O IPM (Índice de Participação dos Municípios) caiu de 0,4412 para 0,4285 no último exercício. Revisar componentes do índice (valor adicionado fiscal, população, área) para estratégia de recuperação.",
    setor: "Transferências",
  },
  {
    tipo: "alerta" as const,
    titulo: "640 Empresas Sem Emissão de NFS-e",
    descricao:
      "640 empresas ativas no cadastro econômico não emitiram NFS-e nos últimos 30 dias. Pode indicar omissão de receita ou encerramento não comunicado. Recomenda-se cruzamento de dados e notificação.",
    setor: "NFS-e",
  },
  {
    tipo: "info" as const,
    titulo: "Oportunidade REFIS — Recuperação de Dívida Ativa",
    descricao:
      "Considerando o estoque de R$ 48,5M em dívida ativa e o volume de créditos em risco de prescrição, avaliar a viabilidade de programa de recuperação fiscal (REFIS) com descontos escalonados em juros e multa.",
    setor: "Dívida Ativa",
  },
  {
    tipo: "info" as const,
    titulo: "30 Processos Administrativos com Prazo Vencendo",
    descricao:
      "Existem processos administrativos fiscais com prazos de impugnação e recurso vencendo nos próximos 60 dias. O valor total envolvido é de R$ 1,52M. Necessário acompanhamento da JARF/TARF.",
    setor: "PAF",
  },
];

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export function TributacaoMunicipal() {
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024");
  const [filtroTributo, setFiltroTributo] = React.useState("todos");

  // Totais calculados
  const totalLancado =
    dadosIPTU.lancado +
    dadosISS.lancado +
    dadosITBI.lancado +
    Object.values(dadosTaxas).reduce((acc, t) => acc + t.lancado, 0);
  const totalArrecadado =
    dadosIPTU.arrecadado +
    dadosISS.arrecadado +
    dadosITBI.arrecadado +
    Object.values(dadosTaxas).reduce((acc, t) => acc + t.arrecadado, 0);
  const totalTaxasLancado = Object.values(dadosTaxas).reduce(
    (acc, t) => acc + t.lancado,
    0,
  );
  const totalTaxasArrecadado = Object.values(dadosTaxas).reduce(
    (acc, t) => acc + t.arrecadado,
    0,
  );
  const percentualGeral = Math.round((totalArrecadado / totalLancado) * 100);
  const inadimplenciaGeral = 100 - percentualGeral;

  // Comparativo com ano anterior
  const arrecadacao2023 = comparativoAnual[1].total;
  const variacaoAnual = (
    ((totalArrecadado - arrecadacao2023) / arrecadacao2023) *
    100
  ).toFixed(1);
  const variacaoPositiva = Number(variacaoAnual) > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Tributos Municipais
          </h2>
          <p className="text-muted-foreground">
            Gestão tributária, arrecadação, fiscalização e dívida ativa
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={periodoSelecionado}
            onValueChange={setPeriodoSelecionado}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <HugeiconsIcon
                    icon={Download01Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Exportar relatório</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <HugeiconsIcon
                    icon={RefreshIcon}
                    strokeWidth={2}
                    className="size-4"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Atualizar dados</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={MoneyReceiveSquareIcon}
          title="Receita Tributária Total"
          value={formatMillions(totalArrecadado)}
          borderColor="border-l-blue-500"
          footer={
            <>
              <div className="flex items-center gap-1 text-xs">
                <HugeiconsIcon
                  icon={variacaoPositiva ? ArrowUp01Icon : ArrowDown01Icon}
                  strokeWidth={2}
                  className={`size-3 ${variacaoPositiva ? "text-green-600" : "text-red-600"}`}
                />
                <span
                  className={
                    variacaoPositiva ? "text-green-600" : "text-red-600"
                  }
                >
                  {variacaoAnual}%
                </span>
                <span className="text-muted-foreground">vs. ano anterior</span>
              </div>
              <Progress value={percentualGeral} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {percentualGeral}% da meta lançada (
                {formatMillions(totalLancado)})
              </p>
            </>
          }
        />

        <KpiCard
          icon={Home01Icon}
          title="IPTU"
          value={formatMillions(dadosIPTU.arrecadado)}
          borderColor="border-l-green-500"
          footer={
            <>
              <Progress
                value={(dadosIPTU.arrecadado / dadosIPTU.lancado) * 100}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {((dadosIPTU.arrecadado / dadosIPTU.lancado) * 100).toFixed(1)}%
                do lançado — Inadimplência:{" "}
                {((dadosIPTU.inadimplente / dadosIPTU.lancado) * 100).toFixed(
                  1,
                )}
                %
              </p>
            </>
          }
        />

        <KpiCard
          icon={Store04Icon}
          title="ISS"
          value={formatMillions(dadosISS.arrecadado)}
          borderColor="border-l-amber-500"
          footer={
            <>
              <Progress
                value={(dadosISS.arrecadado / dadosISS.lancado) * 100}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {((dadosISS.arrecadado / dadosISS.lancado) * 100).toFixed(1)}%
                do lançado — {formatNumber(dadosISS.notasFiscaisEmitidas)} NFS-e
                emitidas
              </p>
            </>
          }
        />

        <KpiCard
          icon={Invoice01Icon}
          title="Dívida Ativa (Estoque)"
          value={formatMillions(dividaAtiva.estoqueTotal)}
          borderColor="border-l-red-500"
          footer={
            <>
              <div className="flex items-center gap-1 text-xs">
                <HugeiconsIcon
                  icon={ArrowUp01Icon}
                  strokeWidth={2}
                  className="size-3 text-green-600"
                />
                <span className="text-green-600">
                  {formatMillions(dividaAtiva.recuperadoAno)}
                </span>
                <span className="text-muted-foreground">
                  recuperados no exercício
                </span>
              </div>
              <Progress
                value={
                  (dividaAtiva.recuperadoAno / dividaAtiva.estoqueTotal) * 100
                }
                className="h-2 mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {(
                  (dividaAtiva.recuperadoAno / dividaAtiva.estoqueTotal) *
                  100
                ).toFixed(1)}
                % de recuperação — Risco prescrição:{" "}
                {formatMillions(dividaAtiva.prescricaoRisco)}
              </p>
            </>
          }
        />
      </div>

      {/* KPIs Secundários */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          icon={Building04Icon}
          title="ITBI"
          value={formatMillions(dadosITBI.arrecadado)}
          borderColor="border-l-cyan-500"
          footer={
            <p className="text-xs text-muted-foreground">
              {formatNumber(dadosITBI.transacoesConcluidas)} transações —
              Alíquota: {dadosITBI.aliquota}%
            </p>
          }
        />

        <KpiCard
          icon={Wallet01Icon}
          title="Taxas e Contribuições"
          value={formatMillions(totalTaxasArrecadado)}
          borderColor="border-l-violet-500"
          footer={
            <p className="text-xs text-muted-foreground">
              {((totalTaxasArrecadado / totalTaxasLancado) * 100).toFixed(1)}%
              do lançado
            </p>
          }
        />

        <KpiCard
          icon={Search01Icon}
          title="Fiscalização"
          value={formatNumber(fiscalizacao.autosInfracao)}
          borderColor="border-l-orange-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Autos de infração — {formatMillions(fiscalizacao.valorRecuperado)}{" "}
              recuperados
            </p>
          }
        />

        <KpiCard
          icon={FileValidationIcon}
          title="Certidões Emitidas"
          value={formatNumber(
            certidoes.negativas +
              certidoes.positivas +
              certidoes.positivasEfeitoNegativa,
          )}
          borderColor="border-l-teal-500"
          footer={
            <p className="text-xs text-muted-foreground">
              {certidoes.percentualDigital}% via canais digitais
            </p>
          }
        />

        <KpiCard
          icon={MoneySend01Icon}
          title="Renúncia Fiscal"
          value={formatMillions(renunciaFiscal.total)}
          borderColor="border-l-purple-500"
          footer={
            <p className="text-xs text-muted-foreground">
              {formatNumber(renunciaFiscal.beneficiariosIPTU)} beneficiários
              IPTU + {formatNumber(renunciaFiscal.empresasIncentivadas)}{" "}
              empresas incentivadas
            </p>
          }
        />
      </div>

      {/* Abas de Conteúdo */}
      <Tabs defaultValue="arrecadacao" className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="arrecadacao">Arrecadação</TabsTrigger>
          <TabsTrigger value="cadastro">Cadastros</TabsTrigger>
          <TabsTrigger value="divida-ativa">Dívida Ativa</TabsTrigger>
          <TabsTrigger value="fiscalizacao">Fiscalização</TabsTrigger>
          <TabsTrigger value="contribuintes">Contribuintes</TabsTrigger>
          <TabsTrigger value="nfse">NFS-e</TabsTrigger>
          <TabsTrigger value="transferencias">Transferências</TabsTrigger>
          <TabsTrigger value="paf">Contencioso</TabsTrigger>
          <TabsTrigger value="metas">Metas</TabsTrigger>
        </TabsList>

        {/* Tab: Arrecadação */}
        <TabsContent value="arrecadacao" className="space-y-4">
          {/* IPTU Detalhado */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Home01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                IPTU — Detalhamento
              </CardTitle>
              <CardDescription>
                Imposto Predial e Territorial Urbano — Exercício{" "}
                {periodoSelecionado}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Valor Lançado
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(dadosIPTU.lancado)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Arrecadado (Cota Única + Parcelas)
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(dadosIPTU.arrecadado)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Descontos Concedidos
                  </p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(dadosIPTU.desconto)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Inadimplente
                  </p>
                  <p className="text-xl font-bold text-red-600">
                    {formatCurrency(dadosIPTU.inadimplente)}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border p-4 space-y-2">
                  <p className="text-sm font-medium">Imóveis Cadastrados</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(dadosIPTU.imoveisTotal)}
                  </p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>
                      Tributados: {formatNumber(dadosIPTU.imoveisTributados)}
                    </span>
                    <span>
                      Isentos: {formatNumber(dadosIPTU.imoveisIsentos)}
                    </span>
                  </div>
                </div>
                <div className="rounded-lg border p-4 space-y-2">
                  <p className="text-sm font-medium">Parcelas</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(dadosIPTU.parcelasPagas)}
                    <span className="text-base font-normal text-muted-foreground">
                      /{formatNumber(dadosIPTU.parcelasEmitidas)}
                    </span>
                  </p>
                  <Progress
                    value={
                      (dadosIPTU.parcelasPagas / dadosIPTU.parcelasEmitidas) *
                      100
                    }
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    {(
                      (dadosIPTU.parcelasPagas / dadosIPTU.parcelasEmitidas) *
                      100
                    ).toFixed(1)}
                    % das parcelas pagas
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-2">
                  <p className="text-sm font-medium">Alíquotas</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Residencial:
                      </span>
                      <span className="font-medium">
                        {dadosIPTU.aliquotaResidencial}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Comercial:</span>
                      <span className="font-medium">
                        {dadosIPTU.aliquotaComercial}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Territorial:
                      </span>
                      <span className="font-medium">
                        {dadosIPTU.aliquotaTerritorial}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ISS Detalhado */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Store04Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                ISS — Detalhamento
              </CardTitle>
              <CardDescription>
                Imposto Sobre Serviços — Exercício {periodoSelecionado}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Arrecadado Total
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(dadosISS.arrecadado)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Retido na Fonte
                  </p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(dadosISS.retidoFonte)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Declarado (DES)
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(dadosISS.declarado)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Fiscalizado/Autuado
                  </p>
                  <p className="text-xl font-bold text-amber-600">
                    {formatCurrency(dadosISS.fiscalizado)}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Setor Econômico</TableHead>
                    <TableHead className="text-center">Empresas</TableHead>
                    <TableHead className="text-right">Arrecadação</TableHead>
                    <TableHead className="text-right">% do Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cadastroEconomico.map((setor) => (
                    <TableRow key={setor.setor}>
                      <TableCell className="font-medium">
                        {setor.setor}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(setor.empresas)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(setor.arrecadacao)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">{setor.percentual}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-center font-bold">
                      {formatNumber(
                        cadastroEconomico.reduce(
                          (acc, s) => acc + s.empresas,
                          0,
                        ),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(
                        cadastroEconomico.reduce(
                          (acc, s) => acc + s.arrecadacao,
                          0,
                        ),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">100%</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          {/* Taxas e Contribuições */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Wallet01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Taxas e Contribuições
              </CardTitle>
              <CardDescription>
                Detalhamento por tipo de taxa — Exercício {periodoSelecionado}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Taxa / Contribuição</TableHead>
                    <TableHead className="text-right">Lançado</TableHead>
                    <TableHead className="text-right">Arrecadado</TableHead>
                    <TableHead className="text-right">% Realizado</TableHead>
                    <TableHead className="text-center">Situação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { nome: "Taxa de Coleta de Lixo", ...dadosTaxas.taxaLixo },
                    { nome: "Taxa de Alvará", ...dadosTaxas.taxaAlvara },
                    {
                      nome: "Taxa de Vigilância Sanitária",
                      ...dadosTaxas.taxaVigilancia,
                    },
                    {
                      nome: "Taxa de Publicidade",
                      ...dadosTaxas.taxaPublicidade,
                    },
                    { nome: "COSIP", ...dadosTaxas.cosip },
                    {
                      nome: "Contribuição de Melhoria",
                      ...dadosTaxas.contribMelhoria,
                    },
                  ].map((taxa) => {
                    const pct = (taxa.arrecadado / taxa.lancado) * 100;
                    return (
                      <TableRow key={taxa.nome}>
                        <TableCell className="font-medium">
                          {taxa.nome}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(taxa.lancado)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(taxa.arrecadado)}
                        </TableCell>
                        <TableCell className="text-right">
                          {pct.toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-center">
                          {pct >= 85 ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                              Adequado
                            </Badge>
                          ) : pct >= 70 ? (
                            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                              Atenção
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
                              Crítico
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totalTaxasLancado)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totalTaxasArrecadado)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {(
                        (totalTaxasArrecadado / totalTaxasLancado) *
                        100
                      ).toFixed(1)}
                      %
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          {/* Gráfico: Evolução Mensal por Tributo (Stacked Area) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={ChartLineData02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Evolução Mensal da Arrecadação por Tributo
              </CardTitle>
              <CardDescription>
                Composição mensal da arrecadação tributária — Exercício{" "}
                {periodoSelecionado}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfigEvolucao}
                className="h-[350px] w-full"
              >
                <AreaChart data={evolucaoMensalTributos} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickFormatter={(v: number) =>
                      `${(v / 1000000).toFixed(1)}M`
                    }
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        indicator="line"
                        formatter={(value) =>
                          formatCurrency(value as number)
                        }
                      />
                    }
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area
                    type="monotone"
                    dataKey="iptu"
                    stackId="1"
                    fill="var(--color-iptu)"
                    stroke="var(--color-iptu)"
                    fillOpacity={0.4}
                  />
                  <Area
                    type="monotone"
                    dataKey="iss"
                    stackId="1"
                    fill="var(--color-iss)"
                    stroke="var(--color-iss)"
                    fillOpacity={0.4}
                  />
                  <Area
                    type="monotone"
                    dataKey="itbi"
                    stackId="1"
                    fill="var(--color-itbi)"
                    stroke="var(--color-itbi)"
                    fillOpacity={0.4}
                  />
                  <Area
                    type="monotone"
                    dataKey="taxas"
                    stackId="1"
                    fill="var(--color-taxas)"
                    stroke="var(--color-taxas)"
                    fillOpacity={0.4}
                  />
                </AreaChart>
              </ChartContainer>

              <Separator className="my-6" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mês</TableHead>
                    <TableHead className="text-right">IPTU</TableHead>
                    <TableHead className="text-right">ISS</TableHead>
                    <TableHead className="text-right">ITBI</TableHead>
                    <TableHead className="text-right">Taxas</TableHead>
                    <TableHead className="text-right font-bold">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evolucaoMensalTributos.map((m) => (
                    <TableRow key={m.mes}>
                      <TableCell className="font-medium">{m.mes}</TableCell>
                      <TableCell className="text-right">
                        {formatMillions(m.iptu)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatMillions(m.iss)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatMillions(m.itbi)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatMillions(m.taxas)}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {formatMillions(m.iptu + m.iss + m.itbi + m.taxas)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      {formatMillions(
                        evolucaoMensalTributos.reduce((a, m) => a + m.iptu, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatMillions(
                        evolucaoMensalTributos.reduce((a, m) => a + m.iss, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatMillions(
                        evolucaoMensalTributos.reduce((a, m) => a + m.itbi, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatMillions(
                        evolucaoMensalTributos.reduce((a, m) => a + m.taxas, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatMillions(
                        evolucaoMensalTributos.reduce(
                          (a, m) => a + m.iptu + m.iss + m.itbi + m.taxas,
                          0,
                        ),
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          {/* Gráfico: Comparativo Mensal 2024 vs 2023 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={PieChart02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Comparativo Mensal — 2024 vs 2023
              </CardTitle>
              <CardDescription>
                Arrecadação total mensal comparada entre o exercício atual e o
                anterior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfigComparativoMensal}
                className="h-[350px] w-full"
              >
                <BarChart data={comparativoMensal2024vs2023} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickFormatter={(v: number) =>
                      `${(v / 1000000).toFixed(1)}M`
                    }
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) =>
                          formatCurrency(value as number)
                        }
                      />
                    }
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="anterior"
                    fill="var(--color-anterior)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="atual"
                    fill="var(--color-atual)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total 2024 (até Nov)
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(
                      comparativoMensal2024vs2023.reduce(
                        (a, m) => a + m.atual,
                        0,
                      ),
                    )}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total 2023 (até Nov)
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(
                      comparativoMensal2024vs2023.reduce(
                        (a, m) => a + m.anterior,
                        0,
                      ),
                    )}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Variação Acumulada
                  </p>
                  {(() => {
                    const total2024 = comparativoMensal2024vs2023.reduce(
                      (a, m) => a + m.atual,
                      0,
                    );
                    const total2023 = comparativoMensal2024vs2023.reduce(
                      (a, m) => a + m.anterior,
                      0,
                    );
                    const variacao = (
                      ((total2024 - total2023) / total2023) *
                      100
                    ).toFixed(1);
                    return (
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-xl font-bold ${Number(variacao) > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {Number(variacao) > 0 ? "+" : ""}
                          {variacao}%
                        </p>
                        <HugeiconsIcon
                          icon={
                            Number(variacao) > 0
                              ? ArrowUp01Icon
                              : ArrowDown01Icon
                          }
                          strokeWidth={2}
                          className={`size-4 ${Number(variacao) > 0 ? "text-green-600" : "text-red-600"}`}
                        />
                      </div>
                    );
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico: Comparativo por Tributo 2024 vs 2023 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Target01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Comparativo por Tributo — 2024 vs 2023
              </CardTitle>
              <CardDescription>
                Comparação da arrecadação acumulada por tipo de tributo entre
                exercícios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfigTributos}
                className="h-[300px] w-full"
              >
                <BarChart
                  data={comparativoTributo2024vs2023}
                  layout="vertical"
                  accessibilityLayer
                >
                  <CartesianGrid horizontal={false} />
                  <XAxis
                    type="number"
                    tickFormatter={(v: number) =>
                      `${(v / 1000000).toFixed(0)}M`
                    }
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="tributo"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={60}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) =>
                          formatCurrency(value as number)
                        }
                      />
                    }
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="anterior"
                    fill="var(--color-anterior)"
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  />
                  <Bar
                    dataKey="atual"
                    fill="var(--color-atual)"
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ChartContainer>

              <Separator className="my-4" />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {comparativoTributo2024vs2023.map((item) => {
                  const variacao = (
                    ((item.atual - item.anterior) / item.anterior) *
                    100
                  ).toFixed(1);
                  const positivo = Number(variacao) > 0;
                  return (
                    <div
                      key={item.tributo}
                      className="rounded-lg border p-4 space-y-2"
                    >
                      <p className="text-sm font-medium">{item.tributo}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">2024</p>
                          <p className="text-lg font-bold">
                            {formatMillions(item.atual)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">2023</p>
                          <p className="text-lg font-medium text-muted-foreground">
                            {formatMillions(item.anterior)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <HugeiconsIcon
                          icon={positivo ? ArrowUp01Icon : ArrowDown01Icon}
                          strokeWidth={2}
                          className={`size-3 ${positivo ? "text-green-600" : "text-red-600"}`}
                        />
                        <span
                          className={`text-sm font-bold ${positivo ? "text-green-600" : "text-red-600"}`}
                        >
                          {positivo ? "+" : ""}
                          {variacao}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Comparativo Anual (tabela) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Calendar01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Comparativo Anual — 3 Exercícios
              </CardTitle>
              <CardDescription>
                Evolução da arrecadação tributária nos últimos 3 exercícios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exercício</TableHead>
                    <TableHead className="text-right">IPTU</TableHead>
                    <TableHead className="text-right">ISS</TableHead>
                    <TableHead className="text-right">ITBI</TableHead>
                    <TableHead className="text-right">Taxas/Contrib.</TableHead>
                    <TableHead className="text-right font-bold">
                      Total
                    </TableHead>
                    <TableHead className="text-center">Variação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparativoAnual.map((ano, i) => {
                    const varAnual =
                      i > 0
                        ? (
                            ((ano.total - comparativoAnual[i - 1].total) /
                              comparativoAnual[i - 1].total) *
                            100
                          ).toFixed(1)
                        : null;
                    return (
                      <TableRow key={ano.ano}>
                        <TableCell className="font-bold">{ano.ano}</TableCell>
                        <TableCell className="text-right">
                          {formatMillions(ano.iptu)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatMillions(ano.iss)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatMillions(ano.itbi)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatMillions(ano.taxas)}
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {formatMillions(ano.total)}
                        </TableCell>
                        <TableCell className="text-center">
                          {varAnual ? (
                            <Badge
                              className={
                                Number(varAnual) > 0
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              }
                            >
                              {Number(varAnual) > 0 ? "+" : ""}
                              {varAnual}%
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Cadastros */}
        <TabsContent value="cadastro" className="space-y-4">
          {/* Cadastro Imobiliário */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Building06Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Cadastro Imobiliário Municipal
              </CardTitle>
              <CardDescription>
                Distribuição dos imóveis por tipologia e valor venal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-center">Quantidade</TableHead>
                    <TableHead className="text-right">% do Total</TableHead>
                    <TableHead className="text-right">
                      Valor Venal Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cadastroImobiliario.map((item) => (
                    <TableRow key={item.tipo}>
                      <TableCell className="font-medium">{item.tipo}</TableCell>
                      <TableCell className="text-center">
                        {formatNumber(item.quantidade)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.percentual}%
                      </TableCell>
                      <TableCell className="text-right">
                        {formatMillions(item.valorVenal)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-center font-bold">
                      {formatNumber(
                        cadastroImobiliario.reduce(
                          (a, i) => a + i.quantidade,
                          0,
                        ),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">100%</TableCell>
                    <TableCell className="text-right font-bold">
                      {formatMillions(
                        cadastroImobiliario.reduce(
                          (a, i) => a + i.valorVenal,
                          0,
                        ),
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          {/* Cadastro Econômico */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Store04Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Cadastro Econômico (Mobiliário)
              </CardTitle>
              <CardDescription>
                Cadastro de prestadores de serviço e contribuintes do ISS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-4 mb-6">
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Empresas Cadastradas
                  </p>
                  <p className="text-2xl font-bold">
                    {formatNumber(dadosISS.empresasCadastradas)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Empresas Ativas
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatNumber(dadosISS.empresasAtivas)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(
                      (dadosISS.empresasAtivas / dadosISS.empresasCadastradas) *
                      100
                    ).toFixed(1)}
                    % do cadastro
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    MEI Cadastrados
                  </p>
                  <p className="text-2xl font-bold">
                    {formatNumber(dadosISS.meiCadastrados)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    NFS-e Emitidas
                  </p>
                  <p className="text-2xl font-bold">
                    {formatNumber(dadosISS.notasFiscaisEmitidas)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certidões e Atendimento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={FileValidationIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Certidões e Atendimento ao Contribuinte
              </CardTitle>
              <CardDescription>
                Indicadores de emissão de certidões e canais de atendimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Certidões Negativas
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatNumber(certidoes.negativas)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Certidões Positivas
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatNumber(certidoes.positivas)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Positiva c/ Efeito Negativa
                  </p>
                  <p className="text-2xl font-bold text-amber-600">
                    {formatNumber(certidoes.positivasEfeitoNegativa)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Tempo Médio Emissão
                  </p>
                  <p className="text-2xl font-bold">
                    {certidoes.tempoMedioEmissao}h
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border p-4 space-y-2">
                  <p className="text-sm font-medium">
                    Atendimentos Presenciais
                  </p>
                  <p className="text-2xl font-bold">
                    {formatNumber(certidoes.atendimentosPresenciais)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-2">
                  <p className="text-sm font-medium">Atendimentos Digitais</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatNumber(certidoes.atendimentosDigitais)}
                  </p>
                  <Progress
                    value={certidoes.percentualDigital}
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    {certidoes.percentualDigital}% do total — Meta: 75%
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-2">
                  <p className="text-sm font-medium">Reclamações</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(certidoes.reclamacoesRecebidas)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(certidoes.reclamacoesResolvidas)} resolvidas (
                    {(
                      (certidoes.reclamacoesResolvidas /
                        certidoes.reclamacoesRecebidas) *
                      100
                    ).toFixed(1)}
                    %)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Renúncia Fiscal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={MoneySend01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Renúncia Fiscal e Incentivos
              </CardTitle>
              <CardDescription>
                Isenções, imunidades e incentivos fiscais concedidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Isenções IPTU
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(renunciaFiscal.isencoesIPTU)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(renunciaFiscal.beneficiariosIPTU)}{" "}
                    beneficiários
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Isenções ISS
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(renunciaFiscal.isencoesISS)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(renunciaFiscal.beneficiariosISS)}{" "}
                    beneficiários
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Incentivos Empresariais
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(renunciaFiscal.incentivosEmpresariais)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(renunciaFiscal.empresasIncentivadas)} empresas
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Imunidades Tributárias
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(renunciaFiscal.imunidades)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Entidades religiosas, educacionais, etc.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 text-sm">
                  <HugeiconsIcon
                    icon={InformationCircleIcon}
                    strokeWidth={2}
                    className="size-4 text-blue-600"
                  />
                  <span className="font-medium">Renúncia total:</span>
                  <span className="font-bold">
                    {formatCurrency(renunciaFiscal.total)}
                  </span>
                  <span className="text-muted-foreground">
                    — equivalente a{" "}
                    {((renunciaFiscal.total / totalArrecadado) * 100).toFixed(
                      1,
                    )}
                    % da receita tributária arrecadada
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Dívida Ativa */}
        <TabsContent value="divida-ativa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Invoice02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Dívida Ativa Tributária
              </CardTitle>
              <CardDescription>
                Estoque, composição e estratégias de recuperação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="rounded-lg border p-4 space-y-1 border-red-200 dark:border-red-800">
                  <p className="text-sm font-medium text-muted-foreground">
                    Estoque Total
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(dividaAtiva.estoqueTotal)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1 border-green-200 dark:border-green-800">
                  <p className="text-sm font-medium text-muted-foreground">
                    Recuperado no Exercício
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(dividaAtiva.recuperadoAno)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Inscrito no Exercício
                  </p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(dividaAtiva.inscricoesAno)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1 border-amber-200 dark:border-amber-800">
                  <p className="text-sm font-medium text-muted-foreground">
                    Risco de Prescrição
                  </p>
                  <p className="text-2xl font-bold text-amber-600">
                    {formatCurrency(dividaAtiva.prescricaoRisco)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Próximos 12 meses
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <h4 className="font-semibold mb-3">Composição por Tributo</h4>
              <div className="space-y-3">
                {[
                  { nome: "IPTU", valor: dividaAtiva.iptu, cor: "bg-blue-600" },
                  { nome: "ISS", valor: dividaAtiva.iss, cor: "bg-green-600" },
                  {
                    nome: "Taxas",
                    valor: dividaAtiva.taxas,
                    cor: "bg-amber-600",
                  },
                  {
                    nome: "ITBI",
                    valor: dividaAtiva.itbi,
                    cor: "bg-purple-600",
                  },
                ].map((item) => (
                  <div key={item.nome} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.nome}</span>
                      <span>
                        {formatCurrency(item.valor)} (
                        {(
                          (item.valor / dividaAtiva.estoqueTotal) *
                          100
                        ).toFixed(1)}
                        %)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.cor}`}
                        style={{
                          width: `${(item.valor / dividaAtiva.estoqueTotal) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <h4 className="font-semibold mb-3">Estratégias de Cobrança</h4>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Ajuizadas
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(dividaAtiva.ajuizadas)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(
                      (dividaAtiva.ajuizadas / dividaAtiva.estoqueTotal) *
                      100
                    ).toFixed(1)}
                    % do estoque
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Protestadas
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(dividaAtiva.protestadas)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(
                      (dividaAtiva.protestadas / dividaAtiva.estoqueTotal) *
                      100
                    ).toFixed(1)}
                    % do estoque
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Parcelamentos
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(dividaAtiva.parcelamentos)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(dividaAtiva.parcelamentosAtivos)} ativos —{" "}
                    {formatNumber(dividaAtiva.parcelamentosInadimplentes)}{" "}
                    inadimplentes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Fiscalização */}
        <TabsContent value="fiscalizacao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Search01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Fiscalização Tributária
              </CardTitle>
              <CardDescription>
                Indicadores de ações fiscais e recuperação de créditos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Autos de Infração
                  </p>
                  <p className="text-2xl font-bold">
                    {formatNumber(fiscalizacao.autosInfracao)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Valor: {formatCurrency(fiscalizacao.valorAutuado)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Valor Recuperado
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(fiscalizacao.valorRecuperado)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(
                      (fiscalizacao.valorRecuperado /
                        fiscalizacao.valorAutuado) *
                      100
                    ).toFixed(1)}
                    % do autuado
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Empresas Fiscalizadas
                  </p>
                  <p className="text-2xl font-bold">
                    {formatNumber(fiscalizacao.empresasFiscalizadas)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(
                      (fiscalizacao.empresasFiscalizadas /
                        dadosISS.empresasAtivas) *
                      100
                    ).toFixed(1)}
                    % das empresas ativas
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    ISS Retido Recuperado
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(fiscalizacao.issRetidoRecuperado)}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Diligências Realizadas
                  </p>
                  <p className="text-xl font-bold">
                    {formatNumber(fiscalizacao.diligenciasRealizadas)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Notificações Prévias
                  </p>
                  <p className="text-xl font-bold">
                    {formatNumber(fiscalizacao.notificacoesPrevias)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Denúncias Recebidas
                  </p>
                  <p className="text-xl font-bold">
                    {formatNumber(fiscalizacao.denunciasRecebidas)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(fiscalizacao.denunciasApuradas)} apuradas (
                    {(
                      (fiscalizacao.denunciasApuradas /
                        fiscalizacao.denunciasRecebidas) *
                      100
                    ).toFixed(1)}
                    %)
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Operações Especiais
                  </p>
                  <p className="text-xl font-bold">
                    {formatNumber(fiscalizacao.operacoesEspeciais)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Contribuintes */}
        <TabsContent value="contribuintes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={StarIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Maiores Contribuintes
              </CardTitle>
              <CardDescription>
                Ranking dos 10 maiores contribuintes por valor arrecadado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">#</TableHead>
                    <TableHead>Contribuinte</TableHead>
                    <TableHead>Tributo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-center">Situação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maioresContribuintes.map((c, i) => (
                    <TableRow key={c.nome}>
                      <TableCell className="font-bold text-muted-foreground">
                        {i + 1}
                      </TableCell>
                      <TableCell className="font-medium">{c.nome}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{c.tributo}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(c.valor)}
                      </TableCell>
                      <TableCell className="text-center">
                        {c.situacao === "Regular" && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                            Regular
                          </Badge>
                        )}
                        {c.situacao === "Parcelado" && (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                            Parcelado
                          </Badge>
                        )}
                        {c.situacao === "Imune" && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                            Imune
                          </Badge>
                        )}
                        {c.situacao === "Inadimplente" && (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
                            Inadimplente
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="font-bold">
                      Total Top 10
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(
                        maioresContribuintes.reduce((a, c) => a + c.valor, 0),
                      )}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          {/* Maiores Devedores */}
          <Card className="border-red-200 dark:border-red-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Alert02Icon}
                  strokeWidth={2}
                  className="size-5 text-red-600"
                />
                Maiores Devedores
              </CardTitle>
              <CardDescription>
                Ranking dos 10 maiores devedores — Dívida Ativa e Exercício
                Corrente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3 mb-6">
                <div className="rounded-lg border border-red-200 dark:border-red-800/50 p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Devido (Top 10)
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(
                      maioresDevedores.reduce((a, d) => a + d.valorDevido, 0),
                    )}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Origem: Dívida Ativa
                  </p>
                  <p className="text-xl font-bold">
                    {
                      maioresDevedores.filter(
                        (d) => d.origem === "Dívida Ativa",
                      ).length
                    }{" "}
                    contribuintes
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(
                      maioresDevedores
                        .filter((d) => d.origem === "Dívida Ativa")
                        .reduce((a, d) => a + d.valorDevido, 0),
                    )}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Origem: Exercício
                  </p>
                  <p className="text-xl font-bold">
                    {
                      maioresDevedores.filter((d) => d.origem === "Exercício")
                        .length
                    }{" "}
                    contribuintes
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(
                      maioresDevedores
                        .filter((d) => d.origem === "Exercício")
                        .reduce((a, d) => a + d.valorDevido, 0),
                    )}
                  </p>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">#</TableHead>
                    <TableHead>Devedor</TableHead>
                    <TableHead>Tributo</TableHead>
                    <TableHead className="text-right">Valor Devido</TableHead>
                    <TableHead className="text-center">Origem</TableHead>
                    <TableHead className="text-center">Situação</TableHead>
                    <TableHead className="text-center">Tempo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maioresDevedores.map((d, i) => (
                    <TableRow key={d.nome}>
                      <TableCell className="font-bold text-muted-foreground">
                        {i + 1}
                      </TableCell>
                      <TableCell className="font-medium">{d.nome}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{d.tributo}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-red-600">
                        {formatCurrency(d.valorDevido)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            d.origem === "Dívida Ativa"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {d.origem}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {d.situacao === "Ajuizada" && (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
                            Ajuizada
                          </Badge>
                        )}
                        {d.situacao === "Protestada" && (
                          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800">
                            Protestada
                          </Badge>
                        )}
                        {d.situacao === "Parcelada" && (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                            Parcelada
                          </Badge>
                        )}
                        {d.situacao === "Inscrita" && (
                          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800">
                            Inscrita
                          </Badge>
                        )}
                        {d.situacao === "Notificada" && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                            Notificada
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">
                        {d.tempoInadimplencia}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="font-bold">
                      Total Top 10 Devedores
                    </TableCell>
                    <TableCell className="text-right font-bold text-red-600">
                      {formatCurrency(
                        maioresDevedores.reduce((a, d) => a + d.valorDevido, 0),
                      )}
                    </TableCell>
                    <TableCell colSpan={3} />
                  </TableRow>
                </TableFooter>
              </Table>

              <div className="mt-4 rounded-lg bg-red-50 dark:bg-red-950/20 p-4">
                <div className="flex items-start gap-2 text-sm">
                  <HugeiconsIcon
                    icon={AlertCircleIcon}
                    strokeWidth={2}
                    className="size-4 text-red-600 mt-0.5"
                  />
                  <div>
                    <span className="font-medium text-red-800 dark:text-red-400">
                      Atenção:
                    </span>
                    <span className="text-red-700 dark:text-red-300 ml-1">
                      O valor total dos 10 maiores devedores representa{" "}
                      {(
                        (maioresDevedores.reduce(
                          (a, d) => a + d.valorDevido,
                          0,
                        ) /
                          dividaAtiva.estoqueTotal) *
                        100
                      ).toFixed(1)}
                      % do estoque total da dívida ativa. Recomenda-se ação
                      prioritária de cobrança para estes contribuintes.
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Metas */}
        <TabsContent value="metas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Target01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Metas de Arrecadação — Exercício {periodoSelecionado}
              </CardTitle>
              <CardDescription>
                Acompanhamento das metas de arrecadação por tributo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {metasArrecadacao.map((meta) => {
                  const isAboveMeta = meta.percentual >= 90;
                  const isWarning =
                    meta.percentual >= 75 && meta.percentual < 90;
                  return (
                    <div key={meta.tributo} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{meta.tributo}</span>
                          {isAboveMeta ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                              No alvo
                            </Badge>
                          ) : isWarning ? (
                            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                              Atenção
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
                              Abaixo
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm font-bold">
                          {meta.percentual}%
                        </span>
                      </div>
                      <Progress value={meta.percentual} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Realizado: {formatCurrency(meta.realizado)}</span>
                        <span>Meta: {formatCurrency(meta.meta)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========================================== */}
        {/* Tab: NFS-e e Nota Fiscal                   */}
        {/* ========================================== */}
        <TabsContent value="nfse" className="space-y-4">
          {/* KPIs NFS-e */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              icon={FileAttachmentIcon}
              title="Total NFS-e Emitidas"
              value={formatNumber(dadosNFSe.totalEmitidas)}
              borderColor="border-l-blue-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Média de {formatNumber(dadosNFSe.mediaNotasDia)} notas/dia —{" "}
                  {formatNumber(dadosNFSe.empresasEmissoras)} empresas emissoras
                </p>
              }
            />
            <KpiCard
              icon={MoneyReceiveSquareIcon}
              title="Valor Total Serviços"
              value={formatMillions(dadosNFSe.valorTotalServicos)}
              borderColor="border-l-green-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  ISS gerado: {formatCurrency(dadosNFSe.issGerado)}
                </p>
              }
            />
            <KpiCard
              icon={Cancel01Icon}
              title="Notas Canceladas"
              value={formatNumber(dadosNFSe.totalCanceladas)}
              borderColor="border-l-red-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  {(
                    (dadosNFSe.totalCanceladas / dadosNFSe.totalEmitidas) *
                    100
                  ).toFixed(1)}
                  % do total — {formatNumber(dadosNFSe.totalSubstituidas)}{" "}
                  substituídas
                </p>
              }
            />
            <KpiCard
              icon={Alert02Icon}
              title="Empresas Sem Emissão"
              value={formatNumber(dadosNFSe.empresasSemEmissao30dias)}
              valueClassName="text-red-600"
              borderColor="border-l-amber-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Sem NFS-e nos últimos 30 dias — possível omissão de receita
                </p>
              }
            />
          </div>

          {/* Evolução Mensal NFS-e */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={ChartLineData02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Evolução Mensal — Emissão de NFS-e
              </CardTitle>
              <CardDescription>
                Volume de notas emitidas e ISS gerado por mês — Exercício{" "}
                {periodoSelecionado}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfigNFSe}
                className="h-[300px] w-full"
              >
                <BarChart data={dadosNFSe.evolucaoMensal} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    yAxisId="left"
                    tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(v: number) =>
                      `${(v / 1000000).toFixed(1)}M`
                    }
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    yAxisId="left"
                    dataKey="notas"
                    fill="var(--color-notas)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="iss"
                    stroke="var(--color-iss)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Ranking por CNAE */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Analytics01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Ranking de Arrecadação por Atividade Econômica (CNAE)
              </CardTitle>
              <CardDescription>
                Principais atividades econômicas por volume de NFS-e e ISS
                gerado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">#</TableHead>
                    <TableHead>CNAE</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-center">NFS-e</TableHead>
                    <TableHead className="text-right">Valor Serviços</TableHead>
                    <TableHead className="text-right">ISS Gerado</TableHead>
                    <TableHead className="text-right">% ISS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosNFSe.rankingCNAE.map((item, i) => (
                    <TableRow key={item.cnae}>
                      <TableCell className="font-bold text-muted-foreground">
                        {i + 1}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {item.cnae}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.descricao}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(item.notas)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatMillions(item.valor)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(item.iss)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">{item.percentual}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="font-bold">
                      Total Top 8 CNAEs
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      {formatNumber(
                        dadosNFSe.rankingCNAE.reduce((a, c) => a + c.notas, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatMillions(
                        dadosNFSe.rankingCNAE.reduce((a, c) => a + c.valor, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(
                        dadosNFSe.rankingCNAE.reduce((a, c) => a + c.iss, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {dadosNFSe.rankingCNAE
                        .reduce((a, c) => a + c.percentual, 0)
                        .toFixed(1)}
                      %
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          {/* Alertas NFS-e */}
          <div className="space-y-3">
            {dadosNFSe.alertasNFSe.map((alerta, i) => (
              <Alert
                key={i}
                variant={alerta.tipo === "critico" ? "destructive" : "default"}
              >
                <HugeiconsIcon
                  icon={
                    alerta.tipo === "critico"
                      ? Alert02Icon
                      : alerta.tipo === "alerta"
                        ? AlertCircleIcon
                        : InformationCircleIcon
                  }
                  strokeWidth={2}
                  className="size-4"
                />
                <AlertTitle>
                  {alerta.tipo === "critico"
                    ? "Atenção Crítica"
                    : alerta.tipo === "alerta"
                      ? "Atenção"
                      : "Informação"}
                </AlertTitle>
                <AlertDescription>{alerta.descricao}</AlertDescription>
              </Alert>
            ))}
          </div>
        </TabsContent>

        {/* ========================================== */}
        {/* Tab: Transferências Constitucionais         */}
        {/* ========================================== */}
        <TabsContent value="transferencias" className="space-y-4">
          {/* KPIs Transferências */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <KpiCard
              icon={BankIcon}
              title="FPM"
              value={formatMillions(transferenciasConstitucionais.fpm.recebido)}
              borderColor="border-l-blue-500"
              footer={
                <>
                  <Progress
                    value={transferenciasConstitucionais.fpm.percentual}
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    {transferenciasConstitucionais.fpm.percentual}% do previsto
                    (
                    {formatMillions(transferenciasConstitucionais.fpm.previsto)}
                    )
                  </p>
                </>
              }
            />
            <KpiCard
              icon={MoneyReceiveSquareIcon}
              title="ICMS (Cota-Parte)"
              value={formatMillions(
                transferenciasConstitucionais.icms.recebido,
              )}
              borderColor="border-l-green-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  IPM: {transferenciasConstitucionais.icms.indicePM} — Ranking:{" "}
                  {transferenciasConstitucionais.icms.rankingEstadual}° de{" "}
                  {transferenciasConstitucionais.icms.totalMunicipios}
                </p>
              }
            />
            <KpiCard
              icon={Wallet01Icon}
              title="IPVA (Cota-Parte)"
              value={formatMillions(
                transferenciasConstitucionais.ipva.recebido,
              )}
              borderColor="border-l-amber-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  {formatNumber(
                    transferenciasConstitucionais.ipva.veiculosMunicipio,
                  )}{" "}
                  veículos registrados
                </p>
              }
            />
            <KpiCard
              icon={Building06Icon}
              title="FUNDEB"
              value={formatMillions(
                transferenciasConstitucionais.fundeb.recebido,
              )}
              borderColor="border-l-violet-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Complementação União:{" "}
                  {formatMillions(
                    transferenciasConstitucionais.fundeb.complementacaoUniao,
                  )}{" "}
                  —{" "}
                  {formatNumber(
                    transferenciasConstitucionais.fundeb.alunosRede,
                  )}{" "}
                  alunos
                </p>
              }
            />
            <KpiCard
              icon={Home01Icon}
              title="ITR (Conveniado)"
              value={formatMillions(transferenciasConstitucionais.itr.recebido)}
              borderColor="border-l-teal-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Retenção:{" "}
                  {transferenciasConstitucionais.itr.percentualRetencao}% —{" "}
                  {transferenciasConstitucionais.itr.percentual}% do previsto
                </p>
              }
            />
          </div>

          {/* Resumo Total */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={MoneyAdd01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Transferências Constitucionais — Resumo
              </CardTitle>
              <CardDescription>
                Total recebido vs. previsto e evolução anual das transferências
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3 mb-6">
                <div className="rounded-lg border p-4 space-y-1 border-green-200 dark:border-green-800">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Recebido
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(
                      transferenciasConstitucionais.totalRecebido,
                    )}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Previsto (LOA)
                  </p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(
                      transferenciasConstitucionais.totalPrevisto,
                    )}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Realização
                  </p>
                  <p className="text-2xl font-bold">
                    {(
                      (transferenciasConstitucionais.totalRecebido /
                        transferenciasConstitucionais.totalPrevisto) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                  <Progress
                    value={
                      (transferenciasConstitucionais.totalRecebido /
                        transferenciasConstitucionais.totalPrevisto) *
                      100
                    }
                    className="h-2"
                  />
                </div>
              </div>

              <Separator className="my-4" />

              {/* Evolução FPM Mensal */}
              <h4 className="font-semibold mb-3">Evolução Mensal do FPM</h4>
              <ChartContainer
                config={
                  {
                    fpm: { label: "FPM", color: "var(--chart-1)" },
                  } satisfies ChartConfig
                }
                className="h-[250px] w-full"
              >
                <BarChart
                  data={transferenciasConstitucionais.fpm.evolucaoMensal}
                  accessibilityLayer
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickFormatter={(v: number) =>
                      `${(v / 1000000).toFixed(1)}M`
                    }
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) =>
                          formatCurrency(value as number)
                        }
                      />
                    }
                  />
                  <Bar
                    dataKey="valor"
                    fill="var(--chart-1)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>

              <Separator className="my-4" />

              {/* Comparativo Anual Transferências */}
              <h4 className="font-semibold mb-3">
                Comparativo Anual — 3 Exercícios
              </h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exercício</TableHead>
                    <TableHead className="text-right">FPM</TableHead>
                    <TableHead className="text-right">ICMS</TableHead>
                    <TableHead className="text-right">IPVA</TableHead>
                    <TableHead className="text-right">FUNDEB</TableHead>
                    <TableHead className="text-right">ITR</TableHead>
                    <TableHead className="text-right font-bold">
                      Total
                    </TableHead>
                    <TableHead className="text-center">Variação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transferenciasConstitucionais.comparativoAnual.map(
                    (ano, i) => {
                      const varAnual =
                        i > 0
                          ? (
                              ((ano.total -
                                transferenciasConstitucionais.comparativoAnual[
                                  i - 1
                                ].total) /
                                transferenciasConstitucionais.comparativoAnual[
                                  i - 1
                                ].total) *
                              100
                            ).toFixed(1)
                          : null;
                      return (
                        <TableRow key={ano.ano}>
                          <TableCell className="font-bold">{ano.ano}</TableCell>
                          <TableCell className="text-right">
                            {formatMillions(ano.fpm)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatMillions(ano.icms)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatMillions(ano.ipva)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatMillions(ano.fundeb)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatMillions(ano.itr)}
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            {formatMillions(ano.total)}
                          </TableCell>
                          <TableCell className="text-center">
                            {varAnual ? (
                              <Badge
                                className={
                                  Number(varAnual) > 0
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                }
                              >
                                {Number(varAnual) > 0 ? "+" : ""}
                                {varAnual}%
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    },
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Informação sobre dependência */}
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-start gap-2 text-sm">
              <HugeiconsIcon
                icon={InformationCircleIcon}
                strokeWidth={2}
                className="size-4 text-blue-600 mt-0.5"
              />
              <div>
                <span className="font-medium">
                  Grau de dependência de transferências:
                </span>
                <span className="ml-1">
                  As transferências constitucionais (
                  {formatCurrency(transferenciasConstitucionais.totalRecebido)})
                  representam{" "}
                  <strong>
                    {(
                      (transferenciasConstitucionais.totalRecebido /
                        (transferenciasConstitucionais.totalRecebido +
                          totalArrecadado)) *
                      100
                    ).toFixed(1)}
                    %
                  </strong>{" "}
                  da receita corrente total (própria + transferida), indicando o
                  nível de autonomia financeira do município.
                </span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ========================================== */}
        {/* Tab: Processos Administrativos Fiscais     */}
        {/* ========================================== */}
        <TabsContent value="paf" className="space-y-4">
          {/* KPIs PAF */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              icon={CourtLawIcon}
              title="Total de Processos"
              value={formatNumber(processosAdmFiscais.totalProcessos)}
              borderColor="border-l-blue-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  {formatNumber(processosAdmFiscais.emTramitacao)} em tramitação
                  — {formatNumber(processosAdmFiscais.julgados)} julgados —{" "}
                  {formatNumber(processosAdmFiscais.arquivados)} arquivados
                </p>
              }
            />
            <KpiCard
              icon={MoneyReceiveSquareIcon}
              title="Valor Total Discutido"
              value={formatMillions(processosAdmFiscais.valorDiscutido)}
              borderColor="border-l-red-500"
              footer={
                <>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-green-600">
                      Procedente:{" "}
                      {formatMillions(
                        processosAdmFiscais.valorJulgadoProcedente,
                      )}
                    </span>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-red-600">
                      Improcedente:{" "}
                      {formatMillions(
                        processosAdmFiscais.valorJulgadoImprocedente,
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pendente de julgamento:{" "}
                    {formatCurrency(processosAdmFiscais.valorPendente)}
                  </p>
                </>
              }
            />
            <KpiCard
              icon={Clock01Icon}
              title="Tempo Médio de Julgamento"
              value={`${processosAdmFiscais.tempoMedioJulgamento} dias`}
              borderColor="border-l-amber-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Meta: 120 dias —{" "}
                  {processosAdmFiscais.tempoMedioJulgamento > 120
                    ? "Acima da meta"
                    : "Dentro da meta"}
                </p>
              }
            />
            <KpiCard
              icon={DocumentValidationIcon}
              title="Taxa de Êxito Fiscal"
              value={`${((processosAdmFiscais.valorJulgadoProcedente / (processosAdmFiscais.valorJulgadoProcedente + processosAdmFiscais.valorJulgadoImprocedente)) * 100).toFixed(1)}%`}
              borderColor="border-l-green-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Percentual de créditos mantidos após julgamento
                </p>
              }
            />
          </div>

          {/* Impugnações e Recursos */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Impugnações</CardTitle>
                <CardDescription>
                  Situação das impugnações recebidas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Recebidas</span>
                    <span className="font-bold">
                      {formatNumber(processosAdmFiscais.impugnacoes.recebidas)}
                    </span>
                  </div>
                  {[
                    {
                      label: "Deferidas",
                      value: processosAdmFiscais.impugnacoes.deferidas,
                      cor: "bg-red-600",
                    },
                    {
                      label: "Indeferidas (êxito fiscal)",
                      value: processosAdmFiscais.impugnacoes.indeferidas,
                      cor: "bg-green-600",
                    },
                    {
                      label: "Parcialmente deferidas",
                      value:
                        processosAdmFiscais.impugnacoes.parcialmenteDeferidas,
                      cor: "bg-amber-600",
                    },
                    {
                      label: "Pendentes de julgamento",
                      value: processosAdmFiscais.impugnacoes.pendentes,
                      cor: "bg-blue-600",
                    },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.label}
                        </span>
                        <span>
                          {formatNumber(item.value)} (
                          {(
                            (item.value /
                              processosAdmFiscais.impugnacoes.recebidas) *
                            100
                          ).toFixed(1)}
                          %)
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.cor}`}
                          style={{
                            width: `${(item.value / processosAdmFiscais.impugnacoes.recebidas) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recursos</CardTitle>
                <CardDescription>
                  Situação dos recursos interpostos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Interpostos</span>
                    <span className="font-bold">
                      {formatNumber(processosAdmFiscais.recursos.interpostos)}
                    </span>
                  </div>
                  {[
                    {
                      label: "Providos (favorável contribuinte)",
                      value: processosAdmFiscais.recursos.providos,
                      cor: "bg-red-600",
                    },
                    {
                      label: "Improvidos (êxito fiscal)",
                      value: processosAdmFiscais.recursos.improvidos,
                      cor: "bg-green-600",
                    },
                    {
                      label: "Parcialmente providos",
                      value: processosAdmFiscais.recursos.parcialmenteProvidos,
                      cor: "bg-amber-600",
                    },
                    {
                      label: "Pendentes de julgamento",
                      value: processosAdmFiscais.recursos.pendentes,
                      cor: "bg-blue-600",
                    },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.label}
                        </span>
                        <span>
                          {formatNumber(item.value)} (
                          {(
                            (item.value /
                              processosAdmFiscais.recursos.interpostos) *
                            100
                          ).toFixed(1)}
                          %)
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.cor}`}
                          style={{
                            width: `${(item.value / processosAdmFiscais.recursos.interpostos) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Distribuição por Tributo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={PieChart02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Distribuição de Processos por Tributo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tributo</TableHead>
                    <TableHead className="text-center">Processos</TableHead>
                    <TableHead className="text-right">
                      Valor Discutido
                    </TableHead>
                    <TableHead className="text-right">% do Total</TableHead>
                    <TableHead className="text-center">Barra</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processosAdmFiscais.porTributo.map((item) => (
                    <TableRow key={item.tributo}>
                      <TableCell className="font-medium">
                        {item.tributo}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(item.processos)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.valor)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.percentual}%
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${item.percentual}%` }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Processos com Prazo Vencendo */}
          <Card className="border-amber-200 dark:border-amber-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  strokeWidth={2}
                  className="size-5 text-amber-600"
                />
                Processos com Prazos Próximos
              </CardTitle>
              <CardDescription>
                Processos com prazos de impugnação ou recurso vencendo nos
                próximos 60 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Processo</TableHead>
                    <TableHead>Contribuinte</TableHead>
                    <TableHead>Tributo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-center">Prazo</TableHead>
                    <TableHead className="text-center">Tipo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processosAdmFiscais.prazosVencendo.map((p) => (
                    <TableRow key={p.processo}>
                      <TableCell className="font-mono text-sm">
                        {p.processo}
                      </TableCell>
                      <TableCell className="font-medium">
                        {p.contribuinte}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{p.tributo}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(p.valor)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                          {p.prazo}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            p.tipo === "Impugnação" ? "secondary" : "outline"
                          }
                        >
                          {p.tipo}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="font-bold">
                      Total em Risco
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(
                        processosAdmFiscais.prazosVencendo.reduce(
                          (a, p) => a + p.valor,
                          0,
                        ),
                      )}
                    </TableCell>
                    <TableCell colSpan={2} />
                  </TableRow>
                </TableFooter>
              </Table>
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
              Indicadores consolidados da gestão tributária municipal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Eficiência Arrecadatória
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{percentualGeral}%</span>
                </div>
                <Progress value={percentualGeral} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Arrecadado / Lançado
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Inadimplência Geral
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-red-600">
                    {inadimplenciaGeral}%
                  </span>
                </div>
                <Progress value={inadimplenciaGeral} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Meta: abaixo de 8%
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Recuperação Dívida Ativa
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-600">
                    {(
                      (dividaAtiva.recuperadoAno / dividaAtiva.estoqueTotal) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    (dividaAtiva.recuperadoAno / dividaAtiva.estoqueTotal) * 100
                  }
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  {formatMillions(dividaAtiva.recuperadoAno)} de{" "}
                  {formatMillions(dividaAtiva.estoqueTotal)}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Crescimento Anual
                </p>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-3xl font-bold ${variacaoPositiva ? "text-green-600" : "text-red-600"}`}
                  >
                    {variacaoPositiva ? "+" : ""}
                    {variacaoAnual}%
                  </span>
                </div>
                <Progress
                  value={Math.abs(Number(variacaoAnual))}
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  {formatMillions(totalArrecadado)} vs.{" "}
                  {formatMillions(arrecadacao2023)} em 2023
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Índice de Esforço Fiscal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Calculator01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Índice de Esforço Fiscal — Indicadores Per Capita
            </CardTitle>
            <CardDescription>
              Comparativo de receita tributária per capita com municípios de
              porte similar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <div className="rounded-lg border p-4 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Receita Tributária Per Capita
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalArrecadado / esforcoFiscal.populacao)}
                </p>
                <p className="text-xs text-muted-foreground">
                  População: {formatNumber(esforcoFiscal.populacao)} hab.
                </p>
              </div>
              <div className="rounded-lg border p-4 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  IPTU Per Capita
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(
                    dadosIPTU.arrecadado / esforcoFiscal.populacao,
                  )}
                </p>
              </div>
              <div className="rounded-lg border p-4 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  ISS Per Capita
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(
                    dadosISS.arrecadado / esforcoFiscal.populacao,
                  )}
                </p>
              </div>
              <div className="rounded-lg border p-4 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Carga Tributária Local
                </p>
                <p className="text-2xl font-bold">
                  {(
                    (totalArrecadado / esforcoFiscal.pibMunicipal) *
                    100
                  ).toFixed(2)}
                  %
                </p>
                <p className="text-xs text-muted-foreground">
                  Receita tributária / PIB municipal
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            <h4 className="font-semibold mb-3">
              Benchmarking Regional — Municípios de Porte Similar
            </h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Município</TableHead>
                  <TableHead className="text-center">População</TableHead>
                  <TableHead className="text-right">
                    Rec. Trib. Per Capita
                  </TableHead>
                  <TableHead className="text-right">IPTU Per Capita</TableHead>
                  <TableHead className="text-right">ISS Per Capita</TableHead>
                  <TableHead className="text-center">Índice Esforço</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {esforcoFiscal.comparativoRegional.map((mun, i) => {
                  const isAtual = i === 0;
                  const recTribPC = isAtual
                    ? totalArrecadado / esforcoFiscal.populacao
                    : mun.recTribPerCapita;
                  const iptuPC = isAtual
                    ? dadosIPTU.arrecadado / esforcoFiscal.populacao
                    : mun.iptuPerCapita;
                  const issPC = isAtual
                    ? dadosISS.arrecadado / esforcoFiscal.populacao
                    : mun.issPerCapita;
                  const indice = isAtual
                    ? (totalArrecadado / esforcoFiscal.populacao / 560) * 100
                    : mun.indiceEsforco;
                  return (
                    <TableRow
                      key={mun.municipio}
                      className={isAtual ? "bg-primary/5 font-medium" : ""}
                    >
                      <TableCell className={isAtual ? "font-bold" : ""}>
                        {mun.municipio}
                      </TableCell>
                      <TableCell className="text-center">
                        {mun.populacao > 0 ? formatNumber(mun.populacao) : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(recTribPC)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(iptuPC)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(issPC)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={
                            indice >= 85
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                              : indice >= 75
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800"
                          }
                        >
                          {indice.toFixed(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Planta Genérica de Valores (PGV) */}
        <Card className="border-amber-200 dark:border-amber-800/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Building06Icon}
                strokeWidth={2}
                className="size-5 text-amber-600"
              />
              Planta Genérica de Valores (PGV)
            </CardTitle>
            <CardDescription>
              Análise de defasagem cadastral e potencial de atualização
              tributária
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <div className="rounded-lg border border-amber-200 dark:border-amber-800 p-4 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Última Atualização
                </p>
                <p className="text-2xl font-bold text-amber-600">
                  {plantaGenericaValores.ultimaAtualizacao}
                </p>
                <p className="text-xs text-red-600 font-medium">
                  {plantaGenericaValores.anosDefasagem} anos de defasagem
                </p>
              </div>
              <div className="rounded-lg border p-4 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Valor Venal Total (PGV atual)
                </p>
                <p className="text-2xl font-bold">
                  {formatMillions(plantaGenericaValores.valorVenalTotal)}
                </p>
              </div>
              <div className="rounded-lg border p-4 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Valor de Mercado Estimado
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatMillions(plantaGenericaValores.valorMercadoEstimado)}
                </p>
              </div>
              <div className="rounded-lg border border-red-200 dark:border-red-800 p-4 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Defasagem Média
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {plantaGenericaValores.defasagemPercentual}%
                </p>
                <p className="text-xs text-muted-foreground">
                  Potencial adicional:{" "}
                  {formatCurrency(plantaGenericaValores.potencialIPTUAdicional)}
                  /ano
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            <h4 className="font-semibold mb-3">Defasagem por Zona Fiscal</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Zona Fiscal</TableHead>
                  <TableHead className="text-center">Imóveis</TableHead>
                  <TableHead className="text-right">
                    Valor Venal Médio
                  </TableHead>
                  <TableHead className="text-right">
                    Valor Mercado Médio
                  </TableHead>
                  <TableHead className="text-right">Defasagem</TableHead>
                  <TableHead className="text-center">Situação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plantaGenericaValores.zonasFiscais.map((zona) => (
                  <TableRow key={zona.zona}>
                    <TableCell className="font-medium">{zona.zona}</TableCell>
                    <TableCell className="text-center">
                      {formatNumber(zona.imoveis)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(zona.valorVenalMedio)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(zona.valorMercadoMedio)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-red-600">
                      {zona.defasagem}%
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
                        Desatualizado
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 p-4">
              <div className="flex items-start gap-2 text-sm">
                <HugeiconsIcon
                  icon={AlertCircleIcon}
                  strokeWidth={2}
                  className="size-4 text-amber-600 mt-0.5"
                />
                <div>
                  <span className="font-medium text-amber-800 dark:text-amber-400">
                    Recomendação:
                  </span>
                  <span className="text-amber-700 dark:text-amber-300 ml-1">
                    A atualização da Planta Genérica de Valores pode gerar
                    receita adicional estimada de{" "}
                    {formatCurrency(
                      plantaGenericaValores.potencialIPTUAdicional,
                    )}
                    /ano somente em IPTU. Recomenda-se iniciar processo
                    legislativo para revisão da PGV, incluindo levantamento
                    técnico com geoprocessamento e pesquisa de valores de
                    mercado.
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Envelhecimento da Dívida Ativa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Clock01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Envelhecimento da Dívida Ativa
            </CardTitle>
            <CardDescription>
              Distribuição do estoque da dívida ativa por faixa de tempo de
              inadimplência
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <div>
                <ChartContainer
                  config={chartConfigEnvelhecimento}
                  className="h-[280px] w-full"
                >
                  <PieChart accessibilityLayer>
                    <Pie
                      data={envelhecimentoDivida}
                      dataKey="valor"
                      nameKey="faixa"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {envelhecimentoDivida.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.cor} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) =>
                            formatCurrency(value as number)
                          }
                        />
                      }
                    />
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="space-y-3">
                {envelhecimentoDivida.map((faixa) => (
                  <div key={faixa.faixa} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="size-3 rounded-full"
                          style={{ backgroundColor: faixa.cor }}
                        />
                        <span className="font-medium">{faixa.faixa}</span>
                      </div>
                      <span className="text-muted-foreground">
                        {formatCurrency(faixa.valor)} ({faixa.percentual}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${faixa.percentual}%`,
                          backgroundColor: faixa.cor,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatNumber(faixa.processos)} processos/inscrições
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-red-50 dark:bg-red-950/20 p-4">
              <div className="flex items-start gap-2 text-sm">
                <HugeiconsIcon
                  icon={Alert02Icon}
                  strokeWidth={2}
                  className="size-4 text-red-600 mt-0.5"
                />
                <div>
                  <span className="font-medium text-red-800 dark:text-red-400">
                    Alerta de prescrição:
                  </span>
                  <span className="text-red-700 dark:text-red-300 ml-1">
                    {formatCurrency(
                      envelhecimentoDivida[4].valor +
                        envelhecimentoDivida[5].valor,
                    )}{" "}
                    (
                    {(
                      ((envelhecimentoDivida[4].valor +
                        envelhecimentoDivida[5].valor) /
                        dividaAtiva.estoqueTotal) *
                      100
                    ).toFixed(1)}
                    % do estoque) estão em faixa de risco de prescrição (4+
                    anos). Destes,{" "}
                    {formatCurrency(envelhecimentoDivida[5].valor)} já
                    ultrapassaram 5 anos e podem estar prescritos. Ação urgente
                    de cobrança judicial ou protesto é necessária.
                  </span>
                </div>
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
                <CardTitle>Análise Inteligente — Tributos</CardTitle>
                <CardDescription>
                  Diagnóstico da gestão tributária e recomendações estratégicas
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-foreground leading-relaxed">
                A receita tributária municipal totalizou{" "}
                <strong>{formatCurrency(totalArrecadado)}</strong> até novembro/
                {periodoSelecionado}, representando{" "}
                <strong>{percentualGeral}% da meta lançada</strong>. O ISS é o
                tributo com melhor desempenho (
                {((dadosISS.arrecadado / dadosISS.lancado) * 100).toFixed(1)}%
                de realização), impulsionado pelo setor de Serviços
                Profissionais. O IPTU apresenta inadimplência de{" "}
                <strong>
                  {((dadosIPTU.inadimplente / dadosIPTU.lancado) * 100).toFixed(
                    1,
                  )}
                  %
                </strong>
                , acima da meta de 8%, demandando ações de cobrança mais
                efetivas. A dívida ativa totaliza{" "}
                <strong>{formatCurrency(dividaAtiva.estoqueTotal)}</strong>, com
                destaque para{" "}
                <strong>{formatCurrency(dividaAtiva.prescricaoRisco)}</strong>{" "}
                em risco de prescrição.
              </p>
            </div>

            <Separator />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="arrecadacao-analise">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={MoneyReceiveSquareIcon}
                      strokeWidth={2}
                      className="size-4 text-green-600"
                    />
                    <span>Análise da Arrecadação</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-green-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          ISS como motor de crescimento:
                        </strong>{" "}
                        O ISS arrecadou {formatCurrency(dadosISS.arrecadado)},
                        com{" "}
                        {(
                          (dadosISS.arrecadado / dadosISS.lancado) *
                          100
                        ).toFixed(1)}
                        % de realização. O setor de Serviços Profissionais
                        lidera com 32,1% da arrecadação. A emissão de{" "}
                        {formatNumber(dadosISS.notasFiscaisEmitidas)} NFS-e
                        demonstra boa adesão ao sistema eletrônico. Recomenda-se
                        ampliar a base de contribuintes via cruzamento de dados
                        com CNPJ ativos.
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
                          IPTU necessita atenção:
                        </strong>{" "}
                        Com{" "}
                        {(
                          (dadosIPTU.arrecadado / dadosIPTU.lancado) *
                          100
                        ).toFixed(1)}
                        % de realização e{" "}
                        {formatNumber(
                          dadosIPTU.parcelasEmitidas - dadosIPTU.parcelasPagas,
                        )}{" "}
                        parcelas em aberto, o IPTU apresenta oportunidade de
                        melhoria. Sugerir campanhas de negociação de débitos e
                        atualização do cadastro imobiliário para ampliar a base
                        tributária.
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
                          ITBI estável:
                        </strong>{" "}
                        A arrecadação de ITBI (
                        {formatCurrency(dadosITBI.arrecadado)}) acompanha o
                        mercado imobiliário local com{" "}
                        {formatNumber(dadosITBI.transacoesConcluidas)}{" "}
                        transações concluídas. Monitorar variações no mercado
                        para projeções futuras.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="divida-ativa-analise">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Invoice02Icon}
                      strokeWidth={2}
                      className="size-4 text-red-600"
                    />
                    <span>Gestão da Dívida Ativa</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-red-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Risco de prescrição crítico:
                        </strong>{" "}
                        {formatCurrency(dividaAtiva.prescricaoRisco)}
                        em créditos estão com risco de prescrição nos próximos
                        12 meses, representando
                        {(
                          (dividaAtiva.prescricaoRisco /
                            dividaAtiva.estoqueTotal) *
                          100
                        ).toFixed(1)}
                        % do estoque. É urgente priorizar o ajuizamento ou
                        protesto desses créditos para evitar a perda definitiva.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={InformationCircleIcon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-amber-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Parcelamentos com inadimplência:
                        </strong>{" "}
                        Dos {formatNumber(dividaAtiva.parcelamentosAtivos)}
                        parcelamentos ativos,{" "}
                        {formatNumber(
                          dividaAtiva.parcelamentosInadimplentes,
                        )}{" "}
                        estão inadimplentes (
                        {(
                          (dividaAtiva.parcelamentosInadimplentes /
                            dividaAtiva.parcelamentosAtivos) *
                          100
                        ).toFixed(1)}
                        %). Revisar os critérios de cancelamento automático e
                        intensificar cobrança sobre parcelamentos em atraso.
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
                          Taxa de recuperação positiva:
                        </strong>{" "}
                        A recuperação de{" "}
                        {formatCurrency(dividaAtiva.recuperadoAno)}(
                        {(
                          (dividaAtiva.recuperadoAno /
                            dividaAtiva.estoqueTotal) *
                          100
                        ).toFixed(1)}
                        % do estoque) demonstra efetividade das ações de
                        cobrança. Manter e intensificar as estratégias de
                        protesto cartorial, que têm apresentado bons resultados.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fiscalizacao-analise">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Search01Icon}
                      strokeWidth={2}
                      className="size-4 text-blue-600"
                    />
                    <span>Efetividade da Fiscalização</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-green-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Bom índice de conversão:
                        </strong>{" "}
                        Das {formatNumber(fiscalizacao.empresasFiscalizadas)}
                        empresas fiscalizadas, foram lavrados{" "}
                        {formatNumber(fiscalizacao.autosInfracao)} autos de
                        infração (
                        {(
                          (fiscalizacao.autosInfracao /
                            fiscalizacao.empresasFiscalizadas) *
                          100
                        ).toFixed(1)}
                        % de autuação), com recuperação de{" "}
                        {formatCurrency(fiscalizacao.valorRecuperado)} (
                        {(
                          (fiscalizacao.valorRecuperado /
                            fiscalizacao.valorAutuado) *
                          100
                        ).toFixed(1)}
                        % do autuado). A fiscalização atinge{" "}
                        {(
                          (fiscalizacao.empresasFiscalizadas /
                            dadosISS.empresasAtivas) *
                          100
                        ).toFixed(1)}
                        % das empresas ativas.
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
                          Recomendação:
                        </strong>{" "}
                        Ampliar a abrangência das fiscalizações para além de{" "}
                        {(
                          (fiscalizacao.empresasFiscalizadas /
                            dadosISS.empresasAtivas) *
                          100
                        ).toFixed(1)}
                        % das empresas ativas, priorizando setores com maior
                        potencial de evasão. As{" "}
                        {formatNumber(fiscalizacao.operacoesEspeciais)}{" "}
                        operações especiais devem focar em segmentos
                        sub-declarados identificados via cruzamento de dados.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="recomendacoes">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Flag01Icon}
                      strokeWidth={2}
                      className="size-4 text-blue-600"
                    />
                    <span>Recomendações Estratégicas</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="flex size-5 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-red-600">
                          1
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Combater prescrição da dívida ativa:
                        </strong>{" "}
                        Priorizar o ajuizamento ou protesto dos{" "}
                        {formatCurrency(dividaAtiva.prescricaoRisco)} em risco
                        de prescrição. Implementar fluxo automatizado de
                        cobrança com marcos temporais definidos.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex size-5 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-amber-600">
                          2
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Reduzir inadimplência do IPTU:
                        </strong>{" "}
                        Implementar programa de desconto para pagamento em cota
                        única e campanhas de regularização. Atualizar o cadastro
                        imobiliário com geoprocessamento para identificar
                        imóveis não cadastrados.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex size-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-blue-600">
                          3
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Ampliar base do ISS:
                        </strong>{" "}
                        Realizar cruzamento de dados CNPJ/CNAE com cadastro
                        municipal para identificar prestadores não inscritos.
                        Intensificar fiscalização no segmento de Construção
                        Civil, segundo maior arrecadador.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex size-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-green-600">
                          4
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Digitalizar atendimento:
                        </strong>{" "}
                        Ampliar os serviços digitais de{" "}
                        {certidoes.percentualDigital}% para a meta de 75%.
                        Implementar chatbot para orientação tributária e
                        autoatendimento para certidões e parcelamentos.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex size-5 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-purple-600">
                          5
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Revisar renúncia fiscal:
                        </strong>{" "}
                        A renúncia fiscal de{" "}
                        {formatCurrency(renunciaFiscal.total)}(
                        {(
                          (renunciaFiscal.total / totalArrecadado) *
                          100
                        ).toFixed(1)}
                        % da receita tributária) deve ser avaliada quanto ao
                        retorno efetivo dos incentivos empresariais concedidos e
                        adequação das isenções de IPTU.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator />

            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-start gap-3">
                <HugeiconsIcon
                  icon={SecurityCheckIcon}
                  strokeWidth={2}
                  className="size-5 text-primary mt-0.5"
                />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Conclusão</p>
                  <p className="text-sm text-muted-foreground">
                    A gestão tributária do município apresenta desempenho{" "}
                    <strong>satisfatório</strong> com {percentualGeral}% de
                    eficiência arrecadatória e crescimento de {variacaoAnual}%
                    sobre o exercício anterior. Os principais pontos de atenção
                    são: a inadimplência do IPTU acima da meta, o risco de
                    prescrição de {formatCurrency(dividaAtiva.prescricaoRisco)}{" "}
                    em dívida ativa, e a necessidade de ampliar a cobertura da
                    fiscalização tributária. O ISS é o tributo com melhor
                    desempenho e maior potencial de crescimento, especialmente
                    com a ampliação da base de contribuintes.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Análise gerada em {new Date().toLocaleDateString("pt-BR")} —
                    Exercício {periodoSelecionado}
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
          {alertasTributarios.map((alerta, index) => (
            <Alert
              key={index}
              variant={alerta.tipo === "critico" ? "destructive" : "default"}
            >
              <HugeiconsIcon
                icon={
                  alerta.tipo === "critico"
                    ? Alert02Icon
                    : alerta.tipo === "alerta"
                      ? AlertCircleIcon
                      : InformationCircleIcon
                }
                strokeWidth={2}
                className="size-4"
              />
              <AlertTitle className="flex items-center gap-2">
                {alerta.titulo}
                <Badge variant="outline" className="text-xs">
                  {alerta.setor}
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
