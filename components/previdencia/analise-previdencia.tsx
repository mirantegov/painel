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
  TOTAL_PARTICIPANTES_ATIVOS,
  TOTAL_APOSENTADOS,
  TOTAL_PENSIONISTAS,
  TOTAL_AUXILIOS,
  TOTAL_BENEFICIARIOS,
  RECEITA_TOTAL,
  DESPESA_TOTAL,
  SALDO_FUNDO,
  PATRIMONIO_LIQUIDO,
  PROVISOES_MATEMATICAS,
  RENTABILIDADE_ACUMULADA,
  META_ATUARIAL,
  INDICE_SOLVENCIA,
} from "@/lib/demo-previdencia";

const formatMillions = (value: number) =>
  `R$ ${(value / 1_000_000).toFixed(1)}M`;

const deficitOperacional = DESPESA_TOTAL - RECEITA_TOTAL;
const razaoAtivosPassivos = (
  TOTAL_PARTICIPANTES_ATIVOS / TOTAL_APOSENTADOS
).toFixed(1);
const coberturaMeses = (SALDO_FUNDO / DESPESA_TOTAL).toFixed(1);

const alertasPrevidencia = [
  {
    tipo: "warning" as const,
    titulo: "Déficit operacional corrente",
    categoria: "Finanças",
    descricao: `As despesas com benefícios (${formatMillions(DESPESA_TOTAL)}) superam as contribuições e investimentos (${formatMillions(RECEITA_TOTAL)}) em ${formatMillions(deficitOperacional)}. O déficit é coberto pelo patrimônio do fundo, mas exige planejamento atuarial de longo prazo.`,
  },
  {
    tipo: "warning" as const,
    titulo: "Índice de solvência abaixo de 100%",
    categoria: "Atuarial",
    descricao: `O índice de solvência de ${INDICE_SOLVENCIA}% indica que o patrimônio líquido (${formatMillions(PATRIMONIO_LIQUIDO)}) é inferior às provisões matemáticas (${formatMillions(PROVISOES_MATEMATICAS)}). Aportes adicionais podem ser necessários no médio prazo.`,
  },
  {
    tipo: "success" as const,
    titulo: "Rentabilidade acima da meta atuarial",
    categoria: "Investimentos",
    descricao: `A rentabilidade acumulada de ${RENTABILIDADE_ACUMULADA}% superou a meta atuarial de ${META_ATUARIAL}% em ${(RENTABILIDADE_ACUMULADA - META_ATUARIAL).toFixed(1)} pontos percentuais, contribuindo para a sustentabilidade do fundo.`,
  },
  {
    tipo: "info" as const,
    titulo: "Relação ativos/aposentados estável",
    categoria: "Demografia",
    descricao: `A proporção de ${razaoAtivosPassivos} servidores ativos por aposentado mantém-se dentro dos parâmetros aceitáveis. O monitoramento demográfico é essencial para projeções atuariais de longo prazo.`,
  },
];

