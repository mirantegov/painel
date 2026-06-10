#!/usr/bin/env node
// Auditoria estrutural dos módulos ativos do dashboard — FOLDER-AWARE.
//
// Por que existe: a detecção ingênua (grep só no arquivo de topo) dá falso-
// negativo nos módulos COMPLEXOS (legislativo/previdencia/saneamento), cujos
// KPIs/gráficos vivem em sub-componentes na pasta do módulo. Aqui agregamos as
// features varrendo TODOS os .tsx da pasta de cada módulo. Layouts alternativos
// aceitos (ex.: licitacoes-painel = tabela executiva) não contam como pendência.
//
// Fonte da lista: lib/modules-config.ts (imports + MODULES + DEFAULT_ENABLED).
//
// Uso:
//   node scripts/audit-modules.mjs            # imprime o relatório (markdown)
//   node scripts/audit-modules.mjs --write    # (re)gera docs/audit-modules-baseline.md
//   node scripts/audit-modules.mjs --check     # invariante: todo módulo ativo tem
//                                              # snapshot/demo + arquivo resolve. exit 1 se falhar.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const MODE = args.has("--write") ? "write" : args.has("--check") ? "check" : "print";

// Layouts alternativos aceitos: módulos sem KpiCard/Recharts POR DESIGN.
const ALT_LAYOUT = { "licitacoes-painel": "tabela executiva" };

// ── 1. Lista de módulos a partir de lib/modules-config.ts ──────────────
const cfg = readFileSync(join(ROOT, "lib/modules-config.ts"), "utf8");

const importMap = {}; // Identificador do componente -> caminho repo-relativo
for (const m of cfg.matchAll(
  /import\s*\{\s*([A-Za-z0-9_]+)\s*\}\s*from\s*"@\/(components\/[^"]+)"/g,
)) {
  importMap[m[1]] = m[2];
}

const modules = []; // { id, comp } na ordem de MODULES
for (const m of cfg.matchAll(
  /id:\s*"([a-z0-9-]+)"[\s\S]{0,220}?component:\s*([A-Za-z0-9_]+)/g,
)) {
  modules.push({ id: m[1], comp: m[2] });
}

