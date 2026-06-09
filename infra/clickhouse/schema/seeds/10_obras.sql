-- MÓDULO DE OBRAS PÚBLICAS — 14 tabelas (seeds)

-- TIPOS DE INTERVENÇÃO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoIntervencao
(
    idTipoIntervencao Int64,
    dsTipoIntervencao String
)
ENGINE = MergeTree
ORDER BY idTipoIntervencao;
INSERT INTO simam.TipoIntervencao (idTipoIntervencao, dsTipoIntervencao) VALUES
(1, 'Execução de Obra'),
(2, 'Projeto'),
(3, 'Outras Atividades Técnicas CLASSIFICAÇÃO DOS TIPOS DE INTERVENÇÃO');

-- CLASSIFICAÇÃO DOS TIPOS DE INTERVENÇÃO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.ClassificacaoIntervencao
(
    idClassificacaoIntervencao Int64,
    dsClassificacaoIntervencao String
)
ENGINE = MergeTree
ORDER BY idClassificacaoIntervencao;
INSERT INTO simam.ClassificacaoIntervencao (idClassificacaoIntervencao, dsClassificacaoIntervencao) VALUES
(1, 'Construção'),
(2, 'Ampliação'),
(3, 'Reforma'),
(4, 'Outro TIPO DE OBRA');

