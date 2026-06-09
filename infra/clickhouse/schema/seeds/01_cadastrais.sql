-- TABELAS CADASTRAIS — 6 tabelas (seeds)

-- TIPOS DE DOCUMENTO VÁLIDOS PARA PESSOAS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoDocumentoPessoa
(
    sgTipoDocumento String,
    dsTipoDocumento String,
    flExigeUF String,
    flExigeValidade String
)
ENGINE = MergeTree
ORDER BY sgTipoDocumento;
INSERT INTO simam.TipoDocumentoPessoa (sgTipoDocumento, dsTipoDocumento, flExigeUF, flExigeValidade) VALUES
('1', 'RG', 'Número de Identidade', 'S CPF                Cadastro de Pessoas                   N'),
('2', 'Físicas', 'N', ''),
('3', 'CNPJ', 'Cadastro Nacional de', 'N Pessoas Jurídicas OAB                Ordem dos Advogados do                S'),
('4', 'Brasil', 'N', ''),
('5', 'CREA', 'Conselho Regional de', 'S Arquitetura e Engenharia'),
('6', 'CAU', 'Conselho e Arquitetura e', 'S Urbanismo CTF                Conselho Federal de                   S'),
('7', 'Técnicos Industriais', 'N CFTA                Conselho Federal de                   S', ''),
('8', 'Técnicos Agrícolas', 'N CONSEMPR               Consórcio de Empresas -               N', ''),
('96', 'Art. 15 Lei 14133/21', 'N', ''),
('97', 'CONTR', 'Contribuintes sem registro', 'N de CPF.'),
('98', 'EST', 'Estrangeiros', 'N CADASTRO DE OUTROS DOCUMENTOS DE PESSOA DO SIM-AM');

-- TIPO DE DOCUMENTOS LEGAIS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoDocumento
(
    idTipoDocumento Int64,
    dsTipoDocumento String
)
ENGINE = MergeTree
ORDER BY idTipoDocumento;
INSERT INTO simam.TipoDocumento (idTipoDocumento, dsTipoDocumento) VALUES
(1, 'Lei ordinária'),
(2, 'Lei complementar'),
(3, 'Decreto flExigeNumero idTipoDocumento                       dsTipoDocumento Documento'),
(4, 'Ato de consórcio'),
(5, 'Resolução'),
(6, 'Portaria'),
(7, 'Instrução'),
(8, 'Emenda'),
(9, 'Constituição'),
(10, 'Lei Orgânica'),
(11, 'Decreto Legislativo'),
(50, 'Parecer'),
(51, 'Despacho'),
(52, 'Edital'),
(53, 'Ata'),
(55, 'Atos de Pessoal'),
(60, 'Acórdão'),
(61, 'Contrato'),
(62, 'Decisão'),
(63, 'Deliberação'),
(64, 'Ofício'),
(65, 'Portaria'),
(66, 'Instrução de Serviço'),
(67, 'Instrução Normativa'),
(68, 'Instrução Técnica'),
(69, 'Ato'),
(100, 'Projeto'),
(101, 'Contrato'),
(102, 'Processo Judicial'),
(103, 'Registro de imóvel Orçamento base (execução direta) ou do edital (execução'),
(104, 'N indireta)'),
(105, 'Planilha Orçamentária Contratada'),
(106, 'Planilha Orçamentária Aditivo'),
(107, 'Termo de Paralisação'),
(108, 'Termo(s) de Recebimento Definitivo'),
(109, 'Medição Justificativa para Cancelamento ou Cadastro Indevido de'),
(110, 'N Intervenção'),
(111, 'Declaração'),
(123, 'Termo de Cumprimento dos Objetivos – PETE'),
(125, 'Contrato de Rateio'),
(126, 'Contrato de Programas'),
(200, 'Multimídia'),
(201, 'Imagem do Exemplar de Publicação no Órgão Oficial.'),
(202, 'Ato da Comissão Executiva do Poder Legislativo'),
(300, 'Termo de Recebimento (materiais/serviços)'),
(301, 'Requerimento'),
(302, 'Memorando'),
(303, 'Comunicação Interna'),
(304, 'Ato Administrativo'),
(999, 'Outros Tipos de Documentos TIPOS DE ESCOPO DE LEIS E ATOS');

