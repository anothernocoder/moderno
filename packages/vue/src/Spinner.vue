<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    label?: string
  }>(),
  { size: 'md', label: 'Loading' },
)
</script>

<template>
  <span :class="`md-spinner md-spinner--${size}`" role="status" :aria-label="label" />
</template>
