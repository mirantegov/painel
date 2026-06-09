// Dados demo do módulo assistencia social.
// Snapshot serializável servido de mod_assistencia_social (jsonb). Sem funções/JSX.

export const greenPalette = {
  1: "#166534",
  2: "#15803d",
  3: "#16a34a",
  4: "#22c55e",
  5: "#4ade80",
};

export const resumo = {
  orcamentoAtualizado: 18_450_000,
  execucaoPct: 86.4,
  saldoFontes: 3_280_000,
  familiasAcompanhadas: 12_480,
};

export const execucaoMensal = [
  { mes: "Jan", empenhado: 1_120_000, pago: 980_000 },
  { mes: "Fev", empenhado: 1_280_000, pago: 1_140_000 },
  { mes: "Mar", empenhado: 1_360_000, pago: 1_220_000 },
  { mes: "Abr", empenhado: 1_410_000, pago: 1_290_000 },
  { mes: "Mai", empenhado: 1_520_000, pago: 1_380_000 },
  { mes: "Jun", empenhado: 1_610_000, pago: 1_470_000 },
  { mes: "Jul", empenhado: 1_720_000, pago: 1_540_000 },
  { mes: "Ago", empenhado: 1_920_000, pago: 1_760_000 },
];

export const chartExecucao = {
  empenhado: { label: "Empenhado", color: greenPalette[1] },
  pago: { label: "Pago", color: greenPalette[3] },
};

export const fontesRecursos = [
  {
    nome: "FNAS / Proteção Social Básica",
    valor: 4_820_000,
    fill: greenPalette[1],
  },
  { nome: "Tesouro Municipal", valor: 6_240_000, fill: greenPalette[2] },
  { nome: "Bolsa Família / IGD", valor: 1_340_000, fill: greenPalette[3] },
  { nome: "Benefícios Eventuais", valor: 2_160_000, fill: greenPalette[4] },
  { nome: "Habitação e Convênios", valor: 3_890_000, fill: greenPalette[5] },
];

export const chartFontes = {
  "FNAS / Proteção Social Básica": {
    label: "FNAS / PSB",
    color: greenPalette[1],
  },
  "Tesouro Municipal": { label: "Tesouro Municipal", color: greenPalette[2] },
  "Bolsa Família / IGD": {
    label: "Bolsa Família / IGD",
    color: greenPalette[3],
  },
  "Benefícios Eventuais": {
    label: "Benefícios Eventuais",
    color: greenPalette[4],
  },
  "Habitação e Convênios": {
    label: "Habitação e Convênios",
    color: greenPalette[5],
  },
};

export const programas = [
  {
    programa: "CadÚnico",
    familias: 14_820,
    cobertura: 92,
    controle: "Atualização cadastral",
    status: "Bom",
  },
  {
    programa: "Bolsa Família",
    familias: 6_430,
    cobertura: 88,
    controle: "Condicionalidades",
    status: "Atenção",
  },
  {
    programa: "BPC",
    familias: 1_284,
    cobertura: 94,
    controle: "Revisão de elegibilidade",
    status: "Bom",
  },
  {
    programa: "PETI",
    familias: 186,
    cobertura: 81,
    controle: "Busca ativa",
    status: "Atenção",
  },
  {
    programa: "PAA",
    familias: 420,
    cobertura: 76,
    controle: "Entrega e compra local",
    status: "Atenção",
  },
  {
    programa: "SCFV",
    familias: 2_160,
    cobertura: 85,
    controle: "Frequência dos grupos",
    status: "Bom",
  },
  {
    programa: "Habitação/Regularização",
    familias: 1_120,
    cobertura: 73,
    controle: "Títulos e dossiês",
    status: "Crítico",
  },
];

export const chartProgramas = {
  indicador: { label: "Desempenho (%)", color: greenPalette[2] },
};

export const desempenhoProgramas = programas.map((item) => ({
  programa:
    item.programa === "Habitação/Regularização" ? "Habitação" : item.programa,
  indicador: item.cobertura,
}));

export const contasBancarias = [
  {
    conta: "BB 12.458-9",
    finalidade: "FMAS - Movimento",
    saldo: 1_180_000,
    conciliacao: 98,
  },
  {
    conta: "BB 18.225-4",
    finalidade: "Bloco PSB",
    saldo: 840_000,
    conciliacao: 100,
  },
  {
    conta: "CEF 45.771-2",
    finalidade: "Bolsa Família / IGD",
    saldo: 420_000,
    conciliacao: 96,
  },
  {
    conta: "BB 22.943-1",
    finalidade: "Habitação / Convênios",
    saldo: 840_000,
    conciliacao: 89,
  },
];

