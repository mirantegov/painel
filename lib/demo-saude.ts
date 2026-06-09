// Dados demo do módulo saude.
// Snapshot serializável servido de mod_saude (jsonb). Sem funções/JSX.

export const greenPalette = {
  1: "#166534",
  2: "#15803d",
  3: "#16a34a",
  4: "#22c55e",
  5: "#4ade80",
};

export const saudeResumo = {
  orcamentoTotal: 52_400_000,
  orcamentoEmpenhado: 49_800_000,
  orcamentoPago: 46_200_000,
  receitaTotal: 54_100_000,
  populacaoAtendida: 142_850,
  unidadesSaude: 28,
  profissionaisSaude: 1_240,
  atendimentosMes: 18_450,
};

export const despesasSaude = [
  {
    categoria: "Pessoal e Encargos",
    valor: 32_800_000,
    percentual: 65.9,
    fill: greenPalette[1],
  },
  {
    categoria: "Medicamentos",
    valor: 8_400_000,
    percentual: 16.9,
    fill: greenPalette[2],
  },
  {
    categoria: "Serviços Terceirizados",
    valor: 4_200_000,
    percentual: 8.4,
    fill: greenPalette[3],
  },
  {
    categoria: "Equipamentos e Manutenção",
    valor: 2_800_000,
    percentual: 5.6,
    fill: greenPalette[4],
  },
  {
    categoria: "Outras Despesas",
    valor: 1_600_000,
    percentual: 3.2,
    fill: greenPalette[5],
  },
];

export const chartConfigDespesas = {
  "Pessoal e Encargos": { label: "Pessoal e Encargos", color: greenPalette[1] },
  Medicamentos: { label: "Medicamentos", color: greenPalette[2] },
  "Serviços Terceirizados": {
    label: "Serviços Terceirizados",
    color: greenPalette[3],
  },
  "Equipamentos e Manutenção": {
    label: "Equipamentos e Manutenção",
    color: greenPalette[4],
  },
  "Outras Despesas": { label: "Outras Despesas", color: greenPalette[5] },
};

export const receitasSaude = [
  { fonte: "Transferências SUS", valor: 38_200_000, percentual: 70.6 },
  { fonte: "Recursos Próprios", valor: 12_400_000, percentual: 22.9 },
  { fonte: "Convênios Estaduais", valor: 2_100_000, percentual: 3.9 },
  { fonte: "Convênios Federais", valor: 1_400_000, percentual: 2.6 },
];

export const fontesRecursos = [
  {
    codigo: "1.500",
    nome: "Recursos Próprios",
    saldo: 2_840_000,
    empenhado: 9_560_000,
    disponivel: 2_840_000,
  },
  {
    codigo: "1.600",
    nome: "SUS - Atenção Básica",
    saldo: 1_240_000,
    empenhado: 18_960_000,
    disponivel: 1_240_000,
  },
  {
    codigo: "1.601",
    nome: "SUS - MAC",
    saldo: 890_000,
    empenhado: 14_800_000,
    disponivel: 890_000,
  },
  {
    codigo: "1.602",
    nome: "SUS - Vigilância em Saúde",
    saldo: 420_000,
    empenhado: 3_840_000,
    disponivel: 420_000,
  },
  {
    codigo: "1.700",
    nome: "Convênio Estadual - SESA",
    saldo: 180_000,
    empenhado: 1_920_000,
    disponivel: 180_000,
  },
  {
    codigo: "1.750",
    nome: "Convênio Federal - Ministério",
    saldo: 95_000,
    empenhado: 1_305_000,
    disponivel: 95_000,
  },
];

export const contasBancarias = [
  {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12345-6",
    tipo: "Recursos Próprios",
    saldo: 2_840_000,
  },
  {
    banco: "Caixa Econômica",
    agencia: "0987",
    conta: "00123-4",
    tipo: "SUS - Atenção Básica",
    saldo: 1_240_000,
  },
  {
    banco: "Caixa Econômica",
    agencia: "0987",
    conta: "00124-2",
    tipo: "SUS - MAC",
    saldo: 890_000,
  },
  {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12346-4",
    tipo: "Vigilância em Saúde",
    saldo: 420_000,
  },
  {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12347-2",
    tipo: "Convênios",
    saldo: 275_000,
  },
];

