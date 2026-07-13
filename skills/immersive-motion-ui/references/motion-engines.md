# Motion Engines

Load this for cinematic heroes, animation polish, scroll choreography, interaction transitions, reduced-motion concerns, or feedback such as "animate", "more depth", "feels static", or "too flashy".

## Contents

- Motion jobs and ambition
- Engine ladder
- Timing and choreography
- Reusable recipes
- Lifecycle and fallback
- Register guardrails
- Verification

## Rule

Motion must serve hierarchy, state, continuity, or memory. If it only adds decoration, remove or reduce it.

## Motion Jobs

| Job | Use For | Avoid |
| --- | --- | --- |
| hierarchy | reveal reading order, focus, priority | every element entering at once |
| state | active, selected, loading, expanded, dragged | motion with no state change |
| continuity | panel open, route change, filter result update | jumps that disorient users |
| memory | one brand-defining hero or interaction | many competing signature effects |
| depth | layered media, parallax, spatial UI | text over unreadable movement |

## Motion Ambition

Choose the lowest motion level that can express the intended job.

| Level | Typical Scope | Suitable For | Requirement |
| --- | --- | --- | --- |
| low | CSS state transitions and one entrance sequence | product UI, commerce tasks, content-heavy pages | preserve layout and immediate control response |
| medium | coordinated timeline, route continuity, scroll section, or media reveal | brand narratives, launches, editorial experiences | use the existing animation stack and define cleanup |
| high | Canvas, WebGL, 3D, simulation, or synchronized media | a subject whose spatial, generative, or material behavior is central | require a static poster, performance budget, and evidence that simpler motion is insufficient |

Do not equate premium quality with a higher level. Strong typography, composition, media, and precise low-level motion often outperform a large engine.

## Engine Ladder

Use the existing stack first.

1. **CSS transitions:** small state changes, hover, focus, opacity, and transform.
2. **CSS keyframes:** simple repeated or ambient motion with a reduced-motion guard.
3. **Web Animations API or native scroll-driven animation:** imperative sequences or progressive enhancement without a new runtime.
4. **Existing animation library:** coordinated timelines, springs, route transitions, and scoped orchestration when already installed.
5. **Canvas 2D:** many lightweight marks, procedural texture, or an interactive data metaphor that DOM elements cannot express efficiently.
6. **Three.js or existing WebGL stack:** true spatial inspection, lighting, camera, or 3D product behavior that materially improves understanding.

Do not introduce GSAP, Framer Motion, video streaming, or scroll libraries just to make the page feel premium.

Before adding a dependency, confirm bundle cost, framework compatibility, ownership of cleanup, reduced-motion behavior, and a no-library fallback.

## Timing

Defaults:

- micro interaction: 120-180ms
- panel or card transition: 180-280ms
- hero entrance: 500-900ms
- stagger: 20-60ms between related items
- ambient motion: slow enough not to compete with reading

Use easing that matches material:

- functional UI: subtle ease-out
- tactile surface: spring-like but restrained
- cinematic reveal: slower entrance, fast settling

Keep one timing grammar per interaction family. Random durations and easings make even polished effects feel unrelated.

## Reusable Recipes

Recipes describe behavior and constraints, not mandatory libraries.

### State Continuity

Use for drawers, dialogs, filters, tabs, expanders, selection, and route state.

- Keep the trigger and destination visually related; animate only opacity and transform unless size change carries meaning.
- Move focus after the destination becomes available, not after decorative motion finishes.
- On close, restore focus to the invoking control and remove inert or hidden layers.
- Reduced-motion may remove travel while keeping immediate state feedback.

### Entrance Choreography

Use when reading order or a first-view composition benefits from staging.

- Reveal the subject, value, and primary action before supporting metadata.
- Group related elements and stagger groups, not every child node.
- Content must remain present and readable if animation JavaScript fails.
- Run once unless replay communicates a real state reset.

### Type Reveal

Use when language is the main expressive material.

- Prefer line, phrase, or semantic-unit reveals over arbitrary per-character motion.
- Preserve accessible text in the DOM; duplicate visual layers must be hidden from assistive technology.
- Reserve the effect for one signature moment and avoid shifting line breaks after load.
- Fall back to a static composed headline under reduced motion or missing font assets.

### Scroll Narrative

Use when scrolling explains sequence, comparison, transformation, or spatial progression.

- Define a clear beginning, state change, and end; scrolling should reveal causality rather than delay content.
- Pin only when the pinned region earns the occupied viewport time.
- Use observers or native scroll progress where sufficient; avoid global scroll interception.
- On small screens, convert long pinned scenes into normal document flow or discrete steps.

### Canvas Metaphor

Use for procedural texture, many animated marks, or a data/process metaphor linked to the subject.

- Map parameters to real meaning; do not use generic particles as proof of sophistication.
- Cap device pixel ratio, pause offscreen work, and avoid per-frame allocation.
- Keep controls and explanatory content in semantic DOM layers.
- Provide a static image or CSS composition when Canvas is unavailable or motion is reduced.

### Spatial Product or 3D Scene

Use when rotation, depth, assembly, material, or spatial navigation helps users inspect the actual subject.

- Start with a poster or product image before initializing the renderer.
- Load the scene after critical content, bound camera movement, and keep UI controls outside the canvas.
- Dispose geometries, materials, textures, render targets, controls, and animation loops on teardown.
- Replace the scene with an inspectable media gallery when device capability, data budget, or accessibility makes 3D unsuitable.

## Lifecycle Ownership

Every non-trivial motion implementation must identify its owner and teardown path.

- cancel `requestAnimationFrame` loops and Web Animations;
- remove listeners and unsubscribe framework effects;
- disconnect observers;
- scope and revert library timelines or contexts;
- stop media and release object URLs when owned by the component;
- dispose Canvas/WebGL resources;
- pause continuous work when hidden or outside the viewport.

Repeated navigation or opening and closing an interface must not multiply loops, listeners, or scene resources.

## Reduced Motion

If motion is continuous, large, scroll-bound, or attention-grabbing:

- implement `prefers-reduced-motion`
- provide a static equivalent
- avoid hiding content until animation completes
- ensure controls work without animation

Reduced motion is not optional polish. It is part of the motion design.

## Cinematic Hero Guardrails

Use one primary engine:

- media plane
- scroll reveal
- type choreography
- spatial depth
- tactile material

Do not combine all of them. A cinematic hero should still make the subject and action clear in the first viewport.

The hero engine must be downstream of the selected visual direction. Do not choose a particle field, liquid shader, or 3D globe before establishing why that metaphor belongs to the subject.

## Product UI Guardrails

For dashboards and admin tools:

- avoid page-wide cinematic entrances
- prioritize fast state feedback
- keep tables, filters, and forms stable
- animate only the changed region
- preserve keyboard and screen-reader behavior

## Verification

Check:

- motion does not block content or controls
- no layout shift from animated labels, counters, or cards
- no horizontal overflow at mobile width
- reduced-motion path exists when required
- browser console has no animation/runtime errors
- continuous work pauses offscreen and is released on teardown
- high-motion implementations expose a static poster or equivalent content path
