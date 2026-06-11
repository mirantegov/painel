#!/usr/bin/env bash
# ============================================================================
# Mirante — Extração ERP (Elotech) -> MinIO, por cliente (Linux / cron).
# Equivalente ao run.bat (Windows). Roda os manifests Elotech (siscop/aise/apice)
# com os parâmetros de UM cliente. Idempotente: paths no MinIO são determinísticos
# (1 arquivo por schema/tabela[/ano]) -> re-run sobrescreve.
#
# Uso:
#   export-cliente.sh <ibge> [opções]
# Opções:
#   --smoke-only       só roda o smoke (siscop.banco + siscop.entidade) e sai
#   --no-smoke         pula o smoke e vai direto aos manifests
#   --manifests=a,b    sobrescreve a lista (subconjunto de: siscop,aise,apice)
#
# Config por cliente (em clientes/):
#   <ibge>.conf         versionado, SEM segredo (entidades, janela de anos, manifests)
#   <ibge>.secret.env   gitignored: DATABASE_URL (ERP) + S3_ACCESS_KEY/SECRET
#
# Cron: ver crontab.example. Há lock por cliente (flock) — execuções não se sobrepõem.
# ============================================================================
set -euo pipefail

# ---- args ----
IBGE="${1:-}"
[ -n "$IBGE" ] && shift || { echo "uso: export-cliente.sh <ibge> [--smoke-only|--no-smoke|--manifests=...]"; exit 2; }

SMOKE=1; SMOKE_ONLY=0; MANIFESTS_OVERRIDE=""
for arg in "$@"; do
  case "$arg" in
    --no-smoke)        SMOKE=0 ;;
    --smoke-only)      SMOKE_ONLY=1 ;;
    --manifests=*)     MANIFESTS_OVERRIDE="${arg#*=}" ;;
    *) echo "opção desconhecida: $arg"; exit 2 ;;
  esac
done

if ! [[ "$IBGE" =~ ^[0-9]{7}$ ]]; then echo "ibge inválido (7 dígitos): $IBGE"; exit 2; fi

# ---- paths ----
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXPORTER_DIR="$(cd "$HERE/.." && pwd)"      # exporter/
MANIFEST_DIR="$EXPORTER_DIR/manifests"
CLIENTES="$HERE/clientes"
LOG_DIR="$HERE/log"
CONF="$CLIENTES/$IBGE.conf"
SECRET="$CLIENTES/$IBGE.secret.env"

[ -f "$CONF" ]   || { echo "config não encontrada: $CONF (use clientes/_TEMPLATE.conf)"; exit 2; }
[ -f "$SECRET" ] || { echo "segredos não encontrados: $SECRET (copie clientes/_TEMPLATE.secret.env)"; exit 2; }

mkdir -p "$LOG_DIR"

# ---- lock por cliente (não sobrepor execuções) ----
# flock é padrão no Linux (util-linux). Se ausente (ex.: macOS), segue sem o lock.
if command -v flock >/dev/null 2>&1; then
  exec 9>"$LOG_DIR/.lock_$IBGE"
  if ! flock -n 9; then echo "[$IBGE] já em execução (lock) — abortando"; exit 0; fi
else
  echo "aviso: 'flock' indisponível — execução sem proteção contra sobreposição"
fi

# ---- log com timestamp ----
TS="$(date +%Y%m%d_%H%M%S)"
LOG="$LOG_DIR/cron_${IBGE}_${TS}.log"
exec > >(tee -a "$LOG") 2>&1
echo "==== extração $IBGE — início $(date -Is) ===="

# ---- carrega config + segredos ----
# defaults (sobrescrevíveis pelo .conf/.secret.env)
ENTIDADES=""; ANOS_BACK=2; LIC_START=2000; MANIFESTS="siscop,aise,apice"; EXERCICIOS=""; EXERCICIOS_LIC=""
S3_ENDPOINT="https://minio.mirantegov.cloud"; S3_BUCKET="mirante-parquet"
# shellcheck disable=SC1090
source "$CONF"
# shellcheck disable=SC1090
source "$SECRET"
export DATABASE_URL S3_ENDPOINT S3_BUCKET S3_ACCESS_KEY S3_SECRET_KEY

