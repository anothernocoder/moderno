<script setup lang="ts">
import { useDatePicker } from './date-picker-context'
import { parts } from '@moderno/class-contract'

const api = useDatePicker('Control')
</script>

<template>
  <div v-bind="api.getControlProps()" :class="parts.datepicker.control"><slot /></div>
</template>
