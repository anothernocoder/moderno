<script setup lang="ts">
import { computed, useId } from 'vue'
import * as toastMachine from '@zag-js/toast'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { cx, parts } from '@moderno/class-contract'

const props = defineProps<{
  toast: toastMachine.Props
  parent: toastMachine.GroupService
  index: number
  closeLabel: string
}>()

const service = useMachine(toastMachine.machine, {
  parent: props.parent,
  get id() {
    return props.toast.id
  },
  get index() {
    return props.index
  },
  get title() {
    return props.toast.title
  },
  get description() {
    return props.toast.description
  },
  get type() {
    return props.toast.type
  },
  get duration() {
    return props.toast.duration
  },
  get removeDelay() {
    return props.toast.removeDelay
  },
  get closable() {
    return props.toast.closable
  },
  get action() {
    return props.toast.action
  },
})
const api = computed(() => toastMachine.connect(service, normalizeProps))
</script>

<template>
  <div v-bind="api.getRootProps()" :class="parts.toast.root">
    <p v-if="api.title" v-bind="api.getTitleProps()" :class="parts.toast.title">{{ api.title }}</p>
    <p v-if="api.description" v-bind="api.getDescriptionProps()" :class="parts.toast.description">
      {{ api.description }}
    </p>
    <button v-if="toast.action" v-bind="api.getActionTriggerProps()" :class="cx.button({ variant: 'secondary', size: 'sm' })">
      {{ toast.action.label }}
    </button>
    <button v-if="api.closable" v-bind="api.getCloseTriggerProps()" :class="parts.toast.closeTrigger" :aria-label="closeLabel">
      ✕
    </button>
  </div>
</template>
