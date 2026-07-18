<script setup lang="ts">
import { useTabs } from './tabs-context'
import { parts } from '@moderno/class-contract'

const props = defineProps<{ value: string }>()
const api = useTabs('Content')
</script>

<template>
  <div v-bind="api.getContentProps({ value: props.value })" :class="parts.tabs.content"><slot /></div>
</template>
