package importer

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"sort"
	"strconv"
	"strings"
	"time"
)

// CH é um cliente HTTP mínimo do ClickHouse (sem driver nativo — só executa
// statements e lê escalares/TSV). Espelha o padrão do provision_municipio.py.
type CH struct {
	url    string
	user   string
	pass   string
	client *http.Client
}

// NewCH cria o cliente apontando p/ a interface HTTP do ClickHouse.
func NewCH(url, user, pass string) *CH {
	if !strings.HasSuffix(url, "/") {
		url += "/"
	}
	return &CH{url: url, user: user, pass: pass, client: &http.Client{Timeout: 30 * time.Minute}}
}

// exec roda um statement; retorna o corpo (vazio em DDL) ou erro com a 1ª linha
// da resposta do ClickHouse (mensagens de erro vêm no corpo).
func (c *CH) exec(ctx context.Context, sql string) (string, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, c.url, strings.NewReader(sql))
	if err != nil {
		return "", err
	}
	req.Header.Set("X-ClickHouse-User", c.user)
	req.Header.Set("X-ClickHouse-Key", c.pass)
	resp, err := c.client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("HTTP %d: %s", resp.StatusCode, firstLine(string(body)))
	}
	return string(body), nil
}

// execRetry tenta `tries` vezes (>=1) com backoff curto — erros de DDL do
// ClickHouse não são retentáveis, mas falhas transitórias de rede/timeout sim.
func (c *CH) execRetry(ctx context.Context, sql string, tries int) (string, error) {
	if tries < 1 {
		tries = 1
	}
	var lastErr error
	for i := 0; i < tries; i++ {
		if i > 0 {
			select {
			case <-ctx.Done():
				return "", ctx.Err()
			case <-time.After(time.Duration(i) * 2 * time.Second):
			}
		}
		out, err := c.exec(ctx, sql)
		if err == nil {
			return out, nil
		}
		lastErr = err
	}
	return "", lastErr
}

// Ping confirma conectividade (SELECT 1) — falha cedo e com mensagem clara.
func (c *CH) Ping(ctx context.Context) error {
	out, err := c.exec(ctx, "SELECT 1")
	if err != nil {
		return err
	}
	if strings.TrimSpace(out) != "1" {
		return fmt.Errorf("resposta inesperada de SELECT 1: %q", strings.TrimSpace(out))
	}
	return nil
}

// CreateDatabase garante o database raw_<ibge>.
func (c *CH) CreateDatabase(ctx context.Context, db string) error {
	_, err := c.exec(ctx, fmt.Sprintf("CREATE DATABASE IF NOT EXISTS `%s`", db))
	return err
}

// CountRows conta linhas de raw_<ibge>.<tbl> (verificação).
func (c *CH) CountRows(ctx context.Context, db, tbl string) (uint64, error) {
	out, err := c.exec(ctx, fmt.Sprintf("SELECT count() FROM `%s`.`%s`", db, tbl))
	if err != nil {
		return 0, err
	}
	return strconv.ParseUint(strings.TrimSpace(out), 10, 64)
}

// s3Expr monta a chamada s3(); structure vazia = inferência do Parquet.
func s3Expr(s3url, ak, sk, structure string) string {
	args := fmt.Sprintf("'%s', '%s', '%s', 'Parquet'", chEsc(s3url), chEsc(ak), chEsc(sk))
	if structure != "" {
		args += fmt.Sprintf(", '%s'", structure)
	}
	return "s3(" + args + ")"
}

// DescribeS3 retorna as colunas (nome, tipo) inferidas do Parquet, na ordem.
// Usado p/ aplicar overrides de tipo parciais (override de algumas colunas,
// inferência nas demais) — a `structure` do s3() exige TODAS as colunas.
func (c *CH) DescribeS3(ctx context.Context, s3url, ak, sk string) ([][2]string, error) {
	q := "DESCRIBE TABLE " + s3Expr(s3url, ak, sk, "") + " FORMAT TabSeparated"
	out, err := c.execRetry(ctx, q, 2)
	if err != nil {
		return nil, err
	}
	var cols [][2]string
	for _, line := range strings.Split(strings.TrimRight(out, "\n"), "\n") {
		if line == "" {
			continue
		}
		f := strings.Split(line, "\t")
		if len(f) < 2 {
			continue
		}
		cols = append(cols, [2]string{f[0], f[1]})
	}
	if len(cols) == 0 {
		return nil, fmt.Errorf("DESCRIBE não retornou colunas")
	}
	return cols, nil
}

// buildStructure aplica os overrides de tipo sobre as colunas inferidas e monta
// a `structure` completa do s3() (todas as colunas, na ordem da origem).
func buildStructure(inferred [][2]string, overrides map[string]string) string {
	parts := make([]string, len(inferred))
	for i, c := range inferred {
		typ := c[1]
		if ov, ok := overrides[c[0]]; ok {
			typ = ov
		}
		parts[i] = fmt.Sprintf("`%s` %s", c[0], typ)
	}
	return strings.Join(parts, ", ")
}

// CreateRawTable cria raw_<ibge>.<tbl> a partir do Parquet no MinIO via s3().
// Sem overrides: inferência pura (idêntico ao import_raw.sh). Com overrides:
// DESCRIBE + structure completa (cast no read). Sempre DROP antes (reload idempotente).
func (c *CH) CreateRawTable(ctx context.Context, db, tbl, s3url, ak, sk string, overrides map[string]string, tries int) error {
	if _, err := c.execRetry(ctx, fmt.Sprintf("DROP TABLE IF EXISTS `%s`.`%s` SYNC", db, tbl), tries); err != nil {
		return err
	}
	structure := ""
	if len(overrides) > 0 {
		inferred, err := c.DescribeS3(ctx, s3url, ak, sk)
		if err != nil {
			return fmt.Errorf("describe p/ overrides: %w", err)
		}
		if err := validateOverrides(inferred, overrides); err != nil {
			return err
		}
		structure = buildStructure(inferred, overrides)
	}
	create := fmt.Sprintf("CREATE TABLE `%s`.`%s` ENGINE=MergeTree ORDER BY tuple() AS SELECT * FROM %s",
		db, tbl, s3Expr(s3url, ak, sk, structure))
	_, err := c.execRetry(ctx, create, tries)
	return err
}

// validateOverrides garante que toda coluna de `types` existe no Parquet —
// um override órfão (nome de coluna errado) seria silenciosamente ignorado.
func validateOverrides(inferred [][2]string, overrides map[string]string) error {
	have := make(map[string]bool, len(inferred))
	for _, c := range inferred {
		have[c[0]] = true
	}
	var orphans []string
	for col := range overrides {
		if !have[col] {
			orphans = append(orphans, col)
		}
	}
	if len(orphans) > 0 {
		sort.Strings(orphans)
		return fmt.Errorf("override de tipo p/ coluna(s) inexistente(s) no Parquet: %s", strings.Join(orphans, ", "))
	}
	return nil
}

// chEsc escapa uma string p/ literal SQL do ClickHouse (\ e ').
func chEsc(s string) string {
	s = strings.ReplaceAll(s, `\`, `\\`)
	return strings.ReplaceAll(s, `'`, `\'`)
}

func firstLine(s string) string {
	s = strings.TrimSpace(s)
	if i := strings.IndexByte(s, '\n'); i >= 0 {
		s = s[:i]
	}
	if len(s) > 200 {
		s = s[:200]
	}
	return s
}
