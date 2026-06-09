-- MÓDULO LICITAÇÕES — 7 tabelas (seeds)

-- TIPOS DE MODALIDADES DE LICITAÇÕES (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.ModalidadeLicitacao
(
    idModalidadeLicitacao Int64,
    dsModalidadeLicitacao String
)
ENGINE = MergeTree
ORDER BY idModalidadeLicitacao;
INSERT INTO simam.ModalidadeLicitacao (idModalidadeLicitacao, dsModalidadeLicitacao) VALUES
(1, 'Convite'),
(2, 'Tomada de Preços'),
(3, 'Concorrência'),
(4, 'Concurso'),
(5, 'Leilão'),
(6, 'Pregão'),
(7, 'Processo Dispensa'),
(8, 'Processo Inexigibilidade'),
(9, 'Regime Diferenciado de Contratações - RDC'),
(10, 'Lei Ordinária nº 13.303/2016'),
(11, 'Diálogo Competitivo'),
(13, 'Marco Legal das Startups - Lei Complementar nº 182/2021');

-- TIPOS DE STATUS DAS LICITAÇÕES (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.StatusLicitacao
(
    idStatusLicitacao Int64,
    dsStatusLicitacao String
)
ENGINE = MergeTree
ORDER BY idStatusLicitacao;
INSERT INTO simam.StatusLicitacao (idStatusLicitacao, dsStatusLicitacao) VALUES
(1, 'Normal'),
(2, 'Descartado CADASTRO DOS NÚMEROS DE LICITAÇÕES DESCARTADOS');

--  (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.AvaliacaoLicitacao
(
    idAvaliacaoLicitacao Int64,
    dsAvaliacaoLicitacao String
)
ENGINE = MergeTree
ORDER BY idAvaliacaoLicitacao;
INSERT INTO simam.AvaliacaoLicitacao (idAvaliacaoLicitacao, dsAvaliacaoLicitacao) VALUES
(1, 'Menor Preço - lote'),
(2, 'Menor Preço - Item'),
(3, 'Melhor Técnica - Lote'),
(4, 'Melhor Técnica - Item'),
(5, 'Técnica e Preço - Lote'),
(6, 'Técnica e Preço - Item'),
(7, 'Maior Lance (Leilão) – Lote'),
(8, 'Maior Lance (Leilão) – Item'),
(9, 'Dispensa/ Inexigibilidade'),
(10, 'Maior Retorno Econômico'),
(11, 'Maior desconto'),
(12, 'Melhor técnica ou conteúdo artístico TIPOS DE CLASSIFICAÇÃO DO OBJETO DAS LICITAÇÕES');

-- TIPOS DE OBJETO DAS LICITAÇÕES E REGIME DE EXECUÇÃO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.ClassificacaoObjetoLicitacaoXRegimeExecucaoLicitacao
(
    idClassificacao Int64,
    idRegimeExecucao Int64
)
ENGINE = MergeTree
ORDER BY idClassificacao;
INSERT INTO simam.ClassificacaoObjetoLicitacaoXRegimeExecucaoLicitacao (idClassificacao, idRegimeExecucao) VALUES
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 12),
(2, 13),
(2, 14),
(1, 5),
(1, 6),
(1, 7),
(3, 8),
(3, 9),
(5, 10),
(4, 11),
(6, 15),
(7, 16),
(8, 6),
(8, 7);

-- TIPOS DE NATUREZA DE LICITAÇÕES (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.NaturezaLicitacao
(
    idNaturezaLicitacao Int64,
    dsNaturezaLicitacao String
)
ENGINE = MergeTree
ORDER BY idNaturezaLicitacao;
INSERT INTO simam.NaturezaLicitacao (idNaturezaLicitacao, dsNaturezaLicitacao) VALUES
(1, 'Normal'),
(2, 'Registro de Preços'),
(3, 'Credenciamento'),
(4, 'Lei Ordinária nº 13.303/2016 – Dados Abertos'),
(5, 'Lei Ordinária nº 13.303/2016 – Dados Sigilosos'),
(6, 'Processo de Dispensa - Lei nº 14.133/21'),
(7, 'Licitação Internacional – Em Moeda Corrente Nacional'),
(8, 'Parceria Público-Privada'),
(9, 'Licitação Internacional – Em Moeda Estrangeira'),
(10, 'Procedimentos de Contratação Cofinanciada TIPOS NATUREZA DAS LICITAÇÕES');

-- TIPOS NATUREZA DAS LICITAÇÕES (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.ModalidadeXNaturezaLicitacao
(
    dsModalidadeLicitacao String,
    idNaturezaLicitacao Int64,
    dsNaturezaProcedimento String
)
ENGINE = MergeTree
ORDER BY dsModalidadeLicitacao;
INSERT INTO simam.ModalidadeXNaturezaLicitacao (dsModalidadeLicitacao, idNaturezaLicitacao, dsNaturezaProcedimento) VALUES
('1', 0, '1'),
('2', 0, '1'),
('3', 0, '1'),
('3', 0, '2'),
('3', 0, '3'),
('4', 0, '1'),
('5', 0, '1'),
('6', 0, '1'),
('6', 0, '2'),
('7', 0, '1'),
('7', 0, '2'),
('7', 0, '3'),
('8', 0, '1'),
('8', 0, '2'),
('8', 0, '3 Regime Diferenciado de'),
('9', 1, 'Normal Contratações – RDC Regime Diferenciado de'),
('9', 2, 'Registro de Preços Contratações – RDC Lei Ordinária nº 13.303/2016'),
('1', 0, '4 – Dados Abertos'),
('4', 0, ''),
('2', 0, ''),
('4', 0, ''),
('3', 0, ''),
('4', 0, ''),
('4', 0, ''),
('4', 0, ''),
('5', 0, ''),
('4', 0, ''),
('6', 0, ''),
('4', 0, ''),
('7', 0, ''),
('4', 0, ''),
('8', 0, ''),
('4', 0, ''),
('10', 0, ''),
('5', 0, ''),
('1', 0, ''),
('5', 0, ''),
('2', 0, ''),
('5', 0, ''),
('3', 0, ''),
('5', 0, ''),
('4', 0, ''),
('5', 0, ''),
('5', 0, ''),
('5', 0, ''),
('6', 0, ''),
('5', 0, ''),
('7', 0, ''),
('5', 0, ''),
('8', 0, ''),
('5', 0, ''),
('10', 0, ''),
('6', 0, ''),
('7', 0, ''),
('14.133/21', 0, ''),
('11', 0, '1'),
('11', 0, '2'),
('11', 0, '8'),
('3', 0, '8 Licitação Internacional – Em'),
('3', 0, '7 Moeda Corrente Nacional Licitação Internacional – Em'),
('4', 0, '7 Moeda Corrente Nacional Licitação Internacional – Em'),
('5', 0, '7 Moeda Corrente Nacional Licitação Internacional – Em'),
('6', 0, '7 Moeda Corrente Nacional Licitação Internacional – Em'),
('11', 0, '7 Moeda Corrente Nacional Licitação Internacional – Em'),
('3', 0, '9 Moeda Estrangeira Licitação Internacional – Em'),
('4', 0, '9 Moeda Estrangeira Licitação Internacional – Em'),
('5', 0, '9 Moeda Estrangeira Licitação Internacional – Em'),
('6', 0, '9 Moeda Estrangeira Licitação Internacional – Em'),
('11', 0, '9 Moeda Estrangeira Procedimentos de                                     Procedimentos de'),
('13', 0, '1'),
('182/2021 DADOS COMPLEMENTARES DE LICITAÇÕES PARA ATENDER O MURAL DE LICITAÇÕES', 0, '');

-- TIPOS DE CERTIDÕES (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoCertidao
(
    idTipoCertidao Int64,
    dsTipoCertidao String
)
ENGINE = MergeTree
ORDER BY idTipoCertidao;
INSERT INTO simam.TipoCertidao (idTipoCertidao, dsTipoCertidao) VALUES
(1, 'INSS Certidão Conjunta Negativa de Débitos relativos a Tributos Federais e à Dívida Ativa da União'),
(3, 'FGTS'),
(4, 'Certidão Negativa de Débitos Trabalhistas'),
(5, 'Certidão de Regularidade Fiscal Unificada RFB/PGFN LICITAÇÕES X CONVÊNIOS – SISTEMA INTEGRADO DE TRANSFERÊNCIAS - SIT');

