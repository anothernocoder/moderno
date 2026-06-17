<script setup lang="ts">
import { useSlots } from 'vue'
import { parts } from '@moderno/class-contract'
const slots = useSlots()
</script>

<template>
  <div :class="parts.card.root">
    <h3 v-if="slots.title" :class="parts.card.title"><slot name="title" /></h3>
    <div v-if="slots.default" :class="parts.card.body"><slot /></div>
    <div v-if="slots.footer" :class="parts.card.footer"><slot name="footer" /></div>
  </div>
</template>
