import { useId, useMemo, type ReactNode } from 'react'
import * as datepicker from '@zag-js/date-picker'
import { useMachine, normalizeProps, Portal } from '@zag-js/react'
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
  children: ReactNode
}

function Root({
  selectionMode,
  defaultValue,
  value,
  onValueChange,
  min,
  max,
  disabled,
  locale,
  startOfWeek,
  children,
}: DatePickerRootProps) {
  const parsedDefaultValue = useMemo(() => defaultValue?.map((d) => datepicker.parse(d)), [defaultValue])
  const parsedValue = useMemo(() => value?.map((d) => datepicker.parse(d)), [value])
  const parsedMin = useMemo(() => (min ? datepicker.parse(min) : undefined), [min])
  const parsedMax = useMemo(() => (max ? datepicker.parse(max) : undefined), [max])

  const service = useMachine(datepicker.machine, {
    id: useId(),
    selectionMode,
    defaultValue: parsedDefaultValue,
    value: parsedValue,
    min: parsedMin,
    max: parsedMax,
    disabled,
    locale,
    startOfWeek,
    onValueChange: onValueChange ? (d) => onValueChange(d.valueAsString) : undefined,
  })
  const api = datepicker.connect(service, normalizeProps)

  return (
    <DatePickerProvider value={api}>
      <div {...api.getRootProps()} className={parts.datepicker.root}>
        {children}
      </div>
    </DatePickerProvider>
  )
}

function Label({ children }: { children: ReactNode }) {
  const api = useDatePicker('Label')
  return (
    <label {...api.getLabelProps()} className={parts.datepicker.label}>
      {children}
    </label>
  )
}

function Control({ children }: { children: ReactNode }) {
  const api = useDatePicker('Control')
  return (
    <div {...api.getControlProps()} className={parts.datepicker.control}>
      {children}
    </div>
  )
}

function Input({ index }: { index?: number } = {}) {
  const api = useDatePicker('Input')
  return <input {...api.getInputProps({ index })} className={parts.datepicker.input} />
}

function Trigger({ children }: { children?: ReactNode } = {}) {
  const api = useDatePicker('Trigger')
  return (
    <button {...api.getTriggerProps()} className={parts.datepicker.trigger}>
      {children ?? '🗓'}
    </button>
  )
}

function ClearTrigger({ children }: { children?: ReactNode } = {}) {
  const api = useDatePicker('ClearTrigger')
  return (
    <button {...api.getClearTriggerProps()} className={parts.datepicker.clearTrigger}>
      {children ?? '✕'}
    </button>
  )
}

function NavView({ view }: { view: datepicker.DateView }) {
  const api = useDatePicker('Content')
  return (
    <div {...api.getViewControlProps({ view })} className={parts.datepicker.viewControl}>
      <button {...api.getPrevTriggerProps({ view })} className={parts.datepicker.prevTrigger}>
        ‹
      </button>
      {view === 'year' ? (
        <span className={parts.datepicker.viewTrigger}>
          {api.getDecade().start}–{api.getDecade().end}
        </span>
      ) : (
        <button {...api.getViewTriggerProps({ view })} className={parts.datepicker.viewTrigger}>
          {view === 'day' ? api.visibleRangeText.start : api.visibleRange.start.year}
        </button>
      )}
      <button {...api.getNextTriggerProps({ view })} className={parts.datepicker.nextTrigger}>
        ›
      </button>
    </div>
  )
}

function DayView() {
  const api = useDatePicker('Content')
  return (
    <div {...api.getViewProps({ view: 'day' })}>
      <NavView view="day" />
      <table {...api.getTableProps({ view: 'day' })} className={parts.datepicker.table}>
        <thead {...api.getTableHeadProps({ view: 'day' })} className={parts.datepicker.tableHead}>
          <tr {...api.getTableHeaderProps({ view: 'day' })} className={parts.datepicker.tableRow}>
            {api.weekDays.map((day, i) => (
              <th key={i} scope="col" aria-label={day.long} className={parts.datepicker.tableHeader}>
                {day.narrow}
              </th>
            ))}
          </tr>
        </thead>
        <tbody {...api.getTableBodyProps({ view: 'day' })}>
          {api.weeks.map((week, i) => (
            <tr key={i} {...api.getTableRowProps({ view: 'day' })} className={parts.datepicker.tableRow}>
              {week.map((value, j) => (
                <td key={j} {...api.getDayTableCellProps({ value })} className={parts.datepicker.tableCell}>
                  <div {...api.getDayTableCellTriggerProps({ value })} className={parts.datepicker.tableCellTrigger}>
                    {value.day}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MonthView() {
  const api = useDatePicker('Content')
  return (
    <div {...api.getViewProps({ view: 'month' })}>
      <NavView view="month" />
      <table {...api.getTableProps({ view: 'month', columns: 4 })} className={parts.datepicker.table}>
        <tbody {...api.getTableBodyProps({ view: 'month' })}>
          {api.getMonthsGrid({ columns: 4, format: 'short' }).map((months, row) => (
            <tr key={row} {...api.getTableRowProps({ view: 'month' })} className={parts.datepicker.tableRow}>
              {months.map((month, i) => (
                <td
                  key={i}
                  {...api.getMonthTableCellProps({ ...month, columns: 4 })}
                  className={parts.datepicker.tableCell}
                >
                  <div
                    {...api.getMonthTableCellTriggerProps({ ...month, columns: 4 })}
                    className={parts.datepicker.tableCellTrigger}
                  >
                    {month.label}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function YearView() {
  const api = useDatePicker('Content')
  return (
    <div {...api.getViewProps({ view: 'year' })}>
      <NavView view="year" />
      <table {...api.getTableProps({ view: 'year', columns: 4 })} className={parts.datepicker.table}>
        <tbody {...api.getTableBodyProps({ view: 'year' })}>
          {api.getYearsGrid({ columns: 4 }).map((years, row) => (
            <tr key={row} {...api.getTableRowProps({ view: 'year' })} className={parts.datepicker.tableRow}>
              {years.map((year, i) => (
                <td
                  key={i}
                  {...api.getYearTableCellProps({ ...year, columns: 4 })}
                  className={parts.datepicker.tableCell}
                >
                  <div
                    {...api.getYearTableCellTriggerProps({ ...year, columns: 4 })}
                    className={parts.datepicker.tableCellTrigger}
                  >
                    {year.label}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Content() {
  const api = useDatePicker('Content')
  return (
    <Portal>
      <div {...api.getPositionerProps()} className={parts.datepicker.positioner}>
        <div {...api.getContentProps()} className={parts.datepicker.content}>
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
 * machine via context. `Content` renders the full day/month/year calendar
 * internally — its structure doesn't vary per consumer the way `Select.Item`
 * does, so it isn't split into further public parts.
 */
export const DatePicker = { Root, Label, Control, Input, Trigger, ClearTrigger, Content }
