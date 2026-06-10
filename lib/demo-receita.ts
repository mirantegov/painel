// Dados demonstrativos do módulo Receitas (extraídos do componente).
// Fallback e fonte do seed (mod_receita.dados). calcularTotais fica fora do snapshot.

export const receitasProprias = [
  {
    codigo: "1.1.1",
    nome: "IPTU",
    prevista: 18500000,
    arrecadada: 16800000,
    aArrecadar: 1700000,
  },
  {
    codigo: "1.1.2",
    nome: "ISS",
    prevista: 24200000,
    arrecadada: 26500000,
    aArrecadar: -2300000,
  },
  {
    codigo: "1.1.3",
    nome: "ITBI",
    prevista: 8900000,
    arrecadada: 7200000,
    aArrecadar: 1700000,
  },
  {
    codigo: "1.1.4",
    nome: "Taxas Diversas",
    prevista: 5600000,
    arrecadada: 4800000,
    aArrecadar: 800000,
  },
  {
    codigo: "1.1.5",
    nome: "Contribuicao de Melhoria",
    prevista: 1200000,
    arrecadada: 890000,
    aArrecadar: 310000,
  },
  {
    codigo: "1.1.6",
    nome: "COSIP",
    prevista: 3800000,
    arrecadada: 3650000,
    aArrecadar: 150000,
  },
];

// Dados de transferencias estaduais
export const receitasEstaduais = [
  {
    codigo: "2.1.1",
    nome: "ICMS",
    prevista: 32500000,
    arrecadada: 30800000,
    aArrecadar: 1700000,
  },
  {
    codigo: "2.1.2",
    nome: "IPVA",
    prevista: 12400000,
    arrecadada: 11200000,
    aArrecadar: 1200000,
  },
  {
    codigo: "2.1.3",
    nome: "IPI Exportacao",
    prevista: 2100000,
    arrecadada: 1850000,
    aArrecadar: 250000,
  },
  {
    codigo: "2.1.4",
    nome: "Outras Transferencias Estaduais",
    prevista: 4500000,
    arrecadada: 4100000,
    aArrecadar: 400000,
  },
];

// Dados de transferencias federais
export const receitasFederais = [
  {
    codigo: "3.1.1",
    nome: "FPM",
    prevista: 28500000,
    arrecadada: 27200000,
    aArrecadar: 1300000,
  },
  {
    codigo: "3.1.2",
    nome: "FUNDEB",
    prevista: 35600000,
    arrecadada: 34800000,
    aArrecadar: 800000,
  },
  {
    codigo: "3.1.3",
    nome: "SUS - Transferencias",
    prevista: 18900000,
    arrecadada: 17500000,
    aArrecadar: 1400000,
  },
  {
    codigo: "3.1.4",
    nome: "FNAS - Assistencia Social",
    prevista: 4200000,
    arrecadada: 3900000,
    aArrecadar: 300000,
  },
  {
    codigo: "3.1.5",
    nome: "Convenios Federais",
    prevista: 8500000,
    arrecadada: 5200000,
    aArrecadar: 3300000,
  },
  {
    codigo: "3.1.6",
    nome: "Outras Transferencias Federais",
    prevista: 3200000,
    arrecadada: 2800000,
    aArrecadar: 400000,
  },
];

// Outras receitas
export const outrasReceitas = [
  {
    codigo: "4.1.1",
    nome: "Receitas Patrimoniais",
    prevista: 2800000,
    arrecadada: 3100000,
    aArrecadar: -300000,
  },
  {
    codigo: "4.1.2",
    nome: "Receitas de Servicos",
    prevista: 1500000,
    arrecadada: 1350000,
    aArrecadar: 150000,
  },
  {
    codigo: "4.1.3",
    nome: "Multas e Juros",
    prevista: 1800000,
    arrecadada: 2100000,
    aArrecadar: -300000,
  },
  {
    codigo: "4.1.4",
    nome: "Divida Ativa",
    prevista: 3500000,
    arrecadada: 2800000,
    aArrecadar: 700000,
  },
  {
    codigo: "4.1.5",
    nome: "Outras Receitas Correntes",
    prevista: 1200000,
    arrecadada: 980000,
    aArrecadar: 220000,
  },
];

