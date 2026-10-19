# cPanel deployment

The manual **Build cPanel release** workflow builds and checks a Linux x86_64 package with Node.js 22, matching the major version available in cPanel. It does not connect to cPanel or automatically deploy anything. No hosting credentials are stored in the workflow.

## Build a release

Run `.github/workflows/cpanel-build.yml` from GitHub Actions on the commit you want to deploy. It installs the locked dependencies, checks TypeScript, builds Next.js, and verifies the packaged routes and static assets. Download the resulting artifact and unpack its outer GitHub archive to obtain `itrahub-cpanel.zip`.

`ITRAHUB_STANDALONE=1` enables Next.js standalone output for this build. Normal local development and `npm start` retain their existing behavior when that variable is unset.

The release archive contains:

```text
app.js                 Passenger startup entry point
package.json           Hosting application metadata
deployment.json        Source commit and build details
runtime/
  server.js            Generated Next.js server
  node_modules/        Traced Linux runtime dependencies
  .next/               Built routes and production static assets
```

Keep the nested `runtime/node_modules` directory. CloudLinux may create a separate `node_modules` link at the application root; nesting the packaged dependencies avoids that conflict. The complete runtime needs no npm install on the hosting server.

## Isolate the new application

Before deploying, record existing domains, document roots, and application registrations. Use a new application directory outside existing project directories and a dedicated document root for the requested subdomain. Extract the release only into the newly created application directory.

In **Setup Node.js App**, use:

| Setting | Value |
| --- | --- |
| Node.js | 22.23.3 |
| Application mode | Production |
| Application root | The new dedicated directory, relative to the cPanel home |
| Application URL | `itrahub.i-success.net`, with `/` as its URL path |
| Startup file | `app.js` |

The wrapper starts the generated Next.js server from `runtime/`. Use the selector's controls only for this application. Preserve all existing domain mappings, document roots, databases, application registrations, and files. DNS and TLS changes should apply only to the new subdomain.

## Verify a deployment

Confirm DNS resolves to the intended hosting server and the TLS certificate covers `itrahub.i-success.net`. Check the login, demo login flow, application navigation, stylesheet and script loading, and direct access to Budget URLs. Recheck the existing sites and domain mappings against the recorded baseline.

To check HTTP routes and production assets:

```bash
ITRAHUB_VERIFY_URL=https://itrahub.i-success.net node deployment/cpanel/verify.mjs
```

This verifies delivery of the current UI demo. It does not add real authentication or implement the unfinished finance modules. Resource capacity should be measured after deployment; a successful startup alone is not a load test.
