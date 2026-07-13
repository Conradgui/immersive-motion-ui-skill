# Data Apps

Load this when the task includes a data source, query layer, analytical workflow, dashboard runtime, reporting application, or data-backed action. Reuse the existing stack, authentication boundary, and deployment path before selecting a framework.

## Architecture Before Framework

Map this path before implementation:

`source of truth -> access/query boundary -> validation/normalization -> view model -> table/chart -> user action -> write/audit boundary`

Name the owner, schema, freshness target, row-level access, privacy class, and failure behavior at each relevant boundary. UI code must not silently redefine business metrics.

## Framework Decision

| Existing Context | Default Direction | Why | Do Not Assume |
| --- | --- | --- | --- |
| static or server-rendered site | keep server rendering and add small client islands | smallest operational change | SPA rewrite or client-side data exposure |
| React, Vue, Svelte, Angular, or similar app | use its router, state, query, form, and component patterns | consistency and maintenance | a second state or chart framework |
| Python analytical project with Streamlit already present | extend Streamlit and isolate data functions | fast iteration near Python logic | pixel-level app behavior it cannot maintain well |
| notebook or script prototype | keep computation separate; choose report, Streamlit, or web app by audience | prevents prototype UI from owning domain logic | production readiness |
| explicit greenfield web application | compare existing organization standards; React/Vite is one option | high interaction and custom UI may justify it | React/Vite as a universal default |

Choosing a framework is an ownership decision: it changes who can maintain the product, where state lives, how it deploys, and how failures are observed. New dependencies or scaffolding require user confirmation.

## Shared Implementation Contract

Separate four layers even when they share a file in a small project:

1. **domain/query:** parameters, permissions, metric definitions, and writes;
2. **normalization:** validate shape, units, nulls, timestamps, and provenance;
3. **view model:** derive display-ready rows, series, confidence, and state;
4. **presentation:** render semantic controls, tables, charts, and feedback.

Do not format currency, dates, percentages, or status independently in every component. Centralize semantic formatting and preserve raw values for sorting and calculation.

## Async State Model

Represent at least:

`idle -> loading -> success(full | partial | empty | stale) | error | denied`

- Abort or ignore obsolete requests when filters change.
- Keep previous results only when the UI labels them as previous or stale.
- Encode filters and time range in the URL when users need shareable or recoverable views.
- Separate data refresh from destructive writes; optimistic updates need rollback and conflict behavior.
- Cache only with a named freshness and invalidation policy.
- Never expose credentials, privileged queries, or unrestricted datasets to the browser bundle.

## Framework Translation

### Component-Based Web Apps

- Keep fetching and mutation in the project's existing query/service layer.
- Components receive typed or validated view models, not transport responses.
- Route-level boundaries handle loading and unrecoverable errors; local components handle local state.
- Preserve stable keys, memoize only measured bottlenecks, and virtualize only after representative-volume evidence.
- Use semantic tokens and existing primitives; wrappers around chart libraries own resize, event, and disposal logic.

### Server-Rendered and Island Architectures

- Render decision-critical content and initial data on the server where permissions allow.
- Hydrate only controls or visualizations that require interaction.
- Keep a functional form, link, table, or download path when client enhancement fails.
- Avoid sending a second full copy of large datasets solely to animate the first render.

### Streamlit or Similar Python Data Apps

- Keep data loading, transformation, and metric definitions in testable functions outside widget layout.
- Cache by explicit inputs and freshness; do not cache user-private results across authorization boundaries.
- Store only necessary interaction state and guard reruns from repeating writes.
- Use native components first. Custom HTML/CSS is bounded enhancement, not a parallel hidden frontend.
- If the task requires complex client state, deep accessibility control, or highly custom interactions, explain why a web application may be the maintainable path.

## Actions and Auditability

Distinguish analysis from mutation. Export, annotate, approve, edit, and delete actions need explicit scope, permission, pending state, success evidence, and recoverable failure. Destructive or cloud writes remain behind confirmation gates.

For recommendations or model outputs, preserve the inputs, model/version when available, timestamp, confidence or limitation, and human override. Do not present generated interpretation as source data.

## AI Chat Is Opt-In

Do not proactively add or ask about AI chat merely because the app contains data. Enter this path only when the user explicitly requests natural-language interaction.

When requested:

- define permitted data scope and tool/action boundary;
- cite the data, filters, and time range behind an answer;
- separate retrieved facts, calculations, and generated interpretation;
- respect row-level permissions and log consequential actions;
- keep filters, tables, exports, and auditable workflows available;
- require explicit confirmation before writes.

## No-Tool Fallback

Without an approved source, connector, credential, runtime, or dependency, deliver the useful local boundary: fixture schema, typed interface, state model, component plan, and integration checklist. Report the connection or deployment as `NOT EXECUTED`; never invent successful access.

## Verification

- Validate representative full, empty, partial, stale, malformed, denied, and failed responses.
- Verify request cancellation, URL state, refresh, writes, rollback, and permission boundaries where present.
- Check narrow and dense layouts, keyboard paths, table fallbacks, and semantic formatting.
- Confirm the production build and framework-specific cleanup without claiming deployment unless executed.
- Record source, runtime, credentials, and browser evidence separately so one passing layer does not mask another.

