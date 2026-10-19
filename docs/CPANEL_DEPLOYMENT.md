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

When the new document root sits beneath an existing WordPress site, its parent rewrite rules can intercept Next.js routes. Add the directives from [`deployment/cpanel/document-root.htaccess`](../deployment/cpanel/document-root.htaccess) to the new subdomain's `.htaccess`, keeping cPanel's generated Passenger configuration. Leave the parent site's `.htaccess` unchanged.

## Verify a deployment

Confirm DNS resolves to the intended hosting server and the TLS certificate covers `itrahub.i-success.net`. Check the login, demo login flow, application navigation, stylesheet and script loading, and direct access to Budget URLs. Recheck the existing sites and domain mappings against the recorded baseline.

To check HTTP routes and production assets:

```bash
ITRAHUB_VERIFY_URL=https://itrahub.i-success.net node deployment/cpanel/verify.mjs
```

This verifies delivery of the current UI demo. It does not add real authentication or implement the unfinished finance modules. Resource capacity should be measured after deployment; a successful startup alone is not a load test.

## Deployment record — 19 October 2026

| Item | Recorded result |
| --- | --- |
| Application URL | https://itrahub.i-success.net |
| Application release | `c12ee69c83e1197afce33e9e949cabc32c8b4705` |
| Linux build | [GitHub Actions run 39231596928](https://github.com/davidpalmer257/itrahub-platform/actions/runs/39231596928) |
| Application root | `itrahub-platform-c12ee69`, relative to the cPanel home |
| Document root | `public_html/itrahub.i-success.net` |
| Runtime | Node.js 22.23.3, Production mode, Passenger 6.2.0 |
| TLS | Valid certificate for the bare subdomain and its `www` alias; AutoSSL renewal enabled |
| Browser checks | Desktop and mobile demo login, direct Budget route, command palette, theme, navigation drawer, and logout passed over HTTPS |
| Preservation checks | Existing project file metadata, document roots, parent `.htaccess`, and certificates matched their pre-deployment records |

The application and TLS were verified directly on the hosting server, and HTTPS delivery also passed through Cloudflare DNS. Browser checks used an explicit mapping of the target hostname to the hosting IP with normal certificate validation; they do not establish consistency across every DNS resolver.

**Outstanding provider action:** `ns33.afriregister.com` and `ns9.afriregister.co.ke` return the new A record, but `ns3.afriregister.com` still returns authoritative `NXDOMAIN`. Some networks therefore cannot resolve the site. The cPanel zone contains `itrahub.i-success.net → 2.59.156.218`; this is a nameserver synchronization issue. cPanel-only access does not provide the WHM/root controls needed to synchronize the DNS cluster.

Suggested hosting-provider request:

> Please synchronize the current `i-success.net` DNS zone from `ns33.afriregister.com` / `simba.afriregister.com` (`2.59.156.218`) to `ns3.afriregister.com` (`80.241.213.244`). The latter still serves an older zone and returns NXDOMAIN for `itrahub.i-success.net`; the current A record is `2.59.156.218`. Preserve existing records and nameserver delegation. The application is already deployed and HTTPS works when the current DNS record is used.
