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
  ResponsiveContainer,
  Treemap,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp01Icon,
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
  Target01Icon,
  ChartLineData02Icon,
  PieChart02Icon,
  UserMultipleIcon,
  Building04Icon,
  GraduationScrollIcon,
  HeartCheckIcon,
  Clock01Icon,
  StarIcon,
  Alert02Icon,
  SecurityCheckIcon,
} from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { KpiCard } from "@/components/ui/kpi-card";

// Dados fictícios para demonstração
const dadosÓrgãos = [
  {
    codigo: "01",
    nome: "Gabinete do Prefeito",
    atualizada: 2850000,
    empenhada: 2234500,
    aEmpenhar: 615500,
    pago: 1890000,
    aPagar: 344500,
  },
  {
    codigo: "02",
    nome: "Secretaria de Administração",
    atualizada: 5420000,
    empenhada: 4890000,
    aEmpenhar: 530000,
    pago: 4120000,
    aPagar: 770000,
  },
  {
    codigo: "03",
    nome: "Secretaria de Fazenda",
    atualizada: 3180000,
    empenhada: 2950000,
    aEmpenhar: 230000,
    pago: 2680000,
    aPagar: 270000,
  },
  {
    codigo: "04",
    nome: "Secretaria de Educação",
    atualizada: 45600000,
    empenhada: 42300000,
    aEmpenhar: 3300000,
    pago: 38900000,
    aPagar: 3400000,
  },
  {
    codigo: "05",
    nome: "Secretaria de Saúde",
    atualizada: 52400000,
    empenhada: 49800000,
    aEmpenhar: 2600000,
    pago: 46200000,
    aPagar: 3600000,
  },
  {
    codigo: "06",
    nome: "Secretaria de Infraestrutura",
    atualizada: 18900000,
    empenhada: 16200000,
    aEmpenhar: 2700000,
    pago: 13500000,
    aPagar: 2700000,
  },
  {
    codigo: "07",
    nome: "Secretaria de Assistência Social",
    atualizada: 8750000,
    empenhada: 7890000,
    aEmpenhar: 860000,
    pago: 6950000,
    aPagar: 940000,
  },
  {
    codigo: "08",
    nome: "Secretaria de Meio Ambiente",
    atualizada: 2340000,
    empenhada: 1980000,
    aEmpenhar: 360000,
    pago: 1720000,
    aPagar: 260000,
  },
];

const dadosUnidades = [
  {
    codigo: "04.01",
    nome: "Gabinete do Secretário de Educação",
    atualizada: 1200000,
    empenhada: 1100000,
    aEmpenhar: 100000,
    pago: 980000,
    aPagar: 120000,
  },
  {
    codigo: "04.02",
    nome: "Departamento de Ensino Fundamental",
    atualizada: 18500000,
    empenhada: 17200000,
    aEmpenhar: 1300000,
    pago: 15800000,
    aPagar: 1400000,
  },
  {
    codigo: "04.03",
    nome: "Departamento de Ensino Infantil",
    atualizada: 12400000,
    empenhada: 11600000,
    aEmpenhar: 800000,
    pago: 10700000,
    aPagar: 900000,
  },
  {
    codigo: "04.04",
    nome: "Departamento de Merenda Escolar",
    atualizada: 8900000,
    empenhada: 8200000,
    aEmpenhar: 700000,
    pago: 7500000,
    aPagar: 700000,
  },
  {
    codigo: "04.05",
    nome: "Departamento de Transporte Escolar",
    atualizada: 4600000,
    empenhada: 4200000,
    aEmpenhar: 400000,
    pago: 3920000,
    aPagar: 280000,
  },
];

const dadosFuncaoSubfuncao = [
  {
    funcao: "12",
    subfuncao: "361",
    nome: "Educação / Ensino Fundamental",
    atualizada: 32000000,
    empenhada: 29500000,
    aEmpenhar: 2500000,
    pago: 27200000,
    aPagar: 2300000,
  },
  {
    funcao: "12",
    subfuncao: "365",
    nome: "Educação / Ensino Infantil",
    atualizada: 13600000,
    empenhada: 12800000,
    aEmpenhar: 800000,
    pago: 11700000,
    aPagar: 1100000,
  },
  {
    funcao: "10",
    subfuncao: "301",
    nome: "Saúde / Atenção Básica",
    atualizada: 28500000,
    empenhada: 27100000,
    aEmpenhar: 1400000,
    pago: 25200000,
    aPagar: 1900000,
  },
  {
    funcao: "10",
    subfuncao: "302",
    nome: "Saúde / Assistência Hospitalar",
    atualizada: 23900000,
    empenhada: 22700000,
    aEmpenhar: 1200000,
    pago: 21000000,
    aPagar: 1700000,
  },
  {
    funcao: "08",
    subfuncao: "244",
    nome: "Assistência Social / Assistência Comunitária",
    atualizada: 8750000,
    empenhada: 7890000,
    aEmpenhar: 860000,
    pago: 6950000,
    aPagar: 940000,
  },
  {
    funcao: "15",
    subfuncao: "451",
    nome: "Urbanismo / Infraestrutura Urbana",
    atualizada: 14200000,
    empenhada: 12100000,
    aEmpenhar: 2100000,
    pago: 10200000,
    aPagar: 1900000,
  },
  {
    funcao: "04",
    subfuncao: "122",
    nome: "Administração / Administração Geral",
    atualizada: 8270000,
    empenhada: 7840000,
    aEmpenhar: 430000,
    pago: 6800000,
    aPagar: 1040000,
  },
];

