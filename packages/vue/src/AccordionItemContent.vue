<script setup lang="ts">
import { useAccordion, useAccordionItem } from './accordion-context'
import { parts } from '@moderno-ui/class-contract'

const api = useAccordion('ItemContent')
const item = useAccordionItem('ItemContent')
</script>

<template>
  <div v-bind="api.getItemContentProps(item)" :class="parts.accordion.content"><slot /></div>
</template>
