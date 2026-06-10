// Dados demo do módulo educacao.
// Snapshot serializável servido de mod_educacao (jsonb). Sem funções/JSX.

export const greenPalette = {
  1: "#166534",
  2: "#15803d",
  3: "#16a34a",
  4: "#22c55e",
  5: "#4ade80",
};

// ── Dados Orçamentários e Financeiros ──────────────────────────────

export const educacaoResumo = {
  orcamentoTotal: 45_600_000,
  orcamentoEmpenhado: 42_300_000,
  orcamentoPago: 38_900_000,
  receitaTotal: 47_200_000,
  alunosMatriculados: 18_420,
  escolas: 42,
  profissionaisEducacao: 1_680,
  fundeRecebido: 32_400_000,
};

export const despesasEducacao = [
  {
    categoria: "Pessoal e Encargos",
    valor: 28_600_000,
    percentual: 67.6,
    fill: greenPalette[1],
  },
  {
    categoria: "Alimentação Escolar",
    valor: 4_800_000,
    percentual: 11.3,
    fill: greenPalette[2],
  },
  {
    categoria: "Transporte Escolar",
    valor: 3_900_000,
    percentual: 9.2,
    fill: greenPalette[3],
  },
  {
    categoria: "Material Didático",
    valor: 2_800_000,
    percentual: 6.6,
    fill: greenPalette[4],
  },
  {
    categoria: "Manutenção e Infraestrutura",
    valor: 2_200_000,
    percentual: 5.2,
    fill: greenPalette[5],
  },
];

export const chartConfigDespesas = {
  "Pessoal e Encargos": { label: "Pessoal e Encargos", color: greenPalette[1] },
  "Alimentação Escolar": {
    label: "Alimentação Escolar",
    color: greenPalette[2],
  },
  "Transporte Escolar": { label: "Transporte Escolar", color: greenPalette[3] },
  "Material Didático": { label: "Material Didático", color: greenPalette[4] },
  "Manutenção e Infraestrutura": {
    label: "Manutenção e Infraestrutura",
    color: greenPalette[5],
  },
};

export const receitasEducacao = [
  { fonte: "FUNDEB", valor: 32_400_000, percentual: 68.6 },
  { fonte: "Recursos Próprios (MDE)", valor: 8_200_000, percentual: 17.4 },
  { fonte: "Salário-Educação (FNDE)", valor: 3_400_000, percentual: 7.2 },
  { fonte: "PNAE (Alimentação)", valor: 1_840_000, percentual: 3.9 },
  { fonte: "PNATE (Transporte)", valor: 1_360_000, percentual: 2.9 },
];

export const fontesRecursos = [
  {
    codigo: "1.540",
    nome: "FUNDEB 70% - Magistério",
    saldo: 1_840_000,
    empenhado: 22_680_000,
    disponivel: 1_840_000,
  },
  {
    codigo: "1.541",
    nome: "FUNDEB 30% - Outros",
    saldo: 960_000,
    empenhado: 9_720_000,
    disponivel: 960_000,
  },
  {
    codigo: "1.550",
    nome: "MDE - Recursos Próprios",
    saldo: 680_000,
    empenhado: 7_520_000,
    disponivel: 680_000,
  },
  {
    codigo: "1.553",
    nome: "Salário-Educação / FNDE",
    saldo: 420_000,
    empenhado: 2_980_000,
    disponivel: 420_000,
  },
  {
    codigo: "1.560",
    nome: "PNAE - Alimentação",
    saldo: 240_000,
    empenhado: 1_600_000,
    disponivel: 240_000,
  },
  {
    codigo: "1.561",
    nome: "PNATE - Transporte",
    saldo: 180_000,
    empenhado: 1_180_000,
    disponivel: 180_000,
  },
];

