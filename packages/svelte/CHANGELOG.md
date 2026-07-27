# @moderno-ui/svelte

## 0.2.0

### Minor Changes

- 076b3dc: Add the **Alert** primitive across all four frameworks — inline feedback
  (info/success/warning/error), a display-only, closed-prop primitive (ADR-0003)
  mirroring Callout's structure with `role="alert"` instead of `role="note"`. No
  Zag machine. Takes `variant`, an optional `title`, and body content. Adds the
  `md-alert-*` classes to `@moderno-ui/styles`.
- e5b1859: Add the **Carousel** primitive across all four frameworks — a horizontally (or
  vertically) sliding gallery built on Zag.js's `carousel` machine using native CSS
  scroll-snap. A **compositional** primitive (ADR-0003): `Carousel.Root` (takes the
  required `slideCount`, plus `orientation`, `page`/`defaultPage`, `onPageChange`, `loop`,
  `slidesPerPage`, `slidesPerMove`, `autoSize`, `allowMouseDrag`, `autoplay`, `spacing`,
  `padding`, `translations`), `Carousel.ItemGroup`, `Carousel.Item`, `Carousel.Control`,
  `Carousel.PrevTrigger`, `Carousel.NextTrigger`, `Carousel.IndicatorGroup` (a render
  function / scoped slot / parameterized snippet called per snap point), and
  `Carousel.Indicator`. Adds the `md-carousel-*` classes to `@moderno-ui/styles`.
- 7442f28: Add three closed-prop primitives (ADR-0003) across all four frameworks:

  - **Combobox** — searchable single-select over Zag.js's `combobox` machine. Takes
    `items` and filters them by label as the user types; emits `md-combobox-*` classes.
  - **Menu** — pull-down of actions over Zag.js's `menu` machine. Takes `triggerLabel`
    and `items` (label + value), fires `onSelect` with the item's value; emits
    `md-menu-*` classes.
  - **NumberInput** — numeric field with −/+ steppers over Zag.js's `number-input`
    machine, with min/max clamping and keyboard stepping; emits `md-number-input-*`
    classes.

  Adds the matching token-driven CSS to `@moderno-ui/styles`.

- eddb799: Add the **DatePicker** primitive across all four frameworks — single date and range
  selection with a day/month/year calendar, a compositional primitive (ADR-0003) over Zag.js's
  `date-picker` machine. `DatePicker.Root` takes `selectionMode` (`'single' | 'range'`),
  `defaultValue`/`value` (ISO 8601 date strings) with `onValueChange`, `min`, `max`,
  `disabled`, `locale`, and `startOfWeek`. Ships `DatePicker.Label`, `.Control`, `.Input`,
  `.Trigger`, `.ClearTrigger`, and `.Content` (which renders the full day/month/year calendar
  internally). Adds the `md-datepicker-*` classes to `@moderno-ui/styles`.
- 95ce458: Default component copy is now English instead of Spanish. `Dialog.closeLabel`
  defaults to `Close`, `Spinner.label` to `Loading`, and `Select` placeholder to
  `Select…`. `Chip` gains a `removeLabel` prop (default `Remove`) — its remove
  button's `aria-label` was previously hardcoded and could not be translated.

  Consumers relying on the old Spanish defaults should pass the corresponding prop
  explicitly.

- 183dd43: Add the **chart-core** (ADR-0004) and the **Line chart** primitive across all four
  frameworks. `@moderno-ui/chart-core` is a new framework-neutral package — built on
  `d3-scale` + `d3-shape` only — exposing `buildLineGeometry(data, dimensions)`, a pure
  function that projects `{x, y}` data onto linear scales and traces an SVG line path,
  deterministic for fixed input. `LineChart` is a closed-prop primitive (ADR-0003) that
  renders that geometry as token-styled SVG: `data`, `width`/`height`, `showPoints` to
  render a dot per point, and `label`. Stroke and point color come from `--md-*`
  tokens (`--md-primary`), so charts theme (light/dark) with the rest of the system, no
  JS color plumbing. Adds the `md-chart-*` classes to `@moderno-ui/styles`.
- 31c22e4: Add the **Pagination** primitive across all four frameworks — accessible page-by-page
  navigation over long result sets, a closed-prop primitive (ADR-0003) over Zag.js's
  `pagination` machine. Takes `count`, `page`/`defaultPage` (`v-model`/`bind:page` on
  Vue/Svelte), `pageSize`/`defaultPageSize`, `siblingCount`, `boundaryCount`, and
  `translations` for localized a11y labels. Renders prev/next triggers, numbered page
  items, and an ellipsis for truncated ranges. Adds the `md-pagination-*` classes to
  `@moderno-ui/styles`.
