package exporter

// Contagens — artefato de reconciliação ORIGEM × DESTINO.
//
// Ao fim de cada execução o exportador publica, no MinIO, um JSON com a
// contagem de linhas por tabela em
//   <ibge>/_export/counts-<datahora>.json
//
// O importador (infra/clickhouse/importer, roda na VPS) lê TODOS esses JSONs sob
// <ibge>/_export/ e compara a contagem da origem com a contagem materializada no
// ClickHouse raw. Como exportador (Windows do cliente) e importador (VPS) só
// compartilham o MinIO, esse JSON é o canal de reconciliação. Cada execução grava
// um arquivo único (datado) — runs por schema (siscop/aise/apice) não se
// sobrescrevem; o importador faz merge por tabela.
//
// O formato é espelhado em
// infra/clickhouse/importer/internal/importer/counts.go (mesmo JSON).

// TableCount é a contagem de uma tabela exportada.
type TableCount struct {
	Source string `json:"source"` // schema.tabela de origem
	Schema string `json:"schema"` // schema físico (ex.: siscop)
	Table  string `json:"table"`  // tabela sem schema
	Key    string `json:"key"`    // path do objeto no MinIO
	Rows   int    `json:"rows"`
	Cols   int    `json:"cols"`
	Bytes  int    `json:"bytes"`
}

// ExportCounts é o artefato publicado por execução.
type ExportCounts struct {
	IBGE        string       `json:"ibge"`
	Ano         int          `json:"ano"`
	Schema      string       `json:"schema"`
	Bucket      string       `json:"bucket"`
	GeneratedAt string       `json:"generated_at"` // RFC3339
	Tables      []TableCount `json:"tables"`
}

// BuildExportCounts monta o artefato a partir do Result da execução. O schema
// físico de cada arquivo é derivado do FileResult.Source (schema.tabela) com
// fallback no schema do Result.
func BuildExportCounts(res *Result, generatedAt string) ExportCounts {
	ec := ExportCounts{
		IBGE:        res.Municipio,
		Ano:         res.Ano,
		Schema:      res.Schema,
		Bucket:      res.Bucket,
		GeneratedAt: generatedAt,
	}
	for _, fr := range res.Files {
		schema, table := splitSource(fr.Source, res.Schema)
		ec.Tables = append(ec.Tables, TableCount{
			Source: fr.Source, Schema: schema, Table: table, Key: fr.Key,
			Rows: fr.Rows, Cols: fr.Cols, Bytes: fr.Bytes,
		})
	}
	return ec
}

// splitSource separa "schema.tabela"; sem schema, usa o fallback.
func splitSource(source, fallback string) (schema, table string) {
	for i := 0; i < len(source); i++ {
		if source[i] == '.' {
			return source[:i], source[i+1:]
		}
	}
	return fallback, source
}
