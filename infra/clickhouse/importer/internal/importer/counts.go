package importer

// Formato de contagens — artefato de reconciliação ORIGEM × DESTINO.
//
// O exportador (roda no Windows do cliente) publica, ao fim de cada execução,
// um JSON com a contagem de linhas por tabela em
//   <ibge>/_export/counts-<datahora>.json
// no MinIO. O importador (roda na VPS) lê TODOS esses JSONs sob <ibge>/_export/
// e compara a contagem da origem com a contagem materializada no ClickHouse raw.
//
// Como exportador e importador rodam em máquinas diferentes e só compartilham o
// MinIO, esse JSON é o canal de reconciliação. Cada execução grava um arquivo
// único (datado) — runs por schema (siscop/aise/apice) não se sobrescrevem; a
// reconciliação faz merge por tabela mantendo o `generated_at` mais recente.
//
// Este struct é espelhado em exporter/internal/exporter/counts.go (mesmo
// formato JSON). Os dois módulos Go são independentes; o contrato é o JSON.

// TableCount é a contagem de uma tabela exportada (lado origem).
type TableCount struct {
	Source string `json:"source"` // schema.tabela de origem (ex.: siscop.empenho)
	Schema string `json:"schema"` // schema físico (ex.: siscop)
	Table  string `json:"table"`  // tabela sem schema (ex.: empenho)
	Key    string `json:"key"`    // path do objeto no MinIO
	Rows   int    `json:"rows"`
	Cols   int    `json:"cols"`
	Bytes  int    `json:"bytes"`
}

// RawTable é o nome esperado no ClickHouse raw_<ibge> (<schema>_<tabela>),
// chave de cruzamento com o importador.
func (tc TableCount) RawTable() string { return tc.Schema + "_" + tc.Table }

// ExportCounts é o artefato publicado por execução do exportador.
type ExportCounts struct {
	IBGE        string       `json:"ibge"`
	Ano         int          `json:"ano"`
	Schema      string       `json:"schema"`
	Bucket      string       `json:"bucket"`
	GeneratedAt string       `json:"generated_at"` // RFC3339
	Tables      []TableCount `json:"tables"`
}
