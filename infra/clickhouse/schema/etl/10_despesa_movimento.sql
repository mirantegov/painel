-- ETL Fase 1 (analítico) — Despesa: fato de MOVIMENTO por estágio/procedimento.
-- Fonte: raw Elotech (siscop). Referência de lógica: BI antigo ctb_reg_despesa_*.
-- Alvo: simam.fato_despesa_movimento (= sim_<ibge> após substituição de placeholders).
--
-- Placeholders (substituídos por cliente, p/ ex. via provision/runner):
--   simam.       -> sim_<ibge>.
--   simam_raw.   -> raw_<ibge>.
--
-- Modelo: 1 linha por MOVIMENTO contábil, com valor assinado (vlMovimento) e as
-- dimensões derivadas da `programatica` do EMPENHO (SUBSTRING por posição fixa).
-- Estágios/procedimentos (cd):
--   16 Empenho   : 161 empenho(+) · 162 anulação(-) · 163 anulação-estorno(+)
--                  [164/165 cancelamento de restos — TODO: empenho de ano anterior]
--   17 Liquidação: 171 liquidação(+) · 172 estorno(-)
--   18 Pagamento : 181 pagamento(+) · 182 estorno(-)
-- Medidas do dashboard = SUM(vlMovimento) filtrando cdEstagio (16/17/18).
-- (atualizada/orçado = estágio 10, vem de outro arquivo: orçamento.)

CREATE TABLE IF NOT EXISTS simam.fato_despesa_movimento (
  cdEntidade UInt32, nrAno UInt16, nrMes UInt8, dtMovimento Date32,
  nrEmpenho UInt32, cdEstagio UInt8, cdProcedimento UInt16,
  programatica String, orgao String, unidade String, funcao String, subfuncao String,
  programa String, acao String, categoria String, grupo String, modalidade String,
  elemento String, natureza String, fonteRecurso String, idFornecedor UInt32,
  vlMovimento Decimal(18,2),
  _fonte LowCardinality(String) DEFAULT 'eloweb', _ingerido_em DateTime DEFAULT now()
) ENGINE = MergeTree PARTITION BY nrAno
ORDER BY (nrAno, cdEntidade, cdEstagio, cdProcedimento, nrEmpenho, dtMovimento, programatica);

-- Recarga idempotente (cliente único; full reload).
TRUNCATE TABLE simam.fato_despesa_movimento;

INSERT INTO simam.fato_despesa_movimento
  (cdEntidade,nrAno,nrMes,dtMovimento,nrEmpenho,cdEstagio,cdProcedimento,
   programatica,orgao,unidade,funcao,subfuncao,programa,acao,categoria,grupo,modalidade,elemento,natureza,
   fonteRecurso,idFornecedor,vlMovimento)
SELECT
  m.cdEntidade,
  m.nrAno,
  toUInt8(toMonth(m.dtMovimento)) AS nrMes,
  m.dtMovimento,
  m.nrEmpenho,
  m.cdEstagio,
  m.cdProcedimento,
  m.programatica,
  substring(m.programatica,1,2)  AS orgao,
  substring(m.programatica,1,5)  AS unidade,
  substring(m.programatica,6,2)  AS funcao,
  substring(m.programatica,8,3)  AS subfuncao,
  substring(m.programatica,11,4) AS programa,
  substring(m.programatica,15,4) AS acao,
  substring(m.programatica,19,1) AS categoria,
  substring(m.programatica,20,1) AS grupo,
  substring(m.programatica,21,2) AS modalidade,
  substring(m.programatica,23,2) AS elemento,
  substring(m.programatica,19,6) AS natureza,
  m.fonteRecurso,
  m.idFornecedor,
  m.vlMovimento
