<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import { fade, fly } from "svelte/transition";
  import NumberSpinner from "./NumberSpinner.svelte";
  import { modalAction } from "../actions/modalAction";
  import type { CartStore, isAmountDiscount } from "../cartStore";

  const cartStore = getContext<CartStore>("cartStore");
  const totalPrice = cartStore.totalPrice();
  const discountAmount = cartStore.discountAmount();

  const originalFocusElem = document.activeElement;

  const dispatch = createEventDispatcher();

  let clientWidth: number;

  function onClose() {
    dispatch("close");
  }

  function onNumberSpinnerChange(sku: string) {
    return function (event: CustomEvent<number>) {
      cartStore.setSkuQuantity(sku, event.detail);
    };
  }
</script>

<div class="dialog-bg" transition:fade={{ duration: 250 }} on:click={onClose} />
<aside
  role="dialog"
  class="container"
  use:modalAction={{ close: onClose, originalFocusElem }}
  aria-labelledby="cart-title"
  transition:fly={{ duration: 250, x: clientWidth }}
  bind:clientWidth
>
  <header>
    <h1 id="cart-title" class="text-lg">Shopping Cart</h1>
    <button
      class="btn btn--icon"
      on:click={onClose}
      aria-label="Close"
      autofocus
    >
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
      {#each $cartStore.items as item (item.sku)}
        <li class="item">
          {#if item.image}
            <img class="item__image" src={item.image} alt={item.title} />
          {/if}
          <small class="item__brand">{item.brand}</small>
          <div class="item__title text-lg">{item.title}</div>
          <em class="item__options text-sm">{item.description}</em>
          <div class="item__quantity">
            <NumberSpinner
              value={item.quantity}
              on:change={onNumberSpinnerChange(item.sku)}
            />
          </div>
          <div class="item__price">{item.quantity * item.itemPrice} SEK</div>

          <button
            class="item__delete btn btn--icon"
            on:click={() => cartStore.removeSku(item.sku)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-trash-2"
            >
              <polyline points="3 6 5 6 21 6" />
              <path
                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
              />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </li>
      {/each}
    </ul>

    {#if $discountAmount > 0}
      <div class="discount">
        <div class="discount__title text-lg">{$cartStore.discount.title}</div>
        <small class="discount__description">
          {$cartStore.discount.description}
        </small>
        <div class="discount__price">-{$discountAmount} SEK</div>
      </div>
    {/if}
  </main>

  <footer>
    <div class="footer__row">
      <span>Total</span>
      <span>{$totalPrice} SEK</span>
    </div>
    <button class="btn btn--primary btn--lg">Checkout</button>
    <button class="btn btn--hollow btn--lg" on:click={onClose}
      >Continue Shopping</button
    >
  </footer>
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
    display: flex;
    flex-direction: column;
    min-height: 100%;
    overflow-y: scroll;
  }

  header {
    background: var(--color-background);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: solid 1px var(--color-light-gray);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  header h1 {
    padding: 0;
    margin: 0;
  }

  header .btn {
    margin-right: -0.5rem;
  }

  main {
    flex: 1 0 0%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-areas:
      "image brand delete"
      "image title delete"
      "image options options"
      "image quantity price";
    column-gap: 1rem;
    align-items: center;
    padding: 1rem 0;
  }

  .item:not(:last-of-type) {
    border-bottom: solid 1px var(--color-light-gray);
  }

  .item__image {
    grid-area: image;
    height: 6rem;
  }

  .item__brand {
    grid-area: brand;
    font-weight: bold;
    opacity: 0.6;
  }

  .item__delete {
    grid-area: delete;
    justify-self: end;
    margin-right: -0.5rem;
  }

  .item__title {
    grid-area: title;
    line-height: 1.375;
  }

  .item__options {
    grid-area: options;
  }

  .item__quantity {
    grid-area: quantity;
    margin-top: 0.5rem;
  }

  .discount {
    padding: 1rem;
    margin-top: 2rem;
    border: solid 2px var(--color-blue-700);
    border-radius: 0.25rem;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "title price"
      "description price";
  }

  .discount__title {
    grid-area: title;
  }

  .discount__description {
    grid-area: description;
  }

  .discount__price {
    grid-area: price;
  }

  .discount__title,
  .discount__price {
    color: var(--color-blue-700);
    font-weight: bold;
  }

  footer {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    row-gap: 0.75rem;
    border-top: solid 1px var(--color-light-gray);
  }

  .footer__row {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.5rem;
  }

  @media (min-width: 480px) {
    aside {
      width: 80%;
    }
  }
</style>
