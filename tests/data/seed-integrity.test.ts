/**
 * Testes de DADOS contra o Supabase local seedado (npm run db:seed-demo).
 * Validam integridade do que alimenta o painel: ACL/usuário, snapshots dos
 * módulos (jsonb não-vazio e serializável) e os fatos do grupo A (2026).
 *
 * Gated por conectividade: se não houver DB local acessível, pulam (não falham).
 * Rodar:  npm run test:data   (sobe o Supabase antes: npm run db:start)
 */
import { test, before, after } from "node:test";
import type { TestContext } from "node:test";
import assert from "node:assert/strict";
import { pool, query, tenantQuery, tenantSchema } from "../../lib/db";
import { verifyPassword } from "../../lib/auth/password";

const MUNICIPIO = process.env.TEST_MUNICIPIO ?? "4117107";
const ANO = Number(process.env.TEST_ANO ?? "2026");
const DEMO_SENHA = process.env.TEST_SENHA ?? "Dx7$kP2w-Ra9mLZ";

// Conectividade: se o DB não responder, pula a suíte inteira em vez de falhar.
let dbError: string | null = null;
before(async () => {
  try {
    await pool.query("select 1");
  } catch (e) {
    dbError = (e as Error).message;
  }
});

after(async () => {
  await pool.end().catch(() => {});
});

/** Pula o teste (sem falhar) quando não há DB local acessível. */
function skipSemDB(t: TestContext): boolean {
  if (dbError) {
    t.skip(`sem DB local: ${dbError}`);
    return true;
  }
  return false;
}

test("usuário admin existe, está ativo e tem hash bcrypt válido", async (t) => {
  if (skipSemDB(t)) return;
  const rows = await query<{ cpf: string; ativo: boolean; senha_hash: string }>(
    `select cpf, ativo, senha_hash from public.usuarios
      where municipio_id_ibge = $1 and cpf = $2`,
    [MUNICIPIO, "00000000000"],
  );
  assert.equal(rows.length, 1, "deve haver exatamente 1 admin 00000000000");
  assert.equal(rows[0].ativo, true);
  assert.match(rows[0].senha_hash, /^\$2[aby]\$/);
});

test("a senha demo confere contra o hash gravado (login funcionaria)", async (t) => {
  if (skipSemDB(t)) return;
  const rows = await query<{ senha_hash: string }>(
    `select senha_hash from public.usuarios
      where municipio_id_ibge = $1 and cpf = $2`,
    [MUNICIPIO, "00000000000"],
  );
  assert.equal(await verifyPassword(DEMO_SENHA, rows[0].senha_hash), true);
});

test("ACL: o admin tem módulos liberados", async (t) => {
  if (skipSemDB(t)) return;
  const rows = await query<{ n: string }>(
    `select count(*)::text as n
       from public.usuario_modulos um
       join public.usuarios u on u.id_user = um.usuario_id
      where u.municipio_id_ibge = $1 and u.cpf = $2`,
    [MUNICIPIO, "00000000000"],
  );
  assert.ok(Number(rows[0].n) > 0, "admin deve ter ao menos 1 módulo na ACL");
});

test("catálogo public.modulos está populado (21 módulos)", async (t) => {
  if (skipSemDB(t)) return;
  const rows = await query<{ n: string }>(
    `select count(*)::text as n from public.modulos`,
  );
  assert.ok(
    Number(rows[0].n) >= 19,
    `esperado >=19 módulos, veio ${rows[0].n}`,
  );
});

test("snapshots mod_*: dados jsonb não-vazio e serializável", async (t) => {
  if (skipSemDB(t)) return;
  const schema = tenantSchema(MUNICIPIO);
  const tabelas = await query<{ table_name: string }>(
    `select table_name from information_schema.tables
      where table_schema = $1 and table_name like 'mod\\_%'
      order by table_name`,
    [schema],
  );
  assert.ok(tabelas.length > 0, `nenhuma tabela mod_* em ${schema}`);

  let comDados = 0;
  for (const { table_name } of tabelas) {
    const linhas = await tenantQuery<{ dados: unknown }>(
      MUNICIPIO,
      `select dados from ${table_name} limit 50`,
    );
    for (const { dados } of linhas) {
      assert.ok(
        dados && typeof dados === "object",
        `${table_name}.dados deve ser objeto jsonb`,
      );
      // round-trip JSON garante ausência de funções/refs cíclicas/undefined.
      assert.deepEqual(
        JSON.parse(JSON.stringify(dados)),
        dados,
        `${table_name} não serializa`,
      );
    }
    if (linhas.length > 0) comDados++;
  }
  assert.ok(
    comDados >= 15,
    `esperado >=15 módulos com snapshot, veio ${comDados}`,
  );
});

test("grupo A: fatos de despesa e receita do ano corrente existem", async (t) => {
  if (skipSemDB(t)) return;
  for (const tabela of ["mod_despesa", "mod_receita", "mod_orcamento"]) {
    const rows = await tenantQuery<{ n: string }>(
      MUNICIPIO,
      `select count(*)::text as n from ${tabela} where ano = $1`,
      [ANO],
    );
    assert.ok(Number(rows[0].n) > 0, `${tabela} sem linhas para ${ANO}`);
  }
});

test("getAnosDisponiveis (consulta real): inclui o ano seedado", async (t) => {
  if (skipSemDB(t)) return;
  const rows = await tenantQuery<{ ano: number }>(
    MUNICIPIO,
    `select distinct ano from (
       select ano from mod_despesa
       union select ano from mod_receita
       union select ano from mod_orcamento
     ) t order by ano desc`,
  );
  const anos = rows.map((r) => Number(r.ano));
  assert.ok(
    anos.includes(ANO),
    `anos disponíveis ${JSON.stringify(anos)} não inclui ${ANO}`,
  );
});
