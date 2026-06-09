// Dados demo do módulo obras.
// Snapshot serializável servido de mod_obras (jsonb). Sem funções/JSX.

// ── Dados mock ──────────────────────────────────────────────────────────────

type StatusObra =
  | "em_andamento"
  | "concluida"
  | "paralisada"
  | "nao_iniciada"
  | "atrasada";

type Obra = {
  id: string;
  nome: string;
  tipo: string;
  secretaria: string;
  construtora: string;
  contrato: string;
  valorContratado: number;
  valorMedido: number;
  valorPago: number;
  execucaoFisica: number;
  execucaoFinanceira: number;
  prazoInicial: string;
  prazoAtual: string;
  status: StatusObra;
  fonte: string;
  bairro: string;
  aditivos: number;
};

export const obras: Obra[] = [
  {
    id: "OBR-001",
    nome: "Pavimentação da Av. Principal",
    tipo: "Pavimentação",
    secretaria: "SEMINF",
    construtora: "Construtora Silva & Associados",
    contrato: "CT-2024/045",
    valorContratado: 4500000,
    valorMedido: 3375000,
    valorPago: 3150000,
    execucaoFisica: 78.5,
    execucaoFinanceira: 75.0,
    prazoInicial: "15/03/2024",
    prazoAtual: "15/12/2024",
    status: "em_andamento",
    fonte: "Convênio Federal",
    bairro: "Centro",
    aditivos: 1,
  },
  {
    id: "OBR-002",
    nome: "Construção da UBS Vila Nova",
    tipo: "Edificação",
    secretaria: "SEMSA",
    construtora: "Engenharia Beta Ltda",
    contrato: "CT-2024/032",
    valorContratado: 2800000,
    valorMedido: 2800000,
    valorPago: 2660000,
    execucaoFisica: 100.0,
    execucaoFinanceira: 95.0,
    prazoInicial: "01/02/2024",
    prazoAtual: "30/09/2024",
    status: "concluida",
    fonte: "Recurso Próprio",
    bairro: "Vila Nova",
    aditivos: 0,
  },
  {
    id: "OBR-003",
    nome: "Reforma da Escola Municipal Rui Barbosa",
    tipo: "Reforma",
    secretaria: "SEMED",
    construtora: "Alfa Construções",
    contrato: "CT-2024/051",
    valorContratado: 1200000,
    valorMedido: 480000,
    valorPago: 480000,
    execucaoFisica: 42.0,
    execucaoFinanceira: 40.0,
    prazoInicial: "01/06/2024",
    prazoAtual: "30/11/2024",
    status: "atrasada",
    fonte: "FUNDEB",
    bairro: "São José",
    aditivos: 2,
  },
  {
    id: "OBR-004",
    nome: "Drenagem do Igarapé São Raimundo",
    tipo: "Drenagem",
    secretaria: "SEMINF",
    construtora: "Hidro Engenharia SA",
    contrato: "CT-2024/028",
    valorContratado: 6200000,
    valorMedido: 5580000,
    valorPago: 5270000,
    execucaoFisica: 92.0,
    execucaoFinanceira: 90.0,
    prazoInicial: "10/01/2024",
    prazoAtual: "31/12/2024",
    status: "em_andamento",
    fonte: "Convênio Estadual",
    bairro: "São Raimundo",
    aditivos: 1,
  },
  {
    id: "OBR-005",
    nome: "Construção da Quadra Poliesportiva",
    tipo: "Edificação",
    secretaria: "SEMED",
    construtora: "Esporte Engenharia",
    contrato: "CT-2024/060",
    valorContratado: 980000,
    valorMedido: 0,
    valorPago: 0,
    execucaoFisica: 0.0,
    execucaoFinanceira: 0.0,
    prazoInicial: "01/12/2024",
    prazoAtual: "30/06/2025",
    status: "nao_iniciada",
    fonte: "Emenda Parlamentar",
    bairro: "Parque das Flores",
    aditivos: 0,
  },
  {
    id: "OBR-006",
    nome: "Ponte sobre o Rio Tarumã",
    tipo: "Ponte/Viaduto",
    secretaria: "SEMINF",
    construtora: "Pontes Brasil Engenharia",
    contrato: "CT-2023/089",
    valorContratado: 8500000,
    valorMedido: 2550000,
    valorPago: 2550000,
    execucaoFisica: 28.0,
    execucaoFinanceira: 30.0,
    prazoInicial: "15/08/2023",
    prazoAtual: "15/08/2025",
    status: "paralisada",
    fonte: "Convênio Federal",
    bairro: "Tarumã",
    aditivos: 3,
  },
  {
    id: "OBR-007",
    nome: "Revitalização da Praça da Matriz",
    tipo: "Urbanização",
    secretaria: "SEMINF",
    construtora: "Construtora Silva & Associados",
    contrato: "CT-2024/055",
    valorContratado: 1850000,
    valorMedido: 1295000,
    valorPago: 1110000,
    execucaoFisica: 68.0,
    execucaoFinanceira: 70.0,
    prazoInicial: "01/04/2024",
    prazoAtual: "28/02/2025",
    status: "em_andamento",
    fonte: "Recurso Próprio",
    bairro: "Centro",
    aditivos: 0,
  },
  {
    id: "OBR-008",
    nome: "Ampliação do CRAS Zona Norte",
    tipo: "Reforma",
    secretaria: "SEMAS",
    construtora: "Alfa Construções",
    contrato: "CT-2024/042",
    valorContratado: 750000,
    valorMedido: 750000,
    valorPago: 712500,
    execucaoFisica: 100.0,
    execucaoFinanceira: 95.0,
    prazoInicial: "01/03/2024",
    prazoAtual: "31/08/2024",
    status: "concluida",
    fonte: "Convênio Federal",
    bairro: "Cidade Nova",
    aditivos: 0,
  },
  {
    id: "OBR-009",
    nome: "Sistema de Esgotamento Sanitário - Etapa 2",
    tipo: "Saneamento",
    secretaria: "SEMINF",
    construtora: "Hidro Engenharia SA",
    contrato: "CT-2024/019",
    valorContratado: 12800000,
    valorMedido: 8320000,
    valorPago: 7680000,
    execucaoFisica: 62.5,
    execucaoFinanceira: 65.0,
    prazoInicial: "01/01/2024",
    prazoAtual: "30/06/2025",
    status: "em_andamento",
    fonte: "Financiamento CEF",
    bairro: "Diversos",
    aditivos: 1,
  },
  {
    id: "OBR-010",
    nome: "Recapeamento da Rua das Flores",
    tipo: "Pavimentação",
    secretaria: "SEMINF",
    construtora: "Engenharia Beta Ltda",
    contrato: "CT-2024/071",
    valorContratado: 620000,
    valorMedido: 620000,
    valorPago: 589000,
    execucaoFisica: 100.0,
    execucaoFinanceira: 95.0,
    prazoInicial: "15/05/2024",
    prazoAtual: "15/07/2024",
    status: "concluida",
    fonte: "Recurso Próprio",
    bairro: "Jardim Europa",
    aditivos: 0,
  },
];

