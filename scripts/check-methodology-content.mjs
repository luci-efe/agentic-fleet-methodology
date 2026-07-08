import { readFileSync } from 'node:fs'

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')

const mustInclude = [
  'The Idea',
  'Architecture',
  'The Stack',
  'Install & Try It',
  'The Demo Beats',
  'Herdr',
  'pi / Odin',
  'OmniRoute',
  'omp + pi-seshat',
  'Hindsight',
  'Cua',
  'Claude Code',
  'Codex',
  'workspace:',
  'tab:',
  'pane:',
  'send-text',
  'send-keys',
  'run',
  'read',
  'wait',
]

const missing = mustInclude.filter((text) => !app.includes(text))

const missingAny = []
if (!app.includes('output') && !app.includes('agent-status')) {
  missingAny.push('output or agent-status')
}

const obsolete = [
  'workspaceId',
  'tabId',
  'paneId',
  'sendText',
  'sendKeys',
  'runCommand',
  'readOutput',
  'waitForOutput',
  'workspace/',
  'tab/',
  'pane/',
].filter((text) => app.includes(text))

if (missing.length || missingAny.length || obsolete.length) {
  throw new Error([
    'Methodology page contract failed',
    missing.length ? `Missing required content: ${missing.join(', ')}` : '',
    missingAny.length ? `Missing one-of content: ${missingAny.join(', ')}` : '',
    obsolete.length ? `Obsolete Herdr content present: ${obsolete.join(', ')}` : '',
  ].filter(Boolean).join('\n'))
}
