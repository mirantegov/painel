// ==========================================
// AGENDA DE OBRIGAÇÕES MUNICIPAIS — TCE/PR
// Dados demo (município modelo: Nova Londrina)
// Fonte: agenda de obrigações do TCE/PR
// ==========================================

export type StatusObrigacao = "Em dia" | "Não atendido" | "Não aplicável";

export interface TipoObrigacao {
  codigo: string;
  nome: string;
  descricao: string;
}

export interface EntidadeAgenda {
  id: string;
  nome: string;
  tipo: "Câmara" | "Prefeitura" | "Autarquia";
  // chave = codigo da TipoObrigacao
  status: Record<string, StatusObrigacao>;
}

export interface PendenciaAgenda {
  entidadeId: string;
  obrigacao: string;
  descricao: string;
  periodo: string;
}

export interface VencimentoAgenda {
  obrigacao: string;
  descricao: string;
  periodo: string;
  vencimento: string;
  entidades: string[];
  status: "Pendente" | "Cumprido" | "Próximo";
}

export interface HistoricoAgenda {
  mes: string;
  conformidade: number;
  emDia: number;
  naoAtendido: number;
}

export const dadosAgenda = {
  municipio: "Nova Londrina",
  uf: "PR",
  exercicio: "2026",
  bimestreAtual: "Bimestre 2 de 2026",
  dataExtrato: "07/06/2026",
  horaExtrato: "15:26",
};

export const tiposObrigacao: TipoObrigacao[] = [
  {
    codigo: "AUD",
    nome: "Audiência Pública",
    descricao: "Declaração sobre a realização de Audiência Pública",
  },
  {
    codigo: "RREO",
    nome: "RREO",
    descricao:
      "Declaração de publicidade dos Relatórios Resumidos da Execução Orçamentária",
  },
  {
    codigo: "RGF",
    nome: "RGF",
    descricao: "Declaração de publicidade dos Relatórios de Gestão Fiscal",
  },
  {
    codigo: "FP",
    nome: "Folha de Pagamento",
    descricao: "Entrega do módulo de Folha de Pagamento do SIAP",
  },
  {
    codigo: "AM",
    nome: "Acompanhamento Mensal",
    descricao: "Entrega do módulo de Acompanhamento Mensal do SIM",
  },
  {
    codigo: "PCA",
    nome: "Prestação de Contas Anual",
    descricao: "Entrega do Processo de Prestação de Contas Anual",
  },
  {
    codigo: "ML",
    nome: "Mural de Licitações",
    descricao: "Fechamento do Mural de Licitações",
  },
  {
    codigo: "ProGov",
    nome: "ProGov",
    descricao: "Avaliação de políticas públicas",
  },
];

export const entidadesAgenda: EntidadeAgenda[] = [
  {
    id: "camara",
    nome: "Câmara Municipal de Nova Londrina",
    tipo: "Câmara",
    status: {
      AUD: "Em dia",
      RREO: "Não aplicável",
      RGF: "Em dia",
      FP: "Em dia",
      AM: "Em dia",
      PCA: "Em dia",
      ML: "Em dia",
      ProGov: "Não aplicável",
    },
  },
  {
    id: "municipio",
    nome: "Município de Nova Londrina",
    tipo: "Prefeitura",
    status: {
      AUD: "Em dia",
      RREO: "Não atendido",
      RGF: "Em dia",
      FP: "Em dia",
      AM: "Em dia",
      PCA: "Em dia",
      ML: "Em dia",
      ProGov: "Em dia",
    },
  },
  {
    id: "previdencia",
    nome: "Instituto de Previdência dos Servidores Públicos do Município de Nova Londrina",
    tipo: "Autarquia",
    status: {
      AUD: "Não aplicável",
      RREO: "Não aplicável",
      RGF: "Em dia",
      FP: "Em dia",
      AM: "Em dia",
      PCA: "Em dia",
      ML: "Não aplicável",
      ProGov: "Não aplicável",
    },
  },
];