// Totais calculados
export const totalContratado = obras.reduce((a, b) => a + b.valorContratado, 0);

export const totalMedido = obras.reduce((a, b) => a + b.valorMedido, 0);

export const totalPago = obras.reduce((a, b) => a + b.valorPago, 0);

export const obrasAndamento = obras.filter(
  (o) => o.status === "em_andamento",
).length;

export const obrasConcluidas = obras.filter(
  (o) => o.status === "concluida",
).length;

export const obrasParalisadas = obras.filter(
  (o) => o.status === "paralisada",
).length;

export const obrasAtrasadas = obras.filter(
  (o) => o.status === "atrasada",
).length;

export const obrasNaoIniciadas = obras.filter(
  (o) => o.status === "nao_iniciada",
).length;

export const execucaoFisicaMedia =
  obras
    .filter((o) => o.status !== "nao_iniciada")
    .reduce((a, b) => a + b.execucaoFisica, 0) /
  obras.filter((o) => o.status !== "nao_iniciada").length;

// Obras por tipo (PieChart)
export const obrasPorTipo = [
  {
    tipo: "Pavimentação",
    quantidade: obras.filter((o) => o.tipo === "Pavimentação").length,
    valor: obras
      .filter((o) => o.tipo === "Pavimentação")
      .reduce((a, b) => a + b.valorContratado, 0),
    fill: "var(--chart-1)",
  },
  {
    tipo: "Edificação",
    quantidade: obras.filter((o) => o.tipo === "Edificação").length,
    valor: obras
      .filter((o) => o.tipo === "Edificação")
      .reduce((a, b) => a + b.valorContratado, 0),
    fill: "var(--chart-2)",
  },
  {
    tipo: "Reforma",
    quantidade: obras.filter((o) => o.tipo === "Reforma").length,
    valor: obras
      .filter((o) => o.tipo === "Reforma")
      .reduce((a, b) => a + b.valorContratado, 0),
    fill: "var(--chart-3)",
  },
  {
    tipo: "Drenagem/Saneam.",
    quantidade: obras.filter((o) => ["Drenagem", "Saneamento"].includes(o.tipo))
      .length,
    valor: obras
      .filter((o) => ["Drenagem", "Saneamento"].includes(o.tipo))
      .reduce((a, b) => a + b.valorContratado, 0),
    fill: "var(--chart-4)",
  },
  {
    tipo: "Outros",
    quantidade: obras.filter((o) =>
      ["Ponte/Viaduto", "Urbanização"].includes(o.tipo),
    ).length,
    valor: obras
      .filter((o) => ["Ponte/Viaduto", "Urbanização"].includes(o.tipo))
      .reduce((a, b) => a + b.valorContratado, 0),
    fill: "var(--chart-5)",
  },
];

