#!/usr/bin/env bash
# Instalador de novo cliente (município) por IBGE.  cliente = municipio = ibge.
#
# v1: provisiona os databases ClickHouse do município:
#       simam_<ibge>      (canônico SIM-AM)
#       simam_raw_<ibge>  (landing raw)
#
# Uso:   bash scripts/provision-cliente.sh <ibge>
# Env:   CLICKHOUSE_URL, CLICKHOUSE_USER, CLICKHOUSE_PASSWORD
#        (ex.: CLICKHOUSE_URL=http://52.55.147.97:8123/ ; senha do .env.production)
#
# TODO (próximas fases — adaptamos ao longo do desenvolvimento):
#   - Postgres: provision_municipio('<ibge>')  (cria schema mun_<ibge>)
#   - Seed/ACL do município no Postgres
#   - Registrar o município no catálogo (lista de clientes provisionados)
set -euo pipefail

IBGE="${1:-}"
if [[ ! "$IBGE" =~ ^[0-9]{7}$ ]]; then
  echo "uso: $0 <ibge-7-digitos>   (ex.: 4117107 = Nova Londrina/PR)" >&2
  exit 2
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "════════════════════════════════════════════"
echo " Provisionando cliente — IBGE $IBGE"
echo "════════════════════════════════════════════"

echo "[1/1] ClickHouse: simam_${IBGE} + simam_raw_${IBGE}"
python3 "$ROOT/infra/clickhouse/tools/provision_municipio.py" "$IBGE"

echo "════════════════════════════════════════════"
echo " Cliente $IBGE provisionado (ClickHouse)."
echo " Próximo: ETL lê MinIO ${IBGE}/<schema>/*.parquet -> simam_raw_${IBGE} -> simam_${IBGE}"
echo "════════════════════════════════════════════"
