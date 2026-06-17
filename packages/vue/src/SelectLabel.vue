<script setup lang="ts">
import { inject } from 'vue'
import { SelectKey } from './select-context'
import { parts } from '@moderno/class-contract'

const api = inject(SelectKey)!
</script>

<template>
  <label v-bind="api.getLabelProps()" :class="parts.select.label"><slot /></label>
</template>
