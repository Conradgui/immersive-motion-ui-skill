# Finesse Network-Enhanced References

Source: `mouse-lin/finesse-skill`, local authorized copy from `/Users/conrad/Downloads/finesse-skill`.

License: MIT for the Finesse source; see `LICENSE`. Remote fonts, Unsplash images, Three.js, GSAP, and other third-party resources retain their own terms. The upstream MIT license must not be treated as relicensing those dependencies.

## Execution Status

| File | Teaching Value | Runtime Boundary | Status | Fallback |
| --- | --- | --- | --- | --- |
| `aether-cinematic-tech.html` | one technical 3D hero engine, camera restraint, content overlay | Google Fonts and pinned Three.js `0.160.0` from jsDelivr | `network-required-unverified` | inspect source and retain readable semantic content/static hero if WebGL or network fails |
| `nova-brutal-typographic.html` | type-led composition, controlled collision, fashion image rhythm | Google Fonts, Unsplash, unbundled GSAP/ScrollTrigger | `source-reference-only` | use the typographic and composition logic with local media and existing motion stack |
| `offscreen-editorial.html` | editorial pacing, plates, caption hierarchy, scroll reveal | Google Fonts, Unsplash, unbundled GSAP/ScrollTrigger | `source-reference-only` | preserve article hierarchy and use static sections or existing reveal system |
| `signal-phosphor-terminal.html` | operational density, Canvas signal texture, phosphor hierarchy | Google Fonts and unbundled GSAP/ScrollTrigger | `source-reference-only` | keep the dense operational UI; omit ambient motion when runtime is absent |
| `studio-quiet-luxury.html` | restrained spacing, image masks, quiet material motion | Google Fonts, unbundled GSAP/ScrollTrigger, unbundled `_assets` images | `source-reference-only` | replace missing media with project-owned assets and keep a static composition |

## Use Rules

1. Probe the current project stack and network policy before adapting any runtime technique.
2. Prefer an already installed dependency. Adding or downloading a library still requires confirmation.
3. Do not claim these raw references were executed unless the exact dependencies and assets were present and the page was inspected.
4. Preserve semantic content, reduced-motion behavior, cleanup ownership, and static fallback when localizing an effect.
5. Do not introduce remote fonts or images into a user project without checking its privacy, CSP, licensing, and performance requirements.

