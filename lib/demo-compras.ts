// Dados demo — Compras / Licitações e Contratos.
// Snapshot serializável servido de mod_compras (jsonb). Sem funções/JSX.
// chartConfig*, COLORS, kpiData (tem ícones) e formatadores seguem no componente.

const monthlyData = [
  {
    month: "Jan",
    licitacoes: 12,
    contratos: 8,
    valor: 2800000,
    economia: 120000,
  },
  {
    month: "Fev",
    licitacoes: 15,
    contratos: 12,
    valor: 3200000,
    economia: 180000,
  },
  {
    month: "Mar",
    licitacoes: 18,
    contratos: 14,
    valor: 4100000,
    economia: 220000,
  },
  {
    month: "Abr",
    licitacoes: 14,
    contratos: 10,
    valor: 3500000,
    economia: 150000,
  },
  {
    month: "Mai",
    licitacoes: 22,
    contratos: 16,
    valor: 5200000,
    economia: 380000,
  },
  {
    month: "Jun",
    licitacoes: 25,
    contratos: 18,
    valor: 5800000,
    economia: 420000,
  },
];

const secretariaData = [
  { name: "Saúde", contratos: 342, valor: 15600000, percent: 28 },
  { name: "Educação", contratos: 287, valor: 12300000, percent: 22 },
  { name: "Obras", contratos: 198, valor: 8900000, percent: 16 },
  { name: "Segurança", contratos: 156, valor: 6700000, percent: 12 },
  { name: "Transporte", contratos: 134, valor: 5400000, percent: 10 },
  { name: "Outros", contratos: 130, valor: 6300000, percent: 12 },
];

const modalidadeData = [
  { name: "Pregão Eletrônico", value: 45, color: "#0088FE" },
  { name: "Tomada de Preços", value: 25, color: "#00C49F" },
  { name: "Concorrência", value: 20, color: "#FFBB28" },
  { name: "Dispensa", value: 7, color: "#FF8042" },
  { name: "Inexigibilidade", value: 3, color: "#8884D8" },
];

const recentContracts = [
  {
    id: "CONT-2024-0147",
    secretaria: "Saúde",
    fornecedor: "MedEquipamentos S.A.",
    objeto: "Aparelhos de UTI",
    valor: 2450000,
    status: "ativo",
    dataInicio: "2024-01-15",
    dataFim: "2024-12-31",
    progress: 75,
  },
  {
    id: "CONT-2024-0146",
    secretaria: "Educação",
    fornecedor: "EduTech Ltda.",
    objeto: "Computadores para escolas",
    valor: 890000,
    status: "ativo",
    dataInicio: "2024-02-01",
    dataFim: "2024-11-30",
    progress: 60,
  },
  {
    id: "CONT-2024-0145",
    secretaria: "Obras",
    fornecedor: "ConstruCity S.A.",
    objeto: "Reforma de praças",
    valor: 3200000,
    status: "em-andamento",
    dataInicio: "2024-03-10",
    dataFim: "2024-10-15",
    progress: 45,
  },
  {
    id: "CONT-2024-0144",
    secretaria: "Transporte",
    fornecedor: "BusTransporte",
    objeto: "Manutenção de frota",
    valor: 1560000,
    status: "ativo",
    dataInicio: "2024-01-20",
    dataFim: "2024-12-20",
    progress: 80,
  },
];

const ongoingBids = [
  {
    id: "LIC-2024-0089",
    modalidade: "Pregão Eletrônico",
    objeto: "Material de escritório",
    valorEstimado: 450000,
    status: "aberto",
    dataAbertura: "2024-06-15",
    prazo: "15 dias",
    participantes: 12,
  },
  {
    id: "LIC-2024-0088",
    modalidade: "Concorrência",
    objeto: "Serviços de TI",
    valorEstimado: 2800000,
    status: "em-analise",
    dataAbertura: "2024-06-10",
    prazo: "30 dias",
    participantes: 8,
  },
  {
    id: "LIC-2024-0087",
    modalidade: "Tomada de Preços",
    objeto: "Equipamentos de segurança",
    valorEstimado: 1200000,
    status: "aberto",
    dataAbertura: "2024-06-12",
    prazo: "20 dias",
    participantes: 15,
  },
];

