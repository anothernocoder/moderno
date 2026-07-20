import { describe, expect, it } from 'vitest'
import {
  buildAreaGeometry,
  buildBarGeometry,
  buildBarListGeometry,
  buildDonutGeometry,
  buildLineGeometry,
  buildSparkGeometry,
  type ChartCategoryDatum,
  type ChartPoint,
} from './index'

const DATA: ChartPoint[] = [
  { x: 0, y: 10 },
  { x: 1, y: 40 },
  { x: 2, y: 25 },
  { x: 3, y: 60 },
]
const DIMENSIONS = { width: 300, height: 150 }

const CATEGORY_DATA: ChartCategoryDatum[] = [
  { label: 'Jan', value: 10 },
  { label: 'Feb', value: 40 },
  { label: 'Mar', value: 25 },
]

describe('buildLineGeometry', () => {
  it('is deterministic for fixed input', () => {
    const a = buildLineGeometry(DATA, DIMENSIONS)
    const b = buildLineGeometry(DATA, DIMENSIONS)
    expect(a.path).toBe(b.path)
    expect(a.points).toEqual(b.points)
  })

  it('projects points to pixel space within the given dimensions', () => {
    const { points } = buildLineGeometry(DATA, DIMENSIONS)
    expect(points).toHaveLength(DATA.length)
    for (const p of points) {
      expect(p.x).toBeGreaterThanOrEqual(0)
      expect(p.x).toBeLessThanOrEqual(DIMENSIONS.width)
      expect(p.y).toBeGreaterThanOrEqual(0)
      expect(p.y).toBeLessThanOrEqual(DIMENSIONS.height)
    }
  })

  it('maps the minimum y to the bottom and the maximum y to the top (SVG y grows downward)', () => {
    const { points } = buildLineGeometry(DATA, DIMENSIONS)
    const minYPoint = points[0] // x:0, y:10 — the smallest y value
    const maxYPoint = points[3] // x:3, y:60 — the largest y value
    expect(minYPoint.y).toBeGreaterThan(maxYPoint.y)
  })

  it('produces a non-empty SVG path starting with a moveto command', () => {
    const { path } = buildLineGeometry(DATA, DIMENSIONS)
    expect(path).toMatch(/^M/)
  })

  it('exposes xScale/yScale consistent with the projected points', () => {
    const geometry = buildLineGeometry(DATA, DIMENSIONS)
    DATA.forEach((d, i) => {
      expect(geometry.xScale(d.x)).toBeCloseTo(geometry.points[i].x)
      expect(geometry.yScale(d.y)).toBeCloseTo(geometry.points[i].y)
    })
  })

  it('falls back to a padded unit domain when every value is equal', () => {
    const flat: ChartPoint[] = [
      { x: 5, y: 5 },
      { x: 5, y: 5 },
    ]
    expect(() => buildLineGeometry(flat, DIMENSIONS)).not.toThrow()
    const { points } = buildLineGeometry(flat, DIMENSIONS)
    expect(Number.isFinite(points[0].x)).toBe(true)
    expect(Number.isFinite(points[0].y)).toBe(true)
  })

  it('returns an empty geometry for empty data without throwing', () => {
    const { path, points } = buildLineGeometry([], DIMENSIONS)
    expect(path).toBe('')
    expect(points).toEqual([])
  })
})

describe('buildAreaGeometry', () => {
  it('is deterministic for fixed input', () => {
    const a = buildAreaGeometry(DATA, DIMENSIONS)
    const b = buildAreaGeometry(DATA, DIMENSIONS)
    expect(a.areaPath).toBe(b.areaPath)
    expect(a.linePath).toBe(b.linePath)
    expect(a.points).toEqual(b.points)
  })

  it('produces non-empty area and line paths starting with a moveto command', () => {
    const { areaPath, linePath } = buildAreaGeometry(DATA, DIMENSIONS)
    expect(areaPath).toMatch(/^M/)
    expect(linePath).toMatch(/^M/)
  })

  it('closes the area path down to the bottom of the plot, not the data y=0', () => {
    // Every y value is positive and far from 0, so the fill must still reach the
    // chart's bottom edge (height - margin) rather than clipping at some y=0 line
    // that sits outside the domain.
    const { areaPath } = buildAreaGeometry(DATA, DIMENSIONS)
    expect(areaPath).toContain(`${DIMENSIONS.height - 8}`)
  })

  it('projects the same points as buildLineGeometry for identical input', () => {
    const area = buildAreaGeometry(DATA, DIMENSIONS)
    const line = buildLineGeometry(DATA, DIMENSIONS)
    expect(area.points).toEqual(line.points)
  })

  it('returns empty paths for empty data without throwing', () => {
    const { areaPath, linePath, points } = buildAreaGeometry([], DIMENSIONS)
    expect(areaPath).toBe('')
    expect(linePath).toBe('')
    expect(points).toEqual([])
  })
})

