<script setup lang="ts">
import { cx, parts, type IndicatorVariant } from '@moderno/class-contract'

const props = defineProps<{
  variant?: IndicatorVariant
  pulse?: boolean
}>()
</script>

<template>
  <span :class="cx.indicator({ variant: props.variant, pulse: props.pulse })">
    <span :class="parts.indicator.dot" />
    <slot />
  </span>
</template>
