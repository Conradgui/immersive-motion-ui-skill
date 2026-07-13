# C02. 品牌 / 作品集

### Shared brief

Design a portfolio and inquiry site for an architecture practice whose differentiator is adaptive reuse. Prospective clients need to understand the work, the method, and whether the practice fits a civic or hospitality project.

### Locked fixture

This fixture contains 合成测试数据: eight projects with title, place, year, type, status, lead image, plan/detail images, and short description; three projects include material-reuse studies; two are completed civic projects; one is a hotel conversion; the practice offers feasibility, design, and delivery services; the primary action is start a project inquiry. Before 和 After 只使用本 fixture，不新增奖项、clients、press quotes or project outcomes.

### Before

This is a credible premium portfolio pattern: a dark full-screen statement, a slow image dissolve, a row of recognition cards, and a uniform project grid. It looks composed, but its first claims could belong to almost any practice and the reuse method is not inspectable.

```text
Hero: "Spaces that endure" / atmospheric building crop
Strip: selected recognition / capabilities / locations
Grid: eight identical project cards
About: broad philosophy paragraph
Footer: contact
```

The project assets exist, but the design treats them as mood and makes the unverified recognition strip look like evidence.

### After

Make adaptive reuse the organizing thesis. Open with one completed building and its retained-versus-added drawing, then sequence projects by transformation type. Captions and material studies become part of the identity, while inquiry remains clear.

```text
First viewport: completed project / retained-added overlay / project facts
Index: reuse strategy filters / eight projects with distinct evidence types
Project sequence: existing condition -> intervention -> current use
Method: three material studies tied to named projects
Inquiry: project type / stage / location / start inquiry
```

Typography, framing, and motion should support the documents and physical details rather than manufacture a generic luxury register.

### Causal delta

| # | Failure | Intervention | User outcome |
| --- | --- | --- | --- |
| 1 | The hero makes an interchangeable quality claim. | Use a real retained-versus-added project document as the thesis. | Visitors understand the practice's specific position before reading broad claims. |
| 2 | Uniform cards flatten different kinds of project evidence. | Let plans, material studies, photography, and captions carry distinct roles. | Users can inspect how the method changes by project rather than browse thumbnails only. |
| 3 | Recognition is implied without fixture evidence. | Remove unsupported authority cues and foreground project facts and process. | Credibility comes from available work rather than invented reputation. |

### Why the after is better

The after is grounded in the subject's own artifacts and makes the firm's differentiator testable. It still serves brand memory, but memory comes from a repeated transformation grammar. Switch toward a hospitality-led narrative when the inquiry mix and available photography show that place experience matters more than process evidence.

### When not to apply

Do not force retained-versus-added diagrams onto a practice without documented reuse work. A new-build studio, interior stylist, or public planning body may need a different thesis and evidence order.

### Overcorrection risk

Evidence-led does not mean turning the portfolio into technical documentation. Preserve emotion, scale, and pacing. One project can carry the thesis; not every image needs annotations or an explanatory overlay.

### Responsive

On mobile, retain project title, place, year, status, and caption with each image. Stack the transformation sequence in reading order and avoid crop choices that hide the intervention being discussed.

### Motion

Use motion to compare existing and transformed states or preserve continuity between index and project. Do not animate every drawing layer. Reduced motion should show both states through a static split, toggle, or adjacent figures.

### Accessibility

Use descriptive project links, figure captions, alternative text that identifies the relevant intervention, visible inquiry labels, keyboard-operable comparisons, and no information available only on hover.

### Performance

Provide correctly sized local images, stable aspect ratios, lazy-load below-fold media, and avoid preloading the entire portfolio. The first meaningful project image must not wait behind decorative video.

### Evidence status

- browser: `NOT EXECUTED`
- responsive: `NOT EXECUTED`
- motion: `NOT EXECUTED`
- accessibility: `NOT EXECUTED`
- performance: `NOT EXECUTED`
- reasoning fixture: `PASS` for locked-content and causal-contract review only

### Source and localization

Original Core case. It adapts thesis-first and subject-grounded design reasoning, but does not reproduce any reviewed portfolio, example identity, layout, copy, typography, or assets.
