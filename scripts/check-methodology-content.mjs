import { readFileSync } from 'node:fs'

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')
const css = readFileSync(new URL('../src/App.css', import.meta.url), 'utf8')
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')

const mustInclude = [
  'Observable by default', 'Autonomous by design', 'Evidence before confidence',
  'Context must continue', 'Plural intelligence', 'Human sovereignty',
  'Herdr', 'Odin', 'OmniRoute', 'Hindsight', 'Cua', 'Zed',
  'Claude Code', 'Codex', 'Hermes', 'OMP', '/fleet-review',
  'deterministic simulation', 'Not vibe coding', 'Agentic Engineering',
]
const missing = mustInclude.filter((text) => !app.includes(text))
const requiredAccessibility = ['prefers-reduced-motion', ':focus-visible']
const missingAccessibility = requiredAccessibility.filter((text) => !css.includes(text))
const requiredMetadata = ['og:title', 'description', 'theme-color']
const missingMetadata = requiredMetadata.filter((text) => !html.includes(text))

if (missing.length || missingAccessibility.length || missingMetadata.length) {
  throw new Error([
    'Methodology page contract failed',
    missing.length ? `Missing content: ${missing.join(', ')}` : '',
    missingAccessibility.length ? `Missing accessibility: ${missingAccessibility.join(', ')}` : '',
    missingMetadata.length ? `Missing metadata: ${missingMetadata.join(', ')}` : '',
  ].filter(Boolean).join('\n'))
}
