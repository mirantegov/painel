-- MÓDULO TRIBUTÁRIO — 7 tabelas (seeds)

-- TIPOS DE OPERAÇÕES DOS CRÉDITOS TRIBUTÁRIOS E NÃO TRIBUTÁRIOS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoOperacaoCredito
(
    idTipoOperacaoCredito Int64,
    dsTipoOperacaoCredito String
)
ENGINE = MergeTree
ORDER BY idTipoOperacaoCredito;
INSERT INTO simam.TipoOperacaoCredito (idTipoOperacaoCredito, dsTipoOperacaoCredito) VALUES
(1, 'Lançamento'),
(2, 'Implantação de Saldos de Exercícios Anteriores'),
(3, 'Inscrição Dívida Ativa'),
(4, 'Créditos Não Inscritos à Restituir de Anos Anteriores'),
(5, 'Dívida Ativa a Restituir de Anos Anteriores TIPOS DE NATUREZA DOS CRÉDITOS TRIBUTÁRIOS E NÃO TRIBUTÁRIOS');

-- TIPOS DE NATUREZA DOS CRÉDITOS TRIBUTÁRIOS E NÃO TRIBUTÁRIOS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoNaturezaCredito
(
    idTipoNaturezaCredito Int64,
    dsTipoNaturezaCredito String
)
ENGINE = MergeTree
ORDER BY idTipoNaturezaCredito;
INSERT INTO simam.TipoNaturezaCredito (idTipoNaturezaCredito, dsTipoNaturezaCredito) VALUES
(1, 'CRÉDITO TRIBUTÁRIO'),
(2, 'CRÉDITO NÃO TRIBUTÁRIO TIPOS DE CRÉDITOS TRIBUTÁRIOS E NÃO TRIBUTÁRIOS');

-- TIPOS DE CRÉDITOS TRIBUTÁRIOS E NÃO TRIBUTÁRIOS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoCredito
(
    idTipoCredito Int64,
    dsTipoCredito String,
    flTributo String
)
ENGINE = MergeTree
ORDER BY idTipoCredito;
INSERT INTO simam.TipoCredito (idTipoCredito, dsTipoCredito, flTributo) VALUES
(1, 'IPTU', 'S'),
(2, 'ITBI', 'S'),
(3, 'ISS', 'S'),
(4, 'CONTRIBUIÇÃO DE MELHORIA', 'S'),
(5, 'TAXAS', 'S'),
(7, 'COSIP', 'N CONSOLIDAÇÃO DAS NATUREZAS E TIPOS DOS CRÉDITOS TRIBUTÁRIOS E NÃO TRIBUTÁRIOS');

-- TIPOS DE ATUALIZAÇÕES DOS CRÉDITOS TRIBUTÁRIOS E NÃO TRIBUTÁRIOS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoAtualizacaoCredito
(
    idTipoAtualizacaoCredito Int64,
    dsTipoAtualizacaoCredito String
)
ENGINE = MergeTree
ORDER BY idTipoAtualizacaoCredito;
INSERT INTO simam.TipoAtualizacaoCredito (idTipoAtualizacaoCredito, dsTipoAtualizacaoCredito) VALUES
(1, 'Juros'),
(2, 'Multas'),
(3, 'Atualizações ESTORNO DA ATUALIZAÇÃO MONETÁRIA DE CRÉDITOS');

-- TIPOS DE DEDUÇÕES DOS CRÉDITOS TRIBUTÁRIOS E NÃO TRIBUTÁRIOS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoDeducaoCredito
(
    idTipoDeducaoCredito Int64,
    dsTipoDeducaoCredito String
)
ENGINE = MergeTree
ORDER BY idTipoDeducaoCredito;
INSERT INTO simam.TipoDeducaoCredito (idTipoDeducaoCredito, dsTipoDeducaoCredito) VALUES
(1, 'Isenção'),
(2, 'Remissão'),
(3, 'Cancelamento'),
(4, 'Anistia'),
(5, 'Prescrição'),
(6, 'Descontos Concedidos ESTORNO DE DEDUÇÕES DE CRÉDITOS');

-- TIPOS DE ORIGEM DA RECEITA (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoOrigemReceita
(
    idTipoOrigemReceita Int64,
    dsTipoOrigemReceita String
)
ENGINE = MergeTree
ORDER BY idTipoOrigemReceita;
INSERT INTO simam.TipoOrigemReceita (idTipoOrigemReceita, dsTipoOrigemReceita) VALUES
(1, 'Originária de Crédito não Inscrito em Dívida Ativa'),
(2, 'Originária de Dívida Ativa'),
(99, 'Outras Receitas TIPOS DE ARRECADAÇÃO');

-- TIPOS DE ARRECADAÇÃO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoArrecadacao
(
    idTipoArrecadacao Int64,
    dsTipoArrecadacao String
)
ENGINE = MergeTree
ORDER BY idTipoArrecadacao;
INSERT INTO simam.TipoArrecadacao (idTipoArrecadacao, dsTipoArrecadacao) VALUES
(1, 'Pagamento'),
(2, 'Dação em Pagamento'),
(3, 'Restituições'),
(4, 'Pagamento Duplicado ESTORNO DA ARRECADAÇÃO POR TIPO DE CRÉDITO');

