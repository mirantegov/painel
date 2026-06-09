-- MÓDULO CONTÁBIL — 80 tabelas (simam)

-- PLANO DE CONTAS CONTÁBIL DAS ENTIDADES
CREATE TABLE IF NOT EXISTS simam.PlanoContabil
(
    idPessoa UInt32,
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
    dsConta String,
    tpNaturezaSaldo String,
    tpEscrituracao String,
    tpNaturezaInformacao UInt16,
    tpSuperavitFinanceiro UInt16,
    tpControleConta String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdClasse, cdGrupo);

-- VERIFICAÇÃO MENSAL
CREATE TABLE IF NOT EXISTS simam.MovimentoContabilMensal
(
    idPessoa UInt32,
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
    nrMes UInt32,
    idTipoMovimentoContabil UInt32,
    idTipoFinanceiroPatrimonial UInt32,
    idTipoVariacaoQualitativa UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdClasse, cdGrupo);

-- RECURSOS APURADO EM 31.12 DO ANO ANTERIOR
CREATE TABLE IF NOT EXISTS simam.SaldoExercicioAnteriorRealizavel
(
    idPessoa UInt32,
    nrOperacao UInt32,
    nrAnoOperacao UInt32,
    cdFonte String,
    nrAnoSaldo UInt32,
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
    tpDocDevedor UInt32,
    nrDocDevedor String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrOperacao, nrAnoOperacao);

-- DIÁRIO DE CONTABILIDADE
CREATE TABLE IF NOT EXISTS simam.DiarioContabilidade
(
    idPessoa UInt32,
    nrOperacao UInt32,
    nrAnoOperacao UInt32,
    dtOperacao Date32,
    idTipoMovimentoContabil UInt32,
    idTipoFinanceiroPatrimonial UInt32,
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
    tpNaturezaSaldo String,
    vlOperacao Decimal(18,2),
    idEventoPadrao UInt32,
    nrEventoEntidade UInt32,
    nrLancamento UInt64,
    dsHistorico String,
    idTipoVariacaoQualitativa UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrOperacao, nrAnoOperacao);

-- RECURSOS
CREATE TABLE IF NOT EXISTS simam.RealizacaoMensalReceitaFonte
(
    idPessoa UInt32,
    cdFonte String,
    cdMarcadorSTN String,
    cdCategoriaEconomica String,
    cdOrigem String,
    cdEspecie String,
    cdDesdobramentoD1 String,
    cdDesdobramentoDD2 String,
    cdDesdobramentoD3 String,
    cdTipoNaturezaReceita String,
    cdNivel8 String,
    cdNivel9 String,
    cdNivel10 String,
    cdNivel11 String,
    cdNivel12 String,
    nrAnoAplicacao UInt32,
    idTipoOperacaoReceita String,
    nrMes UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdFonte, cdMarcadorSTN);

-- FONTE DE RECURSOS
CREATE TABLE IF NOT EXISTS simam.EstornoRealizacaoMensalReceitaFonte
(
    idPessoa UInt32,
    cdFonte String,
    cdMarcadorSTN String,
    cdCategoriaEconomica String,
    cdOrigem String,
    cdEspecie String,
    cdDesdobramentoD1 String,
    cdDesdobramentoDD2 String,
    cdDesdobramentoD3 String,
    cdTipoNaturezaReceita String,
    cdNivel8 String,
    cdNivel9 String,
    cdNivel10 String,
    cdNivel11 String,
    cdNivel12 String,
    nrAnoAplicacao UInt32,
    idTipoOperacaoReceita String,
    nrMes UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdFonte, cdMarcadorSTN);

-- EMPENHOS
CREATE TABLE IF NOT EXISTS simam.Empenho
(
    idPessoa UInt32,
    nrEmpenho UInt32,
    nrAnoEmpenho UInt32,
    idOrigemEmpenhopenho UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEmpenho, nrAnoEmpenho);

-- DADOS COMPLEMENTARES DE EMPENHOS
CREATE TABLE IF NOT EXISTS simam.DadoComplementarEmpenho
(
    idPessoa UInt32,
    nrOperacao UInt32,
    nrAnoOperacao UInt32,
    nrEmpenho UInt32,
    nrAnoEmpenho UInt32,
    idOrigemEmpenho UInt32,
    idTipoDadoComplementarEmpenholEmpenho UInt32,
    nrEstorno Nullable(UInt32),
    nrAnoEstornolEstorno Nullable(UInt32),
    nrReversao Nullable(UInt32),
    nrAnoReversaoersao Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrOperacao, nrAnoOperacao);

-- RESTOS A PAGAR INSCRITOS DO EXERCÍCIO E DE EXERCÍCIOS ANTERIORES
CREATE TABLE IF NOT EXISTS simam.InscricaoRAP
(
    idPessoa UInt32,
    nrEmpenho UInt32,
    nrAnoEmpenho UInt32,
    idOrigemEmpenho UInt32,
    nrAnoInscricaoProcessadoNaoProcessado UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEmpenho, nrAnoEmpenho);

-- CISÃO/FUSÃO/EXTINÇÃO
CREATE TABLE IF NOT EXISTS simam.FonteEmpenhoCisaoFusao
(
    idPessoa UInt32,
    nrEmpenho UInt32,
    nrAnoEmpenho UInt32,
    idOrigemEmpenho UInt32,
    cdFonteOrigem String,
    cdFonteDestino String,
    pela Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEmpenho, nrAnoEmpenho);

