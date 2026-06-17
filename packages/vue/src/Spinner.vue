<script setup lang="ts">
import { cx, type SpinnerSize } from '@moderno/class-contract'

const props = withDefaults(
  defineProps<{
    size?: SpinnerSize
    label?: string
  }>(),
  { label: 'Loading' },
)
</script>

<template>
  <span :class="cx.spinner({ size: props.size })" role="status" :aria-label="label" />
</template>
