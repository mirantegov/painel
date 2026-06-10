// genmanifest gera o import manifest (manifests/elotech-raw.yaml) por inferência.
//
// O CONJUNTO de tabelas raw esperadas vem dos manifests do EXPORTADOR (contrato
// do que aterrissa no MinIO): para cada `source` (schema.tabela), uma entrada
//
//	raw_table: <schema>_<tabela>   object: <schema>/<tabela>.parquet
//
// Os TIPOS (bloco `types:`) vêm do DDL real da origem (`--dump tmp/eloweb.dump`,
// gitignored). O exportador grava numeric/date/timestamp como String no Parquet;
// o DDL diz o tipo verdadeiro, que o importador re-aplica via cast. Mapa:
//
//	numeric(p,s>0) -> Decimal(p,s)   numeric(p,0) -> Int64 (p<=18) | Decimal(p,0)
//	date           -> Date32         timestamp[/tz] -> DateTime64(6)
//	(double precision/bigint/int/char/varchar/bool são inferidos — não entram)
//
// Uso:
//
//	go run ./cmd/genmanifest --check                 # diff só do CONJUNTO (sem dump); exit 1 se drift
//	go run ./cmd/genmanifest --write --dump <dump>   # grava manifest COM tipos
//	go run ./cmd/genmanifest --dump <dump>           # imprime no stdout
package main

import (
	"bufio"
	"flag"
	"fmt"
	"os"
	"regexp"
	"sort"
	"strconv"
	"strings"

	"gopkg.in/yaml.v3"
)

// expManifest espelha (parcialmente) o manifest do exportador.
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
	schema   string
	table    string
	defer_   bool
	types    map[string]string // col -> tipo ClickHouse (do DDL)
}

func main() {
	var (
		write  = flag.Bool("write", false, "grava em --out")
		check  = flag.Bool("check", false, "compara o CONJUNTO com --out (ignora tipos); exit 1 se drift")
		out    = flag.String("out", "manifests/elotech-raw.yaml", "arquivo de saída")
		bucket = flag.String("bucket", "mirante-parquet", "bucket do MinIO")
		dump   = flag.String("dump", "", "DDL da origem (pg_dump texto) p/ derivar os tipos")
		srcs   multiFlag
	)
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

	if *check { // só o conjunto; não precisa do dump
		if err := checkSet(*out, entries); err != nil {
			fmt.Fprintln(os.Stderr, err)
			os.Exit(1)
		}
		fmt.Printf("ok: %s em dia (%d tabelas, conjunto)\n", *out, len(entries))
		return
	}

	if *dump != "" {
		n, err := attachTypes(entries, *dump)
		if err != nil {
			fmt.Fprintln(os.Stderr, "erro lendo dump:", err)
			os.Exit(1)
		}
		fmt.Fprintf(os.Stderr, "tipos derivados do DDL p/ %d/%d tabelas\n", n, len(entries))
	} else if *write {
		fmt.Fprintln(os.Stderr, "erro: --write requer --dump (senão perderia os tipos); use --dump <pg_dump>")
		os.Exit(1)
	}

	rendered := render(*bucket, srcs, *dump != "", entries)
	if *write {
		if err := os.WriteFile(*out, []byte(rendered), 0o644); err != nil {
			fmt.Fprintln(os.Stderr, "erro gravando:", err)
			os.Exit(1)
		}
		fmt.Printf("gravado %s (%d tabelas)\n", *out, len(entries))
		return
	}
	fmt.Print(rendered)
}

// derive lê os manifests do exportador e produz as entradas raw (ordenadas,
// deduplicadas por raw_table).
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
				schema:   schema,
				table:    table,
				defer_:   heavy[raw],
			})
		}
	}
	sort.Slice(entries, func(i, j int) bool { return entries[i].rawTable < entries[j].rawTable })
	return entries, nil
}

// attachTypes lê o DDL e preenche entry.types p/ as colunas numeric/date/timestamp.
func attachTypes(entries []entry, dumpPath string) (int, error) {
	ddl, err := parseDDL(dumpPath)
	if err != nil {
		return 0, err
	}
	withTypes := 0
	for i := range entries {
		cols := ddl[entries[i].schema+"."+entries[i].table]
		if cols == nil {
			fmt.Fprintf(os.Stderr, "aviso: %s.%s não encontrada no dump\n", entries[i].schema, entries[i].table)
			continue
		}
		types := map[string]string{}
		for col, pgType := range cols {
			if ch, ok := pgToCH(pgType); ok {
				types[col] = ch
			}
		}
		if len(types) > 0 {
			entries[i].types = types
			withTypes++
		}
	}
	return withTypes, nil
}

// pgToCH mapeia um tipo Postgres p/ o tipo ClickHouse-alvo. ok=false = não tipar
// (deixa a inferência: double precision, bigint, int, char/varchar, bool, bytea…).
func pgToCH(pg string) (string, bool) {
	pg = strings.ToLower(strings.Join(strings.Fields(pg), " "))
	switch {
	case strings.HasPrefix(pg, "numeric("):
		p, s := parseNumeric(pg)
		if s > 0 {
			return fmt.Sprintf("Decimal(%d,%d)", p, s), true
		}
		if p <= 18 { // escala 0 → inteiro
			return "Int64", true
		}
		return fmt.Sprintf("Decimal(%d,0)", p), true
	case pg == "date":
		return "Date32", true
	case strings.HasPrefix(pg, "timestamp"):
		return "DateTime64(6)", true
	default:
		return "", false
	}
}

var numericRe = regexp.MustCompile(`numeric\((\d+)(?:,\s*(\d+))?\)`)

