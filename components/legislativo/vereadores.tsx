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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { KpiCard } from "@/components/ui/kpi-card";
import { type Partido, type Vereador } from "@/lib/demo-legislativo";
import { getInitials } from "@/lib/utils";
import {
  UserIcon,
  ShieldIcon,
  UserMultipleIcon,
  CalendarIcon,
} from "@hugeicons/core-free-icons";

function PartidoBadge({ partido }: { partido: Partido }) {
  const { PartidoCores } = useLegislativoSnapshot();

  return (
    <Badge
      variant="outline"
      className="font-medium"
      style={{
        borderColor: PartidoCores[partido],
        color: PartidoCores[partido],
      }}
    >
      {partido}
    </Badge>
  );
}

function CargoBadge({ cargo }: { cargo: string }) {
  const variants: Record<string, string> = {
    Presidente: "bg-amber-500 text-white",
    "Vice-Presidente": "bg-blue-500 text-white",
    "1º Secretário": "bg-green-500 text-white",
    "2º Secretário": "bg-green-500 text-white",
    Vereador: "bg-gray-500 text-white",
  };
  return (
    <Badge className={variants[cargo] || "bg-gray-500 text-white"}>
      {cargo}
    </Badge>
  );
}

function VereadorCard({ vereador }: { vereador: Vereador }) {
  const { PartidoCores } = useLegislativoSnapshot();

  const initials = getInitials(vereador.nome);

  return (
    <Card className="overflow-hidden">
      <div
        className="h-2"
        style={{ backgroundColor: PartidoCores[vereador.partido] }}
      />
      <CardContent className="pt-4">
        <div className="flex flex-col items-center text-center gap-2">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{vereador.nome}</p>
            <PartidoBadge partido={vereador.partido} />
          </div>
          <CargoBadge cargo={vereador.cargo} />
          <p className="text-xs text-muted-foreground">
            Mandato {vereador.mandato}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function VereadoresKpis() {
  const { DATA_VEREADORES, MESA_DIRETORA } = useLegislativoSnapshot();

  const partidos = new Set(DATA_VEREADORES.map((vereador) => vereador.partido));
  const comEmail = DATA_VEREADORES.filter((vereador) => vereador.email).length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Parlamentares"
        icon={UserMultipleIcon}
        value={DATA_VEREADORES.length}
        borderColor="border-l-emerald-500"
        footer={
          <p className="text-xs text-muted-foreground">
            Composição atual da Câmara Municipal
          </p>
        }
      />
      <KpiCard
        title="Partidos Representados"
        icon={ShieldIcon}
        value={partidos.size}
        borderColor="border-l-blue-500"
        footer={
          <p className="text-xs text-muted-foreground">
            Pluralidade partidária no plenário
          </p>
        }
      />
      <KpiCard
        title="Mesa Diretora"
        icon={CalendarIcon}
        value={Object.keys(MESA_DIRETORA).length}
        borderColor="border-l-amber-500"
        footer={
          <p className="text-xs text-muted-foreground">
            Cargos de governança legislativa
          </p>
        }
      />
      <KpiCard
        title="Contatos Cadastrados"
        icon={UserIcon}
        value={comEmail}
        borderColor="border-l-violet-500"
        footer={
          <p className="text-xs text-muted-foreground">
            Parlamentares com e-mail institucional informado
          </p>
        }
      />
    </div>
  );
}

function ObservacoesPlenarioCard() {
  const { DATA_VEREADORES } = useLegislativoSnapshot();

  const liderancas = DATA_VEREADORES.filter(
    (vereador) => vereador.cargo !== "Vereador",
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Leitura Executiva do Plenário</CardTitle>
        <CardDescription>
          Aspectos institucionais relevantes para governança
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-sm font-medium text-emerald-800">
            Mandato em início de ciclo
          </p>
          <p className="text-sm text-emerald-700">
            A legislatura 2025-2028 favorece planejamento plurianual da pauta,
            revisão do regimento e fortalecimento das comissões.
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm font-medium">Lideranças formais</p>
          <p className="text-sm text-muted-foreground">
            {liderancas
              .map((vereador) => vereador.nome.split(" ")[0])
              .join(", ")}{" "}
            concentram os cargos da Mesa Diretora e podem acelerar a condução
            administrativa da Casa.
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm font-medium">Sugestão de transparência ativa</p>
          <p className="text-sm text-muted-foreground">
            Publicar contatos, composição partidária e histórico de presença em
            destaque melhora o controle social e a navegação do cidadão.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function MesaDiretoraCard() {
  const { MESA_DIRETORA } = useLegislativoSnapshot();

  const { presidente, vice, primeiraSecretaria, segundaSecretaria } =
    MESA_DIRETORA;

  const membros = [
    { cargo: "Presidente", pessoa: presidente },
    { cargo: "Vice-Presidente", pessoa: vice },
    { cargo: "1º Secretário", pessoa: primeiraSecretaria },
    { cargo: "2º Secretário", pessoa: segundaSecretaria },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Mesa Diretora</CardTitle>
        <CardDescription>Gestão 2025-2028</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {membros.map(({ cargo, pessoa }) => (
            <div
              key={cargo}
              className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50"
            >
              <Avatar className="h-12 w-12 mb-2">
                <AvatarFallback>{getInitials(pessoa.nome)}</AvatarFallback>
              </Avatar>
              <p className="font-medium text-sm">{pessoa.nome}</p>
              <p className="text-xs text-muted-foreground">{cargo}</p>
              <PartidoBadge partido={pessoa.partido} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function VereadoresTable() {
  const { DATA_VEREADORES } = useLegislativoSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Lista de Vereadores</CardTitle>
        <CardDescription>Composição da Câmara Municipal</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Partido</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Mandato</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DATA_VEREADORES.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="font-medium">{v.nome}</TableCell>
                <TableCell>
                  <PartidoBadge partido={v.partido} />
                </TableCell>
                <TableCell>
                  <CargoBadge cargo={v.cargo} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {v.mandato}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ComposicaoPartidoChart() {
  const { PartidoCores, DATA_VEREADORES } = useLegislativoSnapshot();

  const partidoCount = DATA_VEREADORES.reduce(
    (acc, v) => {
      acc[v.partido] = (acc[v.partido] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const data = Object.entries(partidoCount).map(([partido, count]) => ({
    partido,
    count,
    fill: PartidoCores[partido as Partido],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Composição por Partido</CardTitle>
        <CardDescription>
          Distribuição dos {DATA_VEREADORES.length} vereadores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map(({ partido, count, fill }) => (
            <div key={partido} className="flex items-center gap-3">
              <div className="w-20 text-sm font-medium">{partido}</div>
              <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(count / DATA_VEREADORES.length) * 100}%`,
                    backgroundColor: fill,
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

export function Vereadores() {
  const { DATA_VEREADORES } = useLegislativoSnapshot();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Vereadores</h2>
        <Badge variant="outline" className="ml-2">
          {DATA_VEREADORES.length} membros
        </Badge>
      </div>

      <VereadoresKpis />

      <MesaDiretoraCard />

      <Separator />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DATA_VEREADORES.map((vereador) => (
          <VereadorCard key={vereador.id} vereador={vereador} />
        ))}
      </div>

      <Separator />

      <div className="grid gap-6 lg:grid-cols-2">
        <VereadoresTable />
        <ComposicaoPartidoChart />
      </div>

      <ObservacoesPlenarioCard />
    </div>
  );
}
