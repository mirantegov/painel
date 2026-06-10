# Coleta — tabelas Tributos (arrecadação / dívida / cadastros) a exportar

> Levantado em 2026-06-10 a partir de 28 views + 6 DDLs de tabela-base do schema **`aise`**.
> O núcleo são tabelas `trib*` (+ algumas compartilhadas: `pessoa`, `cidade`, endereço…).
> No `raw_<ibge>` cada tabela vira **`aise_<tabela>`** (mesmo padrão de RH/APICE —
> ver [coleta-rh-tabelas.md](coleta-rh-tabelas.md) e [coleta-apice-tabelas.md](coleta-apice-tabelas.md)).
> As views `aise.tribview*`/`aise.trib*` são **consultas denormalizadas** (não star-schema
> como as `bi.fin_*` do RH) — a maioria só resolve descrições; algumas agregam (ver decisão).
> Lista possivelmente incompleta — completar conforme novas dependências aparecerem.

## Tabelas-base `aise` (~90)

### Cadastro geral / imobiliário / mobiliário / ITBI (20)
tribcadastrogeral · tribcadastroimobiliario · tribcadastromobiliario · tribcadastrogeralisencao · tribmobiliarioatividade · tribmobiliariosituacao · tribsituacaomobiliario · tribmobiliarioservico · tribpessoamobiliario · tribimobiliariosegmento · tribimobiliarioareaverde · tribtipoareaverde · tribimobiliaria · tribimobiliariacadastro · tribimobiliarioitbi · tribproprietarioitbi · tribproprietario · tribvinculo · tribatividade · cnae

### Localização fiscal (6)
tribtrecho · tribdistrito · tribsetor · tribsetorquadra · tribloteamento · tribcondominio

### Boletim cadastral / modelos (6)
tribboletimmobiliario · tribboletimavulso · tribboletimimobiliariosegmento · tribmodeloresposta · tribmodelocampo · tribtiposegmento

### Débito / dívida (15)
tribdebito · tribdebitocalc · tribdebitoparcela · tribdebitoparcelareceita · tribdebitoreceita · tribdebitoobservacao · tribguiarecolhimento · tribsituacaoparcela · tribparcelamento · tribcontencioso · tribcalculoanual · formacorrecao · tribprotesto · tribisencao · tribisencaotipo

### Dívida ativa / livro / ajuizamento / auto de infração (11)
triblivro · triblivroregistro · triblivroparcelareceita · tribdocumento · tribdocumentoitemdividaativa · tribcartorioajuizamento · cartorio · vinculacaodivida · tribautoinfracaofiscal · tribfiscal · ptcprocesso

### Receita / movimentação / integração contábil (12)
tribreceita · tribreceitaconta · tribreceitatipo · tribclassificacaoreceitatipo · tribmovimentacao · tribmovimentacaodetalhe · tribtipomovimentacao · tribtipomovimentacaointeg · tribmotivodesconto · tribtipodeducao · tribtipooperacaotce · tribdevolucaocreditomov

### Pagamento / arrecadação / baixa (10)
tribpagamento · tribpagamentodebito · tribpagamentobloqueto · tribpagamentolote · tribbloquetodebito · tribbaixaautomaticadetalhe · tribcreditocontribuinte · tribcreditocontribuinteitem · contabancaria · banco

### Entidade / pessoa / endereço — **compartilhadas com RH** (10)
tribentidadetributacao · entidade · pessoa · enderecopessoa · endereco · contatopessoa · cidade · logradouro · tipologradouro · bairro

> ⚠️ `pessoa`, `cidade`, `endereco`, `enderecopessoa`, `contatopessoa`, `logradouro`,
> `tipologradouro`, `bairro`, `entidade` também aparecem no RH → **uma única** tabela
> `aise_<tabela>` no `raw_<ibge>` serve aos dois domínios (não duplicar no manifest).

## DDLs de tabela-base recebidos (6) — estrutura confirmada

`tribpagamento` · `tribpagamentodebito` · `tribdebito` · `tribdebitocalc` · `tribdebitoparcela` · `tribdebitoreceita`
(úteis p/ tipar colunas no ETL; o RAW infere do Parquet, mas a PK/colunas ajudam no `sim_<ibge>`).

## Views entregues (28) — DECISÃO PENDENTE (a)/(b)/(c)

**Agregam valores (candidatas a fato/mart):**
- `tribfichadebitosaldo` (saldo de débito por movimentação)
- `tribintegracaoreceita` (integração contábil — receita/desconto/renúncia/restituição + classificação TCE)
- `tribviewdebito` (débito × parcela × pagamento)
- `tribviewbloquetototal` · `tribviewbloquetorecedesc` (bloquetos)
- `tribviewdebitoajuizado` (dívida ativa ajuizada)
- `tribviewvalorreceitaano` (receita por exercício)
- `tribviewrelvaloresbaixa` (baixas/arrecadação — UNION arquivo+crédito+pagamento)
- `tribviewautoinfracao` · `tribviewconsultaitbi` (ITBI)

**Consultas/dimensões denormalizadas (resolvem descrições):**
`tribviewajuizamento` · `tribviewareaverde` · `tribviewatividadexcadastro` · `tribviewboletimmobiliario` · `tribviewboletimsegmento` · `tribviewcadastrodesetores` · `tribviewcadastrohabitacao` · `tribviewcadastroimobiliario` · `tribviewcadastromobiliario` · `tribviewcadhabitacaodebito` · `tribviewcnae` · `tribviewconsultaarrematacao` · `tribviewconsultacoresponsavel` · `tribviewconsultamobxdebito` · `tribviewimobiliaria` · `tribviewpessoa` · `tribviewproprietario` · `tribviewvinculacaodivida`

Opções (igual RH/APICE):
- **(a)** exportar as views direto (rápido, acopla à lógica Elotech).
- **(b)** só as ~90 base + recompor no ETL (controle total).
- **(c) híbrido (provável):** base `aise` no RAW + materializar as views **que agregam** como referência da regra (classificação TCE de receita está toda na `tribintegracaoreceita`).

## Lógica referenciada (não exporta)

- Trigger `aise.trg_geraiddebitoreceita` (gera `iddebitoreceita`).
- Função `aise.buscaano` (usada em `tribviewcadastromobiliario`) — já listada nos helpers de RH.

## Pendências

- Definir (a)/(b)/(c) — vale p/ RH, APICE e Tributos juntos.
- Conferir colunas faltantes de dependências não enviadas (DDLs só vieram p/ 6 tabelas de débito/pagamento).
- Consolidar manifests por schema no exportador: `siscop` (existe) + `apice` + `aise` (RH **e** tributos no mesmo schema `aise`).
- Backlog: gap analysis Marts × dados coletados (ver memória) — agora com RH + Tributos + APICE levantados.