export const contasBancarias = [
  {
    banco: "Banco do Brasil",
    agencia: "2345-6",
    conta: "23456-7",
    tipo: "FUNDEB 70%",
    saldo: 1_840_000,
  },
  {
    banco: "Banco do Brasil",
    agencia: "2345-6",
    conta: "23457-5",
    tipo: "FUNDEB 30%",
    saldo: 960_000,
  },
  {
    banco: "Caixa Econômica",
    agencia: "1234",
    conta: "00234-5",
    tipo: "MDE - Próprios",
    saldo: 680_000,
  },
  {
    banco: "Banco do Brasil",
    agencia: "2345-6",
    conta: "23458-3",
    tipo: "Salário-Educação",
    saldo: 420_000,
  },
  {
    banco: "Caixa Econômica",
    agencia: "1234",
    conta: "00235-3",
    tipo: "PNAE",
    saldo: 240_000,
  },
  {
    banco: "Caixa Econômica",
    agencia: "1234",
    conta: "00236-1",
    tipo: "PNATE",
    saldo: 180_000,
  },
];

export const evolucaoOrcamentaria = [
  { mes: "Jan", orcado: 5_200_000, empenhado: 5_000_000, pago: 4_600_000 },
  { mes: "Fev", orcado: 5_300_000, empenhado: 5_150_000, pago: 4_800_000 },
  { mes: "Mar", orcado: 5_400_000, empenhado: 5_280_000, pago: 4_900_000 },
  { mes: "Abr", orcado: 5_500_000, empenhado: 5_400_000, pago: 5_050_000 },
  { mes: "Mai", orcado: 5_600_000, empenhado: 5_500_000, pago: 5_100_000 },
  { mes: "Jun", orcado: 5_700_000, empenhado: 5_580_000, pago: 5_250_000 },
  { mes: "Jul", orcado: 5_750_000, empenhado: 5_620_000, pago: 5_300_000 },
  { mes: "Ago", orcado: 5_800_000, empenhado: 5_700_000, pago: 5_400_000 },
];

export const chartConfigEvolucao = {
  orcado: { label: "Orçado", color: greenPalette[5] },
  empenhado: { label: "Empenhado", color: greenPalette[3] },
  pago: { label: "Pago", color: greenPalette[1] },
};

export const detalhamentoDespesa = [
  {
    grupo: "Ensino Fundamental",
    autorizado: 22_400_000,
    empenhado: 21_200_000,
    liquidado: 20_100_000,
    pago: 19_400_000,
  },
  {
    grupo: "Educação Infantil",
    autorizado: 12_800_000,
    empenhado: 11_900_000,
    liquidado: 11_200_000,
    pago: 10_600_000,
  },
  {
    grupo: "Transporte Escolar",
    autorizado: 4_200_000,
    empenhado: 3_900_000,
    liquidado: 3_600_000,
    pago: 3_500_000,
  },
  {
    grupo: "Alimentação Escolar",
    autorizado: 3_600_000,
    empenhado: 3_400_000,
    liquidado: 3_200_000,
    pago: 3_100_000,
  },
  {
    grupo: "Gestão e Administração",
    autorizado: 2_600_000,
    empenhado: 1_900_000,
    liquidado: 1_800_000,
    pago: 2_300_000,
  },
];

export const chartReceitasOrigem = {
  previsto: { label: "Previsto", color: greenPalette[4] },
  arrecadado: { label: "Arrecadado", color: greenPalette[1] },
};

export const receitasPorOrigem = [
  { origem: "FUNDEB", previsto: 33_800_000, arrecadado: 32_400_000 },
  { origem: "MDE Próprio", previsto: 8_600_000, arrecadado: 8_200_000 },
  { origem: "Sal.-Educação", previsto: 3_600_000, arrecadado: 3_400_000 },
  { origem: "PNAE/PNATE", previsto: 3_400_000, arrecadado: 3_200_000 },
];

// ── Dados da Gestão da Educação ────────────────────────────────────

export const kpisEducacao = [
  {
    indicador: "IDEB Anos Iniciais",
    valor: 6.2,
    meta: 6.0,
    unidade: "",
    status: "atingido",
  },
  {
    indicador: "IDEB Anos Finais",
    valor: 5.1,
    meta: 5.5,
    unidade: "",
    status: "atencao",
  },
  {
    indicador: "Taxa de Aprovação",
    valor: 94.8,
    meta: 95.0,
    unidade: "%",
    status: "atencao",
  },
  {
    indicador: "Taxa de Evasão",
    valor: 1.8,
    meta: 2.0,
    unidade: "%",
    status: "atingido",
  },
  {
    indicador: "Distorção Idade-Série",
    valor: 8.4,
    meta: 7.0,
    unidade: "%",
    status: "atencao",
  },
  {
    indicador: "Alfabetização (2º ano)",
    valor: 78.5,
    meta: 80.0,
    unidade: "%",
    status: "atencao",
  },
];

