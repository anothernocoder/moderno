<script lang="ts">
  let {
    size = 'md',
    label = 'Cargando',
  }: {
    size?: 'sm' | 'md' | 'lg'
    label?: string
  } = $props()
</script>

<span class={`md-spinner md-spinner--${size}`} role="status" aria-label={label}></span>