// Evolucao mensal
export const evolucaoMensal = [
  { mes: "Jan", prevista: 18500000, arrecadada: 17200000 },
  { mes: "Fev", prevista: 17800000, arrecadada: 16500000 },
  { mes: "Mar", prevista: 19200000, arrecadada: 20100000 },
  { mes: "Abr", prevista: 18600000, arrecadada: 17800000 },
  { mes: "Mai", prevista: 20100000, arrecadada: 19500000 },
  { mes: "Jun", prevista: 19500000, arrecadada: 18900000 },
  { mes: "Jul", prevista: 21200000, arrecadada: 20800000 },
  { mes: "Ago", prevista: 20800000, arrecadada: 21500000 },
  { mes: "Set", prevista: 22100000, arrecadada: 21200000 },
  { mes: "Out", prevista: 21500000, arrecadada: 20900000 },
  { mes: "Nov", prevista: 23000000, arrecadada: 22100000 },
];

// Comparativo anual
export const comparativoAnual = [
  { ano: "2020", prevista: 185000000, arrecadada: 172500000, percentual: 93.2 },
  { ano: "2021", prevista: 198500000, arrecadada: 189200000, percentual: 95.3 },
  { ano: "2022", prevista: 215600000, arrecadada: 208900000, percentual: 96.9 },
  { ano: "2023", prevista: 232400000, arrecadada: 224100000, percentual: 96.4 },
  { ano: "2024", prevista: 243900000, arrecadada: 228680000, percentual: 93.8 },
];

// Totais
export const calcularTotais = (
  dados: { prevista: number; arrecadada: number; aArrecadar: number }[],
) => {
  return dados.reduce(
    (acc, item) => ({
      prevista: acc.prevista + item.prevista,
      arrecadada: acc.arrecadada + item.arrecadada,
      aArrecadar: acc.aArrecadar + item.aArrecadar,
    }),
    { prevista: 0, arrecadada: 0, aArrecadar: 0 },
  );
};

export const totaisProprias = calcularTotais(receitasProprias);
export const totaisEstaduais = calcularTotais(receitasEstaduais);
export const totaisFederais = calcularTotais(receitasFederais);
export const totaisOutras = calcularTotais(outrasReceitas);

export const totaisGerais = {
  prevista:
    totaisProprias.prevista +
    totaisEstaduais.prevista +
    totaisFederais.prevista +
    totaisOutras.prevista,
  arrecadada:
    totaisProprias.arrecadada +
    totaisEstaduais.arrecadada +
    totaisFederais.arrecadada +
    totaisOutras.arrecadada,
  aArrecadar:
    totaisProprias.aArrecadar +
    totaisEstaduais.aArrecadar +
    totaisFederais.aArrecadar +
    totaisOutras.aArrecadar,
};

// Distribuicao por origem
export const distribuicaoOrigem = [
  {
    nome: "Receitas Próprias",
    valor: totaisProprias.arrecadada,
    fill: "var(--chart-1)",
  },
  {
    nome: "Transferencias Estaduais",
    valor: totaisEstaduais.arrecadada,
    fill: "var(--chart-2)",
  },
  {
    nome: "Transferencias Federais",
    valor: totaisFederais.arrecadada,
    fill: "var(--chart-3)",
  },
  {
    nome: "Outras Receitas",
    valor: totaisOutras.arrecadada,
    fill: "var(--chart-4)",
  },
];

// Top contribuintes (ficticios)
export const topContribuintes = [
  {
    nome: "Comercio Varejista Municipal Ltda",
    cnpj: "12.345.678/0001-90",
    valor: 2850000,
    tipo: "ISS",
  },
  {
    nome: "Construtora Regional SA",
    cnpj: "23.456.789/0001-01",
    valor: 1950000,
    tipo: "ISS/ITBI",
  },
  {
    nome: "Shopping Center Municipal",
    cnpj: "34.567.890/0001-12",
    valor: 1680000,
    tipo: "ISS/IPTU",
  },
  {
    nome: "Hospital e Maternidade Ltda",
    cnpj: "45.678.901/0001-23",
    valor: 1420000,
    tipo: "ISS",
  },
  {
    nome: "Industria Metalurgica Regional",
    cnpj: "56.789.012/0001-34",
    valor: 1180000,
    tipo: "ISS/IPTU",
  },
];

