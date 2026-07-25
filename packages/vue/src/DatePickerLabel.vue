<script setup lang="ts">
import { useDatePicker } from './date-picker-context'
import { parts } from '@moderno-ui/class-contract'

const api = useDatePicker('Label')
</script>

<template>
  <label v-bind="api.getLabelProps()" :class="parts.datepicker.label"><slot /></label>
</template>
