import './App.css'

type Tool = {
  name: string
  role: string
  href: string
}

type Step = {
  title: string
  text: string
}

const tools: Tool[] = [
  { name: 'Herdr', role: 'The durable terminal substrate: persistent workspaces, tabs, panes, labels, status, and local socket control.', href: 'https://herdr.dev/' },
  { name: 'pi / Odin', role: 'The visible operator console: pi plus an Odin theme, status overlay, worktree guard, and OmniRoute provider.', href: 'https://github.com/luci-efe/odin' },
  { name: 'OmniRoute', role: 'The OpenAI-compatible model bus that lets local agents use stable model aliases instead of one-off vendor wiring.', href: 'https://omniroute.agenticengineering.lat' },
  { name: 'omp + pi-seshat', role: 'The engineering harness and Seshat/Ghola workflow: spec, test, implement, verify, review.', href: 'https://github.com/Agentic-Engineering-Agency/pi-seshat' },
  { name: 'Hindsight', role: 'Shared fleet memory so agents can carry context across sessions instead of starting cold every time.', href: 'https://github.com/vectorize-io/hindsight' },
  { name: 'Cua', role: 'Real browser and computer-use verification for UI work that cannot be proven from text alone.', href: 'https://cua.ai/' },
  { name: 'Claude Code', role: 'A high-context coding harness running as one visible Herdr pane in the fleet.', href: 'https://docs.anthropic.com/en/docs/claude-code/getting-started' },
  { name: 'Codex', role: 'A second coding harness beside Claude, Hermes, omp, and pi for parallel implementation and review.', href: 'https://github.com/openai/codex' },
]

const principles: Step[] = [
  { title: 'Visible agents beat invisible jobs', text: 'Every worker lives in a pane you can inspect, interrupt, message, or recover. No mystery daemon eating your task.' },
  { title: 'The terminal is the fleet UI', text: 'Herdr turns terminals into durable, addressable infrastructure: workspace:, tab:, pane:, labels, status, and scrollback.' },
  { title: 'One orchestrator, many harnesses', text: 'Odin/pi routes work to Claude Code, Codex, Hermes, omp, and local tools without pretending one model is always enough.' },
  { title: 'Verification is part of the loop', text: 'The fleet does not stop at generated code. It runs checks, browser probes, and review loops before calling work complete.' },
]

const installSteps: Step[] = [
  { title: 'Install Herdr', text: 'Use the native installer or Homebrew. Do not use the npm package; that name is a placeholder.' },
  { title: 'Install pi and Odin', text: 'Install stock pi, then copy Odin theme and extension files into ~/.pi/agent so every project gets the same console.' },
  { title: 'Wire OmniRoute', text: 'Put the OmniRoute provider in ~/.pi/agent/extensions and expose OMNIROUTE_API_KEY from your shell or command-backed provider config.' },
  { title: 'Add harnesses', text: 'Install Claude Code, Codex, Hermes, and omp. Launch them from Herdr panes, not background scripts.' },
]

const usageSteps: Step[] = [
  { title: 'Create a mission workspace', text: 'Name the workspace after the mission so every pane, transcript, and review belongs to a visible operating room.' },
  { title: 'Split panes by role', text: 'Use labels like pi-code, codex, hermes, omp, and claude-code. The label is the operator map.' },
  { title: 'Send small, inspectable prompts', text: 'Use herdr pane send-text, send-keys, run, read, and wait output or agent-status. Keep the control plane boring.' },
  { title: 'Review in the open', text: 'Agents can read each other’s panes, reuse memory, and hand back evidence instead of only final prose.' },
]

const beats: Step[] = [
  { title: 'Hook', text: 'Close a terminal mid-task, then reattach. The agents are still there because Herdr owns the panes.' },
  { title: 'Stack Tour', text: 'Herdr persists the work, Odin/pi drives it, OmniRoute supplies models, Hindsight stores memory, Cua proves browser behavior.' },
  { title: 'Live Demo 1', text: 'Create a workspace, split panes, launch the harnesses, and show each one responding in place.' },
  { title: 'Live Demo 2', text: 'Ask Odin to dispatch implementation and review work across the visible fleet.' },
  { title: 'Live Demo 3', text: 'Prove the output with a real check: command output, browser state, or reviewer evidence.' },
]

const herdrInstall = `# Linux/macOS script install
curl -fsSL https://herdr.dev/install.sh | sh

# Homebrew
brew install herdr

# Verify
herdr --version`

const piInstall = `# Official pi coding agent package
npm install -g --ignore-scripts @earendil-works/pi-coding-agent

# This Mac also uses bun global successfully
bun add -g @earendil-works/pi-coding-agent

# Verify global OmniRoute model discovery
HOME=$HOME pi --list-models`

const odinInstall = `# Odin is a pi overlay: theme + extensions layered onto stock pi
git clone https://github.com/luci-efe/odin ~/.pi/odin
mkdir -p ~/.pi/agent/themes ~/.pi/agent/extensions
cp ~/.pi/odin/theme/odin.json ~/.pi/agent/themes/
cp ~/.pi/odin/extensions/*.ts ~/.pi/agent/extensions/

# If pi is already open, run /reload or restart pi to see OmniRoute.`

