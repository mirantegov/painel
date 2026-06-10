package importer

import (
	"context"
	"fmt"
	"io"
	"log"
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

// s3Expr monta a chamada s3() com inferência de schema do Parquet.
func s3Expr(s3url, ak, sk string) string {
	return fmt.Sprintf("s3('%s', '%s', '%s', 'Parquet')", chEsc(s3url), chEsc(ak), chEsc(sk))
}

// DescribeS3 retorna os nomes de coluna inferidos do Parquet. Usado p/ só
// aplicar `REPLACE` nas colunas de `types:` que de fato existem no arquivo
// (versões do ERP variam; coluna ausente daria erro no CREATE).
func (c *CH) DescribeS3(ctx context.Context, s3url, ak, sk string) (map[string]bool, error) {
	q := "DESCRIBE TABLE " + s3Expr(s3url, ak, sk) + " FORMAT TabSeparated"
	out, err := c.execRetry(ctx, q, 2)
	if err != nil {
		return nil, err
	}
	cols := map[string]bool{}
	for _, line := range strings.Split(strings.TrimRight(out, "\n"), "\n") {
		if line == "" {
			continue
		}
		if f := strings.SplitN(line, "\t", 2); len(f) >= 1 && f[0] != "" {
			cols[f[0]] = true
		}
	}
	if len(cols) == 0 {
		return nil, fmt.Errorf("DESCRIBE não retornou colunas")
	}
	return cols, nil
}

// CreateRawTable cria raw_<ibge>.<tbl> a partir do Parquet no MinIO via s3().
//
// Sem `types`: inferência pura (`CREATE … AS SELECT * FROM s3(...)`).
//
// Com `types`: o exportador grava numeric/date/timestamp como STRING no Parquet
// (texto lossless), então a inferência os mantém String. Aqui re-tipamos essas
// colunas com `SELECT * REPLACE(<castOrNull> AS col)` — mantendo a inferência
// nas demais. Os casts são `*OrNull` (valor sujo vira NULL, não derruba a tabela).
// Sempre DROP antes (reload idempotente).
func (c *CH) CreateRawTable(ctx context.Context, db, tbl, s3url, ak, sk string, types map[string]string, tries int) error {
	if _, err := c.execRetry(ctx, fmt.Sprintf("DROP TABLE IF EXISTS `%s`.`%s` SYNC", db, tbl), tries); err != nil {
		return err
	}
	replace := ""
	if len(types) > 0 {
		have, err := c.DescribeS3(ctx, s3url, ak, sk)
		if err != nil {
			return fmt.Errorf("describe p/ tipos: %w", err)
		}
		var parts []string
		for _, col := range sortedKeys(types) {
			if !have[col] {
				log.Printf("aviso: %s.%s: coluna %q do manifest ausente no Parquet — REPLACE ignorado", db, tbl, col)
				continue
			}
			parts = append(parts, fmt.Sprintf("%s AS `%s`", castExpr(col, types[col]), col))
		}
		if len(parts) > 0 {
			replace = " REPLACE (" + strings.Join(parts, ", ") + ")"
		}
	}
	create := fmt.Sprintf("CREATE TABLE `%s`.`%s` ENGINE=MergeTree ORDER BY tuple() AS SELECT *%s FROM %s",
		db, tbl, replace, s3Expr(s3url, ak, sk))
	_, err := c.execRetry(ctx, create, tries)
	return err
}

// castExpr devolve a expressão de cast `*OrNull` p/ tipar uma coluna String do
// Parquet no tipo-alvo do manifest (derivado do DDL da origem). Valor sujo/
// incompatível vira NULL (não derruba a tabela).
//
// Decimal/Int e demais usam accurateCastOrNull (preserva a precisão EXATA do DDL
// — ex.: Decimal(15,2), não a classe Decimal64 — e aceita tanto String quanto
// numérico). Datas/timestamps usam parsers dedicados: accurateCast falha no
// timestamp RFC3339 ("...Z") que o exportador grava.
func castExpr(col, chType string) string {
	q := "`" + col + "`"
	switch {
	case chType == "Date32":
		return fmt.Sprintf("toDate32OrNull(%s)", q)
	case chType == "Date":
		return fmt.Sprintf("toDateOrNull(%s)", q)
	case strings.HasPrefix(chType, "DateTime64("):
		return fmt.Sprintf("parseDateTime64BestEffortOrNull(%s, %d)", q, dt64Prec(chType))
	case chType == "DateTime":
		return fmt.Sprintf("parseDateTimeBestEffortOrNull(%s)", q)
	default:
		return fmt.Sprintf("accurateCastOrNull(%s, '%s')", q, chEsc(chType))
	}
}

// dt64Prec extrai a precisão de "DateTime64(N)" (default 6).
func dt64Prec(chType string) int {
	inside := chType[strings.IndexByte(chType, '(')+1 : strings.IndexByte(chType, ')')]
	if n, err := strconv.Atoi(strings.TrimSpace(inside)); err == nil && n >= 0 && n <= 9 {
		return n
	}
	return 6
}

func sortedKeys(m map[string]string) []string {
	ks := make([]string, 0, len(m))
	for k := range m {
		ks = append(ks, k)
	}
	sort.Strings(ks)
	return ks
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
