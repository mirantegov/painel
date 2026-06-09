-- MÓDULO PLANEJAMENTO E ORÇAMENTO — 30 tabelas (seeds)

-- TIPOS DE CONTROLE DA MOVIMENTAÇÃO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoMovimento
(
    idTipoMovimento Int64,
    dsTipoMovimento String
)
ENGINE = MergeTree
ORDER BY idTipoMovimento;
INSERT INTO simam.TipoMovimento (idTipoMovimento, dsTipoMovimento) VALUES
(1, 'Inclusão do Primeiro Registro na Tabela por força de Lei/Ato'),
(2, 'Alteração por força de nova Lei/Ato'),
(3, 'Alteração por Incorreção de Dados'),
(4, 'Cancelamento por força de nova Lei/Ato CADASTRO DE INDICADORES');

-- TIPOS DE INDICADORES (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoIndicador
(
    idTipoIndicador Int64,
    dsTipoIndicador String
)
ENGINE = MergeTree
ORDER BY idTipoIndicador;
INSERT INTO simam.TipoIndicador (idTipoIndicador, dsTipoIndicador) VALUES
(1, 'Taxa de Evasão Escolar'),
(2, 'Taxa de Repetência Escolar'),
(3, 'Taxa de Alfabetismo'),
(4, 'Taxa de Frequência Escolar'),
(5, 'Taxa de Atendimento ao Idoso'),
(6, 'Taxa de Atendimento à População pelo Programa Saúde da Família – PSF'),
(7, 'Renda Per Capita'),
(8, 'Taxa de Analfabetismo de Adultos'),
(9, 'Taxa de Mortalidade'),
(10, 'Taxa de Mortalidade Infantil'),
(11, 'Taxa de Natimortalidade'),
(999, 'Outros Indicadores TIPOS DE NATUREZA INDICADOR');

-- TIPOS DE NATUREZA INDICADOR (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.NaturezaIndicador
(
    cdNaturezaIndicador String,
    dsNaturezaIndicador String
)
ENGINE = MergeTree
ORDER BY cdNaturezaIndicador;

-- TIPOS DE INDICADOR X NATUREZA (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoXNaturezaIndicador
(
    idTipoIndicador Int64,
    cdNaturezaIndicador String
)
ENGINE = MergeTree
ORDER BY idTipoIndicador;
INSERT INTO simam.TipoXNaturezaIndicador (idTipoIndicador, cdNaturezaIndicador) VALUES
(1, 'E'),
(2, 'E'),
(3, 'E'),
(4, 'E'),
(5, 'S'),
(6, 'S'),
(7, 'H'),
(8, 'H'),
(9, 'H'),
(10, 'H'),
(11, 'H'),
(999, 'O TIPOS DE PÚBLICO ALVO');

-- TIPOS DE UNIDADE MEDIDAS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.UnidadeMedida
(
    idUnidadeMedida Int64,
    dsUnidadeMedida String
)
ENGINE = MergeTree
ORDER BY idUnidadeMedida;
INSERT INTO simam.UnidadeMedida (idUnidadeMedida, dsUnidadeMedida) VALUES
(1, 'Pessoas'),
(2, 'Metros Quadrados'),
(3, 'Metros Lineares'),
(4, 'Metros Cúbicos'),
(5, 'Hectares'),
(6, 'Alqueires Paulista'),
(7, 'Unidade'),
(8, 'Valores Financeiros'),
(9, 'Percentual'),
(10, 'Litros'),
(11, 'Quilômetros'),
(12, 'Toneladas'),
(13, 'Horas'),
(14, 'kWh – Energia Eletrica'),
(999, 'Outras Unidades e Medidas CADASTRO DE MEDIDAS ANUAIS ESPERADAS DOS INDICADORES');

-- TIPO DE NATUREZA DAS AÇÕES DOS PLANOS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.NaturezaAcao
(
    idNaturezaAcao Int64,
    dsNaturezaAcao String
)
ENGINE = MergeTree
ORDER BY idNaturezaAcao;
INSERT INTO simam.NaturezaAcao (idNaturezaAcao, dsNaturezaAcao) VALUES
(1, 'Obra'),
(2, 'Aquisição de Bens Imóveis'),
(3, 'Aquisição de Bens Móveis e Equipamentos'),
(99, 'Outras Naturezas TIPO DE EXECUÇÃO DA AÇÃO');

-- TIPO DE EXECUÇÃO DA AÇÃO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoExecucaoAcao
(
    idTipoExecucaoAcao Int64,
    dsTipoExecucaoAcao String
)
ENGINE = MergeTree
ORDER BY idTipoExecucaoAcao;
INSERT INTO simam.TipoExecucaoAcao (idTipoExecucaoAcao, dsTipoExecucaoAcao) VALUES
(1, 'Execução Direta'),
(2, 'Transferência Voluntária'),
(99, 'Outros Tipos de Execução de Ações TIPOS DE AÇÕES');

-- TIPOS DE AÇÕES (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoAcao
(
    idTipoAcao Int64,
    dsTipoAcao String
)
ENGINE = MergeTree
ORDER BY idTipoAcao;
INSERT INTO simam.TipoAcao (idTipoAcao, dsTipoAcao) VALUES
(1, 'Projeto'),
(2, 'Atividade'),
(3, 'Operação Especial'),
(4, 'Parcerias'),
(5, 'Projeto – ECA/FMDCA'),
(6, 'Atividades – ECA/FMDCA'),
(7, 'Incentivos'),
(11, 'Projeto – Resíduos Sólidos'),
(12, 'Atividade – Resíduos Sólidos'),
(99, 'Outras Iniciativas e Diretrizes LEGENDA: O – Orçamentária N – Não Orçamentária TIPOS DE PRODUTOS DAS AÇÕES');

-- TIPOS DE PRODUTOS DAS AÇÕES (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.Produto
(
    idProduto Int64,
    dsProduto String
)
ENGINE = MergeTree
ORDER BY idProduto;
INSERT INTO simam.Produto (idProduto, dsProduto) VALUES
(1, 'Adolescentes Atendidos'),
(2, 'Alunos Atendidos'),
(3, 'Ambulâncias Adquiridas'),
(4, 'Apoio Administrativo'),
(5, 'Aposentados Atendidos'),
(6, 'Aterro Sanitário'),
(7, 'Caminhões'),
(8, 'Contribuintes Atendidos'),
(9, 'Creche Construída/Ampliada ou Reformada'),
(10, 'Crianças Atendidas'),
(11, 'Edificação Construída'),
(12, 'Escola Construída/Ampliada ou Reformada'),
(13, 'Galerias de Águas Pluviais'),
(14, 'Idosos Atendidos'),
(15, 'Leitos'),
(16, 'Motoniveladora'),
(17, 'Obra Construída/Ampliada'),
(18, 'Ônibus/Micro-ônibus'),
(19, 'Pá Carregadeira'),
(20, 'Pacientes Atendidos'),
(21, 'Pavimentação de Vias'),
(22, 'Pensionistas Atendidos'),
(23, 'Pessoas Atendidas'),
(24, 'Poços Artesianos'),
(25, 'Recapeamento de Vias'),
(26, 'Restauração de Estradas Vicinais'),
(27, 'Servidores Atendidos'),
(28, 'Terrenos/Lotes Adquiridos'),
(29, 'Tratores'),
(30, 'Unidades Habitacionais Produzidas/Adquiridas'),
(31, 'Veículos'),
(999, 'Outros Produtos ASSOCIAÇÃO DE PRODUTO X UNIDADE MEDIDA');

-- ASSOCIAÇÃO DE PRODUTO X UNIDADE MEDIDA (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.ProdutoXUnidadeMedida
(
    idProduto Int64,
    dsProduto String,
    idUnidade Int64,
    dsUnidadeMedida String
)
ENGINE = MergeTree
ORDER BY idProduto;
INSERT INTO simam.ProdutoXUnidadeMedida (idProduto, dsProduto, idUnidade, dsUnidadeMedida) VALUES
(1, 'Adolescentes Atendidos', 1, 'Pessoas'),
(2, 'Alunos Atendidos', 1, 'Pessoas'),
(3, 'Ambulâncias Adquiridas', 7, 'Unidade'),
(4, 'Apoio Administrativo', 999, 'Outras Unidades e Medidas'),
(5, 'Aposentados Atendidos', 1, 'Pessoas'),
(6, 'Aterro Sanitário', 7, 'Unidade'),
(6, 'Aterro Sanitário', 2, 'Metros Quadrados'),
(7, 'Caminhões', 7, 'Unidade'),
(8, 'Contribuintes Atendidos', 1, 'Pessoas'),
(9, 'Creche Construída/Ampliada ou Reformada', 2, 'Metros Quadrados'),
(10, 'Crianças Atendidas', 1, 'Pessoas'),
(11, 'Edificação Construída', 2, 'Metros Quadrados'),
(12, 'Escola Construída/Ampliada ou Reformada', 2, 'Metros Quadrados'),
(13, 'Galerias de Águas Pluviais', 3, 'Metros Lineares'),
(13, 'Galerias de Águas Pluviais', 7, 'Unidade'),
(14, 'Idosos Atendidos', 1, 'Pessoas'),
(15, 'Leitos', 1, 'Pessoas'),
(16, 'Motoniveladora', 7, 'Unidade'),
(17, 'Obra Construída/Ampliada', 2, 'Metros Quadrados'),
(18, 'Ônibus/Micro-ônibus', 7, 'Unidade'),
(19, 'Pá Carregadeira', 7, 'Unidade'),
(20, 'Pacientes Atendidos', 1, 'Pessoas'),
(21, 'Pavimentação de Vias', 2, 'Metros Quadrados'),
(21, 'Pavimentação de Vias', 3, 'Metros Lineares'),
(22, 'Pensionistas Atendidos', 1, 'Pessoas'),
(23, 'Pessoas Atendidas', 1, 'Pessoas'),
(24, 'Poços Artesianos', 7, 'Unidade'),
(25, 'Recapeamento de Vias', 2, 'Metros Quadrados'),
(26, 'Restauração de Estradas Vicinais', 2, 'Metros Quadrados'),
(27, 'Servidores Atendidos', 1, 'Pessoas'),
(28, 'Terrenos/Lotes Adquiridos', 2, 'Metros Quadrados'),
(28, 'Terrenos/Lotes Adquiridos', 5, 'Hectares'),
(28, 'Terrenos/Lotes Adquiridos', 6, 'Alqueires Paulista'),
(29, 'Tratores', 7, 'Unidade'),
(30, 'Unidades Habitacionais Produzidas/Adquiridas', 7, 'Unidade'),
(30, 'Unidades Habitacionais Produzidas/Adquiridas', 2, 'Metros Quadrados'),
(31, 'Veículos', 7, 'Unidade'),
(999, 'Outros Produtos', 999, 'Outras Unidades e Medidas AÇÕES VINCULADAS COM OS RESPECTIVOS PROGRAMAS');

-- TIPOS DE CONTROLE DAS AÇÕES SEM CORRELAÇÃO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoControleAcao
(
    idTipoControleAcao Int64,
    dsTipoControleAcao String
)
ENGINE = MergeTree
ORDER BY idTipoControleAcao;
INSERT INTO simam.TipoControleAcao (idTipoControleAcao, dsTipoControleAcao) VALUES
(1, 'Inscrição de Ação sem Correlação'),
(2, 'Estorno CORRELAÇÃO DOS VALORES ANUAIS DAS AÇÕES');

-- TIPOS DE OPERAÇÃO DA RECEITA ORÇAMENTÁRIA (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoOperacaoReceita
(
    idTipoOperacaoReceita Int64,
    dsTipoOperacaoReceita String
)
ENGINE = MergeTree
ORDER BY idTipoOperacaoReceita;
INSERT INTO simam.TipoOperacaoReceita (idTipoOperacaoReceita, dsTipoOperacaoReceita) VALUES
(1, 'Receita'),
(2, 'Renúncia'),
(3, 'Restituições'),
(4, 'Descontos Concedidos'),
(5, 'Deduções de Receita para a Formação do FUNDEB');

-- TIPOS DE RISCOS FISCAIS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.RiscoFiscal
(
    idRiscoFiscal Int64,
    dsRiscoFiscal String
)
ENGINE = MergeTree
ORDER BY idRiscoFiscal;
INSERT INTO simam.RiscoFiscal (idRiscoFiscal, dsRiscoFiscal) VALUES
(1, 'Demandas Judiciais'),
(2, 'Dívidas em Processo de Recolhimento'),
(3, 'Avais e Garantias Concedidas'),
(4, 'Assunção de Passivos'),
(5, 'Outros Passivos Contingentes'),
(6, 'Frustração de Arrecadação'),
(7, 'Restituição de Tributos a Maior'),
(8, 'Discrepância de Projeções'),
(9, 'Assistências Diversas'),
(99, 'Outros Riscos Fiscais DEMONSTRATIVO - METAS ANUAIS');

-- ORIGEM DOS RECURSOS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.OrigemRecurso
(
    cdOrigem String,
    dsOrigem String
)
ENGINE = MergeTree
ORDER BY cdOrigem;
INSERT INTO simam.OrigemRecurso (cdOrigem, dsOrigem) VALUES
('01', 'Recursos Ordinários / Livres'),
('02', 'Transferências do FUNDEB'),
('03', 'Transferências Voluntárias'),
('04', 'Alienação de Bens'),
('05', 'Operações de Crédito'),
('06', 'Contratos de Rateio de Consórcios Públicos'),
('08', 'Regime Próprio de Previdência'),
('09', 'Transferências de Programas'),
('10', 'Antecipação da Receita Orçamentária – ARO'),
('11', 'Programas/Transferências Voluntárias Anteriores a 2013 Reclassificados'),
('12', 'Emendas Parlamentares'),
('13', 'Apoio Financeiro aos Municípios - AFM'),
('14', 'Cessão Onerosa – Pré-Sal'),
('94', 'Valores Restituíveis'),
('99', 'Outras Origens APLICAÇÃO DOS RECURSOS POR FONTES');

-- APLICAÇÃO DOS RECURSOS POR FONTES (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.AplicacaoRecurso
(
    cdAplicacao String,
    dsAplicacao String
)
ENGINE = MergeTree
ORDER BY cdAplicacao;
INSERT INTO simam.AplicacaoRecurso (cdAplicacao, dsAplicacao) VALUES
('01', 'Educação'),
('02', 'Saúde'),
('03', 'Previdência'),
('04', 'Direitos da Criança e do Adolescente'),
('05', 'Consórcios Intermunicipais – Contrato de Rateio'),
('06', 'SUAS'),
('07', 'Recursos de Livre Movimentação'),
('99', 'Outras Áreas DESDOBRAMENTO PADRÃO DAS FONTES DE RECURSOS');

-- DESDOBRAMENTO PADRÃO DAS FONTES DE RECURSOS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.DesdobramentoFonte
(
    cdDesdobramento String,
    dsDesdobramento String
)
ENGINE = MergeTree
ORDER BY cdDesdobramento;
INSERT INTO simam.DesdobramentoFonte (cdDesdobramento, dsDesdobramento) VALUES
('00', 'Detalhamento a Classificar'),
('01', 'Transferências Voluntárias Públicas'),
('02', 'Transferências Voluntárias Privadas'),
('03', 'Operações de Crédito Internas'),
('04', 'Operações de Crédito Externas'),
('05', 'Transferências de Programas Estaduais'),
('06', 'Transferências de Programas Federais'),
('07', 'Programas/Transferências Voluntárias Anteriores a 2013 Reclassificados DETALHAMENTO PADRÃO DAS FONTES DE RECURSOS');

-- DETALHAMENTO PADRÃO DAS FONTES DE RECURSOS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.DetalhamentoFonte
(
    cdDetalhamento String,
    dsDetalhamento String
)
ENGINE = MergeTree
ORDER BY cdDetalhamento;
INSERT INTO simam.DetalhamentoFonte (cdDetalhamento, dsDetalhamento) VALUES
('00', 'Título a Classificar'),
('01', 'Transferências Voluntárias Estaduais'),
('02', 'Transferências Voluntárias Federais'),
('03', 'Outras Transferências Voluntárias Públicas'),
('04', 'Transf. Voluntárias de Entidades Gov. Nacionais – ECA/FMDCA'),
('05', 'Fundo do Idoso, inclusive art. 9º IN RFB nº 1131/2011'),
('06', 'Bloco de Financiamento da Proteção Social Básica (SUAS)'),
('07', 'Bloco de Financiamento da Proteção Sociais Especial (SUAS)'),
('08', 'Componente para Qualificação da Gestão (SUAS)'),
('09', 'Bloco de Investimentos (SUAS)'),
('10', 'Contribuições e Legados de Entidades não Governamentais – ECA/FMDCA'),
('11', 'Fundo do Idoso, inclusive art. 9º IN RFB nº 1131/2011 – Não Governamentais'),
('12', 'Transferências Voluntárias Privadas Internas'),
('13', 'Transferências Voluntárias Privadas Externas'),
('14', 'Operações de Crédito Internas - Mobiliárias'),
('15', 'Operações de Crédito Internas – Contratos'),
('16', 'Operações de Crédito Externas - Mobiliárias'),
('17', 'Operações de Crédito Externas– Contratos'),
('18', 'Transferências de Outros Programas'),
('19', 'Outros Programas SUAS'),
('20', 'Transferências do SUS'),
('23', 'Bloco de Financiamento da Proteção Social Especial de Média Complexidade - Portaria MDS'),
('113/2015', ''),
('24', 'Bloco de Financiamento da Proteção Social Especial de Alta Complexidade - Portaria MDS'),
('113/2015', ''),
('26', 'Bloco de Financiamento da Proteção Social Especial de Média e Alta Complexidade'),
('000', '01 Impostos Recursos        do         Tesouro'),
('001', '01 (Descentralizados) Recursos Vinculados ao RPPS - Regime Próprio de Previdência'),
('040', '08 Social Previdenciário) Fundo     Especial    da   Câmara'),
('068', '01 Municipal Receitas        Intraorçamentárias'),
('069', '01'),
('P869/05STN Operações     de     Crédito    por', ''),
('075', '10 Orçamentária – ARO Operações     de     Crédito    por'),
('075', '10 Orçamentária – ARO Operações     de     Crédito    por'),
('075', '10 Orçamentária – ARO Retenções        em         Caráter'),
('094', '94 Consignatório Recursos Vinculados ao RPPS - Taxa de Administração / Reserva de                       Recursos Vinculados ao RPPS -'),
('100', '08 Sobras da Taxa de Administração                          Taxa de Administração do RPPS Transferências do FUNDEB - Fundeb 60% / Fundeb mínimo 70%'),
('101', '02'),
('- inciso XI do art. 212-A da CF Impostos Transferências do FUNDEB - Fundeb 40% / Fundeb máximo 30%', ''),
('102', '02'),
('- inciso XI do art. 212-A da CF Impostos', ''),
('5%', 'Sobre'),
('105', '04 Educação/Indenização de Sinistros                        Bens/Ativos - Administração Direta'),
('107', '99 Saúde - Receitas Vinculadas (EC                          Recursos    não                      Vinculados   de'),
('303', '01'),
('29/00 - 15%)', 'Impostos Receitas de alienação de Ativos da                       Recursos      de   Alienação      de'),
('369', '09 Faturamentos AIHs Manutenção das Ações e Serviços Públicos de Saúde Transferências Fundo a Fundo de'),
('495', '09 Governo Estadual Transferências Fundo a Fundo de Recursos do SUS provenientes do'),
('495', '09 Manutenção das Ações e Serviços Públicos de Saúde Atenção    de      Média   e    Alta                      Transferências Fundo a Fundo de'),
('496', '09 Hospitalar                                                Manutenção das Ações e Serviços Públicos de Saúde Transferências Fundo a Fundo de'),
('497', '09 Governo Estadual Transferências Fundo a Fundo de Recursos do SUS provenientes do'),
('497', '09 Manutenção das Ações e Serviços Públicos de Saúde Transferências Fundo a Fundo de'),
('498', '09 Governo Estadual Transferências Fundo a Fundo de Recursos do SUS provenientes do'),
('498', '09 Manutenção das Ações e Serviços Públicos de Saúde Transferências Fundo a Fundo de'),
('499', '09 Governo Estadual Transferências Fundo a Fundo de Recursos do SUS provenientes do'),
('499', '09 Manutenção das Ações e Serviços Públicos de Saúde Bloco de Investimentos na Rede de                         Transferências Fundo a Fundo de'),
('500', '09 GM, de 2007                                               Estruturação da Rede de Serviços Públicos de Saúde Recursos      de   Alienação      de'),
('501', '04 Bens/Ativos - Administração Direta Receitas de Alienações de Ativos -                        Recursos      de   Alienação      de'),
('507', '99 Pública, Art. 149-A, CF Pública – COSIP Fundo de Reserva Depósitos Recursos de Depósitos Judiciais -'),
('508', '99 Lides das quais o Ente faz parte Complementar nº 151/2015)'),
('509', '99 Recursos Provenientes de Taxas,'),
('510', '01 Contribuições e Preços Públicos Recursos Provenientes de Taxas,'),
('511', '01 Contribuições e Preços Públicos Recursos da Contribuição de'),
('512', '99 CIDE Penalidades Administrativas Lei n.                          Outros Recursos                    Vinculados   à'),
('513', '99'),
('8069/90 - Art. 214-ECA/FMDCA', 'Assistência Social Indenizações Recebidas por bens                             Recursos      de   Alienação      de'),
('514', '99 sinistrados de outras áreas                                 Bens/Ativos - Administração Direta'),
('515', '99'),
('516', '01 Recursos Vinculados ao RPPS - Receita de Extinção da Entidade'),
('550', '08 Previdenciária Financeiro) Recursos Vinculados ao RPPS - Compensação           entre   Regimes'),
('551', '08 Previdenciários Previdenciário) Alienação    de     Ativos     para Recursos      de   Alienação      de'),
('552', '04 Bens/Ativos - Administração Direta RPPS SANEPAR        -     Compensação'),
('555', '99 Município'),
('556', '99 Transferência de Recursos dos Transf. Voluntárias de Entidades'),
('879', '09 Gov. Nacionais - ECA/FMDCA Social Transferência de Recursos do Fundo Transf. Voluntárias de Entidades'),
('880', '03 Entidades não Gover. ECA/FMDCA à Assistência Social Transferências de Convênios e Fundo do Idoso, inclusive art. 9º IN'),
('900', '03 RFB nº 1131/2011 à Assistência Social Transferência de Recursos dos Fundo do Idoso, inclusive art. 9º IN'),
('900', '09 RFB nº 1131/2011 Social Transferência de Recursos do Fundo Fundo do Idoso, inclusive art. 9º IN'),
('900', '09 RFB nº 1131/2011 FNAS Transferência de Recursos dos Bloco de financiamento da Proteção'),
('934', '09 Social Básica (SUAS) Social Transferência de Recursos do Fundo Bloco de financiamento da Proteção'),
('934', '09 Social Básica (SUAS) FNAS Transferência de Recursos dos Bloco de financiamento da Proteção'),
('935', '09 Social Especial (SUAS) Social Transferência de Recursos do Fundo Bloco de financiamento da Proteção'),
('935', '09 Social Especial (SUAS) FNAS Transferência de Recursos dos Componente para Qualificação da'),
('936', '09 Gestão (SUAS) Social Transferência de Recursos do Fundo Componente para Qualificação da'),
('936', '09 Gestão (SUAS) FNAS Transferência de Recursos dos'),
('937', '09 Social Transferência de Recursos do Fundo'),
('937', '09 FNAS Outros Recursos Vinculados à'),
('999', '01 Educação'),
('999', '01'),
('999', '01 Recursos de Contratos de Rateio'),
('1000', '06 a Pessoal e Encargos Sociais Recursos de Contratos de Rateio'),
('1001', '06 a Juros e Encargos da Dívida Recursos de Contratos de Rateio'),
('1002', '06 a Outras Despesas Correntes Recursos de Contratos de Rateio'),
('1003', '06 a Investimentos Recursos de Contratos de Rateio'),
('1005', '03 Estaduais Congêneres vinculados à Educação Transferências do Estado referentes Transferências Voluntárias Públicas'),
('1005', '03 Estaduais Congêneres vinculados à Saúde Transferências de Convênios e Transferências Voluntárias Públicas'),
('1005', '03 Estaduais à Assistência Social Outras Transferências de Convênios Transferências Voluntárias Públicas'),
('1005', '03 Estaduais Estados Outras Transferências de Convênios Transferências Voluntárias Públicas'),
('1005', '03 Estaduais Estados Transferências do Governo Federal Transferências Voluntárias Públicas                      referentes     a     Convênios    e'),
('1006', '03 Federais à Assistência Social Outras Transferências de Convênios Transferências Voluntárias Públicas'),
('1006', '03 Federais União Outras Transferências de Convênios Transferências Voluntárias Públicas'),
('1006', '03 Federais União Transferências     de    Municípios Outras Transferências Voluntárias                        referentes     a     Convênios    e'),
('1007', '03 Públicas Congêneres vinculados à Saúde Transferências de Convênios e Outras Transferências Voluntárias'),
('1007', '03 Públicas à Assistência Social Outras Transferências de Convênios Outras Transferências Voluntárias'),
('1007', '03 Públicas Municípios Outras Transferências de Convênios Outras Transferências Voluntárias'),
('1007', '03 Públicas Municípios Outras Transferências de Convênios Transferências Voluntárias Privadas'),
('1008', '03 Internas vinculados à Educação Outras Transferências de Convênios Transferências Voluntárias Privadas'),
('1008', '03 Internas vinculados à Saúde Transferências de Convênios e Transferências Voluntárias Privadas'),
('1008', '03 Internas outras Entidades Outras Transferências de Convênios Transferências Voluntárias Privadas'),
('1008', '03 Internas outras Entidades Operações de Crédito Internas -                             Operações de Crédito Vinculadas à'),
('1009', '05 Contratos                                                   Saúde Operações de Crédito Internas -'),
('1009', '05 Contratos Operações de Crédito Internas -'),
('1009', '05 Contratos Operações de Crédito Externas –                             Operações de Crédito Vinculadas à'),
('1010', '05 Contratos                                                   Saúde Operações de Crédito Externas –'),
('1010', '05 Contratos Operações de Crédito Externas –'),
('1010', '05 Contratos Transferências de Recursos dos Transferências             de   Outros'),
('1011', '09 Programas educação Transferências Fundo a Fundo de Transferências             de   Outros'),
('1011', '09 Programas Governo Estadual Transferências             de   Outros'),
('1011', '09 Programas Transferências             de   Outros'),
('1011', '09 Programas Transferências             de   Outros                      Outros Recursos                    Vinculados   à'),
('1011', '09 Programas                                                   Educação Transferências             de   Outros'),
('1011', '09 Programas Transferências             de   Outros                      Outros Recursos                    Vinculados   à'),
('1011', '09 Programas                                                   Assistência Social Transferências             de   Outros'),
('1011', '09 Programas Transferências             de   Outros'),
('1011', '09 Programas Outras Transferências de Convênios Transferências Voluntárias Privadas'),
('1012', '03 Externas vinculados à Educação Outras Transferências de Convênios Transferências Voluntárias Privadas'),
('1012', '03 Externas vinculados à Saúde Outras Transferências de Convênios Transferências Voluntárias Privadas'),
('1012', '03 Externas outras Entidades Outras Transferências de Convênios Transferências Voluntárias Privadas'),
('1012', '03 Externas outras Entidades IGDSuas Portaria MDS 337/2011                               Transferência de Recursos do Fundo'),
('1013', '09 Programas educação Programas/Transferências Outros Recursos                    Vinculados   à'),
('1014', '11 Educação Reclassificados Programas/Transferências'),
('1014', '11 Reclassificados Programas/Transferências'),
('1014', '11 Reclassificados Serviços    Prestados     SUS   /'),
('369', '09 Faturamentos AIH'),
('495', '09 Atenção    de      Média   e    Alta'),
('496', '09 Hospitalar'),
('497', '09'),
('498', '09'),
('499', '09 Bloco de Investimentos na Rede de'),
('500', '09 GM, de 2007 Transf. Voluntárias de Entidades                            Outros Recursos                    Vinculados   à'),
('936', '09 Gestão (SUAS)                                               Assistência Social Outros Recursos                    Vinculados   à'),
('937', '09 Assistência Social Operações de Crédito Anteriores a'),
('1009', '05'),
('2013 Reclassificadas IGDMSuas Portaria MDS 754/2010                              Transferência de Recursos do Fundo', ''),
('938', '09 Complexidade - Portaria MDS Social'),
('113/2015 Bloco   de    Financiamento   da Transferência de Recursos do Fundo Proteção Social Especial de Média', ''),
('938', '09 Complexidade - Portaria MDS FNAS'),
('113/2015 Bloco   de    Financiamento   da Transferência de Recursos dos Proteção Social Especial de Alta', ''),
('939', '09 Complexidade - Portaria MDS Social'),
('939', '09 Complexidade - Portaria MDS FNAS'),
('113/2015 Bloco de Financiamento da Gestão Transferência de Recursos dos do Programa Bolsa família e', ''),
('940', '09 Cadastro Único - Portaria MDS Social'),
('113/2015 Bloco de Financiamento da Gestão Transferência de Recursos do Fundo do Programa Bolsa família e', ''),
('940', '09 Cadastro Único - Portaria MDS FNAS'),
('113/2015 Transferência de Recursos dos Transferências             de   Outros', ''),
('1011', '09 Programas Social Desvinculação das Receitas dos'),
('002', '01 Municípios – DRM ROYALTIES/ANP - Produção de                                 Royalties do Petróleo e Gás Natural'),
('1006', '12 Federais à Assistência Social Outras Transferências de Convênios Transferências Voluntárias Públicas'),
('1006', '12 Federais União Outras Transferências de Convênios Transferências Voluntárias Públicas'),
('1006', '12 Federais União Transferências Fundo a Fundo de Bloco de Custeio das Ações e'),
('494', '09 Serviços Públicos de Saúde Governo Estadual Transferências Fundo a Fundo de Recursos do SUS provenientes do Bloco de Custeio das Ações e'),
('494', '09 Serviços Públicos de Saúde Manutenção das Ações e Serviços Públicos de Saúde Transferências Fundo a Fundo de Bloco de Investimento na Rede de'),
('518', '09 Serviços Públicos de Saúde Governo Estadual Transferências Fundo a Fundo de Recursos do SUS provenientes do Bloco de Investimento na Rede de'),
('1006', '12 Federais à Assistência Social Transferências             de   Outros                      Outros Recursos Vinculados à'),
('1011', '12 Programas                                                   Educação Transferências             de   Outros'),
('1011', '12 Programas Transferências             de   Outros                      Outros Recursos                    Vinculados   à'),
('1011', '12 Programas                                                   Assistência Social Transferências             de   Outros'),
('1011', '12 Programas Transferências             de   Outros                      Outros Recursos                    Vinculados   à'),
('1011', '12 Programas                                                   Assistência Social Transferências             de   Outros'),
('1011', '12 Programas Transferências Fundo a Fundo de Bloco de Custeio das Ações e Recursos do SUS provenientes do Serviços Públicos de Saúde –'),
('496', '12 Hospitalar – Emendas Individuais (§ Manutenção das Ações e Serviços'),
('13, art. 166 da CF) Públicos de Saúde Transferências Fundo a Fundo de Recursos do SUS provenientes do Vigilância em Saúde – Emendas', ''),
('500', '12'),
('518', '12 Emendas Individuais (§ 13, art. 166 Estruturação da Rede de Serviços da CF) Públicos de Saúde Apoio Financeiro aos Municípios -'),
('003', '13 AFM Bloco   de    Financiamento     da                          Transferência de Recursos dos'),
('941', '09 Alta Complexidade                                            FNAS Transferências da União Referentes Cessão Onerosa – Pré-Sal – Lei nº'),
('1015', '14'),
('13.885/2019 Exploração de Recursos Naturais Emendas Individuais Impositivas –', ''),
('1016', '12 Art. 166-A da E.C. 105/2019) Emendas de Bancadas (Art. 166, §'),
('1017', '12'),
('12 E.C. 100/2019) Emendas Individuais Impositivas – transferência      com       finalidade', ''),
('1022', '09 (COVID-19)                                                   FNAS Prestação Pecuniária do Poder'),
('1023', '99 Estadual de Saúde - (COVID-19) Auxílio Financeiro para ações de Transferências da União - inciso I do Saúde Assistência Social para'),
('1024', '09 enfrentamento à COVID-19 – L.C nº'),
('173/2020', ''),
('173/2020 – Inciso I, art. 5º Depósitos Judiciais (E.C. nº                                 Recursos de Depósitos Judiciais -', ''),
('1025', '99'),
('94/2016) – Lides que o ente é parte', 'Lides das quais o Ente faz parte Depósitos Judiciais (E.C. nº                                 Recursos de Depósitos Judiciais -'),
('1026', '99'),
('99/2017) – Lides que o ente é parte', 'Lides das quais o Ente faz parte Depósitos Judiciais (E.C.           nº                       Recursos de Depósitos Judiciais-'),
('1027', '99'),
('94/2016) – Lides de Terceiros', 'Lides das quais o Ente não faz parte Depósitos Judiciais (E.C.           nº                       Recursos de Depósitos Judiciais-'),
('1028', '99'),
('1029', '99 Públicas - (COVID-19) Outras Transferências de Convênios Outras Transferências Voluntárias'),
('1030', '99 Privadas - (COVID-19) vinculados à Saúde Ações Emergenciais destinadas ao'),
('1031', '99'),
('14.017/2020 - (COVID-19) Recursos de Custeio para Oferta de Transferências do Estado referentes Leitos de Unidade de Terapia', ''),
('1032', '99 Intensiva – Resolução SESA nº Congêneres vinculados à Saúde'),
('1034', '03 Saúde - (COVID-19)                                           vinculados à Saúde Incentivo Financeiro aos Municípios'),
('- (COVID-19) - Escolas Públicas da', 'Outros Recursos'),
('1035', '99 Rede Básica de ensino - Portaria nº                          Educação'),
('1020', '12 Hospitalar - Coronavírus (COVID-                             Públicos de Saúde - Recursos'),
('1033', '12 ação 21C0 - Emendas Individuais – Públicos de Saúde - Recursos (Inciso II do Art. 166-A da E.C. destinados ao enfrentamento da'),
('1034', '03 Instrumentos Congêneres vinculados Saúde - (COVID-19) à Saúde Transferências do FUNDEB - Complementação da União – VAAF Transferências do FUNDEB -'),
('1036', '02 Complementação da União - VAAF estabelecido no inciso XI do art.'),
('212-A da CF Transferências do FUNDEB - Complementação da União – VAAF                             Transferências do FUNDEB -', ''),
('1044', '09 do FNDE                                                    do FNDE'),
('1045', '01 Recursos Vinculados ao RPPS -                              Recursos Vinculados ao RPPS -'),
('1047', '04 Bens/Ativos - Administração Indireta                       Bens/Ativos - Administração Indireta'),
('1048', '94 Transferências do Governo Federal Emendas de Bancadas (Art. 166, §                           referentes    a    Convênios     e'),
('1017', '12'),
('1017', '12'),
('1017', '12'),
('12 E.C. 100/2019)', 'Instrumentos Congêneres vinculados à Saúde Outras Transferências de Convênios Emendas de Bancadas (Art. 166, §'),
('1017', '12'),
('12 E.C. 100/2019) União Emendas de Bancadas (Art. 166, §                           Outros Recursos Vinculados à', ''),
('1017', '12'),
('12 E.C. 100/2019)', 'Educação Emendas de Bancadas (Art. 166, §                           Outros Recursos Vinculados à'),
('1017', '12'),
('12 E.C. 100/2019)', 'Assistência Social Emendas de Bancadas (Art. 166, §'),
('1017', '12'),
('12 E.C. 100/2019) Recursos Vinculados ao RPPS - Compensação        entre   Regimes', ''),
('1049', '08 Previdenciários - Plano Financeiro Financeiro)'),
('1055', '09'),
('123/2022', '123/2022 Auxílio Financeiro - Outorga Crédito Auxílio Financeiro - Outorga Crédito Tributário ICMS - Art. 5º, Inciso V,'),
('1056', '01 EC nº 123/2022 - Recursos nº 123/2022 Educação Auxílio Financeiro - Outorga Crédito                       Auxílio Financeiro - Outorga Crédito'),
('1059', '04 (Plano Previdenciário)                                     Previdenciário) Recursos não vinculados da'),
('1060', '01 Recursos Livres                                            compensação de impostos Recursos não vinculados da'),
('1068', '09 FECAP – Lei Estadual n°'),
('21.720/2023 Recursos    de        Precatórios     do', ''),
('1005', '03 Estaduais à Assistência Social Transferências de Convênios e Transferências Voluntárias Públicas'),
('1006', '03 Federais à Assistência Social Transferências Federais Destinadas'),
('1071', '09 Calamidades Públicas. Transferências Voluntárias Públicas Outras Transferências de Convênios Federais - ITAIPU BINACIONAL -'),
('1072', '03 PROGRAMA ITAIPU MAIS QUE União ENERGIA. Demais Transferências Obrigatórias                            Demais Transferências Obrigatórias'),
('1073', '13 Receitas                                                      Receitas Transferência de Recursos dos Transferências             de   Outros'),
('1011', '09 Programas Social Transferências Fundo a Fundo de                               Transferências Fundo a Fundo de'),
('1011', '09'),
('59/2023 do CEAS/PR', 'Social Transferências Voluntárias Públicas                            Outras Transferências de Convênios'),
('1076', '03 Alienação de Ações da Copel                                    Estados Transferência de Recursos dos Transferências              de   Outros'),
('1011', '09 Programas Social Recursos de Precatórios                do                      Recursos  de    Precatórios               do'),
('1077', '02'),
('1079', '13 Transferências              de   Outros                        Outras vinculações de transferências'),
('1011', '09 Transferências              de   Outros                        Outras vinculações de transferências'),
('1011', '09 Transferências              de   Outros                        Outras vinculações de transferências'),
('1011', '09 Transferências         de       Outros                         Outras vinculações de transferências'),
('1011', '12 Emendas de Bancadas (Art. 166, §                               Outras vinculações de transferências'),
('1080', '02 Recursos de Alienação de Ativos -                              Recursos de Alienação de Ativos -'),
('1082', '02 FONTES PADRÃO – SECRETARIA DO TESOURO NACIONAL – STN – Portaria STN n° 710/2021 E ATUALIZAÇÕES');

--  (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.FontePadraoSTN
(
    cdFontePadraoSTN String,
    dsFontePadraoSTN String
)
ENGINE = MergeTree
ORDER BY cdFontePadraoSTN;
INSERT INTO simam.FontePadraoSTN (cdFontePadraoSTN, dsFontePadraoSTN) VALUES
('545', 'Manutenção e Desenvolvimento da Educação Básica e de Valorização'),
('573', 'Gás Natural Vinculados à Educação - Lei nº'),
('12.858/2013.', 'Participação Especial com base no art. 2º da Lei nº 12.858/2013. Controle dos recursos originários de operações de crédito, cuja'),
('635', 'Gás Natural vinculados à Saúde – Lei nº'),
('717', 'prevista no §2º do art. 230 da CF, de gratuidade dos transportes'),
('747', 'Outras vinculações de transferências da União anteriores. Controle dos recursos de outras transferências vinculadas dos Estados,'),
('755', 'Administração Direta, nos termos do art. 44 da Lei Complementar nº Administração Direta'),
('101/2000. Controle dos recursos decorrentes da alienação de bens da Recursos de Alienação                     de   Bens/Ativos   -', ''),
('756', 'Administração Indireta, nos termos do art. 44 da Lei Complementar nº Administração Indireta'),
('101/2000. Controle dos recursos de depósitos judiciais apropriados pelo ente de Recursos de Depósitos Judiciais - Lides das quais', ''),
('757', 'lides das quais o ente faz parte, com base na Lei Complementar nº o Ente faz parte'),
('759', 'Recursos Vinculados a Fundos de previdência. Controle dos recursos de emolumentos, taxas e outros recursos'),
('862', 'Recursos de Depósitos de Terceiros terceiros. Controle dos demais recursos financeiros extraorçamentários, como,'),
('869', 'Outros Recursos Extraorçamentários por exemplo, retenções e consignações. Controle dos recursos próprios dos Consórcios Públicos (utilizada pelos'),
('880', 'Recursos Próprios dos Consórcios consórcios públicos) Classificação temporária enquanto não se identifica a correta'),
('898', 'Recursos a Classificar vinculação. Controle dos recursos cuja aplicação seja vinculada e não tenha sido');

-- PORTARIA STN N° 710/2021 E ATUALIZAÇÕES (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.MarcadorSTN
(
    cdMarcadorSTN String,
    dsMarcadorSTN String,
    dsEspecificacao String
)
ENGINE = MergeTree
ORDER BY cdMarcadorSTN;
INSERT INTO simam.MarcadorSTN (cdMarcadorSTN, dsMarcadorSTN, dsEspecificacao) VALUES
('2111', '', '');

-- ACOMPANHAMENTO DA EXECUÇÃO ORÇAMENTÁRIA - CO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.FontePadraoSTNXMarcadorSTN
(
    cdFontePadraoSTN String,
    dsFontePadraoSTN String,
    cdMarcadorSTN String,
    dsMarcadorSTN String
)
ENGINE = MergeTree
ORDER BY cdFontePadraoSTN;
INSERT INTO simam.FontePadraoSTNXMarcadorSTN (cdFontePadraoSTN, dsFontePadraoSTN, cdMarcadorSTN, dsMarcadorSTN) VALUES
('500', 'Recursos não Vinculados de Impostos', '0000', 'Sem marcador definido Identificação das despesas                 com   manutenção   e'),
('500', 'Recursos não Vinculados de Impostos', '1001 desenvolvimento do ensino Identificação das despesas com ações e serviços públicos', ''),
('500', 'Recursos não Vinculados de Impostos', '1002 de saúde Recursos não vinculados da compensação de', ''),
('502', '0000', 'Sem marcador definido impostos Recursos não vinculados da compensação de                                   Identificação das despesas com manutenção e', ''),
('502', '1002 impostos                                                                    de saúde Transferências do FUNDEB                -   Impostos   e', '', ''),
('540', '1070', 'remuneração dos profissionais da educação básica em Transferências de Impostos efetivo exercício Transferências do FUNDEB - Complementação da', ''),
('541', '0000', 'Sem marcador definido União – VAAF Identificação do percentual aplicado no pagamento da Transferências do FUNDEB - Complementação da', ''),
('541', '1070', 'remuneração dos profissionais da educação básica em União – VAAF efetivo exercício Transferências do FUNDEB - Complementação da', ''),
('542', '0000', 'Sem marcador definido União – VAAT Identificação do percentual aplicado no pagamento da Transferências do FUNDEB - Complementação da', ''),
('542', '1070', 'remuneração dos profissionais da educação básica em União – VAAT efetivo exercício Transferências do Governo Federal referentes a', ''),
('570', 'Convênios e Instrumentos Congêneres vinculados', '0000', 'Sem marcador definido à Educação Transferências do Governo Federal referentes a Identificação das Transferências da União decorrentes de'),
('570', 'Convênios e Instrumentos Congêneres vinculados', '3120 emendas parlamentares de bancada à Educação', ''),
('599', 'Outros Recursos Vinculados à Educação', '0000', 'Sem marcador definido Identificação das Transferências da União decorrentes de'),
('599', 'Outros Recursos Vinculados à Educação', '3110 emendas parlamentares individuais Identificação das Transferências da União decorrentes de', ''),
('599', 'Outros Recursos Vinculados à Educação', '3120 emendas parlamentares de bancada Transferências Fundo a Fundo de Recursos do SUS provenientes do Governo Federal - Bloco de', ''),
('631', 'Convênios e Instrumentos Congêneres vinculados', '0000', 'Sem marcador definido à Saúde Transferências do Governo Federal referentes a Identificação das Transferências da União decorrentes de'),
('631', 'Convênios e Instrumentos Congêneres vinculados', '3110 emendas parlamentares individuais à Saúde Transferências do Governo Federal referentes a Identificação das Transferências da União decorrentes de', ''),
('631', 'Convênios e Instrumentos Congêneres vinculados', '3120 emendas parlamentares de bancada à Saúde', ''),
('659', 'Outros Recursos Vinculados à Saúde', '3110 emendas parlamentares individuais Identificação das Transferências da União decorrentes de', ''),
('659', 'Outros Recursos Vinculados à Saúde', '3120 emendas parlamentares de bancada Transferências de Convênios e Instrumentos', ''),
('665', '3120 Congêneres vinculados à Assistência Social                         emendas parlamentares de bancada', '', ''),
('669', 'Outros Recursos Vinculados à Assistência Social', '0000', 'Sem marcador definido Identificação das Transferências da União decorrentes de'),
('669', 'Outros Recursos Vinculados à Assistência Social', '3110 emendas parlamentares individuais Identificação das Transferências da União decorrentes de', ''),
('669', 'Outros Recursos Vinculados à Assistência Social', '3120 emendas parlamentares de bancada Outras Transferências de Convênios           ou', ''),
('706', 'Transferência Especial da União', '3110 emendas parlamentares individuais Auxílio Financeiro - Outorga Crédito Tributário', ''),
('718', '1001 ICMS - Art. 5º, Inciso V, EC nº 123/2022                           desenvolvimento do ensino', '', ''),
('749', 'Outras vinculações de transferências', '0000', 'Sem marcador definido Identificação das Transferências da União decorrentes de'),
('749', 'Outras vinculações de transferências', '3110 emendas parlamentares individuais Identificação das Transferências da União decorrentes de', ''),
('801', '2121 Repartição (Plano Financeiro)                                      Repartição (Plano Financeiro) Recursos Vinculados ao RPPS - Taxa de', '', ''),
('802', '2121 Administração                                                      Repartição (Plano Financeiro) FONTES DE RECURSOS DAS ENTIDADES', '', '');

-- TIPOS DE OPERAÇÕES DA LEI ORÇAMENTÁRIA ANUAL (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.OperacaoLOA
(
    idOperacaoLOA Int64,
    dsOperacao String
)
ENGINE = MergeTree
ORDER BY idOperacaoLOA;
INSERT INTO simam.OperacaoLOA (idOperacaoLOA, dsOperacao) VALUES
(1, 'Receita Prevista'),
(2, 'Despesa Fixada'),
(3, 'Transferências Financeiras – Ingressos'),
(4, 'Transferências Financeiras – Egressos'),
(5, 'Recursos sem despesas correspondentes');

-- TIPOS DE NÍVEIS DAS CONTAS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoNivelConta
(
    cdTipoNivelConta String,
    dsTipoNivelConta String
)
ENGINE = MergeTree
ORDER BY cdTipoNivelConta;

-- TIPOS DE PERMISSÃO PARA DEDUÇÕES (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoPermissaoDeducao
(
    idTipoPermissaoDeducao Int64,
    dsTipoPermissaoDeducao String
)
ENGINE = MergeTree
ORDER BY idTipoPermissaoDeducao;
INSERT INTO simam.TipoPermissaoDeducao (idTipoPermissaoDeducao, dsTipoPermissaoDeducao) VALUES
(1, 'Permite dedução, exceto FUNDEB'),
(2, 'Permite dedução, somente FUNDEB'),
(3, 'Não permite dedução TIPOS DE NATUREZAS DE RECEITAS');

-- TIPOS DE NATUREZAS DE RECEITAS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoNaturezaReceita
(
    cdTipoNaturezaReceita String,
    dsTipoNaturezaReceita String
)
ENGINE = MergeTree
ORDER BY cdTipoNaturezaReceita;
INSERT INTO simam.TipoNaturezaReceita (cdTipoNaturezaReceita, dsTipoNaturezaReceita) VALUES
('0', 'Nível Agregador'),
('1', 'Receita Principal'),
('2', 'Multa e Juros da Receita Principal'),
('3', 'Dívida Ativa da Receita Principal'),
('4', 'Multa e Juros da Dívida Ativa da Receita Principal'),
('5', 'Multa da Receita Principal'),
('6', 'Juros da Receita Principal'),
('7', 'Multa da Dívida Ativa da Receita Principal'),
('8', 'Juros da Dívida Ativa da Receita Principal PLANO DE CONTAS DA DESPESA ORÇAMENTÁRIA DAS ENTIDADES');

-- TIPOS DE CRÉDITOS INICIAIS DAS DESPESAS ORÇAMENTÁRIAS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoCreditoInicial
(
    idTipoCreditoInicial Int64,
    dsTipoCreditoInicial String
)
ENGINE = MergeTree
ORDER BY idTipoCreditoInicial;
INSERT INTO simam.TipoCreditoInicial (idTipoCreditoInicial, dsTipoCreditoInicial) VALUES
(1, 'Crédito Inicial Originário da Lei Orçamentária Anual – LOA'),
(2, 'Créditos Antecipados LDO REVISÃO DA PREVISÃO INICIAL DA DESPESA ORÇAMENTÁRIA');

-- TIPOS DE CRÉDITOS ADICIONAIS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoCreditoAdicional
(
    idTipoCreditoAdicional Int64,
    dsTipoCreditoAdicional String
)
ENGINE = MergeTree
ORDER BY idTipoCreditoAdicional;
INSERT INTO simam.TipoCreditoAdicional (idTipoCreditoAdicional, dsTipoCreditoAdicional) VALUES
(1, 'Suplementar'),
(2, 'Especial'),
(3, 'Remanejamento'),
(4, 'Transposição'),
(5, 'Transferência'),
(6, 'Extraordinário TABELA ASSOCIATIVA DE TIPOS DE CRÉDITOS ADICIONAIS COM OS RESPECTIVOS ESCOPOS AUTORIZADOS PELAS LEI ORÇAMENTÁRIA E LDO.');

-- RESPECTIVOS ESCOPOS AUTORIZADOS PELAS LEI ORÇAMENTÁRIA E LDO. (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoCreditoAdicionalXEscopo
(
    idTipoCredito Int64,
    idEscopo Int64
)
ENGINE = MergeTree
ORDER BY idTipoCredito;
INSERT INTO simam.TipoCreditoAdicionalXEscopo (idTipoCredito, idEscopo) VALUES
(1, 0),
(1, 0),
(3, 0),
(3, 0),
(4, 0),
(4, 0),
(5, 0),
(5, 0);

-- TIPOS DE BASE DE CÁLCULO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoBaseCalculo
(
    idTipoBaseCalculo Int64,
    dsBaseTipoBaseCalculo String
)
ENGINE = MergeTree
ORDER BY idTipoBaseCalculo;
INSERT INTO simam.TipoBaseCalculo (idTipoBaseCalculo, dsBaseTipoBaseCalculo) VALUES
(1, 'Receita'),
(2, 'Despesa'),
(99, 'Nenhum AUTORIZAÇÃO PARA ABERTURA DE CRÉDITOS ADICIONAIS AUTORIZADOS NA LEI ORÇAMENTÁRIA E LDO - EXCLUÍDOS DOS LIMITES');

-- TIPOS DE EXCLUSÃO DOS CRÉDITOS ADICIONAIS AUTORIZADOS NA LOA E LDO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoExclusaoCreditoAdicional
(
    idTipoExclusao Int64,
    dsTipoExclusaoCreditoAdicional String
)
ENGINE = MergeTree
ORDER BY idTipoExclusao;
INSERT INTO simam.TipoExclusaoCreditoAdicional (idTipoExclusao, dsTipoExclusaoCreditoAdicional) VALUES
(1, 'Excesso de Arrecadação - Real - Livre'),
(2, 'Excesso de Arrecadação - Real - Vinculado'),
(3, 'Excesso de Arrecadação - Tendência - Livre'),
(4, 'Superávit Financeiro Livre'),
(5, 'Superávit Financeiro Vinculado'),
(6, 'Alteração de Fonte'),
(7, 'Alteração de Modalidade'),
(8, 'Remanejamento'),
(9, 'Transposição'),
(10, 'Transferência'),
(11, 'Operação de Crédito'),
(12, 'Anulação LEIS E ATOS ESPECÍFICOS AUTORIZATÓRIOS PARA ABERTURA DE CRÉDITOS ADICIONAIS, EXCETO LOA E LDO');

-- TIPOS DE REVISÃO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoRevisao
(
    idTipoRevisao Int64,
    dsTipoRevisao String
)
ENGINE = MergeTree
ORDER BY idTipoRevisao;
INSERT INTO simam.TipoRevisao (idTipoRevisao, dsTipoRevisao) VALUES
(1, 'Revisão Aumentativa'),
(2, 'Revisão Diminutiva por Estorno PROGRAMAÇÃO FINANCEIRA E CRONOGRAMA MENSAL DE DESEMBOLSO');

