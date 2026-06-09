#!/usr/bin/env python3
"""Gera DDL ClickHouse a partir do tables.json (layout SIM-AM).

Saídas:
  schema/simam/<NN>_<modulo>.sql  : tabelas canônicas tratadas (tipadas, layout SIM-AM)
  schema/raw/<NN>_<modulo>.sql    : tabelas de landing (todas as colunas String) p/ ingestão MinIO
  schema/seeds/<NN>_<modulo>.sql  : tabelas de domínio (lookups) + INSERT dos dados inline

Mapa de tipos: Data->Date32, Valor/Decimal->Decimal(p,s), Caractere->String,
Numérico->UInt32/64 (ou Decimal se PIC com V). Campos sem formato (perdidos no
PDF) inferem tipo pelo prefixo (dt/vl/id/tp/cd/...). Coluna não-obrigatória vira
Nullable. Metadados de proveniência (_id_entidade/_exercicio/_competencia/_fonte/
_ingerido_em) anexados a toda tabela canônica e raw.
"""
import json
import os
import re
import sys
import unicodedata

ROOT = os.path.join(os.path.dirname(__file__), "..")
SCHEMA = os.path.join(ROOT, "schema")

MODULE_SLUG = {
    "TABELAS CADASTRAIS": "cadastrais",
    "MÓDULO PLANEJAMENTO E ORÇAMENTO": "planejamento",
    "MÓDULO CONTÁBIL": "contabil",
    "MÓDULO TESOURARIA": "tesouraria",
    "MÓDULO LICITAÇÕES": "licitacoes",
    "MÓDULO CONTRATOS": "contratos",
    "MÓDULO PATRIMÔNIO": "patrimonio",
    "MÓDULO CONTROLE INTERNO": "controle_interno",
    "MÓDULO TRIBUTÁRIO": "tributario",
    "MÓDULO DE OBRAS PÚBLICAS": "obras",
}
MODULE_ORDER = list(MODULE_SLUG.keys())

META_CANON = """    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()"""


def ident(name):
    """Sanitiza nome para identificador ClickHouse válido."""
    n = re.sub(r"[^A-Za-z0-9_]", "_", name)
    if not n or not re.match(r"[A-Za-z_]", n[0]):
        n = "c_" + n
    return n


def count_digits(s):
    total = 0
    for m in re.finditer(r"[9ZX]\((\d+)\)", s):
        total += int(m.group(1))
    s2 = re.sub(r"[9ZX]\(\d+\)", "", s)
    total += s2.count("9")
    return total


def decimal_type(fmt):
    if "V" in fmt:
        ip, fp = fmt.split("V", 1)
        p_int = count_digits(ip)
        p_frac = count_digits(fp) or 2
        return f"Decimal({max(p_int + p_frac, p_frac + 1)},{p_frac})"
    return "Decimal(18,2)"


def uint_for(digits):
    if digits <= 0:
        digits = 9
    if digits <= 9:
        return "UInt32"
    if digits <= 18:
        return "UInt64"
    return "UInt128"


def infer_prefix(name):
    p = name[:2].lower()
    if name[:2].lower() == "dt":
        return "Date32"
    if p in ("vl", "vr"):
        return "Decimal(18,2)"
    if p == "id":
        return "UInt32"
    if p == "tp":
        return "UInt16"
    if p == "qt":
        return "UInt32"
    if p == "pc":
        return "Decimal(9,4)"
    return "String"  # cd, nr, nm, ds, fl, sg, ...


def base_type(f):
    tipo, fmt, size, name = f["tipo"], f["formato"], f["size"], f["name"]
    if tipo == "Data":
        return "Date32"
    if tipo in ("Valor", "Decimal"):
        return decimal_type(fmt)
    if tipo == "Caractere":
        return "String"
    if tipo == "Hora":
        return "String"
    if tipo == "Numérico":
        if "V" in fmt:
            return decimal_type(fmt)
        return uint_for(count_digits(fmt) or size)
    return infer_prefix(name)  # standalone sem tipo


def key_fields(fields):
    """Até 3 campos-chave (obrig, código/id, não Date/Valor) para o ORDER BY."""
    ks = []
    for f in fields:
        if f["obrig"] == "SIM" and f["tipo"] not in ("Data", "Valor", "Decimal") \
                and not f["name"].lower().startswith(("vl", "dt")):
            ks.append(ident(f["name"]))
        if len(ks) == 3:
            break
    return ks


def dedupe(fields):
    seen = {}
    out = []
    for f in fields:
        nm = ident(f["name"])
        if nm in seen:
            seen[nm] += 1
            f = dict(f, name=f["name"] + f"_{seen[nm]}")
        else:
            seen[nm] = 1
        out.append(f)
    return out


def col_def(f):
    t = base_type(f)
    if f["obrig"] != "SIM":
        t = f"Nullable({t})"
    return f"    {ident(f['name'])} {t}"


