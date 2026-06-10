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
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

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

	start := time.Now()
	res, runErr := exporter.Run(context.Background(), cfg)
	end := time.Now()
	elapsed := end.Sub(start).Round(time.Millisecond)

	// Grava log da execução (mesmo em falha) p/ monitoramento futuro.
	if logPath, err := writeLog(cfg, res, start, end, runErr); err != nil {
		log.Printf("aviso: não foi possível gravar o log: %v", err)
	} else {
		log.Printf("log: %s", logPath)
	}

	if runErr != nil {
		log.Fatalf("falha após %s: %v", elapsed, runErr)
	}
	log.Printf("concluído em %s (%d arquivos).", elapsed, len(res.Files))
}

// writeLog grava log/export_<ibge>_<data_hora>.log com início/fim, duração,
// status e a lista de arquivos exportados. Cria a pasta log/ se não existir.
func writeLog(cfg exporter.Config, res *exporter.Result, start, end time.Time, runErr error) (string, error) {
	const logDir = "log"
	if err := os.MkdirAll(logDir, 0o755); err != nil {
		return "", err
	}
	// log/export_<ibge>_<AAAAMMDD_HHMMSS>.log
	path := filepath.Join(logDir, "export_"+cfg.Municipio+"_"+start.Format("20060102_150405")+".log")
	f, err := os.Create(path)
	if err != nil {
		return "", err
	}
	defer f.Close()

	status := "OK"
	if runErr != nil {
		status = "FALHA"
	}
	fmt.Fprintf(f, "Mirante — exportador\n")
	fmt.Fprintf(f, "municipio: %s\n", cfg.Municipio)
	fmt.Fprintf(f, "ano:       %d\n", cfg.Ano)
	fmt.Fprintf(f, "schema:    %s\n", res.Schema)
	fmt.Fprintf(f, "bucket:    %s\n", res.Bucket)
	fmt.Fprintf(f, "inicio:    %s\n", start.Format("2006-01-02 15:04:05"))
	fmt.Fprintf(f, "fim:       %s\n", end.Format("2006-01-02 15:04:05"))
	fmt.Fprintf(f, "duracao:   %s\n", end.Sub(start).Round(time.Millisecond))
	fmt.Fprintf(f, "status:    %s\n", status)
	if runErr != nil {
		fmt.Fprintf(f, "erro:      %v\n", runErr)
	}

	var totRows, totBytes int
	fmt.Fprintf(f, "\narquivos exportados (%d):\n", len(res.Files))
	for _, fr := range res.Files {
		fmt.Fprintf(f, "  %-32s %-48s %8d linhas %10d bytes\n", fr.Source, fr.Key, fr.Rows, fr.Bytes)
		totRows += fr.Rows
		totBytes += fr.Bytes
	}
	fmt.Fprintf(f, "\ntotal: %d arquivos, %d linhas, %d bytes\n", len(res.Files), totRows, totBytes)

	// Cópia local machine-readable das contagens (espelha o JSON publicado no
	// MinIO p/ reconciliação). Mesmo generated_at do artefato remoto, se houver.
	if len(res.Files) > 0 {
		gen := res.GeneratedAt
		if gen == "" {
			gen = start.UTC().Format(time.RFC3339)
		}
		if err := writeCountsJSON(filepath.Join(logDir, "export_"+cfg.Municipio+"_"+start.Format("20060102_150405")+".json"), res, gen); err != nil {
			log.Printf("aviso: não gravou o .json de contagens: %v", err)
		}
	}
	return path, nil
}

// writeCountsJSON grava a cópia local do artefato de contagens (ExportCounts).
func writeCountsJSON(path string, res *exporter.Result, generatedAt string) error {
	f, err := os.Create(path)
	if err != nil {
		return err
	}
	defer f.Close()
	enc := json.NewEncoder(f)
	enc.SetIndent("", "  ")
	return enc.Encode(exporter.BuildExportCounts(res, generatedAt))
}

func env(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}
