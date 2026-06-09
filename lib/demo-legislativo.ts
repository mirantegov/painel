export const ORCAMENTO_LEGISLATIVO = 12_000_000;
export const DESPESA_EMPENHADA_LEGISLATIVO = 9_840_000;
export const TOTAL_DIARIAS_LEGISLATIVO = 45_000;
export const QUANTIDADE_DIARIAS = 127;
export const MEDIA_DIARIAS = TOTAL_DIARIAS_LEGISLATIVO / QUANTIDADE_DIARIAS;
export const GASTO_PESSOAL_PORCENTO = 68.5;
export const LIMITE_GASTO_PESSOAL = 70;

export type Partido =
  | "MDB"
  | "PSD"
  | "PP"
  | "REPUBLICANOS"
  | "UNIÃO"
  | "PSB"
  | "PDT"
  | "NOVO"
  | "PODE";

export type CargoMesa =
  | "Presidente"
  | "Vice-Presidente"
  | "1º Secretário"
  | "2º Secretário";

export type CargoVereador = CargoMesa | "Vereador";

export type SituacaoPropositura =
  | "Aprovada"
  | "Em Tramitação"
  | "Arquivada"
  | "Rejeitada"
  | "Retirada de Pauta"
  | "Sanção Positiva"
  | "Veto Total"
  | "Encaminhada ao Executivo"
  | "Respondido";

export type TipoPropositura =
  | "Projeto de Lei"
  | "Projeto de Resolução"
  | "Projeto de Decreto"
  | "Indicação"
  | "Moção"
  | "Requerimento";

export type TipoSessao = "Ordinária" | "Extraordinária" | "Solene" | "Especial";

export type StatusSessao = "Realizada" | "Agendada" | "Cancelada";

export type TipoComissao = "Permanente" | "Temporária";

export interface Vereador {
  id: string;
  nome: string;
  partido: Partido;
  mandato: string;
  cargo: CargoVereador;
  foto?: string;
  email?: string;
}

export interface MesaDiretora {
  presidente: Vereador;
  vice: Vereador;
  primeiraSecretaria: Vereador;
  segundaSecretaria: Vereador;
}

export interface Sessao {
  id: string;
  tipo: TipoSessao;
  numero: number;
  data: string;
  hora: string;
  pauta: string[];
  status: StatusSessao;
  observacao?: string;
}

export interface Propositura {
  id: string;
  tipo: TipoPropositura;
  numero: number;
  ano: number;
  autor: string;
  ementa: string;
  situacao: SituacaoPropositura;
  dataEntrada: string;
  comissaoParecer?: string;
}

export interface Comissao {
  id: string;
  nome: string;
  tipo: TipoComissao;
  membros: Vereador[];
  presidente: Vereador;
  dataCriacao: string;
  dataFim?: string;
  ativo: boolean;
}

export interface Presenca {
  sessaoId: string;
  sessaoData: string;
  vereadorId: string;
  vereadorNome?: string;
  presente: boolean;
}

export const PartidoCores: Record<Partido, string> = {
  MDB: "#8B5CF6",
  PSD: "#3B82F6",
  PP: "#EF4444",
  REPUBLICANOS: "#22C55E",
  UNIÃO: "#F97316",
  PSB: "#EAB308",
  PDT: "#EC4899",
  NOVO: "#06B6D4",
  PODE: "#84CC16",
};

