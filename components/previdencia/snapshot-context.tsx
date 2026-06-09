"use client";

import * as React from "react";
import { PREVIDENCIA_SNAPSHOT } from "@/lib/demo-previdencia";

export type PrevidenciaSnapshot = typeof PREVIDENCIA_SNAPSHOT;

export const PrevidenciaSnapshotContext =
  React.createContext<PrevidenciaSnapshot>(PREVIDENCIA_SNAPSHOT);

export function usePrevidenciaSnapshot() {
  return React.useContext(PrevidenciaSnapshotContext);
}
