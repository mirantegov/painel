// Builder sim -> mod (hop) para o módulo PLANEJAMENTO (orcamento).
// Lê os fatos analíticos em sim_<ibge> (ClickHouse) + resolve nomes de dimensão do
// raw siscop, agrega no shape do snapshot do componente e escreve mod_orcamento no
// Postgres (mun_<ibge>), PARTICIONADO POR CHAVE (uma por tabela/card) — assim cada
// componente recebe dados independente (mesmo padrão de despesa/receita).
//
// Uso:  node build_mod_orcamento.mjs <ibge> [ano1 ano2 ...]
// Env:  CLICKHOUSE_URL/USER/PASSWORD (origem)  ·  DATABASE_URL (destino Postgres)
import pg from "pg";

const IBGE = process.argv[2];
const ANOS = process.argv.slice(3).map(Number);
if (!/^\d{7}$/.test(IBGE || "") || ANOS.length === 0) {
  console.error("uso: node build_mod_orcamento.mjs <ibge> <ano> [ano...]");
  process.exit(2);
}
const CH = process.env.CLICKHOUSE_URL || "http://127.0.0.1:8123/";
const CHU = process.env.CLICKHOUSE_USER || "default";
const CHP = process.env.CLICKHOUSE_PASSWORD || "";
const PG = process.env.DATABASE_URL || "postgresql://postgres:postgres@127.0.0.1:54322/postgres";
const SIM = `sim_${IBGE}`, RAW = `raw_${IBGE}`;

async function ch(sql) {
  const r = await fetch(CH, {
    method: "POST",
    headers: { Authorization: "Basic " + Buffer.from(`${CHU}:${CHP}`).toString("base64") },
    body: sql,
  });
  if (!r.ok) throw new Error(`CH ${r.status}: ${await r.text()}`);
  const t = (await r.text()).trim();
  return t ? t.split("\n").map((l) => l.split("\t")) : [];
}
const n = (v) => Math.round(Number(v) * 100) / 100;

// nome com encoding latin1 corrigido no ClickHouse (convertCharset)
const NM = "upperUTF8(convertCharset(d.descricao,'Latin1','UTF-8'))";

// mapa código->nome de um nível da despesa (nivellei: O=órgão, F=função, SF=subfunção)
async function dimNomes(nivellei, ano) {
  const rows = await ch(
    `SELECT DISTINCT substring(d.programatica, toUInt8(nv.posicao), toUInt8(nv.tamanho)) AS cod, ${NM} AS nome
     FROM ${RAW}.siscop_despesa d
     INNER JOIN ${RAW}.siscop_niveismodelodespesa nv
       ON d.modelodespesa=nv.modelodespesa AND d.tipo=nv.tipo AND d.nivel=nv.ordem
     WHERE nv.nivellei='${nivellei}' AND d.exercicio=${ano} FORMAT TSV`);
  return Object.fromEntries(rows.map(([c, nm]) => [c, nm]));
}
async function fonteNomes() {
  const rows = await ch(
    `SELECT toString(toUInt32(fonterecurso)) cod, convertCharset(descricao,'Latin1','UTF-8') nm
     FROM ${RAW}.siscop_fonterecurso FORMAT TSV`);
  return Object.fromEntries(rows.map(([c, nm]) => [c, nm]));
}

// rótulos padrão (PCASP / Portaria) — fixos nacionalmente
const NAT_GRUPO = { "31": "Pessoal e Encargos", "32": "Juros e Encargos da Dívida",
  "33": "Outras Despesas Correntes", "44": "Investimentos", "45": "Inversões Financeiras",
  "46": "Amortização da Dívida", "30": "Despesas Correntes", "40": "Despesas de Capital" };
const CAT_DESP = { "3": "Corrente", "4": "Capital", "9": "Reserva" };
const REC_ORIGEM = { // (categoria+origem) -> rótulo
  "11": "Impostos, Taxas e Contrib. de Melhoria", "12": "Contribuições", "13": "Patrimonial",
  "16": "Serviços", "17": "Transferências Correntes", "19": "Outras Receitas Correntes",
  "21": "Operações de Crédito", "22": "Alienação de Bens", "23": "Amortização de Empréstimos",
  "24": "Transferências de Capital", "29": "Outras Receitas de Capital" };

