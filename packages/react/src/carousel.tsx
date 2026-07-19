import { useEffect, useId, useRef, type ReactNode } from 'react'
import * as carousel from '@zag-js/carousel'
import { useMachine, normalizeProps } from '@zag-js/react'
import { parts } from '@moderno/class-contract'
import { createPartContext } from './create-part-context'

type CarouselApi = ReturnType<typeof carousel.connect>
const { Provider: CarouselProvider, usePart: useCarousel } = createPartContext<CarouselApi>('Carousel')

export interface CarouselRootProps {
  /** The total number of slides. */
  slideCount: number
  /** @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical'
  /** Controlled page. */
  page?: number
  /** Uncontrolled initial page. */
  defaultPage?: number
  onPageChange?: (page: number) => void
  /** Whether the carousel should loop around. */
  loop?: boolean
  /** The number of slides to show at a time. */
  slidesPerPage?: number
  /** The number of slides to scroll at a time. */
  slidesPerMove?: number | 'auto'
  /** Whether to enable variable width slides. */
  autoSize?: boolean
  /** Whether to allow scrolling via dragging with mouse. */
  allowMouseDrag?: boolean
  /** Whether to scroll automatically, or the autoplay delay in ms. */
  autoplay?: boolean | { delay: number }
  /** The amount of space between items. */
  spacing?: string
  /** Extra space around the scrollable area so neighboring items stay partially in view. */
  padding?: string
  /** Localized a11y messages for the prev/next triggers, items and indicators. */
  translations?: carousel.IntlTranslations
  children: ReactNode
}

function Root({
  slideCount,
  orientation,
  page,
  defaultPage,
  onPageChange,
  loop,
  slidesPerPage,
  slidesPerMove,
  autoSize,
  allowMouseDrag,
  autoplay,
  spacing,
  padding,
  translations,
  children,
}: CarouselRootProps) {
  const service = useMachine(carousel.machine, {
    id: useId(),
    slideCount,
    orientation,
    page,
    defaultPage,
    onPageChange: onPageChange ? (d) => onPageChange(d.page) : undefined,
    loop,
    slidesPerPage,
    slidesPerMove,
    autoSize,
    allowMouseDrag,
    autoplay,
    spacing,
    padding,
    translations,
  })
  const api = carousel.connect(service, normalizeProps)
  const rootRef = useRef<HTMLDivElement>(null)
  // Zag measures scroll-snap positions once on mount. If the root starts
  // hidden (e.g. an inactive tab panel) that measurement sees a zero-width
  // container and never gets recomputed once the tab is shown. A
  // ResizeObserver on the root re-runs the machine's own refresh() whenever
  // its size settles, independent of Zag's internal item-group observer.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new ResizeObserver(() => api.refresh())
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <CarouselProvider value={api}>
      <div {...api.getRootProps()} ref={rootRef} className={parts.carousel.root}>
        {children}
      </div>
    </CarouselProvider>
  )
}

function Control({ children }: { children: ReactNode }) {
  const api = useCarousel('Control')
  return (
    <div {...api.getControlProps()} className={parts.carousel.control}>
      {children}
    </div>
  )
}

function PrevTrigger({ children }: { children?: ReactNode }) {
  const api = useCarousel('PrevTrigger')
  return (
    <button {...api.getPrevTriggerProps()} className={parts.carousel.prevTrigger}>
      {children ?? '‹'}
    </button>
  )
}

function NextTrigger({ children }: { children?: ReactNode }) {
  const api = useCarousel('NextTrigger')
  return (
    <button {...api.getNextTriggerProps()} className={parts.carousel.nextTrigger}>
      {children ?? '›'}
    </button>
  )
}

function ItemGroup({ children }: { children: ReactNode }) {
  const api = useCarousel('ItemGroup')
  return (
    <div {...api.getItemGroupProps()} className={parts.carousel.itemGroup}>
      {children}
    </div>
  )
}

function Item({ index, children }: { index: number; children: ReactNode }) {
  const api = useCarousel('Item')
  return (
    <div {...api.getItemProps({ index })} className={parts.carousel.item}>
      {children}
    </div>
  )
}

function IndicatorGroup({ children }: { children: (index: number) => ReactNode }) {
  const api = useCarousel('IndicatorGroup')
  return (
    <div {...api.getIndicatorGroupProps()} className={parts.carousel.indicatorGroup}>
      {api.pageSnapPoints.map((_, index) => children(index))}
    </div>
  )
}

function Indicator({ index }: { index: number }) {
  const api = useCarousel('Indicator')
  return <button {...api.getIndicatorProps({ index })} className={parts.carousel.indicator} />
}

/** Compositional Carousel (ADR-0003): anatomy parts share one Zag machine via context. */
export const Carousel = { Root, Control, PrevTrigger, NextTrigger, ItemGroup, Item, IndicatorGroup, Indicator }
