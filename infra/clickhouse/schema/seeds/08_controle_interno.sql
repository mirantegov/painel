-- MÓDULO CONTROLE INTERNO — 1 tabelas (seeds)

-- TIPOS DE MEDIDORES DE VEÍCULOS E EQUIPAMENTOS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoMedidor
(
    idTipoMedidor Int64,
    dsTipoMedidor String
)
ENGINE = MergeTree
ORDER BY idTipoMedidor;
INSERT INTO simam.TipoMedidor (idTipoMedidor, dsTipoMedidor) VALUES
(1, 'Hodômetro'),
(2, 'Horímetro'),
(3, 'Não usa Hodômetro/Horímetro CONSUMO DE COMBUSTÍVEL DE VEÍCULOS PRÓPRIOS E DE TERCEIROS');