export const evolucaoOrcamentaria = [
  { mes: "Jan", orcado: 6_000_000, empenhado: 5_800_000, pago: 5_400_000 },
  { mes: "Fev", orcado: 6_100_000, empenhado: 5_950_000, pago: 5_600_000 },
  { mes: "Mar", orcado: 6_200_000, empenhado: 6_100_000, pago: 5_750_000 },
  { mes: "Abr", orcado: 6_300_000, empenhado: 6_200_000, pago: 5_900_000 },
  { mes: "Mai", orcado: 6_400_000, empenhado: 6_300_000, pago: 5_950_000 },
  { mes: "Jun", orcado: 6_500_000, empenhado: 6_400_000, pago: 6_100_000 },
  { mes: "Jul", orcado: 6_550_000, empenhado: 6_450_000, pago: 6_200_000 },
  { mes: "Ago", orcado: 6_550_000, empenhado: 6_400_000, pago: 6_300_000 },
];

export const chartConfigEvolucao = {
  orcado: { label: "Orçado", color: greenPalette[5] },
  empenhado: { label: "Empenhado", color: greenPalette[3] },
  pago: { label: "Pago", color: greenPalette[1] },
};

export const kpisSaude = [
  {
    indicador: "Cobertura ESF",
    valor: 87.4,
    meta: 85.0,
    unidade: "%",
    status: "atingido",
  },
  {
    indicador: "Vacinação em Dia",
    valor: 92.1,
    meta: 95.0,
    unidade: "%",
    status: "atencao",
  },
  {
    indicador: "Pré-natal (7+ consultas)",
    valor: 78.5,
    meta: 80.0,
    unidade: "%",
    status: "atencao",
  },
  {
    indicador: "Tempo Médio Espera",
    valor: 18,
    meta: 15,
    unidade: "dias",
    status: "atencao",
  },
  {
    indicador: "Taxa Ocupação Leitos",
    valor: 82.3,
    meta: 85.0,
    unidade: "%",
    status: "atingido",
  },
  {
    indicador: "Resolutividade APS",
    valor: 91.2,
    meta: 90.0,
    unidade: "%",
    status: "atingido",
  },
];

export const atendimentosPorUnidade = [
  {
    unidade: "UBS Centro",
    atendimentos: 4_240,
    capacidade: 5_000,
    ocupacao: 84.8,
    profissionais: 28,
  },
  {
    unidade: "UBS Norte",
    atendimentos: 3_890,
    capacidade: 4_500,
    ocupacao: 86.4,
    profissionais: 24,
  },
  {
    unidade: "UBS Sul",
    atendimentos: 3_420,
    capacidade: 4_000,
    ocupacao: 85.5,
    profissionais: 22,
  },
  {
    unidade: "UBS Leste",
    atendimentos: 2_980,
    capacidade: 3_500,
    ocupacao: 85.1,
    profissionais: 18,
  },
  {
    unidade: "UPA 24h",
    atendimentos: 2_840,
    capacidade: 3_000,
    ocupacao: 94.7,
    profissionais: 42,
  },
  {
    unidade: "Hospital Municipal",
    atendimentos: 1_080,
    capacidade: 1_200,
    ocupacao: 90.0,
    profissionais: 86,
  },
];

export const produtividadeProfissionais = [
  {
    categoria: "Médicos",
    quantidade: 124,
    atendimentos: 8_940,
    mediaDia: 12.1,
  },
  {
    categoria: "Enfermeiros",
    quantidade: 186,
    atendimentos: 12_480,
    mediaDia: 11.2,
  },
  {
    categoria: "Técnicos Enfermagem",
    quantidade: 342,
    atendimentos: 18_450,
    mediaDia: 9.0,
  },
  {
    categoria: "Dentistas",
    quantidade: 48,
    atendimentos: 3_240,
    mediaDia: 11.3,
  },
  {
    categoria: "Farmacêuticos",
    quantidade: 24,
    atendimentos: 14_820,
    mediaDia: 103.2,
  },
  {
    categoria: "Agentes Comunitários",
    quantidade: 516,
    visitas: 28_940,
    mediaDia: 9.4,
  },
];

