import { useState } from 'react'
import { SignIn, type SignInValues } from '../../screens/applications/sign-in/SignIn'
import { SignUp, type SignUpValues } from '../../screens/applications/sign-up/SignUp'
import { ForgotPassword, type ForgotPasswordValues } from '../../screens/applications/forgot-password/ForgotPassword'
import { ResetPassword, type ResetPasswordValues } from '../../screens/applications/reset-password/ResetPassword'
import { Verify, type VerifyValues } from '../../screens/applications/verify/Verify'

type Step = 'sign-in' | 'sign-up' | 'forgot-password' | 'reset-password' | 'verify'
// Where `verify` was entered from — decides both what happens after a
// successful code and where `onBack` returns to.
type VerifyPurpose = 'sign-up' | 'reset'

const INITIAL_SIGN_IN: SignInValues = { email: '', password: '', remember: false }
const INITIAL_SIGN_UP: SignUpValues = { name: '', email: '', password: '', confirmPassword: '', acceptTerms: false }
const INITIAL_FORGOT_PASSWORD: ForgotPasswordValues = { email: '' }
const INITIAL_RESET_PASSWORD: ResetPasswordValues = { password: '', confirmPassword: '' }
const INITIAL_VERIFY: VerifyValues = { code: '' }

export interface AuthExampleProps {
  /** Which screen to mount first — lets the docs demo jump straight to a given
   * screen via a plain string prop (the Astro-island boundary serializes to
   * JSON, so this stays a string rather than richer state). Defaults to `'sign-in'`. */
  initialStep?: Step
}

/**
 * Moderno flow example — Auth (React). Copy-paste; edit freely.
 * Thin assembly (ADR-0005): stitches the SignIn, SignUp, ForgotPassword,
 * ResetPassword and Verify screens using React's own useState for values/step,
 * with no router dependency. A runnable demo and a copy-paste starting point —
 * not the product.
 */
export function AuthExample({ initialStep = 'sign-in' }: AuthExampleProps = {}) {
  const [step, setStep] = useState<Step>(initialStep)
  const [verifyPurpose, setVerifyPurpose] = useState<VerifyPurpose>('sign-up')
  // The email a code was sent to — captured from sign-up or forgot-password and
  // carried forward into the verify screen (display-only there).
  const [flowEmail, setFlowEmail] = useState('')

  const [signInValues, setSignInValues] = useState<SignInValues>(INITIAL_SIGN_IN)
  const [signUpValues, setSignUpValues] = useState<SignUpValues>(INITIAL_SIGN_UP)
  const [forgotPasswordValues, setForgotPasswordValues] = useState<ForgotPasswordValues>(INITIAL_FORGOT_PASSWORD)
  const [resetPasswordValues, setResetPasswordValues] = useState<ResetPasswordValues>(INITIAL_RESET_PASSWORD)
  const [verifyValues, setVerifyValues] = useState<VerifyValues>(INITIAL_VERIFY)

  const [error, setError] = useState<string>()
  const [submitting, setSubmitting] = useState(false)

  function handleSignIn(next: SignInValues) {
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

  function handleSignUp(next: SignUpValues) {
    if (!next.name || !next.email || !next.password) {
      setError('Completa todos los campos.')
      return
    }
    if (next.password !== next.confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (!next.acceptTerms) {
      setError('Debes aceptar los términos y condiciones.')
      return
    }
    setError(undefined)
    setSubmitting(true)
    // Replace with your real sign-up request.
    window.setTimeout(() => {
      setSubmitting(false)
      setFlowEmail(next.email)
      setVerifyPurpose('sign-up')
      setVerifyValues(INITIAL_VERIFY)
      setStep('verify')
    }, 600)
  }

  function handleForgotPassword(next: ForgotPasswordValues) {
    if (!next.email) {
      setError('Ingresa tu correo.')
      return
    }
    setError(undefined)
    setSubmitting(true)
    // Replace with your real "send reset link" request.
    window.setTimeout(() => {
      setSubmitting(false)
      setFlowEmail(next.email)
      setVerifyPurpose('reset')
      setVerifyValues(INITIAL_VERIFY)
      setStep('verify')
    }, 600)
  }

  function handleVerify(next: VerifyValues) {
    if (next.code.length < 6) {
      setError('Ingresa el código completo de 6 dígitos.')
      return
    }
    setError(undefined)
    setSubmitting(true)
    // Replace with your real code-verification request.
    window.setTimeout(() => {
      setSubmitting(false)
      if (verifyPurpose === 'sign-up') {
        console.log('Account verified for', flowEmail)
        setStep('sign-in')
      } else {
        setStep('reset-password')
      }
    }, 600)
  }

  function handleResetPassword(next: ResetPasswordValues) {
    if (!next.password || next.password !== next.confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    setError(undefined)
    setSubmitting(true)
    // Replace with your real reset-password request.
    window.setTimeout(() => {
      setSubmitting(false)
      setResetPasswordValues(INITIAL_RESET_PASSWORD)
      console.log('Password reset for', flowEmail)
      setStep('sign-in')
    }, 600)
  }

  switch (step) {
    case 'sign-up':
      return (
        <SignUp
          values={signUpValues}
          onChange={setSignUpValues}
          onSubmit={handleSignUp}
          onSignIn={() => {
            setError(undefined)
            setStep('sign-in')
          }}
          error={error}
          submitting={submitting}
        />
      )
    case 'forgot-password':
      return (
        <ForgotPassword
          values={forgotPasswordValues}
          onChange={setForgotPasswordValues}
          onSubmit={handleForgotPassword}
          onBack={() => {
            setError(undefined)
            setStep('sign-in')
          }}
          error={error}
          submitting={submitting}
        />
      )
    case 'verify':
      return (
        <Verify
          values={verifyValues}
          onChange={setVerifyValues}
          onSubmit={handleVerify}
          onResend={() => console.log('Resend code to', flowEmail)}
          onBack={() => {
            setError(undefined)
            setStep(verifyPurpose === 'sign-up' ? 'sign-up' : 'forgot-password')
          }}
          error={error}
          submitting={submitting}
          email={flowEmail}
        />
      )
    case 'reset-password':
      return (
        <ResetPassword
          values={resetPasswordValues}
          onChange={setResetPasswordValues}
          onSubmit={handleResetPassword}
          onBack={() => {
            setError(undefined)
            setStep('sign-in')
          }}
          error={error}
          submitting={submitting}
        />
      )
    case 'sign-in':
    default:
      return (
        <SignIn
          values={signInValues}
          onChange={setSignInValues}
          onSubmit={handleSignIn}
          onForgotPassword={() => {
            setError(undefined)
            setStep('forgot-password')
          }}
          onSignUp={() => {
            setError(undefined)
            setStep('sign-up')
          }}
          error={error}
          submitting={submitting}
        />
      )
  }
}
