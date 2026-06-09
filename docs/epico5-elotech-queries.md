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

<!-- Próximas queries (empenho, liquidação, pagamento, receita realizada, …) entram abaixo.
     Tabelas siscop candidatas no dump: empenho, emliquidacao, diarioarrecadacao. -->
