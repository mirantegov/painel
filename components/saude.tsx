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
  { categoria: "Pessoal e Encargos", valor: 32_800_000, percentual: 65.9, fill: greenPalette[1] },
  { categoria: "Medicamentos", valor: 8_400_000, percentual: 16.9, fill: greenPalette[2] },
  { categoria: "Serviços Terceirizados", valor: 4_200_000, percentual: 8.4, fill: greenPalette[3] },
  { categoria: "Equipamentos e Manutenção", valor: 2_800_000, percentual: 5.6, fill: greenPalette[4] },
  { categoria: "Outras Despesas", valor: 1_600_000, percentual: 3.2, fill: greenPalette[5] },
];

const chartConfigDespesas = {
  "Pessoal e Encargos": { label: "Pessoal e Encargos", color: greenPalette[1] },
  Medicamentos: { label: "Medicamentos", color: greenPalette[2] },
  "Serviços Terceirizados": { label: "Serviços Terceirizados", color: greenPalette[3] },
  "Equipamentos e Manutenção": { label: "Equipamentos e Manutenção", color: greenPalette[4] },
  "Outras Despesas": { label: "Outras Despesas", color: greenPalette[5] },
} satisfies ChartConfig;

const receitasSaude = [
  { fonte: "Transferências SUS", valor: 38_200_000, percentual: 70.6 },
  { fonte: "Recursos Próprios", valor: 12_400_000, percentual: 22.9 },
  { fonte: "Convênios Estaduais", valor: 2_100_000, percentual: 3.9 },
  { fonte: "Convênios Federais", valor: 1_400_000, percentual: 2.6 },
];

const fontesRecursos = [
  { codigo: "1.500", nome: "Recursos Próprios", saldo: 2_840_000, empenhado: 9_560_000, disponivel: 2_840_000 },
  { codigo: "1.600", nome: "SUS - Atenção Básica", saldo: 1_240_000, empenhado: 18_960_000, disponivel: 1_240_000 },
  { codigo: "1.601", nome: "SUS - MAC", saldo: 890_000, empenhado: 14_800_000, disponivel: 890_000 },
  { codigo: "1.602", nome: "SUS - Vigilância em Saúde", saldo: 420_000, empenhado: 3_840_000, disponivel: 420_000 },
  { codigo: "1.700", nome: "Convênio Estadual - SESA", saldo: 180_000, empenhado: 1_920_000, disponivel: 180_000 },
  { codigo: "1.750", nome: "Convênio Federal - Ministério", saldo: 95_000, empenhado: 1_305_000, disponivel: 95_000 },
];

const contasBancarias = [
  { banco: "Banco do Brasil", agencia: "1234-5", conta: "12345-6", tipo: "Recursos Próprios", saldo: 2_840_000 },
  { banco: "Caixa Econômica", agencia: "0987", conta: "00123-4", tipo: "SUS - Atenção Básica", saldo: 1_240_000 },
  { banco: "Caixa Econômica", agencia: "0987", conta: "00124-2", tipo: "SUS - MAC", saldo: 890_000 },
  { banco: "Banco do Brasil", agencia: "1234-5", conta: "12346-4", tipo: "Vigilância em Saúde", saldo: 420_000 },
  { banco: "Banco do Brasil", agencia: "1234-5", conta: "12347-2", tipo: "Convênios", saldo: 275_000 },
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
  { indicador: "Cobertura ESF", valor: 87.4, meta: 85.0, unidade: "%", status: "atingido" },
  { indicador: "Vacinação em Dia", valor: 92.1, meta: 95.0, unidade: "%", status: "atencao" },
  { indicador: "Pré-natal (7+ consultas)", valor: 78.5, meta: 80.0, unidade: "%", status: "atencao" },
  { indicador: "Tempo Médio Espera", valor: 18, meta: 15, unidade: "dias", status: "atencao" },
  { indicador: "Taxa Ocupação Leitos", valor: 82.3, meta: 85.0, unidade: "%", status: "atingido" },
  { indicador: "Resolutividade APS", valor: 91.2, meta: 90.0, unidade: "%", status: "atingido" },
];

