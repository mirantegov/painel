-- MÓDULO CONTROLE INTERNO — 5 tabelas (simam)

-- TERCEIRO
CREATE TABLE IF NOT EXISTS simam.HodometroHorimetro
(
    idPessoa UInt32,
    cdBem String,
    nrSequencialHodoHori String,
    nrMes UInt32,
    nrAno UInt32,
    idTipoMedidor UInt32,
    nrMedicaoInicial String,
    nrMedicaoFinal String,
    dsNotaExplicativa Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdBem, nrSequencialHodoHori);

-- CONSUMO DE COMBUSTÍVEL DE VEÍCULOS PRÓPRIOS E DE TERCEIROS
CREATE TABLE IF NOT EXISTS simam.ConsumoCombustivel
(
    idPessoa UInt32,
    nrSequencialConsumo UInt32,
    cdBem String,
    idTipoCategoriaObjetoDespesa UInt32,
    idTipoObjetoDespesa UInt32,
    nrMesConsumo UInt32,
    nrAnoConsumo UInt32,
    nrQuantidade String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrSequencialConsumo, cdBem);

-- TERCEIROS
CREATE TABLE IF NOT EXISTS simam.EstornoConsumoCombustivel
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrMesEstorno UInt32,
    nrSequencialConsumo UInt32,
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- ENTRADAS EXTRAORÇAMENTÁRIAS DE COMBUSTÍVEIS
CREATE TABLE IF NOT EXISTS simam.EntradaExtraCombustivel
(
    nrCPF String,
    nrQuantidade String,
    cdControleLeiAto UInt32,
    nrConvenioOrigem Nullable(UInt32),
    nrAnoConvenioOrigem Nullable(UInt32),
    dsObjetoConvenioOrigem Nullable(String),
    dsNotaExplicativa Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, nrCPF, nrQuantidade, cdControleLeiAto);

-- SAIDAS EXTRAORÇAMENTÁRIAS DE COMBUSTÍVEIS
CREATE TABLE IF NOT EXISTS simam.SaidaExtraCombustivel
(
    idPessoa UInt32,
    idTipoCategoriaObjetoDespesa UInt32,
    idTipoObjetoDespesa UInt32,
    idTipoSaidaCombustivelSaida UInt32,
    flEntidadeRecebedor Nullable(String),
    tpDocRecebedor Nullable(UInt32),
    nrDocRecebedor Nullable(String),
    nrCPF String,
    nrQuantidade String,
    cdControleLeiAto Nullable(UInt32),
    nrConvenioOrigem Nullable(UInt32),
    nrAnoConvenioOrigem Nullable(UInt32),
    dsObjetoConvenioOrigem Nullable(String),
    dsNotaExplicativa Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idTipoCategoriaObjetoDespesa, idTipoObjetoDespesa);

