import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/svelte'
import DonutChart from './DonutChart.svelte'

afterEach(cleanup)

const DATA = [
  { label: 'A', value: 30 },
  { label: 'B', value: 45 },
  { label: 'C', value: 25 },
]

describe('DonutChart', () => {
  it('renders the md-* anatomy with one slice per datum, sized to the given dimensions', () => {
    const { container } = render(DonutChart, { data: DATA, width: 320, height: 160, label: 'Traffic sources' })

    expect(container.querySelector(':scope > .md-chart')).not.toBeNull()

    const svg = screen.getByRole('img', { name: 'Traffic sources' })
    expect(svg).toHaveClass('md-chart-svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 320 160')

    const slices = container.querySelectorAll('.md-chart-donut-slice')
    expect(slices).toHaveLength(DATA.length)
  })

  it('gives every slice a non-empty path', () => {
    const { container } = render(DonutChart, { data: DATA, width: 320, height: 160 })
    const slices = container.querySelectorAll('.md-chart-donut-slice')
    for (const slice of slices) {
      expect(slice.getAttribute('d')).toBeTruthy()
    }
  })

  it('accepts a custom innerRadiusRatio without redeclaring chart-core defaults', () => {
    const { container } = render(DonutChart, { data: DATA, width: 320, height: 160, innerRadiusRatio: 0 })
    const slices = container.querySelectorAll('.md-chart-donut-slice')
    expect(slices).toHaveLength(DATA.length)
    for (const slice of slices) {
      expect(slice.getAttribute('d')).toBeTruthy()
    }
  })
})
