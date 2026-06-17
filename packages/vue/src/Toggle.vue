<script setup lang="ts">
import { computed, useId } from 'vue'
import * as zagSwitch from '@zag-js/switch'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { parts } from '@moderno/class-contract'

// Renders a control plus an optional label; no single host element for attrs.
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  label?: string
  defaultChecked?: boolean
  modelValue?: boolean
  disabled?: boolean
  invalid?: boolean
  name?: string
  value?: string
}>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const service = useMachine(zagSwitch.machine, {
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
const api = computed(() => zagSwitch.connect(service, normalizeProps))
</script>

<template>
  <label v-bind="api.getRootProps()" :class="parts.toggle.root">
    <input v-bind="api.getHiddenInputProps()" />
    <span v-bind="api.getControlProps()" :class="parts.toggle.control">
      <span v-bind="api.getThumbProps()" :class="parts.toggle.thumb" />
    </span>
    <span v-if="label != null" v-bind="api.getLabelProps()" :class="parts.toggle.label">{{ label }}</span>
  </label>
</template>
