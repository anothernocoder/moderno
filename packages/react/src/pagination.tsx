import { useId } from 'react'
import * as pagination from '@zag-js/pagination'
import { useMachine, normalizeProps } from '@zag-js/react'
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
export function Pagination({
  count,
  defaultPageSize,
  pageSize,
  onPageSizeChange,
  defaultPage,
  page,
  onPageChange,
  siblingCount,
  boundaryCount,
  translations,
}: PaginationProps) {
  const service = useMachine(pagination.machine, {
    id: useId(),
    count,
    defaultPageSize,
    pageSize,
    onPageSizeChange: onPageSizeChange ? (d) => onPageSizeChange(d.pageSize) : undefined,
    defaultPage,
    page,
    onPageChange: onPageChange ? (d) => onPageChange(d.page) : undefined,
    siblingCount,
    boundaryCount,
    translations,
  })
  const api = pagination.connect(service, normalizeProps)

  return (
    <nav {...api.getRootProps()} className={parts.pagination.root}>
      <button {...api.getPrevTriggerProps()} className={parts.pagination.prevTrigger}>
        ‹
      </button>
      {api.pages.map((p, index) =>
        p.type === 'page' ? (
          <button key={p.value} {...api.getItemProps(p)} className={parts.pagination.item}>
            {p.value}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} {...api.getEllipsisProps({ index })} className={parts.pagination.ellipsis}>
            &#8230;
          </span>
        ),
      )}
      <button {...api.getNextTriggerProps()} className={parts.pagination.nextTrigger}>
        ›
      </button>
    </nav>
  )
}
