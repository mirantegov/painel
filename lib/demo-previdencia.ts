export const TOTAL_PARTICIPANTES_ATIVOS = 1247;
export const TOTAL_APOSENTADOS = 368;
export const TOTAL_PENSIONISTAS = 199;
export const TOTAL_BENEFICIARIOS = TOTAL_APOSENTADOS + TOTAL_PENSIONISTAS;

export const RECEITA_CONTRIBUICOES = 2_450_000;
export const RECEITA_INVESTIMENTOS = 1_890_000;
export const RECEITA_TOTAL = RECEITA_CONTRIBUICOES + RECEITA_INVESTIMENTOS;

export const DESPESA_BENEFICIOS = 4_250_000;
export const DESPESA_APOSENTADORIAS = 2_890_000;
export const DESPESA_PENSOES = 1_120_000;
export const DESPESA_AUXILIOS = 240_000;
export const DESPESA_ADMINISTRATIVA = 980_000;
export const DESPESA_TOTAL = DESPESA_BENEFICIOS + DESPESA_ADMINISTRATIVA;

export const SALDO_FUNDO = 45_600_000;
export const PATRIMONIO_LIQUIDO = 42_300_000;
export const PROVISOES_MATEMATICAS = 48_900_000;
export const RENTABILIDADE_ACUMULADA = 12.5;
export const META_ATUARIAL = 6.0;

export const INDICE_SOLVENCIA = 86.5;
export const INDICE_COBERTURA = 91.2;

export type CategoriaParticipante =
  | "Efetivo"
  | "Comissionado"
  | "Contratado"
  | "Estatutário";
export type TipoAposentadoria =
  | "Idade"
  | "Invalidez"
  | "Compulsória"
  | "Voluntária"
  | "Especial";
export type TipoPensao = "Morte" | "Alimentícia" | "Provisória";
export type SituacaoBeneficio =
  | "Ativo"
  | "Suspenso"
  | "Cancelado"
  | "Em Análise";

export interface Participante {
  id: string;
  nome: string;
  matricula: string;
  orgao: string;
  cargo: string;
  dataAdmissao: string;
  salario: number;
  aliquota: number;
  categoria: CategoriaParticipante;
}

export interface Aposentado {
  id: string;
  nome: string;
  matricula: string;
  tipoAposentadoria: TipoAposentadoria;
  orgaoOrigem: string;
  valorBeneficio: number;
  dataAposentacao: string;
  tempoContribuicao: number;
}

export interface Pensionista {
  id: string;
  nome: string;
  cpf: string;
  instituidor: string;
  tipoPensao: TipoPensao;
  valorPensao: number;
  dataInicio: string;
  quota: number;
}

export interface Beneficiario {
  tipo: "Aposentadoria" | "Pensão" | "Auxílio";
  subtipo: string;
  quantidade: number;
  valorMedio: number;
  valorTotal: number;
}

export interface Provento {
  mes: string;
  salario: number;
  aposentadoria: number;
  pensao: number;
  Auxilio: number;
}

export interface DadosMensais {
  mes: string;
  receitas: number;
  despesas: number;
  saldo: number;
}

export interface ProjecaoAtuarial {
  ano: number;
  ativo: number;
  passivo: number;
  resultado: number;
}

export const CORES_VERDE = {
  verdeEscuro: "#059669",
  verdeMedio: "#10B981",
  verdeClaro: "#34D399",
  verdeMuitoClaro: "#D1FAE5",
  verdeSuave: "#6EE7B7",
};

