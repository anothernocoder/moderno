<script setup lang="ts">
import { computed } from 'vue'
import { buildSparkGeometry, type ChartPoint } from '@moderno/chart-core'
import { parts } from '@moderno/class-contract'

const props = withDefaults(
  defineProps<{
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
  }>(),
  { width: 120, height: 32, showLastPoint: false },
)

const geometry = computed(() => buildSparkGeometry(props.data, { width: props.width, height: props.height }))
</script>

<template>
  <div :class="parts.chart.root">
    <svg :class="parts.chart.svg" :viewBox="`0 0 ${width} ${height}`" role="img" :aria-label="label">
      <path :class="parts.chart.spark" :d="geometry.path" />
      <circle
        v-if="showLastPoint && geometry.lastPoint"
        :class="parts.chart.point"
        :cx="geometry.lastPoint.x"
        :cy="geometry.lastPoint.y"
        r="2"
      />
    </svg>
  </div>
</template>
