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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DeliveryTruck01Icon,
  Analytics01Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  Building04Icon,
  Calendar01Icon,
  ChartLineData02Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  CoinsDollarIcon,
  ConstructionIcon,
  Download01Icon,
  FileValidationIcon,
  FilterIcon,
  MoneySend01Icon,
  PieChart02Icon,
  RefreshIcon,
  SecurityCheckIcon,
  Target01Icon,
  AlertCircleIcon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";
import { KpiCard } from "@/components/ui/kpi-card";
import { cn } from "@/lib/utils";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

const formatNumber = (value: number) =>
  new Intl.NumberFormat("pt-BR").format(value);

const formatKm = (value: number) =>
  `${new Intl.NumberFormat("pt-BR").format(value)} km`;

function pontuacaoSaudeFrota(
  disponibilidadePct: number,
  preventivaPct: number,
  conferenciaNfPct: number,
) {
  return Math.round(
    disponibilidadePct * 0.45 + preventivaPct * 0.35 + conferenciaNfPct * 0.2,
  );
}

/** Composição da frota: veículos próprios, cedidos e locados (prestação de contas / governança). */
const composicaoPatrimonio = [
  { tipo: "Próprios", quantidade: 102, fill: "var(--chart-1)" },
  { tipo: "Cedidos", quantidade: 28, fill: "var(--chart-2)" },
  { tipo: "Locados", quantidade: 18, fill: "var(--chart-3)" },
];

const chartConfigComposicao = {
  Próprios: { label: "Próprios", color: "var(--chart-1)" },
  Cedidos: { label: "Cedidos", color: "var(--chart-2)" },
  Locados: { label: "Locados", color: "var(--chart-3)" },
} satisfies ChartConfig;

const custoCombustivelMensal = [
  { mes: "Jul", litros: 42800, valor: 278200, km: 412000 },
  { mes: "Ago", litros: 44100, valor: 286500, km: 425500 },
  { mes: "Set", litros: 40200, valor: 261800, km: 398200 },
  { mes: "Out", litros: 45500, valor: 302400, km: 438900 },
  { mes: "Nov", litros: 46800, valor: 312100, km: 451200 },
  { mes: "Dez", litros: 45200, valor: 298750, km: 442800 },
];

const chartConfigCusto = {
  valor: { label: "Combustível (R$)", color: "var(--chart-1)" },
  km: { label: "Km rodados", color: "var(--chart-2)" },
} satisfies ChartConfig;

const utilizacaoPorSecretaria = [
  { secretaria: "SEMSA", utilizacaoPct: 78, custoKm: 1.95, viagens: 1840 },
  { secretaria: "SEMED", utilizacaoPct: 72, custoKm: 1.71, viagens: 1620 },
  { secretaria: "SEMINF", utilizacaoPct: 81, custoKm: 2.12, viagens: 980 },
  { secretaria: "GAB", utilizacaoPct: 54, custoKm: 1.58, viagens: 420 },
  { secretaria: "SEMAD", utilizacaoPct: 62, custoKm: 1.64, viagens: 510 },
  { secretaria: "Def. Civil", utilizacaoPct: 44, custoKm: 2.45, viagens: 290 },
];

