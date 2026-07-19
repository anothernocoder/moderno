import { createMemo, createUniqueId, For, type JSX } from 'solid-js'
import { Portal } from 'solid-js/web'
import * as datepicker from '@zag-js/date-picker'
import { useMachine, normalizeProps } from '@zag-js/solid'
import { parts } from '@moderno/class-contract'
import { createPartContext } from './create-part-context'

type DatePickerApi = ReturnType<typeof datepicker.connect>
const { Provider: DatePickerProvider, usePart: useDatePicker } = createPartContext<DatePickerApi>('DatePicker')

export interface DatePickerRootProps {
  /** `'single'` picks one date, `'range'` picks a start/end pair. */
  selectionMode?: 'single' | 'range'
  /** Uncontrolled initial date(s), as ISO 8601 strings (`'2024-01-15'`). */
  defaultValue?: string[]
  /** Controlled selected date(s), as ISO 8601 strings. */
  value?: string[]
  onValueChange?: (value: string[]) => void
  /** Earliest selectable date (ISO 8601). */
  min?: string
  /** Latest selectable date (ISO 8601). */
  max?: string
  disabled?: boolean
  locale?: string
  /** `0` (Sunday) through `6` (Saturday). */
  startOfWeek?: number
  children: JSX.Element
}

function Root(props: DatePickerRootProps) {
  const service = useMachine(datepicker.machine, {
    id: createUniqueId(),
    get selectionMode() {
      return props.selectionMode
    },
    get defaultValue() {
      return props.defaultValue?.map((d) => datepicker.parse(d))
    },
    get value() {
      return props.value?.map((d) => datepicker.parse(d))
    },
    get min() {
      return props.min ? datepicker.parse(props.min) : undefined
    },
    get max() {
      return props.max ? datepicker.parse(props.max) : undefined
    },
    get disabled() {
      return props.disabled
    },
    get locale() {
      return props.locale
    },
    get startOfWeek() {
      return props.startOfWeek
    },
    onValueChange: (d) => props.onValueChange?.(d.valueAsString),
  })
  const api = createMemo(() => datepicker.connect(service, normalizeProps))
  return (
    <DatePickerProvider value={api}>
      <div {...api().getRootProps()} class={parts.datepicker.root}>
        {props.children}
      </div>
    </DatePickerProvider>
  )
}

function Label(props: { children: JSX.Element }) {
  const api = useDatePicker('Label')
  return (
    <label {...api().getLabelProps()} class={parts.datepicker.label}>
      {props.children}
    </label>
  )
}

function Control(props: { children: JSX.Element }) {
  const api = useDatePicker('Control')
  return (
    <div {...api().getControlProps()} class={parts.datepicker.control}>
      {props.children}
    </div>
  )
}

function Input(props: { index?: number } = {}) {
  const api = useDatePicker('Input')
  return <input {...api().getInputProps({ index: props.index })} class={parts.datepicker.input} />
}

function Trigger(props: { children?: JSX.Element } = {}) {
  const api = useDatePicker('Trigger')
  return (
    <button {...api().getTriggerProps()} class={parts.datepicker.trigger}>
      {props.children ?? '🗓'}
    </button>
  )
}

function ClearTrigger(props: { children?: JSX.Element } = {}) {
  const api = useDatePicker('ClearTrigger')
  return (
    <button {...api().getClearTriggerProps()} class={parts.datepicker.clearTrigger}>
      {props.children ?? '✕'}
    </button>
  )
}

function NavView(props: { view: datepicker.DateView }) {
  const api = useDatePicker('Content')
  return (
    <div {...api().getViewControlProps({ view: props.view })} class={parts.datepicker.viewControl}>
      <button {...api().getPrevTriggerProps({ view: props.view })} class={parts.datepicker.prevTrigger}>
        ‹
      </button>
      {props.view === 'year' ? (
        <span class={parts.datepicker.viewTrigger}>
          {api().getDecade().start}–{api().getDecade().end}
        </span>
      ) : (
        <button {...api().getViewTriggerProps({ view: props.view })} class={parts.datepicker.viewTrigger}>
          {props.view === 'day' ? api().visibleRangeText.start : api().visibleRange.start.year}
        </button>
      )}
      <button {...api().getNextTriggerProps({ view: props.view })} class={parts.datepicker.nextTrigger}>
        ›
      </button>
    </div>
  )
}