export const chartConfigTipo = {
  Pavimentação: { label: "Pavimentação", color: "var(--chart-1)" },
  Edificação: { label: "Edificação", color: "var(--chart-2)" },
  Reforma: { label: "Reforma", color: "var(--chart-3)" },
  "Drenagem/Saneam.": { label: "Drenagem/Saneam.", color: "var(--chart-4)" },
  Outros: { label: "Outros", color: "var(--chart-5)" },
};

// Obras por status (PieChart)
export const obrasPorStatus = [
  {
    status: "Em Andamento",
    quantidade: obrasAndamento,
    fill: "var(--chart-1)",
  },
  { status: "Concluídas", quantidade: obrasConcluidas, fill: "var(--chart-2)" },
  {
    status: "Paralisadas",
    quantidade: obrasParalisadas,
    fill: "var(--chart-4)",
  },
  { status: "Atrasadas", quantidade: obrasAtrasadas, fill: "var(--chart-5)" },
  {
    status: "Não Iniciadas",
    quantidade: obrasNaoIniciadas,
    fill: "var(--chart-3)",
  },
];

export const chartConfigStatus = {
  "Em Andamento": { label: "Em Andamento", color: "var(--chart-1)" },
  Concluídas: { label: "Concluídas", color: "var(--chart-2)" },
  Paralisadas: { label: "Paralisadas", color: "var(--chart-4)" },
  Atrasadas: { label: "Atrasadas", color: "var(--chart-5)" },
  "Não Iniciadas": { label: "Não Iniciadas", color: "var(--chart-3)" },
};

