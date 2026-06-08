/**
 * Formatadores monetários compartilhados.
 * fmtBRL: formato compacto para KPIs (R$ X.XM / R$ XXK), como na Visão Geral.
 */
export function fmtBRL(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `R$ ${(value / 1_000).toFixed(0)}K`;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}
