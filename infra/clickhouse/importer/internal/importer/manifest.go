package importer

import (
	"fmt"
	"os"
	"regexp"
	"strings"

	"gopkg.in/yaml.v3"
)

// ImportManifest descreve as tabelas RAW esperadas no MinIO (conjunto-contrato).
// Gerado por inferência a partir dos manifests do exportador (ver cmd/genmanifest).
// O importador usa este conjunto p/ detectar tabela faltando/sobrando contra a
// realidade do MinIO, e p/ fixar tipos onde a inferência do ClickHouse erra.
type ImportManifest struct {
	Bucket string        `yaml:"bucket"`
	Tables []ImportTable `yaml:"tables"`
}

// ImportTable é uma tabela raw esperada.
type ImportTable struct {
	// RawTable: nome final em raw_<ibge> (ex.: siscop_empenho).
	RawTable string `yaml:"raw_table"`
	// Object: path do Parquet relativo a <ibge>/ no MinIO (ex.: siscop/empenho.parquet).
	Object string `yaml:"object"`
	// Defer: difere a criação p/ o fim (tabelas pesadas não bloqueiam as rápidas).
	Defer bool `yaml:"defer,omitempty"`
	// Types: override de tipo por coluna (ex.: vlempenho: "Decimal(18,2)").
	// Vazio = inferência pura. Com valores, o importador faz DESCRIBE do Parquet,
	// aplica os overrides e cria a tabela com a estrutura completa (cast no read).
	Types map[string]string `yaml:"types,omitempty"`
}

// identRe valida identificadores (mesmo gate do exportador): permissivo p/ nomes
// de ERP (maiúsculas, dígitos, _ e $). A segurança real é o backtick no DDL.
var identRe = regexp.MustCompile(`^[A-Za-z_][A-Za-z0-9_$]*$`)

// objectRe valida o path do objeto: segmentos ident separados por "/", terminando
// em ".parquet". Ex.: siscop/empenho.parquet. (Sem "..", sem barra inicial.)
var objectRe = regexp.MustCompile(`^[A-Za-z0-9_$]+(/[A-Za-z0-9_$=.]+)*\.parquet$`)

// typeRe valida um tipo ClickHouse de override: letras/dígitos + parênteses,
// vírgulas e espaços (ex.: "Decimal(18,2)", "Nullable(String)", "DateTime64(3)").
var typeRe = regexp.MustCompile(`^[A-Za-z0-9_, ()']+$`)

// LoadManifest lê e valida o YAML do import manifest.
func LoadManifest(path string) (*ImportManifest, error) {
	b, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("lendo manifest %s: %w", path, err)
	}
	var m ImportManifest
	if err := yaml.Unmarshal(b, &m); err != nil {
		return nil, fmt.Errorf("parse manifest: %w", err)
	}
	if m.Bucket == "" {
		return nil, fmt.Errorf("manifest: campo 'bucket' obrigatório")
	}
	if len(m.Tables) == 0 {
		return nil, fmt.Errorf("manifest: nenhuma tabela em 'tables'")
	}
	seen := make(map[string]bool, len(m.Tables))
	for i := range m.Tables {
		t := &m.Tables[i]
		if !identRe.MatchString(t.RawTable) {
			return nil, fmt.Errorf("manifest: raw_table inválido %q", t.RawTable)
		}
		if seen[t.RawTable] {
			return nil, fmt.Errorf("manifest: raw_table duplicado %q", t.RawTable)
		}
		seen[t.RawTable] = true
		if !objectRe.MatchString(t.Object) || strings.Contains(t.Object, "..") {
			return nil, fmt.Errorf("manifest: object inválido %q (em %q)", t.Object, t.RawTable)
		}
		for col, typ := range t.Types {
			if !identRe.MatchString(col) {
				return nil, fmt.Errorf("manifest: coluna de type inválida %q em %q", col, t.RawTable)
			}
			if !typeRe.MatchString(typ) {
				return nil, fmt.Errorf("manifest: tipo inválido %q (coluna %q em %q)", typ, col, t.RawTable)
			}
		}
	}
	return &m, nil
}
