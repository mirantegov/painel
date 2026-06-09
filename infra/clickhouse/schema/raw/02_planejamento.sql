-- MÓDULO PLANEJAMENTO E ORÇAMENTO — 42 tabelas (raw)

CREATE TABLE IF NOT EXISTS simam_raw.Programa
(
    idPessoa Nullable(String),
    cdPrograma Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.MovimentoPrograma
(
    idPessoa Nullable(String),
    cdPrograma Nullable(String),
    cdControleLeiAtoPrograma Nullable(String),
    nrMovimento Nullable(String),
    idTipoMovimento Nullable(String),
    dtMovimento Nullable(String),
    nmPrograma Nullable(String),
    flFinalistico Nullable(String),
    dsObjetivo Nullable(String),
    cdControleLeiAtoMovimento Nullable(String),
    dsNotaExplicativa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.Indicador
(
    idPessoa Nullable(String),
    cdIndicador Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.MovimentoIndicador
(
    idPessoa Nullable(String),
    cdIndicador Nullable(String),
    cdControleLeiAtoIndicador Nullable(String),
    nrMovimento Nullable(String),
    idTipoMovimento Nullable(String),
    dtMovimento Nullable(String),
    idTipoIndicador Nullable(String),
    cdNaturezaIndicador Nullable(String),
    dsIndicador Nullable(String),
    idTipoPublicoAlvo Nullable(String),
    auferida Nullable(String),
    idUnidadeMedida Nullable(String),
    nrMedidaInicial Nullable(String),
    cdControleLeiAtoMovimento Nullable(String),
    dsNotaExplicativa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.MedidaEsperadaIndicador
(
    idPessoa Nullable(String),
    cdIndicador Nullable(String),
    cdControleLeiAto Nullable(String),
    nrAnoBaseS Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ProgramaXIndicador
(
    idPessoa Nullable(String),
    cdPrograma Nullable(String),
    cdControleLeiAtoPrograma Nullable(String),
    cdIndicador Nullable(String),
    cdControleLeiAtondicador Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.CancelamentoProgramaXIndicador
(
    idPessoa Nullable(String),
    cdPrograma Nullable(String),
    cdControleLeiAtoPrograma Nullable(String),
    cdIndicador Nullable(String),
    cdControleLeiAtoIndicador Nullable(String),
    dtCancelamento Nullable(String),
    dsNotaExplicativa Nullable(String),
    cdControleLeiAtoCancelamento Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.Acao
(
    idPessoa Nullable(String),
    cdAcao Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.MovimentoAcao
(
    idPessoa Nullable(String),
    cdAcao Nullable(String),
    cdControleLeiAtoAcao Nullable(String),
    nrMovimento Nullable(String),
    dtMovimento Nullable(String),
    idTipoMovimento Nullable(String),
    idExecutor Nullable(String),
    cdFuncao Nullable(String),
    cdSubFuncao Nullable(String),
    nrAno Nullable(String),
    idNaturezaAcao Nullable(String),
    idTipoExecucaoAcao Nullable(String),
    idTipoAcao Nullable(String),
    flAcaoContinua Nullable(String),
    dsAcao Nullable(String),
    idProduto Nullable(String),
    idUnidadeMedida Nullable(String),
    dtInicio Nullable(String),
    cdControleLei Nullable(String),
    dsNotaExplicativa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AcaoXPrograma
(
    idPessoa Nullable(String),
    cdAcao Nullable(String),
    cdControleLeiAtoAcao Nullable(String),
    cdPrograma Nullable(String),
    cdControleLeiAtoPrograma Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.CancelamentoAcaoXPrograma
(
    idPessoa Nullable(String),
    cdAcao Nullable(String),
    cdControleLeiAtoAcao Nullable(String),
    cdPrograma Nullable(String),
    cdControleLeiAtoPrograma Nullable(String),
    dtCancelamento Nullable(String),
    dsNotaExplicativa Nullable(String),
    cdControleLeiAtoCancelamento Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AcaoAno
(
    idPessoa Nullable(String),
    cdAcao Nullable(String),
    cdControleLeiAtoAcao Nullable(String),
    nrAno Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.MovimentoAcaoAno
(
    idPessoa Nullable(String),
    cdAcao Nullable(String),
    cdControleLeiAtoAcao Nullable(String),
    nrAno Nullable(String),
    nrMovimento Nullable(String),
    dtMovimento Nullable(String),
    idTipoMovimento Nullable(String),
    nrMetaFisica Nullable(String),
    vlOperacao Nullable(String),
    cdControleLeiAtoMovimento Nullable(String),
    dsNotaExplicativa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.CorrelacaoAcao
(
    idPessoa Nullable(String),
    cdAcao Nullable(String),
    cdControleLeiAtoAcao Nullable(String),
    cdAcaoCor Nullable(String),
    cdControleLeiAtoAcaoCor Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.CancelamentoCorrelacaoAcao
(
    idPessoa Nullable(String),
    cdAcao Nullable(String),
    cdControleLeiAtoAcao Nullable(String),
    cdAcaoCor Nullable(String),
    cdControleLeiAtoAcaoCor Nullable(String),
    dtCancelamento Nullable(String),
    dsNotaExplicativa Nullable(String),
    cdControleLeiAtoCancelamento Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AcaoNaoCorrelacionada
(
    idPessoa Nullable(String),
    nrOperacao Nullable(String),
    cdAcao Nullable(String),
    cdControleLeiAtoAcao Nullable(String),
    idTipoControleAcao Nullable(String),
    dsNotaExplicativa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.CorrelacaoAcaoAno
(
    idPessoa Nullable(String),
    cdAcao Nullable(String),
    cdControleLeiAtoAcao Nullable(String),
    nrAno Nullable(String),
    cdAcaoCor Nullable(String),
    cdControleLeiAtoAcaoCor Nullable(String),
    nrAnoCor Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.CancelamentoCorrelacaoAcaoAno
(
    idPessoa Nullable(String),
    cdAcao Nullable(String),
    cdControleLeiAtoAcao Nullable(String),
    nrAno Nullable(String),
    cdAcaoCor Nullable(String),
    cdControleLeiAtoAcaoCor Nullable(String),
    nrAnoCor Nullable(String),
    dtCancelamento Nullable(String),
    dsNotaExplicativa Nullable(String),
    cdControleLeiAtoCancelamento Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AcaoAnoNaoCorrelacionada
(
    idPessoa Nullable(String),
    nrOperacao Nullable(String),
    cdAcao Nullable(String),
    cdControleLeiAtoAcao Nullable(String),
    nrAno Nullable(String),
    idTipoControleAcao Nullable(String),
    dsNotaExplicativa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.CorrelacaoAcaoXProjetoAtividade
(
    idPessoa Nullable(String),
    idOrigemAcao Nullable(String),
    cdAcao Nullable(String),
    cdControleLeiAtoAcao Nullable(String),
    nrAno Nullable(String),
    cdProjetoAtividade Nullable(String),
    nrAnoProjetoAtividade Nullable(String),
    cdOrgao Nullable(String),
    cdUnidade Nullable(String),
    cdFuncao Nullable(String),
    cdSubFuncao Nullable(String),
    cdPrograma Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.CancelamentoCorrelacaoAcaoXProjetoAtividade
(
    idPessoa Nullable(String),
    idOrigemAcao Nullable(String),
    cdAcao Nullable(String),
    cdControleLeiAtoAcao Nullable(String),
    nrAno Nullable(String),
    cdProjetoAtividade Nullable(String),
    nrAnoProjetoAtividade Nullable(String),
    cdOrgao Nullable(String),
    cdUnidade Nullable(String),
    cdFuncao Nullable(String),
    cdSubFuncao Nullable(String),
    cdPrograma Nullable(String),
    dtCancelamento Nullable(String),
    dsNotaExplicativa Nullable(String),
    cdControleLeiAtoCancelamento Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ProjecaoReceita
(
    idPessoa Nullable(String),
    cdControleLeiAto Nullable(String),
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
    idExecutor Nullable(String),
    cdArea Nullable(String),
    nrAnoProjecao Nullable(String),
    vlEstimado Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AvaliacaoAcaoAno
(
    idPessoa Nullable(String),
    cdAcao Nullable(String),
    cdControleLeiAtoAcao Nullable(String),
    nrAno Nullable(String),
    nrRealizado Nullable(String),
    vlRealizado Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AvaliacaoIndicadorAno
(
    idPessoa Nullable(String),
    cdIndicador Nullable(String),
    cdControleLeiAto Nullable(String),
    nrAnoBase Nullable(String),
    nrMedidaRealizada Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.RiscosFiscaisLDO
(
    idPessoa Nullable(String),
    cdControleLeiAto Nullable(String),
    de Nullable(String),
    idRiscoFiscal Nullable(String),
    nrProvidencia Nullable(String),
    dsProvidencia Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.MetasAnuaisLDO
(
    cdControleLeiAto Nullable(String),
    nrAnoReferencia Nullable(String),
    vlResNomCorrente Nullable(String),
    vlResNomConstante Nullable(String),
    vlResNomPercPIB Nullable(String),
    vlDivPublicaCorrente Nullable(String),
    vlDivPublicaConstante Nullable(String),
    vlDivPublicaPercPIB Nullable(String),
    vlDivConsLiqCorrente Nullable(String),
    vlDivConsLiqConstante Nullable(String),
    vlDivConsLiqPercPIB Nullable(String),
    vlRecPrimPPPCorrente Nullable(String),
    vlRecPrimPPPpercPIB Nullable(String),
    vlDespPrimPPPCorrente Nullable(String),
    vlDespPrimPPPpercPIB Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ExpansaoDespesaContinuada
(
    idPessoa Nullable(String),
    cdControleLeiAto Nullable(String),
    vlTransfFUNDEB Nullable(String),
    vlRedPermDespesa Nullable(String),
    vlNovasDOCC Nullable(String),
    vlNovasDOCGeradasP Nullable(String),
    vlAumentoReceita Nullable(String),
    vlTransfConstitucionais Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.FonteReceita
(
    idPessoa Nullable(String),
    cdFonte Nullable(String),
    cdFontePadrao Nullable(String),
    cdOrigem Nullable(String),
    cdAplicacao Nullable(String),
    cdDesdobramento Nullable(String),
    cdDetalhamento Nullable(String),
    cdFontePadraoSTN Nullable(String),
    dsFonte Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.PlanoRecOrcamentaria
(
    idPessoa Nullable(String),
    cdCategoriaEconomica Nullable(String),
    cdOrigem Nullable(String),
    cdEspecie1 Nullable(String),
    cdDesdobramentoD Nullable(String),
    paraD2 Nullable(String),
    cdDesdobramentoD_2 Nullable(String),
    para3eita Nullable(String),
    cdNivel8 Nullable(String),
    cdNivel9 Nullable(String),
    cdNivel10 Nullable(String),
    cdNivel11 Nullable(String),
    cdNivel12 Nullable(String),
    nrAnoAplicacao Nullable(String),
    dsDesdobramento Nullable(String),
    cdTipoNivelConta Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.PlanoDespOrcamentaria
(
    idPessoa Nullable(String),
    cdCategoriaEconomica Nullable(String),
    cdGrupoNatureza Nullable(String),
    cdModalidade Nullable(String),
    cdElemento Nullable(String),
    cdDesdobramento Nullable(String),
    cdDetalhamento Nullable(String),
    nrAnoAplicacao Nullable(String),
    dsDesdobramento Nullable(String),
    cdTipoNivelConta Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.PrevisaoInicialReceita
(
    idPessoa Nullable(String),
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
    cdGrupoFonte Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.RevisaoPrevisaoInicialReceita
(
    idPessoa Nullable(String),
    nrOperacao Nullable(String),
    nrAnoOperacao Nullable(String),
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
    cdGrupoFonte Nullable(String),
    cdFonte Nullable(String),
    idTipoRevisao Nullable(String),
    nrMesRevisao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.PrevisaoAtualizadaReceita
(
    idPessoa Nullable(String),
    cdOrigem Nullable(String),
    cdEspecie Nullable(String),
    cdDesdobramentoD1 Nullable(String),
    cdDesdobramentoDD Nullable(String),
    cdDesdobramentoD3 Nullable(String),
    cdTipoNaturezaReceit Nullable(String),
    cdNivel8 Nullable(String),
    cdNivel9 Nullable(String),
    cdNivel10 Nullable(String),
    cdNivel11 Nullable(String),
    cdNivel12 Nullable(String),
    nrAnoAplicacao99 Nullable(String),
    cdGrupoFonte Nullable(String),
    cdFonte Nullable(String),
    nrMesRemessa Nullable(String),
    nrAnoRemessa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.PrevisaoInicialDespesa
(
    idPessoa Nullable(String),
    cdCategoriaEconomica Nullable(String),
    cdGrupoNatureza Nullable(String),
    cdModalidade Nullable(String),
    cdElemento Nullable(String),
    cdDesdobramento Nullable(String),
    cdDetalhamento Nullable(String),
    nrAnoAplicacao Nullable(String),
    idTipoCreditoInicial Nullable(String),
    da Nullable(String),
    cdOrgao Nullable(String),
    cdUnidade Nullable(String),
    cdFuncao Nullable(String),
    cdSubFuncao Nullable(String),
    cdPrograma Nullable(String),
    cdProjetoAtividade Nullable(String),
    cdMarcadorSTN Nullable(String),
    cdGrupoFonte Nullable(String),
    cdFonte Nullable(String),
    vlPrevisaoInicial Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.RevisaoPrevisaoInicialDespesa
(
    idPessoa Nullable(String),
    nrOperacao Nullable(String),
    nrAnoOperacao Nullable(String),
    cdCategoriaEconomica Nullable(String),
    cdGrupoNatureza Nullable(String),
    cdModalidade Nullable(String),
    cdElemento Nullable(String),
    cdDesdobramento Nullable(String),
    cdDetalhamento Nullable(String),
    nrAnoAplicacao Nullable(String),
    idTipoCreditoInicial Nullable(String),
    da Nullable(String),
    cdOrgao Nullable(String),
    cdUnidade Nullable(String),
    cdFuncao Nullable(String),
    cdSubFuncao Nullable(String),
    cdPrograma Nullable(String),
    cdProjetoAtividade Nullable(String),
    cdMarcadorSTN Nullable(String),
    cdGrupoFonte Nullable(String),
    cdFonte Nullable(String),
    idTipoRevisao Nullable(String),
    nrMesRevisao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AtualizacaoPrevisaoDespesa
(
    idPessoa Nullable(String),
    cdCategoriaEconomica Nullable(String),
    cdGrupoNatureza Nullable(String),
    cdModalidade Nullable(String),
    cdElemento Nullable(String),
    cdDesdobramento Nullable(String),
    cdDetalhamento Nullable(String),
    nrAnoAplicacao Nullable(String),
    idTipoAtualizacaoOrcamentaria Nullable(String),
    idTipoCreditoInicial Nullable(String),
    cdOrgao Nullable(String),
    cdUnidade Nullable(String),
    cdFuncao Nullable(String),
    cdSubFuncao Nullable(String),
    cdPrograma Nullable(String),
    cdProjetoAtividade Nullable(String),
    cdMarcadorSTN Nullable(String),
    cdGrupoFonte Nullable(String),
    cdFonte Nullable(String),
    vlOperacao Nullable(String),
    nrMesRemessa Nullable(String),
    nrAnoRemessa Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ExclusaoCreditoAdicional
(
    idPessoa Nullable(String),
    cdControleExclusao Nullable(String),
    cdControleLeiAto Nullable(String),
    idExecutor Nullable(String),
    idTipoCreditoAdicional Nullable(String),
    nrArtigo Nullable(String),
    idTipoExclusaoCreditoAdicional Nullable(String),
    dsArtigo Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.LeiCreditoAdicional
(
    idPessoa Nullable(String),
    cdControleLeiAto Nullable(String),
    idExecutor Nullable(String),
    idTipoCredito Nullable(String),
    idTipoRecurso Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.AtoAlteracaoOrcamentaria
(
    cdControleLeiAtoAutorizacao Nullable(String),
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

CREATE TABLE IF NOT EXISTS simam_raw.AlteracaoOrcamentaria
(
    idPessoa Nullable(String),
    cdControleLeiAtoAbertura Nullable(String),
    idTipoCreditoAdicional Nullable(String),
    idTipoRecursoCreditoAdicional Nullable(String),
    idTipoAlteracaoCreditoAdicional Nullable(String),
    cdOrgao Nullable(String),
    cdUnidade Nullable(String),
    cdFuncao Nullable(String),
    cdSubFuncao Nullable(String),
    cdProgramaLOA Nullable(String),
    cdProjetotividade Nullable(String),
    nrAnoFuncional Nullable(String),
    cdCategoriaconomica Nullable(String),
    cdGrupoatureza Nullable(String),
    cdModalidade Nullable(String),
    cdElemento Nullable(String),
    cdDesdobramento Nullable(String),
    cdDetalhamento Nullable(String),
    nrAnoAplicacao Nullable(String),
    cdMarcadorSTN Nullable(String),
    cdGrupoFonte Nullable(String),
    cdFonte Nullable(String),
    idPessoaTransferencia Nullable(String),
    idTipoOperacaoCreditoAdicional Nullable(String),
    vlOperacao Nullable(String),
    cdControleExclusao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.RevisaoAlteracaoOrcamentaria
(
    idPessoa Nullable(String),
    nrOperacao Nullable(String),
    nrAnoOperacao Nullable(String),
    cdControleLeiAtoAbertura Nullable(String),
    idTipoCreditoAdicional Nullable(String),
    idTipoRecursoCreditoAdicional Nullable(String),
    idTipoAlteracaoCreditoAdicional Nullable(String),
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
    cdMarcadorSTN Nullable(String),
    cdGrupoFonte Nullable(String),
    cdFonte Nullable(String),
    idTipoRevisao Nullable(String),
    vlRevisao Nullable(String),
    _id_entidade   Nullable(String),
    _exercicio     Nullable(String),
    _competencia   Nullable(String),
    _fonte         LowCardinality(String) DEFAULT '',
    _arquivo       String DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY tuple();

CREATE TABLE IF NOT EXISTS simam_raw.ProgramacaoFinanceira
(
    idPessoa Nullable(String),
    cdControleLeiAto Nullable(String),
    idTipoOperacaoProgramacaoFinanceira Nullable(String),
    nrMes Nullable(String),
    nrAno Nullable(String),
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

