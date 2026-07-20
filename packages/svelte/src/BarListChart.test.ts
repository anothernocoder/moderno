import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/svelte'
import BarListChart from './BarListChart.svelte'

afterEach(cleanup)

const DATA = [
  { label: 'Chrome', value: 60 },
  { label: 'Safari', value: 25 },
  { label: 'Firefox', value: 15 },
]

describe('BarListChart', () => {
  it('renders the md-* anatomy with one row per datum, sized to the given dimensions', () => {
    const { container } = render(BarListChart, { data: DATA, width: 320, height: 160, label: 'Browser share' })

    expect(container.querySelector(':scope > .md-chart')).not.toBeNull()

    const svg = screen.getByRole('img', { name: 'Browser share' })
    expect(svg).toHaveClass('md-chart-svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 320 160')

    const rows = container.querySelectorAll('.md-chart-bar-list-row')
    expect(rows).toHaveLength(DATA.length)
  })

  it('gives every row a track, fill, label, and value', () => {
    const { container } = render(BarListChart, { data: DATA, width: 320, height: 160 })
    const rows = container.querySelectorAll('.md-chart-bar-list-row')

    rows.forEach((row, i) => {
      const track = row.querySelector('.md-chart-bar-list-track')
      const fill = row.querySelector('.md-chart-bar-list-fill')
      const label = row.querySelector('.md-chart-bar-list-label')
      const value = row.querySelector('.md-chart-bar-list-value')

      expect(track).not.toBeNull()
      expect(fill).not.toBeNull()
      expect(label?.textContent).toBe(DATA[i].label)
      expect(value?.textContent).toBe(String(DATA[i].value))

      const trackWidth = Number(track?.getAttribute('width'))
      const fillWidth = Number(fill?.getAttribute('width'))
      expect(fillWidth).toBeLessThanOrEqual(trackWidth)
    })
  })
})
