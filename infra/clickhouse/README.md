# ClickHouse — Armazém canônico SIM-AM (TCE-PR)

Formato **canônico** para o qual todas as bases de origem (eloweb, etc.) são
convertidas, espelhando o layout **SIM-AM 2026** do Tribunal de Contas do Paraná.

```
MinIO (Parquet)  ->  simam_raw (landing, tudo String)  ->  ETL  ->  simam (tratado, tipado)
```

> **Deploy multi-tenant por IBGE (produção).** `simam`/`simam_raw` aqui são o **template** do schema. Em produção, cada município ganha **`raw_<ibge>`** (landing) e **`sim_<ibge>`** (canônico), criados por `bash scripts/provision-cliente.sh <ibge>` (tool `tools/provision_municipio.py`, substitui os nomes). O **RAW espelha a origem** (Eloweb): o importador Go [`importer/`](importer/README.md) (`./importer --ibge <ibge>`, sucessor do `import_raw.sh`) cria `raw_<ibge>.<schema>_<tabela>` (ex.: `siscop_empenho`, `aise_rhfichafinanceira`, `apice_cllicitacao`) por inferência do Parquet — manifest-driven, com contagem de linhas e reconciliação contra a origem. Estado: Nova Londrina (4117107) provisionada, RAW siscop importado. Próximo: ETL `raw_<ibge>.*` → `sim_<ibge>.*`. Ver [`docs/HANDOFF-vps-deploy-2026-06-09.md`](../../docs/HANDOFF-vps-deploy-2026-06-09.md).

## Subir

```bash
cd infra/clickhouse
docker compose up -d          # HTTP :8123 · nativo :9100 (9000 é do MinIO)
```

Credenciais: usuário `default` / senha `simam` (em `config/users.d/default.xml`).
Dados persistem em `./data` (volume bind, gitignored). Config em `./config`.

Cliente:
```bash
curl -s localhost:8123/ -H 'X-ClickHouse-User: default' -H 'X-ClickHouse-Key: simam' \
  --data 'SELECT count() FROM system.tables WHERE database=\'simam\''
# ou: docker exec -it simam_clickhouse clickhouse-client --password simam
```

## Bancos de dados

| Database    | Conteúdo                                                      |
|-------------|--------------------------------------------------------------|
| `simam`     | **224 tabelas canônicas** (layout SIM-AM, tipadas) + **115 tabelas de domínio** com dados |
| `simam_raw` | **224 tabelas de landing** (todas as colunas `Nullable(String)`) para ingestão do MinIO |

Tabelas canônicas têm colunas de proveniência (multi-base):
`_id_entidade`, `_exercicio`, `_competencia`, `_fonte`, `_ingerido_em`.
Engine `ReplacingMergeTree(_ingerido_em)`.

As **tabelas de domínio** (lookups: `Banco`, `FontePadraoSTN`, `TipoDocumento`,
`Escopo`, `ModalidadeLicitacao`, …) já vêm **populadas** com os dados do próprio
layout (~2,5 mil linhas, 106 tabelas).

## Schema

- `schema/00_databases.sql` — cria `simam` e `simam_raw`.
- `schema/simam/NN_<modulo>.sql` — DDL canônico, agrupado por módulo SIM-AM.
- `schema/raw/NN_<modulo>.sql` — DDL de landing (mesmo conjunto, tudo String).
- `schema/seeds/NN_<modulo>.sql` — tabelas de domínio + `INSERT` dos dados.
- `schema/etl/README-pipeline.sql` — template MinIO→raw→simam (1 tabela de exemplo).

Módulos: cadastrais, planejamento, contábil, tesouraria, licitações, contratos,
patrimônio, controle interno, tributário, obras.

## Regenerar a partir do PDF

O schema é **derivado** do PDF do layout (`Layout SIMAM 2026 …pdf`):

```bash
pdftotext -layout "<layout>.pdf" tmp/simam-layout.txt
python3 tools/parse_layout.py tmp/simam-layout.txt > tools/tables.json   # PDF txt -> estrutura
python3 tools/gen_ddl.py                                                  # estrutura -> DDL/seeds
python3 tools/apply_batches.py schema/simam                              # aplica (lotes de 10)
python3 tools/apply_batches.py schema/raw
python3 tools/apply_batches.py schema/seeds
```

`tools/apply_batches.py` envia cada statement isolado, em lotes de 10, e reporta
falhas sem abortar. Estado atual: **224/224 canônicas, 224/224 raw, 115/115
domínio — 0 falhas**.

## Limitações conhecidas (extração do PDF)

A extração via `pdftotext` é fiel em ~99,9%, mas restam glitches pontuais
(nomes de campo de um PDF de 848 páginas):

- Raros nomes com sufixo duplicado por remontagem de coluna
  (ex.: `idOrigemEmpenhopenho` deveria ser `idOrigemEmpenho`).
- Uma descrição de domínio pode conter o título da seção seguinte vazado.
- Tipos de campos sem `Formato` no PDF são **inferidos pelo prefixo**
  (`dt`→Date, `vl`→Decimal, `id`→UInt32, `cd/nr/nm/ds`→String).

O `parse_layout.py` **loga** (stderr) os tokens camelCase descartados por não
terem prefixo SIM-AM conhecido — assim nenhum campo some em silêncio. Tokens que
forem campos reais (ex.: `subItem`/`subTitulo` truncados) devem entrar em
`tools/overrides.json`.

Correções pontuais: adicionar a tabela em `tools/overrides.json` (lista de
campos curada, aplicada por `gen_ddl.py`) ou editar `tools/tables.json` e regerar.
O parser é determinístico e reexecutável.
