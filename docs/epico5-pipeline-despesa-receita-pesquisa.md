# Pesquisa — Pipeline `raw_<ibge>` → `sim_<ibge>` → `mun_<ibge>` (Despesa e Receita)

> Documento de pesquisa para iniciar a implementação do pipeline de dados dos módulos
> **despesa** e **receita** (recorte do Épico 5). Conecta o que o front consome (camada-alvo)
> com as fontes reais (SIM-AM canônico / raw Elotech) e expõe os **gaps** que decidem o desenho.
>
> Relacionados: [`clickhouse-epico5-design.md`](clickhouse-epico5-design.md) (arquitetura),
> [`epico5-elotech-queries.md`](epico5-elotech-queries.md) (mapeamento Elotech→SIM-AM).

---

## 1. Objetivo e recorte

Levar os módulos **despesa** e **receita** de *mock* para dados reais, percorrendo:

```
MinIO (Parquet, Elotech)
  → raw_<ibge>.siscop_*           (landing, espelha a origem, tudo Nullable(String))
    → sim_<ibge>.* (+ marts)      (canônico SIM-AM, tipado; agregações de execução)
      → mun_<ibge>.fato_despesa / fato_receita   (Postgres, SSoT normalizado)
      → mun_<ibge>.mod_despesa / mod_receita     (Postgres, snapshot jsonb = o que a API serve)
```

O **fim do pipeline tem dois alvos** no mesmo schema tenant do Postgres:

1. **`fato_*`** — linhas normalizadas (consulta flexível futura).
2. **`mod_*.dados` (jsonb)** — **é o que o componente React lê hoje** via
   `useSnapshot("despesa"|"receita", …)`. O ETL precisa **emitir exatamente esse shape**.

> Decisão de arquitetura a confirmar (§6): o JSON do `mod_*` é montado **no ClickHouse**
> (agregação → `dados` String/JSON → `postgresql()`) ou **no app** (a partir de `fato_*`)?
> A pesquisa abaixo assume o primeiro (alinhado ao design), mas o gap vale para os dois.

---

## 2. Camada-alvo — o que o front exige (resumo dos shapes)

Detalhe completo dos shapes em `lib/demo-despesa.ts` / `lib/demo-receita.ts` e nos componentes
`components/despesa-municipal.tsx` / `components/receita-municipal.tsx`. Resumo das **chaves de topo**:

### `DESPESA_SNAPSHOT` (≈28 chaves)
`dadosÓrgãos`, `dadosUnidades`, `dadosFuncaoSubfuncao`, `dadosProgramas`, `dadosAcoes`,
`dadosSecretarias`, `evolucaoMensal`, `comparativoAnual`, `totais`, `treemapData` (categoria
econômica), `modalidadeLicitacao`, `topFornecedores`, `metasExecucao`, `metasODS`,
`rigidezOrcamentaria` (+ totais), `receitaCorrenteLiquida`/`despesaPessoalTotal`/limites LRF +
`evolucaoPessoalRCL`, `despesaCorrenteCapital(+Chart)`, `restosAPagarAging` (+ totais),
`projecaoExecucao`, `benchmarkDespesa`, `eventosRecentes`.

Granularidade comum das tabelas de execução (`dadosÓrgãos`, `dadosUnidades`, `…FuncaoSubfuncao`,
`dadosProgramas`, `dadosAcoes`, `dadosSecretarias`): por dimensão →
`{ atualizada, empenhada, aEmpenhar, pago, aPagar }`.

### `RECEITA_SNAPSHOT` (≈22 chaves)
`receitasProprias`, `receitasEstaduais`, `receitasFederais`, `outrasReceitas`,
`evolucaoMensal`, `comparativoAnual`, `totais{Proprias,Estaduais,Federais,Outras,Gerais}`,
`distribuicaoOrigem`, `topContribuintes`, `alertasReceita`, `eventosReceita`,
`metasArrecadacao`, `inadimplencia` (+ totais), `sazonalidadeData`,
`receitaCorrenteCapital(+Chart)`, `projecaoReceita` (+ total), `benchmarkMunicipios(+Chart)`,
`dadosPorPeriodo`.

Granularidade comum dos itens de receita: por linha →
`{ codigo, nome, prevista, arrecadada, aArrecadar }`.

---

## 3. Fontes — o que o SIM-AM/Elotech entrega

