-- =====================================================================
-- PIPELINE CANÔNICO SIM-AM   MinIO -> raw_<ibge> -> (ETL) -> sim_<ibge>
-- =====================================================================
-- Este arquivo é um TEMPLATE de referência (não roda no init). Mostra o
-- padrão de ingestão e transformação para UMA tabela (Empenho). Replicar
-- por tabela conforme as bases de origem forem mapeadas.
--
-- MULTI-TENANT por IBGE: cada município tem seus próprios databases
--   sim_<ibge>      (canônico)   e   raw_<ibge>  (landing).
-- Provisionar com: bash scripts/provision-cliente.sh <ibge>
-- O exemplo abaixo usa <ibge>=4117107 (raw_4117107 / sim_4117107).
--
-- MinIO já roda em mirante-minio (host 9000). Para o ClickHouse enxergar o
-- MinIO, ambos precisam estar na mesma rede docker (rede `mirante` no
-- compose de produção) OU usar o host gateway. Credenciais demo:
-- minioadmin / <secret>.
--
-- Convenção canônica de buckets/paths (Épico 6.0 do plano consolidado,
-- alinhada ao exportador Go em exporter/README.md):
--
--   bucket: mirante-parquet
--   path:  s3://mirante-parquet/<ibge>/<schema>/<tabela>.parquet
--          (ou <ibge>/<schema>/<tabela>/ano=<ano>/<tabela>.parquet se partition_by_ano)
--   TUDO sob o município (<ibge>/) -- não há _global/; referência também por IBGE.
--   (schema físico no path evita colisão entre schemas homônimos, ex.: aise.entidade vs siscop.entidade)
--
-- O MinIO guarda a tabela da ORIGEM (ex.: siscop/empenho.parquet). O RAW no
-- ClickHouse ESPELHA a origem: raw_<ibge>.<schema>_<tabela>
-- (ex.: raw_4117107.siscop_empenho), com o schema INFERIDO do Parquet.
-- O prefixo <schema>_ evita colisão (aise_entidade vs siscop_entidade).
-- A canonicalização p/ o leiaute SIM-AM acontece no ETL (passo 2).
-- ---------------------------------------------------------------------

-- 1) INGESTÃO (automatizada — NÃO roda neste arquivo):
--      cd infra/clickhouse/importer && make build && ./importer --ibge <ibge>
--      (importador Go, manifest-driven; sucessor do antigo tools/import_raw.sh)
--    Cria 1 tabela por Parquet via s3() + inferência:
--      raw_<ibge>.siscop_empenho, raw_<ibge>.siscop_fornecedor, ...
--    Estrutura idêntica à origem Eloweb (colunas Nullable, tipos do Parquet).
--    Conta as linhas e reconcilia contra <ibge>/_export/counts-*.json. Ver
--    infra/clickhouse/importer/README.md.

-- 2) ETL: transforma a ORIGEM (raw_<ibge>.siscop_*) -> CANÔNICO SIM-AM (sim_<ibge>.*).
--    O mapeamento de colunas é ERP-específico (Elotech siscop -> SIM-AM);
--    ver docs/epico5-elotech-queries.md. Exemplo ILUSTRATIVO (colunas reais
--    conforme o leiaute siscop):
INSERT INTO sim_4117107.Empenho
SELECT
    toUInt32OrZero(entidade)   AS idEntidade,
    toUInt32OrZero(empenho)    AS nrEmpenho,
    toUInt16OrZero(exercicio)  AS nrAnoEmpenho,
    -- ... demais colunas mapeadas do siscop p/ o SIM-AM
    'eloweb'                   AS _fonte,
    now()                      AS _ingerido_em
FROM raw_4117107.siscop_empenho;

-- 3) Consulta canônica (já tipada, pronta para o sync de marts -> Postgres).
-- SELECT count() FROM sim_4117107.Empenho;
