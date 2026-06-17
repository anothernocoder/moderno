<script setup lang="ts">
import { computed, useId } from 'vue'
import * as dialog from '@zag-js/dialog'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { cx, parts } from '@moderno/class-contract'

// Dialog renders multiple root nodes (trigger + teleported overlay), so there
// is no single element to inherit wrapper attributes onto.
defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{ triggerLabel: string; title: string; description?: string; closeLabel?: string }>(),
  { closeLabel: 'Close' },
)

const service = useMachine(dialog.machine, { id: useId() })
const api = computed(() => dialog.connect(service, normalizeProps))
</script>

<template>
  <button v-bind="api.getTriggerProps()" :class="cx.button({ variant: 'primary' })">{{ triggerLabel }}</button>
  <Teleport v-if="api.open" to="body">
    <div v-bind="api.getBackdropProps()" :class="parts.dialog.backdrop" />
    <div v-bind="api.getPositionerProps()" :class="parts.dialog.positioner">
      <div v-bind="api.getContentProps()" :class="parts.dialog.content">
        <h2 v-bind="api.getTitleProps()" :class="parts.dialog.title">{{ title }}</h2>
        <p v-if="description" v-bind="api.getDescriptionProps()" :class="parts.dialog.desc">{{ description }}</p>
        <div :class="parts.dialog.actions">
          <button v-bind="api.getCloseTriggerProps()" :class="cx.button({ variant: 'secondary' })">{{ closeLabel }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
