# C06. 活动 / 沉浸式展示

### Shared brief

Design the release experience for a three-night electronic music festival. Visitors need the lineup, date, venue, ticket path, age policy, accessibility information, and a memorable expression of the event.

### Locked fixture

This fixture contains 合成测试数据: 18 to 20 September; Dock Hall; doors at 18:00; eighteen artists across three nights; day and weekend tickets; age 18+; step-free venue access; captions for stage announcements; last entry at 22:30; one abstract audio-reactive visual concept with a static poster frame. Before 和 After 只使用本 fixture，不新增 sponsors, countdown, sold-out claims, live stream, or artist media.

### Before

This is a plausible spectacle-first campaign. A full-screen interactive canvas and sound-on prompt create a strong first impression. Lineup, date, and tickets appear after an exploratory scroll; the schedule is a horizontal animated strip.

```text
Canvas: enter experience / enable sound
Exploration: reactive visual / artist fragments
Scroll 2: dates and venue
Scroll 3: horizontal lineup strip
Footer: tickets / access / age policy
```

The concept may be memorable, but essential event facts depend on animation, audio consent, rendering success, and scroll discovery.

### After

Keep one primary audio-reactive visual as an optional expressive layer while placing event identity, dates, venue, and tickets in the first viewport. The schedule is a real grouped list; the same static poster frame carries the concept when animation is unavailable.

```text
First viewport: event name / dates / venue / Tickets / optional visual layer
Lineup: three nights / artists / stage and time groups
Plan visit: doors / last entry / age / step-free access / captions
Visual control: play-pause / sound opt-in / static equivalent
Persistent utility: Tickets / Schedule / Access
```

The memorable move remains, but no critical path relies on it.

### Causal delta

| # | Failure | Intervention | User outcome |
| --- | --- | --- | --- |
| 1 | Dates, venue, and tickets require exploratory scroll. | Put identity and critical event facts in the first viewport and persistent utility. | Visitors can act even if they skip the experience layer. |
| 2 | Lineup order depends on a moving horizontal strip. | Use a grouped schedule with time, night, and stage structure. | Visitors can scan, link, and navigate the lineup without chasing motion. |
| 3 | The concept disappears when canvas or audio is unavailable. | Provide a static poster frame and explicit play, pause, and sound controls. | The same idea survives reduced motion, failure, low power, and user preference. |

### Why the after is better

The after does not make the campaign quieter by default. It spends complexity on one concept while protecting time-sensitive information and fallback equivalence. Switch toward a fully exploratory exhibition when there is no ticketing urgency and the interaction itself is the primary artifact.

### When not to apply

Do not use this campaign structure for staff scheduling, ticket account management, or a daily venue operations tool. Those surfaces require product or commerce behavior even when they share the festival brand.

### Overcorrection risk

Information-first can collapse into a generic event poster and waste the brief's expressive opportunity. Keep one justified spectacle and give it enough scale, but do not scatter effects across every section or interaction.

### Responsive

On mobile, keep dates, venue, ticket action, and the first lineup group visible before a heavy visual loads. Replace horizontal schedule motion with vertical grouped sections and stable anchors.

### Motion

Use one primary engine, explicit pause, sound opt-in, and a static reduced-motion equivalent. Do not autoplay audio or require pointer movement. The schedule and ticket controls remain low-motion.

### Accessibility

Provide skip links past the expressive layer, visible controls, keyboard escape and pause, text alternatives for the visual concept, structured lineup headings, access details, and no flashing content beyond safe thresholds.

### Performance

Render the critical text and ticket action before initializing the visual engine, cap work by device capability, stop work when hidden, and treat a nonblank static frame as the fallback rather than an error screen.

### Evidence status

- browser: `NOT EXECUTED`
- responsive: `NOT EXECUTED`
- motion: `NOT EXECUTED`
- accessibility: `NOT EXECUTED`
- performance: `NOT EXECUTED`
- reasoning fixture: `PASS` for locked-content and causal-contract review only

### Source and localization

Original Core case. It adapts one-engine discipline, critical-information priority, and equivalent fallback reasoning without copying an upstream festival page, engine implementation, identity, copy, or visual treatment.
