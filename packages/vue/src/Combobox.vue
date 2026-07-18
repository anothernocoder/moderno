<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import * as combobox from '@zag-js/combobox'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { parts } from '@moderno/class-contract'

export interface ComboboxItem {
  label: string
  value: string
  disabled?: boolean
}

// Control renders inline; panel is teleported to the body.
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  label?: string
  items: ComboboxItem[]
  placeholder?: string
  defaultValue?: string[]
  modelValue?: string[]
  disabled?: boolean
}>()
const emit = defineEmits<{ 'update:modelValue': [string[]] }>()

const query = ref('')
const options = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.items
  return props.items.filter((item) => item.label.toLowerCase().includes(q))
})
const collection = computed(() => combobox.collection({ items: options.value }))

const service = useMachine(combobox.machine, {
  id: useId(),
  get collection() {
    return collection.value
  },
  get defaultValue() {
    return props.defaultValue
  },
  get value() {
    return props.modelValue
  },
  get disabled() {
    return props.disabled
  },
  onValueChange(d) {
    emit('update:modelValue', d.value)
  },
  // Only typing narrows the list; selection/clear set the input programmatically
  // and must show the full list on the next open.
  onInputValueChange(d) {
    query.value = d.reason === 'input-change' ? d.inputValue : ''
  },
})
const api = computed(() => combobox.connect(service, normalizeProps))
</script>

<template>
  <div v-bind="api.getRootProps()" :class="parts.combobox.root">
    <label v-if="label != null" v-bind="api.getLabelProps()" :class="parts.combobox.label">{{ label }}</label>
    <div v-bind="api.getControlProps()" :class="parts.combobox.control">
      <input v-bind="api.getInputProps()" :class="parts.combobox.input" :placeholder="placeholder" />
      <button v-bind="api.getTriggerProps()" :class="parts.combobox.trigger">▾</button>
    </div>
    <Teleport v-if="api.open && options.length > 0" to="body">
      <div v-bind="api.getPositionerProps()" :class="parts.combobox.positioner">
        <ul v-bind="api.getContentProps()" :class="parts.combobox.content">
          <li
            v-for="item in options"
            :key="item.value"
            v-bind="api.getItemProps({ item })"
            :class="parts.combobox.item"
          >
            <span v-bind="api.getItemTextProps({ item })" :class="parts.combobox.itemText">{{ item.label }}</span>
            <span v-bind="api.getItemIndicatorProps({ item })" :class="parts.combobox.itemIndicator" aria-hidden="true">✓</span>
          </li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>
