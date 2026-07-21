<script setup lang="ts">
// Moderno block — Banner (Vue). Copy-paste; edit freely.
// Dismissible top-of-page promo/announcement strip. Uses the Button primitive + Moderno tokens.
import { ref } from 'vue'
import { Button } from '@moderno/vue'

const props = withDefaults(
  defineProps<{
    message?: string
    ctaLabel?: string
    ctaHref?: string
    dismissible?: boolean
    closeLabel?: string
  }>(),
  {
    message: 'Lanzamos blocks para React, Vue, Svelte y Solid — mismo look, cualquier framework.',
    ctaLabel: 'Ver blocks',
    dismissible: true,
    closeLabel: 'Cerrar',
  },
)

const emit = defineEmits<{ cta: []; dismiss: [] }>()

const dismissed = ref(false)

function handleDismiss() {
  dismissed.value = true
  emit('dismiss')
}
</script>

<template>
  <div v-if="!dismissed" class="md-banner">
    <div class="md-banner__row">
      <p class="md-banner__message">{{ message }}</p>
      <a v-if="ctaLabel && ctaHref" :href="ctaHref" class="md-banner__cta-link">{{ ctaLabel }}</a>
      <Button
        v-else-if="ctaLabel"
        :label="ctaLabel"
        size="sm"
        variant="secondary"
        style="border-color: var(--md-on-primary); color: var(--md-on-primary)"
        @click="emit('cta')"
      />
    </div>
    <button
      v-if="dismissible"
      type="button"
      class="md-banner__close"
      :aria-label="closeLabel"
      @click="handleDismiss"
    >
      ×
    </button>
  </div>
</template>

<style scoped>
.md-banner {
  position: relative;
  background: var(--md-primary);
  color: var(--md-on-primary);
}
.md-banner__row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 1040px;
  margin: 0 auto;
  padding: 12px 56px;
}
.md-banner__message {
  margin: 0;
  font-size: var(--md-text-body-sm);
  line-height: var(--md-text-body-sm-lh);
  text-align: center;
}
.md-banner__cta-link {
  color: inherit;
  font-weight: 600;
  text-decoration: underline;
  white-space: nowrap;
}
.md-banner__close {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: inherit;
  font: inherit;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  padding: 4px;
}
</style>
