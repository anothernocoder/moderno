import type * as carousel from '@zag-js/carousel'
import { createPartContext } from './create-part-context'

type CarouselApi = ReturnType<typeof carousel.connect>

/** Root stores a getter so children read the live $derived api reactively. */
export const { set: setCarouselContext, get: getCarouselContext } = createPartContext<() => CarouselApi>('Carousel')
