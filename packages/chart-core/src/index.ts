// Chart core — the charting analogue of the behavior-core (see ADR-0004): pure
// geometry shared by every @moderno/{framework} chart primitive. No DOM, no
// framework deps — only d3-scale (axes) + d3-shape (path generation).

import { scaleLinear } from 'd3-scale'
import { curveMonotoneX, line as shapeLine } from 'd3-shape'

export interface ChartPoint {
  readonly x: number
  readonly y: number
}

export interface ChartDimensions {
  readonly width: number
  readonly height: number
}

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

/** Padding between the plotted line and the SVG edge, in px. */
const MARGIN = 8

/**
 * Projects `data` onto linear x/y scales sized to `dimensions` and traces an SVG
 * line path through it. A pure function of its inputs — same data + dimensions
 * always produce the same path string, independent of the rendering framework.
 */
export function buildLineGeometry(data: readonly ChartPoint[], dimensions: ChartDimensions): LineGeometry {
  const xScale = scaleLinear()
    .domain(extent(data.map((d) => d.x)))
    .range([MARGIN, dimensions.width - MARGIN])
  const yScale = scaleLinear()
    .domain(extent(data.map((d) => d.y)))
    .range([dimensions.height - MARGIN, MARGIN])

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
