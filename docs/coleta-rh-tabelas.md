# Coleta — tabelas RH (folha de pagamento / pessoal) a exportar

> Levantado em 2026-06-10 a partir das ~30 queries/views/funções de Recursos Humanos.
> O núcleo das tabelas-base está no schema **`aise`**. As views entregues (`bi.*`,
> `folharh.*`, `aise.v_*`) são camadas analíticas **já prontas** da Elotech sobre o
> `aise` — interessam à decisão Marts (ver fim). As funções `aise.fnc_*` são **lógica**
> (não exportam): se a regra for necessária, é reimplementada no ETL.
>
> No `raw_<ibge>` cada tabela vira **`<schema>_<tabela>`** (ex.: `aise_rhfichafinanceira`,
> `aise_pessoa`) — o prefixo evita colisão com `siscop`/`apice`. Mesmo padrão do APICE
> (ver [coleta-apice-tabelas.md](coleta-apice-tabelas.md)).

## Tabelas-base `aise` (35)

**Ficha financeira & funcionário — núcleo**
rhfichafinanceira · rhhistoricofuncionario · rhfuncionario · rhfuncionarioincidenciaevento

**Eventos & definições**
rhevento · rheventodefinicao · rheventocalculo

**Tipo de folha / exercício / IRRF / parâmetros**
rhtipofolha · rhexerciciomes · rhirrf · parametroentidade

**Cargo / classe / atividade / CBO**
rhcargo · rhclasse · rhcargoatividade · rhatividade · rhcbo

**Lotação**
rhlotacao · rhmodelolotacao

**Pessoa & geografia**
pessoa · rhpessoa · cidade · unidadefederacao

**Movimentação de pessoal**
rhmovimentacaopessoal · rhtipomovimentacao · rhmovimentacaoafastamento · rhmovimentacaolegal · rhmovimentacaonomeacao · rhmovimentacaooutros · rhafastamento

**Programações (eventos temporais)**
rhprogramacaorescisao · rhprogramacaopremio · rhprogramacaofalta · rhprogramacaoferias · rhrescisao

**Atos**
cgato

## Origem alternativa — schema `consamu` (2) — VERIFICAR

A query "FOLHA DE PAGAMENTO (piso nacional)" lê de:
- `consamu.rh_mov_fichafinanceira_ano_aberto`
- `consamu.rh_mov_fichafinanceira_mes_fechado`

São objetos **já denormalizados** (ficha financeira por evento, ano aberto + mês fechado).
**Pendente confirmar** se são tabelas físicas ou views sobre `aise`. Se forem físicas e
contiverem tudo que precisamos, podem substituir parte do núcleo `aise` no RAW. Por ora,
o núcleo `aise` acima é a fonte canônica.

## Views derivadas entregues — DECISÃO PENDENTE

São a camada BI **pronta** da Elotech. Não são tabelas-base; computam categorias/medidas.

**`bi.*` (8 + 1 não recebida)** — modelo dimensional de folha:
- `fin_cad_eventos_folha`, `fin_cad_tipos_folha` (dimensões)
- `fin_mov_ficha_financeira_anterior` (2023–2025), `fin_mov_ficha_financeira_atual` *(referenciada, NÃO recebida)*, `fin_mov_ficha_financeira_folha` (UNION das duas)
- `fin_mov_folha_proventos`, `fin_mov_folha_rescisao` (agregações)
- `fin_vue_folha_horas_extras`, `fin_vue_folha_valores` (topo — valores consolidados)

**`folharh.*` (4)** — dimensões/fato análogas: `cad_folhaevento` · `cad_folhatipo` · `cad_lotacao` · `mov_financeira`

**`aise.v_*` (7 + 1 não recebida)**: `v_rhadmissoesrescisoes` · `v_rhafastamentosperiodo` · `v_rheventocalculo` · `v_rhevolucaoevento` · `v_rhlotacao` · `v_rhmovimentacao` · `v_rhhistoricofuncionario` · `v_dadosfuncionario` *(referenciada por `v_rhmovimentacao`, NÃO recebida)*

Opções (igual ao APICE):
- **(a)** exportar as views direto (`SELECT *` já traz categorias/medidas calculadas — caminho mais curto p/ o painel, mas acopla à lógica da Elotech).
- **(b)** exportar só as 35 tabelas-base `aise` e **recompor a categorização no ETL** (controle total, independente da Elotech) — exige reescrever a lógica das funções abaixo.
- **(c) híbrido (provável recomendação):** base `aise` no RAW para granularidade/auditoria **+** materializar as `bi.fin_*` e `aise.v_*` como referência da regra de categorização (o "de-para" de `cdcategoriadefinicao`/`cdtipodefinicao`/situação está todo nelas).

## Funções `aise.fnc_*` — LÓGICA (não exportam)

Reimplementar no ETL **se** a regra for necessária:
- `fnc_fichafinanceira_s1207` (rubricas eSocial S-1207 + isenção IRRF idade ≥65)
- `fnc_eventoscontracheque` (linhas do contracheque)
- `fnc_getcodigoretencaodirf` (código retenção DIRF 0561/0588/3533)
- `fnc_getdescricaoatividadecargo` (atividades do cargo)
- `fnc_gettipofolhahistorico` (tipofolha/fechamento do histórico)

Helpers de competência usados nas views/queries (reimplementar como utilidades no ETL):
`buscaano` · `buscames` · `iniciocompetencia` · `fimcompetencia` · `fnc_getlotacaonivel` · `fnc_isperiodosincidentes` (+ `idade()` nativo).

## Pendências

- Confirmar natureza de `consamu.rh_mov_fichafinanceira_*` (tabela física vs view).
- Receber/levantar `bi.fin_mov_ficha_financeira_atual` e `aise.v_dadosfuncionario` (referenciadas, não enviadas).
- Definir (a)/(b)/(c) para folha — e a mesma decisão das 3 views APICE ainda em aberto.
- Falta a leva de **tributos** (schema `aise` também) — próxima.
- Consolidar manifests por schema no exportador (`siscop` existe; criar `apice`, `aise`).
- Backlog: gap analysis Marts × dados coletados (ver memória) após tributos — as `bi.fin_*`
  praticamente **são** os marts de folha; comparar com o que os componentes do painel exigem.
