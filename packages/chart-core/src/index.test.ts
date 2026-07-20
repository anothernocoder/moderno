import { describe, expect, it } from 'vitest'
import { buildLineGeometry, type ChartPoint } from './index'

const DATA: ChartPoint[] = [
  { x: 0, y: 10 },
  { x: 1, y: 40 },
  { x: 2, y: 25 },
  { x: 3, y: 60 },
]
const DIMENSIONS = { width: 300, height: 150 }

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
