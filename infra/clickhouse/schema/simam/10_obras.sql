-- MÓDULO DE OBRAS PÚBLICAS — 17 tabelas (simam)

-- LOCALIDADE ANTERIOR
CREATE TABLE IF NOT EXISTS simam.AssociacaoLocalidadeAnterior
(
    idPessoa UInt32,
    cdLocalidade UInt32,
    cdBem String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdLocalidade, cdBem);

-- INTERVENÇÃO ANTERIOR
CREATE TABLE IF NOT EXISTS simam.AssociacaoIntervencaoAnterior
(
    idPessoa UInt32,
    cdLocalidade UInt32,
    cdIntervencao String,
    nrAnoIntervencao Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdLocalidade, cdIntervencao);

-- INTERVENÇÃO
CREATE TABLE IF NOT EXISTS simam.Intervencao
(
    idPessoa UInt32,
    cdIntervencao UInt32,
    nrAnoIntervencao Nullable(UInt32),
    idTipoIntervencao UInt32,
    idClassificacaoIntervencao UInt32,
    nmIntervencao String,
    idTipoObra UInt32,
    idClassificacaoObra UInt32,
    dsObjeto String,
    nrMedida String,
    idUnidadeMedidaIntervencao UInt32,
    vlIntervencao Decimal(18,2),
    dtBaseValorIntervencao Date32,
    nrPrazoExecucao UInt32,
    dtInicio Date32,
    idTipoRegimeIntervencao UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdIntervencao, idTipoIntervencao);

-- PLANILHA DE ORÇAMENTO
CREATE TABLE IF NOT EXISTS simam.PlanilhaOrcamento
(
    idPessoa UInt32,
    cdIntervencao UInt32,
    nrAnoIntervencao UInt32,
    tpDocumento Nullable(UInt16),
    valoresResponsavelOrcamento UInt32,
    nrDocumento String,
    cdControleLeiAtoTotal UInt32,
    dtBase Date32,
    idTipoPlanilhaOrcamento UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdIntervencao, nrAnoIntervencao);

-- PLANILHA DE ORÇAMENTO DE CONTRATO
CREATE TABLE IF NOT EXISTS simam.PlanilhaExecucaoIndiretaContrato
(
    idPessoa UInt32,
    cdIntervencao UInt32,
    nrAnoIntervencao Nullable(UInt32),
    tpDocumentoResponsavelOrcamento UInt16,
    nrDocumentoResponsavelOrcamento String,
    cdControleLeiAto UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdIntervencao, tpDocumentoResponsavelOrcamento);

-- PLANILHA DE ORÇAMENTO DE ADITIVO DE CONTRATO
CREATE TABLE IF NOT EXISTS simam.PlanilhaExecucaoIndiretaAditivo
(
    idPessoa UInt32,
    cdIntervencao UInt32,
    nrAnoIntervencao Nullable(UInt32),
    tpDocumentoResponsavelOrcamento UInt16,
    nrDocumentoResponsavelOrcamento String,
    cdControleLeiAto UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    nrAditivoContrato UInt32,
    nrAnoAditivoContrato UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdIntervencao, tpDocumentoResponsavelOrcamento);

-- MATRÍCULA DE OBRA NO INSS
CREATE TABLE IF NOT EXISTS simam.MatriculaINSS
(
    idPessoa UInt32,
    cdIntervencao UInt32,
    nrAnoIntervencao Nullable(UInt32),
    nrMatriculaCEI UInt64,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdIntervencao, nrMatriculaCEI);

-- CND DE OBRA
CREATE TABLE IF NOT EXISTS simam.CNDObra
(
    idPessoa UInt32,
    cdIntervencao UInt32,
    nrAnoIntervencao Nullable(UInt32),
    nrMatriculaCEI UInt64,
    nrCND UInt64,
    nrOperacaossaoidade UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdIntervencao, nrMatriculaCEI);

