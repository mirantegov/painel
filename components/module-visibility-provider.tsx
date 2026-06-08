"use client";

import * as React from "react";
import {
  DISABLED_MODULES_STORAGE_KEY,
  DEFAULT_DISABLED_MODULE_IDS,
  MODULES,
  type ModuleConfig,
} from "@/lib/modules-config";

/** Padrão: módulos ainda mockados ocultos no menu (usuário pode reativar). */
function defaultDisabled(): Set<string> {
  return new Set(DEFAULT_DISABLED_MODULE_IDS);
}

function readDisabled(): Set<string> {
  if (typeof window === "undefined") {
    return defaultDisabled();
  }
  try {
    const raw = localStorage.getItem(DISABLED_MODULES_STORAGE_KEY);
    if (raw === null) {
      // Sem escolha salva → aplica o padrão (mockados ocultos).
      return defaultDisabled();
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
  return defaultDisabled();
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
  // Inicia com o padrão (determinístico em server e client → sem erro de
  // hidratação). Após a montagem, carrega a escolha salva do usuário, se houver.
  const [disabled, setDisabled] = React.useState<Set<string>>(defaultDisabled);

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
