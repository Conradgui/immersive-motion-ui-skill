# Accessibility Audit

Use this for a11y, ARIA, keyboard, focus, form labels, tap target, contrast, or assistive-technology review.

## Evidence Layers

1. Run Lighthouse when available as an automated baseline, not as compliance proof.
2. Inspect the accessibility tree and heading/landmark structure.
3. Compare DOM order with visual order.
4. Check label and accessible-name coverage for controls, inputs, images, and status changes.
5. Exercise keyboard focus, dialogs, escape/close behavior, and focus restoration.
6. Measure tap target size and contrast when tooling can do so.

Lighthouse does not substitute for a keyboard path, accessibility tree, DOM order, or manual contrast review.

## Reporting

Record each executed layer separately. If a browser or audit adapter is unavailable, mark that layer `NOT EXECUTED`; do not turn semantic source inspection into a full accessibility PASS.