export const escolasPorModalidade = [
  {
    modalidade: "CMEI (Creche e Pré-escola)",
    unidades: 14,
    alunos: 3_240,
    capacidade: 3_600,
    ocupacao: 90.0,
    profissionais: 280,
  },
  {
    modalidade: "EMEF (Fundamental I)",
    unidades: 12,
    alunos: 6_480,
    capacidade: 7_200,
    ocupacao: 90.0,
    profissionais: 420,
  },
  {
    modalidade: "EMEF (Fundamental II)",
    unidades: 8,
    alunos: 5_120,
    capacidade: 5_600,
    ocupacao: 91.4,
    profissionais: 380,
  },
  {
    modalidade: "EJA (Jovens e Adultos)",
    unidades: 4,
    alunos: 1_840,
    capacidade: 2_400,
    ocupacao: 76.7,
    profissionais: 120,
  },
  {
    modalidade: "Educação Especial/AEE",
    unidades: 2,
    alunos: 480,
    capacidade: 600,
    ocupacao: 80.0,
    profissionais: 86,
  },
  {
    modalidade: "Escola Rural",
    unidades: 2,
    alunos: 1_260,
    capacidade: 1_400,
    ocupacao: 90.0,
    profissionais: 94,
  },
];

export const matriculasPorAno = [
  {
    ano: "2020",
    infantil: 2_840,
    fundamental: 10_200,
    eja: 1_620,
    especial: 340,
  },
  {
    ano: "2021",
    infantil: 2_920,
    fundamental: 10_400,
    eja: 1_580,
    especial: 360,
  },
  {
    ano: "2022",
    infantil: 3_040,
    fundamental: 10_800,
    eja: 1_720,
    especial: 400,
  },
  {
    ano: "2023",
    infantil: 3_140,
    fundamental: 11_200,
    eja: 1_780,
    especial: 440,
  },
  {
    ano: "2024",
    infantil: 3_240,
    fundamental: 11_600,
    eja: 1_840,
    especial: 480,
  },
];

export const chartMatriculas = {
  infantil: { label: "Ed. Infantil", color: greenPalette[1] },
  fundamental: { label: "Fundamental", color: greenPalette[3] },
  eja: { label: "EJA", color: greenPalette[4] },
  especial: { label: "Ed. Especial", color: greenPalette[5] },
};

export const profissionaisEducacao = [
  {
    categoria: "Professores Efetivos",
    quantidade: 680,
    formacaoSuperior: 94.2,
    mediaSalarial: 5_840,
  },
  {
    categoria: "Professores Contratados",
    quantidade: 240,
    formacaoSuperior: 82.5,
    mediaSalarial: 3_200,
  },
  {
    categoria: "Coordenadores Pedagógicos",
    quantidade: 48,
    formacaoSuperior: 100,
    mediaSalarial: 7_200,
  },
  {
    categoria: "Diretores Escolares",
    quantidade: 42,
    formacaoSuperior: 100,
    mediaSalarial: 8_400,
  },
  {
    categoria: "Apoio Pedagógico (AEE)",
    quantidade: 86,
    formacaoSuperior: 91.9,
    mediaSalarial: 4_600,
  },
  {
    categoria: "Auxiliares e Administrativos",
    quantidade: 584,
    formacaoSuperior: 42.1,
    mediaSalarial: 2_200,
  },
];

export const transporteEscolar = [
  { rota: "Rural Norte", veiculos: 4, alunos: 480, kmDia: 186, custo: 84_000 },
  { rota: "Rural Sul", veiculos: 3, alunos: 360, kmDia: 142, custo: 68_000 },
  {
    rota: "Urbano Periferia",
    veiculos: 6,
    alunos: 1_240,
    kmDia: 210,
    custo: 96_000,
  },
  { rota: "Distritos", veiculos: 2, alunos: 280, kmDia: 124, custo: 52_000 },
  {
    rota: "Educação Especial",
    veiculos: 2,
    alunos: 120,
    kmDia: 98,
    custo: 44_000,
  },
];

