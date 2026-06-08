-- Fatos financeiros: despesa e receita.
-- Chave de hierarquia conforme especificação do produto.
-- Em alguns clientes orgao=secretaria, em outros unidade=secretaria → manter os três.

-- ── fato_despesa ─────────────────────────────────────────────────
-- Chave: municipio, entidade, ano, mes, data, lancamento, programatica, orgao, unidade, secretaria
create table if not exists public.fato_despesa (
  id                 bigint generated always as identity primary key,
  municipio_id_ibge  char(7)  not null references public.dim_municipio(id_ibge) on delete cascade,
  entidade_id        uuid     not null references public.dim_entidade(id) on delete cascade,
  ano                smallint not null,
  mes                smallint not null check (mes between 1 and 12),
  data               date,
  lancamento         text,
  programatica       text,
  orgao              text,
  unidade            text,
  secretaria         text,
  -- classificações descritivas (reproduzem os recortes do dashboard)
  funcao             text,
  subfuncao          text,
  programa           text,
  acao               text,
  fonte_recurso      text,
  -- valores (BRL)
  valor_atualizada   numeric(18,2) not null default 0,
  valor_empenhada    numeric(18,2) not null default 0,
  valor_liquidada    numeric(18,2) not null default 0,
  valor_pago         numeric(18,2) not null default 0,
  valor_a_empenhar   numeric(18,2) not null default 0,
  valor_a_pagar      numeric(18,2) not null default 0,
  criado_em          timestamptz not null default now()
);

create index if not exists idx_fato_despesa_chave
  on public.fato_despesa (municipio_id_ibge, entidade_id, ano, mes);

comment on table public.fato_despesa is 'Despesa por municipio, entidade, ano, mes + hierarquia (programatica, orgao, unidade, secretaria).';

-- ── fato_receita ─────────────────────────────────────────────────
-- Chave: municipio, entidade, ano, mes, data, lancamento, receita
create table if not exists public.fato_receita (
  id                 bigint generated always as identity primary key,
  municipio_id_ibge  char(7)  not null references public.dim_municipio(id_ibge) on delete cascade,
  entidade_id        uuid     not null references public.dim_entidade(id) on delete cascade,
  ano                smallint not null,
  mes                smallint not null check (mes between 1 and 12),
  data               date,
  lancamento         text,
  receita            text,                 -- nome da receita
  codigo             text,                 -- código (ex.: 1.1.1)
  categoria          text,                 -- própria | estadual | federal | outra
  -- valores (BRL)
  valor_prevista     numeric(18,2) not null default 0,
  valor_arrecadada   numeric(18,2) not null default 0,
  valor_a_arrecadar  numeric(18,2) not null default 0,
  criado_em          timestamptz not null default now()
);

create index if not exists idx_fato_receita_chave
  on public.fato_receita (municipio_id_ibge, entidade_id, ano, mes);

comment on table public.fato_receita is 'Receita por municipio, entidade, ano, mes + receita/categoria.';

-- ── RLS (defesa em profundidade) ─────────────────────────────────
alter table public.fato_despesa enable row level security;
alter table public.fato_receita enable row level security;
