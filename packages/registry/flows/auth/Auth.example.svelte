<script lang="ts">
  // Moderno flow example — Auth (Svelte). Copy-paste; edit freely.
  // Thin assembly (ADR-0005): stitches the SignIn, SignUp, ForgotPassword,
  // ResetPassword and Verify screens using Svelte's own $state runes for
  // values/step, with no router dependency. A runnable demo and a copy-paste
  // starting point — not the product.
  import SignIn, { type SignInValues } from '../../screens/applications/sign-in/SignIn.svelte'
  import SignUp, { type SignUpValues } from '../../screens/applications/sign-up/SignUp.svelte'
  import ForgotPassword, {
    type ForgotPasswordValues,
  } from '../../screens/applications/forgot-password/ForgotPassword.svelte'
  import ResetPassword, {
    type ResetPasswordValues,
  } from '../../screens/applications/reset-password/ResetPassword.svelte'
  import Verify, { type VerifyValues } from '../../screens/applications/verify/Verify.svelte'

  type Step = 'sign-in' | 'sign-up' | 'forgot-password' | 'reset-password' | 'verify'
  // Where `verify` was entered from — decides both what happens after a
  // successful code and where `onBack` returns to.
  type VerifyPurpose = 'sign-up' | 'reset'

  // `initialStep` lets the docs demo jump straight to a given screen via a
  // plain string prop (the Astro-island boundary serializes to JSON, so this
  // stays a string rather than richer state).
  let { initialStep = 'sign-in' }: { initialStep?: Step } = $props()

  let step: Step = $state(initialStep)
  let verifyPurpose: VerifyPurpose = $state('sign-up')
  // The email a code was sent to — captured from sign-up or forgot-password and
  // carried forward into the verify screen (display-only there).
  let flowEmail = $state('')

  let signInValues: SignInValues = $state({ email: '', password: '', remember: false })
  let signUpValues: SignUpValues = $state({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })
  let forgotPasswordValues: ForgotPasswordValues = $state({ email: '' })
  let resetPasswordValues: ResetPasswordValues = $state({ password: '', confirmPassword: '' })
  let verifyValues: VerifyValues = $state({ code: '' })

  let error: string | undefined = $state(undefined)
  let submitting = $state(false)

  function goTo(next: Step) {
    error = undefined
    step = next
  }

  function handleSignIn(next: SignInValues) {
    if (!next.email || !next.password) {
      error = 'Ingresa tu correo y contraseña.'
      return
    }
    error = undefined
    submitting = true
    // Replace with your real sign-in request.
    window.setTimeout(() => {
      submitting = false
      console.log('Signed in as', next.email)
    }, 600)
  }

  function handleSignUp(next: SignUpValues) {
    if (!next.name || !next.email || !next.password) {
      error = 'Completa todos los campos.'
      return
    }
    if (next.password !== next.confirmPassword) {
      error = 'Las contraseñas no coinciden.'
      return
    }
    if (!next.acceptTerms) {
      error = 'Debes aceptar los términos y condiciones.'
      return
    }
    error = undefined
    submitting = true
    // Replace with your real sign-up request.
    window.setTimeout(() => {
      submitting = false
      flowEmail = next.email
      verifyPurpose = 'sign-up'
      verifyValues = { code: '' }
      step = 'verify'
    }, 600)
  }

  function handleForgotPassword(next: ForgotPasswordValues) {
    if (!next.email) {
      error = 'Ingresa tu correo.'
      return
    }
    error = undefined
    submitting = true
    // Replace with your real "send reset link" request.
    window.setTimeout(() => {
      submitting = false
      flowEmail = next.email
      verifyPurpose = 'reset'
      verifyValues = { code: '' }
      step = 'verify'
    }, 600)
  }

  function handleVerify(next: VerifyValues) {
    if (next.code.length < 6) {
      error = 'Ingresa el código completo de 6 dígitos.'
      return
    }
    error = undefined
    submitting = true
    // Replace with your real code-verification request.
    window.setTimeout(() => {
      submitting = false
      if (verifyPurpose === 'sign-up') {
        console.log('Account verified for', flowEmail)
        step = 'sign-in'
      } else {
        step = 'reset-password'
      }
    }, 600)
  }

  function handleResetPassword(next: ResetPasswordValues) {
    if (!next.password || next.password !== next.confirmPassword) {
      error = 'Las contraseñas no coinciden.'
      return
    }
    error = undefined
    submitting = true
    // Replace with your real reset-password request.
    window.setTimeout(() => {
      submitting = false
      resetPasswordValues = { password: '', confirmPassword: '' }
      console.log('Password reset for', flowEmail)
      step = 'sign-in'
    }, 600)
  }
</script>

{#if step === 'sign-in'}
  <SignIn
    values={signInValues}
    onChange={(next) => (signInValues = next)}
    onSubmit={handleSignIn}
    {error}
    {submitting}
    onForgotPassword={() => goTo('forgot-password')}
    onSignUp={() => goTo('sign-up')}
  />
{:else if step === 'sign-up'}
  <SignUp
    values={signUpValues}
    onChange={(next) => (signUpValues = next)}
    onSubmit={handleSignUp}
    {error}
    {submitting}
    onSignIn={() => goTo('sign-in')}
  />
{:else if step === 'forgot-password'}
  <ForgotPassword
    values={forgotPasswordValues}
    onChange={(next) => (forgotPasswordValues = next)}
    onSubmit={handleForgotPassword}
    {error}
    {submitting}
    onBack={() => goTo('sign-in')}
  />
{:else if step === 'verify'}
  <Verify
    values={verifyValues}
    onChange={(next) => (verifyValues = next)}
    onSubmit={handleVerify}
    {error}
    {submitting}
    email={flowEmail}
    onResend={() => console.log('Resend code to', flowEmail)}
    onBack={() => goTo(verifyPurpose === 'sign-up' ? 'sign-up' : 'forgot-password')}
  />
{:else if step === 'reset-password'}
  <ResetPassword
    values={resetPasswordValues}
    onChange={(next) => (resetPasswordValues = next)}
    onSubmit={handleResetPassword}
    {error}
    {submitting}
    onBack={() => goTo('sign-in')}
  />
{/if}