// Timeline de eventos
export const eventosReceita = [
  {
    data: "29/11/2024",
    evento: "Repasse FPM de R$ 2.8M creditado",
    tipo: "credito",
    origem: "Federal",
    valor: 2850000,
  },
  {
    data: "27/11/2024",
    evento: "Vencimento IPTU 10a parcela - R$ 1.2M arrecadado",
    tipo: "arrecadacao",
    origem: "Propria",
    valor: 1200000,
  },
  {
    data: "25/11/2024",
    evento: "Transferencia ICMS de R$ 3.1M",
    tipo: "credito",
    origem: "Estadual",
    valor: 3100000,
  },
  {
    data: "22/11/2024",
    evento: "Liberacao parcela FUNDEB R$ 2.9M",
    tipo: "credito",
    origem: "Federal",
    valor: 2900000,
  },
  {
    data: "20/11/2024",
    evento: "Arrecadação ISS competencia outubro R$ 2.1M",
    tipo: "arrecadacao",
    origem: "Propria",
    valor: 2100000,
  },
  {
    data: "18/11/2024",
    evento: "Recuperacao Divida Ativa R$ 450K",
    tipo: "arrecadacao",
    origem: "Divida",
    valor: 450000,
  },
];

// Metas de arrecadação
export const metasArrecadacao = [
  {
    indicador: "Taxa de Realizacao",
    meta: 95,
    realizado: 94,
    unidade: "%",
    status: "atencao",
    descricao: "Meta de arrecadacao total",
  },
  {
    indicador: "Receitas Próprias",
    meta: 28,
    realizado: 26.5,
    unidade: "%",
    status: "atingido",
    descricao: "% do total arrecadado",
  },
  {
    indicador: "Convenios Liberados",
    meta: 100,
    realizado: 61,
    unidade: "%",
    status: "atencao",
    descricao: "% dos convenios federais",
  },
  {
    indicador: "Divida Ativa Recuperada",
    meta: 2500000,
    realizado: 2800000,
    unidade: "R$",
    status: "atingido",
    descricao: "Meta anual superada",
  },
  {
    indicador: "Inadimplencia IPTU",
    meta: 15,
    realizado: 12,
    unidade: "%",
    status: "atingido",
    descricao: "Taxa maxima permitida",
  },
  {
    indicador: "Auto de Infracao Emitido",
    meta: 450,
    realizado: 523,
    unidade: "",
    status: "atingido",
    descricao: "Fiscalizacao tributaria",
  },
];
// Inadimplencia por tributo
export const inadimplencia = [
  {
    tributo: "IPTU",
    lancado: 18500000,
    arrecadado: 16800000,
    inadimplente: 1700000,
    percentual: 9.2,
    contribuintes: 3420,
  },
  {
    tributo: "ISS",
    lancado: 24200000,
    arrecadado: 26500000,
    inadimplente: 0,
    percentual: 0,
    contribuintes: 0,
  },
  {
    tributo: "ITBI",
    lancado: 8900000,
    arrecadado: 7200000,
    inadimplente: 1700000,
    percentual: 19.1,
    contribuintes: 285,
  },
  {
    tributo: "Taxas",
    lancado: 5600000,
    arrecadado: 4800000,
    inadimplente: 800000,
    percentual: 14.3,
    contribuintes: 1850,
  },
  {
    tributo: "COSIP",
    lancado: 3800000,
    arrecadado: 3650000,
    inadimplente: 150000,
    percentual: 3.9,
    contribuintes: 620,
  },
  {
    tributo: "Contrib. Melhoria",
    lancado: 1200000,
    arrecadado: 890000,
    inadimplente: 310000,
    percentual: 25.8,
    contribuintes: 145,
  },
];

export const totalInadimplencia = inadimplencia.reduce(
  (acc, i) => acc + i.inadimplente,
  0,
);
export const totalLancado = inadimplencia.reduce((acc, i) => acc + i.lancado, 0);
export const taxaInadimplenciaGeral = (
  (totalInadimplencia / totalLancado) *
  100
).toFixed(1);

// Sazonalidade (heatmap data - arrecadacao por mês e categoria)
export const sazonalidadeData = [
  {
    mes: "Jan",
    proprias: 4800000,
    estaduais: 3900000,
    federais: 7200000,
    outras: 1300000,
  },
  {
    mes: "Fev",
    proprias: 3200000,
    estaduais: 3700000,
    federais: 7800000,
    outras: 1100000,
  },
  {
    mes: "Mar",
    proprias: 6100000,
    estaduais: 4200000,
    federais: 8100000,
    outras: 1500000,
  },
  {
    mes: "Abr",
    proprias: 5800000,
    estaduais: 4000000,
    federais: 7500000,
    outras: 1200000,
  },
  {
    mes: "Mai",
    proprias: 5500000,
    estaduais: 4100000,
    federais: 7900000,
    outras: 1400000,
  },
  {
    mes: "Jun",
    proprias: 5200000,
    estaduais: 3800000,
    federais: 7600000,
    outras: 1300000,
  },
  {
    mes: "Jul",
    proprias: 5900000,
    estaduais: 4300000,
    federais: 8200000,
    outras: 1500000,
  },
  {
    mes: "Ago",
    proprias: 6200000,
    estaduais: 4500000,
    federais: 8500000,
    outras: 1600000,
  },
  {
    mes: "Set",
    proprias: 5700000,
    estaduais: 4200000,
    federais: 7800000,
    outras: 1400000,
  },
  {
    mes: "Out",
    proprias: 5400000,
    estaduais: 4100000,
    federais: 7700000,
    outras: 1350000,
  },
  {
    mes: "Nov",
    proprias: 5900000,
    estaduais: 4400000,
    federais: 8300000,
    outras: 1500000,
  },
];

