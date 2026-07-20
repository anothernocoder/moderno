// Chart core — the charting analogue of the behavior-core (see ADR-0004): pure
// geometry shared by every @moderno/{framework} chart primitive. No DOM, no
// framework deps — only d3-scale (axes) + d3-shape (path generation).

import { scaleBand, scaleLinear } from 'd3-scale'
import { arc as shapeArc, area as shapeArea, curveMonotoneX, line as shapeLine, pie as shapePie, type PieArcDatum } from 'd3-shape'

export interface ChartPoint {
  readonly x: number
  readonly y: number
}

export interface ChartDimensions {
  readonly width: number
  readonly height: number
}

/** A labeled value — the datum shape for the categorical charts (Bar, Bar List, Donut). */
export interface ChartCategoryDatum {
  readonly label: string
  readonly value: number
}

/** Padding between the plotted geometry and the SVG edge, in px. */
const MARGIN = 8

/** Min/max of `values`, padded to a non-zero span when every value is equal. */
function extent(values: readonly number[]): [number, number] {
  if (values.length === 0) return [0, 1]
  let min = values[0]
  let max = values[0]
  for (const v of values) {
    if (v < min) min = v
    if (v > max) max = v
  }
  return min === max ? [min - 1, max + 1] : [min, max]
}

/** Linear x/y scales over `data`'s extent, sized to `dimensions` with `margin` px of padding. */
function buildXYScales(data: readonly ChartPoint[], dimensions: ChartDimensions, margin: number) {
  const xScale = scaleLinear()
    .domain(extent(data.map((d) => d.x)))
    .range([margin, dimensions.width - margin])
  const yScale = scaleLinear()
    .domain(extent(data.map((d) => d.y)))
    .range([dimensions.height - margin, margin])
  return { xScale, yScale }
}

// ---------- Line ----------

export interface LineGeometry {
  /** SVG path `d` attribute tracing the line through `data`, in plot order. */
  readonly path: string
  /** Each input point projected to pixel space, same order as `data`. */
  readonly points: readonly ChartPoint[]
  /** Data x -> pixel x, exposed so a framework layer can render matching axes. */
  readonly xScale: (x: number) => number
  /** Data y -> pixel y, exposed so a framework layer can render matching axes. */
  readonly yScale: (y: number) => number
}

/**
 * Projects `data` onto linear x/y scales sized to `dimensions` and traces an SVG
 * line path through it. A pure function of its inputs — same data + dimensions
 * always produce the same path string, independent of the rendering framework.
 */
export function buildLineGeometry(data: readonly ChartPoint[], dimensions: ChartDimensions): LineGeometry {
  const { xScale, yScale } = buildXYScales(data, dimensions, MARGIN)

  const path =
    shapeLine<ChartPoint>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(curveMonotoneX)(data as ChartPoint[]) ?? ''

  const points = data.map((d) => ({ x: xScale(d.x), y: yScale(d.y) }))

  return {
    path,
    points,
    xScale: (x: number) => xScale(x),
    yScale: (y: number) => yScale(y),
  }
}

// ---------- Area ----------

export interface AreaGeometry {
  /** SVG path `d` attribute for the filled area, closed down to the baseline. */
  readonly areaPath: string
  /** SVG path `d` attribute for the stroked line along the area's top edge. */
  readonly linePath: string
  /** Each input point projected to pixel space, same order as `data`. */
  readonly points: readonly ChartPoint[]
  readonly xScale: (x: number) => number
  readonly yScale: (y: number) => number
}

/**
 * Like `buildLineGeometry`, plus a filled area path closed down to the bottom of
 * the plot (not the data's y=0, so it reads correctly even when every value is
 * positive and 0 sits outside the domain).
 */
export function buildAreaGeometry(data: readonly ChartPoint[], dimensions: ChartDimensions): AreaGeometry {
  const { xScale, yScale } = buildXYScales(data, dimensions, MARGIN)
  const baseline = dimensions.height - MARGIN

  const linePath =
    shapeLine<ChartPoint>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(curveMonotoneX)(data as ChartPoint[]) ?? ''

  const areaPath =
    shapeArea<ChartPoint>()
      .x((d) => xScale(d.x))
      .y0(baseline)
      .y1((d) => yScale(d.y))
      .curve(curveMonotoneX)(data as ChartPoint[]) ?? ''

  const points = data.map((d) => ({ x: xScale(d.x), y: yScale(d.y) }))

  return {
    areaPath,
    linePath,
    points,
    xScale: (x: number) => xScale(x),
    yScale: (y: number) => yScale(y),
  }
}

// ---------- Bar ----------

export interface BarRect {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly label: string
  readonly value: number
}

export interface BarGeometry {
  readonly bars: readonly BarRect[]
}

const BAR_BAND_PADDING = 0.2

/** [min(0, ...values), max(0, ...values)] — always includes the 0 baseline. */
function barValueDomain(values: readonly number[]): [number, number] {
  let min = 0
  let max = 0
  for (const v of values) {
    if (v < min) min = v
    if (v > max) max = v
  }
  return min === max ? [min, max + 1] : [min, max]
}

/**
 * One band per datum (by `label`), bar height from the 0 baseline to `value` —
 * bars for negative values grow downward from the baseline instead of clipping.
 */
