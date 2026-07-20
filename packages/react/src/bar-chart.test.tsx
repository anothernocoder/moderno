import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { BarChart } from './bar-chart'

afterEach(cleanup)

const DATA = [
  { label: 'Jan', value: 10 },
  { label: 'Feb', value: 40 },
  { label: 'Mar', value: 25 },
]

describe('BarChart', () => {
  it('renders the md-* anatomy with an SVG sized to the given dimensions', () => {
    const { container } = render(<BarChart data={DATA} width={320} height={160} label="Revenue" />)

    expect(container.querySelector(':scope > .md-chart')).not.toBeNull()

    const svg = screen.getByRole('img', { name: 'Revenue' })
    expect(svg).toHaveClass('md-chart-svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 320 160')
  })

  it('renders one bar rect per datum', () => {
    const { container } = render(<BarChart data={DATA} />)
    const bars = container.querySelectorAll('.md-chart-bar')
    expect(bars).toHaveLength(DATA.length)
  })

  it('sizes each bar with a positive width and height', () => {
    const { container } = render(<BarChart data={DATA} />)
    const bars = container.querySelectorAll('.md-chart-bar')
    for (const bar of bars) {
      expect(Number(bar.getAttribute('width'))).toBeGreaterThan(0)
      expect(Number(bar.getAttribute('height'))).toBeGreaterThan(0)
    }
  })
})
