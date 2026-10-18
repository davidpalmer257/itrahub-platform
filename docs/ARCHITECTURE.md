# Architecture

ITRAHUB currently contains one runnable application: the Next.js web dashboard in [`dashboard/`](../dashboard/). It implements the application shell and a simulated login flow. The dashboard and finance destinations display a shared development placeholder. The budget domain models and sample data prepare future work; their presence does not mean the corresponding workflows are implemented.

See the [project README](../README.md) for setup and the [development scope](../ITRAHUB_SCOPE_DEVELOPPEMENT.md) for the product requirements and unresolved decisions.

## Repository layout

```text
itrahub-platform/
├── dashboard/                        Next.js application and npm package
│   ├── app/                          App Router routes, root styles and favicon
│   │   ├── layout.tsx                Metadata, Urbanist font and AppProvider
│   │   ├── page.tsx                  Browser session based entry redirect
│   │   ├── login/page.tsx            Simulated three-step login
│   │   └── (app)/                    Route group using AppShell
│   │       ├── layout.tsx
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       ├── dashboard/page.tsx
│   │       ├── prevision/page.tsx
│   │       ├── execution/page.tsx
│   │       └── budget/
│   │           ├── page.tsx          Redirect to /budget/budgets
│   │           └── [...slug]/page.tsx Shared placeholder for Budget subpaths
│   ├── components/                   Shell, navigation and reusable UI
│   ├── lib/                          Types, sample data, formatting and translations
│   ├── package.json
│   └── package-lock.json
├── branding/                         Brand guide, SVG/PNG assets and exported tokens
├── moodboard/                        Visual references
├── docs/                             Developer documentation
├── ITRAHUB_SCOPE_DEVELOPPEMENT.md     Product scope and open decisions
├── ITRAHUB SRS Gestion Budgetaire.docx
└── ITRAHUB_Brand_Kit_v1.0.zip
```

There is no backend application, database schema, API route implementation or native mobile project in this tree.

## Runtime and component responsibilities

The web package uses Next.js 15.5.28, React 19.1.0, TypeScript 5.7.3, Tailwind CSS 4.1.13 and Lucide React icons. The `@/*` TypeScript alias resolves from `dashboard/`. Next.js configuration enables React strict mode and hides development indicators.

| Source | Responsibility |
| --- | --- |
| `app/layout.tsx` | Root HTML, metadata, Google Urbanist font and the application context provider. |
| `components/providers.tsx` | Client context for language, theme and the simulated authentication flag. |
| `components/app-shell.tsx` | Client session check, responsive navigation, main workspace, keyboard shortcuts and help dialog. |
| `components/sidebar.tsx`, `collapsed-rail.tsx`, `mobile-nav.tsx` | Expanded desktop navigation, collapsed rail and compact-screen navigation. |
| `components/topbar.tsx` | Navigation toggle, search trigger, static signature preview, profile preferences and logout. |
| `components/command-palette.tsx` | Local filtering of navigation destinations, with keyboard selection and focus handling. |
| `components/in-development.tsx` | Shared message for all currently unfinished module pages. |
| `components/ui.tsx`, `data-table.tsx`, `page-state.tsx` | Reusable controls, responsive tables/lists, loading and error states. Some are scaffolding for future screens. |
| `components/brand.tsx`, `app/icon.svg` | Application brand components and favicon. |

`app/(app)/layout.tsx` wraps its routes with `AppShell`; `(app)` is a route group and does not appear in URLs. `loading.tsx` provides a loading state, while `error.tsx` supplies a retry action through the Next.js error boundary.

## Route map

Paths below are relative to `dashboard/`. Placeholder pages display: “Page en cours de développement. Aucun contenu à afficher pour le moment.”

| URL | Route file | Current behavior |
| --- | --- | --- |
| `/` | `app/page.tsx` | Client redirect to `/dashboard` or `/login` according to the demo authentication state. |
| `/login` | `app/login/page.tsx` | Simulated matricule → email code → password flow. |
| `/dashboard` | `app/(app)/dashboard/page.tsx` | Development placeholder inside the shell. |
| `/prevision` | `app/(app)/prevision/page.tsx` | Development placeholder inside the shell. |
| `/execution` | `app/(app)/execution/page.tsx` | Development placeholder inside the shell. |
| `/budget` | `app/(app)/budget/page.tsx` | Redirect to `/budget/budgets`. |
| `/budget/exercices` | `app/(app)/budget/[...slug]/page.tsx` | “Exercices et campagnes” navigation destination; development placeholder. |
| `/budget/budgets` | Same catch-all file | “Budgets d’entités” navigation destination; development placeholder. |
| `/budget/signatures` | Same catch-all file | “À signer” navigation destination; development placeholder. |
| `/budget/ressources` | Same catch-all file | “Ressources et équilibre” navigation destination; development placeholder. |
| `/budget/societes` | Same catch-all file | “Dossiers des sociétés” navigation destination; development placeholder. |
| `/budget/consolidation` | Same catch-all file | “Consolidation groupe” navigation destination; development placeholder. |
| `/budget/depenses` | Same catch-all file | “Dépenses et pièces” navigation destination; development placeholder. |
| `/budget/credit` | Same catch-all file | “Crédit et révisions” navigation destination; development placeholder. |
| Other `/budget/*` paths, including nested IDs | Same catch-all file | The same placeholder; there is no per-section or record-detail implementation. |