-- CANCELAMENTO DE MATRÍCULA DE OBRA NO INSS
CREATE TABLE IF NOT EXISTS simam.CancelamentoMatriculaINSS
(
    idPessoa UInt32,
    cdIntervencao UInt32,
    nrAnoIntervencao UInt32,
    nrMatriculaCEI UInt64,
    dtCancelamento Date32,
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdIntervencao, nrAnoIntervencao);

-- ACOMPANHAMENTO
CREATE TABLE IF NOT EXISTS simam.Acompanhamento
(
    idPessoa UInt32,
    cdIntervencao UInt32,
    nrAnoIntervencao Nullable(UInt32),
    idOrigemAcompanhamento UInt32,
    nrAcompanhamento UInt32,
    dtAcompanhamento Date32,
    idTipoAcompanhamento UInt32,
    tpDocumentoRes UInt16,
    ponsavelAcompanhamento Nullable(UInt32),
    nrDocumentoRes Nullable(String),
    ponsavelAcompanhamento_2 String,
    dsObservacao Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdIntervencao, idOrigemAcompanhamento);

-- MEDIÇÃO
CREATE TABLE IF NOT EXISTS simam.Medicao
(
    idPessoa UInt32,
    cdIntervencao UInt32,
    nrAnoIntervencao Nullable(UInt32),
    idOrigemAcompanhamento UInt32,
    nrAcompanhamento UInt32,
    idTipoMedicao UInt32,
    nrPercentualFisicoMedicao String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdIntervencao, idOrigemAcompanhamento);

-- EXECUÇÃO INDIRETA - CONTRATO
CREATE TABLE IF NOT EXISTS simam.ExecucaoIndiretaContrato
(
    idPessoa UInt32,
    cdIntervencao UInt32,
    nrAnoIntervencao Nullable(UInt32),
    idOrigemAcompanhamento UInt32,
    nrAcompanhamento UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdIntervencao, idOrigemAcompanhamento);

-- PARALISAÇÃO
CREATE TABLE IF NOT EXISTS simam.Paralisacao
(
    idPessoa UInt32,
    cdIntervencao UInt32,
    nrAnoIntervencao Nullable(UInt32),
    idOrigemAcompanhamento UInt32,
    nrAcompanhamento UInt32,
    idMotivoParalisacao UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdIntervencao, idOrigemAcompanhamento);

-- DOCUMENTOS DE ACOMPANHAMENTO
CREATE TABLE IF NOT EXISTS simam.DocumentoAcompanhamento
(
    idPessoa UInt32,
    cdIntervencao UInt32,
    nrAnoIntervencao Nullable(UInt32),
    idOrigemAcompanhamto UInt32,
    nrAcompanhamento UInt32,
    cdControleLeiAto UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdIntervencao, idOrigemAcompanhamto);

-- INTERVENÇÃO X AÇÃO DO PLANEJAMENTO
CREATE TABLE IF NOT EXISTS simam.AcaoXIntervencao
(
    idPessoa UInt32,
    idOrigemAcao UInt32,
    cdAcao String,
    cdControleLeiAtoAcao UInt32,
    cdIntervencao UInt32,
    nrAnoIntervencao Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idOrigemAcao, cdAcao);

-- VINCULAÇÃO DOS EMPENHOS COM AS OBRAS PÚBLICAS
CREATE TABLE IF NOT EXISTS simam.EmpenhoXIntervencao
(
    idPessoa UInt32,
    nrEmpenho UInt64,
    nrAnoEmpenho UInt32,
    idOrigemEmpenho UInt32,
    cdIntervencao UInt32,
    nrAnoIntervencao UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEmpenho, nrAnoEmpenho);

-- VINCULAÇÃO DOS GASTOS ESTATAIS COM AS OBRAS PÚBLICAS
CREATE TABLE IF NOT EXISTS simam.GastoEstatalXIntervencao
(
    idPessoa UInt32,
    nrDetalhe UInt32,
    nrAnoDetalhe UInt32,
    cdIntervencao UInt32,
    nrAnoIntervencao UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrDetalhe, nrAnoDetalhe);

