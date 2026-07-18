<script setup lang="ts">
import { computed, useId } from 'vue'
import * as dialog from '@zag-js/dialog'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { provideSheet } from './sheet-context'
import { parts } from '@moderno/class-contract'

// Vue's defineProps<T>() macro defaults absent optional boolean props to
// `false`, not `undefined` — that would make the dialog machine see `open`
// as always-controlled-closed. Force both back to `undefined` so an
// unpassed prop means "uncontrolled".
const props = withDefaults(
  defineProps<{
    defaultOpen?: boolean
    modelValue?: boolean
  }>(),
  { defaultOpen: undefined, modelValue: undefined },
)
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const service = useMachine(dialog.machine, {
  id: useId(),
  defaultOpen: props.defaultOpen,
  get open() {
    return props.modelValue
  },
  onOpenChange(d) {
    emit('update:modelValue', d.open)
  },
})
const api = computed(() => dialog.connect(service, normalizeProps))
provideSheet(api)
</script>

<template>
  <div :class="parts.sheet.root"><slot /></div>
</template>
