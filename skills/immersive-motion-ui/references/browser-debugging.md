# Browser Debugging

Use this for browser debugging, interaction inspection, console/network diagnosis, or runtime UI evidence. Browser tooling is optional. Do not install a browser, log in, or change remote state just to make this check pass.

## Capability Probe

1. Identify the existing local browser adapter and the target URL or file.
2. If no adapter is available, run static review only and report browser work as `NOT EXECUTED`.
3. Reuse an existing authenticated session only for read-only inspection. Do not expose tokens, cookies, private data, or network payloads in evidence.

## Inspection Order

1. Navigate and wait for the intended state.
2. Take a semantic snapshot before interacting; use a screenshot for visual framing, not as the only interaction source.
3. Check desktop and mobile viewports, console errors, horizontal overflow, focus visibility, and the first broken boundary in the user story.
4. For stateful UI, exercise one bounded path such as filter -> result, select -> confirmation, or invalid submit -> recovery.
5. When motion exists, repeat the relevant state with reduced motion enabled.

`first broken boundary` means the earliest point where a user cannot complete the critical task. Report that boundary and its observable evidence before listing polish issues.

## Write Boundary

Inspection is read-only by default. Ask before any action that can submit a form, change account data, create records, trigger billing, publish content, or alter production state. A logged-in browser session is not permission to perform writes.

## Evidence Contract

For a browser `PASS`, capture all of the following:

- target URL or local file
- desktop and mobile viewport outcomes
- numeric console error count
- horizontal overflow outcome
- screenshot paths for both viewports
- reduced-motion result when the surface has motion

Use `PASS WITH FINDINGS`, `FAIL`, or `NOT EXECUTED` when the observed result requires it. A static audit, a screenshot, or a successful navigation alone does not prove browser behavior.

## Fallback

Without browser tooling, inspect code and run available static checks. State exactly which browser checks are `NOT EXECUTED` and why; do not turn the fallback into a browser pass.
