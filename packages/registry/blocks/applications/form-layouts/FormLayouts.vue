<script setup lang="ts">
// Moderno block — FormLayouts (Vue). Copy-paste; edit freely.
// Settings/profile-edit form page layout: grouped fieldsets with headings, a responsive
// multi-column field grid, section dividers, and a footer action row. Uses the Input +
// Textarea + Select + Divider + Button primitives + Moderno tokens.
import { reactive } from 'vue'
import { Button, Divider, Input, Select, Textarea } from '@moderno/vue'
import type { SelectItem } from '@moderno/vue'

export interface FormLayoutsValues {
  firstName: string
  lastName: string
  email: string
  bio: string
  role: string
  timezone: string
}

const props = defineProps<{ defaultValues?: Partial<FormLayoutsValues> }>()
const emit = defineEmits<{ save: [values: FormLayoutsValues]; cancel: [] }>()

const DEFAULT_VALUES: FormLayoutsValues = {
  firstName: 'Camila',
  lastName: 'Restrepo',
  email: 'camila@acme.com',
  bio: '',
  role: 'editor',
  timezone: 'america-bogota',
}

const roleOptions: SelectItem[] = [
  { label: 'Administrador', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Solo lectura', value: 'viewer' },
]

const timezoneOptions: SelectItem[] = [
  { label: 'Bogotá (UTC-5)', value: 'america-bogota' },
  { label: 'Ciudad de México (UTC-6)', value: 'america-mexico-city' },
  { label: 'Madrid (UTC+1)', value: 'europe-madrid' },
]

const values = reactive<FormLayoutsValues>({ ...DEFAULT_VALUES, ...props.defaultValues })

function handleRoleChange(value: string[]) {
  values.role = value[0] ?? values.role
}

function handleTimezoneChange(value: string[]) {
  values.timezone = value[0] ?? values.timezone
}

function handleSubmit() {
  emit('save', { ...values })
}
</script>

<template>
  <div class="md-form-layouts">
    <form @submit.prevent="handleSubmit">
      <section class="md-form-layouts__section">
        <div class="md-form-layouts__header">
          <h2 class="md-form-layouts__title">Perfil</h2>
          <p class="md-form-layouts__description">Información básica de tu cuenta, visible para tu equipo.</p>
        </div>
        <div class="md-form-layouts__grid">
          <Input v-model="values.firstName" label="Nombre" name="firstName" required />
          <Input v-model="values.lastName" label="Apellido" name="lastName" required />
          <div class="md-form-layouts__full">
            <Input v-model="values.email" label="Correo electrónico" name="email" type="email" required />
          </div>
          <div class="md-form-layouts__full">
            <Textarea
              v-model="values.bio"
              label="Biografía"
              name="bio"
              hint="Breve descripción para tu perfil público."
              rows="3"
            />
          </div>
        </div>
      </section>

      <Divider />

      <section class="md-form-layouts__section">
        <div class="md-form-layouts__header">
          <h2 class="md-form-layouts__title">Preferencias</h2>
          <p class="md-form-layouts__description">Cómo interactúas por defecto con el workspace.</p>
        </div>
        <div class="md-form-layouts__grid">
          <Select.Root :items="roleOptions" :default-value="[values.role]" @update:model-value="handleRoleChange">
            <Select.Label>Rol</Select.Label>
            <Select.Trigger placeholder="Elige un rol" />
            <Select.Content>
              <Select.Item v-for="item in roleOptions" :key="item.value" :item="item" />
            </Select.Content>
          </Select.Root>
          <Select.Root
            :items="timezoneOptions"
            :default-value="[values.timezone]"
            @update:model-value="handleTimezoneChange"
          >
            <Select.Label>Zona horaria</Select.Label>
            <Select.Trigger placeholder="Elige una zona horaria" />
            <Select.Content>
              <Select.Item v-for="item in timezoneOptions" :key="item.value" :item="item" />
            </Select.Content>
          </Select.Root>
        </div>
      </section>

      <Divider />

      <div class="md-form-layouts__footer">
        <Button type="button" variant="secondary" label="Cancelar" @click="emit('cancel')" />
        <Button type="submit" variant="primary" label="Guardar cambios" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.md-form-layouts {
  background: var(--md-surface-base);
  border: 1px solid var(--md-border-default);
  max-width: 640px;
}
.md-form-layouts__section {
  padding: 24px;
}
.md-form-layouts__header {
  margin: 0 0 20px;
}
.md-form-layouts__title {
  font-size: var(--md-text-headline-md);
  font-weight: 600;
  color: var(--md-text-primary);
  margin: 0 0 4px;
}
.md-form-layouts__description {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-form-layouts__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
.md-form-layouts__full {
  grid-column: 1 / -1;
}
.md-form-layouts__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
}
</style>
