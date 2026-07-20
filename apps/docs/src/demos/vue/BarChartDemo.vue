<script setup lang="ts">
import { BarChart } from '@moderno/vue'

const data = [
  { label: 'Jan', value: 12 },
  { label: 'Feb', value: 28 },
  { label: 'Mar', value: 18 },
  { label: 'Apr', value: 42 },
  { label: 'May', value: 35 },
  { label: 'Jun', value: 51 },
]
</script>

<template>
  <BarChart :data="data" :width="480" :height="220" label="Monthly signups" />
</template>
