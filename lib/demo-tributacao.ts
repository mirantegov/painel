// Dados demo — Tributação Municipal.
// Snapshot serializável servido de mod_tributacao (jsonb). Sem funções/JSX.
// Os chartConfig* (label/color) e formatadores seguem no componente (apresentação).

// IPTU - Imposto Predial e Territorial Urbano
const dadosIPTU = {
  lancado: 22800000,
  arrecadado: 16800000,
  desconto: 2100000,
  isencoes: 1450000,
  inadimplente: 2450000,
  dividaAtiva: 8900000,
  imoveisTotal: 42580,
  imoveisTributados: 38200,
  imoveisIsentos: 4380,
  aliquotaResidencial: 0.8,
  aliquotaComercial: 1.5,
  aliquotaTerritorial: 3.0,
  parcelasEmitidas: 152800,
  parcelasPagas: 128400,
};

// ISS - Imposto Sobre Serviços
const dadosISS = {
  lancado: 28500000,
  arrecadado: 26500000,
  retidoFonte: 8200000,
  declarado: 18300000,
  fiscalizado: 3800000,
  autoLancamento: 22100000,
  notasFiscaisEmitidas: 285400,
  empresasCadastradas: 4850,
  empresasAtivas: 3920,
  meiCadastrados: 2180,
  aliquotaMedia: 3.5,
};

// ITBI - Imposto sobre Transmissão de Bens Imóveis
const dadosITBI = {
  lancado: 9200000,
  arrecadado: 7200000,
  transacoesAvaliadas: 1840,
  transacoesConcluidas: 1520,
  valorVenalMedio: 285000,
  aliquota: 2.0,
};

// Taxas e Contribuições
const dadosTaxas = {
  taxaLixo: { lancado: 4200000, arrecadado: 3650000 },
  taxaAlvara: { lancado: 1800000, arrecadado: 1580000 },
  taxaVigilancia: { lancado: 980000, arrecadado: 820000 },
  taxaPublicidade: { lancado: 450000, arrecadado: 380000 },
  cosip: { lancado: 4100000, arrecadado: 3850000 },
  contribMelhoria: { lancado: 1400000, arrecadado: 890000 },
};

// Dívida Ativa
const dividaAtiva = {
  estoqueTotal: 48500000,
  iptu: 28200000,
  iss: 12500000,
  itbi: 2800000,
  taxas: 5000000,
  inscricoesAno: 3200000,
  recuperadoAno: 4800000,
  ajuizadas: 18500000,
  protestadas: 8200000,
  parcelamentos: 6800000,
  parcelamentosAtivos: 2450,
  parcelamentosInadimplentes: 380,
  prescricaoRisco: 5200000,
};

// Cadastro Imobiliário
const cadastroImobiliario = [
  {
    tipo: "Residencial",
    quantidade: 28400,
    percentual: 66.7,
    valorVenal: 4200000000,
  },
  {
    tipo: "Comercial",
    quantidade: 6800,
    percentual: 16.0,
    valorVenal: 2100000000,
  },
  {
    tipo: "Industrial",
    quantidade: 1200,
    percentual: 2.8,
    valorVenal: 980000000,
  },
  {
    tipo: "Terrenos",
    quantidade: 4580,
    percentual: 10.8,
    valorVenal: 650000000,
  },
  { tipo: "Outros", quantidade: 1600, percentual: 3.7, valorVenal: 280000000 },
];

// Cadastro Econômico (ISS)
const cadastroEconomico = [
  {
    setor: "Serviços Profissionais",
    empresas: 1280,
    arrecadacao: 8500000,
    percentual: 32.1,
  },
  {
    setor: "Construção Civil",
    empresas: 420,
    arrecadacao: 5200000,
    percentual: 19.6,
  },
  { setor: "Saúde", empresas: 380, arrecadacao: 3800000, percentual: 14.3 },
  { setor: "Educação", empresas: 210, arrecadacao: 2400000, percentual: 9.1 },
  {
    setor: "Tecnologia",
    empresas: 350,
    arrecadacao: 2800000,
    percentual: 10.6,
  },
  { setor: "Transporte", empresas: 180, arrecadacao: 1600000, percentual: 6.0 },
  {
    setor: "Outros Serviços",
    empresas: 1100,
    arrecadacao: 2200000,
    percentual: 8.3,
  },
];

