<script setup lang="ts">
// Moderno flow example — Auth (Vue). Copy-paste; edit freely.
// Thin assembly (ADR-0005): stitches the SignIn, SignUp, ForgotPassword,
// ResetPassword and Verify screens using Vue's own reactive()/ref() for
// values/step, with no router dependency. A runnable demo and a copy-paste
// starting point — not the product.
import { reactive, ref } from 'vue'
import SignIn, { type SignInValues } from '../../screens/applications/sign-in/SignIn.vue'
import SignUp, { type SignUpValues } from '../../screens/applications/sign-up/SignUp.vue'
import ForgotPassword, { type ForgotPasswordValues } from '../../screens/applications/forgot-password/ForgotPassword.vue'
import ResetPassword, { type ResetPasswordValues } from '../../screens/applications/reset-password/ResetPassword.vue'
import Verify, { type VerifyValues } from '../../screens/applications/verify/Verify.vue'

type Step = 'sign-in' | 'sign-up' | 'forgot-password' | 'reset-password' | 'verify'
// Where `verify` was entered from — decides both what happens after a
// successful code and where `onBack` returns to.
type VerifyPurpose = 'sign-up' | 'reset'

const props = withDefaults(
  defineProps<{
    /** Which screen to mount first — lets the docs demo jump straight to a given
     * screen via a plain string prop (the Astro-island boundary serializes to
     * JSON, so this stays a string rather than richer state). */
    initialStep?: Step
  }>(),
  { initialStep: 'sign-in' },
)

const step = ref<Step>(props.initialStep)
const verifyPurpose = ref<VerifyPurpose>('sign-up')
// The email a code was sent to — captured from sign-up or forgot-password and
// carried forward into the verify screen (display-only there).
const flowEmail = ref('')

const signInValues = reactive<SignInValues>({ email: '', password: '', remember: false })
const signUpValues = reactive<SignUpValues>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
})
const forgotPasswordValues = reactive<ForgotPasswordValues>({ email: '' })
const resetPasswordValues = reactive<ResetPasswordValues>({ password: '', confirmPassword: '' })
const verifyValues = reactive<VerifyValues>({ code: '' })

const error = ref<string>()
const submitting = ref(false)

function resetVerifyValues() {
  verifyValues.code = ''
}

function handleSignIn(next: SignInValues) {
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

function handleSignUp(next: SignUpValues) {
  if (!next.name || !next.email || !next.password) {
    error.value = 'Completa todos los campos.'
    return
  }
  if (next.password !== next.confirmPassword) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }
  if (!next.acceptTerms) {
    error.value = 'Debes aceptar los términos y condiciones.'
    return
  }
  error.value = undefined
  submitting.value = true
  // Replace with your real sign-up request.
  window.setTimeout(() => {
    submitting.value = false
    flowEmail.value = next.email
    verifyPurpose.value = 'sign-up'
    resetVerifyValues()
    step.value = 'verify'
  }, 600)
}

function handleForgotPassword(next: ForgotPasswordValues) {
  if (!next.email) {
    error.value = 'Ingresa tu correo.'
    return
  }
  error.value = undefined
  submitting.value = true
  // Replace with your real "send reset link" request.
  window.setTimeout(() => {
    submitting.value = false
    flowEmail.value = next.email
    verifyPurpose.value = 'reset'
    resetVerifyValues()
    step.value = 'verify'
  }, 600)
}

function handleVerify(next: VerifyValues) {
  if (next.code.length < 6) {
    error.value = 'Ingresa el código completo de 6 dígitos.'
    return
  }
  error.value = undefined
  submitting.value = true
  // Replace with your real code-verification request.
  window.setTimeout(() => {
    submitting.value = false
    if (verifyPurpose.value === 'sign-up') {
      console.log('Account verified for', flowEmail.value)
      step.value = 'sign-in'
    } else {
      step.value = 'reset-password'
    }
  }, 600)
}

function handleResetPassword(next: ResetPasswordValues) {
  if (!next.password || next.password !== next.confirmPassword) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }
  error.value = undefined
  submitting.value = true
  // Replace with your real reset-password request.
  window.setTimeout(() => {
    submitting.value = false
    resetPasswordValues.password = ''
    resetPasswordValues.confirmPassword = ''
    console.log('Password reset for', flowEmail.value)
    step.value = 'sign-in'
  }, 600)
}

function goTo(next: Step) {
  error.value = undefined
  step.value = next
}
</script>

<template>
  <SignIn
    v-if="step === 'sign-in'"
    :values="signInValues"
    :error="error"
    :submitting="submitting"
    @change="(v) => Object.assign(signInValues, v)"
    @submit="handleSignIn"
    @forgot-password="() => goTo('forgot-password')"
    @sign-up="() => goTo('sign-up')"
  />
  <SignUp
    v-else-if="step === 'sign-up'"
    :values="signUpValues"
    :error="error"
    :submitting="submitting"
    @change="(v) => Object.assign(signUpValues, v)"
    @submit="handleSignUp"
    @sign-in="() => goTo('sign-in')"
  />
  <ForgotPassword
    v-else-if="step === 'forgot-password'"
    :values="forgotPasswordValues"
    :error="error"
    :submitting="submitting"
    @change="(v) => Object.assign(forgotPasswordValues, v)"
    @submit="handleForgotPassword"
    @back="() => goTo('sign-in')"
  />
  <Verify
    v-else-if="step === 'verify'"
    :values="verifyValues"
    :error="error"
    :submitting="submitting"
    :email="flowEmail"
    @change="(v) => Object.assign(verifyValues, v)"
    @submit="handleVerify"
    @resend="() => console.log('Resend code to', flowEmail)"
    @back="() => goTo(verifyPurpose === 'sign-up' ? 'sign-up' : 'forgot-password')"
  />
  <ResetPassword
    v-else-if="step === 'reset-password'"
    :values="resetPasswordValues"
    :error="error"
    :submitting="submitting"
    @change="(v) => Object.assign(resetPasswordValues, v)"
    @submit="handleResetPassword"
    @back="() => goTo('sign-in')"
  />
</template>