const dadosProgramas = [
  {
    codigo: "0001",
    nome: "Gestão e Manutenção Administrativa",
    atualizada: 12500000,
    empenhada: 11800000,
    aEmpenhar: 700000,
    pago: 10500000,
    aPagar: 1300000,
  },
  {
    codigo: "0010",
    nome: "Educação de Qualidade para Todos",
    atualizada: 45600000,
    empenhada: 42300000,
    aEmpenhar: 3300000,
    pago: 38900000,
    aPagar: 3400000,
  },
  {
    codigo: "0020",
    nome: "Saúde para a Comunidade",
    atualizada: 52400000,
    empenhada: 49800000,
    aEmpenhar: 2600000,
    pago: 46200000,
    aPagar: 3600000,
  },
  {
    codigo: "0030",
    nome: "Assistência Social Integral",
    atualizada: 8750000,
    empenhada: 7890000,
    aEmpenhar: 860000,
    pago: 6950000,
    aPagar: 940000,
  },
  {
    codigo: "0040",
    nome: "Cidade Sustentável",
    atualizada: 18900000,
    empenhada: 16200000,
    aEmpenhar: 2700000,
    pago: 13500000,
    aPagar: 2700000,
  },
  {
    codigo: "0050",
    nome: "Meio Ambiente Preservado",
    atualizada: 2340000,
    empenhada: 1980000,
    aEmpenhar: 360000,
    pago: 1720000,
    aPagar: 260000,
  },
];

const dadosAcoes = [
  {
    codigo: "2001",
    tipo: "Atividade",
    nome: "Manutenção das Atividades Administrativas",
    atualizada: 8500000,
    empenhada: 8100000,
    aEmpenhar: 400000,
    pago: 7200000,
    aPagar: 900000,
  },
  {
    codigo: "2010",
    tipo: "Atividade",
    nome: "Manutenção do Ensino Fundamental",
    atualizada: 28000000,
    empenhada: 26200000,
    aEmpenhar: 1800000,
    pago: 24100000,
    aPagar: 2100000,
  },
  {
    codigo: "2011",
    tipo: "Atividade",
    nome: "Manutenção do Ensino Infantil",
    atualizada: 12400000,
    empenhada: 11600000,
    aEmpenhar: 800000,
    pago: 10700000,
    aPagar: 900000,
  },
  {
    codigo: "1001",
    tipo: "Projeto",
    nome: "Construção de Escola Municipal",
    atualizada: 3200000,
    empenhada: 2800000,
    aEmpenhar: 400000,
    pago: 2400000,
    aPagar: 400000,
  },
  {
    codigo: "2020",
    tipo: "Atividade",
    nome: "Manutenção da Atenção Básica",
    atualizada: 28500000,
    empenhada: 27100000,
    aEmpenhar: 1400000,
    pago: 25200000,
    aPagar: 1900000,
  },
  {
    codigo: "2021",
    tipo: "Atividade",
    nome: "Manutenção Hospitalar",
    atualizada: 23900000,
    empenhada: 22700000,
    aEmpenhar: 1200000,
    pago: 21000000,
    aPagar: 1700000,
  },
  {
    codigo: "1010",
    tipo: "Projeto",
    nome: "Ampliação da UBS Central",
    atualizada: 1800000,
    empenhada: 1500000,
    aEmpenhar: 300000,
    pago: 1200000,
    aPagar: 300000,
  },
  {
    codigo: "2030",
    tipo: "Atividade",
    nome: "Pavimentação de Vias Urbanas",
    atualizada: 8500000,
    empenhada: 7200000,
    aEmpenhar: 1300000,
    pago: 5800000,
    aPagar: 1400000,
  },
];

const dadosSecretarias = [
  {
    nome: "Secretaria de Educação",
    sigla: "SEMED",
    atualizada: 45600000,
    empenhada: 42300000,
    aEmpenhar: 3300000,
    pago: 38900000,
    aPagar: 3400000,
  },
  {
    nome: "Secretaria de Saúde",
    sigla: "SEMSA",
    atualizada: 52400000,
    empenhada: 49800000,
    aEmpenhar: 2600000,
    pago: 46200000,
    aPagar: 3600000,
  },
  {
    nome: "Secretaria de Infraestrutura",
    sigla: "SEMINF",
    atualizada: 18900000,
    empenhada: 16200000,
    aEmpenhar: 2700000,
    pago: 13500000,
    aPagar: 2700000,
  },
  {
    nome: "Secretaria de Assistência Social",
    sigla: "SEMAS",
    atualizada: 8750000,
    empenhada: 7890000,
    aEmpenhar: 860000,
    pago: 6950000,
    aPagar: 940000,
  },
  {
    nome: "Secretaria de Administração",
    sigla: "SEMAD",
    atualizada: 5420000,
    empenhada: 4890000,
    aEmpenhar: 530000,
    pago: 4120000,
    aPagar: 770000,
  },
  {
    nome: "Secretaria de Fazenda",
    sigla: "SEMFAZ",
    atualizada: 3180000,
    empenhada: 2950000,
    aEmpenhar: 230000,
    pago: 2680000,
    aPagar: 270000,
  },
  {
    nome: "Gabinete do Prefeito",
    sigla: "GAB",
    atualizada: 2850000,
    empenhada: 2234500,
    aEmpenhar: 615500,
    pago: 1890000,
    aPagar: 344500,
  },
  {
    nome: "Secretaria de Meio Ambiente",
    sigla: "SEMMA",
    atualizada: 2340000,
    empenhada: 1980000,
    aEmpenhar: 360000,
    pago: 1720000,
    aPagar: 260000,
  },
];

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
];

// Totais gerais
const totais = {
  atualizada: 139440000,
  empenhada: 128244500,
  aEmpenhar: 11195500,
  pago: 115960000,
  aPagar: 12284500,
};

// Dados para comparativo anual
const comparativoAnual = [
  { ano: "2020", atualizada: 98500000, empenhada: 89200000, pago: 82100000 },
  { ano: "2021", atualizada: 108900000, empenhada: 99800000, pago: 91500000 },
  { ano: "2022", atualizada: 121300000, empenhada: 112500000, pago: 103200000 },
  { ano: "2023", atualizada: 132800000, empenhada: 122100000, pago: 112800000 },
  { ano: "2024", atualizada: 139440000, empenhada: 128244500, pago: 115960000 },
];

