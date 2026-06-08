# Exportador — integração Elotech (eloweb legado)

> Como exportar dados do ERP **Elotech eloweb** (legado) com o exportador raw (`exporter/`).
> Modelo novo (oxy) fica para depois. Issue: [#83](https://github.com/mirantegov/painel/issues/83).

## Premissas (confirmar na introspecção)

- Banco **Postgres** único com **todos os clientes juntos**, **um schema por cliente** (eloweb).
- O exportador é **raw**: dumpa as tabelas nativas do Elotech fielmente → Parquet → MinIO. **Sem** mapear p/ SIM-AM aqui (isso é o ClickHouse, Épico 5).
- `--municipio <ibge>` define o **path no MinIO**; `--schema <schema_do_cliente>` define o **schema físico** lido. Os dois são independentes.

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

A partir da introspecção, criamos `exporter/manifests/elotech-eloweb.yaml` listando as tabelas nativas:

```yaml
bucket: mirante-parquet
tables:
  - source: <tabela_empenho>      # ex.: nome real do eloweb
    scope: tenant
    # partition_by_ano: true      # só se a coluna de ano se chamar exatamente "ano"
    # columns: [...]              # opcional; omitido = todas (raw fiel)
```

> `partition_by_ano` filtra `WHERE ano = $ano` — só funciona se a coluna for **`ano`**. No Elotech costuma ser `exercicio`/`cod_exercicio`/data; nesse caso **não** use `partition_by_ano` (dumpa a tabela inteira), e a partição por ano fica no ClickHouse. (Filtro por coluna de ano configurável é melhoria futura.)

## Passo 3 — Rodar

```bash
# MinIO no ar + ngrok (single tunnel) p/ acesso externo, se for do PC do cliente
cd exporter
DATABASE_URL="postgresql://USER:SENHA@HOST_ELOTECH:5432/BANCO" \
go run . --municipio <ibge> --schema <schema_cliente> --manifest manifests/elotech-eloweb.yaml

# objetos no MinIO: <ibge>/<tabela>/part-0.parquet
mc ls -r local/mirante-parquet/<ibge>/
```

## Próximo

A normalização **eloweb → SIM-AM** acontece no **ClickHouse (Épico 5)**: lê os Parquet raw do MinIO via `s3()` e transforma para o canônico SIM-AM. O exportador só entrega o raw fiel.
