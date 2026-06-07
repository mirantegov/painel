// ==========================================
// MSC — MONITOR DE SITUAÇÃO CONTÁBIL (SICONFI)
// Dados demo (município modelo: Nova Londrina)
// Fonte: extrato SICONFI / balancete Jan/2026
// ==========================================

export type SituacaoMSC = "Pendência encontrada" | "Sem pendência";

export interface DadosMSC {
  municipio: string;
  uf: string;
  codigoIBGE: string;
  dataExtrato: string;
  horaExtrato: string;
  totalEntidades: number;
}

export interface EntidadeMSC {
  nome: string;
  codigoSiconfi: string;
  tipo: "PM" | "CM" | "AUTARQUIA";
  situacao: SituacaoMSC;
  ultimaEntrega: string;
  ultimaCompetencia: string;
  competenciaEsperada: string;
  mesesAtraso: number;
  resumo: string;
}

export interface ContaMSC {
  conta: string;
  descricao: string;
  grupo: "Ativo Circulante" | "Ativo Não Circulante" | "Passivo Circulante" | "Variações Patrimoniais" | "Controle Orçamentário";
  saldoInicial: number;
  debitos: number;
  creditos: number;
  saldoFinal: number;
  natureza: "D" | "C";
}

export interface HistoricoMSC {
  mes: string;
  competencia: string;
  enviou: boolean;
  dataEnvio?: string;
  situacao: SituacaoMSC | "Não enviado";
}

// ==========================================

export const dadosMSC: DadosMSC = {
  municipio: "Nova Londrina",
  uf: "PR",
  codigoIBGE: "4117107",
  dataExtrato: "07/06/2026",
  horaExtrato: "15:44",
  totalEntidades: 1,
};

export const entidadeMSC: EntidadeMSC = {
  nome: "Prefeitura Municipal de Nova Londrina - PR",
  codigoSiconfi: "4117107EX",
  tipo: "PM",
  situacao: "Pendência encontrada",
  ultimaEntrega: "11/05/2026, 13:38",
  ultimaCompetencia: "Mês 01 de 2026",
  competenciaEsperada: "Mês 04 de 2026",
  mesesAtraso: 3,
  resumo:
    "Última entrega em Mês 01 de 2026; competência esperada Mês 04 de 2026.",
};

// Contas do balancete (PCASP) — competência Jan/2026
// Extraídas do arquivo instancia.csv enviado ao SICONFI
export const contasMSC: ContaMSC[] = [
  // ATIVO CIRCULANTE
  {
    conta: "1.1.1.1.1.02.00",
    descricao: "Caixa em Movimento",
    grupo: "Ativo Circulante",
    saldoInicial: 0,
    debitos: 541586.3,
    creditos: 537789.13,
    saldoFinal: 3797.17,
    natureza: "D",
  },
  {
    conta: "1.1.1.1.5.00.00",
    descricao: "Bancos Conta Movimento",
    grupo: "Ativo Circulante",
    saldoInicial: 0,
    debitos: 259824.26,
    creditos: 155875.37,
    saldoFinal: 103948.89,
    natureza: "D",
  },
  {
    conta: "1.2.3.1.1.01.02",
    descricao: "Créditos Tributários a Receber",
    grupo: "Ativo Circulante",
    saldoInicial: 1900.0,
    debitos: 0,
    creditos: 0,
    saldoFinal: 1900.0,
    natureza: "D",
  },
  {
    conta: "1.2.3.1.1.01.99",
    descricao: "Outros Créditos Tributários",
    grupo: "Ativo Circulante",
    saldoInicial: 24432.6,
    debitos: 0,
    creditos: 0,
    saldoFinal: 24432.6,
    natureza: "D",
  },
  {
    conta: "1.2.3.1.1.02.01",
    descricao: "Créditos Não Tributários a Receber",
    grupo: "Ativo Circulante",
    saldoInicial: 105037.8,
    debitos: 0,
    creditos: 0,
    saldoFinal: 105037.8,
    natureza: "D",
  },
  {
    conta: "1.2.3.1.1.03.03",
    descricao: "Estoques e Almoxarifado",
    grupo: "Ativo Circulante",
    saldoInicial: 89638.0,
    debitos: 0,
    creditos: 0,
    saldoFinal: 89638.0,
    natureza: "D",
  },
  {
    conta: "1.2.3.1.1.04.05",
    descricao: "Adiantamentos Concedidos",
    grupo: "Ativo Circulante",
    saldoInicial: 37278.7,
    debitos: 0,
    creditos: 0,
    saldoFinal: 37278.7,
    natureza: "D",
  },
  // ATIVO NÃO CIRCULANTE
  {
    conta: "1.2.3.2.1.01.03",
    descricao: "Bens Imóveis — Imobilizado",
    grupo: "Ativo Não Circulante",
    saldoInicial: 534341.71,
    debitos: 0,
    creditos: 0,
    saldoFinal: 534341.71,
    natureza: "D",
  },
  // PASSIVO CIRCULANTE
  {
    conta: "2.1.8.8.1.01.15",
    descricao: "Obrigações Trabalhistas a Pagar",
    grupo: "Passivo Circulante",
    saldoInicial: 0,
    debitos: 0,
    creditos: 2757.49,
    saldoFinal: 2757.49,
    natureza: "C",
  },
  {
    conta: "2.1.8.8.1.01.99",
    descricao: "Outras Obrigações a Pagar",
    grupo: "Passivo Circulante",
    saldoInicial: 0,
    debitos: 0,
    creditos: 1039.68,
    saldoFinal: 1039.68,
    natureza: "C",
  },
  // VARIAÇÕES PATRIMONIAIS (VPD)
  {
    conta: "3.1.1.1.1.01.01",
    descricao: "Pessoal e Encargos Sociais",
    grupo: "Variações Patrimoniais",
    saldoInicial: 0,
    debitos: 75429.42,
    creditos: 0,
    saldoFinal: 75429.42,
    natureza: "D",
  },
  {
    conta: "3.1.1.2.1.00.00",
    descricao: "Serviços de Terceiros — PJ",
    grupo: "Variações Patrimoniais",
    saldoInicial: 0,
    debitos: 55800.0,
    creditos: 0,
    saldoFinal: 55800.0,
    natureza: "D",
  },
  {
    conta: "3.1.2.1.2.00.00",
    descricao: "Material de Consumo",
    grupo: "Variações Patrimoniais",
    saldoInicial: 0,
    debitos: 8270.54,
    creditos: 0,
    saldoFinal: 8270.54,
    natureza: "D",
  },
  {
    conta: "4.5.1.1.2.02.00",
    descricao: "Transferências Correntes Recebidas",
    grupo: "Variações Patrimoniais",
    saldoInicial: 0,
    debitos: 0,
    creditos: 259444.58,
    saldoFinal: 259444.58,
    natureza: "C",
  },
  // CONTROLE ORÇAMENTÁRIO
  {
    conta: "5.2.2.1.1.01.00",
    descricao: "Dotação Inicial Autorizada",
    grupo: "Controle Orçamentário",
    saldoInicial: 0,
    debitos: 2916335.0,
    creditos: 0,
    saldoFinal: 2916335.0,
    natureza: "D",
  },
  {
    conta: "6.2.2.1.1.00.00",
    descricao: "Execução Orçamentária da Despesa",
    grupo: "Controle Orçamentário",
    saldoInicial: 0,
    debitos: 0,
    creditos: 2703808.21,
    saldoFinal: 2703808.21,
    natureza: "C",
  },
];

