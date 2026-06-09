// Dados demo do módulo Processos (controle de processos e solicitações).
// Snapshot serializável (sem funções/JSX) → seedado em mod_processos.dados (jsonb).

export const tiposProcesso = [
  { tipo: "Alvará de Funcionamento", area: "Urbanismo", sla: 15, qtd: 45 },
  { tipo: "Habite-se", area: "Urbanismo", sla: 30, qtd: 23 },
  { tipo: "Pedido LAI/e-SIC", area: "Controle Interno", sla: 20, qtd: 67 },
  { tipo: "Ouvidoria - Reclamação", area: "Gabinete", sla: 10, qtd: 89 },
  { tipo: "Certidão Negativa", area: "Tributação", sla: 5, qtd: 134 },
  { tipo: "Parcelamento Tributário", area: "Tributação", sla: 15, qtd: 56 },
  { tipo: "Solicitação RH - Férias", area: "RH", sla: 7, qtd: 78 },
  { tipo: "Admissão/Posse", area: "RH", sla: 30, qtd: 12 },
  { tipo: "PAD/Sindicância", area: "RH", sla: 60, qtd: 3 },
  { tipo: "Parecer Jurídico", area: "Procuradoria", sla: 10, qtd: 45 },
  { tipo: "Minuta Contratual", area: "Procuradoria", sla: 15, qtd: 28 },
  { tipo: "Requisição Compras", area: "Compras", sla: 10, qtd: 98 },
  { tipo: "Termo de Referência", area: "Compras", sla: 20, qtd: 34 },
  { tipo: "Aditivo Contratual", area: "Contratos", sla: 15, qtd: 41 },
  { tipo: "Prestação Contas Convênio", area: "Contratos", sla: 30, qtd: 19 },
  {
    tipo: "Abertura Crédito Adicional",
    area: "Contabilidade",
    sla: 20,
    qtd: 8,
  },
  { tipo: "Licença Ambiental", area: "Meio Ambiente", sla: 45, qtd: 15 },
  { tipo: "Auto de Infração", area: "Fiscalização", sla: 30, qtd: 27 },
  { tipo: "Baixa Patrimonial", area: "Patrimônio", sla: 15, qtd: 22 },
  { tipo: "Auditoria Interna", area: "Controle Interno", sla: 60, qtd: 5 },
];

export const kpiData = {
  solicitacoesAbertas: 892,
  variacaoSolicitacoes: 8.3,
  processosEmTramitacao: 456,
  dentroDoPrazo: 78.4,
  atrasados: 98,
  tempoMedioAtraso: 12,
  tempoMedioConclusao: 8.5,
};

export const entradasVsConclusoes = [
  { mes: "Jan", entradas: 245, conclusoes: 198 },
  { mes: "Fev", entradas: 289, conclusoes: 267 },
  { mes: "Mar", entradas: 312, conclusoes: 289 },
  { mes: "Abr", entradas: 298, conclusoes: 301 },
  { mes: "Mai", entradas: 334, conclusoes: 318 },
  { mes: "Jun", entradas: 356, conclusoes: 342 },
  { mes: "Jul", entradas: 378, conclusoes: 365 },
  { mes: "Ago", entradas: 401, conclusoes: 389 },
  { mes: "Set", entradas: 423, conclusoes: 412 },
  { mes: "Out", entradas: 445, conclusoes: 438 },
  { mes: "Nov", entradas: 467, conclusoes: 451 },
  { mes: "Dez", entradas: 489, conclusoes: 476 },
];

export const backlogPorStatus = [
  { status: "Aberto", quantidade: 156 },
  { status: "Em Análise", quantidade: 189 },
  { status: "Pendência", quantidade: 67 },
  { status: "Encaminhado", quantidade: 44 },
];

export const tempoMedioPorTipo = [
  { tipo: "Certidão", dias: 2.3 },
  { tipo: "Alvará", dias: 12.5 },
  { tipo: "Habite-se", dias: 18.7 },
  { tipo: "LAI/e-SIC", dias: 15.2 },
  { tipo: "Parecer Jurídico", dias: 8.9 },
  { tipo: "Ouvidoria", dias: 6.4 },
];

