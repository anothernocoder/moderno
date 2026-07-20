import { For, createMemo } from 'solid-js'
import { buildBarListGeometry, type ChartCategoryDatum } from '@moderno/chart-core'
import { parts } from '@moderno/class-contract'

export interface BarListChartProps {
  /** `{label, value}` pairs, one row per datum, in display order. */
  data: readonly ChartCategoryDatum[]
  /** Intrinsic SVG width in px; the chart scales to 100% of its container via CSS. @default 480 */
  width?: number
  /** Intrinsic SVG height in px. @default 240 */
  height?: number
  /** Accessible label read by screen readers in place of the visual chart. */
  label?: string
}

/** Closed-prop Bar List chart over the chart-core geometry (ADR-0004). Pure SVG, token-styled. */
export function BarListChart(props: BarListChartProps) {
  const width = () => props.width ?? 480
  const height = () => props.height ?? 240
  const geometry = createMemo(() => buildBarListGeometry(props.data, { width: width(), height: height() }))

  return (
    <div class={parts.chart.root}>
      <svg
        class={parts.chart.svg}
        viewBox={`0 0 ${width()} ${height()}`}
        role="img"
        aria-label={props.label}
      >
        <For each={geometry().rows}>
          {(row) => (
            <g class={parts.chart.barListRow}>
              <rect class={parts.chart.barListTrack} x={row.x} y={row.y} width={row.trackWidth} height={row.height} />
              <rect class={parts.chart.barListFill} x={row.x} y={row.y} width={row.fillWidth} height={row.height} />
              <text class={parts.chart.barListLabel} x={row.x + 6} y={row.y + row.height / 2}>
                {row.label}
              </text>
              <text class={parts.chart.barListValue} x={row.x + row.trackWidth - 6} y={row.y + row.height / 2}>
                {row.value}
              </text>
            </g>
          )}
        </For>
      </svg>
    </div>
  )
}
