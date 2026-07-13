# Industry Direction Tests

These zero-dependency tests protect Roadmap batch B3.

Run from the Core repository root:

```bash
node tests/industry-directions/run-tests.mjs
```

The suite checks the six task-first industry families, two-direction minimum, decision boundaries, anti-stereotype rules, cross-family overrides, source-localization guardrails, and SKILL/routing/manifest reachability.

`forward-evals.json` contains eight Core-only behavior prompts. Its status remains `NOT EXECUTED` until a separately authorized independent agent run records outputs and grading evidence.