export const DATA_PARTICIPANTES: Participante[] = [
  {
    id: "p01",
    nome: "Carlos Alberto Santos",
    matricula: "2019001",
    orgao: "Secretaria de Educação",
    cargo: "Professor",
    dataAdmissao: "2015-03-15",
    salario: 4500,
    aliquota: 14,
    categoria: "Estatutário",
  },
  {
    id: "p02",
    nome: "Maria Fernanda Oliveira",
    matricula: "2019002",
    orgao: "Secretaria de Saúde",
    cargo: "Enfermeira",
    dataAdmissao: "2016-07-22",
    salario: 5200,
    aliquota: 14,
    categoria: "Estatutário",
  },
  {
    id: "p03",
    nome: "João Pedro Souza",
    matricula: "2019003",
    orgao: "Prefeitura",
    cargo: "Assistente Administrativo",
    dataAdmissao: "2017-01-10",
    salario: 2800,
    aliquota: 11,
    categoria: "Efetivo",
  },
  {
    id: "p04",
    nome: "Ana Paula Costa",
    matricula: "2019004",
    orgao: "Secretaria de Obras",
    cargo: "Engenheira",
    dataAdmissao: "2018-05-03",
    salario: 6800,
    aliquota: 14,
    categoria: "Estatutário",
  },
  {
    id: "p05",
    nome: "Roberto Lima Silva",
    matricula: "2019005",
    orgao: "Secretaria de Finanças",
    cargo: "Contador",
    dataAdmissao: "2014-11-20",
    salario: 7200,
    aliquota: 14,
    categoria: "Estatutário",
  },
  {
    id: "p06",
    nome: "Patricia Alves Ferreira",
    matricula: "2019006",
    orgao: "Secretaria de Administração",
    cargo: "Diretora",
    dataAdmissao: "2013-02-28",
    salario: 8500,
    aliquota: 14,
    categoria: "Comissionado",
  },
  {
    id: "p07",
    nome: "Paulo Roberto Martins",
    matricula: "2019007",
    orgao: "Secretaria de Educação",
    cargo: "Motorista",
    dataAdmissao: "2019-08-14",
    salario: 2400,
    aliquota: 11,
    categoria: "Efetivo",
  },
  {
    id: "p08",
    nome: "Claudia Regina Souza",
    matricula: "2019008",
    orgao: "Secretaria de Saúde",
    cargo: "Técnica de Enfermagem",
    dataAdmissao: "2016-04-05",
    salario: 3100,
    aliquota: 11,
    categoria: "Estatutário",
  },
  {
    id: "p09",
    nome: "Fernando Henrique Costa",
    matricula: "2019009",
    orgao: "Guarda Municipal",
    cargo: "Guarda",
    dataAdmissao: "2017-09-30",
    salario: 2600,
    aliquota: 11,
    categoria: "Estatutário",
  },
  {
    id: "p10",
    nome: "Juliana Maria Santos",
    matricula: "2019010",
    orgao: "Secretaria de Ação Social",
    cargo: "Assistente Social",
    dataAdmissao: "2015-12-01",
    salario: 4200,
    aliquota: 14,
    categoria: "Estatutário",
  },
];

export const DATA_APOSENTADOS: Aposentado[] = [
  {
    id: "a01",
    nome: "José Ricardo Mendes",
    matricula: "2005001",
    tipoAposentadoria: "Idade",
    orgaoOrigem: "Secretaria de Educação",
    valorBeneficio: 4200,
    dataAposentacao: "2022-06-15",
    tempoContribuicao: 35,
  },
  {
    id: "a02",
    nome: "Maria Helena Santos",
    matricula: "2005002",
    tipoAposentadoria: "Invalidez",
    orgaoOrigem: "Secretaria de Saúde",
    valorBeneficio: 5100,
    dataAposentacao: "2021-03-20",
    tempoContribuicao: 28,
  },
  {
    id: "a03",
    nome: "Pedro Paulo Oliveira",
    matricula: "2005003",
    tipoAposentadoria: "Compulsória",
    orgaoOrigem: "Prefeitura",
    valorBeneficio: 3800,
    dataAposentacao: "2023-01-10",
    tempoContribuicao: 30,
  },
  {
    id: "a04",
    nome: "Ana Lucia Ferreira",
    matricula: "2005004",
    tipoAposentadoria: "Voluntária",
    orgaoOrigem: "Secretaria de Finanças",
    valorBeneficio: 6800,
    dataAposentacao: "2020-11-30",
    tempoContribuicao: 32,
  },
  {
    id: "a05",
    nome: "Carlos Eduardo Lima",
    matricula: "2005005",
    tipoAposentadoria: "Especial",
    orgaoOrigem: "Secretaria de Obras",
    valorBeneficio: 7200,
    dataAposentacao: "2019-08-25",
    tempoContribuicao: 30,
  },
  {
    id: "a06",
    nome: "Beatriz Cristina Souza",
    matricula: "2005006",
    tipoAposentadoria: "Idade",
    orgaoOrigem: "Secretaria de Administração",
    valorBeneficio: 4500,
    dataAposentacao: "2022-09-12",
    tempoContribuicao: 33,
  },
  {
    id: "a07",
    nome: "Ricardo Alfonso Rocha",
    matricula: "2005007",
    tipoAposentadoria: "Invalidez",
    orgaoOrigem: "Guarda Municipal",
    valorBeneficio: 3900,
    dataAposentacao: "2021-07-08",
    tempoContribuicao: 25,
  },
  {
    id: "a08",
    nome: "Teresa Cristina Vieira",
    matricula: "2005008",
    tipoAposentadoria: "Voluntária",
    orgaoOrigem: "Secretaria de Ação Social",
    valorBeneficio: 4100,
    dataAposentacao: "2020-04-22",
    tempoContribuicao: 31,
  },
];