// Execução mensal acumulada (AreaChart)
export const execucaoMensal = [
  {
    mes: "Jan",
    fisico: 8.2,
    financeiro: 6.5,
    acumuladoFisico: 8.2,
    acumuladoFinanceiro: 6.5,
  },
  {
    mes: "Fev",
    fisico: 6.8,
    financeiro: 7.1,
    acumuladoFisico: 15.0,
    acumuladoFinanceiro: 13.6,
  },
  {
    mes: "Mar",
    fisico: 7.5,
    financeiro: 8.0,
    acumuladoFisico: 22.5,
    acumuladoFinanceiro: 21.6,
  },
  {
    mes: "Abr",
    fisico: 9.1,
    financeiro: 8.5,
    acumuladoFisico: 31.6,
    acumuladoFinanceiro: 30.1,
  },
  {
    mes: "Mai",
    fisico: 8.0,
    financeiro: 7.8,
    acumuladoFisico: 39.6,
    acumuladoFinanceiro: 37.9,
  },
  {
    mes: "Jun",
    fisico: 7.2,
    financeiro: 7.5,
    acumuladoFisico: 46.8,
    acumuladoFinanceiro: 45.4,
  },
  {
    mes: "Jul",
    fisico: 6.5,
    financeiro: 6.0,
    acumuladoFisico: 53.3,
    acumuladoFinanceiro: 51.4,
  },
  {
    mes: "Ago",
    fisico: 7.8,
    financeiro: 7.2,
    acumuladoFisico: 61.1,
    acumuladoFinanceiro: 58.6,
  },
  {
    mes: "Set",
    fisico: 5.5,
    financeiro: 6.0,
    acumuladoFisico: 66.6,
    acumuladoFinanceiro: 64.6,
  },
  {
    mes: "Out",
    fisico: 4.2,
    financeiro: 4.8,
    acumuladoFisico: 70.8,
    acumuladoFinanceiro: 69.4,
  },
  {
    mes: "Nov",
    fisico: 3.5,
    financeiro: 3.1,
    acumuladoFisico: 74.3,
    acumuladoFinanceiro: 72.5,
  },
];

export const chartConfigExecucao = {
  acumuladoFisico: { label: "Exec. Física (%)", color: "var(--chart-1)" },
  acumuladoFinanceiro: {
    label: "Exec. Financeira (%)",
    color: "var(--chart-3)",
  },
};

// Medições realizadas
export const medicoes = [
  {
    obra: "OBR-001",
    nomeObra: "Pavimentação da Av. Principal",
    medicao: 6,
    periodo: "Out/2024",
    valorMedido: 425000,
    valorAcumulado: 3375000,
    percentualFisico: 78.5,
    fiscal: "Eng. Carlos Mendes",
    status: "aprovada",
  },
  {
    obra: "OBR-009",
    nomeObra: "Sist. Esgotamento Sanitário - Et. 2",
    medicao: 9,
    periodo: "Nov/2024",
    valorMedido: 680000,
    valorAcumulado: 8320000,
    percentualFisico: 62.5,
    fiscal: "Eng. Ana Sousa",
    status: "em_analise",
  },
  {
    obra: "OBR-004",
    nomeObra: "Drenagem do Igarapé São Raimundo",
    medicao: 8,
    periodo: "Nov/2024",
    valorMedido: 520000,
    valorAcumulado: 5580000,
    percentualFisico: 92.0,
    fiscal: "Eng. Roberto Lima",
    status: "aprovada",
  },
  {
    obra: "OBR-007",
    nomeObra: "Revitalização da Praça da Matriz",
    medicao: 5,
    periodo: "Nov/2024",
    valorMedido: 185000,
    valorAcumulado: 1295000,
    percentualFisico: 68.0,
    fiscal: "Eng. Mariana Costa",
    status: "aprovada",
  },
  {
    obra: "OBR-003",
    nomeObra: "Reforma da Escola Rui Barbosa",
    medicao: 3,
    periodo: "Out/2024",
    valorMedido: 120000,
    valorAcumulado: 480000,
    percentualFisico: 42.0,
    fiscal: "Eng. Carlos Mendes",
    status: "reprovada",
  },
  {
    obra: "OBR-006",
    nomeObra: "Ponte sobre o Rio Tarumã",
    medicao: 4,
    periodo: "Jun/2024",
    valorMedido: 0,
    valorAcumulado: 2550000,
    percentualFisico: 28.0,
    fiscal: "Eng. Roberto Lima",
    status: "paralisada",
  },
];

