# Image Generation

Load this after `media-assets.md` when a task may need newly generated imagery. Image generation is an optional execution tool, not a Core dependency and not a substitute for factual evidence.

## Choose The Route First

Choose one primary route before writing a prompt:

| Route | Use when | Image generation |
| --- | --- | --- |
| `EXISTING` | suitable project or user-provided assets already exist | skip |
| `LIBRARY` | an available, licensed, task-aligned Library asset is verified or localized | skip unless a real coverage gap remains |
| `LIBRARY_THEN_IMAGEGEN` | Library provides useful prompts, cases, or direction but no usable asset | generate only the uncovered asset from a localized brief |
| `IMAGEGEN` | the task needs original conceptual, illustrative, atmospheric, material, or synthetic-safe media | call when a generation tool is available |
| `AUTHENTIC_SOURCE` | identity, exact product geometry, real place, person, event, evidence, or documentary truth matters | forbidden as a replacement |
| `NO_MEDIA` | media does not improve recognition, diagnosis, comparison, onboarding, navigation, or brand memory | skip |

Do not choose `IMAGEGEN` merely because the tool exists. A product or data UI normally needs no decorative hero image.

## Core-Only Route

1. Inspect project and user-provided assets.
2. Name the media job and truth class.
3. If the route is `IMAGEGEN`, load and follow the available image-generation tool or Skill.
4. Generate the smallest useful asset set, review it, save it inside the current project, and integrate it through the existing stack.
5. If no generation tool is available, keep the brief and use a deliberate CSS, local-media, or marked-placeholder fallback. Report generation as `NOT EXECUTED`.

Do not install an image SDK, add an API key, or create a remote generation service merely to complete this route.

## Core + Library Route

Core routing and the media job come first. Query the Library only when it may reduce uncertainty or provide a reusable candidate.

- Use a verified or localized exact-fit asset when its source, permission, availability, and identity fit the task.
- Treat a Library prompt, case, or direction as input to a new localized brief, not as a fixed aesthetic.
- Generate only the missing asset or variant; do not regenerate adequate Library media for novelty.
- If Library retrieval is weak or empty, continue from the Core brief. Do not broaden the page direction to fit a retrieved item.
- Record a generated output as newly generated provenance. Do not relabel it as a Library asset.

Skip Library lookup when the user supplied the needed asset, the task requires an original direction, authenticity requires an authoritative source, or media is unnecessary.

## Generation Brief

Define these fields before calling a generation tool:

```text
Media job:
Page register and placement:
Subject:
Truth class: conceptual | illustrative | material | product-exact | documentary
User decision supported:
Composition and focal point:
Aspect ratio and responsive crop space:
Materials, light, palette, and brand constraints:
Facts and identity that must remain true:
Prohibited inventions, text, marks, and visual cliches:
Variant consistency requirements:
Target file and format:
Alt intent: meaningful | decorative | equivalent elsewhere
```

Use subject evidence and composition constraints instead of a generic style label. Ask one focused question only when an unknown identity, product fact, or protected brand constraint would make generation unsafe.

## Truth Boundary

Never use generated imagery to impersonate:

- a real person or endorsement;
- an exact product, medical device, property, artwork, or interface state;
- documentary evidence, a historical record, a measured result, or a real event;
- a customer, partner, certification, award, press mention, or transaction.

For prototypes, clearly mark synthetic examples in surrounding documentation or fixture data. Do not add visible "AI generated" labels to production UI unless the product or policy requires them.

## Review Before Integration

Reject or regenerate when the output has:

- fake or misspelled text;
- distorted product geometry, hands, faces, architecture, or repeated objects;
- unintended trademarks, recognizable copied identity, or fabricated evidence;
- a focal point that fails the required desktop or mobile crop;
- inconsistent subject identity across variants;
- generic atmosphere that hides the actual page subject.

After review:

1. Use a suitable local format and compression level.
2. Reserve stable dimensions and define responsive behavior.
3. Add meaningful alt text, empty alt, or an accessible equivalent.
4. Keep critical content and controls independent of image loading.
5. Verify the rendered crop at relevant viewports and report loading or browser evidence honestly.

## Evidence

```text
Media route: EXISTING | LIBRARY | LIBRARY_THEN_IMAGEGEN | IMAGEGEN | AUTHENTIC_SOURCE | NO_MEDIA
Library query: SKIPPED | EXECUTED | NOT_AVAILABLE
Generation tool: AVAILABLE | UNAVAILABLE | NOT_CHECKED
Generation: PASS | REJECTED | NOT_EXECUTED
Source/provenance:
Files written:
Truth review:
Desktop/mobile crop:
Accessibility:
Performance/loading:
```

Generation success does not prove integration quality. A saved file still requires rendered-page verification.
