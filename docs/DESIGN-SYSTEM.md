# Agentic Fleet Methodology — Design System

## Direction: The Operations Fieldbook

**Subject:** a practical methodology for operating visible, reviewable software-agent fleets.

**Audience:** engineering leads and senior developers deciding whether a multi-agent workflow is controllable enough to adopt.

**Single job:** make the operating model legible in one screen, then make its evidence and procedure easy to inspect.

The visual direction is an **editorial command center**: less “futuristic dashboard,” more a well-used control-room fieldbook. It combines a measured document grid, concise operator notation, and one live-looking-but-deterministic fleet simulation. The simulation is the page’s thesis: agents are not abstract bubbles; they occupy named panes, take assigned work, produce checks, and hand off evidence.

This replaces the current soft, rounded orange/teal showcase treatment. Do not add generic dashboard KPI tiles, gradient mesh backgrounds, glass cards, terminal-green-on-black clichés, or an ornamental “AI” animation. Density must communicate operating discipline, not visual noise.

### Signature element

The `Mission Board` is a horizontal operational trace: a fixed mission clock at left; an inspectable stack of role lanes in the center; an evidence ledger at right. A single active event travels from the selected role to a corresponding evidence row. Its shape and sequence make the fleet’s protocol understandable without a paragraph of explanation.

## Foundations

### Color tokens

Use CSS custom properties as the source of truth. Color names reflect the fieldbook metaphor; do not substitute raw values in components.

| Token | Value | Use |
| --- | --- | --- |
| `--ink-950` | `#111317` | Main page ground; dark enough for long reading without pure black harshness. |
| `--ink-900` | `#191D22` | Raised simulator and code surfaces. |
| `--ink-800` | `#252B32` | Hover/selected surface and subtle rule backing. |
| `--paper-50` | `#F2F0E9` | Primary high-contrast text and the single light “evidence sheet” surface. |
| `--paper-200` | `#CBC9C0` | Secondary reading text. |
| `--steel-500` | `#86909A` | Labels, inactive metadata, quiet borders. |
| `--blue-500` | `#4D7CFE` | Navigation focus, selected mission, links, and informational state. |
| `--orange-500` | `#ED6A3A` | Human-required decision / blocked state only; never decorative. |
| `--lime-500` | `#B7D84B` | Verified / completed state only; never used for body links. |
| `--rose-500` | `#E85D75` | Failed state only. |
| `--line-subtle` | `rgba(242, 240, 233, 0.14)` | Hairline separators on dark surfaces. |
| `--line-strong` | `rgba(242, 240, 233, 0.30)` | Focused or structural boundaries. |

Status color always travels with a text label and icon/shape. Never communicate status by color alone.

### Typography

Load only these three roles; use the fallbacks below if external fonts are unavailable.

| Role | Family | Weights / use |
| --- | --- | --- |
| Display | `Instrument Serif`, `Iowan Old Style`, Georgia, serif | 400 only. Hero thesis and major section titles; use restraint. |
| Reading | `IBM Plex Sans`, `Avenir Next`, Arial, sans-serif | 400 body; 500 labels and navigation; 600 action text. |
| Utility | `IBM Plex Mono`, `SFMono-Regular`, Consolas, monospace | 400 event data, code, IDs, timestamps, state labels. |

Type scale (desktop → compact):

| Token | Size / line-height | Letter spacing | Use |
| --- | --- | --- | --- |
| `--type-display` | `clamp(3.5rem, 7.2vw, 7.5rem) / 0.88` | `-0.045em` | Page thesis, max 7 words per line. |
| `--type-h1` | `clamp(2.5rem, 4.6vw, 4.5rem) / 0.94` | `-0.035em` | Major section heading. |
| `--type-h2` | `clamp(1.75rem, 2.5vw, 2.5rem) / 1.02` | `-0.025em` | Subsection heading. |
| `--type-body-lg` | `1.25rem / 1.5` | `-0.01em` | Introductory reading copy. |
| `--type-body` | `1rem / 1.6` | `0` | Standard prose. |
| `--type-label` | `0.75rem / 1.2` | `0.11em` | Uppercase navigation, section codes, state labels. |
| `--type-data` | `0.8125rem / 1.45` | `0` | IDs, timestamps, terminal/event rows. |

