-- Dimensões base do Mirante Painel
-- dim_municipio (referência IBGE) e dim_entidade (entes por município).
-- Isolamento por município é aplicado na camada de app (municipio do JWT).
-- RLS habilitado sem políticas = nega acesso via Data API a anon/authenticated;
-- as queries do app usam conexão privilegiada (postgres) e ignoram RLS.

-- ── dim_municipio ────────────────────────────────────────────────
-- id_ibge = chave de município em TODO o sistema (7 dígitos).
create table if not exists public.dim_municipio (
  id_ibge      char(7) primary key,
  nome         text    not null,
  uf           char(2) not null,
  codigo_uf    smallint,
  regiao       text,
  criado_em    timestamptz not null default now()
);

comment on table public.dim_municipio is 'Municípios IBGE (referência). id_ibge = chave de município em todo o sistema.';

-- ── dim_entidade ─────────────────────────────────────────────────
-- Entes vinculados a um município: Prefeitura, Câmara, Autarquia, RPPS, Fundo.
create table if not exists public.dim_entidade (
  id                 uuid primary key default gen_random_uuid(),
  municipio_id_ibge  char(7) not null references public.dim_municipio(id_ibge) on delete cascade,
  nome               text    not null,
  tipo               text    not null check (tipo in ('Prefeitura','Câmara','Autarquia','RPPS','Fundo')),
  criado_em          timestamptz not null default now(),
  unique (municipio_id_ibge, nome)
);

create index if not exists idx_dim_entidade_municipio on public.dim_entidade (municipio_id_ibge);

comment on table public.dim_entidade is 'Entes por município (Prefeitura, Câmara, Autarquia, RPPS, Fundo).';

-- ── RLS (defesa em profundidade) ─────────────────────────────────
alter table public.dim_municipio enable row level security;
alter table public.dim_entidade  enable row level security;
