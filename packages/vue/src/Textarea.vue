<script setup lang="ts">
import { computed, useId } from 'vue'
import { cx, parts } from '@moderno/class-contract'

defineOptions({ inheritAttrs: false })

const props = defineProps<{ label?: string; hint?: string; error?: string; id?: string }>()
const model = defineModel<string>()

const autoId = useId()
const fieldId = computed(() => props.id ?? autoId)
const msgId = computed(() => `${fieldId.value}-msg`)
</script>

<template>
  <div>
    <label v-if="label" :class="parts.field.label" :for="fieldId">{{ label }}</label>
    <textarea
      :id="fieldId"
      v-model="model"
      :class="[cx.input({ error: !!error }), parts.field.textarea]"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="error || hint ? msgId : undefined"
      v-bind="$attrs"
    />
    <p v-if="error" :class="parts.field.error" :id="msgId">{{ error }}</p>
    <p v-else-if="hint" :class="parts.field.hint" :id="msgId">{{ hint }}</p>
  </div>
</template>
