import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Eye, GitCompare, MessageCircle, ShieldCheck, Workflow } from 'lucide-react'
import { Button } from '@/components/ui/button'
import './App.css'

const laws = [
  ['Observable by default', 'Every agent is a place you can enter', 'See its terminal, read its reasoning trail, interrupt it, and speak to it directly. An invisible agent cannot be understood or improved.'],
  ['Autonomous by design', 'The human is not a clipboard', 'Workers exchange context and evidence with each other. They continue independently and escalate only blockers, questions, credentials, and consequential decisions.'],
  ['Evidence before confidence', 'Generated is not the same as done', 'Read the code. Inspect the diff. Run the tests. Review the interface in a real browser. Confidence must be earned by evidence.'],
  ['Context must continue', 'Context limits are relay points', 'Durable terminals, shared memory, and automatic handoff preserve intent across sessions. The mission survives the model’s context window.'],
  ['Plural intelligence', 'Use the right intelligence for the work', 'Claude, Codex, Hermes, OMP, Pi, and future harnesses remain interchangeable specialists—not a permanent dependency on one vendor.'],
  ['Human sovereignty', 'Autonomy remains accountable to a human', 'Agents own execution inside explicit boundaries. Humans own direction, destructive actions, publication, credentials, and final acceptance.'],
]

const phases = [
  ['01', 'Frame', 'Define the mission, constraints, owners, and proof required.'],
  ['02', 'Dispatch', 'Give specialists isolated worktrees, roles, dependencies, and full context.'],
  ['03', 'Collaborate', 'Let every worker read and message peers without a human relay.'],
  ['04', 'Review', 'Open the actual worktree in Zed. Read the code and challenge the decisions.'],
  ['05', 'Verify', 'Demand tests, browser evidence, artifacts, and an independent review.'],
  ['06', 'Remember', 'Retain verified knowledge and hand the mission forward before context fills.'],
]

function MotionLayer() {
  useEffect(() => {
    const load = (src: string) => new Promise<void>((resolve) => {
      if (document.querySelector(`script[data-motion="${src}"]`)) return resolve()
      const script = document.createElement('script'); script.src = src; script.dataset.motion = src; script.onload = () => resolve(); document.body.appendChild(script)
    })
    void load('/motion/shaderbg.js').then(() => load('/motion/line-waves.js')).then(() => load('/motion/kinetic-headline.js')).then(() => load('/motion/scroll-reveal.js'))
  }, [])
  return <div className="line-waves" data-fallback="#1535ff" aria-hidden="true" />
}

function LivingSystem() {
  const [focus, setFocus] = useState(0)
  return <div className="system-map" aria-label="Interactive agentic engineering operating model">
    <div className="map-top"><span>Living operating model</span><span>select a principle</span></div>
    <div className="map-stage">
      <svg viewBox="0 0 800 430" aria-hidden="true"><path d="M400 95 L160 285 L290 345 L510 345 L640 285 Z"/><path d="M160 285 L510 345 M640 285 L290 345 M290 345 L400 95 M510 345 L400 95"/></svg>
      <div className="map-node human"><small>Human</small><strong>Direction + judgment</strong></div>
      {['Claude Code','Codex','Hermes','OMP'].map((name,index)=><button key={name} className={`map-node worker n${index+1}`} onClick={()=>setFocus(index)}><small>{name}</small><strong>{['Explore','Build','Review','Verify'][index]}</strong></button>)}
      <div className="map-node odin"><small>Odin</small><strong>Visible coordination</strong></div>
    </div>
    <div className="map-explainer"><span>{String(focus+1).padStart(2,'0')}</span><div><strong>{laws[focus][0]}</strong><p>{laws[focus][2]}</p></div></div>
  </div>
}

