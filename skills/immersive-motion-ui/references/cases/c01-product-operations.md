# C01. SaaS / 产品工具

### Shared brief

Design a daily patient-flow and bed-operations workspace for a regional hospital. The charge nurse must find congestion, inspect blocked transfers, assign a bed, and leave an auditable reason without moving through a marketing surface.

### Locked fixture

This fixture contains 合成测试数据: three units; Emergency has 14 waiting patients; Ward B is at 92% occupancy; two transfers are blocked; one isolation room is reserved; each transfer has patient initials, waiting time, acuity, destination, blocker, and owner. Available actions are assign bed, change destination, request transport, and record reason. Before 和 After 只使用本 fixture，不新增患者、指标、权限或自动化能力。

### Before

This is a plausible executive dashboard applied to the wrong job. It has polished typography, a calm theme, four summary cards, an occupancy chart, and a recent-activity panel. The transfer list sits below the first viewport and opens in a modal.

```text
Top bar: hospital name / date / profile
Hero: "A clearer day of care" / decorative occupancy animation
Row: Waiting 14 / Occupancy 92% / Blocked 2 / Isolation 1
Main: occupancy chart / recent activity
Below fold: View all transfers -> modal -> row -> second modal -> action
```

It is not broken as a report. It fails as a repeated operational workspace because the issue-to-action path is hidden behind summary and modal depth.

### After

Use an operational workspace with a persistent unit scope, a prioritized exception queue, a stable bed table, and one detail drawer. The same four numbers become scope context rather than the page architecture.

```text
Header: Patient flow / unit switcher / last updated / sync state
Primary split: exception queue | bed and transfer table
Exception row: initials / wait / acuity / destination / blocker / owner
Detail drawer: current facts / available action / required reason / audit history
Footer status: two blocked transfers / keyboard action hints / update state
```

The visual signature can come from the bed-state topology or continuity between queue, row, and drawer. It must not compete with reading or action.

### Causal delta

| # | Failure | Intervention | User outcome |
| --- | --- | --- | --- |
| 1 | Blocked transfers are below summaries and two modal layers. | Put exceptions first and keep details in one non-nested drawer. | The nurse can move from anomaly to action without losing unit context. |
| 2 | Occupancy color carries urgency by itself. | Pair severity with text, wait duration, blocker, and sorting. | Status remains interpretable without color and supports prioritization. |
| 3 | Changing counts resize cards and shift the layout. | Give counters, columns, controls, and loading rows stable dimensions. | Live updates preserve scan position and reduce accidental actions. |

### Why the after is better

The improvement is not that the surface became denser or less decorative. It aligns hierarchy with the recurring decision, exposes recovery states, and shortens a specific action path while preserving auditability. Switch toward a lighter summary view if observation shows the primary audience is executives who do not perform transfer actions.

### When not to apply

Do not reuse this operations shell for a hospital campaign, annual report, patient education story, or public data publication. Those jobs need different narrative and disclosure patterns.

### Overcorrection risk

Operational clarity can become an overcrowded control room. Do not expose every rare field, compress touch targets, or remove calm spacing. Progressive disclosure remains useful when it removes infrequent detail rather than hiding the main task.

### Responsive

On narrow screens, keep the exception queue first, convert the bed table to prioritized rows, and open details as a full-height sheet. Preserve unit scope, blocker, wait, and primary action; do not merely shrink the desktop table.

### Motion

Use brief continuity for row-to-drawer transitions and state confirmation. Avoid ambient backgrounds, looping charts, and delayed entrances. Reduced motion should replace movement with immediate state changes and persistent confirmation.

### Accessibility

Provide landmark and heading structure, keyboard access to sorting and row actions, named state text, visible focus, an announced update result, and error focus that returns to the failed field or action.

### Performance

Reserve row and skeleton dimensions, avoid rerendering the whole table on each update, and virtualize only when the real row count warrants it. A visualization must not become the only route to patient state.

### Evidence status

- browser: `NOT EXECUTED`
- responsive: `NOT EXECUTED`
- motion: `NOT EXECUTED`
- accessibility: `NOT EXECUTED`
- performance: `NOT EXECUTED`
- reasoning fixture: `PASS` for locked-content and causal-contract review only

### Source and localization

Original Core case. It synthesizes product-state, task-density, and evidence-honesty mechanisms from the reviewed skills without reusing an upstream page, persona, palette, markup, or wording.
