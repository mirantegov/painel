// Dados demo do módulo Frotas.
// Snapshot serializável servido de mod_frotas (jsonb). Sem funções/JSX.

type Veiculo = {
  placa: string;
  tipo: string;
  secretaria: string;
  status: "disponivel" | "manutencao" | "reserva" | "inativo";
  kmAtual: number;
  kmL12m: number;
  patrimonio: "proprio" | "cedido" | "locado";
  proximaRevisaoKm: number;
  condutor: string;
};

/** Composição da frota: veículos próprios, cedidos e locados (prestação de contas / governança). */
export const composicaoPatrimonio = [
  { tipo: "Próprios", quantidade: 102, fill: "var(--chart-1)" },
  { tipo: "Cedidos", quantidade: 28, fill: "var(--chart-2)" },
  { tipo: "Locados", quantidade: 18, fill: "var(--chart-3)" },
];

export const chartConfigComposicao = {
  Próprios: { label: "Próprios", color: "var(--chart-1)" },
  Cedidos: { label: "Cedidos", color: "var(--chart-2)" },
  Locados: { label: "Locados", color: "var(--chart-3)" },
};

export const custoCombustivelMensal = [
  { mes: "Jul", litros: 42800, valor: 278200, km: 412000 },
  { mes: "Ago", litros: 44100, valor: 286500, km: 425500 },
  { mes: "Set", litros: 40200, valor: 261800, km: 398200 },
  { mes: "Out", litros: 45500, valor: 302400, km: 438900 },
  { mes: "Nov", litros: 46800, valor: 312100, km: 451200 },
  { mes: "Dez", litros: 45200, valor: 298750, km: 442800 },
];

export const chartConfigCusto = {
  valor: { label: "Combustível (R$)", color: "var(--chart-1)" },
  km: { label: "Km rodados", color: "var(--chart-2)" },
};

export const utilizacaoPorSecretaria = [
  { secretaria: "SEMSA", utilizacaoPct: 78, custoKm: 1.95, viagens: 1840 },
  { secretaria: "SEMED", utilizacaoPct: 72, custoKm: 1.71, viagens: 1620 },
  { secretaria: "SEMINF", utilizacaoPct: 81, custoKm: 2.12, viagens: 980 },
  { secretaria: "GAB", utilizacaoPct: 54, custoKm: 1.58, viagens: 420 },
  { secretaria: "SEMAD", utilizacaoPct: 62, custoKm: 1.64, viagens: 510 },
  { secretaria: "Def. Civil", utilizacaoPct: 44, custoKm: 2.45, viagens: 290 },
];

export const chartConfigUtil = {
  utilizacaoPct: {
    label: "Utilização (%)",
    color: "var(--chart-1)",
  },
};

export const manutencaoPreventivaVsCorretiva = [
  { name: "Preventiva", valor: 186, fill: "var(--chart-2)" },
  { name: "Corretiva", valor: 88, fill: "var(--chart-4)" },
];

export const chartConfigManut = {
  Preventiva: { label: "Preventiva", color: "var(--chart-2)" },
  Corretiva: { label: "Corretiva", color: "var(--chart-4)" },
};

export const veiculos: Veiculo[] = [
  {
    placa: "ABC1D23",
    tipo: "Ambulância SU",
    secretaria: "SEMSA",
    status: "disponivel",
    kmAtual: 128400,
    kmL12m: 4.2,
    patrimonio: "proprio",
    proximaRevisaoKm: 130000,
    condutor: "Equipe plantão",
  },
  {
    placa: "DEF4E56",
    tipo: "Van escolar",
    secretaria: "SEMED",
    status: "disponivel",
    kmAtual: 89200,
    kmL12m: 8.6,
    patrimonio: "proprio",
    proximaRevisaoKm: 90000,
    condutor: "J. Almeida",
  },
  {
    placa: "GHI7F89",
    tipo: "Caminhonete 4x4",
    secretaria: "SEMINF",
    status: "manutencao",
    kmAtual: 156780,
    kmL12m: 7.9,
    patrimonio: "proprio",
    proximaRevisaoKm: 158000,
    condutor: "M. Santos",
  },
  {
    placa: "JKL0G12",
    tipo: "Sedan administrativo",
    secretaria: "GAB",
    status: "reserva",
    kmAtual: 45200,
    kmL12m: 11.2,
    patrimonio: "cedido",
    proximaRevisaoKm: 48000,
    condutor: "—",
  },
  {
    placa: "MNO3H45",
    tipo: "Ônibus rural",
    secretaria: "SEMED",
    status: "disponivel",
    kmAtual: 201100,
    kmL12m: 3.8,
    patrimonio: "locado",
    proximaRevisaoKm: 202000,
    condutor: "R. Costa",
  },
  {
    placa: "PQR6I78",
    tipo: "Pickup frota",
    secretaria: "Def. Civil",
    status: "disponivel",
    kmAtual: 67800,
    kmL12m: 9.1,
    patrimonio: "proprio",
    proximaRevisaoKm: 70000,
    condutor: "Equipe operacional",
  },
  {
    placa: "STU9J01",
    tipo: "Utilitário fiscal",
    secretaria: "SEMFAZ",
    status: "disponivel",
    kmAtual: 93400,
    kmL12m: 10.4,
    patrimonio: "proprio",
    proximaRevisaoKm: 95000,
    condutor: "L. Ferreira",
  },
  {
    placa: "VWX2K34",
    tipo: "Micro-ônibus",
    secretaria: "SEMSA",
    status: "inativo",
    kmAtual: 312000,
    kmL12m: 5.1,
    patrimonio: "proprio",
    proximaRevisaoKm: 315000,
    condutor: "Baixado p/ licitação",
  },
];

