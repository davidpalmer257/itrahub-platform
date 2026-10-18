# ITRAHUB dashboard

The Next.js web application for ITRAHUB, ITRACOM Holding’s budget management platform. This package currently provides a responsive shell, preferences and a simulated login. `/dashboard`, `/prevision`, `/execution` and every Budget section show a development placeholder.

Start with the [project README](../README.md) for the repository overview and [architecture guide](../docs/ARCHITECTURE.md) for the actual source layout, route map, browser state and integration boundaries.

## Run locally

Use Node.js 24 and npm for local development. The locked image-processing dependencies require at least Node.js 20.9.0. Run these commands from `dashboard/`:

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). For the demo login, use matricule `ITC-0042` or `ITC-0108`, code `480192`, and any password with at least four characters. No email is sent and no server authentication is performed; both matricules lead to the same static demonstration profile.

## Checks and production build

```bash
npx tsc --noEmit
npm run build
npm start
```

`npm start` serves the production build and requires `npm run build` first. The build loads Urbanist through `next/font/google`, so font retrieval may require network access. No environment variables or backend service are required for this UI demo.

The existing `npm run lint` script invokes `next lint`, but ESLint dependencies and configuration have not been added. It may prompt for setup rather than run a ready-to-use check. There is no automated test suite yet.

## Source guide

| Path | Responsibility |
| --- | --- |
| `app/` | App Router routes, layouts, metadata and global CSS. Budget subpaths share `app/(app)/budget/[...slug]/page.tsx`. |
| `components/` | Shell, navigation, login controls, brand components and reusable UI. |
| `lib/` | Navigation, translations, domain types, sample data and calculation/formatting helpers. |

Language, theme and desktop navigation preferences use local storage; the simulated session flag uses session storage. Business data is static and has no persistence. The planned API, database, permissions, signatures and financial workflows are described in the [development scope](../ITRAHUB_SCOPE_DEVELOPPEMENT.md), not implemented by this package.
