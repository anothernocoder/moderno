<script setup lang="ts">
// Moderno block — ContactModal (Vue). Copy-paste; edit freely.
// Modal-based contact/lead capture: a centered header above a compact single-column
// name/email/message form, plus a secondary "prefer to email or call?" trigger that opens the
// Dialog primitive with your direct contact info. Uses the Input + Textarea + Button + Dialog
// primitives + Moderno tokens.
import { reactive } from 'vue'
import { Button, Dialog, Input, Textarea } from '@moderno/vue'

export interface ContactModalFormValues {
  name: string
  email: string
  message: string
}

const props = withDefaults(
  defineProps<{
    kicker?: string
    title?: string
    subtitle?: string
    nameLabel?: string
    emailLabel?: string
    messageLabel?: string
    submitLabel?: string
    dialogTriggerLabel?: string
    dialogTitle?: string
    dialogDescription?: string
    dialogCloseLabel?: string
    defaultValues?: Partial<ContactModalFormValues>
  }>(),
  {
    kicker: 'Contacto',
    title: '¿Hablamos?',
    subtitle: 'Cuéntanos en qué podemos ayudarte y te respondemos en menos de 24 horas.',
    nameLabel: 'Nombre',
    emailLabel: 'Correo',
    messageLabel: 'Mensaje',
    submitLabel: 'Enviar mensaje',
    dialogTriggerLabel: '¿Prefieres escribirnos directo?',
    dialogTitle: 'Contáctanos directamente',
    dialogDescription: 'Escríbenos a hola@acme.com o llámanos al +57 300 123 4567.',
    dialogCloseLabel: 'Cerrar',
  },
)

const emit = defineEmits<{ submit: [values: ContactModalFormValues] }>()

const values = reactive<ContactModalFormValues>({
  name: '',
  email: '',
  message: '',
  ...props.defaultValues,
})

function handleSubmit() {
  emit('submit', { ...values })
}
</script>

<template>
  <section class="md-contact-modal">
    <div class="md-contact-modal__header">
      <p v-if="kicker" class="md-contact-modal__kicker">{{ kicker }}</p>
      <h2 class="md-contact-modal__title">{{ title }}</h2>
      <p v-if="subtitle" class="md-contact-modal__subtitle">{{ subtitle }}</p>
    </div>
    <div class="md-contact-modal__form-wrap">
      <form class="md-contact-modal__form" @submit.prevent="handleSubmit">
        <Input v-model="values.name" :label="nameLabel" name="name" required />
        <Input v-model="values.email" :label="emailLabel" name="email" type="email" required />
        <Textarea v-model="values.message" :label="messageLabel" name="message" rows="4" required />
        <Button type="submit" variant="primary" size="lg" :label="submitLabel" />
      </form>
      <div class="md-contact-modal__dialog-row">
        <Dialog
          :trigger-label="dialogTriggerLabel"
          :title="dialogTitle"
          :description="dialogDescription"
          :close-label="dialogCloseLabel"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.md-contact-modal {
  padding: 96px 24px;
  background: var(--md-surface-base);
}
.md-contact-modal__header {
  text-align: center;
  margin: 0 auto 40px;
  max-width: 480px;
}
.md-contact-modal__kicker {
  font-size: var(--md-text-label-sm);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--md-text-secondary);
  margin: 0 0 16px;
}
.md-contact-modal__title {
  font-family: var(--md-font-serif);
  font-size: 32px;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--md-text-primary);
  margin: 0 0 16px;
}
.md-contact-modal__subtitle {
  font-size: var(--md-text-body-lg);
  line-height: var(--md-text-body-lg-lh);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-contact-modal__form-wrap {
  max-width: 480px;
  margin: 0 auto;
}
.md-contact-modal__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.md-contact-modal__dialog-row {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--md-border-default);
  text-align: center;
}
</style>