// Evolução Mensal da Arrecadação Tributária
const evolucaoMensalTributos = [
  { mes: "Jan", iptu: 4200000, iss: 2050000, itbi: 580000, taxas: 420000 },
  { mes: "Fev", iptu: 3800000, iss: 2180000, itbi: 620000, taxas: 380000 },
  { mes: "Mar", iptu: 2100000, iss: 2350000, itbi: 710000, taxas: 450000 },
  { mes: "Abr", iptu: 1200000, iss: 2280000, itbi: 650000, taxas: 410000 },
  { mes: "Mai", iptu: 950000, iss: 2420000, itbi: 580000, taxas: 520000 },
  { mes: "Jun", iptu: 780000, iss: 2150000, itbi: 620000, taxas: 480000 },
  { mes: "Jul", iptu: 650000, iss: 2380000, itbi: 540000, taxas: 390000 },
  { mes: "Ago", iptu: 580000, iss: 2520000, itbi: 680000, taxas: 450000 },
  { mes: "Set", iptu: 520000, iss: 2180000, itbi: 590000, taxas: 410000 },
  { mes: "Out", iptu: 480000, iss: 2350000, itbi: 620000, taxas: 520000 },
  { mes: "Nov", iptu: 540000, iss: 2640000, itbi: 710000, taxas: 450000 },
];

// Comparativo Anual
const comparativoAnual = [
  {
    ano: "2022",
    iptu: 14200000,
    iss: 22800000,
    itbi: 6200000,
    taxas: 10500000,
    total: 53700000,
  },
  {
    ano: "2023",
    iptu: 15600000,
    iss: 24500000,
    itbi: 6800000,
    taxas: 11200000,
    total: 58100000,
  },
  {
    ano: "2024",
    iptu: 16800000,
    iss: 26500000,
    itbi: 7200000,
    taxas: 12050000,
    total: 62550000,
  },
];

// Fiscalização Tributária
const fiscalizacao = {
  autosInfracao: 245,
  valorAutuado: 3800000,
  valorRecuperado: 2100000,
  empresasFiscalizadas: 520,
  diligenciasRealizadas: 1280,
  denunciasRecebidas: 85,
  denunciasApuradas: 62,
  operacoesEspeciais: 8,
  issRetidoRecuperado: 1500000,
  notificacoesPrevias: 380,
};

// Certidões e Atendimento
const certidoes = {
  negativas: 12800,
  positivas: 3200,
  positivasEfeitoNegativa: 1850,
  tempoMedioEmissao: 2.5,
  atendimentosPresenciais: 18500,
  atendimentosDigitais: 42800,
  percentualDigital: 69.8,
  reclamacoesRecebidas: 320,
  reclamacoesResolvidas: 285,
};

// Renúncia Fiscal
const renunciaFiscal = {
  total: 8500000,
  isencoesIPTU: 3200000,
  isencoesISS: 1800000,
  incentivosEmpresariais: 2500000,
  imunidades: 1000000,
  beneficiariosIPTU: 4380,
  beneficiariosISS: 280,
  empresasIncentivadas: 45,
};

// Maiores Contribuintes
const maioresContribuintes = [
  {
    nome: "Hospital Regional São José",
    tributo: "ISS",
    valor: 1850000,
    situacao: "Regular" as const,
  },
  {
    nome: "Construtora Alpha Ltda",
    tributo: "ISS/ITBI",
    valor: 1420000,
    situacao: "Regular" as const,
  },
  {
    nome: "Shopping Center Municipal",
    tributo: "IPTU/ISS",
    valor: 1280000,
    situacao: "Regular" as const,
  },
  {
    nome: "Universidade Paranaense",
    tributo: "ISS",
    valor: 980000,
    situacao: "Regular" as const,
  },
  {
    nome: "Supermercado Bom Preço S/A",
    tributo: "ISS/IPTU",
    valor: 850000,
    situacao: "Parcelado" as const,
  },
  {
    nome: "Metalúrgica Progresso",
    tributo: "IPTU/ISS",
    valor: 720000,
    situacao: "Regular" as const,
  },
  {
    nome: "Colégio São Francisco",
    tributo: "ISS",
    valor: 680000,
    situacao: "Imune" as const,
  },
  {
    nome: "Clínica Saúde Total",
    tributo: "ISS",
    valor: 620000,
    situacao: "Regular" as const,
  },
  {
    nome: "TechSoft Sistemas",
    tributo: "ISS",
    valor: 580000,
    situacao: "Regular" as const,
  },
  {
    nome: "Transportadora Sul Ltda",
    tributo: "ISS/IPTU",
    valor: 520000,
    situacao: "Inadimplente" as const,
  },
];

