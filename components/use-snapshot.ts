"use client";

import * as React from "react";
import { useYear } from "@/components/year-provider";

/**
 * Lê o snapshot (jsonb) de um módulo no Postgres via /api/data/<slug>,
 * reagindo ao ano e ao refresh. Enquanto carrega (ou em erro/sem dado),
 * usa o fallback bundlado (demo). Município sai da sessão no servidor.
 */
export function useSnapshot<T>(slug: string, fallback: T): T {
  const { ano, refreshNonce } = useYear();
  const [data, setData] = React.useState<T>(fallback);

  React.useEffect(() => {
    let active = true;
    fetch(`/api/data/${slug}?ano=${ano}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (active && d?.dados) setData(d.dados as T);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [slug, ano, refreshNonce]);

  return data;
}
