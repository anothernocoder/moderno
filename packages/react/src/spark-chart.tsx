import { buildSparkGeometry, type ChartPoint } from '@moderno/chart-core'
import { parts } from '@moderno/class-contract'

export interface SparkChartProps {
  /** `{x, y}` pairs to plot, in x order. */
  data: readonly ChartPoint[]
  /** Intrinsic SVG width in px; the chart scales to 100% of its container via CSS. @default 120 */
  width?: number
  /** Intrinsic SVG height in px. @default 32 */
  height?: number
  /** Render a dot at the last data point, to call out the current value. @default false */
  showLastPoint?: boolean
  /** Accessible label read by screen readers in place of the visual chart. */
  label?: string
}

/** Closed-prop Spark chart over the chart-core geometry (ADR-0004). Pure SVG, token-styled. */
export function SparkChart({ data, width = 120, height = 32, showLastPoint = false, label }: SparkChartProps) {
  const { path, lastPoint } = buildSparkGeometry(data, { width, height })

  return (
    <div className={parts.chart.root}>
      <svg className={parts.chart.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
        <path className={parts.chart.spark} d={path} />
        {showLastPoint && lastPoint ? (
          <circle className={parts.chart.point} cx={lastPoint.x} cy={lastPoint.y} r={2} />
        ) : null}
      </svg>
    </div>
  )
}
