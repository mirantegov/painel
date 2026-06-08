/**
 * Pool Postgres único (server-only). Conecta no Supabase self-hosted via DATABASE_URL.
 * Singleton em globalThis para sobreviver ao HMR em dev.
 */
import { Pool } from "pg";

const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@127.0.0.1:54322/postgres";

const globalForDb = globalThis as unknown as { __mpPool?: Pool };

export const pool: Pool =
  globalForDb.__mpPool ?? new Pool({ connectionString: DATABASE_URL });

if (process.env.NODE_ENV !== "production") globalForDb.__mpPool = pool;

export async function query<T extends Record<string, unknown>>(
  text: string,
  params?: unknown[],
): Promise<T[]> {
  const res = await pool.query(text, params);
  return res.rows as T[];
}