const harnessInstall = `# Claude Code
curl -fsSL https://claude.ai/install.sh | bash

# Codex CLI
npm install -g @openai/codex

# Then verify your local harnesses
claude --version
codex --version
hermes --version
omp --version
pi --version`

const demoScript = `# Create a visible operating room
herdr workspace create --cwd "$PWD" --label "fleet-demo" --no-focus

# Herdr ids are colon-form: workspace: w1, tab: w1:t1, pane: w1:p1
herdr pane split w1:p1 --direction right --ratio 0.5 --cwd "$PWD"
herdr pane split w1:p1 --direction down --ratio 0.5 --cwd "$PWD"
herdr pane rename w1:p1 pi-code
herdr pane rename w1:p2 codex
herdr pane rename w1:p3 hermes

# Launch harnesses in panes
herdr pane run w1:p1 "HOME=$HOME pi --provider omniroute --model auto/smart"
herdr pane run w1:p2 "codex"
herdr pane run w1:p3 "hermes --cli"

# Message and inspect agents
herdr pane send-text w1:p1 "Read the repo and propose the first check."
herdr pane send-keys w1:p1 enter
herdr pane read w1:p1 --source visible --format text
herdr wait output w1:p1 --match "check" --timeout 120000
herdr wait agent-status w1:p2 --status idle --timeout 300000`

function Card({ tool }: { tool: Tool }) {
  return (
    <a className="card" href={tool.href} target="_blank" rel="noreferrer">
      <span>{tool.name}</span>
      <p>{tool.role}</p>
    </a>
  )
}

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <article className="step-card">
      <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
    </article>
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
        <div className="hero-copy">
          <p className="eyebrow">Agentic fleet methodology</p>
          <h1>Run AI agents like an engineering team you can see.</h1>
          <p className="lede">
            A practical operating system for multi-agent software work: durable terminals, visible harnesses, shared memory, model routing, and verification loops that developers can trust.
          </p>
          <div className="hero-actions">
            <a href="#install">Install the stack</a>
            <a href="#usage">Run a fleet</a>
          </div>
        </div>
        <aside className="hero-panel" aria-label="Fleet status snapshot">
          <span>fleet-readiness</span>
          <strong>4/5 agents live</strong>
          <p>Pi, Codex, Hermes, and omp responded in visible Herdr panes. Claude Code was previously verified and is currently usage-limited.</p>
        </aside>
      </section>

      <section id="purpose" className="split-section">
        <div>
          <p className="eyebrow">The Idea</p>
          <h2>Agents should be inspectable, recoverable, and reviewable.</h2>
        </div>
        <div className="rich-copy">
          <p>
            Most agent demos hide the real work behind a spinner. This methodology keeps the work visible. Herdr owns durable panes. Odin/pi coordinates the mission. Harness agents do focused work. Hindsight carries memory. Cua checks real interfaces. OmniRoute keeps model selection flexible.
          </p>
          <p>
            The result is not a chatbot. It is an operating pattern for developers who want parallel AI teammates without losing control of the terminal, the repo, or the evidence trail.
          </p>
        </div>
      </section>

      <section id="architecture">
        <p className="eyebrow">Control plane</p>
        <h2>Architecture</h2>
        <div className="diagram" aria-label="Architecture diagram">
          <div className="node lead">Odin / pi<br /><small>orchestrator + operator console</small></div>
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

      <section id="principles">
        <p className="eyebrow">Operating principles</p>
        <h2>What makes the fleet different</h2>
        <div className="step-grid">{principles.map((step, index) => <StepCard key={step.title} step={step} index={index} />)}</div>
      </section>

      <section id="stack">
        <p className="eyebrow">Tools</p>
        <h2>The Stack</h2>
        <div className="cards">{tools.map((tool) => <Card key={tool.name} tool={tool} />)}</div>
      </section>

      <section id="install">
        <p className="eyebrow">Install & Try It</p>
        <h2>Build the local agent cockpit</h2>
        <p className="section-copy">Start with Herdr and pi, then add Odin, OmniRoute, and the harnesses you want to run. The canonical Herdr protocol lives in the <code>herdr-protocol</code> skill; this page keeps the quick-start commands close.</p>
        <div className="step-grid compact">{installSteps.map((step, index) => <StepCard key={step.title} step={step} index={index} />)}</div>
        <div className="code-grid">
          <CodeBlock title="Herdr 0.7.1 install" code={herdrInstall} />
          <CodeBlock title="pi install" code={piInstall} />
          <CodeBlock title="Odin overlay" code={odinInstall} />
          <CodeBlock title="Harness agents" code={harnessInstall} />
        </div>
      </section>

      <section id="usage">
        <p className="eyebrow">Usage</p>
        <h2>Run a visible fleet</h2>
        <p className="section-copy">The workflow is intentionally simple: create a room, label the workers, launch harnesses, send prompts, read evidence, and wait for status. No hidden scheduler required.</p>
        <div className="step-grid compact">{usageSteps.map((step, index) => <StepCard key={step.title} step={step} index={index} />)}</div>
        <div className="code-grid single">
          <CodeBlock title="Minimal fleet demo" code={demoScript} />
        </div>
      </section>

      <section id="beats">
        <p className="eyebrow">Story</p>
        <h2>The Demo Beats</h2>
        <ol className="timeline">
          {beats.map((step) => (
            <li key={step.title}>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}

export default App
