// Dados baseados nos arquivos de referência (Palotinal / Santa Isabel do Ivaí — LOA 2025)

// ── Receitas ──────────────────────────────────────────────────────────────────
export const receitaTotalLOA    = 57_148_402.36
export const receitaCorrenteLOA = 56_932_937.36
export const receitaCapitalLOA  =    215_465.00

// Origem
export const receitasProprias   =  7_041_213.22  // 12.3%
export const transferFederais   = 31_472_750.76  // 55.1%
export const transferEstaduais  = 13_583_408.00  // 23.8%
export const outrasReceitas     =  4_835_565.38  //  8.5%

// Tributárias Próprias
export const iptu    = 3_050_000.00   // +33.89% vs 2024
export const issqn   =   870_249.00
export const itbi    =   700_746.00   // +5%
export const irrf    = 1_060_773.00   // +90.02%
export const taxas   =   809_151.22
export const contribs =  550_294.00

// Transferências Federais
export const fpm       = 16_814_431.00   // +11.20%
export const fundeb    =  8_183_049.76   // +19.35%
export const sus       =  4_616_408.00   // +45.76%
export const fnde      =    958_255.00   // +5%
export const outrasFed =    900_607.00

// Transferências Estaduais
export const icms      = 11_205_130.00   // +22.18%
export const ipva      =  1_955_434.00   // +48.97%
export const outrasEst =    422_844.00

// ── Despesas ──────────────────────────────────────────────────────────────────
export const despesaTotalLOA     = 54_647_152.36
export const reservaContingencia =  1_069_457.50
export const despPessoal         = 24_839_982.07  // 43.5%
export const despCusteio         = 22_563_519.88  // 39.5%
export const despInvestimentos   =  6_174_192.91  // 10.8%
export const despJuros           =    714_470.31  //  1.2%
export const despAmortizacao     =  1_324_323.00  //  2.3%

// Despesas por órgão
export const despPrefeitura  = 49_824_152.36
export const despCamara      =  2_200_000.00
export const despPrevidencia =  2_623_000.00

// ── Índices constitucionais ────────────────────────────────────────────────────
export const rclLOA = 45_200_000.00

// MDE — Educação: mínimo 25% receita de impostos (Art. 212 CF)
export const baseImpostosMDE  = 18_560_000.00
export const minimoMDE        =  4_640_000.00  // 25%
export const gastosMDE        =  9_183_049.76  // FUNDEB + próprio → 49.5%
export const gastosMDEpct     = 49.47

// ASPS — Saúde: mínimo 15% RCL (LC 141/2012)
export const minimoASPS  =  6_780_000.00  // 15% da RCL
export const gastosASPS  =  8_416_408.00  // SUS + próprio → 18.6%
export const gastosASPSpct = 18.62

// Pessoal — LRF: limite 60% RCL (54% Exec. + 6% Leg.)
export const despPessoalExecutivo   = 23_100_000.00   // 51.1% RCL
export const despPessoalLegislativo =  1_739_982.07   //  3.85% RCL
export const pctPessoalExecutivo    = 51.1
export const pctPessoalLegislativo  =  3.85
export const pctPessoalGlobal       = 54.95

// ── Investimentos ─────────────────────────────────────────────────────────────
export const investimentos = [
  { descricao: "Construção de UBS — Bairro Norte",       valor: 1_200_000, secretaria: "Saúde" },
  { descricao: "Reforma e ampliação de CMEI",            valor:   850_000, secretaria: "Educação" },
  { descricao: "Pavimentação de vias urbanas",           valor: 1_800_000, secretaria: "Obras" },
  { descricao: "Aquisição de veículos e máquinas",       valor:   920_000, secretaria: "Administração" },
  { descricao: "Sistema de drenagem pluvial — Zona Sul", valor:   680_000, secretaria: "Obras" },
  { descricao: "Equipamentos para Saúde",                valor:   524_193, secretaria: "Saúde" },
]

// ── Histórico ─────────────────────────────────────────────────────────────────
export const historicoOrcamento = [
  { ano: "2023", receita: 47_200_000, despesa: 45_800_000 },
  { ano: "2024", receita: 52_500_000, despesa: 51_100_000 },
  { ano: "2025", receita: 57_148_402, despesa: 54_647_152 },
]