export function AnalisePrevidencia() {
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
                <CardTitle>Análise Inteligente da Previdência</CardTitle>
                <CardDescription>
                  Insights gerados com base nos dados do RPPS Municipal
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Visão Geral */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-foreground leading-relaxed">
                O Regime Próprio de Previdência Social (RPPS) municipal conta
                com <strong>{TOTAL_PARTICIPANTES_ATIVOS.toLocaleString("pt-BR")} participantes ativos</strong> e{" "}
                <strong>{TOTAL_BENEFICIARIOS} beneficiários</strong> (
                {TOTAL_APOSENTADOS} aposentados, {TOTAL_PENSIONISTAS}{" "}
                pensionistas e {TOTAL_AUXILIOS} auxílios). O fundo apresenta{" "}
                <strong>
                  rentabilidade de {RENTABILIDADE_ACUMULADA}%
                </strong>{" "}
                acima da meta atuarial de {META_ATUARIAL}%, porém o{" "}
                <strong>
                  índice de solvência de {INDICE_SOLVENCIA}%
                </strong>{" "}
                indica necessidade de atenção à sustentabilidade de longo prazo.
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
                          Rentabilidade acima da meta atuarial:
                        </strong>{" "}
                        A carteira de investimentos obteve rentabilidade de{" "}
                        {RENTABILIDADE_ACUMULADA}%, superando a meta de{" "}
                        {META_ATUARIAL}% em{" "}
                        {(RENTABILIDADE_ACUMULADA - META_ATUARIAL).toFixed(1)}{" "}
                        pontos percentuais. O excesso contribui para reduzir o
                        déficit atuarial ao longo do tempo.
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
                          Fundo com cobertura de {coberturaMeses} meses:
                        </strong>{" "}
                        O saldo de {formatMillions(SALDO_FUNDO)} garante
                        cobertura operacional de aproximadamente{" "}
                        {coberturaMeses} meses de despesas, assegurando o
                        pagamento regular dos benefícios.
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
                          Base de participantes ativos sólida:
                        </strong>{" "}
                        Com {razaoAtivosPassivos} ativos por aposentado, a
                        relação demográfica mantém-se em patamar sustentável,
                        garantindo fluxo regular de contribuições ao fundo.
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
                          Déficit operacional corrente:
                        </strong>{" "}
                        As despesas com benefícios superam as receitas de
                        contribuições e investimentos em{" "}
                        {formatMillions(deficitOperacional)}, configurando
                        déficit operacional que pressiona o patrimônio do fundo.
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
                          Índice de solvência abaixo de 100%:
                        </strong>{" "}
                        O {INDICE_SOLVENCIA}% de solvência indica que o
                        patrimônio líquido não cobre integralmente as provisões
                        matemáticas, o que pode exigir aportes do ente
                        patrocinador no médio prazo.
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
                          Envelhecimento da base de participantes:
                        </strong>{" "}
                        A tendência de redução gradual na proporção
                        ativos/inativos requer revisão periódica do plano de
                        custeio para manter o equilíbrio atuarial do RPPS.
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
                        1. Revisar o plano de custeio
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Contratar avaliação atuarial atualizada para verificar
                        as alíquotas de contribuição do ente e dos servidores,
                        ajustando-as para garantir equilíbrio financeiro e
                        atuarial de longo prazo conforme exige a Portaria MTP
                        1.467/2022.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        2. Diversificar a carteira de investimentos
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Avaliar a inclusão de ativos de renda variável dentro
                        dos limites da Resolução CMN 4.963/2021 para potencializar
                        a rentabilidade e reduzir o déficit atuarial no médio
                        prazo.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        3. Implementar gestão de riscos atuariais
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Desenvolver modelos de projeção demográfica e financeira
                        com cenários de 10, 20 e 30 anos para subsidiar decisões
                        de custeio e comunicar riscos ao gestor municipal e ao
                        Conselho de Administração do RPPS.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        4. Reforçar controle de benefícios
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Realizar revisão periódica dos {TOTAL_BENEFICIARIOS}{" "}
                        benefícios ativos com recadastramento biométrico para
                        prevenir fraudes e garantir que apenas beneficiários
                        elegíveis recebam os pagamentos.
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
                      Com base nas tendências demográficas e financeiras atuais,
                      projeta-se a evolução do índice de solvência:
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-2xl font-bold text-green-600">96%</p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Otimista
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Solvência em 5 anos
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 text-center bg-primary/5">
                        <p className="text-2xl font-bold text-primary">89%</p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Provável
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Solvência em 5 anos
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-2xl font-bold text-amber-600">79%</p>
                        <p className="text-xs text-muted-foreground">
                          Cenário Conservador
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Solvência em 5 anos
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      * Projeções consideram tendência de crescimento do número
                      de aposentadorias, evolução da rentabilidade dos
                      investimentos e cenários de revisão do plano de custeio.
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
                    O RPPS municipal demonstra capacidade de pagamento no curto
                    prazo, com saldo de {formatMillions(SALDO_FUNDO)} e
                    rentabilidade de {RENTABILIDADE_ACUMULADA}% acima da meta
                    atuarial. Contudo, o déficit operacional de{" "}
                    {formatMillions(deficitOperacional)} e o índice de solvência
                    de {INDICE_SOLVENCIA}% demandam revisão do plano de custeio
                    e fortalecimento da gestão atuarial para garantir a
                    sustentabilidade de longo prazo dos benefícios previdenciários
                    dos servidores municipais.
                  </p>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Análise gerada em {new Date().toLocaleDateString("pt-BR")} às{" "}
                    {new Date().toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    | RPPS — Exercício 2025
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
              Indicadores de desempenho do RPPS Municipal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Índice de Solvência
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{INDICE_SOLVENCIA}%</span>
                  <Badge
                    variant="outline"
                    className="text-xs text-amber-600 border-amber-300"
                  >
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      strokeWidth={2}
                      className="size-3"
                    />
                    Atenção
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Patrimônio / Provisões matemáticas
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Rentabilidade
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {RENTABILIDADE_ACUMULADA}%
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    <HugeiconsIcon
                      icon={ArrowUp01Icon}
                      strokeWidth={2}
                      className="size-3"
                    />
                    Meta: {META_ATUARIAL}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Acima da meta atuarial
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Saldo do Fundo
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {formatMillions(SALDO_FUNDO)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Cobre {coberturaMeses} meses de despesas
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Relação Ativos/Aposentados
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{razaoAtivosPassivos}</span>
                  <Badge variant="secondary" className="text-xs">
                    ativos/aposent.
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {TOTAL_PARTICIPANTES_ATIVOS.toLocaleString("pt-BR")} ativos e{" "}
                  {TOTAL_APOSENTADOS} aposentados
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
          {alertasPrevidencia.map((alerta, index) => (
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
