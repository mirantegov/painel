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
  ConstructionIcon,
  Calendar01Icon,
  Building04Icon,
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
  CoinsDollarIcon,
  MoneySend01Icon,
  FileValidationIcon,
  SecurityCheckIcon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { KpiCard } from "@/components/ui/kpi-card";

// Formatadores
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

const formatPercent = (value: number) => `${value.toFixed(1)}%`;

// ── Dados mock ──────────────────────────────────────────────────────────────

type StatusObra =
  | "em_andamento"
  | "concluida"
  | "paralisada"
  | "nao_iniciada"
  | "atrasada";

type Obra = {
  id: string;
  nome: string;
  tipo: string;
  secretaria: string;
  construtora: string;
  contrato: string;
  valorContratado: number;
  valorMedido: number;
  valorPago: number;
  execucaoFisica: number;
  execucaoFinanceira: number;
  prazoInicial: string;
  prazoAtual: string;
  status: StatusObra;
  fonte: string;
  bairro: string;
  aditivos: number;
};

const obras: Obra[] = [
  {
    id: "OBR-001",
    nome: "Pavimentação da Av. Principal",
    tipo: "Pavimentação",
    secretaria: "SEMINF",
    construtora: "Construtora Silva & Associados",
    contrato: "CT-2024/045",
    valorContratado: 4500000,
    valorMedido: 3375000,
    valorPago: 3150000,
    execucaoFisica: 78.5,
    execucaoFinanceira: 75.0,
    prazoInicial: "15/03/2024",
    prazoAtual: "15/12/2024",
    status: "em_andamento",
    fonte: "Convênio Federal",
    bairro: "Centro",
    aditivos: 1,
  },
  {
    id: "OBR-002",
    nome: "Construção da UBS Vila Nova",
    tipo: "Edificação",
    secretaria: "SEMSA",
    construtora: "Engenharia Beta Ltda",
    contrato: "CT-2024/032",
    valorContratado: 2800000,
    valorMedido: 2800000,
    valorPago: 2660000,
    execucaoFisica: 100.0,
    execucaoFinanceira: 95.0,
    prazoInicial: "01/02/2024",
    prazoAtual: "30/09/2024",
    status: "concluida",
    fonte: "Recurso Próprio",
    bairro: "Vila Nova",
    aditivos: 0,
  },
  {
    id: "OBR-003",
    nome: "Reforma da Escola Municipal Rui Barbosa",
    tipo: "Reforma",
    secretaria: "SEMED",
    construtora: "Alfa Construções",
    contrato: "CT-2024/051",
    valorContratado: 1200000,
    valorMedido: 480000,
    valorPago: 480000,
    execucaoFisica: 42.0,
    execucaoFinanceira: 40.0,
    prazoInicial: "01/06/2024",
    prazoAtual: "30/11/2024",
    status: "atrasada",
    fonte: "FUNDEB",
    bairro: "São José",
    aditivos: 2,
  },
  {
    id: "OBR-004",
    nome: "Drenagem do Igarapé São Raimundo",
    tipo: "Drenagem",
    secretaria: "SEMINF",
    construtora: "Hidro Engenharia SA",
    contrato: "CT-2024/028",
    valorContratado: 6200000,
    valorMedido: 5580000,
    valorPago: 5270000,
    execucaoFisica: 92.0,
    execucaoFinanceira: 90.0,
    prazoInicial: "10/01/2024",
    prazoAtual: "31/12/2024",
    status: "em_andamento",
    fonte: "Convênio Estadual",
    bairro: "São Raimundo",
    aditivos: 1,
  },
  {
    id: "OBR-005",
    nome: "Construção da Quadra Poliesportiva",
    tipo: "Edificação",
    secretaria: "SEMED",
    construtora: "Esporte Engenharia",
    contrato: "CT-2024/060",
    valorContratado: 980000,
    valorMedido: 0,
    valorPago: 0,
    execucaoFisica: 0.0,
    execucaoFinanceira: 0.0,
    prazoInicial: "01/12/2024",
    prazoAtual: "30/06/2025",
    status: "nao_iniciada",
    fonte: "Emenda Parlamentar",
    bairro: "Parque das Flores",
    aditivos: 0,
  },
  {
    id: "OBR-006",
    nome: "Ponte sobre o Rio Tarumã",
    tipo: "Ponte/Viaduto",
    secretaria: "SEMINF",
    construtora: "Pontes Brasil Engenharia",
    contrato: "CT-2023/089",
    valorContratado: 8500000,
    valorMedido: 2550000,
    valorPago: 2550000,
    execucaoFisica: 28.0,
    execucaoFinanceira: 30.0,
    prazoInicial: "15/08/2023",
    prazoAtual: "15/08/2025",
    status: "paralisada",
    fonte: "Convênio Federal",
    bairro: "Tarumã",
    aditivos: 3,
  },
  {
    id: "OBR-007",
    nome: "Revitalização da Praça da Matriz",
    tipo: "Urbanização",
    secretaria: "SEMINF",
    construtora: "Construtora Silva & Associados",
    contrato: "CT-2024/055",
    valorContratado: 1850000,
    valorMedido: 1295000,
    valorPago: 1110000,
    execucaoFisica: 68.0,
    execucaoFinanceira: 70.0,
    prazoInicial: "01/04/2024",
    prazoAtual: "28/02/2025",
    status: "em_andamento",
    fonte: "Recurso Próprio",
    bairro: "Centro",
    aditivos: 0,
  },
  {
    id: "OBR-008",
    nome: "Ampliação do CRAS Zona Norte",
    tipo: "Reforma",
    secretaria: "SEMAS",
    construtora: "Alfa Construções",
    contrato: "CT-2024/042",
    valorContratado: 750000,
    valorMedido: 750000,
    valorPago: 712500,
    execucaoFisica: 100.0,
    execucaoFinanceira: 95.0,
    prazoInicial: "01/03/2024",
    prazoAtual: "31/08/2024",
    status: "concluida",
    fonte: "Convênio Federal",
    bairro: "Cidade Nova",
    aditivos: 0,
  },
  {
    id: "OBR-009",
    nome: "Sistema de Esgotamento Sanitário - Etapa 2",
    tipo: "Saneamento",
    secretaria: "SEMINF",
    construtora: "Hidro Engenharia SA",
    contrato: "CT-2024/019",
    valorContratado: 12800000,
    valorMedido: 8320000,
    valorPago: 7680000,
    execucaoFisica: 62.5,
    execucaoFinanceira: 65.0,
    prazoInicial: "01/01/2024",
    prazoAtual: "30/06/2025",
    status: "em_andamento",
    fonte: "Financiamento CEF",
    bairro: "Diversos",
    aditivos: 1,
  },
  {
    id: "OBR-010",
    nome: "Recapeamento da Rua das Flores",
    tipo: "Pavimentação",
    secretaria: "SEMINF",
    construtora: "Engenharia Beta Ltda",
    contrato: "CT-2024/071",
    valorContratado: 620000,
    valorMedido: 620000,
    valorPago: 589000,
    execucaoFisica: 100.0,
    execucaoFinanceira: 95.0,
    prazoInicial: "15/05/2024",
    prazoAtual: "15/07/2024",
    status: "concluida",
    fonte: "Recurso Próprio",
    bairro: "Jardim Europa",
    aditivos: 0,
  },
];