Use sentence case for actions and headings. Reserve uppercase for stable system labels such as `MISSION`, `EVIDENCE`, and status values. Long prose has a 68ch maximum; utility data may overflow horizontally inside a dedicated scroll region.

### Spacing, layout, and shape

| Token | Value | Use |
| --- | --- | --- |
| `--space-1` … `--space-8` | `4, 8, 12, 16, 24, 32, 48, 72px` | All internal gaps and section rhythm. |
| `--shell-max` | `1440px` | Maximum page width. |
| `--content-max` | `760px` | Reading-column maximum. |
| `--rail` | `184px` | Desktop field-note rail. |
| `--radius-sm` | `4px` | Small controls and code chips only. |
| `--radius-md` | `8px` | Panels; never pill-shaped. |
| `--rule` | `1px` | Every structural boundary. |

At `≥1200px`, use a 12-column grid: 2 columns for the persistent section rail, 7 for main narrative/simulator, and 3 for the evidence ledger. At `768–1199px`, use an 8-column grid and move the ledger below the simulator. Below `768px`, use a single column with a horizontal, scrollable role-lane strip; never shrink the simulator text below `--type-data`.

Surfaces are flat with rules, not floating. Shadows are limited to the active simulation focus (`0 14px 40px rgba(0,0,0,.24)`) and must not appear on every card.

## Page architecture

1. **Masthead / mission index** — compact fixed header: wordmark, `FIELD GUIDE 01`, section links, and an explicit `Open simulator` action. It is a locator, not a marketing nav.
2. **Hero / thesis + Mission Board** — left: the statement “Run agents like a team you can inspect.” Right/below: the full simulation at its first fixture state. One short caption explains the selected mission and its deterministic controls.
3. **Operating principles** — four concise principles presented as annotated protocol clauses, not equal visual cards. Each links to a corresponding simulator concept: pane, role, check, handoff.
4. **Control plane map** — a structural topology diagram: Odin/pi, Herdr, harness roles, model routing, memory, and browser verification. Connections are labelled by the thing that actually moves (`assignment`, `status`, `evidence`, `context`), never by vague arrows.
5. **Stack index** — a dense two-column reference list: tool name, responsibility, proof it contributes, external link. It is a directory, not a logo wall.
6. **Procedure** — install and run instructions with code beside the decision it supports. Use progressive disclosure for platform-specific or advanced commands.
7. **Demo runbook** — the existing demo beats rendered as a timestamped rehearsal checklist; each beat has an observable expected result.

## Mission Board: deterministic fleet simulator UX

The simulator teaches the method. It must be a reproducible state machine, not a fake real-time dashboard.

### Fixtures and state

Ship named fixtures in source, for example:

- `feature-with-review` (default): dispatch → implementation → check → review → done.
- `blocked-dependency`: a worker reaches `blocked`; a human-decision marker becomes explicit.
- `browser-verification`: implementation emits an artifact; Cua verifies the browser state before review.

Each fixture is a static ordered event array with stable IDs, assigned role, timestamp offset, state, artifact pointer, and check result. Use a fixed base time (`09:41:00`) and a deterministic seed shown in the UI (for example `fixture: feature-with-review / seed: 041`). No wall-clock time, network fetching, random IDs, randomized status, or invented “live” availability is allowed.

The legal role state machine is `idle → assigned → working → review → done`, with `blocked` and `failed` as explicit alternate states. Display the state transition in text in every event row. A fixture cannot enter `done` without a check result and artifact pointer. This mirrors the methodology’s evidence requirement and prevents a simulator that only looks operational.

### Controls and behavior

