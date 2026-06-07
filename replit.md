# Selam Wellness

A community-first digital wellness platform for African youth — circles, rituals, women's health, experiences, and growth tools.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/selam-wellness run dev` — run the frontend (port assigned by workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite (`artifacts/selam-wellness/`) — JSX source files, custom screen-based navigation (no react-router needed)
- API: Express 5 (`artifacts/api-server/`)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Styling: Tailwind CSS v4 with custom Selam design system tokens
- Animations: Framer Motion

## Where things live

- `artifacts/selam-wellness/src/App.jsx` — main app shell with screen-based navigation
- `artifacts/selam-wellness/src/screens/` — all page-level components
- `artifacts/selam-wellness/src/components/` — shared components (ui/, layout/, features/)
- `artifacts/selam-wellness/src/index.css` — Selam design system tokens (terracotta, gold, sage, ivory)
- `artifacts/selam-wellness/src/data/` — mock data files (referenced by screens)
- `artifacts/api-server/src/routes/` — Express route handlers
- `lib/db/src/schema/tables.ts` — Drizzle schema (all tables)
- `lib/api-spec/openapi.yaml` — API contract (source of truth)

## Architecture decisions

- Screen-based navigation (state machine in App.jsx) instead of react-router — preserves original app structure
- Original JSX source files preserved as-is; main.tsx imports App.jsx with `@ts-ignore`
- SQLite from original was replaced with PostgreSQL via Drizzle ORM
- API routes mirror the original server.js endpoints exactly for frontend compatibility
- Font loading: Be Vietnam Pro via Google Fonts CDN in index.html; Plus Jakarta Sans via @fontsource package

## Product

- **Landing page** — hero, features, social proof, launch partner strip
- **Auth** — register / login with localStorage session persistence
- **Home** — personalized dashboard with daily rituals and feature navigation
- **Circles** — community discovery, circle feeds, anonymous post creation with emoji reactions
- **Women's Haven** — women-only wellness space and cycle tracker
- **Retreats / Experiences** — browse and book wellness experiences (spa, nature walks, retreats, yoga)
- **Practitioners** — browse holistic health practitioners
- **Mood Journal / Self-Care Hub** — daily mood logging and self-care tools
- **Growth & Events** — personal growth content and events listings
- **Profile** — user profile management

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- App uses `.jsx` files for all components — TypeScript-strict linting will flag these, use `@ts-ignore` at import boundaries
- Demo login: `hana@selam.et` / `selam123`
- The `data/` directory in `src/` contains mock data imported directly by screen components — these are not fetched from the API
- Tailwind v4 `@theme` block bridges CSS custom properties to Tailwind utilities

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