// Aditivos contratuais
export const aditivos = [
  {
    obra: "OBR-001",
    nomeObra: "Pavimentação da Av. Principal",
    tipoAditivo: "Prazo",
    numero: 1,
    justificativa: "Atraso na desapropriação de terreno lindeiro",
    diasAcrescidos: 60,
    valorAcrescido: 0,
    dataAprovacao: "15/08/2024",
  },
  {
    obra: "OBR-003",
    nomeObra: "Reforma da Escola Rui Barbosa",
    tipoAditivo: "Valor",
    numero: 1,
    justificativa: "Reforço estrutural não previsto em projeto",
    diasAcrescidos: 0,
    valorAcrescido: 145000,
    dataAprovacao: "10/09/2024",
  },
  {
    obra: "OBR-003",
    nomeObra: "Reforma da Escola Rui Barbosa",
    tipoAditivo: "Prazo",
    numero: 2,
    justificativa: "Período chuvoso acima da média",
    diasAcrescidos: 45,
    valorAcrescido: 0,
    dataAprovacao: "25/10/2024",
  },
  {
    obra: "OBR-004",
    nomeObra: "Drenagem do Igarapé São Raimundo",
    tipoAditivo: "Valor e Prazo",
    numero: 1,
    justificativa: "Adequação de projeto por nível freático",
    diasAcrescidos: 30,
    valorAcrescido: 380000,
    dataAprovacao: "20/07/2024",
  },
  {
    obra: "OBR-006",
    nomeObra: "Ponte sobre o Rio Tarumã",
    tipoAditivo: "Prazo",
    numero: 1,
    justificativa: "Atraso na entrega de perfis metálicos",
    diasAcrescidos: 90,
    valorAcrescido: 0,
    dataAprovacao: "12/03/2024",
  },
  {
    obra: "OBR-006",
    nomeObra: "Ponte sobre o Rio Tarumã",
    tipoAditivo: "Valor",
    numero: 2,
    justificativa: "Reajuste contratual por índice SINAPI",
    diasAcrescidos: 0,
    valorAcrescido: 510000,
    dataAprovacao: "01/06/2024",
  },
  {
    obra: "OBR-006",
    nomeObra: "Ponte sobre o Rio Tarumã",
    tipoAditivo: "Prazo",
    numero: 3,
    justificativa: "Paralisação judicial — embargo ambiental",
    diasAcrescidos: 180,
    valorAcrescido: 0,
    dataAprovacao: "15/09/2024",
  },
  {
    obra: "OBR-009",
    nomeObra: "Sist. Esgotamento Sanitário - Et. 2",
    tipoAditivo: "Valor e Prazo",
    numero: 1,
    justificativa: "Inclusão de ligações domiciliares extras",
    diasAcrescidos: 60,
    valorAcrescido: 920000,
    dataAprovacao: "15/05/2024",
  },
];

