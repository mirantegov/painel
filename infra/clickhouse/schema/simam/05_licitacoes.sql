-- MÓDULO LICITAÇÕES — 21 tabelas (simam)

-- CADASTRO DOS NÚMEROS DE LICITAÇÕES
CREATE TABLE IF NOT EXISTS simam.NumeroLicitacao
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    idStatusLicitacao UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- CADASTRO DOS NÚMEROS DE LICITAÇÕES DESCARTADOS
CREATE TABLE IF NOT EXISTS simam.DescarteLicitacao
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- LICITAÇÕES
CREATE TABLE IF NOT EXISTS simam.DadosComplementaresLicitacao
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    cdContratoMutuario Nullable(UInt32),
    flPrioridadeCon String,
    flExclusivoEPP String,
    flCotaParticipac String,
    aoEPPME Nullable(String),
    flExigeSubcontra String,
    flVlSigiloso String,
    flRecursoInternacional String,
    nrDotacaoOrcaariatacaoncelament Nullable(String),
    flInsereMural String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- DE LICITAÇÕES
CREATE TABLE IF NOT EXISTS simam.AlteraDadosComplementaresLicitacao
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    cdContratoMutuario Nullable(UInt32),
    flPrioridadeCon String,
    flExclusivoEPP String,
    flCotaParticipac String,
    aoEPPME Nullable(String),
    flExigeSubcontrtacaoncelament String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- CADASTRO DA DOTAÇÕES ORÇAMENTÁRIAS DOS EDITAIS DE LICITAÇÕES
CREATE TABLE IF NOT EXISTS simam.LicitacaoXFuncionalProgramatica
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    cdOrgao String,
    cdUnidade String,
    cdFuncao String,
    cdSubFuncao String,
    cdPrograma String,
    cdProjetoAtividade String,
    nrAnoLOA UInt32,
    cdCategoriaEconomica String,
    cdGrupoNatureza String,
    cdModalidade String,
    cdElemento String,
    cdDesdobramento String,
    cdDetalhamento String,
    nrAnoAplicacao UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- MAPA DOS EDITAIS DE LICITAÇÕES E REFERÊNCIA DE PREÇOS
CREATE TABLE IF NOT EXISTS simam.MapaEditalLicitacao
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    nrLote UInt32,
    nrItem UInt32,
    nrQuantidade String,
    idUnidadeMedida UInt32,
    vlMinimoUnitarioItem Nullable(Decimal(18,2)),
    vlMinimoTotal Nullable(Decimal(18,2)),
    vlMaximoUnitarioitem Nullable(Decimal(18,2)),
    vlMaximoTotal Nullable(Decimal(18,2)),
    idTipoCategoriaObjetoDespesa UInt32,
    idTipoObjetoDespesa UInt32,
    dsItem String,
    dsFormaPagamento String,
    nrPrazoLimiteEntrega UInt32,
    idTipoEntregaProduto UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- PUBLICAÇÃO DOS EDITAIS DE LICITAÇÕES
CREATE TABLE IF NOT EXISTS simam.PublicacaoEditalLicitacao
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    flOrgaoOficial String,
    cdOperacao UInt32,
    tpDocumento Nullable(UInt32),
    nrDocumento Nullable(String),
    dtPublicacao Date32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- PUBLICAÇÃO DOS EDITAIS DE LICITAÇÕES EM MURAL PRÓPRIO
CREATE TABLE IF NOT EXISTS simam.PublicacaoEditalLicitacaoMural
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    dtPublicacao Date32,
    dsLocalPublicacao String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- CADASTRO DOS CONVIDADOS PARA OS PROCESSOS LICITATÓRIOS
CREATE TABLE IF NOT EXISTS simam.ConvidadoLicitacao
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    tpDocumento Nullable(UInt32),
    nrDocumento String,
    dtConvite Date32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- SITUAÇÃO DOS PROCESSOS LICITATÓRIOS
CREATE TABLE IF NOT EXISTS simam.SituacaoLicitacao
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    idTipoSituacaoLicitacao UInt32,
    tpDocumento Nullable(UInt32),
    nrDocumento String,
    dtOcorrencia Date32,
    dsMotivo Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- CADASTRO DOS PARTICIPANTES EM LICITAÇÕES
CREATE TABLE IF NOT EXISTS simam.ParticipanteLicitacao
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    tpDocumento Nullable(UInt32),
    nrDocumento String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- SITUAÇÃO DOS PARTICIPANTES EM LICITAÇÕES
CREATE TABLE IF NOT EXISTS simam.SituacaoParticipanteLicitacao
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    tpDocumento Nullable(UInt32),
    nrDocumento String,
    idTipoSituacaoicipanteorrencia UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- LICITATÓRIOS
CREATE TABLE IF NOT EXISTS simam.PropostaLicitacao
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    nrLote UInt32,
    nrItem UInt32,
    tpDocumento Nullable(UInt32),
    nrDocumentorQuantidadelPropostaItemalidadePropostarazoEntregaS String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- LICITATÓRIOS
CREATE TABLE IF NOT EXISTS simam.VencedorLicitacao
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    nrLote UInt32,
    nrItem UInt32,
    tpDocumento Nullable(UInt32),
    nrDocumento String,
    nrQuantidade String,
    vlLicitacao Decimal(18,2),
    nrClassificacao UInt32,
    dtHomologacao Nullable(Date32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- LICITATÓRIOS
CREATE TABLE IF NOT EXISTS simam.CancelamentoVencedorLicitacao
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    nrLote UInt32,
    nrItem UInt32,
    tpDocumento Nullable(UInt32),
    nrDocumentoancelamentorQuantidadelCancelado String,
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- PARECERES DOS PROCESSOS LICITATÓRIOS
CREATE TABLE IF NOT EXISTS simam.ParecerLicitacao
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    nrSequencial UInt32,
    tpDocumento Nullable(UInt32),
    nrDocumento String,
    idTipoParecerLicitacao UInt32,
    dtParecer Date32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- QUADRO SOCIETÁRIO DE PARTICIPANTES DOS PROCESSOS LICITATÓRIOS
CREATE TABLE IF NOT EXISTS simam.QuadroSocietario
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    tpDocParticipante Nullable(UInt32),
    nrDocParticipante String,
    tpDocSocio Nullable(UInt32),
    nrDocSocio String,
    idTipoCargouadroSocietario UInt32,
    idTipoRegistrouadroSocietariotRegistro UInt32,
    nrRegistro String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- LICITATÓRIOS
CREATE TABLE IF NOT EXISTS simam.ComponenteComissaoLicitacao
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    cdControleLeiAto UInt32,
    tpDocumento Nullable(UInt32),
    nrDocumento String,
    idTipoAtribuicaoComissao UInt32,
    idNaturezaCargo Nullable(UInt32),
    tabelaComissao Nullable(UInt32),
    dsCargo Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- LICITAÇÕES X AÇÕES DA LEI DO PLANO PLURIANUAL
CREATE TABLE IF NOT EXISTS simam.LicitacaoXAcao
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    cdAcao String,
    cdControleLeiAtoAcao UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- LICITAÇÕES X CONVÊNIOS – SISTEMA INTEGRADO DE TRANSFERÊNCIAS -
CREATE TABLE IF NOT EXISTS simam.LicitacaoXConvenioSIT
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    idTransferencia UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

-- LICITAÇÕES X CONVÊNIOS
CREATE TABLE IF NOT EXISTS simam.LicitacaoXConvenio
(
    idPessoa UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    nrConvenio UInt64,
    nrAnoConvenio UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLicitacao, nrAnoLicitacao);

