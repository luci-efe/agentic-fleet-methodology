# Content Strategy — Agentic Fleet Methodology

> Mission: methodology-redesign  
> Author role: editorial-strategist  
> Branch: feat/content-strategy  
> Written: 2026-07-10

---

## 1. The Original Pillars

These are Fernando's core engineering convictions as expressed across the video planning
documents and the methodology site. They are not slogans — they are commitments that
every piece of content must honor and that the live demo must prove.

### 1.1 Visible agents beat invisible jobs

A worker you cannot see is a worker you cannot improve. Every harness agent in the fleet
lives in a named Herdr pane. You can read it, interrupt it, send it a message, or hand
its task to a replacement — all without touching the agent's internals. The pane is the
unit of accountability.

Source axiom (from IndyDevDan, adopted as doctrine):
> "An agent you cannot see is an agent you cannot improve."

### 1.2 The terminal is the fleet UI

A terminal multiplexer is not a convenience. It is infrastructure. Herdr promotes the
terminal to a durable, addressable operating room: `workspace → tab → pane`, stable
colon-form addresses (`w1:p1`), scrollback that outlives the window. The label on a pane
is the operator map. No hidden scheduler, no mystery daemon.

### 1.3 One orchestrator, many harnesses

No single model is always the right choice. Pi/Odin sits at the top of the hierarchy not
to pick one winner but to route work intelligently — Claude Code, Codex, Hermes, omp —
through OmniRoute's stable model aliases. Swapping the model behind an alias does not
change the orchestration code. That is model-agnosticism with teeth.

### 1.4 Persistence is not optional

Sessions that die on window close are not usable infrastructure. Herdr keeps every pane
alive on the server. Close your laptop mid-task, SSH in from another machine, reattach
with `herdr session attach odin`, and the agents are still there. This is the single
hardest constraint CMUX/Ghostty cannot satisfy, and it is the video's strongest live
proof.

### 1.5 Memory makes orchestration cumulative

An orchestrator that starts cold every run cannot learn from its own history. Pi uses
Hindsight (bank `fr-odin` for Pi private, `fr-fleet` for shared fleet decisions) to
recall which harness/model/fleet-size combinations worked on past tasks before composing
a new fleet. That recall moment — visible on camera — is something IDD's CMUX demo
cannot replicate.

### 1.6 Verification closes the loop

Code generation is not completion. The fleet does not mark work done until it can prove
the output: a command check, a browser state assertion via Cua, or a reviewer's evidence
trail. Verification is part of the workflow, not an optional step at the end.

---

## 2. Manifesto Narrative

### The core tension

The AI engineering moment has two failure modes. The first is ignoring agents entirely —
treating them as toys not worth serious infrastructure investment. The second is the one
Fernando's work directly opposes: **vibe coding** — spinning up agents in unmonitored
loops, hoping outputs are correct, and shipping before anything is verified.

The manifesto is not against automation. It is against *invisible* automation.

### The central claim

> Agentic engineering means treating AI agents as precise engineering components that
> must be actively observed, evaluated, and iteratively optimized.

That claim has three corollaries that the methodology site and the video both deliver:

1. **Observability first.** You cannot optimize what you cannot see. Herdr panes,
   the Pi status board, and the review-not-trust protocol all serve the same goal:
   keep the fleet legible to its operator at every moment.

2. **Scale compute to scale impact.** Throwing one agent at a problem is a starting
   point. Throwing five — each with 1M tokens of context, each specialized, each
   visible, each addressable — is the lever. That aggregate is the engineering bet.

3. **Genuine differentiation, not re-skins.** The fleet methodology is not a renamed
   CMUX implementation. Each design choice maps to a real constraint the prior art
   cannot satisfy: Herdr's persistence, OmniRoute's model bus, Hindsight's memory,
   Pi's warm orchestration. If a ghola's implementation turns out to be a thin wrapper
   that just renames CMUX verbs, it should be flagged and reworked — that would
   undermine the whole positioning.

### The differentiation table (content spine)

