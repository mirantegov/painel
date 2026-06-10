package importer

import (
	"context"
	"fmt"
	"log"
	"regexp"
	"sort"
	"strings"
)

// Config são os parâmetros de uma execução do importador.
type Config struct {
	IBGE     string // id_ibge (7 dígitos)
	Manifest string // caminho do import manifest YAML

	CHUrl  string // interface HTTP do ClickHouse (ex.: http://52.55.147.97:8123/)
	CHUser string
	CHPass string

	S3Endpoint  string // endpoint p/ o IMPORTADOR listar/ler o MinIO
	S3Internal  string // endpoint que o CLICKHOUSE usa p/ ler o Parquet (rede docker)
	S3AccessKey string
	S3SecretKey string
	S3Bucket    string // override opcional do manifest.bucket

	Recon bool // reconciliar contra as contagens da origem (<ibge>/_export/*.json)
	Tries int  // tentativas por statement (default 2)
}

var ibgeRe = regexp.MustCompile(`^\d{7}$`)

// TableResult é o desfecho de uma tabela.
type TableResult struct {
	RawTable   string `json:"raw_table"`
	Object     string `json:"object"`
	Status     string `json:"status"`                // ok | falha | ausente_no_minio
	Rows       uint64 `json:"rows"`                  // count() no ClickHouse
	Bytes      int64  `json:"bytes,omitempty"`       // tamanho do Parquet no MinIO
	Err        string `json:"erro,omitempty"`        // mensagem em falha
	Recon      string `json:"recon,omitempty"`       // ok | divergente | sem_contagem_origem
	ExportRows int    `json:"export_rows,omitempty"` // contagem da origem (se houver)
}

// Result acumula o que a execução produziu (p/ log/monitoramento).
type Result struct {
	IBGE    string        `json:"ibge"`
	DB      string        `json:"db"`
	Bucket  string        `json:"bucket"`
	Tables  []TableResult `json:"tables"`
	Missing []string      `json:"faltando"` // no manifest, ausente no MinIO
	Extra   []string      `json:"sobrando"` // no MinIO, fora do manifest
}

// OK indica execução sem falhas de tabela nem divergência de reconciliação.
func (r *Result) OK() bool {
	for _, t := range r.Tables {
		if t.Status == "falha" || t.Recon == "divergente" {
			return false
		}
	}
	return true
}

