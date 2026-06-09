#!/usr/bin/env bash
# Aplica supabase/migrations/*.sql no Postgres de produção (container Docker),
# de forma idempotente: tabela public.schema_migrations registra o que já rodou;
# cada migration roda em transação (-1) e só é aplicada uma vez, em ordem lexical.
#
# Uso (no host da VPS): bash scripts/db-migrate-prod.sh [container]
# Pré: container Postgres no ar, com supabase/migrations montado em /migrations.
set -euo pipefail

CONTAINER="${1:-mirante-postgres}"

docker exec -i "$CONTAINER" sh -s <<'INNER'
set -eu
DB="${POSTGRES_DB:-mirante}"
U="${POSTGRES_USER:-mirante}"
Q="psql -v ON_ERROR_STOP=1 -U $U -d $DB -qAt"

$Q -c "create table if not exists public.schema_migrations(
         version text primary key,
         applied_at timestamptz not null default now());"

for f in $(ls /migrations/*.sql | sort); do
  v=$(basename "$f")
  if [ "$($Q -c "select 1 from public.schema_migrations where version='$v'")" = "1" ]; then
    echo "skip  $v"
    continue
  fi
  echo "apply $v"
  psql -v ON_ERROR_STOP=1 -U "$U" -d "$DB" -1 -f "$f" >/dev/null
  $Q -c "insert into public.schema_migrations(version) values('$v')"
done

echo "--- migrations aplicadas: ---"
$Q -c "select version from public.schema_migrations order by version"
INNER