// Receita Corrente vs Capital
export const receitaCorrenteCapital = [
  {
    tipo: "Receitas Correntes",
    valor: 210500000,
    percentual: 92.1,
    subcategorias: [
      { nome: "Tributaria", valor: 62200000 },
      { nome: "Contribuicoes", valor: 5000000 },
      { nome: "Patrimonial", valor: 3100000 },
      { nome: "Transferencias Correntes", valor: 131850000 },
      { nome: "Outras Correntes", valor: 8350000 },
    ],
  },
  {
    tipo: "Receitas de Capital",
    valor: 18180000,
    percentual: 7.9,
    subcategorias: [
      { nome: "Operacoes de Credito", valor: 5000000 },
      { nome: "Alienacao de Bens", valor: 1200000 },
      { nome: "Transferencias de Capital", valor: 8500000 },
      { nome: "Outras de Capital", valor: 3480000 },
    ],
  },
];

export const receitaCorrenteCapitalChart = [
  { nome: "Correntes", valor: 210500000, fill: "var(--chart-1)" },
  { nome: "Capital", valor: 18180000, fill: "var(--chart-3)" },
];

// Projecao de receita (forecast)
export const projecaoReceita = [
  { mes: "Jan", real: 17200000, projetado: null },
  { mes: "Fev", real: 16500000, projetado: null },
  { mes: "Mar", real: 20100000, projetado: null },
  { mes: "Abr", real: 17800000, projetado: null },
  { mes: "Mai", real: 19500000, projetado: null },
  { mes: "Jun", real: 18900000, projetado: null },
  { mes: "Jul", real: 20800000, projetado: null },
  { mes: "Ago", real: 21500000, projetado: null },
  { mes: "Set", real: 21200000, projetado: null },
  { mes: "Out", real: 20900000, projetado: null },
  { mes: "Nov", real: 22100000, projetado: 22100000 },
  { mes: "Dez", real: null, projetado: 23400000 },
];

export const totalProjetado = projecaoReceita.reduce(
  (acc, m) => acc + (m.real || m.projetado || 0),
  0,
);

// Benchmark com municipios similares
export const benchmarkMunicipios = [
  {
    municipio: "Município Atual",
    receitaPerCapita: 2286,
    autonomia: 26.5,
    realizacao: 93.8,
    inadimplencia: 7.6,
    destaque: true,
  },
  {
    municipio: "Município A (Similar)",
    receitaPerCapita: 2150,
    autonomia: 22.3,
    realizacao: 91.2,
    inadimplencia: 12.4,
    destaque: false,
  },
  {
    municipio: "Município B (Similar)",
    receitaPerCapita: 2420,
    autonomia: 29.8,
    realizacao: 95.1,
    inadimplencia: 8.9,
    destaque: false,
  },
  {
    municipio: "Município C (Similar)",
    receitaPerCapita: 1980,
    autonomia: 19.5,
    realizacao: 89.5,
    inadimplencia: 15.2,
    destaque: false,
  },
  {
    municipio: "Média Regional",
    receitaPerCapita: 2180,
    autonomia: 24.2,
    realizacao: 92.4,
    inadimplencia: 11.0,
    destaque: false,
  },
];

export const benchmarkChart = [
  { indicador: "Rec. Per Capita", atual: 100, mediaRegional: 95.4 },
  { indicador: "Autonomia", atual: 100, mediaRegional: 91.3 },
  { indicador: "Realizacao", atual: 100, mediaRegional: 98.5 },
  { indicador: "Inadimplencia", atual: 100, mediaRegional: 144.7 },
];

// Dados por período para filtros
export const dadosPorPeriodo: Record<
  string,
  {
    receitasProprias: typeof receitasProprias;
    receitasEstaduais: typeof receitasEstaduais;
    receitasFederais: typeof receitasFederais;
    outrasReceitas: typeof outrasReceitas;
    evolucaoMensal: typeof evolucaoMensal;
    topContribuintes: typeof topContribuintes;
    eventosReceita: typeof eventosReceita;
    comparativoAnual: typeof comparativoAnual;
  }
