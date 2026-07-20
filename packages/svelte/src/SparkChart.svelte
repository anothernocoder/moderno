<script lang="ts">
  import { buildSparkGeometry, type ChartPoint } from '@moderno/chart-core'
  import { parts } from '@moderno/class-contract'

  let {
    data,
    width = 120,
    height = 32,
    showLastPoint = false,
    label,
  }: {
    /** `{x, y}` pairs to plot, in x order. */
    data: readonly ChartPoint[]
    /** Intrinsic SVG width in px; the chart scales to 100% of its container via CSS. */
    width?: number
    /** Intrinsic SVG height in px. */
    height?: number
    /** Render a dot at the last data point, to call out the current value. */
    showLastPoint?: boolean
    /** Accessible label read by screen readers in place of the visual chart. */
    label?: string
  } = $props()

  const geometry = $derived(buildSparkGeometry(data, { width, height }))
</script>

<div class={parts.chart.root}>
  <svg class={parts.chart.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
    <path class={parts.chart.spark} d={geometry.path} />
    {#if showLastPoint && geometry.lastPoint}
      <circle class={parts.chart.point} cx={geometry.lastPoint.x} cy={geometry.lastPoint.y} r="2" />
    {/if}
  </svg>
</div>
