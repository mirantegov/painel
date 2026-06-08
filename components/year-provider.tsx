"use client";

import * as React from "react";

type YearContextValue = {
  ano: number;
  setAno: (ano: number) => void;
  anos: number[];
};

const YearContext = React.createContext<YearContextValue | null>(null);

/** Quantos anos para trás oferecer no seletor (além do corrente). */
const ANOS_RETROATIVOS = 3;

export function YearProvider({
  children,
  anoInicial,
}: {
  children: React.ReactNode;
  anoInicial?: number;
}) {
  const anoCorrente = anoInicial ?? new Date().getFullYear();
  const [ano, setAno] = React.useState(anoCorrente);

  const anos = React.useMemo(() => {
    const lista: number[] = [];
    for (let a = anoCorrente; a >= anoCorrente - ANOS_RETROATIVOS; a--) {
      lista.push(a);
    }
    return lista;
  }, [anoCorrente]);

  const value = React.useMemo(() => ({ ano, setAno, anos }), [ano, anos]);

  return <YearContext.Provider value={value}>{children}</YearContext.Provider>;
}

export function useYear(): YearContextValue {
  const ctx = React.useContext(YearContext);
  if (!ctx) {
    throw new Error("useYear deve ficar dentro de YearProvider");
  }
  return ctx;
}
