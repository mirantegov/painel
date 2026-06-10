#!/usr/bin/env python3
"""Provisiona os databases ClickHouse de um município (multi-tenant por IBGE).

Cria raw_<ibge> (landing do MinIO) e sim_<ibge> (canônico pós-ETL) e aplica o
schema SIM-AM (schema/simam + schema/raw + schema/seeds), substituindo o nome
do database em cada DDL. Cada município fica self-contained (inclui as tabelas
de domínio).

Uso:  python3 provision_municipio.py <ibge>
Env:  CLICKHOUSE_URL (default http://localhost:8123/), CLICKHOUSE_USER, CLICKHOUSE_PASSWORD

Substituição precisa (não colidem como substring):
  'simam_raw.' -> 'raw_<ibge>.'   (aplicada primeiro)
  'simam.'     -> 'sim_<ibge>.'
"""
import glob
import os
import re
import sys
import urllib.request
import urllib.error

CH = os.getenv("CLICKHOUSE_URL", "http://localhost:8123/")
USER = (os.getenv("CLICKHOUSE_USER", "default"),
        os.getenv("CLICKHOUSE_PASSWORD", "simam"))
HERE = os.path.dirname(os.path.abspath(__file__))
SCHEMA = os.path.normpath(os.path.join(HERE, "..", "schema"))
IBGE_RE = re.compile(r"^\d{7}$")


def run(sql):
    req = urllib.request.Request(CH, data=sql.encode("utf-8"))
    req.add_header("X-ClickHouse-User", USER[0])
    req.add_header("X-ClickHouse-Key", USER[1])
    try:
        urllib.request.urlopen(req, timeout=60).read()
        return None
    except urllib.error.HTTPError as e:
        return e.read().decode("utf-8", "replace").strip()
    except Exception as e:  # noqa
        return str(e)


def split_statements(text):
    text = re.sub(r"^--.*$", "", text, flags=re.M)
    return [s.strip() for s in text.split(";") if s.strip()]


def retarget(text, ibge):
    return (text.replace("simam_raw.", f"raw_{ibge}.")
                .replace("simam.", f"sim_{ibge}."))


def apply_dir(subdir, ibge):
    files = sorted(glob.glob(os.path.join(SCHEMA, subdir, "*.sql")))
    ok, fails, total = 0, [], 0
    for f in files:
        for s in split_statements(retarget(open(f, encoding="utf-8").read(), ibge)):
            total += 1
            err = run(s)
            if err:
                m = re.search(r"(?:TABLE|VIEW|DICTIONARY)\s+(?:IF NOT EXISTS\s+)?(\S+)", s)
                fails.append((m.group(1) if m else f"stmt{total}", err.split("\n")[0][:160]))
            else:
                ok += 1
    print(f"  {subdir}: {ok}/{total} OK, {len(fails)} falhas")
    for n, e in fails[:30]:
        print(f"    FALHA {n}: {e}")
    return len(fails)


def main(ibge):
    if not IBGE_RE.match(ibge):
        print(f"IBGE inválido: {ibge!r} (esperado 7 dígitos)")
        return 1
    canon, raw = f"sim_{ibge}", f"raw_{ibge}"
    print(f"[provision] databases: {raw} (landing) + {canon} (canônico)")
    for db in (raw, canon):
        err = run(f"CREATE DATABASE IF NOT EXISTS {db}")
        if err:
            print(f"  ERRO criar {db}: {err}")
            return 1
    fails = 0
    print("[provision] canônico (sim)...")
    fails += apply_dir("simam", ibge)
    print("[provision] seeds (domínio em sim)...")
    fails += apply_dir("seeds", ibge)
    # raw_<ibge> fica VAZIO: suas tabelas espelham a origem do MinIO (Eloweb),
    # criadas por inferência de schema do Parquet no import (import_raw.sh).
    print(f"[provision] {raw}: criado vazio (tabelas vêm do MinIO via import_raw.sh)")
    print(f"\n=== {canon} / {raw}: concluído, {fails} falhas ===")
    return 1 if fails else 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("uso: provision_municipio.py <ibge-7-digitos>")
        sys.exit(2)
    sys.exit(main(sys.argv[1]))
