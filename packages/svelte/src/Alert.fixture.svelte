<script lang="ts">
  import Alert from './Alert.svelte'
  import type { AlertVariant } from '@moderno/class-contract'

  let { variant, title }: { variant?: AlertVariant; title?: string } = $props()
</script>

<Alert {variant} {title}>Something happened.</Alert>