export const DATA_SESSOES = [
  {
    data: "2025-02-03",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 1,
    pauta: ["PL 001/2025", "PL 002/2025", "Indicação 001/2025"],
  },
  {
    data: "2025-02-17",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 2,
    pauta: ["PL 003/2025", "Resolução 001/2025"],
  },
  {
    data: "2025-03-03",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 3,
    pauta: ["PL 004/2025", "Moção 001/2025"],
  },
  {
    data: "2025-03-17",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 4,
    pauta: ["PL 005/2025", "Indicação 002/2025"],
  },
  {
    data: "2025-04-07",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 5,
    pauta: ["PL 006/2025", "Requerimento 001/2025"],
  },
  {
    data: "2025-04-21",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 6,
    pauta: ["PL 007/2025", "PL 008/2025"],
  },
  {
    data: "2025-05-05",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 7,
    pauta: ["Resolução 002/2025", "Indicação 003/2025"],
  },
  {
    data: "2025-05-19",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 8,
    pauta: ["PL 009/2025", "Moção 002/2025"],
  },
  {
    data: "2025-06-04",
    hora: "19:00",
    tipo: "Extraordinária" as TipoSessao,
    numero: 1,
    pauta: ["PL 010/2025", "PL 011/2025", "PL 012/2025"],
  },
  {
    data: "2025-06-09",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 9,
    pauta: ["PL 013/2025", "Indicação 004/2025"],
  },
  {
    data: "2025-06-23",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 10,
    pauta: ["PL 014/2025", "Resolução 003/2025"],
  },
  {
    data: "2025-07-07",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 11,
    pauta: ["PL 015/2025", "Moção 003/2025"],
  },
  {
    data: "2025-07-21",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 12,
    pauta: ["PL 016/2025", "Indicação 005/2025"],
  },
  {
    data: "2025-08-04",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 13,
    pauta: ["PL 017/2025", "Requerimento 002/2025"],
  },
  {
    data: "2025-08-18",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 14,
    pauta: ["PL 018/2025", "PL 019/2025"],
  },
  {
    data: "2025-09-08",
    hora: "09:00",
    tipo: "Solene" as TipoSessao,
    numero: 1,
    pauta: ["Sessão Solene - Dia da Independência"],
  },
  {
    data: "2025-09-15",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 15,
    pauta: ["PL 020/2025", "Indicação 006/2025"],
  },
  {
    data: "2025-09-29",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 16,
    pauta: ["PL 021/2025", "Resolução 004/2025"],
  },
  {
    data: "2025-10-06",
    hora: "19:00",
    tipo: "Extraordinária" as TipoSessao,
    numero: 2,
    pauta: ["PL 022/2025", "PL 023/2025", "PL 024/2025"],
  },
  {
    data: "2025-10-20",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 17,
    pauta: ["PL 025/2025", "Moção 004/2025"],
  },
  {
    data: "2025-11-03",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 18,
    pauta: ["PL 026/2025", "Indicação 007/2025"],
  },
  {
    data: "2025-11-17",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 19,
    pauta: ["PL 027/2025", "Requerimento 003/2025"],
  },
  {
    data: "2025-12-01",
    hora: "09:00",
    tipo: "Ordinária" as TipoSessao,
    numero: 20,
    pauta: ["PL 028/2025", "Resolução 005/2025"],
  },
  {
    data: "2025-12-15",
    hora: "09:00",
    tipo: "Especial" as TipoSessao,
    numero: 1,
    pauta: ["Sessão Especial - Prestação de Contas 2025"],
  },
];

export const DATA_VEREADORES: Vereador[] = [
  {
    id: "v01",
    nome: "Maria Silva Santos",
    partido: "MDB",
    mandato: "2025-2028",
    cargo: "Presidente",
    email: "maria.santos@camara.gov",
  },
  {
    id: "v02",
    nome: "José Carlos Pereira",
    partido: "PSD",
    mandato: "2025-2028",
    cargo: "Vice-Presidente",
    email: "jose.pereira@camara.gov",
  },
  {
    id: "v03",
    nome: "Ana Paula Ferreira",
    partido: "PP",
    mandato: "2025-2028",
    cargo: "1º Secretário",
    email: "ana.ferreira@camara.gov",
  },
  {
    id: "v04",
    nome: "Roberto Mendes Oliveira",
    partido: "REPUBLICANOS",
    mandato: "2025-2028",
    cargo: "2º Secretário",
    email: "roberto.oliveira@camara.gov",
  },
  {
    id: "v05",
    nome: "Carmen Lucia Costa",
    partido: "UNIÃO",
    mandato: "2025-2028",
    cargo: "Vereador",
  },
  {
    id: "v06",
    nome: "Paulo Roberto Almeida",
    partido: "PSB",
    mandato: "2025-2028",
    cargo: "Vereador",
  },
  {
    id: "v07",
    nome: "Fernanda Lima Souza",
    partido: "PDT",
    mandato: "2025-2028",
    cargo: "Vereador",
  },
  {
    id: "v08",
    nome: "Carlos Eduardo Nunes",
    partido: "NOVO",
    mandato: "2025-2028",
    cargo: "Vereador",
  },
  {
    id: "v09",
    nome: "Marcos Antônio Ribeiro",
    partido: "PODE",
    mandato: "2025-2028",
    cargo: "Vereador",
  },
];

