# Verification Evidence

Use this when finishing a UI build, redesign, audit, or motion-heavy change.

The goal is to report what was actually checked, not to make the work sound complete.

## Status Vocabulary

Use only these final statuses:

- `PASS`: check executed and found no blocking issue.
- `PASS WITH FINDINGS`: check executed and found non-blocking issues.
- `FAIL`: check executed and found blocking issues.
- `NOT EXECUTED`: check could not be run.

Do not convert code inspection into `PASS` for browser behavior.

## Evidence Contract

Report these fields when applicable:

```text
feature_or_surface:
build:
  command:
  exit_code:
static_audit:
  command:
  status:
browser:
  url_or_file:
  desktop_viewport:
  mobile_viewport:
  console_errors:
  horizontal_overflow:
  screenshots:
motion:
  has_motion:
  reduced_motion_result:
accessibility:
  keyboard_focus:
  text_contrast:
performance:
  trace_status:
  lcp_breakdown:
  rerun_result:
memory:
  ownership_scope:
  baseline_target_final:
  analyzer_result:
final_status:
not_executed:
  reason:
```

If browser tooling is unavailable, set browser fields to `NOT EXECUTED` and explain why.

## Required Checks

For new or changed UI, prefer this order:

1. Run available build/lint/typecheck command.
2. Run `scripts/audit-ui.mjs` on changed UI files.
3. Open the target URL or HTML file in a browser when possible.
4. Check desktop and mobile viewport framing.
5. Check console errors.
6. Check horizontal overflow.
7. If motion exists, check `prefers-reduced-motion`.
8. Capture screenshots when browser tooling is available.

Stop early only when a blocking failure makes later checks meaningless.

## Reporting Rules

- Quote command names and exit codes.
- Link file paths when possible.
- Do not claim responsive quality without a mobile viewport check.
- Do not claim motion accessibility without reduced-motion evidence.
- Do not claim visual polish from a static scanner alone.
- Do not claim LCP or memory improvement without a measured trace or snapshot comparison.
- Do not treat an accessibility score as a substitute for semantic, keyboard, focus, target, and contrast evidence.
- If a user only asked for read-only audit, do not edit while gathering evidence.

## Minimal Report Shape

```text
Verification status: PASS | PASS WITH FINDINGS | FAIL | NOT EXECUTED

Executed:
- [command] => [exit code/status]

Observed:
- desktop:
- mobile:
- console:
- overflow:
- reduced motion:

Not executed:
- [check]: [reason]

Remaining risk:
- [short, concrete risk]
```
