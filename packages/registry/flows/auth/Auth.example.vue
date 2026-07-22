<script setup lang="ts">
// Moderno flow example — Auth (Vue). Copy-paste; edit freely.
// Thin assembly (ADR-0005): stitches the SignIn screen using Vue's own
// reactive() for values/step, with no router dependency. A runnable demo and a
// copy-paste starting point — not the product.
import { reactive, ref } from 'vue'
import SignIn, { type SignInValues } from '../../screens/applications/sign-in/SignIn.vue'

// Single step for now (ADR-0005's Auth tracer ships sign-in only). A richer Auth
// flow would grow this union ('sign-in' | 'sign-up' | 'forgot-password' | 'verify')
// and switch on `step` below — still with no router, just local state.
type Step = 'sign-in'

const step = ref<Step>('sign-in')
const values = reactive<SignInValues>({ email: '', password: '', remember: false })
const error = ref<string>()
const submitting = ref(false)

function handleChange(next: SignInValues) {
  Object.assign(values, next)
}

function handleSubmit(next: SignInValues) {
  if (!next.email || !next.password) {
    error.value = 'Ingresa tu correo y contraseña.'
    return
  }
  error.value = undefined
  submitting.value = true
  // Replace with your real sign-in request.
  window.setTimeout(() => {
    submitting.value = false
    console.log('Signed in as', next.email)
  }, 600)
}
</script>

<template>
  <SignIn
    v-if="step === 'sign-in'"
    :values="values"
    :error="error"
    :submitting="submitting"
    @change="handleChange"
    @submit="handleSubmit"
    @forgot-password="() => console.log('Forgot password')"
    @sign-up="() => console.log('Go to sign up')"
  />
</template>
