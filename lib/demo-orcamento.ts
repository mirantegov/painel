/**
 * Dados demonstrativos alinhados para o módulo Orçamento:
 * mesmos totais usados em orcamento-municipal + execução (arrecadação / empenho) coerente com receita atualizada e despesa atualizada.
 */

export const receitaPrevista = 580_000_000
export const receitaDeduzida = 45_000_000
export const receitaOrcada = receitaPrevista - receitaDeduzida
export const receitaAlterada = 12_000_000
export const receitaAtualizada = receitaOrcada + receitaAlterada

export const despesaOrcada = 535_000_000
export const despesaSuplementado = 42_000_000
export const despesaReduzido = 28_000_000
export const despesaAtualizado = despesaOrcada + despesaSuplementado - despesaReduzido

/** Arrecadação acumulada no exercício (mock), ~93,6% da receita atualizada */
export const receitaArrecadada = 512_000_000

/** Empenho acumulado (mock), ~92% da despesa atualizada */
export const despesaEmpenhada = 505_000_000

/** Meta de realização da receita frente ao orçamento atualizado (%) */
export const metaRealizacaoReceitaPct = 95

/** Pessoal e encargos na LOA (alinhado a despesaNatureza em orcamento-municipal) */
export const despesaPessoalOrcado = 265_000_000

export function pctShare(valor: number, total: number) {
  if (total === 0) return 0
  return (valor / total) * 100
}

export const realizacaoReceitaVsAtualizada = pctShare(receitaArrecadada, receitaAtualizada)
export const comprometimentoDespesaVsAtualizada = pctShare(despesaEmpenhada, despesaAtualizado)
export const saldoEmpenhoDisponivelPct = pctShare(despesaAtualizado - despesaEmpenhada, despesaAtualizado)
export const gapEstruturalLoa = receitaOrcada - despesaOrcada
export const rigidezPessoalSobreOrcado = pctShare(despesaPessoalOrcado, despesaOrcada)

/**
 * Números-base do orçamento (entradas primitivas). É o que fica no banco
 * (mod_orcamento.dados) e o que o componente busca por ano. Os derivados
 * são recalculados por computeOrcamento().
 */
export type OrcamentoBase = {
  receitaPrevista: number
  receitaDeduzida: number
  receitaAlterada: number
  despesaOrcada: number
  despesaSuplementado: number
  despesaReduzido: number
  receitaArrecadada: number
  despesaEmpenhada: number
  metaRealizacaoReceitaPct: number
  despesaPessoalOrcado: number
}

export const ORCAMENTO_BASE: OrcamentoBase = {
  receitaPrevista,
  receitaDeduzida,
  receitaAlterada,
  despesaOrcada,
  despesaSuplementado,
  despesaReduzido,
  receitaArrecadada,
  despesaEmpenhada,
  metaRealizacaoReceitaPct,
  despesaPessoalOrcado,
}

/** Recalcula todos os valores (base + derivados) a partir de uma base. */
export function computeOrcamento(b: OrcamentoBase) {
  const receitaOrcada = b.receitaPrevista - b.receitaDeduzida
  const receitaAtualizada = receitaOrcada + b.receitaAlterada
  const despesaAtualizado = b.despesaOrcada + b.despesaSuplementado - b.despesaReduzido
  return {
    ...b,
    receitaOrcada,
    receitaAtualizada,
    despesaAtualizado,
    realizacaoReceitaVsAtualizada: pctShare(b.receitaArrecadada, receitaAtualizada),
    comprometimentoDespesaVsAtualizada: pctShare(b.despesaEmpenhada, despesaAtualizado),
    saldoEmpenhoDisponivelPct: pctShare(despesaAtualizado - b.despesaEmpenhada, despesaAtualizado),
    gapEstruturalLoa: receitaOrcada - b.despesaOrcada,
    rigidezPessoalSobreOrcado: pctShare(b.despesaPessoalOrcado, b.despesaOrcada),
  }
}
