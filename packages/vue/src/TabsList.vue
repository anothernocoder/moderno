<script setup lang="ts">
import { useTabs } from './tabs-context'
import { parts } from '@moderno/class-contract'

const api = useTabs('List')
</script>

<template>
  <div v-bind="api.getListProps()" :class="parts.tabs.list"><slot /></div>
</template>