export const alertas = [
  {
    tipo: "warning" as const,
    titulo: "Habitação e regularização fundiária abaixo da meta",
    badge: "Prioridade",
    descricao:
      "O avanço do programa está em 73% e demanda reforço documental e operacional.",
  },
  {
    tipo: "info" as const,
    titulo: "CadÚnico mantém alta cobertura cadastral",
    badge: "CadÚnico",
    descricao:
      "O monitoramento territorial dos CRAS sustenta 92% de cobertura no período.",
  },
  {
    tipo: "success" as const,
    titulo: "Conciliação bancária do FMAS está estabilizada",
    badge: "Financeiro",
    descricao:
      "As principais contas vinculadas permanecem acima de 95% de conciliação.",
  },
];

export const detalhamentoDespesa = [
  {
    grupo: "Proteção Social Básica",
    autorizado: 6_420_000,
    empenhado: 5_980_000,
    liquidado: 5_640_000,
    pago: 5_480_000,
  },
  {
    grupo: "Proteção Social Especial",
    autorizado: 3_280_000,
    empenhado: 2_940_000,
    liquidado: 2_760_000,
    pago: 2_590_000,
  },
  {
    grupo: "Benefícios Eventuais",
    autorizado: 2_360_000,
    empenhado: 2_140_000,
    liquidado: 1_980_000,
    pago: 1_920_000,
  },
  {
    grupo: "Gestão do SUAS e CadÚnico",
    autorizado: 2_140_000,
    empenhado: 1_940_000,
    liquidado: 1_880_000,
    pago: 1_810_000,
  },
  {
    grupo: "Habitação e Regularização",
    autorizado: 4_250_000,
    empenhado: 2_940_000,
    liquidado: 2_020_000,
    pago: 1_880_000,
  },
];

export const receitasPorOrigem = [
  { origem: "Transferências FNAS", previsto: 5_100_000, arrecadado: 4_820_000 },
  { origem: "Tesouro Municipal", previsto: 6_500_000, arrecadado: 6_240_000 },
  {
    origem: "IGD Bolsa Família / CadÚnico",
    previsto: 1_420_000,
    arrecadado: 1_340_000,
  },
  {
    origem: "Convênios Habitacionais",
    previsto: 4_200_000,
    arrecadado: 3_890_000,
  },
];

export const chartReceitasOrigem = {
  previsto: { label: "Previsto", color: greenPalette[4] },
  arrecadado: { label: "Arrecadado", color: greenPalette[1] },
};

export const controleFontes = [
  {
    codigo: "1660",
    descricao: "FNAS - Proteção Social Básica",
    saldo: 840_000,
    comprometido: 690_000,
    disponibilidade: 150_000,
    situacao: "Regular",
  },
  {
    codigo: "1661",
    descricao: "FNAS - Proteção Social Especial",
    saldo: 590_000,
    comprometido: 520_000,
    disponibilidade: 70_000,
    situacao: "Atenção",
  },
  {
    codigo: "1669",
    descricao: "IGD Bolsa Família / CadÚnico",
    saldo: 420_000,
    comprometido: 280_000,
    disponibilidade: 140_000,
    situacao: "Regular",
  },
  {
    codigo: "1750",
    descricao: "Tesouro Municipal Vinculado",
    saldo: 1_430_000,
    comprometido: 990_000,
    disponibilidade: 440_000,
    situacao: "Regular",
  },
  {
    codigo: "1701",
    descricao: "Convênio Habitação",
    saldo: 840_000,
    comprometido: 760_000,
    disponibilidade: 80_000,
    situacao: "Atenção",
  },
];

export const indicadoresRede = [
  { indicador: "CRAS com equipe mínima completa", valor: 83, meta: 100 },
  { indicador: "PAIF com prontuário atualizado", valor: 87, meta: 95 },
  {
    indicador: "Visitas domiciliares prioritárias realizadas",
    valor: 79,
    meta: 90,
  },
  {
    indicador: "Benefícios eventuais concedidos no prazo",
    valor: 91,
    meta: 95,
  },
];

export const familiasPorTerritorio = [
  {
    territorio: "Norte",
    cadunico: 3_420,
    bolsaFamilia: 1_560,
    scfv: 420,
    bpc: 280,
  },
  {
    territorio: "Sul",
    cadunico: 2_980,
    bolsaFamilia: 1_340,
    scfv: 390,
    bpc: 250,
  },
  {
    territorio: "Leste",
    cadunico: 3_110,
    bolsaFamilia: 1_420,
    scfv: 460,
    bpc: 270,
  },
  {
    territorio: "Oeste",
    cadunico: 2_760,
    bolsaFamilia: 1_180,
    scfv: 340,
    bpc: 220,
  },
  {
    territorio: "Centro",
    cadunico: 2_550,
    bolsaFamilia: 930,
    scfv: 550,
    bpc: 264,
  },
];

