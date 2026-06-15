import { test } from "node:test";
import assert from "node:assert/strict";

// JWT_SECRET precisa existir ANTES de importar o módulo (lido em getSecret()).
process.env.JWT_SECRET =
  process.env.JWT_SECRET ?? "test-secret-with-at-least-32-characters-long!!";

import { SignJWT } from "jose";
import {
  signSession,
  verifySession,
  SESSION_MAX_AGE_SECONDS,
  SESSION_KIOSK_MAX_AGE_SECONDS,
  type SessionClaims,
} from "../../lib/auth/jwt";

const CLAIMS: SessionClaims = {
  id_user: "u-1",
  municipio: "4117107",
  nome: "Fulano de Tal",
  cargo: "Prefeito",
};

const secret = () => new TextEncoder().encode(process.env.JWT_SECRET!);

test("round-trip: sign e verify preservam os claims", async () => {
  const token = await signSession(CLAIMS);
  const out = await verifySession(token);
  assert.deepEqual(out, CLAIMS);
});

test("expiração padrão é 8h; kiosk é 1 ano (e bem maior)", async () => {
  assert.equal(SESSION_MAX_AGE_SECONDS, 8 * 60 * 60);
  assert.equal(SESSION_KIOSK_MAX_AGE_SECONDS, 365 * 24 * 60 * 60);
  assert.ok(SESSION_KIOSK_MAX_AGE_SECONDS > SESSION_MAX_AGE_SECONDS * 100);
});

test("maxAge customizado reflete no exp do token", async () => {
  const now = Math.floor(Date.now() / 1000);
  const normal = await signSession(CLAIMS);
  const kiosk = await signSession(CLAIMS, SESSION_KIOSK_MAX_AGE_SECONDS);

  const expOf = (t: string) =>
    JSON.parse(Buffer.from(t.split(".")[1], "base64url").toString())
      .exp as number;

  // ~8h para o normal, ~1 ano para o kiosk (folga de 60s p/ variação de relógio).
  assert.ok(Math.abs(expOf(normal) - (now + SESSION_MAX_AGE_SECONDS)) <= 60);
  assert.ok(
    Math.abs(expOf(kiosk) - (now + SESSION_KIOSK_MAX_AGE_SECONDS)) <= 60,
  );
  assert.ok(expOf(kiosk) > expOf(normal));
});

test("verifySession: token undefined/vazio → null", async () => {
  assert.equal(await verifySession(undefined), null);
  assert.equal(await verifySession(""), null);
});

test("verifySession: token adulterado → null", async () => {
  const token = await signSession(CLAIMS);
  const tampered =
    token.slice(0, -3) + (token.endsWith("a") ? "b" : "a") + "xy";
  assert.equal(await verifySession(tampered), null);
});

test("verifySession: assinado com OUTRO segredo → null", async () => {
  const alien = await new SignJWT({ ...CLAIMS })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer("mirante-painel")
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(
      new TextEncoder().encode("um-segredo-completamente-diferente-aqui!!"),
    );
  assert.equal(await verifySession(alien), null);
});

test("verifySession: token expirado → null", async () => {
  const expired = await new SignJWT({ ...CLAIMS })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer("mirante-painel")
    .setIssuedAt(Math.floor(Date.now() / 1000) - 7200)
    .setExpirationTime(Math.floor(Date.now() / 1000) - 3600) // expirou há 1h
    .sign(secret());
  assert.equal(await verifySession(expired), null);
});

test("verifySession: issuer errado → null", async () => {
  const wrongIss = await new SignJWT({ ...CLAIMS })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer("outro-emissor")
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret());
  assert.equal(await verifySession(wrongIss), null);
});

test("verifySession: claims faltando/tipados errado → null", async () => {
  const incompleto = await new SignJWT({ id_user: "u-1", municipio: "4117107" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer("mirante-painel")
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret());
  assert.equal(await verifySession(incompleto), null);
});
