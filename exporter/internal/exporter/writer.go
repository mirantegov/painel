package exporter

import (
	"bytes"
	"fmt"

	"github.com/parquet-go/parquet-go"
)

// BuildSchema monta o schema Parquet dinâmico a partir das colunas de origem.
func BuildSchema(name string, cols []Column) *parquet.Schema {
	g := parquet.Group{}
	for _, c := range cols {
		g[c.Name] = nodeFor(c.OID)
	}
	return parquet.NewSchema(name, g)
}

// WriteParquet serializa as linhas (map[string]any) em um buffer Parquet.
func WriteParquet(schema *parquet.Schema, rows []map[string]any) ([]byte, error) {
	var buf bytes.Buffer
	w := parquet.NewGenericWriter[map[string]any](&buf, schema)
	if len(rows) > 0 {
		if _, err := w.Write(rows); err != nil {
			return nil, fmt.Errorf("escrevendo parquet: %w", err)
		}
	}
	if err := w.Close(); err != nil {
		return nil, fmt.Errorf("fechando parquet: %w", err)
	}
	return buf.Bytes(), nil
}
