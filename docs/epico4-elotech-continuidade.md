# Continuidade — Integração Elotech eloweb (exportador → MinIO)

> Handoff para retomar em outra janela de contexto. Estado em 2026-06-08.
> Lê junto: [`docs/epico4-elotech.md`](epico4-elotech.md) (fluxo), [`docs/epico5-elotech-queries.md`](epico5-elotech-queries.md) (lógica/transform), [`exporter/README.md`](../exporter/README.md), [`exporter/manifests/elotech-eloweb.yaml`](../exporter/manifests/elotech-eloweb.yaml).

## Onde estamos

- **Épico 4 (exportador raw PG→Parquet→MinIO) entregue** (v… série de PRs #81–#93). Genérico, dirigido por manifest, multi-schema, com `filters` parametrizados, schema de origem configurável, cross-compile Windows (`make windows`). MinIO em `infra/docker-compose.minio.yml` (+ createbuckets). ngrok em `infra/ngrok.yml` (single tunnel S3 :9000 no free tier).
- **Integração Elotech em andamento** (issue [#83](https://github.com/mirantegov/painel/issues/83)). Manifest `exporter/manifests/elotech-eloweb.yaml` com **53 tabelas** siscop, cobrindo orçado/execução/receita/financeiro + dims + acessórias.
- **Falta:** (1) rodar o 1º export real (precisa `entidade`+`exercicio`+IBGE do cliente); (2) decidir tabelas acessórias em aberto (abaixo); (3) Épico 5 (ClickHouse: raw→SIM-AM).

## Modelo Elotech eloweb (fatos confirmados)

- 1 banco Postgres, **11 schemas por MÓDULO** (não por cliente): `aise, alvara, analytics, apice, conversao, eloarquivo, image, protocolo, sigeloam, siscop, unico`.
- **Despesa/receita/orçamentária/financeiro = schema `siscop`.** `aise` = tributos + RH (fora deste manifest).
- **Cliente/ente = coluna `entidade`** (numeric, NÃO é IBGE). Ano = `exercicio`. Filtro de export = `{entidade, exercicio}`.
- **IBGE do ente** = `unidadefederacao.codigoibge || cidade.ibge` (casa `entidade.cidade` texto → `cidade`). Entidade tem `identificacaotce`, `mscpoderorgao`(MSC), `msccodigosiconfi`(SICONFI), `tipoentidade` (E/L/R/A → 1/2/3/4).
- **Sem materialized views em siscop** (as 21 matview estão no `aise`). siscop tem 82 views normais (derivadas — não são fonte raw; o exportador dumpa só tabelas-base).
- **`programatica`** (despesa) layout: órgão(1,2) unidade(1,5) função(6,2) subfunção(8,3) programa(11,4) ação(15,4) categoria(19,1) grupo(20,1) modalidade(21,2) elemento(23,2) natureza(19,6).
- **Estágios/procedimentos** (a serem aplicados no ClickHouse): orçado **10** (111 orçado·112 supl·113 red); empenho **16** (161-165); liquidação **17** (171-172); pagamento **18** (181-182); retenção **18** (183-184); receita prevista **10** (101 previsto·102 dedução); receita realizada **26** (261 arrecad·262 devol·263 estorno arrecad·264 estorno devol). Detalhe em `docs/epico5-elotech-queries.md`.

## Tabelas no manifest (53) — por domínio (schema siscop)

- **Dims por-ente:** entidade, exercicio.
- **Despesa classificação:** despesa, niveismodelodespesa(global).
- **Orçado/previsto (10):** orcdespesa, orcversaoorcamento, orcreceita, orcreceita_fontetce.
- **Despesa execução:** empenho, anulacaoempenho, cancelamentorestos, fichaempenho, liquidacao, estornoliquidacao, pagamento, estornopagamento, ordempagamento_liquidacao, retencoesliquidacao, lancamentosequencia.
- **Receita realizada:** receita, realizacaoreceita, realizacaoreceitaitem, orcparametroreceita.
- **Financeiro/saldo:** plano, planocontacorrente, contacorrente, eventoslancados, eventoslancadosconta, tabelaevento, contabancariavinculo, contabancaria.
- **Planejamento (créditos adicionais):** decreto, itemdecreto, itemdecretoreceita.
- **Financeiro (conciliação/aplicações):** conciliacao, contaaplicacao.
- **Contexto (convênio/contrato/dívida):** cadastroconvenio, contrato, divida, dividalancamento.
- **Dims globais (`_global/`, sem entidade):** banco, cidade, unidadefederacao, fornecedor, fonterecurso, fonterecursopadrao, fontepadraotce, fonteorigemrecurso, especificacaofonte, fonteaplicacaorecurso, desdobramentofonte, detalhamentofonte, fontearea.

## Cobertura vs módulos do painel

| Módulo | Campos-chave | Coberto por |
|---|---|---|
| **Despesas** | atualizada/empenhada/liquidada/pago/aEmpenhar/aPagar por órgão/unidade/função/fonte | orcdespesa + empenho/liquidacao/pagamento + despesa(classif) + fonte |
| **Receitas** | prevista/arrecadada/aArrecadar por categoria/origem | orcreceita(+fontetce) + receita/realizacaoreceita(item) |
| **Planejamento** | orçado/suplementado/reduzido/atualizado; receita prevista/deduzida/alterada; metas LOA | orcdespesa+orcversao + decreto/itemdecreto(receita) + orcreceita |
| **Financeiro** | contas/saldos bancários, fontes, pagamentos, fornecedores, aplicações, conciliação, fluxo | plano/contas/eventos + contabancaria + contaaplicacao + conciliacao + fornecedor |

## Em aberto — PERGUNTAR ao usuário

1. **Valores para rodar o 1º export:** `entidade` (código do cliente em `siscop.entidade`), `exercicio` (ano), `IBGE` do município. (Bloqueia o teste real.)
2. **Conciliação detalhada:** `conciliacaoextrato`/`conciliacaoextratoitem` **não têm coluna `entidade`** (ligam por id de conciliação). Incluir como global (dump de todos clientes, pesado) ou filtrar por outra chave? Precisa de query de referência.
3. **Receita por diário/mês:** existe `diarioarrecadacao`, `calculoprevisaoreceita`, `ammrealizacaomensalreceitafonte` — incluir? (depende se o painel precisa de receita mensal além da realizada por lançamento).
4. **Anexos LRF/RREO/RGF** (metas fiscais): `lrfanexo`, `res04anexo10`, etc. — necessário p/ indicadores de Planejamento/Financeiro? Geralmente são relatórios derivados (talvez fiquem no ClickHouse).
5. **Pessoal (despesa de pessoal):** o painel mostra "despesa pessoal/rigidez". Vem da natureza (elemento 31xx) da própria despesa, ou precisa de tabela de RH (`aise`)? Confirmar se RH entra agora.
6. **Validar nomes/joins** das acessórias adicionadas por análise (decreto/itemdecreto/contaaplicacao/conciliacao/contrato/convenio/divida) com as **queries reais** do cliente quando houver — hoje entraram por inferência do dump + campos dos módulos.

## Próximos passos (ordem sugerida)

1. **Receber `entidade`+`exercicio`+IBGE** → preencher `__ENTIDADE__`/`__EXERCICIO__` no manifest (ou via futura flag `--filter entidade=..`), rodar:
   ```bash
   cd exporter
   DATABASE_URL="postgresql://USER:SENHA@HOST_ELOTECH:5432/BANCO" \
   S3_ENDPOINT="https://<ngrok-s3>" S3_ACCESS_KEY=minioadmin S3_SECRET_KEY=minioadmin S3_BUCKET=mirante-parquet \
   go run . --municipio <ibge> --ano <exercicio> --manifest manifests/elotech-eloweb.yaml
   ```
   Conferir objetos em `mc ls -r local/mirante-parquet/<ibge>/`.
2. **Resolver os itens "Em aberto"** com o usuário; ajustar manifest.
3. **(Melhoria do exportador)** opcional: flag `--filter chave=valor` p/ injetar `entidade`/`exercicio` sem editar o manifest (hoje os valores são placeholders `__ENTIDADE__`/`__EXERCICIO__`). Ver `Config.Filters`/`Table.Filters`.
4. **Iniciar Épico 5 (ClickHouse):** portar os marts `ctb_*`/`orc_*` do projeto do cliente (queries "Despesa Executada/consolidada" já mapeadas em `docs/epico5-elotech-queries.md`) — raw siscop (MinIO) → SIM-AM. O cliente já tem a lógica pronta em ClickHouse, acelera muito.

## Como o exportador funciona (resumo p/ quem chega agora)

- Dumper genérico PG→Parquet (pgx + parquet-go + minio-go), **raw** (sem transformação; NULLs/tipos fiéis; numeric/uuid/temporais→string lossless). Código em `exporter/internal/exporter/`.
- Manifest YAML lista tabelas: `source: [schema.]tabela`, `scope: tenant|global`, `filters: {col: val}` (WHERE parametrizado), `columns: [...]` (subset), `partition_by_ano`.
- `--municipio <ibge>` = path no MinIO; `--schema` = schema default de `scope:tenant` (não usado no Elotech porque o source traz `siscop.`); `--ano` = usado em `partition_by_ano`.
- Layout MinIO: `<ibge>/<tabela>/part-0.parquet`, `<ibge>/<tabela>/ano=<ano>/...`, `_global/<tabela>/...`. Idempotente.
- **Dump do cliente:** `tmp/eloweb.dump` (schema-only, 13MB, **gitignored** — não versionar). Grepável p/ achar tabelas/colunas.

## Convenções do projeto
Branch `govtech42/...` → PR → review subagent `caveman:cavecrew-reviewer` → `gh pr merge --squash --delete-branch`. Commits/PRs co-autoria `Co-Authored-By: Claude Opus 4.8 (1M context)`. Planos/docs em `docs/`. Slack `#analytics`.
