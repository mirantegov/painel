#!/usr/bin/env python3
"""Aplica os DDLs no ClickHouse em lotes de 10 statements, validando cada um.

Uso: python3 apply_batches.py <dir>   (ex.: schema/simam, schema/seeds)
Cada CREATE/INSERT é enviado isolado via HTTP; falhas são logadas e o processo
segue (não aborta o lote). Resumo ao final: OK / FALHAS por statement.
"""
import glob
import os
import re
import sys
import urllib.request

# Ferramenta local de dev; sobrescreva via env se o servidor não for localhost.
CH = os.getenv("CLICKHOUSE_URL", "http://localhost:8123/")
USER = (os.getenv("CLICKHOUSE_USER", "default"),
        os.getenv("CLICKHOUSE_PASSWORD", "simam"))
BATCH = 10


def run(sql):
    req = urllib.request.Request(CH, data=sql.encode("utf-8"))
    req.add_header("X-ClickHouse-User", USER[0])
    req.add_header("X-ClickHouse-Key", USER[1])
    try:
        urllib.request.urlopen(req, timeout=30).read()
        return None
    except urllib.error.HTTPError as e:
        return e.read().decode("utf-8", "replace").strip()
    except Exception as e:  # noqa
        return str(e)


def split_statements(text):
    # remove comentários de linha e divide por ';' no fim de statement
    text = re.sub(r"^--.*$", "", text, flags=re.M)
    stmts = [s.strip() for s in text.split(";") if s.strip()]
    return stmts


def main(d):
    files = sorted(glob.glob(os.path.join(d, "*.sql")))
    stmts = []
    for f in files:
        stmts.extend(split_statements(open(f, encoding="utf-8").read()))
    total = len(stmts)
    ok = 0
    fails = []
    for i in range(0, total, BATCH):
        chunk = stmts[i:i + BATCH]
        for j, s in enumerate(chunk):
            err = run(s)
            label = re.search(r"(?:TABLE|VIEW)\s+(?:IF NOT EXISTS\s+)?(\S+)", s)
            name = label.group(1) if label else f"stmt{i+j}"
            if err:
                fails.append((name, err.split("\n")[0][:160]))
            else:
                ok += 1
        print(f"  lote {i//BATCH + 1}: {min(i+BATCH,total)}/{total} processados")
    print(f"\n=== {d}: {ok}/{total} OK, {len(fails)} falhas ===")
    for n, e in fails[:60]:
        print(f"  FALHA {n}: {e}")
    return len(fails)


if __name__ == "__main__":
    sys.exit(1 if main(sys.argv[1]) else 0)
