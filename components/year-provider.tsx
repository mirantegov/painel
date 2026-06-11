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

/**
 * Quantos anos para trás oferecer no seletor (além do corrente). A base tem os
 * exercícios exportados do SIM-AM (atualmente 2024-2026), então `corrente + 2`.
 * (Ideal futuro: derivar os anos disponíveis dos dados, por município.)
 */
const ANOS_RETROATIVOS = 2;

export function YearProvider({
  children,
  anoInicial,
}: {
  children: React.ReactNode;
  anoInicial?: number;
}) {
  const anoCorrente = anoInicial ?? new Date().getFullYear();
  const [ano, setAno] = React.useState(anoCorrente);
  const [refreshNonce, setRefreshNonce] = React.useState(0);
  const refresh = React.useCallback(() => setRefreshNonce((n) => n + 1), []);

  const anos = React.useMemo(() => {
    const lista: number[] = [];
    for (let a = anoCorrente; a >= anoCorrente - ANOS_RETROATIVOS; a--) {
      lista.push(a);
    }
    return lista;
  }, [anoCorrente]);

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
