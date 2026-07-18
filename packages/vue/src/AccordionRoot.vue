<script setup lang="ts">
import { computed, useId } from 'vue'
import * as accordion from '@zag-js/accordion'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { provideAccordion } from './accordion-context'
import { parts } from '@moderno/class-contract'

const props = defineProps<{
  defaultValue?: string[]
  modelValue?: string[]
  multiple?: boolean
  collapsible?: boolean
}>()
const emit = defineEmits<{ 'update:modelValue': [string[]] }>()

const service = useMachine(accordion.machine, {
  id: useId(),
  get defaultValue() {
    return props.defaultValue
  },
  get value() {
    return props.modelValue
  },
  get multiple() {
    return props.multiple
  },
  get collapsible() {
    return props.collapsible
  },
  onValueChange(d) {
    emit('update:modelValue', d.value)
  },
})
const api = computed(() => accordion.connect(service, normalizeProps))
provideAccordion(api)
</script>

<template>
  <div v-bind="api.getRootProps()" :class="parts.accordion.root"><slot /></div>
</template>
