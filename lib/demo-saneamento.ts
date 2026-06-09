// ── Constantes Gerais ──────────────────────────────────────────────

export const POPULACAO_TOTAL = 52_000;
export const POPULACAO_ATENDIDA_AGUA = 48_500;
export const COBERTURA_AGUA_PCT = +(
  (POPULACAO_ATENDIDA_AGUA / POPULACAO_TOTAL) *
  100
).toFixed(1); // 93.3
export const POPULACAO_ATENDIDA_ESGOTO = 38_400;
export const COBERTURA_ESGOTO_PCT = +(
  (POPULACAO_ATENDIDA_ESGOTO / POPULACAO_TOTAL) *
  100
).toFixed(1); // 73.8

export const VOLUME_PRODUZIDO_M3 = 7_200_000;
export const VOLUME_FATURADO_M3 = 4_860_000;
export const INDICE_PERDA_AGUA_PCT = 32.5;

export const RECEITA_TOTAL_SANEAMENTO = 8_950_000;
export const DESPESA_OPERACIONAL_SANEAMENTO = 6_320_000;
export const INVESTIMENTO_OBRAS = 3_200_000;
export const CONTAS_RECEBER = 2_850_000;
export const INADIMPLENCIA_PCT = 18.7;

export const ETA_CAPACIDADE_LS = 750;
export const ETA_PRODUCAO_ATUAL_LS = 520;

export const LIGACOES_ATIVAS_AGUA = 16_480;
export const LIGACOES_ATIVAS_ESGOTO = 12_320;
export const ETES_ATIVAS = 3;
export const VOLUME_ESGOTO_COLETADO_M3 = 3_450_000;
export const VOLUME_ESGOTO_TRATADO_M3 = 3_100_000;

export const BACIAS_MONITORADAS = 6;
export const PONTOS_CRITICOS_DRENAGEM = 14;
export const VOLUME_DRENAGEM_DESTINADO_M3 = 1_280_000;
export const OBRAS_MACRODRENAGEM = 4;

// ── Types ──────────────────────────────────────────────────────────

export type TipoObraSaneamento =
  | "Rede de Água"
  | "Rede de Esgoto"
  | "ETA"
  | "ETE"
  | "Reservatório"
  | "Macrodrenagem"
  | "Microdrenagem"
  | "Estação Elevatória";

export type StatusObra =
  | "Em Execução"
  | "Concluída"
  | "Paralisada"
  | "Licitação";

export type TipoParametroAgua =
  | "Turbidez"
  | "Cloro Residual"
  | "pH"
  | "Coliformes"
  | "Flúor"
  | "Cor Aparente";

export type SituacaoLigacao = "Ativa" | "Cortada" | "Suprimida";

export type TipoLigacao = "Residencial" | "Comercial" | "Industrial";

export type CategoriaDespesaSaneamento =
  | "Pessoal"
  | "Produtos Químicos"
  | "Energia Elétrica"
  | "Manutenção"
  | "Serviços Terceirizados"
  | "Outros";

// ── Interfaces ─────────────────────────────────────────────────────

export interface ObraSaneamento {
  id: string;
  nome: string;
  tipo: TipoObraSaneamento;
  status: StatusObra;
  bairro: string;
  valorTotal: number;
  valorExecutado: number;
  percentualExecucao: number;
  prazoMeses: number;
  mesInicio: string;
  mesPrevisto: string;
}

export interface ParametroAgua {
  parametro: TipoParametroAgua;
  unidade: string;
  valorMedido: number;
  limiteMin: number;
  limiteMax: number;
  conforme: boolean;
}

export interface PontoCaptacao {
  id: string;
  nome: string;
  tipo: "Superficial" | "Subterrâneo";
  vazaoLS: number;
  capacidadeLS: number;
  qualidade: "Boa" | "Regular" | "Crítica";
}

export interface LigacaoAgua {
  tipo: TipoLigacao;
  quantidade: number;
  situacao: SituacaoLigacao;
}

export interface DadoMensal {
  mes: string;
  valor: number;
}

export interface ReceitaDespesaMensal {
  mes: string;
  receita: number;
  despesa: number;
}

export interface ContaReceberMensal {
  mes: string;
  total: number;
  ate30: number;
  de31a60: number;
  de61a90: number;
  acima90: number;
}

export interface DespesaCategoriaSaneamento {
  categoria: CategoriaDespesaSaneamento;
  empenhado: number;
  liquidado: number;
  pago: number;
}

