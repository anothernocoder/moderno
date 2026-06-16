<script setup lang="ts">
import { computed, useId } from 'vue'
import * as tooltip from '@zag-js/tooltip'
import { useMachine, normalizeProps } from '@zag-js/vue'

// Trigger renders inline; content is teleported to the body.
defineOptions({ inheritAttrs: false })

const props = defineProps<{ triggerLabel: string; content: string; openDelay?: number; closeDelay?: number }>()

const service = useMachine(tooltip.machine, {
  id: useId(),
  get openDelay() {
    return props.openDelay
  },
  get closeDelay() {
    return props.closeDelay
  },
})
const api = computed(() => tooltip.connect(service, normalizeProps))
</script>

<template>
  <button v-bind="api.getTriggerProps()" class="md-btn md-btn--secondary md-btn--sm">{{ triggerLabel }}</button>
  <Teleport v-if="api.open" to="body">
    <div v-bind="api.getPositionerProps()" class="md-tooltip-positioner">
      <div v-bind="api.getContentProps()" class="md-tooltip-content">{{ content }}</div>
    </div>
  </Teleport>
</template>
