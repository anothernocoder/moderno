<script setup lang="ts">
import { inject, provide } from 'vue'
import { AccordionKey, AccordionItemKey } from './accordion-context'
import { parts } from '@moderno/class-contract'

const props = defineProps<{ value: string; disabled?: boolean }>()
const api = inject(AccordionKey)!
provide(AccordionItemKey, { value: props.value, disabled: props.disabled })
</script>

<template>
  <div v-bind="api.getItemProps({ value: props.value, disabled: props.disabled })" :class="parts.accordion.item">
    <slot />
  </div>
</template>
