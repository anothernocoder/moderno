<script setup lang="ts">
import { computed, useId } from 'vue'
import * as menu from '@zag-js/menu'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { cx, parts } from '@moderno/class-contract'

export interface MenuItem {
  label: string
  value: string
  disabled?: boolean
}

// Trigger renders inline; panel is teleported to the body.
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  triggerLabel: string
  items: MenuItem[]
}>()
const emit = defineEmits<{ select: [string] }>()

const service = useMachine(menu.machine, {
  id: useId(),
  onSelect(d) {
    emit('select', d.value)
  },
})
const api = computed(() => menu.connect(service, normalizeProps))
</script>

<template>
  <button v-bind="api.getTriggerProps()" :class="cx.button({ variant: 'secondary', size: 'sm' })">
    {{ triggerLabel }}
    <span v-bind="api.getIndicatorProps()" :class="parts.menu.indicator" aria-hidden="true">▾</span>
  </button>
  <Teleport v-if="api.open" to="body">
    <div v-bind="api.getPositionerProps()" :class="parts.menu.positioner">
      <ul v-bind="api.getContentProps()" :class="parts.menu.content">
        <li
          v-for="item in props.items"
          :key="item.value"
          v-bind="api.getItemProps({ value: item.value, disabled: item.disabled })"
          :class="parts.menu.item"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </Teleport>
</template>
