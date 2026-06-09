# Armazém canônico SIM-AM no ClickHouse — Épico 5

> Estado em 2026-06-08. Formato canônico (SIM-AM 2026/TCE-PR) para o qual todas
> as bases de origem convergem. Base do pipeline `MinIO → raw → ETL → tratado`.

## O que foi entregue

Infra e schema em `infra/clickhouse/`:

- **Docker** (`docker-compose.yml`): ClickHouse 25.3, dados em volume `./data`,
  config em `./config` (`config.d` + `users.d`). HTTP `:8123`, nativo `:9100`
  (9000 é do MinIO `mirante-minio`). Senha `default/simam`.
- **Schema canônico** (`schema/simam/`): **224 tabelas** do layout SIM-AM,
  tipadas (Date32/Decimal/UInt/String), engine `ReplacingMergeTree`, com colunas
  de proveniência `_id_entidade/_exercicio/_competencia/_fonte/_ingerido_em`.
- **Schema raw** (`schema/raw/`): **224 tabelas** de landing (tudo String) p/
  ingestão do MinIO.
- **Tabelas de domínio** (`schema/seeds/`): **115 lookups**, sendo **106
  populadas** (~2,5 mil linhas) com os dados do próprio layout (Banco,
  FontePadraoSTN, TipoDocumento, Escopo, Modalidade…).
- **ETL template** (`schema/etl/README-pipeline.sql`): exemplo MinIO→raw→simam
  para a tabela Empenho (função `s3()` + `INSERT … SELECT` com cast).

Validado: **224/224 + 224/224 + 115/115 statements, 0 falhas** aplicados no
ClickHouse rodando.

## Como foi gerado (determinístico, reexecutável)

PDF do layout (848 págs) → `pdftotext -layout` → parser → JSON → gerador DDL:

1. `tools/parse_layout.py` — extrai `TABELA:`/`Nome do Arquivo:` + campos.
   Extração **column-aware** (offset derivado dos dados, não do cabeçalho, que o
   `pdftotext` desalinha) com remontagem de nomes truncados por quebra de coluna.
2. `tools/gen_ddl.py` — mapeia tipo SIM-AM (PIC Cobol) → ClickHouse, agrupa por
   módulo, gera `simam` + `raw` + `seeds`.
3. `tools/apply_batches.py` — aplica em lotes de 10, reporta falhas sem abortar.

## Pendências / próximos passos

- **Qualidade fina dos nomes** (~0,1%): glitches residuais de remontagem
  (ex.: `idOrigemEmpenhopenho`). Corrigir pontualmente em `tables.json` e
  regerar, ou validar campo-a-campo contra o PDF nos módulos críticos
  (Contábil/Empenho/Receita).
- **Chaves de ordenação**: hoje `ORDER BY (_id_entidade,_exercicio,_competencia,
  +até 3 campos obrig)`. Refinar PK por tabela conforme as regras de unicidade
  do layout (REGRAS DE IMPORTAÇÃO descrevem os conjuntos únicos).
- **ETL real**: ligar o exportador Go (Épico 4, eloweb→Parquet→MinIO) às tabelas
  `simam_raw` e materializar os `INSERT … SELECT` raw→simam por tabela.
- **Sync simam → Postgres** (Épico 5 design em `docs/clickhouse-epico5-design.md`):
  espelhar os marts tratados para o Postgres que serve o painel.
- **Tipos consistentes entre tabelas**: um mesmo campo (ex.: `cdPrograma`) pode
  ter tipo diferente entre tabelas (origem no PDF). Reconciliar via dicionário
  global de campos se necessário.

## Comandos

```bash
cd infra/clickhouse && docker compose up -d
# regenerar tudo do PDF: ver infra/clickhouse/README.md
```
