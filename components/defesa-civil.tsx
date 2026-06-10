"use client";

import * as React from "react";
import {
  Alert02Icon,
  AlertCircleIcon,
  Activity01Icon,
  Clock01Icon,
  DeliveryTruck01Icon,
  DropletIcon,
  FirstAidKitIcon,
  Flag01Icon,
  HandHelpingIcon,
  Home01Icon,
  InformationCircleIcon,
  SecurityCheckIcon,
  ShoppingCart01Icon,
  Target01Icon,
  UserMultipleIcon,
  BulbIcon,
  MedicineBottle02Icon,
  Archive02Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { KpiCard } from "@/components/ui/kpi-card";
import { useSnapshot } from "@/components/use-snapshot";
import { DEFESA_CIVIL_SNAPSHOT } from "@/lib/demo-defesa-civil";
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

// ─── Tipos de alerta ──────────────────────────────────────────────────────────

type NivelAlerta =
  | "normal"
  | "observacao"
  | "atencao"
  | "alerta"
  | "emergencia";

const NIVEL_CONFIG: Record<
  NivelAlerta,
  { label: string; color: string; bg: string; badge: string }
> = {
  normal: {
    label: "Normal",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/30",
    badge:
      "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  },
  observacao: {
    label: "Observação",
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    badge:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  },
  atencao: {
    label: "Atenção",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    badge:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  },
  alerta: {
    label: "Alerta",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
    badge: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  },
  emergencia: {
    label: "Emergência",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    badge:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  },
};

type DefesaCivilSnapshot = typeof DEFESA_CIVIL_SNAPSHOT;

const DefesaCivilSnapshotContext = React.createContext<DefesaCivilSnapshot>(
  DEFESA_CIVIL_SNAPSHOT,
);

function useDefesaCivilSnapshot() {
  return React.useContext(DefesaCivilSnapshotContext);
}

const SNAPSHOT_ICONS = {
  Archive02Icon,
  BulbIcon,
  DeliveryTruck01Icon,
  DropletIcon,
  FirstAidKitIcon,
  Home01Icon,
  MedicineBottle02Icon,
  ShoppingCart01Icon,
};

function snapshotIcon(name: string) {
  return SNAPSHOT_ICONS[name as keyof typeof SNAPSHOT_ICONS] ?? Alert02Icon;
}

function NivelBadge({ nivel }: { nivel: NivelAlerta }) {
  const cfg = NIVEL_CONFIG[nivel];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cfg.badge}`}
    >
      {cfg.label}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Em atendimento":
      "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    "Aguardando recurso":
      "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
    Encerrado: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    Ativo:
      "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
    Standby:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
    Ativa:
      "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
    "Em uso":
      "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    Livre:
      "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
    Bloqueada: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${map[status] ?? "bg-muted text-muted-foreground"}`}
    >
      {status}
    </span>
  );
}

// ─── Painel Monitoramento ─────────────────────────────────────────────────────