const chartConfigUtil = {
  utilizacaoPct: {
    label: "Utilização (%)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const manutencaoPreventivaVsCorretiva = [
  { name: "Preventiva", valor: 186, fill: "var(--chart-2)" },
  { name: "Corretiva", valor: 88, fill: "var(--chart-4)" },
];

const chartConfigManut = {
  Preventiva: { label: "Preventiva", color: "var(--chart-2)" },
  Corretiva: { label: "Corretiva", color: "var(--chart-4)" },
} satisfies ChartConfig;

type Veiculo = {
  placa: string;
  tipo: string;
  secretaria: string;
  status: "disponivel" | "manutencao" | "reserva" | "inativo";
  kmAtual: number;
  kmL12m: number;
  patrimonio: "proprio" | "cedido" | "locado";
  proximaRevisaoKm: number;
  condutor: string;
};

const veiculos: Veiculo[] = [
  {
    placa: "ABC1D23",
    tipo: "Ambulância SU",
    secretaria: "SEMSA",
    status: "disponivel",
    kmAtual: 128400,
    kmL12m: 4.2,
    patrimonio: "proprio",
    proximaRevisaoKm: 130000,
    condutor: "Equipe plantão",
  },
  {
    placa: "DEF4E56",
    tipo: "Van escolar",
    secretaria: "SEMED",
    status: "disponivel",
    kmAtual: 89200,
    kmL12m: 8.6,
    patrimonio: "proprio",
    proximaRevisaoKm: 90000,
    condutor: "J. Almeida",
  },
  {
    placa: "GHI7F89",
    tipo: "Caminhonete 4x4",
    secretaria: "SEMINF",
    status: "manutencao",
    kmAtual: 156780,
    kmL12m: 7.9,
    patrimonio: "proprio",
    proximaRevisaoKm: 158000,
    condutor: "M. Santos",
  },
  {
    placa: "JKL0G12",
    tipo: "Sedan administrativo",
    secretaria: "GAB",
    status: "reserva",
    kmAtual: 45200,
    kmL12m: 11.2,
    patrimonio: "cedido",
    proximaRevisaoKm: 48000,
    condutor: "—",
  },
  {
    placa: "MNO3H45",
    tipo: "Ônibus rural",
    secretaria: "SEMED",
    status: "disponivel",
    kmAtual: 201100,
    kmL12m: 3.8,
    patrimonio: "locado",
    proximaRevisaoKm: 202000,
    condutor: "R. Costa",
  },
  {
    placa: "PQR6I78",
    tipo: "Pickup frota",
    secretaria: "Def. Civil",
    status: "disponivel",
    kmAtual: 67800,
    kmL12m: 9.1,
    patrimonio: "proprio",
    proximaRevisaoKm: 70000,
    condutor: "Equipe operacional",
  },
  {
    placa: "STU9J01",
    tipo: "Utilitário fiscal",
    secretaria: "SEMFAZ",
    status: "disponivel",
    kmAtual: 93400,
    kmL12m: 10.4,
    patrimonio: "proprio",
    proximaRevisaoKm: 95000,
    condutor: "L. Ferreira",
  },
  {
    placa: "VWX2K34",
    tipo: "Micro-ônibus",
    secretaria: "SEMSA",
    status: "inativo",
    kmAtual: 312000,
    kmL12m: 5.1,
    patrimonio: "proprio",
    proximaRevisaoKm: 315000,
    condutor: "Baixado p/ licitação",
  },
];

const abastecimentos = [
  {
    data: "08/12/2024",
    placa: "DEF4E56",
    litros: 62,
    valor: 398.5,
    posto: "Rede Cred. PM-042",
    hodometro: 89140,
    combustivel: "Diesel S10",
    nf: "NF-e 88421",
  },
  {
    data: "08/12/2024",
    placa: "ABC1D23",
    litros: 48,
    valor: 312.0,
    posto: "Rede Cred. PM-042",
    hodometro: 128320,
    combustivel: "Gasolina",
    nf: "NF-e 88419",
  },
  {
    data: "07/12/2024",
    placa: "PQR6I78",
    litros: 55,
    valor: 352.75,
    posto: "Auto Posto Convênio 12",
    hodometro: 67620,
    combustivel: "Diesel S10",
    nf: "NF-e 22108",
  },
  {
    data: "07/12/2024",
    placa: "STU9J01",
    litros: 42,
    valor: 271.2,
    posto: "Rede Cred. PM-042",
    hodometro: 93380,
    combustivel: "Gasolina",
    nf: "NF-e 88402",
  },
  {
    data: "06/12/2024",
    placa: "MNO3H45",
    litros: 180,
    valor: 1128.0,
    posto: "Distribuidora Sul Ltda",
    hodometro: 200980,
    combustivel: "Diesel S10",
    nf: "NF-e 910334",
  },
];

const ordensServico = [
  {
    os: "OS-2024-8841",
    placa: "GHI7F89",
    tipo: "Corretiva",
    descricao: "Embreagem + revisão de freios",
    valor: 4280,
    status: "em_execucao",
    oficina: "Oficina Municipal / convênio",
  },
  {
    os: "OS-2024-8836",
    placa: "DEF4E56",
    tipo: "Preventiva",
    descricao: "Revisão 90.000 km",
    valor: 1850,
    status: "concluida",
    oficina: "Auto Center Credenciado",
  },
  {
    os: "OS-2024-8832",
    placa: "ABC1D23",
    tipo: "Preventiva",
    descricao: "Inspeção anual + ar condicionado",
    valor: 2340,
    status: "aguardando_peca",
    oficina: "Oficina Municipal / convênio",
  },
  {
    os: "OS-2024-8828",
    placa: "VWX2K34",
    tipo: "Corretiva",
    descricao: "Motor — avaliação para baixa",
    valor: 12100,
    status: "orcamento",
    oficina: "Diesel Pesados SA",
  },
];

/** Totais consolidados da frota (painel executivo); a tabela lista apenas uma amostra operacional. */
const frotaResumo = {
  total: 148,
  disponiveis: 139,
  manutencao: 6,
  reserva: 2,
  inativo: 1,
};

const checklistConformidade = [
  {
    item: "Relatório consolidado de abastecimento (mês)",
    ok: true,
    detalhe: "Dez/2024 fechado em 05/01",
  },
  {
    item: "Relação de veículos próprios e cedidos",
    ok: true,
    detalhe: "Atualizado no patrimônio",
  },
  {
    item: "Contratos de locação / sublocação vigentes",
    ok: true,
    detalhe: "3 contratos dentro do prazo",
  },
  {
    item: "Conferência NF-e x hodômetro (amostragem)",
    ok: false,
    detalhe: "2 lançamentos pendentes de vínculo",
  },
  {
    item: "Cronograma de preventivas em dia",
    ok: true,
    detalhe: "92% dentro da janela",
  },
];

function StatusVeiculoBadge({ status }: { status: Veiculo["status"] }) {
  const map = {
    disponivel: {
      className:
        "bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-800",
      label: "Disponível",
    },
    manutencao: {
      className:
        "bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-800",
      label: "Manutenção",
    },
    reserva: {
      className:
        "bg-sky-100 text-sky-900 border-sky-200 dark:bg-sky-950 dark:text-sky-100 dark:border-sky-800",
      label: "Reserva",
    },
    inativo: {
      className:
        "bg-zinc-200 text-zinc-800 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-600",
      label: "Inativo",
    },
  };
  const c = map[status];
  return (
    <Badge variant="outline" className={cn("font-normal", c.className)}>
      {c.label}
    </Badge>
  );
}

function PatrimonioBadge({ p }: { p: Veiculo["patrimonio"] }) {
  const labels = { proprio: "Próprio", cedido: "Cedido", locado: "Locado" };
  return <span className="text-xs text-muted-foreground">{labels[p]}</span>;
}

/** Faixa empilhada — visão rápida da composição patrimonial (órgãos públicos). */
function ComposicaoFrotaStrip() {
  const total = composicaoPatrimonio.reduce((s, x) => s + x.quantidade, 0);
  return (
    <div className="space-y-3">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
        {composicaoPatrimonio.map((seg) => (
          <div
            key={seg.tipo}
            className="h-full transition-all"
            style={{
              width: `${(seg.quantidade / total) * 100}%`,
              background: seg.fill,
            }}
            title={`${seg.tipo}: ${seg.quantidade}`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {composicaoPatrimonio.map((seg) => (
          <span key={seg.tipo} className="inline-flex items-center gap-1.5">
            <span
              className="size-2.5 shrink-0 rounded-sm"
              style={{ background: seg.fill }}
            />
            {seg.tipo}:{" "}
            <strong className="text-foreground">{seg.quantidade}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Índice sintético de “saúde” da frota (disponibilidade + preventiva + conformidade). */
function IndiceSaudeFrota({
  disponibilidadePct,
  preventivaPct,
  conferenciaNfPct,
}: {
  disponibilidadePct: number;
  preventivaPct: number;
  conferenciaNfPct: number;
}) {
  const score = pontuacaoSaudeFrota(
    disponibilidadePct,
    preventivaPct,
    conferenciaNfPct,
  );
  return (
    <Card className="border-dashed">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <HugeiconsIcon
            icon={Target01Icon}
            strokeWidth={2}
            className="size-5 text-primary"
          />
          Índice de saúde da frota
        </CardTitle>
        <CardDescription>
          Peso: disponibilidade 45%, preventivas 35%, conferência documental 20%
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-4xl font-bold tabular-nums text-foreground">
              {score}
            </p>
            <p className="text-xs text-muted-foreground">de 100 pontos</p>
          </div>
          <Badge
            variant="secondary"
            className={cn(
              score >= 85 &&
                "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100",
              score >= 70 &&
                score < 85 &&
                "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100",
              score < 70 &&
                "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-100",
            )}
          >
            {score >= 85 ? "Excelente" : score >= 70 ? "Atenção" : "Crítico"}
          </Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Disponibilidade</p>
            <Progress
              value={disponibilidadePct}
              className="h-2 [&>div]:bg-emerald-500"
            />
            <p className="text-xs font-medium tabular-nums">
              {disponibilidadePct}%
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              OS preventivas / total
            </p>
            <Progress
              value={preventivaPct}
              className="h-2 [&>div]:bg-emerald-500"
            />
            <p className="text-xs font-medium tabular-nums">{preventivaPct}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">NF conferidas</p>
            <Progress
              value={conferenciaNfPct}
              className="h-2 [&>div]:bg-emerald-500"
            />
            <p className="text-xs font-medium tabular-nums">
              {conferenciaNfPct}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Frotas() {
  const [periodo, setPeriodo] = React.useState("12m");
  const [secretariaFiltro, setSecretariaFiltro] =
    React.useState<string>("todas");
  const [buscaPlaca, setBuscaPlaca] = React.useState("");
  const [somenteProprios, setSomenteProprios] = React.useState(false);

  const totaisPatrimonio = composicaoPatrimonio.reduce(
    (s, x) => s + x.quantidade,
    0,
  );
  const disponiveisPainel = frotaResumo.disponiveis;
  const emManutencaoPainel = frotaResumo.manutencao;
  const disponibilidadePct =
    Math.round((disponiveisPainel / frotaResumo.total) * 1000) / 10;
  const kmLMedio = 9.1;
  const custoPorKm = 1.82;
  const utilizacaoHorasPct = 71;
  const pctPreventiva = 68;
  const sinistralidade = 1.8;
  const ytdCombustivel = 1_742_000;
  const conferenciaNfPct = 94;

  const veiculosFiltrados = veiculos.filter((v) => {
    if (secretariaFiltro !== "todas" && v.secretaria !== secretariaFiltro)
      return false;
    if (somenteProprios && v.patrimonio !== "proprio") return false;
    if (buscaPlaca.trim()) {
      const q = buscaPlaca.trim().toUpperCase();
      if (!v.placa.includes(q) && !v.tipo.toUpperCase().includes(q))
        return false;
    }
    return true;
  });

  const secretarias = Array.from(
    new Set(veiculos.map((v) => v.secretaria)),
  ).sort();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Gestão de frotas
          </h2>
          <p className="text-sm text-muted-foreground">
            Indicadores de custo, eficiência, manutenção e conformidade para
            veículos oficiais
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
              <SelectItem value="12m">Últimos 12 meses</SelectItem>
              <SelectItem value="2024">Exercício 2024</SelectItem>
            </SelectContent>
          </Select>
          <Select value={secretariaFiltro} onValueChange={setSecretariaFiltro}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Órgão" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todos os órgãos</SelectItem>
              {secretarias.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" type="button">
            <HugeiconsIcon
              icon={FilterIcon}
              strokeWidth={2}
              className="mr-2 size-4"
            />
            Filtros
          </Button>
          <Button variant="outline" size="sm" type="button">
            <HugeiconsIcon
              icon={Download01Icon}
              strokeWidth={2}
              className="mr-2 size-4"
            />
            Exportar
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-9"
            type="button"
            aria-label="Atualizar"
          >
            <HugeiconsIcon
              icon={RefreshIcon}
              strokeWidth={2}
              className="size-4"
            />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Frota sob gestão"
          icon={DeliveryTruck01Icon}
          value={formatNumber(totaisPatrimonio)}
          borderColor="border-l-blue-500"
          footer={
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                {formatNumber(disponiveisPainel)} disponíveis ·{" "}
                {formatNumber(emManutencaoPainel)} em manutenção
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <HugeiconsIcon
                  icon={ArrowUp01Icon}
                  strokeWidth={2}
                  className="size-3 text-emerald-600"
                />
                <span className="text-emerald-600">+3 unidades</span>
                <span>vs. ano anterior</span>
              </div>
            </div>
          }
        />
        <KpiCard
          title="Disponibilidade"
          icon={CheckmarkCircle02Icon}
          value={`${disponibilidadePct}%`}
          borderColor="border-l-emerald-500"
          footer={
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Meta institucional: 90%
              </p>
              <Progress
                value={Math.min(disponibilidadePct, 100)}
                className="h-1.5 [&>div]:bg-emerald-500"
              />
            </div>
          }
        />
        <KpiCard
          title="Consumo médio"
          icon={Analytics01Icon}
          value={`${kmLMedio.toFixed(1)} km/L`}
          borderColor="border-l-violet-500"
          footer={
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                Meta de eficiência: 8,5 km/L (frota mista)
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <HugeiconsIcon
                  icon={ArrowUp01Icon}
                  strokeWidth={2}
                  className="size-3 text-emerald-600"
                />
                <span className="text-emerald-600">+0,3 km/L</span>
                <span>vs. trimestre anterior (quanto maior, melhor)</span>
              </div>
            </div>
          }
        />
        <KpiCard
          title="Custo operacional / km"
          icon={MoneySend01Icon}
          value={formatCurrency(custoPorKm)}
          borderColor="border-l-amber-500"
          footer={
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                Combustível + manutenção + pneus (média)
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  strokeWidth={2}
                  className="size-3 text-emerald-600"
                />
                <span className="text-emerald-600">−3,1%</span>
                <span>vs. mês anterior</span>
              </div>
            </div>
          }
        />
        <KpiCard
          title="Taxa de utilização"
          icon={Clock01Icon}
          value={`${utilizacaoHorasPct}%`}
          borderColor="border-l-cyan-500"
          footer={
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                Horas em serviço / horas úteis da frota
              </p>
              <Progress
                value={utilizacaoHorasPct}
                className="h-1.5 [&>div]:bg-emerald-500"
              />
            </div>
          }
        />
        <KpiCard
          title="Manutenção preventiva"
          icon={ConstructionIcon}
          value={`${pctPreventiva}%`}
          borderColor="border-l-teal-500"
          footer={
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                Das ordens de serviço no período
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <HugeiconsIcon
                  icon={ArrowUp01Icon}
                  strokeWidth={2}
                  className="size-3 text-emerald-600"
                />
                <span className="text-emerald-600">+4 pts</span>
                <span>vs. semestre anterior</span>
              </div>
            </div>
          }
        />
        <KpiCard
          title="Sinistralidade"
          icon={AlertCircleIcon}
          value={`${sinistralidade} / 100 mil km`}
          borderColor="border-l-red-400"
          footer={
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                Eventos com vítima ou dano relevante
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  strokeWidth={2}
                  className="size-3 text-emerald-600"
                />
                <span className="text-emerald-600">−0,4</span>
                <span>vs. ano anterior (quanto menor, melhor)</span>
              </div>
            </div>
          }
        />
        <KpiCard
          title="Gasto com combustível (YTD)"
          icon={CoinsDollarIcon}
          value={formatCurrency(ytdCombustivel)}
          borderColor="border-l-orange-500"
          footer={
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                Inclui postos credenciados e cartão frota
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <HugeiconsIcon
                  icon={ArrowUp01Icon}
                  strokeWidth={2}
                  className="size-3 text-amber-600"
                />
                <span className="text-amber-600">+5,8%</span>
                <span>vs. mesmo período (km rodados +6,2%)</span>
              </div>
            </div>
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <HugeiconsIcon
                icon={Building04Icon}
                strokeWidth={2}
                className="size-5"
              />
              Composição patrimonial da frota
            </CardTitle>
            <CardDescription>
              Distribuição entre veículos próprios, cedidos e locados — base
              para relatórios e controle patrimonial
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <ComposicaoFrotaStrip />
            <div className="min-h-[200px]">
              <ChartContainer
                config={chartConfigComposicao}
                className="mx-auto aspect-square max-h-[220px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Pie
                      data={composicaoPatrimonio}
                      dataKey="quantidade"
                      nameKey="tipo"
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={80}
                      paddingAngle={2}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {composicaoPatrimonio.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <IndiceSaudeFrota
          disponibilidadePct={disponibilidadePct}
          preventivaPct={pctPreventiva}
          conferenciaNfPct={conferenciaNfPct}
        />
      </div>

      <Tabs defaultValue="operacao" className="w-full">
        <TabsList
          variant="line"
          className="w-full flex-wrap justify-start gap-1"
        >
          <TabsTrigger value="operacao" className="gap-1.5">
            <HugeiconsIcon
              icon={ChartLineData02Icon}
              strokeWidth={2}
              className="size-4"
            />
            Operação e custos
          </TabsTrigger>
          <TabsTrigger value="veiculos" className="gap-1.5">
            <HugeiconsIcon
              icon={DeliveryTruck01Icon}
              strokeWidth={2}
              className="size-4"
            />
            Veículos
          </TabsTrigger>
          <TabsTrigger value="manutencao" className="gap-1.5">
            <HugeiconsIcon
              icon={ConstructionIcon}
              strokeWidth={2}
              className="size-4"
            />
            Manutenção e segurança
          </TabsTrigger>
          <TabsTrigger value="conformidade" className="gap-1.5">
            <HugeiconsIcon
              icon={FileValidationIcon}
              strokeWidth={2}
              className="size-4"
            />
            Conformidade
          </TabsTrigger>
        </TabsList>

        <TabsContent value="operacao" className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Custo de combustível e km rodados</CardTitle>
                <CardDescription>
                  Evolução mensal — correlacionar litros, valores e utilização
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfigCusto}>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={custoCombustivelMensal}>
                      <defs>
                        <linearGradient
                          id="fillValorFrotas"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--chart-1)"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--chart-1)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-border/50"
                      />
                      <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                      <YAxis
                        yAxisId="left"
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(value, name) => {
                              const n = String(name);
                              if (n === "valor")
                                return [
                                  formatCurrency(Number(value)),
                                  "Combustível",
                                ];
                              if (n === "km")
                                return [formatKm(Number(value)), "Km rodados"];
                              return [value, name];
                            }}
                          />
                        }
                      />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="valor"
                        stroke="var(--chart-1)"
                        fill="url(#fillValorFrotas)"
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="km"
                        stroke="var(--chart-2)"
                        strokeWidth={2}
                        dot={{
                          r: 3,
                          fill: "var(--chart-2)",
                          stroke: "var(--background)",
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Utilização por secretaria</CardTitle>
                <CardDescription>
                  Percentual de uso programado x realizado e custo médio por km
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfigUtil}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={utilizacaoPorSecretaria}
                      layout="vertical"
                      margin={{ left: 8 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-border/50"
                      />
                      <XAxis
                        type="number"
                        domain={[0, 100]}
                        tickLine={false}
                        axisLine={false}
                        unit="%"
                      />
                      <YAxis
                        type="category"
                        dataKey="secretaria"
                        width={72}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(value, name, item) => {
                              const payload =
                                item.payload as (typeof utilizacaoPorSecretaria)[0];
                              if (name === "utilizacaoPct") {
                                return [
                                  `${value}% (custo/km ${formatCurrency(payload.custoKm)})`,
                                  "Utilização",
                                ];
                              }
                              return [value, name];
                            }}
                          />
                        }
                      />
                      <Bar
                        dataKey="utilizacaoPct"
                        fill="var(--color-utilizacaoPct)"
                        radius={[0, 4, 4, 0]}
                        name="utilizacaoPct"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={SecurityCheckIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Últimos abastecimentos registrados
              </CardTitle>
              <CardDescription>
                Hodômetro, NF-e e posto credenciado — rastreabilidade para
                auditoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Placa</TableHead>
                      <TableHead>Combustível</TableHead>
                      <TableHead className="text-right">Litros</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="text-right">Hodômetro</TableHead>
                      <TableHead>Posto / doc.</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {abastecimentos.map((a, i) => (
                      <TableRow key={i}>
                        <TableCell className="whitespace-nowrap font-medium">
                          {a.data}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {a.placa}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {a.combustivel}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {a.litros} L
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(a.valor)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatNumber(a.hodometro)}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{a.posto}</span>
                          <p className="text-xs text-muted-foreground">
                            {a.nf}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="veiculos" className="mt-6 space-y-4">
          <Card>
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <CardTitle>Cadastro operacional da frota</CardTitle>
                <CardDescription>
                  Status, quilometragem, patrimônio e próxima revisão programada
                </CardDescription>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[280px]">
                <div className="space-y-1.5">
                  <Label htmlFor="busca-frota" className="text-xs">
                    Buscar placa ou tipo
                  </Label>
                  <Input
                    id="busca-frota"
                    placeholder="Ex.: ABC ou Van"
                    value={buscaPlaca}
                    onChange={(e) => setBuscaPlaca(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                  <Label
                    htmlFor="switch-proprios"
                    className="text-xs font-normal leading-snug"
                  >
                    Somente veículos próprios
                  </Label>
                  <Switch
                    id="switch-proprios"
                    checked={somenteProprios}
                    onCheckedChange={setSomenteProprios}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Placa</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Órgão</TableHead>
                      <TableHead>Patrimônio</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Km atual</TableHead>
                      <TableHead className="text-right">Km/L (12 m)</TableHead>
                      <TableHead className="text-right">
                        Próx. revisão
                      </TableHead>
                      <TableHead>Condutor / responsável</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {veiculosFiltrados.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="h-24 text-center text-muted-foreground"
                        >
                          Nenhum veículo com os filtros atuais.
                        </TableCell>
                      </TableRow>
                    ) : (
                      veiculosFiltrados.map((v) => (
                        <TableRow key={v.placa}>
                          <TableCell className="font-mono font-medium">
                            {v.placa}
                          </TableCell>
                          <TableCell>{v.tipo}</TableCell>
                          <TableCell>{v.secretaria}</TableCell>
                          <TableCell>
                            <PatrimonioBadge p={v.patrimonio} />
                          </TableCell>
                          <TableCell>
                            <StatusVeiculoBadge status={v.status} />
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatNumber(v.kmAtual)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {v.kmL12m.toFixed(1)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums text-muted-foreground">
                            {formatNumber(v.proximaRevisaoKm)}
                          </TableCell>
                          <TableCell className="max-w-[160px] truncate text-sm text-muted-foreground">
                            {v.condutor}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manutencao" className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={PieChart02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Preventiva × corretiva
                </CardTitle>
                <CardDescription>
                  Equilíbrio recomendado: maior peso em preventiva para reduzir
                  paradas e custo total
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfigManut}
                  className="mx-auto aspect-auto h-[280px] w-full"
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
                      data={manutencaoPreventivaVsCorretiva}
                      dataKey="valor"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {manutencaoPreventivaVsCorretiva.map((e, i) => (
                        <Cell key={i} fill={e.fill} />
                      ))}
                    </Pie>
                    <ChartLegend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      content={
                        <ChartPieValueLegend
                          nameKey="name"
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
                <CardTitle>Indicadores de segurança viária</CardTitle>
                <CardDescription>
                  Consolidado do período selecionado (dados ilustrativos)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border bg-card p-4">
                    <p className="text-xs text-muted-foreground">
                      Treinamentos defensivos
                    </p>
                    <p className="text-2xl font-bold tabular-nums">186</p>
                    <p className="text-xs text-muted-foreground">
                      condutores atualizados
                    </p>
                  </div>
                  <div className="rounded-xl border bg-card p-4">
                    <p className="text-xs text-muted-foreground">
                      Infrações gravíssimas
                    </p>
                    <p className="text-2xl font-bold tabular-nums text-amber-700 dark:text-amber-400">
                      7
                    </p>
                    <p className="text-xs text-muted-foreground">
                      em análise disciplinar
                    </p>
                  </div>
                  <div className="rounded-xl border bg-card p-4">
                    <p className="text-xs text-muted-foreground">
                      Dias médios parados (OS)
                    </p>
                    <p className="text-2xl font-bold tabular-nums">4,2</p>
                    <p className="text-xs text-muted-foreground">
                      após abertura
                    </p>
                  </div>
                  <div className="rounded-xl border bg-card p-4">
                    <p className="text-xs text-muted-foreground">
                      Check-list pré-viagem
                    </p>
                    <p className="text-2xl font-bold tabular-nums text-emerald-600">
                      91%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      preenchimento no app frota
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="mt-0.5 size-4 shrink-0"
                  />
                  <p>
                    Programas de <strong>capacitação</strong> e controle de{" "}
                    <strong>infrações</strong> reduzem sinistralidade e custos
                    com terceiros — alinhado a modelos de gestão por indicadores
                    em frotas públicas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ordens de serviço em andamento e recentes</CardTitle>
              <CardDescription>
                Oficina credenciada, tipo de intervenção e situação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>OS</TableHead>
                    <TableHead>Placa</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Valor (est.)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Oficina</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordensServico.map((o) => (
                    <TableRow key={o.os}>
                      <TableCell className="font-mono text-sm">
                        {o.os}
                      </TableCell>
                      <TableCell className="font-mono">{o.placa}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            o.tipo === "Preventiva" ? "secondary" : "outline"
                          }
                        >
                          {o.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] text-sm text-muted-foreground">
                        {o.descricao}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(o.valor)}
                      </TableCell>
                      <TableCell>
                        <span className="text-xs capitalize text-muted-foreground">
                          {o.status.replace(/_/g, " ")}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">{o.oficina}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conformidade" className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Calendar01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Checklist de governança
                </CardTitle>
                <CardDescription>
                  Itens frequentemente exigidos em auditorias e cartilhas de
                  controle de frota municipal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {checklistConformidade.map((c) => (
                  <div
                    key={c.item}
                    className={cn(
                      "flex gap-3 rounded-lg border p-3",
                      c.ok
                        ? "border-border/80 bg-muted/20"
                        : "border-amber-500/40 bg-amber-500/5",
                    )}
                  >
                    <HugeiconsIcon
                      icon={c.ok ? CheckmarkCircle02Icon : AlertCircleIcon}
                      strokeWidth={2}
                      className={cn(
                        "mt-0.5 size-5 shrink-0",
                        c.ok ? "text-emerald-600" : "text-amber-600",
                      )}
                    />
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="text-sm font-medium leading-snug">
                        {c.item}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {c.detalhe}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Próximas ações sugeridas</CardTitle>
                <CardDescription>
                  Priorização com base nos gargalos do painel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="font-semibold text-foreground">1.</span>
                    Concluir conferência das NF-e pendentes e amarrar ao
                    hodômetro no sistema.
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-foreground">2.</span>
                    Revisar contratos de locação com custo/km acima da média
                    (ex.: Def. Civil).
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-foreground">3.</span>
                    Antecipar preventivas da frota SEMSA com km acima de 125
                    mil.
                  </li>
                </ul>
                <Separator />
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  type="button"
                >
                  <HugeiconsIcon
                    icon={Download01Icon}
                    strokeWidth={2}
                    className="mr-2 size-4"
                  />
                  Gerar pacote para prestação de contas (PDF)
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
