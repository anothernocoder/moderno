import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { BarListChart } from './bar-list-chart'

afterEach(cleanup)

const DATA = [
  { label: 'Chrome', value: 60 },
  { label: 'Safari', value: 25 },
  { label: 'Firefox', value: 15 },
]

describe('BarListChart', () => {
  it('renders the md-* anatomy with an SVG sized to the given dimensions', () => {
    const { container } = render(<BarListChart data={DATA} width={320} height={160} label="Browsers" />)

    expect(container.querySelector(':scope > .md-chart')).not.toBeNull()

    const svg = screen.getByRole('img', { name: 'Browsers' })
    expect(svg).toHaveClass('md-chart-svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 320 160')
  })

  it('renders one row group per datum, each containing a track, fill, label, and value', () => {
    const { container } = render(<BarListChart data={DATA} />)
    const rows = container.querySelectorAll('.md-chart-bar-list-row')
    expect(rows).toHaveLength(DATA.length)

    rows.forEach((row, i) => {
      expect(row.querySelector('.md-chart-bar-list-track')).not.toBeNull()
      expect(row.querySelector('.md-chart-bar-list-fill')).not.toBeNull()
      expect(row.querySelector('.md-chart-bar-list-label')?.textContent).toBe(DATA[i].label)
      expect(row.querySelector('.md-chart-bar-list-value')?.textContent).toBe(String(DATA[i].value))
    })
  })

  it('keeps each row fill width within its track width', () => {
    const { container } = render(<BarListChart data={DATA} />)
    const rows = container.querySelectorAll('.md-chart-bar-list-row')
    rows.forEach((row) => {
      const trackWidth = Number(row.querySelector('.md-chart-bar-list-track')?.getAttribute('width'))
      const fillWidth = Number(row.querySelector('.md-chart-bar-list-fill')?.getAttribute('width'))
      expect(fillWidth).toBeLessThanOrEqual(trackWidth)
    })
  })
})
