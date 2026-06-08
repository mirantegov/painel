/**
 * Importa todos os municípios do IBGE para public.dim_municipio.
 * Fonte: API de localidades do IBGE (v1). Idempotente (upsert por id_ibge).
 *
 * Uso: npm run db:import-ibge
 * Requer DATABASE_URL (default = stack local do Supabase CLI).
 */
import "dotenv/config";
import { Pool } from "pg";

const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@127.0.0.1:54322/postgres";

const IBGE_URL =
  "https://servicodados.ibge.gov.br/api/v1/localidades/municipios";

type MunicipioIBGE = {
  id: number;
  nome: string;
  microrregiao?: {
    mesorregiao?: {
      UF?: { id: number; sigla: string; regiao?: { nome: string } };
    };
  };
  "regiao-imediata"?: {
    "regiao-intermediaria"?: {
      UF?: { id: number; sigla: string; regiao?: { nome: string } };
    };
  };
};

type Row = {
  id_ibge: string;
  nome: string;
  uf: string;
  codigo_uf: number | null;
  regiao: string | null;
};

function extractUF(m: MunicipioIBGE) {
  return (
    m.microrregiao?.mesorregiao?.UF ??
    m["regiao-imediata"]?.["regiao-intermediaria"]?.UF ??
    null
  );
}

async function main() {
  console.log("Baixando municípios do IBGE...");
  const res = await fetch(IBGE_URL);
  if (!res.ok) throw new Error(`IBGE API ${res.status}`);
  const data = (await res.json()) as MunicipioIBGE[];
  console.log(`Recebidos ${data.length} municípios.`);

  const rows: Row[] = data.map((m) => {
    const uf = extractUF(m);
    return {
      id_ibge: String(m.id),
      nome: m.nome,
      uf: uf?.sigla ?? "",
      codigo_uf: uf?.id ?? null,
      regiao: uf?.regiao?.nome ?? null,
    };
  });

  const pool = new Pool({ connectionString: DATABASE_URL });
  try {
    const chunkSize = 500;
    let total = 0;
    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      const values: unknown[] = [];
      const tuples = chunk.map((r, j) => {
        const b = j * 5;
        values.push(r.id_ibge, r.nome, r.uf, r.codigo_uf, r.regiao);
        return `($${b + 1}, $${b + 2}, $${b + 3}, $${b + 4}, $${b + 5})`;
      });
      await pool.query(
        `insert into public.dim_municipio (id_ibge, nome, uf, codigo_uf, regiao)
         values ${tuples.join(", ")}
         on conflict (id_ibge) do update set
           nome = excluded.nome,
           uf = excluded.uf,
           codigo_uf = excluded.codigo_uf,
           regiao = excluded.regiao`,
        values,
      );
      total += chunk.length;
    }
    console.log(`Upsert concluído: ${total} municípios em dim_municipio.`);
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
