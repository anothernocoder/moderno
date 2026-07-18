// @moderno/class-contract — single source for the md-* class contract.
//
// Two families:
//   • Variant components (cx.*) — a base class plus named axes of modifier values
//     and optional boolean flags. The spec drives the builder, the legal-name set
//     the CSS generator enforces, and the variant union types prop interfaces use.
//   • Anatomy leaves (parts.*) — the static class a primitive applies to each part
//     of its markup. Some leaves are unstyled hooks (no CSS rule); those are listed
//     in UNSTYLED_HOOKS and excluded from the enforced legal-name set.

type Axis = {
  readonly values: readonly string[]
  readonly default?: string
  /** Values that emit NO modifier class (the implicit default, e.g. button size 'md'). */
  readonly noClass?: readonly string[]
}

type VariantSpec = {
  readonly base: string
  readonly axes?: Record<string, Axis>
  /** Boolean modifiers: `base--<flag>` emitted when the caller passes a truthy flag. */
  readonly flags?: readonly string[]
}

/** Build the full class string for a spec from caller-supplied axis choices and flags. */
function build(spec: VariantSpec, opts: Record<string, string | boolean | undefined>): string {
  const classes = [spec.base]
  for (const [axis, def] of Object.entries(spec.axes ?? {})) {
    const value = (opts[axis] as string | undefined) ?? def.default
    if (value == null) continue
    if (def.noClass?.includes(value)) continue
    classes.push(`${spec.base}--${value}`)
  }
  for (const flag of spec.flags ?? []) {
    if (opts[flag]) classes.push(`${spec.base}--${flag}`)
  }
  return classes.join(' ')
}

/** Every class a spec may emit: base + each modifier value with a class + each flag. */
function namesOf(spec: VariantSpec): string[] {
  const names = [spec.base]
  for (const def of Object.values(spec.axes ?? {})) {
    for (const value of def.values) {
      if (def.noClass?.includes(value)) continue
      names.push(`${spec.base}--${value}`)
    }
  }
  for (const flag of spec.flags ?? []) names.push(`${spec.base}--${flag}`)
  return names
}

// ── Variant specs ──────────────────────────────────────────────────────────
const buttonSpec = {
  base: 'md-btn',
  axes: {
    variant: { values: ['primary', 'secondary'], default: 'primary' },
    size: { values: ['sm', 'md', 'lg'], default: 'md', noClass: ['md'] },
  },
} as const

const badgeSpec = {
  base: 'md-badge',
  axes: { variant: { values: ['neutral', 'solid', 'success', 'warning', 'error', 'info'], default: 'neutral' } },
} as const

const avatarSpec = {
  base: 'md-avatar',
  axes: {
    size: { values: ['sm', 'md', 'lg'], default: 'md' },
    shape: { values: ['circle', 'square'], default: 'circle', noClass: ['square'] },
  },
} as const

const chipSpec = {
  base: 'md-chip',
  axes: { variant: { values: ['neutral', 'solid'], default: 'neutral' } },
} as const

const calloutSpec = {
  base: 'md-callout',
  axes: { variant: { values: ['info', 'success', 'warning', 'error'], default: 'info' } },
} as const

const alertSpec = {
  base: 'md-alert',
  axes: { variant: { values: ['info', 'success', 'warning', 'error'], default: 'info' } },
} as const

const dividerSpec = {
  base: 'md-divider',
  axes: { orientation: { values: ['horizontal', 'vertical'], default: 'horizontal' } },
} as const

const indicatorSpec = {
  base: 'md-indicator',
  axes: { variant: { values: ['neutral', 'success', 'warning', 'error', 'info'], default: 'neutral' } },
  flags: ['pulse'],
} as const

const skeletonSpec = {
  base: 'md-skeleton',
  axes: { variant: { values: ['text', 'rect', 'circle'], default: 'text' } },
} as const

const spinnerSpec = {
  base: 'md-spinner',
  axes: { size: { values: ['sm', 'md', 'lg'], default: 'md' } },
} as const

const inputSpec = {
  base: 'md-input',
  flags: ['error'],
} as const

const sheetSpec = {
  base: 'md-sheet-content',
  axes: { side: { values: ['right', 'left', 'top', 'bottom'], default: 'right', noClass: ['right'] } },
} as const

