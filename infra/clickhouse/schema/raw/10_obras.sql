-- MÓDULO DE OBRAS PÚBLICAS — 17 tabelas (raw)

CREATE TABLE IF NOT EXISTS simam_raw.AssociacaoLocalidadeAnterior
(
    idPessoa Nullable(String),
    cdLocalidade Nullable(String),
    cdBem Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AssociacaoIntervencaoAnterior
(
    idPessoa Nullable(String),
    cdLocalidade Nullable(String),
    cdIntervencao Nullable(String),
    nrAnoIntervencao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.Intervencao
(
    idPessoa Nullable(String),
    cdIntervencao Nullable(String),
    nrAnoIntervencao Nullable(String),
    idTipoIntervencao Nullable(String),
    idClassificacaoIntervencao Nullable(String),
    nmIntervencao Nullable(String),
    idTipoObra Nullable(String),
    idClassificacaoObra Nullable(String),
    dsObjeto Nullable(String),
    nrMedida Nullable(String),
    idUnidadeMedidaIntervencao Nullable(String),
    vlIntervencao Nullable(String),
    dtBaseValorIntervencao Nullable(String),
    nrPrazoExecucao Nullable(String),
    dtInicio Nullable(String),
    idTipoRegimeIntervencao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.PlanilhaOrcamento
(
    idPessoa Nullable(String),
    cdIntervencao Nullable(String),
    nrAnoIntervencao Nullable(String),
    tpDocumento Nullable(String),
    valoresResponsavelOrcamento Nullable(String),
    nrDocumento Nullable(String),
    cdControleLeiAtoTotal Nullable(String),
    dtBase Nullable(String),
    idTipoPlanilhaOrcamento Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.PlanilhaExecucaoIndiretaContrato
(
    idPessoa Nullable(String),
    cdIntervencao Nullable(String),
    nrAnoIntervencao Nullable(String),
    tpDocumentoResponsavelOrcamento Nullable(String),
    nrDocumentoResponsavelOrcamento Nullable(String),
    cdControleLeiAto Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.PlanilhaExecucaoIndiretaAditivo
(
    idPessoa Nullable(String),
    cdIntervencao Nullable(String),
    nrAnoIntervencao Nullable(String),
    tpDocumentoResponsavelOrcamento Nullable(String),
    nrDocumentoResponsavelOrcamento Nullable(String),
    cdControleLeiAto Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    nrAditivoContrato Nullable(String),
    nrAnoAditivoContrato Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.MatriculaINSS
(
    idPessoa Nullable(String),
    cdIntervencao Nullable(String),
    nrAnoIntervencao Nullable(String),
    nrMatriculaCEI Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.CNDObra
(
    idPessoa Nullable(String),
    cdIntervencao Nullable(String),
    nrAnoIntervencao Nullable(String),
    nrMatriculaCEI Nullable(String),
    nrCND Nullable(String),
    nrOperacaossaoidade Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.CancelamentoMatriculaINSS
(
    idPessoa Nullable(String),
    cdIntervencao Nullable(String),
    nrAnoIntervencao Nullable(String),
    nrMatriculaCEI Nullable(String),
    dtCancelamento Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.Acompanhamento
(
    idPessoa Nullable(String),
    cdIntervencao Nullable(String),
    nrAnoIntervencao Nullable(String),
    idOrigemAcompanhamento Nullable(String),
    nrAcompanhamento Nullable(String),
    dtAcompanhamento Nullable(String),
    idTipoAcompanhamento Nullable(String),
    tpDocumentoRes Nullable(String),
    ponsavelAcompanhamento Nullable(String),
    nrDocumentoRes Nullable(String),
    ponsavelAcompanhamento_2 Nullable(String),
    dsObservacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.Medicao
(
    idPessoa Nullable(String),
    cdIntervencao Nullable(String),
    nrAnoIntervencao Nullable(String),
    idOrigemAcompanhamento Nullable(String),
    nrAcompanhamento Nullable(String),
    idTipoMedicao Nullable(String),
    nrPercentualFisicoMedicao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ExecucaoIndiretaContrato
(
    idPessoa Nullable(String),
    cdIntervencao Nullable(String),
    nrAnoIntervencao Nullable(String),
    idOrigemAcompanhamento Nullable(String),
    nrAcompanhamento Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.Paralisacao
(
    idPessoa Nullable(String),
    cdIntervencao Nullable(String),
    nrAnoIntervencao Nullable(String),
    idOrigemAcompanhamento Nullable(String),
    nrAcompanhamento Nullable(String),
    idMotivoParalisacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.DocumentoAcompanhamento
(
    idPessoa Nullable(String),
    cdIntervencao Nullable(String),
    nrAnoIntervencao Nullable(String),
    idOrigemAcompanhamto Nullable(String),
    nrAcompanhamento Nullable(String),
    cdControleLeiAto Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AcaoXIntervencao
(
    idPessoa Nullable(String),
    idOrigemAcao Nullable(String),
    cdAcao Nullable(String),
    cdControleLeiAtoAcao Nullable(String),
    cdIntervencao Nullable(String),
    nrAnoIntervencao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EmpenhoXIntervencao
(
    idPessoa Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    idOrigemEmpenho Nullable(String),
    cdIntervencao Nullable(String),
    nrAnoIntervencao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.GastoEstatalXIntervencao
(
    idPessoa Nullable(String),
    nrDetalhe Nullable(String),
    nrAnoDetalhe Nullable(String),
    cdIntervencao Nullable(String),
    nrAnoIntervencao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

