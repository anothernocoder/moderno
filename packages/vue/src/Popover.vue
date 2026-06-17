<script setup lang="ts">
import { computed, useId } from 'vue'
import * as popover from '@zag-js/popover'
import { useMachine, normalizeProps } from '@zag-js/vue'

// Trigger renders inline; panel is teleported to the body.
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{ triggerLabel: string; title?: string; content: string; closeLabel?: string }>(),
  { closeLabel: 'Close' },
)

const service = useMachine(popover.machine, { id: useId() })
const api = computed(() => popover.connect(service, normalizeProps))
</script>

<template>
  <button v-bind="api.getTriggerProps()" class="md-btn md-btn--secondary md-btn--sm">{{ triggerLabel }}</button>
  <Teleport v-if="api.open" to="body">
    <div v-bind="api.getPositionerProps()" class="md-popover-positioner">
      <div v-bind="api.getContentProps()" class="md-popover-content">
        <div v-bind="api.getArrowProps()" class="md-popover-arrow">
          <div v-bind="api.getArrowTipProps()" />
        </div>
        <p v-if="title" v-bind="api.getTitleProps()" class="md-popover-title">{{ title }}</p>
        <div v-bind="api.getDescriptionProps()" class="md-popover-body">{{ content }}</div>
        <button v-bind="api.getCloseTriggerProps()" class="md-popover-close" :aria-label="closeLabel">✕</button>
      </div>
    </div>
  </Teleport>
</template>
