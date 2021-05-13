<script lang="ts">
  import logo from "../assets/icons/logo.svg";
  import shoppingCart from "../assets/icons/shopping-cart.svg";

  function openCart() {
    console.log("open cart");
  }
</script>

<header class="container">
  <a href="/" alt="Our Shop">
    {@html logo}
  </a>

  <button aria-label="Open Shopping Cart" on:click={openCart}>
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
    background: transparent;
    border: none;
    padding: 0.5em;
    margin-right: -0.5em; /* visually align the icon's right edge */
    will-change: opacity, color;
    transition: opacity 150ms ease-out, color 150ms ease-out;
  }

  button:hover {
    color: var(--color-blue-700);
  }

  button :global(svg) {
    height: 2rem;
  }
</style>
