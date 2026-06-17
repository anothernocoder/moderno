<script setup lang="ts">
import { computed, useId } from 'vue'
import * as popover from '@zag-js/popover'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { cx, parts } from '@moderno/class-contract'

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
  <button v-bind="api.getTriggerProps()" :class="cx.button({ variant: 'secondary', size: 'sm' })">{{ triggerLabel }}</button>
  <Teleport v-if="api.open" to="body">
    <div v-bind="api.getPositionerProps()" :class="parts.popover.positioner">
      <div v-bind="api.getContentProps()" :class="parts.popover.content">
        <div v-bind="api.getArrowProps()" :class="parts.popover.arrow">
          <div v-bind="api.getArrowTipProps()" />
        </div>
        <p v-if="title" v-bind="api.getTitleProps()" :class="parts.popover.title">{{ title }}</p>
        <div v-bind="api.getDescriptionProps()" :class="parts.popover.body">{{ content }}</div>
        <button v-bind="api.getCloseTriggerProps()" :class="parts.popover.close" :aria-label="closeLabel">✕</button>
      </div>
    </div>
  </Teleport>
</template>
