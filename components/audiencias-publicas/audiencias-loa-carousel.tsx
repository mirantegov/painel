"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Wallet01Icon,
  MoneyAdd01Icon,
  BankIcon,
  Building04Icon,
  BookOpen02Icon,
  Stethoscope02Icon,
  UserMultipleIcon,
  ConstructionIcon,
  Analytics01Icon,
  CheckmarkCircle02Icon,
  Invoice01Icon,
  Home01Icon,
  SecurityCheckIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import * as d from "@/lib/demo-audiencias-loa";

const AUTOPLAY_MS = 20_000;

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

function brlM(v: number): string {
  if (v >= 1_000_000)
    return `R$ ${(v / 1_000_000).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`;
  if (v >= 1_000)
    return `R$ ${(v / 1_000).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}K`;
  return brl.format(v);
}

function requestFullscreenEl(el: HTMLElement) {
  const w = el as HTMLElement & { webkitRequestFullscreen?: () => void };
  if (el.requestFullscreen) return el.requestFullscreen();
  if (w.webkitRequestFullscreen) {
    w.webkitRequestFullscreen();
    return Promise.resolve();
  }
  return Promise.reject(new Error("fullscreen unavailable"));
}

function exitFullscreenDoc() {
  const doc = document as Document & { webkitExitFullscreen?: () => void };
  if (document.fullscreenElement && document.exitFullscreen)
    return document.exitFullscreen();
  if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
  return Promise.resolve();
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

// ── Slide section header ───────────────────────────────────────────────────────
function SlideHeader({
  titulo,
  subtitulo,
}: {
  titulo: string;
  subtitulo?: string;
}) {
  return (
    <div className="flex-none space-y-0.5 border-b border-border/50 pb-3">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{titulo}</h2>
      {subtitulo && (
        <p className="text-base text-muted-foreground">{subtitulo}</p>
      )}
    </div>
  );
}

// ── GaugeConstitucional ────────────────────────────────────────────────────────
function GaugeConstitucional({
  titulo,
  valor,
  base,
  limitePct,
  lei,
  descricao,
}: {
  titulo: string;
  valor: number;
  base: number;
  limitePct: number;
  lei: string;
  descricao: string;
}) {
  const pct = (valor / base) * 100;
  const acima = pct >= limitePct;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{titulo}</h3>
        <Badge
          className={
            acima
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-red-600 text-white hover:bg-red-700"
          }
        >
          {acima ? "Acima do mínimo ✓" : "Abaixo do mínimo ✗"}
        </Badge>
      </div>

      <div className="py-2 text-center">
        <span
          className={cn(
            "text-7xl font-bold tabular-nums",
            acima
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400",
          )}
        >
          {pct.toFixed(1)}%
        </span>
        <p className="mt-1 text-lg text-muted-foreground">
          aplicado sobre a base de cálculo
        </p>
      </div>

      <div className="space-y-2">
        <div className="relative h-12 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              acima ? "bg-green-500" : "bg-red-500",
            )}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
          <div
            className="absolute top-0 h-full w-1 bg-foreground/50"
            style={{ left: `${limitePct}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>0%</span>
          <span className="font-medium">
            Mínimo constitucional: {limitePct}% — {lei}
          </span>
          <span>100%</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Base de cálculo
            </p>
            <p className="mt-1 text-lg font-semibold">{brlM(base)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Mínimo obrigatório
            </p>
            <p className="mt-1 text-lg font-semibold text-amber-600 dark:text-amber-400">
              {brlM((base * limitePct) / 100)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Previsto na LOA
            </p>
            <p
              className={cn(
                "mt-1 text-lg font-semibold",
                acima
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400",
              )}
            >
              {brlM(valor)}
            </p>
          </CardContent>
        </Card>
      </div>

      <p className="text-center text-sm text-muted-foreground">{descricao}</p>
    </div>
  );
}

// ── GaugeSimples (used in Slide 12 — two bars) ────────────────────────────────
function GaugeSimples({
  titulo,
  valor,
  base,
  limitePct,
  lei,
}: {
  titulo: string;
  valor: number;
  base: number;
  limitePct: number;
  lei: string;
}) {
  const pct = (valor / base) * 100;
  const dentro = pct <= limitePct;
  const scaleMax = limitePct * 1.25;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{titulo}</p>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "text-3xl font-bold tabular-nums",
              dentro
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400",
            )}
          >
            {pct.toFixed(2)}%
          </span>
          <Badge
            className={
              dentro
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-red-600 text-white hover:bg-red-700"
            }
          >
            {dentro ? "Dentro do limite ✓" : "Acima do limite ✗"}
          </Badge>
        </div>
      </div>
      <div className="relative h-8 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full",
            dentro ? "bg-green-500" : "bg-red-500",
          )}
          style={{ width: `${Math.min((pct / scaleMax) * 100, 100)}%` }}
        />
        <div
          className="absolute top-0 h-full w-1 bg-foreground/60"
          style={{ left: `${(limitePct / scaleMax) * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{brlM(valor)} aplicado</span>
        <span>
          Limite: {limitePct}% — {lei}
        </span>
        <span>RCL: {brlM(base)}</span>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDES
// ══════════════════════════════════════════════════════════════════════════════

function Slide01Capa() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-8 text-center">
      <div className="flex size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <HugeiconsIcon
          icon={Wallet01Icon}
          strokeWidth={1.5}
          className="size-10"
        />
      </div>
      <div>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Lei Orçamentária Anual
        </h1>
        <p className="mt-4 text-3xl font-medium text-muted-foreground">
          Exercício 2025
        </p>
        <p className="mt-2 text-xl text-muted-foreground">
          Prefeitura Municipal — Audiência Pública de Aprovação
        </p>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Badge variant="outline" className="px-5 py-2 text-base">
          Receita: {brlM(d.receitaTotalLOA)}
        </Badge>
        <Badge variant="outline" className="px-5 py-2 text-base">
          Despesa: {brlM(d.despesaTotalLOA)}
        </Badge>
        <Badge variant="outline" className="px-5 py-2 text-base">
          Superávit:{" "}
          {brlM(d.receitaTotalLOA - d.despesaTotalLOA)}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        Apresentação elaborada nos termos da Lei de Responsabilidade Fiscal —
        LC&nbsp;101/2000 · Art.&nbsp;48
      </p>
    </div>
  );
}

function Slide02Agenda() {
  const items = [
    {
      icon: MoneyAdd01Icon,
      titulo: "Receita Total",
      desc: "Natureza e composição das receitas",
    },
    {
      icon: BankIcon,
      titulo: "Receitas por Origem",
      desc: "Próprias, federais, estaduais e outras",
    },
    {
      icon: Invoice01Icon,
      titulo: "Tributos Próprios",
      desc: "IPTU, ISSQN, ITBI, IRRF e taxas",
    },
    {
      icon: Home01Icon,
      titulo: "Transferências",
      desc: "FPM, FUNDEB, SUS, ICMS, IPVA",
    },
    {
      icon: Analytics01Icon,
      titulo: "Fixação das Despesas",
      desc: "Total por órgão e natureza",
    },
    {
      icon: BookOpen02Icon,
      titulo: "Gastos com Educação",
      desc: "MDE — mínimo 25% (Art. 212 CF)",
    },
    {
      icon: Stethoscope02Icon,
      titulo: "Gastos com Saúde",
      desc: "ASPS — mínimo 15% RCL (LC 141/2012)",
    },
    {
      icon: UserMultipleIcon,
      titulo: "Gastos com Pessoal",
      desc: "LRF — limite 60% RCL (LC 101/2000)",
    },
  ];
  return (
    <div className="flex h-full flex-col px-8 pt-6 pb-4">
      <h2 className="mb-5 flex-none text-3xl font-bold">
        Agenda desta Apresentação
      </h2>
      <div className="grid flex-1 grid-cols-2 gap-3 content-start">
        {items.map((item, i) => (
          <Card key={i} className="flex items-center gap-3 p-4">
            <div className="flex size-10 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
              <HugeiconsIcon
                icon={item.icon}
                strokeWidth={2}
                className="size-5"
              />
            </div>
            <div>
              <p className="text-base font-semibold">{item.titulo}</p>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const cfgNatureza: ChartConfig = {
  corrente: { label: "Receita Corrente", color: "hsl(var(--chart-1))" },
  capital: { label: "Receita de Capital", color: "hsl(var(--chart-2))" },
};

function Slide03ReceitaNatureza() {
  const pieData = [
    {
      name: "Receita Corrente",
      value: d.receitaCorrenteLOA,
      fill: "hsl(var(--chart-1))",
    },
    {
      name: "Receita de Capital",
      value: d.receitaCapitalLOA,
      fill: "hsl(var(--chart-2))",
    },
  ];
  return (
    <div className="flex h-full flex-col px-8 pt-6 pb-4">
      <SlideHeader
        titulo="Receita Total — Natureza"
        subtitulo="Composição da receita prevista na LOA 2025"
      />
      <div className="flex flex-1 min-h-0 gap-6 pt-4">
        <div className="flex w-64 flex-none flex-col gap-3">
          <Card className="flex-1 border-l-4 border-l-primary">
            <CardHeader className="pb-1">
              <CardDescription>Receita Total</CardDescription>
              <CardTitle className="text-2xl">
                {brl.format(d.receitaTotalLOA)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="flex-1 border-l-4 border-l-blue-500">
            <CardHeader className="pb-1">
              <CardDescription>Receita Corrente</CardDescription>
              <CardTitle className="text-xl">
                {brl.format(d.receitaCorrenteLOA)}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground">
                {(
                  (d.receitaCorrenteLOA / d.receitaTotalLOA) *
                  100
                ).toFixed(1)}
                % do total
              </p>
            </CardContent>
          </Card>
          <Card className="flex-1 border-l-4 border-l-orange-500">
            <CardHeader className="pb-1">
              <CardDescription>Receita de Capital</CardDescription>
              <CardTitle className="text-xl">
                {brl.format(d.receitaCapitalLOA)}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground">
                {(
                  (d.receitaCapitalLOA / d.receitaTotalLOA) *
                  100
                ).toFixed(2)}
                % do total
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="min-h-0 flex-1">
          <ChartContainer config={cfgNatureza} className="h-full w-full">
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(v) => brl.format(v as number)}
                  />
                }
              />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="70%"
                innerRadius="40%"
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(1)}%`
                }
                labelLine
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}

const cfgOrigem: ChartConfig = {
  valor: { label: "Valor", color: "hsl(var(--chart-1))" },
};

function Slide04ReceitasOrigem() {
  const barData = [
    { name: "Próprias", valor: d.receitasProprias, pct: 12.3 },
    { name: "Federais", valor: d.transferFederais, pct: 55.1 },
    { name: "Estaduais", valor: d.transferEstaduais, pct: 23.8 },
    { name: "Outras", valor: d.outrasReceitas, pct: 8.5 },
  ];
  const colors = [
    "border-l-blue-500",
    "border-l-green-500",
    "border-l-purple-500",
    "border-l-orange-500",
  ];
  const fillColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
  ];
  return (
    <div className="flex h-full flex-col px-8 pt-6 pb-4">
      <SlideHeader
        titulo="Receitas por Origem"
        subtitulo="Composição das fontes de receita"
      />
      <div className="flex-none grid grid-cols-4 gap-3 pt-3">
        {barData.map((item, i) => (
          <Card key={i} className={`border-l-4 ${colors[i]}`}>
            <CardHeader className="px-4 pb-1 pt-3">
              <CardDescription className="text-xs">{item.name}</CardDescription>
              <CardTitle className="text-lg">{brlM(item.valor)}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-2">
              <p className="text-sm font-medium text-muted-foreground">
                {item.pct}% da receita
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="min-h-0 flex-1 pt-3">
        <ChartContainer config={cfgOrigem} className="h-full w-full">
          <BarChart
            data={barData}
            margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(v) =>
                `R$ ${(v / 1_000_000).toFixed(0)}M`
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(v) => brl.format(v as number)}
                />
              }
            />
            <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
              {barData.map((_, i) => (
                <Cell key={i} fill={fillColors[i]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}

const cfgTrib: ChartConfig = {
  valor: { label: "Valor", color: "hsl(var(--chart-1))" },
};

function Slide05TributariasProprias() {
  const tribData = [
    { name: "IPTU", valor: d.iptu, var: "+33.9%" },
    { name: "IRRF", valor: d.irrf, var: "+90.0%" },
    { name: "ISSQN", valor: d.issqn, var: "—" },
    { name: "Taxas", valor: d.taxas, var: "—" },
    { name: "ITBI", valor: d.itbi, var: "+5.0%" },
    { name: "Contrib.", valor: d.contribs, var: "—" },
  ].sort((a, b) => b.valor - a.valor);
  return (
    <div className="flex h-full flex-col px-8 pt-6 pb-4">
      <SlideHeader
        titulo="Receitas Tributárias Próprias"
        subtitulo="Tributos de competência municipal — variação vs 2024"
      />
      <div className="flex flex-1 min-h-0 gap-6 pt-3">
        <div className="min-h-0 flex-1">
          <ChartContainer config={cfgTrib} className="h-full w-full">
            <BarChart
              layout="vertical"
              data={tribData}
              margin={{ top: 5, right: 80, bottom: 5, left: 10 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis
                type="number"
                tickFormatter={(v) =>
                  `R$ ${(v / 1_000_000).toFixed(1)}M`
                }
              />
              <YAxis type="category" dataKey="name" width={60} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(v) => brl.format(v as number)}
                  />
                }
              />
              <Bar
                dataKey="valor"
                radius={[0, 6, 6, 0]}
                fill="hsl(var(--chart-1))"
              />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="w-52 flex-none space-y-2 pt-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Variação vs 2024
          </p>
          {tribData.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border px-3 py-2"
            >
              <span className="text-sm font-medium">{item.name}</span>
              <Badge
                variant={item.var.startsWith("+") ? "default" : "outline"}
                className="text-xs"
              >
                {item.var}
              </Badge>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2">
            <span className="text-sm font-semibold">Total próprio</span>
            <span className="text-sm font-semibold">
              {brlM(d.receitasProprias)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const cfgFed: ChartConfig = {
  valor: { label: "Valor", color: "hsl(var(--chart-2))" },
};

function Slide06TransferenciasFederais() {
  const fedData = [
    {
      name: "FPM",
      valor: d.fpm,
      var: "+11.2%",
      desc: "Fundo de Participação dos Municípios",
    },
    {
      name: "FUNDEB",
      valor: d.fundeb,
      var: "+19.4%",
      desc: "Fundo de Manutenção da Educação Básica",
    },
    {
      name: "SUS",
      valor: d.sus,
      var: "+45.8%",
      desc: "Saúde — convênios e repasses federais",
    },
    {
      name: "FNDE",
      valor: d.fnde,
      var: "+5.0%",
      desc: "Fundo Nac. de Desenvolvimento da Educação",
    },
    {
      name: "Outras",
      valor: d.outrasFed,
      var: "—",
      desc: "Demais transferências federais",
    },
  ];
  return (
    <div className="flex h-full flex-col px-8 pt-6 pb-4">
      <SlideHeader
        titulo="Transferências Federais"
        subtitulo="55,1% da receita total — maior fonte de recursos"
      />
      <div className="flex flex-1 min-h-0 gap-6 pt-3">
        <div className="flex w-60 flex-none flex-col gap-2">
          {fedData.slice(0, 4).map((item, i) => (
            <Card key={i} className="flex-1 border-l-4 border-l-green-500">
              <CardHeader className="px-3 pb-0 pt-2">
                <CardDescription className="text-xs leading-tight">
                  {item.desc}
                </CardDescription>
                <CardTitle className="text-base">
                  {item.name}: {brlM(item.valor)}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-2">
                <Badge variant="outline" className="text-xs">
                  {item.var}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="min-h-0 flex-1">
          <ChartContainer config={cfgFed} className="h-full w-full">
            <BarChart
              data={fedData}
              margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(v) =>
                  `R$ ${(v / 1_000_000).toFixed(0)}M`
                }
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(v) => brl.format(v as number)}
                  />
                }
              />
              <Bar
                dataKey="valor"
                fill="hsl(var(--chart-2))"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}

const cfgEst: ChartConfig = {
  valor: { label: "Valor", color: "hsl(var(--chart-3))" },
};

function Slide07TransferenciasEstaduais() {
  const estData = [
    {
      name: "ICMS",
      valor: d.icms,
      var: "+22.2%",
      desc: "Cota-parte do ICMS — Art. 158 CF",
    },
    {
      name: "IPVA",
      valor: d.ipva,
      var: "+49.0%",
      desc: "Cota-parte do IPVA — Art. 158 CF",
    },
    {
      name: "Outras",
      valor: d.outrasEst,
      var: "—",
      desc: "Demais repasses estaduais",
    },
  ];
  return (
    <div className="flex h-full flex-col px-8 pt-6 pb-4">
      <SlideHeader
        titulo="Transferências Estaduais"
        subtitulo="23,8% da receita total — crescimento significativo em 2025"
      />
      <div className="flex flex-1 min-h-0 gap-6 pt-3">
        <div className="flex w-72 flex-none flex-col gap-4">
          {estData.map((item, i) => (
            <Card key={i} className="flex-1 border-l-4 border-l-purple-500">
              <CardHeader className="px-4 pb-1 pt-3">
                <CardDescription>{item.desc}</CardDescription>
                <CardTitle className="text-2xl">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-baseline justify-between px-4 pb-3">
                <span className="text-2xl font-bold">{brlM(item.valor)}</span>
                <Badge
                  variant={item.var.startsWith("+") ? "default" : "outline"}
                >
                  {item.var}
                </Badge>
              </CardContent>
            </Card>
          ))}
          <Card className="bg-muted">
            <CardHeader className="px-4 pb-2 pt-3">
              <CardDescription>Total Estaduais</CardDescription>
              <CardTitle className="text-2xl">
                {brlM(d.transferEstaduais)}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div className="min-h-0 flex-1">
          <ChartContainer config={cfgEst} className="h-full w-full">
            <BarChart
              data={estData}
              margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(v) =>
                  `R$ ${(v / 1_000_000).toFixed(0)}M`
                }
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(v) => brl.format(v as number)}
                  />
                }
              />
              <Bar
                dataKey="valor"
                fill="hsl(var(--chart-3))"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}

function Slide08FixacaoDespesas() {
  const orgaos = [
    {
      name: "Prefeitura Municipal",
      valor: d.despPrefeitura,
      pct: ((d.despPrefeitura / d.despesaTotalLOA) * 100).toFixed(1),
    },
    {
      name: "Câmara Municipal",
      valor: d.despCamara,
      pct: ((d.despCamara / d.despesaTotalLOA) * 100).toFixed(1),
    },
    {
      name: "Fundo de Previdência",
      valor: d.despPrevidencia,
      pct: ((d.despPrevidencia / d.despesaTotalLOA) * 100).toFixed(1),
    },
  ];
  return (
    <div className="flex h-full flex-col px-8 pt-6 pb-4">
      <SlideHeader
        titulo="Fixação das Despesas"
        subtitulo="Total autorizado na LOA 2025 por unidade orçamentária"
      />
      <div className="flex flex-1 min-h-0 flex-col gap-4 pt-3">
        <div className="flex-none grid grid-cols-2 gap-4">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-1">
              <CardDescription>Despesa Total Fixada</CardDescription>
              <CardTitle className="text-3xl">
                {brl.format(d.despesaTotalLOA)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-1">
              <CardDescription>Reserva de Contingência</CardDescription>
              <CardTitle className="text-3xl">
                {brl.format(d.reservaContingencia)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {(
                  (d.reservaContingencia / d.despesaTotalLOA) *
                  100
                ).toFixed(1)}
                % do total — Art. 5º LRF
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left">
                <th className="pb-2 font-semibold">Unidade Orçamentária</th>
                <th className="pb-2 text-right font-semibold">Valor Fixado</th>
                <th className="pb-2 text-right font-semibold">% do Total</th>
                <th className="w-48 pb-2 pl-6 font-semibold">Distribuição</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orgaos.map((item, i) => (
                <tr key={i}>
                  <td className="py-5 font-medium">{item.name}</td>
                  <td className="py-5 text-right tabular-nums">
                    {brl.format(item.valor)}
                  </td>
                  <td className="py-5 text-right tabular-nums text-muted-foreground">
                    {item.pct}%
                  </td>
                  <td className="py-5 pl-6">
                    <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const cfgDesp: ChartConfig = {
  pessoal: { label: "Pessoal", color: "hsl(var(--chart-1))" },
  custeio: { label: "Custeio", color: "hsl(var(--chart-2))" },
  investimentos: { label: "Investimentos", color: "hsl(var(--chart-3))" },
  amortizacao: { label: "Amortização", color: "hsl(var(--chart-4))" },
  reserva: { label: "Reserva", color: "hsl(var(--chart-5))" },
  juros: { label: "Juros", color: "hsl(var(--muted-foreground))" },
};

function Slide09DespesasNatureza() {
  const pieData = [
    {
      name: "Pessoal",
      value: d.despPessoal,
      fill: "hsl(var(--chart-1))",
      pct: "43.5%",
    },
    {
      name: "Custeio",
      value: d.despCusteio,
      fill: "hsl(var(--chart-2))",
      pct: "39.5%",
    },
    {
      name: "Investimentos",
      value: d.despInvestimentos,
      fill: "hsl(var(--chart-3))",
      pct: "10.8%",
    },
    {
      name: "Amortização",
      value: d.despAmortizacao,
      fill: "hsl(var(--chart-4))",
      pct: "2.3%",
    },
    {
      name: "Reserva",
      value: d.reservaContingencia,
      fill: "hsl(var(--chart-5))",
      pct: "1.9%",
    },
    {
      name: "Juros",
      value: d.despJuros,
      fill: "hsl(var(--muted-foreground))",
      pct: "1.2%",
    },
  ];
  return (
    <div className="flex h-full flex-col px-8 pt-6 pb-4">
      <SlideHeader
        titulo="Despesas por Natureza"
        subtitulo="Composição do gasto público fixado"
      />
      <div className="flex flex-1 min-h-0 gap-6 pt-3">
        <div className="min-h-0 flex-1">
          <ChartContainer config={cfgDesp} className="h-full w-full">
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(v) => brl.format(v as number)}
                  />
                }
              />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="75%"
                innerRadius="40%"
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
        <div className="flex w-64 flex-none flex-col justify-center gap-2">
          {pieData.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg border px-3 py-2"
            >
              <div
                className="h-3 w-3 flex-none rounded-sm"
                style={{ background: item.fill }}
              />
              <span className="flex-1 text-sm font-medium">{item.name}</span>
              <span className="text-sm text-muted-foreground">{item.pct}</span>
              <span className="text-sm font-medium tabular-nums">
                {brlM(item.value)}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 mt-1">
            <span className="flex-1 text-sm font-semibold">Total</span>
            <span className="text-sm font-semibold">
              {brlM(d.despesaTotalLOA)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide10GastosEducacao() {
  return (
    <div className="flex h-full flex-col px-8 pt-6 pb-4">
      <SlideHeader
        titulo="Gastos com Educação — MDE"
        subtitulo="Manutenção e Desenvolvimento do Ensino · Art. 212 CF/88"
      />
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <GaugeConstitucional
            titulo="Aplicação em Educação (MDE)"
            valor={d.gastosMDE}
            base={d.baseImpostosMDE}
            limitePct={25}
            lei="Art. 212 CF/88"
            descricao="Inclui recursos do FUNDEB + dotações próprias da Secretaria de Educação. Base de cálculo: receita de impostos e transferências de impostos."
          />
        </div>
      </div>
    </div>
  );
}

function Slide11GastosSaude() {
  return (
    <div className="flex h-full flex-col px-8 pt-6 pb-4">
      <SlideHeader
        titulo="Gastos com Saúde — ASPS"
        subtitulo="Ações e Serviços Públicos de Saúde · LC 141/2012"
      />
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <GaugeConstitucional
            titulo="Aplicação em Saúde (ASPS)"
            valor={d.gastosASPS}
            base={d.rclLOA}
            limitePct={15}
            lei="LC 141/2012"
            descricao="Inclui repasses do SUS + dotações próprias da Secretaria de Saúde. Base de cálculo: Receita Corrente Líquida (RCL)."
          />
        </div>
      </div>
    </div>
  );
}

function Slide12GastosPessoal() {
  return (
    <div className="flex h-full flex-col px-8 pt-6 pb-4">
      <SlideHeader
        titulo="Gastos com Pessoal — LRF"
        subtitulo="Limite de 60% da RCL · Art. 19 LC 101/2000"
      />
      <div className="flex flex-1 flex-col justify-center gap-8 pt-2">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            Total Pessoal — Executivo + Legislativo
          </p>
          <span className="text-6xl font-bold text-green-600 dark:text-green-400">
            {d.pctPessoalGlobal.toFixed(2)}%
          </span>
          <p className="mt-1 text-base text-muted-foreground">
            Limite global: 60% da RCL — Dentro do limite ✓
          </p>
        </div>
        <div className="space-y-6">
          <GaugeSimples
            titulo="Poder Executivo"
            valor={d.despPessoalExecutivo}
            base={d.rclLOA}
            limitePct={54}
            lei="Art. 20 LC 101/2000"
          />
          <GaugeSimples
            titulo="Poder Legislativo — Câmara Municipal"
            valor={d.despPessoalLegislativo}
            base={d.rclLOA}
            limitePct={6}
            lei="Art. 20 LC 101/2000"
          />
        </div>
        <div className="rounded-lg bg-muted p-3 text-center">
          <p className="text-sm text-muted-foreground">
            Receita Corrente Líquida (RCL):{" "}
            <strong className="text-foreground">
              {brl.format(d.rclLOA)}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

function Slide13Investimentos() {
  const borderColors = [
    "border-l-blue-500",
    "border-l-green-500",
    "border-l-orange-500",
    "border-l-purple-500",
    "border-l-red-500",
    "border-l-teal-500",
  ];
  const secIcons: Record<string, typeof ConstructionIcon> = {
    Saúde: Stethoscope02Icon,
    Educação: BookOpen02Icon,
    Obras: ConstructionIcon,
    Administração: Building04Icon,
  };
  return (
    <div className="flex h-full flex-col px-8 pt-6 pb-4">
      <SlideHeader
        titulo="Principais Investimentos"
        subtitulo={`Total: ${brl.format(d.despInvestimentos)} em projetos estratégicos`}
      />
      <div className="mt-3 flex-1 grid grid-cols-3 gap-3 content-start">
        {d.investimentos.map((inv, i) => (
          <Card key={i} className={`border-l-4 ${borderColors[i]}`}>
            <CardHeader className="px-4 pb-1 pt-3">
              <CardDescription className="flex items-center gap-1 text-xs">
                <HugeiconsIcon
                  icon={secIcons[inv.secretaria] ?? ConstructionIcon}
                  strokeWidth={2}
                  className="size-3"
                />
                {inv.secretaria}
              </CardDescription>
              <CardTitle className="text-base leading-snug">
                {inv.descricao}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3">
              <p className="text-xl font-bold">{brl.format(inv.valor)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex-none flex justify-end pt-2">
        <p className="text-sm text-muted-foreground">
          Total em investimentos:{" "}
          <strong className="text-foreground">
            {brl.format(d.despInvestimentos)}
          </strong>{" "}
          —{" "}
          {((d.despInvestimentos / d.despesaTotalLOA) * 100).toFixed(1)}% da
          despesa fixada
        </p>
      </div>
    </div>
  );
}

const cfgEvolucao: ChartConfig = {
  receita: { label: "Receita", color: "hsl(var(--chart-1))" },
  despesa: { label: "Despesa", color: "hsl(var(--chart-2))" },
};

function Slide14EvolucaoOrcamentaria() {
  return (
    <div className="flex h-full flex-col px-8 pt-6 pb-4">
      <SlideHeader
        titulo="Evolução Orçamentária"
        subtitulo="Comparativo 2023 · 2024 · 2025 — Receita vs Despesa"
      />
      <div className="min-h-0 flex-1 pt-3">
        <ChartContainer config={cfgEvolucao} className="h-full w-full">
          <BarChart
            data={d.historicoOrcamento}
            margin={{ top: 20, right: 40, bottom: 20, left: 60 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="ano" />
            <YAxis
              tickFormatter={(v) =>
                `R$ ${(v / 1_000_000).toFixed(0)}M`
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(v) => brl.format(v as number)}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="receita"
              fill="hsl(var(--chart-1))"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="despesa"
              fill="hsl(var(--chart-2))"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}

function Slide15ConsideracoesFinais() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 px-8 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <HugeiconsIcon
          icon={CheckmarkCircle02Icon}
          strokeWidth={1.5}
          className="size-8 text-green-600 dark:text-green-400"
        />
      </div>
      <div>
        <h2 className="text-4xl font-bold">Obrigado pela participação!</h2>
        <p className="mt-3 text-xl text-muted-foreground">
          A LOA 2025 foi elaborada com transparência e responsabilidade fiscal,
          <br />
          atendendo a todos os índices constitucionais obrigatórios.
        </p>
      </div>
      <div className="grid max-w-2xl grid-cols-3 gap-4 text-sm">
        <Card>
          <CardContent className="pt-4">
            <HugeiconsIcon
              icon={SecurityCheckIcon}
              strokeWidth={2}
              className="size-6 text-primary mb-2"
            />
            <p className="font-semibold">Portal da Transparência</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Acesse dados detalhados da LOA, execução orçamentária e prestação
              de contas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <HugeiconsIcon
              icon={Analytics01Icon}
              strokeWidth={2}
              className="size-6 text-primary mb-2"
            />
            <p className="font-semibold">Ouvidoria Municipal</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Canais de participação cidadã e manifestações sobre a gestão
              pública
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <HugeiconsIcon
              icon={Invoice01Icon}
              strokeWidth={2}
              className="size-6 text-primary mb-2"
            />
            <p className="font-semibold">e-SIC</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Sistema de Informação ao Cidadão — solicite documentos e
              informações
            </p>
          </CardContent>
        </Card>
      </div>
      <p className="text-sm text-muted-foreground">
        "Promover a gestão fiscal responsável é o compromisso com as gerações
        presentes e futuras."
        <br />— Lei de Responsabilidade Fiscal (LC 101/2000)
      </p>
    </div>
  );
}

// ── Slide registry ─────────────────────────────────────────────────────────────
const SLIDES: { titulo: string; node: React.ReactNode }[] = [
  { titulo: "Capa", node: <Slide01Capa /> },
  { titulo: "Agenda", node: <Slide02Agenda /> },
  { titulo: "Receita Total — Natureza", node: <Slide03ReceitaNatureza /> },
  { titulo: "Receitas por Origem", node: <Slide04ReceitasOrigem /> },
  { titulo: "Receitas Tributárias Próprias", node: <Slide05TributariasProprias /> },
  { titulo: "Transferências Federais", node: <Slide06TransferenciasFederais /> },
  { titulo: "Transferências Estaduais", node: <Slide07TransferenciasEstaduais /> },
  { titulo: "Fixação das Despesas", node: <Slide08FixacaoDespesas /> },
  { titulo: "Despesas por Natureza", node: <Slide09DespesasNatureza /> },
  { titulo: "Gastos com Educação (MDE)", node: <Slide10GastosEducacao /> },
  { titulo: "Gastos com Saúde (ASPS)", node: <Slide11GastosSaude /> },
  { titulo: "Gastos com Pessoal (LRF)", node: <Slide12GastosPessoal /> },
  { titulo: "Principais Investimentos", node: <Slide13Investimentos /> },
  { titulo: "Evolução Orçamentária", node: <Slide14EvolucaoOrcamentaria /> },
  { titulo: "Considerações Finais", node: <Slide15ConsideracoesFinais /> },
];

// ══════════════════════════════════════════════════════════════════════════════
// Main exported component
// ══════════════════════════════════════════════════════════════════════════════
export function AudienciasLoaCarousel() {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [fsHint, setFsHint] = React.useState<string | null>(null);

  const total = SLIDES.length;

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api || paused) return;
    const id = window.setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [api, paused]);

  React.useEffect(() => {
    if (paused) return;
    setProgress(0);
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / AUTOPLAY_MS) * 100);
      setProgress(p);
      if (p < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [current, paused]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (document.fullscreenElement) void exitFullscreenDoc();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "p" && e.key !== "P") return;
      if (isTypingTarget(e.target)) return;
      e.preventDefault();
      setPaused((p) => !p);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handlePanelClick = () => {
    const el = panelRef.current;
    if (!el) return;
    if (document.fullscreenElement) return;
    setFsHint(null);
    void requestFullscreenEl(el).catch(() => {
      setFsHint(
        "Tela cheia indisponível neste navegador ou permissão negada.",
      );
    });
  };

  const secondsLeft = Math.ceil(
    ((100 - progress) / 100) * (AUTOPLAY_MS / 1000),
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="space-y-1">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          LOA 2025 — Audiência Pública
        </h2>
        <p className="text-base text-muted-foreground">
          Apresentação com {total} slides · rotação automática a cada 20&nbsp;s.
          Tecla{" "}
          <span className="font-medium text-foreground">P</span> pausa ou
          retoma. Clique no painel para tela cheia; use ESC para sair.
        </p>
      </div>

      <div
        ref={panelRef}
        role="button"
        tabIndex={0}
        onClick={handlePanelClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handlePanelClick();
          }
        }}
        className={cn(
          "relative mx-auto flex w-[90vw] max-w-[90vw] flex-col overflow-hidden rounded-3xl border border-border/80 bg-card shadow-lg ring-1 ring-foreground/5 outline-none transition-shadow",
          "h-[80vh] min-h-[320px] cursor-pointer hover:ring-2 hover:ring-primary/25 focus-visible:ring-2 focus-visible:ring-ring",
        )}
        aria-label="Apresentação LOA 2025. Tecla P pausa ou retoma a rotação. Clique para tela cheia."
      >
        {/* Progress bar */}
        <div className="absolute left-0 right-0 top-0 z-10 h-1.5 bg-muted">
          <div
            className="h-full bg-primary transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start" }}
          className="flex h-full min-h-0 flex-1 flex-col"
        >
          <CarouselContent className="-ml-0 h-full [&>div]:h-full">
            {SLIDES.map((slide, i) => (
              <CarouselItem key={i} className="h-full pl-0">
                {slide.node}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Slide indicator */}
        <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center px-4">
          <p className="max-w-[95%] rounded-full bg-background/90 px-4 py-1.5 text-center text-sm text-muted-foreground shadow-sm backdrop-blur-sm">
            {paused ? (
              <>
                Pausado · slide {current + 1} de {total} —{" "}
                {SLIDES[current]?.titulo} · tecla{" "}
                <span className="font-medium text-foreground">P</span> para
                retomar
              </>
            ) : (
              <>
                Slide {current + 1} de {total} —{" "}
                {SLIDES[current]?.titulo} · próximo em {secondsLeft}s ·{" "}
                <span className="font-medium text-foreground">P</span> pausa
              </>
            )}
          </p>
        </div>
      </div>

      {fsHint ? (
        <p className="text-center text-base text-amber-700 dark:text-amber-400">
          {fsHint}
        </p>
      ) : null}
    </div>
  );
}
