#!/usr/bin/env python3
"""Gera/confere os blocos `scope` / `exclude_columns` / `filters` dos manifests
do exportador a partir dos DDLs reais do ERP (saída de `pg_dump`).

Objetivo: tornar reproduzíveis as decisões que antes eram feitas à mão —
  • EXCLUDE de blobs `bytea` (não exportamos: só pesam o dump);
  • FILTROS de recorte (`entidade` [+ ano]) derivados das colunas que EXISTEM
    (filtro com coluna inexistente ABORTA o run do exportador).

O script PRESERVA o cabeçalho, os comentários e a LISTA de tabelas de cada
manifest — ele só (re)escreve o bloco de propriedades de cada entrada conforme a
POLÍTICA por schema. Não inventa nem remove tabelas (apenas avisa se uma `source`
não for tabela-base no dump, ex.: view).

POLÍTICA de filtro por schema (edite o dict POLICY abaixo):
  - "derive" : `entidade` (se a coluna existir) + ano primário
               (anocompetencia → exercicio → exerciciopagamento → exerciciobloqueto).
  - "none"   : sem filtro (dump FULL).
  - "keep"   : mantém, intacto, o filtro que já está no manifest (curado à mão).
`exclude_columns` é SEMPRE derivado (colunas `bytea` da tabela), em todos os schemas.

Uso:
  python3 tools/gen_manifests.py --dump tmp/eloweb.dump --check   # diff; exit 1 se drift
  python3 tools/gen_manifests.py --dump tmp/eloweb.dump --write   # aplica nos manifests
  python3 tools/gen_manifests.py --dump tmp/eloweb.dump --check --manifest manifests/elotech-aise.yaml

Notas:
  • O dump (`tmp/eloweb.dump`) é gitignored — passe o caminho via --dump.
  • Rodar `--check` no estado correto não deve acusar diferença (idempotente).
"""
import argparse
import difflib
import glob
import os
import re
import sys

# Política de filtro por schema. exclude_columns (bytea) é sempre derivado.
POLICY = {
    "siscop": "keep",    # filtros curados à mão no elotech-eloweb.yaml
    "aise":   "none",    # Tributos + RH: dump full (recorte fica no ETL)
    "apice":  "derive",  # licitações/contratos: entidade + exercicio (piso de ano via --var)
}

# Ordem de preferência da coluna de ano ao derivar filtro.
YEAR_PRIORITY = ["anocompetencia", "exercicio", "exerciciopagamento", "exerciciobloqueto"]

PROP_RE = re.compile(r"^\s+(scope|columns|exclude_columns|filters|partition_by_ano)\s*:")
SRC_RE = re.compile(r"^(\s*)-\s*source:\s*([a-z_]+\.[a-zA-Z0-9_$]+)\s*(#.*)?$")
FILTERS_RE = re.compile(r"^\s*filters\s*:")


def parse_dump(path):
    """Retorna {schema.tabela: [(col, tipo), ...] em ordem ordinal}."""
    if not os.path.exists(path):
        sys.exit(f"erro: dump não encontrado: {path} (gitignored — passe --dump)")
    tables = {}
    cur, buf = None, None
    start = re.compile(r'^CREATE TABLE ([a-z_]+)\.("?)([a-zA-Z0-9_$]+)\2 \($')
    colre = re.compile(r'^\s+"?([a-zA-Z_][a-zA-Z0-9_$]*)"?\s+([a-zA-Z][a-zA-Z0-9_]*)')
    skip = re.compile(r"^\s+(CONSTRAINT|PRIMARY|FOREIGN|UNIQUE|CHECK|EXCLUDE)\b", re.I)
    with open(path, encoding="latin-1") as f:
        for line in f:
            line = line.rstrip("\n")
            if cur is None:
                m = start.match(line)
                if m:
                    cur = f"{m.group(1)}.{m.group(3)}"
                    buf = []
            else:
                if line.startswith(")"):
                    tables[cur] = buf
                    cur = None
                    continue
                if skip.match(line):
                    continue
                m = colre.match(line)
                if m:
                    buf.append((m.group(1).lower(), m.group(2).lower()))
    return tables