export const MESA_DIRETORA: MesaDiretora = {
  presidente: DATA_VEREADORES[0],
  vice: DATA_VEREADORES[1],
  primeiraSecretaria: DATA_VEREADORES[2],
  segundaSecretaria: DATA_VEREADORES[3],
};

export const DATA_SESSOES_COMPLETO: Sessao[] = DATA_SESSOES.map((s, i) => ({
  id: `s${String(i + 1).padStart(2, "0")}`,
  ...s,
  status:
    s.data <= "2025-04-10"
      ? ("Realizada" as StatusSessao)
      : ("Agendada" as StatusSessao),
  observacao:
    s.tipo === "Solene" ? "Sessão solene realizada no Plenário" : undefined,
}));

export const DATA_PROPOSITURAS: Propositura[] = [
  {
    id: "p01",
    tipo: "Projeto de Lei",
    numero: 1,
    ano: 2025,
    autor: "Mesa Diretora",
    ementa:
      "Estima a Receita e fixa a Despesa do Município para o exercício de 2025",
    situacao: "Sanção Positiva",
    dataEntrada: "2025-01-15",
    comissaoParecer: "Comissão de Orçamento e Finanças",
  },
  {
    id: "p02",
    tipo: "Projeto de Lei",
    numero: 2,
    ano: 2025,
    autor: "Vereador José Carlos",
    ementa: "Dispõe sobre o Programa Municipal de Combate à Dengue",
    situacao: "Aprovada",
    dataEntrada: "2025-01-20",
  },
  {
    id: "p03",
    tipo: "Projeto de Lei",
    numero: 3,
    ano: 2025,
    autor: "Vereadora Ana Paula",
    ementa: "Institui a Semana Municipal de Conscientização sobre o Autismo",
    situacao: "Aprovada",
    dataEntrada: "2025-01-25",
  },
  {
    id: "p04",
    tipo: "Indicação",
    numero: 1,
    ano: 2025,
    autor: "Vereador Marcos Antônio",
    ementa:
      "Indica ao Executivo a necessidade de patrolamento na Rua das Palmeiras",
    situacao: "Encaminhada ao Executivo",
    dataEntrada: "2025-02-03",
  },
  {
    id: "p05",
    tipo: "Projeto de Lei",
    numero: 4,
    ano: 2025,
    autor: "Vereador Roberto Mendes",
    ementa: "Cria o Programa Municipal de Apoio ao Empreendedorismo Local",
    situacao: "Em Tramitação",
    dataEntrada: "2025-02-10",
  },
  {
    id: "p06",
    tipo: "Moção",
    numero: 1,
    ano: 2025,
    autor: "Vereadora Carmen Lucia",
    ementa: "Moção de Congratulação aos Professores pelo Dia do Educador",
    situacao: "Aprovada",
    dataEntrada: "2025-02-15",
  },
  {
    id: "p07",
    tipo: "Projeto de Resolução",
    numero: 1,
    ano: 2025,
    autor: "Mesa Diretora",
    ementa: "Aprova o Regimento Interno da Câmara Municipal",
    situacao: "Aprovada",
    dataEntrada: "2025-02-20",
  },
  {
    id: "p08",
    tipo: "Indicação",
    numero: 2,
    ano: 2025,
    autor: "Vereador Paulo Roberto",
    ementa: "Indica ao Executivo a construção de uma Praça na Vila Nova",
    situacao: "Encaminhada ao Executivo",
    dataEntrada: "2025-02-25",
  },
  {
    id: "p09",
    tipo: "Projeto de Lei",
    numero: 5,
    ano: 2025,
    autor: "Vereadora Fernanda Lima",
    ementa: "Dispõe sobre a Política Municipal de Proteção aos Animais",
    situacao: "Em Tramitação",
    dataEntrada: "2025-03-01",
  },
  {
    id: "p10",
    tipo: "Requerimento",
    numero: 1,
    ano: 2025,
    autor: "Vereador Carlos Eduardo",
    ementa: "Requer informações sobre a frota de veículos da Prefeitura",
    situacao: "Respondido",
    dataEntrada: "2025-03-05",
  },
  {
    id: "p11",
    tipo: "Projeto de Lei",
    numero: 6,
    ano: 2025,
    autor: "Vereador José Carlos",
    ementa: "Institui o Programa Municipal de Castração de Animais",
    situacao: "Aprovada",
    dataEntrada: "2025-03-10",
  },
  {
    id: "p12",
    tipo: "Indicação",
    numero: 3,
    ano: 2025,
    autor: "Vereadora Ana Paula",
    ementa: "Indica ao Executivo a instalação de LEDs na Av. Brasil",
    situacao: "Encaminhada ao Executivo",
    dataEntrada: "2025-03-15",
  },
  {
    id: "p13",
    tipo: "Moção",
    numero: 2,
    ano: 2025,
    autor: "Vereador Roberto Mendes",
    ementa: "Moção de Pesar pelo falecimento do Senhor João da Silva",
    situacao: "Aprovada",
    dataEntrada: "2025-03-20",
  },
  {
    id: "p14",
    tipo: "Projeto de Lei",
    numero: 7,
    ano: 2025,
    autor: "Vereadora Carmen Lucia",
    ementa: "Cria o Selo Empresa Amiga da Educação",
    situacao: "Em Tramitação",
    dataEntrada: "2025-03-25",
  },
  {
    id: "p15",
    tipo: "Projeto de Lei",
    numero: 8,
    ano: 2025,
    autor: "Vereador Paulo Roberto",
    ementa:
      "Dispõe sobre a obrigatoriedade de Advertência em Libras nos serviços públicos",
    situacao: "Em Tramitação",
    dataEntrada: "2025-04-01",
  },
  {
    id: "p16",
    tipo: "Projeto de Decreto",
    numero: 1,
    ano: 2025,
    autor: "Mesa Diretora",
    ementa: "Concede Medalha de Honra ao Mérito Legislativo",
    situacao: "Aprovada",
    dataEntrada: "2025-04-05",
  },
  {
    id: "p17",
    tipo: "Indicação",
    numero: 4,
    ano: 2025,
    autor: "Vereadora Fernanda Lima",
    ementa: "Indica ao Executivo a revitalização do Parque Municipal",
    situacao: "Encaminhada ao Executivo",
    dataEntrada: "2025-04-10",
  },
  {
    id: "p18",
    tipo: "Projeto de Lei",
    numero: 9,
    ano: 2025,
    autor: "Vereador Carlos Eduardo",
    ementa: "Institui o Programa de Regularização de Loteamentos Irregulares",
    situacao: "Arquivada",
    dataEntrada: "2025-04-15",
  },
  {
    id: "p19",
    tipo: "Requerimento",
    numero: 2,
    ano: 2025,
    autor: "Vereador Marcos Antônio",
    ementa: "Requer convite ao Secretário de Obras para prestar contas",
    situacao: "Respondido",
    dataEntrada: "2025-04-20",
  },
  {
    id: "p20",
    tipo: "Moção",
    numero: 3,
    ano: 2025,
    autor: "Vereador José Carlos",
    ementa: "Moção de Congratulação aos Agentes de Saúde",
    situacao: "Aprovada",
    dataEntrada: "2025-04-25",
  },
];

