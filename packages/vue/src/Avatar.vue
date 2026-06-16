<script setup lang="ts">
withDefaults(
  defineProps<{
    src?: string
    alt?: string
    initials?: string
    size?: 'sm' | 'md' | 'lg'
    shape?: 'circle' | 'square'
  }>(),
  { size: 'md', shape: 'circle', alt: '' },
)
</script>

<template>
  <span :class="`md-avatar md-avatar--${size} md-avatar--${shape}`">
    <img v-if="src" class="md-avatar__img" :src="src" :alt="alt" />
    <template v-else>{{ initials }}</template>
  </span>
</template>
