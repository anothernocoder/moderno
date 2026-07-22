import { For, Show, type JSX } from 'solid-js'

export interface LongFormSection {
  subheading?: string
  paragraphs: string[]
  pullQuote?: string
}

export interface LongFormContentProps {
  kicker?: string
  readingTime?: string
  headline?: string
  dek?: string
  coverImageSrc?: string
  coverImageAlt?: string
  sections?: LongFormSection[]
}

const DEFAULT_SECTIONS: LongFormSection[] = [
  {
    subheading: 'El problema',
    paragraphs: [
      'El cierre mensual dependía de cuatro hojas de cálculo y dos personas que sabían "el truco". Cada diferencia se rastreaba a mano contra el kárdex.',
      'Mapeamos el flujo real con los operarios de bodega y encontramos que el 60% de las diferencias nacía en transferencias sin confirmar.',
    ],
    pullQuote: 'El 80% del tiempo no era contar: era explicar por qué los números no cuadraban.',
  },
]

const articleStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-direction': 'column',
  gap: '24px',
  'max-width': '42rem',
  margin: '0 auto',
}

const kickerStyle: JSX.CSSProperties = {
  'font-size': '10px',
  'line-height': '14px',
  'letter-spacing': '0.14em',
  'text-transform': 'uppercase',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

const headlineStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': 'var(--md-text-headline-lg)',
  'line-height': 'var(--md-text-headline-lg-lh)',
  color: 'var(--md-text-primary)',
  margin: '12px 0 0',
}

const dekStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  'line-height': 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: '12px 0 0',
}

const coverImageStyle: JSX.CSSProperties = {
  display: 'block',
  width: '100%',
  height: '200px',
  'object-fit': 'cover',
}

const coverPlaceholderStyle: JSX.CSSProperties = {
  height: '200px',
  background: 'var(--md-surface-muted)',
}

const bodyStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-direction': 'column',
  gap: '16px',
  'font-size': 'var(--md-text-body-md)',
  'line-height': 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
}

const subheadingStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-lg)',
  'line-height': 'var(--md-text-body-lg-lh)',
  color: 'var(--md-text-primary)',
  margin: 0,
}

const paragraphStyle: JSX.CSSProperties = {
  margin: 0,
}

const pullQuoteStyle: JSX.CSSProperties = {
  margin: 0,
  'border-left': '2px solid var(--md-primary)',
  padding: '4px 0 4px 20px',
  color: 'var(--md-text-primary)',
}

/**
 * Moderno block — LongFormContent (Solid). Copy-paste; edit freely.
 * Case-study / long-read layout: kicker, headline, dek, cover image and
 * prose body sections (subheading, paragraphs, pull-quote). Uses
 * Moderno tokens only (no primitives).
 */
export function LongFormContent(props: LongFormContentProps) {
  const sections = () => props.sections ?? DEFAULT_SECTIONS

  return (
    <article style={articleStyle}>
      <header>
        <p style={kickerStyle}>
          {props.kicker ?? 'Caso de estudio'} · {props.readingTime ?? '12 min'}
        </p>
        <h2 style={headlineStyle}>
          {props.headline ?? 'Rediseñando el cierre de inventario de Moderno'}
        </h2>
        <p style={dekStyle}>
          {props.dek ??
            'Cómo pasamos de un proceso de tres días a una tarde, sin perder trazabilidad contable.'}
        </p>
      </header>
      <Show
        when={props.coverImageSrc}
        fallback={<div style={coverPlaceholderStyle} aria-hidden="true" />}
      >
        <img
          src={props.coverImageSrc}
          alt={props.coverImageAlt ?? 'Imagen de portada'}
          style={coverImageStyle}
        />
      </Show>
      <For each={sections()}>
        {(section) => {
          const firstParagraph = () => section.paragraphs[0]
          const restParagraphs = () => section.paragraphs.slice(1)
          return (
            <div style={bodyStyle}>
              <Show when={section.subheading}>
                <h3 style={subheadingStyle}>{section.subheading}</h3>
              </Show>
              <Show when={firstParagraph()}>
                <p style={paragraphStyle}>{firstParagraph()}</p>
              </Show>
              <Show when={section.pullQuote}>
                <blockquote style={pullQuoteStyle}>{section.pullQuote}</blockquote>
              </Show>
              <For each={restParagraphs()}>
                {(paragraph) => <p style={paragraphStyle}>{paragraph}</p>}
              </For>
            </div>
          )
        }}
      </For>
    </article>
  )
}
