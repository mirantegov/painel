-- Correção: mês passa a ser NULL-ável nos fatos.
-- Dados atuais (e muitos da fase de carga) são agregados anuais; o recorte
-- mensal é fase futura ("filtro de mês onde fizer sentido"). O CHECK
-- (mes between 1 and 12) continua válido para NULL.
alter table public.fato_despesa alter column mes drop not null;
alter table public.fato_receita alter column mes drop not null;
