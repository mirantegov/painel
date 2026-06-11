// Builder sim -> mod (hop) — módulo RECEITA, chave `execucao` (grupo A).
// Agrega fato_receita_orcamento (prevista=estágio 10) + fato_receita_movimento
// (arrecadada=estágio 26) no shape do RECEITA_SNAPSHOT e grava mod_receita.
// Classificação origem (própria/estadual/federal/outras) pelo código PCASP:
//   categoria(1) origem(2) espécie(3): cat1+origem1-6 = próprias ·
//   origem7+esp1 = transf. federais · origem7+esp2 = transf. estaduais · resto = outras.
// Seções fora do grupo A (contribuintes, inadimplência, metas, benchmark) ficam no demo.
//
// Uso:  node build_mod_receita.mjs <ibge> <ano…>  · Env: CLICKHOUSE_URL/USER/PASSWORD · DATABASE_URL
import pg from "pg";

const IBGE = process.argv[2];
const ANOS = process.argv.slice(3).map(Number);
if (!/^\d{7}$/.test(IBGE || "") || !ANOS.length) { console.error("uso: node build_mod_receita.mjs <ibge> <ano…>"); process.exit(2); }
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
const MESES = ["", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function bucket(cod) {
  const cat = cod[0], ori = cod[1], esp = cod[2];
  if (cat === "1" && ["1", "2", "3", "4", "5", "6"].includes(ori)) return "proprias";
  if (ori === "7" && esp === "1") return "federais";
  if (ori === "7" && esp === "2") return "estaduais";
  return "outras";
}

async function buildAno(ano, nomes) {
  // prevista por receita (orçamento) + arrecadada por receita (movimento)
  const prev = new Map((await ch(`SELECT cdReceita, round(sum(vlMovimento),2) v FROM ${SIM}.fato_receita_orcamento WHERE nrAno=${ano} GROUP BY cdReceita FORMAT TSV`)).map(([k, v]) => [k, Number(v)]));
  const arr = new Map((await ch(`SELECT cdReceita, round(sum(vlMovimento),2) v FROM ${SIM}.fato_receita_movimento WHERE nrAno=${ano} GROUP BY cdReceita FORMAT TSV`)).map(([k, v]) => [k, Number(v)]));
  const keys = new Set([...prev.keys(), ...arr.keys()]);
  // agrega por receita, classifica, monta linhas
  const buckets = { proprias: [], estaduais: [], federais: [], outras: [] };
  for (const k of keys) {
    const p = prev.get(k) || 0, a = arr.get(k) || 0;
    if (!p && !a) continue;
    buckets[bucket(k)].push({ codigo: k, nome: nomes[k] || `Receita ${k}`, prevista: n(p), arrecadada: n(a), aArrecadar: n(p - a) });
  }
  // top 8 por bucket + rollup "Outras"
  const topN = (arrr, label) => {
    arrr.sort((x, y) => y.arrecadada - x.arrecadada);
    if (arrr.length <= 9) return arrr;
    const top = arrr.slice(0, 8), tail = arrr.slice(8);
    const r = tail.reduce((s, x) => ({ prevista: s.prevista + x.prevista, arrecadada: s.arrecadada + x.arrecadada }), { prevista: 0, arrecadada: 0 });
    return [...top, { codigo: "", nome: `Outras ${label}`, prevista: n(r.prevista), arrecadada: n(r.arrecadada), aArrecadar: n(r.prevista - r.arrecadada) }];
  };
  const receitasProprias = topN(buckets.proprias, "próprias");
  const receitasEstaduais = topN(buckets.estaduais, "estaduais");
  const receitasFederais = topN(buckets.federais, "federais");
  const outrasReceitas = topN(buckets.outras, "receitas");

  const tot = (rows) => rows.reduce((s, r) => ({ prevista: s.prevista + r.prevista, arrecadada: s.arrecadada + r.arrecadada }), { prevista: 0, arrecadada: 0 });
  const mk = (t) => ({ prevista: n(t.prevista), arrecadada: n(t.arrecadada), aArrecadar: n(t.prevista - t.arrecadada) });
  const totaisProprias = mk(tot(receitasProprias)), totaisEstaduais = mk(tot(receitasEstaduais)), totaisFederais = mk(tot(receitasFederais)), totaisOutras = mk(tot(outrasReceitas));
  const totaisGerais = mk({ prevista: totaisProprias.prevista + totaisEstaduais.prevista + totaisFederais.prevista + totaisOutras.prevista,
    arrecadada: totaisProprias.arrecadada + totaisEstaduais.arrecadada + totaisFederais.arrecadada + totaisOutras.arrecadada });

  const distribuicaoOrigem = [
    { nome: "Receitas Próprias", valor: totaisProprias.arrecadada, fill: "var(--chart-1)" },
    { nome: "Transferências Estaduais", valor: totaisEstaduais.arrecadada, fill: "var(--chart-2)" },
    { nome: "Transferências Federais", valor: totaisFederais.arrecadada, fill: "var(--chart-3)" },
    { nome: "Outras Receitas", valor: totaisOutras.arrecadada, fill: "var(--chart-4)" },
  ];

  // evolução mensal (arrecadada por mês) + previsão linear (prevista/12 acumulada não — usa prevista mensal proporcional)
  const evolucaoMensal = (await ch(`SELECT nrMes, round(sum(vlMovimento),2) a FROM ${SIM}.fato_receita_movimento WHERE nrAno=${ano} AND nrMes BETWEEN 1 AND 12 GROUP BY nrMes ORDER BY nrMes FORMAT TSV`))
    .map(([m, a]) => ({ mes: MESES[Number(m)], prevista: n(totaisGerais.prevista / 12), arrecadada: n(a) }));
  // comparativo anual
  const cp = new Map((await ch(`SELECT nrAno, round(sum(vlMovimento),2) v FROM ${SIM}.fato_receita_orcamento GROUP BY nrAno FORMAT TSV`)).map(([y, v]) => [y, Number(v)]));
  const ca = new Map((await ch(`SELECT nrAno, round(sum(vlMovimento),2) v FROM ${SIM}.fato_receita_movimento GROUP BY nrAno FORMAT TSV`)).map(([y, v]) => [y, Number(v)]));
  const comparativoAnual = [...new Set([...cp.keys(), ...ca.keys()])].sort().map((y) => ({ ano: y, prevista: n(cp.get(y) || 0), arrecadada: n(ca.get(y) || 0) }));

  return {
    execucao: {
      totaisGerais, totaisProprias, totaisEstaduais, totaisFederais, totaisOutras,
      receitasProprias, receitasEstaduais, receitasFederais, outrasReceitas,
      distribuicaoOrigem, evolucaoMensal, comparativoAnual,
    },
  };
}

const client = new pg.Client({ connectionString: PG });
await client.connect();
await client.query(`set search_path to mun_${IBGE}, public`);
// nomes das receitas (código -> descrição) do cadastro siscop_receita
const nomes = Object.fromEntries((await ch(`SELECT receita, upperUTF8(convertCharset(anyLast(descricao),'Latin1','UTF-8')) FROM ${RAW}.siscop_receita GROUP BY receita FORMAT TSV`)));
for (const ano of ANOS) {
  const chaves = await buildAno(ano, nomes);
  await client.query(`delete from mod_receita where ano=$1`, [ano]);
  for (const [chave, dados] of Object.entries(chaves))
    await client.query(`insert into mod_receita (entidade_id, ano, chave, dados) values (NULL,$1,$2,$3::jsonb)`, [ano, chave, JSON.stringify(dados)]);
  console.log(`ano ${ano}: -> mun_${IBGE}.mod_receita (arrecadada=${chaves.execucao.totaisGerais.arrecadada} prevista=${chaves.execucao.totaisGerais.prevista})`);
}
await client.end();
console.log("OK");
