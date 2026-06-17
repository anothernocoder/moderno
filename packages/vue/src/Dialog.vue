<script setup lang="ts">
import { computed, useId } from 'vue'
import * as dialog from '@zag-js/dialog'
import { useMachine, normalizeProps } from '@zag-js/vue'

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
  <button v-bind="api.getTriggerProps()" class="md-btn md-btn--primary">{{ triggerLabel }}</button>
  <Teleport v-if="api.open" to="body">
    <div v-bind="api.getBackdropProps()" class="md-dialog-backdrop" />
    <div v-bind="api.getPositionerProps()" class="md-dialog-positioner">
      <div v-bind="api.getContentProps()" class="md-dialog-content">
        <h2 v-bind="api.getTitleProps()" class="md-dialog-title">{{ title }}</h2>
        <p v-if="description" v-bind="api.getDescriptionProps()" class="md-dialog-desc">{{ description }}</p>
        <div class="md-dialog-actions">
          <button v-bind="api.getCloseTriggerProps()" class="md-btn md-btn--secondary">{{ closeLabel }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