export const chartTerritorio = {
  cadunico: { label: "CadÚnico", color: greenPalette[1] },
  bolsaFamilia: { label: "Bolsa Família", color: greenPalette[3] },
};

export const agendaGestao = [
  {
    item: "Prestação de contas do cofinanciamento estadual",
    prazo: "15/09/2026",
    responsavel: "FMAS",
    status: "Em andamento",
  },
  {
    item: "Fechamento da conciliação bancária mensal",
    prazo: "20/09/2026",
    responsavel: "Tesouraria FMAS",
    status: "No prazo",
  },
  {
    item: "Revisão cadastral de famílias unipessoais",
    prazo: "30/09/2026",
    responsavel: "CadÚnico",
    status: "Atenção",
  },
  {
    item: "Mutirão de dossiês da regularização fundiária",
    prazo: "10/10/2026",
    responsavel: "Habitação",
    status: "Prioritário",
  },
];

export const patrimonioResumo = {
  bensAtivos: 1284,
  valorAtualizado: 8_640_000,
  termosAtualizadosPct: 88.6,
  manutencaoPreventivaPct: 79.4,
};

export const unidadesPatrimoniais = [
  {
    unidade: "CRAS Norte",
    bens: 184,
    valor: 1_240_000,
    inventario: 96,
    criticidade: "Regular",
  },
  {
    unidade: "CRAS Sul",
    bens: 162,
    valor: 1_080_000,
    inventario: 91,
    criticidade: "Regular",
  },
  {
    unidade: "CRAS Leste",
    bens: 176,
    valor: 1_190_000,
    inventario: 89,
    criticidade: "Atenção",
  },
  {
    unidade: "CREAS Central",
    bens: 138,
    valor: 1_420_000,
    inventario: 94,
    criticidade: "Regular",
  },
  {
    unidade: "Centro POP",
    bens: 92,
    valor: 760_000,
    inventario: 86,
    criticidade: "Atenção",
  },
  {
    unidade: "Habitação Social",
    bens: 124,
    valor: 1_310_000,
    inventario: 78,
    criticidade: "Crítico",
  },
];

export const manutencaoPatrimonial = [
  {
    categoria: "Veículos de atendimento",
    total: 12,
    preventivaEmDia: 9,
    corretivaAberta: 2,
    status: "Atenção",
  },
  {
    categoria: "Equipamentos de informática",
    total: 248,
    preventivaEmDia: 201,
    corretivaAberta: 18,
    status: "Regular",
  },
  {
    categoria: "Mobiliário de unidades",
    total: 614,
    preventivaEmDia: 502,
    corretivaAberta: 36,
    status: "Regular",
  },
  {
    categoria: "Equipamentos do SCFV",
    total: 146,
    preventivaEmDia: 98,
    corretivaAberta: 19,
    status: "Atenção",
  },
  {
    categoria: "Equipamentos da habitação",
    total: 74,
    preventivaEmDia: 43,
    corretivaAberta: 11,
    status: "Crítico",
  },
];

export const movimentacoesPatrimoniais = [
  { tipo: "Incorporações", quantidade: 86, valor: 1_180_000 },
  { tipo: "Transferências internas", quantidade: 54, valor: 420_000 },
  { tipo: "Baixas", quantidade: 18, valor: 96_000 },
  { tipo: "Bens em regularização", quantidade: 27, valor: 184_000 },
];

export const chartMovimentacoesPatrimoniais = {
  valor: { label: "Valor", color: greenPalette[2] },
};

export const termosResponsabilidade = [
  { setor: "CRAS", total: 22, atualizados: 21, vencendo: 1 },
  { setor: "CREAS", total: 11, atualizados: 10, vencendo: 1 },
  { setor: "Centro POP", total: 6, atualizados: 5, vencendo: 1 },
  { setor: "SCFV", total: 14, atualizados: 11, vencendo: 3 },
  { setor: "Habitação", total: 9, atualizados: 6, vencendo: 3 },
];

// ── Vigilância Socioassistencial ──────────────────────────────────────

export const vigilanciaResumo = {
  familiasVulneraveis: 4_860,
  taxaVulnerabilidade: 32.8,
  demandaReprimida: 1_240,
  situacoesRisco: 386,
};

