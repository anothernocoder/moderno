<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements'

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
  const cls = $derived(['md-input', 'md-textarea', error ? 'md-input--error' : ''].filter(Boolean).join(' '))
</script>

<div>
  {#if label}<label class="md-field-label" for={fieldId}>{label}</label>{/if}
  <textarea
    id={fieldId}
    class={cls}
    aria-invalid={error ? true : undefined}
    aria-describedby={error || hint ? msgId : undefined}
    bind:value
    {...rest}
  ></textarea>
  {#if error}
    <p class="md-field-error" id={msgId}>{error}</p>
  {:else if hint}
    <p class="md-field-hint" id={msgId}>{hint}</p>
  {/if}
</div>
