// Dados demo — Financeiro Municipal.
// Snapshot serializável servido de mod_financeiro (jsonb). Sem funções/JSX.
// Helper local só para pré-computar strings formatadas (não entra no snapshot).
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

// Dados de fontes de recursos
const fontesRecursos = [
  {
    codigo: "100",
    nome: "Recursos Ordinários",
    saldoInicial: 12500000,
    entradas: 45800000,
    saidas: 42300000,
    saldoAtual: 16000000,
  },
  {
    codigo: "101",
    nome: "Receitas de Impostos - Educação",
    saldoInicial: 4200000,
    entradas: 18900000,
    saidas: 17800000,
    saldoAtual: 5300000,
  },
  {
    codigo: "102",
    nome: "Receitas de Impostos - Saúde",
    saldoInicial: 3800000,
    entradas: 22400000,
    saidas: 21600000,
    saldoAtual: 4600000,
  },
  {
    codigo: "114",
    nome: "FUNDEB",
    saldoInicial: 2100000,
    entradas: 28500000,
    saidas: 27200000,
    saldoAtual: 3400000,
  },
  {
    codigo: "115",
    nome: "Transferências SUS",
    saldoInicial: 1800000,
    entradas: 15600000,
    saidas: 14900000,
    saldoAtual: 2500000,
  },
  {
    codigo: "159",
    nome: "Convênios Federais",
    saldoInicial: 850000,
    entradas: 4200000,
    saidas: 3100000,
    saldoAtual: 1950000,
  },
  {
    codigo: "259",
    nome: "Convênios Estaduais",
    saldoInicial: 620000,
    entradas: 2800000,
    saidas: 2400000,
    saldoAtual: 1020000,
  },
];

// Dados de contas bancárias
const contasBancarias = [
  {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12345-6",
    tipo: "Movimento",
    fonte: "100",
    saldo: 8500000,
    status: "conciliada",
  },
  {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12346-7",
    tipo: "Vinculada Educação",
    fonte: "101",
    saldo: 3200000,
    status: "conciliada",
  },
  {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12347-8",
    tipo: "Vinculada Saúde",
    fonte: "102",
    saldo: 2800000,
    status: "pendente",
  },
  {
    banco: "Caixa Econômica",
    agencia: "0567",
    conta: "98765-4",
    tipo: "FUNDEB",
    fonte: "114",
    saldo: 3400000,
    status: "conciliada",
  },
  {
    banco: "Caixa Econômica",
    agencia: "0567",
    conta: "98766-5",
    tipo: "Convênios",
    fonte: "159",
    saldo: 1950000,
    status: "divergente",
  },
  {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12348-9",
    tipo: "Aplicações",
    fonte: "100",
    saldo: 5200000,
    status: "conciliada",
  },
];

// Dados de receitas lançadas
const receitasLancadas = [
  {
    data: "29/11/2024",
    documento: "DAM-2024-15678",
    contribuinte: "Empresa Alpha Ltda",
    tipo: "ISS",
    valor: 45800,
    status: "pago",
  },
  {
    data: "28/11/2024",
    documento: "DAM-2024-15677",
    contribuinte: "Comercio Beta SA",
    tipo: "ISS",
    valor: 32500,
    status: "pago",
  },
  {
    data: "28/11/2024",
    documento: "IPTU-2024-8901",
    contribuinte: "Maria Silva",
    tipo: "IPTU",
    valor: 2800,
    status: "pendente",
  },
  {
    data: "27/11/2024",
    documento: "ITBI-2024-456",
    contribuinte: "Joao Santos",
    tipo: "ITBI",
    valor: 18500,
    status: "pago",
  },
  {
    data: "27/11/2024",
    documento: "DAM-2024-15676",
    contribuinte: "Servicos Gama",
    tipo: "ISS",
    valor: 28900,
    status: "vencido",
  },
  {
    data: "26/11/2024",
    documento: "TAXA-2024-789",
    contribuinte: "Restaurante Delta",
    tipo: "Taxa",
    valor: 1200,
    status: "pago",
  },
];

