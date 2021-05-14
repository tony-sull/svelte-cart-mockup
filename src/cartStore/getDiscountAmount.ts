import { isAmountDiscount } from '.'
import type { CartState } from '.'

export function getDiscountAmount(state: CartState) {
    if (!state.discount) {
        return 0
    } else if (isAmountDiscount(state.discount)) {
        return state.discount.discountAmount
    } else {
        const subtotal = state.items.reduce((acc, next) => {
            return acc + (next.quantity * next.itemPrice)
        }, 0)
        
        return subtotal * state.discount.discountPercent / 100
    }
}