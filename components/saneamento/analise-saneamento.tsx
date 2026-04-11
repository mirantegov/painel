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
  POPULACAO_TOTAL,
  POPULACAO_ATENDIDA_AGUA,
  POPULACAO_ATENDIDA_ESGOTO,
  COBERTURA_AGUA_PCT,
  COBERTURA_ESGOTO_PCT,
  INDICE_PERDA_AGUA_PCT,
  INADIMPLENCIA_PCT,
  PONTOS_CRITICOS_DRENAGEM,
  RECEITA_TOTAL_SANEAMENTO,
  DESPESA_OPERACIONAL_SANEAMENTO,
  INVESTIMENTO_OBRAS,
  LIGACOES_ATIVAS_AGUA,
  LIGACOES_ATIVAS_ESGOTO,
  VOLUME_PRODUZIDO_M3,
  VOLUME_FATURADO_M3,
} from "@/lib/demo-saneamento";

const formatMillions = (value: number) =>
  `R$ ${(value / 1_000_000).toFixed(1)}M`;

const formatNumber = (value: number) =>
  new Intl.NumberFormat("pt-BR").format(value);

const resultadoOperacional = RECEITA_TOTAL_SANEAMENTO - DESPESA_OPERACIONAL_SANEAMENTO;
const margemOperacional = (
  (resultadoOperacional / RECEITA_TOTAL_SANEAMENTO) *
  100
).toFixed(1);
const populacaoSemEsgoto = POPULACAO_TOTAL - POPULACAO_ATENDIDA_ESGOTO;
const perdaVolume = VOLUME_PRODUZIDO_M3 - VOLUME_FATURADO_M3;

const alertasSaneamento = [
  {
    tipo: "warning" as const,
    titulo: "Índice de perdas de água acima do limite SNIS",
    categoria: "Água",
    descricao: `O índice de perdas de ${INDICE_PERDA_AGUA_PCT}% supera o referencial do SNIS de 25%. O volume não faturado representa ${formatNumber(perdaVolume)} m³, equivalente a perdas financeiras significativas e pressão sobre os recursos hídricos.`,
  },
  {
    tipo: "warning" as const,
    titulo: "Cobertura de esgoto abaixo de 75%",
    categoria: "Esgoto",
    descricao: `Apenas ${COBERTURA_ESGOTO_PCT}% da população tem acesso ao sistema de esgotamento sanitário. Aproximadamente ${formatNumber(populacaoSemEsgoto)} habitantes ainda não são atendidos, representando risco sanitário e ambiental.`,
  },
  {
    tipo: "warning" as const,
    titulo: "Inadimplência elevada nas tarifas",
    categoria: "Financeiro",
    descricao: `O índice de inadimplência de ${INADIMPLENCIA_PCT}% impacta o equilíbrio financeiro do serviço. Recomenda-se intensificar ações de cobrança e avaliar renegociação para regularizar os ${formatNumber(LIGACOES_ATIVAS_AGUA)} usuários com pendências.`,
  },
  {
    tipo: "info" as const,
    titulo: `${PONTOS_CRITICOS_DRENAGEM} pontos críticos de drenagem identificados`,
    categoria: "Drenagem",
    descricao:
      "O mapeamento identificou pontos críticos de alagamento que precisam de intervenção. As obras de macrodrenagem em execução devem reduzir o número de ocorrências nas próximas chuvas.",
  },
  {
    tipo: "success" as const,
    titulo: "Cobertura de água acima de 93%",
    categoria: "Água",
    descricao: `${COBERTURA_AGUA_PCT}% da população (${formatNumber(POPULACAO_ATENDIDA_AGUA)} habitantes) já conta com abastecimento de água tratada. O resultado está acima da média nacional e reflete investimentos contínuos na rede de distribuição.`,
  },
];

