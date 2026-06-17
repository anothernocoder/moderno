<script setup lang="ts">
import { computed, provide, useId } from 'vue'
import * as select from '@zag-js/select'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { SelectKey, type SelectItem } from './select-context'
import { parts } from '@moderno/class-contract'

const props = defineProps<{
  items: SelectItem[]
  defaultValue?: string[]
  modelValue?: string[]
  multiple?: boolean
  disabled?: boolean
}>()
const emit = defineEmits<{ 'update:modelValue': [string[]] }>()

const collection = computed(() => select.collection({ items: props.items }))
const service = useMachine(select.machine, {
  id: useId(),
  get collection() {
    return collection.value
  },
  get defaultValue() {
    return props.defaultValue
  },
  get value() {
    return props.modelValue
  },
  get multiple() {
    return props.multiple
  },
  get disabled() {
    return props.disabled
  },
  onValueChange(d) {
    emit('update:modelValue', d.value)
  },
})
const api = computed(() => select.connect(service, normalizeProps))
provide(SelectKey, api)
</script>

<template>
  <div v-bind="api.getRootProps()" :class="parts.select.root"><slot /></div>
</template>
