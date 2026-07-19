<script setup lang="ts">
import { computed, useId } from 'vue'
import * as splitter from '@zag-js/splitter'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { parts } from '@moderno/class-contract'

export interface SplitterPanelDef {
  /** Unique id for the panel; content is provided via a slot of the same name. */
  id: string
  /** Minimum size of the panel, as a percentage. */
  minSize?: number | string
  /** Maximum size of the panel, as a percentage. */
  maxSize?: number | string
  /** Whether the panel can be collapsed to `collapsedSize`. */
  collapsible?: boolean
  /** The size of the panel when collapsed. */
  collapsedSize?: number | string
  /** How the panel behaves when the group is resized. */
  resizeBehavior?: 'preserve-relative-size' | 'preserve-pixel-size'
}

const props = defineProps<{
  panels: SplitterPanelDef[]
  orientation?: 'horizontal' | 'vertical'
  size?: number[]
  defaultSize?: number[]
  keyboardResizeBy?: number
  resizeTriggerLabel?: (beforeId: string, afterId: string) => string
}>()
const emit = defineEmits<{
  'update:size': [size: number[]]
  resizeStart: []
  resizeEnd: [size: number[]]
}>()

const service = useMachine(splitter.machine, {
  id: useId(),
  get panels() {
    return props.panels.map(({ id, minSize, maxSize, collapsible, collapsedSize, resizeBehavior }) => ({
      id,
      minSize,
      maxSize,
      collapsible,
      collapsedSize,
      resizeBehavior,
    }))
  },
  get orientation() {
    return props.orientation
  },
  get size() {
    return props.size
  },
  get defaultSize() {
    return props.defaultSize
  },
  onResize(d) {
    emit('update:size', d.size)
  },
  onResizeStart() {
    emit('resizeStart')
  },
  onResizeEnd(d) {
    emit('resizeEnd', d.size)
  },
  get keyboardResizeBy() {
    return props.keyboardResizeBy
  },
})
const api = computed(() => splitter.connect(service, normalizeProps))

function resizeTriggerLabelFor(beforeId: string, afterId: string): string {
  return props.resizeTriggerLabel ? props.resizeTriggerLabel(beforeId, afterId) : `Resize ${beforeId} and ${afterId}`
}
</script>

<template>
  <div v-bind="api.getRootProps()" :class="parts.splitter.root">
    <template v-for="(panel, index) in panels" :key="panel.id">
      <div v-bind="api.getPanelProps({ id: panel.id })" :class="parts.splitter.panel">
        <slot :name="panel.id" />
      </div>
      <div
        v-if="index < panels.length - 1"
        v-bind="api.getResizeTriggerProps({ id: `${panel.id}:${panels[index + 1].id}` })"
        :class="parts.splitter.resizeTrigger"
        :aria-label="resizeTriggerLabelFor(panel.id, panels[index + 1].id)"
      >
        <div
          v-bind="api.getResizeTriggerIndicator({ id: `${panel.id}:${panels[index + 1].id}` })"
          :class="parts.splitter.resizeTriggerIndicator"
        />
      </div>
    </template>
  </div>
</template>
