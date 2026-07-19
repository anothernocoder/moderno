<script lang="ts">
  import { portal } from '@zag-js/svelte'
  import { getDatePickerContext } from './date-picker-context'
  import DatePickerNavView from './DatePickerNavView.svelte'
  import { parts } from '@moderno/class-contract'

  const api = getDatePickerContext()
</script>

<div use:portal {...api().getPositionerProps()} class={parts.datepicker.positioner}>
  <div {...api().getContentProps()} class={parts.datepicker.content}>
    <!-- Day view -->
    <div {...api().getViewProps({ view: 'day' })}>
      <DatePickerNavView view="day" />
      <table {...api().getTableProps({ view: 'day' })} class={parts.datepicker.table}>
        <thead {...api().getTableHeadProps({ view: 'day' })} class={parts.datepicker.tableHead}>
          <tr {...api().getTableHeaderProps({ view: 'day' })} class={parts.datepicker.tableRow}>
            {#each api().weekDays as day, i (i)}
              <th scope="col" aria-label={day.long} class={parts.datepicker.tableHeader}>{day.narrow}</th>
            {/each}
          </tr>
        </thead>
        <tbody {...api().getTableBodyProps({ view: 'day' })}>
          {#each api().weeks as week, i (i)}
            <tr {...api().getTableRowProps({ view: 'day' })} class={parts.datepicker.tableRow}>
              {#each week as value, j (j)}
                <td {...api().getDayTableCellProps({ value })} class={parts.datepicker.tableCell}>
                  <div {...api().getDayTableCellTriggerProps({ value })} class={parts.datepicker.tableCellTrigger}>
                    {value.day}
                  </div>
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Month view -->
    <div {...api().getViewProps({ view: 'month' })}>
      <DatePickerNavView view="month" />
      <table {...api().getTableProps({ view: 'month', columns: 4 })} class={parts.datepicker.table}>
        <tbody {...api().getTableBodyProps({ view: 'month' })}>
          {#each api().getMonthsGrid({ columns: 4, format: 'short' }) as months, row (row)}
            <tr {...api().getTableRowProps({ view: 'month' })} class={parts.datepicker.tableRow}>
              {#each months as month, i (i)}
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
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Year view -->
    <div {...api().getViewProps({ view: 'year' })}>
      <DatePickerNavView view="year" />
      <table {...api().getTableProps({ view: 'year', columns: 4 })} class={parts.datepicker.table}>
        <tbody {...api().getTableBodyProps({ view: 'year' })}>
          {#each api().getYearsGrid({ columns: 4 }) as years, row (row)}
            <tr {...api().getTableRowProps({ view: 'year' })} class={parts.datepicker.tableRow}>
              {#each years as year, i (i)}
                <td {...api().getYearTableCellProps({ ...year, columns: 4 })} class={parts.datepicker.tableCell}>
                  <div
                    {...api().getYearTableCellTriggerProps({ ...year, columns: 4 })}
                    class={parts.datepicker.tableCellTrigger}
                  >
                    {year.label}
                  </div>
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
