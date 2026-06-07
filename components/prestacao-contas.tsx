"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Alert02Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Target01Icon,
  BulbIcon,
  ArrowUp01Icon,
  SecurityCheckIcon,
  Download01Icon,
  RefreshIcon,
  Calendar01Icon,
  Flag01Icon,
  Building01Icon,
  Clock01Icon,
  FilterIcon,
  ChartLineData02Icon,
  Cancel01Icon,
  Search01Icon,
  FileValidationIcon,
} from "@hugeicons/core-free-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { KpiCard } from "@/components/ui/kpi-card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  dadosAgenda,
  tiposObrigacao,
  entidadesAgenda,
  pendenciasAgenda,
  vencimentosAgenda,
  historicoAgenda,
  type StatusObrigacao,
  type EntidadeAgenda,
  type TipoObrigacao,
  type VencimentoAgenda,
} from "@/lib/demo-agenda-obrigacoes";
import {
  dadosMSC,
  entidadeMSC,
  historicoMSC,
} from "@/lib/demo-msc";

// ==========================================
// DADOS DO CAUC
// ==========================================

type SituacaoCAUC = "Regular" | "A Comprovar" | "Irregular" | "Desativado";

interface ItemCAUC {
  codigo: string;
  descricao: string;
  fonte: string;
  situacao: SituacaoCAUC;
  validade: string;
  subitens?: ItemCAUC[];
}

interface GrupoCAUC {
  numero: string;
  titulo: string;
  itens: ItemCAUC[];
}

const dadosMunicipio = {
  nome: "Prefeitura Municipal de Exemplo",
  cnpj: "00.000.000/0001-00",
  uf: "AM",
  dataExtrato: "05/04/2025",
  horaExtrato: "02:45",
  exercicio: "2025",
};

const gruposCAUC: GrupoCAUC[] = [
  {
    numero: "I",
    titulo: "Obrigações de Adimplência Financeira",
    itens: [
      {
        codigo: "1.1",
        descricao:
          "Regularidade quanto a Tributos, a Contribuições Previdenciárias Federais e à Dívida Ativa da União",
        fonte: "PGFN/RFB",
        situacao: "Regular",
        validade: "15/06/2025",
      },
      {
        codigo: "1.2",
        descricao: "Regularidade no pagamento de precatórios judiciais",
        fonte: "Transferegov.br",
        situacao: "Regular",
        validade: "31/12/2025",
      },
      {
        codigo: "1.3",
        descricao: "Regularidade quanto a Contribuições para o FGTS",
        fonte: "CAIXA",
        situacao: "A Comprovar",
        validade: "(*)",
      },
      {
        codigo: "1.4",
        descricao:
          "Regularidade em relação à Adimplência Financeira em Empréstimos e Financiamentos concedidos pela União",
        fonte: "SAHEM",
        situacao: "Regular",
        validade: "30/09/2025",
      },
      {
        codigo: "1.5",
        descricao: "Regularidade perante o Poder Público Federal",
        fonte: "CADIN",
        situacao: "Regular",
        validade: "05/04/2025",
      },
    ],
  },
  {
    numero: "II",
    titulo: "Adimplemento na Prestação de Contas de Convênios",
    itens: [
      {
        codigo: "2.1",
        descricao:
          "Regularidade quanto à Prestação de Contas de Recursos Federais recebidos anteriormente",
        fonte: "",
        situacao: "A Comprovar",
        validade: "(*)",
        subitens: [
          {
            codigo: "2.1.1",
            descricao: "SIAFI/Subsistema Transferências",
            fonte: "SIAFI/Subsistema Transferências",
            situacao: "Regular",
            validade: "05/04/2025",
          },
          {
            codigo: "2.1.2",
            descricao: "Transferegov.br",
            fonte: "Transferegov.br",
            situacao: "Irregular",
            validade: "(*)",
          },
        ],
      },
    ],
  },
  {
    numero: "III",
    titulo: "Obrigações de Transparência",
    itens: [
      {
        codigo: "3.1",
        descricao: "Relatório de Gestão Fiscal - RGF",
        fonte: "",
        situacao: "A Comprovar",
        validade: "(*)",
        subitens: [
          {
            codigo: "3.1.1",
            descricao: "Publicação do Relatório de Gestão Fiscal",
            fonte: "SICONFI",
            situacao: "Regular",
            validade: "30/06/2025",
          },
          {
            codigo: "3.1.2",
            descricao:
              "Encaminhamento do Relatório de Gestão Fiscal ao Siconfi",
            fonte: "SICONFI",
            situacao: "Regular",
            validade: "30/06/2025",
          },
        ],
      },
      {
        codigo: "3.2",
        descricao: "Relatório Resumido de Execução Orçamentária - RREO",
        fonte: "",
        situacao: "A Comprovar",
        validade: "(*)",
        subitens: [
          {
            codigo: "3.2.1",
            descricao:
              "Publicação do Relatório Resumido de Execução Orçamentária - RREO",
            fonte: "SICONFI",
            situacao: "Regular",
            validade: "30/05/2025",
          },
          {
            codigo: "3.2.2",
            descricao:
              "Encaminhamento do Relatório Resumido de Execução Orçamentária ao Siconfi",
            fonte: "SICONFI",
            situacao: "Regular",
            validade: "30/05/2025",
          },
          {
            codigo: "3.2.3",
            descricao:
              "Encaminhamento do Anexo 8 do Relatório Resumido de Execução Orçamentária ao Siope",
            fonte: "SIOPE",
            situacao: "A Comprovar",
            validade: "(*)",
          },
          {
            codigo: "3.2.4",
            descricao:
              "Encaminhamento do Anexo 12 do Relatório Resumido de Execução Orçamentária ao Siops",
            fonte: "SIOPS",
            situacao: "Desativado",
            validade: "[Desativado]",
          },
        ],
      },
      {
        codigo: "3.3",
        descricao: "Encaminhamento das Contas Anuais",
        fonte: "SICONFI",
        situacao: "A Comprovar",
        validade: "(*)",
      },
      {
        codigo: "3.4",
        descricao: "Encaminhamento da Matriz de Saldos Contábeis",
        fonte: "",
        situacao: "A Comprovar",
        validade: "(*)",
        subitens: [
          {
            codigo: "3.4.1",
            descricao: "Encaminhamento da Matriz de Saldos Contábeis Mensal",
            fonte: "SICONFI",
            situacao: "A Comprovar",
            validade: "(*)",
          },
          {
            codigo: "3.4.2",
            descricao:
              "Encaminhamento da Matriz de Saldos Contábeis de Encerramento",
            fonte: "SICONFI",
            situacao: "A Comprovar",
            validade: "(*)",
          },
        ],
      },
      {
        codigo: "3.5",
        descricao:
          "Encaminhamento de Informações para o Cadastro da Dívida Pública - CDP",
        fonte: "SADIPEM",
        situacao: "Regular",
        validade: "30/06/2025",
      },
      {
        codigo: "3.6",
        descricao:
          "Transparência da execução orçamentária e financeira em meio eletrônico de acesso público",
        fonte: "Transferegov.br",
        situacao: "Regular",
        validade: "31/12/2025",
      },
      {
        codigo: "3.7",
        descricao:
          "Adoção de Sistema Integrado de Administração Financeira e Controle - Siafic",
        fonte: "Transferegov.br",
        situacao: "A Comprovar",
        validade: "(*)",
      },
    ],
  },
  {
    numero: "IV",
    titulo: "Adimplemento de Obrigações Constitucionais ou Legais",
    itens: [
      {
        codigo: "4.1",
        descricao: "Exercício da Plena Competência Tributária",
        fonte: "SICONFI",
        situacao: "Regular",
        validade: "31/12/2025",
      },
      {
        codigo: "4.2",
        descricao: "Regularidade Previdenciária",
        fonte: "CADPREV",
        situacao: "Irregular",
        validade: "(*)",
      },
    ],
  },
  {
    numero: "V",
    titulo: "Cumprimento de Limites Constitucionais e Legais",
    itens: [
      {
        codigo: "5.1",
        descricao: "Aplicação Mínima de recursos em Educação",
        fonte: "SIOPE",
        situacao: "Regular",
        validade: "31/12/2025",
      },
      {
        codigo: "5.2",
        descricao: "Aplicação Mínima de recursos em Saúde",
        fonte: "SIOPS",
        situacao: "Regular",
        validade: "31/12/2025",
      },
      {
        codigo: "5.3",
        descricao: "Limite de Despesas com Parcerias Público-Privadas - PPP",
        fonte: "SICONFI",
        situacao: "Regular",
        validade: "31/12/2025",
      },
      {
        codigo: "5.4",
        descricao:
          "Limite de operações de crédito, inclusive por antecipação de receita",
        fonte: "SICONFI",
        situacao: "Regular",
        validade: "31/12/2025",
      },
      {
        codigo: "5.5",
        descricao:
          "Regularidade na aplicação mínima do Fundeb para pagamento de profissionais da educação básica",
        fonte: "SIOPE",
        situacao: "A Comprovar",
        validade: "(*)",
      },
      {
        codigo: "5.6",
        descricao:
          "Regularidade na aplicação mínima da complementação da União ao Fundeb em despesas de capital",
        fonte: "SIOPE",
        situacao: "A Comprovar",
        validade: "(*)",
      },
      {
        codigo: "5.7",
        descricao:
          "Regularidade na aplicação de 50% da complementação VAAT do Fundeb na educação infantil",
        fonte: "SIOPE",
        situacao: "A Comprovar",
        validade: "(*)",
      },
    ],
  },
];

