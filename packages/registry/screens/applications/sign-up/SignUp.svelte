<script lang="ts">
  // Moderno screen — SignUp (Svelte). Copy-paste; edit freely.
  // Presentational single-screen auth sign-up (ADR-0005): a typed wiring contract
  // (values/onChange/onSubmit) with no internal state and no router — the consumer
  // owns state and navigation. Composes the Input, Checkbox, Divider and Button
  // primitives + Moderno tokens.
  import { Button, Checkbox, Divider, Input } from '@moderno/svelte'

  export interface SignUpValues {
    name: string
    email: string
    password: string
    confirmPassword: string
    acceptTerms: boolean
  }

  let {
    values,
    onChange,
    onSubmit,
    onSignIn,
    error,
    submitting,
    title = 'Crea tu cuenta',
    description = 'Completa tus datos para empezar.',
  }: {
    values: SignUpValues
    onChange: (values: SignUpValues) => void
    onSubmit: (values: SignUpValues) => void
    onSignIn?: () => void
    error?: string
    submitting?: boolean
    title?: string
    description?: string
  } = $props()

  function set<K extends keyof SignUpValues>(key: K, value: SignUpValues[K]) {
    onChange({ ...values, [key]: value })
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    onSubmit(values)
  }
</script>

<div class="md-sign-up">
  <div class="md-sign-up__card">
    <div class="md-sign-up__header">
      <h1 class="md-sign-up__title">{title}</h1>
      <p class="md-sign-up__description">{description}</p>
    </div>

    {#if error}
      <p class="md-sign-up__error">{error}</p>
    {/if}

    <form class="md-sign-up__form" onsubmit={handleSubmit}>
      <Input
        label="Nombre completo"
        name="name"
        type="text"
        autocomplete="name"
        value={values.name}
        oninput={(event: Event) => set('name', (event.currentTarget as HTMLInputElement).value)}
        required
      />
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
        autocomplete="new-password"
        value={values.password}
        oninput={(event: Event) => set('password', (event.currentTarget as HTMLInputElement).value)}
        required
      />
      <Input
        label="Confirma tu contraseña"
        name="confirmPassword"
        type="password"
        autocomplete="new-password"
        value={values.confirmPassword}
        oninput={(event: Event) => set('confirmPassword', (event.currentTarget as HTMLInputElement).value)}
        required
      />
      <Checkbox
        label="Acepto los términos y condiciones"
        checked={values.acceptTerms}
        onCheckedChange={(checked) => set('acceptTerms', checked === true)}
      />
      <Button type="submit" variant="primary" style="width: 100%;" disabled={submitting}>
        {submitting ? 'Creando cuenta…' : 'Crear cuenta'}
      </Button>
    </form>

    <Divider />

    <p class="md-sign-up__footer">
      ¿Ya tienes una cuenta?
      <button type="button" class="md-sign-up__link" onclick={() => onSignIn?.()}>Inicia sesión</button>
    </p>
  </div>
</div>

<style>
  /* Fills its container's height rather than assuming the viewport (matches the
     ApplicationShells block's convention) — give it a full-height container
     (e.g. `#root { height: 100vh }`) in your own app if you want it to fill the page. */
  .md-sign-up {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: var(--md-surface-base);
  }
  .md-sign-up__card {
    width: 100%;
    max-width: 400px;
    border: 1px solid var(--md-border-default);
    padding: 32px;
  }
  .md-sign-up__header {
    margin: 0 0 24px;
  }
  .md-sign-up__title {
    font-family: var(--md-font-serif);
    font-size: var(--md-text-headline-lg);
    color: var(--md-text-primary);
    margin: 0 0 8px;
  }
  .md-sign-up__description {
    font-size: var(--md-text-body-sm);
    line-height: var(--md-text-body-sm-lh);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-sign-up__error {
    font-size: var(--md-text-body-sm);
    color: var(--md-error);
    margin: 0 0 16px;
  }
  .md-sign-up__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .md-sign-up__link {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
    text-decoration: underline;
    cursor: pointer;
  }
  .md-sign-up__footer {
    margin-top: 24px;
    text-align: center;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
  }
</style>
