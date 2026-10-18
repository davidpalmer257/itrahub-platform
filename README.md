<p align="center">
  <img src="branding/png/itrahub-icon-192.png" width="80" height="80" alt="ITRAHUB icon" />
</p>

# ITRAHUB Platform

**The web interface foundation for ITRACOM Holding's budget management platform.**

ITRAHUB brings the group's finance workspace into one interface, organized around **Prévision**, **Budget**, and **Exécution**. This repository contains the Next.js application, its visual identity, and the functional specifications guiding development.

> **Current status: UI foundation / demo.** The login flow, navigation, preferences, and shared interface components are implemented. The dashboard and finance module pages currently display a development placeholder. There is no connected backend, database, or real authentication.

[Get started](#getting-started) · [App structure](#app-structure) · [Architecture](docs/ARCHITECTURE.md) · [Contribute](CONTRIBUTING.md) · [Report an issue](https://github.com/davidpalmer257/itrahub-platform/issues)

## What is available

| Area | Current behavior |
| --- | --- |
| Demo login | Employee number → demo email code → demo password → application shell |
| Navigation | Finance sidebar, collapsible desktop navigation, and a mobile drawer with bottom navigation |
| Command palette | Search navigation destinations with `Ctrl+K` / `⌘+K`; use arrow keys, Enter, and Escape |
| Preferences | Light/dark theme and French, English, and Portuguese interface dictionaries; some copy remains French |
| Account and signatures | Static demo profile and signature-task previews in the header |
| Dashboard and finance pages | Routes are accessible through the shell and show “Page en cours de développement. Aucun contenu à afficher pour le moment.” |
| Shared UI foundation | Reusable tables, controls, badges, dialogs, page states, formatting utilities, and typed sample data |

The specifications describe the intended budget workflows; their presence in the documentation does not mean they are operational in this version.

## Technology

| Layer | In this repository |
| --- | --- |
| Web framework | Next.js 15.5.28, App Router |
| Interface | React 19.1.0 and TypeScript 5.7.3 |
| Styling | Tailwind CSS 4.1.13 and application CSS |
| Icons and typography | Lucide React and Urbanist through `next/font/google` |
| Application state | React context, component state, and browser storage |
| Data | Static fixtures in `dashboard/lib/mock-data.ts` |

The scope document describes a future Node.js/Express API and a central SQL database. Neither is implemented here, and the final database choice is still open.

## Getting started

Use Node.js 24 with npm for local development. Some locked image-processing packages require Node.js 20.9.0 or newer, even though Next.js itself accepts older releases. The repository does not currently pin a runtime version.

```bash
git clone https://github.com/davidpalmer257/itrahub-platform.git
cd itrahub-platform/dashboard
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Run application commands from `dashboard/`.** There is no root `package.json`. The current demo needs no environment variables, database setup, or external API credentials. Dependency installation needs network access, and Next.js may fetch the Urbanist font during startup or builds.

### Demo access

| Step | Value |
| --- | --- |
| Employee number / matricule | `ITC-0042` or `ITC-0108` |
| Email verification code | `480192` |
| Password | Any demo value of at least four characters |

No email is sent and no password is checked against an account. The login only sets a browser session flag; it does not provide server-side access control. Both employee numbers lead to the same static demo profile. Use a throwaway demo password.

### Commands

From `dashboard/`:

| Command | Purpose |
| --- | --- |
| `npm ci` | Install dependencies from the committed lockfile |
| `npm run dev` | Start the development server |
| `npx tsc --noEmit` | Check TypeScript types |
| `npm run build` | Create a production build of the current UI |
| `npm start` | Serve that build after `npm run build` |

The existing `npm run lint` script calls `next lint`, but ESLint dependencies and configuration have not been added. It may prompt for setup instead of running a configured check. There is no test script or GitHub Actions workflow configured yet.

## App structure

```text
itrahub-platform/
├── README.md                         # Project overview and setup
├── CONTRIBUTING.md                   # Change and verification guidance
├── docs/
│   └── ARCHITECTURE.md                # Routes, state, data, and integration boundaries
├── .github/
│   ├── ISSUE_TEMPLATE/               # Bug report and feature request templates
│   └── pull_request_template.md      # Review context and validation
├── dashboard/                        # Runnable Next.js application
│   ├── app/
│   │   ├── layout.tsx                # Metadata, font, styles, and app provider
│   │   ├── page.tsx                  # Login/dashboard entry redirect
│   │   ├── login/page.tsx            # Three-step demo login
│   │   ├── globals.css               # Theme and responsive app styling
│   │   └── (app)/                    # Routes wrapped in the shared app shell
│   │       ├── layout.tsx
│   │       ├── dashboard/page.tsx    # Development placeholder
│   │       ├── prevision/page.tsx    # Development placeholder
│   │       ├── execution/page.tsx    # Development placeholder
│   │       └── budget/
│   │           ├── page.tsx          # Redirect to /budget/budgets
│   │           └── [...slug]/page.tsx # Shared placeholder for budget subpaths
│   ├── components/                   # Shell, navigation, palette, tables, shared UI
│   ├── lib/                          # Types, fixtures, labels, selectors, i18n, formatting
│   ├── package.json
│   └── package-lock.json
├── branding/                         # Logos, icons, PNG assets, tokens, brand guide
├── moodboard/                        # Visual references, not app screenshots
├── ITRAHUB_SCOPE_DEVELOPPEMENT.md     # Development scope and requirements, v2.1
├── ITRAHUB SRS Gestion Budgetaire.docx
└── ITRAHUB_Brand_Kit_v1.0.zip
```

`(app)` is a Next.js route group and does not appear in URLs. Budget destinations such as `/budget/exercices`, `/budget/budgets`, `/budget/signatures`, and `/budget/depenses` share the catch-all route; they are not separate implemented business modules. See the [architecture guide](docs/ARCHITECTURE.md) for the route table and source responsibilities.

## Product scope and next work

The first delivery focuses on the finance UI foundation and the budget workflows defined in the SRS. All planned budget workflows, including expense processing, belong under **Budget**. **Prévision** and **Exécution** remain placeholder components under the current scope.

The next implementation work includes:

- Building the Budget screens for exercises, entity budgets, resources, company approval, group consolidation, expenses, credit revisions, reference data, and history.
- Connecting real authentication, email verification, server-side permissions, and business-signature checks.
- Adding the API, central database, persistence, and audit history.
- Resolving the SRS's open decisions (`D-01`–`D-18`) before implementing behavior that depends on them.
- Establishing automated checks and verifying the required accessibility, localization, and responsive behavior.

These are outstanding work areas, not delivery dates or completed capabilities. Mobile native applications, bank integrations, and a complete ERP are not included in this codebase.

## Notes before using the project

- **Business data is illustrative.** Fixtures, amounts, currencies, rates, tasks, and signature previews are demo data. No real approval, payment, or financial transaction is performed.
- **Browser storage has a limited role.** Language, theme, and navigation preferences use `localStorage`; demo login uses `sessionStorage`. Business records are not persisted.
- **UI components are scaffolding.** Available controls and data helpers do not imply the corresponding module pages have been built.
- **Brand assets are provisional.** The [brand guide](branding/BRAND_GUIDE.md) identifies the current logos as project-created placeholders pending official assets. Moodboards are composition references and do not show the delivered application.
- **Generated files stay local.** Dependencies, `.next`, TypeScript build info, environment files, and OS metadata are excluded from Git.
- **License status:** no `LICENSE` file or open-source license is currently declared in this repository.

## Project references

| Document | Purpose |
| --- | --- |
| [Development scope](ITRAHUB_SCOPE_DEVELOPPEMENT.md) | Scope, business requirements, constraints, and open decisions |
| [Budget management SRS](ITRAHUB%20SRS%20Gestion%20Budgetaire.docx) | Original functional specification |
| [Architecture guide](docs/ARCHITECTURE.md) | Current implementation and extension points |
| [Dashboard guide](dashboard/README.md) | Application-local commands and entry points |
| [Brand guide](branding/BRAND_GUIDE.md) | Logos, visual identity, and asset usage |
| [Brand kit](ITRAHUB_Brand_Kit_v1.0.zip) | Packaged brand assets |
| [Contribution guide](CONTRIBUTING.md) | How to describe, implement, and verify changes |

Use [GitHub Issues](https://github.com/davidpalmer257/itrahub-platform/issues) for reproducible bugs and scoped feature proposals. Include the affected route and relevant SRS reference when available.
