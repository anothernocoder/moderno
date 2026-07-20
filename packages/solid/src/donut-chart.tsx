import { For, createMemo } from 'solid-js'
import { buildDonutGeometry, type ChartCategoryDatum } from '@moderno/chart-core'
import { parts } from '@moderno/class-contract'

export interface DonutChartProps {
  /** `{label, value}` pairs, one slice per datum, in display order. */
  data: readonly ChartCategoryDatum[]
  /** Intrinsic SVG width in px; the chart scales to 100% of its container via CSS. @default 480 */
  width?: number
  /** Intrinsic SVG height in px. @default 240 */
  height?: number
  /** Donut hole radius as a fraction of the outer radius, in `[0, 1]`. @default 0.6 (chart-core default) */
  innerRadiusRatio?: number
  /** Accessible label read by screen readers in place of the visual chart. */
  label?: string
}

/** Closed-prop Donut chart over the chart-core geometry (ADR-0004). Pure SVG, token-styled. */
export function DonutChart(props: DonutChartProps) {
  const width = () => props.width ?? 480
  const height = () => props.height ?? 240
  const geometry = createMemo(() =>
    buildDonutGeometry(props.data, { width: width(), height: height() }, props.innerRadiusRatio),
  )

  return (
    <div class={parts.chart.root}>
      <svg
        class={parts.chart.svg}
        viewBox={`0 0 ${width()} ${height()}`}
        role="img"
        aria-label={props.label}
      >
        <g transform={`translate(${geometry().center.x}, ${geometry().center.y})`}>
          <For each={geometry().slices}>{(slice) => <path class={parts.chart.donutSlice} d={slice.path} />}</For>
        </g>
      </svg>
    </div>
  )
}
