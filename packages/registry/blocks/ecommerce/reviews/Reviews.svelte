<script lang="ts">
  // Moderno block — Reviews (Svelte). Copy-paste; edit freely.
  // Customer reviews section: an aggregate rating summary (average, count, and a
  // per-star breakdown bar) alongside a list of individual review entries
  // (reviewer avatar/name, star rating, date, text). Composes the Avatar +
  // Badge + Card + Progress primitives + Moderno tokens. Star ratings render as
  // inline SVG stars, matching the Product Features inline-icon convention. No
  // new primitives, no bespoke interaction logic — purely presentational.
  import { Avatar, Badge, Card, Progress } from '@moderno/svelte'

  export interface ReviewsBreakdownItem {
    stars: number
    count: number
  }

  export interface ReviewEntry {
    name: string
    avatarSrc?: string
    initials?: string
    rating: number
    date: string
    text: string
    verified?: boolean
  }

  const STAR_PATH = 'M12 2.5l2.9 6 6.6.7-4.9 4.5 1.3 6.5L12 17l-5.9 3.2 1.3-6.5-4.9-4.5 6.6-.7L12 2.5Z'

  const DEFAULT_BREAKDOWN: ReviewsBreakdownItem[] = [
    { stars: 5, count: 86 },
    { stars: 4, count: 28 },
    { stars: 3, count: 10 },
    { stars: 2, count: 5 },
    { stars: 1, count: 3 },
  ]

  const DEFAULT_REVIEWS: ReviewEntry[] = [
    {
      name: 'Camila Restrepo',
      initials: 'CR',
      rating: 5,
      date: '3 de junio, 2026',
      text: 'La silla superó mis expectativas. El roble macizo se siente robusto y el acabado es precioso. Llegó bien empacada y el armado tomó menos de 10 minutos.',
      verified: true,
    },
    {
      name: 'Julián Torres',
      initials: 'JT',
      rating: 4,
      date: '22 de mayo, 2026',
      text: 'Muy buena relación calidad-precio. Le doy 4 estrellas porque el tono de la madera es un poco más claro que en las fotos, pero la calidad de construcción es excelente.',
      verified: true,
    },
    {
      name: 'Marcela Gómez',
      initials: 'MG',
      rating: 5,
      date: '8 de mayo, 2026',
      text: 'Segunda silla que compro de esta línea. Consistente en calidad, cómoda y el envío llegó antes de lo prometido.',
    },
  ]

  let {
    heading = 'Reseñas de clientes',
    averageRating = 4.6,
    reviewCount = 132,
    breakdown = DEFAULT_BREAKDOWN,
    reviews = DEFAULT_REVIEWS,
  }: {
    heading?: string
    averageRating?: number
    reviewCount?: number
    breakdown?: ReviewsBreakdownItem[]
    reviews?: ReviewEntry[]
  } = $props()

  function filledStars(rating: number): number {
    return Math.round(rating)
  }

  function percentage(count: number): number {
    return reviewCount > 0 ? Math.round((count / reviewCount) * 100) : 0
  }
</script>

<section class="md-reviews" aria-label={heading}>
  {#if heading}
    <h2 class="md-reviews__heading">{heading}</h2>
  {/if}
  <div class="md-reviews__wrapper">
    <div class="md-reviews__summary">
      <div class="md-reviews__average-block">
        <span class="md-reviews__average-number">{averageRating.toFixed(1)}</span>
        <span class="md-reviews__star-row" role="img" aria-label={`${averageRating} de 5 estrellas`}>
          {#each Array.from({ length: 5 }) as _, index (index)}
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill={index < filledStars(averageRating) ? 'currentColor' : 'none'}
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <path d={STAR_PATH}></path>
            </svg>
          {/each}
        </span>
        <span class="md-reviews__count-text">{reviewCount} reseñas</span>
      </div>
      <div class="md-reviews__breakdown-list">
        {#each breakdown as item (item.stars)}
          <div class="md-reviews__breakdown-row">
            <span class="md-reviews__breakdown-label">
              {item.stars}
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path d={STAR_PATH}></path>
              </svg>
            </span>
            <Progress value={percentage(item.count)} max={100} showValue={false} />
            <span class="md-reviews__breakdown-count">{item.count}</span>
          </div>
        {/each}
      </div>
    </div>
    <div class="md-reviews__list">
      {#each reviews as review, index (review.name ?? index)}
        <Card>
          <div class="md-reviews__review-header">
            <Avatar src={review.avatarSrc} initials={review.initials} alt={review.name} />
            <div class="md-reviews__reviewer-info">
              <span class="md-reviews__reviewer-name-row">
                <span class="md-reviews__reviewer-name">{review.name}</span>
                {#if review.verified}
                  <Badge variant="success">Compra verificada</Badge>
                {/if}
              </span>
              <span class="md-reviews__review-meta">
                <span class="md-reviews__star-row" role="img" aria-label={`${review.rating} de 5 estrellas`}>
                  {#each Array.from({ length: 5 }) as _, starIndex (starIndex)}
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill={starIndex < filledStars(review.rating) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      stroke-width="1.5"
                      aria-hidden="true"
                    >
                      <path d={STAR_PATH}></path>
                    </svg>
                  {/each}
                </span>
                <span class="md-reviews__review-date">{review.date}</span>
              </span>
            </div>
          </div>
          <p class="md-reviews__review-text">{review.text}</p>
        </Card>
      {/each}
    </div>
  </div>
</section>

<style>
  .md-reviews {
    padding: 48px 24px;
    background: var(--md-surface-base);
  }
  .md-reviews__heading {
    font-family: var(--md-font-serif);
    font-size: 28px;
    line-height: 1.15;
    color: var(--md-text-primary);
    text-align: center;
    margin: 0 0 24px;
  }
  .md-reviews__wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 40px;
    max-width: 1040px;
    margin: 0 auto;
    align-items: start;
  }
  .md-reviews__summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .md-reviews__average-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  .md-reviews__average-number {
    font-family: var(--md-font-serif);
    font-size: 40px;
    line-height: 1;
    color: var(--md-text-primary);
  }
  .md-reviews__star-row {
    display: inline-flex;
    gap: 2px;
    color: var(--md-warning);
  }
  .md-reviews__count-text {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
  }
  .md-reviews__breakdown-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .md-reviews__breakdown-row {
    display: grid;
    grid-template-columns: 28px 1fr 28px;
    align-items: center;
    gap: 10px;
  }
  .md-reviews__breakdown-label {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
  }
  .md-reviews__breakdown-count {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    text-align: right;
  }
  .md-reviews__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .md-reviews__review-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 10px;
  }
  .md-reviews__reviewer-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .md-reviews__reviewer-name-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .md-reviews__reviewer-name {
    font-size: var(--md-text-body-md);
    color: var(--md-text-primary);
    font-weight: 600;
  }
  .md-reviews__review-meta {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .md-reviews__review-date {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
  }
  .md-reviews__review-text {
    font-size: var(--md-text-body-sm);
    line-height: var(--md-text-body-sm-lh);
    color: var(--md-text-secondary);
    margin: 0;
  }
</style>