export const pendenciasAgenda: PendenciaAgenda[] = [
  {
    entidadeId: "municipio",
    obrigacao: "RREO",
    descricao:
      "Faltou a declaração de Publicidade do Relatório: Anexo 1 - Balanço Orçamentário",
    periodo: "Bimestre 2 de 2026",
  },
  {
    entidadeId: "municipio",
    obrigacao: "RREO",
    descricao:
      "Faltou a declaração de Publicidade do Relatório: Anexo 12 - Receitas e Despesas com Ações e Serviços Públicos de Saúde",
    periodo: "Bimestre 2 de 2026",
  },
  {
    entidadeId: "municipio",
    obrigacao: "RREO",
    descricao:
      "Faltou a declaração de Publicidade do Relatório: Anexo 2 - Demonstrativo da Execução das Despesas por Função/Subfunção",
    periodo: "Bimestre 2 de 2026",
  },
  {
    entidadeId: "municipio",
    obrigacao: "RREO",
    descricao:
      "Faltou a declaração de Publicidade do Relatório: Anexo 8 - Receitas e Despesas com Manutenção e Desenvolvimento do Ensino",
    periodo: "Bimestre 2 de 2026",
  },
];

export const vencimentosAgenda: VencimentoAgenda[] = [
  {
    obrigacao: "RREO",
    descricao: "Declaração de publicidade do RREO referente ao Bimestre 2/2026",
    periodo: "Bimestre 2 de 2026",
    vencimento: "30/06/2026",
    entidades: ["Município de Nova Londrina"],
    status: "Próximo",
  },
  {
    obrigacao: "RGF",
    descricao: "Declaração de publicidade do RGF do 1º Quadrimestre",
    periodo: "Quadrimestre 1 de 2026",
    vencimento: "30/06/2026",
    entidades: [
      "Câmara Municipal de Nova Londrina",
      "Município de Nova Londrina",
      "Instituto de Previdência",
    ],
    status: "Próximo",
  },
  {
    obrigacao: "FP",
    descricao: "Entrega do módulo de Folha de Pagamento do SIAP — Maio/2026",
    periodo: "Maio de 2026",
    vencimento: "15/06/2026",
    entidades: [
      "Câmara Municipal de Nova Londrina",
      "Município de Nova Londrina",
      "Instituto de Previdência",
    ],
    status: "Próximo",
  },
  {
    obrigacao: "AM",
    descricao: "Entrega do Acompanhamento Mensal do SIM — Maio/2026",
    periodo: "Maio de 2026",
    vencimento: "15/06/2026",
    entidades: [
      "Câmara Municipal de Nova Londrina",
      "Município de Nova Londrina",
      "Instituto de Previdência",
    ],
    status: "Próximo",
  },
  {
    obrigacao: "ML",
    descricao: "Fechamento do Mural de Licitações — Maio/2026",
    periodo: "Maio de 2026",
    vencimento: "10/06/2026",
    entidades: [
      "Câmara Municipal de Nova Londrina",
      "Município de Nova Londrina",
    ],
    status: "Pendente",
  },
  {
    obrigacao: "AUD",
    descricao:
      "Declaração sobre a realização de Audiência Pública — 1º Quadrimestre",
    periodo: "Quadrimestre 1 de 2026",
    vencimento: "31/05/2026",
    entidades: ["Município de Nova Londrina"],
    status: "Cumprido",
  },
  {
    obrigacao: "PCA",
    descricao:
      "Entrega do Processo de Prestação de Contas Anual — Exercício 2025",
    periodo: "Exercício 2025",
    vencimento: "31/03/2026",
    entidades: [
      "Câmara Municipal de Nova Londrina",
      "Município de Nova Londrina",
      "Instituto de Previdência",
    ],
    status: "Cumprido",
  },
];

// Total de obrigações aplicáveis no município = 18 (6 Câmara + 8 Município + 4 Previdência)
export const historicoAgenda: HistoricoAgenda[] = [
  { mes: "Jan/26", conformidade: 100, emDia: 18, naoAtendido: 0 },
  { mes: "Fev/26", conformidade: 94, emDia: 17, naoAtendido: 1 },
  { mes: "Mar/26", conformidade: 100, emDia: 18, naoAtendido: 0 },
  { mes: "Abr/26", conformidade: 89, emDia: 16, naoAtendido: 2 },
  { mes: "Mai/26", conformidade: 94, emDia: 17, naoAtendido: 1 },
  { mes: "Jun/26", conformidade: 94, emDia: 17, naoAtendido: 1 },
];
