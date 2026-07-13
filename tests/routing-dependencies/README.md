# Routing And Dependency Tests

These zero-dependency tests protect Roadmap batch B2.

Run from the Core repository root:

```bash
node tests/routing-dependencies/run-tests.mjs
```

The suite verifies the 14-module Core routing coverage, active/planned honesty, conditional dependency metadata, Core-only Library behavior, and the existing audit/user-control contracts. Deferred integration material is externalized and is not part of this suite.
