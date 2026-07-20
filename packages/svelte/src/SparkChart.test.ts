import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/svelte'
import SparkChart from './SparkChart.svelte'

afterEach(cleanup)

const DATA = [
  { x: 0, y: 10 },
  { x: 1, y: 40 },
  { x: 2, y: 25 },
  { x: 3, y: 30 },
]

describe('SparkChart', () => {
  it('renders the md-* anatomy with a single spark path, defaulting to the small inline size', () => {
    const { container } = render(SparkChart, { data: DATA, label: 'Weekly trend' })

    expect(container.querySelector(':scope > .md-chart')).not.toBeNull()

    const svg = screen.getByRole('img', { name: 'Weekly trend' })
    expect(svg).toHaveClass('md-chart-svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 120 32')

    const paths = container.querySelectorAll('.md-chart-spark')
    expect(paths).toHaveLength(1)
    expect(paths[0].getAttribute('d')).toMatch(/^M/)
  })

  it('respects custom dimensions', () => {
    const svg = render(SparkChart, { data: DATA, width: 200, height: 60, label: 'Trend' }).container.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 200 60')
  })

  it('omits the last-point marker by default', () => {
    const { container } = render(SparkChart, { data: DATA })
    expect(container.querySelectorAll('.md-chart-point')).toHaveLength(0)
  })

  it('renders exactly one last-point marker when showLastPoint is set', () => {
    const { container } = render(SparkChart, { data: DATA, showLastPoint: true })
    expect(container.querySelectorAll('.md-chart-point')).toHaveLength(1)
  })

  it('omits the last-point marker when data is empty even if showLastPoint is set', () => {
    const { container } = render(SparkChart, { data: [], showLastPoint: true })
    expect(container.querySelectorAll('.md-chart-point')).toHaveLength(0)
  })
})
