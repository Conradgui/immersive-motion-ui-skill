# Design System

Load this for tokens, themes or modes, shared components, variant drift, multi-page consistency, or integration with an existing component library. A design system is a maintained interface between product intent and implementation, not a gallery of styled components.

## Contents

- Source of truth
- Token architecture
- Modes, variants, and states
- Component contract
- Framework adapters
- Change and migration
- Verification

## Establish the Source of Truth

Inspect existing CSS variables, theme configuration, component primitives, design files, and production usage. Choose one implementation authority for runtime behavior. Design tools may document and export decisions, but do not claim parity unless synchronization was executed and verified.

Prefer extending an established local system over creating a parallel token namespace or wrapper library.

## Token Architecture

Use three layers with one-way dependency:

`primitive -> semantic -> component-local exception`

| Layer | Examples | Consumer | Rule |
| --- | --- | --- | --- |
| primitive | raw color, spacing, type size, radius, duration | semantic tokens and tooling | never encode product meaning in the name |
| semantic | surface, text, border, focus, danger, chart-series, motion-feedback | application and components | stable interface across modes |
| component-local | table-row-height, dialog-max-width | one component family | add only when semantic tokens cannot express a repeated constraint |

Components consume semantic tokens. Avoid spreading primitives or hardcoded values through component files. Name tokens by purpose, not by current appearance: `surface-raised` survives a redesign; `light-gray-card` does not.

Token families commonly include:

- color and contrast roles;
- typography roles and numeric formatting;
- spacing, stable dimensions, and layout constraints;
- radius, border, elevation, and material;
- focus, status, data visualization, and selection;
- motion purpose, duration, and easing;
- breakpoint or container behavior where the project represents these as tokens.

Do not tokenize every value. A token earns existence through repeated meaning, cross-page consistency, theming, or governance.

## Modes, Themes, and Registers

A mode remaps semantic roles, such as light, dark, high contrast, or reduced motion. A brand theme changes identity while preserving component meaning. A register changes composition and density for brand, product, commerce, or hybrid work.

Do not fork entire component stylesheets for each mode. Test modes independently; dark mode is not mechanical inversion, and reduced motion is not zero feedback.

## Variants and States

- A **variant** represents a repeated product job: primary action, destructive action, compact density, or emphasized data.
- A **state** represents runtime truth: hover, focus-visible, active, selected, disabled, loading, error, success, empty, or read-only.
- A **size** changes stable geometry without changing intent.
- A **slot** exposes a bounded composition point.

Do not use variants as arbitrary styling knobs. Illegal combinations should be prevented in types, component APIs, documentation, or tests rather than left to visual review.

## Component Contract

For every shared component define:

1. purpose and non-goals;
2. semantic HTML foundation and keyboard model;
3. anatomy and required labels;
4. stable dimensions and responsive behavior;
5. variants, sizes, states, and legal combinations;
6. controlled/uncontrolled or server/client ownership where relevant;
7. content limits, localization, and overflow behavior;
8. motion and reduced-motion behavior;
9. events, errors, and async behavior;
10. visual, interaction, and accessibility examples.

Build primitives around browser semantics when possible. A wrapper must preserve the underlying control's name, value, focus, form behavior, and accessibility contract.

## Framework Adapters

Keep the semantic contract stable while adapting mechanics to the existing stack.

### CSS and Server-Rendered HTML

- Publish semantic CSS custom properties at the appropriate root or theme boundary.
- Use classes or attributes for variants and states; preserve native controls and form submission.
- Keep critical content and component structure usable before client JavaScript.

### React, Vue, Svelte, or Similar Components

- Keep wrappers thin and composable; do not mirror every DOM attribute with a custom prop.
- Forward identifiers, refs or element handles, names, ARIA relationships, and events according to local conventions.
- Separate state ownership from styling. Avoid global stores for state that belongs to one component tree.
- Put client-only boundaries around actual interaction, not the entire system.

### Utility CSS

- Map utilities to semantic variables instead of repeating raw palette values in every component.
- Use a variant composition pattern already present in the repository.
- Keep class generation statically discoverable and avoid unbounded runtime string construction.

### Headless or Third-Party Primitives

- Preserve their keyboard and focus behavior; style through supported APIs rather than DOM-shape assumptions.
- Wrap only to encode local semantics or repeated defaults.
- Record version-specific behavior and do not claim conformance from the dependency name alone.

Figma or another design tool remains optional and credentialed. Do not log in, mutate shared libraries, or state that code and design are synchronized without an executed comparison.

## Change and Migration

Shared token and component changes have wide blast radius.

1. Find real consumers and unsupported one-off values.
2. Define the new semantic contract and migration boundary.
3. Add the new path without silently changing unrelated screens.
4. Migrate representative high-risk consumers first.
5. Verify all modes, states, registers, and responsive constraints.
6. Deprecate the old path with a named removal condition; do not delete it as cleanup during an unrelated task.

Use visual snapshots as regression evidence, not as the only correctness test. Keyboard, semantics, content overflow, and state transitions need behavioral checks.

## Verification

- No active component bypasses required semantic roles with unexplained hardcoded values.
- Modes remap semantics consistently and meet contrast/focus requirements.
- Variants have distinct jobs; states and illegal combinations are covered.
- Long labels, localization, loading, errors, and dynamic content do not resize stable controls unexpectedly.
- Representative brand, product, commerce, and data pages remain coherent without becoming visually identical.
- Framework wrappers preserve native behavior and release owned effects or observers.
- Design-tool parity is reported `NOT EXECUTED` unless actually compared.

