<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'

  let {
    label,
    hint,
    error,
    id,
    value = $bindable(),
    ...rest
  }: {
    label?: string
    hint?: string
    error?: string
    id?: string
    value?: string
  } & HTMLInputAttributes = $props()

  const uid = $props.id()
  const inputId = $derived(id ?? uid)
  const msgId = $derived(`${inputId}-msg`)
  const cls = $derived(['md-input', error ? 'md-input--error' : ''].filter(Boolean).join(' '))
</script>

<div>
  {#if label}<label class="md-field-label" for={inputId}>{label}</label>{/if}
  <input
    id={inputId}
    class={cls}
    aria-invalid={error ? true : undefined}
    aria-describedby={error || hint ? msgId : undefined}
    bind:value
    {...rest}
  />
  {#if error}
    <p class="md-field-error" id={msgId}>{error}</p>
  {:else if hint}
    <p class="md-field-hint" id={msgId}>{hint}</p>
  {/if}
</div>
