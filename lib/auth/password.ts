/**
 * Hash/verificação de senha com bcrypt.
 * Uso apenas server-side (route handlers / scripts) — runtime Node.
 */
import bcrypt from "bcryptjs";

const ROUNDS = 10;

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, ROUNDS);
}

export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
