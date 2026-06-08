package exporter

import (
	"bytes"
	"context"
	"fmt"
	"net/url"
	"strings"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

// Sink envia objetos Parquet pro MinIO (S3).
type Sink struct {
	client *minio.Client
	bucket string
}

// NewSink cria o cliente MinIO e garante o bucket.
func NewSink(ctx context.Context, endpoint, accessKey, secretKey, bucket string) (*Sink, error) {
	// endpoint pode vir com esquema (http://host:9000); minio-go quer host:port + secure.
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

	exists, err := client.BucketExists(ctx, bucket)
	if err != nil {
		return nil, fmt.Errorf("checando bucket %q: %w", bucket, err)
	}
	if !exists {
		if err := client.MakeBucket(ctx, bucket, minio.MakeBucketOptions{}); err != nil {
			return nil, fmt.Errorf("criando bucket %q: %w", bucket, err)
		}
	}
	return &Sink{client: client, bucket: bucket}, nil
}

// Put sobe os bytes Parquet no objeto key (sobrescreve — idempotente).
func (s *Sink) Put(ctx context.Context, key string, data []byte) error {
	_, err := s.client.PutObject(ctx, s.bucket, key, bytes.NewReader(data), int64(len(data)),
		minio.PutObjectOptions{ContentType: "application/vnd.apache.parquet"})
	if err != nil {
		return fmt.Errorf("upload %s: %w", key, err)
	}
	return nil
}