const atendimentosPorUnidade = [
  { unidade: "UBS Centro", atendimentos: 4_240, capacidade: 5_000, ocupacao: 84.8, profissionais: 28 },
  { unidade: "UBS Norte", atendimentos: 3_890, capacidade: 4_500, ocupacao: 86.4, profissionais: 24 },
  { unidade: "UBS Sul", atendimentos: 3_420, capacidade: 4_000, ocupacao: 85.5, profissionais: 22 },
  { unidade: "UBS Leste", atendimentos: 2_980, capacidade: 3_500, ocupacao: 85.1, profissionais: 18 },
  { unidade: "UPA 24h", atendimentos: 2_840, capacidade: 3_000, ocupacao: 94.7, profissionais: 42 },
  { unidade: "Hospital Municipal", atendimentos: 1_080, capacidade: 1_200, ocupacao: 90.0, profissionais: 86 },
];

const produtividadeProfissionais = [
  { categoria: "Médicos", quantidade: 124, atendimentos: 8_940, mediaDia: 12.1 },
  { categoria: "Enfermeiros", quantidade: 186, atendimentos: 12_480, mediaDia: 11.2 },
  { categoria: "Técnicos Enfermagem", quantidade: 342, atendimentos: 18_450, mediaDia: 9.0 },
  { categoria: "Dentistas", quantidade: 48, atendimentos: 3_240, mediaDia: 11.3 },
  { categoria: "Farmacêuticos", quantidade: 24, atendimentos: 14_820, mediaDia: 103.2 },
  { categoria: "Agentes Comunitários", quantidade: 516, visitas: 28_940, mediaDia: 9.4 },
];

const estoqueMedicamentos = [
  { medicamento: "Paracetamol 500mg", estoque: 48_000, consumoMedio: 12_400, cobertura: 116, criticidade: "adequado" },
  { medicamento: "Dipirona 500mg", estoque: 36_000, consumoMedio: 9_800, cobertura: 110, criticidade: "adequado" },
  { medicamento: "Amoxicilina 500mg", estoque: 8_400, consumoMedio: 4_200, cobertura: 60, criticidade: "atencao" },
  { medicamento: "Losartana 50mg", estoque: 24_000, consumoMedio: 8_100, cobertura: 89, criticidade: "adequado" },
  { medicamento: "Metformina 850mg", estoque: 18_000, consumoMedio: 6_800, cobertura: 79, criticidade: "atencao" },
  { medicamento: "Insulina NPH", estoque: 840, consumoMedio: 620, cobertura: 41, criticidade: "critico" },
];

const programasSaude = [
  { programa: "Saúde da Família", beneficiarios: 124_800, cobertura: 87.4, investimento: 18_200_000 },
  { programa: "Saúde Bucal", beneficiarios: 89_400, cobertura: 62.6, investimento: 3_840_000 },
  { programa: "Saúde da Mulher", beneficiarios: 42_100, cobertura: 58.9, investimento: 2_940_000 },
  { programa: "Saúde da Criança", beneficiarios: 28_400, cobertura: 94.2, investimento: 4_280_000 },
  { programa: "Hiperdia", beneficiarios: 18_900, cobertura: 72.1, investimento: 1_840_000 },
  { programa: "Saúde Mental", beneficiarios: 3_240, cobertura: 48.2, investimento: 1_680_000 },
];

const alertasSaude = [
  {
    tipo: "warning" as const,
    titulo: "Estoque crítico de insulina NPH",
    badge: "Medicamentos",
    descricao: "Cobertura de apenas 41 dias. Necessário processo emergencial de aquisição para atender pacientes diabéticos.",
  },
  {
    tipo: "warning" as const,
    titulo: "Tempo de espera acima da meta",
    badge: "Atendimento",
    descricao: "Tempo médio de 18 dias está 20% acima da meta de 15 dias. Concentrado em especialidades de cardiologia e ortopedia.",
  },
  {
    tipo: "info" as const,
    titulo: "Cobertura ESF supera meta estabelecida",
    badge: "Atenção Básica",
    descricao: "87,4% da população coberta pela Estratégia Saúde da Família, superando a meta de 85% e a média nacional de 75%.",
  },
  {
    tipo: "success" as const,
    titulo: "Resolutividade da APS acima de 90%",
    badge: "Qualidade",
    descricao: "91,2% dos casos resolvidos na Atenção Primária, reduzindo sobrecarga no hospital e na UPA.",
  },
];

