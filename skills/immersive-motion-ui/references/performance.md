# Performance Evidence

Use this for LCP, CWV, slow first render, render blocking, or media loading complaints. Do not call a static review a performance measurement.

## Measurement Gate

Say performance is measured only after a trace is recorded under a stated device and network profile, then rerun after a change. Without a trace, report `NOT EXECUTED` and provide a static risk review only.

## LCP Diagnosis

Break LCP into four parts before proposing a fix:

1. TTFB.
2. resource load delay.
3. resource load duration.
4. element render delay.

Identify the LCP element, its discovery path, request timing, and render blockers. Fix the largest measured bottleneck rather than assuming the image file is the problem.

## Static Risk Review

When trace tooling is absent, inspect but do not measure:

- LCP candidate is discoverable in initial HTML and not lazy loaded.
- hero/media dimensions prevent layout shift.
- critical UI is not blocked on nonessential media, animation, fonts, or synchronous work.
- responsive sources and priority hints match the actual first viewport.

Report `performance not measured`; do not invent LCP, INP, CLS, TTFB, or improvement numbers.
