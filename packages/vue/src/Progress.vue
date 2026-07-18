<script setup lang="ts">
import { computed, useId } from 'vue'
import * as progress from '@zag-js/progress'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { cx, parts, type ProgressVariant } from '@moderno/class-contract'

const props = withDefaults(
  defineProps<{
    label?: string
    defaultValue?: number | null
    modelValue?: number | null
    min?: number
    max?: number
    variant?: ProgressVariant
    showValue?: boolean
  }>(),
  { variant: 'linear', showValue: true },
)
const emit = defineEmits<{ 'update:modelValue': [number | null] }>()

const service = useMachine(progress.machine, {
  id: useId(),
  get defaultValue() {
    return props.defaultValue
  },
  get value() {
    return props.modelValue
  },
  get min() {
    return props.min
  },
  get max() {
    return props.max
  },
  onValueChange(d) {
    emit('update:modelValue', d.value)
  },
})
const api = computed(() => progress.connect(service, normalizeProps))
</script>

<template>
  <div v-bind="api.getRootProps()" :class="cx.progress({ variant })">
    <div v-if="label != null || showValue" :class="parts.progress.header">
      <span v-if="label != null" v-bind="api.getLabelProps()" :class="parts.progress.label">{{ label }}</span>
      <span v-else />
      <span v-if="showValue" v-bind="api.getValueTextProps()" :class="parts.progress.valueText">{{
        api.valueAsString
      }}</span>
    </div>
    <svg v-if="variant === 'circular'" v-bind="api.getCircleProps()" :class="parts.progress.circle">
      <circle v-bind="api.getCircleTrackProps()" :class="parts.progress.circleTrack" />
      <circle v-bind="api.getCircleRangeProps()" :class="parts.progress.circleRange" />
    </svg>
    <div v-else v-bind="api.getTrackProps()" :class="parts.progress.track">
      <div v-bind="api.getRangeProps()" :class="parts.progress.range" />
    </div>
  </div>
</template>
