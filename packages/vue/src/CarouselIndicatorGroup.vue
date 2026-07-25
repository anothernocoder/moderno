<script setup lang="ts">
import { useCarousel } from './carousel-context'
import { parts } from '@moderno-ui/class-contract'

const api = useCarousel('IndicatorGroup')
</script>

<template>
  <div v-bind="api.getIndicatorGroupProps()" :class="parts.carousel.indicatorGroup">
    <template v-for="(_, index) in api.pageSnapPoints" :key="index">
      <slot :index="index" />
    </template>
  </div>
</template>
