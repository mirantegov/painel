-- MÓDULO CONTROLE INTERNO — 5 tabelas (raw)

CREATE TABLE IF NOT EXISTS simam_raw.HodometroHorimetro
(
    idPessoa Nullable(String),
    cdBem Nullable(String),
    nrSequencialHodoHori Nullable(String),
    nrMes Nullable(String),
    nrAno Nullable(String),
    idTipoMedidor Nullable(String),
    nrMedicaoInicial Nullable(String),
    nrMedicaoFinal Nullable(String),
    dsNotaExplicativa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ConsumoCombustivel
(
    idPessoa Nullable(String),
    nrSequencialConsumo Nullable(String),
    cdBem Nullable(String),
    idTipoCategoriaObjetoDespesa Nullable(String),
    idTipoObjetoDespesa Nullable(String),
    nrMesConsumo Nullable(String),
    nrAnoConsumo Nullable(String),
    nrQuantidade Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoConsumoCombustivel
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrMesEstorno Nullable(String),
    nrSequencialConsumo Nullable(String),
    dsMotivo Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EntradaExtraCombustivel
(
    nrCPF Nullable(String),
    nrQuantidade Nullable(String),
    cdControleLeiAto Nullable(String),
    nrConvenioOrigem Nullable(String),
    nrAnoConvenioOrigem Nullable(String),
    dsObjetoConvenioOrigem Nullable(String),
    dsNotaExplicativa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.SaidaExtraCombustivel
(
    idPessoa Nullable(String),
    idTipoCategoriaObjetoDespesa Nullable(String),
    idTipoObjetoDespesa Nullable(String),
    idTipoSaidaCombustivelSaida Nullable(String),
    flEntidadeRecebedor Nullable(String),
    tpDocRecebedor Nullable(String),
    nrDocRecebedor Nullable(String),
    nrCPF Nullable(String),
    nrQuantidade Nullable(String),
    cdControleLeiAto Nullable(String),
    nrConvenioOrigem Nullable(String),
    nrAnoConvenioOrigem Nullable(String),
    dsObjetoConvenioOrigem Nullable(String),
    dsNotaExplicativa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

