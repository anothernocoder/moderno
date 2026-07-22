import { createSignal, type JSX } from 'solid-js'
import { Button, Input } from '@moderno/solid'

export interface InputGroupsProps {
  website?: string
  price?: string
  apiKey?: string
  onCopyApiKey?: (value: string) => void
  search?: string
  onSearchSubmit?: (value: string) => void
}

const sectionStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-direction': 'column',
  gap: 'var(--md-spacing-8)',
  'max-width': '420px',
  padding: '24px',
  background: 'var(--md-surface-base)',
}
const labelStyle: JSX.CSSProperties = {
  display: 'block',
  'font-size': 'var(--md-text-label-md)',
  color: 'var(--md-text-primary)',
  'margin-bottom': 'var(--md-spacing-2)',
}
const groupStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'stretch', width: '100%' }
const addonStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  padding: '0 var(--md-spacing-4)',
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-strong)',
  color: 'var(--md-text-secondary)',
  'font-size': 'var(--md-text-body-sm)',
  'white-space': 'nowrap',
}
const inputFlexStyle: JSX.CSSProperties = { flex: 1, 'min-width': 0 }

/**
 * Moderno block — InputGroups (Solid). Copy-paste; edit freely.
 * Composite inputs: a text prefix (URL), a prefix + suffix pair (currency amount),
 * an icon-button add-on (copy API key) and an input+button search combo. Uses the
 * Input + Button primitives + Moderno tokens; the "join" is pure CSS layout —
 * shared 1px borders between adjoining segments, no new primitives.
 */
export function InputGroups(props: InputGroupsProps) {
  const [websiteValue, setWebsiteValue] = createSignal(props.website ?? 'mi-tienda')
  const [priceValue, setPriceValue] = createSignal(props.price ?? '129.900')
  const [searchValue, setSearchValue] = createSignal(props.search ?? '')
  const apiKey = () => props.apiKey ?? 'sk_live_4f2a9c1d8e6b0f3a'

  function handleSearchSubmit(event: SubmitEvent) {
    event.preventDefault()
    props.onSearchSubmit?.(searchValue())
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
              style={{ 'border-left': 'none' }}
              value={websiteValue()}
              onInput={(event) => setWebsiteValue(event.currentTarget.value)}
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
              style={{ 'border-left': 'none', 'border-right': 'none' }}
              value={priceValue()}
              onInput={(event) => setPriceValue(event.currentTarget.value)}
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
            <Input aria-label="Llave de API" readOnly style={{ 'border-right': 'none' }} value={apiKey()} />
          </div>
          <Button
            type="button"
            variant="secondary"
            aria-label="Copiar llave"
            onClick={() => props.onCopyApiKey?.(apiKey())}
          >
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
              style={{ 'border-left': 'none', 'border-right': 'none' }}
              value={searchValue()}
              onInput={(event) => setSearchValue(event.currentTarget.value)}
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
