<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'neutral' | 'solid'
    removable?: boolean
  }>(),
  { variant: 'neutral' },
)

const emit = defineEmits<{ remove: [] }>()
</script>

<template>
  <span :class="`md-chip md-chip--${variant}`">
    <slot />
    <button
      v-if="removable"
      type="button"
      class="md-chip__remove"
      aria-label="Quitar"
      @click="emit('remove')"
    >
      ×
    </button>
  </span>
</template>
