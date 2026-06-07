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
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserMultipleIcon,
  Wallet01Icon,
  AddMoneyCircleIcon,
  Clock01Icon,
  ArrowUp01Icon,
  FilterIcon,
  Download01Icon,
  RefreshIcon,
  Building04Icon,
  GraduationScrollIcon,
  HeartCheckIcon,
  UserIcon,
  Analytics01Icon,
  PieChart02Icon,
  ChartLineData02Icon,
  Calendar01Icon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  InformationCircleIcon,
  Target01Icon,
  BulbIcon,
  SecurityCheckIcon,
  UserCheckIcon,
  UserBlockIcon,
  TimeQuarterPassIcon,
  MoneyReceiveSquareIcon,
  MoneySend01Icon,
  CoinsDollarIcon,
  PercentSquareIcon,
  GroupIcon,
  UserAdd01Icon,
  UserRemove01Icon,
} from "@hugeicons/core-free-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { KpiCard } from "@/components/ui/kpi-card";

// Dados fictícios para demonstração
const dadosSecretarias = [
  {
    codigo: "SEMED",
    nome: "Secretaria de Educação",
    funcionarios: 298,
    salarioTotal: 2850000,
    horasExtras: 185000,
    absenteismo: 4.2,
    turnover: 6.8,
    vagas: 12,
    cor: "#3b82f6",
  },
  {
    codigo: "SEMSA",
    nome: "Secretaria de Saúde",
    funcionarios: 195,
    salarioTotal: 2340000,
    horasExtras: 320000,
    absenteismo: 7.8,
    turnover: 12.5,
    vagas: 28,
    cor: "#ef4444",
  },
  {
    codigo: "SEMINF",
    nome: "Secretaria de Infraestrutura",
    funcionarios: 142,
    salarioTotal: 1120000,
    horasExtras: 95000,
    absenteismo: 3.5,
    turnover: 8.2,
    vagas: 8,
    cor: "#22c55e",
  },
  {
    codigo: "SEMAD",
    nome: "Secretaria de Administração",
    funcionarios: 125,
    salarioTotal: 980000,
    horasExtras: 45000,
    absenteismo: 2.8,
    turnover: 4.5,
    vagas: 5,
    cor: "#f59e0b",
  },
  {
    codigo: "SEMFAZ",
    nome: "Secretaria de Fazenda",
    funcionarios: 78,
    salarioTotal: 720000,
    horasExtras: 28000,
    absenteismo: 2.1,
    turnover: 3.2,
    vagas: 3,
    cor: "#8b5cf6",
  },
  {
    codigo: "SEMTUR",
    nome: "Secretaria de Turismo",
    funcionarios: 45,
    salarioTotal: 380000,
    horasExtras: 15000,
    absenteismo: 3.0,
    turnover: 5.5,
    vagas: 2,
    cor: "#ec4899",
  },
  {
    codigo: "GAB",
    nome: "Gabinete do Prefeito",
    funcionarios: 62,
    salarioTotal: 580000,
    horasExtras: 22000,
    absenteismo: 1.8,
    turnover: 2.5,
    vagas: 1,
    cor: "#06b6d4",
  },
  {
    codigo: "PROCUR",
    nome: "Procuradoria Municipal",
    funcionarios: 28,
    salarioTotal: 340000,
    horasExtras: 12000,
    absenteismo: 1.5,
    turnover: 1.8,
    vagas: 1,
    cor: "#84cc16",
  },
  {
    codigo: "CONTROL",
    nome: "Controladoria",
    funcionarios: 35,
    salarioTotal: 310000,
    horasExtras: 10000,
    absenteismo: 1.9,
    turnover: 2.0,
    vagas: 1,
    cor: "#f97316",
  },
  {
    codigo: "OUTROS",
    nome: "Outros Órgãos",
    funcionarios: 122,
    salarioTotal: 890000,
    horasExtras: 35000,
    absenteismo: 3.2,
    turnover: 5.0,
    vagas: 4,
    cor: "#64748b",
  },
];

// Dados de folha de pagamento
const dadosFolha = {
  totalFuncionarios: 1130,
  salarioBase: 9500000,
  horasExtras: 767000,
  adicionais: 285000,
  beneficios: 450000,
  descontos: 1420000,
  salarioLiquido: 8582000,
  inss: 950000,
  irrf: 320000,
  outrosDescontos: 150000,
};

// Evolução mensal da folha
const evolucaoFolha = [
  { mes: "Jan", salario: 9200000, extras: 680000, beneficios: 420000 },
  { mes: "Fev", salario: 9250000, extras: 720000, beneficios: 425000 },
  { mes: "Mar", salario: 9300000, extras: 750000, beneficios: 430000 },
  { mes: "Abr", salario: 9350000, extras: 690000, beneficios: 435000 },
  { mes: "Mai", salario: 9400000, extras: 710000, beneficios: 440000 },
  { mes: "Jun", salario: 9450000, extras: 730000, beneficios: 445000 },
  { mes: "Jul", salario: 9500000, extras: 780000, beneficios: 450000 },
  { mes: "Ago", salario: 9550000, extras: 760000, beneficios: 455000 },
  { mes: "Set", salario: 9600000, extras: 740000, beneficios: 460000 },
  { mes: "Out", salario: 9650000, extras: 720000, beneficios: 465000 },
  { mes: "Nov", salario: 9700000, extras: 767000, beneficios: 470000 },
];

// Absenteísmo mensal
const absenteismoMensal = [
  { mes: "Jan", taxa: 3.8, faltas: 156 },
  { mes: "Fev", taxa: 4.1, faltas: 168 },
  { mes: "Mar", taxa: 4.5, faltas: 185 },
  { mes: "Abr", taxa: 3.9, faltas: 160 },
  { mes: "Mai", taxa: 4.2, faltas: 172 },
  { mes: "Jun", taxa: 4.8, faltas: 197 },
  { mes: "Jul", taxa: 5.2, faltas: 213 },
  { mes: "Ago", taxa: 4.6, faltas: 189 },
  { mes: "Set", taxa: 4.0, faltas: 164 },
  { mes: "Out", taxa: 3.7, faltas: 152 },
  { mes: "Nov", taxa: 4.3, faltas: 176 },
];

// Turnover mensal
const turnoverMensal = [
  { mes: "Jan", admissoes: 8, demissoes: 5, saldo: 3 },
  { mes: "Fev", admissoes: 12, demissoes: 7, saldo: 5 },
  { mes: "Mar", admissoes: 15, demissoes: 10, saldo: 5 },
  { mes: "Abr", admissoes: 6, demissoes: 8, saldo: -2 },
  { mes: "Mai", admissoes: 10, demissoes: 6, saldo: 4 },
  { mes: "Jun", admissoes: 18, demissoes: 12, saldo: 6 },
  { mes: "Jul", admissoes: 22, demissoes: 15, saldo: 7 },
  { mes: "Ago", admissoes: 14, demissoes: 9, saldo: 5 },
  { mes: "Set", admissoes: 8, demissoes: 11, saldo: -3 },
  { mes: "Out", admissoes: 11, demissoes: 7, saldo: 4 },
  { mes: "Nov", admissoes: 9, demissoes: 6, saldo: 3 },
];

