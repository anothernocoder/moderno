<script setup lang="ts">
import { cx, parts, type AvatarSize, type AvatarShape } from '@moderno/class-contract'

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    initials?: string
    size?: AvatarSize
    shape?: AvatarShape
  }>(),
  { alt: '' },
)
</script>

<template>
  <span :class="cx.avatar({ size: props.size, shape: props.shape })">
    <img v-if="src" :class="parts.avatar.img" :src="src" :alt="alt" />
    <template v-else>{{ initials }}</template>
  </span>
</template>