export const vulnerabilidadeTerritorial = [
  {
    territorio: "Norte",
    extremaPobreza: 1_420,
    pobreza: 2_180,
    risco: 124,
    indice: 38.2,
  },
  {
    territorio: "Sul",
    extremaPobreza: 980,
    pobreza: 1_640,
    risco: 86,
    indice: 29.4,
  },
  {
    territorio: "Leste",
    extremaPobreza: 1_280,
    pobreza: 1_960,
    risco: 108,
    indice: 35.6,
  },
  {
    territorio: "Oeste",
    extremaPobreza: 740,
    pobreza: 1_380,
    risco: 48,
    indice: 24.1,
  },
  {
    territorio: "Centro",
    extremaPobreza: 440,
    pobreza: 920,
    risco: 20,
    indice: 17.8,
  },
];

export const demandaCapacidade = [
  {
    servico: "PAIF (CRAS)",
    demanda: 3_840,
    capacidade: 3_200,
    fila: 640,
    cobertura: 83,
  },
  {
    servico: "PAEFI (CREAS)",
    demanda: 1_260,
    capacidade: 980,
    fila: 280,
    cobertura: 78,
  },
  {
    servico: "SCFV",
    demanda: 2_840,
    capacidade: 2_160,
    fila: 680,
    cobertura: 76,
  },
  {
    servico: "Abordagem Social",
    demanda: 420,
    capacidade: 320,
    fila: 100,
    cobertura: 76,
  },
  {
    servico: "Acolhimento Institucional",
    demanda: 86,
    capacidade: 72,
    fila: 14,
    cobertura: 84,
  },
  { servico: "República", demanda: 24, capacidade: 18, fila: 6, cobertura: 75 },
];

export const violacoesDireitos = [
  {
    tipo: "Negligência/abandono de crianças",
    casos: 142,
    tendencia: "estavel",
  },
  { tipo: "Violência doméstica", casos: 98, tendencia: "alta" },
  { tipo: "Trabalho infantil", casos: 64, tendencia: "queda" },
  { tipo: "Situação de rua", casos: 52, tendencia: "alta" },
  { tipo: "Abuso/exploração sexual", casos: 38, tendencia: "estavel" },
  { tipo: "Violência contra idosos", casos: 34, tendencia: "alta" },
];

export const chartVulnerabilidade = {
  extremaPobreza: { label: "Extrema Pobreza", color: greenPalette[1] },
  pobreza: { label: "Pobreza", color: greenPalette[3] },
};

export const evolucaoDemanda = [
  { mes: "Jan", novos: 320, atendidos: 280, pendentes: 840 },
  { mes: "Fev", novos: 290, atendidos: 310, pendentes: 820 },
  { mes: "Mar", novos: 340, atendidos: 300, pendentes: 860 },
  { mes: "Abr", novos: 380, atendidos: 350, pendentes: 890 },
  { mes: "Mai", novos: 310, atendidos: 360, pendentes: 840 },
  { mes: "Jun", novos: 360, atendidos: 340, pendentes: 860 },
  { mes: "Jul", novos: 420, atendidos: 380, pendentes: 900 },
  { mes: "Ago", novos: 350, atendidos: 390, pendentes: 860 },
];

export const chartEvolucaoDemanda = {
  novos: { label: "Novos casos", color: greenPalette[1] },
  atendidos: { label: "Atendidos", color: greenPalette[3] },
  pendentes: { label: "Pendentes", color: greenPalette[5] },
};

// ── Proteção Especial, Benefícios e Equipes ──────────────────────────

export const protecaoEspecialResumo = {
  familiasAcompanhadasCreas: 980,
  pessoasSituacaoRua: 164,
  adolescentesMse: 72,
  beneficiosEventuaisConcedidos: 2_340,
};

export const creas = [
  {
    unidade: "CREAS Central",
    familias: 480,
    paefi: 340,
    mse: 42,
    abordagem: 86,
    equipeCompleta: true,
  },
  {
    unidade: "CREAS Regional Norte",
    familias: 320,
    paefi: 240,
    mse: 18,
    abordagem: 52,
    equipeCompleta: false,
  },
  {
    unidade: "CREAS Regional Sul",
    familias: 180,
    paefi: 128,
    mse: 12,
    abordagem: 26,
    equipeCompleta: true,
  },
];

export const centroPop = {
  capacidade: 80,
  ocupacao: 64,
  atendimentosMes: 420,
  encaminhamentos: 86,
  reinsercaoFamiliar: 12,
  desligamentos: 8,
};

export const medidasSocioeducativas = [
  {
    medida: "Prestação de Serviços à Comunidade (PSC)",
    adolescentes: 28,
    cumprimento: 82,
    evasao: 12,
  },
  {
    medida: "Liberdade Assistida (LA)",
    adolescentes: 34,
    cumprimento: 76,
    evasao: 18,
  },
  { medida: "Semiliberdade", adolescentes: 6, cumprimento: 88, evasao: 8 },
  { medida: "Internação", adolescentes: 4, cumprimento: 92, evasao: 0 },
];

