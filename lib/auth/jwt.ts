/**
 * Sessão via JWT assinado (HS256), guardado em cookie httpOnly.
 * Usa `jose` (compatível com Edge runtime, usado no middleware).
 */
import { SignJWT, jwtVerify } from "jose";

export type SessionClaims = {
  id_user: string;
  municipio: string; // id_ibge
  nome: string;
  cargo: string;
};

const ISSUER = "mirante-painel";
const MAX_AGE_SECONDS = 8 * 60 * 60; // 8h
const KIOSK_MAX_AGE_SECONDS = 365 * 24 * 60 * 60; // 1 ano (dispositivos dedicados / kiosk)

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET não configurado");
  return new TextEncoder().encode(secret);
}

export async function signSession(
  claims: SessionClaims,
  maxAgeSeconds: number = MAX_AGE_SECONDS,
): Promise<string> {
  return new SignJWT({ ...claims })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(ISSUER)
    .setIssuedAt()
    .setExpirationTime(`${maxAgeSeconds}s`)
    .sign(getSecret());
}

export async function verifySession(
  token: string | undefined,
): Promise<SessionClaims | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: ISSUER,
    });
    const { id_user, municipio, nome, cargo } = payload as Record<
      string,
      unknown
    >;
    if (
      typeof id_user !== "string" ||
      typeof municipio !== "string" ||
      typeof nome !== "string" ||
      typeof cargo !== "string"
    ) {
      return null;
    }
    return { id_user, municipio, nome, cargo };
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE_SECONDS = MAX_AGE_SECONDS;
export const SESSION_KIOSK_MAX_AGE_SECONDS = KIOSK_MAX_AGE_SECONDS;