// Distribuição por cargo/função
const distribuicaoCargo = [
  { cargo: "Professores", quantidade: 245, percentual: 21.7 },
  { cargo: "Agentes de Saúde", quantidade: 98, percentual: 8.7 },
  { cargo: "Médicos", quantidade: 42, percentual: 3.7 },
  { cargo: "Enfermeiros", quantidade: 35, percentual: 3.1 },
  { cargo: "Motoristas", quantidade: 85, percentual: 7.5 },
  { cargo: "Auxiliares Administrativos", quantidade: 180, percentual: 15.9 },
  { cargo: "Técnicos", quantidade: 120, percentual: 10.6 },
  { cargo: "Engenheiros", quantidade: 18, percentual: 1.6 },
  { cargo: "Advogados", quantidade: 22, percentual: 1.9 },
  { cargo: "Contadores", quantidade: 15, percentual: 1.3 },
  { cargo: "Outros", quantidade: 270, percentual: 23.9 },
];

// Verbas e proventos detalhados
const verbasProventos = [
  {
    codigo: "101",
    descricao: "Salário Base",
    valor: 9500000,
    tipo: "provento",
  },
  {
    codigo: "121",
    descricao: "Horas Extras 50%",
    valor: 420000,
    tipo: "provento",
  },
  {
    codigo: "122",
    descricao: "Horas Extras 100%",
    valor: 347000,
    tipo: "provento",
  },
  {
    codigo: "131",
    descricao: "Adicional Noturno",
    valor: 85000,
    tipo: "provento",
  },
  {
    codigo: "141",
    descricao: "Insalubridade",
    valor: 125000,
    tipo: "provento",
  },
  {
    codigo: "142",
    descricao: "Periculosidade",
    valor: 45000,
    tipo: "provento",
  },
  {
    codigo: "151",
    descricao: "Vale Alimentação",
    valor: 280000,
    tipo: "provento",
  },
  {
    codigo: "152",
    descricao: "Vale Transporte",
    valor: 170000,
    tipo: "provento",
  },
  {
    codigo: "401",
    descricao: "INSS Previdenciário",
    valor: 950000,
    tipo: "desconto",
  },
  { codigo: "402", descricao: "IRRF", valor: 320000, tipo: "desconto" },
  {
    codigo: "403",
    descricao: "Contribuição Sindical",
    valor: 45000,
    tipo: "desconto",
  },
  {
    codigo: "404",
    descricao: "Pensão Alimentícia",
    valor: 85000,
    tipo: "desconto",
  },
  {
    codigo: "405",
    descricao: "Plano de Saúde",
    valor: 20000,
    tipo: "desconto",
  },
];

// Metas e indicadores de RH
const metasRH = [
  {
    indicador: "Taxa de Absenteísmo",
    meta: 4.0,
    realizado: 4.3,
    unidade: "%",
    status: "atencao",
    descricao: "Meta mensal de absenteísmo",
  },
  {
    indicador: "Turnover Anual",
    meta: 10,
    realizado: 8.5,
    unidade: "%",
    status: "atingido",
    descricao: "Rotatividade de pessoal",
  },
  {
    indicador: "Horas Extras",
    meta: 600000,
    realizado: 767000,
    unidade: "R$",
    status: "atencao",
    descricao: "Limite mensal de HE",
  },
  {
    indicador: "Vagas Preenchidas",
    meta: 85,
    realizado: 92,
    unidade: "%",
    status: "atingido",
    descricao: "Taxa de preenchimento",
  },
  {
    indicador: "Treinamentos",
    meta: 40,
    realizado: 38,
    unidade: "h/ano",
    status: "atencao",
    descricao: "Carga horária de capacitação",
  },
  {
    indicador: "Avaliação de Desempenho",
    meta: 100,
    realizado: 87,
    unidade: "%",
    status: "atencao",
    descricao: "Funcionários avaliados",
  },
];

// Dados de People Analytics
const peopleAnalytics = {
  // Distribuição por sexo
  sexo: [
    { sexo: "Feminino", quantidade: 612, percentual: 54.2 },
    { sexo: "Masculino", quantidade: 518, percentual: 45.8 },
  ],
  // Distribuição por raça/cor
  racaCor: [
    { raca: "Parda", quantidade: 485, percentual: 42.9 },
    { raca: "Branca", quantidade: 398, percentual: 35.2 },
    { raca: "Preta", quantidade: 175, percentual: 15.5 },
    { raca: "Indígena", quantidade: 42, percentual: 3.7 },
    { raca: "Amarela", quantidade: 18, percentual: 1.6 },
    { raca: "Não declarada", quantidade: 12, percentual: 1.1 },
  ],
  // Faixa etária
  faixaEtaria: [
    { faixa: "18-25 anos", quantidade: 85, percentual: 7.5 },
    { faixa: "26-35 anos", quantidade: 285, percentual: 25.2 },
    { faixa: "36-45 anos", quantidade: 342, percentual: 30.3 },
    { faixa: "46-55 anos", quantidade: 298, percentual: 26.4 },
    { faixa: "56-65 anos", quantidade: 98, percentual: 8.7 },
    { faixa: "Acima 65", quantidade: 22, percentual: 1.9 },
  ],
  // Escolaridade
  escolaridade: [
    { nivel: "Ensino Fundamental", quantidade: 125, percentual: 11.1 },
    { nivel: "Ensino Médio", quantidade: 385, percentual: 34.1 },
    { nivel: "Técnico", quantidade: 198, percentual: 17.5 },
    { nivel: "Superior Incompleto", quantidade: 82, percentual: 7.3 },
    { nivel: "Superior Completo", quantidade: 285, percentual: 25.2 },
    { nivel: "Pós-Graduação", quantidade: 45, percentual: 4.0 },
    { nivel: "Mestrado/Doutorado", quantidade: 10, percentual: 0.9 },
  ],
  // Tempo de serviço
  tempoServico: [
    { faixa: "0-2 anos", quantidade: 185, percentual: 16.4 },
    { faixa: "3-5 anos", quantidade: 198, percentual: 17.5 },
    { faixa: "6-10 anos", quantidade: 265, percentual: 23.5 },
    { faixa: "11-15 anos", quantidade: 215, percentual: 19.0 },
    { faixa: "16-20 anos", quantidade: 152, percentual: 13.5 },
    { faixa: "Mais 20 anos", quantidade: 115, percentual: 10.2 },
  ],
  // Distribuição por tipo de vínculo
  tipoVinculo: [
    { tipo: "Concursado Efetivo", quantidade: 685, percentual: 60.6 },
    { tipo: "Concursado Estável", quantidade: 198, percentual: 17.5 },
    { tipo: "Comissionado", quantidade: 145, percentual: 12.8 },
    { tipo: "Temporário", quantidade: 72, percentual: 6.4 },
    { tipo: "Estagiário", quantidade: 30, percentual: 2.7 },
  ],
  // PCD
  pcd: [
    { tipo: "Com Deficiência", quantidade: 45, percentual: 4.0 },
    { tipo: "Sem Deficiência", quantidade: 1085, percentual: 96.0 },
  ],
};

