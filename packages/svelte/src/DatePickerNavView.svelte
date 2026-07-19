<script lang="ts">
  import type { DateView } from '@zag-js/date-picker'
  import { getDatePickerContext } from './date-picker-context'
  import { parts } from '@moderno/class-contract'

  let { view }: { view: DateView } = $props()
  const api = getDatePickerContext()
</script>

<div {...api().getViewControlProps({ view })} class={parts.datepicker.viewControl}>
  <button {...api().getPrevTriggerProps({ view })} class={parts.datepicker.prevTrigger}>‹</button>
  {#if view === 'year'}
    <span class={parts.datepicker.viewTrigger}>{api().getDecade().start}–{api().getDecade().end}</span>
  {:else}
    <button {...api().getViewTriggerProps({ view })} class={parts.datepicker.viewTrigger}>
      {view === 'day' ? api().visibleRangeText.start : api().visibleRange.start.year}
    </button>
  {/if}
  <button {...api().getNextTriggerProps({ view })} class={parts.datepicker.nextTrigger}>›</button>
</div>
