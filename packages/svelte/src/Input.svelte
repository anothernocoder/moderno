<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'
  import { cx, parts } from '@moderno/class-contract'

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
</script>

<div>
  {#if label}<label class={parts.field.label} for={inputId}>{label}</label>{/if}
  <input
    id={inputId}
    class={cx.input({ error: !!error })}
    aria-invalid={error ? true : undefined}
    aria-describedby={error || hint ? msgId : undefined}
    bind:value
    {...rest}
  />
  {#if error}
    <p class={parts.field.error} id={msgId}>{error}</p>
  {:else if hint}
    <p class={parts.field.hint} id={msgId}>{hint}</p>
  {/if}
</div>
