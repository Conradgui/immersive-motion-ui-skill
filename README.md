# Immersive Motion UI Skill

Codex-only Core Skill for designing, auditing, and improving premium motion-forward web interfaces.

The Core Skill is intended to work without the MotionSites prompt/resource library. The optional library can add prompt templates, demos, media references, and broader examples, but it must not be required for normal Codex use.

## Naming

| Item | Value |
| --- | --- |
| Repository | `Conradgui/immersive-motion-ui-skill.git` |
| Skill folder | `skills/immersive-motion-ui` |
| Skill name | `immersive-motion-ui` |
| Invocation | `$immersive-motion-ui` |
| Default Codex install target | `~/.codex/skills/immersive-motion-ui` |
| Optional Library repo | `Conradgui/immersive-motion-ui-library.git` |

## Current Status

This package is staged for a Codex-only first release.

Validated:

- Router-style `SKILL.md` with `brand`, `product`, `commerce`, `redesign`, and `audit` paths.
- Curated Core references under `skills/immersive-motion-ui/references/`.
- Local static scanner: `skills/immersive-motion-ui/scripts/audit-ui.mjs`.
- Structured evidence wrapper: `skills/immersive-motion-ui/scripts/verify-ui-evidence.mjs`.
- Optional Library search: `skills/immersive-motion-ui/scripts/query-library.mjs`.
- Machine-checkable 14-module Core capability contract: `skills/immersive-motion-ui/capability-manifest.json`.
- Human routing and conditional dependency policy for the front-end design Core. Non-design platform and cloud integrations are intentionally externalized from this release.
- Core-only task-first industry directions covering six families without fixed style stereotypes.
- Six Core-only locked-fixture paired cases with causal deltas, applicability boundaries, and honest `NOT EXECUTED` runtime evidence.
- Three fixture-backed offline before/after examples for product operations, brand adaptive reuse, and hotel booking, with five generated local WebP assets.
- Five authorized Finesse network-enhanced source references, with MIT attribution and explicit runtime/dependency boundaries.
- Frozen trigger-proxy evaluation: 72 bilingual tasks, two isolated Subagents, holdout activation F1 `1.0000`, role Macro-F1 `0.9659`, and zero high-risk false positives. This is independent-agent evidence, not Codex platform telemetry.
- Non-destructive package validation and install-target preview.

Not yet claimed:

- Full browser/runtime visual quality pass.
- Real global install into `~/.codex/skills`.
- Multi-platform support outside Codex.
- Hard dependency on the optional Library.
- Codex platform-level automatic-trigger telemetry.

## Package Contents

```text
skills/immersive-motion-ui/
  SKILL.md
  capability-manifest.json
  agents/openai.yaml
  references/
  examples/
  scripts/
tests/
  trigger-eval/
scripts/validate-core-package.mjs
core-release-manifest.json
```

## Validation

Run from the repository root:

```bash
node scripts/validate-core-package.mjs --pretty
node skills/immersive-motion-ui/scripts/validate-capability-manifest.mjs --pretty
node tests/capability-manifest/run-tests.mjs
node tests/routing-dependencies/run-tests.mjs
node tests/industry-directions/run-tests.mjs
node tests/showcase-casebook/run-tests.mjs
node tests/minimal-showcases/run-tests.mjs
node tests/browser-evidence/run-tests.mjs
node tests/commerce-lifecycle/run-tests.mjs
node tests/specialty-evidence/run-tests.mjs
node tests/data-ui/run-tests.mjs
node tests/trigger-eval/run-tests.mjs
python3 /Users/conrad/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/immersive-motion-ui
node skills/immersive-motion-ui/scripts/audit-ui.mjs skills/immersive-motion-ui --pretty
node skills/immersive-motion-ui/scripts/verify-ui-evidence.mjs tests/forward-evals/fixtures/generic-landing.html --pretty
node skills/immersive-motion-ui/scripts/query-library.mjs --query "biotech dashboard" --pretty
```

Expected status:

```text
validate-core-package.mjs => PASS
validate-capability-manifest.mjs => PASS
capability-manifest tests => PASS, 10 tests
routing-dependency tests => PASS, 12 tests
industry-direction tests => PASS, 9 tests
showcase-casebook tests => PASS, 11 tests
minimal-showcase tests => PASS, 6 tests
browser-evidence tests => PASS, 6 tests
commerce-lifecycle tests => PASS, 5 tests
specialty-evidence tests => PASS, 6 tests
data-ui tests => PASS, 15 tests
trigger-eval tests => PASS, 3 tests
quick_validate.py => Skill is valid!
audit-ui.mjs => PASS, findingsCount 0
verify-ui-evidence.mjs => PASS WITH FINDINGS when browser evidence is not supplied
query-library.mjs => PASS when optional sibling Library exists, or LIBRARY_NOT_FOUND when absent
```

## Install Preview

Preview the files that would be copied into a Codex skill target:

```bash
node scripts/validate-core-package.mjs --install-target ~/.codex/skills --pretty
```

This is a dry-run. It does not create directories and does not copy files.

The report includes:

- `installPlan.destinationRoot`
- `installPlan.wouldCreateDirectories`
- `installPlan.wouldCopyFiles`
- `installTargetStatus.missing`
- `installTargetStatus.stale`
- `installTargetStatus.extra`
- `packageFingerprint.digest`

After a real install, verify that the installed copy matches the staged package:

```bash
node scripts/validate-core-package.mjs --install-target ~/.codex/skills --require-installed --pretty
```

Expected status after a correct install:

```text
status PASS
installTargetStatus.matchesPackage true
failureCount 0
```

If the destination is missing or stale, this command must fail.

## Trigger Evaluation

`tests/trigger-eval/` is a frozen three-role activation evaluation for this Skill:

- `primary`: the Skill should lead the frontend design or implementation task.
- `with-specialist`: the Skill should participate while browser, performance, memory, or accessibility specialization is central.
- `out-of-scope`: the task has no substantial UI design, implementation, or UI-verification responsibility.

The v1 corpus contains 72 balanced Chinese/English tasks, split into a 36-task development set and a 36-task holdout. Two independent blind Subagents classified the frozen corpus without access to gold labels or repository files. On the holdout, each achieved activation Precision/Recall/F1 of `1.0000`, role Macro-F1 of `0.9659`, and `0/10` high-risk false positives.

Run the local fixture and scorer mechanics test with:

```bash
node tests/trigger-eval/run-tests.mjs
```

This measures an independent-agent trigger proxy, not internal Codex production trigger telemetry. Do not tune the holdout set after results are revealed.

## Excluded From Core

The Core repo should not bundle:

- full prompt corpus
- unbounded prompt corpus or Library catalogs
- large Library media, demos, and gallery assets
- generated library indexes
- multi-platform mirror folders

The package intentionally retains bounded Core examples under `skills/immersive-motion-ui/examples/`. Broader prompts, media, demos, and searchable catalogs belong in `Conradgui/immersive-motion-ui-library.git`.
