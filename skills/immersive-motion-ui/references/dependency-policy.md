# Dependency Policy

Use this when a capability may depend on a Library, browser, trace, heap tool, platform runtime, cloud project, account, or current external documentation.

## Capability Probe

Before using a conditional dependency:

1. Read `capability-manifest.json` for the matching module.
2. Confirm whether the capability is `active` or `planned`.
3. Inspect which tools, network access, accounts, credentials, and runtimes actually exist.
4. Ask for confirmation only when using the dependency would install software, access credentials, create resources, spend money, publish, or make destructive changes.
5. If the dependency is unavailable, use the declared fallback and preserve an honest verification state.

## Dependency Attributes

| Attribute | Meaning |
| --- | --- |
| `required` | Core cannot perform that specific active path without it. Core-level capabilities should avoid this for external services. |
| `optional` | Enhances execution; absence must lead to fallback, not a fabricated result. |
| `credentialed` | May access an account, secret, project, private file, or authenticated session. |
| `time-sensitive` | API, model, compatibility, CLI, platform rule, or remote content must be checked against a current source before relying on it. |

`required` and `optional` are dependency kinds. `credentialed` and `time-sensitive` are independent boolean risk attributes. The optional MotionSites Library must never be required.

## Active And Planned Capabilities

- `active`: the listed Core references exist and can guide the task now.
- `planned`: the target reference is Roadmap intent, not an available implementation.

For a planned capability, do not read a missing `planned_references` path and do not describe the capability as implemented. Use the manifest fallback for the part Core can safely perform.

## Fallback

Use the narrow fallback named by the matching capability. Common patterns:

- `core-only`: continue without the optional Library.
- `static-code-review`: inspect files without claiming browser execution.
- `stable-local-baseline`: use bundled stable guidance and mark current docs unchecked.
- `static-performance-review`: identify risks without claiming measured improvement.
- `lifecycle-checklist`: review ownership and cleanup without confirming a leak.
- `configuration-plan-only`: produce a local plan without provisioning cloud resources.

Fallback is a real reduced path, not a softer word for success.

## Verification State

Match the claim to the evidence:

- No browser: `NOT EXECUTED` for browser checks.
- No trace: `performance not measured`.
- No heap comparison: `memory not measured`.
- No current documentation lookup: `current docs not checked`.
- No account or emulator: `service not provisioned`.
- No Library: `core-only`.

## Forbidden Claims

Do not claim:

- a planned capability is implemented;
- a missing reference was read;
- an optional dependency is required for normal Core use;
- a conditional tool or external service operation ran without evidence;
- a time-sensitive API, model, compatibility rule, or CLI command is current without checking;
- a configuration plan proves cloud deployment or service behavior;
- a fallback result is equivalent to the preferred execution path.

## Routing Note

For a conditional capability, report a compact steering note:

```text
Capability:
Status: active | planned
Dependency: available | unavailable | not checked
Fallback:
Verification:
```
