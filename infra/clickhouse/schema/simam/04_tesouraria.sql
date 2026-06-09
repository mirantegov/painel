-- MÓDULO TESOURARIA — 18 tabelas (simam)

-- CONTAS BANCÁRIAS DAS ENTIDADES
CREATE TABLE IF NOT EXISTS simam.ContaBancariaBACEN
(
    idPessoa UInt32,
    idContaBACEN UInt64,
    idBanco UInt32,
    cdAgencia String,
    cdConta String,
    cdIBGE String,
    sgUF String,
    dsConta String,
    idTipoContaBancaria UInt32,
    dtAbertura Date32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idContaBACEN, idBanco);

-- ALTERA DADOS CADASTRAIS DE CONTAS BANCÁRIAS
CREATE TABLE IF NOT EXISTS simam.AlteraDadosContaBancariaBACEN
(
    idPessoa UInt32,
    idContaBACEN UInt64,
    idBanco UInt32,
    cdAgencia String,
    cdConta String,
    cdIBGE String,
    sgUF String,
    dsConta String,
    idTipoContaBancaria UInt32,
    dtAbertura Date32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idContaBACEN, idBanco);

-- CONTAS BANCÁRIAS DAS ENTIDADES X FONTE DE RECEITA
CREATE TABLE IF NOT EXISTS simam.ContaBancariaBACENXFonteReceita
(
    idPessoa UInt32,
    idContaFonte UInt64,
    idContaBACEN UInt64,
    cdFonte String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idContaFonte, idContaBACEN);

-- DESATIVAÇÃO DE CONTAS BANCÁRIAS DAS ENTIDADES
CREATE TABLE IF NOT EXISTS simam.DesativacaoContaBancaria
(
    idPessoa UInt32,
    idContaBACEN UInt64,
    da Date32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idContaBACEN);

-- REVERSÃO DA DESATIVAÇÃO DE CONTAS BANCÁRIAS DAS ENTIDADES
CREATE TABLE IF NOT EXISTS simam.ReversaoDesativacaoContaBancaria
(
    idPessoa UInt32,
    idContaBACEN UInt64,
    dtDesativacao Date32,
    dtReversao Date32,
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idContaBACEN, dsMotivo);

-- ENTIDADES
CREATE TABLE IF NOT EXISTS simam.ResponsavelContaBancaria
(
    idPessoa UInt32,
    idContaBACEN UInt64,
    nrCPF String,
    cadastradaaria014015016017018XX Date32,
    idPessoa_2 UInt32,
    idContaBACEN_2 UInt64,
    nrCPF_2 String,
    dtInicio Date32,
    dtBaixa Date32,
    idTipoBaixaResponsavel UInt32,
    dsMotivo Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idContaBACEN, nrCPF);

-- CONTAS BANCÁRIAS DE CREDORES/FORNECEDORES
CREATE TABLE IF NOT EXISTS simam.ContaBancariaCredor
(
    idPessoa UInt32,
    idBanco UInt32,
    cdAgencia String,
    cdConta String,
    tpDocCredor Nullable(UInt32),
    nrDocCredor String,
    cdIBGE String,
    sgUFAgencia Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idBanco, cdAgencia);

-- EXERCÍCIO ANTERIOR
CREATE TABLE IF NOT EXISTS simam.SaldoAnteriorContaBancaria
(
    idPessoa UInt32,
    idContaFonte UInt64,
    cdClasse String,
    cdGrupo String,
    cdSubGrupo String,
    cdTitulo String,
    cdSubTitulo String,
    cdItem String,
    cdSubItem String,
    cdNivel8 String,
    cdNivel9 String,
    cdNivel10 String,
    cdNivel11 String,
    cdNivel12 String,
    nrAnoAplicacao UInt32,
    nrAnoSaldo UInt32,
    tpNatureza String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idContaFonte, cdClasse);

-- MOVIMENTO DIÁRIO DAS CONTAS BANCÁRIAS
CREATE TABLE IF NOT EXISTS simam.MovimentoDiarioContaBancaria
(
    idPessoa UInt32,
    idOperacaoConta UInt64,
    nrAnoOperacaoConta UInt32,
    idContaFonte UInt64,
    cdClasse String,
    cdGrupo String,
    cdSubGrupo String,
    cdTitulo String,
    cdSubTitulo String,
    cdItem String,
    cdSubItem String,
    cdNivel8 String,
    cdNivel9 String,
    cdNivel10 String,
    cdNivel11 String,
    cdNivel12 String,
    nrAnoAplicacao UInt32,
    dtOperacao Date32,
    idTipoOperacao Nullable(UInt32),
    acordoFinanceira UInt32,
    vlDebito Decimal(18,2),
    vlCredito Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idOperacaoConta, nrAnoOperacaoConta);