function App() {
  return <main>
    <nav><a className="brand" href="#top"><b>AE</b><span>Agentic Engineering</span></a><div><a href="#point-of-view">Point of view</a><a href="#method">Method</a><a href="#system">System</a></div><Button variant="outline" render={<a href="https://github.com/luci-efe/odin" target="_blank" rel="noreferrer" />}>Odin <ArrowUpRight data-icon="inline-end" /></Button></nav>

    <header className="hero" id="top"><MotionLayer/><div className="hero-grid"><div className="hero-copy"><p className="overline">Fernando Ramos · Agentic Engineering</p><h1 data-kinetic>Don’t scale agents you cannot see.</h1><p className="lede">A point of view on autonomous software engineering: visible work, direct collaboration, continuous context, human review, and evidence before confidence.</p><div className="actions"><Button size="lg" render={<a href="#point-of-view" />}>Read the manifesto <ArrowDown data-icon="inline-end" /></Button><Button size="lg" variant="outline" render={<a href="#system" />}>See the operating model</Button></div></div><div className="hero-statement"><span>THE THESIS</span><p>The developer should direct a system of intelligences—not carry messages between chat windows.</p></div></div></header>

    <section className="intro" id="point-of-view" data-reveal><aside><span>01</span><p>Point of view</p></aside><div><h2>Vibe coding optimizes for output.<br/><em>Agentic engineering optimizes the system that produces it.</em></h2><p>More agents do not automatically create more leverage. Without visibility, communication, ownership, review, and recovery, they create a faster form of confusion. The goal is not to remove the engineer. It is to move the engineer upward—from manually transporting context to designing the environment in which good work can happen.</p></div></section>

    <section className="laws" data-reveal><div className="section-title"><span>02</span><h2>Six laws for trustworthy autonomy</h2></div><div className="law-grid">{laws.map(([name,title,text],index)=><article key={name} data-reveal data-reveal-delay={String((index%3)*80)}><span>0{index+1} / {name}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="model" id="system"><div className="model-copy" data-reveal><span>03 / A living system</span><h2>Every worker is visible. Every channel is direct.</h2><p>Odin coordinates the mission, but it is not a communication bottleneck. Agents can inspect and message peers. The human can enter any terminal, open any worktree in Zed, and review the evidence at its source.</p><ul><li><Eye/>Observable terminals and status</li><li><MessageCircle/>Peer-to-peer communication</li><li><GitCompare/>Isolated branches opened in Zed</li><li><ShieldCheck/>Human approval at consequential boundaries</li></ul></div><LivingSystem/></section>

    <section className="method" id="method"><div className="section-title"><span>04</span><h2>The mission loop</h2></div><div className="phase-list">{phases.map(([number,title,text])=><article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="review-band" data-reveal><div><span>THE HUMAN REVIEW LOOP</span><h2>Read the work,<br/>not the report.</h2></div><div><p>Agent summaries are navigation aids, not proof. Odin opens the worker’s exact worktree in Zed so the engineer can inspect architecture, code, tests, and consequences.</p><code>/fleet-review builder-02</code></div></section>

    <section className="continuity"><div className="continuity-number">80%</div><div><span>05 / CONTEXT CONTINUITY</span><h2>A full context window should trigger a handoff—not amnesia.</h2><p>Odin preserves the mission, decisions, branch ownership, evidence, and next action in a replacement session. Hindsight retains verified memory. Herdr keeps every terminal alive. Progress continues without pretending context is infinite.</p></div></section>

    <section className="stack" data-reveal><div className="section-title"><span>06</span><h2>Infrastructure for the point of view</h2></div><div className="stack-line">{[['Odin','orchestration'],['Herdr','visibility + persistence'],['OmniRoute','model plurality'],['Hindsight','verified memory'],['Cua','browser evidence'],['Zed','human review']].map(([name,role])=><div key={name}><strong>{name}</strong><span>{role}</span></div>)}</div></section>

    <section className="closing"><Workflow/><span>AN INVITATION</span><h2>Make the work visible.<br/>Then scale the intelligence.</h2><p>Adopt the methodology. Challenge it. Improve it. Build autonomous systems that make engineers more capable—not less accountable.</p><div className="actions"><Button size="lg" render={<a href="https://github.com/luci-efe/odin" target="_blank" rel="noreferrer" />}>Explore Odin <ArrowUpRight data-icon="inline-end" /></Button><Button size="lg" variant="outline" render={<a href="mailto:fernando@agenticengineering.agency" />}>fernando@agenticengineering.agency</Button></div></section>

    <footer><a className="brand" href="#top"><b>AE</b><span>Agentic Engineering</span></a><p>A methodology by Fernando Ramos.</p><div><a href="https://github.com/luci-efe/odin">GitHub</a><a href="mailto:fernando@agenticengineering.agency">Contact</a></div></footer>
  </main>
}
export default App
