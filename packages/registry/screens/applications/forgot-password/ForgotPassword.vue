<script setup lang="ts">
// Moderno screen — ForgotPassword (Vue). Copy-paste; edit freely.
// Presentational single-screen auth forgot-password (ADR-0005): a typed wiring
// contract (values/onChange/onSubmit) with no internal state and no router — the
// consumer owns state and navigation. Composes the Input and Button primitives +
// Moderno tokens.
import { Button, Input } from '@moderno/vue'

export interface ForgotPasswordValues {
  email: string
}

const props = withDefaults(
  defineProps<{
    values: ForgotPasswordValues
    error?: string
    submitting?: boolean
    /** Set once the reset email has been sent — swaps the form for a confirmation message. */
    sent?: boolean
    title?: string
    description?: string
  }>(),
  {
    title: 'Recupera tu contraseña',
    description: 'Ingresa tu correo y te enviaremos un enlace para restablecerla.',
  },
)
const emit = defineEmits<{
  change: [values: ForgotPasswordValues]
  submit: [values: ForgotPasswordValues]
  back: []
}>()

function set<K extends keyof ForgotPasswordValues>(key: K, value: ForgotPasswordValues[K]) {
  emit('change', { ...props.values, [key]: value })
}

function handleSubmit() {
  emit('submit', props.values)
}
</script>

<template>
  <div class="md-forgot-password">
    <div class="md-forgot-password__card">
      <div class="md-forgot-password__header">
        <h1 class="md-forgot-password__title">{{ title }}</h1>
        <p class="md-forgot-password__description">{{ description }}</p>
      </div>

      <p v-if="error" class="md-forgot-password__error">{{ error }}</p>

      <template v-if="sent">
        <p class="md-forgot-password__confirmation">
          Si existe una cuenta con el correo <strong>{{ values.email }}</strong
          >, te enviamos un enlace para restablecer tu contraseña.
        </p>
        <Button type="button" variant="secondary" class="md-forgot-password__submit" @click="emit('back')">
          Volver a iniciar sesión
        </Button>
      </template>
      <template v-else>
        <form class="md-forgot-password__form" @submit.prevent="handleSubmit">
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            autocomplete="email"
            :model-value="values.email"
            @update:model-value="(v) => set('email', v ?? '')"
            required
          />
          <Button type="submit" variant="primary" class="md-forgot-password__submit" :disabled="submitting">
            {{ submitting ? 'Enviando…' : 'Enviar enlace' }}
          </Button>
        </form>

        <p class="md-forgot-password__footer">
          <button type="button" class="md-forgot-password__link" @click="emit('back')">
            Volver a iniciar sesión
          </button>
        </p>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* Fills its container's height rather than assuming the viewport (matches the
   ApplicationShells block's convention) — give it a full-height container
   (e.g. `#root { height: 100vh }`) in your own app if you want it to fill the page. */
.md-forgot-password {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--md-surface-base);
}
.md-forgot-password__card {
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--md-border-default);
  padding: 32px;
}
.md-forgot-password__header {
  margin: 0 0 24px;
}
.md-forgot-password__title {
  font-family: var(--md-font-serif);
  font-size: var(--md-text-headline-lg);
  color: var(--md-text-primary);
  margin: 0 0 8px;
}
.md-forgot-password__description {
  font-size: var(--md-text-body-sm);
  line-height: var(--md-text-body-sm-lh);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-forgot-password__error {
  font-size: var(--md-text-body-sm);
  color: var(--md-error);
  margin: 0 0 16px;
}
.md-forgot-password__confirmation {
  font-size: var(--md-text-body-sm);
  line-height: var(--md-text-body-sm-lh);
  color: var(--md-text-secondary);
  margin: 0 0 24px;
}
.md-forgot-password__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.md-forgot-password__link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-size: var(--md-text-body-sm);
  color: var(--md-text-primary);
  text-decoration: underline;
  cursor: pointer;
}
.md-forgot-password__submit {
  width: 100%;
}
.md-forgot-password__footer {
  margin-top: 24px;
  text-align: center;
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
}
</style>
