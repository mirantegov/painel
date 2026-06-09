-- MÓDULO PLANEJAMENTO E ORÇAMENTO — 42 tabelas (simam)

-- CADASTRO DOS PROGRAMAS
CREATE TABLE IF NOT EXISTS simam.Programa
(
    idPessoa UInt32,
    cdPrograma String,
    cdControleLeiAto UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdPrograma, cdControleLeiAto);

-- CADASTRO DA MOVIMENTAÇÃO DOS PROGRAMAS
CREATE TABLE IF NOT EXISTS simam.MovimentoPrograma
(
    idPessoa UInt32,
    cdPrograma String,
    cdControleLeiAtoPrograma UInt32,
    nrMovimento UInt32,
    idTipoMovimento UInt32,
    dtMovimento Date32,
    nmPrograma String,
    flFinalistico String,
    dsObjetivo String,
    cdControleLeiAtoMovimento Nullable(UInt32),
    dsNotaExplicativa Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdPrograma, cdControleLeiAtoPrograma);

-- CADASTRO DE INDICADORES
CREATE TABLE IF NOT EXISTS simam.Indicador
(
    idPessoa UInt32,
    cdIndicador UInt32,
    cdControleLeiAto UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdIndicador, cdControleLeiAto);

-- CADASTRO DA MOVIMENTAÇÃO DOS DADOS DOS INDICADORES
CREATE TABLE IF NOT EXISTS simam.MovimentoIndicador
(
    idPessoa UInt32,
    cdIndicador UInt32,
    cdControleLeiAtoIndicador UInt32,
    nrMovimento UInt32,
    idTipoMovimento UInt32,
    dtMovimento Date32,
    idTipoIndicador UInt32,
    cdNaturezaIndicador String,
    dsIndicador String,
    idTipoPublicoAlvo UInt32,
    auferida Date32,
    idUnidadeMedida UInt32,
    nrMedidaInicial String,
    cdControleLeiAtoMovimento Nullable(UInt32),
    dsNotaExplicativa Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdIndicador, cdControleLeiAtoIndicador);

-- CADASTRO DE MEDIDAS ANUAIS ESPERADAS DOS INDICADORES
CREATE TABLE IF NOT EXISTS simam.MedidaEsperadaIndicador
(
    idPessoa UInt32,
    cdIndicador UInt32,
    cdControleLeiAto UInt32,
    nrAnoBaseS UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdIndicador, cdControleLeiAto);

-- VINCULAÇÃO DOS PROGRAMAS COM OS RESPECTIVOS INDICADORES
CREATE TABLE IF NOT EXISTS simam.ProgramaXIndicador
(
    idPessoa UInt32,
    cdPrograma String,
    cdControleLeiAtoPrograma UInt32,
    cdIndicador UInt32,
    cdControleLeiAtondicador UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdPrograma, cdControleLeiAtoPrograma);

-- CANCELAMENTO DO VÍNCULO DOS PROGRAMAS COM OS INDICADORES
CREATE TABLE IF NOT EXISTS simam.CancelamentoProgramaXIndicador
(
    idPessoa UInt32,
    cdPrograma String,
    cdControleLeiAtoPrograma UInt32,
    cdIndicador UInt32,
    cdControleLeiAtoIndicador UInt32,
    dtCancelamento Date32,
    dsNotaExplicativa String,
    cdControleLeiAtoCancelamento Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdPrograma, cdControleLeiAtoPrograma);

-- CADASTRO DE AÇÕES
CREATE TABLE IF NOT EXISTS simam.Acao
(
    idPessoa UInt32,
    cdAcao String,
    cdControleLeiAto UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdAcao, cdControleLeiAto);

-- CADASTRO DA MOVIMENTAÇÃO DAS AÇÕES
CREATE TABLE IF NOT EXISTS simam.MovimentoAcao
(
    idPessoa UInt32,
    cdAcao String,
    cdControleLeiAtoAcao UInt32,
    nrMovimento UInt32,
    dtMovimento Date32,
    idTipoMovimento UInt32,
    idExecutor UInt32,
    cdFuncao String,
    cdSubFuncao String,
    nrAno UInt32,
    idNaturezaAcao UInt32,
    idTipoExecucao UInt32,
    idTipoAcao UInt32,
    flAcaoContinua String,
    dsAcao String,
    idProduto UInt32,
    idUnidadeMedida UInt32,
    dtInicio Date32,
    cdControleLei Nullable(UInt32),
    dsNotaExplicativa Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdAcao, cdControleLeiAtoAcao);

