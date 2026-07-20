import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/vue'
import BarListChart from './BarListChart.vue'

afterEach(cleanup)

const DATA = [
  { label: 'Chrome', value: 60 },
  { label: 'Safari', value: 25 },
  { label: 'Firefox', value: 15 },
]

describe('BarListChart', () => {
  it('renders the md-* anatomy with an SVG sized to the given dimensions', () => {
    const { container } = render(BarListChart, { props: { data: DATA, width: 320, height: 160, label: 'Browsers' } })

    expect(container.querySelector(':scope > .md-chart')).not.toBeNull()

    const svg = screen.getByRole('img', { name: 'Browsers' })
    expect(svg).toHaveClass('md-chart-svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 320 160')
  })

  it('renders one row group per datum, each with track, fill, label, and value', () => {
    const { container } = render(BarListChart, { props: { data: DATA } })
    const rows = container.querySelectorAll('.md-chart-bar-list-row')
    expect(rows).toHaveLength(DATA.length)

    rows.forEach((row, i) => {
      expect(row.querySelectorAll('.md-chart-bar-list-track')).toHaveLength(1)
      expect(row.querySelectorAll('.md-chart-bar-list-fill')).toHaveLength(1)

      const label = row.querySelector('.md-chart-bar-list-label')
      expect(label).not.toBeNull()
      expect(label?.textContent).toBe(DATA[i]?.label)

      const value = row.querySelector('.md-chart-bar-list-value')
      expect(value).not.toBeNull()
      expect(value?.textContent).toBe(String(DATA[i]?.value))
    })
  })

  it('keeps each row fillWidth within its trackWidth', () => {
    const { container } = render(BarListChart, { props: { data: DATA, width: 320, height: 160 } })
    const rows = container.querySelectorAll('.md-chart-bar-list-row')

    rows.forEach((row) => {
      const track = row.querySelector('.md-chart-bar-list-track')
      const fill = row.querySelector('.md-chart-bar-list-fill')
      const trackWidth = Number(track?.getAttribute('width'))
      const fillWidth = Number(fill?.getAttribute('width'))
      expect(fillWidth).toBeLessThanOrEqual(trackWidth)
      expect(fillWidth).toBeGreaterThanOrEqual(0)
    })
  })
})
