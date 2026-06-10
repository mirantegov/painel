// Dados demo — Recursos Humanos (RH).
// Snapshot serializável servido de mod_rh (jsonb). Sem funções/JSX.
// chartConfig e os formatadores (formatCurrency/formatMillions/calcPercent)
// seguem no componente (apresentação).

const dadosSecretarias = [
  {
    codigo: "SEMED",
    nome: "Secretaria de Educação",
    funcionarios: 298,
    salarioTotal: 2850000,
    horasExtras: 185000,
    absenteismo: 4.2,
    turnover: 6.8,
    vagas: 12,
    cor: "#3b82f6",
  },
  {
    codigo: "SEMSA",
    nome: "Secretaria de Saúde",
    funcionarios: 195,
    salarioTotal: 2340000,
    horasExtras: 320000,
    absenteismo: 7.8,
    turnover: 12.5,
    vagas: 28,
    cor: "#ef4444",
  },
  {
    codigo: "SEMINF",
    nome: "Secretaria de Infraestrutura",
    funcionarios: 142,
    salarioTotal: 1120000,
    horasExtras: 95000,
    absenteismo: 3.5,
    turnover: 8.2,
    vagas: 8,
    cor: "#22c55e",
  },
  {
    codigo: "SEMAD",
    nome: "Secretaria de Administração",
    funcionarios: 125,
    salarioTotal: 980000,
    horasExtras: 45000,
    absenteismo: 2.8,
    turnover: 4.5,
    vagas: 5,
    cor: "#f59e0b",
  },
  {
    codigo: "SEMFAZ",
    nome: "Secretaria de Fazenda",
    funcionarios: 78,
    salarioTotal: 720000,
    horasExtras: 28000,
    absenteismo: 2.1,
    turnover: 3.2,
    vagas: 3,
    cor: "#8b5cf6",
  },
  {
    codigo: "SEMTUR",
    nome: "Secretaria de Turismo",
    funcionarios: 45,
    salarioTotal: 380000,
    horasExtras: 15000,
    absenteismo: 3.0,
    turnover: 5.5,
    vagas: 2,
    cor: "#ec4899",
  },
  {
    codigo: "GAB",
    nome: "Gabinete do Prefeito",
    funcionarios: 62,
    salarioTotal: 580000,
    horasExtras: 22000,
    absenteismo: 1.8,
    turnover: 2.5,
    vagas: 1,
    cor: "#06b6d4",
  },
  {
    codigo: "PROCUR",
    nome: "Procuradoria Municipal",
    funcionarios: 28,
    salarioTotal: 340000,
    horasExtras: 12000,
    absenteismo: 1.5,
    turnover: 1.8,
    vagas: 1,
    cor: "#84cc16",
  },
  {
    codigo: "CONTROL",
    nome: "Controladoria",
    funcionarios: 35,
    salarioTotal: 310000,
    horasExtras: 10000,
    absenteismo: 1.9,
    turnover: 2.0,
    vagas: 1,
    cor: "#f97316",
  },
  {
    codigo: "OUTROS",
    nome: "Outros Órgãos",
    funcionarios: 122,
    salarioTotal: 890000,
    horasExtras: 35000,
    absenteismo: 3.2,
    turnover: 5.0,
    vagas: 4,
    cor: "#64748b",
  },
];

// Dados de folha de pagamento
const dadosFolha = {
  totalFuncionarios: 1130,
  salarioBase: 9500000,
  horasExtras: 767000,
  adicionais: 285000,
  beneficios: 450000,
  descontos: 1420000,
  salarioLiquido: 8582000,
  inss: 950000,
  irrf: 320000,
  outrosDescontos: 150000,
};

