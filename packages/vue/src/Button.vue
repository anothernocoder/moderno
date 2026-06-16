<script setup lang="ts">
withDefaults(
  defineProps<{ variant?: 'primary' | 'secondary'; size?: 'sm' | 'md' | 'lg'; label?: string }>(),
  { variant: 'primary', size: 'md' },
)
</script>

<template>
  <button :class="['md-btn', `md-btn--${variant}`, size !== 'md' ? `md-btn--${size}` : '']">
    <template v-if="label">{{ label }}</template>
    <slot v-else />
  </button>
</template>