export const DATA_PENSIONISTAS: Pensionista[] = [
  {
    id: "pen01",
    nome: "Sofia Mendes Oliveira",
    cpf: "123.456.789-00",
    instituidor: "José Ricardo Mendes",
    tipoPensao: "Morte",
    valorPensao: 2100,
    dataInicio: "2022-06-15",
    quota: 100,
  },
  {
    id: "pen02",
    nome: "Lucas Ferreira Santos",
    cpf: "234.567.890-11",
    instituidor: "Maria Helena Santos",
    tipoPensao: "Morte",
    valorPensao: 2550,
    dataInicio: "2021-03-20",
    quota: 50,
  },
  {
    id: "pen03",
    nome: "Marina Costa Silva",
    cpf: "345.678.901-22",
    instituidor: "Pedro Paulo Oliveira",
    tipoPensao: "Alimentícia",
    valorPensao: 1900,
    dataInicio: "2023-01-10",
    quota: 50,
  },
  {
    id: "pen04",
    nome: "Gustavo Henrique Lima",
    cpf: "456.789.012-33",
    instituidor: "Carlos Eduardo Lima",
    tipoPensao: "Morte",
    valorPensao: 3600,
    dataInicio: "2019-08-25",
    quota: 50,
  },
  {
    id: "pen05",
    nome: "Isabella Santos Rocha",
    cpf: "567.890.123-44",
    instituidor: "Ana Lucia Ferreira",
    tipoPensao: "Provisória",
    valorPensao: 2250,
    dataInicio: "2020-11-30",
    quota: 100,
  },
  {
    id: "pen06",
    nome: "Thiago Oliveira Martins",
    cpf: "678.901.234-55",
    instituidor: "Ricardo Alfonso Rocha",
    tipoPensao: "Morte",
    valorPensao: 1950,
    dataInicio: "2021-07-08",
    quota: 50,
  },
];

export const DATA_BENEFICIARIOS: Beneficiario[] = [
  {
    tipo: "Aposentadoria",
    subtipo: "Por Idade",
    quantidade: 168,
    valorMedio: 4250,
    valorTotal: 714000,
  },
  {
    tipo: "Aposentadoria",
    subtipo: "Por Invalidez",
    quantidade: 67,
    valorMedio: 5100,
    valorTotal: 341700,
  },
  {
    tipo: "Aposentadoria",
    subtipo: "Compulsória",
    quantidade: 28,
    valorMedio: 3800,
    valorTotal: 106400,
  },
  {
    tipo: "Aposentadoria",
    subtipo: "Voluntária",
    quantidade: 82,
    valorMedio: 6200,
    valorTotal: 508400,
  },
  {
    tipo: "Aposentadoria",
    subtipo: "Especial",
    quantidade: 23,
    valorMedio: 7200,
    valorTotal: 165600,
  },
  {
    tipo: "Pensão",
    subtipo: "Por Morte",
    quantidade: 156,
    valorMedio: 3450,
    valorTotal: 538200,
  },
  {
    tipo: "Pensão",
    subtipo: "Alimentícia",
    quantidade: 31,
    valorMedio: 2100,
    valorTotal: 65100,
  },
  {
    tipo: "Pensão",
    subtipo: "Provisória",
    quantidade: 12,
    valorMedio: 2250,
    valorTotal: 27000,
  },
  {
    tipo: "Auxílio",
    subtipo: "Doença",
    quantidade: 34,
    valorMedio: 2800,
    valorTotal: 95200,
  },
  {
    tipo: "Auxílio",
    subtipo: "Acidente",
    quantidade: 12,
    valorMedio: 3100,
    valorTotal: 37200,
  },
  {
    tipo: "Auxílio",
    subtipo: "Maternidade",
    quantidade: 18,
    valorMedio: 3500,
    valorTotal: 63000,
  },
];