export const estoqueMedicamentos = [
  {
    medicamento: "Paracetamol 500mg",
    estoque: 48_000,
    consumoMedio: 12_400,
    cobertura: 116,
    criticidade: "adequado",
  },
  {
    medicamento: "Dipirona 500mg",
    estoque: 36_000,
    consumoMedio: 9_800,
    cobertura: 110,
    criticidade: "adequado",
  },
  {
    medicamento: "Amoxicilina 500mg",
    estoque: 8_400,
    consumoMedio: 4_200,
    cobertura: 60,
    criticidade: "atencao",
  },
  {
    medicamento: "Losartana 50mg",
    estoque: 24_000,
    consumoMedio: 8_100,
    cobertura: 89,
    criticidade: "adequado",
  },
  {
    medicamento: "Metformina 850mg",
    estoque: 18_000,
    consumoMedio: 6_800,
    cobertura: 79,
    criticidade: "atencao",
  },
  {
    medicamento: "Insulina NPH",
    estoque: 840,
    consumoMedio: 620,
    cobertura: 41,
    criticidade: "critico",
  },
];

export const programasSaude = [
  {
    programa: "Saúde da Família",
    beneficiarios: 124_800,
    cobertura: 87.4,
    investimento: 18_200_000,
  },
  {
    programa: "Saúde Bucal",
    beneficiarios: 89_400,
    cobertura: 62.6,
    investimento: 3_840_000,
  },
  {
    programa: "Saúde da Mulher",
    beneficiarios: 42_100,
    cobertura: 58.9,
    investimento: 2_940_000,
  },
  {
    programa: "Saúde da Criança",
    beneficiarios: 28_400,
    cobertura: 94.2,
    investimento: 4_280_000,
  },
  {
    programa: "Hiperdia",
    beneficiarios: 18_900,
    cobertura: 72.1,
    investimento: 1_840_000,
  },
  {
    programa: "Saúde Mental",
    beneficiarios: 3_240,
    cobertura: 48.2,
    investimento: 1_680_000,
  },
];

export const alertasSaude = [
  {
    tipo: "warning" as const,
    titulo: "Estoque crítico de insulina NPH",
    badge: "Medicamentos",
    descricao:
      "Cobertura de apenas 41 dias. Necessário processo emergencial de aquisição para atender pacientes diabéticos.",
  },
  {
    tipo: "warning" as const,
    titulo: "Tempo de espera acima da meta",
    badge: "Atendimento",
    descricao:
      "Tempo médio de 18 dias está 20% acima da meta de 15 dias. Concentrado em especialidades de cardiologia e ortopedia.",
  },
  {
    tipo: "info" as const,
    titulo: "Cobertura ESF supera meta estabelecida",
    badge: "Atenção Básica",
    descricao:
      "87,4% da população coberta pela Estratégia Saúde da Família, superando a meta de 85% e a média nacional de 75%.",
  },
  {
    tipo: "success" as const,
    titulo: "Resolutividade da APS acima de 90%",
    badge: "Qualidade",
    descricao:
      "91,2% dos casos resolvidos na Atenção Primária, reduzindo sobrecarga no hospital e na UPA.",
  },
];

// ─── ASPS Compliance (EC 29 / LC 141) ─────────────────────────────────
export const aspsCompliance = {
  receitaImpostos: 248_600_000,
  minimoConstitucional: 0.15,
  aplicadoSaude: 49_800_000,
  percentualAplicado: 20.02,
  minimoExigido: 37_290_000,
  superavit: 12_510_000,
};

// ─── Mortality & Morbidity Indicators ──────────────────────────────────
export const indicadoresMortalidade = {
  mortalidadeInfantil: 9.8,
  mortalidadeInfantilMeta: 12.0,
  mortalidadeMaterna: 42.5,
  mortalidadeMaternaMeta: 50.0,
  mortalidadeNeonatal: 6.2,
  icsap: 28.4,
  icsapMeta: 30.0,
  mortalidadePrematura: 312.8,
};

