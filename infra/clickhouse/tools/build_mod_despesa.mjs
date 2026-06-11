// Builder sim -> mod (hop) — módulo DESPESA, chave `execucao` (grupo A).
// Agrega fato_despesa_orcamento (atualizada=estágio 10) + fato_despesa_movimento
// (empenhada=16, pago=18) no shape do DESPESA_SNAPSHOT e grava mod_despesa
// (mun_<ibge>) no Postgres. Seções fora do grupo A (licitações, fornecedores,
// LRF, restos, benchmark, metas, eventos) ficam no fallback demo (merge no app).
//
// Uso:  node build_mod_despesa.mjs <ibge> <ano> [ano...]
// Env:  CLICKHOUSE_URL/USER/PASSWORD · DATABASE_URL
import pg from "pg";

const IBGE = process.argv[2];
const ANOS = process.argv.slice(3).map(Number);
if (!/^\d{7}$/.test(IBGE || "") || !ANOS.length) { console.error("uso: node build_mod_despesa.mjs <ibge> <ano…>"); process.exit(2); }
const CH = process.env.CLICKHOUSE_URL || "http://127.0.0.1:8123/";
const CHU = process.env.CLICKHOUSE_USER || "default", CHP = process.env.CLICKHOUSE_PASSWORD || "";
const PG = process.env.DATABASE_URL || "postgresql://postgres:postgres@127.0.0.1:54322/postgres";
const SIM = `sim_${IBGE}`, RAW = `raw_${IBGE}`;

async function ch(sql) {
  const r = await fetch(CH, { method: "POST", headers: { Authorization: "Basic " + Buffer.from(`${CHU}:${CHP}`).toString("base64") }, body: sql });
  if (!r.ok) throw new Error(`CH ${r.status}: ${await r.text()}`);
  const t = (await r.text()).trim();
  return t ? t.split("\n").map((l) => l.split("\t")) : [];
}
const n = (v) => Math.round(Number(v) * 100) / 100;
const NM = "upperUTF8(convertCharset(d.descricao,'Latin1','UTF-8'))";

async function dimNomes(nivellei, ano) {
  const rows = await ch(
    `SELECT DISTINCT substring(d.programatica, toUInt8(nv.posicao), toUInt8(nv.tamanho)) cod, ${NM} nome
     FROM ${RAW}.siscop_despesa d INNER JOIN ${RAW}.siscop_niveismodelodespesa nv
       ON d.modelodespesa=nv.modelodespesa AND d.tipo=nv.tipo AND d.nivel=nv.ordem
     WHERE nv.nivellei='${nivellei}' AND d.exercicio=${ano} FORMAT TSV`);
  return Object.fromEntries(rows.map(([c, nm]) => [c, nm]));
}

// breakdown por dimensão: atualizada (orçamento) + empenhada/pago (movimento) -> {cod, atualizada, empenhada, aEmpenhar, pago, aPagar}
async function breakdown(ano, dim) {
  const orc = new Map((await ch(`SELECT ${dim} k, round(sum(vlMovimento),2) v FROM ${SIM}.fato_despesa_orcamento WHERE nrAno=${ano} GROUP BY k FORMAT TSV`)).map(([k, v]) => [k, Number(v)]));
  const mov = new Map((await ch(`SELECT ${dim} k, round(sumIf(vlMovimento,cdEstagio=16),2) e, round(sumIf(vlMovimento,cdEstagio=18),2) p FROM ${SIM}.fato_despesa_movimento WHERE nrAno=${ano} GROUP BY k FORMAT TSV`)).map(([k, e, p]) => [k, { e: Number(e), p: Number(p) }]));
  const keys = new Set([...orc.keys(), ...mov.keys()]);
  return [...keys].map((k) => { const atu = orc.get(k) || 0, m = mov.get(k) || { e: 0, p: 0 };
    return { cod: k, atualizada: n(atu), empenhada: n(m.e), aEmpenhar: n(atu - m.e), pago: n(m.p), aPagar: n(m.e - m.p) }; })
    .filter((r) => r.atualizada || r.empenhada).sort((a, b) => b.atualizada - a.atualizada);
}

