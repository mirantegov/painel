"use client";

import * as React from "react";
import { LEGISLATIVO_SNAPSHOT } from "@/lib/demo-legislativo";

export type LegislativoSnapshot = typeof LEGISLATIVO_SNAPSHOT;

export const LegislativoSnapshotContext =
  React.createContext<LegislativoSnapshot>(LEGISLATIVO_SNAPSHOT);

export function useLegislativoSnapshot() {
  return React.useContext(LegislativoSnapshotContext);
}
