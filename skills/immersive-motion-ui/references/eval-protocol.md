# Composite Evaluation Protocol

Use this reference only when a user asks to evaluate the Skill, compare approaches, or prepare a release gate. It is not a design-answer template.

## Freeze Before Running

1. Freeze the task set, scoring rubric, track permissions, and success rules before any output is generated.
2. Keep baseline, Core-only, and Core-plus-Library authors isolated. The baseline must not read Core, Library, tests, or prior results.
3. Remove author identity and isolation declarations before comparison. Keep declarations separately as eligibility evidence.
4. Do not adjust tasks, weights, or thresholds after a first-round result.

## Core Tracks

- `baseline`: the task prompt only.
- `core-only`: `SKILL.md` and only the references selected by routing.
- `core-plus-library`: Core first, then a logged, read-only Library query. Use only `staged` results unless a human explicitly approved a source audit.
- `specialist-reference`: optional and version-pinned. Record `NOT EXECUTED` when no independent reference is available; never substitute a hidden local dependency.

## Scoring And Claims

Score task fit, decision mechanism, causal trade-offs, calibrated treatment of user guidance, failure recovery, factual honesty, handoff quality, design fit, verification honesty, and specificity. Do not award points merely for naming accessibility, motion, or testing.

For a release claim, distinguish:

- `stable-high-quality`: every evaluated Core output clears the frozen absolute gate.
- `no-systematic-regression`: Core has no repeated material loss against baseline under the frozen comparison rule.
- `relative-superiority`: a stronger claim that needs its own repeated evidence. Do not infer it from the first two claims.

Keep raw outputs, anonymization mapping, scores, reasons, selected Library IDs, invalidation decisions, and unexecuted states. A missing track or tool is evidence of a boundary, not a reason to invent a passing result.
