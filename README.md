# Agentic Fleet Methodology

Single-page React explainer for the agentic-fleet video methodology: Odin/pi orchestrates harness agents in Herdr panes, routes models through OmniRoute, shares memory through Hindsight, and verifies browser work with Cua.

## Stack

- Vite + React + TypeScript
- Tailwind via `@tailwindcss/vite`
- shadcn/ui conventions hand-rolled for the few needed primitives: Card, Tabs-shaped sectioning, and CodeBlock
- Bun package manager

TanStack Router is intentionally skipped: this is one page with hash anchors, so a router would add code without buying navigation.

## Run

```bash
bun install
bun run test:content
bun run build
bun dev
```

## Accuracy notes

- Herdr snippets use the verified Herdr 0.7.1 object model: `workspace -> tab -> pane`, with colon ids like `w1:p1`.
- Correct pane verbs shown: `herdr pane run`, `herdr pane send-text`, `herdr pane send-keys`, `herdr pane read`, `herdr wait output`, and `herdr wait agent-status`.
- Herdr protocol details are not duplicated here; keep the canonical text in Odin/pi's `herdr-protocol` skill.
