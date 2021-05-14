# NumberSpinner

[ ] Need to add tests for the `change` event

[ ] NumberSpinner isn't setup for proper ARIA accessibility

- [WC3 example](https://w3c.github.io/aria-practices/examples/spinbutton/datepicker-spinbuttons.html)
- [Spinbutton example](https://www.digitala11y.com/spinbutton-role/)

The component should use a role="spinnbutton". It also may need to hide the plus/minus buttons and allow keyboard input for up/down. Need to investigate that further

# Discounts

[ ] The cart store's discount system is very basic right now. It can handle percent off or flat amount discounts, but it should be refactored to separate out the logic for removing discount amounts to allow for better reusability with other types of discounts

[ ] cartStore.getDiscountAmount() should handle error cases, for example invalid discounts or discounts with unrecognized types should be ignored