// Evolução mensal da folha
const evolucaoFolha = [
  { mes: "Jan", salario: 9200000, extras: 680000, beneficios: 420000 },
  { mes: "Fev", salario: 9250000, extras: 720000, beneficios: 425000 },
  { mes: "Mar", salario: 9300000, extras: 750000, beneficios: 430000 },
  { mes: "Abr", salario: 9350000, extras: 690000, beneficios: 435000 },
  { mes: "Mai", salario: 9400000, extras: 710000, beneficios: 440000 },
  { mes: "Jun", salario: 9450000, extras: 730000, beneficios: 445000 },
  { mes: "Jul", salario: 9500000, extras: 780000, beneficios: 450000 },
  { mes: "Ago", salario: 9550000, extras: 760000, beneficios: 455000 },
  { mes: "Set", salario: 9600000, extras: 740000, beneficios: 460000 },
  { mes: "Out", salario: 9650000, extras: 720000, beneficios: 465000 },
  { mes: "Nov", salario: 9700000, extras: 767000, beneficios: 470000 },
];

// Absenteísmo mensal
const absenteismoMensal = [
  { mes: "Jan", taxa: 3.8, faltas: 156 },
  { mes: "Fev", taxa: 4.1, faltas: 168 },
  { mes: "Mar", taxa: 4.5, faltas: 185 },
  { mes: "Abr", taxa: 3.9, faltas: 160 },
  { mes: "Mai", taxa: 4.2, faltas: 172 },
  { mes: "Jun", taxa: 4.8, faltas: 197 },
  { mes: "Jul", taxa: 5.2, faltas: 213 },
  { mes: "Ago", taxa: 4.6, faltas: 189 },
  { mes: "Set", taxa: 4.0, faltas: 164 },
  { mes: "Out", taxa: 3.7, faltas: 152 },
  { mes: "Nov", taxa: 4.3, faltas: 176 },
];

// Turnover mensal
const turnoverMensal = [
  { mes: "Jan", admissoes: 8, demissoes: 5, saldo: 3 },
  { mes: "Fev", admissoes: 12, demissoes: 7, saldo: 5 },
  { mes: "Mar", admissoes: 15, demissoes: 10, saldo: 5 },
  { mes: "Abr", admissoes: 6, demissoes: 8, saldo: -2 },
  { mes: "Mai", admissoes: 10, demissoes: 6, saldo: 4 },
  { mes: "Jun", admissoes: 18, demissoes: 12, saldo: 6 },
  { mes: "Jul", admissoes: 22, demissoes: 15, saldo: 7 },
  { mes: "Ago", admissoes: 14, demissoes: 9, saldo: 5 },
  { mes: "Set", admissoes: 8, demissoes: 11, saldo: -3 },
  { mes: "Out", admissoes: 11, demissoes: 7, saldo: 4 },
  { mes: "Nov", admissoes: 9, demissoes: 6, saldo: 3 },
];

// Distribuição por cargo/função
const distribuicaoCargo = [
  { cargo: "Professores", quantidade: 245, percentual: 21.7 },
  { cargo: "Agentes de Saúde", quantidade: 98, percentual: 8.7 },
  { cargo: "Médicos", quantidade: 42, percentual: 3.7 },
  { cargo: "Enfermeiros", quantidade: 35, percentual: 3.1 },
  { cargo: "Motoristas", quantidade: 85, percentual: 7.5 },
  { cargo: "Auxiliares Administrativos", quantidade: 180, percentual: 15.9 },
  { cargo: "Técnicos", quantidade: 120, percentual: 10.6 },
  { cargo: "Engenheiros", quantidade: 18, percentual: 1.6 },
  { cargo: "Advogados", quantidade: 22, percentual: 1.9 },
  { cargo: "Contadores", quantidade: 15, percentual: 1.3 },
  { cargo: "Outros", quantidade: 270, percentual: 23.9 },
];

