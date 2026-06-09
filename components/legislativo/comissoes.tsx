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
import { KpiCard } from "@/components/ui/kpi-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  formatDate,
  type Comissao,
  type TipoComissao,
} from "@/lib/demo-legislativo";
import { getInitials } from "@/lib/utils";
import {
  UserMultipleIcon,
  CalendarIcon,
  ShieldIcon,
} from "@hugeicons/core-free-icons";

function TipoBadge({ tipo }: { tipo: TipoComissao }) {
  const colors: Record<TipoComissao, string> = {
    Permanente: "bg-blue-500 text-white",
    Temporária: "bg-orange-500 text-white",
  };
  return (
    <Badge className={colors[tipo] || "bg-gray-500 text-white"}>{tipo}</Badge>
  );
}

function StatusBadge({ ativo }: { ativo: boolean }) {
  return (
    <Badge
      className={ativo ? "bg-green-500 text-white" : "bg-red-500 text-white"}
    >
      {ativo ? "Ativa" : "Inativa"}
    </Badge>
  );
}

function ComissaoCard({ comissao }: { comissao: Comissao }) {
  return (
    <Card>
      <div className="p-4 border-b">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-sm leading-tight">
              {comissao.nome}
            </h3>
            <div className="flex gap-2 mt-2">
              <TipoBadge tipo={comissao.tipo} />
              <StatusBadge ativo={comissao.ativo} />
            </div>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-muted">
            <span className="text-lg font-bold">{comissao.membros.length}</span>
            <span className="text-xs text-muted-foreground">membros</span>
          </div>
        </div>
      </div>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Presidente</p>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {getInitials(comissao.presidente.nome)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{comissao.presidente.nome}</span>
              <Badge variant="outline" className="text-xs ml-auto">
                {comissao.presidente.partido}
              </Badge>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Membros</p>
            <div className="flex flex-wrap gap-1">
              {comissao.membros.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-1 bg-muted rounded px-2 py-1"
                >
                  <Avatar className="h-4 w-4">
                    <AvatarFallback className="text-[10px]">
                      {getInitials(m.nome)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{m.nome.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Criada em: {formatDate(comissao.dataCriacao)}
              {comissao.dataFim &&
                ` • Término: ${formatDate(comissao.dataFim)}`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ComissoesTable() {
  const { DATA_COMISSOES } = useLegislativoSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Todas as Comissões</CardTitle>
        <CardDescription>
          Comissões permanentes e temporárias da Câmara
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Presidente</TableHead>
              <TableHead>Membros</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DATA_COMISSOES.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.nome}</TableCell>
                <TableCell>
                  <TipoBadge tipo={c.tipo} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {getInitials(c.presidente.nome)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{c.presidente.nome}</span>
                  </div>
                </TableCell>
                <TableCell>{c.membros.length}</TableCell>
                <TableCell>
                  <StatusBadge ativo={c.ativo} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ComissoesStats() {
  const { DATA_COMISSOES } = useLegislativoSnapshot();

  const total = DATA_COMISSOES.length;
  const permanentes = DATA_COMISSOES.filter(
    (c) => c.tipo === "Permanente",
  ).length;
  const temporarias = DATA_COMISSOES.filter(
    (c) => c.tipo === "Temporária",
  ).length;
  const totalMembros = DATA_COMISSOES.reduce(
    (acc, c) => acc + c.membros.length,
    0,
  );
  const ativas = DATA_COMISSOES.filter((c) => c.ativo).length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Comissões Ativas"
        icon={UserMultipleIcon}
        value={ativas}
        borderColor="border-l-emerald-500"
        footer={
          <p className="text-xs text-muted-foreground">
            {total} comissões instituídas no período
          </p>
        }
      />
      <KpiCard
        title="Permanentes"
        icon={ShieldIcon}
        value={permanentes}
        borderColor="border-l-blue-500"
        footer={
          <p className="text-xs text-muted-foreground">
            Estruturas de análise contínua da Câmara
          </p>
        }
      />
      <KpiCard
        title="Temporárias"
        icon={CalendarIcon}
        value={temporarias}
        borderColor="border-l-amber-500"
        footer={
          <p className="text-xs text-muted-foreground">
            Comissões com prazo determinado para entrega
          </p>
        }
      />
      <KpiCard
        title="Membros Designados"
        icon={UserMultipleIcon}
        value={totalMembros}
        borderColor="border-l-violet-500"
        footer={
          <p className="text-xs text-muted-foreground">
            Média de {Math.round(totalMembros / total)} integrantes por comissão
          </p>
        }
      />
    </div>
  );
}

function PainelComissoesCard() {
  const { DATA_COMISSOES } = useLegislativoSnapshot();

  const presidentesPartidos = DATA_COMISSOES.reduce(
    (acc, comissao) => {
      acc[comissao.presidente.partido] =
        (acc[comissao.presidente.partido] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const [partidoLider, quantidadeLider] = Object.entries(
    presidentesPartidos,
  ).sort((a, b) => b[1] - a[1])[0] ?? ["Sem definição", 0];

  const temporariasAtivas = DATA_COMISSOES.filter(
    (item) => item.tipo === "Temporária" && item.ativo,
  ).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Leitura de Governança</CardTitle>
        <CardDescription>
          Distribuição e funcionamento das comissões
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-sm font-medium text-emerald-800">
            Coordenação política
          </p>
          <p className="text-sm text-emerald-700">
            O partido {partidoLider} concentra {quantidadeLider} presidência(s),
            sinalizando maior influência sobre a pauta técnica das comissões.
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm font-medium">Capacidade temporária</p>
          <p className="text-sm text-muted-foreground">
            Há {temporariasAtivas} comissão(ões) temporária(s) ativa(s), com
            foco em estudos específicos e entregas com prazo definido.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function Comissoes() {
  const { DATA_COMISSOES } = useLegislativoSnapshot();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Comissões</h2>
        <Badge variant="outline" className="ml-2">
          {DATA_COMISSOES.length} comissões
        </Badge>
      </div>

      <ComissoesStats />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DATA_COMISSOES.map((comissao) => (
          <ComissaoCard key={comissao.id} comissao={comissao} />
        ))}
      </div>

      <PainelComissoesCard />

      <ComissoesTable />
    </div>
  );
}
