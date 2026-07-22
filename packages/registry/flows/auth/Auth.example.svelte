<script lang="ts">
  // Moderno flow example — Auth (Svelte). Copy-paste; edit freely.
  // Thin assembly (ADR-0005): stitches the SignIn screen using Svelte's own
  // $state runes for values/step, with no router dependency. A runnable demo and
  // a copy-paste starting point — not the product.
  import SignIn, { type SignInValues } from '../../screens/applications/sign-in/SignIn.svelte'

  // Single step for now (ADR-0005's Auth tracer ships sign-in only). A richer Auth
  // flow would grow this union ('sign-in' | 'sign-up' | 'forgot-password' | 'verify')
  // and switch on `step` below — still with no router, just local state.
  type Step = 'sign-in'

  let step: Step = $state('sign-in')
  let values: SignInValues = $state({ email: '', password: '', remember: false })
  let error: string | undefined = $state(undefined)
  let submitting = $state(false)

  function handleSubmit(next: SignInValues) {
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
</script>

{#if step === 'sign-in'}
  <SignIn
    {values}
    onChange={(next) => (values = next)}
    onSubmit={handleSubmit}
    {error}
    {submitting}
    onForgotPassword={() => console.log('Forgot password')}
    onSignUp={() => console.log('Go to sign up')}
  />
{/if}
