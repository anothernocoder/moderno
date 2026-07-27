# @moderno-ui/chart-core

## 0.2.0

### Minor Changes

- 183dd43: Add the **chart-core** (ADR-0004) and the **Line chart** primitive across all four
  frameworks. `@moderno-ui/chart-core` is a new framework-neutral package — built on
  `d3-scale` + `d3-shape` only — exposing `buildLineGeometry(data, dimensions)`, a pure
  function that projects `{x, y}` data onto linear scales and traces an SVG line path,
  deterministic for fixed input. `LineChart` is a closed-prop primitive (ADR-0003) that
  renders that geometry as token-styled SVG: `data`, `width`/`height`, `showPoints` to
  render a dot per point, and `label`. Stroke and point color come from `--md-*`
  tokens (`--md-primary`), so charts theme (light/dark) with the rest of the system, no
  JS color plumbing. Adds the `md-chart-*` classes to `@moderno-ui/styles`.
- a01a22b: Add the remaining chart primitives — **Area, Bar, Bar List, Donut, Spark** — across
  all four frameworks, reusing the chart-core geometry contract established by Line
  chart (ADR-0004). `@moderno-ui/chart-core` gains `buildAreaGeometry`, `buildBarGeometry`,
  `buildBarListGeometry`, `buildDonutGeometry`, and `buildSparkGeometry` — pure functions
  over `d3-scale`/`d3-shape`, deterministic for fixed input, no new runtime deps. Each is
  a closed-prop primitive (ADR-0003) rendering that geometry as token-styled SVG:
  `AreaChart` (a filled area with a stroked top edge, closing to the plot's bottom
  rather than the data's y=0), `BarChart` (one bar per `{label, value}` datum from a
  shared 0 baseline, negative values growing downward), `BarListChart` (ranked
  horizontal rows with a proportional fill and SVG label/value text, Tremor-style),
  `DonutChart` (`pie`/`arc` slices sized by value, cycling through five `--md-*`
  semantic tokens since there's no dedicated categorical chart palette), and
  `SparkChart` (a minimal edge-to-edge line sized for inline use, defaulting to 120×32,
  with an optional last-point marker). Adds the `md-chart-area`, `md-chart-bar`,
  `md-chart-bar-list-*`, `md-chart-donut-slice`, and `md-chart-spark` classes to
  `@moderno-ui/styles`.