-- MUNICIPAIS
CREATE TABLE IF NOT EXISTS simam.TransferenciaEmpenhoCisaoFusao
(
    idPessoa UInt32,
    nrEmpenho UInt32,
    nrAnoEmpenho UInt32,
    idOrigemEmpenho UInt32,
    idPessoaDestino UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEmpenho, nrAnoEmpenho);

-- DE ENTIDADES MUNICIPAIS
CREATE TABLE IF NOT EXISTS simam.TransferenciaLiquidacaoCisaoFusao
(
    idPessoa UInt32,
    nrLiquidacao UInt32,
    nrAnoLiquidacao UInt32,
    idOrigemLiquidacao UInt32,
    idPessoaDestino UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLiquidacao, nrAnoLiquidacao);

-- LICITAÇÕES
CREATE TABLE IF NOT EXISTS simam.EmpenhoXLicitacao
(
    idPessoa UInt32,
    nrEmpenho UInt32,
    nrAnoEmpenho UInt32,
    idOrigemEmpenho UInt32,
    idOrigemLicitacao UInt32,
    nrLicitacao UInt32,
    nrAnoLicitacao UInt32,
    idModalidade UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEmpenho, nrAnoEmpenho);

-- PAGAR
CREATE TABLE IF NOT EXISTS simam.EstornoEmpenho
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrEmpenho UInt32,
    nrAnoEmpenho UInt32,
    idOrigemEmpenho UInt32,
    idTipoEstornoEmpenho UInt32,
    dtEstornolEstorno Date32,
    dsMotivolSaldoAntDotacao Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- CANCELAMENTO DE RESTOS A PAGAR
CREATE TABLE IF NOT EXISTS simam.ReversaoEstornoEmpenho
(
    idPessoa UInt32,
    nrReversao UInt32,
    nrAnoReversao UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    dtReversao Date32,
    vlReversao Decimal(18,2),
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrReversao, nrAnoReversao);

-- LIQUIDAÇÃO DE EMPENHOS DO EXERCÍCIO E DE RESTOS A PAGAR
CREATE TABLE IF NOT EXISTS simam.Liquidacao
(
    idPessoa UInt32,
    nrLiquidacao UInt32,
    nrAnoLiquidacao UInt32,
    idOrigemLiquidacao UInt32,
    nrEmpenho UInt32,
    nrAnoEmpenho UInt32,
    dtLiquidacao Date32,
    nrCPFLiquidanteLiquidacao Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLiquidacao, nrAnoLiquidacao);

-- RESTOS A PAGAR
CREATE TABLE IF NOT EXISTS simam.DocumentoFiscalLiquidacao
(
    idPessoa UInt32,
    nrLiquidacao UInt32,
    nrAnoLiquidacao UInt32,
    idOrigemLiquidacao UInt32,
    idTipoDocumentoFiscal UInt32,
    nrDocumento String,
    idTipoSerieDocFiscal UInt32,
    dsTipoSerie Nullable(String),
    dtDocumento Date32,
    vlDocumento Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrLiquidacao, nrAnoLiquidacao);

-- PAGAR
CREATE TABLE IF NOT EXISTS simam.LiquidacaoQuantitativaEmpenho
(
    nrLiquidacao UInt32,
    nrAnoLiquidacaogemdacaooCategoriaoDespesaoObjetosagemLicitaca UInt32,
    entidade Nullable(UInt32),
    nrLicitacao Nullable(UInt32),
    nrAnoLicitacao Nullable(UInt32),
    idModalidadeLicitacao Nullable(UInt32),
    nrLote Nullable(UInt32),
    nrItem Nullable(UInt64),
    tpDocumento Nullable(UInt32),
    nrDocumento Nullable(String),
    idUnidadeMedida UInt32,
    nrQuantidade String,
    vlLiquidado Decimal(18,2),
    vlDesconto Decimal(18,2),
    dsHistorico Nullable(String),
    nrEntrada Nullable(UInt32),
    nrAnoEntradaQteEntrada Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, nrLiquidacao, nrAnoLiquidacaogemdacaooCategoriaoDespesaoObjetosagemLicitaca, idUnidadeMedida);

-- ORÇAMENTÁRIA
CREATE TABLE IF NOT EXISTS simam.EntradaQuantitativaAntesLiquidacao
(
    idPessoa UInt32,
    nrEntrada UInt32,
    nrAnoEntrada UInt32,
    idTipoCategoria UInt32,
    idTipoObjetoDespesa UInt32,
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
    flExisteEmpenho String,
    nrEmpenho Nullable(UInt32),
    nrAnoEmpenho Nullable(UInt32),
    diferente Nullable(UInt32),
    nrDespesa Nullable(UInt32),
    nrAnoDespesa Nullable(UInt32),
    entidade Nullable(UInt32),
    nrLicitacao Nullable(UInt32),
    nrAnoLicitacao Nullable(UInt32),
    nrLote Nullable(UInt32),
    nrItem Nullable(UInt64),
    tpDocumento Nullable(UInt32),
    nrDocumento Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEntrada, nrAnoEntrada);

-- PAGAR
CREATE TABLE IF NOT EXISTS simam.EstornoLiquidacao
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrLiquidacao UInt32,
    nrAnoLiquidacao UInt32,
    idOrigemLiquidacao UInt32,
    dtEstorno Date32,
    vlEstornoA Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- PAGAR X DOCUMENTOS FISCAIS
