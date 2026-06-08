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
  ChartPieValueLegend,
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
} from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { KpiCard } from "@/components/ui/kpi-card";

// Formatadores
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

// Dados de receitas proprias
const receitasProprias = [
  {
    codigo: "1.1.1",
    nome: "IPTU",
    prevista: 18500000,
    arrecadada: 16800000,
    aArrecadar: 1700000,
  },
  {
    codigo: "1.1.2",
    nome: "ISS",
    prevista: 24200000,
    arrecadada: 26500000,
    aArrecadar: -2300000,
  },
  {
    codigo: "1.1.3",
    nome: "ITBI",
    prevista: 8900000,
    arrecadada: 7200000,
    aArrecadar: 1700000,
  },
  {
    codigo: "1.1.4",
    nome: "Taxas Diversas",
    prevista: 5600000,
    arrecadada: 4800000,
    aArrecadar: 800000,
  },
  {
    codigo: "1.1.5",
    nome: "Contribuicao de Melhoria",
    prevista: 1200000,
    arrecadada: 890000,
    aArrecadar: 310000,
  },
  {
    codigo: "1.1.6",
    nome: "COSIP",
    prevista: 3800000,
    arrecadada: 3650000,
    aArrecadar: 150000,
  },
];

// Dados de transferencias estaduais
const receitasEstaduais = [
  {
    codigo: "2.1.1",
    nome: "ICMS",
    prevista: 32500000,
    arrecadada: 30800000,
    aArrecadar: 1700000,
  },
  {
    codigo: "2.1.2",
    nome: "IPVA",
    prevista: 12400000,
    arrecadada: 11200000,
    aArrecadar: 1200000,
  },
  {
    codigo: "2.1.3",
    nome: "IPI Exportacao",
    prevista: 2100000,
    arrecadada: 1850000,
    aArrecadar: 250000,
  },
  {
    codigo: "2.1.4",
    nome: "Outras Transferencias Estaduais",
    prevista: 4500000,
    arrecadada: 4100000,
    aArrecadar: 400000,
  },
];

// Dados de transferencias federais
const receitasFederais = [
  {
    codigo: "3.1.1",
    nome: "FPM",
    prevista: 28500000,
    arrecadada: 27200000,
    aArrecadar: 1300000,
  },
  {
    codigo: "3.1.2",
    nome: "FUNDEB",
    prevista: 35600000,
    arrecadada: 34800000,
    aArrecadar: 800000,
  },
  {
    codigo: "3.1.3",
    nome: "SUS - Transferencias",
    prevista: 18900000,
    arrecadada: 17500000,
    aArrecadar: 1400000,
  },
  {
    codigo: "3.1.4",
    nome: "FNAS - Assistencia Social",
    prevista: 4200000,
    arrecadada: 3900000,
    aArrecadar: 300000,
  },
  {
    codigo: "3.1.5",
    nome: "Convenios Federais",
    prevista: 8500000,
    arrecadada: 5200000,
    aArrecadar: 3300000,
  },
  {
    codigo: "3.1.6",
    nome: "Outras Transferencias Federais",
    prevista: 3200000,
    arrecadada: 2800000,
    aArrecadar: 400000,
  },
];

// Outras receitas
const outrasReceitas = [
  {
    codigo: "4.1.1",
    nome: "Receitas Patrimoniais",
    prevista: 2800000,
    arrecadada: 3100000,
    aArrecadar: -300000,
  },
  {
    codigo: "4.1.2",
    nome: "Receitas de Servicos",
    prevista: 1500000,
    arrecadada: 1350000,
    aArrecadar: 150000,
  },
  {
    codigo: "4.1.3",
    nome: "Multas e Juros",
    prevista: 1800000,
    arrecadada: 2100000,
    aArrecadar: -300000,
  },
  {
    codigo: "4.1.4",
    nome: "Divida Ativa",
    prevista: 3500000,
    arrecadada: 2800000,
    aArrecadar: 700000,
  },
  {
    codigo: "4.1.5",
    nome: "Outras Receitas Correntes",
    prevista: 1200000,
    arrecadada: 980000,
    aArrecadar: 220000,
  },
];

// Evolucao mensal
const evolucaoMensal = [
  { mes: "Jan", prevista: 18500000, arrecadada: 17200000 },
  { mes: "Fev", prevista: 17800000, arrecadada: 16500000 },
  { mes: "Mar", prevista: 19200000, arrecadada: 20100000 },
  { mes: "Abr", prevista: 18600000, arrecadada: 17800000 },
  { mes: "Mai", prevista: 20100000, arrecadada: 19500000 },
  { mes: "Jun", prevista: 19500000, arrecadada: 18900000 },
  { mes: "Jul", prevista: 21200000, arrecadada: 20800000 },
  { mes: "Ago", prevista: 20800000, arrecadada: 21500000 },
  { mes: "Set", prevista: 22100000, arrecadada: 21200000 },
  { mes: "Out", prevista: 21500000, arrecadada: 20900000 },
  { mes: "Nov", prevista: 23000000, arrecadada: 22100000 },
];

// Comparativo anual
const comparativoAnual = [
  { ano: "2020", prevista: 185000000, arrecadada: 172500000, percentual: 93.2 },
  { ano: "2021", prevista: 198500000, arrecadada: 189200000, percentual: 95.3 },
  { ano: "2022", prevista: 215600000, arrecadada: 208900000, percentual: 96.9 },
  { ano: "2023", prevista: 232400000, arrecadada: 224100000, percentual: 96.4 },
  { ano: "2024", prevista: 243900000, arrecadada: 228680000, percentual: 93.8 },
];

