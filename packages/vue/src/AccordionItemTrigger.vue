<script setup lang="ts">
import { useAccordion, useAccordionItem } from './accordion-context'
import { parts } from '@moderno/class-contract'

const api = useAccordion('ItemTrigger')
const item = useAccordionItem('ItemTrigger')
</script>

<template>
  <h3 :class="parts.accordion.heading">
    <button v-bind="api.getItemTriggerProps(item)" :class="parts.accordion.trigger">
      <span :class="parts.accordion.triggerText"><slot /></span>
      <span v-bind="api.getItemIndicatorProps(item)" :class="parts.accordion.indicator" aria-hidden="true">▾</span>
    </button>
  </h3>
</template>