// Verbas e proventos detalhados
const verbasProventos = [
  {
    codigo: "101",
    descricao: "Salário Base",
    valor: 9500000,
    tipo: "provento",
  },
  {
    codigo: "121",
    descricao: "Horas Extras 50%",
    valor: 420000,
    tipo: "provento",
  },
  {
    codigo: "122",
    descricao: "Horas Extras 100%",
    valor: 347000,
    tipo: "provento",
  },
  {
    codigo: "131",
    descricao: "Adicional Noturno",
    valor: 85000,
    tipo: "provento",
  },
  {
    codigo: "141",
    descricao: "Insalubridade",
    valor: 125000,
    tipo: "provento",
  },
  {
    codigo: "142",
    descricao: "Periculosidade",
    valor: 45000,
    tipo: "provento",
  },
  {
    codigo: "151",
    descricao: "Vale Alimentação",
    valor: 280000,
    tipo: "provento",
  },
  {
    codigo: "152",
    descricao: "Vale Transporte",
    valor: 170000,
    tipo: "provento",
  },
  {
    codigo: "401",
    descricao: "INSS Previdenciário",
    valor: 950000,
    tipo: "desconto",
  },
  { codigo: "402", descricao: "IRRF", valor: 320000, tipo: "desconto" },
  {
    codigo: "403",
    descricao: "Contribuição Sindical",
    valor: 45000,
    tipo: "desconto",
  },
  {
    codigo: "404",
    descricao: "Pensão Alimentícia",
    valor: 85000,
    tipo: "desconto",
  },
  {
    codigo: "405",
    descricao: "Plano de Saúde",
    valor: 20000,
    tipo: "desconto",
  },
];

// Metas e indicadores de RH
const metasRH = [
  {
    indicador: "Taxa de Absenteísmo",
    meta: 4.0,
    realizado: 4.3,
    unidade: "%",
    status: "atencao",
    descricao: "Meta mensal de absenteísmo",
  },
  {
    indicador: "Turnover Anual",
    meta: 10,
    realizado: 8.5,
    unidade: "%",
    status: "atingido",
    descricao: "Rotatividade de pessoal",
  },
  {
    indicador: "Horas Extras",
    meta: 600000,
    realizado: 767000,
    unidade: "R$",
    status: "atencao",
    descricao: "Limite mensal de HE",
  },
  {
    indicador: "Vagas Preenchidas",
    meta: 85,
    realizado: 92,
    unidade: "%",
    status: "atingido",
    descricao: "Taxa de preenchimento",
  },
  {
    indicador: "Treinamentos",
    meta: 40,
    realizado: 38,
    unidade: "h/ano",
    status: "atencao",
    descricao: "Carga horária de capacitação",
  },
  {
    indicador: "Avaliação de Desempenho",
    meta: 100,
    realizado: 87,
    unidade: "%",
    status: "atencao",
    descricao: "Funcionários avaliados",
  },
];

// Dados de People Analytics
const peopleAnalytics = {
  // Distribuição por sexo
  sexo: [
    { sexo: "Feminino", quantidade: 612, percentual: 54.2 },
    { sexo: "Masculino", quantidade: 518, percentual: 45.8 },
  ],
  // Distribuição por raça/cor
  racaCor: [
    { raca: "Parda", quantidade: 485, percentual: 42.9 },
    { raca: "Branca", quantidade: 398, percentual: 35.2 },
    { raca: "Preta", quantidade: 175, percentual: 15.5 },
    { raca: "Indígena", quantidade: 42, percentual: 3.7 },
    { raca: "Amarela", quantidade: 18, percentual: 1.6 },
    { raca: "Não declarada", quantidade: 12, percentual: 1.1 },
  ],
  // Faixa etária
  faixaEtaria: [
    { faixa: "18-25 anos", quantidade: 85, percentual: 7.5 },
    { faixa: "26-35 anos", quantidade: 285, percentual: 25.2 },
    { faixa: "36-45 anos", quantidade: 342, percentual: 30.3 },
    { faixa: "46-55 anos", quantidade: 298, percentual: 26.4 },
    { faixa: "56-65 anos", quantidade: 98, percentual: 8.7 },
    { faixa: "Acima 65", quantidade: 22, percentual: 1.9 },
  ],
  // Escolaridade
  escolaridade: [
    { nivel: "Ensino Fundamental", quantidade: 125, percentual: 11.1 },
    { nivel: "Ensino Médio", quantidade: 385, percentual: 34.1 },
    { nivel: "Técnico", quantidade: 198, percentual: 17.5 },
    { nivel: "Superior Incompleto", quantidade: 82, percentual: 7.3 },
    { nivel: "Superior Completo", quantidade: 285, percentual: 25.2 },
    { nivel: "Pós-Graduação", quantidade: 45, percentual: 4.0 },
    { nivel: "Mestrado/Doutorado", quantidade: 10, percentual: 0.9 },
  ],
  // Tempo de serviço
  tempoServico: [
    { faixa: "0-2 anos", quantidade: 185, percentual: 16.4 },
    { faixa: "3-5 anos", quantidade: 198, percentual: 17.5 },
    { faixa: "6-10 anos", quantidade: 265, percentual: 23.5 },
    { faixa: "11-15 anos", quantidade: 215, percentual: 19.0 },
    { faixa: "16-20 anos", quantidade: 152, percentual: 13.5 },
    { faixa: "Mais 20 anos", quantidade: 115, percentual: 10.2 },
  ],
  // Distribuição por tipo de vínculo
  tipoVinculo: [
    { tipo: "Concursado Efetivo", quantidade: 685, percentual: 60.6 },
    { tipo: "Concursado Estável", quantidade: 198, percentual: 17.5 },
    { tipo: "Comissionado", quantidade: 145, percentual: 12.8 },
    { tipo: "Temporário", quantidade: 72, percentual: 6.4 },
    { tipo: "Estagiário", quantidade: 30, percentual: 2.7 },
  ],
  // PCD
  pcd: [
    { tipo: "Com Deficiência", quantidade: 45, percentual: 4.0 },
    { tipo: "Sem Deficiência", quantidade: 1085, percentual: 96.0 },
  ],
};

