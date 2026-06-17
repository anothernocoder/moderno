<script setup lang="ts">
import { inject } from 'vue'
import { TabsKey } from './tabs-context'
import { parts } from '@moderno/class-contract'

const props = defineProps<{ value: string }>()
const api = inject(TabsKey)!
</script>

<template>
  <div v-bind="api.getContentProps({ value: props.value })" :class="parts.tabs.content"><slot /></div>
</template>
