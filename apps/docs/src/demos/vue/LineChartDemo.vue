<script setup lang="ts">
import { LineChart } from '@moderno/vue'

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
  <LineChart :data="data" :width="480" :height="220" show-points label="Monthly revenue" />
</template>
