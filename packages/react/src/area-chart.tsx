import { buildAreaGeometry, type ChartPoint } from '@moderno/chart-core'
import { parts } from '@moderno/class-contract'

export interface AreaChartProps {
  /** `{x, y}` pairs to plot, in x order. */
  data: readonly ChartPoint[]
  /** Intrinsic SVG width in px; the chart scales to 100% of its container via CSS. @default 480 */
  width?: number
  /** Intrinsic SVG height in px. @default 240 */
  height?: number
  /** Render a dot at each data point. @default false */
  showPoints?: boolean
  /** Accessible label read by screen readers in place of the visual chart. */
  label?: string
}

/** Closed-prop Area chart over the chart-core geometry (ADR-0004). Pure SVG, token-styled. */
export function AreaChart({ data, width = 480, height = 240, showPoints = false, label }: AreaChartProps) {
  const { areaPath, linePath, points } = buildAreaGeometry(data, { width, height })

  return (
    <div className={parts.chart.root}>
      <svg className={parts.chart.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
        <path className={parts.chart.area} d={areaPath} />
        <path className={parts.chart.line} d={linePath} />
        {showPoints
          ? points.map((p, i) => <circle key={i} className={parts.chart.point} cx={p.x} cy={p.y} r={3} />)
          : null}
      </svg>
    </div>
  )
}
