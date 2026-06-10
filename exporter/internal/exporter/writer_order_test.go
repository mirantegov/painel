package exporter

import (
	"bytes"
	"testing"

	"github.com/parquet-go/parquet-go"
)

// Garante que as colunas saem na ordem da origem (não alfabética).
func TestBuildSchemaPreservesColumnOrder(t *testing.T) {
	cols := []Column{ // ordem deliberadamente NÃO-alfabética
		{Name: "zebra", OID: 25},
		{Name: "alpha", OID: 25},
		{Name: "mango", OID: 25},
	}
	want := []string{"zebra", "alpha", "mango"}

	schema := BuildSchema("t", cols)
	assertOrder(t, "schema.Fields()", fieldNames(schema.Fields()), want)

	// roundtrip: escreve e relê o Parquet
	data, err := WriteParquet(schema, []map[string]any{
		{"zebra": "z", "alpha": "a", "mango": "m"},
	})
	if err != nil {
		t.Fatalf("WriteParquet: %v", err)
	}
	f, err := parquet.OpenFile(bytes.NewReader(data), int64(len(data)))
	if err != nil {
		t.Fatalf("OpenFile: %v", err)
	}
	assertOrder(t, "parquet relido", fieldNames(f.Schema().Fields()), want)
}

func fieldNames(fs []parquet.Field) []string {
	out := make([]string, len(fs))
	for i, f := range fs {
		out[i] = f.Name()
	}
	return out
}

func assertOrder(t *testing.T, what string, got, want []string) {
	t.Helper()
	if len(got) != len(want) {
		t.Fatalf("%s: tamanho %d != %d (%v)", what, len(got), len(want), got)
	}
	for i := range want {
		if got[i] != want[i] {
			t.Fatalf("%s: ordem errada\n got=%v\nwant=%v", what, got, want)
		}
	}
}