export const beneficiosEventuais = [
  {
    tipo: "Auxílio natalidade",
    concedidos: 380,
    valorMedio: 450,
    tempoMedio: 5,
  },
  {
    tipo: "Auxílio funeral",
    concedidos: 142,
    valorMedio: 1_200,
    tempoMedio: 2,
  },
  {
    tipo: "Vulnerabilidade temporária",
    concedidos: 1_240,
    valorMedio: 280,
    tempoMedio: 7,
  },
  {
    tipo: "Calamidade pública",
    concedidos: 86,
    valorMedio: 520,
    tempoMedio: 3,
  },
  {
    tipo: "Cesta básica emergencial",
    concedidos: 492,
    valorMedio: 180,
    tempoMedio: 4,
  },
];

export const equipesRh = [
  {
    unidade: "CRAS Norte",
    tecnicos: 6,
    exigido: 8,
    nobRh: false,
    capacitados: 5,
  },
  {
    unidade: "CRAS Sul",
    tecnicos: 7,
    exigido: 8,
    nobRh: false,
    capacitados: 6,
  },
  {
    unidade: "CRAS Leste",
    tecnicos: 8,
    exigido: 8,
    nobRh: true,
    capacitados: 7,
  },
  {
    unidade: "CRAS Oeste",
    tecnicos: 5,
    exigido: 8,
    nobRh: false,
    capacitados: 4,
  },
  {
    unidade: "CRAS Centro",
    tecnicos: 8,
    exigido: 8,
    nobRh: true,
    capacitados: 8,
  },
  {
    unidade: "CREAS Central",
    tecnicos: 10,
    exigido: 10,
    nobRh: true,
    capacitados: 9,
  },
  {
    unidade: "CREAS Norte",
    tecnicos: 6,
    exigido: 8,
    nobRh: false,
    capacitados: 4,
  },
  {
    unidade: "Centro POP",
    tecnicos: 4,
    exigido: 6,
    nobRh: false,
    capacitados: 3,
  },
];

export const capacitacao = [
  {
    tema: "Atualização SUAS e NOB-RH",
    participantes: 42,
    cargaHoraria: 40,
    status: "Concluído",
  },
  {
    tema: "Abordagem a pessoas em situação de rua",
    participantes: 18,
    cargaHoraria: 20,
    status: "Em andamento",
  },
  {
    tema: "Trabalho com famílias (PAIF/PAEFI)",
    participantes: 36,
    cargaHoraria: 32,
    status: "Concluído",
  },
  {
    tema: "Prevenção à violência contra crianças",
    participantes: 28,
    cargaHoraria: 16,
    status: "Programado",
  },
  {
    tema: "Registro e prontuário eletrônico",
    participantes: 52,
    cargaHoraria: 8,
    status: "Concluído",
  },
];

export const conselhoCmas = [
  { item: "Reuniões ordinárias realizadas", valor: "8/10", status: "Regular" },
  { item: "Deliberações do exercício", valor: "24", status: "Bom" },
  { item: "Resoluções publicadas no D.O.", valor: "18/24", status: "Atenção" },
  { item: "Inscrição de entidades atualizada", valor: "92%", status: "Bom" },
  { item: "Conferência Municipal realizada", valor: "Sim", status: "Bom" },
  { item: "Plano de Ação aprovado", valor: "Sim", status: "Bom" },
];

// ── Proteção Social Básica (CRAS / PAIF) ─────────────────────────────

export const protecaoBasicaResumo = {
  crasEmFuncionamento: 5,
  crasReferenciados: 5,
  familiasPaif: 3_840,
  metaPaif: 4_200,
  taxaAcompanhamentoPaif: 91.4,
  visitasDomiciliares: 2_680,
};

export const crasFuncionamento = [
  {
    unidade: "CRAS Norte",
    familias: 820,
    paif: 680,
    buscaAtiva: 142,
    oficinas: 12,
    acolhidas: 384,
    referenciamento: 3420,
    equipeMinima: true,
  },
  {
    unidade: "CRAS Sul",
    familias: 740,
    paif: 620,
    buscaAtiva: 118,
    oficinas: 10,
    acolhidas: 356,
    referenciamento: 2980,
    equipeMinima: true,
  },
  {
    unidade: "CRAS Leste",
    familias: 860,
    paif: 710,
    buscaAtiva: 156,
    oficinas: 14,
    acolhidas: 412,
    referenciamento: 3110,
    equipeMinima: true,
  },
  {
    unidade: "CRAS Oeste",
    familias: 680,
    paif: 540,
    buscaAtiva: 98,
    oficinas: 8,
    acolhidas: 298,
    referenciamento: 2760,
    equipeMinima: false,
  },
  {
    unidade: "CRAS Centro",
    familias: 740,
    paif: 590,
    buscaAtiva: 126,
    oficinas: 11,
    acolhidas: 372,
    referenciamento: 2550,
    equipeMinima: true,
  },
];

