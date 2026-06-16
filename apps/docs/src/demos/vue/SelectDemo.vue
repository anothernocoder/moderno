<script setup lang="ts">
import { Select } from '@moderno/vue'

const frutas = [
  { label: 'Manzana', value: 'apple' },
  { label: 'Banano', value: 'banana' },
  { label: 'Naranja', value: 'orange' },
  { label: 'Mango', value: 'mango' },
  { label: 'Uva (agotada)', value: 'grape', disabled: true },
]
</script>

<template>
  <div style="max-width: 280px">
    <Select.Root :items="frutas">
      <Select.Label>Fruta favorita</Select.Label>
      <Select.Trigger placeholder="Elige una fruta" />
      <Select.Content>
        <Select.Item v-for="f in frutas" :key="f.value" :item="f" />
      </Select.Content>
    </Select.Root>
  </div>
</template>