// Totais
const calcularTotais = (
  dados: { prevista: number; arrecadada: number; aArrecadar: number }[],
) => {
  return dados.reduce(
    (acc, item) => ({
      prevista: acc.prevista + item.prevista,
      arrecadada: acc.arrecadada + item.arrecadada,
      aArrecadar: acc.aArrecadar + item.aArrecadar,
    }),
    { prevista: 0, arrecadada: 0, aArrecadar: 0 },
  );
};

const totaisProprias = calcularTotais(receitasProprias);
const totaisEstaduais = calcularTotais(receitasEstaduais);
const totaisFederais = calcularTotais(receitasFederais);
const totaisOutras = calcularTotais(outrasReceitas);

const totaisGerais = {
  prevista:
    totaisProprias.prevista +
    totaisEstaduais.prevista +
    totaisFederais.prevista +
    totaisOutras.prevista,
  arrecadada:
    totaisProprias.arrecadada +
    totaisEstaduais.arrecadada +
    totaisFederais.arrecadada +
    totaisOutras.arrecadada,
  aArrecadar:
    totaisProprias.aArrecadar +
    totaisEstaduais.aArrecadar +
    totaisFederais.aArrecadar +
    totaisOutras.aArrecadar,
};

// Distribuicao por origem
const distribuicaoOrigem = [
  {
    nome: "Receitas Próprias",
    valor: totaisProprias.arrecadada,
    fill: "var(--chart-1)",
  },
  {
    nome: "Transferencias Estaduais",
    valor: totaisEstaduais.arrecadada,
    fill: "var(--chart-2)",
  },
  {
    nome: "Transferencias Federais",
    valor: totaisFederais.arrecadada,
    fill: "var(--chart-3)",
  },
  {
    nome: "Outras Receitas",
    valor: totaisOutras.arrecadada,
    fill: "var(--chart-4)",
  },
];

// Top contribuintes (ficticios)
const topContribuintes = [
  {
    nome: "Comercio Varejista Municipal Ltda",
    cnpj: "12.345.678/0001-90",
    valor: 2850000,
    tipo: "ISS",
  },
  {
    nome: "Construtora Regional SA",
    cnpj: "23.456.789/0001-01",
    valor: 1950000,
    tipo: "ISS/ITBI",
  },
  {
    nome: "Shopping Center Municipal",
    cnpj: "34.567.890/0001-12",
    valor: 1680000,
    tipo: "ISS/IPTU",
  },
  {
    nome: "Hospital e Maternidade Ltda",
    cnpj: "45.678.901/0001-23",
    valor: 1420000,
    tipo: "ISS",
  },
  {
    nome: "Industria Metalurgica Regional",
    cnpj: "56.789.012/0001-34",
    valor: 1180000,
    tipo: "ISS/IPTU",
  },
];

// Alertas
const alertasReceita = [
  {
    tipo: "warning",
    titulo: "ITBI abaixo da previsão",
    descricao:
      "A arrecadacao de ITBI esta 19% abaixo da previsão orcamentaria, indicando possivel desaceleracao do mercado imobiliario.",
    tributo: "ITBI",
  },
  {
    tipo: "success",
    titulo: "ISS supera a meta",
    descricao:
      "A arrecadacao de ISS superou a previsao em 9.5%, refletindo aumento na atividade economica de servicos.",
    tributo: "ISS",
  },
  {
    tipo: "info",
    titulo: "Convenios federais pendentes",
    descricao:
      "R$ 3.3M em convenios federais aguardam liberacao. Recomenda-se acompanhamento junto aos ministerios.",
    tributo: "CONVENIOS",
  },
];

// Timeline de eventos
const eventosReceita = [
  {
    data: "29/11/2024",
    evento: "Repasse FPM de R$ 2.8M creditado",
    tipo: "credito",
    origem: "Federal",
    valor: 2850000,
  },
  {
    data: "27/11/2024",
    evento: "Vencimento IPTU 10a parcela - R$ 1.2M arrecadado",
    tipo: "arrecadacao",
    origem: "Propria",
    valor: 1200000,
  },
  {
    data: "25/11/2024",
    evento: "Transferencia ICMS de R$ 3.1M",
    tipo: "credito",
    origem: "Estadual",
    valor: 3100000,
  },
  {
    data: "22/11/2024",
    evento: "Liberacao parcela FUNDEB R$ 2.9M",
    tipo: "credito",
    origem: "Federal",
    valor: 2900000,
  },
  {
    data: "20/11/2024",
    evento: "Arrecadação ISS competencia outubro R$ 2.1M",
    tipo: "arrecadacao",
    origem: "Propria",
    valor: 2100000,
  },
  {
    data: "18/11/2024",
    evento: "Recuperacao Divida Ativa R$ 450K",
    tipo: "arrecadacao",
    origem: "Divida",
    valor: 450000,
  },
];

