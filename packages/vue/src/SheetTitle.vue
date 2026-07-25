<script setup lang="ts">
import { useSheet } from './sheet-context'
import { parts } from '@moderno-ui/class-contract'

const api = useSheet('Title')
</script>

<template>
  <h2 v-bind="api.getTitleProps()" :class="parts.sheet.title"><slot /></h2>
</template>
