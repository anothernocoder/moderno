<script setup lang="ts">
import { computed, useId } from 'vue'
import * as numberInput from '@zag-js/number-input'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { parts } from '@moderno/class-contract'

const props = defineProps<{
  label?: string
  defaultValue?: number | string
  /** Kept as string so formatted input is preserved. */
  modelValue?: number | string
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  name?: string
  placeholder?: string
}>()
const emit = defineEmits<{ 'update:modelValue': [string, number] }>()

const service = useMachine(numberInput.machine, {
  id: useId(),
  get defaultValue() {
    return props.defaultValue != null ? String(props.defaultValue) : undefined
  },
  get value() {
    return props.modelValue != null ? String(props.modelValue) : undefined
  },
  get min() {
    return props.min
  },
  get max() {
    return props.max
  },
  get step() {
    return props.step
  },
  get disabled() {
    return props.disabled
  },
  get name() {
    return props.name
  },
  onValueChange(d) {
    emit('update:modelValue', d.value, d.valueAsNumber)
  },
})
const api = computed(() => numberInput.connect(service, normalizeProps))
</script>

<template>
  <div v-bind="api.getRootProps()" :class="parts.numberInput.root">
    <label v-if="label != null" v-bind="api.getLabelProps()" :class="parts.numberInput.label">{{ label }}</label>
    <div v-bind="api.getControlProps()" :class="parts.numberInput.control">
      <button v-bind="api.getDecrementTriggerProps()" :class="parts.numberInput.decrement">−</button>
      <input v-bind="api.getInputProps()" :class="parts.numberInput.field" :placeholder="placeholder" />
      <button v-bind="api.getIncrementTriggerProps()" :class="parts.numberInput.increment">+</button>
    </div>
  </div>
</template>
