// Classificação de receita pelo código PCASP (18 dígitos, layout TCE).
// Compartilhado pelos builders (build_mod_receita / build_mod_orcamento) e testável
// isoladamente (tests/unit/classificacao.test.ts). Mantém UMA fonte da regra.
//
// Layout do código: categoria(1) origem(2) espécie(3) ...
//   categoria 1 = Receitas Correntes · 2 = Receitas de Capital
//   origem 7 = Transferências; espécie distingue Federais (1) x Estaduais (2)

/**
 * Classifica um código de receita em um dos 4 grupos do dashboard.
 * @param {string} cod código de receita (>=3 dígitos)
 * @returns {"proprias"|"estaduais"|"federais"|"outras"}
 */
export function bucketReceita(cod) {
  const s = String(cod ?? "");
  const cat = s[0], ori = s[1], esp = s[2];
  // arrecadação própria: correntes (cat 1) de origem tributária/contrib/patrim/serviços (1..6)
  if (cat === "1" && ["1", "2", "3", "4", "5", "6"].includes(ori)) return "proprias";
  // transferências (origem 7): espécie 1 = União (federais) · 2 = Estado (estaduais)
  if (ori === "7" && esp === "1") return "federais";
  if (ori === "7" && esp === "2") return "estaduais";
  return "outras";
}

/** Rótulos legíveis por grupo de origem (para receitaPorOrigem). */
export const GRUPO_ORIGEM_LABEL = {
  proprias: "Receitas Próprias",
  estaduais: "Transferências Estaduais",
  federais: "Transferências Federais",
  outras: "Outras Receitas",
};
