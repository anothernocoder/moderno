<script setup lang="ts">
import { computed, useId } from 'vue'
import * as slider from '@zag-js/slider'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { parts } from '@moderno/class-contract'

const props = withDefaults(
  defineProps<{
    label?: string
    defaultValue?: number
    modelValue?: number
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    showValue?: boolean
    name?: string
  }>(),
  { showValue: true },
)
const emit = defineEmits<{ 'update:modelValue': [number] }>()

const service = useMachine(slider.machine, {
  id: useId(),
  get defaultValue() {
    return props.defaultValue != null ? [props.defaultValue] : props.modelValue == null ? [50] : undefined
  },
  get value() {
    return props.modelValue != null ? [props.modelValue] : undefined
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
    emit('update:modelValue', d.value[0])
  },
})
const api = computed(() => slider.connect(service, normalizeProps))
</script>

<template>
  <div v-bind="api.getRootProps()" :class="parts.slider.root">
    <div v-if="label != null || showValue" :class="parts.slider.header">
      <label v-if="label != null" v-bind="api.getLabelProps()" :class="parts.slider.label">{{ label }}</label>
      <span v-else />
      <output v-if="showValue" v-bind="api.getValueTextProps()" :class="parts.slider.value">{{ api.value[0] }}</output>
    </div>
    <div v-bind="api.getControlProps()" :class="parts.slider.control">
      <div v-bind="api.getTrackProps()" :class="parts.slider.track">
        <div v-bind="api.getRangeProps()" :class="parts.slider.range" />
      </div>
      <div v-bind="api.getThumbProps({ index: 0 })" :class="parts.slider.thumb">
        <input v-bind="api.getHiddenInputProps({ index: 0 })" />
      </div>
    </div>
  </div>
</template>
