<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'text' | 'rect' | 'circle'
    width?: string | number
    height?: string | number
  }>(),
  { variant: 'text' },
)

const len = (v: string | number | undefined) => (typeof v === 'number' ? `${v}px` : v)
const style = computed(() => ({ width: len(props.width), height: len(props.height) }))
</script>

<template>
  <span :class="`md-skeleton md-skeleton--${variant}`" :style="style" aria-hidden="true" />
</template>
