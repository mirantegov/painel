-- =====================================================================
-- PIPELINE CANÔNICO SIM-AM   MinIO -> simam_raw -> (ETL) -> simam
-- =====================================================================
-- Este arquivo é um TEMPLATE de referência (não roda no init). Mostra o
-- padrão de ingestão e transformação para UMA tabela (Empenho). Replicar
-- por tabela conforme as bases de origem forem mapeadas.
--
-- MinIO já roda em mirante-minio (host 9000). Para o ClickHouse enxergar o
-- MinIO, ambos precisam estar na mesma rede docker (infra_default) OU usar
-- o host gateway. Credenciais demo: minioadmin / <secret>.
--
-- Convenção de buckets/paths (exportador Go -> Parquet):
--   s3://mirante/<base>/<entidade>/<exercicio>/<Tabela>.parquet
-- ---------------------------------------------------------------------

-- 1) INGESTÃO: lê o Parquet do MinIO direto para a tabela RAW (tudo String).
--    Use a função s3() apontando para o endpoint do MinIO.
INSERT INTO simam_raw.Empenho
SELECT
    toString(idPessoa)        AS idPessoa,
    toString(nrEmpenho)       AS nrEmpenho,
    toString(nrAnoEmpenho)    AS nrAnoEmpenho,
    toString(idOrigemEmpenho) AS idOrigemEmpenho,
    '4117107'                 AS _id_entidade,
    '2026'                    AS _exercicio,
    '0'                       AS _competencia,
    'eloweb'                  AS _fonte,
    'Empenho.parquet'         AS _arquivo,
    now()                     AS _ingerido_em
FROM s3(
    'http://mirante-minio:9000/mirante/eloweb/4117107/2026/Empenho.parquet',
    'minioadmin', '<secret>', 'Parquet'
);

-- 2) ETL: transforma RAW -> CANÔNICO (cast de tipos do layout SIM-AM),
--    deduplicando por ReplacingMergeTree na carga.
INSERT INTO simam.Empenho
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
FROM simam_raw.Empenho
WHERE _id_entidade = '4117107' AND _exercicio = '2026';

-- 3) Consulta canônica (já tipada, pronta para o ETL de marts/Postgres).
-- SELECT count(), sum(...) FROM simam.Empenho WHERE _exercicio = 2026;
