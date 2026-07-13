# Capability Manifest Tests

These zero-dependency tests protect the Core capability contract introduced in Roadmap batch B1.

Run from the Core repository root:

```bash
node tests/capability-manifest/run-tests.mjs
```

The suite verifies:

- a valid 14-module Core manifest passes; deferred integrations are not Core routes;
- missing fallback, hard Library dependency, and duplicate IDs fail;
- missing or unsafe active reference paths fail;
- planned capabilities cannot default-load;
- the formal manifest passes the standalone CLI;
- the Core package report includes the capability manifest result.

Fixture JSON files describe intentional mutations applied to an otherwise valid manifest. They are not alternate production manifests.
