# Data UI

Load this for dashboards, analytical workbenches, tables, charts, monitoring, reporting, or any interface where data is the primary content. Product register is the default: clarity, traceability, and action outrank spectacle.

## Contents

- Decision and data contract
- Representation matrix
- Tables and charts
- Uncertainty and state
- Accessibility and responsive behavior
- Rendering strategy
- Verification

## Start With the Decision

Before selecting a chart or component, state:

1. the decision or action the user must make;
2. the consequence of a wrong interpretation;
3. the comparison unit and time horizon;
4. whether exact lookup, pattern detection, explanation, or monitoring is primary;
5. the source of truth and expected freshness.

If no decision is served, remove the visualization or reduce it to supporting context.

## Data Contract at Point of Use

Every important value must make its meaning recoverable without hidden documentation.

- metric name and definition;
- unit, currency, denominator, and aggregation;
- time range, timezone, and comparison baseline;
- source and last successful update;
- observed, estimated, predicted, imputed, or manually overridden status;
- completeness, confidence, and known exclusions where relevant.

Keep `zero`, `unknown`, `not applicable`, and `not yet received` distinct. Rankings, forecasts, anomaly flags, and generated summaries are interpretations, not facts.

## Representation Matrix

Choose by the question, then test whether a simpler table or text answer is stronger.

| Question | Primary Representation | Switch or Supplement When |
| --- | --- | --- |
| exact lookup, audit, compare many fields | sortable/filterable table | use summary metrics only to orient the table |
| trend or rate of change | line; area only when magnitude matters | use small multiples when series become hard to distinguish |
| category comparison or rank | horizontal or vertical bar | use table for many categories or close values |
| part to whole | 100% stacked bar; donut only for few distinct parts | use table when exact percentages or many parts matter |
| distribution and outliers | histogram, box plot, strip/dot plot | show sample size and summary statistics |
| relationship between variables | scatter; bubble only for a meaningful third measure | aggregate dense points or expose a table subset |
| actual versus target | bullet, variance bar, or paired value | avoid gauge when no meaningful threshold exists |
| forecast and uncertainty | line plus confidence interval and actual/forecast boundary | show assumptions and scenario controls |
| hierarchy | indented table/tree; treemap as overview | keep hierarchy navigable without area judgment |
| flow between stages or entities | funnel for ordered drop-off; Sankey for quantities between nodes | provide a source-target-value table |
| geographic difference | map only when location is causal or operational | use ranked bar when shape or area would mislead |
| event sequence or process | timeline, step flow, or process map | show duration, exception, and bottleneck table |
| live monitoring | current value, threshold, trend, and event log | provide pause, freshness, and last-known state |

Never use 3D decoration to encode ordinary values. Do not rotate labels to rescue a poor chart choice.

## Tables

Tables are the default for exact comparison, audit, bulk action, and high-cardinality data.

- Align numbers, percentages, and currency by magnitude; use tabular numerals when available.
- Keep identifiers, timestamps, status, and actions stable while descriptive columns flex.
- Choose and preserve one row-density mode for the task; do not let loading or hover change row height.
- Announce sort with `aria-sort`; keep filters named, removable, URL-shareable when appropriate, and paired with result count.
- Show range, total count, and selection scope. A bulk action must say whether it affects visible rows, selected rows, or the full filtered result.
- Use virtualized rows only when measurement proves ordinary rendering insufficient; preserve keyboard order and accessible row context.
- On narrow screens, prioritize columns, offer a detail disclosure, or switch to a structured list. Do not silently hide decision-critical fields.

## Chart Interaction Contract

- Direct labels are preferable when they reduce legend lookup.
- Tooltips supplement visible information; they cannot be the only way to obtain a value.
- Zoom, brush, drill-down, and legend filtering must expose current scope and a reset path.
- Selection persists only when persistence is understandable; route or filter changes must not leave stale highlights.
- Streaming charts need pause/resume, freshness status, bounded history, and a non-moving reduced-motion state.
- Animation communicates update, continuity, or causality. It must not delay reading or imply nonexistent precision.

## Uncertainty and State

Design these states independently:

| State | Required Communication | Recovery |
| --- | --- | --- |
| loading | reserved final geometry and what is loading | cancel only when the operation is meaningfully cancellable |
| empty | whether no records exist or setup is incomplete | create, connect, or change scope |
| no result | active query/filter produced zero matches | clear or edit filters |
| partial | which sources or dimensions are missing | retry or inspect coverage |
| stale | age and last successful update | refresh or use last-known data knowingly |
| error | failed boundary and user impact | retry, change input, or contact owner |
| permission denied | unavailable scope without leaking protected data | request access or switch scope |

Skeletons must match final geometry. Never replace a failed or empty chart with a blank plotting area.

## Accessibility Grade

Classify each visualization before implementation:

- **robust:** meaning survives visible labels and a concise summary;
- **conditional:** needs a second encoding such as shape, pattern, line style, or direct annotation;
- **fragile:** needs an adjacent table or structured list to preserve meaning;
- **supplementary only:** spatial or network views that cannot be the sole representation.

Never rely on color, hover, animation, or position alone. Fragile examples commonly include dense pies, treemaps, Sankey diagrams, sunbursts, word clouds, and complex maps. Network and 3D plots are supplementary unless an equivalent navigable representation exists.

## Rendering Strategy

Select rendering technology after measuring representative data, not from chart fashion.

- Semantic HTML: values, summaries, tables, and controls.
- SVG: moderate mark counts, sharp labels, direct interaction, and accessible grouping.
- Canvas: many marks or frequent redraws; keep semantics and controls in the DOM.
- WebGL: very large spatial data or real 3D meaning; require capability fallback and resource cleanup.

Prefer an existing chart library and its established wrapper. Add a new library only when required chart behavior, accessibility, bundle cost, server rendering, theming, and cleanup have been compared. Do not choose a library because a reference named it.

## Verification

Check with representative dense, sparse, stale, partial, empty, and failure fixtures:

- definitions, units, source, freshness, and uncertainty remain visible;
- table sorting, filtering, pagination or virtualization, selection, and bulk scope are correct;
- chart type answers the stated question and its fallback preserves exact values;
- keyboard, focus, labels, non-color encoding, and reduced motion work;
- narrow layouts preserve decision-critical information;
- rendering remains responsive at expected volume and releases continuous work.

If source, browser, assistive technology, or performance evidence was not executed, report that dimension as `NOT EXECUTED` rather than inferring success.