// ─── Epidemiological Surveillance ──────────────────────────────────────
export const vigilanciaDoencas = [
  {
    doenca: "Dengue",
    casosConfirmados: 342,
    casosSuspeitos: 518,
    obitos: 1,
    incidencia: 209.4,
    tendencia: "alta",
  },
  {
    doenca: "COVID-19",
    casosConfirmados: 89,
    casosSuspeitos: 145,
    obitos: 0,
    incidencia: 54.5,
    tendencia: "estavel",
  },
  {
    doenca: "Tuberculose",
    casosConfirmados: 28,
    casosSuspeitos: 42,
    obitos: 1,
    incidencia: 17.1,
    tendencia: "estavel",
  },
  {
    doenca: "Hanseníase",
    casosConfirmados: 12,
    casosSuspeitos: 18,
    obitos: 0,
    incidencia: 7.3,
    tendencia: "queda",
  },
  {
    doenca: "Sífilis Congênita",
    casosConfirmados: 6,
    casosSuspeitos: 9,
    obitos: 0,
    incidencia: 3.7,
    tendencia: "alta",
  },
  {
    doenca: "HIV/AIDS",
    casosConfirmados: 15,
    casosSuspeitos: 24,
    obitos: 0,
    incidencia: 9.2,
    tendencia: "estavel",
  },
  {
    doenca: "Hepatites Virais",
    casosConfirmados: 8,
    casosSuspeitos: 14,
    obitos: 0,
    incidencia: 4.9,
    tendencia: "queda",
  },
  {
    doenca: "Leishmaniose",
    casosConfirmados: 4,
    casosSuspeitos: 11,
    obitos: 0,
    incidencia: 2.4,
    tendencia: "estavel",
  },
];

export const notificacoesSINAN = [
  { mes: "Jan", notificacoes: 142, confirmados: 68 },
  { mes: "Fev", notificacoes: 168, confirmados: 82 },
  { mes: "Mar", notificacoes: 245, confirmados: 128 },
  { mes: "Abr", notificacoes: 312, confirmados: 156 },
  { mes: "Mai", notificacoes: 284, confirmados: 134 },
  { mes: "Jun", notificacoes: 198, confirmados: 92 },
  { mes: "Jul", notificacoes: 156, confirmados: 74 },
  { mes: "Ago", notificacoes: 178, confirmados: 86 },
];

export const chartConfigNotificacoes = {
  notificacoes: { label: "Notificações", color: greenPalette[4] },
  confirmados: { label: "Confirmados", color: greenPalette[1] },
};

export const coberturaVacinal = [
  { vacina: "BCG", cobertura: 96.8, meta: 90.0, publicoAlvo: "Recém-nascidos" },
  {
    vacina: "Pentavalente",
    cobertura: 88.4,
    meta: 95.0,
    publicoAlvo: "< 1 ano",
  },
  {
    vacina: "VIP/VOP (Polio)",
    cobertura: 91.2,
    meta: 95.0,
    publicoAlvo: "< 1 ano",
  },
  {
    vacina: "Tríplice Viral",
    cobertura: 89.6,
    meta: 95.0,
    publicoAlvo: "12 meses",
  },
  {
    vacina: "Influenza",
    cobertura: 72.4,
    meta: 90.0,
    publicoAlvo: "Grupos prioritários",
  },
  {
    vacina: "COVID-19 (Bivalente)",
    cobertura: 62.8,
    meta: 80.0,
    publicoAlvo: "Adultos 60+",
  },
];

export const alertasVigilancia = [
  {
    tipo: "warning" as const,
    titulo: "Surto de dengue na região Norte",
    badge: "Arboviroses",
    descricao:
      "Aumento de 180% nos casos de dengue no bairro Jardim Esperança. LIRAa indica 4,2% de infestação predial, acima do limite de 3,9%.",
  },
  {
    tipo: "warning" as const,
    titulo: "Sífilis congênita acima do aceitável",
    badge: "IST",
    descricao:
      "6 casos confirmados no semestre, acima da meta de eliminação (0,5/1.000 NV). Necessário fortalecer pré-natal e testagem rápida.",
  },
  {
    tipo: "info" as const,
    titulo: "Campanha de vacinação contra Influenza",
    badge: "Imunização",
    descricao:
      "Cobertura vacinal de 72,4% para influenza. Meta de 90% requer intensificação da busca ativa em idosos e gestantes.",
  },
  {
    tipo: "success" as const,
    titulo: "Hanseníase em tendência de queda",
    badge: "Doenças Crônicas",
    descricao:
      "Redução de 25% nos casos novos em relação ao mesmo período do ano anterior. Manter vigilância de contatos.",
  },
];

