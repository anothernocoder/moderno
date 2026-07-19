<script setup lang="ts">
import { computed, useId } from 'vue'
import * as datepicker from '@zag-js/date-picker'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { provideDatePicker } from './date-picker-context'
import { parts } from '@moderno/class-contract'

const props = defineProps<{
  /** `'single'` picks one date, `'range'` picks a start/end pair. */
  selectionMode?: 'single' | 'range'
  /** Uncontrolled initial date(s), as ISO 8601 strings (`'2024-01-15'`). */
  defaultValue?: string[]
  /** Controlled selected date(s), as ISO 8601 strings. */
  modelValue?: string[]
  /** Earliest selectable date (ISO 8601). */
  min?: string
  /** Latest selectable date (ISO 8601). */
  max?: string
  disabled?: boolean
  locale?: string
  /** `0` (Sunday) through `6` (Saturday). */
  startOfWeek?: number
}>()
const emit = defineEmits<{ 'update:modelValue': [string[]] }>()

const service = useMachine(datepicker.machine, {
  id: useId(),
  get selectionMode() {
    return props.selectionMode
  },
  get defaultValue() {
    return props.defaultValue?.map((d) => datepicker.parse(d))
  },
  get value() {
    return props.modelValue?.map((d) => datepicker.parse(d))
  },
  get min() {
    return props.min ? datepicker.parse(props.min) : undefined
  },
  get max() {
    return props.max ? datepicker.parse(props.max) : undefined
  },
  get disabled() {
    return props.disabled
  },
  get locale() {
    return props.locale
  },
  get startOfWeek() {
    return props.startOfWeek
  },
  onValueChange(d) {
    emit('update:modelValue', d.valueAsString)
  },
})
const api = computed(() => datepicker.connect(service, normalizeProps))
provideDatePicker(api)
</script>

<template>
  <div v-bind="api.getRootProps()" :class="parts.datepicker.root"><slot /></div>
</template>
