<script setup lang="ts">
import { inject } from 'vue'
import { TabsKey } from './tabs-context'
import { parts } from '@moderno/class-contract'

const api = inject(TabsKey)!
</script>

<template>
  <div v-bind="api.getListProps()" :class="parts.tabs.list"><slot /></div>
</template>