async function buildAno(ano, nomes, fornMap) {
  const { orgao, unidade, funcao, subfuncao, programa, acao } = nomes;
  const linha = (r, extra) => ({ ...extra, atualizada: r.atualizada, empenhada: r.empenhada, aEmpenhar: r.aEmpenhar, pago: r.pago, aPagar: r.aPagar });

  const dadosÓrgãos = (await breakdown(ano, "orgao")).map((r) => linha(r, { codigo: r.cod, nome: orgao[r.cod] || `Órgão ${r.cod}` }));
  const dadosUnidades = (await breakdown(ano, "unidade")).map((r) => linha(r, { codigo: r.cod, nome: unidade[r.cod] || `Unidade ${r.cod}` }));
  const dadosFuncaoSubfuncao = (await breakdown(ano, "concat(funcao,'|',subfuncao)")).map((r) => { const [f, sf] = r.cod.split("|");
    return linha(r, { funcao: f, subfuncao: sf, nome: `${funcao[f] || f} / ${subfuncao[sf] || sf}` }); });
  const dadosProgramas = (await breakdown(ano, "programa")).map((r) => linha(r, { codigo: r.cod, nome: programa[r.cod] || `Programa ${r.cod}` }));
  const dadosAcoes = (await breakdown(ano, "acao")).map((r) => linha(r, { codigo: r.cod, tipo: r.cod[0] === "1" ? "Projeto" : r.cod[0] === "2" ? "Atividade" : "Operação Especial", nome: acao[r.cod] || `Ação ${r.cod}` }));
  const dadosSecretarias = (await breakdown(ano, "orgao")).map((r) => linha(r, { sigla: (orgao[r.cod] || r.cod).split(" ").map((w) => w[0]).join("").slice(0, 5), nome: orgao[r.cod] || `Órgão ${r.cod}` }));

  // totais
  const T = dadosÓrgãos.reduce((a, r) => ({ atualizada: a.atualizada + r.atualizada, empenhada: a.empenhada + r.empenhada, pago: a.pago + r.pago }), { atualizada: 0, empenhada: 0, pago: 0 });
  const totais = { atualizada: n(T.atualizada), empenhada: n(T.empenhada), aEmpenhar: n(T.atualizada - T.empenhada), pago: n(T.pago), aPagar: n(T.empenhada - T.pago) };

  // evolução mensal (movimento) + comparativo anual
  const evolucaoMensal = (await ch(`SELECT nrMes, round(sumIf(vlMovimento,cdEstagio=16),2) e, round(sumIf(vlMovimento,cdEstagio=18),2) p FROM ${SIM}.fato_despesa_movimento WHERE nrAno=${ano} AND nrMes BETWEEN 1 AND 12 GROUP BY nrMes ORDER BY nrMes FORMAT TSV`))
    .map(([m, e, p]) => ({ mes: ["", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][Number(m)], empenhado: n(e), pago: n(p) }));
  const ca = new Map((await ch(`SELECT nrAno, round(sumIf(vlMovimento,cdEstagio=16),2) e, round(sumIf(vlMovimento,cdEstagio=18),2) p FROM ${SIM}.fato_despesa_movimento GROUP BY nrAno FORMAT TSV`)).map(([y, e, p]) => [y, { e: Number(e), p: Number(p) }]));
  const cAtu = new Map((await ch(`SELECT nrAno, round(sum(vlMovimento),2) v FROM ${SIM}.fato_despesa_orcamento GROUP BY nrAno FORMAT TSV`)).map(([y, v]) => [y, Number(v)]));
  const comparativoAnual = [...cAtu.keys()].sort().map((y) => ({ ano: y, atualizada: n(cAtu.get(y) || 0), empenhada: n((ca.get(y) || {}).e || 0), pago: n((ca.get(y) || {}).p || 0) }));

  // categoria econômica (treemap) — empenhada por grupo de natureza
  const NAT = { "31": "Pessoal e Encargos", "32": "Juros e Encargos", "33": "Outras Desp. Correntes", "44": "Investimentos", "45": "Inversões Financeiras", "46": "Amortização da Dívida" };
  const cat = (await ch(`SELECT concat(substring(natureza,1,1),substring(natureza,2,1)) g, round(sumIf(vlMovimento,cdEstagio=16),2) e FROM ${SIM}.fato_despesa_movimento WHERE nrAno=${ano} GROUP BY g HAVING e<>0 ORDER BY e DESC FORMAT TSV`));
  const treemapData = cat.map(([g, e], i) => ({ name: NAT[g] || `Natureza ${g}`, value: n(e), fill: `var(--chart-${(i % 5) + 1})` }));
  // corrente x capital
  const cc = (await ch(`SELECT substring(natureza,1,1) c, round(sumIf(vlMovimento,cdEstagio=16),2) e FROM ${SIM}.fato_despesa_movimento WHERE nrAno=${ano} GROUP BY c FORMAT TSV`));
  const corrente = n(Number((cc.find((r) => r[0] === "3") || [, 0])[1]));
  const capital = n(Number((cc.find((r) => r[0] === "4") || [, 0])[1]));
  const totalCC = corrente + capital || 1;
  const sub = (catDigit) => treemapData.filter((t) => Object.keys(NAT).find((k) => NAT[k] === t.name && k[0] === catDigit)).map((t) => ({ nome: t.name, valor: t.value }));
  const despesaCorrenteCapital = [
    { tipo: "Despesas Correntes", valor: corrente, percentual: n((corrente / totalCC) * 100), subcategorias: sub("3") },
    { tipo: "Despesas de Capital", valor: capital, percentual: n((capital / totalCC) * 100), subcategorias: sub("4") },
  ];
  const despesaCorrenteCapitalChart = [
    { nome: "Correntes", valor: corrente, fill: "var(--chart-1)" },
    { nome: "Capital", valor: capital, fill: "var(--chart-2)" },
  ];

  // top fornecedores: empenhado (estágio 16) por idFornecedor ⋈ nome/cnpj do raw
  const topF = await ch(`SELECT toString(idFornecedor) id, round(sumIf(vlMovimento,cdEstagio=16),2) v FROM ${SIM}.fato_despesa_movimento WHERE nrAno=${ano} AND idFornecedor>0 GROUP BY id ORDER BY v DESC LIMIT 10 FORMAT TSV`);
  const denomF = totais.empenhada || 1;
  const topFornecedores = topF.map(([id, v]) => { const f = fornMap.get(id) || {}; return { nome: f.nome || `Fornecedor ${id}`, cnpj: f.cnpj || "", valor: n(v), percentual: n((Number(v) / denomF) * 100) }; });

  return {
    execucao: { totais, evolucaoMensal, comparativoAnual, dadosÓrgãos, dadosUnidades, dadosFuncaoSubfuncao, dadosProgramas, dadosAcoes, dadosSecretarias, treemapData, despesaCorrenteCapital, despesaCorrenteCapitalChart, topFornecedores },
  };
}

