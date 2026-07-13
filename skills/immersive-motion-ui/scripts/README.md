# Core Scripts

This directory contains small deterministic scripts that support the Core Skill.

Available now:

- `audit-ui.mjs` - local UI cheapness, motion, reduced-motion, and template-leak scanner adapted from the best parts of `finesse-ui/scripts/detect.mjs`.
- `verify-ui-evidence.mjs` - wraps static audit output in a UI verification evidence contract and marks browser/runtime checks as `NOT EXECUTED` unless evidence is supplied.
- `query-library.mjs` - optional read-only search over a MotionSites Library checkout; delegates to the Library-native query contract when available and exits successfully with `LIBRARY_NOT_FOUND` when absent.
- `validate-capability-manifest.mjs` - validates the zero-dependency `capability-manifest.json`, including all 14 Core module IDs, active/planned references, fallbacks, verifiers, and the optional Library boundary.

Scripts must be lightweight and must not require the MotionSites resource library to run.

```bash
node scripts/audit-ui.mjs <file-or-directory> [--strict] [--pretty]
node scripts/verify-ui-evidence.mjs <file-or-directory> [--evidence evidence.json] [--strict] [--pretty]
node scripts/query-library.mjs --query "biotech dashboard" [--library path] [--limit 5] [--pretty]
node scripts/validate-capability-manifest.mjs [--manifest path] [--skill-root path] [--pretty]
```

All scripts print JSON. The manifest validator exits non-zero for any contract failure. The audit and evidence scripts use `--strict` to exit non-zero for blocking findings.
