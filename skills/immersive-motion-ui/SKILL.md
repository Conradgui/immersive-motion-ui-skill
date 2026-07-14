---
name: immersive-motion-ui
description: Premium motion-forward UI design and implementation guidance for Codex. Use when building, redesigning, or auditing high-craft web interfaces, including brand landing pages, portfolios, product dashboards, admin tools, analytics UIs, commerce pages, cinematic heroes, motion systems, visual polish, responsive layout quality, and UI verification evidence.
---

# Immersive Motion UI

Use this skill as a Codex-first Core Skill. It must be useful without the optional MotionSites Library. The Library may add examples and breadth later, but it must not be required for routing, design judgment, implementation planning, or verification.

## Core Contract

Deliver high-craft UI by combining:

1. Register routing: choose whether the task is brand, product, commerce, redesign, or audit.
2. Design readout: state the intended visual direction, the obvious default to avoid, and one signature move.
3. Controlled execution: ask only the question that changes the path; otherwise proceed with explicit assumptions.
4. Evidence: verify with commands, browser inspection, screenshots, console/layout checks, or state `NOT EXECUTED`.

Core is a complete local reference system, not a thin router around the optional Library. Every active capability must have a local reference that provides decision criteria, implementation guidance, boundaries, fallback behavior, and a verification exit. Library material may broaden examples, but it must not contain the only version of a rule required for normal frontend work.

Do not treat user input as blindly authoritative. Treat it as intent evidence. If a user suggestion would reduce quality, expand scope, break Core independence, or conflict with repository reality, explain the trade-off and choose the safer default.

## Step 0: Inspect Before Designing

Before generating or editing UI, inspect the existing project when files are available:

- framework and router
- CSS system and design tokens
- existing components and layout patterns
- package scripts
- responsive structure
- current brand colors, type, imagery, and motion

If no project exists, choose conservative web defaults and state the assumption. Do not introduce a new framework, animation library, or visual system when the existing project already has one that can serve the task.

## Register Router

Choose exactly one primary register before planning. Secondary registers may influence details but must not override the primary job.

| Register | Use For | Design Bias | Avoid |
| --- | --- | --- | --- |
| `brand` | landing pages, launch pages, portfolios, agencies, campaigns, editorial pages | memorable first viewport, strong typography, focused narrative, one signature motion/visual move | turning every page into generic centered hero plus cards |
| `product` | dashboards, admin tools, analytics, SaaS apps, tables, settings, app shells | dense but calm information architecture, stable controls, predictable navigation, efficient repeated use | cinematic spectacle that reduces task clarity |
| `commerce` | PDP, PLP, cart, checkout, pricing, booking flows | product clarity, comparison, trust, conversion, stateful controls | brand spectacle that hides inspection or purchase tasks |
| `redesign` | improving an existing page or app | protect working structure first, then improve hierarchy, rhythm, contrast, and distinctiveness | replacing the whole experience without naming protected elements |
| `audit` | diagnosis, review, critique, QA | read-only findings with severity and evidence | editing files, installing dependencies, or rewriting UI |

## Command Router

Map user feedback to a narrow action.

| Command | Behavior |
| --- | --- |
| `audit` | Read-only. Report P0/P1/P2 findings. Do not edit files. |
| `redesign` | Audit first, name protected elements, then make targeted changes. |
| `bolder` | Increase contrast, scale, composition tension, or signature move. Do not change the product register. |
| `quieter` | Reduce noise, saturation, motion, ornament, or visual conflict. Preserve hierarchy. |
| `soul` | Replace generic AI defaults with subject-specific materials, copy, rhythm, imagery, and interaction. |
| `animate` | Improve motion purpose, timing, entrance sequencing, continuity, and reduced-motion fallback. |
| `depth` | Add spatial layering through light, shadow, parallax, glass, z-depth, or media planes only when useful. |
| `densify` | Increase information density for product work without shrinking controls below usable size. |