const client = new pg.Client({ connectionString: PG });
await client.connect();
await client.query(`set search_path to mun_${IBGE}, public`);
// fornecedor é global (sem entidade) — lookup id -> {nome, cnpj} uma vez
const fornRows = await ch(`SELECT toString(toUInt32(fornecedor)) id, upperUTF8(convertCharset(anyLast(nome),'Latin1','UTF-8')) nm, anyLast(cnpj) cnpj FROM ${RAW}.siscop_fornecedor GROUP BY id FORMAT TSV`);
const fornMap = new Map(fornRows.map(([id, nm, cnpj]) => [id, { nome: nm, cnpj }]));
for (const ano of ANOS) {
  const nomes = { orgao: await dimNomes("O", ano), unidade: await dimNomes("U", ano), funcao: await dimNomes("F", ano), subfuncao: await dimNomes("SF", ano), programa: await dimNomes("P", ano), acao: await dimNomes("PA", ano) };
  const chaves = await buildAno(ano, nomes, fornMap);
  await client.query(`delete from mod_despesa where ano=$1`, [ano]);
  for (const [chave, dados] of Object.entries(chaves))
    await client.query(`insert into mod_despesa (entidade_id, ano, chave, dados) values (NULL,$1,$2,$3::jsonb)`, [ano, chave, JSON.stringify(dados)]);
  console.log(`ano ${ano}: chave(s) ${Object.keys(chaves).join(",")} -> mun_${IBGE}.mod_despesa (totais empenhada=${chaves.execucao.totais.empenhada})`);
}
await client.end();
console.log("OK");
