import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Check, CirclePause, CirclePlay, Eye, GitBranch, MessageSquareText, RotateCcw, ShieldCheck, Sparkles, TerminalSquare } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import './App.css'

type AgentState = 'queued' | 'working' | 'review' | 'done'
type Agent = { id: string; harness: string; role: string; model: string; state: AgentState; note: string; tab: string }

const timeline: Agent[][] = [
  [
    { id: 'raven-01', harness: 'Claude Code', role: 'Explore', model: 'Opus', state: 'working', note: 'Mapping architecture and hidden constraints', tab: 'Research' },
    { id: 'raven-02', harness: 'Codex', role: 'Build', model: 'GPT-5.6', state: 'queued', note: 'Waiting for the architecture map', tab: 'Build' },
    { id: 'raven-03', harness: 'Hermes', role: 'Review', model: 'Luci', state: 'queued', note: 'Waiting for an implementation diff', tab: 'Review' },
    { id: 'raven-04', harness: 'OMP', role: 'Verify', model: 'Seshat', state: 'queued', note: 'Waiting for runnable evidence', tab: 'Verify' },
  ],
  [
    { id: 'raven-01', harness: 'Claude Code', role: 'Explore', model: 'Opus', state: 'done', note: 'Architecture map delivered with 3 risks', tab: 'Research' },
    { id: 'raven-02', harness: 'Codex', role: 'Build', model: 'GPT-5.6', state: 'working', note: 'Implementing in feat/mission-raven-02', tab: 'Build' },
    { id: 'raven-03', harness: 'Hermes', role: 'Review', model: 'Luci', state: 'queued', note: 'Reading the research pane directly', tab: 'Review' },
    { id: 'raven-04', harness: 'OMP', role: 'Verify', model: 'Seshat', state: 'queued', note: 'Test plan prepared', tab: 'Verify' },
  ],
  [
    { id: 'raven-01', harness: 'Claude Code', role: 'Explore', model: 'Opus', state: 'done', note: 'Answering a direct question from Hermes', tab: 'Research' },
    { id: 'raven-02', harness: 'Codex', role: 'Build', model: 'GPT-5.6', state: 'review', note: 'Diff ready in an isolated worktree', tab: 'Build' },
    { id: 'raven-03', harness: 'Hermes', role: 'Review', model: 'Luci', state: 'working', note: 'Reviewing the diff and messaging Codex', tab: 'Review' },
    { id: 'raven-04', harness: 'OMP', role: 'Verify', model: 'Seshat', state: 'working', note: 'Running tests and browser verification', tab: 'Verify' },
  ],
  [
    { id: 'raven-01', harness: 'Claude Code', role: 'Explore', model: 'Opus', state: 'done', note: 'Architecture evidence retained', tab: 'Research' },
    { id: 'raven-02', harness: 'Codex', role: 'Build', model: 'GPT-5.6', state: 'done', note: 'Patch revised after peer review', tab: 'Build' },
    { id: 'raven-03', harness: 'Hermes', role: 'Review', model: 'Luci', state: 'done', note: 'Review approved with evidence', tab: 'Review' },
    { id: 'raven-04', harness: 'OMP', role: 'Verify', model: 'Seshat', state: 'done', note: 'Tests and browser checks passed', tab: 'Verify' },
  ],
]

const laws = [
  ['01', 'Observable by default', 'Every agent has an address, a visible terminal, readable output, and a status. If you cannot inspect an agent, you cannot improve it.'],
  ['02', 'Autonomous by design', 'Agents coordinate directly and keep moving without human copy-paste. They escalate only real questions, decisions, credentials, and blockers.'],
  ['03', 'Evidence before confidence', 'Code is not complete because an agent says so. Diffs, tests, reviews, browser state, and artifacts are the definition of done.'],
  ['04', 'Context must continue', 'Memory, durable sessions, and automatic handoff preserve intent. Context limits become a relay point—not a cliff.'],
  ['05', 'Plural intelligence', 'Harnesses and models are interchangeable specialists. The system routes work by capability instead of pledging allegiance to one vendor.'],
  ['06', 'Human sovereignty', 'Autonomy serves judgment. Humans retain control of direction, destructive actions, publishing, credentials, and final acceptance.'],
]

const loop = [
  ['Frame', 'Define the mission, constraints, ownership, and proof required.'],
  ['Decompose', 'Turn the mission into bounded roles and dependency-aware work.'],
  ['Dispatch', 'Launch specialists with isolated worktrees and full operational context.'],
  ['Collaborate', 'Let workers read and message each other without routing every thought through a manager.'],
  ['Verify', 'Run tests, inspect diffs, review in Zed, and prove interfaces in a real browser.'],
  ['Integrate', 'Accept evidence, merge deliberately, and retain durable memory for the next mission.'],
]

