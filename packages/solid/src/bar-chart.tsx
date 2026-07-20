import { For, createMemo } from 'solid-js'
import { buildBarGeometry, type ChartCategoryDatum } from '@moderno/chart-core'
import { parts } from '@moderno/class-contract'

export interface BarChartProps {
  /** `{label, value}` pairs, one bar per datum, in display order. */
  data: readonly ChartCategoryDatum[]
  /** Intrinsic SVG width in px; the chart scales to 100% of its container via CSS. @default 480 */
  width?: number
  /** Intrinsic SVG height in px. @default 240 */
  height?: number
  /** Accessible label read by screen readers in place of the visual chart. */
  label?: string
}

/** Closed-prop Bar chart over the chart-core geometry (ADR-0004). Pure SVG, token-styled. */
export function BarChart(props: BarChartProps) {
  const width = () => props.width ?? 480
  const height = () => props.height ?? 240
  const geometry = createMemo(() => buildBarGeometry(props.data, { width: width(), height: height() }))

  return (
    <div class={parts.chart.root}>
      <svg
        class={parts.chart.svg}
        viewBox={`0 0 ${width()} ${height()}`}
        role="img"
        aria-label={props.label}
      >
        <For each={geometry().bars}>
          {(bar) => <rect class={parts.chart.bar} x={bar.x} y={bar.y} width={bar.width} height={bar.height} />}
        </For>
      </svg>
    </div>
  )
}
