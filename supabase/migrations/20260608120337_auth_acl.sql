-- Auth custom (não GoTrue) + catálogo de módulos/submódulos + ACL por usuário.
-- Login = (municipio = id_ibge, cpf, senha). Senha em bcrypt (hash gerado na app).
-- Isolamento por município é por app (claim do JWT). RLS habilitado como defesa.

-- ── usuarios ─────────────────────────────────────────────────────
-- Cadastro mínimo: municipio, cpf, nome, cargo, senha. secretaria opcional.
create table if not exists public.usuarios (
  id_user            uuid primary key default gen_random_uuid(),
  municipio_id_ibge  char(7) not null references public.dim_municipio(id_ibge) on delete restrict,
  cpf                char(11) not null check (cpf ~ '^[0-9]{11}$'),
  nome               text    not null,
  cargo              text    not null,
  secretaria         text,
  senha_hash         text    not null,
  ativo              boolean not null default true,
  criado_em          timestamptz not null default now(),
  unique (municipio_id_ibge, cpf)
);

comment on table public.usuarios is 'Usuários (prefeito/secretários). Login = municipio(id_ibge)+cpf+senha. senha_hash = bcrypt.';

-- ── modulos (catálogo) ───────────────────────────────────────────
-- id = slug igual ao id em lib/modules-config.ts (ex.: 'despesa').
create table if not exists public.modulos (
  id     text primary key,
  label  text not null,
  ordem  smallint not null default 0
);

-- ── submodulos (sub-tabs dos módulos complexos) ──────────────────
create table if not exists public.submodulos (
  id         uuid primary key default gen_random_uuid(),
  modulo_id  text not null references public.modulos(id) on delete cascade,
  slug       text not null,
  label      text not null,
  ordem      smallint not null default 0,
  unique (modulo_id, slug)
);

create index if not exists idx_submodulos_modulo on public.submodulos (modulo_id);

-- ── ACL: módulos liberados por usuário ───────────────────────────
create table if not exists public.usuario_modulos (
  usuario_id uuid not null references public.usuarios(id_user) on delete cascade,
  modulo_id  text not null references public.modulos(id) on delete cascade,
  primary key (usuario_id, modulo_id)
);

-- ── ACL: submódulos liberados por usuário ────────────────────────
create table if not exists public.usuario_submodulos (
  usuario_id    uuid not null references public.usuarios(id_user) on delete cascade,
  submodulo_id  uuid not null references public.submodulos(id) on delete cascade,
  primary key (usuario_id, submodulo_id)
);

-- ── RLS (defesa em profundidade) ─────────────────────────────────
alter table public.usuarios           enable row level security;
alter table public.modulos            enable row level security;
alter table public.submodulos         enable row level security;
alter table public.usuario_modulos    enable row level security;
alter table public.usuario_submodulos enable row level security;
