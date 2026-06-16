<script setup lang="ts">
import { inject } from 'vue'
import { SelectKey } from './select-context'

const api = inject(SelectKey)!
</script>

<template>
  <label v-bind="api.getLabelProps()" class="md-select-label"><slot /></label>
</template>