If the user gives a natural-language request, infer the closest command. If ambiguous and the choice would materially change edits, ask one focused question.

## User Question And Control Protocol

Default to action, not interrogation. Ask only when missing information changes register, stack, edit boundary, brand protection, verification path, or risk.

Rules:

- Ask at most one key question. Ask two only when not asking would likely damage the project.
- Explain why the question matters and what each answer changes.
- Do not ask for information that can be inferred from code, screenshots, README, design files, or existing components.
- If the user says "直接做" or equivalent, proceed with conservative assumptions and record them.
- A user's answer may be guiding, not limiting. Do not over-narrow the product because the user gave one example.
- Prevent overcorrection: adjust the named dimension instead of jumping from one extreme to another.

Require confirmation before high-risk changes:

- changing framework or routing architecture
- deleting or moving files/assets
- replacing brand identity
- large information architecture rewrites
- adding new dependencies
- destructive install or packaging operations

## Reference Routing

Load only the relevant files. For domain, diagnostic, or dependency-sensitive work, read `capability-manifest.json` to determine whether the module is active or planned.

| Need | Reference |
| --- | --- |
| choose register or command path | `references/routing.md` |
| define anti-default visual direction and calibrate ambition | `references/design-dna.md`, `references/visual-directions.md` |
| choose an industry task family and compare two directions | `references/industry-directions.md` |
| compare a plausible weak approach with a task-aligned improvement | `references/showcase-casebook.md` |
| inspect a runnable or source-level implementation example | `examples/README.md` |
| brand landing, portfolio, campaign | `references/brand-ui.md` |
| dashboard, admin, analytics, app shell | `references/product-ui.md` |
| data app, table, chart, metric, analytical workflow | `references/data-ui.md`, `references/data-apps.md` |
| PDP, PLP, cart, checkout, pricing | `references/commerce-ui.md` |
| motion choreography, cinematic hero, reduced motion | `references/motion-engines.md` |
| photography, product imagery, video, illustration, or external media | `references/media-assets.md` |
| decide whether to use existing assets, Library media, ImageGen, an authentic source, or no media | `references/media-assets.md`, `references/image-generation.md` |
| generic/cheap UI audit | `references/anti-cheap.md` |
| project inspection and implementation preflight | `references/preflight.md` |
| modern CSS, native web API, progressive enhancement, or compatibility | `references/modern-web.md` |
| existing page improvement | `references/redesign.md` |
| browser debug, console, network, or runtime interaction evidence | `references/browser-debugging.md` |
| LCP, CWV, slow page, render blocking, or media loading | `references/performance.md` |
| memory leak, OOM, listener, timer, observer, or animation cleanup | `references/memory-lifecycle.md` |
| a11y, ARIA, labels, keyboard, focus, tap targets, or contrast | `references/a11y-audit.md` |
| final UI verification evidence | `references/verification-evidence.md` |
| benchmark, forward eval, or compare Skill approaches | `references/eval-protocol.md` |
| multi-page, design system, or long-running UI state | `references/workflow-state.md` |
| tokens, modes, variants, component states, or cross-page consistency | `references/design-system.md` |
| optional MotionSites Library discovery | `references/library-integration.md` |
| capability status, conditional tools, cloud, accounts, or current docs | `capability-manifest.json`, `references/dependency-policy.md` |

An active capability may load its existing references. A planned capability is Roadmap intent, not an implemented module: do not read missing planned references or claim the preferred path ran. Use its declared fallback and report the corresponding unverified state.

If a reference file or dependency is absent, continue with the declared Core fallback and do not fail. Do not require the MotionSites Library for normal work. Do not install, log in, provision, publish, or spend money without the confirmation required by the dependency policy.

## Design Readout

Before building or rewriting a meaningful UI, state a compact design readout:

