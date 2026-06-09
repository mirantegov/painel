-- Databases do armazém canônico SIM-AM.
--   simam_raw : landing bruto vindo do MinIO (Parquet/CSV das bases de origem).
--   simam     : dados tratados no formato canônico do layout SIM-AM (TCE-PR).
CREATE DATABASE IF NOT EXISTS simam_raw;
CREATE DATABASE IF NOT EXISTS simam;
