<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import logo from "../assets/icons/logo.svg";
  import shoppingCart from "../assets/icons/shopping-cart.svg";

  export let cartOpen: boolean;

  const dispatch = createEventDispatcher();

  function openCart() {
    dispatch("opencart");
  }
</script>

<header class="container" aria-hidden={cartOpen}>
  <a href="/" alt="Our Shop">
    {@html logo}
  </a>

  <button
    class="btn btn--icon"
    aria-label="Open Shopping Cart"
    on:click={openCart}
  >
    {@html shoppingCart}
  </button>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    background: var(--color-background);
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  a {
    color: var(--color-blue-900);
  }

  a :global(svg) {
    height: 1.5rem;
    color: var(--color-brand);
  }

  button {
    position: relative;
    margin-right: -0.5em; /* visually align the icon's right edge */
    will-change: color;
    transition: color 150ms ease-out;
  }

  button:hover {
    color: var(--color-blue-700);
  }
</style>
