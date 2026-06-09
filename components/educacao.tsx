"use client";

import * as React from "react";
import { fmtBRL } from "@/lib/format";
import { useSnapshot } from "@/components/use-snapshot";
import { EDUCACAO_SNAPSHOT } from "@/lib/demo-educacao";
import {
  Alert02Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  BankIcon,
  BookOpen02Icon,
  Calendar01Icon,
  ChartLineData02Icon,
  FilterIcon,
  Flag01Icon,
  AlertCircleIcon,
  InformationCircleIcon,
  Invoice01Icon,
  MoneyReceiveSquareIcon,
  RefreshIcon,
  Target01Icon,
  UserMultipleIcon,
  Wallet01Icon,
  Search01Icon,
  Clock01Icon,
  Building01Icon,
  AnalyticsUpIcon,
  TaskDaily01Icon,
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
} from "recharts";

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
  ChartPieValueLegend,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { KpiCard } from "@/components/ui/kpi-card";
import { Progress } from "@/components/ui/progress";
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

// ── Componente Principal ───────────────────────────────────────────

export function Educacao() {
  const {
    greenPalette,
    educacaoResumo,
    despesasEducacao,
    chartConfigDespesas,
    receitasEducacao,
    fontesRecursos,
    contasBancarias,
    evolucaoOrcamentaria,
    chartConfigEvolucao,
    detalhamentoDespesa,
    chartReceitasOrigem,
    receitasPorOrigem,
    kpisEducacao,
    escolasPorModalidade,
    matriculasPorAno,
    chartMatriculas,
    profissionaisEducacao,
    transporteEscolar,
    alimentacaoEscolar,
    programasEducacionais,
    desempenhoEscolar,
    listaEsperaCreche,
    fluxoEscolar,
    frequenciaEscolar,
    buscaAtivaEscolar,
    motivosInfrequencia,
    metasPME,
    infraestruturaEscolar,
    formacaoContinuada,
    alertasEducacao,
  } = useSnapshot("educacao", EDUCACAO_SNAPSHOT);
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2024");
  const [modalidadeSelecionada, setModalidadeSelecionada] =
    React.useState("todas");

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Alunos Matriculados"
          icon={UserMultipleIcon}
          value={formatNumber(educacaoResumo.alunosMatriculados)}
          borderColor="border-l-emerald-700"
          footer={
            <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="size-4"
              />
              Crescimento de 3,2% em relação ao ano anterior
            </div>
          }
        />
        <KpiCard
          title="Unidades Escolares"
          icon={BookOpen02Icon}
          value={formatNumber(educacaoResumo.escolas)}
          borderColor="border-l-emerald-700"
          footer={
            <p className="text-sm text-muted-foreground">
              14 CMEIs, 20 EMEFs, 4 EJA e 4 especializadas
            </p>
          }
        />
        <KpiCard
          title="Profissionais da Educação"
          icon={UserMultipleIcon}
          value={formatNumber(educacaoResumo.profissionaisEducacao)}
          borderColor="border-l-emerald-700"
          footer={
            <p className="text-sm text-muted-foreground">
              920 professores, 48 coordenadores e 42 diretores
            </p>
          }
        />
        <KpiCard
          title="FUNDEB Recebido"
          icon={Wallet01Icon}
          value={fmtBRL(educacaoResumo.fundeRecebido)}
          borderColor="border-l-emerald-700"
          footer={
            <>
              <Progress
                value={
                  (educacaoResumo.fundeRecebido /
                    educacaoResumo.orcamentoTotal) *
                  100
                }
                className="h-2"
              />
              <p className="text-sm text-muted-foreground">
                71% do orçamento total da educação
              </p>
            </>
          }
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Painel Executivo da Educação
            </CardTitle>
            <CardDescription>
              Situação consolidada dos principais indicadores da educação
              pública municipal.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Orçamento Executado
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {(
                  (educacaoResumo.orcamentoEmpenhado /
                    educacaoResumo.orcamentoTotal) *
                  100
                ).toFixed(1)}
                %
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {formatCurrency(educacaoResumo.orcamentoEmpenhado)} de{" "}
                {formatCurrency(educacaoResumo.orcamentoTotal)}
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">Aplicação em MDE</p>
              <p className="mt-2 text-3xl font-semibold">27,4%</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Mínimo constitucional de 25% atendido
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                IDEB Médio Municipal
              </p>
              <p className="mt-2 text-3xl font-semibold">5,65</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Acima da média estadual de 5,3
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={InformationCircleIcon}
                strokeWidth={2}
                className="size-5"
              />
              Alertas de Gestão
            </CardTitle>
            <CardDescription>
              Pontos que merecem acompanhamento dos gestores da educação.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alertasEducacao.map((alerta) => (
              <Alert
                key={alerta.titulo}
                variant={alerta.tipo === "warning" ? "destructive" : "default"}
              >
                <AlertTitle className="flex flex-wrap items-center gap-2">
                  {alerta.titulo}
                  <Badge variant="outline">{alerta.badge}</Badge>
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
          <TabsTrigger value="censo">Censo e Matrículas</TabsTrigger>
          <TabsTrigger value="frequencia">Frequência e Busca Ativa</TabsTrigger>
          <TabsTrigger value="gestao">Gestão da Educação</TabsTrigger>
        </TabsList>

        {/* ── Tab: Orçamento e Finanças ── */}
        <TabsContent value="orcamento" className="mt-6 space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Wallet01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Composição das Despesas
                </CardTitle>
                <CardDescription>
                  Distribuição do orçamento da educação por categoria de
                  despesa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfigDespesas}
                  className="mx-auto aspect-auto h-[320px] w-full"
                >
                  <PieChart>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          nameKey="categoria"
                          formatter={(value) => formatCurrency(Number(value))}
                          hideLabel
                        />
                      }
                    />
                    <Pie
                      data={despesasEducacao}
                      dataKey="valor"
                      nameKey="categoria"
                      innerRadius={70}
                      outerRadius={110}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {despesasEducacao.map((item) => (
                        <Cell key={item.categoria} fill={item.fill} />
                      ))}
                    </Pie>
                    <ChartLegend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      content={
                        <ChartPieValueLegend
                          nameKey="categoria"
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
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Calendar01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Evolução Orçamentária
                </CardTitle>
                <CardDescription>
                  Acompanhamento mensal do orçamento: orçado, empenhado e pago.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfigEvolucao}>
                  <LineChart
                    data={evolucaoOrcamentaria}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `R$ ${(Number(value) / 1_000_000).toFixed(0)}M`
                      }
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatCurrency(Number(value))}
                        />
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="orcado"
                      stroke={greenPalette[5]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="empenhado"
                      stroke={greenPalette[3]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="pago"
                      stroke={greenPalette[1]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                  </LineChart>
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
                  da educação.
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
                    icon={MoneyReceiveSquareIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Receitas por Fonte
                </CardTitle>
                <CardDescription>
                  Origem dos recursos financeiros da secretaria de educação.
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
                    {receitasEducacao.map((item) => (
                      <TableRow key={item.fonte}>
                        <TableCell className="font-medium">
                          {item.fonte}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.valor)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.percentual.toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Invoice01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
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
                        <TableCell className="font-mono text-sm">
                          {item.codigo}
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.nome}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.empenhado)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.disponivel)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalhamento da Despesa por Bloco</CardTitle>
                <CardDescription>
                  Execução por grandes grupos da política de educação.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Grupo</TableHead>
                      <TableHead className="text-right">Autorizado</TableHead>
                      <TableHead className="text-right">Empenhado</TableHead>
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
                          {formatCurrency(item.pago)}
                        </TableCell>
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
                <HugeiconsIcon
                  icon={BankIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Contas Bancárias Vinculadas
              </CardTitle>
              <CardDescription>
                Contas bancárias da secretaria de educação por tipo de recurso.
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
                      <TableCell className="font-medium">
                        {item.banco}
                      </TableCell>
                      <TableCell>{item.agencia}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {item.conta}
                      </TableCell>
                      <TableCell>{item.tipo}</TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(item.saldo)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab: Censo e Matrículas ── */}
        <TabsContent value="censo" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Total de Matrículas 2024"
              icon={UserMultipleIcon}
              value={formatNumber(18_420)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  3.240 infantil, 11.600 fundamental, 1.840 EJA, 480 especial
                </p>
              }
            />
            <KpiCard
              title="Lista de Espera Creche"
              icon={Clock01Icon}
              value="264 crianças"
              borderColor="border-l-emerald-700"
              footer={
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <HugeiconsIcon
                    icon={Alert02Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  Deficit total de vagas (0-3 anos)
                </div>
              }
            />
            <KpiCard
              title="Taxa de Cobertura 4-5 anos"
              icon={AnalyticsUpIcon}
              value="96,4%"
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress value={96.4} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Meta: universalização (100%)
                  </p>
                </>
              }
            />
            <KpiCard
              title="Taxa de Cobertura 6-14 anos"
              icon={AnalyticsUpIcon}
              value="98,2%"
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress value={98.2} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Meta: universalização (100%)
                  </p>
                </>
              }
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Lista de Espera — Creche (Lei 12.796/2013)
              </CardTitle>
              <CardDescription>
                Demanda por vagas em creche por faixa etária. Deficit indica
                necessidade de expansão da rede.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Faixa Etária</TableHead>
                    <TableHead className="text-right">Inscritos</TableHead>
                    <TableHead className="text-right">
                      Vagas Disponíveis
                    </TableHead>
                    <TableHead className="text-right">Deficit</TableHead>
                    <TableHead className="text-right">
                      Tempo Médio de Espera
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listaEsperaCreche.map((item) => (
                    <TableRow key={item.faixaEtaria}>
                      <TableCell className="font-medium">
                        {item.faixaEtaria}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.inscritos)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.vagasDisponiveis)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.deficit > 0
                              ? "font-semibold text-amber-600"
                              : "text-emerald-600"
                          }
                        >
                          {item.deficit > 0 ? item.deficit : "—"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.tempoMedioEspera}
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
                  icon={TaskDaily01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Fluxo Escolar por Etapa
              </CardTitle>
              <CardDescription>
                Taxas de aprovação, reprovação e abandono por etapa do ensino
                fundamental e EJA.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Etapa</TableHead>
                    <TableHead className="text-right">Matrículas</TableHead>
                    <TableHead className="text-right">Aprovados</TableHead>
                    <TableHead className="text-right">Reprovados</TableHead>
                    <TableHead className="text-right">Abandonos</TableHead>
                    <TableHead className="text-right">% Aprovação</TableHead>
                    <TableHead className="text-right">% Abandono</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fluxoEscolar.map((item) => (
                    <TableRow key={item.etapa}>
                      <TableCell className="font-medium">
                        {item.etapa}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.matriculas)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.aprovados)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.reprovados)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.abandonos)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.aprovacao >= 95
                              ? "text-emerald-600 font-semibold"
                              : ""
                          }
                        >
                          {item.aprovacao.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.abandono >= 5
                              ? "font-semibold text-amber-600"
                              : ""
                          }
                        >
                          {item.abandono.toFixed(1)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={BookOpen02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Escolas por Modalidade
                </CardTitle>
                <CardDescription>
                  Unidades escolares, matrículas e taxa de ocupação por
                  modalidade de ensino.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Modalidade</TableHead>
                      <TableHead className="text-right">Unidades</TableHead>
                      <TableHead className="text-right">Alunos</TableHead>
                      <TableHead className="text-right">Ocupação</TableHead>
                      <TableHead className="text-right">
                        Profissionais
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {escolasPorModalidade.map((item) => (
                      <TableRow key={item.modalidade}>
                        <TableCell className="font-medium">
                          {item.modalidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.unidades}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.alunos)}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              item.ocupacao > 90
                                ? "font-semibold text-amber-600"
                                : ""
                            }
                          >
                            {item.ocupacao.toFixed(1)}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.profissionais}
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
                  Evolução de Matrículas
                </CardTitle>
                <CardDescription>
                  Acompanhamento histórico de matrículas por modalidade de
                  ensino.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartMatriculas}
                  className="h-[320px] w-full"
                >
                  <BarChart
                    data={matriculasPorAno}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="ano" tickLine={false} axisLine={false} />
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
                      dataKey="infantil"
                      fill="var(--color-infantil)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="fundamental"
                      fill="var(--color-fundamental)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="eja"
                      fill="var(--color-eja)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="especial"
                      fill="var(--color-especial)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Tab: Frequência e Busca Ativa ── */}
        <TabsContent value="frequencia" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Alunos Infrequentes"
              icon={Alert02Icon}
              value={formatNumber(262)}
              borderColor="border-l-emerald-700"
              footer={
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <HugeiconsIcon
                    icon={ArrowUp01Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  Soma de alunos com frequência abaixo de 75%
                </div>
              }
            />
            <KpiCard
              title="Alunos em Situação Crítica"
              icon={AlertCircleIcon}
              value={formatNumber(101)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Frequência abaixo de 50% ou mais de 15 faltas consecutivas
                </p>
              }
            />
            <KpiCard
              title="FICAI Emitidos"
              icon={Invoice01Icon}
              value={formatNumber(156)}
              borderColor="border-l-emerald-700"
              footer={
                <p className="text-sm text-muted-foreground">
                  Fichas de Comunicação de Aluno Infrequente
                </p>
              }
            />
            <KpiCard
              title="Taxa de Retorno (Busca Ativa)"
              icon={Search01Icon}
              value="69,7%"
              borderColor="border-l-emerald-700"
              footer={
                <>
                  <Progress value={69.7} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    198 de 284 alunos retornaram às aulas
                  </p>
                </>
              }
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Building01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Frequência por Escola
              </CardTitle>
              <CardDescription>
                Monitoramento da frequência escolar, alunos infrequentes e FICAI
                emitidos por unidade.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Escola</TableHead>
                    <TableHead className="text-right">Total Alunos</TableHead>
                    <TableHead className="text-right">Freq. Média</TableHead>
                    <TableHead className="text-right">Infrequentes</TableHead>
                    <TableHead className="text-right">Críticos</TableHead>
                    <TableHead className="text-right">FICAI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {frequenciaEscolar.map((item) => (
                    <TableRow key={item.escola}>
                      <TableCell className="font-medium">
                        {item.escola}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.totalAlunos)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.frequenciaMedia < 90
                              ? "font-semibold text-amber-600"
                              : "text-emerald-600"
                          }
                        >
                          {item.frequenciaMedia.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.infrequentes}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.criticos > 15
                              ? "font-semibold text-amber-600"
                              : ""
                          }
                        >
                          {item.criticos}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.ficaiEmitidos}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Busca Ativa Escolar
                </CardTitle>
                <CardDescription>
                  Programa de identificação e recuperação de alunos em situação
                  de infrequência e evasão.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Alunos Identificados
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                      {buscaAtivaEscolar.alunosIdentificados}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Visitas Realizadas
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                      {buscaAtivaEscolar.visitasRealizadas}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Alunos Retornaram
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-emerald-600">
                      {buscaAtivaEscolar.alunosRetornaram}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Em Acompanhamento
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                      {buscaAtivaEscolar.alunosEmAcompanhamento}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Encaminhados ao Conselho Tutelar
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-amber-600">
                      {buscaAtivaEscolar.encaminhamentosConselhoTutelar}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Taxa de Retorno
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-emerald-600">
                      {buscaAtivaEscolar.taxaRetorno}%
                    </p>
                  </div>
                </div>
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
                  Motivos de Infrequência
                </CardTitle>
                <CardDescription>
                  Principais causas identificadas para infrequência escolar no
                  município.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Motivo</TableHead>
                      <TableHead className="text-right">Quantidade</TableHead>
                      <TableHead className="text-right">%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {motivosInfrequencia.map((item) => (
                      <TableRow key={item.motivo}>
                        <TableCell className="font-medium">
                          {item.motivo}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.quantidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.percentual.toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              Alertas de Frequência
            </h3>
            <div className="grid gap-3 lg:grid-cols-3">
              <Alert variant="destructive">
                <HugeiconsIcon
                  icon={Alert02Icon}
                  strokeWidth={2}
                  className="size-4"
                />
                <AlertTitle>Faltas Consecutivas</AlertTitle>
                <AlertDescription>
                  42 alunos com mais de 15 faltas consecutivas
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <HugeiconsIcon
                  icon={Alert02Icon}
                  strokeWidth={2}
                  className="size-4"
                />
                <AlertTitle>Frequência Baixa</AlertTitle>
                <AlertDescription>
                  3 escolas com frequência média abaixo de 90%
                </AlertDescription>
              </Alert>
              <Alert>
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  strokeWidth={2}
                  className="size-4"
                />
                <AlertTitle>Busca Ativa</AlertTitle>
                <AlertDescription>
                  Programa de Busca Ativa recuperou 198 alunos no semestre
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </TabsContent>

        {/* ── Tab: Gestão da Educação ── */}
        <TabsContent value="gestao" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Flag01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Plano Municipal de Educação (PME) — Metas
              </CardTitle>
              <CardDescription>
                Acompanhamento das metas do PME com indicadores de execução e
                prazo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">Meta</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Indicador</TableHead>
                    <TableHead className="text-right">Meta</TableHead>
                    <TableHead className="text-right">Prazo</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="w-[120px]">Progresso</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metasPME.map((item) => (
                    <TableRow key={item.meta}>
                      <TableCell className="font-mono font-semibold">
                        {item.meta}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.descricao}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.indicador}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.metaValor}
                      </TableCell>
                      <TableCell className="text-right">{item.prazo}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            item.status === "atingido"
                              ? "default"
                              : item.status === "em andamento"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {item.status === "atingido"
                            ? "Atingido"
                            : item.status === "em andamento"
                              ? "Em andamento"
                              : "Atrasado"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Progress
                          value={Math.min(
                            (item.indicador / item.metaValor) * 100,
                            100,
                          )}
                          className="h-2"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Building01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Infraestrutura Escolar
                </CardTitle>
                <CardDescription>
                  Adequação das escolas municipais quanto a itens de
                  infraestrutura essencial.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Adequadas</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {infraestruturaEscolar.map((item) => (
                      <TableRow key={item.item}>
                        <TableCell className="font-medium">
                          {item.item}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.escolasAdequadas}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.totalEscolas}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              item.percentual < 50
                                ? "font-semibold text-amber-600"
                                : item.percentual >= 80
                                  ? "font-semibold text-emerald-600"
                                  : ""
                            }
                          >
                            {item.percentual.toFixed(1)}%
                          </span>
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
                    icon={BookOpen02Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Formação Continuada
                </CardTitle>
                <CardDescription>
                  Programas de capacitação e formação dos profissionais da
                  educação.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formacaoContinuada.map((item) => (
                    <div key={item.programa} className="rounded-2xl border p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="font-medium">{item.programa}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.profissionais} profissionais •{" "}
                            {item.cargaHoraria}h • {item.modalidade}
                          </p>
                        </div>
                        <Badge
                          variant={
                            item.execucao >= 90
                              ? "default"
                              : item.execucao >= 75
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {item.execucao.toFixed(1)}% execução
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Execução do programa</span>
                          <span>{item.execucao.toFixed(1)}%</span>
                        </div>
                        <Progress value={item.execucao} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kpisEducacao.map((kpi) => (
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
                      <span className="text-muted-foreground">
                        Meta: {kpi.meta}
                        {kpi.unidade}
                      </span>
                      <Badge
                        variant={
                          kpi.status === "atingido" ? "default" : "secondary"
                        }
                      >
                        {kpi.status === "atingido" ? "Atingido" : "Atenção"}
                      </Badge>
                    </div>
                    <Progress
                      value={
                        kpi.indicador === "Taxa de Evasão" ||
                        kpi.indicador === "Distorção Idade-Série"
                          ? Math.min((kpi.meta / kpi.valor) * 100, 100)
                          : (kpi.valor / kpi.meta) * 100
                      }
                      className="h-2"
                    />
                  </div>
                }
              />
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Target01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Desempenho por Escola
              </CardTitle>
              <CardDescription>
                Ranking das escolas municipais com indicadores de qualidade e
                fluxo escolar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Escola</TableHead>
                    <TableHead className="text-right">IDEB</TableHead>
                    <TableHead className="text-right">Aprovação</TableHead>
                    <TableHead className="text-right">Evasão</TableHead>
                    <TableHead className="text-right">Distorção I-S</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {desempenhoEscolar.map((item) => (
                    <TableRow key={item.escola}>
                      <TableCell className="font-medium">
                        {item.escola}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.ideb >= 6.0
                              ? "font-semibold text-emerald-600"
                              : item.ideb < 5.0
                                ? "font-semibold text-amber-600"
                                : ""
                          }
                        >
                          {item.ideb.toFixed(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.aprovacao.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.evasao > 2.0
                              ? "font-semibold text-amber-600"
                              : ""
                          }
                        >
                          {item.evasao.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.distorcao > 10
                              ? "font-semibold text-amber-600"
                              : ""
                          }
                        >
                          {item.distorcao.toFixed(1)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Profissionais da Educação
                </CardTitle>
                <CardDescription>
                  Quadro de profissionais por categoria, formação e remuneração
                  média.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Categoria</TableHead>
                      <TableHead className="text-right">Qtd</TableHead>
                      <TableHead className="text-right">
                        Formação Sup.
                      </TableHead>
                      <TableHead className="text-right">
                        Média Salarial
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profissionaisEducacao.map((item) => (
                      <TableRow key={item.categoria}>
                        <TableCell className="font-medium">
                          {item.categoria}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.quantidade}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.formacaoSuperior.toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.mediaSalarial)}
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
                    icon={Target01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Programas Educacionais
                </CardTitle>
                <CardDescription>
                  Execução dos programas federais e estaduais vinculados à
                  educação.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programasEducacionais.map((item) => (
                    <div key={item.programa} className="rounded-2xl border p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="font-medium">{item.programa}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.escolas} escolas • Investimento:{" "}
                            {formatCurrency(item.valor)}
                          </p>
                        </div>
                        <Badge
                          variant={
                            item.execucao >= 90
                              ? "default"
                              : item.execucao >= 75
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {item.execucao.toFixed(1)}% execução
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Execução financeira</span>
                          <span>{item.execucao.toFixed(1)}%</span>
                        </div>
                        <Progress value={item.execucao} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Transporte Escolar</CardTitle>
                <CardDescription>
                  Monitoramento das rotas de transporte escolar municipal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rota</TableHead>
                      <TableHead className="text-right">Veículos</TableHead>
                      <TableHead className="text-right">Alunos</TableHead>
                      <TableHead className="text-right">Km/Dia</TableHead>
                      <TableHead className="text-right">Custo/Mês</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transporteEscolar.map((item) => (
                      <TableRow key={item.rota}>
                        <TableCell className="font-medium">
                          {item.rota}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.veiculos}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.alunos)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.kmDia}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.custo)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alimentação Escolar</CardTitle>
                <CardDescription>
                  Controle do Programa Nacional de Alimentação Escolar (PNAE).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Programa</TableHead>
                      <TableHead className="text-right">
                        Refeições/Dia
                      </TableHead>
                      <TableHead className="text-right">Custo/Aluno</TableHead>
                      <TableHead className="text-right">Cobertura</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alimentacaoEscolar.map((item) => (
                      <TableRow key={item.programa}>
                        <TableCell className="font-medium">
                          {item.programa}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.refeicoesDia > 0
                            ? formatNumber(item.refeicoesDia)
                            : "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.custoAluno > 0
                            ? `R$ ${item.custoAluno.toFixed(2)}`
                            : "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              item.cobertura < 50
                                ? "font-semibold text-amber-600"
                                : ""
                            }
                          >
                            {item.cobertura.toFixed(1)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Tab: Análises ── */}
      </Tabs>
    </div>
  );
}