Navigation definitions live in `lib/nav.ts`. The individual Budget URLs above are entries in that configuration, not separate directories. The catch-all currently accepts any nonempty Budget subpath without validating a section name or record ID.

## Demo session and browser state

The login recognizes `ITC-0042` and `ITC-0108` from `lib/mock-data.ts`, accepts the hardcoded code `480192`, then accepts any password of at least four characters. Submitting this flow sets the client authentication flag and navigates to `/dashboard`. No email is sent, no credentials are verified by a service, and the password recovery button has no implemented action.

| Storage | Key | Purpose |
| --- | --- | --- |
| `sessionStorage` | `itrahub.authed` | Value `1` marks the current browser tab as logged in to the demonstration. Logout removes it. |
| `localStorage` | `itrahub.lang` | Selected interface language: `fr`, `en` or `pt`. |
| `localStorage` | `itrahub.theme` | Selected light or dark theme. |
| `localStorage` | `itrahub.navigation.collapsed` | Desktop navigation preference: `1` for collapsed, `0` for expanded. |

`AppProvider` reads saved state when it mounts. `AppShell` checks the context and session storage before rendering the workspace and redirects unauthenticated visitors to `/login`. These browser checks are a demonstration convenience; they do not provide server authentication or enforce access to business data. There are no server sessions, JWT validation, role checks or signature authorization checks.

The profile and signature previews always use the static `demoUser` and `signTasks` exports. Choosing another recognized matricule during login does not change the displayed account or select a different permission set. Clicking a task opens its placeholder destination without signing anything.

## Domain scaffolding and data flow

The current flow is route → shared shell → placeholder. The shell reads static profile and task data; the login reads static matricules. It does not fetch budgets or write business records.

| Library | Contents and limits |
| --- | --- |
| `lib/types.ts` | TypeScript interfaces for perimeters, entities, exercises, budgets, budget lines, resources, expenses, signatures, roles and alerts. These are logical UI types, not a database schema. |
| `lib/mock-data.ts` | Example organizations, exercises, budgets, resources, suppliers, roles, expenses, alerts, tasks and users, plus lookup/total helpers. Most domain examples are not rendered by the current placeholder pages. |
| `lib/selectors.ts` | Read-only calculations over the static examples: financing by source, planned resources, deficits, company progress and budget status distribution. |
| `lib/format.ts` | Locale-aware amount/date formatting and sample BIF/TZS/USD conversions using fixed `DEMO_RATES`. These rates are examples, not live foreign exchange data. |
| `lib/labels.ts` | French business status labels, visual tones and campaign phase labels. |
| `lib/i18n.ts` | FR/EN/PT dictionaries for shared interface labels, with French/key fallback. |

The sample data and helper calculations do not implement budget editing, workflow transitions, accounting controls, approvals, consolidation adoption, payment recording or an audit log. Any future authoritative calculation or state transition needs a defined service boundary and validation against the product requirements.

## Navigation, preferences and presentation

The shell switches to compact navigation at widths below 1024px. Desktop users can collapse the sidebar into a rail; smaller screens use a drawer and bottom navigation. The shell includes a skip link, focus handling for overlays and Escape support. The command palette opens with `Ctrl+K` or `⌘K`; it searches the configured navigation labels and descriptions only. Despite broader wording in parts of the UI, it does not search actual budget, expense or company records.

French is the default language. The dictionaries translate shared navigation and interface labels, but many login, help and business strings remain hardcoded in French. Language selection is therefore partial localization. Theme selection toggles the `dark` class on the document element.

`app/globals.css` imports Tailwind CSS and defines the runtime color tokens, typography, responsive shell and shared component styling. `app/layout.tsx` loads Urbanist through `next/font/google`; builds may need network access to obtain the font. The `branding/` folder holds related exported assets and tokens. Runtime CSS and brand components must be kept in sync with those exports; the app does not automatically import the exported branding token files. The [brand guide](../branding/BRAND_GUIDE.md) identifies the logos as provisional.

## Integration boundaries and target architecture

The [scope, section 3](../ITRAHUB_SCOPE_DEVELOPPEMENT.md#3-stack-et-architecture-de-travail) describes a future Node.js/Express 4/TypeScript API, JWT authentication with role based authorization, and one central PostgreSQL **or** MySQL database. The database choice remains open. None of these backend components is implemented or configured in this repository, and no API contracts, migrations, ORM or email provider are supplied.

Before connecting real data, the future implementation needs to replace the simulated session, define server authorization for roles/perimeters/delegations, persist domain records, and enforce validated workflow rules and audit requirements. The scope’s decisions D-01 through D-18 remain dependencies, including credit rules, signature conflicts, currency precision, reporting and deployment requirements. The current demo does not resolve them.

Forecast, execution and all Budget business screens remain to be implemented. The source also does not implement document uploads, exports, notifications, an installable PWA/service worker, bank connectors, stock management or a separate React Native application. The scope describes payment as recording a reference, not initiating a bank or mobile transfer. The web UI foundation does not imply delivery of the broader ERP.