### Estágios da despesa (movimentos, valor + sinal)
Liga ao empenho por `(entidade, exercicio, empenho)`; consolida por procedimento/estágio:

| Estágio | Fonte siscop (raw) | SIM-AM canônico |
|---|---|---|
| Orçado/atualizado (10) | `orcdespesa` ⋈ `orcversaoorcamento` | — (derivado) |
| Empenho (16) | `empenho`, `anulacaoempenho`, `cancelamentorestos` | `Empenho`, `EstornoEmpenho` |
| Liquidação (17) | `liquidacao`, `estornoliquidacao` | `Liquidacao`, `EstornoLiquidacao` |
| Pagamento (18) | `pagamento` ⋈ `ordempagamento_liquidacao` ⋈ `liquidacao` ⋈ `empenho`, `estornopagamento` | `Pagamento`, `EstornoPagamento` |
| Restos a pagar | `fichaempenho` ⋈ `exercicio` ⋈ `empenho` | (saldos) |

**Dimensões de classificação NÃO são colunas** — derivam de `siscop.despesa.programatica` por
`SUBSTRING(pos, tam)` (guiado por `niveismodelodespesa`):

```
órgão(1,2) unidade(1,5) função(6,2) subfunção(8,3) programa(11,4) ação(15,4)
categoria(19,1) grupo(20,1) modalidade(21,2) elemento(23,2) natureza(19,6)
```

→ Isso cobre **diretamente** `dadosÓrgãos/Unidades/FuncaoSubfuncao/Programas/Acoes`,
`treemapData` (categoria econômica) e `despesaCorrenteCapital` (categoria/grupo).

### Receita realizada
`siscop.receita re` ⋈ `realizacaoreceita rr` ⋈ `realizacaoreceitaitem ri` (valor em `ri.valor`),
estágio 26, procedimento por `rr.grupoevento` (261 arrecadação / 262 devolução / 263-264 estornos).
Previsto: `orcreceita` ⋈ `orcreceita_fontetce` (estágio 10). Layout do código de receita por
SUBSTRING: `categoria(1,1) origem(2,1) espécie(3,1) …` → mapeia para
`receitasProprias/Estaduais/Federais/outrasReceitas` por **categoria econômica/origem**.

### Modelo-alvo já identificado no BI do cliente
A seção 6 de [`epico5-elotech-queries.md`](epico5-elotech-queries.md) mostra que o **destino**
já existe como marts ClickHouse no projeto de BI do cliente:
`ctb_reg_despesa_{empenho,liquidacao,pagamento,retencao}`, `orc_reg_despesa_*`, views
`ctb_vue_despesa_executada_<ANO>`, e filtros `ctb_flt_despesa_{orgao,unidade,secretaria,programa,
acao,categoria,grupo,modalidade,elemento,natureza}`. **É exatamente o "fato despesa SIM-AM".**
→ **Esse é o banco que você ofereceu (§7).**

---

## 4. Gap analysis — o coração da pesquisa

Mapeamento seção-do-front → tem fonte? Classifico em **A** (coberto por siscop/execução
orçamentária), **B** (precisa de outra fonte: tributos/RH/licitação), **C** (cross-município),
**D** (computado/meta — sem fonte de ERP).

### Despesa
| Seção do snapshot | Classe | Fonte / observação |
|---|---|---|
| `totais`, `evolucaoMensal`, `comparativoAnual` | **A** | Consolidação de estágios por mês/ano. |
| `dadosÓrgãos/Unidades/FuncaoSubfuncao/Programas/Acoes` | **A** | `programatica` SUBSTRING + estágios. |
| `dadosSecretarias` | **A**\* | Órgão↔secretaria: mapa pode exigir de-para (alguns ERPs usam órgão como secretaria). |
| `treemapData` (categoria econômica), `despesaCorrenteCapital` | **A** | `programatica(19,1)`/(20,1). |
| `rigidezOrcamentaria` (obrigatória×discricionária) | **A**\* | Derivável da natureza, mas a **regra de classificação** precisa ser definida. |
| `restosAPagarAging` | **A** | `siscop.fichaempenho`; **aging por faixa de dias precisa de regra de data**. |
| `modalidadeLicitacao` | **B** | Modalidade está na `programatica(21,2)` (modalidade de **empenho**), mas o painel sugere modalidade de **licitação** → schema **apice** (licitações). Definir qual. |
| `topFornecedores` | **B** | `fato_despesa` **não tem coluna fornecedor**. Precisa `siscop.fornecedor` ⋈ empenho. |
| LRF: `despesaPessoalTotal`, `percentualPessoalRCL`, limites, `evolucaoPessoalRCL` | **B** | Despesa de pessoal = folha → schema **aise** (RH). RCL = receita corrente − deduções. |
| `metasExecucao`, `metasODS` | **D** | Metas/ODS **não vêm de ERP** — cadastro manual ou regra de negócio. |
| `projecaoExecucao` | **D** | Projeção calculada (modelo); não é dado-fonte. |
| `benchmarkDespesa` | **C** | Comparação entre municípios → exige vários IBGEs + indicadores agregados. |
| `eventosRecentes` | **A** | Últimos movimentos (empenho/liquidação/pagamento) ordenados por data. |

