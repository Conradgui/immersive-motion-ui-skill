# Redesign

Load this when improving an existing page or app, especially for requests like "make this better", "less generic", "more premium", "redesign this", or "keep the brand but improve the UI".

## Principle

Redesign is not a license to rebuild. Protect what works, identify the specific weakness, and change the smallest surface that materially improves the result.

## Redesign Sequence

1. Inspect the current UI and project stack.
2. Name protected elements.
3. Identify the primary weakness.
4. Choose one command: `bolder`, `quieter`, `soul`, `animate`, `depth`, or `densify`.
5. Make targeted edits.
6. Verify the changed surface.

If the user explicitly asks for a full rebuild, still name what will be replaced and what will be preserved before editing.

## Protected Elements

Protect:

- brand name, logo, color ownership, and product imagery
- working layout structure unless it is the problem
- information architecture and route semantics
- data model and component API
- critical user flows
- accessibility labels, focus behavior, and form semantics

Do not replace these silently for aesthetic reasons.

## Diagnose The Weakness

| Symptom | Likely Command | Fix Direction |
| --- | --- | --- |
| looks generic or template-like | `soul` | add subject-specific material, copy, interaction, or composition |
| lacks hierarchy or impact | `bolder` | increase scale contrast, rhythm, density contrast, or focal point |
| too loud or visually noisy | `quieter` | reduce competing effects, color noise, and motion |
| too flat | `depth` | add useful layering, shadows, media planes, or spatial rhythm |
| product page wastes space | `densify` | compress layout structure without shrinking controls below usability |
| motion feels random | `animate` | align motion with state, hierarchy, or continuity |

## Surgical Edit Rules

Prefer:

- local component edits
- token adjustments when they improve multiple related elements
- layout rhythm changes within the current framework
- replacing generic copy with domain-specific copy
- adding states that the current UI lacks

Avoid:

- changing framework
- adding dependencies without approval
- rewriting all components
- deleting assets
- changing route structure
- turning product UI into a brand hero
- erasing brand identity because it looks easier

## Before And After Evidence

When possible, record:

- files changed
- protected elements preserved
- primary weakness addressed
- viewport or screenshot evidence
- build/browser status
- remaining findings

If visual verification cannot run, state `NOT EXECUTED` for that portion.

## Redesign Output

Use this concise format:

```text
Protected:
Primary weakness:
Command:
Changes:
Verification:
Residual risk:
```
