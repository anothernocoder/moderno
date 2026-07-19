<script setup lang="ts">
import { useDatePicker } from './date-picker-context'
import { parts } from '@moderno/class-contract'

const api = useDatePicker('ClearTrigger')
</script>

<template>
  <button v-bind="api.getClearTriggerProps()" :class="parts.datepicker.clearTrigger">
    <slot>✕</slot>
  </button>
</template>