// Run ingere os Parquets do MinIO no ClickHouse raw_<ibge>, criando 1 tabela por
// arquivo (schema inferido, ou tipos fixados via manifest), conta as linhas como
// verificação e reconcilia contra as contagens da origem. Retorna sempre um
// *Result (parcial em erro) p/ log.
func Run(ctx context.Context, cfg Config) (*Result, error) {
	if cfg.Tries < 1 {
		cfg.Tries = 2
	}
	db := "raw_" + cfg.IBGE
	res := &Result{IBGE: cfg.IBGE, DB: db}

	if !ibgeRe.MatchString(cfg.IBGE) {
		return res, fmt.Errorf("ibge inválido %q (esperado 7 dígitos)", cfg.IBGE)
	}

	man, err := LoadManifest(cfg.Manifest)
	if err != nil {
		return res, err
	}
	bucket := man.Bucket
	if cfg.S3Bucket != "" {
		bucket = cfg.S3Bucket
	}
	res.Bucket = bucket

	ch := NewCH(cfg.CHUrl, cfg.CHUser, cfg.CHPass)
	if err := ch.Ping(ctx); err != nil {
		return res, fmt.Errorf("ClickHouse %s inacessível: %w", cfg.CHUrl, err)
	}
	mc, err := NewMinIO(cfg.S3Endpoint, cfg.S3AccessKey, cfg.S3SecretKey, bucket)
	if err != nil {
		return res, err
	}

	// Realidade do MinIO: o que está sob <ibge>/.
	objs, err := mc.ListParquet(ctx, cfg.IBGE)
	if err != nil {
		return res, err
	}
	sizeByRel := make(map[string]int64, len(objs))
	for _, o := range objs {
		sizeByRel[o.Rel] = o.Size
	}

	// Reconciliação de COBERTURA: manifest (esperado) × MinIO (real).
	inManifest := make(map[string]bool, len(man.Tables)) // por object
	for _, t := range man.Tables {
		inManifest[t.Object] = true
		if _, ok := sizeByRel[t.Object]; !ok {
			res.Missing = append(res.Missing, fmt.Sprintf("%s (%s)", t.RawTable, t.Object))
		}
	}
	for rel := range sizeByRel {
		if !inManifest[rel] {
			res.Extra = append(res.Extra, rel)
		}
	}
	sort.Strings(res.Missing)
	sort.Strings(res.Extra)
	if err := ch.CreateDatabase(ctx, db); err != nil {
		return res, fmt.Errorf("criar database %s: %w", db, err)
	}

	// Ordena: difere as tabelas pesadas (defer:true) p/ o fim.
	order := make([]ImportTable, 0, len(man.Tables))
	var deferred []ImportTable
	for _, t := range man.Tables {
		if t.Defer {
			deferred = append(deferred, t)
		} else {
			order = append(order, t)
		}
	}
	order = append(order, deferred...)

	// Carrega contagens da origem (uma vez) p/ reconciliação.
	var exportCounts map[string]TableCount
	if cfg.Recon {
		exportCounts, err = mc.LoadExportCounts(ctx, cfg.IBGE)
		if err != nil {
			log.Printf("aviso: reconciliação indisponível (%v) — seguindo sem ela", err)
			exportCounts = nil
		}
	}

	for _, t := range order {
		tr := TableResult{RawTable: t.RawTable, Object: t.Object, Bytes: sizeByRel[t.Object]}
		if _, ok := sizeByRel[t.Object]; !ok {
			tr.Status = "ausente_no_minio"
			res.Tables = append(res.Tables, tr)
			log.Printf("--  %-32s ausente no MinIO (%s)", t.RawTable, t.Object)
			continue
		}
		s3url := fmt.Sprintf("%s/%s/%s/%s",
			strings.TrimRight(cfg.S3Internal, "/"), bucket, cfg.IBGE, t.Object)
		if err := ch.CreateRawTable(ctx, db, t.RawTable, s3url, cfg.S3AccessKey, cfg.S3SecretKey, t.Types, cfg.Tries); err != nil {
			tr.Status = "falha"
			tr.Err = firstLine(err.Error())
			res.Tables = append(res.Tables, tr)
			log.Printf("FALHA %-32s %s", t.RawTable, tr.Err)
			continue
		}
		rows, err := ch.CountRows(ctx, db, t.RawTable)
		if err != nil {
			tr.Status = "falha"
			tr.Err = "count: " + firstLine(err.Error())
			res.Tables = append(res.Tables, tr)
			log.Printf("FALHA %-32s %s", t.RawTable, tr.Err)
			continue
		}
		tr.Status = "ok"
		tr.Rows = rows
		reconcile(&tr, exportCounts)
		res.Tables = append(res.Tables, tr)
		log.Printf("ok  %-32s %8d linhas%s", t.RawTable, rows, reconNote(tr))
	}
	return res, nil
}

// reconcile cruza a contagem do ClickHouse com a contagem da origem.
func reconcile(tr *TableResult, counts map[string]TableCount) {
	if counts == nil {
		return
	}
	tc, ok := counts[tr.RawTable]
	if !ok {
		tr.Recon = "sem_contagem_origem"
		return
	}
	tr.ExportRows = tc.Rows
	if uint64(tc.Rows) == tr.Rows {
		tr.Recon = "ok"
	} else {
		tr.Recon = "divergente"
	}
}

func reconNote(tr TableResult) string {
	switch tr.Recon {
	case "divergente":
		return fmt.Sprintf("  ⚠ origem=%d", tr.ExportRows)
	case "sem_contagem_origem":
		return "  (sem contagem origem)"
	default:
		return ""
	}
}