const alertasAnalise = [
  {
    tipo: "warning" as const,
    titulo: "Execução orçamentária abaixo do esperado",
    badge: "Orçamento",
    descricao: "Com 95% de execução, há risco de devolução de recursos federais vinculados ao SUS se não houver empenho até novembro.",
  },
  {
    tipo: "warning" as const,
    titulo: "Déficit de profissionais em saúde mental",
    badge: "Recursos Humanos",
    descricao: "Apenas 48,2% de cobertura no programa de saúde mental, com necessidade de contratação de 3 psicólogos e 2 psiquiatras.",
  },
  {
    tipo: "info" as const,
    titulo: "Aumento de 12% nos atendimentos de urgência",
    badge: "Demanda",
    descricao: "UPA 24h operando com 94,7% de ocupação. Recomenda-se reforço na atenção básica para desafogar urgências.",
  },
  {
    tipo: "success" as const,
    titulo: "Vacinação infantil mantém índices elevados",
    badge: "Imunização",
    descricao: "Cobertura de 94,2% no programa Saúde da Criança, próximo da meta de 95% e acima da média estadual de 88%.",
  },
  {
    tipo: "warning" as const,
    titulo: "Pré-natal com 7+ consultas abaixo da meta",
    badge: "Saúde Materna",
    descricao: "78,5% das gestantes com 7 ou mais consultas, abaixo da meta de 80%. Necessário intensificar busca ativa.",
  },
  {
    tipo: "info" as const,
    titulo: "Renovação de equipamentos hospitalares prevista",
    badge: "Investimentos",
    descricao: "Convênio federal de R$ 1,4 milhão aprovado para aquisição de 2 tomógrafos e modernização do centro cirúrgico.",
  },
];

