# Preflight

Load this before implementation when files exist, when the project stack is unclear, or when the task could alter structure, dependencies, assets, routes, or verification claims.

## Goal

Preflight prevents expensive wrong moves. It should answer: what already exists, what can be safely changed, what should be protected, and how the result will be verified.

## Inspect First

Check:

- package manager and scripts
- framework and router
- component folders and route structure
- CSS system: Tailwind, CSS modules, global CSS, design tokens, component library
- existing colors, type scale, spacing, radius, shadows, and motion patterns
- asset locations and whether assets are user-provided
- lint, build, test, and dev commands
- browser tooling availability

Do not install dependencies or change frameworks during preflight. If a new dependency seems useful, explain why and ask before adding it.

## Edit Boundary

Before editing, classify the task:

| Boundary | Meaning | Default |
| --- | --- | --- |
| cosmetic | spacing, color, type, rhythm, polish | edit directly if low risk |
| component | one component or local section | inspect imports and states first |
| flow | multi-step user path, checkout, onboarding, dashboard workflow | ask or confirm if behavior changes |
| system | tokens, layout shell, router, framework, dependency | require explicit confirmation |
| audit | user asked for review only | do not edit |

## Protected Elements

Name protected elements when present:

- routes and URLs
- data shape and API calls
- working forms and submissions
- auth/session logic
- brand colors, logos, imagery, and product screenshots
- user-provided assets
- analytics or tracking hooks
- accessibility labels and keyboard paths

If a requested change conflicts with a protected element, explain the trade-off before editing.

## Verification Plan

Choose the strongest available verification:

1. build, lint, typecheck, or test command
2. browser inspection at desktop and mobile widths
3. console error check
4. horizontal overflow check
5. reduced-motion check when motion exists
6. screenshot evidence when possible

If a tool is unavailable, mark that part `NOT EXECUTED`. Do not infer a pass from code reading.

## Preflight Output

Use this compact note before implementation:

```text
Stack:
Register:
Command:
Edit boundary:
Protected elements:
Assumptions:
Verification:
Risk:
```

Keep it brief. Preflight is a working note, not a report.
