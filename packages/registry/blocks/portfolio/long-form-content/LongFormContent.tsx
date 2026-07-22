import type { CSSProperties } from 'react'

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

const articleStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  maxWidth: '42rem',
  margin: '0 auto',
}

const kickerStyle: CSSProperties = {
  fontSize: '10px',
  lineHeight: '14px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

const headlineStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: 'var(--md-text-headline-lg)',
  lineHeight: 'var(--md-text-headline-lg-lh)',
  color: 'var(--md-text-primary)',
  margin: '12px 0 0',
}

const dekStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  lineHeight: 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: '12px 0 0',
}

const coverImageStyle: CSSProperties = {
  display: 'block',
  width: '100%',
  height: '200px',
  objectFit: 'cover',
}

const coverPlaceholderStyle: CSSProperties = {
  height: '200px',
  background: 'var(--md-surface-muted)',
}

const bodyStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  fontSize: 'var(--md-text-body-md)',
  lineHeight: 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
}

const subheadingStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-lg)',
  lineHeight: 'var(--md-text-body-lg-lh)',
  color: 'var(--md-text-primary)',
  margin: 0,
}

const paragraphStyle: CSSProperties = {
  margin: 0,
}

const pullQuoteStyle: CSSProperties = {
  margin: 0,
  borderLeft: '2px solid var(--md-primary)',
  padding: '4px 0 4px 20px',
  color: 'var(--md-text-primary)',
}

/**
 * Moderno block — LongFormContent (React). Copy-paste; edit freely.
 * Case-study / long-read layout: kicker, headline, dek, cover image and
 * prose body sections (subheading, paragraphs, pull-quote). Uses
 * Moderno tokens only (no primitives).
 */
export function LongFormContent({
  kicker = 'Caso de estudio',
  readingTime = '12 min',
  headline = 'Rediseñando el cierre de inventario de Moderno',
  dek = 'Cómo pasamos de un proceso de tres días a una tarde, sin perder trazabilidad contable.',
  coverImageSrc,
  coverImageAlt = 'Imagen de portada',
  sections = DEFAULT_SECTIONS,
}: LongFormContentProps) {
  return (
    <article style={articleStyle}>
      <header>
        <p style={kickerStyle}>
          {kicker} · {readingTime}
        </p>
        <h2 style={headlineStyle}>{headline}</h2>
        <p style={dekStyle}>{dek}</p>
      </header>
      {coverImageSrc ? (
        <img src={coverImageSrc} alt={coverImageAlt} style={coverImageStyle} />
      ) : (
        <div style={coverPlaceholderStyle} aria-hidden="true" />
      )}
      {sections.map((section, i) => {
        const [firstParagraph, ...restParagraphs] = section.paragraphs
        return (
          <div key={i} style={bodyStyle}>
            {section.subheading && <h3 style={subheadingStyle}>{section.subheading}</h3>}
            {firstParagraph && <p style={paragraphStyle}>{firstParagraph}</p>}
            {section.pullQuote && <blockquote style={pullQuoteStyle}>{section.pullQuote}</blockquote>}
            {restParagraphs.map((paragraph, j) => (
              <p key={j} style={paragraphStyle}>
                {paragraph}
              </p>
            ))}
          </div>
        )
      })}
    </article>
  )
}
