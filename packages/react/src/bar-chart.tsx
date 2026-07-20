import { buildBarGeometry, type ChartCategoryDatum } from '@moderno/chart-core'
import { parts } from '@moderno/class-contract'

export interface BarChartProps {
  /** Labeled values to plot, one bar per datum. */
  data: readonly ChartCategoryDatum[]
  /** Intrinsic SVG width in px; the chart scales to 100% of its container via CSS. @default 480 */
  width?: number
  /** Intrinsic SVG height in px. @default 240 */
  height?: number
  /** Accessible label read by screen readers in place of the visual chart. */
  label?: string
}

/** Closed-prop Bar chart over the chart-core geometry (ADR-0004). Pure SVG, token-styled. */
export function BarChart({ data, width = 480, height = 240, label }: BarChartProps) {
  const { bars } = buildBarGeometry(data, { width, height })

  return (
    <div className={parts.chart.root}>
      <svg className={parts.chart.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
        {bars.map((bar, i) => (
          <rect key={i} className={parts.chart.bar} x={bar.x} y={bar.y} width={bar.width} height={bar.height} />
        ))}
      </svg>
    </div>
  )
}