-- AÇÕES VINCULADAS COM OS RESPECTIVOS PROGRAMAS
CREATE TABLE IF NOT EXISTS simam.AcaoXPrograma
(
    idPessoa UInt32,
    cdAcao String,
    cdControleLeiAtoAcao UInt32,
    cdPrograma String,
    cdControleLeiAtoPrograma UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdAcao, cdControleLeiAtoAcao);

-- CANCELAMENTO DO VÍNCULO DAS AÇÕES COM OS PROGRAMAS
CREATE TABLE IF NOT EXISTS simam.CancelamentoAcaoXPrograma
(
    idPessoa UInt32,
    cdAcao String,
    cdControleLeiAtoAcao UInt32,
    cdPrograma String,
    cdControleLeiAtoPrograma UInt32,
    dtCancelamento Date32,
    dsNotaExplicativa String,
    cdControleLeiAtoCancelamento Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdAcao, cdControleLeiAtoAcao);

-- CADASTRO DAS AÇÕES ANUAIS VINCULADAS COM OS PROGRAMAS
CREATE TABLE IF NOT EXISTS simam.AcaoAno
(
    idPessoa UInt32,
    cdAcao String,
    cdControleLeiAtoAcao UInt32,
    nrAno UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdAcao, cdControleLeiAtoAcao);

-- CADASTRO DO MOVIMENTO DAS AÇÕES ANUAIS COM OS PROGRAMAS
CREATE TABLE IF NOT EXISTS simam.MovimentoAcaoAno
(
    idPessoa UInt32,
    cdAcao String,
    cdControleLeiAtoAcao UInt32,
    nrAno UInt32,
    nrMovimento UInt32,
    dtMovimento Date32,
    idTipoMovimento UInt32,
    nrMetaFisica String,
    vlOperacao Decimal(18,2),
    cdControleLeiAtoMovimento Nullable(UInt32),
    dsNotaExplicativa Nullable(String),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdAcao, cdControleLeiAtoAcao);

-- CORRELAÇÃO DAS AÇÕES DOS PLANOS
CREATE TABLE IF NOT EXISTS simam.CorrelacaoAcao
(
    idPessoa UInt32,
    cdAcao String,
    cdControleLeiAtoAcao UInt32,
    cdAcaoCor String,
    cdControleLeiAtoAcaoCor UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdAcao, cdControleLeiAtoAcao);

-- CANCELAMENTO DA CORRELAÇÃO DAS AÇÕES ANUAIS
CREATE TABLE IF NOT EXISTS simam.CancelamentoCorrelacaoAcao
(
    idPessoa UInt32,
    cdAcao String,
    cdControleLeiAtoAcao UInt32,
    cdAcaoCor String,
    cdControleLeiAtoAcaoCor UInt32,
    dtCancelamento Date32,
    dsNotaExplicativa String,
    cdControleLeiAtoCancelamento Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdAcao, cdControleLeiAtoAcao);

-- AÇÕES DOS INSTRUMENTOS DE PLANEJAMENTO SEM CORRELAÇÃO
CREATE TABLE IF NOT EXISTS simam.AcaoNaoCorrelacionada
(
    idPessoa UInt32,
    nrOperacao UInt32,
    cdAcao String,
    cdControleLeiAtoAcao UInt32,
    idTipoControleAcao UInt32,
    dsNotaExplicativa String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrOperacao, cdAcao);

-- CORRELAÇÃO DOS VALORES ANUAIS DAS AÇÕES
CREATE TABLE IF NOT EXISTS simam.CorrelacaoAcaoAno
(
    idPessoa UInt32,
    cdAcao String,
    cdControleLeiAtoAcao UInt32,
    nrAno UInt32,
    cdAcaoCor String,
    cdControleLeiAtoAcaoCor UInt32,
    nrAnoCor UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdAcao, cdControleLeiAtoAcao);