export const DATA_COMISSOES: Comissao[] = [
  {
    id: "c01",
    nome: "Comissão de Constituição, Justiça e Redação",
    tipo: "Permanente",
    membros: [DATA_VEREADORES[0], DATA_VEREADORES[1], DATA_VEREADORES[4]],
    presidente: DATA_VEREADORES[1],
    dataCriacao: "2025-01-01",
    ativo: true,
  },
  {
    id: "c02",
    nome: "Comissão de Orçamento e Finanças",
    tipo: "Permanente",
    membros: [DATA_VEREADORES[2], DATA_VEREADORES[3], DATA_VEREADORES[5]],
    presidente: DATA_VEREADORES[2],
    dataCriacao: "2025-01-01",
    ativo: true,
  },
  {
    id: "c03",
    nome: "Comissão de Educação, Cultura e Esportes",
    tipo: "Permanente",
    membros: [DATA_VEREADORES[6], DATA_VEREADORES[7], DATA_VEREADORES[8]],
    presidente: DATA_VEREADORES[6],
    dataCriacao: "2025-01-01",
    ativo: true,
  },
  {
    id: "c04",
    nome: "Comissão de Vereança",
    tipo: "Temporária",
    membros: [DATA_VEREADORES[0], DATA_VEREADORES[2], DATA_VEREADORES[3]],
    presidente: DATA_VEREADORES[0],
    dataCriacao: "2025-02-01",
    dataFim: "2025-12-31",
    ativo: true,
  },
  {
    id: "c05",
    nome: "Comissão Especial de Estudos - Reforma Administrativa",
    tipo: "Temporária",
    membros: [
      DATA_VEREADORES[1],
      DATA_VEREADORES[4],
      DATA_VEREADORES[5],
      DATA_VEREADORES[6],
    ],
    presidente: DATA_VEREADORES[1],
    dataCriacao: "2025-03-01",
    dataFim: "2025-06-30",
    ativo: true,
  },
];

