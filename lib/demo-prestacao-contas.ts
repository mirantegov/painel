// Dados demo — Contas Públicas (Prestação de Contas).
// Snapshot serializável servido de mod_prestacao_contas (jsonb).
// Agrega CAUC + TCE/PR (inline aqui) + Agenda/MSC/Certidão (libs próprias).
// Helpers de badge/ícone e charts seguem no componente (apresentação).
import {
  dadosAgenda,
  tiposObrigacao,
  entidadesAgenda,
  pendenciasAgenda,
  vencimentosAgenda,
  historicoAgenda,
} from "@/lib/demo-agenda-obrigacoes";
import { dadosMSC, entidadeMSC, historicoMSC } from "@/lib/demo-msc";
import { certidaoAtual, historicoCertidao } from "@/lib/demo-certidao";

// ==========================================
// TIPOS — CAUC
// ==========================================
export type SituacaoCAUC =
  | "Regular"
  | "A Comprovar"
  | "Irregular"
  | "Desativado";

export interface ItemCAUC {
  codigo: string;
  descricao: string;
  fonte: string;
  situacao: SituacaoCAUC;
  validade: string;
  subitens?: ItemCAUC[];
}

export interface GrupoCAUC {
  numero: string;
  titulo: string;
  itens: ItemCAUC[];
}

// ==========================================
// DADOS DO CAUC
// ==========================================

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
// TIPOS + DADOS — CONTAS TCE/PR
// ==========================================

export type ParecerTCE =
  | "Regular"
  | "Regular com Ressalvas"
  | "Irregular"
  | "Em Análise"
  | "Pendente";

export interface ContaTCE {
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

export const CONTAS_SNAPSHOT = {
  // CAUC
  dadosMunicipio,
  gruposCAUC,
  historicoCAUC,
  // TCE/PR
  contasTCE,
  // Agenda de Obrigações
  dadosAgenda,
  tiposObrigacao,
  entidadesAgenda,
  pendenciasAgenda,
  vencimentosAgenda,
  historicoAgenda,
  // MSC
  dadosMSC,
  entidadeMSC,
  historicoMSC,
  // Certidão Liberatória
  certidaoAtual,
  historicoCertidao,
};