// Dados para treemap de despesas
const treemapData = [
  { name: "Pessoal e Encargos", value: 68500000, fill: "var(--chart-1)" },
  {
    name: "Outras Despesas Correntes",
    value: 42300000,
    fill: "var(--chart-2)",
  },
  { name: "Investimentos", value: 14200000, fill: "var(--chart-3)" },
  { name: "Inversoes Financeiras", value: 2100000, fill: "var(--chart-4)" },
  { name: "Amortização da Dívida", value: 1144500, fill: "var(--chart-5)" },
];

// Dados de empenhos por modalidade
const modalidadeLicitacao = [
  { modalidade: "Dispensa", quantidade: 342, valor: 8500000 },
  { modalidade: "Pregao Eletronico", quantidade: 156, valor: 45200000 },
  { modalidade: "Pregao Presencial", quantidade: 48, valor: 12800000 },
  { modalidade: "Inexigibilidade", quantidade: 89, valor: 18900000 },
  { modalidade: "Tomada de Precos", quantidade: 12, valor: 8200000 },
  { modalidade: "Concorrencia", quantidade: 5, valor: 34644500 },
];

// Dados de fornecedores principais
const topFornecedores = [
  {
    nome: "Construtora Silva & Associados",
    cnpj: "12.345.678/0001-90",
    valor: 18500000,
    percentual: 14.4,
  },
  {
    nome: "Distribuidora de Medicamentos ABC",
    cnpj: "23.456.789/0001-01",
    valor: 12800000,
    percentual: 10.0,
  },
  {
    nome: "Merenda Escolar Ltda",
    cnpj: "34.567.890/0001-12",
    valor: 8900000,
    percentual: 6.9,
  },
  {
    nome: "Transporte Urbano SA",
    cnpj: "45.678.901/0001-23",
    valor: 7200000,
    percentual: 5.6,
  },
  {
    nome: "Tecnologia Municipal Ltda",
    cnpj: "56.789.012/0001-34",
    valor: 5400000,
    percentual: 4.2,
  },
];

// Metas e indicadores
const metasExecucao = [
  {
    indicador: "Taxa de Execução",
    meta: 95,
    realizado: 91,
    unidade: "%",
    status: "atencao",
    descricao: "Meta de execução orçamentária",
  },
  {
    indicador: "Despesa com Pessoal",
    meta: 45,
    realizado: 42,
    unidade: "%",
    status: "atingido",
    descricao: "% da receita corrente liquida",
  },
  {
    indicador: "Restos a Pagar",
    meta: 8000000,
    realizado: 6500000,
    unidade: "R$",
    status: "atingido",
    descricao: "Meta de restos a pagar controlada",
  },
  {
    indicador: "Contratacoes Diretas",
    meta: 15,
    realizado: 18,
    unidade: "%",
    status: "atencao",
    descricao: "% maximo permitido (superado)",
  },
  {
    indicador: "Investimentos",
    meta: 20,
    realizado: 22,
    unidade: "%",
    status: "atingido",
    descricao: "% aplicado em obras e equipamentos",
  },
  {
    indicador: "Despesas Capital",
    meta: 45000000,
    realizado: 48000000,
    unidade: "R$",
    status: "atingido",
    descricao: "Meta anual superada",
  },
];

const metasODS = [
  {
    ods: "ODS 3",
    titulo: "Saude e Bem-estar",
    meta: 52400000,
    realizado: 49800000,
    percentual: 95,
  },
  {
    ods: "ODS 4",
    titulo: "Educação de Qualidade",
    meta: 45600000,
    realizado: 42300000,
    percentual: 93,
  },
  {
    ods: "ODS 11",
    titulo: "Cidades Sustentáveis",
    meta: 18900000,
    realizado: 16200000,
    percentual: 86,
  },
  {
    ods: "ODS 1",
    titulo: "Erradicação da Pobreza",
    meta: 8750000,
    realizado: 7890000,
    percentual: 90,
  },
];

// Rigidez Orçamentária
const rigidezOrcamentaria = [
  { categoria: "Pessoal e Encargos", valor: 68500000, tipo: "obrigatoria" },
  { categoria: "Servico da Divida", valor: 1144500, tipo: "obrigatoria" },
  { categoria: "Precatorios", valor: 2100000, tipo: "obrigatoria" },
  {
    categoria: "Transferencias Constitucionais",
    valor: 8200000,
    tipo: "obrigatoria",
  },
  {
    categoria: "Outras Despesas Correntes",
    valor: 42300000,
    tipo: "discricionaria",
  },
  { categoria: "Investimentos", valor: 14200000, tipo: "discricionaria" },
  { categoria: "Outras de Capital", valor: 3000000, tipo: "discricionaria" },
];

const totalObrigatoria = rigidezOrcamentaria
  .filter((r) => r.tipo === "obrigatoria")
  .reduce((acc, r) => acc + r.valor, 0);
const totalDiscricionaria = rigidezOrcamentaria
  .filter((r) => r.tipo === "discricionaria")
  .reduce((acc, r) => acc + r.valor, 0);
const percentualRigidez = ((totalObrigatoria / totais.empenhada) * 100).toFixed(
  1,
);

// Limite de Pessoal - Lei de Responsabilidade Fiscal (LRF)
const receitaCorrenteLiquida = 210500000;
const despesaPessoalTotal = 68500000;
const percentualPessoalRCL = (
  (despesaPessoalTotal / receitaCorrenteLiquida) *
  100
).toFixed(1);
const limitePrudencial = 51.3; // 95% do limite maximo
const limiteMaximo = 54.0; // Limite maximo para Executivo