| IDD / CMUX | Agentic Fleet (Fernando's stack) |
|---|---|
| macOS only | Linux, macOS, SSH — wherever Herdr runs |
| Sessions die on window close | Herdr keeps sessions alive on the server |
| Manual model switching | OmniRoute model-alias routing |
| Generic orchestrator, cold start every run | Pi/Odin with persistent Hindsight memory |
| No subscription centralization | OmniRoute centralizes subscriptions behind one endpoint |
| Native in-app browser pane | Cua: persistent, programmable, headless-first browser |

This table is the internal spine for any public-facing comparison: blog post, slide
deck, or video narration. Every claim needs a live proof in the recording.

---

## 3. Audience Positioning — Primero.ai

### Context

The Primero.ai job application followed an interview that "felt lukewarm." The video is
not primarily a YouTube play. It is the technical signal that reframes Fernando as
someone who builds *systems*, not just demos. The target reader at Primero.ai is
senior technical leadership who evaluates whether a candidate thinks at infrastructure
level.

### What Primero.ai is evaluating

Inference from context: an AI company hiring at this level wants evidence of:

- Infrastructure thinking (not just prompt crafting)
- Ability to compose complex systems from real tools, not toy examples
- Judgment about when to abstract and when not to
- Discipline: naming things correctly, not duplicating protocol text, isolating concerns
- Ability to operate with parallel agents and maintain coherence across them

### How the content addresses each signal

**Infrastructure thinking** — The stack tour section of the video and the methodology
site both explain *why* each tool occupies its layer. Herdr is not "a terminal" but a
durable substrate. OmniRoute is not "an API proxy" but a model bus that decouples
orchestration from vendor selection. That language signals systems design literacy.

**Real tool composition** — Every demo uses actual installed tools with verified
commands. The video plan explicitly rules out faking or scripting quota-limit events.
The methodology site's install section uses verified Herdr 0.7.1 commands. Primero.ai
readers who know these tools will notice the specificity.

**Judgment about abstraction** — The sharding rule (one canonical `herdr-protocol`
skill, pointer lines everywhere, never duplicated text) and Pi's isolation from `.omp/`
are concrete examples of deliberate architectural discipline. These decisions are
explained in the video, not just present in the code.

**Naming and coherence** — The STATUS v1 envelope, the colon-form pane addresses, the
named worktrees, the mission IDs — all of this signals that Fernando operates with the
kind of coordination hygiene that scales to team-level work.

**Parallel agent coherence** — The bidirectional comms demo (workers messaging each
other via `herdr pane send-text` + `send-keys enter` without going through Pi) directly
demonstrates flat, peer-level coordination. This is the engineering pattern Primero.ai
likely runs internally.

### What to avoid

The video plan is explicit: **do not state "hire me."** The pitch is structural. A
person who builds this — methodically, with real tools, with visible evidence — is making
a credibility statement by showing up, not by asking. Overstating the connection
to Primero.ai in any public-facing copy would undermine the signal.

### Tone calibration

- Write for someone who will pause the video and read the code.
- Avoid marketing superlatives. Use engineering precision.
- Lead with problems, not features. The cold-open exists because "close your laptop and
  lose your agents" is a real problem Primero.ai engineers will immediately recognize.
- When comparing to CMUX/IDD, acknowledge what he built correctly before explaining
  what this stack changes. The audience will respect that honesty.

---

## 4. Recording Story

### Narrative structure (from `07-video-plan.md`)

The video is 21 minutes. The structure is deliberate and should not be reordered.

#### Hook (0:00–1:30) — the contrast that earns attention

Open on IDD's axiom:
> "An agent you cannot see is an agent you cannot improve."

Then cut to the CMUX failure: close a laptop mid-task, session gone. Now show the
same scenario with Herdr: `herdr session attach odin`, agents still live in their
panes. The cold-open *is* the thesis. The audience either recognizes the problem
immediately (and is hooked) or does not (and is not the audience).

**Acceptance test:** This beat must survive multiple takes. The close-and-reattach must
be rehearsed until it works reliably, not hoped to work on camera.

#### Stack Tour (1:30–5:00) — four-layer mental model

Walk the four layers bottom to top:

1. **Herdr** — the substrate. Persistent panes, stable addresses, socket API.
2. **OmniRoute** — the model bus. Stable aliases over provider churn.
3. **Pi/Odin** — the operator console. Fleet commander, not just a coding agent.
4. **Harness agents** — the workers. Claude Code, Codex, Hermes, omp in visible panes.

The mental model a viewer walks away with: *this is not one agent with a fancy prompt.
This is an engineering operating system with distinct, observable layers.*

#### Live Demos (5:00–18:00) — five proof beats

Each demo must prove a distinct capability that the differentiation table claims.

**Demo 1: Basic Herdr loop** (proves persistence)  
Create a workspace, split panes, launch a harness, read its output. Then detach. Then
reattach from a second terminal or SSH session. The agents never moved; only the
observer reconnected.

**Demo 2: Pi spawning a fleet from natural language** (proves warm orchestration)  
Ask Pi to "spin up two Claude Code, one Codex, one Hermes, give Hermes the lead" in
plain speech. The fleet materializes in Herdr panes with the right harnesses, the
right OmniRoute aliases, and the right config injected at spawn time. This is the
most technically demanding beat and must be generalized — not a fixed template, not
IDD's `just fast CC`. Test it against varied phrasings before recording.

**Demo 3: OmniRoute as model bus** (proves model-agnosticism)  
Swap a model alias live. Show the harnesses resolve through OmniRoute, not hardcoded
vendor keys. If auto-fallback on quota fires naturally during recording, keep the clip.
Do not script or fake it.

**Demo 4: Bidirectional agent comms** (proves flat, peer-level coordination)  
A worker agent uses `herdr pane send-text` + `herdr pane send-keys enter` to reach a
fleet co-worker directly, then reads the response with `herdr pane read`. No relay
through Pi. This is the flat communication proof that differentiates from a rigid
top-down hub.

**Demo 5: Close-and-reattach, repeated** (the showstopper)  
Return to the hook beat for emphasis. The persistence model is the clearest single
constraint CMUX cannot satisfy and the Primero.ai audience is most likely to retain.

#### Philosophy Segment (18:00–21:00) — the implicit pitch

This is not a pitch deck slide. It is a summary of what the demo just proved, mapped
explicitly onto the agentic engineering doctrine:

- **Observability** (status board, visible panes, scrollback)
- **Persistence** (Herdr survive-on-close model)
- **Model-agnosticism** (OmniRoute)
- **Memory** (Hindsight recall before fleet composition)
- **Layered orchestration** (Pi → harnesses → workers)

The Primero.ai signal is implicit. Demonstrating infrastructure-level thinking does
not require stating "hire me." The demo speaks.

### Acceptance criteria for each beat

Before recording:

| Beat | Must demonstrate | Rehearsal requirement |
|---|---|---|
| Hook | Herdr reattach in < 10 sec | 3 successful closes before recording |
| Stack tour | Four-layer verbal walkthrough with pane visible | No reading from notes |
| Demo 1 | Detach and reattach from second terminal | Works over SSH, not just localhost |
| Demo 2 | NL fleet spawn with varied phrasing | 3 phrasings tested, all materialized correctly |
| Demo 3 | Model alias swap visible in output | Works once naturally; do not force quota event |
| Demo 4 | Worker-to-worker message visible in both panes | Read output shown on camera |
| Demo 5 | Second close-and-reattach in < 10 sec | Identical to Demo 1 test |

### Non-goals for the recording

- Do not fake a quota-limit auto-reroute event. Build the capability; let it fire
  if it fires.
- Do not demo anything that only works once. Flakiness on camera is worse than
  omitting a beat.
- Do not rebuild a renamed CMUX. Every showcase must map to a genuinely different
  underlying mechanism. If a ghola's implementation ends up being a thin wrapper,
  flag it before recording.

---

## 5. Brand Voice Notes

- **Company:** Agentic Engineering / Agentic Engineering Agency
- **Domain:** agenticengineering.agency / agenticengineering.lat (OmniRoute)
- **Email:** info@agenticengineering.agency

The brand voice in the methodology site is already calibrated correctly: engineering
precision, no marketing superlatives, concrete command examples, "durable" and
"inspectable" over "powerful" and "amazing." Maintain this in all derivative content
(blog posts, slide decks, video narration scripts).

The operative framing — *agentic engineering vs. vibe coding* — is the axis around
which all positioning rotates. Use it explicitly when differentiating from demos that
show agents as magic and implicitly when describing the methodology's discipline.

---

## 6. Derived Content Sequence

Once the video is recorded and the methodology site is live, the following content
pieces follow naturally from the material already built:

1. **Video** (primary artifact) — the 21-minute demo described in section 4.
2. **Methodology site** (already live at this repo) — the written reference that
   the video points to. Keep it accurate; do not let it diverge from verified commands.
3. **Thread or post** — link drop with the differentiation table as the hook. Lead with
   "what happens when you close your laptop" not "here's my new stack."
4. **Written deep-dive** (optional) — if Primero.ai or another audience asks for a
   written technical walkthrough, the content in `agentic-fleet-video/` files is the
   source. Do not rewrite from scratch; excerpt and structure from those files.

Each piece of content feeds the next. The video is the proof of concept. The site is
the reference. The thread or post is the reach mechanism. The deep-dive is the response
to serious technical interest.

---

*End of content strategy. The source files for every claim here are in
`/Users/fr/code/agentic-fleet-video/` (planning) and
`/Users/fr/code/agentic-fleet-methodology/.worktrees/content/src/App.tsx` (site).*