function DayView() {
  const api = useDatePicker('Content')
  return (
    <div {...api().getViewProps({ view: 'day' })}>
      <NavView view="day" />
      <table {...api().getTableProps({ view: 'day' })} class={parts.datepicker.table}>
        <thead {...api().getTableHeadProps({ view: 'day' })} class={parts.datepicker.tableHead}>
          <tr {...api().getTableHeaderProps({ view: 'day' })} class={parts.datepicker.tableRow}>
            <For each={api().weekDays}>
              {(day) => (
                <th scope="col" aria-label={day.long} class={parts.datepicker.tableHeader}>
                  {day.narrow}
                </th>
              )}
            </For>
          </tr>
        </thead>
        <tbody {...api().getTableBodyProps({ view: 'day' })}>
          <For each={api().weeks}>
            {(week) => (
              <tr {...api().getTableRowProps({ view: 'day' })} class={parts.datepicker.tableRow}>
                <For each={week}>
                  {(value) => (
                    <td {...api().getDayTableCellProps({ value })} class={parts.datepicker.tableCell}>
                      <div {...api().getDayTableCellTriggerProps({ value })} class={parts.datepicker.tableCellTrigger}>
                        {value.day}
                      </div>
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  )
}

function MonthView() {
  const api = useDatePicker('Content')
  return (
    <div {...api().getViewProps({ view: 'month' })}>
      <NavView view="month" />
      <table {...api().getTableProps({ view: 'month', columns: 4 })} class={parts.datepicker.table}>
        <tbody {...api().getTableBodyProps({ view: 'month' })}>
          <For each={api().getMonthsGrid({ columns: 4, format: 'short' })}>
            {(months) => (
              <tr {...api().getTableRowProps({ view: 'month' })} class={parts.datepicker.tableRow}>
                <For each={months}>
                  {(month) => (
                    <td
                      {...api().getMonthTableCellProps({ ...month, columns: 4 })}
                      class={parts.datepicker.tableCell}
                    >
                      <div
                        {...api().getMonthTableCellTriggerProps({ ...month, columns: 4 })}
                        class={parts.datepicker.tableCellTrigger}
                      >
                        {month.label}
                      </div>
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  )
}

function YearView() {
  const api = useDatePicker('Content')
  return (
    <div {...api().getViewProps({ view: 'year' })}>
      <NavView view="year" />
      <table {...api().getTableProps({ view: 'year', columns: 4 })} class={parts.datepicker.table}>
        <tbody {...api().getTableBodyProps({ view: 'year' })}>
          <For each={api().getYearsGrid({ columns: 4 })}>
            {(years) => (
              <tr {...api().getTableRowProps({ view: 'year' })} class={parts.datepicker.tableRow}>
                <For each={years}>
                  {(year) => (
                    <td {...api().getYearTableCellProps({ ...year, columns: 4 })} class={parts.datepicker.tableCell}>
                      <div
                        {...api().getYearTableCellTriggerProps({ ...year, columns: 4 })}
                        class={parts.datepicker.tableCellTrigger}
                      >
                        {year.label}
                      </div>
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  )
}

function Content() {
  const api = useDatePicker('Content')
  return (
    <Portal>
      <div {...api().getPositionerProps()} class={parts.datepicker.positioner}>
        <div {...api().getContentProps()} class={parts.datepicker.content}>
          <DayView />
          <MonthView />
          <YearView />
        </div>
      </div>
    </Portal>
  )
}

/**
 * Compositional DatePicker (ADR-0003): parts share one Zag `date-picker`
 * machine via Solid context. `Content` renders the full day/month/year
 * calendar internally — its structure doesn't vary per consumer the way
 * `Select.Item` does, so it isn't split into further public parts.
 */
export const DatePicker = { Root, Label, Control, Input, Trigger, ClearTrigger, Content }
