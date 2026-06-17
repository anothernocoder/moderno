<script setup lang="ts">
import { cx, parts, type DividerOrientation } from '@moderno/class-contract'

const props = withDefaults(
  defineProps<{
    orientation?: DividerOrientation
    label?: string
  }>(),
  { orientation: 'horizontal' },
)
</script>

<template>
  <div v-if="label && orientation === 'horizontal'" :class="parts.divider.group" role="separator">{{ label }}</div>
  <div
    v-else
    :class="cx.divider({ orientation: props.orientation })"
    role="separator"
    :aria-orientation="orientation === 'vertical' ? 'vertical' : undefined"
  />
</template>