export function AnaliseSaneamento() {
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
                <CardTitle>Análise Inteligente do Saneamento</CardTitle>
                <CardDescription>
                  Insights gerados com base nos indicadores do saneamento básico
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Visão Geral */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-foreground leading-relaxed">
                O sistema de saneamento básico municipal atende uma população de{" "}
                <strong>{formatNumber(POPULACAO_TOTAL)} habitantes</strong>, com{" "}
                <strong>cobertura de água de {COBERTURA_AGUA_PCT}%</strong> e{" "}
                <strong>cobertura de esgoto de {COBERTURA_ESGOTO_PCT}%</strong>.
                O principal desafio é o{" "}
                <strong>
                  índice de perdas de {INDICE_PERDA_AGUA_PCT}%
                </strong>{" "}
                — acima do referencial SNIS de 25% — e a expansão da rede de
                esgoto para os {formatNumber(populacaoSemEsgoto)} habitantes
                ainda sem cobertura. A operação gera resultado positivo de{" "}
                <strong>{formatMillions(resultadoOperacional)}</strong> (margem
                de {margemOperacional}%).
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
                          Alta cobertura de água tratada:
                        </strong>{" "}
                        Com {COBERTURA_AGUA_PCT}% de cobertura de
                        abastecimento, o município supera a média nacional de
                        84,9% (SNIS 2023), garantindo acesso à água potável para
                        a vasta maioria dos {formatNumber(POPULACAO_TOTAL)}{" "}
                        habitantes.
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
                          Resultado operacional positivo:
                        </strong>{" "}
                        A diferença entre receita ({formatMillions(RECEITA_TOTAL_SANEAMENTO)})
                        e despesa operacional ({formatMillions(DESPESA_OPERACIONAL_SANEAMENTO)})
                        gera superávit de {formatMillions(resultadoOperacional)},
                        viabilizando reinvestimento na expansão e manutenção do
                        sistema.
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
                          Investimentos em obras em andamento:
                        </strong>{" "}
                        {formatMillions(INVESTIMENTO_OBRAS)} estão sendo
                        investidos em obras de expansão e modernização do
                        sistema, indicando comprometimento com a universalização
                        do saneamento básico.
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
                          Perdas de água acima do limite aceitável:
                        </strong>{" "}
                        O índice de {INDICE_PERDA_AGUA_PCT}% supera o
                        referencial do SNIS. Cada 1% de redução nas perdas
                        equivale a {formatNumber(Math.round(VOLUME_PRODUZIDO_M3 / 100))}{" "}
                        m³/ano recuperados, representando ganho financeiro e
                        ambiental expressivo.
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
                          Déficit de cobertura de esgoto:
                        </strong>{" "}
                        Os {formatNumber(populacaoSemEsgoto)} habitantes sem
                        acesso ao esgotamento sanitário representam{" "}
                        {(100 - COBERTURA_ESGOTO_PCT).toFixed(1)}% da
                        população. A meta de universalização estabelecida pelo
                        Marco Legal do Saneamento (Lei 14.026/2020) requer
                        aceleração das obras.
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
                          Inadimplência elevada ({INADIMPLENCIA_PCT}%):
                        </strong>{" "}
                        O índice de inadimplência nas tarifas de água e esgoto
                        compromete o equilíbrio financeiro do serviço. Programas
                        de regularização e tarifa social podem mitigar o problema.
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
                        1. Programa de redução de perdas de água
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Implementar setorização da rede, substituição de
                        ramais e hidrômetros obsoletos e implantação de
                        telemedição para identificar e corrigir as perdas de{" "}
                        {INDICE_PERDA_AGUA_PCT}%, visando atingir o patamar de
                        25% em 3 anos.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        2. Acelerar expansão da rede de esgoto
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Priorizar obras de esgotamento sanitário nas áreas com
                        maior densidade populacional ainda sem cobertura, em
                        conformidade com o Plano Municipal de Saneamento Básico
                        e as metas da Lei 14.026/2020.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        3. Reduzir inadimplência com tarifa social
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Implantar ou ampliar programa de tarifa social para
                        famílias em vulnerabilidade, combinado com sistema de
                        cobrança proativa para reduzir a inadimplência de{" "}
                        {INADIMPLENCIA_PCT}% para menos de 10% em 24 meses.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        4. Intervir nos {PONTOS_CRITICOS_DRENAGEM} pontos críticos de drenagem
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Elaborar cronograma de intervenção prioritária nos
                        pontos críticos de alagamento mapeados, combinando obras
                        de macrodrenagem com medidas não-estruturais (limpeza de
                        bocas de lobo, desobstrução de galerias).
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
                      Com base no ritmo das obras e nos investimentos previstos,
                      projeta-se para os próximos 3 anos a evolução da cobertura
                      de esgoto:
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-2xl font-bold text-green-600">88%</p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Otimista
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cobertura Esgoto
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 text-center bg-primary/5">
                        <p className="text-2xl font-bold text-primary">82%</p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Provável
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cobertura Esgoto
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-2xl font-bold text-amber-600">77%</p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Conservador
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cobertura Esgoto
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      * Projeções considerando o ritmo atual das obras (
                      {formatMillions(INVESTIMENTO_OBRAS)} investidos), captação
                      de recursos federais e demanda de novas ligações.
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
                    O saneamento municipal apresenta desempenho positivo na
                    cobertura de água ({COBERTURA_AGUA_PCT}%) e equilíbrio
                    financeiro operacional (margem de {margemOperacional}%).
                    Os desafios prioritários são: reduzir as perdas de água de{" "}
                    {INDICE_PERDA_AGUA_PCT}% para o padrão SNIS de 25%, expandir
                    a rede de esgoto para universalização até 2033 (Marco Legal),
                    e reduzir a inadimplência de {INADIMPLENCIA_PCT}%. Com os
                    investimentos em andamento ({formatMillions(INVESTIMENTO_OBRAS)}),
                    o município está no caminho correto, mas a aceleração das
                    obras e a eficiência operacional são determinantes para
                    cumprir as metas legais de universalização.
                  </p>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Análise gerada em {new Date().toLocaleDateString("pt-BR")} às{" "}
                    {new Date().toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    | Saneamento Básico — Exercício 2025
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
              Indicadores de desempenho do Saneamento Básico
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Cobertura de Água
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{COBERTURA_AGUA_PCT}%</span>
                  <Badge variant="secondary" className="text-xs">
                    <HugeiconsIcon
                      icon={ArrowUp01Icon}
                      strokeWidth={2}
                      className="size-3"
                    />
                    +1.2%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(POPULACAO_ATENDIDA_AGUA)} habitantes atendidos
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Cobertura de Esgoto
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {COBERTURA_ESGOTO_PCT}%
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    <HugeiconsIcon
                      icon={ArrowUp01Icon}
                      strokeWidth={2}
                      className="size-3"
                    />
                    +3.5%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Meta 2033: 99% (Marco Legal)
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Perdas de Água
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {INDICE_PERDA_AGUA_PCT}%
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs text-amber-600 border-amber-300"
                  >
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      strokeWidth={2}
                      className="size-3"
                    />
                    Ref. SNIS: 25%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(perdaVolume)} m³ não faturados
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Margem Operacional
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{margemOperacional}%</span>
                  <Badge variant="secondary" className="text-xs">
                    <HugeiconsIcon
                      icon={ArrowUp01Icon}
                      strokeWidth={2}
                      className="size-3"
                    />
                    Superávit
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Resultado: {formatMillions(resultadoOperacional)}
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
          {alertasSaneamento.map((alerta, index) => (
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
