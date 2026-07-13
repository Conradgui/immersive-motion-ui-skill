# Anti-Cheap Audit

Load this for `audit`, `redesign`, "too generic", "make it premium", "more soul", or final UI quality review.

## Audit Stance

Audit is read-only unless the user explicitly asks for edits. Report evidence and severity. Do not rewrite while auditing.

## Severity

- `P0`: breaks function, accessibility, layout integrity, or truthful verification.
- `P1`: materially harms comprehension, brand quality, responsiveness, or maintainability.
- `P2`: polish issue or optional improvement.

## Hard Failure Checks

Flag these:

- claims verification passed without executed evidence
- no mobile or desktop responsive check for a visual UI
- horizontal overflow
- text clipping in buttons, cards, nav, tables, or controls
- missing reduced-motion fallback for continuous or large motion
- placeholder names, fake metrics, or template brand leakage
- inaccessible controls with no names or focus states
- destructive redesign without protected elements

## Generic UI Checks

Flag as P1 or P2 depending on severity:

- centered hero plus generic gradient plus rounded cards
- decorative card shells around whole page sections
- nested cards
- one-note palette dominated by a single hue family
- gradient text as the main visual idea
- dark blurred media that hides the actual subject
- oversized marketing layout used for product/admin work
- meaningless eyebrow labels repeated across sections
- stock phrases such as "Elevate", "Seamless", "Unleash", or "Cutting-edge"

## Overcorrection Checks

Do not recommend swinging to the opposite extreme.

Examples:

- "too flashy" does not mean remove all visual identity
- "too plain" does not mean add gradients, blobs, and parallax everywhere
- "more dense" does not mean shrink text below usability
- "more premium" does not mean luxury serif plus beige background by default
- "more motion" does not mean animate every element

## Audit Output

Use this compact format:

```text
Status: PASS | PASS WITH FINDINGS | FAIL | NOT EXECUTED

P0
- [file:line] Finding. Evidence. Fix direction.

P1
- [file:line] Finding. Evidence. Fix direction.

P2
- [file:line] Finding. Evidence. Fix direction.

Not inspected
- Browser / mobile / console / reduced motion / build / other.
```

If there are no issues, say that clearly and list residual risk or unexecuted checks.
