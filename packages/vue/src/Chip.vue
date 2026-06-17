<script setup lang="ts">
import { cx, parts, type ChipVariant } from '@moderno/class-contract'

const props = withDefaults(
  defineProps<{
    variant?: ChipVariant
    removable?: boolean
    removeLabel?: string
  }>(),
  { removeLabel: 'Remove' },
)

const emit = defineEmits<{ remove: [] }>()
</script>

<template>
  <span :class="cx.chip({ variant: props.variant })">
    <slot />
    <button
      v-if="removable"
      type="button"
      :class="parts.chip.remove"
      :aria-label="removeLabel"
      @click="emit('remove')"
    >
      ×
    </button>
  </span>
</template>