### Receita
| Seção do snapshot | Classe | Fonte / observação |
|---|---|---|
| `totais*`, `evolucaoMensal`, `comparativoAnual`, `distribuicaoOrigem` | **A** | Receita realizada + prevista, agregada por origem. |
| `receitasProprias/Estaduais/Federais/outrasReceitas` | **A**\* | Classificação por código de receita; **de-para origem→bucket do painel** a definir. |
| `sazonalidadeData`, `receitaCorrenteCapital` | **A** | Pivot mensal / categoria econômica do código de receita. |
| `eventosReceita` | **A** | Últimas arrecadações/créditos por data. |
| `topContribuintes` | **B** | Contribuinte (CNPJ/CPF) → **tributos (schema aise)**, não siscop orçamentário. |
| `inadimplencia` (lançado×arrecadado por tributo) | **B** | Lançamento vs. arrecadação tributária → **aise** (IPTU/ISS/dívida ativa). |
| `metasArrecadacao` | **D** | Meta — cadastro/regra, sem fonte de ERP. |
| `alertasReceita` | **D** | Computado (desvio previsto×realizado). |
| `projecaoReceita` (+ `totalProjetado`) | **D** | Projeção calculada. |
| `benchmarkMunicipios` (per capita, autonomia…) | **C** | Cross-município + população (IBGE). |
| `dadosPorPeriodo` | **A** | Reagrupamento dos itens A por ano (filtro). |

### Conclusões do gap
- **A (≈60%)**: serve da execução orçamentária siscop → **é o MVP do pipeline**. Já tem alvo
  modelado no BI do cliente (`ctb_*`/`orc_*`).
- **B**: depende de **aise** (RH/tributos) e **apice** (licitações) — exportação ainda pendente
  (HANDOFF: só siscop importado em `raw_4117107`). Bloqueia `topFornecedores`, LRF/pessoal,
  `topContribuintes`, `inadimplencia`, modalidade de licitação.
- **C**: benchmarks precisam de **agregados multi-município** — definir camada `public`/dimensão
  comparativa; não cabe em `mun_<ibge>` isolado.
- **D**: metas, ODS, alertas, projeções **não têm fonte transacional**. Decidir: (a) cadastro
  manual em tabela própria, (b) regra/modelo computado, ou (c) manter mock por ora.

> **`fato_despesa`/`fato_receita` atuais não comportam B**: faltam colunas para fornecedor,
> contribuinte, modalidade de licitação e pessoal. Ou expandimos o fato, ou levamos essas seções
> por **marts/`chave`** dedicados no `mod_*` em vez do fato normalizado.

---

## 5. Estratégia de montagem do `mod_*.dados` — DECISÃO: split por `chave`

O `mod_despesa.dados` é um único JSON com ~28 chaves heterogêneas. **Decisão**: em vez de uma
linha monolítica, dividir o snapshot em **várias linhas por `chave`** (coluna que já existe em
`mod_<slug>` e já está plumbada na rota `?chave=`). Cada `chave` = **unidade de destravamento**,
alinhada ao gap-class (§4): vira real quando *sua fonte* chega; o resto segue no demo. Permite
trabalhar componente a componente sem big-bang e sem quebrar a renderização.