def gen_canon(tbl):
    fields = dedupe(tbl["fields"])
    cols = [col_def(f) for f in fields]
    ks = key_fields(fields)
    order = "(_id_entidade, _exercicio, _competencia" + \
            ("".join(f", {k}" for k in ks)) + ")"
    body = ",\n".join(cols) + ",\n" + META_CANON
    return (
        f"-- {tbl['section']}\n"
        f"CREATE TABLE IF NOT EXISTS simam.{ident(tbl['table'])}\n(\n{body}\n)\n"
        f"ENGINE = ReplacingMergeTree(_ingerido_em)\nORDER BY {order};\n"
    )


def gen_raw(tbl):
    fields = dedupe(tbl["fields"])
    cols = ",\n".join(f"    {ident(f['name'])} Nullable(String)" for f in fields)
    meta = (
        "    _id_entidade   Nullable(String),\n"
        "    _exercicio     Nullable(String),\n"
        "    _competencia   Nullable(String),\n"
        "    _fonte         LowCardinality(String) DEFAULT '',\n"
        "    _arquivo       String DEFAULT '',\n"
        "    _ingerido_em   DateTime DEFAULT now()"
    )
    return (
        f"CREATE TABLE IF NOT EXISTS simam_raw.{ident(tbl['table'])}\n(\n"
        f"{cols},\n{meta}\n)\nENGINE = MergeTree\nORDER BY tuple();\n"
    )


def sql_str(v):
    return "'" + v.replace("\\", "\\\\").replace("'", "\\'") + "'"


def gen_lookup(tbl):
    raw_cols = [ident(c) for c in tbl["columns"]]
    cols, seen = [], {}
    for c in raw_cols:
        if c in seen:
            seen[c] += 1
            cols.append(f"{c}_{seen[c]}")
        else:
            seen[c] = 1
            cols.append(c)
    defs = []
    for c in cols:
        p = c[:2].lower()
        if p == "id":
            defs.append(f"    {c} Int64")
        elif p in ("cd", "nr"):
            defs.append(f"    {c} String")
        else:
            defs.append(f"    {c} String")
    ddl = (
        f"-- {tbl['section']} (tabela de domínio)\n"
        f"CREATE TABLE IF NOT EXISTS simam.{ident(tbl['table'])}\n(\n"
        + ",\n".join(defs)
        + f"\n)\nENGINE = MergeTree\nORDER BY {cols[0]};\n"
    )
    n = len(cols)
    rows = []
    for r in tbl["data"]:
        # junta excedente na última coluna; descarta linha-nota (1ª col não-código)
        parts = list(r)
        if len(parts) > n:
            parts = parts[: n - 1] + [" ".join(parts[n - 1:])]
        parts += [""] * (n - len(parts))
        if defs[0].endswith("Int64") and not re.match(r"^-?\d+$", parts[0].strip()):
            continue  # nota/observação infiltrada, não é linha de dado
        if any(len(p) > 150 for p in parts):
            continue  # parágrafo de observação (ex.: "IMPORTANTE: ...")
        vals = []
        for i in range(n):
            v = parts[i].strip()
            if defs[i].endswith("Int64"):
                m = re.match(r"-?\d+", v)
                vals.append(m.group(0) if m else "0")
            else:
                vals.append(sql_str(v))
        rows.append("(" + ", ".join(vals) + ")")
    ins = ""
    if rows:
        ins = (
            f"INSERT INTO simam.{ident(tbl['table'])} "
            f"({', '.join(cols)}) VALUES\n" + ",\n".join(rows) + ";\n"
        )
    return ddl + ins


def write_grouped(tables, kind, gen):
    by_mod = {}
    for t in tables:
        by_mod.setdefault(t["module"] or "TABELAS CADASTRAIS", []).append(t)
    idx = 0
    out_dir = os.path.join(SCHEMA, kind)
    for mod in MODULE_ORDER:
        ts = by_mod.get(mod, [])
        if not ts:
            continue
        idx += 1
        slug = MODULE_SLUG.get(mod, "outros")
        path = os.path.join(out_dir, f"{idx:02d}_{slug}.sql")
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(f"-- {mod} — {len(ts)} tabelas ({kind})\n\n")
            for t in ts:
                fh.write(gen(t))
                fh.write("\n")
        print(f"  {path}: {len(ts)} tabelas")


def main():
    tables = json.load(open(os.path.join(os.path.dirname(__file__), "tables.json")))
    layout = [t for t in tables if t["kind"] == "layout"]
    # dedupe lookups por nome (mantém a ocorrência com mais dados)
    lk = {}
    for t in tables:
        if t["kind"] != "lookup":
            continue
        cur = lk.get(t["table"])
        if cur is None or len(t.get("data", [])) > len(cur.get("data", [])):
            lk[t["table"]] = t
    lookup = list(lk.values())
    print("canônico (simam):")
    write_grouped(layout, "simam", gen_canon)
    print("raw (simam_raw):")
    write_grouped(layout, "raw", gen_raw)
    print("seeds (domínio):")
    write_grouped(lookup, "seeds", gen_lookup)
    print(f"OK: {len(layout)} layout + {len(lookup)} lookup")


if __name__ == "__main__":
    main()
