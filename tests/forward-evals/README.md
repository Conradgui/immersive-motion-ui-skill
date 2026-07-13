# Core-only Forward Evals

These evals check whether the Core Skill can route and constrain work without the optional MotionSites Library.

They are not prompt templates for users. They are release evidence for the Core Skill.

## Scope

Core-only means:

- no prompt corpus
- no media/demo library
- no generated library indexes
- no Library search

The skill may use only:

- `skills/immersive-motion-ui/SKILL.md`
- `skills/immersive-motion-ui/references/`
- `skills/immersive-motion-ui/scripts/`

## Eval Prompts

### E1 Brand

Prompt:

```text
Use $immersive-motion-ui to design a premium launch landing page for a biotech diagnostics product that helps small clinics detect respiratory infection risk faster. The page should feel credible, not generic SaaS. Do not use external image assets.
```

Expected:

- Register: `brand`
- Command: build/design
- References: `routing.md`, `design-dna.md`, `brand-ui.md`, `motion-engines.md`, `preflight.md`
- Must avoid: generic centered SaaS hero, vague "Elevate" copy, fake metrics
- Must include: design readout, category default to avoid, one subject-specific signature move, verification plan

### E2 Product

Prompt:

```text
Use $immersive-motion-ui to design an analytics dashboard for clinic operations teams. It needs filters, patient-risk queues, table states, and dense scan-friendly information. It should not feel like a marketing page.
```

Expected:

- Register: `product`
- Command: build/design
- References: `routing.md`, `product-ui.md`, `design-dna.md`, `preflight.md`
- Must avoid: cinematic hero, oversized marketing sections, low-density cards
- Must include: stable controls, table/list states, filters, loading/empty/error considerations, verification plan

### E3 Audit

Prompt:

```text
Use $immersive-motion-ui to audit this existing HTML page. Do not edit it. Report what is generic, fragile, or unverifiable.
```

Fixture:

```text
fixtures/generic-landing.html
```

Expected:

- Register: `audit`
- Command: `audit`
- References: `routing.md`, `anti-cheap.md`, `preflight.md`
- Must remain read-only
- Must use `audit-ui.mjs` when available
- Must report P0/P1/P2 and unexecuted browser checks

### E4 Redesign

Prompt:

```text
Use $immersive-motion-ui to make an existing product dashboard less generic without changing routes, data model, brand color, or adding dependencies. The user's examples are directional, not strict requirements.
```

Expected:

- Register: `redesign`
- Command: `redesign` with likely `soul` or `densify`
- References: `routing.md`, `redesign.md`, `product-ui.md`, `design-dna.md`, `preflight.md`
- Must protect: routes, data model, brand color, dependency set
- Must avoid: full rebuild, framework change, overcorrection
- Must include: protected elements, primary weakness, surgical changes, verification plan

## Scoring

Score each eval from 0 to 2 on each dimension:

| Dimension | 0 | 1 | 2 |
| --- | --- | --- | --- |
| routing | wrong register/command | partially right | correct primary register and command |
| reference selection | irrelevant or all files | mostly right but noisy | minimal relevant references |
| control boundary | ignores constraints | names some constraints | preserves boundaries and asks only if needed |
| anti-generic quality | generic defaults | some specific direction | subject-specific anti-default direction |
| evidence | claims pass without evidence | partial evidence | explicit verification status and unexecuted checks |

Passing threshold:

- total score at least 8/10 per eval
- no routing score below 2
- audit eval must remain read-only
- redesign eval must protect named constraints

## Current Static Result

Status: `STATIC PASS WITH LIMITATIONS`

This repo contains the prompts, expected routing, scoring rubric, and one machine-audited fixture. A true independent forward eval has not yet been run because no subagent was explicitly requested for this task.
