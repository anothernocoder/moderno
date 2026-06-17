// @moderno/class-contract — single source for the md-* class contract.
//
// Each variant component is declared once as a spec: a base class plus named
// axes of modifier values. The spec drives every output — the class builder
// (cx.*), the legal-name set the CSS generator enforces (legalNames), and the
// variant union types the framework prop interfaces consume. One source, no drift.

type Axis = {
  readonly values: readonly string[]
  readonly default?: string
  /** Values that are the implicit default and emit NO modifier class (e.g. button size 'md'). */
  readonly noClass?: readonly string[]
}

type VariantSpec = {
  readonly base: string
  readonly axes: Record<string, Axis>
}

/** Build the full class string for a spec from caller-supplied axis choices. */
function build(spec: VariantSpec, opts: Record<string, string | undefined>): string {
  const classes = [spec.base]
  for (const [axis, def] of Object.entries(spec.axes)) {
    const value = opts[axis] ?? def.default
    if (value == null) continue
    if (def.noClass?.includes(value)) continue
    classes.push(`${spec.base}--${value}`)
  }
  return classes.join(' ')
}

/** Every class a spec may emit: its base plus each modifier value that has a class. */
function namesOf(spec: VariantSpec): string[] {
  const names = [spec.base]
  for (const def of Object.values(spec.axes)) {
    for (const value of def.values) {
      if (def.noClass?.includes(value)) continue
      names.push(`${spec.base}--${value}`)
    }
  }
  return names
}

const buttonSpec = {
  base: 'md-btn',
  axes: {
    variant: { values: ['primary', 'secondary'], default: 'primary' },
    size: { values: ['sm', 'md', 'lg'], default: 'md', noClass: ['md'] },
  },
} as const

export type ButtonVariant = (typeof buttonSpec.axes.variant.values)[number]
export type ButtonSize = (typeof buttonSpec.axes.size.values)[number]

export const cx = {
  button(o: { variant?: ButtonVariant; size?: ButtonSize } = {}): string {
    return build(buttonSpec, o)
  },
}

/** The complete set of md-* class names the contract may emit. */
export function legalNames(): Set<string> {
  return new Set([...namesOf(buttonSpec)])
}
