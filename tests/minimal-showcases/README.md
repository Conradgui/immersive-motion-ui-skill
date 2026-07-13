# Minimal Offline Showcases

The canonical pairs live in `skills/immersive-motion-ui/examples/minimal-showcases/`. Each pair shares a local `fixture.js` and can open through `file://` with no framework, CDN, network font, or remote image.

Run the static contract suite from the Core repository root:

```bash
node tests/minimal-showcases/run-tests.mjs
```

Run browser checks only when a local Playwright package is available:

```bash
PLAYWRIGHT_PACKAGE=/path/to/playwright/index.mjs \
node tests/minimal-showcases/browser-check.mjs --output /path/to/evidence
```

The optional checker captures desktop/mobile screenshots, checks console errors, horizontal overflow, keyboard focus, core interactions, and reduced-motion content. It also writes `browser-evidence.json` for the Commerce after surface; validate it with `verify-ui-evidence.mjs` before reporting a browser `PASS`. Without `PLAYWRIGHT_PACKAGE`, it reports `NOT EXECUTED` without claiming browser validation.
