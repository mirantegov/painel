package exporter

import (
	"context"
	"fmt"
	"sort"
	"strings"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

func sortedKeys(m map[string]any) []string {
	ks := make([]string, 0, len(m))
	for k := range m {
		ks = append(ks, k)
	}
	sort.Strings(ks)
	return ks
}

// Column é uma coluna de origem (nome + OID do tipo Postgres).
type Column struct {
	Name string
	OID  uint32
}

// Source lê tabelas do Postgres de origem (o "ERP").
type Source struct {
	pool *pgxpool.Pool
}

// NewSource abre o pool no DATABASE_URL.
func NewSource(ctx context.Context, dsn string) (*Source, error) {
	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		return nil, fmt.Errorf("conectando Postgres: %w", err)
	}
	if err := pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, fmt.Errorf("ping Postgres: %w", err)
	}
	return &Source{pool: pool}, nil
}

func (s *Source) Close() { s.pool.Close() }

// Dump lê uma tabela inteira (raw fiel). Retorna as colunas (nome+OID) e as
// linhas como map[string]any já convertidas para tipos amigáveis ao Parquet.
// schemaName é o schema físico (public ou mun_<ibge>). ano, se != nil, filtra.
func (s *Source) Dump(ctx context.Context, schemaName, table string, columns []string, filters map[string]any, ano *int) ([]Column, []map[string]any, error) {
	colExpr := "*"
	if len(columns) > 0 {
		quoted := make([]string, len(columns))
		for i, c := range columns {
			quoted[i] = pgx.Identifier{c}.Sanitize()
		}
		colExpr = strings.Join(quoted, ", ")
	}
	rel := pgx.Identifier{schemaName, table}.Sanitize()
	sql := fmt.Sprintf("select %s from %s", colExpr, rel)

	// WHERE = filtros (igualdade ou IN p/ lista, ordem determinística) [+ ano].
	// Valores sempre parametrizados.
	var conds []string
	var args []any
	for _, k := range sortedKeys(filters) {
		col := pgx.Identifier{k}.Sanitize()
		if list, ok := filters[k].([]any); ok { // lista → IN (...)
			if len(list) == 0 {
				return nil, nil, fmt.Errorf("filtro %q em %s: lista vazia", k, rel)
			}
			ph := make([]string, len(list))
			for i, v := range list {
				args = append(args, v)
				ph[i] = fmt.Sprintf("$%d", len(args))
			}
			conds = append(conds, fmt.Sprintf("%s in (%s)", col, strings.Join(ph, ", ")))
			continue
		}
		args = append(args, filters[k]) // escalar → igualdade
		conds = append(conds, fmt.Sprintf("%s = $%d", col, len(args)))
	}
	if ano != nil {
		args = append(args, *ano)
		conds = append(conds, fmt.Sprintf("ano = $%d", len(args)))
	}
	if len(conds) > 0 {
		sql += " where " + strings.Join(conds, " and ")
	}

	rows, err := s.pool.Query(ctx, sql, args...)
	if err != nil {
		return nil, nil, fmt.Errorf("query %s: %w", rel, err)
	}
	defer rows.Close()

	fds := rows.FieldDescriptions()
	cols := make([]Column, len(fds))
	for i, fd := range fds {
		cols[i] = Column{Name: fd.Name, OID: fd.DataTypeOID}
	}

	var out []map[string]any
	for rows.Next() {
		vals, err := rows.Values()
		if err != nil {
			return nil, nil, fmt.Errorf("scan %s: %w", rel, err)
		}
		row := make(map[string]any, len(cols))
		for i, c := range cols {
			row[c.Name] = convertValue(c.OID, vals[i])
		}
		out = append(out, row)
	}
	if err := rows.Err(); err != nil {
		return nil, nil, fmt.Errorf("iter %s: %w", rel, err)
	}
	return cols, out, nil
}
