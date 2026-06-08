/**
 * Leitura da sessão no servidor (server components / route handlers).
 * Lê o cookie httpOnly e valida o JWT.
 */
import { cookies } from "next/headers";
import { verifySession, type SessionClaims } from "./jwt";

const COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "mp_session";

export async function getSession(): Promise<SessionClaims | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return verifySession(token);
}
