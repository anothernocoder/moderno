<script setup lang="ts">
import { computed } from 'vue'
import { cx, type SkeletonVariant } from '@moderno/class-contract'

const props = defineProps<{
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
}>()

const len = (v: string | number | undefined) => (typeof v === 'number' ? `${v}px` : v)
const style = computed(() => ({ width: len(props.width), height: len(props.height) }))
</script>

<template>
  <span :class="cx.skeleton({ variant: props.variant })" :style="style" aria-hidden="true" />
</template>
