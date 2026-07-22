<script setup lang="ts">
// Moderno screen — SignIn (Vue). Copy-paste; edit freely.
// Presentational single-screen auth sign-in (ADR-0005): a typed wiring contract
// (values/onChange/onSubmit) with no internal state and no router — the consumer
// owns state and navigation. Composes the Input, Checkbox, Divider and Button
// primitives + Moderno tokens.
import { Button, Checkbox, Divider, Input } from '@moderno/vue'

export interface SignInValues {
  email: string
  password: string
  remember: boolean
}

const props = withDefaults(
  defineProps<{
    values: SignInValues
    error?: string
    submitting?: boolean
    title?: string
    description?: string
  }>(),
  {
    title: 'Inicia sesión',
    description: 'Ingresa tus credenciales para acceder a tu cuenta.',
  },
)
const emit = defineEmits<{
  change: [values: SignInValues]
  submit: [values: SignInValues]
  forgotPassword: []
  signUp: []
}>()

function set<K extends keyof SignInValues>(key: K, value: SignInValues[K]) {
  emit('change', { ...props.values, [key]: value })
}

function handleSubmit() {
  emit('submit', props.values)
}
</script>

<template>
  <div class="md-sign-in">
    <div class="md-sign-in__card">
      <div class="md-sign-in__header">
        <h1 class="md-sign-in__title">{{ title }}</h1>
        <p class="md-sign-in__description">{{ description }}</p>
      </div>

      <p v-if="error" class="md-sign-in__error">{{ error }}</p>

      <form class="md-sign-in__form" @submit.prevent="handleSubmit">
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
          autocomplete="current-password"
          :model-value="values.password"
          @update:model-value="(v) => set('password', v ?? '')"
          required
        />
        <div class="md-sign-in__row">
          <Checkbox
            label="Recordarme"
            :model-value="values.remember"
            @update:model-value="(v) => set('remember', v === true)"
          />
          <button type="button" class="md-sign-in__link" @click="emit('forgotPassword')">
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        <Button type="submit" variant="primary" class="md-sign-in__submit" :disabled="submitting">
          {{ submitting ? 'Ingresando…' : 'Iniciar sesión' }}
        </Button>
      </form>

      <Divider />

      <p class="md-sign-in__footer">
        ¿No tienes una cuenta?
        <button type="button" class="md-sign-in__link" @click="emit('signUp')">Regístrate</button>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Fills its container's height rather than assuming the viewport (matches the
   ApplicationShells block's convention) — give it a full-height container
   (e.g. `#root { height: 100vh }`) in your own app if you want it to fill the page. */
.md-sign-in {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--md-surface-base);
}
.md-sign-in__card {
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--md-border-default);
  padding: 32px;
}
.md-sign-in__header {
  margin: 0 0 24px;
}
.md-sign-in__title {
  font-family: var(--md-font-serif);
  font-size: var(--md-text-headline-lg);
  color: var(--md-text-primary);
  margin: 0 0 8px;
}
.md-sign-in__description {
  font-size: var(--md-text-body-sm);
  line-height: var(--md-text-body-sm-lh);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-sign-in__error {
  font-size: var(--md-text-body-sm);
  color: var(--md-error);
  margin: 0 0 16px;
}
.md-sign-in__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.md-sign-in__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 12px;
}
.md-sign-in__link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-size: var(--md-text-body-sm);
  color: var(--md-text-primary);
  text-decoration: underline;
  cursor: pointer;
}
.md-sign-in__submit {
  width: 100%;
}
.md-sign-in__footer {
  margin-top: 24px;
  text-align: center;
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
}
</style>
