<script setup lang="ts">
import { useCarousel } from './carousel-context'
import { parts } from '@moderno/class-contract'

const api = useCarousel('PrevTrigger')
</script>

<template>
  <button v-bind="api.getPrevTriggerProps()" :class="parts.carousel.prevTrigger"><slot>‹</slot></button>
</template>
