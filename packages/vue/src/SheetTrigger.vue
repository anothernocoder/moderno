<script setup lang="ts">
import { useSheet } from './sheet-context'
import { cx } from '@moderno/class-contract'

const api = useSheet('Trigger')
</script>

<template>
  <button v-bind="api.getTriggerProps()" :class="cx.button({ variant: 'primary' })"><slot /></button>
</template>
