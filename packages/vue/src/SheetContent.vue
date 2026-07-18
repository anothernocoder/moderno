<script setup lang="ts">
import { useSheet } from './sheet-context'
import { cx, parts, type SheetSide } from '@moderno/class-contract'

// Content is teleported to the body; trigger stays in flow.
defineOptions({ inheritAttrs: false })

withDefaults(defineProps<{ side?: SheetSide }>(), { side: 'right' })

const api = useSheet('Content')
</script>

<template>
  <Teleport v-if="api.open" to="body">
    <div v-bind="api.getBackdropProps()" :class="parts.sheet.backdrop" />
    <div v-bind="api.getPositionerProps()" :class="parts.sheet.positioner">
      <div v-bind="api.getContentProps()" :class="cx.sheet({ side })"><slot /></div>
    </div>
  </Teleport>
</template>
