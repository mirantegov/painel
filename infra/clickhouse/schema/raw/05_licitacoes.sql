-- MÓDULO LICITAÇÕES — 21 tabelas (raw)

CREATE TABLE IF NOT EXISTS simam_raw.NumeroLicitacao
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    idStatusLicitacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.DescarteLicitacao
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.DadosComplementaresLicitacao
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    cdContratoMutuario Nullable(String),
    flPrioridadeCon Nullable(String),
    flExclusivoEPP Nullable(String),
    flCotaParticipac Nullable(String),
    flExigeSubcontra Nullable(String),
    flVlSigiloso Nullable(String),
    flRecursoInternacional Nullable(String),
    nrDotacaoOrcaariatacaoncelament Nullable(String),
    flInsereMural Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AlteraDadosComplementaresLicitacao
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    cdContratoMutuario Nullable(String),
    flPrioridadeCon Nullable(String),
    flExclusivoEPP Nullable(String),
    flCotaParticipac Nullable(String),
    flExigeSubcontrtacaoncelament Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.LicitacaoXFuncionalProgramatica
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    cdOrgao Nullable(String),
    cdUnidade Nullable(String),
    cdFuncao Nullable(String),
    cdSubFuncao Nullable(String),
    cdPrograma Nullable(String),
    cdProjetoAtividade Nullable(String),
    nrAnoLOA Nullable(String),
    cdCategoriaEconomica Nullable(String),
    cdGrupoNatureza Nullable(String),
    cdModalidade Nullable(String),
    cdElemento Nullable(String),
    cdDesdobramento Nullable(String),
    cdDetalhamento Nullable(String),
    nrAnoAplicacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.MapaEditalLicitacao
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    nrLote Nullable(String),
    nrItem Nullable(String),
    nrQuantidade Nullable(String),
    idUnidadeMedida Nullable(String),
    vlMinimoUnitarioItem Nullable(String),
    vlMinimoTotal Nullable(String),
    vlMaximoUnitarioitem Nullable(String),
    vlMaximoTotal Nullable(String),
    idTipoCategoriaObjetoDespesa Nullable(String),
    idTipoObjetoDespesa Nullable(String),
    dsItem Nullable(String),
    dsFormaPagamento Nullable(String),
    nrPrazoLimiteEntrega Nullable(String),
    idTipoEntregaProduto Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.PublicacaoEditalLicitacao
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    flOrgaoOficial Nullable(String),
    cdOperacao Nullable(String),
    tpDocumento Nullable(String),
    nrDocumento Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.PublicacaoEditalLicitacaoMural
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    dtPublicacao Nullable(String),
    dsLocalPublicacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ConvidadoLicitacao
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    tpDocumento Nullable(String),
    nrDocumento Nullable(String),
    dtConvite Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.SituacaoLicitacao
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    idTipoSituacaoLicitacao Nullable(String),
    tpDocumento Nullable(String),
    nrDocumento Nullable(String),
    dtOcorrencia Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.ParticipanteLicitacao
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    tpDocumento Nullable(String),
    nrDocumento Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.SituacaoParticipanteLicitacao
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    tpDocumento Nullable(String),
    nrDocumento Nullable(String),
    idTipoSituacaoicipanteorrencia Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.PropostaLicitacao
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    nrLote Nullable(String),
    nrItem Nullable(String),
    tpDocumento Nullable(String),
    nrDocumentorQuantidadelPropostaItemalidadePropostarazoEntregaS Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.VencedorLicitacao
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    nrLote Nullable(String),
    nrItem Nullable(String),
    tpDocumento Nullable(String),
    nrDocumento Nullable(String),
    nrQuantidade Nullable(String),
    vlLicitacao Nullable(String),
    nrClassificacao Nullable(String),
    dtHomologacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.CancelamentoVencedorLicitacao
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    nrLote Nullable(String),
    nrItem Nullable(String),
    tpDocumento Nullable(String),
    nrDocumentoancelamentorQuantidadelCancelado Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.ParecerLicitacao
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    nrSequencial Nullable(String),
    tpDocumento Nullable(String),
    nrDocumento Nullable(String),
    idTipoParecerLicitacao Nullable(String),
    dtParecer Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.QuadroSocietario
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    tpDocParticipante Nullable(String),
    nrDocParticipante Nullable(String),
    tpDocSocio Nullable(String),
    nrDocSocio Nullable(String),
    idTipoCargouadroSocietario Nullable(String),
    idTipoRegistrouadroSocietariotRegistro Nullable(String),
    nrRegistro Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ComponenteComissaoLicitacao
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    cdControleLeiAto Nullable(String),
    tpDocumento Nullable(String),
    nrDocumento Nullable(String),
    idTipoAtribuicaoComissao Nullable(String),
    idNaturezaCargo Nullable(String),
    tabelaComissao Nullable(String),
    dsCargo Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.LicitacaoXAcao
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    cdAcao Nullable(String),
    cdControleLeiAtoAcao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.LicitacaoXConvenioSIT
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.LicitacaoXConvenio
(
    idPessoa Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
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

