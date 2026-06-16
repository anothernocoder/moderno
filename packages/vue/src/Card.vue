<script setup lang="ts">
import { useSlots } from 'vue'
const slots = useSlots()
</script>

<template>
  <div class="md-card">
    <h3 v-if="slots.title" class="md-card__title"><slot name="title" /></h3>
    <div v-if="slots.default" class="md-card__body"><slot /></div>
    <div v-if="slots.footer" class="md-card__footer"><slot name="footer" /></div>
  </div>
</template>
