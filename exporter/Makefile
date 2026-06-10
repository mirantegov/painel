# Build do exportador. Sem cgo → cross-compile limpo.
# Uso: make windows | linux | mac | dist | package | build | clean
#      make manifests-check | manifests-gen   (DUMP=tmp/eloweb.dump)
BINARY := exporter
DIST   := dist
PKG    := $(DIST)/exporter-win
GOFLAGS := -trimpath
LDFLAGS := -s -w
DUMP   ?= ../tmp/eloweb.dump

.PHONY: build windows linux mac dist package manifests-check manifests-gen clean

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

# pacote do cliente (Windows): exe + inspect + os 3 manifests + smoke + run.bat
# + runbook → dist/exporter-win.zip. Reprodutível (não montar zip à mão).
package: windows
	CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build $(GOFLAGS) -ldflags "$(LDFLAGS)" -o $(DIST)/inspect-windows-amd64.exe ./cmd/inspect
	rm -rf $(PKG) && mkdir -p $(PKG)
	cp $(DIST)/$(BINARY)-windows-amd64.exe $(PKG)/
	cp $(DIST)/inspect-windows-amd64.exe $(PKG)/
	cp run.bat $(PKG)/
	cp ../docs/runbook-exportador.md $(PKG)/RUNBOOK.md
	cp manifests/export-smoke.yaml $(PKG)/
	cp manifests/elotech-eloweb.yaml manifests/elotech-aise.yaml manifests/elotech-apice.yaml $(PKG)/
	cd $(DIST) && rm -f exporter-win.zip && zip -rq exporter-win.zip exporter-win
	@echo "--- pacote: $(DIST)/exporter-win.zip ---" && unzip -l $(DIST)/exporter-win.zip

# Confere os manifests contra os DDLs (exclude bytea + filtros). Sai 1 se drift.
manifests-check:
	python3 tools/gen_manifests.py --dump $(DUMP) --check

# (Re)gera os blocos scope/exclude_columns/filters dos manifests a partir do dump.
manifests-gen:
	python3 tools/gen_manifests.py --dump $(DUMP) --write

clean:
	rm -rf $(DIST) $(BINARY) inspect
