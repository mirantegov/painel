# Exportador — integração Elotech (eloweb legado)

> Como exportar dados do ERP **Elotech eloweb** (legado) com o exportador raw (`exporter/`).
> Modelo novo (oxy) fica para depois. Issue: [#83](https://github.com/mirantegov/painel/issues/83).

## Modelo descoberto (dump schema-only)

- Banco **Postgres** único; **11 schemas por módulo** Elotech (`aise, alvara, analytics, apice, conversao, eloarquivo, image, protocolo, sigeloam, siscop, unico`), ~6194 tabelas. **NÃO é um schema por cliente.**
- O **contábil** (despesa/receita) está no schema **`aise`**, tabelas prefixo `cont*`.
- **Cliente/ente = coluna `entidade`** (numeric, código interno — **não** é IBGE). Dimensão em `aise.entidade` (`entidade, nome, cnpj, identificacaotce, codigo`).
- **Ano = coluna `exercicio`** (numeric). Não há coluna `ano`.
- Logo, exportar 1 cliente = **filtrar `entidade` (+ `exercicio`)** — via `filters:` no manifest.

Tabelas-chave (em `aise`): `contempenho`, `contitemempenho`, `contliquidacao`, `contpagamento`, `contfichaempenho` (despesa); `contreceita`, `contrealizacaoreceita`, `contfichareceita` (receita). Valores em `numeric(15,2)`, datas em `date`.

O exportador é **raw**: dumpa essas tabelas fielmente → Parquet → MinIO. **Sem** mapear p/ SIM-AM (isso é o ClickHouse, Épico 5). `--municipio <ibge>` = só o **path no MinIO**; `--schema aise` = schema lido; `filters.entidade` = recorte do cliente.

## Passo 1 — Introspecção (descobrir schema/tabelas/colunas)

Rode contra o banco Elotech (read-only) e cole os resultados — daí montamos o manifest.

```sql
-- 1) Schemas de clientes (exclui schemas de sistema)
select schema_name
from information_schema.schemata
where schema_name not in ('pg_catalog','information_schema','public','pg_toast')
order by 1;

-- 2) Tabelas de despesa/receita num schema de cliente (troque <schema>)
select table_name
from information_schema.tables
where table_schema = '<schema>'
  and table_type = 'BASE TABLE'
  and (table_name ilike '%empenho%'
    or table_name ilike '%liquid%'
    or table_name ilike '%pagamento%'
    or table_name ilike '%receita%'
    or table_name ilike '%arrecad%'
    or table_name ilike '%orcad%')
order by 1;

-- 3) Colunas de uma tabela (troque <schema>/<tabela>) — nome, tipo, nullability
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = '<schema>' and table_name = '<tabela>'
order by ordinal_position;

-- 4) Como o ano/exercício é identificado + volume (troque <schema>/<tabela>/<col_ano>)
select <col_ano> as ano, count(*) linhas
from "<schema>"."<tabela>"
group by 1 order by 1;
```

Cole: (1) lista de schemas (ou o schema do cliente-alvo), (2) tabelas de empenho/liquidação/pagamento/receita, (3) colunas das 1–2 tabelas que vamos começar (ex.: empenho).

## Passo 2 — Manifest do Elotech

Pronto em [`exporter/manifests/elotech-eloweb.yaml`](../exporter/manifests/elotech-eloweb.yaml): lista as tabelas `cont*` de despesa/receita + a dimensão `entidade`, cada uma com `filters` recortando o cliente:

```yaml
- source: contempenho
  scope: tenant        # lê de --schema (aise)
  filters: { entidade: __ENTIDADE__, exercicio: __EXERCICIO__ }
```

> **Filtros** (`filters:`) geram `WHERE col = $ AND …` **parametrizado** (valores nunca interpolados; colunas validadas). É assim que recortamos 1 cliente, já que no eloweb o cliente é a coluna `entidade` (não um schema). Não usamos `partition_by_ano` (a coluna de ano é `exercicio`, não `ano`); a partição por ano fica no ClickHouse.

**Antes de rodar:** substitua `__ENTIDADE__` (código do cliente em `aise.entidade`) e `__EXERCICIO__` (ano) no manifest.

## Passo 3 — Rodar

```bash
# MinIO no ar + ngrok (single tunnel) p/ acesso externo, se for do PC do cliente
cd exporter
DATABASE_URL="postgresql://USER:SENHA@HOST_ELOTECH:5432/BANCO" \
go run . --municipio <ibge> --ano <exercicio> --schema aise \
         --manifest manifests/elotech-eloweb.yaml

# objetos no MinIO: <ibge>/<tabela>/part-0.parquet
mc ls -r local/mirante-parquet/<ibge>/
```

## Próximo

A normalização **eloweb → SIM-AM** acontece no **ClickHouse (Épico 5)**: lê os Parquet raw do MinIO via `s3()` e transforma para o canônico SIM-AM. O exportador só entrega o raw fiel.
