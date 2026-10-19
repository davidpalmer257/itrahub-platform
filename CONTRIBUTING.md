# Contributing to ITRAHUB

Start with the [README](README.md), [architecture guide](docs/ARCHITECTURE.md), and [development scope](ITRAHUB_SCOPE_DEVELOPPEMENT.md). The current delivery is a finance UI foundation. The dashboard and finance pages are placeholders; the SRS describes the intended business behavior.

## Set up locally

Follow the [setup instructions](README.md#getting-started). Run application commands inside `dashboard/`, using `npm ci` to install the committed dependency versions.

Create a branch with a descriptive name:

```bash
git switch -c docs/explain-budget-routes
```

## Keep changes grounded in the scope

- Explain the user problem and the expected behavior in the issue or pull request.
- Reference the relevant `FR`, `NFR`, `D`, `PR`, or `AT` identifiers when a change implements a specification item. An `AT` scenario is not evidence that a test has been executed.
- Keep planned budget workflows under **Budget**. Prévision and Exécution remain placeholders in the current scope.
- Record dependencies on unresolved decisions instead of inventing financial rules.
- Keep demo data clearly identified. Describe whether a change adds UI behavior, persistent data, or a connected business operation.
- Reuse the shared UI and brand assets, and preserve keyboard navigation and responsive layouts when changing the interface.
- Update documentation when commands, routes, dependencies, or implementation status change.

## Verify the change

For application code, run from `dashboard/`:

```bash
npx tsc --noEmit
npm run build
```

The build may need network access to fetch the Urbanist font. Record any failure and its cause in the pull request; do not describe a blocked check as passed.

For interface changes, also check the affected routes in the browser at desktop and mobile sizes. Exercise the demo login when relevant, keyboard focus and Escape behavior, the navigation drawer, command palette, language preference, and light/dark theme. Report the checks that are relevant to the change.

For documentation-only changes, check file links, commands, formatting, and agreement with the current source. Application tests are not required solely for prose edits.

There is currently no general automated test suite or configured ESLint setup. `npm run lint` invokes `next lint`, but its ESLint dependencies and configuration are missing, so it may prompt for setup. The manual [cPanel release workflow](.github/workflows/cpanel-build.yml) also verifies the packaged server, routes, and production assets. Use the checks above and document any additional validation you perform.

## Open a pull request

Use the [pull request template](.github/pull_request_template.md) to describe:

- The problem and resulting behavior.
- Relevant issue and specification references.
- Checks performed and their results.
- Screenshots for visible interface changes, plus any remaining limitations.

Keep generated output and local configuration out of commits. The repository ignores `node_modules/`, `.next/`, TypeScript build info, `.env` files, and OS metadata.

## Report bugs and request features

Use the repository's [issue templates](https://github.com/davidpalmer257/itrahub-platform/issues/new/choose). For a bug, include the route, reproduction steps, expected and actual behavior, and browser/device details. For a feature, describe the user need, the proposed scope, and relevant specification references.

Check the documented implementation status first: a module displaying the development placeholder is expected behavior in this version.
