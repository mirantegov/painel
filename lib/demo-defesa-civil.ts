// Dados demo do módulo Defesa Civil.
// Snapshot serializável servido de mod_defesa_civil (jsonb). Sem funções/JSX.

type NivelAlerta =
  | "normal"
  | "observacao"
  | "atencao"
  | "alerta"
  | "emergencia";

// ─── Dados demo — Monitoramento ───────────────────────────────────────────────

const NIVEL_ATUAL: NivelAlerta = "atencao";

const chuvaHistorico = [
  { dia: "Dom", mm: 8 },
  { dia: "Seg", mm: 14 },
  { dia: "Ter", mm: 6 },
  { dia: "Qua", mm: 31 },
  { dia: "Qui", mm: 48 },
  { dia: "Sex", mm: 52 },
  { dia: "Sáb", mm: 19 },
];

const nivelRioHistorico = [
  { hora: "00h", nivel: 42 },
  { hora: "02h", nivel: 45 },
  { hora: "04h", nivel: 49 },
  { hora: "06h", nivel: 53 },
  { hora: "08h", nivel: 58 },
  { hora: "10h", nivel: 63 },
  { hora: "12h", nivel: 68 },
  { hora: "14h", nivel: 65 },
  { hora: "16h", nivel: 62 },
  { hora: "18h", nivel: 60 },
  { hora: "20h", nivel: 61 },
  { hora: "22h", nivel: 64 },
];

const previsao5dias = [
  { dia: "Sáb", tMin: 19, tMax: 26, chuva: 19, icon: "🌦️" },
  { dia: "Dom", tMin: 21, tMax: 28, chuva: 32, icon: "🌧️" },
  { dia: "Seg", tMin: 20, tMax: 25, chuva: 45, icon: "⛈️" },
  { dia: "Ter", tMin: 18, tMax: 24, chuva: 28, icon: "🌦️" },
  { dia: "Qua", tMin: 17, tMax: 23, chuva: 8, icon: "🌤️" },
];

const comunidadesRisco = [
  {
    nome: "Vila Ribeirinha",
    nivel: "alerta" as NivelAlerta,
    familias: 312,
    tipo: "Enchente",
  },
  {
    nome: "Jardim das Pedras",
    nivel: "atencao" as NivelAlerta,
    familias: 148,
    tipo: "Deslizamento",
  },
  {
    nome: "Bairro Santa Cruz",
    nivel: "atencao" as NivelAlerta,
    familias: 204,
    tipo: "Enchente",
  },
  {
    nome: "Morro do Cruzeiro",
    nivel: "observacao" as NivelAlerta,
    familias: 89,
    tipo: "Ventania",
  },
  {
    nome: "Conjunto Esperança",
    nivel: "observacao" as NivelAlerta,
    familias: 127,
    tipo: "Enchente",
  },
  {
    nome: "Centro Histórico",
    nivel: "normal" as NivelAlerta,
    familias: 967,
    tipo: "—",
  },
];

// ─── Dados demo — Ocorrências ─────────────────────────────────────────────────

const ocorrencias = [
  {
    id: "DC-2025-041",
    tipo: "Enchente",
    bairro: "Vila Ribeirinha",
    abertura: "08/01 — 14h32",
    status: "Em atendimento",
    afetados: 148,
    equipe: "Busca e Resgate A",
  },
  {
    id: "DC-2025-042",
    tipo: "Ventania",
    bairro: "Bairro Santa Cruz",
    abertura: "08/01 — 16h10",
    status: "Em atendimento",
    afetados: 62,
    equipe: "Operações Urbanas",
  },
  {
    id: "DC-2025-043",
    tipo: "Deslizamento",
    bairro: "Jardim das Pedras",
    abertura: "08/01 — 17h55",
    status: "Aguardando recurso",
    afetados: 34,
    equipe: "—",
  },
  {
    id: "DC-2025-044",
    tipo: "Enchente",
    bairro: "Conjunto Esperança",
    abertura: "09/01 — 06h20",
    status: "Em atendimento",
    afetados: 97,
    equipe: "Saúde de Campo",
  },
  {
    id: "DC-2025-045",
    tipo: "Ventania",
    bairro: "Centro",
    abertura: "09/01 — 08h05",
    status: "Encerrado",
    afetados: 12,
    equipe: "Operações Urbanas",
  },
  {
    id: "DC-2025-046",
    tipo: "Enchente",
    bairro: "Vila Ribeirinha",
    abertura: "09/01 — 09h40",
    status: "Em atendimento",
    afetados: 70,
    equipe: "Busca e Resgate A",
  },
];

const ocorrenciasMensais = [
  { mes: "Jul", enchente: 2, ventania: 4, deslizamento: 1 },
  { mes: "Ago", enchente: 1, ventania: 3, deslizamento: 0 },
  { mes: "Set", enchente: 3, ventania: 5, deslizamento: 2 },
  { mes: "Out", enchente: 5, ventania: 6, deslizamento: 3 },
  { mes: "Nov", enchente: 8, ventania: 9, deslizamento: 4 },
  { mes: "Dez", enchente: 12, ventania: 11, deslizamento: 6 },
  { mes: "Jan", enchente: 7, ventania: 8, deslizamento: 3 },
];

// ─── Dados demo — Recursos ────────────────────────────────────────────────────

const abrigos = [
  {
    nome: "Ginásio Municipal",
    capacidade: 300,
    ocupacao: 118,
    status: "Ativo",
    responsavel: "João Ferreira",
    tel: "(44) 99801-2233",
  },
  {
    nome: "Escola Est. João XXIII",
    capacidade: 200,
    ocupacao: 0,
    status: "Standby",
    responsavel: "Maria Conceição",
    tel: "(44) 99802-4455",
  },
  {
    nome: "Centro Comunitário Norte",
    capacidade: 150,
    ocupacao: 0,
    status: "Standby",
    responsavel: "Carlos Mendes",
    tel: "(44) 99803-6677",
  },
];

