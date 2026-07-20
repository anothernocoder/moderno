import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@solidjs/testing-library'
import { SparkChart } from './spark-chart'

afterEach(cleanup)

const DATA = [
  { x: 0, y: 10 },
  { x: 1, y: 40 },
  { x: 2, y: 25 },
  { x: 3, y: 30 },
]

describe('SparkChart', () => {
  it('renders the md-* anatomy with an SVG line path, defaulting to the small inline size', () => {
    const { container } = render(() => <SparkChart data={DATA} label="Trend" />)

    expect(container.querySelector(':scope > .md-chart')).not.toBeNull()

    const svg = screen.getByRole('img', { name: 'Trend' })
    expect(svg).toHaveClass('md-chart-svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 120 32')

    const path = svg.querySelector('.md-chart-spark')
    expect(path).not.toBeNull()
    expect(path?.getAttribute('d')).toMatch(/^M/)
  })

  it('respects custom width/height', () => {
    const { container } = render(() => <SparkChart data={DATA} width={200} height={64} />)
    const svg = container.querySelector('.md-chart-svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 200 64')
  })

  it('omits the last-point marker by default', () => {
    const { container } = render(() => <SparkChart data={DATA} />)
    expect(container.querySelectorAll('.md-chart-point')).toHaveLength(0)
  })

  it('renders a single last-point marker when showLastPoint is set', () => {
    const { container } = render(() => <SparkChart data={DATA} showLastPoint />)
    expect(container.querySelectorAll('.md-chart-point')).toHaveLength(1)
  })

  it('omits the last-point marker for empty data even when showLastPoint is set', () => {
    const { container } = render(() => <SparkChart data={[]} showLastPoint />)
    expect(container.querySelectorAll('.md-chart-point')).toHaveLength(0)
  })
})
