<script setup lang="ts">
// Moderno block — Promo (Vue). Copy-paste; edit freely.
// Sitewide promotional announcement bar: a message, an optional CTA link, and an
// optional close button. Plain layout + `--md-*` tokens, no primitives.
import { ref } from 'vue'

withDefaults(
  defineProps<{
    message?: string
    ctaLabel?: string
    ctaHref?: string
    dismissible?: boolean
    closeLabel?: string
  }>(),
  {
    message: 'Envío gratis en pedidos mayores a $50.000. Hoy: 20% de descuento en toda la tienda.',
    ctaLabel: 'Ver ofertas',
    ctaHref: '#',
    dismissible: true,
    closeLabel: 'Cerrar',
  },
)

const emit = defineEmits<{ ctaClick: [event: MouseEvent]; dismiss: [] }>()

const visible = ref(true)

function handleDismiss() {
  visible.value = false
  emit('dismiss')
}
</script>

<template>
  <div v-if="visible" class="md-promo" role="region" aria-label="Promoción">
    <div class="md-promo__row">
      <p class="md-promo__message">{{ message }}</p>
      <a v-if="ctaLabel" :href="ctaHref" class="md-promo__cta" @click="emit('ctaClick', $event)">{{ ctaLabel }}</a>
    </div>
    <button v-if="dismissible" type="button" class="md-promo__close" :aria-label="closeLabel" @click="handleDismiss">×</button>
  </div>
</template>

<style scoped>
.md-promo {
  position: relative;
  background: var(--md-primary);
  color: var(--md-on-primary);
}
.md-promo__row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px 16px;
  max-width: 1040px;
  margin: 0 auto;
  padding: 10px 48px;
  text-align: center;
}
.md-promo__message {
  margin: 0;
  font-size: var(--md-text-body-sm);
  line-height: var(--md-text-body-sm-lh);
  font-weight: 600;
}
.md-promo__cta {
  color: inherit;
  font-size: var(--md-text-body-sm);
  font-weight: 600;
  text-decoration: underline;
  white-space: nowrap;
  flex-shrink: 0;
}
.md-promo__close {
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
