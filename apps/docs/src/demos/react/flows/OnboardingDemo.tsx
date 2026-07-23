import { OnboardingExample, type OnboardingExampleProps } from '@moderno/registry/flows/onboarding/Onboarding.example.tsx'

// `step` is a plain string prop passed from the MDX doc across the
// Astro-island boundary (which serializes to JSON) so each screen can be
// demoed individually alongside the full assembled journey.
export default function OnboardingDemo({ step }: { step?: OnboardingExampleProps['initialStep'] }) {
  return <OnboardingExample initialStep={step} />
}