// Metas de arrecadação
const metasArrecadacao = [
  {
    indicador: "Taxa de Realizacao",
    meta: 95,
    realizado: 94,
    unidade: "%",
    status: "atencao",
    descricao: "Meta de arrecadacao total",
  },
  {
    indicador: "Receitas Próprias",
    meta: 28,
    realizado: 26.5,
    unidade: "%",
    status: "atingido",
    descricao: "% do total arrecadado",
  },
  {
    indicador: "Convenios Liberados",
    meta: 100,
    realizado: 61,
    unidade: "%",
    status: "atencao",
    descricao: "% dos convenios federais",
  },
  {
    indicador: "Divida Ativa Recuperada",
    meta: 2500000,
    realizado: 2800000,
    unidade: "R$",
    status: "atingido",
    descricao: "Meta anual superada",
  },
  {
    indicador: "Inadimplencia IPTU",
    meta: 15,
    realizado: 12,
    unidade: "%",
    status: "atingido",
    descricao: "Taxa maxima permitida",
  },
  {
    indicador: "Auto de Infracao Emitido",
    meta: 450,
    realizado: 523,
    unidade: "",
    status: "atingido",
    descricao: "Fiscalizacao tributaria",
  },
];
// Inadimplencia por tributo
const inadimplencia = [
  {
    tributo: "IPTU",
    lancado: 18500000,
    arrecadado: 16800000,
    inadimplente: 1700000,
    percentual: 9.2,
    contribuintes: 3420,
  },
  {
    tributo: "ISS",
    lancado: 24200000,
    arrecadado: 26500000,
    inadimplente: 0,
    percentual: 0,
    contribuintes: 0,
  },
  {
    tributo: "ITBI",
    lancado: 8900000,
    arrecadado: 7200000,
    inadimplente: 1700000,
    percentual: 19.1,
    contribuintes: 285,
  },
  {
    tributo: "Taxas",
    lancado: 5600000,
    arrecadado: 4800000,
    inadimplente: 800000,
    percentual: 14.3,
    contribuintes: 1850,
  },
  {
    tributo: "COSIP",
    lancado: 3800000,
    arrecadado: 3650000,
    inadimplente: 150000,
    percentual: 3.9,
    contribuintes: 620,
  },
  {
    tributo: "Contrib. Melhoria",
    lancado: 1200000,
    arrecadado: 890000,
    inadimplente: 310000,
    percentual: 25.8,
    contribuintes: 145,
  },
];

const totalInadimplencia = inadimplencia.reduce(
  (acc, i) => acc + i.inadimplente,
  0,
);
const totalLancado = inadimplencia.reduce((acc, i) => acc + i.lancado, 0);
const taxaInadimplenciaGeral = (
  (totalInadimplencia / totalLancado) *
  100
).toFixed(1);

// Sazonalidade (heatmap data - arrecadacao por mês e categoria)
const sazonalidadeData = [
  {
    mes: "Jan",
    proprias: 4800000,
    estaduais: 3900000,
    federais: 7200000,
    outras: 1300000,
  },
  {
    mes: "Fev",
    proprias: 3200000,
    estaduais: 3700000,
    federais: 7800000,
    outras: 1100000,
  },
  {
    mes: "Mar",
    proprias: 6100000,
    estaduais: 4200000,
    federais: 8100000,
    outras: 1500000,
  },
  {
    mes: "Abr",
    proprias: 5800000,
    estaduais: 4000000,
    federais: 7500000,
    outras: 1200000,
  },
  {
    mes: "Mai",
    proprias: 5500000,
    estaduais: 4100000,
    federais: 7900000,
    outras: 1400000,
  },
  {
    mes: "Jun",
    proprias: 5200000,
    estaduais: 3800000,
    federais: 7600000,
    outras: 1300000,
  },
  {
    mes: "Jul",
    proprias: 5900000,
    estaduais: 4300000,
    federais: 8200000,
    outras: 1500000,
  },
  {
    mes: "Ago",
    proprias: 6200000,
    estaduais: 4500000,
    federais: 8500000,
    outras: 1600000,
  },
  {
    mes: "Set",
    proprias: 5700000,
    estaduais: 4200000,
    federais: 7800000,
    outras: 1400000,
  },
  {
    mes: "Out",
    proprias: 5400000,
    estaduais: 4100000,
    federais: 7700000,
    outras: 1350000,
  },
  {
    mes: "Nov",
    proprias: 5900000,
    estaduais: 4400000,
    federais: 8300000,
    outras: 1500000,
  },
];

// Receita Corrente vs Capital
const receitaCorrenteCapital = [
  {
    tipo: "Receitas Correntes",
    valor: 210500000,
    percentual: 92.1,
    subcategorias: [
      { nome: "Tributaria", valor: 62200000 },
      { nome: "Contribuicoes", valor: 5000000 },
      { nome: "Patrimonial", valor: 3100000 },
      { nome: "Transferencias Correntes", valor: 131850000 },
      { nome: "Outras Correntes", valor: 8350000 },
    ],
  },
  {
    tipo: "Receitas de Capital",
    valor: 18180000,
    percentual: 7.9,
    subcategorias: [
      { nome: "Operacoes de Credito", valor: 5000000 },
      { nome: "Alienacao de Bens", valor: 1200000 },
      { nome: "Transferencias de Capital", valor: 8500000 },
      { nome: "Outras de Capital", valor: 3480000 },
    ],
  },
];

const receitaCorrenteCapitalChart = [
  { nome: "Correntes", valor: 210500000, fill: "var(--chart-1)" },
  { nome: "Capital", valor: 18180000, fill: "var(--chart-3)" },
];

// Projecao de receita (forecast)
const projecaoReceita = [
  { mes: "Jan", real: 17200000, projetado: null },
  { mes: "Fev", real: 16500000, projetado: null },
  { mes: "Mar", real: 20100000, projetado: null },
  { mes: "Abr", real: 17800000, projetado: null },
  { mes: "Mai", real: 19500000, projetado: null },
  { mes: "Jun", real: 18900000, projetado: null },
  { mes: "Jul", real: 20800000, projetado: null },
  { mes: "Ago", real: 21500000, projetado: null },
  { mes: "Set", real: 21200000, projetado: null },
  { mes: "Out", real: 20900000, projetado: null },
  { mes: "Nov", real: 22100000, projetado: 22100000 },
  { mes: "Dez", real: null, projetado: 23400000 },
];

