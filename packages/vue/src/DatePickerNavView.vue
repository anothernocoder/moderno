<script setup lang="ts">
import type { DateView } from '@zag-js/date-picker'
import { useDatePicker } from './date-picker-context'
import { parts } from '@moderno/class-contract'

const props = defineProps<{ view: DateView }>()
const api = useDatePicker('Content')
</script>

<template>
  <div v-bind="api.getViewControlProps({ view: props.view })" :class="parts.datepicker.viewControl">
    <button v-bind="api.getPrevTriggerProps({ view: props.view })" :class="parts.datepicker.prevTrigger">‹</button>
    <span v-if="props.view === 'year'" :class="parts.datepicker.viewTrigger">
      {{ api.getDecade().start }}–{{ api.getDecade().end }}
    </span>
    <button v-else v-bind="api.getViewTriggerProps({ view: props.view })" :class="parts.datepicker.viewTrigger">
      {{ props.view === 'day' ? api.visibleRangeText.start : api.visibleRange.start.year }}
    </button>
    <button v-bind="api.getNextTriggerProps({ view: props.view })" :class="parts.datepicker.nextTrigger">›</button>
  </div>
</template>