-- TIPOS DE ESCOPO DE LEIS E ATOS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.Escopo
(
    idEscopo Int64,
    dsEscopo String,
    flPlurianual String
)
ENGINE = MergeTree
ORDER BY idEscopo;
INSERT INTO simam.Escopo (idEscopo, dsEscopo, flPlurianual) VALUES
(1, 'Plano Plurianual', 'S'),
(2, 'Lei de Diretrizes Orçamentárias – LDO', 'S'),
(3, 'Lei Orçamentária Anual – LOA', 'S'),
(4, 'Plano Municipal de Saúde', 'S'),
(5, 'Plano de Ação dos Direitos da Criança e do Adolescente', 'S'),
(6, 'Fundo Especial – Poder Legislativo', 'S'),
(7, 'Instrumento de Programação Financeira', 'S'),
(8, 'Plano de Aplicação', 'S'),
(9, 'Plano PLACIC', 'S'),
(10, 'Plano Diretor', 'S'),
(11, 'Comissão Permanente de Licitações', 'N'),
(12, 'Comissão Especial de Licitações', 'N'),
(13, 'Designação de Leiloeiro', 'N'),
(14, 'Designação de Pregoeiro', 'N'),
(15, 'Servidor Designado', 'N'),
(16, 'Comissão de Recebimento de Bens', 'N'),
(17, 'Órgão Oficial', 'N'),
(18, 'Comissão de Levantamento/Avaliação de Bens Patrimoniais', 'N'),
(19, 'Diárias', 'N'),
(20, 'Contrato de Rateio dos Consórcios Públicos', 'N'),
(21, 'Créditos Adicionais', 'N'),
(22, 'Tributos Municipais', 'N'),
(26, 'Edital – Contribuição de Melhoria', 'N'),
(27, 'Edital de Licitação – Convite', 'N'),
(28, 'Edital de Licitação – Tomada de Preços', 'N'),
(29, 'Edital de Licitação – Concorrência', 'N'),
(30, 'Edital de Licitação – Concurso', 'N'),
(31, 'Edital de Licitação – Leilão', 'N'),
(32, 'Edital de Licitação – Pregão', 'N'),
(33, 'Edital de Licitação – Dispensa', 'N'),
(34, 'Edital de Licitação – Inexigibilidade', 'N'),
(35, 'Contratos Administrativos', 'N'),
(36, 'Projeto de Obras Públicas', 'N'),
(37, 'Atas das Comissões de Licitações', 'N'),
(38, 'Orçamentos de Obras Públicas', 'N'),
(39, 'Boletins de Medição de Obras Públicas', 'N'),
(40, 'Termos de Recebimento Definitivo de Obras Públicas', 'N'),
(41, 'Impacto Orçamentário e Financeiro', 'N'),
(42, 'Desapropriação de Bens', 'N'),
(43, 'Alienação de Bens', 'N'),
(44, 'Ratificação/Baixa de Consórcios Intermunicipais', 'N'),
(45, 'Ata da Assembleia Geral Ordinária', 'N'),
(46, 'Ata da Assembleia Geral Extraordinária', 'N'),
(47, 'Ata do Conselho de Administração', 'N'),
(48, 'Ata do Conselho Fiscal', 'N'),
(51, 'Baixa de Consórcios Intermunicipais', 'N'),
(52, 'Parecer do Conselho do FUNDEB', 'N'),
(53, 'Parecer do Conselho Municipal de Saúde', 'N'),
(54, 'Parecer/Relatório do Controle Interno', 'N idEscopo                                 dsEscopo                                   flPlurianual'),
(55, 'Orçamento Anual de Consórcios Públicos', 'N'),
(56, 'Entradas/Saídas de Bens e Materiais por Doação', 'N'),
(57, 'Descarte de Número de Licitação', 'N'),
(58, 'Entradas/Saídas de Bens e Materiais através de Convênio', 'N'),
(59, 'Ato de Fixação/Refixação dos Subsídios dos Agentes Políticos', 'N'),
(60, 'Ato de Recomposição/Atualização dos Subsídios dos Agentes Políticos', 'N Ato de Revisão Geral Anual/Recomposição/Atualização ou Reajuste da'),
(61, 'N Remuneração dos Servidores.', ''),
(62, 'Nomeação/Designação ou Baixa dos Secretários Municipais', 'N'),
(63, 'Estorno/Cancelamento de Passivo', 'N'),
(64, 'Empréstimos/Financiamentos e Parcelamentos', 'N'),
(65, 'Termo de Paralisação de Obras Públicas', 'N Documentos com Justificativa para Cancelamento ou Cadastro Indevido de'),
(66, 'N Intervenção', ''),
(67, 'Código Tributário Nacional', 'N'),
(68, 'Código Tributário Estadual', 'N'),
(69, 'Código Tributário Municipal', 'N'),
(70, 'Nomeação do Quadro Deliberativo e Executivo de Estatais', 'N'),
(71, 'Termo de Cumprimento dos Objetivos – PETE', 'N'),
(72, 'Plano Municipal de Educação', 'S'),
(73, 'Edital de Licitação – Lei Ordinária nº 13.303/2016', 'N'),
(74, 'Agente de Contratação', 'N'),
(75, 'Contratos de Consórcios', 'N'),
(9999, 'Outros Escopos', 'N CONSOLIDAÇÃO TIPO DOCUMENTO COM OS ESCOPOS DAS LEIS E ATOS');

