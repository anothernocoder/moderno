import { For, Show, createMemo } from 'solid-js'
import { buildLineGeometry, type ChartPoint } from '@moderno/chart-core'
import { parts } from '@moderno/class-contract'

export interface LineChartProps {
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

/** Closed-prop Line chart over the chart-core geometry (ADR-0004). Pure SVG, token-styled. */
export function LineChart(props: LineChartProps) {
  const width = () => props.width ?? 480
  const height = () => props.height ?? 240
  const geometry = createMemo(() => buildLineGeometry(props.data, { width: width(), height: height() }))

  return (
    <div class={parts.chart.root}>
      <svg
        class={parts.chart.svg}
        viewBox={`0 0 ${width()} ${height()}`}
        role="img"
        aria-label={props.label}
      >
        <path class={parts.chart.line} d={geometry().path} />
        <Show when={props.showPoints}>
          <For each={geometry().points}>{(p) => <circle class={parts.chart.point} cx={p.x} cy={p.y} r={3} />}</For>
        </Show>
      </svg>
    </div>
  )
}
