import { createSignal } from 'solid-js'
import { SignIn, type SignInValues } from '../../screens/applications/sign-in/SignIn.solid'

// Single step for now (ADR-0005's Auth tracer ships sign-in only). A richer Auth
// flow would grow this union ('sign-in' | 'sign-up' | 'forgot-password' | 'verify')
// and switch on `step` below — still with no router, just local state.
type Step = 'sign-in'

/**
 * Moderno flow example — Auth (Solid). Copy-paste; edit freely.
 * Thin assembly (ADR-0005): stitches the SignIn screen using Solid's own
 * createSignal for values/step, with no router dependency. A runnable demo and
 * a copy-paste starting point — not the product.
 */
export function AuthExample() {
  const [step] = createSignal<Step>('sign-in')
  const [values, setValues] = createSignal<SignInValues>({ email: '', password: '', remember: false })
  const [error, setError] = createSignal<string>()
  const [submitting, setSubmitting] = createSignal(false)

  function handleSubmit(next: SignInValues) {
    if (!next.email || !next.password) {
      setError('Ingresa tu correo y contraseña.')
      return
    }
    setError(undefined)
    setSubmitting(true)
    // Replace with your real sign-in request.
    window.setTimeout(() => {
      setSubmitting(false)
      console.log('Signed in as', next.email)
    }, 600)
  }

  return (
    <>
      {step() === 'sign-in' && (
        <SignIn
          values={values()}
          onChange={setValues}
          onSubmit={handleSubmit}
          onForgotPassword={() => console.log('Forgot password')}
          onSignUp={() => console.log('Go to sign up')}
          error={error()}
          submitting={submitting()}
        />
      )}
    </>
  )
}
