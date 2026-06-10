"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
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
  Line,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp01Icon,
  ArrowDown01Icon,
  Wallet01Icon,
  MoneyReceiveSquareIcon,
  Invoice01Icon,
  Calendar01Icon,
  Building06Icon,
  AlertCircleIcon,
  InformationCircleIcon,
  Target01Icon,
  ChartLineData02Icon,
  PieChart02Icon,
  Clock01Icon,
  StarIcon,
  Alert02Icon,
  MoneyAdd01Icon,
  MoneySend01Icon,
  BankIcon,
  Building04Icon,
  Home01Icon,
  Store04Icon,
  Invoice02Icon,
  Search01Icon,
  Cancel01Icon,
  FileValidationIcon,
  CourtLawIcon,
  FileAttachmentIcon,
  DocumentValidationIcon,
  Analytics01Icon,
} from "@hugeicons/core-free-icons";
import { KpiCard } from "@/components/ui/kpi-card";
import { useSnapshot } from "@/components/use-snapshot";
import { TRIBUTACAO_SNAPSHOT } from "@/lib/demo-tributacao";

// ==========================================
// FORMATADORES
// ==========================================

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

const formatMillions = (value: number) => {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)}K`;
  }
  return formatCurrency(value);
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("pt-BR").format(value);
};

// ==========================================
// DADOS - TRIBUTOS MUNICIPAIS
// ==========================================

// Chart Configs
const chartConfigComparativoMensal = {
  atual: { label: "2024", color: "var(--chart-1)" },
  anterior: { label: "2023", color: "var(--chart-2)" },
} satisfies ChartConfig;

const chartConfigTributos = {
  atual: { label: "2024", color: "var(--chart-1)" },
  anterior: { label: "2023", color: "var(--chart-3)" },
} satisfies ChartConfig;

const chartConfigEvolucao = {
  iptu: { label: "IPTU", color: "var(--chart-1)" },
  iss: { label: "ISS", color: "var(--chart-2)" },
  itbi: { label: "ITBI", color: "var(--chart-3)" },
  taxas: { label: "Taxas", color: "var(--chart-4)" },
} satisfies ChartConfig;

// Chart config para novos gráficos
const chartConfigNFSe = {
  notas: { label: "Notas Emitidas", color: "var(--chart-1)" },
  iss: { label: "ISS Gerado", color: "var(--chart-2)" },
} satisfies ChartConfig;

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export function TributacaoMunicipal() {
  const {
    dadosIPTU,
    dadosISS,
    dadosITBI,
    dadosTaxas,
    dividaAtiva,
    cadastroImobiliario,
    cadastroEconomico,
    evolucaoMensalTributos,
    comparativoAnual,
    fiscalizacao,
    certidoes,
    renunciaFiscal,
    maioresContribuintes,
    comparativoMensal2024vs2023,
    comparativoTributo2024vs2023,
    maioresDevedores,
    metasArrecadacao,
    dadosNFSe,
    transferenciasConstitucionais,
    processosAdmFiscais,
  } = useSnapshot("tributacao", TRIBUTACAO_SNAPSHOT);
  const [periodoSelecionado] = React.useState("2024");

  // Totais calculados
  const totalLancado =
    dadosIPTU.lancado +
    dadosISS.lancado +
    dadosITBI.lancado +
    Object.values(dadosTaxas).reduce((acc, t) => acc + t.lancado, 0);
  const totalArrecadado =
    dadosIPTU.arrecadado +
    dadosISS.arrecadado +
    dadosITBI.arrecadado +
    Object.values(dadosTaxas).reduce((acc, t) => acc + t.arrecadado, 0);
  const totalTaxasLancado = Object.values(dadosTaxas).reduce(
    (acc, t) => acc + t.lancado,
    0,
  );
  const totalTaxasArrecadado = Object.values(dadosTaxas).reduce(
    (acc, t) => acc + t.arrecadado,
    0,
  );
  const percentualGeral = Math.round((totalArrecadado / totalLancado) * 100);

  // Comparativo com ano anterior
  const arrecadacao2023 = comparativoAnual[1].total;
  const variacaoAnual = (
    ((totalArrecadado - arrecadacao2023) / arrecadacao2023) *
    100
  ).toFixed(1);
  const variacaoPositiva = Number(variacaoAnual) > 0;

  return (
    <div className="space-y-8">
      {/* KPIs Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={MoneyReceiveSquareIcon}
          title="Receita Tributária Total"
          value={formatMillions(totalArrecadado)}
          borderColor="border-l-blue-500"
          footer={
            <>
              <div className="flex items-center gap-1 text-xs">
                <HugeiconsIcon
                  icon={variacaoPositiva ? ArrowUp01Icon : ArrowDown01Icon}
                  strokeWidth={2}
                  className={`size-3 ${variacaoPositiva ? "text-green-600" : "text-red-600"}`}
                />
                <span
                  className={
                    variacaoPositiva ? "text-green-600" : "text-red-600"
                  }
                >
                  {variacaoAnual}%
                </span>
                <span className="text-muted-foreground">vs. ano anterior</span>
              </div>
              <Progress value={percentualGeral} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {percentualGeral}% da meta lançada (
                {formatMillions(totalLancado)})
              </p>
            </>
          }
        />

        <KpiCard
          icon={Home01Icon}
          title="IPTU"
          value={formatMillions(dadosIPTU.arrecadado)}
          borderColor="border-l-green-500"
          footer={
            <>
              <Progress
                value={(dadosIPTU.arrecadado / dadosIPTU.lancado) * 100}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {((dadosIPTU.arrecadado / dadosIPTU.lancado) * 100).toFixed(1)}%
                do lançado — Inadimplência:{" "}
                {((dadosIPTU.inadimplente / dadosIPTU.lancado) * 100).toFixed(
                  1,
                )}
                %
              </p>
            </>
          }
        />

        <KpiCard
          icon={Store04Icon}
          title="ISS"
          value={formatMillions(dadosISS.arrecadado)}
          borderColor="border-l-amber-500"
          footer={
            <>
              <Progress
                value={(dadosISS.arrecadado / dadosISS.lancado) * 100}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {((dadosISS.arrecadado / dadosISS.lancado) * 100).toFixed(1)}%
                do lançado — {formatNumber(dadosISS.notasFiscaisEmitidas)} NFS-e
                emitidas
              </p>
            </>
          }
        />

        <KpiCard
          icon={Invoice01Icon}
          title="Dívida Ativa (Estoque)"
          value={formatMillions(dividaAtiva.estoqueTotal)}
          borderColor="border-l-red-500"
          footer={
            <>
              <div className="flex items-center gap-1 text-xs">
                <HugeiconsIcon
                  icon={ArrowUp01Icon}
                  strokeWidth={2}
                  className="size-3 text-green-600"
                />
                <span className="text-green-600">
                  {formatMillions(dividaAtiva.recuperadoAno)}
                </span>
                <span className="text-muted-foreground">
                  recuperados no exercício
                </span>
              </div>
              <Progress
                value={
                  (dividaAtiva.recuperadoAno / dividaAtiva.estoqueTotal) * 100
                }
                className="h-2 mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {(
                  (dividaAtiva.recuperadoAno / dividaAtiva.estoqueTotal) *
                  100
                ).toFixed(1)}
                % de recuperação — Risco prescrição:{" "}
                {formatMillions(dividaAtiva.prescricaoRisco)}
              </p>
            </>
          }
        />
      </div>

      {/* KPIs Secundários */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          icon={Building04Icon}
          title="ITBI"
          value={formatMillions(dadosITBI.arrecadado)}
          borderColor="border-l-cyan-500"
          footer={
            <p className="text-xs text-muted-foreground">
              {formatNumber(dadosITBI.transacoesConcluidas)} transações —
              Alíquota: {dadosITBI.aliquota}%
            </p>
          }
        />

        <KpiCard
          icon={Wallet01Icon}
          title="Taxas e Contribuições"
          value={formatMillions(totalTaxasArrecadado)}
          borderColor="border-l-violet-500"
          footer={
            <p className="text-xs text-muted-foreground">
              {((totalTaxasArrecadado / totalTaxasLancado) * 100).toFixed(1)}%
              do lançado
            </p>
          }
        />

        <KpiCard
          icon={Search01Icon}
          title="Fiscalização"
          value={formatNumber(fiscalizacao.autosInfracao)}
          borderColor="border-l-orange-500"
          footer={
            <p className="text-xs text-muted-foreground">
              Autos de infração — {formatMillions(fiscalizacao.valorRecuperado)}{" "}
              recuperados
            </p>
          }
        />

        <KpiCard
          icon={FileValidationIcon}
          title="Certidões Emitidas"
          value={formatNumber(
            certidoes.negativas +
              certidoes.positivas +
              certidoes.positivasEfeitoNegativa,
          )}
          borderColor="border-l-teal-500"
          footer={
            <p className="text-xs text-muted-foreground">
              {certidoes.percentualDigital}% via canais digitais
            </p>
          }
        />

        <KpiCard
          icon={MoneySend01Icon}
          title="Renúncia Fiscal"
          value={formatMillions(renunciaFiscal.total)}
          borderColor="border-l-purple-500"
          footer={
            <p className="text-xs text-muted-foreground">
              {formatNumber(renunciaFiscal.beneficiariosIPTU)} beneficiários
              IPTU + {formatNumber(renunciaFiscal.empresasIncentivadas)}{" "}
              empresas incentivadas
            </p>
          }
        />
      </div>

      {/* Abas de Conteúdo */}
      <Tabs defaultValue="arrecadacao" className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="arrecadacao">Arrecadação</TabsTrigger>
          <TabsTrigger value="cadastro">Cadastros</TabsTrigger>
          <TabsTrigger value="divida-ativa">Dívida Ativa</TabsTrigger>
          <TabsTrigger value="fiscalizacao">Fiscalização</TabsTrigger>
          <TabsTrigger value="contribuintes">Contribuintes</TabsTrigger>
          <TabsTrigger value="nfse">NFS-e</TabsTrigger>
          <TabsTrigger value="transferencias">Transferências</TabsTrigger>
          <TabsTrigger value="paf">Contencioso</TabsTrigger>
          <TabsTrigger value="metas">Metas</TabsTrigger>
        </TabsList>

        {/* Tab: Arrecadação */}
        <TabsContent value="arrecadacao" className="space-y-4">
          {/* IPTU Detalhado */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Home01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                IPTU — Detalhamento
              </CardTitle>
              <CardDescription>
                Imposto Predial e Territorial Urbano — Exercício{" "}
                {periodoSelecionado}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Valor Lançado
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(dadosIPTU.lancado)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Arrecadado (Cota Única + Parcelas)
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(dadosIPTU.arrecadado)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Descontos Concedidos
                  </p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(dadosIPTU.desconto)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Inadimplente
                  </p>
                  <p className="text-xl font-bold text-red-600">
                    {formatCurrency(dadosIPTU.inadimplente)}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border p-4 space-y-2">
                  <p className="text-sm font-medium">Imóveis Cadastrados</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(dadosIPTU.imoveisTotal)}
                  </p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>
                      Tributados: {formatNumber(dadosIPTU.imoveisTributados)}
                    </span>
                    <span>
                      Isentos: {formatNumber(dadosIPTU.imoveisIsentos)}
                    </span>
                  </div>
                </div>
                <div className="rounded-lg border p-4 space-y-2">
                  <p className="text-sm font-medium">Parcelas</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(dadosIPTU.parcelasPagas)}
                    <span className="text-base font-normal text-muted-foreground">
                      /{formatNumber(dadosIPTU.parcelasEmitidas)}
                    </span>
                  </p>
                  <Progress
                    value={
                      (dadosIPTU.parcelasPagas / dadosIPTU.parcelasEmitidas) *
                      100
                    }
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    {(
                      (dadosIPTU.parcelasPagas / dadosIPTU.parcelasEmitidas) *
                      100
                    ).toFixed(1)}
                    % das parcelas pagas
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-2">
                  <p className="text-sm font-medium">Alíquotas</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Residencial:
                      </span>
                      <span className="font-medium">
                        {dadosIPTU.aliquotaResidencial}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Comercial:</span>
                      <span className="font-medium">
                        {dadosIPTU.aliquotaComercial}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Territorial:
                      </span>
                      <span className="font-medium">
                        {dadosIPTU.aliquotaTerritorial}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ISS Detalhado */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Store04Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                ISS — Detalhamento
              </CardTitle>
              <CardDescription>
                Imposto Sobre Serviços — Exercício {periodoSelecionado}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Arrecadado Total
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(dadosISS.arrecadado)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Retido na Fonte
                  </p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(dadosISS.retidoFonte)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Declarado (DES)
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(dadosISS.declarado)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Fiscalizado/Autuado
                  </p>
                  <p className="text-xl font-bold text-amber-600">
                    {formatCurrency(dadosISS.fiscalizado)}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Setor Econômico</TableHead>
                    <TableHead className="text-center">Empresas</TableHead>
                    <TableHead className="text-right">Arrecadação</TableHead>
                    <TableHead className="text-right">% do Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cadastroEconomico.map((setor) => (
                    <TableRow key={setor.setor}>
                      <TableCell className="font-medium">
                        {setor.setor}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(setor.empresas)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(setor.arrecadacao)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">{setor.percentual}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-center font-bold">
                      {formatNumber(
                        cadastroEconomico.reduce(
                          (acc, s) => acc + s.empresas,
                          0,
                        ),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(
                        cadastroEconomico.reduce(
                          (acc, s) => acc + s.arrecadacao,
                          0,
                        ),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">100%</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          {/* Taxas e Contribuições */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Wallet01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Taxas e Contribuições
              </CardTitle>
              <CardDescription>
                Detalhamento por tipo de taxa — Exercício {periodoSelecionado}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Taxa / Contribuição</TableHead>
                    <TableHead className="text-right">Lançado</TableHead>
                    <TableHead className="text-right">Arrecadado</TableHead>
                    <TableHead className="text-right">% Realizado</TableHead>
                    <TableHead className="text-center">Situação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { nome: "Taxa de Coleta de Lixo", ...dadosTaxas.taxaLixo },
                    { nome: "Taxa de Alvará", ...dadosTaxas.taxaAlvara },
                    {
                      nome: "Taxa de Vigilância Sanitária",
                      ...dadosTaxas.taxaVigilancia,
                    },
                    {
                      nome: "Taxa de Publicidade",
                      ...dadosTaxas.taxaPublicidade,
                    },
                    { nome: "COSIP", ...dadosTaxas.cosip },
                    {
                      nome: "Contribuição de Melhoria",
                      ...dadosTaxas.contribMelhoria,
                    },
                  ].map((taxa) => {
                    const pct = (taxa.arrecadado / taxa.lancado) * 100;
                    return (
                      <TableRow key={taxa.nome}>
                        <TableCell className="font-medium">
                          {taxa.nome}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(taxa.lancado)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(taxa.arrecadado)}
                        </TableCell>
                        <TableCell className="text-right">
                          {pct.toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-center">
                          {pct >= 85 ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                              Adequado
                            </Badge>
                          ) : pct >= 70 ? (
                            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                              Atenção
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
                              Crítico
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totalTaxasLancado)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totalTaxasArrecadado)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {(
                        (totalTaxasArrecadado / totalTaxasLancado) *
                        100
                      ).toFixed(1)}
                      %
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          {/* Gráfico: Evolução Mensal por Tributo (Stacked Area) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={ChartLineData02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Evolução Mensal da Arrecadação por Tributo
              </CardTitle>
              <CardDescription>
                Composição mensal da arrecadação tributária — Exercício{" "}
                {periodoSelecionado}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfigEvolucao}
                className="h-[350px] w-full"
              >
                <AreaChart data={evolucaoMensalTributos} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickFormatter={(v: number) =>
                      `${(v / 1000000).toFixed(1)}M`
                    }
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        indicator="line"
                        formatter={(value) => formatCurrency(value as number)}
                      />
                    }
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area
                    type="monotone"
                    dataKey="iptu"
                    stackId="1"
                    fill="var(--color-iptu)"
                    stroke="var(--color-iptu)"
                    fillOpacity={0.4}
                  />
                  <Area
                    type="monotone"
                    dataKey="iss"
                    stackId="1"
                    fill="var(--color-iss)"
                    stroke="var(--color-iss)"
                    fillOpacity={0.4}
                  />
                  <Area
                    type="monotone"
                    dataKey="itbi"
                    stackId="1"
                    fill="var(--color-itbi)"
                    stroke="var(--color-itbi)"
                    fillOpacity={0.4}
                  />
                  <Area
                    type="monotone"
                    dataKey="taxas"
                    stackId="1"
                    fill="var(--color-taxas)"
                    stroke="var(--color-taxas)"
                    fillOpacity={0.4}
                  />
                </AreaChart>
              </ChartContainer>

              <Separator className="my-6" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mês</TableHead>
                    <TableHead className="text-right">IPTU</TableHead>
                    <TableHead className="text-right">ISS</TableHead>
                    <TableHead className="text-right">ITBI</TableHead>
                    <TableHead className="text-right">Taxas</TableHead>
                    <TableHead className="text-right font-bold">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evolucaoMensalTributos.map((m) => (
                    <TableRow key={m.mes}>
                      <TableCell className="font-medium">{m.mes}</TableCell>
                      <TableCell className="text-right">
                        {formatMillions(m.iptu)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatMillions(m.iss)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatMillions(m.itbi)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatMillions(m.taxas)}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {formatMillions(m.iptu + m.iss + m.itbi + m.taxas)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      {formatMillions(
                        evolucaoMensalTributos.reduce((a, m) => a + m.iptu, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatMillions(
                        evolucaoMensalTributos.reduce((a, m) => a + m.iss, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatMillions(
                        evolucaoMensalTributos.reduce((a, m) => a + m.itbi, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatMillions(
                        evolucaoMensalTributos.reduce((a, m) => a + m.taxas, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatMillions(
                        evolucaoMensalTributos.reduce(
                          (a, m) => a + m.iptu + m.iss + m.itbi + m.taxas,
                          0,
                        ),
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          {/* Gráfico: Comparativo Mensal 2024 vs 2023 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={PieChart02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Comparativo Mensal — 2024 vs 2023
              </CardTitle>
              <CardDescription>
                Arrecadação total mensal comparada entre o exercício atual e o
                anterior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfigComparativoMensal}
                className="h-[350px] w-full"
              >
                <BarChart data={comparativoMensal2024vs2023} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickFormatter={(v: number) =>
                      `${(v / 1000000).toFixed(1)}M`
                    }
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCurrency(value as number)}
                      />
                    }
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="anterior"
                    fill="var(--color-anterior)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="atual"
                    fill="var(--color-atual)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total 2024 (até Nov)
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(
                      comparativoMensal2024vs2023.reduce(
                        (a, m) => a + m.atual,
                        0,
                      ),
                    )}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total 2023 (até Nov)
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(
                      comparativoMensal2024vs2023.reduce(
                        (a, m) => a + m.anterior,
                        0,
                      ),
                    )}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Variação Acumulada
                  </p>
                  {(() => {
                    const total2024 = comparativoMensal2024vs2023.reduce(
                      (a, m) => a + m.atual,
                      0,
                    );
                    const total2023 = comparativoMensal2024vs2023.reduce(
                      (a, m) => a + m.anterior,
                      0,
                    );
                    const variacao = (
                      ((total2024 - total2023) / total2023) *
                      100
                    ).toFixed(1);
                    return (
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-xl font-bold ${Number(variacao) > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {Number(variacao) > 0 ? "+" : ""}
                          {variacao}%
                        </p>
                        <HugeiconsIcon
                          icon={
                            Number(variacao) > 0
                              ? ArrowUp01Icon
                              : ArrowDown01Icon
                          }
                          strokeWidth={2}
                          className={`size-4 ${Number(variacao) > 0 ? "text-green-600" : "text-red-600"}`}
                        />
                      </div>
                    );
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico: Comparativo por Tributo 2024 vs 2023 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Target01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Comparativo por Tributo — 2024 vs 2023
              </CardTitle>
              <CardDescription>
                Comparação da arrecadação acumulada por tipo de tributo entre
                exercícios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfigTributos}
                className="h-[300px] w-full"
              >
                <BarChart
                  data={comparativoTributo2024vs2023}
                  layout="vertical"
                  accessibilityLayer
                >
                  <CartesianGrid horizontal={false} />
                  <XAxis
                    type="number"
                    tickFormatter={(v: number) =>
                      `${(v / 1000000).toFixed(0)}M`
                    }
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="tributo"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={60}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCurrency(value as number)}
                      />
                    }
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="anterior"
                    fill="var(--color-anterior)"
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  />
                  <Bar
                    dataKey="atual"
                    fill="var(--color-atual)"
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ChartContainer>

              <Separator className="my-4" />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {comparativoTributo2024vs2023.map((item) => {
                  const variacao = (
                    ((item.atual - item.anterior) / item.anterior) *
                    100
                  ).toFixed(1);
                  const positivo = Number(variacao) > 0;
                  return (
                    <div
                      key={item.tributo}
                      className="rounded-lg border p-4 space-y-2"
                    >
                      <p className="text-sm font-medium">{item.tributo}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">2024</p>
                          <p className="text-lg font-bold">
                            {formatMillions(item.atual)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">2023</p>
                          <p className="text-lg font-medium text-muted-foreground">
                            {formatMillions(item.anterior)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <HugeiconsIcon
                          icon={positivo ? ArrowUp01Icon : ArrowDown01Icon}
                          strokeWidth={2}
                          className={`size-3 ${positivo ? "text-green-600" : "text-red-600"}`}
                        />
                        <span
                          className={`text-sm font-bold ${positivo ? "text-green-600" : "text-red-600"}`}
                        >
                          {positivo ? "+" : ""}
                          {variacao}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Comparativo Anual (tabela) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Calendar01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Comparativo Anual — 3 Exercícios
              </CardTitle>
              <CardDescription>
                Evolução da arrecadação tributária nos últimos 3 exercícios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exercício</TableHead>
                    <TableHead className="text-right">IPTU</TableHead>
                    <TableHead className="text-right">ISS</TableHead>
                    <TableHead className="text-right">ITBI</TableHead>
                    <TableHead className="text-right">Taxas/Contrib.</TableHead>
                    <TableHead className="text-right font-bold">
                      Total
                    </TableHead>
                    <TableHead className="text-center">Variação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparativoAnual.map((ano, i) => {
                    const varAnual =
                      i > 0
                        ? (
                            ((ano.total - comparativoAnual[i - 1].total) /
                              comparativoAnual[i - 1].total) *
                            100
                          ).toFixed(1)
                        : null;
                    return (
                      <TableRow key={ano.ano}>
                        <TableCell className="font-bold">{ano.ano}</TableCell>
                        <TableCell className="text-right">
                          {formatMillions(ano.iptu)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatMillions(ano.iss)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatMillions(ano.itbi)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatMillions(ano.taxas)}
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {formatMillions(ano.total)}
                        </TableCell>
                        <TableCell className="text-center">
                          {varAnual ? (
                            <Badge
                              className={
                                Number(varAnual) > 0
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              }
                            >
                              {Number(varAnual) > 0 ? "+" : ""}
                              {varAnual}%
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Cadastros */}
        <TabsContent value="cadastro" className="space-y-4">
          {/* Cadastro Imobiliário */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Building06Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Cadastro Imobiliário Municipal
              </CardTitle>
              <CardDescription>
                Distribuição dos imóveis por tipologia e valor venal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-center">Quantidade</TableHead>
                    <TableHead className="text-right">% do Total</TableHead>
                    <TableHead className="text-right">
                      Valor Venal Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cadastroImobiliario.map((item) => (
                    <TableRow key={item.tipo}>
                      <TableCell className="font-medium">{item.tipo}</TableCell>
                      <TableCell className="text-center">
                        {formatNumber(item.quantidade)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.percentual}%
                      </TableCell>
                      <TableCell className="text-right">
                        {formatMillions(item.valorVenal)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-center font-bold">
                      {formatNumber(
                        cadastroImobiliario.reduce(
                          (a, i) => a + i.quantidade,
                          0,
                        ),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">100%</TableCell>
                    <TableCell className="text-right font-bold">
                      {formatMillions(
                        cadastroImobiliario.reduce(
                          (a, i) => a + i.valorVenal,
                          0,
                        ),
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          {/* Cadastro Econômico */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Store04Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Cadastro Econômico (Mobiliário)
              </CardTitle>
              <CardDescription>
                Cadastro de prestadores de serviço e contribuintes do ISS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Empresas Cadastradas
                  </p>
                  <p className="text-2xl font-bold">
                    {formatNumber(dadosISS.empresasCadastradas)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Empresas Ativas
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatNumber(dadosISS.empresasAtivas)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(
                      (dadosISS.empresasAtivas / dadosISS.empresasCadastradas) *
                      100
                    ).toFixed(1)}
                    % do cadastro
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    MEI Cadastrados
                  </p>
                  <p className="text-2xl font-bold">
                    {formatNumber(dadosISS.meiCadastrados)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    NFS-e Emitidas
                  </p>
                  <p className="text-2xl font-bold">
                    {formatNumber(dadosISS.notasFiscaisEmitidas)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certidões e Atendimento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={FileValidationIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Certidões e Atendimento ao Contribuinte
              </CardTitle>
              <CardDescription>
                Indicadores de emissão de certidões e canais de atendimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Certidões Negativas
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatNumber(certidoes.negativas)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Certidões Positivas
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatNumber(certidoes.positivas)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Positiva c/ Efeito Negativa
                  </p>
                  <p className="text-2xl font-bold text-amber-600">
                    {formatNumber(certidoes.positivasEfeitoNegativa)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Tempo Médio Emissão
                  </p>
                  <p className="text-2xl font-bold">
                    {certidoes.tempoMedioEmissao}h
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border p-4 space-y-2">
                  <p className="text-sm font-medium">
                    Atendimentos Presenciais
                  </p>
                  <p className="text-2xl font-bold">
                    {formatNumber(certidoes.atendimentosPresenciais)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-2">
                  <p className="text-sm font-medium">Atendimentos Digitais</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatNumber(certidoes.atendimentosDigitais)}
                  </p>
                  <Progress
                    value={certidoes.percentualDigital}
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    {certidoes.percentualDigital}% do total — Meta: 75%
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-2">
                  <p className="text-sm font-medium">Reclamações</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(certidoes.reclamacoesRecebidas)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(certidoes.reclamacoesResolvidas)} resolvidas (
                    {(
                      (certidoes.reclamacoesResolvidas /
                        certidoes.reclamacoesRecebidas) *
                      100
                    ).toFixed(1)}
                    %)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Renúncia Fiscal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={MoneySend01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Renúncia Fiscal e Incentivos
              </CardTitle>
              <CardDescription>
                Isenções, imunidades e incentivos fiscais concedidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Isenções IPTU
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(renunciaFiscal.isencoesIPTU)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(renunciaFiscal.beneficiariosIPTU)}{" "}
                    beneficiários
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Isenções ISS
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(renunciaFiscal.isencoesISS)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(renunciaFiscal.beneficiariosISS)}{" "}
                    beneficiários
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Incentivos Empresariais
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(renunciaFiscal.incentivosEmpresariais)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(renunciaFiscal.empresasIncentivadas)} empresas
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Imunidades Tributárias
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(renunciaFiscal.imunidades)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Entidades religiosas, educacionais, etc.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 text-sm">
                  <HugeiconsIcon
                    icon={InformationCircleIcon}
                    strokeWidth={2}
                    className="size-4 text-blue-600"
                  />
                  <span className="font-medium">Renúncia total:</span>
                  <span className="font-bold">
                    {formatCurrency(renunciaFiscal.total)}
                  </span>
                  <span className="text-muted-foreground">
                    — equivalente a{" "}
                    {((renunciaFiscal.total / totalArrecadado) * 100).toFixed(
                      1,
                    )}
                    % da receita tributária arrecadada
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Dívida Ativa */}
        <TabsContent value="divida-ativa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Invoice02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Dívida Ativa Tributária
              </CardTitle>
              <CardDescription>
                Estoque, composição e estratégias de recuperação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="rounded-lg border p-4 space-y-1 border-red-200 dark:border-red-800">
                  <p className="text-sm font-medium text-muted-foreground">
                    Estoque Total
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(dividaAtiva.estoqueTotal)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1 border-green-200 dark:border-green-800">
                  <p className="text-sm font-medium text-muted-foreground">
                    Recuperado no Exercício
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(dividaAtiva.recuperadoAno)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Inscrito no Exercício
                  </p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(dividaAtiva.inscricoesAno)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1 border-amber-200 dark:border-amber-800">
                  <p className="text-sm font-medium text-muted-foreground">
                    Risco de Prescrição
                  </p>
                  <p className="text-2xl font-bold text-amber-600">
                    {formatCurrency(dividaAtiva.prescricaoRisco)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Próximos 12 meses
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <h4 className="font-semibold mb-3">Composição por Tributo</h4>
              <div className="space-y-3">
                {[
                  { nome: "IPTU", valor: dividaAtiva.iptu, cor: "bg-blue-600" },
                  { nome: "ISS", valor: dividaAtiva.iss, cor: "bg-green-600" },
                  {
                    nome: "Taxas",
                    valor: dividaAtiva.taxas,
                    cor: "bg-amber-600",
                  },
                  {
                    nome: "ITBI",
                    valor: dividaAtiva.itbi,
                    cor: "bg-purple-600",
                  },
                ].map((item) => (
                  <div key={item.nome} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.nome}</span>
                      <span>
                        {formatCurrency(item.valor)} (
                        {(
                          (item.valor / dividaAtiva.estoqueTotal) *
                          100
                        ).toFixed(1)}
                        %)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.cor}`}
                        style={{
                          width: `${(item.valor / dividaAtiva.estoqueTotal) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <h4 className="font-semibold mb-3">Estratégias de Cobrança</h4>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Ajuizadas
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(dividaAtiva.ajuizadas)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(
                      (dividaAtiva.ajuizadas / dividaAtiva.estoqueTotal) *
                      100
                    ).toFixed(1)}
                    % do estoque
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Protestadas
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(dividaAtiva.protestadas)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(
                      (dividaAtiva.protestadas / dividaAtiva.estoqueTotal) *
                      100
                    ).toFixed(1)}
                    % do estoque
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Parcelamentos
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(dividaAtiva.parcelamentos)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(dividaAtiva.parcelamentosAtivos)} ativos —{" "}
                    {formatNumber(dividaAtiva.parcelamentosInadimplentes)}{" "}
                    inadimplentes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Fiscalização */}
        <TabsContent value="fiscalizacao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Search01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Fiscalização Tributária
              </CardTitle>
              <CardDescription>
                Indicadores de ações fiscais e recuperação de créditos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Autos de Infração
                  </p>
                  <p className="text-2xl font-bold">
                    {formatNumber(fiscalizacao.autosInfracao)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Valor: {formatCurrency(fiscalizacao.valorAutuado)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Valor Recuperado
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(fiscalizacao.valorRecuperado)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(
                      (fiscalizacao.valorRecuperado /
                        fiscalizacao.valorAutuado) *
                      100
                    ).toFixed(1)}
                    % do autuado
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Empresas Fiscalizadas
                  </p>
                  <p className="text-2xl font-bold">
                    {formatNumber(fiscalizacao.empresasFiscalizadas)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(
                      (fiscalizacao.empresasFiscalizadas /
                        dadosISS.empresasAtivas) *
                      100
                    ).toFixed(1)}
                    % das empresas ativas
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    ISS Retido Recuperado
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(fiscalizacao.issRetidoRecuperado)}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Diligências Realizadas
                  </p>
                  <p className="text-xl font-bold">
                    {formatNumber(fiscalizacao.diligenciasRealizadas)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Notificações Prévias
                  </p>
                  <p className="text-xl font-bold">
                    {formatNumber(fiscalizacao.notificacoesPrevias)}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Denúncias Recebidas
                  </p>
                  <p className="text-xl font-bold">
                    {formatNumber(fiscalizacao.denunciasRecebidas)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(fiscalizacao.denunciasApuradas)} apuradas (
                    {(
                      (fiscalizacao.denunciasApuradas /
                        fiscalizacao.denunciasRecebidas) *
                      100
                    ).toFixed(1)}
                    %)
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Operações Especiais
                  </p>
                  <p className="text-xl font-bold">
                    {formatNumber(fiscalizacao.operacoesEspeciais)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Contribuintes */}
        <TabsContent value="contribuintes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={StarIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Maiores Contribuintes
              </CardTitle>
              <CardDescription>
                Ranking dos 10 maiores contribuintes por valor arrecadado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">#</TableHead>
                    <TableHead>Contribuinte</TableHead>
                    <TableHead>Tributo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-center">Situação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maioresContribuintes.map((c, i) => (
                    <TableRow key={c.nome}>
                      <TableCell className="font-bold text-muted-foreground">
                        {i + 1}
                      </TableCell>
                      <TableCell className="font-medium">{c.nome}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{c.tributo}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(c.valor)}
                      </TableCell>
                      <TableCell className="text-center">
                        {c.situacao === "Regular" && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                            Regular
                          </Badge>
                        )}
                        {c.situacao === "Parcelado" && (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                            Parcelado
                          </Badge>
                        )}
                        {c.situacao === "Imune" && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                            Imune
                          </Badge>
                        )}
                        {c.situacao === "Inadimplente" && (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
                            Inadimplente
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="font-bold">
                      Total Top 10
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(
                        maioresContribuintes.reduce((a, c) => a + c.valor, 0),
                      )}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          {/* Maiores Devedores */}
          <Card className="border-red-200 dark:border-red-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Alert02Icon}
                  strokeWidth={2}
                  className="size-5 text-red-600"
                />
                Maiores Devedores
              </CardTitle>
              <CardDescription>
                Ranking dos 10 maiores devedores — Dívida Ativa e Exercício
                Corrente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3 mb-6">
                <div className="rounded-lg border border-red-200 dark:border-red-800/50 p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Devido (Top 10)
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(
                      maioresDevedores.reduce((a, d) => a + d.valorDevido, 0),
                    )}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Origem: Dívida Ativa
                  </p>
                  <p className="text-xl font-bold">
                    {
                      maioresDevedores.filter(
                        (d) => d.origem === "Dívida Ativa",
                      ).length
                    }{" "}
                    contribuintes
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(
                      maioresDevedores
                        .filter((d) => d.origem === "Dívida Ativa")
                        .reduce((a, d) => a + d.valorDevido, 0),
                    )}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Origem: Exercício
                  </p>
                  <p className="text-xl font-bold">
                    {
                      maioresDevedores.filter((d) => d.origem === "Exercício")
                        .length
                    }{" "}
                    contribuintes
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(
                      maioresDevedores
                        .filter((d) => d.origem === "Exercício")
                        .reduce((a, d) => a + d.valorDevido, 0),
                    )}
                  </p>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">#</TableHead>
                    <TableHead>Devedor</TableHead>
                    <TableHead>Tributo</TableHead>
                    <TableHead className="text-right">Valor Devido</TableHead>
                    <TableHead className="text-center">Origem</TableHead>
                    <TableHead className="text-center">Situação</TableHead>
                    <TableHead className="text-center">Tempo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maioresDevedores.map((d, i) => (
                    <TableRow key={d.nome}>
                      <TableCell className="font-bold text-muted-foreground">
                        {i + 1}
                      </TableCell>
                      <TableCell className="font-medium">{d.nome}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{d.tributo}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-red-600">
                        {formatCurrency(d.valorDevido)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            d.origem === "Dívida Ativa"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {d.origem}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {d.situacao === "Ajuizada" && (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
                            Ajuizada
                          </Badge>
                        )}
                        {d.situacao === "Protestada" && (
                          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800">
                            Protestada
                          </Badge>
                        )}
                        {d.situacao === "Parcelada" && (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                            Parcelada
                          </Badge>
                        )}
                        {d.situacao === "Inscrita" && (
                          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800">
                            Inscrita
                          </Badge>
                        )}
                        {d.situacao === "Notificada" && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                            Notificada
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">
                        {d.tempoInadimplencia}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="font-bold">
                      Total Top 10 Devedores
                    </TableCell>
                    <TableCell className="text-right font-bold text-red-600">
                      {formatCurrency(
                        maioresDevedores.reduce((a, d) => a + d.valorDevido, 0),
                      )}
                    </TableCell>
                    <TableCell colSpan={3} />
                  </TableRow>
                </TableFooter>
              </Table>

              <div className="mt-4 rounded-lg bg-red-50 dark:bg-red-950/20 p-4">
                <div className="flex items-start gap-2 text-sm">
                  <HugeiconsIcon
                    icon={AlertCircleIcon}
                    strokeWidth={2}
                    className="size-4 text-red-600 mt-0.5"
                  />
                  <div>
                    <span className="font-medium text-red-800 dark:text-red-400">
                      Atenção:
                    </span>
                    <span className="text-red-700 dark:text-red-300 ml-1">
                      O valor total dos 10 maiores devedores representa{" "}
                      {(
                        (maioresDevedores.reduce(
                          (a, d) => a + d.valorDevido,
                          0,
                        ) /
                          dividaAtiva.estoqueTotal) *
                        100
                      ).toFixed(1)}
                      % do estoque total da dívida ativa. Recomenda-se ação
                      prioritária de cobrança para estes contribuintes.
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Metas */}
        <TabsContent value="metas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Target01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Metas de Arrecadação — Exercício {periodoSelecionado}
              </CardTitle>
              <CardDescription>
                Acompanhamento das metas de arrecadação por tributo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {metasArrecadacao.map((meta) => {
                  const isAboveMeta = meta.percentual >= 90;
                  const isWarning =
                    meta.percentual >= 75 && meta.percentual < 90;
                  return (
                    <div key={meta.tributo} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{meta.tributo}</span>
                          {isAboveMeta ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                              No alvo
                            </Badge>
                          ) : isWarning ? (
                            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                              Atenção
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
                              Abaixo
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm font-bold">
                          {meta.percentual}%
                        </span>
                      </div>
                      <Progress value={meta.percentual} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Realizado: {formatCurrency(meta.realizado)}</span>
                        <span>Meta: {formatCurrency(meta.meta)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========================================== */}
        {/* Tab: NFS-e e Nota Fiscal                   */}
        {/* ========================================== */}
        <TabsContent value="nfse" className="space-y-4">
          {/* KPIs NFS-e */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              icon={FileAttachmentIcon}
              title="Total NFS-e Emitidas"
              value={formatNumber(dadosNFSe.totalEmitidas)}
              borderColor="border-l-blue-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Média de {formatNumber(dadosNFSe.mediaNotasDia)} notas/dia —{" "}
                  {formatNumber(dadosNFSe.empresasEmissoras)} empresas emissoras
                </p>
              }
            />
            <KpiCard
              icon={MoneyReceiveSquareIcon}
              title="Valor Total Serviços"
              value={formatMillions(dadosNFSe.valorTotalServicos)}
              borderColor="border-l-green-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  ISS gerado: {formatCurrency(dadosNFSe.issGerado)}
                </p>
              }
            />
            <KpiCard
              icon={Cancel01Icon}
              title="Notas Canceladas"
              value={formatNumber(dadosNFSe.totalCanceladas)}
              borderColor="border-l-red-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  {(
                    (dadosNFSe.totalCanceladas / dadosNFSe.totalEmitidas) *
                    100
                  ).toFixed(1)}
                  % do total — {formatNumber(dadosNFSe.totalSubstituidas)}{" "}
                  substituídas
                </p>
              }
            />
            <KpiCard
              icon={Alert02Icon}
              title="Empresas Sem Emissão"
              value={formatNumber(dadosNFSe.empresasSemEmissao30dias)}
              valueClassName="text-red-600"
              borderColor="border-l-amber-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Sem NFS-e nos últimos 30 dias — possível omissão de receita
                </p>
              }
            />
          </div>

          {/* Evolução Mensal NFS-e */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={ChartLineData02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Evolução Mensal — Emissão de NFS-e
              </CardTitle>
              <CardDescription>
                Volume de notas emitidas e ISS gerado por mês — Exercício{" "}
                {periodoSelecionado}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfigNFSe}
                className="h-[300px] w-full"
              >
                <BarChart data={dadosNFSe.evolucaoMensal} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    yAxisId="left"
                    tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(v: number) =>
                      `${(v / 1000000).toFixed(1)}M`
                    }
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    yAxisId="left"
                    dataKey="notas"
                    fill="var(--color-notas)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="iss"
                    stroke="var(--color-iss)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Ranking por CNAE */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Analytics01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Ranking de Arrecadação por Atividade Econômica (CNAE)
              </CardTitle>
              <CardDescription>
                Principais atividades econômicas por volume de NFS-e e ISS
                gerado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">#</TableHead>
                    <TableHead>CNAE</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-center">NFS-e</TableHead>
                    <TableHead className="text-right">Valor Serviços</TableHead>
                    <TableHead className="text-right">ISS Gerado</TableHead>
                    <TableHead className="text-right">% ISS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosNFSe.rankingCNAE.map((item, i) => (
                    <TableRow key={item.cnae}>
                      <TableCell className="font-bold text-muted-foreground">
                        {i + 1}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {item.cnae}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.descricao}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(item.notas)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatMillions(item.valor)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(item.iss)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">{item.percentual}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="font-bold">
                      Total Top 8 CNAEs
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      {formatNumber(
                        dadosNFSe.rankingCNAE.reduce((a, c) => a + c.notas, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatMillions(
                        dadosNFSe.rankingCNAE.reduce((a, c) => a + c.valor, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(
                        dadosNFSe.rankingCNAE.reduce((a, c) => a + c.iss, 0),
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {dadosNFSe.rankingCNAE
                        .reduce((a, c) => a + c.percentual, 0)
                        .toFixed(1)}
                      %
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========================================== */}
        {/* Tab: Transferências Constitucionais         */}
        {/* ========================================== */}
        <TabsContent value="transferencias" className="space-y-4">
          {/* KPIs Transferências */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <KpiCard
              icon={BankIcon}
              title="FPM"
              value={formatMillions(transferenciasConstitucionais.fpm.recebido)}
              borderColor="border-l-blue-500"
              footer={
                <>
                  <Progress
                    value={transferenciasConstitucionais.fpm.percentual}
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    {transferenciasConstitucionais.fpm.percentual}% do previsto
                    (
                    {formatMillions(transferenciasConstitucionais.fpm.previsto)}
                    )
                  </p>
                </>
              }
            />
            <KpiCard
              icon={MoneyReceiveSquareIcon}
              title="ICMS (Cota-Parte)"
              value={formatMillions(
                transferenciasConstitucionais.icms.recebido,
              )}
              borderColor="border-l-green-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  IPM: {transferenciasConstitucionais.icms.indicePM} — Ranking:{" "}
                  {transferenciasConstitucionais.icms.rankingEstadual}° de{" "}
                  {transferenciasConstitucionais.icms.totalMunicipios}
                </p>
              }
            />
            <KpiCard
              icon={Wallet01Icon}
              title="IPVA (Cota-Parte)"
              value={formatMillions(
                transferenciasConstitucionais.ipva.recebido,
              )}
              borderColor="border-l-amber-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  {formatNumber(
                    transferenciasConstitucionais.ipva.veiculosMunicipio,
                  )}{" "}
                  veículos registrados
                </p>
              }
            />
            <KpiCard
              icon={Building06Icon}
              title="FUNDEB"
              value={formatMillions(
                transferenciasConstitucionais.fundeb.recebido,
              )}
              borderColor="border-l-violet-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Complementação União:{" "}
                  {formatMillions(
                    transferenciasConstitucionais.fundeb.complementacaoUniao,
                  )}{" "}
                  —{" "}
                  {formatNumber(
                    transferenciasConstitucionais.fundeb.alunosRede,
                  )}{" "}
                  alunos
                </p>
              }
            />
            <KpiCard
              icon={Home01Icon}
              title="ITR (Conveniado)"
              value={formatMillions(transferenciasConstitucionais.itr.recebido)}
              borderColor="border-l-teal-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Retenção:{" "}
                  {transferenciasConstitucionais.itr.percentualRetencao}% —{" "}
                  {transferenciasConstitucionais.itr.percentual}% do previsto
                </p>
              }
            />
          </div>

          {/* Resumo Total */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={MoneyAdd01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Transferências Constitucionais — Resumo
              </CardTitle>
              <CardDescription>
                Total recebido vs. previsto e evolução anual das transferências
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3 mb-6">
                <div className="rounded-lg border p-4 space-y-1 border-green-200 dark:border-green-800">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Recebido
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(
                      transferenciasConstitucionais.totalRecebido,
                    )}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Previsto (LOA)
                  </p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(
                      transferenciasConstitucionais.totalPrevisto,
                    )}
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Realização
                  </p>
                  <p className="text-2xl font-bold">
                    {(
                      (transferenciasConstitucionais.totalRecebido /
                        transferenciasConstitucionais.totalPrevisto) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                  <Progress
                    value={
                      (transferenciasConstitucionais.totalRecebido /
                        transferenciasConstitucionais.totalPrevisto) *
                      100
                    }
                    className="h-2"
                  />
                </div>
              </div>

              <Separator className="my-4" />

              {/* Evolução FPM Mensal */}
              <h4 className="font-semibold mb-3">Evolução Mensal do FPM</h4>
              <ChartContainer
                config={
                  {
                    fpm: { label: "FPM", color: "var(--chart-1)" },
                  } satisfies ChartConfig
                }
                className="h-[250px] w-full"
              >
                <BarChart
                  data={transferenciasConstitucionais.fpm.evolucaoMensal}
                  accessibilityLayer
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickFormatter={(v: number) =>
                      `${(v / 1000000).toFixed(1)}M`
                    }
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCurrency(value as number)}
                      />
                    }
                  />
                  <Bar
                    dataKey="valor"
                    fill="var(--chart-1)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>

              <Separator className="my-4" />

              {/* Comparativo Anual Transferências */}
              <h4 className="font-semibold mb-3">
                Comparativo Anual — 3 Exercícios
              </h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exercício</TableHead>
                    <TableHead className="text-right">FPM</TableHead>
                    <TableHead className="text-right">ICMS</TableHead>
                    <TableHead className="text-right">IPVA</TableHead>
                    <TableHead className="text-right">FUNDEB</TableHead>
                    <TableHead className="text-right">ITR</TableHead>
                    <TableHead className="text-right font-bold">
                      Total
                    </TableHead>
                    <TableHead className="text-center">Variação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transferenciasConstitucionais.comparativoAnual.map(
                    (ano, i) => {
                      const varAnual =
                        i > 0
                          ? (
                              ((ano.total -
                                transferenciasConstitucionais.comparativoAnual[
                                  i - 1
                                ].total) /
                                transferenciasConstitucionais.comparativoAnual[
                                  i - 1
                                ].total) *
                              100
                            ).toFixed(1)
                          : null;
                      return (
                        <TableRow key={ano.ano}>
                          <TableCell className="font-bold">{ano.ano}</TableCell>
                          <TableCell className="text-right">
                            {formatMillions(ano.fpm)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatMillions(ano.icms)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatMillions(ano.ipva)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatMillions(ano.fundeb)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatMillions(ano.itr)}
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            {formatMillions(ano.total)}
                          </TableCell>
                          <TableCell className="text-center">
                            {varAnual ? (
                              <Badge
                                className={
                                  Number(varAnual) > 0
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                }
                              >
                                {Number(varAnual) > 0 ? "+" : ""}
                                {varAnual}%
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    },
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Informação sobre dependência */}
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-start gap-2 text-sm">
              <HugeiconsIcon
                icon={InformationCircleIcon}
                strokeWidth={2}
                className="size-4 text-blue-600 mt-0.5"
              />
              <div>
                <span className="font-medium">
                  Grau de dependência de transferências:
                </span>
                <span className="ml-1">
                  As transferências constitucionais (
                  {formatCurrency(transferenciasConstitucionais.totalRecebido)})
                  representam{" "}
                  <strong>
                    {(
                      (transferenciasConstitucionais.totalRecebido /
                        (transferenciasConstitucionais.totalRecebido +
                          totalArrecadado)) *
                      100
                    ).toFixed(1)}
                    %
                  </strong>{" "}
                  da receita corrente total (própria + transferida), indicando o
                  nível de autonomia financeira do município.
                </span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ========================================== */}
        {/* Tab: Processos Administrativos Fiscais     */}
        {/* ========================================== */}
        <TabsContent value="paf" className="space-y-4">
          {/* KPIs PAF */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              icon={CourtLawIcon}
              title="Total de Processos"
              value={formatNumber(processosAdmFiscais.totalProcessos)}
              borderColor="border-l-blue-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  {formatNumber(processosAdmFiscais.emTramitacao)} em tramitação
                  — {formatNumber(processosAdmFiscais.julgados)} julgados —{" "}
                  {formatNumber(processosAdmFiscais.arquivados)} arquivados
                </p>
              }
            />
            <KpiCard
              icon={MoneyReceiveSquareIcon}
              title="Valor Total Discutido"
              value={formatMillions(processosAdmFiscais.valorDiscutido)}
              borderColor="border-l-red-500"
              footer={
                <>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-green-600">
                      Procedente:{" "}
                      {formatMillions(
                        processosAdmFiscais.valorJulgadoProcedente,
                      )}
                    </span>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-red-600">
                      Improcedente:{" "}
                      {formatMillions(
                        processosAdmFiscais.valorJulgadoImprocedente,
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pendente de julgamento:{" "}
                    {formatCurrency(processosAdmFiscais.valorPendente)}
                  </p>
                </>
              }
            />
            <KpiCard
              icon={Clock01Icon}
              title="Tempo Médio de Julgamento"
              value={`${processosAdmFiscais.tempoMedioJulgamento} dias`}
              borderColor="border-l-amber-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Meta: 120 dias —{" "}
                  {processosAdmFiscais.tempoMedioJulgamento > 120
                    ? "Acima da meta"
                    : "Dentro da meta"}
                </p>
              }
            />
            <KpiCard
              icon={DocumentValidationIcon}
              title="Taxa de Êxito Fiscal"
              value={`${((processosAdmFiscais.valorJulgadoProcedente / (processosAdmFiscais.valorJulgadoProcedente + processosAdmFiscais.valorJulgadoImprocedente)) * 100).toFixed(1)}%`}
              borderColor="border-l-green-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Percentual de créditos mantidos após julgamento
                </p>
              }
            />
          </div>

          {/* Impugnações e Recursos */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Impugnações</CardTitle>
                <CardDescription>
                  Situação das impugnações recebidas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Recebidas</span>
                    <span className="font-bold">
                      {formatNumber(processosAdmFiscais.impugnacoes.recebidas)}
                    </span>
                  </div>
                  {[
                    {
                      label: "Deferidas",
                      value: processosAdmFiscais.impugnacoes.deferidas,
                      cor: "bg-red-600",
                    },
                    {
                      label: "Indeferidas (êxito fiscal)",
                      value: processosAdmFiscais.impugnacoes.indeferidas,
                      cor: "bg-green-600",
                    },
                    {
                      label: "Parcialmente deferidas",
                      value:
                        processosAdmFiscais.impugnacoes.parcialmenteDeferidas,
                      cor: "bg-amber-600",
                    },
                    {
                      label: "Pendentes de julgamento",
                      value: processosAdmFiscais.impugnacoes.pendentes,
                      cor: "bg-blue-600",
                    },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.label}
                        </span>
                        <span>
                          {formatNumber(item.value)} (
                          {(
                            (item.value /
                              processosAdmFiscais.impugnacoes.recebidas) *
                            100
                          ).toFixed(1)}
                          %)
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.cor}`}
                          style={{
                            width: `${(item.value / processosAdmFiscais.impugnacoes.recebidas) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recursos</CardTitle>
                <CardDescription>
                  Situação dos recursos interpostos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Interpostos</span>
                    <span className="font-bold">
                      {formatNumber(processosAdmFiscais.recursos.interpostos)}
                    </span>
                  </div>
                  {[
                    {
                      label: "Providos (favorável contribuinte)",
                      value: processosAdmFiscais.recursos.providos,
                      cor: "bg-red-600",
                    },
                    {
                      label: "Improvidos (êxito fiscal)",
                      value: processosAdmFiscais.recursos.improvidos,
                      cor: "bg-green-600",
                    },
                    {
                      label: "Parcialmente providos",
                      value: processosAdmFiscais.recursos.parcialmenteProvidos,
                      cor: "bg-amber-600",
                    },
                    {
                      label: "Pendentes de julgamento",
                      value: processosAdmFiscais.recursos.pendentes,
                      cor: "bg-blue-600",
                    },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.label}
                        </span>
                        <span>
                          {formatNumber(item.value)} (
                          {(
                            (item.value /
                              processosAdmFiscais.recursos.interpostos) *
                            100
                          ).toFixed(1)}
                          %)
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.cor}`}
                          style={{
                            width: `${(item.value / processosAdmFiscais.recursos.interpostos) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Distribuição por Tributo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={PieChart02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                Distribuição de Processos por Tributo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tributo</TableHead>
                    <TableHead className="text-center">Processos</TableHead>
                    <TableHead className="text-right">
                      Valor Discutido
                    </TableHead>
                    <TableHead className="text-right">% do Total</TableHead>
                    <TableHead className="text-center">Barra</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processosAdmFiscais.porTributo.map((item) => (
                    <TableRow key={item.tributo}>
                      <TableCell className="font-medium">
                        {item.tributo}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(item.processos)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.valor)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.percentual}%
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${item.percentual}%` }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Processos com Prazo Vencendo */}
          <Card className="border-amber-200 dark:border-amber-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  strokeWidth={2}
                  className="size-5 text-amber-600"
                />
                Processos com Prazos Próximos
              </CardTitle>
              <CardDescription>
                Processos com prazos de impugnação ou recurso vencendo nos
                próximos 60 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Processo</TableHead>
                    <TableHead>Contribuinte</TableHead>
                    <TableHead>Tributo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-center">Prazo</TableHead>
                    <TableHead className="text-center">Tipo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processosAdmFiscais.prazosVencendo.map((p) => (
                    <TableRow key={p.processo}>
                      <TableCell className="font-mono text-sm">
                        {p.processo}
                      </TableCell>
                      <TableCell className="font-medium">
                        {p.contribuinte}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{p.tributo}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(p.valor)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                          {p.prazo}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            p.tipo === "Impugnação" ? "secondary" : "outline"
                          }
                        >
                          {p.tipo}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="font-bold">
                      Total em Risco
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(
                        processosAdmFiscais.prazosVencendo.reduce(
                          (a, p) => a + p.valor,
                          0,
                        ),
                      )}
                    </TableCell>
                    <TableCell colSpan={2} />
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