export const chartPaifPerformance = {
  paif: { label: "Famílias PAIF", color: greenPalette[1] },
  buscaAtiva: { label: "Busca Ativa", color: greenPalette[3] },
};

export const paifPerformanceData = crasFuncionamento.map((item) => ({
  unidade: item.unidade.replace("CRAS ", ""),
  paif: item.paif,
  buscaAtiva: item.buscaAtiva,
}));

export const indicadoresProtecaoBasica = [
  { indicador: "Famílias com Plano de Acompanhamento", valor: 88, meta: 95 },
  { indicador: "Encaminhamentos para rede com retorno", valor: 72, meta: 85 },
  { indicador: "Oficinas com frequência acima de 75%", valor: 83, meta: 90 },
  { indicador: "Prontuários SUAS atualizados", valor: 91, meta: 100 },
  { indicador: "Busca ativa com localização efetiva", valor: 67, meta: 80 },
];

export const scfvFaixaEtaria = [
  {
    faixaEtaria: "0-6 anos",
    inscritos: 340,
    frequentes: 286,
    vagas: 400,
    ocupacao: 85,
  },
  {
    faixaEtaria: "7-14 anos",
    inscritos: 620,
    frequentes: 518,
    vagas: 700,
    ocupacao: 89,
  },
  {
    faixaEtaria: "15-17 anos",
    inscritos: 280,
    frequentes: 214,
    vagas: 350,
    ocupacao: 80,
  },
  {
    faixaEtaria: "18-59 anos",
    inscritos: 460,
    frequentes: 372,
    vagas: 500,
    ocupacao: 92,
  },
  {
    faixaEtaria: "60+ anos",
    inscritos: 460,
    frequentes: 408,
    vagas: 500,
    ocupacao: 92,
  },
];

// ── Transferência de Renda ────────────────────────────────────────────

export const transferenciaRendaResumo = {
  familiasCadunico: 14_820,
  cadastrosAtualizados: 87.6,
  familiasBolsaFamilia: 6_430,
  igdm: 0.82,
};

export const qualidadeCadastral = [
  { mes: "Jan", atualizados: 82, inconsistentes: 12, pendentes: 6 },
  { mes: "Fev", atualizados: 83, inconsistentes: 11, pendentes: 6 },
  { mes: "Mar", atualizados: 84, inconsistentes: 10, pendentes: 6 },
  { mes: "Abr", atualizados: 85, inconsistentes: 10, pendentes: 5 },
  { mes: "Mai", atualizados: 86, inconsistentes: 9, pendentes: 5 },
  { mes: "Jun", atualizados: 86, inconsistentes: 9, pendentes: 5 },
  { mes: "Jul", atualizados: 87, inconsistentes: 8, pendentes: 5 },
  { mes: "Ago", atualizados: 88, inconsistentes: 8, pendentes: 4 },
];

export const chartQualidadeCadastral = {
  atualizados: { label: "Atualizados (%)", color: greenPalette[1] },
  inconsistentes: { label: "Inconsistentes (%)", color: greenPalette[3] },
  pendentes: { label: "Pendentes (%)", color: greenPalette[5] },
};

export const condicionalidadesBF = [
  {
    condicionalidade: "Frequência escolar (6-17 anos)",
    acompanhamento: 94.2,
    descumprimento: 3.8,
    advertencia: 128,
    bloqueio: 42,
    suspensao: 14,
  },
  {
    condicionalidade: "Vacinação (0-6 anos)",
    acompanhamento: 91.8,
    descumprimento: 5.4,
    advertencia: 86,
    bloqueio: 28,
    suspensao: 8,
  },
  {
    condicionalidade: "Pré-natal (gestantes)",
    acompanhamento: 96.1,
    descumprimento: 2.1,
    advertencia: 12,
    bloqueio: 4,
    suspensao: 1,
  },
  {
    condicionalidade: "Nutriz (acomp. nutricional)",
    acompanhamento: 93.4,
    descumprimento: 4.2,
    advertencia: 24,
    bloqueio: 8,
    suspensao: 2,
  },
];

export const averiguacaoCadastral = {
  familiasConvocadas: 1_840,
  atualizadasNoPrazo: 1_420,
  semResposta: 280,
  canceladas: 140,
};