CREATE TABLE IF NOT EXISTS simam.EstornoDocumentoFiscalLiquidacao
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrLiquidacao UInt32,
    nrAnoLiquidacao UInt32,
    idOrigemLiquidacao UInt32,
    idTipoDocumento Nullable(UInt32),
    conformeFiscal UInt32,
    nrDocumento String,
    idTipoSerieDocFiscal UInt32,
    dsTipoSerie Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- DE RESTOS A PAGAR
CREATE TABLE IF NOT EXISTS simam.EstornoLiquidacaoQuantitativaEmpenho
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrOperacao UInt32,
    nrAnoOperacao UInt32,
    nrQuantidade String,
    vlEstorno Decimal(18,2),
    vlEstornoDesconto Decimal(18,2),
    nrEntrada Nullable(UInt32),
    nrAnoEntrada Nullable(UInt32),
    nrEstornoQteEntrada Nullable(String),
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- PAGAMENTO DE EMPENHOS DO EXERCÍCIO E DE RESTOS A PAGAR
CREATE TABLE IF NOT EXISTS simam.Pagamento
(
    idPessoa UInt32,
    nrPagamento UInt32,
    nrAnoPagamento String,
    idTipoOperacaoPagamento UInt32,
    nrLiquidacao UInt32,
    do UInt32,
    idOrigemLiquidacaoOperacao UInt32,
    vlOperacao Decimal(18,2),
    nrOperacaoBancoCaixa Nullable(String),
    nrAnoOperacaoBancoCaixa Nullable(String),
    tpDocResponsavel Nullable(UInt32),
    nrDocResponsavel String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrPagamento, nrAnoPagamento);

-- PAGAR
CREATE TABLE IF NOT EXISTS simam.EstornoPagamento
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    idTipoOperacaoPagamento UInt32,
    nrPagamento UInt32,
    nrAnoPagamento UInt32,
    dtEstornolEstorno Date32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- MOVIMENTAÇÃO DAS CONTAS DO REALIZÁVEL
CREATE TABLE IF NOT EXISTS simam.MovimentoRealizavel
(
    idPessoa UInt32,
    nrRealizavel UInt32,
    nrAnoRealizavel UInt32,
    idTipoMovimentoealizavel UInt32,
    cdFonte String,
    cdClassedGrupodSubGrupodTitulodSubTitulodItemdSubItemdNivel8dNivel9dNivel10dNivel11dNivel12 String,
    nrAnoAplicacao UInt32,
    idOrigemDestino UInt32,
    tpDocDevedor UInt32,
    nrDocDevedor String,
    dtOperacao Date32,
    vlOperacao Decimal(18,2),
    dsNotaExplicativa Nullable(String),
    nrOperacaoBancoCaixa Nullable(UInt64),
    nrAnoOperacaoBancoCaixa Nullable(UInt32),
    nrEmpenho Nullable(UInt32),
    nrAnoEmpenho Nullable(UInt32),
    idOrigemEmpenho Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrRealizavel, nrAnoRealizavel);

-- ESTORNO DO MOVIMENTO DO REALIZÁVEL
CREATE TABLE IF NOT EXISTS simam.EstornoMovimentoRealizavel
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrRealizavel UInt32,
    nrAnoRealizavel UInt32,
    dtEstorno Date32,
    vlEstorno Decimal(18,2),
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- FINANCEIRO
CREATE TABLE IF NOT EXISTS simam.DepositoRestituivelPassivo
(
    idPessoa UInt32,
    nrDeposito UInt32,
    nrAnoDeposito UInt32,
    idTipoDepositoituivelPassivo UInt32,
    cdFonte String,
    cdClasseupobGrupotulobTituloembItemvel8vel9vel10vel11vel12 String,
    nrAnoAplicacao UInt32,
    idOrigemDestino UInt32,
    tpDocCredor UInt32,
    nrDocCredorD9 String,
    dsNotaExplicativa Nullable(String),
    nrEmpenho Nullable(UInt32),
    nrAnoEmpenho Nullable(UInt32),
    idOrigemEmpenho Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrDeposito, nrAnoDeposito);

-- PASSIVO FINANCEIRO
CREATE TABLE IF NOT EXISTS simam.EstornoDepositoRestituivelPassivo
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrDeposito UInt32,
    nrAnoDeposito UInt32,
    dtEstorno Date32,
    vlEstorno Decimal(18,2),
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- TRANSFERÊNCIAS FINANCEIRAS
CREATE TABLE IF NOT EXISTS simam.TransferenciaFinanceira
(
    idPessoa UInt32,
    nrTransferencia UInt32,
    nrAnoTransferencia UInt32,
    idOrigemDestino UInt32,
    idTipoOperacaoPagamento UInt32,
    idTipoFluxoInterferencia Nullable(UInt32),
    idTipoNaturezaTransferencia UInt32,
    vlOperacao Decimal(18,2),
    dtOperacao Date32,
    nrOperacaoBancoCaixa UInt64,
    nrAnoOperacaoBancoCaixa UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrTransferencia, nrAnoTransferencia);