// ─── Regulation & Queue Management ─────────────────────────────────────
export const filasEspecialidades = [
  {
    especialidade: "Cardiologia",
    aguardando: 284,
    tempoMedio: 42,
    atendidosMes: 120,
    meta: 30,
    prioridade: "alta",
  },
  {
    especialidade: "Ortopedia",
    aguardando: 312,
    tempoMedio: 56,
    atendidosMes: 95,
    meta: 30,
    prioridade: "alta",
  },
  {
    especialidade: "Oftalmologia",
    aguardando: 198,
    tempoMedio: 38,
    atendidosMes: 80,
    meta: 30,
    prioridade: "media",
  },
  {
    especialidade: "Neurologia",
    aguardando: 145,
    tempoMedio: 64,
    atendidosMes: 45,
    meta: 45,
    prioridade: "alta",
  },
  {
    especialidade: "Dermatologia",
    aguardando: 89,
    tempoMedio: 28,
    atendidosMes: 60,
    meta: 30,
    prioridade: "baixa",
  },
  {
    especialidade: "Endocrinologia",
    aguardando: 124,
    tempoMedio: 48,
    atendidosMes: 50,
    meta: 30,
    prioridade: "media",
  },
  {
    especialidade: "Psiquiatria",
    aguardando: 168,
    tempoMedio: 72,
    atendidosMes: 35,
    meta: 30,
    prioridade: "alta",
  },
  {
    especialidade: "Urologia",
    aguardando: 76,
    tempoMedio: 32,
    atendidosMes: 55,
    meta: 30,
    prioridade: "baixa",
  },
];

export const filasExames = [
  { exame: "Ressonância Magnética", aguardando: 186, tempoMedio: 45, meta: 30 },
  { exame: "Tomografia", aguardando: 124, tempoMedio: 28, meta: 15 },
  { exame: "Ultrassonografia", aguardando: 98, tempoMedio: 18, meta: 15 },
  { exame: "Endoscopia", aguardando: 142, tempoMedio: 35, meta: 20 },
  { exame: "Mamografia", aguardando: 64, tempoMedio: 12, meta: 15 },
  { exame: "Eletrocardiograma", aguardando: 28, tempoMedio: 5, meta: 7 },
];

export const regulacaoResumo = {
  totalFilaConsultas: 1_396,
  totalFilaExames: 642,
  tfdAtivos: 18,
  tfdCustoMensal: 124_500,
  encaminhamentosEmAberto: 2_038,
  taxaAbsenteismo: 14.2,
  metaAbsenteismo: 10.0,
};

export const evolucaoFilas = [
  { mes: "Jan", consultas: 1_680, exames: 820 },
  { mes: "Fev", consultas: 1_620, exames: 780 },
  { mes: "Mar", consultas: 1_540, exames: 740 },
  { mes: "Abr", consultas: 1_480, exames: 700 },
  { mes: "Mai", consultas: 1_440, exames: 680 },
  { mes: "Jun", consultas: 1_420, exames: 660 },
  { mes: "Jul", consultas: 1_410, exames: 650 },
  { mes: "Ago", consultas: 1_396, exames: 642 },
];

export const chartConfigFilas = {
  consultas: { label: "Fila Consultas", color: greenPalette[3] },
  exames: { label: "Fila Exames", color: greenPalette[1] },
};

