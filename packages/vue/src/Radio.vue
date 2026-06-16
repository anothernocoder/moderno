<script setup lang="ts">
import { computed, useId } from 'vue'
import * as radio from '@zag-js/radio-group'
import { useMachine, normalizeProps } from '@zag-js/vue'

interface RadioOption {
  value: string
  label?: string
  disabled?: boolean
}

const props = defineProps<{
  options: RadioOption[]
  label?: string
  defaultValue?: string
  modelValue?: string
  disabled?: boolean
  invalid?: boolean
  orientation?: 'horizontal' | 'vertical'
  name?: string
}>()
const emit = defineEmits<{ 'update:modelValue': [string | null] }>()

const service = useMachine(radio.machine, {
  id: useId(),
  get defaultValue() {
    return props.defaultValue
  },
  get value() {
    return props.modelValue
  },
  get disabled() {
    return props.disabled
  },
  get invalid() {
    return props.invalid
  },
  get orientation() {
    return props.orientation
  },
  get name() {
    return props.name
  },
  onValueChange(d) {
    emit('update:modelValue', d.value)
  },
})
const api = computed(() => radio.connect(service, normalizeProps))
</script>

<template>
  <div v-bind="api.getRootProps()" class="md-radio">
    <span v-if="label != null" v-bind="api.getLabelProps()" class="md-radio-label">{{ label }}</span>
    <label
      v-for="opt in options"
      :key="opt.value"
      v-bind="api.getItemProps({ value: opt.value, disabled: opt.disabled })"
      class="md-radio-item"
    >
      <span v-bind="api.getItemControlProps({ value: opt.value, disabled: opt.disabled })" class="md-radio-control" />
      <span v-bind="api.getItemTextProps({ value: opt.value, disabled: opt.disabled })" class="md-radio-item-text">{{
        opt.label ?? opt.value
      }}</span>
      <input v-bind="api.getItemHiddenInputProps({ value: opt.value, disabled: opt.disabled })" />
    </label>
  </div>
</template>