-- ESTORNO DE TRANSFERÊNCIAS FINANCEIRAS
CREATE TABLE IF NOT EXISTS simam.EstornoTransferenciaFinanceira
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrTransferencia UInt64,
    nrAnoTransferencia UInt32,
    dtEstornolEstorno Date32,
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- DESPESAS DEIXADAS DE EMPENHAR
CREATE TABLE IF NOT EXISTS simam.DespesaNaoEmpenhada
(
    idPessoa UInt32,
    nrDespesa UInt32,
    nrAnoDespesa UInt32,
    cdOrgao String,
    cdUnidade String,
    cdFuncao String,
    cdSubFuncao String,
    cdProgramaLOA Nullable(String),
    cdProjetoAtividade Nullable(String),
    nrAnoFuncional UInt32,
    cdCategoriaEconomica String,
    cdGrupoNatureza String,
    cdModalidade String,
    cdElemento String,
    cdDesdobramento String,
    cdDetalhamento String,
    nrAnoAplicacao UInt32,
    tpDocOrdenador Nullable(UInt32),
    nrDocOrdenador String,
    dtDocumento Date32,
    tpDocCredor Nullable(UInt32),
    nrDocCredor String,
    idTipoDocumentoFiscal UInt32,
    nrDocumento String,
    idTipoSerieDocFiscal UInt32,
    dsTipoSerie Nullable(String),
    vlDocumento Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrDespesa, nrAnoDespesa);

-- ESTORNO/CANCELAMENTO DE DESPESAS DEIXADAS DE EMPENHAR
CREATE TABLE IF NOT EXISTS simam.EstornoDespesaNaoEmpenhada
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrDespesa UInt32,
    nrAnoDespesa UInt32,
    dtEstorno Date32,
    cdControleLeiAto UInt32,
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- APROPRIAÇÃO ORÇAMENTÁRIA DE DESPESAS NÃO EMPENHADAS
CREATE TABLE IF NOT EXISTS simam.ApropriacaoDespesaNaoEmpenhada
(
    idPessoa UInt32,
    nrOperacao UInt32,
    nrAnoOperacao UInt32,
    nrDespesa UInt32,
    nrAnoDespesa UInt32,
    dtOperacao Date32,
    nrLiquidacao UInt32,
    nrAnoLiquidacao UInt32,
    idOrigemLiquidacao UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrOperacao, nrAnoOperacao);

-- PAGAMENTO DE DESPESAS DEIXADAS DE EMPENHAR
CREATE TABLE IF NOT EXISTS simam.PagamentoDespesaNaoEmpenhada
(
    idPessoa UInt32,
    nrPagamento UInt32,
    nrAnoPagamento UInt32,
    idTipoOperacaoPagamento UInt32,
    nrDespesa UInt32,
    nrAnoDespesa UInt32,
    dtOperacao Date32,
    nrOperacaoBancoCaixa Nullable(UInt64),
    nrAnoOperacaoBancoCaixa Nullable(UInt32),
    tpDocResponsavel Nullable(UInt32),
    nrDocResponsavel String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrPagamento, nrAnoPagamento);

-- ESTORNO DE PAGAMENTO DE DESPESAS DEIXADAS DE EMPENHAR
CREATE TABLE IF NOT EXISTS simam.EstornoPagamentoDespesaNaoEmpenhada
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrPagamento UInt32,
    nrAnoPagamento UInt32,
    idTipoOperacaoPagamento UInt32,
    dtEstorno Date32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- PARCELAMENTOS
CREATE TABLE IF NOT EXISTS simam.Divida
(
    idPessoa UInt32,
    nrDivida UInt32,
    nrAnoDivida UInt32,
    idTipoOrigemDivida UInt32,
    idTipoNaturezaDivida UInt32,
    idTipoGrupoDivida UInt32,
    idTipoDivida Nullable(UInt32),
    cdControleLeiAto Nullable(UInt32),
    nrOficioSTN Nullable(String),
    dtOficioSTN Nullable(Date32),
    dsDivida String,
    dtAssinaturaContratoontratogemvida Nullable(Date32),
    nrQteParcelatratada Nullable(UInt32),
    teParcelaa Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrDivida, nrAnoDivida);

-- PARCELAMENTOS
CREATE TABLE IF NOT EXISTS simam.SaldoAnteriorDivida
(
    idPessoa UInt32,
    nrDivida UInt32,
    nrAnoDivida UInt32,
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
    idTipoFinanceiroPatrimonial UInt32,
    vlSaldo Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrDivida, nrAnoDivida);

-- PARCELAMENTOS
CREATE TABLE IF NOT EXISTS simam.IngressoAtualizacaoDivida
(
    idPessoa UInt32,
    nrIngresso UInt32,
    nrAnoIngresso UInt32,
    nrDivida UInt32,
    nrAnoDividatOperacao UInt32,
    idTipoOperacaoDivida Nullable(UInt32),
    vlOperacao Decimal(18,2),
    nrOperacaoBancoCaixa Nullable(UInt64),
    nrAnoOperacaoBancoCaixa Nullable(UInt32),
    nrParcelaRecebida Nullable(String),
    cdClasse String,
    cdGrupo String,
    cdSubGrupo String,
    cdTitulo String,
    ubTitulotem String,
    ubItemivel8ivel9ivel10ivel11ivel12 String,
    nrAnoAplicacao UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrIngresso, nrAnoIngresso);