> = {
  "2024": {
    receitasProprias,
    receitasEstaduais,
    receitasFederais,
    outrasReceitas,
    evolucaoMensal,
    topContribuintes,
    eventosReceita,
    comparativoAnual,
  },
  "2023": {
    receitasProprias: receitasProprias.map((r) => ({
      ...r,
      prevista: r.prevista * 0.92,
      arrecadada: r.arrecadada * 0.89,
      aArrecadar: r.prevista * 0.92 - r.arrecadada * 0.89,
    })),
    receitasEstaduais: receitasEstaduais.map((r) => ({
      ...r,
      prevista: r.prevista * 0.9,
      arrecadada: r.arrecadada * 0.88,
      aArrecadar: r.prevista * 0.9 - r.arrecadada * 0.88,
    })),
    receitasFederais: receitasFederais.map((r) => ({
      ...r,
      prevista: r.prevista * 0.88,
      arrecadada: r.arrecadada * 0.87,
      aArrecadar: r.prevista * 0.88 - r.arrecadada * 0.87,
    })),
    outrasReceitas: outrasReceitas.map((r) => ({
      ...r,
      prevista: r.prevista * 0.95,
      arrecadada: r.arrecadada * 0.93,
      aArrecadar: r.prevista * 0.95 - r.arrecadada * 0.93,
    })),
    evolucaoMensal: evolucaoMensal.map((e) => ({
      ...e,
      prevista: e.prevista * 0.92,
      arrecadada: e.arrecadada * 0.89,
    })),
    topContribuintes: topContribuintes.map((t) => ({
      ...t,
      valor: t.valor * 0.91,
    })),
    eventosReceita: eventosReceita.map((e) => ({
      ...e,
      data: e.data.replace(/2024/g, "2023"),
    })),
    comparativoAnual: comparativoAnual.filter((c) => c.ano !== "2024"),
  },
  "2022": {
    receitasProprias: receitasProprias.map((r) => ({
      ...r,
      prevista: r.prevista * 0.84,
      arrecadada: r.arrecadada * 0.81,
      aArrecadar: r.prevista * 0.84 - r.arrecadada * 0.81,
    })),
    receitasEstaduais: receitasEstaduais.map((r) => ({
      ...r,
      prevista: r.prevista * 0.82,
      arrecadada: r.arrecadada * 0.8,
      aArrecadar: r.prevista * 0.82 - r.arrecadada * 0.8,
    })),
    receitasFederais: receitasFederais.map((r) => ({
      ...r,
      prevista: r.prevista * 0.8,
      arrecadada: r.arrecadada * 0.79,
      aArrecadar: r.prevista * 0.8 - r.arrecadada * 0.79,
    })),
    outrasReceitas: outrasReceitas.map((r) => ({
      ...r,
      prevista: r.prevista * 0.88,
      arrecadada: r.arrecadada * 0.86,
      aArrecadar: r.prevista * 0.88 - r.arrecadada * 0.86,
    })),
    evolucaoMensal: evolucaoMensal.map((e) => ({
      ...e,
      prevista: e.prevista * 0.84,
      arrecadada: e.arrecadada * 0.81,
    })),
    topContribuintes: topContribuintes.map((t) => ({
      ...t,
      valor: t.valor * 0.83,
    })),
    eventosReceita: eventosReceita.map((e) => ({
      ...e,
      data: e.data.replace(/2024/g, "2022"),
    })),
    comparativoAnual: comparativoAnual.filter(
      (c) => c.ano !== "2024" && c.ano !== "2023",
    ),
  },
};

export const RECEITA_SNAPSHOT = {
  receitasProprias,
  receitasEstaduais,
  receitasFederais,
  outrasReceitas,
  evolucaoMensal,
  comparativoAnual,
  totaisProprias,
  totaisEstaduais,
  totaisFederais,
  totaisOutras,
  totaisGerais,
  distribuicaoOrigem,
  topContribuintes,
  eventosReceita,
  metasArrecadacao,
  inadimplencia,
  totalInadimplencia,
  totalLancado,
  taxaInadimplenciaGeral,
  sazonalidadeData,
  receitaCorrenteCapital,
  receitaCorrenteCapitalChart,
  projecaoReceita,
  totalProjetado,
  benchmarkMunicipios,
  benchmarkChart,
  dadosPorPeriodo,
};
