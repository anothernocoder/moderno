<script lang="ts">
  import OnboardingExample from '@moderno/registry/flows/onboarding/Onboarding.example.svelte'

  // `step` is a plain string prop passed from the MDX doc across the
  // Astro-island boundary (which serializes to JSON) so each screen can be
  // demoed individually alongside the full assembled journey.
  let { step = 'welcome' }: { step?: string } = $props()
</script>

<OnboardingExample initialStep={step} />
