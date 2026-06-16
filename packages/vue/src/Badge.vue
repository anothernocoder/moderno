<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'
    dot?: boolean
  }>(),
  { variant: 'neutral' },
)
</script>

<template>
  <span :class="`md-badge md-badge--${variant}`">
    <span v-if="dot" class="md-badge__dot" />
    <slot />
  </span>
</template>
