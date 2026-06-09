-- MÓDULO CONTRATOS — 18 tabelas (simam)

-- CONTRATOS E ATAS DE REGISTRO DE PREÇOS
CREATE TABLE IF NOT EXISTS simam.Contrato
(
    idPessoa UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    dtAssinatura Date32,
    dsObjeto String,
    dtInicio Date32,
    dtFim Date32,
    idTipoRegimeExecucaoContrato UInt32,
    flSubContratacao String,
    flCessaoContratual String,
    flFornecimentoImediato String,
    idTipoForma UInt32,
    idTipoMultaContrato UInt32,
    dsMultaContrato Nullable(String),
    idTipoGarantiaContrato UInt32,
    dsGarantiaContrato Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idTipoAtoContrato, idTipoOrigemContrato);

-- PESSOAS DOS CONTRATOS E ATAS DE REGISTRO DE PREÇOS
CREATE TABLE IF NOT EXISTS simam.ParteContrato
(
    idPessoa UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    idTipoParteContrato UInt32,
    tpDocParte Nullable(UInt32),
    nrDocParte String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idTipoAtoContrato, idTipoOrigemContrato);

-- CONTRATADO
CREATE TABLE IF NOT EXISTS simam.ValorContratado
(
    idPessoa UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    idTipoParteContrato UInt32,
    tpDocParte Nullable(UInt32),
    nrDocParte String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idTipoAtoContrato, idTipoOrigemContrato);

-- RECURSOS ORÇAMENTÁRIOS DOS CONTRATOS
CREATE TABLE IF NOT EXISTS simam.RecursoOrcamentarioContrato
(
    idPessoa UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemontrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    cdMarcadorSTN String,
    cdGrupoFonte String,
    cdFonte String,
    cdCategoriaEconomica String,
    cdGrupoNatureza String,
    cdModalidade String,
    cdElemento String,
    cdDesdobramento String,
    cdDetalhamento String,
    nrAnoAplicacao UInt32,
    cdOrgao String,
    cdUnidade String,
    cdFuncao String,
    cdSubFuncao String,
    cdProgramaLOA String,
    cdProjetoAtividade String,
    nrAnoFuncional UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idTipoAtoContrato, idTipoOrigemontrato);

-- FIRMADOS COM ÓRGÃOS FEDERAIS E ENTRE MUNICÍPIOS.
CREATE TABLE IF NOT EXISTS simam.ContratoXConvenio
(
    idPessoa UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    nrConvenio UInt64,
    nrAnoConvenio UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idTipoAtoContrato, idTipoOrigemContrato);

-- CONTROLADOS PELO SISTEMA INTEGRADO DE TRANSFERÊNCIAS – SIT.
CREATE TABLE IF NOT EXISTS simam.ContratoXConvenioSIT
(
    idPessoa UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    idTransferencia UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idTipoAtoContrato, idTipoOrigemContrato);

-- VINCULAÇÃO DOS CONTRATOS E ATAS COM AS RESPECTIVAS LICITAÇÕES
CREATE TABLE IF NOT EXISTS simam.ContratoXLicitacao
(
    idPessoa UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    idOrigemLicitacao UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idTipoAtoContrato, idTipoOrigemContrato);

-- REGISTRO DE PREÇOS
CREATE TABLE IF NOT EXISTS simam.NumeroAditivoContrato
(
    idPessoa UInt32,
    nrAditivoContrato UInt32,
    nrAnoAditivoContrato UInt32,
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
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAditivoContrato, nrAnoAditivoContrato);

-- ADITIVOS DOS CONTRATOS E ATAS DE REGISTRO DE PREÇOS
CREATE TABLE IF NOT EXISTS simam.AditivoContrato
(
    idPessoa UInt32,
    nrAditivoContrato UInt32,
    nrAnoAditivoContrato UInt32,
    idTipoAditivoContrato UInt32,
    idTipoOperacaoAditivoContrato UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    idTipoParteContrato UInt32,
    tpDocParte Nullable(UInt32),
    nrDocParte String,
    dtAditivoContrato Date32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAditivoContrato, nrAnoAditivoContrato);

-- VALORES DOS ADITIVOS DOS CONTRATOS E ATAS DE REGISTRO DE PREÇOS
CREATE TABLE IF NOT EXISTS simam.AditivoValorContrato
(
    idPessoa UInt32,
    nrAditivoContrato UInt32,
    nrAnoAditivoContrato UInt32,
    idTipoAditivoContrato UInt32,
    idTipoOperacaoAditivoContrato UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    idTipoParteContrato UInt32,
    tpDocParte Nullable(UInt32),
    nrDocParte String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAditivoContrato, nrAnoAditivoContrato);