### Layout de `chave`
**Despesa:** `execucao` (totais, evoluçãoMensal, comparativoAnual, órgão/unidade/função/
programa/ação/secretaria, categoria econômica, corrente×capital — **A**), `restos` (**A**),
`eventos` (**A**), `licitacoes` (modalidade — **B**), `fornecedores` (**B**),
`pessoal_lrf` (RCL/pessoal/limites/rigidez — **B**), `benchmark` (**C**), `metas` (metas/ODS/
projeção — **D**).
**Receita:** `execucao` (itens por origem, totais, evolução, sazonalidade, corrente×capital,
distribuição, dadosPorPeriodo — **A**), `eventos` (**A**), `contribuintes` (**B**),
`inadimplencia` (**B**), `benchmark` (**C**), `metas` (metas/alertas/projeção — **D**).
Key-sets **disjuntos** entre `chave`s → o merge é ordem-independente.

### Duas mudanças habilitadoras (não-quebráveis)
- **(A) `lib/data/modules.ts` `getModuloDados`**: sem `chave`, remover `limit 1`, ler **todas** as
  linhas do `(ano)` e fundir `dados` (`Object.assign({}, ...rows)`). Com `chave`, mantém o slice.
- **(B) `components/use-snapshot.ts`**: shallow-merge sobre o fallback —
  `setData({ ...fallback, ...d.dados })`. Seções ainda não produzidas mantêm o demo (não somem).

### Compatibilidade e produção
- A linha atual de seed (`chave=NULL`, snapshot inteiro) continua válida (vira a única linha do
  merge). Pipeline passa a escrever `chave`s específicas; seed migra p/ per-`chave` quando convier.
- **Não** é preciso dividir `lib/demo-*.ts` — ele segue como base do merge (mínimo churn).
- O ETL no ClickHouse (P1) monta **um JSON por `chave`** (agregação → `toJSONString` →
  `postgresql()` em `mun_<ibge>.mod_*`), em vez de um JSON gigante. Seções **D/C** sem fonte
  ficam fora do pipeline (mock via fallback) até virarem cadastro/modelo.

---

## 6. Plano de pipeline em estágios (proposta)

1. **E5.1 — raw siscop completo** ✓ parcial. `import_raw.sh 4117107` (siscop ok; falta aise/apice).
2. **E5.2 — dimensões de classificação (sim)**: parse de `programatica` → tabelas/views
   `sim_<ibge>` de órgão, unidade, função, subfunção, programa, ação, categoria, natureza, fonte.
3. **E5.3 — fato execução despesa (A)**: consolidar estágios 10/16/17/18 por
   `(entidade, ano, mes, dimensões)` com `atualizada/empenhada/liquidada/pago/aEmpenhar/aPagar`.
4. **E5.4 — fato receita (A)**: realizada (261-264) + prevista (estágio 10) por código/origem/mês.
5. **E5.5 — montar `mod_despesa`/`mod_receita` (A)**: agregações → JSON no shape do snapshot
   (caminho P1/P3) → sync `postgresql()` p/ `mun_<ibge>`. **MVP entregável aqui.**
6. **E5.6 — sync `fato_*`**: idempotente (`DELETE WHERE ano=` + insert / staging+swap).
7. **E5.7 — seções B**: ao chegar aise/apice — fornecedores, pessoal/LRF, contribuintes,
   inadimplência, modalidade de licitação.
8. **E5.8 — seções C/D**: benchmark multi-município (camada comparativa) + metas/ODS/projeções
   (cadastro ou modelo).

Cada estágio deve ter **validação de invariantes** (ex.: `Σ estágios = totais`,
`empenhada − pago = aPagar`) — espelha o gate de snapshot já existente no CI.

---

## 7. Banco de BI do cliente — sim, ajuda muito (o que peço)

A oferta casa exatamente com o que falta. O doc `epico5-elotech-queries.md` já capturou o
**FROM/JOIN** das queries-fonte, mas o **destino consolidado** (marts `ctb_*`/`orc_*`/`fin_*`) só
está descrito em prosa. Com acesso ao banco de BI eu consigo **fechar o transform com precisão** em
vez de inferir. Especificamente, seria útil:

1. **DDL/colunas** das tabelas-alvo: `ctb_reg_despesa_{empenho,liquidacao,pagamento,retencao}`,
   `ctb_reg_despesa_empenho_detalhe`, `orc_reg_despesa_{orcada,suplementada,reduzida}`,
   e os filtros `ctb_flt_despesa_*` / `ctb_flt_fonte_recursos` / `ctb_flt_fornecedor`.
2. As **views consolidadas** `ctb_vue_despesa_executada_<ANO>` (pivot por procedimento/estágio) —
   é literalmente o nosso `fato_despesa`.