export const DATA_EVOLUCAO_BENEFICIARIOS: DadosMensais[] = [
  { mes: "Jan", receitas: 380000, despesas: 410000, saldo: -30000 },
  { mes: "Fev", receitas: 395000, despesas: 405000, saldo: -10000 },
  { mes: "Mar", receitas: 410000, despesas: 420000, saldo: -10000 },
  { mes: "Abr", receitas: 405000, despesas: 415000, saldo: -10000 },
  { mes: "Mai", receitas: 420000, despesas: 425000, saldo: -5000 },
  { mes: "Jun", receitas: 430000, despesas: 428000, saldo: 2000 },
  { mes: "Jul", receitas: 445000, despesas: 430000, saldo: 15000 },
  { mes: "Ago", receitas: 450000, despesas: 435000, saldo: 15000 },
  { mes: "Set", receitas: 448000, despesas: 432000, saldo: 16000 },
  { mes: "Out", receitas: 460000, despesas: 438000, saldo: 22000 },
  { mes: "Nov", receitas: 465000, despesas: 440000, saldo: 25000 },
  { mes: "Dez", receitas: 470000, despesas: 445000, saldo: 25000 },
];

export const DATA_BENEFICIARIOS_MES = [
  { mes: "Jan", quantidade: 520 },
  { mes: "Fev", quantidade: 528 },
  { mes: "Mar", quantidade: 535 },
  { mes: "Abr", quantidade: 541 },
  { mes: "Mai", quantidade: 548 },
  { mes: "Jun", quantidade: 552 },
  { mes: "Jul", quantidade: 558 },
  { mes: "Ago", quantidade: 561 },
  { mes: "Set", quantidade: 565 },
  { mes: "Out", quantidade: 567 },
  { mes: "Nov", quantidade: 567 },
  { mes: "Dez", quantidade: 567 },
];

export const DATA_RECEITAS_MENSAL = [
  { mes: "Jan", contribuicoes: 190000, investimentos: 145000 },
  { mes: "Fev", contribuicoes: 195000, investimentos: 152000 },
  { mes: "Mar", contribuicoes: 200000, investimentos: 158000 },
  { mes: "Abr", contribuicoes: 198000, investimentos: 155000 },
  { mes: "Mai", contribuicoes: 205000, investimentos: 162000 },
  { mes: "Jun", contribuicoes: 210000, investimentos: 168000 },
  { mes: "Jul", contribuicoes: 215000, investimentos: 172000 },
  { mes: "Ago", contribuicoes: 218000, investimentos: 175000 },
  { mes: "Set", contribuicoes: 220000, investimentos: 178000 },
  { mes: "Out", contribuicoes: 225000, investimentos: 182000 },
  { mes: "Nov", contribuicoes: 228000, investimentos: 185000 },
  { mes: "Dez", contribuicoes: 230000, investimentos: 188000 },
];

export const DATA_PROJECAO_ATUARIAL: ProjecaoAtuarial[] = [
  { ano: 2025, ativo: 45600000, passivo: 48900000, resultado: -3300000 },
  { ano: 2026, ativo: 49200000, passivo: 51200000, resultado: -2000000 },
  { ano: 2027, ativo: 53100000, passivo: 53600000, resultado: -500000 },
  { ano: 2028, ativo: 57300000, passivo: 55800000, resultado: 1500000 },
  { ano: 2029, ativo: 61800000, passivo: 58200000, resultado: 3600000 },
  { ano: 2030, ativo: 66700000, passivo: 60800000, resultado: 5900000 },
  { ano: 2031, ativo: 72000000, passivo: 63500000, resultado: 8500000 },
  { ano: 2032, ativo: 77800000, passivo: 66400000, resultado: 11400000 },
];

