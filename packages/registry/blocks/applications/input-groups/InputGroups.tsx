import { useState, type ChangeEvent, type CSSProperties, type FormEvent } from 'react'
import { Button, Input } from '@moderno/react'

export interface InputGroupsProps {
  website?: string
  price?: string
  apiKey?: string
  onCopyApiKey?: (value: string) => void
  search?: string
  onSearchSubmit?: (value: string) => void
}

const sectionStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--md-spacing-8)',
  maxWidth: '420px',
  padding: '24px',
  background: 'var(--md-surface-base)',
}
const labelStyle: CSSProperties = {
  display: 'block',
  fontSize: 'var(--md-text-label-md)',
  color: 'var(--md-text-primary)',
  marginBottom: 'var(--md-spacing-2)',
}
const groupStyle: CSSProperties = { display: 'flex', alignItems: 'stretch', width: '100%' }
const addonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 var(--md-spacing-4)',
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-strong)',
  color: 'var(--md-text-secondary)',
  fontSize: 'var(--md-text-body-sm)',
  whiteSpace: 'nowrap',
}
const inputFlexStyle: CSSProperties = { flex: 1, minWidth: 0 }

/**
 * Moderno block — InputGroups (React). Copy-paste; edit freely.
 * Composite inputs: a text prefix (URL), a prefix + suffix pair (currency amount),
 * an icon-button add-on (copy API key) and an input+button search combo. Uses the
 * Input + Button primitives + Moderno tokens; the "join" is pure CSS layout —
 * shared 1px borders between adjoining segments, no new primitives.
 */
export function InputGroups({
  website = 'mi-tienda',
  price = '129.900',
  apiKey = 'sk_live_4f2a9c1d8e6b0f3a',
  onCopyApiKey,
  search = '',
  onSearchSubmit,
}: InputGroupsProps) {
  const [websiteValue, setWebsiteValue] = useState(website)
  const [priceValue, setPriceValue] = useState(price)
  const [searchValue, setSearchValue] = useState(search)

  function handleWebsiteChange(event: ChangeEvent<HTMLInputElement>) {
    setWebsiteValue(event.currentTarget.value)
  }

  function handlePriceChange(event: ChangeEvent<HTMLInputElement>) {
    setPriceValue(event.currentTarget.value)
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.currentTarget.value)
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearchSubmit?.(searchValue)
  }

  return (
    <section style={sectionStyle}>
      {/* Prefix add-on */}
      <div>
        <span style={labelStyle}>Sitio web</span>
        <div style={groupStyle}>
          <span style={addonStyle}>https://</span>
          <div style={inputFlexStyle}>
            <Input
              aria-label="Sitio web"
              placeholder="tu-dominio.com"
              style={{ borderLeft: 'none' }}
              value={websiteValue}
              onChange={handleWebsiteChange}
            />
          </div>
        </div>
      </div>

      {/* Prefix + suffix add-ons */}
      <div>
        <span style={labelStyle}>Precio</span>
        <div style={groupStyle}>
          <span style={addonStyle}>$</span>
          <div style={inputFlexStyle}>
            <Input
              aria-label="Precio"
              inputMode="decimal"
              style={{ borderLeft: 'none', borderRight: 'none' }}
              value={priceValue}
              onChange={handlePriceChange}
            />
          </div>
          <span style={addonStyle}>MXN</span>
        </div>
      </div>

      {/* Icon-button add-on */}
      <div>
        <span style={labelStyle}>Llave de API</span>
        <div style={groupStyle}>
          <div style={inputFlexStyle}>
            <Input aria-label="Llave de API" readOnly style={{ borderRight: 'none' }} value={apiKey} />
          </div>
          <Button type="button" variant="secondary" aria-label="Copiar llave" onClick={() => onCopyApiKey?.(apiKey)}>
            ⧉
          </Button>
        </div>
      </div>

      {/* Input + button combo (search) */}
      <div>
        <span style={labelStyle}>Buscar</span>
        <form style={groupStyle} onSubmit={handleSearchSubmit}>
          <span style={addonStyle} aria-hidden="true">
            ⌕
          </span>
          <div style={inputFlexStyle}>
            <Input
              aria-label="Buscar"
              placeholder="Buscar productos…"
              style={{ borderLeft: 'none', borderRight: 'none' }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <Button type="submit" variant="primary">
            Buscar
          </Button>
        </form>
      </div>
    </section>
  )
}