-- FINANCIAMENTOS E PARCELAMENTOS
CREATE TABLE IF NOT EXISTS simam.EstornoIngressoAtualizacaoDivida
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrIngresso UInt32,
    nrAnoIngresso UInt32,
    dtEstorno Date32,
    vlEstorno Decimal(18,2),
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- REGISTRO PERMUTATIVO DO STATUS DA DÍVIDA
CREATE TABLE IF NOT EXISTS simam.RegistroPermutativoStatusDivida
(
    idPessoa UInt32,
    nrOperacao UInt32,
    nrDivida UInt32,
    nrAnoDivida UInt32,
    idTipoPermutaStatusDivida Nullable(UInt32),
    cdClasse String,
    cdGrupo String,
    cdSubGrupo String,
    cdTitulo String,
    cdSubTitulo String,
    cdItem String,
    cdSubItem String,
    nrAnoAplicacao UInt32,
    nrEmpenho Nullable(UInt32),
    nrAnoEmpenho Nullable(UInt32),
    idOrigem Nullable(UInt32),
    dtOperacao9 Date32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrOperacao, nrDivida);

-- REGISTRO PERMUTATIVO DO STATUS DA DÍVIDA
CREATE TABLE IF NOT EXISTS simam.EstornoRegistroPermutativoStatusDivida
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrOperacaotEstorno UInt32,
    vlEstorno Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrOperacaotEstorno);

-- BAIXA DOS EMPRÉSTIMOS, FINANCIAMENTOS E PARCELAMENTOS
CREATE TABLE IF NOT EXISTS simam.BaixaDivida
(
    idPessoa UInt32,
    nrBaixa UInt32,
    nrAnoBaixa UInt32,
    nrDivida UInt32,
    nrAnoDivida UInt32,
    dtOperacao Date32,
    idTipoOperacaoDivida Nullable(UInt32),
    vlOperacao Decimal(18,2),
    nrOperacaoBancoCaixa Nullable(UInt64),
    nrAnoOperacaoBancoCaixa Nullable(UInt32),
    nrParcela Nullable(UInt32),
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
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrBaixa, nrAnoBaixa);

-- PARCELAMENTOS
CREATE TABLE IF NOT EXISTS simam.EstornoBaixaDivida
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrBaixa UInt32,
    nrAnoBaixa UInt32,
    dtEstorno Date32,
    vlEstorno Decimal(18,2),
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- COM RECURSOS PRÓPRIOS
CREATE TABLE IF NOT EXISTS simam.ExecucaoAntecipadaOperacaoCredito
(
    idPessoa UInt32,
    nrExecucao UInt32,
    nrAnoExecucao UInt32,
    nrDivida UInt32,
    nrAnoDivida UInt32,
    idTipoExecucaoAntecipada Nullable(UInt32),
    dtExecucao Date32,
    nrOperacaoBancoOrigem Nullable(UInt64),
    nrAnoOperacaoBancoOrigem UInt32,
    nrOperacaoBancoDestino Nullable(UInt64),
    nrAnoOperacao Nullable(UInt32),
    nrEmpenho Nullable(UInt64),
    nrAnoEmpenho Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrExecucao, nrAnoExecucao);

-- DE CRÉDITOS COM RECURSOS PRÓPRIOS
CREATE TABLE IF NOT EXISTS simam.EstornoExecucaoAntecipadaOperacaoCredito
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrExecucao UInt32,
    nrAnoExecucao UInt32,
    dtEstorno Date32,
    vlEstorno Decimal(18,2),
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- CADASTRO DE CONVÊNIOS FEDERAIS
CREATE TABLE IF NOT EXISTS simam.Convenio
(
    idPessoa UInt32,
    nrConvenio UInt64,
    nrAnoConvenio UInt32,
    tpEsferaGoverno String,
    nrTermo UInt32,
    dtCelebracao Date32,
    dtInicioVigencia Date32,
    dtFimVigencia Date32,
    nrDiarioOficial Nullable(UInt32),
    nrAnoDiarioOficial Nullable(UInt32),
    dtPublicacaoDiario Nullable(Date32),
    nrCNPJDiario Nullable(String),
    nrCNPJOrigemDestino String,
    vlConveniolRecursoProprio Decimal(18,2),
    idUnidadeMedidarMetaFisicasObjeto UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrConvenio, nrAnoConvenio);

-- SITUAÇÃO DE CONVÊNIOS FEDERAIS
CREATE TABLE IF NOT EXISTS simam.SituacaoConvenio
(
    idPessoa UInt32,
    nrConvenio UInt64,
    nrAnoConvenio UInt32,
    nrSequencial UInt32,
    dtOperacao Date32,
    idTipoSituacaoConvenio Nullable(UInt32),
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrConvenio, nrAnoConvenio);

-- ADITIVOS DE CONVENIOS FEDERAIS
CREATE TABLE IF NOT EXISTS simam.AditivoConvenio
(
    idPessoa UInt32,
    nrAditivo UInt32,
    nrAnoAditivo UInt32,
    nrConvenio UInt64,
    nrAnoConvenio UInt32,
    idTipoAditivoConvenio UInt32,
    nrTermoAditivo UInt32,
    nrDiarioOficial Nullable(UInt32),
    nrAnoDiarioOficial Nullable(UInt32),
    nrCNPJDiario Nullable(String),
    dsAditivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAditivo, nrAnoAditivo);

-- CANCELAMENTO DE ADITIVOS DE CONVENIOS FEDERAIS
CREATE TABLE IF NOT EXISTS simam.CancelamentoAditivoConvenio
(
    idPessoa UInt32,
    nrAditivo UInt32,
    nrAnoAditivo UInt32,
    dtCancelamento Date32,
    do Nullable(Date32),
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAditivo, nrAnoAditivo);

-- RECURSOS
CREATE TABLE IF NOT EXISTS simam.ConvenioXFonte
(
    idPessoa UInt32,
    nrConvenio UInt64,
    nrAnoConvenio UInt32,
    cdFonte String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrConvenio, nrAnoConvenio);

