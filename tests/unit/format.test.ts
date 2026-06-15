import { test } from "node:test";
import assert from "node:assert/strict";
import { fmtBRL } from "../../lib/format";

test("milhões: 1 casa decimal com sufixo M", () => {
  assert.equal(fmtBRL(1_500_000), "R$ 1.5M");
  assert.equal(fmtBRL(580_000_000), "R$ 580.0M");
});

test("milhares: sem casas com sufixo K", () => {
  assert.equal(fmtBRL(12_000), "R$ 12K");
  assert.equal(fmtBRL(999_000), "R$ 999K");
});

test("abaixo de mil: moeda pt-BR sem fração", () => {
  // NumberFormat pt-BR usa NBSP entre símbolo e número.
  assert.match(fmtBRL(500), /^R\$\s?500$/);
  assert.equal(fmtBRL(0).replace(/ /g, " "), "R$ 0");
});

test("limites: 1000 vira K e 1.000.000 vira M", () => {
  assert.equal(fmtBRL(1_000), "R$ 1K");
  assert.equal(fmtBRL(1_000_000), "R$ 1.0M");
  assert.equal(fmtBRL(999), fmtBRL(999)); // < 1000 não vira K
  assert.ok(!fmtBRL(999).includes("K"));
});

test("negativos preservam o sinal e a faixa pelo valor absoluto", () => {
  assert.equal(fmtBRL(-2_000_000), "R$ -2.0M");
  assert.equal(fmtBRL(-5_000), "R$ -5K");
});