// Histórico de evolução CAUC
const historicoCAUC = [
  {
    periodo: "Out/2024",
    regulares: 16,
    aComprovar: 8,
    irregulares: 3,
    desativados: 1,
  },
  {
    periodo: "Nov/2024",
    regulares: 17,
    aComprovar: 7,
    irregulares: 3,
    desativados: 1,
  },
  {
    periodo: "Dez/2024",
    regulares: 18,
    aComprovar: 7,
    irregulares: 2,
    desativados: 1,
  },
  {
    periodo: "Jan/2025",
    regulares: 17,
    aComprovar: 8,
    irregulares: 2,
    desativados: 1,
  },
  {
    periodo: "Fev/2025",
    regulares: 18,
    aComprovar: 7,
    irregulares: 2,
    desativados: 1,
  },
  {
    periodo: "Mar/2025",
    regulares: 18,
    aComprovar: 8,
    irregulares: 1,
    desativados: 1,
  },
  {
    periodo: "Abr/2025",
    regulares: 15,
    aComprovar: 10,
    irregulares: 2,
    desativados: 1,
  },
];

// ==========================================
// DADOS CONTAS TCE/PR
// ==========================================

type ParecerTCE =
  | "Regular"
  | "Regular com Ressalvas"
  | "Irregular"
  | "Em Análise"
  | "Pendente";

interface ContaTCE {
  exercicio: number;
  processo: string;
  dataProtocolo: string;
  dataJulgamento: string;
  parecer: ParecerTCE;
  decretoLegislativo: string;
  dataDecreto: string;
}

const contasTCE: ContaTCE[] = [
  {
    exercicio: 2013,
    processo: "264420/14",
    dataProtocolo: "31/07/2015",
    dataJulgamento: "06/08/2015",
    parecer: "Regular",
    decretoLegislativo: "Decreto Legislativo nº001/2015",
    dataDecreto: "05/10/2015",
  },
  {
    exercicio: 2014,
    processo: "238920/15",
    dataProtocolo: "28/08/2017",
    dataJulgamento: "29/08/2017",
    parecer: "Regular com Ressalvas",
    decretoLegislativo: "Decreto Legislativo nº006/2017",
    dataDecreto: "14/11/2017",
  },
  {
    exercicio: 2015,
    processo: "247396/16",
    dataProtocolo: "09/11/2016",
    dataJulgamento: "18/11/2016",
    parecer: "Regular",
    decretoLegislativo: "Decreto Legislativo nº001/2017",
    dataDecreto: "19/06/2017",
  },
  {
    exercicio: 2016,
    processo: "252253/17",
    dataProtocolo: "03/03/2020",
    dataJulgamento: "05/03/2020",
    parecer: "Regular com Ressalvas",
    decretoLegislativo: "Decreto Legislativo nº004/2020",
    dataDecreto: "26/05/2020",
  },
  {
    exercicio: 2017,
    processo: "270115/18",
    dataProtocolo: "11/12/2018",
    dataJulgamento: "18/01/2019",
    parecer: "Regular",
    decretoLegislativo: "Decreto Legislativo nº001/2019",
    dataDecreto: "21/02/2019",
  },
  {
    exercicio: 2018,
    processo: "187009/19",
    dataProtocolo: "30/10/2019",
    dataJulgamento: "31/10/2019",
    parecer: "Regular",
    decretoLegislativo: "Decreto Legislativo nº001/2020",
    dataDecreto: "17/04/2020",
  },
  {
    exercicio: 2019,
    processo: "204213/20",
    dataProtocolo: "01/10/2020",
    dataJulgamento: "06/10/2020",
    parecer: "Regular",
    decretoLegislativo: "Decreto Legislativo nº005/2020",
    dataDecreto: "14/12/2020",
  },
  {
    exercicio: 2020,
    processo: "159211/21",
    dataProtocolo: "31/03/2022",
    dataJulgamento: "04/04/2022",
    parecer: "Em Análise",
    decretoLegislativo: "",
    dataDecreto: "",
  },
  {
    exercicio: 2021,
    processo: "176853/22",
    dataProtocolo: "17/04/2023",
    dataJulgamento: "04/08/2023",
    parecer: "Regular",
    decretoLegislativo: "Decreto Legislativo nº002/2023",
    dataDecreto: "24/10/2023",
  },
  {
    exercicio: 2022,
    processo: "177500/23",
    dataProtocolo: "10/04/2024",
    dataJulgamento: "24/05/2024",
    parecer: "Regular",
    decretoLegislativo: "Decreto Legislativo nº002/2024",
    dataDecreto: "27/08/2024",
  },
  {
    exercicio: 2023,
    processo: "187240/24",
    dataProtocolo: "29/01/2025",
    dataJulgamento: "06/02/2025",
    parecer: "Regular",
    decretoLegislativo: "Decreto Legislativo nº001/2025",
    dataDecreto: "22/04/2025",
  },
  {
    exercicio: 2024,
    processo: "149083/25",
    dataProtocolo: "",
    dataJulgamento: "",
    parecer: "Pendente",
    decretoLegislativo: "",
    dataDecreto: "",
  },
  {
    exercicio: 2025,
    processo: "148617/26",
    dataProtocolo: "",
    dataJulgamento: "",
    parecer: "Pendente",
    decretoLegislativo: "",
    dataDecreto: "",
  },
];

function getParecerBadge(parecer: ParecerTCE) {
  switch (parecer) {
    case "Regular":
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
          Regular
        </Badge>
      );
    case "Regular com Ressalvas":
      return (
        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
          Regular com Ressalvas
        </Badge>
      );
    case "Irregular":
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
          Irregular
        </Badge>
      );
    case "Em Análise":
      return (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
          Em Análise
        </Badge>
      );
    case "Pendente":
      return (
        <Badge
          variant="outline"
          className="text-red-600 border-red-200 dark:border-red-800"
        >
          Pendente
        </Badge>
      );
  }
}

