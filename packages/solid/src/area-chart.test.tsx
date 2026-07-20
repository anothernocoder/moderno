import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@solidjs/testing-library'
import { AreaChart } from './area-chart'

afterEach(cleanup)

const DATA = [
  { x: 0, y: 10 },
  { x: 1, y: 40 },
  { x: 2, y: 25 },
]

describe('AreaChart', () => {
  it('renders the md-* anatomy with area + line SVG paths sized to the given dimensions', () => {
    const { container } = render(() => <AreaChart data={DATA} width={320} height={160} label="Revenue" />)

    expect(container.querySelector(':scope > .md-chart')).not.toBeNull()

    const svg = screen.getByRole('img', { name: 'Revenue' })
    expect(svg).toHaveClass('md-chart-svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 320 160')

    const area = svg.querySelector('.md-chart-area')
    expect(area).not.toBeNull()
    expect(area?.getAttribute('d')).toMatch(/^M/)

    const line = svg.querySelector('.md-chart-line')
    expect(line).not.toBeNull()
    expect(line?.getAttribute('d')).toMatch(/^M/)
  })

  it('omits point markers by default', () => {
    const { container } = render(() => <AreaChart data={DATA} />)
    expect(container.querySelectorAll('.md-chart-point')).toHaveLength(0)
  })

  it('renders one point marker per datum when showPoints is set', () => {
    const { container } = render(() => <AreaChart data={DATA} showPoints />)
    expect(container.querySelectorAll('.md-chart-point')).toHaveLength(DATA.length)
  })
})
