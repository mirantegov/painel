-- MÓDULO TRIBUTÁRIO — 4 tabelas (raw)

CREATE TABLE IF NOT EXISTS simam_raw.ArrecadacaoCredito
(
    idPessoa Nullable(String),
    nrArrecadacao Nullable(String),
    nrAnoArrecadacao Nullable(String),
    idTipoOrigemReceita Nullable(String),
    nrCredito Nullable(String),
    nrAnoCredito Nullable(String),
    nrDivida Nullable(String),
    nrAnoDivida Nullable(String),
    idTipoArrecadacao Nullable(String),
    nrMes Nullable(String),
    nrAno Nullable(String),
    vlArrecadacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoArrecadacaoCredito
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrArrecadacao Nullable(String),
    nrAnoArrecadacao Nullable(String),
    nrMes Nullable(String),
    nrAno Nullable(String),
    vlEstorno Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.DiarioArrecadacao
(
    idPessoa Nullable(String),
    nrArrecadacao Nullable(String),
    nrAnoArrecadacao Nullable(String),
    cdCategoriaEconomica Nullable(String),
    cdOrigem Nullable(String),
    cdEspecie Nullable(String),
    cdDesdobramentoD1 Nullable(String),
    cdDesdobramentoDD2 Nullable(String),
    cdDesdobramentoD3 Nullable(String),
    cdTipoNaturezaReceita Nullable(String),
    cdNivel8 Nullable(String),
    cdNivel9 Nullable(String),
    cdNivel10 Nullable(String),
    cdNivel11 Nullable(String),
    cdNivel12 Nullable(String),
    nrAnoAplicacao Nullable(String),
    idTipoOperacaoReceita Nullable(String),
    idTipoOrigemReceita Nullable(String),
    nrOperacao Nullable(String),
    nrAnoOperacao Nullable(String),
    tpDocContribuinte Nullable(String),
    nrDocContribuinte Nullable(String),
    idTipoArrecadacao Nullable(String),
    dtArrecadacao Nullable(String),
    vlArrecadacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoDiarioArrecadacao
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrArrecadacao Nullable(String),
    nrAnoArrecadacao Nullable(String),
    dtEstorno Nullable(String),
    vlOperacao Nullable(String),
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

