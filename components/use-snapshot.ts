"use client";

import * as React from "react";
import { useYear } from "@/components/year-provider";

/**
 * Lê o snapshot (jsonb) de um módulo no Postgres via /api/data/<slug>,
 * reagindo ao ano e ao refresh. Enquanto carrega (ou em erro/sem dado),
 * usa o fallback bundlado (demo). Município sai da sessão no servidor.
 *
 * O dado do servidor é **fundido sobre o fallback** (merge raso): o snapshot é
 * produzido por partes (uma `chave` por seção, destravadas conforme o pipeline
 * avança). Seções ainda não produzidas ficam ausentes no jsonb e mantêm o valor
 * demo — a renderização nunca quebra por chave faltante.
 */
export function useSnapshot<T>(slug: string, fallback: T): T {
  const { ano, refreshNonce } = useYear();
  const [data, setData] = React.useState<T>(fallback);

  React.useEffect(() => {
    let active = true;
    fetch(`/api/data/${slug}?ano=${ano}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!active || !d?.dados) return;
        const incoming = d.dados;
        // Merge raso só quando ambos são objetos simples; senão, substitui.
        const merged =
          incoming &&
          typeof incoming === "object" &&
          !Array.isArray(incoming) &&
          fallback &&
          typeof fallback === "object" &&
          !Array.isArray(fallback)
            ? ({ ...(fallback as object), ...(incoming as object) } as T)
            : (incoming as T);
        setData(merged);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [slug, ano, refreshNonce, fallback]);

  return data;
}
