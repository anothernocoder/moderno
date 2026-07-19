<script setup lang="ts">
import { computed, useId } from 'vue'
import * as pagination from '@zag-js/pagination'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { parts } from '@moderno/class-contract'

const props = defineProps<{
  count: number
  defaultPageSize?: number
  pageSize?: number
  defaultPage?: number
  modelValue?: number
  siblingCount?: number
  boundaryCount?: number
  translations?: pagination.IntlTranslations
}>()
const emit = defineEmits<{ 'update:modelValue': [number]; 'update:pageSize': [number] }>()

const service = useMachine(pagination.machine, {
  id: useId(),
  get count() {
    return props.count
  },
  get defaultPageSize() {
    return props.defaultPageSize
  },
  get pageSize() {
    return props.pageSize
  },
  onPageSizeChange(d) {
    emit('update:pageSize', d.pageSize)
  },
  get defaultPage() {
    return props.defaultPage
  },
  get page() {
    return props.modelValue
  },
  onPageChange(d) {
    emit('update:modelValue', d.page)
  },
  get siblingCount() {
    return props.siblingCount
  },
  get boundaryCount() {
    return props.boundaryCount
  },
  get translations() {
    return props.translations
  },
})
const api = computed(() => pagination.connect(service, normalizeProps))
</script>

<template>
  <nav v-bind="api.getRootProps()" :class="parts.pagination.root">
    <button v-bind="api.getPrevTriggerProps()" :class="parts.pagination.prevTrigger">‹</button>
    <template v-for="(p, index) in api.pages" :key="p.type === 'page' ? `page-${p.value}` : `ellipsis-${index}`">
      <button v-if="p.type === 'page'" v-bind="api.getItemProps(p)" :class="parts.pagination.item">{{ p.value }}</button>
      <span v-else v-bind="api.getEllipsisProps({ index })" :class="parts.pagination.ellipsis">&#8230;</span>
    </template>
    <button v-bind="api.getNextTriggerProps()" :class="parts.pagination.nextTrigger">›</button>
  </nav>
</template>
