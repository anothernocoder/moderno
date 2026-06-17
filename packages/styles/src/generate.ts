// CSS generator for @moderno/styles.
//
// Assembles styles.css from ordered segments. Segments tagged 'enforced' are
// checked against the class contract's legal-name set in both directions; 'legacy'
// segments (not-yet-migrated CSS) pass through unchecked. Concatenation preserves
// exact bytes so the committed styles.css stays reproducible.

export type Segment = {
  readonly kind: 'enforced' | 'legacy'
  readonly css: string
  readonly name?: string
}

/** A segment sourced from a partial file, in final concatenation order. */
export type SegmentSource = {
  readonly kind: 'enforced' | 'legacy'
  readonly name: string
  /** Path relative to this module. */
  readonly file: string
}

/**
 * Ordered manifest of partials that compose styles.css. 'enforced' partials are
 * checked against the class contract; 'legacy' holds not-yet-migrated CSS.
 * Migrating a primitive = move its rules from _legacy.css into its own enforced
 * partial here.
 */
export const STYLE_SEGMENTS: SegmentSource[] = [
  { kind: 'legacy', name: 'head', file: './partials/_head.css' },
  { kind: 'enforced', name: 'button', file: './partials/button.css' },
  { kind: 'legacy', name: 'legacy', file: './partials/_legacy.css' },
]

/** Class selectors (`md-*`) referenced in a chunk of CSS. */
function selectorsIn(css: string): Set<string> {
  const found = new Set<string>()
  for (const m of css.matchAll(/\.(md-[a-z0-9_-]+)/gi)) found.add(m[1])
  return found
}

export function assembleStyles(segments: Segment[], legal: Set<string>): string {
  const illegal: string[] = []
  const realized = new Set<string>()
  for (const seg of segments) {
    if (seg.kind !== 'enforced') continue
    for (const sel of selectorsIn(seg.css)) {
      realized.add(sel)
      if (!legal.has(sel)) illegal.push(`${sel} (in ${seg.name ?? 'enforced segment'})`)
    }
  }
  const orphans = [...legal].filter((name) => !realized.has(name))
  if (illegal.length || orphans.length) {
    const lines = [
      ...illegal.map((s) => `  used but not declared: ${s}`),
      ...orphans.map((s) => `  declared but no rule: ${s}`),
    ]
    throw new Error(`Class contract violation:\n${lines.join('\n')}`)
  }
  return segments.map((s) => s.css).join('')
}
