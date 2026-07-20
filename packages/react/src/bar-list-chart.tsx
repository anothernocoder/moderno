import { buildBarListGeometry, type ChartCategoryDatum } from '@moderno/chart-core'
import { parts } from '@moderno/class-contract'

export interface BarListChartProps {
  /** Labeled values to plot, one row per datum. */
  data: readonly ChartCategoryDatum[]
  /** Intrinsic SVG width in px; the chart scales to 100% of its container via CSS. @default 480 */
  width?: number
  /** Intrinsic SVG height in px. @default 240 */
  height?: number
  /** Accessible label read by screen readers in place of the visual chart. */
  label?: string
}

/** Closed-prop Bar List chart over the chart-core geometry (ADR-0004). Pure SVG, token-styled. */
export function BarListChart({ data, width = 480, height = 240, label }: BarListChartProps) {
  const { rows } = buildBarListGeometry(data, { width, height })

  return (
    <div className={parts.chart.root}>
      <svg className={parts.chart.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
        {rows.map((row, i) => (
          <g key={i} className={parts.chart.barListRow}>
            <rect className={parts.chart.barListTrack} x={row.x} y={row.y} width={row.trackWidth} height={row.height} />
            <rect className={parts.chart.barListFill} x={row.x} y={row.y} width={row.fillWidth} height={row.height} />
            <text className={parts.chart.barListLabel} x={row.x + 6} y={row.y + row.height / 2}>
              {row.label}
            </text>
            <text className={parts.chart.barListValue} x={row.x + row.trackWidth - 6} y={row.y + row.height / 2}>
              {row.value}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
