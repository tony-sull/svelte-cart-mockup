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
