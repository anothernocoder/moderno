<script setup lang="ts">
import { inject } from 'vue'
import { SelectKey } from './select-context'
import { parts } from '@moderno/class-contract'

withDefaults(defineProps<{ placeholder?: string }>(), { placeholder: 'Select…' })
const api = inject(SelectKey)!
</script>

<template>
  <div v-bind="api.getControlProps()" :class="parts.select.control">
    <button v-bind="api.getTriggerProps()" :class="parts.select.trigger">
      <span v-bind="api.getValueTextProps()" :class="parts.select.value">{{
        api.empty ? placeholder : api.valueAsString
      }}</span>
      <span v-bind="api.getIndicatorProps()" :class="parts.select.indicator" aria-hidden="true">▾</span>
    </button>
  </div>
</template>
