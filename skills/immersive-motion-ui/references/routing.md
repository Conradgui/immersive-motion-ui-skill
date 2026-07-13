# Routing

Load this when the task type, command, risk, or next reference is ambiguous. This file turns a vague user request into a narrow execution path.

## Fast Path

1. Identify the primary register.
2. Identify the command.
3. Name the risk level.
4. Load only the relevant reference.
5. State the design readout before editing or building.

## Register Decision

| Signal | Primary Register | Load Next |
| --- | --- | --- |
| landing page, launch, hero, portfolio, agency, campaign, editorial | `brand` | `brand-ui.md`, `design-dna.md` |
| dashboard, admin, analytics, SaaS app, table, filters, settings, workflow | `product` | `product-ui.md`, `design-dna.md` |
| PDP, PLP, cart, checkout, pricing, booking, conversion | `commerce` | `commerce-ui.md` |
| existing page, make better, less generic, polish this, redesign this | `redesign` | `redesign.md`, `anti-cheap.md` |
| review, critique, audit, diagnose, don't edit | `audit` | `anti-cheap.md` |

If multiple registers appear, choose by the user's job-to-be-done:

- Selling a product or collecting payment beats brand atmosphere.
- Repeated operational use beats cinematic storytelling.
- Existing working UI beats speculative rebuild.
- Explicit read-only request beats all edit commands.

## Command Decision

| User Phrase | Command | Do |
| --- | --- | --- |
| "audit", "review", "what is wrong", "do not edit" | `audit` | read-only findings |
| "redesign", "make this better", "less generic" | `redesign` | inspect, protect, then edit narrowly |
| "more premium", "more striking", "stronger" | `bolder` | increase one or two visual dimensions |
| "too much", "calmer", "less flashy" | `quieter` | reduce noise without flattening hierarchy |
| "has no soul", "generic", "AI-looking" | `soul` | add subject-specific material and interaction |
| "animate", "make motion better" | `animate` | improve purposeful motion and reduced-motion fallback |
| "more depth", "less flat" | `depth` | add spatial layering only where it clarifies |
| "more compact", "more information" | `densify` | improve scan density while preserving usability |

## Capability Decision

Use `capability-manifest.json` as the status source. `active` means the Core reference exists now. `planned` means use the declared fallback; do not read the planned path or claim the capability is implemented.

| Module | Status | Trigger | Load Or Fallback |
| --- | --- | --- | --- |
| M01 | active | route, audit, redesign, user control | `routing.md`; routing eval |
| M02 | active | inspect project, existing stack | `preflight.md`; manual project inspection fallback |
| M03 | active | industry, design direction, ambition calibration, anti-default, paired-case comparison | `industry-directions.md`, `showcase-casebook.md`, `design-dna.md`, `visual-directions.md`, `anti-cheap.md` |
| M04 | active | brand, product UI, commerce | `brand-ui.md`, `product-ui.md`, `commerce-ui.md` |
| M05 | active | motion, 3D, video, imagery, media sourcing | `motion-engines.md`, `media-assets.md`; CSS/static or locally available media fallback |
| M06 | active | modern CSS, Web API, compatibility | `modern-web.md`; stable local baseline when current docs are unchecked |
| M07 | active | dashboard, data app, chart, table, metric | `data-ui.md`, `data-apps.md`; product UI fallback |
| M08 | active | browser debug, console, network | `browser-debugging.md`; static code review and browser `NOT EXECUTED` when tooling is absent |
| M09 | active | lcp, cwv, slow page | `performance.md`; static performance review and performance not measured without a trace |
| M10 | active | memory leak, oom, listener cleanup | `memory-lifecycle.md`; lifecycle checklist and memory not measured without heap tooling |
| M11 | active | a11y, aria, keyboard, focus | `a11y-audit.md`, `preflight.md`, `anti-cheap.md`; static a11y review when browser tooling is absent |
| M14 | active | multi-page, design system, long task, token, variant | `workflow-state.md`, `design-system.md`; Figma optional |
| M15 | active | verification, evidence, forward eval | `verification-evidence.md`; report missing evidence honestly |
| M16 | active | package, dependency, Library | `dependency-policy.md`, `library-integration.md`; Core-only fallback |

Before using any conditional tool, network, account, cloud, or Library path, read `dependency-policy.md`.

## Question Gate

Ask one focused question only if the answer changes one of these:

- primary register
- project stack
- edit boundary
- brand protection
- verification path
- destructive or expensive operation

Do not ask for taste details that can be inferred from the brief or existing UI. If the user gives a directional example, treat it as evidence, not a permanent constraint.

## Output Contract

Every non-trivial task should start with:

```text
Register:
Command:
Risk:
Reference(s):
Assumption or question:
Verification:
```

Keep it short. This is a steering note, not a strategy memo.
