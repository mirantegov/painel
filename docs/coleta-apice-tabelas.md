# Coleta — tabelas APICE (licitações / contratos) a exportar

> Levantado em 2026-06-10 a partir de 19 SQLs/views do portal (schema `apice`).
> **Ainda NÃO adicionadas ao exportador.** Viram `apice_<tabela>` no `raw_<ibge>`
> (o prefixo de schema evita colisão com siscop/aise — ex.: `apice_entidade` vs
> `siscop_entidade`). Dimensões/referência exportam sem filtro de entidade.

## Tabelas-base (63)

**Licitação — núcleo**
cllicitacao · cltipolicitacao · cllicitacaoitem · cllicitacaopublicacao · cllicitacaorecurso · cllicitacaofundamentolegal · clmidiasonline · naturezaprocedimento · tipoparticipacao · parametro

**Licitação — itens / centro de custo**
cllicitacaocentrocusto · cllicitacaoitemcentrocusto · cltransferenciacc · cltransferenciaitem · clreqlicitacao · clreqlicitacaoitem

**Proposta / análise / homologação / realinhamento**
clpropostacomercial · clanalisevencedor · clhomologacao · clhistoricovencedor · clrealinhaitem · clrealinhamento

**Cotação / anexo / parecer / minuta / pedido / solicitação**
clcotacao · clcotacaoitem · clanexo · clanexodespesa · clparecer · clminuta · clpedido · clsolicitacao · clsolicitacaoitem · cllistaarquivos

**Contrato + aditivos + documentação**
clcontrato · clcontratoatocontratual · claditivoitem · contratosuspenso · clcontratodocumentacao · cldocumentacao · clcontratopublicacao · claditivopublicacao · clorgaopublicacao · clregimeexecucao

**NAD**
clnad · clnaditem

**Arquivos (telas de upload)**
arquivo · cllicitacaoarquivo · cllicitacaofornecedor · clcontratoarquivo · clatapregao · pessoadocumentacao · clpedidoarquivo · cllistacompraarquivo · claditivoarquivo · clhomologacaoarquivo · clsolicdiariaarquivo · cladjudicacaoarquivo · clminutaarquivo · clsolicitacaoarquivo

**Pessoas / entidade / local**
pessoa · enderecopessoa · cidade · entidade

**CNAE**
cnaesubclasse

## Views (3) — DECISÃO PENDENTE

São views (derivadas), não tabelas-base:
- `cllicitacao_andamento_prev`
- `cllicitacaoitem_calculado` (computa `valormaximototal`)
- `view_nadarquivo`

Opções: **(a)** exportar a view direto (`SELECT *` traz o valor calculado — mais simples; recomendado por ora) · **(b)** só tabelas-base e refazer o cálculo no ETL.

## Pendências

- Definir (a)/(b) das views.
- Coletar **tributos e RH** (schema `aise`) — próxima leva de SQLs.
- Consolidar manifests por schema no exportador (siscop já existe; criar apice/aise).
- Backlog: gap analysis Marts × dados coletados (ver memória) após RH+tributos.