const totalProjetado = projecaoReceita.reduce(
  (acc, m) => acc + (m.real || m.projetado || 0),
  0,
);

// Benchmark com municipios similares
const benchmarkMunicipios = [
  {
    municipio: "Município Atual",
    receitaPerCapita: 2286,
    autonomia: 26.5,
    realizacao: 93.8,
    inadimplencia: 7.6,
    destaque: true,
  },
  {
    municipio: "Município A (Similar)",
    receitaPerCapita: 2150,
    autonomia: 22.3,
    realizacao: 91.2,
    inadimplencia: 12.4,
    destaque: false,
  },
  {
    municipio: "Município B (Similar)",
    receitaPerCapita: 2420,
    autonomia: 29.8,
    realizacao: 95.1,
    inadimplencia: 8.9,
    destaque: false,
  },
  {
    municipio: "Município C (Similar)",
    receitaPerCapita: 1980,
    autonomia: 19.5,
    realizacao: 89.5,
    inadimplencia: 15.2,
    destaque: false,
  },
  {
    municipio: "Média Regional",
    receitaPerCapita: 2180,
    autonomia: 24.2,
    realizacao: 92.4,
    inadimplencia: 11.0,
    destaque: false,
  },
];

const benchmarkChart = [
  { indicador: "Rec. Per Capita", atual: 100, mediaRegional: 95.4 },
  { indicador: "Autonomia", atual: 100, mediaRegional: 91.3 },
  { indicador: "Realizacao", atual: 100, mediaRegional: 98.5 },
  { indicador: "Inadimplencia", atual: 100, mediaRegional: 144.7 },
];

// Dados por período para filtros
const dadosPorPeriodo: Record<
  string,
  {
    receitasProprias: typeof receitasProprias;
    receitasEstaduais: typeof receitasEstaduais;
    receitasFederais: typeof receitasFederais;
    outrasReceitas: typeof outrasReceitas;
    evolucaoMensal: typeof evolucaoMensal;
    topContribuintes: typeof topContribuintes;
    alertasReceita: typeof alertasReceita;
    eventosReceita: typeof eventosReceita;
    comparativoAnual: typeof comparativoAnual;
  }
> = {
  "2024": {
    receitasProprias,
    receitasEstaduais,
    receitasFederais,
    outrasReceitas,
    evolucaoMensal,
    topContribuintes,
    alertasReceita,
    eventosReceita,
    comparativoAnual,
  },
  "2023": {
    receitasProprias: receitasProprias.map((r) => ({
      ...r,
      prevista: r.prevista * 0.92,
      arrecadada: r.arrecadada * 0.89,
      aArrecadar: r.prevista * 0.92 - r.arrecadada * 0.89,
    })),
    receitasEstaduais: receitasEstaduais.map((r) => ({
      ...r,
      prevista: r.prevista * 0.9,
      arrecadada: r.arrecadada * 0.88,
      aArrecadar: r.prevista * 0.9 - r.arrecadada * 0.88,
    })),
    receitasFederais: receitasFederais.map((r) => ({
      ...r,
      prevista: r.prevista * 0.88,
      arrecadada: r.arrecadada * 0.87,
      aArrecadar: r.prevista * 0.88 - r.arrecadada * 0.87,
    })),
    outrasReceitas: outrasReceitas.map((r) => ({
      ...r,
      prevista: r.prevista * 0.95,
      arrecadada: r.arrecadada * 0.93,
      aArrecadar: r.prevista * 0.95 - r.arrecadada * 0.93,
    })),
    evolucaoMensal: evolucaoMensal.map((e) => ({
      ...e,
      prevista: e.prevista * 0.92,
      arrecadada: e.arrecadada * 0.89,
    })),
    topContribuintes: topContribuintes.map((t) => ({
      ...t,
      valor: t.valor * 0.91,
    })),
    alertasReceita: alertasReceita.map((a) => ({
      ...a,
      descricao: a.descricao.replace(/2024/g, "2023"),
    })),
    eventosReceita: eventosReceita.map((e) => ({
      ...e,
      data: e.data.replace(/2024/g, "2023"),
    })),
    comparativoAnual: comparativoAnual.filter((c) => c.ano !== "2024"),
  },
  "2022": {
    receitasProprias: receitasProprias.map((r) => ({
      ...r,
      prevista: r.prevista * 0.84,
      arrecadada: r.arrecadada * 0.81,
      aArrecadar: r.prevista * 0.84 - r.arrecadada * 0.81,
    })),
    receitasEstaduais: receitasEstaduais.map((r) => ({
      ...r,
      prevista: r.prevista * 0.82,
      arrecadada: r.arrecadada * 0.8,
      aArrecadar: r.prevista * 0.82 - r.arrecadada * 0.8,
    })),
    receitasFederais: receitasFederais.map((r) => ({
      ...r,
      prevista: r.prevista * 0.8,
      arrecadada: r.arrecadada * 0.79,
      aArrecadar: r.prevista * 0.8 - r.arrecadada * 0.79,
    })),
    outrasReceitas: outrasReceitas.map((r) => ({
      ...r,
      prevista: r.prevista * 0.88,
      arrecadada: r.arrecadada * 0.86,
      aArrecadar: r.prevista * 0.88 - r.arrecadada * 0.86,
    })),
    evolucaoMensal: evolucaoMensal.map((e) => ({
      ...e,
      prevista: e.prevista * 0.84,
      arrecadada: e.arrecadada * 0.81,
    })),
    topContribuintes: topContribuintes.map((t) => ({
      ...t,
      valor: t.valor * 0.83,
    })),
    alertasReceita: alertasReceita.map((a) => ({
      ...a,
      descricao: a.descricao.replace(/2024/g, "2022"),
    })),
    eventosReceita: eventosReceita.map((e) => ({
      ...e,
      data: e.data.replace(/2024/g, "2022"),
    })),
    comparativoAnual: comparativoAnual.filter(
      (c) => c.ano !== "2024" && c.ano !== "2023",
    ),
  },
};