// Timeline de eventos de RH
const eventosRH = [
  {
    data: "28/11/2024",
    evento: "Concurso Público - Resultado Final",
    tipo: "concurso",
    detalhe: "98 aprovados",
  },
  {
    data: "25/11/2024",
    evento: "Capacitação em Atendimento ao Público",
    tipo: "treinamento",
    detalhe: "45 participantes",
  },
  {
    data: "22/11/2024",
    evento: "Admissões do Mês",
    tipo: "admissao",
    detalhe: "9 novos servidores",
  },
  {
    data: "20/11/2024",
    evento: "Avaliação de Desempenho - 3º Trimestre",
    tipo: "avaliacao",
    detalhe: "87% concluída",
  },
  {
    data: "18/11/2024",
    evento: "Homologação de Férias",
    tipo: "ferias",
    detalhe: "125 servidores",
  },
];

// Limite de Pessoal (LRF)
const limitePessoalLRF = {
  receitaCorrenteLiquida: 180000000,
  limiteMaximo: 97200000, // 54% da RCL
  limiteAlerta: 87480000, // 48.6% da RCL (90% do limite)
  limitePrudencial: 92340000, // 51.3% da RCL (95% do limite)
  despesaPessoal: 82800000, // 46% da RCL
  percentualAtual: 46.0,
  evolucaoTrimestral: [
    { trimestre: "1T 2023", percentual: 44.2, valor: 79560000 },
    { trimestre: "2T 2023", percentual: 44.8, valor: 80640000 },
    { trimestre: "3T 2023", percentual: 45.1, valor: 81180000 },
    { trimestre: "4T 2023", percentual: 45.5, valor: 81900000 },
    { trimestre: "1T 2024", percentual: 45.3, valor: 81540000 },
    { trimestre: "2T 2024", percentual: 45.8, valor: 82440000 },
    { trimestre: "3T 2024", percentual: 46.0, valor: 82800000 },
  ],
};

// Custo por Funcionário por Secretaria
const custoPorFuncionario = dadosSecretarias
  .map((s) => ({
    secretaria: s.codigo,
    nome: s.nome,
    funcionarios: s.funcionarios,
    custoTotal: s.salarioTotal + s.horasExtras,
    custoMedio: Math.round((s.salarioTotal + s.horasExtras) / s.funcionarios),
    custoHE: Math.round(s.horasExtras / s.funcionarios),
    percentualHE: (
      (s.horasExtras / (s.salarioTotal + s.horasExtras)) *
      100
    ).toFixed(1),
  }))
  .sort((a, b) => b.custoMedio - a.custoMedio);

