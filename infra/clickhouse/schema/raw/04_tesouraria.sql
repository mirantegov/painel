-- MÓDULO TESOURARIA — 18 tabelas (raw)

CREATE TABLE IF NOT EXISTS simam_raw.ContaBancariaBACEN
(
    idPessoa Nullable(String),
    idContaBACEN Nullable(String),
    idBanco Nullable(String),
    cdAgencia Nullable(String),
    cdConta Nullable(String),
    cdIBGE Nullable(String),
    sgUF Nullable(String),
    dsConta Nullable(String),
    idTipoContaBancaria Nullable(String),
    dtAbertura Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AlteraDadosContaBancariaBACEN
(
    idPessoa Nullable(String),
    idContaBACEN Nullable(String),
    idBanco Nullable(String),
    cdAgencia Nullable(String),
    cdConta Nullable(String),
    cdIBGE Nullable(String),
    sgUF Nullable(String),
    dsConta Nullable(String),
    idTipoContaBancaria Nullable(String),
    dtAbertura Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ContaBancariaBACENXFonteReceita
(
    idPessoa Nullable(String),
    idContaFonte Nullable(String),
    idContaBACEN Nullable(String),
    cdFonte Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.DesativacaoContaBancaria
(
    idPessoa Nullable(String),
    idContaBACEN Nullable(String),
    da Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ReversaoDesativacaoContaBancaria
(
    idPessoa Nullable(String),
    idContaBACEN Nullable(String),
    dtDesativacao Nullable(String),
    dtReversao Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.ResponsavelContaBancaria
(
    idPessoa Nullable(String),
    idContaBACEN Nullable(String),
    nrCPF Nullable(String),
    dtInicio Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ContaBancariaCredor
(
    idPessoa Nullable(String),
    idBanco Nullable(String),
    cdAgencia Nullable(String),
    cdConta Nullable(String),
    tpDocCredor Nullable(String),
    nrDocCredor Nullable(String),
    cdIBGE Nullable(String),
    sgUFAgencia Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.SaldoAnteriorContaBancaria
(
    idPessoa Nullable(String),
    idContaFonte Nullable(String),
    cdClasse Nullable(String),
    cdGrupo Nullable(String),
    cdSubGrupo Nullable(String),
    cdTitulo Nullable(String),
    cdSubTitulo Nullable(String),
    cdItem Nullable(String),
    cdSubItem Nullable(String),
    cdNivel8 Nullable(String),
    cdNivel9 Nullable(String),
    cdNivel10 Nullable(String),
    cdNivel11 Nullable(String),
    cdNivel12 Nullable(String),
    nrAnoAplicacao Nullable(String),
    nrAnoSaldo Nullable(String),
    tpNatureza Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.MovimentoDiarioContaBancaria
(
    idPessoa Nullable(String),
    idOperacaoConta Nullable(String),
    nrAnoOperacaoConta Nullable(String),
    idContaFonte Nullable(String),
    cdClasse Nullable(String),
    cdGrupo Nullable(String),
    cdSubGrupo Nullable(String),
    cdTitulo Nullable(String),
    cdSubTitulo Nullable(String),
    cdItem Nullable(String),
    cdSubItem Nullable(String),
    cdNivel8 Nullable(String),
    cdNivel9 Nullable(String),
    cdNivel10 Nullable(String),
    cdNivel11 Nullable(String),
    cdNivel12 Nullable(String),
    nrAnoAplicacao Nullable(String),
    dtOperacao Nullable(String),
    idTipoOperacao Nullable(String),
    acordoFinanceira Nullable(String),
    vlDebito Nullable(String),
    vlCredito Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.MovimentoMensalContaBancaria
(
    idContaFonte Nullable(String),
    cdClasse Nullable(String),
    cdGrupo Nullable(String),
    cdSubGrupo Nullable(String),
    cdTitulo Nullable(String),
    cdSubTitulo Nullable(String),
    cdItem Nullable(String),
    cdSubItem Nullable(String),
    cdNivel8 Nullable(String),
    cdNivel9 Nullable(String),
    cdNivel10 Nullable(String),
    cdNivel11 Nullable(String),
    cdNivel12 Nullable(String),
    nrAnoAplicacao Nullable(String),
    nrMesMovimento Nullable(String),
    nrAnoMovimento Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.RegularizacaoMovimentoDiarioContaBancaria
(
    todasConta Nullable(String),
    nrAnoOperacaoConta Nullable(String),
    idTipoDocumentoFinanceiro Nullable(String),
    nrDocumento Nullable(String),
    idOrigemDestino Nullable(String),
    idContaBACEN Nullable(String),
    cdClasseContrapartida Nullable(String),
    cdGrupoContrapartida Nullable(String),
    cdSubGrupoContrapartida Nullable(String),
    cdTituloContrapartida Nullable(String),
    cdSubTituloContrapartida Nullable(String),
    cdItemContrapartida Nullable(String),
    cdSubItemContrapartida Nullable(String),
    cdNivel8Contrapartida Nullable(String),
    cdNivel9Contrapartida Nullable(String),
    cdNivel10Contrapartida Nullable(String),
    cdNivel11Contrapartida Nullable(String),
    cdNivel12Contrapartida Nullable(String),
    nrAnoAplicacaoContrapartida Nullable(String),
    tpDocCredor Nullable(String),
    nrDocCredor Nullable(String),
    idContaCredorularizacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoMovimentoDiarioContaBancaria
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    idOperacaoConta Nullable(String),
    nrAnoOperacaoConta Nullable(String),
    dtEstorno Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.SaldoMensalExtratoBancario
(
    idPessoa Nullable(String),
    idContaBACEN Nullable(String),
    idTipoSaldo Nullable(String),
    nrMes Nullable(String),
    nrAno Nullable(String),
    tpNaturezaSaldo Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.CompensacaoMovimento
(
    idPessoa Nullable(String),
    idOperacaoConta Nullable(String),
    nrAnoOperacaoConta Nullable(String),
    nrSequencialEstorno Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ConciliacaoBancaria
(
    nrMes Nullable(String),
    idTipoOperacaoConciliac Nullable(String),
    valoresao Nullable(String),
    acolhidoeiro Nullable(String),
    nrDocumento Nullable(String),
    idOperacaoConta Nullable(String),
    nrAnoOperacaoContaOperacao Nullable(String),
    dsHistorico Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.SaldoAnteriorCaixa
(
    idPessoa Nullable(String),
    cdClassedGrupodSubGrupodTitulodSubTitulodItemdSubItemdNivel8dNivel9 Nullable(String),
    cdNivel10 Nullable(String),
    cdNivel11 Nullable(String),
    cdNivel12 Nullable(String),
    nrAnoAplicacao Nullable(String),
    nrAnoSaldo Nullable(String),
    cdFonte Nullable(String),
    tpNatureza Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.MovimentoDiarioCaixa
(
    idPessoa Nullable(String),
    idOperacao Nullable(String),
    nrAnoOperacao Nullable(String),
    cdClasse Nullable(String),
    cdGrupo Nullable(String),
    cdSubGrupo Nullable(String),
    cdTitulo Nullable(String),
    cdSubTitulo Nullable(String),
    cdItem Nullable(String),
    cdSubItem Nullable(String),
    cdNivel8 Nullable(String),
    cdNivel9 Nullable(String),
    cdNivel10 Nullable(String),
    cdNivel11 Nullable(String),
    cdNivel12 Nullable(String),
    nrAnoAplicacao Nullable(String),
    cdFonte Nullable(String),
    dtOperacao Nullable(String),
    idTipoOperacaoFinanceira Nullable(String),
    idTipoDocumentoFinanceiro Nullable(String),
    nrDocumento Nullable(String),
    dtDocumento Nullable(String),
    idOrigemDestino Nullable(String),
    cdClasseContrapartida Nullable(String),
    cdGrupoContrapartida Nullable(String),
    cdSubGrupoContrapartida Nullable(String),
    cdTituloContrapartida Nullable(String),
    cdSubTituloContrapartida Nullable(String),
    cdItemContrapartida Nullable(String),
    cdSubItemContrapartida Nullable(String),
    nas Nullable(String),
    cdNivel8Contrapartida Nullable(String),
    cdNivel9Contrapartida Nullable(String),
    cdNivel10Contrapartida Nullable(String),
    cdNivel11Contrapartida Nullable(String),
    cdNivel12Contrapartida Nullable(String),
    nrAnoAplicacaoContrapartida Nullable(String),
    idContaCredor Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoMovimentoDiarioCaixa
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    idOperacao Nullable(String),
    nrAnoOperacao Nullable(String),
    dtEstorno Nullable(String),
    vlDebito Nullable(String),
    vlCredito Nullable(String),
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

