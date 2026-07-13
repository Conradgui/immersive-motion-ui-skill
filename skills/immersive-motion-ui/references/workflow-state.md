# Workflow State

Use only for multi-page apps, design systems, long redesigns, or work likely to span sessions. Do not create state files for a small one-page change unless the user asks.

Long UI work needs a durable record of chosen register, protected routes/data/brand/interactions, token decisions, verification evidence, and unresolved risks.

Create these in a project-local workbench such as `docs/design-workbench/<date>-<slug>/`:

```text
design-model.yaml
worklog.md
```

Ask before creating files outside the current repo or moving/deleting assets.

## design-model.yaml

```yaml
run_id: ui-2026-07-09-example
surface: dashboard | landing | commerce | app
register: brand | product | commerce | redesign | audit
command: audit | redesign | bolder | quieter | soul | animate | depth | densify
protected:
  routes: []
  data_model: []
  brand: []
  interactions: []
tokens:
  color: {}
  type: {}
  spacing: {}
  radius: {}
  motion: {}
components:
  planned: []
  changed: []
verification:
  required: []
  completed: []
risks: []
```

Keep it compact. The point is continuity, not documentation theater.

## worklog.md

```text
# UI Worklog

Run ID:
Source request:
Current phase:

## Decisions
- D1:

## Protected Elements
- P1:

## Tasks
- T1 [pending|in_progress|done]:

## Verification
- V1:

## Open Risks
- R1:
```

Use stable task IDs and update the worklog after meaningful design, code, or verification changes.

## When To Stop And Ask

Ask the user before:

- changing framework or routing
- changing data model
- replacing brand identity
- deleting or moving assets
- adding dependencies
- expanding a one-page task into a design system

If the user gives examples, treat them as direction unless they explicitly say they are hard requirements.

## Resume Protocol

At the start of a resumed task:

1. Read `design-model.yaml` if present.
2. Read `worklog.md` if present.
3. Inspect current code before trusting old notes.
4. State what is still valid, what may be stale, and what will be verified next.
