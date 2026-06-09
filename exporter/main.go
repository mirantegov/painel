// Exportador raw: dumpa tabelas do Postgres de origem (o "ERP") em Parquet
// e sobe pro MinIO, fielmente (sem transformação). A normalização p/ SIM-AM
// e o tratamento acontecem no ClickHouse (Épico 5).
//
// Uso:
//
//	go run . --municipio 4117107 --ano 2026 [--manifest export.yaml]
//
// Env: DATABASE_URL, S3_ENDPOINT, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET (opcional).
package main

import (
	"context"
	"flag"
	"log"
	"os"
	"strings"

	"github.com/mirantegov/painel/exporter/internal/exporter"
)

// varFlags coleta múltiplos --var KEY=VALUE.
type varFlags map[string]string

func (v varFlags) String() string { return "" }
func (v varFlags) Set(s string) error {
	k, val, ok := strings.Cut(s, "=")
	if !ok || k == "" {
		return os.ErrInvalid
	}
	v[k] = val
	return nil
}

func main() {
	log.SetFlags(0)

	municipio := flag.String("municipio", "", "id IBGE do município (7 dígitos) — usado no path do MinIO")
	ano := flag.Int("ano", 0, "ano de referência (filtra tabelas partition_by_ano)")
	schema := flag.String("schema", "", "schema de origem p/ scope:tenant (ERP real, ex.: Elotech); vazio = mun_<ibge>")
	manifest := flag.String("manifest", "export.yaml", "caminho do manifest YAML")
	vars := varFlags{}
	flag.Var(vars, "var", "substitui placeholder __KEY__ no manifest (repetível): --var ENTIDADE=1")
	flag.Parse()

	if *municipio == "" || *ano == 0 {
		log.Println("erro: --municipio e --ano são obrigatórios")
		flag.Usage()
		os.Exit(2)
	}

	cfg := exporter.Config{
		Municipio:   *municipio,
		Ano:         *ano,
		Schema:      *schema,
		Vars:        vars,
		Manifest:    *manifest,
		DSN:         env("DATABASE_URL", "postgresql://postgres:postgres@127.0.0.1:54322/postgres"),
		S3Endpoint:  env("S3_ENDPOINT", "http://127.0.0.1:9000"),
		S3AccessKey: env("S3_ACCESS_KEY", "minioadmin"),
		S3SecretKey: env("S3_SECRET_KEY", "minioadmin"),
		S3Bucket:    os.Getenv("S3_BUCKET"),
	}

	if err := exporter.Run(context.Background(), cfg); err != nil {
		log.Fatalf("falha: %v", err)
	}
	log.Println("concluído.")
}

func env(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}
