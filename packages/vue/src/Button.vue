<script setup lang="ts">
import { cx, type ButtonSize, type ButtonVariant } from '@moderno/class-contract'

const props = defineProps<{ variant?: ButtonVariant; size?: ButtonSize; label?: string }>()
</script>

<template>
  <button :class="cx.button({ variant: props.variant, size: props.size })">
    <template v-if="label">{{ label }}</template>
    <slot v-else />
  </button>
</template>