// Totais calculados
const totalContratado = obras.reduce((a, b) => a + b.valorContratado, 0);
const totalMedido = obras.reduce((a, b) => a + b.valorMedido, 0);
const totalPago = obras.reduce((a, b) => a + b.valorPago, 0);
const obrasAndamento = obras.filter((o) => o.status === "em_andamento").length;
const obrasConcluidas = obras.filter((o) => o.status === "concluida").length;
const obrasParalisadas = obras.filter((o) => o.status === "paralisada").length;
const obrasAtrasadas = obras.filter((o) => o.status === "atrasada").length;
const obrasNaoIniciadas = obras.filter(
  (o) => o.status === "nao_iniciada",
).length;
const execucaoFisicaMedia =
  obras
    .filter((o) => o.status !== "nao_iniciada")
    .reduce((a, b) => a + b.execucaoFisica, 0) /
  obras.filter((o) => o.status !== "nao_iniciada").length;

// Obras por tipo (PieChart)
const obrasPorTipo = [
  {
    tipo: "Pavimentação",
    quantidade: obras.filter((o) => o.tipo === "Pavimentação").length,
    valor: obras
      .filter((o) => o.tipo === "Pavimentação")
      .reduce((a, b) => a + b.valorContratado, 0),
    fill: "var(--chart-1)",
  },
  {
    tipo: "Edificação",
    quantidade: obras.filter((o) => o.tipo === "Edificação").length,
    valor: obras
      .filter((o) => o.tipo === "Edificação")
      .reduce((a, b) => a + b.valorContratado, 0),
    fill: "var(--chart-2)",
  },
  {
    tipo: "Reforma",
    quantidade: obras.filter((o) => o.tipo === "Reforma").length,
    valor: obras
      .filter((o) => o.tipo === "Reforma")
      .reduce((a, b) => a + b.valorContratado, 0),
    fill: "var(--chart-3)",
  },
  {
    tipo: "Drenagem/Saneam.",
    quantidade: obras.filter((o) => ["Drenagem", "Saneamento"].includes(o.tipo))
      .length,
    valor: obras
      .filter((o) => ["Drenagem", "Saneamento"].includes(o.tipo))
      .reduce((a, b) => a + b.valorContratado, 0),
    fill: "var(--chart-4)",
  },
  {
    tipo: "Outros",
    quantidade: obras.filter((o) =>
      ["Ponte/Viaduto", "Urbanização"].includes(o.tipo),
    ).length,
    valor: obras
      .filter((o) => ["Ponte/Viaduto", "Urbanização"].includes(o.tipo))
      .reduce((a, b) => a + b.valorContratado, 0),
    fill: "var(--chart-5)",
  },
];

const chartConfigTipo = {
  Pavimentação: { label: "Pavimentação", color: "var(--chart-1)" },
  Edificação: { label: "Edificação", color: "var(--chart-2)" },
  Reforma: { label: "Reforma", color: "var(--chart-3)" },
  "Drenagem/Saneam.": { label: "Drenagem/Saneam.", color: "var(--chart-4)" },
  Outros: { label: "Outros", color: "var(--chart-5)" },
} satisfies ChartConfig;

// Obras por status (PieChart)
const obrasPorStatus = [
  {
    status: "Em Andamento",
    quantidade: obrasAndamento,
    fill: "var(--chart-1)",
  },
  { status: "Concluídas", quantidade: obrasConcluidas, fill: "var(--chart-2)" },
  {
    status: "Paralisadas",
    quantidade: obrasParalisadas,
    fill: "var(--chart-4)",
  },
  { status: "Atrasadas", quantidade: obrasAtrasadas, fill: "var(--chart-5)" },
  {
    status: "Não Iniciadas",
    quantidade: obrasNaoIniciadas,
    fill: "var(--chart-3)",
  },
];

