<script setup lang="ts">
withDefaults(
  defineProps<{
    orientation?: 'horizontal' | 'vertical'
    label?: string
  }>(),
  { orientation: 'horizontal' },
)
</script>

<template>
  <div v-if="label && orientation === 'horizontal'" class="md-divider-group" role="separator">{{ label }}</div>
  <div
    v-else
    :class="`md-divider md-divider--${orientation}`"
    role="separator"
    :aria-orientation="orientation === 'vertical' ? 'vertical' : undefined"
  />
</template>
