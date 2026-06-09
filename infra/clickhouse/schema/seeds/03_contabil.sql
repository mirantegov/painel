-- MÓDULO CONTÁBIL — 37 tabelas (seeds)

-- TIPOS DE ESFERA GOVERNO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoEsferaGoverno
(
    idTipoEsferaGoverno Int64,
    dsTipoEsferaGoverno String
)
ENGINE = MergeTree
ORDER BY idTipoEsferaGoverno;
INSERT INTO simam.TipoEsferaGoverno (idTipoEsferaGoverno, dsTipoEsferaGoverno) VALUES
(1, 'Estado'),
(2, 'Município'),
(3, 'Mista/Hibrida'),
(4, 'Federal');

-- TIPOS DE ESCRITURAÇÃO DAS CONTAS CONTÁBEIS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoEscrituracao
(
    tpEscrituracao String,
    dsTipoEscrituracao String
)
ENGINE = MergeTree
ORDER BY tpEscrituracao;

-- TIPOS DE NATUREZA DE SALDOS CONTÁBEIS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoNaturezaSaldo
(
    tpNaturezaSaldo String,
    dsTipoNaturezaSaldo String
)
ENGINE = MergeTree
ORDER BY tpNaturezaSaldo;

-- TIPOS DE NATUREZA DA INFORMAÇÃO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoNaturezaInformacao
(
    tpNaturezaInformacao String,
    dsTipoNaturezaInformacao String
)
ENGINE = MergeTree
ORDER BY tpNaturezaInformacao;

-- TIPOS DE SUPERÁVIT FINANCEIRO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoSuperavitFinanceiro
(
    tpSuperavitFinanceiro String,
    dsTipoSuperavitFinanceiro String
)
ENGINE = MergeTree
ORDER BY tpSuperavitFinanceiro;