-- CANCELAMENTO DA CORRELAÇÃO DAS AÇÕES ANUAIS
CREATE TABLE IF NOT EXISTS simam.CancelamentoCorrelacaoAcaoAno
(
    idPessoa UInt32,
    cdAcao String,
    cdControleLeiAtoAcao UInt32,
    nrAno UInt32,
    cdAcaoCor String,
    cdControleLeiAtoAcaoCor UInt32,
    nrAnoCor UInt32,
    dtCancelamento Date32,
    dsNotaExplicativa String,
    cdControleLeiAtoCancelamento Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdAcao, cdControleLeiAtoAcao);

-- AÇÕES ANUAIS DOS INSTRUMENTOS DE PLANEJAMENTO SEM CORRELAÇÃO
CREATE TABLE IF NOT EXISTS simam.AcaoAnoNaoCorrelacionada
(
    idPessoa UInt32,
    nrOperacao String,
    cdAcao String,
    cdControleLeiAtoAcao UInt32,
    nrAno UInt32,
    idTipoControleAcao UInt32,
    dsNotaExplicativa String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrOperacao, cdAcao);

-- CORRELAÇÃO DAS AÇÕES COM A LEI ORÇAMENTÁRIA ANUAL
CREATE TABLE IF NOT EXISTS simam.CorrelacaoAcaoXProjetoAtividade
(
    idPessoa UInt32,
    idOrigemAcao UInt32,
    cdAcao String,
    cdControleLeiAtoAcao UInt32,
    nrAno UInt32,
    cdProjetoAtividade String,
    nrAnoProjetoAtividade UInt32,
    cdOrgao String,
    cdUnidade String,
    cdFuncao String,
    cdSubFuncao String,
    cdPrograma String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idOrigemAcao, cdAcao);

-- ATIVIDADES
CREATE TABLE IF NOT EXISTS simam.CancelamentoCorrelacaoAcaoXProjetoAtividade
(
    idPessoa UInt32,
    idOrigemAcao UInt32,
    cdAcao String,
    cdControleLeiAtoAcao UInt32,
    nrAno UInt32,
    cdProjetoAtividade String,
    nrAnoProjetoAtividade UInt32,
    cdOrgao String,
    cdUnidade String,
    cdFuncao String,
    cdSubFuncao String,
    cdPrograma String,
    dtCancelamento Date32,
    dsNotaExplicativa String,
    cdControleLeiAtoCancelamento Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, idOrigemAcao, cdAcao);

-- PROJEÇÃO RECEITAS
CREATE TABLE IF NOT EXISTS simam.ProjecaoReceita
(
    idPessoa UInt32,
    cdControleLeiAto UInt32,
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
    idExecutor UInt32,
    cdArea UInt32,
    nrAnoProjecao Nullable(UInt32),
    vlEstimado Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdControleLeiAto, cdCategoriaEconomica);

-- AVALIAÇÃO ANUAL DAS AÇÕES DO PLANO PLURIANUAL
CREATE TABLE IF NOT EXISTS simam.AvaliacaoAcaoAno
(
    idPessoa UInt32,
    cdAcao String,
    cdControleLeiAtoAcao UInt32,
    nrAno UInt32,
    nrRealizado UInt32,
    vlRealizado Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdAcao, cdControleLeiAtoAcao);

-- AVALIAÇÃO ANUAL DOS INDICADORES DO PLANO PLURIANUAL
CREATE TABLE IF NOT EXISTS simam.AvaliacaoIndicadorAno
(
    idPessoa UInt32,
    cdIndicador UInt32,
    cdControleLeiAto UInt32,
    nrAnoBase UInt32,
    nrMedidaRealizada UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdIndicador, cdControleLeiAto);

-- DEMONSTRATIVO DE RISCOS FISCAIS E PROVIDÊNCIAS
CREATE TABLE IF NOT EXISTS simam.RiscosFiscaisLDO
(
    idPessoa UInt32,
    cdControleLeiAto UInt32,
    de Nullable(UInt32),
    idRiscoFiscal UInt32,
    nrProvidencia UInt32,
    dsProvidencia String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdControleLeiAto, idRiscoFiscal);

