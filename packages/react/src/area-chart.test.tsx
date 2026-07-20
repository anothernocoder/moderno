import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { AreaChart } from './area-chart'

afterEach(cleanup)

const DATA = [
  { x: 0, y: 10 },
  { x: 1, y: 40 },
  { x: 2, y: 25 },
]

describe('AreaChart', () => {
  it('renders the md-* anatomy with an SVG area + line path sized to the given dimensions', () => {
    const { container } = render(<AreaChart data={DATA} width={320} height={160} label="Revenue" />)

    expect(container.querySelector(':scope > .md-chart')).not.toBeNull()

    const svg = screen.getByRole('img', { name: 'Revenue' })
    expect(svg).toHaveClass('md-chart-svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 320 160')

    const areaPath = svg.querySelector('.md-chart-area')
    expect(areaPath).not.toBeNull()
    expect(areaPath?.getAttribute('d')).toMatch(/^M/)

    const linePath = svg.querySelector('.md-chart-line')
    expect(linePath).not.toBeNull()
    expect(linePath?.getAttribute('d')).toMatch(/^M/)
  })

  it('omits point markers by default', () => {
    const { container } = render(<AreaChart data={DATA} />)
    expect(container.querySelectorAll('.md-chart-point')).toHaveLength(0)
  })

  it('renders one point marker per datum when showPoints is set', () => {
    const { container } = render(<AreaChart data={DATA} showPoints />)
    expect(container.querySelectorAll('.md-chart-point')).toHaveLength(DATA.length)
  })
})