-- TIPOS DE CONTROLE DA CONTA (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoControleConta
(
    tpControleConta String,
    dsTipoControleConta String
)
ENGINE = MergeTree
ORDER BY tpControleConta;

-- TIPOS DE APLICAÇÃO DO PLANO DE CONTAS CONTÁBIL PADRÃO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoAplicacaoPlanoContabil
(
    idTipoAplicacao Int64,
    dsTipoAplicacao String
)
ENGINE = MergeTree
ORDER BY idTipoAplicacao;
INSERT INTO simam.TipoAplicacaoPlanoContabil (idTipoAplicacao, dsTipoAplicacao) VALUES
(1, 'Todas Entidades, exceto Estatais Não Dependentes'),
(2, 'Estatais Não Dependentes MOVIMENTO CONTÁBIL MENSAL PARA ELABORAÇÃO DO BALANCETE DE VERIFICAÇÃO MENSAL');

-- TIPOS DE MOVIMENTO CONTÁBIL (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoMovimentoContabil
(
    idTipoMovimento Int64,
    dsTipoMovimentoContabil String
)
ENGINE = MergeTree
ORDER BY idTipoMovimento;
INSERT INTO simam.TipoMovimentoContabil (idTipoMovimento, dsTipoMovimentoContabil) VALUES
(1, 'Abertura do Exercício'),
(2, 'Movimento Normal'),
(3, 'Encerramento do Exercício'),
(4, 'Ajustes de Exercícios Anteriores TIPO DE MOVIMENTO PARA APURAÇÃO DO SUPERÁVIT FINANCEIRO');

-- TIPO DE VARIAÇÃO PATRIMONIAL QUALITATIVA (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoVariacaoQualitativa
(
    nrOperacao String,
    nrOperacao_2 String,
    nrAnoOperacao String
)
ENGINE = MergeTree
ORDER BY nrOperacao;

-- TIPO EVENTO PADRÃO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.EventoPadrao
(
    idEventoPadr Int64,
    dsEventoPadr String
)
ENGINE = MergeTree
ORDER BY idEventoPadr;
INSERT INTO simam.EventoPadrao (idEventoPadr, dsEventoPadr) VALUES
(1, 'CAIXA E EQUIVALENTES DE CAIXA - ORIGEM ORÇAMENTÁRIA'),
(2, 'ESTORNO - CAIXA E EQUIVALENTES DE CAIXA - ORIGEM ORÇAMENTÁRIA'),
(3, 'CAIXA E EQUIVALENTES DE CAIXA - ORIGEM NÃO ORÇAMENTÁRIA'),
(4, 'ESTORNO - CAIXA E EQUIVALENTES DE CAIXA - ORIGEM NÃO ORÇAMENTÁRIA'),
(5, 'CRÉDITOS A CURTO PRAZO, EXCETO PARA CONTAS REDUTORAS - ATIVO PERMANENTE'),
(6, 'ESTORNO DE CRÉDITOS A CURTO PRAZO, EXCETO DE CONTAS REDUTORAS - ATIVO PERMANENTE'),
(7, 'CONTAS REDUTORAS DE CRÉDITOS A CURTO PRAZO - ATIVO PERMANENTE'),
(24, 'PARA PERDAS - ATIVO FINANCEIRO (DESTINAÇÃO DE RECURSO DE ORIGEM EXTRAORÇAMENTÁRIA)'),
(25, 'ESTOQUES - ATIVO CIRCULANTE'),
(26, 'ESTORNO DE ESTOQUES - ATIVO CIRCULANTE'),
(34, 'CLIENTES A LONGO PRAZO - ATIVO PERMANENTE'),
(44, 'AJUSTES PARA PERDAS DE CRÉDITOS A LONGO PRAZO - ATIVO PERMANENTE'),
(45, 'ESTORNO DE AJUSTES PARA PERDAS DE CRÉDITOS A LONGO PRAZO - ATIVO PERMANENTE'),
(76, 'ESTOQUES, EXCETO AJUSTE PARA PERDAS - ATIVO NÃO CIRCULANTE'),
(77, 'ESTORNO DE ESTOQUES, EXCETO AJUSTE PARA PERDAS - ATIVO NÃO CIRCULANTE'),
(78, 'AJUSTES PARA PERDAS DE ESTOQUES - ATIVO NÃO CIRCULANTE'),
(84, 'DEPRECIAÇÃO ACUMULADA DE INVESTIMENTOS - ATIVO NÃO CIRCULANTE'),
(85, 'ESTORNO DE DEPRECIAÇÃO ACUMULADA DE INVESTIMENTOS - ATIVO NÃO CIRCULANTE'),
(86, 'REDUÇÃO AO VALOR RECUPERÁVEL DE INVESTIMENTOS - ATIVO NÃO CIRCULANTE'),
(87, 'ESTORNO DE REDUÇÃO AO VALOR RECUPERÁVEL DE INVESTIMENTOS - ATIVO NÃO CIRCULANTE'),
(88, 'BENS MÓVEIS - ATIVO NÃO CIRCULANTE'),
(89, 'ESTORNO DE BENS MÓVEIS - ATIVO NÃO CIRCULANTE'),
(90, 'BENS IMÓVEIS - ATIVO NÃO CIRCULANTE idEventoPadrão                                        dsEventoPadrão'),
(91, 'ESTORNO DE BENS IMÓVEIS - ATIVO NÃO CIRCULANTE'),
(94, 'REDUÇÃO AO VALOR RECUPERÁVEL DE IMOBILIZADO'),
(95, 'ESTORNO DE REDUÇÃO AO VALOR RECUPERÁVEL DE IMOBILIZADO'),
(98, 'AMORTIZAÇÃO ACUMULADA'),
(99, 'ESTORNO DE AMORTIZAÇÃO ACUMULADA'),
(100, 'REDUÇÃO AO VALOR RECUPERÁVEL DE INTANGÍVEL'),
(118, 'ENCARGOS FINANCEIROS A APROPRIAR - INTERNO - PASSIVO PERMANENTE'),
(119, 'ESTORNO DE ENCARGOS FINANCEIROS A APROPRIAR - INTERNO - PASSIVO PERMANENTE'),
(120, 'ENCARGOS FINANCEIROS A APROPRIAR - EXTERNO - PASSIVO PERMANENTE'),
(121, 'ESTORNO DE ENCARGOS FINANCEIROS A APROPRIAR - EXTERNO - PASSIVO PERMANENTE'),
(122, 'FORNECEDORES E CONTAS A PAGAR A CURTO PRAZO - PASSIVO PERMANENTE'),
(130, 'OBRIGAÇÕES FISCAIS A CURTO PRAZO - PASSIVO PERMANENTE'),
(131, 'ESTORNO DE OBRIGAÇÕES FISCAIS A CURTO PRAZO - PASSIVO PERMANENTE'),
(138, 'OBRIGAÇÕES DE REPARTIÇÃO A OUTROS ENTES - PASSIVO PERMANENTE'),
(146, 'PROVISÕES DE OBRIGAÇÕES A CURTO PRAZO - PASSIVO PERMANENTE'),
(158, 'DEMAIS OBRIGAÇÕES A CURTO PRAZO - INSCRIÇÃO DE CONSIGNAÇÕES'),
(168, 'FORNECEDORES A LONGO PRAZO - PASSIVO PERMANENTE'),
(169, 'ESTORNO DE FORNECEDORES A LONGO PRAZO - PASSIVO PERMANENTE'),
(170, 'OBRIGAÇÕES FISCAIS A LONGO PRAZO - PASSIVO PERMANENTE'),
(171, 'ESTORNO DE OBRIGAÇÕES FISCAIS A LONGO PRAZO - PASSIVO PERMANENTE idEventoPadrão                                       dsEventoPadrão'),
(180, 'PPA - APROVADO'),
(181, 'ESTORNO PPA - APROVADO'),
(182, 'GARANTIAS E CONTRAGARANTIAS RECEBIDAS'),
(183, 'ESTORNO DE GARANTIAS E CONTRAGARANTIAS RECEBIDAS'),
(184, 'DIREITOS CONVENIADOS E OUTROS INSTRUMENTOS CONGÊNERES'),
(185, 'ESTORNO DE DIREITOS CONVENIADOS E OUTROS INSTRUMENTOS CONGÊNERES'),
(186, 'DIREITOS CONTRATUAIS'),
(187, 'ESTORNO DE DIREITOS CONTRATUAIS'),
(188, 'OUTROS ATOS POTENCIAIS ATIVOS'),
(189, 'ESTORNO DE OUTROS ATOS POTENCIAIS ATIVOS'),
(190, 'GARANTIAS E CONTRAGARANTIAS CONCEDIDAS'),
(191, 'ESTORNO DE GARANTIAS E CONTRAGARANTIAS CONCEDIDAS'),
(192, 'OBRIGAÇÕES CONVENIADAS E OUTROS INSTRUMENTOS CONGÊNERES'),
(193, 'ESTORNO DE OBRIGAÇÕES CONVENIADAS E OUTROS INSTRUMENTOS CONGÊNERES'),
(194, 'OBRIGAÇÕES CONTRATUAIS'),
(195, 'ESTORNO DE OBRIGAÇÕES CONTRATUAIS'),
(196, 'OUTROS ATOS POTENCIAIS PASSIVOS'),
(197, 'ESTORNO DE OUTROS ATOS POTENCIAIS PASSIVOS'),
(198, 'CRÉDITOS A ARRECADAR NO ORÇAMENTO COMPETÊNCIA'),
(199, 'ESTORNO DE CRÉDITOS A ARRECADAR NO ORÇAMENTO COMPETÊNCIA'),
(200, 'CRÉDITOS INSCRITOS EM DÍVIDA ATIVA'),
(201, 'ESTORNOS DE CRÉDITOS INSCRITOS EM DÍVIDA ATIVA'),
(202, 'OUTROS CONTROLES'),
(203, 'ESTORNO DE OUTROS CONTROLE'),
(204, 'PLANO PLURIANUAL APROVADO'),
(205, 'REVISÃO AUMENTATIVA DO PLANO PLURIANUAL APROVADO'),
(206, 'REVISÃO DIMINUTIVA DO PLANO PLURIANUAL APROVADO'),
(207, 'ALOCAÇÃO DO PLANO PLURIANUAL APROVADO NA LEI ORÇAMENTÁRIA ANUAL - LOA'),
(208, 'PREVISÃO INICIAL DA RECEITA ORÇAMENTÁRIA BRUTA'),
(209, '(-) DEDUÇÕES DA PREVISÃO INICIAL DA RECEITA ORÇAMENTÁRIA'),
(210, '(-) ANULAÇÃO DA PREVISÃO DA RECEITA ORÇAMENTÁRIA'),
(211, 'CRÉDITO INICIAL ORIGINÁRIO DO ORÇAMENTO - DESPESA'),
(212, 'CRÉDITO INICIAL NÃO ORIGINÁRIO DO ORÇAMENTO'),
(213, 'PROGRAMAÇÃO FINANCEIRA INICIAL - RECEITA'),
(214, 'PROGRAMAÇÃO FINANCEIRA DA RECEITA A LIBERAR'),
(215, 'PROGRAMAÇÃO FINANCEIRA DA RECEITA LIBERADA'),
(216, 'CRONOGRAMA MENSAL DE DESEMBOLSO - FIXAÇÃO INICIAL'),
(217, 'CRONOGRAMA DE DESEMBOLSO MENSAL - RESERVADO'),
(218, 'CRONOGRAMA DE DESEMBOLSO MENSAL - BLOQUEADO'),
(219, 'CRÉDITOS ANTECIPADOS - LEI DE DIRETRIZES ORÇAMENTÁRIAS - LDO'),
(220, '(-) ANULAÇÃO DE CRÉDITOS ANTECIPADOS - LEI DE DIRETRIZES ORÇAMENTÁRIAS - LDO'),
(221, 'REESTIMATIVA DA RECEITA ORÇAMENTÁRIA'),
(222, 'CORREÇÃO INFLACIONÁRIA DA RECEITA ORÇAMENTÁRIA'),
(223, 'CRÉDITO ADICIONAL SUPLEMENTAR ABERTO POR LEI ESPECÍFICA - SUPERÁVIT FINANCEIRO'),
(224, 'CRÉDITO ADICIONAL SUPLEMENTAR ABERTO POR LEI ESPECÍFICA - EXCESSO DE ARRECADAÇÃO'),
(225, 'CRÉDITO ADICIONAL SUPLEMENTARABERTO POR LEI ESPECÍFICA - ANULAÇÃO DE DOTAÇÕES'),
(228, 'TRANSPOSIÇÃO POR LEI ESPECÍFICA - ANULAÇÃO DE DOTAÇÃO'),
(235, 'CRÉDITO ADICIONAL ESPECIAL POR SUPERÁVIT FINANCEIRO'),
(236, 'CRÉDITO ADICIONAL ESPECIAL POR EXCESSO DE ARRECADAÇÃO'),
(237, 'CRÉDITO ADICIONAL ESPECIAL POR ANULAÇÃO DE DOTAÇÃO'),
(238, 'CRÉDITO ADICIONAL ESPECIAL-PRODUTO DE OPERAÇÕES DE CRÉDITO'),
(239, 'CRÉDITO ADICIONAL ESPECIAL - RECURSOS DA RESERVA DE CONTINGÊNCIA'),
(240, 'CRÉDITO ADICIONAL EXTRAORDINÁRIO - SUPERÁVIT FINANCEIRO'),
(241, 'CRÉDITO ADICIONAL EXTRAORDINÁRIO - EXCESSO DE ARRECADAÇÃO'),
(242, 'CRÉDITO ADICIONAL EXTRAORDINÁRIO POR ANULAÇÃO DE DOTAÇÃO'),
(252, 'EMISSÃO DE EMPENHO ORÇAMENTÁRIO RECEBIMENTO DE BENS INCORPORADOS AO IMOBILIZADO ANTES DA FASE DE LIQUIDAÇÃO DO EMPENHO.'),
(261, 'PAGAMENTO DE EMPENHO ORÇAMENTÁRIO LIQUIDADO SEM CONSIGNAÇÕES'),
(262, 'PAGAMENTO DE CONSIGNAÇÕES ANTERIORMENTE INSCRITAS NO PASSIVO FINANCEIRO'),
(263, 'DEPRECIAÇÃO ACUMULADA DE BENS MÓVEIS'),
(264, 'DEPRECIAÇÃO ACUMULADA DE BENS IMÓVEIS'),
(265, 'CONTRATAÇÃO DE OPERAÇÕES DE CRÉDITO CONTRATUAL INTERNA'),
(266, 'CONTRATAÇÃO DE OPERAÇÕES DE CRÉDITO CONTRATUAL EXTERNA'),
(267, 'ASSUNÇÃO DE PARCELAMENTO DE DÍVIDAS CONTRATAÇÃO DE OPERAÇÕES DE CRÉDITO PARA MELHORIA DA ADM. DE RECEITAS E DA GESTÃO FISCAL, FINANCEIRA E PATRIMONIAL'),
(269, 'CONTRATAÇÃO DE OPERAÇÕES DE CRÉDITO - PROGRAMA DE ILUMINAÇÃO PÚBLICA - RELUZ'),
(281, 'INCORPORAÇÃO DE PRECATÓRIOS A CURTO PRAZO APÓS DECISÃO JUDICIAL'),
(285, 'AJUSTES DE EMPENHOS DE RESTOS A PAGAR NÃO PROCESSADOS A CURTO PRAZO'),
(291, 'INSCRIÇÃO DE GARANTIAS E CONTRAGARANTIAS RECEBIDAS'),
(292, 'INSCRIÇÃO DE DIREITOS CONVENIADOS E OUTROS INSTRUMENTOS CONGÊNERES'),
(293, 'INSCRIÇÃO DE DIREITOS CONTRATUAIS'),
(294, 'INSCRIÇÃO DE OUTROS ATOS POTENCIAIS ATIVOS'),
(295, 'INSCRIÇÃO DE GARANTIAS E CONTRAGARANTIAS CONCEDIDAS'),
(296, 'INSCRIÇÃO DE OBRIGAÇÕES CONVENIADAS E OUTROS INSTRUMENTOS CONGÊNERES'),
(297, 'INSCRIÇÃO DE OBRIGAÇÕES CONTRATUAIS'),
(364, 'AJUSTES E PERDAS DE INVESTIMENTOS TEMPORÁRIOS A CURTO PRAZO'),
(365, 'BAIXA DE RESTOS A RECEBER NO MOMENTO DO RECONHECIMENTO DA RECEITA ORÇAMENTÁRIA'),
(366, 'ASSINATURA DO CONTRATO DE RATEIO (NO ENTE)'),
(369, 'LIQUIDAÇÃO DE EMPENHO DE CONTRATO DE RATEIO A CONSÓRCIO (NO ENTE)'),
(382, 'ENCERRAMENTO DO PPA APROVADO'),
(383, 'ENCERRAMENTO DA RECEITA PREVISTA E NÃO REALIZADA'),
(384, 'ENCERRAMENTO DAS DEDUÇÕES DA RECEITA PREVISTA E NÃO REALIZADA idEventoPadrão                                       dsEventoPadrão'),
(385, 'ENCERRAMENTO DA RECEITA REALIZADA'),
(386, 'ENCERRAMENTO DAS DEDUÇÕES DA PREVISÃO INICIAL DA RECETA ORÇAMENTÁRIA'),
(387, 'ENCERRAMENTO DE RESTOS A PAGAR NÃO PROCESSADOS PAGOS DO EXERCÍCIO ANTERIOR'),
(391, 'ENCERRAMENTO DAS CONTAS DE RESTOS A PAGAR NÃO PROCESSADOS LIQUIDADOS A PAGAR'),
(392, 'ENCERRAMENTO DAS CONTAS DE RESTOS A PAGAR NÃO PROCESSADOS INSCRITOS ENCERRAMENTO DAS CONTAS DE RESTOS A PAGAR NÃO PROCESSADOS - EXERCÍCIOS ANTERIORES'),
(394, 'ENCERRAMENTO DAS CONTAS DE RESTOS A PAGAR NÃO PROCESSADOS INSCRITOS'),
(395, 'ENCERRAMENTO DAS CONTAS DE RESTOS A PAGAR PROCESSADOS INSCRITOS NO EXERCÍCIO'),
(396, 'ENCERRAMENTO DAS CONTAS DE RESTOS A PAGAR PROCESSADOS DE EXERCÍCIOS ANTERIORES'),
(397, 'ENCERRAMENTO DO CANCELAMENTO DE RESTOS A PAGAR INSCRITOS NO EXERCÍCIO'),
(398, 'ENCERRAMENTO DO CANCELAMENTO DE RESTOS A PAGAR DE EXERCÍCIOS ANTERIORES'),
(399, 'ENCERRAMENTO DAS CONTAS DE RESTOS A PAGAR PROCESSADOS INSCRITOS'),
(400, 'ENCERRAMENTO DAS CONTAS DE CRÉDITO DISPONÍVEL'),
(401, 'ENCERRAMENTO DAS CONTAS DE DOTAÇÃO ADICIONAL POR TIPO DE CRÉDITO'),
(402, 'ENCERRAMENTO DAS CONTAS DE CRÉDITO EMPENHADO A LIQUIDAR'),
(409, 'ENCERRAMENTO DA CONTA DE CRÉDITO EMEPENHADO LIQUIDADO A PAGAR'),
(413, 'ENCERRAMENTO DA CONTA CRÉDITO EMPENHADO LIQUIDADO PAGO'),
(414, 'ENCERRAMENTO DA CONTA CRÉDITO EMPENHADO LIQUIDADO PAGO'),
(418, 'ENCERRAMENTO DA DOTAÇÃO ADICIONAL POR FONTE - ANULAÇÃO DE DOTAÇÃO.'),
(425, 'ENCERRAMENTO DA CONTA DE OUTRAS GARANTIAS EXECUTADAS - GARANTIAS RECEBIDAS'),
(426, 'ENCERRAMENTO DA CONTA DE CAUÇÃO EXECUTADOS - GARANTIAS RECEBIDAS'),
(427, 'ENCERRAMENTO DA CONTA DE SEGUROS-GARANTIAS EXECUTADOS - GARANTIAS RECEBIDAS'),
(428, 'ENCERRAMENTO DA CONTA DE HIPOTECAS EXECUTADAS - GARANTIAS RECEBIDAS'),
(429, 'ENCERRAMENTO DA CONTA DE FINANÇAS EXECUTADAS - GARANTIAS RECEBIDAS'),
(430, 'ENCERRAMENTO DA CONTA DE AVAIS EXECUTADOS - GARANTIAS RECEBIDAS'),
(431, 'ENCERRAMENTO DA CONTA DE OUTROS DIREITOS CONTRATUAIS EXECUTADOS'),
(432, 'ENCERRAMENTO DA CONTA DE FORNECIMENTO DE BENS EXECUTADOS - DIREITO CONTRATUAIS'),
(433, 'ENCERRAMENTO DA CONTA DE CONTRATOS DE ALUGUÉIS EXECUTADOS - DIREITO CONTRATUAIS'),
(434, 'ENCERRAMENTO DA CONTA DE CONTRATOS DE SERVIÇOS EXECUTADOS - DIREITO CONTRATUAIS'),
(435, 'ENCERRAMENTO DA CONTA DE CONTRATOS DE SEGUROS EXECUTADOS - DIREITO CONTRATUAIS idEventoPadrão                                      dsEventoPadrão'),
(436, 'ENCERRAMENTO DA CONTA DE OUTRAS CONTRAGARANTIAS CONCEDIDAS EXECUTADAS'),
(437, 'ENCERRAMENTO DA CONTA DE CONTRAGARANTIAS SOBRE FIANÇAS CONCEDIDAS EXECUTADAS'),
(438, 'ENCERRAMENTO DA CONTA DE CONTRAGARANTIAS SOBRE AVAIS CONCEDIDAS EXECUTADAS'),
(439, 'ENCERRAMENTO DA CONTA DE OUTRAS GARANTIAS CONCEDIDAS EXECUTADAS'),
(440, 'ENCERRAMENTO DA CONTA DE CAUÇÃO EXECUTADOS'),
(441, 'ENCERRAMENTO DA CONTA DE SEGUROS-GARANTIA EXECUTADOS'),
(442, 'ENCERRAMENTO DA CONTA DE HIPOTECAS EXECUTADAS'),
(443, 'ENCERRAMENTO DA CONTA DE FIANÇAS EXECUTADAS'),
(444, 'ENCERRAMENTO DA CONTA DE AVAIS EXECUTADOS'),
(449, 'ENCERRAMENTO DA CONTA DE PARCELAMENTOS DE DÍVIDAS'),
(450, 'ENCERRAMENTO DA CONTA CONTRATUAL EXTERNA'),
(451, 'ENCERRAMENTO DA CONTA CONTRATUAL INTERNA EXECUTADA'),
(452, 'ENCERRAMENTO DA CONTA MOBILIÁRIA EXTERNA EXECUTADA'),
(465, 'ENCERRAMENTO DA DISPONIBILIDADE POR DESTINAÇÃO DE RECURSOS UTILIZADA'),
(466, 'ENCERRAMENTO DE CONTA DE EXECUÇÃO FINANCEIRA DO LIMITE DE RESTOS A PAGAR'),
(467, 'ENCERRAMENTO DA CONTA DE EXECUÇÃO DO RECURSO DIFERIDO POR DESTINAÇÃO'),
(468, 'ENCERRAMENTO DA CONTA DE EXECUÇÃO DA PROGRAMAÇÃO FINANCEIRA'),
(469, 'ENCERRAMENTO DA CONTA DE EXECUÇÃO DO LIMITE ORÇAMENTÁRIO'),
(470, 'ENCERRAMENTO DA EXECUÇÃO DOS RISCOS FISCAIS'),
(471, 'ENCERRAMENTO DAS CONTAS DE CONTRATO DE RATEIO DE CONSÓRCIOS PÚBLICOS'),
(472, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(473, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(474, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(475, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(476, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(477, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(478, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(479, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(480, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(481, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(482, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(483, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(484, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(485, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(486, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(487, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(488, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(489, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO idEventoPadrão                                       dsEventoPadrão'),
(490, 'ENCERRAMENTO DAS CONTAS DE CONSOLIDAÇÃO DA EXECUÇÃO DO CONSÓRCIO'),
(491, 'ENCERRAMENTO DA CONTA DE APURAÇÃO DE CUSTOS'),
(492, 'ENCERRAMENTO DA CONTA DE BENS RECEBIDOS A TÍTULO DE EMPRÉSTIMO - EXECUTADO'),
(493, 'ENCERRAMENTO DA CONTA DE BENS RECEBIDOS EM DIREITO REAL DE USO - EXECUTADO'),
(494, 'ENCERRAMENTO DA CONTA DE BENS RECEBIDOS EM COMODATO - EXECUTADO ENCERRAMENTO DA CONTA DE CRÉDITOS TRIBUTÁRIOS EM REGIME DE PRESCRIÇÃO - EXECUTADO'),
(498, 'ENCERRAMENTO DA CONTA DE CRÉDITOS FISCAIS EM REGIME DE PRESCRIÇÃO - EXECUTADO'),
(499, 'ENCERRAMENTO DA CONTA DE CONCESSÃO DE USO - EXECUTADO ENCERRAMENTO DA CONTA DE CONTRAPARTIDAS DE OBRIGAÇÕES POR TRANSFERENCIAS VOLUNTARIAS - EXECUTADO'),
(501, 'ENCERRAMENTO DA CONTA DE PERMISSÃO DE USO - BENS CONCEDIDOS'),
(502, 'ENCERRAMENTO DA CONTA DE BENS EM MANUTENÇÃO - EXECUTADO'),
(503, 'ENCERRAMENTO DA CONTA DE CONCEDIDOS EM DEPÓSITO - EXECUTADO'),
(504, 'ENCERRAMENTO DA CONTA MERCADORIAS E BENS EM PODER DE TERCEIROS - EXECUTADO'),
(505, 'ENCERRAMENTO DA CONTA DE COMODATO DE BENS CONCEDIDOS - EXECUTADO'),
(506, 'ENCERRAMENTO DA CONTA DE CESSÃO DE USO DE BENS CEDIDOS - EXECUTADO'),
(514, 'TRANSFERÊNCIA DO SALDO CREDOR DA CONTA DE SUPERÁVITS OU DÉFICITS DO EXERCÍCIO'),
(515, 'TRANSFERÊNCIA DO SALDO CREDOR DA CONTA DE AJUSTES DE EXERCÍCIOS ANTERIORES'),
(520, 'CRÉDITO ADICIONAL EXTRAORDINÁRIO - ABERTURA SEM A INDICAÇÃO PRÉVIA DE RECURSOS');

-- TIPO DE EMPENHO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoEmpenho
(
    idTipoEmpenho Int64,
    dsTipoEmpenho String
)
ENGINE = MergeTree
ORDER BY idTipoEmpenho;
INSERT INTO simam.TipoEmpenho (idTipoEmpenho, dsTipoEmpenho) VALUES
(1, 'Ordinário'),
(2, 'Global'),
(3, 'Estimativa'),
(4, 'Ordinário – (COVID-19) idTipoEmpenho                                   dsTipoEmpenho'),
(5, 'Global – (COVID-19)'),
(6, 'Estimativa – (COVID-19) GRUPOS DE FONTES DE RECURSOS');

-- GRUPOS DE FONTES DE RECURSOS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.GrupoFontePadrao
(
    cdGrupoFonte String,
    dsGrupo String
)
ENGINE = MergeTree
ORDER BY cdGrupoFonte;
INSERT INTO simam.GrupoFontePadrao (cdGrupoFonte, dsGrupo) VALUES
('1', 'Recursos do Exercício Corrente'),
('2', 'Recursos de Exercícios Anteriores'),
('9', 'Recursos Condicionados RESTOS A PAGAR INSCRITOS DO EXERCÍCIO E DE EXERCÍCIOS ANTERIORES');

-- TIPOS DE DOCUMENTOS FISCAIS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoDocumentoFiscal
(
    idTipoDocumentoFiscal Int64,
    dsTipoDocumentoFiscal String
)
ENGINE = MergeTree
ORDER BY idTipoDocumentoFiscal;
INSERT INTO simam.TipoDocumentoFiscal (idTipoDocumentoFiscal, dsTipoDocumentoFiscal) VALUES
(1, 'Nota Fiscal'),
(2, 'Nota Fiscal - Produtor Rural'),
(3, 'RPA – Serviços'),
(4, 'Recibo Aluguel'),
(5, 'Guia de Recolhimento – União'),
(6, 'Guia de Recolhimento – Estado'),
(7, 'Guia de Recolhimento - Entidade de Classe'),
(8, 'Bilhete de Passagem'),
(9, 'Folha de Pagamento'),
(10, 'Folha de Pagamento - Abono FUNDEF'),
(11, 'Sentença Judicial'),
(12, 'Aviso de Débito'),
(13, 'Repasse a Pessoas - Programa Federal'),
(14, 'Número do Contrato - Operação de Crédito'),
(15, 'Termo de Confissão de Dívida'),
(16, 'Processo de Adiantamento'),
(17, 'Devolução de Saldo de Convênio'),
(18, 'Guia de Retenção'),
(19, 'Fatura Telefônica'),
(20, 'Fatura de Energia Elétrica'),
(21, 'Fatura de Água'),
(22, 'Termo de Convênio'),
(23, 'Diárias'),
(24, 'DAM – Documento de Arrecadação Municipal'),
(25, 'Recibos de entidades'),
(26, 'Auxílio Concedido'),
(27, 'Subvenção Concedida'),
(28, 'Contribuição'),
(29, 'Recibos Cartórios'),
(30, 'Fatura Correio'),
(31, 'Indenizações'),
(32, 'Restituições'),
(33, 'Cupom Fiscal'),
(34, 'Apólice de Seguro'),
(35, 'Devolução de Tributos Municipais (Processo)'),
(36, 'Gratificações'),
(37, 'Contribuições Associativas'),
(38, 'Rescisão de Contrato de Trabalho'),
(39, 'Cancelamento de RAP'),
(40, 'Ajuda de Custo'),
(41, 'Escritura Pública idTipoDocumentoFiscal                       dsTipoDocumentoFiscal'),
(42, 'Nota Fiscal Eletrônica'),
(43, 'Nota Fiscal Eletrônica (NF-e) Mod. 55'),
(44, 'Nota Fiscal de Serviço Eletrônica (NFS-e)'),
(45, 'Nota Fiscal do Consumidor Eletrônica (NFC-e) Mod. 65 Nota Fiscal Eletrônica de Transporte (NF-e de Transporte)'),
(46, 'Mod. 57'),
(47, 'Conhecimento de Transporte Eletrônico (CT-e) Mod. 57'),
(48, 'Nota Fiscal de Importação (NFI) Mod. 61'),
(49, 'Nota Fiscal de Exportação (NFE) Mod. 63'),
(50, 'Nota Fiscal Serviços Comunicação Eletrônica Mod.62'),
(51, 'Nota Fiscal de Produtor Eletrônica – NFP-e Conhecimento de Transporte eletrônico para Outros'),
(52, 'Serviços (CT-e OS – modelo 67) TIPOS DE SÉRIE DE DOCUMENTO FISCAL');

-- TIPOS DE SÉRIE DE DOCUMENTO FISCAL (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoSerieDocFiscal
(
    idTipoSerieDocFiscal Int64,
    dsTipoSerieDocFiscal String
)
ENGINE = MergeTree
ORDER BY idTipoSerieDocFiscal;
INSERT INTO simam.TipoSerieDocFiscal (idTipoSerieDocFiscal, dsTipoSerieDocFiscal) VALUES
(1, 'D-1'),
(2, 'M-1'),
(3, 'A'),
(4, 'A-1'),
(5, 'A-2'),
(6, 'B'),
(7, 'B-1'),
(8, 'B-2'),
(9, 'M-7'),
(10, 'M-8'),
(11, '1'),
(12, 'NFe'),
(99, 'Outras Séries LIQUIDAÇÃO QUANTITATIVA DE EMPENHOS DO EXERCÍCIO E DE RESTOS A PAGAR');

-- TIPOS DE OBJETO DA DESPESA (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoObjetoDespesa
(
    idTipoObjetoDespesa Int64,
    dsTipoObjetoDespesa String,
    cdTabelaOrigem String
)
ENGINE = MergeTree
ORDER BY idTipoObjetoDespesa;
INSERT INTO simam.TipoObjetoDespesa (idTipoObjetoDespesa, dsTipoObjetoDespesa, cdTabelaOrigem) VALUES
(1, 'Gasolina', 'NULL'),
(2, 'Etanol', 'NULL'),
(3, 'Diesel', 'NULL'),
(4, 'Biodiesel', 'NULL'),
(5, 'GNV', 'NULL'),
(6, 'Querosene', 'NULL Energia Eletrica Consumida por Veículos          NULL             S'),
(8, 'e Equipamentos', ''),
(24, 'Lubrificante', 'NULL'),
(26, 'Veículos FLEX e Assemelhados', 'NULL'),
(27, 'Pneus para Caminhões', 'NULL'),
(28, 'Pneus para Tratores', 'NULL'),
(29, 'Pneus para Veículos e Utilitários', 'NULL Pneus para Outros Veículos e                     NULL             S'),
(30, 'Equipamentos', ''),
(99999, 'Outros Objetos da Despesa', 'NULL TIPOS DE OBJETO DA DESPESA');

-- TIPOS DE OBJETO DA DESPESA (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoCategoriaXObjetoDespesa
(
    idTipoObjetoDespesa Int64,
    dsTipoObjetoDespesa String
)
ENGINE = MergeTree
ORDER BY idTipoObjetoDespesa;
INSERT INTO simam.TipoCategoriaXObjetoDespesa (idTipoObjetoDespesa, dsTipoObjetoDespesa) VALUES
(1, '1'),
(1, '2'),
(1, '3'),
(1, '4'),
(1, '5'),
(1, '6'),
(1, '26'),
(2, '27'),
(2, '28'),
(2, '29'),
(2, '30 idTipoCategoria idTipoObjetoDespesa                  dsTipoObjetoDespesa ObjetoDespesa Energia Eletrica Consumida por Veículos e'),
(3, '8'),
(999, '99999 ENTRADAS QUANTITATIVAS PELA COMPETÊNCIA ANTES DA LIQUIDAÇÃO ORÇAMENTÁRIA');

-- TIPOS DE OPERAÇÕES DO REALIZÁVEL (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoMovimentoRealizavel
(
    idTipoMovimento Int64,
    dsTipoMovimentoRealizavel String,
    flInscricao String
)
ENGINE = MergeTree
ORDER BY idTipoMovimento;
INSERT INTO simam.TipoMovimentoRealizavel (idTipoMovimento, dsTipoMovimentoRealizavel, flInscricao) VALUES
(1, 'Inscrição do Realizável via Conta Caixa', 'S'),
(2, 'Inscrição do Realizável via Bancos', 'S'),
(3, 'Inscrição do Realizável por Cisão, Fusão ou Extinção', 'S'),
(4, 'Baixa do Realizável por Pagamento via caixa', 'N'),
(5, 'Baixa do Realizável por Pagamento via banco', 'N'),
(6, 'Baixa do Realizável por Cancelamento', 'N'),
(7, 'Baixa do Realizável por Cisão, Fusão ou Extinção', 'N'),
(8, 'Baixa do Realizável por Compensação de Despesa Orçamentária', 'N ESTORNO DO MOVIMENTO DO REALIZÁVEL');

-- TIPOS DE OPERAÇÕES DE DEPÓSITO DO PASSIVO FINANCEIRO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoDepositoRestituivelPassivo
(
    idTipoDeposito Int64,
    dsTipoDepositoRestituivelPassivo String
)
ENGINE = MergeTree
ORDER BY idTipoDeposito;
INSERT INTO simam.TipoDepositoRestituivelPassivo (idTipoDeposito, dsTipoDepositoRestituivelPassivo) VALUES
(1, 'Inscrição de Consignações/Valores Restituíveis de origem orçamentária'),
(3, 'Entidade'),
(4, 'Baixa de Consignações/Valores Restituíveis por Pagamento via Caixa'),
(5, 'Baixa de Consignações/Valores Restituíveis por Pagamento via Banco Baixa de Consignações/Valores Restituíveis por Cisão, Fusão e Extinção de'),
(6, 'Entidades.'),
(7, 'Cancelamento de Consignações/Valores Restituíveis ESTORNO DO MOVIMENTO DE DEPÓSITOS E VALORES RESTITUÍVEIS DO PASSIVO FINANCEIRO');

-- RELAÇÃO DE FONTES PADRÃO POSSÍVEIS PARA TRANSFERÊNCIA DE SALDO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.FontePadraoTransferenciaSaldo
(
    cdFontePadrao String,
    cdFontePadrao_2 String
)
ENGINE = MergeTree
ORDER BY cdFontePadrao;
INSERT INTO simam.FontePadraoTransferenciaSaldo (cdFontePadrao, cdFontePadrao_2) VALUES
('040', '1046 Social Financeiro) Regime Próprio de Previdência                      Compensação entre Regimes'),
('040', '551 Social                                             Previdenciários Recursos de Alienação de Receitas   de   Alienações   de'),
('501', '1047 Ativos Indireta Compensação entre Regimes Compensação entre Regimes'),
('551', '1049 Previdenciários Financeiro Transferências       Voluntárias                   Transferências         Voluntárias'),
('1009', '1009 – Contratos                                        Contratos Operações de Crédito Externas                      Operações de Crédito Externas –'),
('1010', '1010 – Contratos                                        Contratos Transferências     de    Outros                    Transferências      de     Outros'),
('1012', '1012 Privadas Externas                                  Privadas Externas Retenções       em      Caráter'),
('094', '1045 Consignatário Receitas de Alienações de Ativos Receitas   de   Alienações   de'),
('501', '1059 Ativos (Plano Previdenciário) Compensação entre Regimes Regime Próprio de Previdência'),
('40', '1049 Social Financeiro ESTORNO DE TRANSFERÊNCIAS FINANCEIRAS');

-- TIPOS DE DÍVIDA (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoDivida
(
    idTipoDivida Int64,
    dsTipoDivida String
)
ENGINE = MergeTree
ORDER BY idTipoDivida;
INSERT INTO simam.TipoDivida (idTipoDivida, dsTipoDivida) VALUES
(1, 'Aquisição Financiada de Bens e Arrend.Mercantil Financ.'),
(2, 'Antecipação da Receita Orçamentária'),
(3, 'Programa RELUZ'),
(4, 'Melhoria da Administração de Receitas'),
(5, 'Outras Operações de Crédito'),
(6, 'INSS'),
(7, 'FGTS'),
(8, 'PASEP'),
(9, 'Outros Parcelamentos'),
(10, 'Financiamento para Aquisição de Ativos'),
(11, 'Outros Financiamentos'),
(12, 'Operações de Crédito Sujeitas ao Limite'),
(13, 'Precatórios de Pessoal'),
(14, 'Outros Precatórios'),
(99, 'Outras Dívidas CONSOLIDAÇÃO DA DÍVIDA');

-- CONSOLIDAÇÃO DA DÍVIDA (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.ConsolidacaoDivida
(
    idTipoOrigem Int64,
    idTipo Int64,
    idTipo_2 Int64
)
ENGINE = MergeTree
ORDER BY idTipoOrigem;

-- TIPOS DE OPERAÇÕES DE CONTRAPARTIDA E EXECUÇÃO ANTECIPADA (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoContrapartidaExecucacaoAntecipada
(
    idTipoContrapartida Int64,
    dsTipoContrapartida String
)
ENGINE = MergeTree
ORDER BY idTipoContrapartida;
INSERT INTO simam.TipoContrapartidaExecucacaoAntecipada (idTipoContrapartida, dsTipoContrapartida) VALUES
(1, 'Convênios'),
(2, 'Operações de Crédito CONTRAPARTIDA E EXECUÇÃO ANTECIPADA DE CONVÊNIOS FEDERAIS COM RECURSOS PRÓPRIOS');

-- TIPOS DE OPERAÇÕES DE CISÃO E FUSÃO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoOperacaoCisaoFusao
(
    idTipoOperacaoCisaoFusao Int64,
    dsTipoOperacaoCisaoFusao String
)
ENGINE = MergeTree
ORDER BY idTipoOperacaoCisaoFusao;
INSERT INTO simam.TipoOperacaoCisaoFusao (idTipoOperacaoCisaoFusao, dsTipoOperacaoCisaoFusao) VALUES
(1, 'Extinção'),
(2, 'Incorporação');

-- TIPOS DE OBJETIVOS PADRÕES DE CONCESSÃO DE DIÁRIAS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoObjetivoDiaria
(
    idTipoObjetivoDiaria Int64,
    dsTipoObjetivoDiaria String
)
ENGINE = MergeTree
ORDER BY idTipoObjetivoDiaria;
INSERT INTO simam.TipoObjetivoDiaria (idTipoObjetivoDiaria, dsTipoObjetivoDiaria) VALUES
(1, 'Tribunal de Contas do Estado do Paraná – Eventos e Treinamentos'),
(2, 'Tribunal de Contas do Estado do Paraná – Outros Objetivos'),
(3, 'Transporte de Pacientes'),
(4, 'Cursos não ligados ao TCE/PR'),
(5, 'Eventos não ligados ao TCE/PR'),
(99, 'Outros Objetivos não ligados ao TCE/PR PLANO DE CONTAS CONTÁBIL DAS ESTATAIS');

-- ESTATAIS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoNaturezaQuadroEstatal
(
    idTipoNatureza Int64,
    dsTipoNatureza String
)
ENGINE = MergeTree
ORDER BY idTipoNatureza;
INSERT INTO simam.TipoNaturezaQuadroEstatal (idTipoNatureza, dsTipoNatureza) VALUES
(1, 'Conselho de Administração'),
(2, 'Conselho Fiscal'),
(3, 'Direção TIPOS DE FUNÇÕES DO QUADRO DELIBERATIVO E EXECUTIVO DAS ESTATAIS');

-- TIPOS DE FUNÇÕES DO QUADRO DELIBERATIVO E EXECUTIVO DAS ESTATAIS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoFuncaoQuadroEstatal
(
    idTipoFuncao Int64,
    dsTipoFuncaoQuadroEstatal String
)
ENGINE = MergeTree
ORDER BY idTipoFuncao;
INSERT INTO simam.TipoFuncaoQuadroEstatal (idTipoFuncao, dsTipoFuncaoQuadroEstatal) VALUES
(1, 'Presidente'),
(2, 'Vice-Presidente'),
(3, 'Diretor Presidente'),
(4, 'Diretor Financeiro'),
(5, 'Outros Diretores'),
(6, 'Membro'),
(7, 'Suplente ASSOCIAÇÃO DE NATUREZAS X FUNÇÕES DO QUADRO DELIBERATIVO E EXECUTIVO DAS ESTATAIS');

-- EXECUTIVO DAS ESTATAIS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.NaturezaXFuncaoQuadroEstatal
(
    idTipoNatureza Int64,
    dsTipoNatureza String,
    idTipoFuncao Int64,
    dsTipoFuncaoQuadroEstatal String
)
ENGINE = MergeTree
ORDER BY idTipoNatureza;
INSERT INTO simam.NaturezaXFuncaoQuadroEstatal (idTipoNatureza, dsTipoNatureza, idTipoFuncao, dsTipoFuncaoQuadroEstatal) VALUES
(1, 'Conselho de Administração', 1, 'Presidente'),
(1, 'Conselho de Administração', 6, 'Membro'),
(1, 'Conselho de Administração', 7, 'Suplente'),
(2, 'Conselho Fiscal', 1, 'Presidente'),
(2, 'Conselho Fiscal', 6, 'Membro'),
(2, 'Conselho Fiscal', 7, 'Suplente'),
(3, 'Direção', 2, 'Vice-Presidente'),
(3, 'Direção', 3, 'Diretor Presidente'),
(3, 'Direção', 4, 'Diretor Financeiro'),
(3, 'Direção', 5, 'Outros Diretores BAIXA DOS COMPONENTES DO QUADRO DELIBERATIVO E EXECUTIVO DAS ESTATAIS');

-- TIPOS DE BAIXA DO QUADRO DELIBERATIVO E EXECUTIVO DAS ESTATAIS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoBaixaQuadroDeliberativoExecutivo
(
    idTipoBaixaQuadro Int64,
    dsTipoBaixaQuadro String
)
ENGINE = MergeTree
ORDER BY idTipoBaixaQuadro;
INSERT INTO simam.TipoBaixaQuadroDeliberativoExecutivo (idTipoBaixaQuadro, dsTipoBaixaQuadro) VALUES
(1, 'Fim do Mandato'),
(2, 'Renúncia'),
(3, 'Destituição'),
(4, 'Falecimento'),
(99, 'Outros Motivos ALTERAÇÃO DE CONTA CONTÁBIL POR ESTORNOS DE OPERAÇÕES');

-- TIPOS DE OPERAÇÕES DE ALTERAÇÕES (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoOperacaoAlteracao
(
    idTipoOperacaoAlteracao Int64,
    dsTipoOperacaoAlteracao String
)
ENGINE = MergeTree
ORDER BY idTipoOperacaoAlteracao;
INSERT INTO simam.TipoOperacaoAlteracao (idTipoOperacaoAlteracao, dsTipoOperacaoAlteracao) VALUES
(1, 'Estorno de Depósito Restituível Passivo'),
(2, 'Estorno de Movimento do Realizável'),
(3, 'Estorno de Ingresso e Atualizacao da Dívida'),
(4, 'Estorno de Registro Permutativo Status da Dívida ALTERAÇÃO DE CONTA CONTÁBIL ENTRE EXERCÍCIOS');

-- TIPO DE OPERAÇÃO DA ÁREA DO CONSÓRCIO INTERMUNICIPAL (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoOperacaoAreaConsorcio
(
    idTipoOperacaoAreaConsorcio Int64,
    dsTipoOperacaoAreaConsorcio String
)
ENGINE = MergeTree
ORDER BY idTipoOperacaoAreaConsorcio;
INSERT INTO simam.TipoOperacaoAreaConsorcio (idTipoOperacaoAreaConsorcio, dsTipoOperacaoAreaConsorcio) VALUES
(1, 'Inclusão'),
(2, 'Exclusão TIPOS DE ÁREAS DE ATUAÇÃO DOS CONSÓRCIOS INTERMUNICIPAIS');

-- TIPOS DE ÁREAS DE ATUAÇÃO DOS CONSÓRCIOS INTERMUNICIPAIS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoAreaConsorcio
(
    idTipoAreaConsorcio Int64,
    dsTipoAreaConsorcio String
)
ENGINE = MergeTree
ORDER BY idTipoAreaConsorcio;
INSERT INTO simam.TipoAreaConsorcio (idTipoAreaConsorcio, dsTipoAreaConsorcio) VALUES
(1, 'Saúde'),
(2, 'Samae'),
(3, 'Coleta de Lixo'),
(4, 'Aterro Sanitário'),
(5, 'Proteção Ambiental'),
(6, 'Direitos da Criança e do Adolescente'),
(7, 'Desenvolvimento Sustentável'),
(8, 'Uso Compartilhado de Equipamentos'),
(9, 'SAMU – Serviço de Atendimento Médico de Urgência'),
(10, 'Infraestrutura e Desenvolvimento Urbano'),
(11, 'Educação'),
(99, 'Outras Áreas NATUREZA JURÍDICA DOS CONSÓRCIOS INTERMUNICIPAIS');

-- NATUREZA JURÍDICA DOS CONSÓRCIOS INTERMUNICIPAIS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoNaturezaJuridicaConsorcio
(
    idTipoNatureza Int64,
    dsTipoNatureza String
)
ENGINE = MergeTree
ORDER BY idTipoNatureza;
INSERT INTO simam.TipoNaturezaJuridicaConsorcio (idTipoNatureza, dsTipoNatureza) VALUES
(1210, 'Consórcio Público de Direito Público (Associação Pública)'),
(1228, 'Consórcio Público de Direito Privado'),
(3999, 'Associação Privada CADASTRO DE MUNICÍPIOS CONSORCIADOS');

-- TIPOS DE CONTRATOS DE CONSÓRCIOS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoContratoConsorcio
(
    idTipoContratoConsorcio Int64,
    dsTipoContratoConsorcio String
)
ENGINE = MergeTree
ORDER BY idTipoContratoConsorcio;
INSERT INTO simam.TipoContratoConsorcio (idTipoContratoConsorcio, dsTipoContratoConsorcio) VALUES
(1, 'Rateio'),
(2, 'Programa VALORES DOS CONTRATOS DE RATEIO E DE PROGRAMAS');

-- TIPOS DE ADITIVOS DE CONTRATOS DE CONSÓRCIOS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoAditivoContratoConsorcio
(
    idTipoAditivoContratoConsorcio Int64,
    dsTipoAditivoContratoConsorcio String
)
ENGINE = MergeTree
ORDER BY idTipoAditivoContratoConsorcio;
INSERT INTO simam.TipoAditivoContratoConsorcio (idTipoAditivoContratoConsorcio, dsTipoAditivoContratoConsorcio) VALUES
(1, 'Prazo'),
(2, 'Valor'),
(3, 'Prazo e Valor VALORES DOS ADITIVOS DOS CONTRATOS DE RATEIO E DE PROGRAMAS');

-- TIPOS DE EMENDAS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoEmenda
(
    idTipoEmenda Int64,
    dsTipoEmenda String
)
ENGINE = MergeTree
ORDER BY idTipoEmenda;
INSERT INTO simam.TipoEmenda (idTipoEmenda, dsTipoEmenda) VALUES
(1, 'Emendas Individuais Impositivas por Transf. Especial'),
(2, 'Emenda Impositiva (Vereadores) TIPOS DE OPERAÇÕES DE EMENDAS');

-- TIPOS DE OPERAÇÕES DE EMENDAS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoOperacaoEmenda
(
    idTipoOperacaoEmenda Int64,
    dsTipoOperacaoEmenda String
)
ENGINE = MergeTree
ORDER BY idTipoOperacaoEmenda;
INSERT INTO simam.TipoOperacaoEmenda (idTipoOperacaoEmenda, dsTipoOperacaoEmenda) VALUES
(1, 'Contrapartida do Beneficiário da Emenda'),
(2, 'Emenda Municipal CONSOLIDAÇÃO DOS TIPOS DE EMENDAS');

-- CONSOLIDAÇÃO DOS TIPOS DE EMENDAS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.ConsolidacaoTipoEmenda
(
    idConsolidacao Int64,
    idTipoEmenda Int64,
    idTipoOperacao Int64,
    idTipoEsfera Int64
)
ENGINE = MergeTree
ORDER BY idConsolidacao;
INSERT INTO simam.ConsolidacaoTipoEmenda (idConsolidacao, idTipoEmenda, idTipoOperacao, idTipoEsfera) VALUES
(1, 1, 1, 4);

