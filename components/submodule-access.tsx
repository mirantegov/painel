"use client";

import * as React from "react";

/** Mapa modulo_id → slugs de submódulo liberados ao usuário. */
type AllowedSubmodules = Record<string, string[]>;

const SubmoduleAccessContext = React.createContext<AllowedSubmodules>({});

export function SubmoduleAccessProvider({
  value,
  children,
}: {
  value: AllowedSubmodules;
  children: React.ReactNode;
}) {
  return (
    <SubmoduleAccessContext.Provider value={value}>
      {children}
    </SubmoduleAccessContext.Provider>
  );
}

/**
 * Retorna um predicado p/ um módulo: dado um slug de submódulo, diz se está
 * liberado. Se o módulo não tem submódulos cadastrados para o usuário,
 * libera tudo (fail-open por módulo simples), pois o acesso ao módulo já
 * foi validado no nível superior.
 */
export function useSubmoduleAccess(moduloId: string): (slug: string) => boolean {
  const map = React.useContext(SubmoduleAccessContext);
  return React.useCallback(
    (slug: string) => {
      const allowed = map[moduloId];
      if (!allowed || allowed.length === 0) return true;
      return allowed.includes(slug);
    },
    [map, moduloId],
  );
}