-- ADITIVOS DE PRAZOS DOS CONTRATOS E ATAS DE REGISTRO DE PREÇOS
CREATE TABLE IF NOT EXISTS simam.AditivoPrazoContrato
(
    idPessoa UInt32,
    nrAditivoContrato UInt32,
    nrAnoAditivoContrato UInt32,
    idTipoAditivoContrato UInt32,
    idTipoOperacao Nullable(UInt32),
    realizadaAditivoContrato UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    idTipoParteContrato UInt32,
    tpDocParte Nullable(UInt32),
    nrDocParte String,
    dtFim Date32,
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAditivoContrato, nrAnoAditivoContrato);

-- ADITIVOS DE CESSÃO DOS CONTRATOS E ATAS DE REGISTRO DE PREÇOS
CREATE TABLE IF NOT EXISTS simam.AditivoCessaoContrato
(
    idPessoa UInt32,
    nrAditivoContrato UInt32,
    nrAnoAditivoContrato UInt32,
    idTipoAditivoContrato UInt32,
    idTipoOperacaoAditivoContrato UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    idTipoParte UInt32,
    tpDocParte Nullable(UInt32),
    nrDocParte String,
    tpDocExecutor Nullable(UInt32),
    nrDocExecutor String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAditivoContrato, nrAnoAditivoContrato);

-- PREÇOS
CREATE TABLE IF NOT EXISTS simam.AditivoSubContratacao
(
    idPessoa UInt32,
    nrAditivoContrato UInt32,
    nrAnoAditivoContrato UInt32,
    idTipoAditivoContrato UInt32,
    idTipoOperacaoAditivoContrato UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    idTipoParte UInt32,
    tpDocParte Nullable(UInt32),
    nrDocParte String,
    tpDocExecutor Nullable(UInt32),
    nrDocExecutor String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAditivoContrato, nrAnoAditivoContrato);

-- ADITIVOS DE RESCISÃO DOS CONTRATOS E ATAS DE REGISTRO DE PREÇOS
CREATE TABLE IF NOT EXISTS simam.AditivoRescisaoContrato
(
    idPessoa UInt32,
    nrAditivoContrato UInt32,
    nrAnoAditivoContrato UInt32,
    idTipoAditivoContrato UInt32,
    idTipoOperacaoAditivoContrato UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    idTipoParte UInt32,
    tpDocParte Nullable(UInt32),
    nrDocParte String,
    idTipoMotivo UInt32,
    campo Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAditivoContrato, nrAnoAditivoContrato);

-- ADITIVO DE REDIMENSIONAMENTO DE CONTRATO
CREATE TABLE IF NOT EXISTS simam.AditivoRedimensionamentoContrato
(
    idPessoa UInt32,
    nrAditivo UInt32,
    nrAnoAditivo UInt32,
    idTipoAditivo UInt32,
    idTipoOperacao UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    idTipoParteContrato UInt32,
    tpDocParte Nullable(UInt32),
    nrDocParte String,
    idTipoRedimensionamentoObjetoContrato UInt32,
    idOrigemLicitacao UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidadeLicitacao UInt32,
    nrLote UInt32,
    nrItem UInt32,
    tpDocVencedor Nullable(UInt32),
    nrDocVencedor String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAditivo, nrAnoAditivo);

-- OUTROS ADITIVOS DOS CONTRATOS E ATAS DE REGISTRO DE PREÇOS
CREATE TABLE IF NOT EXISTS simam.OutroAditivoContrato
(
    idPessoa UInt32,
    nrAditivoContrato UInt32,
    nrAnoAditivoContrato UInt32,
    idTipoAditivoContrato UInt32,
    idTipoOperacaoAditivoContrato UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    idTipoParteContrato UInt32,
    tpDocParte Nullable(UInt32),
    nrDocParte String,
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAditivoContrato, nrAnoAditivoContrato);

-- PREÇOS
CREATE TABLE IF NOT EXISTS simam.PublicacaoContrato
(
    idPessoa UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    cdOperacao UInt32,
    dtPublicacao Date32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idTipoAtoContrato, idTipoOrigemContrato);

-- REGISTRO DE PREÇOS
CREATE TABLE IF NOT EXISTS simam.PublicacaoAditivoContrato
(
    idPessoa UInt32,
    nrAditivoContrato UInt32,
    nrAnoAditivoContrato UInt32,
    idTipoAtoContrato UInt32,
    idTipoOrigemContrato UInt32,
    nrContrato UInt32,
    nrAnoContrato UInt32,
    nrCNPJOrigem String,
    cdOperacao UInt32,
    dtPublicacao Date32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAditivoContrato, nrAnoAditivoContrato);

