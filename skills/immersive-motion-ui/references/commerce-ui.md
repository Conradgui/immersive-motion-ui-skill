# Commerce UI

Load this for product detail pages, product listing pages, carts, checkout surfaces, pricing, booking, and conversion flows.

## Job

Commerce UI must help users inspect, compare, trust, and act. It can be premium, but it must not hide product evidence or purchase controls behind brand spectacle.

## Surface Router

| Surface | Primary Job | Bias |
| --- | --- | --- |
| PDP | inspect one product and decide | media quality, specs, variants, proof, CTA clarity |
| PLP | compare many products | filters, sort, density, scan speed, product cards |
| Cart | review commitment | totals, edits, trust, shipping/tax clarity |
| Checkout | complete transaction | low distraction, error recovery, progress, security cues |
| Pricing | compare plans | feature clarity, trade-offs, self-selection |
| Booking | choose time/place/service | availability, constraints, confirmation |

## Commerce Principles

Do:

- keep the primary action visible and named
- show price, availability, variants, and constraints early
- make product media inspectable, not decorative
- preserve comparison cues across cards and rows
- show trust, shipping, returns, or guarantee information near the decision
- design loading, error, disabled, selected, and sold-out states

Avoid:

- cinematic hero that pushes product details below the fold
- hiding filters or cart edits behind clever interactions
- decorative gradients as the main product evidence
- one-card-at-a-time browsing when comparison matters
- checkout motion that slows completion
- changing payment, tax, or order logic unless explicitly asked

## PDP Checklist

Include:

- product name and category
- price or quote path
- variant/state controls
- media gallery or product visual
- short proof or material detail
- delivery/return/availability cue
- primary CTA and secondary action

The first viewport should reveal the product and the next decision, not just a mood.

## PLP Checklist

Include:

- filters and sort
- result count or current scope
- stable product card dimensions
- comparable price/spec/status fields
- empty and loading states
- responsive grid/list behavior

Do not let hover-only interactions carry required product information.

## Cart And Checkout

Protect:

- order data
- form semantics
- validation and error recovery
- payment/security messaging
- accessibility labels

Reduce visual noise. Checkout is not the place for experimental navigation or heavy motion.

## Booking And Reservation Lifecycle

Use this when a user reserves limited capacity, an appointment, a room, a seat, or a service slot. The UI may show an availability snapshot, but only the server can confirm the final reservation.

- Keep selection, submit pending, confirmed, waitlist, sold out, cancelled, and unknown-result states distinguishable.
- Use an idempotent submit key or equivalent request boundary. A duplicate submit must not create a second reservation.
- If a last available place is taken concurrently, show the server-confirmed outcome and a recovery path; do not present the earlier client count as a promise.
- Show the applicable cancellation rule version, deadline, and material consequence before commitment and again in the confirmation view.
- A cancel action needs a clear cancel confirmation. After the server confirms a cancellation, reflect the resulting status before claiming that capacity changed.
- When a cancellation can release capacity, show the server result. If a waitlist exists, state the policy and notification outcome supplied by the service.
- Do not auto-promote a waitlist entry, invent a priority rule, or claim a notification was sent without an explicit business rule and server response.

Verify the lifecycle with a last available capacity race, duplicate submit, failed or unknown submit result, cancellation confirmation, and waitlist notification path. These are task-flow checks, not decorative states.

## Review Questions

Ask:

1. Can the user inspect the product before acting?
2. Can the user compare alternatives quickly?
3. Is the primary action obvious and stable?
4. Are trust and constraints near the decision?
5. Did visual polish improve confidence rather than obscure information?
