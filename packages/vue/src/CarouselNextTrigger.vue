<script setup lang="ts">
import { useCarousel } from './carousel-context'
import { parts } from '@moderno/class-contract'

const api = useCarousel('NextTrigger')
</script>

<template>
  <button v-bind="api.getNextTriggerProps()" :class="parts.carousel.nextTrigger"><slot>›</slot></button>
</template>
