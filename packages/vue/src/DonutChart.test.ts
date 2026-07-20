import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/vue'
import DonutChart from './DonutChart.vue'

afterEach(cleanup)

const DATA = [
  { label: 'A', value: 30 },
  { label: 'B', value: 45 },
  { label: 'C', value: 25 },
]

describe('DonutChart', () => {
  it('renders the md-* anatomy with an SVG sized to the given dimensions', () => {
    const { container } = render(DonutChart, { props: { data: DATA, width: 320, height: 160, label: 'Share' } })

    expect(container.querySelector(':scope > .md-chart')).not.toBeNull()

    const svg = screen.getByRole('img', { name: 'Share' })
    expect(svg).toHaveClass('md-chart-svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 320 160')
  })

  it('renders one slice path per datum with a non-empty d attribute', () => {
    const { container } = render(DonutChart, { props: { data: DATA } })
    const slices = container.querySelectorAll('.md-chart-donut-slice')
    expect(slices).toHaveLength(DATA.length)
    slices.forEach((slice) => {
      expect(slice.getAttribute('d')).toBeTruthy()
    })
  })

  it('respects a custom innerRadiusRatio', () => {
    const { container } = render(DonutChart, { props: { data: DATA, innerRadiusRatio: 0 } })
    const slices = container.querySelectorAll('.md-chart-donut-slice')
    expect(slices).toHaveLength(DATA.length)
    slices.forEach((slice) => {
      expect(slice.getAttribute('d')).toBeTruthy()
    })
  })
})
