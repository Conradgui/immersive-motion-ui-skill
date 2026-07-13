# C03. Commerce

### Shared brief

Improve room comparison and booking for a design hotel. Guests need to choose dates, compare room types, understand cancellation and total price, and complete a reservation without losing the hotel's visual character.

### Locked fixture

This fixture contains 合成测试数据: stay from 16 to 18 May for two adults; Courtyard room at 420 per night with free cancellation until 9 May; Loft room at 510 per night with a non-refundable condition; Terrace suite at 640 per night with breakfast included; only two Courtyard rooms remain; taxes are 12 percent; each room has four photos, size, bed, occupancy, and accessibility facts. Before 和 After 只使用本 fixture，不新增折扣、reviews, packages, scarcity, or amenities.

### Before

This is a plausible brand-led booking page. A full-viewport hotel film establishes atmosphere, a compact floating date control opens a booking modal, and room types appear as one-at-a-time image slides. Price is shown per night; cancellation and taxes appear after a room is selected.

```text
Hero film: hotel story / Book stay
Modal step 1: dates and guests
Carousel: one room / nightly price / Select
Modal step 2: cancellation
Modal step 3: taxes and total
```

The imagery is useful, but the interaction prevents comparison and delays material terms.

### After

Keep one strong property image as context, then make the stay summary persistent and show all available rooms in comparable rows. Each row pairs inspectable media with total stay price, cancellation, inclusion, stock truth, and one stable selection control.

```text
Header: dates / guests / change search
Stay summary: two nights / taxes policy / current total after selection
Room rows: gallery / size / bed / accessibility / cancellation / total / Select
Selected room: persistent summary / edit / continue to guest details
Confirmation path: room + dates + terms + itemized total
```

Brand character remains in photography, typography, and transitions, but cannot hide transaction facts.

### Causal delta

| # | Failure | Intervention | User outcome |
| --- | --- | --- | --- |
| 1 | One-at-a-time slides force guests to remember room facts. | Present stable comparable rows with consistent fields. | Guests can compare price, size, terms, and accessibility without memory work. |
| 2 | Taxes and cancellation arrive after selection. | Show material terms and computed stay total beside each option. | Commitment is based on transparent cost and risk rather than late disclosure. |
| 3 | The film delays the booking task on mobile or slow networks. | Keep a lightweight first image and load richer media after controls and facts. | The booking path remains available when media is slow or motion is reduced. |

### Why the after is better

The after improves confidence and continuity using the same rooms and media. It does not reject storytelling; it moves atmosphere into a supporting role once the user enters a transaction. Switch to a more exploratory property story when the observed job is destination discovery rather than immediate room comparison.

### When not to apply

Do not use comparison rows for a single private villa sold by inquiry or for an editorial hotel story with no availability and payment state. Those jobs may legitimately prioritize narrative.

### Overcorrection risk

Transaction clarity can become a commodity travel table that erases the hotel's distinction. Keep room imagery large enough to inspect, preserve meaningful differences, and avoid reducing every fact to compact badges.

### Responsive

On mobile, show dates and total in a stable summary, keep room fields in the same order, allow swipe or tap through photos, and use a bottom action bar only after a room is selected. Do not hide cancellation inside an accordion by default.

### Motion

Use motion for gallery continuity, selected-state feedback, and summary updates. Never delay price or controls. Reduced motion should switch immediately and retain the same selected-room confirmation.

### Accessibility

Name room and rate choices, associate cancellation and price with each option, expose stock as text, support keyboard gallery controls, announce total changes, and return focus to the relevant error after failed validation.

### Performance

Load only the first room image eagerly, size galleries to avoid layout shift, defer film and nonselected galleries, and keep booking controls independent of media success.

### Evidence status

- browser: `NOT EXECUTED`
- responsive: `NOT EXECUTED`
- motion: `NOT EXECUTED`
- accessibility: `NOT EXECUTED`
- performance: `NOT EXECUTED`
- reasoning fixture: `PASS` for locked-content and causal-contract review only

### Source and localization

Original Core case. It synthesizes inspection, trust, state continuity, and dark-pattern avoidance without copying an upstream commerce example, visual theme, product data, or markup.