// Alertas de RH
const alertasRH = [
  {
    tipo: "warning",
    titulo: "Alto Absenteísmo na Saúde",
    descricao:
      "A Secretaria de Saúde apresenta taxa de absenteísmo de 7.8%, acima da meta de 4%.",
    setor: "SEMSA",
  },
  {
    tipo: "warning",
    titulo: "Excesso de Horas Extras",
    descricao:
      "Horas extras do mês superam o limite orçado em 27.8%, totalizando R$ 767.000.",
    setor: "Geral",
  },
  {
    tipo: "info",
    titulo: "Vagas em Aberto",
    descricao:
      "Existem 64 vagas não preenchidas, sendo 28 na Secretaria de Saúde.",
    setor: "Geral",
  },
  {
    tipo: "success",
    titulo: "Meta de Diversidade Atingida",
    descricao:
      "54.2% do quadro é composto por mulheres, superando meta de 50%.",
    setor: "Geral",
  },
];

// Timeline de eventos de RH
const eventosRH = [
  {
    data: "28/11/2024",
    evento: "Concurso Público - Resultado Final",
    tipo: "concurso",
    detalhe: "98 aprovados",
  },
  {
    data: "25/11/2024",
    evento: "Capacitação em Atendimento ao Público",
    tipo: "treinamento",
    detalhe: "45 participantes",
  },
  {
    data: "22/11/2024",
    evento: "Admissões do Mês",
    tipo: "admissao",
    detalhe: "9 novos servidores",
  },
  {
    data: "20/11/2024",
    evento: "Avaliação de Desempenho - 3º Trimestre",
    tipo: "avaliacao",
    detalhe: "87% concluída",
  },
  {
    data: "18/11/2024",
    evento: "Homologação de Férias",
    tipo: "ferias",
    detalhe: "125 servidores",
  },
];

// Limite de Pessoal (LRF)
const limitePessoalLRF = {
  receitaCorrenteLiquida: 180000000,
  limiteMaximo: 97200000, // 54% da RCL
  limiteAlerta: 87480000, // 48.6% da RCL (90% do limite)
  limitePrudencial: 92340000, // 51.3% da RCL (95% do limite)
  despesaPessoal: 82800000, // 46% da RCL
  percentualAtual: 46.0,
  evolucaoTrimestral: [
    { trimestre: "1T 2023", percentual: 44.2, valor: 79560000 },
    { trimestre: "2T 2023", percentual: 44.8, valor: 80640000 },
    { trimestre: "3T 2023", percentual: 45.1, valor: 81180000 },
    { trimestre: "4T 2023", percentual: 45.5, valor: 81900000 },
    { trimestre: "1T 2024", percentual: 45.3, valor: 81540000 },
    { trimestre: "2T 2024", percentual: 45.8, valor: 82440000 },
    { trimestre: "3T 2024", percentual: 46.0, valor: 82800000 },
  ],
};

// Custo por Funcionário por Secretaria
const custoPorFuncionario = dadosSecretarias
  .map((s) => ({
    secretaria: s.codigo,
    nome: s.nome,
    funcionarios: s.funcionarios,
    custoTotal: s.salarioTotal + s.horasExtras,
    custoMedio: Math.round((s.salarioTotal + s.horasExtras) / s.funcionarios),
    custoHE: Math.round(s.horasExtras / s.funcionarios),
    percentualHE: (
      (s.horasExtras / (s.salarioTotal + s.horasExtras)) *
      100
    ).toFixed(1),
  }))
  .sort((a, b) => b.custoMedio - a.custoMedio);

// Projeção de Aposentadorias
const projecaoAposentadorias = [
  {
    ano: "2025",
    quantidade: 28,
    impactoFolha: 2100000,
    cargos: "Professores (12), Administrativos (8), Técnicos (8)",
  },
  {
    ano: "2026",
    quantidade: 35,
    impactoFolha: 2650000,
    cargos: "Professores (15), Saúde (10), Motoristas (10)",
  },
  {
    ano: "2027",
    quantidade: 42,
    impactoFolha: 3200000,
    cargos: "Professores (18), Administrativos (12), Técnicos (12)",
  },
  {
    ano: "2028",
    quantidade: 38,
    impactoFolha: 2900000,
    cargos: "Saúde (16), Professores (12), Engenheiros (10)",
  },
  {
    ano: "2029",
    quantidade: 45,
    impactoFolha: 3500000,
    cargos: "Professores (20), Administrativos (15), Saúde (10)",
  },
];
const totalAposentadorias5Anos = projecaoAposentadorias.reduce(
  (a, b) => a + b.quantidade,
  0,
);
const percentualQuadro = ((totalAposentadorias5Anos / 1130) * 100).toFixed(1);

// Benchmark de RH Municipal
const benchmarkRH = [
  {
    municipio: "Município Atual",
    custoMedio: 9513,
    absenteismo: 4.3,
    turnover: 8.5,
    hePercent: 7.3,
    capacitacao: 38,
    destaque: true,
  },
  {
    municipio: "Município A (Similar)",
    custoMedio: 10200,
    absenteismo: 5.1,
    turnover: 12.0,
    hePercent: 9.8,
    capacitacao: 32,
    destaque: false,
  },
  {
    municipio: "Município B (Similar)",
    custoMedio: 9800,
    absenteismo: 3.8,
    turnover: 7.2,
    hePercent: 6.5,
    capacitacao: 45,
    destaque: false,
  },
  {
    municipio: "Município C (Similar)",
    custoMedio: 11500,
    absenteismo: 6.2,
    turnover: 15.0,
    hePercent: 12.1,
    capacitacao: 28,
    destaque: false,
  },
  {
    municipio: "Média Regional",
    custoMedio: 10250,
    absenteismo: 4.8,
    turnover: 10.7,
    hePercent: 8.9,
    capacitacao: 35,
    destaque: false,
  },
];

// Capacitação e Desenvolvimento
const capacitacaoDesenvolvimento = [
  {
    programa: "Atendimento ao Público",
    horas: 320,
    participantes: 180,
    investimento: 48000,
    conclusao: 92,
  },
  {
    programa: "Gestão de Processos",
    horas: 240,
    participantes: 85,
    investimento: 65000,
    conclusao: 88,
  },
  {
    programa: "Tecnologia da Informação",
    horas: 160,
    participantes: 120,
    investimento: 42000,
    conclusao: 95,
  },
  {
    programa: "Liderança e Gestão",
    horas: 200,
    participantes: 45,
    investimento: 85000,
    conclusao: 82,
  },
  {
    programa: "Saúde e Segurança",
    horas: 280,
    participantes: 195,
    investimento: 35000,
    conclusao: 97,
  },
  {
    programa: "Legislação Municipal",
    horas: 120,
    participantes: 68,
    investimento: 28000,
    conclusao: 90,
  },
];
const totalHorasCapacitacao = capacitacaoDesenvolvimento.reduce(
  (a, b) => a + b.horas,
  0,
);
const totalInvestimentoCapacitacao = capacitacaoDesenvolvimento.reduce(
  (a, b) => a + b.investimento,
  0,
);
const totalParticipantes = capacitacaoDesenvolvimento.reduce(
  (a, b) => a + b.participantes,
  0,
);

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

