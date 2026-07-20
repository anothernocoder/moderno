import { Show, createMemo } from 'solid-js'
import { buildSparkGeometry, type ChartPoint } from '@moderno/chart-core'
import { parts } from '@moderno/class-contract'

export interface SparkChartProps {
  /** `{x, y}` pairs to plot, in x order. */
  data: readonly ChartPoint[]
  /** Intrinsic SVG width in px; the chart scales to 100% of its container via CSS. @default 120 */
  width?: number
  /** Intrinsic SVG height in px. @default 32 */
  height?: number
  /** Render a dot at the last data point, for highlighting the current value. @default false */
  showLastPoint?: boolean
  /** Accessible label read by screen readers in place of the visual chart. */
  label?: string
}

/** Closed-prop Sparkline over the chart-core geometry (ADR-0004). Pure SVG, token-styled, sized for inline use. */
export function SparkChart(props: SparkChartProps) {
  const width = () => props.width ?? 120
  const height = () => props.height ?? 32
  const geometry = createMemo(() => buildSparkGeometry(props.data, { width: width(), height: height() }))

  return (
    <div class={parts.chart.root}>
      <svg
        class={parts.chart.svg}
        viewBox={`0 0 ${width()} ${height()}`}
        role="img"
        aria-label={props.label}
      >
        <path class={parts.chart.spark} d={geometry().path} />
        <Show when={props.showLastPoint && geometry().lastPoint}>
          {(lastPoint) => <circle class={parts.chart.point} cx={lastPoint().x} cy={lastPoint().y} r={2} />}
        </Show>
      </svg>
    </div>
  )
}
