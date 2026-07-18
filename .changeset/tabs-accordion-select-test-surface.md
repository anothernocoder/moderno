---
"@moderno/react": patch
"@moderno/vue": patch
"@moderno/svelte": patch
"@moderno/solid": patch
---

Add render-test coverage for the compositional primitives — Tabs, Accordion,
and Select — across all four frameworks: anatomy classes, Zag-driven ARIA, and
the "used outside its Root" error each part throws.

Extracted the hand-copied create/read/throw context triad into a shared
`createPartContext` helper per framework. As part of this, Vue's compositional
parts now throw a descriptive `Moderno: <X.part> must be used inside <X.Root>`
error when used outside their Root, matching React/Svelte/Solid, instead of a
raw `Cannot read properties of undefined` `TypeError`.
