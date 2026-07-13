# Memory Lifecycle

Use this for memory leak, OOM, listener cleanup, long-lived animation, repeated modal, subscription, or route lifecycle work.

## Ownership Contract

Every listener, timer, observer, animation, request, cache entry, and subscription needs one owner and one cleanup point. A component unmount, route exit, dialog close, or task cancellation must release what that owner created.

## Measurement Gate

Measure only with a baseline snapshot, target snapshot after a repeated interaction, and final snapshot after returning to the original state. Repeat the path enough to amplify a leak before concluding that retained growth is meaningful.

Prefer memlab or an equivalent analyzer for snapshot comparison. Do not read a raw heap snapshot directly into the model. Inspect leak traces, detached DOM, closures, listeners, timers, observers, and unbounded caches through a tool summary.

## Fallback

Without heap tooling, perform a lifecycle checklist and report `memory not measured` / `NOT EXECUTED`. Do not call ordinary garbage collection timing or one heap size a leak proof.
