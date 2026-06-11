# Extração agendada (cron) — ERP Elotech → MinIO, por cliente

Wrapper Linux/cron do exportador (equivalente ao `run.bat` do Windows). Roda os 3
manifests Elotech (`siscop`, `aise`, `apice`) para **um cliente**, com os parâmetros
dele, e é seguro para colocar no `crontab`.

> O exportador roda na máquina que tem acesso ao **Postgres do ERP** do cliente
> (normalmente local). É **raw, sem transformação** — a canonicalização é no ClickHouse.
> Detalhes do exportador: [`../README.md`](../README.md) · operação manual: [`../../docs/runbook-exportador.md`](../../docs/runbook-exportador.md).

## Estrutura

```
exporter/cron/
  export-cliente.sh        # engine (recebe <ibge>, roda smoke + 3 manifests)
  crontab.example          # uma linha por cliente
  clientes/
    <ibge>.conf            # versionado: entidades, janela de anos, manifests (SEM segredo)
    <ibge>.secret.env      # gitignored: DATABASE_URL do ERP + chaves MinIO
    _TEMPLATE.conf
    _TEMPLATE.secret.env
  log/                     # logs por execução (gitignored)
```

**"Um por cliente"** = um par `<ibge>.conf` + `<ibge>.secret.env`. O engine é único e
reusável; cada cliente é uma linha no crontab chamando `export-cliente.sh <ibge>`.

### Clientes (IBGE oficial — API IBGE/UF 41)

| IBGE | Município | | IBGE | Município |
|---|---|---|---|---|
| 4117107 | Nova Londrina | | 4118808 | Peabiru |
| 4126256 | Sarandi | | 4106555 | Corumbataí do Sul |
| 4117909 | Palotina | | 4103909 | Campina da Lagoa |
| 4113007 | Jussara | | 4104808 | Cascavel |
| 4107108 | Diamante do Norte | | 4127700 | Toledo |
| 4123709 | Santa Isabel do Ivaí | | | |
| 4121000 | Querência do Norte | | | |
| 4100905 | Amaporã | | | |

> ⚠️ **`ENTIDADES` em cada `.conf` está com default `"1, 2, 3"` — CONFIRMAR** no ERP de
> cada cliente (query do [runbook §2](../../docs/runbook-exportador.md)) antes de ligar no cron.
> Os `.secret.env` (DATABASE_URL do ERP + chaves MinIO) ainda precisam ser preenchidos por cliente.

## Adicionar um cliente

```bash
cd exporter/cron/clientes
cp _TEMPLATE.conf        4117909.conf          # ajuste IBGE, ENTIDADES, anos
cp _TEMPLATE.secret.env  4117909.secret.env    # DATABASE_URL do ERP + chaves MinIO
chmod 600 4117909.secret.env
```
Descubra as `ENTIDADES` do município com a query do [runbook §2](../../docs/runbook-exportador.md).
Depois habilite a linha do cliente no `crontab.example`.

## Rodar manualmente

```bash
# binário (uma vez): make -C exporter build   (ou: make -C exporter linux)
exporter/cron/export-cliente.sh 4117107 --smoke-only   # valida conexão + upload
exporter/cron/export-cliente.sh 4117107                # smoke + siscop + aise + apice
exporter/cron/export-cliente.sh 4117107 --no-smoke --manifests=siscop   # só contábil
```

## Agendar (cron)

```bash
crontab -e   # cole/edite as linhas de crontab.example, uma por cliente
```
- O engine tem **lock por cliente** (`flock`): se a execução anterior ainda roda, a nova sai sem duplicar.
- A **janela de anos auto-rola** (`ANOS_BACK`/`LIC_START` + ano atual) — não precisa editar a cada virada de ano.
- Idempotente: o path no MinIO é determinístico, re-run sobrescreve.
- `EXPORTER_BIN=/caminho/exporter` sobrescreve a resolução do binário.

## Saída e monitoramento

- `exporter/cron/log/cron_<ibge>_<ts>.log` — log do engine (início/fim, status por manifest).
- `exporter/log/export_<ibge>_<ts>.log` + `.json` — log e contagens do próprio exportador.
- Contagens publicadas no MinIO em `<ibge>/_export/counts-<ts>.json` → o importador reconcilia.
- Exit code: `0` OK, `1` alguma falha, `2` erro de configuração.
