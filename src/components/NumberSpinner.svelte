<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let value = 0;
  export let label = "spinbutton";

  const dispatch = createEventDispatcher();

  function onMinus() {
    value = Math.max(min, value - step);
    onChange();
  }

  function onPlus() {
    value = Math.min(max, value + step);
    onChange();
  }

  function onChange() {
    dispatch("change", value);
  }
</script>

<div class="stepper" aria-label={label}>
  <button class="btn btn--icon-sm" on:click={onMinus} aria-label="minus">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  </button>

  <strong aria-label="value">{value}</strong>

  <button class="btn btn--icon-sm" on:click={onPlus} aria-label="plus">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  </button>
</div>

<style>
  .stepper {
    display: flex;
    flex-direction: row;
    column-gap: 0.5rem;
    align-items: center;
  }
</style>