- A visible fixture selector changes scenario and immediately resets its step index to zero.
- `Step event` advances exactly one event. Keyboard: `ArrowRight`; disabled with an explanation at the final event.
- `Run trace` advances at a fixed 1200ms per event; it changes to `Pause trace` while running. It cannot skip events.
- `Reset trace` restores the fixture’s initial state, selected role, event focus, and scroll position. Keyboard: `R` only when focus is inside the simulator.
- Selecting a role filters/highlights its events and related evidence without removing other lanes; `Clear filter` is always visible.
- Selecting an event synchronizes the role lane, event detail, and evidence ledger. On compact layouts, focus moves to the detail panel only after an explicit selection—never during autoplay.
- Pause autoplay on keyboard focus within controls, page visibility loss, and `prefers-reduced-motion`; resume only through a deliberate `Run trace` action.

`Run trace` is a teaching playback, not a claim of real-time system telemetry. Label it exactly as `Replay deterministic trace` in supporting copy. If future data is connected, it must live in a separate `Live session` mode with source, freshness timestamp, and connection state prominent.

### Desktop composition

```text
MISSION / feature-with-review              09:41:00  [Step event] [Run trace] [Reset]
──────────────────────────────────────────────────────────────────────────────────────────
ROLE LANES (7 cols)                                      EVIDENCE LEDGER (3 cols)
┌ Odin ──────────────┐                                  09:41  assignment.md
│ assigned  09:41:00 │── selected event ──────────────▶  PASS  bun test:content
├ Codex ─────────────┤                                  09:43  check output
│ working   09:41:12 │                                  09:44  review note
├ Cua ───────────────┤
│ idle      —        │                                  EVENT DETAIL (below lanes)
└ Reviewer ──────────┘                                  state / owner / artifact / next action
```

Role lanes resemble labeled terminal panes in information structure, not a literal terminal skin. Each has an immutable role name, current state, last event time, and one concise current instruction. The selected lane uses `--blue-500` rule and a 2px inset bar; verified completion uses `--lime-500` only on the state marker.

### Empty, error, and blocked states

- No fixture selected: show `Choose a trace to inspect a fleet decision.` and focus the fixture selector.
- Missing artifact: show the event state but mark evidence `Not recorded`; never substitute plausible text.
- Blocked state: use orange marker, state `Blocked`, named owner, exact required decision, and a `Resume when…` condition.
- Failed check: use rose marker, include the exact failed command/result, and make `Retry from event` explicit if supported.

## Interaction and motion plan

Motion supports causality and feedback, never atmosphere. The approved recipe vocabulary was inspected in `/tmp/motion-anything`; use only the restrained subset below.

| Moment | Recipe / category | Token | Implementation rule |
| --- | --- | --- |
| Event enters the selected lane | `fade-content` / scroll-reveal | `--motion-base: 280ms` `--ease-out` | Opacity + `translateY(8px)` only. Apply to selected event, not every row. |
| Step, select, filter, reset controls | hover-press / state-transition | `--motion-fast: 180ms` `--ease-out` | 1–2px translate or subtle surface change; visible pressed state. |
| Mission status number first appears | `counter` / emphasis | 300ms `--ease-out` | One number only, default fixture only; render the final static number under reduced motion. |
| Evidence relationship | custom continuity transition | `--motion-base: 280ms` `--ease-in-out` | A thin blue connector fades between active event and ledger item; use transform/opacity, not a travelling particle. |
| Hero background | optional `faulty-terminal` / ambient | static or one quiet loop | Only if it remains behind a solid scrim and passes text contrast. One per view, never in content sections; static frame under reduced motion. |

Motion tokens:

```css
--motion-instant: 100ms;
--motion-fast: 180ms;
--motion-base: 280ms;
--motion-slow: 420ms;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
```

No parallax, auto-rotating carousels, cursor trails, typewriter copy, animated gradients, bouncing cards, or celebratory particles. At most three simultaneous entrances and one ambient loop per viewport. Animate only `opacity` and `transform`; remove `will-change` after an animation completes. Respect `prefers-reduced-motion: reduce` by stopping trace autoplay, disabling ambient movement, replacing connector travel with a 100ms crossfade, and rendering all counters as final values.