export const DATA_PRESENCAS: Presenca[] = [
  // Sessão s01 - 2025-02-03 (7 presentes, 2 ausentes)
  {
    sessaoId: "s01",
    sessaoData: "2025-02-03",
    vereadorId: "v01",
    presente: true,
  },
  {
    sessaoId: "s01",
    sessaoData: "2025-02-03",
    vereadorId: "v02",
    presente: true,
  },
  {
    sessaoId: "s01",
    sessaoData: "2025-02-03",
    vereadorId: "v03",
    presente: true,
  },
  {
    sessaoId: "s01",
    sessaoData: "2025-02-03",
    vereadorId: "v04",
    presente: false,
  },
  {
    sessaoId: "s01",
    sessaoData: "2025-02-03",
    vereadorId: "v05",
    presente: true,
  },
  {
    sessaoId: "s01",
    sessaoData: "2025-02-03",
    vereadorId: "v06",
    presente: true,
  },
  {
    sessaoId: "s01",
    sessaoData: "2025-02-03",
    vereadorId: "v07",
    presente: false,
  },
  {
    sessaoId: "s01",
    sessaoData: "2025-02-03",
    vereadorId: "v08",
    presente: true,
  },
  {
    sessaoId: "s01",
    sessaoData: "2025-02-03",
    vereadorId: "v09",
    presente: true,
  },
  // Sessão s02 - 2025-02-17 (8 presentes, 1 ausente)
  {
    sessaoId: "s02",
    sessaoData: "2025-02-17",
    vereadorId: "v01",
    presente: true,
  },
  {
    sessaoId: "s02",
    sessaoData: "2025-02-17",
    vereadorId: "v02",
    presente: true,
  },
  {
    sessaoId: "s02",
    sessaoData: "2025-02-17",
    vereadorId: "v03",
    presente: true,
  },
  {
    sessaoId: "s02",
    sessaoData: "2025-02-17",
    vereadorId: "v04",
    presente: true,
  },
  {
    sessaoId: "s02",
    sessaoData: "2025-02-17",
    vereadorId: "v05",
    presente: false,
  },
  {
    sessaoId: "s02",
    sessaoData: "2025-02-17",
    vereadorId: "v06",
    presente: true,
  },
  {
    sessaoId: "s02",
    sessaoData: "2025-02-17",
    vereadorId: "v07",
    presente: true,
  },
  {
    sessaoId: "s02",
    sessaoData: "2025-02-17",
    vereadorId: "v08",
    presente: true,
  },
  {
    sessaoId: "s02",
    sessaoData: "2025-02-17",
    vereadorId: "v09",
    presente: true,
  },
  // Sessão s03 - 2025-03-03 (7 presentes, 2 ausentes)
  {
    sessaoId: "s03",
    sessaoData: "2025-03-03",
    vereadorId: "v01",
    presente: true,
  },
  {
    sessaoId: "s03",
    sessaoData: "2025-03-03",
    vereadorId: "v02",
    presente: true,
  },
  {
    sessaoId: "s03",
    sessaoData: "2025-03-03",
    vereadorId: "v03",
    presente: true,
  },
  {
    sessaoId: "s03",
    sessaoData: "2025-03-03",
    vereadorId: "v04",
    presente: true,
  },
  {
    sessaoId: "s03",
    sessaoData: "2025-03-03",
    vereadorId: "v05",
    presente: true,
  },
  {
    sessaoId: "s03",
    sessaoData: "2025-03-03",
    vereadorId: "v06",
    presente: false,
  },
  {
    sessaoId: "s03",
    sessaoData: "2025-03-03",
    vereadorId: "v07",
    presente: true,
  },
  {
    sessaoId: "s03",
    sessaoData: "2025-03-03",
    vereadorId: "v08",
    presente: true,
  },
  {
    sessaoId: "s03",
    sessaoData: "2025-03-03",
    vereadorId: "v09",
    presente: false,
  },
  // Sessão s04 - 2025-03-17 (8 presentes, 1 ausente)
  {
    sessaoId: "s04",
    sessaoData: "2025-03-17",
    vereadorId: "v01",
    presente: true,
  },
  {
    sessaoId: "s04",
    sessaoData: "2025-03-17",
    vereadorId: "v02",
    presente: true,
  },
  {
    sessaoId: "s04",
    sessaoData: "2025-03-17",
    vereadorId: "v03",
    presente: false,
  },
  {
    sessaoId: "s04",
    sessaoData: "2025-03-17",
    vereadorId: "v04",
    presente: true,
  },
  {
    sessaoId: "s04",
    sessaoData: "2025-03-17",
    vereadorId: "v05",
    presente: true,
  },
  {
    sessaoId: "s04",
    sessaoData: "2025-03-17",
    vereadorId: "v06",
    presente: true,
  },
  {
    sessaoId: "s04",
    sessaoData: "2025-03-17",
    vereadorId: "v07",
    presente: true,
  },
  {
    sessaoId: "s04",
    sessaoData: "2025-03-17",
    vereadorId: "v08",
    presente: true,
  },
  {
    sessaoId: "s04",
    sessaoData: "2025-03-17",
    vereadorId: "v09",
    presente: true,
  },
  // Sessão s05 - 2025-04-07 (7 presentes, 2 ausentes)
  {
    sessaoId: "s05",
    sessaoData: "2025-04-07",
    vereadorId: "v01",
    presente: true,
  },
  {
    sessaoId: "s05",
    sessaoData: "2025-04-07",
    vereadorId: "v02",
    presente: true,
  },
  {
    sessaoId: "s05",
    sessaoData: "2025-04-07",
    vereadorId: "v03",
    presente: true,
  },
  {
    sessaoId: "s05",
    sessaoData: "2025-04-07",
    vereadorId: "v04",
    presente: true,
  },
  {
    sessaoId: "s05",
    sessaoData: "2025-04-07",
    vereadorId: "v05",
    presente: false,
  },
  {
    sessaoId: "s05",
    sessaoData: "2025-04-07",
    vereadorId: "v06",
    presente: true,
  },
  {
    sessaoId: "s05",
    sessaoData: "2025-04-07",
    vereadorId: "v07",
    presente: false,
  },
  {
    sessaoId: "s05",
    sessaoData: "2025-04-07",
    vereadorId: "v08",
    presente: true,
  },
  {
    sessaoId: "s05",
    sessaoData: "2025-04-07",
    vereadorId: "v09",
    presente: true,
  },
];