def bytea_cols(cols):
    return [c for c, t in cols if t == "bytea"]


def derive_filter(cols):
    """Retorna a string do filtro derivado, ou None (sem entidade → full)."""
    names = {c for c, _ in cols}
    if "entidade" not in names:
        return None
    yr = next((y for y in YEAR_PRIORITY if y in names), None)
    if yr:
        return f"filters: {{ entidade: [__ENTIDADES__], {yr}: [__EXERCICIOS__] }}"
    return "filters: { entidade: [__ENTIDADES__] }"


def schema_of(src):
    return src.split(".", 1)[0]


def regen(path, tables, warnings):
    """Devolve o conteúdo regenerado do manifest em `path`."""
    lines = open(path, encoding="utf-8").read().split("\n")
    hi = next(i for i, l in enumerate(lines) if l.strip() == "tables:")
    out = lines[: hi + 1]
    body = lines[hi + 1 :]
    i = 0
    while i < len(body):
        l = body[i]
        m = SRC_RE.match(l)
        if not m:
            out.append(l)
            i += 1
            continue
        src = m.group(2)
        # captura as linhas de propriedade da entrada atual (e o filtro original)
        orig_filter = None
        j = i + 1
        while j < len(body) and PROP_RE.match(body[j]):
            if FILTERS_RE.match(body[j]):
                orig_filter = body[j].strip()
            j += 1
        out.append(l)  # linha `- source:` (com comentário inline) preservada

        cols = tables.get(src)
        if cols is None:
            warnings.append(f"{os.path.basename(path)}: '{src}' não é tabela-base no dump (view/inexistente) — mantida intacta")
            out.extend(body[i + 1 : j])  # preserva as propriedades originais
            i = j
            continue

        out.append("    scope: tenant")
        bcols = bytea_cols(cols)
        if bcols:
            out.append(f"    exclude_columns: [{', '.join(bcols)}]  # bytea (blob) — não exporta")
        pol = POLICY.get(schema_of(src), "none")
        if pol == "derive":
            f = derive_filter(cols)
            if f:
                out.append("    " + f)
        elif pol == "keep":
            if orig_filter:
                out.append("    " + orig_filter)
        # "none" → sem filtro
        i = j
    return "\n".join(out)


def main():
    ap = argparse.ArgumentParser(description="Gera/confere filtros e exclude_columns dos manifests a partir dos DDLs.")
    ap.add_argument("--dump", default="tmp/eloweb.dump", help="caminho do pg_dump com os DDLs (default: tmp/eloweb.dump)")
    ap.add_argument("--manifest", action="append", help="manifest específico (repetível); default: manifests/elotech-*.yaml")
    g = ap.add_mutually_exclusive_group()
    g.add_argument("--check", action="store_true", help="só mostra o diff; sai 1 se houver mudança (default)")
    g.add_argument("--write", action="store_true", help="aplica as mudanças nos manifests")
    args = ap.parse_args()

    here = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # exporter/
    manifests = args.manifest or sorted(glob.glob(os.path.join(here, "manifests", "elotech-*.yaml")))
    tables = parse_dump(args.dump)

    warnings, drift = [], False
    for mf in manifests:
        new = regen(mf, tables, warnings)
        old = open(mf, encoding="utf-8").read()
        if new != old:
            drift = True
            if args.write:
                open(mf, "w", encoding="utf-8").write(new)
                print(f"[write] {os.path.relpath(mf)}")
            else:
                print(f"\n===== DIFF {os.path.relpath(mf)} =====")
                sys.stdout.writelines(difflib.unified_diff(
                    old.splitlines(True), new.splitlines(True),
                    fromfile="atual", tofile="gerado"))
        else:
            print(f"[ok] {os.path.relpath(mf)} (sem mudança)")

    for w in warnings:
        print("WARN:", w, file=sys.stderr)

    if drift and not args.write:
        print("\ndrift detectado — rode com --write para aplicar.", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