async function buildAno(ano, fontes, orgaoNm, funcaoNm) {
  // ── DESPESA orçamento (estágio 10) ──
  const dEsc = (await ch(
    `SELECT round(sumIf(vlMovimento,cdProcedimento=111),2), round(sumIf(vlMovimento,cdProcedimento=112),2),
            round(sumIf(vlMovimento,cdProcedimento=113),2), round(sumIf(vlMovimento, substring(natureza,1,2)='31'),2)
     FROM ${SIM}.fato_despesa_orcamento WHERE nrAno=${ano} FORMAT TSV`))[0];
  // ── RECEITA orçamento (estágio 10) ──
  const rEsc = (await ch(
    `SELECT round(sumIf(vlMovimento,cdProcedimento=101),2), round(sumIf(vlMovimento,cdProcedimento=102),2)
     FROM ${SIM}.fato_receita_orcamento WHERE nrAno=${ano} FORMAT TSV`))[0];
  // ── EXECUÇÃO ──
  const emp = (await ch(`SELECT round(sumIf(vlMovimento,cdEstagio=16),2) FROM ${SIM}.fato_despesa_movimento WHERE nrAno=${ano} FORMAT TSV`))[0][0];
  const arr = (await ch(`SELECT round(sum(vlMovimento),2) FROM ${SIM}.fato_receita_movimento WHERE nrAno=${ano} FORMAT TSV`))[0][0];

  // helper: breakdown {dim, orcado(111/101), atualizado(sum)} -> linhas {nome,orcado,atualizado}
  const breakdownDesp = async (dimExpr, orcProc) => ch(
    `SELECT ${dimExpr} k, round(sumIf(vlMovimento,cdProcedimento=${orcProc}),2) orc, round(sum(vlMovimento),2) atu
     FROM ${SIM}.fato_despesa_orcamento WHERE nrAno=${ano} GROUP BY k HAVING atu<>0 ORDER BY atu DESC FORMAT TSV`);
  const breakdownRec = async (dimExpr) => ch(
    `SELECT ${dimExpr} k, round(sumIf(vlMovimento,cdProcedimento=101),2) orc, round(sum(vlMovimento),2) atu
     FROM ${SIM}.fato_receita_orcamento WHERE nrAno=${ano} GROUP BY k HAVING atu<>0 ORDER BY atu DESC FORMAT TSV`);

  const despFuncao = (await breakdownDesp("funcao", 111)).map(([k, o, a]) => ({ nome: funcaoNm[k] || `Função ${k}`, orcado: n(o), atualizado: n(a) }));
  const despSecretaria = (await breakdownDesp("orgao", 111)).map(([k, o, a]) => ({ nome: orgaoNm[k] || `Órgão ${k}`, orcado: n(o), atualizado: n(a) }));
  const despFonte = (await breakdownDesp("fonteRecurso", 111)).map(([k, o, a]) => ({ nome: fontes[k] || `Fonte ${k}`, orcado: n(o), atualizado: n(a) }));
  const despNatureza = (await breakdownDesp("concat(substring(natureza,1,1),substring(natureza,2,1))", 111))
    .map(([k, o, a]) => ({ nome: NAT_GRUPO[k] || `Natureza ${k}`, categoria: CAT_DESP[k[0]] || "Outras", orcado: n(o), atualizado: n(a) }));
  const recOrigemNat = (await breakdownRec("concat(categoria,origem)")).map(([k, o, a]) => ({ nome: REC_ORIGEM[k] || `Origem ${k}`, orcado: n(o), atualizado: n(a) }));
  const recFonte = (await breakdownRec("fonteRecurso")).map(([k, o, a]) => ({ nome: fontes[k] || `Fonte ${k}`, orcado: n(o), atualizado: n(a) }));

  // evolução (todos os anos, recalculada igual em cada linha de ano)
  const evoD = (await ch(`SELECT nrAno, round(sumIf(vlMovimento,cdProcedimento=111),2), round(sum(vlMovimento),2) FROM ${SIM}.fato_despesa_orcamento GROUP BY nrAno ORDER BY nrAno FORMAT TSV`)).map(([y, o, a]) => ({ ano: y, orcada: n(o), atualizada: n(a) }));
  const evoR = (await ch(`SELECT nrAno, round(sumIf(vlMovimento,cdProcedimento=101),2), round(sum(vlMovimento),2) FROM ${SIM}.fato_receita_orcamento GROUP BY nrAno ORDER BY nrAno FORMAT TSV`)).map(([y, o, a]) => ({ ano: y, orcada: n(o), atualizada: n(a) }));

  // chaves (fino: por tabela/card). Cada uma vira 1 linha em mod_orcamento.
  return {
    "desp-loa": { despesaOrcada: n(dEsc[0]), despesaSuplementado: n(dEsc[1]), despesaReduzido: n(Math.abs(dEsc[2])), despesaPessoalOrcado: n(dEsc[3]) },
    "rec-loa": { receitaPrevista: n(rEsc[0]), receitaDeduzida: n(Math.abs(rEsc[1])), receitaAlterada: 0 },
    "execucao": { despesaEmpenhada: n(emp), receitaArrecadada: n(arr) },
    "metas": { metaRealizacaoReceitaPct: 95 },
    "desp-funcao": { despesaPorFuncao: despFuncao },
    "desp-secretaria": { despesaPorSecretaria: despSecretaria },
    "desp-fonte": { despesaPorFonte: despFonte },
    "desp-natureza": { despesaPorNatureza: despNatureza },
    "rec-origem-natureza": { receitaPorOrigemNatureza: recOrigemNat },
    "rec-fonte": { receitaPorFonte: recFonte },
    "desp-evolucao": { evolucaoDespesa: evoD },
    "rec-evolucao": { evolucaoReceita: evoR },
  };
}

const client = new pg.Client({ connectionString: PG });
await client.connect();
await client.query(`set search_path to mun_${IBGE}, public`);
const fontes = await fonteNomes();
for (const ano of ANOS) {
  const orgaoNm = await dimNomes("O", ano), funcaoNm = await dimNomes("F", ano);
  const chaves = await buildAno(ano, fontes, orgaoNm, funcaoNm);
  await client.query(`delete from mod_orcamento where ano=$1`, [ano]);
  for (const [chave, dados] of Object.entries(chaves)) {
    await client.query(
      `insert into mod_orcamento (entidade_id, ano, chave, dados) values (NULL,$1,$2,$3::jsonb)`,
      [ano, chave, JSON.stringify(dados)]);
  }
  console.log(`ano ${ano}: ${Object.keys(chaves).length} chaves gravadas em mun_${IBGE}.mod_orcamento`);
}
await client.end();
console.log("OK");