export interface DespesaCategoria {
  nome: string;
  empenhado: number;
  liquidado: number;
  pago: number;
}

export const DATA_DESPESAS_CATEGORIAS: DespesaCategoria[] = [
  {
    nome: "Pessoal e Encargos",
    empenhado: 6_396_000,
    liquidado: 6_200_000,
    pago: 6_100_000,
  },
  {
    nome: "Diárias e Locomoção",
    empenhado: 45_000,
    liquidado: 42_000,
    pago: 40_000,
  },
  {
    nome: "Material de Consumo",
    empenhado: 180_000,
    liquidado: 165_000,
    pago: 158_000,
  },
  {
    nome: "Serviços de Terceiros",
    empenhado: 2_100_000,
    liquidado: 1_980_000,
    pago: 1_900_000,
  },
  {
    nome: "Investimentos",
    empenhado: 819_000,
    liquidado: 750_000,
    pago: 700_000,
  },
  {
    nome: "Outras Despesas",
    empenhado: 300_000,
    liquidado: 280_000,
    pago: 260_000,
  },
];

export const DATA_DIARIAS_MES = [
  { mes: "Jan", valor: 3500 },
  { mes: "Fev", valor: 4200 },
  { mes: "Mar", valor: 3800 },
  { mes: "Abr", valor: 5100 },
  { mes: "Mai", valor: 4500 },
  { mes: "Jun", valor: 4000 },
  { mes: "Jul", valor: 3200 },
  { mes: "Ago", valor: 3800 },
  { mes: "Set", valor: 4200 },
  { mes: "Out", valor: 3500 },
  { mes: "Nov", valor: 2800 },
  { mes: "Dez", valor: 2400 },
];

