<script setup lang="ts">
import { computed, useId } from 'vue'
import * as tabs from '@zag-js/tabs'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { provideTabs } from './tabs-context'
import { parts } from '@moderno/class-contract'

const props = defineProps<{ defaultValue?: string; modelValue?: string }>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()

const service = useMachine(tabs.machine, {
  id: useId(),
  get defaultValue() {
    return props.defaultValue
  },
  get value() {
    return props.modelValue
  },
  onValueChange(d) {
    emit('update:modelValue', d.value)
  },
})
const api = computed(() => tabs.connect(service, normalizeProps))
provideTabs(api)
</script>

<template>
  <div v-bind="api.getRootProps()" :class="parts.tabs.root"><slot /></div>
</template>
