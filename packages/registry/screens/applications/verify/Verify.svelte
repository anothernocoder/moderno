<script lang="ts">
  // Moderno screen — Verify (Svelte). Copy-paste; edit freely.
  // Presentational single-screen auth verify / OTP (ADR-0005): a typed wiring
  // contract (values/onChange/onSubmit) with no internal state and no router — the
  // consumer owns state and navigation. Composes the Input and Button primitives +
  // Moderno tokens.
  import { Button, Input } from '@moderno/svelte'

  export interface VerifyValues {
    code: string
  }

  let {
    values,
    onChange,
    onSubmit,
    onResend,
    onBack,
    error,
    submitting,
    email,
    title = 'Verifica tu correo',
    description,
  }: {
    values: VerifyValues
    onChange: (values: VerifyValues) => void
    onSubmit: (values: VerifyValues) => void
    onResend?: () => void
    onBack?: () => void
    error?: string
    submitting?: boolean
    email?: string
    title?: string
    description?: string
  } = $props()

  function set<K extends keyof VerifyValues>(key: K, value: VerifyValues[K]) {
    onChange({ ...values, [key]: value })
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    onSubmit(values)
  }

  let resolvedDescription = $derived(
    description ?? (email ? `Ingresa el código de 6 dígitos que enviamos a ${email}.` : 'Ingresa el código de 6 dígitos que te enviamos.'),
  )
</script>

<div class="md-verify">
  <div class="md-verify__card">
    <div class="md-verify__header">
      <h1 class="md-verify__title">{title}</h1>
      <p class="md-verify__description">{resolvedDescription}</p>
    </div>

    {#if error}
      <p class="md-verify__error">{error}</p>
    {/if}

    <form class="md-verify__form" onsubmit={handleSubmit}>
      <Input
        label="Código de verificación"
        name="code"
        type="text"
        inputmode="numeric"
        autocomplete="one-time-code"
        value={values.code}
        oninput={(event: Event) => set('code', (event.currentTarget as HTMLInputElement).value)}
        required
      />
      <div class="md-verify__row">
        <button type="button" class="md-verify__link" onclick={() => onResend?.()}>Reenviar código</button>
      </div>
      <Button type="submit" variant="primary" style="width: 100%;" disabled={submitting}>
        {submitting ? 'Verificando…' : 'Verificar'}
      </Button>
    </form>

    <p class="md-verify__footer">
      <button type="button" class="md-verify__link" onclick={() => onBack?.()}>Volver</button>
    </p>
  </div>
</div>

<style>
  /* Fills its container's height rather than assuming the viewport (matches the
     ApplicationShells block's convention) — give it a full-height container
     (e.g. `#root { height: 100vh }`) in your own app if you want it to fill the page. */
  .md-verify {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: var(--md-surface-base);
  }
  .md-verify__card {
    width: 100%;
    max-width: 400px;
    border: 1px solid var(--md-border-default);
    padding: 32px;
  }
  .md-verify__header {
    margin: 0 0 24px;
  }
  .md-verify__title {
    font-family: var(--md-font-serif);
    font-size: var(--md-text-headline-lg);
    color: var(--md-text-primary);
    margin: 0 0 8px;
  }
  .md-verify__description {
    font-size: var(--md-text-body-sm);
    line-height: var(--md-text-body-sm-lh);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-verify__error {
    font-size: var(--md-text-body-sm);
    color: var(--md-error);
    margin: 0 0 16px;
  }
  .md-verify__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .md-verify__row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px 12px;
  }
  .md-verify__link {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
    text-decoration: underline;
    cursor: pointer;
  }
  .md-verify__submit {
    width: 100%;
  }
  .md-verify__footer {
    margin-top: 24px;
    text-align: center;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
  }
</style>
