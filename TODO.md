# NumberSpinner

[ ] Need to add tests for the `change` event

[ ] NumberSpinner isn't setup for proper ARIA accessibility

- [WC3 example](https://w3c.github.io/aria-practices/examples/spinbutton/datepicker-spinbuttons.html)
- [Spinbutton example](https://www.digitala11y.com/spinbutton-role/)

The component should use a role="spinnbutton". It also may need to hide the plus/minus buttons and allow keyboard input for up/down. Need to investigate that further

# Discounts

[ ] The cart store's discount system is very basic right now. It can handle percent off or flat amount discounts, but it should be refactored to separate out the logic for removing discount amounts to allow for better reusability with other types of discounts

[ ] cartStore.getDiscountAmount() should handle error cases, for example invalid discounts or discounts with unrecognized types should be ignored

# ShoppingCart

[ ] Shopping cart items should be refactored out to a separate component.

Ran out of time to get this done, but the ShoppingCartItem should take in the raw `CartItem` data as a parameter and fire events when the quantity changes or the item is deleted.

This would keep the store integration logic in the `ShoppingCart` component itself and avoid having the list item UI knowing where that state comes from or how changes are made

# Localization

I saved this for last and ran out of time for it. Currency values are just displayed as strings right now, not idea. I planned to lean on ECMAScript's Internationalization API for basic currency formatting without installing another NPM package to do it.

# Documentation

Public APIs for the cart store and helper functions need to be documented. I prefer [JSDoc](https://jsdoc.app/) format since it works very well with most tooling (VS Code integration is excellent). See my [svelte-entity-store](https://github.com/tony-sull/svelte-entity-store) for a project I use JSDoc for documentation.

# Testing (general)

[ ] Can custom Svelte actions be tested easily? I've never actually tried it out, that would be very useful coverage to have but tricky with all the DOM integration

[ ] The testing here could be cleaned up, especially around how test data is created, maybe helpers that take in `Partial<T>` state for different `type`s and return a valid object with any undefined data filled in with generic data

# Extract Shared Types

[ ] Shared typescript types currently in [cartStore](/cartStore/index.ts) should be pulled out to a shared file or .d.ts file
