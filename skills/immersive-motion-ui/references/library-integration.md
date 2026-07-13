# Optional Library Integration

Use this only after Core routing has selected a register and command.

The MotionSites Library adds breadth. It must not become a hidden dependency.

## Expected Library Shape

The optional Library may contain:

```text
library-manifest.json
SKILL.md
schema/library-item.schema.json
catalog/items.jsonl
scripts/query-catalog.mjs
prompts/
pro-prompts/
references-index/
assets/
demos/
index.html
```

Core must still work when none of these paths exist.

## Discovery Order

1. Use Core routing first.
2. Check whether a Library path is configured, symlinked, or present in a sibling repo.
3. If `library-manifest.json` exists, read it before searching prompts or assets.
4. Prefer the Library-native `scripts/query-catalog.mjs` when present. It is the versioned query contract for both Library-only and Core + Library modes.
5. Use each returned item's `use_when`, `avoid_when`, availability, quality state, relations, and matched terms.
6. Search only for the selected register or subject.
7. Reject `missing`; treat `pending-transfer` as discoverable but not portable. Prefer `verified`, then `localized`, then `raw` only with explicit adaptation.
8. Treat Library examples as inspiration, not as output to copy.

`relations.type: possible-duplicate` is a review queue, not a deduplication command. Do not hide, merge, or prefer either item only because this relation exists. Inspect content and context first; only `content_hash_match: true` in `catalog/duplicate-candidates.json` is evidence of byte-identical prompt content.

Use `scripts/query-library.mjs` for a read-only prompt search when a Library checkout is available. It delegates to the Library-native query when possible and otherwise falls back to legacy catalog search. Its default scope is `staged` only; pass `--include-pending` only during a human-approved source audit, never to select a portable default asset.

## Research Escalation

Library absence or a zero-result query is not, by itself, a requirement to browse. Core can still develop a strong local direction from the brief and its own references.

Consider optional web research only when all of these hold:

1. The Library returns no suitable candidate or leaves a named gap.
2. The gap matters to the user's result, such as a current standard, an industry-specific workflow, a real product/category convention, or a source-backed design rationale.
3. The user did not prohibit browsing and a browser/search tool is available.

Research targets are design principles, authoritative standards, current documentation, credible case studies, and inspectable source material. They are not automatically downloadable Prompt or media assets. Use the findings to construct a localized direction; do not copy brand identity, claims, layouts, or copyrighted media.

If research runs, record:

```text
Research mode: NOT_EXECUTED | WEB_RESEARCH
Gap that triggered it:
Queries and sources:
Findings adopted:
Findings rejected:
Unverified assumptions:
```

If research is unavailable or unnecessary, continue in Core-only or Core-plus-Library mode and state the limitation honestly. Never let a zero-result Library query block implementation.

## Graceful Degradation

If the Library is absent:

- continue with Core references
- state `Library: NOT FOUND, using Core-only mode`
- do not fail
- do not ask the user to install the Library unless they requested broader examples or assets

If the Library is present but incomplete:

- use only verified files
- do not infer missing assets from filenames
- do not rely on demos that were not inspected

## Safety Rules

- Never leak original prompt brand names, people names, URLs, or fake metrics.
- Replace template identity with the user's subject and real context.
- Do not copy large media into Core.
- Do not move or delete `assets/`, `demos/`, or gallery files without explicit confirmation.
- Do not let Library aesthetics override the selected register.

## Report Shape

```text
Library mode: CORE_ONLY | CORE_PLUS_LIBRARY | NOT_EXECUTED
Library path:
Manifest:
Query command:
Catalog item IDs:
Used examples:
Rejected examples:
Reasoning:
```

Use `NOT_EXECUTED` when no Library lookup was attempted.