// Dados de aplicacoes financeiras
const aplicacoesFinanceiras = [
  {
    instituicao: "Banco do Brasil",
    tipo: "CDB",
    dataAplicacao: "01/01/2024",
    valorAplicado: 3000000,
    rendimento: 285000,
    saldoAtual: 3285000,
    taxa: "102% CDI",
  },
  {
    instituicao: "Caixa Economica",
    tipo: "Fundo RF",
    dataAplicacao: "15/03/2024",
    valorAplicado: 1500000,
    rendimento: 98500,
    saldoAtual: 1598500,
    taxa: "98% CDI",
  },
  {
    instituicao: "Banco do Brasil",
    tipo: "Poupanca",
    dataAplicacao: "01/06/2024",
    valorAplicado: 800000,
    rendimento: 32000,
    saldoAtual: 832000,
    taxa: "TR + 0.5%",
  },
];

// Últimos pagamentos
const ultimosPagamentos = [
  {
    data: "29/11/2024",
    empenho: "2024NE003456",
    credor: "Construtora Silva",
    valor: 185000,
    fonte: "159",
    tipo: "Obra",
  },
  {
    data: "29/11/2024",
    empenho: "2024NE003455",
    credor: "Distribuidora de Medicamentos",
    valor: 89500,
    fonte: "102",
    tipo: "Material",
  },
  {
    data: "28/11/2024",
    empenho: "2024NE003450",
    credor: "Merenda Escolar Ltda",
    valor: 156000,
    fonte: "101",
    tipo: "Alimentacao",
  },
  {
    data: "28/11/2024",
    empenho: "2024NE003448",
    credor: "Combustíveis XYZ",
    valor: 45800,
    fonte: "100",
    tipo: "Combustível",
  },
  {
    data: "27/11/2024",
    empenho: "2024NE003445",
    credor: "Empresa de Limpeza",
    valor: 78900,
    fonte: "100",
    tipo: "Servico",
  },
];

// Maiores fornecedores/credores
const maioresFornecedores = [
  {
    nome: "Construtora Silva & Associados",
    cnpj: "12.345.678/0001-90",
    totalPago: 8500000,
    aPagar: 2100000,
    contratos: 3,
  },
  {
    nome: "Distribuidora de Medicamentos ABC",
    cnpj: "23.456.789/0001-01",
    totalPago: 5200000,
    aPagar: 890000,
    contratos: 2,
  },
  {
    nome: "Merenda Escolar Ltda",
    cnpj: "34.567.890/0001-12",
    totalPago: 4800000,
    aPagar: 650000,
    contratos: 1,
  },
  {
    nome: "Transporte Urbano SA",
    cnpj: "45.678.901/0001-23",
    totalPago: 3900000,
    aPagar: 420000,
    contratos: 1,
  },
  {
    nome: "Tecnologia Municipal",
    cnpj: "56.789.012/0001-34",
    totalPago: 2100000,
    aPagar: 180000,
    contratos: 4,
  },
];

// Maiores contribuintes
const maioresContribuintes = [
  {
    nome: "Supermercados Uniao SA",
    cnpj: "11.222.333/0001-44",
    arrecadado: 1850000,
    tributo: "ISS",
    regularidade: "regular",
  },
  {
    nome: "Banco Nacional SA",
    cnpj: "22.333.444/0001-55",
    arrecadado: 1420000,
    tributo: "ISS",
    regularidade: "regular",
  },
  {
    nome: "Shopping Center Norte",
    cnpj: "33.444.555/0001-66",
    arrecadado: 980000,
    tributo: "ISS/IPTU",
    regularidade: "regular",
  },
  {
    nome: "Construtora Omega",
    cnpj: "44.555.666/0001-77",
    arrecadado: 750000,
    tributo: "ITBI",
    regularidade: "irregular",
  },
  {
    nome: "Indústria Metalúrgica Beta",
    cnpj: "55.666.777/0001-88",
    arrecadado: 620000,
    tributo: "ISS",
    regularidade: "regular",
  },
];

