-- MÓDULO CONTÁBIL — 80 tabelas (raw)

CREATE TABLE IF NOT EXISTS simam_raw.PlanoContabil
(
    idPessoa Nullable(String),
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
    dsConta Nullable(String),
    tpNaturezaSaldo Nullable(String),
    tpEscrituracao Nullable(String),
    tpNaturezaInformacao Nullable(String),
    tpSuperavitFinanceiro Nullable(String),
    tpControleConta Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.MovimentoContabilMensal
(
    idPessoa Nullable(String),
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
    nrMes Nullable(String),
    idTipoMovimentoContabil Nullable(String),
    idTipoFinanceiroPatrimonial Nullable(String),
    idTipoVariacaoQualitativa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.SaldoExercicioAnteriorRealizavel
(
    idPessoa Nullable(String),
    nrOperacao Nullable(String),
    nrAnoOperacao Nullable(String),
    cdFonte Nullable(String),
    nrAnoSaldo Nullable(String),
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
    tpDocDevedor Nullable(String),
    nrDocDevedor Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.DiarioContabilidade
(
    idPessoa Nullable(String),
    nrOperacao Nullable(String),
    nrAnoOperacao Nullable(String),
    dtOperacao Nullable(String),
    idTipoMovimentoContabil Nullable(String),
    idTipoFinanceiroPatrimonial Nullable(String),
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
    tpNaturezaSaldo Nullable(String),
    vlOperacao Nullable(String),
    idEventoPadrao Nullable(String),
    nrEventoEntidade Nullable(String),
    nrLancamento Nullable(String),
    dsHistorico Nullable(String),
    idTipoVariacaoQualitativa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.RealizacaoMensalReceitaFonte
(
    idPessoa Nullable(String),
    cdFonte Nullable(String),
    cdMarcadorSTN Nullable(String),
    cdCategoriaEconomica Nullable(String),
    cdOrigem Nullable(String),
    cdEspecie Nullable(String),
    cdDesdobramentoD1 Nullable(String),
    cdDesdobramentoDD2 Nullable(String),
    cdDesdobramentoD3 Nullable(String),
    cdTipoNaturezaReceita Nullable(String),
    cdNivel8 Nullable(String),
    cdNivel9 Nullable(String),
    cdNivel10 Nullable(String),
    cdNivel11 Nullable(String),
    cdNivel12 Nullable(String),
    nrAnoAplicacao Nullable(String),
    idTipoOperacaoReceita Nullable(String),
    nrMes Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoRealizacaoMensalReceitaFonte
(
    idPessoa Nullable(String),
    cdFonte Nullable(String),
    cdMarcadorSTN Nullable(String),
    cdCategoriaEconomica Nullable(String),
    cdOrigem Nullable(String),
    cdEspecie Nullable(String),
    cdDesdobramentoD1 Nullable(String),
    cdDesdobramentoDD2 Nullable(String),
    cdDesdobramentoD3 Nullable(String),
    cdTipoNaturezaReceita Nullable(String),
    cdNivel8 Nullable(String),
    cdNivel9 Nullable(String),
    cdNivel10 Nullable(String),
    cdNivel11 Nullable(String),
    cdNivel12 Nullable(String),
    nrAnoAplicacao Nullable(String),
    idTipoOperacaoReceita Nullable(String),
    nrMes Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.Empenho
(
    idPessoa Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    idOrigemEmpenho Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.DadoComplementarEmpenho
(
    idPessoa Nullable(String),
    nrOperacao Nullable(String),
    nrAnoOperacao Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    idOrigemEmpenho Nullable(String),
    idTipoDadoComplementarEmpenho Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrReversao Nullable(String),
    nrAnoReversao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.InscricaoRAP
(
    idPessoa Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    idOrigemEmpenho Nullable(String),
    nrAnoInscricaoProcessado Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.FonteEmpenhoCisaoFusao
(
    idPessoa Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    idOrigemEmpenho Nullable(String),
    cdFonteOrigem Nullable(String),
    cdFonteDestino Nullable(String),
    pela Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.TransferenciaEmpenhoCisaoFusao
(
    idPessoa Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    idOrigemEmpenho Nullable(String),
    idPessoaDestino Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.TransferenciaLiquidacaoCisaoFusao
(
    idPessoa Nullable(String),
    nrLiquidacao Nullable(String),
    nrAnoLiquidacao Nullable(String),
    idOrigemLiquidacao Nullable(String),
    idPessoaDestino Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EmpenhoXLicitacao
(
    idPessoa Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    idOrigemEmpenho Nullable(String),
    idOrigemLicitacao Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidade Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoEmpenho
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    idOrigemEmpenho Nullable(String),
    idTipoEstornoEmpenho Nullable(String),
    dtEstorno Nullable(String),
    dsMotivolSaldoAntDotacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ReversaoEstornoEmpenho
(
    idPessoa Nullable(String),
    nrReversao Nullable(String),
    nrAnoReversao Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    dtReversao Nullable(String),
    vlReversao Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.Liquidacao
(
    idPessoa Nullable(String),
    nrLiquidacao Nullable(String),
    nrAnoLiquidacao Nullable(String),
    idOrigemLiquidacao Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    dtLiquidacao Nullable(String),
    nrCPFLiquidanteLiquidacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.DocumentoFiscalLiquidacao
(
    idPessoa Nullable(String),
    nrLiquidacao Nullable(String),
    nrAnoLiquidacao Nullable(String),
    idOrigemLiquidacao Nullable(String),
    idTipoDocumentoFiscal Nullable(String),
    nrDocumento Nullable(String),
    idTipoSerieDocFiscal Nullable(String),
    dsTipoSerie Nullable(String),
    dtDocumento Nullable(String),
    vlDocumento Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.LiquidacaoQuantitativaEmpenho
(
    nrLiquidacao Nullable(String),
    nrAnoLiquidacaogemdacaooCategoriaoDespesaoObjetosagemLicitaca Nullable(String),
    entidade Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    idModalidadeLicitacao Nullable(String),
    nrLote Nullable(String),
    nrItem Nullable(String),
    tpDocumento Nullable(String),
    nrDocumento Nullable(String),
    idUnidadeMedida Nullable(String),
    nrQuantidade Nullable(String),
    vlLiquidado Nullable(String),
    vlDesconto Nullable(String),
    dsHistorico Nullable(String),
    nrEntrada Nullable(String),
    nrAnoEntradaQteEntrada Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EntradaQuantitativaAntesLiquidacao
(
    idPessoa Nullable(String),
    nrEntrada Nullable(String),
    nrAnoEntrada Nullable(String),
    idTipoCategoria Nullable(String),
    idTipoObjetoDespesa Nullable(String),
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
    flExisteEmpenho Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    diferente Nullable(String),
    nrDespesa Nullable(String),
    nrAnoDespesa Nullable(String),
    entidade Nullable(String),
    nrLicitacao Nullable(String),
    nrAnoLicitacao Nullable(String),
    nrLote Nullable(String),
    nrItem Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.EstornoLiquidacao
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrLiquidacao Nullable(String),
    nrAnoLiquidacao Nullable(String),
    idOrigemLiquidacao Nullable(String),
    dtEstorno Nullable(String),
    vlEstornoA Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoDocumentoFiscalLiquidacao
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrLiquidacao Nullable(String),
    nrAnoLiquidacao Nullable(String),
    idOrigemLiquidacao Nullable(String),
    idTipoDocumento Nullable(String),
    conformeFiscal Nullable(String),
    nrDocumento Nullable(String),
    idTipoSerieDocFiscal Nullable(String),
    dsTipoSerie Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoLiquidacaoQuantitativaEmpenho
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrOperacao Nullable(String),
    nrAnoOperacao Nullable(String),
    nrQuantidade Nullable(String),
    vlEstorno Nullable(String),
    vlEstornoDesconto Nullable(String),
    nrEntrada Nullable(String),
    nrAnoEntrada Nullable(String),
    nrEstornoQteEntrada Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.Pagamento
(
    idPessoa Nullable(String),
    nrPagamento Nullable(String),
    nrAnoPagamento Nullable(String),
    idTipoOperacaoPagamento Nullable(String),
    nrLiquidacao Nullable(String),
    do Nullable(String),
    idOrigemLiquidacaoOperacao Nullable(String),
    vlOperacao Nullable(String),
    nrOperacaoBancoCaixa Nullable(String),
    nrAnoOperacaoBancoCaixa Nullable(String),
    tpDocResponsavel Nullable(String),
    nrDocResponsavel Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoPagamento
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    idTipoOperacaoPagamento Nullable(String),
    nrPagamento Nullable(String),
    nrAnoPagamento Nullable(String),
    dtEstorno Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.MovimentoRealizavel
(
    idPessoa Nullable(String),
    nrRealizavel Nullable(String),
    nrAnoRealizavel Nullable(String),
    idTipoMovimentoealizavel Nullable(String),
    cdFonte Nullable(String),
    cdClassedGrupodSubGrupodTitulodSubTitulodItemdSubItemdNivel8dNivel9dNivel10dNivel11dNivel12 Nullable(String),
    nrAnoAplicacao Nullable(String),
    idOrigemDestino Nullable(String),
    tpDocDevedor Nullable(String),
    nrDocDevedor Nullable(String),
    dtOperacao Nullable(String),
    vlOperacao Nullable(String),
    dsNotaExplicativa Nullable(String),
    nrOperacaoBancoCaixa Nullable(String),
    nrAnoOperacaoBancoCaixa Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    idOrigemEmpenho Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoMovimentoRealizavel
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrRealizavel Nullable(String),
    nrAnoRealizavel Nullable(String),
    dtEstorno Nullable(String),
    vlEstorno Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.DepositoRestituivelPassivo
(
    idPessoa Nullable(String),
    nrDeposito Nullable(String),
    nrAnoDeposito Nullable(String),
    idTipoDepositoituivelPassivo Nullable(String),
    cdFonte Nullable(String),
    cdClasseupobGrupotulobTituloembItemvel8vel9vel10vel11vel12 Nullable(String),
    nrAnoAplicacao Nullable(String),
    idOrigemDestino Nullable(String),
    tpDocCredor Nullable(String),
    nrDocCredorD9 Nullable(String),
    dsNotaExplicativa Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    idOrigemEmpenho Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoDepositoRestituivelPassivo
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrDeposito Nullable(String),
    nrAnoDeposito Nullable(String),
    dtEstorno Nullable(String),
    vlEstorno Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.TransferenciaFinanceira
(
    idPessoa Nullable(String),
    nrTransferencia Nullable(String),
    nrAnoTransferencia Nullable(String),
    idOrigemDestino Nullable(String),
    idTipoOperacaoPagamento Nullable(String),
    idTipoFluxoInterferencia Nullable(String),
    idTipoNaturezaTransferencia Nullable(String),
    vlOperacao Nullable(String),
    dtOperacao Nullable(String),
    nrOperacaoBancoCaixa Nullable(String),
    nrAnoOperacaoBancoCaixa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoTransferenciaFinanceira
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrTransferencia Nullable(String),
    nrAnoTransferencia Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.DespesaNaoEmpenhada
(
    idPessoa Nullable(String),
    nrDespesa Nullable(String),
    nrAnoDespesa Nullable(String),
    cdOrgao Nullable(String),
    cdUnidade Nullable(String),
    cdFuncao Nullable(String),
    cdSubFuncao Nullable(String),
    cdProgramaLOA Nullable(String),
    cdProjetoAtividade Nullable(String),
    nrAnoFuncional Nullable(String),
    cdCategoriaEconomica Nullable(String),
    cdGrupoNatureza Nullable(String),
    cdModalidade Nullable(String),
    cdElemento Nullable(String),
    cdDesdobramento Nullable(String),
    cdDetalhamento Nullable(String),
    nrAnoAplicacao Nullable(String),
    tpDocOrdenador Nullable(String),
    nrDocOrdenador Nullable(String),
    dtDocumento Nullable(String),
    tpDocCredor Nullable(String),
    nrDocCredor Nullable(String),
    idTipoDocumentoFiscal Nullable(String),
    nrDocumento Nullable(String),
    idTipoSerieDocFiscal Nullable(String),
    dsTipoSerie Nullable(String),
    vlDocumento Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoDespesaNaoEmpenhada
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrDespesa Nullable(String),
    nrAnoDespesa Nullable(String),
    dtEstorno Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.ApropriacaoDespesaNaoEmpenhada
(
    idPessoa Nullable(String),
    nrOperacao Nullable(String),
    nrAnoOperacao Nullable(String),
    nrDespesa Nullable(String),
    nrAnoDespesa Nullable(String),
    dtOperacao Nullable(String),
    nrLiquidacao Nullable(String),
    nrAnoLiquidacao Nullable(String),
    idOrigemLiquidacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.PagamentoDespesaNaoEmpenhada
(
    idPessoa Nullable(String),
    nrPagamento Nullable(String),
    nrAnoPagamento Nullable(String),
    idTipoOperacaoPagamento Nullable(String),
    nrDespesa Nullable(String),
    nrAnoDespesa Nullable(String),
    dtOperacao Nullable(String),
    nrOperacaoBancoCaixa Nullable(String),
    nrAnoOperacaoBancoCaixa Nullable(String),
    tpDocResponsavel Nullable(String),
    nrDocResponsavel Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoPagamentoDespesaNaoEmpenhada
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrPagamento Nullable(String),
    nrAnoPagamento Nullable(String),
    idTipoOperacaoPagamento Nullable(String),
    dtEstorno Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.Divida
(
    idPessoa Nullable(String),
    nrDivida Nullable(String),
    nrAnoDivida Nullable(String),
    idTipoOrigemDivida Nullable(String),
    idTipoNaturezaDivida Nullable(String),
    idTipoGrupoDivida Nullable(String),
    idTipoDivida Nullable(String),
    cdControleLeiAto Nullable(String),
    nrOficioSTN Nullable(String),
    dtOficioSTN Nullable(String),
    dsDivida Nullable(String),
    dtAssinaturaContratoontratogemvida Nullable(String),
    nrQteParcelatratadateParcelaa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.SaldoAnteriorDivida
(
    idPessoa Nullable(String),
    nrDivida Nullable(String),
    nrAnoDivida Nullable(String),
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
    idTipoFinanceiroPatrimonial Nullable(String),
    vlSaldo Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.IngressoAtualizacaoDivida
(
    idPessoa Nullable(String),
    nrIngresso Nullable(String),
    nrAnoIngresso Nullable(String),
    nrDivida Nullable(String),
    nrAnoDividatOperacao Nullable(String),
    idTipoOperacaoDivida Nullable(String),
    vlOperacao Nullable(String),
    nrOperacaoBancoCaixa Nullable(String),
    nrAnoOperacaoBancoCaixa Nullable(String),
    nrParcelaRecebida Nullable(String),
    cdClasse Nullable(String),
    cdGrupo Nullable(String),
    cdSubGrupo Nullable(String),
    cdTituloubTitulotemubItemivel8ivel9ivel10ivel11ivel12 Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.EstornoIngressoAtualizacaoDivida
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrIngresso Nullable(String),
    nrAnoIngresso Nullable(String),
    dtEstorno Nullable(String),
    vlEstorno Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.RegistroPermutativoStatusDivida
(
    idPessoa Nullable(String),
    nrOperacao Nullable(String),
    nrDivida Nullable(String),
    nrAnoDivida Nullable(String),
    idTipoPermutaStatusDivida Nullable(String),
    cdClasse Nullable(String),
    cdGrupo Nullable(String),
    cdSubGrupo Nullable(String),
    cdTitulo Nullable(String),
    cdSubTitulo Nullable(String),
    cdItem Nullable(String),
    cdSubItem Nullable(String),
    nrAnoAplicacao Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    idOrigem Nullable(String),
    dtOperacao9 Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoRegistroPermutativoStatusDivida
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrOperacaotEstorno Nullable(String),
    vlEstorno Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.BaixaDivida
(
    idPessoa Nullable(String),
    nrBaixa Nullable(String),
    nrAnoBaixa Nullable(String),
    nrDivida Nullable(String),
    nrAnoDivida Nullable(String),
    dtOperacao Nullable(String),
    idTipoOperacaoDivida Nullable(String),
    vlOperacao Nullable(String),
    nrOperacaoBancoCaixa Nullable(String),
    nrAnoOperacaoBancoCaixa Nullable(String),
    nrParcela Nullable(String),
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
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoBaixaDivida
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrBaixa Nullable(String),
    nrAnoBaixa Nullable(String),
    dtEstorno Nullable(String),
    vlEstorno Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.ExecucaoAntecipadaOperacaoCredito
(
    idPessoa Nullable(String),
    nrExecucao Nullable(String),
    nrAnoExecucao Nullable(String),
    nrDivida Nullable(String),
    nrAnoDivida Nullable(String),
    idTipoExecucaoAntecipada Nullable(String),
    dtExecucao Nullable(String),
    nrOperacaoBancoOrigem Nullable(String),
    nrAnoOperacaoBancoOrigem Nullable(String),
    nrOperacaoBancoDestino Nullable(String),
    nrAnoOperacao Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoExecucaoAntecipadaOperacaoCredito
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrExecucao Nullable(String),
    nrAnoExecucao Nullable(String),
    dtEstorno Nullable(String),
    vlEstorno Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.Convenio
(
    idPessoa Nullable(String),
    nrConvenio Nullable(String),
    nrAnoConvenio Nullable(String),
    tpEsferaGoverno Nullable(String),
    nrTermo Nullable(String),
    dtCelebracao Nullable(String),
    dtInicioVigencia Nullable(String),
    dtFimVigencia Nullable(String),
    nrDiarioOficial Nullable(String),
    nrAnoDiarioOficial Nullable(String),
    dtPublicacaoDiario Nullable(String),
    nrCNPJDiario Nullable(String),
    nrCNPJOrigemDestino Nullable(String),
    vlConveniolRecursoProprio Nullable(String),
    idUnidadeMedidarMetaFisicasObjeto Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.SituacaoConvenio
(
    idPessoa Nullable(String),
    nrConvenio Nullable(String),
    nrAnoConvenio Nullable(String),
    nrSequencial Nullable(String),
    dtOperacao Nullable(String),
    idTipoSituacaoConvenio Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.AditivoConvenio
(
    idPessoa Nullable(String),
    nrAditivo Nullable(String),
    nrAnoAditivo Nullable(String),
    nrConvenio Nullable(String),
    nrAnoConvenio Nullable(String),
    idTipoAditivoConvenio Nullable(String),
    nrTermoAditivo Nullable(String),
    nrDiarioOficial Nullable(String),
    nrAnoDiarioOficial Nullable(String),
    nrCNPJDiario Nullable(String),
    dsAditivo Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.CancelamentoAditivoConvenio
(
    idPessoa Nullable(String),
    nrAditivo Nullable(String),
    nrAnoAditivo Nullable(String),
    dtCancelamento Nullable(String),
    do Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.ConvenioXFonte
(
    idPessoa Nullable(String),
    nrConvenio Nullable(String),
    nrAnoConvenio Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.SaldoExercicioAnteriorContrapExecAntecipada
(
    idPessoa Nullable(String),
    nrAnoAplicacao Nullable(String),
    idTipoExecucaoAntecipada Nullable(String),
    idTipoContrapartidaExecucaoAntecipada Nullable(String),
    cdFonteOrigem Nullable(String),
    cdFonteDestino Nullable(String),
    vlSaldo Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ContrapartidaExecAntConvenio
(
    idPessoa Nullable(String),
    nrExecucao Nullable(String),
    nrAnoExecucao Nullable(String),
    nrConvenio Nullable(String),
    nrAnoConvenio Nullable(String),
    idTipoExecucaoAntecipada Nullable(String),
    dtExecucao Nullable(String),
    nrOperacaoBancoOrigem Nullable(String),
    nrAnoOperacaoBancoOrigem Nullable(String),
    nrOperacaoBancoDestino Nullable(String),
    nrAnoOperacao Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenhoE Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EstornoContrapartidaExecAntConvenio
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrExecucao Nullable(String),
    nrAnoExecucao Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.EmpenhoXConvenio
(
    idPessoa Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    idOrigemEmpenho Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.FonteXConvenioSIT
(
    cdFonte Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.EmpenhoXConvenioSIT
(
    idPessoa Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    idOrigemEmpenho Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.ContrapartidaExecAntConvenioSIT
(
    idPessoa Nullable(String),
    nrExecucao Nullable(String),
    nrAnoExecucao Nullable(String),
    idTipoExecucaoAntecipada Nullable(String),
    dtExecucao Nullable(String),
    nrOperacaoBancoOrigem Nullable(String),
    nrAnoOperacaoBancoOrigem Nullable(String),
    nrOperacaoBancoDestino Nullable(String),
    nrAnoOperacaoBancoDestino Nullable(String),
    vlExecucao Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    idOrigemEmpenho Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.RegularizacaoTransferenciaSIT
(
    idPessoa Nullable(String),
    nrExecucao Nullable(String),
    nrAnoExecucao Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.EstornoContrapartidaExecAntConvenioSIT
(
    idPessoa Nullable(String),
    nrEstorno Nullable(String),
    nrAnoEstorno Nullable(String),
    nrExecucao Nullable(String),
    nrAnoExecucao Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.CisaoFusao
(
    idPessoa Nullable(String),
    cdClasseOrigem Nullable(String),
    nrAnoAplicacao Nullable(String),
    tpNaturezaSaldo Nullable(String),
    cdClassePL Nullable(String),
    conta Nullable(String),
    conta_2 Nullable(String),
    conta_3 Nullable(String),
    conta_4 Nullable(String),
    conta_5 Nullable(String),
    conta_6 Nullable(String),
    conta_7 Nullable(String),
    conta_8 Nullable(String),
    conta_9 Nullable(String),
    conta_10 Nullable(String),
    nrAnoAplicacaoP Nullable(String),
    tpNaturezaSaldoP Nullable(String),
    valorestabela Nullable(String),
    nrOperacao Nullable(String),
    nrAnoOperacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.FonteCisaoFusao
(
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
    cdFonteOrigem Nullable(String),
    cdFonteDestino Nullable(String),
    idOrigemDestino Nullable(String),
    idTipoOperacao Nullable(String),
    naCisaoFusao Nullable(String),
    vlOperacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.EmpenhoXContrato
(
    idPessoa Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    idOrigemEmpenho Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.Diaria
(
    doConcessao Nullable(String),
    dtInicio Nullable(String),
    dtFim Nullable(String),
    nrDiaria Nullable(String),
    vlDiaria Nullable(String),
    vlTotalDiaria Nullable(String),
    cdIBGE Nullable(String),
    sgUF Nullable(String),
    idTipoObjetivoDiaria Nullable(String),
    dsObjetivo Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.PlanoContabilEstatal
(
    dsConta Nullable(String),
    acordopresentes Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.BalanceteMensalEstatalXPlanoContabil
(
    idPessoa Nullable(String),
    nrMes Nullable(String),
    cdContaContabil Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.QuadroDeliberativoExecutivo
(
    idPessoa Nullable(String),
    nrOperacao Nullable(String),
    nrCPFComponente Nullable(String),
    idTipoNaturezaQuadroEstatal Nullable(String),
    idTipoFuncaoQuadroEstatal Nullable(String),
    dtInicio Nullable(String),
    dtFim Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.BaixaQuadroDeliberativoExecutivo
(
    idPessoa Nullable(String),
    nrOperacao Nullable(String),
    dtBaixa Nullable(String),
    cdControleLeiAtoBaixa Nullable(String),
    idTipoBaixaQuadroDeliberativoExecutivo Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.AlteracaoContaContabil
(
    idPessoa Nullable(String),
    idTipoOperacao Nullable(String),
    nrOperacao Nullable(String),
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
    dtOperacao Nullable(String),
    dsJustificativa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AlteracaoContaContabilEntreExercicios
(
    idPessoa Nullable(String),
    cdClasseAnterior Nullable(String),
    cdGrupoAnterior Nullable(String),
    cdSubGrupoAnterior Nullable(String),
    cdTituloAnterior Nullable(String),
    cdSubTituloAnterior Nullable(String),
    cdItemAnterior Nullable(String),
    cdSubItemAnterior Nullable(String),
    cdNivel8Anterior Nullable(String),
    cdNivel9Anterior Nullable(String),
    cdNivel10Anterior Nullable(String),
    cdNivel11Anterior Nullable(String),
    cdNivel12Anterior Nullable(String),
    nrAnoAplicacaoAnterior Nullable(String),
    cdClasseAtual Nullable(String),
    cdGrupoAtual Nullable(String),
    cdSubGrupoAtual Nullable(String),
    cdTituloAtual Nullable(String),
    cdSubTituloAtual Nullable(String),
    cdItemAtual Nullable(String),
    cdSubItemAtual Nullable(String),
    cdNivel8Atual Nullable(String),
    cdNivel9Atual Nullable(String),
    cdNivel10Atual Nullable(String),
    cdNivel11Atual Nullable(String),
    cdNivel12Atual Nullable(String),
    nrAnoAplicacaoAtual Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.FornecedorRepresentanteSiafic
(
    idPessoa Nullable(String),
    flSiaficProprio Nullable(String),
    tpDocFornecedor Nullable(String),
    nrDocFornecedor Nullable(String),
    tpDocRepresentante Nullable(String),
    nrDocRepresentante Nullable(String),
    nrAno Nullable(String),
    nrMes Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.CadastroConsorcio
(
    idPessoa Nullable(String),
    idTipoAreaConsorcioipoOperacaoAreaCorcioipoNaturezaidicaConsorcioperacao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ConsorcioXMunicipio
(
    idPessoa Nullable(String),
    idPessoaMunicipio Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.BaixaMunicipioConsorciado
(
    idPessoa Nullable(String),
    idPessoaMunicipiotInicioVinculotBaixa Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.MunicipioConsorciadoSemRepasse
(
    idPessoa Nullable(String),
    nrAno Nullable(String),
    idPessoaMunicipio Nullable(String),
    flAtivo Nullable(String),
    flOcorreuRepasse Nullable(String),
    dsJustificativa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.CadastroContratoRateioPrograma
(
    idPessoa Nullable(String),
    nrContratoConsorcio Nullable(String),
    nrAnoContratoConsorcio Nullable(String),
    idTipoContratoConsorcio Nullable(String),
    idPessoaMunicipio Nullable(String),
    dtAssinatura Nullable(String),
    dsObjeto Nullable(String),
    dtInicio Nullable(String),
    dtFim Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.ValorContratoRateioPrograma
(
    idPessoa Nullable(String),
    nrContratoConsorcio Nullable(String),
    nrAnoContratoConsorcio Nullable(String),
    idTipoContratoConsorcio Nullable(String),
    idPessoaMunicipio Nullable(String),
    cdCategoriaEconomica Nullable(String),
    cdGrupoNatureza Nullable(String),
    cdModalidade Nullable(String),
    cdElemento Nullable(String),
    cdDesdobramento Nullable(String),
    cdDetalhamento Nullable(String),
    nrAnoAplicacao Nullable(String),
    vlElemento Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AditivoContratoRateioPrograma
(
    idPessoa Nullable(String),
    nrAditivoContratoCon Nullable(String),
    sorcio Nullable(String),
    nrAnoAditivoContratoConsorcio Nullable(String),
    idPessoaMunicipioAditivo Nullable(String),
    nrContratoConsorcio Nullable(String),
    nrAnoContratoConsorcio Nullable(String),
    idTipoContratoConsorcio Nullable(String),
    idPessoaMunicipio Nullable(String),
    dtAssinatura Nullable(String),
    dtFimVigenciaAditivo Nullable(String),
    cdControleLeiAto Nullable(String),
    vlTotalAditivo Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ValorAditivoContratoRateioPrograma
(
    idPessoa Nullable(String),
    nrAditivoContratoCon Nullable(String),
    sorcio Nullable(String),
    nrAnoAditivoContratoConsorcio Nullable(String),
    idPessoaMunicipioAditivo Nullable(String),
    nrContratoConsorcio Nullable(String),
    nrAnoContratoConsorcio Nullable(String),
    idTipoContratoConsorcio Nullable(String),
    idPessoaMunicipio Nullable(String),
    cdCategoriaEconomica Nullable(String),
    cdGrupoNatureza Nullable(String),
    cdModalidade Nullable(String),
    cdElemento Nullable(String),
    cdDesdobramento Nullable(String),
    cdDetalhamento Nullable(String),
    nrAnoAplicacaolElemento Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.DadosPortalTransparencia
(
    idPessoa Nullable(String),
    nrAno Nullable(String),
    nrMes Nullable(String),
    flPublicaDadostal Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.DadosComplementaresEmendas
(
    idPessoa Nullable(String),
    idTipoEsferaGoverno Nullable(String),
    idTipoEmenda Nullable(String),
    idTipoOperacaoEmenda Nullable(String),
    nrEmenda Nullable(String),
    nrAnoEmenda Nullable(String),
    cdPlanoAcao Nullable(String),
    nrAnoPlanoAcao Nullable(String),
    nrEmpenho Nullable(String),
    nrAnoEmpenho Nullable(String),
    idOrigemEmpenho Nullable(String),
    cdControle Nullable(String),
    leiLeiAto Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

