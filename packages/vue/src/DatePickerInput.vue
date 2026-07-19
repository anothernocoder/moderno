<script setup lang="ts">
import { useDatePicker } from './date-picker-context'
import { parts } from '@moderno/class-contract'

const props = defineProps<{ index?: number }>()
const api = useDatePicker('Input')
</script>

<template>
  <input v-bind="api.getInputProps({ index: props.index })" :class="parts.datepicker.input" />
</template>
