<script setup lang="ts">
import { useCarousel } from './carousel-context'
import { parts } from '@moderno/class-contract'

const props = defineProps<{ index: number }>()
const api = useCarousel('Item')
</script>

<template>
  <div v-bind="api.getItemProps({ index: props.index })" :class="parts.carousel.item"><slot /></div>
</template>