export function calcularPresencaVereador(vereadorId: string): number {
  const presencasVereador = DATA_PRESENCAS.filter(
    (p) => p.vereadorId === vereadorId,
  );
  if (presencasVereador.length === 0) return 0;
  const presentes = presencasVereador.filter((p) => p.presente).length;
  return Math.round((presentes / presencasVereador.length) * 100);
}

export function calcularPresencaGeral(): number {
  if (DATA_PRESENCAS.length === 0) return 0;
  const presentes = DATA_PRESENCAS.filter((p) => p.presente).length;
  return Math.round((presentes / DATA_PRESENCAS.length) * 100);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

export function formatDateShort(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}`;
}

export const LEGISLATIVO_SNAPSHOT = {
  ORCAMENTO_LEGISLATIVO,
  DESPESA_EMPENHADA_LEGISLATIVO,
  TOTAL_DIARIAS_LEGISLATIVO,
  QUANTIDADE_DIARIAS,
  MEDIA_DIARIAS,
  GASTO_PESSOAL_PORCENTO,
  LIMITE_GASTO_PESSOAL,
  PartidoCores,
  DATA_SESSOES,
  DATA_VEREADORES,
  MESA_DIRETORA,
  DATA_SESSOES_COMPLETO,
  DATA_PROPOSITURAS,
  DATA_COMISSOES,
  DATA_PRESENCAS,
  DATA_DESPESAS_CATEGORIAS,
  DATA_DIARIAS_MES,
};
