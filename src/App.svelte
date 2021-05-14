<script lang="ts">
  import "sanitize.css";
  import { setContext } from "svelte";
  import "./assets/css/global.css";
  import NavHeader from "./components/NavHeader.svelte";
  import ShoppingCart from "./components/ShoppingCart.svelte";
  import { createCartStore } from "./cartStore";
  import type { CartState } from "./cartStore";

  // initializing the cart with local data
  const initialCart: CartState = {
    items: [
      {
        sku: "oversized-blazer-bl-36",
        title: "Oversized Blazer",
        description: "Black, Size: 36",
        brand: "Johnells",
        image: "/products/oversized-blazer.jpg",
        quantity: 1,
        itemPrice: 175,
      },
      {
        sku: "sport-coat-br-36",
        title: "Sport Coat",
        description: "Brown, Size: 36",
        brand: "Johnells",
        image: "/products/oversized-blazer.jpg",
        quantity: 2,
        itemPrice: 150,
      },
    ],
    discount: {
      title: "10% off your order",
      description:
        "As a first time shopper you get a discount on your first order.",
      discountPercent: 10,
    },
  };

  const cartStore = createCartStore(initialCart);
  setContext("cartStore", cartStore);

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

<NavHeader on:opencart={onOpenCart} {cartOpen} />

<main aria-hidden={cartOpen}>
  <div class="container hero">
    <h1>Kamfly Clothing Co.</h1>
    <p>
      Today's latest styles, locally made with 100% recycled cotton and
      renewable hemp.
    </p>

    <button class="btn btn--primary btn--lg">Shop Now</button>
  </div>

  <section class="container alt">
    <h2>Placeholder content</h2>
    <button class="btn btn--primary btn--lg">Learn More</button>
  </section>

  <section class="container">
    <h2>Placeholder content</h2>
    <button class="btn btn--primary btn--lg">Shop Now</button>
  </section>

  <section class="container alt">
    <h2>Placeholder content</h2>
    <label>
      Sign up for our newsletter
      <input type="email" placeholder="you@email.com" />
    </label>
  </section>
</main>

{#if cartOpen}
  <ShoppingCart on:close={onCloseCart} />
{/if}

<style>
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .hero .btn {
    margin-top: 1em;
  }

  section {
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  section.alt {
    background: var(--color-blue-300);
  }

  @media (min-width: 640px) {
    .hero {
      padding-top: 6rem;
      padding-bottom: 6rem;
    }

    .hero .btn {
      margin-top: 3em;
    }
  }
</style>
