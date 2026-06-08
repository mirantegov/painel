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

/** Schema do tenant a partir do id_ibge (validado — só dígitos). */
export function tenantSchema(ibge: string): string {
  if (!/^\d{7}$/.test(ibge)) throw new Error("id_ibge inválido");
  return `mun_${ibge}`;
}

/**
 * Query no schema do município. Fixa o search_path na conexão e o reseta
 * antes de devolvê-la ao pool. Tabelas de dados (dim_entidade, fato_*, mod_*)
 * resolvem no schema do tenant; objetos globais via prefixo public.*.
 */
export async function tenantQuery<T extends Record<string, unknown>>(
  ibge: string,
  text: string,
  params?: unknown[],
): Promise<T[]> {
  const schema = tenantSchema(ibge); // só dígitos → seguro interpolar
  const client = await pool.connect();
  try {
    await client.query(`set search_path to ${schema}, public`);
    const res = await client.query(text, params);
    return res.rows as T[];
  } finally {
    try {
      await client.query("set search_path to public");
    } catch {
      // ignora — conexão será descartada se estiver ruim
    }
    client.release();
  }
}
