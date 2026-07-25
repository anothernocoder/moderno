<script setup lang="ts">
import { useCarousel } from './carousel-context'
import { parts } from '@moderno-ui/class-contract'

const api = useCarousel('Control')
</script>

<template>
  <div v-bind="api.getControlProps()" :class="parts.carousel.control"><slot /></div>
</template>
