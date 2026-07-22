<script lang="ts">
  // Moderno screen — SignIn (Svelte). Copy-paste; edit freely.
  // Presentational single-screen auth sign-in (ADR-0005): a typed wiring contract
  // (values/onChange/onSubmit) with no internal state and no router — the consumer
  // owns state and navigation. Composes the Input, Checkbox, Divider and Button
  // primitives + Moderno tokens.
  import { Button, Checkbox, Divider, Input } from '@moderno/svelte'

  export interface SignInValues {
    email: string
    password: string
    remember: boolean
  }

  let {
    values,
    onChange,
    onSubmit,
    onForgotPassword,
    onSignUp,
    error,
    submitting,
    title = 'Inicia sesión',
    description = 'Ingresa tus credenciales para acceder a tu cuenta.',
  }: {
    values: SignInValues
    onChange: (values: SignInValues) => void
    onSubmit: (values: SignInValues) => void
    onForgotPassword?: () => void
    onSignUp?: () => void
    error?: string
    submitting?: boolean
    title?: string
    description?: string
  } = $props()

  function set<K extends keyof SignInValues>(key: K, value: SignInValues[K]) {
    onChange({ ...values, [key]: value })
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    onSubmit(values)
  }
</script>

<div class="md-sign-in">
  <div class="md-sign-in__card">
    <div class="md-sign-in__header">
      <h1 class="md-sign-in__title">{title}</h1>
      <p class="md-sign-in__description">{description}</p>
    </div>

    {#if error}
      <p class="md-sign-in__error">{error}</p>
    {/if}

    <form class="md-sign-in__form" onsubmit={handleSubmit}>
      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        autocomplete="email"
        value={values.email}
        oninput={(event: Event) => set('email', (event.currentTarget as HTMLInputElement).value)}
        required
      />
      <Input
        label="Contraseña"
        name="password"
        type="password"
        autocomplete="current-password"
        value={values.password}
        oninput={(event: Event) => set('password', (event.currentTarget as HTMLInputElement).value)}
        required
      />
      <div class="md-sign-in__row">
        <Checkbox
          label="Recordarme"
          checked={values.remember}
          onCheckedChange={(checked) => set('remember', checked === true)}
        />
        <button type="button" class="md-sign-in__link" onclick={() => onForgotPassword?.()}>
          ¿Olvidaste tu contraseña?
        </button>
      </div>
      <Button type="submit" variant="primary" style="width: 100%;" disabled={submitting}>
        {submitting ? 'Ingresando…' : 'Iniciar sesión'}
      </Button>
    </form>

    <Divider />

    <p class="md-sign-in__footer">
      ¿No tienes una cuenta?
      <button type="button" class="md-sign-in__link" onclick={() => onSignUp?.()}>Regístrate</button>
    </p>
  </div>
</div>

<style>
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
  .md-sign-in__footer {
    margin-top: 24px;
    text-align: center;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
  }
</style>
