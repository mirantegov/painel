// Importador raw: ingere os Parquet do MinIO (<ibge>/<schema>/<tabela>.parquet)
// no ClickHouse raw_<ibge>, criando 1 tabela por arquivo (<schema>_<tabela>),
// com schema inferido (ou tipos fixados pelo manifest). Conta as linhas como
// verificação e reconcilia contra as contagens publicadas pelo exportador.
//
// Sucessor em Go do antigo infra/clickhouse/tools/import_raw.sh — agora
// manifest-driven (detecta tabela faltando/sobrando) e com log estruturado.
//
// Uso:
//
//	importer --ibge 4117107 [--manifest manifests/elotech-raw.yaml] [--no-recon]
//
// Env (obrigatórios): CLICKHOUSE_URL, CLICKHOUSE_USER, CLICKHOUSE_PASSWORD,
//
//	S3_ACCESS_KEY, S3_SECRET_KEY
//
// Env (opcionais): S3_BUCKET (default do manifest), MINIO_ENDPOINT (p/ o
//
//	importador listar; default http://localhost:9000), S3_INTERNAL (endpoint que
//	o ClickHouse usa p/ ler o Parquet; default http://minio:9000).
package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/mirantegov/painel/importer/internal/importer"
)

func main() {
	log.SetFlags(0)

	ibge := flag.String("ibge", "", "id IBGE do município (7 dígitos)")
	manifest := flag.String("manifest", "manifests/elotech-raw.yaml", "caminho do import manifest YAML")
	noRecon := flag.Bool("no-recon", false, "não reconciliar contra as contagens da origem")
	flag.Parse()

	if *ibge == "" {
		log.Println("erro: --ibge é obrigatório")
		flag.Usage()
		os.Exit(2)
	}

	cfg := importer.Config{
		IBGE:        *ibge,
		Manifest:    *manifest,
		CHUrl:       env("CLICKHOUSE_URL", "http://localhost:8123/"),
		CHUser:      env("CLICKHOUSE_USER", "default"),
		CHPass:      env("CLICKHOUSE_PASSWORD", ""),
		S3Endpoint:  env("MINIO_ENDPOINT", "http://localhost:9000"),
		S3Internal:  env("S3_INTERNAL", "http://minio:9000"),
		S3AccessKey: os.Getenv("S3_ACCESS_KEY"),
		S3SecretKey: os.Getenv("S3_SECRET_KEY"),
		S3Bucket:    os.Getenv("S3_BUCKET"),
		Recon:       !*noRecon,
	}
	if cfg.S3AccessKey == "" || cfg.S3SecretKey == "" {
		log.Fatalln("erro: defina S3_ACCESS_KEY e S3_SECRET_KEY")
	}

	log.Printf("[import] raw_%s <- MinIO %s (CH=%s, minio-via-CH=%s)",
		cfg.IBGE, cfg.S3Endpoint, cfg.CHUrl, cfg.S3Internal)

	start := time.Now()
	res, runErr := importer.Run(context.Background(), cfg)
	end := time.Now()
	elapsed := end.Sub(start).Round(time.Millisecond)

	if logPath, err := writeLog(cfg, res, start, end, runErr); err != nil {
		log.Printf("aviso: não foi possível gravar o log: %v", err)
	} else {
		log.Printf("log: %s", logPath)
	}

	if runErr != nil {
		log.Fatalf("falha após %s: %v", elapsed, runErr)
	}
	ok, fail := tally(res)
	log.Printf("concluído em %s (%d ok, %d falhas).", elapsed, ok, fail)
	if !res.OK() {
		os.Exit(1)
	}
}

func tally(res *importer.Result) (ok, fail int) {
	for _, t := range res.Tables {
		if t.Status == "ok" {
			ok++
		} else if t.Status == "falha" {
			fail++
		}
	}
	return ok, fail
}

// writeLog grava log/import_<ibge>_<datahora>.log (legível) + .json (máquina).
// Espelha exporter/main.go:writeLog.
func writeLog(cfg importer.Config, res *importer.Result, start, end time.Time, runErr error) (string, error) {
	const logDir = "log"
	if err := os.MkdirAll(logDir, 0o755); err != nil {
		return "", err
	}
	stamp := start.Format("20060102_150405")
	path := filepath.Join(logDir, "import_"+cfg.IBGE+"_"+stamp+".log")
	f, err := os.Create(path)
	if err != nil {
		return "", err
	}
	defer f.Close()

	status := "OK"
	if runErr != nil {
		status = "FALHA"
	} else if !res.OK() {
		status = "COM_AVISOS"
	}
	fmt.Fprintf(f, "Mirante — importador raw\n")
	fmt.Fprintf(f, "ibge:     %s\n", cfg.IBGE)
	fmt.Fprintf(f, "database: %s\n", res.DB)
	fmt.Fprintf(f, "bucket:   %s\n", res.Bucket)
	fmt.Fprintf(f, "inicio:   %s\n", start.Format("2006-01-02 15:04:05"))
	fmt.Fprintf(f, "fim:      %s\n", end.Format("2006-01-02 15:04:05"))
	fmt.Fprintf(f, "duracao:  %s\n", end.Sub(start).Round(time.Millisecond))
	fmt.Fprintf(f, "status:   %s\n", status)
	if runErr != nil {
		fmt.Fprintf(f, "erro:     %v\n", runErr)
	}

	var totRows uint64
	var nOK, nFail, nDiv int
	fmt.Fprintf(f, "\ntabelas (%d):\n", len(res.Tables))
	for _, t := range res.Tables {
		line := fmt.Sprintf("  %-32s %-9s %10d linhas", t.RawTable, t.Status, t.Rows)
		switch t.Recon {
		case "divergente":
			line += fmt.Sprintf("  DIVERGENTE (origem=%d)", t.ExportRows)
			nDiv++
		case "ok":
			line += "  =origem"
		case "sem_contagem_origem":
			line += "  (sem contagem origem)"
		}
		if t.Err != "" {
			line += "  erro: " + t.Err
		}
		fmt.Fprintln(f, line)
		totRows += t.Rows
		if t.Status == "ok" {
			nOK++
		} else if t.Status == "falha" {
			nFail++
		}
	}
	fmt.Fprintf(f, "\ntotal: %d tabelas, %d ok, %d falhas, %d linhas\n", len(res.Tables), nOK, nFail, totRows)

	if len(res.Missing) > 0 {
		fmt.Fprintf(f, "\nfaltando (no manifest, ausente no MinIO) — %d:\n", len(res.Missing))
		for _, s := range res.Missing {
			fmt.Fprintf(f, "  %s\n", s)
		}
	}
	if len(res.Extra) > 0 {
		fmt.Fprintf(f, "\nsobrando (no MinIO, fora do manifest) — %d:\n", len(res.Extra))
		for _, s := range res.Extra {
			fmt.Fprintf(f, "  %s\n", s)
		}
	}
	if nDiv > 0 {
		fmt.Fprintf(f, "\n⚠ %d tabela(s) com contagem DIVERGENTE da origem — investigar ingestão.\n", nDiv)
	}

	// Sidecar machine-readable p/ automação/monitoramento.
	if err := writeJSON(filepath.Join(logDir, "import_"+cfg.IBGE+"_"+stamp+".json"), res); err != nil {
		log.Printf("aviso: não gravou o .json: %v", err)
	}
	return path, nil
}

func writeJSON(path string, res *importer.Result) error {
	f, err := os.Create(path)
	if err != nil {
		return err
	}
	defer f.Close()
	return importer.WriteResultJSON(f, res)
}

func env(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}
