"use client";

import { useLegislativoSnapshot } from "./snapshot-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { KpiCard } from "@/components/ui/kpi-card";
import {
  formatDateShort,
  type TipoSessao,
  type StatusSessao,
} from "@/lib/demo-legislativo";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CalendarIcon,
  FileValidationIcon,
  CheckmarkCircle02Icon,
  Cancel01Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";

function TipoBadge({ tipo }: { tipo: TipoSessao }) {
  const colors: Record<TipoSessao, string> = {
    Ordinária: "bg-blue-500 text-white",
    Extraordinária: "bg-orange-500 text-white",
    Solene: "bg-purple-500 text-white",
    Especial: "bg-teal-500 text-white",
  };
  return (
    <Badge className={colors[tipo] || "bg-gray-500 text-white"}>{tipo}</Badge>
  );
}

function StatusBadge({ status }: { status: StatusSessao }) {
  const configs: Record<
    StatusSessao,
    { icon: React.ReactNode; color: string }
  > = {
    Realizada: {
      icon: (
        <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-3 w-3 mr-1" />
      ),
      color: "bg-green-500 text-white",
    },
    Agendada: {
      icon: <HugeiconsIcon icon={AlertCircleIcon} className="h-3 w-3 mr-1" />,
      color: "bg-yellow-500 text-white",
    },
    Cancelada: {
      icon: <HugeiconsIcon icon={Cancel01Icon} className="h-3 w-3 mr-1" />,
      color: "bg-red-500 text-white",
    },
  };
  const config = configs[status];
  return (
    <Badge className={config.color}>
      {config.icon}
      {status}
    </Badge>
  );
}