const progressSpec = {
  base: 'md-progress',
  axes: { variant: { values: ['linear', 'circular'], default: 'linear', noClass: ['linear'] } },
} as const

/** All variant specs — drives legalNames so adding a spec needs no other edit. */
const VARIANT_SPECS: readonly VariantSpec[] = [
  buttonSpec,
  badgeSpec,
  avatarSpec,
  chipSpec,
  calloutSpec,
  alertSpec,
  dividerSpec,
  indicatorSpec,
  skeletonSpec,
  spinnerSpec,
  inputSpec,
  sheetSpec,
  progressSpec,
]

export type ButtonVariant = (typeof buttonSpec.axes.variant.values)[number]
export type ButtonSize = (typeof buttonSpec.axes.size.values)[number]
export type BadgeVariant = (typeof badgeSpec.axes.variant.values)[number]
export type AvatarSize = (typeof avatarSpec.axes.size.values)[number]
export type AvatarShape = (typeof avatarSpec.axes.shape.values)[number]
export type ChipVariant = (typeof chipSpec.axes.variant.values)[number]
export type CalloutVariant = (typeof calloutSpec.axes.variant.values)[number]
export type AlertVariant = (typeof alertSpec.axes.variant.values)[number]
export type DividerOrientation = (typeof dividerSpec.axes.orientation.values)[number]
export type IndicatorVariant = (typeof indicatorSpec.axes.variant.values)[number]
export type SkeletonVariant = (typeof skeletonSpec.axes.variant.values)[number]
export type SpinnerSize = (typeof spinnerSpec.axes.size.values)[number]
export type SheetSide = (typeof sheetSpec.axes.side.values)[number]
export type ProgressVariant = (typeof progressSpec.axes.variant.values)[number]

export const cx = {
  button(o: { variant?: ButtonVariant; size?: ButtonSize } = {}): string {
    return build(buttonSpec, o)
  },
  badge(o: { variant?: BadgeVariant } = {}): string {
    return build(badgeSpec, o)
  },
  avatar(o: { size?: AvatarSize; shape?: AvatarShape } = {}): string {
    return build(avatarSpec, o)
  },
  chip(o: { variant?: ChipVariant } = {}): string {
    return build(chipSpec, o)
  },
  callout(o: { variant?: CalloutVariant } = {}): string {
    return build(calloutSpec, o)
  },
  alert(o: { variant?: AlertVariant } = {}): string {
    return build(alertSpec, o)
  },
  divider(o: { orientation?: DividerOrientation } = {}): string {
    return build(dividerSpec, o)
  },
  indicator(o: { variant?: IndicatorVariant; pulse?: boolean } = {}): string {
    return build(indicatorSpec, o)
  },
  skeleton(o: { variant?: SkeletonVariant } = {}): string {
    return build(skeletonSpec, o)
  },
  spinner(o: { size?: SpinnerSize } = {}): string {
    return build(spinnerSpec, o)
  },
  input(o: { error?: boolean } = {}): string {
    return build(inputSpec, o)
  },
  sheet(o: { side?: SheetSide } = {}): string {
    return build(sheetSpec, o)
  },
  progress(o: { variant?: ProgressVariant } = {}): string {
    return build(progressSpec, o)
  },
}