describe('buildBarGeometry', () => {
  it('is deterministic for fixed input', () => {
    const a = buildBarGeometry(CATEGORY_DATA, DIMENSIONS)
    const b = buildBarGeometry(CATEGORY_DATA, DIMENSIONS)
    expect(a).toEqual(b)
  })

  it('produces one bar per datum, each within the given dimensions', () => {
    const { bars } = buildBarGeometry(CATEGORY_DATA, DIMENSIONS)
    expect(bars).toHaveLength(CATEGORY_DATA.length)
    for (const bar of bars) {
      expect(bar.x).toBeGreaterThanOrEqual(0)
      expect(bar.x + bar.width).toBeLessThanOrEqual(DIMENSIONS.width)
      expect(bar.y).toBeGreaterThanOrEqual(0)
      expect(bar.height).toBeGreaterThanOrEqual(0)
    }
  })

  it('gives the largest value the tallest bar', () => {
    const { bars } = buildBarGeometry(CATEGORY_DATA, DIMENSIONS)
    const tallest = bars.reduce((a, b) => (b.height > a.height ? b : a))
    expect(tallest.label).toBe('Feb') // value: 40, the max in CATEGORY_DATA
  })

  it('grows a negative-value bar downward from the 0 baseline instead of clipping', () => {
    const { bars } = buildBarGeometry([{ label: 'Loss', value: -5 }], DIMENSIONS)
    expect(bars[0].height).toBeGreaterThan(0)
    expect(bars[0].y).toBeLessThanOrEqual(DIMENSIONS.height - 8)
  })

  it('returns no bars for empty data without throwing', () => {
    expect(() => buildBarGeometry([], DIMENSIONS)).not.toThrow()
    expect(buildBarGeometry([], DIMENSIONS).bars).toEqual([])
  })
})

describe('buildBarListGeometry', () => {
  it('is deterministic for fixed input', () => {
    const a = buildBarListGeometry(CATEGORY_DATA, DIMENSIONS)
    const b = buildBarListGeometry(CATEGORY_DATA, DIMENSIONS)
    expect(a).toEqual(b)
  })

  it('produces one row per datum, stacked top to bottom', () => {
    const { rows } = buildBarListGeometry(CATEGORY_DATA, DIMENSIONS)
    expect(rows).toHaveLength(CATEGORY_DATA.length)
    for (let i = 1; i < rows.length; i++) {
      expect(rows[i].y).toBeGreaterThan(rows[i - 1].y)
    }
  })

  it('scales fill width proportionally to the max value, maxing out at the track width', () => {
    const { rows } = buildBarListGeometry(CATEGORY_DATA, DIMENSIONS)
    const max = rows.find((r) => r.label === 'Feb') // value: 40, the max
    expect(max?.percent).toBe(1)
    expect(max?.fillWidth).toBeCloseTo(max!.trackWidth)

    const half = rows.find((r) => r.label === 'Mar') // value: 25
    expect(half?.percent).toBeCloseTo(25 / 40)
  })

  it('returns no rows for empty data without throwing', () => {
    expect(() => buildBarListGeometry([], DIMENSIONS)).not.toThrow()
    expect(buildBarListGeometry([], DIMENSIONS).rows).toEqual([])
  })
})

describe('buildDonutGeometry', () => {
  it('is deterministic for fixed input', () => {
    const a = buildDonutGeometry(CATEGORY_DATA, DIMENSIONS)
    const b = buildDonutGeometry(CATEGORY_DATA, DIMENSIONS)
    expect(a).toEqual(b)
  })

  it('produces one slice per datum, each a non-empty path in input order', () => {
    const { slices } = buildDonutGeometry(CATEGORY_DATA, DIMENSIONS)
    expect(slices.map((s) => s.label)).toEqual(CATEGORY_DATA.map((d) => d.label))
    for (const slice of slices) {
      expect(slice.path.length).toBeGreaterThan(0)
    }
  })

  it('computes each slice percent as its share of the total value', () => {
    const { slices } = buildDonutGeometry(CATEGORY_DATA, DIMENSIONS)
    const total = CATEGORY_DATA.reduce((sum, d) => sum + d.value, 0)
    for (const slice of slices) {
      expect(slice.percent).toBeCloseTo(slice.value / total)
    }
    expect(slices.reduce((sum, s) => sum + s.percent, 0)).toBeCloseTo(1)
  })

  it('sizes the inner radius from innerRadiusRatio, defaulting to a donut hole', () => {
    const donut = buildDonutGeometry(CATEGORY_DATA, DIMENSIONS)
    expect(donut.innerRadius).toBeGreaterThan(0)
    expect(donut.innerRadius).toBeLessThan(donut.radius)

    const pie = buildDonutGeometry(CATEGORY_DATA, DIMENSIONS, 0)
    expect(pie.innerRadius).toBe(0)
  })

  it('returns no slices for empty data without throwing', () => {
    expect(() => buildDonutGeometry([], DIMENSIONS)).not.toThrow()
    expect(buildDonutGeometry([], DIMENSIONS).slices).toEqual([])
  })
})

describe('buildSparkGeometry', () => {
  it('is deterministic for fixed input', () => {
    const a = buildSparkGeometry(DATA, DIMENSIONS)
    const b = buildSparkGeometry(DATA, DIMENSIONS)
    expect(a.path).toBe(b.path)
    expect(a.points).toEqual(b.points)
  })

  it('produces a non-empty path running edge to edge (near-zero margin)', () => {
    const { path, points } = buildSparkGeometry(DATA, DIMENSIONS)
    expect(path).toMatch(/^M/)
    expect(points[0].x).toBeLessThan(8) // well inside Line's 8px margin
    expect(points[points.length - 1].x).toBeGreaterThan(DIMENSIONS.width - 8)
  })

  it('exposes the last point for highlighting the current value', () => {
    const { points, lastPoint } = buildSparkGeometry(DATA, DIMENSIONS)
    expect(lastPoint).toEqual(points[points.length - 1])
  })

  it('returns a null lastPoint for empty data without throwing', () => {
    expect(() => buildSparkGeometry([], DIMENSIONS)).not.toThrow()
    expect(buildSparkGeometry([], DIMENSIONS).lastPoint).toBeNull()
  })
})
