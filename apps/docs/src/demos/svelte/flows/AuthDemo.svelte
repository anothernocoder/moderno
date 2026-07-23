<script lang="ts">
  import AuthExample from '@moderno/registry/flows/auth/Auth.example.svelte'

  // `step` is a plain string prop passed from the MDX doc across the
  // Astro-island boundary (which serializes to JSON) so each screen can be
  // demoed individually alongside the full assembled journey.
  let { step = 'sign-in' }: { step?: string } = $props()
</script>

<AuthExample initialStep={step} />
