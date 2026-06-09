-- MÓDULO CONTRATOS — 2 tabelas (seeds)

-- TIPOS DE ATOS CONTRATUAIS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoAtoContrato
(
    idTipoAtoContrato Int64,
    dsTipoAtoContrato String
)
ENGINE = MergeTree
ORDER BY idTipoAtoContrato;
INSERT INTO simam.TipoAtoContrato (idTipoAtoContrato, dsTipoAtoContrato) VALUES
(1, 'Contrato'),
(2, 'Ata de Registro de Preços TIPOS DE ORIGENS DOS CONTRATOS E ATAS');

-- TIPOS DE OPERAÇÕES DE RESCISÃO DOS CONTRATOS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoMotivoRescisaoContrato
(
    idTipoMotivo Int64,
    dsTipoMotivoRescisaoContrato String
)
ENGINE = MergeTree
ORDER BY idTipoMotivo;
INSERT INTO simam.TipoMotivoRescisaoContrato (idTipoMotivo, dsTipoMotivoRescisaoContrato) VALUES
(1, 'Não Cumprimento das Cláusulas Contratuais.'),
(2, 'Cumprimento Irregular das Cláusulas Contratuais. Lentidão e Impossibilidade da conclusão da obras ou fornecimento dos serviços nos prazos estipulados.'),
(8, 'Decretação de falência ou a instauração de insolvência civil.'),
(12, 'acarretando modificação do valor inicial do contrato além do limite permitido no §'),
(99, 'Outros Motivos ADITIVO DE REDIMENSIONAMENTO DE CONTRATO');