-- DEMONSTRATIVO - METAS ANUAIS
CREATE TABLE IF NOT EXISTS simam.MetasAnuaisLDO
(
    cdControleLeiAto UInt32,
    nrAnoReferencia UInt32,
    vlResNomCorrente Decimal(18,2),
    vlResNomConstante Decimal(18,2),
    vlResNomPercPIB Decimal(18,2),
    vlDivPublicaCorrente Decimal(18,2),
    vlDivPublicaConstante Decimal(18,2),
    vlDivPublicaPercPIB Decimal(18,2),
    vlDivConsLiqCorrente Decimal(18,2),
    vlDivConsLiqConstante Decimal(18,2),
    vlDivConsLiqPercPIB Decimal(18,2),
    vlRecPrimPPPCorrente Decimal(18,2),
    vlRecPrimPPPpercPIB Decimal(18,2),
    vlDespPrimPPPCorrente Decimal(18,2),
    vlDespPrimPPPpercPIB Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, cdControleLeiAto, nrAnoReferencia);

-- OBRIGATÓRIAS DE CARÁTER CONTINUADO
CREATE TABLE IF NOT EXISTS simam.ExpansaoDespesaContinuada
(
    idPessoa UInt32,
    cdControleLeiAto UInt32,
    vlTransfFUNDEB Decimal(18,2),
    vlRedPermDespesa Decimal(18,2),
    vlNovasDOCC Decimal(18,2),
    vlNovasDOCGeradasP Decimal(18,2),
    vlAumentoReceita Decimal(18,2),
    vlTransfConstitucionais Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdControleLeiAto);

-- FONTES DE RECURSOS DAS ENTIDADES
CREATE TABLE IF NOT EXISTS simam.FonteReceita
(
    idPessoa Nullable(UInt32),
    cdFonte String,
    cdFontePadrao String,
    cdOrigem String,
    cdAplicacao String,
    cdDesdobramento String,
    cdDetalhamento Nullable(String),
    cdFontePadraoSTN String,
    dsFonte String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, cdFonte, cdFontePadrao, cdOrigem);

-- PLANO DE CONTAS DA RECEITA ORÇAMENTÁRIA DAS ENTIDADES
CREATE TABLE IF NOT EXISTS simam.PlanoRecOrcamentaria
(
    idPessoa UInt32,
    cdCategoriaEconomica String,
    cdOrigem String,
    cdEspecie1 String,
    cdDesdobramentoD Nullable(String),
    paraD2 String,
    cdDesdobramentoD_2 Nullable(String),
    para3eita String,
    cdNivel8 String,
    cdNivel9 String,
    cdNivel10 String,
    cdNivel11 String,
    cdNivel12 String,
    nrAnoAplicacao UInt32,
    dsDesdobramento String,
    cdTipoNivelConta String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdCategoriaEconomica, cdOrigem);

-- PLANO DE CONTAS DA DESPESA ORÇAMENTÁRIA DAS ENTIDADES
CREATE TABLE IF NOT EXISTS simam.PlanoDespOrcamentaria
(
    idPessoa UInt32,
    cdCategoriaEconomica String,
    cdGrupoNatureza String,
    cdModalidade String,
    cdElemento String,
    cdDesdobramento String,
    cdDetalhamento String,
    nrAnoAplicacao UInt32,
    dsDesdobramento String,
    cdTipoNivelConta String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdCategoriaEconomica, cdGrupoNatureza);

-- PREVISÃO INICIAL DA RECEITA ORÇAMENTÁRIA
CREATE TABLE IF NOT EXISTS simam.PrevisaoInicialReceita
(
    idPessoa UInt32,
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
    cdGrupoFonte String,
    cdFonte String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdCategoriaEconomica, cdOrigem);

-- REVISÃO DA PREVISÃO INICIAL DA RECEITA ORÇAMENTÁRIA
CREATE TABLE IF NOT EXISTS simam.RevisaoPrevisaoInicialReceita
(
    idPessoa UInt32,
    nrOperacao UInt32,
    nrAnoOperacao UInt32,
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
    cdGrupoFonte String,
    cdFonte String,
    idTipoRevisao UInt32,
    nrMesRevisao UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrOperacao, nrAnoOperacao);