1. Primary register.
2. Task-first industry family when relevant.
3. User/job-to-be-done.
4. Existing stack or assumption.
5. Obvious generic default to avoid.
6. One signature design move.
7. Verification plan.

Keep this short. Do not present multiple moodboards unless the user explicitly asks for options or the direction is genuinely high-risk.

## Media Generation Router

When important media is missing, load `references/media-assets.md` first and `references/image-generation.md` only if generation is a real candidate. Choose one route: existing asset, verified Library candidate, ImageGen, authentic source, or no media.

Core-only may call an available image-generation tool from a subject-specific brief. Core + Library may first retrieve a relevant asset, prompt, or case, then generate only the uncovered need. Do not require a Library query when the user supplied the asset, requested an original direction, factual authenticity controls the source, or media is unnecessary.

Never generate a substitute for a real person, exact product, property, event, metric, interface state, or documentary record. If generation tooling is unavailable, retain the brief, use the declared local fallback, and report `NOT EXECUTED`.

## Implementation Principles

Use the existing stack first. When building new frontend work:

- prefer semantic HTML and accessible controls
- use stable responsive dimensions for fixed-format UI such as boards, grids, toolbars, cards, counters, and controls
- keep product UIs dense, calm, and scannable
- keep brand pages memorable but still usable
- avoid nested cards and decorative card shells around whole sections
- avoid generic gradient hero, centered text plus card grids, stock-like dark blur, and one-note color palettes
- avoid placeholder names, inflated metrics, and AI-marker copy
- respect `prefers-reduced-motion` for continuous or large motion
- use icons for tool actions when a common icon exists
- keep text inside buttons and compact panels within stable bounds

Use motion only when it clarifies hierarchy, state, continuity, or brand memory. Do not add animation just to prove the page is "premium."

## Audit Mode

`audit` is always read-only.

Report findings in this shape:

- `P0`: blocks function, accessibility, layout integrity, or truthful verification
- `P1`: harms comprehension, brand quality, responsiveness, or maintainability
- `P2`: polish issue or optional improvement

Include file/line references when available. If evidence is missing, say what was not inspected. Do not edit, install, move, delete, or rewrite in audit mode.

## Redesign Mode

When redesigning an existing UI:

1. Inspect current structure.
2. Name protected elements: brand identity, working interactions, data model, routes, and user-critical flows.
3. Identify the smallest set of changes that improve the requested dimension.
4. Make surgical edits.
5. Verify the changed surface.

Do not rewrite the whole page unless the user explicitly asks for a full rebuild or the existing page is structurally unusable.

## Verification Evidence

Never claim verification passed from code inspection alone.

Use this final status vocabulary:

- `PASS`: executed verification and found no blocking issues
- `PASS WITH FINDINGS`: executed verification and found non-blocking issues
- `FAIL`: executed verification and found blocking issues
- `NOT EXECUTED`: verification could not be run

Report evidence:

- build/lint/typecheck command and exit code
- for browser debugging, read `references/browser-debugging.md` before interacting
- `scripts/verify-ui-evidence.mjs` output when a structured verification summary is useful
- inspected URL or file path
- desktop and mobile viewport checks when browser verification is possible
- console errors
- horizontal overflow result
- reduced-motion result when motion is present
- screenshot paths when captured

If browser tooling is unavailable, say `NOT EXECUTED` for visual/browser verification and do not soften it into a pass.

## Library Boundary

The optional MotionSites Library may provide prompt examples, media, demos, and inspiration indexes. It must not be a hidden dependency.

Core-only behavior must remain strong for:

- premium brand landing pages
- product dashboard/admin UIs
- commerce surfaces
- existing page audit/redesign
- motion and visual polish

If Library files are available, use them only after Core routing is settled. Library breadth must not override the chosen register or safety boundary.

Use `scripts/query-library.mjs` only for optional read-only Library lookup. If it reports `LIBRARY_NOT_FOUND`, continue in Core-only mode.
