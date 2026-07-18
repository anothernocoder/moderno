<script setup lang="ts">
import { useSelect } from './select-context'
import { parts } from '@moderno/class-contract'

// Content is teleported to the body; trigger stays in flow.
defineOptions({ inheritAttrs: false })
const api = useSelect('Content')
</script>

<template>
  <Teleport v-if="api.open" to="body">
    <div v-bind="api.getPositionerProps()" :class="parts.select.positioner">
      <ul v-bind="api.getContentProps()" :class="parts.select.content"><slot /></ul>
    </div>
  </Teleport>
</template>