// Dados para Resumo Analítico e Análise Inteligente
const totaisCompras = {
  contratosAtivos: 1247,
  valorContratado: 45200000,
  valorEstimado: 49000000,
  economiaTotal: 3800000,
  licitacoesAndamento: 38,
  licitacoesConcluidas: 156,
  taxaEconomia: 8.4,
  contratosVencendo30Dias: 45,
  contratosVencidos: 12,
};

// Top fornecedores
const topFornecedores = [
  {
    nome: "MedEquipamentos S.A.",
    cnpj: "12.345.678/0001-90",
    valor: 4250000,
    contratos: 15,
    percentual: 9.4,
  },
  {
    nome: "ConstruCity S.A.",
    cnpj: "23.456.789/0001-01",
    valor: 3890000,
    contratos: 8,
    percentual: 8.6,
  },
  {
    nome: "EduTech Ltda.",
    cnpj: "34.567.890/0001-12",
    valor: 3120000,
    contratos: 22,
    percentual: 6.9,
  },
  {
    nome: "BusTransporte",
    cnpj: "45.678.901/0001-23",
    valor: 2780000,
    contratos: 5,
    percentual: 6.2,
  },
  {
    nome: "TecnoGov Ltda.",
    cnpj: "56.789.012/0001-34",
    valor: 2340000,
    contratos: 12,
    percentual: 5.2,
  },
];

// Timeline de eventos
const eventosCompras = [
  {
    data: "15/06/2024",
    evento: "Homologação do Pregão 089 - Material de escritório",
    tipo: "homologacao",
    valor: 450000,
  },
  {
    data: "12/06/2024",
    evento: "Assinatura do Contrato CONT-2024-0147 - Equipamentos UTI",
    tipo: "contrato",
    valor: 2450000,
  },
  {
    data: "10/06/2024",
    evento: "Abertura da Concorrência 088 - Serviços de TI",
    tipo: "licitacao",
    valor: 2800000,
  },
  {
    data: "08/06/2024",
    evento: "Encerramento do Contrato CONT-2023-0098",
    tipo: "encerramento",
    valor: 0,
  },
  {
    data: "05/06/2024",
    evento: "Aditivo contratual - Manutenção de frota (+R$ 320K)",
    tipo: "aditivo",
    valor: 320000,
  },
];

// Comparativo anual
const comparativoAnual = [
  {
    ano: "2020",
    contratos: 892,
    valor: 32500000,
    economia: 1850000,
    taxaEconomia: 5.7,
  },
  {
    ano: "2021",
    contratos: 1024,
    valor: 36800000,
    economia: 2100000,
    taxaEconomia: 5.7,
  },
  {
    ano: "2022",
    contratos: 1156,
    valor: 40200000,
    economia: 2650000,
    taxaEconomia: 6.6,
  },
  {
    ano: "2023",
    contratos: 1289,
    valor: 43800000,
    economia: 3200000,
    taxaEconomia: 7.3,
  },
  {
    ano: "2024",
    contratos: 1247,
    valor: 45200000,
    economia: 3800000,
    taxaEconomia: 8.4,
  },
];

// Metas de compras
const metasCompras = [
  {
    meta: "Economia em Licitações",
    previsto: 5,
    realizado: 8.4,
    unidade: "%",
    status: "atingido",
  },
  {
    meta: "Prazo Médio de Contratação",
    previsto: 45,
    realizado: 38,
    unidade: "dias",
    status: "atingido",
  },
  {
    meta: "Participação MPE",
    previsto: 25,
    realizado: 22,
    unidade: "%",
    status: "atencao",
  },
  {
    meta: "Contratos com Aditivos",
    previsto: 15,
    realizado: 12,
    unidade: "%",
    status: "atingido",
  },
];

// Prazo Medio por Etapa de Contratacao
const prazoMedioPorEtapa = [
  { etapa: "Publicação Edital", prazoMedio: 5, meta: 7, status: "atingido" },
  {
    etapa: "Recebimento Propostas",
    prazoMedio: 15,
    meta: 15,
    status: "atingido",
  },
  {
    etapa: "Análise e Julgamento",
    prazoMedio: 8,
    meta: 10,
    status: "atingido",
  },
  { etapa: "Recursos", prazoMedio: 5, meta: 5, status: "atingido" },
  { etapa: "Homologação", prazoMedio: 3, meta: 3, status: "atingido" },
  { etapa: "Assinatura Contrato", prazoMedio: 2, meta: 5, status: "atingido" },
];
const prazoTotalMedio = prazoMedioPorEtapa.reduce(
  (a, b) => a + b.prazoMedio,
  0,
);
const prazoTotalMeta = prazoMedioPorEtapa.reduce((a, b) => a + b.meta, 0);

