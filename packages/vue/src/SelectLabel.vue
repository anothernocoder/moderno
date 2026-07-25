<script setup lang="ts">
import { useSelect } from './select-context'
import { parts } from '@moderno-ui/class-contract'

const api = useSelect('Label')
</script>

<template>
  <label v-bind="api.getLabelProps()" :class="parts.select.label"><slot /></label>
</template>
