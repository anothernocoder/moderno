<script setup lang="ts">
// Moderno screen — SignUp (Vue). Copy-paste; edit freely.
// Presentational single-screen auth sign-up (ADR-0005): a typed wiring contract
// (values/onChange/onSubmit) with no internal state and no router — the consumer
// owns state and navigation. Composes the Input, Checkbox, Divider and Button
// primitives + Moderno tokens.
import { Button, Checkbox, Divider, Input } from '@moderno/vue'

export interface SignUpValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

const props = withDefaults(
  defineProps<{
    values: SignUpValues
    error?: string
    submitting?: boolean
    title?: string
    description?: string
  }>(),
  {
    title: 'Crea tu cuenta',
    description: 'Completa tus datos para empezar.',
  },
)
const emit = defineEmits<{
  change: [values: SignUpValues]
  submit: [values: SignUpValues]
  signIn: []
}>()

function set<K extends keyof SignUpValues>(key: K, value: SignUpValues[K]) {
  emit('change', { ...props.values, [key]: value })
}

function handleSubmit() {
  emit('submit', props.values)
}
</script>

<template>
  <div class="md-sign-up">
    <div class="md-sign-up__card">
      <div class="md-sign-up__header">
        <h1 class="md-sign-up__title">{{ title }}</h1>
        <p class="md-sign-up__description">{{ description }}</p>
      </div>

      <p v-if="error" class="md-sign-up__error">{{ error }}</p>

      <form class="md-sign-up__form" @submit.prevent="handleSubmit">
        <Input
          label="Nombre completo"
          name="name"
          type="text"
          autocomplete="name"
          :model-value="values.name"
          @update:model-value="(v) => set('name', v ?? '')"
          required
        />
        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          autocomplete="email"
          :model-value="values.email"
          @update:model-value="(v) => set('email', v ?? '')"
          required
        />
        <Input
          label="Contraseña"
          name="password"
          type="password"
          autocomplete="new-password"
          :model-value="values.password"
          @update:model-value="(v) => set('password', v ?? '')"
          required
        />
        <Input
          label="Confirma tu contraseña"
          name="confirmPassword"
          type="password"
          autocomplete="new-password"
          :model-value="values.confirmPassword"
          @update:model-value="(v) => set('confirmPassword', v ?? '')"
          required
        />
        <Checkbox
          label="Acepto los términos y condiciones"
          :model-value="values.acceptTerms"
          @update:model-value="(v) => set('acceptTerms', v === true)"
        />
        <Button type="submit" variant="primary" class="md-sign-up__submit" :disabled="submitting">
          {{ submitting ? 'Creando cuenta…' : 'Crear cuenta' }}
        </Button>
      </form>

      <Divider />

      <p class="md-sign-up__footer">
        ¿Ya tienes una cuenta?
        <button type="button" class="md-sign-up__link" @click="emit('signIn')">Inicia sesión</button>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Fills its container's height rather than assuming the viewport (matches the
   ApplicationShells block's convention) — give it a full-height container
   (e.g. `#root { height: 100vh }`) in your own app if you want it to fill the page. */
.md-sign-up {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--md-surface-base);
}
.md-sign-up__card {
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--md-border-default);
  padding: 32px;
}
.md-sign-up__header {
  margin: 0 0 24px;
}
.md-sign-up__title {
  font-family: var(--md-font-serif);
  font-size: var(--md-text-headline-lg);
  color: var(--md-text-primary);
  margin: 0 0 8px;
}
.md-sign-up__description {
  font-size: var(--md-text-body-sm);
  line-height: var(--md-text-body-sm-lh);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-sign-up__error {
  font-size: var(--md-text-body-sm);
  color: var(--md-error);
  margin: 0 0 16px;
}
.md-sign-up__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.md-sign-up__link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-size: var(--md-text-body-sm);
  color: var(--md-text-primary);
  text-decoration: underline;
  cursor: pointer;
}
.md-sign-up__submit {
  width: 100%;
}
.md-sign-up__footer {
  margin-top: 24px;
  text-align: center;
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
}
</style>
