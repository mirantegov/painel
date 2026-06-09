-- MÓDULO TRIBUTÁRIO — 4 tabelas (simam)

-- ARRECADAÇÃO POR TIPO DE CRÉDITO
CREATE TABLE IF NOT EXISTS simam.ArrecadacaoCredito
(
    idPessoa UInt32,
    nrArrecadacao UInt32,
    nrAnoArrecadacao UInt32,
    idTipoOrigemReceita UInt32,
    nrCredito Nullable(UInt32),
    nrAnoCredito Nullable(UInt32),
    nrDivida Nullable(UInt32),
    nrAnoDivida Nullable(UInt32),
    idTipoArrecadacao UInt32,
    nrMes String,
    nrAno String,
    vlArrecadacao Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrArrecadacao, nrAnoArrecadacao);

-- ESTORNO DA ARRECADAÇÃO POR TIPO DE CRÉDITO
CREATE TABLE IF NOT EXISTS simam.EstornoArrecadacaoCredito
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrArrecadacao UInt32,
    nrAnoArrecadacao UInt32,
    nrMes UInt32,
    nrAno UInt32,
    vlEstorno Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- DIÁRIO GERAL DE ARRECADAÇÃO
CREATE TABLE IF NOT EXISTS simam.DiarioArrecadacao
(
    idPessoa UInt32,
    nrArrecadacao UInt32,
    nrAnoArrecadacao UInt32,
    cdCategoriaEconomica String,
    cdOrigem String,
    cdEspecie String,
    cdDesdobramentoD1 String,
    cdDesdobramentoDD2 String,
    cdDesdobramentoD3 String,
    cdTipoNaturezaReceita String,
    cdNivel8 String,
    cdNivel9 String,
    cdNivel10 String,
    cdNivel11 String,
    cdNivel12 String,
    nrAnoAplicacao UInt32,
    idTipoOperacaoReceita String,
    idTipoOrigemReceita UInt32,
    nrOperacao Nullable(UInt64),
    nrAnoOperacao Nullable(UInt32),
    tpDocContribuinte Nullable(UInt32),
    nrDocContribuinte Nullable(String),
    idTipoArrecadacao UInt32,
    dtArrecadacao Date32,
    vlArrecadacao Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrArrecadacao, nrAnoArrecadacao);

-- ESTORNO DE RECEITA DO DIÁRIO GERAL DE ARRECADAÇÃO
CREATE TABLE IF NOT EXISTS simam.EstornoDiarioArrecadacao
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrArrecadacao UInt32,
    nrAnoArrecadacao UInt32,
    dtEstorno Date32,
    vlOperacao Decimal(18,2),
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

