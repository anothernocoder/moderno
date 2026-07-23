import { ReferralExample, type ReferralExampleProps } from '@moderno/registry/flows/referral/Referral.example.solid.tsx'

// `step` is a plain string prop passed from the MDX doc across the
// Astro-island boundary (which serializes to JSON) so each screen can be
// demoed individually alongside the full assembled journey.
export default function ReferralDemo(props: { step?: ReferralExampleProps['initialStep'] }) {
  return <ReferralExample initialStep={props.step} />
}