// Comparativo Mensal 2024 vs 2023
const comparativoMensal2024vs2023 = [
  { mes: "Jan", atual: 7250000, anterior: 6420000 },
  { mes: "Fev", atual: 6980000, anterior: 6180000 },
  { mes: "Mar", atual: 5610000, anterior: 5320000 },
  { mes: "Abr", atual: 4540000, anterior: 4280000 },
  { mes: "Mai", atual: 4470000, anterior: 4120000 },
  { mes: "Jun", atual: 4030000, anterior: 3750000 },
  { mes: "Jul", atual: 3960000, anterior: 3680000 },
  { mes: "Ago", atual: 4230000, anterior: 3920000 },
  { mes: "Set", atual: 3700000, anterior: 3480000 },
  { mes: "Out", atual: 3970000, anterior: 3650000 },
  { mes: "Nov", atual: 4340000, anterior: 3980000 },
];

// Comparativo por Tributo — 2024 vs 2023
const comparativoTributo2024vs2023 = [
  { tributo: "IPTU", atual: 16800000, anterior: 15600000 },
  { tributo: "ISS", atual: 26500000, anterior: 24500000 },
  { tributo: "ITBI", atual: 7200000, anterior: 6800000 },
  { tributo: "Taxas", atual: 12050000, anterior: 11200000 },
];

// Maiores Devedores (Dívida Ativa + Exercício)
const maioresDevedores = [
  {
    nome: "Auto Peças Nacional Ltda",
    tributo: "ISS/IPTU",
    valorDevido: 2850000,
    origem: "Dívida Ativa",
    situacao: "Ajuizada" as const,
    tempoInadimplencia: "4 anos",
  },
  {
    nome: "Construtora Beta Engenharia",
    tributo: "ISS/ITBI",
    valorDevido: 2200000,
    origem: "Dívida Ativa",
    situacao: "Protestada" as const,
    tempoInadimplencia: "3 anos",
  },
  {
    nome: "Frigorífico Santa Clara S/A",
    tributo: "ISS/IPTU",
    valorDevido: 1680000,
    origem: "Dívida Ativa",
    situacao: "Ajuizada" as const,
    tempoInadimplencia: "5 anos",
  },
  {
    nome: "Rede de Postos Combustível XYZ",
    tributo: "ISS/IPTU",
    valorDevido: 1450000,
    origem: "Dívida Ativa",
    situacao: "Parcelada" as const,
    tempoInadimplencia: "2 anos",
  },
  {
    nome: "Hotel Fazenda Bela Vista",
    tributo: "IPTU/ISS",
    valorDevido: 1120000,
    origem: "Dívida Ativa",
    situacao: "Protestada" as const,
    tempoInadimplencia: "3 anos",
  },
  {
    nome: "Madeireira Sul Ltda",
    tributo: "ISS",
    valorDevido: 980000,
    origem: "Dívida Ativa",
    situacao: "Inscrita" as const,
    tempoInadimplencia: "2 anos",
  },
  {
    nome: "Transportes Rodoviários PR",
    tributo: "ISS/IPTU",
    valorDevido: 850000,
    origem: "Exercício",
    situacao: "Notificada" as const,
    tempoInadimplencia: "1 ano",
  },
  {
    nome: "Shopping Popular Center",
    tributo: "IPTU",
    valorDevido: 720000,
    origem: "Dívida Ativa",
    situacao: "Parcelada" as const,
    tempoInadimplencia: "4 anos",
  },
  {
    nome: "Cerâmica Progresso Indústria",
    tributo: "IPTU/ISS",
    valorDevido: 650000,
    origem: "Exercício",
    situacao: "Notificada" as const,
    tempoInadimplencia: "1 ano",
  },
  {
    nome: "Clínica Odonto Premium",
    tributo: "ISS",
    valorDevido: 480000,
    origem: "Dívida Ativa",
    situacao: "Inscrita" as const,
    tempoInadimplencia: "2 anos",
  },
];

// Metas de Arrecadação
const metasArrecadacao = [
  { tributo: "IPTU", meta: 22800000, realizado: 16800000, percentual: 73.7 },
  { tributo: "ISS", meta: 28500000, realizado: 26500000, percentual: 93.0 },
  { tributo: "ITBI", meta: 9200000, realizado: 7200000, percentual: 78.3 },
  {
    tributo: "Taxas e Contribuições",
    meta: 12930000,
    realizado: 11170000,
    percentual: 86.4,
  },
  {
    tributo: "Dívida Ativa (Recuperação)",
    meta: 6000000,
    realizado: 4800000,
    percentual: 80.0,
  },
];

