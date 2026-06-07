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
