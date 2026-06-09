# Elotech eloweb — queries de referência (base do transform do Épico 5)

> Queries prontas do cliente (outro projeto) que mostram **como derivar** dados de
> negócio a partir do raw eloweb. **NÃO** vão no exportador (que é raw) — viram o
> **transform no ClickHouse (Épico 5)**: raw eloweb → canônico SIM-AM.
>
> Para o exportador (Épico 4), o que importa é o **FROM/JOIN**: as tabelas-fonte
> que precisam estar no MinIO. Já refletidas em `exporter/manifests/elotech-eloweb.yaml`.

## Convenções observadas

- **Despesa/receita ORÇAMENTÁRIA = schema `siscop`.** (No `aise` ficam **tributos** e **RH**.)
- Cliente/ente = coluna **`entidade`** (numeric). Dimensão: `siscop.entidade`
  (`entidade, nome, cnpj, identificacaotce, tipoentidade, codigo`).
- Ano = **`exercicio`** (queries usam `exercicio >= 2013`).
- **`identificacaotce`** = identificador do ente no TCE.
- **`tipoentidade`** (char): `E`=Executivo→1, `L`=Legislativo→2, `R`=RPPS→3, `A`=Autarquia→4, else 9.
- **Órgão/unidade/etc NÃO são colunas** — derivam de `siscop.despesa.programatica` por
  `SUBSTRING(posicao, tamanho)` guiado por `siscop.niveismodelodespesa` (junção por
  `modelodespesa`/`tipo`/`ordem`, filtrando o nível por `nivellei`).

## 1) Dimensões de classificação da despesa

**Tabelas-fonte (→ manifest):** `siscop.despesa`, `siscop.niveismodelodespesa`, `siscop.entidade`.

Todas seguem o **mesmo template** — mudam só o `nivellei` (e às vezes `N.TIPO`). Derivam o
código/descrição de cada nível de `programatica`, `DISTINCT` por (entidade, exercicio, código).

| Dimensão | `nivellei` | Obs. |
|---|---|---|
| Órgão | `O` | `N.TIPO = D.TIPO` |
| Unidade | `U` | `N.TIPO = 'C'` (composto) |
| Função | `F` | |
| Subfunção | `SF` | |
| Programa | `P` | |
| Ação | `PA` | |
| Natureza | — | **especial**: `SUBSTRING(programatica, 19, 6)` com `D.NIVEL = 10`, `GROUP BY` (sem niveismodelodespesa); usa `despesa.idnatureza`. |

Saída comum: `identidade(=identificacaotce)`, `nrAno(=exercicio)`, `cd<Nivel>`, `nm<Nivel>`,
`ds<Nivel>(código - descrição)`, `cdEntidade`, `idtpentidade`/`cdtpentidade`.

Template (exemplo: Órgão, `nivellei='O'`):

```sql
SELECT
    entidade.identificacaotce AS "identidade",
    despesa.exercicio AS "nrano", despesa.codigo AS "cdorgao",
    despesa.descricao AS "nmorgao",
    concat(despesa.codigo, ' - ', despesa.descricao) AS "dsorgao",
    despesa.entidade AS "cdEntidade",
    CASE entidade.tipoentidade WHEN 'E' THEN 1 WHEN 'L' THEN 2
         WHEN 'R' THEN 3 WHEN 'A' THEN 4 ELSE 9 END AS "idtpentidade",
    entidade.tipoentidade AS "cdtpentidade"
FROM (SELECT DISTINCT D.ENTIDADE, D.EXERCICIO, UPPER(D.DESCRICAO) AS DESCRICAO,
             CAST(SUBSTRING(D.PROGRAMATICA, N.POSICAO::INT, N.TAMANHO::INT) AS VARCHAR) AS codigo
        FROM SISCOP.DESPESA D, SISCOP.NIVEISMODELODESPESA N
       WHERE D.MODELODESPESA = N.MODELODESPESA AND D.TIPO = N.TIPO
         AND D.NIVEL = N.ORDEM AND N.NIVELLEI = 'O' AND D.EXERCICIO >= 2013) despesa
     LEFT JOIN siscop.entidade entidade ON entidade.entidade = despesa.entidade;
```