-- ANTECIPADA DE CONVÊNIOS E OPERAÇÕES DE CRÉDITO
CREATE TABLE IF NOT EXISTS simam.SaldoExercicioAnteriorContrapExecAntecipada
(
    idPessoa UInt32,
    nrAnoAplicacao UInt32,
    idTipoExecucaoAntecipada Nullable(UInt32),
    idTipoContrapartidaExecucaoAntecipada UInt32,
    cdFonteOrigem String,
    cdFonteDestino String,
    vlSaldo Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAnoAplicacao, idTipoContrapartidaExecucaoAntecipada);

-- RECURSOS PRÓPRIOS
CREATE TABLE IF NOT EXISTS simam.ContrapartidaExecAntConvenio
(
    idPessoa UInt32,
    nrExecucao UInt32,
    nrAnoExecucao UInt32,
    nrConvenio UInt64,
    nrAnoConvenio UInt32,
    idTipoExecucaoAntecipada Nullable(UInt32),
    dtExecucao Date32,
    nrOperacaoBancoOrigem Nullable(UInt64),
    nrAnoOperacaoBancoOrigem UInt32,
    nrOperacaoBancoDestino Nullable(UInt64),
    nrAnoOperacao Nullable(UInt32),
    nrEmpenho Nullable(UInt64),
    nrAnoEmpenhoE Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrExecucao, nrAnoExecucao);

-- FEDERAIS COM RECURSOS PRÓPRIOS
CREATE TABLE IF NOT EXISTS simam.EstornoContrapartidaExecAntConvenio
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrExecucao UInt32,
    nrAnoExecucao UInt32,
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

-- VINCULAÇÃO DOS EMPENHOS COM OS RESPECTIVOS CONVÊNIOS FEDERAIS
CREATE TABLE IF NOT EXISTS simam.EmpenhoXConvenio
(
    idPessoa UInt32,
    nrEmpenho UInt64,
    nrAnoEmpenho UInt32,
    idOrigemEmpenho UInt32,
    nrConvenio UInt64,
    nrAnoConvenio UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEmpenho, nrAnoEmpenho);

-- RESPECTIVAS FONTES DE RECURSOS – CONVÊNIOS CAPTADOS PELO SIT
CREATE TABLE IF NOT EXISTS simam.FonteXConvenioSIT
(
    cdFonte String,
    idTransferencia UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, cdFonte, idTransferencia);

-- TRANSFERÊNCIAS - SIT
CREATE TABLE IF NOT EXISTS simam.EmpenhoXConvenioSIT
(
    idPessoa UInt32,
    nrEmpenho UInt64,
    nrAnoEmpenho UInt32,
    idOrigemEmpenho UInt32,
    idTransferencia UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEmpenho, nrAnoEmpenho);

-- INTEGRADO DE TRANSFERÊCIAS - SIT.
CREATE TABLE IF NOT EXISTS simam.ContrapartidaExecAntConvenioSIT
(
    idPessoa UInt32,
    nrExecucao UInt32,
    nrAnoExecucao UInt32,
    idTipoExecucaoAntecipada Nullable(UInt32),
    dtExecucao Date32,
    nrOperacaoBancoOrigem Nullable(UInt64),
    nrAnoOperacaoBancoOrigem UInt32,
    nrOperacaoBancoDestino Nullable(UInt64),
    nrAnoOperacaoBancoDestino Nullable(UInt32),
    vlExecucao Decimal(18,2),
    nrEmpenho Nullable(UInt64),
    nrAnoEmpenho Nullable(UInt32),
    idOrigemEmpenho Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrExecucao, nrAnoExecucao);

-- CONTRAPARTIDA E EXECUÇÃO ANTECIPADA DOS CONVÊNIOS – SIT.
CREATE TABLE IF NOT EXISTS simam.RegularizacaoTransferenciaSIT
(
    idPessoa UInt32,
    nrExecucao UInt32,
    nrAnoExecucao UInt32,
    idTransferencia UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrExecucao, nrAnoExecucao);

-- SISTEMA INTEGRADO DE TRANSFERÊCIAS - SIT.
CREATE TABLE IF NOT EXISTS simam.EstornoContrapartidaExecAntConvenioSIT
(
    idPessoa UInt32,
    nrEstorno UInt32,
    nrAnoEstorno UInt32,
    nrExecucao UInt32,
    nrAnoExecucao UInt32,
    dtEstornotorno Date32,
    dsMotivo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEstorno, nrAnoEstorno);

-- INCORPORAÇÃO
CREATE TABLE IF NOT EXISTS simam.CisaoFusao
(
    idPessoa UInt32,
    cdClasseOrigem String,
    nrAnoAplicacao UInt32,
    tpNaturezaSaldo Nullable(String),
    cdClassePL String,
    conta String,
    conta_2 String,
    conta_3 String,
    conta_4 String,
    conta_5 String,
    conta_6 String,
    conta_7 String,
    conta_8 String,
    conta_9 String,
    conta_10 Nullable(String),
    nrAnoAplicacaoP UInt32,
    tpNaturezaSaldoP String,
    valorestabela Nullable(UInt32),
    nrOperacao Nullable(UInt64),
    nrAnoOperacao Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdClasseOrigem, nrAnoAplicacao);

