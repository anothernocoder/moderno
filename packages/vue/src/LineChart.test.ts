import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/vue'
import LineChart from './LineChart.vue'

afterEach(cleanup)

const DATA = [
  { x: 0, y: 10 },
  { x: 1, y: 40 },
  { x: 2, y: 25 },
]

describe('LineChart', () => {
  it('renders the md-* anatomy with an SVG line path sized to the given dimensions', () => {
    const { container } = render(LineChart, { props: { data: DATA, width: 320, height: 160, label: 'Revenue' } })

    expect(container.querySelector(':scope > .md-chart')).not.toBeNull()

    const svg = screen.getByRole('img', { name: 'Revenue' })
    expect(svg).toHaveClass('md-chart-svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 320 160')

    const path = svg.querySelector('path')
    expect(path).toHaveClass('md-chart-line')
    expect(path?.getAttribute('d')).toMatch(/^M/)
  })

  it('omits point markers by default', () => {
    const { container } = render(LineChart, { props: { data: DATA } })
    expect(container.querySelectorAll('.md-chart-point')).toHaveLength(0)
  })

  it('renders one point marker per datum when showPoints is set', () => {
    const { container } = render(LineChart, { props: { data: DATA, showPoints: true } })
    expect(container.querySelectorAll('.md-chart-point')).toHaveLength(DATA.length)
  })
})
