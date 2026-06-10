"use client";

import * as React from "react";
import { fmtBRL } from "@/lib/format";
import { useSnapshot } from "@/components/use-snapshot";
import { ASSISTENCIA_SOCIAL_SNAPSHOT } from "@/lib/demo-assistencia-social";
import {
  Alert02Icon,
  AlertCircleIcon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  BankIcon,
  Calendar01Icon,
  ChartLineData02Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  InformationCircleIcon,
  MoneyReceiveSquareIcon,
  SecurityCheckIcon,
  Target01Icon,
  UserMultipleIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  ChartPieValueLegend,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { KpiCard } from "@/components/ui/kpi-card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

const formatNumber = (value: number) =>
  new Intl.NumberFormat("pt-BR").format(value);

function badgeVariant(status: string) {
  if (status === "Crítico") return "destructive" as const;
  if (status === "Atenção") return "secondary" as const;
  return "default" as const;
}

export function AssistenciaSocial() {
  const {
    greenPalette,
    resumo,
    execucaoMensal,
    chartExecucao,
    fontesRecursos,
    chartFontes,
    programas,
    chartProgramas,
    desempenhoProgramas,
    contasBancarias,
    detalhamentoDespesa,
    receitasPorOrigem,
    chartReceitasOrigem,
    controleFontes,
    indicadoresRede,
    familiasPorTerritorio,
    chartTerritorio,
    agendaGestao,
    patrimonioResumo,
    unidadesPatrimoniais,
    manutencaoPatrimonial,
    movimentacoesPatrimoniais,
    chartMovimentacoesPatrimoniais,
    termosResponsabilidade,
    vigilanciaResumo,
    vulnerabilidadeTerritorial,
    demandaCapacidade,
    violacoesDireitos,
    chartVulnerabilidade,
    evolucaoDemanda,
    chartEvolucaoDemanda,
    protecaoEspecialResumo,
    creas,
    centroPop,
    medidasSocioeducativas,
    beneficiosEventuais,
    equipesRh,
    capacitacao,
    conselhoCmas,
    protecaoBasicaResumo,
    crasFuncionamento,
    chartPaifPerformance,
    paifPerformanceData,
    indicadoresProtecaoBasica,
    scfvFaixaEtaria,
    transferenciaRendaResumo,
    qualidadeCadastral,
    chartQualidadeCadastral,
    condicionalidadesBF,
    averiguacaoCadastral,
    igdmDecomposicao,
    primeiraInfanciaResumo,
    programaCriancaFeliz,
    evolucaoVisitasPcf,
    chartVisitasPcf,
    segurancaAlimentar,
    insegurancaAlimentarTerritorio,
    chartInsegurancaAlimentar,
    censoSuas,
    buscaAtivaQualificada,
    acolhimentoInstitucional,
    piaResumo,
  } = useSnapshot("assistencia-social", ASSISTENCIA_SOCIAL_SNAPSHOT);
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024");

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Orçamento Atualizado"
          icon={Wallet01Icon}
          value={fmtBRL(resumo.orcamentoAtualizado)}
          borderColor="border-l-emerald-700"
          footer={
            <p className="text-sm text-muted-foreground">
              Dotação da secretaria e fundos vinculados
            </p>
          }
        />
        <KpiCard
          title="Execução Orçamentária"
          icon={Target01Icon}
          value={`${resumo.execucaoPct}%`}
          borderColor="border-l-emerald-700"
          footer={
            <>
              <Progress value={resumo.execucaoPct} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Empenho e liquidação em linha com o cronograma anual
              </p>
            </>
          }
        />
        <KpiCard
          title="Saldo em Fontes Vinculadas"
          icon={BankIcon}
          value={fmtBRL(resumo.saldoFontes)}
          borderColor="border-l-emerald-700"
          footer={
            <p className="text-sm text-muted-foreground">
              Disponibilidade financeira para execução pactuada
            </p>
          }
        />
        <KpiCard
          title="Famílias Acompanhadas"
          icon={UserMultipleIcon}
          value={formatNumber(resumo.familiasAcompanhadas)}
          borderColor="border-l-emerald-700"
          footer={
            <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-4"
              />
              Crescimento de 6,8% frente ao ciclo anterior
            </div>
          }
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={MoneyReceiveSquareIcon}
                strokeWidth={2}
                className="size-5"
              />
              Gestão Orçamentária e Financeira
            </CardTitle>
            <CardDescription>
              Acompanhamento da execução da despesa, fontes de recursos e contas
              bancárias vinculadas.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Receitas vinculadas realizadas
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {formatCurrency(11_920_000)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Transferências e cofinanciamento do período.
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Despesas liquidadas
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {formatCurrency(14_280_000)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Serviços, benefícios eventuais e manutenção da rede.
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Conciliação média bancária
              </p>
              <p className="mt-2 text-3xl font-semibold">95,8%</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Baixa incidência de divergências nas contas vinculadas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orcamentaria" className="w-full">
        <TabsList className="flex h-auto w-full flex-wrap gap-2 rounded-2xl p-2">
          <TabsTrigger value="orcamentaria">Gestão Orçamentária</TabsTrigger>
          <TabsTrigger value="protecao-basica">
            Proteção Social Básica
          </TabsTrigger>
          <TabsTrigger value="programas">Programas Sociais</TabsTrigger>
          <TabsTrigger value="transferencia-renda">
            Transferência de Renda
          </TabsTrigger>
          <TabsTrigger value="primeira-infancia">
            Primeira Infância e SAN
          </TabsTrigger>
          <TabsTrigger value="vigilancia">
            Vigilância Socioassistencial
          </TabsTrigger>
          <TabsTrigger value="protecao">
            Proteção Especial e Equipes
          </TabsTrigger>
          <TabsTrigger value="patrimonio">Controle Patrimonial</TabsTrigger>
        </TabsList>

        <TabsContent value="orcamentaria" className="mt-6 space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={ChartLineData02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Evolução da Execução
                </CardTitle>
                <CardDescription>
                  Empenhado e pago ao longo do exercício.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartExecucao}
                  className="h-[300px] w-full"
                >
                  <AreaChart
                    data={execucaoMensal}
                    margin={{ left: 0, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${Number(v) / 1_000_000}M`}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatCurrency(Number(value))}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Area
                      type="monotone"
                      dataKey="empenhado"
                      stroke="var(--color-empenhado)"
                      fill="var(--color-empenhado)"
                      fillOpacity={0.24}
                      strokeWidth={2.5}
                    />
                    <Area
                      type="monotone"
                      dataKey="pago"
                      stroke="var(--color-pago)"
                      fill="var(--color-pago)"
                      fillOpacity={0.18}
                      strokeWidth={2.5}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Composição das Fontes</CardTitle>
                <CardDescription>
                  Distribuição das fontes que financiam a política
                  socioassistencial.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartFontes}
                  className="mx-auto aspect-auto h-[320px] w-full"
                >
                  <PieChart>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          nameKey="nome"
                          formatter={(value) => formatCurrency(Number(value))}
                        />
                      }
                    />
                    <Pie
                      data={fontesRecursos}
                      dataKey="valor"
                      nameKey="nome"
                      innerRadius={70}
                      outerRadius={110}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {fontesRecursos.map((item) => (
                        <Cell key={item.nome} fill={item.fill} />
                      ))}
                    </Pie>
                    <ChartLegend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      content={
                        <ChartPieValueLegend
                          nameKey="nome"
                          valueKey="valor"
                          valueFormatter={formatCurrency}
                        />
                      }
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={MoneyReceiveSquareIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Receitas por Origem
                </CardTitle>
                <CardDescription>
                  Comparativo entre previsão e arrecadação das principais fontes
                  da assistência social.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartReceitasOrigem}
                  className="h-[320px] w-full"
                >
                  <BarChart
                    data={receitasPorOrigem}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="origem"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `R$ ${(Number(value) / 1_000_000).toFixed(1)}M`
                      }
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatCurrency(Number(value))}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="previsto"
                      fill="var(--color-previsto)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="arrecadado"
                      fill="var(--color-arrecadado)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Target01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Indicadores da Rede
                </CardTitle>
                <CardDescription>
                  Monitoramento operacional da execução socioassistencial.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {indicadoresRede.map((item) => (
                  <div key={item.indicador} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.indicador}</p>
                        <p className="text-sm text-muted-foreground">
                          Meta: {item.meta}%
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.valor >= item.meta ? "default" : "secondary"
                        }
                      >
                        {item.valor}%
                      </Badge>
                    </div>
                    <Progress value={item.valor} className="mt-4 h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={BankIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Controle de Fontes de Recursos
                </CardTitle>
                <CardDescription>
                  Saldo, comprometimento e disponibilidade por fonte vinculada.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Fonte</TableHead>
                      <TableHead className="text-right">Saldo</TableHead>
                      <TableHead className="text-right">Comprometido</TableHead>
                      <TableHead className="text-right">Disponível</TableHead>
                      <TableHead>Situação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {controleFontes.map((fonte) => (
                      <TableRow key={fonte.codigo}>
                        <TableCell className="font-medium">
                          {fonte.codigo}
                        </TableCell>
                        <TableCell>{fonte.descricao}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(fonte.saldo)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(fonte.comprometido)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(fonte.disponibilidade)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              fonte.situacao === "Atenção"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {fonte.situacao}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agenda de Gestão</CardTitle>
                <CardDescription>
                  Compromissos críticos para manter a execução, controle e
                  prestação de contas.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {agendaGestao.map((item) => (
                  <div key={item.item} className="rounded-2xl border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium">{item.item}</p>
                      <Badge
                        variant={
                          item.status === "Prioritário"
                            ? "destructive"
                            : item.status === "Atenção"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>Prazo: {item.prazo}</span>
                      <span>Responsável: {item.responsavel}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={BankIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Contas Bancárias Vinculadas
              </CardTitle>
              <CardDescription>
                Monitoramento da movimentação financeira e da conciliação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Conta</TableHead>
                    <TableHead>Finalidade</TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                    <TableHead className="text-right">Conciliação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contasBancarias.map((conta) => (
                    <TableRow key={conta.conta}>
                      <TableCell className="font-medium">
                        {conta.conta}
                      </TableCell>
                      <TableCell>{conta.finalidade}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(conta.saldo)}
                      </TableCell>
                      <TableCell className="text-right">
                        {conta.conciliacao}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protecao-basica" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="CRAS em Funcionamento"
              icon={BankIcon}
              value={`${protecaoBasicaResumo.crasEmFuncionamento} de ${protecaoBasicaResumo.crasReferenciados}`}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Unidades referenciadas em pleno funcionamento
                </p>
              }
            />
            <KpiCard
              title="Famílias no PAIF"
              icon={UserMultipleIcon}
              value={formatNumber(protecaoBasicaResumo.familiasPaif)}
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress
                    value={
                      (protecaoBasicaResumo.familiasPaif /
                        protecaoBasicaResumo.metaPaif) *
                      100
                    }
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Meta: {formatNumber(protecaoBasicaResumo.metaPaif)} famílias
                  </p>
                </>
              }
            />
            <KpiCard
              title="Taxa de Acompanhamento PAIF"
              icon={Target01Icon}
              value={`${protecaoBasicaResumo.taxaAcompanhamentoPaif}%`}
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress
                    value={protecaoBasicaResumo.taxaAcompanhamentoPaif}
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Famílias com acompanhamento regular
                  </p>
                </>
              }
            />
            <KpiCard
              title="Visitas Domiciliares"
              icon={CheckmarkCircle02Icon}
              value={formatNumber(protecaoBasicaResumo.visitasDomiciliares)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Realizadas no período pela equipe PAIF
                </p>
              }
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={BankIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Operação das Unidades CRAS
                </CardTitle>
                <CardDescription>
                  Desempenho operacional por CRAS: famílias, busca ativa,
                  oficinas e referenciamento.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unidade</TableHead>
                      <TableHead className="text-right">
                        Famílias PAIF
                      </TableHead>
                      <TableHead className="text-right">Busca Ativa</TableHead>
                      <TableHead className="text-right">Oficinas/mês</TableHead>
                      <TableHead className="text-right">Acolhidas</TableHead>
                      <TableHead className="text-right">
                        Referenciamento
                      </TableHead>
                      <TableHead>Equipe</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {crasFuncionamento.map((item) => (
                      <TableRow key={item.unidade}>
                        <TableCell className="font-medium">
                          {item.unidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.paif)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.buscaAtiva}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.oficinas}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.acolhidas}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.referenciamento)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.equipeMinima ? "default" : "destructive"
                            }
                          >
                            {item.equipeMinima ? "Completa" : "Incompleta"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={ChartLineData02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Desempenho PAIF por CRAS
                </CardTitle>
                <CardDescription>
                  Famílias acompanhadas no PAIF e ações de busca ativa por
                  unidade.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartPaifPerformance}
                  className="h-[320px] w-full"
                >
                  <BarChart
                    data={paifPerformanceData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="unidade"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatNumber(Number(value))}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="paif"
                      fill="var(--color-paif)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="buscaAtiva"
                      fill="var(--color-buscaAtiva)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Target01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Indicadores de Proteção Básica
                </CardTitle>
                <CardDescription>
                  Metas operacionais de qualidade dos serviços de Proteção
                  Social Básica.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {indicadoresProtecaoBasica.map((item) => (
                  <div key={item.indicador} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.indicador}</p>
                        <p className="text-sm text-muted-foreground">
                          Meta: {item.meta}%
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.valor >= item.meta ? "default" : "secondary"
                        }
                      >
                        {item.valor}%
                      </Badge>
                    </div>
                    <Progress value={item.valor} className="mt-4 h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  SCFV por Faixa Etária
                </CardTitle>
                <CardDescription>
                  Serviço de Convivência e Fortalecimento de Vínculos —
                  inscritos, frequentes e ocupação.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Faixa Etária</TableHead>
                      <TableHead className="text-right">Inscritos</TableHead>
                      <TableHead className="text-right">Frequentes</TableHead>
                      <TableHead className="text-right">Vagas</TableHead>
                      <TableHead className="text-right">Ocupação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scfvFaixaEtaria.map((item) => (
                      <TableRow key={item.faixaEtaria}>
                        <TableCell className="font-medium">
                          {item.faixaEtaria}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.inscritos)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.frequentes)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.vagas)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              item.ocupacao >= 85 ? "default" : "secondary"
                            }
                          >
                            {item.ocupacao}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="programas" className="mt-6 space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Programas Prioritários
                </CardTitle>
                <CardDescription>
                  KPIs operacionais e controles mínimos dos programas
                  monitorados.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Programa</TableHead>
                      <TableHead className="text-right">Famílias</TableHead>
                      <TableHead className="text-right">Cobertura</TableHead>
                      <TableHead>Controle principal</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programas.map((item) => (
                      <TableRow key={item.programa}>
                        <TableCell className="font-medium">
                          {item.programa}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.familias)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.cobertura}%
                        </TableCell>
                        <TableCell>{item.controle}</TableCell>
                        <TableCell>
                          <Badge variant={badgeVariant(item.status)}>
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Desempenho dos Programas</CardTitle>
                <CardDescription>
                  Índice sintético de cobertura e acompanhamento por programa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartProgramas}
                  className="min-h-[340px]"
                >
                  <BarChart
                    data={desempenhoProgramas}
                    layout="vertical"
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis
                      type="category"
                      dataKey="programa"
                      width={110}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => `${value}%`}
                        />
                      }
                    />
                    <Bar
                      dataKey="indicador"
                      radius={8}
                      fill="var(--color-indicador)"
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Famílias por Território
                </CardTitle>
                <CardDescription>
                  Concentração territorial das famílias em acompanhamento e
                  beneficiárias.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartTerritorio}
                  className="h-[320px] w-full"
                >
                  <BarChart
                    data={familiasPorTerritorio}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="territorio"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatNumber(Number(value))}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="cadunico"
                      fill="var(--color-cadunico)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="bolsaFamilia"
                      fill="var(--color-bolsaFamilia)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalhamento da Despesa por Bloco</CardTitle>
                <CardDescription>
                  Execução por grandes grupos da política de assistência social.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Grupo</TableHead>
                      <TableHead className="text-right">Autorizado</TableHead>
                      <TableHead className="text-right">Empenhado</TableHead>
                      <TableHead className="text-right">Liquidado</TableHead>
                      <TableHead className="text-right">Pago</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {detalhamentoDespesa.map((item) => (
                      <TableRow key={item.grupo}>
                        <TableCell className="font-medium">
                          {item.grupo}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.autorizado)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.empenhado)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.liquidado)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.pago)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transferencia-renda" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Famílias no CadÚnico"
              icon={UserMultipleIcon}
              value={formatNumber(transferenciaRendaResumo.familiasCadunico)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Total de famílias cadastradas no Cadastro Único
                </p>
              }
            />
            <KpiCard
              title="Cadastros Atualizados (< 2 anos)"
              icon={CheckmarkCircle02Icon}
              value={`${transferenciaRendaResumo.cadastrosAtualizados}%`}
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress
                    value={transferenciaRendaResumo.cadastrosAtualizados}
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Proporção de cadastros dentro da validade
                  </p>
                </>
              }
            />
            <KpiCard
              title="Famílias Bolsa Família"
              icon={MoneyReceiveSquareIcon}
              value={formatNumber(
                transferenciaRendaResumo.familiasBolsaFamilia,
              )}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Famílias beneficiárias do programa
                </p>
              }
            />
            <KpiCard
              title="IGD-M"
              icon={Target01Icon}
              value={transferenciaRendaResumo.igdm.toFixed(2)}
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress
                    value={transferenciaRendaResumo.igdm * 100}
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Índice de Gestão Descentralizada Municipal
                  </p>
                </>
              }
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={ChartLineData02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Qualidade Cadastral CadÚnico
                </CardTitle>
                <CardDescription>
                  Evolução mensal da proporção de cadastros atualizados,
                  inconsistentes e pendentes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartQualidadeCadastral}
                  className="h-[320px] w-full"
                >
                  <AreaChart
                    data={qualidadeCadastral}
                    margin={{ left: 0, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${v}%`}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => `${value}%`}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Area
                      type="monotone"
                      dataKey="atualizados"
                      stroke="var(--color-atualizados)"
                      fill="var(--color-atualizados)"
                      fillOpacity={0.24}
                      strokeWidth={2.5}
                    />
                    <Area
                      type="monotone"
                      dataKey="inconsistentes"
                      stroke="var(--color-inconsistentes)"
                      fill="var(--color-inconsistentes)"
                      fillOpacity={0.18}
                      strokeWidth={2.5}
                    />
                    <Area
                      type="monotone"
                      dataKey="pendentes"
                      stroke="var(--color-pendentes)"
                      fill="var(--color-pendentes)"
                      fillOpacity={0.12}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={SecurityCheckIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Condicionalidades Bolsa Família
                </CardTitle>
                <CardDescription>
                  Acompanhamento de condicionalidades e efeitos sobre o
                  benefício.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Condicionalidade</TableHead>
                      <TableHead className="text-right">Acomp. (%)</TableHead>
                      <TableHead className="text-right">
                        Descumpr. (%)
                      </TableHead>
                      <TableHead className="text-right">Advertência</TableHead>
                      <TableHead className="text-right">Bloqueio</TableHead>
                      <TableHead className="text-right">Suspensão</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {condicionalidadesBF.map((item) => (
                      <TableRow key={item.condicionalidade}>
                        <TableCell className="font-medium">
                          {item.condicionalidade}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              item.acompanhamento >= 93
                                ? "default"
                                : "secondary"
                            }
                          >
                            {item.acompanhamento}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.descumprimento}%
                        </TableCell>
                        <TableCell className="text-right">
                          {item.advertencia}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.bloqueio}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.suspensao}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Alert02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Averiguação Cadastral
                </CardTitle>
                <CardDescription>
                  Situação das famílias convocadas para atualização cadastral
                  obrigatória.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Famílias Convocadas
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {formatNumber(averiguacaoCadastral.familiasConvocadas)}
                    </p>
                    <Badge variant="outline" className="mt-2">
                      Total
                    </Badge>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Atualizadas no Prazo
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {formatNumber(averiguacaoCadastral.atualizadasNoPrazo)}
                    </p>
                    <Badge variant="default" className="mt-2">
                      Regular
                    </Badge>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Sem Resposta
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {formatNumber(averiguacaoCadastral.semResposta)}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      Atenção
                    </Badge>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">Canceladas</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {formatNumber(averiguacaoCadastral.canceladas)}
                    </p>
                    <Badge variant="destructive" className="mt-2">
                      Cancelado
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Target01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Decomposição IGD-M
                </CardTitle>
                <CardDescription>
                  Componentes que formam o Índice de Gestão Descentralizada
                  Municipal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {igdmDecomposicao.map((item) => (
                  <div key={item.componente} className="rounded-2xl border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-medium">{item.componente}</p>
                        <p className="text-sm text-muted-foreground">
                          Peso: {item.peso}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">
                          {item.valor.toFixed(2)}
                        </span>
                        <Badge
                          variant={
                            item.status === "Bom" ? "default" : "secondary"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={item.valor * 100} className="mt-3 h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="primeira-infancia" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Crianças no PCF (Criança Feliz)"
              icon={UserMultipleIcon}
              value={formatNumber(primeiraInfanciaResumo.criancasPcf)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Crianças acompanhadas pelo programa
                </p>
              }
            />
            <KpiCard
              title="Gestantes Acompanhadas"
              icon={UserMultipleIcon}
              value={formatNumber(primeiraInfanciaResumo.gestantesAcompanhadas)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Gestantes com visitas domiciliares regulares
                </p>
              }
            />
            <KpiCard
              title="Famílias com Inseg. Alimentar"
              icon={Alert02Icon}
              value={formatNumber(
                primeiraInfanciaResumo.familiasInsegurancaAlimentar,
              )}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Identificadas nos territórios de abrangência
                </p>
              }
            />
            <KpiCard
              title="Equipamentos de SAN Ativos"
              icon={BankIcon}
              value={primeiraInfanciaResumo.equipamentosSan.toString()}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Unidades de Segurança Alimentar e Nutricional
                </p>
              }
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Programa Criança Feliz
                </CardTitle>
                <CardDescription>
                  Cobertura territorial de visitas domiciliares a crianças e
                  gestantes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Território</TableHead>
                      <TableHead className="text-right">Crianças</TableHead>
                      <TableHead className="text-right">Gestantes</TableHead>
                      <TableHead className="text-right">Visitadores</TableHead>
                      <TableHead className="text-right">Visitas/mês</TableHead>
                      <TableHead className="text-right">Meta</TableHead>
                      <TableHead className="text-right">Cobertura</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programaCriancaFeliz.map((item) => (
                      <TableRow key={item.territorio}>
                        <TableCell className="font-medium">
                          {item.territorio}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.criancas)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.gestantes}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.visitadores}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.visitasMes)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.metaVisitas)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              item.cobertura >= 85 ? "default" : "secondary"
                            }
                          >
                            {item.cobertura}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={ChartLineData02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Evolução de Visitas PCF
                </CardTitle>
                <CardDescription>
                  Comparativo mensal entre visitas realizadas e previstas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartVisitasPcf}
                  className="h-[320px] w-full"
                >
                  <AreaChart
                    data={evolucaoVisitasPcf}
                    margin={{ left: 0, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatNumber(Number(value))}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Area
                      type="monotone"
                      dataKey="previstas"
                      stroke="var(--color-previstas)"
                      fill="var(--color-previstas)"
                      fillOpacity={0.12}
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="realizadas"
                      stroke="var(--color-realizadas)"
                      fill="var(--color-realizadas)"
                      fillOpacity={0.24}
                      strokeWidth={2.5}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={BankIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Segurança Alimentar e Nutricional
                </CardTitle>
                <CardDescription>
                  Equipamentos de SAN ativos, capacidade e taxa de ocupação.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equipamento</TableHead>
                      <TableHead className="text-right">Capacidade</TableHead>
                      <TableHead className="text-right">
                        Refeições/dia
                      </TableHead>
                      <TableHead className="text-right">Ocupação</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {segurancaAlimentar.map((item) => (
                      <TableRow key={item.equipamento}>
                        <TableCell className="font-medium">
                          {item.equipamento}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.capacidade)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.refeicoesDia)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.ocupacao}%
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">{item.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Alert02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Insegurança Alimentar por Território
                </CardTitle>
                <CardDescription>
                  Distribuição por grau de insegurança alimentar nos territórios
                  de referência.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartInsegurancaAlimentar}
                  className="h-[320px] w-full"
                >
                  <BarChart
                    data={insegurancaAlimentarTerritorio}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="territorio"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatNumber(Number(value))}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="grave"
                      fill="var(--color-grave)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="moderada"
                      fill="var(--color-moderada)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="leve"
                      fill="var(--color-leve)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vigilancia" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Famílias em Vulnerabilidade"
              icon={AlertCircleIcon}
              value={formatNumber(vigilanciaResumo.familiasVulneraveis)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Identificadas via CadÚnico e busca ativa territorial
                </p>
              }
            />
            <KpiCard
              title="Taxa de Vulnerabilidade"
              icon={Target01Icon}
              value={`${vigilanciaResumo.taxaVulnerabilidade}%`}
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress
                    value={vigilanciaResumo.taxaVulnerabilidade}
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Proporção sobre total de famílias cadastradas
                  </p>
                </>
              }
            />
            <KpiCard
              title="Demanda Reprimida"
              icon={Clock01Icon}
              value={formatNumber(vigilanciaResumo.demandaReprimida)}
              borderColor="border-l-emerald-700"
              footer={
                <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                  <HugeiconsIcon
                    icon={ArrowUp01Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  Famílias aguardando inclusão em serviços
                </div>
              }
            />
            <KpiCard
              title="Situações de Risco"
              icon={Alert02Icon}
              value={formatNumber(vigilanciaResumo.situacoesRisco)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Ocorrências de violação de direitos no período
                </p>
              }
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={SecurityCheckIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Mapa de Vulnerabilidade por Território
                </CardTitle>
                <CardDescription>
                  Distribuição territorial de famílias em extrema pobreza,
                  pobreza e risco social.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartVulnerabilidade}
                  className="h-[320px] w-full"
                >
                  <BarChart
                    data={vulnerabilidadeTerritorial}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="territorio"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatNumber(Number(value))}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="extremaPobreza"
                      fill="var(--color-extremaPobreza)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="pobreza"
                      fill="var(--color-pobreza)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Target01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Índice de Vulnerabilidade Territorial
                </CardTitle>
                <CardDescription>
                  Indicador composto de risco social por região de abrangência
                  dos CRAS.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {vulnerabilidadeTerritorial.map((item) => (
                  <div key={item.territorio} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.territorio}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatNumber(item.risco)} situações de risco
                          identificadas
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.indice > 35
                            ? "destructive"
                            : item.indice > 25
                              ? "secondary"
                              : "default"
                        }
                      >
                        {item.indice}%
                      </Badge>
                    </div>
                    <Progress value={item.indice} className="mt-4 h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Demanda vs. Capacidade Instalada
                </CardTitle>
                <CardDescription>
                  Relação entre demanda identificada, capacidade de atendimento
                  e fila de espera por serviço.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Serviço</TableHead>
                      <TableHead className="text-right">Demanda</TableHead>
                      <TableHead className="text-right">Capacidade</TableHead>
                      <TableHead className="text-right">Fila</TableHead>
                      <TableHead className="text-right">Cobertura</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demandaCapacidade.map((item) => (
                      <TableRow key={item.servico}>
                        <TableCell className="font-medium">
                          {item.servico}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.demanda)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.capacidade)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.fila)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              item.cobertura >= 80 ? "default" : "secondary"
                            }
                          >
                            {item.cobertura}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={ChartLineData02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Evolução da Demanda
                </CardTitle>
                <CardDescription>
                  Fluxo mensal de novos casos, atendimentos e pendências
                  acumuladas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartEvolucaoDemanda}
                  className="h-[320px] w-full"
                >
                  <AreaChart
                    data={evolucaoDemanda}
                    margin={{ left: 0, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatNumber(Number(value))}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Area
                      type="monotone"
                      dataKey="pendentes"
                      stroke="var(--color-pendentes)"
                      fill="var(--color-pendentes)"
                      fillOpacity={0.12}
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="novos"
                      stroke="var(--color-novos)"
                      fill="var(--color-novos)"
                      fillOpacity={0.2}
                      strokeWidth={2.5}
                    />
                    <Area
                      type="monotone"
                      dataKey="atendidos"
                      stroke="var(--color-atendidos)"
                      fill="var(--color-atendidos)"
                      fillOpacity={0.18}
                      strokeWidth={2.5}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Alert02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Violações de Direitos Identificadas
              </CardTitle>
              <CardDescription>
                Tipologia das situações de risco e violação de direitos
                registradas pela rede socioassistencial.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo de Violação</TableHead>
                    <TableHead className="text-right">Casos</TableHead>
                    <TableHead>Tendência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {violacoesDireitos.map((item) => (
                    <TableRow key={item.tipo}>
                      <TableCell className="font-medium">{item.tipo}</TableCell>
                      <TableCell className="text-right">{item.casos}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {item.tendencia === "alta" && (
                            <>
                              <HugeiconsIcon
                                icon={ArrowUp01Icon}
                                strokeWidth={2}
                                className="size-4 text-red-500"
                              />
                              <span className="text-sm text-red-500">
                                Em alta
                              </span>
                            </>
                          )}
                          {item.tendencia === "queda" && (
                            <>
                              <HugeiconsIcon
                                icon={ArrowDown01Icon}
                                strokeWidth={2}
                                className="size-4 text-emerald-600"
                              />
                              <span className="text-sm text-emerald-600">
                                Em queda
                              </span>
                            </>
                          )}
                          {item.tendencia === "estavel" && (
                            <span className="text-sm text-muted-foreground">
                              Estável
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Censo SUAS — Compliance
              </CardTitle>
              <CardDescription>
                Preenchimento do Censo SUAS e Registros Mensais de Atendimento
                (RMA) por unidade.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {censoSuas.map((item) => (
                  <div key={item.item} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm text-muted-foreground">
                        {item.item}
                      </p>
                      <Badge
                        variant={
                          item.status === "Bom"
                            ? "default"
                            : item.status === "Regular"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-2xl font-semibold">{item.valor}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Target01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Busca Ativa Qualificada
              </CardTitle>
              <CardDescription>
                Ações de cruzamento de bases e localização de famílias para
                inserção em serviços e benefícios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ação</TableHead>
                    <TableHead className="text-right">Famílias</TableHead>
                    <TableHead className="text-right">Localizadas</TableHead>
                    <TableHead className="text-right">Inseridas</TableHead>
                    <TableHead className="text-right">Pendentes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buscaAtivaQualificada.map((item) => (
                    <TableRow key={item.acao}>
                      <TableCell className="font-medium">{item.acao}</TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.familias)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.localizadas)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.inseridas)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            item.pendentes > 100 ? "secondary" : "outline"
                          }
                        >
                          {formatNumber(item.pendentes)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protecao" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Famílias no CREAS"
              icon={UserMultipleIcon}
              value={formatNumber(
                protecaoEspecialResumo.familiasAcompanhadasCreas,
              )}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Acompanhamento PAEFI em toda a rede
                </p>
              }
            />
            <KpiCard
              title="Pessoas em Situação de Rua"
              icon={AlertCircleIcon}
              value={formatNumber(protecaoEspecialResumo.pessoasSituacaoRua)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Identificadas pela Abordagem Social e Centro POP
                </p>
              }
            />
            <KpiCard
              title="Adolescentes em MSE"
              icon={SecurityCheckIcon}
              value={formatNumber(protecaoEspecialResumo.adolescentesMse)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Medidas Socioeducativas em meio aberto
                </p>
              }
            />
            <KpiCard
              title="Benefícios Eventuais"
              icon={MoneyReceiveSquareIcon}
              value={formatNumber(
                protecaoEspecialResumo.beneficiosEventuaisConcedidos,
              )}
              borderColor="border-l-emerald-700"
              footer={
                <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                  <HugeiconsIcon
                    icon={ArrowUp01Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  Concedidos no período
                </div>
              }
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={SecurityCheckIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Unidades CREAS
                </CardTitle>
                <CardDescription>
                  Desempenho operacional das unidades de Proteção Social
                  Especial de Média Complexidade.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unidade</TableHead>
                      <TableHead className="text-right">Famílias</TableHead>
                      <TableHead className="text-right">PAEFI</TableHead>
                      <TableHead className="text-right">MSE</TableHead>
                      <TableHead className="text-right">Abordagem</TableHead>
                      <TableHead>Equipe</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {creas.map((item) => (
                      <TableRow key={item.unidade}>
                        <TableCell className="font-medium">
                          {item.unidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.familias)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.paefi)}
                        </TableCell>
                        <TableCell className="text-right">{item.mse}</TableCell>
                        <TableCell className="text-right">
                          {item.abordagem}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.equipeCompleta ? "default" : "secondary"
                            }
                          >
                            {item.equipeCompleta ? "Completa" : "Incompleta"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Centro POP
                </CardTitle>
                <CardDescription>
                  Indicadores da unidade de acolhimento e atendimento à
                  população em situação de rua.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">Ocupação</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {centroPop.ocupacao}/{centroPop.capacidade}
                    </p>
                    <Progress
                      value={(centroPop.ocupacao / centroPop.capacidade) * 100}
                      className="mt-2 h-2"
                    />
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Atendimentos/mês
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {formatNumber(centroPop.atendimentosMes)}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Encaminhamentos
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {centroPop.encaminhamentos}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Reinserção familiar
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {centroPop.reinsercaoFamiliar}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={BankIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Acolhimento Institucional
                </CardTitle>
                <CardDescription>
                  Unidades de acolhimento, ocupação, tempo médio de permanência
                  e reintegrações.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unidade</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Capacidade</TableHead>
                      <TableHead className="text-right">Acolhidos</TableHead>
                      <TableHead className="text-right">
                        Tempo Médio (meses)
                      </TableHead>
                      <TableHead className="text-right">
                        Reintegrações
                      </TableHead>
                      <TableHead className="text-right">
                        PIA Atualizado
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {acolhimentoInstitucional.map((item) => (
                      <TableRow key={item.unidade}>
                        <TableCell className="font-medium">
                          {item.unidade}
                        </TableCell>
                        <TableCell>{item.tipo}</TableCell>
                        <TableCell className="text-right">
                          {item.capacidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.acolhidos}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.tempoMedioPermanencia}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.reintegracoes}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.piaAtualizado}/{item.acolhidos}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={SecurityCheckIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Plano Individual de Atendimento (PIA)
                </CardTitle>
                <CardDescription>
                  Consolidação dos PIAs nas unidades de acolhimento
                  institucional.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Total de PIAs
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {piaResumo.totalPias}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">Atualizados</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {piaResumo.atualizados}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">Vencidos</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {piaResumo.vencidos}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      Atenção
                    </Badge>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Taxa de Atualização
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {piaResumo.taxaAtualizacao}%
                    </p>
                    <Progress
                      value={piaResumo.taxaAtualizacao}
                      className="mt-2 h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={SecurityCheckIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Medidas Socioeducativas em Meio Aberto
                </CardTitle>
                <CardDescription>
                  Acompanhamento das MSE sob responsabilidade municipal (ECA
                  Art. 112).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medida</TableHead>
                      <TableHead className="text-right">Adolescentes</TableHead>
                      <TableHead className="text-right">Cumprimento</TableHead>
                      <TableHead className="text-right">Evasão</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medidasSocioeducativas.map((item) => (
                      <TableRow key={item.medida}>
                        <TableCell className="font-medium">
                          {item.medida}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.adolescentes}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              item.cumprimento >= 80 ? "default" : "secondary"
                            }
                          >
                            {item.cumprimento}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.evasao}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={MoneyReceiveSquareIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Benefícios Eventuais Concedidos
                </CardTitle>
                <CardDescription>
                  Regulamentação municipal (Lei 8.742/93, Art. 22) — concessão,
                  valores médios e tempo de processamento.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Concedidos</TableHead>
                      <TableHead className="text-right">Valor Médio</TableHead>
                      <TableHead className="text-right">Tempo (dias)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {beneficiosEventuais.map((item) => (
                      <TableRow key={item.tipo}>
                        <TableCell className="font-medium">
                          {item.tipo}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.concedidos)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.valorMedio)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.tempoMedio}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Gestão de Equipes (NOB-RH/SUAS)
                </CardTitle>
                <CardDescription>
                  Conformidade das equipes de referência com a Norma Operacional
                  Básica de Recursos Humanos do SUAS.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unidade</TableHead>
                      <TableHead className="text-right">Técnicos</TableHead>
                      <TableHead className="text-right">Exigido</TableHead>
                      <TableHead>NOB-RH</TableHead>
                      <TableHead className="text-right">Capacitados</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipesRh.map((item) => (
                      <TableRow key={item.unidade}>
                        <TableCell className="font-medium">
                          {item.unidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.tecnicos}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.exigido}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={item.nobRh ? "default" : "destructive"}
                          >
                            {item.nobRh ? "Conforme" : "Irregular"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.capacitados}/{item.tecnicos}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Calendar01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Capacitação e Educação Permanente
                </CardTitle>
                <CardDescription>
                  Plano de formação continuada dos trabalhadores do SUAS no
                  exercício.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {capacitacao.map((item) => (
                  <div key={item.tema} className="rounded-2xl border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium">{item.tema}</p>
                      <Badge
                        variant={
                          item.status === "Concluído"
                            ? "default"
                            : item.status === "Em andamento"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>{item.participantes} participantes</span>
                      <span>{item.cargaHoraria}h</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={BankIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Conselho Municipal de Assistência Social (CMAS)
              </CardTitle>
              <CardDescription>
                Acompanhamento das atividades do controle social e deliberações
                do CMAS.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {conselhoCmas.map((item) => (
                  <div key={item.item} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm text-muted-foreground">
                        {item.item}
                      </p>
                      <Badge
                        variant={
                          item.status === "Bom"
                            ? "default"
                            : item.status === "Regular"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-2xl font-semibold">{item.valor}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patrimonio" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Bens Ativos da Rede"
              icon={Wallet01Icon}
              value={formatNumber(patrimonioResumo.bensAtivos)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Equipamentos, mobiliário, veículos e bens permanentes da
                  assistência social
                </p>
              }
            />
            <KpiCard
              title="Valor Patrimonial Atualizado"
              icon={BankIcon}
              value={fmtBRL(patrimonioResumo.valorAtualizado)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Base patrimonial das unidades e equipamentos vinculados
                </p>
              }
            />
            <KpiCard
              title="Termos Atualizados"
              icon={Target01Icon}
              value={`${patrimonioResumo.termosAtualizadosPct}%`}
              borderColor="border-l-emerald-700"
              footer={
                <Progress
                  value={patrimonioResumo.termosAtualizadosPct}
                  className="h-2"
                />
              }
            />
            <KpiCard
              title="Manutenção Preventiva"
              icon={ChartLineData02Icon}
              value={`${patrimonioResumo.manutencaoPreventivaPct}%`}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Cobertura dos itens críticos com revisão periódica
                </p>
              }
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={InformationCircleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Inventário por Unidade Socioassistencial
                </CardTitle>
                <CardDescription>
                  Conciliação patrimonial, criticidade e valor do acervo por
                  unidade.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unidade</TableHead>
                      <TableHead className="text-right">Bens</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="text-right">Inventário</TableHead>
                      <TableHead>Criticidade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unidadesPatrimoniais.map((item) => (
                      <TableRow key={item.unidade}>
                        <TableCell className="font-medium">
                          {item.unidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.bens)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.valor)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.inventario}%
                        </TableCell>
                        <TableCell>
                          <Badge variant={badgeVariant(item.criticidade)}>
                            {item.criticidade}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={ChartLineData02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Movimentações Patrimoniais
                </CardTitle>
                <CardDescription>
                  Incorporações, transferências, baixas e pendências de
                  regularização do exercício.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartMovimentacoesPatrimoniais}
                  className="h-[320px] w-full"
                >
                  <BarChart
                    data={movimentacoesPatrimoniais}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="tipo" tickLine={false} axisLine={false} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `R$ ${(Number(value) / 1000).toFixed(0)}k`
                      }
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
                      fill="var(--color-valor)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Controle de Manutenção de Ativos</CardTitle>
                <CardDescription>
                  Acompanhamento da manutenção preventiva e corretiva dos bens
                  utilizados na oferta de serviços.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {manutencaoPatrimonial.map((item) => (
                  <div key={item.categoria} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.categoria}</p>
                        <p className="text-sm text-muted-foreground">
                          Total: {item.total} itens | Corretivas abertas:{" "}
                          {item.corretivaAberta}
                        </p>
                      </div>
                      <Badge variant={badgeVariant(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    <Progress
                      value={(item.preventivaEmDia / item.total) * 100}
                      className="mt-4 h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Termos de Responsabilidade</CardTitle>
                <CardDescription>
                  Regularidade dos termos vinculados aos bens permanentes da
                  rede socioassistencial.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Setor</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Atualizados</TableHead>
                      <TableHead className="text-right">Vencendo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {termosResponsabilidade.map((item) => (
                      <TableRow key={item.setor}>
                        <TableCell className="font-medium">
                          {item.setor}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.total}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.atualizados}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.vencendo}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
