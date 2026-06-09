#!/usr/bin/env python3
"""Parser do layout SIM-AM 2026 (texto extraído do PDF do TCE-PR) -> tables.json.

Extrai dois tipos de tabela:
  - layout  : `TABELA: <Nome>` + tabela de campos (Tamanho/Tipo/Formato/Campo/Obrigatório)
  - lookup  : `Nome do Arquivo: <Nome>` + dados inline (código + descrição)

Nomes de campo longos quebram em mais de uma linha dentro da coluna "Campo";
a extração é baseada em offset de coluna (lido do cabeçalho) para reconstruí-los.
"""
import json
import re
import sys

TIPOS = r"(?:Numérico|Numerico|Caractere|Data|Valor|Decimal|Hora)"

FOOTER_PAT = re.compile(
    r"TRIBUNAL DE CONTAS DO ESTADO|COORDENADORIA DE SISTEMAS|"
    r"SISTEMA DE INFORMAÇÕES MUNICIPAIS|versão 1\.0a/2026|^\s*\d{1,3}\s*$"
)

MODULES = [
    "TABELAS CADASTRAIS",
    "MÓDULO PLANEJAMENTO E ORÇAMENTO",
    "MÓDULO CONTÁBIL",
    "MÓDULO TESOURARIA",
    "MÓDULO LICITAÇÕES",
    "MÓDULO CONTRATOS",
    "MÓDULO PATRIMÔNIO",
    "MÓDULO CONTROLE INTERNO",
    "MÓDULO TRIBUTÁRIO",
    "MÓDULO DE OBRAS PÚBLICAS",
]

# Cabeçalho da tabela de campos: "...Tipo  Formato  Campo  Descrição  Obrigatório"
HEADER_RE = re.compile(r"Tamanho\s+Tipo\s+Formato\s+Campo\s+Descrição")
# Âncora de campo (linha inteira): <tamanho> <Tipo> <Formato> <nomeCampo camelCase>
ANCHOR_RE = re.compile(
    r"(?<!\d)(\d{1,4})\s+(" + TIPOS + r")\s+([0-9A-Za-z()V]+)\s+([a-z][A-Za-z0-9]{1,})\b"
)
OBRIG_RE = re.compile(r"\b(SIM|NÃO|NAO)\b")


def clean(lines):
    """Remove rodapés/cabeçalhos de página para reconectar tabelas multi-página."""
    return [ln for ln in lines if not FOOTER_PAT.search(ln)]


FRAG_RE = re.compile(r"^[A-Za-z0-9]+$")