## Responsive requirements

- **Wide (`≥1200px`):** retain field rail, role lanes, and evidence ledger in one view; simulator height is capped at `min(720px, 78vh)` with independent internal scrolling only for event histories.
- **Medium (`768–1199px`):** remove the fixed rail; keep the simulator header and role lanes together; ledger follows as a full-width ordered list. Do not use a side drawer for evidence.
- **Compact (`<768px`):** header becomes a simple menu button plus mission title; role lanes are horizontally scrollable with scroll-snap and persistent role labels; event detail and evidence are stacked after the lanes. Controls wrap to two rows without truncating action labels.
- Touch targets are at least `44 × 44px`; compact utility controls may be visually smaller only if their hit area remains 44px.
- Code blocks preserve copy affordance and horizontal scroll. They never force page-wide overflow.
- Use container-aware layout for Mission Board subregions so an embedded version retains its usable hierarchy.

## Accessibility and content requirements

- Meet WCAG 2.2 AA contrast at minimum: normal text 4.5:1, large text 3:1, controls and focus indicators 3:1. Verify actual combinations after implementation.
- Use semantic landmarks: `header`, `nav`, `main`, `section`, `figure`, and an accessible `table` or labelled list for the evidence ledger. The simulation needs a concise `aria-label` and text equivalent of its current state.
- All controls are keyboard operable. Provide a visible 2px focus ring in `--blue-500` offset by 3px; never rely on a color-only selected state.
- Make state updates polite and bounded: a dedicated `aria-live="polite"` region announces only the currently stepped event (`Codex moved from working to review; check passed`). Do not announce every playback tick or decorative movement.
- Do not make lane cards clickable `div`s. Use buttons for selection; use links only for actual artifact destinations. Preserve native focus order: fixture → playback controls → role lanes → event details → evidence ledger.
- Render event time, state, owner, artifact, check, and next action as text. Icons are supplementary and have labels or are hidden from assistive technology.
- Support `prefers-contrast: more` with stronger rules and no translucency; support forced-colors without removing semantic text labels.
- The hero image in `src/assets/hero.png` is optional. If retained, it must be content-bearing with meaningful alt text; otherwise treat it as decorative (`alt=""`) or omit it. Never use it as low-contrast background texture behind copy.

## shadcn implementation guidance

When implementation begins, use the project’s existing primitives and semantic token system rather than custom look-alike controls. The expected composition is `Tabs`/`ToggleGroup` for fixture and role selection, `Button` for trace actions, `Badge` for textual state, `Card` only for bounded simulator panels, `Table` for the evidence ledger, `ScrollArea` for contained histories, `Alert` for blocked/failed information, `Empty` for the no-fixture state, `Skeleton` for any genuinely asynchronous live mode, and `sonner` for explicit action feedback.

Keep `CardHeader`, `CardTitle`, `CardDescription`, and `CardContent` intact where cards are used. Use semantic classes/tokens rather than one-off raw color overrides. Each panel must remain readable without the interaction layer; the deterministic fixtures are present in the initial document state, not filled in after hydration.

## Acceptance checklist for implementation

- [ ] The Mission Board is visible without scrolling on a typical desktop viewport and communicates one complete event-to-evidence relationship.
- [ ] All fixture runs are repeatable: reset always yields the same ordered trace and final state.
- [ ] No visual status is color-only, and every `done` event has a check and artifact pointer.
- [ ] Motion stays within the stated timing/restraint budget and is reduced appropriately.
- [ ] Mobile retains scenario selection, step/reset, lane identity, event detail, and evidence without horizontal page overflow.
- [ ] Keyboard navigation, focus visibility, semantic structure, and live announcements are verified with a browser and assistive-technology pass.
- [ ] Actual color contrast and reduced-motion behavior are checked in the built application before release.