// Saldos a pagar por vencimento
const saldosAPagar = [
  { vencimento: "Vencidos", quantidade: 45, valor: 1250000, percentual: 8 },
  { vencimento: "Até 7 dias", quantidade: 89, valor: 3200000, percentual: 21 },
  { vencimento: "8-15 dias", quantidade: 67, valor: 2800000, percentual: 18 },
  { vencimento: "16-30 dias", quantidade: 124, valor: 4500000, percentual: 29 },
  {
    vencimento: "Acima 30 dias",
    quantidade: 98,
    valor: 3650000,
    percentual: 24,
  },
];

// Saldos a receber
const saldosAReceber = [
  { tipo: "IPTU", vencido: 2800000, aVencer: 4200000, total: 7000000 },
  { tipo: "ISS", vencido: 850000, aVencer: 1200000, total: 2050000 },
  { tipo: "ITBI", vencido: 120000, aVencer: 380000, total: 500000 },
  { tipo: "Taxas", vencido: 450000, aVencer: 680000, total: 1130000 },
  { tipo: "Dívida Ativa", vencido: 12500000, aVencer: 0, total: 12500000 },
];

// Eventos por tipo
const eventosEmpenhos = [
  {
    data: "29/11/2024",
    hora: "16:45",
    descricao: "Empenho 2024NE003458 - Material de escritório",
    valor: 12500,
  },
  {
    data: "29/11/2024",
    hora: "14:30",
    descricao: "Empenho 2024NE003457 - Serviços de manutenção",
    valor: 45800,
  },
  {
    data: "29/11/2024",
    hora: "11:20",
    descricao: "Empenho 2024NE003456 - Obra pavimentação",
    valor: 185000,
  },
  {
    data: "28/11/2024",
    hora: "17:15",
    descricao: "Empenho 2024NE003455 - Medicamentos",
    valor: 89500,
  },
  {
    data: "28/11/2024",
    hora: "09:45",
    descricao: "Empenho 2024NE003454 - Combustível",
    valor: 32000,
  },
];

const eventosLiquidacoes = [
  {
    data: "29/11/2024",
    hora: "17:00",
    descricao: "Liquidação 2024NL002890 - Construtora Silva",
    valor: 185000,
  },
  {
    data: "29/11/2024",
    hora: "15:30",
    descricao: "Liquidação 2024NL002889 - Distribuidora ABC",
    valor: 89500,
  },
  {
    data: "28/11/2024",
    hora: "16:45",
    descricao: "Liquidação 2024NL002888 - Merenda Escolar",
    valor: 156000,
  },
  {
    data: "28/11/2024",
    hora: "14:20",
    descricao: "Liquidação 2024NL002887 - Combustíveis XYZ",
    valor: 45800,
  },
  {
    data: "27/11/2024",
    hora: "11:30",
    descricao: "Liquidação 2024NL002886 - Empresa Limpeza",
    valor: 78900,
  },
];

const eventosPagamentos = [
  {
    data: "29/11/2024",
    hora: "17:30",
    descricao: "OB 2024OB004567 - Construtora Silva",
    valor: 185000,
  },
  {
    data: "29/11/2024",
    hora: "16:00",
    descricao: "OB 2024OB004566 - Distribuidora ABC",
    valor: 89500,
  },
  {
    data: "28/11/2024",
    hora: "17:00",
    descricao: "OB 2024OB004565 - Merenda Escolar",
    valor: 156000,
  },
  {
    data: "28/11/2024",
    hora: "15:30",
    descricao: "OB 2024OB004564 - Combustíveis XYZ",
    valor: 45800,
  },
  {
    data: "27/11/2024",
    hora: "14:00",
    descricao: "OB 2024OB004563 - Empresa Limpeza",
    valor: 78900,
  },
];

