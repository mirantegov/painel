import { test } from "node:test";
import assert from "node:assert/strict";
import {
  bucketReceita,
  GRUPO_ORIGEM_LABEL,
} from "../../infra/clickhouse/tools/lib/classificacao.mjs";

// Layout do código: categoria(1) origem(2) espécie(3) ...
test("próprias: correntes (cat 1) de origem tributária/contrib/patrim/agro/ind/serviços (1..6)", () => {
  for (const ori of ["1", "2", "3", "4", "5", "6"]) {
    assert.equal(bucketReceita(`1${ori}000000`), "proprias", `origem ${ori}`);
  }
});

test("federais: origem 7 + espécie 1 (transferências da União)", () => {
  assert.equal(bucketReceita("17100000"), "federais");
});

test("estaduais: origem 7 + espécie 2 (transferências do Estado)", () => {
  assert.equal(bucketReceita("17200000"), "estaduais");
});

test("transferências de outras espécies (3+) caem em outras", () => {
  assert.equal(bucketReceita("17300000"), "outras");
});

test("origem 7 é independente da categoria (transferência de capital federal)", () => {
  assert.equal(bucketReceita("27100000"), "federais");
});

test("receitas de capital comuns (origem != 7) -> outras", () => {
  assert.equal(bucketReceita("21100000"), "outras"); // operações de crédito
  assert.equal(bucketReceita("22000000"), "outras"); // alienação de bens
});

test("correntes origem 7 (transferências) NÃO são próprias", () => {
  assert.notEqual(bucketReceita("17100000"), "proprias");
  assert.notEqual(bucketReceita("17200000"), "proprias");
});

test("defensivo: código vazio/curto/nulo -> outras (sem lançar)", () => {
  const bucket = bucketReceita as (c: unknown) => string;
  assert.equal(bucket(""), "outras");
  assert.equal(bucket(undefined), "outras");
  assert.equal(bucket("1"), "outras");
});

test("aceita código numérico (coage para string)", () => {
  const bucket = bucketReceita as (c: unknown) => string;
  assert.equal(bucket(11000000), "proprias");
});

test("GRUPO_ORIGEM_LABEL cobre os 4 grupos", () => {
  assert.deepEqual(Object.keys(GRUPO_ORIGEM_LABEL).sort(), [
    "estaduais",
    "federais",
    "outras",
    "proprias",
  ]);
  assert.equal(GRUPO_ORIGEM_LABEL.federais, "Transferências Federais");
  assert.equal(GRUPO_ORIGEM_LABEL.proprias, "Receitas Próprias");
});
