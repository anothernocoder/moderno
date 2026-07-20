<script lang="ts">
  import { buildBarListGeometry, type ChartCategoryDatum } from '@moderno/chart-core'
  import { parts } from '@moderno/class-contract'

  let {
    data,
    width = 480,
    height = 240,
    label,
  }: {
    /** Labeled values to plot as one row per datum, ranked by share of the largest value. */
    data: readonly ChartCategoryDatum[]
    /** Intrinsic SVG width in px; the chart scales to 100% of its container via CSS. */
    width?: number
    /** Intrinsic SVG height in px. */
    height?: number
    /** Accessible label read by screen readers in place of the visual chart. */
    label?: string
  } = $props()

  const geometry = $derived(buildBarListGeometry(data, { width, height }))
</script>

<div class={parts.chart.root}>
  <svg class={parts.chart.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
    {#each geometry.rows as row, i (i)}
      <g class={parts.chart.barListRow}>
        <rect class={parts.chart.barListTrack} x={row.x} y={row.y} width={row.trackWidth} height={row.height} />
        <rect class={parts.chart.barListFill} x={row.x} y={row.y} width={row.fillWidth} height={row.height} />
        <text class={parts.chart.barListLabel} x={row.x + 6} y={row.y + row.height / 2}>{row.label}</text>
        <text class={parts.chart.barListValue} x={row.x + row.trackWidth - 6} y={row.y + row.height / 2}>{row.value}</text>
      </g>
    {/each}
  </svg>
</div>
