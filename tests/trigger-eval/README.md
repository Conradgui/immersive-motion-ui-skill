# Trigger Evaluation v1

This suite measures an independent-agent proxy for immersive-motion-ui activation. It does not claim access to Codex platform trigger telemetry.

Run node tests/trigger-eval/validate-fixtures.mjs to validate frozen distribution, language balance, duplicate prompts, coverage, and schema.

After both blind prediction files exist, run node tests/trigger-eval/score.mjs --predictions path/to/a.json --predictions path/to/b.json --output /tmp/trigger-eval-v1.md.

Raw Subagent outputs are not committed automatically.
