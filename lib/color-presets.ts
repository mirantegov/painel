export const COLOR_PRESET_STORAGE_KEY = "dash-color-preset"

export const COLOR_PRESETS = [
  {
    id: "default",
    label: "Padrão",
    hint: "Cores neutras do sistema",
  },
  {
    id: "dracula",
    label: "Dracula",
    hint: "Theme Explorer (Daniel Sousa) — shadcn-ui-theme-explorer",
  },
  {
    id: "ocean-breeze",
    label: "Ocean Breeze",
    hint: "Registry tweakcn (OKLCH), compatível shadcn/ui",
  },
  {
    id: "forest",
    label: "Floresta noturna",
    hint: "Verdes profundos",
  },
  {
    id: "northern-lights",
    label: "Northern Lights",
    hint: "tweakcn.com/r/themes/northern-lights.json (registry shadcn)",
  },
  {
    id: "supabase",
    label: "Supabase",
    hint: "tweakcn.com/r/themes/supabase.json (registry shadcn)",
  },
  {
    id: "monokai",
    label: "Monokai",
    hint: "Paleta inspirada em Monokai / VS Code (OKLCH)",
  },
  {
    id: "midnight-blue",
    label: "Midnight Blue",
    hint: "Azuis profundos estilo midnight / shadcn (OKLCH)",
  },
  {
    id: "blue-jeans",
    label: "Blue Jeans",
    hint: "Registry shadcn / tema denim-indigo (OKLCH)",
  },
] as const

export type ColorPresetId = (typeof COLOR_PRESETS)[number]["id"]

export const COLOR_PRESET_IDS: ColorPresetId[] = COLOR_PRESETS.map((p) => p.id)

export function isColorPresetId(value: string): value is ColorPresetId {
  return COLOR_PRESET_IDS.includes(value as ColorPresetId)
}

/** Inline no layout para evitar flash antes do hydration. */
export function getColorPresetBootScript(): string {
  const allowed = COLOR_PRESET_IDS.filter((id) => id !== "default")
  return `(function(){try{var k=${JSON.stringify(COLOR_PRESET_STORAGE_KEY)};var p=localStorage.getItem(k);var ok=new Set(${JSON.stringify(allowed)});if(p&&ok.has(p))document.documentElement.dataset.colorPreset=p;else document.documentElement.removeAttribute("data-color-preset")}catch(e){}})();`
}