export interface EsgotoMensal {
  mes: string;
  coletado: number;
  tratado: number;
  lancado: number;
}

export interface SistemaTratamento {
  id: string;
  nome: string;
  tipo: "UASB" | "Lagoa" | "Lodo Ativado";
  capacidadeM3Dia: number;
  operacaoM3Dia: number;
  eficiencia: number;
  bairrosAtendidos: string[];
}

export interface PontoCriticoDrenagem {
  id: string;
  local: string;
  bairro: string;
  risco: "Alto" | "Médio" | "Baixo";
  eventosAno: number;
  intervencao: string;
  status: "Concluída" | "Em Obra" | "Planejada";
}

export interface EventoDrenagemMensal {
  mes: string;
  alagamentos: number;
  inundacoes: number;
}

// ── Helpers ────────────────────────────────────────────────────────

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatCurrencyCompact(value: number): string {
  if (value >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `R$ ${(value / 1_000).toFixed(0)}mil`;
  }
  return formatCurrency(value);
}

export function formatNumber(value: number): string {
  return value.toLocaleString("pt-BR");
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

// ── Data: Parâmetros de Potabilidade ───────────────────────────────

export const DATA_PARAMETROS_AGUA: ParametroAgua[] = [
  {
    parametro: "Turbidez",
    unidade: "uT",
    valorMedido: 0.8,
    limiteMin: 0,
    limiteMax: 5.0,
    conforme: true,
  },
  {
    parametro: "Cloro Residual",
    unidade: "mg/L",
    valorMedido: 1.2,
    limiteMin: 0.2,
    limiteMax: 5.0,
    conforme: true,
  },
  {
    parametro: "pH",
    unidade: "-",
    valorMedido: 7.1,
    limiteMin: 6.0,
    limiteMax: 9.5,
    conforme: true,
  },
  {
    parametro: "Coliformes",
    unidade: "NMP/100mL",
    valorMedido: 0,
    limiteMin: 0,
    limiteMax: 0,
    conforme: true,
  },
  {
    parametro: "Flúor",
    unidade: "mg/L",
    valorMedido: 0.75,
    limiteMin: 0.6,
    limiteMax: 0.8,
    conforme: true,
  },
  {
    parametro: "Cor Aparente",
    unidade: "uH",
    valorMedido: 8.5,
    limiteMin: 0,
    limiteMax: 15,
    conforme: true,
  },
];

// ── Data: Pontos de Captação ───────────────────────────────────────

export const DATA_PONTOS_CAPTACAO: PontoCaptacao[] = [
  {
    id: "PC-001",
    nome: "Rio Iguaçu - Captação Principal",
    tipo: "Superficial",
    vazaoLS: 320,
    capacidadeLS: 450,
    qualidade: "Boa",
  },
  {
    id: "PC-002",
    nome: "Rio Tibagi - Captação Norte",
    tipo: "Superficial",
    vazaoLS: 125,
    capacidadeLS: 180,
    qualidade: "Regular",
  },
  {
    id: "PC-003",
    nome: "Poço Profundo Centro",
    tipo: "Subterrâneo",
    vazaoLS: 45,
    capacidadeLS: 60,
    qualidade: "Boa",
  },
  {
    id: "PC-004",
    nome: "Poço Profundo Industrial",
    tipo: "Subterrâneo",
    vazaoLS: 30,
    capacidadeLS: 60,
    qualidade: "Boa",
  },
];

// ── Data: Distribuição de Ligações ─────────────────────────────────

export const DATA_DISTRIBUICAO_LIGACOES: LigacaoAgua[] = [
  { tipo: "Residencial", quantidade: 13_850, situacao: "Ativa" },
  { tipo: "Comercial", quantidade: 2_120, situacao: "Ativa" },
  { tipo: "Industrial", quantidade: 510, situacao: "Ativa" },
];

// ── Data: Receitas Mensais ─────────────────────────────────────────

export const DATA_RECEITAS_MENSAIS: ReceitaDespesaMensal[] = [
  { mes: "Jan", receita: 695_000, despesa: 510_000 },
  { mes: "Fev", receita: 710_000, despesa: 525_000 },
  { mes: "Mar", receita: 740_000, despesa: 530_000 },
  { mes: "Abr", receita: 725_000, despesa: 518_000 },
  { mes: "Mai", receita: 760_000, despesa: 542_000 },
  { mes: "Jun", receita: 730_000, despesa: 520_000 },
  { mes: "Jul", receita: 755_000, despesa: 535_000 },
  { mes: "Ago", receita: 770_000, despesa: 545_000 },
  { mes: "Set", receita: 745_000, despesa: 528_000 },
  { mes: "Out", receita: 780_000, despesa: 540_000 },
  { mes: "Nov", receita: 760_000, despesa: 530_000 },
  { mes: "Dez", receita: 780_000, despesa: 497_000 },
];

// ── Data: Despesas por Categoria ───────────────────────────────────

export const DATA_DESPESAS_CATEGORIAS_SANEAMENTO: DespesaCategoriaSaneamento[] =
  [
    {
      categoria: "Pessoal",
      empenhado: 2_100_000,
      liquidado: 2_050_000,
      pago: 2_000_000,
    },
    {
      categoria: "Produtos Químicos",
      empenhado: 980_000,
      liquidado: 940_000,
      pago: 920_000,
    },
    {
      categoria: "Energia Elétrica",
      empenhado: 1_350_000,
      liquidado: 1_320_000,
      pago: 1_300_000,
    },
    {
      categoria: "Manutenção",
      empenhado: 850_000,
      liquidado: 810_000,
      pago: 780_000,
    },
    {
      categoria: "Serviços Terceirizados",
      empenhado: 720_000,
      liquidado: 690_000,
      pago: 650_000,
    },
    {
      categoria: "Outros",
      empenhado: 320_000,
      liquidado: 310_000,
      pago: 290_000,
    },
  ];

// ── Data: Contas a Receber (Aging) ─────────────────────────────────

export const DATA_CONTAS_RECEBER: ContaReceberMensal[] = [
  {
    mes: "Jan",
    total: 230_000,
    ate30: 95_000,
    de31a60: 55_000,
    de61a90: 42_000,
    acima90: 38_000,
  },
  {
    mes: "Fev",
    total: 235_000,
    ate30: 98_000,
    de31a60: 52_000,
    de61a90: 45_000,
    acima90: 40_000,
  },
  {
    mes: "Mar",
    total: 240_000,
    ate30: 100_000,
    de31a60: 58_000,
    de61a90: 43_000,
    acima90: 39_000,
  },
  {
    mes: "Abr",
    total: 238_000,
    ate30: 97_000,
    de31a60: 56_000,
    de61a90: 44_000,
    acima90: 41_000,
  },
  {
    mes: "Mai",
    total: 242_000,
    ate30: 102_000,
    de31a60: 54_000,
    de61a90: 46_000,
    acima90: 40_000,
  },
  {
    mes: "Jun",
    total: 237_000,
    ate30: 96_000,
    de31a60: 57_000,
    de61a90: 43_000,
    acima90: 41_000,
  },
  {
    mes: "Jul",
    total: 245_000,
    ate30: 104_000,
    de31a60: 55_000,
    de61a90: 45_000,
    acima90: 41_000,
  },
  {
    mes: "Ago",
    total: 240_000,
    ate30: 99_000,
    de31a60: 56_000,
    de61a90: 44_000,
    acima90: 41_000,
  },
  {
    mes: "Set",
    total: 238_000,
    ate30: 97_000,
    de31a60: 55_000,
    de61a90: 45_000,
    acima90: 41_000,
  },
  {
    mes: "Out",
    total: 243_000,
    ate30: 103_000,
    de31a60: 54_000,
    de61a90: 44_000,
    acima90: 42_000,
  },
  {
    mes: "Nov",
    total: 241_000,
    ate30: 101_000,
    de31a60: 56_000,
    de61a90: 43_000,
    acima90: 41_000,
  },
  {
    mes: "Dez",
    total: 248_000,
    ate30: 106_000,
    de31a60: 57_000,
    de61a90: 44_000,
    acima90: 41_000,
  },
];

// ── Data: Inadimplência Mensal ─────────────────────────────────────

export const DATA_INADIMPLENCIA_MENSAL: DadoMensal[] = [
  { mes: "Jan", valor: 19.2 },
  { mes: "Fev", valor: 19.5 },
  { mes: "Mar", valor: 18.8 },
  { mes: "Abr", valor: 18.4 },
  { mes: "Mai", valor: 18.1 },
  { mes: "Jun", valor: 18.9 },
  { mes: "Jul", valor: 19.0 },
  { mes: "Ago", valor: 18.6 },
  { mes: "Set", valor: 18.3 },
  { mes: "Out", valor: 18.0 },
  { mes: "Nov", valor: 18.5 },
  { mes: "Dez", valor: 18.7 },
];

// ── Data: Índice de Perda de Água Mensal ───────────────────────────

export const DATA_PERDA_AGUA_MENSAL: DadoMensal[] = [
  { mes: "Jan", valor: 34.2 },
  { mes: "Fev", valor: 33.8 },
  { mes: "Mar", valor: 33.5 },
  { mes: "Abr", valor: 33.1 },
  { mes: "Mai", valor: 32.8 },
  { mes: "Jun", valor: 32.6 },
  { mes: "Jul", valor: 32.5 },
  { mes: "Ago", valor: 32.3 },
  { mes: "Set", valor: 32.1 },
  { mes: "Out", valor: 31.9 },
  { mes: "Nov", valor: 32.2 },
  { mes: "Dez", valor: 32.5 },
];

// ── Data: Qualidade da Água (% conformidade mensal) ────────────────

export const DATA_QUALIDADE_AGUA: DadoMensal[] = [
  { mes: "Jan", valor: 98.2 },
  { mes: "Fev", valor: 97.8 },
  { mes: "Mar", valor: 98.5 },
  { mes: "Abr", valor: 99.0 },
  { mes: "Mai", valor: 98.7 },
  { mes: "Jun", valor: 98.9 },
  { mes: "Jul", valor: 99.1 },
  { mes: "Ago", valor: 98.6 },
  { mes: "Set", valor: 99.2 },
  { mes: "Out", valor: 99.0 },
  { mes: "Nov", valor: 98.8 },
  { mes: "Dez", valor: 99.1 },
];

// ── Data: Esgoto - Tratamento Mensal ───────────────────────────────

export const DATA_ESGOTO_TRATAMENTO: EsgotoMensal[] = [
  { mes: "Jan", coletado: 275_000, tratado: 248_000, lancado: 27_000 },
  { mes: "Fev", coletado: 280_000, tratado: 252_000, lancado: 28_000 },
  { mes: "Mar", coletado: 290_000, tratado: 261_000, lancado: 29_000 },
  { mes: "Abr", coletado: 285_000, tratado: 257_000, lancado: 28_000 },
  { mes: "Mai", coletado: 292_000, tratado: 263_000, lancado: 29_000 },
  { mes: "Jun", coletado: 288_000, tratado: 260_000, lancado: 28_000 },
  { mes: "Jul", coletado: 295_000, tratado: 265_000, lancado: 30_000 },
  { mes: "Ago", coletado: 290_000, tratado: 262_000, lancado: 28_000 },
  { mes: "Set", coletado: 287_000, tratado: 259_000, lancado: 28_000 },
  { mes: "Out", coletado: 293_000, tratado: 264_000, lancado: 29_000 },
  { mes: "Nov", coletado: 289_000, tratado: 261_000, lancado: 28_000 },
  { mes: "Dez", coletado: 296_000, tratado: 268_000, lancado: 28_000 },
];

// ── Data: Sistemas de Tratamento de Esgoto ─────────────────────────

export const DATA_SISTEMAS_TRATAMENTO: SistemaTratamento[] = [
  {
    id: "ETE-001",
    nome: "ETE Central",
    tipo: "Lodo Ativado",
    capacidadeM3Dia: 12_000,
    operacaoM3Dia: 9_800,
    eficiencia: 92.5,
    bairrosAtendidos: ["Centro", "Jardim América", "Vila Nova"],
  },
  {
    id: "ETE-002",
    nome: "ETE Norte",
    tipo: "UASB",
    capacidadeM3Dia: 6_000,
    operacaoM3Dia: 4_500,
    eficiencia: 88.0,
    bairrosAtendidos: ["Zona Norte", "Industrial"],
  },
  {
    id: "ETE-003",
    nome: "ETE Sul",
    tipo: "Lagoa",
    capacidadeM3Dia: 4_000,
    operacaoM3Dia: 2_800,
    eficiencia: 85.5,
    bairrosAtendidos: ["Zona Sul", "Parque das Flores"],
  },
];

// ── Data: Obras ────────────────────────────────────────────────────

export const DATA_OBRAS_SANEAMENTO: ObraSaneamento[] = [
  {
    id: "OB-001",
    nome: "Ampliação Rede de Água - Zona Norte",
    tipo: "Rede de Água",
    status: "Em Execução",
    bairro: "Zona Norte",
    valorTotal: 850_000,
    valorExecutado: 510_000,
    percentualExecucao: 60,
    prazoMeses: 12,
    mesInicio: "Mar/2025",
    mesPrevisto: "Mar/2026",
  },
  {
    id: "OB-002",
    nome: "Interceptor de Esgoto Rio Tibagi",
    tipo: "Rede de Esgoto",
    status: "Em Execução",
    bairro: "Centro",
    valorTotal: 1_200_000,
    valorExecutado: 360_000,
    percentualExecucao: 30,
    prazoMeses: 18,
    mesInicio: "Jan/2025",
    mesPrevisto: "Jun/2026",
  },
  {
    id: "OB-003",
    nome: "Reforma ETA Principal",
    tipo: "ETA",
    status: "Concluída",
    bairro: "Centro",
    valorTotal: 450_000,
    valorExecutado: 450_000,
    percentualExecucao: 100,
    prazoMeses: 8,
    mesInicio: "Jun/2024",
    mesPrevisto: "Fev/2025",
  },
  {
    id: "OB-004",
    nome: "Nova ETE Zona Sul",
    tipo: "ETE",
    status: "Em Execução",
    bairro: "Zona Sul",
    valorTotal: 2_800_000,
    valorExecutado: 840_000,
    percentualExecucao: 30,
    prazoMeses: 24,
    mesInicio: "Set/2024",
    mesPrevisto: "Set/2026",
  },
  {
    id: "OB-005",
    nome: "Reservatório Elevado - Parque",
    tipo: "Reservatório",
    status: "Licitação",
    bairro: "Parque das Flores",
    valorTotal: 620_000,
    valorExecutado: 0,
    percentualExecucao: 0,
    prazoMeses: 10,
    mesInicio: "-",
    mesPrevisto: "Dez/2026",
  },
  {
    id: "OB-006",
    nome: "Galeria Pluvial Av. Brasil",
    tipo: "Macrodrenagem",
    status: "Em Execução",
    bairro: "Centro",
    valorTotal: 1_500_000,
    valorExecutado: 975_000,
    percentualExecucao: 65,
    prazoMeses: 14,
    mesInicio: "Nov/2024",
    mesPrevisto: "Jan/2026",
  },
  {
    id: "OB-007",
    nome: "Canalização Córrego Fundo",
    tipo: "Macrodrenagem",
    status: "Paralisada",
    bairro: "Vila Nova",
    valorTotal: 980_000,
    valorExecutado: 294_000,
    percentualExecucao: 30,
    prazoMeses: 12,
    mesInicio: "Ago/2024",
    mesPrevisto: "Ago/2025",
  },
  {
    id: "OB-008",
    nome: "Estação Elevatória Esgoto - Norte",
    tipo: "Estação Elevatória",
    status: "Concluída",
    bairro: "Zona Norte",
    valorTotal: 380_000,
    valorExecutado: 380_000,
    percentualExecucao: 100,
    prazoMeses: 6,
    mesInicio: "Abr/2024",
    mesPrevisto: "Out/2024",
  },
];

// ── Data: Drenagem - Eventos Mensais ───────────────────────────────

export const DATA_DRENAGEM_EVENTOS: EventoDrenagemMensal[] = [
  { mes: "Jan", alagamentos: 8, inundacoes: 2 },
  { mes: "Fev", alagamentos: 6, inundacoes: 1 },
  { mes: "Mar", alagamentos: 5, inundacoes: 1 },
  { mes: "Abr", alagamentos: 3, inundacoes: 0 },
  { mes: "Mai", alagamentos: 2, inundacoes: 0 },
  { mes: "Jun", alagamentos: 1, inundacoes: 0 },
  { mes: "Jul", alagamentos: 1, inundacoes: 0 },
  { mes: "Ago", alagamentos: 2, inundacoes: 0 },
  { mes: "Set", alagamentos: 4, inundacoes: 1 },
  { mes: "Out", alagamentos: 6, inundacoes: 2 },
  { mes: "Nov", alagamentos: 7, inundacoes: 2 },
  { mes: "Dez", alagamentos: 9, inundacoes: 3 },
];

// ── Data: Consumo Per Capita Mensal (L/hab/dia) ────────────────────

export const DATA_CONSUMO_PERCAPITA_MENSAL: DadoMensal[] = [
  { mes: "Jan", valor: 292 },
  { mes: "Fev", valor: 286 },
  { mes: "Mar", valor: 280 },
  { mes: "Abr", valor: 274 },
  { mes: "Mai", valor: 268 },
  { mes: "Jun", valor: 262 },
  { mes: "Jul", valor: 260 },
  { mes: "Ago", valor: 265 },
  { mes: "Set", valor: 271 },
  { mes: "Out", valor: 278 },
  { mes: "Nov", valor: 283 },
  { mes: "Dez", valor: 294 },
];

// ── Data: Pontos Críticos Drenagem ─────────────────────────────────

export const DATA_PONTOS_CRITICOS: PontoCriticoDrenagem[] = [
  {
    id: "PD-001",
    local: "Av. Brasil x R. Paraná",
    bairro: "Centro",
    risco: "Alto",
    eventosAno: 12,
    intervencao: "Galeria pluvial 1.500m",
    status: "Em Obra",
  },
  {
    id: "PD-002",
    local: "Córrego Fundo - trecho urbano",
    bairro: "Vila Nova",
    risco: "Alto",
    eventosAno: 9,
    intervencao: "Canalização 800m",
    status: "Em Obra",
  },
  {
    id: "PD-003",
    local: "R. das Flores x R. Ipê",
    bairro: "Jardim América",
    risco: "Médio",
    eventosAno: 6,
    intervencao: "Boca de lobo e sarjeta",
    status: "Planejada",
  },
  {
    id: "PD-004",
    local: "Av. Industrial - rotatória",
    bairro: "Zona Norte",
    risco: "Médio",
    eventosAno: 5,
    intervencao: "Detenção e drenagem",
    status: "Planejada",
  },
  {
    id: "PD-005",
    local: "R. XV de Novembro",
    bairro: "Centro",
    risco: "Alto",
    eventosAno: 10,
    intervencao: "Ampliação galeria",
    status: "Concluída",
  },
  {
    id: "PD-006",
    local: "Parque Linear Sul",
    bairro: "Zona Sul",
    risco: "Baixo",
    eventosAno: 3,
    intervencao: "Revegetação e contenção",
    status: "Concluída",
  },
];

export const SANEAMENTO_SNAPSHOT = {
  POPULACAO_TOTAL,
  POPULACAO_ATENDIDA_AGUA,
  COBERTURA_AGUA_PCT,
  POPULACAO_ATENDIDA_ESGOTO,
  COBERTURA_ESGOTO_PCT,
  VOLUME_PRODUZIDO_M3,
  VOLUME_FATURADO_M3,
  INDICE_PERDA_AGUA_PCT,
  RECEITA_TOTAL_SANEAMENTO,
  DESPESA_OPERACIONAL_SANEAMENTO,
  INVESTIMENTO_OBRAS,
  CONTAS_RECEBER,
  INADIMPLENCIA_PCT,
  ETA_CAPACIDADE_LS,
  ETA_PRODUCAO_ATUAL_LS,
  LIGACOES_ATIVAS_AGUA,
  LIGACOES_ATIVAS_ESGOTO,
  ETES_ATIVAS,
  VOLUME_ESGOTO_COLETADO_M3,
  VOLUME_ESGOTO_TRATADO_M3,
  BACIAS_MONITORADAS,
  PONTOS_CRITICOS_DRENAGEM,
  VOLUME_DRENAGEM_DESTINADO_M3,
  OBRAS_MACRODRENAGEM,
  DATA_PARAMETROS_AGUA,
  DATA_PONTOS_CAPTACAO,
  DATA_DISTRIBUICAO_LIGACOES,
  DATA_RECEITAS_MENSAIS,
  DATA_DESPESAS_CATEGORIAS_SANEAMENTO,
  DATA_CONTAS_RECEBER,
  DATA_INADIMPLENCIA_MENSAL,
  DATA_PERDA_AGUA_MENSAL,
  DATA_QUALIDADE_AGUA,
  DATA_ESGOTO_TRATAMENTO,
  DATA_SISTEMAS_TRATAMENTO,
  DATA_OBRAS_SANEAMENTO,
  DATA_DRENAGEM_EVENTOS,
  DATA_CONSUMO_PERCAPITA_MENSAL,
  DATA_PONTOS_CRITICOS,
};
