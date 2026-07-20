<script lang="ts">
  import { buildAreaGeometry, type ChartPoint } from '@moderno/chart-core'
  import { parts } from '@moderno/class-contract'

  let {
    data,
    width = 480,
    height = 240,
    showPoints = false,
    label,
  }: {
    /** `{x, y}` pairs to plot, in x order. */
    data: readonly ChartPoint[]
    /** Intrinsic SVG width in px; the chart scales to 100% of its container via CSS. */
    width?: number
    /** Intrinsic SVG height in px. */
    height?: number
    /** Render a dot at each data point. */
    showPoints?: boolean
    /** Accessible label read by screen readers in place of the visual chart. */
    label?: string
  } = $props()

  const geometry = $derived(buildAreaGeometry(data, { width, height }))
</script>

<div class={parts.chart.root}>
  <svg class={parts.chart.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
    <path class={parts.chart.area} d={geometry.areaPath} />
    <path class={parts.chart.line} d={geometry.linePath} />
    {#if showPoints}
      {#each geometry.points as p, i (i)}
        <circle class={parts.chart.point} cx={p.x} cy={p.y} r="3" />
      {/each}
    {/if}
  </svg>
</div>
