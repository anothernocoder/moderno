<script lang="ts">
  import * as pagination from '@zag-js/pagination'
  import { useMachine, normalizeProps } from '@zag-js/svelte'
  import { parts } from '@moderno/class-contract'

  let {
    count,
    defaultPageSize,
    pageSize,
    onPageSizeChange,
    defaultPage,
    page = $bindable(),
    onPageChange,
    siblingCount,
    boundaryCount,
    translations,
  }: {
    count: number
    defaultPageSize?: number
    pageSize?: number
    onPageSizeChange?: (pageSize: number) => void
    defaultPage?: number
    page?: number
    onPageChange?: (page: number) => void
    siblingCount?: number
    boundaryCount?: number
    translations?: pagination.IntlTranslations
  } = $props()

  const id = $props.id()
  const service = useMachine(pagination.machine, {
    id,
    get count() {
      return count
    },
    get defaultPageSize() {
      return defaultPageSize
    },
    get pageSize() {
      return pageSize
    },
    onPageSizeChange(d) {
      onPageSizeChange?.(d.pageSize)
    },
    get defaultPage() {
      return defaultPage
    },
    get page() {
      return page
    },
    onPageChange(d) {
      page = d.page
      onPageChange?.(d.page)
    },
    get siblingCount() {
      return siblingCount
    },
    get boundaryCount() {
      return boundaryCount
    },
    get translations() {
      return translations
    },
  })
  const api = $derived(pagination.connect(service, normalizeProps))
</script>

<nav {...api.getRootProps()} class={parts.pagination.root}>
  <button {...api.getPrevTriggerProps()} class={parts.pagination.prevTrigger}>‹</button>
  {#each api.pages as p, index (p.type === 'page' ? `page-${p.value}` : `ellipsis-${index}`)}
    {#if p.type === 'page'}
      <button {...api.getItemProps(p)} class={parts.pagination.item}>{p.value}</button>
    {:else}
      <span {...api.getEllipsisProps({ index })} class={parts.pagination.ellipsis}>&#8230;</span>
    {/if}
  {/each}
  <button {...api.getNextTriggerProps()} class={parts.pagination.nextTrigger}>›</button>
</nav>
