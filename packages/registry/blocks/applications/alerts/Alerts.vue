<script setup lang="ts">
// Moderno block — Alerts (Vue). Copy-paste; edit freely.
// Inline info/success/warning/error message patterns composed into an application
// layout section (dashboard/form alerts area). Uses the Alert + Button primitives + Moderno tokens.
import { ref } from 'vue'
import { Alert, Button } from '@moderno/vue'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface AlertItem {
  id: string
  variant: AlertVariant
  title?: string
  description: string
  dismissible?: boolean
  actionLabel?: string
}

const defaultItems: AlertItem[] = [
  {
    id: 'maintenance',
    variant: 'info',
    title: 'Mantenimiento programado',
    description: 'El sistema no estará disponible el sábado de 2:00 a 4:00 a. m.',
    dismissible: true,
  },
  {
    id: 'saved',
    variant: 'success',
    title: 'Cambios guardados',
    description: 'La información de tu perfil se actualizó correctamente.',
    dismissible: true,
  },
  {
    id: 'card-expiring',
    variant: 'warning',
    title: 'Tu tarjeta vence pronto',
    description: 'Actualiza el método de pago para evitar interrupciones en tu suscripción.',
    actionLabel: 'Actualizar método de pago',
  },
  {
    id: 'payment-failed',
    variant: 'error',
    title: 'El pago no se pudo procesar',
    description: 'Verifica los datos de la tarjeta e inténtalo de nuevo.',
    actionLabel: 'Reintentar pago',
  },
]

const props = defineProps<{ items?: AlertItem[] }>()
const emit = defineEmits<{
  dismiss: [id: string]
  action: [id: string]
}>()

const dismissed = ref<Set<string>>(new Set())

function handleDismiss(id: string) {
  dismissed.value = new Set(dismissed.value).add(id)
  emit('dismiss', id)
}
</script>

<template>
  <section class="md-alerts">
    <div v-for="item in (props.items ?? defaultItems).filter((i) => !dismissed.has(i.id))" :key="item.id" class="md-alerts__item">
      <Alert :variant="item.variant" :title="item.title">
        {{ item.description }}
        <Button
          v-if="item.actionLabel"
          variant="secondary"
          size="sm"
          style="margin-left: 12px"
          @click="emit('action', item.id)"
        >
          {{ item.actionLabel }}
        </Button>
      </Alert>
      <button
        v-if="item.dismissible"
        type="button"
        aria-label="Cerrar"
        class="md-alerts__dismiss"
        @click="handleDismiss(item.id)"
      >
        ×
      </button>
    </div>
  </section>
</template>

<style scoped>
.md-alerts {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: var(--md-surface-base);
}
.md-alerts__item {
  position: relative;
}
.md-alerts__dismiss {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  color: inherit;
  font: inherit;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  padding: 4px;
}
</style>
