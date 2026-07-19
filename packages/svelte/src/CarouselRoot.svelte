<script lang="ts">
  import type { Snippet } from 'svelte'
  import { onMount } from 'svelte'
  import * as carousel from '@zag-js/carousel'
  import { useMachine, normalizeProps } from '@zag-js/svelte'
  import { setCarouselContext } from './carousel-context'
  import { parts } from '@moderno/class-contract'

  let {
    slideCount,
    orientation,
    page = $bindable(),
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
  }: {
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
    children?: Snippet
  } = $props()

  const id = $props.id()
  const service = useMachine(carousel.machine, {
    id,
    get slideCount() {
      return slideCount
    },
    get orientation() {
      return orientation
    },
    get page() {
      return page
    },
    get defaultPage() {
      return defaultPage
    },
    onPageChange(d) {
      page = d.page
      onPageChange?.(d.page)
    },
    get loop() {
      return loop
    },
    get slidesPerPage() {
      return slidesPerPage
    },
    get slidesPerMove() {
      return slidesPerMove
    },
    get autoSize() {
      return autoSize
    },
    get allowMouseDrag() {
      return allowMouseDrag
    },
    get autoplay() {
      return autoplay
    },
    get spacing() {
      return spacing
    },
    get padding() {
      return padding
    },
    get translations() {
      return translations
    },
  })
  const api = $derived(carousel.connect(service, normalizeProps))
  setCarouselContext(() => api)

  let rootEl: HTMLDivElement | undefined
  // Zag measures scroll-snap positions once on mount. If the root starts
  // hidden (e.g. an inactive tab panel) that measurement sees a zero-width
  // container and never gets recomputed once the tab is shown. A
  // ResizeObserver on the root re-runs the machine's own refresh() whenever
  // its size settles, independent of Zag's internal item-group observer.
  onMount(() => {
    if (!rootEl) return
    const observer = new ResizeObserver(() => api.refresh())
    observer.observe(rootEl)
    return () => observer.disconnect()
  })
</script>

<div {...api.getRootProps()} bind:this={rootEl} class={parts.carousel.root}>{@render children?.()}</div>