// Histórico de envios — 12 meses (Jan/2025 – Dez/2025)
// 9 meses enviados, 3 não enviados (conforme padrão do município)
export const historicoMSC: HistoricoMSC[] = [
  {
    mes: "Jan/2025",
    competencia: "Mês 01 de 2025",
    enviou: true,
    dataEnvio: "10/02/2025, 09:14",
    situacao: "Sem pendência",
  },
  {
    mes: "Fev/2025",
    competencia: "Mês 02 de 2025",
    enviou: true,
    dataEnvio: "11/03/2025, 11:22",
    situacao: "Sem pendência",
  },
  {
    mes: "Mar/2025",
    competencia: "Mês 03 de 2025",
    enviou: true,
    dataEnvio: "09/04/2025, 10:05",
    situacao: "Sem pendência",
  },
  {
    mes: "Abr/2025",
    competencia: "Mês 04 de 2025",
    enviou: false,
    situacao: "Não enviado",
  },
  {
    mes: "Mai/2025",
    competencia: "Mês 05 de 2025",
    enviou: true,
    dataEnvio: "12/06/2025, 14:30",
    situacao: "Sem pendência",
  },
  {
    mes: "Jun/2025",
    competencia: "Mês 06 de 2025",
    enviou: true,
    dataEnvio: "10/07/2025, 08:45",
    situacao: "Sem pendência",
  },
  {
    mes: "Jul/2025",
    competencia: "Mês 07 de 2025",
    enviou: true,
    dataEnvio: "11/08/2025, 16:20",
    situacao: "Sem pendência",
  },
  {
    mes: "Ago/2025",
    competencia: "Mês 08 de 2025",
    enviou: false,
    situacao: "Não enviado",
  },
  {
    mes: "Set/2025",
    competencia: "Mês 09 de 2025",
    enviou: true,
    dataEnvio: "13/10/2025, 13:10",
    situacao: "Sem pendência",
  },
  {
    mes: "Out/2025",
    competencia: "Mês 10 de 2025",
    enviou: true,
    dataEnvio: "10/11/2025, 09:55",
    situacao: "Sem pendência",
  },
  {
    mes: "Nov/2025",
    competencia: "Mês 11 de 2025",
    enviou: false,
    situacao: "Não enviado",
  },
  {
    mes: "Dez/2025",
    competencia: "Mês 12 de 2025",
    enviou: true,
    dataEnvio: "11/01/2026, 10:00",
    situacao: "Sem pendência",
  },
];
