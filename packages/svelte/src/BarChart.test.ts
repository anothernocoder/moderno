import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/svelte'
import BarChart from './BarChart.svelte'

afterEach(cleanup)

const DATA = [
  { label: 'Jan', value: 10 },
  { label: 'Feb', value: 40 },
  { label: 'Mar', value: 25 },
  { label: 'Apr', value: 15 },
]

describe('BarChart', () => {
  it('renders the md-* anatomy with one bar per datum, sized to the given dimensions', () => {
    const { container } = render(BarChart, { data: DATA, width: 320, height: 160, label: 'Monthly signups' })

    expect(container.querySelector(':scope > .md-chart')).not.toBeNull()

    const svg = screen.getByRole('img', { name: 'Monthly signups' })
    expect(svg).toHaveClass('md-chart-svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 320 160')

    const bars = container.querySelectorAll('.md-chart-bar')
    expect(bars).toHaveLength(DATA.length)
  })

  it('gives every bar a positive width and height', () => {
    const { container } = render(BarChart, { data: DATA, width: 320, height: 160 })
    const bars = container.querySelectorAll('.md-chart-bar')
    for (const bar of bars) {
      expect(Number(bar.getAttribute('width'))).toBeGreaterThan(0)
      expect(Number(bar.getAttribute('height'))).toBeGreaterThan(0)
    }
  })
})
