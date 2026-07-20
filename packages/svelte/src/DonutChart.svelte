<script lang="ts">
  import { buildDonutGeometry, type ChartCategoryDatum } from '@moderno/chart-core'
  import { parts } from '@moderno/class-contract'

  let {
    data,
    width = 480,
    height = 240,
    innerRadiusRatio,
    label,
  }: {
    /** Labeled values to plot as one slice per datum, sized proportionally. */
    data: readonly ChartCategoryDatum[]
    /** Intrinsic SVG width in px; the chart scales to 100% of its container via CSS. */
    width?: number
    /** Intrinsic SVG height in px. */
    height?: number
    /** Donut hole radius as a ratio of the outer radius; `0` renders a full pie. @default 0.6 (chart-core default) */
    innerRadiusRatio?: number
    /** Accessible label read by screen readers in place of the visual chart. */
    label?: string
  } = $props()

  const geometry = $derived(buildDonutGeometry(data, { width, height }, innerRadiusRatio))
</script>

<div class={parts.chart.root}>
  <svg class={parts.chart.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
    <g transform={`translate(${geometry.center.x}, ${geometry.center.y})`}>
      {#each geometry.slices as slice, i (i)}
        <path class={parts.chart.donutSlice} d={slice.path} />
      {/each}
    </g>
  </svg>
</div>
