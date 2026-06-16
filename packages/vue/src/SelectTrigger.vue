<script setup lang="ts">
import { inject } from 'vue'
import { SelectKey } from './select-context'

withDefaults(defineProps<{ placeholder?: string }>(), { placeholder: 'Selecciona…' })
const api = inject(SelectKey)!
</script>

<template>
  <div v-bind="api.getControlProps()" class="md-select-control">
    <button v-bind="api.getTriggerProps()" class="md-select-trigger">
      <span v-bind="api.getValueTextProps()" class="md-select-value">{{
        api.empty ? placeholder : api.valueAsString
      }}</span>
      <span v-bind="api.getIndicatorProps()" class="md-select-indicator" aria-hidden="true">▾</span>
    </button>
  </div>
</template>