// Projeção de Aposentadorias
const projecaoAposentadorias = [
  {
    ano: "2025",
    quantidade: 28,
    impactoFolha: 2100000,
    cargos: "Professores (12), Administrativos (8), Técnicos (8)",
  },
  {
    ano: "2026",
    quantidade: 35,
    impactoFolha: 2650000,
    cargos: "Professores (15), Saúde (10), Motoristas (10)",
  },
  {
    ano: "2027",
    quantidade: 42,
    impactoFolha: 3200000,
    cargos: "Professores (18), Administrativos (12), Técnicos (12)",
  },
  {
    ano: "2028",
    quantidade: 38,
    impactoFolha: 2900000,
    cargos: "Saúde (16), Professores (12), Engenheiros (10)",
  },
  {
    ano: "2029",
    quantidade: 45,
    impactoFolha: 3500000,
    cargos: "Professores (20), Administrativos (15), Saúde (10)",
  },
];
const totalAposentadorias5Anos = projecaoAposentadorias.reduce(
  (a, b) => a + b.quantidade,
  0,
);
const percentualQuadro = ((totalAposentadorias5Anos / 1130) * 100).toFixed(1);

// Benchmark de RH Municipal
const benchmarkRH = [
  {
    municipio: "Município Atual",
    custoMedio: 9513,
    absenteismo: 4.3,
    turnover: 8.5,
    hePercent: 7.3,
    capacitacao: 38,
    destaque: true,
  },
  {
    municipio: "Município A (Similar)",
    custoMedio: 10200,
    absenteismo: 5.1,
    turnover: 12.0,
    hePercent: 9.8,
    capacitacao: 32,
    destaque: false,
  },
  {
    municipio: "Município B (Similar)",
    custoMedio: 9800,
    absenteismo: 3.8,
    turnover: 7.2,
    hePercent: 6.5,
    capacitacao: 45,
    destaque: false,
  },
  {
    municipio: "Município C (Similar)",
    custoMedio: 11500,
    absenteismo: 6.2,
    turnover: 15.0,
    hePercent: 12.1,
    capacitacao: 28,
    destaque: false,
  },
  {
    municipio: "Média Regional",
    custoMedio: 10250,
    absenteismo: 4.8,
    turnover: 10.7,
    hePercent: 8.9,
    capacitacao: 35,
    destaque: false,
  },
];

// Capacitação e Desenvolvimento
const capacitacaoDesenvolvimento = [
  {
    programa: "Atendimento ao Público",
    horas: 320,
    participantes: 180,
    investimento: 48000,
    conclusao: 92,
  },
  {
    programa: "Gestão de Processos",
    horas: 240,
    participantes: 85,
    investimento: 65000,
    conclusao: 88,
  },
  {
    programa: "Tecnologia da Informação",
    horas: 160,
    participantes: 120,
    investimento: 42000,
    conclusao: 95,
  },
  {
    programa: "Liderança e Gestão",
    horas: 200,
    participantes: 45,
    investimento: 85000,
    conclusao: 82,
  },
  {
    programa: "Saúde e Segurança",
    horas: 280,
    participantes: 195,
    investimento: 35000,
    conclusao: 97,
  },
  {
    programa: "Legislação Municipal",
    horas: 120,
    participantes: 68,
    investimento: 28000,
    conclusao: 90,
  },
];
const totalHorasCapacitacao = capacitacaoDesenvolvimento.reduce(
  (a, b) => a + b.horas,
  0,
);
const totalInvestimentoCapacitacao = capacitacaoDesenvolvimento.reduce(
  (a, b) => a + b.investimento,
  0,
);
const totalParticipantes = capacitacaoDesenvolvimento.reduce(
  (a, b) => a + b.participantes,
  0,
);

export const RH_SNAPSHOT = {
  dadosSecretarias,
  dadosFolha,
  evolucaoFolha,
  absenteismoMensal,
  turnoverMensal,
  distribuicaoCargo,
  verbasProventos,
  metasRH,
  peopleAnalytics,
  eventosRH,
  limitePessoalLRF,
  custoPorFuncionario,
  projecaoAposentadorias,
  totalAposentadorias5Anos,
  percentualQuadro,
  benchmarkRH,
  capacitacaoDesenvolvimento,
  totalHorasCapacitacao,
  totalInvestimentoCapacitacao,
  totalParticipantes,
};
