"use client";

import * as React from "react";

type YearContextValue = {
  ano: number;
  setAno: (ano: number) => void;
  anos: number[];
  /** Incrementado pelo botão de refresh; módulos o incluem nas deps de fetch. */
  refreshNonce: number;
  refresh: () => void;
};

const YearContext = React.createContext<YearContextValue | null>(null);

/** Fallback (município ainda sem dados): corrente + N anos para trás. */
const ANOS_RETROATIVOS = 2;

export function YearProvider({
  children,
  anoInicial,
  anosDisponiveis,
}: {
  children: React.ReactNode;
  anoInicial?: number;
  /** Anos com dados (do servidor); quando presente, dirige o seletor. */
  anosDisponiveis?: number[];
}) {
  const [refreshNonce, setRefreshNonce] = React.useState(0);
  const refresh = React.useCallback(() => setRefreshNonce((n) => n + 1), []);

  // Seletor dirigido pelos anos que realmente têm dados; senão, fallback calculado.
  const anos = React.useMemo(() => {
    if (anosDisponiveis && anosDisponiveis.length > 0) {
      return [...anosDisponiveis].sort((a, b) => b - a);
    }
    const corrente = anoInicial ?? new Date().getFullYear();
    const lista: number[] = [];
    for (let a = corrente; a >= corrente - ANOS_RETROATIVOS; a--) lista.push(a);
    return lista;
  }, [anosDisponiveis, anoInicial]);

  // Ano inicial = mais recente com dados (ou o explícito / corrente).
  const [ano, setAno] = React.useState(
    () => anoInicial ?? anos[0] ?? new Date().getFullYear(),
  );

  const value = React.useMemo(
    () => ({ ano, setAno, anos, refreshNonce, refresh }),
    [ano, anos, refreshNonce, refresh],
  );

  return <YearContext.Provider value={value}>{children}</YearContext.Provider>;
}

export function useYear(): YearContextValue {
  const ctx = React.useContext(YearContext);
  if (!ctx) {
    throw new Error("useYear deve ficar dentro de YearProvider");
  }
  return ctx;
}
