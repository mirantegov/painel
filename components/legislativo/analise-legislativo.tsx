"use client";

import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BulbIcon,
  Flag01Icon,
  AlertCircleIcon,
  Alert02Icon,
  CheckmarkCircle02Icon,
  ChartLineData02Icon,
  InformationCircleIcon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import {
  ORCAMENTO_LEGISLATIVO,
  DESPESA_EMPENHADA_LEGISLATIVO,
  GASTO_PESSOAL_PORCENTO,
  LIMITE_GASTO_PESSOAL,
  TOTAL_DIARIAS_LEGISLATIVO,
  QUANTIDADE_DIARIAS,
  DATA_VEREADORES,
} from "@/lib/demo-legislativo";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );

const formatMillions = (value: number) =>
  `R$ ${(value / 1_000_000).toFixed(1)}M`;

const execucaoOrcamentaria = (
  (DESPESA_EMPENHADA_LEGISLATIVO / ORCAMENTO_LEGISLATIVO) *
  100
).toFixed(1);

const saldoDisponivel = ORCAMENTO_LEGISLATIVO - DESPESA_EMPENHADA_LEGISLATIVO;

const mediaDiaria = (TOTAL_DIARIAS_LEGISLATIVO / QUANTIDADE_DIARIAS).toFixed(
  2,
);

const alertasLegislativo = [
  {
    tipo: "warning" as const,
    titulo: "Gastos com Pessoal próximos do limite",
    categoria: "Finanças",
    descricao: `O percentual de gastos com pessoal atingiu ${GASTO_PESSOAL_PORCENTO}% do orçamento, próximo ao limite legal de ${LIMITE_GASTO_PESSOAL}%. Monitoramento contínuo é necessário para evitar extrapolação.`,
  },
  {
    tipo: "info" as const,
    titulo: "Execução orçamentária no ritmo previsto",
    categoria: "Orçamento",
    descricao: `${execucaoOrcamentaria}% do orçamento anual de ${formatCurrency(ORCAMENTO_LEGISLATIVO)} já foi empenhado. O saldo disponível de ${formatMillions(saldoDisponivel)} está dentro do planejado para o período.`,
  },
  {
    tipo: "success" as const,
    titulo: "Câmara abaixo do limite constitucional de gastos",
    categoria: "LRF",
    descricao:
      "Os gastos totais da Câmara Municipal estão dentro do limite de 7% da receita municipal fixado pela Lei de Responsabilidade Fiscal, garantindo conformidade legal.",
  },
  {
    tipo: "info" as const,
    titulo: "Diárias: valor médio dentro do esperado",
    categoria: "Controle",
    descricao: `Foram pagas ${QUANTIDADE_DIARIAS} diárias no período, totalizando ${formatCurrency(TOTAL_DIARIAS_LEGISLATIVO)} (média de R$ ${mediaDiaria} por diária). Os valores estão de acordo com a tabela aprovada pela Mesa Diretora.`,
  },
];

