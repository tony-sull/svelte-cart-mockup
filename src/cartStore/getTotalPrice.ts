import type { CartState } from '.'

export function getTotalPrice(state: CartState) {
    return state.items
        .filter(item => item.quantity > 0)
        .map(item => item.quantity * item.variant.price)
        .reduce((acc, next) => acc + next, 0)
}