const chartConfigStatus = {
  "Em Andamento": { label: "Em Andamento", color: "var(--chart-1)" },
  Concluídas: { label: "Concluídas", color: "var(--chart-2)" },
  Paralisadas: { label: "Paralisadas", color: "var(--chart-4)" },
  Atrasadas: { label: "Atrasadas", color: "var(--chart-5)" },
  "Não Iniciadas": { label: "Não Iniciadas", color: "var(--chart-3)" },
} satisfies ChartConfig;

// Execução mensal acumulada (AreaChart)
const execucaoMensal = [
  {
    mes: "Jan",
    fisico: 8.2,
    financeiro: 6.5,
    acumuladoFisico: 8.2,
    acumuladoFinanceiro: 6.5,
  },
  {
    mes: "Fev",
    fisico: 6.8,
    financeiro: 7.1,
    acumuladoFisico: 15.0,
    acumuladoFinanceiro: 13.6,
  },
  {
    mes: "Mar",
    fisico: 7.5,
    financeiro: 8.0,
    acumuladoFisico: 22.5,
    acumuladoFinanceiro: 21.6,
  },
  {
    mes: "Abr",
    fisico: 9.1,
    financeiro: 8.5,
    acumuladoFisico: 31.6,
    acumuladoFinanceiro: 30.1,
  },
  {
    mes: "Mai",
    fisico: 8.0,
    financeiro: 7.8,
    acumuladoFisico: 39.6,
    acumuladoFinanceiro: 37.9,
  },
  {
    mes: "Jun",
    fisico: 7.2,
    financeiro: 7.5,
    acumuladoFisico: 46.8,
    acumuladoFinanceiro: 45.4,
  },
  {
    mes: "Jul",
    fisico: 6.5,
    financeiro: 6.0,
    acumuladoFisico: 53.3,
    acumuladoFinanceiro: 51.4,
  },
  {
    mes: "Ago",
    fisico: 7.8,
    financeiro: 7.2,
    acumuladoFisico: 61.1,
    acumuladoFinanceiro: 58.6,
  },
  {
    mes: "Set",
    fisico: 5.5,
    financeiro: 6.0,
    acumuladoFisico: 66.6,
    acumuladoFinanceiro: 64.6,
  },
  {
    mes: "Out",
    fisico: 4.2,
    financeiro: 4.8,
    acumuladoFisico: 70.8,
    acumuladoFinanceiro: 69.4,
  },
  {
    mes: "Nov",
    fisico: 3.5,
    financeiro: 3.1,
    acumuladoFisico: 74.3,
    acumuladoFinanceiro: 72.5,
  },
];