export function buildBarGeometry(data: readonly ChartCategoryDatum[], dimensions: ChartDimensions): BarGeometry {
  const xScale = scaleBand<string>()
    .domain(data.map((d) => d.label))
    .range([MARGIN, dimensions.width - MARGIN])
    .padding(BAR_BAND_PADDING)
  const yScale = scaleLinear()
    .domain(barValueDomain(data.map((d) => d.value)))
    .range([dimensions.height - MARGIN, MARGIN])
  const baseline = yScale(0)
  const bandwidth = xScale.bandwidth()

  const bars = data.map((d) => {
    const valueY = yScale(d.value)
    return {
      x: xScale(d.label) ?? 0,
      y: Math.min(valueY, baseline),
      width: bandwidth,
      height: Math.abs(baseline - valueY),
      label: d.label,
      value: d.value,
    }
  })

  return { bars }
}

// ---------- Bar List ----------

export interface BarListRow {
  readonly x: number
  readonly y: number
  readonly height: number
  /** Full-width track behind the fill, in px. */
  readonly trackWidth: number
  /** Fill width proportional to `value / max(value)`, in px. */
  readonly fillWidth: number
  readonly label: string
  readonly value: number
  /** `value / max(value)`, in `[0, 1]`. */
  readonly percent: number
}

export interface BarListGeometry {
  readonly rows: readonly BarListRow[]
}

const BAR_LIST_ROW_GAP = 8

/**
 * One horizontal row per datum, each a track spanning the full width with a fill
 * proportional to its share of the largest value — the Tremor-style "bar list".
 */
export function buildBarListGeometry(data: readonly ChartCategoryDatum[], dimensions: ChartDimensions): BarListGeometry {
  const trackWidth = Math.max(dimensions.width - MARGIN * 2, 0)
  const maxValue = data.reduce((max, d) => Math.max(max, d.value), 0)
  const rowCount = data.length
  const rowHeight = rowCount === 0 ? 0 : Math.max((dimensions.height - MARGIN * 2 - BAR_LIST_ROW_GAP * (rowCount - 1)) / rowCount, 0)

  const rows = data.map((d, i) => {
    const percent = maxValue > 0 ? Math.max(d.value, 0) / maxValue : 0
    return {
      x: MARGIN,
      y: MARGIN + i * (rowHeight + BAR_LIST_ROW_GAP),
      height: rowHeight,
      trackWidth,
      fillWidth: trackWidth * percent,
      label: d.label,
      value: d.value,
      percent,
    }
  })

  return { rows }
}

// ---------- Donut ----------

export interface DonutSlice {
  /** SVG path `d` attribute for this slice's arc. */
  readonly path: string
  readonly label: string
  readonly value: number
  /** `value / total`, in `[0, 1]`. */
  readonly percent: number
}

export interface DonutGeometry {
  readonly slices: readonly DonutSlice[]
  readonly center: ChartPoint
  readonly radius: number
  readonly innerRadius: number
}

const DEFAULT_INNER_RADIUS_RATIO = 0.6

/**
 * One arc per datum, sized proportionally to `value` (negative values treated as
 * 0), in input order (no re-sorting by size). `innerRadiusRatio` controls the
 * donut hole; pass `0` for a full pie.
 */
export function buildDonutGeometry(
  data: readonly ChartCategoryDatum[],
  dimensions: ChartDimensions,
  innerRadiusRatio: number = DEFAULT_INNER_RADIUS_RATIO,
): DonutGeometry {
  const center = { x: dimensions.width / 2, y: dimensions.height / 2 }
  const radius = Math.max(Math.min(dimensions.width, dimensions.height) / 2 - MARGIN, 0)
  const innerRadius = radius * innerRadiusRatio
  const total = data.reduce((sum, d) => sum + Math.max(d.value, 0), 0)

  const arcs: PieArcDatum<ChartCategoryDatum>[] = shapePie<ChartCategoryDatum>()
    .value((d) => Math.max(d.value, 0))
    .sort(null)(data as ChartCategoryDatum[])

  const arcGenerator = shapeArc<PieArcDatum<ChartCategoryDatum>>().innerRadius(innerRadius).outerRadius(radius)

  const slices = arcs.map((a) => ({
    path: arcGenerator(a) ?? '',
    label: a.data.label,
    value: a.data.value,
    percent: total > 0 ? Math.max(a.data.value, 0) / total : 0,
  }))

  return { slices, center, radius, innerRadius }
}

// ---------- Spark ----------

export interface SparkGeometry {
  /** SVG path `d` attribute tracing the line through `data`, edge to edge. */
  readonly path: string
  readonly points: readonly ChartPoint[]
  /** The last point, for highlighting the current value — `null` when `data` is empty. */
  readonly lastPoint: ChartPoint | null
  readonly xScale: (x: number) => number
  readonly yScale: (y: number) => number
}

/** Sparklines run edge to edge, so their margin is just enough to keep the stroke from clipping. */
const SPARK_MARGIN = 2

/**
 * Like `buildLineGeometry`, sized for small inline use: near-zero margin (edge to
 * edge) and the last point called out for highlighting the current value.
 */
export function buildSparkGeometry(data: readonly ChartPoint[], dimensions: ChartDimensions): SparkGeometry {
  const { xScale, yScale } = buildXYScales(data, dimensions, SPARK_MARGIN)

  const path =
    shapeLine<ChartPoint>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(curveMonotoneX)(data as ChartPoint[]) ?? ''

  const points = data.map((d) => ({ x: xScale(d.x), y: yScale(d.y) }))

  return {
    path,
    points,
    lastPoint: points.length > 0 ? points[points.length - 1] : null,
    xScale: (x: number) => xScale(x),
    yScale: (y: number) => yScale(y),
  }
}