const stack = [
  ['Odin', 'Mission control', 'Plans, launches, monitors, recovers, and hands sessions forward.'],
  ['Herdr', 'Visible substrate', 'Persistent workspaces, addressable panes, direct messaging, and reattachment.'],
  ['OmniRoute', 'Model bus', 'Capability-based routing across providers and subscriptions.'],
  ['Hindsight', 'Durable memory', 'Shared verified facts without dragging entire transcripts forward.'],
  ['Cua', 'Interface evidence', 'Persistent browsers, recordings, screenshots, and real DOM verification.'],
  ['Zed', 'Human review surface', 'Open any worker worktree directly for fast diff and code review.'],
]

function FleetSimulator() {
  const [frame, setFrame] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [selected, setSelected] = useState('raven-02')
  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => setFrame((value) => (value + 1) % timeline.length), 2400)
    return () => window.clearInterval(timer)
  }, [playing])
  const agents = timeline[frame]
  const active = useMemo(() => agents.find((agent) => agent.id === selected) ?? agents[0], [agents, selected])
  return (
    <Card className="fleet-console" id="command-center">
      <CardHeader className="console-header">
        <div>
          <Badge variant="outline"><span className="live-dot" /> deterministic simulation</Badge>
          <CardTitle>Mission: prove the change</CardTitle>
          <CardDescription>workspace / odin-methodology · 4 workers · phase {frame + 1}/4</CardDescription>
        </div>
        <div className="console-actions">
          <Tooltip><TooltipTrigger render={<Button variant="ghost" size="icon" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause simulation' : 'Play simulation'} />}>
            {playing ? <CirclePause /> : <CirclePlay />}
          </TooltipTrigger><TooltipContent>{playing ? 'Pause' : 'Play'}</TooltipContent></Tooltip>
          <Button variant="ghost" size="icon" onClick={() => setFrame(0)} aria-label="Reset simulation"><RotateCcw /></Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="agent-grid">
          {agents.map((agent) => <button className="agent-row" data-state={agent.state} data-selected={selected === agent.id} key={agent.id} onClick={() => setSelected(agent.id)}>
            <span className="agent-mark">{agent.id.slice(-2)}</span>
            <span><strong>{agent.harness}</strong><small>{agent.role} · {agent.model}</small></span>
            <Badge variant={agent.state === 'done' ? 'default' : 'secondary'}>{agent.state}</Badge>
          </button>)}
        </div>
        <div className="activity-line"><span className="prompt">›</span><div><small>{active.id} / {active.tab}</small><p>{active.note}</p></div></div>
        <div className="console-footer"><span>direct channel open</span><span>worktrees isolated</span><span>evidence retained</span></div>
      </CardContent>
    </Card>
  )
}