> No Épico 5 (ClickHouse) isso vira uma tabela de dimensões parseando `programatica`
> por nível; no exportador (Épico 4) só dumpamos `siscop.despesa` + `niveismodelodespesa` raw.

## 2) Layout do `programatica` (SUBSTRING — de "Detalhe dos Empenhos")

Posições fixas em `siscop.empenho.programatica` / `siscop.despesa.programatica`:

| Campo | `SUBSTRING(pos, tam)` |
|---|---|
| órgão | (1, 2) |
| unidade | (1, 5) |
| função | (6, 2) |
| subfunção | (8, 3) |
| programa | (11, 4) |
| ação | (15, 4) |
| categoria | (19, 1) |
| grupo | (20, 1) |
| modalidade | (21, 2) |
| elemento | (23, 2) |
| natureza | (19, 6) |

Compostos (concatenações) no detalhe: `natureza+desdobramento+subdesdobramento`, `grupo+elemento`,
`modalidade+elemento+desdobramento`, etc. `desdobradesp`/`subdesdobramento` são colunas de `siscop.empenho`.
`tipo` (1..6) → Ordinário/Global/Estimativo (+ variantes COVID-19). Campos de processo/contrato/convênio/
NAD/licitação compõem `no/ano` → `"no/ano"`.

## 3) Movimentos da despesa — estágios e procedimentos

Cada estágio é um `UNION ALL` de movimentos (valor + sinal), ligados ao empenho por
`(entidade, exercicio, empenho[, unidadeorcamentaria])`. Tabelas-fonte → manifest.

| Estágio (cd) | Procedimento | Origem (siscop) | Sinal |
|---|---|---|---|
| Empenho (16) | 161 empenho | `empenho` (contabilizado='S') | + |
| | 162 anulação | `anulacaoempenho` | − |
| | 163 anulação estorno | `anulacaoempenho` (dataestorno) | + |
| | 164 cancel. restos | `cancelamentorestos` | − |
| | 165 cancel. restos estorno | `cancelamentorestos` (dataestorno) | + |
| Liquidação (17) | 171 liquidação | `liquidacao` (contabilizado='S') | + |
| | 172 estorno | `estornoliquidacao` | − |
| Pagamento (18) | 181 pagamento | `pagamento` ⋈ `ordempagamento_liquidacao` ⋈ `liquidacao` ⋈ `empenho` | + |
| | 182 estorno | `estornopagamento` (mesma cadeia) | − |
| Retenção (18) | 183 retenção | `retencoesliquidacao` ⋈ `liquidacao` ⋈ `empenho` | + |
| | 184 retenção estorno | `retencoesliquidacao` (dataestcontabilizado) | − |

`ordempagamento_liquidacao` (OPL) liga pagamento → liquidação → empenho. `lancamentosequencia`
aparece nas retenções. Filtro de período nas queries = `exercicio = ano atual`.

## 4) Restos a pagar

Fonte: `siscop.fichaempenho` (saldos por empenho) ⋈ `siscop.exercicio` (anos) ⋈ `siscop.empenho`.
`vlProcessar` / `vlProcessado` derivam dos `valor*` da ficha (empenhado − anulações − liquidações…).
Usa a função `siscop.buscaano(data)` e `exercicio < ano_atual` (empenhos de anos anteriores ainda abertos).

## 5) Dimensões (cadastros)

Fonte (siscop, **globais** — sem coluna `entidade`): `cidade`, `unidadefederacao`, `fornecedor`,
`fonterecurso` + hierarquia padrão (`fonterecursopadrao`, `fontepadraotce[UF='PR']`,
`fonteorigemrecurso`, `especificacaofonte`, `fonteaplicacaorecurso`, `desdobramentofonte`,
`detalhamentofonte`, `fontearea`). Por-ente: `siscop.entidade`, `siscop.exercicio`.

