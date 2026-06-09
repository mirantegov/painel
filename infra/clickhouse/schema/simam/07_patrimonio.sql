-- MÓDULO PATRIMÔNIO — 8 tabelas (simam)

-- CADASTRO DE BENS PATRIMONIAIS
CREATE TABLE IF NOT EXISTS simam.Bem
(
    idPessoa UInt32,
    cdBem String,
    dsBem String,
    idTipoPropriedadeBem UInt32,
    idTipoNaturezaBem UInt32,
    idTipoCategoriaBem UInt32,
    idTipo UInt32,
    idTipoUtilizacao Nullable(UInt32),
    comumBem Nullable(UInt32),
    dtOperacao Date32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdBem, dsBem);

-- DETALHE DOS BENS PATRIMONIAIS
CREATE TABLE IF NOT EXISTS simam.DetalheBem
(
    idPessoa UInt32,
    nrOperacao UInt32,
    nrAnoOperacao UInt32,
    cdBemrQuantidadedUnidadeedida String,
    flAdquiridoAnte2024 String,
    flIncorporacao String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrOperacao, nrAnoOperacao);

-- ESTORNO DO DETALHE DOS BENS PATRIMONIAIS
CREATE TABLE IF NOT EXISTS simam.EstornoDetalheBem
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrOperacao UInt32,
    nrAnoOperacao UInt32,
    dtEstorno Date32,
    nrQuantidade String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- MOVIMENTAÇÃO DOS BENS PATRIMONIAIS
CREATE TABLE IF NOT EXISTS simam.MovimentacaoBem
(
    idPessoa UInt32,
    nrLancamento UInt64,
    nrAnoLancamento UInt32,
    cdBem String,
    idTipoOperacaoBem UInt32,
    dtOperacao Date32,
    vlOperacao Decimal(18,2),
    flLeiAto String,
    cdControleeiAto Nullable(UInt32),
    nrLiquidacao Nullable(UInt32),
    nrAnoLiquidaca Nullable(UInt32),
    idOrigemiquidacao Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLancamento, nrAnoLancamento);

-- ESTORNO DO MOVIMENTO DOS BENS PATRIMONIAIS
CREATE TABLE IF NOT EXISTS simam.EstornoMovimentacaoBem
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrLancamento UInt64,
    nrAnoLancamento UInt32,
    dtEstorno Date32,
    vlEstorno Decimal(18,2),
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- DETALHE DE VEÍCULOS E EQUIPAMENTOS
CREATE TABLE IF NOT EXISTS simam.VeiculoEquipamento
(
    idPessoa UInt32,
    cdBem String,
    nrAnoFabricacao UInt32,
    idTipoCategoriaObjetoDespesa UInt32,
    idTipoObjetoDespesa UInt32,
    cdModeloFIPE String,
    nrPlaca Nullable(String),
    nrRenavam Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdBem, nrAnoFabricacao);

-- COORDENADAS GEOGRÁFICAS
CREATE TABLE IF NOT EXISTS simam.CoordenadaGeografica
(
    idPessoa UInt32,
    nrGrauSul UInt32,
    nrMinutoSul UInt32,
    nrSegundoSul String,
    nrGrauOeste UInt32,
    nrMinutoOeste UInt32,
    nrSegundoOeste String,
    cdBem String,
    dtMedicao Date32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrGrauSul, nrMinutoSul);

-- LOCALIZAÇÃO DOS BENS IMÓVEIS
CREATE TABLE IF NOT EXISTS simam.LocalizacaoImovel
(
    idPessoa UInt32,
    cdBem String,
    dtLocalizacao Date32,
    nmLogradouro String,
    nrLogradouro String,
    dsComplemento Nullable(String),
    nmBairro String,
    nrCEP UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdBem, nmLogradouro);

