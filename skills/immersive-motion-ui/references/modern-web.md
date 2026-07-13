# Modern Web

Load this for modern CSS, native Web APIs, compatibility questions, or replacing a dependency with a platform feature. Use platform capabilities by progressive enhancement, not novelty.

## Decision Protocol

1. Inspect the project's browser/runtime support policy and existing conventions.
2. Identify whether the capability is core workflow, usability improvement, performance optimization, or visual enhancement.
3. Check current authoritative support information when the decision is time-sensitive and tools are available.
4. Select the smallest semantic baseline that works without the enhancement.
5. Add feature detection and a bounded fallback.
6. Verify both enhanced and fallback paths in a real target environment when possible.

If current support documentation was not checked, describe the rule as a local baseline and report compatibility verification as `NOT EXECUTED`.

## Capability Matrix

| Need | Preferred Baseline | Enhancement | Fallback Concern |
| --- | --- | --- | --- |
| component-local responsive layout | grid/flex and ordinary media rules | container queries and container units | component remains usable in page-level layout |
| parent/sibling-aware styling | explicit class or state attribute | `:has()` | do not hide required state when selector is unsupported |
| modal confirmation or focused task | semantic page region or native dialog behavior | `dialog` | focus entry, escape, backdrop, inert content, and focus restoration |
| lightweight disclosure/menu | visible control and positioned region | Popover API | keyboard model and outside dismissal must match the interaction role |
| anchored tooltip/menu | ordinary positioned layout | CSS anchor positioning | avoid viewport clipping and detached controls |
| route or state continuity | immediate navigation/state update | View Transitions | content and focus cannot wait for animation |
| scroll-linked visual explanation | normal document flow | scroll-driven animation | reduced motion and non-support keep content readable |
| defer heavy offscreen regions | normal rendering or pagination | `content-visibility` and containment | search, focus, intrinsic sizing, and measurement remain correct |
| responsive media | width/height, `srcset`, `sizes`, lazy loading below fold | priority hints or modern formats | do not lazy-load the likely LCP image |

Native does not automatically mean accessible. Choose `dialog`, popover, disclosure, menu, combobox, or tooltip by behavior and keyboard model, not by visual appearance.

## Feature Detection

- CSS features: use `@supports` or `CSS.supports()` when behavior can be selected locally.
- JavaScript APIs: test the exact property or constructor before calling it.
- Input capabilities: do not infer touch, hover, or pointer type from viewport width.
- Motion: use `prefers-reduced-motion` and keep state changes immediate.
- Server rendering: avoid reading browser globals during server execution; enhance after the client boundary.

Feature detection chooses a branch; it does not prove that branch was exercised. Do not label an implementation compatible from static code alone.

## Framework Translation

### Component Frameworks

- Keep support detection near the component or shared capability adapter that owns the behavior.
- Use the framework lifecycle to add and remove listeners, observers, animations, and transitions.
- Avoid replacing a framework's routing, focus, or hydration model solely to access a new browser effect.
- Preserve server-rendered semantic content and avoid hydration-dependent core controls.

### Server-Rendered and Static Pages

- Put the functional HTML and form/link behavior first.
- Add a small module or enhancement layer only for behavior the platform baseline cannot express.
- Avoid shipping a large client runtime for one popover, reveal, or validation behavior.

### Web Components or Embedded Widgets

- Define style and event boundaries deliberately; do not assume page-level tokens cross a shadow root.
- Keep form participation, focus delegation, accessible naming, and cleanup explicit.
- Test inside the actual host page because containment and stacking failures are contextual.

## Dependency Replacement Gate

Replacing a library with a native feature is worthwhile only when it reduces meaningful complexity without losing behavior, compatibility, accessibility, or maintainability.

Compare:

- current bundle and API surface;
- target browser/runtime policy;
- focus, keyboard, positioning, and dismissal behavior;
- framework lifecycle and server rendering;
- fallback code size and long-term ownership;
- migration risk to existing consumers.

Do not rewrite working shared infrastructure merely because a newer API exists.

## Time-Sensitive Guidance

Current browser support, Baseline status, and API details can change. When exact current behavior matters, use available authoritative documentation or local project guidance. Do not require a network search or `npx` command for every frontend task, and do not install a documentation package without approval.

## Verification

- Test the semantic baseline with enhancement code disabled or feature detection forced false.
- Test the enhanced path in at least one real target browser when available.
- Verify keyboard, focus, dismissal, history, and back/forward behavior where relevant.
- Check reduced motion, narrow containers, zoom, localization, and content overflow.
- Confirm no hydration mismatch, listener duplication, layout shift, or console error.
- Separate static risk findings from executed compatibility evidence.