const evolucaoPessoalRCL = [
  { periodo: "1o Quad 2023", pessoal: 30.8 },
  { periodo: "2o Quad 2023", pessoal: 31.2 },
  { periodo: "3o Quad 2023", pessoal: 31.5 },
  { periodo: "1o Quad 2024", pessoal: 31.9 },
  { periodo: "2o Quad 2024", pessoal: 32.5 },
  { periodo: "3o Quad 2024", pessoal: Number(percentualPessoalRCL) },
];

// Despesa Corrente vs Capital
const despesaCorrenteCapital = [
  {
    tipo: "Despesas Correntes",
    valor: 112044500,
    percentual: 87.4,
    subcategorias: [
      { nome: "Pessoal e Encargos", valor: 68500000 },
      { nome: "Juros e Encargos da Divida", valor: 1144500 },
      { nome: "Outras Despesas Correntes", valor: 42400000 },
    ],
  },
  {
    tipo: "Despesas de Capital",
    valor: 16200000,
    percentual: 12.6,
    subcategorias: [
      { nome: "Investimentos", valor: 14200000 },
      { nome: "Inversoes Financeiras", valor: 500000 },
      { nome: "Amortização da Dívida", valor: 1500000 },
    ],
  },
];

const despesaCorrenteCapitalChart = [
  { nome: "Correntes", valor: 112044500, fill: "var(--chart-1)" },
  { nome: "Capital", valor: 16200000, fill: "var(--chart-3)" },
];

// Restos a Pagar - Aging
const restosAPagarAging = [
  {
    faixa: "Ate 30 dias",
    processados: 4200000,
    naoProcessados: 1800000,
    total: 6000000,
    risco: "baixo",
  },
  {
    faixa: "31-60 dias",
    processados: 2100000,
    naoProcessados: 950000,
    total: 3050000,
    risco: "baixo",
  },
  {
    faixa: "61-90 dias",
    processados: 890000,
    naoProcessados: 420000,
    total: 1310000,
    risco: "medio",
  },
  {
    faixa: "91-180 dias",
    processados: 650000,
    naoProcessados: 380000,
    total: 1030000,
    risco: "alto",
  },
  {
    faixa: "Acima de 180 dias",
    processados: 520000,
    naoProcessados: 374500,
    total: 894500,
    risco: "critico",
  },
];

const totalRestosProcessados = restosAPagarAging.reduce(
  (acc, r) => acc + r.processados,
  0,
);
const totalRestosNaoProcessados = restosAPagarAging.reduce(
  (acc, r) => acc + r.naoProcessados,
  0,
);
const totalRestosGeral = restosAPagarAging.reduce((acc, r) => acc + r.total, 0);

// Projecao de Execucao por Secretaria
const projecaoExecucao = [
  {
    secretaria: "SEMSA",
    atual: 95,
    projetado: 97,
    meta: 95,
    status: "atingido",
  },
  {
    secretaria: "SEMED",
    atual: 93,
    projetado: 95,
    meta: 95,
    status: "atencao",
  },
  {
    secretaria: "SEMINF",
    atual: 86,
    projetado: 90,
    meta: 95,
    status: "critico",
  },
  {
    secretaria: "SEMAS",
    atual: 90,
    projetado: 93,
    meta: 95,
    status: "atencao",
  },
  {
    secretaria: "SEMAD",
    atual: 90,
    projetado: 94,
    meta: 95,
    status: "atencao",
  },
  {
    secretaria: "SEMFAZ",
    atual: 93,
    projetado: 96,
    meta: 95,
    status: "atingido",
  },
  { secretaria: "GAB", atual: 78, projetado: 85, meta: 95, status: "critico" },
  {
    secretaria: "SEMMA",
    atual: 85,
    projetado: 91,
    meta: 95,
    status: "atencao",
  },
];

// Benchmark Municipal
const benchmarkDespesa = [
  {
    municipio: "Município Atual",
    execucao: 92,
    pessoalRCL: Number(percentualPessoalRCL),
    investimento: 12.6,
    restosAPagar: 9.6,
    destaque: true,
  },
  {
    municipio: "Município A (Similar)",
    execucao: 89,
    pessoalRCL: 38.2,
    investimento: 10.1,
    restosAPagar: 14.2,
    destaque: false,
  },
  {
    municipio: "Município B (Similar)",
    execucao: 94,
    pessoalRCL: 35.5,
    investimento: 14.8,
    restosAPagar: 7.8,
    destaque: false,
  },
  {
    municipio: "Município C (Similar)",
    execucao: 86,
    pessoalRCL: 42.1,
    investimento: 8.5,
    restosAPagar: 18.5,
    destaque: false,
  },
  {
    municipio: "Média Regional",
    execucao: 90,
    pessoalRCL: 37.8,
    investimento: 11.5,
    restosAPagar: 12.5,
    destaque: false,
  },
];

// Timeline de eventos
const eventosRecentes = [
  {
    data: "28/11/2024",
    evento: "Empenho de R$ 2.5M para merenda escolar",
    tipo: "empenho",
    secretaria: "SEMED",
  },
  {
    data: "25/11/2024",
    evento: "Pagamento de R$ 1.8M para obras de pavimentacao",
    tipo: "pagamento",
    secretaria: "SEMINF",
  },
  {
    data: "22/11/2024",
    evento: "Abertura de licitação para aquisição de medicamentos",
    tipo: "licitacao",
    secretaria: "SEMSA",
  },
  {
    data: "20/11/2024",
    evento: "Liquidação de R$ 3.2M em contratos diversos",
    tipo: "liquidacao",
    secretaria: "SEMAD",
  },
  {
    data: "18/11/2024",
    evento: "Suplementação orçamentária de R$ 1,5M",
    tipo: "credito",
    secretaria: "SEMFAZ",
  },
];

// Função para formatar valores em reais
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Função para formatar valores em milhões
function formatMillions(value: number): string {
  return `R$ ${(value / 1000000).toFixed(1)}M`;
}

// Função para calcular percentual
function calcPercent(value: number, total: number): number {
  return Math.round((value / total) * 100);
}