export const alimentacaoEscolar = [
  {
    programa: "PNAE - Creche",
    refeicoesDia: 3_240,
    custoAluno: 1.07,
    cobertura: 100,
  },
  {
    programa: "PNAE - Pré-escola",
    refeicoesDia: 2_480,
    custoAluno: 0.53,
    cobertura: 100,
  },
  {
    programa: "PNAE - Fundamental",
    refeicoesDia: 11_600,
    custoAluno: 0.36,
    cobertura: 98.4,
  },
  {
    programa: "PNAE - EJA",
    refeicoesDia: 1_420,
    custoAluno: 0.32,
    cobertura: 77.2,
  },
  {
    programa: "Agricultura Familiar (30%)",
    refeicoesDia: 0,
    custoAluno: 0,
    cobertura: 42.8,
  },
];

export const programasEducacionais = [
  {
    programa: "PDDE (Dinheiro Direto)",
    escolas: 42,
    valor: 840_000,
    execucao: 91.4,
  },
  {
    programa: "PNAE (Alimentação)",
    escolas: 42,
    valor: 1_840_000,
    execucao: 96.2,
  },
  {
    programa: "PNATE (Transporte)",
    escolas: 28,
    valor: 1_360_000,
    execucao: 88.5,
  },
  { programa: "Mais Educação", escolas: 18, valor: 640_000, execucao: 82.4 },
  {
    programa: "Brasil Alfabetizado",
    escolas: 8,
    valor: 280_000,
    execucao: 74.2,
  },
  {
    programa: "Educação Conectada",
    escolas: 32,
    valor: 420_000,
    execucao: 68.9,
  },
];

export const desempenhoEscolar = [
  {
    escola: "EMEF Monteiro Lobato",
    ideb: 6.8,
    aprovacao: 97.2,
    evasao: 0.8,
    distorcao: 4.2,
  },
  {
    escola: "EMEF Machado de Assis",
    ideb: 6.4,
    aprovacao: 96.1,
    evasao: 1.2,
    distorcao: 5.8,
  },
  {
    escola: "EMEF Castro Alves",
    ideb: 5.9,
    aprovacao: 94.8,
    evasao: 1.6,
    distorcao: 7.4,
  },
  {
    escola: "EMEF Cecília Meireles",
    ideb: 5.6,
    aprovacao: 93.4,
    evasao: 2.1,
    distorcao: 9.2,
  },
  {
    escola: "EMEF Paulo Freire",
    ideb: 5.2,
    aprovacao: 92.8,
    evasao: 2.4,
    distorcao: 11.6,
  },
  {
    escola: "EMEF Anísio Teixeira",
    ideb: 4.8,
    aprovacao: 91.2,
    evasao: 3.2,
    distorcao: 14.8,
  },
];

// ── Dados do Censo e Matrículas ───────────────────────────────────

export const listaEsperaCreche = [
  {
    faixaEtaria: "0 a 1 ano",
    inscritos: 342,
    vagasDisponiveis: 180,
    deficit: 162,
    tempoMedioEspera: "8 meses",
  },
  {
    faixaEtaria: "1 a 2 anos",
    inscritos: 298,
    vagasDisponiveis: 220,
    deficit: 78,
    tempoMedioEspera: "5 meses",
  },
  {
    faixaEtaria: "2 a 3 anos",
    inscritos: 264,
    vagasDisponiveis: 240,
    deficit: 24,
    tempoMedioEspera: "2 meses",
  },
  {
    faixaEtaria: "3 a 4 anos (pré-escola)",
    inscritos: 186,
    vagasDisponiveis: 210,
    deficit: 0,
    tempoMedioEspera: "—",
  },
];

export const fluxoEscolar = [
  {
    etapa: "1º ao 3º ano (Ciclo Alfab.)",
    matriculas: 3420,
    aprovados: 3318,
    reprovados: 34,
    abandonos: 68,
    aprovacao: 97.0,
    reprovacao: 1.0,
    abandono: 2.0,
  },
  {
    etapa: "4º e 5º ano",
    matriculas: 3060,
    aprovados: 2938,
    reprovados: 92,
    abandonos: 30,
    aprovacao: 96.0,
    reprovacao: 3.0,
    abandono: 1.0,
  },
  {
    etapa: "6º e 7º ano",
    matriculas: 2680,
    aprovados: 2493,
    reprovados: 134,
    abandonos: 53,
    aprovacao: 93.0,
    reprovacao: 5.0,
    abandono: 2.0,
  },
  {
    etapa: "8º e 9º ano",
    matriculas: 2440,
    aprovados: 2220,
    reprovados: 147,
    abandonos: 73,
    aprovacao: 91.0,
    reprovacao: 6.0,
    abandono: 3.0,
  },
  {
    etapa: "EJA - Fundamental",
    matriculas: 1840,
    aprovados: 1527,
    reprovados: 92,
    abandonos: 221,
    aprovacao: 83.0,
    reprovacao: 5.0,
    abandono: 12.0,
  },
];

