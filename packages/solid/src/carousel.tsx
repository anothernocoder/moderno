import { createMemo, createUniqueId, For, onCleanup, onMount, type JSX } from 'solid-js'
import * as carousel from '@zag-js/carousel'
import { useMachine, normalizeProps } from '@zag-js/solid'
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
  children: JSX.Element
}

function Root(props: CarouselRootProps) {
  const service = useMachine(carousel.machine, {
    id: createUniqueId(),
    get slideCount() {
      return props.slideCount
    },
    get orientation() {
      return props.orientation
    },
    get page() {
      return props.page
    },
    get defaultPage() {
      return props.defaultPage
    },
    onPageChange: (d) => props.onPageChange?.(d.page),
    get loop() {
      return props.loop
    },
    get slidesPerPage() {
      return props.slidesPerPage
    },
    get slidesPerMove() {
      return props.slidesPerMove
    },
    get autoSize() {
      return props.autoSize
    },
    get allowMouseDrag() {
      return props.allowMouseDrag
    },
    get autoplay() {
      return props.autoplay
    },
    get spacing() {
      return props.spacing
    },
    get padding() {
      return props.padding
    },
    get translations() {
      return props.translations
    },
  })
  const api = createMemo(() => carousel.connect(service, normalizeProps))
  let rootEl: HTMLDivElement | undefined
  // Zag measures scroll-snap positions once on mount. If the root starts
  // hidden (e.g. an inactive tab panel) that measurement sees a zero-width
  // container and never gets recomputed once the tab is shown. A
  // ResizeObserver on the root re-runs the machine's own refresh() whenever
  // its size settles, independent of Zag's internal item-group observer.
  onMount(() => {
    if (!rootEl) return
    const observer = new ResizeObserver(() => api().refresh())
    observer.observe(rootEl)
    onCleanup(() => observer.disconnect())
  })
  return (
    <CarouselProvider value={api}>
      <div {...api().getRootProps()} ref={rootEl} class={parts.carousel.root}>
        {props.children}
      </div>
    </CarouselProvider>
  )
}

function Control(props: { children: JSX.Element }) {
  const api = useCarousel('Control')
  return (
    <div {...api().getControlProps()} class={parts.carousel.control}>
      {props.children}
    </div>
  )
}

function PrevTrigger(props: { children?: JSX.Element }) {
  const api = useCarousel('PrevTrigger')
  return (
    <button {...api().getPrevTriggerProps()} class={parts.carousel.prevTrigger}>
      {props.children ?? '‹'}
    </button>
  )
}

function NextTrigger(props: { children?: JSX.Element }) {
  const api = useCarousel('NextTrigger')
  return (
    <button {...api().getNextTriggerProps()} class={parts.carousel.nextTrigger}>
      {props.children ?? '›'}
    </button>
  )
}

function ItemGroup(props: { children: JSX.Element }) {
  const api = useCarousel('ItemGroup')
  return (
    <div {...api().getItemGroupProps()} class={parts.carousel.itemGroup}>
      {props.children}
    </div>
  )
}

function Item(props: { index: number; children: JSX.Element }) {
  const api = useCarousel('Item')
  return (
    <div {...api().getItemProps({ index: props.index })} class={parts.carousel.item}>
      {props.children}
    </div>
  )
}

function IndicatorGroup(props: { children: (index: number) => JSX.Element }) {
  const api = useCarousel('IndicatorGroup')
  return (
    <div {...api().getIndicatorGroupProps()} class={parts.carousel.indicatorGroup}>
      <For each={api().pageSnapPoints}>{(_, index) => props.children(index())}</For>
    </div>
  )
}

function Indicator(props: { index: number }) {
  const api = useCarousel('Indicator')
  return <button {...api().getIndicatorProps({ index: props.index })} class={parts.carousel.indicator} />
}

/** Compositional Carousel (ADR-0003): anatomy parts share one Zag machine via Solid context. */
export const Carousel = { Root, Control, PrevTrigger, NextTrigger, ItemGroup, Item, IndicatorGroup, Indicator }