// ── Anatomy leaves ─────────────────────────────────────────────────────────
export const parts = {
  // sub-elements of variant components
  badge: { dot: 'md-badge__dot' },
  avatar: { img: 'md-avatar__img' },
  chip: { remove: 'md-chip__remove' },
  callout: { title: 'md-callout__title', body: 'md-callout__body' },
  alert: { title: 'md-alert__title', body: 'md-alert__body' },
  divider: { group: 'md-divider-group' },
  indicator: { dot: 'md-indicator__dot' },
  field: { textarea: 'md-textarea', label: 'md-field-label', hint: 'md-field-hint', error: 'md-field-error' },
  card: { root: 'md-card', title: 'md-card__title', body: 'md-card__body', footer: 'md-card__footer' },
  // Zag anatomy primitives
  checkbox: { root: 'md-checkbox', control: 'md-checkbox-control', indicator: 'md-checkbox-indicator', label: 'md-checkbox-label' },
  radio: { root: 'md-radio', control: 'md-radio-control', item: 'md-radio-item', label: 'md-radio-label', itemText: 'md-radio-item-text' },
  toggle: { root: 'md-toggle', control: 'md-toggle-control', thumb: 'md-toggle-thumb', label: 'md-toggle-label' },
  tooltip: { positioner: 'md-tooltip-positioner', content: 'md-tooltip-content' },
  popover: {
    positioner: 'md-popover-positioner',
    content: 'md-popover-content',
    arrow: 'md-popover-arrow',
    title: 'md-popover-title',
    body: 'md-popover-body',
    close: 'md-popover-close',
  },
  dialog: {
    backdrop: 'md-dialog-backdrop',
    positioner: 'md-dialog-positioner',
    content: 'md-dialog-content',
    title: 'md-dialog-title',
    desc: 'md-dialog-desc',
    actions: 'md-dialog-actions',
  },
  sheet: {
    root: 'md-sheet',
    backdrop: 'md-sheet-backdrop',
    positioner: 'md-sheet-positioner',
    title: 'md-sheet-title',
    close: 'md-sheet-close',
  },
  tabs: { root: 'md-tabs', list: 'md-tabs-list', trigger: 'md-tabs-trigger', content: 'md-tabs-content' },
  accordion: {
    root: 'md-accordion',
    item: 'md-accordion-item',
    heading: 'md-accordion-heading',
    trigger: 'md-accordion-trigger',
    triggerText: 'md-accordion-trigger-text',
    content: 'md-accordion-content',
    indicator: 'md-accordion-indicator',
  },
  slider: {
    root: 'md-slider',
    header: 'md-slider-header',
    label: 'md-slider-label',
    value: 'md-slider-value',
    control: 'md-slider-control',
    track: 'md-slider-track',
    range: 'md-slider-range',
    thumb: 'md-slider-thumb',
  },
  select: {
    root: 'md-select',
    label: 'md-select-label',
    control: 'md-select-control',
    trigger: 'md-select-trigger',
    value: 'md-select-value',
    indicator: 'md-select-indicator',
    positioner: 'md-select-positioner',
    content: 'md-select-content',
    item: 'md-select-item',
    itemText: 'md-select-item-text',
    itemIndicator: 'md-select-item-indicator',
  },
  combobox: {
    root: 'md-combobox',
    label: 'md-combobox-label',
    control: 'md-combobox-control',
    input: 'md-combobox-input',
    trigger: 'md-combobox-trigger',
    positioner: 'md-combobox-positioner',
    content: 'md-combobox-content',
    item: 'md-combobox-item',
    itemText: 'md-combobox-item-text',
    itemIndicator: 'md-combobox-item-indicator',
  },
  menu: {
    indicator: 'md-menu-indicator',
    positioner: 'md-menu-positioner',
    content: 'md-menu-content',
    item: 'md-menu-item',
  },
  numberInput: {
    root: 'md-number-input',
    label: 'md-number-input-label',
    control: 'md-number-input-control',
    field: 'md-number-input-field',
    decrement: 'md-number-input-decrement',
    increment: 'md-number-input-increment',
  },
  toast: {
    group: 'md-toast-group',
    root: 'md-toast',
    title: 'md-toast-title',
    description: 'md-toast-description',
    closeTrigger: 'md-toast-close',
  },
  progress: {
    header: 'md-progress-header',
    label: 'md-progress-label',
    valueText: 'md-progress-value-text',
    track: 'md-progress-track',
    range: 'md-progress-range',
    circle: 'md-progress-circle',
    circleTrack: 'md-progress-circle-track',
    circleRange: 'md-progress-circle-range',
  },
} as const

/** Leaves the frameworks apply but styles.css does not style — excluded from enforcement. */
const UNSTYLED_HOOKS = new Set<string>([
  'md-checkbox-label',
  'md-combobox-item-text',
  'md-radio-item-text',
  'md-select-control',
  'md-select-item-text',
  'md-toggle-label',
])

/** The set of md-* class names the CSS generator enforces (everything with a rule). */
export function legalNames(): Set<string> {
  const names = new Set<string>()
  for (const spec of VARIANT_SPECS) for (const n of namesOf(spec)) names.add(n)
  for (const leaves of Object.values(parts)) {
    for (const cls of Object.values(leaves)) if (!UNSTYLED_HOOKS.has(cls)) names.add(cls)
  }
  return names
}
