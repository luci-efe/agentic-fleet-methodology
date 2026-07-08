import './App.css'

type Tool = {
  name: string
  role: string
  href: string
}

const tools: Tool[] = [
  { name: 'Herdr', role: 'Persistent terminal workspaces, tabs, panes, and agent state over a local Unix socket.', href: 'https://herdr.dev/' },
  { name: 'pi / Odin', role: 'The orchestrator: a pi configuration layer that turns fleet requests into Herdr actions.', href: 'https://github.com/earendil-works/pi' },
  { name: 'OmniRoute', role: 'OpenAI-compatible model bus at https://omniroute.agenticengineering.lat/v1.', href: 'https://omniroute.agenticengineering.lat' },
  { name: 'omp + pi-seshat', role: 'Fernando’s engineering harness and Seshat/Ghola orchestration extensions.', href: 'https://github.com/Agentic-Engineering-Agency/pi-seshat' },
  { name: 'Hindsight', role: 'Shared memory server: fr-fleet for the fleet, fr-odin private to the orchestrator.', href: 'https://github.com/vectorize-io/hindsight' },
  { name: 'Cua', role: 'Cloud computer-use environment for persistent browser verification.', href: 'https://cua.ai/' },
  { name: 'Claude Code', role: 'Anthropic harness agent running inside a Herdr pane.', href: 'https://docs.anthropic.com/en/docs/claude-code/getting-started' },
  { name: 'Codex', role: 'OpenAI harness agent running beside Claude and omp workers.', href: 'https://help.openai.com/en/articles/11096431' },
]

const beats = [
  ['Hook', 'Close a terminal mid-task, then reattach: visible agents survive because Herdr panes live in the server.'],
  ['Stack Tour', 'Herdr for persistence, OmniRoute for models, Odin/pi for orchestration, harness agents for work.'],
  ['Live Demo 1', 'Basic Herdr loop: workspace, tab, pane, detach, reattach from another terminal or SSH session.'],
  ['Live Demo 2', 'Odin spawns a fleet: omp, Claude Code, Codex, and Hermes in a Herdr grid.'],
  ['Live Demo 3', 'OmniRoute swaps model aliases live; fallback is real infrastructure, not a scripted guarantee.'],
  ['Live Demo 4', 'Agents talk through Herdr panes and Hindsight, not just through the orchestrator.'],
  ['Showstopper', 'Repeat close-and-reattach as the difference CMUX cannot match.'],
]

const herdrInstall = `# Linux/macOS script install
curl -fsSL https://herdr.dev/install.sh | sh

# Homebrew
brew install herdr

# Do not use npm: the npm "herdr" package is a placeholder, not the tool.`

const piInstall = `# Official pi coding agent package
npm install -g --ignore-scripts @earendil-works/pi-coding-agent

# Local machine also verified pi installed via bun global:
bun add -g @earendil-works/pi-coding-agent`

const odinInstall = `# Odin is a pi overlay, not an .omp change
git clone https://github.com/Agentic-Engineering-Agency/odin-pi ~/.pi/odin
mkdir -p ~/.pi/agent
cp -R ~/.pi/odin/.pi/* ~/.pi/agent/`

const harnessInstall = `# Claude Code: current native installer
curl -fsSL https://claude.ai/install.sh | bash
# npm remains documented but Anthropic now recommends native installers:
npm install -g @anthropic-ai/claude-code

# Codex CLI
npm install -g @openai/codex`

const demoScript = `# Start or attach the demo session; session is selected out of band, not in pane ids.
herdr --session fleet

# Build the workspace -> tab -> pane layout.
herdr workspace create --cwd "$PWD" --label "agentic-fleet" --focus
herdr tab create --workspace w1 --cwd "$PWD" --label "harnesses" --focus
herdr pane split w1:p1 --direction right --ratio 0.5 --cwd "$PWD"
herdr pane split w1:p1 --direction down --ratio 0.5 --cwd "$PWD"

# Run agents. Public ids are colon-form: workspace w1, tab w1:t1, panes w1:p1...
herdr pane run w1:p1 "claude"
herdr pane run w1:p2 "codex"
herdr pane send-text w1:p1 "Read the repo and report the plan."
herdr pane send-keys w1:p1 enter
herdr pane read w1:p1 --source recent-unwrapped --format text
herdr wait output w1:p2 --match "ready" --source detection --timeout 30000
herdr wait agent-status w1:p1 --status idle --timeout 300000`

function Card({ tool }: { tool: Tool }) {
  return (
    <a className="card" href={tool.href} target="_blank" rel="noreferrer">
      <span>{tool.name}</span>
      <p>{tool.role}</p>
    </a>
  )
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <figure className="code-card">
      <figcaption>{title}</figcaption>
      <pre><code>{code}</code></pre>
    </figure>
  )
}

function App() {
  return (
    <main>
      <section className="hero-section" id="the-idea">
        <p className="eyebrow">Agentic fleet methodology</p>
        <h1>The Idea</h1>
        <p className="lede">
          One orchestrator, Odin/pi, commands harness agents in Herdr panes. OmniRoute routes models, Hindsight carries shared memory, and Cua supplies browser verification when the work needs a real UI.
        </p>
        <div className="hero-actions">
          <a href="#install">Install & Try It</a>
          <a href="https://github.com/earendil-works/pi" target="_blank" rel="noreferrer">Odin repo pointer</a>
        </div>
      </section>

      <section id="architecture">
        <p className="eyebrow">Control plane</p>
        <h2>Architecture</h2>
        <div className="diagram" aria-label="Architecture diagram">
          <div className="node lead">Odin / pi<br /><small>orchestrator</small></div>
          <div className="bus">Herdr socket API<br /><small>workspace: w1 · tab: w1:t1 · pane: w1:p1</small></div>
          <div className="grid">
            <div className="node">Claude Code</div>
            <div className="node">Codex</div>
            <div className="node">Hermes</div>
            <div className="node">omp</div>
          </div>
          <div className="services">
            <div>OmniRoute<br /><small>model routing</small></div>
            <div>Hindsight<br /><small>memory</small></div>
            <div>Cua<br /><small>browser checks</small></div>
          </div>
        </div>
      </section>

      <section id="stack">
        <p className="eyebrow">Tools</p>
        <h2>The Stack</h2>
        <div className="cards">{tools.map((tool) => <Card key={tool.name} tool={tool} />)}</div>
      </section>

      <section id="install">
        <p className="eyebrow">Copy-paste guide</p>
        <h2>Install & Try It</h2>
        <p className="section-copy">Herdr protocol details live in the Odin/pi skill <code>herdr-protocol</code>; this page only points to the correct verbs and ids.</p>
        <div className="code-grid">
          <CodeBlock title="Herdr 0.7.1 install" code={herdrInstall} />
          <CodeBlock title="pi / Odin install" code={piInstall} />
          <CodeBlock title="Odin overlay" code={odinInstall} />
          <CodeBlock title="Claude Code + Codex" code={harnessInstall} />
          <CodeBlock title="Minimal fleet demo" code={demoScript} />
        </div>
      </section>

      <section id="beats">
        <p className="eyebrow">Video shape</p>
        <h2>The Demo Beats</h2>
        <ol className="timeline">
          {beats.map(([title, text]) => (
            <li key={title}>
              <strong>{title}</strong>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}

export default App
