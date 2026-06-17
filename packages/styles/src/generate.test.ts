import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { legalNames } from '@moderno/class-contract'
import { assembleStyles, STYLE_SEGMENTS } from './generate'

describe('assembleStyles — concatenate partials + enforce the class contract', () => {
  it('concatenates segments in order when enforced selectors are all legal', () => {
    const legal = new Set(['md-btn', 'md-btn--primary'])
    const out = assembleStyles(
      [
        { kind: 'legacy', css: '/* head */\n' },
        { kind: 'enforced', name: 'button', css: '.md-btn { color: red }\n.md-btn--primary:hover { color: blue }\n' },
        { kind: 'legacy', css: '.md-dialog-backdrop { opacity: .5 }\n' },
      ],
      legal,
    )
    expect(out).toBe(
      '/* head */\n.md-btn { color: red }\n.md-btn--primary:hover { color: blue }\n.md-dialog-backdrop { opacity: .5 }\n',
    )
  })

  it('throws naming a selector that an enforced segment uses but the contract does not allow', () => {
    const legal = new Set(['md-btn', 'md-btn--primary'])
    expect(() =>
      assembleStyles(
        [{ kind: 'enforced', name: 'button', css: '.md-btn--bogus { color: red }\n' }],
        legal,
      ),
    ).toThrow(/md-btn--bogus/)
  })

  it('throws naming a contract class that no enforced segment realizes (orphan)', () => {
    const legal = new Set(['md-btn', 'md-btn--lg'])
    expect(() =>
      assembleStyles([{ kind: 'enforced', name: 'button', css: '.md-btn { color: red }\n' }], legal),
    ).toThrow(/md-btn--lg/)
  })
})

describe('golden — assembled output reproduces the committed styles.css', () => {
  const here = (rel: string) => fileURLToPath(new URL(rel, import.meta.url))

  it('regenerating from partials byte-equals src/styles.css and passes enforcement', () => {
    const segments = STYLE_SEGMENTS.map((s) => ({ ...s, css: readFileSync(here(s.file), 'utf8') }))
    const generated = assembleStyles(segments, legalNames())
    const committed = readFileSync(here('./styles.css'), 'utf8')
    expect(generated).toBe(committed)
  })
})
