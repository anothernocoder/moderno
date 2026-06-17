<script setup lang="ts">
import { inject } from 'vue'
import { TabsKey } from './tabs-context'
import { parts } from '@moderno/class-contract'

const props = defineProps<{ value: string; disabled?: boolean }>()
const api = inject(TabsKey)!
</script>

<template>
  <button v-bind="api.getTriggerProps({ value: props.value, disabled: props.disabled })" :class="parts.tabs.trigger">
    <slot />
  </button>
</template>
