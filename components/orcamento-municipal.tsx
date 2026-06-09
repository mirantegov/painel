"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp01Icon,
  ArrowDown01Icon,
  MoneyAdd01Icon,
  MoneySend01Icon,
  Target01Icon,
  ChartLineData02Icon,
  Invoice02Icon,
  CheckmarkCircle02Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import {
  ORCAMENTO_BASE,
  computeOrcamento,
  pctShare,
  type OrcamentoBase,
} from "@/lib/demo-orcamento";
import { useSnapshot } from "@/components/use-snapshot";
import { KpiCard } from "@/components/ui/kpi-card";
import { OrcamentoPonteEquilibrio } from "@/components/orcamento/orcamento-ponte-equilibrio";
import { OrcamentoRealizacaoGauge } from "@/components/orcamento/orcamento-realizacao-gauge";
import { OrcamentoWaterfallLoa } from "@/components/orcamento/orcamento-waterfall-loa";
import { OrcamentoTreemapOrcado } from "@/components/orcamento/orcamento-treemap-orcado";

// Formatadores
const fmtCurrency = (v: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(v);

const fmtMillions = (v: number) => {
  if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `R$ ${(v / 1_000).toFixed(0)}K`;
  return fmtCurrency(v);
};

const pctDiff = (atual: number, anterior: number) => {
  if (anterior === 0) return 0;
  return ((atual - anterior) / anterior) * 100;
};

// =============================================
// DADOS DA RECEITA
// =============================================

const evolucaoReceitaAnual = [
  { ano: "2020", orcada: 420_000_000, atualizada: 435_000_000 },
  { ano: "2021", orcada: 455_000_000, atualizada: 468_000_000 },
  { ano: "2022", orcada: 480_000_000, atualizada: 498_000_000 },
  { ano: "2023", orcada: 510_000_000, atualizada: 525_000_000 },
  { ano: "2024", orcada: 535_000_000, atualizada: 547_000_000 },
];

const receitaOrigemNatureza = [
  { nome: "Impostos", orcado: 125_000_000, atualizado: 132_500_000 },
  { nome: "Taxas", orcado: 18_500_000, atualizado: 19_200_000 },
  { nome: "Contribuições", orcado: 42_000_000, atualizado: 43_800_000 },
  { nome: "Receita Patrimonial", orcado: 8_500_000, atualizado: 9_100_000 },
  {
    nome: "Transferências Correntes",
    orcado: 285_000_000,
    atualizado: 290_500_000,
  },
  {
    nome: "Transferências de Capital",
    orcado: 38_000_000,
    atualizado: 34_200_000,
  },
  {
    nome: "Outras Receitas Correntes",
    orcado: 18_000_000,
    atualizado: 17_700_000,
  },
];

const receitaFonteRecursos = [
  {
    nome: "Recursos Ordinários (Livre)",
    orcado: 185_000_000,
    atualizado: 192_000_000,
  },
  { nome: "MDE - Educação", orcado: 95_000_000, atualizado: 98_500_000 },
  { nome: "ASPS - Saúde", orcado: 82_000_000, atualizado: 84_200_000 },
  { nome: "Assistência Social", orcado: 28_000_000, atualizado: 26_800_000 },
  { nome: "RPPS - Previdência", orcado: 65_000_000, atualizado: 67_500_000 },
  { nome: "Outros Vinculados", orcado: 80_000_000, atualizado: 78_000_000 },
];

const receitaEntidade = [
  {
    nome: "Prefeitura Municipal",
    orcado: 395_000_000,
    atualizado: 405_200_000,
  },
  { nome: "Câmara Municipal", orcado: 22_000_000, atualizado: 22_000_000 },
  {
    nome: "Prev. Municipal (RPPS)",
    orcado: 68_000_000,
    atualizado: 70_500_000,
  },
  { nome: "Saneamento Municipal", orcado: 50_000_000, atualizado: 49_300_000 },
];

const receitaOrigem = [
  { nome: "Receitas Próprias", orcado: 165_000_000, atualizado: 172_800_000 },
  {
    nome: "Transferências Estaduais",
    orcado: 98_000_000,
    atualizado: 95_500_000,
  },
  {
    nome: "Transferências Federais",
    orcado: 245_000_000,
    atualizado: 252_200_000,
  },
  { nome: "Outras Origens", orcado: 27_000_000, atualizado: 26_500_000 },
];

// =============================================
// DADOS DA DESPESA
// =============================================

const evolucaoDespesaAnual = [
  { ano: "2020", orcada: 418_000_000, atualizada: 430_000_000 },
  { ano: "2021", orcada: 452_000_000, atualizada: 470_000_000 },
  { ano: "2022", orcada: 478_000_000, atualizada: 502_000_000 },
  { ano: "2023", orcada: 508_000_000, atualizada: 530_000_000 },
  { ano: "2024", orcada: 535_000_000, atualizada: 549_000_000 },
];

const despesaSecretaria = [
  { nome: "Sec. de Educação", orcado: 142_000_000, atualizado: 148_500_000 },
  { nome: "Sec. de Saúde", orcado: 118_000_000, atualizado: 122_300_000 },
  { nome: "Sec. de Administração", orcado: 65_000_000, atualizado: 63_800_000 },
  {
    nome: "Sec. de Obras e Urbanismo",
    orcado: 52_000_000,
    atualizado: 58_200_000,
  },
  {
    nome: "Sec. de Assistência Social",
    orcado: 32_000_000,
    atualizado: 30_500_000,
  },
  { nome: "Sec. de Finanças", orcado: 18_000_000, atualizado: 17_200_000 },
  { nome: "Câmara Municipal", orcado: 22_000_000, atualizado: 22_000_000 },
  {
    nome: "Prev. Municipal (RPPS)",
    orcado: 52_000_000,
    atualizado: 53_800_000,
  },
  { nome: "Saneamento Municipal", orcado: 34_000_000, atualizado: 32_700_000 },
];

const despesaFuncao = [
  { nome: "Educação", orcado: 142_000_000, atualizado: 148_500_000 },
  { nome: "Saúde", orcado: 118_000_000, atualizado: 122_300_000 },
  { nome: "Administração", orcado: 68_000_000, atualizado: 66_500_000 },
  { nome: "Urbanismo", orcado: 45_000_000, atualizado: 50_200_000 },
  { nome: "Assistência Social", orcado: 32_000_000, atualizado: 30_500_000 },
  { nome: "Previdência Social", orcado: 52_000_000, atualizado: 53_800_000 },
  { nome: "Saneamento", orcado: 34_000_000, atualizado: 32_700_000 },
  { nome: "Legislativa", orcado: 22_000_000, atualizado: 22_000_000 },
  { nome: "Encargos Especiais", orcado: 22_000_000, atualizado: 22_500_000 },
];

const despesaFonteRecursos = [
  {
    nome: "Recursos Ordinários (Livre)",
    orcado: 180_000_000,
    atualizado: 188_500_000,
  },
  { nome: "MDE - Educação", orcado: 95_000_000, atualizado: 98_500_000 },
  { nome: "ASPS - Saúde", orcado: 82_000_000, atualizado: 84_200_000 },
  { nome: "Assistência Social", orcado: 28_000_000, atualizado: 26_800_000 },
  { nome: "RPPS - Previdência", orcado: 65_000_000, atualizado: 67_500_000 },
  { nome: "Outros Vinculados", orcado: 85_000_000, atualizado: 83_500_000 },
];

const despesaNatureza = [
  {
    nome: "Pessoal e Encargos Sociais",
    orcado: 265_000_000,
    atualizado: 272_000_000,
    categoria: "Corrente",
  },
  {
    nome: "Juros e Encargos da Dívida",
    orcado: 8_000_000,
    atualizado: 7_500_000,
    categoria: "Corrente",
  },
  {
    nome: "Outras Despesas Correntes",
    orcado: 165_000_000,
    atualizado: 170_200_000,
    categoria: "Corrente",
  },
  {
    nome: "Investimentos",
    orcado: 62_000_000,
    atualizado: 68_500_000,
    categoria: "Capital",
  },
  {
    nome: "Inversões Financeiras",
    orcado: 12_000_000,
    atualizado: 10_800_000,
    categoria: "Capital",
  },
  {
    nome: "Amortização da Dívida",
    orcado: 23_000_000,
    atualizado: 20_000_000,
    categoria: "Capital",
  },
];

const receitaTopAltas = [...receitaOrigemNatureza]
  .map((item) => ({ ...item, diff: item.atualizado - item.orcado }))
  .sort((a, b) => b.diff - a.diff)
  .slice(0, 4);

const despesaTopAltas = [...despesaNatureza]
  .map((item) => ({ ...item, diff: item.atualizado - item.orcado }))
  .sort((a, b) => b.diff - a.diff)
  .slice(0, 4);

// =============================================
// COMPONENTE
// =============================================

function DiffTable({
  data,
  title,
  description,
}: {
  data: {
    nome: string;
    orcado: number;
    atualizado: number;
    categoria?: string;
  }[];
  title: string;
  description: string;
}) {
  const totals = data.reduce(
    (acc, r) => ({
      orcado: acc.orcado + r.orcado,
      atualizado: acc.atualizado + r.atualizado,
    }),
    { orcado: 0, atualizado: 0 },
  );
  const totalDiff = totals.atualizado - totals.orcado;
  const totalPct = pctDiff(totals.atualizado, totals.orcado);
  const hasCategoria = data.some((d) => d.categoria);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {hasCategoria && (
                <TableHead className="w-24">Categoria</TableHead>
              )}
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Orçado (LOA)</TableHead>
              <TableHead className="text-right">Atualizado</TableHead>
              <TableHead className="text-right">Dif. Nominal (R$)</TableHead>
              <TableHead className="text-right">Dif. (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => {
              const diff = item.atualizado - item.orcado;
              const pct = pctDiff(item.atualizado, item.orcado);
              return (
                <TableRow key={item.nome}>
                  {hasCategoria && (
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {item.categoria}
                      </Badge>
                    </TableCell>
                  )}
                  <TableCell className="font-medium">{item.nome}</TableCell>
                  <TableCell className="text-right">
                    {fmtCurrency(item.orcado)}
                  </TableCell>
                  <TableCell className="text-right">
                    {fmtCurrency(item.atualizado)}
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${diff >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {diff >= 0 ? "+" : ""}
                    {fmtCurrency(diff)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className={`text-xs ${pct >= 0 ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400" : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"}`}
                    >
                      {pct >= 0 ? "+" : ""}
                      {pct.toFixed(1)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              {hasCategoria && <TableCell />}
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="text-right font-bold">
                {fmtCurrency(totals.orcado)}
              </TableCell>
              <TableCell className="text-right font-bold">
                {fmtCurrency(totals.atualizado)}
              </TableCell>
              <TableCell
                className={`text-right font-bold ${totalDiff >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {totalDiff >= 0 ? "+" : ""}
                {fmtCurrency(totalDiff)}
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="secondary" className="text-xs font-bold">
                  {totalPct >= 0 ? "+" : ""}
                  {totalPct.toFixed(1)}%
                </Badge>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}

function MixBreakdownCard({
  title,
  description,
  data,
}: {
  title: string;
  description: string;
  data: { nome: string; orcado: number; atualizado: number }[];
}) {
  const totalAtualizado = data.reduce((acc, item) => acc + item.atualizado, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((item) => {
          const share = pctShare(item.atualizado, totalAtualizado);
          const diff = item.atualizado - item.orcado;

          return (
            <div key={item.nome} className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground">
                  {item.nome}
                </span>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {fmtMillions(item.atualizado)}
                  </p>
                  <p
                    className={`text-xs ${diff >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {diff >= 0 ? "+" : ""}
                    {fmtMillions(diff)}
                  </p>
                </div>
              </div>
              <Progress value={share} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {share.toFixed(1)}% de participação no total atualizado
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function OrcamentoMunicipal() {
  const base = useSnapshot<OrcamentoBase>("orcamento", ORCAMENTO_BASE);

  const {
    receitaPrevista,
    receitaDeduzida,
    receitaOrcada,
    receitaAlterada,
    receitaAtualizada,
    despesaOrcada,
    despesaSuplementado,
    despesaReduzido,
    despesaAtualizado,
    receitaArrecadada,
    despesaEmpenhada,
    metaRealizacaoReceitaPct,
    despesaPessoalOrcado,
    realizacaoReceitaVsAtualizada,
    comprometimentoDespesaVsAtualizada,
    saldoEmpenhoDisponivelPct,
    gapEstruturalLoa,
    rigidezPessoalSobreOrcado,
  } = computeOrcamento(base);

  const receitaDeltaNominal = receitaAtualizada - receitaOrcada;
  const receitaDeltaPercentual = pctDiff(receitaAtualizada, receitaOrcada);
  const despesaDeltaNominal = despesaAtualizado - despesaOrcada;
  const despesaDeltaPercentual = pctDiff(despesaAtualizado, despesaOrcada);

  return (
    <div className="space-y-8">
      {/* ======================================================= */}
      {/* BLOCO RECEITA                                            */}
      {/* ======================================================= */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
            <HugeiconsIcon
              icon={MoneyAdd01Icon}
              strokeWidth={2}
              className="size-5 text-green-600"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Receita Orçamentária
            </h3>
            <p className="text-sm text-muted-foreground">
              Previsão e alterações orçamentárias da receita
            </p>
          </div>
        </div>

        {/* KPIs Receita */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <KpiCard
            title="Receita Prevista"
            icon={Target01Icon}
            value={fmtMillions(receitaPrevista)}
            borderColor="border-l-blue-500"
            footer={<p className="text-xs text-muted-foreground">LOA 2024</p>}
          />
          <KpiCard
            title="Deduzida"
            icon={ArrowDown01Icon}
            value={`-${fmtMillions(receitaDeduzida)}`}
            valueClassName="text-red-600"
            borderColor="border-l-red-500"
            footer={
              <p className="text-xs text-muted-foreground">Deduções legais</p>
            }
          />
          <KpiCard
            title="Orçada"
            icon={Invoice02Icon}
            value={fmtMillions(receitaOrcada)}
            borderColor="border-l-emerald-500"
            footer={
              <p className="text-xs text-muted-foreground">
                Prevista - Deduzida
              </p>
            }
          />
          <KpiCard
            title="Alterada"
            icon={ArrowUp01Icon}
            value={`+${fmtMillions(receitaAlterada)}`}
            valueClassName="text-amber-600"
            borderColor="border-l-amber-500"
            footer={
              <p className="text-xs text-muted-foreground">
                Créditos adicionais
              </p>
            }
          />
          <KpiCard
            title="Atualizada"
            icon={MoneyAdd01Icon}
            value={fmtMillions(receitaAtualizada)}
            valueClassName="text-green-600"
            borderColor="border-l-green-500"
            footer={
              <p className="text-xs text-muted-foreground">Orçada + Alterada</p>
            }
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Variação Orçada x Atualizada"
            icon={ChartLineData02Icon}
            value={
              <>
                {receitaDeltaNominal >= 0 ? "+" : ""}
                {fmtMillions(receitaDeltaNominal)}
              </>
            }
            valueClassName={
              receitaDeltaNominal >= 0 ? "text-green-600" : "text-red-600"
            }
            borderColor="border-l-teal-500"
            footer={
              <p className="text-xs text-muted-foreground">
                {receitaDeltaPercentual >= 0 ? "+" : ""}
                {receitaDeltaPercentual.toFixed(2)}%
              </p>
            }
          />
          <KpiCard
            title="Índice de Dedução"
            icon={ArrowDown01Icon}
            value={`${pctShare(receitaDeduzida, receitaPrevista).toFixed(1)}%`}
            borderColor="border-l-slate-500"
            footer={
              <p className="text-xs text-muted-foreground">
                Percentual deduzido sobre a receita prevista
              </p>
            }
          />
          <KpiCard
            title="Elasticidade da Receita"
            icon={ArrowRight01Icon}
            value={`${pctShare(receitaAlterada, receitaOrcada).toFixed(1)}%`}
            borderColor="border-l-cyan-500"
            footer={
              <p className="text-xs text-muted-foreground">
                Peso dos créditos sobre a base orçada
              </p>
            }
          />
          <KpiCard
            title="Entidade Líder em Receita"
            icon={MoneyAdd01Icon}
            value="Prefeitura Municipal"
            borderColor="border-l-indigo-500"
            footer={
              <p className="text-xs text-muted-foreground">
                {pctShare(
                  receitaEntidade[0].atualizado,
                  receitaAtualizada,
                ).toFixed(1)}
                % da receita atualizada
              </p>
            }
          />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Orçado em foco (execução x planejamento)
          </h4>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <KpiCard
              title="Realização vs receita atualizada"
              icon={MoneyAdd01Icon}
              value={`${realizacaoReceitaVsAtualizada.toFixed(1)}%`}
              borderColor="border-l-emerald-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Arrecadação {fmtMillions(receitaArrecadada)} frente ao
                  orçamento atualizado
                </p>
              }
            />
            <KpiCard
              title="Gap estrutural (LOA)"
              icon={Target01Icon}
              value={`${gapEstruturalLoa >= 0 ? "+" : ""}${fmtMillions(gapEstruturalLoa)}`}
              borderColor="border-l-blue-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Receita orçada ({fmtMillions(receitaOrcada)}) menos despesa
                  orçada ({fmtMillions(despesaOrcada)})
                </p>
              }
            />
            <KpiCard
              title="Meta de realização"
              icon={CheckmarkCircle02Icon}
              value={`${metaRealizacaoReceitaPct}%`}
              borderColor="border-l-violet-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Situação:{" "}
                  {realizacaoReceitaVsAtualizada >= metaRealizacaoReceitaPct
                    ? "Meta atingida"
                    : "Abaixo da meta"}{" "}
                  (
                  {(
                    realizacaoReceitaVsAtualizada - metaRealizacaoReceitaPct
                  ).toFixed(1)}{" "}
                  p.p.)
                </p>
              }
            />
          </div>
        </div>

        <OrcamentoRealizacaoGauge
          variant="receita"
          titulo="Realização da arrecadação"
          subtitulo="Percentual da arrecadação acumulada em relação à receita orçamentária atualizada"
          realizado={receitaArrecadada}
          baseOrcamentaria={receitaAtualizada}
          metaPct={metaRealizacaoReceitaPct}
          fmtMillions={fmtMillions}
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <OrcamentoWaterfallLoa
            variant="receita"
            fmtCurrency={fmtCurrency}
            receita={{
              prevista: receitaPrevista,
              deduzida: receitaDeduzida,
              orcada: receitaOrcada,
              alterada: receitaAlterada,
              atualizada: receitaAtualizada,
            }}
          />
          <OrcamentoTreemapOrcado
            variant="receita"
            title="Mapa da receita orçada (LOA)"
            description="Peso de cada origem da natureza no valor orçado inicial"
            itens={receitaOrigemNatureza.map((r) => ({
              nome: r.nome,
              orcado: r.orcado,
            }))}
            fmtCurrency={fmtCurrency}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <MixBreakdownCard
            title="Composição Dinâmica da Receita"
            description="Distribuição das maiores variações positivas"
            data={receitaTopAltas}
          />
          <Card>
            <CardHeader>
              <CardTitle>Radar de Expansão da Receita</CardTitle>
              <CardDescription>
                Focos que mais ampliaram o orçamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {receitaTopAltas.map((item, index) => (
                <div
                  key={item.nome}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">#{index + 1}</Badge>
                    <span className="text-sm font-medium">{item.nome}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">
                      +{fmtMillions(item.diff)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {pctDiff(item.atualizado, item.orcado).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Evolução Anual Receita */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Evolução Anual da Receita
            </CardTitle>
            <CardDescription>
              Comparativo orçado vs atualizado por exercício
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  orcada: { label: "Orçada (LOA)", color: "var(--chart-3)" },
                  atualizada: { label: "Atualizada", color: "var(--chart-1)" },
                } satisfies ChartConfig
              }
              className="h-[280px] w-full"
            >
              <BarChart
                data={evolucaoReceitaAnual}
                margin={{ left: 0, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="ano"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(v) => fmtCurrency(Number(v))}
                    />
                  }
                />
                <Bar
                  dataKey="orcada"
                  fill="var(--color-orcada)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="atualizada"
                  fill="var(--color-atualizada)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Tabelas de Receita */}
        <DiffTable
          data={receitaOrigemNatureza}
          title="Receita por Origem da Natureza"
          description="Impostos, Contribuições, Transferências e outras origens"
        />

        <DiffTable
          data={receitaFonteRecursos}
          title="Receita por Fonte de Recursos"
          description="Distribuição por vinculação dos recursos"
        />

        <DiffTable
          data={receitaEntidade}
          title="Receita por Entidade"
          description="Prefeitura, Câmara, Previdência e Saneamento"
        />

        <DiffTable
          data={receitaOrigem}
          title="Receita por Origem"
          description="Próprias, Estaduais, Federais e Outras"
        />

        <OrcamentoPonteEquilibrio
          receitaOrcada={receitaOrcada}
          despesaOrcada={despesaOrcada}
          receitaAtualizada={receitaAtualizada}
          despesaAtualizada={despesaAtualizado}
          fmtMillions={fmtMillions}
        />
      </div>

      {/* ======================================================= */}
      {/* SEPARADOR VISUAL                                         */}
      {/* ======================================================= */}
      <div className="relative py-4">
        <Separator />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-muted px-4 dark:bg-background">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Despesa Orçamentária
          </span>
        </div>
      </div>

      {/* ======================================================= */}
      {/* BLOCO DESPESA                                            */}
      {/* ======================================================= */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
            <HugeiconsIcon
              icon={MoneySend01Icon}
              strokeWidth={2}
              className="size-5 text-red-600"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Despesa Orçamentária
            </h3>
            <p className="text-sm text-muted-foreground">
              Dotações, créditos adicionais e anulações
            </p>
          </div>
        </div>

        {/* KPIs Despesa */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Despesa Orçada"
            icon={Target01Icon}
            value={fmtMillions(despesaOrcada)}
            borderColor="border-l-blue-500"
            footer={<p className="text-xs text-muted-foreground">LOA 2024</p>}
          />
          <KpiCard
            title="Suplementado"
            icon={ArrowUp01Icon}
            value={`+${fmtMillions(despesaSuplementado)}`}
            valueClassName="text-amber-600"
            borderColor="border-l-amber-500"
            footer={
              <p className="text-xs text-muted-foreground">
                Créditos suplementares
              </p>
            }
          />
          <KpiCard
            title="Reduzido"
            icon={ArrowDown01Icon}
            value={`-${fmtMillions(despesaReduzido)}`}
            valueClassName="text-red-600"
            borderColor="border-l-red-500"
            footer={
              <p className="text-xs text-muted-foreground">
                Anulações de dotação
              </p>
            }
          />
          <KpiCard
            title="Atualizado"
            icon={MoneySend01Icon}
            value={fmtMillions(despesaAtualizado)}
            valueClassName="text-orange-600"
            borderColor="border-l-orange-500"
            footer={
              <p className="text-xs text-muted-foreground">
                Orçada + Supl. - Reduzido
              </p>
            }
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Variação Orçada x Atualizada"
            icon={ChartLineData02Icon}
            value={
              <>
                {despesaDeltaNominal >= 0 ? "+" : ""}
                {fmtMillions(despesaDeltaNominal)}
              </>
            }
            valueClassName={
              despesaDeltaNominal >= 0 ? "text-orange-600" : "text-green-600"
            }
            borderColor="border-l-teal-500"
            footer={
              <p className="text-xs text-muted-foreground">
                {despesaDeltaPercentual >= 0 ? "+" : ""}
                {despesaDeltaPercentual.toFixed(2)}%
              </p>
            }
          />
          <KpiCard
            title="Índice de Suplementação"
            icon={ArrowUp01Icon}
            value={`${pctShare(despesaSuplementado, despesaOrcada).toFixed(1)}%`}
            borderColor="border-l-slate-500"
            footer={
              <p className="text-xs text-muted-foreground">
                Suplementações sobre dotação inicial
              </p>
            }
          />
          <KpiCard
            title="Índice de Redução"
            icon={ArrowDown01Icon}
            value={`${pctShare(despesaReduzido, despesaOrcada).toFixed(1)}%`}
            borderColor="border-l-cyan-500"
            footer={
              <p className="text-xs text-muted-foreground">
                Anulações sobre dotação inicial
              </p>
            }
          />
          <KpiCard
            title="Despesa Líder por Natureza"
            icon={MoneySend01Icon}
            value="Pessoal e Encargos"
            borderColor="border-l-indigo-500"
            footer={
              <p className="text-xs text-muted-foreground">
                {pctShare(
                  despesaNatureza[0].atualizado,
                  despesaAtualizado,
                ).toFixed(1)}
                % da despesa atualizada
              </p>
            }
          />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Orçado em foco (execução x planejamento)
          </h4>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <KpiCard
              title="Comprometimento (empenho)"
              icon={Invoice02Icon}
              value={`${comprometimentoDespesaVsAtualizada.toFixed(1)}%`}
              borderColor="border-l-orange-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Empenho {fmtMillions(despesaEmpenhada)} sobre despesa
                  atualizada {fmtMillions(despesaAtualizado)}
                </p>
              }
            />
            <KpiCard
              title="Saldo disponível p/ empenhar"
              icon={MoneySend01Icon}
              value={`${saldoEmpenhoDisponivelPct.toFixed(1)}%`}
              borderColor="border-l-amber-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Margem ainda não empenhada do orçamento atualizado
                </p>
              }
            />
            <KpiCard
              title="Rigidez: pessoal sobre LOA"
              icon={Target01Icon}
              value={`${rigidezPessoalSobreOrcado.toFixed(1)}%`}
              borderColor="border-l-red-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Pessoal e encargos ({fmtMillions(despesaPessoalOrcado)}) sobre
                  despesa orçada inicial
                </p>
              }
            />
          </div>
        </div>

        <OrcamentoRealizacaoGauge
          variant="despesa"
          titulo="Comprometimento do empenho"
          subtitulo="Empenho acumulado em relação à despesa orçamentária atualizada"
          realizado={despesaEmpenhada}
          baseOrcamentaria={despesaAtualizado}
          fmtMillions={fmtMillions}
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <OrcamentoWaterfallLoa
            variant="despesa"
            fmtCurrency={fmtCurrency}
            despesa={{
              orcada: despesaOrcada,
              suplementado: despesaSuplementado,
              reduzido: despesaReduzido,
              atualizado: despesaAtualizado,
            }}
          />
          <OrcamentoTreemapOrcado
            variant="despesa"
            title="Mapa da despesa orçada (LOA)"
            description="Peso de cada natureza econômica no valor orçado inicial"
            itens={despesaNatureza.map((d) => ({
              nome: d.nome,
              orcado: d.orcado,
            }))}
            fmtCurrency={fmtCurrency}
          />
        </div>

        {/* Evolução Anual Despesa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ChartLineData02Icon}
                strokeWidth={2}
                className="size-5"
              />
              Evolução Anual da Despesa
            </CardTitle>
            <CardDescription>
              Comparativo orçado vs atualizado por exercício
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  orcada: { label: "Orçada (LOA)", color: "var(--chart-5)" },
                  atualizada: { label: "Atualizada", color: "var(--chart-2)" },
                } satisfies ChartConfig
              }
              className="h-[280px] w-full"
            >
              <BarChart
                data={evolucaoDespesaAnual}
                margin={{ left: 0, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="ano"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(v) => fmtCurrency(Number(v))}
                    />
                  }
                />
                <Bar
                  dataKey="orcada"
                  fill="var(--color-orcada)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="atualizada"
                  fill="var(--color-atualizada)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          <MixBreakdownCard
            title="Composição Dinâmica da Despesa"
            description="Rubricas com maior crescimento na atualização"
            data={despesaTopAltas}
          />
          <Card>
            <CardHeader>
              <CardTitle>Radar de Pressão da Despesa</CardTitle>
              <CardDescription>
                Grupos com maior incremento nominal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {despesaTopAltas.map((item, index) => (
                <div
                  key={item.nome}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">#{index + 1}</Badge>
                    <span className="text-sm font-medium">{item.nome}</span>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-semibold ${item.diff >= 0 ? "text-orange-600" : "text-green-600"}`}
                    >
                      {item.diff >= 0 ? "+" : ""}
                      {fmtMillions(item.diff)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {pctDiff(item.atualizado, item.orcado).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Tabelas de Despesa */}
        <DiffTable
          data={despesaSecretaria}
          title="Despesa por Secretaria"
          description="Distribuição orçamentária por unidade gestora"
        />

        <DiffTable
          data={despesaFuncao}
          title="Despesa por Função"
          description="Classificação funcional da despesa"
        />

        <DiffTable
          data={despesaFonteRecursos}
          title="Despesa por Fonte de Recursos"
          description="Distribuição por vinculação dos recursos"
        />

        <DiffTable
          data={despesaNatureza}
          title="Despesa por Natureza"
          description="Categoria econômica, grupo e natureza da despesa"
        />
      </div>
    </div>
  );
}
