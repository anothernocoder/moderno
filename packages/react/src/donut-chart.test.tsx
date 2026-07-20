import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { DonutChart } from './donut-chart'

afterEach(cleanup)

const DATA = [
  { label: 'Chrome', value: 60 },
  { label: 'Safari', value: 25 },
  { label: 'Firefox', value: 15 },
]

describe('DonutChart', () => {
  it('renders the md-* anatomy with an SVG sized to the given dimensions', () => {
    const { container } = render(<DonutChart data={DATA} width={320} height={160} label="Browsers" />)

    expect(container.querySelector(':scope > .md-chart')).not.toBeNull()

    const svg = screen.getByRole('img', { name: 'Browsers' })
    expect(svg).toHaveClass('md-chart-svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 320 160')
  })

  it('renders one slice path per datum with a non-empty d attribute', () => {
    const { container } = render(<DonutChart data={DATA} />)
    const slices = container.querySelectorAll('.md-chart-donut-slice')
    expect(slices).toHaveLength(DATA.length)
    for (const slice of slices) {
      expect(slice.getAttribute('d')).toBeTruthy()
    }
  })

  it('respects a custom innerRadiusRatio without throwing', () => {
    const { container } = render(<DonutChart data={DATA} innerRadiusRatio={0} />)
    expect(container.querySelectorAll('.md-chart-donut-slice')).toHaveLength(DATA.length)
  })
})
