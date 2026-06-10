package exporter

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"regexp"
	"time"
)

// Config são os parâmetros de uma execução do exportador.
type Config struct {
	Municipio   string // id_ibge (7 dígitos) — usado no path do MinIO
	Ano         int
	Schema      string            // schema de origem p/ scope:tenant (ERP real); vazio = mun_<ibge>
	Vars        map[string]string // substitui placeholders __KEY__ no manifest
	Manifest    string            // caminho do export.yaml
	DSN         string            // DATABASE_URL (Postgres de origem)
	S3Endpoint  string
	S3AccessKey string
	S3SecretKey string
	S3Bucket    string // override opcional do manifest.bucket
}

var ibgeRe = regexp.MustCompile(`^\d{7}$`)

// FileResult descreve um objeto exportado (uma tabela → um Parquet no MinIO).
type FileResult struct {
	Source string // schema.tabela de origem
	Key    string // caminho do objeto no bucket
	Rows   int
	Cols   int
	Bytes  int
}

// Result acumula o que a execução produziu (p/ log/monitoramento).
type Result struct {
	Municipio   string
	Ano         int
	Schema      string // schema físico do tenant usado
	Bucket      string
	Files       []FileResult
	GeneratedAt string // RFC3339; preenchido ao publicar as contagens
	CountsKey   string // path do JSON de contagens no MinIO (vazio se não publicado)
}

// Run executa o dump raw de todas as tabelas do manifest pro MinIO.
// Retorna sempre um *Result (parcial em caso de erro) para fins de log.
func Run(ctx context.Context, cfg Config) (*Result, error) {
	res := &Result{Municipio: cfg.Municipio, Ano: cfg.Ano}

	if !ibgeRe.MatchString(cfg.Municipio) {
		return res, fmt.Errorf("municipio inválido %q (esperado 7 dígitos IBGE)", cfg.Municipio)
	}

	man, err := LoadManifest(cfg.Manifest, cfg.Vars)
	if err != nil {
		return res, err
	}
	bucket := man.Bucket
	if cfg.S3Bucket != "" {
		bucket = cfg.S3Bucket
	}
	res.Bucket = bucket

	src, err := NewSource(ctx, cfg.DSN)
	if err != nil {
		return res, err
	}
	defer src.Close()

	sink, err := NewSink(ctx, cfg.S3Endpoint, cfg.S3AccessKey, cfg.S3SecretKey, bucket)
	if err != nil {
		return res, err
	}

	// Schema físico do tenant: --schema (ERP real, ex.: Elotech) ou mun_<ibge> (demo).
	tenantSchema := cfg.Schema
	if tenantSchema == "" {
		tenantSchema = "mun_" + cfg.Municipio
	}
	res.Schema = tenantSchema
	for _, t := range man.Tables {
		// Schema físico: explícito no source (schema.tabela) sempre vence
		// (permite ERP multi-schema, ex.: siscop.* + aise.*). Senão, segue o scope.
		// `scope` controla apenas o path no MinIO (tenant=<ibge>/ · global=_global/).
		physSchema := tenantSchema
		if s, _ := t.split(); s != "" {
			physSchema = s
		} else if t.Scope == "global" {
			physSchema = "public"
		}
		var ano *int
		if t.PartitionByAno {
			a := cfg.Ano
			ano = &a
		}

		cols, rows, err := src.Dump(ctx, physSchema, t.TableName(), t.Columns, t.ExcludeColumns, t.Filters, ano)
		if err != nil {
			return res, fmt.Errorf("dump %s: %w", t.Source, err)
		}
		schema := BuildSchema(t.TableName(), cols)
		data, err := WriteParquet(schema, rows)
		if err != nil {
			return res, fmt.Errorf("parquet %s: %w", t.Source, err)
		}
		key := objectKey(t, physSchema, cfg.Municipio, cfg.Ano)
		if err := sink.Put(ctx, key, data); err != nil {
			return res, fmt.Errorf("upload %s: %w", t.Source, err)
		}
		res.Files = append(res.Files, FileResult{
			Source: t.Source, Key: key, Rows: len(rows), Cols: len(cols), Bytes: len(data),
		})
		log.Printf("ok  %-28s → %s  (%d linhas, %d colunas, %d bytes)",
			t.Source, key, len(rows), len(cols), len(data))
	}

	// Publica as contagens no MinIO p/ reconciliação posterior pelo importador.
	// Falha aqui NÃO invalida o export (artefato auxiliar) — só registra aviso.
	publishCounts(ctx, sink, res, cfg.Municipio)
	return res, nil
}

// publishCounts grava <ibge>/_export/counts-<datahora>.json no MinIO com a
// contagem de linhas por tabela. Cada execução escreve um arquivo datado (não
// sobrescreve as contagens de outros schemas/runs).
func publishCounts(ctx context.Context, sink *Sink, res *Result, ibge string) {
	now := time.Now().UTC()
	res.GeneratedAt = now.Format(time.RFC3339)
	ec := BuildExportCounts(res, res.GeneratedAt)
	data, err := json.MarshalIndent(ec, "", "  ")
	if err != nil {
		log.Printf("aviso: serializando contagens: %v", err)
		return
	}
	key := fmt.Sprintf("%s/_export/counts-%s.json", ibge, now.Format("20060102_150405"))
	if err := sink.Put(ctx, key, data); err != nil {
		log.Printf("aviso: publicando contagens em %s: %v", key, err)
		return
	}
	res.CountsKey = key
	log.Printf("contagens: %s (%d tabelas)", key, len(ec.Tables))
}

// objectKey monta o caminho do objeto no bucket (RAW landing).
// TUDO fica sob o município (<ibge>/), com o schema físico no path p/ evitar
// colisão entre schemas homônimos (ex.: aise.entidade vs siscop.entidade) e o
// arquivo nomeado pela tabela (facilita o ETL no ClickHouse).
// Não há mais _global/: mesmo tabelas de referência (scope:global) ficam sob
// <ibge>/ — cada município tem sua própria cópia, sem risco de sobrescrita.
func objectKey(t Table, physSchema, ibge string, ano int) string {
	table := t.TableName()
	if t.PartitionByAno {
		return fmt.Sprintf("%s/%s/%s/ano=%d/%s.parquet", ibge, physSchema, table, ano, table)
	}
	return fmt.Sprintf("%s/%s/%s.parquet", ibge, physSchema, table)
}
