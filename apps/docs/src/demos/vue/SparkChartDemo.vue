<script setup lang="ts">
import { SparkChart } from '@moderno/vue'

const data = [
  { x: 0, y: 12 },
  { x: 1, y: 28 },
  { x: 2, y: 18 },
  { x: 3, y: 42 },
  { x: 4, y: 35 },
  { x: 5, y: 51 },
]
</script>

<template>
  <SparkChart :data="data" :width="120" :height="32" show-last-point label="Monthly revenue trend" />
</template>
