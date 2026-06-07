// ==========================================
// CERTIDÃO LIBERATÓRIA — TCE/PR
// Dados demo (município modelo: Nova Londrina)
// Fonte: servicos.tce.pr.gov.br — CL - Certidão Liberatória
// ==========================================

export type StatusCertidao = "Apto" | "Inapto" | "Em análise";

export interface CertidaoTCE {
  codigo: string;
  municipio: string;
  cnpj: string;
  sistema: string;
  leituraOficial: string;
  descricaoStatus: string;
  status: StatusCertidao;
  emissao: string;
  validade: string;
  codigoControle: string;
  finalidade: string;
  baseLegal: string;
  diasRestantes: number;
}

export interface HistoricoCertidao {
  codigo: string;
  emissao: string;
  validade: string;
  status: StatusCertidao;
  codigoControle: string;
}

// ==========================================

export const certidaoAtual: CertidaoTCE = {
  codigo: "CL",
  municipio: "Nova Londrina",
  cnpj: "81.044.984/0001-04",
  sistema: "Certidão Liberatória",
  leituraOficial: "Apto para receber recursos públicos",
  descricaoStatus:
    "NOVA LONDRINA está em situação regular para recebimento de recursos públicos no TCE-PR.",
  status: "Apto",
  emissao: "30/04/2026",
  validade: "29/06/2026",
  codigoControle: "0034.YNQS.0320",
  finalidade:
    "Recebimento de recursos públicos, mediante convênio, termo de parceria, contrato de gestão ou instrumento congênere.",
  baseLegal:
    "Art. 95 da Lei Complementar Estadual nº 113, de 15/12/2005, e Arts. 289 e seguintes do Regimento Interno do Tribunal de Contas.",
  diasRestantes: 22,
};

// Histórico de certidões emitidas (mais recentes primeiro)
export const historicoCertidao: HistoricoCertidao[] = [
  {
    codigo: "CL",
    emissao: "30/04/2026",
    validade: "29/06/2026",
    status: "Apto",
    codigoControle: "0034.YNQS.0320",
  },
  {
    codigo: "CL",
    emissao: "28/02/2026",
    validade: "29/04/2026",
    status: "Apto",
    codigoControle: "0031.MXQR.0287",
  },
  {
    codigo: "CL",
    emissao: "30/12/2025",
    validade: "28/02/2026",
    status: "Apto",
    codigoControle: "0028.KPWT.0241",
  },
  {
    codigo: "CL",
    emissao: "31/10/2025",
    validade: "30/12/2025",
    status: "Apto",
    codigoControle: "0025.JTMN.0198",
  },
  {
    codigo: "CL",
    emissao: "29/08/2025",
    validade: "31/10/2025",
    status: "Apto",
    codigoControle: "0022.HVLK.0162",
  },
  {
    codigo: "CL",
    emissao: "30/06/2025",
    validade: "29/08/2025",
    status: "Inapto",
    codigoControle: "—",
  },
];
