# exporter/tools

## gen_manifests.py — gera/confere filtros e exclude_columns dos manifests

Reproduz, a partir dos **DDLs reais** do ERP (saída de `pg_dump`), as decisões que
antes eram feitas à mão nos manifests `manifests/elotech-*.yaml`:

- **`exclude_columns`** — colunas `bytea` (blobs) que **não** exportamos (só pesam o
  dump). Derivado para **todos** os schemas.
- **`filters`** — recorte `entidade` [+ ano]. Derivado **apenas** onde a coluna
  EXISTE (filtro com coluna inexistente aborta o run do exportador).

Preserva o cabeçalho, os comentários e a **lista de tabelas** de cada manifest —
só reescreve o bloco de propriedades de cada entrada. Não inventa nem remove
tabelas (apenas avisa se uma `source` não for tabela-base no dump, ex.: view).

### Política por schema (`POLICY` no topo do script)

| Schema | Filtro | Por quê |
|---|---|---|
| `siscop` | `keep`   | filtros curados à mão (ex.: `siscop.exercicio` não filtra ano) |
| `aise`   | `none`   | Tributos + RH: dump full (recorte fica no ETL) |
| `apice`  | `derive` | licitações/contratos: `entidade` + `exercicio` (piso de ano via `--var`) |

`exclude_columns` (bytea) é sempre derivado, independente da política.

Ano primário ao derivar: `anocompetencia` → `exercicio` → `exerciciopagamento` → `exerciciobloqueto`.

### Uso

O dump é gitignored — informe o caminho com `--dump` (ou `DUMP=` no make):

```bash
# confere (CI): mostra diff e sai 1 se houver drift
make manifests-check DUMP=../tmp/eloweb.dump
# ou: python3 tools/gen_manifests.py --dump ../tmp/eloweb.dump --check

# aplica nos manifests
make manifests-gen DUMP=../tmp/eloweb.dump
# ou: python3 tools/gen_manifests.py --dump ../tmp/eloweb.dump --write
```

Para mudar uma regra (ex.: voltar a filtrar o `aise`), edite `POLICY` no script e
rode `manifests-gen`. Rodar `--check` no estado correto não acusa diferença.
