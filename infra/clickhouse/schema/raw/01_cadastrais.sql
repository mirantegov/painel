-- TABELAS CADASTRAIS — 11 tabelas (raw)

CREATE TABLE IF NOT EXISTS simam_raw.PessoaAM
(
    tpDocumento Nullable(String),
    nrDocumento Nullable(String),
    nmPessoa Nullable(String),
    dsEndereco Nullable(String),
    cdCEP Nullable(String),
    cdIBGE Nullable(String),
    sgUF Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.DocumentoPessoaAM
(
    tpDocumento Nullable(String),
    nrDocumento Nullable(String),
    tpOutroDocumento Nullable(String),
    nrOutromento Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.InexistenciaDocumentoPessoa
(
    idPessoa Nullable(String),
    tpDocumento Nullable(String),
    nrIdentificacao Nullable(String),
    nmPessoa Nullable(String),
    dsEndereco Nullable(String),
    cdCEP Nullable(String),
    cdIBGE Nullable(String),
    sgUF Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.LeiAto
(
    idPessoa Nullable(String),
    cdControle Nullable(String),
    daLeiAto Nullable(String),
    idPessoaOrigem Nullable(String),
    idTipoDocumento Nullable(String),
    idEscopo Nullable(String),
    nrLeiAto Nullable(String),
    nrAnoLeiAto Nullable(String),
    dtLeiAto Nullable(String),
    cdControleDocumento Nullable(String),
    nrAnoInicialAplicacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.PublicacaoOrgaoOficial
(
    idPessoa Nullable(String),
    cdControleLeiAto Nullable(String),
    lei Nullable(String),
    cdOperacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.CadastroSecretario
(
    idPessoa Nullable(String),
    cdOperacao Nullable(String),
    cdOrgao Nullable(String),
    nrAnoLOA Nullable(String),
    nrCPF Nullable(String),
    dtInicioVinculo Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.BaixaSecretario
(
    idPessoa Nullable(String),
    cdOperacao Nullable(String),
    dtBaixa Nullable(String),
    cdControleLeiAto Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.OrgaoOficial
(
    flLicitacao Nullable(String),
    idOrigemLicitacao Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    idTipoOrgaoOficial Nullable(String),
    cdControleLeiAto Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.BaixaOrgaoOficial
(
    idPessoa Nullable(String),
    cdOperacao Nullable(String),
    dsMotivoM Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ResponsavelModulo
(
    idPessoa Nullable(String),
    cdOperacao Nullable(String),
    tpDocumento Nullable(String),
    nrDocumento Nullable(String),
    idTipoModulo Nullable(String),
    dtInicioVinculo Nullable(String),
    idTipoResponsavelModulo Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.BaixaResponsavelModulo
(
    idPessoa Nullable(String),
    cdOperacao Nullable(String),
    dtBaixa Nullable(String),
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