- eb006eb: Add the **Popover** primitive across all four frameworks — an anchored, non-modal
  panel built on Zag.js's `popover` machine (closed-prop, ADR-0003). Takes
  `triggerLabel`, optional `title`, `content`, and `closeLabel`; renders its own
  trigger button and a token-styled panel with an arrow and close button. Adds the
  `md-popover-*` classes to `@moderno-ui/styles`.
- fb9455b: Add the **Progress** primitive across all four frameworks — linear and circular,
  determinate and indeterminate, a closed-prop primitive (ADR-0003) over Zag.js's
  `progress` machine. Takes `label`, `value`/`defaultValue` (`number | null`, where
  `null` renders an indeterminate bar/ring), `min`, `max`, `variant`
  (`'linear' | 'circular'`), and `showValue`. Adds the `md-progress-*` classes to
  `@moderno-ui/styles`.

  Works around an upstream `@zag-js/solid` bug where the bindable's controlled check
  (`props().value != undefined`) treats an explicit `value={null}` as uncontrolled
  (loose equality folds `null` into `undefined`), which would otherwise prevent the
  Solid adapter from ever reaching the indeterminate state when controlled.

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
- 4a5b506: Add the **Sheet** primitive across all four frameworks — a slide-in side/bottom
  drawer, a compositional variant of Dialog (ADR-0003) over the same Zag.js
  `dialog` machine. Exposes `Sheet.Root`, `Sheet.Trigger`, `Sheet.Content` (with
  a `side` prop: `right` | `left` | `top` | `bottom`), `Sheet.Title`, and
  `Sheet.Close`, sharing one machine instance via context per framework. Adds
  the `md-sheet-*` classes and slide-in/out animations to `@moderno-ui/styles`.
- 6510158: Add the **Splitter** primitive across all four frameworks — resizable panes with
  draggable, keyboard-accessible resize triggers, a closed-prop primitive (ADR-0003) over
  Zag.js's `splitter` machine. Takes a `panels` array of ids and size constraints
  (`minSize`/`maxSize`/`collapsedSize`/`collapsible`/`resizeBehavior`), plus
  `orientation`, `size`/`defaultSize`, `onResize`/`onResizeStart`/`onResizeEnd`,
  `keyboardResizeBy`, and `resizeTriggerLabel` for a localized a11y label. Panel content
  is provided the idiomatic way per framework: `children` on each panel (React/Solid) or
  a slot/snippet named after the panel `id` (Vue/Svelte). Adds the `md-splitter-*`
  classes to `@moderno-ui/styles`.
- 329049c: Add the **Toast** primitive across all four frameworks — transient, non-blocking
  notifications over Zag.js's `toast` machine. Closed-prop (ADR-0003): create a
  `toaster` store once with `createToaster`, mount a single `<Toaster>` region for
  it, then call `toaster.create(...)` from anywhere to show a notification.
  Stacking, auto-dismiss timers, pause-on-hover/focus, and ARIA (`role="status"`,
  a live region) come from Zag. Adds the `md-toast-*` classes to `@moderno-ui/styles`.

### Patch Changes

- f8d56d7: Add render-test coverage for the compositional primitives — Tabs, Accordion,
  and Select — across all four frameworks: anatomy classes, Zag-driven ARIA, and
  the "used outside its Root" error each part throws.

  Extracted the hand-copied create/read/throw context triad into a shared
  `createPartContext` helper per framework. As part of this, Vue's compositional
  parts now throw a descriptive `Moderno: <X.part> must be used inside <X.Root>`
  error when used outside their Root, matching React and Solid's existing
  per-part message (Svelte keeps its existing, coarser per-family message),
  instead of a raw `Cannot read properties of undefined` `TypeError`.

- Updated dependencies [076b3dc]
- Updated dependencies [e5b1859]
- Updated dependencies [7442f28]
- Updated dependencies [eddb799]
- Updated dependencies [183dd43]
- Updated dependencies [31c22e4]
- Updated dependencies [eb006eb]
- Updated dependencies [fb9455b]
- Updated dependencies [a01a22b]
- Updated dependencies [4a5b506]
- Updated dependencies [6510158]
- Updated dependencies [329049c]
  - @moderno-ui/styles@0.2.0
  - @moderno-ui/chart-core@0.2.0
