<script setup lang="ts">
// Moderno block — SlideOvers (Vue). Copy-paste; edit freely.
// Side drawer for a view/edit record flow: a trigger button opens a Sheet sliding in from
// the right with a title, a compact name/email/role form, and a footer with Cancel/Save
// actions. Uses the Sheet + Input + Button + Divider primitives + Moderno tokens — the
// panel's open/close state is the Sheet primitive's own controlled API, no bespoke overlay
// or focus-trap logic here.
import { reactive, ref } from 'vue'
import { Button, Divider, Input, Sheet } from '@moderno/vue'

export interface SlideOversFormValues {
  name: string
  email: string
  role: string
}

const DEFAULT_VALUES: SlideOversFormValues = {
  name: 'Bruno Restrepo',
  email: 'bruno@brunocafe.co',
  role: 'Administrador',
}

const props = withDefaults(
  defineProps<{
    triggerLabel?: string
    title?: string
    nameLabel?: string
    emailLabel?: string
    roleLabel?: string
    cancelLabel?: string
    saveLabel?: string
    closeLabel?: string
    defaultValues?: Partial<SlideOversFormValues>
  }>(),
  {
    triggerLabel: 'Editar contacto',
    title: 'Editar contacto',
    nameLabel: 'Nombre',
    emailLabel: 'Correo',
    roleLabel: 'Rol',
    cancelLabel: 'Cancelar',
    saveLabel: 'Guardar cambios',
    closeLabel: 'Cerrar',
  },
)
const emit = defineEmits<{ save: [values: SlideOversFormValues]; cancel: [] }>()

const initialValues: SlideOversFormValues = { ...DEFAULT_VALUES, ...props.defaultValues }
const open = ref(false)
const values = reactive<SlideOversFormValues>({ ...initialValues })

function handleCancel() {
  Object.assign(values, initialValues)
  emit('cancel')
  open.value = false
}

function handleSave() {
  emit('save', { ...values })
  open.value = false
}
</script>

<template>
  <Sheet.Root v-model="open">
    <Sheet.Trigger>{{ triggerLabel }}</Sheet.Trigger>
    <Sheet.Content side="right">
      <Sheet.Title>{{ title }}</Sheet.Title>
      <Sheet.Close :close-label="closeLabel" />
      <Divider />
      <div class="md-slide-overs__body">
        <Input v-model="values.name" :label="nameLabel" />
        <Input v-model="values.email" :label="emailLabel" type="email" />
        <Input v-model="values.role" :label="roleLabel" />
      </div>
      <div class="md-slide-overs__footer">
        <Button variant="secondary" @click="handleCancel">{{ cancelLabel }}</Button>
        <Button variant="primary" @click="handleSave">{{ saveLabel }}</Button>
      </div>
    </Sheet.Content>
  </Sheet.Root>
</template>

<style scoped>
.md-slide-overs__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}
.md-slide-overs__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: var(--md-spacing-4);
  border-top: 1px solid var(--md-border-default);
}
</style>
