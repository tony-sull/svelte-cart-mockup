import { isAmountDiscount } from '.'
import type { CartState } from '.'

export function getTotalPrice(state: CartState) {
    const beforeDiscount = state.items
        .filter(item => item.quantity > 0)
        .map(item => item.quantity * item.itemPrice)
        .reduce((acc, next) => acc + next, 0)
    
    if (!state.discount) {
        return beforeDiscount
    }

    return isAmountDiscount(state.discount)
        ? beforeDiscount - state.discount.discountAmount
        : beforeDiscount * (100 - state.discount.discountPercent) / 100
}
