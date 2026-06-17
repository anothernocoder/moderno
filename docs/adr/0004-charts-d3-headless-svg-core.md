# Charts: headless d3 core rendered to SVG per framework

Status: accepted

## Decision

Moderno ships **interactive chart primitives** (Area, Bar, Line, Donut, Spark, Bar
List) as npm packages, built on a **framework-neutral chart core** of `d3-scale` +
`d3-shape`. The core is pure functions (scales, path/arc generators) shared across
frameworks; each `@moderno/{framework}` package renders the resulting geometry as
**SVG** and reads `--md-*` tokens for color, so theming is inherited from CSS with no
JS color plumbing. No monolithic charting library (Chart.js, ECharts, Unovis) is used.

## Context

The structure doc marks charting as "not available in this version", and the vanilla
reference draws charts as hand-rolled static SVG. Product direction is to ship charts
now as real interactive primitives, which overrides that note. The hard part is the
four-framework promise: most chart libraries either render to canvas (breaking
token-driven theming and SVG scaling) or lack a Solid adapter (Unovis, Chart.js
wrappers). `d3-scale`/`d3-shape` are framework-agnostic math with no DOM, so they slot
into the same "one core, four adapters" shape Moderno already uses for [[behavior-core]]
(Zag) — the [[chart-core]] is the charting analogue.

## Consequences

- A shared `@moderno/charts-core` (d3-scale + d3-shape) is the single geometry source;
  interaction (hover, tooltip) is wired per framework, mirroring the Zag per-framework
  cost noted in ADR-0002.
- Charts are SVG, so color/stroke come from `--md-*` tokens like every other primitive;
  no computed-style reads, no canvas.
- d3-scale/d3-shape are the only new runtime deps; the rest of d3 is excluded.
- Real-time/streaming charts (the reference's liveline canvas) are out of scope for this
  SVG core and deferred.
