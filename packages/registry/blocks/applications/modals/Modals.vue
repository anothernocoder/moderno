<script setup lang="ts">
// Moderno block — Modals (Vue). Copy-paste; edit freely.
// Application settings panel: a list of common account actions, each opening a centered
// Dialog primitive — an informational confirmation, an export notice and a destructive
// "delete account" warning. Uses the Badge + Dialog primitives + Moderno tokens.
import { Badge, Dialog } from '@moderno/vue'

interface ModalAction {
  id: string
  label: string
  description: string
  tone?: 'default' | 'danger'
  triggerLabel: string
  dialogTitle: string
  dialogDescription: string
  closeLabel?: string
}

withDefaults(
  defineProps<{
    title?: string
    description?: string
    actions?: ModalAction[]
  }>(),
  {
    title: 'Gestión de cuenta',
    description: 'Acciones comunes de administración, cada una respaldada por un diálogo modal accesible.',
    actions: () => [
      {
        id: 'edit-profile',
        label: 'Editar perfil',
        description: 'Actualiza tu nombre, correo y datos de contacto.',
        triggerLabel: 'Editar perfil',
        dialogTitle: 'Editar perfil',
        dialogDescription:
          'Actualiza tu nombre, correo y datos de contacto desde el formulario de configuración. Los cambios se guardan automáticamente.',
        closeLabel: 'Listo',
      },
      {
        id: 'export-data',
        label: 'Exportar datos',
        description: 'Descarga una copia de tu información en formato CSV.',
        triggerLabel: 'Exportar datos',
        dialogTitle: 'Exportar datos',
        dialogDescription: 'Generaremos un archivo CSV con tu información y te avisaremos por correo cuando esté listo.',
        closeLabel: 'Entendido',
      },
      {
        id: 'delete-account',
        label: 'Eliminar cuenta',
        description: 'Esta acción es permanente y no se puede deshacer.',
        tone: 'danger',
        triggerLabel: 'Eliminar cuenta',
        dialogTitle: '¿Eliminar tu cuenta?',
        dialogDescription:
          'Se eliminarán todos tus datos, pedidos e historial de forma permanente. Esta acción no se puede deshacer.',
        closeLabel: 'Cancelar',
      },
    ],
  },
)
</script>

<template>
  <section class="md-modals">
    <div class="md-modals__header">
      <h2 class="md-modals__title">{{ title }}</h2>
      <p v-if="description" class="md-modals__description">{{ description }}</p>
    </div>
    <div
      v-for="(action, index) in actions"
      :key="action.id"
      class="md-modals__row"
      :class="{ 'md-modals__row--last': index === actions.length - 1 }"
    >
      <div class="md-modals__row-label-wrap">
        <div class="md-modals__row-label-row">
          <p class="md-modals__row-label" :class="{ 'md-modals__row-label--danger': action.tone === 'danger' }">
            {{ action.label }}
          </p>
          <Badge v-if="action.tone === 'danger'" variant="error" dot>Irreversible</Badge>
        </div>
        <p class="md-modals__row-description">{{ action.description }}</p>
      </div>
      <Dialog
        :trigger-label="action.triggerLabel"
        :title="action.dialogTitle"
        :description="action.dialogDescription"
        :close-label="action.closeLabel"
      />
    </div>
  </section>
</template>

<style scoped>
.md-modals {
  background: var(--md-surface-base);
  border: 1px solid var(--md-border-default);
}
.md-modals__header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--md-border-default);
}
.md-modals__title {
  font-family: var(--md-font-serif);
  font-size: 20px;
  color: var(--md-text-primary);
  margin: 0 0 4px;
}
.md-modals__description {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-modals__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--md-border-default);
}
.md-modals__row--last {
  border-bottom: none;
}
.md-modals__row-label-wrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.md-modals__row-label-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.md-modals__row-label {
  font-size: var(--md-text-body-md);
  font-weight: 500;
  color: var(--md-text-primary);
  margin: 0;
}
.md-modals__row-label--danger {
  color: var(--md-error);
}
.md-modals__row-description {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 0;
}
</style>
