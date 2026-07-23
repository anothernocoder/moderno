<script lang="ts">
  import ReferralExample from '@moderno/registry/flows/referral/Referral.example.svelte'

  // `step` is a plain string prop passed from the MDX doc across the
  // Astro-island boundary (which serializes to JSON) so each screen can be
  // demoed individually alongside the full assembled journey.
  let { step = 'invite' }: { step?: string } = $props()
</script>

<ReferralExample initialStep={step} />
