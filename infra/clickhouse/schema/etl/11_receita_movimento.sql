-- ETL Fase 1 (analítico) — Receita: fato de MOVIMENTO (realizada por fonte).
-- Fonte: raw Elotech (siscop). Referência: BI antigo ctb_reg_receita_realizada_fonte.
-- Alvo: simam.fato_receita_movimento (= sim_<ibge>).
--
-- 1 linha por item de realização, valor assinado por grupoevento.
-- Estágio 26 (receita realizada); procedimento por rr.grupoevento:
--   11 -> 261 arrecadação (+) · 12 -> 262 devolução (-)
--   13 -> 263 estorno arrecadação (-) · 14 -> 264 estorno devolução (+)
-- arrecadada (líquida) = SUM(vlMovimento) no estágio 26.
-- Código de receita (18 dígitos, String) parseado por SUBSTRING (layout TCE).

CREATE TABLE IF NOT EXISTS simam.fato_receita_movimento (
  cdEntidade UInt32, nrAno UInt16, nrMes UInt8, dtMovimento Date32,
  cdEstagio UInt8, cdProcedimento UInt16,
  cdReceita String, categoria String, origem String, especie String,
  desdobramento1 String, desdobramento2 String, desdobramento3 String, tipoReceita String,
  fonteRecurso String, vlMovimento Decimal(18,2),
  _fonte LowCardinality(String) DEFAULT 'eloweb', _ingerido_em DateTime DEFAULT now()
) ENGINE = MergeTree PARTITION BY nrAno
ORDER BY (nrAno, cdEntidade, cdProcedimento, cdReceita, dtMovimento);

TRUNCATE TABLE simam.fato_receita_movimento;

INSERT INTO simam.fato_receita_movimento
  (cdEntidade,nrAno,nrMes,dtMovimento,cdEstagio,cdProcedimento,
   cdReceita,categoria,origem,especie,desdobramento1,desdobramento2,desdobramento3,tipoReceita,
   fonteRecurso,vlMovimento)
SELECT
  toUInt32(ifNull(rr.entidade,0)) AS cdEntidade,
  toUInt16(ifNull(rr.exercicio,0)) AS nrAno,
  toUInt8(toMonth(ifNull(toDate32OrNull(rr.data), toDate32('1970-01-01')))) AS nrMes,
  ifNull(toDate32OrNull(rr.data), toDate32('1970-01-01')) AS dtMovimento,
  26 AS cdEstagio,
  multiIf(rr.grupoevento=11,261, rr.grupoevento=12,262, rr.grupoevento=13,263, rr.grupoevento=14,264, 0) AS cdProcedimento,
  ifNull(rr.receita,'') AS cdReceita,
  substring(ifNull(rr.receita,''),1,1) AS categoria,
  substring(ifNull(rr.receita,''),2,1) AS origem,
  substring(ifNull(rr.receita,''),3,1) AS especie,
  substring(ifNull(rr.receita,''),4,1) AS desdobramento1,
  substring(ifNull(rr.receita,''),5,2) AS desdobramento2,
  substring(ifNull(rr.receita,''),7,1) AS desdobramento3,
  substring(ifNull(rr.receita,''),8,1) AS tipoReceita,
  toString(toUInt32(ifNull(ri.fonterecurso,0))) AS fonteRecurso,
  toDecimal64(ifNull(ri.valor,0),2) * multiIf(rr.grupoevento IN (11,14),1, rr.grupoevento IN (12,13),-1, 0) AS vlMovimento
FROM simam_raw.siscop_realizacaoreceita rr
INNER JOIN simam_raw.siscop_realizacaoreceitaitem ri
  ON ri.entidade=rr.entidade AND ri.exercicio=rr.exercicio AND ri.lancamento=rr.lancamento;
