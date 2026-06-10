package importer

import (
	"context"
	"encoding/json"
	"fmt"
	"net/url"
	"strings"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

// MinIO lista e lê objetos do bucket (para descobrir Parquets e ler as
// contagens publicadas pelo exportador). Espelha o Sink do exportador.
type MinIO struct {
	client *minio.Client
	bucket string
}

// NewMinIO cria o cliente p/ LISTAR/LER o bucket (endpoint acessível ao importador).
func NewMinIO(endpoint, accessKey, secretKey, bucket string) (*MinIO, error) {
	secure := strings.HasPrefix(endpoint, "https://")
	host := endpoint
	if u, err := url.Parse(endpoint); err == nil && u.Host != "" {
		host = u.Host
	}
	client, err := minio.New(host, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: secure,
	})
	if err != nil {
		return nil, fmt.Errorf("cliente MinIO: %w", err)
	}
	return &MinIO{client: client, bucket: bucket}, nil
}

// Object é um objeto listado (key relativa a <ibge>/ + tamanho).
type Object struct {
	Rel  string // path relativo a <ibge>/ (ex.: siscop/empenho.parquet)
	Size int64
}

// ListParquet lista os Parquets sob <ibge>/, ignorando o prefixo de controle
// <ibge>/_export/ (onde ficam as contagens). Retorna paths relativos a <ibge>/.
func (m *MinIO) ListParquet(ctx context.Context, ibge string) ([]Object, error) {
	prefix := ibge + "/"
	var objs []Object
	for o := range m.client.ListObjects(ctx, m.bucket, minio.ListObjectsOptions{Prefix: prefix, Recursive: true}) {
		if o.Err != nil {
			return nil, fmt.Errorf("listando %s: %w", prefix, o.Err)
		}
		rel := strings.TrimPrefix(o.Key, prefix)
		if strings.HasPrefix(rel, "_export/") || !strings.HasSuffix(rel, ".parquet") {
			continue
		}
		objs = append(objs, Object{Rel: rel, Size: o.Size})
	}
	return objs, nil
}

// LoadExportCounts lê e faz merge de TODOS os JSONs sob <ibge>/_export/. Como
// cada execução do exportador (siscop/aise/apice) grava um arquivo datado, o
// merge mantém, por raw_table, a entrada com o generated_at mais recente.
func (m *MinIO) LoadExportCounts(ctx context.Context, ibge string) (map[string]TableCount, error) {
	prefix := ibge + "/_export/"
	merged := map[string]TableCount{}
	latest := map[string]string{} // raw_table -> generated_at vencedor
	for o := range m.client.ListObjects(ctx, m.bucket, minio.ListObjectsOptions{Prefix: prefix, Recursive: true}) {
		if o.Err != nil {
			return nil, fmt.Errorf("listando %s: %w", prefix, o.Err)
		}
		if !strings.HasSuffix(o.Key, ".json") {
			continue
		}
		var ec ExportCounts
		if err := m.getJSON(ctx, o.Key, &ec); err != nil {
			return nil, fmt.Errorf("lendo %s: %w", o.Key, err)
		}
		for _, tc := range ec.Tables {
			rt := tc.RawTable()
			if cur, ok := latest[rt]; ok && cur > ec.GeneratedAt {
				continue // já temos uma contagem mais recente p/ esta tabela
			}
			latest[rt] = ec.GeneratedAt
			merged[rt] = tc
		}
	}
	return merged, nil
}

func (m *MinIO) getJSON(ctx context.Context, key string, v any) error {
	obj, err := m.client.GetObject(ctx, m.bucket, key, minio.GetObjectOptions{})
	if err != nil {
		return err
	}
	defer obj.Close()
	return json.NewDecoder(obj).Decode(v)
}