// Fiscalizações
export const fiscalizacoes = [
  {
    obra: "OBR-001",
    nomeObra: "Pavimentação da Av. Principal",
    data: "28/11/2024",
    fiscal: "Eng. Carlos Mendes",
    tipo: "Rotina",
    conformidades: 12,
    naoConformidades: 1,
    parecer: "conforme",
    observacao:
      "Base compactada dentro dos parâmetros. Uma junta de dilatação fora do alinhamento.",
  },
  {
    obra: "OBR-009",
    nomeObra: "Sist. Esgotamento Sanitário - Et. 2",
    data: "27/11/2024",
    fiscal: "Eng. Ana Sousa",
    tipo: "Medição",
    conformidades: 15,
    naoConformidades: 0,
    parecer: "conforme",
    observacao:
      "Tubulação assentada conforme projeto. Ensaios de estanqueidade aprovados.",
  },
  {
    obra: "OBR-003",
    nomeObra: "Reforma da Escola Rui Barbosa",
    data: "25/11/2024",
    fiscal: "Eng. Carlos Mendes",
    tipo: "Especial",
    conformidades: 8,
    naoConformidades: 4,
    parecer: "nao_conforme",
    observacao:
      "Atraso no cronograma superior a 30%. Materiais estocados sem cobertura adequada.",
  },
  {
    obra: "OBR-004",
    nomeObra: "Drenagem do Igarapé São Raimundo",
    data: "26/11/2024",
    fiscal: "Eng. Roberto Lima",
    tipo: "Rotina",
    conformidades: 14,
    naoConformidades: 0,
    parecer: "conforme",
    observacao: "Execução compatível com cronograma. Mão de obra adequada.",
  },
  {
    obra: "OBR-007",
    nomeObra: "Revitalização da Praça da Matriz",
    data: "22/11/2024",
    fiscal: "Eng. Mariana Costa",
    tipo: "Rotina",
    conformidades: 10,
    naoConformidades: 2,
    parecer: "conforme_com_ressalvas",
    observacao:
      "Piso intertravado com padrão correto. Paisagismo pendente na ala leste.",
  },
  {
    obra: "OBR-006",
    nomeObra: "Ponte sobre o Rio Tarumã",
    data: "15/09/2024",
    fiscal: "Eng. Roberto Lima",
    tipo: "Paralisação",
    conformidades: 5,
    naoConformidades: 3,
    parecer: "paralisada",
    observacao:
      "Obra paralisada por embargo ambiental. Aguardando decisão do órgão competente.",
  },
];

// Obras por fonte de recurso (BarChart)
export const obrasPorFonte = [
  {
    fonte: "Conv. Federal",
    quantidade: 3,
    valor: 14050000,
  },
  {
    fonte: "Recurso Próprio",
    quantidade: 3,
    valor: 5270000,
  },
  {
    fonte: "Conv. Estadual",
    quantidade: 1,
    valor: 6200000,
  },
  {
    fonte: "Financ. CEF",
    quantidade: 1,
    valor: 12800000,
  },
  {
    fonte: "FUNDEB",
    quantidade: 1,
    valor: 1200000,
  },
  {
    fonte: "Emenda Parl.",
    quantidade: 1,
    valor: 980000,
  },
];

export const chartConfigFonte = {
  valor: { label: "Valor (R$)", color: "var(--chart-1)" },
};

// Metas de gestão de obras
export const metasObras = [
  {
    indicador: "Obras Concluídas no Prazo",
    meta: 80,
    realizado: 75,
    unidade: "%",
    status: "atencao",
    descricao: "Percentual de obras finalizadas dentro do prazo contratual",
  },
  {
    indicador: "Execução Física Média",
    meta: 70,
    realizado: Number(execucaoFisicaMedia.toFixed(1)),
    unidade: "%",
    status: execucaoFisicaMedia >= 70 ? "atingido" : "atencao",
    descricao: "Média ponderada do avanço físico das obras ativas",
  },
  {
    indicador: "Medições Aprovadas",
    meta: 95,
    realizado: 83.3,
    unidade: "%",
    status: "atencao",
    descricao: "Percentual de medições aprovadas sem ressalvas",
  },
  {
    indicador: "Fiscalizações em Dia",
    meta: 100,
    realizado: 91.7,
    unidade: "%",
    status: "atencao",
    descricao: "Vistorias realizadas dentro do calendário previsto",
  },
  {
    indicador: "Aditivos por Obra",
    meta: 1.0,
    realizado: 0.8,
    unidade: "",
    status: "atingido",
    descricao: "Média de termos aditivos por contrato de obra",
  },
  {
    indicador: "Conformidade Fiscal",
    meta: 90,
    realizado: 92.3,
    unidade: "%",
    status: "atingido",
    descricao: "Itens em conformidade nas vistorias de campo",
  },
];

