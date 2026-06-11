-- ETL Fase 1 (analítico) — Despesa ORÇADA/ATUALIZADA (estágio 10).
-- Fonte: raw Elotech. Referência: BI orc_reg_despesa_{orcada,suplementada,reduzida}.
-- Alvo: simam.fato_despesa_orcamento (= sim_<ibge>).
--
-- Estágio 10; procedimentos:
--   111 orçado inicial (+)  — siscop_orcdespesa (versão vigente, movsn='S')
--   112 suplementação (+)   — siscop_itemdecreto operacao='S' (decreto processado/não-estornado)
--   113 redução (-)         — siscop_itemdecreto operacao='R'
-- atualizada = SUM(vlMovimento) no estágio 10 (= 111 + 112 - 113).
-- aEmpenhar  = atualizada - empenhada (calculado no consolidado sim->mun).

CREATE TABLE IF NOT EXISTS simam.fato_despesa_orcamento (
  cdEntidade UInt32, nrAno UInt16, nrMes UInt8, dtMovimento Date32,
  cdEstagio UInt8, cdProcedimento UInt16,
  programatica String, orgao String, unidade String, funcao String, subfuncao String,
  programa String, acao String, categoria String, grupo String, modalidade String,
  elemento String, natureza String, fonteRecurso String,
  vlMovimento Decimal(18,2),
  _fonte LowCardinality(String) DEFAULT 'eloweb', _ingerido_em DateTime DEFAULT now()
) ENGINE = MergeTree PARTITION BY nrAno
ORDER BY (nrAno, cdEntidade, cdProcedimento, programatica, dtMovimento);

TRUNCATE TABLE simam.fato_despesa_orcamento;

INSERT INTO simam.fato_despesa_orcamento
  (cdEntidade,nrAno,nrMes,dtMovimento,cdEstagio,cdProcedimento,
   programatica,orgao,unidade,funcao,subfuncao,programa,acao,categoria,grupo,modalidade,elemento,natureza,
   fonteRecurso,vlMovimento)
SELECT
  m.cdEntidade, m.nrAno, toUInt8(toMonth(m.dtMovimento)) AS nrMes, m.dtMovimento,
  10 AS cdEstagio, m.cdProcedimento,
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
  m.fonteRecurso, m.vlMovimento
FROM
(
  -- 111 ORÇADO INICIAL (+) — versão vigente (max versao, situacao 0/1/2)
  SELECT toUInt32(ifNull(o.entidade,0)) AS cdEntidade, toUInt16(ifNull(o.exercicio,0)) AS nrAno,
         111 AS cdProcedimento,
         toDate32(concat(toString(toUInt16(ifNull(o.exercicio,0))),'-01-01')) AS dtMovimento,
         ifNull(o.programatica,'') AS programatica,
         toString(toUInt32(ifNull(o.fonterecurso,0))) AS fonteRecurso,
         toDecimal64(ifNull(o.valor,0),2) AS vlMovimento
  FROM simam_raw.siscop_orcdespesa o
  INNER JOIN (
    SELECT entidade, exercicio, max(versao) AS versao
    FROM simam_raw.siscop_orcversaoorcamento
    WHERE toInt32(ifNull(situacao,9)) IN (0,1,2)
    GROUP BY entidade, exercicio
  ) v ON v.entidade=o.entidade AND v.exercicio=o.exercicio AND v.versao=o.versao
  WHERE o.movsn='S'

  UNION ALL
  -- 112 SUPLEMENTAÇÃO (+)
  SELECT toUInt32(ifNull(i.entidade,0)), toUInt16(ifNull(i.exercicio,0)),
         112,
         ifNull(toDate32OrNull(d.data_processamento), toDate32('1970-01-01')),
         ifNull(i.despesa,''),
         toString(toUInt32(ifNull(i.fonterecurso,0))),
         toDecimal64(ifNull(i.valor,0),2)
  FROM simam_raw.siscop_itemdecreto i
  INNER JOIN simam_raw.siscop_decreto d
    ON d.entidade=i.entidade AND d.exercicio=i.exercicio AND d.decreto=i.decreto
  WHERE d.processado='S' AND d.estornado='N' AND i.operacao='S'

  UNION ALL
  -- 113 REDUÇÃO (-)
  SELECT toUInt32(ifNull(i.entidade,0)), toUInt16(ifNull(i.exercicio,0)),
         113,
         ifNull(toDate32OrNull(d.data_processamento), toDate32('1970-01-01')),
         ifNull(i.despesa,''),
         toString(toUInt32(ifNull(i.fonterecurso,0))),
         toDecimal64(ifNull(i.valor,0),2) * -1
  FROM simam_raw.siscop_itemdecreto i
  INNER JOIN simam_raw.siscop_decreto d
    ON d.entidade=i.entidade AND d.exercicio=i.exercicio AND d.decreto=i.decreto
  WHERE d.processado='S' AND d.estornado='N' AND i.operacao='R'
) m;
