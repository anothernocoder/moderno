import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/vue'
import AreaChart from './AreaChart.vue'

afterEach(cleanup)

const DATA = [
  { x: 0, y: 10 },
  { x: 1, y: 40 },
  { x: 2, y: 25 },
]

describe('AreaChart', () => {
  it('renders the md-* anatomy with SVG area + line paths sized to the given dimensions', () => {
    const { container } = render(AreaChart, { props: { data: DATA, width: 320, height: 160, label: 'Revenue' } })

    expect(container.querySelector(':scope > .md-chart')).not.toBeNull()

    const svg = screen.getByRole('img', { name: 'Revenue' })
    expect(svg).toHaveClass('md-chart-svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 320 160')

    const paths = svg.querySelectorAll('path')
    expect(paths).toHaveLength(2)

    const areaPath = svg.querySelector('.md-chart-area')
    expect(areaPath).not.toBeNull()
    expect(areaPath?.getAttribute('d')).toMatch(/^M/)

    const linePath = svg.querySelector('.md-chart-line')
    expect(linePath).not.toBeNull()
    expect(linePath?.getAttribute('d')).toMatch(/^M/)
  })

  it('omits point markers by default', () => {
    const { container } = render(AreaChart, { props: { data: DATA } })
    expect(container.querySelectorAll('.md-chart-point')).toHaveLength(0)
  })

  it('renders one point marker per datum when showPoints is set', () => {
    const { container } = render(AreaChart, { props: { data: DATA, showPoints: true } })
    expect(container.querySelectorAll('.md-chart-point')).toHaveLength(DATA.length)
  })
})