const suprimentos = [
  {
    categoria: "Água potável",
    disponivel: "12.000 L",
    consumoDia: "2.360 L/dia",
    autonomia: 5,
    pct: 42,
    icon: "DropletIcon",
    critico: false,
  },
  {
    categoria: "Cestas básicas",
    disponivel: "340 kits",
    consumoDia: "25/dia",
    autonomia: 13,
    pct: 68,
    icon: "ShoppingCart01Icon",
    critico: false,
  },
  {
    categoria: "Kits de roupa",
    disponivel: "280 kits",
    consumoDia: "—",
    autonomia: 0,
    pct: 56,
    icon: "Archive02Icon",
    critico: false,
  },
  {
    categoria: "Kits de higiene",
    disponivel: "190 kits",
    consumoDia: "—",
    autonomia: 0,
    pct: 38,
    icon: "FirstAidKitIcon",
    critico: false,
  },
  {
    categoria: "Medicamentos",
    disponivel: "48 kits",
    consumoDia: "8/dia",
    autonomia: 6,
    pct: 24,
    icon: "MedicineBottle02Icon",
    critico: false,
  },
  {
    categoria: "Lonas/abrigo",
    disponivel: "35 kits",
    consumoDia: "—",
    autonomia: 0,
    pct: 18,
    icon: "Home01Icon",
    critico: true,
  },
  {
    categoria: "Geradores",
    disponivel: "3 / 10",
    consumoDia: "—",
    autonomia: 0,
    pct: 30,
    icon: "BulbIcon",
    critico: false,
  },
];

// ─── Dados demo — Logística ───────────────────────────────────────────────────

const zonasEvacuacao = [
  {
    zona: "A",
    descricao: "Vila Ribeirinha",
    risco: "Enchente",
    rota: "Av. Principal → R. das Flores → Ginásio Municipal",
    destino: "Ginásio Municipal",
    status: "Em uso",
    pop: 312,
    prioridade: "Alta",
  },
  {
    zona: "B",
    descricao: "Jardim das Pedras",
    risco: "Deslizamento",
    rota: "Estrada Rural → Anel Viário → Escola João XXIII",
    destino: "Escola Est. João XXIII",
    status: "Livre",
    pop: 148,
    prioridade: "Alta",
  },
  {
    zona: "C",
    descricao: "Morro do Cruzeiro",
    risco: "Ventania",
    rota: "R. do Morro → Av. Central → Centro Comunitário Norte",
    destino: "Centro Com. Norte",
    status: "Livre",
    pop: 89,
    prioridade: "Média",
  },
  {
    zona: "D",
    descricao: "Conjunto Esperança",
    risco: "Enchente",
    rota: "R. Esperança → Via Expressa → Ginásio Municipal",
    destino: "Ginásio Municipal",
    status: "Bloqueada",
    pop: 204,
    prioridade: "Alta",
  },
];

const equipes = [
  {
    nome: "Busca e Resgate A",
    funcao: "Resgate em área alagada",
    status: "Ativa",
    local: "Vila Ribeirinha",
    membros: 6,
  },
  {
    nome: "Saúde de Campo",
    funcao: "Triagem e atendimento",
    status: "Ativa",
    local: "Ginásio Municipal",
    membros: 4,
  },
  {
    nome: "Distribuição",
    funcao: "Entrega de suprimentos",
    status: "Ativa",
    local: "Centro Logístico",
    membros: 5,
  },
  {
    nome: "Monitoramento Rio",
    funcao: "Medição nível d'água",
    status: "Ativa",
    local: "Margem Norte",
    membros: 3,
  },
  {
    nome: "Busca e Resgate B",
    funcao: "Resgate em área de risco",
    status: "Standby",
    local: "Base Central",
    membros: 6,
  },
  {
    nome: "Eng. Vistoria",
    funcao: "Avaliação de imóveis",
    status: "Ativa",
    local: "Bairro Santa Cruz",
    membros: 3,
  },
];

const veiculos = [
  { tipo: "Viaturas leves", total: 8, emUso: 5, icon: "DeliveryTruck01Icon" },
  {
    tipo: "Caminhões suprimento",
    total: 3,
    emUso: 2,
    icon: "DeliveryTruck01Icon",
  },
  { tipo: "Barcos de resgate", total: 4, emUso: 4, icon: "DropletIcon" },
  { tipo: "Geradores portáteis", total: 10, emUso: 7, icon: "BulbIcon" },
];

// ─── Chart configs ────────────────────────────────────────────────────────────

const chartConfigChuva = {
  mm: { label: "Chuva (mm)", color: "var(--chart-1)" },
};

const chartConfigRio = {
  nivel: { label: "Nível (%)", color: "var(--chart-2)" },
};

const chartConfigOcorrencias = {
  enchente: { label: "Enchente", color: "var(--chart-1)" },
  ventania: { label: "Ventania", color: "var(--chart-2)" },
  deslizamento: { label: "Deslizamento", color: "var(--chart-3)" },
};

// ─── Helper components ────────────────────────────────────────────────────────

export const DEFESA_CIVIL_SNAPSHOT = {
  NIVEL_ATUAL,
  chuvaHistorico,
  nivelRioHistorico,
  previsao5dias,
  comunidadesRisco,
  ocorrencias,
  ocorrenciasMensais,
  abrigos,
  suprimentos,
  zonasEvacuacao,
  equipes,
  veiculos,
  chartConfigChuva,
  chartConfigRio,
  chartConfigOcorrencias,
};