export function AnaliseLesgislativo() {
  return (
    <div className="space-y-6">
      {/* ======================================================= */}
      {/* SEPARADOR ANÁLISES                                       */}
      {/* ======================================================= */}
      <div className="relative py-4">
        <Separator />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-muted px-4 dark:bg-background">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Análises
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Análise Inteligente */}
        <Card className="border-l-4 border-l-primary bg-gradient-to-br from-primary/5 via-background to-background">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <HugeiconsIcon
                  icon={BulbIcon}
                  strokeWidth={2}
                  className="size-5 text-primary"
                />
              </div>
              <div>
                <CardTitle>Análise Inteligente do Legislativo</CardTitle>
                <CardDescription>
                  Insights gerados com base nos dados da Câmara Municipal
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Visão Geral */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-foreground leading-relaxed">
                A Câmara Municipal, composta por{" "}
                <strong>{DATA_VEREADORES.length} vereadores</strong>, apresenta
                desempenho legislativo consistente na gestão 2025-2028. O
                orçamento anual de{" "}
                <strong>{formatCurrency(ORCAMENTO_LEGISLATIVO)}</strong> está
                com execução de{" "}
                <strong>{execucaoOrcamentaria}%</strong>, dentro do ritmo
                esperado. O percentual de gastos com pessoal atingiu{" "}
                <strong>{GASTO_PESSOAL_PORCENTO}%</strong>, próximo ao limite
                legal de {LIMITE_GASTO_PESSOAL}%, exigindo atenção nos próximos
                meses.
              </p>
            </div>

            <Separator />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="destaques">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Flag01Icon}
                      strokeWidth={2}
                      className="size-4 text-green-600"
                    />
                    <span>Pontos de Destaque Positivo</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-6">
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-green-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Execução orçamentária em dia:
                        </strong>{" "}
                        Com {execucaoOrcamentaria}% do orçamento empenhado, a
                        Câmara mantém ritmo de execução alinhado ao calendário
                        anual, demonstrando planejamento financeiro adequado.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-green-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Conformidade com a LRF:
                        </strong>{" "}
                        Os gastos totais da Câmara estão dentro do limite de 7%
                        da receita municipal previsto na Lei de Responsabilidade
                        Fiscal, garantindo conformidade legal plena.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-green-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Produção legislativa ativa:
                        </strong>{" "}
                        A câmara mantém proposituras em tramitação regular, com
                        comissões permanentes e temporárias ativas, assegurando
                        o exercício pleno das funções fiscalizadora e
                        legislativa.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="atencao">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={AlertCircleIcon}
                      strokeWidth={2}
                      className="size-4 text-amber-600"
                    />
                    <span>Pontos de Atenção</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-6">
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-amber-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Gastos com pessoal próximos do limite:
                        </strong>{" "}
                        O percentual de {GASTO_PESSOAL_PORCENTO}% está a apenas{" "}
                        {(LIMITE_GASTO_PESSOAL - GASTO_PESSOAL_PORCENTO).toFixed(
                          1,
                        )}
                        % do limite legal de {LIMITE_GASTO_PESSOAL}%. Novos
                        ingressos ou reajustes de pessoal devem ser avaliados
                        com cautela.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-amber-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Controle de diárias e despesas de representação:
                        </strong>{" "}
                        O volume de {QUANTIDADE_DIARIAS} diárias pagas totaliza{" "}
                        {formatCurrency(TOTAL_DIARIAS_LEGISLATIVO)}, com média
                        de R$ {mediaDiaria} por diária. Recomenda-se revisão
                        periódica dos critérios de concessão.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        strokeWidth={2}
                        className="size-4 mt-0.5 text-amber-600 shrink-0"
                      />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Saldo disponível deve ser planejado:
                        </strong>{" "}
                        Os {formatMillions(saldoDisponivel)} restantes do
                        orçamento precisam de planejamento adequado para
                        evitar acúmulo de despesas no último trimestre.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="recomendacoes">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={BulbIcon}
                      strokeWidth={2}
                      className="size-4 text-blue-600"
                    />
                    <span>Recomendações Estratégicas</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-6">
                    <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        1. Monitorar limite de pessoal mensalmente
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Implementar alerta automático quando o percentual de
                        gastos com pessoal ultrapassar 68%, permitindo ação
                        preventiva antes de atingir o limite legal de{" "}
                        {LIMITE_GASTO_PESSOAL}%.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        2. Elaborar cronograma de execução do saldo
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Distribuir o saldo de {formatMillions(saldoDisponivel)}{" "}
                        ao longo dos próximos meses de forma planejada,
                        priorizando investimentos em tecnologia e transparência
                        legislativa.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        3. Revisar política de diárias e ajudas de custo
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Atualizar resolução interna sobre diárias com critérios
                        objetivos de concessão e priorizar uso de videoconferência
                        para reduzir deslocamentos de menor necessidade.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        4. Ampliar transparência legislativa
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Publicar relatórios mensais de execução orçamentária no
                        portal de transparência da Câmara, incluindo evolução de
                        proposituras e registro de presenças nas sessões.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="projecoes">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={ChartLineData02Icon}
                      strokeWidth={2}
                      className="size-4 text-purple-600"
                    />
                    <span>Projeções e Cenários</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-6">
                    <p className="text-sm text-muted-foreground">
                      Com base no ritmo atual de execução e no histórico de
                      despesas da Câmara, projeta-se para o encerramento do
                      exercício:
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-2xl font-bold text-green-600">96%</p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Otimista
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Execução Final
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 text-center bg-primary/5">
                        <p className="text-2xl font-bold text-primary">92%</p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Provável
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Execução Final
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-2xl font-bold text-amber-600">87%</p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Conservador
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Execução Final
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      * Projeções baseadas no ritmo de execução atual (
                      {execucaoOrcamentaria}%) e na sazonalidade histórica das
                      despesas do legislativo municipal.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator />

            {/* Conclusão */}
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex gap-3">
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  strokeWidth={2}
                  className="size-5 text-primary shrink-0 mt-0.5"
                />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Conclusão da Análise
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A Câmara Municipal apresenta gestão orçamentária responsável,
                    com execução de {execucaoOrcamentaria}% e conformidade com
                    os limites da LRF. O principal ponto de atenção é o
                    percentual de gastos com pessoal ({GASTO_PESSOAL_PORCENTO}%),
                    que se encontra próximo ao limite legal de{" "}
                    {LIMITE_GASTO_PESSOAL}%. Com as ações de monitoramento e
                    planejamento recomendadas, a Câmara tem condições de encerrar
                    o exercício dentro dos parâmetros legais e com alto índice de
                    execução orçamentária.
                  </p>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Análise gerada em {new Date().toLocaleDateString("pt-BR")} às{" "}
                    {new Date().toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    | Câmara Municipal — Gestão 2025-2028
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo Analítico */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo Analítico</CardTitle>
            <CardDescription>
              Indicadores de desempenho da Câmara Municipal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Execução Orçamentária
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {execucaoOrcamentaria}%
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    <HugeiconsIcon
                      icon={ArrowUp01Icon}
                      strokeWidth={2}
                      className="size-3"
                    />
                    +3.2%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Do orçamento anual empenhado
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Gastos com Pessoal
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {GASTO_PESSOAL_PORCENTO}%
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs text-amber-600 border-amber-300"
                  >
                    Limite: {LIMITE_GASTO_PESSOAL}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Do orçamento — próximo ao limite legal
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Saldo Disponível
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {formatMillions(saldoDisponivel)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {(
                    (saldoDisponivel / ORCAMENTO_LEGISLATIVO) *
                    100
                  ).toFixed(1)}
                  % do orçamento a executar
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Média por Diária
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    R$ {mediaDiaria}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      strokeWidth={2}
                      className="size-3"
                    />
                    -5%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {QUANTIDADE_DIARIAS} diárias no período
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alertas e Notificações */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            Alertas e Notificações
          </h3>
          {alertasLegislativo.map((alerta, index) => (
            <Alert
              key={index}
              variant={alerta.tipo === "warning" ? "destructive" : "default"}
            >
              <HugeiconsIcon
                icon={
                  alerta.tipo === "warning"
                    ? Alert02Icon
                    : alerta.tipo === "success"
                      ? CheckmarkCircle02Icon
                      : InformationCircleIcon
                }
                strokeWidth={2}
                className="size-4"
              />
              <AlertTitle className="flex items-center gap-2">
                {alerta.titulo}
                <Badge variant="outline" className="text-xs">
                  {alerta.categoria}
                </Badge>
              </AlertTitle>
              <AlertDescription>{alerta.descricao}</AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
    </div>
  );
}
