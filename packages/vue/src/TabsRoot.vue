<script setup lang="ts">
import { computed, provide, useId } from 'vue'
import * as tabs from '@zag-js/tabs'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { TabsKey } from './tabs-context'

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
provide(TabsKey, api)
</script>

<template>
  <div v-bind="api.getRootProps()" class="md-tabs"><slot /></div>
</template>
