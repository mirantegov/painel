"use client";

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
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  TOTAL_PARTICIPANTES_ATIVOS,
  TOTAL_APOSENTADOS,
  TOTAL_PENSIONISTAS,
  TOTAL_BENEFICIARIOS,
  DATA_PARTICIPANTES,
  DATA_APOSENTADOS,
  DATA_PENSIONISTAS,
  DATA_BENEFICIARIOS,
  DATA_BENEFICIARIOS_MES,
  DATA_DISTRIBUICAO_ETARIA,
  formatCurrency,
  formatNumber,
} from "@/lib/demo-previdencia";
import {
  UserIcon,
  UserMultipleIcon,
  UserCheckIcon,
  WalletIcon,
} from "@hugeicons/core-free-icons";
import { getInitials } from "@/lib/utils";

function ComposicaoChart() {
  const total = TOTAL_BENEFICIARIOS;
  const aposentadosCount = DATA_BENEFICIARIOS.filter(
    (b) => b.tipo === "Aposentadoria",
  ).reduce((acc, b) => acc + b.quantidade, 0);
  const pensoes = DATA_BENEFICIARIOS.filter((b) => b.tipo === "Pensão").reduce(
    (acc, b) => acc + b.quantidade,
    0,
  );
  const auxilios = DATA_BENEFICIARIOS.filter(
    (b) => b.tipo === "Auxílio",
  ).reduce((acc, b) => acc + b.quantidade, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Composição de Beneficiários</CardTitle>
        <CardDescription>Distribuição por tipo de benefício</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Aposentadorias</span>
              <span className="font-medium">{aposentadosCount}</span>
            </div>
            <Progress
              value={(aposentadosCount / total) * 100}
              className="h-3"
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Pensões</span>
              <span className="font-medium">{pensoes}</span>
            </div>
            <Progress
              value={(pensoes / total) * 100}
              className="h-3 [&>div]:bg-emerald-500"
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Auxílios</span>
              <span className="font-medium">{auxilios}</span>
            </div>
            <Progress
              value={(auxilios / total) * 100}
              className="h-3 [&>div]:bg-emerald-400"
            />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Total</span>
            <span className="text-sm font-bold">{total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BeneficiariosTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Detalhamento por Benefício</CardTitle>
        <CardDescription>Quantidade e valores por tipo</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Subtipo</TableHead>
              <TableHead className="text-right">Quantidade</TableHead>
              <TableHead className="text-right">Valor Médio</TableHead>
              <TableHead className="text-right">Valor Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DATA_BENEFICIARIOS.map((b, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{b.tipo}</TableCell>
                <TableCell>{b.subtipo}</TableCell>
                <TableCell className="text-right">{b.quantidade}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(b.valorMedio)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(b.valorTotal)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ParticipantesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Participantes Ativos</CardTitle>
        <CardDescription>
          Servidores contribuintes vinculados ao RPPS
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Matrícula</TableHead>
              <TableHead>Órgão</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead className="text-right">Salário</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DATA_PARTICIPANTES.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {getInitials(p.nome)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{p.nome}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {p.matricula}
                </TableCell>
                <TableCell className="text-sm">{p.orgao}</TableCell>
                <TableCell>{p.cargo}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(p.salario)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function AposentadosTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Aposentados</CardTitle>
        <CardDescription>Lista de servidores aposentados</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Órgão</TableHead>
              <TableHead className="text-right">Benefício</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DATA_APOSENTADOS.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.nome}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="text-emerald-600 border-emerald-600"
                  >
                    {a.tipoAposentadoria}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{a.orgaoOrigem}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(a.valorBeneficio)}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {a.dataAposentacao}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function PensionistasTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Pensionistas</CardTitle>
        <CardDescription>Benefícios de pensão ativos</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Instituidor</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="text-right">Quota</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DATA_PENSIONISTAS.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.nome}</TableCell>
                <TableCell className="text-sm">{p.instituidor}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="text-emerald-600 border-emerald-600"
                  >
                    {p.tipoPensao}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(p.valorPensao)}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {p.quota}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function DistribuicaoEtariaChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Distribuição Etária</CardTitle>
        <CardDescription>Participantes ativos por faixa etária</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              quantidade: {
                label: "Participantes",
                color: "var(--chart-1)",
              },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <BarChart
            data={DATA_DISTRIBUICAO_ETARIA}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="faixa"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={40}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="quantidade"
              fill="var(--color-quantidade)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function PerfilPrevidenciarioCard() {
  const razaoDependencia = TOTAL_BENEFICIARIOS / TOTAL_PARTICIPANTES_ATIVOS;
  const mediaBeneficio =
    DATA_BENEFICIARIOS.reduce((acc, item) => acc + item.valorTotal, 0) /
    TOTAL_BENEFICIARIOS;
  const maiorGrupo = [...DATA_BENEFICIARIOS].sort(
    (a, b) => b.quantidade - a.quantidade,
  )[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Leitura do Perfil Previdenciário
        </CardTitle>
        <CardDescription>
          Estrutura atual da massa segurada e assistida
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-sm font-medium text-emerald-800">
            Razão de dependência
          </p>
          <p className="text-sm text-emerald-700">
            O RPPS possui {formatNumber(TOTAL_BENEFICIARIOS)} beneficiários para
            {formatNumber(TOTAL_PARTICIPANTES_ATIVOS)} contribuintes,
            equivalente a {(razaoDependencia * 100).toFixed(1)} beneficiários
            por 100 ativos.
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm font-medium">Concentração de pagamentos</p>
          <p className="text-sm text-muted-foreground">
            O maior grupo é {maiorGrupo.subtipo.toLowerCase()}, com{" "}
            {formatNumber(maiorGrupo.quantidade)}
            concessões. O valor médio global dos benefícios está em{" "}
            {formatCurrency(mediaBeneficio)}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function GestaoBeneficios() {
  const maxBeneficiariosMes = Math.max(
    ...DATA_BENEFICIARIOS_MES.map((item) => item.quantidade),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Gestão de Benefícios
        </h2>
        <Badge variant="outline" className="ml-2">
          RPPS
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Participantes Ativos"
          value={formatNumber(TOTAL_PARTICIPANTES_ATIVOS)}
          icon={UserIcon}
          borderColor="border-l-emerald-600"
          footer={
            <p className="text-xs text-muted-foreground">
              Base contributiva atual do regime próprio
            </p>
          }
        />
        <KpiCard
          title="Aposentados"
          value={formatNumber(TOTAL_APOSENTADOS)}
          icon={UserCheckIcon}
          borderColor="border-l-emerald-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Benefícios permanentes já concedidos
            </p>
          }
        />
        <KpiCard
          title="Pensionistas"
          value={formatNumber(TOTAL_PENSIONISTAS)}
          icon={UserMultipleIcon}
          borderColor="border-l-lime-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Pensões em manutenção no período
            </p>
          }
        />
        <KpiCard
          title="Total Beneficiários"
          value={formatNumber(TOTAL_BENEFICIARIOS)}
          icon={WalletIcon}
          borderColor="border-l-green-700"
          footer={
            <p className="text-xs text-muted-foreground">
              Soma de aposentados e pensionistas do RPPS
            </p>
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ComposicaoChart />
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Evolução de Beneficiários</CardTitle>
            <CardDescription>Últimos 12 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-[200px]">
              {DATA_BENEFICIARIOS_MES.map(({ mes, quantidade }) => {
                return (
                  <div
                    key={mes}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <div
                      className="w-full bg-emerald-500 rounded-t transition-all"
                      style={{
                        height: `${(quantidade / maxBeneficiariosMes) * 160}px`,
                      }}
                    />
                    <span className="text-xs text-muted-foreground">{mes}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <DistribuicaoEtariaChart />

      <PerfilPrevidenciarioCard />

      <BeneficiariosTable />

      <div className="grid gap-6 lg:grid-cols-2">
        <ParticipantesTable />
        <div className="space-y-6">
          <AposentadosTable />
          <PensionistasTable />
        </div>
      </div>
    </div>
  );
}
