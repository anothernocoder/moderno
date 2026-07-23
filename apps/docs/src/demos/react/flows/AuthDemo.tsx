import { AuthExample, type AuthExampleProps } from '@moderno/registry/flows/auth/Auth.example.tsx'

// `step` is a plain string prop passed from the MDX doc across the
// Astro-island boundary (which serializes to JSON) so each screen can be
// demoed individually alongside the full assembled journey.
export default function AuthDemo({ step }: { step?: AuthExampleProps['initialStep'] }) {
  return <AuthExample initialStep={step} />
}
