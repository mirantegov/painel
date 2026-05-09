# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server with Turbopack (localhost:3000)
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # ESLint
npm run typecheck    # TypeScript check without emitting
npm run format       # Prettier format all .ts/.tsx files
```

Docker:
```bash
docker compose up --build   # Build and run on port 3000
```

Default credentials: `admin` / `admin`

## Architecture

**Dash** is a Portuguese-language municipal public management analytics dashboard. It's a Next.js App Router single-page app with tab-based navigation across 19 government modules (expenses, revenue, HR, procurement, health, education, etc.).

### App Structure

```
app/layout.tsx          # Root layout: fonts, ThemeProvider
app/page.tsx            # Main dashboard: tabs + auto-scroll presentation mode
app/login/page.tsx      # Login form (sets auth=1 cookie)
middleware.ts           # Cookie-based auth guard (redirects unauthenticated users)
```

### Component Organization

- `components/ui/` — shadcn/ui primitives (60+ components, do not modify these)
- `components/*.tsx` — Feature module components, one per tab
- `components/legislativo/`, `components/orcamento/`, `components/previdencia/`, `components/saneamento/` — Complex modules with internal sub-tabs or specialized charts

Each module is a self-contained React component rendered inside a `<TabsContent>` in `app/page.tsx`. Complex modules have their own inner `<Tabs>` with child components.

### Data

All data is static demo data — no external API calls. Data is either:
- Hardcoded inline in the component
- Imported from `lib/demo-*.ts` (for larger datasets: `demo-legislativo.ts`, `demo-previdencia.ts`, `demo-saneamento.ts`, `demo-orcamento.ts`)

### Adding a New Module

1. Create `components/my-module.tsx` (follow existing module structure)
2. Add a `<TabsTrigger>` and `<TabsContent>` in `app/page.tsx`
3. If the module needs large demo data, add `lib/demo-my-module.ts`

### Key Conventions

- Icons: `@hugeicons/react` — `<HugeiconsIcon icon={SomeIcon} strokeWidth={2} className="size-4" />`
- Styling: Tailwind CSS v4 utility classes; use `cn()` from `lib/utils.ts` for conditional classes
- Charts: Recharts via the shadcn `Chart` wrapper in `components/ui/chart.tsx`
- Theme: `next-themes` — components should respect `dark:` variants
- Paletas nomeadas (`ThemeSelector`): Padrão, Dracula, Ocean Breeze, Floresta noturna, Northern Lights, Supabase, Monokai — persistidas em `localStorage` (`lib/color-presets.ts`) e aplicadas via `data-color-preset` em `app/globals.css`
- Path alias: `@/` maps to the project root

### Authentication

Cookie `auth=1` with 8-hour expiry. Credentials hardcoded in `middleware.ts` and `app/login/page.tsx`. This is intentionally simple demo auth — not production-grade.

### Build Notes

`next.config.mjs` sets `output: 'standalone'` (for Docker) and `ignoreBuildErrors: true`. TypeScript errors won't fail the build, but `npm run typecheck` should be run to catch them.
