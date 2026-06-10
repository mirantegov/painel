// Dados demo do módulo patrimonio.
// Snapshot serializável servido de mod_patrimonio (jsonb). Sem funções/JSX.

export const patrimonioResumo = {
  valorTotal: 286_400_000,
  inventarioConciliadoPct: 94.2,
  regularizacaoImoveisPct: 87.5,
  indiceConservacaoPct: 81.3,
  bensSemPlaqueta: 218,
  itensEstoqueCritico: 34,
  areasPublicasMonitoradas: 126,
  manutencoesProgramadas: 19,
};

export const composicaoPatrimonio = [
  { categoria: "Prédios públicos", valor: 118_000_000, fill: "var(--chart-1)" },
  { categoria: "Equipamentos", valor: 64_500_000, fill: "var(--chart-2)" },
  { categoria: "Mobiliário e bens", valor: 39_200_000, fill: "var(--chart-3)" },
  { categoria: "Estoques", valor: 18_700_000, fill: "var(--chart-4)" },
  { categoria: "Áreas públicas", valor: 46_000_000, fill: "var(--chart-5)" },
];

export const chartConfigComposicao = {
  "Prédios públicos": { label: "Prédios públicos", color: "var(--chart-1)" },
  Equipamentos: { label: "Equipamentos", color: "var(--chart-2)" },
  "Mobiliário e bens": { label: "Mobiliário e bens", color: "var(--chart-3)" },
  Estoques: { label: "Estoques", color: "var(--chart-4)" },
  "Áreas públicas": { label: "Áreas públicas", color: "var(--chart-5)" },
};

export const evolucaoPatrimonio = [
  {
    mes: "Jan",
    incorporado: 276_800_000,
    depreciado: 1_900_000,
    conservacao: 79.4,
  },
  {
    mes: "Fev",
    incorporado: 278_200_000,
    depreciado: 2_050_000,
    conservacao: 79.8,
  },
  {
    mes: "Mar",
    incorporado: 279_700_000,
    depreciado: 2_100_000,
    conservacao: 80.1,
  },
  {
    mes: "Abr",
    incorporado: 281_300_000,
    depreciado: 2_220_000,
    conservacao: 80.4,
  },
  {
    mes: "Mai",
    incorporado: 282_900_000,
    depreciado: 2_340_000,
    conservacao: 80.8,
  },
  {
    mes: "Jun",
    incorporado: 284_100_000,
    depreciado: 2_380_000,
    conservacao: 81.0,
  },
  {
    mes: "Jul",
    incorporado: 285_200_000,
    depreciado: 2_420_000,
    conservacao: 81.1,
  },
  {
    mes: "Ago",
    incorporado: 286_400_000,
    depreciado: 2_510_000,
    conservacao: 81.3,
  },
];

export const chartConfigEvolucao = {
  incorporado: { label: "Valor patrimonial", color: "var(--chart-1)" },
  conservacao: { label: "Conservação (%)", color: "var(--chart-3)" },
};

export const patrimonioPorFinalidade = [
  {
    finalidade: "Saúde",
    valor: 58_400_000,
    imoveis: 18,
    equipamentos: 1_240,
    estoque: 92,
    areas: 6,
    conservacao: 78,
    regularizacao: 84,
    pendencias: 11,
  },
  {
    finalidade: "Educação",
    valor: 72_800_000,
    imoveis: 34,
    equipamentos: 2_410,
    estoque: 124,
    areas: 18,
    conservacao: 88,
    regularizacao: 92,
    pendencias: 7,
  },
  {
    finalidade: "Assistência Social",
    valor: 24_600_000,
    imoveis: 11,
    equipamentos: 680,
    estoque: 48,
    areas: 5,
    conservacao: 82,
    regularizacao: 85,
    pendencias: 6,
  },
  {
    finalidade: "Esportes e Lazer",
    valor: 19_500_000,
    imoveis: 9,
    equipamentos: 420,
    estoque: 33,
    areas: 28,
    conservacao: 76,
    regularizacao: 81,
    pendencias: 9,
  },
  {
    finalidade: "Administração",
    valor: 43_700_000,
    imoveis: 14,
    equipamentos: 1_540,
    estoque: 56,
    areas: 7,
    conservacao: 84,
    regularizacao: 95,
    pendencias: 4,
  },
  {
    finalidade: "Transportes e Obras",
    valor: 67_400_000,
    imoveis: 13,
    equipamentos: 910,
    estoque: 71,
    areas: 62,
    conservacao: 74,
    regularizacao: 86,
    pendencias: 12,
  },
];

