# Build do importador raw (MinIO -> ClickHouse raw_<ibge>). Sem cgo.
# Uso: make build | linux | mac | test | manifests-gen | manifests-check | clean
BINARY := importer
DIST   := dist
GOFLAGS := -trimpath
LDFLAGS := -s -w

# DUMP: DDL da origem (pg_dump texto, gitignored) p/ derivar os tipos do manifest.
DUMP ?= ../../../tmp/eloweb.dump

.PHONY: build linux mac test vet fmt manifests-gen manifests-check clean

# binário para o host atual
build:
	go build $(GOFLAGS) -ldflags "$(LDFLAGS)" -o $(BINARY) .

# binário para a VPS (Linux 64-bit) — onde o importador roda
linux:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build $(GOFLAGS) -ldflags "$(LDFLAGS)" -o $(DIST)/$(BINARY)-linux-amd64 .

mac:
	CGO_ENABLED=0 GOOS=darwin GOARCH=arm64 go build $(GOFLAGS) -ldflags "$(LDFLAGS)" -o $(DIST)/$(BINARY)-darwin-arm64 .

test:
	go test ./...

vet:
	go vet ./...

fmt:
	gofmt -l .

# (Re)gera o import manifest: conjunto dos manifests do exportador + tipos do DDL.
manifests-gen:
	go run ./cmd/genmanifest --write --dump $(DUMP)

# Confere o CONJUNTO de tabelas contra os manifests do exportador (ignora tipos,
# que dependem do dump gitignored). Sai 1 se drift. Usado no CI.
manifests-check:
	go run ./cmd/genmanifest --check

clean:
	rm -rf $(DIST) $(BINARY)
