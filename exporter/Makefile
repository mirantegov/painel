# Build do exportador. Sem cgo → cross-compile limpo.
# Uso: make windows | linux | mac | dist | build | clean
BINARY := exporter
DIST   := dist
GOFLAGS := -trimpath
LDFLAGS := -s -w

.PHONY: build windows linux mac dist clean

# binário para o host atual
build:
	go build $(GOFLAGS) -ldflags "$(LDFLAGS)" -o $(BINARY) .

# binário para o cliente (Windows 64-bit) → dist/exporter-windows-amd64.exe
windows:
	CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build $(GOFLAGS) -ldflags "$(LDFLAGS)" -o $(DIST)/$(BINARY)-windows-amd64.exe .

linux:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build $(GOFLAGS) -ldflags "$(LDFLAGS)" -o $(DIST)/$(BINARY)-linux-amd64 .

mac:
	CGO_ENABLED=0 GOOS=darwin GOARCH=arm64 go build $(GOFLAGS) -ldflags "$(LDFLAGS)" -o $(DIST)/$(BINARY)-darwin-arm64 .

# todos os alvos de distribuição
dist: windows linux mac
	@ls -lh $(DIST)

clean:
	rm -rf $(DIST) $(BINARY) inspect
