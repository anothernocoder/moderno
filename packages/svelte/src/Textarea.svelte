<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements'
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
  } & HTMLTextareaAttributes = $props()

  const uid = $props.id()
  const fieldId = $derived(id ?? uid)
  const msgId = $derived(`${fieldId}-msg`)
</script>

<div>
  {#if label}<label class={parts.field.label} for={fieldId}>{label}</label>{/if}
  <textarea
    id={fieldId}
    class={[cx.input({ error: !!error }), parts.field.textarea].join(' ')}
    aria-invalid={error ? true : undefined}
    aria-describedby={error || hint ? msgId : undefined}
    bind:value
    {...rest}
  ></textarea>
  {#if error}
    <p class={parts.field.error} id={msgId}>{error}</p>
  {:else if hint}
    <p class={parts.field.hint} id={msgId}>{hint}</p>
  {/if}
</div>
