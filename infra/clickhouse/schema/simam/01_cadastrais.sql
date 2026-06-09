-- TABELAS CADASTRAIS — 11 tabelas (simam)

-- CADASTRO DAS PESSOAS NÃO JURISDICIONADAS DO TCE
CREATE TABLE IF NOT EXISTS simam.PessoaAM
(
    tpDocumento UInt32,
    nrDocumento String,
    nmPessoa String,
    dsEndereco String,
    cdCEP String,
    cdIBGE String,
    sgUF Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, tpDocumento, nrDocumento, nmPessoa);

-- CADASTRO DE OUTROS DOCUMENTOS DE PESSOA DO SIM-AM
CREATE TABLE IF NOT EXISTS simam.DocumentoPessoaAM
(
    tpDocumento UInt32,
    nrDocumento String,
    tpOutroDocumento UInt32,
    nrOutromento String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, tpDocumento, nrDocumento, tpOutroDocumento);

-- PESSOA
CREATE TABLE IF NOT EXISTS simam.InexistenciaDocumentoPessoa
(
    idPessoa UInt32,
    tpDocumento UInt32,
    nrIdentificacao String,
    nmPessoa String,
    dsEndereco Nullable(String),
    cdCEP Nullable(String),
    cdIBGE Nullable(String),
    sgUF Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, tpDocumento, nrIdentificacao);

-- LEIS E ATOS VINCULADOS COM OS RESPECTIVOS ESCOPOS
CREATE TABLE IF NOT EXISTS simam.LeiAto
(
    idPessoa UInt32,
    cdControle Nullable(String),
    daLeiAto UInt32,
    idPessoaOrigem UInt32,
    idTipoDocumento UInt32,
    idEscopo UInt32,
    nrLeiAto Nullable(UInt32),
    nrAnoLeiAto Nullable(UInt32),
    dtLeiAto Nullable(Date32),
    cdControleDocumento Nullable(String),
    nrAnoInicialAplicacao String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, daLeiAto, idPessoaOrigem);

-- PUBLICAÇÃO DAS LEIS E ATOS NO ÓRGÃO OFICIAL DO MUNICÍPIO
CREATE TABLE IF NOT EXISTS simam.PublicacaoOrgaoOficial
(
    idPessoa UInt32,
    cdControleLeiAto UInt32,
    lei Date32,
    cdOperacao UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdControleLeiAto, cdOperacao);

-- CADASTRO DOS SECRETÁRIOS
CREATE TABLE IF NOT EXISTS simam.CadastroSecretario
(
    idPessoa UInt32,
    cdOperacao UInt32,
    cdOrgao String,
    nrAnoLOA UInt32,
    nrCPF String,
    dtInicioVinculo Date32,
    cdControleLeiAto String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdOperacao, cdOrgao);

-- BAIXA DE RESPONSABILIDADE DO CADASTRO DE SECRETÁRIOS
CREATE TABLE IF NOT EXISTS simam.BaixaSecretario
(
    idPessoa UInt32,
    cdOperacao UInt32,
    dtBaixa Date32,
    cdControleLeiAto UInt32,
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdOperacao, cdControleLeiAto);

-- ÓRGÃO OFICIAL DE PUBLICAÇÕES
CREATE TABLE IF NOT EXISTS simam.OrgaoOficial
(
    flLicitacao Nullable(String),
    idOrigemLicitacao Nullable(UInt32),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(UInt32),
    idTipoOrgaoOficial UInt32,
    cdControleLeiAto Nullable(UInt32),
    dsObservacao Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idTipoOrgaoOficial);

-- BAIXA DO ÓRGÃO OFICIAL DE PUBLICAÇÕES
CREATE TABLE IF NOT EXISTS simam.BaixaOrgaoOficial
(
    idPessoa UInt32,
    cdOperacao UInt32,
    dsMotivoM String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdOperacao, dsMotivoM);

-- RESPONSÁVEIS PELOS MÓDULOS DO SISTEMA SIM-AM
CREATE TABLE IF NOT EXISTS simam.ResponsavelModulo
(
    idPessoa UInt32,
    cdOperacao UInt32,
    tpDocumento UInt32,
    nrDocumento String,
    idTipoModulo UInt32,
    dtInicioVinculo Date32,
    idTipoResponsavelModulo UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdOperacao, tpDocumento);

-- BAIXA DOS RESPONSÁVEIS PELOS MÓDULOS DO SISTEMA SIM-AM
CREATE TABLE IF NOT EXISTS simam.BaixaResponsavelModulo
(
    idPessoa UInt32,
    cdOperacao UInt32,
    dtBaixa Date32,
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdOperacao, dsMotivo);

