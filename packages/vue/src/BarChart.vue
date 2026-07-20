<script setup lang="ts">
import { computed } from 'vue'
import { buildBarGeometry, type ChartCategoryDatum } from '@moderno/chart-core'
import { parts } from '@moderno/class-contract'

const props = withDefaults(
  defineProps<{
    /** `{label, value}` pairs to plot, one bar each. */
    data: readonly ChartCategoryDatum[]
    /** Intrinsic SVG width in px; the chart scales to 100% of its container via CSS. */
    width?: number
    /** Intrinsic SVG height in px. */
    height?: number
    /** Accessible label read by screen readers in place of the visual chart. */
    label?: string
  }>(),
  { width: 480, height: 240 },
)

const geometry = computed(() => buildBarGeometry(props.data, { width: props.width, height: props.height }))
</script>

<template>
  <div :class="parts.chart.root">
    <svg :class="parts.chart.svg" :viewBox="`0 0 ${width} ${height}`" role="img" :aria-label="label">
      <rect
        v-for="(bar, i) in geometry.bars"
        :key="i"
        :class="parts.chart.bar"
        :x="bar.x"
        :y="bar.y"
        :width="bar.width"
        :height="bar.height"
      />
    </svg>
  </div>
</template>
