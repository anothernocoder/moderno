<script setup lang="ts">
// Moderno block — AppBanners (Vue). Copy-paste; edit freely.
// Application-level system notification banners: impersonation, trial, and incident notices
// stacked full-width at the top of an authenticated app shell. Uses the Button primitive + Moderno tokens.
import { ref, computed } from 'vue'
import { Button } from '@moderno/vue'

type AppBannerVariant = 'info' | 'success' | 'warning' | 'error'

interface AppBannerItem {
  id: string
  variant?: AppBannerVariant
  icon?: string
  message: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
  dismissible?: boolean
  closeLabel?: string
}

const props = withDefaults(
  defineProps<{
    items?: AppBannerItem[]
  }>(),
  {
    items: () => [
      {
        id: 'impersonation',
        variant: 'warning',
        icon: '🕵️',
        message: 'Estás en modo impersonación: viendo la cuenta de Ana Pérez.',
        actionLabel: 'Salir',
        dismissible: false,
      },
      {
        id: 'trial',
        variant: 'info',
        icon: '⏳',
        message: 'Tu prueba termina en 3 días.',
        actionLabel: 'Actualizar plan',
      },
      {
        id: 'incident',
        variant: 'error',
        icon: '⚠️',
        message: 'Servicio degradado: algunas funciones pueden no responder con normalidad.',
      },
    ],
  },
)

const emit = defineEmits<{ dismiss: [id: string] }>()

const VARIANT_TOKEN: Record<AppBannerVariant, string> = {
  info: 'var(--md-info)',
  success: 'var(--md-success)',
  warning: 'var(--md-warning)',
  error: 'var(--md-error)',
}

function tokenFor(variant?: AppBannerVariant) {
  return VARIANT_TOKEN[variant ?? 'info']
}

const dismissedIds = ref<Set<string>>(new Set())

const visibleItems = computed(() => props.items.filter((item) => !dismissedIds.value.has(item.id)))

function handleDismiss(id: string) {
  dismissedIds.value = new Set(dismissedIds.value).add(id)
  emit('dismiss', id)
}
</script>

<template>
  <div class="md-app-banners">
    <div
      v-for="item in visibleItems"
      :key="item.id"
      class="md-app-banners__row"
      role="alert"
      :style="{ background: `color-mix(in srgb, ${tokenFor(item.variant)} 12%, var(--md-surface-base))` }"
    >
      <span v-if="item.icon" aria-hidden="true" class="md-app-banners__icon" :style="{ color: tokenFor(item.variant) }">
        {{ item.icon }}
      </span>
      <p class="md-app-banners__message">{{ item.message }}</p>
      <a
        v-if="item.actionLabel && item.actionHref"
        :href="item.actionHref"
        class="md-app-banners__action"
        :style="{ color: tokenFor(item.variant) }"
      >
        {{ item.actionLabel }}
      </a>
      <Button
        v-else-if="item.actionLabel"
        :label="item.actionLabel"
        size="sm"
        variant="secondary"
        @click="item.onAction?.()"
      />
      <button
        v-if="item.dismissible ?? true"
        type="button"
        class="md-app-banners__close"
        :aria-label="item.closeLabel ?? 'Cerrar'"
        @click="handleDismiss(item.id)"
      >
        ×
      </button>
    </div>
  </div>
</template>

<style scoped>
.md-app-banners__row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--md-border-default);
}
.md-app-banners__icon {
  font-size: 18px;
  line-height: 1;
  flex-shrink: 0;
}
.md-app-banners__message {
  flex: 1;
  margin: 0;
  font-size: var(--md-text-body-sm);
  line-height: var(--md-text-body-sm-lh);
  color: var(--md-text-primary);
}
.md-app-banners__action {
  font-weight: 600;
  text-decoration: underline;
  white-space: nowrap;
  flex-shrink: 0;
}
.md-app-banners__close {
  background: transparent;
  border: none;
  color: var(--md-text-secondary);
  font: inherit;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  padding: 4px;
  flex-shrink: 0;
}
</style>