// Configuração dos gráficos
const chartConfig = {
  funcionarios: {
    label: "Funcionários",
    color: "var(--chart-1)",
  },
  salario: {
    label: "Salários",
    color: "var(--chart-1)",
  },
  extras: {
    label: "Horas Extras",
    color: "var(--chart-2)",
  },
  beneficios: {
    label: "Benefícios",
    color: "var(--chart-3)",
  },
  adicionais: {
    label: "Adicionais",
    color: "var(--chart-4)",
  },
  absenteismo: {
    label: "Absenteísmo",
    color: "var(--chart-5)",
  },
  admissoes: {
    label: "Admissões",
    color: "var(--chart-1)",
  },
  demissoes: {
    label: "Demissões",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function RHMunicipal() {
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024");
  const [abaSelecionada, setAbaSelecionada] = React.useState("folha");

  // Cálculos totais
  const totalFuncionarios = dadosSecretarias.reduce(
    (acc, s) => acc + s.funcionarios,
    0,
  );
  const totalSalarios = dadosSecretarias.reduce(
    (acc, s) => acc + s.salarioTotal,
    0,
  );
  const totalHorasExtras = dadosSecretarias.reduce(
    (acc, s) => acc + s.horasExtras,
    0,
  );
  const totalVagas = dadosSecretarias.reduce((acc, s) => acc + s.vagas, 0);

  return (
    <div className="space-y-8">
      {/* Header com filtros */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Gestão de RH Municipal
          </h2>
          <p className="text-muted-foreground">
            Recursos Humanos e Folha de Pagamento
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total de Funcionários"
          icon={UserMultipleIcon}
          value={totalFuncionarios.toLocaleString("pt-BR")}
          borderColor="border-l-blue-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-green-600"
              />
              <span className="text-green-600">+3.2%</span>
              <span>vs {Number(periodoSelecionado) - 1}</span>
            </div>
          }
        />
        <KpiCard
          title="Folha de Pagamento"
          icon={Wallet01Icon}
          value={formatMillions(
            dadosFolha.salarioBase +
              dadosFolha.horasExtras +
              dadosFolha.adicionais,
          )}
          borderColor="border-l-green-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-green-600"
              />
              <span className="text-green-600">+5.8%</span>
              <span>vs. mês anterior</span>
            </div>
          }
        />
        <KpiCard
          title="Horas Extras"
          icon={Clock01Icon}
          value={formatCurrency(dadosFolha.horasExtras)}
          borderColor="border-l-amber-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="text-amber-600 font-medium">127.8%</span>
              <span>do limite</span>
            </div>
          }
        />
        <KpiCard
          title="Absenteísmo"
          icon={PercentSquareIcon}
          value="4.3%"
          borderColor="border-l-purple-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3 text-red-600"
              />
              <span className="text-red-600">+0.3pp</span>
              <span>acima da meta</span>
            </div>
          }
        />
      </div>

      {/* KPIs Secundários */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Educação"
          icon={GraduationScrollIcon}
          value="298"
          borderColor="border-l-blue-500"
          footer={
            <p className="text-xs text-muted-foreground">26.4% do quadro</p>
          }
        />
        <KpiCard
          title="Saúde"
          icon={HeartCheckIcon}
          value="195"
          borderColor="border-l-green-500"
          footer={
            <p className="text-xs text-muted-foreground">17.3% do quadro</p>
          }
        />
        <KpiCard
          title="Admissões (Mês)"
          icon={UserAdd01Icon}
          value="9"
          borderColor="border-l-emerald-500"
          footer={
            <p className="text-xs text-muted-foreground">+3 saldo líquido</p>
          }
        />
        <KpiCard
          title="Turnover"
          icon={UserRemove01Icon}
          value="8.5%"
          borderColor="border-l-purple-500"
          footer={
            <p className="text-xs text-muted-foreground">Meta: 10% a.a.</p>
          }
        />
      </div>

      {/* Gráficos e Tabelas */}
      <Tabs
        value={abaSelecionada}
        onValueChange={setAbaSelecionada}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="folha">Folha de Pagamento</TabsTrigger>
          <TabsTrigger value="secretarias">Secretarias</TabsTrigger>
          <TabsTrigger value="indicadores">Indicadores</TabsTrigger>
          <TabsTrigger value="verbas">Verbas</TabsTrigger>
          <TabsTrigger value="analytics">Análise de Pessoas</TabsTrigger>
        </TabsList>

        {/* Tab Folha de Pagamento */}
        <TabsContent value="folha" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Evolução da Folha */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={ChartLineData02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Evolução da Folha de Pagamento
                </CardTitle>
                <CardDescription>Valores mensais em R$</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[300px] w-full"
                >
                  <AreaChart data={evolucaoFolha}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="mes"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        `${(value / 1000000).toFixed(1)}M`
                      }
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="salario"
                      stackId="1"
                      stroke="var(--chart-1)"
                      fill="var(--chart-1)"
                      fillOpacity={0.6}
                      name="Salários"
                    />
                    <Area
                      type="monotone"
                      dataKey="extras"
                      stackId="1"
                      stroke="var(--chart-2)"
                      fill="var(--chart-2)"
                      fillOpacity={0.6}
                      name="Horas Extras"
                    />
                    <Area
                      type="monotone"
                      dataKey="beneficios"
                      stackId="1"
                      stroke="var(--chart-3)"
                      fill="var(--chart-3)"
                      fillOpacity={0.6}
                      name="Benefícios"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Composição da Folha */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={PieChart02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Composição da Folha
                </CardTitle>
                <CardDescription>Distribuição dos componentes</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[300px] w-full"
                >
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Salário Base",
                          value: dadosFolha.salarioBase,
                          fill: "var(--chart-1)",
                        },
                        {
                          name: "Horas Extras",
                          value: dadosFolha.horasExtras,
                          fill: "var(--chart-2)",
                        },
                        {
                          name: "Adicionais",
                          value: dadosFolha.adicionais,
                          fill: "var(--chart-3)",
                        },
                        {
                          name: "Benefícios",
                          value: dadosFolha.beneficios,
                          fill: "var(--chart-4)",
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-[var(--chart-1)]" />
                    <span>
                      Salário Base: {formatMillions(dadosFolha.salarioBase)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-[var(--chart-2)]" />
                    <span>
                      Horas Extras: {formatCurrency(dadosFolha.horasExtras)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-[var(--chart-3)]" />
                    <span>
                      Adicionais: {formatCurrency(dadosFolha.adicionais)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-[var(--chart-4)]" />
                    <span>
                      Benefícios: {formatCurrency(dadosFolha.beneficios)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo Financeiro */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={AddMoneyCircleIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Resumo Financeiro da Folha
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600 dark:text-green-400">
                    Proventos
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Salário Base
                      </span>
                      <span>{formatCurrency(dadosFolha.salarioBase)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Horas Extras
                      </span>
                      <span>{formatCurrency(dadosFolha.horasExtras)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Adicionais</span>
                      <span>{formatCurrency(dadosFolha.adicionais)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Benefícios</span>
                      <span>{formatCurrency(dadosFolha.beneficios)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total Bruto</span>
                      <span>
                        {formatCurrency(
                          dadosFolha.salarioBase +
                            dadosFolha.horasExtras +
                            dadosFolha.adicionais +
                            dadosFolha.beneficios,
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-red-600 dark:text-red-400">
                    Descontos
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">INSS</span>
                      <span>{formatCurrency(dadosFolha.inss)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IRRF</span>
                      <span>{formatCurrency(dadosFolha.irrf)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Outros</span>
                      <span>{formatCurrency(dadosFolha.outrosDescontos)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total Descontos</span>
                      <span>{formatCurrency(dadosFolha.descontos)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                    Líquido
                  </h4>
                  <div className="text-3xl font-bold">
                    {formatCurrency(dadosFolha.salarioLiquido)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Valor líquido a pagar
                  </p>
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">
                      Salário médio por funcionário:
                    </p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(
                        Math.round(
                          dadosFolha.salarioLiquido /
                            dadosFolha.totalFuncionarios,
                        ),
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Secretarias */}
        <TabsContent value="secretarias" className="space-y-4">
          {/* Gráfico de Distribuição */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Building04Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Funcionários por Secretaria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[300px] w-full"
                >
                  <BarChart
                    data={dadosSecretarias.slice(0, 6)}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      dataKey="nome"
                      type="category"
                      width={120}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="funcionarios"
                      fill="var(--chart-1)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Clock01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Horas Extras por Secretaria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[300px] w-full"
                >
                  <BarChart
                    data={dadosSecretarias.slice(0, 6)}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <YAxis
                      dataKey="nome"
                      type="category"
                      width={120}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="horasExtras"
                      fill="var(--chart-2)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Secretarias */}
          <Card>
            <CardHeader>
              <CardTitle>Detalhamento por Secretaria</CardTitle>
              <CardDescription>
                Visão geral de recursos humanos por órgão
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Secretaria</TableHead>
                    <TableHead className="text-right">Funcionários</TableHead>
                    <TableHead className="text-right">Folha</TableHead>
                    <TableHead className="text-right">H.Extras</TableHead>
                    <TableHead className="text-right">Absenteísmo</TableHead>
                    <TableHead className="text-right">Turnover</TableHead>
                    <TableHead className="text-right">Vagas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosSecretarias.map((secretaria) => (
                    <TableRow key={secretaria.codigo}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="size-3 rounded-full"
                            style={{ backgroundColor: secretaria.cor }}
                          />
                          <div>
                            <p className="font-medium">{secretaria.nome}</p>
                            <p className="text-xs text-muted-foreground">
                              {secretaria.codigo}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {secretaria.funcionarios}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(secretaria.salarioTotal)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(secretaria.horasExtras)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            secretaria.absenteismo > 5
                              ? "destructive"
                              : secretaria.absenteismo > 4
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {secretaria.absenteismo}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            secretaria.turnover > 10
                              ? "destructive"
                              : secretaria.turnover > 8
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {secretaria.turnover}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {secretaria.vagas > 0 ? (
                          <Badge
                            variant="outline"
                            className="bg-amber-50 dark:bg-amber-950/30"
                          >
                            {secretaria.vagas} vagas
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      {totalFuncionarios}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totalSalarios)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totalHorasExtras)}
                    </TableCell>
                    <TableCell className="text-right font-bold">4.3%</TableCell>
                    <TableCell className="text-right font-bold">8.5%</TableCell>
                    <TableCell className="text-right font-bold">
                      {totalVagas} vagas
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Indicadores */}
        <TabsContent value="indicadores" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Absenteísmo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={UserBlockIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Evolução do Absenteísmo
                </CardTitle>
                <CardDescription>
                  Taxa mensal de faltas e ausências
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[250px] w-full"
                >
                  <LineChart data={absenteismoMensal}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="mes"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      domain={[0, 8]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="taxa"
                      stroke="var(--chart-1)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ChartContainer>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Média:</span>
                    <span className="ml-1 font-semibold">4.3%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Meta:</span>
                    <span className="ml-1 font-semibold text-green-600">
                      4.0%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Turnover */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={GroupIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Movimentação de Pessoal
                </CardTitle>
                <CardDescription>Admissões e demissões mensais</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[250px] w-full"
                >
                  <BarChart data={turnoverMensal}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="mes"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="admissoes"
                      fill="var(--chart-1)"
                      radius={[4, 4, 0, 0]}
                      name="Admissões"
                    />
                    <Bar
                      dataKey="demissoes"
                      fill="var(--chart-2)"
                      radius={[4, 4, 0, 0]}
                      name="Demissões"
                    />
                  </BarChart>
                </ChartContainer>
                <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-center">
                  <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded">
                    <p className="text-muted-foreground">Admissões</p>
                    <p className="font-bold text-green-600">133</p>
                  </div>
                  <div className="p-2 bg-red-50 dark:bg-red-950/30 rounded">
                    <p className="text-muted-foreground">Demissões</p>
                    <p className="font-bold text-red-600">96</p>
                  </div>
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded">
                    <p className="text-muted-foreground">Saldo</p>
                    <p className="font-bold text-blue-600">+37</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Metas e Indicadores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Target01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Metas e Indicadores de RH
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Indicador</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Meta</TableHead>
                    <TableHead className="text-right">Realizado</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metasRH.map((meta, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {meta.indicador}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {meta.descricao}
                      </TableCell>
                      <TableCell className="text-right">
                        {meta.unidade === "R$"
                          ? formatCurrency(meta.meta)
                          : `${meta.meta}${meta.unidade}`}
                      </TableCell>
                      <TableCell className="text-right">
                        {meta.unidade === "R$"
                          ? formatCurrency(meta.realizado)
                          : `${meta.realizado}${meta.unidade}`}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            meta.status === "atingido" ? "default" : "secondary"
                          }
                          className={
                            meta.status === "atingido" ? "bg-green-600" : ""
                          }
                        >
                          {meta.status === "atingido" ? "Atingido" : "Atenção"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Alertas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Alert02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Alertas e Recomendações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alertasRH.map((alerta, index) => (
                <Alert
                  key={index}
                  variant={
                    alerta.tipo === "warning" ? "destructive" : "default"
                  }
                  className={
                    alerta.tipo === "warning"
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                      : alerta.tipo === "success"
                        ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                        : ""
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
                  <AlertTitle>{alerta.titulo}</AlertTitle>
                  <AlertDescription>{alerta.descricao}</AlertDescription>
                </Alert>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Verbas */}
        <TabsContent value="verbas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={CoinsDollarIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Verbas e Proventos
              </CardTitle>
              <CardDescription>
                Detalhamento dos componentes da folha de pagamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verbasProventos.map((verba) => (
                    <TableRow key={verba.codigo}>
                      <TableCell className="font-mono">
                        {verba.codigo}
                      </TableCell>
                      <TableCell>{verba.descricao}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            verba.tipo === "provento"
                              ? "default"
                              : "destructive"
                          }
                          className={
                            verba.tipo === "provento" ? "bg-green-600" : ""
                          }
                        >
                          {verba.tipo === "provento" ? "Provento" : "Desconto"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(verba.valor)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="font-bold">
                      Total Proventos
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-600">
                      {formatCurrency(
                        verbasProventos
                          .filter((v) => v.tipo === "provento")
                          .reduce((acc, v) => acc + v.valor, 0),
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} className="font-bold">
                      Total Descontos
                    </TableCell>
                    <TableCell className="text-right font-bold text-red-600">
                      {formatCurrency(
                        verbasProventos
                          .filter((v) => v.tipo === "desconto")
                          .reduce((acc, v) => acc + v.valor, 0),
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          {/* Distribuição por Cargo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={UserIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Distribuição por Cargo/Função
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cargo</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead className="text-right">Percentual</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {distribuicaoCargo.map((cargo) => (
                    <TableRow key={cargo.cargo}>
                      <TableCell>{cargo.cargo}</TableCell>
                      <TableCell className="text-right">
                        {cargo.quantidade}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Progress
                            value={cargo.percentual}
                            className="w-16 h-2"
                          />
                          <span className="w-12 text-right">
                            {cargo.percentual}%
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

        {/* Tab People Analytics */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Analytics01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                People Analytics
              </CardTitle>
              <CardDescription>
                Análise de diversidade e perfil do quadro funcional
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Distribuição por Sexo */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Distribuição por Sexo</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[200px] w-full"
                >
                  <PieChart>
                    <Pie
                      data={peopleAnalytics.sexo.map((item, index) => ({
                        name: item.sexo,
                        value: item.quantidade,
                        fill: index === 0 ? "var(--chart-1)" : "var(--chart-2)",
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  {peopleAnalytics.sexo.map((item, index) => (
                    <div
                      key={item.sexo}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="size-3 rounded-full"
                          style={{
                            backgroundColor:
                              index === 0 ? "var(--chart-1)" : "var(--chart-2)",
                          }}
                        />
                        <span>{item.sexo}</span>
                      </div>
                      <span className="font-semibold">
                        {item.quantidade} ({item.percentual}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Distribuição por Raça/Cor */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Distribuição por Raça/Cor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[200px] w-full"
                >
                  <PieChart>
                    <Pie
                      data={peopleAnalytics.racaCor
                        .slice(0, 4)
                        .map((item, index) => ({
                          name: item.raca,
                          value: item.quantidade,
                          fill: `var(--chart-${index + 1})`,
                        }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="mt-4 space-y-1">
                  {peopleAnalytics.racaCor.map((item, index) => (
                    <div
                      key={item.raca}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="size-2 rounded-full"
                          style={{
                            backgroundColor: `var(--chart-${(index % 5) + 1})`,
                          }}
                        />
                        <span className="text-xs">{item.raca}</span>
                      </div>
                      <span className="text-xs font-semibold">
                        {item.percentual}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Faixa Etária */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Faixa Etária</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[200px] w-full"
                >
                  <BarChart
                    data={peopleAnalytics.faixaEtaria}
                    layout="vertical"
                  >
                    <XAxis type="number" />
                    <YAxis
                      dataKey="faixa"
                      type="category"
                      width={70}
                      tick={{ fontSize: 10 }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="quantidade"
                      fill="var(--chart-3)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Escolaridade */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Escolaridade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {peopleAnalytics.escolaridade.map((item, index) => (
                    <div key={item.nivel} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-xs">{item.nivel}</span>
                        <span className="text-xs font-semibold">
                          {item.percentual}%
                        </span>
                      </div>
                      <Progress value={item.percentual} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tempo de Serviço */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tempo de Serviço</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[200px] w-full"
                >
                  <BarChart data={peopleAnalytics.tempoServico}>
                    <XAxis
                      dataKey="faixa"
                      tick={{ fontSize: 9 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="quantidade"
                      fill="var(--chart-4)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Tipo de Vínculo */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tipo de Vínculo</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[200px] w-full"
                >
                  <PieChart>
                    <Pie
                      data={peopleAnalytics.tipoVinculo.map((item, index) => ({
                        name: item.tipo,
                        value: item.quantidade,
                        fill: `var(--chart-${index + 1})`,
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="mt-4 space-y-1">
                  {peopleAnalytics.tipoVinculo.map((item, index) => (
                    <div
                      key={item.tipo}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="size-2 rounded-full"
                          style={{
                            backgroundColor: `var(--chart-${index + 1}))`,
                          }}
                        />
                        <span className="text-xs">{item.tipo}</span>
                      </div>
                      <span className="text-xs font-semibold">
                        {item.percentual}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* PCD e Diversidade */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={SecurityCheckIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Inclusão e Diversidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">
                    Pessoas com Deficiência (PCD)
                  </h4>
                  <div className="text-3xl font-bold text-blue-600">45</div>
                  <p className="text-sm text-muted-foreground">
                    4.0% do quadro (Meta: 5%)
                  </p>
                  <Progress value={80} className="mt-2 h-2" />
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">
                    Mulheres em Cargo de Liderança
                  </h4>
                  <div className="text-3xl font-bold text-purple-600">38%</div>
                  <p className="text-sm text-muted-foreground">
                    42 de 111 cargos de chefia
                  </p>
                  <Progress value={38} className="mt-2 h-2" />
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">
                    Autodeclarados Negros/Pardos
                  </h4>
                  <div className="text-3xl font-bold text-amber-600">58.4%</div>
                  <p className="text-sm text-muted-foreground">
                    660 funcionários
                  </p>
                  <Progress value={58.4} className="mt-2 h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações de Diversidade */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={BulbIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Ações e Recomendações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="diversidade">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                        className="size-4 text-green-600"
                      />
                      <span>Metas de Diversidade Atingidas</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pl-6">
                      <div className="flex gap-2">
                        <HugeiconsIcon
                          icon={CheckmarkCircle02Icon}
                          strokeWidth={2}
                          className="size-4 mt-0.5 text-green-600 shrink-0"
                        />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">
                            Paridade de gênero:
                          </strong>{" "}
                          54.2% de mulheres no quadro funcional, superando meta
                          de 50%.
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
                            Representatividade racial:
                          </strong>{" "}
                          58.4% de autodeclarados negros/pardos, compatível com
                          demografia local.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="atencao">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={Alert02Icon}
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
                          className="size-4 mt-0.5 text-amber-600 shrink-0"
                        />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">
                            Cotas PCD:
                          </strong>{" "}
                          Atualmente em 4%, abaixo da meta legal de 5%.
                          Necessário reforçar recrutamento inclusivo.
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
                            Liderança feminina:
                          </strong>{" "}
                          38% de mulheres em cargos de chefia. Recomenda-se
                          programa de desenvolvimento de lideranças.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <HugeiconsIcon
                          icon={Alert02Icon}
                          strokeWidth={2}
                          className="size-4 mt-0.5 text-amber-600 shrink-0"
                        />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Sucessão:</strong>{" "}
                          20.1% do quadro com mais de 15 anos de serviço.
                          Planejamento de sucessão recomendado.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Limite de Pessoal (LRF) + Custo por Funcionario */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={SecurityCheckIcon}
                strokeWidth={2}
                className="size-5"
              />
              Limite de Pessoal (LRF)
            </CardTitle>
            <CardDescription>
              Despesa com pessoal:{" "}
              <strong
                className={
                  limitePessoalLRF.percentualAtual <= 48.6
                    ? "text-green-600"
                    : limitePessoalLRF.percentualAtual <= 51.3
                      ? "text-amber-600"
                      : "text-red-600"
                }
              >
                {limitePessoalLRF.percentualAtual}%
              </strong>{" "}
              da RCL (Limite: 54%)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Despesa Atual</span>
                <span className="font-semibold">
                  {formatMillions(limitePessoalLRF.despesaPessoal)} (
                  {limitePessoalLRF.percentualAtual}%)
                </span>
              </div>
              <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="absolute h-full bg-blue-500 rounded-full"
                  style={{
                    width: `${(limitePessoalLRF.percentualAtual / 54) * 100}%`,
                  }}
                />
                <div
                  className="absolute h-full w-0.5 bg-amber-500"
                  style={{ left: `${(48.6 / 54) * 100}%` }}
                  title="Limite de Alerta (48.6%)"
                />
                <div
                  className="absolute h-full w-0.5 bg-red-500"
                  style={{ left: `${(51.3 / 54) * 100}%` }}
                  title="Limite Prudencial (51.3%)"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span className="text-amber-600">Alerta 48.6%</span>
                <span className="text-red-600">Prudencial 51.3%</span>
                <span>Limite 54%</span>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">RCL</p>
                <p className="text-sm font-bold">
                  {formatMillions(limitePessoalLRF.receitaCorrenteLiquida)}
                </p>
              </div>
              <div className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">
                  Margem Disponivel
                </p>
                <p className="text-sm font-bold text-green-600">
                  {formatMillions(
                    limitePessoalLRF.limiteMaximo -
                      limitePessoalLRF.despesaPessoal,
                  )}
                </p>
              </div>
              <div className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">Até Alerta</p>
                <p className="text-sm font-bold text-amber-600">
                  {formatMillions(
                    limitePessoalLRF.limiteAlerta -
                      limitePessoalLRF.despesaPessoal,
                  )}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Evolução Trimestral
              </p>
              <ChartContainer config={chartConfig} className="h-[150px] w-full">
                <LineChart data={limitePessoalLRF.evolucaoTrimestral}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="trimestre"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[42, 55]}
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fontSize: 10 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="percentual"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="% RCL"
                  />
                </LineChart>
              </ChartContainer>
            </div>

            {limitePessoalLRF.percentualAtual > 48.6 && (
              <Alert
                variant="destructive"
                className="border-amber-500 bg-amber-50 dark:bg-amber-950/30"
              >
                <HugeiconsIcon
                  icon={Alert02Icon}
                  strokeWidth={2}
                  className="size-4"
                />
                <AlertTitle>Proximidade do Limite de Alerta</AlertTitle>
                <AlertDescription>
                  A despesa com pessoal está a{" "}
                  {(51.3 - limitePessoalLRF.percentualAtual).toFixed(1)}pp do
                  limite prudencial. Recomenda-se cautela na concessão de
                  reajustes e novas contratações.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={CoinsDollarIcon}
                strokeWidth={2}
                className="size-5"
              />
              Custo por Funcionário
            </CardTitle>
            <CardDescription>
              Custo médio mensal por secretaria (salário + horas extras)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {custoPorFuncionario.slice(0, 8).map((item) => (
              <div key={item.secretaria} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate max-w-[140px]">
                      {item.nome}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {item.funcionarios} func.
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {formatCurrency(item.custoMedio)}
                    </span>
                    <Badge
                      variant={
                        Number(item.percentualHE) > 10
                          ? "destructive"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      HE: {item.percentualHE}%
                    </Badge>
                  </div>
                </div>
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{
                      width: `${(item.custoMedio / custoPorFuncionario[0].custoMedio) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}

            <Separator />

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">
                  Custo Médio Geral
                </p>
                <p className="text-lg font-bold">
                  {formatCurrency(
                    Math.round(totalSalarios / totalFuncionarios),
                  )}
                </p>
              </div>
              <div className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">HE Médio/Func.</p>
                <p className="text-lg font-bold text-amber-600">
                  {formatCurrency(
                    Math.round(totalHorasExtras / totalFuncionarios),
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projeção de Aposentadorias + Capacitação e Desenvolvimento */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={TimeQuarterPassIcon}
                strokeWidth={2}
                className="size-5"
              />
              Projeção de Aposentadorias
            </CardTitle>
            <CardDescription>
              Próximos 5 anos:{" "}
              <strong className="text-amber-600">
                {totalAposentadorias5Anos} servidores
              </strong>{" "}
              ({percentualQuadro}% do quadro)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <BarChart data={projecaoAposentadorias}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="ano"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="quantidade"
                  fill="var(--chart-4)"
                  radius={[4, 4, 0, 0]}
                  name="Aposentadorias"
                />
              </BarChart>
            </ChartContainer>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ano</TableHead>
                  <TableHead className="text-right">Qtd.</TableHead>
                  <TableHead className="text-right">Impacto Folha</TableHead>
                  <TableHead>Cargos Principais</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projecaoAposentadorias.map((item) => (
                  <TableRow key={item.ano}>
                    <TableCell className="font-medium">{item.ano}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">{item.quantidade}</Badge>
                    </TableCell>
                    <TableCell className="text-right text-amber-600 font-medium">
                      {formatMillions(item.impactoFolha)}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                      {item.cargos}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">
                    {totalAposentadorias5Anos}
                  </TableCell>
                  <TableCell className="text-right font-bold text-amber-600">
                    {formatMillions(
                      projecaoAposentadorias.reduce(
                        (a, b) => a + b.impactoFolha,
                        0,
                      ),
                    )}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
            </Table>

            <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/30">
              <HugeiconsIcon
                icon={InformationCircleIcon}
                strokeWidth={2}
                className="size-4"
              />
              <AlertTitle>Planejamento de Sucessao</AlertTitle>
              <AlertDescription>
                Recomenda-se iniciar plano de sucessao para os{" "}
                {totalAposentadorias5Anos} cargos projetados, priorizando
                Professores e profissionais de Saúde que representam a maior
                demanda.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={GraduationScrollIcon}
                strokeWidth={2}
                className="size-5"
              />
              Capacitação e Desenvolvimento
            </CardTitle>
            <CardDescription>
              Total: <strong>{totalHorasCapacitacao}h</strong> em{" "}
              {capacitacaoDesenvolvimento.length} programas | Investimento:{" "}
              <strong>{formatCurrency(totalInvestimentoCapacitacao)}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {capacitacaoDesenvolvimento.map((programa) => (
              <div key={programa.programa} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{programa.programa}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {programa.participantes} part.
                    </Badge>
                    <Badge
                      variant={
                        programa.conclusao >= 90 ? "default" : "secondary"
                      }
                      className={programa.conclusao >= 90 ? "bg-green-600" : ""}
                    >
                      {programa.conclusao}%
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{programa.horas}h</span>
                  <span>{formatCurrency(programa.investimento)}</span>
                  <span>
                    R${" "}
                    {Math.round(programa.investimento / programa.participantes)}
                    /part.
                  </span>
                </div>
                <Progress value={programa.conclusao} className="h-1.5" />
              </div>
            ))}

            <Separator />

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">Participantes</p>
                <p className="text-lg font-bold">{totalParticipantes}</p>
                <p className="text-xs text-muted-foreground">
                  {((totalParticipantes / totalFuncionarios) * 100).toFixed(0)}%
                  do quadro
                </p>
              </div>
              <div className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">h/funcionário</p>
                <p className="text-lg font-bold">
                  {(totalHorasCapacitacao / totalFuncionarios).toFixed(1)}h
                </p>
                <p className="text-xs text-muted-foreground">Meta: 40h/ano</p>
              </div>
              <div className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">
                  Investimento/Func.
                </p>
                <p className="text-lg font-bold">
                  {formatCurrency(
                    Math.round(
                      totalInvestimentoCapacitacao / totalFuncionarios,
                    ),
                  )}
                </p>
                <p className="text-xs text-muted-foreground">anual</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benchmark de RH Municipal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={ChartLineData02Icon}
              strokeWidth={2}
              className="size-5"
            />
            Comparativo de RH municipal
          </CardTitle>
          <CardDescription>
            Comparativo com municípios de porte similar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Município</TableHead>
                <TableHead className="text-right">Custo Médio</TableHead>
                <TableHead className="text-right">Absenteísmo</TableHead>
                <TableHead className="text-right">Turnover</TableHead>
                <TableHead className="text-right">% H.Extras</TableHead>
                <TableHead className="text-right">Capacitação (h)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {benchmarkRH.map((item) => (
                <TableRow
                  key={item.municipio}
                  className={
                    item.destaque
                      ? "bg-blue-50/50 dark:bg-blue-950/20 font-medium"
                      : ""
                  }
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {item.destaque && (
                        <Badge className="bg-blue-600 text-xs">Atual</Badge>
                      )}
                      <span className={item.destaque ? "font-semibold" : ""}>
                        {item.municipio}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={item.custoMedio <= 9800 ? "default" : "outline"}
                      className={item.custoMedio <= 9800 ? "bg-green-600" : ""}
                    >
                      {formatCurrency(item.custoMedio)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={item.absenteismo <= 4.3 ? "default" : "outline"}
                      className={item.absenteismo <= 4.3 ? "bg-green-600" : ""}
                    >
                      {item.absenteismo}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={item.turnover <= 8.5 ? "default" : "outline"}
                      className={item.turnover <= 8.5 ? "bg-green-600" : ""}
                    >
                      {item.turnover}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={item.hePercent <= 7.3 ? "default" : "outline"}
                      className={item.hePercent <= 7.3 ? "bg-green-600" : ""}
                    >
                      {item.hePercent}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={item.capacitacao >= 38 ? "default" : "outline"}
                      className={item.capacitacao >= 38 ? "bg-green-600" : ""}
                    >
                      {item.capacitacao}h
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
            {(() => {
              const mediaRegional = benchmarkRH.find(
                (b) => b.municipio === "Média Regional",
              )!;
              const atual = benchmarkRH.find((b) => b.destaque)!;
              const indicadores = [
                {
                  nome: "Custo Medio",
                  melhor: atual.custoMedio <= mediaRegional.custoMedio,
                },
                {
                  nome: "Absenteismo",
                  melhor: atual.absenteismo <= mediaRegional.absenteismo,
                },
                {
                  nome: "Turnover",
                  melhor: atual.turnover <= mediaRegional.turnover,
                },
                {
                  nome: "H.Extras",
                  melhor: atual.hePercent <= mediaRegional.hePercent,
                },
                {
                  nome: "Capacitacao",
                  melhor: atual.capacitacao >= mediaRegional.capacitacao,
                },
              ];
              return indicadores.map((ind) => (
                <div
                  key={ind.nome}
                  className={`rounded-lg border p-2 text-center ${ind.melhor ? "border-green-300 bg-green-50 dark:bg-green-950/20" : "border-red-300 bg-red-50 dark:bg-red-950/20"}`}
                >
                  <p className="text-xs text-muted-foreground">{ind.nome}</p>
                  <Badge
                    variant={ind.melhor ? "default" : "destructive"}
                    className={`mt-1 ${ind.melhor ? "bg-green-600" : ""}`}
                  >
                    {ind.melhor ? "Acima da Media" : "Abaixo da Media"}
                  </Badge>
                </div>
              ));
            })()}
          </div>
        </CardContent>
      </Card>

      {/* Eventos Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Calendar01Icon}
              strokeWidth={2}
              className="size-5"
            />
            Eventos Recentes de RH
          </CardTitle>
          <CardDescription>
            Últimas movimentações e ações de pessoal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {eventosRH.map((evento, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg border"
              >
                <div
                  className={`size-8 rounded-full flex items-center justify-center ${
                    evento.tipo === "concurso"
                      ? "bg-blue-100 dark:bg-blue-900/30"
                      : evento.tipo === "treinamento"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : evento.tipo === "admissao"
                          ? "bg-purple-100 dark:bg-purple-900/30"
                          : evento.tipo === "avaliacao"
                            ? "bg-amber-100 dark:bg-amber-900/30"
                            : "bg-gray-100 dark:bg-gray-900/30"
                  }`}
                >
                  <HugeiconsIcon
                    icon={
                      evento.tipo === "concurso"
                        ? GraduationScrollIcon
                        : evento.tipo === "treinamento"
                          ? BulbIcon
                          : evento.tipo === "admissao"
                            ? UserAdd01Icon
                            : evento.tipo === "avaliacao"
                              ? Target01Icon
                              : TimeQuarterPassIcon
                    }
                    strokeWidth={2}
                    className="size-4"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{evento.evento}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {evento.data}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {evento.detalhe}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
