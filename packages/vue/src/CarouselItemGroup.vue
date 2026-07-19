<script setup lang="ts">
import { useCarousel } from './carousel-context'
import { parts } from '@moderno/class-contract'

const api = useCarousel('ItemGroup')
</script>

<template>
  <div v-bind="api.getItemGroupProps()" :class="parts.carousel.itemGroup"><slot /></div>
</template>
