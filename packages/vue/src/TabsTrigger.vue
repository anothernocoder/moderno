<script setup lang="ts">
import { inject } from 'vue'
import { TabsKey } from './tabs-context'

const props = defineProps<{ value: string; disabled?: boolean }>()
const api = inject(TabsKey)!
</script>

<template>
  <button v-bind="api.getTriggerProps({ value: props.value, disabled: props.disabled })" class="md-tabs-trigger">
    <slot />
  </button>
</template>