-- MOVIMENTO CONTÁBIL MENSAL DAS CONTAS BANCÁRIAS
CREATE TABLE IF NOT EXISTS simam.MovimentoMensalContaBancaria
(
    idContaFonte UInt64,
    cdClasse String,
    cdGrupo String,
    cdSubGrupo String,
    cdTitulo String,
    cdSubTitulo String,
    cdItem String,
    cdSubItem String,
    cdNivel8 String,
    cdNivel9 String,
    cdNivel10 String,
    cdNivel11 String,
    cdNivel12 String,
    nrAnoAplicacao UInt32,
    nrMesMovimento UInt32,
    nrAnoMovimento UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idContaFonte, cdClasse, cdGrupo);

-- REGULARIZAÇÃO DO MOVIMENTO DIÁRIO DAS CONTAS BANCÁRIAS
CREATE TABLE IF NOT EXISTS simam.RegularizacaoMovimentoDiarioContaBancaria
(
    todasConta UInt64,
    nrAnoOperacaoConta String,
    idTipoDocumentoFinanceiro UInt32,
    nrDocumentoocumento String,
    idOrigemDestino Nullable(UInt32),
    idContaBACEN UInt64,
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
    tpDocCredor Nullable(UInt32),
    nrDocCredor Nullable(String),
    idContaCredorularizacao Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, todasConta, nrAnoOperacaoConta, idTipoDocumentoFinanceiro);

-- ESTORNO DE MOVIMENTO DIÁRIO DAS CONTAS BANCÁRIAS
CREATE TABLE IF NOT EXISTS simam.EstornoMovimentoDiarioContaBancaria
(
    idPessoa UInt32,
    nrEstorno UInt64,
    nrAnoEstorno UInt32,
    idOperacaoConta UInt64,
    nrAnoOperacaoConta UInt32,
    dtEstorno Date32,
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- SALDO MENSAL DOS EXTRATOS DAS CONTAS BANCÁRIAS
CREATE TABLE IF NOT EXISTS simam.SaldoMensalExtratoBancario
(
    idPessoa UInt32,
    idContaBACEN UInt64,
    idTipoSaldo UInt32,
    nrMes UInt32,
    nrAno UInt32,
    tpNaturezaSaldo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idContaBACEN, idTipoSaldo);

-- CONFIRMAÇÃO DA COMPENSAÇÃO DO MOVIMENTO BANCÁRIO
CREATE TABLE IF NOT EXISTS simam.CompensacaoMovimento
(
    idPessoa UInt32,
    idOperacaoConta UInt64,
    nrAnoOperacaoConta UInt32,
    nrSequencialEstornoEstorno UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idOperacaoConta, nrAnoOperacaoConta);

-- CONCILIAÇÃO BANCÁRIA MENSAL
CREATE TABLE IF NOT EXISTS simam.ConciliacaoBancaria
(
    nrMes UInt32,
    idTipoOperacaoConciliac Nullable(UInt32),
    valoresao UInt32,
    acolhidoeiro Date32,
    nrDocumento UInt64,
    idOperacaoConta Nullable(UInt64),
    nrAnoOperacaoContaOperacao Nullable(UInt32),
    dsHistorico String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, nrMes, valoresao, nrDocumento);

-- ANTERIOR
CREATE TABLE IF NOT EXISTS simam.SaldoAnteriorCaixa
(
    idPessoa UInt32,
    cdClassedGrupodSubGrupodTitulodSubTitulodItemdSubItemdNivel8dNivel9 String,
    cdNivel10 String,
    cdNivel11 String,
    cdNivel12 String,
    nrAnoAplicacao UInt32,
    nrAnoSaldo UInt32,
    cdFonte String,
    tpNatureza String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdClassedGrupodSubGrupodTitulodSubTitulodItemdSubItemdNivel8dNivel9, cdNivel10);

-- MOVIMENTO DIÁRIO DA CONTA CAIXA
CREATE TABLE IF NOT EXISTS simam.MovimentoDiarioCaixa
(
    idPessoa UInt32,
    idOperacao UInt32,
    nrAnoOperacao UInt32,
    cdClasse String,
    cdGrupo String,
    cdSubGrupo String,
    cdTitulo String,
    cdSubTitulo String,
    cdItem String,
    cdSubItem String,
    cdNivel8 String,
    cdNivel9 String,
    cdNivel10 String,
    cdNivel11 String,
    cdNivel12 Nullable(String),
    nrAnoAplicacao UInt32,
    cdFonte String,
    dtOperacao Nullable(Date32),
    idTipoOperacaoFinanceira UInt32,
    idTipoDocumentoFinanceiro Nullable(UInt32),
    nrDocumento String,
    dtDocumento Date32,
    idOrigemDestino Nullable(UInt32),
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
    nrAnoAplicacaoContrapartida Nullable(UInt32),
    idContaCredor Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idOperacao, nrAnoOperacao);

-- ESTORNO DE MOVIMENTO DIÁRIO DA CONTA CAIXA
CREATE TABLE IF NOT EXISTS simam.EstornoMovimentoDiarioCaixa
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    idOperacao UInt32,
    nrAnoOperacao UInt32,
    dtEstorno Date32,
    vlDebito Decimal(18,2),
    vlCredito Decimal(18,2),
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