export const chartConfigFinalidade = {
  valor: { label: "Valor patrimonial", color: "var(--chart-1)" },
  conservacao: { label: "Conservação", color: "var(--chart-2)" },
};

export const condicaoAtivos = [
  { grupo: "Prédios", adequado: 71, atencao: 19, critico: 10 },
  { grupo: "Equipamentos", adequado: 67, atencao: 23, critico: 10 },
  { grupo: "Mobiliário", adequado: 75, atencao: 18, critico: 7 },
  { grupo: "Estoques", adequado: 63, atencao: 27, critico: 10 },
  { grupo: "Áreas públicas", adequado: 58, atencao: 29, critico: 13 },
];

export const chartConfigCondicao = {
  adequado: { label: "Adequado", color: "var(--chart-1)" },
  atencao: { label: "Em atenção", color: "var(--chart-3)" },
  critico: { label: "Crítico", color: "var(--chart-4)" },
};

export const imoveisEstrategicos = [
  {
    unidade: "Hospital Municipal Dr. Arnaldo",
    finalidade: "Saúde",
    tipo: "Prédio assistencial",
    area: 6_800,
    conservacao: 76,
    regularizacao: "Averb. pendente",
    manutencao: "Telhado e climatização",
  },
  {
    unidade: "Escola Polo Rui Barbosa",
    finalidade: "Educação",
    tipo: "Prédio escolar",
    area: 4_200,
    conservacao: 89,
    regularizacao: "Regular",
    manutencao: "Pintura externa 2025",
  },
  {
    unidade: "Centro de Referência Social Sul",
    finalidade: "Assistência Social",
    tipo: "Equipamento social",
    area: 1_240,
    conservacao: 81,
    regularizacao: "Regular",
    manutencao: "Acessibilidade sanitários",
  },
  {
    unidade: "Garagem e Almoxarifado Central",
    finalidade: "Transportes e Obras",
    tipo: "Pátio operacional",
    area: 8_900,
    conservacao: 72,
    regularizacao: "Desmembramento cadastral",
    manutencao: "Piso industrial e drenagem",
  },
  {
    unidade: "Paço Municipal",
    finalidade: "Administração",
    tipo: "Prédio administrativo",
    area: 3_450,
    conservacao: 86,
    regularizacao: "Regular",
    manutencao: "Troca de elevador",
  },
];

export const estoquesCriticos = [
  {
    item: "Computadores para reposição",
    finalidade: "Administração",
    saldo: 12,
    coberturaDias: 14,
    criticidade: "alta",
    acao: "Comprar lote complementar",
  },
  {
    item: "Bombas de infusão",
    finalidade: "Saúde",
    saldo: 7,
    coberturaDias: 18,
    criticidade: "alta",
    acao: "Realocar 2 unidades da UPA",
  },
  {
    item: "Carteiras escolares",
    finalidade: "Educação",
    saldo: 48,
    coberturaDias: 27,
    criticidade: "media",
    acao: "Programar aquisição do 2º semestre",
  },
  {
    item: "Cestas de apoio eventual",
    finalidade: "Assistência Social",
    saldo: 96,
    coberturaDias: 22,
    criticidade: "media",
    acao: "Reforçar contrato de fornecimento",
  },
  {
    item: "Luminárias LED para praças",
    finalidade: "Esportes e Lazer",
    saldo: 18,
    coberturaDias: 16,
    criticidade: "alta",
    acao: "Priorizar compra por ata vigente",
  },
];

