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
-- Em todos os ERPs (Elotech eloweb, Betha, IPM, etc.) o path do MinIO usa
-- a tabela do destino RAW (camelCase do leiaute SIM-AM) -- a origem
-- ERP-específica é apenas dimensão. O _fonte registra de qual ERP veio.
-- ---------------------------------------------------------------------

-- 1) INGESTÃO: lê o Parquet do MinIO direto para a tabela RAW (tudo String).
--    Use a função s3() apontando para o endpoint do MinIO.
INSERT INTO raw_4117107.Empenho
SELECT
    toString(idPessoa)        AS idPessoa,
    toString(nrEmpenho)       AS nrEmpenho,
    toString(nrAnoEmpenho)    AS nrAnoEmpenho,
    toString(idOrigemEmpenho) AS idOrigemEmpenho,
    '4117107'                 AS _id_entidade,
    '2026'                    AS _exercicio,
    '0'                       AS _competencia,
    'eloweb'                  AS _fonte,
    'siscop/empenho.parquet'  AS _arquivo,
    now()                     AS _ingerido_em
FROM s3(
    'http://mirante-minio:9000/mirante-parquet/4117107/siscop/empenho.parquet',
    'minioadmin', '<secret>', 'Parquet'
);

-- 2) ETL: transforma RAW -> CANÔNICO (cast de tipos do layout SIM-AM),
--    deduplicando por ReplacingMergeTree na carga.
INSERT INTO sim_4117107.Empenho
SELECT
    toUInt32OrZero(idPessoa)        AS idPessoa,
    toUInt32OrZero(nrEmpenho)       AS nrEmpenho,
    toUInt32OrZero(nrAnoEmpenho)    AS nrAnoEmpenho,
    toUInt32OrZero(idOrigemEmpenho) AS idOrigemEmpenhopenho,
    toUInt32OrZero(_id_entidade)    AS _id_entidade,
    toUInt16OrZero(_exercicio)      AS _exercicio,
    toUInt8OrZero(_competencia)     AS _competencia,
    _fonte,
    now()                           AS _ingerido_em
FROM raw_4117107.Empenho
WHERE _id_entidade = '4117107' AND _exercicio = '2026';

-- 3) Consulta canônica (já tipada, pronta para o ETL de marts/Postgres).
-- SELECT count(), sum(...) FROM sim_4117107.Empenho WHERE _exercicio = 2026;