3. O equivalente de **receita** (realizada + prevista) e o de **saldo bancário/financeiro**.
4. Para as seções **B**: as queries de **fornecedor**, **pessoal/folha (RCL × limite LRF)**,
   **contribuintes** e **inadimplência tributária** — confirmam de qual schema (aise) sair.
5. Regras de negócio embutidas: **de-para órgão→secretaria**, classificação
   **obrigatória×discricionária** (rigidez), faixas de **aging** de restos a pagar, buckets de
   **origem de receita** do painel.

**Acesso ideal**: read-only + `\d`/`information_schema` (ou export de DDL) e ~5-10 linhas de
amostra por tabela-chave. Se preferir, pode colar aqui só os `CREATE`/queries — já destrava.
Pode dar acesso via MCP (Postgres/ClickHouse), credencial read-only, ou dump de schema.

### 7.1 Validado (2026-06-10) — o que o BI antigo realmente é
Acesso recebido e testado (creds em `docs/ACESSOS.local.md` §9–11). Correção da suposição: o BI **não
é ClickHouse** — é **Adianti Reports** (PHP) sobre **dois Postgres** (`portal_novalondrina`,
`portal_consamu` em 52.67.135.147; user `reports` read-only; PG 12.22; 156 tabelas; schema `public`).
Arquivos da ferramenta na VPS (`ubuntu@52.67.135.147`, chave `~/.ssh/analyticsbi.pem`) em
`/var/www/html/<tenant>` (+ `/structures` = XMLs de dashboard "Contábil").

**A mina de ouro é a tabela `import_query`** (127 linhas): catálogo de ETLs. Cada linha tem
`query_source` (o **SQL real**), `table_name` (alvo), `columns` (schema de saída) e `connector`:
- `connector='eloweb'` (101) → SQL lê **raw Elotech** (`siscop.*`) → escreve `ctb_reg_*`/`ctb_flt_*`.
  **É o nosso transform `raw_<ibge>` → `sim_<ibge>`** (confirma §6 / `epico5-elotech-queries.md`).
- `connector='warehouse'` (25) → SQL lê os `ctb_*` consolidados → monta `ctb_vue_despesa_executada_<ANO>`.
  **É o nosso `sim` → fato/mart.**

Confirmado que **todas** as tabelas citadas em §3/§6 existem como entradas (`ctb_reg_despesa_{empenho,
empenho_detalhe,liquidacao,pagamento,retencao,restos}`(+`_old`), `ctb_reg_receita_realizada_fonte`,
`ctb_flt_despesa_*`, `ctb_flt_receita_*`, `ctb_flt_{entidades,estagio_procedimento,fonte_recursos,
fornecedor}`, `ctb_vue_despesa_executada_2012..2021`). Exemplo lido: `ctb_reg_despesa_empenho.query_source`
parte de `siscop.empenho` com `cdEstagio=16`/`cdProcedimento=161`.

**Próximo:** extrair os `query_source` de despesa+receita (`folder IN ('Contabilidade','Planejamento',
'Financeiro')`) para `docs/` como referência do transform → portar no ETL ClickHouse, chave a chave (§4/§5).
Ver memória [[bi-antigo-import-query]].

---

## 8. Próximos passos imediatos

- [x] **Plumbing do split por `chave` (não-quebrável)** — merge em `getModuloDados`
  ([lib/data/modules.ts](../lib/data/modules.ts)) + shallow-merge sobre o fallback em
  `useSnapshot` ([components/use-snapshot.ts](../components/use-snapshot.ts)). Verificado:
  typecheck/lint verdes; smoke test contra Postgres real (33 keys, chave parcial sobrepõe só
  `totais`, mock preservado); e no preview (card "Despesa Empenhada" → R$ 777.0M com a chave
  `execucao` parcial, demais seções no demo).
- [ ] Validar com você o caminho de montagem do `mod_*` (P1/P3) — §5.
- [ ] Receber acesso/queries do BI (§7) e cruzar com `fato_*` atual.
- [ ] E5.2/E5.3: prototipar dimensões + fato despesa (A) sobre `raw_4117107.siscop_*` reais.
- [ ] Decidir tratamento das seções **D** (metas/ODS/projeções): cadastro vs. modelo vs. mock.
- [ ] Definir camada de **benchmark** (C) antes de prometer no front.
