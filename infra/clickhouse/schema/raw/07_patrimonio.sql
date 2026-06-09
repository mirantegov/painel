-- MÓDULO PATRIMÔNIO — 8 tabelas (raw)

CREATE TABLE IF NOT EXISTS simam_raw.Bem
(
    idPessoa Nullable(String),
    cdBem Nullable(String),
    dsBem Nullable(String),
    idTipoPropriedadeBem Nullable(String),
    idTipoNaturezaBem Nullable(String),
    idTipoCategoriaBem Nullable(String),
    idTipo Nullable(String),
    idTipoUtilizacao Nullable(String),
    comumBem Nullable(String),
    dtOperacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.DetalheBem
(
    idPessoa Nullable(String),
    nrOperacao Nullable(String),
    nrAnoOperacao Nullable(String),
    cdBemrQuantidadedUnidadeedida Nullable(String),
    flAdquiridoAnte2024 Nullable(String),
    flIncorporacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoDetalheBem
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrOperacao Nullable(String),
    nrAnoOperacao Nullable(String),
    dtEstorno Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.MovimentacaoBem
(
    idPessoa Nullable(String),
    nrLancamento Nullable(String),
    nrAnoLancamento Nullable(String),
    cdBem Nullable(String),
    idTipoOperacaoBem Nullable(String),
    dtOperacao Nullable(String),
    vlOperacao Nullable(String),
    flLeiAto Nullable(String),
    cdControleeiAto Nullable(String),
    nrLiquidacao Nullable(String),
    nrAnoLiquidaca Nullable(String),
    idOrigemiquidacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoMovimentacaoBem
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrLancamento Nullable(String),
    nrAnoLancamento Nullable(String),
    dtEstorno Nullable(String),
    vlEstorno Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.VeiculoEquipamento
(
    idPessoa Nullable(String),
    cdBem Nullable(String),
    nrAnoFabricacao Nullable(String),
    idTipoCategoriaObjetoDespesa Nullable(String),
    idTipoObjetoDespesa Nullable(String),
    cdModeloFIPE Nullable(String),
    nrPlaca Nullable(String),
    nrRenavam Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.CoordenadaGeografica
(
    idPessoa Nullable(String),
    nrGrauSul Nullable(String),
    nrMinutoSul Nullable(String),
    nrSegundoSul Nullable(String),
    nrGrauOeste Nullable(String),
    nrMinutoOeste Nullable(String),
    nrSegundoOeste Nullable(String),
    cdBem Nullable(String),
    dtMedicao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.LocalizacaoImovel
(
    idPessoa Nullable(String),
    cdBem Nullable(String),
    dtLocalizacao Nullable(String),
    nmLogradouro Nullable(String),
    nrLogradouro Nullable(String),
    dsComplemento Nullable(String),
    nmBairro Nullable(String),
    nrCEP Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