const eventosArrecadacao = [
  {
    data: "29/11/2024",
    hora: "18:00",
    descricao: "Credito FPM - Cota Decendial",
    valor: 2850000,
  },
  {
    data: "29/11/2024",
    hora: "12:30",
    descricao: "Arrecadação ISS - Empresas diversas",
    valor: 185000,
  },
  {
    data: "28/11/2024",
    hora: "18:00",
    descricao: "Credito ICMS - Cota Parte",
    valor: 1200000,
  },
  {
    data: "28/11/2024",
    hora: "14:45",
    descricao: "Arrecadação IPTU - Guias diversas",
    valor: 89000,
  },
  {
    data: "27/11/2024",
    hora: "16:30",
    descricao: "Credito FUNDEB - Complementacao",
    valor: 420000,
  },
];

const eventosTransferencias = [
  {
    data: "29/11/2024",
    hora: "15:00",
    descricao: "Transf. Conta Movimento para Aplicacao",
    valor: 500000,
  },
  {
    data: "28/11/2024",
    hora: "11:00",
    descricao: "Resgate Aplicacao para Pagamentos",
    valor: 350000,
  },
  {
    data: "27/11/2024",
    hora: "14:30",
    descricao: "Transf. entre fontes - Remanejamento",
    valor: 120000,
  },
  {
    data: "26/11/2024",
    hora: "16:00",
    descricao: "Aplicação de recursos do FUNDEB",
    valor: 280000,
  },
  {
    data: "25/11/2024",
    hora: "10:30",
    descricao: "Transf. Conta Vinculada Saúde",
    valor: 450000,
  },
];

// Conciliações bancárias
const conciliacoesBancarias = [
  {
    conta: "12345-6",
    banco: "BB",
    competencia: "Nov/2024",
    saldoBanco: 8500000,
    saldoContabil: 8500000,
    diferenca: 0,
    status: "conciliada",
  },
  {
    conta: "12346-7",
    banco: "BB",
    competencia: "Nov/2024",
    saldoBanco: 3200000,
    saldoContabil: 3200000,
    diferenca: 0,
    status: "conciliada",
  },
  {
    conta: "12347-8",
    banco: "BB",
    competencia: "Nov/2024",
    saldoBanco: 2850000,
    saldoContabil: 2800000,
    diferenca: 50000,
    status: "pendente",
  },
  {
    conta: "98765-4",
    banco: "CEF",
    competencia: "Nov/2024",
    saldoBanco: 3400000,
    saldoContabil: 3400000,
    diferenca: 0,
    status: "conciliada",
  },
  {
    conta: "98766-5",
    banco: "CEF",
    competencia: "Nov/2024",
    saldoBanco: 1980000,
    saldoContabil: 1950000,
    diferenca: 30000,
    status: "divergente",
  },
];

// Fluxo de caixa mensal
const fluxoCaixaMensal = [
  { mes: "Jan", entradas: 11200000, saidas: 10800000, saldo: 400000 },
  { mes: "Fev", entradas: 10800000, saidas: 10500000, saldo: 300000 },
  { mes: "Mar", entradas: 12500000, saidas: 11800000, saldo: 700000 },
  { mes: "Abr", entradas: 11800000, saidas: 11200000, saldo: 600000 },
  { mes: "Mai", entradas: 12200000, saidas: 11500000, saldo: 700000 },
  { mes: "Jun", entradas: 13500000, saidas: 12800000, saldo: 700000 },
  { mes: "Jul", entradas: 12800000, saidas: 12200000, saldo: 600000 },
  { mes: "Ago", entradas: 13200000, saidas: 12500000, saldo: 700000 },
  { mes: "Set", entradas: 12500000, saidas: 12000000, saldo: 500000 },
  { mes: "Out", entradas: 13800000, saidas: 13200000, saldo: 600000 },
  { mes: "Nov", entradas: 14200000, saidas: 13500000, saldo: 700000 },
];

