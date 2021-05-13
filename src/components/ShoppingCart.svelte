<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { modalAction } from "../actions/modalAction";

  const dispatch = createEventDispatcher();

  let clientWidth: number;

  function onClose() {
    dispatch("close");
  }
</script>

<div class="dialog-bg" transition:fade={{ duration: 250 }} on:click={onClose} />
<aside
  role="dialog"
  use:modalAction
  aria-labelledby="cart-title"
  transition:fly={{ duration: 250, x: clientWidth }}
  bind:clientWidth
>
  <header>
    <h1 id="cart-title">Shopping Cart</h1>
    <button class="btn btn--icon" on:click={onClose}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </header>
  <main>
    <ul>
      <li>items</li>
      <li>go</li>
      <li>here</li>
    </ul>
  </main>
</aside>

<style>
  .dialog-bg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--color-black);
    opacity: 0.67;
  }

  aside {
    background: var(--color-background);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    max-width: 640px;
  }

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
  }

  @media (min-width: 480px) {
    aside {
      width: 80%;
    }
  }
</style>
