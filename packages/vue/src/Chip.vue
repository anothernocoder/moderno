<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'neutral' | 'solid'
    removable?: boolean
    removeLabel?: string
  }>(),
  { variant: 'neutral', removeLabel: 'Remove' },
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
      :aria-label="removeLabel"
      @click="emit('remove')"
    >
      ×
    </button>
  </span>
</template>
