// genmanifest gera o import manifest (manifests/elotech-raw.yaml) por inferência
// a partir dos manifests do EXPORTADOR — que são o contrato do que aterrissa no
// MinIO. Para cada `source` (schema.tabela), emite uma entrada raw esperada:
//
//	raw_table: <schema>_<tabela>   object: <schema>/<tabela>.parquet
//
// Determinístico e versionável: o conjunto esperado vem do contrato do export; o
// importador, em runtime, compara esse esperado com a realidade do MinIO.
//
// Uso:
//
//	go run ./cmd/genmanifest                 # imprime no stdout
//	go run ./cmd/genmanifest --write         # grava em manifests/elotech-raw.yaml
//	go run ./cmd/genmanifest --check         # diff; exit 1 se divergir do arquivo
package main

import (
	"bytes"
	"flag"
	"fmt"
	"os"
	"sort"
	"strings"

	"gopkg.in/yaml.v3"
)

// expManifest espelha (parcialmente) o manifest do exportador — só o que importa
// p/ derivar o conjunto de tabelas raw.
type expManifest struct {
	Tables []struct {
		Source string `yaml:"source"`
		Scope  string `yaml:"scope"`
	} `yaml:"tables"`
}

// Tabelas pesadas do siscop diferidas p/ o fim (mesma lista do antigo import_raw.sh).
var heavy = map[string]bool{
	"siscop_eventoslancados":      true,
	"siscop_eventoslancadosconta": true,
	"siscop_lancamentosequencia":  true,
}

type entry struct {
	rawTable string
	object   string
	defer_   bool
}

func main() {
	write := flag.Bool("write", false, "grava em --out (default manifests/elotech-raw.yaml)")
	check := flag.Bool("check", false, "compara com --out; exit 1 se divergir")
	out := flag.String("out", "manifests/elotech-raw.yaml", "arquivo de saída do import manifest")
	bucket := flag.String("bucket", "mirante-parquet", "bucket do MinIO")
	var srcs multiFlag
	flag.Var(&srcs, "src", "manifest do exportador (repetível); default: os 3 elotech")
	flag.Parse()

	if len(srcs) == 0 {
		srcs = multiFlag{
			"../../../exporter/manifests/elotech-eloweb.yaml",
			"../../../exporter/manifests/elotech-aise.yaml",
			"../../../exporter/manifests/elotech-apice.yaml",
		}
	}

	entries, err := derive(srcs)
	if err != nil {
		fmt.Fprintln(os.Stderr, "erro:", err)
		os.Exit(1)
	}
	rendered := render(*bucket, srcs, entries)

	switch {
	case *check:
		cur, err := os.ReadFile(*out)
		if err != nil {
			fmt.Fprintf(os.Stderr, "check: não li %s: %v\n", *out, err)
			os.Exit(1)
		}
		if !bytes.Equal(cur, []byte(rendered)) {
			fmt.Fprintf(os.Stderr, "DRIFT: %s difere do gerado — rode `make manifests-gen`\n", *out)
			os.Exit(1)
		}
		fmt.Printf("ok: %s em dia (%d tabelas)\n", *out, len(entries))
	case *write:
		if err := os.WriteFile(*out, []byte(rendered), 0o644); err != nil {
			fmt.Fprintln(os.Stderr, "erro gravando:", err)
			os.Exit(1)
		}
		fmt.Printf("gravado %s (%d tabelas)\n", *out, len(entries))
	default:
		fmt.Print(rendered)
	}
}

// derive lê os manifests do exportador e produz as entradas raw (ordenadas,
// deduplicadas por raw_table — tabelas compartilhadas aparecem uma vez).
func derive(srcs []string) ([]entry, error) {
	seen := map[string]bool{}
	var entries []entry
	for _, path := range srcs {
		b, err := os.ReadFile(path)
		if err != nil {
			return nil, fmt.Errorf("lendo %s: %w", path, err)
		}
		var m expManifest
		if err := yaml.Unmarshal(b, &m); err != nil {
			return nil, fmt.Errorf("parse %s: %w", path, err)
		}
		for _, t := range m.Tables {
			schema, table := splitSource(t.Source)
			if schema == "" {
				if t.Scope == "global" {
					schema = "public"
				} else {
					fmt.Fprintf(os.Stderr, "aviso: %q sem schema e scope!=global em %s — pulada\n", t.Source, path)
					continue
				}
			}
			raw := schema + "_" + table
			if seen[raw] {
				continue
			}
			seen[raw] = true
			entries = append(entries, entry{
				rawTable: raw,
				object:   schema + "/" + table + ".parquet",
				defer_:   heavy[raw],
			})
		}
	}
	sort.Slice(entries, func(i, j int) bool { return entries[i].rawTable < entries[j].rawTable })
	return entries, nil
}

func render(bucket string, srcs []string, entries []entry) string {
	var b strings.Builder
	b.WriteString("# Import manifest (raw) — GERADO por cmd/genmanifest. NÃO editar à mão.\n")
	b.WriteString("# Conjunto de tabelas raw ESPERADAS no MinIO, derivado do contrato do\n")
	b.WriteString("# exportador. Regenere com `make manifests-gen`; confira com `make manifests-check`.\n")
	b.WriteString("# Fontes:\n")
	for _, s := range srcs {
		fmt.Fprintf(&b, "#   - %s\n", s)
	}
	b.WriteString("#\n")
	b.WriteString("# Para fixar tipos onde a inferência do ClickHouse erra, adicione (à mão, e\n")
	b.WriteString("# então mude para um arquivo curado fora do gerado) um bloco `types:` por tabela:\n")
	b.WriteString("#   - raw_table: siscop_empenho\n")
	b.WriteString("#     object: siscop/empenho.parquet\n")
	b.WriteString("#     types: { vlempenho: \"Decimal(18,2)\" }\n")
	fmt.Fprintf(&b, "bucket: %s\n", bucket)
	b.WriteString("tables:\n")
	for _, e := range entries {
		fmt.Fprintf(&b, "  - raw_table: %s\n    object: %s\n", e.rawTable, e.object)
		if e.defer_ {
			b.WriteString("    defer: true\n")
		}
	}
	return b.String()
}

func splitSource(s string) (schema, table string) {
	if i := strings.IndexByte(s, '.'); i >= 0 {
		return s[:i], s[i+1:]
	}
	return "", s
}

type multiFlag []string

func (m *multiFlag) String() string { return strings.Join(*m, ",") }
func (m *multiFlag) Set(s string) error {
	*m = append(*m, s)
	return nil
}