- **Entidade**: `entidade.identificacaotce`(=idTCE), `tipoentidade` (E/L/R/A → 1/2/3/4; nomes
  Executivo/Legislativo/Previdência/Autarquia), `cnpj`, `mscpoderorgao`(=cdMSC),
  `msccodigosiconfi`(=cdSICONFI). Filtro do cliente: `codigoibge IN ('41','33')` (PR/SC).
- **IBGE do ente** = `unidadefederacao.codigoibge || cidade.ibge`, casando `entidade.cidade`(texto)
  com `cidade.descricao` e `cidade.unidadefederacao` → `unidadefederacao`.
- **Fornecedor**: `tipopessoa` (F/J; estrangeiro→'98'), `situacao` (0=Ativo, >0=Inativo),
  `responsavelliquidacao`, endereço/cidade.
- **Fonte de recurso**: cadeia `fonterecurso → fonterecursopadrao → {fontepadraotce, origem,
  especificacao, aplicacao, desdobramento, detalhamento, area}`. `cdaplicacaofonte` deriva o
  **tipoaplicacao** (ver query "Despesa Executada").

## 6) Modelo-alvo ClickHouse — despesa executada consolidada

> Queries "Despesa Executada" e "Despesa executada consolidada" são **ClickHouse** (usam
> `toDate32`/`leftPad`/`toMonth`, e tabelas `ctb_*`/`orc_*`). São o **destino do Épico 5**, não fonte.

- **Registros (movimentos):** `ctb_reg_despesa_{empenho,liquidacao,pagamento,retencao}[_old]`,
  `ctb_reg_despesa_empenho_detalhe[_old]`, `orc_reg_despesa_{orcada,suplementada,reduzida}_{new,old}`.
  Views anuais consolidadas: `ctb_vue_despesa_executada_<ANO>[_1|_2]`.
- **Filtros/dimensões (marts):** `ctb_flt_entidades`, `ctb_flt_estagio_procedimento`,
  `ctb_flt_fonte_recursos`, `ctb_flt_fornecedor`, `ctb_flt_despesa_{orgao,unidade,secretaria,
  programa,acao,categoria,grupo,modalidade,elemento,natureza,natureza_desdobrada}`,
  `orc_flt_despesa_*`, `fin_flt_tipos_aplicacao`.
- **Valores por procedimento** (pivot `CASE cdprocedimento/cdestagio`):
  `111` orçado · `112` suplementado · `113` reduzido · estágio `10` atualizado ·
  `161-165` empenho/anulações/cancel.restos · estágio `16` empenhado ·
  `171/172` liquidação/estorno · estágio `17` liquidado · `181/182` pagamento/estorno ·
  `183/184` retenção/estorno · estágio `18` pago.
  Derivados: `aempenhar = atualizado − empenhado`, `aliquidar = empenhado − liquidado`,
  `apagar = empenhado − pago`, `processado = liquidado − pago`.
- **tipoaplicacao** (de `cdaplicacaofonte` [+ `cdfonterecurso`]): 1 Recursos Livres · 2 Educação ·
  3 Saúde · 4 Social · 6 Previdência · 7 Consórcios · 9 Outras Áreas · 0 Classificar.
- **nrmes** = `leftPad(toMonth(dtmovimento),2,'0')`; **nrano** = exercício.

Esse é, na prática, o **fato despesa SIM-AM** que o sync ClickHouse→Postgres entrega à API.

> **Receita** (orçamentária) ainda sem queries — tabelas siscop candidatas no dump:
> `diarioarrecadacao` (realizada), `calculoprevisaoreceita`, `contabancariareceita`,
> `ammrealizacaomensalreceitafonte`. Habilitar no manifest quando chegarem.
