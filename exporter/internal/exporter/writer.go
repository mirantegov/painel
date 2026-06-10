package exporter

import (
	"bytes"
	"fmt"

	"github.com/parquet-go/parquet-go"
)

// orderedGroup é um parquet.Group que PRESERVA a ordem das colunas. O
// parquet.Group padrão é um map e o parquet-go ordena os campos alfabeticamente
// em Fields(); aqui reordenamos para a ordem da origem (ordinal do Postgres).
type orderedGroup struct {
	parquet.Group
	order []string // nomes na ordem desejada (ordem das colunas da origem)
}

func (g orderedGroup) Fields() []parquet.Field {
	byName := make(map[string]parquet.Field, len(g.order))
	for _, f := range g.Group.Fields() { // Fields() do Group entrega os Field corretos
		byName[f.Name()] = f
	}
	out := make([]parquet.Field, 0, len(g.order))
	for _, name := range g.order {
		if f, ok := byName[name]; ok {
			out = append(out, f)
		}
	}
	return out
}

// BuildSchema monta o schema Parquet dinâmico a partir das colunas de origem,
// preservando a ordem das colunas (igual à da base de origem).
func BuildSchema(name string, cols []Column) *parquet.Schema {
	g := parquet.Group{}
	order := make([]string, len(cols))
	for i, c := range cols {
		g[c.Name] = nodeFor(c.OID)
		order[i] = c.Name
	}
	return parquet.NewSchema(name, orderedGroup{Group: g, order: order})
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