function getParecerIcon(parecer: ParecerTCE) {
  switch (parecer) {
    case "Regular":
      return (
        <HugeiconsIcon
          icon={CheckmarkCircle02Icon}
          strokeWidth={2}
          className="size-4 text-green-600"
        />
      );
    case "Regular com Ressalvas":
      return (
        <HugeiconsIcon
          icon={InformationCircleIcon}
          strokeWidth={2}
          className="size-4 text-amber-600"
        />
      );
    case "Irregular":
      return (
        <HugeiconsIcon
          icon={Alert02Icon}
          strokeWidth={2}
          className="size-4 text-red-600"
        />
      );
    case "Em Análise":
      return (
        <HugeiconsIcon
          icon={Search01Icon}
          strokeWidth={2}
          className="size-4 text-blue-600"
        />
      );
    case "Pendente":
      return (
        <HugeiconsIcon
          icon={Cancel01Icon}
          strokeWidth={2}
          className="size-4 text-red-500"
        />
      );
  }
}

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

function contarItensPorSituacao(
  grupos: GrupoCAUC[],
): Record<SituacaoCAUC, number> {
  const contagem: Record<SituacaoCAUC, number> = {
    Regular: 0,
    "A Comprovar": 0,
    Irregular: 0,
    Desativado: 0,
  };

  function contarItem(item: ItemCAUC) {
    if (item.subitens && item.subitens.length > 0) {
      item.subitens.forEach((sub) => {
        contagem[sub.situacao]++;
      });
    } else {
      contagem[item.situacao]++;
    }
  }

  grupos.forEach((grupo) => {
    grupo.itens.forEach((item) => contarItem(item));
  });

  return contagem;
}

function getSituacaoBadge(situacao: SituacaoCAUC) {
  switch (situacao) {
    case "Regular":
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
          Regular
        </Badge>
      );
    case "A Comprovar":
      return (
        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
          A Comprovar
        </Badge>
      );
    case "Irregular":
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
          Irregular
        </Badge>
      );
    case "Desativado":
      return (
        <Badge variant="outline" className="text-muted-foreground">
          Desativado
        </Badge>
      );
  }
}

function getSituacaoIcon(situacao: SituacaoCAUC) {
  switch (situacao) {
    case "Regular":
      return (
        <div className="flex size-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            strokeWidth={2}
            className="size-4 text-green-600"
          />
        </div>
      );
    case "A Comprovar":
      return (
        <div className="flex size-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
          <HugeiconsIcon
            icon={InformationCircleIcon}
            strokeWidth={2}
            className="size-4 text-amber-600"
          />
        </div>
      );
    case "Irregular":
      return (
        <div className="flex size-6 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <HugeiconsIcon
            icon={Alert02Icon}
            strokeWidth={2}
            className="size-4 text-red-600"
          />
        </div>
      );
    case "Desativado":
      return (
        <div className="flex size-6 items-center justify-center rounded-full bg-muted">
          <HugeiconsIcon
            icon={Clock01Icon}
            strokeWidth={2}
            className="size-4 text-muted-foreground"
          />
        </div>
      );
  }
}

function getGrupoSituacaoResumo(grupo: GrupoCAUC) {
  let regular = 0;
  let aComprovar = 0;
  let irregular = 0;
  let desativado = 0;

  grupo.itens.forEach((item) => {
    if (item.subitens && item.subitens.length > 0) {
      item.subitens.forEach((sub) => {
        if (sub.situacao === "Regular") regular++;
        else if (sub.situacao === "A Comprovar") aComprovar++;
        else if (sub.situacao === "Irregular") irregular++;
        else desativado++;
      });
    } else {
      if (item.situacao === "Regular") regular++;
      else if (item.situacao === "A Comprovar") aComprovar++;
      else if (item.situacao === "Irregular") irregular++;
      else desativado++;
    }
  });

  return {
    regular,
    aComprovar,
    irregular,
    desativado,
    total: regular + aComprovar + irregular + desativado,
  };
}

// ==========================================
// GRÁFICOS
// ==========================================

function EvolucaoCAUCChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HugeiconsIcon
            icon={ChartLineData02Icon}
            strokeWidth={2}
            className="size-5"
          />
          Evolução Mensal da Situação CAUC
        </CardTitle>
        <CardDescription>
          Distribuição dos itens por situação ao longo dos últimos meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              regulares: { label: "Regular", color: "var(--chart-2)" },
              aComprovar: { label: "A Comprovar", color: "var(--chart-4)" },
              irregulares: { label: "Irregular", color: "var(--chart-1)" },
              desativados: { label: "Desativado", color: "var(--chart-5)" },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <AreaChart data={historicoCAUC} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="periodo"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="regulares"
              type="monotone"
              stackId="cauc"
              fill="var(--color-regulares)"
              stroke="var(--color-regulares)"
              fillOpacity={0.4}
            />
            <Area
              dataKey="aComprovar"
              type="monotone"
              stackId="cauc"
              fill="var(--color-aComprovar)"
              stroke="var(--color-aComprovar)"
              fillOpacity={0.4}
            />
            <Area
              dataKey="irregulares"
              type="monotone"
              stackId="cauc"
              fill="var(--color-irregulares)"
              stroke="var(--color-irregulares)"
              fillOpacity={0.4}
            />
            <Area
              dataKey="desativados"
              type="monotone"
              stackId="cauc"
              fill="var(--color-desativados)"
              stroke="var(--color-desativados)"
              fillOpacity={0.4}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function ConformidadePorGrupoChart() {
  const dados = gruposCAUC.map((grupo) => {
    const resumo = getGrupoSituacaoResumo(grupo);
    return {
      grupo: `Grupo ${grupo.numero}`,
      regulares: resumo.regular,
      aComprovar: resumo.aComprovar,
      irregulares: resumo.irregular,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HugeiconsIcon
            icon={ChartLineData02Icon}
            strokeWidth={2}
            className="size-5"
          />
          Conformidade por Grupo CAUC
        </CardTitle>
        <CardDescription>
          Itens regulares, a comprovar e irregulares em cada grupo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              regulares: { label: "Regular", color: "var(--chart-2)" },
              aComprovar: { label: "A Comprovar", color: "var(--chart-4)" },
              irregulares: { label: "Irregular", color: "var(--chart-1)" },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <BarChart data={dados} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="grupo"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="regulares"
              stackId="grupo"
              fill="var(--color-regulares)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="aComprovar"
              stackId="grupo"
              fill="var(--color-aComprovar)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="irregulares"
              stackId="grupo"
              fill="var(--color-irregulares)"
              radius={[2, 2, 0, 0]}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// ==========================================
// AGENDA DE OBRIGAÇÕES — AUXILIARES
// ==========================================

function contarObrigacoes(entidades: EntidadeAgenda[], tipos: TipoObrigacao[]) {
  let emDia = 0;
  let naoAtendido = 0;
  let naoAplicavel = 0;

  entidades.forEach((entidade) => {
    tipos.forEach((tipo) => {
      const status = entidade.status[tipo.codigo];
      if (status === "Em dia") emDia++;
      else if (status === "Não atendido") naoAtendido++;
      else naoAplicavel++;
    });
  });

  const totalAplicavel = emDia + naoAtendido;
  return { emDia, naoAtendido, naoAplicavel, totalAplicavel };
}

function getStatusObrigacaoDot(status: StatusObrigacao) {
  switch (status) {
    case "Em dia":
      return <div className="size-3 rounded-full bg-green-500" />;
    case "Não atendido":
      return <div className="size-3 rounded-full bg-red-500" />;
    case "Não aplicável":
      return <div className="size-2.5 rounded-full bg-muted-foreground/30" />;
  }
}

function getVencimentoBadge(status: VencimentoAgenda["status"]) {
  switch (status) {
    case "Cumprido":
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
          Cumprido
        </Badge>
      );
    case "Próximo":
      return (
        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
          Próximo
        </Badge>
      );
    case "Pendente":
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
          Pendente
        </Badge>
      );
  }
}

function EvolucaoAgendaChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HugeiconsIcon
            icon={ChartLineData02Icon}
            strokeWidth={2}
            className="size-5"
          />
          Evolução da Conformidade da Agenda
        </CardTitle>
        <CardDescription>
          Percentual de obrigações em dia ao longo dos últimos meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              conformidade: {
                label: "Conformidade (%)",
                color: "var(--chart-2)",
              },
            } satisfies ChartConfig
          }
          className="h-[280px] w-full"
        >
          <AreaChart data={historicoAgenda} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="conformidade"
              type="monotone"
              fill="var(--color-conformidade)"
              stroke="var(--color-conformidade)"
              fillOpacity={0.4}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export function PrestacaoContas() {
  const [periodoSelecionado, setPeriodoSelecionado] = React.useState("2025");
  const [filtroSituacao, setFiltroSituacao] = React.useState<string>("todos");

  const contagem = contarItensPorSituacao(gruposCAUC);
  const totalItens =
    contagem["Regular"] +
    contagem["A Comprovar"] +
    contagem["Irregular"] +
    contagem["Desativado"];
  const totalAtivos = totalItens - contagem["Desativado"];
  const percentualRegular = Math.round(
    (contagem["Regular"] / totalAtivos) * 100,
  );

  const contagemAgenda = contarObrigacoes(entidadesAgenda, tiposObrigacao);
  const conformidadeAgenda =
    contagemAgenda.totalAplicavel > 0
      ? Math.round((contagemAgenda.emDia / contagemAgenda.totalAplicavel) * 100)
      : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Prestação de Contas
          </h2>
          <p className="text-muted-foreground">
            Acompanhamento de prestação de contas, CAUC e julgamento pelo TCE/PR
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={periodoSelecionado}
            onValueChange={setPeriodoSelecionado}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <HugeiconsIcon
                    icon={RefreshIcon}
                    strokeWidth={2}
                    className="size-4"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Atualizar extrato</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <HugeiconsIcon
                    icon={Download01Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Exportar PDF</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Info do Município */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <HugeiconsIcon
                  icon={Building01Icon}
                  strokeWidth={2}
                  className="size-5 text-primary"
                />
              </div>
              <div>
                <p className="font-semibold">{dadosMunicipio.nome}</p>
                <p className="text-sm text-muted-foreground">
                  CNPJ: {dadosMunicipio.cnpj} — UF: {dadosMunicipio.uf}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <HugeiconsIcon
                  icon={Calendar01Icon}
                  strokeWidth={2}
                  className="size-4"
                />
                <span>Data: {dadosMunicipio.dataExtrato}</span>
              </div>
              <div className="flex items-center gap-1">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  strokeWidth={2}
                  className="size-4"
                />
                <span>Hora: {dadosMunicipio.horaExtrato}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Abas Internas */}
      <Tabs defaultValue="cauc" className="space-y-6">
        <TabsList>
          <TabsTrigger value="cauc" className="gap-2">
            <HugeiconsIcon
              icon={SecurityCheckIcon}
              strokeWidth={2}
              className="size-4"
            />
            CAUC
          </TabsTrigger>
          <TabsTrigger value="tce" className="gap-2">
            <HugeiconsIcon
              icon={FileValidationIcon}
              strokeWidth={2}
              className="size-4"
            />
            Contas TCE/PR
          </TabsTrigger>
          <TabsTrigger value="agenda" className="gap-2">
            <HugeiconsIcon
              icon={Calendar01Icon}
              strokeWidth={2}
              className="size-4"
            />
            Agenda de Obrigações
          </TabsTrigger>
          <TabsTrigger value="msc" className="gap-2">
            <HugeiconsIcon
              icon={ChartLineData02Icon}
              strokeWidth={2}
              className="size-4"
            />
            MSC
          </TabsTrigger>
        </TabsList>

        {/* Tab: CAUC */}
        <TabsContent value="cauc" className="space-y-6">
          {/* KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <KpiCard
              iconElement={<div className="size-2 rounded-full bg-green-500" />}
              title="Regular"
              value={contagem["Regular"]}
              borderColor="border-l-green-500"
              footer={
                <div className="flex items-center gap-1">
                  <HugeiconsIcon
                    icon={ArrowUp01Icon}
                    strokeWidth={2}
                    className="size-3 text-green-600"
                  />
                  <span className="text-xs text-green-600 font-medium">
                    +2 vs. mês anterior
                  </span>
                </div>
              }
            />

            <KpiCard
              iconElement={<div className="size-2 rounded-full bg-amber-500" />}
              title="A Comprovar"
              value={contagem["A Comprovar"]}
              borderColor="border-l-amber-500"
              footer={
                <div className="flex items-center gap-1">
                  <HugeiconsIcon
                    icon={ArrowUp01Icon}
                    strokeWidth={2}
                    className="size-3 text-amber-600"
                  />
                  <span className="text-xs text-amber-600 font-medium">
                    +2 vs. mês anterior
                  </span>
                </div>
              }
            />

            <KpiCard
              iconElement={<div className="size-2 rounded-full bg-red-500" />}
              title="Irregular"
              value={contagem["Irregular"]}
              borderColor="border-l-red-500"
              footer={
                <div className="flex items-center gap-1">
                  <HugeiconsIcon
                    icon={ArrowUp01Icon}
                    strokeWidth={2}
                    className="size-3 text-red-600"
                  />
                  <span className="text-xs text-red-600 font-medium">
                    +1 vs. mês anterior
                  </span>
                </div>
              }
            />

            <KpiCard
              iconElement={
                <div className="size-2 rounded-full bg-muted-foreground" />
              }
              title="Desativado"
              value={contagem["Desativado"]}
              borderColor="border-l-zinc-500"
              footer={
                <p className="text-xs text-muted-foreground">Sem alteração</p>
              }
            />

            <KpiCard
              icon={Target01Icon}
              title="Conformidade"
              value={<>{percentualRegular}%</>}
              borderColor="border-l-purple-500"
              footer={
                <>
                  <Progress value={percentualRegular} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {contagem["Regular"]}/{totalAtivos} itens regulares
                  </p>
                </>
              }
            />
          </div>

          {/* Tabs de Conteúdo */}
          <Tabs defaultValue="extrato" className="space-y-4">
            <TabsList>
              <TabsTrigger value="extrato" className="gap-2">
                <HugeiconsIcon
                  icon={SecurityCheckIcon}
                  strokeWidth={2}
                  className="size-4"
                />
                Extrato CAUC
              </TabsTrigger>
              <TabsTrigger value="historico" className="gap-2">
                <HugeiconsIcon
                  icon={ChartLineData02Icon}
                  strokeWidth={2}
                  className="size-4"
                />
                Histórico
              </TabsTrigger>
            </TabsList>

            {/* Tab: Extrato CAUC */}
            <TabsContent value="extrato" className="space-y-4">
              {/* Filtro de Situação */}
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={FilterIcon}
                  strokeWidth={2}
                  className="size-4 text-muted-foreground"
                />
                <span className="text-sm text-muted-foreground">Filtrar:</span>
                <div className="flex gap-1">
                  <Button
                    variant={filtroSituacao === "todos" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFiltroSituacao("todos")}
                  >
                    Todos ({totalItens})
                  </Button>
                  <Button
                    variant={
                      filtroSituacao === "Regular" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setFiltroSituacao("Regular")}
                    className={
                      filtroSituacao !== "Regular"
                        ? "text-green-600 border-green-200 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20"
                        : ""
                    }
                  >
                    Regular ({contagem["Regular"]})
                  </Button>
                  <Button
                    variant={
                      filtroSituacao === "A Comprovar" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setFiltroSituacao("A Comprovar")}
                    className={
                      filtroSituacao !== "A Comprovar"
                        ? "text-amber-600 border-amber-200 hover:bg-amber-50 dark:border-amber-800 dark:hover:bg-amber-900/20"
                        : ""
                    }
                  >
                    A Comprovar ({contagem["A Comprovar"]})
                  </Button>
                  <Button
                    variant={
                      filtroSituacao === "Irregular" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setFiltroSituacao("Irregular")}
                    className={
                      filtroSituacao !== "Irregular"
                        ? "text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                        : ""
                    }
                  >
                    Irregular ({contagem["Irregular"]})
                  </Button>
                </div>
              </div>

              {/* Grupos do CAUC */}
              <Accordion
                type="multiple"
                defaultValue={["I", "II", "III", "IV", "V"]}
                className="w-full"
              >
                {gruposCAUC.map((grupo) => {
                  const resumo = getGrupoSituacaoResumo(grupo);
                  return (
                    <AccordionItem key={grupo.numero} value={grupo.numero}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3 flex-1">
                          <Badge
                            variant="outline"
                            className="font-mono text-xs shrink-0"
                          >
                            {grupo.numero}
                          </Badge>
                          <span className="font-semibold text-left">
                            {grupo.titulo}
                          </span>
                          <div className="ml-auto flex items-center gap-1.5 mr-2">
                            {resumo.regular > 0 && (
                              <span className="flex items-center gap-0.5 text-xs text-green-600">
                                <div className="size-1.5 rounded-full bg-green-500" />
                                {resumo.regular}
                              </span>
                            )}
                            {resumo.aComprovar > 0 && (
                              <span className="flex items-center gap-0.5 text-xs text-amber-600">
                                <div className="size-1.5 rounded-full bg-amber-500" />
                                {resumo.aComprovar}
                              </span>
                            )}
                            {resumo.irregular > 0 && (
                              <span className="flex items-center gap-0.5 text-xs text-red-600">
                                <div className="size-1.5 rounded-full bg-red-500" />
                                {resumo.irregular}
                              </span>
                            )}
                            {resumo.desativado > 0 && (
                              <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                                <div className="size-1.5 rounded-full bg-muted-foreground" />
                                {resumo.desativado}
                              </span>
                            )}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[60px]">Item</TableHead>
                              <TableHead>Descrição</TableHead>
                              <TableHead className="w-[160px]">Fonte</TableHead>
                              <TableHead className="w-[120px] text-center">
                                Situação
                              </TableHead>
                              <TableHead className="w-[100px] text-center">
                                Validade
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {grupo.itens.map((item) => {
                              const temSubitens =
                                item.subitens && item.subitens.length > 0;
                              const itensParaMostrar = temSubitens
                                ? item.subitens!
                                : [item];

                              // Filtro
                              const itensFiltrados =
                                filtroSituacao === "todos"
                                  ? itensParaMostrar
                                  : itensParaMostrar.filter(
                                      (i) => i.situacao === filtroSituacao,
                                    );

                              if (
                                itensFiltrados.length === 0 &&
                                filtroSituacao !== "todos"
                              )
                                return null;

                              return (
                                <React.Fragment key={item.codigo}>
                                  {temSubitens && (
                                    <TableRow className="bg-muted/30">
                                      <TableCell className="font-mono text-xs font-bold">
                                        {item.codigo}
                                      </TableCell>
                                      <TableCell
                                        colSpan={4}
                                        className="font-semibold text-sm"
                                      >
                                        {item.descricao}
                                      </TableCell>
                                    </TableRow>
                                  )}
                                  {itensFiltrados.map((subitem) => (
                                    <TableRow
                                      key={subitem.codigo}
                                      className={
                                        temSubitens ? "bg-muted/10" : ""
                                      }
                                    >
                                      <TableCell
                                        className={`font-mono text-xs ${temSubitens ? "pl-6" : ""}`}
                                      >
                                        {subitem.codigo}
                                      </TableCell>
                                      <TableCell className="text-sm">
                                        {subitem.descricao}
                                      </TableCell>
                                      <TableCell>
                                        <Badge
                                          variant="secondary"
                                          className="text-xs font-normal"
                                        >
                                          {subitem.fonte}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-1.5">
                                          {getSituacaoIcon(subitem.situacao)}
                                          {getSituacaoBadge(subitem.situacao)}
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-center text-xs text-muted-foreground">
                                        {subitem.validade}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </React.Fragment>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>

              {/* Legenda */}
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="font-medium">Legenda:</span>
                    <div className="flex items-center gap-1.5">
                      <div className="flex size-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                        <HugeiconsIcon
                          icon={CheckmarkCircle02Icon}
                          strokeWidth={2}
                          className="size-3 text-green-600"
                        />
                      </div>
                      <span>Regular</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex size-5 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                        <HugeiconsIcon
                          icon={InformationCircleIcon}
                          strokeWidth={2}
                          className="size-3 text-amber-600"
                        />
                      </div>
                      <span>A Comprovar</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex size-5 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                        <HugeiconsIcon
                          icon={Alert02Icon}
                          strokeWidth={2}
                          className="size-3 text-red-600"
                        />
                      </div>
                      <span>Irregular</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex size-5 items-center justify-center rounded-full bg-muted">
                        <HugeiconsIcon
                          icon={Clock01Icon}
                          strokeWidth={2}
                          className="size-3 text-muted-foreground"
                        />
                      </div>
                      <span>Desativado</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="text-muted-foreground text-xs">
                      (*) Validade pendente de comprovação
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Observações */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <HugeiconsIcon
                      icon={InformationCircleIcon}
                      strokeWidth={2}
                      className="size-4"
                    />
                    Observações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>
                      • O extrato do CAUC é um documento informativo que não
                      substitui a consulta aos sistemas de origem.
                    </li>
                    <li>
                      • A situação &quot;A Comprovar&quot; indica que o item
                      ainda não foi verificado pela fonte responsável.
                    </li>
                    <li>
                      • Itens com situação &quot;Irregular&quot; impedem a
                      celebração de convênios e contratos de repasse com a
                      União.
                    </li>
                    <li>
                      • A regularização deve ser feita diretamente junto ao
                      órgão ou sistema indicado na coluna &quot;Fonte&quot;.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Histórico */}
            <TabsContent value="historico" className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <EvolucaoCAUCChart />
                <ConformidadePorGrupoChart />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={ChartLineData02Icon}
                      strokeWidth={2}
                      className="size-5"
                    />
                    Evolução da Situação CAUC
                  </CardTitle>
                  <CardDescription>
                    Acompanhamento mensal dos itens por situação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Período</TableHead>
                        <TableHead className="text-center">Regular</TableHead>
                        <TableHead className="text-center">
                          A Comprovar
                        </TableHead>
                        <TableHead className="text-center">Irregular</TableHead>
                        <TableHead className="text-center">
                          Desativado
                        </TableHead>
                        <TableHead className="text-center">
                          Conformidade
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {historicoCAUC.map((item, idx) => {
                        const ativos =
                          item.regulares + item.aComprovar + item.irregulares;
                        const pctRegular = Math.round(
                          (item.regulares / ativos) * 100,
                        );
                        const isUltimo = idx === historicoCAUC.length - 1;
                        return (
                          <TableRow
                            key={item.periodo}
                            className={
                              isUltimo ? "bg-primary/5 font-medium" : ""
                            }
                          >
                            <TableCell className="font-medium">
                              {item.periodo}
                              {isUltimo && (
                                <Badge
                                  className="ml-2 text-[10px]"
                                  variant="outline"
                                >
                                  Atual
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                                {item.regulares}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                                {item.aComprovar}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
                                {item.irregulares}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline">
                                {item.desativados}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center gap-2 justify-center">
                                <Progress
                                  value={pctRegular}
                                  className="h-2 w-16"
                                />
                                <span className="text-xs">{pctRegular}%</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Resumo por Grupo */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gruposCAUC.map((grupo) => {
                  const resumo = getGrupoSituacaoResumo(grupo);
                  const pctRegular =
                    resumo.total > 0
                      ? Math.round(
                          (resumo.regular /
                            (resumo.total - resumo.desativado)) *
                            100,
                        )
                      : 0;
                  return (
                    <KpiCard
                      key={grupo.numero}
                      iconElement={
                        <Badge variant="outline" className="font-mono text-xs">
                          {grupo.numero}
                        </Badge>
                      }
                      title={grupo.titulo}
                      value={`${pctRegular}%`}
                      borderColor={
                        resumo.irregular > 0
                          ? "border-l-red-500"
                          : resumo.aComprovar > 0
                            ? "border-l-amber-500"
                            : "border-l-green-500"
                      }
                      footer={
                        <>
                          <p className="text-xs text-muted-foreground">
                            conforme
                          </p>
                          <Progress value={pctRegular} className="h-2" />
                          <div className="flex flex-wrap gap-3 text-xs">
                            <span className="text-green-600">
                              {resumo.regular} regular
                            </span>
                            {resumo.aComprovar > 0 && (
                              <span className="text-amber-600">
                                {resumo.aComprovar} a comprovar
                              </span>
                            )}
                            {resumo.irregular > 0 && (
                              <span className="text-red-600">
                                {resumo.irregular} irregular
                              </span>
                            )}
                            {resumo.desativado > 0 && (
                              <span className="text-muted-foreground">
                                {resumo.desativado} desativado
                              </span>
                            )}
                          </div>
                        </>
                      }
                    />
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Tab: Contas TCE/PR */}
        <TabsContent value="tce" className="space-y-6">
          {/* KPIs TCE */}
          {(() => {
            const totalContas = contasTCE.length;
            const regulares = contasTCE.filter(
              (c) => c.parecer === "Regular",
            ).length;
            const comRessalvas = contasTCE.filter(
              (c) => c.parecer === "Regular com Ressalvas",
            ).length;
            const pendentes = contasTCE.filter(
              (c) => c.parecer === "Pendente",
            ).length;
            const emAnalise = contasTCE.filter(
              (c) => c.parecer === "Em Análise",
            ).length;
            const julgadas = regulares + comRessalvas;
            const pctAprovadas = Math.round((julgadas / totalContas) * 100);

            return (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <KpiCard
                    iconElement={
                      <div className="size-2 rounded-full bg-green-500" />
                    }
                    title="Regular"
                    value={regulares}
                    borderColor="border-l-green-500"
                    footer={
                      <p className="text-xs text-muted-foreground">
                        Contas aprovadas sem ressalvas
                      </p>
                    }
                  />

                  <KpiCard
                    iconElement={
                      <div className="size-2 rounded-full bg-amber-500" />
                    }
                    title="Regular com Ressalvas"
                    value={comRessalvas}
                    borderColor="border-l-amber-500"
                    footer={
                      <p className="text-xs text-muted-foreground">
                        Contas aprovadas com apontamentos
                      </p>
                    }
                  />

                  <KpiCard
                    iconElement={
                      <div className="size-2 rounded-full bg-blue-500" />
                    }
                    title="Em Análise"
                    value={emAnalise}
                    borderColor="border-l-blue-500"
                    footer={
                      <p className="text-xs text-muted-foreground">
                        Aguardando parecer do TCE
                      </p>
                    }
                  />

                  <KpiCard
                    iconElement={
                      <div className="size-2 rounded-full bg-red-500" />
                    }
                    title="Pendente"
                    value={pendentes}
                    borderColor="border-l-red-500"
                    footer={
                      <p className="text-xs text-muted-foreground">
                        Contas ainda não enviadas/protocoladas
                      </p>
                    }
                  />

                  <KpiCard
                    icon={Target01Icon}
                    title="Taxa de Aprovação"
                    value={<>{pctAprovadas}%</>}
                    borderColor="border-l-purple-500"
                    footer={
                      <>
                        <Progress value={pctAprovadas} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {julgadas}/{totalContas} exercícios julgados
                        </p>
                      </>
                    }
                  />
                </div>

                {/* Tabela de Contas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={FileValidationIcon}
                        strokeWidth={2}
                        className="size-5"
                      />
                      Prestação de Contas — TCE/PR
                    </CardTitle>
                    <CardDescription>
                      Histórico de julgamento das contas anuais pelo Tribunal de
                      Contas do Estado do Paraná
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px] text-center">
                            Exercício
                          </TableHead>
                          <TableHead className="w-[110px]">Processo</TableHead>
                          <TableHead className="w-[110px] text-center">
                            Protocolo
                          </TableHead>
                          <TableHead className="w-[110px] text-center">
                            Julgamento
                          </TableHead>
                          <TableHead className="text-center">Parecer</TableHead>
                          <TableHead>Decreto Legislativo</TableHead>
                          <TableHead className="w-[110px] text-center">
                            Data Decreto
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contasTCE.map((conta) => {
                          const isRecente = conta.exercicio >= 2024;
                          return (
                            <TableRow
                              key={conta.exercicio}
                              className={
                                isRecente
                                  ? "bg-red-50/50 dark:bg-red-950/10"
                                  : ""
                              }
                            >
                              <TableCell className="text-center font-bold">
                                {conta.exercicio}
                              </TableCell>
                              <TableCell>
                                <span className="font-mono text-sm text-blue-600 dark:text-blue-400 underline cursor-pointer">
                                  {conta.processo}
                                </span>
                              </TableCell>
                              <TableCell className="text-center text-sm">
                                {conta.dataProtocolo || (
                                  <span className="text-muted-foreground">
                                    —
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="text-center text-sm">
                                {conta.dataJulgamento || (
                                  <span className="text-muted-foreground">
                                    —
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  {getParecerIcon(conta.parecer)}
                                  {getParecerBadge(conta.parecer)}
                                </div>
                              </TableCell>
                              <TableCell className="text-sm">
                                {conta.decretoLegislativo || (
                                  <span className="text-muted-foreground">
                                    —
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="text-center text-sm">
                                {conta.dataDecreto || (
                                  <span className="text-muted-foreground">
                                    —
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Legenda TCE */}
                <Card>
                  <CardContent className="pt-4 pb-4">
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="font-medium">Legenda:</span>
                      <div className="flex items-center gap-1.5">
                        <HugeiconsIcon
                          icon={CheckmarkCircle02Icon}
                          strokeWidth={2}
                          className="size-4 text-green-600"
                        />
                        <span>Regular</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HugeiconsIcon
                          icon={InformationCircleIcon}
                          strokeWidth={2}
                          className="size-4 text-amber-600"
                        />
                        <span>Regular com Ressalvas</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HugeiconsIcon
                          icon={Search01Icon}
                          strokeWidth={2}
                          className="size-4 text-blue-600"
                        />
                        <span>Em Análise</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HugeiconsIcon
                          icon={Cancel01Icon}
                          strokeWidth={2}
                          className="size-4 text-red-500"
                        />
                        <span>Pendente</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            );
          })()}
        </TabsContent>

        {/* Tab: Agenda de Obrigações */}
        <TabsContent value="agenda" className="space-y-6">
          {/* KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <KpiCard
              iconElement={<div className="size-2 rounded-full bg-green-500" />}
              title="Em dia"
              value={contagemAgenda.emDia}
              borderColor="border-l-green-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Obrigações cumpridas
                </p>
              }
            />

            <KpiCard
              iconElement={<div className="size-2 rounded-full bg-red-500" />}
              title="Não atendidas"
              value={contagemAgenda.naoAtendido}
              borderColor="border-l-red-500"
              footer={
                <p className="text-xs text-red-600 font-medium">
                  Requer regularização
                </p>
              }
            />

            <KpiCard
              iconElement={
                <div className="size-2 rounded-full bg-muted-foreground/40" />
              }
              title="Não aplicável"
              value={contagemAgenda.naoAplicavel}
              borderColor="border-l-zinc-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Não exigidas das entidades
                </p>
              }
            />

            <KpiCard
              icon={Building01Icon}
              title="Entidades"
              value={entidadesAgenda.length}
              borderColor="border-l-blue-500"
              footer={
                <p className="text-xs text-muted-foreground">
                  Monitoradas pelo município
                </p>
              }
            />

            <KpiCard
              icon={Target01Icon}
              title="Conformidade"
              value={<>{conformidadeAgenda}%</>}
              borderColor="border-l-purple-500"
              footer={
                <>
                  <Progress value={conformidadeAgenda} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {contagemAgenda.emDia}/{contagemAgenda.totalAplicavel}{" "}
                    obrigações em dia
                  </p>
                </>
              }
            />
          </div>

          {/* Tabs de Conteúdo */}
          <Tabs defaultValue="matriz" className="space-y-4">
            <TabsList>
              <TabsTrigger value="matriz" className="gap-2">
                <HugeiconsIcon
                  icon={Flag01Icon}
                  strokeWidth={2}
                  className="size-4"
                />
                Matriz
              </TabsTrigger>
              <TabsTrigger value="pendencias" className="gap-2">
                <HugeiconsIcon
                  icon={Alert02Icon}
                  strokeWidth={2}
                  className="size-4"
                />
                Pendências ({pendenciasAgenda.length})
              </TabsTrigger>
              <TabsTrigger value="calendario" className="gap-2">
                <HugeiconsIcon
                  icon={Calendar01Icon}
                  strokeWidth={2}
                  className="size-4"
                />
                Calendário
              </TabsTrigger>
              <TabsTrigger value="historico" className="gap-2">
                <HugeiconsIcon
                  icon={ChartLineData02Icon}
                  strokeWidth={2}
                  className="size-4"
                />
                Histórico
              </TabsTrigger>
            </TabsList>

            {/* Tab: Matriz */}
            <TabsContent value="matriz" className="space-y-4">
              {/* Legenda de status */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="font-medium">Situação:</span>
                <div className="flex items-center gap-1.5">
                  <div className="size-3 rounded-full bg-green-500" />
                  <span>Em dia</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="size-3 rounded-full bg-red-500" />
                  <span>Não atendido</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="size-2.5 rounded-full bg-muted-foreground/30" />
                  <span>Não aplicável</span>
                </div>
              </div>

              <Card>
                <CardContent className="pt-6 overflow-x-auto">
                  <TooltipProvider>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[220px]">
                            Entidade
                          </TableHead>
                          {tiposObrigacao.map((tipo) => (
                            <TableHead
                              key={tipo.codigo}
                              className="text-center"
                            >
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="cursor-help font-mono text-xs">
                                    {tipo.codigo}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-[220px]">
                                    {tipo.descricao}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {entidadesAgenda.map((entidade) => (
                          <TableRow key={entidade.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <HugeiconsIcon
                                  icon={Building01Icon}
                                  strokeWidth={2}
                                  className="size-4 text-muted-foreground shrink-0"
                                />
                                <span>{entidade.nome}</span>
                              </div>
                            </TableCell>
                            {tiposObrigacao.map((tipo) => {
                              const status = entidade.status[tipo.codigo];
                              return (
                                <TableCell
                                  key={tipo.codigo}
                                  className="text-center"
                                >
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex items-center justify-center cursor-help">
                                        {getStatusObrigacaoDot(status)}
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="font-medium">
                                        {tipo.codigo} — {status}
                                      </p>
                                      <p className="max-w-[220px] text-muted-foreground">
                                        {tipo.descricao}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TooltipProvider>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Pendências */}
            <TabsContent value="pendencias" className="space-y-4">
              {pendenciasAgenda.length === 0 ? (
                <Alert>
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    strokeWidth={2}
                    className="size-4 text-green-600"
                  />
                  <AlertTitle>Tudo em dia</AlertTitle>
                  <AlertDescription>
                    Nenhuma obrigação pendente para as entidades do município.
                  </AlertDescription>
                </Alert>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        strokeWidth={2}
                        className="size-5 text-red-600"
                      />
                      Itens não atendidos
                    </CardTitle>
                    <CardDescription>
                      Obrigações pendentes de regularização junto ao TCE/PR
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Entidade</TableHead>
                          <TableHead className="w-[80px]">Item</TableHead>
                          <TableHead>Descrição do Item não Atendido</TableHead>
                          <TableHead className="w-[160px]">Período</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendenciasAgenda.map((pendencia, index) => {
                          const entidade = entidadesAgenda.find(
                            (e) => e.id === pendencia.entidadeId,
                          );
                          return (
                            <TableRow key={index}>
                              <TableCell className="text-sm font-medium">
                                {entidade?.nome ?? pendencia.entidadeId}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className="font-mono text-xs"
                                >
                                  {pendencia.obrigacao}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {pendencia.descricao}
                              </TableCell>
                              <TableCell className="text-sm">
                                {pendencia.periodo}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Tab: Calendário */}
            <TabsContent value="calendario" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Calendar01Icon}
                      strokeWidth={2}
                      className="size-5"
                    />
                    Próximos Vencimentos
                  </CardTitle>
                  <CardDescription>
                    Agenda de prazos das obrigações junto ao TCE/PR
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[90px]">Obrigação</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Período</TableHead>
                        <TableHead className="w-[120px]">Vencimento</TableHead>
                        <TableHead className="w-[120px]">Situação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vencimentosAgenda.map((venc, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="font-mono text-xs"
                            >
                              {venc.obrigacao}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            <p>{venc.descricao}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {venc.entidades.join(", ")}
                            </p>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {venc.periodo}
                          </TableCell>
                          <TableCell className="text-sm">
                            <div className="flex items-center gap-1.5">
                              <HugeiconsIcon
                                icon={Clock01Icon}
                                strokeWidth={2}
                                className="size-3.5 text-muted-foreground"
                              />
                              {venc.vencimento}
                            </div>
                          </TableCell>
                          <TableCell>
                            {getVencimentoBadge(venc.status)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Histórico */}
            <TabsContent value="historico" className="space-y-4">
              <EvolucaoAgendaChart />
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={ChartLineData02Icon}
                      strokeWidth={2}
                      className="size-5"
                    />
                    Detalhamento Mensal
                  </CardTitle>
                  <CardDescription>
                    Obrigações em dia e não atendidas por mês
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mês</TableHead>
                        <TableHead className="text-center">Em dia</TableHead>
                        <TableHead className="text-center">
                          Não atendidas
                        </TableHead>
                        <TableHead className="text-center">
                          Conformidade
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {historicoAgenda.map((item) => (
                        <TableRow key={item.mes}>
                          <TableCell className="font-medium">
                            {item.mes}
                          </TableCell>
                          <TableCell className="text-center text-green-600">
                            {item.emDia}
                          </TableCell>
                          <TableCell className="text-center text-red-600">
                            {item.naoAtendido}
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {item.conformidade}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Legenda das obrigações — referência ao final da página */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  strokeWidth={2}
                  className="size-5"
                />
                Legenda das Obrigações
              </CardTitle>
              <CardDescription>
                Compromissos do município junto ao TCE/PR —{" "}
                {dadosAgenda.municipio}/{dadosAgenda.uf},{" "}
                {dadosAgenda.bimestreAtual}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {tiposObrigacao.map((tipo) => (
                  <div key={tipo.codigo} className="flex items-start gap-2">
                    <Badge
                      variant="outline"
                      className="font-mono text-xs shrink-0"
                    >
                      {tipo.codigo}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {tipo.descricao}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: MSC — Monitor de Situação Contábil */}
        <TabsContent value="msc" className="space-y-6">
          {/* KPIs */}
          {(() => {
            const enviados2025 = historicoMSC.filter((h) => h.enviou).length;
            const totalMeses2025 = historicoMSC.length;
            const conformidadeMSC = Math.round(
              (enviados2025 / totalMeses2025) * 100,
            );
            const isPendente =
              entidadeMSC.situacao === "Pendência encontrada";

            return (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <KpiCard
                    iconElement={
                      <div
                        className={`size-2 rounded-full ${isPendente ? "bg-red-500" : "bg-green-500"}`}
                      />
                    }
                    title="Situação"
                    value={isPendente ? "Pendência" : "Regular"}
                    borderColor={
                      isPendente ? "border-l-red-500" : "border-l-green-500"
                    }
                    footer={
                      <p className="text-xs text-muted-foreground">
                        Extrato do SICONFI
                      </p>
                    }
                  />

                  <KpiCard
                    iconElement={
                      <div className="size-2 rounded-full bg-red-500" />
                    }
                    title="Atraso"
                    value={`${entidadeMSC.mesesAtraso} meses`}
                    borderColor="border-l-red-500"
                    footer={
                      <p className="text-xs text-red-600 font-medium">
                        Requer regularização
                      </p>
                    }
                  />

                  <KpiCard
                    icon={Calendar01Icon}
                    title="Última entrega"
                    value="Jan/2026"
                    borderColor="border-l-blue-500"
                    footer={
                      <p className="text-xs text-muted-foreground">
                        {entidadeMSC.ultimaEntrega}
                      </p>
                    }
                  />

                  <KpiCard
                    icon={Clock01Icon}
                    title="Competência esperada"
                    value="Abr/2026"
                    borderColor="border-l-amber-500"
                    footer={
                      <p className="text-xs text-amber-600 font-medium">
                        Período em aberto
                      </p>
                    }
                  />

                  <KpiCard
                    icon={Target01Icon}
                    title="Conformidade 2025"
                    value={<>{conformidadeMSC}%</>}
                    borderColor="border-l-purple-500"
                    footer={
                      <>
                        <Progress value={conformidadeMSC} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {enviados2025}/{totalMeses2025} meses enviados
                        </p>
                      </>
                    }
                  />
                </div>

                {/* Alerta de pendência */}
                {isPendente && (
                  <Alert variant="destructive">
                    <HugeiconsIcon
                      icon={Alert02Icon}
                      strokeWidth={2}
                      className="size-4"
                    />
                    <AlertTitle>Pendência SICONFI detectada</AlertTitle>
                    <AlertDescription>
                      Balancete contábil pendente há{" "}
                      {entidadeMSC.mesesAtraso} meses. Competência esperada:{" "}
                      {entidadeMSC.competenciaEsperada}. Regularize o envio
                      da MSC no portal SICONFI para evitar restrições no CAUC.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Sub-tabs */}
                <Tabs defaultValue="consulta" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="consulta" className="gap-2">
                      <HugeiconsIcon
                        icon={Search01Icon}
                        strokeWidth={2}
                        className="size-4"
                      />
                      Consulta MSC
                    </TabsTrigger>
                    <TabsTrigger value="historico-msc" className="gap-2">
                      <HugeiconsIcon
                        icon={ChartLineData02Icon}
                        strokeWidth={2}
                        className="size-4"
                      />
                      Histórico
                    </TabsTrigger>
                  </TabsList>

                  {/* Sub-tab: Consulta MSC */}
                  <TabsContent value="consulta" className="space-y-4">
                    {/* Card de resumo — replica layout da UI SICONFI */}
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                              <HugeiconsIcon
                                icon={Building01Icon}
                                strokeWidth={2}
                                className="size-5 text-primary"
                              />
                            </div>
                            <div>
                              <p className="font-semibold">
                                {dadosMSC.municipio}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {dadosMSC.totalEntidades} entidade(s) monitorada(s) — SICONFI
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="outline"
                              className="font-mono text-xs gap-1"
                            >
                              <span className="font-bold">
                                {entidadeMSC.tipo}
                              </span>
                              MSC - {entidadeMSC.tipo}
                            </Badge>
                            <Badge
                              className={`${isPendente ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} text-white`}
                            >
                              {entidadeMSC.situacao}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Consulta da MSC */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                          Consulta da MSC
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-6">
                          <Badge
                            variant="outline"
                            className={`text-xs ${isPendente ? "border-red-300 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300" : "border-green-300 bg-green-50 text-green-700"}`}
                          >
                            {isPendente
                              ? "Extrato do Siconfi aponta pendencia"
                              : "Extrato do Siconfi sem pendências"}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Esperada: {entidadeMSC.competenciaEsperada}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Última entrega:{" "}
                            {entidadeMSC.ultimaCompetencia}
                          </Badge>
                        </div>

                        {/* Detalhes Oficiais */}
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                          Detalhes Oficiais
                        </p>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/3">Campo</TableHead>
                              <TableHead>Valor</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">
                                Entidade
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">
                                  {entidadeMSC.nome}
                                </Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                Situação
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={`text-xs ${isPendente ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} text-white`}
                                >
                                  {entidadeMSC.situacao}
                                </Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                Última entrega
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">
                                  {entidadeMSC.ultimaEntrega}
                                </Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                Resumo
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">
                                  {entidadeMSC.resumo}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Sub-tab: Histórico */}
                  <TabsContent value="historico-msc" className="space-y-4">
                    {/* Gráfico */}
                    {(() => {
                      const chartDataMSC = historicoMSC.map((h) => ({
                        mes: h.mes,
                        enviados: h.enviou ? 1 : 0,
                        naoEnviados: h.enviou ? 0 : 1,
                      }));

                      return (
                        <Card>
                          <CardHeader>
                            <CardTitle>Histórico de Envios SICONFI</CardTitle>
                            <CardDescription>
                              Entregas mensais do balancete contábil — 2025
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ChartContainer
                              config={
                                {
                                  enviados: {
                                    label: "Enviado",
                                    color: "var(--chart-2)",
                                  },
                                  naoEnviados: {
                                    label: "Não enviado",
                                    color: "var(--chart-1)",
                                  },
                                } satisfies ChartConfig
                              }
                              className="h-[220px] w-full"
                            >
                              <BarChart
                                data={chartDataMSC}
                                margin={{ left: 12, right: 12 }}
                              >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                  dataKey="mes"
                                  tickLine={false}
                                  axisLine={false}
                                  tickMargin={8}
                                />
                                <YAxis
                                  tickLine={false}
                                  axisLine={false}
                                  tickMargin={8}
                                />
                                <ChartTooltip
                                  content={<ChartTooltipContent />}
                                />
                                <Bar
                                  dataKey="enviados"
                                  stackId="msc"
                                  fill="var(--color-enviados)"
                                  radius={[0, 0, 0, 0]}
                                />
                                <Bar
                                  dataKey="naoEnviados"
                                  stackId="msc"
                                  fill="var(--color-naoEnviados)"
                                  radius={[2, 2, 0, 0]}
                                />
                                <ChartLegend
                                  content={<ChartLegendContent />}
                                />
                              </BarChart>
                            </ChartContainer>
                          </CardContent>
                        </Card>
                      );
                    })()}

                    {/* Tabela */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Registro de Entregas</CardTitle>
                        <CardDescription>
                          Detalhe mês a mês dos envios ao SICONFI
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Mês</TableHead>
                              <TableHead>Competência</TableHead>
                              <TableHead>Situação</TableHead>
                              <TableHead>Data de Envio</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {historicoMSC.map((h) => (
                              <TableRow key={h.mes}>
                                <TableCell className="font-medium">
                                  {h.mes}
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {h.competencia}
                                </TableCell>
                                <TableCell>
                                  {h.enviou ? (
                                    <div className="flex items-center gap-1.5">
                                      <div className="flex size-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                                        <HugeiconsIcon
                                          icon={CheckmarkCircle02Icon}
                                          strokeWidth={2}
                                          className="size-3 text-green-700 dark:text-green-300"
                                        />
                                      </div>
                                      <span className="text-xs font-medium text-green-700 dark:text-green-400">
                                        Enviado
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-1.5">
                                      <div className="flex size-5 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                                        <HugeiconsIcon
                                          icon={Cancel01Icon}
                                          strokeWidth={2}
                                          className="size-3 text-red-700 dark:text-red-300"
                                        />
                                      </div>
                                      <span className="text-xs font-medium text-red-700 dark:text-red-400">
                                        Não enviado
                                      </span>
                                    </div>
                                  )}
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {h.dataEnvio ?? (
                                    <span className="text-red-500">—</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            );
          })()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
