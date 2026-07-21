<script setup lang="ts">
// Moderno block — Logos (Vue). Copy-paste; edit freely.
// Trusted-by section: small centered kicker above a wrapped, centered row of partner/customer logos.
// Uses plain composition + Moderno tokens, no primitives.

export interface LogoItem {
  name: string
  src?: string
  href?: string
}

const DEFAULT_LOGOS: LogoItem[] = [
  { name: 'Nimbus' },
  { name: 'Kairos' },
  { name: 'Vela' },
  { name: 'Orbit' },
  { name: 'Halcyon' },
  { name: 'Fenwick' },
]

const props = withDefaults(
  defineProps<{
    kicker?: string
    items?: LogoItem[]
  }>(),
  {
    kicker: 'Con la confianza de equipos de todos los tamaños',
  },
)

const items = props.items ?? DEFAULT_LOGOS
</script>

<template>
  <section class="md-logos">
    <p class="md-logos__kicker">{{ kicker }}</p>
    <div class="md-logos__row">
      <template v-for="item in items" :key="item.name">
        <a v-if="item.href" :href="item.href">
          <img v-if="item.src" :src="item.src" :alt="item.name" class="md-logos__img" />
          <span v-else class="md-logos__wordmark">{{ item.name }}</span>
        </a>
        <span v-else>
          <img v-if="item.src" :src="item.src" :alt="item.name" class="md-logos__img" />
          <span v-else class="md-logos__wordmark">{{ item.name }}</span>
        </span>
      </template>
    </div>
  </section>
</template>

<style scoped>
.md-logos {
  padding: 96px 24px;
  background: var(--md-surface-base);
}
.md-logos__kicker {
  font-size: var(--md-text-label-sm);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--md-text-secondary);
  text-align: center;
  margin: 0 auto 40px;
}
.md-logos__row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 48px;
  max-width: 960px;
  margin: 0 auto;
}
.md-logos__img {
  filter: grayscale(1);
  opacity: 0.6;
  height: 28px;
}
.md-logos__wordmark {
  color: var(--md-text-secondary);
  font-weight: 600;
  letter-spacing: 0.02em;
  font-size: var(--md-text-label-md);
  text-transform: uppercase;
}
</style>