const chartConfigExecucao = {
  acumuladoFisico: { label: "Exec. Física (%)", color: "var(--chart-1)" },
  acumuladoFinanceiro: {
    label: "Exec. Financeira (%)",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

// Medições realizadas
const medicoes = [
  {
    obra: "OBR-001",
    nomeObra: "Pavimentação da Av. Principal",
    medicao: 6,
    periodo: "Out/2024",
    valorMedido: 425000,
    valorAcumulado: 3375000,
    percentualFisico: 78.5,
    fiscal: "Eng. Carlos Mendes",
    status: "aprovada",
  },
  {
    obra: "OBR-009",
    nomeObra: "Sist. Esgotamento Sanitário - Et. 2",
    medicao: 9,
    periodo: "Nov/2024",
    valorMedido: 680000,
    valorAcumulado: 8320000,
    percentualFisico: 62.5,
    fiscal: "Eng. Ana Sousa",
    status: "em_analise",
  },
  {
    obra: "OBR-004",
    nomeObra: "Drenagem do Igarapé São Raimundo",
    medicao: 8,
    periodo: "Nov/2024",
    valorMedido: 520000,
    valorAcumulado: 5580000,
    percentualFisico: 92.0,
    fiscal: "Eng. Roberto Lima",
    status: "aprovada",
  },
  {
    obra: "OBR-007",
    nomeObra: "Revitalização da Praça da Matriz",
    medicao: 5,
    periodo: "Nov/2024",
    valorMedido: 185000,
    valorAcumulado: 1295000,
    percentualFisico: 68.0,
    fiscal: "Eng. Mariana Costa",
    status: "aprovada",
  },
  {
    obra: "OBR-003",
    nomeObra: "Reforma da Escola Rui Barbosa",
    medicao: 3,
    periodo: "Out/2024",
    valorMedido: 120000,
    valorAcumulado: 480000,
    percentualFisico: 42.0,
    fiscal: "Eng. Carlos Mendes",
    status: "reprovada",
  },
  {
    obra: "OBR-006",
    nomeObra: "Ponte sobre o Rio Tarumã",
    medicao: 4,
    periodo: "Jun/2024",
    valorMedido: 0,
    valorAcumulado: 2550000,
    percentualFisico: 28.0,
    fiscal: "Eng. Roberto Lima",
    status: "paralisada",
  },
];

// Aditivos contratuais
const aditivos = [
  {
    obra: "OBR-001",
    nomeObra: "Pavimentação da Av. Principal",
    tipoAditivo: "Prazo",
    numero: 1,
    justificativa: "Atraso na desapropriação de terreno lindeiro",
    diasAcrescidos: 60,
    valorAcrescido: 0,
    dataAprovacao: "15/08/2024",
  },
  {
    obra: "OBR-003",
    nomeObra: "Reforma da Escola Rui Barbosa",
    tipoAditivo: "Valor",
    numero: 1,
    justificativa: "Reforço estrutural não previsto em projeto",
    diasAcrescidos: 0,
    valorAcrescido: 145000,
    dataAprovacao: "10/09/2024",
  },
  {
    obra: "OBR-003",
    nomeObra: "Reforma da Escola Rui Barbosa",
    tipoAditivo: "Prazo",
    numero: 2,
    justificativa: "Período chuvoso acima da média",
    diasAcrescidos: 45,
    valorAcrescido: 0,
    dataAprovacao: "25/10/2024",
  },
  {
    obra: "OBR-004",
    nomeObra: "Drenagem do Igarapé São Raimundo",
    tipoAditivo: "Valor e Prazo",
    numero: 1,
    justificativa: "Adequação de projeto por nível freático",
    diasAcrescidos: 30,
    valorAcrescido: 380000,
    dataAprovacao: "20/07/2024",
  },
  {
    obra: "OBR-006",
    nomeObra: "Ponte sobre o Rio Tarumã",
    tipoAditivo: "Prazo",
    numero: 1,
    justificativa: "Atraso na entrega de perfis metálicos",
    diasAcrescidos: 90,
    valorAcrescido: 0,
    dataAprovacao: "12/03/2024",
  },
  {
    obra: "OBR-006",
    nomeObra: "Ponte sobre o Rio Tarumã",
    tipoAditivo: "Valor",
    numero: 2,
    justificativa: "Reajuste contratual por índice SINAPI",
    diasAcrescidos: 0,
    valorAcrescido: 510000,
    dataAprovacao: "01/06/2024",
  },
  {
    obra: "OBR-006",
    nomeObra: "Ponte sobre o Rio Tarumã",
    tipoAditivo: "Prazo",
    numero: 3,
    justificativa: "Paralisação judicial — embargo ambiental",
    diasAcrescidos: 180,
    valorAcrescido: 0,
    dataAprovacao: "15/09/2024",
  },
  {
    obra: "OBR-009",
    nomeObra: "Sist. Esgotamento Sanitário - Et. 2",
    tipoAditivo: "Valor e Prazo",
    numero: 1,
    justificativa: "Inclusão de ligações domiciliares extras",
    diasAcrescidos: 60,
    valorAcrescido: 920000,
    dataAprovacao: "15/05/2024",
  },
];

// Fiscalizações
const fiscalizacoes = [
  {
    obra: "OBR-001",
    nomeObra: "Pavimentação da Av. Principal",
    data: "28/11/2024",
    fiscal: "Eng. Carlos Mendes",
    tipo: "Rotina",
    conformidades: 12,
    naoConformidades: 1,
    parecer: "conforme",
    observacao:
      "Base compactada dentro dos parâmetros. Uma junta de dilatação fora do alinhamento.",
  },
  {
    obra: "OBR-009",
    nomeObra: "Sist. Esgotamento Sanitário - Et. 2",
    data: "27/11/2024",
    fiscal: "Eng. Ana Sousa",
    tipo: "Medição",
    conformidades: 15,
    naoConformidades: 0,
    parecer: "conforme",
    observacao:
      "Tubulação assentada conforme projeto. Ensaios de estanqueidade aprovados.",
  },
  {
    obra: "OBR-003",
    nomeObra: "Reforma da Escola Rui Barbosa",
    data: "25/11/2024",
    fiscal: "Eng. Carlos Mendes",
    tipo: "Especial",
    conformidades: 8,
    naoConformidades: 4,
    parecer: "nao_conforme",
    observacao:
      "Atraso no cronograma superior a 30%. Materiais estocados sem cobertura adequada.",
  },
  {
    obra: "OBR-004",
    nomeObra: "Drenagem do Igarapé São Raimundo",
    data: "26/11/2024",
    fiscal: "Eng. Roberto Lima",
    tipo: "Rotina",
    conformidades: 14,
    naoConformidades: 0,
    parecer: "conforme",
    observacao: "Execução compatível com cronograma. Mão de obra adequada.",
  },
  {
    obra: "OBR-007",
    nomeObra: "Revitalização da Praça da Matriz",
    data: "22/11/2024",
    fiscal: "Eng. Mariana Costa",
    tipo: "Rotina",
    conformidades: 10,
    naoConformidades: 2,
    parecer: "conforme_com_ressalvas",
    observacao:
      "Piso intertravado com padrão correto. Paisagismo pendente na ala leste.",
  },
  {
    obra: "OBR-006",
    nomeObra: "Ponte sobre o Rio Tarumã",
    data: "15/09/2024",
    fiscal: "Eng. Roberto Lima",
    tipo: "Paralisação",
    conformidades: 5,
    naoConformidades: 3,
    parecer: "paralisada",
    observacao:
      "Obra paralisada por embargo ambiental. Aguardando decisão do órgão competente.",
  },
];

// Obras por fonte de recurso (BarChart)
const obrasPorFonte = [
  {
    fonte: "Conv. Federal",
    quantidade: 3,
    valor: 14050000,
  },
  {
    fonte: "Recurso Próprio",
    quantidade: 3,
    valor: 5270000,
  },
  {
    fonte: "Conv. Estadual",
    quantidade: 1,
    valor: 6200000,
  },
  {
    fonte: "Financ. CEF",
    quantidade: 1,
    valor: 12800000,
  },
  {
    fonte: "FUNDEB",
    quantidade: 1,
    valor: 1200000,
  },
  {
    fonte: "Emenda Parl.",
    quantidade: 1,
    valor: 980000,
  },
];

const chartConfigFonte = {
  valor: { label: "Valor (R$)", color: "var(--chart-1)" },
} satisfies ChartConfig;

// Metas de gestão de obras
const metasObras = [
  {
    indicador: "Obras Concluídas no Prazo",
    meta: 80,
    realizado: 75,
    unidade: "%",
    status: "atencao",
    descricao: "Percentual de obras finalizadas dentro do prazo contratual",
  },
  {
    indicador: "Execução Física Média",
    meta: 70,
    realizado: Number(execucaoFisicaMedia.toFixed(1)),
    unidade: "%",
    status: execucaoFisicaMedia >= 70 ? "atingido" : "atencao",
    descricao: "Média ponderada do avanço físico das obras ativas",
  },
  {
    indicador: "Medições Aprovadas",
    meta: 95,
    realizado: 83.3,
    unidade: "%",
    status: "atencao",
    descricao: "Percentual de medições aprovadas sem ressalvas",
  },
  {
    indicador: "Fiscalizações em Dia",
    meta: 100,
    realizado: 91.7,
    unidade: "%",
    status: "atencao",
    descricao: "Vistorias realizadas dentro do calendário previsto",
  },
  {
    indicador: "Aditivos por Obra",
    meta: 1.0,
    realizado: 0.8,
    unidade: "",
    status: "atingido",
    descricao: "Média de termos aditivos por contrato de obra",
  },
  {
    indicador: "Conformidade Fiscal",
    meta: 90,
    realizado: 92.3,
    unidade: "%",
    status: "atingido",
    descricao: "Itens em conformidade nas vistorias de campo",
  },
];

// Alertas
// Eventos recentes (Timeline)
const eventosRecentes = [
  {
    data: "28/11/2024",
    hora: "16:30",
    descricao: "Fiscalização de rotina — Pavimentação Av. Principal",
    tipo: "fiscalizacao",
  },
  {
    data: "27/11/2024",
    hora: "14:00",
    descricao: "9ª Medição enviada — Sist. Esgotamento Sanitário",
    tipo: "medicao",
  },
  {
    data: "26/11/2024",
    hora: "11:20",
    descricao: "Fiscalização de rotina — Drenagem Ig. São Raimundo",
    tipo: "fiscalizacao",
  },
  {
    data: "25/11/2024",
    hora: "15:45",
    descricao: "Fiscalização especial — Escola Rui Barbosa (não conforme)",
    tipo: "alerta",
  },
  {
    data: "25/10/2024",
    hora: "09:00",
    descricao: "Aditivo nº 2 aprovado — Escola Rui Barbosa (prazo +45 dias)",
    tipo: "aditivo",
  },
  {
    data: "22/11/2024",
    hora: "10:30",
    descricao: "Fiscalização de rotina — Praça da Matriz (ressalvas)",
    tipo: "fiscalizacao",
  },
  {
    data: "20/11/2024",
    hora: "08:00",
    descricao: "Ordem de Serviço emitida — Quadra Poliesportiva (OBR-005)",
    tipo: "ordem",
  },
];

// Construtoras / Ranking
const rankingConstrutoras = [
  {
    nome: "Construtora Silva & Associados",
    cnpj: "12.345.678/0001-90",
    obrasAtivas: 2,
    valorTotal: 6350000,
    execucaoMedia: 73.3,
    aditivosTotal: 1,
    conformidade: 94.5,
  },
  {
    nome: "Hidro Engenharia SA",
    cnpj: "23.456.789/0001-01",
    obrasAtivas: 2,
    valorTotal: 19000000,
    execucaoMedia: 77.3,
    aditivosTotal: 2,
    conformidade: 96.2,
  },
  {
    nome: "Engenharia Beta Ltda",
    cnpj: "34.567.890/0001-12",
    obrasAtivas: 0,
    valorTotal: 3420000,
    execucaoMedia: 100.0,
    aditivosTotal: 0,
    conformidade: 98.0,
  },
  {
    nome: "Alfa Construções",
    cnpj: "45.678.901/0001-23",
    obrasAtivas: 1,
    valorTotal: 1950000,
    execucaoMedia: 71.0,
    aditivosTotal: 2,
    conformidade: 78.5,
  },
  {
    nome: "Pontes Brasil Engenharia",
    cnpj: "56.789.012/0001-34",
    obrasAtivas: 0,
    valorTotal: 8500000,
    execucaoMedia: 28.0,
    aditivosTotal: 3,
    conformidade: 62.5,
  },
];

// Status helpers
function statusLabel(s: StatusObra) {
  const map: Record<StatusObra, string> = {
    em_andamento: "Em Andamento",
    concluida: "Concluída",
    paralisada: "Paralisada",
    nao_iniciada: "Não Iniciada",
    atrasada: "Atrasada",
  };
  return map[s];
}

function statusVariant(s: StatusObra) {
  const map: Record<StatusObra, "secondary" | "outline" | "destructive"> = {
    em_andamento: "secondary",
    concluida: "secondary",
    paralisada: "destructive",
    nao_iniciada: "outline",
    atrasada: "destructive",
  };
  return map[s];
}

function statusColor(s: StatusObra) {
  const map: Record<StatusObra, string> = {
    em_andamento: "text-blue-600",
    concluida: "text-green-600",
    paralisada: "text-red-600",
    nao_iniciada: "text-muted-foreground",
    atrasada: "text-amber-600",
  };
  return map[s];
}

// ── Componente ──────────────────────────────────────────────────────────────

export function Obras() {
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024");
  const [abaSelecionada, setAbaSelecionada] = React.useState("portfolio");

  return (
    <div className="space-y-8">
      {/* Header com filtros */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Gestão de Obras Públicas
          </h2>
          <p className="text-sm text-muted-foreground">
            Acompanhamento físico-financeiro e fiscalização
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={periodoSelecionado}
            onValueChange={setPeriodoSelecionado}
          >
            <SelectTrigger className="w-[130px]">
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
          title="Total de Obras"
          icon={ConstructionIcon}
          value={`${obras.length} obras`}
          borderColor="border-l-blue-500"
          footer={
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-xs text-green-600">
                {obrasConcluidas} concluídas
              </Badge>
              <Badge variant="outline" className="text-xs">
                {obrasAndamento} em andamento
              </Badge>
            </div>
          }
        />
        <KpiCard
          title="Valor Total Contratado"
          icon={CoinsDollarIcon}
          value={formatCurrency(totalContratado)}
          borderColor="border-l-green-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Pago:</span>
              <span className="font-medium">{formatCurrency(totalPago)}</span>
              <span>({((totalPago / totalContratado) * 100).toFixed(1)}%)</span>
            </div>
          }
        />
        <KpiCard
          title="Execução Física Média"
          icon={Target01Icon}
          value={formatPercent(execucaoFisicaMedia)}
          borderColor="border-l-amber-500"
          footer={
            <div className="w-full space-y-1">
              <Progress value={execucaoFisicaMedia} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Obras ativas (excl. não iniciadas)
              </p>
            </div>
          }
        />
        <KpiCard
          title="Obras em Alerta"
          icon={AlertCircleIcon}
          value={`${obrasAtrasadas + obrasParalisadas}`}
          valueClassName="text-red-600"
          borderColor="border-l-red-500"
          footer={
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="destructive" className="text-xs">
                {obrasAtrasadas} atrasadas
              </Badge>
              <Badge variant="destructive" className="text-xs">
                {obrasParalisadas} paralisadas
              </Badge>
            </div>
          }
        />
      </div>

      {/* Curva S — Execução acumulada */}
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
                Curva S — Execução Acumulada
              </CardTitle>
              <CardDescription>
                Avanço físico e financeiro consolidado de todas as obras
              </CardDescription>
            </div>
            <Badge variant="secondary">
              Físico:{" "}
              {formatPercent(
                execucaoMensal[execucaoMensal.length - 1].acumuladoFisico,
              )}{" "}
              | Financeiro:{" "}
              {formatPercent(
                execucaoMensal[execucaoMensal.length - 1].acumuladoFinanceiro,
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfigExecucao}
            className="h-[300px] w-full"
          >
            <AreaChart data={execucaoMensal} margin={{ left: 0, right: 12 }}>
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
                tickFormatter={(v) => `${v}%`}
                domain={[0, 100]}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => `${Number(value).toFixed(1)}%`}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="acumuladoFisico"
                fill="var(--color-acumuladoFisico)"
                fillOpacity={0.3}
                stroke="var(--color-acumuladoFisico)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="acumuladoFinanceiro"
                fill="var(--color-acumuladoFinanceiro)"
                fillOpacity={0.15}
                stroke="var(--color-acumuladoFinanceiro)"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Metas de Gestão de Obras */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Target01Icon}
              strokeWidth={2}
              className="size-5"
            />
            Metas de Gestão de Obras
          </CardTitle>
          <CardDescription>
            Acompanhamento dos indicadores de desempenho
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metasObras.map((meta, index) => (
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
                      Meta: {`${meta.meta}${meta.unidade}`}
                    </span>
                    <span className="font-medium">
                      {meta.status === "atingido" ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <HugeiconsIcon
                            icon={CheckmarkCircle02Icon}
                            strokeWidth={2}
                            className="size-3"
                          />
                          {`${meta.realizado}${meta.unidade}`}
                        </span>
                      ) : (
                        <span className="text-amber-600">
                          {`${meta.realizado}${meta.unidade}`}
                        </span>
                      )}
                    </span>
                  </div>
                  <Progress
                    value={Math.min((meta.realizado / meta.meta) * 100, 100)}
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
          <TabsTrigger value="portfolio" className="text-xs">
            Portfólio
          </TabsTrigger>
          <TabsTrigger value="medicoes" className="text-xs">
            Medições
          </TabsTrigger>
          <TabsTrigger value="aditivos" className="text-xs">
            Aditivos
          </TabsTrigger>
          <TabsTrigger value="fiscalizacao" className="text-xs">
            Fiscalização
          </TabsTrigger>
          <TabsTrigger value="construtoras" className="text-xs">
            Construtoras
          </TabsTrigger>
        </TabsList>

        {/* Portfólio de Obras */}
        <TabsContent value="portfolio" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={ConstructionIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Portfólio de Obras
              </CardTitle>
              <CardDescription>
                Cadastro e situação de todas as obras do exercício
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Obra</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Construtora</TableHead>
                    <TableHead className="text-right">Contratado</TableHead>
                    <TableHead className="text-center">Físico</TableHead>
                    <TableHead className="text-center">Financeiro</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {obras.map((obra) => (
                    <TableRow key={obra.id}>
                      <TableCell className="font-mono text-xs">
                        {obra.id}
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <p className="font-medium truncate">{obra.nome}</p>
                        <p className="text-xs text-muted-foreground">
                          {obra.bairro} — {obra.fonte}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{obra.tipo}</Badge>
                      </TableCell>
                      <TableCell className="text-sm max-w-[150px] truncate">
                        {obra.construtora}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(obra.valorContratado)}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <span className="text-sm font-medium">
                            {formatPercent(obra.execucaoFisica)}
                          </span>
                          <Progress
                            value={obra.execucaoFisica}
                            className="h-1.5"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <span className="text-sm font-medium">
                            {formatPercent(obra.execucaoFinanceira)}
                          </span>
                          <Progress
                            value={obra.execucaoFinanceira}
                            className="h-1.5"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {obra.prazoAtual}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={statusVariant(obra.status)}
                          className={statusColor(obra.status)}
                        >
                          {statusLabel(obra.status)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>
                      Total — {obras.length} obras
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totalContratado)}
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      {formatPercent(execucaoFisicaMedia)}
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      {formatPercent((totalPago / totalContratado) * 100)}
                    </TableCell>
                    <TableCell colSpan={2} />
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medições */}
        <TabsContent value="medicoes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={FileValidationIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Boletins de Medição
              </CardTitle>
              <CardDescription>
                Medições realizadas e status de aprovação
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Obra</TableHead>
                    <TableHead className="text-center">Nº</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead className="text-right">Valor Medido</TableHead>
                    <TableHead className="text-right">Acumulado</TableHead>
                    <TableHead className="text-center">Físico</TableHead>
                    <TableHead>Fiscal</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicoes.map((med, index) => (
                    <TableRow key={index}>
                      <TableCell className="max-w-[180px]">
                        <p className="font-medium truncate">{med.nomeObra}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {med.obra}
                        </p>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{med.medicao}ª</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{med.periodo}</TableCell>
                      <TableCell className="text-right font-semibold">
                        {med.valorMedido > 0
                          ? formatCurrency(med.valorMedido)
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(med.valorAcumulado)}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <span className="text-sm">
                            {formatPercent(med.percentualFisico)}
                          </span>
                          <Progress
                            value={med.percentualFisico}
                            className="h-1.5"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{med.fiscal}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            med.status === "aprovada"
                              ? "secondary"
                              : med.status === "em_analise"
                                ? "outline"
                                : "destructive"
                          }
                          className={
                            med.status === "aprovada"
                              ? "text-green-600"
                              : med.status === "em_analise"
                                ? "text-blue-600"
                                : med.status === "reprovada"
                                  ? "text-red-600"
                                  : "text-muted-foreground"
                          }
                        >
                          {med.status === "aprovada"
                            ? "Aprovada"
                            : med.status === "em_analise"
                              ? "Em Análise"
                              : med.status === "reprovada"
                                ? "Reprovada"
                                : "Paralisada"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aditivos */}
        <TabsContent value="aditivos" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Flag01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Termos Aditivos
              </CardTitle>
              <CardDescription>
                Aditivos de prazo e valor aos contratos de obra
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Obra</TableHead>
                    <TableHead className="text-center">Nº</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Justificativa</TableHead>
                    <TableHead className="text-center">Prazo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Aprovação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aditivos.map((ad, index) => (
                    <TableRow key={index}>
                      <TableCell className="max-w-[160px]">
                        <p className="font-medium truncate">{ad.nomeObra}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {ad.obra}
                        </p>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{ad.numero}º</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            ad.tipoAditivo === "Prazo"
                              ? "outline"
                              : ad.tipoAditivo === "Valor"
                                ? "secondary"
                                : "secondary"
                          }
                          className={
                            ad.tipoAditivo === "Valor"
                              ? "text-amber-600"
                              : ad.tipoAditivo === "Valor e Prazo"
                                ? "text-red-600"
                                : ""
                          }
                        >
                          {ad.tipoAditivo}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[220px] text-sm">
                        <p className="truncate">{ad.justificativa}</p>
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        {ad.diasAcrescidos > 0
                          ? `+${ad.diasAcrescidos} dias`
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {ad.valorAcrescido > 0
                          ? formatCurrency(ad.valorAcrescido)
                          : "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {ad.dataAprovacao}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>
                      Total — {aditivos.length} aditivos
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      +{aditivos.reduce((a, b) => a + b.diasAcrescidos, 0)} dias
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(
                        aditivos.reduce((a, b) => a + b.valorAcrescido, 0),
                      )}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fiscalização */}
        <TabsContent value="fiscalizacao" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={SecurityCheckIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Relatórios de Fiscalização
              </CardTitle>
              <CardDescription>
                Vistorias de campo e pareceres técnicos
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Obra</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Fiscal</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-center">Conf.</TableHead>
                    <TableHead className="text-center">Não Conf.</TableHead>
                    <TableHead>Parecer</TableHead>
                    <TableHead>Observação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fiscalizacoes.map((fisc, index) => (
                    <TableRow key={index}>
                      <TableCell className="max-w-[160px]">
                        <p className="font-medium truncate">{fisc.nomeObra}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {fisc.obra}
                        </p>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {fisc.data}
                      </TableCell>
                      <TableCell className="text-sm">{fisc.fiscal}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{fisc.tipo}</Badge>
                      </TableCell>
                      <TableCell className="text-center font-medium text-green-600">
                        {fisc.conformidades}
                      </TableCell>
                      <TableCell className="text-center font-medium text-red-600">
                        {fisc.naoConformidades}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            fisc.parecer === "conforme"
                              ? "secondary"
                              : fisc.parecer === "conforme_com_ressalvas"
                                ? "outline"
                                : "destructive"
                          }
                          className={
                            fisc.parecer === "conforme"
                              ? "text-green-600"
                              : fisc.parecer === "conforme_com_ressalvas"
                                ? "text-amber-600"
                                : "text-red-600"
                          }
                        >
                          {fisc.parecer === "conforme"
                            ? "Conforme"
                            : fisc.parecer === "conforme_com_ressalvas"
                              ? "Com Ressalvas"
                              : fisc.parecer === "nao_conforme"
                                ? "Não Conforme"
                                : "Paralisada"}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] text-xs text-muted-foreground">
                        <p className="truncate">{fisc.observacao}</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Construtoras */}
        <TabsContent value="construtoras" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Building04Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Ranking de Construtoras
              </CardTitle>
              <CardDescription>
                Desempenho das empresas contratadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rankingConstrutoras.map((emp, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Avatar size="sm">
                      <AvatarFallback className="text-xs">
                        {index + 1}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate max-w-[220px]">
                          {emp.nome}
                        </p>
                        <span className="text-sm font-semibold">
                          {formatCurrency(emp.valorTotal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{emp.cnpj}</span>
                        <div className="flex gap-1">
                          <Badge variant="outline" className="text-xs">
                            {emp.obrasAtivas} ativas
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {emp.aditivosTotal} aditivos
                          </Badge>
                          <Badge
                            variant={
                              emp.conformidade >= 90
                                ? "secondary"
                                : emp.conformidade >= 75
                                  ? "outline"
                                  : "destructive"
                            }
                            className={cn(
                              "text-xs",
                              emp.conformidade >= 90
                                ? "text-green-600"
                                : emp.conformidade >= 75
                                  ? "text-amber-600"
                                  : "text-red-600",
                            )}
                          >
                            {emp.conformidade}% conf.
                          </Badge>
                        </div>
                      </div>
                      <Progress value={emp.execucaoMedia} className="h-1.5" />
                      <p className="text-xs text-muted-foreground">
                        Execução média: {formatPercent(emp.execucaoMedia)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Gráficos lado a lado: Obras por Tipo (Pie) + Obras por Fonte (Bar) */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Obras por Tipo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={PieChart02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Obras por Tipo
            </CardTitle>
            <CardDescription>
              Distribuição por categoria de obra
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfigTipo}
              className="mx-auto aspect-square max-h-[280px]"
            >
              <PieChart>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name, entry) => {
                        const item = obrasPorTipo.find(
                          (t) => t.tipo === entry.payload.tipo,
                        );
                        return `${value} obra(s) — ${item ? formatCurrency(item.valor) : ""}`;
                      }}
                    />
                  }
                />
                <Pie
                  data={obrasPorTipo}
                  dataKey="quantidade"
                  nameKey="tipo"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={3}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                />
                <ChartLegend content={<ChartLegendContent nameKey="tipo" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Obras por Fonte de Recurso */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={CoinsDollarIcon}
                strokeWidth={2}
                className="size-5"
              />
              Valor por Fonte de Recurso
            </CardTitle>
            <CardDescription>
              Investimento por origem dos recursos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfigFonte}
              className="h-[280px] w-full"
            >
              <BarChart
                data={obrasPorFonte}
                layout="vertical"
                margin={{ left: 0, right: 12 }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="fonte"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
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
                  dataKey="valor"
                  fill="var(--chart-1)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Obras por Status (Pie) + Execução Física vs Financeira (Bar) */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Obras por Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={PieChart02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Situação das Obras
            </CardTitle>
            <CardDescription>Distribuição por status atual</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfigStatus}
              className="mx-auto aspect-square max-h-[280px]"
            >
              <PieChart>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `${value} obra(s)`}
                    />
                  }
                />
                <Pie
                  data={obrasPorStatus}
                  dataKey="quantidade"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={3}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                />
                <ChartLegend
                  content={<ChartLegendContent nameKey="status" />}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Execução Física vs Financeira por obra */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Execução Física × Financeira
            </CardTitle>
            <CardDescription>Comparativo por obra ativa</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  execucaoFisica: {
                    label: "Físico (%)",
                    color: "var(--chart-1)",
                  },
                  execucaoFinanceira: {
                    label: "Financeiro (%)",
                    color: "var(--chart-3)",
                  },
                } satisfies ChartConfig
              }
              className="h-[280px] w-full"
            >
              <BarChart
                data={obras
                  .filter((o) => o.status !== "nao_iniciada")
                  .map((o) => ({
                    nome: o.id,
                    execucaoFisica: o.execucaoFisica,
                    execucaoFinanceira: o.execucaoFinanceira,
                  }))}
                margin={{ left: 0, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="nome"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(v) => `${v}%`}
                  domain={[0, 100]}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `${Number(value).toFixed(1)}%`}
                    />
                  }
                />
                <Bar
                  dataKey="execucaoFisica"
                  fill="var(--color-execucaoFisica)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="execucaoFinanceira"
                  fill="var(--color-execucaoFinanceira)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Eventos Recentes — Timeline */}
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
          <CardDescription>
            Últimas movimentações no módulo de obras
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {eventosRecentes.map((evento, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "size-2.5 rounded-full",
                      evento.tipo === "fiscalizacao"
                        ? "bg-blue-500"
                        : evento.tipo === "medicao"
                          ? "bg-green-500"
                          : evento.tipo === "aditivo"
                            ? "bg-amber-500"
                            : evento.tipo === "alerta"
                              ? "bg-red-500"
                              : "bg-purple-500",
                    )}
                  />
                  {index < eventosRecentes.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {evento.data} — {evento.hora}
                    </p>
                    <Badge
                      variant={
                        evento.tipo === "alerta" ? "destructive" : "secondary"
                      }
                      className="text-xs"
                    >
                      {evento.tipo === "fiscalizacao"
                        ? "Fiscalização"
                        : evento.tipo === "medicao"
                          ? "Medição"
                          : evento.tipo === "aditivo"
                            ? "Aditivo"
                            : evento.tipo === "alerta"
                              ? "Alerta"
                              : "Ordem"}
                    </Badge>
                  </div>
                  <p className="text-sm">{evento.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
