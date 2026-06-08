package exporter

import (
	"fmt"
	"os"
	"regexp"

	"gopkg.in/yaml.v3"
)

// Manifest descreve o que exportar (raw) pro MinIO. Editável pelo usuário.
type Manifest struct {
	Bucket string  `yaml:"bucket"`
	Tables []Table `yaml:"tables"`
}

// Table é uma tabela de origem a dumpar fielmente (sem transformação).
type Table struct {
	// Source = "[schema.]tabela". Sem schema, resolve pelo Scope.
	Source string `yaml:"source"`
	// Scope: "global" (schema public) ou "tenant" (schema mun_<ibge>).
	Scope string `yaml:"scope"`
	// Columns: subconjunto de campos; vazio = todas (raw fiel).
	Columns []string `yaml:"columns,omitempty"`
	// PartitionByAno: filtra WHERE ano=$ano e particiona em ano=<ano>/.
	PartitionByAno bool `yaml:"partition_by_ano,omitempty"`
}

// Gate de sanidade p/ identificadores (a segurança real é pgx.Identifier.Sanitize).
// Permissivo p/ nomes de ERP (maiúsculas, dígitos, _ e $).
var identRe = regexp.MustCompile(`^[A-Za-z_][A-Za-z0-9_$]*$`)

// LoadManifest lê e valida o YAML do manifest.
func LoadManifest(path string) (*Manifest, error) {
	b, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("lendo manifest %s: %w", path, err)
	}
	var m Manifest
	if err := yaml.Unmarshal(b, &m); err != nil {
		return nil, fmt.Errorf("parse manifest: %w", err)
	}
	if m.Bucket == "" {
		return nil, fmt.Errorf("manifest: campo 'bucket' obrigatório")
	}
	if len(m.Tables) == 0 {
		return nil, fmt.Errorf("manifest: nenhuma tabela em 'tables'")
	}
	for i := range m.Tables {
		t := &m.Tables[i]
		if t.Scope != "global" && t.Scope != "tenant" {
			return nil, fmt.Errorf("manifest: tabela %q tem scope inválido %q (use global|tenant)", t.Source, t.Scope)
		}
		schema, table := t.split()
		if schema != "" && !identRe.MatchString(schema) {
			return nil, fmt.Errorf("manifest: schema inválido em %q", t.Source)
		}
		if !identRe.MatchString(table) {
			return nil, fmt.Errorf("manifest: tabela inválida em %q", t.Source)
		}
		for _, c := range t.Columns {
			if !identRe.MatchString(c) {
				return nil, fmt.Errorf("manifest: coluna inválida %q em %q", c, t.Source)
			}
		}
	}
	return &m, nil
}

// split separa "schema.tabela" → (schema, tabela). Sem ponto, schema="".
func (t Table) split() (schema, table string) {
	for i := 0; i < len(t.Source); i++ {
		if t.Source[i] == '.' {
			return t.Source[:i], t.Source[i+1:]
		}
	}
	return "", t.Source
}

// TableName é o nome puro da tabela (sem schema), usado no path do MinIO.
func (t Table) TableName() string {
	_, table := t.split()
	return table
}
