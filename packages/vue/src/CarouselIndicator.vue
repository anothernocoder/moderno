<script setup lang="ts">
import { useCarousel } from './carousel-context'
import { parts } from '@moderno/class-contract'

const props = defineProps<{ index: number }>()
const api = useCarousel('Indicator')
</script>

<template>
  <button v-bind="api.getIndicatorProps({ index: props.index })" :class="parts.carousel.indicator"></button>
</template>
