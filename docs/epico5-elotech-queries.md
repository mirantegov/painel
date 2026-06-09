# Elotech eloweb — queries de referência (base do transform do Épico 5)

> Queries prontas do cliente (outro projeto) que mostram **como derivar** dados de
> negócio a partir do raw eloweb. **NÃO** vão no exportador (que é raw) — viram o
> **transform no ClickHouse (Épico 5)**: raw eloweb → canônico SIM-AM.
>
> Para o exportador (Épico 4), o que importa é o **FROM/JOIN**: as tabelas-fonte
> que precisam estar no MinIO. Já refletidas em `exporter/manifests/elotech-eloweb.yaml`.

## Convenções observadas

- Cliente/ente = coluna **`entidade`** (numeric). Dimensão: `siscop.entidade` / `aise.entidade`
  (`entidade, nome, cnpj, identificacaotce, tipoentidade, codigo`).
- Ano = **`exercicio`**.
- **`identificacaotce`** = identificador do ente no TCE.
- **`tipoentidade`** (char): `E`=Executivo→1, `L`=Legislativo→2, `R`=RPPS→3, `A`=Autarquia→4, else 9.
- **Órgão/unidade NÃO são colunas** — derivam de `programatica` por `SUBSTRING(posicao, tamanho)`
  guiado por `siscop.niveismodelodespesa` (junção por `modelodespesa`/`tipo`/`ordem`,
  filtrando o nível desejado por `nivellei`, ex.: `'O'` = órgão).

## 1) Cadastro de órgãos

**Tabelas-fonte (→ manifest):** `siscop.despesa`, `siscop.niveismodelodespesa`, `siscop.entidade`.

**Lógica (→ Épico 5):** órgão = `SUBSTRING(despesa.programatica, niveis.posicao, niveis.tamanho)` no nível `nivellei='O'`, `DISTINCT` por (entidade, exercicio, código), `exercicio >= 2013`. Saída: `identidade(=identificacaotce)`, `nrano(=exercicio)`, `cdorgao`, `nmorgao`, `dsorgao(código - descrição)`, `cdEntidade`, `idtpentidade`/`cdtpentidade`.

```sql
-- (íntegra fornecida pelo cliente)
SELECT
    entidade.identificacaotce AS "identidade",
    despesa.exercicio         AS "nrano",
    despesa.codigo            AS "cdorgao",
    despesa.descricao         AS "nmorgao",
    concat(despesa.codigo, ' - ', despesa.descricao) AS "dsorgao",
    despesa.entidade          AS "cdEntidade",
    CASE WHEN entidade.tipoentidade = 'E' THEN 1::INT
         WHEN entidade.tipoentidade = 'L' THEN 2::INT
         WHEN entidade.tipoentidade = 'R' THEN 3::INT
         WHEN entidade.tipoentidade = 'A' THEN 4::INT
         ELSE 9::INT END      AS "idtpentidade",
    entidade.tipoentidade     AS "cdtpentidade"
FROM
    (SELECT DISTINCT D.ENTIDADE, D.EXERCICIO, UPPER(D.DESCRICAO) AS DESCRICAO,
            CAST(SUBSTRING(D.PROGRAMATICA, N.POSICAO::INTEGER, N.TAMANHO::INTEGER) AS VARCHAR(2)) AS codigo
       FROM SISCOP.DESPESA D, SISCOP.NIVEISMODELODESPESA N
      WHERE D.MODELODESPESA = N.MODELODESPESA AND D.TIPO = N.TIPO AND
            D.NIVEL = N.ORDEM AND N.NIVELLEI = 'O' AND D.EXERCICIO >= 2013) despesa
    LEFT JOIN siscop.entidade entidade ON entidade.entidade = despesa.entidade
ORDER BY despesa.entidade, despesa.exercicio DESC, despesa.codigo;
```

<!-- Próximas queries do cliente entram abaixo (empenho, liquidação, pagamento, receita, …) -->
