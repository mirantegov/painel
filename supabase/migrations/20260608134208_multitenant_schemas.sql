-- Multi-tenant por schema: dados isolados em mun_<ibge>; global em public.
-- Espelha o database-por-município do ClickHouse. Substitui o modelo antigo
-- (tabelas tenant em public com coluna municipio_id_ibge).
--
-- Global (public): dim_municipio, modulos, submodulos, usuarios,
--   usuario_modulos, usuario_submodulos.
-- Por schema mun_<ibge>: dim_entidade, fato_despesa, fato_receita, mod_*.

-- 1) Remove as tabelas tenant de public (modelo antigo).
drop table if exists public.fato_despesa cascade;
drop table if exists public.fato_receita cascade;
drop table if exists public.dim_entidade cascade;
do $$
declare
  slug text;
  mods text[] := array['visao_geral','financeiro','tributacao','orcamento',
    'prestacao_contas','compras','rh','saude','educacao','assistencia_social',
    'defesa_civil','obras','frotas','patrimonio','processos','previdencia',
    'saneamento','legislativo','licitacoes_painel'];
begin
  foreach slug in array mods loop
    execute format('drop table if exists public.%I cascade', 'mod_' || slug);
  end loop;
end $$;

-- 2) Template de provisionamento de um município (schema mun_<ibge>).
create or replace function public.provision_municipio(p_ibge char(7))
returns void language plpgsql as $$
declare
  s text := 'mun_' || p_ibge;
  slug text;
  mods text[] := array['visao_geral','financeiro','tributacao','orcamento',
    'prestacao_contas','compras','rh','saude','educacao','assistencia_social',
    'defesa_civil','obras','frotas','patrimonio','processos','previdencia',
    'saneamento','legislativo','licitacoes_painel'];
begin
  if p_ibge !~ '^[0-9]{7}$' then
    raise exception 'id_ibge inválido: %', p_ibge;
  end if;

  execute format('create schema if not exists %I', s);

  -- dim_entidade (sem municipio_id_ibge: o schema já é o município)
  execute format($f$
    create table if not exists %I.dim_entidade (
      id        uuid primary key default gen_random_uuid(),
      nome      text not null,
      tipo      text not null check (tipo in ('Prefeitura','Câmara','Autarquia','RPPS','Fundo')),
      criado_em timestamptz not null default now(),
      unique (nome)
    )$f$, s);

  -- fato_despesa
  execute format($f$
    create table if not exists %1$I.fato_despesa (
      id               bigint generated always as identity primary key,
      entidade_id      uuid not null references %1$I.dim_entidade(id) on delete cascade,
      ano              smallint not null,
      mes              smallint check (mes between 1 and 12),
      data             date,
      lancamento       text,
      programatica     text,
      orgao            text,
      unidade          text,
      secretaria       text,
      funcao           text,
      subfuncao        text,
      programa         text,
      acao             text,
      fonte_recurso    text,
      valor_atualizada numeric(18,2) not null default 0,
      valor_empenhada  numeric(18,2) not null default 0,
      valor_liquidada  numeric(18,2) not null default 0,
      valor_pago       numeric(18,2) not null default 0,
      valor_a_empenhar numeric(18,2) not null default 0,
      valor_a_pagar    numeric(18,2) not null default 0,
      criado_em        timestamptz not null default now()
    )$f$, s);
  execute format(
    'create index if not exists idx_fato_despesa_chave on %1$I.fato_despesa (entidade_id, ano, mes)', s);

  -- fato_receita
  execute format($f$
    create table if not exists %1$I.fato_receita (
      id                bigint generated always as identity primary key,
      entidade_id       uuid not null references %1$I.dim_entidade(id) on delete cascade,
      ano               smallint not null,
      mes               smallint check (mes between 1 and 12),
      data              date,
      lancamento        text,
      receita           text,
      codigo            text,
      categoria         text,
      valor_prevista    numeric(18,2) not null default 0,
      valor_arrecadada  numeric(18,2) not null default 0,
      valor_a_arrecadar numeric(18,2) not null default 0,
      criado_em         timestamptz not null default now()
    )$f$, s);
  execute format(
    'create index if not exists idx_fato_receita_chave on %1$I.fato_receita (entidade_id, ano, mes)', s);

  -- 19 mod_* (entidade_id NULL-ável: muitos módulos são municipais)
  foreach slug in array mods loop
    execute format($f$
      create table if not exists %1$I.%2$I (
        id          bigint generated always as identity primary key,
        entidade_id uuid references %1$I.dim_entidade(id) on delete cascade,
        ano         smallint not null,
        mes         smallint check (mes between 1 and 12),
        chave       text,
        dados       jsonb not null default '{}'::jsonb,
        criado_em   timestamptz not null default now()
      )$f$, s, 'mod_' || slug);
    execute format('create index if not exists %3$I on %1$I.%2$I (entidade_id, ano, mes)',
      s, 'mod_' || slug, 'idx_mod_' || slug || '_chave');
  end loop;
end $$;