-- ATUALIZAÇÃO DA RECEITA ORÇAMENTÁRIA
CREATE TABLE IF NOT EXISTS simam.PrevisaoAtualizadaReceita
(
    idPessoa UInt32,
    cdOrigem String,
    cdEspecie String,
    cdDesdobramentoD1 String,
    cdDesdobramentoDD String,
    cdDesdobramentoD3 String,
    cdTipoNaturezaReceit String,
    cdNivel8 String,
    cdNivel9 String,
    cdNivel10 String,
    cdNivel11 String,
    cdNivel12 String,
    nrAnoAplicacao99 UInt32,
    cdGrupoFonte String,
    cdFonte String,
    nrMesRemessa UInt32,
    nrAnoRemessa UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdOrigem, cdEspecie);

-- PREVISÃO INICIAL DA DESPESA ORÇAMENTÁRIA
CREATE TABLE IF NOT EXISTS simam.PrevisaoInicialDespesa
(
    idPessoa UInt32,
    cdCategoriaEconomica String,
    cdGrupoNatureza String,
    cdModalidade String,
    cdElemento String,
    cdDesdobramento String,
    cdDetalhamento String,
    nrAnoAplicacao UInt32,
    idTipoCreditoInicial Nullable(UInt32),
    da Nullable(UInt32),
    cdOrgao String,
    cdUnidade String,
    cdFuncao String,
    cdSubFuncao String,
    cdPrograma String,
    cdProjetoAtividade String,
    cdMarcadorSTN String,
    cdGrupoFonte String,
    cdFonte String,
    vlPrevisaoInicial Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdCategoriaEconomica, cdGrupoNatureza);

-- REVISÃO DA PREVISÃO INICIAL DA DESPESA ORÇAMENTÁRIA
CREATE TABLE IF NOT EXISTS simam.RevisaoPrevisaoInicialDespesa
(
    idPessoa UInt32,
    nrOperacao UInt32,
    nrAnoOperacao UInt32,
    cdCategoriaEconomica String,
    cdGrupoNatureza String,
    cdModalidade String,
    cdElemento String,
    cdDesdobramento String,
    cdDetalhamento String,
    nrAnoAplicacao UInt32,
    idTipoCreditoInicial Nullable(UInt32),
    da Nullable(UInt32),
    cdOrgao String,
    cdUnidade String,
    cdFuncao String,
    cdSubFuncao String,
    cdPrograma String,
    cdProjetoAtividade String,
    cdMarcadorSTN String,
    cdGrupoFonte String,
    cdFonte String,
    idTipoRevisao UInt32,
    nrMesRevisao UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrOperacao, nrAnoOperacao);

-- ORÇAMENTÁRIA
CREATE TABLE IF NOT EXISTS simam.AtualizacaoPrevisaoDespesa
(
    idPessoa UInt32,
    cdCategoriaEconomica String,
    cdGrupoNatureza String,
    cdModalidade String,
    cdElemento String,
    cdDesdobramento String,
    cdDetalhamento String,
    nrAnoAplicacao UInt32,
    idTipoAtualizacaoOrcamentaria UInt32,
    idTipoCreditoInicial Nullable(UInt32),
    cdOrgao String,
    cdUnidade String,
    cdFuncao String,
    cdSubFuncao String,
    cdPrograma String,
    cdProjetoAtividade String,
    cdMarcadorSTN String,
    cdGrupoFonte String,
    cdFonte String,
    vlOperacao Decimal(18,2),
    nrMesRemessa UInt32,
    nrAnoRemessa UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdCategoriaEconomica, cdGrupoNatureza);

-- NA LEI ORÇAMENTÁRIA E LDO - EXCLUÍDOS DOS LIMITES
CREATE TABLE IF NOT EXISTS simam.ExclusaoCreditoAdicional
(
    idPessoa UInt32,
    cdControleExclusao UInt32,
    cdControleLeiAto UInt32,
    idExecutor UInt32,
    idTipoCreditoAdicional UInt32,
    nrArtigo String,
    idTipoExclusaoCreditoAdicional UInt32,
    dsArtigo String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdControleExclusao, cdControleLeiAto);

