# Agentic Fleet Methodology

The visual manifesto and interactive companion to Fernando Ramos and Agentic Engineering's point of view on engineering with autonomous AI fleets.

**Live:** <https://agentic.fernandoramos.work>

## Thesis

Agents should be observable, directly addressable, autonomous within clear boundaries, continuous across context windows, and accountable to evidence. The page combines an editorial manifesto with a deterministic mission-control simulation suitable for the accompanying YouTube recording.

## Experience

- Six operating laws for agentic engineering
- Deterministic, pauseable fleet simulation
- Mission lifecycle from intent through verified integration
- Human-review workflow with Odin's Zed integration
- Architecture covering Odin, Herdr, OmniRoute, Hindsight, Cua, and Zed
- Responsive, keyboard-accessible UI with reduced-motion behavior
- `motion-anything` WebGL `strands` hero background, with Apache-2.0 attribution in `public/motion/`
- shadcn/ui source components using semantic design tokens

## Development

```bash
bun install
bun run check
bun run preview
```

The project remains a client-side Vite/React application because the experience requires no application server. Cloudflare Workers Static Assets provides the edge runtime, SPA fallback, TLS, and custom domain without introducing a Node.js server.

## Deployment

```bash
bun run deploy
```

`wrangler.jsonc` targets the personal Cloudflare account and provisions `agentic.fernandoramos.work` as a Worker custom domain. Wrangler authentication and permission to publish to the `fernandoramos.work` zone are required.

## Source material

The editorial strategy and design contract live in:

- `docs/CONTENT-STRATEGY.md`
- `docs/DESIGN-SYSTEM.md`
- `docs/DEPLOYMENT.md`