// Alertas
// Eventos recentes (Timeline)
export const eventosRecentes = [
  {
    data: "28/11/2024",
    hora: "16:30",
    descricao: "Fiscalização de rotina — Pavimentação Av. Principal",
    tipo: "fiscalizacao",
  },
  {
    data: "27/11/2024",
    hora: "14:00",
    descricao: "9ª Medição enviada — Sist. Esgotamento Sanitário",
    tipo: "medicao",
  },
  {
    data: "26/11/2024",
    hora: "11:20",
    descricao: "Fiscalização de rotina — Drenagem Ig. São Raimundo",
    tipo: "fiscalizacao",
  },
  {
    data: "25/11/2024",
    hora: "15:45",
    descricao: "Fiscalização especial — Escola Rui Barbosa (não conforme)",
    tipo: "alerta",
  },
  {
    data: "25/10/2024",
    hora: "09:00",
    descricao: "Aditivo nº 2 aprovado — Escola Rui Barbosa (prazo +45 dias)",
    tipo: "aditivo",
  },
  {
    data: "22/11/2024",
    hora: "10:30",
    descricao: "Fiscalização de rotina — Praça da Matriz (ressalvas)",
    tipo: "fiscalizacao",
  },
  {
    data: "20/11/2024",
    hora: "08:00",
    descricao: "Ordem de Serviço emitida — Quadra Poliesportiva (OBR-005)",
    tipo: "ordem",
  },
];

// Construtoras / Ranking
export const rankingConstrutoras = [
  {
    nome: "Construtora Silva & Associados",
    cnpj: "12.345.678/0001-90",
    obrasAtivas: 2,
    valorTotal: 6350000,
    execucaoMedia: 73.3,
    aditivosTotal: 1,
    conformidade: 94.5,
  },
  {
    nome: "Hidro Engenharia SA",
    cnpj: "23.456.789/0001-01",
    obrasAtivas: 2,
    valorTotal: 19000000,
    execucaoMedia: 77.3,
    aditivosTotal: 2,
    conformidade: 96.2,
  },
  {
    nome: "Engenharia Beta Ltda",
    cnpj: "34.567.890/0001-12",
    obrasAtivas: 0,
    valorTotal: 3420000,
    execucaoMedia: 100.0,
    aditivosTotal: 0,
    conformidade: 98.0,
  },
  {
    nome: "Alfa Construções",
    cnpj: "45.678.901/0001-23",
    obrasAtivas: 1,
    valorTotal: 1950000,
    execucaoMedia: 71.0,
    aditivosTotal: 2,
    conformidade: 78.5,
  },
  {
    nome: "Pontes Brasil Engenharia",
    cnpj: "56.789.012/0001-34",
    obrasAtivas: 0,
    valorTotal: 8500000,
    execucaoMedia: 28.0,
    aditivosTotal: 3,
    conformidade: 62.5,
  },
];

export const OBRAS_SNAPSHOT = {
  obras,
  totalContratado,
  totalMedido,
  totalPago,
  obrasAndamento,
  obrasConcluidas,
  obrasParalisadas,
  obrasAtrasadas,
  obrasNaoIniciadas,
  execucaoFisicaMedia,
  obrasPorTipo,
  chartConfigTipo,
  obrasPorStatus,
  chartConfigStatus,
  execucaoMensal,
  chartConfigExecucao,
  medicoes,
  aditivos,
  fiscalizacoes,
  obrasPorFonte,
  chartConfigFonte,
  metasObras,
  eventosRecentes,
  rankingConstrutoras,
};
