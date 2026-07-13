# C04. 数据应用 / 仪表盘

### Shared brief

Design a climate-risk analysis workspace for city planners comparing heat and flood exposure by district, time horizon, and confidence. The job is to decide which district needs deeper investigation and explain why.

### Locked fixture

This fixture contains 合成测试数据: North, Central, and Harbor districts; 2030 and 2050 horizons; heat and flood layers; exposure population; low, medium, or high confidence; source year and model name; North has high heat exposure with medium confidence; Harbor has high flood exposure with low confidence; Central is moderate on both. Before 和 After 只使用本 fixture，不新增 forecasts, budgets, recommendations, or live feeds.

### Before

This is a common polished dashboard: four large KPIs, a small map, a donut for risk mix, a trend line, and an assistant panel. Each chart has its own filters and the risk colors have no visible confidence or source context.

```text
KPI row: highest risk / exposed population / change / model count
Grid: map / donut / trend / assistant
Per-card filters: district and horizon
Tooltip: risk value only
```

The components look analytical, but they answer different questions and can display incompatible scopes at once.

### After

Organize a decision cockpit around one shared scope and one comparison question. The map and ranked table share district, hazard, and horizon; selecting a district opens evidence, confidence, source, and a comparable alternate horizon.

```text
Scope bar: hazard / horizon / population layer / source freshness
Primary: map linked to ranked district table
Selection: district facts / confidence / source / 2030 vs 2050
Exception: low-confidence warning beside Harbor result
Fallback: sortable text table containing every mapped value
```

Chart form and color derive from the question and semantics, not from dashboard decoration.

### Causal delta

| # | Failure | Intervention | User outcome |
| --- | --- | --- | --- |
| 1 | Independent card filters allow contradictory scopes. | Use one shared scope and show it above all linked views. | Planners compare map, ranking, and detail under the same assumptions. |
| 2 | Risk values hide confidence and provenance. | Place confidence, source year, and model beside the selected result. | Uncertainty remains part of the decision instead of disappearing in color. |
| 3 | The map is the only complete representation. | Ship a sortable table with the same values and selection state. | Exact reading, keyboard use, export, and nonvisual access remain possible. |

### Why the after is better

The after turns a collection of charts into a coherent decision path and makes uncertainty visible. It avoids implying a recommendation that the fixture does not contain. Switch toward an exploratory workspace when planners need ad hoc variables, saved queries, or multi-model comparison rather than a recurring prioritization decision.

### When not to apply

Do not use this cockpit structure for a public climate story, a static annual report, or a landing page where data is supporting proof. A few metrics do not require an application shell.

### Overcorrection risk

A single decision path can suppress legitimate exploration. Preserve access to alternate horizons and raw values, and do not rank low-confidence estimates as if they were certain facts.

### Responsive

On small screens, place shared scope first, ranking second, selected evidence third, and the map as a linked view rather than the only entry. Keep units and current scope visible during horizontal table inspection.

### Motion

Animate only object continuity during filtering or selection. Do not tween numbers through unreadable intermediate values. Reduced motion should update directly while retaining selected district and scope.

### Accessibility

Provide a complete table fallback, direct labels, units, non-color confidence cues, keyboard selection, descriptive chart summaries, and a focus order that follows scope, result, then evidence.

### Performance

Avoid rerendering every layer when one scope changes, debounce expensive analysis only when needed, reserve chart dimensions, and separate data latency from decorative loading effects.

### Evidence status

- browser: `NOT EXECUTED`
- responsive: `NOT EXECUTED`
- motion: `NOT EXECUTED`
- accessibility: `NOT EXECUTED`
- performance: `NOT EXECUTED`
- reasoning fixture: `PASS` for locked-content and causal-contract review only

### Source and localization

Original Core case. It localizes question-first chart selection, linked scope, uncertainty, provenance, and mandatory fallback mechanisms without copying an upstream dashboard or library configuration.