export const distribuicaoPorArea = [
  { area: "Urbanismo", quantidade: 98, percentual: 21.5 },
  { area: "Tributação", quantidade: 134, percentual: 29.4 },
  { area: "RH", quantidade: 93, percentual: 20.4 },
  { area: "Procuradoria", quantidade: 73, percentual: 16.0 },
  { area: "Outros", quantidade: 58, percentual: 12.7 },
];

export const movimentacoesRecentes = [
  {
    data: "15/12/2024",
    hora: "14:30",
    protocolo: "2024/12345",
    tipo: "Alvará de Funcionamento",
    origem: "Protocolo",
    destino: "Urbanismo",
    acao: "Encaminhado",
    responsavel: "Maria Silva",
    prazo: "30/12/2024",
    statusPrazo: "no-prazo",
  },
  {
    data: "15/12/2024",
    hora: "13:15",
    protocolo: "2024/12344",
    tipo: "Pedido LAI",
    origem: "e-SIC",
    destino: "Controle Interno",
    acao: "Criado",
    responsavel: "Sistema",
    prazo: "04/01/2025",
    statusPrazo: "no-prazo",
  },
  {
    data: "15/12/2024",
    hora: "11:45",
    protocolo: "2024/12343",
    tipo: "Parecer Jurídico",
    origem: "Compras",
    destino: "Procuradoria",
    acao: "Solicitado",
    responsavel: "João Santos",
    prazo: "20/12/2024",
    statusPrazo: "atencao",
  },
  {
    data: "15/12/2024",
    hora: "10:20",
    protocolo: "2024/12342",
    tipo: "Certidão Negativa",
    origem: "Tributação",
    destino: "Arquivo",
    acao: "Deferido",
    responsavel: "Ana Costa",
    prazo: "16/12/2024",
    statusPrazo: "concluido",
  },
  {
    data: "14/12/2024",
    hora: "16:50",
    protocolo: "2024/12341",
    tipo: "Habite-se",
    origem: "Urbanismo",
    destino: "Requerente",
    acao: "Pendência Documental",
    responsavel: "Carlos Mendes",
    prazo: "10/12/2024",
    statusPrazo: "atrasado",
  },
  {
    data: "14/12/2024",
    hora: "15:30",
    protocolo: "2024/12340",
    tipo: "Aditivo Contratual",
    origem: "Secretaria Saúde",
    destino: "Procuradoria",
    acao: "Em Análise",
    responsavel: "Paula Oliveira",
    prazo: "28/12/2024",
    statusPrazo: "no-prazo",
  },
];

export const eventosRecentes = [
  {
    data: "15/12/2024",
    hora: "14:30",
    descricao: "Alvará 2024/12345 encaminhado para Urbanismo",
    tipo: "encaminhado",
  },
  {
    data: "15/12/2024",
    hora: "13:15",
    descricao: "Pedido LAI 2024/12344 criado via e-SIC",
    tipo: "criado",
  },
  {
    data: "15/12/2024",
    hora: "11:45",
    descricao: "Parecer Jurídico 2024/12343 solicitado por Compras",
    tipo: "pendencia",
  },
  {
    data: "15/12/2024",
    hora: "10:20",
    descricao: "Certidão Negativa 2024/12342 deferida",
    tipo: "concluido",
  },
  {
    data: "14/12/2024",
    hora: "16:50",
    descricao: "Habite-se 2024/12341 com pendência documental (ATRASADO)",
    tipo: "atrasado",
  },
  {
    data: "14/12/2024",
    hora: "15:30",
    descricao: "Aditivo 2024/12340 em análise na Procuradoria",
    tipo: "analise",
  },
];

export const backlogPorArea = [
  { area: "Tributação", abertos: 89, emAnalise: 45, total: 134 },
  { area: "Urbanismo", abertos: 56, emAnalise: 42, total: 98 },
  { area: "RH", abertos: 48, emAnalise: 45, total: 93 },
  { area: "Procuradoria", abertos: 38, emAnalise: 35, total: 73 },
  { area: "Controle Interno", abertos: 42, emAnalise: 30, total: 72 },
];

export const PROCESSOS_SNAPSHOT = {
  tiposProcesso,
  kpiData,
  entradasVsConclusoes,
  backlogPorStatus,
  tempoMedioPorTipo,
  distribuicaoPorArea,
  movimentacoesRecentes,
  eventosRecentes,
  backlogPorArea,
};
