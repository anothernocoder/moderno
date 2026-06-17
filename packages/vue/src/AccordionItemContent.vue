<script setup lang="ts">
import { inject } from 'vue'
import { AccordionKey, AccordionItemKey } from './accordion-context'
import { parts } from '@moderno/class-contract'

const api = inject(AccordionKey)!
const item = inject(AccordionItemKey)!
</script>

<template>
  <div v-bind="api.getItemContentProps(item)" :class="parts.accordion.content"><slot /></div>
</template>