export const areasPublicas = [
  {
    area: "Parque da Cidade",
    tipo: "Parque urbano",
    finalidade: "Lazer e meio ambiente",
    extensao: 112_000,
    cuidadoPct: 83,
    risco: "Médio",
    frente: "Poda e drenagem",
  },
  {
    area: "Complexo Esportivo Norte",
    tipo: "Equipamento esportivo",
    finalidade: "Esportes",
    extensao: 28_500,
    cuidadoPct: 79,
    risco: "Médio",
    frente: "Iluminação e alambrado",
  },
  {
    area: "Corredor Verde da Av. Central",
    tipo: "Área verde linear",
    finalidade: "Mobilidade e paisagismo",
    extensao: 36_000,
    cuidadoPct: 74,
    risco: "Alto",
    frente: "Irrigação e replantio",
  },
  {
    area: "Praça da Juventude",
    tipo: "Praça",
    finalidade: "Convivência social",
    extensao: 9_800,
    cuidadoPct: 91,
    risco: "Baixo",
    frente: "Manutenção rotineira",
  },
];

/* ── Depreciação e Vida Útil ─────────────────────────────────────── */

export const depreciacaoAtivos = [
  {
    categoria: "Prédios públicos",
    valorOriginal: 118_000_000,
    depreciacaoAcumulada: 14_160_000,
    valorLiquido: 103_840_000,
    taxaAnual: 2.0,
    vidaUtilAnos: 50,
    vidaUtilRestante: 38,
  },
  {
    categoria: "Equipamentos",
    valorOriginal: 64_500_000,
    depreciacaoAcumulada: 19_350_000,
    valorLiquido: 45_150_000,
    taxaAnual: 10.0,
    vidaUtilAnos: 10,
    vidaUtilRestante: 5,
  },
  {
    categoria: "Mobiliário e bens",
    valorOriginal: 39_200_000,
    depreciacaoAcumulada: 15_680_000,
    valorLiquido: 23_520_000,
    taxaAnual: 10.0,
    vidaUtilAnos: 10,
    vidaUtilRestante: 4,
  },
  {
    categoria: "Veículos e máquinas",
    valorOriginal: 22_800_000,
    depreciacaoAcumulada: 11_400_000,
    valorLiquido: 11_400_000,
    taxaAnual: 20.0,
    vidaUtilAnos: 5,
    vidaUtilRestante: 2,
  },
  {
    categoria: "Equipamentos de TI",
    valorOriginal: 18_400_000,
    depreciacaoAcumulada: 11_040_000,
    valorLiquido: 7_360_000,
    taxaAnual: 20.0,
    vidaUtilAnos: 5,
    vidaUtilRestante: 1,
  },
];

export const chartConfigDepreciacao = {
  valorLiquido: { label: "Valor líquido", color: "var(--chart-1)" },
  depreciacaoAcumulada: {
    label: "Depreciação acumulada",
    color: "var(--chart-4)",
  },
};

export const evolucaoDepreciacao = [
  { mes: "Jan", depreciacaoMensal: 4_820_000, valorContabil: 276_800_000 },
  { mes: "Fev", depreciacaoMensal: 4_850_000, valorContabil: 273_350_000 },
  { mes: "Mar", depreciacaoMensal: 4_870_000, valorContabil: 270_580_000 },
  { mes: "Abr", depreciacaoMensal: 4_900_000, valorContabil: 268_780_000 },
  { mes: "Mai", depreciacaoMensal: 4_920_000, valorContabil: 267_860_000 },
  { mes: "Jun", depreciacaoMensal: 4_940_000, valorContabil: 266_920_000 },
  { mes: "Jul", depreciacaoMensal: 4_960_000, valorContabil: 266_060_000 },
  { mes: "Ago", depreciacaoMensal: 4_980_000, valorContabil: 265_180_000 },
];

export const chartConfigEvolDepreciacao = {
  depreciacaoMensal: { label: "Depreciação mensal", color: "var(--chart-4)" },
  valorContabil: { label: "Valor contábil líquido", color: "var(--chart-1)" },
};

/* ── Movimentação Patrimonial ────────────────────────────────────── */