-- TIPOS DE ÓRGÃOS OFICIAIS (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoOrgaoOficial
(
    idTipoOrgaoOficial Int64,
    dsTipoOrgaoOficial String
)
ENGINE = MergeTree
ORDER BY idTipoOrgaoOficial;
INSERT INTO simam.TipoOrgaoOficial (idTipoOrgaoOficial, dsTipoOrgaoOficial) VALUES
(1, 'Empresa Contratada – Órgão Oficial'),
(2, 'Órgão Oficial Próprio'),
(4, 'Veículo de Publicação Não Oficial'),
(5, 'Jornal de Grande Circulação'),
(6, 'PNCP BAIXA DO ÓRGÃO OFICIAL DE PUBLICAÇÕES');

-- TIPOS DE MÓDULOS DO SISTEMA SIM-AM (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoModulo
(
    idTipoModulo Int64,
    dsTipoModulo String
)
ENGINE = MergeTree
ORDER BY idTipoModulo;
INSERT INTO simam.TipoModulo (idTipoModulo, dsTipoModulo) VALUES
(1, 'Tabelas Cadastrais'),
(2, 'Planejamento e Orçamento'),
(3, 'Contábil'),
(4, 'Tesouraria'),
(5, 'Licitação'),
(6, 'Contrato'),
(7, 'Controle Interno'),
(8, 'Patrimônio'),
(9, 'Folha de Pagamento'),
(10, 'Tributário'),
(11, 'Obras Públicas TIPOS DE RESPONSÁVEIS PELOS MÓDULOS DO SISTEMA SIM-AM');

-- TIPOS DE RESPONSÁVEIS PELOS MÓDULOS DO SISTEMA SIM-AM (tabela de domínio)
CREATE TABLE IF NOT EXISTS simam.TipoResponsavelModulo
(
    idTipoResponsavel Int64,
    dsTipoResponsavelModulo String
)
ENGINE = MergeTree
ORDER BY idTipoResponsavel;
INSERT INTO simam.TipoResponsavelModulo (idTipoResponsavel, dsTipoResponsavelModulo) VALUES
(1, 'Servidor do Quadro da Entidade'),
(2, 'Empresa Contratada'),
(3, 'Pessoa Física Contratada BAIXA DOS RESPONSÁVEIS PELOS MÓDULOS DO SISTEMA SIM-AM');