-- TIPO DE OBRA (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoObra
(
    idTipoObra Int64,
    dsTipoObra String
)
ENGINE = MergeTree
ORDER BY idTipoObra;
INSERT INTO simam.TipoObra (idTipoObra, dsTipoObra) VALUES
(1, 'Edificação'),
(2, 'Pavimentação'),
(3, 'Saneamento'),
(4, 'Parque ou praça'),
(5, 'Equipamento Urbano'),
(6, 'Iluminação Pública CLASSIFICAÇÃO DOS TIPOS DE OBRA');

-- CLASSIFICAÇÃO DOS TIPOS DE OBRA (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.ClassificacaoObra
(
    idClassificacaoObra Int64,
    dsClassificacaoObra String
)
ENGINE = MergeTree
ORDER BY idClassificacaoObra;
INSERT INTO simam.ClassificacaoObra (idClassificacaoObra, dsClassificacaoObra) VALUES
(1, 'Abatedouro'),
(2, 'Barracão'),
(3, 'Creche'),
(4, 'Edifício Administrativo'),
(5, 'Escola/Colégio'),
(6, 'Hospital'),
(7, 'Posto de Saúde'),
(8, 'Unidade Habitacional'),
(9, 'Outros Edifícios'),
(10, 'Malha Viária Urbana'),
(11, 'Estrada Municipal'),
(12, 'Estrada Rural'),
(13, 'Obra de Arte Especial'),
(14, 'Abastecimento de Água'),
(15, 'Aterro Sanitário'),
(16, 'Canalização de Rio'),
(17, 'Cemitério'),
(18, 'Dragagem'),
(19, 'Esgoto'),
(20, 'Fundo de Vale'),
(21, 'Galeria Pluvial'),
(22, 'Outras Obras de Saneamento'),
(23, 'Parque ou Praça'),
(24, 'Abrigo de ônibus'),
(25, 'Outros Equipamentos Urbanos'),
(26, 'Iluminação Pública AGRUPAMENTO DE TIPOS DE OBRAS');

-- AGRUPAMENTO DE TIPOS DE OBRAS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoXClassificacaoObra
(
    idTipoObra Int64,
    dsTipoObra String,
    idClassificacaoObra Int64,
    dsClassificacaoObra String
)
ENGINE = MergeTree
ORDER BY idTipoObra;
INSERT INTO simam.TipoXClassificacaoObra (idTipoObra, dsTipoObra, idClassificacaoObra, dsClassificacaoObra) VALUES
(1, 'Edificação', 1, 'Abatedouro'),
(1, 'Edificação', 2, 'Barracão'),
(1, 'Edificação', 3, 'Creche'),
(1, 'Edificação', 4, 'Edifício Administrativo'),
(1, 'Edificação', 5, 'Escola/Colégio'),
(1, 'Edificação', 6, 'Hospital'),
(1, 'Edificação', 7, 'Posto de Saúde idTipoObra          dsTipoObra            idClassificacaoObra               dsClassificacaoObra'),
(1, 'Edificação', 8, 'Unidade Habitacional'),
(1, 'Edificação', 9, 'Outros Edifícios'),
(2, 'Pavimentação', 10, 'Malha Viária Urbana'),
(2, 'Pavimentação', 11, 'Estrada Municipal'),
(2, 'Pavimentação', 12, 'Estrada Rural'),
(2, 'Pavimentação', 13, 'Obra de Arte Especial'),
(3, 'Saneamento', 14, 'Abastecimento de Água'),
(3, 'Saneamento', 15, 'Aterro Sanitário'),
(3, 'Saneamento', 16, 'Canalização de Rio'),
(3, 'Saneamento', 17, 'Cemitério'),
(3, 'Saneamento', 18, 'Dragagem'),
(3, 'Saneamento', 19, 'Esgoto'),
(3, 'Saneamento', 20, 'Fundo de Vale'),
(3, 'Saneamento', 21, 'Galeria Pluvial'),
(3, 'Saneamento', 22, 'Outras Obras de Saneamento'),
(4, 'Parque ou praça', 23, 'Parque ou Praça'),
(5, 'Equipamento Urbano', 24, 'Abrigo de ônibus'),
(5, 'Equipamento Urbano', 25, 'Outros Equipamentos Urbanos'),
(6, 'Iluminação Pública', 26, 'Iluminação Pública TIPOS DE REGIME');

-- TIPOS DE REGIME (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoRegimeIntervencao
(
    idTipoRegimeIntervencao Int64,
    dsTipoRegimeIntervencao String
)
ENGINE = MergeTree
ORDER BY idTipoRegimeIntervencao;
INSERT INTO simam.TipoRegimeIntervencao (idTipoRegimeIntervencao, dsTipoRegimeIntervencao) VALUES
(1, 'Direto'),
(2, 'Indireto'),
(3, 'Misto (direto + indireto) TIPOS DE UNIDADE DE MEDIDA DE INTERVENÇÃO');

-- TIPOS DE UNIDADE DE MEDIDA DE INTERVENÇÃO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.UnidadeMedidaIntervencao
(
    idUnidadeMedidaIntervencao Int64,
    dsUnidadeMedidaIntervencao String
)
ENGINE = MergeTree
ORDER BY idUnidadeMedidaIntervencao;
INSERT INTO simam.UnidadeMedidaIntervencao (idUnidadeMedidaIntervencao, dsUnidadeMedidaIntervencao) VALUES
(1, 'Hora'),
(2, 'Hectare'),
(3, 'Quilograma'),
(4, 'Quilômetro'),
(5, 'Metro'),
(6, 'Metro quadrado'),
(7, 'Metro cúbico'),
(8, 'Tonelada INTERVENÇÃO X BEM');

-- TIPOS DE DOCUMENTO DO ÓRGÃO DE CLASSE (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoDocumentoOrgaoClasse
(
    idTipoDocumentoOrgaoClasse Int64,
    dsTipoDocumentoOrgaoClasse String
)
ENGINE = MergeTree
ORDER BY idTipoDocumentoOrgaoClasse;
INSERT INTO simam.TipoDocumentoOrgaoClasse (idTipoDocumentoOrgaoClasse, dsTipoDocumentoOrgaoClasse) VALUES
(1, 'ART (CREA)'),
(2, 'RRT (CAU) e TRT (CFT e CFTA) TIPOS DE RESPONSABILIDADE TÉCNICA');

-- TIPOS DE RESPONSABILIDADE TÉCNICA (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoResponsabilidadeTecnica
(
    idTipoResponsabilidadeTecnica Int64,
    dsTipoResponsabilidadeTecnica String
)
ENGINE = MergeTree
ORDER BY idTipoResponsabilidadeTecnica;
INSERT INTO simam.TipoResponsabilidadeTecnica (idTipoResponsabilidadeTecnica, dsTipoResponsabilidadeTecnica) VALUES
(1, 'Execução de Obra'),
(2, 'Projeto Arquitetônico'),
(3, 'Projeto Estrutural'),
(4, 'Projeto Complementar'),
(5, 'Orçamento'),
(6, 'Fiscalização'),
(7, 'Consultoria'),
(8, 'Cargo e Função'),
(9, 'Outra PLANILHA DE ORÇAMENTO');

-- TIPOS DE PLANILHA DE ORÇAMENTO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoPlanilhaOrcamento
(
    idTipoPlanilhaOrcamento Int64,
    idTipoPlanilhaOrcamento_2 Int64
)
ENGINE = MergeTree
ORDER BY idTipoPlanilhaOrcamento;
INSERT INTO simam.TipoPlanilhaOrcamento (idTipoPlanilhaOrcamento, idTipoPlanilhaOrcamento_2) VALUES
(1, 0),
(2, 0),
(3, 0);

-- ORIGEM DO ACOMPANHAMENTO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.OrigemAcompanhamento
(
    idOrigemAcompanhamento Int64,
    dsOrigemAcompanhamento String
)
ENGINE = MergeTree
ORDER BY idOrigemAcompanhamento;
INSERT INTO simam.OrigemAcompanhamento (idOrigemAcompanhamento, dsOrigemAcompanhamento) VALUES
(1, 'Jurisdicionado'),
(2, 'TCE-PR'),
(3, 'CREA-PR TIPOS DE ACOMPANHAMENTO');

-- TIPOS DE ACOMPANHAMENTO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoAcompanhamento
(
    idTipoAcompanhamento Int64,
    dsTipoAcompanhamento String
)
ENGINE = MergeTree
ORDER BY idTipoAcompanhamento;
INSERT INTO simam.TipoAcompanhamento (idTipoAcompanhamento, dsTipoAcompanhamento) VALUES
(1, 'Medição'),
(2, 'Paralisação'),
(3, 'Conclusão'),
(4, 'Cancelamento de Intervenção'),
(5, 'Cadastro indevido MEDIÇÃO');

-- TIPOS DE MEDIÇÃO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoMedicao
(
    idTipoMedicao Int64,
    dsTipoMedicao String
)
ENGINE = MergeTree
ORDER BY idTipoMedicao;
INSERT INTO simam.TipoMedicao (idTipoMedicao, dsTipoMedicao) VALUES
(1, 'Execução Indireta - Contrato'),
(2, 'Execução Indireta - Aditivo'),
(3, 'Execução Direta EXECUÇÃO INDIRETA - CONTRATO');

-- TIPOS DE PARALISAÇÃO (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.MotivoParalisacao
(
    idMotivoParalisacao Int64,
    dsMotivoParalisacao String
)
ENGINE = MergeTree
ORDER BY idMotivoParalisacao;
INSERT INTO simam.MotivoParalisacao (idMotivoParalisacao, dsMotivoParalisacao) VALUES
(1, 'Falta de recurso próprio'),
(2, 'Ausência/ Atraso na liberação de recursos do convênio'),
(3, 'Valor orçado insuficiente para conclusão da obra'),
(4, 'Alteração de projeto/ Serviços necessários à conclusão da obra não foram previstos'),
(5, 'Descumprimento de obrigações contratuais pela empresa contratada'),
(6, 'Ação judicial Não atendimento a exigências legais (Ex. ambientais, pendências em relação à regularidade do'),
(7, 'terreno, etc.)'),
(8, 'Obra incompatível com interesses do município DOCUMENTOS DE ACOMPANHAMENTO');

