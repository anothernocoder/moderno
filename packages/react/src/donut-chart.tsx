import { buildDonutGeometry, type ChartCategoryDatum } from '@moderno/chart-core'
import { parts } from '@moderno/class-contract'

export interface DonutChartProps {
  /** Labeled values to plot, one slice per datum. */
  data: readonly ChartCategoryDatum[]
  /** Intrinsic SVG width in px; the chart scales to 100% of its container via CSS. @default 480 */
  width?: number
  /** Intrinsic SVG height in px. @default 240 */
  height?: number
  /** Donut hole radius as a ratio of the outer radius; `0` renders a full pie. @default 0.6 */
  innerRadiusRatio?: number
  /** Accessible label read by screen readers in place of the visual chart. */
  label?: string
}

/** Closed-prop Donut chart over the chart-core geometry (ADR-0004). Pure SVG, token-styled. */
export function DonutChart({ data, width = 480, height = 240, innerRadiusRatio, label }: DonutChartProps) {
  const { slices, center } = buildDonutGeometry(data, { width, height }, innerRadiusRatio)

  return (
    <div className={parts.chart.root}>
      <svg className={parts.chart.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
        <g transform={`translate(${center.x}, ${center.y})`}>
          {slices.map((slice, i) => (
            <path key={i} className={parts.chart.donutSlice} d={slice.path} />
          ))}
        </g>
      </svg>
    </div>
  )
}