// Totais gerais
const totaisFinanceiros = {
  saldoTotal: 34770000,
  totalEntradas: 138400000,
  totalSaidas: 131500000,
  aplicacoes: 5715500,
  aPagar: 15400000,
  aReceber: 23180000,
};

// Metas financeiras
const metasFinanceiro = [
  {
    indicador: "Liquidez Imediata",
    meta: 1.5,
    realizado: 2.26,
    unidade: "",
    status: "atingido",
    descricao: "Disponível / A Pagar",
  },
  {
    indicador: "Contas Conciliadas",
    meta: 95,
    realizado: 80,
    unidade: "%",
    status: "atencao",
    descricao: "Atualizadas mensalmente",
  },
  {
    indicador: "Aplicações Financeiras",
    meta: 5000000,
    realizado: 5715500,
    unidade: "R$",
    status: "atingido",
    descricao: "Meta de investimento superada",
  },
  {
    indicador: "Pagamentos em Dia",
    meta: 98,
    realizado: 96,
    unidade: "%",
    status: "atencao",
    descricao: "Pontualidade nos pagamentos",
  },
  {
    indicador: "Receita em Conta",
    meta: 90,
    realizado: 92,
    unidade: "%",
    descricao: "Arrecadação disponível vs total",
  },
  {
    indicador: "Provisão Mensal",
    meta: 15000000,
    realizado: 15400000,
    unidade: "R$",
    status: "atingido",
    descricao: "Reserva para pagamentos",
  },
];

// Disponibilidade por Fonte de Recurso (chart)
const disponibilidadePorFonte = [
  { nome: "Recursos Ordinários", valor: 16000000, fill: "var(--chart-1)" },
  { nome: "Educação", valor: 5300000, fill: "var(--chart-2)" },
  { nome: "Saúde", valor: 4600000, fill: "var(--chart-3)" },
  { nome: "FUNDEB", valor: 3400000, fill: "var(--chart-4)" },
  { nome: "SUS", valor: 2500000, fill: "var(--chart-5)" },
  { nome: "Convênios", valor: 2970000, fill: "var(--chart-6)" },
];

// Projeção de Fluxo de Caixa (próximos meses)
const projecaoFluxoCaixa = [
  {
    mes: "Dez/24",
    entradasPrevistas: 15200000,
    saidasPrevistas: 16800000,
    saldoProjetado: -1600000,
    confianca: "alta",
  },
  {
    mes: "Jan/25",
    entradasPrevistas: 10500000,
    saidasPrevistas: 11200000,
    saldoProjetado: -700000,
    confianca: "média",
  },
  {
    mes: "Fev/25",
    entradasPrevistas: 11800000,
    saidasPrevistas: 10900000,
    saldoProjetado: 900000,
    confianca: "média",
  },
  {
    mes: "Mar/25",
    entradasPrevistas: 13200000,
    saidasPrevistas: 12100000,
    saldoProjetado: 1100000,
    confianca: "baixa",
  },
];

const saldoAcumuladoProjetado = projecaoFluxoCaixa.reduce((acc, item) => {
  const novoSaldo = acc + item.saldoProjetado;
  return novoSaldo;
}, totaisFinanceiros.saldoTotal);

