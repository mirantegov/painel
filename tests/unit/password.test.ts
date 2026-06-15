import { test } from "node:test";
import assert from "node:assert/strict";
import { hashPassword, verifyPassword } from "../../lib/auth/password";

test("hash não é a senha em claro e tem formato bcrypt", async () => {
  const hash = await hashPassword("Dx7$kP2w-Ra9mLZ");
  assert.notEqual(hash, "Dx7$kP2w-Ra9mLZ");
  assert.match(hash, /^\$2[aby]\$\d{2}\$/); // prefixo bcrypt
});

test("verifyPassword: true para a senha correta", async () => {
  const hash = await hashPassword("senha-correta-123");
  assert.equal(await verifyPassword("senha-correta-123", hash), true);
});

test("verifyPassword: false para senha errada", async () => {
  const hash = await hashPassword("senha-correta-123");
  assert.equal(await verifyPassword("senha-ERRADA", hash), false);
});

test("verifyPassword é sensível a maiúsculas/minúsculas", async () => {
  const hash = await hashPassword("CaseSensitive");
  assert.equal(await verifyPassword("casesensitive", hash), false);
});

test("hashes do mesmo texto diferem (salt aleatório) mas ambos verificam", async () => {
  const a = await hashPassword("repetida");
  const b = await hashPassword("repetida");
  assert.notEqual(a, b);
  assert.equal(await verifyPassword("repetida", a), true);
  assert.equal(await verifyPassword("repetida", b), true);
});