// ==========================================
// NOVOS DADOS — NFS-e e Nota Fiscal
// ==========================================

const dadosNFSe = {
  totalEmitidas: 285400,
  totalCanceladas: 3420,
  totalSubstituidas: 1850,
  valorTotalServicos: 756000000,
  issGerado: 26460000,
  mediaNotasDia: 870,
  empresasEmissoras: 3280,
  empresasSemEmissao30dias: 640,
  evolucaoMensal: [
    { mes: "Jan", notas: 24200, valor: 64000000, iss: 2240000 },
    { mes: "Fev", notas: 22800, valor: 60500000, iss: 2118000 },
    { mes: "Mar", notas: 26500, valor: 71200000, iss: 2492000 },
    { mes: "Abr", notas: 25100, valor: 67800000, iss: 2373000 },
    { mes: "Mai", notas: 27300, valor: 73500000, iss: 2573000 },
    { mes: "Jun", notas: 24800, valor: 65200000, iss: 2282000 },
    { mes: "Jul", notas: 26900, valor: 72100000, iss: 2524000 },
    { mes: "Ago", notas: 28100, valor: 74800000, iss: 2618000 },
    { mes: "Set", notas: 25600, valor: 68200000, iss: 2387000 },
    { mes: "Out", notas: 27400, valor: 73800000, iss: 2583000 },
    { mes: "Nov", notas: 26700, valor: 64900000, iss: 2270000 },
  ],
  rankingCNAE: [
    {
      cnae: "6201-5/01",
      descricao: "Desenvolvimento de software",
      notas: 42500,
      valor: 128000000,
      iss: 4480000,
      percentual: 16.9,
    },
    {
      cnae: "4120-4/00",
      descricao: "Construção de edifícios",
      notas: 18200,
      valor: 98000000,
      iss: 3430000,
      percentual: 13.0,
    },
    {
      cnae: "8610-1/01",
      descricao: "Atividades de atendimento hospitalar",
      notas: 15800,
      valor: 85000000,
      iss: 2975000,
      percentual: 11.2,
    },
    {
      cnae: "6911-7/01",
      descricao: "Serviços advocatícios",
      notas: 28400,
      valor: 62000000,
      iss: 2170000,
      percentual: 8.2,
    },
    {
      cnae: "8630-5/03",
      descricao: "Atividade médica ambulatorial",
      notas: 22100,
      valor: 58000000,
      iss: 2030000,
      percentual: 7.7,
    },
    {
      cnae: "7020-4/00",
      descricao: "Consultoria em gestão empresarial",
      notas: 19800,
      valor: 52000000,
      iss: 1820000,
      percentual: 6.9,
    },
    {
      cnae: "4930-2/02",
      descricao: "Transporte rodoviário de carga",
      notas: 12400,
      valor: 45000000,
      iss: 1575000,
      percentual: 6.0,
    },
    {
      cnae: "6190-6/99",
      descricao: "Outras ativ. telecomunicações",
      notas: 8200,
      valor: 38000000,
      iss: 1330000,
      percentual: 5.0,
    },
  ],
  alertasNFSe: [
    {
      tipo: "critico" as const,
      descricao:
        "640 empresas ativas não emitiram NFS-e nos últimos 30 dias — possível omissão de receita",
    },
    {
      tipo: "alerta" as const,
      descricao:
        "3.420 notas canceladas no exercício (1,2% do total) — avaliar padrões de cancelamento",
    },
    {
      tipo: "info" as const,
      descricao:
        "Setor de Tecnologia apresentou crescimento de 18,5% no volume de NFS-e em relação ao exercício anterior",
    },
  ],
};

// ==========================================
// NOVOS DADOS — Transferências Constitucionais
// ==========================================

