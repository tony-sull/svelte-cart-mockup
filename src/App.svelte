<script lang="ts">
  import "sanitize.css";
  import "./assets/css/global.css";
  import NavHeader from "./components/NavHeader.svelte";
  import ShoppingCart from "./components/ShoppingCart.svelte";

  let cartOpen = false;

  function onOpenCart() {
    cartOpen = true;
  }

  function onCloseCart() {
    cartOpen = false;
  }
</script>

<svelte:head>
  <title>Home | Shop Kamfly</title>
</svelte:head>

<NavHeader on:opencart={onOpenCart} />

<main aria-hidden={cartOpen}>
  <div class="container">
    <h1>Hello, World!</h1>
  </div>
</main>

{#if cartOpen}
  <ShoppingCart on:close={onCloseCart} />
{/if}
