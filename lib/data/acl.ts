/**
 * Consultas de ACL (módulos/submódulos liberados por usuário).
 */
import { query } from "@/lib/db";

export async function getAllowedModuleIds(userId: string): Promise<string[]> {
  const rows = await query<{ modulo_id: string }>(
    `select modulo_id from public.usuario_modulos where usuario_id = $1`,
    [userId],
  );
  return rows.map((r) => r.modulo_id);
}

/** Mapa modulo_id → slugs de submódulo liberados. */
export async function getAllowedSubmodules(
  userId: string,
): Promise<Record<string, string[]>> {
  const rows = await query<{ modulo_id: string; slug: string }>(
    `select s.modulo_id, s.slug
       from public.usuario_submodulos us
       join public.submodulos s on s.id = us.submodulo_id
      where us.usuario_id = $1`,
    [userId],
  );
  const map: Record<string, string[]> = {};
  for (const r of rows) {
    (map[r.modulo_id] ??= []).push(r.slug);
  }
  return map;
}