-- CRÉDITOS ADICIONAIS, EXCETO LOA E LDO
CREATE TABLE IF NOT EXISTS simam.LeiCreditoAdicional
(
    idPessoa Nullable(UInt32),
    cdControleLeiAto UInt32,
    idExecutor UInt32,
    idTipoCredito UInt32,
    idTipoRecurso UInt32,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, cdControleLeiAto, idExecutor, idTipoCredito);

-- ATOS DE ALTERAÇÕES ORÇAMENTÁRIAS
CREATE TABLE IF NOT EXISTS simam.AtoAlteracaoOrcamentaria
(
    cdControleLeiAtoAutorizacao UInt32,
    vlOperacao Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, cdControleLeiAtoAutorizacao);

-- ALTERAÇÕES ORÇAMENTÁRIAS
CREATE TABLE IF NOT EXISTS simam.AlteracaoOrcamentaria
(
    idPessoa UInt32,
    cdControleLeiAtoAbertura UInt32,
    idTipoCreditoAdicional UInt32,
    idTipoRecursoCreditoAdicional Nullable(UInt32),
    idTipoAlteracaoCreditoAdicional UInt32,
    cdOrgao String,
    cdUnidade String,
    cdFuncao String,
    cdSubFuncao String,
    cdProgramaLOA String,
    cdProjetotividade String,
    nrAnoFuncional UInt32,
    cdCategoriaconomica String,
    cdGrupoatureza String,
    cdModalidade String,
    cdElemento String,
    cdDesdobramento String,
    cdDetalhamento String,
    nrAnoAplicacao UInt32,
    cdMarcadorSTN String,
    cdGrupoFonte String,
    cdFonte String,
    idPessoaTransferencia Nullable(UInt32),
    idTipoOperacaoCreditoAdicional UInt32,
    vlOperacao Decimal(18,2),
    cdControleExclusao Nullable(UInt32),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdControleLeiAtoAbertura, idTipoCreditoAdicional);

-- REVISÃO DAS ALTERAÇÕES ORÇAMENTÁRIAS
CREATE TABLE IF NOT EXISTS simam.RevisaoAlteracaoOrcamentaria
(
    idPessoa UInt32,
    nrOperacao UInt32,
    nrAnoOperacao UInt32,
    cdControleLeiAtoAbertura UInt32,
    idTipoCreditoAdicional UInt32,
    idTipoRecursoCreditoAdicional Nullable(UInt32),
    idTipoAlteracaoCreditoAdicional UInt32,
    cdOrgao Nullable(String),
    cdUnidade Nullable(String),
    cdFuncao Nullable(String),
    cdSubFuncao Nullable(String),
    cdProgramaLOA Nullable(String),
    cdProjetoAtividade Nullable(String),
    nrAnoFuncional Nullable(UInt32),
    cdCategoriaEconomica Nullable(String),
    cdGrupoNatureza Nullable(String),
    cdModalidade Nullable(String),
    cdElemento Nullable(String),
    cdDesdobramento Nullable(String),
    cdDetalhamento Nullable(String),
    nrAnoAplicacao Nullable(UInt32),
    cdMarcadorSTN String,
    cdGrupoFonte String,
    cdFonte String,
    idTipoRevisao UInt32,
    vlRevisao Decimal(18,2),
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, nrOperacao, nrAnoOperacao);

-- PROGRAMAÇÃO FINANCEIRA E CRONOGRAMA MENSAL DE DESEMBOLSO
CREATE TABLE IF NOT EXISTS simam.ProgramacaoFinanceira
(
    idPessoa UInt32,
    cdControleLeiAto UInt32,
    idTipoOperacaoProgramacaoFinanceira UInt32,
    nrMes UInt32,
    nrAno UInt32,
    cdFonte String,
    _id_entidade   UInt32,
    _exercicio     UInt16,
    _competencia   UInt8 DEFAULT 0,
    _fonte         LowCardinality(String) DEFAULT '',
    _ingerido_em   DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(_ingerido_em)
ORDER BY (_id_entidade, _exercicio, _competencia, idPessoa, cdControleLeiAto, idTipoOperacaoProgramacaoFinanceira);

