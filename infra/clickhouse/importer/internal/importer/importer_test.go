package importer

import (
	"os"
	"path/filepath"
	"testing"
)

func writeTmp(t *testing.T, content string) string {
	t.Helper()
	p := filepath.Join(t.TempDir(), "manifest.yaml")
	if err := os.WriteFile(p, []byte(content), 0o644); err != nil {
		t.Fatal(err)
	}
	return p
}

func TestLoadManifest_OK(t *testing.T) {
	m, err := LoadManifest(writeTmp(t, `
bucket: mirante-parquet
tables:
  - raw_table: siscop_empenho
    object: siscop/empenho.parquet
  - raw_table: siscop_eventoslancados
    object: siscop/eventoslancados.parquet
    defer: true
    types:
      vlempenho: "Decimal(18,2)"
`))
	if err != nil {
		t.Fatalf("LoadManifest: %v", err)
	}
	if m.Bucket != "mirante-parquet" || len(m.Tables) != 2 {
		t.Fatalf("manifest inesperado: %+v", m)
	}
	if !m.Tables[1].Defer || m.Tables[1].Types["vlempenho"] != "Decimal(18,2)" {
		t.Fatalf("defer/types não parseados: %+v", m.Tables[1])
	}
}

func TestLoadManifest_Invalid(t *testing.T) {
	cases := map[string]string{
		"raw_table inválido":  "bucket: b\ntables:\n  - raw_table: \"siscop empenho\"\n    object: siscop/empenho.parquet\n",
		"object inválido":     "bucket: b\ntables:\n  - raw_table: siscop_empenho\n    object: siscop/empenho.csv\n",
		"path traversal":      "bucket: b\ntables:\n  - raw_table: x\n    object: ../etc/passwd.parquet\n",
		"raw_table duplicado": "bucket: b\ntables:\n  - raw_table: x\n    object: a/x.parquet\n  - raw_table: x\n    object: b/x.parquet\n",
		"sem bucket":          "tables:\n  - raw_table: x\n    object: a/x.parquet\n",
		"sem tabelas":         "bucket: b\ntables: []\n",
		"tipo inválido":       "bucket: b\ntables:\n  - raw_table: x\n    object: a/x.parquet\n    types: { c: \"DROP; --\" }\n",
	}
	for name, body := range cases {
		t.Run(name, func(t *testing.T) {
			if _, err := LoadManifest(writeTmp(t, body)); err == nil {
				t.Fatalf("esperava erro para %q", name)
			}
		})
	}
}

func TestReconcile(t *testing.T) {
	counts := map[string]TableCount{
		"siscop_empenho": {Schema: "siscop", Table: "empenho", Rows: 100},
		"siscop_receita": {Schema: "siscop", Table: "receita", Rows: 50},
	}
	tests := []struct {
		raw      string
		rows     uint64
		wantStat string
		wantExp  int
	}{
		{"siscop_empenho", 100, "ok", 100},
		{"siscop_receita", 49, "divergente", 50},
		{"siscop_outra", 7, "sem_contagem_origem", 0},
	}
	for _, tc := range tests {
		tr := &TableResult{RawTable: tc.raw, Rows: tc.rows}
		reconcile(tr, counts)
		if tr.Recon != tc.wantStat || tr.ExportRows != tc.wantExp {
			t.Errorf("%s: recon=%q export=%d, queria %q/%d", tc.raw, tr.Recon, tr.ExportRows, tc.wantStat, tc.wantExp)
		}
	}
	// recon desligada (counts nil) não marca nada.
	tr := &TableResult{RawTable: "x", Rows: 1}
	reconcile(tr, nil)
	if tr.Recon != "" {
		t.Errorf("counts nil deveria não reconciliar, got %q", tr.Recon)
	}
}

func TestBuildStructure(t *testing.T) {
	inferred := [][2]string{
		{"id", "Nullable(Int64)"},
		{"vlempenho", "Nullable(Float64)"},
		{"descricao", "Nullable(String)"},
	}
	got := buildStructure(inferred, map[string]string{"vlempenho": "Decimal(18,2)"})
	want := "`id` Nullable(Int64), `vlempenho` Decimal(18,2), `descricao` Nullable(String)"
	if got != want {
		t.Fatalf("buildStructure:\n got=%q\nwant=%q", got, want)
	}
}

func TestValidateOverrides(t *testing.T) {
	inferred := [][2]string{{"id", "Int64"}, {"vl", "Float64"}}
	if err := validateOverrides(inferred, map[string]string{"vl": "Decimal(18,2)"}); err != nil {
		t.Fatalf("override válido não deveria falhar: %v", err)
	}
	if err := validateOverrides(inferred, map[string]string{"naoexiste": "String"}); err == nil {
		t.Fatal("override órfão deveria falhar")
	}
}

func TestChEsc(t *testing.T) {
	if got := chEsc(`a'b\c`); got != `a\'b\\c` {
		t.Fatalf("chEsc: %q", got)
	}
}

func TestExportCountsRawTable(t *testing.T) {
	tc := TableCount{Schema: "aise", Table: "pessoa"}
	if tc.RawTable() != "aise_pessoa" {
		t.Fatalf("RawTable: %q", tc.RawTable())
	}
}