export const igdmDecomposicao = [
  {
    componente: "Taxa de Atualização Cadastral (TAC)",
    valor: 0.88,
    peso: "25%",
    status: "Bom",
  },
  {
    componente: "Taxa de Qualificação Cadastral (TQC)",
    valor: 0.79,
    peso: "25%",
    status: "Atenção",
  },
  {
    componente: "Taxa de Acompan. Freq. Escolar (TAFE)",
    valor: 0.84,
    peso: "12,5%",
    status: "Bom",
  },
  {
    componente: "Taxa de Acompan. Agenda Saúde (TAAS)",
    valor: 0.76,
    peso: "12,5%",
    status: "Atenção",
  },
  {
    componente: "Fator de Adesão ao SUAS",
    valor: 1.0,
    peso: "Multiplicador",
    status: "Bom",
  },
  {
    componente: "Fator de Informação da Apresentação (SICON)",
    valor: 0.92,
    peso: "Multiplicador",
    status: "Bom",
  },
];

// ── Primeira Infância e SAN ───────────────────────────────────────────

export const primeiraInfanciaResumo = {
  criancasPcf: 1_240,
  gestantesAcompanhadas: 286,
  familiasInsegurancaAlimentar: 2_180,
  equipamentosSan: 4,
};

export const programaCriancaFeliz = [
  {
    territorio: "Norte",
    criancas: 320,
    gestantes: 72,
    visitadores: 4,
    visitasMes: 480,
    metaVisitas: 540,
    cobertura: 89,
  },
  {
    territorio: "Sul",
    criancas: 260,
    gestantes: 58,
    visitadores: 3,
    visitasMes: 380,
    metaVisitas: 420,
    cobertura: 90,
  },
  {
    territorio: "Leste",
    criancas: 310,
    gestantes: 68,
    visitadores: 4,
    visitasMes: 460,
    metaVisitas: 520,
    cobertura: 88,
  },
  {
    territorio: "Oeste",
    criancas: 180,
    gestantes: 46,
    visitadores: 2,
    visitasMes: 270,
    metaVisitas: 340,
    cobertura: 79,
  },
  {
    territorio: "Centro",
    criancas: 170,
    gestantes: 42,
    visitadores: 2,
    visitasMes: 260,
    metaVisitas: 310,
    cobertura: 84,
  },
];

export const evolucaoVisitasPcf = [
  { mes: "Jan", realizadas: 1680, previstas: 1900 },
  { mes: "Fev", realizadas: 1720, previstas: 1900 },
  { mes: "Mar", realizadas: 1780, previstas: 1920 },
  { mes: "Abr", realizadas: 1810, previstas: 1920 },
  { mes: "Mai", realizadas: 1850, previstas: 1940 },
  { mes: "Jun", realizadas: 1820, previstas: 1940 },
  { mes: "Jul", realizadas: 1900, previstas: 1960 },
  { mes: "Ago", realizadas: 1850, previstas: 1960 },
];

export const chartVisitasPcf = {
  realizadas: { label: "Realizadas", color: greenPalette[1] },
  previstas: { label: "Previstas", color: greenPalette[4] },
};

export const segurancaAlimentar = [
  {
    equipamento: "Cozinha Comunitária Vila Norte",
    capacidade: 300,
    refeicoesDia: 268,
    ocupacao: 89,
    status: "Ativo",
  },
  {
    equipamento: "Banco de Alimentos Municipal",
    capacidade: 500,
    refeicoesDia: 420,
    ocupacao: 84,
    status: "Ativo",
  },
  {
    equipamento: "Restaurante Popular Centro",
    capacidade: 400,
    refeicoesDia: 372,
    ocupacao: 93,
    status: "Ativo",
  },
  {
    equipamento: "Horta Comunitária Leste",
    capacidade: 80,
    refeicoesDia: 62,
    ocupacao: 78,
    status: "Ativo",
  },
];

export const insegurancaAlimentarTerritorio = [
  { territorio: "Norte", grave: 380, moderada: 520, leve: 340 },
  { territorio: "Sul", grave: 240, moderada: 380, leve: 280 },
  { territorio: "Leste", grave: 320, moderada: 460, leve: 310 },
  { territorio: "Oeste", grave: 180, moderada: 290, leve: 220 },
  { territorio: "Centro", grave: 120, moderada: 180, leve: 160 },
];

export const chartInsegurancaAlimentar = {
  grave: { label: "Grave", color: greenPalette[1] },
  moderada: { label: "Moderada", color: greenPalette[3] },
  leve: { label: "Leve", color: greenPalette[5] },
};

// ── Enhancements: Vigilância Socioassistencial ────────────────────────

