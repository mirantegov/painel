-- Tabelas por módulo (long tail do dashboard).
-- Despesa e Receita têm fatos normalizados (ver migration de fatos).
-- Os demais módulos são display-oriented e heterogêneos → uma tabela por módulo
-- com chave de filtro (municipio, entidade, ano, mes) + payload jsonb com o
-- shape próximo ao demo atual. Type-safety fica na camada TS (lib/data).
--
-- entidade_id e mes são NULL-áveis: muitos módulos são municipais (sem ente
-- específico) e/ou anuais (mês é fase futura).

do $$
declare
  slug text;
  modulos text[] := array[
    'visao_geral',
    'financeiro',
    'tributacao',
    'orcamento',
    'prestacao_contas',
    'compras',
    'rh',
    'saude',
    'educacao',
    'assistencia_social',
    'defesa_civil',
    'obras',
    'frotas',
    'patrimonio',
    'processos',
    'previdencia',
    'saneamento',
    'legislativo',
    'licitacoes_painel'
  ];
  tbl text;
begin
  foreach slug in array modulos loop
    tbl := 'mod_' || slug;

    execute format($f$
      create table if not exists public.%I (
        id                bigint generated always as identity primary key,
        municipio_id_ibge char(7)  not null references public.dim_municipio(id_ibge) on delete cascade,
        entidade_id       uuid     references public.dim_entidade(id) on delete cascade,
        ano               smallint not null,
        mes               smallint check (mes between 1 and 12),
        chave             text,                 -- sub-dataset dentro do módulo (ex.: 'iptu', 'iss')
        dados             jsonb    not null default '{}'::jsonb,
        criado_em         timestamptz not null default now()
      );
    $f$, tbl);

    execute format(
      'create index if not exists %I on public.%I (municipio_id_ibge, entidade_id, ano, mes);',
      'idx_' || tbl || '_chave', tbl
    );

    execute format('alter table public.%I enable row level security;', tbl);
  end loop;
end $$;
