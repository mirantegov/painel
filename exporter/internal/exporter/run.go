package exporter

import (
	"context"
	"fmt"
	"log"
	"regexp"
)

// Config são os parâmetros de uma execução do exportador.
type Config struct {
	Municipio   string // id_ibge (7 dígitos) — usado no path do MinIO
	Ano         int
	Schema      string // schema de origem p/ scope:tenant (ERP real); vazio = mun_<ibge>
	Manifest    string // caminho do export.yaml
	DSN         string // DATABASE_URL (Postgres de origem)
	S3Endpoint  string
	S3AccessKey string
	S3SecretKey string
	S3Bucket    string // override opcional do manifest.bucket
}

var ibgeRe = regexp.MustCompile(`^\d{7}$`)

// Run executa o dump raw de todas as tabelas do manifest pro MinIO.
func Run(ctx context.Context, cfg Config) error {
	if !ibgeRe.MatchString(cfg.Municipio) {
		return fmt.Errorf("municipio inválido %q (esperado 7 dígitos IBGE)", cfg.Municipio)
	}

	man, err := LoadManifest(cfg.Manifest)
	if err != nil {
		return err
	}
	bucket := man.Bucket
	if cfg.S3Bucket != "" {
		bucket = cfg.S3Bucket
	}

	src, err := NewSource(ctx, cfg.DSN)
	if err != nil {
		return err
	}
	defer src.Close()

	sink, err := NewSink(ctx, cfg.S3Endpoint, cfg.S3AccessKey, cfg.S3SecretKey, bucket)
	if err != nil {
		return err
	}

	// Schema físico do tenant: --schema (ERP real, ex.: Elotech) ou mun_<ibge> (demo).
	tenantSchema := cfg.Schema
	if tenantSchema == "" {
		tenantSchema = "mun_" + cfg.Municipio
	}
	for _, t := range man.Tables {
		physSchema := tenantSchema
		if t.Scope == "global" {
			// global usa o schema explícito do source (ex.: public.x); senão public.
			if s, _ := t.split(); s != "" {
				physSchema = s
			} else {
				physSchema = "public"
			}
		}
		var ano *int
		if t.PartitionByAno {
			a := cfg.Ano
			ano = &a
		}

		cols, rows, err := src.Dump(ctx, physSchema, t.TableName(), t.Columns, t.Filters, ano)
		if err != nil {
			return err
		}
		schema := BuildSchema(t.TableName(), cols)
		data, err := WriteParquet(schema, rows)
		if err != nil {
			return err
		}
		key := objectKey(t, cfg.Municipio, cfg.Ano)
		if err := sink.Put(ctx, key, data); err != nil {
			return err
		}
		log.Printf("ok  %-28s → %s  (%d linhas, %d colunas, %d bytes)",
			t.Source, key, len(rows), len(cols), len(data))
	}
	return nil
}

// objectKey monta o caminho do objeto no bucket (RAW landing).
func objectKey(t Table, ibge string, ano int) string {
	table := t.TableName()
	if t.Scope == "global" {
		return fmt.Sprintf("_global/%s/part-0.parquet", table)
	}
	if t.PartitionByAno {
		return fmt.Sprintf("%s/%s/ano=%d/part-0.parquet", ibge, table, ano)
	}
	return fmt.Sprintf("%s/%s/part-0.parquet", ibge, table)
}
