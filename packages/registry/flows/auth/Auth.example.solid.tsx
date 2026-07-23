import { createSignal, Switch, Match } from 'solid-js'
import { SignIn, type SignInValues } from '../../screens/applications/sign-in/SignIn.solid'
import { SignUp, type SignUpValues } from '../../screens/applications/sign-up/SignUp.solid'
import { ForgotPassword, type ForgotPasswordValues } from '../../screens/applications/forgot-password/ForgotPassword.solid'
import { ResetPassword, type ResetPasswordValues } from '../../screens/applications/reset-password/ResetPassword.solid'
import { Verify, type VerifyValues } from '../../screens/applications/verify/Verify.solid'

type Step = 'sign-in' | 'sign-up' | 'forgot-password' | 'reset-password' | 'verify'
// Where `verify` was entered from — decides both what happens after a
// successful code and where `onBack` returns to.
type VerifyPurpose = 'sign-up' | 'reset'

export interface AuthExampleProps {
  /** Which screen to mount first — lets the docs demo jump straight to a given
   * screen via a plain string prop (the Astro-island boundary serializes to
   * JSON, so this stays a string rather than richer state). Defaults to `'sign-in'`. */
  initialStep?: Step
}

/**
 * Moderno flow example — Auth (Solid). Copy-paste; edit freely.
 * Thin assembly (ADR-0005): stitches the SignIn, SignUp, ForgotPassword,
 * ResetPassword and Verify screens using Solid's own createSignal for
 * values/step, with no router dependency. A runnable demo and a copy-paste
 * starting point — not the product.
 */
export function AuthExample(props: AuthExampleProps = {}) {
  const [step, setStep] = createSignal<Step>(props.initialStep ?? 'sign-in')
  const [verifyPurpose, setVerifyPurpose] = createSignal<VerifyPurpose>('sign-up')
  // The email a code was sent to — captured from sign-up or forgot-password and
  // carried forward into the verify screen (display-only there).
  const [flowEmail, setFlowEmail] = createSignal('')

  const [signInValues, setSignInValues] = createSignal<SignInValues>({
    email: '',
    password: '',
    remember: false,
  })
  const [signUpValues, setSignUpValues] = createSignal<SignUpValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })
  const [forgotPasswordValues, setForgotPasswordValues] = createSignal<ForgotPasswordValues>({ email: '' })
  const [resetPasswordValues, setResetPasswordValues] = createSignal<ResetPasswordValues>({
    password: '',
    confirmPassword: '',
  })
  const [verifyValues, setVerifyValues] = createSignal<VerifyValues>({ code: '' })

  const [error, setError] = createSignal<string>()
  const [submitting, setSubmitting] = createSignal(false)

  function goTo(next: Step) {
    setError(undefined)
    setStep(next)
  }

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
      setVerifyValues({ code: '' })
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
      setVerifyValues({ code: '' })
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
      if (verifyPurpose() === 'sign-up') {
        console.log('Account verified for', flowEmail())
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
      setResetPasswordValues({ password: '', confirmPassword: '' })
      console.log('Password reset for', flowEmail())
      setStep('sign-in')
    }, 600)
  }

  return (
    <Switch
      fallback={
        <SignIn
          values={signInValues()}
          onChange={setSignInValues}
          onSubmit={handleSignIn}
          onForgotPassword={() => goTo('forgot-password')}
          onSignUp={() => goTo('sign-up')}
          error={error()}
          submitting={submitting()}
        />
      }
    >
      <Match when={step() === 'sign-in'}>
        <SignIn
          values={signInValues()}
          onChange={setSignInValues}
          onSubmit={handleSignIn}
          onForgotPassword={() => goTo('forgot-password')}
          onSignUp={() => goTo('sign-up')}
          error={error()}
          submitting={submitting()}
        />
      </Match>
      <Match when={step() === 'sign-up'}>
        <SignUp
          values={signUpValues()}
          onChange={setSignUpValues}
          onSubmit={handleSignUp}
          onSignIn={() => goTo('sign-in')}
          error={error()}
          submitting={submitting()}
        />
      </Match>
      <Match when={step() === 'forgot-password'}>
        <ForgotPassword
          values={forgotPasswordValues()}
          onChange={setForgotPasswordValues}
          onSubmit={handleForgotPassword}
          onBack={() => goTo('sign-in')}
          error={error()}
          submitting={submitting()}
        />
      </Match>
      <Match when={step() === 'verify'}>
        <Verify
          values={verifyValues()}
          onChange={setVerifyValues}
          onSubmit={handleVerify}
          onResend={() => console.log('Resend code to', flowEmail())}
          onBack={() => goTo(verifyPurpose() === 'sign-up' ? 'sign-up' : 'forgot-password')}
          error={error()}
          submitting={submitting()}
          email={flowEmail()}
        />
      </Match>
      <Match when={step() === 'reset-password'}>
        <ResetPassword
          values={resetPasswordValues()}
          onChange={setResetPasswordValues}
          onSubmit={handleResetPassword}
          onBack={() => goTo('sign-in')}
          error={error()}
          submitting={submitting()}
        />
      </Match>
    </Switch>
  )
}
