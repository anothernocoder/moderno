<script setup lang="ts">
import { computed } from 'vue'
import { buildDonutGeometry, type ChartCategoryDatum } from '@moderno/chart-core'
import { parts } from '@moderno/class-contract'

const props = withDefaults(
  defineProps<{
    /** `{label, value}` pairs to plot, one slice each. */
    data: readonly ChartCategoryDatum[]
    /** Intrinsic SVG width in px; the chart scales to 100% of its container via CSS. */
    width?: number
    /** Intrinsic SVG height in px. */
    height?: number
    /** Donut hole radius as a ratio of the outer radius; `0` renders a full pie. @default 0.6 (chart-core default) */
    innerRadiusRatio?: number
    /** Accessible label read by screen readers in place of the visual chart. */
    label?: string
  }>(),
  { width: 480, height: 240 },
)

const geometry = computed(() => buildDonutGeometry(props.data, { width: props.width, height: props.height }, props.innerRadiusRatio))
</script>

<template>
  <div :class="parts.chart.root">
    <svg :class="parts.chart.svg" :viewBox="`0 0 ${width} ${height}`" role="img" :aria-label="label">
      <g :transform="`translate(${geometry.center.x}, ${geometry.center.y})`">
        <path v-for="(slice, i) in geometry.slices" :key="i" :class="parts.chart.donutSlice" :d="slice.path" />
      </g>
    </svg>
  </div>
</template>