FROM
(
  -- 161 EMPENHO ORÇAMENTÁRIO (+)
  SELECT toUInt32(ifNull(e.entidade,0)) AS cdEntidade, toUInt16(ifNull(e.exercicio,0)) AS nrAno,
         toUInt32(ifNull(e.empenho,0)) AS nrEmpenho, 16 AS cdEstagio, 161 AS cdProcedimento,
         ifNull(toDate32OrNull(e.data), toDate32('1970-01-01')) AS dtMovimento,
         toDecimal64(ifNull(e.valor,0),2) AS vlMovimento,
         ifNull(e.programatica,'') AS programatica,
         toString(toUInt32(ifNull(e.fonterecurso,0))) AS fonteRecurso, toUInt32(ifNull(e.fornecedor,0)) AS idFornecedor
  FROM simam_raw.siscop_empenho e
  WHERE e.contabilizado='S'

  UNION ALL
  -- 162 ANULAÇÃO DE EMPENHO (-)
  SELECT toUInt32(ifNull(e.entidade,0)), toUInt16(ifNull(e.exercicio,0)), toUInt32(ifNull(e.empenho,0)),
         16, 162, ifNull(toDate32OrNull(a.data), toDate32('1970-01-01')),
         toDecimal64(ifNull(a.valor,0),2) * -1, ifNull(e.programatica,''),
         toString(toUInt32(ifNull(e.fonterecurso,0))), toUInt32(ifNull(e.fornecedor,0))
  FROM simam_raw.siscop_anulacaoempenho a
  INNER JOIN simam_raw.siscop_empenho e
    ON e.entidade=a.entidade AND e.exercicio=a.exercicio AND e.empenho=a.empenho
  WHERE a.contabilizado='S'

  UNION ALL
  -- 163 ANULAÇÃO DE EMPENHO — ESTORNO (+)
  SELECT toUInt32(ifNull(e.entidade,0)), toUInt16(ifNull(e.exercicio,0)), toUInt32(ifNull(e.empenho,0)),
         16, 163, ifNull(toDate32OrNull(a.dataestorno), toDate32('1970-01-01')),
         toDecimal64(ifNull(a.valor,0),2), ifNull(e.programatica,''),
         toString(toUInt32(ifNull(e.fonterecurso,0))), toUInt32(ifNull(e.fornecedor,0))
  FROM simam_raw.siscop_anulacaoempenho a
  INNER JOIN simam_raw.siscop_empenho e
    ON e.entidade=a.entidade AND e.exercicio=a.exercicio AND e.empenho=a.empenho
  WHERE a.contabilizado='S' AND a.dataestorno IS NOT NULL

  UNION ALL
  -- 171 LIQUIDAÇÃO (+)  [empenho via anodocorigem/nodocorigem]
  SELECT toUInt32(ifNull(e.entidade,0)), toUInt16(ifNull(e.exercicio,0)), toUInt32(ifNull(e.empenho,0)),
         17, 171, ifNull(toDate32OrNull(l.data), toDate32('1970-01-01')),
         toDecimal64(ifNull(l.valor,0),2), ifNull(e.programatica,''),
         toString(toUInt32(ifNull(e.fonterecurso,0))), toUInt32(ifNull(e.fornecedor,0))
  FROM simam_raw.siscop_liquidacao l
  INNER JOIN simam_raw.siscop_empenho e
    ON e.entidade=l.entidade AND e.exercicio=l.anodocorigem AND e.empenho=l.nodocorigem
  WHERE l.contabilizado='S'

  UNION ALL
  -- 172 ESTORNO DE LIQUIDAÇÃO (-)
  SELECT toUInt32(ifNull(e.entidade,0)), toUInt16(ifNull(e.exercicio,0)), toUInt32(ifNull(e.empenho,0)),
         17, 172, ifNull(toDate32OrNull(el.data), toDate32('1970-01-01')),
         toDecimal64(ifNull(el.valor,0),2) * -1, ifNull(e.programatica,''),
         toString(toUInt32(ifNull(e.fonterecurso,0))), toUInt32(ifNull(e.fornecedor,0))
  FROM simam_raw.siscop_estornoliquidacao el
  INNER JOIN simam_raw.siscop_empenho e
    ON e.entidade=el.entidade AND e.exercicio=el.anodocorigem AND e.empenho=el.nodocorigem

  UNION ALL
  -- 181 PAGAMENTO (+)  [pagamento -> ordempagamento_liquidacao(seq=1) -> empenho]
  SELECT toUInt32(ifNull(e.entidade,0)), toUInt16(ifNull(e.exercicio,0)), toUInt32(ifNull(e.empenho,0)),
         18, 181, ifNull(toDate32OrNull(p.data), toDate32('1970-01-01')),
         toDecimal64(ifNull(p.valor,0),2), ifNull(e.programatica,''),
         toString(toUInt32(ifNull(e.fonterecurso,0))), toUInt32(ifNull(e.fornecedor,0))
  FROM simam_raw.siscop_pagamento p
  INNER JOIN simam_raw.siscop_ordempagamento_liquidacao opl
    ON opl.entidade=p.entidade AND opl.exercicio=p.anoordempagamento
   AND opl.noordem=p.noordempagamento AND opl.sequencia=1
  INNER JOIN simam_raw.siscop_empenho e
    ON e.entidade=opl.entidade AND e.exercicio=opl.anodocorigem
   AND e.empenho=opl.nodocorigem AND e.unidadeorcamentaria=opl.unidadedocorigem

  UNION ALL
  -- 182 ESTORNO DE PAGAMENTO (-)
  SELECT toUInt32(ifNull(e.entidade,0)), toUInt16(ifNull(e.exercicio,0)), toUInt32(ifNull(e.empenho,0)),
         18, 182, ifNull(toDate32OrNull(ep.data), toDate32('1970-01-01')),
         toDecimal64(ifNull(ep.valor,0),2) * -1, ifNull(e.programatica,''),
         toString(toUInt32(ifNull(e.fonterecurso,0))), toUInt32(ifNull(e.fornecedor,0))
  FROM simam_raw.siscop_estornopagamento ep
  INNER JOIN simam_raw.siscop_pagamento p
    ON ep.entidade=p.entidade AND ep.exercicio=p.exercicio AND ep.nopagamento=p.nopagamento
  INNER JOIN simam_raw.siscop_ordempagamento_liquidacao opl
    ON opl.entidade=p.entidade AND opl.exercicio=p.anoordempagamento
   AND opl.noordem=p.noordempagamento AND opl.sequencia=1
  INNER JOIN simam_raw.siscop_empenho e
    ON e.entidade=opl.entidade AND e.exercicio=opl.anodocorigem
   AND e.empenho=opl.nodocorigem AND e.unidadeorcamentaria=opl.unidadedocorigem
) m;

-- TODO(164/165): cancelamento de restos (simam_raw.siscop_cancelamentorestos, ~poucas linhas):
--   empenho de exercício anterior — join de dimensões precisa resolver o ano original do empenho.
-- TODO(orçado/atualizada estágio 10): simam_raw.siscop_orcdespesa -> fato_despesa_orcamento.
