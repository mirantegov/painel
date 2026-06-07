"use client";

import * as React from "react";
import {
  DISABLED_MODULES_STORAGE_KEY,
  MODULES,
  type ModuleConfig,
} from "@/lib/modules-config";

function readDisabled(): Set<string> {
  if (typeof window === "undefined") {
    return new Set();
  }
  try {
    const raw = localStorage.getItem(DISABLED_MODULES_STORAGE_KEY);
    if (!raw) {
      return new Set();
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return new Set(
        parsed.filter((id): id is string => typeof id === "string"),
      );
    }
  } catch {
    // ignora valor inválido
  }
  return new Set();
}

type ModuleVisibilityContextValue = {
  isVisible: (id: string) => boolean;
  toggle: (id: string) => void;
  visibleModules: ModuleConfig[];
};

const ModuleVisibilityContext =
  React.createContext<ModuleVisibilityContextValue | null>(null);

export function ModuleVisibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Inicia vazio para que o primeiro render do cliente case com o do servidor
  // (localStorage só existe no cliente). O valor real é carregado após a
  // montagem, evitando erro de hidratação.
  const [disabled, setDisabled] = React.useState<Set<string>>(
    () => new Set(),
  );

  React.useEffect(() => {
    setDisabled(readDisabled());
  }, []);

  const persist = React.useCallback((next: Set<string>) => {
    setDisabled(next);
    localStorage.setItem(
      DISABLED_MODULES_STORAGE_KEY,
      JSON.stringify([...next]),
    );
  }, []);

  const isVisible = React.useCallback(
    (id: string) => !disabled.has(id),
    [disabled],
  );

  const toggle = React.useCallback(
    (id: string) => {
      const next = new Set(disabled);
      if (next.has(id)) {
        next.delete(id);
      } else {
        // não permite desligar o último módulo visível
        const visibleCount = MODULES.length - next.size;
        if (visibleCount <= 1) {
          return;
        }
        next.add(id);
      }
      persist(next);
    },
    [disabled, persist],
  );

  const visibleModules = React.useMemo(
    () => MODULES.filter((m) => !disabled.has(m.id)),
    [disabled],
  );

  const value = React.useMemo(
    () => ({ isVisible, toggle, visibleModules }),
    [isVisible, toggle, visibleModules],
  );

  return (
    <ModuleVisibilityContext.Provider value={value}>
      {children}
    </ModuleVisibilityContext.Provider>
  );
}

export function useModuleVisibility() {
  const ctx = React.useContext(ModuleVisibilityContext);
  if (!ctx) {
    throw new Error(
      "useModuleVisibility deve ficar dentro de ModuleVisibilityProvider",
    );
  }
  return ctx;
}
