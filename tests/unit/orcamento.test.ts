import { test } from "node:test";
import assert from "node:assert/strict";
import { computeOrcamento, pctShare, type OrcamentoBase } from "../../lib/demo-orcamento";

test("pctShare: razão percentual e guarda divisão por zero", () => {
  assert.equal(pctShare(50, 200), 25);
  assert.equal(pctShare(0, 100), 0);
  assert.equal(pctShare(10, 0), 0); // total 0 -> 0, sem NaN/Infinity
});

const BASE: OrcamentoBase = {
  receitaPrevista: 100,
  receitaDeduzida: 10,
  receitaAlterada: 5,
  despesaOrcada: 80,
  despesaSuplementado: 12,
  despesaReduzido: 2,
  receitaArrecadada: 90,
  despesaEmpenhada: 70,
  metaRealizacaoReceitaPct: 95,
  despesaPessoalOrcado: 40,
};

test("computeOrcamento: derivados de receita", () => {
  const r = computeOrcamento(BASE);
  assert.equal(r.receitaOrcada, 90); // prevista - deduzida
  assert.equal(r.receitaAtualizada, 95); // orçada + alterada
});

test("computeOrcamento: derivados de despesa", () => {
  const r = computeOrcamento(BASE);
  assert.equal(r.despesaAtualizado, 90); // orçada + supl - reduzido
  assert.equal(r.gapEstruturalLoa, 10); // receitaOrcada - despesaOrcada
});

test("computeOrcamento: índices percentuais", () => {
  const r = computeOrcamento(BASE);
  assert.equal(Math.round(r.rigidezPessoalSobreOrcado), 50); // 40/80
  assert.equal(r.comprometimentoDespesaVsAtualizada, pctShare(70, 90));
  assert.equal(r.realizacaoReceitaVsAtualizada, pctShare(90, 95));
  assert.equal(r.saldoEmpenhoDisponivelPct, pctShare(90 - 70, 90));
});

test("computeOrcamento é puro (não muta a base)", () => {
  const snapshot = JSON.stringify(BASE);
  computeOrcamento(BASE);
  assert.equal(JSON.stringify(BASE), snapshot);
});

test("gap negativo quando despesa orçada > receita orçada", () => {
  const r = computeOrcamento({ ...BASE, despesaOrcada: 120 });
  assert.equal(r.gapEstruturalLoa, -30); // 90 - 120
});
