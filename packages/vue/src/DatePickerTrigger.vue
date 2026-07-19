<script setup lang="ts">
import { useDatePicker } from './date-picker-context'
import { parts } from '@moderno/class-contract'

const api = useDatePicker('Trigger')
</script>

<template>
  <button v-bind="api.getTriggerProps()" :class="parts.datepicker.trigger">
    <slot>🗓</slot>
  </button>
</template>
