# Media Assets

Load this when a design needs photography, product imagery, illustration, video, texture, audio, or generated media. Core must make a useful media plan without the optional Library.

## Start With The Media Job

Name what the media must do before choosing a source:

- show the actual product, place, person, material, or state
- explain a process or comparison
- establish brand memory
- provide evidence or context
- support navigation or interaction

If media adds atmosphere but hides the subject, delays the task, or repeats what text already says, reduce or remove it.

## Source Priority

Use the first viable source:

1. Existing project or brand assets with known ownership and working paths.
2. User-provided assets, preserving identity, crop intent, and source files.
3. Newly generated media when generation is appropriate to the task and the result can be reviewed.
4. Licensed external media with recorded source, license, and local production plan.
5. A deliberate placeholder or CSS treatment, clearly marked as temporary.

Do not hotlink a remote image as a production asset, copy an unknown third-party file, or invent a license. Do not treat a Library hit as permission to reuse its identity or media.

## Register Rules

### Brand

Prefer media that reveals the actual subject in the first viewport. A place, product, artwork, person, or material should not be replaced by generic atmosphere when inspection matters. Use one primary media idea and let typography and motion support it.

### Product And Data

Do not add decorative hero media to operational tools. Use imagery only when it supports recognition, diagnosis, comparison, onboarding, or an empty state. Charts, maps, screenshots, and thumbnails must preserve labels, units, source, and task order.

### Commerce

Show the real item with stable aspect ratios, useful alternate views, inspectable detail, and honest variants. Do not let lifestyle imagery replace price, availability, terms, dimensions, or product evidence.

## Image Contract

For each important image, define:

- subject and user decision supported
- source and permission state
- local path or generation status
- required aspect ratio and focal point
- responsive variants and expected display size
- meaningful `alt`, empty `alt`, or accessible equivalent
- loading priority and fallback

Reserve dimensions with `width`/`height`, `aspect-ratio`, or stable containers. Use responsive formats and sizes. The first meaningful image may deserve eager loading and high priority; below-fold media usually does not.

## Video And Animated Media

Video is optional enhancement, not structural content.

- provide a poster or composed static frame
- keep critical text and actions outside the video
- mute autoplay video and never autoplay audio
- expose play, pause, and sound controls when the user can perceive or operate the media
- stop work when hidden and respect data, battery, and reduced-motion constraints
- use the existing delivery stack; do not introduce HLS, a player SDK, GSAP, or Three.js only to make media feel premium

If the source, codec, poster, network behavior, or browser support is unverified, report that boundary instead of claiming the video path works.

## Generated Media

Generate media from a subject-specific brief, not a generic style label. Record what must remain true: identity, product geometry, materials, composition, crop space, brand colors, and prohibited inventions. Review outputs for fake text, distorted products, fabricated evidence, unintended trademarks, and inconsistent variants.

Generated imagery must not impersonate a real person, product, metric, event, or documentary record when authenticity matters.

## Library Boundary

The optional Library may suggest IDs, prompts, demos, or local assets after Core has selected the media job and design direction. Treat results as candidates:

- inspect availability, quality state, source, and license
- reject mismatched or generic candidates
- localize identity and constraints
- continue with Core sourcing or generation when no candidate fits

Library absence must never remove the media plan, fallback, performance rules, or accessibility requirements.

## Evidence

Report separately:

- source and permission checked or `NOT EXECUTED`
- file availability checked or `NOT EXECUTED`
- rendered crop and responsive behavior checked or `NOT EXECUTED`
- loading/network behavior measured or `NOT EXECUTED`
- alt text, controls, poster, and reduced-motion path checked or `NOT EXECUTED`

Code inspection can identify risks; it cannot prove that remote media loaded, a crop is correct, or playback performed well.
