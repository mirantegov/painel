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
  ArrowDown01Icon,
  SecurityCheckIcon,
  Download01Icon,
  RefreshIcon,
  Calendar01Icon,
  Flag01Icon,
  Building01Icon,
  Clock01Icon,
  FilterIcon,
  UserIcon,
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

// Alertas do CAUC
const alertasCAUC = [
  {
    tipo: "warning" as const,
    titulo: "Irregularidade na Regularidade Previdenciária",
    descricao:
      "O item 4.2 (CADPREV) apresenta situação irregular. Regularize junto ao Ministério da Previdência Social para evitar restrições em transferências voluntárias.",
    setor: "CADPREV",
  },
  {
    tipo: "warning" as const,
    titulo: "Prestação de Contas de Convênios Irregular",
    descricao:
      "O item 2.1.2 (Transferegov.br) está irregular. Verifique pendências de prestação de contas de recursos federais no sistema Transferegov.",
    setor: "Transferegov.br",
  },
  {
    tipo: "info" as const,
    titulo: "Itens A Comprovar Pendentes",
    descricao:
      "Existem 10 itens com situação 'A Comprovar'. Providencie a documentação necessária para regularização antes dos prazos.",
    setor: "Geral",
  },
  {
    tipo: "info" as const,
    titulo: "RREO - Anexo 8 Pendente no SIOPE",
    descricao:
      "O encaminhamento do Anexo 8 do RREO ao SIOPE (item 3.2.3) está pendente de comprovação. Prazo limite se aproxima.",
    setor: "SIOPE",
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
            {/* Alertas e Notificações */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                Alertas e Notificações
              </h3>
              {alertasCAUC.map((alerta, index) => (
                <Alert
                  key={index}
                  variant={
                    alerta.tipo === "warning" ? "destructive" : "default"
                  }
                >
                  <HugeiconsIcon
                    icon={
                      alerta.tipo === "warning"
                        ? Alert02Icon
                        : InformationCircleIcon
                    }
                    strokeWidth={2}
                    className="size-4"
                  />
                  <AlertTitle className="flex items-center gap-2">
                    {alerta.titulo}
                    <Badge variant="outline" className="text-xs">
                      {alerta.setor}
                    </Badge>
                  </AlertTitle>
                  <AlertDescription>{alerta.descricao}</AlertDescription>
                </Alert>
              ))}
            </div>

            {/* Resumo Analítico */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Target01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                  Resumo Analítico
                </CardTitle>
                <CardDescription>
                  Indicadores consolidados do extrato CAUC
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Índice de Conformidade
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">
                        {percentualRegular}%
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs text-amber-600 border-amber-200"
                      >
                        <HugeiconsIcon
                          icon={ArrowDown01Icon}
                          strokeWidth={2}
                          className="size-3 mr-1"
                        />
                        -5%
                      </Badge>
                    </div>
                    <Progress value={percentualRegular} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Meta: 100% dos itens ativos regulares
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Itens Críticos
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-red-600">
                        {contagem["Irregular"]}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        irregulares
                      </span>
                    </div>
                    <Progress
                      value={(contagem["Irregular"] / totalAtivos) * 100}
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      Impedem transferências voluntárias
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Pendentes de Comprovação
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-amber-600">
                        {contagem["A Comprovar"]}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        itens
                      </span>
                    </div>
                    <Progress
                      value={(contagem["A Comprovar"] / totalAtivos) * 100}
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      Requerem ação imediata
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Grupos com Pendência
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">4</span>
                      <span className="text-sm text-muted-foreground">
                        de 5 grupos
                      </span>
                    </div>
                    <Progress value={80} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Apenas Grupo V está 100% conforme nos limites obrigatórios
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                    <CardTitle>Análise Inteligente — CAUC</CardTitle>
                    <CardDescription>
                      Diagnóstico da situação de adimplência e conformidade do
                      município
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Visão Geral */}
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    O extrato CAUC do município em {dadosMunicipio.dataExtrato}{" "}
                    apresenta{" "}
                    <strong>{contagem["Regular"]} itens regulares</strong> de um
                    total de <strong>{totalAtivos} itens ativos</strong>,
                    resultando em um índice de conformidade de{" "}
                    <strong>{percentualRegular}%</strong>. Foram identificados{" "}
                    <strong>{contagem["Irregular"]} itens irregulares</strong>{" "}
                    que impedem a celebração de convênios e contratos de repasse
                    com a União, além de{" "}
                    <strong>
                      {contagem["A Comprovar"]} itens pendentes de comprovação
                    </strong>{" "}
                    que requerem atenção imediata para evitar o agravamento da
                    situação.
                  </p>
                </div>

                <Separator />

                {/* Acordeão de Análises */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="irregularidades">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon
                          icon={Alert02Icon}
                          strokeWidth={2}
                          className="size-4 text-red-600"
                        />
                        <span>Análise das Irregularidades</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <HugeiconsIcon
                            icon={Alert02Icon}
                            strokeWidth={2}
                            className="size-4 mt-0.5 text-red-600 shrink-0"
                          />
                          <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">
                              Regularidade Previdenciária (4.2):
                            </strong>{" "}
                            A irregularidade junto ao CADPREV indica pendências
                            no Certificado de Regularidade Previdenciária (CRP).
                            Isso pode estar relacionado a atrasos no repasse de
                            contribuições previdenciárias ao RPPS ou a
                            inconsistências nos demonstrativos enviados ao
                            Ministério da Previdência. A regularização é
                            prioritária, pois este item impede transferências
                            voluntárias.
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <HugeiconsIcon
                            icon={Alert02Icon}
                            strokeWidth={2}
                            className="size-4 mt-0.5 text-red-600 shrink-0"
                          />
                          <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">
                              Prestação de Contas no Transferegov (2.1.2):
                            </strong>{" "}
                            A irregularidade na prestação de contas de recursos
                            federais no Transferegov.br indica que existem
                            convênios com prestação de contas pendente ou
                            rejeitada. É necessário acessar o sistema e
                            verificar quais instrumentos estão com pendências
                            para providenciar a regularização.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="transparencia">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon
                          icon={InformationCircleIcon}
                          strokeWidth={2}
                          className="size-4 text-amber-600"
                        />
                        <span>Pendências de Transparência</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <HugeiconsIcon
                            icon={InformationCircleIcon}
                            strokeWidth={2}
                            className="size-4 mt-0.5 text-amber-600 shrink-0"
                          />
                          <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">
                              Grupo III — Obrigações de Transparência:
                            </strong>{" "}
                            Este é o grupo com maior número de pendências. O
                            RREO possui itens a comprovar (Anexo 8 no SIOPE) e
                            um item desativado (Anexo 12 no SIOPS). A Matriz de
                            Saldos Contábeis (mensal e de encerramento) também
                            está pendente, assim como as Contas Anuais e o
                            sistema Siafic. A regularização destes itens depende
                            do envio tempestivo dos demonstrativos ao SICONFI e
                            SIOPE.
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
                              Pontos positivos:
                            </strong>{" "}
                            O RGF e o RREO (publicação e encaminhamento ao
                            SICONFI) estão regulares, assim como o CDP no
                            SADIPEM e a transparência no Transferegov.br. Isso
                            demonstra boa prática nos relatórios fiscais
                            principais.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="recomendacoes">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon
                          icon={Flag01Icon}
                          strokeWidth={2}
                          className="size-4 text-blue-600"
                        />
                        <span>Recomendações Estratégicas</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <div className="flex size-5 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-red-600">
                              1
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">
                              Prioridade Máxima — Regularização CADPREV:
                            </strong>{" "}
                            Agendar reunião com o setor de previdência para
                            identificar as pendências e providenciar o envio dos
                            demonstrativos necessários ao Ministério da
                            Previdência Social. Prazo sugerido: 15 dias.
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex size-5 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-red-600">
                              2
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">
                              Prioridade Alta — Prestação de Contas
                              Transferegov:
                            </strong>{" "}
                            Verificar todos os convênios com prestação de contas
                            pendente no Transferegov.br e designar equipe para
                            elaboração e envio. Prazo sugerido: 30 dias.
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex size-5 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-amber-600">
                              3
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">
                              Prioridade Média — FGTS e Transparência:
                            </strong>{" "}
                            Regularizar a comprovação do FGTS junto à CAIXA e
                            enviar os anexos pendentes do RREO ao SIOPE.
                            Encaminhar a Matriz de Saldos Contábeis ao SICONFI.
                            Prazo sugerido: 45 dias.
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex size-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-blue-600">
                              4
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">
                              Prevenção — Monitoramento Contínuo:
                            </strong>{" "}
                            Implementar rotina mensal de verificação do CAUC,
                            com designação de responsáveis por grupo de
                            obrigações. Criar calendário de prazos para envio de
                            relatórios e demonstrativos aos sistemas federais.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="impacto">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon
                          icon={SecurityCheckIcon}
                          strokeWidth={2}
                          className="size-4 text-purple-600"
                        />
                        <span>Impacto nas Transferências Voluntárias</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <HugeiconsIcon
                            icon={Alert02Icon}
                            strokeWidth={2}
                            className="size-4 mt-0.5 text-red-600 shrink-0"
                          />
                          <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">
                              Situação atual:
                            </strong>{" "}
                            Com {contagem["Irregular"]} itens irregulares, o
                            município está <strong>impedido</strong> de celebrar
                            novos convênios e contratos de repasse com a União.
                            Transferências voluntárias em andamento podem ser
                            suspensas caso a irregularidade persista.
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <HugeiconsIcon
                            icon={InformationCircleIcon}
                            strokeWidth={2}
                            className="size-4 mt-0.5 text-blue-600 shrink-0"
                          />
                          <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">
                              Estimativa de impacto:
                            </strong>{" "}
                            Municípios de porte similar captam, em média, R$
                            5-15 milhões/ano em transferências voluntárias. A
                            irregularidade atual pode representar a perda de
                            oportunidades significativas de investimento em
                            infraestrutura, saúde e educação.
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
                              Caminho para regularização:
                            </strong>{" "}
                            A resolução dos 2 itens irregulares identificados
                            (CADPREV e Transferegov) é suficiente para
                            restabelecer a elegibilidade do município para
                            transferências voluntárias, desde que os itens
                            &quot;A Comprovar&quot; não transitem para
                            irregular.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Separator />

                {/* Conclusão */}
                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={SecurityCheckIcon}
                      strokeWidth={2}
                      className="size-5 text-primary mt-0.5"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Conclusão</p>
                      <p className="text-sm text-muted-foreground">
                        O município apresenta situação{" "}
                        <strong>parcialmente regular</strong> no CAUC, com
                        índice de conformidade de {percentualRegular}%. As{" "}
                        {contagem["Irregular"]} irregularidades identificadas
                        são de natureza sanável e podem ser resolvidas em até 30
                        dias com ação coordenada dos setores responsáveis.
                        Recomenda-se priorizar a regularização dos itens do
                        CADPREV e Transferegov.br para restabelecer a plena
                        capacidade de captação de recursos federais.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Análise gerada em {dadosMunicipio.dataExtrato} às{" "}
                        {dadosMunicipio.horaExtrato} — Exercício{" "}
                        {periodoSelecionado}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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

                {/* Alertas TCE */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    Alertas e Notificações
                  </h3>
                  <Alert variant="destructive">
                    <HugeiconsIcon
                      icon={Alert02Icon}
                      strokeWidth={2}
                      className="size-4"
                    />
                    <AlertTitle className="flex items-center gap-2">
                      Contas 2024 Pendentes
                      <Badge variant="outline" className="text-xs">
                        TCE/PR
                      </Badge>
                    </AlertTitle>
                    <AlertDescription>
                      O processo 149083/25 referente ao exercício 2024 ainda não
                      possui data de protocolo ou julgamento registrados.
                      Acompanhe o andamento junto ao TCE/PR.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <HugeiconsIcon
                      icon={Alert02Icon}
                      strokeWidth={2}
                      className="size-4"
                    />
                    <AlertTitle className="flex items-center gap-2">
                      Contas 2025 Pendentes
                      <Badge variant="outline" className="text-xs">
                        TCE/PR
                      </Badge>
                    </AlertTitle>
                    <AlertDescription>
                      O processo 148617/26 referente ao exercício 2025 está
                      pendente de envio/protocolo. Verifique os prazos legais
                      para prestação de contas.
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <HugeiconsIcon
                      icon={InformationCircleIcon}
                      strokeWidth={2}
                      className="size-4"
                    />
                    <AlertTitle className="flex items-center gap-2">
                      Exercício 2020 — Sem Decreto Legislativo
                      <Badge variant="outline" className="text-xs">
                        Câmara Municipal
                      </Badge>
                    </AlertTitle>
                    <AlertDescription>
                      As contas do exercício 2020 (processo 159211/21) foram
                      julgadas em 04/04/2022, mas ainda não possuem Decreto
                      Legislativo registrado. Verifique a situação junto à
                      Câmara Municipal.
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Resumo Analítico do TCE */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={Target01Icon}
                        strokeWidth={2}
                        className="size-5"
                      />
                      Resumo Analítico
                    </CardTitle>
                    <CardDescription>
                      Indicadores consolidados das contas junto ao TCE/PR
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Exercícios Analisados
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold">
                            {totalContas}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            exercícios
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          De 2013 a 2025
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Aprovadas (Regular)
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-green-600">
                            {regulares}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            exercícios
                          </span>
                        </div>
                        <Progress
                          value={(regulares / totalContas) * 100}
                          className="h-2"
                        />
                        <p className="text-xs text-muted-foreground">
                          {Math.round((regulares / totalContas) * 100)}% do
                          total
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Com Ressalvas
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-amber-600">
                            {comRessalvas}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            exercícios
                          </span>
                        </div>
                        <Progress
                          value={(comRessalvas / totalContas) * 100}
                          className="h-2"
                        />
                        <p className="text-xs text-muted-foreground">
                          Requer atenção aos apontamentos
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Pendentes / Em Análise
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-red-600">
                            {pendentes + emAnalise}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            exercícios
                          </span>
                        </div>
                        <Progress
                          value={((pendentes + emAnalise) / totalContas) * 100}
                          className="h-2"
                        />
                        <p className="text-xs text-muted-foreground">
                          Requerem acompanhamento
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Análise Inteligente TCE */}
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
                        <CardTitle>
                          Análise Inteligente — Contas TCE/PR
                        </CardTitle>
                        <CardDescription>
                          Diagnóstico do histórico de prestação de contas ao
                          Tribunal de Contas
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="text-foreground leading-relaxed">
                        O município possui{" "}
                        <strong>{totalContas} exercícios registrados</strong>{" "}
                        junto ao TCE/PR (2013 a 2025). Do total,{" "}
                        <strong>
                          {regulares} foram aprovados como Regular
                        </strong>{" "}
                        e{" "}
                        <strong>
                          {comRessalvas} como Regular com Ressalvas
                        </strong>
                        , totalizando uma taxa de aprovação de{" "}
                        <strong>{pctAprovadas}%</strong>.
                        {pendentes > 0 && (
                          <>
                            {" "}
                            Existem{" "}
                            <strong>
                              {pendentes} exercícios pendentes
                            </strong>{" "}
                            que requerem atenção imediata.
                          </>
                        )}
                        {emAnalise > 0 && (
                          <>
                            {" "}
                            Há <strong>
                              {emAnalise} exercício em análise
                            </strong>{" "}
                            aguardando parecer definitivo do Tribunal.
                          </>
                        )}
                      </p>
                    </div>

                    <Separator />

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="historico-julgamento">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <HugeiconsIcon
                              icon={ChartLineData02Icon}
                              strokeWidth={2}
                              className="size-4 text-blue-600"
                            />
                            <span>Análise do Histórico de Julgamento</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <HugeiconsIcon
                                icon={CheckmarkCircle02Icon}
                                strokeWidth={2}
                                className="size-4 mt-0.5 text-green-600 shrink-0"
                              />
                              <p className="text-sm text-muted-foreground">
                                <strong className="text-foreground">
                                  Histórico positivo:
                                </strong>{" "}
                                A maioria dos exercícios (2013-2023) já foi
                                julgada pelo TCE/PR, com parecer favorável em
                                todos os casos. Isso demonstra regularidade na
                                prestação de contas e boa gestão fiscal do
                                município ao longo da última década.
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <HugeiconsIcon
                                icon={InformationCircleIcon}
                                strokeWidth={2}
                                className="size-4 mt-0.5 text-amber-600 shrink-0"
                              />
                              <p className="text-sm text-muted-foreground">
                                <strong className="text-foreground">
                                  Ressalvas identificadas:
                                </strong>{" "}
                                Os exercícios de 2014 e 2016 receberam parecer
                                &quot;Regular com Ressalvas&quot;, indicando que
                                houve apontamentos que, embora não tenham
                                impedido a aprovação, sinalizaram pontos de
                                melhoria na gestão. É recomendável analisar as
                                ressalvas para evitar reincidência.
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <HugeiconsIcon
                                icon={Search01Icon}
                                strokeWidth={2}
                                className="size-4 mt-0.5 text-blue-600 shrink-0"
                              />
                              <p className="text-sm text-muted-foreground">
                                <strong className="text-foreground">
                                  Exercício 2020 — Pendência de Decreto:
                                </strong>{" "}
                                Embora julgado em 04/04/2022, o exercício 2020
                                não possui Decreto Legislativo registrado. Isso
                                pode indicar pendência na Câmara Municipal para
                                formalização do julgamento. É recomendável
                                verificar esta situação.
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="pendencias">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <HugeiconsIcon
                              icon={Alert02Icon}
                              strokeWidth={2}
                              className="size-4 text-red-600"
                            />
                            <span>Exercícios Pendentes</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <HugeiconsIcon
                                icon={Cancel01Icon}
                                strokeWidth={2}
                                className="size-4 mt-0.5 text-red-500 shrink-0"
                              />
                              <p className="text-sm text-muted-foreground">
                                <strong className="text-foreground">
                                  Exercício 2024 (Processo 149083/25):
                                </strong>{" "}
                                Ainda não possui data de protocolo nem
                                julgamento. Considerando que o prazo legal para
                                envio é até o final do exercício seguinte, é
                                necessário acompanhar o andamento e garantir o
                                envio tempestivo da documentação ao TCE/PR.
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <HugeiconsIcon
                                icon={Cancel01Icon}
                                strokeWidth={2}
                                className="size-4 mt-0.5 text-red-500 shrink-0"
                              />
                              <p className="text-sm text-muted-foreground">
                                <strong className="text-foreground">
                                  Exercício 2025 (Processo 148617/26):
                                </strong>{" "}
                                Exercício corrente, ainda em andamento. O
                                processo já possui número atribuído, porém a
                                prestação de contas só será devida após o
                                encerramento do exercício. Manter a organização
                                dos documentos durante o exercício facilita o
                                envio futuro.
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="recomendacoes-tce">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <HugeiconsIcon
                              icon={Flag01Icon}
                              strokeWidth={2}
                              className="size-4 text-blue-600"
                            />
                            <span>Recomendações Estratégicas</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <div className="flex size-5 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-red-600">
                                  1
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                <strong className="text-foreground">
                                  Regularizar Decreto Legislativo de 2020:
                                </strong>{" "}
                                Acionar a Câmara Municipal para emissão do
                                Decreto Legislativo referente ao exercício 2020,
                                cuja conta já foi julgada pelo TCE/PR.
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <div className="flex size-5 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-amber-600">
                                  2
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                <strong className="text-foreground">
                                  Acompanhar Exercício 2024:
                                </strong>{" "}
                                Verificar o andamento do processo 149083/25
                                junto ao TCE/PR e providenciar documentação
                                complementar, se solicitada.
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <div className="flex size-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-blue-600">
                                  3
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                <strong className="text-foreground">
                                  Analisar Ressalvas dos Exercícios 2014 e 2016:
                                </strong>{" "}
                                Revisar os apontamentos realizados pelo TCE/PR
                                nos pareceres com ressalvas e implementar
                                medidas corretivas para evitar reincidência em
                                exercícios futuros.
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <div className="flex size-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-green-600">
                                  4
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                <strong className="text-foreground">
                                  Manter Organização do Exercício 2025:
                                </strong>{" "}
                                Documentar todas as operações financeiras e atos
                                administrativos do exercício corrente de forma
                                organizada para facilitar a futura prestação de
                                contas ao TCE/PR.
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <Separator />

                    <div className="rounded-lg bg-muted/50 p-4">
                      <div className="flex items-start gap-3">
                        <HugeiconsIcon
                          icon={FileValidationIcon}
                          strokeWidth={2}
                          className="size-5 text-primary mt-0.5"
                        />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Conclusão</p>
                          <p className="text-sm text-muted-foreground">
                            O município apresenta{" "}
                            <strong>histórico positivo</strong> junto ao TCE/PR,
                            com {pctAprovadas}% de taxa de aprovação nos
                            exercícios já julgados. As contas dos exercícios de
                            2013 a 2023 foram todas aprovadas (Regular ou
                            Regular com Ressalvas). As pendências concentram-se
                            nos exercícios mais recentes (2024 e 2025) e na
                            ausência de Decreto Legislativo para o exercício
                            2020. Recomenda-se ação imediata para regularização
                            dessas pendências.
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Análise gerada em {dadosMunicipio.dataExtrato} às{" "}
                            {dadosMunicipio.horaExtrato} — Exercício{" "}
                            {periodoSelecionado}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            );
          })()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
