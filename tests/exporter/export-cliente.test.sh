#!/usr/bin/env bash
# Teste do engine de extração (exporter/cron/export-cliente.sh) com binário-stub.
# Não toca ERP/MinIO: valida parsing de config, janela de anos e as 3 invocações.
# Uso: bash tests/exporter/export-cliente.test.sh   (exit 0 = ok)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
CRON="$ROOT/exporter/cron"
CLIENTES="$CRON/clientes"
IBGE=9999999                      # fixture (não colide com cliente real)
CONF="$CLIENTES/$IBGE.conf"
SECRET="$CLIENTES/$IBGE.secret.env"
STUB="$(mktemp)"
OUT="$(mktemp)"

cleanup() { rm -f "$CONF" "$SECRET" "$STUB" "$OUT" "$CRON/log/.lock_$IBGE"; }
trap cleanup EXIT

fail() { echo "FALHA: $*"; exit 1; }

# fixtures
cat > "$STUB" <<'EOF'
#!/usr/bin/env bash
echo "CALL $*"
EOF
chmod +x "$STUB"
cat > "$CONF" <<EOF
IBGE=$IBGE
ENTIDADES="1, 2, 3, 4"
ANOS_BACK=2
LIC_START=2000
MANIFESTS="siscop,aise,apice"
EOF
cat > "$SECRET" <<'EOF'
DATABASE_URL="postgresql://x:y@localhost:5432/db"
S3_ACCESS_KEY="k"
S3_SECRET_KEY="s"
EOF

# executa o engine com o stub
EXPORTER_BIN="$STUB" bash "$CRON/export-cliente.sh" "$IBGE" --no-smoke > "$OUT" 2>&1 || fail "engine retornou erro:\n$(cat "$OUT")"

CALLS="$(grep -c '^CALL ' "$OUT" || true)"
[ "$CALLS" = "3" ] || fail "esperava 3 invocações (siscop/aise/apice), obteve $CALLS:\n$(grep '^CALL' "$OUT")"

grep -q 'elotech-eloweb.yaml' "$OUT" || fail "faltou manifest siscop (elotech-eloweb)"
grep -q 'elotech-aise.yaml'   "$OUT" || fail "faltou manifest aise"
grep -q 'elotech-apice.yaml'  "$OUT" || fail "faltou manifest apice"

CUR="$(date +%Y)"
grep -q "ENTIDADES=1, 2, 3, 4" "$OUT" || fail "ENTIDADES não repassada"
grep -q "EXERCICIOS=$((CUR-2)), $((CUR-1)), $CUR" "$OUT" || fail "janela siscop errada (esperava últimos 3 anos)"
grep -q "EXERCICIOS=2000," "$OUT" || fail "apice deve começar em 2000 (LIC_START)"
# aise é dump full: sem --var
grep 'elotech-aise.yaml' "$OUT" | grep -q -- '--var' && fail "aise não deve receber --var"

# --manifests filtra subconjunto
EXPORTER_BIN="$STUB" bash "$CRON/export-cliente.sh" "$IBGE" --no-smoke --manifests=siscop > "$OUT" 2>&1 || fail "engine (subset) erro"
[ "$(grep -c '^CALL ' "$OUT")" = "1" ] || fail "--manifests=siscop deveria gerar 1 invocação"

echo "OK: export-cliente engine (3 manifests, janelas, subset)"
