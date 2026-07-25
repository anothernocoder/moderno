---
"@moderno-ui/chart-core": minor
"@moderno-ui/react": minor
"@moderno-ui/vue": minor
"@moderno-ui/svelte": minor
"@moderno-ui/solid": minor
"@moderno-ui/styles": minor
---

Add the **chart-core** (ADR-0004) and the **Line chart** primitive across all four
frameworks. `@moderno-ui/chart-core` is a new framework-neutral package — built on
`d3-scale` + `d3-shape` only — exposing `buildLineGeometry(data, dimensions)`, a pure
function that projects `{x, y}` data onto linear scales and traces an SVG line path,
deterministic for fixed input. `LineChart` is a closed-prop primitive (ADR-0003) that
renders that geometry as token-styled SVG: `data`, `width`/`height`, `showPoints` to
render a dot per point, and `label`. Stroke and point color come from `--md-*`
tokens (`--md-primary`), so charts theme (light/dark) with the rest of the system, no
JS color plumbing. Adds the `md-chart-*` classes to `@moderno-ui/styles`.
