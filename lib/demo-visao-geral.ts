/**
 * Snapshot demo do módulo `visao-geral` (Geral).
 * Consumido via `useSnapshot("visao-geral", VISAO_GERAL_SNAPSHOT)` e
 * persistido em `mun_<ibge>.mod_visao_geral.dados`.
 * Apenas dados serializáveis — nunca funções, JSX ou ícones.
 */

export const VISAO_GERAL_SNAPSHOT = {
  receita: {
    prevista: 243_900_000,
    arrecadada: 228_500_000,
    percentual: 93.7,
  },
  despesa: {
    atualizada: 139_440_000,
    empenhada: 128_244_500,
    paga: 115_960_000,
    percentualExecucao: 92.0,
    percentualPessoalRCL: 42,
  },
  financeiro: {
    saldoTotal: 34_770_000,
    entradas: 228_500_000,
    saidas: 193_730_000,
    aplicacoes: 18_500_000,
  },
  compras: {
    contratosAtivos: 1247,
    valorContratado: 45_200_000,
    licitacoesAndamento: 38,
    economiaPeriodo: 3_800_000,
    taxaEconomia: 8.4,
  },
  rh: {
    totalFuncionarios: 1130,
    folhaPagamento: 10_500_000,
    horasExtras: 767_000,
    absenteismo: 4.3,
    turnover: 8.5,
  },
  tributacao: {
    receitaTributaria: 62_800_000,
    iptu: 28_500_000,
    iss: 22_400_000,
    itbi: 4_200_000,
    dividaAtiva: 45_200_000,
    inadimplencia: 12.8,
  },
  prestacaoContas: {
    regulares: 22,
    aComprovar: 3,
    irregulares: 1,
    conformidade: 84.6,
    taxaAprovacaoTCE: 91.7,
  },
  evolucaoConsolidada: [
    { mes: "Jan", receita: 18_200_000, despesa: 15_800_000 },
    { mes: "Fev", receita: 17_500_000, despesa: 15_200_000 },
    { mes: "Mar", receita: 21_300_000, despesa: 18_900_000 },
    { mes: "Abr", receita: 19_800_000, despesa: 17_600_000 },
    { mes: "Mai", receita: 20_100_000, despesa: 18_100_000 },
    { mes: "Jun", receita: 22_400_000, despesa: 19_500_000 },
    { mes: "Jul", receita: 19_600_000, despesa: 17_400_000 },
    { mes: "Ago", receita: 20_800_000, despesa: 18_800_000 },
    { mes: "Set", receita: 21_200_000, despesa: 19_200_000 },
    { mes: "Out", receita: 23_100_000, despesa: 20_500_000 },
    { mes: "Nov", receita: 22_500_000, despesa: 19_800_000 },
    { mes: "Dez", receita: 21_500_000, despesa: 19_100_000 },
  ],
  composicaoReceita: [
    { nome: "Receitas Próprias", valor: 62_800_000, fill: "var(--chart-1)" },
    { nome: "Transf. Estaduais", valor: 58_200_000, fill: "var(--chart-2)" },
    { nome: "Transf. Federais", valor: 95_400_000, fill: "var(--chart-3)" },
    { nome: "Outras Receitas", valor: 12_100_000, fill: "var(--chart-4)" },
  ],
  despesaPorFuncao: [
    { funcao: "Educação", valor: 42_500_000, percentual: 30.5 },
    { funcao: "Saúde", valor: 35_200_000, percentual: 25.2 },
    { funcao: "Administração", valor: 18_700_000, percentual: 13.4 },
    { funcao: "Transporte", valor: 12_800_000, percentual: 9.2 },
    { funcao: "Assistência Social", valor: 8_900_000, percentual: 6.4 },
    { funcao: "Outros", valor: 21_340_000, percentual: 15.3 },
  ],
  indicadoresChave: [
    {
      indicador: "Execução Orçamentária",
      valor: 92.0,
      meta: 95,
      status: "atencao",
    },
    { indicador: "Pessoal / RCL", valor: 42, meta: 54, status: "atingido" },
    {
      indicador: "Arrecadação / Previsão",
      valor: 93.7,
      meta: 95,
      status: "atencao",
    },
    {
      indicador: "Conformidade CAUC",
      valor: 84.6,
      meta: 100,
      status: "atencao",
    },
    {
      indicador: "Taxa de Economia (Compras)",
      valor: 8.4,
      meta: 5,
      status: "atingido",
    },
    { indicador: "Absenteísmo", valor: 4.3, meta: 3.5, status: "atencao" },
  ],
};

export type VisaoGeralSnapshot = typeof VISAO_GERAL_SNAPSHOT;