-- RECURSOS DO REALIZÁVEL POR CISÃO, FUSÃO E INCORPORAÇÃO
CREATE TABLE IF NOT EXISTS simam.FonteCisaoFusao
(
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
    cdFonteOrigem String,
    cdFonteDestino String,
    idOrigemDestino UInt32,
    idTipoOperacao Nullable(UInt32),
    naCisaoFusao UInt32,
    vlOperacao Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, cdClasse, cdGrupo, cdSubGrupo);

-- DE PREÇOS
CREATE TABLE IF NOT EXISTS simam.EmpenhoXContrato
(
    idPessoa UInt32,
    nrEmpenho UInt64,
    nrAnoEmpenho UInt32,
    idOrigemEmpenho UInt32,
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
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrEmpenho, nrAnoEmpenho);

-- CONTROLE DE DIÁRIAS
CREATE TABLE IF NOT EXISTS simam.Diaria
(
    doConcessao UInt32,
    dtInicio Date32,
    dtFim Date32,
    nrDiaria String,
    vlDiaria Decimal(18,2),
    vlTotalDiaria Decimal(18,2),
    cdIBGE String,
    sgUF String,
    idTipoObjetivoDiaria UInt32,
    dsObjetivo Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, doConcessao, nrDiaria, cdIBGE);

-- PLANO DE CONTAS CONTÁBIL DAS ESTATAIS
CREATE TABLE IF NOT EXISTS simam.PlanoContabilEstatal
(
    dsConta String,
    acordopresentes String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, dsConta, acordopresentes);

-- TCE/PR
CREATE TABLE IF NOT EXISTS simam.BalanceteMensalEstatalXPlanoContabil
(
    idPessoa UInt32,
    nrMes UInt32,
    cdContaContabil String,
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
    vlDebito Decimal(18,2),
    vlCredito Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrMes, cdContaContabil);

-- COMPOSIÇÃO DO QUADRO DELIBERATIVO E EXECUTIVO DAS ESTATAIS
CREATE TABLE IF NOT EXISTS simam.QuadroDeliberativoExecutivo
(
    idPessoa UInt32,
    nrOperacao UInt32,
    nrCPFComponente String,
    idTipoNaturezaQuadroEstatal UInt32,
    idTipoFuncaoQuadroEstatal UInt32,
    dtInicio Date32,
    dtFim Nullable(Date32),
    cdControleLeiAto UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrOperacao, nrCPFComponente);

-- ESTATAIS
CREATE TABLE IF NOT EXISTS simam.BaixaQuadroDeliberativoExecutivo
(
    idPessoa UInt32,
    nrOperacao UInt32,
    dtBaixa Date32,
    cdControleLeiAtoBaixa UInt32,
    idTipoBaixaQuadroDeliberativoExecutivo UInt32,
    dsMotivo Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrOperacao, cdControleLeiAtoBaixa);

-- ALTERAÇÃO DE CONTA CONTÁBIL POR ESTORNOS DE OPERAÇÕES
CREATE TABLE IF NOT EXISTS simam.AlteracaoContaContabil
(
    idPessoa UInt32,
    idTipoOperacao UInt32,
    nrOperacao UInt32,
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
    cdNivel12 String,
    nrAnoAplicacao UInt32,
    dtOperacao Date32,
    dsJustificativa Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idTipoOperacao, nrOperacao);

-- ALTERAÇÃO DE CONTA CONTÁBIL ENTRE EXERCÍCIOS
CREATE TABLE IF NOT EXISTS simam.AlteracaoContaContabilEntreExercicios
(
    idPessoa UInt32,
    cdClasseAnterior String,
    cdGrupoAnterior String,
    cdSubGrupoAnterior String,
    cdTituloAnterior String,
    cdSubTituloAnterior String,
    cdItemAnterior String,
    cdSubItemAnterior String,
    cdNivel8Anterior String,
    cdNivel9Anterior String,
    cdNivel10Anterior String,
    cdNivel11Anterior String,
    cdNivel12Anterior String,
    nrAnoAplicacaoAnterior UInt32,
    cdClasseAtual String,
    cdGrupoAtual String,
    cdSubGrupoAtual String,
    cdTituloAtual String,
    cdSubTituloAtual String,
    cdItemAtual String,
    cdSubItemAtual String,
    cdNivel8Atual String,
    cdNivel9Atual String,
    cdNivel10Atual String,
    cdNivel11Atual String,
    cdNivel12Atual String,
    nrAnoAplicacaoAtual UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdClasseAnterior, cdGrupoAnterior);

-- FORNECEDORES E REPRESENTANTES DO SIAFIC
CREATE TABLE IF NOT EXISTS simam.FornecedorRepresentanteSiafic
(
    idPessoa UInt32,
    flSiaficProprio String,
    tpDocFornecedor UInt32,
    nrDocFornecedor String,
    tpDocRepresentante Nullable(UInt32),
    nrDocRepresentante Nullable(String),
    nrAno UInt32,
    nrMes UInt32,
    idTipoAtoContrato Nullable(UInt32),
    idTipoOrigemContrato Nullable(UInt32),
    nrContrato Nullable(UInt32),
    nrAnoContrato Nullable(UInt32),
    nrCNPJOrigem Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, flSiaficProprio, tpDocFornecedor);

-- CADASTRO BÁSICO DE CONSÓRCIOS
CREATE TABLE IF NOT EXISTS simam.CadastroConsorcio
(
    idPessoa UInt32,
    idTipoAreaConsorcioipoOperacaoAreaCorcioipoNaturezaidicaConsorcioperacao UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idTipoAreaConsorcioipoOperacaoAreaCorcioipoNaturezaidicaConsorcioperacao);

