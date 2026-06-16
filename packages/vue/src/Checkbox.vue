<script setup lang="ts">
import { computed, useId } from 'vue'
import * as checkbox from '@zag-js/checkbox'
import { useMachine, normalizeProps } from '@zag-js/vue'

type CheckedState = boolean | 'indeterminate'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  label?: string
  defaultChecked?: CheckedState
  modelValue?: CheckedState
  disabled?: boolean
  invalid?: boolean
  required?: boolean
  name?: string
  value?: string
}>()
const emit = defineEmits<{ 'update:modelValue': [CheckedState] }>()

const service = useMachine(checkbox.machine, {
  id: useId(),
  get defaultChecked() {
    return props.defaultChecked
  },
  get checked() {
    return props.modelValue
  },
  get disabled() {
    return props.disabled
  },
  get invalid() {
    return props.invalid
  },
  get required() {
    return props.required
  },
  get name() {
    return props.name
  },
  get value() {
    return props.value
  },
  onCheckedChange(d) {
    emit('update:modelValue', d.checked)
  },
})
const api = computed(() => checkbox.connect(service, normalizeProps))
</script>

<template>
  <label v-bind="api.getRootProps()" class="md-checkbox">
    <input v-bind="api.getHiddenInputProps()" />
    <span v-bind="api.getControlProps()" class="md-checkbox-control">
      <span v-bind="api.getIndicatorProps()" class="md-checkbox-indicator">{{ api.indeterminate ? '–' : '✓' }}</span>
    </span>
    <span v-if="label != null" v-bind="api.getLabelProps()" class="md-checkbox-label">{{ label }}</span>
  </label>
</template>
