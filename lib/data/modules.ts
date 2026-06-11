/**
 * Acesso aos dados de módulo no Postgres (Supabase self-hosted).
 * - Módulos da cauda longa: snapshot `dados` jsonb em `mod_<slug>`.
 * - Despesa/Receita têm camadas próprias (lib/data/despesa.ts, receita.ts).
 *
 * O nome da tabela é resolvido de uma allowlist (evita SQL dinâmico inseguro).
 */
import { tenantQuery } from "@/lib/db";

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
  despesa: "mod_despesa",
  receita: "mod_receita",
};

/**
 * Retorna o snapshot `dados` (jsonb) do módulo para (municipio, ano).
 *
 * - Com `chave`: devolve o sub-dataset daquela chave (uma linha) ou null.
 * - Sem `chave`: **funde** todas as linhas do ano num objeto só. O snapshot é
 *   particionado por `chave` (cada uma vira real quando sua fonte chega no
 *   pipeline); os key-sets são disjuntos, então o merge é seguro. Linhas mais
 *   recentes (`criado_em`) ganham em caso de empate — pipeline sobrepõe mock.
 *
 * Retorna null se não houver linha (o cliente cai no fallback demo).
 */
export async function getModuloDados<T = unknown>(
  slug: string,
  municipio: string,
  ano: number,
  chave?: string,
): Promise<T | null> {
  const table = MODULE_TABLES[slug];
  if (!table) throw new Error(`Módulo desconhecido: ${slug}`);

  // Tabela resolve no schema do tenant (search_path); nome vem da allowlist.
  if (chave !== undefined) {
    const rows = await tenantQuery<{ dados: T }>(
      municipio,
      `select dados from ${table} where ano = $1 and chave = $2 order by mes nulls first limit 1`,
      [ano, chave],
    );
    return rows[0]?.dados ?? null;
  }

  const rows = await tenantQuery<{ dados: Record<string, unknown> }>(
    municipio,
    `select dados from ${table} where ano = $1 order by mes nulls first, criado_em`,
    [ano],
  );
  if (rows.length === 0) return null;
  return Object.assign({}, ...rows.map((r) => r.dados)) as T;
}

/**
 * Anos com dados no município (união dos módulos do grupo A), desc. Alimenta o
 * seletor de ano (data-driven); vazio = município ainda sem dados (cai no fallback).
 */
export async function getAnosDisponiveis(municipio: string): Promise<number[]> {
  const rows = await tenantQuery<{ ano: number }>(
    municipio,
    `select distinct ano from (
       select ano from mod_despesa
       union select ano from mod_receita
       union select ano from mod_orcamento
     ) t order by ano desc`,
  );
  return rows.map((r) => Number(r.ano));
}