// ── Dados de Frequência e Busca Ativa ─────────────────────────────

export const frequenciaEscolar = [
  {
    escola: "EMEF Monteiro Lobato",
    totalAlunos: 840,
    frequenciaMedia: 94.2,
    infrequentes: 28,
    criticos: 8,
    ficaiEmitidos: 12,
  },
  {
    escola: "EMEF Machado de Assis",
    totalAlunos: 720,
    frequenciaMedia: 92.8,
    infrequentes: 34,
    criticos: 12,
    ficaiEmitidos: 18,
  },
  {
    escola: "EMEF Castro Alves",
    totalAlunos: 680,
    frequenciaMedia: 91.4,
    infrequentes: 42,
    criticos: 15,
    ficaiEmitidos: 22,
  },
  {
    escola: "EMEF Cecília Meireles",
    totalAlunos: 620,
    frequenciaMedia: 89.6,
    infrequentes: 48,
    criticos: 18,
    ficaiEmitidos: 28,
  },
  {
    escola: "EMEF Paulo Freire",
    totalAlunos: 580,
    frequenciaMedia: 88.2,
    infrequentes: 52,
    criticos: 22,
    ficaiEmitidos: 34,
  },
  {
    escola: "EMEF Anísio Teixeira",
    totalAlunos: 540,
    frequenciaMedia: 86.8,
    infrequentes: 58,
    criticos: 26,
    ficaiEmitidos: 42,
  },
];

export const buscaAtivaEscolar = {
  alunosIdentificados: 284,
  visitasRealizadas: 412,
  alunosRetornaram: 198,
  alunosEmAcompanhamento: 62,
  encaminhamentosConselhoTutelar: 24,
  taxaRetorno: 69.7,
};

export const motivosInfrequencia = [
  {
    motivo: "Vulnerabilidade socioeconômica",
    quantidade: 86,
    percentual: 30.3,
  },
  { motivo: "Trabalho infantil", quantidade: 42, percentual: 14.8 },
  { motivo: "Problemas de saúde", quantidade: 38, percentual: 13.4 },
  { motivo: "Dificuldade de transporte", quantidade: 34, percentual: 12.0 },
  { motivo: "Desinteresse/desmotivação", quantidade: 32, percentual: 11.3 },
  { motivo: "Gravidez na adolescência", quantidade: 18, percentual: 6.3 },
  { motivo: "Mudança de município", quantidade: 22, percentual: 7.7 },
  { motivo: "Outros", quantidade: 12, percentual: 4.2 },
];

// ── Dados do PME, Infraestrutura e Formação ───────────────────────

export const metasPME = [
  {
    meta: 1,
    descricao: "Universalizar Ed. Infantil (4-5 anos)",
    indicador: 96.4,
    metaValor: 100,
    prazo: "2025",
    status: "em andamento",
  },
  {
    meta: 2,
    descricao: "Universalizar Ensino Fundamental (6-14 anos)",
    indicador: 98.2,
    metaValor: 100,
    prazo: "2025",
    status: "em andamento",
  },
  {
    meta: 3,
    descricao: "Atender 50% das crianças de 0-3 anos em creches",
    indicador: 38.4,
    metaValor: 50,
    prazo: "2025",
    status: "atrasado",
  },
  {
    meta: 5,
    descricao: "Alfabetizar todas as crianças até o 3º ano",
    indicador: 78.5,
    metaValor: 100,
    prazo: "2025",
    status: "atrasado",
  },
  {
    meta: 6,
    descricao: "Oferecer educação integral em 50% das escolas",
    indicador: 42.9,
    metaValor: 50,
    prazo: "2025",
    status: "em andamento",
  },
  {
    meta: 7,
    descricao: "Atingir média 6.0 no IDEB (anos iniciais)",
    indicador: 6.2,
    metaValor: 6.0,
    prazo: "2025",
    status: "atingido",
  },
  {
    meta: 8,
    descricao: "Elevar escolaridade média (EJA)",
    indicador: 7.2,
    metaValor: 9.5,
    prazo: "2025",
    status: "atrasado",
  },
  {
    meta: 15,
    descricao: "Garantir pós-graduação para 50% dos professores",
    indicador: 42.0,
    metaValor: 50,
    prazo: "2025",
    status: "em andamento",
  },
  {
    meta: 17,
    descricao: "Valorizar profissionais do magistério (piso)",
    indicador: 100,
    metaValor: 100,
    prazo: "2024",
    status: "atingido",
  },
  {
    meta: 19,
    descricao: "Assegurar plano de carreira para profissionais",
    indicador: 100,
    metaValor: 100,
    prazo: "2024",
    status: "atingido",
  },
];

