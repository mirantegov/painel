# Gerador de manifests do exportador (`gen_manifests.py`)

Documentação da ferramenta [`exporter/tools/gen_manifests.py`](../exporter/tools/gen_manifests.py),
que (re)gera, a partir dos **DDLs reais** do ERP Elotech, os blocos
`scope` / `exclude_columns` / `filters` dos manifests do exportador
(`exporter/manifests/elotech-*.yaml`).

> Resumo de uma linha: transforma decisões antes feitas à mão (excluir blobs,
> montar filtros conferindo coluna a coluna) em algo **reproduzível e verificável**.

---

## 1. Por que existe

O exportador lê tabelas do Postgres do ERP e sobe Parquet pro MinIO. Cada tabela
no manifest pode ter:

- **`filters`** — recorte por `entidade` e/ou ano, para não dumpar dados demais.
  ⚠️ Um filtro com **coluna que não existe na tabela ABORTA o run inteiro** (vira
  erro SQL). Então cada filtro precisa ser conferido contra a coluna real.
- **`exclude_columns`** — colunas `bytea` (blobs: editais, brasões, anexos, atas…)
  que **não** exportamos, porque só pesam o dump/import e não são usadas.

Fazer isso à mão para ~230 tabelas (siscop + aise + apice) é trabalhoso e frágil.
O gerador deriva tudo dos DDLs (saída de `pg_dump`), de forma determinística.

---

## 2. O que ele faz (e o que NÃO faz)

**Faz:**

- Lê os DDLs (`CREATE TABLE …`) do dump e, para cada tabela, conhece as colunas e tipos.
- **`exclude_columns`** = todas as colunas `bytea` da tabela (em **todos** os schemas).
- **`filters`** = `entidade` [+ ano], derivado conforme a **política** do schema (ver §4).
- Reescreve apenas o **bloco de propriedades** de cada entrada (`scope` / `exclude_columns` / `filters`).

**NÃO faz (de propósito, por segurança):**

- Não inventa nem remove tabelas — a **lista de `source:`** vem do manifest existente.
- Não mexe no **cabeçalho** nem nos **comentários** (de seção ou inline) do manifest.
- Se uma `source:` não for tabela-base no dump (ex.: uma **view**), ele **avisa**
  (`WARN`) e mantém a entrada **intacta** — nunca apaga.

---

## 3. Como deriva os filtros

Só faz sentido filtrar por colunas que existem. A regra (quando a política é `derive`):

1. Se a tabela tem coluna **`entidade`** → entra `entidade: [__ENTIDADES__]`.
2. Se tem uma coluna de **ano**, entra também `+ <ano>: [__EXERCICIOS__]`. A coluna
   de ano é escolhida por **prioridade**:

   ```
   anocompetencia  →  exercicio  →  exerciciopagamento  →  exerciciobloqueto
   ```
3. Se não tem `entidade` → **sem filtro** (dump full); o recorte, se preciso, é no ETL.

`__ENTIDADES__` e `__EXERCICIOS__` são **placeholders** resolvidos no run do
exportador via `--var` (ex.: `--var ENTIDADES="1, 2, 3"`). O **valor** dos anos é
escolhido na hora de rodar — é assim que o APICE usa piso 2000 sem mudar o manifest.

---

## 4. Política por schema

Definida no dict **`POLICY`** no topo do script — é o único lugar a editar para
mudar o comportamento de um schema:

| Schema | Política | Efeito | Motivo |
|---|---|---|---|
| `siscop` | `keep`   | mantém os filtros que já estão no manifest | curados à mão (ex.: `siscop.exercicio` **não** filtra ano de propósito) |
| `aise`   | `none`   | remove todos os filtros (dump **full**) | Tributos + RH: recorte fica no ETL |
| `apice`  | `derive` | `entidade` + `exercicio` derivados | licitações/contratos (piso de ano via `--var`) |

`exclude_columns` (bytea) é **sempre** derivado, independente da política de filtro.

Para mudar uma regra (ex.: voltar a filtrar o `aise`): edite `POLICY["aise"] = "derive"`
e rode `make manifests-gen`.

---

## 5. Uso

O dump (`tmp/eloweb.dump`) é **gitignored** — informe o caminho com `--dump`
(ou `DUMP=` nos targets do make). A partir de `exporter/`:

```bash
# CONFERIR (não escreve): mostra o diff e sai com código 1 se houver drift.
make manifests-check DUMP=../tmp/eloweb.dump
# equivalente:
python3 tools/gen_manifests.py --dump ../tmp/eloweb.dump --check

# APLICAR: escreve as mudanças nos manifests.
make manifests-gen DUMP=../tmp/eloweb.dump
# equivalente:
python3 tools/gen_manifests.py --dump ../tmp/eloweb.dump --write

# Um manifest específico (repetível):
python3 tools/gen_manifests.py --dump ../tmp/eloweb.dump --check \
  --manifest manifests/elotech-aise.yaml
```

### Flags

| Flag | Default | Descrição |
|---|---|---|
| `--dump <path>` | `tmp/eloweb.dump` | caminho do `pg_dump` com os DDLs |
| `--manifest <path>` | `manifests/elotech-*.yaml` | manifest específico (pode repetir) |
| `--check` | (padrão) | mostra diff; **exit 1** se houver mudança |
| `--write` | — | aplica as mudanças nos arquivos |

---

## 6. Garantias / comportamento

- **Idempotente**: rodar `--check` no estado correto do repositório **não** acusa
  diferença (os 3 manifests batem com o que o gerador produz).
- **CI-friendly**: `--check` sai com código 1 em drift — dá para plugar num hook/CI
  para garantir que ninguém editou um filtro inválido à mão.
- **Seguro**: nunca remove tabelas; views viram `WARN` (entrada preservada).

---

## 7. Gerar o dump dos DDLs

O gerador precisa só do **schema** (não dos dados). Para extrair do Postgres do ERP:

```bash
pg_dump --schema-only --no-owner --no-privileges \
  -h <host> -U <user> -d <eloweb> > eloweb.dump
```

Coloque em `tmp/eloweb.dump` (gitignored) e aponte com `--dump`/`DUMP=`.

---

## 8. Limitações / quando intervir à mão

- A escolha da coluna de ano é por prioridade fixa (§3). Se uma tabela tiver uma
  coluna de ano "melhor" fora dessa lista, ajuste `YEAR_PRIORITY` no script.
- Tabelas sem `entidade` mas grandes (ex.: `tribpagamentodebito`) ficam **full** —
  não há coluna de recorte direta; estreite no ETL via join se necessário.
- `siscop` é `keep` justamente porque tem exceções curadas; se um dia quiser
  automatizá-lo, troque para `derive` e **revise o diff** antes de aplicar.

---

## Referências

- Script: [`exporter/tools/gen_manifests.py`](../exporter/tools/gen_manifests.py) · README curto: [`exporter/tools/README.md`](../exporter/tools/README.md)
- Manifests: [`exporter/manifests/`](../exporter/manifests/)
- Coleta das tabelas: [`coleta-rh-tabelas.md`](coleta-rh-tabelas.md) · [`coleta-tributos-tabelas.md`](coleta-tributos-tabelas.md) · [`coleta-apice-tabelas.md`](coleta-apice-tabelas.md)
- Runbook do exportador: [`runbook-exportador.md`](runbook-exportador.md)