-- CADASTRO DE MUNICÍPIOS CONSORCIADOS
CREATE TABLE IF NOT EXISTS simam.ConsorcioXMunicipio
(
    idPessoa UInt32,
    idPessoaMunicipio UInt32,
    dtInicioVinculo Date32,
    cdControleLeiAto UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idPessoaMunicipio, cdControleLeiAto);

-- BAIXA DE MUNICÍPIOS CONSORCIADOS
CREATE TABLE IF NOT EXISTS simam.BaixaMunicipioConsorciado
(
    idPessoa UInt32,
    idPessoaMunicipiotInicioVinculotBaixa UInt32,
    cdControleLeiAto UInt32,
    dsMotivo Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idPessoaMunicipiotInicioVinculotBaixa, cdControleLeiAto);

-- DECLARAÇÃO DA AUSÊNCIA DE REPASSES DE MUNICÍPIOS CONSORCIADOS
CREATE TABLE IF NOT EXISTS simam.MunicipioConsorciadoSemRepasse
(
    idPessoa UInt32,
    nrAno UInt32,
    idPessoaMunicipio UInt32,
    flAtivo String,
    flOcorreuRepasse String,
    dsJustificativa Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAno, idPessoaMunicipio);

-- CADASTRO DE CONTRATO DE RATEIO E DE PROGRAMAS
CREATE TABLE IF NOT EXISTS simam.CadastroContratoRateioPrograma
(
    idPessoa UInt32,
    nrContratoConsorcio UInt32,
    nrAnoContratoConsorcio UInt32,
    idTipoContratoConsorcio UInt32,
    idPessoaMunicipio UInt32,
    dtAssinatura Date32,
    dsObjeto String,
    dtInicio Date32,
    dtFim Date32,
    cdControleLeiAto UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrContratoConsorcio, nrAnoContratoConsorcio);

-- VALORES DOS CONTRATOS DE RATEIO E DE PROGRAMAS
CREATE TABLE IF NOT EXISTS simam.ValorContratoRateioPrograma
(
    idPessoa UInt32,
    nrContratoConsorcio UInt32,
    nrAnoContratoConsorcio UInt32,
    idTipoContratoConsorcio UInt32,
    idPessoaMunicipio UInt32,
    cdCategoriaEconomica String,
    cdGrupoNatureza String,
    cdModalidade String,
    cdElemento String,
    cdDesdobramento String,
    cdDetalhamento String,
    nrAnoAplicacao UInt32,
    vlElemento Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrContratoConsorcio, nrAnoContratoConsorcio);

-- CADASTRO DOS ADITIVOS DOS CONTRATOS DE RATEIO E DE PROGRAMAS
CREATE TABLE IF NOT EXISTS simam.AditivoContratoRateioPrograma
(
    idPessoa UInt32,
    nrAditivoContratoCon String,
    sorcio Nullable(UInt32),
    nrAnoAditivoContratoConsorcioConsorcio String,
    idPessoaMunicipioAditivo UInt32,
    nrContratoConsorcio UInt32,
    nrAnoContratoConsorcio UInt32,
    idTipoContratoConsorcio UInt32,
    idPessoaMunicipio UInt32,
    dtAssinatura Date32,
    dtFimVigenciaAditivo Nullable(Date32),
    cdControleLeiAto UInt32,
    vlTotalAditivo Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAditivoContratoCon, nrAnoAditivoContratoConsorcioConsorcio);

-- VALORES DOS ADITIVOS DOS CONTRATOS DE RATEIO E DE PROGRAMAS
CREATE TABLE IF NOT EXISTS simam.ValorAditivoContratoRateioPrograma
(
    idPessoa UInt32,
    nrAditivoContratoCon String,
    sorcio Nullable(UInt32),
    nrAnoAditivoContratoConsorcioConsorcio String,
    idPessoaMunicipioAditivo UInt32,
    nrContratoConsorcio UInt32,
    nrAnoContratoConsorcio UInt32,
    idTipoContratoConsorcio UInt32,
    idPessoaMunicipio UInt32,
    cdCategoriaEconomica String,
    cdGrupoNatureza String,
    cdModalidade String,
    cdElemento String,
    cdDesdobramento String,
    cdDetalhamento String,
    nrAnoAplicacaolElemento UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAditivoContratoCon, nrAnoAditivoContratoConsorcioConsorcio);

-- DADOS DO PORTAL DE TRANSPARÊNCIA
CREATE TABLE IF NOT EXISTS simam.DadosPortalTransparencia
(
    idPessoa UInt32,
    nrAno UInt32,
    nrMes UInt32,
    flPublicaDadostal String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrAno, nrMes);

-- DADOS COMPLEMENTARES EMENDAS
CREATE TABLE IF NOT EXISTS simam.DadosComplementaresEmendas
(
    idPessoa UInt32,
    idTipoEsferaGoverno UInt32,
    idTipoEmenda UInt32,
    idTipoOperacaoEmenda UInt32,
    nrEmenda String,
    nrAnoEmenda UInt32,
    cdPlanoAcao Nullable(String),
    nrAnoPlanoAcao Nullable(UInt32),
    nrEmpenho UInt32,
    nrAnoEmpenho UInt32,
    idOrigemEmpenho UInt32,
    cdControle Nullable(String),
    leiLeiAto Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idTipoEsferaGoverno, idTipoEmenda);