export function ReceitaMunicipal() {
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024");

  return (
    <div className="space-y-8">
      {/* KPIs Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Receita Prevista"
          icon={Target01Icon}
          value={formatMillions(totaisGerais.prevista)}
          borderColor="border-l-blue-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-green-600"
              />
              <span className="text-green-600">+4.9%</span>
              <span>vs {Number(periodoSelecionado) - 1}</span>
            </div>
          }
        />
        <KpiCard
          title="Receita Arrecadada"
          icon={MoneyAdd01Icon}
          value={formatMillions(totaisGerais.arrecadada)}
          borderColor="border-l-green-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="font-medium">
                {calcPercent(totaisGerais.arrecadada, totaisGerais.prevista)}%
              </span>
              <span>da previsão</span>
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-green-600 ml-1"
              />
              <span className="text-green-600">+2.1%</span>
            </div>
          }
        />
        <KpiCard
          title="A Arrecadar"
          icon={Clock01Icon}
          value={formatMillions(Math.max(0, totaisGerais.aArrecadar))}
          borderColor="border-l-amber-500"
          footer={
            <p className="text-xs text-muted-foreground">
              {calcPercent(
                Math.max(0, totaisGerais.aArrecadar),
                totaisGerais.prevista,
              )}
              % pendente
            </p>
          }
        />
        <KpiCard
          title="Superávit/Déficit"
          icon={totaisGerais.aArrecadar <= 0 ? ArrowUp01Icon : ArrowDown01Icon}
          value={`${totaisGerais.aArrecadar <= 0 ? "+" : "-"}${formatMillions(Math.abs(totaisGerais.aArrecadar))}`}
          valueClassName={
            totaisGerais.aArrecadar <= 0 ? "text-green-600" : "text-red-600"
          }
          borderColor={
            totaisGerais.aArrecadar <= 0
              ? "border-l-green-500"
              : "border-l-red-500"
          }
          footer={
            <p className="text-xs text-muted-foreground">
              {totaisGerais.aArrecadar <= 0
                ? "Acima da previsão"
                : "Abaixo da previsão"}
            </p>
          }
        />
      </div>

      {/* Graficos Principais */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Evolução Mensal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Evolução Mensal
            </CardTitle>
            <CardDescription>
              Comparativo previsto vs arrecadado por mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  prevista: { label: "Prevista", color: "var(--chart-3)" },
                  arrecadada: { label: "Arrecadada", color: "var(--chart-1)" },
                } satisfies ChartConfig
              }
              className="h-[280px] w-full"
            >
              <AreaChart data={evolucaoMensal} margin={{ left: 0, right: 12 }}>
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
                  dataKey="prevista"
                  type="monotone"
                  fill="var(--color-prevista)"
                  fillOpacity={0.2}
                  stroke="var(--color-prevista)"
                  strokeDasharray="5 5"
                />
                <Area
                  dataKey="arrecadada"
                  type="monotone"
                  fill="var(--color-arrecadada)"
                  fillOpacity={0.4}
                  stroke="var(--color-arrecadada)"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Origem */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={PieChart02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Composição da Receita
            </CardTitle>
            <CardDescription>
              Distribuição por origem dos recursos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  proprias: {
                    label: "Receitas Próprias",
                    color: "var(--chart-1)",
                  },
                  estaduais: {
                    label: "Transferencias Estaduais",
                    color: "var(--chart-2)",
                  },
                  federais: {
                    label: "Transferencias Federais",
                    color: "var(--chart-3)",
                  },
                  outras: { label: "Outras Receitas", color: "var(--chart-4)" },
                } satisfies ChartConfig
              }
              className="mx-auto aspect-auto h-[300px] w-full"
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
                  data={distribuicaoOrigem}
                  dataKey="valor"
                  nameKey="nome"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                />
                <ChartLegend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  content={
                    <ChartPieValueLegend
                      nameKey="nome"
                      valueKey="valor"
                      valueFormatter={formatMillions}
                    />
                  }
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cards de Resumo por Origem */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Receitas Próprias"
          icon={Home01Icon}
          value={formatMillions(totaisProprias.arrecadada)}
          borderColor="border-l-[var(--chart-1)]"
          footer={
            <>
              <Progress
                value={Number(
                  calcPercent(
                    totaisProprias.arrecadada,
                    totaisProprias.prevista,
                  ),
                )}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {calcPercent(
                  totaisProprias.arrecadada,
                  totaisProprias.prevista,
                )}
                % de {formatMillions(totaisProprias.prevista)}
              </p>
            </>
          }
        />

        <KpiCard
          title="Transf. Estaduais"
          icon={Building06Icon}
          value={formatMillions(totaisEstaduais.arrecadada)}
          borderColor="border-l-[var(--chart-2)]"
          footer={
            <>
              <Progress
                value={Number(
                  calcPercent(
                    totaisEstaduais.arrecadada,
                    totaisEstaduais.prevista,
                  ),
                )}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {calcPercent(
                  totaisEstaduais.arrecadada,
                  totaisEstaduais.prevista,
                )}
                % de {formatMillions(totaisEstaduais.prevista)}
              </p>
            </>
          }
        />

        <KpiCard
          title="Transf. Federais"
          icon={BankIcon}
          value={formatMillions(totaisFederais.arrecadada)}
          borderColor="border-l-[var(--chart-3)]"
          footer={
            <>
              <Progress
                value={Number(
                  calcPercent(
                    totaisFederais.arrecadada,
                    totaisFederais.prevista,
                  ),
                )}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {calcPercent(
                  totaisFederais.arrecadada,
                  totaisFederais.prevista,
                )}
                % de {formatMillions(totaisFederais.prevista)}
              </p>
            </>
          }
        />

        <KpiCard
          title="Outras Receitas"
          icon={Wallet01Icon}
          value={formatMillions(totaisOutras.arrecadada)}
          borderColor="border-l-[var(--chart-4)]"
          footer={
            <>
              <Progress
                value={Number(
                  calcPercent(totaisOutras.arrecadada, totaisOutras.prevista),
                )}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {calcPercent(totaisOutras.arrecadada, totaisOutras.prevista)}%
                de {formatMillions(totaisOutras.prevista)}
              </p>
            </>
          }
        />
      </div>

      {/* Tabelas Detalhadas por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento por Categoria</CardTitle>
          <CardDescription>
            Receitas agrupadas por origem e tipo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="proprias" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="proprias">Próprias</TabsTrigger>
              <TabsTrigger value="estaduais">Estaduais</TabsTrigger>
              <TabsTrigger value="federais">Federais</TabsTrigger>
              <TabsTrigger value="outras">Outras</TabsTrigger>
            </TabsList>

            <TabsContent value="proprias" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Codigo</TableHead>
                    <TableHead>Receita</TableHead>
                    <TableHead className="text-right">Prevista</TableHead>
                    <TableHead className="text-right">Arrecadada</TableHead>
                    <TableHead className="text-right">%</TableHead>
                    <TableHead className="text-right">Diferenca</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receitasProprias.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-sm">
                        {item.codigo}
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.prevista)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.arrecadada)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            Number(
                              calcPercent(item.arrecadada, item.prevista),
                            ) >= 100
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {calcPercent(item.arrecadada, item.prevista)}%
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right ${item.aArrecadar <= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {item.aArrecadar <= 0 ? "+" : ""}
                        {formatCurrency(Math.abs(item.aArrecadar))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold">
                      Total Receitas Próprias
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totaisProprias.prevista)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totaisProprias.arrecadada)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {calcPercent(
                        totaisProprias.arrecadada,
                        totaisProprias.prevista,
                      )}
                      %
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold ${totaisProprias.aArrecadar <= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatCurrency(Math.abs(totaisProprias.aArrecadar))}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TabsContent>

            <TabsContent value="estaduais" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Codigo</TableHead>
                    <TableHead>Receita</TableHead>
                    <TableHead className="text-right">Prevista</TableHead>
                    <TableHead className="text-right">Arrecadada</TableHead>
                    <TableHead className="text-right">%</TableHead>
                    <TableHead className="text-right">Diferenca</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receitasEstaduais.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-sm">
                        {item.codigo}
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.prevista)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.arrecadada)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            Number(
                              calcPercent(item.arrecadada, item.prevista),
                            ) >= 100
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {calcPercent(item.arrecadada, item.prevista)}%
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right ${item.aArrecadar <= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {item.aArrecadar <= 0 ? "+" : ""}
                        {formatCurrency(Math.abs(item.aArrecadar))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold">
                      Total Transf. Estaduais
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totaisEstaduais.prevista)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totaisEstaduais.arrecadada)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {calcPercent(
                        totaisEstaduais.arrecadada,
                        totaisEstaduais.prevista,
                      )}
                      %
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold ${totaisEstaduais.aArrecadar <= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatCurrency(Math.abs(totaisEstaduais.aArrecadar))}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TabsContent>

            <TabsContent value="federais" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Codigo</TableHead>
                    <TableHead>Receita</TableHead>
                    <TableHead className="text-right">Prevista</TableHead>
                    <TableHead className="text-right">Arrecadada</TableHead>
                    <TableHead className="text-right">%</TableHead>
                    <TableHead className="text-right">Diferenca</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receitasFederais.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-sm">
                        {item.codigo}
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.prevista)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.arrecadada)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            Number(
                              calcPercent(item.arrecadada, item.prevista),
                            ) >= 100
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {calcPercent(item.arrecadada, item.prevista)}%
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right ${item.aArrecadar <= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {item.aArrecadar <= 0 ? "+" : ""}
                        {formatCurrency(Math.abs(item.aArrecadar))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold">
                      Total Transf. Federais
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totaisFederais.prevista)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totaisFederais.arrecadada)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {calcPercent(
                        totaisFederais.arrecadada,
                        totaisFederais.prevista,
                      )}
                      %
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold ${totaisFederais.aArrecadar <= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatCurrency(Math.abs(totaisFederais.aArrecadar))}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TabsContent>

            <TabsContent value="outras" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Codigo</TableHead>
                    <TableHead>Receita</TableHead>
                    <TableHead className="text-right">Prevista</TableHead>
                    <TableHead className="text-right">Arrecadada</TableHead>
                    <TableHead className="text-right">%</TableHead>
                    <TableHead className="text-right">Diferenca</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outrasReceitas.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-sm">
                        {item.codigo}
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.prevista)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.arrecadada)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            Number(
                              calcPercent(item.arrecadada, item.prevista),
                            ) >= 100
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {calcPercent(item.arrecadada, item.prevista)}%
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right ${item.aArrecadar <= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {item.aArrecadar <= 0 ? "+" : ""}
                        {formatCurrency(Math.abs(item.aArrecadar))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold">
                      Total Outras Receitas
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totaisOutras.prevista)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totaisOutras.arrecadada)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {calcPercent(
                        totaisOutras.arrecadada,
                        totaisOutras.prevista,
                      )}
                      %
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold ${totaisOutras.aArrecadar <= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatCurrency(Math.abs(totaisOutras.aArrecadar))}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Comparativo Anual e Top Contribuintes */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Historico Anual */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Histórico de Arrecadação (5 anos)
            </CardTitle>
            <CardDescription>Evolução da arrecadação anual</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  prevista: { label: "Prevista", color: "var(--chart-3)" },
                  arrecadada: { label: "Arrecadada", color: "var(--chart-1)" },
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
                  dataKey="prevista"
                  fill="var(--color-prevista)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="arrecadada"
                  fill="var(--color-arrecadada)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Contribuintes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Store04Icon}
                strokeWidth={2}
                className="size-5"
              />
              Maiores Contribuintes
            </CardTitle>
            <CardDescription>
              Top 5 contribuintes por arrecadacao
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topContribuintes.map((contribuinte, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar size="sm">
                    <AvatarFallback>{index + 1}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate max-w-[200px]">
                        {contribuinte.nome}
                      </p>
                      <span className="text-sm font-semibold">
                        {formatCurrency(contribuinte.valor)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {contribuinte.cnpj}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {contribuinte.tipo}
                      </Badge>
                    </div>
                    <Progress
                      value={
                        (contribuinte.valor / topContribuintes[0].valor) * 100
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

      {/* Metas de Arrecadação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Target01Icon}
              strokeWidth={2}
              className="size-5"
            />
            Metas de Arrecadação
          </CardTitle>
          <CardDescription>
            Acompanhamento dos indicadores de desempenho
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metasArrecadacao.map((meta, index) => (
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

      {/* Inadimplencia por Tributo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Alert02Icon}
              strokeWidth={2}
              className="size-5"
            />
            Inadimplência por Tributo
          </CardTitle>
          <CardDescription>
            Taxa geral de inadimplência:{" "}
            <strong className="text-red-600">{taxaInadimplenciaGeral}%</strong>{" "}
            — Total inadimplente:{" "}
            <strong>{formatCurrency(totalInadimplencia)}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tributo</TableHead>
                <TableHead className="text-right">Lançado</TableHead>
                <TableHead className="text-right">Arrecadado</TableHead>
                <TableHead className="text-right">Inadimplente</TableHead>
                <TableHead className="text-right">% Inadimpl.</TableHead>
                <TableHead className="text-right">Contribuintes</TableHead>
                <TableHead className="text-center">Risco</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inadimplencia.map((item) => (
                <TableRow key={item.tributo}>
                  <TableCell className="font-medium">{item.tributo}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.lancado)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.arrecadado)}
                  </TableCell>
                  <TableCell className="text-right text-red-600 font-medium">
                    {item.inadimplente > 0
                      ? formatCurrency(item.inadimplente)
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.percentual > 0 ? (
                      <Badge
                        variant={
                          item.percentual > 15
                            ? "destructive"
                            : item.percentual > 10
                              ? "outline"
                              : "secondary"
                        }
                        className={
                          item.percentual > 15
                            ? ""
                            : item.percentual > 10
                              ? "text-amber-600"
                              : "text-green-600"
                        }
                      >
                        {item.percentual}%
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-green-600">
                        0%
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.contribuintes > 0
                      ? item.contribuintes.toLocaleString("pt-BR")
                      : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.percentual > 15 ? (
                      <div className="flex items-center justify-center gap-1">
                        <div className="size-2 rounded-full bg-red-500" />
                        <span className="text-xs text-red-600">Alto</span>
                      </div>
                    ) : item.percentual > 10 ? (
                      <div className="flex items-center justify-center gap-1">
                        <div className="size-2 rounded-full bg-amber-500" />
                        <span className="text-xs text-amber-600">Medio</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <div className="size-2 rounded-full bg-green-500" />
                        <span className="text-xs text-green-600">Baixo</span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">
                  {formatCurrency(totalLancado)}
                </TableCell>
                <TableCell className="text-right font-bold">
                  {formatCurrency(totalLancado - totalInadimplencia)}
                </TableCell>
                <TableCell className="text-right font-bold text-red-600">
                  {formatCurrency(totalInadimplencia)}
                </TableCell>
                <TableCell className="text-right font-bold">
                  {taxaInadimplenciaGeral}%
                </TableCell>
                <TableCell className="text-right font-bold">
                  {inadimplencia
                    .reduce((acc, i) => acc + i.contribuintes, 0)
                    .toLocaleString("pt-BR")}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      {/* Sazonalidade e Receita Corrente vs Capital */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Sazonalidade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Calendar01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Sazonalidade da Arrecadação
            </CardTitle>
            <CardDescription>
              Distribuição mensal por origem dos recursos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  proprias: { label: "Próprias", color: "var(--chart-1)" },
                  estaduais: { label: "Estaduais", color: "var(--chart-2)" },
                  federais: { label: "Federais", color: "var(--chart-3)" },
                  outras: { label: "Outras", color: "var(--chart-4)" },
                } satisfies ChartConfig
              }
              className="h-[280px] w-full"
            >
              <BarChart data={sazonalidadeData} margin={{ left: 0, right: 12 }}>
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
                  tickFormatter={(v: number) => `${(v / 1000000).toFixed(0)}M`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  }
                />
                <Bar
                  dataKey="proprias"
                  stackId="a"
                  fill="var(--color-proprias)"
                />
                <Bar
                  dataKey="estaduais"
                  stackId="a"
                  fill="var(--color-estaduais)"
                />
                <Bar
                  dataKey="federais"
                  stackId="a"
                  fill="var(--color-federais)"
                />
                <Bar
                  dataKey="outras"
                  stackId="a"
                  fill="var(--color-outras)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Receita Corrente vs Capital */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={PieChart02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Receita Corrente vs Capital
            </CardTitle>
            <CardDescription>
              Composicao por categoria economica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <ChartContainer
                config={
                  {
                    correntes: { label: "Correntes", color: "var(--chart-1)" },
                    capital: { label: "Capital", color: "var(--chart-3)" },
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
                    data={receitaCorrenteCapitalChart}
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
              <div className="space-y-3">
                {receitaCorrenteCapital.map((cat) => (
                  <div key={cat.tipo} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{cat.tipo}</p>
                      <Badge variant="outline">{cat.percentual}%</Badge>
                    </div>
                    <p className="text-lg font-bold">
                      {formatMillions(cat.valor)}
                    </p>
                    <div className="space-y-1">
                      {cat.subcategorias.map((sub) => (
                        <div
                          key={sub.nome}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-muted-foreground">
                            {sub.nome}
                          </span>
                          <span className="font-medium">
                            {formatMillions(sub.valor)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projecao de Receita e Benchmark */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Projecao de Receita */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Projeção de Receita
            </CardTitle>
            <CardDescription>
              Realizado + projeção para encerramento — Projetado total:{" "}
              <strong>{formatCurrency(totalProjetado)}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  real: { label: "Realizado", color: "var(--chart-1)" },
                  projetado: { label: "Projetado", color: "var(--chart-5)" },
                } satisfies ChartConfig
              }
              className="h-[280px] w-full"
            >
              <LineChart data={projecaoReceita} margin={{ left: 0, right: 12 }}>
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
                  tickFormatter={(v: number) => `${(v / 1000000).toFixed(0)}M`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) =>
                        value ? formatCurrency(Number(value)) : "-"
                      }
                    />
                  }
                />
                <Line
                  dataKey="real"
                  type="monotone"
                  stroke="var(--color-real)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  connectNulls={false}
                />
                <Line
                  dataKey="projetado"
                  type="monotone"
                  stroke="var(--color-projetado)"
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  dot={{ r: 3, strokeDasharray: "0" }}
                  connectNulls={false}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg border p-3 text-center">
                <p className="text-xs text-muted-foreground">
                  Realizado (Jan-Nov)
                </p>
                <p className="text-sm font-bold">
                  {formatMillions(
                    projecaoReceita
                      .filter((m) => m.real)
                      .reduce((acc, m) => acc + (m.real || 0), 0),
                  )}
                </p>
              </div>
              <div className="rounded-lg border p-3 text-center bg-primary/5">
                <p className="text-xs text-muted-foreground">Projecao Dez</p>
                <p className="text-sm font-bold">{formatMillions(23400000)}</p>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <p className="text-xs text-muted-foreground">Total Projetado</p>
                <p className="text-sm font-bold text-green-600">
                  {formatMillions(totalProjetado)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benchmark com Municipios Similares */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Building04Icon}
                strokeWidth={2}
                className="size-5"
              />
              Benchmark Municipal
            </CardTitle>
            <CardDescription>
              Comparação com municípios de porte similar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Município</TableHead>
                  <TableHead className="text-right">Rec. Per Capita</TableHead>
                  <TableHead className="text-right">Autonomia</TableHead>
                  <TableHead className="text-right">Realizacao</TableHead>
                  <TableHead className="text-right">Inadimpl.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {benchmarkMunicipios.map((mun) => (
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
                      R$ {mun.receitaPerCapita.toLocaleString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-right">
                      {mun.autonomia}%
                    </TableCell>
                    <TableCell className="text-right">
                      {mun.realizacao}%
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          mun.inadimplencia > 12
                            ? "destructive"
                            : mun.inadimplencia > 9
                              ? "outline"
                              : "secondary"
                        }
                        className={
                          mun.inadimplencia > 12
                            ? ""
                            : mun.inadimplencia > 9
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
                  Posicao no Ranking
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">2o</span>
                  <span className="text-xs text-muted-foreground">
                    de 5 municípios
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Acima da media regional em 3 de 4 indicadores
                </p>
              </div>
              <div className="rounded-lg border p-3 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Destaque Positivo
                </p>
                <p className="text-sm font-medium text-green-600">
                  Menor inadimplencia
                </p>
                <p className="text-xs text-muted-foreground">
                  7.6% vs 11.0% da media regional — melhor entre os comparados
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
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
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventosReceita.map((evento, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`size-2.5 rounded-full ${
                      evento.tipo === "credito" ? "bg-green-500" : "bg-blue-500"
                    }`}
                  />
                  {index < eventosReceita.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-xs text-muted-foreground">{evento.data}</p>
                  <p className="text-sm">{evento.evento}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {evento.origem}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
