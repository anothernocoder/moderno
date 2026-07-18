<script setup lang="ts">
import { useSheet } from './sheet-context'
import { parts } from '@moderno/class-contract'

withDefaults(defineProps<{ closeLabel?: string }>(), { closeLabel: 'Close' })

const api = useSheet('Close')
</script>

<template>
  <button v-bind="api.getCloseTriggerProps()" :class="parts.sheet.close" :aria-label="closeLabel">
    <slot>✕</slot>
  </button>
</template>
