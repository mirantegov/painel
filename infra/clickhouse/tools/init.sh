#!/bin/bash
# Aplica os DDLs/seeds do SIM-AM na ordem correta na primeira inicialização.
# Executado pelo entrypoint oficial do ClickHouse (após o servidor subir).
set -e

CH=(clickhouse-client --host localhost --user default --password "${CLICKHOUSE_PASSWORD:-simam}" --multiquery)

SCHEMA_DIR=/docker-entrypoint-initdb.d/schema

echo "[simam] criando databases..."
"${CH[@]}" < "$SCHEMA_DIR/00_databases.sql"

apply_dir() {
  local dir="$1"
  [ -d "$dir" ] || return 0
  for f in $(ls "$dir"/*.sql 2>/dev/null | sort); do
    echo "[simam] aplicando $f"
    "${CH[@]}" < "$f"
  done
}

echo "[simam] schema canônico (simam)..."
apply_dir "$SCHEMA_DIR/simam"
echo "[simam] schema raw (landing)..."
apply_dir "$SCHEMA_DIR/raw"
echo "[simam] seeds (tabelas de domínio)..."
apply_dir "$SCHEMA_DIR/seeds"

echo "[simam] init concluído."