export const infraestruturaEscolar = [
  {
    item: "Acessibilidade (rampas/banheiros)",
    escolasAdequadas: 28,
    totalEscolas: 42,
    percentual: 66.7,
  },
  {
    item: "Biblioteca/Sala de Leitura",
    escolasAdequadas: 34,
    totalEscolas: 42,
    percentual: 81.0,
  },
  {
    item: "Laboratório de Informática",
    escolasAdequadas: 26,
    totalEscolas: 42,
    percentual: 61.9,
  },
  {
    item: "Internet Banda Larga",
    escolasAdequadas: 32,
    totalEscolas: 42,
    percentual: 76.2,
  },
  {
    item: "Quadra Poliesportiva",
    escolasAdequadas: 22,
    totalEscolas: 42,
    percentual: 52.4,
  },
  {
    item: "Cozinha Adequada (PNAE)",
    escolasAdequadas: 38,
    totalEscolas: 42,
    percentual: 90.5,
  },
  {
    item: "Parque Infantil (CMEIs)",
    escolasAdequadas: 11,
    totalEscolas: 14,
    percentual: 78.6,
  },
  {
    item: "Sala de AEE/Recursos",
    escolasAdequadas: 18,
    totalEscolas: 42,
    percentual: 42.9,
  },
];

export const formacaoContinuada = [
  {
    programa: "PNAIC - Alfabetização",
    profissionais: 180,
    cargaHoraria: 120,
    execucao: 92.4,
    modalidade: "Presencial",
  },
  {
    programa: "Educação Inclusiva/AEE",
    profissionais: 86,
    cargaHoraria: 80,
    execucao: 88.6,
    modalidade: "Híbrido",
  },
  {
    programa: "Tecnologias Educacionais",
    profissionais: 240,
    cargaHoraria: 60,
    execucao: 74.2,
    modalidade: "EaD",
  },
  {
    programa: "BNCC na Prática",
    profissionais: 920,
    cargaHoraria: 40,
    execucao: 96.8,
    modalidade: "Presencial",
  },
  {
    programa: "Gestão Escolar",
    profissionais: 90,
    cargaHoraria: 100,
    execucao: 82.0,
    modalidade: "Híbrido",
  },
  {
    programa: "Educação Socioemocional",
    profissionais: 320,
    cargaHoraria: 30,
    execucao: 68.4,
    modalidade: "EaD",
  },
];

// ── Dados de Análise ───────────────────────────────────────────────

export const EDUCACAO_SNAPSHOT = {
  greenPalette,
  educacaoResumo,
  despesasEducacao,
  chartConfigDespesas,
  receitasEducacao,
  fontesRecursos,
  contasBancarias,
  evolucaoOrcamentaria,
  chartConfigEvolucao,
  detalhamentoDespesa,
  chartReceitasOrigem,
  receitasPorOrigem,
  kpisEducacao,
  escolasPorModalidade,
  matriculasPorAno,
  chartMatriculas,
  profissionaisEducacao,
  transporteEscolar,
  alimentacaoEscolar,
  programasEducacionais,
  desempenhoEscolar,
  listaEsperaCreche,
  fluxoEscolar,
  frequenciaEscolar,
  buscaAtivaEscolar,
  motivosInfrequencia,
  metasPME,
  infraestruturaEscolar,
  formacaoContinuada,
};
