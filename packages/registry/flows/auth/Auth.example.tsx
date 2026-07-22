import { useState } from 'react'
import { SignIn, type SignInValues } from '../../screens/applications/sign-in/SignIn'

const INITIAL_VALUES: SignInValues = { email: '', password: '', remember: false }

// Single step for now (ADR-0005's Auth tracer ships sign-in only). A richer Auth
// flow would grow this union ('sign-in' | 'sign-up' | 'forgot-password' | 'verify')
// and switch on `step` below — still with no router, just local state.
type Step = 'sign-in'

/**
 * Moderno flow example — Auth (React). Copy-paste; edit freely.
 * Thin assembly (ADR-0005): stitches the SignIn screen using React's own
 * useState for values/step, with no router dependency. A runnable demo and a
 * copy-paste starting point — not the product.
 */
export function AuthExample() {
  const [step] = useState<Step>('sign-in')
  const [values, setValues] = useState<SignInValues>(INITIAL_VALUES)
  const [error, setError] = useState<string>()
  const [submitting, setSubmitting] = useState(false)

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

  switch (step) {
    case 'sign-in':
    default:
      return (
        <SignIn
          values={values}
          onChange={setValues}
          onSubmit={handleSubmit}
          onForgotPassword={() => console.log('Forgot password')}
          onSignUp={() => console.log('Go to sign up')}
          error={error}
          submitting={submitting}
        />
      )
  }
}