export function Saude() {
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024");
  const [unidadeSelecionada, setUnidadeSelecionada] = React.useState("todas");

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Gestão de Saúde
          </h2>
          <p className="text-muted-foreground">
            Controle e monitoramento da saúde pública municipal
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
          <Select value={unidadeSelecionada} onValueChange={setUnidadeSelecionada}>
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
              <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-4" />
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
              <HugeiconsIcon icon={ChartLineData02Icon} strokeWidth={2} className="size-5" />
              Painel Executivo da Saúde
            </CardTitle>
            <CardDescription>
              Situação consolidada dos principais indicadores de saúde pública municipal.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">Orçamento Executado</p>
              <p className="mt-2 text-3xl font-semibold">{((saudeResumo.orcamentoEmpenhado / saudeResumo.orcamentoTotal) * 100).toFixed(1)}%</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {formatCurrency(saudeResumo.orcamentoEmpenhado)} de {formatCurrency(saudeResumo.orcamentoTotal)}
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">Receitas Arrecadadas</p>
              <p className="mt-2 text-3xl font-semibold">{formatCurrency(saudeResumo.receitaTotal)}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                70,6% de transferências SUS
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">Taxa de Ocupação Média</p>
              <p className="mt-2 text-3xl font-semibold">86,4%</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Capacidade bem utilizada nas unidades
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} className="size-5" />
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

      <Tabs defaultValue="orcamento" className="w-full">
        <TabsList className="flex h-auto w-full flex-wrap gap-2 rounded-2xl p-2">
          <TabsTrigger value="orcamento">Orçamento e Finanças</TabsTrigger>
          <TabsTrigger value="atendimento">Atendimento</TabsTrigger>
          <TabsTrigger value="profissionais">Profissionais</TabsTrigger>
          <TabsTrigger value="medicamentos">Medicamentos</TabsTrigger>
          <TabsTrigger value="programas">Programas</TabsTrigger>
          <TabsTrigger value="analises">Análises</TabsTrigger>
        </TabsList>

        <TabsContent value="orcamento" className="mt-6 space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={Wallet01Icon} strokeWidth={2} className="size-5" />
                  Composição das Despesas
                </CardTitle>
                <CardDescription>
                  Distribuição do orçamento da saúde por categoria de despesa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfigDespesas} className="mx-auto aspect-square max-h-[320px]">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="categoria" hideLabel />} />
                    <Pie data={despesasSaude} dataKey="valor" nameKey="categoria" innerRadius={70} outerRadius={110}>
                      {despesasSaude.map((item) => (
                        <Cell key={item.categoria} fill={item.fill} />
                      ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent nameKey="categoria" />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} className="size-5" />
                  Evolução Orçamentária
                </CardTitle>
                <CardDescription>
                  Acompanhamento mensal do orçamento: orçado, empenhado e pago.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfigEvolucao}>
                  <LineChart data={evolucaoOrcamentaria} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `R$ ${(Number(value) / 1_000_000).toFixed(0)}M`} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatCurrency(Number(value))}
                        />
                      }
                    />
                    <Line type="monotone" dataKey="orcado" stroke={greenPalette[5]} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="empenhado" stroke={greenPalette[3]} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="pago" stroke={greenPalette[1]} strokeWidth={2} dot={{ r: 3 }} />
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
                  <HugeiconsIcon icon={MoneyReceiveSquareIcon} strokeWidth={2} className="size-5" />
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
                        <TableCell className="font-medium">{item.fonte}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.valor)}</TableCell>
                        <TableCell className="text-right">{item.percentual.toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={Invoice01Icon} strokeWidth={2} className="size-5" />
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
                        <TableCell className="font-mono text-sm">{item.codigo}</TableCell>
                        <TableCell className="font-medium">{item.nome}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.empenhado)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.disponivel)}</TableCell>
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
                <HugeiconsIcon icon={BankIcon} strokeWidth={2} className="size-5" />
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
                      <TableCell className="font-medium">{item.banco}</TableCell>
                      <TableCell>{item.agencia}</TableCell>
                      <TableCell className="font-mono text-sm">{item.conta}</TableCell>
                      <TableCell>{item.tipo}</TableCell>
                      <TableCell className="text-right font-semibold">{formatCurrency(item.saldo)}</TableCell>
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
                      <span className="text-muted-foreground">Meta: {kpi.meta}{kpi.unidade}</span>
                      <Badge variant={kpi.status === "atingido" ? "default" : "secondary"}>
                        {kpi.status === "atingido" ? "Atingido" : "Atenção"}
                      </Badge>
                    </div>
                    <Progress value={(kpi.valor / kpi.meta) * 100} className="h-2" />
                  </div>
                }
              />
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon icon={Hospital01Icon} strokeWidth={2} className="size-5" />
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
                      <TableCell className="font-medium">{item.unidade}</TableCell>
                      <TableCell className="text-right">{formatNumber(item.atendimentos)}</TableCell>
                      <TableCell className="text-right">{formatNumber(item.capacidade)}</TableCell>
                      <TableCell className="text-right">
                        <span className={item.ocupacao > 90 ? "font-semibold text-amber-600" : ""}>
                          {item.ocupacao.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{item.profissionais}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profissionais" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon icon={Stethoscope02Icon} strokeWidth={2} className="size-5" />
                Produtividade dos Profissionais
              </CardTitle>
              <CardDescription>
                Quantidade de profissionais e média de atendimentos por categoria.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead className="text-right">Atendimentos/Mês</TableHead>
                    <TableHead className="text-right">Média/Dia</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produtividadeProfissionais.map((item) => (
                    <TableRow key={item.categoria}>
                      <TableCell className="font-medium">{item.categoria}</TableCell>
                      <TableCell className="text-right">{formatNumber(item.quantidade)}</TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.atendimentos || item.visitas || 0)}
                      </TableCell>
                      <TableCell className="text-right">{item.mediaDia.toFixed(1)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medicamentos" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon icon={MedicineBottle02Icon} strokeWidth={2} className="size-5" />
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
                    <TableHead className="text-right">Consumo Médio/Mês</TableHead>
                    <TableHead className="text-right">Cobertura (dias)</TableHead>
                    <TableHead>Criticidade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {estoqueMedicamentos.map((item) => (
                    <TableRow key={item.medicamento}>
                      <TableCell className="font-medium">{item.medicamento}</TableCell>
                      <TableCell className="text-right">{formatNumber(item.estoque)}</TableCell>
                      <TableCell className="text-right">{formatNumber(item.consumoMedio)}</TableCell>
                      <TableCell className="text-right">{item.cobertura} dias</TableCell>
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon icon={HeartCheckIcon} strokeWidth={2} className="size-5" />
                Programas de Saúde
              </CardTitle>
              <CardDescription>
                Cobertura e investimento nos principais programas de saúde pública.
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
                          {formatNumber(item.beneficiarios)} beneficiários • Investimento: {formatCurrency(item.investimento)}
                        </p>
                      </div>
                      <Badge variant="secondary">{item.cobertura.toFixed(1)}% cobertura</Badge>
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

        <TabsContent value="analises" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon icon={Calculator01Icon} strokeWidth={2} className="size-5" />
                Resumo Analítico da Saúde
              </CardTitle>
              <CardDescription>Indicadores consolidados de gestão e qualidade da saúde pública</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Execução Orçamentária</p>
                  <p className="text-3xl font-bold">{((saudeResumo.orcamentoEmpenhado / saudeResumo.orcamentoTotal) * 100).toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">Meta: 98% até dez/2024</p>
                  <Badge variant="outline">Atenção</Badge>
                </div>
                <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Cobertura ESF</p>
                  <p className="text-3xl font-bold">87,4%</p>
                  <p className="text-xs text-muted-foreground">Meta: 85% — superada</p>
                  <Badge variant="secondary" className="text-emerald-600">Excelente</Badge>
                </div>
                <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Resolutividade APS</p>
                  <p className="text-3xl font-bold">91,2%</p>
                  <p className="text-xs text-muted-foreground">Acima da média nacional (85%)</p>
                  <Badge variant="secondary" className="text-emerald-600">Ótimo</Badge>
                </div>
                <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Taxa Ocupação Média</p>
                  <p className="text-3xl font-bold">86,4%</p>
                  <p className="text-xs text-muted-foreground">Capacidade bem utilizada</p>
                  <Badge variant="outline">Adequado</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary bg-gradient-to-br from-primary/5 via-background to-background">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <HugeiconsIcon icon={BulbIcon} strokeWidth={2} className="size-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Análise Inteligente da Gestão de Saúde</CardTitle>
                  <CardDescription>Insights gerados com base nos dados do exercício corrente</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="leading-relaxed text-foreground">
                  A gestão de saúde municipal apresenta <strong>desempenho sólido nos indicadores de atenção básica</strong>. A cobertura da Estratégia Saúde da Família alcança <strong>87,4%</strong>, superando a meta de 85% e a média nacional de 75%. A resolutividade da APS está em <strong>91,2%</strong>, demonstrando eficiência no primeiro nível de atenção. O orçamento totaliza <strong>{formatCurrency(saudeResumo.orcamentoTotal)}</strong>, com execução de <strong>95%</strong>. Pontos de atenção incluem o tempo médio de espera (18 dias, acima da meta de 15), estoque crítico de insulina NPH (41 dias de cobertura) e déficit de profissionais em saúde mental (48,2% de cobertura).
                </p>
              </div>

              <Separator />

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="pontos-fortes">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon icon={Flag01Icon} strokeWidth={2} className="size-4 text-emerald-600" />
                      <span>Pontos Fortes da Gestão de Saúde</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pl-6">
                      <div className="flex gap-2">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Cobertura ESF acima da meta:</strong>{" "}
                          Com 87,4% da população coberta, o município supera a meta de 85% e está 12 pontos percentuais acima da média nacional (75%), demonstrando forte presença da atenção básica.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Alta resolutividade na APS:</strong>{" "}
                          91,2% dos casos resolvidos na Atenção Primária reduzem a sobrecarga no hospital e na UPA, otimizando recursos e melhorando a experiência do usuário.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Vacinação infantil próxima da meta:</strong>{" "}
                          94,2% de cobertura no programa Saúde da Criança, apenas 0,8 pontos abaixo da meta de 95% e acima da média estadual de 88%.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Boa utilização da capacidade instalada:</strong>{" "}
                          Taxa média de ocupação de 86,4% indica equilíbrio entre demanda e oferta, sem ociosidade nem sobrecarga excessiva.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pontos-atencao">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} className="size-4 text-amber-600" />
                      <span>Pontos de Atenção</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pl-6">
                      <div className="flex gap-2">
                        <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="mt-0.5 size-4 shrink-0 text-amber-600" />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Estoque crítico de insulina NPH:</strong>{" "}
                          Apenas 41 dias de cobertura, abaixo do mínimo recomendado de 60 dias. Necessário processo emergencial para atender pacientes diabéticos sem ruptura.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="mt-0.5 size-4 shrink-0 text-amber-600" />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Tempo de espera acima da meta:</strong>{" "}
                          18 dias de tempo médio, 20% acima da meta de 15 dias. Concentrado em cardiologia e ortopedia, demandando ampliação de oferta ou regulação mais eficiente.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="mt-0.5 size-4 shrink-0 text-amber-600" />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Déficit em saúde mental:</strong>{" "}
                          Cobertura de apenas 48,2% no programa, com necessidade de contratação de 3 psicólogos e 2 psiquiatras para atender a demanda reprimida.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="mt-0.5 size-4 shrink-0 text-amber-600" />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Pré-natal abaixo da meta:</strong>{" "}
                          78,5% das gestantes com 7+ consultas, abaixo da meta de 80%. Intensificar busca ativa e acompanhamento das gestantes de risco.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="recomendacoes">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon icon={BulbIcon} strokeWidth={2} className="size-4 text-blue-600" />
                      <span>Recomendações Estratégicas</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pl-6">
                      <div className="rounded-lg border bg-blue-50/50 p-3 dark:bg-blue-950/20">
                        <p className="mb-1 text-sm font-medium text-foreground">1. Aquisição Emergencial de Insulina</p>
                        <p className="text-xs text-muted-foreground">
                          Iniciar processo de dispensa de licitação para aquisição de insulina NPH, garantindo cobertura mínima de 90 dias e evitando desabastecimento para pacientes diabéticos.
                        </p>
                      </div>
                      <div className="rounded-lg border bg-blue-50/50 p-3 dark:bg-blue-950/20">
                        <p className="mb-1 text-sm font-medium text-foreground">2. Ampliação da Saúde Mental</p>
                        <p className="text-xs text-muted-foreground">
                          Realizar concurso público ou processo seletivo para contratação de 3 psicólogos e 2 psiquiatras, elevando a cobertura do programa de 48,2% para pelo menos 70% até o final do exercício.
                        </p>
                      </div>
                      <div className="rounded-lg border bg-blue-50/50 p-3 dark:bg-blue-950/20">
                        <p className="mb-1 text-sm font-medium text-foreground">3. Redução do Tempo de Espera</p>
                        <p className="text-xs text-muted-foreground">
                          Implementar mutirões em cardiologia e ortopedia, negociar credenciamento de prestadores privados ou ampliar carga horária dos especialistas para reduzir fila de 18 para 15 dias.
                        </p>
                      </div>
                      <div className="rounded-lg border bg-blue-50/50 p-3 dark:bg-blue-950/20">
                        <p className="mb-1 text-sm font-medium text-foreground">4. Intensificação do Pré-natal</p>
                        <p className="text-xs text-muted-foreground">
                          Capacitar agentes comunitários para busca ativa de gestantes, implementar sistema de lembretes via SMS/WhatsApp e oferecer transporte para gestantes de área rural.
                        </p>
                      </div>
                      <div className="rounded-lg border bg-blue-50/50 p-3 dark:bg-blue-950/20">
                        <p className="mb-1 text-sm font-medium text-foreground">5. Execução Orçamentária</p>
                        <p className="text-xs text-muted-foreground">
                          Acelerar empenho dos 5% restantes do orçamento (R$ 2,6 milhões) até novembro para evitar devolução de recursos federais vinculados ao SUS e garantir aplicação do mínimo constitucional.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator />

              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="flex gap-3">
                  <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Conclusão Analítica</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      A gestão de saúde municipal demonstra <strong>excelência na atenção básica</strong>, com cobertura ESF e resolutividade da APS acima das médias nacional e estadual. Os principais desafios concentram-se na <strong>redução do tempo de espera para especialidades</strong> (cardiologia e ortopedia), <strong>ampliação da saúde mental</strong> (déficit de 52% na cobertura) e <strong>gestão de estoque de medicamentos críticos</strong> (insulina NPH). A adoção das recomendações propostas — especialmente a aquisição emergencial de insulina, contratação de profissionais de saúde mental e mutirões de especialidades — pode elevar ainda mais a qualidade do atendimento e garantir o cumprimento das metas constitucionais e pactuadas.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Alertas e Notificações</h3>
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
  );
}