// ─── Enhanced Professionals Data ───────────────────────────────────────
export const quadroProfissionais = [
  {
    categoria: "Médicos",
    previsto: 148,
    ocupado: 124,
    vago: 24,
    taxaVacancia: 16.2,
    rotatividade: 18.4,
    razao: "0,76/1.000 hab",
  },
  {
    categoria: "Enfermeiros",
    previsto: 200,
    ocupado: 186,
    vago: 14,
    taxaVacancia: 7.0,
    rotatividade: 8.2,
    razao: "1,14/1.000 hab",
  },
  {
    categoria: "Téc. Enfermagem",
    previsto: 380,
    ocupado: 342,
    vago: 38,
    taxaVacancia: 10.0,
    rotatividade: 12.6,
    razao: "2,09/1.000 hab",
  },
  {
    categoria: "Dentistas",
    previsto: 56,
    ocupado: 48,
    vago: 8,
    taxaVacancia: 14.3,
    rotatividade: 10.8,
    razao: "0,29/1.000 hab",
  },
  {
    categoria: "Farmacêuticos",
    previsto: 28,
    ocupado: 24,
    vago: 4,
    taxaVacancia: 14.3,
    rotatividade: 6.4,
    razao: "0,15/1.000 hab",
  },
  {
    categoria: "ACS",
    previsto: 560,
    ocupado: 516,
    vago: 44,
    taxaVacancia: 7.9,
    rotatividade: 4.2,
    razao: "3,16/1.000 hab",
  },
  {
    categoria: "Psicólogos",
    previsto: 18,
    ocupado: 8,
    vago: 10,
    taxaVacancia: 55.6,
    rotatividade: 22.0,
    razao: "0,05/1.000 hab",
  },
  {
    categoria: "Psiquiatras",
    previsto: 6,
    ocupado: 2,
    vago: 4,
    taxaVacancia: 66.7,
    rotatividade: 28.0,
    razao: "0,01/1.000 hab",
  },
];

export const capacitacoes = [
  {
    nome: "Urgência e Emergência (ATLS)",
    profissionais: 42,
    cargaHoraria: 40,
    conclusao: 88,
  },
  {
    nome: "Atenção Básica (AIDPI)",
    profissionais: 86,
    cargaHoraria: 60,
    conclusao: 72,
  },
  {
    nome: "Saúde Mental (Acolhimento)",
    profissionais: 24,
    cargaHoraria: 32,
    conclusao: 95,
  },
  {
    nome: "Imunização (Atualização PNI)",
    profissionais: 128,
    cargaHoraria: 20,
    conclusao: 84,
  },
  {
    nome: "Vigilância Epidemiológica",
    profissionais: 36,
    cargaHoraria: 24,
    conclusao: 68,
  },
];

// ─── Enhanced Medication Data ──────────────────────────────────────────
export const consumoMedicamentosMensal = [
  { mes: "Jan", dispensacoes: 42_800, custoTotal: 680_000 },
  { mes: "Fev", dispensacoes: 44_200, custoTotal: 695_000 },
  { mes: "Mar", dispensacoes: 46_800, custoTotal: 720_000 },
  { mes: "Abr", dispensacoes: 48_400, custoTotal: 745_000 },
  { mes: "Mai", dispensacoes: 47_200, custoTotal: 738_000 },
  { mes: "Jun", dispensacoes: 45_600, custoTotal: 712_000 },
  { mes: "Jul", dispensacoes: 44_800, custoTotal: 698_000 },
  { mes: "Ago", dispensacoes: 46_200, custoTotal: 725_000 },
];

export const chartConfigConsumo = {
  dispensacoes: { label: "Dispensações", color: greenPalette[3] },
  custoTotal: { label: "Custo (R$)", color: greenPalette[1] },
};

export const aquisicoesPipeline = [
  {
    item: "Insulina NPH (emergencial)",
    modalidade: "Dispensa de Licitação",
    valor: 245_000,
    status: "em_andamento",
    previsao: "Set/2024",
  },
  {
    item: "Medicamentos Atenção Básica",
    modalidade: "Pregão Eletrônico",
    valor: 1_840_000,
    status: "publicado",
    previsao: "Out/2024",
  },
  {
    item: "Insumos Hospitalares",
    modalidade: "Pregão Eletrônico",
    valor: 680_000,
    status: "em_elaboracao",
    previsao: "Nov/2024",
  },
  {
    item: "Medicamentos Saúde Mental",
    modalidade: "Ata de Registro de Preços",
    valor: 320_000,
    status: "concluido",
    previsao: "Ago/2024",
  },
  {
    item: "Vacinas (complementar PNI)",
    modalidade: "Adesão ARP",
    valor: 480_000,
    status: "em_andamento",
    previsao: "Set/2024",
  },
];

export const curvaABC = [
  {
    classe: "A",
    itens: 42,
    percentualItens: 14,
    percentualValor: 72,
    valor: 6_048_000,
  },
  {
    classe: "B",
    itens: 84,
    percentualItens: 28,
    percentualValor: 20,
    valor: 1_680_000,
  },
  {
    classe: "C",
    itens: 174,
    percentualItens: 58,
    percentualValor: 8,
    valor: 672_000,
  },
];