// Cobertura de Compromissos
const mediaSaidasMensal = totaisFinanceiros.totalSaidas / 11; // 11 meses até novembro
const mesesCobertura = totaisFinanceiros.saldoTotal / mediaSaidasMensal;
const coberturaComPromissos = [
  {
    indicador: "Saldo Disponível",
    valor: totaisFinanceiros.saldoTotal,
    formatado: formatCurrency(totaisFinanceiros.saldoTotal),
  },
  {
    indicador: "Média Mensal de Saídas",
    valor: mediaSaidasMensal,
    formatado: formatCurrency(mediaSaidasMensal),
  },
  {
    indicador: "Meses de Cobertura",
    valor: mesesCobertura,
    formatado: `${mesesCobertura.toFixed(1)} meses`,
  },
  {
    indicador: "Compromissos Vencidos",
    valor: 1250000,
    formatado: formatCurrency(1250000),
  },
  {
    indicador: "Compromissos Próx. 30 dias",
    valor: 6000000,
    formatado: formatCurrency(6000000),
  },
  {
    indicador: "Compromissos Próx. 60 dias",
    valor: 10500000,
    formatado: formatCurrency(10500000),
  },
];

// Concentração de Fornecedores (Análise de Pareto / HHI)
const totalPagoFornecedores = maioresFornecedores.reduce(
  (a, b) => a + b.totalPago,
  0,
);
const concentracaoFornecedores = maioresFornecedores.map((forn, index) => {
  const percentual = (forn.totalPago / totalPagoFornecedores) * 100;
  const acumulado =
    (maioresFornecedores
      .slice(0, index + 1)
      .reduce((a, b) => a + b.totalPago, 0) /
      totalPagoFornecedores) *
    100;
  return {
    ...forn,
    percentual: Number(percentual.toFixed(1)),
    acumulado: Number(acumulado.toFixed(1)),
  };
});
const hhi = maioresFornecedores.reduce((acc, forn) => {
  const share = (forn.totalPago / totalPagoFornecedores) * 100;
  return acc + share * share;
}, 0);
const riscoConcentracao =
  hhi > 2500 ? "alto" : hhi > 1500 ? "moderado" : "baixo";

// Benchmark Financeiro Municipal
const benchmarkFinanceiro = [
  {
    municipio: "Município Atual",
    liquidez: 2.26,
    conciliacao: 80,
    rendimento: 7.8,
    cobertura: Number(mesesCobertura.toFixed(1)),
    inadimplencia: 24.2,
    destaque: true,
  },
  {
    municipio: "Município A (Similar)",
    liquidez: 1.85,
    conciliacao: 92,
    rendimento: 6.5,
    cobertura: 2.1,
    inadimplencia: 18.5,
    destaque: false,
  },
  {
    municipio: "Município B (Similar)",
    liquidez: 1.42,
    conciliacao: 88,
    rendimento: 7.2,
    cobertura: 1.8,
    inadimplencia: 32.1,
    destaque: false,
  },
  {
    municipio: "Município C (Similar)",
    liquidez: 2.58,
    conciliacao: 75,
    rendimento: 5.9,
    cobertura: 3.5,
    inadimplencia: 28.7,
    destaque: false,
  },
  {
    municipio: "Média Regional",
    liquidez: 1.92,
    conciliacao: 84,
    rendimento: 6.5,
    cobertura: 2.4,
    inadimplencia: 25.8,
    destaque: false,
  },
];

export const FINANCEIRO_SNAPSHOT = {
  fontesRecursos,
  contasBancarias,
  receitasLancadas,
  aplicacoesFinanceiras,
  ultimosPagamentos,
  maioresFornecedores,
  maioresContribuintes,
  saldosAPagar,
  saldosAReceber,
  eventosEmpenhos,
  eventosLiquidacoes,
  eventosPagamentos,
  eventosArrecadacao,
  eventosTransferencias,
  conciliacoesBancarias,
  fluxoCaixaMensal,
  totaisFinanceiros,
  metasFinanceiro,
  disponibilidadePorFonte,
  projecaoFluxoCaixa,
  saldoAcumuladoProjetado,
  mesesCobertura,
  coberturaComPromissos,
  concentracaoFornecedores,
  hhi,
  riscoConcentracao,
  benchmarkFinanceiro,
};
