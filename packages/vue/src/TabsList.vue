<script setup lang="ts">
import { inject } from 'vue'
import { TabsKey } from './tabs-context'

const api = inject(TabsKey)!
</script>

<template>
  <div v-bind="api.getListProps()" class="md-tabs-list"><slot /></div>
</template>