func parseNumeric(pg string) (p, s int) {
	m := numericRe.FindStringSubmatch(pg)
	if m == nil {
		return 38, 0
	}
	p, _ = strconv.Atoi(m[1])
	if m[2] != "" {
		s, _ = strconv.Atoi(m[2])
	}
	return p, s
}

var (
	createRe = regexp.MustCompile(`^CREATE TABLE (\w+)\.(\w+) \(`)
	colRe    = regexp.MustCompile(`^\s+([a-z_][a-z0-9_]*)\s+(.+?)(?:\s+NOT NULL| DEFAULT .*)?,?\s*$`)
	skipCol  = regexp.MustCompile(`^\s+(CONSTRAINT|PRIMARY|UNIQUE|FOREIGN|CHECK)\b`)
)

// parseDDL extrai {schema.tabela -> {coluna -> tipoPostgres}} dos blocos
// CREATE TABLE do pg_dump (texto). Encoding latin1: lemos como bytes; os tokens
// de nome/tipo que nos interessam são ASCII.
func parseDDL(path string) (map[string]map[string]string, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	out := map[string]map[string]string{}
	sc := bufio.NewScanner(f)
	sc.Buffer(make([]byte, 1024*1024), 16*1024*1024) // linhas longas do dump
	var cur string
	for sc.Scan() {
		line := strings.TrimRight(sc.Text(), "\r")
		if m := createRe.FindStringSubmatch(line); m != nil {
			cur = m[1] + "." + m[2]
			out[cur] = map[string]string{}
			continue
		}
		if cur == "" {
			continue
		}
		if strings.HasPrefix(line, ")") { // fim do bloco
			cur = ""
			continue
		}
		if skipCol.MatchString(line) {
			continue
		}
		if m := colRe.FindStringSubmatch(line); m != nil {
			typ := strings.TrimSpace(strings.TrimSuffix(m[2], ","))
			out[cur][m[1]] = typ
		}
	}
	return out, sc.Err()
}

func render(bucket string, srcs []string, hasTypes bool, entries []entry) string {
	var b strings.Builder
	b.WriteString("# Import manifest (raw) — GERADO por cmd/genmanifest. NÃO editar à mão.\n")
	b.WriteString("# Conjunto de tabelas: derivado do contrato do exportador (fontes abaixo).\n")
	if hasTypes {
		b.WriteString("# Tipos (`types:`): derivados do DDL real da origem (pg_dump). O exportador\n")
		b.WriteString("# grava numeric/date/timestamp como String; o importador re-tipa via cast.\n")
	} else {
		b.WriteString("# SEM tipos (gerado sem --dump). Rode `make manifests-gen DUMP=<pg_dump>`.\n")
	}
	b.WriteString("# Regenere com `make manifests-gen`; confira o conjunto com `make manifests-check`.\n")
	b.WriteString("# Fontes:\n")
	for _, s := range srcs {
		fmt.Fprintf(&b, "#   - %s\n", s)
	}
	fmt.Fprintf(&b, "bucket: %s\n", bucket)
	b.WriteString("tables:\n")
	for _, e := range entries {
		fmt.Fprintf(&b, "  - raw_table: %s\n    object: %s\n", e.rawTable, e.object)
		if e.defer_ {
			b.WriteString("    defer: true\n")
		}
		if len(e.types) > 0 {
			b.WriteString("    types:\n")
			for _, col := range sortedKeys(e.types) {
				fmt.Fprintf(&b, "      %s: \"%s\"\n", col, e.types[col])
			}
		}
	}
	return b.String()
}

// checkSet compara apenas o conjunto (raw_table/object/defer) do arquivo com o
// derivado dos manifests do exportador. Ignora `types:` (que dependem do dump).
func checkSet(path string, derived []entry) error {
	b, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("check: não li %s: %w", path, err)
	}
	var m struct {
		Tables []struct {
			RawTable string `yaml:"raw_table"`
			Object   string `yaml:"object"`
			Defer    bool   `yaml:"defer"`
		} `yaml:"tables"`
	}
	if err := yaml.Unmarshal(b, &m); err != nil {
		return fmt.Errorf("check: parse %s: %w", path, err)
	}
	cur := map[string]string{}
	for _, t := range m.Tables {
		cur[t.RawTable] = fmt.Sprintf("%s|%v", t.Object, t.Defer)
	}
	want := map[string]string{}
	for _, e := range derived {
		want[e.rawTable] = fmt.Sprintf("%s|%v", e.object, e.defer_)
	}
	var diffs []string
	for k, v := range want {
		if cur[k] != v {
			diffs = append(diffs, "faltando/divergente no arquivo: "+k)
		}
	}
	for k := range cur {
		if _, ok := want[k]; !ok {
			diffs = append(diffs, "sobrando no arquivo: "+k)
		}
	}
	if len(diffs) > 0 {
		sort.Strings(diffs)
		return fmt.Errorf("DRIFT em %s (rode `make manifests-gen`):\n  %s", path, strings.Join(diffs, "\n  "))
	}
	return nil
}

func splitSource(s string) (schema, table string) {
	if i := strings.IndexByte(s, '.'); i >= 0 {
		return s[:i], s[i+1:]
	}
	return "", s
}

func sortedKeys(m map[string]string) []string {
	ks := make([]string, 0, len(m))
	for k := range m {
		ks = append(ks, k)
	}
	sort.Strings(ks)
	return ks
}

type multiFlag []string

func (m *multiFlag) String() string { return strings.Join(*m, ",") }
func (m *multiFlag) Set(s string) error {
	*m = append(*m, s)
	return nil
}