const enabled = new Set(
  (cfg.match(/DEFAULT_ENABLED_MODULE_IDS\s*=\s*\[([\s\S]*?)\]/)?.[1] ?? "")
    .match(/"([a-z0-9-]+)"/g)
    ?.map((s) => s.replace(/"/g, "")) ?? [],
);

// ── 2. Resolver os arquivos de cada módulo (folder-aware) ──────────────
function listTsx(dir) {
  const out = [];
  for (const e of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    if (e.isDirectory()) out.push(...listTsx(join(dir, e.name)));
    else if (e.name.endsWith(".tsx")) out.push(join(dir, e.name));
  }
  return out;
}
function filesFor(path) {
  const segs = path.split("/"); // components/foo  OU  components/dir/file
  if (segs.length > 2) return listTsx(segs.slice(0, 2).join("/")); // pasta do módulo
  return [`${path}.tsx`]; // módulo simples
}

// ── 3. Detecção de features (agregada sobre os arquivos do módulo) ─────
const DETECT = {
  kpi: (s) => /kpi-card|<KpiCard\b/.test(s),
  charts: (s) => /\b(Bar|Area|Line|Pie|Radar|Composed|Scatter)Chart\b/.test(s),
  subtabs: (s) => /<Tabs\b/.test(s),
  alertas: (s) => /@\/components\/ui\/alert|<Alert\b/.test(s),
  snapshot: (s) => /useSnapshot|@\/lib\/demo-/.test(s),
  analiseSec: (s) => /Análise Inteligente/.test(s), // seção padrão (/add-analise)
  analiseLoose: (s) => /Análise/.test(s), // menção avulsa (parcial)
  resumo: (s) => /Resumo Anal[íi]tico/.test(s),
};
function accordionItems(s) {
  return (s.match(/<AccordionItem\b/g) ?? []).length;
}

const rows = [];
for (const { id, comp } of modules) {
  const path = importMap[comp];
  let blob = "",
    files = [],
    missing = false;
  try {
    files = filesFor(path);
    blob = files.map((f) => readFileSync(join(ROOT, f), "utf8")).join("\n");
  } catch {
    missing = true;
  }
  const alt = ALT_LAYOUT[id];
  const acc = accordionItems(blob);
  rows.push({
    id,
    files: files.length,
    enabled: enabled.has(id),
    missing,
    alt,
    kpi: missing ? null : DETECT.kpi(blob),
    charts: missing ? null : DETECT.charts(blob),
    subtabs: missing ? null : DETECT.subtabs(blob),
    analise: missing
      ? null
      : DETECT.analiseSec(blob)
        ? "full"
        : DETECT.analiseLoose(blob)
          ? "loose"
          : "no",
    accordion: acc,
    resumo: missing ? null : DETECT.resumo(blob),
    alertas: missing ? null : DETECT.alertas(blob),
    snapshot: missing ? null : DETECT.snapshot(blob),
  });
}

// ── 4. Modo --check: invariante (snapshot + arquivo resolve) ───────────
if (MODE === "check") {
  const bad = rows.filter((r) => r.missing || !r.snapshot);
  if (bad.length) {
    console.error("✗ audit-modules: invariante falhou —");
    for (const r of bad)
      console.error(`  ${r.id}: ${r.missing ? "arquivo não resolvido" : "sem snapshot/demo"}`);
    process.exit(1);
  }
  console.log(`✓ audit-modules: ${rows.length} módulos ativos, todos com snapshot/demo.`);
  process.exit(0);
}

// ── 5. Render markdown ─────────────────────────────────────────────────
const yn = (b) => (b === null ? "?" : b ? "✅" : "❌");
const naAlt = (v, alt) => (alt ? "— *(alt)*" : yn(v));
const analiseCell = (v) =>
  v === null ? "?" : v === "full" ? "✅" : v === "loose" ? "⚠️" : "❌";
const accCell = (n) => (n >= 4 ? `✅(${n})` : n > 0 ? `⚠️(${n})` : `❌(0)`);

const today = process.env.AUDIT_DATE || ""; // estampar fora (data não-determinística no runtime)
const header = `# Auditoria de módulos — baseline (Gate.5 / MIR-26)

> Gerado por \`scripts/audit-modules.mjs\` (folder-aware) a partir de \`lib/modules-config.ts\`.
> Regenerar: \`node scripts/audit-modules.mjs --write\`. Invariante (CI): \`--check\`.
> É um **baseline** de consistência, não um gate bloqueante (salvo o invariante de snapshot).

Legenda: ✅ presente · ❌ ausente · ⚠️ parcial · \`— (alt)\` layout alternativo aceito · \`(n)\` nº de AccordionItem.
Detecção **agrega todos os \`.tsx\` da pasta** do módulo (módulos complexos não são subreportados).`;

const tableHead = `| Módulo | Arq. | Ativo | KpiCard | Gráficos | Sub-tabs | Análises | Accordion | Resumo | Alertas | Snapshot |
|---|---|---|---|---|---|---|---|---|---|---|`;
const tableRows = rows
  .map(
    (r) =>
      `| ${r.id} | ${r.files} | ${r.enabled ? "✅" : "—"} | ${naAlt(r.kpi, r.alt)} | ${naAlt(r.charts, r.alt)} | ${yn(r.subtabs)} | ${analiseCell(r.analise)} | ${accCell(r.accordion)} | ${yn(r.resumo)} | ${yn(r.alertas)} | ${yn(r.snapshot)} |`,
  )
  .join("\n");

const n = rows.length;
const count = (pred) => rows.filter(pred).length;
const totals = `**Totais (${n} módulos ativos):** Snapshot ${count((r) => r.snapshot)}/${n} · KpiCard ${count((r) => r.kpi)}/${n} · Gráficos ${count((r) => r.charts)}/${n} · Sub-tabs ${count((r) => r.subtabs)}/${n} · Análises(seção) ${count((r) => r.analise === "full")}/${n} · Resumo ${count((r) => r.resumo)}/${n} · Alertas ${count((r) => r.alertas)}/${n}.`;

const altList = Object.entries(ALT_LAYOUT)
  .map(([k, v]) => `\`${k}\` (${v})`)
  .join(", ");
const semAnalise = rows
  .filter((r) => r.analise !== "full" && !r.alt)
  .map((r) => r.id)
  .join(", ");

const footer = `## Como ler

- **Snapshot** é o **invariante** (camada de dados): todo módulo ativo deve ter \`useSnapshot\`/\`lib/demo-*\`. Protegido por \`--check\` no CI.
- **Layouts alternativos aceitos** (\`— (alt)\`): ${altList}. Não contam como pendência de KPI/gráfico.
- **Análises**: ✅ = seção padrão (\`Análise Inteligente\`, via \`/add-analise\`); ⚠️ = só menção avulsa de "Análise"; ❌ = ausente.

## Backlog de qualidade (E5 — não bloqueia a fase de pipeline)

- **Seção "Análises" padrão ausente:** ${semAnalise || "—"}. Usar \`/add-analise\`.
- **"Resumo Analítico"**: padrão ainda não adotado (${count((r) => r.resumo)}/${n}) — decidir se entra no design.
- **Alertas**: avaliar caso a caso (nem todo módulo precisa de \`<Alert>\`).`;

const doc = `${header}\n${today ? `\n*Gerado em: ${today}*\n` : ""}\n${tableHead}\n${tableRows}\n\n${totals}\n\n${footer}\n`;

if (MODE === "write") {
  writeFileSync(join(ROOT, "docs/audit-modules-baseline.md"), doc);
  console.log("escrito: docs/audit-modules-baseline.md");
} else {
  process.stdout.write(doc + "\n");
}
