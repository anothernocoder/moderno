<script setup lang="ts">
// Moderno screen — ProfileSetup (Vue). Copy-paste; edit freely.
// Profile step of the Onboarding flow (ADR-0005): composes the Applications
// FormLayouts block instead of re-implementing its grouped-section form
// markup. The screen's own header/back-link chrome wraps the block without
// touching its internal fields; FormLayouts' own footer ("Cancelar" /
// "Guardar cambios") is the screen's only action — `next` forwards its
// `save` emit, `back` its `cancel` emit.
import FormLayouts from '../../../blocks/applications/form-layouts/FormLayouts.vue'
import type { FormLayoutsValues } from '../../../blocks/applications/form-layouts/FormLayouts.vue'

export type { FormLayoutsValues }

withDefaults(
  defineProps<{
    values?: Partial<FormLayoutsValues>
    title?: string
    description?: string
    backLabel?: string
  }>(),
  {
    title: 'Cuéntanos sobre ti',
    description: 'Esta información aparece en tu perfil y es visible para tu equipo.',
    backLabel: 'Volver',
  },
)
const emit = defineEmits<{ next: [values: FormLayoutsValues]; back: [] }>()
</script>

<template>
  <div class="md-profile-setup">
    <div class="md-profile-setup__header">
      <div>
        <h1 class="md-profile-setup__title">{{ title }}</h1>
        <p class="md-profile-setup__description">{{ description }}</p>
      </div>
      <button type="button" class="md-profile-setup__link" @click="emit('back')">{{ backLabel }}</button>
    </div>
    <div class="md-profile-setup__form">
      <FormLayouts :default-values="values" @save="emit('next', $event)" @cancel="emit('back')" />
    </div>
  </div>
</template>

<style scoped>
.md-profile-setup {
  min-height: 100%;
  background: var(--md-surface-base);
  padding: 24px;
}
.md-profile-setup__header {
  max-width: 640px;
  margin: 0 auto 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 12px;
}
.md-profile-setup__title {
  font-family: var(--md-font-serif);
  font-size: var(--md-text-headline-lg);
  color: var(--md-text-primary);
  margin: 0 0 4px;
}
.md-profile-setup__description {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-profile-setup__link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-size: var(--md-text-body-sm);
  color: var(--md-text-primary);
  text-decoration: underline;
  cursor: pointer;
}
.md-profile-setup__form {
  max-width: 640px;
  margin: 0 auto;
}
</style>
