<script lang="ts">
  import { buildBarGeometry, type ChartCategoryDatum } from '@moderno/chart-core'
  import { parts } from '@moderno/class-contract'

  let {
    data,
    width = 480,
    height = 240,
    label,
  }: {
    /** Labeled values to plot as one bar per datum. */
    data: readonly ChartCategoryDatum[]
    /** Intrinsic SVG width in px; the chart scales to 100% of its container via CSS. */
    width?: number
    /** Intrinsic SVG height in px. */
    height?: number
    /** Accessible label read by screen readers in place of the visual chart. */
    label?: string
  } = $props()

  const geometry = $derived(buildBarGeometry(data, { width, height }))
</script>

<div class={parts.chart.root}>
  <svg class={parts.chart.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
    {#each geometry.bars as bar, i (i)}
      <rect class={parts.chart.bar} x={bar.x} y={bar.y} width={bar.width} height={bar.height} />
    {/each}
  </svg>
</div>
