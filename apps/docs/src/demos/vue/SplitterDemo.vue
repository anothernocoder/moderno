<script setup lang="ts">
import { Splitter } from '@moderno/vue'
</script>

<template>
  <div style="height: 260px">
    <Splitter :panels="[{ id: 'sidebar', minSize: 20, maxSize: 50 }, { id: 'main' }]" :default-size="[30, 70]">
      <template #sidebar><div style="padding: var(--md-spacing-6)">Sidebar</div></template>
      <template #main><div style="padding: var(--md-spacing-6)">Main content</div></template>
    </Splitter>
  </div>
</template>