function SessoesTable() {
  const { DATA_SESSOES_COMPLETO } = useLegislativoSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Sessões de 2025</CardTitle>
        <CardDescription>
          Calendário de sessões ordinárias, extraordinárias e solenes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pauta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DATA_SESSOES_COMPLETO.map((sessao) => (
              <TableRow key={sessao.id}>
                <TableCell className="font-medium">
                  {formatDateShort(sessao.data)}
                </TableCell>
                <TableCell>
                  <TipoBadge tipo={sessao.tipo} />
                </TableCell>
                <TableCell>{sessao.hora}</TableCell>
                <TableCell>
                  <StatusBadge status={sessao.status} />
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <p className="truncate text-sm text-muted-foreground">
                    {sessao.pauta.join(", ")}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function SessoesStats() {
  const { DATA_SESSOES_COMPLETO } = useLegislativoSnapshot();

  const total = DATA_SESSOES_COMPLETO.length;
  const ordinarias = DATA_SESSOES_COMPLETO.filter(
    (s) => s.tipo === "Ordinária",
  ).length;
  const extraordinarias = DATA_SESSOES_COMPLETO.filter(
    (s) => s.tipo === "Extraordinária",
  ).length;
  const solenes = DATA_SESSOES_COMPLETO.filter(
    (s) => s.tipo === "Solene",
  ).length;
  const especiais = DATA_SESSOES_COMPLETO.filter(
    (s) => s.tipo === "Especial",
  ).length;
  const realizadas = DATA_SESSOES_COMPLETO.filter(
    (s) => s.status === "Realizada",
  ).length;
  const agendadas = DATA_SESSOES_COMPLETO.filter(
    (s) => s.status === "Agendada",
  ).length;
  const itensPauta = DATA_SESSOES_COMPLETO.reduce(
    (acc, sessao) => acc + sessao.pauta.length,
    0,
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Sessões Previstas"
        icon={CalendarIcon}
        value={total}
        borderColor="border-l-blue-500"
        footer={
          <p className="text-xs text-muted-foreground">
            {ordinarias} ordinárias, {extraordinarias} extraordinárias,{" "}
            {solenes} solenes e {especiais} especiais
          </p>
        }
      />
      <KpiCard
        title="Sessões Realizadas"
        icon={CheckmarkCircle02Icon}
        value={realizadas}
        borderColor="border-l-emerald-500"
        footer={
          <p className="text-xs text-muted-foreground">
            {Math.round((realizadas / total) * 100)}% do calendário já executado
          </p>
        }
      />
      <KpiCard
        title="Sessões Agendadas"
        icon={AlertCircleIcon}
        value={agendadas}
        borderColor="border-l-amber-500"
        footer={
          <p className="text-xs text-muted-foreground">
            Sessões futuras que ainda exigem consolidação de pauta
          </p>
        }
      />
      <KpiCard
        title="Itens em Pauta"
        icon={FileValidationIcon}
        value={itensPauta}
        borderColor="border-l-violet-500"
        footer={
          <p className="text-xs text-muted-foreground">
            Acervo pautado nas {total} sessões do exercício
          </p>
        }
      />
    </div>
  );
}

function AgendaExecutivaCard() {
  const { DATA_SESSOES_COMPLETO } = useLegislativoSnapshot();

  const proximas = DATA_SESSOES_COMPLETO.filter(
    (sessao) => sessao.status === "Agendada",
  ).slice(0, 3);
  const sessaoMaisPauta = [...DATA_SESSOES_COMPLETO].sort(
    (a, b) => b.pauta.length - a.pauta.length,
  )[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Agenda Executiva</CardTitle>
        <CardDescription>
          Monitoramento das próximas deliberações
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {proximas.map((sessao) => (
            <div key={sessao.id} className="rounded-lg border p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-sm">
                    {sessao.tipo} {sessao.numero}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDateShort(sessao.data)} às {sessao.hora}
                  </p>
                </div>
                <Badge variant="outline">{sessao.pauta.length} itens</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {sessao.pauta.join(", ")}
              </p>
            </div>
          ))}
        </div>
        {sessaoMaisPauta ? (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <p className="text-sm font-medium text-blue-800">
              Sessão com maior concentração de pauta
            </p>
            <p className="text-sm text-blue-700">
              {sessaoMaisPauta.tipo} {sessaoMaisPauta.numero} reúne{" "}
              {sessaoMaisPauta.pauta.length} matérias e exige atenção da
              secretaria legislativa.
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function DistribuicaoTipoChart() {
  const { DATA_SESSOES_COMPLETO } = useLegislativoSnapshot();

  const tipos = [
    {
      tipo: "Ordinária",
      count: DATA_SESSOES_COMPLETO.filter((s) => s.tipo === "Ordinária").length,
      color: "bg-blue-500",
    },
    {
      tipo: "Extraordinária",
      count: DATA_SESSOES_COMPLETO.filter((s) => s.tipo === "Extraordinária")
        .length,
      color: "bg-orange-500",
    },
    {
      tipo: "Solene",
      count: DATA_SESSOES_COMPLETO.filter((s) => s.tipo === "Solene").length,
      color: "bg-purple-500",
    },
    {
      tipo: "Especial",
      count: DATA_SESSOES_COMPLETO.filter((s) => s.tipo === "Especial").length,
      color: "bg-teal-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Distribuição por Tipo</CardTitle>
        <CardDescription>Tipos de sessões realizadas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tipos.map(({ tipo, count, color }) => (
            <div key={tipo} className="flex items-center gap-3">
              <div className="w-24 text-sm font-medium">{tipo}</div>
              <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                <div
                  className={`h-full ${color} rounded-full`}
                  style={{
                    width: `${(count / DATA_SESSOES_COMPLETO.length) * 100}%`,
                  }}
                />
              </div>
              <div className="w-8 text-sm text-muted-foreground text-right">
                {count}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SessoesPorMesChart() {
  const { DATA_SESSOES_COMPLETO } = useLegislativoSnapshot();

  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const countPorMes = meses.map((mes, i) => {
    const mesNum = String(i + 1).padStart(2, "0");
    const count = DATA_SESSOES_COMPLETO.filter(
      (s) => s.data.slice(5, 7) === mesNum,
    ).length;
    return { mes, count };
  });
  const max = Math.max(...countPorMes.map((m) => m.count), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Sessões por Mês</CardTitle>
        <CardDescription>
          Distribuição do calendário ao longo do ano
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2 h-[200px]">
          {countPorMes.map(({ mes, count }) => (
            <div key={mes} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-medium">{count}</span>
              <div
                className="w-full bg-blue-500 rounded-t transition-all"
                style={{ height: `${(count / max) * 160}px` }}
              />
              <span className="text-xs text-muted-foreground">{mes}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function Sessoes() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Sessões Legislativas
        </h2>
        <Badge variant="outline" className="ml-2">
          2025
        </Badge>
      </div>

      <SessoesStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <SessoesTable />
        <div className="space-y-6">
          <DistribuicaoTipoChart />
          <SessoesPorMesChart />
        </div>
      </div>

      <AgendaExecutivaCard />
    </div>
  );
}
