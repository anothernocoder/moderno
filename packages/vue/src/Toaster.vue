<script setup lang="ts">
import { computed, useId } from 'vue'
import * as toast from '@zag-js/toast'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { parts } from '@moderno/class-contract'
import ToastItem from './ToastItem.vue'
import type { Toaster } from './toast'

// Region renders once and is teleported to the body; no root markup of its own.
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{ toaster: Toaster; label?: string; closeLabel?: string }>(), {
  closeLabel: 'Dismiss',
})

const service = useMachine(toast.group.machine, { id: useId(), store: props.toaster })
const api = computed(() => toast.group.connect(service, normalizeProps))
</script>

<template>
  <Teleport to="body">
    <div v-bind="api.getGroupProps({ label })" :class="parts.toast.group">
      <ToastItem
        v-for="(t, index) in api.getToasts()"
        :key="t.id"
        :toast="t"
        :parent="service"
        :index="index"
        :close-label="closeLabel"
      />
    </div>
  </Teleport>
</template>
