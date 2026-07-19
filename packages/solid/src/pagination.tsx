import { For, Show, createMemo, createUniqueId } from 'solid-js'
import * as pagination from '@zag-js/pagination'
import { useMachine, normalizeProps } from '@zag-js/solid'
import { parts } from '@moderno/class-contract'

export interface PaginationProps {
  /** Total number of data items. */
  count: number
  /** Uncontrolled initial number of items per page. @default 10 */
  defaultPageSize?: number
  /** Controlled number of items per page. */
  pageSize?: number
  onPageSizeChange?: (pageSize: number) => void
  /** Uncontrolled initial active page. @default 1 */
  defaultPage?: number
  /** Controlled active page. */
  page?: number
  onPageChange?: (page: number) => void
  /** Number of pages to show beside the active page. @default 1 */
  siblingCount?: number
  /** Number of pages to show at the start and end. @default 1 */
  boundaryCount?: number
  /** Localized strings for the accessibility labels. */
  translations?: pagination.IntlTranslations
}

/** Closed-prop Pagination (ADR-0003) over the Zag pagination machine. Page-by-page navigation. */
export function Pagination(props: PaginationProps) {
  const service = useMachine(pagination.machine, {
    id: createUniqueId(),
    get count() {
      return props.count
    },
    get defaultPageSize() {
      return props.defaultPageSize
    },
    get pageSize() {
      return props.pageSize
    },
    onPageSizeChange: (d) => props.onPageSizeChange?.(d.pageSize),
    get defaultPage() {
      return props.defaultPage
    },
    get page() {
      return props.page
    },
    onPageChange: (d) => props.onPageChange?.(d.page),
    get siblingCount() {
      return props.siblingCount
    },
    get boundaryCount() {
      return props.boundaryCount
    },
    get translations() {
      return props.translations
    },
  })
  const api = createMemo(() => pagination.connect(service, normalizeProps))

  return (
    <nav {...api().getRootProps()} class={parts.pagination.root}>
      <button {...api().getPrevTriggerProps()} class={parts.pagination.prevTrigger}>
        ‹
      </button>
      <For each={api().pages}>
        {(p, index) => (
          <Show
            when={p.type === 'page' ? p : undefined}
            fallback={
              <span {...api().getEllipsisProps({ index: index() })} class={parts.pagination.ellipsis}>
                &#8230;
              </span>
            }
          >
            {(item) => (
              <button {...api().getItemProps(item())} class={parts.pagination.item}>
                {item().value}
              </button>
            )}
          </Show>
        )}
      </For>
      <button {...api().getNextTriggerProps()} class={parts.pagination.nextTrigger}>
        ›
      </button>
    </nav>
  )
}