// Aditivos Contratuais
const aditivosContratuais = [
  { tipo: "Prazo", quantidade: 45, valor: 0, percentual: 30 },
  {
    tipo: "Valor (Acrescimo)",
    quantidade: 28,
    valor: 3200000,
    percentual: 18.7,
  },
  { tipo: "Valor (Supressao)", quantidade: 12, valor: -850000, percentual: 8 },
  { tipo: "Objeto", quantidade: 8, valor: 1200000, percentual: 5.3 },
  { tipo: "Prazo + Valor", quantidade: 57, valor: 4800000, percentual: 38 },
];
const totalAditivos = aditivosContratuais.reduce((a, b) => a + b.quantidade, 0);
const percentualContratosComAditivo =
  (totalAditivos / totaisCompras.contratosAtivos) * 100;
const valorTotalAditivos = aditivosContratuais.reduce((a, b) => a + b.valor, 0);

// Participacao de MPEs (Micro e Pequenas Empresas)
const participacaoMPE = [
  {
    ano: "2020",
    percentualMPE: 18,
    percentualGrande: 82,
    valorMPE: 5850000,
    meta: 25,
  },
  {
    ano: "2021",
    percentualMPE: 20,
    percentualGrande: 80,
    valorMPE: 7360000,
    meta: 25,
  },
  {
    ano: "2022",
    percentualMPE: 19,
    percentualGrande: 81,
    valorMPE: 7638000,
    meta: 25,
  },
  {
    ano: "2023",
    percentualMPE: 21,
    percentualGrande: 79,
    valorMPE: 9198000,
    meta: 25,
  },
  {
    ano: "2024",
    percentualMPE: 22,
    percentualGrande: 78,
    valorMPE: 9944000,
    meta: 25,
  },
];

// Faixas de vencimento dos contratos
const agingContratos = [
  { faixa: "Vencidos", quantidade: 12, valor: 980000, risco: "critico" },
  { faixa: "Até 30 dias", quantidade: 45, valor: 2800000, risco: "alto" },
  { faixa: "31-60 dias", quantidade: 67, valor: 4200000, risco: "medio" },
  { faixa: "61-90 dias", quantidade: 89, valor: 5600000, risco: "baixo" },
  { faixa: "91-180 dias", quantidade: 234, valor: 12800000, risco: "normal" },
  {
    faixa: "Acima 180 dias",
    quantidade: 800,
    valor: 18820000,
    risco: "normal",
  },
];

// Benchmark de Compras Municipal
const benchmarkCompras = [
  {
    municipio: "Município Atual",
    economia: 8.4,
    prazo: 38,
    mpe: 22,
    aditivos: 12,
    concentracao: 36.3,
    destaque: true,
  },
  {
    municipio: "Município A (Similar)",
    economia: 6.2,
    prazo: 52,
    mpe: 28,
    aditivos: 18,
    concentracao: 42.1,
    destaque: false,
  },
  {
    municipio: "Município B (Similar)",
    economia: 7.8,
    prazo: 45,
    mpe: 24,
    aditivos: 15,
    concentracao: 38.5,
    destaque: false,
  },
  {
    municipio: "Município C (Similar)",
    economia: 5.1,
    prazo: 60,
    mpe: 30,
    aditivos: 22,
    concentracao: 45.8,
    destaque: false,
  },
  {
    municipio: "Média Regional",
    economia: 6.4,
    prazo: 49,
    mpe: 26,
    aditivos: 17,
    concentracao: 40.5,
    destaque: false,
  },
];

export const COMPRAS_SNAPSHOT = {
  monthlyData,
  secretariaData,
  modalidadeData,
  recentContracts,
  ongoingBids,
  totaisCompras,
  topFornecedores,
  eventosCompras,
  comparativoAnual,
  metasCompras,
  prazoMedioPorEtapa,
  prazoTotalMedio,
  prazoTotalMeta,
  aditivosContratuais,
  totalAditivos,
  percentualContratosComAditivo,
  valorTotalAditivos,
  participacaoMPE,
  agingContratos,
  benchmarkCompras,
};