function PainelMonitoramento() {
  const {
    NIVEL_ATUAL,
    chuvaHistorico,
    nivelRioHistorico,
    previsao5dias,
    comunidadesRisco,
    chartConfigChuva,
    chartConfigRio,
  } = useDefesaCivilSnapshot();
  const cfg = NIVEL_CONFIG[NIVEL_ATUAL];
  return (
    <div className="space-y-6">
      {/* Nível de alerta geral */}
      <div className={`rounded-xl border p-4 ${cfg.bg}`}>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <HugeiconsIcon
              icon={Alert02Icon}
              strokeWidth={2}
              className={`size-5 ${cfg.color}`}
            />
            <div>
              <p className={`text-sm font-semibold ${cfg.color}`}>
                Nível de alerta municipal — {cfg.label}
              </p>
              <p className="text-xs text-muted-foreground">
                Atualizado em 09/01/2025 às 10h15 · Fonte: CEMADEN / Defesa
                Civil
              </p>
            </div>
          </div>
          <div className="flex gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-green-500 inline-block" />{" "}
              Normal
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-yellow-400 inline-block" />{" "}
              Observação
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-orange-500 inline-block" />{" "}
              Atenção
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-red-500 inline-block" />{" "}
              Alerta
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-purple-500 inline-block" />{" "}
              Emergência
            </span>
          </div>
        </div>
      </div>

      {/* KPIs clima */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Temperatura atual"
          icon={Activity01Icon}
          value="26,4 °C"
          borderColor="border-l-orange-400"
          footer={
            <p className="text-xs text-muted-foreground">
              Máx. 29°C · Mín. 19°C hoje
            </p>
          }
        />
        <KpiCard
          title="Chuva acumulada 24h"
          icon={DropletIcon}
          value="52 mm"
          valueClassName="text-orange-600 dark:text-orange-400"
          borderColor="border-l-blue-500"
          footer={
            <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-3"
              />
              Acima da média mensal
            </div>
          }
        />
        <KpiCard
          title="Chuva prevista 48h"
          icon={DropletIcon}
          value="38 mm"
          borderColor="border-l-blue-300"
          footer={
            <p className="text-xs text-muted-foreground">
              Risco de enxurrada até amanhã
            </p>
          }
        />
        <KpiCard
          title="Vento (rajadas)"
          icon={AlertCircleIcon}
          value="42 km/h"
          borderColor="border-l-slate-400"
          footer={
            <p className="text-xs text-muted-foreground">
              Direção nordeste · Moderado
            </p>
          }
        />
      </div>

      {/* KPIs risco */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Nível do Rio Municipal"
          icon={DropletIcon}
          value="68%"
          valueClassName="text-orange-600 dark:text-orange-400"
          borderColor="border-l-cyan-500"
          footer={
            <>
              <Progress value={68} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Cota de atenção: 80% · Alerta: 100%
              </p>
            </>
          }
        />
        <KpiCard
          title="Comunidades em alerta"
          icon={Flag01Icon}
          value="4"
          valueClassName="text-red-600 dark:text-red-400"
          borderColor="border-l-red-500"
          footer={
            <p className="text-xs text-muted-foreground">
              2 em Alerta · 2 em Atenção
            </p>
          }
        />
        <KpiCard
          title="Casas a vistoriar"
          icon={Home01Icon}
          value="312"
          borderColor="border-l-yellow-500"
          footer={
            <p className="text-xs text-muted-foreground">
              189 já vistoriadas nesta temporada
            </p>
          }
        />
        <KpiCard
          title="Famílias em área de risco"
          icon={UserMultipleIcon}
          value="1.847"
          borderColor="border-l-primary/40"
          footer={
            <p className="text-xs text-muted-foreground">
              Zonas A, B, C e D cadastradas
            </p>
          }
        />
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Chuva acumulada 7 dias */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Chuva acumulada — últimos 7 dias (mm)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigChuva} className="h-48 w-full">
              <BarChart data={chuvaHistorico}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="dia" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="mm" fill="var(--chart-1)" radius={[4, 4, 0, 0]}>
                  {chuvaHistorico.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.mm >= 40
                          ? "var(--chart-5)"
                          : entry.mm >= 25
                            ? "hsl(25 95% 55%)"
                            : "var(--chart-1)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Nível do rio 24h */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Nível do Rio Municipal — últimas 24h (%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigRio} className="h-48 w-full">
              <AreaChart data={nivelRioHistorico}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hora" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 120]} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ReferenceLine
                  y={80}
                  stroke="hsl(25 95% 55%)"
                  strokeDasharray="4 4"
                  label={{
                    value: "Atenção 80%",
                    position: "insideTopRight",
                    fontSize: 10,
                    fill: "hsl(25 95% 55%)",
                  }}
                />
                <ReferenceLine
                  y={100}
                  stroke="hsl(0 72% 51%)"
                  strokeDasharray="4 4"
                  label={{
                    value: "Alerta 100%",
                    position: "insideTopRight",
                    fontSize: 10,
                    fill: "hsl(0 72% 51%)",
                  }}
                />
                <Area
                  dataKey="nivel"
                  fill="var(--chart-2)"
                  stroke="var(--chart-2)"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Previsão 5 dias */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Previsão climática — próximos 5 dias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-3">
            {previsao5dias.map((d) => (
              <div
                key={d.dia}
                className="flex flex-col items-center gap-1 rounded-lg border bg-muted/40 p-3 text-center"
              >
                <p className="text-sm font-medium">{d.dia}</p>
                <span className="text-2xl">{d.icon}</span>
                <p className="text-xs text-muted-foreground">
                  {d.tMin}° – {d.tMax}°
                </p>
                <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                  <HugeiconsIcon
                    icon={DropletIcon}
                    strokeWidth={2}
                    className="size-3"
                  />
                  {d.chuva} mm
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comunidades por nível */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Comunidades monitoradas por nível de risco
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Comunidade</TableHead>
                <TableHead>Tipo de risco</TableHead>
                <TableHead>Famílias</TableHead>
                <TableHead>Nível</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comunidadesRisco.map((c) => (
                <TableRow key={c.nome}>
                  <TableCell className="font-medium">{c.nome}</TableCell>
                  <TableCell>{c.tipo}</TableCell>
                  <TableCell>{c.familias.toLocaleString("pt-BR")}</TableCell>
                  <TableCell>
                    <NivelBadge nivel={c.nivel} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Painel Ocorrências ───────────────────────────────────────────────────────

function PainelOcorrencias() {
  const { ocorrencias, ocorrenciasMensais, chartConfigOcorrencias } =
    useDefesaCivilSnapshot();
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Ocorrências ativas"
          icon={Alert02Icon}
          value="6"
          valueClassName="text-red-600 dark:text-red-400"
          borderColor="border-l-red-500"
          footer={
            <p className="text-xs text-muted-foreground">
              1 aguardando recurso
            </p>
          }
        />
        <KpiCard
          title="Pessoas afetadas"
          icon={UserMultipleIcon}
          value="423"
          borderColor="border-l-orange-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Total no período ativo
            </p>
          }
        />
        <KpiCard
          title="Desabrigados"
          icon={Home01Icon}
          value="118"
          valueClassName="text-orange-600 dark:text-orange-400"
          borderColor="border-l-yellow-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Nos abrigos municipais
            </p>
          }
        />
        <KpiCard
          title="Imóveis danificados"
          icon={AlertCircleIcon}
          value="89"
          borderColor="border-l-primary/40"
          footer={
            <p className="text-xs text-muted-foreground">12 com dano total</p>
          }
        />
      </div>

      {/* Ocorrências ativas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Ocorrências ativas e recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Protocolo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Localidade</TableHead>
                <TableHead>Abertura</TableHead>
                <TableHead>Afetados</TableHead>
                <TableHead>Equipe</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ocorrencias.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs">{o.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{o.tipo}</Badge>
                  </TableCell>
                  <TableCell>{o.bairro}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {o.abertura}
                  </TableCell>
                  <TableCell>{o.afetados}</TableCell>
                  <TableCell className="text-xs">{o.equipe}</TableCell>
                  <TableCell>
                    <StatusBadge status={o.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Histórico mensal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Ocorrências por tipo — últimos 7 meses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfigOcorrencias}
            className="h-56 w-full"
          >
            <BarChart data={ocorrenciasMensais}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="enchente"
                fill="var(--chart-1)"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="ventania"
                fill="var(--chart-2)"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="deslizamento"
                fill="var(--chart-3)"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Painel Recursos ──────────────────────────────────────────────────────────

function PainelRecursos() {
  const { abrigos, suprimentos } = useDefesaCivilSnapshot();
  return (
    <div className="space-y-6">
      {/* KPIs abrigos */}
      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          title="Capacidade total de abrigos"
          icon={Home01Icon}
          value="650 pessoas"
          borderColor="border-l-blue-500"
          footer={
            <p className="text-xs text-muted-foreground">
              3 abrigos cadastrados
            </p>
          }
        />
        <KpiCard
          title="Ocupação atual"
          icon={UserMultipleIcon}
          value="118 pessoas"
          borderColor="border-l-green-500"
          footer={
            <>
              <Progress value={18} className="h-2" />
              <p className="text-xs text-muted-foreground">
                18% da capacidade total utilizada
              </p>
            </>
          }
        />
        <KpiCard
          title="Abrigos disponíveis"
          icon={SecurityCheckIcon}
          value="2 em standby"
          borderColor="border-l-yellow-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Podem ser ativados em até 2h
            </p>
          }
        />
      </div>

      {/* Cards de abrigos */}
      <div className="grid gap-4 sm:grid-cols-3">
        {abrigos.map((a) => {
          const pct = Math.round((a.ocupacao / a.capacidade) * 100);
          return (
            <Card key={a.nome}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm leading-tight">
                    {a.nome}
                  </CardTitle>
                  <StatusBadge status={a.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                    <span>
                      Ocupação: {a.ocupacao} / {a.capacidade}
                    </span>
                    <span>{pct}%</span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
                <Separator />
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">
                      Responsável:
                    </span>{" "}
                    {a.responsavel}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">
                      Contato:
                    </span>{" "}
                    {a.tel}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Suprimentos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Estoque de suprimentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suprimentos.map((s) => (
              <div
                key={s.categoria}
                className={`rounded-lg border p-3 ${s.critico ? "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/20" : ""}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${s.critico ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400" : "bg-muted text-muted-foreground"}`}
                    >
                      <HugeiconsIcon
                        icon={snapshotIcon(s.icon)}
                        strokeWidth={2}
                        className="size-4"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-none">
                        {s.categoria}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {s.disponivel} ·{" "}
                        {s.consumoDia !== "—"
                          ? `Consumo: ${s.consumoDia}`
                          : "Uso esporádico"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {s.autonomia > 0 && (
                      <span
                        className={`text-xs font-medium ${s.autonomia <= 3 ? "text-red-600 dark:text-red-400" : s.autonomia <= 7 ? "text-orange-600 dark:text-orange-400" : "text-green-600 dark:text-green-400"}`}
                      >
                        {s.autonomia}d autonomia
                      </span>
                    )}
                    {s.critico && (
                      <span className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
                        <HugeiconsIcon
                          icon={Alert02Icon}
                          strokeWidth={2}
                          className="size-3"
                        />{" "}
                        Crítico
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <Progress
                    value={s.pct}
                    className={`h-1.5 ${s.pct < 20 ? "[&>div]:bg-red-500" : s.pct < 40 ? "[&>div]:bg-orange-500" : ""}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert>
        <HugeiconsIcon
          icon={Alert02Icon}
          strokeWidth={2}
          className="size-4 text-red-500"
        />
        <AlertTitle>Estoque crítico — Lonas e kits de abrigo</AlertTitle>
        <AlertDescription className="text-xs">
          Apenas 18% do estoque recomendado. Com nível de atenção ativo,
          solicite reposição imediata junto à Defesa Civil Estadual ou ao
          Governo Federal (SEDEC/MI).
        </AlertDescription>
      </Alert>
    </div>
  );
}

// ─── Painel Logística ─────────────────────────────────────────────────────────

function PainelLogistica() {
  const { zonasEvacuacao, equipes, veiculos } = useDefesaCivilSnapshot();
  return (
    <div className="space-y-6">
      {/* KPIs mobilização */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Equipes mobilizadas"
          icon={UserMultipleIcon}
          value="5 de 6"
          valueClassName="text-green-600 dark:text-green-400"
          borderColor="border-l-green-500"
          footer={<p className="text-xs text-muted-foreground">1 em standby</p>}
        />
        <KpiCard
          title="Agentes em campo"
          icon={SecurityCheckIcon}
          value="27"
          borderColor="border-l-blue-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Em 5 zonas de atuação
            </p>
          }
        />
        <KpiCard
          title="Veículos em uso"
          icon={DeliveryTruck01Icon}
          value="14 de 25"
          borderColor="border-l-primary/40"
          footer={
            <p className="text-xs text-muted-foreground">
              Incluindo barcos e viaturas
            </p>
          }
        />
        <KpiCard
          title="Zonas com rota bloqueada"
          icon={AlertCircleIcon}
          value="1"
          valueClassName="text-red-600 dark:text-red-400"
          borderColor="border-l-red-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Zona D — Conjunto Esperança
            </p>
          }
        />
      </div>

      {/* Zonas de evacuação */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Plano de evacuação por zona
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {zonasEvacuacao.map((z) => (
              <div key={z.zona} className="rounded-lg border bg-muted/30 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                      {z.zona}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium">{z.descricao}</p>
                        <Badge variant="outline" className="text-xs">
                          {z.risco}
                        </Badge>
                        <span
                          className={`text-xs font-medium ${z.prioridade === "Alta" ? "text-red-600 dark:text-red-400" : "text-yellow-600 dark:text-yellow-400"}`}
                        >
                          Prioridade {z.prioridade}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-start gap-1">
                        <HugeiconsIcon
                          icon={DeliveryTruck01Icon}
                          strokeWidth={2}
                          className="size-3 shrink-0 mt-0.5"
                        />
                        {z.rota}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Destino:
                        </span>{" "}
                        {z.destino} ·{" "}
                        <span className="font-medium text-foreground">
                          Pop.:
                        </span>{" "}
                        {z.pop.toLocaleString("pt-BR")} pessoas
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={z.status} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Equipes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Equipes e localização atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipe</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Membros</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipes.map((e) => (
                <TableRow key={e.nome}>
                  <TableCell className="font-medium text-sm">
                    {e.nome}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {e.funcao}
                  </TableCell>
                  <TableCell>{e.membros}</TableCell>
                  <TableCell className="text-xs">{e.local}</TableCell>
                  <TableCell>
                    <StatusBadge status={e.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Veículos e equipamentos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Veículos e equipamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {veiculos.map((v) => {
              const disponiveis = v.total - v.emUso;
              const pct = Math.round((v.emUso / v.total) * 100);
              return (
                <div key={v.tipo} className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={snapshotIcon(v.icon)}
                      strokeWidth={2}
                      className="size-4 text-muted-foreground"
                    />
                    <p className="text-sm font-medium leading-tight">
                      {v.tipo}
                    </p>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {disponiveis} disponíveis
                    </span>
                    <span className="text-muted-foreground">
                      {v.emUso}/{v.total} em uso
                    </span>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Alertas logísticos */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Alert>
          <HugeiconsIcon
            icon={Alert02Icon}
            strokeWidth={2}
            className="size-4 text-red-500"
          />
          <AlertTitle>Rota da Zona D bloqueada</AlertTitle>
          <AlertDescription className="text-xs">
            A rota de evacuação do Conjunto Esperança está bloqueada por
            alagamento na Via Expressa. Acionar rota alternativa pela Av. do
            Contorno até liberação.
          </AlertDescription>
        </Alert>
        <Alert>
          <HugeiconsIcon
            icon={InformationCircleIcon}
            strokeWidth={2}
            className="size-4"
          />
          <AlertTitle>Todos os barcos em operação</AlertTitle>
          <AlertDescription className="text-xs">
            Os 4 barcos de resgate estão em campo. Para novas demandas de
            resgate aquático, acionar reforço da Defesa Civil Estadual ou
            Bombeiros.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function DefesaCivil() {
  const snapshot = useSnapshot("defesa-civil", DEFESA_CIVIL_SNAPSHOT);

  return (
    <DefesaCivilSnapshotContext.Provider value={snapshot}>
      <div className="space-y-6">
        <Tabs defaultValue="monitoramento" className="space-y-6">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="monitoramento" className="gap-2">
              <HugeiconsIcon
                icon={Activity01Icon}
                strokeWidth={2}
                className="size-4"
              />
              Monitoramento
            </TabsTrigger>
            <TabsTrigger value="ocorrencias" className="gap-2">
              <HugeiconsIcon
                icon={Alert02Icon}
                strokeWidth={2}
                className="size-4"
              />
              Ocorrências
            </TabsTrigger>
            <TabsTrigger value="recursos" className="gap-2">
              <HugeiconsIcon
                icon={HandHelpingIcon}
                strokeWidth={2}
                className="size-4"
              />
              Recursos
            </TabsTrigger>
            <TabsTrigger value="logistica" className="gap-2">
              <HugeiconsIcon
                icon={DeliveryTruck01Icon}
                strokeWidth={2}
                className="size-4"
              />
              Logística
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monitoramento">
            <PainelMonitoramento />
          </TabsContent>
          <TabsContent value="ocorrencias">
            <PainelOcorrencias />
          </TabsContent>
          <TabsContent value="recursos">
            <PainelRecursos />
          </TabsContent>
          <TabsContent value="logistica">
            <PainelLogistica />
          </TabsContent>
        </Tabs>
      </div>
    </DefesaCivilSnapshotContext.Provider>
  );
}
