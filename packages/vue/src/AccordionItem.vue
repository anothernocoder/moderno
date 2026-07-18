<script setup lang="ts">
import { provideAccordionItem, useAccordion } from './accordion-context'
import { parts } from '@moderno/class-contract'

const props = defineProps<{ value: string; disabled?: boolean }>()
const api = useAccordion('Item')
provideAccordionItem({ value: props.value, disabled: props.disabled })
</script>

<template>
  <div v-bind="api.getItemProps({ value: props.value, disabled: props.disabled })" :class="parts.accordion.item">
    <slot />
  </div>
</template>
