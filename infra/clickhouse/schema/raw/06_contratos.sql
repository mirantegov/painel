-- MÓDULO CONTRATOS — 18 tabelas (raw)

CREATE TABLE IF NOT EXISTS simam_raw.Contrato
(
    idPessoa Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    dtAssinatura Nullable(String),
    dsObjeto Nullable(String),
    dtInicio Nullable(String),
    dtFim Nullable(String),
    idTipoRegimeExecucaoContrato Nullable(String),
    flSubContratacao Nullable(String),
    flCessaoContratual Nullable(String),
    flFornecimentoImediato Nullable(String),
    idTipoForma Nullable(String),
    idTipoMultaContrato Nullable(String),
    dsMultaContrato Nullable(String),
    idTipoGarantiaContrato Nullable(String),
    dsGarantiaContrato Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ParteContrato
(
    idPessoa Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    idTipoParteContrato Nullable(String),
    tpDocParte Nullable(String),
    nrDocParte Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ValorContratado
(
    idPessoa Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    idTipoParteContrato Nullable(String),
    tpDocParte Nullable(String),
    nrDocParte Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.RecursoOrcamentarioContrato
(
    idPessoa Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemontrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    cdMarcadorSTN Nullable(String),
    cdGrupoFonte Nullable(String),
    cdFonte Nullable(String),
    cdCategoriaEconomica Nullable(String),
    cdGrupoNatureza Nullable(String),
    cdModalidade Nullable(String),
    cdElemento Nullable(String),
    cdDesdobramento Nullable(String),
    cdDetalhamento Nullable(String),
    nrAnoAplicacao Nullable(String),
    cdOrgao Nullable(String),
    cdUnidade Nullable(String),
    cdFuncao Nullable(String),
    cdSubFuncao Nullable(String),
    cdProgramaLOA Nullable(String),
    cdProjetoAtividade Nullable(String),
    nrAnoFuncional Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ContratoXConvenio
(
    idPessoa Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    nrConvenio Nullable(String),
    nrAnoConvenio Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ContratoXConvenioSIT
(
    idPessoa Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    idTransferencia Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ContratoXLicitacao
(
    idPessoa Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    idOrigemLicitacao Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.NumeroAditivoContrato
(
    idPessoa Nullable(String),
    nrAditivoContrato Nullable(String),
    nrAnoAditivoContrato Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.AditivoContrato
(
    idPessoa Nullable(String),
    nrAditivoContrato Nullable(String),
    nrAnoAditivoContrato Nullable(String),
    idTipoAditivoContrato Nullable(String),
    idTipoOperacaoAditivoContrato Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    idTipoParteContrato Nullable(String),
    tpDocParte Nullable(String),
    nrDocParte Nullable(String),
    dtAditivoContrato Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AditivoValorContrato
(
    idPessoa Nullable(String),
    nrAditivoContrato Nullable(String),
    nrAnoAditivoContrato Nullable(String),
    idTipoAditivoContrato Nullable(String),
    idTipoOperacaoAditivoContrato Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    idTipoParteContrato Nullable(String),
    tpDocParte Nullable(String),
    nrDocParte Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AditivoPrazoContrato
(
    idPessoa Nullable(String),
    nrAditivoContrato Nullable(String),
    nrAnoAditivoContrato Nullable(String),
    idTipoAditivoContrato Nullable(String),
    idTipoOperacao Nullable(String),
    realizadaAditivoContrato Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    idTipoParteContrato Nullable(String),
    tpDocParte Nullable(String),
    nrDocParte Nullable(String),
    dtFim Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.AditivoCessaoContrato
(
    idPessoa Nullable(String),
    nrAditivoContrato Nullable(String),
    nrAnoAditivoContrato Nullable(String),
    idTipoAditivoContrato Nullable(String),
    idTipoOperacaoAditivoContrato Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    idTipoParte Nullable(String),
    tpDocParte Nullable(String),
    nrDocParte Nullable(String),
    tpDocExecutor Nullable(String),
    nrDocExecutor Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AditivoSubContratacao
(
    idPessoa Nullable(String),
    nrAditivoContrato Nullable(String),
    nrAnoAditivoContrato Nullable(String),
    idTipoAditivoContrato Nullable(String),
    idTipoOperacaoAditivoContrato Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    idTipoParte Nullable(String),
    tpDocParte Nullable(String),
    nrDocParte Nullable(String),
    tpDocExecutor Nullable(String),
    nrDocExecutor Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AditivoRescisaoContrato
(
    idPessoa Nullable(String),
    nrAditivoContrato Nullable(String),
    nrAnoAditivoContrato Nullable(String),
    idTipoAditivoContrato Nullable(String),
    idTipoOperacaoAditivoContrato Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    idTipoParte Nullable(String),
    tpDocParte Nullable(String),
    nrDocParte Nullable(String),
    idTipoMotivo Nullable(String),
    campo Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AditivoRedimensionamentoContrato
(
    idPessoa Nullable(String),
    nrAditivo Nullable(String),
    nrAnoAditivo Nullable(String),
    idTipoAditivo Nullable(String),
    idTipoOperacao Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    idTipoParteContrato Nullable(String),
    tpDocParte Nullable(String),
    nrDocParte Nullable(String),
    idTipoRedimensionamentoObjetoContrato Nullable(String),
    idOrigemLicitacao Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    nrLote Nullable(String),
    nrItem Nullable(String),
    tpDocVencedor Nullable(String),
    nrDocVencedor Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.OutroAditivoContrato
(
    idPessoa Nullable(String),
    nrAditivoContrato Nullable(String),
    nrAnoAditivoContrato Nullable(String),
    idTipoAditivoContrato Nullable(String),
    idTipoOperacaoAditivoContrato Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    idTipoParteContrato Nullable(String),
    tpDocParte Nullable(String),
    nrDocParte Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.PublicacaoContrato
(
    idPessoa Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    cdOperacao Nullable(String),
    dtPublicacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.PublicacaoAditivoContrato
(
    idPessoa Nullable(String),
    nrAditivoContrato Nullable(String),
    nrAnoAditivoContrato Nullable(String),
    idTipoAtoContrato Nullable(String),
    idTipoOrigemContrato Nullable(String),
    nrContrato Nullable(String),
    nrAnoContrato Nullable(String),
    nrCNPJOrigem Nullable(String),
    cdOperacao Nullable(String),
    dtPublicacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

