<script setup lang="ts">
withDefaults(
  defineProps<{ variant?: 'info' | 'success' | 'warning' | 'error'; title?: string }>(),
  { variant: 'info' },
)
</script>

<template>
  <div :class="`md-callout md-callout--${variant}`" role="note">
    <p v-if="title" class="md-callout__title">{{ title }}</p>
    <p class="md-callout__body"><slot /></p>
  </div>
</template>
