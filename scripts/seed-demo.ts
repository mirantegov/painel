/**
 * Seed de demonstração: município Nova Londrina (4117107).
 * - Entidades (Prefeitura, Câmara)
 * - Catálogo de módulos + submódulos (espelha lib/modules-config.ts)
 * - Usuário demo (CPF 00000000000, Prefeito) com acesso total
 * - Amostra de fato_despesa / fato_receita (ano corrente) p/ verificação
 *
 * Idempotente. Uso: npm run db:seed-demo
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { DESPESA_SNAPSHOT } from "../lib/demo-despesa";
import { RECEITA_SNAPSHOT } from "../lib/demo-receita";

const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@127.0.0.1:54322/postgres";

const MUNICIPIO = "4117107"; // Nova Londrina/PR
const ANO = 2026;
const DEMO_CPF = "00000000000";
// Senha de DESENVOLVIMENTO (trocar depois). Sobrescreve via env DEMO_PASSWORD.
const DEMO_PASSWORD = process.env.DEMO_PASSWORD ?? "Dx7$kP2w-Ra9mLZ";

// Módulos (id = slug de lib/modules-config.ts), na ordem do menu.
const MODULOS: [string, string][] = [
  ["visao-geral", "Geral"],
  ["despesa", "Despesas"],
  ["receita", "Receitas"],
  ["financeiro", "Financeiro"],
  ["tributacao", "Tributos"],
  ["orcamento", "Planejamento"],
  ["prestacao-contas", "Contas Públicas"],
  ["compras", "Licitações e Contratos"],
  ["rh", "Recursos Humanos"],
  ["saude", "Saúde"],
  ["educacao", "Educação"],
  ["assistencia-social", "Assistência Social"],
  ["defesa-civil", "Defesa Civil"],
  ["obras", "Obras"],
  ["frotas", "Frotas"],
  ["patrimonio", "Patrimônio"],
  ["processos", "Processos"],
  ["previdencia", "Previdência"],
  ["saneamento", "Saneamento"],
  ["legislativo", "Legislativo"],
  ["licitacoes-painel", "Painel de licitações"],
];

// Submódulos dos módulos complexos (slug = value das sub-tabs).
const SUBMODULOS: Record<string, [string, string][]> = {
  "prestacao-contas": [
    ["agenda", "Agenda de Obrigações"],
    ["certidao", "Certidão Liberatória"],
    ["tce", "Contas TCE/PR"],
    ["cauc", "CAUC"],
    ["msc", "MSC"],
  ],
  legislativo: [
    ["vereadores", "Vereadores"],
    ["sessoes", "Sessões"],
    ["proposituras", "Proposituras"],
    ["comissoes", "Comissões"],
    ["presencas", "Presenças"],
    ["despesas", "Despesas"],
  ],
  previdencia: [
    ["gestao-beneficios", "Gestão de Benefícios"],
    ["analise-financeira", "Análise Financeira"],
    ["controle-beneficios", "Controle de Benefícios"],
    ["balanco-atuarial", "Balanço Atuarial"],
  ],
  saneamento: [
    ["abastecimento", "Abastecimento de Água"],
    ["esgoto", "Esgoto"],
    ["financeiro", "Financeiro"],
    ["obras", "Obras"],
    ["drenagem", "Drenagem Urbana"],
  ],
};

// Amostra de despesa por órgão (agregado anual, mes = null).
const DESPESA: {
  orgao: string;
  atualizada: number;
  empenhada: number;
  liquidada: number;
  pago: number;
}[] = [
  { orgao: "Gabinete do Prefeito", atualizada: 8_500_000, empenhada: 7_900_000, liquidada: 7_400_000, pago: 7_100_000 },
  { orgao: "Secretaria de Administração", atualizada: 21_000_000, empenhada: 19_800_000, liquidada: 18_600_000, pago: 18_000_000 },
  { orgao: "Secretaria de Saúde", atualizada: 64_000_000, empenhada: 61_500_000, liquidada: 58_900_000, pago: 56_700_000 },
  { orgao: "Secretaria de Educação", atualizada: 78_000_000, empenhada: 75_200_000, liquidada: 71_800_000, pago: 69_400_000 },
  { orgao: "Secretaria de Obras", atualizada: 33_000_000, empenhada: 29_500_000, liquidada: 24_300_000, pago: 22_100_000 },
  { orgao: "Secretaria de Assistência Social", atualizada: 17_500_000, empenhada: 16_400_000, liquidada: 15_200_000, pago: 14_800_000 },
  { orgao: "Secretaria de Agricultura", atualizada: 9_800_000, empenhada: 9_100_000, liquidada: 8_300_000, pago: 8_000_000 },
  { orgao: "Secretaria de Finanças", atualizada: 12_200_000, empenhada: 11_300_000, liquidada: 10_700_000, pago: 10_400_000 },
];

// Amostra de receita (agregado anual, mes = null).
const RECEITA: {
  codigo: string;
  receita: string;
  categoria: string;
  prevista: number;
  arrecadada: number;
}[] = [
  { codigo: "1.1.1", receita: "IPTU", categoria: "propria", prevista: 9_000_000, arrecadada: 7_200_000 },
  { codigo: "1.1.2", receita: "ISS", categoria: "propria", prevista: 14_000_000, arrecadada: 12_800_000 },
  { codigo: "1.1.3", receita: "ITBI", categoria: "propria", prevista: 4_500_000, arrecadada: 4_100_000 },
  { codigo: "2.1.1", receita: "FPM", categoria: "federal", prevista: 95_000_000, arrecadada: 91_000_000 },
  { codigo: "2.1.2", receita: "FUNDEB", categoria: "federal", prevista: 62_000_000, arrecadada: 60_500_000 },
  { codigo: "3.1.1", receita: "ICMS", categoria: "estadual", prevista: 120_000_000, arrecadada: 114_000_000 },
  { codigo: "3.1.2", receita: "IPVA", categoria: "estadual", prevista: 18_000_000, arrecadada: 16_900_000 },
];

async function main() {
  const pool = new Pool({ connectionString: DATABASE_URL });
  const client = await pool.connect();
  try {
    await client.query("begin");

    // Garante o município (caso o import IBGE ainda não tenha rodado).
    await client.query(
      `insert into public.dim_municipio (id_ibge, nome, uf)
       values ($1, 'Nova Londrina', 'PR')
       on conflict (id_ibge) do nothing`,
      [MUNICIPIO],
    );

    // Provisiona o schema do tenant e passa a operar dentro dele.
    // (objetos globais seguem com prefixo public.* explícito.)
    await client.query("select public.provision_municipio($1)", [MUNICIPIO]);
    await client.query(`set search_path to mun_${MUNICIPIO}, public`);

    // Entidades (no schema do tenant — sem municipio_id_ibge).
    const entidades: [string, string][] = [
      ["Prefeitura Municipal de Nova Londrina", "Prefeitura"],
      ["Câmara Municipal de Nova Londrina", "Câmara"],
    ];
    for (const [nome, tipo] of entidades) {
      await client.query(
        `insert into dim_entidade (nome, tipo)
         values ($1, $2)
         on conflict (nome) do nothing`,
        [nome, tipo],
      );
    }
    const {
      rows: [prefeitura],
    } = await client.query<{ id: string }>(
      `select id from dim_entidade where tipo = 'Prefeitura' limit 1`,
    );
    if (!prefeitura) throw new Error("Entidade Prefeitura não encontrada após seed");
    const entidadeId = prefeitura.id;

    // Módulos.
    for (let i = 0; i < MODULOS.length; i++) {
      const [id, label] = MODULOS[i];
      await client.query(
        `insert into public.modulos (id, label, ordem)
         values ($1, $2, $3)
         on conflict (id) do update set label = excluded.label, ordem = excluded.ordem`,
        [id, label, i],
      );
    }

    // Submódulos.
    for (const [moduloId, subs] of Object.entries(SUBMODULOS)) {
      for (let i = 0; i < subs.length; i++) {
        const [slug, label] = subs[i];
        await client.query(
          `insert into public.submodulos (modulo_id, slug, label, ordem)
           values ($1, $2, $3, $4)
           on conflict (modulo_id, slug) do update set label = excluded.label, ordem = excluded.ordem`,
          [moduloId, slug, label, i],
        );
      }
    }

    // Usuário demo.
    const senhaHash = await bcrypt.hash(DEMO_PASSWORD, 10);
    await client.query(
      `insert into public.usuarios (municipio_id_ibge, cpf, nome, cargo, senha_hash, ativo)
       values ($1, $2, 'Prefeito(a) Demonstração', 'Prefeito', $3, true)
       on conflict (municipio_id_ibge, cpf)
       do update set senha_hash = excluded.senha_hash, nome = excluded.nome,
                     cargo = excluded.cargo, ativo = true`,
      [MUNICIPIO, DEMO_CPF, senhaHash],
    );
    const {
      rows: [user],
    } = await client.query<{ id_user: string }>(
      `select id_user from public.usuarios where municipio_id_ibge = $1 and cpf = $2`,
      [MUNICIPIO, DEMO_CPF],
    );
    if (!user) throw new Error("Usuário demo não encontrado após upsert");
    const userId = user.id_user;

    // ACL: acesso total.
    await client.query(
      `insert into public.usuario_modulos (usuario_id, modulo_id)
       select $1, id from public.modulos
       on conflict do nothing`,
      [userId],
    );
    await client.query(
      `insert into public.usuario_submodulos (usuario_id, submodulo_id)
       select $1, id from public.submodulos
       on conflict do nothing`,
      [userId],
    );

    // Fatos (re-seed idempotente da amostra do ano) — no schema do tenant.
    await client.query(`delete from fato_despesa where ano = $1`, [ANO]);
    for (const d of DESPESA) {
      await client.query(
        `insert into fato_despesa
           (entidade_id, ano, mes, orgao, secretaria,
            valor_atualizada, valor_empenhada, valor_liquidada, valor_pago,
            valor_a_empenhar, valor_a_pagar)
         values ($1,$2,null,$3,$3,$4,$5,$6,$7,$8,$9)`,
        [
          entidadeId, ANO, d.orgao,
          d.atualizada, d.empenhada, d.liquidada, d.pago,
          d.atualizada - d.empenhada, d.liquidada - d.pago,
        ],
      );
    }

    await client.query(`delete from fato_receita where ano = $1`, [ANO]);
    for (const r of RECEITA) {
      await client.query(
        `insert into fato_receita
           (entidade_id, ano, mes, codigo, receita, categoria,
            valor_prevista, valor_arrecadada, valor_a_arrecadar)
         values ($1,$2,null,$3,$4,$5,$6,$7,$8)`,
        [
          entidadeId, ANO, r.codigo, r.receita, r.categoria,
          r.prevista, r.arrecadada, r.prevista - r.arrecadada,
        ],
      );
    }

    // Snapshot do módulo Orçamento (números-base; derivados calculados na UI).
    const ORCAMENTO_BASE = {
      receitaPrevista: 580_000_000,
      receitaDeduzida: 45_000_000,
      receitaAlterada: 12_000_000,
      despesaOrcada: 535_000_000,
      despesaSuplementado: 42_000_000,
      despesaReduzido: 28_000_000,
      receitaArrecadada: 512_000_000,
      despesaEmpenhada: 505_000_000,
      metaRealizacaoReceitaPct: 95,
      despesaPessoalOrcado: 265_000_000,
    };
    await client.query(`delete from mod_orcamento where ano = $1`, [ANO]);
    await client.query(
      `insert into mod_orcamento (entidade_id, ano, dados)
       values ($1, $2, $3)`,
      [entidadeId, ANO, JSON.stringify(ORCAMENTO_BASE)],
    );

    // Snapshot do módulo Despesas (display).
    await client.query(`delete from mod_despesa where ano = $1`, [ANO]);
    await client.query(
      `insert into mod_despesa (entidade_id, ano, dados) values ($1, $2, $3)`,
      [entidadeId, ANO, JSON.stringify(DESPESA_SNAPSHOT)],
    );

    // Snapshot do módulo Receitas (display).
    await client.query(`delete from mod_receita where ano = $1`, [ANO]);
    await client.query(
      `insert into mod_receita (entidade_id, ano, dados) values ($1, $2, $3)`,
      [entidadeId, ANO, JSON.stringify(RECEITA_SNAPSHOT)],
    );

    await client.query("commit");
    console.log("Seed demo concluído:");
    console.log(`  município: ${MUNICIPIO} (Nova Londrina/PR)`);
    console.log(`  usuário:   ${DEMO_CPF} (Prefeito) — senha: ${DEMO_PASSWORD}`);
    console.log(`  módulos:   ${MODULOS.length} · submódulos: ${Object.values(SUBMODULOS).flat().length}`);
    console.log(`  fatos:     ${DESPESA.length} despesas + ${RECEITA.length} receitas (ano ${ANO})`);
  } catch (err) {
    await client.query("rollback");
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
