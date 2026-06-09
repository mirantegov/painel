# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

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

Demo credentials (after `npm run db:seed-demo`):

| Field | Value |
| --- | --- |
| Cliente (IBGE) | `4117107` |
| Usuario (CPF) | `00000000000` |
| Senha | `Dx7$kP2w-Ra9mLZ` |

## Architecture

**Mirante Painel** is a Portuguese-language municipal public management analytics dashboard. It's a Next.js App Router app with tab-based navigation across the module catalog in `lib/modules-config.ts` (21 tabs including overview and the public bids panel).

### App Structure

```
app/layout.tsx          # Root layout: fonts, ThemeProvider
app/page.tsx            # Server entry: session + ACL, renders Dashboard
components/dashboard.tsx # Tabs + auto-scroll presentation mode
app/login/page.tsx      # Login form (cliente IBGE + CPF + senha)
middleware.ts           # JWT cookie auth guard (redirects unauthenticated users)
```

### Component Organization

- `components/ui/` — shadcn/ui primitives (60+ components, do not modify these)
- `components/*.tsx` — Feature module components, one per tab
- `components/legislativo/`, `components/orcamento/`, `components/previdencia/`, `components/saneamento/` — Complex modules with internal sub-tabs or specialized charts

Each module is registered in `MODULES` (`lib/modules-config.ts`) and rendered inside a `<TabsContent>` in `components/dashboard.tsx`. Complex modules have their own inner `<Tabs>` with child components.

### Data

Display data uses snapshot JSON in Postgres (`mod_<slug>.dados`) with bundled fallbacks in `lib/demo-*.ts`.

- Client components call `useSnapshot("<slug>", <SLUG>_SNAPSHOT)`.
- The generic route `app/api/data/[modulo]/route.ts` returns module data for the municipality in the JWT session.
- `scripts/seed-demo.ts` seeds the demo snapshots for all current modules.
- Do not put functions, JSX, icon objects, or other non-serializable values inside snapshots.

### Adding a New Module

1. Create `components/my-module.tsx` (follow existing module structure)
2. Register the module in `lib/modules-config.ts`
3. Add `<slug> → mod_<slug>` in `lib/data/modules.ts`
4. Add `lib/demo-my-module.ts` with `MY_MODULE_SNAPSHOT`
5. Consume it with `useSnapshot("<slug>", MY_MODULE_SNAPSHOT)`
6. Seed it in `scripts/seed-demo.ts`

### Key Conventions

- Icons: `@hugeicons/react` — `<HugeiconsIcon icon={SomeIcon} strokeWidth={2} className="size-4" />`
- Styling: Tailwind CSS v4 utility classes; use `cn()` from `lib/utils.ts` for conditional classes
- Charts: Recharts via the shadcn `Chart` wrapper in `components/ui/chart.tsx`
- Theme: `next-themes` — components should respect `dark:` variants
- Paletas nomeadas (`ThemeSelector`): Padrão, Dracula, Ocean Breeze, Floresta noturna, Northern Lights, Supabase, Monokai, Midnight Blue, Blue Jeans — persistidas em `localStorage` (`lib/color-presets.ts`) e aplicadas via `data-color-preset` em `app/globals.css`
- Path alias: `@/` maps to the project root

### Authentication

Custom auth, not Supabase GoTrue. Login is `cliente (id_ibge) + CPF + senha`; users live in `public.usuarios` with bcrypt hashes. Sessions are JWT HS256 in the httpOnly cookie `mp_session` with 8-hour expiry. The municipality always comes from the JWT session claim, never from the client request.

### Build Notes

`next.config.mjs` sets `output: 'standalone'` (for Docker) and `ignoreBuildErrors: true`. TypeScript errors won't fail the build, but `npm run typecheck` should be run to catch them.

## Documentação e planejamento

Todos os planos de implementação e listas de tarefas devem ser salvos na pasta `docs/`. Nunca usar arquivos temporários ou raiz do projeto para isso.

## Slack

Todas as mensagens enviadas ao Slack neste repositório devem ser enviadas para o canal **#analytics**.

- Canal: `#analytics`
- Channel ID: `C0B18NPV886`
- Workspace: `code42dev.slack.com`
