<script setup lang="ts">
import { DatePicker } from '@moderno/vue'
</script>

<template>
  <div style="max-width: 280px">
    <DatePicker.Root :default-value="['2024-01-15']">
      <DatePicker.Label>Fecha de entrega</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.Trigger />
      </DatePicker.Control>
      <DatePicker.Content />
    </DatePicker.Root>
  </div>
</template>
