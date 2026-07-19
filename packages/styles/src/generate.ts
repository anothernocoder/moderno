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
  { kind: 'enforced', name: 'head', file: './partials/_head.css' },
  { kind: 'enforced', name: 'button', file: './partials/button.css' },
  { kind: 'enforced', name: 'dialog', file: './partials/dialog.css' },
  { kind: 'enforced', name: 'sheet', file: './partials/sheet.css' },
  { kind: 'enforced', name: 'tabs', file: './partials/tabs.css' },
  { kind: 'enforced', name: 'field', file: './partials/field.css' },
  { kind: 'enforced', name: 'card', file: './partials/card.css' },
  { kind: 'enforced', name: 'badge', file: './partials/badge.css' },
  { kind: 'enforced', name: 'callout', file: './partials/callout.css' },
  { kind: 'enforced', name: 'alert', file: './partials/alert.css' },
  { kind: 'enforced', name: 'avatar', file: './partials/avatar.css' },
  { kind: 'enforced', name: 'chip', file: './partials/chip.css' },
  { kind: 'enforced', name: 'indicator', file: './partials/indicator.css' },
  { kind: 'enforced', name: 'skeleton', file: './partials/skeleton.css' },
  { kind: 'enforced', name: 'spinner', file: './partials/spinner.css' },
  { kind: 'enforced', name: 'divider', file: './partials/divider.css' },
  { kind: 'enforced', name: 'toggle', file: './partials/toggle.css' },
  { kind: 'enforced', name: 'checkbox', file: './partials/checkbox.css' },
  { kind: 'enforced', name: 'radio', file: './partials/radio.css' },
  { kind: 'enforced', name: 'tooltip', file: './partials/tooltip.css' },
  { kind: 'enforced', name: 'popover', file: './partials/popover.css' },
  { kind: 'enforced', name: 'slider', file: './partials/slider.css' },
  { kind: 'enforced', name: 'progress', file: './partials/progress.css' },
  { kind: 'enforced', name: 'pagination', file: './partials/pagination.css' },
  { kind: 'enforced', name: 'splitter', file: './partials/splitter.css' },
  { kind: 'enforced', name: 'accordion', file: './partials/accordion.css' },
  { kind: 'enforced', name: 'select', file: './partials/select.css' },
  { kind: 'enforced', name: 'combobox', file: './partials/combobox.css' },
  { kind: 'enforced', name: 'menu', file: './partials/menu.css' },
  { kind: 'enforced', name: 'date-picker', file: './partials/date-picker.css' },
  { kind: 'enforced', name: 'number-input', file: './partials/number-input.css' },
  { kind: 'enforced', name: 'toast', file: './partials/toast.css' },
  { kind: 'enforced', name: 'reduced-motion', file: './partials/_reduced-motion.css' },
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
