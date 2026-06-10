#!/usr/bin/env bash
# Ingestão RAW: MinIO (<ibge>/<schema>/<tabela>.parquet) -> ClickHouse raw_<ibge>.
#
# Cria UMA tabela por arquivo do MinIO, nomeada <schema>_<tabela> (ex.:
# siscop_empenho, aise_entidade), com o schema INFERIDO do Parquet — ou seja,
# estrutura idêntica à origem (Eloweb). O prefixo <schema>_ evita colisão entre
# schemas com tabelas homônimas (aise.entidade vs siscop.entidade).
#
# Uso:  bash import_raw.sh <ibge>
# Env (obrigatórios):
#   CLICKHOUSE_URL  (ex.: http://52.55.147.97:8123/)
#   CLICKHOUSE_USER CLICKHOUSE_PASSWORD
#   S3_ACCESS_KEY S3_SECRET_KEY            (credenciais MinIO usadas pelo s3() no CH)
# Env (opcionais):
#   MC_ALIAS      (default: mirante)        alias mc p/ LISTAR o bucket
#   S3_BUCKET     (default: mirante-parquet)
#   S3_INTERNAL   (default: http://minio:9000)  endpoint que o CH usa p/ LER o Parquet
set -euo pipefail

IBGE="${1:-}"
[[ "$IBGE" =~ ^[0-9]{7}$ ]] || { echo "uso: $0 <ibge-7-digitos>" >&2; exit 2; }

CH_URL="${CLICKHOUSE_URL:-http://localhost:8123/}"
CH_USER="${CLICKHOUSE_USER:-default}"
CH_PASS="${CLICKHOUSE_PASSWORD:-}"
MC_ALIAS="${MC_ALIAS:-mirante}"
BUCKET="${S3_BUCKET:-mirante-parquet}"
S3_INTERNAL="${S3_INTERNAL:-http://minio:9000}"
: "${S3_ACCESS_KEY:?defina S3_ACCESS_KEY}"
: "${S3_SECRET_KEY:?defina S3_SECRET_KEY}"

ch() { curl -s --max-time 600 "$CH_URL" -H "X-ClickHouse-User: $CH_USER" -H "X-ClickHouse-Key: $CH_PASS" --data-binary "$1"; }

echo "[import] raw_${IBGE} <- ${MC_ALIAS}/${BUCKET}/${IBGE}/"
ch "CREATE DATABASE IF NOT EXISTS raw_${IBGE}" >/dev/null

# Lista os Parquet sob <ibge>/ e cria uma tabela por arquivo.
ok=0; fail=0
while read -r o; do
  [ -n "$o" ] || continue
  # o relativo a <ibge>/, ex.: siscop/empenho.parquet
  IFS='/' read -ra seg <<< "$o"
  [ "${#seg[@]}" -ge 2 ] || { echo "  ignorado (sem schema): $o"; continue; }
  schema="${seg[0]}"
  tabela="$(basename "${seg[1]}" .parquet)"
  tbl="${schema}_${tabela}"
  url="${S3_INTERNAL}/${BUCKET}/${IBGE}/${o}"

  ch "DROP TABLE IF EXISTS raw_${IBGE}.\`${tbl}\` SYNC" >/dev/null
  err="$(ch "CREATE TABLE raw_${IBGE}.\`${tbl}\` ENGINE=MergeTree ORDER BY tuple() AS SELECT * FROM s3('${url}', '${S3_ACCESS_KEY}', '${S3_SECRET_KEY}', 'Parquet')" 2>&1)"
  if [ -n "$err" ]; then
    echo "  FALHA ${tbl}: $(printf '%s' "$err" | head -1 | cut -c1-140)"
    fail=$((fail+1))
  else
    echo "  ok ${tbl}"
    ok=$((ok+1))
  fi
done < <(mc ls --recursive "${MC_ALIAS}/${BUCKET}/${IBGE}/" 2>/dev/null | awk '{print $NF}')
[ $((ok+fail)) -gt 0 ] || { echo "  nenhum objeto em ${IBGE}/ — exporte primeiro"; exit 1; }
echo "=== raw_${IBGE}: ${ok} tabelas OK, ${fail} falhas ==="
exit $([ "$fail" -eq 0 ] && echo 0 || echo 1)