export const censoSuas = [
  { item: "Censo CRAS preenchido", valor: "5/5", status: "Bom" },
  { item: "Censo CREAS preenchido", valor: "3/3", status: "Bom" },
  { item: "Censo Centro POP preenchido", valor: "1/1", status: "Bom" },
  { item: "Censo Gestão Municipal preenchido", valor: "Sim", status: "Bom" },
  { item: "RMA CRAS em dia", valor: "4/5", status: "Atenção" },
  { item: "RMA CREAS em dia", valor: "3/3", status: "Bom" },
];

export const buscaAtivaQualificada = [
  {
    acao: "Cruzamento CadÚnico x frequência escolar",
    familias: 420,
    localizadas: 340,
    inseridas: 280,
    pendentes: 60,
  },
  {
    acao: "Famílias com cadastro desatualizado > 48 meses",
    familias: 680,
    localizadas: 520,
    inseridas: 0,
    pendentes: 520,
  },
  {
    acao: "Beneficiários BPC sem acompanhamento CRAS",
    familias: 186,
    localizadas: 142,
    inseridas: 118,
    pendentes: 24,
  },
  {
    acao: "Famílias com crianças fora da escola (CadÚnico)",
    familias: 94,
    localizadas: 78,
    inseridas: 62,
    pendentes: 16,
  },
  {
    acao: "Gestantes sem pré-natal identificadas no CadÚnico",
    familias: 42,
    localizadas: 38,
    inseridas: 36,
    pendentes: 2,
  },
];

// ── Enhancements: Proteção Especial ───────────────────────────────────

export const acolhimentoInstitucional = [
  {
    unidade: "Abrigo Infantil Municipal",
    tipo: "Crianças/Adolescentes",
    capacidade: 20,
    acolhidos: 16,
    tempoMedioPermanencia: 8,
    reintegracoes: 6,
    piaAtualizado: 14,
  },
  {
    unidade: "Casa de Passagem Feminina",
    tipo: "Mulheres em situação de violência",
    capacidade: 15,
    acolhidos: 11,
    tempoMedioPermanencia: 4,
    reintegracoes: 8,
    piaAtualizado: 10,
  },
  {
    unidade: "ILPI Municipal",
    tipo: "Idosos",
    capacidade: 40,
    acolhidos: 36,
    tempoMedioPermanencia: 24,
    reintegracoes: 2,
    piaAtualizado: 32,
  },
  {
    unidade: "República Jovem",
    tipo: "Jovens 18-21 anos",
    capacidade: 12,
    acolhidos: 8,
    tempoMedioPermanencia: 6,
    reintegracoes: 4,
    piaAtualizado: 7,
  },
];

export const piaResumo = {
  totalPias: 71,
  atualizados: 63,
  vencidos: 8,
  taxaAtualizacao: 88.7,
};

export const ASSISTENCIA_SOCIAL_SNAPSHOT = {
  greenPalette,
  resumo,
  execucaoMensal,
  chartExecucao,
  fontesRecursos,
  chartFontes,
  programas,
  chartProgramas,
  desempenhoProgramas,
  contasBancarias,
  alertas,
  detalhamentoDespesa,
  receitasPorOrigem,
  chartReceitasOrigem,
  controleFontes,
  indicadoresRede,
  familiasPorTerritorio,
  chartTerritorio,
  agendaGestao,
  patrimonioResumo,
  unidadesPatrimoniais,
  manutencaoPatrimonial,
  movimentacoesPatrimoniais,
  chartMovimentacoesPatrimoniais,
  termosResponsabilidade,
  vigilanciaResumo,
  vulnerabilidadeTerritorial,
  demandaCapacidade,
  violacoesDireitos,
  chartVulnerabilidade,
  evolucaoDemanda,
  chartEvolucaoDemanda,
  protecaoEspecialResumo,
  creas,
  centroPop,
  medidasSocioeducativas,
  beneficiosEventuais,
  equipesRh,
  capacitacao,
  conselhoCmas,
  protecaoBasicaResumo,
  crasFuncionamento,
  chartPaifPerformance,
  paifPerformanceData,
  indicadoresProtecaoBasica,
  scfvFaixaEtaria,
  transferenciaRendaResumo,
  qualidadeCadastral,
  chartQualidadeCadastral,
  condicionalidadesBF,
  averiguacaoCadastral,
  igdmDecomposicao,
  primeiraInfanciaResumo,
  programaCriancaFeliz,
  evolucaoVisitasPcf,
  chartVisitasPcf,
  segurancaAlimentar,
  insegurancaAlimentarTerritorio,
  chartInsegurancaAlimentar,
  censoSuas,
  buscaAtivaQualificada,
  acolhimentoInstitucional,
  piaResumo,
};
