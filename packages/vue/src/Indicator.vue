<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'neutral' | 'success' | 'warning' | 'error' | 'info'
    pulse?: boolean
  }>(),
  { variant: 'neutral' },
)
</script>

<template>
  <span :class="['md-indicator', `md-indicator--${variant}`, pulse ? 'md-indicator--pulse' : '']">
    <span class="md-indicator__dot" />
    <slot />
  </span>
</template>