def _median(xs):
    xs = sorted(xs)
    return xs[len(xs) // 2]


def parse_layout_fields(block):
    """Extrai campos remontando o nome a partir do offset de coluna dos próprios dados.

    1) Detecta âncoras (linha inteira): <tamanho> <Tipo> <Formato> <nome>.
    2) Deriva name_col/desc_col da mediana das posições nas âncoras (o cabeçalho
       do PDF não alinha com os dados, então usamos os dados).
    3) Remonta nomes truncados juntando fragmentos na coluna do nome nas linhas
       seguintes (a largura da célula corta nomes longos e joga o resto abaixo).
    """
    # localiza início (após 1º cabeçalho da field-table)
    start = None
    for i, ln in enumerate(block):
        if HEADER_RE.search(ln):
            start = i + 1
            break
    if start is None:
        return []
    rows = block[start:]

    anchors = []  # (idx, size, tipo, formato, name0, name_end, line)
    for i, ln in enumerate(rows):
        if HEADER_RE.search(ln):
            continue
        m = ANCHOR_RE.search(ln)
        if not m:
            continue
        anchors.append((i, int(m.group(1)), m.group(2), m.group(3),
                        m.start(4), m.end(4), m.group(4)))
    if not anchors:
        return []

    name_col = _median([a[4] for a in anchors])
    SIG_RE = re.compile(r"^[A-Za-z][a-z][A-Z0-9]")  # assinatura camelCase de nome

    def tok_at(ln):
        """Token alinhado ao name_col seguido de 2+ espaços/EOL (célula do nome)."""
        seg = ln[max(0, name_col - 2):]
        m = re.match(r"(\s{0,3})([A-Za-z0-9]+)(\s{2,}|\s*$)", seg)
        return m.group(2) if m else ""

    fields = []
    anchor_idx = {a[0]: a for a in anchors}
    cur = None

    def flush():
        nonlocal cur
        if cur:
            fields.append(cur)
        cur = None

    for i, ln in enumerate(rows):
        if HEADER_RE.search(ln):
            continue
        if i in anchor_idx:
            flush()
            a = anchor_idx[i]
            o = OBRIG_RE.search(ln[a[5]:])
            cur = {
                "size": a[1],
                "tipo": a[2].replace("Numerico", "Numérico"),
                "formato": a[3],
                "name": a[6],
                "obrig": (o.group(1) if o else ""),
            }
        elif cur is not None:
            tok = tok_at(ln)
            if tok and SIG_RE.match(tok) and not KNOWN_PREFIX.match(tok.lower()):
                DROPPED_TOKENS.append(tok)  # visibilidade: token camelCase sem prefixo SIM-AM
            if tok and SIG_RE.match(tok) and KNOWN_PREFIX.match(tok.lower()):
                # campo standalone sem colunas size/tipo/formato (célula vazia);
                # exige prefixo SIM-AM conhecido p/ não capturar palavra de descrição
                flush()
                ob = OBRIG_RE.search(ln)
                cur = {
                    "size": 0, "tipo": "", "formato": "",
                    "name": tok, "obrig": (ob.group(1) if ob else ""),
                }
            elif tok and not re.search(r"[A-Z]{2}", tok):
                # fragmento de continuação do nome truncado (rejeita ALLCAPS,
                # que é descrição/sub-título vazando, nunca parte de camelCase)
                cur["name"] += tok
                if not cur["obrig"]:
                    ob = OBRIG_RE.search(ln)
                    if ob:
                        cur["obrig"] = ob.group(1)
            elif not cur["obrig"]:
                ob = OBRIG_RE.search(ln)
                if ob:
                    cur["obrig"] = ob.group(1)
    flush()
    for f in fields:
        f["obrig"] = "SIM" if f["obrig"] == "SIM" else "NÃO"
        nm = f["name"]
        # campos SIM-AM sempre iniciam minúsculo (corrige SgUF -> sgUF)
        if len(nm) >= 2 and nm[0].isupper() and nm[1].islower():
            nm = nm[0].lower() + nm[1:]
        f["name"] = trim_doubled_tail(nm)
    return fields


def trim_doubled_tail(nm):
    """Remove cauda vazada da PT-label quando duplica o fim do nome.

    Ex.: idOrigemEmpenho + 'penho' -> a parte 'penho' é sufixo de 'idOrigemEmpenho',
    então o nome correto é 'idOrigemEmpenho'. Só corta se A.endswith(B) (case-insens),
    len(B)>=3, e A é um nome plausível (>=4) — evita falsos positivos.
    """
    low = nm.lower()
    # overlap mínimo de 4 chars: todos os vazamentos reais observados têm >=5
    # ('penho','ersao','Estorno'…); 4 reduz a superfície de falso-positivo.
    for k in range(len(nm) - 4, 3, -1):  # B = nm[k:], A = nm[:k] (B do menor p/ maior)
        b = low[k:]
        a = low[:k]
        if len(b) >= 4 and a.endswith(b):
            return nm[:k]
        # tolera 1 char de junção vazado (ex.: '...Estorno' + 'lEstorno')
        if len(b) >= 5 and a.endswith(b[1:]):
            return nm[:k]
    return nm


KNOWN_PREFIX = re.compile(
    r"^(id|cd|ds|nm|fl|tp|nr|sg|dt|vl|qt|pc|vr|cu|hr|in|co|nu|qd|ic|ap|sq|ba|na)"
)
DROPPED_TOKENS = []  # tokens camelCase descartados por não terem prefixo SIM-AM


def parse_lookup(block):
    """Extrai cabeçalho (nomes de campo camelCase) + linhas de dados de um lookup."""
    # 1ª linha não-vazia após 'Nome do Arquivo:' com >=2 tokens camelCase = cabeçalho
    header_idx = None
    cols = []
    for i, ln in enumerate(block):
        toks = re.findall(r"[a-z][A-Za-z0-9]+", ln)
        # cabeçalho típico: tokens começando com id/cd/ds/nm/fl/tp/nr/dt/vl/sg
        kw = [t for t in toks if re.match(r"(id|cd|ds|nm|fl|tp|nr|dt|vl|sg|qt|pc)[A-Z]", t)]
        if len(kw) >= 2 and ln.strip() and not HEADER_RE.search(ln):
            header_idx = i
            cols = kw
            break
    if header_idx is None:
        return [], []
    data = []
    for ln in block[header_idx + 1 :]:
        s = ln.strip()
        if not s:
            continue
        # quebra por 2+ espaços
        parts = re.split(r"\s{2,}", s)
        parts = [p for p in parts if p != ""]
        if not parts:
            continue
        # linha de dados começa com um código (número ou token curto)
        if re.match(r"^[-0-9]", parts[0]) or re.match(r"^[A-Z]?\d", parts[0]):
            row = parts[:len(cols)]
            data.append(row)
        elif data:
            # continuação da descrição da última linha
            data[-1][-1] = data[-1][-1] + " " + s
    return cols, data


def main(path):
    raw = open(path, encoding="utf-8").read().splitlines()
    # índices das marcações de tabela na versão *com* footers (p/ delimitar blocos)
    module = None
    tables = []

    # pré-processa: lista de (idx, kind, name)
    marks = []
    for i, ln in enumerate(raw):
        s = ln.strip()
        if s in MODULES or (s.startswith("MÓDULO ") and "...." not in s):
            marks.append((i, "module", s))
        m = re.match(r"\s*TABELA:\s*(\S+)", ln)
        if m:
            marks.append((i, "layout", m.group(1)))
        m = re.match(r".*Nome do Arquivo:\s*(\S+)", ln)
        if m:
            marks.append((i, "lookup", m.group(1)))

    for j, (idx, kind, name) in enumerate(marks):
        if kind == "module":
            module = name
            continue
        end = marks[j + 1][0] if j + 1 < len(marks) else len(raw)
        block = clean(raw[idx:end])
        # título da seção: última linha ALLCAPS antes do TABELA/Nome
        section = ""
        for k in range(idx - 1, max(0, idx - 8), -1):
            t = raw[k].strip()
            if t and t.upper() == t and len(t) > 4 and "...." not in t and not FOOTER_PAT.search(t):
                section = t
                break
        if kind == "layout":
            fields = parse_layout_fields(block)
            if fields:
                tables.append({
                    "module": module, "kind": "layout", "table": name,
                    "section": section, "fields": fields,
                })
        else:
            cols, data = parse_lookup(block)
            if cols:
                tables.append({
                    "module": module, "kind": "lookup", "table": name,
                    "section": section, "columns": cols, "data": data,
                })

    json.dump(tables, sys.stdout, ensure_ascii=False, indent=1)
    print(f"\n# {len(tables)} tabelas", file=sys.stderr)
    lay = sum(1 for t in tables if t["kind"] == "layout")
    look = sum(1 for t in tables if t["kind"] == "lookup")
    print(f"# layout={lay} lookup={look}", file=sys.stderr)
    if DROPPED_TOKENS:
        uniq = sorted(set(DROPPED_TOKENS))
        print(f"# tokens standalone descartados (sem prefixo SIM-AM): "
              f"{len(uniq)} -> {uniq[:20]}", file=sys.stderr)


if __name__ == "__main__":
    main(sys.argv[1])