function App() {
  return <TooltipProvider>
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top"><span>AE</span> Agentic Engineering</a>
        <div className="nav-links"><a href="#principles">Principles</a><a href="#operating-model">Operating model</a><a href="#stack">System</a></div>
        <Button render={<a href="https://github.com/luci-efe/odin" target="_blank" rel="noreferrer" />}>Explore Odin <ArrowUpRight data-icon="inline-end" /></Button>
      </nav>

      <section className="hero" id="top">
        <div className="strands" data-fallback="#07101c" aria-hidden="true" />
        <div className="hero-scrim" />
        <div className="hero-copy">
          <p className="kicker">A point of view by Fernando Ramos · Agentic Engineering</p>
          <h1>Engineering changes when agents can see <em>each other.</em></h1>
          <p className="hero-lede">A methodology for building with autonomous AI fleets without surrendering visibility, judgment, or proof.</p>
          <div className="hero-actions"><Button size="lg" render={<a href="#principles" />}>Adopt the methodology <ArrowUpRight data-icon="inline-end" /></Button><Button size="lg" variant="outline" render={<a href="#command-center" />}>Enter mission control</Button></div>
          <div className="hero-proof"><span><Eye /> visible work</span><span><MessageSquareText /> direct collaboration</span><span><ShieldCheck /> verified outcomes</span></div>
        </div>
        <FleetSimulator />
      </section>

      <section className="thesis section-shell">
        <p className="section-index">The thesis</p>
        <div><h2>Stop operating agents as chat windows.</h2><p className="display-copy">The human should not be a clipboard between isolated intelligences. Build an environment where agents can work, coordinate, recover, and preserve context—while every consequential action remains inspectable.</p></div>
      </section>

      <section className="principles section-shell" id="principles">
        <header className="section-heading"><p className="section-index">Six operating laws</p><h2>Autonomy you can<br />actually trust.</h2></header>
        <div className="law-list">{laws.map(([number, title, text]) => <article className="law" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="operating section-shell" id="operating-model">
        <header className="section-heading"><p className="section-index">The operating model</p><h2>From intent to evidence.</h2><p>Autonomy is not an infinite loop. It is a legible system with handoffs, boundaries, and proof.</p></header>
        <div className="loop-rail">{loop.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>

      <section className="review section-shell">
        <div className="review-copy"><p className="section-index">Human review</p><h2>The editor is the truth surface.</h2><p>Agents can move quickly; acceptance should remain deliberate. Every worker owns an isolated branch and worktree. Odin can open that exact worktree in Zed, where the human reviews structure, diffs, tests, and consequences—not a summary of them.</p><div className="review-command"><TerminalSquare /><code>/fleet-review raven-02</code><span>opens Zed</span></div></div>
        <div className="diff-window" aria-label="Illustrative code review diff"><header><span className="traffic">● ● ●</span><span>feat/mission-raven-02 · Zed</span></header><pre><span className="muted">@@ orchestration/recovery.ts</span>{'\n'}<span className="minus">- restart(worker)</span>{'\n'}<span className="plus">+ await verifyReplacement(worker)</span>{'\n'}<span className="plus">+ await preserveEvidence(worker)</span>{'\n'}<span className="plus">+ restart(worker, {'{'} rollback: true {'}'})</span></pre><footer><Check /> reviewed by human · tests attached</footer></div>
      </section>

      <section className="system section-shell" id="stack">
        <header className="section-heading"><p className="section-index">The system</p><h2>One control plane.<br />Many intelligences.</h2></header>
        <Tabs defaultValue="architecture" className="system-tabs">
          <TabsList><TabsTrigger value="architecture">Architecture</TabsTrigger><TabsTrigger value="boundaries">Human boundaries</TabsTrigger><TabsTrigger value="continuity">Continuity</TabsTrigger></TabsList>
          <TabsContent value="architecture"><div className="stack-grid">{stack.map(([name, role, text]) => <Card key={name}><CardHeader><Badge variant="outline">{role}</Badge><CardTitle>{name}</CardTitle></CardHeader><CardContent><p>{text}</p></CardContent></Card>)}</div></TabsContent>
          <TabsContent value="boundaries"><div className="boundary-grid"><article><ShieldCheck /><h3>Agents proceed</h3><p>Read, edit, test, review, message peers, recover sessions, and gather evidence inside their owned scope.</p></article><article><MessageSquareText /><h3>Humans decide</h3><p>Credentials, destructive operations, publication, global configuration, ambiguous product trade-offs, and final acceptance.</p></article></div></TabsContent>
          <TabsContent value="continuity"><div className="continuity"><GitBranch /><div><h3>A mission should outlive a context window.</h3><p>At 80% context, Odin creates an evidence-rich handoff and continues in a replacement session. Durable terminals and verified memory keep the fleet from restarting intellectually every time a model fills its context.</p></div></div></TabsContent>
        </Tabs>
      </section>

      <section className="contrast section-shell"><p className="section-index">Not vibe coding</p><div className="contrast-grid"><article><span>Vibe coding asks</span><h3>“Did the agent produce something?”</h3></article><article><span>Agentic engineering asks</span><h3>“Can we inspect, reproduce, verify, and improve how it was produced?”</h3></article></div></section>

      <section className="cta section-shell"><Sparkles /><p className="section-index">Start with one mission</p><h2>Make the work visible.<br />Then scale the intelligence.</h2><p>Adopt the methodology, inspect the open system behind it, and build fleets that earn autonomy through evidence.</p><div><Button size="lg" render={<a href="https://github.com/luci-efe/odin" target="_blank" rel="noreferrer" />}>Build with Odin <ArrowUpRight data-icon="inline-end" /></Button><Button size="lg" variant="outline" render={<a href="mailto:hello@fernandoramos.work" />}>Talk to Fernando</Button></div></section>

      <footer><div className="wordmark"><span>AE</span> Agentic Engineering</div><p>Designed and engineered by Fernando Ramos.</p><div><a href="https://github.com/luci-efe/odin">Odin</a><a href="https://github.com/Agentic-Engineering-Agency/pi-seshat">Seshat</a><a href="https://github.com/nexu-io/motion-anything">Motion credit</a></div></footer>
    </main>
  </TooltipProvider>
}

export default App