[ -n "${DATABASE_URL:-}" ]  || { echo "DATABASE_URL ausente no $SECRET"; exit 2; }
[ -n "${S3_ACCESS_KEY:-}" ] || { echo "S3_ACCESS_KEY ausente no $SECRET"; exit 2; }
[ -n "$ENTIDADES" ]         || { echo "ENTIDADES ausente no $CONF"; exit 2; }
[ -n "$MANIFESTS_OVERRIDE" ] && MANIFESTS="$MANIFESTS_OVERRIDE"

# ---- janela de anos (auto-rola no cron; sobrescrevível por EXERCICIOS no .conf) ----
CUR="$(date +%Y)"
seq_csv() { seq "$1" "$2" | paste -sd, - | sed 's/,/, /g'; }
[ -n "$EXERCICIOS" ]     || EXERCICIOS="$(seq_csv "$((CUR - ANOS_BACK))" "$CUR")"
[ -n "$EXERCICIOS_LIC" ] || EXERCICIOS_LIC="$(seq_csv "$LIC_START" "$CUR")"
echo "ENTIDADES=[$ENTIDADES]  EXERCICIOS=[$EXERCICIOS]  EXERCICIOS_LIC=[$EXERCICIOS_LIC]  manifests=$MANIFESTS"

# ---- resolve binário do exportador ----
if [ -n "${EXPORTER_BIN:-}" ] && [ -x "${EXPORTER_BIN}" ]; then
  BIN="$EXPORTER_BIN"
elif [ -x "$EXPORTER_DIR/exporter" ]; then
  BIN="$EXPORTER_DIR/exporter"
elif [ -x "$EXPORTER_DIR/dist/exporter-linux-amd64" ]; then
  BIN="$EXPORTER_DIR/dist/exporter-linux-amd64"
elif command -v go >/dev/null 2>&1; then
  echo "binário não encontrado — compilando (make build)…"; ( cd "$EXPORTER_DIR" && make build >/dev/null ); BIN="$EXPORTER_DIR/exporter"
else
  echo "ERRO: exportador não encontrado (defina EXPORTER_BIN, rode 'make linux', ou instale Go)"; exit 2
fi
echo "binário: $BIN"

# o exportador grava o próprio log/ e publica counts no cwd → roda em exporter/
cd "$EXPORTER_DIR"

ANO="$CUR"   # --ano: irrelevante p/ Elotech (filtro é EXERCICIOS), mas exigido pela CLI
fail=0
run() { echo "--- $* ---"; if "$BIN" "$@"; then echo "OK"; else echo "FALHA: $*"; fail=1; fi; }

# ---- smoke ----
if [ "$SMOKE" = 1 ]; then
  echo "== SMOKE (siscop.banco + siscop.entidade) =="
  if ! "$BIN" --municipio "$IBGE" --ano "$ANO" --schema siscop \
        --manifest "$MANIFEST_DIR/export-smoke.yaml" --var ENTIDADES="$ENTIDADES"; then
    echo "FALHOU no smoke — abortando (conexão/credenciais?)"; exit 1
  fi
  echo "smoke OK"
fi
[ "$SMOKE_ONLY" = 1 ] && { echo "smoke-only: concluído $(date -Is)"; exit 0; }

has() { [[ ",$MANIFESTS," == *",$1,"* ]]; }

# ---- 1) Contábil (siscop) ----
has siscop && run --municipio "$IBGE" --ano "$ANO" \
  --manifest "$MANIFEST_DIR/elotech-eloweb.yaml" \
  --var ENTIDADES="$ENTIDADES" --var EXERCICIOS="$EXERCICIOS"

# ---- 2) Tributos + RH (aise) — dump full, sem --var ----
has aise && run --municipio "$IBGE" --ano "$ANO" \
  --manifest "$MANIFEST_DIR/elotech-aise.yaml"

# ---- 3) Licitações + Contratos (apice) — EXERCICIOS a partir de LIC_START ----
has apice && run --municipio "$IBGE" --ano "$ANO" \
  --manifest "$MANIFEST_DIR/elotech-apice.yaml" \
  --var ENTIDADES="$ENTIDADES" --var EXERCICIOS="$EXERCICIOS_LIC"

echo "==== extração $IBGE — fim $(date -Is) — status: $([ $fail = 0 ] && echo OK || echo 'COM FALHAS') ===="
exit $fail
