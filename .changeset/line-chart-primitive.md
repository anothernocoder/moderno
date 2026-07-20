---
"@moderno/chart-core": minor
"@moderno/react": minor
"@moderno/vue": minor
"@moderno/svelte": minor
"@moderno/solid": minor
"@moderno/styles": minor
---

Add the **chart-core** (ADR-0004) and the **Line chart** primitive across all four
frameworks. `@moderno/chart-core` is a new framework-neutral package — built on
`d3-scale` + `d3-shape` only — exposing `buildLineGeometry(data, dimensions)`, a pure
function that projects `{x, y}` data onto linear scales and traces an SVG line path,
deterministic for fixed input. `LineChart` is a closed-prop primitive (ADR-0003) that
renders that geometry as token-styled SVG: `data`, `width`/`height`, `showPoints` to
render a dot per point, and `label`. Stroke and point color come from `--md-*`
tokens (`--md-primary`), so charts theme (light/dark) with the rest of the system, no
JS color plumbing. Adds the `md-chart-*` classes to `@moderno/styles`.
