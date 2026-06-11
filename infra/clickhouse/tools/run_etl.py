#!/usr/bin/env python3
"""Roda um arquivo de ETL ClickHouse para um município (substitui placeholders).

Substitui  simam_raw. -> raw_<ibge>.  e  simam. -> sim_<ibge>.  e executa cada
statement (separado por ';') no ClickHouse. Conexão por env:
  CLICKHOUSE_URL (default http://127.0.0.1:8123/), CLICKHOUSE_USER, CLICKHOUSE_PASSWORD

Uso:  python3 run_etl.py <ibge> <arquivo.sql> [arquivo2.sql ...]
"""
import os, sys, urllib.request

def run_stmt(url, user, pwd, sql):
    req = urllib.request.Request(url, data=sql.encode("utf-8"))
    if user:
        import base64
        req.add_header("Authorization", "Basic " + base64.b64encode(f"{user}:{pwd}".encode()).decode())
    with urllib.request.urlopen(req, timeout=120) as r:
        return r.read().decode("utf-8", "replace")

def split_statements(text):
    # Remove linhas de comentário (-- ...) e separa por ';'. Sem ';' dentro de literais nestes ETLs.
    lines = [ln for ln in text.splitlines() if not ln.lstrip().startswith("--")]
    body = "\n".join(lines)
    return [s.strip() for s in body.split(";") if s.strip()]

def main():
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(2)
    ibge, files = sys.argv[1], sys.argv[2:]
    if not (ibge.isdigit() and len(ibge) == 7):
        print(f"ibge inválido: {ibge}"); sys.exit(2)
    url = os.environ.get("CLICKHOUSE_URL", "http://127.0.0.1:8123/")
    user = os.environ.get("CLICKHOUSE_USER", "default")
    pwd = os.environ.get("CLICKHOUSE_PASSWORD", "")
    for path in files:
        with open(path, encoding="utf-8") as f:
            sql = f.read()
        sql = sql.replace("simam_raw.", f"raw_{ibge}.").replace("simam.", f"sim_{ibge}.")
        stmts = split_statements(sql)
        print(f"== {path}: {len(stmts)} statements ==")
        for i, st in enumerate(stmts, 1):
            head = " ".join(st.split())[:70]
            try:
                out = run_stmt(url, user, pwd, st)
                print(f"  [{i}/{len(stmts)}] OK  {head}" + (f"  -> {out.strip()[:80]}" if out.strip() else ""))
            except Exception as e:
                msg = getattr(e, "read", lambda: b"")()
                print(f"  [{i}/{len(stmts)}] ERRO {head}\n      {e} {msg[:300]}")
                sys.exit(1)

if __name__ == "__main__":
    main()
