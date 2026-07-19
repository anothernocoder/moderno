<script setup lang="ts">
import { useDatePicker } from './date-picker-context'
import DatePickerNavView from './DatePickerNavView.vue'
import { parts } from '@moderno/class-contract'

// Content is teleported to the body; trigger stays in flow.
defineOptions({ inheritAttrs: false })
const api = useDatePicker('Content')
</script>

<template>
  <Teleport to="body">
    <div v-bind="api.getPositionerProps()" :class="parts.datepicker.positioner">
      <div v-bind="api.getContentProps()" :class="parts.datepicker.content">
        <!-- Day view -->
        <div v-bind="api.getViewProps({ view: 'day' })">
          <DatePickerNavView view="day" />
          <table v-bind="api.getTableProps({ view: 'day' })" :class="parts.datepicker.table">
            <thead v-bind="api.getTableHeadProps({ view: 'day' })" :class="parts.datepicker.tableHead">
              <tr v-bind="api.getTableHeaderProps({ view: 'day' })" :class="parts.datepicker.tableRow">
                <th
                  v-for="(day, i) in api.weekDays"
                  :key="i"
                  scope="col"
                  :aria-label="day.long"
                  :class="parts.datepicker.tableHeader"
                >
                  {{ day.narrow }}
                </th>
              </tr>
            </thead>
            <tbody v-bind="api.getTableBodyProps({ view: 'day' })">
              <tr
                v-for="(week, i) in api.weeks"
                :key="i"
                v-bind="api.getTableRowProps({ view: 'day' })"
                :class="parts.datepicker.tableRow"
              >
                <td
                  v-for="(value, j) in week"
                  :key="j"
                  v-bind="api.getDayTableCellProps({ value })"
                  :class="parts.datepicker.tableCell"
                >
                  <div v-bind="api.getDayTableCellTriggerProps({ value })" :class="parts.datepicker.tableCellTrigger">
                    {{ value.day }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Month view -->
        <div v-bind="api.getViewProps({ view: 'month' })">
          <DatePickerNavView view="month" />
          <table v-bind="api.getTableProps({ view: 'month', columns: 4 })" :class="parts.datepicker.table">
            <tbody v-bind="api.getTableBodyProps({ view: 'month' })">
              <tr
                v-for="(months, row) in api.getMonthsGrid({ columns: 4, format: 'short' })"
                :key="row"
                v-bind="api.getTableRowProps({ view: 'month' })"
                :class="parts.datepicker.tableRow"
              >
                <td
                  v-for="(month, i) in months"
                  :key="i"
                  v-bind="api.getMonthTableCellProps({ ...month, columns: 4 })"
                  :class="parts.datepicker.tableCell"
                >
                  <div
                    v-bind="api.getMonthTableCellTriggerProps({ ...month, columns: 4 })"
                    :class="parts.datepicker.tableCellTrigger"
                  >
                    {{ month.label }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Year view -->
        <div v-bind="api.getViewProps({ view: 'year' })">
          <DatePickerNavView view="year" />
          <table v-bind="api.getTableProps({ view: 'year', columns: 4 })" :class="parts.datepicker.table">
            <tbody v-bind="api.getTableBodyProps({ view: 'year' })">
              <tr
                v-for="(years, row) in api.getYearsGrid({ columns: 4 })"
                :key="row"
                v-bind="api.getTableRowProps({ view: 'year' })"
                :class="parts.datepicker.tableRow"
              >
                <td
                  v-for="(year, i) in years"
                  :key="i"
                  v-bind="api.getYearTableCellProps({ ...year, columns: 4 })"
                  :class="parts.datepicker.tableCell"
                >
                  <div
                    v-bind="api.getYearTableCellTriggerProps({ ...year, columns: 4 })"
                    :class="parts.datepicker.tableCellTrigger"
                  >
                    {{ year.label }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Teleport>
</template>