// ─── Previne Brasil Indicators ─────────────────────────────────────────
export const previneBrasil = {
  pap: {
    nome: "Pagamento por Ações Públicas (PAP)",
    valor: 2_840_000,
    capitacao: 1_680_000,
    desempenho: 1_160_000,
  },
  indicadores: [
    {
      indicador: "Proporção de gestantes com 6+ consultas pré-natal",
      valor: 72.4,
      meta: 60.0,
      peso: 1,
      status: "atingido",
    },
    {
      indicador: "Proporção de gestantes com teste HIV e sífilis",
      valor: 84.2,
      meta: 60.0,
      peso: 1,
      status: "atingido",
    },
    {
      indicador: "Proporção de gestantes com atendimento odontológico",
      valor: 48.6,
      meta: 60.0,
      peso: 1,
      status: "atencao",
    },
    {
      indicador: "Cobertura de exame citopatológico (25-64 anos)",
      valor: 42.8,
      meta: 40.0,
      peso: 1,
      status: "atingido",
    },
    {
      indicador: "Cobertura vacinal de Polio e Penta (< 1 ano)",
      valor: 88.4,
      meta: 95.0,
      peso: 1,
      status: "atencao",
    },
    {
      indicador: "Percentual de HAS com PA aferida a cada semestre",
      valor: 68.4,
      meta: 50.0,
      peso: 1,
      status: "atingido",
    },
    {
      indicador: "Percentual de DM com hemoglobina glicada solicitada",
      valor: 58.2,
      meta: 50.0,
      peso: 1,
      status: "atingido",
    },
  ],
  isf: {
    nota: 8.2,
    classificacao: "Bom",
    componentes: [
      { componente: "Processo de trabalho", nota: 8.8 },
      { componente: "Satisfação do usuário", nota: 7.6 },
      { componente: "Resultado de indicadores", nota: 8.2 },
    ],
  },
};

// ─── Monthly visit trends ──────────────────────────────────────────────
export const atendimentosTendencia = [
  { mes: "Jan", ubs: 12_400, upa: 2_680, hospital: 980 },
  { mes: "Fev", ubs: 12_800, upa: 2_720, hospital: 1_020 },
  { mes: "Mar", ubs: 13_200, upa: 2_840, hospital: 1_060 },
  { mes: "Abr", ubs: 13_600, upa: 2_900, hospital: 1_040 },
  { mes: "Mai", ubs: 14_100, upa: 2_780, hospital: 1_080 },
  { mes: "Jun", ubs: 14_530, upa: 2_840, hospital: 1_080 },
  { mes: "Jul", ubs: 14_200, upa: 2_760, hospital: 1_060 },
  { mes: "Ago", ubs: 14_530, upa: 2_840, hospital: 1_080 },
];

export const chartConfigAtendimentos = {
  ubs: { label: "UBS", color: greenPalette[3] },
  upa: { label: "UPA", color: greenPalette[1] },
  hospital: { label: "Hospital", color: greenPalette[5] },
};

export const SAUDE_SNAPSHOT = {
  greenPalette,
  saudeResumo,
  despesasSaude,
  chartConfigDespesas,
  receitasSaude,
  fontesRecursos,
  contasBancarias,
  evolucaoOrcamentaria,
  chartConfigEvolucao,
  kpisSaude,
  atendimentosPorUnidade,
  produtividadeProfissionais,
  estoqueMedicamentos,
  programasSaude,
  alertasSaude,
  aspsCompliance,
  indicadoresMortalidade,
  vigilanciaDoencas,
  notificacoesSINAN,
  chartConfigNotificacoes,
  coberturaVacinal,
  alertasVigilancia,
  filasEspecialidades,
  filasExames,
  regulacaoResumo,
  evolucaoFilas,
  chartConfigFilas,
  quadroProfissionais,
  capacitacoes,
  consumoMedicamentosMensal,
  chartConfigConsumo,
  aquisicoesPipeline,
  curvaABC,
  previneBrasil,
  atendimentosTendencia,
  chartConfigAtendimentos,
};