export const movimentacoes = [
  {
    data: "02/08/2026",
    tipo: "Transferência",
    descricao: "15 computadores da Adm para Educação",
    origem: "Sec. Administração",
    destino: "Sec. Educação",
    valor: 67_500,
    status: "Concluída",
  },
  {
    data: "28/07/2026",
    tipo: "Cessão",
    descricao: "Veículo Fiat Fiorino para CRAS Sul",
    origem: "Sec. Saúde",
    destino: "Sec. Assistência Social",
    valor: 48_000,
    status: "Concluída",
  },
  {
    data: "25/07/2026",
    tipo: "Baixa",
    descricao: "Mobiliário inservível - Escola Rui Barbosa",
    origem: "Sec. Educação",
    destino: "Desfazimento",
    valor: 12_300,
    status: "Em análise",
  },
  {
    data: "20/07/2026",
    tipo: "Incorporação",
    descricao: "Lote de 8 ar-condicionados - Pregão 042/2026",
    origem: "Almoxarifado Central",
    destino: "Sec. Saúde",
    valor: 96_000,
    status: "Concluída",
  },
  {
    data: "15/07/2026",
    tipo: "Transferência",
    descricao: "Projetor multimídia para Centro Cultural",
    origem: "Sec. Administração",
    destino: "Sec. Cultura",
    valor: 8_200,
    status: "Concluída",
  },
  {
    data: "10/07/2026",
    tipo: "Baixa",
    descricao: "Impressoras obsoletas - lote patrimônio TI",
    origem: "Sec. Administração",
    destino: "Desfazimento",
    valor: 5_600,
    status: "Aprovada",
  },
  {
    data: "05/07/2026",
    tipo: "Doação recebida",
    descricao: "Equipamento hospitalar - convênio federal",
    origem: "Min. Saúde",
    destino: "Hospital Municipal",
    valor: 340_000,
    status: "Concluída",
  },
  {
    data: "01/07/2026",
    tipo: "Reavaliação",
    descricao: "Terreno anexo ao Paço Municipal",
    origem: "Sec. Planejamento",
    destino: "Patrimônio",
    valor: 1_200_000,
    status: "Concluída",
  },
];

export const resumoMovimentacoes = {
  transferencias: 42,
  cessoes: 8,
  baixas: 15,
  incorporacoes: 67,
  doacoes: 3,
  reavaliacoes: 5,
  valorTransferido: 1_840_000,
  valorBaixado: 420_000,
  valorIncorporado: 4_200_000,
};

export const termosResponsabilidade = [
  {
    secretaria: "Educação",
    totalTermos: 284,
    atualizados: 261,
    pendentes: 23,
    coberturaPct: 91.9,
    ultimaAtualizacao: "Ago/2026",
  },
  {
    secretaria: "Saúde",
    totalTermos: 196,
    atualizados: 168,
    pendentes: 28,
    coberturaPct: 85.7,
    ultimaAtualizacao: "Jul/2026",
  },
  {
    secretaria: "Administração",
    totalTermos: 142,
    atualizados: 136,
    pendentes: 6,
    coberturaPct: 95.8,
    ultimaAtualizacao: "Ago/2026",
  },
  {
    secretaria: "Assistência Social",
    totalTermos: 87,
    atualizados: 78,
    pendentes: 9,
    coberturaPct: 89.7,
    ultimaAtualizacao: "Jul/2026",
  },
  {
    secretaria: "Transportes e Obras",
    totalTermos: 104,
    atualizados: 89,
    pendentes: 15,
    coberturaPct: 85.6,
    ultimaAtualizacao: "Jun/2026",
  },
  {
    secretaria: "Esportes e Lazer",
    totalTermos: 63,
    atualizados: 56,
    pendentes: 7,
    coberturaPct: 88.9,
    ultimaAtualizacao: "Jul/2026",
  },
];

export const PATRIMONIO_SNAPSHOT = {
  patrimonioResumo,
  composicaoPatrimonio,
  chartConfigComposicao,
  evolucaoPatrimonio,
  chartConfigEvolucao,
  patrimonioPorFinalidade,
  chartConfigFinalidade,
  condicaoAtivos,
  chartConfigCondicao,
  imoveisEstrategicos,
  estoquesCriticos,
  areasPublicas,
  depreciacaoAtivos,
  chartConfigDepreciacao,
  evolucaoDepreciacao,
  chartConfigEvolDepreciacao,
  movimentacoes,
  resumoMovimentacoes,
  termosResponsabilidade,
};
