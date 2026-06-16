<script setup lang="ts">
import { inject } from 'vue'
import { AccordionKey, AccordionItemKey } from './accordion-context'

const api = inject(AccordionKey)!
const item = inject(AccordionItemKey)!
</script>

<template>
  <h3 class="md-accordion-heading">
    <button v-bind="api.getItemTriggerProps(item)" class="md-accordion-trigger">
      <span class="md-accordion-trigger-text"><slot /></span>
      <span v-bind="api.getItemIndicatorProps(item)" class="md-accordion-indicator" aria-hidden="true">▾</span>
    </button>
  </h3>
</template>
