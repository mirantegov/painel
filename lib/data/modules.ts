/**
 * Acesso aos dados de módulo no Postgres (Supabase self-hosted).
 * - Módulos da cauda longa: snapshot `dados` jsonb em `mod_<slug>`.
 * - Despesa/Receita têm camadas próprias (lib/data/despesa.ts, receita.ts).
 *
 * O nome da tabela é resolvido de uma allowlist (evita SQL dinâmico inseguro).
 */
import { query } from "@/lib/db";

/** slug do módulo (igual ao id em lib/modules-config) → tabela mod_*. */
const MODULE_TABLES: Record<string, string> = {
  "visao-geral": "mod_visao_geral",
  financeiro: "mod_financeiro",
  tributacao: "mod_tributacao",
  orcamento: "mod_orcamento",
  "prestacao-contas": "mod_prestacao_contas",
  compras: "mod_compras",
  rh: "mod_rh",
  saude: "mod_saude",
  educacao: "mod_educacao",
  "assistencia-social": "mod_assistencia_social",
  "defesa-civil": "mod_defesa_civil",
  obras: "mod_obras",
  frotas: "mod_frotas",
  patrimonio: "mod_patrimonio",
  processos: "mod_processos",
  previdencia: "mod_previdencia",
  saneamento: "mod_saneamento",
  legislativo: "mod_legislativo",
  "licitacoes-painel": "mod_licitacoes_painel",
};

/**
 * Retorna o snapshot `dados` (jsonb) do módulo para (municipio, ano).
 * `chave` filtra um sub-dataset específico. Retorna null se não houver linha.
 */
export async function getModuloDados<T = unknown>(
  slug: string,
  municipio: string,
  ano: number,
  chave?: string,
): Promise<T | null> {
  const table = MODULE_TABLES[slug];
  if (!table) throw new Error(`Módulo desconhecido: ${slug}`);

  const params: unknown[] = [municipio, ano];
  let sql = `select dados from public.${table}
             where municipio_id_ibge = $1 and ano = $2`;
  if (chave !== undefined) {
    params.push(chave);
    sql += ` and chave = $3`;
  }
  sql += ` order by mes nulls first limit 1`;

  const rows = await query<{ dados: T }>(sql, params);
  return rows[0]?.dados ?? null;
}
