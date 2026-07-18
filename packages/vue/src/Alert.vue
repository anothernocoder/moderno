<script setup lang="ts">
import { cx, parts, type AlertVariant } from '@moderno/class-contract'

const props = defineProps<{ variant?: AlertVariant; title?: string }>()
</script>

<template>
  <div :class="cx.alert({ variant: props.variant })" role="alert">
    <p v-if="title" :class="parts.alert.title">{{ title }}</p>
    <p :class="parts.alert.body"><slot /></p>
  </div>
</template>
