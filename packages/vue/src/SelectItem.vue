<script setup lang="ts">
import { inject } from 'vue'
import { SelectKey, type SelectItem } from './select-context'

const props = defineProps<{ item: SelectItem }>()
const api = inject(SelectKey)!
</script>

<template>
  <li v-bind="api.getItemProps({ item: props.item })" class="md-select-item">
    <span v-bind="api.getItemTextProps({ item: props.item })" class="md-select-item-text">
      <slot>{{ props.item.label }}</slot>
    </span>
    <span v-bind="api.getItemIndicatorProps({ item: props.item })" class="md-select-item-indicator" aria-hidden="true">✓</span>
  </li>
</template>
