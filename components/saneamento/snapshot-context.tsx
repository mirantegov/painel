"use client";

import * as React from "react";
import { SANEAMENTO_SNAPSHOT } from "@/lib/demo-saneamento";

export type SaneamentoSnapshot = typeof SANEAMENTO_SNAPSHOT;

export const SaneamentoSnapshotContext =
  React.createContext<SaneamentoSnapshot>(SANEAMENTO_SNAPSHOT);

export function useSaneamentoSnapshot() {
  return React.useContext(SaneamentoSnapshotContext);
}
