<script setup lang="ts">
import { cx, parts, type BadgeVariant } from '@moderno/class-contract'

const props = defineProps<{
  variant?: BadgeVariant
  dot?: boolean
}>()
</script>

<template>
  <span :class="cx.badge({ variant: props.variant })">
    <span v-if="dot" :class="parts.badge.dot" />
    <slot />
  </span>
</template>
