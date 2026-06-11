-- ETL Fase 1 (analítico) — Receita PREVISTA (estágio 10).
-- Fonte: raw Elotech. Referência: BI orc_reg_receita_prevista_fonte.
-- Alvo: simam.fato_receita_orcamento (= sim_<ibge>).
--
-- Estágio 10; procedimento por idtipooperacaoreceita: =1 -> 101 previsto(+), >1 -> 102 dedução(-).
-- Valor rateado por fonte: rc.valor * rf.percentual/100.
-- prevista_liquida = SUM(vlMovimento) no estágio 10 ; prevista_bruta = SUM(proc=101).
-- Versão vigente via orcversaoorcamento (situacao 0/1/2), movsn='S', vínculo de fonte não-nulo.

CREATE TABLE IF NOT EXISTS simam.fato_receita_orcamento (
  cdEntidade UInt32, nrAno UInt16, nrMes UInt8, dtMovimento Date32,
  cdEstagio UInt8, cdProcedimento UInt16,
  cdReceita String, categoria String, origem String, especie String,
  desdobramento1 String, desdobramento2 String, desdobramento3 String, tipoReceita String,
  fonteRecurso String, vlMovimento Decimal(18,2),
  _fonte LowCardinality(String) DEFAULT 'eloweb', _ingerido_em DateTime DEFAULT now()
) ENGINE = MergeTree PARTITION BY nrAno
ORDER BY (nrAno, cdEntidade, cdProcedimento, cdReceita, fonteRecurso);

TRUNCATE TABLE simam.fato_receita_orcamento;

INSERT INTO simam.fato_receita_orcamento
  (cdEntidade,nrAno,nrMes,dtMovimento,cdEstagio,cdProcedimento,
   cdReceita,categoria,origem,especie,desdobramento1,desdobramento2,desdobramento3,tipoReceita,
   fonteRecurso,vlMovimento)
SELECT
  toUInt32(ifNull(rc.entidade,0)) AS cdEntidade,
  toUInt16(ifNull(rc.exercicio,0)) AS nrAno,
  1 AS nrMes,
  toDate32(concat(toString(toUInt16(ifNull(rc.exercicio,0))),'-01-01')) AS dtMovimento,
  10 AS cdEstagio,
  if(toInt32(ifNull(rc.idtipooperacaoreceita,0))=1, 101, 102) AS cdProcedimento,
  ifNull(rc.receita,'') AS cdReceita,
  substring(ifNull(rc.receita,''),1,1) AS categoria,
  substring(ifNull(rc.receita,''),2,1) AS origem,
  substring(ifNull(rc.receita,''),3,1) AS especie,
  substring(ifNull(rc.receita,''),4,1) AS desdobramento1,
  substring(ifNull(rc.receita,''),5,2) AS desdobramento2,
  substring(ifNull(rc.receita,''),7,1) AS desdobramento3,
  substring(ifNull(rc.receita,''),8,1) AS tipoReceita,
  toString(toUInt32(ifNull(rf.vinculofonterecurso,0))) AS fonteRecurso,
  -- valor já vem assinado no source (deduções idtipo>1 são negativas); NÃO inverter.
  toDecimal64(ifNull(rc.valor,0) * ifNull(rf.percentual,0) / 100, 2) AS vlMovimento
FROM simam_raw.siscop_orcreceita rc
INNER JOIN (
  SELECT entidade, exercicio, max(versao) AS versao
  FROM simam_raw.siscop_orcversaoorcamento
  WHERE toInt32(ifNull(situacao,9)) IN (0,1,2)
  GROUP BY entidade, exercicio
) v ON v.entidade=rc.entidade AND v.exercicio=rc.exercicio AND v.versao=rc.versao
INNER JOIN simam_raw.siscop_orcreceita_fontetce rf
  ON rf.entidade=rc.entidade AND rf.exercicio=rc.exercicio AND rf.versao=rc.versao
 AND rf.receita=rc.receita AND rf.fonterecurso=rc.fonterecurso
 AND rf.idtipooperacaoreceita=rc.idtipooperacaoreceita
WHERE rc.movsn='S' AND rf.vinculofonterecurso IS NOT NULL;
