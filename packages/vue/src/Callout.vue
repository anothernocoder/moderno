<script setup lang="ts">
import { cx, parts, type CalloutVariant } from '@moderno/class-contract'

const props = defineProps<{ variant?: CalloutVariant; title?: string }>()
</script>

<template>
  <div :class="cx.callout({ variant: props.variant })" role="note">
    <p v-if="title" :class="parts.callout.title">{{ title }}</p>
    <p :class="parts.callout.body"><slot /></p>
  </div>
</template>