const transferenciasConstitucionais = {
  fpm: {
    previsto: 42000000,
    recebido: 38500000,
    percentual: 91.7,
    evolucaoMensal: [
      { mes: "Jan", valor: 3200000 },
      { mes: "Fev", valor: 3100000 },
      { mes: "Mar", valor: 3800000 },
      { mes: "Abr", valor: 3400000 },
      { mes: "Mai", valor: 3600000 },
      { mes: "Jun", valor: 3200000 },
      { mes: "Jul", valor: 3500000 },
      { mes: "Ago", valor: 3800000 },
      { mes: "Set", valor: 3400000 },
      { mes: "Out", valor: 3700000 },
      { mes: "Nov", valor: 3300000 },
    ],
  },
  icms: {
    previsto: 28000000,
    recebido: 25200000,
    percentual: 90.0,
    indicePM: 0.4285,
    rankingEstadual: 42,
    totalMunicipios: 399,
  },
  ipva: {
    previsto: 12000000,
    recebido: 10800000,
    percentual: 90.0,
    veiculosMunicipio: 48500,
  },
  fundeb: {
    recebido: 18500000,
    complementacaoUniao: 4200000,
    alunosRede: 12800,
    valorAlunoAno: 1445.31,
  },
  itr: {
    previsto: 850000,
    recebido: 720000,
    percentual: 84.7,
    conveniado: true,
    percentualRetencao: 100,
  },
  totalPrevisto: 82850000,
  totalRecebido: 75220000,
  comparativoAnual: [
    {
      ano: "2022",
      fpm: 35800000,
      icms: 22400000,
      ipva: 9800000,
      fundeb: 15200000,
      itr: 620000,
      total: 83820000,
    },
    {
      ano: "2023",
      fpm: 38200000,
      icms: 23800000,
      ipva: 10200000,
      fundeb: 16800000,
      itr: 680000,
      total: 89680000,
    },
    {
      ano: "2024",
      fpm: 38500000,
      icms: 25200000,
      ipva: 10800000,
      fundeb: 18500000,
      itr: 720000,
      total: 93720000,
    },
  ],
};

// ==========================================
// NOVOS DADOS — Processos Administrativos Fiscais (PAF)
// ==========================================

const processosAdmFiscais = {
  totalProcessos: 845,
  emTramitacao: 320,
  julgados: 425,
  arquivados: 100,
  valorDiscutido: 12800000,
  valorJulgadoProcedente: 8200000,
  valorJulgadoImprocedente: 3100000,
  valorPendente: 5600000,
  tempoMedioJulgamento: 145,
  impugnacoes: {
    recebidas: 285,
    deferidas: 68,
    indeferidas: 142,
    parcialmenteDeferidas: 45,
    pendentes: 30,
  },
  recursos: {
    interpostos: 180,
    providos: 32,
    improvidos: 98,
    parcialmenteProvidos: 25,
    pendentes: 25,
  },
  porTributo: [
    { tributo: "IPTU", processos: 280, valor: 4200000, percentual: 33.1 },
    { tributo: "ISS", processos: 320, valor: 5800000, percentual: 37.9 },
    { tributo: "ITBI", processos: 85, valor: 1200000, percentual: 10.1 },
    { tributo: "Taxas", processos: 120, valor: 980000, percentual: 14.2 },
    { tributo: "Dívida Ativa", processos: 40, valor: 620000, percentual: 4.7 },
  ],
  prazosVencendo: [
    {
      processo: "PAF 2024/0342",
      contribuinte: "Construtora Beta Engenharia",
      tributo: "ISS",
      valor: 380000,
      prazo: "15/01/2025",
      tipo: "Impugnação",
    },
    {
      processo: "PAF 2024/0285",
      contribuinte: "Rede de Postos XYZ",
      tributo: "IPTU/ISS",
      valor: 520000,
      prazo: "22/01/2025",
      tipo: "Recurso",
    },
    {
      processo: "PAF 2024/0198",
      contribuinte: "Hotel Fazenda Bela Vista",
      tributo: "IPTU",
      valor: 280000,
      prazo: "05/02/2025",
      tipo: "Impugnação",
    },
    {
      processo: "PAF 2024/0421",
      contribuinte: "Cerâmica Progresso Ind.",
      tributo: "ISS",
      valor: 195000,
      prazo: "12/02/2025",
      tipo: "Recurso",
    },
    {
      processo: "PAF 2024/0389",
      contribuinte: "TechSoft Sistemas",
      tributo: "ISS",
      valor: 145000,
      prazo: "28/02/2025",
      tipo: "Impugnação",
    },
  ],
};

export const TRIBUTACAO_SNAPSHOT = {
  dadosIPTU,
  dadosISS,
  dadosITBI,
  dadosTaxas,
  dividaAtiva,
  cadastroImobiliario,
  cadastroEconomico,
  evolucaoMensalTributos,
  comparativoAnual,
  fiscalizacao,
  certidoes,
  renunciaFiscal,
  maioresContribuintes,
  comparativoMensal2024vs2023,
  comparativoTributo2024vs2023,
  maioresDevedores,
  metasArrecadacao,
  dadosNFSe,
  transferenciasConstitucionais,
  processosAdmFiscais,
};
