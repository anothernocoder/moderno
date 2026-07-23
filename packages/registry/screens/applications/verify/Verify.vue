<script setup lang="ts">
// Moderno screen — Verify (Vue). Copy-paste; edit freely.
// Presentational single-screen auth verify / OTP (ADR-0005): a typed wiring
// contract (values/onChange/onSubmit) with no internal state and no router — the
// consumer owns state and navigation. Composes the Input and Button primitives +
// Moderno tokens.
import { computed } from 'vue'
import { Button, Input } from '@moderno/vue'

export interface VerifyValues {
  code: string
}

const props = withDefaults(
  defineProps<{
    values: VerifyValues
    error?: string
    submitting?: boolean
    /** Display-only: the address the code was sent to. Carried forward by the consumer. */
    email?: string
    title?: string
    description?: string
  }>(),
  {
    title: 'Verifica tu correo',
  },
)
const emit = defineEmits<{
  change: [values: VerifyValues]
  submit: [values: VerifyValues]
  resend: []
  back: []
}>()

const resolvedDescription = computed(
  () =>
    props.description ??
    (props.email
      ? `Ingresa el código de 6 dígitos que enviamos a ${props.email}.`
      : 'Ingresa el código de 6 dígitos que te enviamos.'),
)

function set<K extends keyof VerifyValues>(key: K, value: VerifyValues[K]) {
  emit('change', { ...props.values, [key]: value })
}

function handleSubmit() {
  emit('submit', props.values)
}
</script>

<template>
  <div class="md-verify">
    <div class="md-verify__card">
      <div class="md-verify__header">
        <h1 class="md-verify__title">{{ title }}</h1>
        <p class="md-verify__description">{{ resolvedDescription }}</p>
      </div>

      <p v-if="error" class="md-verify__error">{{ error }}</p>

      <form class="md-verify__form" @submit.prevent="handleSubmit">
        <Input
          label="Código de verificación"
          name="code"
          type="text"
          inputmode="numeric"
          autocomplete="one-time-code"
          :model-value="values.code"
          @update:model-value="(v) => set('code', v ?? '')"
          required
        />
        <div class="md-verify__row">
          <button type="button" class="md-verify__link" @click="emit('resend')">Reenviar código</button>
        </div>
        <Button type="submit" variant="primary" class="md-verify__submit" :disabled="submitting">
          {{ submitting ? 'Verificando…' : 'Verificar' }}
        </Button>
      </form>

      <p class="md-verify__footer">
        <button type="button" class="md-verify__link" @click="emit('back')">Volver</button>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Fills its container's height rather than assuming the viewport (matches the
   ApplicationShells block's convention) — give it a full-height container
   (e.g. `#root { height: 100vh }`) in your own app if you want it to fill the page. */
.md-verify {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--md-surface-base);
}
.md-verify__card {
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--md-border-default);
  padding: 32px;
}
.md-verify__header {
  margin: 0 0 24px;
}
.md-verify__title {
  font-family: var(--md-font-serif);
  font-size: var(--md-text-headline-lg);
  color: var(--md-text-primary);
  margin: 0 0 8px;
}
.md-verify__description {
  font-size: var(--md-text-body-sm);
  line-height: var(--md-text-body-sm-lh);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-verify__error {
  font-size: var(--md-text-body-sm);
  color: var(--md-error);
  margin: 0 0 16px;
}
.md-verify__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.md-verify__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 12px;
}
.md-verify__link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-size: var(--md-text-body-sm);
  color: var(--md-text-primary);
  text-decoration: underline;
  cursor: pointer;
}
.md-verify__submit {
  width: 100%;
}
.md-verify__footer {
  margin-top: 24px;
  text-align: center;
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
}
</style>
