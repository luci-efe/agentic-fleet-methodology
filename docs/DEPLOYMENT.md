# Deployment

## Recommendation

Deploy the existing app as an **assets-only Cloudflare Worker** named
`agentic-fleet-methodology`, serving Vite's `dist/` directory. Publish it at
**`methodology.fernandoramos.work`** in the personal Cloudflare account.

This repository is a static Vite + React SPA: it has no TanStack Start,
server routes, secrets, or data bindings. A Worker with Static Assets is the
smallest Wrangler-managed deployment that preserves a direct upgrade path to
TanStack Start. Do not add TanStack Start, a Worker script, a database, or a
CI credential for this site.

Cloudflare's current Wrangler configuration permits `main` to be omitted for
an assets-only Worker. `assets.not_found_handling` must be
`"single-page-application"` if future client-side routes need to resolve to
`index.html`; it is harmless for the current hash-anchor page.

## One-time repository change (when deployment is approved)

Install Wrangler as a dev dependency and add this configuration. Set
`compatibility_date` to the deployment date, rather than copying this example
unchanged.

```bash
bun add -d wrangler
```

```jsonc
// wrangler.jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "agentic-fleet-methodology",
  "compatibility_date": "2026-07-10",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}
```

Add the minimal scripts:

```json
{
  "scripts": {
    "deploy": "bun run build && wrangler deploy",
    "cf-typegen": "wrangler types"
  }
}
```

`wrangler deploy` creates an assets-only Worker and provides a
`*.workers.dev` URL for verification. Use interactive `wrangler login` only
from a developer machine; do not put account tokens in the repository.

## Subdomain rollout plan

1. Build and verify locally:

   ```bash
   bun run test:content
   bun run build
   bunx wrangler deploy
   ```

2. Confirm the generated `*.workers.dev` URL loads and that a static asset
   (for example `/favicon.svg`) returns successfully.
3. In the personal Cloudflare account, open **Workers & Pages** →
   `agentic-fleet-methodology` → **Settings** → **Domains & Routes**, then add
   the custom domain `methodology.fernandoramos.work`.
4. Let Cloudflare create and proxy the DNS record and provision the TLS
   certificate. Do not create a duplicate DNS record manually.
5. Verify `https://methodology.fernandoramos.work` and a deep-link URL before
   announcing it. Roll back by removing the custom-domain association; the
   `workers.dev` deployment remains available for diagnosis.

Use one production Worker and its deployment history for rollback. Add preview
subdomains or CI deployment credentials only when there is a real review or
continuous-deployment requirement.

## TanStack Start upgrade path (not part of this deployment)

If the site later needs server functions or SSR, migrate then to TanStack
Start's official Cloudflare Workers integration. The current requirements are:

- add `@tanstack/react-start`, `@cloudflare/vite-plugin`, and `wrangler`;
- configure Vite in this order: `cloudflare({ viteEnvironment: { name:
  "ssr" } })`, `tanstackStart()`, then React;
- use a `wrangler.jsonc` with `main:
  "@tanstack/react-start/server-entry"`, a current `compatibility_date`, and
  `compatibility_flags: ["nodejs_compat"]`;
- deploy with `vite build` followed by `wrangler deploy`.

That is a different application runtime, so it should be introduced only with
an actual server-side requirement.

## Sources checked on 2026-07-10

- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
  — assets-only Workers, SPA fallback, and routing behavior.
- [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)
  — required configuration and the assets-only `main` exception.
- [TanStack Start hosting guide](https://tanstack.com/start/latest/docs/framework/react/guide/hosting)
  — official Cloudflare Vite plugin and Wrangler integration.
