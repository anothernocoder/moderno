<script setup lang="ts">
// Moderno block — Contact (Vue). Copy-paste; edit freely.
// Contact section: intro copy + contact info list on the left, a name/email/subject/message
// form on the right. Uses the Input + Textarea + Button primitives + Moderno tokens.
import { reactive } from 'vue'
import { Button, Input, Textarea } from '@moderno/vue'

export interface ContactInfoItem {
  label: string
  value: string
  href?: string
}

export interface ContactFormValues {
  name: string
  email: string
  subject: string
  message: string
}

const DEFAULT_CONTACT_INFO: ContactInfoItem[] = [
  { label: 'Email', value: 'hola@acme.com', href: 'mailto:hola@acme.com' },
  { label: 'Teléfono', value: '+57 300 123 4567', href: 'tel:+573001234567' },
  { label: 'Oficina', value: 'Bogotá, Colombia' },
]

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    description?: string
    contactInfo?: ContactInfoItem[]
    nameLabel?: string
    emailLabel?: string
    subjectLabel?: string
    messageLabel?: string
    submitLabel?: string
    defaultValues?: Partial<ContactFormValues>
  }>(),
  {
    eyebrow: 'Contacto',
    title: '¿Hablamos?',
    description: 'Escríbenos y te respondemos en menos de 24 horas.',
    nameLabel: 'Nombre',
    emailLabel: 'Correo',
    subjectLabel: 'Asunto',
    messageLabel: 'Mensaje',
    submitLabel: 'Enviar mensaje',
  },
)

const emit = defineEmits<{ submit: [values: ContactFormValues] }>()

const contactInfo = props.contactInfo ?? DEFAULT_CONTACT_INFO

const values = reactive<ContactFormValues>({
  name: '',
  email: '',
  subject: '',
  message: '',
  ...props.defaultValues,
})

function handleSubmit() {
  emit('submit', { ...values })
}
</script>

<template>
  <div class="md-contact">
    <div class="md-contact__info">
      <p v-if="eyebrow" class="md-contact__eyebrow">{{ eyebrow }}</p>
      <h2 class="md-contact__title">{{ title }}</h2>
      <p v-if="description" class="md-contact__description">{{ description }}</p>
      <ul class="md-contact__info-list">
        <li v-for="item in contactInfo" :key="item.label">
          <p class="md-contact__info-label">{{ item.label }}</p>
          <a v-if="item.href" :href="item.href" class="md-contact__info-value">{{ item.value }}</a>
          <span v-else class="md-contact__info-value">{{ item.value }}</span>
        </li>
      </ul>
    </div>
    <form class="md-contact__form" @submit.prevent="handleSubmit">
      <div class="md-contact__row">
        <div class="md-contact__field">
          <Input v-model="values.name" :label="nameLabel" name="name" required />
        </div>
        <div class="md-contact__field">
          <Input v-model="values.email" :label="emailLabel" name="email" type="email" required />
        </div>
      </div>
      <Input v-model="values.subject" :label="subjectLabel" name="subject" />
      <Textarea v-model="values.message" :label="messageLabel" name="message" rows="5" required />
      <Button type="submit" variant="primary" size="lg" :label="submitLabel" />
    </form>
  </div>
</template>

<style scoped>
.md-contact {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 48px;
  max-width: 1040px;
  margin: 0 auto;
  padding: 64px 24px;
  background: var(--md-surface-base);
}
.md-contact__info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.md-contact__eyebrow {
  font-size: var(--md-text-label-sm);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--md-primary);
  margin: 0;
}
.md-contact__title {
  font-family: var(--md-font-serif);
  font-size: 32px;
  line-height: 1.15;
  color: var(--md-text-primary);
  margin: 0;
}
.md-contact__description {
  font-size: var(--md-text-body-md);
  line-height: var(--md-text-body-md-lh);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-contact__info-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0;
  padding: 0;
}
.md-contact__info-label {
  font-size: var(--md-text-label-sm);
  color: var(--md-text-secondary);
  margin: 0 0 4px;
}
.md-contact__info-value {
  font-size: var(--md-text-body-md);
  color: var(--md-text-primary);
  text-decoration: none;
}
.md-contact__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.md-contact__row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.md-contact__field {
  flex: 1 1 200px;
}
</style>