export const abastecimentos = [
  {
    data: "08/12/2024",
    placa: "DEF4E56",
    litros: 62,
    valor: 398.5,
    posto: "Rede Cred. PM-042",
    hodometro: 89140,
    combustivel: "Diesel S10",
    nf: "NF-e 88421",
  },
  {
    data: "08/12/2024",
    placa: "ABC1D23",
    litros: 48,
    valor: 312.0,
    posto: "Rede Cred. PM-042",
    hodometro: 128320,
    combustivel: "Gasolina",
    nf: "NF-e 88419",
  },
  {
    data: "07/12/2024",
    placa: "PQR6I78",
    litros: 55,
    valor: 352.75,
    posto: "Auto Posto Convênio 12",
    hodometro: 67620,
    combustivel: "Diesel S10",
    nf: "NF-e 22108",
  },
  {
    data: "07/12/2024",
    placa: "STU9J01",
    litros: 42,
    valor: 271.2,
    posto: "Rede Cred. PM-042",
    hodometro: 93380,
    combustivel: "Gasolina",
    nf: "NF-e 88402",
  },
  {
    data: "06/12/2024",
    placa: "MNO3H45",
    litros: 180,
    valor: 1128.0,
    posto: "Distribuidora Sul Ltda",
    hodometro: 200980,
    combustivel: "Diesel S10",
    nf: "NF-e 910334",
  },
];

export const ordensServico = [
  {
    os: "OS-2024-8841",
    placa: "GHI7F89",
    tipo: "Corretiva",
    descricao: "Embreagem + revisão de freios",
    valor: 4280,
    status: "em_execucao",
    oficina: "Oficina Municipal / convênio",
  },
  {
    os: "OS-2024-8836",
    placa: "DEF4E56",
    tipo: "Preventiva",
    descricao: "Revisão 90.000 km",
    valor: 1850,
    status: "concluida",
    oficina: "Auto Center Credenciado",
  },
  {
    os: "OS-2024-8832",
    placa: "ABC1D23",
    tipo: "Preventiva",
    descricao: "Inspeção anual + ar condicionado",
    valor: 2340,
    status: "aguardando_peca",
    oficina: "Oficina Municipal / convênio",
  },
  {
    os: "OS-2024-8828",
    placa: "VWX2K34",
    tipo: "Corretiva",
    descricao: "Motor — avaliação para baixa",
    valor: 12100,
    status: "orcamento",
    oficina: "Diesel Pesados SA",
  },
];

/** Totais consolidados da frota (painel executivo); a tabela lista apenas uma amostra operacional. */
export const frotaResumo = {
  total: 148,
  disponiveis: 139,
  manutencao: 6,
  reserva: 2,
  inativo: 1,
};

export const checklistConformidade = [
  {
    item: "Relatório consolidado de abastecimento (mês)",
    ok: true,
    detalhe: "Dez/2024 fechado em 05/01",
  },
  {
    item: "Relação de veículos próprios e cedidos",
    ok: true,
    detalhe: "Atualizado no patrimônio",
  },
  {
    item: "Contratos de locação / sublocação vigentes",
    ok: true,
    detalhe: "3 contratos dentro do prazo",
  },
  {
    item: "Conferência NF-e x hodômetro (amostragem)",
    ok: false,
    detalhe: "2 lançamentos pendentes de vínculo",
  },
  {
    item: "Cronograma de preventivas em dia",
    ok: true,
    detalhe: "92% dentro da janela",
  },
];

export const FROTAS_SNAPSHOT = {
  composicaoPatrimonio,
  chartConfigComposicao,
  custoCombustivelMensal,
  chartConfigCusto,
  utilizacaoPorSecretaria,
  chartConfigUtil,
  manutencaoPreventivaVsCorretiva,
  chartConfigManut,
  veiculos,
  abastecimentos,
  ordensServico,
  frotaResumo,
  checklistConformidade,
};