export function DespesaMunicipal() {
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024");
  const [viewMode, setViewMode] = React.useState("orgao");

  return (
    <div className="space-y-8">
      {/* Header com filtros */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Despesa Municipal
          </h2>
          <p className="text-muted-foreground">
            Execução orçamentária do município
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select
            value={periodoSelecionado}
            onValueChange={setPeriodoSelecionado}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <HugeiconsIcon
              icon={FilterIcon}
              strokeWidth={2}
              className="mr-2 size-4"
            />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <HugeiconsIcon
              icon={Download01Icon}
              strokeWidth={2}
              className="mr-2 size-4"
            />
            Exportar
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

      {/* KPIs Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          title="Despesa Atualizada"
          icon={Wallet01Icon}
          value={formatCurrency(totais.atualizada)}
          borderColor="border-l-blue-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Orçamento atualizado do exercício
            </p>
          }
        />
        <KpiCard
          title="Despesa Empenhada"
          icon={Invoice01Icon}
          value={formatCurrency(totais.empenhada)}
          borderColor="border-l-green-500"
          footer={
            <div className="flex items-center gap-2">
              <Progress
                value={calcPercent(totais.empenhada, totais.atualizada)}
                className="h-2 flex-1"
              />
              <span className="text-xs font-medium">
                {calcPercent(totais.empenhada, totais.atualizada)}%
              </span>
            </div>
          }
        />
        <KpiCard
          title="A Empenhar"
          icon={Calendar01Icon}
          value={formatCurrency(totais.aEmpenhar)}
          borderColor="border-l-amber-500"
          footer={
            <p className="text-xs text-muted-foreground">
              {calcPercent(totais.aEmpenhar, totais.atualizada)}% do orçamento
              disponível
            </p>
          }
        />
        <KpiCard
          title="Pago"
          icon={MoneyReceiveSquareIcon}
          value={formatCurrency(totais.pago)}
          borderColor="border-l-red-500"
          footer={
            <div className="flex items-center gap-2">
              <Progress
                value={calcPercent(totais.pago, totais.empenhada)}
                className="h-2 flex-1"
              />
              <span className="text-xs font-medium">
                {calcPercent(totais.pago, totais.empenhada)}%
              </span>
            </div>
          }
        />
        <KpiCard
          title="A Pagar"
          icon={Building06Icon}
          value={formatCurrency(totais.aPagar)}
          borderColor="border-l-orange-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-amber-600"
              />
              <span className="text-amber-600">
                {calcPercent(totais.aPagar, totais.empenhada)}% pendente
              </span>
            </div>
          }
        />
      </div>

      {/* Gráficos de Visão Geral */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Evolução Mensal */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução Mensal da Execução</CardTitle>
            <CardDescription>Empenhado vs Pago por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  empenhado: { label: "Empenhado", color: "var(--chart-1)" },
                  pago: { label: "Pago", color: "var(--chart-2)" },
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
                  type="monotone"
                  dataKey="empenhado"
                  fill="var(--color-empenhado)"
                  fillOpacity={0.3}
                  stroke="var(--color-empenhado)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="pago"
                  fill="var(--color-pago)"
                  fillOpacity={0.3}
                  stroke="var(--color-pago)"
                  strokeWidth={2}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Secretaria */}
        <Card>
          <CardHeader>
            <CardTitle>Despesa por Secretaria</CardTitle>
            <CardDescription>Distribuição da despesa empenhada</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  SEMSA: { label: "Saúde", color: "var(--chart-1)" },
                  SEMED: { label: "Educação", color: "var(--chart-2)" },
                  SEMINF: { label: "Infraestrutura", color: "var(--chart-3)" },
                  SEMAS: {
                    label: "Assistência Social",
                    color: "var(--chart-4)",
                  },
                  outros: { label: "Outros", color: "var(--chart-5)" },
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
                  data={[
                    {
                      name: "SEMSA",
                      value: 49800000,
                      fill: "var(--color-SEMSA)",
                    },
                    {
                      name: "SEMED",
                      value: 42300000,
                      fill: "var(--color-SEMED)",
                    },
                    {
                      name: "SEMINF",
                      value: 16200000,
                      fill: "var(--color-SEMINF)",
                    },
                    {
                      name: "SEMAS",
                      value: 7890000,
                      fill: "var(--color-SEMAS)",
                    },
                    {
                      name: "outros",
                      value: 12054500,
                      fill: "var(--color-outros)",
                    },
                  ]}
                  dataKey="value"
                  nameKey="name"
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
                      nameKey="name"
                      valueKey="value"
                      valueFormatter={formatMillions}
                    />
                  }
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabelas por Classificação */}
      <Tabs defaultValue="orgao" className="w-full" onValueChange={setViewMode}>
        <TabsList variant="line" className="w-full justify-start">
          <TabsTrigger value="orgao">Por Órgão</TabsTrigger>
          <TabsTrigger value="unidade">Por Unidade</TabsTrigger>
          <TabsTrigger value="funcao">Função/Subfunção</TabsTrigger>
          <TabsTrigger value="programa">Por Programa</TabsTrigger>
          <TabsTrigger value="acao">Por Ação</TabsTrigger>
          <TabsTrigger value="secretaria">Por Secretaria</TabsTrigger>
        </TabsList>

        {/* Tabela por Órgão */}
        <TabsContent value="orgao" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Execução por Órgão</CardTitle>
              <CardDescription>
                Despesa orçamentária por órgão da administração
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Código</TableHead>
                    <TableHead>Órgão</TableHead>
                    <TableHead className="text-right">Atualizada</TableHead>
                    <TableHead className="text-right">Empenhada</TableHead>
                    <TableHead className="text-right">A Empenhar</TableHead>
                    <TableHead className="text-right">Pago</TableHead>
                    <TableHead className="text-right">A Pagar</TableHead>
                    <TableHead className="w-32">Execução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosÓrgãos.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-xs">
                        {item.codigo}
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.atualizada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.empenhada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-muted-foreground">
                        {formatCurrency(item.aEmpenhar)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.pago)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-amber-600">
                        {formatCurrency(item.aPagar)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={calcPercent(item.empenhada, item.atualizada)}
                            className="h-2 flex-1"
                          />
                          <span className="w-10 text-right text-xs">
                            {calcPercent(item.empenhada, item.atualizada)}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold">
                      Total Geral
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold">
                      {formatCurrency(totais.atualizada)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold">
                      {formatCurrency(totais.empenhada)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold">
                      {formatCurrency(totais.aEmpenhar)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold">
                      {formatCurrency(totais.pago)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold">
                      {formatCurrency(totais.aPagar)}
                    </TableCell>
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
              <CardTitle>Execução por Unidade Orçamentária</CardTitle>
              <CardDescription>
                Despesa orcamentaria por unidade (Educacao)
              </CardDescription>
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
                    <TableHead className="w-32">Execução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosUnidades.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-xs">
                        {item.codigo}
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.atualizada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.empenhada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-muted-foreground">
                        {formatCurrency(item.aEmpenhar)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.pago)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-amber-600">
                        {formatCurrency(item.aPagar)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={calcPercent(item.empenhada, item.atualizada)}
                            className="h-2 flex-1"
                          />
                          <span className="w-10 text-right text-xs">
                            {calcPercent(item.empenhada, item.atualizada)}%
                          </span>
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
              <CardTitle>Execução por Função/Subfunção</CardTitle>
              <CardDescription>
                Classificação funcional da despesa
              </CardDescription>
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
                    <TableHead className="w-32">Execução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosFuncaoSubfuncao.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-xs">
                        {item.funcao}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {item.subfuncao}
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.atualizada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.empenhada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.pago)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={calcPercent(item.empenhada, item.atualizada)}
                            className="h-2 flex-1"
                          />
                          <span className="w-10 text-right text-xs">
                            {calcPercent(item.empenhada, item.atualizada)}%
                          </span>
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
              <CardTitle>Execução por Programa</CardTitle>
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
                    <TableHead className="w-32">Execução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosProgramas.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-xs">
                        {item.codigo}
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.atualizada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.empenhada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-muted-foreground">
                        {formatCurrency(item.aEmpenhar)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.pago)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-amber-600">
                        {formatCurrency(item.aPagar)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={calcPercent(item.empenhada, item.atualizada)}
                            className="h-2 flex-1"
                          />
                          <span className="w-10 text-right text-xs">
                            {calcPercent(item.empenhada, item.atualizada)}%
                          </span>
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
              <CardTitle>Execução por Ação</CardTitle>
              <CardDescription>
                Projetos e atividades orcamentarias
              </CardDescription>
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
                    <TableHead className="w-32">Execução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosAcoes.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="font-mono text-xs">
                        {item.codigo}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.tipo === "Projeto" ? "default" : "secondary"
                          }
                          className="text-xs"
                        >
                          {item.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.atualizada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.empenhada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.pago)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={calcPercent(item.empenhada, item.atualizada)}
                            className="h-2 flex-1"
                          />
                          <span className="w-10 text-right text-xs">
                            {calcPercent(item.empenhada, item.atualizada)}%
                          </span>
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
              <CardTitle>Execução por Secretaria</CardTitle>
              <CardDescription>
                Visao consolidada por secretaria
              </CardDescription>
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
                    <TableHead className="w-32">Execução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosSecretarias.map((item) => (
                    <TableRow key={item.sigla}>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-xs">
                          {item.sigla}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.atualizada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.empenhada)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-muted-foreground">
                        {formatCurrency(item.aEmpenhar)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCurrency(item.pago)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-amber-600">
                        {formatCurrency(item.aPagar)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={calcPercent(item.empenhada, item.atualizada)}
                            className="h-2 flex-1"
                          />
                          <span className="w-10 text-right text-xs">
                            {calcPercent(item.empenhada, item.atualizada)}%
                          </span>
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

      {/* Gráficos Adicionais */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Comparativo de Execução */}
        <Card>
          <CardHeader>
            <CardTitle>Comparativo de Execução por Secretaria</CardTitle>
            <CardDescription>Empenhado vs Pago por secretaria</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  empenhada: { label: "Empenhada", color: "var(--chart-1)" },
                  pago: { label: "Pago", color: "var(--chart-2)" },
                } satisfies ChartConfig
              }
              className="h-[300px] w-full"
            >
              <BarChart
                data={dadosSecretarias.slice(0, 5).map((s) => ({
                  sigla: s.sigla,
                  empenhada: s.empenhada,
                  pago: s.pago,
                }))}
                layout="vertical"
                margin={{ left: 60, right: 12 }}
              >
                <CartesianGrid horizontal={false} />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                />
                <YAxis
                  dataKey="sigla"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  }
                />
                <Bar
                  dataKey="empenhada"
                  fill="var(--color-empenhada)"
                  radius={[0, 4, 4, 0]}
                />
                <Bar
                  dataKey="pago"
                  fill="var(--color-pago)"
                  radius={[0, 4, 4, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Indicadores de Alerta */}
        <Card>
          <CardHeader>
            <CardTitle>Indicadores de Atenção</CardTitle>
            <CardDescription>Órgãos com execução abaixo de 90%</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dadosÓrgãos
              .filter((o) => calcPercent(o.empenhada, o.atualizada) < 90)
              .sort(
                (a, b) =>
                  calcPercent(a.empenhada, a.atualizada) -
                  calcPercent(b.empenhada, b.atualizada),
              )
              .map((item) => (
                <div key={item.codigo} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {item.codigo}
                      </Badge>
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

      {/* Comparativo Anual e Categorias de Despesa */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Evolução Histórica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Evolução Histórica (5 anos)
            </CardTitle>
            <CardDescription>
              Comparativo da execução orçamentária anual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  atualizada: { label: "Orçamento", color: "var(--chart-3)" },
                  empenhada: { label: "Empenhado", color: "var(--chart-1)" },
                  pago: { label: "Pago", color: "var(--chart-2)" },
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
                  dataKey="atualizada"
                  fill="var(--color-atualizada)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="empenhada"
                  fill="var(--color-empenhada)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="pago"
                  fill="var(--color-pago)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Categoria Economica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={PieChart02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Despesa por Categoria Economica
            </CardTitle>
            <CardDescription>
              Distribuicao por natureza da despesa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {treemapData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(item.value / totais.empenhada) * 100}%`,
                        backgroundColor: item.fill
                          .replace("var(--", "var(--color-")
                          .replace(")", ")")
                          .replace("--color-chart", "--chart"),
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">
                    {calcPercent(item.value, totais.empenhada)}% do total
                    empenhado
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
              <HugeiconsIcon
                icon={SecurityCheckIcon}
                strokeWidth={2}
                className="size-5"
              />
              Despesas por Modalidade de Licitação
            </CardTitle>
            <CardDescription>
              Quantidade e valores por modalidade
            </CardDescription>
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
                    <TableCell className="font-medium">
                      {item.modalidade}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{item.quantidade}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.valor)}
                    </TableCell>
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
              <HugeiconsIcon
                icon={UserMultipleIcon}
                strokeWidth={2}
                className="size-5"
              />
              Principais Fornecedores
            </CardTitle>
            <CardDescription>
              Top 5 fornecedores por valor contratado
            </CardDescription>
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
                      <span className="text-sm font-semibold">
                        {formatCurrency(fornecedor.valor)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {fornecedor.cnpj}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {fornecedor.percentual}%
                      </Badge>
                    </div>
                    <Progress
                      value={fornecedor.percentual * 5}
                      className="h-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metas ODS */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Target01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Alinhamento com Objetivos de Desenvolvimento Sustentavel
            </CardTitle>
            <CardDescription>
              Execução orçamentária vinculada aos ODS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {metasODS.map((meta, index) => (
                <div key={index} className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <HugeiconsIcon
                        icon={
                          meta.ods === "ODS 3"
                            ? HeartCheckIcon
                            : meta.ods === "ODS 4"
                              ? GraduationScrollIcon
                              : meta.ods === "ODS 11"
                                ? Building04Icon
                                : StarIcon
                        }
                        strokeWidth={2}
                        className="size-5 text-primary"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{meta.ods}</p>
                      <p className="text-xs text-muted-foreground">
                        {meta.titulo}
                      </p>
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
      </div>

      {/* Rigidez Orçamentária e Limite de Pessoal LRF */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Rigidez Orçamentária */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={SecurityCheckIcon}
                strokeWidth={2}
                className="size-5"
              />
              Rigidez Orçamentária
            </CardTitle>
            <CardDescription>
              Índice de rigidez:{" "}
              <strong
                className={
                  Number(percentualRigidez) > 70
                    ? "text-red-600"
                    : "text-amber-600"
                }
              >
                {percentualRigidez}%
              </strong>{" "}
              — Despesas obrigatorias sobre o total empenhado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-xs text-muted-foreground">Obrigatorias</p>
                  <p className="text-lg font-bold text-red-600">
                    {formatMillions(totalObrigatoria)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {percentualRigidez}%
                  </p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-xs text-muted-foreground">
                    Discricionarias
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {formatMillions(totalDiscricionaria)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(100 - Number(percentualRigidez)).toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {rigidezOrcamentaria.map((item) => (
                  <div
                    key={item.categoria}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`size-2 rounded-full ${item.tipo === "obrigatoria" ? "bg-red-500" : "bg-green-500"}`}
                      />
                      <span className="text-muted-foreground">
                        {item.categoria}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {formatMillions(item.valor)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {((item.valor / totais.empenhada) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Limite de Pessoal - LRF */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={UserMultipleIcon}
                strokeWidth={2}
                className="size-5"
              />
              Limite de Pessoal (LRF)
            </CardTitle>
            <CardDescription>
              Despesa com pessoal:{" "}
              <strong className="text-green-600">
                {percentualPessoalRCL}%
              </strong>{" "}
              da RCL — Limite maximo: {limiteMaximo}%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Atual ({percentualPessoalRCL}%)
                  </span>
                  <span className="text-muted-foreground">
                    Limite Prudencial ({limitePrudencial}%)
                  </span>
                  <span className="text-muted-foreground">
                    Maximo ({limiteMaximo}%)
                  </span>
                </div>
                <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="absolute h-full rounded-full bg-green-500 transition-all"
                    style={{
                      width: `${(Number(percentualPessoalRCL) / limiteMaximo) * 100}%`,
                    }}
                  />
                  <div
                    className="absolute h-full w-px bg-amber-500"
                    style={{
                      left: `${(limitePrudencial / limiteMaximo) * 100}%`,
                    }}
                  />
                  <div
                    className="absolute h-full w-px bg-red-500"
                    style={{ left: "100%" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>
                    Margem:{" "}
                    {(limiteMaximo - Number(percentualPessoalRCL)).toFixed(1)}{" "}
                    p.p.
                  </span>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-xs text-muted-foreground">Desp. Pessoal</p>
                  <p className="text-sm font-bold">
                    {formatMillions(despesaPessoalTotal)}
                  </p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-xs text-muted-foreground">RCL</p>
                  <p className="text-sm font-bold">
                    {formatMillions(receitaCorrenteLiquida)}
                  </p>
                </div>
                <div className="rounded-lg border p-3 text-center bg-green-50 dark:bg-green-950/20">
                  <p className="text-xs text-muted-foreground">Situacao</p>
                  <p className="text-sm font-bold text-green-600">Adequado</p>
                </div>
              </div>
              <ChartContainer
                config={
                  {
                    pessoal: {
                      label: "% Pessoal/RCL",
                      color: "var(--chart-1)",
                    },
                  } satisfies ChartConfig
                }
                className="h-[140px] w-full"
              >
                <LineChart
                  data={evolucaoPessoalRCL}
                  margin={{ left: 0, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="periodo"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    domain={[28, 56]}
                    tickFormatter={(v: number) => `${v}%`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent formatter={(value) => `${value}%`} />
                    }
                  />
                  <Line
                    dataKey="pessoal"
                    type="monotone"
                    stroke="var(--color-pessoal)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Despesa Corrente vs Capital e Restos a Pagar Aging */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Despesa Corrente vs Capital */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={PieChart02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Despesa Corrente vs Capital
            </CardTitle>
            <CardDescription>
              Composição por categoria econômica
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
                    data={despesaCorrenteCapitalChart}
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
                {despesaCorrenteCapital.map((cat) => (
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

        {/* Restos a Pagar - Faixas de Vencimento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Clock01Icon}
                strokeWidth={2}
                className="size-5"
              />
              Restos a Pagar — Faixas de vencimento
            </CardTitle>
            <CardDescription>
              Total: <strong>{formatCurrency(totalRestosGeral)}</strong> —
              Processados: {formatMillions(totalRestosProcessados)} | Não
              processados: {formatMillions(totalRestosNaoProcessados)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Faixa</TableHead>
                  <TableHead className="text-right">Processados</TableHead>
                  <TableHead className="text-right">Não Proc.</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Risco</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {restosAPagarAging.map((item) => (
                  <TableRow key={item.faixa}>
                    <TableCell className="font-medium">{item.faixa}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.processados)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.naoProcessados)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(item.total)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          item.risco === "critico"
                            ? "destructive"
                            : item.risco === "alto"
                              ? "destructive"
                              : item.risco === "medio"
                                ? "outline"
                                : "secondary"
                        }
                        className={
                          item.risco === "critico"
                            ? ""
                            : item.risco === "alto"
                              ? ""
                              : item.risco === "medio"
                                ? "text-amber-600"
                                : "text-green-600"
                        }
                      >
                        {item.risco.charAt(0).toUpperCase() +
                          item.risco.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(totalRestosProcessados)}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(totalRestosNaoProcessados)}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(totalRestosGeral)}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Projecao de Execucao e Benchmark */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Projecao de Execucao por Secretaria */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Projeção de Execução
            </CardTitle>
            <CardDescription>
              Execução atual e projetada por secretaria — Meta: 95%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projecaoExecucao.map((item) => (
                <div key={item.secretaria} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {item.secretaria}
                      </Badge>
                      {item.status === "critico" && (
                        <HugeiconsIcon
                          icon={Alert02Icon}
                          strokeWidth={2}
                          className="size-3.5 text-red-500"
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">
                        Atual: {item.atual}%
                      </span>
                      <span className="font-medium">
                        → Proj: {item.projetado}%
                      </span>
                      <Badge
                        variant={
                          item.status === "atingido"
                            ? "secondary"
                            : item.status === "atencao"
                              ? "outline"
                              : "destructive"
                        }
                        className={
                          item.status === "atingido"
                            ? "text-green-600"
                            : item.status === "atencao"
                              ? "text-amber-600"
                              : ""
                        }
                      >
                        {item.status === "atingido"
                          ? "OK"
                          : item.status === "atencao"
                            ? "Atenção"
                            : "Crítico"}
                      </Badge>
                    </div>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`absolute h-full rounded-full transition-all ${
                        item.status === "atingido"
                          ? "bg-green-500"
                          : item.status === "atencao"
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${item.atual}%` }}
                    />
                    <div
                      className="absolute h-full rounded-full bg-primary/20"
                      style={{
                        left: `${item.atual}%`,
                        width: `${item.projetado - item.atual}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benchmark Municipal */}
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
                  <TableHead className="text-right">Execução</TableHead>
                  <TableHead className="text-right">Pessoal/RCL</TableHead>
                  <TableHead className="text-right">Investim.</TableHead>
                  <TableHead className="text-right">Restos AP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {benchmarkDespesa.map((mun) => (
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
                      {mun.execucao}%
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          mun.pessoalRCL > 40 ? "destructive" : "secondary"
                        }
                        className={mun.pessoalRCL > 40 ? "" : "text-green-600"}
                      >
                        {mun.pessoalRCL}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {mun.investimento}%
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          mun.restosAPagar > 15
                            ? "destructive"
                            : mun.restosAPagar > 10
                              ? "outline"
                              : "secondary"
                        }
                        className={
                          mun.restosAPagar > 15
                            ? ""
                            : mun.restosAPagar > 10
                              ? "text-amber-600"
                              : "text-green-600"
                        }
                      >
                        {mun.restosAPagar}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border p-3 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Posicao Geral
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">2o</span>
                  <span className="text-xs text-muted-foreground">
                    de 5 municípios
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Destaque em controle de pessoal e restos a pagar
                </p>
              </div>
              <div className="rounded-lg border p-3 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Ponto de Melhoria
                </p>
                <p className="text-sm font-medium text-amber-600">
                  Investimentos
                </p>
                <p className="text-xs text-muted-foreground">
                  12.6% vs 14.8% do melhor comparado — oportunidade de ampliacao
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline de Eventos */}
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
          <CardDescription>Ultimas movimentacoes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventosRecentes.map((evento, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`size-2.5 rounded-full ${
                      evento.tipo === "empenho"
                        ? "bg-blue-500"
                        : evento.tipo === "pagamento"
                          ? "bg-green-500"
                          : evento.tipo === "licitacao"
                            ? "bg-amber-500"
                            : evento.tipo === "liquidacao"
                              ? "bg-purple-500"
                              : "bg-gray-500"
                    }`}
                  />
                  {index < eventosRecentes.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-xs text-muted-foreground">{evento.data}</p>
                  <p className="text-sm">{evento.evento}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {evento.secretaria}
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
