<script setup lang="ts">
import { computed, useId } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{ label?: string; hint?: string; error?: string; id?: string }>()
const model = defineModel<string>()

const autoId = useId()
const inputId = computed(() => props.id ?? autoId)
const msgId = computed(() => `${inputId.value}-msg`)
</script>

<template>
  <div>
    <label v-if="label" class="md-field-label" :for="inputId">{{ label }}</label>
    <input
      :id="inputId"
      v-model="model"
      :class="['md-input', error ? 'md-input--error' : '']"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="error || hint ? msgId : undefined"
      v-bind="$attrs"
    />
    <p v-if="error" class="md-field-error" :id="msgId">{{ error }}</p>
    <p v-else-if="hint" class="md-field-hint" :id="msgId">{{ hint }}</p>
  </div>
</template>