export const DATA_SOLVENCIA = [
  { ano: 2025, indice: 93.2 },
  { ano: 2026, indice: 96.1 },
  { ano: 2027, indice: 99.1 },
  { ano: 2028, indice: 102.7 },
  { ano: 2029, indice: 106.2 },
  { ano: 2030, indice: 109.7 },
  { ano: 2031, indice: 113.4 },
  { ano: 2032, indice: 117.2 },
];

export const DATA_BENEFICIOS_ANALISE = [
  {
    id: "b01",
    tipo: "Aposentadoria",
    subtipo: "Por Idade",
    nome: "Francisco Silva Neto",
    valor: 4200,
    dataRequisicao: "2025-03-15",
    tempoAnalise: 25,
    situacao: "Em Análise",
  },
  {
    id: "b02",
    tipo: "Pensão",
    subtipo: "Por Morte",
    nome: "Carla Beatriz Santos",
    valor: 3400,
    dataRequisicao: "2025-03-18",
    tempoAnalise: 22,
    situacao: "Em Análise",
  },
  {
    id: "b03",
    tipo: "Auxílio",
    subtipo: "Doença",
    nome: "Roberto Carlos Lima",
    valor: 2800,
    dataRequisicao: "2025-03-20",
    tempoAnalise: 18,
    situacao: "Indeferido",
  },
  {
    id: "b04",
    tipo: "Aposentadoria",
    subtipo: "Invalidez",
    nome: "Maria Tereza Costa",
    valor: 5100,
    dataRequisicao: "2025-03-22",
    tempoAnalise: 15,
    situacao: "Deferido",
  },
  {
    id: "b05",
    tipo: "Pensão",
    subtipo: "Alimentícia",
    nome: "Pedro Henrique Souza",
    valor: 2100,
    dataRequisicao: "2025-03-25",
    tempoAnalise: 12,
    situacao: "Em Análise",
  },
  {
    id: "b06",
    tipo: "Aposentadoria",
    subtipo: "Voluntária",
    nome: "Angela Maria Ferreira",
    valor: 6500,
    dataRequisicao: "2025-03-28",
    tempoAnalise: 8,
    situacao: "Em Análise",
  },
  {
    id: "b07",
    tipo: "Auxílio",
    subtipo: "Maternidade",
    nome: "Camila Rodrigues Silva",
    valor: 3500,
    dataRequisicao: "2025-04-01",
    tempoAnalise: 5,
    situacao: "Deferido",
  },
  {
    id: "b08",
    tipo: "Aposentadoria",
    subtipo: "Compulsória",
    nome: "José Mário Andrade",
    valor: 3800,
    dataRequisicao: "2025-04-03",
    tempoAnalise: 3,
    situacao: "Em Análise",
  },
];

export const DATA_ORGAOS = [
  { orgao: "Secretaria de Educação", participantes: 412, contribuicao: 850000 },
  { orgao: "Secretaria de Saúde", participantes: 298, contribuicao: 620000 },
  {
    orgao: "Prefeitura - Adm. Geral",
    participantes: 187,
    contribuicao: 380000,
  },
  { orgao: "Secretaria de Obras", participantes: 124, contribuicao: 250000 },
  { orgao: "Secretaria de Finanças", participantes: 56, contribuicao: 120000 },
  {
    orgao: "Secretaria de Administração",
    participantes: 78,
    contribuicao: 160000,
  },
  { orgao: "Guarda Municipal", participantes: 52, contribuicao: 45000 },
  {
    orgao: "Secretaria de Ação Social",
    participantes: 40,
    contribuicao: 25000,
  },
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencyCompact(value: number): string {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)} Mi`;
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)} mil`;
  }
  return formatCurrency(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}
